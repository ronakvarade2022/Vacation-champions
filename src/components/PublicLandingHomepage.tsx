import React from 'react';
import {
  Home,
  Info,
  Star,
  Trophy,
  HelpCircle,
  User,
  Edit3,
  ArrowRight,
  LogIn,
  UserPlus,
} from 'lucide-react';
import { AuthModalTab, PortalRegisterRole } from './AuthModal';

export interface PublicLandingHomepageProps {
  onOpenPortal: (role: PortalRegisterRole) => void;
  onNavigateTab: (tab: string, subSection?: string) => void;
  onOpenAuth: (defaultTab: AuthModalTab, registerRole?: PortalRegisterRole) => void;
  onOpenFeaturePage?: (featureKey: string) => void;
  isAuthenticated?: boolean;
  currentUserName?: string;
  onOpenMyDashboard?: () => void;
}

const PORTALS: Array<{
  id: PortalRegisterRole;
  title: string;
  subtitle: string;
  description: string;
  loginTab: AuthModalTab;
  cardBg: string;
  borderGlow: string;
  arrowTextColor: string;
  loginBtnClass: string;
  registerBtnClass: string;
  illustration: 'student' | 'teacher' | 'parent' | 'college' | 'institute';
}> = [
  {
    id: 'student',
    title: 'Student Portal',
    subtitle: 'Study • Practice • Grow',
    description: 'Classes 1–10 study notes, worksheets, quizzes & dictionary',
    loginTab: 'login',
    cardBg: 'from-[#38bdf8] via-[#0284c7] to-[#1e3a8a]',
    borderGlow: 'border-sky-300/90 shadow-[0_12px_28px_rgba(2,132,199,0.28)]',
    arrowTextColor: 'text-[#0284c7]',
    loginBtnClass: 'bg-[#0c4a6e]/90 hover:bg-[#082f49] text-white border border-sky-300/60',
    registerBtnClass: 'bg-white hover:bg-sky-50 text-[#0369a1] shadow-sm',
    illustration: 'student',
  },
  {
    id: 'teacher',
    title: 'Teacher Portal',
    subtitle: 'Plan • Teach • Assess',
    description: 'Lesson planners, exam paper generator & classroom tools',
    loginTab: 'teacher',
    cardBg: 'from-[#a3e635] via-[#16a34a] to-[#14532d]',
    borderGlow: 'border-lime-300/90 shadow-[0_12px_28px_rgba(22,163,74,0.28)]',
    arrowTextColor: 'text-[#15803d]',
    loginBtnClass: 'bg-[#14532d]/90 hover:bg-[#052e16] text-white border border-lime-300/60',
    registerBtnClass: 'bg-white hover:bg-emerald-50 text-[#15803d] shadow-sm',
    illustration: 'teacher',
  },
  {
    id: 'parent',
    title: 'Parent Portal',
    subtitle: 'Monitor • Support • Encourage',
    description: 'Track child progress, test scores & daily study activity',
    loginTab: 'parent',
    cardBg: 'from-[#f472b6] via-[#c026d3] to-[#701a75]',
    borderGlow: 'border-fuchsia-300/90 shadow-[0_12px_28px_rgba(192,38,211,0.28)]',
    arrowTextColor: 'text-[#a21caf]',
    loginBtnClass: 'bg-[#701a75]/90 hover:bg-[#4a044e] text-white border border-fuchsia-300/60',
    registerBtnClass: 'bg-white hover:bg-fuchsia-50 text-[#a21caf] shadow-sm',
    illustration: 'parent',
  },
  {
    id: 'school_admin',
    title: 'College Portal',
    subtitle: 'Manage • Track • Excel',
    description: 'Academic batches, faculty allocation & institutional reports',
    loginTab: 'school_admin',
    cardBg: 'from-[#facc15] via-[#ea580c] to-[#9a3412]',
    borderGlow: 'border-amber-300/90 shadow-[0_12px_28px_rgba(234,88,12,0.28)]',
    arrowTextColor: 'text-[#c2410c]',
    loginBtnClass: 'bg-[#7c2d12]/90 hover:bg-[#431407] text-white border border-amber-300/60',
    registerBtnClass: 'bg-white hover:bg-amber-50 text-[#c2410c] shadow-sm',
    illustration: 'college',
  },
  {
    id: 'institute_admin',
    title: 'Institute Portal',
    subtitle: 'Organize • Guide • Excel',
    description: 'Coaching batches, mock test series & performance tracking',
    loginTab: 'institute_admin',
    cardBg: 'from-[#2dd4bf] via-[#0d9488] to-[#115e59]',
    borderGlow: 'border-teal-300/90 shadow-[0_12px_28px_rgba(13,148,136,0.28)]',
    arrowTextColor: 'text-[#0f766e]',
    loginBtnClass: 'bg-[#134e4a]/90 hover:bg-[#042f2e] text-white border border-teal-300/60',
    registerBtnClass: 'bg-white hover:bg-teal-50 text-[#0f766e] shadow-sm',
    illustration: 'institute',
  },
];

