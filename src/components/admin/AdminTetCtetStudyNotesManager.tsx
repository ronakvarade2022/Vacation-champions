import React, { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import {
  addCustomTetCtetStudyNote,
  deleteCustomTetCtetStudyNote,
  getAllTetCtetStudyNotes,
  getTetCtetNotesCatalogStats,
  getTetCtetSubjectsForPaper,
  subscribeToTetCtetNotesUpdates,
  TET_CTET_NOTE_LANGUAGES,
  TetCtetNoteExam,
  TetCtetNoteLanguage,
  TetCtetNotePaper,
  TetCtetNoteSubjectId,
  TetCtetStudyNoteDocument,
  toggleTetCtetNotePublished,
  updateTetCtetNoteMetadata,
} from '../../data/tetCtetNotes';

export const AdminTetCtetStudyNotesManager: React.FC = () => {
  const [tick, setTick] = useState(0);
  const [examFilter, setExamFilter] = useState<'ALL' | TetCtetNoteExam>('ALL');
  const [paperFilter, setPaperFilter] = useState<'ALL' | TetCtetNotePaper>('ALL');
  const [langFilter, setLangFilter] = useState<'ALL' | TetCtetNoteLanguage>('ALL');
  const [subjectFilter, setSubjectFilter] = useState<'ALL' | TetCtetNoteSubjectId>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PUBLISHED' | 'HIDDEN'>('ALL');
  const [search, setSearch] = useState('');

  const [previewDoc, setPreviewDoc] = useState<TetCtetStudyNoteDocument | null>(null);
  const [editDoc, setEditDoc] = useState<TetCtetStudyNoteDocument | null>(null);
  const [editForm, setEditForm] = useState({
    documentTitle: '',
    unitTitle: '',
    topicTitle: '',
    topicSummary: '',
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [addError, setAddError] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [addForm, setAddForm] = useState<{
    exam: TetCtetNoteExam;
    paper: TetCtetNotePaper;
    language: TetCtetNoteLanguage;
    subjectId: TetCtetNoteSubjectId;
    unitNumber: number;
    unitTitle: string;
    topicTitle: string;
    documentTitle: string;
    introduction: string;
    detailedExplanationText: string;
    examPointsText: string;
    topicSummary: string;
  }>({
    exam: 'CTET',
    paper: 'PAPER_1',
    language: 'English',
    subjectId: 'CDP',
    unitNumber: 6,
    unitTitle: '',
    topicTitle: '',
    documentTitle: '',
    introduction: '',
    detailedExplanationText: '',
    examPointsText: '',
    topicSummary: '',
  });

  useEffect(() => {
    return subscribeToTetCtetNotesUpdates(() => setTick((t) => t + 1));
  }, []);

  useEffect(() => {
    if (!toastMsg) return;
    const timer = window.setTimeout(() => setToastMsg(''), 3500);
    return () => window.clearTimeout(timer);
  }, [toastMsg]);

  const allNotes = useMemo(() => {
    void tick;
    return getAllTetCtetStudyNotes(true);
  }, [tick]);

  const stats = useMemo(() => {
    void tick;
    return getTetCtetNotesCatalogStats();
  }, [tick]);

  const filteredNotes = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allNotes.filter((doc) => {
      if (examFilter !== 'ALL' && doc.exam !== examFilter) return false;
      if (paperFilter !== 'ALL' && doc.paper !== paperFilter) return false;
      if (langFilter !== 'ALL' && doc.language !== langFilter) return false;
      if (subjectFilter !== 'ALL' && doc.subjectId !== subjectFilter) return false;
      if (statusFilter === 'PUBLISHED' && !doc.isPublished) return false;
      if (statusFilter === 'HIDDEN' && doc.isPublished) return false;
      if (q) {
        const hay = `${doc.documentTitle} ${doc.unitTitle} ${doc.topicTitle} ${doc.fileReference} ${doc.subjectName}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allNotes, examFilter, paperFilter, langFilter, subjectFilter, statusFilter, search]);

  const addPaperSubjects = useMemo(
    () => getTetCtetSubjectsForPaper(addForm.paper),
    [addForm.paper]
  );

  const handleTogglePublish = (doc: TetCtetStudyNoteDocument) => {
    const next = toggleTetCtetNotePublished(doc.id);
    setTick((t) => t + 1);
    setToastMsg(
      next
        ? `Published "${doc.documentTitle}" — visible immediately to students.`
        : `Hidden "${doc.documentTitle}" from student view.`
    );
  };

  const openEditModal = (doc: TetCtetStudyNoteDocument) => {
    setEditDoc(doc);
    setEditForm({
      documentTitle: doc.documentTitle,
      unitTitle: doc.unitTitle,
      topicTitle: doc.topicTitle,
      topicSummary: doc.body.topicSummary,
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editDoc) return;
    updateTetCtetNoteMetadata(editDoc.id, {
      documentTitle: editForm.documentTitle.trim() || editDoc.documentTitle,
      unitTitle: editForm.unitTitle.trim() || editDoc.unitTitle,
      topicTitle: editForm.topicTitle.trim() || editDoc.topicTitle,
      topicSummary: editForm.topicSummary.trim() || editDoc.body.topicSummary,
    });
    setEditDoc(null);
    setTick((t) => t + 1);
    setToastMsg('Study note metadata updated and synced to student view.');
  };

  const handleCreateCustomNote = (e: React.FormEvent) => {
    e.preventDefault();
    setAddError('');
    const detailedExplanation = addForm.detailedExplanationText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const importantExamPoints = addForm.examPointsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const res = addCustomTetCtetStudyNote({
      exam: addForm.exam,
      paper: addForm.paper,
      language: addForm.language,
      subjectId: addForm.subjectId,
      unitNumber: Number(addForm.unitNumber) || 1,
      unitTitle: addForm.unitTitle,
      topicTitle: addForm.topicTitle,
      documentTitle: addForm.documentTitle,
      introduction: addForm.introduction,
      detailedExplanation,
      importantExamPoints,
      topicSummary: addForm.topicSummary || addForm.introduction,
      revisionPoints: importantExamPoints,
    });

    if (!res.ok) {
      setAddError(res.error);
      return;
    }

    setShowAddModal(false);
    setAddForm((prev) => ({
      ...prev,
      unitTitle: '',
      topicTitle: '',
      documentTitle: '',
      introduction: '',
      detailedExplanationText: '',
      examPointsText: '',
      topicSummary: '',
    }));
    setTick((t) => t + 1);
    setToastMsg(`Added new study note (${res.document.fileReference}) and published to students.`);
  };

  const handleDeleteCustom = (doc: TetCtetStudyNoteDocument) => {
    if (!doc.isCustom) return;
    deleteCustomTetCtetStudyNote(doc.id);
    setTick((t) => t + 1);
    setToastMsg(`Deleted custom study note "${doc.documentTitle}".`);
  };

  return (
    <div className="space-y-5">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-xs font-semibold text-emerald-900 flex items-center justify-between gap-2">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            {toastMsg}
          </span>
          <button
            type="button"
            onClick={() => setToastMsg('')}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header & Add Action */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            TET &amp; CTET Trilingual Study Notes Registry
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Manage CTET &amp; MAHA TET Paper I &amp; II study notes across English, Marathi, and Hindi. All publish/edit changes sync immediately to the student view.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setAddError('');
            setShowAddModal(true);
          }}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add Study Note (Duplicate-Checked)
        </button>
      </div>

      {/* KPI Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="rounded-xl bg-white border border-slate-200 p-3">
          <div className="text-[11px] font-bold text-slate-500">Total Note Docs</div>
          <div className="text-xl font-extrabold text-slate-900 mt-0.5">{stats.totalDocuments}</div>
          <div className="text-[10px] text-slate-500">{stats.totalBlueprints} Official Units</div>
        </div>
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
          <div className="text-[11px] font-bold text-emerald-700">Published</div>
          <div className="text-xl font-extrabold text-emerald-900 mt-0.5">{stats.publishedDocuments}</div>
          <div className="text-[10px] text-emerald-700">Hidden: {stats.hiddenDocuments}</div>
        </div>
        <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3">
          <div className="text-[11px] font-bold text-indigo-700">English Docs</div>
          <div className="text-xl font-extrabold text-indigo-900 mt-0.5">{stats.byLanguage.English}</div>
          <div className="text-[10px] text-indigo-700">CTET + MAHA TET</div>
        </div>
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3">
          <div className="text-[11px] font-bold text-amber-800">Marathi (मराठी)</div>
          <div className="text-xl font-extrabold text-amber-950 mt-0.5">{stats.byLanguage.Marathi}</div>
          <div className="text-[10px] text-amber-800">Equal Full Depth</div>
        </div>
        <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
          <div className="text-[11px] font-bold text-purple-800">Hindi (हिन्दी)</div>
          <div className="text-xl font-extrabold text-purple-950 mt-0.5">{stats.byLanguage.Hindi}</div>
          <div className="text-[10px] text-purple-800">Equal Full Depth</div>
        </div>
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-3">
          <div className="text-[11px] font-bold text-slate-600">4-Paper Coverage</div>
          <div className="text-xs font-extrabold text-slate-900 mt-1">
            P1: {stats.byPaper.CTET_PAPER_1}/{stats.byPaper.MAHA_TET_PAPER_1}
          </div>
          <div className="text-xs font-extrabold text-slate-900">
            P2: {stats.byPaper.CTET_PAPER_2}/{stats.byPaper.MAHA_TET_PAPER_2}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-xl bg-white border border-slate-200 p-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
        <div className="relative lg:col-span-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search title, unit, topic, or file reference..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={examFilter}
          onChange={(e) => setExamFilter(e.target.value as 'ALL' | TetCtetNoteExam)}
          className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
        >
          <option value="ALL">All Exams</option>
          <option value="CTET">CBSE CTET</option>
          <option value="MAHA_TET">MAHA TET</option>
        </select>
        <select
          value={paperFilter}
          onChange={(e) => setPaperFilter(e.target.value as 'ALL' | TetCtetNotePaper)}
          className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
        >
          <option value="ALL">All Papers</option>
          <option value="PAPER_1">Paper I (I–V)</option>
          <option value="PAPER_2">Paper II (VI–VIII)</option>
        </select>
        <select
          value={langFilter}
          onChange={(e) => setLangFilter(e.target.value as 'ALL' | TetCtetNoteLanguage)}
          className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
        >
          <option value="ALL">All Languages</option>
          <option value="English">English</option>
          <option value="Marathi">Marathi (मराठी)</option>
          <option value="Hindi">Hindi (हिन्दी)</option>
        </select>
        <select
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value as 'ALL' | TetCtetNoteSubjectId)}
          className="px-2.5 py-2 text-xs rounded-lg border border-slate-200 bg-white font-semibold"
        >
          <option value="ALL">All Subjects</option>
          <option value="CDP">CDP</option>
          <option value="LANGUAGE_1">Language I</option>
          <option value="LANGUAGE_2">Language II</option>
          <option value="MATHEMATICS">Mathematics</option>
          <option value="EVS">EVS (Paper I)</option>
          <option value="SCIENCE">Science (Paper II)</option>
          <option value="SOCIAL_STUDIES">Social Studies (Paper II)</option>
        </select>
      </div>

      {/* Status Filter Pills + Result Count */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-1.5">
          {(['ALL', 'PUBLISHED', 'HIDDEN'] as const).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st === 'PUBLISHED' ? 'Published' : 'Hidden'}
            </button>
          ))}
        </div>
        <span className="font-semibold text-slate-600">
          Showing {filteredNotes.length} of {allNotes.length} study note documents
        </span>
      </div>

      {/* Registry Table */}
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-[540px] overflow-y-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="sticky top-0 bg-slate-900 text-white z-10">
              <tr>
                <th className="px-3 py-2.5 font-bold">Exam / Paper</th>
                <th className="px-3 py-2.5 font-bold">Lang</th>
                <th className="px-3 py-2.5 font-bold">Subject</th>
                <th className="px-3 py-2.5 font-bold">Unit, Topic &amp; Document Title</th>
                <th className="px-3 py-2.5 font-bold">File Reference</th>
                <th className="px-3 py-2.5 font-bold">Status</th>
                <th className="px-3 py-2.5 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredNotes.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50">
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span
                      className={`inline-block px-2 py-0.5 rounded font-bold text-[10px] ${
                        doc.exam === 'CTET'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-orange-100 text-orange-800'
                      }`}
                    >
                      {doc.exam === 'CTET' ? 'CTET' : 'MAHA TET'}
                    </span>
                    <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
                      {doc.paper === 'PAPER_1' ? 'Paper I' : 'Paper II'}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-bold text-[10px]">
                      {doc.language}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 font-semibold text-slate-800 whitespace-nowrap">
                    {doc.subjectId}
                  </td>
                  <td className="px-3 py-2.5 max-w-xs">
                    <div className="font-bold text-slate-900 line-clamp-1">{doc.documentTitle}</div>
                    <div className="text-[11px] text-slate-500 line-clamp-1">
                      U{doc.unitNumber}: {doc.unitTitle}
                    </div>
                  </td>
                  <td className="px-3 py-2.5 font-mono text-[10px] text-slate-500 max-w-[200px] truncate">
                    {doc.fileReference}
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.isPublished
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {doc.isPublished ? 'Published' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-3 py-2.5 whitespace-nowrap text-right">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setPreviewDoc(doc)}
                        title="Preview Note"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-indigo-100 text-slate-700 hover:text-indigo-700 cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openEditModal(doc)}
                        title="Edit Metadata"
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-700 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(doc)}
                        title={doc.isPublished ? 'Hide from Students' : 'Publish to Students'}
                        className={`p-1.5 rounded-lg cursor-pointer ${
                          doc.isPublished
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-rose-100 hover:text-rose-700'
                            : 'bg-slate-200 text-slate-600 hover:bg-emerald-100 hover:text-emerald-800'
                        }`}
                      >
                        {doc.isPublished ? (
                          <Eye className="w-3.5 h-3.5" />
                        ) : (
                          <EyeOff className="w-3.5 h-3.5" />
                        )}
                      </button>
                      {doc.isCustom && (
                        <button
                          type="button"
                          onClick={() => handleDeleteCustom(doc)}
                          title="Delete Custom Note"
                          className="p-1.5 rounded-lg bg-rose-100 text-rose-700 hover:bg-rose-200 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filteredNotes.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No study note documents match your active filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col shadow-xl">
            <div className="px-5 py-4 border-b border-slate-200 flex items-start justify-between gap-3 bg-slate-50">
              <div>
                <div className="text-[11px] font-mono text-indigo-700">{previewDoc.fileReference}</div>
                <h4 className="text-base font-extrabold text-slate-900 mt-0.5">
                  {previewDoc.documentTitle}
                </h4>
                <div className="text-xs text-slate-600">
                  {previewDoc.exam} · {previewDoc.paper} · {previewDoc.language} · {previewDoc.subjectName}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 overflow-y-auto space-y-4 text-sm text-slate-800">
              <div>
                <div className="text-xs font-bold uppercase text-slate-500">Introduction</div>
                <p className="mt-1 leading-relaxed">{previewDoc.body.introduction}</p>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-slate-500">Detailed Explanation</div>
                <ul className="mt-1 space-y-2">
                  {previewDoc.body.detailedExplanation.map((p, i) => (
                    <li key={i} className="bg-slate-50 rounded-lg p-3 text-xs leading-relaxed">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-slate-500">Topic Summary</div>
                <p className="mt-1 text-xs leading-relaxed">{previewDoc.body.topicSummary}</p>
              </div>
              <div className="text-xs text-slate-500">
                Practice MCQs included: <strong>{previewDoc.body.practiceQuestions.length}</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Metadata Modal */}
      {editDoc && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveEdit}
            className="bg-white rounded-2xl max-w-xl w-full p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <h4 className="text-base font-extrabold text-slate-900">Edit Study Note Metadata</h4>
                <div className="text-[11px] font-mono text-slate-500">{editDoc.fileReference}</div>
              </div>
              <button
                type="button"
                onClick={() => setEditDoc(null)}
                className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={editForm.documentTitle}
                  onChange={(e) => setEditForm((f) => ({ ...f, documentTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Unit Title</label>
                <input
                  type="text"
                  required
                  value={editForm.unitTitle}
                  onChange={(e) => setEditForm((f) => ({ ...f, unitTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Topic Title</label>
                <input
                  type="text"
                  required
                  value={editForm.topicTitle}
                  onChange={(e) => setEditForm((f) => ({ ...f, topicTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Topic Summary</label>
                <textarea
                  rows={3}
                  value={editForm.topicSummary}
                  onChange={(e) => setEditForm((f) => ({ ...f, topicSummary: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditDoc(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
              >
                Save &amp; Sync
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Custom Note Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleCreateCustomNote}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h4 className="text-base font-extrabold text-slate-900">
                Add New TET / CTET Study Note (Duplicate Validation Enabled)
              </h4>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {addError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-800">
                {addError}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Exam</label>
                <select
                  value={addForm.exam}
                  onChange={(e) => setAddForm((f) => ({ ...f, exam: e.target.value as TetCtetNoteExam }))}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-300"
                >
                  <option value="CTET">CTET</option>
                  <option value="MAHA_TET">MAHA TET</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Paper</label>
                <select
                  value={addForm.paper}
                  onChange={(e) => {
                    const nextPaper = e.target.value as TetCtetNotePaper;
                    const firstSubj = getTetCtetSubjectsForPaper(nextPaper)[0].subjectId;
                    setAddForm((f) => ({ ...f, paper: nextPaper, subjectId: firstSubj }));
                  }}
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-300"
                >
                  <option value="PAPER_1">Paper I</option>
                  <option value="PAPER_2">Paper II</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Language</label>
                <select
                  value={addForm.language}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, language: e.target.value as TetCtetNoteLanguage }))
                  }
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-300"
                >
                  {TET_CTET_NOTE_LANGUAGES.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Subject</label>
                <select
                  value={addForm.subjectId}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, subjectId: e.target.value as TetCtetNoteSubjectId }))
                  }
                  className="w-full px-2.5 py-2 rounded-lg border border-slate-300"
                >
                  {addPaperSubjects.map((s) => (
                    <option key={s.subjectId} value={s.subjectId}>
                      {s.labels.English}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Unit Number</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={addForm.unitNumber}
                  onChange={(e) => setAddForm((f) => ({ ...f, unitNumber: Number(e.target.value) }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 mb-1">Unit Title</label>
                <input
                  type="text"
                  required
                  value={addForm.unitTitle}
                  onChange={(e) => setAddForm((f) => ({ ...f, unitTitle: e.target.value }))}
                  placeholder="e.g., Unit 6: NEP 2020 & FLN Mission"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Topic Title</label>
                <input
                  type="text"
                  required
                  value={addForm.topicTitle}
                  onChange={(e) => setAddForm((f) => ({ ...f, topicTitle: e.target.value }))}
                  placeholder="e.g., 5+3+3+4 Curricular Structure & NIPUN Bharat"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={addForm.documentTitle}
                  onChange={(e) => setAddForm((f) => ({ ...f, documentTitle: e.target.value }))}
                  placeholder="Unique document title"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Introduction</label>
                <textarea
                  rows={2}
                  required
                  value={addForm.introduction}
                  onChange={(e) => setAddForm((f) => ({ ...f, introduction: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Detailed Explanation (one paragraph per line)
                </label>
                <textarea
                  rows={4}
                  required
                  value={addForm.detailedExplanationText}
                  onChange={(e) =>
                    setAddForm((f) => ({ ...f, detailedExplanationText: e.target.value }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Important Exam Points (one bullet per line)
                </label>
                <textarea
                  rows={3}
                  value={addForm.examPointsText}
                  onChange={(e) => setAddForm((f) => ({ ...f, examPointsText: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Topic Summary</label>
                <textarea
                  rows={2}
                  value={addForm.topicSummary}
                  onChange={(e) => setAddForm((f) => ({ ...f, topicSummary: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
              >
                Publish Study Note
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminTetCtetStudyNotesManager;
