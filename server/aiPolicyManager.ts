import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

export const GEMINI_FREE_PRIMARY_MODEL = 'gemini-4-hydrogen';
export const GEMINI_FREE_FALLBACK_MODEL = 'gemini-3.1-flash-lite';
export const GEMINI_PAID_IMAGE_MODEL = 'gemini-3.1-flash-lite-image';

/**
 * Strictly verified Google Gemini API Free-Tier eligible models.
 * Any model NOT in this allowlist is technically blocked from execution in FREE_ONLY mode.
 */
export const VERIFIED_FREE_GEMINI_MODELS = new Set<string>([
  GEMINI_FREE_PRIMARY_MODEL,
  GEMINI_FREE_FALLBACK_MODEL,
]);

/**
 * Models officially classified by Google as requiring a paid / billing-enabled API key.
 * NEVER invoked automatically, never used as fallback, never retried.
 */
export const PAID_ONLY_GEMINI_MODELS = new Set<string>([
  'gemini-4-carbon',
  'gemini-4-neon',
  'gemini-4-argon',
  'gemini-3-pro-image',
  'gemini-nano-banana-2.1',
  'gemini-3.1-flash-lite-image',
  'gemini-omni-1.2-flash',
  'genie-4',
  'lyria-3-clip-preview',
  'lyria-3-pro-preview',
  'imagen-3.0-generate-002',
  'imagen-4.0-generate-001',
]);

export type GlobalAiBillingStatus = 'FREE_ONLY' | 'PAID_APPROVED';

export type AiFeatureCategory =
  | 'student_ai'
  | 'teacher_ai'
  | 'snapsolve'
  | 'dictionary_translation'
  | 'help_support'
  | 'core_ai'
  | 'image_generation';

export interface PaidFeatureProposal {
  featureId: string;
  featureName: string;
  paidModelName: string;
  reasonFreeInsufficient: string;
  estimatedRequestsPerMonth: string;
  estimatedMonthlyCostInr: string;
  maxPossibleMonthlyCostInr: string;
  billingMustBeEnabled: boolean;
  availableFreeAlternatives: string[];
  status: 'BLOCKED_FREE_ONLY' | 'DENIED_BY_OWNER' | 'APPROVED_AWAITING_SERVER_ENV';
  ownerDecisionNote?: string;
  ownerDecidedAt?: string;
  ownerDecidedBy?: string;
}

export interface AiPolicyLimits {
  globalDailyRequestCap: number;
  perUserDailyTotalCap: number;
  perUserDailyLimits: {
    student_ai: number;
    teacher_ai: number;
    snapsolve: number;
    dictionary_translation: number;
    help_support: number;
    core_ai: number;
  };
  perIpTenMinuteCap: number;
  maxInputChars: number;
  maxInputTokensApprox: number;
  maxOutputTokens: number;
}

export interface CategoryRequestBreakdown {
  total: number;
  student_ai: number;
  teacher_ai: number;
  snapsolve: number;
  dictionary_translation: number;
  help_support: number;
  core_ai: number;
  knowledge_base_zero_cost: number;
  blocked_paid_attempts: number;
}

export interface BlockedPaidAuditEntry {
  timestamp: string;
  featureCategory: AiFeatureCategory;
  attemptedModel: string;
  reason: string;
}

