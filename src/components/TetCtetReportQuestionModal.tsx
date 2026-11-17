import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, Flag, ShieldCheck, X } from 'lucide-react';
import {
  TET_CTET_REPORT_CATEGORIES,
  TetCtetQuestionErrorReport,
  TetCtetReportCategory,
  TetCtetReportStatus,
} from '../types/questionErrorReport';
import { TetCtetModuleId, TetCtetQuestion } from '../types/tetCtet';
import {
  getStudentReportsForQuestion,
  submitTetCtetQuestionErrorReport,
} from '../services/questionErrorReportService';

export interface TetCtetReportQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: TetCtetQuestion;
  moduleId: TetCtetModuleId;
  moduleTitle: string;
  mockTestId: string;
  testNumber: number;
  selectedLanguage: string;
  studentId: string;
  studentName: string;
  onSubmitted?: (report: TetCtetQuestionErrorReport) => void;
}

export function getReportStatusBadgeStyle(status: TetCtetReportStatus): string {
  switch (status) {
    case 'Submitted':
      return 'bg-amber-50 text-amber-900 border-amber-300';
    case 'Under Review':
      return 'bg-blue-50 text-blue-900 border-blue-300';
    case 'Confirmed':
      return 'bg-purple-50 text-purple-900 border-purple-300';
    case 'Corrected':
      return 'bg-emerald-50 text-emerald-900 border-emerald-300';
    case 'Rejected':
      return 'bg-rose-50 text-rose-900 border-rose-300';
    default:
      return 'bg-slate-100 text-slate-800 border-slate-300';
  }
}

