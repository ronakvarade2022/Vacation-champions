import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  SupportLanguage,
  SupportNavigationAction,
  detectQueryLanguage,
  matchKnowledgeBaseFastPath,
} from '../data/helpSupportKnowledgeBase';
import type { SupportCategory, SupportTicket } from '../types/support';
import type { ClassLevel, EducationBoard } from '../types';

export const HELP_SUPPORT_OPEN_EVENT = 'msz_open_help_support';

export function openHelpSupportDrawer(): void {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(HELP_SUPPORT_OPEN_EVENT));
  }
}

export interface ChatTurnPayload {
  role: 'user' | 'assistant';
  text: string;
}

export interface HelpChatResult {
  success: boolean;
  source: 'knowledge_base' | 'gemini_ai' | 'kb_fallback';
  aiStatus:
    | 'ok'
    | 'kb_fastpath'
    | 'missing_key'
    | 'quota_exceeded'
    | 'rate_limited'
    | 'upstream_error'
    | 'offline_fallback';
  reply: string;
  language: SupportLanguage;
  navigationActions: SupportNavigationAction[];
  suggestSupportTicket: boolean;
  notice?: string;
}

export async function sendHelpChatMessage(params: {
  message: string;
  roleContext: 'student' | 'teacher' | 'guest';
  history: ChatTurnPayload[];
  activeBoard?: EducationBoard;
  activeClass?: ClassLevel;
}): Promise<HelpChatResult> {
  const cleanMessage = String(params.message || '').trim().slice(0, 600);
  if (!cleanMessage) {
    return {
      success: false,
      source: 'knowledge_base',
      aiStatus: 'kb_fastpath',
      reply: 'Please type your question so I can assist you.',
      language: 'en',
      navigationActions: [],
      suggestSupportTicket: false,
    };
  }

  const mappedRole: 'student' | 'teacher' | 'visitor' =
    params.roleContext === 'guest' ? 'visitor' : params.roleContext;

  try {
    const response = await fetch('/api/support/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: cleanMessage,
        userRole: mappedRole,
        history: params.history.slice(-6),
        activeBoard: params.activeBoard,
        activeClass: params.activeClass,
      }),
    });

    const data = await response.json().catch(() => null);
    if (data && typeof data.reply === 'string') {
      return {
        success: Boolean(data.success),
        source: data.source || 'knowledge_base',
        aiStatus: data.aiStatus || 'ok',
        reply: data.reply,
        language: data.language || detectQueryLanguage(cleanMessage),
        navigationActions: Array.isArray(data.navigationActions) ? data.navigationActions : [],
        suggestSupportTicket: Boolean(data.suggestSupportTicket),
        notice: typeof data.notice === 'string' ? data.notice : undefined,
      };
    }
  } catch {
    // Fall through to deterministic client-side Knowledge Base fallback if API is unreachable
  }

  const fastMatch = matchKnowledgeBaseFastPath(cleanMessage, {
    userRole: mappedRole,
  });
  const lang = detectQueryLanguage(cleanMessage);

  if (fastMatch.matched) {
    return {
      success: true,
      source: 'kb_fallback',
      aiStatus: 'offline_fallback',
      reply: fastMatch.reply,
      language: fastMatch.language,
      navigationActions: fastMatch.navigationActions,
      suggestSupportTicket: fastMatch.suggestSupportTicket,
      notice:
        'Live AI assistant is temporarily unreachable. Showing verified MyStudyZone Knowledge Base guidance.',
    };
  }

  const offlineReply =
    lang === 'hi'
      ? 'लाइव AI सहायता सर्वर अभी उपलब्ध नहीं है। आप नीचे दिए गए नेविगेशन लिंक का उपयोग कर सकते हैं या व्यक्तिगत सहायता के लिए Support Request सबमिट कर सकते हैं।'
      : lang === 'mr'
      ? 'लाइव्ह AI मदत सर्व्हर सध्या उपलब्ध नाही. तुम्ही खालील थेट नेव्हिगेशन बटणे वापरू शकता किंवा वैयक्तिक मदतीसाठी Support Request सबमिट करू शकता.'
      : 'The live AI assistant connection is temporarily unavailable. You can still use direct website navigation links or submit a Support Request for personal account, login, or payment assistance.';

  return {
    success: true,
    source: 'kb_fallback',
    aiStatus: 'offline_fallback',
    reply: offlineReply,
    language: lang,
    navigationActions: [],
    suggestSupportTicket: true,
    notice: 'Live AI server unreachable — Support Request & Knowledge Base links remain active.',
  };
}

