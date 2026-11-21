import { createRoot } from 'react-dom/client';
import { setLogLevel } from 'firebase/firestore';
import { registerSW } from 'virtual:pwa-register';
import './index.css';

try {
  setLogLevel('silent');
} catch {
  // Ignore if unsupported
}

if (typeof window !== 'undefined') {
  const origConsoleError = console.error.bind(console);
  console.error = (...args: unknown[]) => {
    const firstArg = typeof args[0] === 'string' ? args[0] : '';
    if (
      firstArg.includes('@firebase/firestore') &&
      (firstArg.includes('Could not reach Cloud Firestore backend') ||
        firstArg.includes('operate in offline mode') ||
        firstArg.includes('code=unavailable'))
    ) {
      return;
    }
    origConsoleError(...args);
  };

  // Register MyStudyZone PWA Service Worker with automatic background update checks
  try {
    registerSW({
      immediate: true,
      onRegisteredSW(_swUrl, registration) {
        if (!registration) return;
        const triggerUpdateCheck = () => {
          try {
            void registration.update();
          } catch {
            // Ignore transient update check failures
          }
        };
        window.setInterval(triggerUpdateCheck, 30 * 60 * 1000);
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') {
            triggerUpdateCheck();
          }
        });
      },
      onRegisterError(error) {
        console.debug('[MyStudyZone PWA SW Notice]:', error);
      },
    });
  } catch {
    // Ignore if browser does not support service workers
  }
}

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);
