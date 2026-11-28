import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PARENT_LEARNING_MATERIALS, type ParentingGuideItem } from '../../data/parentZone/parentLearningMaterials';
import { saveParentMessageToFirestore } from '../../services/portalFirestoreService';
import { DailyThoughtAndDictionaryWidget } from '../DailyThoughtAndDictionaryWidget';
import { UniversalPrintPreviewModal } from '../productivity/UniversalPrintPreviewModal';
import { downloadUniversalPdf, type UniversalPdfDocument } from '../../utils/universalPdfPrintEngine';
import type { StudentProfile } from '../../types';
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Flame,
  HeartHandshake,
  Link2,
  Lock,
  Mail,
  MessageSquare,
  Printer,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  X,
} from 'lucide-react';

interface ParentLinkStorageRecord {
  parentUserId: string;
  parentName: string;
  parentEmail: string;
  linkedStudentIds: string[];
  updatedAt: string;
}

interface ParentTeacherNote {
  id: string;
  parentUserId: string;
  studentId: string;
  studentName: string;
  authorLabel: string;
  message: string;
  createdAt: string;
}

const PARENT_LINKS_KEY = 'msz_parent_links_v1';
const PARENT_NOTES_KEY = 'msz_parent_teacher_notes_v1';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export interface ParentZoneViewProps {
  onNavigateTab: (tab: string) => void;
  onOpenAuth?: (tab?: 'login' | 'parent' | 'register', registerRole?: 'student' | 'parent') => void;
  onBackHome: () => void;
}

