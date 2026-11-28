import { GoogleGenAI } from '@google/genai';

export const GEMINI_PRIMARY_MODEL = 'gemini-4-hydrogen';
export const GEMINI_FALLBACK_MODEL = 'gemini-3.1-flash-lite';
export const GEMINI_IMAGE_MODEL = 'gemini-3.1-flash-lite-image';
export const GEMINI_MAX_PRIMARY_ATTEMPTS = 3;

export interface GeminiGenerationResult {
  response: Awaited<ReturnType<GoogleGenAI['models']['generateContent']>>;
  parsedJson: Record<string, unknown> | null;
  modelUsed: string;
  primaryModel: string;
  fallbackModel: string;
  attemptsMade: number;
  usedFallback: boolean;
}

export interface GeminiGenerationOptions {
  apiKey?: string;
  maxPrimaryAttempts?: number;
  requireValidJson?: boolean;
  validateJson?: (parsed: Record<string, unknown>) => boolean;
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

function sanitizeFallbackRequestParams(
  requestParams: Omit<Parameters<GoogleGenAI['models']['generateContent']>[0], 'model'>
): Omit<Parameters<GoogleGenAI['models']['generateContent']>[0], 'model'> {
  if (!requestParams.config || typeof requestParams.config !== 'object') {
    return requestParams;
  }
  const configRecord = requestParams.config as Record<string, unknown>;
  if (!('thinkingConfig' in configRecord)) {
    return requestParams;
  }
  const nextConfig = { ...configRecord };
  delete nextConfig.thinkingConfig;
  return {
    ...requestParams,
    config: nextConfig as typeof requestParams.config,
  };
}

function redactPotentialSecrets(raw: string): string {
  return String(raw || '').replace(/AIza[0-9A-Za-z\-_]{20,}/g, '[REDACTED_KEY]');
}

/**
 * Centralized Gemini content generator used across all MyStudyZone server services.
 * - Primary model: gemini-4-hydrogen (free-tier)
 * - Bounded exponential-backoff retries on transient 503/network failures (max 3 attempts)
 * - Bounded 1-shot free-tier fallback to gemini-3.1-flash-lite on 429 quota bursts,
 *   exhausted 503 retries, or invalid JSON responses (when requireValidJson is enabled).
 * - Never fabricates fake AI output on failure.
 */
export async function generateGeminiContentWithFallback(
  requestParams: Omit<Parameters<GoogleGenAI['models']['generateContent']>[0], 'model'>,
  options: GeminiGenerationOptions = {}
): Promise<GeminiGenerationResult> {
  const ai = createGeminiServerClient(options.apiKey);
  const maxPrimaryAttempts = Math.min(
    Math.max(Number(options.maxPrimaryAttempts ?? GEMINI_MAX_PRIMARY_ATTEMPTS), 1),
    GEMINI_MAX_PRIMARY_ATTEMPTS
  );
  const requireValidJson = Boolean(options.requireValidJson);
  const validateJson = options.validateJson;

  let attemptsMade = 0;
  let lastError: unknown;
  let shouldTryFallback = false;

  for (let attempt = 1; attempt <= maxPrimaryAttempts; attempt += 1) {
    attemptsMade += 1;
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_PRIMARY_MODEL,
        ...requestParams,
      });

      const parsedJson = requireValidJson ? safeParseGeminiJson(response.text || '') : null;
      const jsonOk =
        !requireValidJson ||
        (parsedJson !== null && (!validateJson || validateJson(parsedJson)));

      if (jsonOk) {
        return {
          response,
          parsedJson,
          modelUsed: GEMINI_PRIMARY_MODEL,
          primaryModel: GEMINI_PRIMARY_MODEL,
          fallbackModel: GEMINI_FALLBACK_MODEL,
          attemptsMade,
          usedFallback: false,
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
        // Immediate bounded fallback to separate free-tier lite model quota bucket
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

  // Final bounded free-tier fallback attempt using gemini-3.1-flash-lite
  await sleepMs(450);
  attemptsMade += 1;
  const fallbackParams = sanitizeFallbackRequestParams(requestParams);

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

    return {
      response,
      parsedJson,
      modelUsed: GEMINI_FALLBACK_MODEL,
      primaryModel: GEMINI_PRIMARY_MODEL,
      fallbackModel: GEMINI_FALLBACK_MODEL,
      attemptsMade,
      usedFallback: true,
    };
  } catch (fallbackErr) {
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

  if (code === 'MISSING_GEMINI_API_KEY' || rawMsg.includes('MISSING_GEMINI_API_KEY')) {
    return {
      statusCode: 503,
      errorCode: 'MISSING_GEMINI_API_KEY',
      retryable: false,
      attemptsMade,
      message:
        'GEMINI_API_KEY is not configured on the server. Add GEMINI_API_KEY in Settings -> Secrets to enable live AI generation.',
    };
  }

  if (isGeminiAuthError(err)) {
    return {
      statusCode: 403,
      errorCode: 'API_KEY_INVALID',
      retryable: false,
      attemptsMade,
      message:
        'Server Gemini API key was rejected or lacks permission. Please verify GEMINI_API_KEY in Settings -> Secrets.',
    };
  }

  if (isGeminiQuotaError(err)) {
    return {
      statusCode: 429,
      errorCode: 'QUOTA_EXHAUSTED',
      retryable: true,
      retryAfterSeconds: 30,
      attemptsMade,
      message:
        'Free-tier Gemini AI usage limit was temporarily reached. Paid billing is never activated automatically — please wait a moment and retry.',
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
        'Free Gemini AI servers are temporarily busy (HTTP 503) even after automatic retries. Please click Retry in a few seconds.',
    };
  }

  if (code === 'AI_INVALID_RESPONSE' || rawMsg.includes('AI_INVALID_JSON_RESPONSE')) {
    return {
      statusCode: 502,
      errorCode: 'AI_INVALID_RESPONSE',
      retryable: true,
      retryAfterSeconds: 5,
      attemptsMade,
      message: `${contextLabel} received an incomplete response from Gemini AI. Please click Retry.`,
    };
  }

  return {
    statusCode: 502,
    errorCode: 'AI_SERVICE_ERROR',
    retryable: true,
    retryAfterSeconds: 5,
    attemptsMade,
    message: `${contextLabel} could not complete AI processing right now. Please retry.`,
  };
}
