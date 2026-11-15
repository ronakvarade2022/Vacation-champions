import { createRoot } from 'react-dom/client';
import { setLogLevel } from 'firebase/firestore';
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
}

import App from './App.tsx';

createRoot(document.getElementById('root')!).render(<App />);

