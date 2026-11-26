import React from 'react';
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Home,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import type { PortalRole } from '../types';

interface MobileBottomNavProps {
  currentTab: string;
  activeRole: PortalRole;
  isTeacherPortal: boolean;
  isAuthenticated: boolean;
  viewMode: 'auto' | 'desktop';
  onNavigateTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  activeRole,
  isTeacherPortal,
  isAuthenticated,
  viewMode,
  onNavigateTab,
  onOpenAuth,
}) => {
  // Hide when forced desktop mode is active or inside Admin console
  if (viewMode === 'desktop' || activeRole === 'admin') {
    return null;
  }

  const navItems = isTeacherPortal
    ? [
        {
          id: 'dashboard',
          label: 'Classroom',
          icon: Users,
          matchTabs: ['dashboard', 'teacher-dashboard'],
          onClick: () => onNavigateTab('dashboard'),
        },
        {
          id: 'lesson-planner',
          label: 'Planner',
          icon: Calendar,
          matchTabs: ['lesson-planner'],
          onClick: () => onNavigateTab('lesson-planner'),
        },
        {
          id: 'study-materials',
          label: 'Resources',
          icon: BookOpen,
          matchTabs: ['study-materials', 'worksheets', 'additional-curriculum'],
          onClick: () => onNavigateTab('study-materials'),
        },
        {
          id: 'ai-tools',
          label: 'AI Tools',
          icon: Sparkles,
          matchTabs: ['ai-tools', 'document-studio', 'qr-barcode-centre'],
          onClick: () => onNavigateTab('ai-tools'),
        },
        {
          id: 'profile',
          label: isAuthenticated ? 'Account' : 'Login',
          icon: User,
          matchTabs: ['profile', 'account', 'subscription'],
          onClick: () => (isAuthenticated ? onNavigateTab('profile') : onOpenAuth()),
        },
      ]
    : [
        {
          id: 'dashboard',
          label: 'Home',
          icon: Home,
          matchTabs: ['dashboard', 'public-home', 'portal-landing'],
          onClick: () => onNavigateTab('dashboard'),
        },
        {
          id: 'all-courses',
          label: 'Courses',
          icon: GraduationCap,
          matchTabs: ['all-courses', 'additional-curriculum', 'core-skills-lab'],
          onClick: () => onNavigateTab('all-courses'),
        },
        {
          id: 'study-materials',
          label: 'Study',
          icon: BookOpen,
          matchTabs: ['study-materials', 'worksheets'],
          onClick: () => onNavigateTab('study-materials'),
        },
        {
          id: 'ai-tools',
          label: 'AI Tools',
          icon: Sparkles,
          matchTabs: ['ai-tools', 'document-studio', 'qr-barcode-centre'],
          onClick: () => onNavigateTab('ai-tools'),
        },
        {
          id: 'quizzes',
          label: 'Exams',
          icon: FileText,
          matchTabs: ['quizzes', 'scholarship', 'tet-ctet', 'demo', 'demo-mock-tests'],
          onClick: () => onNavigateTab(isAuthenticated ? 'quizzes' : 'demo-mock-tests'),
        },
      ];

  return (
    <nav
      aria-label="Mobile Quick Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0b1930]/95 backdrop-blur-md border-t border-slate-700/90 text-white shadow-2xl pb-safe-bottom no-print"
    >
      <div className="grid grid-cols-5 items-center max-w-lg mx-auto px-1.5 pt-1 pb-0.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.matchTabs.includes(currentTab);
          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`min-h-[46px] py-1 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-colors cursor-pointer ${
                isActive
                  ? 'text-amber-300 font-black'
                  : 'text-slate-300 hover:text-white font-bold'
              }`}
            >
              <div
                className={`px-2.5 py-0.5 rounded-full transition-colors ${
                  isActive ? 'bg-amber-400/20 text-amber-300' : ''
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
              </div>
              <span className="text-[10px] leading-tight truncate max-w-full">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