interface DailyUsageState {
  dateKey: string;
  requests: CategoryRequestBreakdown;
  tokens: {
    promptTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  modelHits: Record<string, number>;
  fallbackHits: number;
  quotaRejections: number;
  perUserCounts: Record<string, Record<string, number>>;
}

interface PersistedAiPolicyStore {
  globalBillingStatus: GlobalAiBillingStatus;
  paidFeaturesApproved: string[];
  ownerApprovalRecords: Array<{
    featureId: string;
    decision: 'KEEP_FREE_ONLY' | 'DENY_PAID_FEATURE' | 'RECORD_FUTURE_APPROVAL';
    note: string;
    decidedBy: string;
    decidedAt: string;
  }>;
  limits: AiPolicyLimits;
  allTimeRequests: CategoryRequestBreakdown;
  allTimeTokens: {
    promptTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  daily: DailyUsageState;
  recentBlockedPaidAttempts: BlockedPaidAuditEntry[];
  lastUpdatedAt: string;
}

const DEFAULT_LIMITS: AiPolicyLimits = {
  globalDailyRequestCap: 1000,
  perUserDailyTotalCap: 60,
  perUserDailyLimits: {
    student_ai: 30,
    teacher_ai: 50,
    snapsolve: 15,
    dictionary_translation: 40,
    help_support: 15,
    core_ai: 30,
  },
  perIpTenMinuteCap: 30,
  maxInputChars: 16000,
  maxInputTokensApprox: 4000,
  maxOutputTokens: 6144,
};

const EMPTY_BREAKDOWN = (): CategoryRequestBreakdown => ({
  total: 0,
  student_ai: 0,
  teacher_ai: 0,
  snapsolve: 0,
  dictionary_translation: 0,
  help_support: 0,
  core_ai: 0,
  knowledge_base_zero_cost: 0,
  blocked_paid_attempts: 0,
});

function getCurrentIstDateKey(): string {
  // IST (UTC+5:30) daily reset alignment for Indian students & teachers
  const istMs = Date.now() + 330 * 60 * 1000;
  return new Date(istMs).toISOString().slice(0, 10);
}

function getNextMidnightIstIso(): string {
  const istMs = Date.now() + 330 * 60 * 1000;
  const istDate = new Date(istMs);
  const nextMidnightIstUtcMs =
    Date.UTC(istDate.getUTCFullYear(), istDate.getUTCMonth(), istDate.getUTCDate() + 1, 0, 0, 0) -
    330 * 60 * 1000;
  return new Date(nextMidnightIstUtcMs).toISOString();
}

function createEmptyDailyState(dateKey: string): DailyUsageState {
  return {
    dateKey,
    requests: EMPTY_BREAKDOWN(),
    tokens: { promptTokens: 0, outputTokens: 0, totalTokens: 0 },
    modelHits: {},
    fallbackHits: 0,
    quotaRejections: 0,
    perUserCounts: {},
  };
}

const STORE_DIR = path.join(process.cwd(), 'data');
const STORE_FILE = path.join(STORE_DIR, 'ai_policy_usage.json');

let storeLoaded = false;
let policyStore: PersistedAiPolicyStore = {
  globalBillingStatus: 'FREE_ONLY',
  paidFeaturesApproved: [],
  ownerApprovalRecords: [],
  limits: { ...DEFAULT_LIMITS, perUserDailyLimits: { ...DEFAULT_LIMITS.perUserDailyLimits } },
  allTimeRequests: EMPTY_BREAKDOWN(),
  allTimeTokens: { promptTokens: 0, outputTokens: 0, totalTokens: 0 },
  daily: createEmptyDailyState(getCurrentIstDateKey()),
  recentBlockedPaidAttempts: [],
  lastUpdatedAt: new Date().toISOString(),
};

// Sliding 10-minute IP rate-limit window
const IP_WINDOW_MS = 10 * 60 * 1000;
const ipWindowLog = new Map<string, number[]>();

// Transient upstream quota cooldown timestamp (never switches to paid models!)
let freeTierCooldownUntilMs = 0;

function ensureStoreLoaded(): void {
  if (storeLoaded) {
    rotateDayIfNeeded();
    return;
  }
  storeLoaded = true;
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf8');
      const parsed = JSON.parse(raw) as Partial<PersistedAiPolicyStore>;
      if (parsed && typeof parsed === 'object') {
        // Default safety: ALWAYS start in FREE_ONLY unless explicitly written-approved AND server env enabled
        const serverAllowsPaid = process.env.ALLOW_APPROVED_PAID_AI === 'true';
        const restoredStatus: GlobalAiBillingStatus =
          serverAllowsPaid && parsed.globalBillingStatus === 'PAID_APPROVED'
            ? 'PAID_APPROVED'
            : 'FREE_ONLY';

        policyStore = {
          globalBillingStatus: restoredStatus,
          paidFeaturesApproved:
            restoredStatus === 'PAID_APPROVED' && Array.isArray(parsed.paidFeaturesApproved)
              ? parsed.paidFeaturesApproved.map(String)
              : [],
          ownerApprovalRecords: Array.isArray(parsed.ownerApprovalRecords)
            ? parsed.ownerApprovalRecords.slice(0, 50)
            : [],
          limits: {
            ...DEFAULT_LIMITS,
            ...(parsed.limits || {}),
            perUserDailyLimits: {
              ...DEFAULT_LIMITS.perUserDailyLimits,
              ...(parsed.limits?.perUserDailyLimits || {}),
            },
          },
          allTimeRequests: {
            ...EMPTY_BREAKDOWN(),
            ...(parsed.allTimeRequests || {}),
          },
          allTimeTokens: {
            promptTokens: Number(parsed.allTimeTokens?.promptTokens || 0),
            outputTokens: Number(parsed.allTimeTokens?.outputTokens || 0),
            totalTokens: Number(parsed.allTimeTokens?.totalTokens || 0),
          },
          daily:
            parsed.daily && parsed.daily.dateKey === getCurrentIstDateKey()
              ? {
                  dateKey: parsed.daily.dateKey,
                  requests: { ...EMPTY_BREAKDOWN(), ...(parsed.daily.requests || {}) },
                  tokens: {
                    promptTokens: Number(parsed.daily.tokens?.promptTokens || 0),
                    outputTokens: Number(parsed.daily.tokens?.outputTokens || 0),
                    totalTokens: Number(parsed.daily.tokens?.totalTokens || 0),
                  },
                  modelHits: parsed.daily.modelHits || {},
                  fallbackHits: Number(parsed.daily.fallbackHits || 0),
                  quotaRejections: Number(parsed.daily.quotaRejections || 0),
                  perUserCounts: parsed.daily.perUserCounts || {},
                }
              : createEmptyDailyState(getCurrentIstDateKey()),
          recentBlockedPaidAttempts: Array.isArray(parsed.recentBlockedPaidAttempts)
            ? parsed.recentBlockedPaidAttempts.slice(0, 40)
            : [],
          lastUpdatedAt: parsed.lastUpdatedAt || new Date().toISOString(),
        };
      }
    }
  } catch {
    // Graceful fallback to in-memory store (e.g. serverless read-only filesystem)
  }
  rotateDayIfNeeded();
}

