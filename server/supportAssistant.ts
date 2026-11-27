import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import fs from 'fs';
import path from 'path';
import {
  isFirebaseAdminConfigured,
  serverListCollection,
  serverQueryEqualsLimit1,
  serverSetDoc,
  serverUpdateDoc,
  verifyBearerIdToken,
} from '../firebase/admin';
import {
  HELP_DESK_SYSTEM_PROMPT,
  SUPPORT_NAVIGATION_ALLOWLIST,
  SupportLanguage,
  SupportNavigationAction,
  SupportNavigationActionId,
  SupportPortalContext,
  buildNavigationAction,
  detectQueryLanguage,
  extractBoard,
  extractClassLevel,
  matchKnowledgeBaseFastPath,
} from '../src/data/helpSupportKnowledgeBase';
import type { ClassLevel, EducationBoard } from '../src/types';
import {
  SUPPORT_USER_CATEGORY_LABELS,
  SupportTicket,
  SupportUserCategory,
  TicketStatus,
  normalizeSupportUserCategory,
} from '../src/types/support';

export interface SupportChatHistoryTurn {
  role: 'user' | 'assistant';
  text: string;
}

export interface SupportChatResponsePayload {
  success: boolean;
  source: 'knowledge_base' | 'gemini_ai' | 'kb_fallback';
  aiStatus: 'ok' | 'kb_fastpath' | 'missing_key' | 'quota_exceeded' | 'rate_limited' | 'upstream_error';
  reply: string;
  language: SupportLanguage;
  navigationActions: SupportNavigationAction[];
  suggestSupportTicket: boolean;
  portalContext?: SupportPortalContext;
  notice?: string;
}

export interface SupportAiStatusPayload {
  aiConnected: boolean;
  configured: boolean;
  mode: 'live_ai' | 'knowledge_base';
  reason: 'ok' | 'missing_key' | 'quota_exceeded' | 'api_key_invalid' | 'upstream_error';
  model: string;
  message: string;
}

const VALID_CLASSES = new Set<ClassLevel>([
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
]);

const VALID_BOARDS = new Set<EducationBoard>(['Maharashtra', 'CBSE', 'ICSE']);

const VALID_SUPPORT_CATEGORIES = new Set([
  'Registration & Login',
  'Password Reset',
  'Payment & Subscription',
  'Educational Material Access',
  'Notes & Study Material Downloads',
  'Technical Errors',
  'Incorrect Questions or Answers',
  'Website Navigation',
  'General Queries',
]);

const VALID_TICKET_STATUSES = new Set<TicketStatus>([
  'OPEN',
  'IN_PROGRESS',
  'RESOLVED',
  'CLOSED',
]);

const MAX_MESSAGE_CHARS = 600;
const MAX_HISTORY_TURNS = 6;
const CHAT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 45;
const MAX_AI_CALLS_PER_IP = 15;
const MAX_DAILY_AI_CALLS = 500;
const TICKET_WINDOW_MS = 15 * 60 * 1000;
const MAX_TICKETS_PER_IP = 10;

const ipRequestTimestamps = new Map<string, number[]>();
const ipAiTimestamps = new Map<string, number[]>();
const ipTicketTimestamps = new Map<string, number[]>();

let dailyAiTracker = {
  dateKey: new Date().toISOString().slice(0, 10),
  count: 0,
  quotaExhaustedUntilDate: '',
  lastKeyErrorReason: '' as '' | 'api_key_invalid' | 'upstream_error',
  lastUpstreamErrorAt: 0,
};

// Persistent Server Support Tickets Store (Disk + Memory + Firestore sync)
const SUPPORT_STORE_DIR = path.join(process.cwd(), 'data');
const SUPPORT_STORE_FILE = path.join(SUPPORT_STORE_DIR, 'support_tickets_store.json');
const serverSupportTicketsMap = new Map<string, SupportTicket>();
let supportTicketsLoadedFromDisk = false;

function ensureServerSupportTicketsLoaded(): void {
  if (supportTicketsLoadedFromDisk) return;
  supportTicketsLoadedFromDisk = true;
  try {
    if (fs.existsSync(SUPPORT_STORE_FILE)) {
      const raw = fs.readFileSync(SUPPORT_STORE_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && typeof item.id === 'string' && typeof item.ticketNumber === 'string') {
            serverSupportTicketsMap.set(item.id, item as SupportTicket);
          }
        }
      }
    }
  } catch (err) {
    console.warn('[Support Store Load Warning]:', err);
  }
}

