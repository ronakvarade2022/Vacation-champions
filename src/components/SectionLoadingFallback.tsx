import React, { useEffect, useState } from 'react';
import { RefreshCw, WifiOff, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SectionLoadingFallbackProps {
  label?: string;
  compact?: boolean;
  onRetry?: () => void;
  onReturnHome?: () => void;
}

export const SectionLoadingFallback: React.FC<SectionLoadingFallbackProps> = ({
  label = 'Loading section...',
  compact = false,
  onRetry,
  onReturnHome,
}) => {
  const { retryFirebaseConnection } = useApp();
  const [timedOut, setTimedOut] = useState(false);
  const [retrying, setRetrying] = useState(false);

  const isOfflineState =
    typeof navigator !== 'undefined' && navigator.onLine === false;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setTimedOut(true);
    }, 15000);
    return () => window.clearTimeout(timer);
  }, []);

  const handleRetry = async () => {
    if (retrying) return;
    setRetrying(true);
    setTimedOut(false);
    try {
      await retryFirebaseConnection();
      if (onRetry) {
        onRetry();
      }
    } finally {
      setRetrying(false);
    }
  };

  if (timedOut || isOfflineState) {
    return (
      <div
        role="status"
        className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-xs space-y-4 max-w-3xl mx-auto"
      >
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-800 shrink-0">
            {isOfflineState ? (
              <WifiOff className="w-5 h-5" />
            ) : (
              <RefreshCw className="w-5 h-5" />
            )}
          </div>
          <div className="space-y-1">
            <h3 className="font-display font-black text-base sm:text-lg text-slate-900">
              {isOfflineState
                ? 'Connection Unavailable While Loading'
                : 'Taking Longer Than Expected to Load'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {isOfflineState
                ? 'Your internet or cloud connection was temporarily interrupted. Please check your connection and tap Retry to continue loading this section.'
                : 'A slow network delayed loading this view. Your account, tests, and study data remain safe.'}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => void handleRetry()}
            disabled={retrying}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
            <span>{retrying ? 'Reconnecting...' : 'Retry Loading'}</span>
          </button>
          {onReturnHome && (
            <button
              type="button"
              onClick={onReturnHome}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Dashboard</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4"
    >
      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-600">
        <RefreshCw className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
        <span>{label}</span>
      </div>
      <div className="space-y-3 animate-pulse">
        <div className="h-5 w-56 bg-slate-200 rounded-xl" />
        <div className="h-4 w-80 max-w-full bg-slate-100 rounded-lg" />
        {!compact && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="h-20 bg-slate-100 rounded-2xl" />
            <div className="h-20 bg-slate-100 rounded-2xl" />
            <div className="h-20 bg-slate-100 rounded-2xl" />
          </div>
        )}
      </div>
    </div>
  );
};