function rotateDayIfNeeded(): void {
  const today = getCurrentIstDateKey();
  if (policyStore.daily.dateKey !== today) {
    policyStore.daily = createEmptyDailyState(today);
    policyStore.lastUpdatedAt = new Date().toISOString();
    flushStoreToDisk();
  }
}

let flushTimer: ReturnType<typeof setTimeout> | null = null;
function scheduleFlush(): void {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushStoreToDisk();
  }, 1500);
  if (typeof flushTimer.unref === 'function') {
    flushTimer.unref();
  }
}

function flushStoreToDisk(): void {
  try {
    if (!fs.existsSync(STORE_DIR)) {
      fs.mkdirSync(STORE_DIR, { recursive: true });
    }
    policyStore.lastUpdatedAt = new Date().toISOString();
    fs.writeFileSync(STORE_FILE, JSON.stringify(policyStore, null, 2), 'utf8');
  } catch {
    // Ignore on read-only serverless filesystems; in-memory state stays authoritative
  }
}

function hashUserKey(rawKey: string): string {
  const clean = String(rawKey || 'anonymous').trim();
  return crypto.createHash('sha256').update(clean).digest('hex').slice(0, 16);
}

/**
 * Returns the static + status-enriched Owner Permission Proposals for any feature
 * that cannot run on Google's free tier (currently: AI Image Generation).
 */
export function getPaidFeatureProposals(): PaidFeatureProposal[] {
  ensureStoreLoaded();
  const serverAllowsPaid = process.env.ALLOW_APPROVED_PAID_AI === 'true';

  const latestImageDecision = policyStore.ownerApprovalRecords.find(
    (r) => r.featureId === 'image_generation'
  );
  const isApprovedInPolicy =
    policyStore.globalBillingStatus === 'PAID_APPROVED' &&
    policyStore.paidFeaturesApproved.includes('image_generation');

  const imageStatus: PaidFeatureProposal['status'] =
    latestImageDecision?.decision === 'DENY_PAID_FEATURE'
      ? 'DENIED_BY_OWNER'
      : isApprovedInPolicy && !serverAllowsPaid
      ? 'APPROVED_AWAITING_SERVER_ENV'
      : 'BLOCKED_FREE_ONLY';

  return [
    {
      featureId: 'image_generation',
      featureName: 'AI Image Generator (Core Studio — Raster Educational Diagrams)',
      paidModelName: GEMINI_PAID_IMAGE_MODEL,
      reasonFreeInsufficient:
        'Google officially restricts all Gemini & Imagen image-generation models (gemini-3.1-flash-lite-image, gemini-nano-banana-2.1, gemini-3-pro-image) to billing-enabled paid API keys. Free-tier keys cannot generate raster AI images and receive HTTP 403/429.',
      estimatedRequestsPerMonth: '1,000 – 3,000 educational illustrations/month (early launch phase)',
      estimatedMonthlyCostInr: '₹2,500 – ₹7,500 / month (approx. ₹2.50 – ₹3.30 per generated image)',
      maxPossibleMonthlyCostInr:
        '₹10,000 / month (hard-capped if enabled with max 3,000 images/month & 3 images/user/day limit)',
      billingMustBeEnabled: true,
      availableFreeAlternatives: [
        'Teacher Tool #39: Diagram & Flowchart Outline Generator (100% Free on gemini-4-hydrogen)',
        'Student Tool #6: Diagram Explainer & Label Guide (100% Free on gemini-4-hydrogen)',
        'Built-in MyStudyZone Drawing Studio & SVG Colouring Templates (₹0 local)',
        'Built-in Document, Image, PDF, QR & Print Studio for editing/exporting textbook images (₹0 local)',
      ],
      status: imageStatus,
      ownerDecisionNote: latestImageDecision?.note,
      ownerDecidedAt: latestImageDecision?.decidedAt,
      ownerDecidedBy: latestImageDecision?.decidedBy,
    },
  ];
}

