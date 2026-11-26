import React, { useState, useEffect, useRef } from 'react';
import { useApp, UserRole } from '../context/AppContext';
import { ClassLevel, EducationBoard } from '../types';
import {
  MAIN_NAV_MENUS,
  MainMenuId,
  NavSubActionId,
} from '../data/navigationConfig';
import {
  Bell,
  Crown,
  User,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  Lock,
  Info,
  GraduationCap,
  FileText,
  BookOpen,
  LogOut,
  LogIn,
  ChevronRight,
  LifeBuoy,
  HelpCircle,
  Scale,
  AlertTriangle,
  Mail,
  ChevronDown,
  Monitor,
  Smartphone,
  Users,
  BookOpenCheck,
  Share2,
} from 'lucide-react';
import {
  ALL_BOARDS,
  ALL_CLASS_LEVELS,
  getAccessibleBoardClassesList,
  getBoardShortLabel,
  getClassSubscriptionInfo,
  getPrimaryBaseBoard,
  getPrimaryBaseClass,
  getStudentActivatedBoards,
  getStudentActivatedClassesForBoard,
  getStudentPlanInfo,
} from '../utils/subscriptionAccess';
import { BrandBookCapLogo } from './DashboardIllustrations';
import { PWAInstallButton } from './PWAInstallButton';
import { ShareMyAppModal } from './ShareMyAppFeature';

