import React, { useState } from 'react';
import {
  Home,
  Info,
  Star,
  Trophy,
  HelpCircle,
  User,
  Edit3,
  ArrowRight,
  BookOpen,
  FileText,
  Layers,
  Clapperboard,
  ClipboardCheck,
  Calculator,
  Rocket,
  Award,
  Users,
  ShieldCheck,
  Menu,
  X,
  GraduationCap,
} from 'lucide-react';
import type { PortalRole } from '../types';
import type { AuthModalTab, PortalRegisterRole } from './AuthModal';

export interface PublicLandingHomepageProps {
  onOpenPortal: (portalRole: Exclude<PortalRole, 'admin'>) => void;
  onNavigateTab: (tab: string, subSection?: string) => void;
  onOpenAuth: (defaultTab: AuthModalTab, registerRole?: PortalRegisterRole) => void;
  isAuthenticated?: boolean;
  currentUserName?: string;
  onOpenMyDashboard?: () => void;
}

/**
 * Official MyStudyZone Open-Book + Rising Learner + Stars Logo (matches the uploaded reference image)
 */
export const MyStudyZoneOfficialLogo: React.FC<{ className?: string }> = ({
  className = 'w-12 h-12',
}) => (
  <svg viewBox="0 0 80 68" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="mszBookBlue" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1D4ED8" />
        <stop offset="100%" stopColor="#0F256E" />
      </linearGradient>
      <linearGradient id="mszPageGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FACC15" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
      <linearGradient id="mszChildGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EC4899" />
        <stop offset="50%" stopColor="#9333EA" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>

    {/* Sparkle Stars at Top */}
    <polygon
      points="40,3 42,8 47,8.5 43,12 44.2,17 40,14.2 35.8,17 37,12 33,8.5 38,8"
      fill="#F59E0B"
    />
    <polygon
      points="24,11 25.2,14 28.5,14.3 26,16.5 26.8,19.5 24,17.8 21.2,19.5 22,16.5 19.5,14.3 22.8,14"
      fill="#38BDF8"
    />
    <polygon
      points="56,11 57.2,14 60.5,14.3 58,16.5 58.8,19.5 56,17.8 53.2,19.5 54,16.5 51.5,14.3 54.8,14"
      fill="#EC4899"
    />

    {/* Rising Student Figure */}
    <circle cx="40" cy="23" r="5.5" fill="url(#mszChildGrad)" />
    <path
      d="M27 27C32 32 36 34 40 34C44 34 48 32 53 27"
      stroke="url(#mszChildGrad)"
      strokeWidth="4.5"
      strokeLinecap="round"
    />
    <path d="M40 33V48" stroke="url(#mszChildGrad)" strokeWidth="4.5" strokeLinecap="round" />

    {/* Golden Inner Pages */}
    <path
      d="M14 26C24 26 33 31 40 38C47 31 56 26 66 26V50C56 50 47 54 40 61C33 54 24 50 14 50V26Z"
      fill="url(#mszPageGold)"
    />
    {/* Royal Blue Outer Book Cover */}
    <path
      d="M8 31C20 31 31 36 40 44C49 36 60 31 72 31V55C60 55 49 59 40 66C31 59 20 55 8 55V31Z"
      fill="url(#mszBookBlue)"
    />
    {/* White Page Ribbons */}
    <path
      d="M12 52C22 52 31 56 40 63C49 56 58 52 68 52"
      stroke="#FFFFFF"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path d="M40 38V64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

/**
 * Custom High-Definition Educational Illustrations for Hero & 5 Portal Cards
 */
const HeroFourStudentsIllustration: React.FC = () => (
  <svg
    viewBox="0 0 640 310"
    fill="none"
    className="w-full h-full max-h-[300px] xl:max-h-[330px] object-contain select-none"
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="sunHalo" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FEF9C3" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#FDE047" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="schoolBuildingWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFBEB" />
        <stop offset="100%" stopColor="#FDE68A" />
      </linearGradient>
      <linearGradient id="schoolRoof" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#EA580C" />
        <stop offset="100%" stopColor="#F97316" />
      </linearGradient>
    </defs>

    {/* Golden Sunburst Arch Behind Students */}
    <circle cx="290" cy="180" r="155" fill="url(#sunHalo)" />
    <circle
      cx="290"
      cy="180"
      r="138"
      stroke="#FDE047"
      strokeWidth="3.5"
      strokeDasharray="10 6"
      opacity="0.8"
    />

    {/* Modern School Building & Campus on the Right */}
    <g transform="translate(455, 105)">
      {/* Roof */}
      <polygon points="0,35 90,2 180,35" fill="url(#schoolRoof)" />
      {/* Main Building Facade */}
      <rect x="10" y="35" width="160" height="125" rx="4" fill="url(#schoolBuildingWall)" stroke="#F59E0B" strokeWidth="2" />
      {/* Pillars & Windows */}
      {[24, 58, 92, 126].map((wx) => (
        <g key={wx}>
          <rect x={wx} y="48" width="22" height="28" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
          <rect x={wx} y="88" width="22" height="28" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
        </g>
      ))}
      {/* School Clock / Emblem */}
      <circle cx="90" cy="22" r="9" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
      <path d="M90 17V22L94 24" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
      {/* Green Lawn & Trees */}
      <ellipse cx="90" cy="162" rx="95" ry="18" fill="#22C55E" />
      <circle cx="12" cy="138" r="22" fill="#16A34A" />
      <circle cx="168" cy="135" r="24" fill="#15803D" />
    </g>

    {/* Glowing Idea Lightbulb Above Students */}
    <g transform="translate(405, 18)">
      {/* Glow rays */}
      <line x1="28" y1="0" x2="28" y2="8" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="6" y1="12" x2="13" y2="17" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="50" y1="12" x2="43" y2="17" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="2" y1="32" x2="10" y2="32" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="32" x2="46" y2="32" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="28" cy="30" r="16" fill="#FEF08A" stroke="#F59E0B" strokeWidth="3" />
      <path d="M23 34C23 28 33 28 33 34" stroke="#D97706" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="22" y="45" width="12" height="7" rx="2" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
    </g>

    {/* Student 1 (Left): Cheerful Schoolgirl Pointing Upward Towards the Future */}
    <g transform="translate(72, 62)">
      {/* Pointing Right Arm */}
      <path
        d="M36 142L4 76"
        stroke="#FDBA74"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <circle cx="2" cy="72" r="8" fill="#FDBA74" />
      <path d="M2 72L-7 54" stroke="#FDBA74" strokeWidth="7" strokeLinecap="round" />
      {/* Backpack */}
      <rect x="26" y="128" width="76" height="95" rx="18" fill="#1E40AF" />
      {/* Hair */}
      <path
        d="M32 62C28 28 54 14 78 20C100 25 110 50 104 95C102 115 96 130 88 135H36C30 120 28 90 32 62Z"
        fill="#1E1B18"
      />
      {/* Neck & Face */}
      <rect x="56" y="102" width="20" height="20" rx="6" fill="#FDBA74" />
      <circle cx="66" cy="72" r="32" fill="#FDBA74" />
      {/* Hair Bangs */}
      <path d="M35 60C44 34 78 30 96 56C82 44 54 44 35 60Z" fill="#1E1B18" />
      {/* Eyes & Big Smile */}
      <circle cx="54" cy="68" r="4.5" fill="#0F172A" />
      <circle cx="52.5" cy="66.5" r="1.5" fill="#FFFFFF" />
      <circle cx="78" cy="68" r="4.5" fill="#0F172A" />
      <circle cx="76.5" cy="66.5" r="1.5" fill="#FFFFFF" />
      <path d="M53 83Q66 96 79 83Z" fill="#991B1B" />
      <path d="M55 84H77" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      {/* White School Shirt & Tie */}
      <path d="M26 132C26 120 44 114 66 114C88 114 106 120 106 132V235H26V132Z" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2" />
      <polygon points="66,118 59,145 66,178 73,145" fill="#1E3A8A" />
      {/* Backpack Straps */}
      <path d="M36 118V200" stroke="#1E3A8A" strokeWidth="9" strokeLinecap="round" />
      <path d="M96 118V200" stroke="#1E3A8A" strokeWidth="9" strokeLinecap="round" />
    </g>

    {/* Student 2 (Center-Left): Schoolboy Giving Thumbs Up */}
    <g transform="translate(182, 54)">
      {/* Backpack */}
      <rect x="24" y="132" width="84" height="98" rx="18" fill="#DB2777" />
      {/* Neck & Face */}
      <rect x="56" y="106" width="22" height="22" rx="6" fill="#FDBA74" />
      <circle cx="67" cy="74" r="34" fill="#FDBA74" />
      {/* Boy Hair */}
      <path
        d="M32 64C30 30 56 18 82 24C102 28 110 46 102 66C92 48 52 46 32 64Z"
        fill="#1E1B18"
      />
      {/* Eyes & Smile */}
      <circle cx="54" cy="70" r="4.5" fill="#0F172A" />
      <circle cx="52.5" cy="68.5" r="1.5" fill="#FFFFFF" />
      <circle cx="80" cy="70" r="4.5" fill="#0F172A" />
      <circle cx="78.5" cy="68.5" r="1.5" fill="#FFFFFF" />
      <path d="M53 86Q67 99 81 86Z" fill="#991B1B" />
      <path d="M55 87H79" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      {/* Blue School Shirt & Tie */}
      <path d="M24 136C24 122 44 116 67 116C90 116 110 122 110 136V242H24V136Z" fill="#3B82F6" />
      <polygon points="52,116 67,134 82,116" fill="#FFFFFF" />
      <polygon points="67,128 60,162 67,194 74,162" fill="#1E3A8A" />
      {/* Thumbs Up Hand */}
      <g transform="translate(8, 152)">
        <rect x="6" y="16" width="22" height="22" rx="8" fill="#FDBA74" stroke="#EA580C" strokeWidth="1" />
        <rect x="12" y="2" width="9" height="17" rx="4.5" fill="#FDBA74" stroke="#EA580C" strokeWidth="1" />
      </g>
    </g>

    {/* Student 3 (Center-Right): Younger Girl in Yellow Shirt Holding Blue Textbook */}
    <g transform="translate(288, 78)">
      {/* Long Hair */}
      <path
        d="M28 58C26 26 50 14 74 20C96 25 104 52 98 112H24C20 86 24 72 28 58Z"
        fill="#27170E"
      />
      <rect x="52" y="96" width="18" height="18" rx="5" fill="#FDBA74" />
      <circle cx="61" cy="68" r="30" fill="#FDBA74" />
      <path d="M32 56C42 34 74 32 90 54C76 44 48 44 32 56Z" fill="#27170E" />
      {/* Eyes & Smile */}
      <circle cx="49" cy="65" r="4.2" fill="#0F172A" />
      <circle cx="47.5" cy="63.5" r="1.4" fill="#FFFFFF" />
      <circle cx="73" cy="65" r="4.2" fill="#0F172A" />
      <circle cx="71.5" cy="63.5" r="1.4" fill="#FFFFFF" />
      <path d="M49 79Q61 91 73 79Z" fill="#991B1B" />
      <path d="M51 80H71" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bright Yellow Polo Shirt */}
      <path d="M22 124C22 112 40 106 61 106C82 106 100 112 100 124V222H22V124Z" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
      {/* Blue Study Book Held in Hands */}
      <g transform="translate(28, 138)">
        <rect x="0" y="0" width="58" height="72" rx="7" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2.5" />
        <rect x="8" y="10" width="42" height="16" rx="3" fill="#38BDF8" />
        <line x1="12" y1="36" x2="46" y2="36" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
        <line x1="12" y1="46" x2="38" y2="46" stroke="#BAE6FD" strokeWidth="3" strokeLinecap="round" />
      </g>
    </g>

    {/* Student 4 (Right): Boy with Glasses & Checkered Shirt */}
    <g transform="translate(384, 72)">
      <rect x="48" y="98" width="20" height="20" rx="6" fill="#FDBA74" />
      <circle cx="58" cy="68" r="31" fill="#FDBA74" />
      {/* Hair */}
      <path
        d="M26 58C26 28 50 16 74 22C94 26 100 44 92 62C80 46 46 44 26 58Z"
        fill="#1E1B18"
      />
      {/* Glasses */}
      <rect x="36" y="56" width="20" height="15" rx="4" fill="none" stroke="#1E293B" strokeWidth="3" />
      <rect x="62" y="56" width="20" height="15" rx="4" fill="none" stroke="#1E293B" strokeWidth="3" />
      <line x1="56" y1="63" x2="62" y2="63" stroke="#1E293B" strokeWidth="3" />
      {/* Eyes & Smile */}
      <circle cx="46" cy="63" r="3.8" fill="#0F172A" />
      <circle cx="72" cy="63" r="3.8" fill="#0F172A" />
      <path d="M46 80Q58 92 70 80Z" fill="#991B1B" />
      <path d="M48 81H68" stroke="#FFFFFF" strokeWidth="2.6" strokeLinecap="round" />
      {/* Checkered Coral/Blue Shirt */}
      <path d="M20 126C20 114 38 108 58 108C78 108 96 114 96 126V228H20V126Z" fill="#F43F5E" />
      <path d="M35 110V228M58 108V228M81 110V228" stroke="#FFE4E6" strokeWidth="2" opacity="0.65" />
      <path d="M20 145H96M20 172H96M20 199H96" stroke="#FFE4E6" strokeWidth="2" opacity="0.65" />
      <path d="M84 120V205" stroke="#1E3A8A" strokeWidth="9" strokeLinecap="round" />
    </g>
  </svg>
);

