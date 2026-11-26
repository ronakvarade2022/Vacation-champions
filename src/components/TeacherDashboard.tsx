import React, { useState, useMemo } from 'react';
import {
  Users,
  GraduationCap,
  Calendar,
  BookOpen,
  FileText,
  Award,
  Layers,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building,
  UserCheck,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Send,
  Eye,
  Trash2,
  Filter,
  X,
  Wrench,
  ArrowLeft,
} from 'lucide-react';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { SectionLoadingFallback } from './SectionLoadingFallback';
import { useApp } from '../context/AppContext';
import type {
  ClassLevel,
  EducationBoard,
  StudentProfile,
  SubjectName,
  AssignmentItem,
} from '../types';
import type { InstructionMedium } from '../types/lessonPlanner';
import { ALL_10_CLASSES } from '../data/classCurriculumConfig';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import { getBoardShortLabel } from '../utils/subscriptionAccess';
import { getSubjectsForClass } from '../data/classCurriculumConfig';

const TeacherToolsWorkbench = lazyWithRetry(() =>
  import('./teacher/TeacherToolsWorkbench').then((m) => ({ default: m.TeacherToolsWorkbench }))
);

interface TeacherDashboardProps {
  onNavigateTab: (tab: string, subjectParam?: SubjectName) => void;
  onOpenAdditionalCurriculum?: (ctx: {
    board?: EducationBoard;
    classLevel?: ClassLevel;
    medium?: InstructionMedium;
    subjectId?: string;
  }) => void;
  onSwitchToStudentView?: () => void;
}

type TeacherTab = 'overview' | 'tools' | 'roster' | 'assignments' | 'analytics';

