import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  Bot,
  Building2,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  HeartHandshake,
  HelpCircle,
  LifeBuoy,
  Loader2,
  MessageSquare,
  RotateCcw,
  School,
  Search,
  Send,
  ShieldCheck,
  Sparkles,
  UserCheck,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  SupportNavigationAction,
  SupportPortalContext,
  getPortalWelcomeActions,
  getPortalWelcomeMessage,
} from '../data/helpSupportKnowledgeBase';
import {
  ChatTurnPayload,
  HELP_SUPPORT_OPEN_EVENT,
  SupportAiStatusInfo,
  fetchHelpAiStatus,
  sendHelpChatMessage,
  submitHelpSupportRequest,
} from '../services/helpAssistantService';
import { getSupportTicketByNumber } from '../services/supportService';
import {
  SUPPORT_USER_CATEGORY_LABELS,
  SupportCategory,
  SupportTicket,
  SupportUserCategory,
  formatSupportTicketStatusLabel,
  normalizeSupportUserCategory,
} from '../types/support';

export interface HelpMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  source?: 'welcome' | 'knowledge_base' | 'gemini_ai' | 'kb_fallback';
  navigationActions?: SupportNavigationAction[];
  suggestSupportTicket?: boolean;
  notice?: string;
}

interface HelpSupportAssistantProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateAction: (action: SupportNavigationAction) => void;
  activeTab: string;
  activePortalContext?: SupportPortalContext;
}

const SUPPORT_CATEGORIES: SupportCategory[] = [
  'Registration & Login',
  'Password Reset',
  'Payment & Subscription',
  'Educational Material Access',
  'Notes & Study Material Downloads',
  'Technical Errors',
  'Incorrect Questions or Answers',
  'Website Navigation',
  'General Queries',
];

const PORTAL_TABS: Array<{
  id: SupportUserCategory;
  label: string;
  shortLabel: string;
  badgeClass: string;
}> = [
  {
    id: 'student',
    label: 'Student Support',
    shortLabel: 'Students',
    badgeClass: 'bg-sky-600 text-white border-sky-500',
  },
  {
    id: 'teacher',
    label: 'Teacher Support',
    shortLabel: 'Teachers',
    badgeClass: 'bg-emerald-600 text-white border-emerald-500',
  },
  {
    id: 'parent',
    label: 'Parent Support',
    shortLabel: 'Parents',
    badgeClass: 'bg-fuchsia-600 text-white border-fuchsia-500',
  },
  {
    id: 'college',
    label: 'College Support',
    shortLabel: 'Colleges',
    badgeClass: 'bg-amber-600 text-white border-amber-500',
  },
  {
    id: 'institute',
    label: 'Institute Support',
    shortLabel: 'Institutes',
    badgeClass: 'bg-teal-600 text-white border-teal-500',
  },
];

const QUICK_TOPICS_BY_PORTAL: Record<
  SupportUserCategory,
  Array<{ label: string; prompt: string }>
