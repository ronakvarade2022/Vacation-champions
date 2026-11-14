import React, { useState, useEffect, useRef } from 'react';
import { useApp, UserRole } from '../context/AppContext';
import { ClassLevel, EducationBoard } from '../types';
import {
  MAIN_NAV_MENUS,
  MainMenuId,
  NavSubActionId,
} from '../data/navigationConfig';
import {
  Trophy,
  Bell,
  Crown,
  User,
  Sparkles,
  Menu,
  X,
  ShieldCheck,
  Lock,
  Info,
  Medal,
  GraduationCap,
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
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
} from 'lucide-react';
import {
  ALL_BOARDS,
  ALL_CLASS_LEVELS,
  getAccessibleBoardClassesList,
  getBoardShortLabel,
  getClassSubscriptionInfo,
  getStudentPlanInfo,
} from '../utils/subscriptionAccess';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onMenuAction: (actionId: NavSubActionId) => void;
  onOpenAuth: (defaultTab?: 'login' | 'teacher' | 'register' | 'admin' | 'forgot') => void;
  onOpenPanel: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenMembership: (targetClass?: ClassLevel, targetBoard?: EducationBoard) => void;
  activeMenuId?: MainMenuId;
  viewMode: 'auto' | 'desktop';
  onToggleViewMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  onMenuAction,
  onOpenAuth,
  onOpenPanel,
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
    notifications,
    markNotificationAsRead,
    logout,
  } = useApp();

  const [openDropdownMenu, setOpenDropdownMenu] = useState<MainMenuId | null>(null);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<MainMenuId | null>('home');
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showClassSwitcher, setShowClassSwitcher] = useState(false);
  const [switcherBoard, setSwitcherBoard] = useState<EducationBoard>(activeBoard);

  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const hoverCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setSwitcherBoard(activeBoard);
  }, [activeBoard, showClassSwitcher]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdownMenu(null);
        setShowProfileDropdown(false);
        setShowNotifications(false);
        setShowClassSwitcher(false);
        setShowLogoutConfirm(false);
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
  const isLearningRole = activeRole === 'student' || activeRole === 'teacher';

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
    viewMode === 'desktop' ? 'max-w-[1680px] w-full mx-auto' : 'max-w-7xl w-full mx-auto';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Sticky Portal Access Strip: Permanently Visible Student, Teacher & Admin Portals + Desktop Site Toggle */}
      <div className="bg-slate-950 text-white px-2.5 sm:px-6 py-1.5 text-xs border-b border-slate-800">
        <div className={`${containerWidthClass} flex flex-col lg:flex-row lg:items-center lg:justify-between gap-1.5`}>
          <div className="hidden lg:flex items-center gap-2.5 min-w-0">
            <span className="font-bold tracking-wide text-[11px] text-amber-300 whitespace-nowrap">
              MyStudyZone · Classes 1st to 10th (Maharashtra · CBSE · ICSE)
            </span>
            {currentUser && (
              <span className="text-[11px] font-semibold text-slate-300 truncate">
                {currentUser.role === 'admin' && '· Active: Admin Dashboard'}
                {currentUser.role === 'teacher' &&
                  `· Active Teacher: ${currentUser.displayName}${
                    currentStudent
                      ? ` (${getBoardShortLabel(activeBoard)} · ${currentStudent.classLevel})`
                      : ''
                  }`}
                {currentUser.role === 'student' &&
                  `· Active Student: ${currentUser.displayName}${
                    currentStudent
                      ? ` (${getBoardShortLabel(activeBoard)} · ${currentStudent.classLevel})`
                      : ''
                  }`}
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-between lg:justify-end gap-1.5 sm:gap-2 w-full lg:w-auto">
            {/* Permanent 3-Portal Access Bar (Never Hidden Inside Hamburger Menu) */}
            <div
              role="navigation"
              aria-label="Portal Access"
              className="grid grid-cols-3 sm:flex sm:items-center gap-1 sm:gap-1.5 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPanel('student', 'login');
                }}
                aria-label="Student Portal Login"
                className={`px-1.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold transition-colors flex items-center justify-center gap-1 cursor-pointer border whitespace-nowrap ${
                  activeRole === 'student' && currentStudent
                    ? 'bg-indigo-500 text-white border-indigo-400 shadow-xs'
                    : 'bg-slate-800/95 hover:bg-indigo-600 text-white border-slate-700'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="truncate">Student Portal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPanel('teacher', 'login');
                }}
                aria-label="Teacher Portal Login"
                className={`px-1.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold transition-colors flex items-center justify-center gap-1 cursor-pointer border whitespace-nowrap ${
                  activeRole === 'teacher' && currentStudent?.accountRole === 'teacher'
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-xs'
                    : 'bg-slate-800/95 hover:bg-emerald-700 text-white border-slate-700'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
                <span className="truncate">Teacher Portal</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPanel('admin', 'login');
                }}
                aria-label="Admin Portal Login"
                className={`px-1.5 sm:px-3 py-1.5 rounded-lg text-[10px] sm:text-[11px] font-extrabold transition-colors flex items-center justify-center gap-1 cursor-pointer border whitespace-nowrap ${
                  activeRole === 'admin' && currentUser?.role === 'admin'
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-xs'
                    : 'bg-slate-800/95 hover:bg-amber-600 hover:text-slate-950 text-amber-200 border-amber-500/40'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Admin Portal</span>
              </button>
            </div>

            {/* Desktop Site / Mobile View Toggle + Free Demo (Top Bar) */}
            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={onToggleViewMode}
                title={
                  viewMode === 'desktop'
                    ? 'Currently showing full-width Desktop Site layout. Click to switch back to Mobile View.'
                    : 'Switch to full-screen landscape Desktop Site layout'
                }
                aria-pressed={viewMode === 'desktop'}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition-colors cursor-pointer border whitespace-nowrap shrink-0 ${
                  viewMode === 'desktop'
                    ? 'bg-emerald-400 text-slate-950 border-emerald-300'
                    : 'bg-white/10 hover:bg-white/20 text-slate-100 border-white/20'
                }`}
              >
                {viewMode === 'desktop' ? (
                  <>
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Mobile View</span>
                  </>
                ) : (
                  <>
                    <Monitor className="w-3.5 h-3.5" />
                    <span>Desktop Site</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setCurrentTab('demo');
                }}
                className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold flex items-center gap-1 transition-colors cursor-pointer border whitespace-nowrap shrink-0 ${
                  currentTab === 'demo'
                    ? 'bg-amber-400 text-slate-950 border-amber-300'
                    : 'bg-white/10 hover:bg-white/20 text-amber-200 border-white/15'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Free Demo</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className={`${containerWidthClass} px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-3`}>
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => {
            setOpenDropdownMenu(null);
            setMobileMenuOpen(false);
            if (activeRole === 'admin') handleRoleChange('student');
            onMenuAction('home-overview');
          }}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0 text-left"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="leading-tight">
            <span className="font-display font-extrabold text-base sm:text-xl tracking-tight text-slate-900 block">
              MyStudyZone
            </span>
            <span className="text-[10px] font-bold text-slate-500 hidden sm:block">
              Interactive Education Platform
            </span>
          </div>
        </button>

        {/* Desktop 8-Menu Navigation Bar with Sub-Menu Dropdowns */}
        {isLearningRole && (
          <nav
            ref={navContainerRef}
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-0.5"
          >
            {MAIN_NAV_MENUS.map((menu) => {
              const isOpen = openDropdownMenu === menu.id;
              const isActive = activeMenuId === menu.id;
              return (
                <div
                  key={menu.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnterMenu(menu.id)}
                  onMouseLeave={handleMouseLeaveMenu}
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDropdownMenu(isOpen ? null : menu.id)
                    }
                    aria-expanded={isOpen}
                    className={`px-2.5 py-2 rounded-lg text-[11px] font-extrabold uppercase tracking-wide flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                      isOpen || isActive
                        ? 'text-amber-800 bg-amber-50'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-amber-700' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      onMouseEnter={() => handleMouseEnterMenu(menu.id)}
                      onMouseLeave={handleMouseLeaveMenu}
                      className={`absolute top-full mt-1.5 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
                        menu.id === 'account' || menu.id === 'plans'
                          ? 'right-0'
                          : 'left-0'
                      }`}
                    >
                      <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          {menu.label}
                        </span>
                        {currentStudent && menu.id === 'account' && (
                          <span className="text-[10px] font-bold text-emerald-700">
                            Signed in: {currentStudent.name.split(' ')[0]}
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5">
                        {menu.items.map((sub) => {
                          // Adapt Login/Register labels subtly when already logged in
                          let displayLabel = sub.label;
                          let displayDesc = sub.description;
                          if (currentStudent && sub.id === 'acc-login') {
                            displayLabel = 'My Profile Dashboard';
                            displayDesc = `Signed in as ${currentStudent.name} (${currentStudent.classLevel})`;
                          } else if (currentStudent && sub.id === 'acc-register') {
                            displayLabel = 'Add Board / Another Class';
                            displayDesc = 'Register an additional class using your existing mobile & email';
                          }

                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => handleTriggerSubAction(sub.id)}
                              className="w-full px-3 py-2.5 rounded-xl hover:bg-amber-50/90 text-left transition-colors cursor-pointer group flex items-start justify-between gap-2"
                            >
                              <div className="min-w-0">
                                <p className="text-xs font-extrabold text-slate-900 group-hover:text-amber-800 flex items-center gap-1.5">
                                  <span>{displayLabel}</span>
                                </p>
                                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                                  {displayDesc}
                                </p>
                              </div>
                              {sub.badgeText ? (
                                <span className="text-[10px] font-bold text-amber-800 shrink-0 mt-0.5">
                                  {sub.badgeText}
                                </span>
                              ) : (
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-amber-700 shrink-0 mt-1" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        )}

        {/* Right Actions Area */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Direct Desktop Site Button (Always Accessible Without Opening Drawer) */}
          <button
            type="button"
            onClick={onToggleViewMode}
            aria-pressed={viewMode === 'desktop'}
            className={`sm:hidden px-2 py-1.5 rounded-lg text-[10px] font-extrabold flex items-center gap-1 border cursor-pointer whitespace-nowrap ${
              viewMode === 'desktop'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-100 text-slate-800 border-slate-300'
            }`}
          >
            {viewMode === 'desktop' ? (
              <>
                <Smartphone className="w-3 h-3 shrink-0" />
                <span>Mobile</span>
              </>
            ) : (
              <>
                <Monitor className="w-3 h-3 shrink-0" />
                <span>Desktop</span>
              </>
            )}
          </button>

          {/* Signed-in Active Board & Class Switcher Pill */}
          {isLearningRole &&
            currentStudent &&
            (() => {
              const accessiblePairs = getAccessibleBoardClassesList(currentStudent);
              return (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowClassSwitcher(!showClassSwitcher);
                      setShowNotifications(false);
                      setShowProfileDropdown(false);
                    }}
                    className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors"
                    title={`Active: ${getBoardShortLabel(activeBoard)} · ${currentStudent.classLevel} (${accessiblePairs.length} unlocked)`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                    <span className="text-[11px] sm:text-xs font-extrabold text-amber-950 whitespace-nowrap">
                      {getBoardShortLabel(activeBoard)} · {currentStudent.classLevel}
                    </span>
                    <ChevronDown className="w-3 h-3 text-amber-800" />
                  </button>

                  {showClassSwitcher && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setShowClassSwitcher(false)}
                      />
                      <div className="fixed sm:absolute inset-x-3 sm:inset-x-auto sm:right-0 top-16 sm:top-auto sm:mt-2 max-w-sm sm:w-80 mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                        <div className="bg-amber-50 px-3.5 py-2.5 border-b border-amber-200 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-black text-amber-950">
                              Board &amp; Class Switcher (1st–10th)
                            </p>
                            <p className="text-[10px] text-slate-600 font-medium">
                              Switch unlocked board/class or activate ₹99/yr
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

                        <div className="grid grid-cols-3 gap-1 p-2 bg-slate-50 border-b border-slate-100">
                          {ALL_BOARDS.map((b) => {
                            const isSel = switcherBoard === b;
                            return (
                              <button
                                key={b}
                                type="button"
                                onClick={() => setSwitcherBoard(b)}
                                className={`py-1.5 px-2 rounded-lg text-[11px] font-black transition-all cursor-pointer ${
                                  isSel
                                    ? 'bg-slate-900 text-white shadow-xs'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-50'
                                }`}
                              >
                                {getBoardShortLabel(b)}
                              </button>
                            );
                          })}
                        </div>

                        <div className="p-2.5 grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto">
                          {ALL_CLASS_LEVELS.map((cls) => {
                            const cInfo = getClassSubscriptionInfo(
                              currentStudent,
                              cls,
                              undefined,
                              switcherBoard
                            );
                            const isCurrent =
                              currentStudent.classLevel === cls && activeBoard === switcherBoard;
                            return (
                              <button
                                key={cls}
                                type="button"
                                onClick={async () => {
                                  setShowClassSwitcher(false);
                                  if (cInfo.isAccessible) {
                                    await switchActiveClass(cls, switcherBoard);
                                  } else {
                                    onOpenMembership(cls, switcherBoard);
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
                                  {!cInfo.isAccessible && (
                                    <Lock className="w-3 h-3 text-amber-600" />
                                  )}
                                </div>
                                <span
                                  className={`text-[9px] font-bold block truncate ${
                                    isCurrent ? 'text-indigo-100' : 'text-slate-500'
                                  }`}
                                >
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
                              onOpenMembership(currentStudent.classLevel, switcherBoard);
                            }}
                            className="w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] cursor-pointer shadow-xs"
                          >
                            + Activate / Renew Board &amp; Class (₹99)
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })()}

          {/* Signed-in Plan Badge / Upgrade Button */}
          {currentStudent &&
            (() => {
              const pInfo = getStudentPlanInfo(
                currentStudent,
                undefined,
                currentStudent.classLevel,
                activeBoard
              );
              if (pInfo.effectivePlan === 'free') {
                return (
                  <button
                    type="button"
                    onClick={() => onOpenMembership(currentStudent.classLevel, activeBoard)}
                    className="hidden md:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                  >
                    <Crown className="w-3.5 h-3.5" />
                    <span>Upgrade ₹99</span>
                  </button>
                );
              }
              return (
                <button
                  type="button"
                  onClick={() => onOpenMembership(currentStudent.classLevel, activeBoard)}
                  className="hidden md:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>₹99 ({pInfo.daysRemaining}d)</span>
                </button>
              );
            })()}

          {/* Signed-out Desktop Quick CTAs */}
          {!currentStudent && !currentUser && (
            <div className="hidden sm:flex items-center gap-2">
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold transition-colors cursor-pointer"
              >
                Register Free
              </button>
            </div>
          )}

          {/* Notification Bell (Authenticated Users Only) */}
          {(currentStudent || currentUser) && (
            <div className="relative">
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

                      <button
                        type="button"
                        onClick={() => {
                          setCurrentTab('referrals');
                          setShowProfileDropdown(false);
                        }}
                        className="w-full p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold text-xs border border-emerald-200 flex items-center justify-between cursor-pointer"
                      >
                        <span className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-emerald-600" />
                          <span>Referral Wallet (₹5 Cashback)</span>
                        </span>
                        <ChevronRight className="w-4 h-4 text-emerald-600" />
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

                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileDropdown(false);
                          setShowLogoutConfirm(true);
                        }}
                        className="w-full p-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer mt-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Logout OR Sign In Button */}
          {currentUser || currentStudent ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(!showLogoutConfirm);
                  setShowProfileDropdown(false);
                  setShowNotifications(false);
                }}
                className="px-2.5 sm:px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
                aria-expanded={showLogoutConfirm}
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>

              {showLogoutConfirm && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLogoutConfirm(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-2xl border-2 border-red-200 p-4 z-50">
                    <h4 className="font-extrabold text-sm text-slate-900">
                      Confirm Log Out?
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 mb-3">
                      {currentStudent
                        ? `Sign out of ${currentStudent.name}? Your saved progress remains safe.`
                        : 'End your current session?'}
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setShowLogoutConfirm(false)}
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          setShowLogoutConfirm(false);
                          await logout();
                        }}
                        className="py-2 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs cursor-pointer"
                      >
                        Yes, Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Login</span>
            </button>
          )}

          {/* Mobile Hamburger Menu Button */}
          {isLearningRole && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Hamburger Drawer with Expandable Sub-Menus */}
      {isLearningRole && mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-3 max-h-[82vh] overflow-y-auto shadow-lg">
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

          {/* 8 Main Collapsible Accordion Categories */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
            {MAIN_NAV_MENUS.map((menu) => {
              const isExpanded = expandedMobileMenu === menu.id;
              return (
                <div key={menu.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedMobileMenu(isExpanded ? null : menu.id)
                    }
                    aria-expanded={isExpanded}
                    className="w-full min-h-[46px] px-4 py-3 flex items-center justify-between text-left bg-white hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                      {menu.label}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-amber-700" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="bg-slate-50/80 px-3 py-2 space-y-1 border-t border-slate-100">
                      {menu.items.map((sub) => {
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
                            className="w-full min-h-[44px] px-3 py-2 rounded-xl bg-white hover:bg-amber-50 border border-slate-200/80 text-left flex items-center justify-between gap-2 cursor-pointer"
                          >
                            <div>
                              <p className="text-xs font-bold text-slate-900">{label}</p>
                              <p className="text-[11px] text-slate-500">{sub.description}</p>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Authenticated Student/Teacher Learning Studios Quick Bar */}
          {currentStudent && (
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-1 block">
                Learning &amp; Championship Studios
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { tab: 'stories', label: 'Story World (45)', icon: BookOpen },
                  { tab: 'shivaji', label: 'Shivaji (50)', icon: Crown },
                  { tab: 'drawing', label: 'Drawing Studio', icon: Palette },
                  { tab: 'cricket', label: 'Cricket Quiz', icon: Activity },
                  { tab: 'scholarship', label: 'MSCE Scholarship', icon: Trophy },
                  { tab: 'future-skills', label: 'AI Skills', icon: Bot },
                  { tab: 'puzzles', label: 'Brain Puzzles', icon: Puzzle },
                  { tab: 'sudoku', label: 'Sudoku Game', icon: Grid3X3 },
                  { tab: 'certificates', label: 'Certificates', icon: Medal },
                  { tab: 'referrals', label: 'Refer & Earn', icon: Gift },
                ].map((studio) => {
                  const Icon = studio.icon;
                  return (
                    <button
                      key={studio.tab}
                      type="button"
                      onClick={() => {
                        setCurrentTab(studio.tab);
                        setMobileMenuOpen(false);
                      }}
                      className="min-h-[42px] px-3 py-2 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 text-left font-bold text-slate-800 flex items-center gap-2 cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{studio.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Account Bottom Row */}
          {currentUser || currentStudent ? (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('profile');
                  setMobileMenuOpen(false);
                }}
                className="min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
                className="min-h-[44px] rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('register');
                }}
                className="min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>Register Free</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="min-h-[44px] rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
