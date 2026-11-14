import React, { useState, useMemo, useEffect } from 'react';
import { Search } from 'lucide-react';
import type { EducationBoard, QuizLevel, StudentProfile, SubjectName } from '../../types';
import { ALL_BOARDS, getBoardShortLabel, normalizeBoardValue } from '../../utils/subscriptionAccess';
import { ALL_ADMIN_CLASSES, ALL_ADMIN_SUBJECTS } from '../../utils/adminAnalytics';
import { AdminPagination } from './AdminPagination';

interface StudentProgressionCardProps {
  student: StudentProfile;
  displayedSubjects: SubjectName[];
  boardContext: 'all' | EducationBoard;
}

const StudentProgressionCard: React.FC<StudentProgressionCardProps> = React.memo(
  ({ student, displayedSubjects, boardContext }) => {
    const resolvedBoard = normalizeBoardValue(
      boardContext !== 'all' ? boardContext : student.board || 'Maharashtra'
    );

    return (
      <div className="border border-slate-200 rounded-3xl p-5 space-y-4 bg-slate-50/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{student.avatar}</span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-extrabold text-sm text-slate-900">{student.name}</h4>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                  {getBoardShortLabel(resolvedBoard)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
                  {student.classLevel}
                </span>
                <span className="text-[11px] font-mono text-slate-400">UID: {student.id}</span>
              </div>
              <p className="text-xs text-slate-500">
                Mobile: <strong>{student.mobile}</strong> • Points: <strong>{student.points} XP</strong>
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Last Active: {new Date(student.lastActiveDate).toLocaleDateString()}
          </div>
        </div>

        {/* Subject Level Matrix for this student */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {displayedSubjects.map((subName) => {
            const scopedKey = `${resolvedBoard}__${student.classLevel}__${subName}`;
            const classKey = `${student.classLevel}__${subName}`;
            const progress = student.subjectProgress?.[scopedKey] ||
              student.subjectProgress?.[classKey] ||
              student.subjectProgress?.[subName] || {
                maxUnlockedLevel: 1 as QuizLevel,
                completedLevels: [] as QuizLevel[],
                bestScores: {},
              };

            return (
              <div
                key={subName}
                className="bg-white rounded-2xl p-3.5 border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-800 truncate" title={subName}>
                    {subName}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                    L{progress.maxUnlockedLevel} of 4
                  </span>
                </div>

                {/* 4 Levels State Pills */}
                <div className="grid grid-cols-4 gap-1">
                  {([1, 2, 3, 4] as QuizLevel[]).map((lvl) => {
                    const isCompleted = progress.completedLevels.includes(lvl);
                    const isUnlocked = lvl <= progress.maxUnlockedLevel;
                    const score = progress.bestScores[lvl];

                    return (
                      <div
                        key={lvl}
                        className={`p-1.5 rounded-lg text-center text-[10px] font-bold border ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : isUnlocked
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-slate-100 text-slate-400 border-slate-200'
                        }`}
                        title={`Level ${lvl}: ${
                          isCompleted
                            ? `Passed (${score || 10}/10)`
                            : isUnlocked
                              ? 'Unlocked'
                              : 'Locked'
                        }`}
                      >
                        <div>L{lvl}</div>
                        <div className="text-[9px] font-mono">
                          {isCompleted ? `${score || 10}/10` : isUnlocked ? 'Open' : '🔒'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
StudentProgressionCard.displayName = 'StudentProgressionCard';

interface AdminProgressionSectionProps {
  studentsList: StudentProfile[];
  selectedBoardWorkspace: 'all' | EducationBoard;
  onSelectBoardWorkspace: (board: 'all' | EducationBoard) => void;
  selectedClassWorkspace: string;
  onSelectClassWorkspace: (cls: string) => void;
}

export const AdminProgressionSection: React.FC<AdminProgressionSectionProps> = React.memo(
  ({
    studentsList,
    selectedBoardWorkspace,
    onSelectBoardWorkspace,
    selectedClassWorkspace,
    onSelectClassWorkspace,
  }) => {
    const [subjectFilter, setSubjectFilter] = useState<string>('all');
    const [searchInput, setSearchInput] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);

    useEffect(() => {
      const t = setTimeout(() => setDebouncedSearch(searchInput.trim().toLowerCase()), 200);
      return () => clearTimeout(t);
    }, [searchInput]);

    const filteredStudents = useMemo(() => {
      return studentsList.filter((s) => {
        if (selectedBoardWorkspace !== 'all') {
          const b = normalizeBoardValue(s.board || s.primaryBoard || 'Maharashtra');
          if (b !== selectedBoardWorkspace) return false;
        }
        if (selectedClassWorkspace !== 'all' && s.classLevel !== selectedClassWorkspace) {
          return false;
        }
        if (debouncedSearch) {
          const hit =
            s.name.toLowerCase().includes(debouncedSearch) ||
            s.mobile.includes(debouncedSearch) ||
            s.id.toLowerCase().includes(debouncedSearch);
          if (!hit) return false;
        }
        return true;
      });
    }, [studentsList, selectedBoardWorkspace, selectedClassWorkspace, debouncedSearch]);

    const displayedSubjects = useMemo(
      () =>
        subjectFilter === 'all'
          ? ALL_ADMIN_SUBJECTS
          : ALL_ADMIN_SUBJECTS.filter((sub) => sub === subjectFilter),
      [subjectFilter]
    );

    useEffect(() => {
      setCurrentPage(1);
    }, [selectedBoardWorkspace, selectedClassWorkspace, subjectFilter, debouncedSearch]);

    const safePage = Math.min(
      currentPage,
      Math.max(1, Math.ceil(filteredStudents.length / pageSize))
    );
    const paginatedStudents = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredStudents.slice(start, start + pageSize);
    }, [filteredStudents, safePage, pageSize]);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                Student Level Progression &amp; Mastery Tracking
              </h2>
              <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-0.5 rounded-full font-bold">
                4 Levels (Easy to Expert)
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Real-time tracking of sequential level unlocks (L1 → L2 → L3 → L4) and quiz scores across all curriculum subjects &amp; boards.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <select
              value={selectedBoardWorkspace}
              onChange={(e) => onSelectBoardWorkspace(e.target.value as 'all' | EducationBoard)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
            >
              <option value="all">All 3 Boards</option>
              {ALL_BOARDS.map((b) => (
                <option key={b} value={b}>
                  {getBoardShortLabel(b)}
                </option>
              ))}
            </select>

            <select
              value={selectedClassWorkspace}
              onChange={(e) => onSelectClassWorkspace(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
            >
              <option value="all">All Classes</option>
              {ALL_ADMIN_CLASSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
            >
              <option value="all">All Subjects ({ALL_ADMIN_SUBJECTS.length})</option>
              {ALL_ADMIN_SUBJECTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <div className="relative w-full sm:w-52">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search student..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <p className="text-[11px] font-bold text-amber-900 uppercase">Tracked Students</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">
              {filteredStudents.length}
            </p>
            <p className="text-[10px] text-slate-500">Individual isolated accounts</p>
          </div>
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
            <p className="text-[11px] font-bold text-emerald-900 uppercase">Passing Threshold</p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">60%+</p>
            <p className="text-[10px] text-emerald-600">Unlocks next sequential level</p>
          </div>
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
            <p className="text-[11px] font-bold text-blue-900 uppercase">Total Levels</p>
            <p className="text-2xl font-extrabold text-blue-700 mt-1">4 Levels</p>
            <p className="text-[10px] text-blue-600">Easy, Medium, Hard, Expert</p>
          </div>
          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
            <p className="text-[11px] font-bold text-purple-900 uppercase">
              Question Bank Isolation
            </p>
            <p className="text-2xl font-extrabold text-purple-700 mt-1">10 Qs / Level</p>
            <p className="text-[10px] text-purple-600">40 Qs per subject per class</p>
          </div>
        </div>

        <AdminPagination
          totalItems={filteredStudents.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[5, 10, 20]}
          itemLabel="student progress cards"
        />

        {/* Paginated Student-by-Student Level Progression List */}
        <div className="space-y-4">
          {paginatedStudents.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
              No student progression records match the active board, class, or search filter.
            </div>
          ) : (
            paginatedStudents.map((student) => (
              <StudentProgressionCard
                key={student.id}
                student={student}
                displayedSubjects={displayedSubjects}
                boardContext={selectedBoardWorkspace}
              />
            ))
          )}
        </div>
      </div>
    );
  }
);
AdminProgressionSection.displayName = 'AdminProgressionSection';
