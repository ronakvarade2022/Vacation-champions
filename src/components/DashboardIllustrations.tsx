import React from 'react';

/**
 * High-contrast, colourful 3D-style vector illustrations inspired by the MyStudyZone
 * reference dashboard. Pure inline SVG — zero network latency, crisp at any resolution.
 */

export const BrandBookCapLogo: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="mszLogoBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF8A00" />
        <stop offset="100%" stopColor="#EA580C" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx="16" fill="url(#mszLogoBg)" />
    {/* Open Book */}
    <path
      d="M14 36C14 33 22 31 32 35C42 31 50 33 50 36V49C50 49 42 46 32 50C22 46 14 49 14 49V36Z"
      fill="#FFFBEB"
      stroke="#FDE68A"
      strokeWidth="2"
    />
    <path d="M32 35V50" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    {/* Graduation Cap */}
    <polygon points="32,12 10,22 32,32 54,22" fill="#FFFFFF" />
    <path d="M20 26.5V34C20 36.5 25.5 39 32 39C38.5 39 44 36.5 44 34V26.5" fill="#FDE68A" />
    <path d="M50 23.5V34" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="50" cy="35" r="2.5" fill="#FACC15" />
  </svg>
);

export const HeroSchoolchildrenIllustration: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg viewBox="0 0 520 290" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="trophyGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#FACC15" />
        <stop offset="100%" stopColor="#CA8A04" />
      </linearGradient>
      <linearGradient id="boyShirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38BDF8" />
        <stop offset="100%" stopColor="#0284C7" />
      </linearGradient>
      <linearGradient id="girlShirt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F472B6" />
        <stop offset="100%" stopColor="#DB2777" />
      </linearGradient>
      <linearGradient id="greenBook" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4ADE80" />
        <stop offset="100%" stopColor="#16A34A" />
      </linearGradient>
      <linearGradient id="purpleBook" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#6B21A8" />
      </linearGradient>
    </defs>

    {/* Soft Sunbeams & Floating Stars */}
    <circle cx="430" cy="68" r="48" fill="#FEF08A" fillOpacity="0.45" />
    <polygon
      points="45,28 49,38 60,39 52,46 54,57 45,51 36,57 38,46 30,39 41,38"
      fill="#FACC15"
    />
    <polygon
      points="230,22 233,30 242,31 235,36 237,45 230,40 223,45 225,36 218,31 227,30"
      fill="#FACC15"
    />
    <polygon
      points="345,18 348,25 356,26 350,31 352,38 345,34 338,38 340,31 334,26 342,25"
      fill="#FDE047"
    />

    {/* Speech Bubble: Learn Something New Every Day! */}
    <g transform="translate(358, 16)">
      <rect
        x="0"
        y="0"
        width="152"
        height="88"
        rx="24"
        fill="url(#trophyGold)"
        stroke="#FFFFFF"
        strokeWidth="3"
      />
      <path d="M24 86L10 104L44 88Z" fill="#EAB308" />
      <text
        x="76"
        y="28"
        textAnchor="middle"
        fill="#0F172A"
        fontWeight="900"
        fontSize="14"
        fontFamily="sans-serif"
      >
        Learn
      </text>
      <text
        x="76"
        y="48"
        textAnchor="middle"
        fill="#0F172A"
        fontWeight="900"
        fontSize="14"
        fontFamily="sans-serif"
      >
        Something
      </text>
      <text
        x="76"
        y="68"
        textAnchor="middle"
        fill="#0F172A"
        fontWeight="900"
        fontSize="13"
        fontFamily="sans-serif"
      >
        New Every Day!
      </text>
    </g>

    {/* Indian Schoolboy Character (Left) */}
    <g transform="translate(72, 42)">
      {/* Backpack */}
      <rect x="20" y="102" width="96" height="90" rx="20" fill="#1D4ED8" />
      {/* Neck */}
      <rect x="56" y="92" width="24" height="20" rx="8" fill="#FDBA74" />
      {/* Head & Face */}
      <circle cx="68" cy="60" r="38" fill="#FDBA74" />
      {/* Rosy Cheeks */}
      <circle cx="44" cy="68" r="6" fill="#FB7185" fillOpacity="0.45" />
      <circle cx="92" cy="68" r="6" fill="#FB7185" fillOpacity="0.45" />
      {/* Hair */}
      <path
        d="M28 54C26 24 52 12 78 16C100 18 112 36 106 56C98 40 84 34 64 36C48 38 36 44 28 54Z"
        fill="#27170E"
      />
      {/* Eyes */}
      <circle cx="53" cy="58" r="5.5" fill="#1E293B" />
      <circle cx="51.5" cy="56" r="2" fill="#FFFFFF" />
      <circle cx="83" cy="58" r="5.5" fill="#1E293B" />
      <circle cx="81.5" cy="56" r="2" fill="#FFFFFF" />
      {/* Eyebrows */}
      <path d="M44 46Q53 41 61 46" stroke="#27170E" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M75 46Q83 41 92 46" stroke="#27170E" strokeWidth="3.5" strokeLinecap="round" />
      {/* Big Happy Smile */}
      <path d="M54 73Q68 87 82 73Z" fill="#991B1B" />
      <path d="M56 74H80" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      {/* Torso / Blue Jacket */}
      <path
        d="M24 114C24 104 42 98 68 98C94 98 112 104 112 114V225H24V114Z"
        fill="url(#boyShirt)"
      />
      {/* White Collar */}
      <polygon points="52,98 68,118 84,98" fill="#FFFFFF" />
      {/* Thumbs Up Left Hand */}
      <g transform="translate(-8, 125)">
        <rect x="8" y="20" width="24" height="22" rx="9" fill="#FDBA74" />
        <rect x="14" y="6" width="10" height="18" rx="5" fill="#FDBA74" />
      </g>
      {/* Green "Dream Big" Book Held in Front */}
      <g transform="translate(38, 128)">
        <rect
          x="0"
          y="0"
          width="68"
          height="88"
          rx="8"
          fill="url(#greenBook)"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <rect x="6" y="6" width="56" height="76" rx="4" fill="#15803D" fillOpacity="0.35" />
        <text
          x="34"
          y="38"
          textAnchor="middle"
          fill="#FFFFFF"
          fontWeight="900"
          fontSize="13"
          fontFamily="sans-serif"
        >
          Dream
        </text>
        <text
          x="34"
          y="58"
          textAnchor="middle"
          fill="#FEF08A"
          fontWeight="900"
          fontSize="15"
          fontFamily="sans-serif"
        >
          Big
        </text>
      </g>
    </g>

    {/* Indian Schoolgirl Character (Right) */}
    <g transform="translate(216, 48)">
      {/* Ponytail */}
      <path
        d="M92 28C118 18 134 38 126 66C118 82 104 76 98 56Z"
        fill="#27170E"
      />
      <circle cx="96" cy="36" r="7" fill="#EC4899" />
      {/* Backpack */}
      <rect x="18" y="100" width="90" height="86" rx="20" fill="#9333EA" />
      {/* Neck */}
      <rect x="52" y="90" width="22" height="18" rx="8" fill="#FDBA74" />
      {/* Head */}
      <circle cx="63" cy="58" r="36" fill="#FDBA74" />
      {/* Cheeks */}
      <circle cx="40" cy="66" r="6" fill="#FB7185" fillOpacity="0.45" />
      <circle cx="86" cy="66" r="6" fill="#FB7185" fillOpacity="0.45" />
      {/* Hair */}
      <path
        d="M25 54C24 24 48 14 74 18C94 20 104 36 100 54C90 38 74 34 56 36C40 38 32 45 25 54Z"
        fill="#27170E"
      />
      {/* Eyes */}
      <circle cx="49" cy="56" r="5.2" fill="#1E293B" />
      <circle cx="47.5" cy="54" r="1.8" fill="#FFFFFF" />
      <circle cx="77" cy="56" r="5.2" fill="#1E293B" />
      <circle cx="75.5" cy="54" r="1.8" fill="#FFFFFF" />
      {/* Smile */}
      <path d="M50 70Q63 83 76 70Z" fill="#991B1B" />
      <path d="M52 71H74" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
      {/* Pink Uniform Top */}
      <path
        d="M22 110C22 100 38 95 63 95C88 95 104 100 104 110V220H22V110Z"
        fill="url(#girlShirt)"
      />
      {/* Purple "Be Smart" Book */}
      <g transform="translate(34, 124)">
        <rect
          x="0"
          y="0"
          width="66"
          height="84"
          rx="8"
          fill="url(#purpleBook)"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <text
          x="33"
          y="36"
          textAnchor="middle"
          fill="#FEF08A"
          fontWeight="900"
          fontSize="14"
          fontFamily="sans-serif"
        >
          Be
        </text>
        <text
          x="33"
          y="56"
          textAnchor="middle"
          fill="#FFFFFF"
          fontWeight="900"
          fontSize="14"
          fontFamily="sans-serif"
        >
          Smart
        </text>
      </g>
    </g>

    {/* Golden Champion Trophy (Bottom Right) */}
    <g transform="translate(390, 124)">
      {/* Handles */}
      <path
        d="M22 28C4 28 4 64 26 68"
        stroke="url(#trophyGold)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M94 28C112 28 112 64 90 68"
        stroke="url(#trophyGold)"
        strokeWidth="8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cup Body */}
      <path
        d="M20 14H96L88 68C84 88 70 98 58 98C46 98 32 88 28 68L20 14Z"
        fill="url(#trophyGold)"
        stroke="#FEF9C3"
        strokeWidth="2"
      />
      {/* Star on Trophy */}
      <polygon
        points="58,32 63,44 76,45 66,53 69,66 58,59 47,66 50,53 40,45 53,44"
        fill="#FFFBEB"
      />
      {/* Stem & Base */}
      <rect x="48" y="96" width="20" height="24" rx="4" fill="#CA8A04" />
      <rect x="30" y="118" width="56" height="14" rx="6" fill="url(#trophyGold)" />
      <rect x="20" y="130" width="76" height="14" rx="6" fill="#78350F" />
    </g>
  </svg>
);

