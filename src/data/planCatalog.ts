export type CategoryId =
  | 'scholarship_4th'
  | 'scholarship_7th'
  | 'maha_tet'
  | 'ctet_paper_1'
  | 'ctet_paper_2'
  | 'all_classes';

export type PlanSkuId =
  | 'BOARD_CLASS'
  | 'SCHOLARSHIP_4TH'
  | 'SCHOLARSHIP_7TH'
  | 'MAHA_TET'
  | 'CTET_PAPER_1'
  | 'CTET_PAPER_2'
  | 'SCHOLARSHIP_COMBO'
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
  amountInr: number;
  amountPaise: number;
  validityDays: number;
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

export const VALID_PLAN_AMOUNTS_INR: number[] = [99, 149, 229, 299, 499];

export const PLAN_CATALOG: Record<PlanSkuId, PlanCatalogItem> = {
  BOARD_CLASS: {
    sku: 'BOARD_CLASS',
    title: 'Board & Class Annual Plan (Classes 1–10)',
    shortTitle: 'Class Annual Plan',
    subtitle: 'Full access for 1 selected Education Board & Class (All Subjects, Worksheets, Quizzes)',
    amountInr: 99,
    amountPaise: 9900,
    validityDays: 365,
    unlockedCategories: [],
    isCombo: false,
    requiresBoardClass: true,
    audience: 'all',
    badge: 'Most Popular',
    highlights: [
      'Unlocks all subjects, chapter notes & printable worksheets for 1 Board + Class',
      '4-Level Adaptive Quizzes, Brain Puzzles, Stories & Drawing Studio',
      '365 Days Full Annual Validity',
    ],
  },
  SCHOLARSHIP_4TH: {
    sku: 'SCHOLARSHIP_4TH',
    title: '4th Std MSCE Scholarship Plan (PSE)',
    shortTitle: '4th Scholarship',
    subtitle: '25 Full MSCE Mock Tests (Paper 1 & 2) + 10 Practice Sets (Marathi / English / Hindi)',
    amountInr: 99,
    amountPaise: 9900,
    validityDays: 365,
    unlockedCategories: ['scholarship_4th'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'all',
    badge: 'Std 4th PSE',
    highlights: [
      'All 25 Official Std. 4th MSCE Full Mock Exams (Paper 1 + Paper 2)',
      'All 10 Std. 4th Practice Sets with step-by-step solutions',
      'Marathi, English & Hindi Mediums · 365 Days Validity',
    ],
  },
  SCHOLARSHIP_7TH: {
    sku: 'SCHOLARSHIP_7TH',
    title: '7th Std MSCE Scholarship Plan (UPS)',
    shortTitle: '7th Scholarship',
    subtitle: '25 Full MSCE Mock Tests (Paper 1 & 2) + 10 Practice Sets (Marathi / English / Hindi)',
    amountInr: 99,
    amountPaise: 9900,
    validityDays: 365,
    unlockedCategories: ['scholarship_7th'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'all',
    badge: 'Std 7th UPS',
    highlights: [
      'All 25 Official Std. 7th MSCE Full Mock Exams (Paper 1 + Paper 2)',
      'All 10 Std. 7th Practice Sets with step-by-step solutions',
      'Marathi, English & Hindi Mediums · 365 Days Validity',
    ],
  },
  MAHA_TET: {
    sku: 'MAHA_TET',
    title: 'MAHA TET Complete Plan (Paper 1 & Paper 2)',
    shortTitle: 'MAHA TET',
    subtitle: '100 Full Mock Tests (50 P1 + 50 P2) + Subject Drills, Topic Tests, Revision & PYQs',
    amountInr: 149,
    amountPaise: 14900,
    validityDays: 365,
    unlockedCategories: ['maha_tet'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'MSCE Pune',
    highlights: [
      '50 Paper 1 (Classes 1–5) + 50 Paper 2 (Classes 6–8) Full Mock Exams',
      'Subject Practice Sets, Topic Mastery Drills, Revision & PYQ Patterns',
      'Marathi, English, Hindi & Urdu Languages · 365 Days Validity',
    ],
  },
  CTET_PAPER_1: {
    sku: 'CTET_PAPER_1',
    title: 'CTET Paper 1 Complete Plan (Classes 1–5)',
    shortTitle: 'CTET Paper 1',
    subtitle: '50 Full CBT Mock Tests + Subject Drills, Topic Practice & PYQ Simulations',
    amountInr: 149,
    amountPaise: 14900,
    validityDays: 365,
    unlockedCategories: ['ctet_paper_1'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'Primary Teacher',
    highlights: [
      '50 Full-Length 150-Question CTET Paper 1 CBT Mock Examinations',
      'NEP 2020 Competency, CDP & Bilingual Pedagogy Drills',
      '365 Days Full Annual Access',
    ],
  },
  CTET_PAPER_2: {
    sku: 'CTET_PAPER_2',
    title: 'CTET Paper 2 Complete Plan (Classes 6–8)',
    shortTitle: 'CTET Paper 2',
    subtitle: '50 Full CBT Mock Tests (Math/Science & Social Studies) + Topic Drills & PYQs',
    amountInr: 149,
    amountPaise: 14900,
    validityDays: 365,
    unlockedCategories: ['ctet_paper_2'],
    isCombo: false,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'Elementary Teacher',
    highlights: [
      '50 Full-Length CTET Paper 2 Mock Exams (Both Math/Science & Social Studies)',
      'Subject Drills, Topic Practice, Weak-Area Revision & PYQ Pattern Tests',
      '365 Days Full Annual Access',
    ],
  },
  SCHOLARSHIP_COMBO: {
    sku: 'SCHOLARSHIP_COMBO',
    title: '4th + 7th Scholarship Combined Plan',
    shortTitle: 'Scholarship Combo',
    subtitle: 'Complete access to BOTH 4th Std PSE & 7th Std UPS MSCE Scholarship Exams',
    amountInr: 149,
    amountPaise: 14900,
    validityDays: 365,
    unlockedCategories: ['scholarship_4th', 'scholarship_7th'],
    isCombo: true,
    requiresBoardClass: false,
    audience: 'all',
    badge: 'Save ₹49',
    highlights: [
      '50 Full Mock Tests (25 Std 4th + 25 Std 7th) + 20 Practice Sets',
      'Ideal for Teachers coaching Scholarship batches & multi-child families',
      '365 Days Combined Access',
    ],
  },
  CTET_COMBO: {
    sku: 'CTET_COMBO',
    title: 'CTET Paper 1 + Paper 2 Combo Plan',
    shortTitle: 'CTET Combo (P1+P2)',
    subtitle: '100 Full CBT Mock Tests across both Primary & Elementary CTET Papers',
    amountInr: 229,
    amountPaise: 22900,
    validityDays: 365,
    unlockedCategories: ['ctet_paper_1', 'ctet_paper_2'],
    isCombo: true,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'Save ₹69',
    highlights: [
      '50 CTET Paper 1 Mock Tests + 50 CTET Paper 2 Mock Tests (15,000 Qs)',
      'Complete Subject Practice, Topic Drills & Revision Sprints',
      '365 Days Combined Access',
    ],
  },
  TET_CTET_COMBO: {
    sku: 'TET_CTET_COMBO',
    title: 'All TET + CTET Master Combo (MAHA TET + CTET P1 & P2)',
    shortTitle: 'TET + CTET Combo',
    subtitle: 'All 200 Teacher Eligibility Mock Tests across MAHA TET & CTET Papers 1 & 2',
    amountInr: 299,
    amountPaise: 29900,
    validityDays: 365,
    unlockedCategories: ['maha_tet', 'ctet_paper_1', 'ctet_paper_2'],
    isCombo: true,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'Best Teacher Value',
    highlights: [
      'MAHA TET Paper 1 & 2 (100 Mocks) + CTET Paper 1 (50 Mocks) + CTET Paper 2 (50 Mocks)',
      'All Subject Drills, Topic Tests, Revision Sprints & PYQ Simulators',
      'Save ₹148 vs individual plans · 365 Days Access',
    ],
  },
  TEACHER_ALL_ACCESS: {
    sku: 'TEACHER_ALL_ACCESS',
    title: 'All-in-One Educator & Academy Bundle',
    shortTitle: 'All-Access Bundle',
    subtitle: 'Classes 1–10 (All Boards) + 4th & 7th Scholarship + MAHA TET + CTET P1 & P2',
    amountInr: 499,
    amountPaise: 49900,
    validityDays: 365,
    unlockedCategories: [
      'all_classes',
      'scholarship_4th',
      'scholarship_7th',
      'maha_tet',
      'ctet_paper_1',
      'ctet_paper_2',
    ],
    isCombo: true,
    requiresBoardClass: false,
    audience: 'teacher',
    badge: 'Complete Unlock',
    highlights: [
      'All Boards (Maharashtra, CBSE, ICSE) across Classes 1 to 10',
      'Both 4th Std & 7th Std MSCE Scholarship (50 Mocks + 20 Practice Sets)',
      'MAHA TET (P1 & P2) + CTET Paper 1 + CTET Paper 2 (200 Full Mocks)',
    ],
  },
};

export const PLAN_CATALOG_LIST: PlanCatalogItem[] = Object.values(PLAN_CATALOG);

const VALID_SKU_SET = new Set<string>(Object.keys(PLAN_CATALOG));

export function isValidPlanSku(val?: string | null): val is PlanSkuId {
  return Boolean(val && VALID_SKU_SET.has(String(val).trim().toUpperCase()));
}

export function getPlanCatalogItem(sku?: string | null): PlanCatalogItem {
  const normalized = String(sku || 'BOARD_CLASS').trim().toUpperCase();
  if (VALID_SKU_SET.has(normalized)) {
    return PLAN_CATALOG[normalized as PlanSkuId];
  }
  return PLAN_CATALOG.BOARD_CLASS;
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
  const planCandidate = String(rawPlanId || '').trim().toUpperCase();
  if (VALID_SKU_SET.has(planCandidate)) {
    return planCandidate as PlanSkuId;
  }
  if (typeof amountPaiseOrInr === 'number' && amountPaiseOrInr > 0) {
    const inr = amountPaiseOrInr >= 5000 ? Math.round(amountPaiseOrInr / 100) : Math.round(amountPaiseOrInr);
    if (inr === 499) return 'TEACHER_ALL_ACCESS';
    if (inr === 299) return 'TET_CTET_COMBO';
    if (inr === 229) return 'CTET_COMBO';
    // Note: ₹99 and ₹149 exist across multiple SKUs; always prefer explicit planSku from order notes!
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
      return 'SCHOLARSHIP_4TH';
    case 'scholarship_7th':
      return 'SCHOLARSHIP_7TH';
    case 'maha_tet':
      return 'MAHA_TET';
    case 'ctet_paper_1':
      return 'CTET_PAPER_1';
    case 'ctet_paper_2':
      return 'CTET_PAPER_2';
    case 'all_classes':
    default:
      return 'TEACHER_ALL_ACCESS';
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