function flushServerSupportTicketsToDisk(): boolean {
  try {
    if (!fs.existsSync(SUPPORT_STORE_DIR)) {
      fs.mkdirSync(SUPPORT_STORE_DIR, { recursive: true });
    }
    const list = Array.from(serverSupportTicketsMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    fs.writeFileSync(SUPPORT_STORE_FILE, JSON.stringify(list, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.warn('[Support Store Save Warning]:', err);
    return serverSupportTicketsMap.size > 0;
  }
}

function maskEmailForPublicLookup(rawEmail: string): string {
  const email = String(rawEmail || '').trim();
  const atIdx = email.indexOf('@');
  if (atIdx <= 1) return email ? '***' : '';
  return `${email.slice(0, 2)}***${email.slice(atIdx)}`;
}

export async function getServerSupportTickets(options?: {
  studentId?: string;
  ticketNumber?: string;
  bearerToken?: string;
  includeContactDetails?: boolean;
}): Promise<SupportTicket[]> {
  ensureServerSupportTicketsLoaded();
  const mergedMap = new Map<string, SupportTicket>();

  const pickFresher = (existing: SupportTicket | undefined, incoming: SupportTicket): SupportTicket => {
    if (!existing) return incoming;
    const tExisting = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
    const tIncoming = new Date(incoming.updatedAt || incoming.createdAt || 0).getTime();
    return tIncoming >= tExisting ? incoming : existing;
  };

  for (const t of serverSupportTicketsMap.values()) {
    mergedMap.set(t.id, t);
  }

  // Merge live Firestore records when Admin SDK or authenticated caller Bearer token is available
  try {
    if (options?.ticketNumber) {
      const targetUpper = options.ticketNumber.trim().toUpperCase();
      const diskMatch = Array.from(mergedMap.values()).find(
        (t) =>
          t.ticketNumber.toUpperCase() === targetUpper ||
          t.id.toUpperCase() === targetUpper
      );
      if (isFirebaseAdminConfigured() || options.bearerToken) {
        const docMatch = await serverQueryEqualsLimit1(
          'support_tickets',
          'ticketNumber',
          targetUpper,
          options.bearerToken ? { bearerToken: options.bearerToken } : undefined
        ).catch(() => null);
        if (docMatch?.data) {
          const fsTicket = {
            ...(docMatch.data as SupportTicket),
            id: (docMatch.data.id as string) || docMatch.id,
          };
          mergedMap.set(fsTicket.id, pickFresher(mergedMap.get(fsTicket.id), fsTicket));
        }
      }
      const list = Array.from(mergedMap.values()).filter(
        (t) =>
          t.ticketNumber.toUpperCase() === targetUpper ||
          t.id.toUpperCase() === targetUpper
      );
      const finalList = list.length ? list : diskMatch ? [diskMatch] : [];
      if (options.includeContactDetails) return finalList;
      return finalList.map((t) => ({
        ...t,
        email: maskEmailForPublicLookup(t.email),
        mobile: '',
      }));
    }

    if (isFirebaseAdminConfigured() || options?.bearerToken) {
      const docs = await serverListCollection(
        'support_tickets',
        300,
        options?.bearerToken ? { bearerToken: options.bearerToken } : undefined
      ).catch(() => []);
      for (const item of docs) {
        if (item?.data && (item.data.ticketNumber || item.data.id)) {
          const fsTicket = {
            ...(item.data as SupportTicket),
            id: (item.data.id as string) || item.id,
          };
          mergedMap.set(fsTicket.id, pickFresher(mergedMap.get(fsTicket.id), fsTicket));
        }
      }
    }
  } catch (err) {
    console.warn('[Support Ticket Firestore Read Warning]:', err);
  }

  const list = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  if (options?.studentId) {
    return list.filter((t) => t.studentId === options.studentId);
  }
  return list;
}

export async function updateServerSupportTicketStatus(
  ticketId: string,
  statusRaw: string,
  adminResponseRaw?: string,
  bearerToken?: string
): Promise<{
  statusCode: number;
  payload: Record<string, unknown>;
}> {
  ensureServerSupportTicketsLoaded();
  const cleanId = String(ticketId || '').trim();
  if (!cleanId) {
    return {
      statusCode: 400,
      payload: { success: false, error: 'Ticket ID is required.' },
    };
  }

  const normalizedUpper = String(statusRaw || '').trim().toUpperCase();
  const mappedStatus: TicketStatus =
    normalizedUpper === 'NEW' || normalizedUpper === 'OPEN'
      ? 'OPEN'
      : normalizedUpper === 'IN_PROGRESS' || normalizedUpper === 'IN PROGRESS' || normalizedUpper === 'PENDING'
      ? 'IN_PROGRESS'
      : normalizedUpper === 'RESOLVED'
      ? 'RESOLVED'
      : normalizedUpper === 'CLOSED'
      ? 'CLOSED'
      : VALID_TICKET_STATUSES.has(statusRaw as TicketStatus)
      ? (statusRaw as TicketStatus)
      : 'IN_PROGRESS';

  const nowIso = new Date().toISOString();
  const cleanResponse =
    adminResponseRaw !== undefined ? String(adminResponseRaw).trim().slice(0, 2000) : undefined;

  let targetKey = cleanId;
  let existing = serverSupportTicketsMap.get(cleanId);
  if (!existing) {
    const cleanUpper = cleanId.toUpperCase();
    for (const [k, v] of serverSupportTicketsMap.entries()) {
      if (v.ticketNumber.toUpperCase() === cleanUpper || v.id.toUpperCase() === cleanUpper) {
        targetKey = k;
        existing = v;
        break;
      }
    }
  }

  let updatedTicket: SupportTicket | undefined;
  if (existing) {
    updatedTicket = {
      ...existing,
      status: mappedStatus,
      ...(cleanResponse !== undefined ? { adminResponse: cleanResponse } : {}),
      updatedAt: nowIso,
    };
    serverSupportTicketsMap.set(targetKey, updatedTicket);
    flushServerSupportTicketsToDisk();
  }

  if (isFirebaseAdminConfigured() || bearerToken) {
    try {
      await serverUpdateDoc(
        'support_tickets',
        targetKey,
        {
          status: mappedStatus,
          ...(cleanResponse !== undefined ? { adminResponse: cleanResponse } : {}),
          updatedAt: nowIso,
        },
        bearerToken ? { bearerToken } : undefined
      );
    } catch (err) {
      console.warn('[Support Ticket Firestore Update Warning]:', err);
    }
  }

  if (!updatedTicket && !isFirebaseAdminConfigured() && !bearerToken) {
    return {
      statusCode: 404,
      payload: { success: false, error: 'Support ticket not found.' },
    };
  }

  return {
    statusCode: 200,
    payload: {
      success: true,
      ticketId: targetKey,
      status: mappedStatus,
      adminResponse: cleanResponse,
      updatedAt: nowIso,
      ticket: updatedTicket,
    },
  };
}

function pruneAndCheckWindow(
  store: Map<string, number[]>,
  ip: string,
  windowMs: number,
  limit: number,
  record: boolean = true
): boolean {
  const now = Date.now();
  const list = (store.get(ip) || []).filter((ts) => now - ts < windowMs);
  if (list.length >= limit) {
    store.set(ip, list);
    return false;
  }
  if (record) {
    list.push(now);
    store.set(ip, list);
  }
  return true;
}

function getConfiguredGeminiKey(): string {
  const raw = String(process.env.GEMINI_API_KEY || '').trim().replace(/^["']+|["']+$/g, '');
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

export function getSupportAiStatus(): SupportAiStatusPayload {
  const apiKey = getConfiguredGeminiKey();
  const todayKey = new Date().toISOString().slice(0, 10);
  if (dailyAiTracker.dateKey !== todayKey) {
    dailyAiTracker = {
      dateKey: todayKey,
      count: 0,
      quotaExhaustedUntilDate: '',
      lastKeyErrorReason: '',
      lastUpstreamErrorAt: 0,
    };
  }

  if (!apiKey) {
    return {
      aiConnected: false,
      configured: false,
      mode: 'knowledge_base',
      reason: 'missing_key',
      model: 'gemini-4-hydrogen',
      message:
        'Knowledge Base Mode (Server GEMINI_API_KEY not configured — free Knowledge Base & Support Tickets active)',
    };
  }

  if (dailyAiTracker.lastKeyErrorReason === 'api_key_invalid') {
    return {
      aiConnected: false,
      configured: false,
      mode: 'knowledge_base',
      reason: 'api_key_invalid',
      model: 'gemini-4-hydrogen',
      message:
        'Knowledge Base Mode (Configured GEMINI_API_KEY rejected — check Settings > Secrets)',
    };
  }

  if (dailyAiTracker.quotaExhaustedUntilDate === todayKey || dailyAiTracker.count >= MAX_DAILY_AI_CALLS) {
    return {
      aiConnected: false,
      configured: true,
      mode: 'knowledge_base',
      reason: 'quota_exceeded',
      model: 'gemini-4-hydrogen',
      message:
        'Knowledge Base Mode (Free-tier daily AI quota reached — paid billing is never auto-enabled)',
    };
  }

  if (
    dailyAiTracker.lastUpstreamErrorAt &&
    Date.now() - dailyAiTracker.lastUpstreamErrorAt < 2 * 60 * 1000
  ) {
    return {
      aiConnected: false,
      configured: true,
      mode: 'knowledge_base',
      reason: 'upstream_error',
      model: 'gemini-4-hydrogen',
      message:
        'Knowledge Base Mode (Gemini service temporarily busy — Knowledge Base & Support Tickets active)',
    };
  }

  return {
    aiConnected: true,
    configured: true,
    mode: 'live_ai',
    reason: 'ok',
    model: 'gemini-4-hydrogen',
    message: 'Live Free-Tier Gemini AI Connected (gemini-4-hydrogen)',
  };
}

function resolvePortalContext(rawRole: unknown, rawPortal: unknown): SupportPortalContext {
  const portalStr = String(rawPortal || rawRole || '').trim().toLowerCase();
  if (portalStr === 'teacher') return 'teacher';
  if (portalStr === 'parent' || portalStr === 'parent-zone') return 'parent';
  if (portalStr === 'college' || portalStr === 'school_admin' || portalStr === 'school-college-zone') {
    return 'college';
  }
  if (portalStr === 'institute' || portalStr === 'institute_admin' || portalStr === 'coaching-zone') {
    return 'institute';
  }
  if (portalStr === 'student') return 'student';
  if (portalStr === 'homepage' || portalStr === 'public-home') return 'homepage';
  return 'visitor';
}

function buildFallbackMessage(
  lang: SupportLanguage,
  userMessage: string,
  suggestTicket: boolean,
  portalContext: SupportPortalContext
): {
  reply: string;
  navigationActions: SupportNavigationAction[];
} {
  const cls = extractClassLevel(userMessage);
  const board = extractBoard(userMessage);
  const actions: SupportNavigationAction[] =
    portalContext === 'teacher'
      ? [
          buildNavigationAction('open_teacher_resources', cls, board, 'teacher'),
          buildNavigationAction('open_lesson_planner', cls, board, 'teacher'),
          buildNavigationAction('open_question_paper_generator', cls, board, 'teacher'),
          buildNavigationAction('open_worksheets', cls, board, 'teacher'),
        ]
      : portalContext === 'parent'
      ? [
          buildNavigationAction('open_parent_portal', cls, board, 'parent'),
          buildNavigationAction('open_register', cls, board, 'parent'),
          buildNavigationAction('open_login', cls, board, 'parent'),
        ]
      : portalContext === 'college'
      ? [
          buildNavigationAction('open_college_portal', cls, board, 'college'),
          buildNavigationAction('open_register', cls, board, 'college'),
          buildNavigationAction('open_login', cls, board, 'college'),
        ]
      : portalContext === 'institute'
      ? [
          buildNavigationAction('open_institute_portal', cls, board, 'institute'),
          buildNavigationAction('open_register', cls, board, 'institute'),
          buildNavigationAction('open_login', cls, board, 'institute'),
        ]
      : portalContext === 'student'
      ? [
          buildNavigationAction('open_syllabus', cls, board, 'student'),
          buildNavigationAction('open_worksheets', cls, board, 'student'),
          buildNavigationAction('open_quizzes', cls, board, 'student'),
          buildNavigationAction('open_dictionary', cls, board, 'student'),
        ]
      : [
          buildNavigationAction('open_student_portal'),
          buildNavigationAction('open_teacher_resources'),
          buildNavigationAction('open_parent_portal'),
          buildNavigationAction('open_ai_tools'),
        ];

  if (lang === 'hi') {
    return {
      reply: suggestTicket
        ? 'आप सीधे नीचे दिए गए नेविगेशन बटन से संबंधित पोर्टल या सेक्शन खोल सकते हैं। यदि यह आपके खाते, लॉगिन, पेमेंट या किसी तकनीकी समस्या से जुड़ा है, तो कृपया SUBMIT A SUPPORT REQUEST बटन पर क्लिक करके अपनी समस्या भेजें।'
        : 'आप नीचे दिए गए डायरेक्ट बटन से स्टडी नोट्स, वर्कशीट, AI जनरेटर, टीचर लेसन प्लानर या अपने पोर्टल (Student, Teacher, Parent, College, Institute) खोल सकते हैं। किसी व्यक्तिगत समस्या के लिए आप Support Request भी भेज सकते हैं।',
      navigationActions: actions,
    };
  }
  if (lang === 'mr') {
    return {
      reply: suggestTicket
        ? 'तुम्ही खालील डायरेक्ट बटणांद्वारे संबंधित पोर्टल किंवा विभाग उघडू शकता. ही तुमच्या खात्याशी, लॉगिन, पेमेंट किंवा तांत्रिक अडचणीशी संबंधित समस्या असल्यास कृपया खालील SUBMIT A SUPPORT REQUEST बटणावर क्लिक करा.'
        : 'तुम्ही खालील डायरेक्ट बटणांद्वारे स्टडी नोट्स, वर्कशीट्स, AI जनरेटर, शिक्षक लेसन प्लानर किंवा तुमचे पोर्टल (Student, Teacher, Parent, College, Institute) उघडू शकता. वैयक्तिक अडचणीसाठी Support Request देखील पाठवू शकता.',
      navigationActions: actions,
    };
  }
  return {
    reply: suggestTicket
      ? 'You can jump directly to key MyStudyZone portals and sections using the buttons below. If you are facing a personal account, login, payment, or technical issue, click SUBMIT A SUPPORT REQUEST below to escalate your request to our Admin Support team.'
      : 'You can use the direct navigation buttons below to open Study Notes, Worksheets, the AI Generator, Teacher Lesson Planner, or any of the 5 Portals (Student, Teacher, Parent, College, Institute). Feel free to ask a specific question or click SUBMIT A SUPPORT REQUEST if you need admin assistance.',
    navigationActions: actions,
  };
}

export async function handleSupportChatRequest(
  body: Record<string, unknown>,
  clientIp: string
): Promise<SupportChatResponsePayload> {
  const rawMessage = String(body?.message || '').trim();
  if (!rawMessage) {
    return {
      success: false,
      source: 'knowledge_base',
      aiStatus: 'upstream_error',
      reply: 'Please type your question so I can help you.',
      language: 'en',
      navigationActions: [],
      suggestSupportTicket: false,
    };
  }

  const message = rawMessage.slice(0, MAX_MESSAGE_CHARS);
  const lang = detectQueryLanguage(message);
  const portalContext = resolvePortalContext(body?.userRole, body?.portalContext);

  const withinGlobalLimit = pruneAndCheckWindow(
    ipRequestTimestamps,
    clientIp || 'unknown',
    CHAT_WINDOW_MS,
    MAX_REQUESTS_PER_IP
  );
  if (!withinGlobalLimit) {
    return {
      success: true,
      source: 'kb_fallback',
      aiStatus: 'rate_limited',
      reply:
        lang === 'hi'
          ? 'बहुत अधिक संदेश भेजे गए हैं। कृपया कुछ मिनट बाद पुनः प्रयास करें, या नीचे दिए बटन से अपनी समस्या भेजें।'
          : lang === 'mr'
          ? 'खूप जास्त संदेश पाठवले गेले आहेत. कृपया थोड्या वेळाने पुन्हा प्रयत्न करा, किंवा खालील बटणावरून तक्रार नोंदवा.'
          : 'Too many messages sent in a short time. Please wait a few minutes or submit a Support Request below.',
      language: lang,
      navigationActions: [buildNavigationAction('open_dashboard')],
      suggestSupportTicket: true,
      portalContext,
      notice: 'Rate limit reached to keep MyStudyZone Help Desk fast and free for everyone.',
    };
  }

  // 1. Knowledge Base & Typo-Tolerant Navigation Fast Path (Zero AI cost)
  const kbMatch = matchKnowledgeBaseFastPath(message, { userRole: portalContext });
  if (kbMatch.matched) {
    return {
      success: true,
      source: 'knowledge_base',
      aiStatus: 'kb_fastpath',
      reply: kbMatch.reply,
      language: kbMatch.language,
      navigationActions: kbMatch.navigationActions,
      suggestSupportTicket: kbMatch.suggestSupportTicket,
      portalContext,
    };
  }

  // 2. Check AI key & strict free-tier quota guardrails before calling Gemini
  const apiKey = getConfiguredGeminiKey();
  const todayKey = new Date().toISOString().slice(0, 10);
  if (dailyAiTracker.dateKey !== todayKey) {
    dailyAiTracker = {
      dateKey: todayKey,
      count: 0,
      quotaExhaustedUntilDate: '',
      lastKeyErrorReason: '',
      lastUpstreamErrorAt: 0,
    };
  }

  const buildKbOrGenericFallback = (
    aiStatus: SupportChatResponsePayload['aiStatus'],
    notice: string,
    suggestTicket: boolean
  ): SupportChatResponsePayload => {
    const complexKbMatch = matchKnowledgeBaseFastPath(message, {
      userRole: portalContext,
      includeComplexMatch: true,
    });
    if (complexKbMatch.matched) {
      return {
        success: true,
        source: 'kb_fallback',
        aiStatus,
        reply: complexKbMatch.reply,
        language: complexKbMatch.language,
        navigationActions: complexKbMatch.navigationActions,
        suggestSupportTicket: complexKbMatch.suggestSupportTicket || suggestTicket,
        portalContext,
        notice,
      };
    }
    const fb = buildFallbackMessage(lang, message, suggestTicket, portalContext);
    return {
      success: true,
      source: 'kb_fallback',
      aiStatus,
      reply: fb.reply,
      language: lang,
      navigationActions: fb.navigationActions,
      suggestSupportTicket: true,
      portalContext,
      notice,
    };
  };

  if (!apiKey) {
    return buildKbOrGenericFallback(
      'missing_key',
      'Running in Knowledge Base Mode (GEMINI_API_KEY is not configured on the server). Step-by-step portal guides, direct navigation, and Support Tickets remain active.',
      false
    );
  }

  // Strict Free API Policy: If free quota was already exhausted today, stop AI calls immediately
  if (dailyAiTracker.quotaExhaustedUntilDate === todayKey || dailyAiTracker.count >= MAX_DAILY_AI_CALLS) {
    return buildKbOrGenericFallback(
      'quota_exceeded',
      'Free-tier AI quota is temporarily exhausted for today. Paid models are never activated automatically. Knowledge Base guidance and Admin Support Tickets remain fully active.',
      true
    );
  }

  const withinAiIpLimit = pruneAndCheckWindow(
    ipAiTimestamps,
    clientIp || 'unknown',
    CHAT_WINDOW_MS,
    MAX_AI_CALLS_PER_IP
  );
  if (!withinAiIpLimit) {
    return buildKbOrGenericFallback(
      'rate_limited',
      'Free AI chat limit reached for this session window. Showing Knowledge Base guidance & direct links.',
      true
    );
  }

  // 3. Call server-side @google/genai using ONLY free-tier eligible model gemini-4-hydrogen
  try {
    dailyAiTracker.count += 1;
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });

    const rawHistory = Array.isArray(body?.history) ? body.history : [];
    const safeHistory: SupportChatHistoryTurn[] = rawHistory
      .slice(-MAX_HISTORY_TURNS)
      .map((t: any) => ({
        role: t?.role === 'assistant' ? ('assistant' as const) : ('user' as const),
        text: String(t?.text || '').slice(0, 400),
      }))
      .filter((t) => Boolean(t.text));

    const historyText = safeHistory
      .map((t) => `${t.role === 'assistant' ? 'Assistant' : 'User'}: ${t.text}`)
      .join('\n');

    const promptText = [
      `Current User Portal Context: ${portalContext}`,
      historyText ? `Recent Conversation:\n${historyText}` : '',
      `Latest User Question: ${message}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    const generateParams = {
      model: 'gemini-4-hydrogen',
      contents: promptText,
      config: {
        systemInstruction: HELP_DESK_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description:
                'Simple, friendly, short, step-by-step answer in the user language (English, Hindi, or Marathi) using ONLY real MyStudyZone features.',
            },
            language: {
              type: Type.STRING,
              description: 'Language code: en, hi, or mr',
            },
            navigationActionIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '0 to 3 exact allowlisted action IDs from system instructions',
            },
            detectedClass: {
              type: Type.STRING,
              description: 'Optional Class 1 through Class 10 if specifically requested',
            },
            detectedBoard: {
              type: Type.STRING,
              description: 'Optional Maharashtra, CBSE, or ICSE if specifically requested',
            },
            suggestSupportTicket: {
              type: Type.BOOLEAN,
              description:
                'True if the user has a personal account, login, payment, class correction, or unresolved technical problem.',
            },
          },
          required: ['reply', 'language', 'navigationActionIds', 'suggestSupportTicket'],
        },
      },
    };

    let response;
    try {
      response = await ai.models.generateContent(generateParams);
    } catch (firstErr: any) {
      const firstMsg = String(firstErr?.message || '');
      if (firstErr?.status === 503 || firstMsg.includes('503') || firstMsg.includes('UNAVAILABLE')) {
        await new Promise((r) => setTimeout(r, 450));
        response = await ai.models.generateContent(generateParams);
      } else {
        throw firstErr;
      }
    }

    dailyAiTracker.lastKeyErrorReason = '';
    dailyAiTracker.lastUpstreamErrorAt = 0;
    const rawJson = response.text || '{}';
    const parsed = JSON.parse(rawJson) as {
      reply?: string;
      language?: string;
      navigationActionIds?: string[];
      detectedClass?: string;
      detectedBoard?: string;
      suggestSupportTicket?: boolean;
    };

    const replyLang: SupportLanguage =
      parsed.language === 'hi' || parsed.language === 'mr' ? parsed.language : lang;

    const targetClass: ClassLevel | undefined =
      parsed.detectedClass && VALID_CLASSES.has(parsed.detectedClass as ClassLevel)
        ? (parsed.detectedClass as ClassLevel)
        : extractClassLevel(message);

    const targetBoard: EducationBoard | undefined =
      parsed.detectedBoard && VALID_BOARDS.has(parsed.detectedBoard as EducationBoard)
        ? (parsed.detectedBoard as EducationBoard)
        : extractBoard(message);

    const lowerMsg = message.toLowerCase();
    const isPortalActionAllowedForContext = (actionId: SupportNavigationActionId): boolean => {
      if (portalContext === 'teacher' && actionId === 'open_student_portal') {
        return lowerMsg.includes('student portal');
      }
      if (portalContext === 'parent' && (actionId === 'open_student_portal' || actionId === 'open_teacher_resources')) {
        return lowerMsg.includes('student portal') || lowerMsg.includes('teacher portal');
      }
      if (portalContext === 'college' && (actionId === 'open_student_portal' || actionId === 'open_institute_portal')) {
        return lowerMsg.includes('student portal') || lowerMsg.includes('institute portal');
      }
      if (portalContext === 'institute' && (actionId === 'open_student_portal' || actionId === 'open_college_portal')) {
        return lowerMsg.includes('student portal') || lowerMsg.includes('college portal');
      }
      return true;
    };

    const validActions: SupportNavigationAction[] = [];
    const seenIds = new Set<string>();
    for (const rawId of parsed.navigationActionIds || []) {
      const id = String(rawId || '').trim() as SupportNavigationActionId;
      if (
        id in SUPPORT_NAVIGATION_ALLOWLIST &&
        !seenIds.has(id) &&
        isPortalActionAllowedForContext(id) &&
        validActions.length < 3
      ) {
        seenIds.add(id);
        validActions.push(buildNavigationAction(id, targetClass, targetBoard, portalContext));
      }
    }

    const cleanReply = String(parsed.reply || '').trim();
    if (!cleanReply) {
      dailyAiTracker.lastUpstreamErrorAt = Date.now();
      return buildKbOrGenericFallback(
        'upstream_error',
        'AI response was empty. Showing verified Knowledge Base guidance instead.',
        Boolean(parsed.suggestSupportTicket)
      );
    }

    return {
      success: true,
      source: 'gemini_ai',
      aiStatus: 'ok',
      reply: cleanReply,
      language: replyLang,
      navigationActions: validActions,
      suggestSupportTicket: Boolean(parsed.suggestSupportTicket),
      portalContext,
    };
  } catch (err: any) {
    const errMsg = String(err?.message || err || '');
    const upperMsg = errMsg.toUpperCase();
    const isQuota =
      err?.status === 429 ||
      errMsg.includes('429') ||
      upperMsg.includes('RESOURCE_EXHAUSTED') ||
      errMsg.toLowerCase().includes('quota');
    const isInvalidKey =
      err?.status === 400 ||
      err?.status === 401 ||
      err?.status === 403 ||
      upperMsg.includes('API_KEY_INVALID') ||
      upperMsg.includes('PERMISSION_DENIED');
    console.warn('[Support Assistant AI Fallback]:', errMsg);

    if (isQuota) {
      dailyAiTracker.quotaExhaustedUntilDate = todayKey;
    } else if (isInvalidKey) {
      dailyAiTracker.lastKeyErrorReason = 'api_key_invalid';
    } else {
      dailyAiTracker.lastUpstreamErrorAt = Date.now();
    }

    return buildKbOrGenericFallback(
      isQuota ? 'quota_exceeded' : 'upstream_error',
      isQuota
        ? 'Free-tier AI quota is currently exhausted. Paid models are never activated automatically. Showing Knowledge Base guidance and Support Request option.'
        : isInvalidKey
        ? 'Configured GEMINI_API_KEY could not be authenticated by Gemini. Running in Knowledge Base mode.'
        : 'AI assistant is temporarily unavailable. Showing Knowledge Base guidance and Support Request option.',
      true
    );
  }
}

export async function handleSupportTicketSubmission(
  body: Record<string, unknown>,
  headers: { authorization?: string | string[] },
  clientIp: string
): Promise<{
  statusCode: number;
  payload: Record<string, unknown>;
}> {
  ensureServerSupportTicketsLoaded();

  const withinTicketLimit = pruneAndCheckWindow(
    ipTicketTimestamps,
    clientIp || 'unknown',
    TICKET_WINDOW_MS,
    MAX_TICKETS_PER_IP
  );
  if (!withinTicketLimit) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        persisted: false,
        error: 'Too many support requests submitted from your connection. Please try again in 15 minutes.',
      },
    };
  }

  const userCategory: SupportUserCategory = normalizeSupportUserCategory(
    String(body?.userCategory || body?.requesterRole || 'student')
  );
  const categoryLabel = SUPPORT_USER_CATEGORY_LABELS[userCategory];
  const name = String(body?.name || '').trim().slice(0, 100);
  const email = String(body?.email || '').trim().toLowerCase().slice(0, 150);
  const mobile = String(body?.mobile || '').replace(/[^\d+\-\s]/g, '').trim().slice(0, 20);
  const rawCategory = String(body?.category || 'General Queries').trim();
  const category = (VALID_SUPPORT_CATEGORIES.has(rawCategory)
    ? rawCategory
    : 'General Queries') as SupportTicket['category'];
  const description = String(body?.description || '').trim().slice(0, 1800);
  const subjectInput = String(body?.subject || '').trim().slice(0, 180);
  const portalContext = String(body?.portalContext || userCategory).trim().slice(0, 40);

  if (name.length < 2) {
    return {
      statusCode: 400,
      payload: { success: false, persisted: false, error: 'Please enter your full name.' },
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      payload: { success: false, persisted: false, error: 'Please enter a valid registered email address.' },
    };
  }
  if (description.length < 10) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        persisted: false,
        error: 'Please describe your problem in at least 10 characters.',
      },
    };
  }

  let verifiedUid: string | null = null;
  let bearerToken = '';
  if (headers.authorization) {
    const authRes = await verifyBearerIdToken(headers.authorization).catch(() => null);
    if (authRes?.valid && authRes.uid) {
      verifiedUid = authRes.uid;
      bearerToken = authRes.token || '';
    }
  }

  const nowIso = new Date().toISOString();
  const rand = Math.floor(10000 + Math.random() * 90000);
  const ticketNumber = `TKT-MSZ-${rand}`;
  const ticketId = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const subject = subjectInput || `[${categoryLabel}] ${category}`;

  const ticketDoc: SupportTicket = {
    id: ticketId,
    ticketNumber,
    studentId: verifiedUid || String(body?.studentId || 'guest_helpdesk').slice(0, 128),
    studentName: name,
    userCategory,
    requesterRole: userCategory,
    portalContext,
    email,
    mobile,
    category,
    subject,
    description,
    status: 'OPEN',
    priority: category.includes('Payment') ? 'HIGH' : 'MEDIUM',
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  try {
    // 1. Always save into the persistent server ticket store first
    serverSupportTicketsMap.set(ticketId, ticketDoc);
    const savedToDisk = flushServerSupportTicketsToDisk();

    // 2. Also persist to Firestore when Admin SDK or verified user Bearer token is present
    let savedToFirestore = false;
    if (isFirebaseAdminConfigured() || bearerToken) {
      const writeRes = await serverSetDoc(
        'support_tickets',
        ticketId,
        ticketDoc as unknown as Record<string, unknown>,
        { merge: false, ...(bearerToken ? { bearerToken } : {}) }
      ).catch(() => null);
      savedToFirestore = Boolean(writeRes);
    }

    if (!savedToDisk && !savedToFirestore && serverSupportTicketsMap.size === 0) {
      return {
        statusCode: 500,
        payload: {
          success: false,
          persisted: false,
          error: 'Unable to save your support request right now. Please try again.',
        },
      };
    }

    return {
      statusCode: 201,
      payload: {
        success: true,
        persisted: true,
        storage: savedToFirestore ? 'firestore_synced' : 'server_persistent_store',
        ticket: ticketDoc,
      },
    };
  } catch (err: any) {
    console.error('[Support Ticket Server Error]:', err);
    return {
      statusCode: 500,
      payload: {
        success: false,
        persisted: false,
        error: 'Unable to save your support request right now. Please retry or email support@mystudyzone.in.',
      },
    };
  }
}
