export type CategoryId =
  | 'scholarship_4th'
  | 'scholarship_7th'
  | 'maha_tet'
  | 'ctet_paper_1'
  | 'ctet_paper_2'
  | 'all_classes';

export type PlanSkuId =
  // Active Purchase Plans
  | 'BOARD_CLASS'
  | 'TET_6M'
  | 'CTET_6M'
  | 'TET_CTET_COMBO_6M'
  | 'TET_1Y'
  | 'CTET_1Y'
  | 'TET_CTET_COMBO_1Y'
  | 'SCHOLARSHIP_COMBO'
  // Legacy aliases for historical database records & backward compatibility
  | 'SCHOLARSHIP_4TH'
  | 'SCHOLARSHIP_7TH'
  | 'MAHA_TET'
  | 'CTET_PAPER_1'
  | 'CTET_PAPER_2'
  | 'CTET_COMBO'
  | 'TET_CTET_COMBO'
  | 'TEACHER_ALL_ACCESS';

export interface CategorySubscriptionRecord {
  categoryId: CategoryId;
  planSku: PlanSkuId;
  status: 'ACTIVE' | 'EXPIRED';
  purchasedAt: string;
  expiresAt: string;
  paymentId?: string;
  orderId?: string;
  amountInr: number;
  validityDays: number;
  updatedAt?: string;
}

export interface PlanCatalogItem {
  sku: PlanSkuId;
  title: string;
  shortTitle: string;
  subtitle: string;
  originalAmountInr: number;
  amountInr: number;
  amountPaise: number;
  discountPercent: number;
  discountBadge: string;
  validityDays: number;
  validityMonths: number;
  validityLabel: string;
  unlockedCategories: CategoryId[];
  isCombo: boolean;
  requiresBoardClass: boolean;
  audience: 'student' | 'teacher' | 'all';
  badge?: string;
  highlights: string[];
}

export const ALL_CATEGORY_IDS: CategoryId[] = [
  'scholarship_4th',
  'scholarship_7th',
  'maha_tet',
  'ctet_paper_1',
  'ctet_paper_2',
  'all_classes',
];

export const VALID_PLAN_AMOUNTS_INR: number[] = [99, 199, 299, 349, 499];

export const PLAN_CATALOG: Record<
  | 'BOARD_CLASS'
  | 'TET_6M'
  | 'CTET_6M'
  | 'TET_CTET_COMBO_6M'
  | 'TET_1Y'
  | 'CTET_1Y'
  | 'TET_CTET_COMBO_1Y'
  | 'SCHOLARSHIP_COMBO',
  PlanCatalogItem
