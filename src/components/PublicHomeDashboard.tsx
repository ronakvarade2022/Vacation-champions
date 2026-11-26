import React from 'react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { InteractiveWallpaperHero } from './InteractiveWallpaperHero';
import { PWAInstallButton } from './PWAInstallButton';

export type HomeScrollTarget =
  | 'home-overview'
  | 'courses-section'
  | 'special-learning-section'
  | 'home-how-it-works'
  | 'home-why-choose-us'
  | 'plans-pricing'
  | 'home-faqs'
  | null;

interface PublicHomeDashboardProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (cls: ClassLevel) => void;
  scrollTarget?: HomeScrollTarget;
  onClearScrollTarget?: () => void;
  onOpenDemo: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onNavigateZone: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onOpenAuth: (defaultTab: AuthModalTab, registerRole?: PortalRegisterRole) => void;
  onOpenPanel: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenPortalLanding?: (portalRole: Exclude<PortalRole, 'admin'>) => void;
  onOpenMembership: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  isAuthenticated?: boolean;
  currentRole?: PortalRole;
  currentUserName?: string;
  isDesktopMode?: boolean;
  onToggleViewMode?: () => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
  activeSubActionId?: NavSubActionId;
  onGlobalSearchJump?: (target: import('./StudyLibraryGlobalSearch').GlobalSearchJumpTarget) => void;
}

/**
 * PUBLIC HOMEPAGE (https://mystudyzone.in)
 * Renders ONLY the new MyStudyZone high-resolution educational wallpaper homepage
 * with real interactive controls and global search.
 * The private detailed user dashboards (StudentDashboard, TeacherDashboard, ParentZoneView,
 * SchoolCollegeZoneView, CoachingInstituteZoneView) remain strictly inside their respective
 * authenticated user portals.
 */
export const PublicHomeDashboard: React.FC<PublicHomeDashboardProps> = ({
  selectedBoard,
  selectedClass,
  onNavigateZone,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
  isAuthenticated = false,
  currentRole = 'student',
  currentUserName,
  onGlobalSearchJump,
}) => {
  return (
    <div id="home-overview" className="space-y-6 pb-10">
      <InteractiveWallpaperHero
        selectedBoard={selectedBoard}
        selectedClass={selectedClass}
        isAuthenticated={isAuthenticated}
        currentRole={currentRole}
        currentUserName={currentUserName}
        onNavigateTab={(tab, subSection, subject) =>
          onNavigateZone(tab, subSection || 'overview', subject)
        }
        onGlobalSearchJump={onGlobalSearchJump}
        onOpenAuth={onOpenAuth}
        onOpenPanel={onOpenPanel}
        onOpenPortalLanding={onOpenPortalLanding}
      />

      {/* Direct PWA Mobile App Install Banner (Auto-hidden when installed) */}
      <PWAInstallButton variant="banner" />
    </div>
  );
};