export function getGlobalBillingStatus(): GlobalAiBillingStatus {
  ensureStoreLoaded();
  return policyStore.globalBillingStatus;
}

export function isPaidExecutionEnabledForFeature(featureId: string): boolean {
  ensureStoreLoaded();
  // Defense-in-depth: BOTH explicit server env opt-in AND explicit written owner approval required.
  // Silence, quota errors, restarts, or deployments can NEVER flip this to true.
  const serverEnvOptIn = process.env.ALLOW_APPROVED_PAID_AI === 'true';
  if (!serverEnvOptIn) return false;
  if (policyStore.globalBillingStatus !== 'PAID_APPROVED') return false;
  return policyStore.paidFeaturesApproved.includes(featureId);
}

/**
 * HARD TECHNICAL BILLING PROTECTION GATE
 * Called inside server/geminiClient.ts BEFORE every outbound Google GenAI SDK call.
 * Throws a structured error (HTTP 403) before any network request can leave the server.
 */
export function assertModelAllowedByFreePolicy(
  modelName: string,
  featureCategory: AiFeatureCategory = 'core_ai'
): void {
  ensureStoreLoaded();
  const normalized = String(modelName || '').trim();

  if (VERIFIED_FREE_GEMINI_MODELS.has(normalized)) {
    return;
  }

  const isKnownPaid = PAID_ONLY_GEMINI_MODELS.has(normalized);
  if (isKnownPaid && isPaidExecutionEnabledForFeature(featureCategory)) {
    return;
  }

  const reason = isKnownPaid
    ? `Blocked outbound call to paid model "${normalized}" under MyStudyZone FREE AI ONLY policy (Global Billing Status: ${policyStore.globalBillingStatus}).`
    : `Blocked outbound call to unverified model "${normalized}". Only officially verified free-tier models (${Array.from(VERIFIED_FREE_GEMINI_MODELS).join(', ')}) are permitted.`;

  recordBlockedPaidAttempt(featureCategory, normalized || 'unknown_model', reason);

  const err = new Error(reason) as Error & {
    code?: string;
    status?: number;
    blockedModel?: string;
  };
  err.code = 'PAID_MODEL_BLOCKED_FREE_POLICY';
  err.status = 403;
  err.blockedModel = normalized;
  throw err;
}

export function recordBlockedPaidAttempt(
  featureCategory: AiFeatureCategory,
  attemptedModel: string,
  reason: string
): void {
  ensureStoreLoaded();
  policyStore.daily.requests.blocked_paid_attempts += 1;
  policyStore.allTimeRequests.blocked_paid_attempts += 1;
  policyStore.recentBlockedPaidAttempts.unshift({
    timestamp: new Date().toISOString(),
    featureCategory,
    attemptedModel,
    reason,
  });
  if (policyStore.recentBlockedPaidAttempts.length > 40) {
    policyStore.recentBlockedPaidAttempts = policyStore.recentBlockedPaidAttempts.slice(0, 40);
  }
  scheduleFlush();
}

export interface QuotaCheckInput {
  category: Exclude<AiFeatureCategory, 'image_generation'>;
  userKey: string;
  clientIp: string;
  inputCharCount?: number;
  requestedMaxOutputTokens?: number;
}

export interface QuotaCheckResult {
  allowed: boolean;
  statusCode?: number;
  errorCode?: string;
  retryAfterSeconds?: number;
  quotaResetAt?: string;
  cappedMaxOutputTokens: number;
  message?: string;
}

/**
 * Enforces:
 * 1) Server-side IP burst rate limit
 * 2) Maximum input size limit
 * 3) Global free-tier daily request cap
 * 4) Per-user daily category & total request limits
 * 5) Maximum output token ceiling
 * Never switches to a paid model when limits are hit.
 */