const DIVISIONS = ['All Divisions', 'Div A', 'Div B', 'Div C', 'Div D'];

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  onNavigateTab,
  onOpenAdditionalCurriculum,
  onSwitchToStudentView,
}) => {
  const { currentStudent, studentsList, addStudentAssignment, updateStudentAssignment, updateStudentAttendance, activeBoard } = useApp();

  const [activeTeacherTab, setActiveTeacherTab] = useState<TeacherTab>('overview');
  const [selectedBoard, setSelectedBoard] = useState<EducationBoard>(
    currentStudent?.board || activeBoard || 'Maharashtra'
  );
  const [selectedClass, setSelectedClass] = useState<ClassLevel>(
    currentStudent?.classLevel || 'Class 5'
  );
  const [selectedDivision, setSelectedDivision] = useState<string>('All Divisions');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [assignmentStatusFilter, setAssignmentStatusFilter] = useState<'all' | 'submitted' | 'pending' | 'graded'>('all');
  const [attendanceFeedback, setAttendanceFeedback] = useState<string | null>(null);

  // Assignment creation modal state
  const [showNewAssignmentModal, setShowNewAssignmentModal] = useState<boolean>(false);
  const [asnTitle, setAsnTitle] = useState<string>('');
  const [asnSubject, setAsnSubject] = useState<SubjectName>('Mathematics');
  const [asnDueDate, setAsnDueDate] = useState<string>(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
  );
  const [asnMaxScore, setAsnMaxScore] = useState<number>(20);
  const [asnDescription, setAsnDescription] = useState<string>('');
  const [asnNotice, setAsnNotice] = useState<string | null>(null);

  // Student detail modal state
  const [inspectingStudent, setInspectingStudent] = useState<StudentProfile | null>(null);

  // Evaluation modal state
  const [evaluatingAssignment, setEvaluatingAssignment] = useState<{
    student: StudentProfile;
    assignment: AssignmentItem;
  } | null>(null);
  const [evalScore, setEvalScore] = useState<number>(18);
  const [evalFeedback, setEvalFeedback] = useState<string>('Excellent work! Well explained.');

  const availableSubjects = useMemo(
    () => getSubjectsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  // Filter students for this teacher's selected board, class and division
  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      // Must be a student account
      if (s.accountRole === 'teacher') return false;
      // Filter by board
      if (s.board && s.board !== selectedBoard) return false;
      // Filter by class
      if (s.classLevel && s.classLevel !== selectedClass) return false;
      // Filter by division if specified
      if (selectedDivision !== 'All Divisions' && (s as any).division && (s as any).division !== selectedDivision) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = s.name.toLowerCase().includes(q);
        const matchesEmail = s.email.toLowerCase().includes(q);
        const matchesMobile = (s.mobile || '').includes(q);
        const matchesSchool = (s.schoolName || '').toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesMobile && !matchesSchool) return false;
      }
      return true;
    });
  }, [studentsList, selectedBoard, selectedClass, selectedDivision, searchQuery]);

  // Aggregate assignments from students in this class
  const classAssignmentsList = useMemo(() => {
    const list: Array<{ student: StudentProfile; assignment: AssignmentItem }> = [];
    filteredStudents.forEach((student) => {
      (student.assignments || []).forEach((assignment) => {
        list.push({ student, assignment });
      });
    });
    return list.sort((a, b) => b.assignment.dueDate.localeCompare(a.assignment.dueDate));
  }, [filteredStudents]);

  const filteredAssignmentsList = useMemo(() => {
    if (assignmentStatusFilter === 'all') return classAssignmentsList;
    return classAssignmentsList.filter(({ assignment }) => {
      const s = (assignment.status || '').toLowerCase();
      if (assignmentStatusFilter === 'submitted') return s === 'submitted';
      if (assignmentStatusFilter === 'graded') return s === 'graded' || s === 'evaluated';
      return s === 'pending';
    });
  }, [classAssignmentsList, assignmentStatusFilter]);

  // Performance metrics
  const metrics = useMemo(() => {
    const totalStudents = filteredStudents.length;
    const activeStudents = filteredStudents.filter((s) => (s.streakDays || 0) > 0).length;
    const totalWorksheetsDone = filteredStudents.reduce(
      (sum, s) => sum + (s.completedWorksheetIds?.length || 0),
      0
    );
    const totalPoints = filteredStudents.reduce((sum, s) => sum + (s.points || 0), 0);
    const avgPoints = totalStudents > 0 ? Math.round(totalPoints / totalStudents) : 0;
    const pendingGradingCount = classAssignmentsList.filter(
      (item) => item.assignment.status === 'submitted'
    ).length;

    return {
      totalStudents,
      activeStudents,
      totalWorksheetsDone,
      avgPoints,
      pendingGradingCount,
    };
  }, [filteredStudents, classAssignmentsList]);

  // Create and dispatch an assignment to all matching students
  const handleDispatchAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!asnTitle.trim()) return;

    let dispatchedCount = 0;
    filteredStudents.forEach((student) => {
      addStudentAssignment(student.id, {
        studentId: student.id,
        title: asnTitle.trim(),
        subject: asnSubject,
        dueDate: asnDueDate,
        status: 'PENDING',
        maxScore: Number(asnMaxScore) || 20,
        description: asnDescription.trim() || `Class assignment for ${selectedClass} · ${asnSubject}`,
      });
      dispatchedCount += 1;
    });

    setAsnNotice(
      `Dispatched assignment "${asnTitle.trim()}" to ${dispatchedCount} student(s) in ${selectedBoard} · ${selectedClass}.`
    );
    setAsnTitle('');
    setAsnDescription('');
    setShowNewAssignmentModal(false);
  };

  // Submit evaluation for an assignment
  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingAssignment) return;

    updateStudentAssignment(
      evaluatingAssignment.student.id,
      evaluatingAssignment.assignment.id,
      {
        status: 'graded',
        score: Number(evalScore),
        obtainedScore: Number(evalScore),
        teacherFeedback: evalFeedback.trim(),
      }
    );

    setEvaluatingAssignment(null);
  };

  const handlePrintRoster = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Teacher Command Header */}
      <div className="bg-gradient-to-r from-emerald-850 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-teal-700/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Teacher &amp; Educator Command Center</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
                {currentStudent?.schoolName || 'Central Educational Institute'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              Welcome, {currentStudent?.name || 'Teacher'}!
            </h1>
            {(currentStudent?.qualification || (currentStudent?.teachingSubjects && currentStudent.teachingSubjects.length > 0) || (currentStudent?.classesTaught && currentStudent.classesTaught.length > 0)) && (
              <p className="text-xs font-bold text-emerald-200">
                {[
                  currentStudent?.qualification ? `Qualification: ${currentStudent.qualification}` : '',
                  currentStudent?.teachingSubjects?.length ? `Subjects: ${currentStudent.teachingSubjects.join(', ')}` : '',
                  currentStudent?.classesTaught?.length ? `Classes: ${currentStudent.classesTaught.join(', ')}` : '',
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Manage your classroom roster, track student learning streak and worksheet completion,
              dispatch assignments, and access the verified 3-Tab Lesson Planner for Maharashtra,
              CBSE, and ICSE.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onSwitchToStudentView && (
              <button
                type="button"
                onClick={onSwitchToStudentView}
                className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>Student View Preview</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onNavigateTab('ai-tools')}
              className="px-4 py-2.5 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-white font-black text-xs transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Tools Studio</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTeacherTab('tools')}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4" />
              <span>130 Teacher Tools</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigateTab('lesson-planner')}
              className="px-4 py-2.5 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Open Lesson Planner</span>
            </button>
          </div>
        </div>

        {/* Global Class & Board Filter Strip */}
        <div className="mt-6 pt-5 border-t border-teal-700/40 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-teal-200 uppercase tracking-wider mb-1">
              Select Board
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value as EducationBoard)}
              className="w-full bg-slate-900/80 border border-teal-600/50 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              {BOARD_META_LIST.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.fullName} ({b.shortLabel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-teal-200 uppercase tracking-wider mb-1">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as ClassLevel)}
              className="w-full bg-slate-900/80 border border-teal-600/50 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              {ALL_10_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-teal-200 uppercase tracking-wider mb-1">
              Division / Section
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full bg-slate-900/80 border border-teal-600/50 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              {DIVISIONS.map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {asnNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-bold flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{asnNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setAsnNotice(null)}
            className="text-emerald-700 hover:text-emerald-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'overview' as const, label: 'Overview & Shortcuts', icon: Sparkles },
            { id: 'tools' as const, label: '130 Teacher Tools & Guides', icon: Wrench },
            { id: 'roster' as const, label: `Student Roster (${filteredStudents.length})`, icon: Users },
            { id: 'assignments' as const, label: `Homework & Assignments (${classAssignmentsList.length})`, icon: FileText },
            { id: 'analytics' as const, label: 'Performance Summary', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTeacherTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTeacherTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrintRoster}
            className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Class Report</span>
          </button>
        </div>
      </div>

      {activeTeacherTab !== 'overview' && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-2 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-600">
            <button
              type="button"
              onClick={() => setActiveTeacherTab('overview')}
              className="hover:text-slate-900 underline cursor-pointer"
            >
              Teacher Command Center
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-black text-slate-900">
              {activeTeacherTab === 'tools'
                ? '130 Teacher Tools & Pedagogy Guides'
                : activeTeacherTab === 'roster'
                ? 'Student Roster & Attendance'
                : activeTeacherTab === 'assignments'
                ? 'Homework & Assignments'
                : 'Performance Summary'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTeacherTab('overview')}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-bold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Overview</span>
          </button>
        </div>
      )}

      {/* TAB 1: OVERVIEW & SHORTCUTS */}
      {activeTeacherTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Metrics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Total Enrolled
              </span>
              <div className="text-2xl font-black text-slate-900">{metrics.totalStudents}</div>
              <p className="text-[10px] text-slate-500 font-medium">
                {getBoardShortLabel(selectedBoard)} · {selectedClass}
              </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Active Learning Streaks
              </span>
              <div className="text-2xl font-black text-emerald-600">{metrics.activeStudents}</div>
              <p className="text-[10px] text-emerald-700 font-medium">Regular daily practice</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Worksheets Solved
              </span>
              <div className="text-2xl font-black text-indigo-600">{metrics.totalWorksheetsDone}</div>
              <p className="text-[10px] text-slate-500 font-medium">Cumulative classroom attempts</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Pending Submissions
              </span>
              <div className="text-2xl font-black text-amber-600">{metrics.pendingGradingCount}</div>
              <p className="text-[10px] text-amber-700 font-medium">Awaiting evaluation</p>
            </div>
          </div>

          {/* Quick Learning & Curriculum Launchers */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              <span>Teaching Resources &amp; Class Portals</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              <button
                type="button"
                onClick={() => setActiveTeacherTab('tools')}
                className="p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/70 hover:bg-amber-100/70 transition-all text-left cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-amber-800">
                    130 Teacher Tools &amp; Pedagogy Guides
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    All 8 toolkits across Waves 1–6: Blueprints, Gradebooks, Live Classroom Timer, AI Prompts &amp; Teacher Guides.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 shrink-0 mt-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('lesson-planner')}
                className="p-4 rounded-2xl border border-teal-200 bg-teal-50/50 hover:bg-teal-50 transition-all text-left cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-black">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-teal-700">
                    3-Tab Lesson Planner
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Annual, Monthly, and Daily lesson plans mapped to official textbook chapters.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 shrink-0 mt-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('worksheets')}
                className="p-4 rounded-2xl border border-amber-200 bg-amber-50/50 hover:bg-amber-50 transition-all text-left cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-amber-700">
                    Online Worksheets Hub
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Browse hundreds of auto-graded chapter worksheets across all subjects.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 mt-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('quizzes')}
                className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 transition-all text-left cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black">
                    <Award className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-indigo-700">
                    Subject Quizzes &amp; Drills
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Zero-repetition 4-level question bank for continuous classroom assessments.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 mt-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('study-materials')}
                className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 transition-all text-left cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-emerald-700">
                    Free Study Library
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    Official e-textbooks, chapter tests, video lessons, and printable study sheets.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-2" />
              </button>

              <button
                type="button"
                onClick={() => onNavigateTab('tet-ctet')}
                className="p-4 rounded-2xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 transition-all text-left cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-purple-700 text-white flex items-center justify-center font-black">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-purple-700">
                    TET &amp; CTET Career Zone
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    200 mock examinations, CDP, Pedagogy, and Marathi/English language drills.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 shrink-0 mt-2" />
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onOpenAdditionalCurriculum) {
                    onOpenAdditionalCurriculum({
                      board: selectedBoard,
                      classLevel: selectedClass,
                    });
                  } else {
                    onNavigateTab('additional-curriculum');
                  }
                }}
                className="p-4 rounded-2xl border border-sky-200 bg-sky-50/50 hover:bg-sky-50 transition-all text-left cursor-pointer group flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center font-black">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-black text-slate-900 group-hover:text-sky-700">
                    Additional Curriculum Track
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    GK, Logical Reasoning, Computer, and 10 supplementary enrichment tracks.
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 shrink-0 mt-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: 130 TEACHER TOOLS & TEACHING GUIDES (Lazy Loaded) */}
      {activeTeacherTab === 'tools' && (
        <React.Suspense fallback={<SectionLoadingFallback label="Loading 130 Teacher Tools & Guides..." />}>
          <TeacherToolsWorkbench
            board={selectedBoard}
            classLevel={selectedClass}
            onOpenLessonPlanner={() => onNavigateTab('lesson-planner')}
          />
        </React.Suspense>
      )}

      {/* TAB 2: STUDENT ROSTER & MONITORING */}
      {activeTeacherTab === 'roster' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search students by name, mobile, email..."
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                Showing {filteredStudents.length} student(s) in {selectedBoard} · {selectedClass}
              </span>
            </div>
          </div>

          {attendanceFeedback && (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-between gap-2">
              <span>{attendanceFeedback}</span>
              <button type="button" onClick={() => setAttendanceFeedback(null)} className="cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {filteredStudents.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900">No Students Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No students match {selectedBoard} · {selectedClass} with the active search filter.
                Switch board/class above to view other class rosters.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-extrabold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Student</th>
                      <th className="py-3 px-4">Board &amp; Class</th>
                      <th className="py-3 px-4">Daily Streak</th>
                      <th className="py-3 px-4">Points (XP)</th>
                      <th className="py-3 px-4">Worksheets Solved</th>
                      <th className="py-3 px-4">Attendance (Mark Today)</th>
                      <th className="py-3 px-4">Assignments</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((student) => {
                      const completedWsCount = student.completedWorksheetIds?.length || 0;
                      const studentAsnCount = student.assignments?.length || 0;
                      const hasStreak = (student.streakDays || 0) > 0;
                      const attList = student.attendanceRecords || [];
                      const attPresent = attList.filter((r) => r.status === 'PRESENT').length;
                      const todayIso = new Date().toISOString().slice(0, 10);

                      return (
                        <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl shrink-0">{student.avatar || '🌟'}</span>
                              <div>
                                <div className="font-black text-slate-900">{student.name}</div>
                                <div className="text-[10px] text-slate-500">{student.mobile || student.email}</div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-slate-700">
                              {student.board || selectedBoard} · {student.classLevel || selectedClass}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            {hasStreak ? (
                              <span className="inline-flex items-center gap-1 font-black text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                🔥 {student.streakDays} Days
                              </span>
                            ) : (
                              <span className="text-slate-400 font-medium">Inactive</span>
                            )}
                          </td>

                          <td className="py-3 px-4 font-black text-slate-900 tabular-nums">
                            {student.points || 0} XP
                          </td>

                          <td className="py-3 px-4">
                            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                              {completedWsCount} Solved
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-bold text-slate-700 mr-1">
                                {attPresent}/{attList.length}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  updateStudentAttendance(student.id, {
                                    id: `att_${Date.now().toString(36)}`,
                                    studentId: student.id,
                                    date: todayIso,
                                    status: 'PRESENT',
                                  });
                                  setAttendanceFeedback(`Marked ${student.name} PRESENT for ${todayIso}.`);
                                }}
                                className="px-2 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] cursor-pointer"
                              >
                                P
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  updateStudentAttendance(student.id, {
                                    id: `att_${Date.now().toString(36)}`,
                                    studentId: student.id,
                                    date: todayIso,
                                    status: 'ABSENT',
                                  });
                                  setAttendanceFeedback(`Marked ${student.name} ABSENT for ${todayIso}.`);
                                }}
                                className="px-2 py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-800 font-bold text-[10px] cursor-pointer"
                              >
                                A
                              </button>
                            </div>
                          </td>

                          <td className="py-3 px-4 font-medium text-slate-600">
                            {studentAsnCount > 0 ? (
                              <span className="font-bold text-slate-800">{studentAsnCount} Assigned</span>
                            ) : (
                              <span className="text-slate-400">None</span>
                            )}
                          </td>

                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setInspectingStudent(student)}
                              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-[11px] cursor-pointer transition-colors"
                            >
                              Inspect Details
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: HOMEWORK & ASSIGNMENTS MANAGER */}
      {activeTeacherTab === 'assignments' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div>
              <h2 className="text-sm font-display font-black text-slate-900 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Classroom Homework &amp; Exercises</span>
              </h2>
              <p className="text-[11px] text-slate-500 font-medium">
                Create curriculum tasks for your students, set due dates, and grade their submissions.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowNewAssignmentModal(true)}
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black text-xs cursor-pointer shadow-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Create New Assignment</span>
            </button>
          </div>

          {classAssignmentsList.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-3 rounded-2xl border border-slate-200">
              <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
              {[
                { id: 'all' as const, label: `All (${classAssignmentsList.length})` },
                { id: 'submitted' as const, label: `Submitted / Needs Grading (${metrics.pendingGradingCount})` },
                { id: 'pending' as const, label: 'Pending Student Work' },
                { id: 'graded' as const, label: 'Graded' },
              ].map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setAssignmentStatusFilter(f.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                    assignmentStatusFilter === f.id
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {filteredAssignmentsList.length === 0 ? (
            <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-900">
                {classAssignmentsList.length === 0 ? 'No Assignments Created Yet' : 'No Matching Assignments'}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {classAssignmentsList.length === 0
                  ? `Dispatch homework or revision tasks to all students in ${selectedBoard} · ${selectedClass}.`
                  : 'Try switching the status filter above to see other assignments.'}
              </p>
              {classAssignmentsList.length === 0 && (
                <button
                  type="button"
                  onClick={() => setShowNewAssignmentModal(true)}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer"
                >
                  Create First Assignment
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredAssignmentsList.map(({ student, assignment }) => {
                const isSubmitted = assignment.status === 'submitted' || assignment.status === 'SUBMITTED';
                const isGraded = assignment.status === 'graded' || assignment.status === 'EVALUATED';

                return (
                  <div
                    key={`${student.id}_${assignment.id}`}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-black bg-teal-100 text-teal-900 mr-2">
                            {assignment.subject}
                          </span>
                          <span className="text-xs font-bold text-slate-500">
                            Student: {student.name}
                          </span>
                        </div>

                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            isGraded
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : isSubmitted
                              ? 'bg-amber-100 text-amber-900 border border-amber-300'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {assignment.status}
                        </span>
                      </div>

                      <h3 className="text-sm font-black text-slate-900">{assignment.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{assignment.description}</p>

                      <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>Due: {assignment.dueDate}</span>
                        </span>
                        <span>Max Score: {assignment.maxScore}</span>
                      </div>

                      {assignment.teacherFeedback && (
                        <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
                          <strong>Feedback:</strong> {assignment.teacherFeedback} (Score: {assignment.score}/{assignment.maxScore})
                        </div>
                      )}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEvaluatingAssignment({ student, assignment });
                          setEvalScore(assignment.score || assignment.maxScore);
                          setEvalFeedback(assignment.teacherFeedback || 'Well done! Keep it up.');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs cursor-pointer transition-colors"
                      >
                        {isGraded ? 'Update Grade' : 'Grade / Evaluate'}
                      </button>

                      <span className="text-[10px] text-slate-400">
                        {isSubmitted ? 'Student submitted solution' : isGraded ? 'Graded' : 'Awaiting student submission'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PERFORMANCE SUMMARY & ANALYTICS */}
      {activeTeacherTab === 'analytics' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-display font-black text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Classroom Performance &amp; Mastery Overview</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-xs font-bold text-slate-500">Class Average XP</span>
                <div className="text-2xl font-black text-slate-900">{metrics.avgPoints} Points</div>
                <p className="text-[10px] text-slate-500">Based on regular quizzes and worksheets</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                <span className="text-xs font-bold text-emerald-800">Learning Consistency Rate</span>
                <div className="text-2xl font-black text-emerald-700">
                  {metrics.totalStudents > 0
                    ? Math.round((metrics.activeStudents / metrics.totalStudents) * 100)
                    : 0}
                  %
                </div>
                <p className="text-[10px] text-emerald-800">Students with 1+ day streak</p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 space-y-1">
                <span className="text-xs font-bold text-indigo-800">Total Worksheets Solved</span>
                <div className="text-2xl font-black text-indigo-700">{metrics.totalWorksheetsDone}</div>
                <p className="text-[10px] text-indigo-800">Submitted across all subjects</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-xs font-black text-slate-900">Official Board Curriculum Compliance</h3>
                <p className="text-[11px] text-slate-500">
                  All learning exercises mapped to Maharashtra State Board, CBSE &amp; ICSE syllabi.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrintRoster}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Summary</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CREATE NEW ASSIGNMENT */}
      {showNewAssignmentModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-display font-black text-slate-900">
                Dispatch Homework / Exercise
              </h2>
              <button
                type="button"
                onClick={() => setShowNewAssignmentModal(false)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDispatchAssignment} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Assignment Title *</label>
                <input
                  type="text"
                  required
                  value={asnTitle}
                  onChange={(e) => setAsnTitle(e.target.value)}
                  placeholder="e.g. Chapter 1 Practice Exercise &amp; Worksheet"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject *</label>
                  <select
                    value={asnSubject}
                    onChange={(e) => setAsnSubject(e.target.value as SubjectName)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium cursor-pointer"
                  >
                    {availableSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={asnDueDate}
                    onChange={(e) => setAsnDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium cursor-pointer"
                  >
                  </input>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Max Score (Marks)</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={asnMaxScore}
                  onChange={(e) => setAsnMaxScore(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Instructions / Description</label>
                <textarea
                  rows={3}
                  value={asnDescription}
                  onChange={(e) => setAsnDescription(e.target.value)}
                  placeholder="Instructions for students (e.g. Complete chapter quiz and write 3 key takeaways)"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAssignmentModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-black cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch to Class</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: GRADE / EVALUATE ASSIGNMENT */}
      {evaluatingAssignment && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-display font-black text-slate-900">
                Grade Student Assignment
              </h2>
              <button
                type="button"
                onClick={() => setEvaluatingAssignment(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <div className="font-bold text-slate-700">
                Student: <span className="text-slate-900">{evaluatingAssignment.student.name}</span>
              </div>
              <div className="font-bold text-slate-700">
                Task: <span className="text-slate-900">{evaluatingAssignment.assignment.title}</span>
              </div>
            </div>

            <form onSubmit={handleSaveEvaluation} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Marks Awarded (out of {evaluatingAssignment.assignment.maxScore}) *
                </label>
                <input
                  type="number"
                  min="0"
                  max={evaluatingAssignment.assignment.maxScore}
                  required
                  value={evalScore}
                  onChange={(e) => setEvalScore(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-bold text-slate-900 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Teacher Feedback / Notes</label>
                <textarea
                  rows={3}
                  required
                  value={evalFeedback}
                  onChange={(e) => setEvalFeedback(e.target.value)}
                  placeholder="Add encouragement and specific feedback for the student"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEvaluatingAssignment(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Evaluation</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: INSPECT INDIVIDUAL STUDENT */}
      {inspectingStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{inspectingStudent.avatar || '🌟'}</span>
                <div>
                  <h2 className="text-base font-display font-black text-slate-900">
                    {inspectingStudent.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {inspectingStudent.board} · {inspectingStudent.classLevel}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setInspectingStudent(null)}
                className="p-1 rounded-xl text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-slate-500 font-bold">Contact</span>
                <div className="font-extrabold text-slate-900">{inspectingStudent.mobile || inspectingStudent.email}</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-0.5">
                <span className="text-slate-500 font-bold">Streak &amp; Points</span>
                <div className="font-extrabold text-slate-900">
                  🔥 {inspectingStudent.streakDays || 0} Days · {inspectingStudent.points || 0} XP
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-black text-slate-900">Worksheets Completed ({inspectingStudent.completedWorksheetIds?.length || 0})</h3>
              {inspectingStudent.completedWorksheetIds && inspectingStudent.completedWorksheetIds.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {inspectingStudent.completedWorksheetIds.map((wsId) => (
                    <span
                      key={wsId}
                      className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-bold"
                    >
                      ✓ {wsId}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 italic">No worksheets recorded yet.</p>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setInspectingStudent(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
