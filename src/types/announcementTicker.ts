export type AnnouncementTickerCategory =
  | 'UPDATE'
  | 'EXAM'
  | 'SYLLABUS'
  | 'SCHOLARSHIP'
  | 'OFFER'
  | 'NOTICE';

export type AnnouncementTickerAudience = 'all' | 'website' | 'students' | 'teachers';

export type AnnouncementTickerSpeed = 'slow' | 'normal' | 'fast';

export type AnnouncementTickerActionTarget =
  | 'none'
  | 'study-materials'
  | 'worksheets'
  | 'scholarship'
  | 'tet-ctet'
  | 'lesson-planner'
  | 'demo'
  | 'referrals'
  | 'membership';

export interface LiveAnnouncementTickerItem {
  id: string;
  message: string;
  category: AnnouncementTickerCategory;
  audience: AnnouncementTickerAudience;
  active: boolean;
  actionLabel?: string;
  actionTarget?: AnnouncementTickerActionTarget;
  expiresAt?: string; // Optional YYYY-MM-DD
  createdAt: string;
}

export interface LiveAnnouncementTickerConfig {
  enabled: boolean;
  speed: AnnouncementTickerSpeed;
  pauseOnHover: boolean;
  items: LiveAnnouncementTickerItem[];
  updatedAt?: string;
}

export const LIVE_TICKER_STORAGE_KEY = 'msz_live_announcement_ticker_v1';
export const LIVE_TICKER_UPDATED_EVENT = 'msz:live-ticker-updated';

export const TICKER_CATEGORY_LABELS: Record<AnnouncementTickerCategory, string> = {
  UPDATE: 'Update',
  EXAM: 'Exam Alert',
  SYLLABUS: 'Syllabus',
  SCHOLARSHIP: 'Scholarship',
  OFFER: 'Plan Offer',
  NOTICE: 'Notice',
};

export const TICKER_ACTION_OPTIONS: Array<{
  value: AnnouncementTickerActionTarget;
  label: string;
}> = [
  { value: 'none', label: 'No Link Button' },
  { value: 'study-materials', label: 'Open Study Library' },
  { value: 'worksheets', label: 'Open Worksheets' },
  { value: 'scholarship', label: 'Open MSCE Scholarship' },
  { value: 'tet-ctet', label: 'Open TET & CTET Zone' },
  { value: 'lesson-planner', label: 'Open Teacher Lesson Planner' },
  { value: 'demo', label: 'Open Free Demo Tests' },
  { value: 'referrals', label: 'Open Refer & Earn' },
  { value: 'membership', label: 'Open Annual Plans' },
];

export const DEFAULT_LIVE_ANNOUNCEMENT_TICKER_CONFIG: LiveAnnouncementTickerConfig = {
  enabled: true,
  speed: 'normal',
  pauseOnHover: true,
  items: [
    {
      id: 'ann_verified_syllabus_2026',
      message:
        'Official Board Syllabus Verified: 157 Maharashtra State Board, CBSE & ICSE subjects with 2,518 textbook chapters now active across Study Library, Worksheets & Lesson Planner.',
      category: 'SYLLABUS',
      audience: 'all',
      active: true,
      actionLabel: 'Explore Study Library',
      actionTarget: 'study-materials',
      createdAt: '2026-11-23T08:00:00.000Z',
    },
    {
      id: 'ann_msce_scholarship_2026',
      message:
        'MSCE Pune Scholarship Mock Exams for Std 4th (PSE) & Std 7th (UPS) are live in Marathi, English & Hindi mediums.',
      category: 'SCHOLARSHIP',
      audience: 'students',
      active: true,
      actionLabel: 'Practice Scholarship',
      actionTarget: 'scholarship',
      createdAt: '2026-11-23T08:00:00.000Z',
    },
    {
      id: 'ann_teacher_planner_2026',
      message:
        'Automatic Teacher Lesson Planner: Generate Annual, Monthly & Daily A4 printable plans aligned to verified board calendars.',
      category: 'UPDATE',
      audience: 'teachers',
      active: true,
      actionLabel: 'Open Lesson Planner',
      actionTarget: 'lesson-planner',
      createdAt: '2026-11-23T08:00:00.000Z',
    },
    {
      id: 'ann_annual_plan_offer_2026',
      message:
        'Annual Board & Class Learning Pass available at ₹99/year — full worksheets, quizzes & study notes for your selected board and class.',
      category: 'OFFER',
      audience: 'website',
      active: true,
      actionLabel: 'View Plans',
      actionTarget: 'membership',
      createdAt: '2026-11-23T08:00:00.000Z',
    },
  ],
};

const VALID_CATEGORIES = new Set<AnnouncementTickerCategory>([
  'UPDATE',
  'EXAM',
  'SYLLABUS',
  'SCHOLARSHIP',
  'OFFER',
  'NOTICE',
]);

