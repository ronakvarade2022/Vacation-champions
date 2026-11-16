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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs w-full">
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

        {/* Desktop Navigation Bar with Sub-Menu Dropdowns (including 🎓 Special Learning) */}
        {isLearningRole && (
          <nav
            ref={navContainerRef}
            aria-label="Primary Navigation"
            className="hidden xl:flex items-center gap-0.5 overflow-visible"
          >
            {MAIN_NAV_MENUS.map((menu) => {
              const visibleItems = menu.items.filter(
                (sub) => !sub.sectionVisibilityKey || isSectionVisible(sub.sectionVisibilityKey)
              );
              if (visibleItems.length === 0) return null;

              const isOpen = openDropdownMenu === menu.id;
              const isActive = activeMenuId === menu.id;
              const isSpecialTab = menu.id === 'special-learning';
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
                    className={`px-2 py-1.5 rounded-lg text-[11px] font-extrabold uppercase tracking-tight flex items-center gap-1 transition-colors cursor-pointer whitespace-nowrap ${
                      isSpecialTab
                        ? isOpen || isActive
                          ? 'bg-amber-500 text-slate-950 shadow-xs'
                          : 'bg-amber-100/90 text-amber-950 hover:bg-amber-200 border border-amber-300'
                        : isOpen || isActive
                        ? 'text-amber-800 bg-amber-50'
                        : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/70'
                    }`}
                  >
                    <span>{menu.label}</span>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-150 ${
                        isOpen ? 'rotate-180 text-amber-700' : isSpecialTab ? 'text-amber-800' : 'text-slate-400'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      onMouseEnter={() => handleMouseEnterMenu(menu.id)}
                      onMouseLeave={handleMouseLeaveMenu}
                      className={`absolute top-full mt-1.5 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150 ${
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

                      <div className="space-y-0.5 max-h-[70vh] overflow-y-auto">
                        {visibleItems.map((sub) => {
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
                                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
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
                className="min-h-[38px] sm:min-h-[42px] px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white text-xs sm:text-sm font-extrabold shadow-sm hover:shadow-md flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 border border-rose-500/40"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Logout</span>
              </button>

              {showLogoutConfirm && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowLogoutConfirm(false)}
                  />
                  <div className="fixed sm:absolute right-3.5 sm:right-0 top-16 sm:top-full sm:mt-2 w-72 max-w-[calc(100vw-1.75rem)] bg-white rounded-2xl shadow-2xl border-2 border-red-200 p-4 z-50">
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

          {/* Collapsible Accordion Navigation Categories */}
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
            {MAIN_NAV_MENUS.map((menu) => {
              const visibleItems = menu.items.filter(
                (sub) => !sub.sectionVisibilityKey || isSectionVisible(sub.sectionVisibilityKey)
              );
              if (visibleItems.length === 0) return null;
              const isExpanded = expandedMobileMenu === menu.id;
              return (
                <div key={menu.id}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedMobileMenu(isExpanded ? null : menu.id)
                    }
                    aria-expanded={isExpanded}
                    className={`w-full min-h-[46px] px-4 py-3 flex items-center justify-between text-left cursor-pointer ${
                      menu.id === 'special-learning'
                        ? 'bg-amber-50 hover:bg-amber-100/80'
                        : 'bg-white hover:bg-slate-50'
                    }`}
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

          {/* Special Learning & Championship Studios Quick Bar (Accessible to Visitors & Students) */}
          <div className="space-y-2 pt-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 px-1 block">
              Special Learning &amp; Enrichment Studios
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { tab: 'scholarship', label: 'Scholarship Corner', icon: Trophy, visKey: 'scholarship' as const },
                { tab: 'drawing', label: 'Drawing Studio', icon: Palette, visKey: 'drawing' as const },
                { tab: 'stories', label: 'Story World (45)', icon: BookOpen, visKey: 'stories' as const },
                { tab: 'shivaji', label: 'Shivaji Stories (50)', icon: Crown, visKey: 'shivaji' as const },
                { tab: 'cricket', label: 'Cricket & GK', icon: Activity, visKey: 'gk_cricket' as const },
                { tab: 'puzzles', label: 'Brain Puzzles', icon: Puzzle, visKey: 'creative_activities' as const },
                { tab: 'sudoku', label: 'Sudoku Game', icon: Grid3X3, visKey: 'creative_activities' as const },
                { tab: 'future-skills', label: 'AI & Skills', icon: Bot, visKey: 'future_skills' as const },
                { tab: 'other-programs', label: 'Other Programs', icon: Sparkles, visKey: 'future_skills' as const },
                { tab: 'all-courses', label: 'All Courses (1–10)', icon: GraduationCap, visKey: 'all_courses' as const },
              ]
                .filter((studio) => isSectionVisible(studio.visKey))
                .map((studio) => {
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

          {/* Account Bottom Row (Profile Shortcut Only when Signed In — No Duplicate Login/Logout) */}
          {currentStudent && (
            <div className="pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setCurrentTab('profile');
                  setMobileMenuOpen(false);
                }}
                className="w-full min-h-[44px] rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