const LeftBooksAndGradCapStack: React.FC = () => (
  <svg viewBox="0 0 180 210" fill="none" className="w-28 sm:w-36 xl:w-44 h-auto select-none" aria-hidden="true">
    {/* Decorative Green Leaves */}
    <path d="M18 65C4 45 10 20 35 28C40 48 30 62 18 65Z" fill="#22C55E" opacity="0.85" />
    <path d="M36 52C28 30 42 8 64 20C62 40 48 50 36 52Z" fill="#4ADE80" opacity="0.9" />
    {/* Bottom Blue Book */}
    <rect x="10" y="168" width="148" height="28" rx="6" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
    <rect x="18" y="173" width="128" height="18" rx="3" fill="#E0F2FE" />
    {/* Middle Green Book */}
    <rect x="16" y="140" width="136" height="28" rx="6" fill="#16A34A" stroke="#15803D" strokeWidth="2" />
    <rect x="24" y="145" width="116" height="18" rx="3" fill="#DCFCE7" />
    {/* Top Red/Orange Book */}
    <rect x="24" y="112" width="122" height="28" rx="6" fill="#EA580C" stroke="#C2410C" strokeWidth="2" />
    <rect x="32" y="117" width="102" height="18" rx="3" fill="#FEF3C7" />
    {/* Graduation Cap on Top */}
    <polygon points="85,56 26,80 85,104 144,80" fill="#1E293B" stroke="#334155" strokeWidth="2" />
    <path d="M52 91V108C52 114 67 119 85 119C103 119 118 114 118 108V91" fill="#0F172A" />
    <path d="M126 86V112" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="126" cy="114" r="4" fill="#F59E0B" />
  </svg>
);

