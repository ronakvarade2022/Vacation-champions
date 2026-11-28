import crypto from 'crypto';
import { Type } from '@google/genai';
import {
  GEMINI_FALLBACK_MODEL,
  GEMINI_MAX_PRIMARY_ATTEMPTS,
  GEMINI_PRIMARY_MODEL,
  generateGeminiContentWithFallback,
  getConfiguredGeminiApiKey,
  mapGeminiHttpError,
  safeParseGeminiJson,
} from './geminiClient.ts';
import { verifyBearerIdToken } from '../firebase/admin.ts';

export type SnapSolvePortalRole = 'student' | 'teacher';

export type SnapSolveAnswerStyle =
  | 'short'
  | 'detailed'
  | 'step_by_step'
  | 'exam_ready'
  | 'simple';

export type SnapSolveQuestionType =
  | 'mcq'
  | 'short_answer'
  | 'long_answer'
  | 'numerical'
  | 'fill_blank'
  | 'true_false'
  | 'match'
  | 'diagram'
  | 'passage'
  | 'other';

export interface SnapSolveExtractedQuestion {
  id: string;
  order: number;
  numberLabel: string;
  pageNumber: number;
  questionText: string;
  questionType: SnapSolveQuestionType;
  options: string[];
  hasDiagram: boolean;
  diagramDescription: string;
  isReadable: boolean;
  unreadableReason: string;
  subquestions: string[];
}

export interface SnapSolveSolutionItem {
  questionId: string;
  order: number;
  numberLabel: string;
  pageNumber: number;
  questionText: string;
  status: 'solved' | 'failed' | 'unreadable';
  shortAnswer: string;
  answerText: string;
  steps: string[];
  finalAnswer: string;
  teachingNote: string;
  errorMessage: string;
  updatedAt: string;
}

interface SnapSolveSession {
  sessionId: string;
  sessionSecret: string;
  portalRole: SnapSolvePortalRole;
  ownerUid: string | null;
  createdAtMs: number;
  expiresAtMs: number;
  pageCount: number;
  detectedSubject: string;
  detectedLanguage: string;
  extractionWarnings: string[];
  questions: SnapSolveExtractedQuestion[];
  solutionsByQuestionId: Record<string, SnapSolveSolutionItem>;
}

