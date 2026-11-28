import { GoogleGenAI } from '@google/genai';
import {
  GEMINI_FREE_FALLBACK_MODEL,
  GEMINI_FREE_PRIMARY_MODEL,
  GEMINI_PAID_IMAGE_MODEL,
  assertModelAllowedByFreePolicy,
  recordAiRequestUsage,
  recordFreeTierUpstreamQuotaHit,
  type AiFeatureCategory,
} from './aiPolicyManager.ts';

export const GEMINI_PRIMARY_MODEL = GEMINI_FREE_PRIMARY_MODEL;
export const GEMINI_FALLBACK_MODEL = GEMINI_FREE_FALLBACK_MODEL;
export const GEMINI_IMAGE_MODEL = GEMINI_PAID_IMAGE_MODEL;
export const GEMINI_MAX_PRIMARY_ATTEMPTS = 3;

export interface GeminiGenerationResult {
  response: Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>;
  parsedJson: Record<string, unknown> | null;
  modelUsed: string;
  primaryModel: string;
  fallbackModel: string;
  attemptsMade: number;
  usedFallback: boolean;
  tokenUsage: {
    promptTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
}

export interface GeminiGenerationOptions {
  apiKey?: string;
  maxPrimaryAttempts?: number;
  requireValidJson?: boolean;
  validateJson?: (parsed: Record<string, unknown>) => boolean;
  maxOutputTokensCap?: number;
  telemetry?: {
    category: Exclude<AiFeatureCategory, 'image_generation'>;
    userKey: string;
  };
}

export interface MappedGeminiHttpError {
  statusCode: number;
  errorCode: string;
  retryable: boolean;
  retryAfterSeconds?: number;
  attemptsMade?: number;
  message: string;
}

/**
 * Single centralized server-side reader for GEMINI_API_KEY.
 * Reads strictly from server environment variables (process.env.GEMINI_API_KEY),
 * rejects placeholder values, and never logs or exposes the secret value.
 */
export function getConfiguredGeminiApiKey(): string {
  const raw = String(process.env.GEMINI_API_KEY || '')
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .trim();
  if (!raw) return '';

  const upper = raw.toUpperCase();
  if (
    upper.includes('MY_GEMINI_API_KEY') ||
    upper.includes('YOUR_') ||
    upper.includes('REPLACE_') ||
    upper.includes('EXAMPLE_')
  ) {
    return '';
  }

  return raw;
}

export function isGeminiConfigured(): boolean {
  return Boolean(getConfiguredGeminiApiKey());
}

export function createGeminiServerClient(explicitApiKey?: string): GoogleGenAI {
  const apiKey = explicitApiKey || getConfiguredGeminiApiKey();
  if (!apiKey) {
    const missingErr = new Error('MISSING_GEMINI_API_KEY') as Error & {
      code?: string;
      status?: number;
    };
    missingErr.code = 'MISSING_GEMINI_API_KEY';
    missingErr.status = 503;
    throw missingErr;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

export function isGeminiQuotaError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err || '');
  const status = Number((err as { status?: number })?.status || 0);
  const lower = msg.toLowerCase();
  return (
    status === 429 ||
    lower.includes('429') ||
    lower.includes('resource_exhausted') ||
    lower.includes('quota')
  );
}

export function isGeminiAuthError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err || '');
  const status = Number((err as { status?: number })?.status || 0);
  const lower = msg.toLowerCase();
  return (
    status === 401 ||
    status === 403 ||
    lower.includes('api_key_invalid') ||
    lower.includes('api key not valid') ||
    lower.includes('invalid api key') ||
    lower.includes('permission_denied') ||
    lower.includes('unauthenticated')
  );
}

export function isTransientGeminiError(err: unknown): boolean {
  if (isGeminiQuotaError(err) || isGeminiAuthError(err)) {
    return false;
  }
  const msg = err instanceof Error ? err.message : String(err || '');
  const status = Number((err as { status?: number })?.status || 0);
  const lower = msg.toLowerCase();

  return (
    status === 503 ||
    status === 502 ||
    status === 504 ||
    lower.includes('503') ||
    lower.includes('unavailable') ||
    lower.includes('high demand') ||
    lower.includes('overloaded') ||
    lower.includes('temporarily unavailable') ||
    lower.includes('etimedout') ||
    lower.includes('econnreset') ||
    lower.includes('socket hang up') ||
    lower.includes('fetch failed')
  );
}