/**
 * 5 Portal Card Character & Campus Illustrations
 */
const StudentPortalAvatarSvg: React.FC = () => (
  <svg viewBox="0 0 220 150" fill="none" className="w-full h-32 sm:h-36 object-contain select-none" aria-hidden="true">
    {/* Floating Mini Grad Cap & Sparkles */}
    <polygon points="36,48 16,56 36,64 56,56" fill="#1E3A8A" />
    <circle cx="182" cy="36" r="3" fill="#FEF08A" />
    <circle cx="48" cy="28" r="2.5" fill="#BAE6FD" />
    {/* Graduation Cap on Student */}
    <polygon points="110,6 56,26 110,46 164,26" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" />
    <path d="M82 34V46C82 50 95 54 110 54C125 54 138 50 138 46V34" fill="#1E293B" />
    <path d="M148 31V52" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
    {/* Head & Face */}
    <circle cx="110" cy="68" r="26" fill="#FDBA74" />
    <path d="M84 60C90 44 130 44 136 60C124 52 96 52 84 60Z" fill="#1E1B18" />
    <circle cx="100" cy="66" r="3.6" fill="#0F172A" />
    <circle cx="120" cy="66" r="3.6" fill="#0F172A" />
    <path d="M100 78Q110 88 120 78Z" fill="#991B1B" />
    <path d="M102 79H118" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    {/* White Shirt & Blue Vest */}
    <path d="M68 112C68 100 86 94 110 94C134 94 152 100 152 112V148H68V112Z" fill="#EFF6FF" />
    <polygon points="110,96 104,120 110,142 116,120" fill="#1D4ED8" />
    {/* Open Colourful Book in Front */}
    <path
      d="M74 118C88 118 100 123 110 130C120 123 132 118 146 118V144C132 144 120 140 110 147C100 140 88 144 74 144V118Z"
      fill="#FACC15"
      stroke="#FFFFFF"
      strokeWidth="2"
    />
  </svg>
);

