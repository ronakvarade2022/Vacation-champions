import React, { useState, useMemo, useEffect } from 'react';
import {
  DemoExamConfig,
  DemoExamQuestion,
  DemoExamTypeId,
  OFFICIAL_DEMO_EXAM_CONFIGS
} from '../../data/demoExamEngine';
import { demoExamService, DemoExamStats } from '../../services/demoExamService';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  Edit3,
  Eye,
  FileText,
  Plus,
  RefreshCw,
  RotateCcw,
  Search,
  Settings,
  ShieldCheck,
  Trash2,
  Users,
  X
} from 'lucide-react';

const TEST_LIST: { id: DemoExamTypeId; label: string; tag: string }[] = [
  { id: 'demo_tet', label: 'TET Demo Mock Test', tag: 'Teachers (MAHA TET)' },
  { id: 'demo_ctet', label: 'CTET Demo Mock Test', tag: 'Teachers (CBSE CTET)' },
  { id: 'demo_scholarship_4', label: 'Class 4 Scholarship Demo', tag: 'Std 4th (150 Marks)' },
  { id: 'demo_scholarship_7', label: 'Class 7 Scholarship Demo', tag: 'Std 7th (150 Marks)' }
];

export const AdminDemoExamsSection: React.FC = () => {
  const [selectedTestId, setSelectedTestId] = useState<DemoExamTypeId>('demo_tet');
  const [activeSubTab, setActiveSubTab] = useState<'questions' | 'config' | 'stats'>('questions');

  const [refreshKey, setRefreshKey] = useState<number>(0);
  const [config, setConfig] = useState<DemoExamConfig>(() => demoExamService.getConfig('demo_tet'));
  const [questions, setQuestions] = useState<DemoExamQuestion[]>(() =>
    demoExamService.getQuestions('demo_tet')
  );
  const [stats, setStats] = useState<DemoExamStats>(() => demoExamService.getStats('demo_tet'));

  // Sync data when selectedTestId or refreshKey changes
  useEffect(() => {
    setConfig(demoExamService.getConfig(selectedTestId));
    setQuestions(demoExamService.getQuestions(selectedTestId));
    setStats(demoExamService.getStats(selectedTestId));
  }, [selectedTestId, refreshKey]);

  // Questions filter
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSectionFilter, setSelectedSectionFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 15;

  // Add / Edit Modal State
  const [editingQuestion, setEditingQuestion] = useState<DemoExamQuestion | null>(null);
  const [isAddMode, setIsAddMode] = useState<boolean>(false);
  const [formSection, setFormSection] = useState<string>('');
  const [formQuestion, setFormQuestion] = useState<string>('');
  const [formOpt0, setFormOpt0] = useState<string>('');
  const [formOpt1, setFormOpt1] = useState<string>('');
  const [formOpt2, setFormOpt2] = useState<string>('');
  const [formOpt3, setFormOpt3] = useState<string>('');
  const [formCorrectAnswer, setFormCorrectAnswer] = useState<number>(0);
  const [formExplanation, setFormExplanation] = useState<string>('');
  const [formMarks, setFormMarks] = useState<number>(1);
  const [formTopic, setFormTopic] = useState<string>('');
  const [modalFeedback, setModalFeedback] = useState<string | null>(null);

  // Config Form State
  const [editDurationMinutes, setEditDurationMinutes] = useState<number>(config.durationMinutes);
  const [editMarksPerQuestion, setEditMarksPerQuestion] = useState<number>(config.marksPerQuestion);
  const [editPassingPercentage, setEditPassingPercentage] = useState<number>(config.passingPercentage);
  const [configFeedback, setConfigFeedback] = useState<string | null>(null);

  useEffect(() => {
    setEditDurationMinutes(config.durationMinutes);
    setEditMarksPerQuestion(config.marksPerQuestion);
    setEditPassingPercentage(config.passingPercentage);
  }, [config]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchSection =
        selectedSectionFilter === 'all' || q.section === selectedSectionFilter;
      const matchSearch =
        !searchQuery.trim() ||
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.options.some((o) => o.toLowerCase().includes(searchQuery.toLowerCase())) ||
        String(q.questionNumber) === searchQuery.trim();
      return matchSection && matchSearch;
    });
  }, [questions, selectedSectionFilter, searchQuery]);

  const totalPages = Math.ceil(filteredQuestions.length / pageSize) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, currentPage]);

  // Open Edit Modal
  const openEditModal = (q: DemoExamQuestion) => {
    setIsAddMode(false);
    setEditingQuestion(q);
    setFormSection(q.section);
    setFormQuestion(q.question);
    setFormOpt0(q.options[0] || '');
    setFormOpt1(q.options[1] || '');
    setFormOpt2(q.options[2] || '');
    setFormOpt3(q.options[3] || '');
    setFormCorrectAnswer(q.correctAnswer);
    setFormExplanation(q.explanation);
    setFormMarks(q.marks);
    setFormTopic(q.topic || '');
    setModalFeedback(null);
  };

  // Open Add Modal
  const openAddModal = () => {
    setIsAddMode(true);
    setEditingQuestion({
      id: '',
      testId: selectedTestId,
      questionNumber: questions.length + 1,
      section: config.sections[0]?.name || 'General',
      subjectLabel: config.sections[0]?.name || 'General',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      explanation: '',
      marks: config.marksPerQuestion
    });
    setFormSection(config.sections[0]?.name || 'General');
    setFormQuestion('');
    setFormOpt0('');
    setFormOpt1('');
    setFormOpt2('');
    setFormOpt3('');
    setFormCorrectAnswer(0);
    setFormExplanation('');
    setFormMarks(config.marksPerQuestion);
    setFormTopic('');
    setModalFeedback(null);
  };

  // Save Modal Question
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formQuestion.trim() || !formOpt0.trim() || !formOpt1.trim() || !formOpt2.trim() || !formOpt3.trim()) {
      setModalFeedback('Please fill out the question text and all 4 options.');
      return;
    }

    if (isAddMode) {
      await demoExamService.addQuestion(selectedTestId, {
        section: formSection,
        subjectLabel: formSection,
        question: formQuestion.trim(),
        options: [formOpt0.trim(), formOpt1.trim(), formOpt2.trim(), formOpt3.trim()],
        correctAnswer: formCorrectAnswer,
        explanation: formExplanation.trim() || `Correct answer is option (${formCorrectAnswer + 1}).`,
        marks: formMarks,
        topic: formTopic.trim()
      });
    } else if (editingQuestion) {
      await demoExamService.saveQuestion(selectedTestId, {
        ...editingQuestion,
        section: formSection,
        subjectLabel: formSection,
        question: formQuestion.trim(),
        options: [formOpt0.trim(), formOpt1.trim(), formOpt2.trim(), formOpt3.trim()],
        correctAnswer: formCorrectAnswer,
        explanation: formExplanation.trim(),
        marks: formMarks,
        topic: formTopic.trim()
      });
    }

    setEditingQuestion(null);
    setRefreshKey((k) => k + 1);
  };

  // Delete Question
  const handleDeleteQuestion = async (qId: string) => {
    if (!window.confirm('Are you sure you want to delete this question? Remaining questions will be renumbered.')) {
      return;
    }
    await demoExamService.deleteQuestion(selectedTestId, qId);
    setRefreshKey((k) => k + 1);
  };

  // Reset to Defaults
  const handleResetToDefaults = async () => {
    if (!window.confirm('Reset this demo test back to the official default question bank and configuration? Any custom edits will be reverted.')) {
      return;
    }
    await demoExamService.resetToDefaults(selectedTestId);
    setRefreshKey((k) => k + 1);
  };

  // Save Config Changes
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await demoExamService.updateConfig(selectedTestId, {
      durationMinutes: Number(editDurationMinutes),
      marksPerQuestion: Number(editMarksPerQuestion),
      passingPercentage: Number(editPassingPercentage)
    });
    setConfig(updated);
    setConfigFeedback('Configuration updated successfully!');
    setRefreshKey((k) => k + 1);
    setTimeout(() => setConfigFeedback(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-3xl border border-amber-200/80 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-0.5 rounded-full bg-indigo-100 text-indigo-900 text-xs font-black uppercase">
              Admin Control Center
            </span>
            <span className="text-xs text-slate-500 font-semibold">Free Demo Examinations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-black text-slate-900 mt-1">
            Free Demo Mock Tests Management
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            View, edit, customize duration, marking schemes, questions, and view participant
            statistics for all 4 demo mock tests.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetToDefaults}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Test to Defaults</span>
        </button>
      </div>

      {/* Test Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {TEST_LIST.map((item) => {
          const isSelected = selectedTestId === item.id;
          const tCfg = demoExamService.getConfig(item.id);
          const tQs = demoExamService.getQuestions(item.id);

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelectedTestId(item.id);
                setCurrentPage(1);
                setSearchQuery('');
                setSelectedSectionFilter('all');
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-indigo-900 text-white border-indigo-900 shadow-sm'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-indigo-300'
              }`}
            >
              <span
                className={`text-[10px] font-black uppercase tracking-wider block ${
                  isSelected ? 'text-indigo-300' : 'text-slate-500'
                }`}
              >
                {item.tag}
              </span>
              <h3 className="text-sm font-display font-black mt-0.5">{item.label}</h3>
              <div
                className={`mt-2 flex items-center gap-2 text-xs font-mono font-bold ${
                  isSelected ? 'text-indigo-200' : 'text-slate-600'
                }`}
              >
                <span>{tQs.length} Qs</span>
                <span>·</span>
                <span>{tCfg.totalMarks} Marks</span>
                <span>·</span>
                <span>{tCfg.durationMinutes}m</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Sub-Tabs: Questions / Config / Stats */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSubTab('questions')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'questions'
                  ? 'bg-indigo-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Questions & Answers ({questions.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('config')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'config'
                  ? 'bg-indigo-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Duration & Marking Scheme</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('stats')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'stats'
                  ? 'bg-indigo-700 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Participant Stats ({stats.totalAttempts})</span>
            </button>
          </div>

          {activeSubTab === 'questions' && (
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add Question</span>
            </button>
          )}
        </div>

        {/* =====================================================================
            SUB-TAB 1: QUESTIONS & ANSWERS TABLE
            ===================================================================== */}
        {activeSubTab === 'questions' && (
          <div className="space-y-4">
            {/* Filters Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search question text, options, or question number..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <select
                value={selectedSectionFilter}
                onChange={(e) => {
                  setSelectedSectionFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Sections ({questions.length})</option>
                {config.sections.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} ({s.questionCount} Qs)
                  </option>
                ))}
              </select>
            </div>

            {/* Questions Table */}
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-3 w-14 text-center">#</th>
                    <th className="py-3 px-3 w-36">Section</th>
                    <th className="py-3 px-4">Question & Options</th>
                    <th className="py-3 px-3 w-28 text-center">Correct Key</th>
                    <th className="py-3 px-3 w-20 text-center">Marks</th>
                    <th className="py-3 px-3 w-24 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                  {paginatedQuestions.map((q) => (
                    <tr key={q.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-900">
                        {q.questionNumber}
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-600 font-semibold">
                        {q.section}
                      </td>
                      <td className="py-3 px-4 space-y-1.5">
                        <p className="font-bold text-slate-900 line-clamp-2">{q.question}</p>
                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                          {q.options.map((opt, i) => (
                            <span
                              key={i}
                              className={`truncate px-1.5 py-0.5 rounded ${
                                i === q.correctAnswer
                                  ? 'bg-emerald-100 text-emerald-900 font-bold'
                                  : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {String.fromCharCode(65 + i)}: {opt}
                            </span>
                          ))}
                        </div>
                        {q.explanation && (
                          <p className="text-[11px] text-indigo-700 font-medium italic line-clamp-1">
                            Sol: {q.explanation}
                          </p>
                        )}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-mono font-bold text-xs">
                          {String.fromCharCode(65 + q.correctAnswer)}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">
                        +{q.marks || config.marksPerQuestion}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(q)}
                            title="Edit Question"
                            className="p-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 cursor-pointer transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteQuestion(q.id)}
                            title="Delete Question"
                            className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedQuestions.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No questions match the current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between text-xs text-slate-600 pt-2">
                <span>
                  Showing {(currentPage - 1) * pageSize + 1}–
                  {Math.min(currentPage * pageSize, filteredQuestions.length)} of{' '}
                  {filteredQuestions.length} questions
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Previous
                  </button>
                  <span className="px-2 font-bold font-mono">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed hover:bg-slate-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =====================================================================
            SUB-TAB 2: DURATION & MARKING SCHEME CONFIGURATION
            ===================================================================== */}
        {activeSubTab === 'config' && (
          <form onSubmit={handleSaveConfig} className="max-w-2xl space-y-5">
            {configFeedback && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{configFeedback}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Examination Duration (Minutes)
                </label>
                <input
                  type="number"
                  min="5"
                  max="300"
                  value={editDurationMinutes}
                  onChange={(e) => setEditDurationMinutes(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Current: {editDurationMinutes * 60} seconds ({Math.floor(editDurationMinutes / 60)}h{' '}
                  {editDurationMinutes % 60}m)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Marks per Question
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={editMarksPerQuestion}
                  onChange={(e) => setEditMarksPerQuestion(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Calculated Total: {questions.length * editMarksPerQuestion} Marks
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Passing Percentage (%)
                </label>
                <input
                  type="number"
                  min="10"
                  max="90"
                  value={editPassingPercentage}
                  onChange={(e) => setEditPassingPercentage(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Passing score threshold: {Math.round((questions.length * editMarksPerQuestion * editPassingPercentage) / 100)} Marks
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Negative Marking
                </label>
                <input
                  type="text"
                  disabled
                  value="0 (No negative marks in official pattern)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-slate-50 text-slate-500 font-medium"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs transition-colors"
              >
                Save Examination Configuration
              </button>
            </div>
          </form>
        )}

        {/* =====================================================================
            SUB-TAB 3: PARTICIPANT STATISTICS & ATTEMPTS LOG
            ===================================================================== */}
        {activeSubTab === 'stats' && (
          <div className="space-y-6">
            {/* Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/60">
                <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block">
                  Total Attempts
                </span>
                <span className="text-2xl font-black text-indigo-950 font-mono mt-1 block">
                  {stats.totalAttempts}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/60">
                <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                  Avg. Score
                </span>
                <span className="text-2xl font-black text-emerald-950 font-mono mt-1 block">
                  {stats.averageScore}
                  <span className="text-xs text-emerald-700 font-normal">/{config.totalMarks}</span>
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/60">
                <span className="text-[11px] font-bold text-teal-700 uppercase tracking-wider block">
                  Pass Rate
                </span>
                <span className="text-2xl font-black text-teal-950 font-mono mt-1 block">
                  {stats.passRatePercentage}%
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60">
                <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
                  Highest Score
                </span>
                <span className="text-2xl font-black text-amber-950 font-mono mt-1 block">
                  {stats.highestScore}
                  <span className="text-xs text-amber-700 font-normal">/{config.totalMarks}</span>
                </span>
              </div>
            </div>

            {/* Attempts Table */}
            <div className="space-y-3">
              <h3 className="text-sm font-display font-black text-slate-900">
                Recent Demo Test Participations
              </h3>
              <div className="rounded-2xl border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Participant</th>
                      <th className="py-2.5 px-3">Role</th>
                      <th className="py-2.5 px-3 text-center">Score / Max</th>
                      <th className="py-2.5 px-3 text-center">Percentage</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-center">Time Taken</th>
                      <th className="py-2.5 px-3 text-right">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                    {stats.recentAttempts.map((att) => (
                      <tr key={att.id} className="hover:bg-slate-50/50">
                        <td className="py-2.5 px-3 font-bold text-slate-900">
                          {att.studentName || 'Guest User'}
                        </td>
                        <td className="py-2.5 px-3 text-xs text-slate-600 capitalize">
                          {att.studentRole}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono font-bold text-indigo-900">
                          {att.marksObtained} / {att.maxMarks}
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono">{att.percentage}%</td>
                        <td className="py-2.5 px-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              att.passed
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            {att.passed ? 'Qualified' : 'Failed'}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-center font-mono text-xs">
                          {Math.floor(att.timeTakenSeconds / 60)}m {att.timeTakenSeconds % 60}s
                        </td>
                        <td className="py-2.5 px-3 text-right text-xs text-slate-500 font-mono">
                          {new Date(att.completedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {stats.recentAttempts.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-6 text-center text-slate-500">
                          No participation attempts recorded yet for this demo test.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* =====================================================================
          ADD / EDIT QUESTION MODAL
          ===================================================================== */}
      {editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-lg font-display font-black text-slate-900">
                  {isAddMode ? 'Add New Question' : `Edit Question Q${editingQuestion.questionNumber}`}
                </h3>
                <span className="text-xs text-slate-500 font-medium">{config.title}</span>
              </div>
              <button
                type="button"
                onClick={() => setEditingQuestion(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {modalFeedback && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-bold">
                {modalFeedback}
              </div>
            )}

            <form onSubmit={handleSaveQuestion} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section</label>
                  <select
                    value={formSection}
                    onChange={(e) => setFormSection(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-white font-medium"
                  >
                    {config.sections.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Marks for this Question
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={formMarks}
                    onChange={(e) => setFormMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Question Text (मराठी किंवा English)
                </label>
                <textarea
                  rows={3}
                  value={formQuestion}
                  onChange={(e) => setFormQuestion(e.target.value)}
                  placeholder="Enter the complete question text..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700">
                  Multiple Choice Options (4 Required)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      A
                    </span>
                    <input
                      type="text"
                      placeholder="Option A"
                      value={formOpt0}
                      onChange={(e) => setFormOpt0(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      B
                    </span>
                    <input
                      type="text"
                      placeholder="Option B"
                      value={formOpt1}
                      onChange={(e) => setFormOpt1(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      C
                    </span>
                    <input
                      type="text"
                      placeholder="Option C"
                      value={formOpt2}
                      onChange={(e) => setFormOpt2(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-100 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      D
                    </span>
                    <input
                      type="text"
                      placeholder="Option D"
                      value={formOpt3}
                      onChange={(e) => setFormOpt3(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 text-xs sm:text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Correct Answer Key
                </label>
                <div className="flex items-center gap-3">
                  {[0, 1, 2, 3].map((idx) => (
                    <label key={idx} className="flex items-center gap-1.5 cursor-pointer text-xs font-bold">
                      <input
                        type="radio"
                        name="correctAnswerKey"
                        checked={formCorrectAnswer === idx}
                        onChange={() => setFormCorrectAnswer(idx)}
                      />
                      <span>Option {String.fromCharCode(65 + idx)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Step-by-Step Explanation / स्पष्टीकरण
                </label>
                <textarea
                  rows={2}
                  value={formExplanation}
                  onChange={(e) => setFormExplanation(e.target.value)}
                  placeholder="Explain why this option is correct..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setEditingQuestion(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold cursor-pointer shadow-xs"
                >
                  {isAddMode ? 'Add Question' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
