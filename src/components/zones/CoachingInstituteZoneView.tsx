import React, { useEffect, useMemo, useState } from 'react';
import { ALL_18_SKILL_PROGRAMS } from '../../data/skillPrograms/skillProgramsCatalog';
import type {
  CoachingInstituteRecord,
  IndependentSkillEnrollment,
  InstituteBatchRecord,
  InstituteStudentRecord,
  SkillCourseLevel,
  SkillProgramCategory,
  SkillProgramCurriculum,
  SkillProgramSummary,
} from '../../data/skillPrograms/skillProgramsTypes';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  CreditCard,
  Eye,
  EyeOff,
  FileText,
  GraduationCap,
  Layers,
  Plus,
  Printer,
  Search,
  Sparkles,
  Trophy,
  UserCheck,
  Users,
} from 'lucide-react';

const ENROLLMENTS_STORAGE_KEY = 'msz_skill_enrollments_v1';
const INSTITUTES_STORAGE_KEY = 'msz_coaching_institutes_v1';
const BATCHES_STORAGE_KEY = 'msz_coaching_batches_v1';
const INST_STUDENTS_STORAGE_KEY = 'msz_coaching_students_v1';

const CATEGORIES: Array<'All' | SkillProgramCategory> = [
  'All',
  'Numbers & Speed Maths',
  'Language & Communication',
  'Mind Sports & Logic',
  'Coding, Art & Creativity',
  'Wellness, Olympiad & Life Skills',
];

function safeReadJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWriteJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

async function loadProgramCurriculum(programId: string): Promise<SkillProgramCurriculum | null> {
  const index = ALL_18_SKILL_PROGRAMS.findIndex((p) => p.id === programId);
  if (index === -1) return null;
  if (index < 9) {
    const mod = await import('../../data/skillPrograms/skillProgramsCurriculumPart1');
    return mod.SKILL_CURRICULA_PART_1[programId] || null;
  }
  const mod = await import('../../data/skillPrograms/skillProgramsCurriculumPart2');
  return mod.SKILL_CURRICULA_PART_2[programId] || null;
}

export interface CoachingInstituteZoneViewProps {
  userId: string;
  userName: string;
  initialMode?: 'programs' | 'institute';
  onNavigateTab: (tab: string) => void;
  onOpenAuth?: (tab?: 'login' | 'teacher' | 'register') => void;
  onBackHome: () => void;
}