export function safeParseGeminiJson(rawText: string): Record<string, unknown> | null {
  const trimmed = String(rawText || '').trim();
  if (!trimmed) return null;

  const tryParse = (candidate: string): Record<string, unknown> | null => {
    try {
      const parsed = JSON.parse(candidate);
      return parsed && typeof parsed === 'object' && !Array.isArray(parsed)
        ? (parsed as Record<string, unknown>)
        : null;
    } catch {
      return null;
    }
  };

  const direct = tryParse(trimmed);
  if (direct) return direct;

  const unfenced = trimmed
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const parsedUnfenced = tryParse(unfenced);
  if (parsedUnfenced) return parsedUnfenced;

  const firstBrace = unfenced.indexOf('{');
  const lastBrace = unfenced.lastIndexOf('}');
  const sliced =
    firstBrace >= 0 && lastBrace > firstBrace
      ? unfenced.slice(firstBrace, lastBrace + 1)
      : unfenced;

  const parsedSliced = tryParse(sliced);
  if (parsedSliced) return parsedSliced;

  // Repair stray backslashes (e.g., LaTeX \frac, \times) or unescaped control newlines
  const repaired = sliced
    .replace(/\\(?!["\\/bfnrtu])/g, '\\\\')
    .replace(/[\u0000-\u0019]+/g, ' ');

  return tryParse(repaired);
}

function sleepMs(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function sanitizeParamsForModel(
  modelName: string,
  requestParams: Omit<Parameters<GoogleGenAI['models']['generateContent']>[0], 'model'>,
  maxOutputTokensCap?: number
): Omit<Parameters<GoogleGenAI['models']['generateContent']>[0], 'model'> {
  const configRecord: Record<string, unknown> =
    requestParams.config && typeof requestParams.config === 'object'
      ? { ...(requestParams.config as Record<string, unknown>) }
      : {};

  // Strip deprecated sampling params for Gemini 4 models per @google/genai guidelines
  if (modelName.startsWith('gemini-4-')) {
    delete configRecord.temperature;
    delete configRecord.topP;
    delete configRecord.topK;
    delete configRecord.candidateCount;
  }

  // Strip thinkingConfig for lightweight fallback models
  if (modelName === GEMINI_FALLBACK_MODEL && 'thinkingConfig' in configRecord) {
    delete configRecord.thinkingConfig;
  }

  // Enforce strict maximum output token ceiling from FREE AI ONLY policy
  if (typeof maxOutputTokensCap === 'number' && maxOutputTokensCap > 0) {
    const requestedMax = Number(configRecord.maxOutputTokens || maxOutputTokensCap);
    configRecord.maxOutputTokens = Math.min(
      Number.isFinite(requestedMax) && requestedMax > 0 ? Math.floor(requestedMax) : maxOutputTokensCap,
      maxOutputTokensCap
    );
  }

  return {
    ...requestParams,
    config: configRecord as typeof requestParams.config,
  };
}

function extractTokenUsage(
  response: Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>
): { promptTokens: number; outputTokens: number; totalTokens: number } {
  const meta = (response as { usageMetadata?: Record<string, unknown> })?.usageMetadata;
  const promptTokens = Math.max(0, Number(meta?.promptTokenCount || 0));
  const outputTokens = Math.max(0, Number(meta?.candidatesTokenCount || 0));
  const totalTokens = Math.max(promptTokens + outputTokens, Number(meta?.totalTokenCount || 0));
  return { promptTokens, outputTokens, totalTokens };
}

function redactPotentialSecrets(raw: string): string {
  return String(raw || '').replace(/AIza[0-9A-Za-z\-_]{20,}/g, '[REDACTED_KEY]');
}

/**
 * Centralized Gemini content generator used across all MyStudyZone server services.
 * - Strictly enforces VERIFIED FREE-TIER ONLY model allowlist BEFORE any SDK call.
 * - Primary model: gemini-4-hydrogen (officially free-tier eligible)
 * - Bounded 1-shot free-tier fallback: gemini-3.1-flash-lite (officially free-tier eligible)
 * - NEVER activates, retries, or falls back to any paid model.
 * - Never fabricates fake AI output on failure.
 */
export async function generateGeminiContentWithFallback(
  requestParams: Omit<Parameters<GoogleGenAI['models']['generateContent']>[0], 'model'>,
  options: GeminiGenerationOptions = {}
): Promise<GeminiGenerationResult> {
  const featureCategory = options.telemetry?.category || 'core_ai';

  // HARD BILLING GATE: Verify both primary and fallback models are strictly free-tier allowed
  assertModelAllowedByFreePolicy(GEMINI_PRIMARY_MODEL, featureCategory);
  assertModelAllowedByFreePolicy(GEMINI_FALLBACK_MODEL, featureCategory);

  const ai = createGeminiServerClient(options.apiKey);
  const maxPrimaryAttempts = Math.min(
    Math.max(Number(options.maxPrimaryAttempts ?? GEMINI_MAX_PRIMARY_ATTEMPTS), 1),
    GEMINI_MAX_PRIMARY_ATTEMPTS
  );
  const requireValidJson = Boolean(options.requireValidJson);
  const validateJson = options.validateJson;
  const primaryParams = sanitizeParamsForModel(
    GEMINI_PRIMARY_MODEL,
    requestParams,
    options.maxOutputTokensCap
  );

  let attemptsMade = 0;
  let lastError: unknown;
  let shouldTryFallback = false;

  for (let attempt = 1; attempt <= maxPrimaryAttempts; attempt += 1) {
    attemptsMade += 1;
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_PRIMARY_MODEL,
        ...primaryParams,
      });

      const parsedJson = requireValidJson ? safeParseGeminiJson(response.text || '') : null;
      const jsonOk =
        !requireValidJson ||
        (parsedJson !== null && (!validateJson || validateJson(parsedJson)));

      if (jsonOk) {
        const tokenUsage = extractTokenUsage(response);
        if (options.telemetry) {
          recordAiRequestUsage({
            category: options.telemetry.category,
            userKey: options.telemetry.userKey,
            modelUsed: GEMINI_PRIMARY_MODEL,
            usedFallback: false,
            ...tokenUsage,
          });
        }
        return {
          response,
          parsedJson,
          modelUsed: GEMINI_PRIMARY_MODEL,
          primaryModel: GEMINI_PRIMARY_MODEL,
          fallbackModel: GEMINI_FALLBACK_MODEL,
          attemptsMade,
          usedFallback: false,
          tokenUsage,
        };
      }

      // Primary returned empty or structurally invalid JSON -> try bounded free-tier fallback once
      lastError = Object.assign(new Error('AI_INVALID_JSON_RESPONSE'), {
        code: 'AI_INVALID_RESPONSE',
      });
      shouldTryFallback = true;
      break;
    } catch (err) {
      lastError = err;
      if (isGeminiQuotaError(err)) {
        // Immediate bounded fallback to separate verified free-tier lite model quota bucket
        shouldTryFallback = true;
        break;
      }
      if (!isTransientGeminiError(err)) {
        if (err && typeof err === 'object') {
          (err as { attemptsMade?: number }).attemptsMade = attemptsMade;
        }
        throw err;
      }
      if (attempt < maxPrimaryAttempts) {
        const baseDelay = attempt === 1 ? 850 : 2100;
        const jitter = Math.floor(Math.random() * 250);
        await sleepMs(baseDelay + jitter);
      } else {
        shouldTryFallback = true;
      }
    }
  }

  if (!shouldTryFallback) {
    if (lastError && typeof lastError === 'object') {
      (lastError as { attemptsMade?: number }).attemptsMade = attemptsMade;
    }
    throw lastError;
  }

  // Final bounded verified free-tier fallback attempt using gemini-3.1-flash-lite (NEVER a paid model)
  assertModelAllowedByFreePolicy(GEMINI_FALLBACK_MODEL, featureCategory);
  await sleepMs(450);
  attemptsMade += 1;
  const fallbackParams = sanitizeParamsForModel(
    GEMINI_FALLBACK_MODEL,
    requestParams,
    options.maxOutputTokensCap
  );

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_FALLBACK_MODEL,
      ...fallbackParams,
    });

    const parsedJson = requireValidJson ? safeParseGeminiJson(response.text || '') : null;
    const jsonOk =
      !requireValidJson ||
      (parsedJson !== null && (!validateJson || validateJson(parsedJson)));

    if (!jsonOk) {
      const invalidErr = new Error('AI_INVALID_JSON_RESPONSE') as Error & {
        code?: string;
        attemptsMade?: number;
      };
      invalidErr.code = 'AI_INVALID_RESPONSE';
      invalidErr.attemptsMade = attemptsMade;
      throw invalidErr;
    }

    const tokenUsage = extractTokenUsage(response);
    if (options.telemetry) {
      recordAiRequestUsage({
        category: options.telemetry.category,
        userKey: options.telemetry.userKey,
        modelUsed: GEMINI_FALLBACK_MODEL,
        usedFallback: true,
        ...tokenUsage,
      });
    }

    return {
      response,
      parsedJson,
      modelUsed: GEMINI_FALLBACK_MODEL,
      primaryModel: GEMINI_PRIMARY_MODEL,
      fallbackModel: GEMINI_FALLBACK_MODEL,
      attemptsMade,
      usedFallback: true,
      tokenUsage,
    };
  } catch (fallbackErr) {
    if (isGeminiQuotaError(fallbackErr)) {
      recordFreeTierUpstreamQuotaHit(45);
    }

    const finalErr =
      isTransientGeminiError(fallbackErr) ||
      isGeminiQuotaError(fallbackErr) ||
      isGeminiAuthError(fallbackErr) ||
      (fallbackErr as { code?: string })?.code === 'AI_INVALID_RESPONSE'
        ? fallbackErr
        : lastError || fallbackErr;

    if (finalErr && typeof finalErr === 'object') {
      (finalErr as { attemptsMade?: number }).attemptsMade = attemptsMade;
    }
    throw finalErr;
  }
}

