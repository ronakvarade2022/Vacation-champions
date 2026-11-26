import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Download,
  ExternalLink,
  MoreVertical,
  Share,
  Smartphone,
  X,
} from 'lucide-react';
import type { ClassLevel, EducationBoard, PortalRole, SubjectName } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';
import type { NavSubActionId } from '../data/navigationConfig';
import type { GlobalSearchJumpTarget } from './StudyLibraryGlobalSearch';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InteractiveWallpaperHeroProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onSelectBoard?: (board: EducationBoard) => void;
  onSelectClass?: (cls: ClassLevel) => void;
  isAuthenticated?: boolean;
  currentRole?: PortalRole;
  currentUserName?: string;
  isDesktopMode?: boolean;
  onToggleViewMode?: () => void;
  onSetViewMode?: (mode: 'auto' | 'desktop') => void;
  onOpenDemo?: (tab?: 'overview' | 'live-curriculum' | 'live-quiz' | 'live-puzzles') => void;
  onOpenMembership?: (targetClass: ClassLevel, targetBoard: EducationBoard) => void;
  onMenuAction?: (actionId: NavSubActionId) => void;
  onNavigateTab: (tab: string, subSection?: string, subject?: SubjectName) => void;
  onGlobalSearchJump?: (target: GlobalSearchJumpTarget) => void;
  onOpenAuth: (defaultTab: AuthModalTab, registerRole?: PortalRegisterRole) => void;
  onOpenPanel?: (panel: 'student' | 'teacher' | 'admin', intent?: 'login' | 'register') => void;
  onOpenPortalLanding?: (portalRole: Exclude<PortalRole, 'admin'>) => void;
}

const PORTAL_HOTSPOTS: Array<{
  id: string;
  title: string;
  role: 'student' | 'teacher' | 'parent' | 'school_admin' | 'institute_admin';
  loginTab: AuthModalTab;
  leftPct: number;
  widthPct: number;
}> = [
  {
    id: 'hotspot-students',
    title: 'Students (Study & Practice)',
    role: 'student',
    loginTab: 'login',
    leftPct: 19.7,
    widthPct: 11.4,
  },
  {
    id: 'hotspot-teachers',
    title: 'Teachers (Plan & Teach)',
    role: 'teacher',
    loginTab: 'teacher',
    leftPct: 32.0,
    widthPct: 11.4,
  },
  {
    id: 'hotspot-parents',
    title: 'Parents (Track Progress)',
    role: 'parent',
    loginTab: 'parent',
    leftPct: 44.3,
    widthPct: 11.4,
  },
  {
    id: 'hotspot-colleges',
    title: 'Colleges (Manage Academics)',
    role: 'school_admin',
    loginTab: 'school_admin',
    leftPct: 56.6,
    widthPct: 11.4,
  },
  {
    id: 'hotspot-institutes',
    title: 'Institutes (Build Excellence)',
    role: 'institute_admin',
    loginTab: 'institute_admin',
    leftPct: 68.8,
    widthPct: 11.4,
  },
];

