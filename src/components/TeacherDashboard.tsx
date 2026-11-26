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
  QrCode,
} from 'lucide-react';
import { lazyWithRetry } from '../utils/lazyWithRetry';
import { SectionLoadingFallback } from './SectionLoadingFallback';
import { GlobalStudySearchBar, type GlobalSearchJumpTarget } from './StudyLibraryGlobalSearch';
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
import { ALL_130_TEACHER_TOOLS, TEACHER_LEARNING_MATERIALS } from '../data/teacherTools/teacherToolsCatalog';

const TeacherToolsWorkbench = lazyWithRetry(() =>
  import('./teacher/TeacherToolsWorkbench').then((m) => ({ default: m.TeacherToolsWorkbench }))
);

interface TeacherDashboardProps {
  onNavigateTab: (tab: string, subjectParam?: SubjectName) => void;
  onGlobalSearchJump?: (target: GlobalSearchJumpTarget) => void;
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
  onGlobalSearchJump,
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
  const [portalSearchQuery, setPortalSearchQuery] = useState<string>('');
  const [portalSearchOpen, setPortalSearchOpen] = useState<boolean>(false);
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

  const [activeOverviewCategory, setActiveOverviewCategory] = useState<
    | 'all'
    | 'classroom'
    | 'lesson-planning'
    | 'teaching-resources'
    | 'ai-tools'
    | 'assignments'
    | 'assessment'
    | 'performance'
    | 'downloads'
  >('all');

