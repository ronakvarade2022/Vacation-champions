import { useEffect, useRef } from 'react';

/**
 * ViewSonic Smart TV / ViewBoard IFP & Android TV Browser Compatibility Engine
 *
 * Solves:
 * 1. Safe scroll helpers (`safeScrollToTop`, `safeScrollIntoView`) for older Chromium TV WebViews.
 * 2. Single-window TV browser fallback for `<a target="_blank">` and `window.open(..., '_blank')`.
 * 3. TV Remote Control `OK` / `DPAD_CENTER` (keyCode 23 / 66 / 'Select' / 'Enter'),
 *    4-way D-Pad Spatial Arrow Navigation (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`),
 *    and automatic accessibility upgrade for clickable cards.
 * 4. Browser history (`pushState` / `popstate`) and TV Remote `Back` button integration
 *    so pressing Back returns to the previous screen/dashboard instead of closing the browser.
 */

export function isSmartTvOrSingleWindowBrowser(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  return (
    /ViewSonic|ViewBoard|IFP|Android TV|SmartTV|SMART-TV|GoogleTV|HbbTV|AOSP|BRAVIA|MiTV|AFTT|AFTM|AFTB|AFTN|CrKey|NetCast|Web0S|WebOS|Tizen|Viera|Aquos|PhilipsTV|Hisense|TCL/i.test(
      ua
    ) ||
    /; wv\)/i.test(ua) ||
    (/Android/i.test(ua) && !/Mobile/i.test(ua) && typeof window !== 'undefined' && window.innerWidth >= 1200)
  );
}

export function safeScrollToTop(smooth = true): void {
  if (typeof window === 'undefined') return;
  try {
    if (smooth) {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  } catch {
    try {
      window.scrollTo(0, 0);
    } catch {
      // Ignore on restricted WebViews
    }
  }
}

export function safeScrollIntoView(
  element: Element | null | undefined,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'nearest', inline: 'nearest' }
): void {
  if (!element || typeof element.scrollIntoView !== 'function') return;
  try {
    element.scrollIntoView(options);
  } catch {
    try {
      element.scrollIntoView(false);
    } catch {
      // Ignore on restricted WebViews
    }
  }
}

export function safeScrollToElementById(
  elementId: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start', inline: 'nearest' }
): boolean {
  if (typeof document === 'undefined') return false;
  const el = document.getElementById(elementId);
  if (!el) return false;
  safeScrollIntoView(el, options);
  return true;
}

const FOCUSABLE_SELECTOR = [
  'button:not([disabled])',
  'a[href]',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[role="button"]:not([aria-disabled="true"])',
  '[role="tab"]:not([aria-disabled="true"])',
  '[role="menuitem"]:not([aria-disabled="true"])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

function isElementVisibleAndFocusable(el: HTMLElement): boolean {
  if (!el || !el.isConnected) return false;
  if (el.hasAttribute('disabled') || el.getAttribute('aria-hidden') === 'true') return false;
  const style = window.getComputedStyle(el);
  if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) {
    return false;
  }
  const rect = el.getBoundingClientRect();
  return rect.width > 4 && rect.height > 4;
}

function getAllVisibleFocusableElements(): HTMLElement[] {
  if (typeof document === 'undefined') return [];
  // If a modal dialog is open, restrict spatial navigation to focusable elements inside the active modal
  const activeModals = Array.from(
    document.querySelectorAll<HTMLElement>('[role="dialog"], [aria-modal="true"]')
  ).filter((m) => isElementVisibleAndFocusable(m));

  const root: ParentNode =
    activeModals.length > 0 ? activeModals[activeModals.length - 1] : document;

  const nodes = Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
  return nodes.filter(isElementVisibleAndFocusable);
}

/**
 * Finds the best candidate element in the requested arrow direction (`up`, `down`, `left`, `right`)
 * using Euclidean distance weighted heavily toward primary-axis alignment.
 */