const TeacherPortalAvatarSvg: React.FC = () => (
  <svg viewBox="0 0 220 150" fill="none" className="w-full h-32 sm:h-36 object-contain select-none" aria-hidden="true">
    {/* Teacher Hair */}
    <path d="M78 58C76 24 100 14 124 20C144 26 148 56 142 98H76C72 80 76 68 78 58Z" fill="#27170E" />
    {/* Head & Glasses */}
    <circle cx="110" cy="62" r="25" fill="#FDBA74" />
    <path d="M85 52C95 34 126 34 135 52C122 44 98 44 85 52Z" fill="#27170E" />
    <rect x="91" y="53" width="16" height="11" rx="3" stroke="#475569" strokeWidth="2.2" fill="none" />
    <rect x="113" y="53" width="16" height="11" rx="3" stroke="#475569" strokeWidth="2.2" fill="none" />
    <line x1="107" y1="58" x2="113" y2="58" stroke="#475569" strokeWidth="2.2" />
    <circle cx="99" cy="58" r="2.8" fill="#0F172A" />
    <circle cx="121" cy="58" r="2.8" fill="#0F172A" />
    <path d="M101 72Q110 80 119 72" stroke="#991B1B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Smart Blazer & Blouse */}
    <path d="M68 108C68 96 86 90 110 90C134 90 152 96 152 108V148H68V108Z" fill="#334155" />
    <polygon points="96,90 110,124 124,90" fill="#F8FAFC" />
    {/* Blue Lesson Folder & Teaching Pointer Stick */}
    <rect x="70" y="114" width="42" height="32" rx="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
    <line x1="146" y1="112" x2="176" y2="54" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="144" cy="115" r="7" fill="#FDBA74" />
  </svg>
);

const ParentPortalAvatarSvg: React.FC = () => (
  <svg viewBox="0 0 220 150" fill="none" className="w-full h-32 sm:h-36 object-contain select-none" aria-hidden="true">
    {/* Father (Left) */}
    <circle cx="76" cy="54" r="21" fill="#FDBA74" />
    <path d="M55 46C58 26 88 26 96 44C84 36 66 36 55 46Z" fill="#1E1B18" />
    <circle cx="69" cy="53" r="2.8" fill="#0F172A" />
    <circle cx="83" cy="53" r="2.8" fill="#0F172A" />
    <path d="M69 63Q76 70 83 63" stroke="#991B1B" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M44 96C44 84 58 78 76 78C94 78 108 84 108 96V148H44V96Z" fill="#38BDF8" />

    {/* Mother (Right) */}
    <path d="M122 54C122 30 144 22 162 28C176 34 180 62 174 106H122V54Z" fill="#27170E" />
    <circle cx="148" cy="58" r="20" fill="#FDBA74" />
    <circle cx="141" cy="57" r="2.8" fill="#0F172A" />
    <circle cx="155" cy="57" r="2.8" fill="#0F172A" />
    <path d="M141 67Q148 73 155 67" stroke="#991B1B" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M118 98C118 86 132 80 148 80C164 80 178 86 178 98V148H118V98Z" fill="#FBBF24" />

    {/* Child (Front Center) */}
    <circle cx="112" cy="86" r="18" fill="#FDBA74" />
    <path d="M94 80C98 64 126 64 130 80C120 72 104 72 94 80Z" fill="#1E1B18" />
    <circle cx="106" cy="85" r="2.5" fill="#0F172A" />
    <circle cx="118" cy="85" r="2.5" fill="#0F172A" />
    <path d="M105 94Q112 100 119 94" stroke="#991B1B" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M86 120C86 110 98 106 112 106C126 106 138 110 138 120V148H86V120Z" fill="#EC4899" />
  </svg>
);