export function checkFreeTierPolicyQuota(input: QuotaCheckInput): QuotaCheckResult {
  ensureStoreLoaded();
  const limits = policyStore.limits;
  const resetAt = getNextMidnightIstIso();
  const cappedMaxOutputTokens = Math.min(
    Math.max(Number(input.requestedMaxOutputTokens || limits.maxOutputTokens), 256),
    limits.maxOutputTokens
  );

  // 0. Check short upstream free-tier cooldown (prevents hammering Google after 429)
  const now = Date.now();
  if (now < freeTierCooldownUntilMs) {
    const waitSec = Math.max(5, Math.ceil((freeTierCooldownUntilMs - now) / 1000));
    policyStore.daily.quotaRejections += 1;
    scheduleFlush();
    return {
      allowed: false,
      statusCode: 429,
      errorCode: 'FREE_QUOTA_COOLDOWN',
      retryAfterSeconds: waitSec,
      quotaResetAt: resetAt,
      cappedMaxOutputTokens,
      message: `Free-tier AI quota is cooling down for ${waitSec} seconds. MyStudyZone operates in strict FREE AI ONLY mode and never activates paid billing automatically — please retry shortly.`,
    };
  }

  // 1. Input token / character safety cap
  if (typeof input.inputCharCount === 'number' && input.inputCharCount > limits.maxInputChars) {
    return {
      allowed: false,
      statusCode: 400,
      errorCode: 'INPUT_LIMIT_EXCEEDED',
      cappedMaxOutputTokens,
      message: `Input exceeds the free-tier safety limit of ${limits.maxInputChars.toLocaleString()} characters (~${limits.maxInputTokensApprox.toLocaleString()} tokens). Please shorten your prompt and retry.`,
    };
  }

  // 2. Server-side per-IP 10-minute sliding window rate limit
  const ipKey = String(input.clientIp || 'unknown').trim();
  const timestamps = (ipWindowLog.get(ipKey) || []).filter((ts) => now - ts < IP_WINDOW_MS);
  if (timestamps.length >= limits.perIpTenMinuteCap) {
    ipWindowLog.set(ipKey, timestamps);
    policyStore.daily.quotaRejections += 1;
    scheduleFlush();
    return {
      allowed: false,
      statusCode: 429,
      errorCode: 'RATE_LIMITED',
      retryAfterSeconds: 60,
      quotaResetAt: resetAt,
      cappedMaxOutputTokens,
      message:
        'Rate limit reached for this connection to protect MyStudyZone free-tier AI access for all learners. Please wait a minute and retry.',
    };
  }

  // 3. Global free-tier daily cap
  if (policyStore.daily.requests.total >= limits.globalDailyRequestCap) {
    policyStore.daily.quotaRejections += 1;
    scheduleFlush();
    return {
      allowed: false,
      statusCode: 429,
      errorCode: 'GLOBAL_FREE_QUOTA_REACHED',
      retryAfterSeconds: 300,
      quotaResetAt: resetAt,
      cappedMaxOutputTokens,
      message:
        'Today’s platform-wide free AI quota has been reached. MyStudyZone runs in strict FREE AI ONLY mode and will never switch to paid services automatically. Please retry after midnight IST when the free quota resets.',
    };
  }

  // 4. Per-user daily category & total limits
  const hashedUser = hashUserKey(input.userKey || ipKey);
  const userBucket = policyStore.daily.perUserCounts[hashedUser] || {};
  const userCatCount = Number(userBucket[input.category] || 0);
  const userTotalCount = Number(userBucket._total || 0);
  const catLimit = limits.perUserDailyLimits[input.category] ?? 30;

  if (userCatCount >= catLimit || userTotalCount >= limits.perUserDailyTotalCap) {
    policyStore.daily.quotaRejections += 1;
    scheduleFlush();
    return {
      allowed: false,
      statusCode: 429,
      errorCode: 'USER_DAILY_FREE_QUOTA_REACHED',
      retryAfterSeconds: 300,
      quotaResetAt: resetAt,
      cappedMaxOutputTokens,
      message: `You have reached today’s free AI usage limit (${catLimit} requests/day for this tool, ${limits.perUserDailyTotalCap}/day overall). Free quota resets automatically at midnight IST — paid billing is never enabled.`,
    };
  }

  // Reserve burst window slot
  timestamps.push(now);
  ipWindowLog.set(ipKey, timestamps);

  return {
    allowed: true,
    cappedMaxOutputTokens,
    quotaResetAt: resetAt,
  };
}

export function recordFreeTierUpstreamQuotaHit(cooldownSeconds = 45): void {
  ensureStoreLoaded();
  freeTierCooldownUntilMs = Math.max(
    freeTierCooldownUntilMs,
    Date.now() + Math.min(Math.max(cooldownSeconds, 15), 180) * 1000
  );
  policyStore.daily.quotaRejections += 1;
  scheduleFlush();
}