export function mapGeminiHttpError(
  err: unknown,
  contextLabel = 'MyStudyZone AI'
): MappedGeminiHttpError {
  const rawMsg = redactPotentialSecrets(err instanceof Error ? err.message : String(err || 'AI error'));
  const code = String((err as { code?: string })?.code || '');
  const attemptsMade = Number((err as { attemptsMade?: number })?.attemptsMade || 0) || undefined;

  if (code === 'PAID_MODEL_BLOCKED_FREE_POLICY') {
    return {
      statusCode: 403,
      errorCode: 'PAID_MODEL_BLOCKED_FREE_POLICY',
      retryable: false,
      attemptsMade,
      message:
        'Blocked by MyStudyZone FREE AI ONLY policy. Paid AI models and Google Cloud billing are disabled unless explicitly approved in writing by the website owner.',
    };
  }

  if (code === 'MISSING_GEMINI_API_KEY' || rawMsg.includes('MISSING_GEMINI_API_KEY')) {
    return {
      statusCode: 503,
      errorCode: 'MISSING_GEMINI_API_KEY',
      retryable: false,
      attemptsMade,
      message:
        'GEMINI_API_KEY is not configured on the server. Add a free-tier GEMINI_API_KEY in server environment variables to enable live AI generation.',
    };
  }

  if (isGeminiAuthError(err)) {
    return {
      statusCode: 403,
      errorCode: 'API_KEY_INVALID',
      retryable: false,
      attemptsMade,
      message:
        'Server Gemini API key was rejected or lacks permission. Please verify GEMINI_API_KEY on the server.',
    };
  }

  if (isGeminiQuotaError(err)) {
    return {
      statusCode: 429,
      errorCode: 'QUOTA_EXHAUSTED',
      retryable: true,
      retryAfterSeconds: 45,
      attemptsMade,
      message:
        'The free-tier Gemini AI quota has been temporarily reached. MyStudyZone operates in strict FREE AI ONLY mode and never activates paid billing — please wait a moment and retry.',
    };
  }

  if (isTransientGeminiError(err)) {
    return {
      statusCode: 503,
      errorCode: 'AI_UNAVAILABLE',
      retryable: true,
      retryAfterSeconds: 10,
      attemptsMade,
      message:
        'Free Gemini AI servers are temporarily busy (HTTP 503) even after automatic retries. Paid models are never used as fallback — please click Retry in a few seconds.',
    };
  }

  if (code === 'AI_INVALID_RESPONSE' || rawMsg.includes('AI_INVALID_JSON_RESPONSE')) {
    return {
      statusCode: 502,
      errorCode: 'AI_INVALID_RESPONSE',
      retryable: true,
      retryAfterSeconds: 5,
      attemptsMade,
      message: `${contextLabel} received an incomplete response from free Gemini AI. Please click Retry.`,
    };
  }

  return {
    statusCode: 502,
    errorCode: 'AI_SERVICE_ERROR',
    retryable: true,
    retryAfterSeconds: 5,
    attemptsMade,
    message: `${contextLabel} could not complete free AI processing right now. Please retry.`,
  };
}