export const SNAPSOLVE_MODEL = GEMINI_PRIMARY_MODEL;
export const SNAPSOLVE_FALLBACK_MODEL = GEMINI_FALLBACK_MODEL;
export const SNAPSOLVE_MAX_PRIMARY_ATTEMPTS = GEMINI_MAX_PRIMARY_ATTEMPTS;
export const SNAPSOLVE_MAX_PAGES = 10;
export const SNAPSOLVE_MAX_PAGE_BYTES = 5 * 1024 * 1024;
export const SNAPSOLVE_SESSION_TTL_MS = 20 * 60 * 1000;
export const SNAPSOLVE_ALLOWED_MIMES = new Set<string>([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export const SNAPSOLVE_PRIVACY_NOTICE =
  'Temporary Processing Notice: Uploaded question images/pages are transmitted securely to Google Gemini AI strictly for generating answers in your active session. They are kept in ephemeral server memory only (auto-cleared within 20 minutes or when you click Start New Document) and are never saved unless you explicitly choose Save to My Documents.';

const VALID_ANSWER_STYLES = new Set<SnapSolveAnswerStyle>([
  'short',
  'detailed',
  'step_by_step',
  'exam_ready',
  'simple',
]);

const VALID_QUESTION_TYPES = new Set<SnapSolveQuestionType>([
  'mcq',
  'short_answer',
  'long_answer',
  'numerical',
  'fill_blank',
  'true_false',
  'match',
  'diagram',
  'passage',
  'other',
]);

const ephemeralSessions = new Map<string, SnapSolveSession>();

const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 35;
const ipRequestLog = new Map<string, number[]>();

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipRequestLog.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_IP) {
    ipRequestLog.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  ipRequestLog.set(ip, timestamps);
  return true;
}

function purgeExpiredSessions(): void {
  const now = Date.now();
  for (const [id, session] of ephemeralSessions.entries()) {
    if (now >= session.expiresAtMs) {
      session.questions = [];
      session.solutionsByQuestionId = {};
      ephemeralSessions.delete(id);
    }
  }
}

const cleanupTimer = setInterval(purgeExpiredSessions, 5 * 60 * 1000);
if (typeof cleanupTimer.unref === 'function') {
  cleanupTimer.unref();
}

function sanitizeNumberLabel(raw: unknown, fallbackIndex: number): string {
  const cleaned = String(raw || '')
    .replace(/\}\s*\{[\s\S]*$/g, '')
    .replace(/\\+"/g, '')
    .replace(/["{}[\]]+/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 40);
  return cleaned || `Q${fallbackIndex + 1}`;
}

function mapSnapSolveGeminiError(err: unknown) {
  const mapped = mapGeminiHttpError(err, 'SnapSolve AI');
  if (mapped.errorCode === 'AI_UNAVAILABLE') {
    return {
      ...mapped,
      message:
        'Free Gemini AI servers are temporarily busy (HTTP 503) even after automatic retries. Your uploaded pages and any completed answers remain safe — please click Retry in a few seconds.',
    };
  }
  return mapped;
}

function stripBase64DataUrlPrefix(raw: string): { base64: string; embeddedMime?: string } {
  const trimmed = String(raw || '').trim();
  const match = trimmed.match(/^data:([a-zA-Z0-9/+.-]+);base64,(.+)$/s);
  if (match) {
    return {
      embeddedMime: match[1].toLowerCase(),
      base64: match[2].replace(/\s+/g, ''),
    };
  }
  return {
    base64: trimmed.replace(/\s+/g, ''),
  };
}

function sanitizePortalRole(raw: unknown): SnapSolvePortalRole | null {
  if (raw === 'student' || raw === 'teacher') return raw;
  return null;
}

function readHeaderValue(
  headers: Record<string, string | string[] | undefined>,
  name: string
): string {
  const target = name.toLowerCase();
  for (const [k, v] of Object.entries(headers || {})) {
    if (k.toLowerCase() === target) {
      return Array.isArray(v) ? String(v[0] || '').trim() : String(v || '').trim();
    }
  }
  return '';
}

async function resolveOptionalUid(
  authHeader?: string | string[]
): Promise<{ uid: string | null; authError?: { statusCode: number; message: string } }> {
  const raw = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!raw || !raw.trim()) {
    return { uid: null };
  }
  const verified = await verifyBearerIdToken(raw);
  if (!verified.valid || !verified.uid) {
    return {
      uid: null,
      authError: {
        statusCode: verified.statusCode || 401,
        message: verified.error || 'Invalid authentication token.',
      },
    };
  }
  return { uid: verified.uid };
}

function verifySessionSecret(provided: string, expected: string): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided, 'utf8');
  const b = Buffer.from(expected, 'utf8');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function getSnapSolveStatus() {
  const configured = Boolean(getConfiguredGeminiApiKey());
  return {
    configured,
    model: SNAPSOLVE_MODEL,
    fallbackModel: SNAPSOLVE_FALLBACK_MODEL,
    limits: {
      maxPages: SNAPSOLVE_MAX_PAGES,
      maxPageBytes: SNAPSOLVE_MAX_PAGE_BYTES,
      allowedFormats: ['JPG', 'JPEG', 'PNG', 'WebP', 'PDF'],
    },
    privacyNotice: SNAPSOLVE_PRIVACY_NOTICE,
    message: configured
      ? 'SnapSolve AI (Free-Tier Gemini Vision) is ready.'
      : 'GEMINI_API_KEY is not configured on the server. Live SnapSolve scanning is disabled until configured.',
  };
}

interface IncomingPage {
  pageNumber: number;
  mimeType: string;
  base64Data: string;
}

export async function handleSnapSolveRecognize(
  body: Record<string, unknown>,
  headers: Record<string, string | string[] | undefined>,
  clientIp: string
): Promise<{ statusCode: number; payload: Record<string, unknown> }> {
  purgeExpiredSessions();

  if (!checkIpRateLimit(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: 'RATE_LIMITED',
        message: 'Too many requests from this connection. Please wait a few minutes and retry.',
      },
    };
  }

  const portalRole = sanitizePortalRole(body.portalRole);
  if (!portalRole) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: 'INVALID_ROLE',
        message: 'Valid portalRole ("student" or "teacher") is required.',
      },
    };
  }

  const authCheck = await resolveOptionalUid(headers.authorization);
  if (authCheck.authError) {
    return {
      statusCode: authCheck.authError.statusCode,
      payload: {
        success: false,
        errorCode: 'INVALID_AUTH',
        message: authCheck.authError.message,
      },
    };
  }

  const rawPages = Array.isArray(body.pages) ? body.pages : [];
  if (rawPages.length === 0) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: 'NO_PAGES',
        message: 'Please upload at least one question image or PDF page.',
      },
    };
  }
  if (rawPages.length > SNAPSOLVE_MAX_PAGES) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: 'MAX_PAGES_EXCEEDED',
        message: `Maximum ${SNAPSOLVE_MAX_PAGES} pages allowed per SnapSolve document.`,
      },
    };
  }

  const validatedPages: IncomingPage[] = [];
  let totalDecodedBytes = 0;

  for (let idx = 0; idx < rawPages.length; idx += 1) {
    const item = rawPages[idx] as Record<string, unknown>;
    const rawPageNum = Number(item?.pageNumber || idx + 1);
    const pageNumber = Number.isFinite(rawPageNum) && rawPageNum > 0 ? Math.floor(rawPageNum) : idx + 1;
    const { base64, embeddedMime } = stripBase64DataUrlPrefix(String(item?.base64Data || ''));
    const mimeType = String(item?.mimeType || embeddedMime || '').trim().toLowerCase();

    if (!SNAPSOLVE_ALLOWED_MIMES.has(mimeType)) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: 'UNSUPPORTED_FORMAT',
          message: `Page ${pageNumber} uses an unsupported format. Allowed: JPG, JPEG, PNG, WebP (or PDF converted to pages).`,
        },
      };
    }

    if (!base64 || base64.length < 32) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: 'EMPTY_PAGE_DATA',
          message: `Page ${pageNumber} image data is empty or invalid.`,
        },
      };
    }

    const decodedBytes = Math.floor((base64.length * 3) / 4);
    if (decodedBytes > SNAPSOLVE_MAX_PAGE_BYTES) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: 'PAGE_TOO_LARGE',
          message: `Page ${pageNumber} exceeds the 5 MB per-page limit. Please compress or retake the photo.`,
        },
      };
    }
    totalDecodedBytes += decodedBytes;
    if (totalDecodedBytes > 25 * 1024 * 1024) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: 'PAYLOAD_TOO_LARGE',
          message: 'Combined uploaded pages exceed the 25 MB document limit.',
        },
      };
    }

    validatedPages.push({ pageNumber, mimeType, base64Data: base64 });
  }

  const apiKey = getConfiguredGeminiApiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: 'MISSING_GEMINI_API_KEY',
        message: 'GEMINI_API_KEY is not configured on the server. Live question scanning is unavailable.',
      },
    };
  }

  const subjectHint = String(body.subjectHint || 'Auto-Detect').trim().slice(0, 80);
  const answerLanguageHint = String(body.answerLanguageHint || 'Auto-Detect').trim().slice(0, 80);

  const systemPrompt = [
    'You are SnapSolve AI OCR & Question Extractor for Indian school & competitive education (English, Marathi & Hindi Devanagari, and Mathematics).',
    `Inspect EVERY SINGLE ONE of the ${validatedPages.length} attached page(s) strictly in sequential order (Page 1 through Page ${validatedPages.length}).`,
    'CRITICAL RULES:',
    `1. Do NOT stop early after Page 1 or the first 1-2 questions — extract ALL questions across ALL ${validatedPages.length} attached page(s) from top to bottom.`,
    '2. Preserve EVERY question, sub-question, MCQ option, fill-in-the-blank, table, equation, and original plain numbering label (e.g., "Q1", "1(a)", "Q.2 (i)", "प्र. १") in the EXACT sequence it appears.',
    '3. Output plain clean text for numberLabel with NO extra symbols, braces, or JSON metadata.',
    '4. NEVER merge two separate questions, NEVER reorder questions, and NEVER invent missing text.',
    '5. Support printed text, handwritten questions, Math Unicode symbols (√, π, ∑, ≤, ≥, ×, ÷, ², ³), Marathi & Hindi Devanagari script accurately.',
    '6. If a question is blurry, cut off, shadowed, or unreadable, STILL include an entry in its exact sequence position with isReadable=false and a clear unreadableReason rather than guessing or omitting it.',
    '7. If a question relies on a visual figure/diagram/geometry/chart, set hasDiagram=true and summarize visible labels in diagramDescription.',
    `Context Hints — Portal Role: ${portalRole}; Subject Hint: ${subjectHint}; Preferred Language Hint: ${answerLanguageHint}.`,
  ].join('\n');

  const contentParts: Array<Record<string, unknown>> = [{ text: systemPrompt }];
  for (const page of validatedPages) {
    contentParts.push({
      text: `--- PAGE ${page.pageNumber} OF ${validatedPages.length} START ---`,
    });
    contentParts.push({
      inlineData: {
        mimeType: page.mimeType,
        data: page.base64Data,
      },
    });
  }

  try {
    const { response, parsedJson, modelUsed, attemptsMade, usedFallback } =
      await generateGeminiContentWithFallback(
        {
          contents: [
            {
              role: 'user',
              parts: contentParts,
            },
          ],
      config: {
        temperature: 0.1,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            detectedSubject: { type: Type.STRING },
            detectedLanguage: { type: Type.STRING },
            extractionWarnings: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  order: { type: Type.INTEGER },
                  numberLabel: { type: Type.STRING },
                  pageNumber: { type: Type.INTEGER },
                  questionText: { type: Type.STRING },
                  questionType: {
                    type: Type.STRING,
                    enum: [
                      'mcq',
                      'short_answer',
                      'long_answer',
                      'numerical',
                      'fill_blank',
                      'true_false',
                      'match',
                      'diagram',
                      'passage',
                      'other',
                    ],
                  },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                  hasDiagram: { type: Type.BOOLEAN },
                  diagramDescription: { type: Type.STRING },
                  isReadable: { type: Type.BOOLEAN },
                  unreadableReason: { type: Type.STRING },
                  subquestions: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: [
                  'order',
                  'numberLabel',
                  'pageNumber',
                  'questionText',
                  'questionType',
                  'isReadable',
                ],
              },
            },
          },
          required: ['detectedSubject', 'detectedLanguage', 'questions'],
        },
      },
        },
        {
          apiKey,
          requireValidJson: true,
        }
      );

    const parsed = parsedJson || safeParseGeminiJson(response.text || '');
    const rawQuestions = Array.isArray(parsed?.questions) ? parsed.questions : [];
    const sortedRawQuestions = rawQuestions
      .map((item, rawIdx) => ({ item, rawIdx }))
      .sort((a, b) => {
        const qa = (a.item || {}) as Record<string, unknown>;
        const qb = (b.item || {}) as Record<string, unknown>;
        const pa = Math.max(1, Math.floor(Number(qa.pageNumber || 1)));
        const pb = Math.max(1, Math.floor(Number(qb.pageNumber || 1)));
        if (pa !== pb) return pa - pb;
        const oa = Number(qa.order);
        const ob = Number(qb.order);
        if (Number.isFinite(oa) && Number.isFinite(ob) && oa !== ob) {
          return oa - ob;
        }
        return a.rawIdx - b.rawIdx;
      })
      .map((entry) => entry.item);

    const normalizedQuestions: SnapSolveExtractedQuestion[] = sortedRawQuestions.map((rawItem, idx) => {
      const q = (rawItem || {}) as Record<string, unknown>;
      const rawType = String(q.questionType || 'other').trim() as SnapSolveQuestionType;
      const questionType: SnapSolveQuestionType = VALID_QUESTION_TYPES.has(rawType)
        ? rawType
        : 'other';
      const pageNum = Math.min(
        validatedPages.length,
        Math.max(1, Math.floor(Number(q.pageNumber || 1)))
      );
      const isReadable = q.isReadable !== false;
      const numberLabel = sanitizeNumberLabel(q.numberLabel, idx);
      const questionText = String(q.questionText || '').trim().slice(0, 4000);
      const options = Array.isArray(q.options)
        ? q.options.map((o) => String(o || '').trim()).filter(Boolean).slice(0, 10)
        : [];
      const subquestions = Array.isArray(q.subquestions)
        ? q.subquestions.map((s) => String(s || '').trim()).filter(Boolean).slice(0, 15)
        : [];

      return {
        id: `q_${idx + 1}_${crypto.randomBytes(4).toString('hex')}`,
        order: idx + 1,
        numberLabel,
        pageNumber: pageNum,
        questionText:
          questionText ||
          (isReadable ? `${numberLabel} (Empty text detected)` : `${numberLabel} (Unreadable section on Page ${pageNum})`),
        questionType,
        options,
        hasDiagram: Boolean(q.hasDiagram),
        diagramDescription: String(q.diagramDescription || '').trim().slice(0, 1000),
        isReadable,
        unreadableReason: isReadable
          ? ''
          : String(
              q.unreadableReason ||
                'Image clarity or lighting made this question unreadable. You can edit the text manually or retake the photo.'
            )
              .trim()
              .slice(0, 300),
        subquestions,
      };
    });

    const warnings = Array.isArray(parsed?.extractionWarnings)
      ? parsed.extractionWarnings.map((w) => String(w || '').trim()).filter(Boolean).slice(0, 10)
      : [];

    if (normalizedQuestions.length === 0) {
      warnings.push(
        'No clear questions were detected on the uploaded pages. Please check lighting, rotate if sideways, or add clearer pages.'
      );
    }

    const sessionId = `snap_${crypto.randomBytes(12).toString('hex')}`;
    const sessionSecret = crypto.randomBytes(24).toString('hex');
    const nowMs = Date.now();

    const session: SnapSolveSession = {
      sessionId,
      sessionSecret,
      portalRole,
      ownerUid: authCheck.uid,
      createdAtMs: nowMs,
      expiresAtMs: nowMs + SNAPSOLVE_SESSION_TTL_MS,
      pageCount: validatedPages.length,
      detectedSubject: String(parsed?.detectedSubject || subjectHint || 'General Studies')
        .trim()
        .slice(0, 80),
      detectedLanguage: String(parsed?.detectedLanguage || answerLanguageHint || 'English')
        .trim()
        .slice(0, 60),
      extractionWarnings: warnings,
      questions: normalizedQuestions,
      solutionsByQuestionId: {},
    };

    ephemeralSessions.set(sessionId, session);

    return {
      statusCode: 200,
      payload: {
        success: true,
        sessionId,
        sessionSecret,
        expiresAt: new Date(session.expiresAtMs).toISOString(),
        portalRole,
        pageCount: validatedPages.length,
        detectedSubject: session.detectedSubject,
        detectedLanguage: session.detectedLanguage,
        extractionWarnings: session.extractionWarnings,
        questions: normalizedQuestions,
        modelUsed,
        attemptsMade,
        usedFallback,
        privacyNotice: SNAPSOLVE_PRIVACY_NOTICE,
      },
    };
  } catch (err) {
    const mapped = mapSnapSolveGeminiError(err);
    return {
      statusCode: mapped.statusCode,
      payload: {
        success: false,
        errorCode: mapped.errorCode,
        retryable: mapped.retryable,
        retryAfterSeconds: mapped.retryAfterSeconds,
        attemptsMade: mapped.attemptsMade,
        message: mapped.message,
      },
    };
  }
}

