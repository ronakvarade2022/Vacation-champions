import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Globe,
  Plus,
  RefreshCw,
  Trash2,
  Edit3,
  Eye,
  EyeOff,
  Activity,
  Database,
  HardDrive,
  ShieldCheck,
  Link2,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../../types';
import { ALL_10_CLASSES, getSubjectsForClass } from '../../data/classCurriculumConfig';
import { ALL_BOARDS } from '../../utils/subscriptionAccess';
import {
  bumpStudyLibraryVersionInFirestore,
  deleteStudyLibraryItemFromFirestore,
  loadPaginatedStudyLibraryItemsFromFirestore,
  loadPlatformConfigDetailed,
  saveStudyLibraryItemToFirestore,
  SpecialContentDocument,
  StudyLibraryDynamicItemPayload,
} from '../../services/specialContentFirestoreService';
import { auth, firebaseConfig } from '../../services/firebase';
import { getOfficialTextbooksForBoardClass } from '../../data/studyLibrary/textbookLibraryData';
import { getRichChaptersForSubject } from '../../data/worksheets/builders/chapterCatalog';
import { SCIENCE_DIAGRAMS_LIST } from '../../data/studyLibrary/specialAcademicHubsData';

interface AdminStudyLibraryCmsSectionProps {
  selectedBoardWorkspace: 'all' | EducationBoard;
  selectedClassWorkspace: string;
}

const MATERIAL_CATEGORIES: {
  id: StudyLibraryDynamicItemPayload['materialCategory'];
  label: string;
}[] = [
  { id: 'textbook', label: 'Official Textbook Link' },
  { id: 'notes', label: 'Chapter Notes' },
  { id: 'revision', label: '1-Page Revision Sheet' },
  { id: 'qa', label: 'Important Q&A Bank' },
  { id: 'test', label: 'Chapter Practice Test' },
  { id: 'model_paper', label: 'Model Question Paper' },
  { id: 'pyq', label: 'Previous Year Paper (PYQ)' },
  { id: 'video', label: 'Official Video Lesson' },
  { id: 'math_formula', label: 'Math Formula Sheet' },
  { id: 'science_diagram', label: 'Science Diagram Guide' },
  { id: 'english_grammar', label: 'English Grammar Resource' },
  { id: 'scholarship_olympiad', label: 'Scholarship & Olympiad' },
];

interface ApiHealthPayload {
  status?: string;
  razorpayMode?: string;
  razorpayConfigured?: boolean;
  timestamp?: string;
  error?: string;
}

interface LinkVerificationResult {
  checking: boolean;
  checkedUrl?: string;
  ok?: boolean;
  status?: number;
  message?: string;
}