export const SpecialCardIllustration: React.FC<{
  type:
    | 'courses'
    | 'maths'
    | 'science'
    | 'english'
    | 'drawing'
    | 'stories'
    | 'shivaji'
    | 'puzzles'
    | 'sudoku'
    | 'cricket'
    | 'ai'
    | 'scholarship'
    | 'moral'
    | 'gk'
    | 'writing'
    | 'memory';
  className?: string;
}> = ({ type, className = 'w-16 h-16 sm:w-20 sm:h-20' }) => {
  switch (type) {
    case 'courses':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Bottom Orange Book */}
          <rect x="10" y="52" width="58" height="14" rx="4" fill="#EA580C" />
          <rect x="14" y="55" width="50" height="8" rx="2" fill="#FFFBEB" />
          {/* Middle Green Book */}
          <rect x="14" y="38" width="52" height="14" rx="4" fill="#16A34A" />
          <rect x="18" y="41" width="44" height="8" rx="2" fill="#F0FDF4" />
          {/* Top Blue Book */}
          <rect x="18" y="25" width="46" height="13" rx="4" fill="#2563EB" />
          <rect x="22" y="28" width="38" height="7" rx="2" fill="#EFF6FF" />
          {/* Graduation Cap on Top */}
          <polygon points="41,7 14,18 41,28 68,18" fill="#1E293B" />
          <path d="M62 20V32" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
          <circle cx="62" cy="33" r="3" fill="#EAB308" />
        </svg>
      );
    case 'maths':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* 3D Number 1 (Pink/Purple) */}
          <g transform="rotate(-8 22 44)">
            <rect x="12" y="20" width="16" height="44" rx="6" fill="#EC4899" stroke="#FFFFFF" strokeWidth="2" />
            <text x="20" y="52" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="30">1</text>
          </g>
          {/* 3D Number 2 (Orange/Yellow) */}
          <g transform="translate(26, 12)">
            <rect x="0" y="0" width="24" height="48" rx="8" fill="#F97316" stroke="#FFFFFF" strokeWidth="2" />
            <text x="12" y="36" textAnchor="middle" fill="#FEF08A" fontWeight="900" fontSize="32">2</text>
          </g>
          {/* 3D Number 3 (Blue) */}
          <g transform="rotate(8 58 44)">
            <rect x="46" y="22" width="22" height="44" rx="8" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
            <text x="57" y="54" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="30">3</text>
          </g>
        </svg>
      );
    case 'science':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Glowing Science Conical Flask */}
          <circle cx="40" cy="44" r="28" fill="#Ffe4e6" fillOpacity="0.45" />
          <path
            d="M32 14H48M35 14V28L16 60C14 64 17 68 22 68H58C63 68 66 64 64 60L45 28V14"
            fill="#E0F2FE"
            stroke="#FFFFFF"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          <path
            d="M21 52L17 59C15 63 18 66 22 66H58C62 66 65 63 63 59L59 52H21Z"
            fill="#2563EB"
          />
          <circle cx="34" cy="58" r="3.5" fill="#38BDF8" />
          <circle cx="46" cy="55" r="2.5" fill="#BAE6FD" />
          <circle cx="42" cy="40" r="3" fill="#60A5FA" />
          <circle cx="52" cy="18" r="4" fill="#FDE047" />
        </svg>
      );
    case 'english':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Top Block B */}
          <rect x="27" y="10" width="26" height="26" rx="6" fill="#FACC15" stroke="#FFFFFF" strokeWidth="2" />
          <text x="40" y="30" textAnchor="middle" fill="#1E293B" fontWeight="900" fontSize="20">B</text>
          {/* Left Block A */}
          <rect x="10" y="38" width="28" height="28" rx="6" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
          <text x="24" y="59" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="21">A</text>
          {/* Right Block C */}
          <rect x="42" y="38" width="28" height="28" rx="6" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
          <text x="56" y="59" textAnchor="middle" fill="#FFFFFF" fontWeight="900" fontSize="21">C</text>
        </svg>
      );
    case 'drawing':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Artist Palette */}
          <path
            d="M40 12C21 12 8 25 8 42C8 58 21 68 36 68C43 68 47 63 45 57C43 52 47 48 53 48H58C66 48 72 41 72 32C72 20 57 12 40 12Z"
            fill="#FBBF24"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <circle cx="24" cy="30" r="5.5" fill="#EF4444" />
          <circle cx="38" cy="23" r="5.5" fill="#3B82F6" />
          <circle cx="53" cy="27" r="5.5" fill="#10B981" />
          <circle cx="22" cy="46" r="5.5" fill="#A855F7" />
          <circle cx="35" cy="56" r="4.5" fill="#FFFFFF" />
          {/* Paint Brush */}
          <path d="M48 58L68 14" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
          <path d="M42 66C42 60 46 56 51 58C52 63 48 68 42 66Z" fill="#EC4899" />
        </svg>
      );
    case 'stories':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Fairytale Castle Rising from Open Book */}
          <rect x="24" y="26" width="32" height="26" fill="#FDBA74" />
          <rect x="18" y="30" width="10" height="22" fill="#FB923C" />
          <rect x="52" y="30" width="10" height="22" fill="#FB923C" />
          <polygon points="23,16 15,30 31,30" fill="#EF4444" />
          <polygon points="40,10 30,26 50,26" fill="#DC2626" />
          <polygon points="57,16 49,30 65,30" fill="#EF4444" />
          <path d="M35 52V40C35 37 45 37 45 40V52Z" fill="#78350F" />
          {/* Open Book Base */}
          <path
            d="M8 52C18 49 30 51 40 56C50 51 62 49 72 52V66C62 63 50 65 40 70C30 65 18 63 8 66V52Z"
            fill="#FFFFFF"
            stroke="#B45309"
            strokeWidth="2.5"
          />
        </svg>
      );
    case 'shivaji':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Glowing Golden Sun Emblem */}
          <circle cx="40" cy="40" r="32" fill="#FEF08A" stroke="#F59E0B" strokeWidth="2.5" />
          {/* Royal Jiretop (Turban) */}
          <path
            d="M20 34C20 18 35 12 52 16C60 18 62 28 58 36H20Z"
            fill="#DC2626"
            stroke="#FACC15"
            strokeWidth="2"
          />
          <path d="M22 30Q40 22 58 30" stroke="#FEF08A" strokeWidth="3" fill="none" />
          {/* Pearl Tura */}
          <circle cx="28" cy="18" r="3.5" fill="#FFFFFF" />
          <path d="M28 18C22 12 18 14 16 20" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Noble Profile Face & Beard */}
          <rect x="26" y="34" width="26" height="24" rx="10" fill="#FDBA74" />
          <path d="M34 39H46" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="35" cy="43" r="2" fill="#1E293B" />
          <circle cx="45" cy="43" r="2" fill="#1E293B" />
          {/* Mustache & Royal Beard */}
          <path
            d="M27 49C30 58 36 62 40 62C44 62 50 58 53 49C48 52 44 53 40 53C36 53 32 52 27 49Z"
            fill="#1E293B"
          />
          {/* Royal Robe & Pearl Necklace */}
          <path d="M20 68C22 60 30 58 40 58C50 58 58 60 60 68H20Z" fill="#EA580C" />
        </svg>
      );
    case 'puzzles':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Left Pink Brain Hemisphere */}
          <path
            d="M38 16C24 16 14 26 14 40C14 54 24 64 38 64V16Z"
            fill="#F472B6"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <path d="M22 32Q28 28 34 34M20 44Q28 40 34 48" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" />
          {/* Right Jigsaw Puzzle Pieces */}
          <rect x="38" y="16" width="24" height="24" rx="5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="38" y="40" width="24" height="24" rx="5" fill="#22C55E" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="50" cy="40" r="5" fill="#FACC15" />
        </svg>
      );
    case 'sudoku':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Tilted 3D Grid Board */}
          <g transform="rotate(-8 38 40)">
            <rect x="12" y="14" width="48" height="50" rx="8" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <line x1="28" y1="14" x2="28" y2="64" stroke="#64748B" strokeWidth="2" />
            <line x1="44" y1="14" x2="44" y2="64" stroke="#64748B" strokeWidth="2" />
            <line x1="12" y1="31" x2="60" y2="31" stroke="#64748B" strokeWidth="2" />
            <line x1="12" y1="48" x2="60" y2="48" stroke="#64748B" strokeWidth="2" />
            <text x="20" y="27" textAnchor="middle" fill="#2563EB" fontWeight="900" fontSize="11">8</text>
            <text x="36" y="27" textAnchor="middle" fill="#16A34A" fontWeight="900" fontSize="11">3</text>
            <text x="52" y="44" textAnchor="middle" fill="#EA580C" fontWeight="900" fontSize="11">9</text>
            <text x="20" y="60" textAnchor="middle" fill="#9333EA" fontWeight="900" fontSize="11">1</text>
          </g>
          {/* Pencil */}
          <path d="M48 56L68 24" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
          <polygon points="43,64 46,54 52,58" fill="#1E293B" />
        </svg>
      );
    case 'cricket':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Cricket Bat */}
          <g transform="rotate(35 40 40)">
            <rect x="36" y="6" width="8" height="22" rx="3" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
            <rect x="32" y="26" width="16" height="44" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          </g>
          {/* Red Leather Cricket Ball */}
          <circle cx="48" cy="54" r="12" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <path d="M39 47Q48 54 57 61" stroke="#FEF08A" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );
    case 'ai':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Cute 3D AI Robot */}
          <line x1="40" y1="8" x2="40" y2="16" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="8" r="4" fill="#38BDF8" />
          {/* Head */}
          <rect x="18" y="16" width="44" height="32" rx="14" fill="#FFFFFF" stroke="#93C5FD" strokeWidth="2.5" />
          {/* Screen Visor */}
          <rect x="24" y="22" width="32" height="18" rx="8" fill="#0F172A" />
          {/* Glowing Cyan Eyes */}
          <circle cx="33" cy="31" r="4" fill="#38BDF8" />
          <circle cx="47" cy="31" r="4" fill="#38BDF8" />
          {/* Robot Body & Laptop */}
          <rect x="24" y="50" width="32" height="20" rx="8" fill="#EFF6FF" stroke="#60A5FA" strokeWidth="2" />
          <rect x="34" y="54" width="28" height="16" rx="3" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
        </svg>
      );
    case 'scholarship':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* Golden Trophy with Graduation Cap */}
          <path
            d="M24 30H56L52 54C50 62 45 66 40 66C35 66 30 62 28 54L24 30Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          <polygon points="40,36 43,43 50,44 45,49 46,56 40,52 34,56 35,49 30,44 37,43" fill="#FFFBEB" />
          <rect x="35" y="65" width="10" height="7" fill="#CA8A04" />
          <rect x="26" y="71" width="28" height="6" rx="3" fill="#78350F" />
          {/* Cap on Top */}
          <polygon points="40,10 14,20 40,30 66,20" fill="#0F172A" />
          <circle cx="60" cy="28" r="2.5" fill="#FACC15" />
        </svg>
      );
    case 'moral':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <rect x="16" y="14" width="48" height="54" rx="8" fill="#F97316" stroke="#FFFFFF" strokeWidth="2.5" />
          <path
            d="M40 48C40 48 26 39 26 30C26 25 30 22 35 22C38 22 40 24 40 26C40 24 42 22 45 22C50 22 54 25 54 30C54 39 40 48 40 48Z"
            fill="#FEF08A"
          />
          <path d="M24 58H56" stroke="#FFFBEB" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'gk':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          {/* 3D Earth Globe */}
          <circle cx="38" cy="36" r="22" fill="#0EA5E9" stroke="#FFFFFF" strokeWidth="2.5" />
          <path d="M26 26C32 22 42 26 46 34C48 40 40 48 30 46C24 44 22 32 26 26Z" fill="#22C55E" />
          <path d="M52 52L66 66" stroke="#F59E0B" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'writing':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <rect x="14" y="14" width="44" height="54" rx="6" fill="#FFFFFF" stroke="#F43F5E" strokeWidth="2.5" />
          <line x1="22" y1="28" x2="50" y2="28" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="38" x2="46" y2="38" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="48" x2="40" y2="48" stroke="#FDA4AF" strokeWidth="3" strokeLinecap="round" />
          <path d="M44 56L66 20" stroke="#E11D48" strokeWidth="6" strokeLinecap="round" />
        </svg>
      );
    case 'memory':
      return (
        <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
          <rect x="12" y="18" width="32" height="44" rx="6" fill="#8B5CF6" stroke="#FFFFFF" strokeWidth="2.5" />
          <rect x="34" y="14" width="34" height="46" rx="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2.5" />
          <polygon points="51,24 54,32 63,33 56,39 58,47 51,42 44,47 46,39 39,33 48,32" fill="#FFFFFF" />
        </svg>
      );
  }
};