export function recordAiRequestUsage(params: {
  category: Exclude<AiFeatureCategory, 'image_generation'>;
  userKey: string;
  modelUsed: string;
  usedFallback: boolean;
  promptTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}): void {
  ensureStoreLoaded();
  const cat = params.category;
  policyStore.daily.requests.total += 1;
  policyStore.daily.requests[cat] += 1;
  policyStore.allTimeRequests.total += 1;
  policyStore.allTimeRequests[cat] += 1;

  const model = String(params.modelUsed || GEMINI_FREE_PRIMARY_MODEL);
  policyStore.daily.modelHits[model] = (policyStore.daily.modelHits[model] || 0) + 1;
  if (params.usedFallback) {
    policyStore.daily.fallbackHits += 1;
  }

  const pTok = Math.max(0, Number(params.promptTokens || 0));
  const oTok = Math.max(0, Number(params.outputTokens || 0));
  const tTok = Math.max(pTok + oTok, Number(params.totalTokens || 0));

  policyStore.daily.tokens.promptTokens += pTok;
  policyStore.daily.tokens.outputTokens += oTok;
  policyStore.daily.tokens.totalTokens += tTok;

  policyStore.allTimeTokens.promptTokens += pTok;
  policyStore.allTimeTokens.outputTokens += oTok;
  policyStore.allTimeTokens.totalTokens += tTok;

  const hashedUser = hashUserKey(params.userKey);
  if (!policyStore.daily.perUserCounts[hashedUser]) {
    policyStore.daily.perUserCounts[hashedUser] = {};
  }
  const bucket = policyStore.daily.perUserCounts[hashedUser];
  bucket[cat] = Number(bucket[cat] || 0) + 1;
  bucket._total = Number(bucket._total || 0) + 1;

  scheduleFlush();
}

export function recordKnowledgeBaseZeroCostHit(): void {
  ensureStoreLoaded();
  policyStore.daily.requests.knowledge_base_zero_cost += 1;
  policyStore.allTimeRequests.knowledge_base_zero_cost += 1;
  scheduleFlush();
}

export function getPublicFreePolicySummary() {
  ensureStoreLoaded();
  const used = policyStore.daily.requests.total;
  const cap = policyStore.limits.globalDailyRequestCap;
  const pct = cap > 0 ? Math.min(100, Math.round((used / cap) * 100)) : 0;
  return {
    billingStatus: policyStore.globalBillingStatus,
    freeOnlyEnforced: policyStore.globalBillingStatus === 'FREE_ONLY',
    paidServicesEnabled: false,
    billingActivated: false,
    primaryModel: GEMINI_FREE_PRIMARY_MODEL,
    fallbackModel: GEMINI_FREE_FALLBACK_MODEL,
    verifiedFreeModels: Array.from(VERIFIED_FREE_GEMINI_MODELS),
    blockedPaidModelsCount: PAID_ONLY_GEMINI_MODELS.size,
    imageGenerationAllowed: isPaidExecutionEnabledForFeature('image_generation'),
    dailyQuotaUsedPct: pct,
    quotaResetAt: getNextMidnightIstIso(),
  };
}

