import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ClassLevel, EducationBoard, SubjectName, QuizLevel } from '../types';
import { calculateLevel } from '../data/badgesData';
import {
  Crown,
  ArrowRight,
  Lock,
  ChevronRight,
  User,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Copy,
  Share2,
  Check,
} from 'lucide-react';
import {
  getBoardClassSubscriptionInfo,
  getActivatedBoardClassesList,
  getBoardShortLabel,
  getStudentPlanInfo,
} from '../utils/subscriptionAccess';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import {
  generateUniqueStudentReferralCode,
  buildStudentReferralLink,
} from '../utils/referralCoding';
import {
  ALL_10_CLASSES,
  ALL_10_CLASSES_META,
  getSubjectsForClass,
} from '../data/classCurriculumConfig';
import { getAllWorksheetsForClass } from '../data/worksheetsData';
import { NavSubActionId } from '../data/navigationConfig';
import { ReferenceShowcaseSections } from './ReferenceShowcaseSections';

interface StudentDashboardProps {
  onNavigateTab: (tab: string, subjectParam?: SubjectName, levelParam?: QuizLevel) => void;
  onOpenMembership: (plan?: 'basic' | 'premium', targetClass?: ClassLevel, targetBoard?: EducationBoard) => void;
  viewMode?: 'auto' | 'desktop';
  onToggleViewMode?: () => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  onOpenDemo?: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  onNavigateTab,
  onOpenMembership,
  viewMode = 'desktop',
  onToggleViewMode,
  onMenuAction,
  onOpenDemo,
}) => {
  const {
    currentStudent,
    activeBoard,
    allAttempts,
    getSubjectLevelProgress,
    switchActiveBoardAndClass,
  } = useApp();
  const [copiedDashRefLink, setCopiedDashRefLink] = useState(false);
  const [selectedCurriculumBoard, setSelectedCurriculumBoard] = useState<EducationBoard>(activeBoard);

  useEffect(() => {
    setSelectedCurriculumBoard(activeBoard);
  }, [activeBoard]);

  if (!currentStudent) return null;

  const activeClassSubjects = getSubjectsForClass(currentStudent.classLevel, activeBoard);
  const classWorksheets = getAllWorksheetsForClass(currentStudent.classLevel, activeBoard);
  const completedWorksheetsCount = classWorksheets.filter((w) =>
    (currentStudent.completedWorksheetIds || []).includes(w.id)
  ).length;

  const studentReferralCode =
    currentStudent.referralCode ||
    generateUniqueStudentReferralCode(currentStudent.id, currentStudent.name);
  const studentReferralLink =
    currentStudent.referralLink || buildStudentReferralLink(studentReferralCode);

  const handleCopyDashboardRefLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(studentReferralLink);
      setCopiedDashRefLink(true);
      setTimeout(() => setCopiedDashRefLink(false), 2500);
    } catch {
      // Ignore clipboard fallback
    }
  };

  const handleShareDashboardRefLink = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareText = `Join MyStudyZone (${currentStudent.classLevel}) using my unique referral code ${studentReferralCode}! Register here: ${studentReferralLink}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'MyStudyZone Referral Link',
          text: shareText,
          url: studentReferralLink,
        });
        return;
      } catch {
        // Fallback
      }
    }
    await handleCopyDashboardRefLink(e);
  };

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
      {/* SECTION 1: FOCUSED HOME DASHBOARD (Welcome Banner, 3-Question Guide, Main Categories, Popular Programmes, Progress & Daily Challenge, Announcements & Quick Access) */}
      <ReferenceShowcaseSections
        selectedBoard={activeBoard}
        selectedClass={currentStudent.classLevel}
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
                      onOpenMembership('premium', cls, selectedCurriculumBoard);
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

        {/* Compact Referral Link Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="font-bold text-slate-700">
              Referral Code: <strong className="font-mono text-slate-900">{studentReferralCode}</strong> (Earn ₹5 Cashback per verified ₹99 referral)
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyDashboardRefLink}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copiedDashRefLink ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedDashRefLink ? 'Copied!' : 'Copy Link'}</span>
            </button>
            <button
              type="button"
              onClick={handleShareDashboardRefLink}
              className="px-3 py-1.5 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('referrals')}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs flex items-center gap-1 cursor-pointer"
            >
              <span>Referral Wallet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
