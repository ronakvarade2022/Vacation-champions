import React, { useEffect, useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INSTITUTION_ACADEMIC_MATERIALS, type InstitutionAcademicMaterial } from '../../data/schoolCollege/academicMaterialsCatalog';
import { downloadTextAsPdf } from '../../utils/realFileExports';
import {
  ArrowLeft,
  Award,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Download,
  Lock,
  Plus,
  Printer,
  ShieldCheck,
  Trash2,
  Users,
} from 'lucide-react';

export interface InstitutionRecord {
  id: string;
  ownerUserId: string;
  institutionName: string;
  institutionType: 'School (Std 1–10)' | 'Higher Secondary / Jr College (Std 11–12)' | 'Degree College / UG';
  affiliationOrUniversity: string;
  city: string;
  principalName: string;
  contactEmailOrPhone: string;
  departmentsOrClasses: string[];
  academicYear?: string;
  verificationStatus?: 'PENDING_VERIFICATION' | 'VERIFIED';
  createdAt: string;
}

export interface InstitutionMember {
  id: string;
  institutionId: string;
  role: 'student' | 'faculty';
  fullName: string;
  rollOrCode: string;
  classOrDepartment: string;
  attendancePresent: number;
  attendanceTotal: number;
  latestExamName?: string;
  latestMarksPct?: number;
}

export interface InstitutionNotice {
  id: string;
  institutionId: string;
  title: string;
  audience: 'All Campus' | 'Students Only' | 'Faculty & Staff';
  body: string;
  publishedAt: string;
}

const INST_LIST_KEY = 'msz_institutions_v1';
const INST_MEMBERS_KEY = 'msz_institution_members_v1';
const INST_NOTICES_KEY = 'msz_institution_notices_v1';

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export interface SchoolCollegeZoneViewProps {
  userId: string;
  userName: string;
  onOpenAuth?: (tab?: 'school_admin' | 'register', registerRole?: 'school_admin') => void;
  onBackHome: () => void;
}