  const teacherResourceCards = [
    {
      id: 'my-classroom',
      category: 'classroom' as const,
      categoryLabel: 'My Classroom',
      title: `Class Roster & Attendance (${filteredStudents.length})`,
      description:
        'Mark daily student attendance, view active learning streaks, and inspect individual student progress.',
      icon: Users,
      iconBg: 'bg-teal-500 text-slate-950',
      badge: 'Live Roster',
      onClick: () => setActiveTeacherTab('roster'),
    },
    {
      id: 'lesson-planner',
      category: 'lesson-planning' as const,
      categoryLabel: 'Lesson Planning',
      title: '3-Tab Official Lesson Planner',
      description:
        'Annual, Monthly, and Daily lesson plans mapped to official Maharashtra, CBSE, and ICSE textbook chapters.',
      icon: Calendar,
      iconBg: 'bg-amber-400 text-slate-950',
      badge: 'Annual · Monthly · Daily',
      onClick: () => onNavigateTab('lesson-planner'),
    },
    {
      id: 'teacher-130-tools',
      category: 'teaching-resources' as const,
      categoryLabel: 'Teaching Resources',
      title: '130 Teacher Tools & Pedagogy Guides',
      description:
        'All 8 educator toolkits across Waves 1–6: Exam Blueprints, Gradebooks, Live Classroom Timer & Teaching Guides.',
      icon: Wrench,
      iconBg: 'bg-amber-400 text-slate-950',
      badge: '130 Tools',
      onClick: () => setActiveTeacherTab('tools'),
    },
    {
      id: 'study-library',
      category: 'teaching-resources' as const,
      categoryLabel: 'Teaching Resources',
      title: 'Free Study Library & Textbooks',
      description:
        'Official e-textbooks, chapter notes, textbook solutions, short revision sheets, and video lessons.',
      icon: BookOpen,
      iconBg: 'bg-teal-400 text-slate-950',
      badge: 'Classes 1–10',
      onClick: () => onNavigateTab('study-materials'),
    },
    {
      id: 'additional-curriculum',
      category: 'teaching-resources' as const,
      categoryLabel: 'Teaching Resources',
      title: 'Additional Curriculum Track',
      description:
        'GK, Logical Reasoning, Computer Knowledge, and 10 supplementary enrichment tracks for classroom periods.',
      icon: Layers,
      iconBg: 'bg-sky-400 text-slate-950',
      badge: '10 Subjects',
      onClick: () => {
        if (onOpenAdditionalCurriculum) {
          onOpenAdditionalCurriculum({
            board: selectedBoard,
            classLevel: selectedClass,
          });
        } else {
          onNavigateTab('additional-curriculum');
        }
      },
    },
    {
      id: 'teacher-ai-tools',
      category: 'ai-tools' as const,
      categoryLabel: 'AI Teacher Tools',
      title: '40 AI Teacher Productivity Tools',
      description:
        'Generate question papers, lesson plans, rubrics, report card remarks, and bilingual worksheets with real Gemini AI.',
      icon: Sparkles,
      iconBg: 'bg-indigo-400 text-slate-950',
      badge: '40 AI Tools',
      onClick: () => onNavigateTab('ai-tools'),
    },
    {
      id: 'homework-assignments',
      category: 'assignments' as const,
      categoryLabel: 'Assignments',
      title: `Homework & Assignments (${classAssignmentsList.length})`,
      description:
        'Dispatch chapter homework to your class, track pending student submissions, and record marks & feedback.',
      icon: FileText,
      iconBg: 'bg-teal-400 text-slate-950',
      badge: `${metrics.pendingGradingCount} To Grade`,
      onClick: () => setActiveTeacherTab('assignments'),
    },
    {
      id: 'worksheets-hub',
      category: 'assessment' as const,
      categoryLabel: 'Assessment',
      title: 'Online Worksheets Hub',
      description:
        'Browse hundreds of auto-graded chapter worksheets across all subjects for classroom and home practice.',
      icon: CheckSquare,
      iconBg: 'bg-amber-400 text-slate-950',
      badge: 'Auto-Graded',
      onClick: () => onNavigateTab('worksheets'),
    },
    {
      id: 'subject-quizzes',
      category: 'assessment' as const,
      categoryLabel: 'Assessment',
      title: 'Subject Quizzes & 4-Level Drills',
      description:
        'Zero-repetition 4-level question bank and TET & CTET (200 Mocks) for continuous assessment.',
      icon: Award,
      iconBg: 'bg-sky-400 text-slate-950',
      badge: '4 Levels + TET/CTET',
      onClick: () => onNavigateTab('quizzes'),
    },
    {
      id: 'tet-ctet-zone',
      category: 'assessment' as const,
      categoryLabel: 'Assessment',
      title: 'TET & CTET Career Exam Zone',
      description:
        '200 full-length mock examinations, Child Development & Pedagogy, and language drills.',
      icon: GraduationCap,
      iconBg: 'bg-purple-400 text-slate-950',
      badge: '200 Mocks',
      onClick: () => onNavigateTab('tet-ctet'),
    },
    {
      id: 'student-performance',
      category: 'performance' as const,
      categoryLabel: 'Student Performance',
      title: 'Class Mastery & Analytics Summary',
      description:
        'Review class average XP, learning consistency rate, completed worksheets, and printable class reports.',
      icon: Award,
      iconBg: 'bg-emerald-400 text-slate-950',
      badge: `${metrics.avgPoints} Avg XP`,
      onClick: () => setActiveTeacherTab('analytics'),
    },
    {
      id: 'document-print-studio',
      category: 'downloads' as const,
      categoryLabel: 'Downloads',
      title: 'Document, PDF, QR & Print Studio',
      description:
        '19 PDF utilities, Word/Excel print sheets, ID Photo Resizer, A4 Print Preview, and Student QR Attendance labels.',
      icon: Printer,
      iconBg: 'bg-amber-400 text-slate-950',
      badge: 'PDF · Print · QR',
      onClick: () => onNavigateTab('document-studio'),
    },
  ];

