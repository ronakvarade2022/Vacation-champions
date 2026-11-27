import React, { useEffect } from 'react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { safeScrollToElementById } from '../utils/smartTvCompatibility';
import { ReferenceShowcaseSections } from './ReferenceShowcaseSections';

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
 * PUBLIC HOMEPAGE DASHBOARD (https://mystudyzone.in)
 * Renders the complete, well-organized Student Portal / Main Learning Dashboard
 * (ReferenceShowcaseSections) directly on the homepage for easy handling and navigation.
 */
export const PublicHomeDashboard: React.FC<PublicHomeDashboardProps> = ({
  selectedBoard,
  selectedClass,
  onSelectBoard,
  onSelectClass,
  scrollTarget,
  onClearScrollTarget,
  onOpenDemo,
  onNavigateZone,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
  onOpenMembership,
  isAuthenticated = false,
  currentRole = 'student',
  currentUserName,
  isDesktopMode = false,
  onToggleViewMode,
  onMenuAction,
  activeMainSection,
  onSelectMainSection,
  activeSubActionId,
  onGlobalSearchJump,
}) => {
  useEffect(() => {
    if (!scrollTarget) return;
    const timer = setTimeout(() => {
      safeScrollToElementById(scrollTarget, { behavior: 'smooth', block: 'start' });
      if (onClearScrollTarget) onClearScrollTarget();
    }, 60);
    return () => clearTimeout(timer);
  }, [scrollTarget, onClearScrollTarget]);

  return (
    <div id="home-overview" className="w-full space-y-8 pb-10">
      <ReferenceShowcaseSections
        selectedBoard={selectedBoard}
        selectedClass={selectedClass}
        onSelectBoard={onSelectBoard}
        onSelectClass={onSelectClass}
        onOpenDemo={onOpenDemo}
        onNavigateTab={(tab, subSection, subject) =>
          onNavigateZone(tab, subSection || 'overview', subject)
        }
        onGlobalSearchJump={onGlobalSearchJump}
        onMenuAction={onMenuAction}
        onOpenAuth={(defaultTab) => onOpenAuth(defaultTab)}
        onOpenPanel={onOpenPanel}
        onOpenPortalLanding={onOpenPortalLanding}
        isAuthenticated={isAuthenticated}
        currentRole={currentRole}
        currentUserName={currentUserName}
        onOpenMembership={onOpenMembership}
        onStartLearningClick={() => onNavigateZone('all-courses')}
        viewMode={isDesktopMode ? 'desktop' : 'auto'}
        onToggleViewMode={onToggleViewMode}
        activeMainSection={activeMainSection}
        onSelectMainSection={onSelectMainSection}
        activeSubActionId={activeSubActionId}
        progressMetrics={{
          isLoggedIn: isAuthenticated,
          studentName: currentUserName,
          coursesCompleted: 0,
          practiceTests: 0,
          achievements: 0,
          progressPercent: 0,
          badgesList: [],
        }}
      />
    </div>
  );
};