export const SchoolCollegeZoneView: React.FC<SchoolCollegeZoneViewProps> = ({
  userId,
  userName,
  onOpenAuth,
  onBackHome,
}) => {
  const { activeRole } = useApp();
  const isSchoolAdminAuthorized =
    activeRole === 'school_admin' || activeRole === 'admin';

  const [institutions, setInstitutions] = useState<InstitutionRecord[]>(() =>
    readJson<InstitutionRecord[]>(INST_LIST_KEY, [])
  );
  const [members, setMembers] = useState<InstitutionMember[]>(() =>
    readJson<InstitutionMember[]>(INST_MEMBERS_KEY, [])
  );
  const [notices, setNotices] = useState<InstitutionNotice[]>(() =>
    readJson<InstitutionNotice[]>(INST_NOTICES_KEY, [])
  );

  const [activeInstitutionId, setActiveInstitutionId] = useState<string>(() => {
    const list = readJson<InstitutionRecord[]>(INST_LIST_KEY, []);
    return list[0]?.id || '';
  });

  const [zoneTab, setZoneTab] = useState<
    'overview' | 'roster' | 'timetable' | 'exams' | 'notices' | 'materials' | 'register'
  >(() =>
    !isSchoolAdminAuthorized || readJson<InstitutionRecord[]>(INST_LIST_KEY, []).length === 0
      ? 'materials'
      : 'overview'
  );

  const [newDivisionInput, setNewDivisionInput] = useState<string>('');
  const [regAcademicYear, setRegAcademicYear] = useState<string>('2026–27');

  // Registration Form State
  const [regName, setRegName] = useState<string>('');
  const [regType, setRegType] = useState<InstitutionRecord['institutionType']>('School (Std 1–10)');
  const [regAffiliation, setRegAffiliation] = useState<string>('Maharashtra State Board / CBSE / University');
  const [regCity, setRegCity] = useState<string>('');
  const [regPrincipal, setRegPrincipal] = useState<string>(userName || '');
  const [regContact, setRegContact] = useState<string>('');
  const [regDeptsText, setRegDeptsText] = useState<string>('Std 8 Div A, Std 9 Div A, Std 10 Div A');

  // Add Member Form
  const [memRole, setMemRole] = useState<'student' | 'faculty'>('student');
  const [memName, setMemName] = useState<string>('');
  const [memRoll, setMemRoll] = useState<string>('');
  const [memDept, setMemDept] = useState<string>('');

  // Exam Grading Form
  const [examMemberId, setExamMemberId] = useState<string>('');
  const [examTitle, setExamTitle] = useState<string>('Mid-Term Unit Assessment');
  const [examMarksPct, setExamMarksPct] = useState<number>(84);
  const [printingReportStudent, setPrintingReportStudent] = useState<InstitutionMember | null>(null);

  // Notice Composer
  const [noticeTitle, setNoticeTitle] = useState<string>('');
  const [noticeAudience, setNoticeAudience] = useState<InstitutionNotice['audience']>('All Campus');
  const [noticeBody, setNoticeBody] = useState<string>('');

  // Materials Viewer
  const [selectedMaterial, setSelectedMaterial] = useState<InstitutionAcademicMaterial>(
    INSTITUTION_ACADEMIC_MATERIALS[0]
  );
  const [statusBanner, setStatusBanner] = useState<string | null>(null);

  useEffect(() => {
    try { localStorage.setItem(INST_LIST_KEY, JSON.stringify(institutions)); } catch {}
  }, [institutions]);
  useEffect(() => {
    try { localStorage.setItem(INST_MEMBERS_KEY, JSON.stringify(members)); } catch {}
  }, [members]);
  useEffect(() => {
    try { localStorage.setItem(INST_NOTICES_KEY, JSON.stringify(notices)); } catch {}
  }, [notices]);

  const activeInstitution = useMemo(
    () => institutions.find((i) => i.id === activeInstitutionId) || institutions[0] || null,
    [institutions, activeInstitutionId]
  );

  // Strict Multi-Tenant Data Partitioning by institutionId
  const instMembers = useMemo(
    () => (activeInstitution ? members.filter((m) => m.institutionId === activeInstitution.id) : []),
    [members, activeInstitution]
  );
  const instStudents = useMemo(() => instMembers.filter((m) => m.role === 'student'), [instMembers]);
  const instFaculty = useMemo(() => instMembers.filter((m) => m.role === 'faculty'), [instMembers]);
  const instNotices = useMemo(
    () => (activeInstitution ? notices.filter((n) => n.institutionId === activeInstitution.id) : []),
    [notices, activeInstitution]
  );

  const handleRegisterInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regCity.trim()) return;
    const depts = regDeptsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const created: InstitutionRecord = {
      id: `sch_${Date.now().toString(36)}`,
      ownerUserId: userId,
      institutionName: regName.trim(),
      institutionType: regType,
      affiliationOrUniversity: regAffiliation.trim(),
      city: regCity.trim(),
      principalName: regPrincipal.trim() || userName || 'Principal',
      contactEmailOrPhone: regContact.trim() || 'Campus Office',
      departmentsOrClasses: depts.length > 0 ? depts : ['Division A'],
      academicYear: regAcademicYear.trim() || '2026–27',
      verificationStatus: 'PENDING_VERIFICATION',
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setInstitutions((prev) => [created, ...prev]);
    setActiveInstitutionId(created.id);
    setRegName('');
    setRegCity('');
    setZoneTab('overview');
    setStatusBanner(`Created isolated multi-tenant portal for "${created.institutionName}" (${created.id}).`);
  };

  const handleAddDivision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInstitution || !newDivisionInput.trim()) return;
    const val = newDivisionInput.trim();
    if (activeInstitution.departmentsOrClasses.includes(val)) return;
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === activeInstitution.id
          ? { ...inst, departmentsOrClasses: [...inst.departmentsOrClasses, val] }
          : inst
      )
    );
    setNewDivisionInput('');
    setStatusBanner(`Added division/department "${val}".`);
  };

  const handleRemoveDivision = (divName: string) => {
    if (!activeInstitution) return;
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === activeInstitution.id
          ? {
              ...inst,
              departmentsOrClasses: inst.departmentsOrClasses.filter((d) => d !== divName),
            }
          : inst
      )
    );
  };

  const handleChangeAcademicYear = (year: string) => {
    if (!activeInstitution) return;
    setInstitutions((prev) =>
      prev.map((inst) =>
        inst.id === activeInstitution.id ? { ...inst, academicYear: year } : inst
      )
    );
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInstitution || !memName.trim()) return;
    const m: InstitutionMember = {
      id: `mem_${Date.now().toString(36)}`,
      institutionId: activeInstitution.id,
      role: memRole,
      fullName: memName.trim(),
      rollOrCode: memRoll.trim() || (memRole === 'student' ? `R-${instStudents.length + 101}` : `FAC-${instFaculty.length + 1}`),
      classOrDepartment: memDept.trim() || activeInstitution.departmentsOrClasses[0] || 'General',
      attendancePresent: 1,
      attendanceTotal: 1,
    };
    setMembers((prev) => [m, ...prev]);
    setMemName('');
    setMemRoll('');
    setStatusBanner(`Added ${memRole} "${m.fullName}" to ${activeInstitution.institutionName}.`);
  };

  const handleMarkAttendance = (memberId: string, present: boolean) => {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === memberId
          ? { ...m, attendancePresent: m.attendancePresent + (present ? 1 : 0), attendanceTotal: m.attendanceTotal + 1 }
          : m
      )
    );
  };

  const handleSaveExamResult = (e: React.FormEvent) => {
    e.preventDefault();
    const targetId = examMemberId || instStudents[0]?.id;
    if (!targetId) return;
    const clampedPct = Math.max(0, Math.min(100, Number(examMarksPct) || 0));
    setMembers((prev) =>
      prev.map((m) =>
        m.id === targetId ? { ...m, latestExamName: examTitle.trim(), latestMarksPct: clampedPct } : m
      )
    );
    setStatusBanner(`Saved ${examTitle.trim()} score (${clampedPct}%) cleanly.`);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInstitution || !noticeTitle.trim() || !noticeBody.trim()) return;
    const n: InstitutionNotice = {
      id: `not_${Date.now().toString(36)}`,
      institutionId: activeInstitution.id,
      title: noticeTitle.trim(),
      audience: noticeAudience,
      body: noticeBody.trim(),
      publishedAt: new Date().toLocaleDateString(),
    };
    setNotices((prev) => [n, ...prev]);
    setNoticeTitle('');
    setNoticeBody('');
  };

  const computeGradeAndGpa = (pct: number) => {
    if (pct >= 90) return { grade: 'O (Outstanding)', gpa: '10.0' };
    if (pct >= 80) return { grade: 'A+ (Distinction)', gpa: '9.0' };
    if (pct >= 70) return { grade: 'A (First Class)', gpa: '8.0' };
    if (pct >= 60) return { grade: 'B+ (Second Class)', gpa: '7.0' };
    if (pct >= 45) return { grade: 'B (Pass)', gpa: '6.0' };
    return { grade: 'Needs Improvement', gpa: '4.0' };
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-sky-700/40 space-y-5">
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
            {activeInstitution && (
              <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold">
                Status: {activeInstitution.verificationStatus || 'PENDING_VERIFICATION'}
              </span>
            )}
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Multi-Tenant Campus Isolation</span>
            </span>
            {isSchoolAdminAuthorized ? (
              <button
                type="button"
                onClick={() => setZoneTab('register')}
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
              >
                + Register School / College
              </button>
            ) : (
              onOpenAuth && (
                <button
                  type="button"
                  onClick={() => onOpenAuth('school_admin')}
                  className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                >
                  Institution Admin Login
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-200 text-xs font-black uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5" />
              <span>School, Higher Secondary &amp; College Zone</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              {activeInstitution
                ? activeInstitution.institutionName
                : 'Institution Management & Academic Resources'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Manage schools, junior colleges (Std 11–12), and degree colleges with tenant-isolated rosters, timetables, attendance, report cards, notices, and practical academic manuals.
            </p>
          </div>

          {institutions.length > 0 && (
            <div className="bg-white/10 border border-white/20 rounded-2xl p-2.5 min-w-[230px]">
              <label className="block text-[10px] font-black uppercase tracking-wider text-amber-300 mb-1">
                Active Institution ({institutions.length})
              </label>
              <select
                value={activeInstitution?.id || ''}
                onChange={(e) => setActiveInstitutionId(e.target.value)}
                className="w-full bg-slate-900 text-white text-xs font-bold rounded-xl px-2.5 py-1.5 border border-white/20 cursor-pointer"
              >
                {institutions.map((i) => (
                  <option key={i.id} value={i.id}>
                    {i.institutionName} ({i.city})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Sub-Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-200 pb-2.5">
        {[
          { id: 'overview' as const, label: 'Campus Overview', icon: Building2 },
          { id: 'roster' as const, label: `Students & Faculty (${instMembers.length})`, icon: Users },
          { id: 'timetable' as const, label: 'Timetable & Calendar', icon: Calendar },
          { id: 'exams' as const, label: 'Exams, GPA & Report Cards', icon: Award },
          { id: 'notices' as const, label: `Notices (${instNotices.length})`, icon: Bell },
          { id: 'materials' as const, label: `Academic Manuals (${INSTITUTION_ACADEMIC_MATERIALS.length})`, icon: BookOpen },
          { id: 'register' as const, label: '+ New Institution', icon: Plus },
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setZoneTab(t.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer flex items-center gap-1.5 ${
                zoneTab === t.id
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

      {zoneTab !== 'overview' && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setZoneTab('overview')}
              className="hover:text-slate-900 underline cursor-pointer"
            >
              School &amp; College Zone
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-black text-slate-900">
              {zoneTab === 'roster'
                ? 'Students & Faculty'
                : zoneTab === 'timetable'
                ? 'Timetable & Calendar'
                : zoneTab === 'exams'
                ? 'Exams, GPA & Report Cards'
                : zoneTab === 'notices'
                ? 'Campus Notices'
                : zoneTab === 'materials'
                ? 'Academic Manuals'
                : 'Register Institution'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setZoneTab(activeInstitution ? 'overview' : 'materials')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{activeInstitution ? 'Back to Campus Overview' : 'Back to Academic Manuals'}</span>
          </button>
        </div>
      )}

      {statusBanner && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between gap-2">
          <span>{statusBanner}</span>
          <button type="button" onClick={() => setStatusBanner(null)} className="underline cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* ACADEMIC LEARNING MATERIALS (Always accessible) */}
      {zoneTab === 'materials' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 space-y-2.5">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
              <h2 className="text-xs font-black uppercase text-slate-600">
                School, Std 11–12 &amp; UG Resources
              </h2>
              {INSTITUTION_ACADEMIC_MATERIALS.map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setSelectedMaterial(mat)}
                  className={`w-full p-3 rounded-xl border text-left cursor-pointer space-y-1 ${
                    selectedMaterial.id === mat.id
                      ? 'bg-sky-50 border-sky-400 shadow-2xs'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-[10px] font-black text-sky-800 uppercase">{mat.tier}</span>
                  <div className="text-xs font-black text-slate-900">{mat.title}</div>
                  <div className="text-[10px] text-slate-500">{mat.streamOrSubject}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <span className="text-[11px] font-black uppercase text-sky-700">
                  {selectedMaterial.tier} · {selectedMaterial.materialType}
                </span>
                <h2 className="text-lg font-black text-slate-900">{selectedMaterial.title}</h2>
                <p className="text-xs text-slate-600">{selectedMaterial.overview}</p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Manual</span>
              </button>
            </div>

            <div className="space-y-4">
              {selectedMaterial.sections.map((sec, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h3 className="text-xs font-black text-slate-900">{sec.heading}</h3>
                  <ul className="list-disc pl-5 space-y-1 text-xs text-slate-700">
                    {sec.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-2">
              <h3 className="text-xs font-black uppercase text-indigo-950">
                Viva-Voce &amp; Oral Examination Key
              </h3>
              {selectedMaterial.vivaQuestions.map((vq, idx) => (
                <div key={idx} className="text-xs space-y-0.5 bg-white p-2.5 rounded-xl border border-indigo-100">
                  <div className="font-black text-slate-900">Q: {vq.q}</div>
                  <div className="text-emerald-800 font-medium">A: {vq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* INSTITUTION AUTH GATE FOR MANAGEMENT TABS */}
      {zoneTab !== 'materials' && !isSchoolAdminAuthorized ? (
        <div className="bg-white rounded-3xl p-8 border border-sky-200 text-center space-y-4">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-black text-slate-900">
            School &amp; College Administrator Authentication Required
          </h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
            Campus rosters, attendance, timetables, GPA marksheets, and circulars are restricted to School &amp; College accounts. Academic Practical &amp; Viva Manuals remain free to browse.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {onOpenAuth && (
              <>
                <button
                  type="button"
                  onClick={() => onOpenAuth('school_admin')}
                  className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white text-xs font-black cursor-pointer"
                >
                  School &amp; College Login
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('register', 'school_admin')}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black cursor-pointer"
                >
                  Register School / College Account
                </button>
              </>
            )}
            <button
              type="button"
              onClick={() => setZoneTab('materials')}
              className="px-5 py-2.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 text-xs font-black cursor-pointer"
            >
              Browse Practical &amp; Viva Manuals
            </button>
          </div>
        </div>
      ) : null}

      {/* REGISTER INSTITUTION TAB */}
      {isSchoolAdminAuthorized && zoneTab === 'register' && (
        <form
          onSubmit={handleRegisterInstitution}
          className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 max-w-3xl text-xs"
        >
          <h2 className="text-base font-black text-slate-900">
            Register New School, Higher Secondary or College Portal
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Institution Name *</label>
              <input
                type="text"
                required
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                placeholder="e.g. Sahyadri Vidyalaya & Junior College"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Institution Type</label>
              <select
                value={regType}
                onChange={(e) => setRegType(e.target.value as InstitutionRecord['institutionType'])}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              >
                <option value="School (Std 1–10)">School (Std 1–10)</option>
                <option value="Higher Secondary / Jr College (Std 11–12)">Higher Secondary / Jr College (Std 11–12)</option>
                <option value="Degree College / UG">Degree College / UG</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Board / University Affiliation</label>
              <input
                type="text"
                value={regAffiliation}
                onChange={(e) => setRegAffiliation(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">City / District *</label>
              <input
                type="text"
                required
                value={regCity}
                onChange={(e) => setRegCity(e.target.value)}
                placeholder="e.g. Nashik"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Principal / Admin Name</label>
              <input
                type="text"
                value={regPrincipal}
                onChange={(e) => setRegPrincipal(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Contact Email / Phone</label>
              <input
                type="text"
                value={regContact}
                onChange={(e) => setRegContact(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Classes / Divisions / Departments (Comma Separated)
            </label>
            <input
              type="text"
              value={regDeptsText}
              onChange={(e) => setRegDeptsText(e.target.value)}
              placeholder="Std 8 Div A, Std 9 Div A, Std 11 Science, Std 12 Commerce"
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-black cursor-pointer"
          >
            Launch Institution Dashboard
          </button>
        </form>
      )}

      {/* GUARD FOR INSTITUTION MANAGEMENT TABS IF NONE REGISTERED YET */}
      {isSchoolAdminAuthorized && zoneTab !== 'materials' && zoneTab !== 'register' && !activeInstitution && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-3">
          <Building2 className="w-10 h-10 mx-auto text-sky-600" />
          <h2 className="text-base font-black text-slate-900">Register Your School or College First</h2>
          <p className="text-xs text-slate-600 max-w-md mx-auto">
            Create an isolated tenant campus workspace for your School, Junior College, or Degree College to manage rosters, timetables, marks, report cards, and notices.
          </p>
          <button
            type="button"
            onClick={() => setZoneTab('register')}
            className="px-5 py-2.5 rounded-xl bg-sky-700 text-white text-xs font-black cursor-pointer"
          >
            + Register School / College Now
          </button>
        </div>
      )}

      {/* CAMPUS OVERVIEW TAB */}
      {isSchoolAdminAuthorized && activeInstitution && zoneTab === 'overview' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Enrolled Students</span>
              <div className="text-2xl font-black text-slate-900">{instStudents.length}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Faculty &amp; Teachers</span>
              <div className="text-2xl font-black text-sky-700">{instFaculty.length}</div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Classes / Departments</span>
              <div className="text-2xl font-black text-indigo-700">
                {activeInstitution.departmentsOrClasses.length}
              </div>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Academic Year</span>
              <select
                value={activeInstitution.academicYear || '2026–27'}
                onChange={(e) => handleChangeAcademicYear(e.target.value)}
                className="w-full mt-1 px-2 py-1 rounded-lg border border-slate-200 bg-slate-50 text-xs font-black text-emerald-700 cursor-pointer"
              >
                <option value="2025–26">2025–26</option>
                <option value="2026–27">2026–27</option>
                <option value="2027–28">2027–28</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-black text-slate-900">Campus Profile &amp; Active Classes / Divisions</h2>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-[10px]">
                {activeInstitution.verificationStatus || 'PENDING_VERIFICATION'} · Tenant {activeInstitution.id}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold">Type &amp; Affiliation</span>
                <div className="font-black text-slate-900 mt-0.5">
                  {activeInstitution.institutionType} · {activeInstitution.affiliationOrUniversity}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold">Principal / Head</span>
                <div className="font-black text-slate-900 mt-0.5">{activeInstitution.principalName}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold">Location</span>
                <div className="font-black text-slate-900 mt-0.5">{activeInstitution.city}</div>
              </div>
            </div>

            <form onSubmit={handleAddDivision} className="flex flex-wrap gap-2 pt-1">
              <input
                type="text"
                value={newDivisionInput}
                onChange={(e) => setNewDivisionInput(e.target.value)}
                placeholder="Add new Class / Division / Dept (e.g. Std 10 Div B)"
                className="flex-1 min-w-[220px] px-3 py-2 rounded-xl border border-slate-200"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-black cursor-pointer"
              >
                + Add Class / Division
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {activeInstitution.departmentsOrClasses.map((d) => (
                <span
                  key={d}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-900 font-bold"
                >
                  <span>{d}</span>
                  {activeInstitution.departmentsOrClasses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveDivision(d)}
                      title={`Remove ${d}`}
                      className="text-rose-600 hover:text-rose-800 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ROSTER & ATTENDANCE TAB */}
      {isSchoolAdminAuthorized && activeInstitution && zoneTab === 'roster' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <form
            onSubmit={handleAddMember}
            className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs"
          >
            <h2 className="text-sm font-black text-slate-900">Add Student / Faculty to Campus</h2>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Role</label>
              <select
                value={memRole}
                onChange={(e) => setMemRole(e.target.value as 'student' | 'faculty')}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty / Lecturer</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={memName}
                onChange={(e) => setMemName(e.target.value)}
                placeholder="Full name"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Roll No / Staff Code</label>
              <input
                type="text"
                value={memRoll}
                onChange={(e) => setMemRoll(e.target.value)}
                placeholder="Auto-assigned if blank"
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Division / Department</label>
              <select
                value={memDept || activeInstitution.departmentsOrClasses[0]}
                onChange={(e) => setMemDept(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200"
              >
                {activeInstitution.departmentsOrClasses.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-sky-700 hover:bg-sky-800 text-white font-black cursor-pointer"
            >
              + Save Campus Member
            </button>
          </form>

          <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-sm font-black text-slate-900">
              Tenant Roster &amp; Attendance ({instMembers.length})
            </h2>
            {instMembers.length === 0 ? (
              <p className="text-xs text-slate-500">Add your first student or faculty member on the left.</p>
            ) : (
              <div className="space-y-2">
                {instMembers.map((m) => (
                  <div key={m.id} className="p-3 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-black uppercase mr-2">
                        {m.role}
                      </span>
                      <span className="font-black text-slate-900">{m.fullName}</span>
                      <span className="text-slate-500 ml-2">
                        {m.rollOrCode} · {m.classOrDepartment} · Att: {m.attendancePresent}/{m.attendanceTotal}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleMarkAttendance(m.id, true)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold cursor-pointer"
                      >
                        Present
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMarkAttendance(m.id, false)}
                        className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-800 font-bold cursor-pointer"
                      >
                        Absent
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TIMETABLE & ACADEMIC CALENDAR */}
      {isSchoolAdminAuthorized && activeInstitution && zoneTab === 'timetable' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-slate-900">
              Weekly Academic Timetable ({activeInstitution.departmentsOrClasses[0]})
            </h2>
            <button
              type="button"
              onClick={() => window.print()}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Timetable</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-slate-200">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-2.5 border border-slate-700">Period / Time</th>
                  <th className="p-2.5 border border-slate-700">Mon</th>
                  <th className="p-2.5 border border-slate-700">Tue</th>
                  <th className="p-2.5 border border-slate-700">Wed</th>
                  <th className="p-2.5 border border-slate-700">Thu</th>
                  <th className="p-2.5 border border-slate-700">Fri</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['P1 · 08:30', 'Mathematics', 'Science / Lab', 'Mathematics', 'English', 'Mathematics'],
                  ['P2 · 09:15', 'English', 'Mathematics', 'Social Science', 'Science / Lab', 'Language II'],
                  ['P3 · 10:00', 'Science / Lab', 'Social Science', 'English', 'Mathematics', 'Practical Lab'],
                  ['P4 · 11:00', 'Language II', 'Computer / AI', 'Science', 'Skill Period', 'Sports / Yoga'],
                ].map((row, idx) => (
                  <tr key={idx} className="even:bg-slate-50">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 border border-slate-200 font-bold text-slate-800">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* EXAMS, GPA & REPORT CARDS TAB */}
      {isSchoolAdminAuthorized && activeInstitution && zoneTab === 'exams' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <form
            onSubmit={handleSaveExamResult}
            className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs"
          >
            <h2 className="text-sm font-black text-slate-900">Record Exam Score &amp; Generate Report Card</h2>
            {instStudents.length === 0 ? (
              <p className="text-slate-500">Add students in Students &amp; Faculty tab first.</p>
            ) : (
              <>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Select Student</label>
                  <select
                    value={examMemberId || instStudents[0]?.id}
                    onChange={(e) => setExamMemberId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    {instStudents.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.fullName} ({s.rollOrCode})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Examination Name</label>
                  <input
                    type="text"
                    value={examTitle}
                    onChange={(e) => setExamTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Overall Percentage (%)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={examMarksPct}
                    onChange={(e) => setExamMarksPct(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black cursor-pointer"
                >
                  Save Marks &amp; Compute GPA
                </button>
              </>
            )}
          </form>

          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-sm font-black text-slate-900">Report Cards &amp; Certificates</h2>
            {instStudents.map((s) => {
              const info = typeof s.latestMarksPct === 'number' ? computeGradeAndGpa(s.latestMarksPct) : null;
              return (
                <div key={s.id} className="p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <div className="font-black text-slate-900">
                      {s.fullName} ({s.classOrDepartment})
                    </div>
                    <div className="text-slate-600">
                      {info
                        ? `${s.latestExamName}: ${s.latestMarksPct}% · Grade ${info.grade} · GPA ${info.gpa}`
                        : 'No exam marks recorded yet'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPrintingReportStudent(s)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    Preview Report Card
                  </button>
                </div>
              );
            })}

            {printingReportStudent && (
              <div className="p-5 rounded-2xl border-2 border-indigo-300 bg-indigo-50/40 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <strong className="text-sm text-slate-950">
                    OFFICIAL ACADEMIC REPORT CARD — {activeInstitution.institutionName}
                  </strong>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        const grade =
                          typeof printingReportStudent.latestMarksPct === 'number'
                            ? computeGradeAndGpa(printingReportStudent.latestMarksPct)
                            : { grade: 'N/A', gpa: 'N/A' };
                        downloadTextAsPdf({
                          title: `Academic Report Card - ${printingReportStudent.fullName}`,
                          subtitle: `${activeInstitution.institutionName} (${activeInstitution.academicYear || '2026–27'})`,
                          metaLines: [
                            `Roll / Code: ${printingReportStudent.rollOrCode} | Division: ${printingReportStudent.classOrDepartment}`,
                            `Affiliation: ${activeInstitution.affiliationOrUniversity} | Principal: ${activeInstitution.principalName}`,
                          ],
                          sections: [
                            {
                              heading: 'Attendance & Academic Performance',
                              body: `Attendance: ${printingReportStudent.attendancePresent} / ${printingReportStudent.attendanceTotal} sessions\nExamination: ${printingReportStudent.latestExamName || 'Term Evaluation'}\nScore: ${printingReportStudent.latestMarksPct ?? '--'}%\nGrade: ${grade.grade}\nGPA: ${grade.gpa}`,
                            },
                          ],
                          filename: `report_card_${printingReportStudent.fullName}`,
                        });
                      }}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold cursor-pointer inline-flex items-center gap-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-3 py-1 rounded-lg bg-slate-900 text-white font-bold cursor-pointer"
                    >
                      Print
                    </button>
                  </div>
                </div>
                <div>
                  Student: <strong>{printingReportStudent.fullName}</strong> ({printingReportStudent.rollOrCode}) ·{' '}
                  {printingReportStudent.classOrDepartment}
                </div>
                <div>
                  Attendance: {printingReportStudent.attendancePresent}/{printingReportStudent.attendanceTotal} sessions ·{' '}
                  Exam: {printingReportStudent.latestExamName || 'Term Evaluation'} ({printingReportStudent.latestMarksPct ?? '--'}%)
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* NOTICES TAB */}
      {isSchoolAdminAuthorized && activeInstitution && zoneTab === 'notices' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <form
            onSubmit={handlePublishNotice}
            className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs"
          >
            <h2 className="text-sm font-black text-slate-900">Publish Campus Notice / Circular</h2>
            <input
              type="text"
              required
              value={noticeTitle}
              onChange={(e) => setNoticeTitle(e.target.value)}
              placeholder="Notice headline"
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
            <select
              value={noticeAudience}
              onChange={(e) => setNoticeAudience(e.target.value as InstitutionNotice['audience'])}
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            >
              <option value="All Campus">All Campus (Students, Parents &amp; Faculty)</option>
              <option value="Students Only">Students Only</option>
              <option value="Faculty & Staff">Faculty &amp; Staff</option>
            </select>
            <textarea
              rows={3}
              required
              value={noticeBody}
              onChange={(e) => setNoticeBody(e.target.value)}
              placeholder="Circular details, dates, and instructions..."
              className="w-full px-3 py-2 rounded-xl border border-slate-200"
            />
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-700 text-white font-black cursor-pointer"
            >
              Publish Notice
            </button>
          </form>

          <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2.5">
            <h2 className="text-sm font-black text-slate-900">Active Campus Circulars ({instNotices.length})</h2>
            {instNotices.length === 0 ? (
              <p className="text-xs text-slate-500">No circulars published yet.</p>
            ) : (
              instNotices.map((n) => (
                <div key={n.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900">{n.title}</strong>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 text-[10px] font-bold">
                      {n.audience} · {n.publishedAt}
                    </span>
                  </div>
                  <p className="text-slate-700">{n.body}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