export const TetCtetReportQuestionModal: React.FC<TetCtetReportQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  moduleId,
  moduleTitle,
  mockTestId,
  testNumber,
  selectedLanguage,
  studentId,
  studentName,
  onSubmitted,
}) => {
  const [hasConfirmedGenuineMistake, setHasConfirmedGenuineMistake] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<TetCtetReportCategory | ''>('');
  const [studentExplanation, setStudentExplanation] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedReport, setSubmittedReport] = useState<TetCtetQuestionErrorReport | null>(null);
  const [duplicateNotice, setDuplicateNotice] = useState<string | null>(null);

  // Reset confirmation gate and form state whenever modal opens or question changes
  useEffect(() => {
    if (isOpen) {
      setHasConfirmedGenuineMistake(false);
      setSelectedCategory('');
      setStudentExplanation('');
      setValidationError(null);
      setDuplicateNotice(null);
      setSubmittedReport(null);
    }
  }, [isOpen, question.id]);

  const existingReportsForQuestion = useMemo(() => {
    if (!isOpen) return [];
    return getStudentReportsForQuestion(studentId, question.id);
  }, [isOpen, studentId, question.id, submittedReport]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    setDuplicateNotice(null);

    if (!hasConfirmedGenuineMistake) {
      setValidationError('Please confirm that you have found a genuine mistake before continuing.');
      return;
    }

    if (!selectedCategory) {
      setValidationError('Please select an Error Category.');
      return;
    }

    const trimmedExplanation = studentExplanation.trim();
    if (!trimmedExplanation) {
      setValidationError('Please provide a short explanation of the error.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitTetCtetQuestionErrorReport({
        studentId,
        studentName,
        mockTestId,
        testNumber,
        moduleId,
        moduleTitle,
        subjectId: question.subjectId,
        subject: question.subjectLabel,
        questionId: question.id,
        questionNumber: question.questionNumber,
        originalQuestionText: question.question,
        originalOptions: question.options,
        originalCorrectAnswer: question.correctAnswer,
        originalExplanation: question.explanation,
        selectedLanguage: String(question.mediumRendered || selectedLanguage || 'English'),
        reportCategory: selectedCategory,
        studentExplanation: trimmedExplanation,
      });

      if (res.isDuplicate) {
        setDuplicateNotice(res.message);
        return;
      }

      if (res.success) {
        setSubmittedReport(res.report);
        onSubmitted?.(res.report);
      }
    } catch (err) {
      setValidationError(
        err instanceof Error ? err.message : 'Unable to submit report. Please check all fields.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="report-question-modal-title"
    >
      <div className="fixed inset-0 -z-10" onClick={onClose} />

      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden m-auto">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0">
              <Flag className="w-4 h-4 fill-current" />
            </span>
            <div className="min-w-0">
              <h3
                id="report-question-modal-title"
                className="font-display font-black text-sm sm:text-base text-white truncate"
              >
                🚩 Report an Error
              </h3>
              <p className="text-[11px] text-slate-300 font-medium truncate">
                {moduleTitle} · Mock Test {String(testNumber || 1).padStart(2, '0')} · Q
                {question.questionNumber} ({question.subjectLabel})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Report Modal"
            className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4 text-xs">
          {submittedReport ? (
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-display font-black text-base text-emerald-950">
                Thank you! Your report has been submitted successfully.
              </h4>
              <div className="p-3 rounded-xl bg-white border border-emerald-200 text-left space-y-1 text-[11px] font-semibold text-slate-700">
                <div className="flex items-center justify-between gap-2">
                  <span>Report Reference:</span>
                  <span className="font-mono font-black text-indigo-800">
                    {submittedReport.reportNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Question ID:</span>
                  <span className="font-mono font-bold text-slate-900">
                    {submittedReport.questionId}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Error Category:</span>
                  <span className="font-bold text-slate-900">
                    {submittedReport.reportCategory}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span>Tracking Status:</span>
                  <span
                    className={`px-2 py-0.5 rounded-md border font-black text-[10px] ${getReportStatusBadgeStyle(
                      submittedReport.status
                    )}`}
                  >
                    {submittedReport.status}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Our academic review team will verify this report. You can check the live status (
                <strong>Submitted, Under Review, Confirmed, Corrected, Rejected</strong>) anytime in
                your Question Reports tracker.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[42px] px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-display font-black text-xs cursor-pointer"
              >
                Done &amp; Return to Question Review
              </button>
            </div>
          ) : !hasConfirmedGenuineMistake ? (
            /* STEP 1: MANDATORY CONFIRMATION GATE */
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <span>
                    Q{question.questionNumber} · {question.subjectLabel} ·{' '}
                    {String(question.mediumRendered || selectedLanguage)}
                  </span>
                  <span className="font-mono text-slate-700">ID: {question.id}</span>
                </div>
                <p className="font-semibold text-slate-900 line-clamp-2 leading-snug">
                  {question.question}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-center space-y-3">
                <div className="w-11 h-11 mx-auto rounded-2xl bg-amber-500 text-white flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h4 className="font-display font-black text-base text-slate-900">
                  Have you found a genuine mistake in this question?
                </h4>
                <p className="text-[11px] font-medium text-slate-600 leading-relaxed max-w-md mx-auto">
                  Please confirm before continuing. You will be asked to select the error category
                  and provide a short explanation for our academic review team.
                </p>
              </div>

              {existingReportsForQuestion.length > 0 && (
                <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-200 space-y-1.5">
                  <p className="text-[11px] font-black text-indigo-950 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                    <span>Your Previous Report(s) for Question #{question.questionNumber}:</span>
                  </p>
                  <div className="space-y-1">
                    {existingReportsForQuestion.map((rep) => (
                      <div
                        key={rep.id}
                        className="flex flex-wrap items-center justify-between gap-2 text-[11px] bg-white px-2.5 py-1.5 rounded-lg border border-indigo-100"
                      >
                        <span className="font-bold text-slate-800">
                          {rep.reportNumber} · {rep.reportCategory}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded border font-black text-[10px] ${getReportStatusBadgeStyle(
                            rep.status
                          )}`}
                        >
                          {rep.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => setHasConfirmedGenuineMistake(true)}
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-display font-black text-xs cursor-pointer shadow-xs"
                >
                  Yes, Continue
                </button>
              </div>
            </div>
          ) : (
            /* STEP 2: REPORT FORM (Requires Error Category + Short Explanation) */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Automatic Captured Context Summary (Read-Only for Student) */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold text-slate-500 uppercase">
                  <span>
                    Q{question.questionNumber} · {question.subjectLabel} ·{' '}
                    {String(question.mediumRendered || selectedLanguage)}
                  </span>
                  <span className="font-mono text-slate-700">ID: {question.id}</span>
                </div>
                <p className="font-semibold text-slate-900 line-clamp-2 leading-snug">
                  {question.question}
                </p>
              </div>

              {/* Required Error Category */}
              <div className="space-y-1.5">
                <label className="block font-bold text-slate-800 text-xs">
                  Error Category <span className="text-rose-600">*</span>
                </label>
                <div className="grid grid-cols-1 gap-1.5 max-h-[200px] overflow-y-auto pr-1">
                  {TET_CTET_REPORT_CATEGORIES.map((category, idx) => {
                    const isSelected = selectedCategory === category;
                    return (
                      <label
                        key={category}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-600 text-indigo-950'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="tetReportCategory"
                          value={category}
                          checked={isSelected}
                          onChange={() => {
                            setSelectedCategory(category);
                            setValidationError(null);
                            setDuplicateNotice(null);
                          }}
                          className="accent-indigo-700 cursor-pointer"
                        />
                        <span>
                          {idx + 1}. {category}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Required Short Explanation */}
              <div className="space-y-1">
                <label
                  htmlFor="tet-report-description"
                  className="block font-bold text-slate-800 text-xs"
                >
                  Short Explanation <span className="text-rose-600">*</span>
                </label>
                <textarea
                  id="tet-report-description"
                  rows={3}
                  required
                  value={studentExplanation}
                  onChange={(e) => {
                    setStudentExplanation(e.target.value);
                    if (validationError) setValidationError(null);
                  }}
                  placeholder="Briefly explain the mistake found in this question, option, or answer key..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 bg-white focus:outline-hidden focus:border-indigo-600"
                />
              </div>

              {validationError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-900 font-bold text-xs">
                  {validationError}
                </div>
              )}

              {duplicateNotice && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 font-bold text-xs">
                  {duplicateNotice}
                </div>
              )}

              {/* Submit Report & Cancel Buttons */}
              <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[42px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[42px] px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-display font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Flag className="w-3.5 h-3.5 fill-current" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