> = {
  student: [
    {
      label: 'How to Register as Student',
      prompt: 'How do I register and login as a student on MyStudyZone step by step?',
    },
    {
      label: 'Where to Find Study Notes',
      prompt: 'Where do I find subjects, chapters, and study notes step by step?',
    },
    {
      label: 'How to Access Worksheets',
      prompt: 'How do I access interactive worksheets for my board and class?',
    },
    {
      label: 'Online Exams & Quizzes',
      prompt: 'Explain the online examination, 4-level quizzes, and Scholarship features.',
    },
    {
      label: 'How to Use AI Generator',
      prompt: 'How do I use the AI Generator, Trilingual Dictionary, and Thought of the Day?',
    },
    {
      label: '₹99 Plan & Subscription',
      prompt: 'Explain the Free ₹0 plan vs ₹99 / 365 Days Class subscription and payment.',
    },
  ],
  teacher: [
    {
      label: 'How to Access Teacher Portal',
      prompt: 'How do I register and login to the Teacher Portal on MyStudyZone?',
    },
    {
      label: 'Lesson Planner Guide',
      prompt: 'How do I use the Teacher Lesson Planner for Annual, Monthly, and Daily plans?',
    },
    {
      label: 'Create Assignments & Worksheets',
      prompt: 'How can teachers create assignments, worksheets, and question papers with the AI Generator?',
    },
    {
      label: 'Student Management',
      prompt: 'How does student management and performance tracking work in the Teacher Portal?',
    },
    {
      label: 'MAHA TET & CTET Prep',
      prompt: 'Tell me about MAHA TET and CTET Paper 1 and Paper 2 mock tests for teachers.',
    },
  ],
  parent: [
    {
      label: 'Parent Registration & Login',
      prompt: 'How do I register and sign in to the Parent Portal step by step?',
    },
    {
      label: 'Connect Student Account',
      prompt: 'How do parents connect or link with their child’s student account?',
    },
    {
      label: 'Track Student Progress',
      prompt: 'How can parents understand student progress, exam reports, and attendance?',
    },
  ],
  college: [
    {
      label: 'College Registration & Login',
      prompt: 'How does a college or school register and login to the College Portal?',
    },
    {
      label: 'College Portal Features',
      prompt: 'What features are available in the College Portal (divisions, faculty, calendar, results)?',
    },
    {
      label: 'College Dashboard Navigation',
      prompt: 'Explain how to navigate the College Portal dashboard step by step.',
    },
  ],
  institute: [
    {
      label: 'Institute Registration & Login',
      prompt: 'How does a coaching or skill institute register and login to the Institute Portal?',
    },
    {
      label: 'Batches & Mock Test Series',
      prompt: 'How do coaching batches, mock test series, and 18 skill programs work in the Institute Portal?',
    },
    {
      label: 'Fee Ledger & Certificates',
      prompt: 'How do trainer roster, fee ledger, and course completion certificates work in the Institute Portal?',
    },
  ],
};

function makeInitialWelcomeMessage(portal?: SupportPortalContext): HelpMessageItem {
  return {
    id: 'welcome-msz-helpdesk',
    sender: 'assistant',
    text: getPortalWelcomeMessage(portal),
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    source: 'welcome',
    navigationActions: getPortalWelcomeActions(portal),
    suggestSupportTicket: false,
  };
}