export const InteractiveWallpaperHero: React.FC<InteractiveWallpaperHeroProps> = ({
  onOpenDemo,
  onNavigateTab,
  onOpenAuth,
  onOpenPanel,
  onOpenPortalLanding,
}) => {
  const {
    isInstallable,
    isIOS,
    isIOSSafari,
    isAndroid,
    isInAppBrowser,
    install,
  } = usePWAInstall();

  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [isPrompting, setIsPrompting] = useState(false);

  const openPortalDestination = (
    portal: 'student' | 'teacher' | 'parent' | 'school_admin' | 'institute_admin'
  ) => {
    if (onOpenPortalLanding) {
      onOpenPortalLanding(portal);
      return;
    }
    if (portal === 'student') {
      if (onOpenPanel) onOpenPanel('student', 'login');
      else onOpenAuth('login', 'student');
      return;
    }
    if (portal === 'teacher') {
      if (onOpenPanel) onOpenPanel('teacher', 'login');
      else onOpenAuth('teacher', 'teacher');
      return;
    }
    if (portal === 'parent') {
      onOpenAuth('parent', 'parent');
      return;
    }
    if (portal === 'school_admin') {
      onOpenAuth('school_admin', 'school_admin');
      return;
    }
    if (portal === 'institute_admin') {
      onOpenAuth('institute_admin', 'institute_admin');
    }
  };

  const handleInstallClick = async () => {
    if (isPrompting) return;

    if (isInstallable) {
      setIsPrompting(true);
      try {
        const outcome = await install();
        if (outcome === 'unavailable') {
          setShowInstructionsModal(true);
        }
      } finally {
        setIsPrompting(false);
      }
      return;
    }

    setShowInstructionsModal(true);
  };

  return (
    <section
      aria-label="MyStudyZone Interactive Homepage Banner"
      className="relative w-full bg-[#041028] text-white flex flex-col items-center justify-center overflow-x-hidden select-none"
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
      }}
    >
      {/* =====================================================================================
          EXACT NEW HOMEPAGE BANNER WITH REAL CLICKABLE BUTTON HOTSPOTS
          - Uses /assets/aistudio/file_0000000069408208925cb4996617fdc1_eb497db6.png untouched
            so 100% of the visual beauty of the uploaded banner is preserved without any extra
            text, icons, or altered styling.
          - Maps exact real clickable buttons over every interactive element in the banner:
            1. Smart Learning for a Brighter Future pill
            2. All 5 Portal Cards (Students, Teachers, Parents, Colleges, Institutes)
            3. Individual Login & Register buttons inside each of the 5 Portal Cards
            4. All 5 Feature Highlights in the dark feature bar (100+ AI Tools, Complete Study
               Material Library, PDF/Word/Excel, Safe & Secure, Works on All Devices)
            5. MyStudyZone Mobile App (Direct Install) banner & "+ INSTALL APP" button
      ===================================================================================== */}
      <div
        data-testid="homepage-hero-banner-section"
        className="relative w-full max-w-[1920px] mx-auto overflow-hidden shadow-2xl"
      >
        <div className="relative w-full aspect-[16/9]">
          <img
            src="/assets/aistudio/file_0000000069408208925cb4996617fdc1_eb497db6.png"
            alt="MyStudyZone — Your Complete Learning & Productivity Platform"
            className="w-full h-full object-contain block select-none pointer-events-none"
          />

          {/* 1. Smart Learning for a Brighter Future Yellow Pill Hotspot */}
          <button
            type="button"
            onClick={() => (onOpenDemo ? onOpenDemo('overview') : onNavigateTab('demo'))}
            aria-label="Smart Learning for a Brighter Future — Interactive Demo"
            title="Smart Learning for a Brighter Future"
            style={{
              left: '33%',
              top: '27.3%',
              width: '34%',
              height: '6.9%',
            }}
            className="absolute z-20 rounded-full bg-transparent hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
          />

          {/* 2. Five Portal Cards + Individual Login & Register Button Hotspots */}
          {PORTAL_HOTSPOTS.map((portal) => (
            <div
              key={portal.id}
              style={{
                left: `${portal.leftPct}%`,
                top: '36.3%',
                width: `${portal.widthPct}%`,
                height: '22.3%',
              }}
              className="absolute z-20 rounded-2xl sm:rounded-3xl"
            >
              {/* Main Upper Card Body Hotspot (Opens Portal Landing / Workspace) */}
              <button
                type="button"
                onClick={() => openPortalDestination(portal.role)}
                aria-label={`Open ${portal.title} Portal`}
                title={`Open ${portal.title} Portal`}
                style={{
                  left: '0%',
                  top: '0%',
                  width: '100%',
                  height: '72%',
                }}
                className="absolute rounded-t-2xl sm:rounded-t-3xl bg-transparent hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white cursor-pointer transition-colors"
              />

              {/* Login Button Hotspot inside Portal Card */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAuth(portal.loginTab, portal.role);
                }}
                aria-label={`${portal.title} Login`}
                title={`${portal.title} Login`}
                style={{
                  left: '6%',
                  top: '72%',
                  width: '42%',
                  height: '23%',
                }}
                className="absolute rounded-full bg-transparent hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
              />

              {/* Register Button Hotspot inside Portal Card */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenAuth('register', portal.role);
                }}
                aria-label={`${portal.title} Register`}
                title={`${portal.title} Register`}
                style={{
                  left: '50%',
                  top: '72%',
                  width: '44%',
                  height: '23%',
                }}
                className="absolute rounded-full bg-transparent hover:bg-amber-300/20 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
              />
            </div>
          ))}

          {/* 3. Five Platform Feature Bar Hotspots */}
          {/* 3A: 100+ AI Tools & Generators */}
          <button
            type="button"
            onClick={() => onNavigateTab('ai-tools')}
            aria-label="100+ AI Tools & Generators"
            title="Open 100+ AI Tools & Generators"
            style={{
              left: '4.2%',
              top: '60.8%',
              width: '18.3%',
              height: '10.6%',
            }}
            className="absolute z-20 rounded-l-full bg-transparent hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
          />

          {/* 3B: Complete Study Material Library */}
          <button
            type="button"
            onClick={() => onNavigateTab('study-materials')}
            aria-label="Complete Study Material Library"
            title="Open Complete Study Material Library"
            style={{
              left: '22.6%',
              top: '60.8%',
              width: '17.6%',
              height: '10.6%',
            }}
            className="absolute z-20 bg-transparent hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
          />

          {/* 3C: PDF, Word, Excel & More Formats */}
          <button
            type="button"
            onClick={() => onNavigateTab('document-studio')}
            aria-label="PDF, Word, Excel & More Formats"
            title="Open PDF, Word, Excel Document Studio"
            style={{
              left: '40.3%',
              top: '60.8%',
              width: '18.2%',
              height: '10.6%',
            }}
            className="absolute z-20 bg-transparent hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
          />

          {/* 3D: Safe & Secure for Everyone */}
          <button
            type="button"
            onClick={() => onOpenAuth('login', 'student')}
            aria-label="Safe & Secure for Everyone"
            title="Safe & Secure Portal Sign In"
            style={{
              left: '58.6%',
              top: '60.8%',
              width: '16.5%',
              height: '10.6%',
            }}
            className="absolute z-20 bg-transparent hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
          />

          {/* 3E: Works on All Devices (Web, Mobile, TV) */}
          <button
            type="button"
            onClick={() => onNavigateTab('all-courses')}
            aria-label="Works on All Devices (Web, Mobile, TV)"
            title="Explore All Courses Across Web, Mobile & Smart TV"
            style={{
              left: '75.2%',
              top: '60.8%',
              width: '20.6%',
              height: '10.6%',
            }}
            className="absolute z-20 rounded-r-full bg-transparent hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer transition-colors"
          />

          {/* 4. MyStudyZone Mobile App (Direct Install) Bar & "+ INSTALL APP" Button Hotspot */}
          <button
            type="button"
            onClick={() => void handleInstallClick()}
            disabled={isPrompting}
            data-testid="pwa-install-card-banner"
            aria-label="MyStudyZone Mobile App (Direct Install) — Install App"
            title="Install MyStudyZone App Directly to Your Home Screen"
            style={{
              left: '4.2%',
              top: '73.2%',
              width: '91.6%',
              height: '13.2%',
            }}
            className="absolute z-20 rounded-full bg-transparent hover:bg-amber-400/10 focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer transition-colors"
          />

          {/* Dedicated high-priority "+ INSTALL APP" blue pill button target inside the install bar */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              void handleInstallClick();
            }}
            disabled={isPrompting}
            data-testid="pwa-install-btn-banner"
            aria-label="INSTALL APP"
            title="Install MyStudyZone App"
            style={{
              left: '68.8%',
              top: '75.3%',
              width: '22.8%',
              height: '9.2%',
            }}
            className="absolute z-30 rounded-full bg-transparent hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white cursor-pointer transition-colors"
          />
        </div>
      </div>

      {/* PWA Installation Fallback Instructions Modal */}
      {showInstructionsModal &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[2px]"
            role="dialog"
            aria-modal="true"
            aria-label="Install MyStudyZone App Instructions"
          >
            <div className="w-full max-w-md bg-white rounded-3xl border-2 border-amber-200 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[#0f2952] to-[#1e3a8a] text-white px-5 py-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src="/pwa-192x192.png"
                    alt="MyStudyZone Icon"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-10 h-10 rounded-xl bg-white p-0.5 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display font-black text-base truncate">
                      Install MyStudyZone App
                    </h3>
                    <p className="text-[11px] text-sky-100 font-medium">
                      Add directly to your Home Screen
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInstructionsModal(false)}
                  aria-label="Close installation guide"
                  className="p-1.5 rounded-xl text-sky-100 hover:text-white hover:bg-white/15 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-5 space-y-4 text-sm text-slate-700">
                {isIOS ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-sky-50 border border-sky-200 p-3.5 space-y-1.5">
                      <p className="font-extrabold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                        <Smartphone className="w-4 h-4" />
                        <span>iPhone / iPad (Safari Instructions)</span>
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Follow these 3 quick steps in <strong>Safari</strong> to add MyStudyZone to your Home Screen:
                      </p>
                    </div>

                    {!isIOSSafari && (
                      <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs font-semibold text-amber-950">
                        Open <strong>https://mystudyzone.in</strong> in <strong>Safari</strong> first for the &ldquo;Add to Home Screen&rdquo; option.
                      </div>
                    )}

                    <ol className="space-y-2.5 text-xs font-medium text-slate-800">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                          1
                        </span>
                        <span>
                          Tap the <strong className="inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 text-sky-700" /> Share</strong> button on the Safari toolbar.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                          2
                        </span>
                        <span>
                          Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                          3
                        </span>
                        <span>
                          Tap <strong>&ldquo;Add&rdquo;</strong> in the top-right corner.
                        </span>
                      </li>
                    </ol>
                  </div>
                ) : isInAppBrowser ? (
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-amber-50 border border-amber-300 p-3.5 text-xs text-amber-950 space-y-1.5">
                      <p className="font-black flex items-center gap-1.5">
                        <ExternalLink className="w-4 h-4 text-amber-700" />
                        <span>In-App Browser Detected</span>
                      </p>
                      <p className="leading-relaxed">
                        You opened MyStudyZone inside an in-app browser, which blocks automatic app installation.
                      </p>
                    </div>
                    <ol className="space-y-2 text-xs font-medium text-slate-800">
                      <li>1. Tap the <strong>⋮ Menu</strong> button at the top-right corner.</li>
                      <li>2. Choose <strong>&ldquo;Open in Chrome&rdquo;</strong> (or Open in Browser).</li>
                      <li>3. Tap <strong>+ INSTALL APP</strong> in Chrome for one-tap installation!</li>
                    </ol>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-sky-50 border border-sky-200 p-3.5 space-y-1.5">
                      <p className="font-extrabold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                        <Download className="w-4 h-4" />
                        <span>
                          {isAndroid ? 'Android Browser Installation' : 'Browser Menu Installation'}
                        </span>
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        Install MyStudyZone directly onto your phone or computer from the browser menu:
                      </p>
                    </div>

                    <ol className="space-y-2.5 text-xs font-medium text-slate-800">
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                          1
                        </span>
                        <span>
                          Tap the browser <strong className="inline-flex items-center gap-0.5"><MoreVertical className="w-3.5 h-3.5" /> Menu (3 dots)</strong> at the top-right corner.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                          2
                        </span>
                        <span>
                          Tap <strong>&ldquo;Install app&rdquo;</strong> or <strong>&ldquo;Add to Home screen&rdquo;</strong>.
                        </span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                          3
                        </span>
                        <span>
                          Confirm by tapping <strong>Install / Add</strong>. No Play Store required!
                        </span>
                      </li>
                    </ol>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setShowInstructionsModal(false)}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer transition-colors"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