export const KeepGoingStarMascot: React.FC<{ className?: string }> = ({
  className = 'w-28 h-28',
}) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
    {/* Big Golden Star */}
    <polygon
      points="60,18 73,44 102,48 81,68 86,96 60,83 34,96 39,68 18,48 47,44"
      fill="#FACC15"
      stroke="#CA8A04"
      strokeWidth="2.5"
    />
    {/* Graduation Cap on Star */}
    <polygon points="60,6 28,18 60,30 92,18" fill="#1E3A8A" />
    <path d="M84 21V34" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    {/* Cute Eyes & Smile */}
    <circle cx="51" cy="54" r="3.5" fill="#0F172A" />
    <circle cx="69" cy="54" r="3.5" fill="#0F172A" />
    <path d="M52 65Q60 72 68 65" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" fill="none" />
    {/* Keep Going Ribbon */}
    <rect x="10" y="92" width="100" height="22" rx="6" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="2" />
    <text
      x="60"
      y="107"
      textAnchor="middle"
      fill="#0F172A"
      fontWeight="900"
      fontSize="12"
      fontFamily="sans-serif"
    >
      Keep Going!
    </text>
  </svg>
);

export const DailyChallengeBoyMascot: React.FC<{ className?: string }> = ({
  className = 'w-28 h-28',
}) => (
  <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
    {/* Cheering Schoolboy */}
    <circle cx="60" cy="46" r="26" fill="#FDBA74" />
    <path d="M34 42C34 22 52 14 72 18C86 20 90 34 86 44C78 32 62 28 46 32Z" fill="#27170E" />
    <circle cx="50" cy="46" r="3.5" fill="#0F172A" />
    <circle cx="70" cy="46" r="3.5" fill="#0F172A" />
    <path d="M50 56Q60 66 70 56Z" fill="#991B1B" />
    {/* Red T-Shirt & Cheering Arms */}
    <path d="M32 78C32 70 44 66 60 66C76 66 88 70 88 78V114H32V78Z" fill="#EF4444" />
    <path d="M32 82L16 62" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" />
    <path d="M88 82L104 62" stroke="#FDBA74" strokeWidth="10" strokeLinecap="round" />
  </svg>
);