export function getOwnerAiPolicyReport(geminiKeyConfigured: boolean) {
  ensureStoreLoaded();
  const used = policyStore.daily.requests.total;
  const cap = policyStore.limits.globalDailyRequestCap;
  const quotaPct = cap > 0 ? Math.min(100, Math.round((used / cap) * 1000) / 10) : 0;
  const serverEnvPaidOptIn = process.env.ALLOW_APPROVED_PAID_AI === 'true';

  return {
    success: true,
    generatedAt: new Date().toISOString(),
    dateKeyIst: policyStore.daily.dateKey,
    quotaResetAt: getNextMidnightIstIso(),
    globalBillingStatus: policyStore.globalBillingStatus,
    billingStatusLabel:
      policyStore.globalBillingStatus === 'FREE_ONLY' ? 'FREE ONLY' : 'PAID APPROVED',
    geminiKeyConfigured,
    currentModels: {
      primaryModel: GEMINI_FREE_PRIMARY_MODEL,
      fallbackModel: GEMINI_FREE_FALLBACK_MODEL,
      verifiedFreeAllowlist: Array.from(VERIFIED_FREE_GEMINI_MODELS),
      blockedPaidModels: Array.from(PAID_ONLY_GEMINI_MODELS),
    },
    usageToday: {
      totalAiRequests: policyStore.daily.requests.total,
      studentAiRequests: policyStore.daily.requests.student_ai,
      teacherAiRequests: policyStore.daily.requests.teacher_ai,
      snapSolveRequests: policyStore.daily.requests.snapsolve,
      dictionaryAndTranslationRequests: policyStore.daily.requests.dictionary_translation,
      helpAndSupportRequests: policyStore.daily.requests.help_support,
      coreStudioAiRequests: policyStore.daily.requests.core_ai,
      knowledgeBaseZeroCostHits: policyStore.daily.requests.knowledge_base_zero_cost,
      blockedPaidApiAttempts: policyStore.daily.requests.blocked_paid_attempts,
      fallbackHits: policyStore.daily.fallbackHits,
      quotaRejections: policyStore.daily.quotaRejections,
      modelHits: policyStore.daily.modelHits,
      tokens: policyStore.daily.tokens,
      activeUniqueUsersToday: Object.keys(policyStore.daily.perUserCounts).length,
    },
    usageAllTime: {
      totalAiRequests: policyStore.allTimeRequests.total,
      studentAiRequests: policyStore.allTimeRequests.student_ai,
      teacherAiRequests: policyStore.allTimeRequests.teacher_ai,
      snapSolveRequests: policyStore.allTimeRequests.snapsolve,
      dictionaryAndTranslationRequests: policyStore.allTimeRequests.dictionary_translation,
      helpAndSupportRequests: policyStore.allTimeRequests.help_support,
      coreStudioAiRequests: policyStore.allTimeRequests.core_ai,
      knowledgeBaseZeroCostHits: policyStore.allTimeRequests.knowledge_base_zero_cost,
      blockedPaidApiAttempts: policyStore.allTimeRequests.blocked_paid_attempts,
      tokens: policyStore.allTimeTokens,
    },
    quotaConsumption: {
      dailyUsed: used,
      dailyCap: cap,
      dailyRemaining: Math.max(0, cap - used),
      percentUsed: quotaPct,
      inUpstreamCooldown: Date.now() < freeTierCooldownUntilMs,
      cooldownSecondsRemaining: Math.max(
        0,
        Math.ceil((freeTierCooldownUntilMs - Date.now()) / 1000)
      ),
    },
    billingProtection: {
      estimatedApiSpendingInr: 0,
      estimatedApiSpendingFormatted: '₹0.00 (FREE TIER ONLY)',
      paidServicesStatus:
        policyStore.globalBillingStatus === 'FREE_ONLY' || !serverEnvPaidOptIn
          ? 'DISABLED — ALL PAID MODELS TECHNICALLY BLOCKED'
          : 'SELECTIVE PAID FEATURES ENABLED BY OWNER',
      billingActivationStatus: serverEnvPaidOptIn
        ? 'SERVER ENV OPT-IN DETECTED (OWNER APPROVAL REQUIRED PER FEATURE)'
        : 'NOT ACTIVATED — LOCKED TO FREE TIER ONLY',
      autoUpgradeBlocked: true,
      paidFallbackBlocked: true,
      paidRetryBlocked: true,
      serverEnvPaidLockActive: !serverEnvPaidOptIn,
    },
    limits: policyStore.limits,
    paidFeatureProposals: getPaidFeatureProposals(),
    recentBlockedPaidAttempts: policyStore.recentBlockedPaidAttempts.slice(0, 15),
    ownerApprovalRecords: policyStore.ownerApprovalRecords.slice(0, 15),
  };
}

export function updateOwnerFreeTierLimits(body: Record<string, unknown>) {
  ensureStoreLoaded();
  const clamp = (val: unknown, fallback: number, min: number, max: number) => {
    const n = Number(val);
    if (!Number.isFinite(n)) return fallback;
    return Math.min(Math.max(Math.floor(n), min), max);
  };

  const cur = policyStore.limits;
  const rawPerUser = (body.perUserDailyLimits || {}) as Record<string, unknown>;

  policyStore.limits = {
    globalDailyRequestCap: clamp(body.globalDailyRequestCap, cur.globalDailyRequestCap, 50, 5000),
    perUserDailyTotalCap: clamp(body.perUserDailyTotalCap, cur.perUserDailyTotalCap, 5, 250),
    perUserDailyLimits: {
      student_ai: clamp(rawPerUser.student_ai, cur.perUserDailyLimits.student_ai, 5, 150),
      teacher_ai: clamp(rawPerUser.teacher_ai, cur.perUserDailyLimits.teacher_ai, 5, 200),
      snapsolve: clamp(rawPerUser.snapsolve, cur.perUserDailyLimits.snapsolve, 2, 60),
      dictionary_translation: clamp(
        rawPerUser.dictionary_translation,
        cur.perUserDailyLimits.dictionary_translation,
        5,
        150
      ),
      help_support: clamp(rawPerUser.help_support, cur.perUserDailyLimits.help_support, 5, 100),
      core_ai: clamp(rawPerUser.core_ai, cur.perUserDailyLimits.core_ai, 5, 150),
    },
    perIpTenMinuteCap: clamp(body.perIpTenMinuteCap, cur.perIpTenMinuteCap, 5, 100),
    maxInputChars: clamp(body.maxInputChars, cur.maxInputChars, 2000, 32000),
    maxInputTokensApprox: Math.ceil(
      clamp(body.maxInputChars, cur.maxInputChars, 2000, 32000) / 4
    ),
    maxOutputTokens: clamp(body.maxOutputTokens, cur.maxOutputTokens, 512, 8192),
  };

  flushStoreToDisk();
  return {
    success: true,
    limits: policyStore.limits,
    message: 'Free-tier safety limits updated. Global AI Billing Status remains protected.',
  };
}