export async function handleSnapSolveSolve(
  body: Record<string, unknown>,
  headers: Record<string, string | string[] | undefined>,
  clientIp: string
): Promise<{ statusCode: number; payload: Record<string, unknown> }> {
  purgeExpiredSessions();

  if (!checkIpRateLimit(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: 'RATE_LIMITED',
        message: 'Too many requests from this connection. Please wait a few minutes and retry.',
      },
    };
  }

  const sessionId = String(body.sessionId || '').trim();
  const session = ephemeralSessions.get(sessionId);
  if (!session) {
    return {
      statusCode: 404,
      payload: {
        success: false,
        errorCode: 'SESSION_EXPIRED',
        message: 'Your temporary SnapSolve session has expired or been cleared. Please scan or upload the pages again.',
      },
    };
  }

  const providedSecret = readHeaderValue(headers, 'x-snapsolve-secret');
  if (!verifySessionSecret(providedSecret, session.sessionSecret)) {
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: 'FORBIDDEN_SESSION',
        message: 'Unauthorized access to SnapSolve session.',
      },
    };
  }

  if (session.ownerUid) {
    const authCheck = await resolveOptionalUid(headers.authorization);
    if (authCheck.authError || authCheck.uid !== session.ownerUid) {
      return {
        statusCode: 403,
        payload: {
          success: false,
          errorCode: 'UID_MISMATCH',
          message: 'This SnapSolve session belongs to a different signed-in account.',
        },
      };
    }
  }

  const portalRole = sanitizePortalRole(body.portalRole) || session.portalRole;
  if (portalRole !== session.portalRole) {
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: 'ROLE_MISMATCH',
        message: 'Student and Teacher SnapSolve sessions are isolated and cannot be crossed.',
      },
    };
  }

  const subject = String(body.subject || session.detectedSubject || 'General Studies')
    .trim()
    .slice(0, 80);
  const answerLanguage = String(body.answerLanguage || 'Auto-Detect (Same as Question)')
    .trim()
    .slice(0, 80);
  const rawStyle = String(body.answerStyle || 'step_by_step').trim() as SnapSolveAnswerStyle;
  const answerStyle: SnapSolveAnswerStyle = VALID_ANSWER_STYLES.has(rawStyle)
    ? rawStyle
    : 'step_by_step';

  const rawEditedQuestions = Array.isArray(body.questions) ? body.questions : session.questions;
  const normalizedQuestions: SnapSolveExtractedQuestion[] = rawEditedQuestions
    .slice(0, 60)
    .map((item, idx) => {
      const q = (item || {}) as Partial<SnapSolveExtractedQuestion>;
      const rawType = String(q.questionType || 'other').trim() as SnapSolveQuestionType;
      return {
        id: String(q.id || `q_${idx + 1}`).trim().slice(0, 64),
        order: idx + 1,
        numberLabel: String(q.numberLabel || `Q${idx + 1}`).trim().slice(0, 40) || `Q${idx + 1}`,
        pageNumber: Math.max(1, Math.floor(Number(q.pageNumber || 1))),
        questionText: String(q.questionText || '').trim().slice(0, 4000),
        questionType: VALID_QUESTION_TYPES.has(rawType) ? rawType : 'other',
        options: Array.isArray(q.options)
          ? q.options.map((o) => String(o || '').trim()).filter(Boolean).slice(0, 10)
          : [],
        hasDiagram: Boolean(q.hasDiagram),
        diagramDescription: String(q.diagramDescription || '').trim().slice(0, 1000),
        isReadable: q.isReadable !== false,
        unreadableReason: String(q.unreadableReason || '').trim().slice(0, 300),
        subquestions: Array.isArray(q.subquestions)
          ? q.subquestions.map((s) => String(s || '').trim()).filter(Boolean).slice(0, 15)
          : [],
      };
    });

  session.questions = normalizedQuestions;

  const targetIdsSet =
    Array.isArray(body.targetQuestionIds) && body.targetQuestionIds.length > 0
      ? new Set(body.targetQuestionIds.map((id) => String(id || '').trim()).filter(Boolean))
      : null;

  const questionsToProcess = targetIdsSet
    ? normalizedQuestions.filter((q) => targetIdsSet.has(q.id))
    : normalizedQuestions;

  // Mark unreadable items immediately without inventing answers
  const readableBatchQueue: SnapSolveExtractedQuestion[] = [];
  for (const q of questionsToProcess) {
    if (!q.isReadable || !q.questionText.trim()) {
      session.solutionsByQuestionId[q.id] = {
        questionId: q.id,
        order: q.order,
        numberLabel: q.numberLabel,
        pageNumber: q.pageNumber,
        questionText: q.questionText,
        status: 'unreadable',
        shortAnswer: '',
        answerText: '',
        steps: [],
        finalAnswer: '',
        teachingNote: '',
        errorMessage:
          q.unreadableReason ||
          'Marked unreadable because the scanned image was unclear or empty. Edit the question text to solve it.',
        updatedAt: new Date().toISOString(),
      };
    } else {
      readableBatchQueue.push(q);
    }
  }

  let lastModelUsed = SNAPSOLVE_MODEL;
  let totalAttemptsMade = 0;
  let batchFailure: {
    statusCode: number;
    errorCode: string;
    retryable: boolean;
    retryAfterSeconds?: number;
    message: string;
  } | null = null;

  if (readableBatchQueue.length > 0) {
    const apiKey = getConfiguredGeminiApiKey();
    if (!apiKey) {
      return {
        statusCode: 503,
        payload: {
          success: false,
          errorCode: 'MISSING_GEMINI_API_KEY',
          retryable: false,
          message: 'GEMINI_API_KEY is not configured on the server.',
        },
      };
    }

    const BATCH_SIZE = 6;
    const styleInstructionMap: Record<SnapSolveAnswerStyle, string> = {
      short:
        'Short Answers: Crisp 1-3 sentence direct answer. For MCQs give option + brief reason; for Maths keep only key formula & final value.',
      detailed:
        'Detailed Answers: Thorough multi-part conceptual explanation covering definitions, formulas, reasoning, and complete solution.',
      step_by_step:
        'Step-by-Step Solutions: Populate "steps" array with clear numbered logical steps leading cleanly to a highlighted "finalAnswer".',
      exam_ready:
        'Exam-Ready Answers: Structured board/competitive exam presentation (Given, Formula/Principle, Working/Key Points, Conclusion) formatted for full marks.',
      simple:
        'Simple Explanations for Students: Friendly, easy-to-understand everyday wording suitable for school learners with zero confusing jargon.',
    };

    const getLanguageGuidance = (lang: string): string => {
      const lower = lang.toLowerCase();
      if (lower.includes('bilingual') && lower.includes('marathi')) {
        return 'Language Rule: Provide BILINGUAL output (English + Marathi Devanagari script). In "answerText", "steps", and "finalAnswer", clearly include BOTH English and Marathi (मराठी) explanations side-by-side or paired cleanly.';
      }
      if (lower.includes('bilingual') && lower.includes('hindi')) {
        return 'Language Rule: Provide BILINGUAL output (English + Hindi Devanagari script). In "answerText", "steps", and "finalAnswer", clearly include BOTH English and Hindi (हिन्दी) explanations side-by-side or paired cleanly.';
      }
      if (lower === 'marathi' || lower.includes('मराठी')) {
        return 'Language Rule: Write ALL explanations, "steps", "answerText", "shortAnswer", and "finalAnswer" in strict, natural Marathi (मराठी Devanagari: आहे, आहेत, करा) — NEVER mix Hindi words like है/हैं even if the question text is in English or Hindi. Preserve mathematical numbers/symbols accurately.';
      }
      if (lower === 'hindi' || lower.includes('हिन्दी')) {
        return 'Language Rule: Write ALL explanations, "steps", "answerText", "shortAnswer", and "finalAnswer" in strict, natural Hindi (हिन्दी Devanagari: है, हैं, करें) — NEVER mix Marathi words like आहे/करून even if the question text is in English or Marathi. Preserve mathematical numbers/symbols accurately.';
      }
      if (lower === 'english') {
        return 'Language Rule: Write ALL explanations, "steps", "answerText", "shortAnswer", and "finalAnswer" in clear English.';
      }
      return 'Language Rule: Auto-detect EACH question\'s language independently and answer ONLY in that question\'s own language (strict Marathi for Marathi questions, strict Hindi for Hindi questions, English for English questions — never bleed words across questions).';
    };

    for (let start = 0; start < readableBatchQueue.length; start += BATCH_SIZE) {
      const chunk = readableBatchQueue.slice(start, start + BATCH_SIZE);
      const roleGuidance =
        portalRole === 'teacher'
          ? 'Role: Teacher Educator Answer Key. Also populate teachingNote with a brief 1-2 line marking/classroom verification cue or common mistake to watch for.'
          : 'Role: Student Learning Companion. Make explanations encouraging, crystal clear, and leave teachingNote empty string unless a quick study tip helps.';

      const prompt = [
        `You are solving school/exam questions accurately for MyStudyZone SnapSolve AI.`,
        `Subject: ${subject}`,
        `Requested Answer Language: ${answerLanguage}`,
        getLanguageGuidance(answerLanguage),
        `Answer Style: ${styleInstructionMap[answerStyle]}`,
        roleGuidance,
        'STRICT ACCURACY RULES:',
        '- Return one solution object for EVERY question in the input list below, copying its exact "questionId" verbatim.',
        '- NEVER skip, combine, or reorder questions. Maintain exact question numbering.',
        '- For Mathematics, Arithmetic, Algebra, Geometry, Trigonometry, Physics/Chemistry numericals: ALWAYS populate "steps" array with explicit step-by-step working (Given -> Formula -> Substitution -> Calculation -> Result) AND put the exact final result in "finalAnswer".',
        '- Keep Devanagari (Marathi/Hindi) script and Unicode math symbols (×, ÷, ², ³, √, π, ∠, °) intact.',
        '',
        'INPUT QUESTIONS:',
        JSON.stringify(
          chunk.map((q) => ({
            questionId: q.id,
            order: q.order,
            numberLabel: q.numberLabel,
            questionType: q.questionType,
            questionText: q.questionText,
            options: q.options,
            diagramDescription: q.diagramDescription,
            subquestions: q.subquestions,
          }))
        ),
      ].join('\n');

      try {
        const solveConfig = {
          temperature: 0.2,
          maxOutputTokens: 8192,
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              solutions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    questionId: { type: Type.STRING },
                    shortAnswer: { type: Type.STRING },
                    answerText: { type: Type.STRING },
                    steps: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    finalAnswer: { type: Type.STRING },
                    teachingNote: { type: Type.STRING },
                  },
                  required: ['questionId', 'answerText', 'finalAnswer'],
                },
              },
            },
            required: ['solutions'],
          },
        };

        const firstCall = await generateGeminiContentWithFallback(
          {
            contents: prompt,
            config: solveConfig,
          },
          {
            apiKey,
            requireValidJson: true,
            validateJson: (candidate) =>
              Array.isArray(candidate.solutions) && candidate.solutions.length > 0,
          }
        );
        lastModelUsed = firstCall.modelUsed;
        totalAttemptsMade += firstCall.attemptsMade;

        const parsed = firstCall.parsedJson || safeParseGeminiJson(firstCall.response.text || '');
        const returnedList = Array.isArray(parsed?.solutions) ? parsed.solutions : [];

        const byId = new Map<string, Record<string, unknown>>();
        const usedRowIndices = new Set<number>();
        returnedList.forEach((row, rIdx) => {
          if (row && typeof row === 'object') {
            const qid = String((row as Record<string, unknown>).questionId || '').trim();
            if (qid) byId.set(qid, row as Record<string, unknown>);
          }
          void rIdx;
        });

        for (let chunkIdx = 0; chunkIdx < chunk.length; chunkIdx += 1) {
          const q = chunk[chunkIdx];
          let match: Record<string, unknown> | undefined = byId.get(q.id);

          // Flexible prefix/order/positional fallback if model slightly altered questionId suffix
          if (!match) {
            const prefixIdx = returnedList.findIndex((row, idx) => {
              if (usedRowIndices.has(idx) || !row || typeof row !== 'object') return false;
              const rowObj = row as Record<string, unknown>;
              const rowId = String(rowObj.questionId || '').trim();
              return (
                rowId === `q_${q.order}` ||
                rowId === String(q.order) ||
                rowId === q.numberLabel ||
                (q.id.includes('_') && rowId.startsWith(`q_${q.order}_`))
              );
            });
            if (prefixIdx >= 0) {
              usedRowIndices.add(prefixIdx);
              match = returnedList[prefixIdx] as Record<string, unknown>;
            } else if (
              returnedList.length === chunk.length &&
              returnedList[chunkIdx] &&
              typeof returnedList[chunkIdx] === 'object' &&
              !usedRowIndices.has(chunkIdx)
            ) {
              usedRowIndices.add(chunkIdx);
              match = returnedList[chunkIdx] as Record<string, unknown>;
            } else if (
              chunk.length === 1 &&
              returnedList.length === 1 &&
              returnedList[0] &&
              typeof returnedList[0] === 'object'
            ) {
              usedRowIndices.add(0);
              match = returnedList[0] as Record<string, unknown>;
            }
          } else {
            const exactIdx = returnedList.indexOf(match);
            if (exactIdx >= 0) usedRowIndices.add(exactIdx);
          }

          const answerText = String(match?.answerText || '').trim();
          const finalAnswer = String(match?.finalAnswer || '').trim();
          if (!match || (!answerText && !finalAnswer)) {
            session.solutionsByQuestionId[q.id] = {
              questionId: q.id,
              order: q.order,
              numberLabel: q.numberLabel,
              pageNumber: q.pageNumber,
              questionText: q.questionText,
              status: 'failed',
              shortAnswer: '',
              answerText: '',
              steps: [],
              finalAnswer: '',
              teachingNote: '',
              errorMessage: 'AI did not return a complete answer for this question. Click Retry on this item.',
              updatedAt: new Date().toISOString(),
            };
            continue;
          }

          const steps = Array.isArray(match.steps)
            ? match.steps.map((s) => String(s || '').trim()).filter(Boolean).slice(0, 30)
            : [];

          session.solutionsByQuestionId[q.id] = {
            questionId: q.id,
            order: q.order,
            numberLabel: q.numberLabel,
            pageNumber: q.pageNumber,
            questionText: q.questionText,
            status: 'solved',
            shortAnswer: String(match.shortAnswer || finalAnswer || '').trim().slice(0, 600),
            answerText: answerText.slice(0, 6000),
            steps,
            finalAnswer: (finalAnswer || String(match.shortAnswer || '')).trim().slice(0, 800),
            teachingNote: String(match.teachingNote || '').trim().slice(0, 800),
            errorMessage: '',
            updatedAt: new Date().toISOString(),
          };
        }
      } catch (err) {
        const mapped = mapSnapSolveGeminiError(err);
        totalAttemptsMade += mapped.attemptsMade || 1;
        batchFailure = {
          statusCode: mapped.statusCode,
          errorCode: mapped.errorCode,
          retryable: mapped.retryable,
          retryAfterSeconds: mapped.retryAfterSeconds,
          message: mapped.message,
        };

        // Mark remaining unprocessed items in queue as failed without losing previously solved ones
        const remainingItems = readableBatchQueue.slice(start);
        for (const q of remainingItems) {
          session.solutionsByQuestionId[q.id] = {
            questionId: q.id,
            order: q.order,
            numberLabel: q.numberLabel,
            pageNumber: q.pageNumber,
            questionText: q.questionText,
            status: 'failed',
            shortAnswer: '',
            answerText: '',
            steps: [],
            finalAnswer: '',
            teachingNote: '',
            errorMessage: mapped.message,
            updatedAt: new Date().toISOString(),
          };
        }
        break;
      }
    }
  }

  // Refresh expiration window while actively viewing/editing
  session.expiresAtMs = Date.now() + SNAPSOLVE_SESSION_TTL_MS;

  const orderedSolutions: SnapSolveSolutionItem[] = normalizedQuestions.map((q) => {
    const existing = session.solutionsByQuestionId[q.id];
    if (existing) {
      return {
        ...existing,
        order: q.order,
        numberLabel: q.numberLabel,
        pageNumber: q.pageNumber,
        questionText: q.questionText,
      };
    }
    return {
      questionId: q.id,
      order: q.order,
      numberLabel: q.numberLabel,
      pageNumber: q.pageNumber,
      questionText: q.questionText,
      status: q.isReadable ? 'failed' : 'unreadable',
      shortAnswer: '',
      answerText: '',
      steps: [],
      finalAnswer: '',
      teachingNote: '',
      errorMessage: q.isReadable
        ? 'Not yet solved.'
        : q.unreadableReason || 'Question image unreadable.',
      updatedAt: new Date().toISOString(),
    };
  });

  const stats = {
    total: orderedSolutions.length,
    solved: orderedSolutions.filter((s) => s.status === 'solved').length,
    failed: orderedSolutions.filter((s) => s.status === 'failed').length,
    unreadable: orderedSolutions.filter((s) => s.status === 'unreadable').length,
  };

  if (batchFailure) {
    if (stats.solved === 0) {
      return {
        statusCode: batchFailure.statusCode,
        payload: {
          success: false,
          errorCode: batchFailure.errorCode,
          retryable: batchFailure.retryable,
          retryAfterSeconds: batchFailure.retryAfterSeconds,
          attemptsMade: totalAttemptsMade,
          message: batchFailure.message,
          questions: session.questions,
          solutions: orderedSolutions,
          stats,
        },
      };
    }

    return {
      statusCode: 200,
      payload: {
        success: true,
        partialFailure: true,
        errorCode: batchFailure.errorCode,
        retryable: batchFailure.retryable,
        retryAfterSeconds: batchFailure.retryAfterSeconds,
        attemptsMade: totalAttemptsMade,
        warningMessage: batchFailure.message,
        sessionId: session.sessionId,
        expiresAt: new Date(session.expiresAtMs).toISOString(),
        subject,
        answerLanguage,
        answerStyle,
        modelUsed: lastModelUsed,
        questions: session.questions,
        solutions: orderedSolutions,
        stats,
      },
    };
  }

  return {
    statusCode: 200,
    payload: {
      success: true,
      sessionId: session.sessionId,
      expiresAt: new Date(session.expiresAtMs).toISOString(),
      subject,
      answerLanguage,
      answerStyle,
      modelUsed: lastModelUsed,
      attemptsMade: totalAttemptsMade,
      questions: session.questions,
      solutions: orderedSolutions,
      stats,
    },
  };
}