import type { PortalRole } from '../types';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onMenuAction: (actionId: NavSubActionId) => void;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
  onOpenAuth: (defaultTab?: 'login' | 'teacher' | 'register' | 'admin' | 'forgot') => void;
  onOpenPanel: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenPortalLanding?: (portalRole: Exclude<PortalRole, 'admin'>) => void;
  activeLandingPortal?: Exclude<PortalRole, 'admin'>;
  onOpenMembership: (
    targetClass?: ClassLevel,
    targetBoard?: EducationBoard,
    showAllPlans?: boolean
  ) => void;
  activeMenuId?: MainMenuId;
  viewMode: 'auto' | 'desktop';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onMenuAction,
  onSelectMainSection,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
  activeLandingPortal,
  onOpenMembership,
  activeMenuId,
  viewMode,
  onToggleViewMode,
}) => {
  const {
    activeRole,
    activeBoard,
    currentUser,
    switchRole,
    currentStudent,
    switchActiveClass,
    activateAdditionalBoardClass,
    notifications,
    markNotificationAsRead,
    isSectionVisible,
    logout,
  } = useApp();

  const [openDropdownMenu, setOpenDropdownMenu] = useState<MainMenuId | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showClassSwitcher, setShowClassSwitcher] = useState(false);
  const [switcherBoard, setSwitcherBoard] = useState<EducationBoard | null>(activeBoard);
  const [mobileSelectedMenuId, setMobileSelectedMenuId] = useState<MainMenuId>(
    activeMenuId || 'special-learning'
  );
  const [isShareAppOpen, setIsShareAppOpen] = useState(false);

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const hoverCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSwitcherBoard(activeBoard);
  }, [activeBoard, showClassSwitcher]);

  useEffect(() => {
    if (activeMenuId) {
      setMobileSelectedMenuId(activeMenuId);
    }
  }, [activeMenuId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdownMenu(null);
        setShowProfileDropdown(false);
        setShowNotifications(false);
        setShowClassSwitcher(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target as Node)) {
        setOpenDropdownMenu(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const showStudentNavMenus =
    activeRole === 'student' &&
    currentTab !== 'parent-zone' &&
    currentTab !== 'school-college-zone' &&
    currentTab !== 'coaching-zone' &&
    currentTab !== 'portal-landing';

  const handleRoleChange = (role: UserRole) => {
    const res = switchRole(role);
    if (!res.allowed) {
      return;
    }
    if (role === 'admin') setCurrentTab('admin');
    else if (currentTab === 'admin') setCurrentTab('dashboard');
  };

  const handleTriggerSubAction = (actionId: NavSubActionId) => {
    setOpenDropdownMenu(null);
    setMobileMenuOpen(false);
    onMenuAction(actionId);
  };

  const handleMouseEnterMenu = (menuId: MainMenuId) => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current);
      hoverCloseTimeoutRef.current = null;
    }
    setOpenDropdownMenu(menuId);
  };

  const handleMouseLeaveMenu = () => {
    if (hoverCloseTimeoutRef.current) {
      clearTimeout(hoverCloseTimeoutRef.current);
    }
    hoverCloseTimeoutRef.current = setTimeout(() => {
      setOpenDropdownMenu(null);
    }, 140);
  };

  const containerWidthClass =
    viewMode === 'desktop' ? 'max-w-[1840px] w-full mx-auto' : 'msz-container';

  const isTeacherAccount = currentStudent?.accountRole === 'teacher' || activeRole === 'teacher';
  const isStudentAccount = Boolean(currentStudent && currentStudent.accountRole !== 'teacher' && activeRole === 'student');
  const isParentActive = activeRole === 'parent' || currentTab === 'parent-zone' || (currentTab === 'portal-landing' && activeLandingPortal === 'parent');
  const isSchoolActive = activeRole === 'school_admin' || currentTab === 'school-college-zone' || (currentTab === 'portal-landing' && activeLandingPortal === 'school_admin');
  const isCoachingActive = activeRole === 'institute_admin' || currentTab === 'coaching-zone' || (currentTab === 'portal-landing' && activeLandingPortal === 'institute_admin');
  const isAdminActive = Boolean(currentUser?.role === 'admin' && activeRole === 'admin');
  const isUserLoggedIn = Boolean(currentStudent || currentUser);

  const handleTopLogoutClick = async () => {
    setOpenDropdownMenu(null);
    setShowProfileDropdown(false);
    setShowNotifications(false);
    setShowClassSwitcher(false);
    setMobileMenuOpen(false);
    await logout();
    setCurrentTab('public-home');
    onOpenAuth('login');
  };

  const triggerPortalClick = (role: Exclude<PortalRole, 'admin'>) => {
    setOpenDropdownMenu(null);
    setMobileMenuOpen(false);
    if (onOpenPortalLanding) {
      onOpenPortalLanding(role);
      return;
    }
    if (role === 'student' || role === 'teacher') {
      onOpenPanel(role, 'login');
    } else if (role === 'parent') {
      setCurrentTab('parent-zone');
    } else if (role === 'school_admin') {
      setCurrentTab('school-college-zone');
    } else {
      setCurrentTab('coaching-zone');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs w-full">
      {/* Top 5 Education Portals + Admin Bar (Desktop, Smart TV & Mobile 360px safe) */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className={`${containerWidthClass} px-2.5 sm:px-6 lg:px-8 py-1.5 xl:py-2 flex items-center justify-between gap-2`}>
          <span className="hidden xl:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 truncate">
            <BookOpenCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>5 Independent Education Portals · Classes 1–10 · Teachers · Parents · Schools · Coaching</span>
          </span>

          <div
            role="navigation"
            aria-label="5 Education Portals Access"
            className="flex items-center gap-1.5 overflow-x-auto pb-0.5 w-full xl:w-auto xl:justify-end"
          >
            <button
              type="button"
              onClick={() => triggerPortalClick('student')}
              className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isStudentAccount || (currentTab === 'portal-landing' && activeLandingPortal === 'student')
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-xs'
                  : 'bg-white/10 hover:bg-indigo-600/80 text-white border-white/15'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Student</span>
            </button>

            <button
              type="button"
              onClick={() => triggerPortalClick('teacher')}
              className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isTeacherAccount || (currentTab === 'portal-landing' && activeLandingPortal === 'teacher')
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                  : 'bg-white/10 hover:bg-emerald-600/80 text-white border-white/15'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span>Teacher</span>
            </button>

            <button
              type="button"
              onClick={() => triggerPortalClick('parent')}
              className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isParentActive
                  ? 'bg-rose-600 text-white border-rose-400 shadow-xs'
                  : 'bg-white/10 hover:bg-rose-600/80 text-white border-white/15'
              }`}
            >
              <span>Parent</span>
            </button>

            <button
              type="button"
              onClick={() => triggerPortalClick('school_admin')}
              className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isSchoolActive
                  ? 'bg-sky-600 text-white border-sky-400 shadow-xs'
                  : 'bg-white/10 hover:bg-sky-600/80 text-white border-white/15'
              }`}
            >
              <span>School &amp; College</span>
            </button>

            <button
              type="button"
              onClick={() => triggerPortalClick('institute_admin')}
              className={`min-h-[32px] px-2.5 sm:px-3 py-1 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isCoachingActive
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-xs'
                  : 'bg-white/10 hover:bg-amber-500/80 hover:text-slate-950 text-white border-white/15'
              }`}
            >
              <span>Coaching Institute</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpenDropdownMenu(null);
                setMobileMenuOpen(false);
                onOpenPanel('admin', 'login');
              }}
              className={`min-h-[32px] px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-bold flex items-center justify-center gap-1 border transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                isAdminActive
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-xs'
                  : 'bg-white/5 hover:bg-white/15 text-slate-300 border-white/10'
              }`}
            >
              <ShieldCheck className={`w-3 h-3 shrink-0 ${isAdminActive ? 'text-slate-950' : 'text-amber-300'}`} />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className={`${containerWidthClass} px-2.5 sm:px-6 lg:px-8 py-2 sm:py-2.5 xl:py-3 min-h-[56px] sm:min-h-[64px] xl:min-h-[72px] flex items-center justify-between gap-2 sm:gap-3`}>
        {/* Brand Logo (Reference-matched Orange Cap-Book Icon + Two-Tone MyStudyZone + Learn • Practice • Grow) */}
        <button
          type="button"
          onClick={() => {
            setOpenDropdownMenu(null);
            setMobileMenuOpen(false);
            if (activeRole === 'admin') handleRoleChange('student');
            onMenuAction('home-overview');
          }}
          className="flex items-center gap-2 sm:gap-3 xl:gap-3.5 cursor-pointer group shrink min-w-0 text-left"
        >
          <BrandBookCapLogo className="w-8 h-8 sm:w-11 sm:h-11 xl:w-12 xl:h-12 rounded-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0" />
          <div className="leading-none min-w-0">
            <span className="font-display font-black text-sm sm:text-2xl xl:text-[26px] tracking-tight block truncate">
              <span className="text-slate-900">MyStudy</span>
              <span className="text-orange-600">Zone</span>
            </span>
            <span className="text-[9px] sm:text-[11px] xl:text-xs font-extrabold text-slate-700 tracking-wide block mt-0.5 truncate">
              Learn • Practice • Grow
            </span>
          </div>
        </button>

        {/* Right Actions Area (Always keeps Upgrade Plan, Share App, Install App & Login/Logout buttons visible in mobile, desktop & Smart TV frames) */}
        <div className="flex items-center justify-end flex-wrap sm:flex-nowrap gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0">
          {/* Signed-in Active Board & Class Switcher Pill (Student & Teacher Learning Portals Only) */}
          {showStudentNavMenus &&
            currentStudent &&
            (() => {
              const accessiblePairs = getAccessibleBoardClassesList(currentStudent);
              const activatedBoards = getStudentActivatedBoards(currentStudent);
              const registeredBaseBoard = getPrimaryBaseBoard(currentStudent);
              const registeredBaseClass = getPrimaryBaseClass(currentStudent);
              return (
                <div className="relative hidden lg:block">
                  <button
                    type="button"
                    data-testid="header-board-class-switcher-btn"
                    onClick={() => {
                      setShowClassSwitcher(!showClassSwitcher);
                      setShowNotifications(false);
                      setShowProfileDropdown(false);
                    }}
                    className="flex items-center gap-1 sm:gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2 sm:px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors"
                    title={`Active Class: ${getBoardShortLabel(activeBoard)} · ${currentStudent.classLevel} (${accessiblePairs.length} active)`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-extrabold text-amber-950 whitespace-nowrap">
                      <span className="hidden sm:inline">Active Class: {getBoardShortLabel(activeBoard)} · </span>
                      <span className="sm:hidden">{getBoardShortLabel(activeBoard)} · </span>
                      {currentStudent.classLevel}
                    </span>
                    <ChevronDown className="w-3 h-3 text-amber-800 shrink-0" />
                  </button>

                  {showClassSwitcher && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowClassSwitcher(false)}
                      />
                      <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-sm sm:w-88 mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-amber-50 px-3.5 py-2.5 border-b border-amber-200 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-black text-amber-950">
                              Board &amp; Class Switcher (Maharashtra · CBSE · ICSE)
                            </p>
                            <p className="text-[10px] text-slate-600 font-medium">
                              Registered: {getBoardShortLabel(registeredBaseBoard)} · {registeredBaseClass} (Always Active)
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowClassSwitcher(false)}
                            className="text-slate-400 hover:text-slate-700 cursor-pointer"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quick Switch Section: Student's Activated Boards & Classes */}
                        <div className="px-3 py-2 bg-indigo-50/60 border-b border-indigo-100 space-y-1.5">
                          <p className="text-[10px] font-black uppercase tracking-wider text-indigo-950">
                            Your Activated Boards &amp; Classes ({accessiblePairs.length})
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {accessiblePairs.map((pair) => {
                              const isCurrentActive =
                                pair.board === activeBoard &&
                                pair.classLevel === currentStudent.classLevel;
                              const isOriginalRegistered =
                                pair.board === registeredBaseBoard &&
                                pair.classLevel === registeredBaseClass;
                              return (
                                <button
                                  key={pair.boardClassKey}
                                  type="button"
                                  data-testid={`header-active-pair-${pair.board}-${pair.classLevel.replace(/\s+/g, '')}`}
                                  onClick={async () => {
                                    setShowClassSwitcher(false);
                                    await switchActiveClass(pair.classLevel, pair.board);
                                  }}
                                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black border transition-all cursor-pointer flex items-center gap-1 ${
                                    isCurrentActive
                                      ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                                      : 'bg-white hover:bg-indigo-50 text-slate-800 border-indigo-200'
                                  }`}
                                >
                                  <span>
                                    {getBoardShortLabel(pair.board)} · {pair.classLevel}
                                  </span>
                                  {isOriginalRegistered && (
                                    <span
                                      className={`px-1 py-0.2 rounded text-[8px] font-extrabold ${
                                        isCurrentActive
                                          ? 'bg-amber-400 text-slate-950'
                                          : 'bg-amber-100 text-amber-900'
                                      }`}
                                    >
                                      Registered
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* All 3 Boards Accordion: Inactive boards hidden/collapsed by default, expandable to view Classes 1–10 */}
                        <div className="p-2.5 space-y-2 max-h-80 overflow-y-auto">
                          {ALL_BOARDS.map((b) => {
                            const isExpanded = switcherBoard === b;
                            const isBoardActivated = activatedBoards.includes(b);
                            const activatedClassesForB = getStudentActivatedClassesForBoard(
                              currentStudent,
                              b
                            );
                            return (
                              <div
                                key={b}
                                className={`rounded-xl border transition-all overflow-hidden ${
                                  isExpanded
                                    ? 'border-slate-300 bg-white shadow-2xs'
                                    : 'border-slate-200 bg-slate-50/80'
                                }`}
                              >
                                <button
                                  type="button"
                                  data-testid={`header-board-accordion-${b}`}
                                  onClick={() => setSwitcherBoard(isExpanded ? null : b)}
                                  className="w-full px-3 py-2 flex items-center justify-between gap-2 text-left cursor-pointer hover:bg-amber-50/60 transition-colors"
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span className="text-xs font-black text-slate-900">
                                      {getBoardShortLabel(b)} Board
                                    </span>
                                    {b === registeredBaseBoard && (
                                      <span className="px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-black">
                                        Registered
                                      </span>
                                    )}
                                    {isBoardActivated ? (
                                      <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[9px] font-black">
                                        Active ({activatedClassesForB.length})
                                      </span>
                                    ) : (
                                      <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[9px] font-bold">
                                        Collapsed
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <span className="text-[10px] font-bold text-slate-500">
                                      {isExpanded ? 'Hide Classes' : 'Expand Classes'}
                                    </span>
                                    <ChevronDown
                                      className={`w-3.5 h-3.5 text-slate-600 transition-transform ${
                                        isExpanded ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </div>
                                </button>

                                {isExpanded && (
                                  <div className="p-2 border-t border-slate-100 bg-white grid grid-cols-2 gap-1.5">
                                    {ALL_CLASS_LEVELS.map((cls) => {
                                      const cInfo = getClassSubscriptionInfo(
                                        currentStudent,
                                        cls,
                                        undefined,
                                        b
                                      );
                                      const isCurrent =
                                        currentStudent.classLevel === cls && activeBoard === b;
                                      const isOriginalReg =
                                        b === registeredBaseBoard && cls === registeredBaseClass;
                                      return (
                                        <button
                                          key={cls}
                                          type="button"
                                          data-testid={`header-class-btn-${b}-${cls.replace(/\s+/g, '')}`}
                                          onClick={async () => {
                                            setShowClassSwitcher(false);
                                            if (cInfo.isAccessible) {
                                              await switchActiveClass(cls, b);
                                            } else {
                                              await activateAdditionalBoardClass(b, cls, true);
                                            }
                                          }}
                                          className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                                            isCurrent
                                              ? 'bg-indigo-600 text-white border-indigo-700 shadow-xs'
                                              : cInfo.isPaidActive
                                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300'
                                                : cInfo.isAccessible
                                                  ? 'bg-indigo-50/70 hover:bg-indigo-100 text-slate-900 border-indigo-300'
                                                  : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                                          }`}
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="text-xs font-black">{cls}</span>
                                            {cInfo.isAccessible ? (
                                              <span
                                                className={`text-[8px] font-black px-1.5 py-0.2 rounded-full ${
                                                  isCurrent
                                                    ? 'bg-amber-400 text-slate-950'
                                                    : 'bg-emerald-600 text-white'
                                                }`}
                                              >
                                                {isCurrent ? 'Viewing' : 'Active'}
                                              </span>
                                            ) : (
                                              <span className="text-[8px] font-black px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                                + Activate
                                              </span>
                                            )}
                                          </div>
                                          <span
                                            className={`text-[9px] font-bold block truncate mt-0.5 ${
                                              isCurrent ? 'text-indigo-100' : 'text-slate-500'
                                            }`}
                                          >
                                            {isCurrent
                                              ? 'Current Workspace'
                                              : isOriginalReg
                                                ? 'Registered Class (Switch)'
                                                : cInfo.isPaidActive
                                                  ? `Premium (${cInfo.daysRemaining}d left)`
                                                  : cInfo.isAccessible
                                                    ? 'Activated · Click to Switch'
                                                    : 'Click to Activate Class'}
                                          </span>
                                        </button>
                                      );
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-2.5 border-t border-slate-100 bg-slate-50">
                          <button
                            type="button"
                            onClick={() => {
                              setShowClassSwitcher(false);
                              onOpenMembership(
                                currentStudent.classLevel,
                                switcherBoard || activeBoard
                              );
                            }}
                            className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] cursor-pointer shadow-xs"
                          >
                            + Upgrade Full Premium Plan (₹99 / 365 Days)
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

          {/* Always-visible Upgrade Plan Button right near Active Class Menu (Shows All Student & Teacher Plans) */}
          {(() => {
            const pInfo = currentStudent
              ? getStudentPlanInfo(
                  currentStudent,
                  undefined,
                  currentStudent.classLevel,
                  activeBoard
                )
              : null;
            const hasPaidActive = Boolean(pInfo && pInfo.effectivePlan !== 'free');
            return (
              <button
                type="button"
                data-testid="header-upgrade-plan-btn"
                onClick={() =>
                  onOpenMembership(currentStudent?.classLevel, activeBoard, true)
                }
                title={
                  hasPaidActive && pInfo
                    ? `Active Plan (${pInfo.daysRemaining}d left) — Click to view or upgrade all Student & Teacher plans`
                    : 'View & Upgrade Student & Teacher Subscription Plans'
                }
                style={{
                  backgroundColor: '#f59e0b',
                  backgroundImage: 'linear-gradient(to right, #fbbf24, #f59e0b)',
                  color: '#0f172a',
                }}
                className="min-h-[36px] sm:min-h-[40px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-amber-400 bg-gradient-to-r from-amber-400 to-amber-500 hover:brightness-105 text-slate-950 font-extrabold text-[11px] sm:text-xs shadow-xs border border-amber-500 flex items-center justify-center gap-1.5 cursor-pointer transition-all shrink-0 whitespace-nowrap"
              >
                <Crown className="w-3.5 h-3.5 shrink-0 text-slate-950" />
                <span className="hidden sm:inline text-slate-950">Upgrade Plan</span>
                <span className="sm:hidden text-slate-950">Plans</span>
                {hasPaidActive && pInfo && (
                  <span className="hidden xl:inline-block px-1.5 py-0.5 rounded-full bg-emerald-700 text-white text-[10px] font-black leading-none">
                    {pInfo.daysRemaining}d
                  </span>
                )}
              </button>
            );
          })()}

          {/* Notification Bell (Authenticated Users Only) */}
          {(currentStudent || currentUser) && (
            <div className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-sm sm:w-80 w-auto mx-auto bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-amber-50 px-4 py-2.5 border-b border-amber-100 flex items-center justify-between">
                    <h4 className="font-bold text-xs text-amber-900">
                      Notifications &amp; Alerts
                    </h4>
                    <span className="text-[10px] text-slate-500">
                      {notifications.length} total
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No new notifications.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => markNotificationAsRead(n.id)}
                          className={`p-3 text-xs hover:bg-amber-50/50 transition-colors cursor-pointer ${
                            n.read ? 'opacity-70' : 'bg-amber-50/30'
                          }`}
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

          {/* Authenticated Student/Teacher 13-Option Profile Dropdown */}
          {currentStudent && (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifications(false);
                }}
                className={`px-2.5 py-1.5 rounded-xl font-extrabold text-xs flex items-center gap-1.5 border transition-all cursor-pointer ${
                  showProfileDropdown || currentTab === 'profile'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-amber-50 text-slate-900 border-slate-200'
                }`}
                aria-expanded={showProfileDropdown}
              >
                <span className="text-sm">{currentStudent?.avatar || '👤'}</span>
                <span className="hidden sm:inline font-extrabold">Profile</span>
              </button>

              {showProfileDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowProfileDropdown(false)}
                  />

                  <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-sm sm:w-88 w-auto mx-auto bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] flex flex-col">
                    <div className="bg-slate-950 text-white p-4 shrink-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl shrink-0">
                            {currentStudent?.avatar || '🦁'}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                              Account Profile
                            </span>
                            <h4 className="font-display font-extrabold text-base leading-tight truncate">
                              {currentStudent?.name || 'Student Account'}
                            </h4>
                            <p className="text-[11px] text-slate-300 mt-0.5 truncate">
                              {getBoardShortLabel(activeBoard)} · {currentStudent?.classLevel} · UID:{' '}
                              {currentStudent?.id}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setShowProfileDropdown(false)}
                          className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4 space-y-2.5 bg-white text-xs overflow-y-auto flex-1 overscroll-contain">
                      {(() => {
                        const pInfo = getStudentPlanInfo(
                          currentStudent,
                          undefined,
                          currentStudent.classLevel,
                          activeBoard
                        );
                        return (
                          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-600">
                                Active Subscription
                              </span>
                              <span className="text-[10px] font-black text-emerald-700">
                                {pInfo.daysRemainingDisplay}
                              </span>
                            </div>
                            <div className="font-extrabold text-sm text-slate-900">
                              {pInfo.planDisplayName}
                            </div>
                            <p className="text-[11px] text-slate-600">
                              {pInfo.isPaidPlanExpired
                                ? `Expired (${pInfo.expiryDisplay})`
                                : pInfo.isLifetimeFree
                                  ? 'Lifetime Free Access'
                                  : `Expires: ${pInfo.expiryDisplay}`}
                            </p>
                          </div>
                        );
                      })()}

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('profile');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          <span>My Profile &amp; Classes</span>
                        </span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileDropdown(false);
                          onOpenMembership(currentStudent.classLevel, activeBoard);
                        }}
                        className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 text-slate-800 font-bold text-xs border border-slate-200 flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Crown className="w-4 h-4 text-amber-600" />
                          <span>My Subscription (₹99/yr)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </button>

                      {[
                        { tab: 'help-support', label: 'Help & Support', icon: LifeBuoy },
                        { tab: 'faqs', label: 'FAQs Center', icon: HelpCircle },
                        { tab: 'grievance', label: 'Grievance Redressal', icon: Scale },
                        { tab: 'terms', label: 'Terms & Conditions', icon: FileText },
                        { tab: 'privacy', label: 'Privacy Policy', icon: Lock },
                        { tab: 'disclaimer', label: 'Educational Disclaimer', icon: AlertTriangle },
                        { tab: 'about', label: 'About Us', icon: Info },
                        { tab: 'contact', label: 'Contact Us', icon: Mail },
                      ].map((link) => {
                        const Icon = link.icon;
                        return (
                          <button
                            key={link.tab}
                            type="button"
                            onClick={() => {
                              setCurrentTab(link.tab);
                              setShowProfileDropdown(false);
                            }}
                            className="w-full p-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center justify-between cursor-pointer"
                          >
                            <span className="flex items-center gap-2">
                              <Icon className="w-3.5 h-3.5 text-slate-500" />
                              <span>{link.label}</span>
                            </span>
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Always-visible Share My App (WhatsApp Card) & App Install Buttons in Top Sticky Header */}
          <button
            type="button"
            onClick={() => setIsShareAppOpen(true)}
            data-testid="header-share-app-btn"
            title="Share MyStudyZone App with Students on WhatsApp"
            style={{
              backgroundColor: '#128C7E',
              backgroundImage: 'linear-gradient(to right, #25D366, #128C7E)',
              color: '#ffffff',
            }}
            className="min-h-[36px] sm:min-h-[40px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-[#128C7E] bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:brightness-105 text-white font-extrabold text-[11px] sm:text-xs shadow-xs border border-emerald-500 flex items-center justify-center gap-1.5 cursor-pointer transition-all shrink-0 whitespace-nowrap"
          >
            <Share2 className="w-3.5 h-3.5 shrink-0 text-white" />
            <span className="hidden sm:inline text-white">Share App</span>
            <span className="sm:hidden text-white">Share</span>
          </button>

          <PWAInstallButton variant="header" />

          <ShareMyAppModal
            isOpen={isShareAppOpen}
            onClose={() => setIsShareAppOpen(false)}
            defaultBoard={activeBoard}
            defaultClass={currentStudent?.classLevel || 'Class 5'}
            senderName={currentStudent?.name || currentUser?.displayName || ''}
            onOpenStudentApp={() => {
              setCurrentTab('all-courses');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Mobile Hamburger Menu Button */}
          {showStudentNavMenus && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {/* SINGLE LOGIN / LOGOUT BUTTON IN EXACT SAME TOP-RIGHT POSITION */}
          {isUserLoggedIn ? (
            <button
              type="button"
              onClick={handleTopLogoutClick}
              aria-label="Logout"
              style={{
                backgroundColor: '#e11d48',
                backgroundImage: 'linear-gradient(to right, #e11d48, #dc2626)',
                color: '#ffffff',
              }}
              className="min-h-[36px] sm:min-h-[40px] xl:min-h-[42px] px-3 sm:px-4 xl:px-5 py-1.5 sm:py-2 rounded-xl bg-rose-600 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border border-rose-500/40 whitespace-nowrap"
            >
              <LogOut className="w-4 h-4 shrink-0 text-white" />
              <span className="text-white">Logout</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              aria-label="Login"
              style={{
                backgroundColor: '#4f46e5',
                backgroundImage: 'linear-gradient(to right, #4f46e5, #2563eb)',
                color: '#ffffff',
              }}
              className="min-h-[36px] sm:min-h-[40px] xl:min-h-[42px] px-3 sm:px-4 xl:px-5 py-1.5 sm:py-2 rounded-xl bg-indigo-600 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border border-indigo-500/40 whitespace-nowrap"
            >
              <LogIn className="w-4 h-4 shrink-0 text-white" />
              <span className="text-white">Login</span>
            </button>
          )}
        </div>
      </div>

      {/* Desktop & Smart TV Navigation Bar (Student Learning Sections — Isolated from Parent/School/Coaching/Admin Portals) */}
      {showStudentNavMenus && (
        <div className="hidden md:block border-t border-slate-100 bg-slate-50/90">
          <nav
            ref={navContainerRef}
            aria-label="Primary Navigation"
            className={`${containerWidthClass} px-3 sm:px-6 lg:px-8 py-1.5 xl:py-2 flex items-center gap-1.5 xl:gap-2 flex-wrap`}
          >
            {MAIN_NAV_MENUS.map((menu) => {
              const visibleItems = menu.items.filter(
                (sub) => !sub.sectionVisibilityKey || isSectionVisible(sub.sectionVisibilityKey)
              );
              if (visibleItems.length === 0) return null;

              const isActive = activeMenuId === menu.id;
              const isSpecialTab = menu.id === 'special-learning';
              return (
                <button
                  key={menu.id}
                  type="button"
                  onClick={() => {
                    setOpenDropdownMenu(null);
                    if (menu.id !== 'account' && onSelectMainSection) {
                      onSelectMainSection(menu.id);
                      return;
                    }
                    const secEl = document.getElementById(`main-sec-${menu.id}`);
                    if (secEl) {
                      secEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    } else {
                      handleTriggerSubAction(menu.defaultActionId);
                    }
                  }}
                  className={`shrink-0 px-2.5 xl:px-3.5 py-1.5 xl:py-2 rounded-lg text-[11px] xl:text-xs 2xl:text-[13px] font-extrabold uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                    isSpecialTab
                      ? isActive
                        ? 'bg-amber-500 text-slate-950 shadow-xs ring-2 ring-[#0f2952]/20'
                        : 'bg-amber-100/90 text-amber-950 hover:bg-amber-200 border border-amber-300'
                      : isActive
                      ? 'bg-[#0f2952] text-amber-300 shadow-xs border border-[#0f2952]'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-200/60'
                  }`}
                >
                  <span>{menu.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* Mobile Hamburger Drawer with Expandable Sub-Menus */}
      {showStudentNavMenus && mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 max-h-[82vh] overflow-y-auto shadow-lg">
          {/* Quick Priority Mobile Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setCurrentTab('demo');
              }}
              className="min-h-[44px] px-2.5 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
              <span className="truncate">Free Demo</span>
            </button>
            <button
              type="button"
              onClick={() => handleTriggerSubAction('course-maharashtra')}
              className="min-h-[44px] px-2.5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-950 border border-amber-200 font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="truncate">Courses</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onToggleViewMode();
              }}
              className={`min-h-[44px] px-2.5 py-2.5 rounded-xl border font-extrabold text-xs flex items-center justify-center gap-1 cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-900'
              }`}
            >
              {viewMode === 'desktop' ? (
                <>
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Mobile View</span>
                </>
              ) : (
                <>
                  <Monitor className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">Desktop Site</span>
                </>
              )}
            </button>
          </div>

          {/* Two-Level Horizontal Mobile Navigation: Row 1 = All Main Sections, Row 2 = ONLY Selected Section's Subsections */}
          {(() => {
            const visibleMenus = MAIN_NAV_MENUS.filter((menu) =>
              menu.items.some(
                (sub) => !sub.sectionVisibilityKey || isSectionVisible(sub.sectionVisibilityKey)
              )
            );
            const activeMobileMenu =
              visibleMenus.find((m) => m.id === mobileSelectedMenuId) || visibleMenus[0];
            const activeMobileSubItems = activeMobileMenu
              ? activeMobileMenu.items.filter(
                  (sub) => !sub.sectionVisibilityKey || isSectionVisible(sub.sectionVisibilityKey)
                )
              : [];

            return (
              <div className="rounded-2xl border-2 border-sky-200 bg-white overflow-hidden">
                {/* ROW 1 — ALL MAIN SECTIONS HORIZONTALLY */}
                <div className="bg-sky-50/70 border-b border-sky-200 p-2.5">
                  <div
                    role="tablist"
                    aria-label="Mobile Main Sections"
                    className="flex items-center gap-2 overflow-x-auto pb-1"
                  >
                    {visibleMenus.map((menu) => {
                      const isSel = activeMobileMenu?.id === menu.id;
                      return (
                        <button
                          key={menu.id}
                          type="button"
                          role="tab"
                          aria-selected={isSel}
                          onClick={() => setMobileSelectedMenuId(menu.id)}
                          className={`shrink-0 whitespace-nowrap px-3 py-2 rounded-xl text-xs font-display font-black uppercase tracking-wide border-2 cursor-pointer transition-all ${
                            isSel
                              ? 'bg-[#0f2952] text-amber-300 border-amber-400 shadow-xs'
                              : 'bg-white text-[#0f2952] border-sky-200 hover:bg-sky-50'
                          }`}
                        >
                          {menu.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ROW 2 — ONLY SELECTED SECTION'S SUBSECTIONS HORIZONTALLY BELOW ROW 1 */}
                {activeMobileMenu && (
                  <div className="p-3 bg-white space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-display font-black uppercase tracking-wider text-[#0f2952]">
                        {activeMobileMenu.label} — Subsections ({activeMobileSubItems.length})
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          if (activeMobileMenu.id !== 'account' && onSelectMainSection) {
                            onSelectMainSection(activeMobileMenu.id);
                            return;
                          }
                          handleTriggerSubAction(activeMobileMenu.defaultActionId);
                        }}
                        className="text-[11px] font-extrabold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer shrink-0"
                      >
                        <span>Open Section</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div
                      role="tablist"
                      aria-label={`${activeMobileMenu.label} Subsections`}
                      className="flex items-stretch gap-2 overflow-x-auto pb-1.5"
                    >
                      {activeMobileSubItems.map((sub) => {
                        let label = sub.label;
                        if (currentStudent && sub.id === 'acc-login') {
                          label = 'My Profile Dashboard';
                        } else if (currentStudent && sub.id === 'acc-register') {
                          label = 'Add Board / Class';
                        }
                        return (
                          <button
                            key={sub.id}
                            type="button"
                            onClick={() => handleTriggerSubAction(sub.id)}
                            className="min-w-[155px] shrink-0 px-3 py-2.5 rounded-xl bg-sky-50/70 hover:bg-amber-50 border-2 border-sky-200 hover:border-[#0f2952] text-left flex items-center justify-between gap-2 cursor-pointer shadow-2xs transition-colors"
                          >
                            <div className="min-w-0">
                              <p className="text-xs font-extrabold text-[#0f2952] truncate">
                                {label}
                              </p>
                              <p className="text-[10px] font-bold text-amber-800 truncate mt-0.5">
                                {sub.badgeText || 'Open'}
                              </p>
                            </div>
                            <ChevronRight className="w-3.5 h-3.5 text-[#0f2952] shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Account Bottom Row (Profile Shortcut in Mobile Menu) */}
          {currentStudent && (
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