> = {
  // CLASS PLANS (CLASSES 1 TO 10) - Rs. 99
  BOARD_CLASS: {
    sku: 'BOARD_CLASS',
    title: 'Board & Class Annual Plan (Classes 1–10)',
    shortTitle: 'Class Annual Plan',
    subtitle: 'Full access for 1 selected Education Board & Class (All Subjects, Worksheets, Quizzes)',
    originalAmountInr: 199,
    amountInr: 99,
    amountPaise: 9900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 365,
    validityMonths: 12,
    validityLabel: '12 Months (1 Year)',
    unlockedCategories: [],
    isCombo: false,
    requiresBoardClass: true,
    audience: 'all',
    badge: 'Most Popular',
    highlights: [
      'Unlocks all subjects, chapter notes & printable worksheets for 1 Board + Class',
      '4-Level Adaptive Quizzes, Brain Puzzles, Stories & Drawing Studio',
      'Automatic MSCE Scholarship Access for Class 4 & Class 7 at no extra charge',
      '365 Days Full Annual Validity',
    ],
  },

  // 6 MONTH PLANS (180 DAYS)
  // Plan 1: TET – 6 Months
  TET_6M: {
    sku: 'TET_6M',
    title: 'TET (Paper 1 & 2) – 6 Months',
    shortTitle: 'TET (6 Months)',
    subtitle: 'MAHA TET Paper 1 & Paper 2: 100 Full Mocks, Study Notes, Subject Drills & Revision Sets',
    originalAmountInr: 399,
    amountInr: 199,
    amountPaise: 19900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 180,
    validityMonths: 6,
    validityLabel: '6 Months',
    unlockedCategories: ['maha_tet'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: '6 Months Plan',
    highlights: [
      '50 Paper 1 (Classes 1–5) + 50 Paper 2 (Classes 6–8) Full Mock Exams',
      'Subject Practice Sets, Topic Mastery Drills & Revision Sprints',
      'Marathi, English, Hindi & Urdu Mediums',
      '180 Days (6 Months) Validity',
    ],
  },

  // Plan 2: CTET – 6 Months
  CTET_6M: {
    sku: 'CTET_6M',
    title: 'CTET (Paper 1 & 2) – 6 Months',
    shortTitle: 'CTET (6 Months)',
    subtitle: 'CTET Paper 1 & Paper 2: 100 Full CBT Mocks (Math/Science & Social Studies)',
    originalAmountInr: 399,
    amountInr: 199,
    amountPaise: 19900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 180,
    validityMonths: 6,
    validityLabel: '6 Months',
    unlockedCategories: ['ctet_paper_1', 'ctet_paper_2'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: '6 Months Plan',
    highlights: [
      '50 Paper 1 + 50 Paper 2 CBT Mock Examinations (15,000 Questions)',
      'NEP 2020 Pedagogical Framework & Bilingual CDPs',
      'Both Math/Science and Social Studies Streams Included',
      '180 Days (6 Months) Validity',
    ],
  },

  // Plan 3: TET + CTET COMBO – 6 Months
  TET_CTET_COMBO_6M: {
    sku: 'TET_CTET_COMBO_6M',
    title: 'Combo Offer: TET + CTET (Paper 1 & 2) – 6 Months',
    shortTitle: 'TET + CTET Combo (6M)',
    subtitle: 'Combined access to MAHA TET (P1+P2) and CTET (P1+P2) – 200 Mock Tests',
    originalAmountInr: 699,
    amountInr: 349,
    amountPaise: 34900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 180,
    validityMonths: 6,
    validityLabel: '6 Months',
    unlockedCategories: ['maha_tet', 'ctet_paper_1', 'ctet_paper_2'],
    isCombo: true,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'Best 6M Value',
    highlights: [
      'All 200 Mock Exams: 100 MAHA TET + 100 CTET Papers',
      'Full Subject Drills, Topic Revision & PYQ Simulators',
      'Save ₹350 vs original price',
      '180 Days (6 Months) Combined Validity',
    ],
  },

  // 1 YEAR PLANS (365 DAYS / 12 MONTHS)
  // Plan 4: TET – 1 Year
  TET_1Y: {
    sku: 'TET_1Y',
    title: 'TET (Paper 1 & 2) – 1 Year',
    shortTitle: 'TET (1 Year)',
    subtitle: 'MAHA TET Paper 1 & Paper 2: 100 Full Mocks, Study Notes, Subject Drills & Revision Sets',
    originalAmountInr: 599,
    amountInr: 299,
    amountPaise: 29900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 365,
    validityMonths: 12,
    validityLabel: '1 Year',
    unlockedCategories: ['maha_tet'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: '1 Year Plan',
    highlights: [
      '50 Paper 1 + 50 Paper 2 Full Mock Exams (15,000 Questions)',
      'MSCE Pune Syllabus, Topic Drills & PYQ Simulators',
      'Marathi, English, Hindi & Urdu Mediums',
      '365 Days (1 Year) Full Validity',
    ],
  },

  // Plan 5: CTET – 1 Year
  CTET_1Y: {
    sku: 'CTET_1Y',
    title: 'CTET (Paper 1 & 2) – 1 Year',
    shortTitle: 'CTET (1 Year)',
    subtitle: 'CTET Paper 1 & Paper 2: 100 Full CBT Mocks (Math/Science & Social Studies)',
    originalAmountInr: 599,
    amountInr: 299,
    amountPaise: 29900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 365,
    validityMonths: 12,
    validityLabel: '1 Year',
    unlockedCategories: ['ctet_paper_1', 'ctet_paper_2'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: '1 Year Plan',
    highlights: [
      '50 Paper 1 + 50 Paper 2 CBT Mock Examinations (15,000 Questions)',
      'CBSE Competency Patterns, Pedagogy Drills & Weak-Area Revision',
      'Both Math/Science & Social Studies Streams Included',
      '365 Days (1 Year) Full Validity',
    ],
  },

  // Plan 6: TET + CTET COMBO – 1 Year
  TET_CTET_COMBO_1Y: {
    sku: 'TET_CTET_COMBO_1Y',
    title: 'Combo Offer: TET + CTET (Paper 1 & 2) – 1 Year',
    shortTitle: 'TET + CTET Combo (1Y)',
    subtitle: 'All 200 Teacher Eligibility Mock Tests across MAHA TET & CTET Papers 1 & 2',
    originalAmountInr: 999,
    amountInr: 499,
    amountPaise: 49900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 365,
    validityMonths: 12,
    validityLabel: '12 Months',
    unlockedCategories: ['maha_tet', 'ctet_paper_1', 'ctet_paper_2'],
    isCombo: true,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'Best Annual Value',
    highlights: [
      'MAHA TET Paper 1 & 2 (100 Mocks) + CTET Paper 1 & 2 (100 Mocks)',
      'All 200 Mock Tests with Detailed Step-by-Step Solutions',
      'Save ₹500 vs original price',
      '365 Days (12 Months) Full Annual Access',
    ],
  },

  // SCHOLARSHIP PLAN
  // Plan 7: Scholarship Combo – Class 4 + Class 7
  SCHOLARSHIP_COMBO: {
    sku: 'SCHOLARSHIP_COMBO',
    title: 'Scholarship Combo – Class 4 + Class 7',
    shortTitle: 'Scholarship Combo (4th + 7th)',
    subtitle: 'Complete access to BOTH 4th Std PSE & 7th Std UPS MSCE Scholarship Exams',
    originalAmountInr: 199,
    amountInr: 99,
    amountPaise: 9900,
    discountPercent: 50,
    discountBadge: 'SAVE 50%',
    validityDays: 365,
    validityMonths: 12,
    validityLabel: '12 Months',
    unlockedCategories: ['scholarship_4th', 'scholarship_7th'],
    isCombo: true,
    requiresBoardClass: false,
    audience: 'all',
    badge: 'Std 4th + 7th Combo',
    highlights: [
      '50 Full MSCE Mock Exams (25 Std 4th + 25 Std 7th) with Paper 1 & Paper 2',
      '20 Full Practice Sets with Step-by-Step Solutions',
      'Marathi, English & Hindi Mediums',
      'Ideal for Teachers, Coaching Institutes & Multi-Child Families',
      '365 Days (12 Months) Full Validity',
    ],
  },
};

export const PLAN_CATALOG_LIST: PlanCatalogItem[] = Object.values(PLAN_CATALOG);

const VALID_SKU_SET = new Set<string>(Object.keys(PLAN_CATALOG));

export function isValidPlanSku(val?: string | null): val is PlanSkuId {
  const norm = String(val || '').trim().toUpperCase();
  return Boolean(norm && (VALID_SKU_SET.has(norm) || isLegacySku(norm)));
}

function isLegacySku(val: string): boolean {
  return [
    'SCHOLARSHIP_4TH',
    'SCHOLARSHIP_7TH',
    'MAHA_TET',
    'CTET_PAPER_1',
    'CTET_PAPER_2',
    'CTET_COMBO',
    'TET_CTET_COMBO',
    'TEACHER_ALL_ACCESS',
  ].includes(val);
}

export function getPlanCatalogItem(sku?: string | null): PlanCatalogItem {
  const resolved = resolvePlanSku(sku);
  return (PLAN_CATALOG as Record<string, PlanCatalogItem>)[resolved] || PLAN_CATALOG.BOARD_CLASS;
}

export function resolvePlanSku(
  rawSku?: string | null,
  rawPlanId?: string | null,
  amountPaiseOrInr?: number
): PlanSkuId {
  const candidate = String(rawSku || '').trim().toUpperCase();
  if (VALID_SKU_SET.has(candidate)) {
    return candidate as PlanSkuId;
  }

  // Gracefully map legacy SKUs to the new plans
  if (candidate === 'MAHA_TET') return 'TET_1Y';
  if (candidate === 'CTET_PAPER_1' || candidate === 'CTET_PAPER_2' || candidate === 'CTET_COMBO') return 'CTET_1Y';
  if (candidate === 'TET_CTET_COMBO') return 'TET_CTET_COMBO_1Y';
  if (candidate === 'TEACHER_ALL_ACCESS') return 'TET_CTET_COMBO_1Y';
  if (candidate === 'SCHOLARSHIP_4TH' || candidate === 'SCHOLARSHIP_7TH') return 'SCHOLARSHIP_COMBO';

  const planCandidate = String(rawPlanId || '').trim().toUpperCase();
  if (VALID_SKU_SET.has(planCandidate)) {
    return planCandidate as PlanSkuId;
  }
  if (planCandidate === 'MAHA_TET') return 'TET_1Y';
  if (planCandidate === 'CTET_PAPER_1' || planCandidate === 'CTET_PAPER_2' || planCandidate === 'CTET_COMBO') return 'CTET_1Y';
  if (planCandidate === 'TET_CTET_COMBO') return 'TET_CTET_COMBO_1Y';
  if (planCandidate === 'TEACHER_ALL_ACCESS') return 'TET_CTET_COMBO_1Y';
  if (planCandidate === 'SCHOLARSHIP_4TH' || planCandidate === 'SCHOLARSHIP_7TH') return 'SCHOLARSHIP_COMBO';

  if (typeof amountPaiseOrInr === 'number' && amountPaiseOrInr > 0) {
    const inr = amountPaiseOrInr >= 5000 ? Math.round(amountPaiseOrInr / 100) : Math.round(amountPaiseOrInr);
    if (inr === 499) return 'TET_CTET_COMBO_1Y';
    if (inr === 349) return 'TET_CTET_COMBO_6M';
    if (inr === 299) return 'TET_1Y';
    if (inr === 199) return 'TET_6M';
    if (inr === 99) return 'BOARD_CLASS';
  }

  return 'BOARD_CLASS';
}

export function getModuleRequiredCategoryId(moduleId: string): CategoryId {
  const m = String(moduleId || '').toUpperCase();
  if (m === 'MAHA_TET_P1' || m === 'MAHA_TET_P2') return 'maha_tet';
  if (m === 'CTET_P1') return 'ctet_paper_1';
  return 'ctet_paper_2';
}

export function getDefaultPlanSkuForCategory(cat: CategoryId): PlanSkuId {
  switch (cat) {
    case 'scholarship_4th':
    case 'scholarship_7th':
      return 'SCHOLARSHIP_COMBO';
    case 'maha_tet':
      return 'TET_1Y';
    case 'ctet_paper_1':
    case 'ctet_paper_2':
      return 'CTET_1Y';
    case 'all_classes':
    default:
      return 'TET_CTET_COMBO_1Y';
  }
}

export function formatCategoryShortLabel(catId: CategoryId): string {
  switch (catId) {
    case 'scholarship_4th':
      return '4th Scholarship';
    case 'scholarship_7th':
      return '7th Scholarship';
    case 'maha_tet':
      return 'MAHA TET';
    case 'ctet_paper_1':
      return 'CTET Paper 1';
    case 'ctet_paper_2':
      return 'CTET Paper 2';
    case 'all_classes':
      return 'Classes 1–10 (All Boards)';
    default:
      return String(catId);
  }
}

export function formatCategoriesListLabel(cats: CategoryId[]): string {
  if (!cats || cats.length === 0) return '';
  return cats.map(formatCategoryShortLabel).join(' + ');
}