export async function handleSnapSolveDeleteSession(
  sessionId: string,
  headers: Record<string, string | string[] | undefined>
): Promise<{ statusCode: number; payload: Record<string, unknown> }> {
  purgeExpiredSessions();
  const cleanId = String(sessionId || '').trim();
  const session = ephemeralSessions.get(cleanId);
  if (!session) {
    return {
      statusCode: 200,
      payload: {
        success: true,
        cleared: true,
        message: 'Temporary SnapSolve session already cleared.',
      },
    };
  }

  const providedSecret = readHeaderValue(headers, 'x-snapsolve-secret');
  if (!verifySessionSecret(providedSecret, session.sessionSecret)) {
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: 'FORBIDDEN_SESSION',
        message: 'Unauthorized session cleanup request.',
      },
    };
  }

  if (session.ownerUid) {
    const authCheck = await resolveOptionalUid(headers.authorization);
    if (authCheck.authError || authCheck.uid !== session.ownerUid) {
      return {
        statusCode: 403,
        payload: {
          success: false,
          errorCode: 'UID_MISMATCH',
          message: 'This SnapSolve session belongs to a different signed-in account.',
        },
      };
    }
  }

  session.questions = [];
  session.solutionsByQuestionId = {};
  ephemeralSessions.delete(cleanId);

  return {
    statusCode: 200,
    payload: {
      success: true,
      cleared: true,
      message: 'Temporary uploaded pages and session answers cleared from server memory.',
    },
  };
}
