import React from 'react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import { MainMenuId, NavSubActionId } from '../data/navigationConfig';
import { ReferenceShowcaseSections } from './ReferenceShowcaseSections';
import { FiveZonesHubStrip } from './zones/FiveZonesHubStrip';
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
  onOpenAuth: (defaultTab: 'login' | 'register' | 'teacher' | 'admin') => void;
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
  return (
    <div className={`${isDesktopMode ? 'space-y-8' : 'space-y-10'} pb-12`}>
      {/* SECTION 1: FOCUSED HOME DASHBOARD */}
      <div id="home-overview">
        <ReferenceShowcaseSections
          selectedBoard={selectedBoard}
          selectedClass={selectedClass}
          onSelectBoard={onSelectBoard}
          onSelectClass={onSelectClass}
          onOpenDemo={(tab) => onOpenDemo(tab || 'live-quiz')}
          onNavigateTab={(tab, subSection, subject) =>
            onNavigateZone(tab, subSection || 'overview', subject)
          }
          onGlobalSearchJump={onGlobalSearchJump}
          onMenuAction={onMenuAction}
          onOpenAuth={onOpenAuth}
          onOpenPanel={onOpenPanel}
          isAuthenticated={isAuthenticated}
          currentRole={currentRole}
          currentUserName={currentUserName}
          onOpenMembership={(targetClass, targetBoard) =>
            onOpenMembership(targetClass || selectedClass, targetBoard || selectedBoard)
          }
          onStartLearningClick={() => onNavigateZone('all-courses')}
          viewMode={isDesktopMode ? 'desktop' : 'auto'}
          onToggleViewMode={onToggleViewMode}
          activeMainSection={activeMainSection}
          onSelectMainSection={onSelectMainSection}
          activeSubActionId={activeSubActionId}
          progressMetrics={{
            isLoggedIn: false,
            coursesCompleted: 0,
            practiceTests: 0,
            achievements: 0,
            progressPercent: 0,
          }}
        />
      </div>

      {/* FIVE MAJOR EDUCATIONAL ZONES HUB */}
      <FiveZonesHubStrip
        onNavigateZone={(tab) => onNavigateZone(tab)}
        onOpenTeacherPortal={() => onOpenPanel('teacher', 'login')}
        onOpenPortalLanding={onOpenPortalLanding}
      />

      {/* DIRECT PWA MOBILE APP INSTALL BANNER */}
      <PWAInstallButton variant="banner" />
    </div>
  );
};
