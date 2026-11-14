import React, { useState, useMemo } from 'react';
import { EducationBoard, ClassLevel, SubjectName } from '../types';
import { BOARD_META_LIST, getEducationBoardMeta } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES_META,
  getSubjectsForClass,
  getSubjectMeta,
} from '../data/classCurriculumConfig';
import { getWorksheetsForClassAndSubject } from '../data/worksheetsData';
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
  GraduationCap,
  Layers,
  CheckCircle2,
  Crown,
  Play,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Search,
} from 'lucide-react';

interface AllCoursesExplorerViewProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (classLevel: ClassLevel) => void;
  onOpenSubjectPractice: (board: EducationBoard, classLevel: ClassLevel, subject: SubjectName, mode: 'quizzes' | 'worksheets' | 'study-materials') => void;
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
  const { currentStudent, allQuestions } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

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

  const classSubInfo = getClassSubscriptionInfo(currentStudent, selectedClass, undefined, selectedBoard);

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
            <span>Back to Home</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-extrabold">
            <Layers className="w-3.5 h-3.5" />
            <span>100% Isolated Syllabi: Maharashtra · CBSE · ICSE</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-2">
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
              Complete Courses Directory (Classes 1 to 10)
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-2xl">
              Explore all board-specific subjects, chapter-wise study materials, online worksheets, and 4-level MCQ banks without mixing Maharashtra State Board, CBSE (NCERT), or ICSE (CISCE) syllabi.
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

      {/* Board Selector Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {BOARD_META_LIST.map((b) => {
          const isSelected = selectedBoard === b.id;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelectBoard(b.id)}
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
                      {b.badgeText}
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

      {/* Class Selector + Search Strip */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-700">
              {boardMeta.fullName}
            </p>
            <h2 className="text-lg font-display font-extrabold text-slate-900">
              Select Standard (Class 1 to Class 10)
            </h2>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={`Search ${selectedClass} subjects or chapters...`}
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
                onClick={() => onSelectClass(cls.classLevel)}
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
            Showing <strong className="text-slate-900">{filteredSubjects.length}</strong> curated{' '}
            <strong className="text-slate-900">{getBoardShortLabel(selectedBoard)}</strong> subjects for{' '}
            <strong className="text-slate-900">{selectedClass}</strong>
          </div>
          <button
            type="button"
            onClick={() => onOpenMembership(selectedClass, selectedBoard)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs cursor-pointer"
          >
            <Crown className="w-3.5 h-3.5" />
            <span>
              {classSubInfo.isPaidActive
                ? `${getBoardShortLabel(selectedBoard)} · ${selectedClass} Active`
                : `Unlock ${getBoardShortLabel(selectedBoard)} ${selectedClass} — ₹99/Yr`}
            </span>
          </button>
        </div>
      </div>

      {/* Subject Directory Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSubjects.map((subjectName) => {
          const meta = getSubjectMeta(subjectName, selectedBoard);
          const isFreeSub = FREE_ALLOWED_SUBJECTS.includes(subjectName);
          const worksheetsCount = getWorksheetsForClassAndSubject(
            selectedClass,
            subjectName,
            selectedBoard
          ).length;
          const chaptersCount = getStudyMaterialsForSubject(
            selectedBoard,
            selectedClass,
            subjectName
          ).length;
          const mcqCount = allQuestions.filter(
            (q) =>
              (q.board || 'Maharashtra') === selectedBoard &&
              q.classLevel === selectedClass &&
              q.subject === subjectName &&
              q.status !== 'rejected'
          ).length;

          return (
            <div
              key={`${selectedBoard}-${selectedClass}-${subjectName}`}
              className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
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
                        {getBoardShortLabel(selectedBoard)} · {selectedClass}
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
                      : '₹99 Full Access'}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{meta.description}</p>
                {meta.chaptersSummary && (
                  <p className="text-[11px] text-slate-500 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                    <strong className="text-slate-700">Syllabus Focus:</strong> {meta.chaptersSummary}
                  </p>
                )}

                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="bg-indigo-50/70 rounded-xl py-2 px-1">
                    <p className="text-xs font-extrabold text-indigo-900">{chaptersCount}</p>
                    <p className="text-[10px] font-bold text-indigo-700">Chapters</p>
                  </div>
                  <div className="bg-emerald-50/70 rounded-xl py-2 px-1">
                    <p className="text-xs font-extrabold text-emerald-900">{worksheetsCount}</p>
                    <p className="text-[10px] font-bold text-emerald-700">Worksheets</p>
                  </div>
                  <div className="bg-amber-50/70 rounded-xl py-2 px-1">
                    <p className="text-xs font-extrabold text-amber-900">{mcqCount}+</p>
                    <p className="text-[10px] font-bold text-amber-800">MCQs</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'study-materials')
                  }
                  className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Notes</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'worksheets')
                  }
                  className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3 h-3" />
                  <span>Sheets</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onOpenSubjectPractice(selectedBoard, selectedClass, subjectName, 'quizzes')
                  }
                  className="py-2 px-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-[11px] flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Quiz</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Switch Callout */}
      <div className="bg-indigo-50 rounded-3xl p-5 sm:p-6 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-sm text-indigo-950">
              Looking for Scholarship, Stories, Drawing, GK or Creative Studios?
            </h3>
            <p className="text-xs text-indigo-800 mt-0.5">
              Open Special Learning from the top menu to explore MSCE Scholarship Champions, Drawing Studio, Story World, Shivaji Stories, and more.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onBackHome}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explore All Studios</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
