import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CategoryId, ClassLevel, EducationBoard, PlanSkuId, SubjectName, QuizLevel } from '../types';
import { calculateLevel } from '../data/badgesData';
import {
  Crown,
  Lock,
  ChevronRight,
  User,
  ShieldCheck,
  GraduationCap,
  Award,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import {
  getBoardClassSubscriptionInfo,
  getActivatedBoardClassesList,
  getBoardShortLabel,
  getCategorySubscriptionInfo,
  getStudentPlanInfo,
  getVisibleExamCategoriesForStudent,
  hasCategoryAccess,
  parseBoardAndClassFromWorksheetId,
} from '../utils/subscriptionAccess';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import {
  ALL_10_CLASSES,
  ALL_10_CLASSES_META,
  getSubjectsForClass,
} from '../data/classCurriculumConfig';
import { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { ReferenceShowcaseSections } from './ReferenceShowcaseSections';

interface StudentDashboardProps {
  onNavigateTab: (tab: string, subjectParam?: SubjectName, levelParam?: QuizLevel) => void;
  onOpenMembership: (
    plan?: 'basic' | 'premium',
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard,
    planSku?: PlanSkuId
  ) => void;
  viewMode?: 'auto' | 'desktop';
  onToggleViewMode?: () => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  onOpenDemo?: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigateTab,
  onOpenMembership,
  viewMode = 'desktop',
  onToggleViewMode,
  onMenuAction,
  onOpenDemo,
  activeMainSection,
  onSelectMainSection,
}) => {
  const {
    currentStudent,
    activeBoard,
    allAttempts,
    getSubjectLevelProgress,
    switchActiveBoardAndClass,
    updateTeacherSelectedCategories,
  } = useApp();
  const [selectedCurriculumBoard, setSelectedCurriculumBoard] = useState<EducationBoard>(activeBoard);

  useEffect(() => {
    setSelectedCurriculumBoard(activeBoard);
  }, [activeBoard]);

  if (!currentStudent) return null;

  const activeClassSubjects = getSubjectsForClass(currentStudent.classLevel, activeBoard);
  const completedWorksheetsCount = (currentStudent.completedWorksheetIds || []).filter((wsId) => {
    const parsed = parseBoardAndClassFromWorksheetId(wsId);
    if (!parsed.classLevel) return true;
    const boardMatch = !parsed.board || parsed.board === activeBoard;
    return boardMatch && parsed.classLevel === currentStudent.classLevel;
  }).length;

  const studentAttempts = allAttempts.filter((a) => a.studentId === currentStudent.id);
  const totalQuizzes = studentAttempts.length;

  const levelInfo = calculateLevel(currentStudent.points);
  const xpInCurrentLevel = currentStudent.points - levelInfo.currentThreshold;
  const xpNeeded = levelInfo.nextThreshold - levelInfo.currentThreshold;
  const levelProgress = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeeded) * 100)));

  const masteredSubjectsCount = activeClassSubjects.filter((subjName) => {
    const prog = getSubjectLevelProgress(subjName, currentStudent.classLevel, activeBoard);
    return prog && prog.completedLevels && prog.completedLevels.length > 0;
  }).length;

  const overallProgressPercent = Math.min(
    100,
    Math.max(
      levelProgress,
      activeClassSubjects.length > 0
        ? Math.round((masteredSubjectsCount / activeClassSubjects.length) * 100)
        : 0
    )
  );

  const planInfo = getStudentPlanInfo(
    currentStudent,
    undefined,
    currentStudent.classLevel,
    activeBoard
  );

  return (
    <div className="space-y-8 pb-16">
      {/* SECTION 1: FOCUSED HOME DASHBOARD */}
      <ReferenceShowcaseSections
        selectedBoard={activeBoard}
        selectedClass={currentStudent.classLevel}
        onSelectBoard={(board) => {
          setSelectedCurriculumBoard(board);
          const cInfo = getBoardClassSubscriptionInfo(currentStudent, board, currentStudent.classLevel);
          if (cInfo.isAccessible) {
            void switchActiveBoardAndClass(board, currentStudent.classLevel);
          }
        }}
        onSelectClass={(cls) => {
          const cInfo = getBoardClassSubscriptionInfo(currentStudent, activeBoard, cls);
          if (cInfo.isAccessible) {
            void switchActiveBoardAndClass(activeBoard, cls);
          }
        }}
        onOpenDemo={(tab) => {
          if (onOpenDemo) onOpenDemo(tab || 'live-quiz');
          else onNavigateTab('quizzes');
        }}
        onNavigateTab={(tab, _subSection, subject) => onNavigateTab(tab, subject)}
        onMenuAction={onMenuAction}
        onOpenAuth={() => onNavigateTab('profile')}
        onOpenMembership={(targetClass, targetBoard) =>
          onOpenMembership(
            'premium',
            targetClass || currentStudent.classLevel,
            targetBoard || activeBoard
          )
        }
        onStartLearningClick={() => onNavigateTab('all-courses')}
        viewMode={viewMode}
        onToggleViewMode={onToggleViewMode}
        activeMainSection={activeMainSection}
        onSelectMainSection={onSelectMainSection}
        progressMetrics={{
          isLoggedIn: true,
          studentName: currentStudent.name,
          coursesCompleted: masteredSubjectsCount,
          practiceTests: totalQuizzes + completedWorksheetsCount,
          achievements: (currentStudent.badges || []).length,
          progressPercent: overallProgressPercent,
          badgesList: currentStudent.badges || [],
        }}
      />

      {/* COMPACT STUDENT WORKSPACE & ACTIVE BOARD/CLASS SWITCHER */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-200/90 shadow-md space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center text-3xl shadow-md shrink-0 border-2 border-white">
              {currentStudent.avatar || '🦁'}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
                  {currentStudent.name}&apos;s Active Workspace
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold border border-amber-300">
                  {getBoardShortLabel(activeBoard)} &bull; {currentStudent.classLevel}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-extrabold border border-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{planInfo.planDisplayName}</span>
                </span>
              </div>
              <p className="text-xs text-slate-600 font-medium mt-1">
                🔥 {currentStudent.streakDays} Day Streak &bull; {currentStudent.points} XP &bull;{' '}
                {getActivatedBoardClassesList(currentStudent).length} Paid Class Activation
                {getActivatedBoardClassesList(currentStudent).length === 1 ? '' : 's'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateTab('profile')}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>My Account</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() =>
                onOpenMembership('premium', currentStudent.classLevel, selectedCurriculumBoard)
              }
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>Unlock Board / Class (₹99)</span>
            </button>
          </div>
        </div>

        {/* Switch Board & Class (1 to 10) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-indigo-600" />
              <span>Switch Your Active Board &amp; Class Workspace:</span>
            </span>
            <span className="text-slate-500 font-medium hidden sm:inline">
              Click any unlocked class to switch immediately
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {BOARD_META_LIST.map((bm) => {
              const isTabBoard = selectedCurriculumBoard === bm.id;
              const paidCountOnBoard = ALL_10_CLASSES.filter(
                (c) => getBoardClassSubscriptionInfo(currentStudent, bm.id, c).isPaidActive
              ).length;
              return (
                <button
                  key={bm.id}
                  type="button"
                  onClick={() => setSelectedCurriculumBoard(bm.id)}
                  className={`p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-2 ${
                    isTabBoard
                      ? `bg-gradient-to-r ${bm.gradient} text-white border-transparent shadow-sm`
                      : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl shrink-0">{bm.icon}</span>
                    <div className="min-w-0">
                      <div className="text-xs font-black truncate">{bm.shortLabel}</div>
                      <div
                        className={`text-[10px] font-bold truncate ${
                          isTabBoard ? 'text-white/85' : 'text-slate-500'
                        }`}
                      >
                        {bm.badgeText}
                      </div>
                    </div>
                  </div>
                  {paidCountOnBoard > 0 && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black shrink-0 ${
                        isTabBoard ? 'bg-white/25 text-white' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {paidCountOnBoard} Paid
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {ALL_10_CLASSES.map((cls) => {
              const meta = ALL_10_CLASSES_META.find((m) => m.classLevel === cls);
              const isSelected =
                activeBoard === selectedCurriculumBoard && currentStudent.classLevel === cls;
              const cInfo = getBoardClassSubscriptionInfo(
                currentStudent,
                selectedCurriculumBoard,
                cls
              );

              let cardStyle =
                'bg-slate-50 hover:bg-amber-50 text-slate-600 border-slate-200 hover:border-amber-300 cursor-pointer';
              if (isSelected) {
                cardStyle =
                  'bg-gradient-to-br from-indigo-600 to-purple-700 text-white border-indigo-600 shadow-md cursor-default';
              } else if (cInfo.isPaidActive) {
                cardStyle =
                  'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-400 cursor-pointer';
              } else if (cInfo.isFreeBase) {
                cardStyle =
                  'bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border-indigo-300 cursor-pointer';
              }

              return (
                <button
                  key={`${selectedCurriculumBoard}_${cls}`}
                  type="button"
                  onClick={() => {
                    if (cInfo.isAccessible) {
                      if (!isSelected) {
                        void switchActiveBoardAndClass(selectedCurriculumBoard, cls);
                      }
                    } else {
                      onOpenMembership('premium', cls, selectedCurriculumBoard, 'BOARD_CLASS');
                    }
                  }}
                  className={`p-2.5 rounded-2xl border text-center transition-all relative ${cardStyle}`}
                >
                  {isSelected ? (
                    <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950 text-[9px] font-black uppercase">
                      Active
                    </span>
                  ) : cInfo.isPaidActive ? (
                    <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-emerald-600 text-white text-[9px] font-black uppercase">
                      Paid
                    </span>
                  ) : cInfo.isFreeBase ? (
                    <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-indigo-600 text-white text-[9px] font-black uppercase">
                      Free
                    </span>
                  ) : (
                    <span className="absolute -top-2 right-2 px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold uppercase flex items-center gap-0.5">
                      <Lock className="w-2.5 h-2.5" /> ₹99
                    </span>
                  )}
                  <div className="text-xs font-black">{cls}</div>
                  <div
                    className={`text-[10px] font-bold mt-0.5 ${
                      isSelected ? 'text-indigo-100' : 'text-slate-500'
                    }`}
                  >
                    {selectedCurriculumBoard === 'Maharashtra'
                      ? meta?.marathiLabel
                      : getBoardShortLabel(selectedCurriculumBoard)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Role-Scoped Categories & Paid Access Overview */}
        {(() => {
          const visibleCats = getVisibleExamCategoriesForStudent(currentStudent);
          const allClassesActive =
            hasCategoryAccess(currentStudent, 'all_classes') ||
            getActivatedBoardClassesList(currentStudent).length > 0;
          const sch4Info = getCategorySubscriptionInfo(currentStudent, 'scholarship_4th');
          const sch7Info = getCategorySubscriptionInfo(currentStudent, 'scholarship_7th');
          const tetInfo = getCategorySubscriptionInfo(currentStudent, 'maha_tet');
          const ctet1Info = getCategorySubscriptionInfo(currentStudent, 'ctet_paper_1');
          const ctet2Info = getCategorySubscriptionInfo(currentStudent, 'ctet_paper_2');

          const rawSelectedTeacherCats: CategoryId[] =
            visibleCats.isTeacher &&
            Array.isArray(currentStudent.selectedTeacherCategories) &&
            currentStudent.selectedTeacherCategories.length > 0
              ? currentStudent.selectedTeacherCategories
              : [
                  'all_classes',
                  'scholarship_4th',
                  'scholarship_7th',
                  'maha_tet',
                  'ctet_paper_1',
                  'ctet_paper_2',
                ];

          const isTeacherCatSelected = (catId: CategoryId) =>
            rawSelectedTeacherCats.includes(catId);

          const toggleDashboardTeacherCat = (catId: CategoryId | 'ctet_both') => {
            const next = new Set<CategoryId>(rawSelectedTeacherCats);
            if (catId === 'ctet_both') {
              const bothOn = next.has('ctet_paper_1') && next.has('ctet_paper_2');
              if (bothOn) {
                next.delete('ctet_paper_1');
                next.delete('ctet_paper_2');
              } else {
                next.add('ctet_paper_1');
                next.add('ctet_paper_2');
              }
            } else {
              if (next.has(catId)) {
                if (next.size > 1) next.delete(catId);
              } else {
                next.add(catId);
              }
            }
            void updateTeacherSelectedCategories(Array.from(next));
          };

          interface CategoryTile {
            id: string;
            categoryId: CategoryId;
            title: string;
            subtitle: string;
            isVisible: boolean;
            isSelectedByTeacher: boolean;
            isUnlocked: boolean;
            statusText: string;
            priceLabel: string;
            sku: PlanSkuId;
            targetTab: string;
          }

          const teacherClassesTile: CategoryTile | null = visibleCats.isTeacher
            ? {
                id: 'all-classes',
                categoryId: 'all_classes',
                title: 'Classes 1 to 10 (All Boards)',
                subtitle: 'Maharashtra, CBSE & ICSE Worksheets, Quizzes & Notes',
                isVisible: true,
                isSelectedByTeacher: isTeacherCatSelected('all_classes'),
                isUnlocked: allClassesActive,
                statusText: hasCategoryAccess(currentStudent, 'all_classes')
                  ? 'All Classes Bundle Active'
                  : allClassesActive
                  ? `${getActivatedBoardClassesList(currentStudent).length} Class Plan(s) Active`
                  : 'Free Demo Only',
                priceLabel: '₹99/Class · ₹499 All',
                sku: 'BOARD_CLASS',
                targetTab: 'all-courses',
              }
            : null;

          const tiles: CategoryTile[] = [
            ...(teacherClassesTile ? [teacherClassesTile] : []),
            {
              id: 'scholarship-4th',
              categoryId: 'scholarship_4th',
              title: '4th Scholarship (MSCE PSE)',
              subtitle: '25 Full Mock Tests (Paper 1 & 2) + 10 Practice Sets',
              isVisible: visibleCats.showScholarship4th,
              isSelectedByTeacher: isTeacherCatSelected('scholarship_4th'),
              isUnlocked: sch4Info.isPaidActive,
              statusText: sch4Info.isPaidActive
                ? `Unlocked (${sch4Info.daysRemainingDisplay})`
                : 'Preview Set #1 Free • Locked',
              priceLabel: '₹99 / 365d',
              sku: 'SCHOLARSHIP_4TH',
              targetTab: 'scholarship',
            },
            {
              id: 'scholarship-7th',
              categoryId: 'scholarship_7th',
              title: '7th Scholarship (MSCE UPS)',
              subtitle: '25 Full Mock Tests (Paper 1 & 2) + 10 Practice Sets',
              isVisible: visibleCats.showScholarship7th,
              isSelectedByTeacher: isTeacherCatSelected('scholarship_7th'),
              isUnlocked: sch7Info.isPaidActive,
              statusText: sch7Info.isPaidActive
                ? `Unlocked (${sch7Info.daysRemainingDisplay})`
                : 'Preview Set #1 Free • Locked',
              priceLabel: '₹99 / 365d',
              sku: 'SCHOLARSHIP_7TH',
              targetTab: 'scholarship',
            },
            {
              id: 'maha-tet',
              categoryId: 'maha_tet',
              title: 'Maharashtra TET (Paper 1 & 2)',
              subtitle: '100 Full Mock Exams, Subject Drills & MSCE Syllabi',
              isVisible: visibleCats.showMahaTet,
              isSelectedByTeacher: isTeacherCatSelected('maha_tet'),
              isUnlocked: tetInfo.isPaidActive,
              statusText: tetInfo.isPaidActive
                ? `Unlocked (${tetInfo.daysRemainingDisplay})`
                : 'Preview Mock 01 Free • Locked',
              priceLabel: '₹149 / 365d',
              sku: 'MAHA_TET',
              targetTab: 'tet-ctet',
            },
            {
              id: 'ctet-p1',
              categoryId: 'ctet_paper_1',
              title: 'CTET Paper 1 (Classes 1–5)',
              subtitle: '50 CBT Mock Tests, Pedagogy & PYQ Simulations',
              isVisible: visibleCats.showCtetP1,
              isSelectedByTeacher: isTeacherCatSelected('ctet_paper_1'),
              isUnlocked: ctet1Info.isPaidActive,
              statusText: ctet1Info.isPaidActive
                ? `Unlocked (${ctet1Info.daysRemainingDisplay})`
                : 'Preview Mock 01 Free • Locked',
              priceLabel: '₹149 / 365d',
              sku: 'CTET_PAPER_1',
              targetTab: 'tet-ctet',
            },
            {
              id: 'ctet-p2',
              categoryId: 'ctet_paper_2',
              title: 'CTET Paper 2 (Classes 6–8)',
              subtitle: '50 CBT Mock Tests (Math/Science & Social Studies)',
              isVisible: visibleCats.showCtetP2,
              isSelectedByTeacher: isTeacherCatSelected('ctet_paper_2'),
              isUnlocked: ctet2Info.isPaidActive,
              statusText: ctet2Info.isPaidActive
                ? `Unlocked (${ctet2Info.daysRemainingDisplay})`
                : 'Preview Mock 01 Free • Locked',
              priceLabel: '₹149 / 365d',
              sku: 'CTET_PAPER_2',
              targetTab: 'tet-ctet',
            },
          ];

          const visibleTiles = tiles
            .filter((t) => t.isVisible)
            .sort((a, b) => Number(b.isSelectedByTeacher) - Number(a.isSelectedByTeacher));
          if (visibleTiles.length === 0) return null;

          const bothCtetSelected =
            isTeacherCatSelected('ctet_paper_1') && isTeacherCatSelected('ctet_paper_2');
          const bothCtetUnlocked = ctet1Info.isPaidActive && ctet2Info.isPaidActive;

          return (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-xs sm:text-sm font-display font-black text-slate-900 flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>
                      {visibleCats.isTeacher
                        ? 'Teacher / TET Aspirant Selected Categories & Paid Access'
                        : 'Your Class Exam & Scholarship Categories'}
                    </span>
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Categories are visible for browsing and free previews. Full mock tests and practice sets unlock upon plan purchase.
                  </p>
                </div>
                {visibleCats.isTeacher && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0 self-start sm:self-auto">
                    {!bothCtetUnlocked && (
                      <button
                        type="button"
                        onClick={() =>
                          onOpenMembership(
                            'premium',
                            currentStudent.classLevel,
                            activeBoard,
                            'CTET_COMBO'
                          )
                        }
                        className="px-3 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Both CTET Papers (₹229)</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        onOpenMembership(
                          'premium',
                          currentStudent.classLevel,
                          activeBoard,
                          'TEACHER_ALL_ACCESS'
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>All-Access Educator Bundle (₹499)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Teacher Selected Registration Categories Filter / Customizer Bar */}
              {visibleCats.isTeacher && (
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="font-black text-emerald-950 uppercase tracking-wider">
                      Your Selected Teacher / TET Categories (Click to Toggle Anytime):
                    </span>
                    <span className="font-bold text-emerald-800">
                      {rawSelectedTeacherCats.length} of 6 Selected
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all_classes' as const, label: 'Classes 1 to 10', active: isTeacherCatSelected('all_classes') },
                      { id: 'scholarship_4th' as const, label: '4th Scholarship', active: isTeacherCatSelected('scholarship_4th') },
                      { id: 'scholarship_7th' as const, label: '7th Scholarship', active: isTeacherCatSelected('scholarship_7th') },
                      { id: 'maha_tet' as const, label: 'Maharashtra TET', active: isTeacherCatSelected('maha_tet') },
                      { id: 'ctet_paper_1' as const, label: 'CTET Paper 1', active: isTeacherCatSelected('ctet_paper_1') },
                      { id: 'ctet_paper_2' as const, label: 'CTET Paper 2', active: isTeacherCatSelected('ctet_paper_2') },
                      { id: 'ctet_both' as const, label: 'Both CTET Papers', active: bothCtetSelected },
                    ].map((pill) => (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => toggleDashboardTeacherCat(pill.id)}
                        className={`px-2.5 py-1 rounded-xl text-[11px] font-black border transition-all cursor-pointer flex items-center gap-1 ${
                          pill.active
                            ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-400'
                        }`}
                      >
                        <CheckCircle2 className="w-3 h-3 shrink-0" />
                        <span>{pill.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {visibleTiles.map((tile) => (
                  <div
                    key={tile.id}
                    className={`rounded-2xl border p-3.5 flex flex-col justify-between gap-3 ${
                      tile.isUnlocked
                        ? 'bg-emerald-50/70 border-emerald-300'
                        : visibleCats.isTeacher && tile.isSelectedByTeacher
                        ? 'bg-indigo-50/50 border-indigo-200'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-display font-black text-xs sm:text-sm text-slate-900">
                          {tile.title}
                        </span>
                        {tile.isUnlocked ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-black flex items-center gap-1 shrink-0">
                            <CheckCircle2 className="w-3 h-3" /> Active
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black flex items-center gap-1 shrink-0">
                            <Lock className="w-2.5 h-2.5" /> {tile.priceLabel}
                          </span>
                        )}
                      </div>
                      {visibleCats.isTeacher && (
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider ${
                              tile.isSelectedByTeacher
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {tile.isSelectedByTeacher ? '✓ Selected Category' : 'Available Category'}
                          </span>
                        </div>
                      )}
                      <p className="text-[11px] text-slate-600 leading-snug">{tile.subtitle}</p>
                      <p
                        className={`text-[10px] font-extrabold ${
                          tile.isUnlocked ? 'text-emerald-800' : 'text-slate-500'
                        }`}
                      >
                        {tile.statusText}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onNavigateTab(tile.targetTab)}
                        className="flex-1 py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] cursor-pointer transition-colors"
                      >
                        {tile.isUnlocked ? 'Open Test Section' : 'Open Section'}
                      </button>
                      {!tile.isUnlocked && (
                        <button
                          type="button"
                          onClick={() =>
                            onOpenMembership(
                              'premium',
                              currentStudent.classLevel,
                              selectedCurriculumBoard,
                              tile.sku
                            )
                          }
                          className="py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] cursor-pointer transition-colors shrink-0"
                        >
                          Unlock Plan
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
