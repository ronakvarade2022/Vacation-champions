import React, { useState, useMemo, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  XCircle,
  Award,
  Clock,
  BookOpen,
  Sparkles,
  RotateCcw,
  ChevronRight,
  ArrowLeft,
  Check,
  Filter,
  GraduationCap,
  HelpCircle,
  Lock,
  ShieldCheck,
  Crown,
  AlertTriangle,
  X
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import {
  ALL_10_CLASSES,
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta
} from '../data/classCurriculumConfig';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import {
  OnlineWorksheet,
  WORKSHEET_FORMAT_LABELS,
  getAllWorksheetsForClass,
  getWorksheetsForClassAndSubject,
  getFreeDemoWorksheets,
  getFreeDemoWorksheetIdsForClass
} from '../data/worksheetsData';
import {
  canAccessWorksheet,
  getBoardClassSubscriptionInfo,
  getBoardShortLabel,
  getPremiumActivatedBannerMessage,
  formatStandardOrdinal,
  WORKSHEET_PREMIUM_UPGRADE_MESSAGE,
  WORKSHEET_CLASS_LOCK_MESSAGE
} from '../utils/subscriptionAccess';

interface WorksheetsViewProps {
  initialClassLevel?: ClassLevel;
  initialSubject?: SubjectName;
  onUnlockClick?: (targetClass?: ClassLevel, targetBoard?: EducationBoard) => void;
}

export const WorksheetsView: React.FC<WorksheetsViewProps> = ({
  initialClassLevel,
  initialSubject,
  onUnlockClick
}) => {
  const { currentStudent, activeBoard, submitWorksheetAttempt, switchActiveBoardAndClass } = useApp();

  const userRegisteredBoard: EducationBoard = activeBoard;
  const userRegisteredClass: ClassLevel = currentStudent?.classLevel || initialClassLevel || 'Class 4';
  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>(userRegisteredBoard);
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(userRegisteredClass);
  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'ALL'>(
    initialSubject || 'ALL'
  );
  const [activeWorksheet, setActiveWorksheet] = useState<OnlineWorksheet | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [writtenNotes, setWrittenNotes] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lockedModalWorksheet, setLockedModalWorksheet] = useState<OnlineWorksheet | null>(null);
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  const selectedClassInfo = useMemo(
    () => getBoardClassSubscriptionInfo(currentStudent, selectedBoard, selectedClass),
    [currentStudent, selectedBoard, selectedClass]
  );
  const isPremiumStudent = selectedClassInfo.isPaidActive;
  const freeDemoWorksheetIds = useMemo(
    () => getFreeDemoWorksheetIdsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );
  const freeDemoWorksheets = useMemo(
    () => getFreeDemoWorksheets(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  // Keep selectedBoard & selectedClass synced to user's active workspace when account/workspace changes
  useEffect(() => {
    setSelectedBoard(activeBoard);
    if (currentStudent?.classLevel) {
      setSelectedClass(currentStudent.classLevel);
    }
  }, [currentStudent?.id, currentStudent?.classLevel, activeBoard]);

  // Security guard: if activeWorksheet is ever set to a locked worksheet (e.g. account switch or state tampering), close immediately
  useEffect(() => {
    if (activeWorksheet) {
      const check = canAccessWorksheet(
        currentStudent,
        activeWorksheet.id,
        activeWorksheet.classLevel,
        undefined,
        activeWorksheet.board || selectedBoard
      );
      if (!check.allowed) {
        setLockedModalWorksheet(activeWorksheet);
        setActiveWorksheet(null);
      }
    }
  }, [activeWorksheet, currentStudent, selectedBoard]);

  // Strict Anti-Print & Anti-Download Keyboard Shortcut Protection (for BOTH Free and Premium users, Students and Teachers)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key?.toLowerCase();
      if ((e.ctrlKey || e.metaKey) && (key === 'p' || key === 's')) {
        e.preventDefault();
        e.stopPropagation();
        setSecurityNotice(
          'Printing and downloading worksheets are disabled. All worksheets must be viewed and completed online inside MyStudyZone.'
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown, { capture: true });
    return () => window.removeEventListener('keydown', handleKeyDown, { capture: true });
  }, []);

  // Ensure selectedSubject is valid for the selectedBoard & selectedClass
  const classSubjects = useMemo(() => getSubjectsForClass(selectedClass, selectedBoard), [selectedClass, selectedBoard]);

  const effectiveSubject: SubjectName | 'ALL' = useMemo(() => {
    if (selectedSubject === 'ALL') return 'ALL';
    return classSubjects.includes(selectedSubject) ? selectedSubject : 'ALL';
  }, [selectedSubject, classSubjects]);

  const worksheetsList = useMemo(() => {
    if (effectiveSubject === 'ALL') {
      return getAllWorksheetsForClass(selectedClass, selectedBoard);
    }
    return getWorksheetsForClassAndSubject(selectedClass, effectiveSubject, selectedBoard);
  }, [selectedClass, effectiveSubject, selectedBoard]);

  const completedWorksheetIds = useMemo(
    () => new Set(currentStudent?.completedWorksheetIds || []),
    [currentStudent?.completedWorksheetIds]
  );

  const attemptMap = useMemo(() => {
    const map = new Map<string, { obtainedMarks: number; totalMarks: number; percentage: number; completedAt: string }>();
    for (const att of currentStudent?.worksheetAttempts || []) {
      if (!map.has(att.worksheetId)) {
        map.set(att.worksheetId, {
          obtainedMarks: att.obtainedMarks,
          totalMarks: att.totalMarks,
          percentage: att.percentage,
          completedAt: att.completedAt
        });
      }
    }
    return map;
  }, [currentStudent?.worksheetAttempts]);

  const handleStartWorksheet = async (ws: OnlineWorksheet) => {
    const wsBoard = ws.board || selectedBoard;
    const access = canAccessWorksheet(currentStudent, ws.id, ws.classLevel, undefined, wsBoard);
    if (!access.allowed) {
      setLockedModalWorksheet(ws);
      return;
    }

    // Secondary backend verification check (non-blocking if offline, strict if server responds 403)
    try {
      const resp = await fetch('/api/worksheets/verify-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentId: currentStudent?.id || 'guest',
          worksheetId: ws.id,
          clientPlan: isPremiumStudent ? 'premium' : 'free',
          selectedBoard: wsBoard,
          selectedClass: ws.classLevel
        })
      });
      if (resp.status === 403) {
        setLockedModalWorksheet(ws);
        return;
      }
    } catch {
      // Offline / local fallback handled by strict client check above
    }

    setLockedModalWorksheet(null);
    setActiveWorksheet(ws);
    setSelectedAnswers({});
    setWrittenNotes({});
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitWorksheet = () => {
    if (!activeWorksheet) return;
    const wsBoard = activeWorksheet.board || selectedBoard;
    const access = canAccessWorksheet(currentStudent, activeWorksheet.id, activeWorksheet.classLevel, undefined, wsBoard);
    if (!access.allowed) {
      setLockedModalWorksheet(activeWorksheet);
      setActiveWorksheet(null);
      return;
    }

    let obtainedMarks = 0;
    activeWorksheet.questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        obtainedMarks += q.marks;
      }
    });

    const percentage = Math.round((obtainedMarks / activeWorksheet.totalMarks) * 100);
    setIsSubmitted(true);

    submitWorksheetAttempt({
      worksheetId: activeWorksheet.id,
      board: wsBoard,
      classLevel: activeWorksheet.classLevel,
      subject: activeWorksheet.subject,
      worksheetTitle: activeWorksheet.title,
      totalMarks: activeWorksheet.totalMarks,
      obtainedMarks,
      percentage
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTriggerUpgrade = (explicitClass?: ClassLevel, explicitBoard?: EducationBoard) => {
    const targetCls = explicitClass || lockedModalWorksheet?.classLevel || selectedClass;
    const targetBrd = explicitBoard || lockedModalWorksheet?.board || selectedBoard;
    setLockedModalWorksheet(null);
    if (onUnlockClick) {
      onUnlockClick(targetCls, targetBrd);
    }
  };

  // Calculate current active worksheet score if submitted
  const currentObtainedMarks = useMemo(() => {
    if (!activeWorksheet) return 0;
    return activeWorksheet.questions.reduce((sum, q) => {
      return sum + (selectedAnswers[q.id] === q.correctIndex ? q.marks : 0);
    }, 0);
  }, [activeWorksheet, selectedAnswers]);

  const ownClassWorksheetsSummary = useMemo(() => {
    const ownClassTotal = getAllWorksheetsForClass(selectedClass, selectedBoard).length;
    const freeDemoCount = selectedClassInfo.isFreeBase ? freeDemoWorksheetIds.length : 0;
    return {
      ownClassTotal,
      freeDemoCount,
      lockedInOwnClassCount: Math.max(0, ownClassTotal - freeDemoCount)
    };
  }, [selectedClass, selectedBoard, selectedClassInfo.isFreeBase, freeDemoWorksheetIds]);

  // If solving a specific worksheet (strictly verified unlocked or demo worksheet for user's registered board & class)
  if (
    activeWorksheet &&
    canAccessWorksheet(
      currentStudent,
      activeWorksheet.id,
      activeWorksheet.classLevel,
      undefined,
      activeWorksheet.board || selectedBoard
    ).allowed
  ) {
    const wsActiveBoard = activeWorksheet.board || selectedBoard;
    const subjMeta = getSubjectMeta(activeWorksheet.subject, wsActiveBoard);
    const answeredCount = Object.keys(selectedAnswers).length;
    const totalQuestions = activeWorksheet.questions.length;
    const percentage = Math.round((currentObtainedMarks / activeWorksheet.totalMarks) * 100);
    const isDemoWorksheet = freeDemoWorksheetIds.includes(activeWorksheet.id);

    return (
      <>
        {/* Print-Blocked Notice (Only visible if someone forces browser @media print) */}
        <div className="hidden worksheet-print-blocked-notice">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            🔒 Printing &amp; Downloading Disabled – MyStudyZone
          </h2>
          <p className="text-sm text-slate-700">
            Printing, saving as PDF, and downloading worksheets are strictly disabled on MyStudyZone for both Free and Premium accounts. Please view and complete all worksheets interactively inside the MyStudyZone website.
          </p>
        </div>

        <div
          className="space-y-6 pb-16 worksheet-no-print-zone select-none"
          onContextMenu={e => e.preventDefault()}
        >
          {/* Top Navigation & Security Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
            <button
              onClick={() => setActiveWorksheet(null)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Worksheets Library
            </button>

            <div className="flex flex-wrap items-center gap-2.5">
              {isDemoWorksheet ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-extrabold text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  Free Demo Worksheet ({activeWorksheet.subject})
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs">
                  <Crown className="w-3.5 h-3.5 text-amber-600" />
                  ₹99 Premium Worksheet Unlocked
                </span>
              )}
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Online Interactive Mode Only (Print &amp; Download Disabled)
              </span>
            </div>
          </div>

          {securityNotice && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center justify-between gap-4 text-rose-900">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <p className="text-xs sm:text-sm font-bold">{securityNotice}</p>
              </div>
              <button
                onClick={() => setSecurityNotice(null)}
                className="px-3 py-1 rounded-lg bg-rose-200/70 hover:bg-rose-200 text-rose-900 text-xs font-extrabold cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Worksheet Header Banner */}
          <div className="bg-white rounded-3xl border-2 border-amber-200/80 shadow-md p-6 sm:p-8 space-y-6">
            <div className="border-b-2 border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
                    MyStudyZone • Online Interactive Worksheet
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-900 font-extrabold text-xs">
                    {getBoardShortLabel(wsActiveBoard)}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 font-extrabold text-xs">
                    {activeWorksheet.classLevel}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs">
                    {subjMeta.icon} {activeWorksheet.subject}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
                  {activeWorksheet.title}
                </h1>
                <p className="text-sm font-bold text-slate-600">
                  {activeWorksheet.marathiSubtitle} • <span className="text-indigo-700">{activeWorksheet.chapterName}</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2.5 text-center">
                  <div className="text-[11px] font-bold uppercase text-amber-700">Total Marks</div>
                  <div className="text-xl font-black text-amber-950">{activeWorksheet.totalMarks}</div>
                </div>
                <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-4 py-2.5 text-center">
                  <div className="text-[11px] font-bold uppercase text-indigo-700">Duration</div>
                  <div className="text-xl font-black text-indigo-950">{activeWorksheet.durationMinutes} Mins</div>
                </div>
              </div>
            </div>

            {/* Student Info Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm">
              <div>
                Student Name: <span className="font-bold text-slate-900">{currentStudent?.name || 'Student'}</span>
              </div>
              <div>
                Board: <span className="font-bold text-slate-900">{getBoardShortLabel(wsActiveBoard)}</span>
              </div>
              <div>
                Class: <span className="font-bold text-slate-900">{activeWorksheet.classLevel}</span>
              </div>
              <div>
                Subject: <span className="font-bold text-slate-900">{activeWorksheet.subject}</span>
              </div>
            </div>

            {/* Instant Score Summary Card (if submitted) */}
            {isSubmitted && (
              <div className="rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white p-6 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-extrabold uppercase tracking-wider">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Worksheet Evaluated Instantly Online
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-display font-black">
                    You Scored {currentObtainedMarks} / {activeWorksheet.totalMarks} Marks ({percentage}%)
                  </h2>
                  <p className="text-emerald-100 text-xs sm:text-sm font-medium">
                    Review the detailed step-by-step solutions and model answers for all {totalQuestions} questions below!
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedAnswers({});
                      setWrittenNotes({});
                      setIsSubmitted(false);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white text-emerald-900 hover:bg-emerald-50 font-extrabold text-xs transition-all cursor-pointer shadow-sm"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Re-Attempt Worksheet Online
                  </button>
                </div>
              </div>
            )}

            {/* Questions List */}
            <div className="space-y-6">
              {activeWorksheet.questions.map(q => {
                const fmtMeta = WORKSHEET_FORMAT_LABELS[q.format];
                const userSelected = selectedAnswers[q.id];
                const isCorrect = userSelected === q.correctIndex;
                const needsWrittenBox =
                  q.format === 'short_answer' ||
                  q.format === 'long_answer' ||
                  q.format === 'math_exercise' ||
                  q.format === 'science_activity';

                return (
                  <div
                    key={q.id}
                    className={`rounded-2xl border-2 p-5 transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'border-emerald-300 bg-emerald-50/30'
                          : 'border-rose-300 bg-rose-50/30'
                        : 'border-slate-200 bg-white hover:border-amber-300'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs flex items-center justify-center">
                          Q{q.number}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border ${fmtMeta.badgeColor}`}>
                          {fmtMeta.icon} {fmtMeta.label}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          • {q.chapterTitle}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-900 font-extrabold text-xs">
                        [{q.marks} Marks]
                      </span>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-relaxed">
                      {q.prompt.replace(/^\[.*?\]\s*/, '')}
                    </p>

                    {/* Optional Practice Rough Work / Written Response Area */}
                    {needsWrittenBox && (
                      <div className="mb-4">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                          Your Written Working / Steps (Optional Practice Space):
                        </label>
                        <textarea
                          rows={2}
                          value={writtenNotes[q.id] || ''}
                          onChange={e => setWrittenNotes(prev => ({ ...prev, [q.id]: e.target.value }))}
                          disabled={isSubmitted}
                          placeholder="Type your steps, formula, or short answer here before selecting the final verified option below..."
                          className="w-full rounded-xl border border-slate-300 px-3.5 py-2 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-indigo-500 bg-slate-50/70"
                        />
                      </div>
                    )}

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userSelected === oIdx;
                        const isRightOption = q.correctIndex === oIdx;

                        let btnStyle = 'border-slate-200 bg-slate-50 hover:bg-amber-50/60 hover:border-amber-300 text-slate-800';
                        if (!isSubmitted && isSelected) {
                          btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 ring-2 ring-indigo-500/20';
                        } else if (isSubmitted) {
                          if (isRightOption) {
                            btnStyle = 'border-emerald-500 bg-emerald-100/80 text-emerald-950 font-extrabold';
                          } else if (isSelected && !isRightOption) {
                            btnStyle = 'border-rose-400 bg-rose-100/80 text-rose-950 line-through';
                          } else {
                            btnStyle = 'border-slate-200 bg-slate-50 text-slate-500 opacity-75';
                          }
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            disabled={isSubmitted}
                            onClick={() => handleSelectOption(q.id, oIdx)}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all cursor-pointer ${btnStyle}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-6 h-6 rounded-lg bg-white border border-slate-300 text-slate-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                                {String.fromCharCode(65 + oIdx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                            {isSubmitted && isRightOption && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isSelected && !isRightOption && (
                              <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Solution & Explanation Box (Shown after online submission) */}
                    {isSubmitted && (
                      <div className="mt-4 pt-3 border-t border-slate-200/80 bg-amber-50/70 rounded-xl p-3.5 text-xs space-y-1">
                        <div className="font-extrabold text-emerald-800 flex items-center gap-1.5">
                          <Check className="w-4 h-4" />
                          Correct Answer: ({String.fromCharCode(65 + q.correctIndex)}) {q.options[q.correctIndex]}
                        </div>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          <span className="font-bold text-slate-900">Model Solution / Explanation:</span> {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Submit Worksheet Footer Bar */}
            {!isSubmitted && (
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs sm:text-sm font-bold text-slate-600">
                  Answered <span className="text-indigo-700 font-black">{answeredCount}</span> of{' '}
                  <span className="text-slate-900 font-black">{totalQuestions}</span> questions • Complete and submit online to get instant marks and model solutions.
                </div>
                <button
                  type="button"
                  onClick={handleSubmitWorksheet}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  Submit Worksheet &amp; View Instant Results ({answeredCount}/{totalQuestions})
                </button>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  // Main Worksheets Browser View (All 3 Boards • Standards 1st to 10th & All Subjects)
  const selectedClassMeta = ALL_10_CLASSES_META.find(c => c.classLevel === selectedClass);
  const classAllWorksheets = getAllWorksheetsForClass(selectedClass, selectedBoard);
  const classCompletedCount = classAllWorksheets.filter(w => completedWorksheetIds.has(w.id)).length;
  const classTotalWorksheets = classAllWorksheets.length;
  const selectedStandardOrdinal = formatStandardOrdinal(selectedClass);
  const selectedBoardLabel = getBoardShortLabel(selectedBoard);
  const premiumActivatedBannerText = getPremiumActivatedBannerMessage(selectedClass, selectedBoard);

  return (
    <>
      {/* Print-Blocked Notice (Only visible if someone forces browser @media print) */}
      <div className="hidden worksheet-print-blocked-notice">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          🔒 Printing &amp; Downloading Disabled – MyStudyZone
        </h2>
        <p className="text-sm text-slate-700">
          Printing, saving as PDF, and downloading worksheets are strictly disabled on MyStudyZone for both Free and Premium accounts. Worksheets must be viewed and completed online inside the MyStudyZone website.
        </p>
      </div>

      <div
        className="space-y-8 pb-16 worksheet-no-print-zone"
        onContextMenu={e => e.preventDefault()}
      >
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-300 text-xs font-extrabold uppercase tracking-wider">
                  <FileText className="w-3.5 h-3.5" />
                  <span>
                    {currentStudent?.accountRole === 'teacher' ? 'Teacher Portal' : 'Student Portal'} • {selectedBoardLabel} • Standard {selectedStandardOrdinal} ({selectedClass})
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-indigo-100 text-xs font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Online Completion (No Print / No Download)</span>
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-display font-black tracking-tight">
                Board &amp; Class-Wise Online Worksheets
              </h1>
              <p className="text-indigo-100 text-sm sm:text-base font-medium leading-relaxed">
                Complete interactive worksheets directly inside MyStudyZone for <strong>{selectedBoardLabel} • Standard {selectedStandardOrdinal} ({selectedClass})</strong> — covering MCQs, Fill in the Blanks, Match the Following, True/False, Short &amp; Long Answers, Mathematics Exercises, Grammar Practice, Science Activities, and Logical Reasoning with instant online evaluation!
              </p>
            </div>

            {/* Worksheet Completion & Subscription Status Card */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 shrink-0 min-w-[270px] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-200">
                  {selectedBoardLabel} • {selectedClass} Status
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase ${
                    selectedClassInfo.isPaidActive
                      ? 'bg-emerald-400 text-slate-950'
                      : selectedClassInfo.isExpired
                      ? 'bg-rose-400 text-slate-950'
                      : selectedClassInfo.isFreeBase
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-300 text-slate-950'
                  }`}
                >
                  {selectedClassInfo.isPaidActive
                    ? `₹99 Premium (${selectedClassInfo.daysRemainingDisplay})`
                    : selectedClassInfo.isExpired
                    ? 'Expired • Renew ₹99'
                    : selectedClassInfo.isFreeBase
                    ? 'Free Base (2 Demos)'
                    : 'Locked • ₹99'}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl sm:text-3xl font-black text-white">
                  {classCompletedCount} / {classTotalWorksheets}
                </div>
                <span className="text-xs font-extrabold text-emerald-300">
                  {classTotalWorksheets - classCompletedCount} Pending
                </span>
              </div>
              <div className="w-full h-2.5 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all"
                  style={{
                    width: `${classTotalWorksheets > 0 ? Math.round((classCompletedCount / classTotalWorksheets) * 100) : 0}%`
                  }}
                />
              </div>
              <div className="text-[11px] text-indigo-200 font-medium">
                {selectedClassInfo.isPaidActive
                  ? `All ${ownClassWorksheetsSummary.ownClassTotal} Worksheets Unlocked for ${selectedBoardLabel} Std ${selectedStandardOrdinal}`
                  : selectedClassInfo.isFreeBase
                  ? `2 Free Demo Worksheets Unlocked • ${ownClassWorksheetsSummary.lockedInOwnClassCount} Locked in ${selectedBoardLabel} ${selectedClass}`
                  : `All ${ownClassWorksheetsSummary.ownClassTotal} Worksheets Locked in ${selectedBoardLabel} ${selectedClass} (Activate ₹99)`}
              </div>
            </div>
          </div>
        </div>

        {securityNotice && (
          <div className="bg-rose-50 border-2 border-rose-300 rounded-2xl p-4 flex items-center justify-between gap-4 text-rose-900">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-xs sm:text-sm font-bold">{securityNotice}</p>
            </div>
            <button
              onClick={() => setSecurityNotice(null)}
              className="px-3 py-1 rounded-lg bg-rose-200/70 hover:bg-rose-200 text-rose-900 text-xs font-extrabold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* PER-BOARD & PER-CLASS STATUS BANNER: PAID ACTIVE vs EXPIRED vs LOCKED vs FREE BASE DEMO */}
        {selectedClassInfo.isPaidActive ? (
          <div className="rounded-2xl border-2 border-emerald-400 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Crown className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                    ₹99 Board &amp; Class Premium Active • {currentStudent?.name} ({selectedBoardLabel} • {selectedClass})
                  </span>
                </div>
                <p className="text-sm sm:text-base font-display font-black text-slate-900">
                  {premiumActivatedBannerText}
                </p>
                <p className="text-xs font-bold text-slate-600">
                  All {ownClassWorksheetsSummary.ownClassTotal} worksheets across all {getSubjectsForClass(selectedClass, selectedBoard).length} subjects for {selectedBoardLabel} Standard {selectedStandardOrdinal} ({selectedClass}) are unlocked • {selectedClassInfo.daysRemainingDisplay}.
                </p>
              </div>
            </div>
            <span className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shrink-0 self-start sm:self-auto">
              {selectedBoardLabel} Std {selectedStandardOrdinal} Unlocked
            </span>
          </div>
        ) : selectedClassInfo.isExpired ? (
          <div className="rounded-3xl border-2 border-rose-300 bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 p-6 sm:p-7 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs uppercase tracking-wider shadow-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>Subscription Expired – {selectedBoardLabel} • Standard {selectedStandardOrdinal} ({selectedClass})</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900">
                Renew {selectedBoardLabel} {selectedClass} Worksheets &amp; Subjects – Only ₹99 (365 Days)
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                Your 365-day paid subscription for <strong>{selectedBoardLabel} • {selectedClass}</strong> has expired ({selectedClassInfo.expiryDisplay}). Other active boards or classes on your account remain untouched. Renew <strong>{selectedBoardLabel} {selectedClass}</strong> for ₹99 to regain instant access to all {ownClassWorksheetsSummary.ownClassTotal} worksheets!
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleTriggerUpgrade(selectedClass, selectedBoard)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white font-black text-sm shadow-lg transition-all cursor-pointer shrink-0"
            >
              <Crown className="w-5 h-5" />
              <span>Renew {selectedBoardLabel} {selectedClass} – ₹99</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : selectedClassInfo.isLocked ? (
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-7 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-xs">
                <Lock className="w-3.5 h-3.5" />
                <span>{selectedBoardLabel} • {selectedClass} Locked • Independent Subscription</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white">
                Unlock All {ownClassWorksheetsSummary.ownClassTotal} Worksheets for {selectedBoardLabel} • Standard {selectedStandardOrdinal} ({selectedClass}) – ₹99
              </h2>
              <p className="text-xs sm:text-sm text-indigo-100 font-medium leading-relaxed">
                You are previewing <strong>{selectedBoardLabel} ({selectedClass})</strong> using your existing account. Free demo access applies only to your base registered board &amp; class; activate <strong>{selectedBoardLabel} {selectedClass}</strong> for <strong>₹99 (365 Days / 1 Year)</strong> to unlock every worksheet, quiz, study guide, and subject for this board &amp; class without creating a new account!
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleTriggerUpgrade(selectedClass, selectedBoard)}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-sm shadow-lg transition-all cursor-pointer shrink-0"
            >
              <Crown className="w-5 h-5" />
              <span>Activate {selectedBoardLabel} {selectedClass} – ₹99</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-orange-50/80 to-yellow-50 p-6 sm:p-7 shadow-md space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-xs">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Free Demo Access – {selectedBoardLabel} • Standard {selectedStandardOrdinal} ({selectedClass})</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900">
                  {WORKSHEET_CLASS_LOCK_MESSAGE}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  On the Free Plan for your base board &amp; class, you can access <strong>only 2 Demo Worksheets</strong> (<strong>1 English Worksheet</strong> and <strong>1 Mathematics Worksheet</strong> for <strong>{selectedBoardLabel} Standard {selectedStandardOrdinal}</strong>). Upgrade to the <strong>₹99 Premium Plan</strong> to unlock all <strong>{ownClassWorksheetsSummary.ownClassTotal} worksheets</strong> across all subjects for <strong>{selectedBoardLabel} {selectedClass}</strong>!
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleTriggerUpgrade(selectedClass, selectedBoard)}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-black text-sm shadow-lg shadow-orange-500/20 transition-all cursor-pointer shrink-0"
              >
                <Crown className="w-5 h-5" />
                <span>Upgrade {selectedBoardLabel} {selectedClass} – ₹99</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* The 2 Free Demo Worksheets Quick Access Cards */}
            <div className="bg-white/90 rounded-2xl p-4 sm:p-5 border border-amber-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-900">
                    Your 2 Free Demo Worksheets for {selectedBoardLabel} Standard {selectedStandardOrdinal} (Accessible Without Payment)
                  </h3>
                </div>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  1 English Demo + 1 Mathematics Demo Unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {freeDemoWorksheets.map((demoWs, idx) => {
                  const demoMeta = getSubjectMeta(demoWs.subject, demoWs.board || selectedBoard);
                  const isDemoCompleted = completedWorksheetIds.has(demoWs.id);
                  return (
                    <div
                      key={demoWs.id}
                      className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/40 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider">
                            FREE DEMO #{idx + 1} • {demoWs.subject.toUpperCase()}
                          </span>
                          {isDemoCompleted && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                              ✓ Completed
                            </span>
                          )}
                        </div>
                        <div className="font-display font-extrabold text-sm sm:text-base text-slate-900">
                          {demoMeta.icon} {demoWs.title}
                        </div>
                        <div className="text-xs text-slate-600 font-medium">
                          {demoWs.chapterName} • {demoWs.questions.length} Questions ({demoWs.totalMarks} Marks)
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleStartWorksheet(demoWs)}
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shrink-0 transition-all cursor-pointer shadow-xs"
                      >
                        <span>{isDemoCompleted ? 'Practice Demo Again' : 'Start Free Demo'}</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Board & Class 1st to 10th Selector Bar (Multi-Board + Multi-Class Switching & ₹99 Per-Pair Unlock) */}
        <div className="bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          {/* 3 Education Board Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Education Board:
              </span>
              {BOARD_META_LIST.map((bm) => {
                const isBoardSelected = selectedBoard === bm.id;
                return (
                  <button
                    key={bm.id}
                    type="button"
                    onClick={() => {
                      setSelectedBoard(bm.id);
                      setSelectedSubject('ALL');
                      const bClsInfo = getBoardClassSubscriptionInfo(currentStudent, bm.id, selectedClass);
                      if (bClsInfo.isAccessible) {
                        void switchActiveBoardAndClass(bm.id, selectedClass);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border-2 ${
                      isBoardSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span>{bm.icon}</span>
                    <span>{bm.shortLabel}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Active Workspace: {getBoardShortLabel(activeBoard)} • {userRegisteredClass}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-display font-extrabold text-slate-900">
                1. {selectedBoardLabel} • Standard 1st to Standard 10th (₹99 Per Board &amp; Class)
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Tap any class to switch or activate for ₹99
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {ALL_10_CLASSES.map(cls => {
              const isSelected = cls === selectedClass;
              const cInfo = getBoardClassSubscriptionInfo(currentStudent, selectedBoard, cls);
              return (
                <button
                  key={cls}
                  type="button"
                  onClick={() => {
                    setSelectedClass(cls);
                    setSelectedSubject('ALL');
                    if (cInfo.isAccessible) {
                      void switchActiveBoardAndClass(selectedBoard, cls);
                    }
                  }}
                  className={`relative px-3 py-2.5 rounded-2xl font-extrabold text-xs transition-all cursor-pointer border-2 flex flex-col items-center justify-center gap-0.5 ${
                    isSelected
                      ? cInfo.isAccessible
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                        : 'bg-slate-800 text-white border-slate-800 shadow-md'
                      : cInfo.isPaidActive
                      ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-400'
                      : cInfo.isFreeBase
                      ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border-indigo-300'
                      : cInfo.isExpired
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-600 border-slate-200'
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {!cInfo.isAccessible && <Lock className="w-3 h-3 text-amber-500 shrink-0" />}
                    <span>{cls}</span>
                  </span>
                  {cInfo.isPaidActive ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                        isSelected ? 'bg-emerald-300 text-slate-950' : 'bg-emerald-100 text-emerald-900'
                      }`}
                    >
                      Paid • {cInfo.daysRemaining}d
                    </span>
                  ) : cInfo.isFreeBase ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-black ${
                        isSelected ? 'bg-amber-300 text-slate-950' : 'bg-indigo-100 text-indigo-900'
                      }`}
                    >
                      Free Base
                    </span>
                  ) : cInfo.isExpired ? (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-rose-400/40 text-white' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      Expired
                    </span>
                  ) : (
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                        isSelected ? 'bg-amber-400/30 text-amber-200' : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      Unlock ₹99
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {!selectedClassInfo.isAccessible && (
            <div className="rounded-2xl bg-amber-50 border-2 border-amber-300 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <Lock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="text-xs sm:text-sm font-black text-slate-950">
                    🔒 {selectedBoardLabel} • Standard {selectedStandardOrdinal} ({selectedClass}) {selectedClassInfo.isExpired ? 'Subscription Expired' : 'Worksheets Locked'}
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    {selectedClassInfo.isExpired
                      ? `Your paid subscription for ${selectedBoardLabel} ${selectedClass} expired (${selectedClassInfo.expiryDisplay}). Renew ${selectedBoardLabel} ${selectedClass} for ₹99 (365 Days) on your existing account!`
                      : `Activate ${selectedBoardLabel} ${selectedClass} for ₹99 (365 Days / 1 Year) on your existing account to unlock all ${classTotalWorksheets} worksheets and subjects for ${selectedBoardLabel} ${selectedClass}.`}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleTriggerUpgrade(selectedClass, selectedBoard)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs cursor-pointer shadow-xs"
                >
                  {selectedClassInfo.isExpired ? `Renew ${selectedBoardLabel} ${selectedClass} – ₹99` : `Activate ${selectedBoardLabel} ${selectedClass} – ₹99`}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBoard(activeBoard);
                    setSelectedClass(userRegisteredClass);
                    setSelectedSubject('ALL');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs cursor-pointer shadow-xs"
                >
                  Return to {getBoardShortLabel(activeBoard)} • {userRegisteredClass}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Subject Filter Pills */}
        <div className="bg-white rounded-3xl border border-amber-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-amber-600" />
              <h2 className="text-base sm:text-lg font-display font-extrabold text-slate-900">
                2. Filter by Subject ({selectedBoardLabel} • {selectedClass} • {selectedClassMeta?.marathiLabel})
              </h2>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {selectedClass === 'Class 9' || selectedClass === 'Class 10'
                ? 'Board-specific syllabus worksheets'
                : '2 Multi-Format Worksheets per Subject'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedSubject('ALL')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                effectiveSubject === 'ALL'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              All Subjects ({classTotalWorksheets} Worksheets)
            </button>
            {classSubjects.map(subj => {
              const meta = getSubjectMeta(subj, selectedBoard);
              const isSelected = effectiveSubject === subj;
              return (
                <button
                  key={subj}
                  type="button"
                  onClick={() => setSelectedSubject(subj)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span>{meta.icon}</span>
                  <span>{subj}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Worksheets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {worksheetsList.map(ws => {
            const wsBoard = ws.board || selectedBoard;
            const subjMeta = getSubjectMeta(ws.subject, wsBoard);
            const isCompleted = completedWorksheetIds.has(ws.id);
            const lastAttempt = attemptMap.get(ws.id);
            const access = canAccessWorksheet(currentStudent, ws.id, ws.classLevel, undefined, wsBoard);
            const isLocked = !access.allowed;
            const isFreeDemo = access.isDemo;
            const isOtherClass = Boolean(access.isOtherClassLocked);

            return (
              <div
                key={ws.id}
                onClick={() => {
                  if (isLocked) {
                    setLockedModalWorksheet(ws);
                  }
                }}
                className={`rounded-3xl border-2 p-6 transition-all flex flex-col justify-between gap-5 ${
                  isLocked
                    ? 'border-amber-200/90 bg-slate-50/90 hover:border-amber-400 cursor-pointer relative overflow-hidden'
                    : isCompleted
                    ? 'border-emerald-300 bg-gradient-to-br from-white to-emerald-50/40 shadow-sm hover:shadow-md'
                    : 'border-slate-200 bg-white hover:border-amber-300 shadow-xs hover:shadow-md'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-xl">
                        {subjMeta.icon}
                      </span>
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 font-extrabold text-[11px]">
                            {getBoardShortLabel(wsBoard)}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-extrabold text-[11px]">
                            {ws.classLevel}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-extrabold text-[11px]">
                            Worksheet #{ws.worksheetNumber}
                          </span>
                          {isFreeDemo && (
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-black text-[10px] uppercase tracking-wider">
                              FREE DEMO WORKSHEET
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-display font-black text-slate-900 mt-1 flex items-center gap-2">
                          <span>{ws.subject} – Worksheet #{ws.worksheetNumber}</span>
                          {isLocked && <Lock className="w-4 h-4 text-amber-600 shrink-0" />}
                        </h3>
                      </div>
                    </div>

                    {isLocked ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs border border-amber-300">
                        <Lock className="w-3.5 h-3.5 text-amber-700" />
                        {selectedClassInfo.isExpired
                          ? `Expired • Renew ${ws.classLevel} (₹99)`
                          : isOtherClass
                          ? `Locked • Activate ${ws.classLevel} (₹99)`
                          : 'Locked • ₹99 Premium'}
                      </span>
                    ) : isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-xs border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Completed {lastAttempt ? `(${lastAttempt.percentage}%)` : ''}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
                        Unlocked Online
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-indigo-700 bg-indigo-50/80 px-3 py-2 rounded-xl border border-indigo-100">
                    📖 {ws.chapterName}
                  </p>

                  {/* Format Badges Included */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {ws.formatsIncluded.slice(0, 6).map(fmt => {
                      const fMeta = WORKSHEET_FORMAT_LABELS[fmt];
                      return (
                        <span
                          key={fmt}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${fMeta.badgeColor}`}
                        >
                          {fMeta.icon} {fMeta.label}
                        </span>
                      );
                    })}
                  </div>

                  {/* Lock Callout Box on Locked Worksheets */}
                  {isLocked && (
                    <div className="mt-2 rounded-2xl bg-amber-50 border border-amber-200 p-3.5 flex items-start gap-2.5">
                      <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="text-xs font-bold text-amber-950 leading-snug">
                        {isOtherClass
                          ? access.reason
                          : WORKSHEET_CLASS_LOCK_MESSAGE}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
                    <span className="inline-flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-600" />
                      {ws.questions.length} Questions
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-600" />
                      {ws.totalMarks} Marks
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      {ws.durationMinutes} Mins
                    </span>
                  </div>

                  {isLocked ? (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setLockedModalWorksheet(ws);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-extrabold text-xs bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all cursor-pointer shadow-xs"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>
                        {selectedClassInfo.isExpired
                          ? `Renew ${ws.classLevel} (₹99)`
                          : `Activate ${ws.classLevel} (₹99)`}
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleStartWorksheet(ws);
                      }}
                      className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer shadow-xs ${
                        isCompleted
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{isCompleted ? 'Solve Online Again' : 'Solve Worksheet Online'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LOCKED WORKSHEET BOARD & CLASS-WISE ACTIVATION / RENEWAL MODAL */}
      {lockedModalWorksheet && (() => {
        const modalBoard = lockedModalWorksheet.board || selectedBoard;
        const modalBoardLabel = getBoardShortLabel(modalBoard);
        const modalClsInfo = getBoardClassSubscriptionInfo(currentStudent, modalBoard, lockedModalWorksheet.classLevel);
        const modalOrd = formatStandardOrdinal(lockedModalWorksheet.classLevel);
        const modalTotal = getAllWorksheetsForClass(lockedModalWorksheet.classLevel, modalBoard).length;
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white border-2 border-amber-300 shadow-2xl p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => setLockedModalWorksheet(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-amber-700 shrink-0">
                  <Lock className="w-7 h-7" />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[11px] uppercase tracking-wider">
                    {modalClsInfo.isExpired
                      ? `🔒 ${modalBoardLabel} • ${lockedModalWorksheet.classLevel} Subscription Expired`
                      : `🔒 ${modalBoardLabel} • ${lockedModalWorksheet.classLevel} Worksheet Locked`}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 mt-0.5">
                    {lockedModalWorksheet.title}
                  </h3>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 border-2 border-amber-300 p-5 space-y-2">
                <p className="text-base sm:text-lg font-display font-black text-slate-900 leading-snug">
                  {modalClsInfo.isExpired
                    ? `Renew ${modalBoardLabel} ${lockedModalWorksheet.classLevel} – Only ₹99 (365 Days)`
                    : `Activate ${modalBoardLabel} • Standard ${modalOrd} (${lockedModalWorksheet.classLevel}) – Only ₹99!`}
                </p>
                <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {modalClsInfo.isExpired
                    ? `Your previous subscription for ${modalBoardLabel} ${lockedModalWorksheet.classLevel} expired (${modalClsInfo.expiryDisplay}). Renew for ₹99 to unlock all ${modalTotal} worksheets and all subjects for 365 Days!`
                    : modalClsInfo.isFreeBase
                    ? `${WORKSHEET_PREMIUM_UPGRADE_MESSAGE} Free users have access to only 2 Demo Worksheets in their base board & class. Upgrade ${modalBoardLabel} ${lockedModalWorksheet.classLevel} to the ₹99 Premium Plan to unlock all ${modalTotal} worksheets and all subjects!`
                    : `Activate ${modalBoardLabel} ${lockedModalWorksheet.classLevel} on your existing account for ₹99 (365 Days / 1 Year) to unlock all ${modalTotal} interactive worksheets, 4-level quizzes, study materials, and subjects — no separate account needed!`}
                </p>
              </div>

              <div className="space-y-2 text-xs font-bold text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlock all {modalTotal} interactive worksheets for {modalBoardLabel} Std {modalOrd} ({lockedModalWorksheet.classLevel})</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unlock all subjects, study notes &amp; 4-level quizzes for {modalBoardLabel} Std {modalOrd} (365 Days IST)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Instant online evaluation, marks, and step-by-step model solutions</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleTriggerUpgrade(lockedModalWorksheet.classLevel, modalBoard)}
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-600 hover:via-orange-600 hover:to-rose-600 text-white font-black text-sm shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                >
                  <Crown className="w-4 h-4" />
                  <span>
                    {modalClsInfo.isExpired
                      ? `Renew ${modalBoardLabel} ${lockedModalWorksheet.classLevel} – ₹99`
                      : `Activate ${modalBoardLabel} ${lockedModalWorksheet.classLevel} – ₹99`}
                  </span>
                </button>
                {(lockedModalWorksheet.classLevel !== userRegisteredClass || modalBoard !== activeBoard) && (
                  <button
                    type="button"
                    onClick={() => {
                      setLockedModalWorksheet(null);
                      setSelectedBoard(activeBoard);
                      setSelectedClass(userRegisteredClass);
                      setSelectedSubject('ALL');
                    }}
                    className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-extrabold text-xs transition-all cursor-pointer"
                  >
                    Go to {getBoardShortLabel(activeBoard)} {userRegisteredClass}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setLockedModalWorksheet(null)}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};