const CollegePortalAvatarSvg: React.FC = () => (
  <svg viewBox="0 0 220 150" fill="none" className="w-full h-32 sm:h-36 object-contain select-none" aria-hidden="true">
    {/* Graduation Cap */}
    <polygon points="110,8 56,28 110,48 164,28" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
    <path d="M84 36V48C84 52 96 56 110 56C124 56 136 52 136 48V36" fill="#0F172A" />
    <path d="M74 34V58" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Graduate Face */}
    <circle cx="110" cy="68" r="24" fill="#FDBA74" />
    <path d="M86 60C92 44 128 44 134 60C122 52 98 52 86 60Z" fill="#1E1B18" />
    <circle cx="101" cy="66" r="3.2" fill="#0F172A" />
    <circle cx="119" cy="66" r="3.2" fill="#0F172A" />
    <path d="M101 77Q110 85 119 77" stroke="#991B1B" strokeWidth="2.4" strokeLinecap="round" />
    {/* Academic Gown & Red Tie */}
    <path d="M64 110C64 96 84 90 110 90C136 90 156 96 156 110V148H64V110Z" fill="#1E293B" />
    <polygon points="98,90 110,116 122,90" fill="#FFFFFF" />
    <polygon points="110,98 106,120 110,136 114,120" fill="#DC2626" />
    {/* Rolled Degree Scroll Tied with Red Ribbon */}
    <g transform="translate(132, 96) rotate(18)">
      <rect x="0" y="0" width="14" height="44" rx="5" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.5" />
      <rect x="0" y="18" width="14" height="6" fill="#DC2626" />
    </g>
  </svg>
);

const InstitutePortalBuildingSvg: React.FC = () => (
  <svg viewBox="0 0 220 150" fill="none" className="w-full h-32 sm:h-36 object-contain select-none" aria-hidden="true">
    {/* Soft Clouds */}
    <circle cx="44" cy="40" r="14" fill="#FFFFFF" opacity="0.65" />
    <circle cx="176" cy="38" r="16" fill="#FFFFFF" opacity="0.65" />
    {/* Classical Institute Campus Building */}
    <polygon points="28,58 110,20 192,58" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
    <rect x="36" y="58" width="148" height="74" rx="3" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" />
    {/* Central Pediment & Clock */}
    <polygon points="74,58 110,34 146,58" fill="#FDE68A" stroke="#D97706" strokeWidth="1.8" />
    <circle cx="110" cy="48" r="6" fill="#FFFFFF" stroke="#B45309" strokeWidth="1.5" />
    {/* Windows & Columns */}
    {[48, 70, 134, 156].map((x) => (
      <g key={x}>
        <rect x={x} y="68" width="14" height="22" rx="2" fill="#0284C7" />
        <rect x={x} y="98" width="14" height="22" rx="2" fill="#0284C7" />
      </g>
    ))}
    {/* Grand Entrance Door */}
    <rect x="98" y="94" width="24" height="38" rx="4" fill="#B45309" />
    {/* Green Campus Hedges */}
    <rect x="22" y="130" width="176" height="10" rx="5" fill="#16A34A" />
    <circle cx="34" cy="126" r="11" fill="#15803D" />
    <circle cx="186" cy="126" r="11" fill="#15803D" />
  </svg>
);

