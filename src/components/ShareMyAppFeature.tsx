import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  MessageCircle,
  Share2,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';
import type { ClassLevel, EducationBoard } from '../types';
import { getBoardShortLabel } from '../utils/subscriptionAccess';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallButton } from './PWAInstallButton';

export const MYSTUDYZONE_APP_URL = 'https://mystudyzone.in';
export const MYSTUDYZONE_SHARE_CARD_IMAGE = '/mystudyzone-share-card.jpg';
export const MYSTUDYZONE_LOGO_ICON = '/pwa-192x192.png';

export interface ShareInvitationOptions {
  board?: EducationBoard | 'ALL';
  classLevel?: ClassLevel | 'ALL';
  senderName?: string;
}

/**
 * Formats the WhatsApp invitation message with https://mystudyzone.in positioned
 * cleanly so WhatsApp generates the rich clickable OpenGraph preview card
 * (with MyStudyZone invitation image, logo, title, and description) rather than
 * a plain text URL.
 */
export function buildWhatsAppInvitationText(options?: ShareInvitationOptions): string {
  const boardPart =
    options?.board && options.board !== 'ALL'
      ? getBoardShortLabel(options.board)
      : 'Maharashtra State Board, CBSE & ICSE';
  const classPart =
    options?.classLevel && options.classLevel !== 'ALL'
      ? options.classLevel
      : 'Classes 1 to 10';
  const senderLine = options?.senderName?.trim()
    ? `\n👩‍🏫 *Invited by:* ${options.senderName.trim()}`
    : '';

  return [
    MYSTUDYZONE_APP_URL,
    '',
    '🎓 *MyStudyZone – Classes 1 to 10 Official Learning App*',
    `📚 *Curriculum:* ${boardPart} (${classPart})`,
    senderLine,
    '',
    '✨ *Tap the MyStudyZone App Card above to open directly:*',
    '✅ 100% Free Official Textbooks & Chapter Study Notes',
    '✅ Interactive Online Worksheets & 4-Level MCQ Quizzes',
    '✅ 10 Skill Subjects in MyStudyZone Additional Curriculum',
    '✅ MSCE Scholarship, Olympus, Story World & Drawing Studio',
    '📲 *Direct App Install:* Tap *"Install App"* inside to add MyStudyZone to your phone Home Screen!',
  ]
    .filter((line, idx, arr) => !(line === '' && arr[idx - 1] === ''))
    .join('\n');
}

export function buildWhatsAppShareHref(options?: ShareInvitationOptions): string {
  const message = buildWhatsAppInvitationText(options);
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
}

interface ClickableAppInvitationCardProps {
  board?: EducationBoard | 'ALL';
  classLevel?: ClassLevel | 'ALL';
  onOpenStudentApp: () => void;
  compact?: boolean;
}

/**
 * Interactive, clickable WhatsApp-style Rich App Invitation Card Preview.
 * Clicking anywhere on the card opens the student-facing application directly.
 */
