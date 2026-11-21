import { GoogleGenAI, Type } from '@google/genai';
import {
  isFirebaseAdminConfigured,
  serverSetDoc,
  verifyBearerIdToken,
} from '../firebase/admin';
import {
  HELP_DESK_SYSTEM_PROMPT,
  SUPPORT_NAVIGATION_ALLOWLIST,
  SupportLanguage,
  SupportNavigationAction,
  SupportNavigationActionId,
  buildNavigationAction,
  detectQueryLanguage,
  extractBoard,
  extractClassLevel,
  matchKnowledgeBaseFastPath,
} from '../src/data/helpSupportKnowledgeBase';
import type { ClassLevel, EducationBoard } from '../src/types';

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
  notice?: string;
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

const MAX_MESSAGE_CHARS = 600;
const MAX_HISTORY_TURNS = 6;
const CHAT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_IP = 45;
const MAX_AI_CALLS_PER_IP = 15;
const MAX_DAILY_AI_CALLS = 500;
const TICKET_WINDOW_MS = 15 * 60 * 1000;
const MAX_TICKETS_PER_IP = 6;

const ipRequestTimestamps = new Map<string, number[]>();
const ipAiTimestamps = new Map<string, number[]>();
const ipTicketTimestamps = new Map<string, number[]>();

let dailyAiTracker = {
  dateKey: new Date().toISOString().slice(0, 10),
  count: 0,
};

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