export const PublicLandingHomepage: React.FC<PublicLandingHomepageProps> = ({
  onOpenPortal,
  onNavigateTab,
  onOpenAuth,
  isAuthenticated = false,
  currentUserName,
  onOpenMyDashboard,
}) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      isActive: true,
      onClick: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
      isActive: false,
      onClick: () => onNavigateTab('about'),
    },
    {
      id: 'features',
      label: 'Features',
      icon: Star,
      isActive: false,
      onClick: () => onNavigateTab('all-courses'),
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Trophy,
      isActive: false,
      onClick: () => onNavigateTab('certificates'),
    },
    {
      id: 'help',
      label: 'Help',
      icon: HelpCircle,
      isActive: false,
      onClick: () => onNavigateTab('help-support'),
    },
  ];

  const mainPortals: Array<{
    role: Exclude<PortalRole, 'admin'>;
    title: string;
    subtitle: string;
    cardGradient: string;
    borderGlow: string;
    arrowColor: string;
    illustration: React.ReactNode;
  }> = [
    {
      role: 'student',
      title: 'Student Portal',
      subtitle: 'Study • Practice • Grow',
      cardGradient: 'from-[#38bdf8] via-[#0284c7] to-[#1e3a8a]',
      borderGlow: 'border-sky-300 hover:border-white shadow-[0_14px_30px_-6px_rgba(2,132,199,0.55)]',
      arrowColor: 'text-blue-800',
      illustration: <StudentPortalAvatarSvg />,
    },
    {
      role: 'teacher',
      title: 'Teacher Portal',
      subtitle: 'Plan • Teach • Assess',
      cardGradient: 'from-[#a3e635] via-[#22c55e] to-[#15803d]',
      borderGlow: 'border-lime-300 hover:border-white shadow-[0_14px_30px_-6px_rgba(22,163,74,0.55)]',
      arrowColor: 'text-emerald-800',
      illustration: <TeacherPortalAvatarSvg />,
    },
    {
      role: 'parent',
      title: 'Parent Portal',
      subtitle: 'Monitor • Support • Encourage',
      cardGradient: 'from-[#f472b6] via-[#d946ef] to-[#7e22ce]',
      borderGlow: 'border-pink-300 hover:border-white shadow-[0_14px_30px_-6px_rgba(192,38,211,0.55)]',
      arrowColor: 'text-purple-800',
      illustration: <ParentPortalAvatarSvg />,
    },
    {
      role: 'school_admin',
      title: 'College Portal',
      subtitle: 'Manage • Track • Excel',
      cardGradient: 'from-[#facc15] via-[#f97316] to-[#c2410c]',
      borderGlow: 'border-amber-300 hover:border-white shadow-[0_14px_30px_-6px_rgba(234,88,12,0.55)]',
      arrowColor: 'text-orange-700',
      illustration: <CollegePortalAvatarSvg />,
    },
    {
      role: 'institute_admin',
      title: 'Institute Portal',
      subtitle: 'Organize • Guide • Excel',
      cardGradient: 'from-[#2dd4bf] via-[#06b6d4] to-[#0f766e]',
      borderGlow: 'border-teal-300 hover:border-white shadow-[0_14px_30px_-6px_rgba(13,148,136,0.55)]',
      arrowColor: 'text-teal-800',
      illustration: <InstitutePortalBuildingSvg />,
    },
  ];

  const sixLearningSections = [
    {
      id: 'dictionary',
      title: 'Dictionary',
      subtitle: '(Eng-Mar-Hin)',
      icon: BookOpen,
      iconBg: 'from-blue-500 to-indigo-600',
      onClick: () => onNavigateTab('trilingual-dictionary'),
    },
    {
      id: 'worksheets',
      title: 'Worksheets',
      subtitle: '(Practice Sheets)',
      icon: FileText,
      iconBg: 'from-sky-500 to-blue-600',
      onClick: () => onNavigateTab('worksheets'),
    },
    {
      id: 'study-notes',
      title: 'Study Notes',
      subtitle: '(Chapter Wise)',
      icon: Layers,
      iconBg: 'from-rose-500 to-amber-500',
      onClick: () => onNavigateTab('study-materials', 'chapter_notes'),
    },
    {
      id: 'video-lessons',
      title: 'Video Lessons',
      subtitle: '(Expert Videos)',
      icon: Clapperboard,
      iconBg: 'from-blue-600 to-cyan-500',
      onClick: () => onNavigateTab('study-materials', 'video_lessons'),
    },
    {
      id: 'online-exams',
      title: 'Online Exams',
      subtitle: '(Quiz Test)',
      icon: ClipboardCheck,
      iconBg: 'from-emerald-500 to-teal-600',
      onClick: () => onNavigateTab('explore-zone', 'exam-zone'),
    },
    {
      id: 'learning-tools',
      title: 'Learning Tools',
      subtitle: '(Calculators etc.)',
      icon: Calculator,
      iconBg: 'from-amber-500 to-orange-600',
      onClick: () => onNavigateTab('ai-tools'),
    },
  ];

  const bottomHighlights = [
    {
      id: 'smart-learning',
      title: 'Smart Learning',
      subtitle: 'Anytime, Anywhere',
      icon: Rocket,
      badgeBg: 'from-fuchsia-500 via-purple-600 to-indigo-600',
    },
    {
      id: 'track-progress',
      title: 'Track Your Progress',
      subtitle: '& Earn Rewards',
      icon: Award,
      badgeBg: 'from-amber-400 via-orange-500 to-red-500',
    },
    {
      id: 'for-everyone',
      title: 'For Students,',
      subtitle: 'Teachers & Parents',
      icon: Users,
      badgeBg: 'from-yellow-400 via-amber-500 to-orange-500',
    },
    {
      id: 'safe-secure',
      title: 'Safe, Secure',
      subtitle: '& Reliable',
      icon: ShieldCheck,
      badgeBg: 'from-emerald-400 via-green-500 to-teal-600',
    },
  ];

  return (
    <div
      data-testid="mystudyzone-public-landing-homepage"
      className="min-h-screen w-full flex flex-col justify-between bg-gradient-to-b from-[#d8f0ff] via-[#eef8ff] to-[#ffffff] text-slate-900 overflow-x-hidden select-none"
    >
      {/* 1. TOP RESPONSIVE HEADER NAVIGATION */}
      <header className="w-full bg-white/85 backdrop-blur-md border-b border-sky-200/80 shadow-xs sticky top-0 z-40">
        <div className="max-w-[1680px] mx-auto px-3 sm:px-6 xl:px-10 py-2.5 flex items-center justify-between gap-3">
          {/* Official MyStudyZone Logo + Tagline: Learn • Practice • Excel */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 sm:gap-3.5 text-left cursor-pointer group shrink-0"
          >
            <MyStudyZoneOfficialLogo className="w-11 h-11 sm:w-14 sm:h-14 shrink-0 group-hover:scale-105 transition-transform" />
            <div>
              <div className="font-display font-black text-xl sm:text-3xl xl:text-[34px] tracking-tight leading-none">
                <span className="text-[#172554]">MyStudy</span>
                <span className="text-[#a21caf]">Zone</span>
              </div>
              <div className="text-[11px] sm:text-xs xl:text-sm font-bold italic text-[#1e3a8a] tracking-wide mt-0.5">
                Learn • Practice • Excel
              </div>
            </div>
          </button>

          {/* Center Navigation Links: Home, About, Features, Achievements, Help */}
          <nav
            aria-label="Homepage Primary Navigation"
            className="hidden lg:flex items-center bg-sky-100/80 border border-sky-200/90 rounded-2xl p-1.5 shadow-inner gap-1 xl:gap-2"
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <React.Fragment key={item.id}>
                  <button
                    type="button"
                    onClick={item.onClick}
                    className={`px-4 xl:px-5 py-2 rounded-xl flex flex-col items-center justify-center gap-0.5 font-extrabold text-xs xl:text-sm transition-all cursor-pointer whitespace-nowrap ${
                      item.isActive
                        ? 'bg-gradient-to-b from-[#2563eb] to-[#1d4ed8] text-white shadow-md scale-[1.02]'
                        : 'text-[#0f2952] hover:bg-white/80 hover:text-blue-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        item.isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-[#0f2952] text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span>{item.label}</span>
                  </button>
                  {index < navItems.length - 1 && (
                    <span className="h-8 w-[1px] bg-sky-300/80" aria-hidden="true" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right Auth Action Buttons: Login & Register (or My Portal Dashboard when signed in) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {isAuthenticated && onOpenMyDashboard && (
              <button
                type="button"
                onClick={onOpenMyDashboard}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs xl:text-sm shadow-sm cursor-pointer transition-transform active:scale-95"
              >
                <GraduationCap className="w-4 h-4" />
                <span>{currentUserName ? `${currentUserName.split(' ')[0]}'s Portal` : 'My Portal'}</span>
              </button>
            )}

            <button
              type="button"
              data-testid="homepage-login-btn"
              onClick={() => onOpenAuth('login', 'student')}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-[#2563eb] to-[#1e40af] hover:from-[#1d4ed8] hover:to-[#1e3a8a] text-white font-black text-xs sm:text-sm xl:text-base shadow-[0_6px_16px_rgba(37,99,235,0.4)] border border-blue-400/50 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
            >
              <span className="w-5 h-5 rounded-full bg-white text-blue-700 flex items-center justify-center shrink-0">
                <User className="w-3.5 h-3.5 fill-current" />
              </span>
              <span>Login</span>
            </button>

            <button
              type="button"
              data-testid="homepage-register-btn"
              onClick={() => onOpenAuth('register', 'student')}
              className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-gradient-to-b from-[#ec4899] via-[#db2777] to-[#9d174d] hover:brightness-110 text-white font-black text-xs sm:text-sm xl:text-base shadow-[0_6px_16px_rgba(219,39,119,0.4)] border border-pink-400/50 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all active:scale-95 whitespace-nowrap"
            >
              <Edit3 className="w-4 h-4 shrink-0" />
              <span>Register</span>
            </button>

            {/* Mobile Menu Trigger */}
            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label="Toggle Mobile Navigation"
              className="lg:hidden p-2 rounded-xl bg-sky-100 hover:bg-sky-200 text-[#0f2952] border border-sky-300 cursor-pointer"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Collapsible Navigation Bar */}
        {mobileNavOpen && (
          <div className="lg:hidden bg-white border-t border-sky-200 px-4 py-3 grid grid-cols-5 gap-1.5 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setMobileNavOpen(false);
                    item.onClick();
                  }}
                  className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-[11px] font-extrabold cursor-pointer ${
                    item.isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-sky-50 text-[#0f2952] hover:bg-sky-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* MAIN FULL-SCREEN CONTENT BODY */}
      <div className="flex-1 w-full max-w-[1680px] mx-auto px-3 sm:px-6 xl:px-10 pt-2 sm:pt-4 pb-4 flex flex-col justify-between gap-4 sm:gap-5">
        {/* 2. HERO BANNER SECTION */}
        <section className="relative w-full rounded-3xl bg-gradient-to-r from-[#cfefff] via-[#e5f6ff] to-[#cfefff] border border-sky-200/90 shadow-[0_12px_36px_rgba(14,116,144,0.12)] px-4 sm:px-8 xl:px-12 pt-4 pb-3 overflow-hidden">
          {/* Subtle Sky Clouds Backdrop */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-12 left-1/4 w-72 h-72 rounded-full bg-white/60 blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-10 right-10 w-80 h-44 rounded-full bg-emerald-200/40 blur-2xl"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center gap-4 lg:gap-2">
            {/* Left Stack of Books + Headline Block */}
            <div className="lg:col-span-5 flex items-center gap-2 sm:gap-4">
              <div className="hidden sm:block shrink-0 -ml-2">
                <LeftBooksAndGradCapStack />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1.5 sm:space-y-2">
                <h2 className="font-display font-black text-2xl sm:text-3xl xl:text-[38px] text-[#0f2952] tracking-tight leading-tight">
                  Your Complete
                </h2>

                {/* Royal Blue Ribbon Banner: Digital Learning */}
                <div className="inline-block relative">
                  <div className="px-5 sm:px-7 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-[#1e3a8a] via-[#1d4ed8] to-[#1e3a8a] text-white font-display font-black text-2xl sm:text-3xl xl:text-[40px] tracking-tight shadow-[0_8px_20px_rgba(29,78,216,0.45)] border-2 border-sky-300/60 -rotate-1">
                    Digital Learning
                  </div>
                </div>

                <h1 className="font-display font-black text-3xl sm:text-4xl xl:text-[44px] text-[#0f2952] tracking-tight leading-none pt-0.5">
                  Platform
                </h1>

                <div className="pt-1">
                  <p className="font-display font-extrabold italic text-base sm:text-xl xl:text-2xl text-[#c026d3] tracking-wide">
                    Learn Today... Lead Tomorrow...
                  </p>
                  <div className="h-1.5 w-48 sm:w-64 mx-auto sm:mx-0 mt-1 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-transparent" />
                </div>
              </div>
            </div>

            {/* Center & Right: 4 Cheerful Students + School Campus + Dream Big... Achieve More... */}
            <div className="lg:col-span-7 relative flex flex-col items-center justify-end">
              {/* Top-Right Motivational Slogan: Dream Big... Achieve More... */}
              <div className="self-end lg:absolute lg:top-1 lg:right-2 z-20 text-right mb-1 lg:mb-0">
                <div className="font-display font-black italic text-xl sm:text-2xl xl:text-3xl text-[#0f2952] leading-tight">
                  Dream Big...
                </div>
                <div className="font-display font-black italic text-xl sm:text-2xl xl:text-3xl text-[#be185d] leading-tight">
                  Achieve More...
                </div>
                <div className="h-1.5 w-36 sm:w-44 ml-auto mt-0.5 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-red-500" />
              </div>

              <HeroFourStudentsIllustration />
            </div>
          </div>
        </section>

        {/* 3. FIVE MAIN PORTALS (Student, Teacher, Parent, College, Institute) */}
        <section aria-label="Five Main Education Portals" className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 xl:gap-5">
            {mainPortals.map((portal) => (
              <button
                key={portal.role}
                type="button"
                data-testid={`homepage-portal-card-${portal.role}`}
                onClick={() => onOpenPortal(portal.role)}
                className={`group relative rounded-[26px] bg-gradient-to-b ${portal.cardGradient} p-3.5 sm:p-4 text-white border-[3px] ${portal.borderGlow} flex flex-col justify-between items-center text-center cursor-pointer transition-all duration-200 hover:-translate-y-1.5 active:scale-98 overflow-hidden`}
              >
                {/* Top Gloss Highlight */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-3 top-1.5 h-10 rounded-t-2xl bg-gradient-to-b from-white/35 to-transparent"
                />

                {/* Character / Campus Illustration */}
                <div className="relative z-10 w-full flex items-center justify-center pt-1">
                  {portal.illustration}
                </div>

                {/* Portal Title, Subtitle & Circular Arrow CTA */}
                <div className="relative z-10 w-full pt-2 pb-0.5 flex items-end justify-between gap-2">
                  <div className="flex-1 text-center pl-5">
                    <h3 className="font-display font-black text-xl sm:text-2xl xl:text-[26px] leading-none tracking-tight drop-shadow-xs">
                      {portal.title.split(' ')[0]}
                      <span className="block">{portal.title.split(' ')[1]}</span>
                    </h3>
                    <p className="text-[11px] sm:text-xs xl:text-[13px] font-extrabold text-white/95 tracking-tight mt-1.5 whitespace-nowrap">
                      {portal.subtitle}
                    </p>
                  </div>

                  <span
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white ${portal.arrowColor} flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform`}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.75]" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 4. SIX QUICK-ACCESS LEARNING SECTIONS */}
        <section
          aria-label="Quick-Access Learning Sections"
          className="w-full rounded-3xl bg-white/95 border-2 border-sky-200/90 shadow-[0_10px_28px_rgba(15,41,82,0.08)] p-2.5 sm:p-3.5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5">
            {sixLearningSections.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  type="button"
                  data-testid={`homepage-resource-${sec.id}`}
                  onClick={sec.onClick}
                  className="group px-3.5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-b from-[#f8fafc] to-[#eff6ff] hover:from-white hover:to-sky-100 border border-sky-200/90 hover:border-blue-400 shadow-2xs hover:shadow-md flex items-center gap-3 text-left cursor-pointer transition-all active:scale-98"
                >
                  <span
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${sec.iconBg} text-white flex items-center justify-center shadow-sm shrink-0 group-hover:scale-105 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-black text-sm sm:text-base text-[#0f2952] leading-tight truncate">
                      {sec.title}
                    </div>
                    <div className="text-xs font-extrabold text-slate-600 leading-tight truncate mt-0.5">
                      {sec.subtitle}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* 5. BOTTOM HIGHLIGHTS WAVE BANNER */}
      <footer className="w-full bg-gradient-to-r from-[#091e46] via-[#10326b] to-[#091e46] text-white border-t-4 border-sky-400/70 shadow-[0_-10px_25px_rgba(9,30,70,0.25)]">
        <div className="max-w-[1680px] mx-auto px-3 sm:px-6 xl:px-10 py-3.5 sm:py-4 flex flex-col xl:flex-row items-center justify-between gap-4">
          {/* Four Highlights */}
          <div className="w-full xl:flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {bottomHighlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="flex items-center gap-3 bg-white/5 sm:bg-transparent rounded-2xl px-3 py-2 sm:p-0 border border-white/10 sm:border-0"
                >
                  <span
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br ${item.badgeBg} text-white flex items-center justify-center shadow-md border-2 border-white/80 shrink-0`}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-black text-xs sm:text-sm xl:text-base text-white leading-tight">
                      {item.title}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-sky-200 leading-tight">
                      {item.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Golden Ribbon Banner: Together for a Brighter Future */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={() => onOpenPortal('student')}
              className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-b from-[#fde047] via-[#facc15] to-[#eab308] hover:brightness-105 text-[#0f2952] font-display font-black italic text-base sm:text-lg xl:text-xl shadow-[0_8px_20px_rgba(250,204,21,0.4)] border-2 border-yellow-200 -rotate-1 cursor-pointer transition-transform hover:scale-105"
            >
              <span className="block leading-tight">Together for a</span>
              <span className="block leading-tight">Brighter Future</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
