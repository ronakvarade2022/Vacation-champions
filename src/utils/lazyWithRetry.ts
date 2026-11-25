import React, { lazy } from 'react';

export function lazyWithRetry<T extends React.ComponentType<any>>(
  importer: () => Promise<{ default: T }>
): React.LazyExoticComponent<T> {
  return lazy(async () => {
    try {
      return await importer();
    } catch (firstError) {
      await new Promise((r) => setTimeout(r, 350));
      try {
        return await importer();
      } catch (secondError) {
        if (typeof window !== 'undefined') {
          try {
            const reloadKey = 'msz_chunk_retry_ts';
            const lastRetry = Number(sessionStorage.getItem(reloadKey) || '0');
            if (Date.now() - lastRetry > 15_000) {
              sessionStorage.setItem(reloadKey, String(Date.now()));
              window.location.reload();
            }
          } catch {
            // Ignore sessionStorage restrictions on Smart TV WebViews
          }
        }
        throw secondError || firstError;
      }
    }
  });
}
