import { useCallback, useEffect, useState, type RefObject } from 'react';

export type ExamScreenMode = 'auto' | 'landscape' | 'portrait';

const SCREEN_MODE_STORAGE_KEY = 'msz_exam_screen_mode_v1';
export const EXAM_RETURN_TO_DASHBOARD_EVENT = 'msz:exam-return-to-dashboard';

function getFullscreenElement(): Element | null {
  if (typeof document === 'undefined') return null;
  const doc = document as Document & {
    webkitFullscreenElement?: Element | null;
    mozFullScreenElement?: Element | null;
    msFullscreenElement?: Element | null;
  };
  return (
    document.fullscreenElement ||
    doc.webkitFullscreenElement ||
    doc.mozFullScreenElement ||
    doc.msFullscreenElement ||
    null
  );
}

export async function enterElementFullscreen(target?: HTMLElement | null): Promise<boolean> {
  if (typeof document === 'undefined') return false;
  if (getFullscreenElement()) return true;

  const el = (target || document.documentElement) as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    mozRequestFullScreen?: () => Promise<void> | void;
    msRequestFullscreen?: () => Promise<void> | void;
  };

  try {
    if (typeof el.requestFullscreen === 'function') {
      await el.requestFullscreen();
      return true;
    }
    if (typeof el.webkitRequestFullscreen === 'function') {
      await Promise.resolve(el.webkitRequestFullscreen());
      return true;
    }
    if (typeof el.mozRequestFullScreen === 'function') {
      await Promise.resolve(el.mozRequestFullScreen());
      return true;
    }
    if (typeof el.msRequestFullscreen === 'function') {
      await Promise.resolve(el.msRequestFullscreen());
      return true;
    }
  } catch {
    // Browser gesture restriction or iframe policy blocked automatic fullscreen.
    // The UI keeps a prominent "START FULL SCREEN" button ready for user tap.
    return false;
  }
  return false;
}

export async function exitElementFullscreen(): Promise<void> {
  if (typeof document === 'undefined') return;
  if (!getFullscreenElement()) return;

  const doc = document as Document & {
    webkitExitFullscreen?: () => Promise<void> | void;
    mozCancelFullScreen?: () => Promise<void> | void;
    msExitFullscreen?: () => Promise<void> | void;
  };

  try {
    if (typeof document.exitFullscreen === 'function') {
      await document.exitFullscreen();
    } else if (typeof doc.webkitExitFullscreen === 'function') {
      await Promise.resolve(doc.webkitExitFullscreen());
    } else if (typeof doc.mozCancelFullScreen === 'function') {
      await Promise.resolve(doc.mozCancelFullScreen());
    } else if (typeof doc.msExitFullscreen === 'function') {
      await Promise.resolve(doc.msExitFullscreen());
    }
  } catch {
    // Ignore errors when exiting fullscreen
  }
}

export async function requestReturnToDashboard(): Promise<void> {
  await exitElementFullscreen();
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EXAM_RETURN_TO_DASHBOARD_EVENT));
  }
}

export function useExamFullscreen(
  containerRef: RefObject<HTMLElement | null>,
  autoEnterOnMount = true
) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(() => Boolean(getFullscreenElement()));
  const [screenMode, setScreenModeState] = useState<ExamScreenMode>(() => {
    try {
      const saved = localStorage.getItem(SCREEN_MODE_STORAGE_KEY);
      if (saved === 'auto' || saved === 'landscape' || saved === 'portrait') {
        return saved;
      }
    } catch {}
    return 'auto';
  });

  const setScreenMode = useCallback((mode: ExamScreenMode) => {
    setScreenModeState(mode);
    try {
      localStorage.setItem(SCREEN_MODE_STORAGE_KEY, mode);
    } catch {}
  }, []);

  const enterFullscreen = useCallback(async () => {
    const ok = await enterElementFullscreen(containerRef.current || document.documentElement);
    setIsFullscreen(Boolean(getFullscreenElement()) || ok);
    return ok;
  }, [containerRef]);

  const exitFullscreen = useCallback(async () => {
    await exitElementFullscreen();
    setIsFullscreen(Boolean(getFullscreenElement()));
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(getFullscreenElement()));
    };

    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    document.addEventListener('mozfullscreenchange', handleFsChange);
    document.addEventListener('MSFullscreenChange', handleFsChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
      document.removeEventListener('mozfullscreenchange', handleFsChange);
      document.removeEventListener('MSFullscreenChange', handleFsChange);
    };
  }, []);

  // Attempt automatic fullscreen when entering the exam shell (graceful if gesture-blocked)
  useEffect(() => {
    if (!autoEnterOnMount) return;
    let active = true;
    const timer = window.setTimeout(() => {
      if (!active || getFullscreenElement()) return;
      void enterElementFullscreen(containerRef.current || document.documentElement).then((ok) => {
        if (active) {
          setIsFullscreen(Boolean(getFullscreenElement()) || ok);
        }
      });
    }, 60);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [autoEnterOnMount, containerRef]);

  return {
    isFullscreen,
    screenMode,
    setScreenMode,
    enterFullscreen,
    exitFullscreen,
  };
}
