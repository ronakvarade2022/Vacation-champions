import React from 'react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { InteractiveWallpaperHero } from './InteractiveWallpaperHero';

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
  onSetViewMode?: (mode: 'auto' | 'desktop') => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (sectionId: MainMenuId) => void;
  activeSubActionId?: NavSubActionId;
  onGlobalSearchJump?: (target: import('./StudyLibraryGlobalSearch').GlobalSearchJumpTarget) => void;
}

/**
 * PUBLIC HOMEPAGE (https://mystudyzone.in)
 * Renders the full-screen MyStudyZone high-resolution educational wallpaper homepage
 * with Mobile View (Portrait) and Desktop Site (Landscape) switcher at top-right
 * and all 5 clickable portal cards visible on screen.
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
  isDesktopMode = false,
  onToggleViewMode,
  onSetViewMode,
  onGlobalSearchJump,
}) => {
  return (
    <div id="home-overview" className="w-full min-h-screen">
      <InteractiveWallpaperHero
        selectedBoard={selectedBoard}
        selectedClass={selectedClass}
        isAuthenticated={isAuthenticated}
        currentRole={currentRole}
        currentUserName={currentUserName}
        isDesktopMode={isDesktopMode}
        onToggleViewMode={onToggleViewMode}
        onSetViewMode={onSetViewMode}
        onNavigateTab={(tab, subSection, subject) =>
          onNavigateZone(tab, subSection || 'overview', subject)
        }
        onGlobalSearchJump={onGlobalSearchJump}
        onOpenAuth={onOpenAuth}
        onOpenPanel={onOpenPanel}
        onOpenPortalLanding={onOpenPortalLanding}
      />
    </div>
  );
};