export interface SubmitHelpRequestPayload {
  requesterRole: 'student' | 'teacher';
  name: string;
  email: string;
  mobile?: string;
  category: SupportCategory;
  subject?: string;
  description: string;
  studentId?: string;
}

export interface SubmitHelpRequestResult {
  success: boolean;
  ticket?: SupportTicket & { requesterRole?: 'student' | 'teacher' };
  storage?: 'firestore_admin' | 'firestore_client';
  error?: string;
}

export async function submitHelpSupportRequest(
  payload: SubmitHelpRequestPayload
): Promise<SubmitHelpRequestResult> {
  const cleanName = String(payload.name || '').trim().slice(0, 100);
  const cleanEmail = String(payload.email || '').trim().toLowerCase().slice(0, 150);
  const cleanMobile = String(payload.mobile || '').replace(/[^\d+\-\s]/g, '').trim().slice(0, 20);
  const cleanDescription = String(payload.description || '').trim().slice(0, 1800);
  const cleanSubject =
    String(payload.subject || '').trim().slice(0, 180) ||
    `[${payload.requesterRole === 'teacher' ? 'Teacher' : 'Student'}] ${payload.category}`;

  if (cleanName.length < 2) {
    return { success: false, error: 'Please enter your full name.' };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
    return { success: false, error: 'Please enter a valid registered email address.' };
  }
  if (cleanDescription.length < 10) {
    return { success: false, error: 'Please describe your issue in at least 10 characters.' };
  }

  let bearerToken = '';
  try {
    if (auth?.currentUser) {
      bearerToken = await auth.currentUser.getIdToken();
    }
  } catch {
    bearerToken = '';
  }

  let serverSaidNeedsClientFallback = false;
  let serverErrorMessage = '';

  try {
    const res = await fetch('/api/support/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      },
      body: JSON.stringify({
        requesterRole: payload.requesterRole,
        name: cleanName,
        email: cleanEmail,
        mobile: cleanMobile,
        category: payload.category,
        subject: cleanSubject,
        description: cleanDescription,
        studentId: payload.studentId || auth?.currentUser?.uid || 'guest_helpdesk',
      }),
    });

    const data = await res.json().catch(() => null);
    if (res.ok && data?.success && data?.persisted && data?.ticket) {
      return {
        success: true,
        ticket: data.ticket,
        storage: 'firestore_admin',
      };
    }

    if (data?.requiresClientAuthFallback) {
      serverSaidNeedsClientFallback = true;
    }
    if (typeof data?.error === 'string' && data.error.trim()) {
      serverErrorMessage = data.error.trim();
    }

    // If server rejected due to validation or rate-limit (400 / 429), return directly without fallback
    if (res.status === 400 || res.status === 429) {
      return {
        success: false,
        error: serverErrorMessage || 'Could not submit your support request.',
      };
    }
  } catch {
    serverSaidNeedsClientFallback = true;
  }

  // Authenticated client Firestore fallback (strictly honours firestore.rules isValidSupportSubmission)
  if (serverSaidNeedsClientFallback && auth?.currentUser && db) {
    try {
      const rand = Math.floor(10000 + Math.random() * 90000);
      const ticketNumber = `TKT-VC-${rand}`;
      const id = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const nowIso = new Date().toISOString();

      const ticketRecord: SupportTicket & { requesterRole: 'student' | 'teacher'; source: string } = {
        id,
        ticketNumber,
        studentId: auth.currentUser.uid,
        studentName: cleanName,
        requesterRole: payload.requesterRole,
        email: cleanEmail,
        mobile: cleanMobile,
        category: payload.category,
        subject: cleanSubject.slice(0, 200),
        description: cleanDescription.slice(0, 2000),
        status: 'OPEN',
        priority: payload.category.includes('Payment') ? 'HIGH' : 'MEDIUM',
        source: 'ai_help_desk',
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      await setDoc(doc(db, 'support_tickets', id), ticketRecord);
      return {
        success: true,
        ticket: ticketRecord,
        storage: 'firestore_client',
      };
    } catch (firestoreErr: any) {
      return {
        success: false,
        error:
          firestoreErr?.message ||
          'Unable to save your support request to the database right now. Please try again or email support@mystudyzone.in.',
      };
    }
  }

  return {
    success: false,
    error:
      serverErrorMessage ||
      'Unable to save unauthenticated guest tickets because server-side Firestore Admin credentials are not configured. Please sign in and retry, or contact support@mystudyzone.in.',
  };
}