function findNextSpatialFocusable(
  current: HTMLElement | null,
  direction: 'up' | 'down' | 'left' | 'right'
): HTMLElement | null {
  const candidates = getAllVisibleFocusableElements();
  if (candidates.length === 0) return null;

  if (!current || !current.isConnected || current === document.body) {
    // Pick the first focusable element currently inside the viewport
    const inViewport = candidates.find((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= 0 && r.bottom <= window.innerHeight;
    });
    return inViewport || candidates[0];
  }

  const curRect = current.getBoundingClientRect();
  const curCenterX = curRect.left + curRect.width / 2;
  const curCenterY = curRect.top + curRect.height / 2;

  let bestCandidate: HTMLElement | null = null;
  let bestScore = Number.POSITIVE_INFINITY;

  for (const el of candidates) {
    if (el === current || current.contains(el) || el.contains(current)) continue;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = cx - curCenterX;
    const dy = cy - curCenterY;

    let primaryDelta = 0;
    let secondaryDelta = 0;
    let overlapsCrossAxis = false;

    if (direction === 'right') {
      if (dx <= 4) continue;
      primaryDelta = rect.left >= curRect.right ? rect.left - curRect.right : dx;
      secondaryDelta = Math.abs(dy);
      overlapsCrossAxis = rect.bottom >= curRect.top && rect.top <= curRect.bottom;
    } else if (direction === 'left') {
      if (dx >= -4) continue;
      primaryDelta = curRect.left >= rect.right ? curRect.left - rect.right : -dx;
      secondaryDelta = Math.abs(dy);
      overlapsCrossAxis = rect.bottom >= curRect.top && rect.top <= curRect.bottom;
    } else if (direction === 'down') {
      if (dy <= 4) continue;
      primaryDelta = rect.top >= curRect.bottom ? rect.top - curRect.bottom : dy;
      secondaryDelta = Math.abs(dx);
      overlapsCrossAxis = rect.right >= curRect.left && rect.left <= curRect.right;
    } else if (direction === 'up') {
      if (dy >= -4) continue;
      primaryDelta = curRect.top >= rect.bottom ? curRect.top - rect.bottom : -dy;
      secondaryDelta = Math.abs(dx);
      overlapsCrossAxis = rect.right >= curRect.left && rect.left <= curRect.right;
    }

    // Strongly prefer items aligned on the same row (for left/right) or column (for up/down)
    const crossWeight = overlapsCrossAxis ? 0.35 : 2.65;
    const score = Math.max(0, primaryDelta) + secondaryDelta * crossWeight;

    if (score < bestScore) {
      bestScore = score;
      bestCandidate = el;
    }
  }

  return bestCandidate;
}

/**
 * Automatically ensures clickable non-button elements (e.g., `<div class="... cursor-pointer ...">`)
 * that have React onClick handlers are keyboard/remote focusable (`tabIndex=0`, `role="button"`).
 */
function upgradeInteractiveCardsForTvRemote(root: ParentNode = document): void {
  if (typeof document === 'undefined') return;
  try {
    const candidates = root.querySelectorAll<HTMLElement>(
      'div.cursor-pointer, article.cursor-pointer, li.cursor-pointer, span.cursor-pointer'
    );
    for (let i = 0; i < candidates.length; i++) {
      const el = candidates[i];
      if (
        el.hasAttribute('tabindex') ||
        el.getAttribute('role') === 'button' ||
        el.getAttribute('role') === 'tab'
      ) {
        continue;
      }
      // Verify if React attached an onClick handler or if it has an explicit onclick attribute
      const hasReactOnClick = Object.keys(el).some((k) => {
        if (!k.startsWith('__reactProps$')) return false;
        const props = (el as any)[k];
        return typeof props?.onClick === 'function';
      });
      if (hasReactOnClick || typeof el.onclick === 'function') {
        el.setAttribute('tabindex', '0');
        if (!el.hasAttribute('role')) {
          el.setAttribute('role', 'button');
        }
      }
    }
  } catch {
    // Ignore DOM inspection errors
  }
}

let globalTvListenersInstalled = false;

