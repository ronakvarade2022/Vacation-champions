import React, { useState, useMemo, useEffect } from 'react';
import {
  Plus,
  AlertTriangle,
  Layers,
  BarChart3,
  Search,
  Check,
  X,
  Trash2,
} from 'lucide-react';
import type { EducationBoard, QuizQuestion } from '../../types';
import { BOARD_META_LIST } from '../../data/boards/boardMeta';
import { ALL_BOARDS, getBoardShortLabel } from '../../utils/subscriptionAccess';
import {
  ALL_ADMIN_CLASSES,
  ALL_ADMIN_SUBJECTS,
  buildQuestionBoardClassIndex,
  computeBoardAwareQuestionAnalytics,
} from '../../utils/adminAnalytics';
import { AdminPagination } from './AdminPagination';

interface QuestionRowProps {
  q: QuizQuestion;
  onUpdateStatus: (id: string, status: 'approved' | 'rejected') => void;
  onDelete: (id: string) => void;
}

const QuestionRow: React.FC<QuestionRowProps> = React.memo(
  ({ q, onUpdateStatus, onDelete }) => {
    const levelNum = q.level || 1;
    return (
      <tr className="hover:bg-amber-50/30 transition-colors">
        <td className="p-3 font-mono">
          <span className="font-bold text-amber-800 block">{q.id}</span>
          <span className="text-[10px] font-sans font-bold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded mr-1">
            {getBoardShortLabel(q.board || 'Maharashtra')}
          </span>
          <span className="text-[10px] text-slate-500 font-sans">{q.classLevel}</span>
        </td>
        <td className="p-3">
          <span className="font-bold text-slate-800 block">{q.subject}</span>
          <span className="text-[10px] text-slate-500">{q.topic || 'Core Concept'}</span>
        </td>
        <td className="p-3">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-extrabold border ${
              levelNum === 1
                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                : levelNum === 2
                  ? 'bg-blue-100 text-blue-800 border-blue-300'
                  : levelNum === 3
                    ? 'bg-amber-100 text-amber-800 border-amber-300'
                    : 'bg-purple-100 text-purple-800 border-purple-300'
            }`}
          >
            Level {levelNum}
          </span>
        </td>
        <td className="p-3">
          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200">
            {q.questionType ? q.questionType.replace(/_/g, ' ') : 'MCQ'}
          </span>
        </td>
        <td className="p-3 max-w-md font-medium text-slate-800 leading-relaxed">
          <p>{q.questionText}</p>
          <p className="text-[11px] text-emerald-700 font-bold mt-1">
            ✓ Correct: {q.options[q.correctIndex]}
          </p>
        </td>
        <td className="p-3">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
              q.status === 'approved'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : q.status === 'rejected'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
            }`}
          >
            {q.status || 'approved'}
          </span>
        </td>
        <td className="p-3 text-right">
          <div className="flex items-center justify-end gap-1">
            {q.status !== 'approved' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(q.id, 'approved')}
                className="px-2 py-1 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                title="Approve Question for Quizzes"
              >
                <Check className="w-3 h-3" />
                <span>Approve</span>
              </button>
            )}
            {q.status === 'approved' && (
              <button
                type="button"
                onClick={() => onUpdateStatus(q.id, 'rejected')}
                className="px-2 py-1 rounded bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-300 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                title="Revoke / Reject Question"
              >
                <X className="w-3 h-3" />
                <span>Reject</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => onDelete(q.id)}
              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Permanently Delete Question"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  }
);
QuestionRow.displayName = 'QuestionRow';

interface AdminQuestionsSectionProps {
  allQuestions: QuizQuestion[];
  rejectedDuplicatesCount: number;
  selectedBoardWorkspace: 'all' | EducationBoard;
  onSelectBoardWorkspace: (board: 'all' | EducationBoard) => void;
  selectedClassWorkspace: string;
  onSelectClassWorkspace: (cls: string) => void;
  onOpenAddQuestionModal: () => void;
  onUpdateQuestionStatus: (id: string, status: 'approved' | 'rejected') => void;
  onDeleteQuestion: (id: string) => void;
}