function buildFallbackMessage(lang: SupportLanguage, userMessage: string, suggestTicket: boolean): {
  reply: string;
  navigationActions: SupportNavigationAction[];
} {
  const cls = extractClassLevel(userMessage);
  const board = extractBoard(userMessage);
  const actions: SupportNavigationAction[] = [
    buildNavigationAction('open_all_courses', cls, board),
    buildNavigationAction('open_worksheets', cls, board),
    buildNavigationAction('open_syllabus', cls, board),
    buildNavigationAction('open_teacher_resources'),
  ];

  if (lang === 'hi') {
    return {
      reply: suggestTicket
        ? 'आप सीधे नीचे दिए गए नेविगेशन बटन से संबंधित सेक्शन खोल सकते हैं। यदि यह आपके खाते, लॉगिन, पेमेंट या किसी तकनीकी समस्या से जुड़ा है, तो कृपया SUBMIT A SUPPORT REQUEST बटन पर क्लिक करके अपनी समस्या भेजें।'
        : 'आप नीचे दिए गए डायरेक्ट बटन से कोर्स (कक्षा 1–10), वर्कशीट, सिलेबस नोट्स, स्कॉलरशिप, TET/CTET या टीचर सुविधाएँ खोल सकते हैं। यदि किसी व्यक्तिगत समस्या में मदद चाहिए, तो आप Support Request भी भेज सकते हैं।',
      navigationActions: actions,
    };
  }
  if (lang === 'mr') {
    return {
      reply: suggestTicket
        ? 'तुम्ही खालील डायरेक्ट बटणांद्वारे संबंधित विभाग उघडू शकता. ही तुमच्या खात्याशी, लॉगिन, पेमेंट किंवा तांत्रिक अडचणीशी संबंधित समस्या असल्यास कृपया खालील SUBMIT A SUPPORT REQUEST बटणावर क्लिक करा.'
        : 'तुम्ही खालील डायरेक्ट बटणांद्वारे कोर्स (इयत्ता १–१०), वर्कशीट्स, अभ्यासक्रम व नोट्स, शिष्यवृत्ती, TET/CTET किंवा शिक्षक सुविधा उघडू शकता. वैयक्तिक अडचणीसाठी Support Request देखील पाठवू शकता.',
      navigationActions: actions,
    };
  }
  return {
    reply: suggestTicket
      ? 'You can jump directly to key MyStudyZone sections using the buttons below. If you are facing a personal account, login, payment, or technical issue, click SUBMIT A SUPPORT REQUEST below to reach our support team.'
      : 'You can use the direct navigation buttons below to open Courses (Classes 1–10), Worksheets, Syllabus & Study Notes, Scholarship, TET/CTET, or Teacher Resources. Feel free to ask a more specific question or submit a Support Request if needed.',
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
  const userRole =
    body?.userRole === 'teacher'
      ? 'teacher'
      : body?.userRole === 'student'
      ? 'student'
      : 'visitor';

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
      notice: 'Rate limit reached to keep MyStudyZone Help Desk fast and free for everyone.',
    };
  }

  // 1. Knowledge Base & Typo-Tolerant Navigation Fast Path (Zero AI cost)
  const kbMatch = matchKnowledgeBaseFastPath(message, { userRole });
  if (kbMatch.matched) {
    return {
      success: true,
      source: 'knowledge_base',
      aiStatus: 'kb_fastpath',
      reply: kbMatch.reply,
      language: kbMatch.language,
      navigationActions: kbMatch.navigationActions,
      suggestSupportTicket: kbMatch.suggestSupportTicket,
    };
  }

  // 2. Check AI key & free-tier quota guardrails before calling Gemini
  const apiKey = getConfiguredGeminiKey();
  if (!apiKey) {
    const fb = buildFallbackMessage(lang, message, false);
    return {
      success: true,
      source: 'kb_fallback',
      aiStatus: 'missing_key',
      reply: fb.reply,
      language: lang,
      navigationActions: fb.navigationActions,
      suggestSupportTicket: true,
      notice:
        'Live AI assistant is currently running in Knowledge Base mode (GEMINI_API_KEY is not configured on the server). You can still navigate directly or submit a Support Request.',
    };
  }

  const todayKey = new Date().toISOString().slice(0, 10);
  if (dailyAiTracker.dateKey !== todayKey) {
    dailyAiTracker = { dateKey: todayKey, count: 0 };
  }

  const withinAiIpLimit = pruneAndCheckWindow(
    ipAiTimestamps,
    clientIp || 'unknown',
    CHAT_WINDOW_MS,
    MAX_AI_CALLS_PER_IP
  );
  if (!withinAiIpLimit || dailyAiTracker.count >= MAX_DAILY_AI_CALLS) {
    const fb = buildFallbackMessage(lang, message, true);
    return {
      success: true,
      source: 'kb_fallback',
      aiStatus: 'rate_limited',
      reply: fb.reply,
      language: lang,
      navigationActions: fb.navigationActions,
      suggestSupportTicket: true,
      notice:
        'AI chat limit reached for now. Showing Knowledge Base guidance & direct links.',
    };
  }

  // 3. Call server-side @google/genai using free-tier model gemini-4-hydrogen
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
      `Current User Portal Role: ${userRole}`,
      historyText ? `Recent Conversation:\n${historyText}` : '',
      `Latest User Question: ${message}`,
    ]
      .filter(Boolean)
      .join('\n\n');

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: promptText,
      config: {
        systemInstruction: HELP_DESK_SYSTEM_PROMPT,
        responseMimeType: 'application/json',
        temperature: 0.3,
        maxOutputTokens: 700,
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description:
                'Helpful, concise, accurate answer in the user language (English, Hindi, or Marathi) using ONLY real MyStudyZone features.',
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
    });

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

    const validActions: SupportNavigationAction[] = [];
    const seenIds = new Set<string>();
    for (const rawId of parsed.navigationActionIds || []) {
      const id = String(rawId || '').trim() as SupportNavigationActionId;
      if (id in SUPPORT_NAVIGATION_ALLOWLIST && !seenIds.has(id) && validActions.length < 3) {
        seenIds.add(id);
        validActions.push(buildNavigationAction(id, targetClass, targetBoard));
      }
    }

    const cleanReply = String(parsed.reply || '').trim();
    if (!cleanReply) {
      const fb = buildFallbackMessage(replyLang, message, Boolean(parsed.suggestSupportTicket));
      return {
        success: true,
        source: 'kb_fallback',
        aiStatus: 'upstream_error',
        reply: fb.reply,
        language: replyLang,
        navigationActions: validActions.length ? validActions : fb.navigationActions,
        suggestSupportTicket: Boolean(parsed.suggestSupportTicket),
      };
    }

    return {
      success: true,
      source: 'gemini_ai',
      aiStatus: 'ok',
      reply: cleanReply,
      language: replyLang,
      navigationActions: validActions,
      suggestSupportTicket: Boolean(parsed.suggestSupportTicket),
    };
  } catch (err: any) {
    const errMsg = String(err?.message || err || '');
    const isQuota =
      err?.status === 429 ||
      errMsg.includes('429') ||
      errMsg.toUpperCase().includes('RESOURCE_EXHAUSTED') ||
      errMsg.toLowerCase().includes('quota');
    console.warn('[Support Assistant AI Fallback]:', errMsg);

    const fb = buildFallbackMessage(lang, message, true);
    return {
      success: true,
      source: 'kb_fallback',
      aiStatus: isQuota ? 'quota_exceeded' : 'upstream_error',
      reply: fb.reply,
      language: lang,
      navigationActions: fb.navigationActions,
      suggestSupportTicket: true,
      notice: isQuota
        ? 'AI usage quota is temporarily full. Showing Knowledge Base guidance, direct links, and Support Request option.'
        : 'AI assistant is temporarily unavailable. Showing Knowledge Base guidance and Support Request option.',
    };
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

  const requesterRole = body?.requesterRole === 'teacher' ? 'teacher' : 'student';
  const name = String(body?.name || '').trim().slice(0, 100);
  const email = String(body?.email || '').trim().toLowerCase().slice(0, 150);
  const mobile = String(body?.mobile || '').replace(/[^\d+\-\s]/g, '').trim().slice(0, 20);
  const rawCategory = String(body?.category || 'General Queries').trim();
  const category = VALID_SUPPORT_CATEGORIES.has(rawCategory) ? rawCategory : 'General Queries';
  const description = String(body?.description || '').trim().slice(0, 1800);
  const subjectInput = String(body?.subject || '').trim().slice(0, 180);

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
  if (headers.authorization) {
    const authRes = await verifyBearerIdToken(headers.authorization).catch(() => null);
    if (authRes?.valid && authRes.uid) {
      verifiedUid = authRes.uid;
    }
  }

  if (!isFirebaseAdminConfigured()) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        persisted: false,
        requiresClientAuthFallback: true,
        error:
          'Server-side Firebase Admin credentials (FIREBASE_SERVICE_ACCOUNT_JSON) are not configured yet for guest ticket writes.',
      },
    };
  }

  const nowIso = new Date().toISOString();
  const rand = Math.floor(10000 + Math.random() * 90000);
  const ticketNumber = `TKT-VC-${rand}`;
  const ticketId = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const subject =
    subjectInput ||
    `[${requesterRole === 'teacher' ? 'Teacher' : 'Student'}] ${category}`;

  const ticketDoc = {
    id: ticketId,
    ticketNumber,
    studentId: verifiedUid || String(body?.studentId || 'guest_helpdesk').slice(0, 128),
    studentName: name,
    requesterRole,
    email,
    mobile,
    category,
    subject,
    description,
    status: 'OPEN',
    priority: category.includes('Payment') ? 'HIGH' : 'MEDIUM',
    source: 'ai_help_desk',
    createdAt: nowIso,
    updatedAt: nowIso,
  };

  try {
    const writeRes = await serverSetDoc('support_tickets', ticketId, ticketDoc, { merge: false });
    if (!writeRes.usedAdminSdk) {
      return {
        statusCode: 503,
        payload: {
          success: false,
          persisted: false,
          requiresClientAuthFallback: true,
          error: 'Firebase Admin SDK is required to persist unauthenticated support requests.',
        },
      };
    }

    return {
      statusCode: 201,
      payload: {
        success: true,
        persisted: true,
        storage: 'firestore_admin',
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