export const ScholarshipChampionBannerSvg: React.FC<{ className?: string }> = ({
  className = 'w-full h-full',
}) => (
  <svg viewBox="0 0 900 180" fill="none" className={className} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="900" y2="180" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="50%" stopColor="#FEF9C3" />
        <stop offset="100%" stopColor="#BAE6FD" />
      </linearGradient>
    </defs>
    <rect width="900" height="180" fill="url(#skyGrad)" />

    {/* Left: Indian Heritage Fort Illustration */}
    <g transform="translate(16, 28)">
      <rect x="20" y="52" width="190" height="100" fill="#C2410C" />
      <rect x="0" y="36" width="38" height="116" fill="#9A3412" />
      <rect x="192" y="36" width="38" height="116" fill="#9A3412" />
      {/* Domes */}
      <path d="M60 52C60 24 92 24 92 52Z" fill="#EA580C" />
      <path d="M138 52C138 24 170 24 170 52Z" fill="#EA580C" />
      {/* Arches */}
      <path d="M95 152V96C95 82 135 82 135 96V152Z" fill="#431407" />
      <path d="M45 152V108C45 98 72 98 72 108V152Z" fill="#7C2D12" />
      <path d="M158 152V108C158 98 185 98 185 108V152Z" fill="#7C2D12" />
      {/* Green Trees */}
      <circle cx="18" cy="144" r="22" fill="#15803D" />
      <circle cx="220" cy="144" r="24" fill="#16A34A" />
    </g>

    {/* Right: Cheering Students Silhouette + Indian Tricolour Flag */}
    <g transform="translate(650, 14)">
      {/* Flagpole & Indian Flag */}
      <line x1="90" y1="16" x2="72" y2="145" stroke="#78350F" strokeWidth="4" />
      <g transform="rotate(-6 90 16)">
        <rect x="90" y="16" width="84" height="16" fill="#F97316" />
        <rect x="90" y="32" width="84" height="16" fill="#FFFFFF" />
        <rect x="90" y="48" width="84" height="16" fill="#16A34A" />
        <circle cx="132" cy="40" r="6.5" stroke="#1D4ED8" strokeWidth="1.8" fill="none" />
      </g>
      {/* Cheering Student Silhouettes */}
      <circle cx="35" cy="126" r="14" fill="#0F172A" />
      <path d="M16 166C16 146 54 146 54 166Z" fill="#0F172A" />
      <path d="M18 148L6 122" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

      <circle cx="95" cy="120" r="15" fill="#1E3A8A" />
      <path d="M74 166C74 144 116 144 116 166Z" fill="#1E3A8A" />
      <path d="M78 144L64 114" stroke="#1E3A8A" strokeWidth="6" strokeLinecap="round" />

      <circle cx="155" cy="124" r="14" fill="#0F172A" />
      <path d="M136 166C136 146 174 146 174 166Z" fill="#0F172A" />
      <path d="M170 144L184 116" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

      <circle cx="210" cy="128" r="13" fill="#1E3A8A" />
      <path d="M192 166C192 148 228 148 228 166Z" fill="#1E3A8A" />
    </g>
  </svg>
);
