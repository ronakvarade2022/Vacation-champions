import React, { useState, useEffect, useRef } from 'react';
import {
  Headphones,
  X,
  Send,
  ArrowRight,
  ArrowLeft,
  LifeBuoy,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  ShieldCheck,
  Loader2,
  Sparkles,
  GraduationCap,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  HELP_DESK_WELCOME_MESSAGE,
  SupportNavigationAction,
} from '../data/helpSupportKnowledgeBase';
import {
  sendHelpChatMessage,
  submitHelpSupportRequest,
  HELP_SUPPORT_OPEN_EVENT,
} from '../services/helpAssistantService';
import type { SupportCategory, SupportTicket } from '../types/support';

interface ChatMessageItem {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  navigationActions?: SupportNavigationAction[];
  suggestSupportTicket?: boolean;
  notice?: string;
  timestamp: string;
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

interface HelpSupportAssistantProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateAction: (action: SupportNavigationAction) => void;
  activeTab: string;
  isFullscreenExam?: boolean;
}

function buildInitialMessages(): ChatMessageItem[] {
  return [
    {
      id: 'welcome-msg',
      role: 'assistant',
      text: HELP_DESK_WELCOME_MESSAGE,
      navigationActions: [],
      suggestSupportTicket: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ];
}

export const HelpSupportAssistant: React.FC<HelpSupportAssistantProps> = ({
  isOpen,
  onOpenChange,
  onNavigateAction,
  isFullscreenExam = false,
}) => {
  const { currentStudent, activeRole, activeBoard } = useApp();

  const effectiveRoleContext: 'student' | 'teacher' | 'guest' =
    currentStudent?.accountRole === 'teacher' || activeRole === 'teacher'
      ? 'teacher'
      : currentStudent
      ? 'student'
      : 'guest';

  const [viewMode, setViewMode] = useState<'chat' | 'ticket'>('chat');
  const [messages, setMessages] = useState<ChatMessageItem[]>(buildInitialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusNotice, setStatusNotice] = useState<string | null>(null);

  // Support Request Form State
  const [reqRole, setReqRole] = useState<'student' | 'teacher'>(
    effectiveRoleContext === 'teacher' ? 'teacher' : 'student'
  );
  const [reqName, setReqName] = useState(currentStudent?.name || '');
  const [reqEmail, setReqEmail] = useState(currentStudent?.email || '');
  const [reqMobile, setReqMobile] = useState(currentStudent?.mobile || '');
  const [reqCategory, setReqCategory] = useState<SupportCategory>('Registration & Login');
  const [reqDescription, setReqDescription] = useState('');
  const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
  const [ticketError, setTicketError] = useState<string | null>(null);
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [inDocFullscreen, setInDocFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const syncFs = () => {
      setInDocFullscreen(Boolean(document.fullscreenElement));
    };
    syncFs();
    document.addEventListener('fullscreenchange', syncFs);
    return () => document.removeEventListener('fullscreenchange', syncFs);
  }, []);

  // Listen for global open triggers so all "Help & Support" buttons open the single unified window
  useEffect(() => {
    const handler = () => {
      onOpenChange(true);
    };
    window.addEventListener(HELP_SUPPORT_OPEN_EVENT, handler);
    return () => window.removeEventListener(HELP_SUPPORT_OPEN_EVENT, handler);
  }, [onOpenChange]);

  // Sync user defaults when logged-in account changes
  useEffect(() => {
    setReqRole(effectiveRoleContext === 'teacher' ? 'teacher' : 'student');
    if (currentStudent?.name) setReqName(currentStudent.name);
    if (currentStudent?.email) setReqEmail(currentStudent.email);
    if (currentStudent?.mobile) setReqMobile(currentStudent.mobile);
  }, [
    currentStudent?.id,
    currentStudent?.name,
    currentStudent?.email,
    currentStudent?.mobile,
    effectiveRoleContext,
  ]);

  useEffect(() => {
    if (isOpen && viewMode === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, viewMode, messages, isSending]);

  useEffect(() => {
    if (isOpen && viewMode === 'chat') {
      const timer = window.setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => window.clearTimeout(timer);
    }
  }, [isOpen, viewMode]);

  const handleResetChat = () => {
    setMessages(buildInitialMessages());
    setStatusNotice(null);
    setViewMode('chat');
    setSubmittedTicket(null);
    setTicketError(null);
  };

  const handleOpenSupportForm = (prefillCategory?: SupportCategory) => {
    if (prefillCategory) {
      setReqCategory(prefillCategory);
    }
    setTicketError(null);
    setSubmittedTicket(null);
    // Pre-populate description with the user's latest question if description is blank
    if (!reqDescription.trim()) {
      const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
      if (lastUserMsg) {
        setReqDescription(lastUserMsg.text.slice(0, 500));
      }
    }
    setViewMode('ticket');
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isSending) return;

    const userMsg: ChatMessageItem = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nextHistory = messages
      .filter((m) => m.id !== 'welcome-msg')
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsSending(true);

    try {
      const result = await sendHelpChatMessage({
        message: trimmed,
        roleContext: effectiveRoleContext,
        history: nextHistory,
        activeBoard,
        activeClass: currentStudent?.classLevel,
      });

      if (result.notice) {
        setStatusNotice(result.notice);
      }

      const assistantMsg: ChatMessageItem = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        text: result.reply,
        navigationActions: result.navigationActions,
        suggestSupportTicket: result.suggestSupportTicket,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingTicket) return;
    setTicketError(null);
    setIsSubmittingTicket(true);

    try {
      const res = await submitHelpSupportRequest({
        requesterRole: reqRole,
        name: reqName,
        email: reqEmail,
        mobile: reqMobile,
        category: reqCategory,
        description: reqDescription,
        studentId: currentStudent?.id,
      });

      if (!res.success || !res.ticket) {
        setTicketError(
          res.error || 'Unable to save your support request right now. Please try again.'
        );
        return;
      }

      setSubmittedTicket(res.ticket);
      setReqDescription('');
      setMessages((prev) => [
        ...prev,
        {
          id: `ticket-confirm-${Date.now()}`,
          role: 'assistant',
          text: `Your support request has been recorded with Ticket Number ${res.ticket!.ticketNumber}.\nOur team will review it and reply to ${res.ticket!.email}.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsSubmittingTicket(false);
    }
  };

  const handleActionClick = (action: SupportNavigationAction) => {
    onOpenChange(false);
    onNavigateAction(action);
  };

  if ((isFullscreenExam || inDocFullscreen) && !isOpen) {
    return null;
  }

  return (
    <>
      {/* Non-overlapping Docked HELP & SUPPORT Bar (Never floats over main content) */}
      {!isOpen && (
        <div className="w-full no-print bg-[#fefce8] border-t border-amber-200/80 py-3 px-4 sm:px-6 lg:px-8">
          <div className="msz-container flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0f2952]">
              <LifeBuoy className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Need assistance with classes, notes, subscriptions, or login?</span>
            </div>
            <button
              type="button"
              onClick={() => onOpenChange(true)}
              aria-label="HELP & SUPPORT"
              data-testid="help-support-launcher"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0f2952] via-[#133870] to-[#1d4ed8] hover:from-[#133870] hover:to-[#1e40af] text-white font-display font-black text-xs sm:text-sm tracking-wide shadow-md border-2 border-amber-300/80 cursor-pointer transition-all"
            >
              <span className="w-6 h-6 rounded-xl bg-amber-400 text-[#0f2952] flex items-center justify-center shrink-0 shadow-xs">
                <Headphones className="w-3.5 h-3.5" />
              </span>
              <span>HELP &amp; SUPPORT</span>
            </button>
          </div>
        </div>
      )}

      {/* Single Modern Chat Drawer / Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-end sm:justify-end p-0 sm:p-5 bg-slate-950/40 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="MyStudyZone Help Desk"
        >
          <div className="w-full sm:w-[440px] max-w-full h-[92dvh] sm:h-[640px] sm:max-h-[86dvh] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0f2952] via-[#133870] to-[#1e3a8a] text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-2xl bg-amber-400 text-[#0f2952] flex items-center justify-center shrink-0 shadow-sm">
                  {effectiveRoleContext === 'teacher' ? (
                    <GraduationCap className="w-5 h-5" />
                  ) : (
                    <Headphones className="w-5 h-5" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="font-display font-black text-sm sm:text-base truncate">
                      MyStudyZone Help Desk
                    </h2>
                    <span className="px-2 py-0.5 rounded-lg bg-white/15 text-amber-200 text-[10px] font-extrabold uppercase tracking-wider shrink-0">
                      {effectiveRoleContext === 'teacher'
                        ? 'Teacher'
                        : effectiveRoleContext === 'student'
                        ? 'Student'
                        : 'Support'}
                    </span>
                  </div>
                  <p className="text-[11px] text-sky-100 font-medium truncate flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
                    <span>English &bull; हिंदी &bull; मराठी</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="New conversation"
                  aria-label="Start new conversation"
                  className="p-2 rounded-xl text-sky-100 hover:text-white hover:bg-white/15 cursor-pointer transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Close Help and Support"
                  className="p-2 rounded-xl text-sky-100 hover:text-white hover:bg-white/15 cursor-pointer transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Non-intrusive Status / Quota / Fallback Banner */}
            {statusNotice && viewMode === 'chat' && (
              <div className="bg-amber-50 border-b border-amber-200 px-3.5 py-2 text-[11px] text-amber-900 font-semibold flex items-start justify-between gap-2 shrink-0">
                <span>{statusNotice}</span>
                <button
                  type="button"
                  onClick={() => setStatusNotice(null)}
                  aria-label="Dismiss notice"
                  className="text-amber-700 hover:text-amber-950 shrink-0 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Main View: Chat OR Support Request Form */}
            {viewMode === 'chat' ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-slate-50/80">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${
                        msg.role === 'user' ? 'items-end' : 'items-start'
                      }`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-xs whitespace-pre-line ${
                          msg.role === 'user'
                            ? 'bg-[#0f2952] text-white rounded-br-sm font-medium'
                            : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-sm font-medium'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Direct Website Navigation Buttons */}
                      {msg.role === 'assistant' &&
                        msg.navigationActions &&
                        msg.navigationActions.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5 max-w-[92%]">
                            {msg.navigationActions.map((act, idx) => (
                              <button
                                key={`${act.id}_${act.targetClass || ''}_${idx}`}
                                type="button"
                                onClick={() => handleActionClick(act)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-[11px] tracking-wide shadow-xs cursor-pointer transition-colors"
                              >
                                <span>{act.label}</span>
                                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                              </button>
                            ))}
                          </div>
                        )}

                      {/* Support Escalation CTA when relevant */}
                      {msg.role === 'assistant' && msg.suggestSupportTicket && (
                        <div className="mt-2">
                          <button
                            type="button"
                            onClick={() => handleOpenSupportForm()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] tracking-wide shadow-xs cursor-pointer transition-colors"
                          >
                            <LifeBuoy className="w-3.5 h-3.5 shrink-0" />
                            <span>SUBMIT A SUPPORT REQUEST</span>
                          </button>
                        </div>
                      )}

                      <span className="mt-1 px-1 text-[10px] text-slate-400 font-medium">
                        {msg.timestamp}
                      </span>
                    </div>
                  ))}

                  {isSending && (
                    <div className="flex items-start">
                      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-xs flex items-center gap-2 text-xs text-slate-600 font-semibold">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-sky-600" />
                        <span>Finding the best answer...</span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Free-Text Input Area */}
                <div className="bg-white border-t border-slate-200 p-3 space-y-2 shrink-0">
                  <form onSubmit={handleSendMessage} className="flex items-end gap-2">
                    <textarea
                      ref={inputRef}
                      rows={1}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          void handleSendMessage();
                        }
                      }}
                      placeholder="Ask anything in English, हिंदी, or मराठी..."
                      maxLength={600}
                      disabled={isSending}
                      className="flex-1 resize-none rounded-xl border border-slate-300 focus:border-sky-600 focus:ring-2 focus:ring-sky-500/20 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none max-h-28"
                    />
                    <button
                      type="submit"
                      disabled={!inputValue.trim() || isSending}
                      aria-label="Send message"
                      className="h-10 px-4 rounded-xl bg-[#0f2952] hover:bg-[#133870] disabled:bg-slate-300 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed transition-colors shrink-0"
                    >
                      <Send className="w-4 h-4" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 px-0.5">
                    <span>Type any question naturally</span>
                    <button
                      type="button"
                      onClick={() => handleOpenSupportForm()}
                      className="font-bold text-sky-700 hover:text-sky-900 hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <LifeBuoy className="w-3 h-3" />
                      <span>Submit a Support Request</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Support Request Form View */
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-slate-50/70 space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setViewMode('chat')}
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-sky-700 hover:text-sky-900 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Help Chat</span>
                  </button>
                  <span className="text-[11px] font-bold text-slate-500">
                    Direct Support Desk
                  </span>
                </div>

                {submittedTicket ? (
                  <div className="bg-white rounded-2xl border-2 border-emerald-300 p-5 text-center space-y-3 shadow-sm">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-display font-black text-base text-slate-900">
                      Support Request Submitted
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Your request has been saved securely. Please keep your ticket number for reference:
                    </p>
                    <div className="py-2 px-4 rounded-xl bg-emerald-50 border border-emerald-200 inline-block font-mono font-black text-sm text-emerald-900">
                      {submittedTicket.ticketNumber}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Updates will be sent to <span className="font-bold text-slate-700">{submittedTicket.email}</span>.
                    </p>
                    <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                      <button
                        type="button"
                        onClick={() => setViewMode('chat')}
                        className="px-4 py-2 rounded-xl bg-[#0f2952] text-white font-bold text-xs cursor-pointer"
                      >
                        Return to Chat
                      </button>
                      <button
                        type="button"
                        onClick={() => setSubmittedTicket(null)}
                        className="px-4 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold text-xs cursor-pointer"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitTicket} className="space-y-3.5">
                    <div className="rounded-xl bg-sky-50 border border-sky-200 px-3 py-2 text-[11px] text-sky-900 font-medium flex items-start gap-2">
                      <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                      <span>
                        For your security, never enter your password, OTP, UPI PIN, or card details here.
                      </span>
                    </div>

                    {ticketError && (
                      <div className="rounded-xl bg-rose-50 border border-rose-200 px-3 py-2.5 text-xs text-rose-800 font-semibold flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{ticketError}</span>
                      </div>
                    )}

                    {/* Role Selection */}
                    <div className="space-y-1">
                      <label className="block text-xs font-extrabold text-slate-700">
                        I am a:
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['student', 'teacher'] as const).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => setReqRole(r)}
                            className={`py-2 px-3 rounded-xl border text-xs font-extrabold capitalize cursor-pointer transition-colors ${
                              reqRole === r
                                ? 'bg-[#0f2952] text-white border-[#0f2952]'
                                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="msz-sup-name" className="block text-xs font-extrabold text-slate-700">
                        Full Name *
                      </label>
                      <input
                        id="msz-sup-name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={100}
                        value={reqName}
                        onChange={(e) => setReqName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="msz-sup-email" className="block text-xs font-extrabold text-slate-700">
                        Registered Email Address *
                      </label>
                      <input
                        id="msz-sup-email"
                        type="email"
                        required
                        maxLength={150}
                        value={reqEmail}
                        onChange={(e) => setReqEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="msz-sup-cat" className="block text-xs font-extrabold text-slate-700">
                        Problem Category *
                      </label>
                      <select
                        id="msz-sup-cat"
                        value={reqCategory}
                        onChange={(e) => setReqCategory(e.target.value as SupportCategory)}
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                      >
                        {SUPPORT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="msz-sup-mobile" className="block text-xs font-extrabold text-slate-700">
                        Mobile Number (Optional)
                      </label>
                      <input
                        id="msz-sup-mobile"
                        type="tel"
                        maxLength={20}
                        value={reqMobile}
                        onChange={(e) => setReqMobile(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="msz-sup-desc" className="block text-xs font-extrabold text-slate-700">
                        Problem Description *
                      </label>
                      <textarea
                        id="msz-sup-desc"
                        required
                        minLength={10}
                        maxLength={1800}
                        rows={4}
                        value={reqDescription}
                        onChange={(e) => setReqDescription(e.target.value)}
                        placeholder="Please describe the issue, class/board selected, or payment/login error message (no passwords or OTPs)."
                        className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-sky-600 focus:outline-none resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingTicket}
                      className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                      {isSubmittingTicket ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Request...</span>
                        </>
                      ) : (
                        <>
                          <LifeBuoy className="w-4 h-4" />
                          <span>Submit Support Request</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
