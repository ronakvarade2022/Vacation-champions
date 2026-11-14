import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Sparkles, BookOpen, Brain, Shield, TrendingUp,
  CheckCircle2, Lock, Crown, Play, Pause, RotateCcw, Volume2, Palette,
  Trophy, HelpCircle, Check, X, RefreshCw, Eraser,
  GraduationCap, FileText, BarChart3, UserPlus, LogIn
} from 'lucide-react';
import { speechService } from '../services/speechService';
import { ClassLevel, EducationBoard } from '../types';
import {
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta
} from '../data/classCurriculumConfig';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import { getVisitorDemoWorksheetsForClass, OnlineWorksheet } from '../data/worksheetsData';
import { getDemoQuestionsForBoardAndClass } from '../data/demoQuestionsData';
import {
  formatStandardOrdinal,
  FREE_ALLOWED_SUBJECTS,
  getBoardDisplayName,
  getBoardShortLabel
} from '../utils/subscriptionAccess';

interface DemoSectionViewProps {
  onUpgradeClick: () => void;
  onRegisterClick?: () => void;
  onSignInClick?: () => void;
  isAuthenticated?: boolean;
  initialBoard?: EducationBoard;
  initialClass?: ClassLevel;
  initialInteractiveTab?: InteractiveDemoTab;
  onBoardSelectionChange?: (board: EducationBoard) => void;
  onClassSelectionChange?: (cls: ClassLevel) => void;
}

type InteractiveDemoTab =
  | 'overview'
  | 'live-curriculum'
  | 'live-quiz'
  | 'live-puzzles'
  | 'live-stories'
  | 'live-drawing'
  | 'live-champions';


const DEMO_STORIES = [
  {
    id: 'demo-story-en',
    title: 'The Golden Feather of Honesty',
    language: 'en' as const,
    voiceBadge: 'Sweet & Polite English Female Voice',
    category: 'Story World (Moral Story)',
    paragraphs: [
      'Once upon a time in a peaceful valley near the Sahyadri hills, there lived a young girl named Ananya who loved reading books and helping birds.',
      'One sunny morning, while watering the tulsi plant in her courtyard, Ananya found a shimmering golden feather resting beside a small clay pot.',
      'Soon, the village merchant arrived looking worried. He announced that a rare golden plume from the royal museum had blown away in the morning breeze.',
      'Even though the feather was magical and bright, Ananya immediately stepped forward with a gentle smile and returned the golden feather safely.',
      'Impressed by her pure honesty and kindness, the curator gifted Ananya a lifetime library pass and named her the Young Guardian of Wisdom.'
    ],
    moral: 'True greatness shines brightest when we choose honesty even when no one is watching.',
    quizQuestion: 'Why did the curator reward Ananya with a lifetime library pass?',
    quizOptions: [
      'Because she hid the golden feather',
      'Because she returned the golden feather with pure honesty',
      'Because she bought the museum ticket',
      'Because she won a running race'
    ],
    correctOption: 1
  },
  {
    id: 'demo-story-mr',
    title: 'शिवरायांची युद्धनीती आणि गनिमी कावा (Shivaji Maharaj Story)',
    language: 'mr' as const,
    voiceBadge: 'Fluent Female Marathi Voice (मराठी आवाज)',
    category: 'Shivaji Maharaj Inspiring Story',
    paragraphs: [
      'सह्याद्रीच्या उंचच उंच डोंगररांगांमध्ये छत्रपती शिवाजी महाराजांनी हिंदवी स्वराज्याचे तेजस्वी स्वप्न पाहिले आणि ते प्रत्यक्षात उतरवले.',
      'महाराजांनी आपल्या मावळ्यांना एकत्र केले. डोंगरदऱ्यांची अचूक माहिती आणि वेगवान हालचालींच्या जोरावर त्यांनी गनिमी कावा ही अद्वितीय युद्धनीती विकसित केली.',
      'कमी सैन्य असतानाही शत्रूच्या अवाढव्य फौजेला कसे चकवायचे आणि रयतेचे रक्षण कसे करायचे, याचे उत्तम नियोजन शिवरायांकडे होते.',
      'त्यांनी शेतकऱ्यांच्या भाजीच्या देठालाही धक्का लागू नये अशी सक्त ताकीद दिली होती. त्यामुळेच रयतेचे स्वराज्य अधिक बळकट आणि अजिंक्य बनले.'
    ],
    moral: 'शिस्त, दूरदृष्टी, धाडस आणि प्रजेवरील प्रेम यामुळेच खऱ्या नेतृत्वाची ओळख निर्माण होते.',
    quizQuestion: 'छत्रपती शिवाजी महाराजांच्या प्रसिद्ध युद्धनीतीला काय म्हटले जाते?',
    quizOptions: [
      'गनिमी कावा (Guerrilla Warfare)',
      'समुद्री व्यापार',
      'केवळ तटबंदी',
      'यापैकी नाही'
    ],
    correctOption: 0
  }
];

// 4x4 Interactive Sudoku for Demo
const INITIAL_DEMO_SUDOKU: (number | null)[][] = [
  [1, null, 3, 4],
  [null, 4, 1, 2],
  [2, 1, null, 3],
  [4, 3, 2, null]
];

const SOLUTION_DEMO_SUDOKU: number[][] = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 1, 4, 3],
  [4, 3, 2, 1]
];

const DEMO_RIDDLES = [
  {
    id: 'r1',
    title: 'The Library Number Sequence',
    question: 'Find the missing number in the pattern: 3, 6, 12, 24, __, 96',
    options: ['36', '48', '54', '60'],
    correctIndex: 1,
    hint: 'Each number is multiplied by 2 to get the next number!',
    explanation: '3 × 2 = 6, 6 × 2 = 12, 12 × 2 = 24, and 24 × 2 = 48!'
  },
  {
    id: 'r2',
    title: 'The Clock Hands Riddle',
    question: 'I have a face and two hands, but no arms or legs. What am I?',
    options: ['A Robot', 'A Clock', 'A Mirror', 'A Coin'],
    correctIndex: 1,
    hint: 'You look at me every morning before going to school!',
    explanation: 'A clock has a dial (face) and hour/minute hands!'
  }
];

const DEMO_CHAMPION_QUESTIONS = [
  {
    id: 'cc-1',
    badge: '🏏 Cricket Champions Demo',
    question: 'How many balls are bowled in one standard legal Over in Cricket?',
    options: ['4 Balls', '5 Balls', '6 Balls', '8 Balls'],
    correctIndex: 2,
    explanation: 'One standard legal over in cricket consists of 6 legal deliveries.'
  },
  {
    id: 'cc-2',
    badge: '🎓 MSCE Scholarship Demo (4th & 7th Std)',
    question: 'If "CAT" is coded as "3-1-20", how is "DOG" coded using alphabetical positions?',
    options: ['4-15-7', '4-14-8', '5-15-7', '3-15-6'],
    correctIndex: 0,
    explanation: 'D is the 4th letter, O is the 15th letter, and G is the 7th letter of the English alphabet → 4-15-7.'
  }
];