export const HelpSupportAssistant: React.FC<HelpSupportAssistantProps> = ({
  isOpen,
  onOpenChange,
  onNavigateAction,
  activeTab,
  activePortalContext,
}) => {
  const { currentStudent, currentUser, activeRole } = useApp();

  // Determine active portal category from context, tab, or signed-in role
  const detectedUserCategory = useMemo<SupportUserCategory>(() => {
    if (
      activePortalContext &&
      activePortalContext !== 'visitor' &&
      activePortalContext !== 'homepage'
    ) {
      return activePortalContext;
    }
    if (activeTab === 'parent-zone') return 'parent';
    if (activeTab === 'school-college-zone') return 'college';
    if (activeTab === 'coaching-zone') return 'institute';
    if (activeRole === 'teacher' || currentStudent?.accountRole === 'teacher') {
      return 'teacher';
    }
    if (activeRole === 'parent') return 'parent';
    if (activeRole === 'school_admin') return 'college';
    if (activeRole === 'institute_admin') return 'institute';
    return 'student';
  }, [activePortalContext, activeTab, activeRole, currentStudent?.accountRole]);

  const [selectedPortalGuide, setSelectedPortalGuide] = useState<SupportUserCategory>(
    detectedUserCategory
  );

  const effectiveWelcomeContext: SupportPortalContext =
    activeTab === 'public-home' && selectedPortalGuide === detectedUserCategory
      ? 'homepage'
      : selectedPortalGuide;

  const [aiStatus, setAiStatus] = useState<SupportAiStatusInfo>({
    aiConnected: false,
    configured: false,
    mode: 'knowledge_base',
    reason: 'missing_key',
    model: 'gemini-4-hydrogen',
    message: 'Checking AI Help Desk status...',
  });

  useEffect(() => {
    setSelectedPortalGuide(detectedUserCategory);
  }, [detectedUserCategory]);

  const [activeView, setActiveView] = useState<'chat' | 'support_request' | 'track_ticket'>('chat');
  const [messages, setMessages] = useState<HelpMessageItem[]>(() => [
    makeInitialWelcomeMessage(effectiveWelcomeContext),
  ]);
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);

  // Sync initial welcome message dynamically when portal changes before user starts chatting
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].source === 'welcome') {
        return [makeInitialWelcomeMessage(effectiveWelcomeContext)];
      }
      return prev;
    });
  }, [effectiveWelcomeContext]);

  // Fetch honest server AI connection status on mount and whenever drawer opens
  useEffect(() => {
    let cancelled = false;
    fetchHelpAiStatus().then((status) => {
      if (!cancelled) setAiStatus(status);
    });
    return () => {
      cancelled = true;
    };
  }, [isOpen]);

  // Support Request Form State
  const [reqRole, setReqRole] = useState<SupportUserCategory>(detectedUserCategory);
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqMobile, setReqMobile] = useState('');
  const [reqCategory, setReqCategory] = useState<SupportCategory>('General Queries');
  const [reqDescription, setReqDescription] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);

  // Ticket Tracking State
  const [lookupNumber, setLookupNumber] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookedUpTicket, setLookedUpTicket] = useState<SupportTicket | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Sync default role when active portal changes (does NOT reset while user edits Name/Email)
  useEffect(() => {
    setReqRole(detectedUserCategory);
  }, [detectedUserCategory]);

  // Prefill contact fields when user signs in
  useEffect(() => {
    const resolvedName = currentStudent?.name || currentUser?.displayName || '';
    const resolvedEmail =
      currentStudent?.email || currentStudent?.parentEmail || currentUser?.email || '';
    const resolvedMobile = currentStudent?.mobile || '';
    if (resolvedName) setReqName((prev) => prev || resolvedName);
    if (resolvedEmail) setReqEmail((prev) => prev || resolvedEmail);
    if (resolvedMobile) setReqMobile((prev) => prev || resolvedMobile);
  }, [currentStudent, currentUser]);

  // Listen for global open event (e.g. from footer or Help buttons)
  useEffect(() => {
    const handler = () => onOpenChange(true);
    window.addEventListener(HELP_SUPPORT_OPEN_EVENT, handler);
    return () => window.removeEventListener(HELP_SUPPORT_OPEN_EVENT, handler);
  }, [onOpenChange]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (isOpen && activeView === 'chat') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeView, isSending]);

  const historyForApi = useMemo<ChatTurnPayload[]>(() => {
    return messages
      .filter((m) => m.id !== 'welcome-msz-helpdesk')
      .slice(-6)
      .map((m) => ({
        role: m.sender,
        text: m.text,
      }));
  }, [messages]);

  const handleSendQuestion = useCallback(
    async (questionText?: string) => {
      const textToSend = String(questionText ?? inputText).trim();
      if (!textToSend || isSending) return;

      if (questionText === undefined) {
        setInputText('');
      }

      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const userMsg: HelpMessageItem = {
        id: `usr_${Date.now()}`,
        sender: 'user',
        text: textToSend,
        timestamp: nowStr,
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsSending(true);

      try {
        const res = await sendHelpChatMessage({
          message: textToSend,
          roleContext: selectedPortalGuide,
          history: historyForApi,
          activeBoard: currentStudent?.board,
          activeClass: currentStudent?.classLevel,
        });

        if (
          res.aiStatus === 'missing_key' ||
          res.aiStatus === 'quota_exceeded' ||
          res.aiStatus === 'upstream_error' ||
          res.aiStatus === 'offline_fallback'
        ) {
          setAiStatus((prev) => ({
            ...prev,
            aiConnected: false,
            mode: 'knowledge_base',
            reason:
              res.aiStatus === 'missing_key'
                ? 'missing_key'
                : res.aiStatus === 'quota_exceeded'
                ? 'quota_exceeded'
                : res.aiStatus === 'upstream_error'
                ? 'upstream_error'
                : 'offline',
          }));
        } else if (res.source === 'gemini_ai' && res.aiStatus === 'ok') {
          setAiStatus((prev) => ({
            ...prev,
            aiConnected: true,
            configured: true,
            mode: 'live_ai',
            reason: 'ok',
          }));
        }

        const botMsg: HelpMessageItem = {
          id: `bot_${Date.now()}`,
          sender: 'assistant',
          text: res.reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: res.source,
          navigationActions: res.navigationActions,
          suggestSupportTicket: res.suggestSupportTicket,
          notice: res.notice,
        };

        setMessages((prev) => [...prev, botMsg]);
      } finally {
        setIsSending(false);
      }
    },
    [inputText, isSending, selectedPortalGuide, historyForApi, currentStudent]
  );

  const handleResetConversation = () => {
    setMessages([makeInitialWelcomeMessage(effectiveWelcomeContext)]);
    setInputText('');
  };

  const handleOpenSupportRequestForm = (prefillFromChat: boolean = true) => {
    setSubmittedTicket(null);
    setTicketError(null);
    setReqRole(selectedPortalGuide);
    if (prefillFromChat && !reqDescription.trim()) {
      const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user');
      if (lastUserMessage) {
        setReqDescription(lastUserMessage.text);
      }
    }
    setActiveView('support_request');
  };

  const handleSubmitSupportTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingTicket) return;

    setTicketError(null);
    setIsSubmittingTicket(true);

    try {
      const result = await submitHelpSupportRequest({
        requesterRole: reqRole,
        portalContext: activeTab === 'public-home' ? 'homepage' : selectedPortalGuide,
        name: reqName,
        email: reqEmail,
        mobile: reqMobile,
        category: reqCategory,
        description: reqDescription,
        studentId: currentStudent?.id || currentUser?.uid,
      });

      if (!result.success || !result.ticket) {
        setTicketError(
          result.error || 'Could not save your support request. Please check your details and try again.'
        );
        return;
      }

      setSubmittedTicket(result.ticket);
      setReqDescription('');
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const handleTrackTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = lookupNumber.trim();
    if (!code) return;
    setIsLookingUp(true);
    setLookupError(null);
    setLookedUpTicket(null);
    try {
      const ticket = await getSupportTicketByNumber(code);
      if (!ticket) {
        setLookupError(`No support request found with ticket number "${code.toUpperCase()}".`);
      } else {
        setLookedUpTicket(ticket);
      }
    } catch {
      setLookupError('Unable to check ticket status right now. Please try again.');
    } finally {
      setIsLookingUp(false);
    }
  };

  const handleNavigationClick = (action: SupportNavigationAction) => {
    onNavigateAction(action);
    onOpenChange(false);
  };

  const activePortalLabel =
    activeTab === 'public-home'
      ? 'Homepage'
      : `${SUPPORT_USER_CATEGORY_LABELS[detectedUserCategory]} Portal`;

  return (
    <>
      {/* Floating Help & Support Launcher Pill (Visible on Homepage & All 5 Portals) */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2">
        {!isOpen && (
          <button
            type="button"
            onClick={() => onOpenChange(true)}
            className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-indigo-900 via-blue-800 to-indigo-900 hover:from-indigo-800 hover:to-blue-700 text-white shadow-xl border-2 border-amber-400/90 transition-all cursor-pointer hover:scale-[1.02]"
            aria-label="Open MyStudyZone AI Help & Support Assistant"
          >
            <span className="w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-xs">
              <Bot className="w-4 h-4" />
            </span>
            <div className="text-left leading-tight">
              <div className="text-xs font-extrabold tracking-wide flex items-center gap-1.5">
                <span>AI Help &amp; Support</span>
                <span
                  title={aiStatus.message}
                  className={`inline-block w-2 h-2 rounded-full ${
                    aiStatus.aiConnected
                      ? 'bg-emerald-400 animate-pulse'
                      : 'bg-amber-400'
                  }`}
                />
              </div>
              <div className="text-[10px] text-amber-200 font-semibold hidden sm:block">
                {activePortalLabel} • {aiStatus.aiConnected ? 'Live AI' : 'KB Mode'}
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Slide-Over Help & Support Assistant Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs">
          <div
            className="w-full max-w-lg bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-right duration-200"
            role="dialog"
            aria-modal="true"
            aria-label="MyStudyZone AI Help & Support Assistant"
          >
            {/* Top Header */}
            <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white px-4 py-3.5 border-b border-indigo-800 shrink-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-sm shrink-0">
                    <LifeBuoy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 className="font-display font-extrabold text-sm sm:text-base text-white">
                        MyStudyZone AI Help &amp; Support
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        {activePortalLabel}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap mt-0.5">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold ${
                          aiStatus.aiConnected ? 'text-emerald-300' : 'text-amber-300'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            aiStatus.aiConnected ? 'bg-emerald-400' : 'bg-amber-400'
                          }`}
                        />
                        {aiStatus.aiConnected
                          ? `Gemini Connected (${aiStatus.model})`
                          : aiStatus.reason === 'quota_exceeded'
                          ? 'Free AI Quota Exhausted • Knowledge Base Mode'
                          : aiStatus.reason === 'api_key_invalid'
                          ? 'Gemini Key Invalid • Knowledge Base Mode'
                          : aiStatus.reason === 'upstream_error'
                          ? 'Gemini Temporarily Busy • Knowledge Base Mode'
                          : 'Knowledge Base Mode (Gemini API Key Not Set)'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {activeView === 'chat' && messages.length > 1 && (
                    <button
                      type="button"
                      onClick={handleResetConversation}
                      title="Clear Chat"
                      className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close Help Desk"
                    className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* View Switcher Tabs */}
              <div className="mt-3 grid grid-cols-3 gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveView('chat')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeView === 'chat'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>AI Assistant</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleOpenSupportRequestForm(true)}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeView === 'support_request'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Contact Support</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveView('track_ticket')}
                  className={`py-1.5 px-2 rounded-lg text-[11px] font-extrabold flex items-center justify-center gap-1 transition-all cursor-pointer ${
                    activeView === 'track_ticket'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Track Ticket</span>
                </button>
              </div>
            </div>

            {/* BODY 1: AI ASSISTANT CHAT VIEW */}
            {activeView === 'chat' && (
              <>
                {/* 5-Portal Selector Bar + Quick Topic Chips */}
                <div className="bg-slate-50 border-b border-slate-200 px-3.5 py-2.5 shrink-0 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                      Select Portal Help Guide:
                    </span>
                    <span className="text-[10px] font-bold text-indigo-700">
                      Showing {SUPPORT_USER_CATEGORY_LABELS[selectedPortalGuide]} topics
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {PORTAL_TABS.map((portal) => {
                      const isSelected = selectedPortalGuide === portal.id;
                      return (
                        <button
                          key={portal.id}
                          type="button"
                          onClick={() => setSelectedPortalGuide(portal.id)}
                          className={`py-1.5 px-1.5 rounded-lg text-[10px] font-extrabold border text-center transition-all cursor-pointer truncate ${
                            isSelected
                              ? portal.badgeClass
                              : 'bg-white text-slate-700 border-slate-200 hover:border-indigo-300'
                          }`}
                        >
                          {portal.shortLabel}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick Step-by-Step Topic Prompts for Selected Portal */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
                    {QUICK_TOPICS_BY_PORTAL[selectedPortalGuide].map((chip) => (
                      <button
                        key={chip.label}
                        type="button"
                        disabled={isSending}
                        onClick={() => handleSendQuestion(chip.prompt)}
                        className="shrink-0 px-2.5 py-1 rounded-lg bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-900 border border-slate-200 hover:border-indigo-300 text-[11px] font-bold transition-colors cursor-pointer"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Chat Messages Scroll Container */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.sender === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[92%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-xs ${
                          msg.sender === 'user'
                            ? 'bg-indigo-700 text-white rounded-br-xs'
                            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs'
                        }`}
                      >
                        {msg.sender === 'assistant' && (
                          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-100">
                            <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-indigo-900">
                              <Sparkles className="w-3 h-3 text-amber-500" />
                              <span>MyStudyZone Help Assistant</span>
                            </span>
                            {msg.source === 'gemini_ai' && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">
                                Free-Tier AI
                              </span>
                            )}
                            {msg.source === 'knowledge_base' && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">
                                Verified Guide
                              </span>
                            )}
                          </div>
                        )}

                        <div className="whitespace-pre-line">{msg.text}</div>

                        {msg.notice && (
                          <div className="mt-2.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-900 font-medium">
                            {msg.notice}
                          </div>
                        )}

                        {/* Direct Navigation Action Buttons */}
                        {msg.navigationActions && msg.navigationActions.length > 0 && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap gap-1.5">
                            {msg.navigationActions.map((act) => (
                              <button
                                key={`${msg.id}_${act.id}_${act.targetClass || ''}_${act.targetBoard || ''}`}
                                type="button"
                                onClick={() => handleNavigationClick(act)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 text-[11px] font-extrabold transition-colors cursor-pointer"
                              >
                                <span>{act.label}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ))}
                          </div>
                        )}

                        {/* Escalation CTA when AI suggests a Support Request */}
                        {msg.suggestSupportTicket && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100">
                            <button
                              type="button"
                              onClick={() => handleOpenSupportRequestForm(true)}
                              className="w-full py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                            >
                              <LifeBuoy className="w-3.5 h-3.5" />
                              <span>SUBMIT A SUPPORT REQUEST</span>
                            </button>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                  ))}

                  {isSending && (
                    <div className="flex items-start">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-xs px-4 py-3 text-xs text-slate-600 flex items-center gap-2 shadow-xs">
                        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                        <span>Finding the best step-by-step guidance for you...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatEndRef} />
                </div>

                {/* Persistent Bottom Input & Escalation Bar */}
                <div className="p-3 bg-white border-t border-slate-200 space-y-2 shrink-0">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSendQuestion();
                    }}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={`Ask about ${SUPPORT_USER_CATEGORY_LABELS[selectedPortalGuide]} Portal, notes, worksheets, AI tools...`}
                      maxLength={500}
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-indigo-600 focus:outline-none text-xs text-slate-900"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isSending}
                      className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-extrabold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Ask</span>
                    </button>
                  </form>

                  <div className="flex items-center justify-between gap-2 pt-0.5 text-[11px]">
                    <span className="text-slate-500">
                      Issue not resolved? Escalate to Admin Support:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenSupportRequestForm(true)}
                      className="font-extrabold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Contact Support</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* BODY 2: ADMIN SUPPORT ESCALATION / CONTACT SUPPORT FORM */}
            {activeView === 'support_request' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50 space-y-4">
                {submittedTicket ? (
                  <div className="bg-white rounded-2xl border-2 border-emerald-400 p-5 shadow-md space-y-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                          Support Request Saved
                        </span>
                        <h3 className="font-display font-extrabold text-base text-slate-900">
                          Ticket Number: {submittedTicket.ticketNumber}
                        </h3>
                      </div>
                    </div>

                    <p className="text-slate-600 leading-relaxed">
                      Your support request has been securely recorded for the MyStudyZone Administrator. Please save your ticket number for reference.
                    </p>

                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Ticket Number:</span>
                        <span className="font-mono font-black text-indigo-900">
                          {submittedTicket.ticketNumber}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">User Category:</span>
                        <span className="font-bold text-slate-800">
                          {SUPPORT_USER_CATEGORY_LABELS[
                            normalizeSupportUserCategory(
                              submittedTicket.userCategory || submittedTicket.requesterRole
                            )
                          ]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Issue Category:</span>
                        <span className="font-bold text-slate-800">{submittedTicket.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Current Status:</span>
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-black text-[10px]">
                          {formatSupportTicketStatusLabel(submittedTicket.status)}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setLookupNumber(submittedTicket.ticketNumber);
                          setLookedUpTicket(submittedTicket);
                          setActiveView('track_ticket');
                        }}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs cursor-pointer"
                      >
                        Track Ticket Status
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmittedTicket(null);
                          setActiveView('chat');
                        }}
                        className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs cursor-pointer"
                      >
                        Back to AI Chat
                      </button>
                    </div>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmitSupportTicket}
                    className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4 text-xs"
                  >
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                        Admin Support Escalation
                      </span>
                      <h3 className="font-display font-extrabold text-base text-slate-900 mt-0.5">
                        Submit a Support Request
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        If the AI assistant could not resolve your issue, fill in the details below to generate an official support ticket for the administrator.
                      </p>
                    </div>

                    {ticketError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{ticketError}</span>
                      </div>
                    )}

                    {/* 1. User Category (All 5 Portals) */}
                    <div className="space-y-1.5">
                      <label className="block font-extrabold text-slate-800">
                        1. Select Your User Category *
                      </label>
                      <div className="grid grid-cols-5 gap-1.5">
                        {(
                          [
                            { id: 'student', label: 'Student', icon: GraduationCap },
                            { id: 'teacher', label: 'Teacher', icon: UserCheck },
                            { id: 'parent', label: 'Parent', icon: HeartHandshake },
                            { id: 'college', label: 'College', icon: School },
                            { id: 'institute', label: 'Institute', icon: Building2 },
                          ] as const
                        ).map((item) => {
                          const Icon = item.icon;
                          const active = reqRole === item.id;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => setReqRole(item.id)}
                              className={`p-2 rounded-xl border text-center flex flex-col items-center gap-1 transition-all cursor-pointer ${
                                active
                                  ? 'bg-indigo-700 text-white border-indigo-700 shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-[10px] font-extrabold">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Name */}
                    <div className="space-y-1">
                      <label className="block font-extrabold text-slate-800">
                        2. Full Name / Institution Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={reqName}
                        onChange={(e) => setReqName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    {/* 3. Registered Email & Optional Mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block font-extrabold text-slate-800">
                          3. Registered Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={reqEmail}
                          onChange={(e) => setReqEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-indigo-600 focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block font-extrabold text-slate-800">
                          Mobile Number (Optional)
                        </label>
                        <input
                          type="tel"
                          value={reqMobile}
                          onChange={(e) => setReqMobile(e.target.value)}
                          placeholder="10-digit mobile number"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-indigo-600 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* 4. Issue Category */}
                    <div className="space-y-1">
                      <label className="block font-extrabold text-slate-800">
                        4. Issue Category *
                      </label>
                      <select
                        value={reqCategory}
                        onChange={(e) => setReqCategory(e.target.value as SupportCategory)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 font-semibold focus:border-indigo-600 focus:outline-none"
                      >
                        {SUPPORT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* 5. Problem Description */}
                    <div className="space-y-1">
                      <label className="block font-extrabold text-slate-800">
                        5. Problem Description *
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={reqDescription}
                        onChange={(e) => setReqDescription(e.target.value)}
                        placeholder="Describe your question or issue clearly (never include your password or OTP)..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 focus:border-indigo-600 focus:outline-none"
                      />
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Security Notice: Never share your password, OTP, or UPI/card PIN in support tickets.
                      </span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="submit"
                        disabled={isSubmittingTicket}
                        className="flex-1 py-3 px-4 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                      >
                        {isSubmittingTicket ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Saving Support Ticket...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>Generate Support Ticket</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveView('chat')}
                        className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* BODY 3: TRACK TICKET STATUS VIEW */}
            {activeView === 'track_ticket' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50 space-y-4 text-xs">
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                      Support Ticket Status
                    </span>
                    <h3 className="font-display font-extrabold text-base text-slate-900 mt-0.5">
                      Check Your Support Request
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Enter your Ticket Number (e.g., TKT-MSZ-12345) to inspect live status (New, In Progress, Resolved, Closed) and Admin Responses.
                    </p>
                  </div>

                  <form onSubmit={handleTrackTicket} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={lookupNumber}
                      onChange={(e) => setLookupNumber(e.target.value)}
                      placeholder="Enter Ticket Number (e.g. TKT-MSZ-12345)"
                      className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-mono uppercase focus:border-indigo-600 focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={isLookingUp || !lookupNumber.trim()}
                      className="px-4 py-2.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 text-white font-extrabold cursor-pointer"
                    >
                      {isLookingUp ? 'Checking...' : 'Check'}
                    </button>
                  </form>

                  {lookupError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold">
                      {lookupError}
                    </div>
                  )}

                  {lookedUpTicket && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <span className="font-mono font-black text-sm text-indigo-900">
                          {lookedUpTicket.ticketNumber}
                        </span>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            lookedUpTicket.status === 'RESOLVED' ||
                            lookedUpTicket.status === 'CLOSED'
                              ? 'bg-emerald-100 text-emerald-800'
                              : lookedUpTicket.status === 'IN_PROGRESS'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          ● {formatSupportTicketStatusLabel(lookedUpTicket.status)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div>
                          <span className="text-slate-500 block">User Category:</span>
                          <span className="font-bold text-slate-800">
                            {
                              SUPPORT_USER_CATEGORY_LABELS[
                                normalizeSupportUserCategory(
                                  lookedUpTicket.userCategory || lookedUpTicket.requesterRole
                                )
                              ]
                            }
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Issue Category:</span>
                          <span className="font-bold text-slate-800">
                            {lookedUpTicket.category}
                          </span>
                        </div>
                        <div className="col-span-2">
                          <span className="text-slate-500 block">Submitted On:</span>
                          <span className="font-bold text-slate-800">
                            {new Date(lookedUpTicket.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="pt-1">
                        <span className="text-slate-500 block text-[11px]">Description:</span>
                        <p className="mt-1 p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 whitespace-pre-wrap">
                          {lookedUpTicket.description}
                        </p>
                      </div>

                      <div className="pt-1">
                        <span className="text-slate-500 block text-[11px]">Admin Response:</span>
                        <div className="mt-1 p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-indigo-950 font-medium">
                          {lookedUpTicket.adminResponse
                            ? lookedUpTicket.adminResponse
                            : 'Your support request is in queue for administrator review.'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
