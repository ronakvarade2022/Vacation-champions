import { EducationBoard } from '../../types';

export interface EducationBoardMeta {
  id: EducationBoard;
  shortLabel: string;
  fullName: string;
  affiliationLabel: string;
  badgeText: string;
  badgeBgClass: string;
  badgeTextClass: string;
  badgeBorderClass: string;
  gradient: string;
  accentHex: string;
  icon: string;
  description: string;
  highlights: string[];
}

export const BOARD_META_LIST: EducationBoardMeta[] = [
  {
    id: 'Maharashtra',
    shortLabel: 'Maharashtra Board',
    fullName: 'Maharashtra State Board (MSBSHSE / Balbharati)',
    affiliationLabel: 'State Board • Classes 1 to 10 (SSC)',
    badgeText: 'MH State Board',
    badgeBgClass: 'bg-orange-50',
    badgeTextClass: 'text-orange-800',
    badgeBorderClass: 'border-orange-300',
    gradient: 'from-orange-500 to-amber-600',
    accentHex: '#ea580c',
    icon: '🚩',
    description:
      'Complete Maharashtra State Board & SSC curriculum with Balbharati Marathi, Hindi, MSCE Scholarship (Std 4 & 7), and SSC Algebra/Geometry.',
    highlights: [
      'Preserved Existing Syllabus & Question Banks',
      'Balbharati Marathi, Hindi & MSCE Scholarship Ready',
      'SSC Class 10 Algebra & Geometry Split Papers'
    ]
  },
  {
    id: 'CBSE',
    shortLabel: 'CBSE (NCERT)',
    fullName: 'Central Board of Secondary Education (CBSE / NCERT)',
    affiliationLabel: 'NCERT & NCF-SE • Classes 1 to 10',
    badgeText: 'CBSE • NCERT',
    badgeBgClass: 'bg-blue-50',
    badgeTextClass: 'text-blue-800',
    badgeBorderClass: 'border-blue-300',
    gradient: 'from-blue-600 to-indigo-600',
    accentHex: '#2563eb',
    icon: '📘',
    description:
      'Aligned with latest NCERT & NCF-SE textbooks including Joyful Math, Mridang, Ganita Prakash, Curiosity Science, Poorvi & Board Exam Science/Social Science.',
    highlights: [
      'NCERT & NCF-SE 2023–2026 Aligned Textbooks',
      'Competency-Based & Assertion-Reasoning Practice',
      'Integrated Class 9–10 Math, Science & Social Science'
    ]
  },
  {
    id: 'ICSE',
    shortLabel: 'ICSE (CISCE)',
    fullName: 'Council for the Indian School Certificate Examinations (CISCE / ICSE)',
    affiliationLabel: 'CISCE Curriculum • Classes 1 to 10',
    badgeText: 'ICSE • CISCE',
    badgeBgClass: 'bg-emerald-50',
    badgeTextClass: 'text-emerald-800',
    badgeBorderClass: 'border-emerald-300',
    gradient: 'from-emerald-600 to-teal-700',
    accentHex: '#059669',
    icon: '🎓',
    description:
      'Structured CISCE curriculum featuring separate Physics, Chemistry & Biology from Class 6, History & Civics, Computer Studies / Java Applications & Group I–III subjects.',
    highlights: [
      'Separate Physics, Chemistry & Biology (Std 6–10)',
      'CISCE Group I, II & III Subject Structure',
      'Commercial Math, GST, Java OOP & Grammar Depth'
    ]
  }
];

export const BOARD_META_MAP: Record<EducationBoard, EducationBoardMeta> = {
  Maharashtra: BOARD_META_LIST[0],
  CBSE: BOARD_META_LIST[1],
  ICSE: BOARD_META_LIST[2]
};

export function getEducationBoardMeta(board?: string | null): EducationBoardMeta {
  if (board === 'CBSE') return BOARD_META_MAP.CBSE;
  if (board === 'ICSE') return BOARD_META_MAP.ICSE;
  return BOARD_META_MAP.Maharashtra;
}
