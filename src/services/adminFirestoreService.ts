/**
 * Bounded, Read-Only & Cached Firestore Sync Helpers for Admin Dashboard.
 * Preserves existing firestore.rules security checks (requires signed-in Admin)
 * and uses query limits + TTL caching so Admin clicks never trigger unbounded scans.
 */

import {
  collection,
  getDocs,
  query,
  limit,
  orderBy,
  where,
  type QueryConstraint,
} from 'firebase/firestore';
import { db, auth } from './firebase';
import { cachedAdminFetch, ADMIN_CACHE_DEFAULT_TTL_MS } from './adminCacheService';
import type { StudentProfile, PaymentTransaction, EducationBoard } from '../types';

const ADMIN_STUDENTS_CACHE_KEY = 'admin:firestore:students';
const ADMIN_TRANSACTIONS_CACHE_KEY = 'admin:firestore:transactions';

function isSignedInAdminUser(): boolean {
  const email = (auth.currentUser?.email || '').trim().toLowerCase();
  return Boolean(auth.currentUser && email === 'ronakvarade2022@gmail.com');
}

export async function fetchBoundedStudentsForAdmin(options?: {
  boardFilter?: 'all' | EducationBoard;
  pageSize?: number;
  forceRefresh?: boolean;
}): Promise<{ students: StudentProfile[]; fromFirestore: boolean }> {
  const boardFilter = options?.boardFilter || 'all';
  const pageSize = Math.min(Math.max(options?.pageSize ?? 150, 20), 500);
  const cacheKey = `${ADMIN_STUDENTS_CACHE_KEY}:${boardFilter}:${pageSize}`;

  return cachedAdminFetch(
    cacheKey,
    async () => {
      if (!isSignedInAdminUser()) {
        return { students: [], fromFirestore: false };
      }

      try {
        const constraints: QueryConstraint[] = [];
        if (boardFilter !== 'all') {
          constraints.push(where('board', '==', boardFilter));
        }
        constraints.push(orderBy('registeredAt', 'desc'));
        constraints.push(limit(pageSize));

        const snap = await getDocs(query(collection(db, 'students'), ...constraints));
        const rows: StudentProfile[] = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data() as StudentProfile;
          if (data && (data.id || docSnap.id)) {
            rows.push({ ...data, id: data.id || docSnap.id });
          }
        });
        return { students: rows, fromFirestore: true };
      } catch {
        // Safe fallback without composite orderBy if index/field is missing
        try {
          const fallbackConstraints: QueryConstraint[] =
            boardFilter !== 'all'
              ? [where('board', '==', boardFilter), limit(pageSize)]
              : [limit(pageSize)];
          const snap = await getDocs(query(collection(db, 'students'), ...fallbackConstraints));
          const rows: StudentProfile[] = [];
          snap.forEach((docSnap) => {
            const data = docSnap.data() as StudentProfile;
            if (data && (data.id || docSnap.id)) {
              rows.push({ ...data, id: data.id || docSnap.id });
            }
          });
          return { students: rows, fromFirestore: true };
        } catch {
          return { students: [], fromFirestore: false };
        }
      }
    },
    {
      ttlMs: ADMIN_CACHE_DEFAULT_TTL_MS,
      forceRefresh: options?.forceRefresh,
    }
  );
}

export async function fetchBoundedTransactionsForAdmin(options?: {
  pageSize?: number;
  forceRefresh?: boolean;
}): Promise<{ transactions: PaymentTransaction[]; fromFirestore: boolean }> {
  const pageSize = Math.min(Math.max(options?.pageSize ?? 150, 20), 500);
  const cacheKey = `${ADMIN_TRANSACTIONS_CACHE_KEY}:${pageSize}`;

  return cachedAdminFetch(
    cacheKey,
    async () => {
      if (!isSignedInAdminUser()) {
        return { transactions: [], fromFirestore: false };
      }

      try {
        const snap = await getDocs(
          query(collection(db, 'transactions'), orderBy('createdAt', 'desc'), limit(pageSize))
        );
        const rows: PaymentTransaction[] = [];
        snap.forEach((docSnap) => {
          const data = docSnap.data() as PaymentTransaction;
          if (data && (data.id || docSnap.id)) {
            rows.push({ ...data, id: data.id || docSnap.id });
          }
        });
        return { transactions: rows, fromFirestore: true };
      } catch {
        try {
          const snap = await getDocs(query(collection(db, 'transactions'), limit(pageSize)));
          const rows: PaymentTransaction[] = [];
          snap.forEach((docSnap) => {
            const data = docSnap.data() as PaymentTransaction;
            if (data && (data.id || docSnap.id)) {
              rows.push({ ...data, id: data.id || docSnap.id });
            }
          });
          return { transactions: rows, fromFirestore: true };
        } catch {
          return { transactions: [], fromFirestore: false };
        }
      }
    },
    {
      ttlMs: ADMIN_CACHE_DEFAULT_TTL_MS,
      forceRefresh: options?.forceRefresh,
    }
  );
}