function PortalIllustration({ type }: { type: 'student' | 'teacher' | 'parent' | 'college' | 'institute' }) {
  if (type === 'student') {
    return (
      <svg viewBox="0 0 200 140" className="w-full h-28 sm:h-32 xl:h-36 drop-shadow-md mx-auto">
        <defs>
          <radialGradient id="stuGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="75" r="56" fill="url(#stuGlow)" />
        {/* Floating small grad cap */}
        <g transform="translate(18, 42) rotate(-14)">
          <polygon points="22,6 42,14 22,22 2,14" fill="#1e3a8a" />
          <rect x="13" y="18" width="18" height="8" rx="2" fill="#1d4ed8" />
          <path d="M36 16 L39 27" stroke="#facc15" strokeWidth="2" />
          <circle cx="39" cy="27" r="2.2" fill="#facc15" />
        </g>
        {/* Student Avatar */}
        <path d="M56 135 C56 104 144 104 144 135 Z" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="2" />
        <path d="M88 106 L100 124 L112 106 Z" fill="#1d4ed8" />
        <path d="M96 112 L100 130 L104 112 Z" fill="#ef4444" />
        <rect x="91" y="90" width="18" height="18" rx="6" fill="#fdba74" />
        <circle cx="100" cy="68" r="24" fill="#fed7aa" />
        <path d="M76 62 C76 42 124 42 124 62 C120 53 80 53 76 62 Z" fill="#1e293b" />
        <circle cx="91" cy="67" r="3" fill="#0f172a" />
        <circle cx="109" cy="67" r="3" fill="#0f172a" />
        <circle cx="92" cy="66" r="1" fill="#ffffff" />
        <circle cx="110" cy="66" r="1" fill="#ffffff" />
        <path d="M92 77 Q100 84 108 77" stroke="#c2410c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Main Graduation Cap */}
        <polygon points="100,24 142,39 100,53 58,39" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <rect x="81" y="47" width="38" height="10" rx="4" fill="#1e293b" />
        <path d="M132 42 L137 61" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="137" cy="62" r="3.5" fill="#facc15" />
        {/* Open Book in front */}
        <g transform="translate(115, 92) rotate(-8)">
          <path d="M0 24 Q20 18 38 26 L38 6 Q20 -2 0 4 Z" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
          <path d="M38 26 Q56 18 74 24 L74 4 Q56 -2 38 6 Z" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (type === 'teacher') {
    return (
      <svg viewBox="0 0 200 140" className="w-full h-28 sm:h-32 xl:h-36 drop-shadow-md mx-auto">
        <defs>
          <radialGradient id="teaGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#84cc16" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="75" r="56" fill="url(#teaGlow)" />
        {/* Teacher Avatar */}
        <path d="M55 135 C55 102 145 102 145 135 Z" fill="#475569" />
        <path d="M84 103 L100 130 L116 103 Z" fill="#ffffff" />
        <rect x="92" y="88" width="16" height="17" rx="6" fill="#fdba74" />
        {/* Hair behind */}
        <path d="M70 68 C66 92 75 106 84 108 L116 108 C125 106 134 92 130 68 Z" fill="#27272a" />
        <circle cx="100" cy="65" r="23" fill="#fed7aa" />
        {/* Hair front */}
        <path d="M76 62 C78 39 124 39 124 62 C115 49 86 49 76 62 Z" fill="#18181b" />
        {/* Glasses */}
        <rect x="82" y="59" width="15" height="10" rx="3" fill="none" stroke="#1e293b" strokeWidth="2.2" />
        <rect x="103" y="59" width="15" height="10" rx="3" fill="none" stroke="#1e293b" strokeWidth="2.2" />
        <line x1="97" y1="64" x2="103" y2="64" stroke="#1e293b" strokeWidth="2.2" />
        <circle cx="89.5" cy="64" r="2.2" fill="#0f172a" />
        <circle cx="110.5" cy="64" r="2.2" fill="#0f172a" />
        <path d="M93 76 Q100 82 107 76" stroke="#be123c" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Pointer Stick */}
        <line x1="134" y1="98" x2="164" y2="54" stroke="#b45309" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="133" cy="100" r="6" fill="#fed7aa" />
        {/* Blue Notebook held */}
        <rect x="58" y="102" width="36" height="28" rx="4" transform="rotate(-12 58 102)" fill="#2563eb" stroke="#93c5fd" strokeWidth="1.5" />
      </svg>
    );
  }

  if (type === 'parent') {
    return (
      <svg viewBox="0 0 200 140" className="w-full h-28 sm:h-32 xl:h-36 drop-shadow-md mx-auto">
        <defs>
          <radialGradient id="parGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#e879f9" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="75" r="58" fill="url(#parGlow)" />
        {/* Father (Left) */}
        <path d="M36 135 C36 102 104 102 104 135 Z" fill="#38bdf8" />
        <circle cx="72" cy="58" r="20" fill="#fdba74" />
        <path d="M52 53 C52 35 92 35 92 53 C86 43 58 43 52 53 Z" fill="#0f172a" />
        <circle cx="66" cy="58" r="2.3" fill="#0f172a" />
        <circle cx="79" cy="58" r="2.3" fill="#0f172a" />
        <path d="M66 67 Q72 72 79 67" stroke="#9a3412" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Mother (Right) */}
        <path d="M100 135 C100 104 164 104 164 135 Z" fill="#facc15" />
        <path d="M111 62 C108 86 114 104 122 108 L146 108 C154 104 158 86 154 62 Z" fill="#18181b" />
        <circle cx="132" cy="62" r="19" fill="#fed7aa" />
        <path d="M113 58 C115 39 151 39 151 58 C143 48 121 48 113 58 Z" fill="#0f172a" />
        <circle cx="126" cy="62" r="2.2" fill="#0f172a" />
        <circle cx="138" cy="62" r="2.2" fill="#0f172a" />
        <circle cx="132" cy="56" r="1.5" fill="#dc2626" />
        <path d="M126 70 Q132 75 138 70" stroke="#be123c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {/* Child (Center Front) */}
        <path d="M68 138 C68 112 132 112 132 138 Z" fill="#fde047" />
        <path d="M82 90 C80 108 84 118 90 120 L110 120 C116 118 120 108 118 90 Z" fill="#1e293b" />
        <circle cx="100" cy="88" r="17" fill="#fed7aa" />
        <path d="M83 84 C85 69 115 69 117 84 C110 76 90 76 83 84 Z" fill="#0f172a" />
        <circle cx="94" cy="88" r="2.2" fill="#0f172a" />
        <circle cx="106" cy="88" r="2.2" fill="#0f172a" />
        <path d="M94 96 Q100 101 106 96" stroke="#be123c" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === 'college') {
    return (
      <svg viewBox="0 0 200 140" className="w-full h-28 sm:h-32 xl:h-36 drop-shadow-md mx-auto">
        <defs>
          <radialGradient id="colGlow" cx="50%" cy="55%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="75" r="56" fill="url(#colGlow)" />
        {/* Graduate Gown */}
        <path d="M52 135 C52 100 148 100 148 135 Z" fill="#0f172a" />
        <path d="M84 102 L100 132 L116 102" fill="none" stroke="#f97316" strokeWidth="5" />
        <path d="M90 102 L100 122 L110 102 Z" fill="#ffffff" />
        <path d="M97 108 L100 124 L103 108 Z" fill="#dc2626" />
        <rect x="91" y="87" width="18" height="17" rx="6" fill="#fdba74" />
        <circle cx="100" cy="65" r="23" fill="#fed7aa" />
        <path d="M77 58 C78 40 122 40 123 58 C115 48 85 48 77 58 Z" fill="#1e293b" />
        <circle cx="92" cy="65" r="2.5" fill="#0f172a" />
        <circle cx="108" cy="65" r="2.5" fill="#0f172a" />
        <path d="M93 75 Q100 81 107 75" stroke="#9a3412" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Graduation Cap */}
        <polygon points="100,22 144,36 100,50 56,36" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
        <rect x="81" y="44" width="38" height="10" rx="4" fill="#27272a" />
        <path d="M68 40 L64 62" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="64" cy="63" r="3" fill="#facc15" />
        {/* Rolled Diploma Scroll */}
        <g transform="translate(120, 96) rotate(-28)">
          <rect x="0" y="0" width="38" height="11" rx="5" fill="#fef9c3" stroke="#eab308" strokeWidth="1.5" />
          <rect x="15" y="-1" width="7" height="13" rx="2" fill="#ef4444" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 200 140" className="w-full h-28 sm:h-32 xl:h-36 drop-shadow-md mx-auto">
      <defs>
        <radialGradient id="insGlow" cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="75" r="58" fill="url(#insGlow)" />
      {/* Base Ground */}
      <ellipse cx="100" cy="126" rx="76" ry="8" fill="#15803d" />
      <ellipse cx="100" cy="124" rx="70" ry="6" fill="#22c55e" />
      {/* Left & Right Wings */}
      <rect x="34" y="68" width="34" height="54" rx="2" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
      <polygon points="30,68 51,52 72,68" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
      <rect x="132" y="68" width="34" height="54" rx="2" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
      <polygon points="128,68 149,52 170,68" fill="#0284c7" stroke="#0369a1" strokeWidth="1.5" />
      {/* Side Windows */}
      {[40, 54].map((x) =>
        [76, 92, 106].map((y) => (
          <rect key={`lw-${x}-${y}`} x={x} y={y} width="8" height="10" rx="1" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
        ))
      )}
      {[138, 152].map((x) =>
        [76, 92, 106].map((y) => (
          <rect key={`rw-${x}-${y}`} x={x} y={y} width="8" height="10" rx="1" fill="#38bdf8" stroke="#ffffff" strokeWidth="1" />
        ))
      )}
      {/* Center Classical Building */}
      <rect x="64" y="54" width="72" height="68" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.8" />
      {/* Pillars */}
      <rect x="70" y="62" width="7" height="56" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="84" y="62" width="7" height="56" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="109" y="62" width="7" height="56" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <rect x="123" y="62" width="7" height="56" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      {/* Pediment Roof */}
      <polygon points="58,55 100,28 142,55" fill="#0284c7" stroke="#0369a1" strokeWidth="2" />
      <polygon points="66,52 100,33 134,52" fill="#fef3c7" />
      <circle cx="100" cy="44" r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
      {/* Entrance Arch */}
      <path d="M93 122 L93 98 A7 7 0 0 1 107 98 L107 122 Z" fill="#7c2d12" />
      {/* Trees */}
      <circle cx="28" cy="114" r="10" fill="#16a34a" />
      <circle cx="172" cy="114" r="10" fill="#16a34a" />
    </svg>
  );
}

function FeatureQuickIcon({ type }: { type: 'dictionary' | 'worksheets' | 'notes' | 'videos' | 'exams' | 'tools' }) {
  if (type === 'dictionary') {
    return (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12 shrink-0">
        <path d="M8 16 Q20 11 32 17 L32 51 Q20 45 8 50 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2.5" />
        <path d="M32 17 Q44 11 56 16 L56 50 Q44 45 32 51 Z" fill="#eff6ff" stroke="#0284c7" strokeWidth="2.5" />
        <line x1="13" y1="24" x2="26" y2="22" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="13" y1="31" x2="26" y2="29" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="13" y1="38" x2="24" y2="36" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="22" x2="50" y2="24" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="29" x2="50" y2="31" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="38" y1="36" x2="48" y2="38" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === 'worksheets') {
    return (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12 shrink-0">
        <rect x="10" y="8" width="36" height="46" rx="5" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
        <line x1="17" y1="19" x2="38" y2="19" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="17" y1="28" x2="38" y2="28" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="17" y1="37" x2="31" y2="37" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" />
        <g transform="translate(36, 28) rotate(32)">
          <rect x="0" y="0" width="9" height="26" rx="2" fill="#facc15" stroke="#ca8a04" strokeWidth="2" />
          <polygon points="0,26 4.5,34 9,26" fill="#fed7aa" stroke="#ca8a04" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }
  if (type === 'notes') {
    return (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12 shrink-0">
        <path d="M10 42 L32 51 L54 42 L32 33 Z" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
        <path d="M10 33 L32 42 L54 33 L32 24 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
        <path d="M10 24 L32 33 L54 24 L32 15 Z" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
        <circle cx="32" cy="23" r="4" fill="#fef08a" />
      </svg>
    );
  }
  if (type === 'videos') {
    return (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12 shrink-0">
        <rect x="8" y="18" width="48" height="36" rx="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2.5" />
        <path d="M8 18 L56 18 L53 10 L11 10 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <polygon points="27,28 27,44 41,36" fill="#ffffff" />
      </svg>
    );
  }
  if (type === 'exams') {
    return (
      <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12 shrink-0">
        <rect x="12" y="10" width="38" height="46" rx="5" fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
        <rect x="22" y="6" width="18" height="8" rx="3" fill="#38bdf8" stroke="#0284c7" strokeWidth="2" />
        <path d="M18 25 L22 29 L29 21" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <line x1="33" y1="25" x2="43" y2="25" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M18 39 L22 43 L29 35" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" />
        <line x1="33" y1="39" x2="43" y2="39" stroke="#64748b" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="w-11 h-11 sm:w-12 sm:h-12 shrink-0">
      <rect x="13" y="8" width="38" height="48" rx="6" fill="#334155" stroke="#0f172a" strokeWidth="2.5" />
      <rect x="19" y="14" width="26" height="10" rx="2" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
      {[29, 38, 47].map((y, rIdx) =>
        [20, 29, 38].map((x, cIdx) => (
          <rect
            key={`${rIdx}-${cIdx}`}
            x={x}
            y={y}
            width="7"
            height="6"
            rx="1.5"
            fill={cIdx === 2 ? '#fb923c' : '#e2e8f0'}
          />
        ))
      )}
    </svg>
  );
}

export function PublicLandingHomepage({
  onOpenPortal,
  onNavigateTab,
  onOpenAuth,
  onOpenFeaturePage,
  isAuthenticated,
  onOpenMyDashboard,
}: PublicLandingHomepageProps) {
  const triggerFeature = (featureKey: string, fallbackTab: string, subSection?: string) => {
    if (onOpenFeaturePage) {
      onOpenFeaturePage(featureKey);
    } else {
      onNavigateTab(fallbackTab, subSection);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#bae6fd] via-[#eff6ff] to-[#d9f99d] text-slate-900 font-sans overflow-x-hidden select-none flex flex-col justify-between">
      {/* MAIN CONTAINER */}
      <div className="w-full max-w-[1680px] mx-auto px-3 sm:px-6 lg:px-8 pt-2.5 sm:pt-3.5 pb-3 flex-1 flex flex-col justify-between gap-3 sm:gap-4 lg:gap-5">
        {/* 1. HEADER NAVIGATION */}
        <header className="w-full bg-white/95 backdrop-blur-md rounded-2xl border-2 border-sky-200/90 shadow-[0_8px_28px_rgba(2,132,199,0.14)] px-3 sm:px-6 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-2.5">
          {/* Official Brand Logo + Tagline */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-sky-50 via-white to-amber-50 border border-sky-200 shadow-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 80 72" className="w-10 h-10 sm:w-12 sm:h-12">
                <circle cx="28" cy="12" r="3" fill="#f59e0b" />
                <circle cx="40" cy="9" r="3.5" fill="#ec4899" />
                <circle cx="52" cy="12" r="3" fill="#3b82f6" />
                <circle cx="40" cy="24" r="6" fill="#d946ef" />
                <path d="M26 22 Q40 34 54 22 Q46 36 40 44 Q34 36 26 22 Z" fill="#a21caf" />
                <path d="M10 32 Q25 26 40 36 L40 58 Q25 48 10 54 Z" fill="#facc15" stroke="#1e3a8a" strokeWidth="2.5" />
                <path d="M40 36 Q55 26 70 32 L70 54 Q55 48 40 58 Z" fill="#38bdf8" stroke="#1e3a8a" strokeWidth="2.5" />
                <path d="M8 56 Q24 50 40 60 Q56 50 72 56" stroke="#1e3a8a" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-none flex items-center">
                <span className="text-[#1e3a8a]">MyStudy</span>
                <span className="bg-gradient-to-r from-[#c026d3] to-[#db2777] bg-clip-text text-transparent">Zone</span>
              </div>
              <p className="text-[11px] sm:text-xs lg:text-sm font-extrabold text-[#1e3a8a] tracking-wide mt-0.5 italic">
                Learn • Practice • Excel
              </p>
            </div>
          </button>

          {/* Center Navigation Pill Buttons */}
          <nav className="hidden md:flex items-center bg-sky-50/90 border border-sky-200/80 rounded-2xl p-1.5 gap-1 lg:gap-2">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 px-3.5 lg:px-5 py-2 rounded-xl bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] text-white font-extrabold text-xs lg:text-sm shadow-md cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <div className="h-6 w-px bg-sky-200" />
            <button
              type="button"
              onClick={() => onNavigateTab('about')}
              className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-xl hover:bg-sky-100 text-[#0f172a] font-extrabold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              <Info className="w-4 h-4 text-[#1e3a8a]" />
              <span>About</span>
            </button>
            <div className="h-6 w-px bg-sky-200" />
            <button
              type="button"
              onClick={() => triggerFeature('study-notes', 'study-materials', 'chapter_notes')}
              className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-xl hover:bg-sky-100 text-[#0f172a] font-extrabold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              <Star className="w-4 h-4 text-[#1e3a8a] fill-[#1e3a8a]" />
              <span>Features</span>
            </button>
            <div className="h-6 w-px bg-sky-200" />
            <button
              type="button"
              onClick={() => onNavigateTab('certificates')}
              className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-xl hover:bg-sky-100 text-[#0f172a] font-extrabold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-[#1e3a8a]" />
              <span>Achievements</span>
            </button>
            <div className="h-6 w-px bg-sky-200" />
            <button
              type="button"
              onClick={() => onNavigateTab('help-support')}
              className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-xl hover:bg-sky-100 text-[#0f172a] font-extrabold text-xs lg:text-sm transition-colors cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-[#1e3a8a]" />
              <span>Help</span>
            </button>
          </nav>

          {/* Right Auth Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && onOpenMyDashboard ? (
              <button
                type="button"
                onClick={onOpenMyDashboard}
                className="flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-[#2563eb] to-[#1e40af] hover:from-[#1d4ed8] hover:to-[#1e3a8a] text-white font-extrabold text-xs sm:text-sm shadow-[0_4px_14px_rgba(37,99,235,0.35)] border border-sky-300/60 transition-all cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>My Dashboard</span>
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => onOpenAuth('login', 'student')}
                  className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-[#2563eb] to-[#1e40af] hover:from-[#1d4ed8] hover:to-[#1e3a8a] text-white font-extrabold text-xs sm:text-sm shadow-[0_4px_14px_rgba(37,99,235,0.35)] border border-sky-300/60 transition-all cursor-pointer"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenAuth('register', 'student')}
                  className="flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-[#ec4899] via-[#db2777] to-[#9d174d] hover:from-[#db2777] hover:to-[#831843] text-white font-extrabold text-xs sm:text-sm shadow-[0_4px_14px_rgba(219,39,119,0.35)] border border-pink-300/60 transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Register</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Quick Navigation Row */}
          <div className="flex md:hidden items-center justify-between w-full pt-1.5 border-t border-sky-100 gap-1 overflow-x-auto">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#2563eb] text-white font-bold text-xs shrink-0"
            >
              <Home className="w-3.5 h-3.5" /> Home
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('about')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-800 hover:bg-sky-100 font-bold text-xs shrink-0"
            >
              <Info className="w-3.5 h-3.5 text-[#1e3a8a]" /> About
            </button>
            <button
              type="button"
              onClick={() => triggerFeature('study-notes', 'study-materials', 'chapter_notes')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-800 hover:bg-sky-100 font-bold text-xs shrink-0"
            >
              <Star className="w-3.5 h-3.5 text-[#1e3a8a]" /> Features
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('certificates')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-800 hover:bg-sky-100 font-bold text-xs shrink-0"
            >
              <Trophy className="w-3.5 h-3.5 text-[#1e3a8a]" /> Achievements
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('help-support')}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-slate-800 hover:bg-sky-100 font-bold text-xs shrink-0"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#1e3a8a]" /> Help
            </button>
          </div>
        </header>

        {/* 2. HERO BANNER */}
        <section className="relative w-full rounded-3xl bg-gradient-to-r from-[#bae6fd] via-[#f0f9ff] to-[#e0f2fe] border-2 border-white/90 shadow-[0_12px_36px_rgba(2,132,199,0.16)] overflow-hidden px-4 sm:px-8 lg:px-12 py-5 sm:py-7 lg:py-8">
          {/* Decorative Sunburst & Clouds */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[560px] h-[560px] rounded-full bg-gradient-to-b from-amber-200/45 via-white/50 to-transparent blur-2xl pointer-events-none" />

          {/* Right School Building & Greenery Silhouette */}
          <div className="hidden lg:block absolute right-0 bottom-0 w-72 h-52 pointer-events-none opacity-95">
            <svg viewBox="0 0 260 190" className="w-full h-full">
              <path d="M0 190 Q120 155 260 170 L260 190 Z" fill="#4ade80" />
              <rect x="85" y="55" width="165" height="115" rx="4" fill="#fed7aa" stroke="#fb923c" strokeWidth="2" />
              <polygon points="75,55 168,20 255,55" fill="#f97316" />
              {[105, 140, 175, 210].map((x) =>
                [72, 105, 136].map((y) => (
                  <rect key={`sch-${x}-${y}`} x={x} y={y} width="20" height="22" rx="2" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
                ))
              )}
              <circle cx="235" cy="148" r="28" fill="#16a34a" />
              <circle cx="85" cy="156" r="22" fill="#22c55e" />
            </svg>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-5 lg:gap-6">
            {/* Left Stack of Books + Headline */}
            <div className="lg:col-span-5 flex items-center gap-3 sm:gap-5">
              {/* Books + Grad Cap stack */}
              <div className="hidden sm:block w-28 lg:w-36 shrink-0">
                <svg viewBox="0 0 140 175" className="w-full h-auto drop-shadow-md">
                  <polygon points="70,18 118,34 70,50 22,34" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
                  <rect x="46" y="43" width="48" height="14" rx="4" fill="#0f172a" />
                  <path d="M106 38 L112 62" stroke="#facc15" strokeWidth="3" />
                  <circle cx="112" cy="63" r="4" fill="#facc15" />
                  <rect x="20" y="64" width="96" height="22" rx="5" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                  <rect x="24" y="68" width="88" height="14" rx="3" fill="#fef2f2" />
                  <rect x="14" y="88" width="106" height="24" rx="5" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
                  <rect x="18" y="93" width="98" height="14" rx="3" fill="#fffbeb" />
                  <rect x="18" y="114" width="102" height="22" rx="5" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
                  <rect x="22" y="118" width="94" height="14" rx="3" fill="#f0fdf4" />
                  <rect x="10" y="138" width="114" height="26" rx="6" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2" />
                  <rect x="15" y="143" width="104" height="16" rx="3" fill="#eff6ff" />
                </svg>
              </div>

              {/* Hero Title Block */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-[#0f296b] tracking-tight leading-tight">
                  Your Complete
                </h1>
                <div className="inline-block my-1.5 px-5 sm:px-7 py-2 rounded-2xl bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#1e40af] text-white font-black text-2xl sm:text-3xl xl:text-4xl shadow-[0_8px_22px_rgba(29,78,216,0.38)] border-2 border-sky-300/80 transform -rotate-1">
                  Digital Learning
                </div>
                <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black text-[#0f296b] tracking-tight leading-tight">
                  Platform
                </h2>
                <p className="mt-1.5 text-base sm:text-xl xl:text-2xl font-black italic bg-gradient-to-r from-[#be185d] via-[#db2777] to-[#e11d48] bg-clip-text text-transparent">
                  Learn Today... Lead Tomorrow...
                </p>
                <div className="mt-2.5 w-44 sm:w-56 h-1.5 mx-auto sm:mx-0 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-transparent" />
              </div>
            </div>

            {/* Center-Right: Happy Students Group + Dream Big Achieve More */}
            <div className="lg:col-span-7 relative flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Four Happy Students Illustration */}
              <div className="w-full max-w-[540px] mx-auto">
                <svg viewBox="0 0 520 220" className="w-full h-40 sm:h-48 lg:h-52 xl:h-56 drop-shadow-lg">
                  <defs>
                    <radialGradient id="heroArch" cx="50%" cy="65%" r="55%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                      <stop offset="75%" stopColor="#fef08a" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Golden Halo Arch */}
                  <circle cx="255" cy="140" r="128" fill="url(#heroArch)" stroke="#fde047" strokeWidth="3" strokeDasharray="6 4" />

                  {/* Lightbulb Idea Icon */}
                  <g transform="translate(352, 8)">
                    <line x1="24" y1="0" x2="24" y2="7" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="4" y1="12" x2="10" y2="16" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="44" y1="12" x2="38" y2="16" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="24" cy="24" r="13" fill="#fef08a" stroke="#d97706" strokeWidth="2.5" />
                    <rect x="19" y="36" width="10" height="6" rx="2" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
                  </g>

                  {/* Student 1: Girl Pointing Up (Left) */}
                  <g transform="translate(22, 34)">
                    <path d="M55 180 C55 125 135 125 135 180 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                    <path d="M84 128 L95 165 L106 128 Z" fill="#1e3a8a" />
                    {/* Raised Pointing Arm */}
                    <path d="M62 135 L15 55 L27 49 L76 125 Z" fill="#fed7aa" />
                    <circle cx="15" cy="52" r="7" fill="#fed7aa" />
                    {/* Hair & Head */}
                    <path d="M66 78 C62 115 72 134 80 138 L112 138 C120 134 126 115 122 78 Z" fill="#18181b" />
                    <circle cx="95" cy="78" r="28" fill="#fed7aa" />
                    <path d="M67 72 C70 44 120 44 123 72 C110 56 80 56 67 72 Z" fill="#0f172a" />
                    <circle cx="86" cy="76" r="3.5" fill="#0f172a" />
                    <circle cx="104" cy="76" r="3.5" fill="#0f172a" />
                    <path d="M85 90 Q95 100 105 90 Z" fill="#be123c" />
                  </g>

                  {/* Student 2: Boy Giving Thumbs Up (Center-Left) */}
                  <g transform="translate(148, 26)">
                    <path d="M40 188 C40 130 132 130 132 188 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
                    <path d="M74 134 L86 172 L98 134 Z" fill="#1d4ed8" />
                    <circle cx="86" cy="80" r="29" fill="#fdba74" />
                    <path d="M57 72 C59 40 115 40 115 72 C104 56 68 56 57 72 Z" fill="#0f172a" />
                    <circle cx="76" cy="78" r="3.5" fill="#0f172a" />
                    <circle cx="96" cy="78" r="3.5" fill="#0f172a" />
                    <path d="M75 93 Q86 103 97 93 Z" fill="#9a3412" />
                    {/* Thumbs up hand */}
                    <circle cx="52" cy="145" r="10" fill="#fdba74" />
                    <rect x="49" y="130" width="6" height="12" rx="3" fill="#fdba74" />
                  </g>

                  {/* Student 3: Girl in Yellow Shirt Holding Blue Book (Center-Right) */}
                  <g transform="translate(262, 42)">
                    <path d="M35 174 C35 122 122 122 122 174 Z" fill="#facc15" stroke="#eab308" strokeWidth="2" />
                    <path d="M50 76 C46 112 54 132 64 136 L96 136 C104 132 110 112 106 76 Z" fill="#18181b" />
                    <circle cx="78" cy="76" r="26" fill="#fed7aa" />
                    <path d="M52 70 C55 44 102 44 104 70 C93 56 64 56 52 70 Z" fill="#0f172a" />
                    <circle cx="69" cy="75" r="3.2" fill="#0f172a" />
                    <circle cx="87" cy="75" r="3.2" fill="#0f172a" />
                    <path d="M69 88 Q78 96 87 88 Z" fill="#be123c" />
                    {/* Blue Book */}
                    <rect x="52" y="124" width="52" height="44" rx="5" transform="rotate(8 52 124)" fill="#0284c7" stroke="#bae6fd" strokeWidth="2" />
                  </g>

                  {/* Student 4: Boy with Glasses (Right) */}
                  <g transform="translate(366, 44)">
                    <path d="M30 172 C30 122 118 122 118 172 Z" fill="#f87171" stroke="#dc2626" strokeWidth="2" />
                    <circle cx="74" cy="76" r="26" fill="#fed7aa" />
                    <path d="M48 70 C50 42 98 42 100 70 C89 55 59 55 48 70 Z" fill="#1e293b" />
                    <rect x="54" y="68" width="17" height="11" rx="3" fill="none" stroke="#0f172a" strokeWidth="2.4" />
                    <rect x="77" y="68" width="17" height="11" rx="3" fill="none" stroke="#0f172a" strokeWidth="2.4" />
                    <line x1="71" y1="73" x2="77" y2="73" stroke="#0f172a" strokeWidth="2.4" />
                    <circle cx="62.5" cy="73.5" r="2.5" fill="#0f172a" />
                    <circle cx="85.5" cy="73.5" r="2.5" fill="#0f172a" />
                    <path d="M65 88 Q74 96 83 88" stroke="#9a3412" strokeWidth="2.8" fill="none" strokeLinecap="round" />
                  </g>
                </svg>
              </div>

              {/* Top-Right Motivational Slogan */}
              <div className="sm:absolute sm:top-0 sm:right-2 text-center sm:text-right pointer-events-none">
                <div className="text-xl sm:text-2xl xl:text-3xl font-black italic text-[#0f296b] drop-shadow-sm transform -rotate-3">
                  Dream Big...
                </div>
                <div className="text-xl sm:text-2xl xl:text-3xl font-black italic bg-gradient-to-r from-[#be185d] to-[#e11d48] bg-clip-text text-transparent transform -rotate-3">
                  Achieve More...
                </div>
                <div className="mt-1 w-36 h-1.5 ml-auto rounded-full bg-gradient-to-r from-rose-500 via-amber-400 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* 3. FIVE MAIN PORTAL CARDS (WITH DEDICATED LOGIN & REGISTER BUTTONS ON EACH PORTAL) */}
        <section aria-label="Main Learning Portals" className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {PORTALS.map((portal) => (
              <div
                key={portal.id}
                onClick={() => onOpenPortal(portal.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenPortal(portal.id);
                  }
                }}
                className={`group relative rounded-3xl bg-gradient-to-b ${portal.cardBg} border-2 ${portal.borderGlow} p-3.5 sm:p-4 xl:p-5 text-white flex flex-col justify-between transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer overflow-hidden`}
              >
                {/* Top Gloss Highlight */}
                <div className="absolute inset-x-3 top-1.5 h-8 rounded-t-2xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />

                {/* Illustration */}
                <div className="relative z-10 w-full flex items-center justify-center">
                  <PortalIllustration type={portal.illustration} />
                </div>

                {/* Portal Title, Subtitle & Description */}
                <div className="relative z-10 mt-1 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight drop-shadow-sm">
                      {portal.title}
                    </h3>
                    <span
                      className={`w-6 h-6 rounded-full bg-white ${portal.arrowTextColor} inline-flex items-center justify-center shadow-md shrink-0 group-hover:translate-x-0.5 transition-transform`}
                    >
                      <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-extrabold text-white/95 mt-0.5 drop-shadow">
                    {portal.subtitle}
                  </p>
                  <p className="text-[11px] sm:text-xs font-medium text-white/85 mt-1 line-clamp-2">
                    {portal.description}
                  </p>
                </div>

                {/* Dedicated Portal Login & Register Buttons */}
                <div
                  className="relative z-10 mt-3 pt-2.5 border-t border-white/25 grid grid-cols-2 gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => onOpenAuth(portal.loginTab, portal.id)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${portal.loginBtnClass}`}
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    <span>Login</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('register', portal.id)}
                    className={`flex items-center justify-center gap-1 py-1.5 px-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${portal.registerBtnClass}`}
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Register</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. SIX UNIQUE FEATURE ICONS STRIP (ONE ICON PER FEATURE) */}
        <section
          aria-label="Quick Educational Features"
          className="w-full bg-white/95 backdrop-blur-md rounded-2xl border-2 border-sky-200/90 shadow-[0_8px_24px_rgba(2,132,199,0.12)] p-2.5 sm:p-3.5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
            {/* 1. Dictionary */}
            <button
              type="button"
              onClick={() => triggerFeature('dictionary', 'trilingual-dictionary')}
              className="flex items-center gap-2.5 px-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-white to-sky-50/90 hover:from-sky-50 hover:to-sky-100/90 border border-sky-200/80 shadow-sm hover:shadow transition-all text-left group cursor-pointer"
            >
              <FeatureQuickIcon type="dictionary" />
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-black text-[#0f172a] group-hover:text-[#0284c7] leading-tight truncate">
                  Dictionary
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">
                  (Eng-Mar-Hin)
                </div>
              </div>
            </button>

            {/* 2. Worksheets */}
            <button
              type="button"
              onClick={() => triggerFeature('worksheets', 'worksheets')}
              className="flex items-center gap-2.5 px-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-white to-sky-50/90 hover:from-sky-50 hover:to-sky-100/90 border border-sky-200/80 shadow-sm hover:shadow transition-all text-left group cursor-pointer"
            >
              <FeatureQuickIcon type="worksheets" />
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-black text-[#0f172a] group-hover:text-[#0284c7] leading-tight truncate">
                  Worksheets
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">
                  (Practice Sheets)
                </div>
              </div>
            </button>

            {/* 3. Study Notes */}
            <button
              type="button"
              onClick={() => triggerFeature('study-notes', 'study-materials', 'chapter_notes')}
              className="flex items-center gap-2.5 px-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-white to-sky-50/90 hover:from-sky-50 hover:to-sky-100/90 border border-sky-200/80 shadow-sm hover:shadow transition-all text-left group cursor-pointer"
            >
              <FeatureQuickIcon type="notes" />
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-black text-[#0f172a] group-hover:text-[#0284c7] leading-tight truncate">
                  Study Notes
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">
                  (Chapter Wise)
                </div>
              </div>
            </button>

            {/* 4. Video Lessons */}
            <button
              type="button"
              onClick={() => triggerFeature('video-lessons', 'study-materials', 'video_lessons')}
              className="flex items-center gap-2.5 px-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-white to-sky-50/90 hover:from-sky-50 hover:to-sky-100/90 border border-sky-200/80 shadow-sm hover:shadow transition-all text-left group cursor-pointer"
            >
              <FeatureQuickIcon type="videos" />
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-black text-[#0f172a] group-hover:text-[#0284c7] leading-tight truncate">
                  Video Lessons
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">
                  (Expert Videos)
                </div>
              </div>
            </button>

            {/* 5. Online Exams */}
            <button
              type="button"
              onClick={() => triggerFeature('online-exams', 'demo', 'live-quiz')}
              className="flex items-center gap-2.5 px-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-white to-sky-50/90 hover:from-sky-50 hover:to-sky-100/90 border border-sky-200/80 shadow-sm hover:shadow transition-all text-left group cursor-pointer"
            >
              <FeatureQuickIcon type="exams" />
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-black text-[#0f172a] group-hover:text-[#0284c7] leading-tight truncate">
                  Online Exams
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">
                  (Quiz Test)
                </div>
              </div>
            </button>

            {/* 6. Learning Tools */}
            <button
              type="button"
              onClick={() => triggerFeature('learning-tools', 'ai-tools')}
              className="flex items-center gap-2.5 px-3 py-2.5 sm:py-3 rounded-xl bg-gradient-to-b from-white to-sky-50/90 hover:from-sky-50 hover:to-sky-100/90 border border-sky-200/80 shadow-sm hover:shadow transition-all text-left group cursor-pointer"
            >
              <FeatureQuickIcon type="tools" />
              <div className="min-w-0">
                <div className="text-sm sm:text-base font-black text-[#0f172a] group-hover:text-[#0284c7] leading-tight truncate">
                  Learning Tools
                </div>
                <div className="text-[11px] sm:text-xs font-bold text-slate-600 truncate">
                  (Calculators etc.)
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* 5. BOTTOM HIGHLIGHT BAR */}
        <footer className="w-full rounded-3xl bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0f172a] border-2 border-sky-400/70 shadow-[0_10px_30px_rgba(15,23,42,0.38)] px-4 sm:px-7 py-3.5 sm:py-4 text-white">
          <div className="flex flex-col xl:flex-row items-center justify-between gap-4">
            {/* 4 Key Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 w-full xl:w-auto flex-1">
              {/* Pillar 1 */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-fuchsia-500 to-purple-700 border-2 border-pink-300 flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-xl">🚀</span>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    Smart Learning
                  </div>
                  <div className="text-xs font-bold text-sky-200">
                    Anytime, Anywhere
                  </div>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex items-center gap-3 sm:border-l sm:border-amber-400/40 sm:pl-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 border-2 border-yellow-200 flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-xl">⭐</span>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    Track Your Progress
                  </div>
                  <div className="text-xs font-bold text-sky-200">
                    &amp; Earn Rewards
                  </div>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex items-center gap-3 lg:border-l lg:border-amber-400/40 lg:pl-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 border-2 border-amber-200 flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-xl">👨‍👩‍👧</span>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    For Students,
                  </div>
                  <div className="text-xs font-bold text-sky-200">
                    Teachers &amp; Parents
                  </div>
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="flex items-center gap-3 sm:border-l sm:border-amber-400/40 sm:pl-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 border-2 border-emerald-200 flex items-center justify-center shrink-0 shadow-md">
                  <span className="text-xl">🛡️</span>
                </div>
                <div>
                  <div className="text-sm sm:text-base font-black text-white leading-tight">
                    Safe, Secure
                  </div>
                  <div className="text-xs font-bold text-sky-200">
                    &amp; Reliable
                  </div>
                </div>
              </div>
            </div>

            {/* Golden Ribbon Banner: Together for a Brighter Future */}
            <button
              type="button"
              onClick={() => onOpenPortal('student')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-b from-[#fde047] via-[#facc15] to-[#eab308] hover:from-[#fef08a] hover:to-[#ca8a04] text-[#0f296b] font-black italic text-base sm:text-lg leading-tight shadow-[0_6px_20px_rgba(250,204,21,0.45)] border-2 border-yellow-200 transform -rotate-1 hover:rotate-0 transition-transform shrink-0 cursor-pointer text-center"
            >
              <div>Together for a</div>
              <div>Brighter Future</div>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