export const CoachingInstituteZoneView: React.FC<CoachingInstituteZoneViewProps> = ({
  userId,
  userName,
  initialMode = 'programs',
  onNavigateTab,
  onBackHome,
}) => {
  const [zoneMode, setZoneMode] = useState<'programs' | 'institute'>(initialMode);
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillProgramCategory>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Program Explorer & Learning Player state
  const [selectedProgram, setSelectedProgram] = useState<SkillProgramSummary | null>(null);
  const [loadedCurriculum, setLoadedCurriculum] = useState<SkillProgramCurriculum | null>(null);
  const [loadingCurriculum, setLoadingCurriculum] = useState<boolean>(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
  const [courseViewTab, setCourseViewTab] = useState<'lessons' | 'worksheets' | 'quiz' | 'certificate'>('lessons');
  const [revealedExerciseAnswers, setRevealedExerciseAnswers] = useState<Record<number, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [projectSubmissionText, setProjectSubmissionText] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<'All' | SkillCourseLevel>('All');

  // Independent Enrolments (Decoupled from institutes)
  const [enrollments, setEnrollments] = useState<IndependentSkillEnrollment[]>(() =>
    safeReadJson<IndependentSkillEnrollment[]>(ENROLLMENTS_STORAGE_KEY, [])
  );

  // Institute Portal state (Multi-tenant separated by instituteId & ownerUserId)
  const [institutes, setInstitutes] = useState<CoachingInstituteRecord[]>(() =>
    safeReadJson<CoachingInstituteRecord[]>(INSTITUTES_STORAGE_KEY, [])
  );
  const [batches, setBatches] = useState<InstituteBatchRecord[]>(() =>
    safeReadJson<InstituteBatchRecord[]>(BATCHES_STORAGE_KEY, [])
  );
  const [instituteStudents, setInstituteStudents] = useState<InstituteStudentRecord[]>(() =>
    safeReadJson<InstituteStudentRecord[]>(INST_STUDENTS_STORAGE_KEY, [])
  );
  const [activeInstituteId, setActiveInstituteId] = useState<string>(() => {
    const list = safeReadJson<CoachingInstituteRecord[]>(INSTITUTES_STORAGE_KEY, []);
    return list[0]?.id || '';
  });
  const [instSubTab, setInstSubTab] = useState<'batches' | 'students' | 'fees' | 'register'>('batches');

  // Institute registration form state
  const [regInstName, setRegInstName] = useState<string>('');
  const [regInstType, setRegInstType] = useState<CoachingInstituteRecord['instituteType']>('Abacus & Vedic Maths Centre');
  const [regCity, setRegCity] = useState<string>('');
  const [regDirector, setRegDirector] = useState<string>(userName || '');
  const [regPhone, setRegPhone] = useState<string>('');
  const [regPrograms, setRegPrograms] = useState<string[]>(['abacus', 'vedic-maths', 'mental-maths']);

  // Batch creation state
  const [newBatchName, setNewBatchName] = useState<string>('');
  const [newBatchProgram, setNewBatchProgram] = useState<string>('abacus');
  const [newBatchTrainer, setNewBatchTrainer] = useState<string>('');
  const [newBatchSchedule, setNewBatchSchedule] = useState<string>('Mon-Wed-Fri · 5:00 PM');

  // Student admission state inside Institute
  const [stuName, setStuName] = useState<string>('');
  const [stuMobile, setStuMobile] = useState<string>('');
  const [stuGrade, setStuGrade] = useState<string>('Class 5');
  const [stuBatchId, setStuBatchId] = useState<string>('');
  const [stuFeeTotal, setStuFeeTotal] = useState<number>(2500);
  const [stuFeePaid, setStuFeePaid] = useState<number>(1000);
  const [zoneNotice, setZoneNotice] = useState<string | null>(null);

  useEffect(() => {
    safeWriteJson(ENROLLMENTS_STORAGE_KEY, enrollments);
  }, [enrollments]);

  useEffect(() => {
    safeWriteJson(INSTITUTES_STORAGE_KEY, institutes);
  }, [institutes]);

  useEffect(() => {
    safeWriteJson(BATCHES_STORAGE_KEY, batches);
  }, [batches]);

  useEffect(() => {
    safeWriteJson(INST_STUDENTS_STORAGE_KEY, instituteStudents);
  }, [instituteStudents]);

  const myEnrollments = useMemo(
    () => enrollments.filter((e) => e.userId === userId),
    [enrollments, userId]
  );

  const visiblePrograms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return ALL_18_SKILL_PROGRAMS.filter((p) => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (q) {
        return (
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  const activeEnrollment = useMemo(() => {
    if (!selectedProgram) return null;
    return myEnrollments.find((e) => e.programId === selectedProgram.id) || null;
  }, [myEnrollments, selectedProgram]);

  const openProgramPlayer = async (program: SkillProgramSummary) => {
    setSelectedProgram(program);
    setActiveLessonIndex(0);
    setCourseViewTab('lessons');
    setRevealedExerciseAnswers({});
    setQuizAnswers({});
    setQuizSubmitted(false);
    setLevelFilter('All');
    setLoadingCurriculum(true);
    try {
      const data = await loadProgramCurriculum(program.id);
      setLoadedCurriculum(data);
    } finally {
      setLoadingCurriculum(false);
    }
  };

  const handleIndependentEnroll = (program: SkillProgramSummary) => {
    if (myEnrollments.some((e) => e.programId === program.id)) {
      void openProgramPlayer(program);
      return;
    }
    const newRec: IndependentSkillEnrollment = {
      id: `enr_${Date.now().toString(36)}`,
      userId,
      studentName: userName || 'Learner',
      programId: program.id,
      programTitle: program.title,
      enrolledAt: new Date().toISOString().slice(0, 10),
      completedModuleIds: [],
    };
    setEnrollments((prev) => [newRec, ...prev]);
    setZoneNotice(`Independently enrolled in "${program.title}". No institute membership required!`);
    void openProgramPlayer(program);
  };

  const toggleModuleComplete = (moduleId: string) => {
    if (!selectedProgram) return;
    setEnrollments((prev) => {
      const existing = prev.find((e) => e.userId === userId && e.programId === selectedProgram.id);
      if (!existing) {
        const created: IndependentSkillEnrollment = {
          id: `enr_${Date.now().toString(36)}`,
          userId,
          studentName: userName || 'Learner',
          programId: selectedProgram.id,
          programTitle: selectedProgram.title,
          enrolledAt: new Date().toISOString().slice(0, 10),
          completedModuleIds: [moduleId],
        };
        return [created, ...prev];
      }
      return prev.map((e) => {
        if (e.id !== existing.id) return e;
        const exists = e.completedModuleIds.includes(moduleId);
        return {
          ...e,
          completedModuleIds: exists
            ? e.completedModuleIds.filter((id) => id !== moduleId)
            : [...e.completedModuleIds, moduleId],
        };
      });
    });
  };

  const handleSubmitSkillQuiz = () => {
    if (!loadedCurriculum || !selectedProgram) return;
    let score = 0;
    loadedCurriculum.quiz.forEach((q) => {
      if (quizAnswers[q.id] === q.correctIndex) score += 1;
    });
    const total = loadedCurriculum.quiz.length;
    setQuizSubmitted(true);

    setEnrollments((prev) => {
      const existing = prev.find((e) => e.userId === userId && e.programId === selectedProgram.id);
      const passed = score * 100 >= total * 60;
      const certCode = passed ? `MSZ-SKL-${selectedProgram.number}-${Date.now().toString().slice(-4)}` : undefined;
      if (!existing) {
        return [
          {
            id: `enr_${Date.now().toString(36)}`,
            userId,
            studentName: userName || 'Learner',
            programId: selectedProgram.id,
            programTitle: selectedProgram.title,
            enrolledAt: new Date().toISOString().slice(0, 10),
            completedModuleIds: [],
            quizBestScore: score,
            quizTotal: total,
            certificateIssuedAt: passed ? new Date().toISOString().slice(0, 10) : undefined,
            certificateCode: certCode,
          },
          ...prev,
        ];
      }
      return prev.map((e) => {
        if (e.id !== existing.id) return e;
        const best = Math.max(e.quizBestScore || 0, score);
        const nowPassed = best * 100 >= total * 60;
        return {
          ...e,
          quizBestScore: best,
          quizTotal: total,
          certificateIssuedAt: e.certificateIssuedAt || (nowPassed ? new Date().toISOString().slice(0, 10) : undefined),
          certificateCode: e.certificateCode || (nowPassed ? certCode : undefined),
        };
      });
    });
  };

  const handleRegisterInstitute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regInstName.trim() || !regCity.trim()) return;
    const newInst: CoachingInstituteRecord = {
      id: `inst_${Date.now().toString(36)}`,
      ownerUserId: userId,
      instituteName: regInstName.trim(),
      instituteType: regInstType,
      city: regCity.trim(),
      contactPhone: regPhone.trim() || 'Not provided',
      directorName: regDirector.trim() || userName || 'Director',
      programIdsOffered: regPrograms.length > 0 ? regPrograms : ['abacus'],
      createdAt: new Date().toISOString().slice(0, 10),
      published: true,
    };
    setInstitutes((prev) => [newInst, ...prev]);
    setActiveInstituteId(newInst.id);
    setRegInstName('');
    setRegCity('');
    setRegPhone('');
    setInstSubTab('batches');
    setZoneNotice(`Institute "${newInst.instituteName}" registered with isolated tenant ID ${newInst.id}.`);
  };

  const activeInstitute = useMemo(
    () => institutes.find((i) => i.id === activeInstituteId) || institutes[0] || null,
    [institutes, activeInstituteId]
  );

  const instituteBatches = useMemo(
    () => (activeInstitute ? batches.filter((b) => b.instituteId === activeInstitute.id) : []),
    [batches, activeInstitute]
  );

  const activeInstStudents = useMemo(
    () => (activeInstitute ? instituteStudents.filter((s) => s.instituteId === activeInstitute.id) : []),
    [instituteStudents, activeInstitute]
  );

  const handleCreateBatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInstitute || !newBatchName.trim()) return;
    const batch: InstituteBatchRecord = {
      id: `batch_${Date.now().toString(36)}`,
      instituteId: activeInstitute.id,
      batchName: newBatchName.trim(),
      programId: newBatchProgram,
      trainerName: newBatchTrainer.trim() || activeInstitute.directorName,
      schedule: newBatchSchedule.trim(),
      studentIds: [],
    };
    setBatches((prev) => [batch, ...prev]);
    setNewBatchName('');
    setNewBatchTrainer('');
    setZoneNotice(`Created batch "${batch.batchName}" under ${activeInstitute.instituteName}.`);
  };

  const handleAddInstituteStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInstitute || !stuName.trim()) return;
    const targetBatchId = stuBatchId || instituteBatches[0]?.id || 'unassigned';
    const targetBatch = instituteBatches.find((b) => b.id === targetBatchId);
    const stu: InstituteStudentRecord = {
      id: `istu_${Date.now().toString(36)}`,
      instituteId: activeInstitute.id,
      name: stuName.trim(),
      mobile: stuMobile.trim() || 'Not specified',
      grade: stuGrade,
      programId: targetBatch?.programId || activeInstitute.programIdsOffered[0] || 'abacus',
      batchId: targetBatchId,
      feeTotalInr: Number(stuFeeTotal) || 0,
      feePaidInr: Number(stuFeePaid) || 0,
      attendancePresent: 1,
      attendanceTotal: 1,
    };
    setInstituteStudents((prev) => [stu, ...prev]);
    setStuName('');
    setStuMobile('');
    setZoneNotice(`Enrolled "${stu.name}" in ${activeInstitute.instituteName}.`);
  };

  const handleMarkAttendance = (studentId: string, present: boolean) => {
    setInstituteStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? {
              ...s,
              attendancePresent: s.attendancePresent + (present ? 1 : 0),
              attendanceTotal: s.attendanceTotal + 1,
            }
          : s
      )
    );
  };

  const handleCollectFee = (studentId: string, addAmount: number) => {
    setInstituteStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, feePaidInr: Math.min(s.feeTotalInr, s.feePaidInr + addAmount) }
          : s
      )
    );
  };

  const handleIssueInstituteCertificate = (studentId: string) => {
    setInstituteStudents((prev) =>
      prev.map((s) =>
        s.id === studentId
          ? { ...s, certificateCode: s.certificateCode || `MSZ-INST-${Date.now().toString().slice(-5)}` }
          : s
      )
    );
  };

  const filteredModules = useMemo(() => {
    if (!loadedCurriculum) return [];
    if (levelFilter === 'All') return loadedCurriculum.modules;
    return loadedCurriculum.modules.filter((m) => m.level === levelFilter);
  }, [loadedCurriculum, levelFilter]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-700/40 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              if (selectedProgram) {
                setSelectedProgram(null);
                setLoadedCurriculum(null);
              } else {
                onBackHome();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{selectedProgram ? 'All 18 Skill Programs' : 'Back to Home'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setZoneMode('programs');
                setSelectedProgram(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                zoneMode === 'programs'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>18 Programs · Independent Learning</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setZoneMode('institute');
                setSelectedProgram(null);
                if (institutes.length === 0) setInstSubTab('register');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-all flex items-center gap-1.5 ${
                zoneMode === 'institute'
                  ? 'bg-emerald-400 text-slate-950 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Institute &amp; Academy Portal ({institutes.length})</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/40 text-amber-200 text-xs font-black uppercase tracking-wider">
              Coaching &amp; Skill Development Zone
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-400/20 border border-emerald-300/40 text-emerald-200 text-xs font-bold">
              {myEnrollments.length} Active Personal Enrolment{myEnrollments.length === 1 ? '' : 's'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
            {selectedProgram
              ? `${selectedProgram.number}. ${selectedProgram.title}`
              : zoneMode === 'institute'
              ? 'Coaching Class, Abacus & Skill Academy Management'
              : '18 Verified Skill & Coaching Development Programs'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            {selectedProgram
              ? selectedProgram.tagline
              : zoneMode === 'institute'
              ? 'Register and manage independent coaching classes, Abacus/Vedic Maths centres, and skill academies with batch allocation, attendance, fee ledgers, and certificates.'
              : 'Every student can enrol independently in Abacus, Vedic Maths, Phonics, Chess, Rubik\'s Cube, Coding, Yoga, Olympiad & more — zero institute required!'}
          </p>
        </div>
      </div>

      {zoneNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{zoneNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setZoneNotice(null)}
            className="text-emerald-700 hover:text-emerald-950 text-xs font-black cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* VIEW 1: SPECIFIC SKILL COURSE PLAYER */}
      {zoneMode === 'programs' && selectedProgram && (
        <div className="space-y-5">
          {/* Sub-Nav Bar inside Course Player */}
          <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'lessons' as const, label: 'Step-by-Step Lessons', icon: BookOpen },
                { id: 'worksheets' as const, label: 'Worksheets & Project', icon: FileText },
                { id: 'quiz' as const, label: 'Scored Assessment Quiz', icon: ClipboardCheck },
                { id: 'certificate' as const, label: 'Progress & Certificate', icon: Award },
              ].map((t) => {
                const Icon = t.icon;
                const active = courseViewTab === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCourseViewTab(t.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer flex items-center gap-1.5 transition-all ${
                      active
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              {selectedProgram.recommendedLinkedRoute && (
                <button
                  type="button"
                  onClick={() => onNavigateTab(selectedProgram.recommendedLinkedRoute!)}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-bold cursor-pointer"
                >
                  Open Companion Practice Studio
                </button>
              )}
              {!activeEnrollment ? (
                <button
                  type="button"
                  onClick={() => handleIndependentEnroll(selectedProgram)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black cursor-pointer shadow-xs"
                >
                  + Enrol Independently (Free Tracking)
                </button>
              ) : (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-black">
                  ✓ Enrolled ({activeEnrollment.completedModuleIds.length}/{loadedCurriculum?.modules.length || 3} Levels Done)
                </span>
              )}
            </div>
          </div>

          {loadingCurriculum && (
            <div className="p-8 bg-white rounded-3xl border border-slate-200 text-center text-xs font-bold text-slate-600">
              Loading verified curriculum modules, worked examples, and quiz bank...
            </div>
          )}

          {/* LESSONS TAB */}
          {!loadingCurriculum && loadedCurriculum && courseViewTab === 'lessons' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left Module List */}
              <div className="lg:col-span-4 space-y-3">
                <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xs font-black uppercase tracking-wider text-slate-700">
                      Curriculum Levels
                    </h2>
                    <select
                      value={levelFilter}
                      onChange={(e) => {
                        setLevelFilter(e.target.value as 'All' | SkillCourseLevel);
                        setActiveLessonIndex(0);
                      }}
                      className="text-xs font-bold border border-slate-200 rounded-lg px-2 py-1 bg-slate-50 cursor-pointer"
                    >
                      <option value="All">All Levels (3)</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    {filteredModules.map((mod, idx) => {
                      const isDone = activeEnrollment?.completedModuleIds.includes(mod.id);
                      const isSel = activeLessonIndex === idx;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => {
                            setActiveLessonIndex(idx);
                            setRevealedExerciseAnswers({});
                          }}
                          className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer space-y-1 ${
                            isSel
                              ? 'bg-indigo-50 border-indigo-400 shadow-2xs'
                              : 'bg-white hover:bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                                mod.level === 'Beginner'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : mod.level === 'Intermediate'
                                  ? 'bg-amber-100 text-amber-900'
                                  : 'bg-purple-100 text-purple-900'
                              }`}
                            >
                              {mod.level}
                            </span>
                            <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {mod.durationMinutes} min
                            </span>
                          </div>
                          <div className="text-xs font-black text-slate-900 leading-snug">
                            {mod.title}
                          </div>
                          {isDone && (
                            <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Completed
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div>
                      <strong>Prerequisites:</strong> {loadedCurriculum.prerequisites}
                    </div>
                    <div>
                      <strong>Materials:</strong> {loadedCurriculum.materialsNeeded.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Active Lesson Detail */}
              <div className="lg:col-span-8">
                {(() => {
                  const mod = filteredModules[activeLessonIndex] || filteredModules[0];
                  if (!mod) return null;
                  const isDone = activeEnrollment?.completedModuleIds.includes(mod.id);
                  return (
                    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-xs space-y-6">
                      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                        <div className="space-y-1">
                          <span className="text-[11px] font-black uppercase tracking-wider text-indigo-700">
                            {mod.level} Module · {mod.durationMinutes} Minutes
                          </span>
                          <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
                            {mod.title}
                          </h2>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleModuleComplete(mod.id)}
                          className={`px-4 py-2 rounded-xl text-xs font-black cursor-pointer transition-colors flex items-center gap-1.5 ${
                            isDone
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>{isDone ? 'Completed ✓' : 'Mark Lesson Complete'}</span>
                        </button>
                      </div>

                      {/* Learning Objectives */}
                      <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1.5">
                        <h3 className="text-xs font-black text-sky-950 uppercase tracking-wider">
                          Learning Objectives
                        </h3>
                        <ul className="list-disc pl-5 space-y-1 text-xs text-slate-800 font-medium">
                          {mod.objectives.map((obj, idx) => (
                            <li key={idx}>{obj}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Core Concept Explanation */}
                      <div className="space-y-2.5">
                        <h3 className="text-sm font-black text-slate-900">
                          Step-by-Step Method &amp; Concept Rules
                        </h3>
                        {mod.conceptExplanation.map((para, idx) => (
                          <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                            {para}
                          </p>
                        ))}
                      </div>

                      {/* Worked Examples */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-black text-slate-900">Worked Examples</h3>
                        {mod.workedExamples.map((ex, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200 space-y-2">
                            <div className="text-xs font-black text-indigo-950">{ex.prompt}</div>
                            <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
                              {ex.steps.map((step, sIdx) => (
                                <li key={sIdx}>{step}</li>
                              ))}
                            </ol>
                            <div className="text-xs font-black text-emerald-800 bg-emerald-100/70 inline-block px-2.5 py-1 rounded-lg">
                              Result: {ex.finalAnswer}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Practice Exercises with Hidden-by-Default Answer Keys */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-black text-slate-900">
                          Guided Practice Exercises ({mod.practiceExercises.length})
                        </h3>
                        <div className="space-y-2.5">
                          {mod.practiceExercises.map((ex) => {
                            const isShown = Boolean(revealedExerciseAnswers[ex.qNo]);
                            return (
                              <div key={ex.qNo} className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="text-xs font-bold text-slate-900">
                                    Q{ex.qNo}. {ex.question}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setRevealedExerciseAnswers((prev) => ({
                                        ...prev,
                                        [ex.qNo]: !prev[ex.qNo],
                                      }))
                                    }
                                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold cursor-pointer flex items-center gap-1"
                                  >
                                    {isShown ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                    <span>{isShown ? 'Hide Answer' : 'Check Answer'}</span>
                                  </button>
                                </div>
                                {ex.hint && !isShown && (
                                  <p className="text-[11px] text-slate-500">Hint: {ex.hint}</p>
                                )}
                                {isShown && (
                                  <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                                    Answer: {ex.answer}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* WORKSHEETS & CAPSTONE PROJECT TAB */}
          {!loadingCurriculum && loadedCurriculum && courseViewTab === 'worksheets' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-black text-slate-900">
                    Printable Practice Worksheets
                  </h2>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold cursor-pointer flex items-center gap-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Sheet</span>
                  </button>
                </div>
                {loadedCurriculum.worksheetActivities.map((ws, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
                    <h3 className="text-sm font-black text-slate-900">{ws.title}</h3>
                    <p className="text-xs text-slate-600">{ws.instructions}</p>
                    <ul className="space-y-1.5 text-xs font-bold text-slate-800 pt-1">
                      {ws.tasks.map((t, idx) => (
                        <li key={idx} className="p-2 rounded-xl bg-white border border-amber-100">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h2 className="text-base font-black text-slate-900">
                  Capstone Project: {loadedCurriculum.capstoneProject.title}
                </h2>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {loadedCurriculum.capstoneProject.brief}
                </p>
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <span className="text-[11px] font-black uppercase text-slate-600">Evaluation Rubric</span>
                  <ul className="list-disc pl-5 text-xs text-slate-700 space-y-1">
                    {loadedCurriculum.capstoneProject.rubric.map((r, idx) => (
                      <li key={idx}>{r}</li>
                    ))}
                  </ul>
                </div>
                <textarea
                  rows={4}
                  value={projectSubmissionText}
                  onChange={(e) => setProjectSubmissionText(e.target.value)}
                  placeholder="Write your project notes, observations, or link your practice log here..."
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!projectSubmissionText.trim()) return;
                    setEnrollments((prev) =>
                      prev.map((e) =>
                        e.userId === userId && e.programId === selectedProgram.id
                          ? { ...e, projectSubmittedNote: projectSubmissionText.trim() }
                          : e
                      )
                    );
                    setZoneNotice('Capstone project notes saved to your independent learner profile.');
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black cursor-pointer"
                >
                  Save Project Submission
                </button>
              </div>
            </div>
          )}

          {/* QUIZ TAB */}
          {!loadingCurriculum && loadedCurriculum && courseViewTab === 'quiz' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-base font-black text-slate-900">
                    Skill Certification Quiz ({loadedCurriculum.quiz.length} Questions)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Score 60% or above to unlock your printable Skill Completion Certificate.
                  </p>
                </div>
                {quizSubmitted && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizSubmitted(false);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                  >
                    Retake Quiz
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {loadedCurriculum.quiz.map((q, idx) => {
                  const chosen = quizAnswers[q.id];
                  return (
                    <div key={q.id} className="p-4 rounded-2xl border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-black text-slate-900">
                          {idx + 1}. {q.question}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[10px] font-bold text-slate-600">
                          {q.level}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = chosen === optIdx;
                          const isCorrect = q.correctIndex === optIdx;
                          let cls = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';
                          if (quizSubmitted) {
                            if (isCorrect) cls = 'bg-emerald-100 border-emerald-400 text-emerald-950';
                            else if (isSelected) cls = 'bg-rose-100 border-rose-400 text-rose-950';
                          } else if (isSelected) {
                            cls = 'bg-indigo-600 border-indigo-700 text-white';
                          }
                          return (
                            <button
                              key={optIdx}
                              type="button"
                              disabled={quizSubmitted}
                              onClick={() =>
                                setQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                              }
                              className={`p-2.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-colors ${cls}`}
                            >
                              {String.fromCharCode(65 + optIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>

                      {quizSubmitted && (
                        <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950">
                          <strong>Explanation:</strong> {q.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  type="button"
                  onClick={handleSubmitSkillQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black cursor-pointer shadow-sm"
                >
                  Submit &amp; Score Assessment
                </button>
              ) : (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm font-black text-indigo-950">
                    Your Score:{' '}
                    {loadedCurriculum.quiz.filter((q) => quizAnswers[q.id] === q.correctIndex).length} /{' '}
                    {loadedCurriculum.quiz.length}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCourseViewTab('certificate')}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                  >
                    View Progress &amp; Certificate
                  </button>
                </div>
              )}
            </div>
          )}

          {/* PROGRESS & CERTIFICATE TAB */}
          {courseViewTab === 'certificate' && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 pb-4">
                <div>
                  <h2 className="text-lg font-black text-slate-900">
                    Skill Program Progress &amp; Completion Certificate
                  </h2>
                  <p className="text-xs text-slate-600">{selectedProgram.certificationRule}</p>
                </div>
                {activeEnrollment?.certificateCode && (
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-black cursor-pointer flex items-center gap-1.5"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print Certificate</span>
                  </button>
                )}
              </div>

              {activeEnrollment?.certificateCode ? (
                <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-indigo-50 border-4 border-double border-amber-400 text-center space-y-3">
                  <Trophy className="w-12 h-12 mx-auto text-amber-500" />
                  <p className="text-[11px] font-black uppercase tracking-widest text-amber-800">
                    MyStudyZone · Certificate of Skill Achievement
                  </p>
                  <h3 className="text-2xl font-display font-black text-slate-900">
                    {activeEnrollment.studentName}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto">
                    has successfully completed the assessment for{' '}
                    <strong>{selectedProgram.title}</strong> ({selectedProgram.category}) as an independent learner.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs font-bold text-slate-600">
                    <span>Best Quiz Score: {activeEnrollment.quizBestScore}/{activeEnrollment.quizTotal}</span>
                    <span>•</span>
                    <span>Certificate ID: {activeEnrollment.certificateCode}</span>
                    <span>•</span>
                    <span>Date: {activeEnrollment.certificateIssuedAt}</span>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <Award className="w-10 h-10 mx-auto text-slate-400" />
                  <h3 className="text-sm font-black text-slate-900">Certificate Locked</h3>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Score at least 60% in the Skill Certification Quiz (3/5) to unlock your official downloadable Certificate ID.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCourseViewTab('quiz')}
                    className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-black cursor-pointer"
                  >
                    Go to Certification Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: ALL 18 PROGRAMS DIRECTORY (DEFAULT) */}
      {zoneMode === 'programs' && !selectedProgram && (
        <div className="space-y-5">
          {/* Search & Category Filter */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Abacus, Vedic Maths, Chess, Rubik's Cube, Phonics..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold"
                />
              </div>
              <span className="text-xs font-bold text-slate-600">
                Showing {visiblePrograms.length} of 18 Learning Programs
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-black cursor-pointer transition-colors ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 18 Programs Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePrograms.map((prog) => {
              const enr = myEnrollments.find((e) => e.programId === prog.id);
              return (
                <div
                  key={prog.id}
                  className="bg-white rounded-3xl p-5 border border-slate-200 hover:border-indigo-300 shadow-xs flex flex-col justify-between gap-4 transition-all"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-[10px] font-black">
                        #{prog.number} · {prog.category}
                      </span>
                      {enr && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black">
                          Enrolled
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-display font-black text-slate-900">
                      {prog.title}
                    </h2>
                    <p className="text-xs text-slate-600 leading-relaxed">{prog.tagline}</p>

                    <div className="flex flex-wrap gap-2 text-[10px] font-bold text-slate-500 pt-1">
                      <span>{prog.ageGroup}</span>
                      <span>•</span>
                      <span>{prog.durationWeeks} Weeks Track</span>
                    </div>

                    <ul className="space-y-1 text-[11px] text-slate-700 pt-1">
                      {prog.outcomes.slice(0, 2).map((o, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleIndependentEnroll(prog)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-indigo-700 text-white text-xs font-black cursor-pointer transition-colors"
                    >
                      {enr ? 'Continue Course' : 'Enrol & Start Learning'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: COACHING INSTITUTE & SKILL ACADEMY OWNER PORTAL */}
      {zoneMode === 'institute' && (
        <div className="space-y-5">
          {/* Sub-Tabs & Institute Selector */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'batches' as const, label: `Batches & Schedule (${instituteBatches.length})`, icon: Layers },
                { id: 'students' as const, label: `Student Roster & Attendance (${activeInstStudents.length})`, icon: Users },
                { id: 'fees' as const, label: 'Fee Ledger & Certificates', icon: CreditCard },
                { id: 'register' as const, label: '+ Register Institute', icon: Plus },
              ].map((t) => {
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setInstSubTab(t.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer flex items-center gap-1.5 ${
                      instSubTab === t.id
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {institutes.length > 0 && (
              <select
                value={activeInstitute?.id || ''}
                onChange={(e) => setActiveInstituteId(e.target.value)}
                className="px-3 py-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-950 text-xs font-black cursor-pointer"
              >
                {institutes.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.instituteName} ({inst.city})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* REGISTER INSTITUTE TAB */}
          {(instSubTab === 'register' || institutes.length === 0) && (
            <form
              onSubmit={handleRegisterInstitute}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 max-w-3xl"
            >
              <h2 className="text-base font-black text-slate-900">
                Register Coaching Institute / Abacus Centre / Skill Academy
              </h2>
              <p className="text-xs text-slate-600">
                Each registered academy maintains isolated student batches, attendance registers, fee ledgers, and completion certificates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institute / Academy Name *</label>
                  <input
                    type="text"
                    required
                    value={regInstName}
                    onChange={(e) => setRegInstName(e.target.value)}
                    placeholder="e.g. BrightMind Abacus & Vedic Academy"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Institute Category</label>
                  <select
                    value={regInstType}
                    onChange={(e) => setRegInstType(e.target.value as CoachingInstituteRecord['instituteType'])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="Abacus & Vedic Maths Centre">Abacus &amp; Vedic Maths Centre</option>
                    <option value="Coaching Class">Coaching Class</option>
                    <option value="Skill Academy">Skill Academy</option>
                    <option value="Multi-Program Institute">Multi-Program Institute</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    placeholder="e.g. Pune"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Director / Coordinator Name</label>
                  <input
                    type="text"
                    value={regDirector}
                    onChange={(e) => setRegDirector(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="10-digit contact"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Programs Offered by Your Institute ({regPrograms.length} selected)
                </label>
                <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {ALL_18_SKILL_PROGRAMS.map((p) => {
                    const checked = regPrograms.includes(p.id);
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() =>
                          setRegPrograms((prev) =>
                            checked ? prev.filter((id) => id !== p.id) : [...prev, p.id]
                          )
                        }
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer border ${
                          checked
                            ? 'bg-emerald-600 text-white border-emerald-700'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        {p.number}. {p.title}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black cursor-pointer"
              >
                Create Coaching Institute Workspace
              </button>
            </form>
          )}

          {/* BATCHES & SCHEDULE TAB */}
          {activeInstitute && instSubTab === 'batches' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <form
                onSubmit={handleCreateBatch}
                className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs"
              >
                <h2 className="text-sm font-black text-slate-900">Create New Batch</h2>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Batch Name *</label>
                  <input
                    type="text"
                    required
                    value={newBatchName}
                    onChange={(e) => setNewBatchName(e.target.value)}
                    placeholder="e.g. Evening Abacus Batch A"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Program</label>
                  <select
                    value={newBatchProgram}
                    onChange={(e) => setNewBatchProgram(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    {ALL_18_SKILL_PROGRAMS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.number}. {p.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Trainer</label>
                  <input
                    type="text"
                    value={newBatchTrainer}
                    onChange={(e) => setNewBatchTrainer(e.target.value)}
                    placeholder={activeInstitute.directorName}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class Schedule</label>
                  <input
                    type="text"
                    value={newBatchSchedule}
                    onChange={(e) => setNewBatchSchedule(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black cursor-pointer"
                >
                  + Add Batch
                </button>
              </form>

              <div className="lg:col-span-7 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                <h2 className="text-sm font-black text-slate-900">
                  Active Batches ({instituteBatches.length})
                </h2>
                {instituteBatches.length === 0 ? (
                  <p className="text-xs text-slate-500">
                    No batches created yet for {activeInstitute.instituteName}. Add your first batch on the left.
                  </p>
                ) : (
                  <div className="space-y-2.5">
                    {instituteBatches.map((b) => {
                      const prog = ALL_18_SKILL_PROGRAMS.find((p) => p.id === b.programId);
                      const count = activeInstStudents.filter((s) => s.batchId === b.id).length;
                      return (
                        <div key={b.id} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <div className="text-xs font-black text-slate-900">{b.batchName}</div>
                            <div className="text-[11px] text-slate-600">
                              {prog?.title} · Trainer: {b.trainerName} · {b.schedule}
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-900 text-[11px] font-black">
                            {count} Students
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STUDENTS & ATTENDANCE TAB */}
          {activeInstitute && instSubTab === 'students' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <form
                onSubmit={handleAddInstituteStudent}
                className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3 text-xs"
              >
                <h2 className="text-sm font-black text-slate-900">Admit Student to Institute</h2>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={stuName}
                    onChange={(e) => setStuName(e.target.value)}
                    placeholder="e.g. Aarav Deshmukh"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Parent Mobile</label>
                    <input
                      type="tel"
                      value={stuMobile}
                      onChange={(e) => setStuMobile(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">School Class</label>
                    <input
                      type="text"
                      value={stuGrade}
                      onChange={(e) => setStuGrade(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assign Batch</label>
                  <select
                    value={stuBatchId}
                    onChange={(e) => setStuBatchId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    {instituteBatches.length === 0 ? (
                      <option value="unassigned">General Batch</option>
                    ) : (
                      instituteBatches.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.batchName}
                        </option>
                      ))
                    )}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Total Course Fee (₹)</label>
                    <input
                      type="number"
                      value={stuFeeTotal}
                      onChange={(e) => setStuFeeTotal(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Paid Today (₹)</label>
                    <input
                      type="number"
                      value={stuFeePaid}
                      onChange={(e) => setStuFeePaid(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black cursor-pointer"
                >
                  + Enrol Student
                </button>
              </form>

              <div className="lg:col-span-8 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
                <h2 className="text-sm font-black text-slate-900">
                  Student Roster &amp; Daily Attendance
                </h2>
                {activeInstStudents.length === 0 ? (
                  <p className="text-xs text-slate-500">No students enrolled yet.</p>
                ) : (
                  <div className="space-y-2.5">
                    {activeInstStudents.map((stu) => (
                      <div key={stu.id} className="p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-black text-slate-900">
                            {stu.name} ({stu.grade})
                          </div>
                          <div className="text-[11px] text-slate-500">
                            Mobile: {stu.mobile} · Attendance: {stu.attendancePresent}/{stu.attendanceTotal} sessions
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleMarkAttendance(stu.id, true)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold cursor-pointer"
                          >
                            + Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMarkAttendance(stu.id, false)}
                            className="px-2.5 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 text-[11px] font-bold cursor-pointer"
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

          {/* FEE LEDGER & CERTIFICATES TAB */}
          {activeInstitute && instSubTab === 'fees' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-black text-slate-900">
                  Institute Fee Ledger &amp; Completion Certificates
                </h2>
                <span className="text-xs font-bold text-emerald-800">
                  Total Collected: ₹{activeInstStudents.reduce((acc, s) => acc + s.feePaidInr, 0)}
                </span>
              </div>

              {activeInstStudents.length === 0 ? (
                <p className="text-xs text-slate-500">Admit students first to track fees and issue certificates.</p>
              ) : (
                <div className="space-y-2.5">
                  {activeInstStudents.map((stu) => {
                    const balance = Math.max(0, stu.feeTotalInr - stu.feePaidInr);
                    return (
                      <div key={stu.id} className="p-3.5 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <div className="text-xs space-y-0.5">
                          <div className="font-black text-slate-900">{stu.name}</div>
                          <div className="text-slate-600">
                            Paid: ₹{stu.feePaidInr} / ₹{stu.feeTotalInr} ·{' '}
                            <strong className={balance === 0 ? 'text-emerald-700' : 'text-amber-700'}>
                              Balance: ₹{balance}
                            </strong>
                          </div>
                          {stu.certificateCode && (
                            <div className="text-emerald-700 font-bold">
                              ✓ Issued Certificate: {stu.certificateCode}
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {balance > 0 && (
                            <button
                              type="button"
                              onClick={() => handleCollectFee(stu.id, balance)}
                              className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-[11px] font-black cursor-pointer"
                            >
                              Mark ₹{balance} Paid
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleIssueInstituteCertificate(stu.id)}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-black cursor-pointer"
                          >
                            {stu.certificateCode ? 'Certificate Ready' : 'Issue Certificate'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