export const DemoSectionView: React.FC<DemoSectionViewProps> = ({
  onUpgradeClick,
  onRegisterClick,
  onSignInClick,
  isAuthenticated = false,
  initialBoard,
  initialClass,
  initialInteractiveTab,
  onBoardSelectionChange,
  onClassSelectionChange,
}) => {
  const [activeTab, setActiveTab] = useState<InteractiveDemoTab>(initialInteractiveTab || 'overview');

  // --- 0. Visitor Board & Class Preview (Maharashtra, CBSE, ICSE • Standards 1st to 10th) ---
  const [selectedDemoBoard, setSelectedDemoBoard] = useState<EducationBoard>(initialBoard || 'Maharashtra');
  const [selectedDemoClass, setSelectedDemoClass] = useState<ClassLevel>(initialClass || 'Class 1');
  const [activeDemoWorksheet, setActiveDemoWorksheet] = useState<OnlineWorksheet | null>(null);
  const [wsAnswers, setWsAnswers] = useState<Record<string, number>>({});
  const [wsSubmitted, setWsSubmitted] = useState(false);

  useEffect(() => {
    if (initialBoard) {
      setSelectedDemoBoard(initialBoard);
      setWsAnswers({});
      setWsSubmitted(false);
      setQuizAnswers({});
      setQuizSubmitted(false);
    }
  }, [initialBoard]);

  useEffect(() => {
    if (initialClass) {
      setSelectedDemoClass(initialClass);
      setWsAnswers({});
      setWsSubmitted(false);
      setQuizAnswers({});
      setQuizSubmitted(false);
    }
  }, [initialClass]);

  useEffect(() => {
    if (initialInteractiveTab) {
      setActiveTab(initialInteractiveTab);
    }
  }, [initialInteractiveTab]);

  const demoSubjects = useMemo(
    () => getSubjectsForClass(selectedDemoClass, selectedDemoBoard),
    [selectedDemoClass, selectedDemoBoard]
  );
  const demoWorksheets = useMemo(
    () => getVisitorDemoWorksheetsForClass(selectedDemoClass, selectedDemoBoard),
    [selectedDemoClass, selectedDemoBoard]
  );

  // --- 1. Live Class-Specific Demo Quiz State (Strictly 2 Unique Questions per Class per Board) ---
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const classDemoQuestions = useMemo(
    () => getDemoQuestionsForBoardAndClass(selectedDemoBoard, selectedDemoClass),
    [selectedDemoBoard, selectedDemoClass]
  );

  const answeredInClassCount = classDemoQuestions.filter(
    q => quizAnswers[q.id] !== undefined
  ).length;

  const submittedDemoScore = useMemo(() => {
    if (!quizSubmitted) return 0;
    return classDemoQuestions.reduce((acc, q) => {
      return acc + (quizAnswers[q.id] === q.correctIndex ? 1 : 0);
    }, 0);
  }, [classDemoQuestions, quizAnswers, quizSubmitted]);

  const handleSelectDemoBoard = (board: EducationBoard) => {
    setSelectedDemoBoard(board);
    onBoardSelectionChange?.(board);
    if (activeDemoWorksheet) {
      const nextWorksheets = getVisitorDemoWorksheetsForClass(selectedDemoClass, board);
      const matchingSubjectWs = nextWorksheets.find(
        ws =>
          ws.subject === activeDemoWorksheet.subject ||
          (ws.subject.startsWith('Mathematics') &&
            activeDemoWorksheet.subject.startsWith('Mathematics'))
      );
      setActiveDemoWorksheet(matchingSubjectWs || nextWorksheets[0] || null);
    } else {
      setActiveDemoWorksheet(null);
    }
    setWsAnswers({});
    setWsSubmitted(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleSelectDemoClass = (cls: ClassLevel) => {
    setSelectedDemoClass(cls);
    onClassSelectionChange?.(cls);
    if (activeDemoWorksheet) {
      const nextWorksheets = getVisitorDemoWorksheetsForClass(cls, selectedDemoBoard);
      const matchingSubjectWs = nextWorksheets.find(
        ws =>
          ws.subject === activeDemoWorksheet.subject ||
          (ws.subject.startsWith('Mathematics') &&
            activeDemoWorksheet.subject.startsWith('Mathematics'))
      );
      setActiveDemoWorksheet(matchingSubjectWs || nextWorksheets[0] || null);
    } else {
      setActiveDemoWorksheet(null);
    }
    setWsAnswers({});
    setWsSubmitted(false);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const handleResetDemoQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  // --- 2. Live Sudoku & Brain Puzzle State ---
  const [sudokuGrid, setSudokuGrid] = useState<(number | null)[][]>(
    INITIAL_DEMO_SUDOKU.map(row => [...row])
  );
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>([0, 1]);
  const [sudokuMessage, setSudokuMessage] = useState<string | null>(null);
  const [riddleAnswers, setRiddleAnswers] = useState<Record<string, number>>({});
  const [showRiddleHint, setShowRiddleHint] = useState<Record<string, boolean>>({});

  // --- 3. Live Story Audio State ---
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioProgress, setAudioProgress] = useState<{ current: number; total: number }>({ current: 0, total: 0 });
  const [storyQuizSelected, setStoryQuizSelected] = useState<number | null>(null);

  const activeStory = DEMO_STORIES[activeStoryIndex];

  useEffect(() => {
    document.title = 'mystudyzone.in - Visitor Demo Dashboard';
    return () => {
      speechService.stop();
    };
  }, []);

  const handlePlayDemoStory = () => {
    const paragraphs = [
      activeStory.title,
      ...activeStory.paragraphs,
      `${activeStory.language === 'mr' ? 'तात्पर्य: ' : 'Moral of the story: '} ${activeStory.moral}`
    ];
    const lang = activeStory.language === 'mr' ? 'Marathi' : 'English';

    setIsSpeaking(true);
    setIsPaused(false);
    speechService.startStoryNarration(
      paragraphs,
      lang,
      (state) => {
        setIsSpeaking(state.isPlaying || state.isPaused);
        setIsPaused(state.isPaused);
        setAudioProgress({
          current: state.currentParagraphIndex + 1,
          total: state.totalParagraphs
        });
      },
      () => {
        setIsSpeaking(false);
        setIsPaused(false);
        setAudioProgress({ current: 0, total: 0 });
      }
    );
  };

  const handlePauseDemoStory = () => {
    if (isSpeaking && !isPaused) {
      speechService.pause();
      setIsPaused(true);
    }
  };

  const handleResumeDemoStory = () => {
    if (isSpeaking && isPaused) {
      speechService.resume();
      setIsPaused(false);
    }
  };

  const handleRestartDemoStory = () => {
    speechService.restart();
  };

  const handleStopDemoStory = () => {
    speechService.stop();
    setIsSpeaking(false);
    setIsPaused(false);
    setAudioProgress({ current: 0, total: 0 });
  };

  // --- 4. Live Drawing Canvas State ---
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#4F46E5');
  const [brushSize, setBrushSize] = useState(6);
  const [drawingTemplate, setDrawingTemplate] = useState<'Fort Raigad Outline' | 'Peacock Feather' | 'Freehand Canvas'>('Fort Raigad Outline');

  const initCanvas = (templateName = drawingTemplate) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw helpful light guide lines based on template
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2;
    if (templateName === 'Fort Raigad Outline') {
      ctx.beginPath();
      // Mountains & Fort battlements guide
      ctx.moveTo(40, 220);
      ctx.lineTo(130, 120);
      ctx.lineTo(220, 170);
      ctx.lineTo(310, 95);
      ctx.lineTo(420, 165);
      ctx.lineTo(520, 110);
      ctx.lineTo(600, 220);
      ctx.stroke();

      // Flagpole on peak
      ctx.beginPath();
      ctx.moveTo(310, 95);
      ctx.lineTo(310, 45);
      ctx.lineTo(355, 60);
      ctx.lineTo(310, 75);
      ctx.stroke();
    } else if (templateName === 'Peacock Feather') {
      ctx.beginPath();
      ctx.ellipse(320, 130, 70, 90, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(320, 130, 35, 45, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
  };

  useEffect(() => {
    if (activeTab === 'live-drawing') {
      setTimeout(() => initCanvas(drawingTemplate), 50);
    }
  }, [activeTab, drawingTemplate]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = (clientX - rect.left) * (canvas.width / rect.width);
    const y = (clientY - rect.top) * (canvas.height / rect.height);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  // --- 5. Live Champions (Cricket & Scholarship) State ---
  const [champAnswers, setChampAnswers] = useState<Record<string, number>>({});

  // Sudoku placement helper
  const handleSudokuInput = (num: number | null) => {
    if (!selectedCell) return;
    const [r, c] = selectedCell;
    if (INITIAL_DEMO_SUDOKU[r][c] !== null) return; // locked cell

    const updated = sudokuGrid.map(row => [...row]);
    updated[r][c] = num;
    setSudokuGrid(updated);

    // Check if complete and valid
    const isComplete = updated.every(row => row.every(cell => cell !== null));
    if (isComplete) {
      const isSolved = updated.every((row, ri) =>
        row.every((cell, ci) => cell === SOLUTION_DEMO_SUDOKU[ri][ci])
      );
      if (isSolved) {
        setSudokuMessage('🎉 Brilliant! You solved the 4×4 Demo Sudoku with zero row, column, or 2×2 box conflicts!');
      } else {
        setSudokuMessage('⚠️ Some numbers conflict in a row, column, or 2×2 box. Try adjusting the highlighted cells!');
      }
    } else {
      setSudokuMessage(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Top Demo Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-7 sm:p-8 text-white mb-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-black uppercase tracking-widest mb-3">
              <Sparkles className="w-4 h-4" /> VISITOR DEMO MODE • READ-ONLY PREVIEW (CLASSES 1ST TO 10TH)
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-2">
              mystudyzone.in - Visitor Demo Dashboard
            </h1>
            <p className="text-indigo-200 max-w-2xl text-sm sm:text-base">
              Preview any class from Standard 1st to Standard 10th, try sample English &amp; Mathematics worksheets, test 4-level quizzes, play Sudoku &amp; riddles, and listen to English &amp; Marathi stories. Demo exploration does not save records or activate real purchases.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab('live-curriculum')}
              className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
            >
              <BookOpen className="w-4 h-4" /> Preview Classes &amp; Worksheets
            </button>
            {!isAuthenticated && onRegisterClick && (
              <button
                onClick={onRegisterClick}
                className="px-4 py-3 bg-white hover:bg-amber-50 text-slate-950 font-black rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <UserPlus className="w-4 h-4 text-indigo-700" /> Register Free
              </button>
            )}
            {!isAuthenticated && onSignInClick && (
              <button
                onClick={onSignInClick}
                className="px-4 py-3 bg-white/15 hover:bg-white/25 text-white border border-white/25 font-bold rounded-2xl transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <LogIn className="w-4 h-4" /> Sign In
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={onUpgradeClick}
                className="px-5 py-3 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-950 font-black rounded-2xl shadow-lg transition-all flex items-center gap-2 cursor-pointer text-xs sm:text-sm"
              >
                <Crown className="w-4 h-4" /> View Plans (₹0 / ₹99)
              </button>
            )}
          </div>
        </div>

        {/* 3-Board Switcher + Standard 1st to 10th Quick Class Switcher inside Demo Mode */}
        <div className="mt-6 pt-5 border-t border-white/15 space-y-3 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" />
              <span>Select Education Board &amp; Class (Standards 1st to 10th):</span>
            </span>
            <span className="text-indigo-200 font-semibold">
              Previewing: <strong className="text-amber-300">{getBoardShortLabel(selectedDemoBoard)}</strong> •{' '}
              <strong className="text-white">Standard {formatStandardOrdinal(selectedDemoClass)}</strong> ({demoSubjects.length} Subjects)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {BOARD_META_LIST.map((bMeta) => {
              const isSelected = selectedDemoBoard === bMeta.id;
              return (
                <button
                  key={bMeta.id}
                  type="button"
                  onClick={() => handleSelectDemoBoard(bMeta.id)}
                  className={`px-3.5 py-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-white text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-400/50'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-lg shrink-0">{bMeta.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-black truncate">{bMeta.shortLabel}</p>
                      <p className={`text-[10px] truncate ${isSelected ? 'text-slate-600 font-bold' : 'text-indigo-200'}`}>
                        {bMeta.affiliationLabel}
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-600 text-white shrink-0">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ALL_10_CLASSES_META.map((clsMeta) => {
              const isSelected = selectedDemoClass === clsMeta.classLevel;
              return (
                <button
                  key={clsMeta.classLevel}
                  type="button"
                  onClick={() => handleSelectDemoClass(clsMeta.classLevel)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {clsMeta.shortLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Demo Navigation Pills */}
        <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap gap-2 relative z-10">
          {[
            { id: 'overview', label: 'Demo Overview & Progress', icon: Sparkles },
            { id: 'live-curriculum', label: `${getBoardShortLabel(selectedDemoBoard)} Worksheets (${formatStandardOrdinal(selectedDemoClass)})`, icon: FileText },
            { id: 'live-quiz', label: 'Sample Subject Quiz', icon: BookOpen },
            { id: 'live-puzzles', label: 'Sudoku & Riddles', icon: Brain },
            { id: 'live-stories', label: 'Stories Audio (EN & MR)', icon: Volume2 },
            { id: 'live-drawing', label: 'Drawing Studio', icon: Palette },
            { id: 'live-champions', label: 'Cricket & Scholarship', icon: Trophy },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id !== 'live-stories') handleStopDemoStory();
                  setActiveTab(tab.id as InteractiveDemoTab);
                }}
                className={`px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white text-indigo-950 shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          INTERACTIVE TAB 0: CLASSES 1ST TO 10TH SUBJECTS & SAMPLE WORKSHEETS
         ===================================================================== */}
      {activeTab === 'live-curriculum' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg mb-10 space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {getBoardDisplayName(selectedDemoBoard)} • Zero Database Writes
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {getBoardShortLabel(selectedDemoBoard)} • Standard {formatStandardOrdinal(selectedDemoClass)} — Subjects &amp; Sample Worksheets
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Try the live {getBoardShortLabel(selectedDemoBoard)} sample Mathematics, English, Science &amp; General Knowledge worksheets for {selectedDemoClass}, or switch between Maharashtra, CBSE, and ICSE Boards (Standards 1st to 10th).
              </p>
            </div>
            {!isAuthenticated && onRegisterClick && (
              <button
                type="button"
                onClick={onRegisterClick}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer"
              >
                Register {getBoardShortLabel(selectedDemoBoard)} Account for {selectedDemoClass} →
              </button>
            )}
          </div>

          {/* Board & Class Selector Inside Worksheets Tab */}
          <div className="space-y-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Select Education Board:
              </p>
              <div className="flex flex-wrap gap-2">
                {BOARD_META_LIST.map((bMeta) => {
                  const isSelected = selectedDemoBoard === bMeta.id;
                  return (
                    <button
                      key={bMeta.id}
                      type="button"
                      onClick={() => handleSelectDemoBoard(bMeta.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{bMeta.icon}</span>
                      <span>{bMeta.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Select Class to View {getBoardShortLabel(selectedDemoBoard)} Demo Worksheets:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_10_CLASSES_META.map((clsMeta) => {
                  const isSelected = selectedDemoClass === clsMeta.classLevel;
                  return (
                    <button
                      key={clsMeta.classLevel}
                      type="button"
                      onClick={() => handleSelectDemoClass(clsMeta.classLevel)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {clsMeta.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 4 Interactive Board & Class-Specific Sample Worksheets */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700">
              Try Interactive Sample Worksheets ({getBoardShortLabel(selectedDemoBoard)} • {selectedDemoClass} • {demoWorksheets.length} Subjects)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {demoWorksheets.map((ws) => {
                const isOpen = activeDemoWorksheet?.id === ws.id;
                return (
                  <div
                    key={ws.id}
                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between gap-3 ${
                      isOpen ? 'border-indigo-500 bg-indigo-50/40' : 'border-slate-200 bg-slate-50/70'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                          {getBoardShortLabel(selectedDemoBoard)} • {ws.classLevel} • Free Preview
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          {ws.questions.length} Questions • {ws.totalMarks} Marks
                        </span>
                      </div>
                      <h4 className="font-black text-base text-slate-900">{ws.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5">{ws.chapterName}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDemoWorksheet(ws);
                        setWsAnswers({});
                        setWsSubmitted(false);
                      }}
                      className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer"
                    >
                      {isOpen ? 'Currently Open Below' : `Try Sample ${ws.subject} Worksheet →`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Sample Worksheet Player (Client Ephemeral State Only) */}
          {activeDemoWorksheet && (
            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-indigo-200 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700">
                    {activeDemoWorksheet.classLevel} Interactive Demo Worksheet • Not Saved to Student Records
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    {activeDemoWorksheet.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setActiveDemoWorksheet(null);
                    setWsAnswers({});
                    setWsSubmitted(false);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>

              <div className="space-y-4">
                {activeDemoWorksheet.questions.map((q, idx) => {
                  const chosen = wsAnswers[q.id];
                  const isCorrect = chosen === q.correctIndex;
                  const optionLabels = ['A', 'B', 'C', 'D'] as const;
                  return (
                    <div key={q.id} className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5">
                      <p className="text-xs font-bold text-slate-500">
                        Question {idx + 1} of {activeDemoWorksheet.questions.length} • {q.chapterTitle}
                      </p>
                      <p className="text-sm font-black text-slate-900">{q.prompt}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const picked = chosen === optIdx;
                          const rightOpt = optIdx === q.correctIndex;
                          let cls = 'bg-slate-50 border-slate-200 hover:border-indigo-400 text-slate-800';
                          if (wsSubmitted) {
                            if (rightOpt) cls = 'bg-emerald-50 border-emerald-500 text-emerald-900';
                            else if (picked) cls = 'bg-rose-50 border-rose-400 text-rose-900';
                          } else if (picked) {
                            cls = 'bg-indigo-50 border-indigo-500 text-indigo-950';
                          }
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={wsSubmitted}
                              onClick={() => setWsAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                              className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${cls}`}
                            >
                              {optionLabels[optIdx]}. {opt}
                            </button>
                          );
                        })}
                      </div>
                      {wsSubmitted && (
                        <p className={`text-xs font-bold p-2.5 rounded-lg border ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                            : 'bg-amber-50 border-amber-200 text-amber-950'
                        }`}>
                          {isCorrect
                            ? '✓ Correct! '
                            : `✗ Correct Answer: ${optionLabels[q.correctIndex]}. ${q.options[q.correctIndex]} — `}
                          {q.explanation}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <p className="text-xs text-slate-500 font-semibold">
                  {wsSubmitted
                    ? `Score for ${activeDemoWorksheet.title}: ${activeDemoWorksheet.questions.filter(q => wsAnswers[q.id] === q.correctIndex).length} / ${activeDemoWorksheet.questions.length} correct.`
                    : `Showing ${activeDemoWorksheet.questions.length} syllabus-aligned questions for ${activeDemoWorksheet.classLevel} (${activeDemoWorksheet.subject}).`}
                </p>
                {!wsSubmitted ? (
                  <button
                    type="button"
                    onClick={() => setWsSubmitted(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs cursor-pointer"
                  >
                    Check Sample Answers
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setWsAnswers({});
                      setWsSubmitted(false);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer"
                  >
                    Try Again
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Available Subjects for Selected Board & Class */}
          <div className="space-y-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-700">
              All {demoSubjects.length} {getBoardShortLabel(selectedDemoBoard)} Subjects in Standard {formatStandardOrdinal(selectedDemoClass)}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {demoSubjects.map((sub) => {
                const meta = getSubjectMeta(sub, selectedDemoBoard);
                const isFreeSub = FREE_ALLOWED_SUBJECTS.includes(sub);
                return (
                  <div
                    key={sub}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="text-xl shrink-0">{meta.icon}</span>
                      <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">{sub}</p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {selectedDemoBoard === 'Maharashtra' ? meta.marathiTitle : meta.shortCode + ' • ' + getBoardShortLabel(selectedDemoBoard)}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                      isFreeSub ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'
                    }`}>
                      {isFreeSub ? 'Free Sample' : '₹99 Plan'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE TAB 1: CLASS-WISE SAMPLE SUBJECT QUIZ (STRICTLY 2 QUESTIONS/CLASS)
         ===================================================================== */}
      {activeTab === 'live-quiz' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg mb-10 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                Interactive Demo Quiz • {getBoardShortLabel(selectedDemoBoard)} • {selectedDemoClass} (2 Questions)
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                {getBoardShortLabel(selectedDemoBoard)} • Standard {formatStandardOrdinal(selectedDemoClass)} — Sample Demo Quiz
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Answer both {getBoardShortLabel(selectedDemoBoard)} syllabus questions below and submit to check the correct answers and explanations.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-2xl text-emerald-800 font-black text-sm">
                {quizSubmitted
                  ? `Score: ${submittedDemoScore} / ${classDemoQuestions.length}`
                  : `Selected: ${answeredInClassCount} / ${classDemoQuestions.length}`}
              </div>
              <button
                type="button"
                onClick={handleResetDemoQuiz}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Quiz
              </button>
            </div>
          </div>

          {/* Board & Class Selector Inside Quiz Tab */}
          <div className="mb-6 space-y-3">
            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Select Board:
              </p>
              <div className="flex flex-wrap gap-2">
                {BOARD_META_LIST.map((bMeta) => {
                  const isSelected = selectedDemoBoard === bMeta.id;
                  return (
                    <button
                      key={bMeta.id}
                      type="button"
                      onClick={() => handleSelectDemoBoard(bMeta.id)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
                        isSelected
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <span>{bMeta.icon}</span>
                      <span>{bMeta.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
                Select Class to View Its 2 Unique {getBoardShortLabel(selectedDemoBoard)} Demo Questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {ALL_10_CLASSES_META.map((clsMeta) => {
                  const isSelected = selectedDemoClass === clsMeta.classLevel;
                  return (
                    <button
                      key={clsMeta.classLevel}
                      type="button"
                      onClick={() => handleSelectDemoClass(clsMeta.classLevel)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {clsMeta.shortLabel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Strictly 2 Unique Questions for Selected Class */}
          <div className="space-y-5 mb-6">
            {classDemoQuestions.map((q, qIdx) => {
              const chosen = quizAnswers[q.id];
              const isUserCorrect = chosen === q.correctIndex;
              const optionLabels = ['A', 'B', 'C', 'D'] as const;

              return (
                <div
                  key={q.id}
                  className="bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200">
                        Subject: {q.subject}
                      </span>
                      <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        {q.topic}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      Question {qIdx + 1} of {classDemoQuestions.length}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-black text-slate-900 mb-4">
                    {qIdx + 1}. {q.question}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = chosen === optIdx;
                      const isCorrectOpt = optIdx === q.correctIndex;
                      let btnStyle =
                        'bg-white border-slate-200 text-slate-800 hover:border-indigo-400';

                      if (quizSubmitted) {
                        if (isCorrectOpt) {
                          btnStyle =
                            'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20';
                        } else if (isSelected && !isCorrectOpt) {
                          btnStyle = 'bg-rose-50 border-rose-500 text-rose-900';
                        } else {
                          btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-80';
                        }
                      } else if (isSelected) {
                        btnStyle =
                          'bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-500/20';
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() =>
                            setQuizAnswers(prev => ({ ...prev, [q.id]: optIdx }))
                          }
                          className={`p-3.5 rounded-xl border-2 text-left font-bold text-sm transition-all flex items-center justify-between gap-2 cursor-pointer ${btnStyle}`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span
                              className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                                quizSubmitted && isCorrectOpt
                                  ? 'bg-emerald-600 text-white'
                                  : quizSubmitted && isSelected && !isCorrectOpt
                                  ? 'bg-rose-600 text-white'
                                  : isSelected
                                  ? 'bg-indigo-600 text-white'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {optionLabels[optIdx]}
                            </span>
                            <span>{opt}</span>
                          </span>
                          {quizSubmitted && isCorrectOpt && (
                            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                          )}
                          {quizSubmitted && isSelected && !isCorrectOpt && (
                            <X className="w-5 h-5 text-rose-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div
                      className={`mt-4 p-4 rounded-xl border animate-in fade-in duration-200 ${
                        isUserCorrect
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                          : 'bg-amber-50 border-amber-200 text-amber-950'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <p className="text-xs font-black uppercase tracking-wider">
                          {isUserCorrect
                            ? '✓ Correct Answer!'
                            : '✗ Incorrect Choice'}
                        </p>
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-white border border-current/20">
                          Correct Answer: {optionLabels[q.correctIndex]}.{' '}
                          {q.options[q.correctIndex]}
                        </span>
                      </div>
                      <p className="text-sm font-medium mt-1">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit / Try Again Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-600">
              {quizSubmitted
                ? `Completed Standard ${formatStandardOrdinal(selectedDemoClass)} Demo Quiz: You scored ${submittedDemoScore} out of ${classDemoQuestions.length}.`
                : answeredInClassCount < classDemoQuestions.length
                ? `Please select an option for both questions (${answeredInClassCount}/${classDemoQuestions.length} selected) to submit.`
                : 'Both questions answered! Click Submit Demo Answers to view correct answers.'}
            </p>
            {!quizSubmitted ? (
              <button
                type="button"
                disabled={answeredInClassCount < classDemoQuestions.length}
                onClick={() => setQuizSubmitted(true)}
                className={`px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 transition-all ${
                  answeredInClassCount < classDemoQuestions.length
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md cursor-pointer'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> Submit Demo Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={handleResetDemoQuiz}
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Try {selectedDemoClass} Quiz Again
              </button>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE TAB 2: LIVE SUDOKU & BRAIN PUZZLES
         ===================================================================== */}
      {activeTab === 'live-puzzles' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 animate-in fade-in duration-200">
          {/* Interactive 4x4 Sudoku */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                  Playable Demo Sudoku
                </span>
                <h2 className="text-xl font-black text-slate-900 mt-2">
                  4×4 Mini Champion Sudoku
                </h2>
              </div>
              <button
                onClick={() => {
                  setSudokuGrid(INITIAL_DEMO_SUDOKU.map(row => [...row]));
                  setSudokuMessage(null);
                }}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Grid
              </button>
            </div>
            <p className="text-xs text-slate-600 mb-5">
              Fill the empty cells so every row, column, and 2×2 box contains numbers <strong>1, 2, 3, and 4</strong> without repeating!
            </p>

            <div className="flex flex-col items-center">
              <div className="grid grid-cols-4 gap-2 bg-slate-900 p-3 rounded-2xl shadow-inner mb-5">
                {sudokuGrid.map((row, rIdx) =>
                  row.map((val, cIdx) => {
                    const isFixed = INITIAL_DEMO_SUDOKU[rIdx][cIdx] !== null;
                    const isSelected = selectedCell?.[0] === rIdx && selectedCell?.[1] === cIdx;
                    return (
                      <button
                        key={`${rIdx}-${cIdx}`}
                        onClick={() => !isFixed && setSelectedCell([rIdx, cIdx])}
                        className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl font-black text-xl flex items-center justify-center transition-all cursor-pointer ${
                          isFixed
                            ? 'bg-slate-200 text-slate-900 cursor-not-allowed'
                            : isSelected
                            ? 'bg-amber-300 text-slate-950 ring-4 ring-amber-400'
                            : 'bg-white text-indigo-700 hover:bg-indigo-50'
                        }`}
                      >
                        {val ?? ''}
                      </button>
                    );
                  })
                )}
              </div>

              {/* Number Pad */}
              <div className="flex items-center gap-2.5 mb-4">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => handleSudokuInput(n)}
                    className="w-12 h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-lg shadow-sm cursor-pointer"
                  >
                    {n}
                  </button>
                ))}
                <button
                  onClick={() => handleSudokuInput(null)}
                  className="px-4 h-12 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  Clear Cell
                </button>
              </div>

              {sudokuMessage && (
                <div className="w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-sm font-bold text-center">
                  {sudokuMessage}
                </div>
              )}
            </div>
          </div>

          {/* Interactive Brain Riddles */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800">
              Interactive Logic Riddles
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-2 mb-4">
              Brain Booster Puzzles (Included in Free Plan!)
            </h2>

            <div className="space-y-5">
              {DEMO_RIDDLES.map(riddle => {
                const chosen = riddleAnswers[riddle.id];
                const hintVisible = showRiddleHint[riddle.id];
                return (
                  <div key={riddle.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-black text-slate-900 text-sm">{riddle.title}</h3>
                      <button
                        onClick={() =>
                          setShowRiddleHint(prev => ({ ...prev, [riddle.id]: !prev[riddle.id] }))
                        }
                        className="text-xs font-bold text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" /> {hintVisible ? 'Hide Hint' : 'Show Hint'}
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-slate-800 mb-3">{riddle.question}</p>

                    {hintVisible && (
                      <p className="text-xs bg-amber-50 border border-amber-200 text-amber-900 p-2.5 rounded-xl mb-3 font-medium">
                        💡 Hint: {riddle.hint}
                      </p>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      {riddle.options.map((opt, idx) => {
                        const isPicked = chosen === idx;
                        const isRight = idx === riddle.correctIndex;
                        return (
                          <button
                            key={idx}
                            onClick={() => setRiddleAnswers(prev => ({ ...prev, [riddle.id]: idx }))}
                            className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                              chosen !== undefined
                                ? isRight
                                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                  : isPicked
                                  ? 'bg-rose-100 border-rose-400 text-rose-900'
                                  : 'bg-white border-slate-200 text-slate-400'
                                : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {chosen !== undefined && (
                      <p className="mt-3 text-xs font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                        {chosen === riddle.correctIndex ? '🎉 Spot on! ' : '💡 Solution: '}
                        {riddle.explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE TAB 3: LIVE STORIES WITH ENGLISH & MARATHI FEMALE AUDIO
         ===================================================================== */}
      {activeTab === 'live-stories' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg mb-10 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-100 text-rose-700">
                Live Audio Narration • Complete Playback
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Test English & Marathi Story Audio Narration
              </h2>
            </div>

            {/* Switch between English Story & Marathi Shivaji Story */}
            <div className="flex gap-2">
              {DEMO_STORIES.map((st, idx) => (
                <button
                  key={st.id}
                  onClick={() => {
                    handleStopDemoStory();
                    setActiveStoryIndex(idx);
                    setStoryQuizSelected(null);
                  }}
                  className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all cursor-pointer ${
                    activeStoryIndex === idx
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {st.language === 'en' ? '🇬🇧 English Story Demo' : '🚩 मराठी शिवचरित्र कथा (Marathi)'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-50/70 via-white to-amber-50/50 rounded-2xl p-6 border border-indigo-100 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                  🎙️ {activeStory.voiceBadge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">{activeStory.title}</h3>
                <p className="text-xs font-bold text-slate-500">{activeStory.category}</p>
              </div>

              {/* Full Audio Controls: Play, Pause, Resume, Restart */}
              <div className="flex flex-wrap items-center gap-2">
                {!isSpeaking ? (
                  <button
                    onClick={handlePlayDemoStory}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current" /> Play Full Story
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handlePauseDemoStory}
                      disabled={isPaused}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer ${
                        isPaused
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm'
                      }`}
                    >
                      <Pause className="w-4 h-4" /> Pause
                    </button>
                    <button
                      onClick={handleResumeDemoStory}
                      disabled={!isPaused}
                      className={`px-4 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 cursor-pointer ${
                        !isPaused
                          ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current" /> Resume
                    </button>
                    <button
                      onClick={handleRestartDemoStory}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" /> Restart
                    </button>
                    <button
                      onClick={handleStopDemoStory}
                      className="px-3.5 py-2.5 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-700 font-black text-xs cursor-pointer"
                    >
                      Stop
                    </button>
                  </>
                )}
              </div>
            </div>

            {isSpeaking && (
              <div className="mb-4 bg-white p-3 rounded-xl border border-indigo-200 flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-900 flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-indigo-600 animate-pulse" />
                  {isPaused
                    ? 'Audio Paused — Click Resume to continue'
                    : `Narrating sentence ${audioProgress.current} of ${Math.max(audioProgress.total, 1)}...`}
                </span>
                <span className="text-xs font-black text-indigo-600">
                  {audioProgress.total > 0
                    ? `${Math.round((audioProgress.current / audioProgress.total) * 100)}%`
                    : 'Playing'}
                </span>
              </div>
            )}

            <div className="space-y-3 text-slate-800 leading-relaxed font-medium text-base bg-white p-5 rounded-2xl border border-slate-200/80">
              {activeStory.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="pt-3 mt-3 border-t border-amber-200 bg-amber-50/70 p-3.5 rounded-xl text-amber-950 font-bold text-sm">
                🌟 {activeStory.language === 'mr' ? 'तात्पर्य:' : 'Moral:'} {activeStory.moral}
              </div>
            </div>

            {/* Story Comprehension Mini Question */}
            <div className="mt-5 bg-white p-5 rounded-2xl border border-slate-200">
              <p className="text-xs font-black uppercase tracking-wider text-indigo-600 mb-1">
                Interactive Story Quiz
              </p>
              <p className="font-black text-slate-900 text-sm mb-3">{activeStory.quizQuestion}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeStory.quizOptions.map((opt, idx) => {
                  const isPicked = storyQuizSelected === idx;
                  const isCorrect = idx === activeStory.correctOption;
                  return (
                    <button
                      key={idx}
                      onClick={() => setStoryQuizSelected(idx)}
                      className={`p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                        storyQuizSelected !== null
                          ? isCorrect
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                            : isPicked
                            ? 'bg-rose-50 border-rose-400 text-rose-900'
                            : 'bg-slate-50 border-slate-200 text-slate-400'
                          : 'bg-slate-50 border-slate-200 hover:border-indigo-400 text-slate-800'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE TAB 4: LIVE DRAWING STUDIO
         ===================================================================== */}
      {activeTab === 'live-drawing' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg mb-10 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-pink-100 text-pink-700">
                Interactive Creative Canvas
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Demo Drawing & Coloring Pad
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['Fort Raigad Outline', 'Peacock Feather', 'Freehand Canvas'] as const).map(tpl => (
                <button
                  key={tpl}
                  onClick={() => setDrawingTemplate(tpl)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer ${
                    drawingTemplate === tpl
                      ? 'bg-pink-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {tpl}
                </button>
              ))}
            </div>
          </div>

          {/* Brush Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-600 mr-1">Colors:</span>
              {['#4F46E5', '#EF4444', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#0F172A'].map(color => (
                <button
                  key={color}
                  onClick={() => setBrushColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                    brushColor === color ? 'scale-125 border-slate-900 shadow-md' : 'border-white'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-slate-600">
                Brush Size: {brushSize}px
              </label>
              <input
                type="range"
                min={2}
                max={20}
                value={brushSize}
                onChange={e => setBrushSize(Number(e.target.value))}
                className="w-24 accent-indigo-600"
              />
              <button
                onClick={() => setBrushColor('#FFFFFF')}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer"
              >
                <Eraser className="w-3.5 h-3.5" /> Eraser
              </button>
              <button
                onClick={() => initCanvas(drawingTemplate)}
                className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Clear Canvas
              </button>
            </div>
          </div>

          <div className="border-2 border-dashed border-indigo-200 rounded-2xl overflow-hidden bg-white flex justify-center">
            <canvas
              ref={canvasRef}
              width={640}
              height={260}
              onMouseDown={startDrawing}
              onMouseMove={drawMove}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={drawMove}
              onTouchEnd={stopDrawing}
              className="w-full max-w-[640px] h-[260px] cursor-crosshair touch-none"
            />
          </div>
        </div>
      )}

      {/* =====================================================================
          INTERACTIVE TAB 5: CRICKET & SCHOLARSHIP CHALLENGES
         ===================================================================== */}
      {activeTab === 'live-champions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg mb-10 animate-in fade-in duration-200">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800">
            Premium ₹99 Features Sampler
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2 mb-6">
            Try Live Cricket Knowledge & Maharashtra Scholarship Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMO_CHAMPION_QUESTIONS.map(item => {
              const picked = champAnswers[item.id];
              return (
                <div key={item.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-black text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <h3 className="text-base font-black text-slate-900 mt-3 mb-4">{item.question}</h3>
                  <div className="space-y-2">
                    {item.options.map((opt, idx) => {
                      const isRight = idx === item.correctIndex;
                      const isChosen = picked === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => setChampAnswers(prev => ({ ...prev, [item.id]: idx }))}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${
                            picked !== undefined
                              ? isRight
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-900'
                                : isChosen
                                ? 'bg-rose-50 border-rose-400 text-rose-900'
                                : 'bg-white border-slate-200 text-slate-400'
                              : 'bg-white border-slate-200 hover:border-indigo-400 text-slate-800'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== undefined && (
                    <p className="mt-3 text-xs font-bold text-indigo-900 bg-indigo-50 p-3 rounded-xl border border-indigo-200">
                      {item.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          DEMO OVERVIEW MODULES & PERFORMANCE PREVIEW
         ===================================================================== */}
      <div className="space-y-8">
        {/* 1. Student Dashboard & Performance Tracking Preview + 2. Demo Quizzes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-black">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">1. Student Progress &amp; Class Preview</h2>
                  <p className="text-xs text-slate-500">{getBoardShortLabel(selectedDemoBoard)} • Standard {formatStandardOrdinal(selectedDemoClass)} ({demoSubjects.length} Subjects)</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('live-curriculum')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black cursor-pointer"
              >
                Preview Worksheets →
              </button>
            </div>
            <div className="space-y-3">
              <div
                onClick={() => setActiveTab('live-curriculum')}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-indigo-400 cursor-pointer transition-all space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-sm">Sample Performance Tracking Preview</span>
                  <span className="text-[10px] font-black px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">{getBoardShortLabel(selectedDemoBoard)} DEMO</span>
                </div>
                <p className="text-xs text-slate-500">
                  Registered students get real-time subject accuracy bars, chapter-wise worksheet scores, daily streak tracking, and achievement badges across Maharashtra, CBSE &amp; ICSE boards.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 block">Board &amp; Class</span>
                    <span className="text-xs font-black text-indigo-700">{getBoardShortLabel(selectedDemoBoard)} • {selectedDemoClass}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 block">Demo Score</span>
                    <span className="text-xs font-black text-emerald-700">
                      {quizSubmitted
                        ? `${submittedDemoScore} / ${classDemoQuestions.length}`
                        : `${answeredInClassCount} / ${classDemoQuestions.length}`}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <span className="text-[10px] font-bold text-slate-400 block">Sample Worksheets</span>
                    <span className="text-xs font-black text-amber-700">{demoWorksheets.length} Subjects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Demo Quizzes */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center font-black">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    2. Demo Subject Quizzes ({getBoardShortLabel(selectedDemoBoard)} • {formatStandardOrdinal(selectedDemoClass)})
                  </h2>
                  <p className="text-xs text-slate-500">
                    2 unique questions tailored for {getBoardShortLabel(selectedDemoBoard)} {selectedDemoClass}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('live-quiz')}
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black cursor-pointer"
              >
                Open Quiz Player →
              </button>
            </div>
            <div className="space-y-3">
              {classDemoQuestions.map((dq, i) => (
                <div
                  key={dq.id}
                  onClick={() => setActiveTab('live-quiz')}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-500 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">
                        {dq.subject} — {dq.topic}
                      </span>
                      <span className="text-[10px] font-black px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                        {getBoardShortLabel(selectedDemoBoard)} {selectedDemoClass}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Question {i + 1} of {classDemoQuestions.length} • 4 MCQ Options
                    </p>
                  </div>
                  <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl flex items-center gap-1 shrink-0">
                    <Play className="w-3.5 h-3.5 fill-current" /> Play Now
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Demo Brain Games & 4. Demo Stories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center font-black">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">3. Demo Brain Games & Sudoku</h2>
                  <p className="text-xs text-slate-500">Click to solve the live 4×4 Sudoku & Logic Riddles</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('live-puzzles')}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-black cursor-pointer"
              >
                Play Puzzles →
              </button>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Champion Sudoku 4×4 Grid', type: 'Zero Row/Col/Box Repetition • Interactive', reward: 'Solve Live' },
                { name: 'Number Sequence & Clock Riddle', type: 'Analytical Thinking • Hint Enabled', reward: 'Solve Live' },
              ].map((bg, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab('live-puzzles')}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-purple-400 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{bg.name}</span>
                      <span className="text-[10px] font-black px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">PLAYABLE</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{bg.type}</p>
                  </div>
                  <span className="text-xs font-black text-purple-700 bg-purple-100 px-3 py-1.5 rounded-xl">
                    {bg.reward}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center font-black">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">4. Demo Audio Stories (EN & MR)</h2>
                  <p className="text-xs text-slate-500">Click to listen with Female Marathi & English Voices</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('live-stories')}
                className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black cursor-pointer"
              >
                Listen Live →
              </button>
            </div>
            <div className="space-y-3">
              {[
                { idx: 1, title: 'शिवरायांची युद्धनीती आणि गनिमी कावा', voice: 'Fluent Female Marathi Voice (mr-IN)', moral: 'Listen Now 🔊' },
                { idx: 0, title: 'The Golden Feather of Honesty', voice: 'Sweet & Polite English Female Voice', moral: 'Listen Now 🔊' },
              ].map((st, i) => (
                <div
                  key={i}
                  onClick={() => {
                    handleStopDemoStory();
                    setActiveStoryIndex(st.idx);
                    setActiveTab('live-stories');
                  }}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-rose-400 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800 text-sm">{st.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">🎙️ {st.voice}</p>
                  </div>
                  <span className="text-xs font-black text-rose-700 bg-rose-100 px-3 py-1.5 rounded-xl shrink-0">
                    {st.moral}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Demo Drawing & 6. Demo Progress Reports */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center font-black">
                  <Palette className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">5. Demo Drawing & Certificates</h2>
                  <p className="text-xs text-slate-500">Click to open the interactive drawing canvas</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('live-drawing')}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black cursor-pointer"
              >
                Open Canvas →
              </button>
            </div>
            <div className="space-y-3">
              {[
                { tpl: 'Fort Raigad Outline' as const, title: 'Fort Raigad Digital Sketch Pad', date: 'Interactive Brush & Colors', id: 'Paint Live 🎨' },
                { tpl: 'Peacock Feather' as const, title: 'Peacock Feather Art Challenge', date: 'Creative Studio Demo', id: 'Paint Live 🎨' },
              ].map((cert, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setDrawingTemplate(cert.tpl);
                    setActiveTab('live-drawing');
                  }}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{cert.title}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{cert.date}</p>
                  </div>
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl">
                    {cert.id}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-slate-900">6. Demo Cricket & Scholarship</h2>
                  <p className="text-xs text-slate-500">Click to test Cricket & MSCE Scholarship questions</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('live-champions')}
                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black cursor-pointer"
              >
                Try Questions →
              </button>
            </div>
            <div className="space-y-3">
              {[
                { metric: 'Cricket Laws & IPL Mastery', accuracy: 'Interactive Quiz', topSubjects: 'Overs, Fielding & World Cup' },
                { metric: 'Maharashtra Scholarship Paper 1 & 2', accuracy: '4th & 7th Std', topSubjects: 'Intelligence Test & Marathi' },
              ].map((pr, i) => (
                <div
                  key={i}
                  onClick={() => setActiveTab('live-champions')}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-400 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div>
                    <span className="font-bold text-slate-800 text-sm">{pr.metric}</span>
                    <p className="text-xs text-slate-500 mt-0.5">{pr.topSubjects}</p>
                  </div>
                  <span className="text-xs font-black text-blue-700 bg-blue-100 px-3 py-1.5 rounded-xl">
                    {pr.accuracy}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 7. Two Flexible Subscription Plans Comparison */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-100 text-indigo-700">
                7. Flexible Subscription Plans
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-2">
                Compare Our 2 Plans (Free Lifetime • ₹99 Premium)
              </h2>
            </div>
            <button
              onClick={onUpgradeClick}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl text-xs cursor-pointer"
            >
              Upgrade Plan Now
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Free Plan */}
            <div className="p-6 rounded-2xl bg-slate-50 border-2 border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    FREE FOREVER
                  </span>
                  <span className="text-xs font-bold text-slate-500">Never Expires</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">FREE PLAN</h3>
                <div className="text-3xl font-black text-slate-900 my-2">
                  ₹0 <span className="text-xs font-bold text-emerald-600">/ Lifetime</span>
                </div>
                <ul className="space-y-2 text-xs font-bold text-slate-700 mt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Brain Puzzles</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Sudoku (4×4, 6×6, 9×9)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> English Subject Quizzes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Mathematics Subject Quizzes</li>
                  <li className="flex items-center gap-2 text-slate-400"><Lock className="w-4 h-4 shrink-0" /> Other 12 Subjects & Stories Locked</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-center text-xs font-black text-emerald-700">
                Automatically Active on Sign Up
              </div>
            </div>

            {/* Premium Plan ₹99 */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50 border-2 border-amber-400 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500 text-slate-950">
                    FULL UNLOCK • BEST VALUE
                  </span>
                  <span className="text-xs font-bold text-amber-800">1 Year (365 Days)</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">PREMIUM PLAN</h3>
                <div className="text-3xl font-black text-amber-600 my-2">
                  ₹99 <span className="text-xs font-bold text-slate-500">/ 1 Year (365 Days)</span>
                </div>
                <ul className="space-y-2 text-xs font-bold text-slate-800 mt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Full Access to Entire Application</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> All 14 Subjects, Quizzes, Stories & Drawing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Cricket Champions Hub & 500+ Quiz Bank</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> Maharashtra Scholarship (4th & 7th Std)</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" /> AI Learning Academy, Certificates & Referrals</li>
                </ul>
              </div>
              <button
                onClick={onUpgradeClick}
                className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs cursor-pointer shadow-sm"
              >
                Upgrade to ₹99 Premium
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