export function installGlobalSmartTvCompatibility(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined' || globalTvListenersInstalled) {
    return;
  }
  globalTvListenersInstalled = true;

  if (isSmartTvOrSingleWindowBrowser()) {
    document.documentElement.classList.add('tv-browser-detected');
  }

  // 1. Safe window.open wrapper for single-window Smart TV WebViews
  try {
    const nativeWindowOpen = window.open ? window.open.bind(window) : null;
    if (nativeWindowOpen) {
      window.open = function (
        url?: string | URL,
        target?: string,
        features?: string
      ): WindowProxy | null {
        const urlStr = url ? String(url) : '';
        // If empty or about:blank popup (e.g., print preview window), call native window.open
        if (!urlStr || urlStr === 'about:blank') {
          return nativeWindowOpen(url, target, features);
        }
        // On single-window Smart TV browsers, external target="_blank" popups fail silently
        if (isSmartTvOrSingleWindowBrowser() && (!target || target === '_blank')) {
          try {
            window.history.pushState({ mszExternalLeave: true }, document.title, window.location.href);
          } catch {}
          window.location.assign(urlStr);
          return window;
        }
        const opened = nativeWindowOpen(url, target, features);
        if (!opened && urlStr && /^https?:\/\//i.test(urlStr)) {
          try {
            window.history.pushState({ mszExternalLeave: true }, document.title, window.location.href);
          } catch {}
          window.location.assign(urlStr);
          return window;
        }
        return opened;
      };
    }
  } catch {
    // Ignore if window.open is non-configurable
  }

  // 2. Delegated `<a target="_blank">` click interceptor for single-window Smart TV WebViews
  document.addEventListener(
    'click',
    (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      if (!target || typeof target.closest !== 'function') return;
      const anchor = target.closest('a[target="_blank"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

      if (isSmartTvOrSingleWindowBrowser()) {
        e.preventDefault();
        try {
          window.history.pushState({ mszExternalLeave: true }, document.title, window.location.href);
        } catch {}
        window.location.assign(anchor.href);
      }
    },
    true
  );

  // 3. Upgrade clickable cards initially and on DOM mutations
  upgradeInteractiveCardsForTvRemote();
  let upgradeTimer: ReturnType<typeof setTimeout> | null = null;
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(() => {
      if (upgradeTimer) clearTimeout(upgradeTimer);
      upgradeTimer = setTimeout(() => {
        upgradeInteractiveCardsForTvRemote();
      }, 250);
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      window.addEventListener('DOMContentLoaded', () => {
        if (document.body) {
          observer.observe(document.body, { childList: true, subtree: true });
        }
      });
    }
  }

  // 4. TV Remote Control OK / Enter / DPAD_CENTER & 4-Way Arrow Key Spatial Navigation
  document.addEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const key = e.key || '';
      const keyCode = e.keyCode || e.which || 0;

      const isArrowUp = key === 'ArrowUp' || key === 'Up' || keyCode === 38 || keyCode === 19;
      const isArrowDown = key === 'ArrowDown' || key === 'Down' || keyCode === 40 || keyCode === 20;
      const isArrowLeft = key === 'ArrowLeft' || key === 'Left' || keyCode === 37 || keyCode === 21;
      const isArrowRight =
        key === 'ArrowRight' || key === 'Right' || keyCode === 39 || keyCode === 22;

      const isDpadOk =
        key === 'Select' ||
        key === 'OK' ||
        key === 'Execute' ||
        keyCode === 23 || // Android TV DPAD_CENTER
        keyCode === 66;

      const isEnterOrSpace =
        key === 'Enter' ||
        keyCode === 13 ||
        ((key === ' ' || keyCode === 32) &&
          document.activeElement?.getAttribute('role') === 'button') ||
        ((key === ' ' || keyCode === 32) &&
          document.activeElement?.getAttribute('role') === 'tab');

      if (isArrowUp || isArrowDown || isArrowLeft || isArrowRight || isDpadOk || key === 'Tab') {
        document.documentElement.classList.add('tv-nav-active');
      }

      const activeEl = document.activeElement as HTMLElement | null;
      const tagName = activeEl?.tagName?.toLowerCase() || '';
      const isTextEditingInput =
        (tagName === 'input' &&
          !['button', 'checkbox', 'radio', 'submit', 'reset'].includes(
            (activeEl as HTMLInputElement).type
          )) ||
        tagName === 'textarea' ||
        activeEl?.isContentEditable === true;

      // Handle TV Remote OK / DPAD_CENTER or Enter/Space on custom role="button" / role="tab" elements
      if (isDpadOk || isEnterOrSpace) {
        if (!activeEl || activeEl === document.body) return;

        // Native <button>, <a href>, <input>, <select> fire click natively on standard Enter,
        // EXCEPT when Android TV remote sends DPAD_CENTER (keyCode 23 / key 'Select')
        const isNativeEnterTarget =
          tagName === 'button' ||
          (tagName === 'a' && activeEl.hasAttribute('href')) ||
          tagName === 'input' ||
          tagName === 'select' ||
          tagName === 'textarea';

        if (isDpadOk || !isNativeEnterTarget) {
          if (tagName === 'select') return;
          e.preventDefault();
          activeEl.click();
        }
        return;
      }

      // Handle 4-Way D-Pad Spatial Arrow Navigation
      if (isArrowUp || isArrowDown || isArrowLeft || isArrowRight) {
        // Do not hijack arrow keys inside <select> or while actively moving caret inside non-empty text input
        if (tagName === 'select') return;
        if (isTextEditingInput) {
          const inputEl = activeEl as HTMLInputElement | HTMLTextAreaElement;
          const valLen = (inputEl.value || '').length;
          if (valLen > 0 && (isArrowLeft || isArrowRight)) {
            return;
          }
          if (tagName === 'textarea' && valLen > 0 && (isArrowUp || isArrowDown)) {
            return;
          }
        }

        upgradeInteractiveCardsForTvRemote();
        const dir: 'up' | 'down' | 'left' | 'right' = isArrowUp
          ? 'up'
          : isArrowDown
          ? 'down'
          : isArrowLeft
          ? 'left'
          : 'right';

        const nextEl = findNextSpatialFocusable(activeEl, dir);
        if (nextEl) {
          e.preventDefault();
          nextEl.focus({ preventScroll: true });
          safeScrollIntoView(nextEl, { behavior: 'smooth', block: 'nearest', inline: 'nearest' });
        }
      }
    },
    false
  );
}