export const ClickableAppInvitationCard: React.FC<ClickableAppInvitationCardProps> = ({
  board = 'ALL',
  classLevel = 'ALL',
  onOpenStudentApp,
  compact = false,
}) => {
  const scopeLabel =
    board !== 'ALL' && classLevel !== 'ALL'
      ? `${getBoardShortLabel(board)} • ${classLevel}`
      : 'Classes 1 to 10 • Maharashtra Board • CBSE • ICSE';

  return (
    <div className="rounded-3xl bg-[#efeae2] p-3 sm:p-4 border-2 border-emerald-300/90 shadow-md space-y-2.5">
      {/* Top WhatsApp Preview Header Pill */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-emerald-950 font-display font-black text-[11px]">
          <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>WhatsApp App Invitation Card Preview (Clickable)</span>
        </span>
        <span className="text-[11px] font-extrabold text-emerald-900">
          Tap card to open Student App →
        </span>
      </div>

      {/* WhatsApp Outgoing Message Bubble with Rich Preview Card */}
      <div className="rounded-2xl bg-[#d9fdd3] border border-[#b2e5ab] p-2.5 sm:p-3 shadow-xs space-y-2.5">
        {/* Clickable Rich Link Preview Card inside WhatsApp Bubble */}
        <button
          type="button"
          onClick={onOpenStudentApp}
          data-testid="clickable-app-invitation-card"
          title="Click to open MyStudyZone Student Application (https://mystudyzone.in)"
          className="w-full text-left rounded-2xl bg-white hover:bg-sky-50/70 border-2 border-emerald-400/80 hover:border-[#0f2952] shadow-sm overflow-hidden transition-all cursor-pointer group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-amber-400"
        >
          {/* 1. Professional MyStudyZone App Invitation Image */}
          <div className="relative w-full aspect-[1200/630] bg-[#0f2952] overflow-hidden">
            <img
              src={MYSTUDYZONE_SHARE_CARD_IMAGE}
              alt="MyStudyZone – Classes 1 to 10 Learning App Invitation Card"
              width={1200}
              height={630}
              loading="eager"
              className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-300"
            />
            {/* Top-left Official Logo & Brand Badge overlay */}
            <div className="absolute top-2.5 left-2.5 inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-950/80 backdrop-blur-xs border border-amber-300/60 text-white shadow-md">
              <img
                src={MYSTUDYZONE_LOGO_ICON}
                alt="MyStudyZone Logo"
                width={24}
                height={24}
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white p-0.5 object-contain shrink-0"
              />
              <span className="font-display font-black text-[11px] sm:text-xs tracking-wide text-amber-300">
                MyStudyZone App
              </span>
            </div>

            {/* Bottom-right Active Scope Pill */}
            <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-xl bg-emerald-600/95 text-white font-display font-black text-[10px] sm:text-xs shadow-md border border-emerald-300 flex items-center gap-1">
              <span>Tap to Open Student App</span>
              <ExternalLink className="w-3 h-3 shrink-0" />
            </div>
          </div>

          {/* 2. MyStudyZone Logo, App Name & Rich Card Metadata Footer */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-white via-amber-50/40 to-emerald-50/50 flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
              <img
                src={MYSTUDYZONE_LOGO_ICON}
                alt="MyStudyZone Official Logo"
                width={44}
                height={44}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl border border-amber-300 bg-white p-0.5 shadow-2xs shrink-0 object-contain"
              />
              <div className="min-w-0 space-y-0.5">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.2 rounded-md border border-emerald-300">
                    mystudyzone.in
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 truncate">
                    {scopeLabel}
                  </span>
                </div>
                <h3 className="font-display font-black text-sm sm:text-base text-[#0f2952] group-hover:text-indigo-700 leading-snug">
                  MyStudyZone – Classes 1 to 10 Online Learning App
                </h3>
                {!compact && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    Free Official Textbooks, Study Notes, Interactive Worksheets, 4-Level MCQ Quizzes, Additional Curriculum, Scholarship &amp; Story World.
                  </p>
                )}
              </div>
            </div>

            <span className="shrink-0 self-center px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 group-hover:from-emerald-700 group-hover:to-teal-700 text-white font-display font-black text-xs shadow-xs flex items-center gap-1">
              <span>OPEN APP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </span>
          </div>
        </button>

        {/* Formatted Invitation Caption inside the WhatsApp Bubble */}
        {!compact && (
          <div className="px-1.5 pt-0.5 text-xs text-slate-800 space-y-1 font-medium">
            <p className="font-extrabold text-[#0f2952]">
              🎓 MyStudyZone – Classes 1 to 10 Official Learning App ({scopeLabel})
            </p>
            <p className="text-[11px] text-slate-700">
              Tap the <strong>MyStudyZone App Card</strong> above to start learning immediately or install the app onto your phone Home Screen!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

interface ShareMyAppBannerProps {
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  senderName?: string;
  onOpenStudentApp: () => void;
  onOpenShareModal: () => void;
}

/**
 * Prominent Dashboard Share My App & PWA Install Card.
 */
export const ShareMyAppBanner: React.FC<ShareMyAppBannerProps> = ({
  selectedBoard,
  selectedClass,
  senderName,
  onOpenStudentApp,
  onOpenShareModal,
}) => {
  const { isInstalled, isStandalone } = usePWAInstall();
  const whatsappHref = buildWhatsAppShareHref({
    board: selectedBoard,
    classLevel: selectedClass,
    senderName,
  });

  return (
    <section
      aria-label="Share MyStudyZone App with Students on WhatsApp"
      className="rounded-3xl bg-gradient-to-br from-[#0f2952] via-[#133870] to-[#064e3b] text-white border-2 border-amber-400/90 shadow-lg p-4 sm:p-6 space-y-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Left Column: Branding, WhatsApp Share CTA & PWA Install Option */}
        <div className="lg:col-span-6 space-y-3.5">
          <div className="flex items-center gap-3">
            <img
              src={MYSTUDYZONE_LOGO_ICON}
              alt="MyStudyZone Official Logo"
              width={52}
              height={52}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white p-1 border-2 border-amber-300 shadow-md shrink-0 object-contain"
            />
            <div>
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-display font-black text-[10px] uppercase tracking-wider">
                  Share My App • mystudyzone.in
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-300/40 text-emerald-200 font-extrabold text-[10px]">
                  Rich WhatsApp Card
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-display font-black tracking-tight text-white mt-0.5">
                MyStudyZone – Student App Invitation
              </h2>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Invite students and parents on WhatsApp with the clickable{' '}
            <strong className="text-amber-300">MyStudyZone App Invitation Card</strong>. Recipients see the visual app card and can open{' '}
            <strong className="text-white">mystudyzone.in</strong> or install the mobile app in one tap.
          </p>

          {/* Primary Action Buttons: 1. SHARE APP (WhatsApp), 2. Customize/Preview Card, 3. Open Student App */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="whatsapp-share-app-btn"
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:brightness-110 text-white font-display font-black text-xs sm:text-sm shadow-md border-2 border-white/80 inline-flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-current shrink-0" />
              <span>SHARE APP ON WHATSAPP</span>
            </a>

            <button
              type="button"
              onClick={onOpenShareModal}
              data-testid="open-share-app-studio-btn"
              className="min-h-[44px] px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-display font-black text-xs sm:text-sm shadow-sm inline-flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span>Invitation Card &amp; Options</span>
            </button>
          </div>

          {/* 5. Installation Option for Students Who Have Not Installed the PWA */}
          <div className="rounded-2xl bg-white/10 border border-white/20 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <Smartphone className="w-5 h-5 text-amber-300 shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-display font-black text-white">
                  {isInstalled || isStandalone
                    ? '✓ MyStudyZone App Installed on This Device'
                    : 'Have Not Installed the MyStudyZone App Yet?'}
                </p>
                <p className="text-[11px] text-sky-200 truncate">
                  {isInstalled || isStandalone
                    ? 'Ready for fast full-screen home-screen access.'
                    : 'Install the official PWA directly to your phone Home Screen (No Play Store needed).'}
                </p>
              </div>
            </div>
            <div className="shrink-0">
              <PWAInstallButton variant="compact" />
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Clickable Card Preview */}
        <div className="lg:col-span-6">
          <ClickableAppInvitationCard
            board={selectedBoard}
            classLevel={selectedClass}
            onOpenStudentApp={onOpenStudentApp}
            compact
          />
        </div>
      </div>
    </section>
  );
};

interface ShareMyAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBoard?: EducationBoard;
  defaultClass?: ClassLevel;
  senderName?: string;
  onOpenStudentApp: (board?: EducationBoard, classLevel?: ClassLevel) => void;
}

/**
 * Full-Featured Share My App Modal with WhatsApp Share, Native Image+Card Share,
 * Clickable Student App Preview Card, and Direct PWA Installation for Students.
 */
export const ShareMyAppModal: React.FC<ShareMyAppModalProps> = ({
  isOpen,
  onClose,
  defaultBoard = 'Maharashtra',
  defaultClass = 'Class 5',
  senderName = '',
  onOpenStudentApp,
}) => {
  const [selectedScope, setSelectedScope] = useState<'ALL' | 'CUSTOM'>('ALL');
  const [board, setBoard] = useState<EducationBoard>(defaultBoard);
  const [classLevel, setClassLevel] = useState<ClassLevel>(defaultClass);
  const [customSender, setCustomSender] = useState<string>(senderName);
  const [copied, setCopied] = useState(false);
  const [nativeShareStatus, setNativeShareStatus] = useState<string | null>(null);

  const { isInstalled, isStandalone } = usePWAInstall();

  if (!isOpen) return null;

  const shareOptions: ShareInvitationOptions = {
    board: selectedScope === 'ALL' ? 'ALL' : board,
    classLevel: selectedScope === 'ALL' ? 'ALL' : classLevel,
    senderName: customSender,
  };

  const whatsappHref = buildWhatsAppShareHref(shareOptions);
  const invitationMessage = buildWhatsAppInvitationText(shareOptions);

  const handleCopyInvitation = async () => {
    try {
      await navigator.clipboard.writeText(invitationMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShareWithImage = async () => {
    setNativeShareStatus(null);
    if (typeof navigator === 'undefined' || !navigator.share) {
      setNativeShareStatus('Use the green "SHARE APP ON WHATSAPP" button to send immediately.');
      return;
    }

    try {
      // Attempt to attach the actual 1200x630 MyStudyZone invitation image file if the browser supports file sharing
      const response = await fetch(MYSTUDYZONE_SHARE_CARD_IMAGE);
      const blob = await response.blob();
      const imageFile = new File([blob], 'MyStudyZone-App-Invitation.jpg', {
        type: 'image/jpeg',
      });

      if (navigator.canShare && navigator.canShare({ files: [imageFile] })) {
        await navigator.share({
          title: 'MyStudyZone – Classes 1 to 10 Learning App',
          text: invitationMessage,
          url: MYSTUDYZONE_APP_URL,
          files: [imageFile],
        });
        return;
      }

      await navigator.share({
        title: 'MyStudyZone – Classes 1 to 10 Learning App',
        text: invitationMessage,
        url: MYSTUDYZONE_APP_URL,
      });
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        setNativeShareStatus('Use the green "SHARE APP ON WHATSAPP" button below.');
      }
    }
  };

  const handleClickPreviewCard = () => {
    onClose();
    if (selectedScope === 'CUSTOM') {
      onOpenStudentApp(board, classLevel);
    } else {
      onOpenStudentApp();
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Share MyStudyZone App on WhatsApp"
    >
      <div className="w-full max-w-2xl bg-white rounded-3xl border-2 border-amber-300 shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Header with MyStudyZone Logo & App Name */}
        <div className="bg-gradient-to-r from-[#0f2952] via-[#133870] to-[#064e3b] text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={MYSTUDYZONE_LOGO_ICON}
              alt="MyStudyZone Official Logo"
              width={44}
              height={44}
              className="w-11 h-11 rounded-2xl bg-white p-0.5 border-2 border-amber-300 shadow-xs shrink-0 object-contain"
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="px-2 py-0.2 rounded-full bg-amber-400 text-slate-950 font-display font-black text-[10px] uppercase">
                  SHARE MY APP
                </span>
                <span className="text-[11px] font-bold text-emerald-300 truncate">
                  https://mystudyzone.in
                </span>
              </div>
              <h2 className="font-display font-black text-base sm:text-lg text-white truncate">
                MyStudyZone – WhatsApp App Invitation Card
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Share My App Modal"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-5 overflow-y-auto">
          {/* 1. Interactive Clickable Card Preview */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-display font-black uppercase tracking-wider text-[#0f2952] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>1. Clickable Student App Invitation Card Preview</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-700">
                Click the card below to open the Student App directly
              </span>
            </div>

            <ClickableAppInvitationCard
              board={shareOptions.board}
              classLevel={shareOptions.classLevel}
              onOpenStudentApp={handleClickPreviewCard}
            />
          </div>

          {/* 2. Optional Scope & Teacher/Sender Name Customization */}
          <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 sm:p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-display font-black uppercase tracking-wider text-slate-700">
                2. Invitation Scope (Optional)
              </span>
              <div className="inline-flex rounded-xl bg-white border border-slate-200 p-0.5">
                <button
                  type="button"
                  onClick={() => setSelectedScope('ALL')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-colors ${
                    selectedScope === 'ALL'
                      ? 'bg-[#0f2952] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  All Boards &amp; Classes (1–10)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedScope('CUSTOM')}
                  className={`px-3 py-1 rounded-lg text-xs font-extrabold cursor-pointer transition-colors ${
                    selectedScope === 'CUSTOM'
                      ? 'bg-[#0f2952] text-white'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Specific Board &amp; Class
                </button>
              </div>
            </div>

            {selectedScope === 'CUSTOM' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 mb-1">
                    Board
                  </label>
                  <select
                    value={board}
                    onChange={(e) => setBoard(e.target.value as EducationBoard)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    <option value="Maharashtra">Maharashtra State Board</option>
                    <option value="CBSE">CBSE Board</option>
                    <option value="ICSE">ICSE Board</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-slate-600 mb-1">
                    Class (1–10)
                  </label>
                  <select
                    value={classLevel}
                    onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                    className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900"
                  >
                    {(
                      [
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
                      ] as ClassLevel[]
                    ).map((cls) => (
                      <option key={cls} value={cls}>
                        {cls}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-extrabold text-slate-600 mb-1">
                Invited By (Optional Teacher / School / Parent Name)
              </label>
              <input
                type="text"
                value={customSender}
                onChange={(e) => setCustomSender(e.target.value)}
                placeholder="e.g., Class Teacher / MyStudyZone"
                className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:border-indigo-600"
              />
            </div>
          </div>

          {/* 3. Primary WhatsApp Share App Button & Supporting Actions */}
          <div className="space-y-2.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="modal-whatsapp-share-btn"
                className="min-h-[48px] px-5 py-3 rounded-2xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:brightness-105 text-white font-display font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current shrink-0" />
                <span>SHARE APP ON WHATSAPP</span>
              </a>

              <button
                type="button"
                onClick={() => void handleNativeShareWithImage()}
                className="min-h-[48px] px-4 py-3 rounded-2xl bg-[#0f2952] hover:bg-[#1e3a8a] text-white font-display font-black text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Share2 className="w-4 h-4 text-amber-300 shrink-0" />
                <span>Share Image Card + App Link</span>
              </button>
            </div>

            {nativeShareStatus && (
              <p className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                {nativeShareStatus}
              </p>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => void handleCopyInvitation()}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Invitation Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy WhatsApp Invitation</span>
                    </>
                  )}
                </button>

                <a
                  href={MYSTUDYZONE_SHARE_CARD_IMAGE}
                  download="MyStudyZone-App-Invitation-Card.jpg"
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-indigo-700" />
                  <span>Download Invitation Image</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleClickPreviewCard}
                className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-900 font-extrabold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <GraduationCap className="w-3.5 h-3.5 text-emerald-700" />
                <span>Open Student App Directly →</span>
              </button>
            </div>
          </div>

          {/* 4. PWA Installation Section for Students Who Have Not Installed the App */}
          <div className="rounded-2xl bg-gradient-to-r from-[#fffbeb] via-[#fef3c7] to-[#e0f2fe] border-2 border-amber-300 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={MYSTUDYZONE_LOGO_ICON}
                alt="MyStudyZone App Icon"
                width={44}
                height={44}
                className="w-11 h-11 rounded-2xl bg-white p-0.5 border border-amber-300 shadow-2xs shrink-0"
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h4 className="font-display font-black text-xs sm:text-sm text-[#0f2952]">
                    {isInstalled || isStandalone
                      ? 'MyStudyZone PWA is Installed on This Device'
                      : 'Install MyStudyZone App (For Students Without the App)'}
                  </h4>
                  <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-black text-[10px] uppercase">
                    Direct Home Screen App
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                  {isInstalled || isStandalone
                    ? 'You can launch MyStudyZone directly from your phone or desktop Home Screen.'
                    : 'Students receiving your invitation can tap "Install App" to add MyStudyZone to their phone Home Screen with one tap.'}
                </p>
              </div>
            </div>

            <div className="shrink-0">
              {isInstalled || isStandalone ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Installed ✓</span>
                </span>
              ) : (
                <PWAInstallButton variant="compact" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
};
