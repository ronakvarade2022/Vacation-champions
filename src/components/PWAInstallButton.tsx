import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  CheckCircle2,
  Download,
  ExternalLink,
  MoreVertical,
  Share,
  Smartphone,
  WifiOff,
  X,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'banner' | 'compact' | 'teacher' | 'header';
  className?: string;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  variant = 'compact',
  className = '',
}) => {
  const {
    isInstallable,
    isInstalled,
    isStandalone,
    isIOS,
    isIOSSafari,
    isAndroid,
    isInAppBrowser,
    install,
  } = usePWAInstall();

  const [showInstructionsModal, setShowInstructionsModal] = useState(false);
  const [isPrompting, setIsPrompting] = useState(false);

  // If already running inside the installed standalone PWA, do not show install UI
  if (isStandalone) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstalled || isPrompting) return;

    if (isInstallable) {
      setIsPrompting(true);
      try {
        const outcome = await install();
        if (outcome === 'unavailable') {
          setShowInstructionsModal(true);
        }
      } finally {
        setIsPrompting(false);
      }
      return;
    }

    // Native beforeinstallprompt is unavailable (iOS Safari, in-app WebView, unsupported browser)
    setShowInstructionsModal(true);
  };

  if (isInstalled) {
    if (variant === 'header') {
      return (
        <div
          data-testid="pwa-installed-badge-header"
          className={`inline-flex items-center gap-1 px-2 sm:px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-extrabold text-[11px] sm:text-xs whitespace-nowrap shrink-0 ${className}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span className="hidden sm:inline">App Installed</span>
          <span className="sm:hidden">Installed</span>
        </div>
      );
    }
    return (
      <div
        className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 font-extrabold text-xs shadow-xs ${className}`}
      >
        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>App Already Installed</span>
      </div>
    );
  }

  return (
    <>
      {variant === 'banner' ? (
        <section
          aria-label="Install MyStudyZone Mobile App"
          className={`rounded-3xl bg-gradient-to-r from-[#fffbeb] via-[#fef3c7] to-[#e0f2fe] border-2 border-amber-300 shadow-sm px-4 py-3.5 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${className}`}
        >
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="/pwa-192x192.png"
              alt="MyStudyZone Official App Icon"
              width={48}
              height={48}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl border border-amber-300 bg-white shadow-xs shrink-0 object-contain"
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-display font-black text-sm sm:text-base text-[#0f2952] leading-tight">
                  MyStudyZone Mobile App (Direct Install)
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[10px] font-black uppercase border border-emerald-300">
                  No Play Store Needed
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Install MyStudyZone directly onto your phone home screen for fast app-style learning access.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => void handleInstallClick()}
            disabled={isPrompting}
            data-testid="pwa-install-btn-banner"
            className="w-full sm:w-auto px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#0f2952] via-[#133870] to-[#1d4ed8] hover:brightness-110 disabled:opacity-70 text-white font-display font-black text-xs sm:text-sm tracking-wide shadow-md border-2 border-amber-300/80 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98] shrink-0"
          >
            <span>📲 INSTALL MYSTUDYZONE APP</span>
          </button>
        </section>
      ) : variant === 'header' ? (
        <button
          type="button"
          onClick={() => void handleInstallClick()}
          disabled={isPrompting}
          data-testid="pwa-install-btn-header"
          title="Install MyStudyZone App to your Home Screen"
          style={{
            backgroundColor: '#ea580c',
            backgroundImage: 'linear-gradient(to right, #f59e0b, #ea580c)',
            color: '#ffffff',
          }}
          className={`min-h-[36px] sm:min-h-[40px] px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-orange-600 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-[11px] sm:text-xs shadow-xs border border-amber-500 flex items-center justify-center gap-1.5 cursor-pointer transition-all shrink-0 whitespace-nowrap ${className}`}
        >
          <Download className="w-3.5 h-3.5 shrink-0 text-white" />
          <span className="hidden sm:inline text-white">Install App</span>
          <span className="sm:hidden text-white">Install</span>
        </button>
      ) : (
        <button
          type="button"
          onClick={() => void handleInstallClick()}
          disabled={isPrompting}
          data-testid={`pwa-install-btn-${variant}`}
          style={
            variant === 'teacher'
              ? {
                  backgroundColor: '#fcd34d',
                  backgroundImage: 'linear-gradient(to right, #fcd34d, #fde047)',
                  color: '#020617',
                }
              : {
                  backgroundColor: '#ea580c',
                  backgroundImage: 'linear-gradient(to right, #f59e0b, #ea580c)',
                  color: '#ffffff',
                }
          }
          className={
            variant === 'teacher'
              ? `px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all bg-amber-300 bg-gradient-to-r from-amber-300 to-yellow-300 hover:brightness-105 text-slate-950 shadow-xs border border-amber-200 ${className}`
              : `px-3.5 sm:px-4 py-2.5 rounded-xl bg-orange-600 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs ${className}`
          }
        >
          <span>📲 INSTALL MYSTUDYZONE APP</span>
        </button>
      )}

      {/* Honest Fallback Instructions Modal portaled to document.body so header backdrop-blur never clips it */}
      {showInstructionsModal &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-[2px]"
            role="dialog"
            aria-modal="true"
            aria-label="Install MyStudyZone App Instructions"
          >
          <div className="w-full max-w-md bg-white rounded-3xl border-2 border-amber-200 shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-[#0f2952] to-[#1e3a8a] text-white px-5 py-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src="/pwa-192x192.png"
                  alt="MyStudyZone Icon"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-xl bg-white p-0.5 shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-display font-black text-base truncate">
                    Install MyStudyZone App
                  </h3>
                  <p className="text-[11px] text-sky-100 font-medium">
                    Add directly to your Home Screen
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowInstructionsModal(false)}
                aria-label="Close installation guide"
                className="p-1.5 rounded-xl text-sky-100 hover:text-white hover:bg-white/15 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 space-y-4 text-sm text-slate-700">
              {isIOS ? (
                <div className="space-y-3">
                  <div className="rounded-2xl bg-sky-50 border border-sky-200 p-3.5 space-y-1.5">
                    <p className="font-extrabold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" />
                      <span>iPhone / iPad (Safari Instructions)</span>
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Apple iPhone browsers do not allow an automatic install popup, so follow these 3 quick steps in <strong>Safari</strong>:
                    </p>
                  </div>

                  {!isIOSSafari && (
                    <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs font-semibold text-amber-950">
                      Open <strong>https://mystudyzone.in</strong> in <strong>Safari</strong> first for the &ldquo;Add to Home Screen&rdquo; option.
                    </div>
                  )}

                  <ol className="space-y-2.5 text-xs font-medium text-slate-800">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span>
                        Tap the <strong className="inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 text-sky-700" /> Share</strong> button on the Safari toolbar (bottom or top of your screen).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span>
                        Scroll down and tap <strong>&ldquo;Add to Home Screen&rdquo;</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        3
                      </span>
                      <span>
                        Tap <strong>&ldquo;Add&rdquo;</strong> in the top-right corner. The official MyStudyZone icon will appear on your iPhone Home Screen!
                      </span>
                    </li>
                  </ol>
                </div>
              ) : isInAppBrowser ? (
                <div className="space-y-3">
                  <div className="rounded-2xl bg-amber-50 border border-amber-300 p-3.5 text-xs text-amber-950 space-y-1.5">
                    <p className="font-black flex items-center gap-1.5">
                      <ExternalLink className="w-4 h-4 text-amber-700" />
                      <span>In-App Browser Detected</span>
                    </p>
                    <p className="leading-relaxed">
                      You opened MyStudyZone inside an in-app browser (such as WhatsApp or Instagram), which blocks automatic app installation.
                    </p>
                  </div>
                  <ol className="space-y-2 text-xs font-medium text-slate-800">
                    <li>1. Tap the <strong>⋮ Menu</strong> button at the top-right corner.</li>
                    <li>2. Choose <strong>&ldquo;Open in Chrome&rdquo;</strong> (or Open in Browser).</li>
                    <li>3. Click <strong>INSTALL MYSTUDYZONE APP</strong> in Chrome for one-tap installation!</li>
                  </ol>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="rounded-2xl bg-sky-50 border border-sky-200 p-3.5 space-y-1.5">
                    <p className="font-extrabold text-xs uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                      <Download className="w-4 h-4" />
                      <span>
                        {isAndroid ? 'Android Browser Installation' : 'Browser Menu Installation'}
                      </span>
                    </p>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      Your current browser has not triggered the automatic install popup yet. You can still install MyStudyZone immediately from the browser menu:
                    </p>
                  </div>

                  <ol className="space-y-2.5 text-xs font-medium text-slate-800">
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        1
                      </span>
                      <span>
                        Tap the browser <strong className="inline-flex items-center gap-0.5"><MoreVertical className="w-3.5 h-3.5" /> Menu (3 dots)</strong> at the top-right corner of {isAndroid ? 'Chrome / Browser' : 'your browser address bar'}.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        2
                      </span>
                      <span>
                        Tap <strong>&ldquo;Install app&rdquo;</strong> or <strong>&ldquo;Add to Home screen&rdquo;</strong>.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-[#0f2952] text-white font-black text-[11px] flex items-center justify-center shrink-0">
                        3
                      </span>
                      <span>
                        Confirm by tapping <strong>Install / Add</strong>. No Play Store required!
                      </span>
                    </li>
                  </ol>
                </div>
              )}

              <button
                type="button"
                onClick={() => setShowInstructionsModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export const PWAOfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div
      role="status"
      className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-xl bg-amber-600 text-white px-3 py-1.5 text-xs font-extrabold shadow-lg"
    >
      <WifiOff className="w-3.5 h-3.5 shrink-0" />
      <span>Offline Mode — Reconnect for live sync &amp; payments</span>
    </div>
  );
};