  const visibleTeacherCards =
    activeOverviewCategory === 'all'
      ? teacherResourceCards
      : teacherResourceCards.filter((c) => c.category === activeOverviewCategory);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* High-Contrast Deep Navy & Slate Teacher Command Header */}
      <div className="bg-gradient-to-r from-[#0b1930] via-[#0f2447] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-slate-700/90 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-200 border border-teal-400/40 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-teal-300" />
                <span>Teacher &amp; Educator Command Center</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 border border-amber-300/40 text-xs font-bold">
                {currentStudent?.schoolName || 'Central Educational Institute'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight text-white">
              Welcome, {currentStudent?.name || 'Teacher'}!
            </h1>
            {(currentStudent?.qualification || (currentStudent?.teachingSubjects && currentStudent.teachingSubjects.length > 0) || (currentStudent?.classesTaught && currentStudent.classesTaught.length > 0)) && (
              <p className="text-xs font-bold text-teal-200">
                {[
                  currentStudent?.qualification ? `Qualification: ${currentStudent.qualification}` : '',
                  currentStudent?.teachingSubjects?.length ? `Subjects: ${currentStudent.teachingSubjects.join(', ')}` : '',
                  currentStudent?.classesTaught?.length ? `Classes: ${currentStudent.classesTaught.join(', ')}` : '',
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            )}
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Manage your classroom roster, lesson plans, teaching resources, AI productivity tools,
              homework assignments, assessments, and printable reports from one organised workspace.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {onSwitchToStudentView && (
              <button
                type="button"
                onClick={onSwitchToStudentView}
                className="min-h-[42px] px-4 py-2.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700 text-white font-bold text-xs border border-slate-600 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <Eye className="w-3.5 h-3.5 text-amber-300" />
                <span>Student View Preview</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => setShowNewAssignmentModal(true)}
              className="min-h-[42px] px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Dispatch Homework</span>
            </button>
          </div>
        </div>

        {/* Global Class & Board Filter Strip */}
        <div className="mt-6 pt-5 border-t border-slate-700/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">
              Select Board
            </label>
            <select
              value={selectedBoard}
              onChange={(e) => setSelectedBoard(e.target.value as EducationBoard)}
              className="w-full bg-slate-900/95 border border-slate-600 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              {BOARD_META_LIST.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.fullName} ({b.shortLabel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value as ClassLevel)}
              className="w-full bg-slate-900/95 border border-slate-600 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 cursor-pointer"
            >
              {ALL_10_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-200 uppercase tracking-wider mb-1">
              Division / Section
            </label>
            <select
              value={selectedDivision}
              onChange={(e) => setSelectedDivision(e.target.value)}
              className="w-full bg-slate-900/95 border border-slate-600 rounded-xl px-3 py-2.5 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-amber-400 cursor-pointer"
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
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-teal-500/60 text-white text-xs font-bold flex items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
            <span>{asnNotice}</span>
          </div>
          <button
            type="button"
            onClick={() => setAsnNotice(null)}
            className="text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Teacher Portal Scoped Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
              Teacher Portal Content Search
            </span>
            <h2 className="text-sm sm:text-base font-display font-black text-slate-900 mt-1">
              Search 130 Teacher Tools, Lesson Planner, TET/CTET Mocks, Roster Students &amp; Assignments
            </h2>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { label: 'Lesson Planner', query: 'Lesson Planner' },
              { label: 'Question Paper', query: 'Question Paper' },
              { label: 'Rubric', query: 'Rubric' },
              { label: 'TET & CTET', query: 'TET' },
              { label: 'Report Card', query: 'Report Card' },
            ].map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => {
                  setPortalSearchQuery(chip.query);
                  setPortalSearchOpen(true);
                }}
                className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-teal-50 text-[11px] font-bold text-slate-700 hover:text-teal-800 border border-slate-200 cursor-pointer"
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setPortalSearchOpen(true);
          }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={portalSearchQuery}
              onChange={(e) => {
                setPortalSearchQuery(e.target.value);
                setPortalSearchOpen(true);
              }}
              onFocus={() => setPortalSearchOpen(true)}
              placeholder="Search 130 Teacher Tools, Pedagogy Guides, Lesson Planner, TET/CTET, Students, or Homework..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white"
            />
            {portalSearchQuery && (
              <button
                type="button"
                onClick={() => {
                  setPortalSearchQuery('');
                  setPortalSearchOpen(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-200 text-slate-500 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#0f2447] hover:bg-slate-800 text-white font-black text-xs sm:text-sm cursor-pointer flex items-center justify-center gap-1.5 shadow-xs shrink-0"
          >
            <Search className="w-4 h-4 text-amber-300" />
            <span>Search Teacher Portal</span>
          </button>
        </form>

        {portalSearchOpen && portalSearchQuery.trim().length > 0 && (() => {
          const q = portalSearchQuery.trim().toLowerCase();
          const matchedTools = ALL_130_TEACHER_TOOLS.filter(
            (t) =>
              t.name.toLowerCase().includes(q) ||
              t.category.toLowerCase().includes(q) ||
              t.shortDesc.toLowerCase().includes(q)
          ).slice(0, 6);

          const matchedGuides = TEACHER_LEARNING_MATERIALS.filter(
            (g) =>
              g.title.toLowerCase().includes(q) ||
              g.category.toLowerCase().includes(q) ||
              g.summary.toLowerCase().includes(q)
          ).slice(0, 4);

          const matchedStudents = filteredStudents
            .filter(
              (s) =>
                s.name.toLowerCase().includes(q) ||
                (s.email && s.email.toLowerCase().includes(q)) ||
                (s.schoolName && s.schoolName.toLowerCase().includes(q))
            )
            .slice(0, 4);

          const matchedAssignments = classAssignmentsList
            .filter(
              ({ assignment, student }) =>
                assignment.title.toLowerCase().includes(q) ||
                assignment.subject.toLowerCase().includes(q) ||
                student.name.toLowerCase().includes(q)
            )
            .slice(0, 4);

          const workspaceModules = [
            {
              title: 'Annual, Monthly & Daily Lesson Planner',
              badge: 'Planner',
              desc: 'Board-aligned 3-Tab Lesson Planner with printable PDF exports',
              keywords: 'lesson plan planner annual monthly daily syllabus teaching schedule',
              action: () => onNavigateTab('lesson-planner'),
            },
            {
              title: '40 AI Teacher Productivity & Paper Generators',
              badge: 'AI Studio',
              desc: 'Question papers, worksheets, rubrics, lesson notes & report remarks',
              keywords: 'ai tools generator question paper worksheet rubric quiz',
              action: () => onNavigateTab('ai-tools'),
            },
            {
              title: 'MAHA TET & CTET Exam Hub (200 Full Mocks)',
              badge: 'Exam Prep',
              desc: 'Paper 1 & Paper 2 full mock tests, pedagogy notes & OMR analytics',
              keywords: 'tet ctet maha tet mock exam teacher eligibility test pedagogy',
              action: () => onNavigateTab('tet-ctet'),
            },
            {
              title: 'Document, PDF, Image & QR Print Studio',
              badge: 'Studio',
              desc: 'Convert PDF/Word/Excel, resize exam photos & print ID QR codes',
              keywords: 'pdf word excel convert image resize qr barcode print',
              action: () => onNavigateTab('document-studio'),
            },
          ].filter(
            (m) =>
              m.title.toLowerCase().includes(q) ||
              m.desc.toLowerCase().includes(q) ||
              m.keywords.includes(q)
          );

          const totalMatches =
            matchedTools.length +
            matchedGuides.length +
            matchedStudents.length +
            matchedAssignments.length +
            workspaceModules.length;

          return (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3.5 space-y-3 max-h-96 overflow-y-auto">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>
                  Found {totalMatches} matching Teacher Portal item{totalMatches === 1 ? '' : 's'} for &ldquo;{portalSearchQuery}&rdquo;
                </span>
                <button
                  type="button"
                  onClick={() => setPortalSearchOpen(false)}
                  className="text-slate-500 hover:text-slate-900 font-black cursor-pointer"
                >
                  Close
                </button>
              </div>

              {totalMatches === 0 ? (
                <div className="text-xs text-slate-600 py-3 text-center">
                  No direct matches in Teacher Tools or Roster. Use the Syllabus &amp; Chapter Search below for class textbook notes and solutions.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {workspaceModules.map((mod) => (
                    <button
                      key={mod.title}
                      type="button"
                      onClick={() => {
                        mod.action();
                        setPortalSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                          {mod.badge}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{mod.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{mod.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-teal-700 shrink-0" />
                    </button>
                  ))}

                  {matchedTools.map((tool) => (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        setActiveTeacherTab('tools');
                        setPortalSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-teal-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-teal-100 text-teal-900">
                          Tool #{tool.number} · {tool.category}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{tool.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">{tool.shortDesc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-teal-700 shrink-0" />
                    </button>
                  ))}

                  {matchedGuides.map((guide) => (
                    <button
                      key={guide.id}
                      type="button"
                      onClick={() => {
                        setActiveTeacherTab('tools');
                        setPortalSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-amber-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                          Pedagogy Guide · {guide.category}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{guide.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">{guide.summary}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
                    </button>
                  ))}

                  {matchedStudents.map((stu) => (
                    <button
                      key={stu.id}
                      type="button"
                      onClick={() => {
                        setActiveTeacherTab('roster');
                        setSearchQuery(stu.name);
                        setInspectingStudent(stu);
                        setPortalSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-sky-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-sky-100 text-sky-900">
                          Classroom Student · {stu.classLevel}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{stu.name}</div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {stu.board || selectedBoard} · {stu.schoolName || selectedDivision}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-sky-700 shrink-0" />
                    </button>
                  ))}

                  {matchedAssignments.map(({ assignment, student }) => (
                    <button
                      key={`${student.id}_${assignment.id}`}
                      type="button"
                      onClick={() => {
                        setActiveTeacherTab('assignments');
                        setPortalSearchOpen(false);
                      }}
                      className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white hover:bg-purple-50 border border-slate-200 text-left cursor-pointer transition-colors"
                    >
                      <div className="min-w-0">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-purple-100 text-purple-900">
                          Assignment · {assignment.subject}
                        </span>
                        <div className="text-xs font-black text-slate-900 truncate mt-1">{assignment.title}</div>
                        <div className="text-[11px] text-slate-500 truncate">
                          Student: {student.name} · Status: {assignment.status}
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-purple-700 shrink-0" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'overview' as const, label: 'Organised Workspace', icon: Layers },
            { id: 'tools' as const, label: '130 Teacher Tools & Guides', icon: Wrench },
            { id: 'roster' as const, label: `My Classroom (${filteredStudents.length})`, icon: Users },
            { id: 'assignments' as const, label: `Assignments (${classAssignmentsList.length})`, icon: FileText },
            { id: 'analytics' as const, label: 'Student Performance', icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTeacherTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTeacherTab(tab.id)}
                className={`min-h-[40px] px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#0f2447] text-white shadow-sm border border-slate-700'
                    : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
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
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-3.5 h-3.5 text-amber-300" />
            <span>Print Class Report</span>
          </button>
        </div>
      </div>

      {activeTeacherTab !== 'overview' && (
        <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-900 text-white border border-slate-700 rounded-2xl px-4 py-2.5 text-xs">
          <div className="flex items-center gap-1.5 font-bold text-slate-300">
            <button
              type="button"
              onClick={() => setActiveTeacherTab('overview')}
              className="hover:text-white underline cursor-pointer"
            >
              Teacher Command Center
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-black text-amber-300">
              {activeTeacherTab === 'tools'
                ? '130 Teacher Tools & Pedagogy Guides'
                : activeTeacherTab === 'roster'
                ? 'My Classroom Roster & Attendance'
                : activeTeacherTab === 'assignments'
                ? 'Homework & Assignments'
                : 'Student Performance Summary'}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveTeacherTab('overview')}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-bold cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Workspace</span>
          </button>
        </div>
      )}

      {/* TAB 1: ORGANISED TEACHER WORKSPACE (8 Logical Categories & High-Contrast Navy/Slate Cards) */}
      {activeTeacherTab === 'overview' && (
        <div className="space-y-6">
          <GlobalStudySearchBar
            defaultBoard={selectedBoard}
            defaultClass={selectedClass}
            onJumpToResult={(target) => {
              if (onGlobalSearchJump) onGlobalSearchJump(target);
              else onNavigateTab('study-materials', target.subject);
            }}
            onOpenToolTab={(tab) => onNavigateTab(tab)}
            headline={`Teacher Syllabus, Worksheet, Exam Paper & Productivity Search (${selectedBoard} · ${selectedClass})`}
            compact
          />

          {/* High-Contrast Dark Slate & Navy Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-[#0f2447] text-white p-4 rounded-2xl border border-slate-700 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Total Enrolled
              </span>
              <div className="text-2xl font-black text-white tabular-nums">{metrics.totalStudents}</div>
              <p className="text-[11px] text-sky-200 font-semibold">
                {getBoardShortLabel(selectedBoard)} · {selectedClass}
              </p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-700 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Active Streaks
              </span>
              <div className="text-2xl font-black text-teal-300 tabular-nums">{metrics.activeStudents}</div>
              <p className="text-[11px] text-slate-300 font-semibold">Regular daily practice</p>
            </div>

            <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-700 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Worksheets Solved
              </span>
              <div className="text-2xl font-black text-amber-300 tabular-nums">{metrics.totalWorksheetsDone}</div>
              <p className="text-[11px] text-slate-300 font-semibold">Cumulative class attempts</p>
            </div>

            <div className="bg-[#0f2447] text-white p-4 rounded-2xl border border-slate-700 shadow-sm space-y-1">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                Pending Grading
              </span>
              <div className="text-2xl font-black text-amber-400 tabular-nums">{metrics.pendingGradingCount}</div>
              <p className="text-[11px] text-amber-200 font-semibold">Awaiting evaluation</p>
            </div>
          </div>

          {/* 8-Category Organised Teacher Hub */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base sm:text-lg font-display font-black text-slate-900 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#0f2447]" />
                  <span>Teacher Categories &amp; Classroom Modules</span>
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Filter by category below or open any module directly. High-contrast cards ensure clear visibility in any classroom lighting.
                </p>
              </div>
              <span className="px-3 py-1 rounded-xl bg-slate-900 text-amber-300 text-xs font-black self-start sm:self-auto">
                Showing {visibleTeacherCards.length} Module{visibleTeacherCards.length === 1 ? '' : 's'}
              </span>
            </div>

            {/* 8 Logical Teacher Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all' as const, label: 'All Categories (12)' },
                { id: 'classroom' as const, label: '1. My Classroom' },
                { id: 'lesson-planning' as const, label: '2. Lesson Planning' },
                { id: 'teaching-resources' as const, label: '3. Teaching Resources' },
                { id: 'ai-tools' as const, label: '4. AI Teacher Tools' },
                { id: 'assignments' as const, label: '5. Assignments' },
                { id: 'assessment' as const, label: '6. Assessment' },
                { id: 'performance' as const, label: '7. Student Performance' },
                { id: 'downloads' as const, label: '8. Downloads & Print' },
              ].map((cat) => {
                const isSelected = activeOverviewCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setActiveOverviewCategory(cat.id)}
                    className={`shrink-0 min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0f2447] text-white border-slate-900 shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* High-Contrast Dark Navy / Slate / Charcoal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleTeacherCards.map((card, idx) => {
                const Icon = card.icon;
                const cardSurface =
                  idx % 2 === 0
                    ? 'bg-gradient-to-br from-[#0f2447] via-[#132d59] to-slate-900'
                    : 'bg-gradient-to-br from-slate-900 via-slate-800 to-[#0f2447]';
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={card.onClick}
                    className={`p-5 rounded-2xl border border-slate-700 hover:border-amber-400/80 ${cardSurface} text-white shadow-md hover:shadow-lg transition-all text-left cursor-pointer group flex flex-col justify-between gap-4`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`w-10 h-10 rounded-xl ${card.iconBg} flex items-center justify-center font-black shadow-xs shrink-0`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 text-amber-300 text-[10px] font-black uppercase tracking-wider">
                          {card.categoryLabel}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-sm sm:text-base font-display font-black text-white group-hover:text-amber-300 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-xs text-slate-200 leading-relaxed font-medium">
                          {card.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-700/80 flex items-center justify-between text-xs font-extrabold">
                      <span className="text-teal-300">{card.badge}</span>
                      <span className="inline-flex items-center gap-1 text-white group-hover:text-amber-300">
                        <span>Open Module</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </button>
                );
              })}
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
              <div className="p-5 rounded-2xl bg-[#0f2447] text-white border border-slate-700 space-y-1 shadow-sm">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Class Average XP</span>
                <div className="text-2xl font-black text-white tabular-nums">{metrics.avgPoints} Points</div>
                <p className="text-xs text-sky-200 font-medium">Based on regular quizzes and worksheets</p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-700 space-y-1 shadow-sm">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Learning Consistency Rate</span>
                <div className="text-2xl font-black text-teal-300 tabular-nums">
                  {metrics.totalStudents > 0
                    ? Math.round((metrics.activeStudents / metrics.totalStudents) * 100)
                    : 0}
                  %
                </div>
                <p className="text-xs text-slate-300 font-medium">Students with 1+ day streak</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0f2447] text-white border border-slate-700 space-y-1 shadow-sm">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Total Worksheets Solved</span>
                <div className="text-2xl font-black text-amber-300 tabular-nums">{metrics.totalWorksheetsDone}</div>
                <p className="text-xs text-sky-200 font-medium">Submitted across all subjects</p>
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