export const AdminStudyLibraryCmsSection: React.FC<AdminStudyLibraryCmsSectionProps> = ({
  selectedBoardWorkspace,
  selectedClassWorkspace,
}) => {
  const [subTab, setSubTab] = useState<'cms' | 'health'>('cms');

  // CMS List & Loading State
  const [items, setItems] = useState<SpecialContentDocument<StudyLibraryDynamicItemPayload>[]>([]);
  const [loadingItems, setLoadingItems] = useState<boolean>(true);
  const [libraryVersion, setLibraryVersion] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // CMS Filter State
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');

  // Form State (Create / Edit)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formTitle, setFormTitle] = useState<string>('');
  const [formBoard, setFormBoard] = useState<EducationBoard>(
    selectedBoardWorkspace !== 'all' ? selectedBoardWorkspace : 'Maharashtra'
  );
  const [formClass, setFormClass] = useState<ClassLevel>(
    selectedClassWorkspace !== 'all' ? (selectedClassWorkspace as ClassLevel) : 'Class 5'
  );
  const availableSubjects = useMemo(
    () => getSubjectsForClass(formClass, formBoard),
    [formClass, formBoard]
  );
  const [formSubject, setFormSubject] = useState<string>(availableSubjects[0] || 'English');
  const [formCategory, setFormCategory] =
    useState<StudyLibraryDynamicItemPayload['materialCategory']>('notes');
  const [formChapterNumber, setFormChapterNumber] = useState<string>('');
  const [formDescription, setFormDescription] = useState<string>('');
  const [formKeyPoints, setFormKeyPoints] = useState<string>('');
  const [formExternalUrl, setFormExternalUrl] = useState<string>('');
  const [formPublished, setFormPublished] = useState<boolean>(true);
  const [linkCheck, setLinkCheck] = useState<LinkVerificationResult>({ checking: false });

  // System Health State
  const [healthLoading, setHealthLoading] = useState<boolean>(false);
  const [apiHealth, setApiHealth] = useState<ApiHealthPayload | null>(null);
  const [localCacheKeysCount, setLocalCacheKeysCount] = useState<number>(0);

  useEffect(() => {
    if (!availableSubjects.includes(formSubject as SubjectName)) {
      setFormSubject(availableSubjects[0] || 'English');
    }
  }, [availableSubjects, formSubject]);

  const currentAdminEmail = (auth.currentUser?.email || '').trim().toLowerCase();
  const isVerifiedAdmin =
    currentAdminEmail === 'ronakvarade2022@gmail.com' && Boolean(auth.currentUser?.emailVerified);

  // Real computed inventory of built-in zero-read Study Material Library
  const builtInInventory = useMemo(() => {
    let textbooks = 0;
    let chapters = 0;
    for (const board of ALL_BOARDS) {
      for (const cls of ALL_10_CLASSES) {
        textbooks += getOfficialTextbooksForBoardClass(board, cls).length;
        const subs = getSubjectsForClass(cls, board);
        for (const sub of subs) {
          chapters += getRichChaptersForSubject(board, cls, sub).length;
        }
      }
    }
    return {
      textbooks,
      chapters,
      qaItems: chapters * 9,
      chapterTestMcqs: chapters * 10,
      svgDiagrams: SCIENCE_DIAGRAMS_LIST.length,
    };
  }, []);

  const countLocalStudyCacheKeys = useCallback(() => {
    try {
      if (typeof localStorage === 'undefined') return 0;
      let count = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('msz_study_lib_')) count++;
      }
      return count;
    } catch {
      return 0;
    }
  }, []);

  const loadCmsData = useCallback(async () => {
    setLoadingItems(true);
    try {
      const [docs, cfgRes] = await Promise.all([
        loadPaginatedStudyLibraryItemsFromFirestore({
          includeDraftsForAdmin: true,
          forceRefresh: true,
          pageSize: 100,
        }),
        loadPlatformConfigDetailed({ forceRefresh: true }),
      ]);
      setItems(docs);
      setLibraryVersion(cfgRes.config?.studyLibraryVersion ?? 0);
      setLocalCacheKeysCount(countLocalStudyCacheKeys());
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Could not load dynamic Study Library items from Firestore. Check network or Admin session.',
      });
    } finally {
      setLoadingItems(false);
    }
  }, [countLocalStudyCacheKeys]);

  const fetchApiHealth = useCallback(async () => {
    setHealthLoading(true);
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      const data = (await res.json()) as ApiHealthPayload;
      setApiHealth(data);
    } catch (err) {
      setApiHealth({
        status: 'unreachable',
        error: err instanceof Error ? err.message : 'Unable to reach /api/health',
      });
    } finally {
      setHealthLoading(false);
      setLocalCacheKeysCount(countLocalStudyCacheKeys());
    }
  }, [countLocalStudyCacheKeys]);

  useEffect(() => {
    void loadCmsData();
  }, [loadCmsData]);

  useEffect(() => {
    if (subTab === 'health' && !apiHealth) {
      void fetchApiHealth();
    }
  }, [subTab, apiHealth, fetchApiHealth]);

  const resetForm = () => {
    setEditingId(null);
    setFormTitle('');
    setFormChapterNumber('');
    setFormDescription('');
    setFormKeyPoints('');
    setFormExternalUrl('');
    setFormPublished(true);
    setLinkCheck({ checking: false });
  };

  const handleEditItem = (docItem: SpecialContentDocument<StudyLibraryDynamicItemPayload>) => {
    const p = docItem.payload;
    setEditingId(docItem.id);
    setFormTitle(docItem.title || '');
    setFormBoard((docItem.board || p?.board || 'Maharashtra') as EducationBoard);
    setFormClass((docItem.classLevel || p?.classLevel || 'Class 5') as ClassLevel);
    setFormSubject(String(docItem.subject || p?.subject || 'English'));
    setFormCategory(
      (docItem.materialCategory || p?.materialCategory || 'notes') as StudyLibraryDynamicItemPayload['materialCategory']
    );
    setFormChapterNumber(p?.chapterNumber ? String(p.chapterNumber) : '');
    setFormDescription(p?.description || '');
    setFormKeyPoints(Array.isArray(p?.keyPoints) ? p.keyPoints.join('\n') : '');
    setFormExternalUrl(p?.externalUrl || p?.videoUrl || '');
    setFormPublished(Boolean(docItem.published));
    setLinkCheck({ checking: false });
    setStatusMessage({
      type: 'info',
      text: `Editing "${docItem.title}". Save changes to update Firestore & sync student caches.`,
    });
  };

  const handleVerifyLink = async () => {
    const url = formExternalUrl.trim();
    if (!url) {
      setLinkCheck({
        checking: false,
        ok: false,
        message: 'Enter an https:// URL first to test live reachability.',
      });
      return;
    }
    setLinkCheck({ checking: true, checkedUrl: url });
    try {
      const res = await fetch('/api/study-library/verify-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const json = (await res.json()) as {
        ok?: boolean;
        success?: boolean;
        reachable?: boolean;
        status?: number;
        error?: string;
      };
      if (res.ok && (json.ok || json.reachable)) {
        setLinkCheck({
          checking: false,
          checkedUrl: url,
          ok: true,
          status: json.status,
          message: `Verified reachable (HTTP ${json.status || 200}). Safe to publish.`,
        });
      } else {
        setLinkCheck({
          checking: false,
          checkedUrl: url,
          ok: false,
          status: json.status || res.status,
          message:
            json.error ||
            `Endpoint returned HTTP ${json.status || res.status}. Check URL or portal availability.`,
        });
      }
    } catch (err) {
      setLinkCheck({
        checking: false,
        checkedUrl: url,
        ok: false,
        message: err instanceof Error ? err.message : 'Link verification request failed.',
      });
    }
  };

  const handleSaveItem = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = formTitle.trim();
    if (!cleanTitle) {
      setStatusMessage({ type: 'error', text: 'Title is required.' });
      return;
    }

    const cleanUrl = formExternalUrl.trim();
    if (cleanUrl && !/^https?:\/\//i.test(cleanUrl)) {
      setStatusMessage({
        type: 'error',
        text: 'External URL must start with https:// or http:// (no local/javascript URLs allowed).',
      });
      return;
    }

    setSaving(true);
    setStatusMessage(null);
    try {
      const id =
        editingId ||
        `study_${formBoard.toLowerCase()}_${formClass.replace(/\s+/g, '').toLowerCase()}_${Date.now()}`;
      const keyPointsArr = formKeyPoints
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 12);

      const parsedChapter = Number.parseInt(formChapterNumber, 10);

      const payload: StudyLibraryDynamicItemPayload = {
        board: formBoard,
        classLevel: formClass,
        subject: formSubject,
        materialCategory: formCategory,
        chapterNumber: Number.isFinite(parsedChapter) && parsedChapter > 0 ? parsedChapter : undefined,
        description: formDescription.trim() || undefined,
        externalUrl: formCategory !== 'video' ? cleanUrl || undefined : undefined,
        videoUrl: formCategory === 'video' ? cleanUrl || undefined : undefined,
        keyPoints: keyPointsArr.length > 0 ? keyPointsArr : undefined,
      };

      const res = await saveStudyLibraryItemToFirestore({
        id,
        title: cleanTitle,
        published: formPublished,
        board: formBoard,
        classLevel: formClass,
        subject: formSubject,
        materialCategory: formCategory,
        payload,
      });

      if (res.success) {
        if (res.version) setLibraryVersion(res.version);
        setStatusMessage({
          type: 'success',
          text: `${editingId ? 'Updated' : 'Saved'} "${cleanTitle}" in special_content and bumped studyLibraryVersion to ${
            res.version || 'latest'
          }.`,
        });
        resetForm();
        await loadCmsData();
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Firestore write failed. Confirm you are signed in with verified Admin email ronakvarade2022@gmail.com.',
        });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublished = async (
    docItem: SpecialContentDocument<StudyLibraryDynamicItemPayload>
  ) => {
    const p = docItem.payload;
    const res = await saveStudyLibraryItemToFirestore({
      id: docItem.id,
      title: docItem.title,
      published: !docItem.published,
      board: (docItem.board || p?.board || 'Maharashtra') as EducationBoard,
      classLevel: (docItem.classLevel || p?.classLevel || 'Class 5') as ClassLevel,
      subject: docItem.subject || p?.subject || 'English',
      materialCategory: (docItem.materialCategory ||
        p?.materialCategory ||
        'notes') as StudyLibraryDynamicItemPayload['materialCategory'],
      payload: p,
      createdAt: docItem.createdAt,
    });
    if (res.success) {
      if (res.version) setLibraryVersion(res.version);
      setStatusMessage({
        type: 'success',
        text: `"${docItem.title}" is now ${!docItem.published ? 'Published' : 'Unpublished (Draft)'}.`,
      });
      await loadCmsData();
    }
  };

  const handleDeleteItem = async (docItem: SpecialContentDocument<StudyLibraryDynamicItemPayload>) => {
    const res = await deleteStudyLibraryItemFromFirestore(docItem.id);
    setPendingDeleteId(null);
    if (res.success) {
      if (res.version) setLibraryVersion(res.version);
      setStatusMessage({
        type: 'success',
        text: `Deleted "${docItem.title}" and synced studyLibraryVersion.`,
      });
      if (editingId === docItem.id) resetForm();
      await loadCmsData();
    } else {
      setStatusMessage({
        type: 'error',
        text: 'Failed to delete item. Verify Admin authentication.',
      });
    }
  };

  const handleBumpVersionOnly = async () => {
    const nextV = await bumpStudyLibraryVersionInFirestore();
    if (nextV > 0) {
      setLibraryVersion(nextV);
      setStatusMessage({
        type: 'success',
        text: `Bumped studyLibraryVersion to ${nextV}. Student devices will sync dynamic items on next library visit.`,
      });
    } else {
      setStatusMessage({
        type: 'error',
        text: 'Unable to bump version. Confirm verified Admin login.',
      });
    }
  };

  const handleClearLocalStudyCache = () => {
    try {
      const toRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith('msz_study_lib_page_')) {
          toRemove.push(k);
        }
      }
      toRemove.forEach((k) => localStorage.removeItem(k));
      setLocalCacheKeysCount(countLocalStudyCacheKeys());
      setStatusMessage({
        type: 'info',
        text: `Cleared ${toRemove.length} cached study library page key(s) on this browser (Bookmarks & local scores preserved).`,
      });
    } catch {
      // ignore storage errors
    }
  };

  const filteredItems = useMemo(() => {
    const q = searchText.trim().toLowerCase();
    return items.filter((it) => {
      const b = it.board || it.payload?.board;
      const c = it.classLevel || it.payload?.classLevel;
      const cat = it.materialCategory || it.payload?.materialCategory;
      if (selectedBoardWorkspace !== 'all' && b !== selectedBoardWorkspace) return false;
      if (selectedClassWorkspace !== 'all' && c !== selectedClassWorkspace) return false;
      if (filterCategory !== 'all' && cat !== filterCategory) return false;
      if (q) {
        const blob = `${it.title} ${b || ''} ${c || ''} ${it.subject || ''} ${
          it.payload?.description || ''
        }`.toLowerCase();
        if (!blob.includes(q)) return false;
      }
      return true;
    });
  }, [items, selectedBoardWorkspace, selectedClassWorkspace, filterCategory, searchText]);

  return (
    <div className="space-y-6">
      {/* Header & Sub-View Switcher */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-semibold">
            <span>Free Study Material Library CMS</span>
            <span aria-hidden="true">·</span>
            <span>Zero-New-Collection Architecture (`special_content`)</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">Version: {libraryVersion || 0}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
            Study Material CMS &amp; Spark Free System Health
          </h2>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl shrink-0">
          <button
            type="button"
            onClick={() => setSubTab('cms')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
              subTab === 'cms'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Study Library CMS ({items.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setSubTab('health')}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors whitespace-nowrap ${
              subTab === 'health'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-700 hover:text-slate-950'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>System Health &amp; Spark Quota</span>
          </button>
        </div>
      </div>

      {/* Inline Status Notice */}
      {statusMessage && (
        <div
          className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between gap-3 ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : statusMessage.type === 'error'
              ? 'bg-rose-50 border-rose-200 text-rose-900'
              : 'bg-sky-50 border-sky-200 text-sky-900'
          }`}
        >
          <span>{statusMessage.text}</span>
          <button
            type="button"
            onClick={() => setStatusMessage(null)}
            className="text-xs underline font-bold cursor-pointer shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {subTab === 'cms' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Create / Edit Study Material Form */}
          <form
            onSubmit={handleSaveItem}
            className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-5 space-y-4"
          >
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-indigo-600" />
                <span>{editingId ? 'Edit Dynamic Study Resource' : 'Publish Extra Study Resource'}</span>
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {!isVerifiedAdmin && (
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Firestore writes require verified Admin Firebase Auth (`ronakvarade2022@gmail.com`).
                  Current session: {currentAdminEmail || 'Not signed in via Firebase Auth'}.
                </span>
              </div>
            )}

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Resource Title (max 195 chars)
                </label>
                <input
                  type="text"
                  maxLength={195}
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g., Std 10 SSC Algebra Board Paper 2025 Solved Guide"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Education Board</label>
                  <select
                    value={formBoard}
                    onChange={(e) => setFormBoard(e.target.value as EducationBoard)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
                  >
                    {ALL_BOARDS.map((b) => (
                      <option key={b} value={b}>
                        {b} Board
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class (1–10)</label>
                  <select
                    value={formClass}
                    onChange={(e) => setFormClass(e.target.value as ClassLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
                  >
                    {ALL_10_CLASSES.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
                  >
                    {availableSubjects.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={(e) =>
                      setFormCategory(
                        e.target.value as StudyLibraryDynamicItemPayload['materialCategory']
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold text-slate-900"
                  >
                    {MATERIAL_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Chapter No. (Optional)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={40}
                    value={formChapterNumber}
                    onChange={(e) => setFormChapterNumber(e.target.value)}
                    placeholder="e.g., 4"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 tabular-nums"
                  />
                </div>

                <div className="flex items-end">
                  <label className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="rounded"
                    />
                    <span>Published Live (100% Free)</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Official External Portal / Video URL (Zero Storage Policy — No PDF Uploads)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formExternalUrl}
                    onChange={(e) => {
                      setFormExternalUrl(e.target.value);
                      setLinkCheck({ checking: false });
                    }}
                    placeholder="https://diksha.gov.in/... or https://ncert.nic.in/..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyLink}
                    disabled={linkCheck.checking}
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 whitespace-nowrap disabled:opacity-60"
                  >
                    <Link2 className="w-3.5 h-3.5" />
                    <span>{linkCheck.checking ? 'Checking...' : 'Verify Link'}</span>
                  </button>
                </div>
                {linkCheck.message && (
                  <p
                    className={`mt-1.5 text-[11px] font-semibold ${
                      linkCheck.ok ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {linkCheck.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Short Description / Instructions
                </label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Summary shown to students in the Free Study Material Library..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Key Revision Points (1 bullet per line, optional)
                </label>
                <textarea
                  rows={3}
                  value={formKeyPoints}
                  onChange={(e) => setFormKeyPoints(e.target.value)}
                  placeholder="Formula 1: ...&#10;Important exam tip: ..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-indigo-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer transition-colors disabled:opacity-60"
            >
              {saving
                ? 'Saving to Firestore & Syncing Version...'
                : editingId
                ? 'Update Study Resource'
                : 'Save & Publish Study Resource'}
            </button>
          </form>

          {/* Right Column: Published & Draft Dynamic Resources Table */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-black text-slate-900">
                  Dynamic Admin-Published Items ({filteredItems.length})
                </h3>
                <p className="text-[11px] text-slate-500">
                  Stored inside existing `special_content` collection (`contentType: study_material_item`).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => void loadCmsData()}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingItems ? 'animate-spin' : ''}`} />
                  <span>Refresh</span>
                </button>
                <button
                  type="button"
                  onClick={() => void handleBumpVersionOnly()}
                  className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-bold cursor-pointer"
                >
                  Sync Cache Version
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Filter dynamic items by title or subject..."
                className="flex-1 min-w-[180px] px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800"
              />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-slate-700"
              >
                <option value="all">All Categories</option>
                {MATERIAL_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {loadingItems ? (
              <div className="py-10 text-center text-xs text-slate-500 font-semibold">
                Loading dynamic Study Material Library items...
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="py-10 px-4 text-center rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <Globe className="w-6 h-6 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-800">
                  No dynamic Admin-published study items found for this filter.
                </p>
                <p className="text-[11px] text-slate-500 max-w-md mx-auto">
                  All {builtInInventory.textbooks} built-in textbooks and{' '}
                  {builtInInventory.chapters.toLocaleString()} syllabus chapters are already live at
                  0 Firestore reads. Use the left form whenever you want to publish extra board
                  circulars, new exam papers, or curated external video links.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredItems.map((docItem) => {
                  const p = docItem.payload;
                  const linkUrl = p?.externalUrl || p?.videoUrl;
                  return (
                    <div
                      key={docItem.id}
                      className="py-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
                          <span
                            className={
                              docItem.published ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'
                            }
                          >
                            {docItem.published ? 'Published' : 'Draft'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{docItem.board || p?.board}</span>
                          <span aria-hidden="true">·</span>
                          <span>{docItem.classLevel || p?.classLevel}</span>
                          <span aria-hidden="true">·</span>
                          <span>{docItem.subject || p?.subject}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-extrabold text-slate-900 break-words">
                          {docItem.title}
                        </p>
                        {p?.description && (
                          <p className="text-xs text-slate-600 line-clamp-2">{p.description}</p>
                        )}
                        {linkUrl && (
                          <a
                            href={linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:underline"
                          >
                            <span>Open Link</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleEditItem(docItem)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleTogglePublished(docItem)}
                          className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                        >
                          {docItem.published ? (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Unpublish</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Publish</span>
                            </>
                          )}
                        </button>
                        {pendingDeleteId === docItem.id ? (
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => void handleDeleteItem(docItem)}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-600 text-white text-[11px] font-bold cursor-pointer"
                            >
                              Confirm Delete
                            </button>
                            <button
                              type="button"
                              onClick={() => setPendingDeleteId(null)}
                              className="px-2 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-bold cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPendingDeleteId(docItem.id)}
                            className="px-2.5 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* SUB-VIEW 2: SYSTEM HEALTH, SPARK FREE QUOTA & HOSTING HYGIENE MONITOR (READ-ONLY) */
        <div className="space-y-6">
          {/* Top KPI Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Backend API &amp; Razorpay</span>
                <Activity className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-lg font-black text-slate-900 tabular-nums">
                {healthLoading
                  ? 'Checking...'
                  : apiHealth?.status === 'healthy' || apiHealth?.status === 'ok'
                  ? `Healthy (${apiHealth.razorpayMode || 'LIVE'})`
                  : apiHealth?.status || 'Unknown'}
              </p>
              <p className="text-[11px] text-slate-500">
                Read-only probe via `/api/health`
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Firebase Spark Storage</span>
                <Database className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-lg font-black text-emerald-700 tabular-nums">0 MB Used</p>
              <p className="text-[11px] text-slate-500">
                External textbook portals + 12 inline vector SVGs
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Daily Library Firestore Reads</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-lg font-black text-slate-900 tabular-nums">0 Reads / Student</p>
              <p className="text-[11px] text-slate-500">
                Version-gated (`studyLibraryVersion: {libraryVersion}`)
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                <span>Browser Study Cache Keys</span>
                <HardDrive className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-lg font-black text-slate-900 tabular-nums">
                {localCacheKeysCount} Active Key{localCacheKeysCount === 1 ? '' : 's'}
              </p>
              <p className="text-[11px] text-slate-500">
                Bookmarks, Recent History &amp; Versioned Pages
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Built-In Library Inventory Audit */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900">
                  Built-In Zero-Read Study Library Inventory
                </h3>
                <button
                  type="button"
                  onClick={() => void fetchApiHealth()}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${healthLoading ? 'animate-spin' : ''}`} />
                  <span>Re-Check Health</span>
                </button>
              </div>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    Official Textbooks (MH / CBSE / ICSE · Classes 1–10)
                  </span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {builtInInventory.textbooks.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    Syllabus Chapters (Notes, 1-Page Revision &amp; Video Guides)
                  </span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {builtInInventory.chapters.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    9-Format Solved Q&amp;A Bank Items
                  </span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {builtInInventory.qaItems.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    Interactive Chapter Practice Test MCQs (10 / Chapter)
                  </span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {builtInInventory.chapterTestMcqs.toLocaleString()}
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    Inline Vector SVG Science Diagrams (0 MB Disk)
                  </span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {builtInInventory.svgDiagrams} Diagrams
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between">
                  <span className="text-slate-600 font-medium">
                    Dynamic Admin-Published Items (`special_content`)
                  </span>
                  <span className="font-mono font-bold text-slate-900 tabular-nums">
                    {items.length}
                  </span>
                </div>
              </div>
            </div>

            {/* Firebase Spark & Hosting.com Guardrails */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                <h3 className="text-sm font-black text-slate-900">
                  Firebase Spark Free &amp; Hosting.com Guardrails
                </h3>
                <button
                  type="button"
                  onClick={handleClearLocalStudyCache}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer"
                >
                  Clear Local Study Cache
                </button>
              </div>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-900">Active Firebase Binding (Spark Free Plan)</p>
                  <p className="font-mono text-[11px] text-slate-600 break-all">
                    Project: {firebaseConfig.projectId}
                  </p>
                  <p className="font-mono text-[11px] text-slate-600 break-all">
                    Database: {firebaseConfig.firestoreDatabaseId}
                  </p>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Blaze Upgrade / ₹0 Cost:</strong> No Cloud Functions, no paid
                      external APIs, and 0 MB uploaded to Firebase Storage.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero New Firestore Collections:</strong> Reuses existing{' '}
                      <code>special_content</code> and <code>platform_config/main</code>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Hosting.com Mini Shared Hosting Safe:</strong> All textbooks and video
                      lessons link to official NCERT / eBalbharati / DIKSHA / CISCE portals; zero
                      automatic deletion of existing website assets (`public/assets/aistudio/*`
                      preserved intact).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Worksheet Protection Intact:</strong> Study Material A4 PDF export
                      runs inside an isolated iframe; paid Worksheets remain anti-print protected.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
