import { useEffect, useState, useCallback } from 'react';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt: () => Promise<void>;
}

declare global {
  interface Window {
    __mszDeferredInstallPrompt?: BeforeInstallPromptEvent | null;
    __mszAppInstalled?: boolean;
  }
}

function detectStandaloneDisplay(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    if (window.matchMedia('(display-mode: standalone)').matches) return true;
    if ((window.navigator as unknown as { standalone?: boolean }).standalone === true) return true;
    if (document.referrer && document.referrer.startsWith('android-app://')) return true;
  } catch {
    // Ignore
  }
  return false;
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(() =>
    typeof window !== 'undefined' ? window.__mszDeferredInstallPrompt || null : null
  );
  const [isStandalone, setIsStandalone] = useState<boolean>(() => detectStandaloneDisplay());
  const [isInstalled, setIsInstalled] = useState<boolean>(() =>
    detectStandaloneDisplay() || Boolean(typeof window !== 'undefined' && window.__mszAppInstalled)
  );
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [isIOSSafari, setIsIOSSafari] = useState<boolean>(false);
  const [isAndroid, setIsAndroid] = useState<boolean>(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ua = window.navigator.userAgent.toLowerCase();
    const isTouchMac =
      window.navigator.platform === 'MacIntel' && (window.navigator.maxTouchPoints || 0) > 1;
    const iosDevice = /iphone|ipad|ipod/.test(ua) || isTouchMac;
    const iosSafari =
      iosDevice && /safari/.test(ua) && !/crios|fxios|edgios|opios/.test(ua);
    const androidDevice = /android/.test(ua);
    const inApp = /; wv\)|fbav|fban|instagram|whatsapp|micromessenger|line\//.test(ua);

    setIsIOS(iosDevice);
    setIsIOSSafari(iosSafari);
    setIsAndroid(androidDevice);
    setIsInAppBrowser(inApp);

    const standaloneNow = detectStandaloneDisplay();
    setIsStandalone(standaloneNow);
    if (standaloneNow || window.__mszAppInstalled) {
      setIsInstalled(true);
    }

    if (window.__mszDeferredInstallPrompt) {
      setDeferredPrompt(window.__mszDeferredInstallPrompt);
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      window.__mszDeferredInstallPrompt = promptEvent;
      setDeferredPrompt(promptEvent);
    };

    const handlePromptReady = () => {
      if (window.__mszDeferredInstallPrompt) {
        setDeferredPrompt(window.__mszDeferredInstallPrompt);
      }
    };

    const handleAppInstalled = () => {
      window.__mszDeferredInstallPrompt = null;
      window.__mszAppInstalled = true;
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    const standaloneMedia = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches);
      if (e.matches) {
        setIsInstalled(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('msz-pwa-prompt-ready', handlePromptReady);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('msz-pwa-installed', handleAppInstalled);
    standaloneMedia.addEventListener?.('change', handleDisplayModeChange);

    // Optional supported browser check for installed app state
    const navAny = window.navigator as unknown as {
      getInstalledRelatedApps?: () => Promise<Array<{ platform?: string; url?: string }>>;
    };
    if (!standaloneNow && typeof navAny.getInstalledRelatedApps === 'function') {
      navAny
        .getInstalledRelatedApps()
        .then((apps) => {
          if (Array.isArray(apps) && apps.length > 0) {
            setIsInstalled(true);
          }
        })
        .catch(() => {
          // Ignore if unsupported
        });
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('msz-pwa-prompt-ready', handlePromptReady);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('msz-pwa-installed', handleAppInstalled);
      standaloneMedia.removeEventListener?.('change', handleDisplayModeChange);
    };
  }, []);

  const install = useCallback(async (): Promise<'accepted' | 'dismissed' | 'unavailable'> => {
    const activePrompt = deferredPrompt || window.__mszDeferredInstallPrompt;
    if (!activePrompt) return 'unavailable';

    try {
      await activePrompt.prompt();
      const { outcome } = await activePrompt.userChoice;
      if (outcome === 'accepted') {
        window.__mszDeferredInstallPrompt = null;
        window.__mszAppInstalled = true;
        setDeferredPrompt(null);
        setIsInstalled(true);
        return 'accepted';
      }
      return 'dismissed';
    } catch {
      return 'unavailable';
    }
  }, [deferredPrompt]);

  return {
    isInstallable: Boolean(deferredPrompt),
    isInstalled,
    isStandalone,
    isIOS,
    isIOSSafari,
    isAndroid,
    isInAppBrowser,
    install,
  };
}
