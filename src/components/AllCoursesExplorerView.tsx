import React, { useState, useMemo } from 'react';
import { EducationBoard, ClassLevel, SubjectName } from '../types';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta,
} from '../data/classCurriculumConfig';
import { getStudyMaterialsForSubject } from '../data/notes/studyMaterialsData';
import { useApp } from '../context/AppContext';
import {
  FREE_ALLOWED_SUBJECTS,
  getBoardShortLabel,
  getClassSubscriptionInfo,
} from '../utils/subscriptionAccess';
import {
  BookOpen,
  FileText,
  Layers,
  CheckCircle2,
  Crown,
  Play,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Search,
} from 'lucide-react';
import { SectionOrientationGuide } from './SectionOrientationGuide';

interface AllCoursesExplorerViewProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (classLevel: ClassLevel) => void;
  onOpenSubjectPractice: (
    board: EducationBoard,
    classLevel: ClassLevel,
    subject: SubjectName,
    mode: 'quizzes' | 'worksheets' | 'study-materials'
  ) => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onBackHome: () => void;
}

export const AllCoursesExplorerView: React.FC<AllCoursesExplorerViewProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onOpenSubjectPractice,
  onOpenMembership,
  onBackHome,
}) => {
  const { currentStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSubject, setExpandedSubject] = useState<SubjectName | null>(null);

  const boardMeta = getEducationBoardMeta(selectedBoard);
  const subjects = useMemo(
    () => getSubjectsForClass(selectedClass, selectedBoard),
    [selectedClass, selectedBoard]
  );

  const filteredSubjects = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return subjects;
    return subjects.filter((s) => {
      const meta = getSubjectMeta(s, selectedBoard);
      return (
        s.toLowerCase().includes(q) ||
        meta.description.toLowerCase().includes(q) ||
        meta.chaptersSummary.toLowerCase().includes(q)
      );
    });
  }, [subjects, searchTerm, selectedBoard]);

  const classSubInfo = getClassSubscriptionInfo(
    currentStudent,
    selectedClass,
    undefined,
    selectedBoard
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home Dashboard</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-extrabold">
            <Layers className="w-3.5 h-3.5" />
            <span>Section 2 · Courses (Maharashtra · CBSE · ICSE)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
              Courses Directory (Classes 1 to 10)
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-2xl">
              Explore structured class-wise learning programmes organised strictly by Education Board, Class (1–10), Subject-wise courses, and Chapter-wise lessons.
            </p>
          </div>
          <div className="lg:col-span-4 grid grid-cols-3 gap-2 text-center">
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
              <p className="text-lg font-display font-extrabold text-amber-300">{subjects.length}</p>
              <p className="text-[10px] text-slate-200 font-bold">Subjects ({selectedClass})</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
              <p className="text-lg font-display font-extrabold text-emerald-300">Classes 1–10</p>
              <p className="text-[10px] text-slate-200 font-bold">{getBoardShortLabel(selectedBoard)}</p>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 border border-white/15">
              <p className="text-lg font-display font-extrabold text-sky-300">₹99 / Yr</p>
              <p className="text-[10px] text-slate-200 font-bold">365-Day Plan</p>
            </div>
          </div>
        </div>
      </div>

      {/* 3-Question Orientation Guide */}
      <SectionOrientationGuide
        sectionNumber="Section 2 · Courses"
        sectionTitle="Class-Wise & Subject-Wise Courses"
        whatIsThis="All structured class-wise school courses organised by Maharashtra State Board, CBSE, and ICSE."
        whatCanILearn="Classes 1 to 10 subject-wise courses and chapter-wise lessons aligned 100% to your board."
        whatShouldIClick="1. Select your Board below → 2. Pick your Class (1–10) → 3. Click 'View Chapter Lessons' on any Subject."
        accentTheme="indigo"
      />

      {/* Step 1: Select Education Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BOARD_META_LIST.map((b) => {
          const isSelected = selectedBoard === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                onSelectBoard(b.id);
                setExpandedSubject(null);
              }}
              className={`p-5 rounded-3xl border-2 text-left transition-all cursor-pointer space-y-2 ${
                isSelected
                  ? 'bg-amber-50/70 border-amber-500 shadow-md'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{b.icon}</span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      Step 1 · {b.badgeText}
                    </p>
                    <h2 className="font-display font-extrabold text-base text-slate-900">
                      {b.shortLabel}
                    </h2>
                  </div>
                </div>
                {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />}
              </div>
              <p className="text-xs text-slate-600 line-clamp-2">{b.description}</p>
            </button>
          );
        })}
      </div>

      {/* Step 2: Select Class (1 to 10) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              Step 2 · {boardMeta.fullName}
            </p>
            <h2 className="text-lg font-display font-extrabold text-slate-900">
              Select Class (Classes 1 to 10)
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${selectedClass} subjects or lessons...`}
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:outline-hidden focus:border-amber-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {ALL_10_CLASSES_META.map((cls) => {
            const active = selectedClass === cls.classLevel;
            return (
              <button
                key={cls.classLevel}
                type="button"
                onClick={() => {
                  onSelectClass(cls.classLevel);
                  setExpandedSubject(null);
                }}
                className={`py-2.5 px-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
                }`}
              >
                {cls.classLevel}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-600 font-semibold">
            Step 3 · Showing <strong className="text-slate-900">{filteredSubjects.length}</strong>{' '}
            subject-wise courses for{' '}
            <strong className="text-slate-900">
              {getBoardShortLabel(selectedBoard)} · {selectedClass}
            </strong>
          </div>
          <button
            type="button"
            onClick={() => onOpenMembership(selectedClass, selectedBoard)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>
              {classSubInfo.isPaidActive
                ? `${getBoardShortLabel(selectedBoard)} · ${selectedClass} Unlocked`
                : `Unlock ${getBoardShortLabel(selectedBoard)} ${selectedClass} — ₹99 / 365 Days`}
            </span>
          </button>
        </div>
      </div>

      {/* Step 3: Subject-Wise Courses & Expandable Chapter-Wise Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subjectName) => {
          const meta = getSubjectMeta(subjectName, selectedBoard);
          const isFreeSub = FREE_ALLOWED_SUBJECTS.includes(subjectName);
          const chapters = getStudyMaterialsForSubject(selectedBoard, selectedClass, subjectName);
          const isExpanded = expandedSubject === subjectName;

          return (
            <div
              key={`${selectedBoard}-${selectedClass}-${subjectName}`}
              className="bg-white rounded-3xl p-5 border-2 border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{meta.icon}</span>
                    <div>
                      <h3 className="font-display font-extrabold text-base text-slate-900 leading-tight">
                        {subjectName}
                      </h3>
                      <p className="text-[11px] font-bold text-slate-500">
                        {getBoardShortLabel(selectedBoard)} · {selectedClass} · {chapters.length} Chapters
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isFreeSub || classSubInfo.isPaidActive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-900'
                    }`}
                  >
                    {classSubInfo.isPaidActive
                      ? 'Unlocked'
                      : isFreeSub
                      ? 'Free Demo'
                      : '₹99 Course'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{meta.description}</p>

                {/* Expandable Chapter-Wise Lessons List */}
                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedSubject((prev) => (prev === subjectName ? null : subjectName))
                    }
                    className="w-full py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-950 font-extrabold text-xs flex items-center justify-between cursor-pointer transition-colors border border-indigo-200/80"
                  >
                    <span>
                      Chapter-Wise Lessons ({chapters.length} Lessons)
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-indigo-700" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-indigo-700" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="mt-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 max-h-56 overflow-y-auto">
                      {chapters.map((ch) => (
                        <div
                          key={ch.id}
                          className="p-2.5 rounded-xl bg-white border border-slate-200/80 flex items-start justify-between gap-2 text-xs"
                        >
                          <div className="min-w-0">
                            <p className="font-extrabold text-slate-900">
                              Lesson {ch.chapterNumber}: {ch.chapterTitle}
                            </p>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {ch.overview}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenSubjectPractice(
                                selectedBoard,
                                selectedClass,
                                subjectName,
                                'study-materials'
                              )
                            }
                            className="px-2 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] shrink-0 cursor-pointer"
                          >
                            Open Lesson
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Cross-Section Links (Links to Study Material & Practice Zone — No Duplication) */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials')
                  }
                  className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  title="Go to Study Material for this Subject"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Study Material</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'worksheets')
                  }
                  className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  title="Go to Worksheets for this Subject"
                >
                  <FileText className="w-3 h-3" />
                  <span>Worksheets</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'quizzes')
                  }
                  className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                  title="Go to Practice Zone for this Subject"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Practice</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