export function recordOwnerBillingDecision(
  body: Record<string, unknown>,
  ownerEmail: string
): { statusCode: number; payload: Record<string, unknown> } {
  ensureStoreLoaded();
  const action = String(body.action || '').trim().toUpperCase();
  const featureId = String(body.featureId || 'image_generation').trim().slice(0, 60);
  const note = String(body.note || '').trim().slice(0, 400);
  const confirmationPhrase = String(body.confirmationPhrase || '').trim();

  if (action === 'KEEP_FREE_ONLY' || action === 'REVOKE_ALL_PAID') {
    policyStore.globalBillingStatus = 'FREE_ONLY';
    policyStore.paidFeaturesApproved = [];
    policyStore.ownerApprovalRecords.unshift({
      featureId: 'ALL',
      decision: 'KEEP_FREE_ONLY',
      note: note || 'Owner enforced FREE ONLY global policy.',
      decidedBy: ownerEmail,
      decidedAt: new Date().toISOString(),
    });
    flushStoreToDisk();
    return {
      statusCode: 200,
      payload: {
        success: true,
        globalBillingStatus: policyStore.globalBillingStatus,
        message: 'GLOBAL AI BILLING STATUS locked to FREE ONLY. All paid models remain blocked.',
      },
    };
  }

  if (action === 'DENY_PAID_FEATURE') {
    policyStore.paidFeaturesApproved = policyStore.paidFeaturesApproved.filter(
      (id) => id !== featureId
    );
    if (policyStore.paidFeaturesApproved.length === 0) {
      policyStore.globalBillingStatus = 'FREE_ONLY';
    }
    policyStore.ownerApprovalRecords.unshift({
      featureId,
      decision: 'DENY_PAID_FEATURE',
      note: note || `Owner denied paid model activation for ${featureId}.`,
      decidedBy: ownerEmail,
      decidedAt: new Date().toISOString(),
    });
    flushStoreToDisk();
    return {
      statusCode: 200,
      payload: {
        success: true,
        globalBillingStatus: policyStore.globalBillingStatus,
        message: `Paid activation for "${featureId}" remains BLOCKED per owner decision.`,
      },
    };
  }

  if (action === 'RECORD_FUTURE_APPROVAL') {
    // Require explicit written confirmation phrase AND owner note — never allow accidental 1-click billing
    const requiredPhrase = `APPROVE PAID ${featureId.toUpperCase()}`;
    if (confirmationPhrase !== requiredPhrase) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: 'EXPLICIT_CONFIRMATION_REQUIRED',
          message: `To record explicit written owner approval, you must type exactly: "${requiredPhrase}"`,
        },
      };
    }

    const serverEnvOptIn = process.env.ALLOW_APPROVED_PAID_AI === 'true';
    policyStore.ownerApprovalRecords.unshift({
      featureId,
      decision: 'RECORD_FUTURE_APPROVAL',
      note: note || `Explicit written owner approval recorded for ${featureId}.`,
      decidedBy: ownerEmail,
      decidedAt: new Date().toISOString(),
    });

    if (serverEnvOptIn) {
      policyStore.globalBillingStatus = 'PAID_APPROVED';
      if (!policyStore.paidFeaturesApproved.includes(featureId)) {
        policyStore.paidFeaturesApproved.push(featureId);
      }
      flushStoreToDisk();
      return {
        statusCode: 200,
        payload: {
          success: true,
          globalBillingStatus: policyStore.globalBillingStatus,
          message: `Written owner approval recorded for "${featureId}".`,
        },
      };
    }

    // Even with UI approval, keep FREE_ONLY active until server env lock ALLOW_APPROVED_PAID_AI=true is set
    policyStore.globalBillingStatus = 'FREE_ONLY';
    flushStoreToDisk();
    return {
      statusCode: 200,
      payload: {
        success: true,
        globalBillingStatus: 'FREE_ONLY',
        serverEnvLockActive: true,
        message:
          'Written approval intent logged, but GLOBAL AI BILLING STATUS stays FREE ONLY because server billing lock (ALLOW_APPROVED_PAID_AI) is OFF. No paid API call can execute until you also intentionally enable billing and set ALLOW_APPROVED_PAID_AI=true on the server.',
      },
    };
  }

  return {
    statusCode: 400,
    payload: {
      success: false,
      message: 'Unsupported billing decision action.',
    },
  };
}
