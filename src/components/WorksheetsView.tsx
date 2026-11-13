import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ClassLevel, SubjectName } from '../types';
import {
  ALL_10_CLASSES,
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta
} from '../data/classCurriculumConfig';
import {
  getAllWorksheetsForClass,
  getWorksheetsForClassAndSubject,
  OnlineWorksheet,
  WORKSHEET_FORMAT_LABELS
} from '../data/worksheetsData';
import { canAccessSubject } from '../utils/subscriptionAccess';
import {
  FileText,
  CheckCircle2,
  Award,
  Printer,
  Download,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Clock,
  Lock,
  RefreshCw,
  Check,
  XCircle,
  GraduationCap,
  Layers
} from 'lucide-react';

interface WorksheetsViewProps {
  initialSubject?: SubjectName;
  onUnlockClick?: () => void;
}

export const WorksheetsView: React.FC<WorksheetsViewProps> = ({
  initialSubject,
  onUnlockClick
}) => {
  const { currentStudent, submitWorksheetAttempt, promoteOrUpdateStudentClass } = useApp();

  const [selectedClass, setSelectedClass] = useState<ClassLevel>(
    currentStudent?.classLevel || 'Class 4'
  );
  const classSubjects = useMemo(() => getSubjectsForClass(selectedClass), [selectedClass]);

  const [selectedSubject, setSelectedSubject] = useState<SubjectName | 'ALL'>(
    initialSubject && classSubjects.includes(initialSubject) ? initialSubject : 'ALL'
  );

  const [activeWorksheet, setActiveWorksheet] = useState<OnlineWorksheet | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [writtenNotes, setWrittenNotes] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [printMode, setPrintMode] = useState<'blank' | 'solved' | null>(null);

  const handleClassChange = (cls: ClassLevel) => {
    setSelectedClass(cls);
    const subjs = getSubjectsForClass(cls);
    if (selectedSubject !== 'ALL' && !subjs.includes(selectedSubject)) {
      setSelectedSubject('ALL');
    }
    setActiveWorksheet(null);
    setIsSubmitted(false);
  };

  const worksheetsList = useMemo(() => {
    if (selectedSubject === 'ALL') {
      return getAllWorksheetsForClass(selectedClass);
    }
    return getWorksheetsForClassAndSubject(selectedClass, selectedSubject);
  }, [selectedClass, selectedSubject]);

  const completedWorksheetIds = useMemo(
    () => new Set(currentStudent?.completedWorksheetIds || []),
    [currentStudent?.completedWorksheetIds]
  );

  const worksheetAttempts = useMemo(
    () => currentStudent?.worksheetAttempts || [],
    [currentStudent?.worksheetAttempts]
  );

  const classTotalWorksheets = useMemo(
    () => getAllWorksheetsForClass(selectedClass).length,
    [selectedClass]
  );

  const classCompletedCount = useMemo(() => {
    const allWs = getAllWorksheetsForClass(selectedClass);
    return allWs.filter(w => completedWorksheetIds.has(w.id)).length;
  }, [selectedClass, completedWorksheetIds]);

  const handleStartWorksheet = (ws: OnlineWorksheet) => {
    const access = canAccessSubject(currentStudent, ws.subject);
    if (!access.allowed) {
      if (onUnlockClick) onUnlockClick();
      return;
    }
    setActiveWorksheet(ws);
    setSelectedOptions({});
    setWrittenNotes({});
    setIsSubmitted(false);
    setPrintMode(null);
  };

  const handleSelectOption = (qId: string, optIdx: number) => {
    if (isSubmitted) return;
    setSelectedOptions(prev => ({ ...prev, [qId]: optIdx }));
  };

  const handleSubmitWorksheet = () => {
    if (!activeWorksheet) return;
    let obtainedMarks = 0;
    for (const q of activeWorksheet.questions) {
      if (selectedOptions[q.id] === q.correctIndex) {
        obtainedMarks += q.marks;
      }
    }
    const totalMarks = activeWorksheet.totalMarks;
    const percentage = Math.round((obtainedMarks / totalMarks) * 100);

    submitWorksheetAttempt({
      worksheetId: activeWorksheet.id,
      classLevel: activeWorksheet.classLevel,
      subject: activeWorksheet.subject,
      worksheetTitle: activeWorksheet.title,
      totalMarks,
      obtainedMarks,
      percentage
    });

    setIsSubmitted(true);
  };

  const handlePrintOrDownloadPdf = (mode: 'blank' | 'solved') => {
    setPrintMode(mode);
    setTimeout(() => {
      window.print();
    }, 120);
  };

  // Active Worksheet Solver View
  if (activeWorksheet) {
    const subjMeta = getSubjectMeta(activeWorksheet.subject);
    const answeredCount = Object.keys(selectedOptions).length;
    const totalQuestions = activeWorksheet.questions.length;

    let currentObtainedMarks = 0;
    let correctCount = 0;
    for (const q of activeWorksheet.questions) {
      if (selectedOptions[q.id] === q.correctIndex) {
        currentObtainedMarks += q.marks;
        correctCount++;
      }
    }
    const percentage = Math.round((currentObtainedMarks / activeWorksheet.totalMarks) * 100);

    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Top Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 print:hidden">
          <button
            onClick={() => {
              setActiveWorksheet(null);
              setIsSubmitted(false);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Worksheets
          </button>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => handlePrintOrDownloadPdf('blank')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-700 font-bold text-sm hover:bg-indigo-100 transition-all"
            >
              <Printer className="w-4 h-4" />
              Print / Save Blank PDF
            </button>
            <button
              onClick={() => handlePrintOrDownloadPdf('solved')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm hover:bg-emerald-100 transition-all"
            >
              <Download className="w-4 h-4" />
              Download Solved Answer Key PDF
            </button>
          </div>
        </div>

        {/* Printable / Interactive Worksheet Header */}
        <div className={`bg-gradient-to-r ${subjMeta.gradient} rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-6 print:bg-none print:text-slate-900 print:border-2 print:border-slate-900 print:shadow-none`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-extrabold uppercase tracking-wider mb-3 print:border print:border-slate-400 print:text-slate-800">
                <span>{subjMeta.icon}</span>
                <span>MyStudyZone Official Curriculum Worksheet</span>
                <span>•</span>
                <span>{activeWorksheet.classLevel}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
                {activeWorksheet.title}
              </h1>
              <p className="text-white/90 text-sm sm:text-base font-medium mt-1 print:text-slate-700">
                {activeWorksheet.marathiSubtitle} • {activeWorksheet.chapterName}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 text-center border border-white/20 print:border-slate-400">
                <div className="text-xs font-bold uppercase opacity-80">Total Marks</div>
                <div className="text-xl font-black">{activeWorksheet.totalMarks} Marks</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 text-center border border-white/20 print:border-slate-400">
                <div className="text-xs font-bold uppercase opacity-80">Duration</div>
                <div className="text-xl font-black">{activeWorksheet.durationMinutes} Mins</div>
              </div>
              <div className="bg-white/15 backdrop-blur-md rounded-2xl px-4 py-3 text-center border border-white/20 print:border-slate-400">
                <div className="text-xs font-bold uppercase opacity-80">Questions</div>
                <div className="text-xl font-black">{totalQuestions} Items</div>
              </div>
            </div>
          </div>

          {/* Student Info Bar for PDF Print */}
          <div className="mt-5 pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-semibold print:border-slate-300 print:text-slate-800">
            <div>Student Name: <span className="font-bold underline">{currentStudent?.name || '______________________'}</span></div>
            <div>Class: <span className="font-bold">{activeWorksheet.classLevel}</span></div>
            <div>Subject: <span className="font-bold">{activeWorksheet.subject}</span></div>
            <div>Date: <span className="font-bold">{new Date().toLocaleDateString('en-IN')}</span></div>
          </div>
        </div>

        {/* Instant Results Banner after submission */}
        {isSubmitted && (
          <div className="bg-white rounded-3xl border-2 border-emerald-400 p-6 mb-6 shadow-lg bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/60">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl font-black shadow-md">
                  {percentage >= 80 ? '🏆' : percentage >= 60 ? '🌟' : '💪'}
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Worksheet Evaluated Instantly
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-1">
                    You Scored {currentObtainedMarks} / {activeWorksheet.totalMarks} Marks ({percentage}%)
                  </h2>
                  <p className="text-sm text-slate-600 font-medium">
                    Correct Answers: {correctCount} of {totalQuestions} • Review the model answers and explanations below.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 print:hidden">
                <button
                  onClick={() => {
                    setSelectedOptions({});
                    setWrittenNotes({});
                    setIsSubmitted(false);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  Re-Attempt Worksheet
                </button>
                <button
                  onClick={() => handlePrintOrDownloadPdf('solved')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all"
                >
                  <Download className="w-4 h-4" />
                  Save Result & Answer Key PDF
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-5">
          {activeWorksheet.questions.map((q) => {
            const fmtMeta = WORKSHEET_FORMAT_LABELS[q.format];
            const userSelected = selectedOptions[q.id];
            const isCorrect = userSelected === q.correctIndex;
            const showSolution = isSubmitted || printMode === 'solved';

            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
                  isSubmitted
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-rose-300 bg-rose-50/20'
                    : 'border-slate-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-slate-900 text-white font-black text-sm">
                      Q{q.number}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-bold border ${fmtMeta.badgeColor}`}>
                      <span>{fmtMeta.icon}</span>
                      <span>{fmtMeta.label}</span>
                    </span>
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      Topic: {q.chapterTitle}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    {q.marks} Marks
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-snug">
                  {q.prompt}
                </h3>

                {/* Optional Written Practice Input for Short/Long Answer, Fill in Blank, or Grammar Practice */}
                {(q.format === 'short_answer' ||
                  q.format === 'long_answer' ||
                  q.format === 'fill_blank' ||
                  q.format === 'grammar_practice' ||
                  q.format === 'math_exercise') && (
                  <div className="mb-4 print:hidden">
                    <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">
                      ✍️ Write Your Working / Steps / Sentence Practice (Optional):
                    </label>
                    <textarea
                      rows={q.format === 'long_answer' ? 3 : 2}
                      value={writtenNotes[q.id] || ''}
                      onChange={e => setWrittenNotes(prev => ({ ...prev, [q.id]: e.target.value }))}
                      disabled={isSubmitted}
                      placeholder="Type your steps, formula, or written answer here before choosing the final answer option below..."
                      className="w-full rounded-xl border border-slate-200 px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/70"
                    />
                  </div>
                )}

                {/* Blank lines for physical print mode */}
                {printMode === 'blank' && (
                  <div className="hidden print:block my-3 space-y-2">
                    <div className="border-b border-dashed border-slate-400 h-5" />
                    <div className="border-b border-dashed border-slate-400 h-5" />
                  </div>
                )}

                {/* 4 Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, optIdx) => {
                    const optionLetter = ['A', 'B', 'C', 'D'][optIdx];
                    const isThisSelected = userSelected === optIdx;
                    const isThisCorrect = q.correctIndex === optIdx;

                    let btnStyle = 'border-slate-200 bg-slate-50/60 hover:bg-indigo-50/50 hover:border-indigo-300 text-slate-800';
                    if (showSolution) {
                      if (isThisCorrect) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200';
                      } else if (isThisSelected && !isThisCorrect) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                      }
                    } else if (isThisSelected) {
                      btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold ring-2 ring-indigo-200';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isSubmitted}
                        className={`flex items-start gap-3 p-3.5 rounded-xl border text-left text-sm transition-all ${btnStyle}`}
                      >
                        <span
                          className={`inline-flex items-center justify-center w-6 h-6 rounded-lg text-xs font-black shrink-0 mt-0.5 ${
                            showSolution && isThisCorrect
                              ? 'bg-emerald-600 text-white'
                              : isThisSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          {optionLetter}
                        </span>
                        <span className="flex-1 leading-snug">{opt}</span>
                        {showSolution && isThisCorrect && (
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                        )}
                        {showSolution && isThisSelected && !isThisCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-1" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Explanation & Model Solution */}
                {showSolution && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white text-xs sm:text-sm">
                    <div className="flex items-center gap-2 font-black text-emerald-400 mb-1">
                      <Sparkles className="w-4 h-4" />
                      <span>
                        Correct Answer: Option {['A', 'B', 'C', 'D'][q.correctIndex]} — {q.options[q.correctIndex]}
                      </span>
                    </div>
                    <p className="text-slate-200 leading-relaxed">
                      <span className="font-bold text-white">Explanation / Model Answer:</span> {q.explanation}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Worksheet Footer Bar */}
        {!isSubmitted && (
          <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <div>
              <div className="text-sm font-extrabold text-slate-900">
                Progress: {answeredCount} of {totalQuestions} Questions Answered
              </div>
              <div className="text-xs text-slate-500">
                Answer all questions and click Submit Worksheet to get instant marks, percentage, and model solutions.
              </div>
            </div>
            <button
              type="button"
              onClick={handleSubmitWorksheet}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-sm shadow-lg transition-all"
            >
              Submit Worksheet & View Instant Results ({answeredCount}/{totalQuestions})
            </button>
          </div>
        )}
      </div>
    );
  }

  // Main Worksheets Browser View (Classes 1 to 10 & All Subjects)
  const activeClassMeta = ALL_10_CLASSES_META.find(c => c.classLevel === selectedClass);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider mb-3 border border-white/20">
              <FileText className="w-3.5 h-3.5 text-amber-300" />
              <span>Online Interactive Worksheets • Classes 1st to 10th</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Class-Wise & Subject-Wise Online Worksheets
            </h1>
            <p className="text-indigo-100 text-sm sm:text-base mt-2 leading-relaxed">
              Solve interactive worksheets online across MCQs, Fill in the Blanks, Match the Following, True/False, Short & Long Answers, Math Exercises, Grammar Practice, Science Activities, and Logical Reasoning — or print/download as PDFs!
            </p>
          </div>

          {/* Worksheet Completion Stats Card */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 shrink-0">
            <div className="text-center px-2">
              <div className="text-xs font-bold text-indigo-200 uppercase">Selected Class</div>
              <div className="text-xl sm:text-2xl font-black text-white mt-0.5">{selectedClass}</div>
              <div className="text-[11px] text-amber-300 font-semibold">{activeClassMeta?.marathiLabel}</div>
            </div>
            <div className="text-center px-2 border-x border-white/15">
              <div className="text-xs font-bold text-indigo-200 uppercase">Completed</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">
                {classCompletedCount} / {classTotalWorksheets}
              </div>
              <div className="text-[11px] text-indigo-200 font-semibold">
                {classTotalWorksheets - classCompletedCount} Pending
              </div>
            </div>
            <div className="text-center px-2">
              <div className="text-xs font-bold text-indigo-200 uppercase">Total Attempts</div>
              <div className="text-xl sm:text-2xl font-black text-amber-300 mt-0.5">
                {worksheetAttempts.length}
              </div>
              <div className="text-[11px] text-indigo-200 font-semibold">Saved in Profile</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Select Class (Classes 1 to 10) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <h2 className="text-base font-black text-slate-900">
              Select Class (Classes 1st to 10th)
            </h2>
          </div>
          {currentStudent && selectedClass !== currentStudent.classLevel && (
            <button
              type="button"
              onClick={() => promoteOrUpdateStudentClass(selectedClass, `Student promoted/switched active class to ${selectedClass}`)}
              className="text-xs font-extrabold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-3 py-1.5 rounded-lg transition-all"
            >
              Set {selectedClass} as My Default Profile Class
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {ALL_10_CLASSES.map(cls => {
            const meta = ALL_10_CLASSES_META.find(m => m.classLevel === cls);
            const isSelected = selectedClass === cls;
            const isStudentClass = currentStudent?.classLevel === cls;

            return (
              <button
                key={cls}
                type="button"
                onClick={() => handleClassChange(cls)}
                className={`p-2.5 rounded-xl border text-center transition-all relative ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                    : 'bg-slate-50 hover:bg-indigo-50/60 text-slate-800 border-slate-200'
                }`}
              >
                {isStudentClass && (
                  <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded-full text-[9px] font-black">
                    MY CLASS
                  </span>
                )}
                <div className="text-xs sm:text-sm font-black">{cls}</div>
                <div className={`text-[10px] font-semibold ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {meta?.marathiLabel}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Filter by Subject for Selected Class */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-black text-slate-900">
              {selectedClass} Subjects ({classSubjects.length} Subjects Available)
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-500">
            {selectedClass === 'Class 9' || selectedClass === 'Class 10'
              ? 'Includes separate Physics, Chemistry & Biology worksheets'
              : 'Includes all class-specific subjects'}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedSubject('ALL')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all border ${
              selectedSubject === 'ALL'
                ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Subjects ({classTotalWorksheets} Worksheets)
          </button>
          {classSubjects.map(subj => {
            const meta = getSubjectMeta(subj);
            const isSelected = selectedSubject === subj;
            return (
              <button
                key={subj}
                type="button"
                onClick={() => setSelectedSubject(subj)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {worksheetsList.map(ws => {
          const subjMeta = getSubjectMeta(ws.subject);
          const isCompleted = completedWorksheetIds.has(ws.id);
          const bestAttempt = worksheetAttempts
            .filter(a => a.worksheetId === ws.id)
            .sort((a, b) => b.percentage - a.percentage)[0];
          const access = canAccessSubject(currentStudent, ws.subject);

          return (
            <div
              key={ws.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className={`bg-gradient-to-r ${subjMeta.gradient} p-4 text-white`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-[11px] font-extrabold">
                      <span>{subjMeta.icon}</span>
                      <span>{ws.classLevel}</span>
                      <span>•</span>
                      <span>Worksheet #{ws.worksheetNumber}</span>
                    </span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[11px] font-black">
                        <CheckCircle2 className="w-3 h-3" /> Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-300 text-slate-950 text-[11px] font-black">
                        Pending
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-black leading-snug">{ws.subject}</h3>
                  <p className="text-xs text-white/90 font-medium mt-0.5">{ws.marathiSubtitle}</p>
                </div>

                <div className="p-4 space-y-3">
                  <div className="text-xs font-bold text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    📖 {ws.chapterName}
                  </div>

                  {/* Formats chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {ws.formatsIncluded.slice(0, 5).map(fmt => (
                      <span
                        key={fmt}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${WORKSHEET_FORMAT_LABELS[fmt].badgeColor}`}
                      >
                        {WORKSHEET_FORMAT_LABELS[fmt].icon} {WORKSHEET_FORMAT_LABELS[fmt].label}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold pt-1">
                    <span className="inline-flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-indigo-500" />
                      {ws.questions.length} Questions
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-500" />
                      {ws.totalMarks} Marks
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-500" />
                      {ws.durationMinutes} Mins
                    </span>
                  </div>

                  {bestAttempt && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs font-bold text-emerald-900">
                      <span>Best Score: {bestAttempt.obtainedMarks}/{bestAttempt.totalMarks}</span>
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white">
                        {bestAttempt.percentage}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  type="button"
                  onClick={() => handleStartWorksheet(ws)}
                  className={`w-full py-2.5 px-4 rounded-xl font-black text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all ${
                    access.allowed
                      ? 'bg-slate-900 hover:bg-indigo-600 text-white shadow-sm'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300'
                  }`}
                >
                  {access.allowed ? (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>{isCompleted ? 'Solve Again / Print PDF' : 'Solve Online / Download PDF'}</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Unlock with ₹99 Premium Plan</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
