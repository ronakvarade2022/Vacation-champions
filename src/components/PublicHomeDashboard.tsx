import React from 'react';
import { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import type { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import type { GlobalSearchJumpTarget } from './StudyLibraryGlobalSearch';
import { StudentDashboard } from './StudentDashboard';

export type HomeScrollTarget =
  | 'home-overview'
  | 'courses-section'
  | 'plans-pricing'
  | 'special-learning'
  | null;

export interface PublicHomeDashboardProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard: (board: EducationBoard) => void;
  onSelectClass: (cls: ClassLevel) => void;
  scrollTarget?: HomeScrollTarget;
  onClearScrollTarget?: () => void;
  onOpenDemo?: (
    demoTab?: 'overview' | 'demo-mock-tests' | 'live-curriculum' | 'live-quiz' | 'live-puzzles'
  ) => void;
  onNavigateZone?: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onOpenAuth?: (tab: AuthModalTab, registerRole?: PortalRegisterRole) => void;
  onOpenPanel?: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenPortalLanding?: (portalRole: Exclude<PortalRole, 'admin'>) => void;
  onOpenMembership?: (targetClass?: ClassLevel, targetBoard?: EducationBoard) => void;
  isAuthenticated?: boolean;
  currentRole?: PortalRole;
  isDesktopMode?: boolean;
  onToggleViewMode?: () => void;
  onSetViewMode?: (mode: 'auto' | 'desktop') => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  onGlobalSearchJump?: (target: GlobalSearchJumpTarget) => void;
  activeMainSection?: MainMenuId;
  onSelectMainSection?: (section: MainMenuId) => void;
  activeSubActionId?: NavSubActionId;
}

export const PublicHomeDashboard: React.FC<PublicHomeDashboardProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  onOpenDemo,
  onNavigateZone,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
  onOpenMembership,
  onToggleViewMode,
  onMenuAction,
  onGlobalSearchJump,
  activeMainSection,
  onSelectMainSection,
  activeSubActionId,
}) => {
  return (
    <StudentDashboard
      selectedBoard={selectedBoard}
      selectedClass={selectedClass}
      onSelectBoard={onSelectBoard}
      onSelectClass={onSelectClass}
      onOpenDemo={onOpenDemo}
      onNavigateZone={onNavigateZone}
      onOpenAuth={onOpenAuth}
      onOpenPanel={onOpenPanel}
      onOpenPortalLanding={onOpenPortalLanding}
      onOpenMembership={(_plan, targetClass, targetBoard) =>
        onOpenMembership?.(targetClass, targetBoard)
      }
      onToggleViewMode={onToggleViewMode}
      onMenuAction={onMenuAction}
      onGlobalSearchJump={onGlobalSearchJump}
      activeMainSection={activeMainSection}
      onSelectMainSection={onSelectMainSection}
      activeSubActionId={activeSubActionId}
    />
  );
};
