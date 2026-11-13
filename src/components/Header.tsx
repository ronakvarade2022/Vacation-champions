import React, { useState } from 'react';
import { useApp, UserRole } from '../context/AppContext';
import { ClassLevel } from '../types';
import { 
  Trophy, 
  Flame, 
  Bell, 
  Crown, 
  User, 
  Sparkles, 
  CheckCircle,
  Menu,
  X,
  ShieldCheck,
  HeartHandshake,
  Lock,
  Info,
  Home,
  Medal,
  GraduationCap,
  Star,
  Bot,
  Grid3X3,
  FileText,
  Activity,
  BookOpen,
  Puzzle,
  Palette,
  Gift,
  LogOut,
  LogIn,
  ChevronRight,
  LifeBuoy,
  HelpCircle,
  Scale,
  AlertTriangle,
  Mail,
  Phone,
  ChevronDown
} from 'lucide-react';

import {
  ALL_CLASS_LEVELS,
  canAccessFeature,
  getAccessibleClassesList,
  getClassSubscriptionInfo,
  getStudentPlanInfo
} from '../utils/subscriptionAccess';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenAuth: (defaultTab?: 'login' | 'teacher' | 'register' | 'admin' | 'forgot') => void;
  onOpenMembership: (targetClass?: ClassLevel) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onOpenAuth,
  onOpenMembership
}) => {
  const { 
    activeRole, 
    currentUser,
    switchRole,
    currentStudent, 
    switchActiveClass,
    notifications,
    markNotificationAsRead,
    logout
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showClassSwitcher, setShowClassSwitcher] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const isLearningRole = activeRole === 'student' || activeRole === 'teacher';

  const handleRoleChange = (role: UserRole) => {
    const res = switchRole(role);
    if (!res.allowed) {
      return;
    }
    if (role === 'admin') setCurrentTab('admin');
    else if (currentTab === 'admin') setCurrentTab('dashboard');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Top Banner with Tagline, DEMO Section Button & Role Switcher */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-white px-4 py-1.5 text-xs font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-bold tracking-wider uppercase text-[11px] bg-white/20 px-2 py-0.5 rounded-sm">
              MyStudyZone • Interactive Learning Platform
            </span>
            <span className="hidden lg:inline text-[11px] font-semibold text-amber-100">
              Learn, Practice, Explore and Achieve Excellence.
            </span>
            {currentUser && (
              <span className="hidden md:inline bg-black/25 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-amber-100 border border-white/20">
                {currentUser.role === 'admin' && '🛡️ Master Admin Portal'}
                {currentUser.role === 'teacher' && '👩‍🏫 Teacher Portal: ' + currentUser.displayName + (currentStudent ? ` (${currentStudent.classLevel})` : '')}
                {currentUser.role === 'student' && '🎓 Student Portal: ' + currentUser.displayName + (currentStudent ? ` (${currentStudent.classLevel})` : '')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Dedicated Visitor Demo Section Button */}
            <button
              type="button"
              onClick={() => setCurrentTab('demo')}
              className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold flex items-center gap-1 transition-all cursor-pointer border ${
                currentTab === 'demo'
                  ? 'bg-slate-900 text-amber-300 border-amber-300 shadow-xs'
                  : 'bg-amber-900/60 hover:bg-amber-900 text-white border-amber-300/40'
              }`}
              title="Explore interactive MyStudyZone Demo (Classes 1st to 10th)"
            >
              <Sparkles className="w-3 h-3" />
              <span>Explore Demo</span>
            </button>

            {/* Portal Switcher Tabs: Student Portal & Teacher Portal (+ Admin) */}
            <div className="flex items-center gap-1 bg-black/20 p-0.5 rounded-md text-[11px]">
              <button
                onClick={() => handleRoleChange('student')}
                className={`px-2.5 py-0.5 rounded transition-all flex items-center gap-1 cursor-pointer ${activeRole === 'student' ? 'bg-white text-amber-900 font-bold shadow-xs' : 'text-amber-100 hover:text-white'}`}
              >
                <User className="w-3 h-3" />
                Student Portal
              </button>
              <button
                onClick={() => handleRoleChange('teacher')}
                className={`px-2.5 py-0.5 rounded transition-all flex items-center gap-1 cursor-pointer ${activeRole === 'teacher' ? 'bg-white text-emerald-900 font-bold shadow-xs' : 'text-amber-100 hover:text-white'}`}
              >
                <GraduationCap className="w-3 h-3" />
                Teacher Portal
              </button>
              <button
                onClick={() => handleRoleChange('admin')}
                className={`px-2.5 py-0.5 rounded transition-all flex items-center gap-1 cursor-pointer ${activeRole === 'admin' ? 'bg-white text-amber-900 font-bold shadow-xs' : 'text-amber-100 hover:text-white'}`}
              >
                <ShieldCheck className="w-3 h-3" />
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => {
            setCurrentTab('dashboard');
            if (activeRole === 'admin') handleRoleChange('student');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight bg-gradient-to-r from-amber-800 via-orange-800 to-amber-900 bg-clip-text text-transparent">
                MyStudyZone
              </span>
              <span className="hidden md:inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                {activeRole === 'teacher' ? 'Teacher Portal' : 'Interactive Learning Platform'}
              </span>
            </div>
            <p className="text-[11px] text-amber-800/90 font-semibold hidden sm:block">
              MyStudyZone – An Interactive Learning Platform for Students • Learn, Practice, Explore and Achieve Excellence.
            </p>
          </div>
        </div>

        {/* Center Navigation Links (Desktop — Shared across Student Portal & Teacher Portal) */}
        {isLearningRole && (
          <nav className="hidden xl:flex items-center gap-1.5 bg-amber-50/70 p-1 rounded-2xl border border-amber-200/60 overflow-x-auto max-w-[680px]">
            {/* Learning Zone */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'dashboard' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Home className="w-3.5 h-3.5" />
                </span>
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => setCurrentTab('profile')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'profile' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </span>
                <span>My Profile</span>
              </button>

              <button
                onClick={() => setCurrentTab('quizzes')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'quizzes' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </span>
                <span>Quizzes</span>
              </button>

              <button
                onClick={() => setCurrentTab('worksheets')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'worksheets' ? 'bg-white text-indigo-950 shadow-xs ring-1 ring-indigo-300' : 'text-slate-700 hover:text-indigo-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <span>Worksheets</span>
              </button>

              <button
                onClick={() => setCurrentTab('stories')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'stories' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <span>Stories (45)</span>
                {!canAccessFeature(currentStudent, 'stories').allowed && (
                  <Lock className="w-3 h-3 text-indigo-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentTab('puzzles')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'puzzles' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Puzzle className="w-3.5 h-3.5" />
                </span>
                <span>Puzzles</span>
              </button>

              <button
                onClick={() => setCurrentTab('sudoku')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'sudoku' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Grid3X3 className="w-3.5 h-3.5" />
                </span>
                <span>Sudoku</span>
              </button>
            </div>

            <div className="w-px h-5 bg-amber-200 mx-0.5" />

            {/* Championship Zone */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentTab('cricket')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'cricket' ? 'bg-white text-emerald-950 shadow-xs ring-1 ring-emerald-300' : 'text-slate-700 hover:text-emerald-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </span>
                <span>Cricket</span>
                {!canAccessFeature(currentStudent, 'cricket').allowed && (
                  <Lock className="w-3 h-3 text-amber-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentTab('drawing')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'drawing' ? 'bg-white text-rose-950 shadow-xs ring-1 ring-rose-300' : 'text-slate-700 hover:text-rose-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                  <Palette className="w-3.5 h-3.5" />
                </span>
                <span>Drawing</span>
                {!canAccessFeature(currentStudent, 'drawing').allowed && (
                  <Lock className="w-3 h-3 text-indigo-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentTab('scholarship')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'scholarship' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Trophy className="w-3.5 h-3.5" />
                </span>
                <span>Scholarship</span>
                {!canAccessFeature(currentStudent, 'scholarship').allowed && (
                  <Lock className="w-3 h-3 text-amber-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentTab('shivaji')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'shivaji' ? 'bg-white text-orange-950 shadow-xs ring-1 ring-orange-400' : 'text-slate-700 hover:text-orange-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-orange-100 text-orange-700 flex items-center justify-center shrink-0">
                  <Crown className="w-3.5 h-3.5" />
                </span>
                <span>Shivaji (50)</span>
                {!canAccessFeature(currentStudent, 'shivaji').allowed && (
                  <Lock className="w-3 h-3 text-indigo-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentTab('future-skills')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'future-skills' ? 'bg-white text-purple-950 shadow-xs ring-1 ring-purple-400' : 'text-slate-700 hover:text-purple-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </span>
                <span>AI Skills</span>
                {!canAccessFeature(currentStudent, 'future-skills').allowed && (
                  <Lock className="w-3 h-3 text-amber-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentTab('certificates')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'certificates' ? 'bg-white text-amber-950 shadow-xs ring-1 ring-amber-300' : 'text-slate-700 hover:text-amber-900'
                }`}
              >
                <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-3.5 h-3.5" />
                </span>
                <span>Certificates</span>
                {!canAccessFeature(currentStudent, 'certificates').allowed && (
                  <Lock className="w-3 h-3 text-amber-600" />
                )}
              </button>

              <button
                onClick={() => setCurrentTab('referrals')}
                className={`px-2.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'referrals' 
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs' 
                    : 'text-orange-700 hover:bg-orange-50'
                }`}
              >
                <span className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                  currentTab === 'referrals' ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'
                }`}>
                  <Gift className="w-3.5 h-3.5" />
                </span>
                <span>Refer &amp; Earn</span>
                {!canAccessFeature(currentStudent, 'referrals').allowed && (
                  <Lock className="w-3 h-3 text-amber-700" />
                )}
              </button>
            </div>
          </nav>
        )}

        {/* Right Section: Class Selector, Student/Teacher Badge & Actions */}
        <div className="flex items-center gap-3">
          {/* Active Class & Multi-Class Switcher Badge (Switch Only Unlocked Classes • Locked Stay Locked) */}
          {isLearningRole && currentStudent && (() => {
            const accessibleClasses = getAccessibleClassesList(currentStudent);
            return (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setShowClassSwitcher(!showClassSwitcher);
                    setShowNotifications(false);
                    setShowProfileDropdown(false);
                  }}
                  className="flex items-center gap-1.5 bg-amber-100/90 hover:bg-amber-200/80 border border-amber-300/90 px-2.5 py-1 rounded-xl shadow-2xs cursor-pointer transition-colors"
                  title={`Active Class: ${currentStudent.classLevel} (${accessibleClasses.length} unlocked). Click to switch or add classes.`}
                >
                  <GraduationCap className="w-3.5 h-3.5 text-amber-800" />
                  <span className="text-xs font-extrabold text-amber-950">
                    {currentStudent.classLevel}
                  </span>
                  {accessibleClasses.length > 1 && (
                    <span className="text-[9px] bg-emerald-600 text-white px-1.5 py-0.2 rounded-full font-black hidden sm:inline">
                      {accessibleClasses.length} Classes
                    </span>
                  )}
                  <ChevronDown className="w-3 h-3 text-amber-800" />
                </button>

                {showClassSwitcher && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowClassSwitcher(false)}
                    />
                    <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-xs sm:w-72 mx-auto bg-white rounded-2xl shadow-2xl border-2 border-amber-300 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="bg-amber-50 px-3.5 py-2.5 border-b border-amber-200 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-black text-amber-950">Class Subscriptions (1st–10th)</p>
                          <p className="text-[10px] text-slate-600 font-medium">Switch unlocked classes or activate ₹99/yr</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowClassSwitcher(false)}
                          className="text-slate-400 hover:text-slate-700 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="p-2.5 grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto">
                        {ALL_CLASS_LEVELS.map((cls) => {
                          const cInfo = getClassSubscriptionInfo(currentStudent, cls);
                          const isCurrent = currentStudent.classLevel === cls;
                          return (
                            <button
                              key={cls}
                              type="button"
                              onClick={async () => {
                                setShowClassSwitcher(false);
                                if (cInfo.isAccessible) {
                                  await switchActiveClass(cls);
                                } else {
                                  onOpenMembership(cls);
                                }
                              }}
                              className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                                isCurrent
                                  ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                                  : cInfo.isPaidActive
                                  ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300'
                                  : cInfo.isFreeBase
                                  ? 'bg-white hover:bg-indigo-50 text-slate-800 border-indigo-300'
                                  : cInfo.isExpired
                                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300'
                                  : 'bg-slate-50 hover:bg-amber-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black">{cls}</span>
                                {!cInfo.isAccessible && <Lock className="w-3 h-3 text-amber-600" />}
                              </div>
                              <span className={`text-[9px] font-bold block truncate ${isCurrent ? 'text-indigo-100' : 'text-slate-500'}`}>
                                {isCurrent
                                  ? 'Active Now'
                                  : cInfo.isPaidActive
                                  ? `${cInfo.daysRemaining}d left`
                                  : cInfo.isFreeBase
                                  ? 'Free Base'
                                  : cInfo.isExpired
                                  ? 'Expired • Renew'
                                  : 'Unlock ₹99'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="p-2.5 border-t border-slate-100 bg-slate-50">
                        <button
                          type="button"
                          onClick={() => {
                            setShowClassSwitcher(false);
                            onOpenMembership();
                          }}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-[11px] cursor-pointer shadow-xs"
                        >
                          + Activate / Renew Class Subscription (₹99)
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })()}

          {/* Student/Teacher Stats Pill (Points & Streak) */}
          {isLearningRole && currentStudent && (
            <div className="hidden md:flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 font-bold text-amber-900 bg-amber-100/80 px-2.5 py-1 rounded-full border border-amber-300/60" title="Champion Points">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{currentStudent.points} pts</span>
              </div>
              <div className="flex items-center gap-1 font-bold text-orange-900 bg-orange-100/80 px-2.5 py-1 rounded-full border border-orange-300/60" title="Daily Streak">
                <Flame className="w-3.5 h-3.5 text-orange-600" />
                <span>{currentStudent.streakDays}d</span>
              </div>
            </div>
          )}

          {/* Membership Badge or Upgrade CTA (Authenticated Learners Only) */}
          {currentStudent && (() => {
            const pInfo = getStudentPlanInfo(currentStudent);
            if (pInfo.effectivePlan === 'free') {
              return (
                <button
                  onClick={() => onOpenMembership(currentStudent.classLevel)}
                  className={`hidden sm:flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs hover:shadow-md transition-all cursor-pointer ${
                    pInfo.isPaidPlanExpired
                      ? 'bg-gradient-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700'
                      : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600'
                  }`}
                  title={
                    pInfo.isPaidPlanExpired
                      ? `Previous ${pInfo.expiredPlanName} expired. Currently on FREE PLAN – ₹0 – Lifetime. Click to renew ₹99 Premium for 365 Days (1 Year).`
                      : 'Current Plan: FREE PLAN – ₹0 – Lifetime. Click to upgrade to ₹99 Premium (365 Days / 1 Year).'
                  }
                >
                  <Crown className="w-3.5 h-3.5" />
                  <span>
                    {pInfo.isPaidPlanExpired
                      ? 'Free Plan (Expired) • Renew ₹99'
                      : 'FREE PLAN (₹0) • Upgrade ₹99 (1 Yr)'}
                  </span>
                </button>
              );
            }
            return (
              <div
                onClick={() => onOpenMembership(currentStudent.classLevel)}
                className={`hidden sm:flex items-center gap-1.5 text-[11px] font-extrabold border px-2.5 py-1 rounded-lg cursor-pointer transition-colors ${
                  pInfo.isExpiringToday
                    ? 'bg-amber-100 text-amber-950 border-amber-400 hover:bg-amber-200'
                    : 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                }`}
                title={`Active Plan: ${pInfo.planDisplayName} • ${pInfo.daysRemainingDisplay} • Expires: ${pInfo.expiryDisplay}`}
              >
                <Crown className={`w-3.5 h-3.5 ${pInfo.isExpiringToday ? 'text-amber-700' : 'text-emerald-600'}`} />
                <span>
                  {pInfo.isExpiringToday
                    ? 'PREMIUM – ₹99 (Expires Today)'
                    : `PREMIUM – ₹99 (${pInfo.daysRemaining}d left)`}
                </span>
              </div>
            );
          })()}

          {/* Signed-Out Visitor Quick CTAs (Desktop) */}
          {!currentStudent && !currentUser && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrentTab('demo')}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'demo'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border-indigo-200'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore Demo</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black transition-all cursor-pointer shadow-xs"
              >
                Register Free
              </button>
            </div>
          )}

          {/* Notification Bell (Authenticated Users Only) */}
          {(currentStudent || currentUser) && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-amber-800 hover:bg-amber-100/50 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown Panel */}
              {showNotifications && (
                <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-sm sm:w-80 w-auto mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-100 flex items-center justify-between">
                    <h4 className="font-bold text-xs text-amber-900">Notifications &amp; Alerts</h4>
                    <span className="text-[10px] text-slate-500">{notifications.length} total</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">No new notifications.</div>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3 text-xs hover:bg-amber-50/50 transition-colors cursor-pointer ${n.read ? 'opacity-70' : 'bg-amber-50/30'}`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-800">{n.title}</span>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Prominent Student/Teacher Profile Button (Authenticated Learners Only) */}
          {currentStudent && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 sm:gap-2 border transition-all cursor-pointer ${
                showProfileDropdown || currentTab === 'profile'
                  ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                  : 'bg-amber-50/90 hover:bg-amber-100 text-amber-950 border-amber-300 shadow-2xs'
              }`}
              title="Open Student Profile (विद्यार्थी प्रोफाइल पहा)"
              aria-expanded={showProfileDropdown}
            >
              <div className="w-6 h-6 rounded-lg bg-amber-200 border border-amber-300 flex items-center justify-center text-xs shrink-0">
                {currentStudent?.avatar || '👤'}
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <span className="font-extrabold text-xs">Profile</span>
              </div>
              {currentStudent && (
                <span className="hidden xl:inline-block text-[10px] font-bold text-amber-900/70 bg-amber-200/50 px-1.5 py-0.5 rounded truncate max-w-[70px]">
                  {currentStudent.name.split(' ')[0]}
                </span>
              )}
            </button>

            {/* Profile Dropdown Card Anchored Directly to the Profile Icon */}
            {showProfileDropdown && (
              <>
                {/* Backdrop to close on click outside */}
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileDropdown(false)} 
                />

                <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-sm sm:w-88 w-auto mx-auto bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
                  {/* Top Profile Card Header */}
                  <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white p-4 shrink-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-3xl shadow-inner shrink-0">
                          {currentStudent?.avatar || '🦁'}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-amber-200" />
                            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-100">
                              Student Profile
                            </span>
                          </div>
                          <h4 className="font-display font-extrabold text-base sm:text-lg leading-tight truncate">
                            {currentStudent?.name || 'Student Account'}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="px-2 py-0.5 rounded-full bg-black/25 text-[10px] font-bold text-amber-200 border border-white/20">
                              {currentStudent?.classLevel || 'Enrolled'}
                            </span>
                            <span className="font-mono text-[10px] text-amber-100 opacity-90">
                              UID: {currentStudent?.id}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowProfileDropdown(false)}
                        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors shrink-0"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Body Content - Scrollable with 13 Options */}
                  <div className="p-4 space-y-3 bg-white text-xs overflow-y-auto flex-1 overscroll-contain">
                    {/* Active Subscription Badge */}
                    {(() => {
                      const pInfo = getStudentPlanInfo(currentStudent);
                      return (
                        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                              Active Subscription
                            </span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              pInfo.isPaidPlanExpired
                                ? 'bg-rose-100 text-rose-800'
                                : pInfo.isExpiringToday
                                ? 'bg-amber-200 text-amber-950'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              ● {pInfo.isPaidPlanExpired ? 'Expired' : pInfo.isExpiringToday ? 'Expires Today' : 'Active'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5">
                              <Crown className="w-4 h-4 text-amber-600 shrink-0" />
                              <span className="truncate">{pInfo.planDisplayName}</span>
                            </span>
                            <span className="font-bold text-emerald-700 text-xs shrink-0">
                              {pInfo.daysRemainingDisplay}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium">
                            {pInfo.isPaidPlanExpired
                              ? `Expired (${pInfo.expiryDisplay}). Currently on Free Plan.`
                              : pInfo.isLifetimeFree
                              ? 'Lifetime Validity (Never Expires)'
                              : `Purchased: ${pInfo.purchasedDisplay} • Expires: ${pInfo.expiryDisplay}`}
                          </p>
                        </div>
                      );
                    })()}

                    {/* Student Key Stats */}
                    {currentStudent && (
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Champion Points</span>
                          <span className="font-extrabold text-sm text-amber-900 block mt-0.5">
                            🪙 {currentStudent.points} pts
                          </span>
                        </div>
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Daily Streak</span>
                          <span className="font-extrabold text-sm text-orange-900 block mt-0.5">
                            🔥 {currentStudent.streakDays} Days
                          </span>
                        </div>
                      </div>
                    )}

                    {/* 13-Option Directory Section */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1">
                        1. Profile & Account
                      </span>

                      {/* 1. My Profile */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('profile');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-xs flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>1. My Profile (माझी प्रोफाइल)</span>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      {/* 2. My Account */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('account');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-amber-700" />
                          <span>2. My Account (माझे खाते)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 3. My Subscription / Plan Details */}
                      <button
                        type="button"
                        onClick={() => {
                          onOpenMembership();
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 font-extrabold text-xs border border-amber-300 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-amber-600" />
                          <span>3. Subscription / Premium Plan (₹99)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-amber-600" />
                      </button>

                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1 pt-2">
                        2. Help & Support
                      </span>

                      {/* 4. Help & Support */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('help-support');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <LifeBuoy className="w-4 h-4 text-amber-600" />
                          <span>4. Help & Support (मदत केंद्र)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 5. Frequently Asked Questions (FAQs) */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('faqs');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <HelpCircle className="w-4 h-4 text-indigo-600" />
                          <span>5. FAQs (नेहमी विचारले जाणारे प्रश्न)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 6. Terms & Conditions */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('terms');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-slate-600" />
                          <span>6. Terms & Conditions (नियम व अटी)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 7. Privacy Policy */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('privacy');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Lock className="w-4 h-4 text-purple-600" />
                          <span>7. Privacy Policy (गोपनीयता धोरण)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 8. Disclaimer */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('disclaimer');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-600" />
                          <span>8. Disclaimer (शैक्षणिक अस्वीकरण)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 9. Grievance Redressal */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('grievance');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Scale className="w-4 h-4 text-indigo-700" />
                          <span>9. Grievance Redressal (तक्रार निवारण)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1 pt-2">
                        3. About & Contact
                      </span>

                      {/* 10. About Us */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('about');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Info className="w-4 h-4 text-blue-600" />
                          <span>10. About Us (आमच्याबद्दल)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 11. Contact Us */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('contact');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-extrabold text-xs border border-slate-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-rose-600" />
                          <span>11. Contact Us (संपर्क करा)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {/* 12. Referral Cashback & Wallet */}
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('referrals');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-extrabold text-xs border border-emerald-200 flex items-center justify-between gap-2 cursor-pointer transition-all"
                      >
                        <span className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-emerald-600" />
                          <span>12. Referral Wallet &amp; Withdraw (₹5 Cashback)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-emerald-600" />
                      </button>

                      {/* 13. Prominent Red SIGN OUT Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileDropdown(false);
                          setShowLogoutConfirm(true);
                        }}
                        className="w-full p-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-black text-xs uppercase tracking-wider shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
                      >
                        <LogOut className="w-4 h-4 text-white" />
                        <span>13. Sign Out / Logout (लॉग आउट)</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          )}

          {/* Dedicated Logout Button with Direct In-Place Confirmation at Logout Place Only */}
          {currentUser || currentStudent ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(!showLogoutConfirm);
                  setShowProfileDropdown(false);
                  setShowNotifications(false);
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-xl border text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                  showLogoutConfirm
                    ? 'bg-red-600 text-white border-red-700 shadow-sm ring-2 ring-red-300'
                    : 'bg-red-50 hover:bg-red-100 text-red-700 hover:text-red-800 border border-red-200'
                }`}
                title="Logout of account (लॉग आउट)"
                aria-expanded={showLogoutConfirm}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="font-bold">Logout</span>
              </button>

              {/* Direct In-Place Confirmation Popover — Exactly at Logout Place */}
              {showLogoutConfirm && (
                <>
                  {/* Backdrop to close on click outside */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLogoutConfirm(false)}
                  />

                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border-2 border-red-200 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-start gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900 leading-tight">
                          Confirm Log Out?
                        </h4>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                          {currentStudent ? `Sign out of ${currentStudent.name}?` : 'End your current session?'} Progress is saved.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setShowLogoutConfirm(false)}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer transition-colors text-center"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          setShowLogoutConfirm(false);
                          await logout();
                        }}
                        className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5 text-white" />
                        <span>Yes, Log Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              title="Sign In to MyStudyZone"
            >
              <LogIn className="w-3.5 h-3.5 text-white" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-amber-100/50 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu with 3 Organized Zones */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-amber-200 px-4 py-4 space-y-4 animate-in slide-in-from-top-2 max-h-[80vh] overflow-y-auto">
          {/* LEARNING ZONE */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider block px-1">
              📘 LEARNING ZONE
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { setCurrentTab('dashboard'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'dashboard' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Home className="w-3.5 h-3.5" />
                </span>
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => { setCurrentTab('profile'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'profile' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5" />
                </span>
                <span>My Profile</span>
              </button>

              <button
                onClick={() => { setCurrentTab('quizzes'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'quizzes' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </span>
                <span>Quizzes (1st–10th)</span>
              </button>

              <button
                onClick={() => { setCurrentTab('worksheets'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'worksheets' ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs' : 'bg-white text-slate-700 border-indigo-100 hover:bg-indigo-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </span>
                <span>Worksheets (1st–10th)</span>
              </button>

              <button
                onClick={() => { setCurrentTab('stories'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'stories' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <span>Story World (45)</span>
              </button>

              <button
                onClick={() => { setCurrentTab('puzzles'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'puzzles' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Puzzle className="w-3.5 h-3.5" />
                </span>
                <span>Brain Puzzles</span>
              </button>

              <button
                onClick={() => { setCurrentTab('sudoku'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'sudoku' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Grid3X3 className="w-3.5 h-3.5" />
                </span>
                <span>Sudoku Game</span>
              </button>
            </div>
          </div>

          {/* CHAMPIONSHIP ZONE */}
          <div className="space-y-1.5 pt-2 border-t border-amber-100">
            <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-wider block px-1">
              🏆 CHAMPIONSHIP ZONE
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => { setCurrentTab('cricket'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'cricket' ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs' : 'bg-white text-slate-700 border-emerald-100 hover:bg-emerald-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Activity className="w-3.5 h-3.5" />
                </span>
                <span>Cricket Quiz</span>
              </button>

              <button
                onClick={() => { setCurrentTab('drawing'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'drawing' ? 'bg-rose-600 text-white border-rose-600 shadow-xs' : 'bg-white text-slate-700 border-rose-100 hover:bg-rose-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
                  <Palette className="w-3.5 h-3.5" />
                </span>
                <span>Drawing</span>
              </button>

              <button
                onClick={() => { setCurrentTab('scholarship'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'scholarship' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Trophy className="w-3.5 h-3.5" />
                </span>
                <span>Scholarship</span>
              </button>

              <button
                onClick={() => { setCurrentTab('shivaji'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'shivaji' ? 'bg-orange-600 text-white border-orange-600 shadow-xs' : 'bg-white text-slate-700 border-orange-100 hover:bg-orange-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center shrink-0">
                  <Crown className="w-3.5 h-3.5" />
                </span>
                <span>Shivaji (50)</span>
              </button>

              <button
                onClick={() => { setCurrentTab('future-skills'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'future-skills' ? 'bg-purple-600 text-white border-purple-600 shadow-xs' : 'bg-white text-slate-700 border-purple-100 hover:bg-purple-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </span>
                <span>AI Skills</span>
              </button>

              <button
                onClick={() => { setCurrentTab('leaderboard'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'leaderboard' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Medal className="w-3.5 h-3.5" />
                </span>
                <span>Leaderboard</span>
              </button>

              <button
                onClick={() => { setCurrentTab('certificates'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'certificates' ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-slate-700 border-amber-100 hover:bg-amber-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-3.5 h-3.5" />
                </span>
                <span>Certificates</span>
              </button>

              <button
                onClick={() => { setCurrentTab('referrals'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left font-bold flex items-center gap-2 border transition-all ${
                  currentTab === 'referrals' ? 'bg-orange-600 text-white border-orange-600 shadow-xs' : 'bg-white text-orange-800 border-orange-200 hover:bg-orange-50'
                }`}
              >
                <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-800 flex items-center justify-center shrink-0">
                  <Gift className="w-3.5 h-3.5" />
                </span>
                <span>Refer & Earn (Rewards)</span>
              </button>
            </div>
          </div>

          {/* ACCOUNT & PLANS + DEMO SECTION */}
          <div className="pt-2 border-t border-amber-100 space-y-2">
            {currentStudent && (
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] space-y-1">
                <div className="flex items-center justify-between font-extrabold text-amber-950">
                  <span>Active Plan: {getStudentPlanInfo(currentStudent).planDisplayName}</span>
                  <span className="text-emerald-700">
                    {getStudentPlanInfo(currentStudent).daysRemainingDisplay}
                  </span>
                </div>
                <div className="text-[10px] text-slate-600 font-bold">
                  Plans: FREE (₹0 Lifetime) • PREMIUM (₹99 / 365 Days • 1 Year)
                </div>
              </div>
            )}
            <button
              onClick={() => { setCurrentTab('demo'); setMobileMenuOpen(false); }}
              className={`w-full p-2.5 rounded-xl text-center font-extrabold text-xs border transition-all flex items-center justify-center gap-2 cursor-pointer ${
                currentTab === 'demo'
                  ? 'bg-slate-900 text-amber-300 border-amber-400'
                  : 'bg-indigo-50 text-indigo-900 border-indigo-200 hover:bg-indigo-100'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Demo Mode (Classes 1st to 10th)</span>
            </button>
            <button
              onClick={() => { onOpenMembership(); setMobileMenuOpen(false); }}
              className="w-full p-3 rounded-2xl text-center bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>
                {currentStudent && getStudentPlanInfo(currentStudent).isPaidPlanExpired
                  ? 'Renew Premium Plan (₹99 – 365 Days / 1 Year)'
                  : 'View Plans & ₹99 Premium (365 Days / 1 Year)'}
              </span>
            </button>

            {/* Mobile Profile & Logout / Sign In & Register Buttons */}
            {currentUser || currentStudent ? (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => { setCurrentTab('profile'); setMobileMenuOpen(false); }}
                  className="p-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setMobileMenuOpen(false);
                    await logout();
                  }}
                  className="p-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-amber-100">
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth('register'); }}
                  className="p-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Register Free</span>
                </button>
                <button
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); onOpenAuth('login'); }}
                  className="p-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