const VALID_AUDIENCES = new Set<AnnouncementTickerAudience>([
  'all',
  'website',
  'students',
  'teachers',
]);

const VALID_SPEEDS = new Set<AnnouncementTickerSpeed>(['slow', 'normal', 'fast']);

const VALID_ACTIONS = new Set<AnnouncementTickerActionTarget>([
  'none',
  'study-materials',
  'worksheets',
  'scholarship',
  'tet-ctet',
  'lesson-planner',
  'demo',
  'referrals',
  'membership',
]);

export function sanitizeAnnouncementTickerConfig(raw: unknown): LiveAnnouncementTickerConfig {
  if (!raw || typeof raw !== 'object') {
    return DEFAULT_LIVE_ANNOUNCEMENT_TICKER_CONFIG;
  }
  const obj = raw as Record<string, unknown>;
  const enabled = typeof obj.enabled === 'boolean' ? obj.enabled : true;
  const speed = VALID_SPEEDS.has(obj.speed as AnnouncementTickerSpeed)
    ? (obj.speed as AnnouncementTickerSpeed)
    : 'normal';
  const pauseOnHover = typeof obj.pauseOnHover === 'boolean' ? obj.pauseOnHover : true;

  const rawItems = Array.isArray(obj.items) ? obj.items : [];
  const cleanItems: LiveAnnouncementTickerItem[] = [];

  for (const entry of rawItems.slice(0, 25)) {
    if (!entry || typeof entry !== 'object') continue;
    const item = entry as Record<string, unknown>;
    const message = String(item.message ?? '').trim().slice(0, 240);
    if (!message) continue;
    const id = String(item.id ?? `ann_${cleanItems.length + 1}`)
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 80);
    const category = VALID_CATEGORIES.has(item.category as AnnouncementTickerCategory)
      ? (item.category as AnnouncementTickerCategory)
      : 'UPDATE';
    const audience = VALID_AUDIENCES.has(item.audience as AnnouncementTickerAudience)
      ? (item.audience as AnnouncementTickerAudience)
      : 'all';
    const active = typeof item.active === 'boolean' ? item.active : true;
    const actionTarget = VALID_ACTIONS.has(item.actionTarget as AnnouncementTickerActionTarget)
      ? (item.actionTarget as AnnouncementTickerActionTarget)
      : 'none';
    const actionLabel =
      actionTarget !== 'none'
        ? String(item.actionLabel ?? '').trim().slice(0, 40) || undefined
        : undefined;
    const expiresAtRaw = String(item.expiresAt ?? '').trim();
    const expiresAt = /^\d{4}-\d{2}-\d{2}$/.test(expiresAtRaw) ? expiresAtRaw : undefined;
    const createdAt =
      typeof item.createdAt === 'string' && item.createdAt.length <= 40
        ? item.createdAt
        : new Date().toISOString();

    cleanItems.push({
      id,
      message,
      category,
      audience,
      active,
      actionLabel,
      actionTarget,
      expiresAt,
      createdAt,
    });
  }

  return {
    enabled,
    speed,
    pauseOnHover,
    items: cleanItems,
    updatedAt: typeof obj.updatedAt === 'string' ? obj.updatedAt : undefined,
  };
}

export function filterActiveTickerItemsForAudience(
  config: LiveAnnouncementTickerConfig,
  viewerAudience: 'website' | 'students' | 'teachers',
  todayIso?: string
): LiveAnnouncementTickerItem[] {
  if (!config.enabled) return [];
  const today = todayIso || new Date().toISOString().slice(0, 10);
  return config.items.filter((item) => {
    if (!item.active) return false;
    if (item.audience !== 'all' && item.audience !== viewerAudience) return false;
    if (item.expiresAt && item.expiresAt < today) return false;
    return true;
  });
}

export function readCachedTickerConfig(): LiveAnnouncementTickerConfig {
  try {
    if (typeof localStorage === 'undefined') return DEFAULT_LIVE_ANNOUNCEMENT_TICKER_CONFIG;
    const raw = localStorage.getItem(LIVE_TICKER_STORAGE_KEY);
    if (!raw) return DEFAULT_LIVE_ANNOUNCEMENT_TICKER_CONFIG;
    return sanitizeAnnouncementTickerConfig(JSON.parse(raw));
  } catch {
    return DEFAULT_LIVE_ANNOUNCEMENT_TICKER_CONFIG;
  }
}

export function writeCachedTickerConfig(config: LiveAnnouncementTickerConfig): void {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(LIVE_TICKER_STORAGE_KEY, JSON.stringify(config));
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(LIVE_TICKER_UPDATED_EVENT, { detail: config }));
    }
  } catch {
    // ignore storage quota errors
  }
}