interface UseSmartTvNavigationOptions {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  defaultHomeTab: string;
  isModalOpen: boolean;
  closeTopModal: () => boolean;
}

/**
 * Syncs SPA tab & modal state with browser history (`pushState` / `popstate`) and
 * ViewSonic / Android TV remote Back keys so pressing Back navigates within MyStudyZone
 * instead of exiting the TV browser.
 */
export function useSmartTvNavigation({
  currentTab,
  setCurrentTab,
  defaultHomeTab,
  isModalOpen,
  closeTopModal,
}: UseSmartTvNavigationOptions): void {
  const isHandlingPopStateRef = useRef(false);
  const tabHistoryStackRef = useRef<string[]>([currentTab]);
  const scrollPositionsRef = useRef<Map<string, number>>(new Map());
  const prevTabRef = useRef<string>(currentTab);
  const latestStateRef = useRef({
    currentTab,
    defaultHomeTab,
    isModalOpen,
    closeTopModal,
    setCurrentTab,
  });

  latestStateRef.current = {
    currentTab,
    defaultHomeTab,
    isModalOpen,
    closeTopModal,
    setCurrentTab,
  };

  useEffect(() => {
    installGlobalSmartTvCompatibility();
  }, []);

  const restoreScrollForTab = (targetTab: string) => {
    const savedY = scrollPositionsRef.current.get(targetTab);
    if (typeof savedY === 'number' && savedY > 0) {
      try {
        requestAnimationFrame(() => {
          window.scrollTo({ top: savedY, behavior: 'auto' });
        });
      } catch {
        window.scrollTo(0, savedY);
      }
      return;
    }
    safeScrollToTop();
  };

  // Push history state whenever currentTab or modal open state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (prevTabRef.current !== currentTab && !isHandlingPopStateRef.current) {
      scrollPositionsRef.current.set(prevTabRef.current, window.scrollY || 0);
    }
    prevTabRef.current = currentTab;

    const stack = tabHistoryStackRef.current;
    if (stack[stack.length - 1] !== currentTab) {
      stack.push(currentTab);
      if (stack.length > 25) stack.shift();
    }

    if (isHandlingPopStateRef.current) {
      isHandlingPopStateRef.current = false;
      return;
    }

    try {
      const currentState = window.history.state;
      if (currentState?.mszTab === currentTab && Boolean(currentState?.mszModal) === isModalOpen) {
        return;
      }
      window.history.pushState(
        {
          mszTab: currentTab,
          mszModal: isModalOpen,
          ts: Date.now(),
        },
        document.title,
        window.location.href
      );
    } catch {
      // Ignore history API restrictions in sandboxed frames
    }
  }, [currentTab, isModalOpen]);

  // Listen to browser popstate (triggered by Android TV remote Back button & browser Back button)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const stopSpeechOnBack = () => {
      try {
        if ('speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      } catch {}
    };

    const handlePopState = (e: PopStateEvent) => {
      const {
        currentTab: activeTab,
        defaultHomeTab: homeTab,
        isModalOpen: modalOpen,
        closeTopModal: closeModal,
        setCurrentTab: navigateTab,
      } = latestStateRef.current;

      // 1. If a modal/drawer is currently open, close it first and stay on the current page
      if (modalOpen && closeModal()) {
        return;
      }

      // 2. If history state specifies a target tab, restore it and its scroll position
      const targetTab = e.state?.mszTab;
      if (typeof targetTab === 'string' && targetTab && targetTab !== activeTab) {
        stopSpeechOnBack();
        isHandlingPopStateRef.current = true;
        const stack = tabHistoryStackRef.current;
        if (stack.length > 1 && stack[stack.length - 2] === targetTab) {
          stack.pop();
        }
        navigateTab(targetTab);
        restoreScrollForTab(targetTab);
        return;
      }

      // 3. Otherwise pop from internal tab history stack or return to home dashboard
      const stack = tabHistoryStackRef.current;
      if (stack.length > 1) {
        stack.pop();
        const prevTab = stack[stack.length - 1] || homeTab;
        if (prevTab !== activeTab) {
          stopSpeechOnBack();
          isHandlingPopStateRef.current = true;
          navigateTab(prevTab);
          restoreScrollForTab(prevTab);
          return;
        }
      }

      if (activeTab !== homeTab && activeTab !== 'dashboard' && activeTab !== 'public-home') {
        stopSpeechOnBack();
        isHandlingPopStateRef.current = true;
        navigateTab(homeTab);
        restoreScrollForTab(homeTab);
      }
    };

    const handleRemoteBackKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) return;
      const key = e.key || '';
      const keyCode = e.keyCode || e.which || 0;

      const isTvBackKey =
        key === 'BrowserBack' ||
        key === 'GoBack' ||
        key === 'XF86Back' ||
        key === 'Back' ||
        keyCode === 4 || // Android KeyEvent.KEYCODE_BACK
        keyCode === 166;

      const isEscapeKey = key === 'Escape' || key === 'Esc' || keyCode === 27;

      if (!isTvBackKey && !isEscapeKey) return;

      const activeEl = document.activeElement as HTMLElement | null;
      const tagName = activeEl?.tagName?.toLowerCase() || '';
      const isInputFocused =
        tagName === 'input' || tagName === 'textarea' || tagName === 'select';

      const {
        currentTab: activeTab,
        defaultHomeTab: homeTab,
        isModalOpen: modalOpen,
        closeTopModal: closeModal,
        setCurrentTab: navigateTab,
      } = latestStateRef.current;

      // Always allow Escape / Back to close an open modal
      if (modalOpen) {
        if (closeModal()) {
          e.preventDefault();
          return;
        }
      }

      // If an input is focused and Escape was pressed, blur the input first
      if (isInputFocused && isEscapeKey) {
        activeEl?.blur();
        return;
      }

      // If TV Back key (or Escape when not inside an input) is pressed on a sub-page, return to previous tab with saved scroll
      if (isTvBackKey || (isEscapeKey && !isInputFocused)) {
        if (activeTab !== homeTab && activeTab !== 'dashboard' && activeTab !== 'public-home') {
          e.preventDefault();
          stopSpeechOnBack();
          const stack = tabHistoryStackRef.current;
          if (stack.length > 1) {
            stack.pop();
            const prevTab = stack[stack.length - 1] || homeTab;
            isHandlingPopStateRef.current = true;
            navigateTab(prevTab);
            restoreScrollForTab(prevTab);
          } else {
            isHandlingPopStateRef.current = true;
            navigateTab(homeTab);
            restoreScrollForTab(homeTab);
          }
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleRemoteBackKeyDown);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleRemoteBackKeyDown);
    };
  }, []);
}