export const ParentZoneView: React.FC<ParentZoneViewProps> = ({
  onNavigateTab,
  onOpenAuth,
  onBackHome,
}) => {
  const {
    activeRole,
    currentUser,
    currentStudent,
    studentsList,
    linkParentChildVerified,
  } = useApp();

  const isParentPortalAuthorized =
    activeRole === 'parent' ||
    activeRole === 'admin' ||
    Boolean(currentStudent && currentStudent.accountRole !== 'teacher');

  const effectiveParentId = currentUser?.uid || currentStudent?.id || 'guest_parent';
  const effectiveParentEmail = (currentUser?.email || currentStudent?.parentEmail || currentStudent?.email || '').toLowerCase();
  const effectiveParentName = currentUser?.displayName || currentStudent?.parentName || 'Parent / Guardian';

  const [parentTab, setParentTab] = useState<'dashboard' | 'materials' | 'linking' | 'communication'>(() =>
    isParentPortalAuthorized ? 'dashboard' : 'materials'
  );

  const [allParentLinks, setAllParentLinks] = useState<Record<string, ParentLinkStorageRecord>>(() =>
    readJson<Record<string, ParentLinkStorageRecord>>(PARENT_LINKS_KEY, {})
  );
  const [notes, setNotes] = useState<ParentTeacherNote[]>(() =>
    readJson<ParentTeacherNote[]>(PARENT_NOTES_KEY, [])
  );

  // Secure Child Linking Form State
  const [linkQueryEmail, setLinkQueryEmail] = useState<string>('');
  const [linkVerifyMobile, setLinkVerifyMobile] = useState<string>('');
  const [linkNotice, setLinkNotice] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  // Materials filter
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [selectedGuide, setSelectedGuide] = useState<ParentingGuideItem>(PARENT_LEARNING_MATERIALS[0]);
  const [parentSearchQuery, setParentSearchQuery] = useState<string>('');
  const [parentSearchOpen, setParentSearchOpen] = useState<boolean>(false);

  // Parent-Teacher message composer
  const [noteInput, setNoteInput] = useState<string>('');
  const [printPreviewDoc, setPrintPreviewDoc] = useState<UniversalPdfDocument | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(PARENT_LINKS_KEY, JSON.stringify(allParentLinks));
    } catch {}
  }, [allParentLinks]);

  useEffect(() => {
    try {
      localStorage.setItem(PARENT_NOTES_KEY, JSON.stringify(notes));
    } catch {}
  }, [notes]);

  // Authorized linked children ONLY (Explicitly linked + verified match to existing student profile whose parentEmail/guardian matches)
  const linkedChildren = useMemo<StudentProfile[]>(() => {
    const savedRecord = allParentLinks[effectiveParentId];
    const savedIds = new Set(savedRecord?.linkedStudentIds || []);

    return studentsList.filter((s) => {
      if (s.accountRole === 'teacher') return false;
      if (savedIds.has(s.id)) return true;
      // Auto-include the logged-in parentEmail-verified child if parentEmail strictly matches authenticated email
      if (effectiveParentEmail && s.parentEmail && s.parentEmail.toLowerCase() === effectiveParentEmail) {
        return true;
      }
      // Or if viewing while signed in as that student's guardian session
      if (currentStudent && s.id === currentStudent.id && currentStudent.accountRole !== 'teacher') {
        return true;
      }
      return false;
    });
  }, [allParentLinks, effectiveParentId, effectiveParentEmail, studentsList, currentStudent]);

  const [selectedChildId, setSelectedChildId] = useState<string>('');

  useEffect(() => {
    if (linkedChildren.length > 0 && !linkedChildren.some((c) => c.id === selectedChildId)) {
      setSelectedChildId(linkedChildren[0].id);
    }
  }, [linkedChildren, selectedChildId]);

  const activeChild = useMemo(
    () => linkedChildren.find((c) => c.id === selectedChildId) || linkedChildren[0] || null,
    [linkedChildren, selectedChildId]
  );

  // Secure parent-child verification link (no duplicate student records created)
  const handleLinkChild = async (e: React.FormEvent) => {
    e.preventDefault();
    const qEmailOrId = linkQueryEmail.trim().toLowerCase();
    const qPhone = linkVerifyMobile.replace(/\D/g, '').slice(-10);

    if (!qEmailOrId || qPhone.length !== 10) {
      setLinkNotice({
        type: 'err',
        text: "Enter the student's registered email/ID/link-code and exact 10-digit registered mobile number for security.",
      });
      return;
    }

    const res = await linkParentChildVerified(qEmailOrId, qPhone);
    if (!res.success || !res.linkedStudent) {
      setLinkNotice({
        type: 'err',
        text:
          res.message ||
          'No matching Student account found with that Email/ID and registered mobile number. Zero unverified links permitted.',
      });
      return;
    }

    const matched = res.linkedStudent;
    setAllParentLinks((prev) => {
      const existing = prev[effectiveParentId] || {
        parentUserId: effectiveParentId,
        parentName: effectiveParentName,
        parentEmail: effectiveParentEmail,
        linkedStudentIds: [],
        updatedAt: new Date().toISOString(),
      };
      if (existing.linkedStudentIds.includes(matched.id)) {
        return prev;
      }
      return {
        ...prev,
        [effectiveParentId]: {
          ...existing,
          linkedStudentIds: [...existing.linkedStudentIds, matched.id],
          updatedAt: new Date().toISOString(),
        },
      };
    });

    setSelectedChildId(matched.id);
    setLinkQueryEmail('');
    setLinkVerifyMobile('');
    setLinkNotice({
      type: 'ok',
      text: res.message,
    });
    setParentTab('dashboard');
  };

  const handleSendNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeChild || !noteInput.trim()) return;
    const messageBody = noteInput.trim();
    const noteId = `ptn_${Date.now().toString(36)}`;
    const sentAtIso = new Date().toISOString();
    const newNote: ParentTeacherNote = {
      id: noteId,
      parentUserId: effectiveParentId,
      studentId: activeChild.id,
      studentName: activeChild.name,
      authorLabel: `${effectiveParentName} (Parent)`,
      message: messageBody,
      createdAt: new Date().toLocaleString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setNoteInput('');

    if (currentUser?.uid) {
      await saveParentMessageToFirestore(currentUser.uid, {
        id: noteId,
        studentId: activeChild.id,
        studentName: activeChild.name,
        recipient: 'Class Teacher',
        subject: `Progress Note (${activeChild.classLevel})`,
        body: messageBody,
        sentAt: sentAtIso,
        status: 'SENT',
      });
    }
  };

  const filteredGuides = useMemo(() => {
    if (stageFilter === 'All') return PARENT_LEARNING_MATERIALS;
    return PARENT_LEARNING_MATERIALS.filter((g) => g.stage === stageFilter);
  }, [stageFilter]);

  const childStats = useMemo(() => {
    if (!activeChild) return null;
    const attendance = activeChild.attendanceRecords || [];
    const presentCount = attendance.filter((a) => a.status === 'PRESENT').length;
    const attendancePct = attendance.length > 0 ? Math.round((presentCount / attendance.length) * 100) : 100;
    const assignments = activeChild.assignments || [];
    const gradedAssignments = assignments.filter((a) => a.status === 'graded' || a.status === 'EVALUATED');
    const subjectEntries = Object.entries(activeChild.subjectProgress || {});
    return {
      attendance,
      attendancePct,
      assignments,
      gradedAssignments,
      subjectEntries,
      worksheetsCount: activeChild.completedWorksheetIds?.length || 0,
      quizAttemptsCount: activeChild.worksheetAttempts?.length || 0,
    };
  }, [activeChild]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Parent Zone Banner */}
      <div className="bg-gradient-to-br from-rose-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-rose-700/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Child Linking Only</span>
            </span>
            {!isParentPortalAuthorized && onOpenAuth && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onOpenAuth('parent')}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                >
                  Parent Login
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('register', 'parent')}
                  className="px-3.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-black cursor-pointer border border-white/20"
                >
                  Register Parent
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-200 text-xs font-black uppercase tracking-wider">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Parent &amp; Family Learning Zone</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Parent Progress Center &amp; Home-Learning Library
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Securely link one or multiple children to view attendance, homework feedback, subject mastery, and official parenting &amp; study-routine guides.
            </p>
          </div>

          {linkedChildren.length > 0 && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-2.5 min-w-[220px]">
              <label className="block text-[10px] font-black uppercase tracking-wider text-amber-300 mb-1">
                Active Linked Child ({linkedChildren.length})
              </label>
              <select
                value={activeChild?.id || ''}
                onChange={(e) => setSelectedChildId(e.target.value)}
                className="w-full bg-slate-900 text-white text-xs font-bold rounded-xl px-2.5 py-1.5 border border-white/20 cursor-pointer"
              >
                {linkedChildren.map((child) => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.board || 'MH'} · {child.classLevel})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Parent Portal Scoped Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-full">
              Parent Portal Content Search
            </span>
            <h2 className="text-sm sm:text-base font-display font-black text-slate-900 mt-1">
              Search Parenting &amp; Study Guides, Linked Child Attendance, Homework, or Teacher Notes
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { label: 'Study Routine', query: 'Routine' },
              { label: 'Exam Stress', query: 'Exam' },
              { label: 'Screen Time', query: 'Screen' },
              { label: 'Attendance', query: 'Attendance' },
              { label: 'Homework', query: 'Homework' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => {
                  setParentSearchQuery(chip.query);
                  setParentSearchOpen(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 text-[11px] font-bold text-slate-700 hover:text-rose-800 border border-slate-200 cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setParentSearchOpen(true);
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={parentSearchQuery}
              onChange={(e) => {
                setParentSearchQuery(e.target.value);
                setParentSearchOpen(true);
              }}
              onFocus={() => setParentSearchOpen(true)}
              placeholder="Search Parenting Guides, Child Progress, Attendance, Homework, or Teacher Messages..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:bg-white"
            />
            {parentSearchQuery && (
              <button
                type="button"
                onClick={() => {
                  setParentSearchQuery('');
                  setParentSearchOpen(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0"
          >
            <Search className="w-4 h-4 text-amber-300" />
            <span>Search Parent Portal</span>
          </button>
        </form>

        {parentSearchOpen && parentSearchQuery.trim().length > 0 && (() => {
          const q = parentSearchQuery.trim().toLowerCase();
          const matchedGuides = PARENT_LEARNING_MATERIALS.filter(
            (g) =>
              g.title.toLowerCase().includes(q) ||
              g.category.toLowerCase().includes(q) ||
              g.stage.toLowerCase().includes(q) ||
              g.summary.toLowerCase().includes(q) ||
              g.keyPrinciples.some((k) => k.toLowerCase().includes(q))
          );

          const matchedChildren = linkedChildren.filter(
            (c) =>
              c.name.toLowerCase().includes(q) ||
              c.classLevel.toLowerCase().includes(q) ||
              (c.board && c.board.toLowerCase().includes(q)) ||
              q.includes('attendance') ||
              q.includes('homework') ||
              q.includes('progress')
          );

          const matchedNotes = notes.filter(
            (n) =>
              n.message.toLowerCase().includes(q) ||
              n.studentName.toLowerCase().includes(q) ||
              n.authorLabel.toLowerCase().includes(q)
          );

          const portalSections = [
            {
              title: 'Child Progress, Attendance & Homework Dashboard',
              badge: 'Child Report',
              desc: 'View attendance %, subject mastery, completed worksheets & teacher remarks',
              keywords: 'child progress dashboard attendance homework mastery score report',
              action: () => setParentTab('dashboard'),
            },
            {
              title: 'Parenting & Home-Study Habit Guides',
              badge: 'Guides',
              desc: 'Research-backed daily routine, exam confidence & digital hygiene guides',
              keywords: 'parenting guide routine exam stress screen time memory reading',
              action: () => setParentTab('materials'),
            },
            {
              title: 'Link Child Account (Email + Mobile Verification)',
              badge: 'Child Linking',
              desc: 'Securely link one or more student profiles to your parent account',
              keywords: 'link child account student verification email mobile',
              action: () => setParentTab('linking'),
            },
            {
              title: 'Parent–Teacher Notes & Observation Messages',
              badge: 'Messages',
              desc: 'Send progress observations and communicate with your child’s class teacher',
              keywords: 'teacher notes message communication parent feedback',
              action: () => setParentTab('communication'),
            },
            {
              title: 'Trilingual Dictionary (English • मराठी • हिन्दी)',
              badge: 'Dictionary',
              desc: 'Help your child learn Classes 1–10 vocabulary in English, Marathi & Hindi',
              keywords: 'dictionary vocabulary word meaning english marathi hindi synonym antonym',
              action: () => onNavigateTab('trilingual-dictionary'),
            },
            {
              title: 'Thought of the Day (1,085+ Trilingual Suvichar)',
              badge: 'Daily Thought',
              desc: 'Daily moral, educational & motivational thoughts in English, Marathi & Hindi',
              keywords: 'thought of the day suvichar quotes motivational educational moral',
              action: () => onNavigateTab('thought-of-the-day'),
            },
          ].filter(
            (s) =>
              s.title.toLowerCase().includes(q) ||
              s.desc.toLowerCase().includes(q) ||
              s.keywords.includes(q)
          );

          const totalMatches =
            matchedGuides.length +
            matchedChildren.length +
            matchedNotes.length +
            portalSections.length;

          return (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>
                  Found {totalMatches} matching Parent Portal item{totalMatches === 1 ? '' : 's'} for &ldquo;{parentSearchQuery}&rdquo;
                </span>
                <button
                  type="button"
                  onClick={() => setParentSearchOpen(false)}
                  className="text-slate-500 hover:text-slate-900 font-black cursor-pointer"
                >
                  Close
                </button>
              </div>

              {totalMatches === 0 ? (
                <div className="text-xs text-slate-600 py-3 text-center">
                  No matching Parent Portal items found. Try searching &ldquo;Routine&rdquo;, &ldquo;Attendance&rdquo;, &ldquo;Homework&rdquo;, or &ldquo;Exam&rdquo;.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {portalSections.map((sec) => (
                    <button
                      key={sec.title}
                      type="button"
                      onClick={() => {
                        sec.action();
                        setParentSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-rose-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-rose-100 text-rose-900">
                          {sec.badge}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{sec.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{sec.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-rose-700 shrink-0" />
                    </button>
                  ))}

                  {matchedGuides.map((guide) => (
                    <button
                      key={guide.id}
                      type="button"
                      onClick={() => {
                        setSelectedGuide(guide);
                        setStageFilter('All');
                        setParentTab('materials');
                        setParentSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          {guide.stage} · {guide.category}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{guide.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{guide.summary}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
                    </button>
                  ))}

                  {matchedChildren.map((child) => (
                    <button
                      key={child.id}
                      type="button"
                      onClick={() => {
                        setSelectedChildId(child.id);
                        setParentTab('dashboard');
                        setParentSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900">
                          Linked Child · {child.classLevel}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{child.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {child.board || 'Maharashtra'} · View Attendance &amp; Homework
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-700 shrink-0" />
                    </button>
                  ))}

                  {matchedNotes.map((note) => (
                    <button
                      key={note.id}
                      type="button"
                      onClick={() => {
                        setParentTab('communication');
                        setParentSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-900">
                          Message · {note.studentName}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{note.message}</div>
                        <div className="text-[11px] text-slate-500 truncate">{note.authorLabel}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-indigo-700 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2.5">
        {[
          { id: 'dashboard' as const, label: 'Child Progress Dashboard', icon: Users },
          { id: 'materials' as const, label: `Parenting & Learning Guides (${PARENT_LEARNING_MATERIALS.length})`, icon: BookOpen },
          { id: 'linking' as const, label: `Link Child Account (${linkedChildren.length})`, icon: Link2 },
          { id: 'communication' as const, label: 'Teacher Notes & Messages', icon: MessageSquare },
        ].map((t) => {
          const Icon = t.icon;
          const active = parentTab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setParentTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer flex items-center gap-1.5 transition-all ${
                active
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {parentTab !== 'dashboard' && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setParentTab('dashboard')}
              className="hover:text-slate-900 underline cursor-pointer"
            >
              Parent Zone Dashboard
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-black text-slate-900">
              {parentTab === 'materials'
                ? 'Parenting & Learning Guides'
                : parentTab === 'linking'
                ? 'Link Child Account'
                : 'Teacher Notes & Messages'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setParentTab('dashboard')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Child Dashboard</span>
          </button>
        </div>
      )}

      {linkNotice && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-2 ${
            linkNotice.type === 'ok'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-rose-50 border-rose-300 text-rose-950'
          }`}
        >
          <span>{linkNotice.text}</span>
          <button type="button" onClick={() => setLinkNotice(null)} className="underline cursor-pointer">
            Close
          </button>
        </div>
      )}

      {/* AUTH GATE FOR PROTECTED PARENT TABS (Parenting Guides remain public) */}
      {parentTab !== 'materials' && !isParentPortalAuthorized ? (
        <div className="bg-white rounded-3xl p-8 border border-rose-200 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-900">
            Parent Portal Authentication Required
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Sign in or register as a Parent to link your child’s progress, attendance, homework feedback, and teacher notes. Parenting Guides are freely readable anytime.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {onOpenAuth && (
              <>
                <button
                  type="button"
                  onClick={() => onOpenAuth('parent')}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black cursor-pointer"
                >
                  Parent Login
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('register', 'parent')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer"
                >
                  Create Parent Account
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setParentTab('materials')}
              className="px-5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-black cursor-pointer"
            >
              Browse Free Parenting Guides
            </button>
          </div>
        </div>
      ) : null}

      {/* TAB 1: CHILD DASHBOARD (Authorized Linked Child Only) */}
      {parentTab === 'dashboard' && isParentPortalAuthorized && (
        <div className="space-y-5">
          {!activeChild ? (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-slate-900">No Child Account Linked Yet</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                For student privacy protection, parents only see records of explicitly verified linked children. Link your child using their registered email/ID and mobile number without creating duplicate accounts.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setParentTab('linking')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-black cursor-pointer"
                >
                  + Link Your Child Account
                </button>
                <button
                  type="button"
                  onClick={() => setParentTab('materials')}
                  className="px-5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-black cursor-pointer"
                >
                  Browse Parenting Guides Now
                </button>
              </div>
            </div>
          ) : (
            childStats && (
              <div className="space-y-5">
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-black text-slate-900">
                      Student Progress Report — {activeChild.name}
                    </h2>
                    <p className="text-[11px] text-slate-500">
                      {activeChild.board || 'Maharashtra'} · {activeChild.classLevel} · Verified Parent View
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const doc: UniversalPdfDocument = {
                          title: `Student Progress Report — ${activeChild.name}`,
                          subtitle: `Parent Portal Summary · ${activeChild.board || 'Maharashtra'} · ${activeChild.classLevel}`,
                          headerTag: 'PARENT REPORT',
                          metaItems: [
                            { label: 'Student Name', value: activeChild.name },
                            { label: 'Parent / Guardian', value: effectiveParentName },
                            { label: 'Board & Class', value: `${activeChild.board || 'Maharashtra'} · ${activeChild.classLevel}` },
                            { label: 'Generated On', value: new Date().toLocaleDateString('en-IN') },
                          ],
                          summaryCards: [
                            { label: 'Attendance', value: `${childStats.attendancePct}%` },
                            { label: 'Points & Streak', value: `${activeChild.points || 0} XP (${activeChild.streakDays || 0}d)` },
                            { label: 'Worksheets Done', value: `${childStats.worksheetsCount}` },
                          ],
                          tables: [
                            {
                              caption: 'Subject Quiz & Syllabus Mastery',
                              headers: ['Board / Class / Subject', 'Completed Levels', 'Unlocked Level'],
                              rows:
                                childStats.subjectEntries.length > 0
                                  ? childStats.subjectEntries.map(([k, p]) => [
                                      k.replace(/__/g, ' · '),
                                      `${p.completedLevels?.length || 0} / 4`,
                                      `Level ${p.maxUnlockedLevel}`,
                                    ])
                                  : [['No quiz levels completed yet', '0 / 4', 'Level 1']],
                            },
                            ...(childStats.assignments.length > 0
                              ? [
                                  {
                                    caption: 'Homework & Teacher Remarks',
                                    headers: ['Title', 'Subject', 'Due Date', 'Status / Score', 'Teacher Feedback'],
                                    rows: childStats.assignments.map((a) => [
                                      a.title,
                                      a.subject,
                                      a.dueDate,
                                      typeof a.score === 'number' ? `${a.status} (${a.score}/${a.maxScore})` : a.status,
                                      a.teacherFeedback || '—',
                                    ]),
                                  },
                                ]
                              : []),
                          ],
                          filename: `parent_progress_report_${activeChild.name.replace(/\s+/g, '_')}`,
                        };
                        setPrintPreviewDoc(doc);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Preview &amp; Print / PDF Report (A4)</span>
                    </button>
                  </div>
                </div>

                {/* KPI Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Learning Streak &amp; XP</span>
                    <div className="text-xl font-black text-slate-900 flex items-center gap-1.5">
                      <Flame className="w-5 h-5 text-orange-500" />
                      <span>{activeChild.streakDays || 0} Days · {activeChild.points || 0} XP</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Worksheets Solved</span>
                    <div className="text-xl font-black text-indigo-700">{childStats.worksheetsCount} Completed</div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Assignments Status</span>
                    <div className="text-xl font-black text-teal-700">
                      {childStats.gradedAssignments.length}/{childStats.assignments.length} Graded
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
                    <span className="text-[11px] font-bold text-slate-500 uppercase">Attendance</span>
                    <div className="text-xl font-black text-emerald-700">{childStats.attendancePct}%</div>
                  </div>
                </div>

                {/* Homework + Subject Mastery */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <ClipboardList className="w-4 h-4 text-teal-600" />
                      <span>Homework &amp; Teacher Feedback</span>
                    </h2>
                    {childStats.assignments.length === 0 ? (
                      <p className="text-xs text-slate-500">No homework items assigned yet.</p>
                    ) : (
                      <div className="space-y-2.5 max-h-72 overflow-y-auto">
                        {childStats.assignments.map((a) => (
                          <div key={a.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-black text-slate-900">{a.title}</span>
                              <span className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-black uppercase">
                                {a.status}
                              </span>
                            </div>
                            <div className="text-slate-600">
                              {a.subject} · Due {a.dueDate}
                              {typeof a.score === 'number' ? ` · Score: ${a.score}/${a.maxScore}` : ''}
                            </div>
                            {a.teacherFeedback && (
                              <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 font-medium">
                                Teacher Note: {a.teacherFeedback}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                    <h2 className="text-sm font-black text-slate-900 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-500" />
                      <span>Subject Quiz &amp; Syllabus Progress</span>
                    </h2>
                    {childStats.subjectEntries.length === 0 ? (
                      <div className="text-xs text-slate-500 space-y-2">
                        <p>No subject quiz levels recorded yet for {activeChild.name}.</p>
                        <button
                          type="button"
                          onClick={() => onNavigateTab('study-materials')}
                          className="px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
                        >
                          Explore {activeChild.classLevel} Study Materials
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {childStats.subjectEntries.map(([subjKey, prog]) => (
                          <div key={subjKey} className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-200 text-xs flex items-center justify-between gap-2">
                            <div>
                              <div className="font-black text-slate-900">{subjKey.replace(/__/g, ' · ')}</div>
                              <div className="text-slate-600">
                                Completed Levels: {prog.completedLevels?.length || 0} / 4
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full bg-white border border-indigo-200 text-indigo-900 font-black text-[11px]">
                              Level {prog.maxUnlockedLevel}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* TAB 2: PARENTING & HOME-LEARNING MATERIALS */}
      {parentTab === 'materials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
              <label className="block text-[11px] font-black uppercase text-slate-500">
                Filter by Student Age / Stage
              </label>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50 cursor-pointer"
              >
                <option value="All">All Stages (Classes 1–10)</option>
                <option value="All Ages (Classes 1–10)">All Ages Essentials</option>
                <option value="Early Primary (Classes 1–4)">Early Primary (Classes 1–4)</option>
                <option value="Middle Years (Classes 5–7)">Middle Years (Classes 5–7)</option>
                <option value="Board Prep (Classes 8–10)">Board Prep (Classes 8–10)</option>
              </select>

              <div className="space-y-2 pt-1">
                {filteredGuides.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGuide(g)}
                    className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                      selectedGuide.id === g.id
                        ? 'bg-rose-50 border-rose-400 shadow-2xs'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <span className="text-[10px] font-black text-rose-800 uppercase">{g.category}</span>
                    <div className="text-xs font-black text-slate-900">{g.title}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{g.stage}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-rose-700">
                  {selectedGuide.stage} · {selectedGuide.category}
                </span>
                <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
                  {selectedGuide.title}
                </h2>
                <p className="text-xs text-slate-600">{selectedGuide.summary}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setPrintPreviewDoc({
                    title: selectedGuide.title,
                    subtitle: `${selectedGuide.stage} · ${selectedGuide.category}`,
                    headerTag: 'PARENT GUIDE',
                    sections: [
                      { heading: 'Overview', body: selectedGuide.summary },
                      { heading: 'Research-Backed Principles', bullets: selectedGuide.keyPrinciples },
                      { heading: 'Parent Weekly Checklist', bullets: selectedGuide.actionableChecklist },
                      {
                        heading: `Home Activity: ${selectedGuide.weeklyHomeActivity.activityName} (${selectedGuide.weeklyHomeActivity.durationMinutes} Mins)`,
                        body: `Materials: ${selectedGuide.weeklyHomeActivity.materials}`,
                        bullets: selectedGuide.weeklyHomeActivity.steps.map((s, idx) => `${idx + 1}. ${s}`),
                      },
                    ],
                    filename: `parenting_guide_${selectedGuide.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
                  })
                }
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Preview &amp; Print / PDF (A4)</span>
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-black uppercase text-slate-700">Research-Backed Principles</h3>
              <ul className="space-y-2">
                {selectedGuide.keyPrinciples.map((p, i) => (
                  <li key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-medium">
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <h3 className="text-xs font-black uppercase text-emerald-950">Parent Weekly Checklist</h3>
              <ul className="space-y-1.5 text-xs text-emerald-900 font-bold">
                {selectedGuide.actionableChecklist.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-black text-amber-950">
                  Home Activity: {selectedGuide.weeklyHomeActivity.activityName}
                </h3>
                <span className="text-[11px] font-bold text-amber-800">
                  {selectedGuide.weeklyHomeActivity.durationMinutes} Mins
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-700">
                Materials: {selectedGuide.weeklyHomeActivity.materials}
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-800">
                {selectedGuide.weeklyHomeActivity.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SECURE MULTI-CHILD LINKING */}
      {parentTab === 'linking' && isParentPortalAuthorized && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <form
            onSubmit={handleLinkChild}
            className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs"
          >
            <h2 className="text-base font-black text-slate-900">
              Secure Parent-Child Linking (Zero Duplicate Student Records)
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Verify an existing child account using their registered Student Email (or Student UID) plus registered Mobile Number. Linking attaches your Parent view without creating duplicate student accounts or touching existing progress.
            </p>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Student Email / Parent Email / Student ID *</label>
              <input
                type="text"
                required
                value={linkQueryEmail}
                onChange={(e) => setLinkQueryEmail(e.target.value)}
                placeholder="e.g. aarav@example.com or stu-..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Registered Mobile Number Verification *</label>
              <input
                type="tel"
                required
                value={linkVerifyMobile}
                onChange={(e) => setLinkVerifyMobile(e.target.value)}
                placeholder="10-digit registered mobile"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black cursor-pointer"
            >
              Verify &amp; Link Child Account
            </button>
          </form>

          <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-base font-black text-slate-900">
              Linked Children ({linkedChildren.length})
            </h2>
            {linkedChildren.length === 0 ? (
              <p className="text-xs text-slate-500">No linked student accounts yet.</p>
            ) : (
              <div className="space-y-2.5">
                {linkedChildren.map((child) => (
                  <div key={child.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-black text-slate-900">{child.name}</div>
                      <div className="text-slate-600">
                        {child.board || 'Maharashtra'} · {child.classLevel} · UID: {child.id}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedChildId(child.id);
                        setParentTab('dashboard');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                    >
                      Open Progress
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PARENT-TEACHER COMMUNICATION LOG */}
      {parentTab === 'communication' && isParentPortalAuthorized && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-base font-black text-slate-900">
            Parent–Teacher Communication &amp; Progress Notes
          </h2>
          {!activeChild ? (
            <p className="text-xs text-slate-500">Please link a child account first to send notes regarding their classroom work.</p>
          ) : (
            <>
              <form onSubmit={handleSendNote} className="flex flex-col sm:flex-row gap-2 text-xs">
                <input
                  type="text"
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  placeholder={`Write a message or observation for ${activeChild.name}'s teacher...`}
                  className="flex-1 px-3 py-2.5 rounded-xl border border-slate-200"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Note</span>
                </button>
              </form>

              <div className="space-y-2.5">
                {notes.filter((n) => n.studentId === activeChild.id).length === 0 ? (
                  <p className="text-xs text-slate-500">No notes logged for {activeChild.name} yet.</p>
                ) : (
                  notes
                    .filter((n) => n.studentId === activeChild.id)
                    .map((n) => (
                      <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-500">
                          <span className="text-slate-900 font-black">{n.authorLabel}</span>
                          <span>{n.createdAt}</span>
                        </div>
                        <p className="text-slate-800">{n.message}</p>
                      </div>
                    ))
                )}
              </div>
            </>
          )}
        </div>
      )}
      {printPreviewDoc && (
        <UniversalPrintPreviewModal
          document={printPreviewDoc}
          onClose={() => setPrintPreviewDoc(null)}
        />
      )}
    </div>
  );
};
