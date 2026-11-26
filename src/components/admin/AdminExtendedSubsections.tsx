import React, { useEffect, useMemo, useState } from 'react';
import {
  Bell,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Crown,
  Database,
  FileText,
  GraduationCap,
  HeartHandshake,
  Layers,
  Library,
  PlayCircle,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react';
import { useApp, type SecurityAuditReport } from '../../context/AppContext';
import type { ClassLevel, EducationBoard, ParentProfile, SubjectName } from '../../types';
import { ALL_10_CLASSES, getSubjectsForClass } from '../../data/classCurriculumConfig';
import { getOfficialTextbooksForBoardClass } from '../../data/studyLibrary/textbookLibraryData';
import { getRichChaptersForSubject } from '../../data/worksheets/builders/chapterCatalog';
import { getStudyMaterialsForSubject } from '../../data/notes/studyMaterialsData';
import { getExamPapersForSubject } from '../../data/studyLibrary/examPapersData';
import { getVideoLessonsForSubject } from '../../data/studyLibrary/videoLessonsData';
import { ALL_130_TEACHER_TOOLS, TEACHER_LEARNING_MATERIALS } from '../../data/teacherTools/teacherToolsCatalog';
import { listCentralSyllabusEntries } from '../../services/centralSyllabusService';
import { fetchBoundedParentsForAdmin } from '../../services/adminFirestoreService';
import { loadExternalSyllabusManifest } from '../../services/studyContentDeliveryService';
import { ALL_BOARDS, getBoardShortLabel } from '../../utils/subscriptionAccess';
import type { AdminJumpTarget, AdminSubsectionId } from './adminCatalogConfig';

interface AdminExtendedSubsectionsProps {
  subsectionId: AdminSubsectionId;
  selectedBoardWorkspace: 'all' | EducationBoard;
  selectedClassWorkspace: string;
  onJumpToSection: (target: AdminJumpTarget) => void;
}

const DIVISIONS = ['Div A', 'Div B', 'Div C', 'Div D'];

export const AdminExtendedSubsections: React.FC<AdminExtendedSubsectionsProps> = ({
  subsectionId,
  selectedBoardWorkspace,
  selectedClassWorkspace,
  onJumpToSection,
}) => {
  const {
    studentsList,
    parentsList,
    transactions,
    notifications,
    announcements,
    learningPrograms,
    firebaseConnectionStatus,
    firebaseConnectionError,
    platformConfigLoaded,
    retryFirebaseConnection,
    runSecurityAuditTest,
    updateStudentAttendance,
    addStudentAssignment,
    updateStudentAssignment,
    linkParentToStudent,
  } = useApp();

  // Shared drilldown selectors for Academic / Papers / Attendance / Assignments
  const [drillBoard, setDrillBoard] = useState<EducationBoard>(
    selectedBoardWorkspace !== 'all' ? selectedBoardWorkspace : 'Maharashtra'
  );
  const [drillClass, setDrillClass] = useState<ClassLevel>(
    selectedClassWorkspace !== 'all' ? (selectedClassWorkspace as ClassLevel) : 'Class 5'
  );
  const subjectsForDrill = useMemo(
    () => getSubjectsForClass(drillClass, drillBoard),
    [drillClass, drillBoard]
  );
  const [drillSubject, setDrillSubject] = useState<SubjectName>(
    subjectsForDrill[0] || 'Mathematics'
  );

  useEffect(() => {
    if (selectedBoardWorkspace !== 'all') setDrillBoard(selectedBoardWorkspace);
  }, [selectedBoardWorkspace]);

  useEffect(() => {
    if (selectedClassWorkspace !== 'all') setDrillClass(selectedClassWorkspace as ClassLevel);
  }, [selectedClassWorkspace]);

  useEffect(() => {
    if (!subjectsForDrill.includes(drillSubject)) {
      setDrillSubject(subjectsForDrill[0] || 'Mathematics');
    }
  }, [subjectsForDrill, drillSubject]);

  // 1. Teachers Directory state
  const [teacherSearch, setTeacherSearch] = useState<string>('');
  const teacherAccounts = useMemo(() => {
    const q = teacherSearch.trim().toLowerCase();
    return studentsList.filter((s) => {
      if (s.accountRole !== 'teacher') return false;
      if (selectedBoardWorkspace !== 'all' && s.board && s.board !== selectedBoardWorkspace) {
        return false;
      }
      if (!q) return true;
      return `${s.name} ${s.email} ${s.mobile} ${s.schoolName || ''}`.toLowerCase().includes(q);
    });
  }, [studentsList, teacherSearch, selectedBoardWorkspace]);

  // 2. Schools & Colleges state
  const [institutions, setInstitutions] = useState<
    Array<{
      id: string;
      ownerUserId: string;
      institutionName: string;
      institutionType: string;
      affiliationOrUniversity: string;
      city: string;
      principalName: string;
      contactEmailOrPhone: string;
      departmentsOrClasses: string[];
      createdAt: string;
    }>
  >(() => {
    try {
      const raw = localStorage.getItem('msz_institutions_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [newSchoolName, setNewSchoolName] = useState<string>('');
  const [newSchoolCity, setNewSchoolCity] = useState<string>('');
  const [newSchoolPrincipal, setNewSchoolPrincipal] = useState<string>('');
  const [newSchoolBoard, setNewSchoolBoard] = useState<string>('Maharashtra State Board');
  const [schoolFeedback, setSchoolFeedback] = useState<string | null>(null);

  const studentSchoolDirectory = useMemo(() => {
    const counts = new Map<string, { name: string; count: number; boards: Set<string> }>();
    for (const s of studentsList) {
      const name = (s.schoolName || '').trim();
      if (!name) continue;
      const key = name.toLowerCase();
      const existing = counts.get(key) || { name, count: 0, boards: new Set<string>() };
      existing.count += 1;
      if (s.board) existing.boards.add(s.board);
      counts.set(key, existing);
    }
    return Array.from(counts.values());
  }, [studentsList]);

  const handleAdminRegisterSchool = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchoolName.trim() || !newSchoolCity.trim()) return;
    const created = {
      id: `sch_${Date.now().toString(36)}`,
      ownerUserId: 'admin_onboarded',
      institutionName: newSchoolName.trim(),
      institutionType: 'School (Std 1–10)',
      affiliationOrUniversity: newSchoolBoard,
      city: newSchoolCity.trim(),
      principalName: newSchoolPrincipal.trim() || 'Principal / Admin',
      contactEmailOrPhone: 'Admin Onboarded',
      departmentsOrClasses: ['Div A', 'Div B', 'Div C'],
      createdAt: new Date().toISOString().slice(0, 10),
    };
    const next = [created, ...institutions];
    setInstitutions(next);
    try {
      localStorage.setItem('msz_institutions_v1', JSON.stringify(next));
    } catch {
      // Ignore storage write quota cleanly
    }
    setNewSchoolName('');
    setNewSchoolCity('');
    setNewSchoolPrincipal('');
    setSchoolFeedback(`Registered "${created.institutionName}" (${created.city}) cleanly.`);
  };

  // 3. Parents Management state
  const [remoteParents, setRemoteParents] = useState<ParentProfile[]>([]);
  const [linkParentId, setLinkParentId] = useState<string>('');
  const [linkStudentId, setLinkStudentId] = useState<string>('');
  const [parentFeedback, setParentFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (subsectionId === 'parents-management') {
      fetchBoundedParentsForAdmin({ pageSize: 150 })
        .then((res) => {
          if (res.fromFirestore) setRemoteParents(res.parents);
        })
        .catch(() => {});
    }
  }, [subsectionId]);

  const mergedParents = useMemo(() => {
    const map = new Map<string, ParentProfile>();
    for (const p of remoteParents) map.set(p.id, p);
    for (const p of parentsList) map.set(p.id, p);
    return Array.from(map.values());
  }, [parentsList, remoteParents]);

  // 4. Security Audit state
  const [auditReport, setAuditReport] = useState<SecurityAuditReport | null>(null);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);

  // 5. Attendance & Homework states
  const [attendanceNotice, setAttendanceNotice] = useState<string | null>(null);
  const [assignmentFilter, setAssignmentFilter] = useState<
    'ALL' | 'PENDING' | 'SUBMITTED' | 'EVALUATED'
  >('ALL');
  const [newAsnTitle, setNewAsnTitle] = useState<string>('');
  const [newAsnSubject, setNewAsnSubject] = useState<SubjectName>('Mathematics');
  const [newAsnStudentId, setNewAsnStudentId] = useState<string>('');
  const [assignmentNotice, setAssignmentNotice] = useState<string | null>(null);

  // 6. Manifest count for system-health
  const [manifestBundleCount, setManifestBundleCount] = useState<number>(0);
  useEffect(() => {
    if (subsectionId === 'system-health') {
      loadExternalSyllabusManifest()
        .then((m) => setManifestBundleCount(Object.keys(m?.bundles || {}).length))
        .catch(() => {});
    }
  }, [subsectionId]);

  // ---------------------------------------------------------------------------
  // SUBSECTION: STUDENT REGISTRATION OVERVIEW
  // ---------------------------------------------------------------------------
  if (subsectionId === 'student-registration') {
    const studentsOnly = studentsList.filter((s) => s.accountRole !== 'teacher');
    const verifiedCount = studentsOnly.filter((s) => s.isEmailVerified || s.isPhoneVerified).length;
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-display font-black text-slate-900">
              Student Registration &amp; Verification Overview
            </h2>
            <p className="text-xs text-slate-500">
              Enforces unique Mobile + Email identity across Classes 1–10 and multi-board upgrades.
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onJumpToSection({ categoryId: 'registration_users', subsectionId: 'students' })
            }
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
          >
            Open Full Student Directory ({studentsOnly.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-bold uppercase">Total Students</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{studentsOnly.length}</div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-800 font-bold uppercase">Verified Identity Accounts</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{verifiedCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-amber-900 font-bold uppercase">Paid Multi-Class Subscribers</span>
            <div className="text-2xl font-black text-amber-800 mt-1">
              {studentsOnly.filter((s) => s.plan !== 'free').length}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-xs font-black uppercase text-slate-600">
            Latest Registered Students
          </h3>
          {studentsOnly.slice(0, 8).map((s) => (
            <div
              key={s.id}
              className="p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs"
            >
              <div>
                <span className="font-black text-slate-900">{s.name}</span>
                <span className="text-slate-500 ml-2">
                  {getBoardShortLabel(s.board)} · {s.classLevel} · {s.mobile} · {s.email}
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600">
                Registered: {s.registeredAt?.slice(0, 10) || 'Recent'}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: TEACHERS DIRECTORY
  // ---------------------------------------------------------------------------
  if (subsectionId === 'teachers-directory') {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              <span>Teacher Registration &amp; Educator Accounts ({teacherAccounts.length})</span>
            </h2>
            <p className="text-xs text-slate-500">
              Dedicated educator accounts with access to 130 Teacher Tools, Lesson Planner &amp; TET/CTET Prep.
            </p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
              placeholder="Search teacher name, email, school..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs"
            />
          </div>
        </div>

        {teacherAccounts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2 text-xs">
            <p className="font-bold text-slate-800">No educator-role profiles match the current filter.</p>
            <p className="text-slate-500">
              Teachers register through the Educator / Teacher signup flow with unique Email + Mobile.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {teacherAccounts.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-black text-sm text-slate-900">{t.name}</span>
                  <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-bold text-[10px]">
                    {t.plan.toUpperCase()}
                  </span>
                </div>
                <div className="text-slate-600">
                  {t.email} · {t.mobile}
                </div>
                <div className="text-slate-700 font-semibold">
                  {getBoardShortLabel(t.board)} · {t.classLevel} ·{' '}
                  {t.schoolName || 'Independent Educator'}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: SCHOOLS & COLLEGES DIRECTORY
  // ---------------------------------------------------------------------------
  if (subsectionId === 'schools-directory') {
    return (
      <div className="space-y-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <form
            onSubmit={handleAdminRegisterSchool}
            className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs"
          >
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-600" />
              <span>Register School / College Portal</span>
            </h2>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Institution Name *</label>
              <input
                type="text"
                required
                value={newSchoolName}
                onChange={(e) => setNewSchoolName(e.target.value)}
                placeholder="e.g. Lokmanya Vidyalaya"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">City / District *</label>
              <input
                type="text"
                required
                value={newSchoolCity}
                onChange={(e) => setNewSchoolCity(e.target.value)}
                placeholder="e.g. Pune"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Principal / Admin</label>
              <input
                type="text"
                value={newSchoolPrincipal}
                onChange={(e) => setNewSchoolPrincipal(e.target.value)}
                placeholder="Principal Name"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Affiliation Board</label>
              <select
                value={newSchoolBoard}
                onChange={(e) => setNewSchoolBoard(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="Maharashtra State Board">Maharashtra State Board</option>
                <option value="CBSE (NCERT)">CBSE (NCERT)</option>
                <option value="ICSE (CISCE)">ICSE (CISCE)</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-black cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create School Tenant</span>
            </button>
            {schoolFeedback && (
              <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                {schoolFeedback}
              </div>
            )}
          </form>

          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <h2 className="text-base font-black text-slate-900">
              Registered Campus Portals ({institutions.length}) &amp; Student-Linked Schools (
              {studentSchoolDirectory.length})
            </h2>
            <div className="space-y-2.5 max-h-96 overflow-y-auto">
              {institutions.map((inst) => (
                <div
                  key={inst.id}
                  className="p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-black text-slate-900">{inst.institutionName}</div>
                    <div className="text-slate-600">
                      {inst.institutionType} · {inst.city} · {inst.affiliationOrUniversity}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono bg-white px-2 py-1 rounded border border-sky-200">
                    {inst.id}
                  </span>
                </div>
              ))}
              {studentSchoolDirectory.map((sch) => (
                <div
                  key={sch.name}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-black text-slate-900">{sch.name}</div>
                    <div className="text-slate-500">
                      Boards: {Array.from(sch.boards).join(', ') || 'Maharashtra'}
                    </div>
                  </div>
                  <span className="font-bold text-slate-700">{sch.count} student(s)</span>
                </div>
              ))}
              {institutions.length === 0 && studentSchoolDirectory.length === 0 && (
                <p className="text-slate-500 py-4 text-center">
                  No schools registered yet. Use the form on the left to create the first portal.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: PARENTS MANAGEMENT
  // ---------------------------------------------------------------------------
  if (subsectionId === 'parents-management') {
    const handleAdminLinkParent = (e: React.FormEvent) => {
      e.preventDefault();
      if (!linkParentId || !linkStudentId) return;
      const res = linkParentToStudent(linkParentId, linkStudentId);
      setParentFeedback(res.message);
    };

    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-rose-600" />
            <span>Link Parent to Verified Student</span>
          </h2>
          <form onSubmit={handleAdminLinkParent} className="space-y-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Parent Profile</label>
              <select
                value={linkParentId}
                onChange={(e) => setLinkParentId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="">Choose a parent...</option>
                {mergedParents.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.mobile || p.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Select Student Account</label>
              <select
                value={linkStudentId}
                onChange={(e) => setLinkStudentId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="">Choose a student...</option>
                {studentsList
                  .filter((s) => s.accountRole !== 'teacher')
                  .map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.board || 'MH'} · {s.classLevel})
                    </option>
                  ))}
              </select>
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-black cursor-pointer"
            >
              Link Guardian Safely
            </button>
          </form>
          {parentFeedback && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
              {parentFeedback}
            </div>
          )}
        </div>

        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
          <h2 className="text-base font-black text-slate-900">
            Parent Directory ({mergedParents.length})
          </h2>
          {mergedParents.length === 0 ? (
            <p className="text-slate-500">
              No explicit parent accounts found yet. Parents can link existing student accounts
              inside the Parent Zone.
            </p>
          ) : (
            <div className="space-y-2">
              {mergedParents.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-black text-slate-900">{p.name}</div>
                    <div className="text-slate-600">
                      {p.email} · {p.mobile}
                    </div>
                  </div>
                  <span className="font-bold text-indigo-700">
                    {p.linkedStudentIds?.length || 0} linked student(s)
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: ADMIN & SECURITY AUDIT
  // ---------------------------------------------------------------------------
  if (subsectionId === 'admin-security') {
    const handleRunAudit = async () => {
      setIsAuditing(true);
      try {
        const res = await runSecurityAuditTest();
        setAuditReport(res);
      } finally {
        setIsAuditing(false);
      }
    };

    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Admin Security &amp; Role Isolation Audit</span>
            </h2>
            <p className="text-xs text-slate-500">
              Verifies Student isolation, Parent authorized linking, Admin RBAC privilege &amp; Firestore rules.
            </p>
          </div>
          <button
            type="button"
            disabled={isAuditing}
            onClick={handleRunAudit}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin' : ''}`} />
            <span>{isAuditing ? 'Running Audit...' : 'Run Security Audit Tests'}</span>
          </button>
        </div>

        {auditReport ? (
          <div className="space-y-3">
            <div
              className={`p-3.5 rounded-2xl border text-xs font-black flex items-center justify-between ${
                auditReport.overallPassed
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-rose-50 border-rose-300 text-rose-900'
              }`}
            >
              <span>
                Overall Status: {auditReport.overallPassed ? 'ALL CHECKS PASSED' : 'ATTENTION REQUIRED'}
              </span>
              <span className="font-mono text-[11px]">{auditReport.timestamp}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {auditReport.tests.map((test) => (
                <div key={test.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-slate-900">{test.title}</span>
                    {test.passed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-slate-600">{test.description}</p>
                  <p className="text-[11px] font-semibold text-slate-700 pt-1">{test.details}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            Click &ldquo;Run Security Audit Tests&rdquo; above to execute live RBAC and privacy isolation diagnostics.
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: ACADEMIC MANAGEMENT DRILLDOWNS (Boards, Classes, Subjects, Syllabus, Textbooks, Chapters)
  // ---------------------------------------------------------------------------
  if (
    subsectionId === 'boards-management' ||
    subsectionId === 'classes-divisions' ||
    subsectionId === 'subjects-management' ||
    subsectionId === 'syllabus-registry' ||
    subsectionId === 'textbooks-directory' ||
    subsectionId === 'chapters-notes-solutions'
  ) {
    const textbooks = getOfficialTextbooksForBoardClass(drillBoard, drillClass);
    const chapterTitles = getRichChaptersForSubject(drillBoard, drillClass, drillSubject);
    const detailedChapters = getStudyMaterialsForSubject(drillBoard, drillClass, drillSubject);
    const syllabusEntries = listCentralSyllabusEntries({
      board: drillBoard,
      classLevel: drillClass,
    });

    return (
      <div className="space-y-5">
        {/* Shared Drilldown Bar: Board -> Class -> Subject */}
        <div className="bg-white rounded-2xl p-4 border border-amber-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={drillBoard}
              onChange={(e) => setDrillBoard(e.target.value as EducationBoard)}
              aria-label="Select Education Board"
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
            >
              {ALL_BOARDS.map((b) => (
                <option key={b} value={b}>
                  {b} Board
                </option>
              ))}
            </select>

            <select
              value={drillClass}
              onChange={(e) => setDrillClass(e.target.value as ClassLevel)}
              aria-label="Select Class"
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
            >
              {ALL_10_CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={drillSubject}
              onChange={(e) => setDrillSubject(e.target.value as SubjectName)}
              aria-label="Select Subject"
              className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold text-slate-900"
            >
              {subjectsForDrill.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={() =>
              onJumpToSection({
                categoryId: 'student_learning',
                subsectionId: 'study-library-cms',
                board: drillBoard,
                classLevel: drillClass,
              })
            }
            className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold cursor-pointer"
          >
            Edit in Study Library CMS
          </button>
        </div>

        {/* Boards Overview Cards */}
        {subsectionId === 'boards-management' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {ALL_BOARDS.map((brd) => {
              const stuCount = studentsList.filter((s) => (s.board || 'Maharashtra') === brd).length;
              const isSelected = drillBoard === brd;
              return (
                <button
                  key={brd}
                  type="button"
                  onClick={() => setDrillBoard(brd)}
                  className={`p-5 rounded-3xl border text-left space-y-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-slate-900">{brd} Board</span>
                    <Layers className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-slate-600 font-medium">
                    Classes 1–10 · {getSubjectsForClass(drillClass, brd).length} subjects in {drillClass}
                  </div>
                  <div className="font-bold text-slate-800">{stuCount} linked accounts</div>
                </button>
              );
            })}
          </div>
        )}

        {/* Classes & Divisions Grid */}
        {subsectionId === 'classes-divisions' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900">
              {drillBoard} · Classes 1 to 10 &amp; Divisions ({DIVISIONS.join(', ')})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
              {ALL_10_CLASSES.map((cls) => {
                const count = studentsList.filter(
                  (s) => (s.board || 'Maharashtra') === drillBoard && s.classLevel === cls
                ).length;
                const subjs = getSubjectsForClass(cls, drillBoard).length;
                return (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setDrillClass(cls)}
                    className={`p-3.5 rounded-2xl border text-left cursor-pointer ${
                      drillClass === cls
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 hover:bg-amber-50 text-slate-900 border-slate-200'
                    }`}
                  >
                    <div className="font-black">{cls}</div>
                    <div className="text-[11px] opacity-80 mt-0.5">{subjs} Subjects</div>
                    <div className="text-[11px] font-bold mt-1">{count} Students</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Textbooks Inspector */}
        {subsectionId === 'textbooks-directory' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <Library className="w-5 h-5 text-amber-600" />
              <span>
                Official Textbooks ({drillBoard} · {drillClass} — {textbooks.length} Books)
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {textbooks.map((tb) => (
                <div key={tb.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                  <div className="font-black text-slate-900">{tb.bookTitle}</div>
                  <div className="text-slate-600">
                    {tb.subject} · {tb.publisher} · Edition {tb.editionYear}
                  </div>
                  <div className="text-[11px] font-bold text-indigo-700">
                    {tb.totalChapters} Chapters · Mediums: {tb.mediums.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Syllabus Registry */}
        {subsectionId === 'syllabus-registry' && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
            <h2 className="text-base font-black text-slate-900">
              Central Syllabus Verification Status ({drillBoard} · {drillClass})
            </h2>
            <div className="space-y-2">
              {syllabusEntries.map((entry) => (
                <div
                  key={entry.entryId}
                  className="p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-black text-slate-900">
                      {entry.subject} — {entry.textbookTitle}
                    </div>
                    <div className="text-slate-500">
                      {entry.publisher} · {entry.chapters.length} Chapters
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${
                      entry.verificationStatus === 'VERIFIED'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                        : 'bg-sky-100 text-sky-900 border-sky-300'
                    }`}
                  >
                    {entry.verificationStatus}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chapters, Notes & Textbook Exercise Solutions Drilldown */}
        {(subsectionId === 'chapters-notes-solutions' || subsectionId === 'subjects-management') && (
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>
                  {drillBoard} · {drillClass} · {drillSubject} ({chapterTitles.length} Chapters)
                </span>
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Active Subjects in Class: {subjectsForDrill.length}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {detailedChapters.map((ch) => (
                <div key={ch.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-slate-900">
                      Ch {ch.chapterNumber}: {ch.chapterTitle}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {ch.keyPoints.length} Notes · {ch.textbookExerciseSolutions?.length || 0} Solutions
                    </span>
                  </div>
                  <p className="text-slate-600 line-clamp-2">{ch.overview}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: QUESTION PAPERS & VIDEO LESSONS INSPECTOR
  // ---------------------------------------------------------------------------
  if (subsectionId === 'papers-videos-inspector') {
    const papers = getExamPapersForSubject(drillBoard, drillClass, drillSubject);
    const videos = getVideoLessonsForSubject(drillBoard, drillClass, drillSubject);
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-rose-600" />
            <span>Model Papers, PYQs &amp; Video Lessons Inspector</span>
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={drillBoard}
              onChange={(e) => setDrillBoard(e.target.value as EducationBoard)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold"
            >
              {ALL_BOARDS.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select
              value={drillClass}
              onChange={(e) => setDrillClass(e.target.value as ClassLevel)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold"
            >
              {ALL_10_CLASSES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={drillSubject}
              onChange={(e) => setDrillSubject(e.target.value as SubjectName)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 font-bold"
            >
              {subjectsForDrill.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-2">
            <div className="font-black text-indigo-950 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Model Papers ({papers.modelPapers.length})</span>
            </div>
            {papers.modelPapers.map((p) => (
              <div key={p.id} className="p-2.5 rounded-xl bg-white border border-indigo-100 font-semibold">
                {p.yearOrTerm} · {p.totalMarks} Marks · {p.durationLabel}
              </div>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-2">
            <div className="font-black text-purple-950 flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Previous Year Papers ({papers.pyqPapers.length})</span>
            </div>
            {papers.pyqPapers.map((p) => (
              <div key={p.id} className="p-2.5 rounded-xl bg-white border border-purple-100 font-semibold">
                {p.title}
              </div>
            ))}
          </div>
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="font-black text-rose-950 flex items-center gap-1.5">
              <PlayCircle className="w-4 h-4" />
              <span>Video Lessons ({videos.length})</span>
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto">
              {videos.map((v) => (
                <div key={v.id} className="p-2.5 rounded-xl bg-white border border-rose-100">
                  <div className="font-bold text-slate-900">{v.lessonTitle}</div>
                  <div className="text-[10px] text-slate-500">{v.providerName} · {v.durationLabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: 130 TEACHER TOOLS DIRECTORY
  // ---------------------------------------------------------------------------
  if (subsectionId === 'teacher-tools-directory') {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-600" />
          <span>130 Teacher Tools &amp; {TEACHER_LEARNING_MATERIALS.length} Pedagogy Guides</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs max-h-[520px] overflow-y-auto pr-1">
          {ALL_130_TEACHER_TOOLS.map((tool) => (
            <div key={tool.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
              <div className="font-black text-slate-900">
                #{tool.number} {tool.name}
              </div>
              <div className="text-[11px] font-bold text-teal-700">
                {tool.category} · Wave {tool.wave}
              </div>
              <p className="text-slate-600 line-clamp-2">{tool.shortDesc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: TEACHER ATTENDANCE REGISTER
  // ---------------------------------------------------------------------------
  if (subsectionId === 'teacher-attendance') {
    const classStudents = studentsList.filter(
      (s) =>
        s.accountRole !== 'teacher' &&
        (selectedBoardWorkspace === 'all' || (s.board || 'Maharashtra') === selectedBoardWorkspace) &&
        (selectedClassWorkspace === 'all' || s.classLevel === selectedClassWorkspace)
    );
    const todayIso = new Date().toISOString().slice(0, 10);

    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-emerald-600" />
              <span>Student Attendance Register ({classStudents.length} Students)</span>
            </h2>
            <p className="text-slate-500">Mark daily attendance directly synced with Parent &amp; Student dashboards.</p>
          </div>
          <span className="font-mono font-bold text-slate-600">Date: {todayIso}</span>
        </div>

        {attendanceNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
            {attendanceNotice}
          </div>
        )}

        <div className="space-y-2 max-h-[460px] overflow-y-auto">
          {classStudents.slice(0, 40).map((stu) => {
            const recs = stu.attendanceRecords || [];
            const presentCount = recs.filter((r) => String(r.status).toUpperCase() === 'PRESENT').length;
            return (
              <div
                key={stu.id}
                className="p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <div className="font-black text-slate-900">{stu.name}</div>
                  <div className="text-slate-500">
                    {getBoardShortLabel(stu.board)} · {stu.classLevel} · Logged: {presentCount}/{recs.length} days present
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  {(['PRESENT', 'ABSENT', 'HOLIDAY'] as const).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        updateStudentAttendance(stu.id, {
                          id: `att_${Date.now().toString(36)}`,
                          studentId: stu.id,
                          date: todayIso,
                          status,
                        });
                        setAttendanceNotice(`Marked ${stu.name} as ${status} for ${todayIso}.`);
                      }}
                      className={`px-2.5 py-1 rounded-lg font-bold cursor-pointer ${
                        status === 'PRESENT'
                          ? 'bg-emerald-600 text-white'
                          : status === 'ABSENT'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-200 text-slate-800'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: HOMEWORK, ASSIGNMENTS & EVALUATION
  // ---------------------------------------------------------------------------
  if (subsectionId === 'teacher-assignments') {
    const classStudents = studentsList.filter((s) => s.accountRole !== 'teacher');
    const allAssignments = classStudents.flatMap((stu) =>
      (stu.assignments || []).map((a) => ({ stu, a }))
    );
    const filtered = allAssignments.filter(({ a }) => {
      if (assignmentFilter === 'ALL') return true;
      const st = String(a.status).toUpperCase();
      if (assignmentFilter === 'EVALUATED') return st === 'EVALUATED' || st === 'GRADED';
      return st === assignmentFilter;
    });

    const handleQuickAssign = (e: React.FormEvent) => {
      e.preventDefault();
      const target = newAsnStudentId
        ? classStudents.filter((s) => s.id === newAsnStudentId)
        : classStudents.slice(0, 10);
      if (!newAsnTitle.trim() || target.length === 0) return;
      const due = new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10);
      target.forEach((s) =>
        addStudentAssignment(s.id, {
          studentId: s.id,
          title: newAsnTitle.trim(),
          subject: newAsnSubject,
          dueDate: due,
          status: 'PENDING',
          maxScore: 20,
          description: `Admin/Teacher homework for ${s.classLevel}`,
        })
      );
      setAssignmentNotice(`Dispatched "${newAsnTitle.trim()}" to ${target.length} student(s).`);
      setNewAsnTitle('');
    };

    return (
      <div className="space-y-5 text-xs">
        <form
          onSubmit={handleQuickAssign}
          className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs grid grid-cols-1 sm:grid-cols-4 gap-3 items-end"
        >
          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Quick Assign Homework</label>
            <input
              type="text"
              required
              value={newAsnTitle}
              onChange={(e) => setNewAsnTitle(e.target.value)}
              placeholder="Homework title..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Student (or Top 10)</label>
            <select
              value={newAsnStudentId}
              onChange={(e) => setNewAsnStudentId(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
            >
              <option value="">First 10 Students</option>
              {classStudents.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.classLevel})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black cursor-pointer"
          >
            Assign Homework
          </button>
        </form>

        {assignmentNotice && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
            {assignmentNotice}
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-base font-black text-slate-900">
              Assignments &amp; Submissions ({filtered.length})
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {(['ALL', 'PENDING', 'SUBMITTED', 'EVALUATED'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setAssignmentFilter(f)}
                  className={`px-3 py-1 rounded-xl font-bold cursor-pointer ${
                    assignmentFilter === f ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-slate-500">No homework items match this status yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map(({ stu, a }) => (
                <div key={`${stu.id}_${a.id}`} className="p-4 rounded-2xl border border-slate-200 bg-slate-50 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900">{a.title}</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-slate-200 font-bold text-[10px]">
                      {a.status}
                    </span>
                  </div>
                  <div className="text-slate-600">
                    {stu.name} ({stu.classLevel}) · {a.subject} · Due {a.dueDate}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      updateStudentAssignment(stu.id, a.id, {
                        status: 'graded',
                        score: a.maxScore,
                        obtainedScore: a.maxScore,
                        teacherFeedback: 'Verified & evaluated by Admin/Teacher.',
                      })
                    }
                    className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold cursor-pointer"
                  >
                    Mark Evaluated ({a.maxScore}/{a.maxScore})
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: SUBSCRIPTIONS & PLANS OVERVIEW
  // ---------------------------------------------------------------------------
  if (subsectionId === 'subscriptions-plans') {
    const freeCount = studentsList.filter((s) => s.plan === 'free').length;
    const paidCount = studentsList.filter((s) => s.plan !== 'free').length;
    const totalRevenue = transactions
      .filter((t) => t.status === 'SUCCESS')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-600" />
            <span>Subscriptions, Plans &amp; Razorpay Revenue Summary</span>
          </h2>
          <button
            type="button"
            onClick={() =>
              onJumpToSection({ categoryId: 'finance_subscriptions', subsectionId: 'payments' })
            }
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
          >
            Inspect Razorpay Ledger ({transactions.length})
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="text-slate-500 font-bold uppercase">Free Accounts</span>
            <div className="text-2xl font-black text-slate-900 mt-1">{freeCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-800 font-bold uppercase">Active Paid Accounts</span>
            <div className="text-2xl font-black text-emerald-700 mt-1">{paidCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200">
            <span className="text-purple-800 font-bold uppercase">Verified Razorpay Volume</span>
            <div className="text-2xl font-black text-purple-800 mt-1">₹{totalRevenue}</div>
          </div>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: SYSTEM NOTIFICATIONS
  // ---------------------------------------------------------------------------
  if (subsectionId === 'system-notifications') {
    return (
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-600" />
            <span>In-App Notifications &amp; Activity Alerts ({notifications.length})</span>
          </h2>
          <button
            type="button"
            onClick={() =>
              onJumpToSection({ categoryId: 'communication', subsectionId: 'announcements' })
            }
            className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
          >
            Broadcast Live Announcement ({announcements.length})
          </button>
        </div>
        {notifications.length === 0 ? (
          <p className="text-slate-500">No session notifications generated yet.</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-black text-slate-900">{n.title}</span>
                  <span className="text-[10px] font-bold text-slate-500">{n.timestamp}</span>
                </div>
                <p className="text-slate-700">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // SUBSECTION: DATABASE & SYSTEM HEALTH
  // ---------------------------------------------------------------------------
  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-indigo-600" />
          <span>System, Firestore &amp; Syllabus Delivery Health</span>
        </h2>
        <button
          type="button"
          onClick={() => retryFirebaseConnection()}
          className="px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Check Firestore Connection</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-500 uppercase">Firestore Status</span>
          <div className="text-base font-black text-slate-900 mt-1">{firebaseConnectionStatus}</div>
          {firebaseConnectionError && (
            <p className="text-rose-700 mt-1">{firebaseConnectionError}</p>
          )}
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-500 uppercase">Platform Config Hydrated</span>
          <div className="text-base font-black text-slate-900 mt-1">
            {platformConfigLoaded ? 'Loaded & Active' : 'Pending / Local Fallback'}
          </div>
          <p className="text-slate-500 mt-1">{learningPrograms.length} Learning Programs</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="font-bold text-slate-500 uppercase">External Syllabus Manifest</span>
          <div className="text-base font-black text-slate-900 mt-1">
            {manifestBundleCount} Subject Bundle(s)
          </div>
          <p className="text-slate-500 mt-1">/content/syllabus/manifest.json</p>
        </div>
      </div>
    </div>
  );
};
