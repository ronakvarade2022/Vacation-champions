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
  Users,
  BookOpenCheck,
} from 'lucide-react';
import {
  ALL_BOARDS,
  ALL_CLASS_LEVELS,
  getAccessibleBoardClassesList,
  getBoardShortLabel,
  getClassSubscriptionInfo,
  getStudentPlanInfo,
} from '../utils/subscriptionAccess';
import { BrandBookCapLogo } from './DashboardIllustrations';
import { LogoutConfirmModal } from './LogoutConfirmModal';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onMenuAction: (actionId: NavSubActionId) => void;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
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
  onSelectMainSection,
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
    isSectionVisible,
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

  const isTeacherAccount = currentStudent?.accountRole === 'teacher' || activeRole === 'teacher';
  const isStudentAccount = Boolean(currentStudent && currentStudent.accountRole !== 'teacher' && activeRole === 'student');
  const isAdminActive = Boolean(currentUser?.role === 'admin' && activeRole === 'admin');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs w-full">
      {/* Top Role Portals Bar: Always-visible Student Portal, Teacher Portal & Admin Portal (Desktop & Mobile 360px safe) */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className={`${containerWidthClass} px-2.5 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between gap-2`}>
          <span className="hidden lg:inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-300 truncate">
            <BookOpenCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Classes 1–10 · 4th &amp; 7th Scholarship · MAHA TET · CTET Portals</span>
          </span>

          <div
            role="navigation"
            aria-label="Portal Access"
            className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 w-full lg:w-auto sm:justify-end"
          >
            <button
              type="button"
              onClick={() => {
                setOpenDropdownMenu(null);
                setMobileMenuOpen(false);
                onOpenPanel('student', 'login');
              }}
              className={`min-h-[32px] px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-extrabold flex items-center justify-center gap-1 sm:gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                isStudentAccount
                  ? 'bg-indigo-600 text-white border-indigo-400 shadow-xs'
                  : 'bg-white/10 hover:bg-indigo-600/80 text-white border-white/15'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpenDropdownMenu(null);
                setMobileMenuOpen(false);
                onOpenPanel('teacher', 'login');
              }}
              className={`min-h-[32px] px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-extrabold flex items-center justify-center gap-1 sm:gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                isTeacherAccount
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-xs'
                  : 'bg-white/10 hover:bg-emerald-600/80 text-white border-white/15'
              }`}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-300 shrink-0" />
              <span>Teacher Portal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setOpenDropdownMenu(null);
                setMobileMenuOpen(false);
                onOpenPanel('admin', 'login');
              }}
              className={`min-h-[32px] px-2 sm:px-3 py-1 rounded-lg text-[10px] sm:text-xs font-extrabold flex items-center justify-center gap-1 sm:gap-1.5 border transition-all cursor-pointer whitespace-nowrap ${
                isAdminActive
                  ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-xs'
                  : 'bg-white/10 hover:bg-amber-500/80 hover:text-slate-950 text-white border-white/15'
              }`}
            >
              <ShieldCheck className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isAdminActive ? 'text-slate-950' : 'text-amber-300'}`} />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className={`${containerWidthClass} px-3.5 sm:px-6 lg:px-8 py-2.5 sm:py-3 min-h-[60px] sm:min-h-[68px] flex items-center justify-between gap-2 sm:gap-3`}>
        {/* Brand Logo (Reference-matched Orange Cap-Book Icon + Two-Tone MyStudyZone + Learn • Practice • Grow) */}
        <button
          type="button"
          onClick={() => {
            setOpenDropdownMenu(null);
            setMobileMenuOpen(false);
            if (activeRole === 'admin') handleRoleChange('student');
            onMenuAction('home-overview');
          }}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group shrink-0 min-w-0 text-left"
        >
          <BrandBookCapLogo className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl shadow-sm group-hover:scale-105 transition-transform shrink-0" />
          <div className="leading-none min-w-0">
            <span className="font-display font-black text-base sm:text-2xl tracking-tight block truncate">
              <span className="text-slate-900">MyStudy</span>
              <span className="text-orange-600">Zone</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-extrabold text-slate-700 tracking-wide block mt-0.5 truncate">
              Learn • Practice • Grow
            </span>
          </div>
        </button>

        {/* Desktop Navigation Bar (Direct Main Section Tabs) */}
        {isLearningRole && (
          <nav
            ref={navContainerRef}
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-1 overflow-visible"
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
                  className={`px-2.5 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                    isSpecialTab
                      ? isActive
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-amber-100/90 text-amber-950 hover:bg-amber-200 border border-amber-300'
                      : isActive
                      ? 'text-amber-800 bg-amber-50 border border-amber-200'
                      : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                  }`}
                >
                  <span>{menu.label}</span>
                </button>
              );
            })}
          </nav>
        )}

        {/* Right Actions Area */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Signed-in Active Board & Class Switcher Pill (Visible on Mobile, Tablet & Desktop) */}
          {isLearningRole &&
            currentStudent &&
            (() => {
              const accessiblePairs = getAccessibleBoardClassesList(currentStudent);
              return (
                <div className="relative block">
                  <button
                    type="button"
                    onClick={() => {
                      setShowClassSwitcher(!showClassSwitcher);
                      setShowNotifications(false);
                      setShowProfileDropdown(false);
                    }}
                    className="flex items-center gap-1 sm:gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-2 sm:px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors"
                    title={`Active Class: ${getBoardShortLabel(activeBoard)} · ${currentStudent.classLevel} (${accessiblePairs.length} unlocked)`}
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                    <span className="text-[10px] sm:text-xs font-extrabold text-amber-950 whitespace-nowrap">
                      <span className="hidden sm:inline">Active Class: {getBoardShortLabel(activeBoard)} · </span>
                      <span className="sm:hidden">Active: </span>
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
                    className="hidden lg:flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
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
                  className="hidden lg:flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-extrabold px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Crown className="w-3.5 h-3.5 text-emerald-600" />
                  <span>₹99 ({pInfo.daysRemaining}d)</span>
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

                    {/* Fixed Bottom Logout in Profile Dropdown (Always visible on mobile & desktop) */}
                    <div className="p-3 bg-slate-50 border-t border-slate-200 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setShowProfileDropdown(false);
                          setShowLogoutConfirm(true);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 active:bg-red-800 text-white font-black text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-all border border-rose-500/40"
                      >
                        <LogOut className="w-4 h-4 shrink-0" />
                        <span>Sign Out / Logout (लॉग आउट)</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Mobile Hamburger Menu Button */}
          {isLearningRole && (
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-800 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors shrink-0"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          )}

          {/* SINGLE LOGIN / LOGOUT BUTTON IN TOP-RIGHT CORNER */}
          {currentUser || currentStudent ? (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(!showLogoutConfirm);
                  setShowProfileDropdown(false);
                  setShowNotifications(false);
                }}
                aria-label="Logout"
                aria-expanded={showLogoutConfirm}
                className="min-h-[36px] sm:min-h-[42px] px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs sm:text-sm font-black shadow-xs hover:shadow-md flex items-center justify-center gap-1 sm:gap-1.5 transition-all cursor-pointer shrink-0 border border-rose-500/40"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              aria-label="Login"
              className="min-h-[38px] sm:min-h-[42px] px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border border-indigo-500/40"
            >
              <LogIn className="w-4 h-4 shrink-0" />
              <span>Login</span>
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

          {/* Vertical Main Sections with Horizontal Subsections Directly Underneath */}
          <div className="space-y-3">
            {MAIN_NAV_MENUS.map((menu, idx) => {
              const visibleItems = menu.items.filter(
                (sub) => !sub.sectionVisibilityKey || isSectionVisible(sub.sectionVisibilityKey)
              );
              if (visibleItems.length === 0) return null;
              return (
                <div
                  key={menu.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-display font-black uppercase tracking-wider text-[#0f2952]">
                      {idx + 1}. {menu.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        if (menu.id !== 'account' && onSelectMainSection) {
                          onSelectMainSection(menu.id);
                          return;
                        }
                        handleTriggerSubAction(menu.defaultActionId);
                      }}
                      className="text-[11px] font-extrabold text-amber-800 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Open</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Horizontal Scrollable Row of Subsections Directly Below Main Section */}
                  <div className="flex items-stretch gap-2 overflow-x-auto pb-1.5">
                    {visibleItems.map((sub) => {
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
                          className="min-w-[155px] shrink-0 px-3 py-2 rounded-xl bg-white hover:bg-amber-50 border border-slate-200/90 text-left flex items-center justify-between gap-2 cursor-pointer shadow-2xs"
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-extrabold text-slate-900 truncate">
                              {label}
                            </p>
                            <p className="text-[10px] font-bold text-amber-800 truncate mt-0.5">
                              {sub.badgeText || 'Open'}
                            </p>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Account Bottom Row (Profile & Logout Shortcuts in Mobile Menu) */}
          {currentStudent && (
            <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2">
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
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-rose-500/40"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
          {currentUser && !currentStudent && (
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowLogoutConfirm(true);
                }}
                className="w-full min-h-[44px] rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs border border-rose-500/40"
              >
                <LogOut className="w-4 h-4" />
                <span>Supervisor Logout</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Global Header Logout Confirmation Modal */}
      <LogoutConfirmModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={async () => {
          await logout();
        }}
        accountName={currentStudent?.name || currentUser?.displayName || 'User'}
        roleTitle={
          activeRole === 'admin'
            ? 'Administrator'
            : currentStudent?.accountRole === 'teacher'
            ? 'Teacher'
            : 'Student'
        }
      />
    </header>
  );
};