export const AdminQuestionsSection: React.FC<AdminQuestionsSectionProps> = React.memo(
  ({
    allQuestions,
    rejectedDuplicatesCount,
    selectedBoardWorkspace,
    onSelectBoardWorkspace,
    selectedClassWorkspace,
    onSelectClassWorkspace,
    onOpenAddQuestionModal,
    onUpdateQuestionStatus,
    onDeleteQuestion,
  }) => {
    const [filterSubject, setFilterSubject] = useState<string>('all');
    const [filterLevel, setFilterLevel] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [questionSearchInput, setQuestionSearchInput] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(25);

    // Debounce search query so typing does not filter 15,280 questions on every keystroke
    useEffect(() => {
      const timer = setTimeout(() => {
        setDebouncedSearch(questionSearchInput.trim().toLowerCase());
      }, 200);
      return () => clearTimeout(timer);
    }, [questionSearchInput]);

    // Pre-index all questions in O(N) once when allQuestions changes
    const questionIndex = useMemo(
      () => buildQuestionBoardClassIndex(allQuestions),
      [allQuestions]
    );

    // Single-pass analytics for active board workspace
    const analytics = useMemo(
      () => computeBoardAwareQuestionAnalytics(allQuestions, selectedBoardWorkspace),
      [allQuestions, selectedBoardWorkspace]
    );

    // O(1) board+class bucket selection before fine-grained filters
    const baseBucket = useMemo(() => {
      if (selectedBoardWorkspace !== 'all' && selectedClassWorkspace !== 'all') {
        return questionIndex.byBoardAndClass[`${selectedBoardWorkspace}__${selectedClassWorkspace}`] || [];
      }
      if (selectedBoardWorkspace !== 'all') {
        return questionIndex.byBoard[selectedBoardWorkspace] || [];
      }
      if (selectedClassWorkspace !== 'all') {
        return questionIndex.byClass[selectedClassWorkspace] || [];
      }
      return allQuestions;
    }, [questionIndex, allQuestions, selectedBoardWorkspace, selectedClassWorkspace]);

    const filteredQuestions = useMemo(() => {
      if (
        filterSubject === 'all' &&
        filterLevel === 'all' &&
        filterStatus === 'all' &&
        !debouncedSearch
      ) {
        return baseBucket;
      }
      return baseBucket.filter((q) => {
        if (filterSubject !== 'all' && q.subject !== filterSubject) return false;
        if (filterLevel !== 'all' && String(q.level || 1) !== filterLevel) return false;
        if (filterStatus !== 'all' && (q.status || 'approved') !== filterStatus) return false;
        if (debouncedSearch) {
          const matchText =
            q.questionText.toLowerCase().includes(debouncedSearch) ||
            q.id.toLowerCase().includes(debouncedSearch) ||
            (q.topic && q.topic.toLowerCase().includes(debouncedSearch));
          if (!matchText) return false;
        }
        return true;
      });
    }, [baseBucket, filterSubject, filterLevel, filterStatus, debouncedSearch]);

    // Reset to page 1 when filters change
    useEffect(() => {
      setCurrentPage(1);
    }, [
      selectedBoardWorkspace,
      selectedClassWorkspace,
      filterSubject,
      filterLevel,
      filterStatus,
      debouncedSearch,
    ]);

    const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    const paginatedQuestions = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredQuestions.slice(start, start + pageSize);
    }, [filteredQuestions, safePage, pageSize]);

    const nonZeroSubjects = useMemo(
      () =>
        ALL_ADMIN_SUBJECTS.filter(
          (sub) => (analytics.subjectCounts[sub] || 0) > 0 || filterSubject === sub
        ),
      [analytics.subjectCounts, filterSubject]
    );

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-8">
        {/* Header & New Question Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                Class-Wise Question Bank &amp; Curriculum Governance
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Completely isolated question banks for Standards 1st to 10th across Maharashtra, CBSE, and ICSE with zero cross-class leakage.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenAddQuestionModal}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Verified Question</span>
          </button>
        </div>

        {/* 4 High-Level Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
              {selectedBoardWorkspace === 'all'
                ? 'Total Questions in Bank'
                : `${getBoardShortLabel(selectedBoardWorkspace)} Questions`}
            </p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {analytics.totalCount.toLocaleString('en-IN')}
            </p>
            <p className="text-[10px] text-slate-500 mt-0.5">Across Standards 1st to 10th</p>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
            <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
              Class-Isolated Pools
            </p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">
              {ALL_ADMIN_CLASSES.length} Classes
            </p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Strict non-overlapping banks</p>
          </div>

          <div className="bg-indigo-50/70 rounded-2xl p-4 border border-indigo-200">
            <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">
              Question Formats
            </p>
            <p className="text-2xl font-extrabold text-indigo-700 mt-1">15 Types</p>
            <p className="text-[10px] text-indigo-600 mt-0.5">MCQ, Fill-blank, Match, Assertion, etc.</p>
          </div>

          <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200">
            <p className="text-[11px] font-bold text-rose-900 uppercase tracking-wider">
              Blocked Duplicates
            </p>
            <p className="text-2xl font-extrabold text-rose-700 mt-1">{rejectedDuplicatesCount}</p>
            <p className="text-[10px] text-rose-600 mt-0.5">Semantic repetition prevented</p>
          </div>
        </div>

        {/* Missing Question Bank Warnings */}
        {analytics.warnings.length > 0 && (
          <div className="bg-amber-50 rounded-2xl border-2 border-amber-300 p-4 space-y-1 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Question Bank Distribution Notice</span>
            </div>
            <ul className="list-disc pl-5 text-amber-950 text-[11px] space-y-0.5">
              {analytics.warnings.map((w, idx) => (
                <li key={idx}>
                  {w} Dynamic generator auto-populates on demand to maintain 10 questions per quiz.
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* BOARD-WISE QUESTION COUNTS (Maharashtra, CBSE, ICSE) */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Board-Wise Question Pools (Click to Filter Table)</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => onSelectBoardWorkspace('all')}
              className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                selectedBoardWorkspace === 'all'
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-800'
              }`}
            >
              <p className="text-[11px] font-bold">All 3 Boards</p>
              <p className="text-base font-extrabold mt-0.5">
                {questionIndex.total.toLocaleString('en-IN')}
              </p>
            </button>
            {BOARD_META_LIST.map((bm) => {
              const count = analytics.boardCounts[bm.id] || 0;
              const isSelected = selectedBoardWorkspace === bm.id;
              return (
                <button
                  type="button"
                  key={bm.id}
                  onClick={() => onSelectBoardWorkspace(isSelected ? 'all' : bm.id)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-800'
                  }`}
                >
                  <p className="text-[11px] font-bold">
                    {bm.icon} {bm.shortLabel}
                  </p>
                  <p className="text-base font-extrabold mt-0.5">{count.toLocaleString('en-IN')}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* CLASS-WISE QUESTION COUNTS */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Class-Wise Question Counts (Click to Filter Table)</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {ALL_ADMIN_CLASSES.map((cls) => {
              const count = analytics.classCounts[cls] || 0;
              const isSelected = selectedClassWorkspace === cls;
              return (
                <button
                  type="button"
                  key={cls}
                  onClick={() => onSelectClassWorkspace(isSelected ? 'all' : cls)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-amber-50/60 border-slate-200 text-slate-800'
                  }`}
                >
                  <p className="text-[11px] font-bold">{cls}</p>
                  <p className="text-base font-extrabold mt-0.5">{count}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* SUBJECT-WISE QUESTION COUNTS */}
        <div className="space-y-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
            <span>Subject-Wise Question Breakdown</span>
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {nonZeroSubjects.map((sub) => {
              const count = analytics.subjectCounts[sub] || 0;
              const isSelected = filterSubject === sub;
              return (
                <button
                  type="button"
                  key={sub}
                  onClick={() => setFilterSubject(isSelected ? 'all' : sub)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span>{sub}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected ? 'bg-amber-800 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* TWO BREAKDOWN PANELS: Question Types & Difficulties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Question Format Distribution
            </h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {Object.entries(analytics.typeCounts).map(([typeKey, count]) => (
                <div
                  key={typeKey}
                  className="bg-white p-2 rounded-lg border border-slate-200 flex items-center justify-between"
                >
                  <span className="font-medium text-slate-700 capitalize">
                    {typeKey.replace(/_/g, ' ')}
                  </span>
                  <span className="font-extrabold text-amber-700">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Difficulty &amp; Governance Distribution
            </h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                <p className="text-[10px] font-bold text-emerald-800 uppercase">Easy</p>
                <p className="text-xl font-extrabold text-emerald-700">
                  {analytics.difficultyCounts.easy || 0}
                </p>
              </div>
              <div className="bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                <p className="text-[10px] font-bold text-amber-800 uppercase">Medium</p>
                <p className="text-xl font-extrabold text-amber-700">
                  {analytics.difficultyCounts.medium || 0}
                </p>
              </div>
              <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200">
                <p className="text-[10px] font-bold text-purple-800 uppercase">Hard</p>
                <p className="text-xl font-extrabold text-purple-700">
                  {analytics.difficultyCounts.hard || 0}
                </p>
              </div>
            </div>
            <div className="pt-2 text-[11px] text-slate-500">
              Administrators can review newly generated questions, approve for active quiz rotations, or reject invalid questions.
            </div>
          </div>
        </div>

        {/* Filter Bar & Search */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedBoardWorkspace}
                onChange={(e) => onSelectBoardWorkspace(e.target.value as 'all' | EducationBoard)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All 3 Boards</option>
                {ALL_BOARDS.map((b) => (
                  <option key={b} value={b}>
                    {getBoardShortLabel(b)}
                  </option>
                ))}
              </select>

              <select
                value={selectedClassWorkspace}
                onChange={(e) => onSelectClassWorkspace(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All Classes</option>
                {ALL_ADMIN_CLASSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All Subjects</option>
                {ALL_ADMIN_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                value={filterLevel}
                onChange={(e) => setFilterLevel(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All Levels (1–4)</option>
                <option value="1">Level 1 (Easy)</option>
                <option value="2">Level 2 (Medium)</option>
                <option value="3">Level 3 (Hard)</option>
                <option value="4">Level 4 (Expert)</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              >
                <option value="all">All Statuses</option>
                <option value="approved">Approved / Active</option>
                <option value="pending">Pending Review</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={questionSearchInput}
                onChange={(e) => setQuestionSearchInput(e.target.value)}
                placeholder="Search by text, ID, or topic..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-medium"
              />
            </div>
          </div>

          <AdminPagination
            totalItems={filteredQuestions.length}
            currentPage={safePage}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[15, 25, 50, 100]}
            itemLabel="questions"
          />

          {/* Questions Table with Approve/Reject Controls */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-amber-50/70 border-b border-slate-200 text-amber-950 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">ID, Board &amp; Class</th>
                  <th className="p-3">Subject &amp; Topic</th>
                  <th className="p-3">Level</th>
                  <th className="p-3">Format</th>
                  <th className="p-3">Question Text &amp; Answer</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Review Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedQuestions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No questions match the selected Board, Class, Subject, or Search criteria.
                    </td>
                  </tr>
                ) : (
                  paginatedQuestions.map((q) => (
                    <QuestionRow
                      key={q.id}
                      q={q}
                      onUpdateStatus={onUpdateQuestionStatus}
                      onDelete={onDeleteQuestion}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>

          {filteredQuestions.length > pageSize && (
            <AdminPagination
              totalItems={filteredQuestions.length}
              currentPage={safePage}
              pageSize={pageSize}
              onPageChange={setCurrentPage}
              itemLabel="questions"
            />
          )}
        </div>
      </div>
    );
  }
);
AdminQuestionsSection.displayName = 'AdminQuestionsSection';
