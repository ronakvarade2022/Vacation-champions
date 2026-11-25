import React, { lazy } from 'react';

/**
 * Safely sanitizes error messages for diagnostic logging without exposing
 * any student email, phone number, UID, or token.
 */
export function sanitizeDiagnosticErrorMessage(err: unknown): string {
  const raw =
    err instanceof Error
      ? `${err.name || 'Error'}: ${err.message || 'Unknown error'}`
      : typeof err === 'string'
      ? err
      : 'Unexpected view loading error';
  return raw
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, '[redacted-email]')
    .replace(/\b\d{10,15}\b/g, '[redacted-number]')
    .replace(/eyJ[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}\.[a-zA-Z0-9_-]{10,}/g, '[redacted-token]')
    .slice(0, 260);
}

/**
 * Resilient React.lazy wrapper that:
 * 1. Automatically retries transient network / chunk-load failures (3 attempts with backoff).
 * 2. Never permanently caches a rejected promise — if an ErrorBoundary resets (`Try Again`)
 *    or the user navigates back to the homepage, the next render attempts a fresh import.
 * 3. Safely guards `sessionStorage` access on restricted Smart TV WebViews.
 */
export function lazyWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  let resolvedModule: { default: T } | null = null;
  let inFlightPromise: Promise<{ default: T }> | null = null;

  const loadWithRetries = async (): Promise<{ default: T }> => {
    const delays = [250, 600];
    let lastError: unknown = null;

    for (let attempt = 0; attempt <= delays.length; attempt++) {
      try {
        const mod = await importer();
        resolvedModule = mod;
        return mod;
      } catch (err) {
        lastError = err;
        if (attempt < delays.length) {
          await new Promise((r) => setTimeout(r, delays[attempt]));
        }
      }
    }

    inFlightPromise = null;

    const errMsg = sanitizeDiagnosticErrorMessage(lastError);
    console.warn('[MyStudyZone LazyChunk Notice]:', errMsg);

    const isChunkLoadFailure =
      /Failed to fetch dynamically imported module|Importing a module script failed|Loading chunk .* failed|Unable to preload CSS|NetworkError/i.test(
        errMsg
      );

    if (isChunkLoadFailure && typeof window !== 'undefined') {
      try {
        const reloadKey = 'msz_chunk_retry_ts';
        const lastRetry = Number(window.sessionStorage?.getItem(reloadKey) || '0');
        if (Date.now() - lastRetry > 30_000) {
          window.sessionStorage?.setItem(reloadKey, String(Date.now()));
          window.location.reload();
        }
      } catch {
        // Ignore sessionStorage restrictions on Smart TV WebViews
      }
    }

    throw lastError instanceof Error ? lastError : new Error(errMsg);
  };

  // Create a custom lazy component whose internal `_payload` resets on rejection so `Try Again` works
  const LazyComponent = lazy(() => {
    if (resolvedModule) {
      return Promise.resolve(resolvedModule);
    }
    if (!inFlightPromise) {
      inFlightPromise = loadWithRetries();
    }
    return inFlightPromise;
  });

  // Wrap in a forward-compatible component that resets React.lazy's rejected payload state when retried
  const ResilientLazyWrapper: React.FC<any> = (props) => {
    const payload = (LazyComponent as any)._payload;
    if (payload && payload._status === 2) {
      // Status 2 in React.lazy means Rejected; reset to Uninitialized (-1) so React re-calls the factory
      payload._status = -1;
      payload._result = () => {
        if (resolvedModule) return Promise.resolve(resolvedModule);
        if (!inFlightPromise) inFlightPromise = loadWithRetries();
        return inFlightPromise;
      };
    }
    return React.createElement(LazyComponent, props);
  };

  return ResilientLazyWrapper as unknown as React.LazyExoticComponent<T>;
}

