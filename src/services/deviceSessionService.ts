import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  type Unsubscribe
} from 'firebase/firestore';
import type {
  DeviceSessionRecord,
  DeviceSessionStatus,
  DeviceType
} from '../types';
import { auth, db } from './firebase';

export const SINGLE_DEVICE_BLOCK_MESSAGE =
  'Your account is currently active on another device. Please log out from your previous device before logging in here.';

export const SESSION_INACTIVITY_TTL_MS = 12 * 60 * 60 * 1000;

const LS_DEVICE_ID = 'vc_device_id';
const LS_SESSION_ID = 'vc_active_session_id';
const LS_HARDWARE_SIG = 'vc_hardware_signature';
const LS_DEVICE_SIG = 'vc_device_signature';
const LS_SESSION_USER_ID = 'vc_session_user_id';

export interface LocalActiveSessionState {
  userId: string;
  activeSessionId: string;
  deviceId: string;
  hardwareSignature: string;
  deviceSignature: string;
}

export interface DetectedDeviceMetadata {
  deviceId: string;
  hardwareSignature: string;
  deviceSignature: string;
  deviceName: string;
  deviceType: DeviceType;
  browser: string;
  os: string;
  userAgentSummary: string;
}

function stableHashHex(input: string): string {
  // Deterministic 64-bit dual FNV-1a hash (16 hex chars, no WebCrypto async dependency)
  let h1 = 0x811c9dc5;
  let h2 = 0x811c9dc5 ^ 0x9e3779b9;
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i);
    h1 ^= code;
    h1 = Math.imul(h1, 0x01000193);
    h2 ^= code + i;
    h2 = Math.imul(h2, 0x01000193);
  }
  const p1 = (h1 >>> 0).toString(16).padStart(8, '0');
  const p2 = (h2 >>> 0).toString(16).padStart(8, '0');
  return `${p1}${p2}`;
}

export function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'ssr_device_01';
  try {
    const existing = window.localStorage.getItem(LS_DEVICE_ID);
    if (existing && existing.trim().length >= 8) {
      return existing.trim();
    }
    const rand =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID().replace(/-/g, '')
        : `${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
    const newId = `dev_${rand.slice(0, 32)}`;
    window.localStorage.setItem(LS_DEVICE_ID, newId);
    return newId;
  } catch {
    return `dev_ephemeral_${Date.now().toString(36)}`;
  }
}

/**
 * Computes hardware/environment signature LIVE from the current device runtime.
 * Never trusted from localStorage: if localStorage is copied to another device,
 * the live hardware signature will differ and immediately trigger a security block.
 */
export function computeLiveHardwareSignature(): string {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return 'ssr_hw_sig_0000';
  }
  const nav = navigator as any;
  const ua = String(navigator.userAgent || '');
  const platform = String(nav.userAgentData?.platform || navigator.platform || '');
  const lang = String(navigator.language || '');
  const tz =
    typeof Intl !== 'undefined'
      ? String(Intl.DateTimeFormat().resolvedOptions().timeZone || '')
      : '';
  const cores = String(navigator.hardwareConcurrency || 0);
  const touch = String(navigator.maxTouchPoints || 0);
  const scr =
    typeof screen !== 'undefined'
      ? `${Math.min(screen.width, screen.height)}x${Math.max(screen.width, screen.height)}@${window.devicePixelRatio || 1}`
      : '0x0';

  const raw = [ua, platform, lang, tz, cores, touch, scr].join('|');
  return `hw_${stableHashHex(raw)}`;
}

export function computeDeviceSignature(
  deviceId: string,
  hardwareSignature: string
): string {
  return `dsig_${stableHashHex(`${deviceId}::${hardwareSignature}::mystudyzone_v1`)}`;
}

export function detectDeviceMetadata(): DetectedDeviceMetadata {
  const deviceId = getOrCreateDeviceId();
  const hardwareSignature = computeLiveHardwareSignature();
  const deviceSignature = computeDeviceSignature(deviceId, hardwareSignature);

  if (typeof navigator === 'undefined') {
    return {
      deviceId,
      hardwareSignature,
      deviceSignature,
      deviceName: 'Desktop Browser',
      deviceType: 'Desktop',
      browser: 'Browser',
      os: 'Unknown OS',
      userAgentSummary: ''
    };
  }

  const ua = navigator.userAgent || '';
  const uaLower = ua.toLowerCase();
  const maxTouch = navigator.maxTouchPoints || 0;

  let browser = 'Browser';
  if (ua.includes('Edg/')) browser = 'Edge';
  else if (ua.includes('OPR/') || ua.includes('Opera')) browser = 'Opera';
  else if (ua.includes('Chrome/') && !ua.includes('Edg/')) browser = 'Chrome';
  else if (ua.includes('Firefox/')) browser = 'Firefox';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Safari';

  let os = 'Unknown OS';
  if (uaLower.includes('android')) os = 'Android';
  else if (/iphone|ipod/.test(uaLower)) os = 'iOS';
  else if (/ipad/.test(uaLower) || (uaLower.includes('macintosh') && maxTouch > 1)) os = 'iPadOS';
  else if (uaLower.includes('windows')) os = 'Windows';
  else if (uaLower.includes('mac os') || uaLower.includes('macintosh')) os = 'macOS';
  else if (uaLower.includes('cros')) os = 'ChromeOS';
  else if (uaLower.includes('linux')) os = 'Linux';

  let deviceType: DeviceType = 'Desktop';
  if (/ipad|tablet|playbook|silk/.test(uaLower) || (os === 'Android' && !uaLower.includes('mobile')) || os === 'iPadOS') {
    deviceType = 'Tablet';
  } else if (/mobi|iphone|ipod|android/.test(uaLower)) {
    deviceType = 'Mobile';
  } else if (os === 'macOS' || os === 'ChromeOS' || (os === 'Windows' && maxTouch > 0)) {
    deviceType = 'Laptop';
  } else {
    deviceType = 'Desktop';
  }

  const deviceName = `${browser} on ${os} (${deviceType})`;

  return {
    deviceId,
    hardwareSignature,
    deviceSignature,
    deviceName,
    deviceType,
    browser,
    os,
    userAgentSummary: ua.slice(0, 180)
  };
}

export function getLocalActiveSessionState(): LocalActiveSessionState | null {
  if (typeof window === 'undefined') return null;
  try {
    const userId = window.localStorage.getItem(LS_SESSION_USER_ID) || '';
    const activeSessionId = window.localStorage.getItem(LS_SESSION_ID) || '';
    const deviceId = window.localStorage.getItem(LS_DEVICE_ID) || '';
    const hardwareSignature = window.localStorage.getItem(LS_HARDWARE_SIG) || '';
    const deviceSignature = window.localStorage.getItem(LS_DEVICE_SIG) || '';
    if (!activeSessionId || !deviceId || !hardwareSignature || !deviceSignature) {
      return null;
    }
    return { userId, activeSessionId, deviceId, hardwareSignature, deviceSignature };
  } catch {
    return null;
  }
}

export function setLocalActiveSessionState(state: LocalActiveSessionState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LS_SESSION_USER_ID, state.userId);
    window.localStorage.setItem(LS_SESSION_ID, state.activeSessionId);
    window.localStorage.setItem(LS_DEVICE_ID, state.deviceId);
    window.localStorage.setItem(LS_HARDWARE_SIG, state.hardwareSignature);
    window.localStorage.setItem(LS_DEVICE_SIG, state.deviceSignature);
  } catch {
    // Ignore storage quota errors
  }
}

export function clearLocalActiveSessionState(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(LS_SESSION_USER_ID);
    window.localStorage.removeItem(LS_SESSION_ID);
    window.localStorage.removeItem(LS_HARDWARE_SIG);
    window.localStorage.removeItem(LS_DEVICE_SIG);
  } catch {
    // Ignore
  }
}

/**
 * Synchronous zero-trust tamper check:
 * Verifies that localStorage tokens were NOT copied from another device/browser.
 */
export function verifyLocalSessionNotCopied(expectedUserId?: string): {
  valid: boolean;
  reason?: string;
} {
  const local = getLocalActiveSessionState();
  if (!local) {
    return { valid: false, reason: 'NO_LOCAL_SESSION' };
  }
  if (expectedUserId && local.userId && local.userId !== expectedUserId) {
    return { valid: false, reason: 'USER_ID_MISMATCH' };
  }
  const liveHw = computeLiveHardwareSignature();
  if (local.hardwareSignature !== liveHw) {
    return { valid: false, reason: 'HARDWARE_SIGNATURE_MISMATCH' };
  }
  const expectedDevSig = computeDeviceSignature(local.deviceId, liveHw);
  if (local.deviceSignature !== expectedDevSig) {
    return { valid: false, reason: 'DEVICE_SIGNATURE_MISMATCH' };
  }
  return { valid: true };
}

export function getLocalSessionHeaders(): Record<string, string> {
  const local = getLocalActiveSessionState();
  const meta = detectDeviceMetadata();
  const headers: Record<string, string> = {
    'x-device-id': meta.deviceId,
    'x-hardware-signature': meta.hardwareSignature,
    'x-device-signature': meta.deviceSignature
  };
  if (local?.activeSessionId) {
    headers['x-session-id'] = local.activeSessionId;
  }
  return headers;
}

async function callSessionApi<T = any>(
  subpath: string,
  options: RequestInit = {},
  idToken?: string
): Promise<{ ok: boolean; status: number; data: T | null }> {
  const envBase = String((import.meta as any).env?.VITE_API_BASE_URL || '')
    .trim()
    .replace(/\/+$/, '');
  const resolvedToken =
    idToken || (await auth.currentUser?.getIdToken().catch(() => undefined));

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...getLocalSessionHeaders(),
    ...((options.headers as Record<string, string>) || {})
  };
  if (resolvedToken) {
    headers.Authorization = `Bearer ${resolvedToken}`;
  }

  const doFetch = async (url: string) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    try {
      return await fetch(url, { ...options, headers, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
  };

  try {
    let res = await doFetch(`${envBase}/api${subpath}`);
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (res.status === 404 || ct.includes('text/html')) {
      const netlifyRes = await doFetch(`${envBase}/.netlify/functions/api${subpath}`);
      const nct = (netlifyRes.headers.get('content-type') || '').toLowerCase();
      if (netlifyRes.status !== 404 && !nct.includes('text/html')) {
        res = netlifyRes;
      }
    }
    const data = (await res.json().catch(() => null)) as T | null;
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

function createClientSessionId(): string {
  const rand =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID().replace(/-/g, '')
      : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 14)}`;
  return `sess_${rand}`;
}

export async function acquireSingleDeviceSession(params: {
  userId: string;
  firebaseUid?: string;
  email: string;
  studentName: string;
  accountRole: 'student' | 'teacher';
  idToken?: string;
}): Promise<{
  allowed: boolean;
  blockedByActiveDevice?: boolean;
  error?: string;
  session?: DeviceSessionRecord;
}> {
  const meta = detectDeviceMetadata();
  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const expiresAtMs = nowMs + SESSION_INACTIVITY_TTL_MS;

  // 1. Check authoritative Firestore /device_sessions/{userId} first (enforced by firestore.rules)
  try {
    const ref = doc(db, 'device_sessions', params.userId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const existing = snap.data() as DeviceSessionRecord;
      const isExpired =
        existing.status !== 'ACTIVE' || Number(existing.expiresAtMs || 0) <= nowMs;
      if (!isExpired) {
        const isSameDevice =
          existing.deviceId === meta.deviceId &&
          existing.hardwareSignature === meta.hardwareSignature &&
          existing.deviceSignature === meta.deviceSignature;
        if (!isSameDevice) {
          clearLocalActiveSessionState();
          return {
            allowed: false,
            blockedByActiveDevice: true,
            error: SINGLE_DEVICE_BLOCK_MESSAGE
          };
        }
      }
    }
  } catch {
    // Proceed to backend check
  }

  // 2. Acquire via backend API (authoritative across devices even if Firestore Admin is enabled)
  const apiRes = await callSessionApi<{
    success: boolean;
    allowed: boolean;
    code?: string;
    error?: string;
    session?: DeviceSessionRecord;
  }>(
    '/auth/session/acquire',
    {
      method: 'POST',
      body: JSON.stringify({
        userId: params.userId,
        firebaseUid: params.firebaseUid || auth.currentUser?.uid,
        email: params.email,
        studentName: params.studentName,
        accountRole: params.accountRole,
        deviceId: meta.deviceId,
        hardwareSignature: meta.hardwareSignature,
        deviceSignature: meta.deviceSignature,
        deviceName: meta.deviceName,
        deviceType: meta.deviceType,
        browser: meta.browser,
        os: meta.os,
        userAgentSummary: meta.userAgentSummary
      })
    },
    params.idToken
  );

  if (apiRes.status === 403 || apiRes.status === 409 || apiRes.data?.allowed === false) {
    clearLocalActiveSessionState();
    return {
      allowed: false,
      blockedByActiveDevice: true,
      error: apiRes.data?.error || SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }

  const sessionRecord: DeviceSessionRecord = apiRes.data?.session || {
    userId: params.userId,
    firebaseUid: params.firebaseUid || auth.currentUser?.uid,
    email: params.email.trim().toLowerCase(),
    studentName: params.studentName || 'Student',
    accountRole: params.accountRole,
    activeSessionId: createClientSessionId(),
    deviceId: meta.deviceId,
    hardwareSignature: meta.hardwareSignature,
    deviceSignature: meta.deviceSignature,
    deviceName: meta.deviceName,
    deviceType: meta.deviceType,
    browser: meta.browser,
    os: meta.os,
    userAgentSummary: meta.userAgentSummary,
    status: 'ACTIVE',
    loginAt: nowIso,
    lastActivityAt: nowIso,
    expiresAt: new Date(expiresAtMs).toISOString(),
    expiresAtMs
  };

  // 3. Persist directly to Firestore as the authenticated Firebase user (enforced by firestore.rules)
  try {
    const cleanPayload = JSON.parse(JSON.stringify(sessionRecord));
    await setDoc(doc(db, 'device_sessions', params.userId), cleanPayload);
  } catch (fsErr: any) {
    // If Firestore security rules reject write because another device holds an active lock -> fail closed!
    if (String(fsErr?.code || fsErr?.message || '').includes('permission')) {
      clearLocalActiveSessionState();
      return {
        allowed: false,
        blockedByActiveDevice: true,
        error: SINGLE_DEVICE_BLOCK_MESSAGE
      };
    }
  }

  setLocalActiveSessionState({
    userId: params.userId,
    activeSessionId: sessionRecord.activeSessionId,
    deviceId: meta.deviceId,
    hardwareSignature: meta.hardwareSignature,
    deviceSignature: meta.deviceSignature
  });

  return {
    allowed: true,
    session: sessionRecord
  };
}

export async function validateActiveDeviceSession(params: {
  userId: string;
  firebaseUid?: string;
  email: string;
  studentName: string;
  accountRole: 'student' | 'teacher';
  idToken?: string;
  allowLegacyBootstrap?: boolean;
}): Promise<{
  valid: boolean;
  blockedByAnotherDevice?: boolean;
  error?: string;
  session?: DeviceSessionRecord;
}> {
  const local = getLocalActiveSessionState();
  const meta = detectDeviceMetadata();

  // Catch copied localStorage tokens immediately before any dashboard data is exposed
  if (local) {
    const localCheck = verifyLocalSessionNotCopied(params.userId);
    if (!localCheck.valid) {
      clearLocalActiveSessionState();
      return {
        valid: false,
        blockedByAnotherDevice: true,
        error: SINGLE_DEVICE_BLOCK_MESSAGE
      };
    }
  }

  const nowMs = Date.now();

  // Check Firestore /device_sessions/{userId}
  try {
    const snap = await getDoc(doc(db, 'device_sessions', params.userId));
    if (snap.exists()) {
      const remote = snap.data() as DeviceSessionRecord;
      if (remote.status === 'TERMINATED') {
        clearLocalActiveSessionState();
        return {
          valid: false,
          blockedByAnotherDevice: false,
          error:
            remote.terminatedBy === 'ADMIN'
              ? 'Your active session was terminated by an administrator. Please log in again.'
              : remote.terminatedBy === 'USER_RECOVERY'
              ? 'Your account session was recovered on another device.'
              : 'Your session was logged out. Please sign in again.'
        };
      }
      if (remote.status === 'EXPIRED' || Number(remote.expiresAtMs || 0) <= nowMs) {
        clearLocalActiveSessionState();
        return {
          valid: false,
          blockedByAnotherDevice: false,
          error: 'Your session expired due to inactivity. Please log in again.'
        };
      }

      const sameHardware =
        remote.deviceId === meta.deviceId &&
        remote.hardwareSignature === meta.hardwareSignature &&
        remote.deviceSignature === meta.deviceSignature;
      const sameSession =
        !local?.activeSessionId || local.activeSessionId === remote.activeSessionId;

      if (!sameHardware || !sameSession) {
        clearLocalActiveSessionState();
        return {
          valid: false,
          blockedByAnotherDevice: true,
          error: SINGLE_DEVICE_BLOCK_MESSAGE
        };
      }

      // Same physical device & browser safely resuming! Sync local storage state.
      setLocalActiveSessionState({
        userId: params.userId,
        activeSessionId: remote.activeSessionId,
        deviceId: meta.deviceId,
        hardwareSignature: meta.hardwareSignature,
        deviceSignature: meta.deviceSignature
      });
      return { valid: true, session: remote };
    }
  } catch {
    // Continue to backend verification
  }

  // Verify against backend session store
  const apiRes = await callSessionApi<{
    success: boolean;
    valid: boolean;
    reason?: string;
    error?: string;
    session?: DeviceSessionRecord;
  }>(
    '/auth/session/validate',
    {
      method: 'POST',
      body: JSON.stringify({
        userId: params.userId,
        activeSessionId: local?.activeSessionId,
        deviceId: meta.deviceId,
        hardwareSignature: meta.hardwareSignature,
        deviceSignature: meta.deviceSignature,
        allowBootstrapIfMissing: Boolean(params.allowLegacyBootstrap),
        firebaseUid: params.firebaseUid || auth.currentUser?.uid,
        email: params.email,
        studentName: params.studentName,
        accountRole: params.accountRole,
        deviceName: meta.deviceName,
        deviceType: meta.deviceType,
        browser: meta.browser,
        os: meta.os,
        userAgentSummary: meta.userAgentSummary
      })
    },
    params.idToken
  );

  if (apiRes.status === 401 || apiRes.status === 403 || apiRes.data?.valid === false) {
    clearLocalActiveSessionState();
    return {
      valid: false,
      blockedByAnotherDevice: apiRes.data?.reason === 'HARDWARE_OR_SESSION_MISMATCH' || apiRes.data?.reason === 'NO_ACTIVE_SESSION',
      error: apiRes.data?.error || SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }

  if (apiRes.data?.valid && apiRes.data.session) {
    setLocalActiveSessionState({
      userId: params.userId,
      activeSessionId: apiRes.data.session.activeSessionId,
      deviceId: meta.deviceId,
      hardwareSignature: meta.hardwareSignature,
      deviceSignature: meta.deviceSignature
    });
    return { valid: true, session: apiRes.data.session };
  }

  // Fallback for brand-new pre-migration account when Firestore had no record & server unreachable
  if (params.allowLegacyBootstrap && local) {
    return { valid: true };
  }

  if (params.allowLegacyBootstrap) {
    const acq = await acquireSingleDeviceSession({
      userId: params.userId,
      firebaseUid: params.firebaseUid,
      email: params.email,
      studentName: params.studentName,
      accountRole: params.accountRole,
      idToken: params.idToken
    });
    return {
      valid: acq.allowed,
      blockedByAnotherDevice: acq.blockedByActiveDevice,
      error: acq.error,
      session: acq.session
    };
  }

  return {
    valid: false,
    blockedByAnotherDevice: true,
    error: SINGLE_DEVICE_BLOCK_MESSAGE
  };
}

export async function sendDeviceSessionHeartbeat(
  userId: string,
  idToken?: string
): Promise<{ valid: boolean; error?: string; session?: DeviceSessionRecord }> {
  const local = getLocalActiveSessionState();
  const localCheck = verifyLocalSessionNotCopied(userId);
  if (!local || !localCheck.valid) {
    clearLocalActiveSessionState();
    return { valid: false, error: SINGLE_DEVICE_BLOCK_MESSAGE };
  }

  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();
  const expiresAtMs = nowMs + SESSION_INACTIVITY_TTL_MS;

  try {
    const snap = await getDoc(doc(db, 'device_sessions', userId));
    if (snap.exists()) {
      const remote = snap.data() as DeviceSessionRecord;
      if (
        remote.status !== 'ACTIVE' ||
        Number(remote.expiresAtMs || 0) <= nowMs ||
        remote.activeSessionId !== local.activeSessionId ||
        remote.hardwareSignature !== local.hardwareSignature ||
        remote.deviceId !== local.deviceId
      ) {
        clearLocalActiveSessionState();
        return {
          valid: false,
          error:
            remote.terminatedBy === 'ADMIN'
              ? 'Your session was terminated by an administrator.'
              : SINGLE_DEVICE_BLOCK_MESSAGE
        };
      }

      const updated: DeviceSessionRecord = {
        ...remote,
        lastActivityAt: nowIso,
        expiresAt: new Date(expiresAtMs).toISOString(),
        expiresAtMs
      };
      await setDoc(
        doc(db, 'device_sessions', userId),
        JSON.parse(JSON.stringify(updated)),
        { merge: true }
      ).catch(() => {});
    }
  } catch {
    // Ignore transient offline read error
  }

  const res = await callSessionApi<{
    success: boolean;
    valid: boolean;
    error?: string;
    session?: DeviceSessionRecord;
  }>(
    '/auth/session/heartbeat',
    {
      method: 'POST',
      body: JSON.stringify({
        userId,
        activeSessionId: local.activeSessionId,
        deviceId: local.deviceId,
        hardwareSignature: local.hardwareSignature,
        deviceSignature: local.deviceSignature
      })
    },
    idToken
  );

  if (res.status === 401 || res.status === 403 || res.data?.valid === false) {
    clearLocalActiveSessionState();
    return { valid: false, error: res.data?.error || SINGLE_DEVICE_BLOCK_MESSAGE };
  }

  return { valid: true, session: res.data?.session };
}

export async function releaseSingleDeviceSession(
  userId?: string,
  idToken?: string,
  reason: string = 'User logged out'
): Promise<void> {
  const local = getLocalActiveSessionState();
  const targetUserId = userId || local?.userId;

  if (targetUserId && local) {
    const nowMs = Date.now();
    const nowIso = new Date(nowMs).toISOString();

    try {
      const ref = doc(db, 'device_sessions', targetUserId);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const remote = snap.data() as DeviceSessionRecord;
        if (
          remote.activeSessionId === local.activeSessionId &&
          remote.hardwareSignature === local.hardwareSignature &&
          remote.deviceId === local.deviceId
        ) {
          await setDoc(
            ref,
            JSON.parse(
              JSON.stringify({
                ...remote,
                status: 'TERMINATED',
                terminatedBy: 'USER_LOGOUT',
                terminatedAt: nowIso,
                terminationReason: reason,
                expiresAt: nowIso,
                expiresAtMs: nowMs
              })
            )
          ).catch(() => {});
        }
      }
    } catch {
      // Proceed to backend release
    }

    await callSessionApi(
      '/auth/session/release',
      {
        method: 'POST',
        body: JSON.stringify({
          userId: targetUserId,
          activeSessionId: local.activeSessionId,
          deviceId: local.deviceId,
          hardwareSignature: local.hardwareSignature,
          reason
        })
      },
      idToken
    ).catch(() => {});
  }

  clearLocalActiveSessionState();
}

export async function recoverSingleDeviceSession(params: {
  userId: string;
  firebaseUid?: string;
  email: string;
  mobile: string;
  studentName: string;
  accountRole: 'student' | 'teacher';
  idToken?: string;
}): Promise<{
  success: boolean;
  error?: string;
  session?: DeviceSessionRecord;
}> {
  const meta = detectDeviceMetadata();

  const res = await callSessionApi<{
    success: boolean;
    error?: string;
    session?: DeviceSessionRecord;
  }>(
    '/auth/session/recover',
    {
      method: 'POST',
      body: JSON.stringify({
        userId: params.userId,
        firebaseUid: params.firebaseUid || auth.currentUser?.uid,
        email: params.email,
        mobile: params.mobile,
        studentName: params.studentName,
        accountRole: params.accountRole,
        deviceId: meta.deviceId,
        hardwareSignature: meta.hardwareSignature,
        deviceSignature: meta.deviceSignature,
        deviceName: meta.deviceName,
        deviceType: meta.deviceType,
        browser: meta.browser,
        os: meta.os,
        userAgentSummary: meta.userAgentSummary
      })
    },
    params.idToken
  );

  if (!res.ok || !res.data?.success || !res.data?.session) {
    return {
      success: false,
      error:
        res.data?.error ||
        'Device recovery could not be completed. Please verify your registered email, password, and 10-digit mobile number.'
    };
  }

  setLocalActiveSessionState({
    userId: params.userId,
    activeSessionId: res.data.session.activeSessionId,
    deviceId: meta.deviceId,
    hardwareSignature: meta.hardwareSignature,
    deviceSignature: meta.deviceSignature
  });

  return {
    success: true,
    session: res.data.session
  };
}

export function subscribeToUserDeviceSession(
  userId: string,
  onRemoteUpdate: (record: DeviceSessionRecord) => void
): Unsubscribe {
  const ref = doc(db, 'device_sessions', userId);
  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        onRemoteUpdate(snap.data() as DeviceSessionRecord);
      }
    },
    () => {
      // Ignore transient listener errors
    }
  );
}

export async function fetchAllDeviceSessionsForAdmin(
  idToken?: string
): Promise<DeviceSessionRecord[]> {
  const merged = new Map<string, DeviceSessionRecord>();
  const nowMs = Date.now();

  try {
    const snap = await getDocs(collection(db, 'device_sessions'));
    snap.forEach((d) => {
      const data = d.data() as DeviceSessionRecord;
      if (data?.userId) {
        merged.set(d.id, data);
      }
    });
  } catch {
    // Fallback to backend admin endpoint
  }

  const res = await callSessionApi<{
    success: boolean;
    sessions?: DeviceSessionRecord[];
  }>('/admin/sessions', { method: 'GET' }, idToken);

  if (res.ok && Array.isArray(res.data?.sessions)) {
    for (const s of res.data.sessions) {
      const existing = merged.get(s.userId);
      if (!existing) {
        merged.set(s.userId, s);
      } else {
        const exTs = Date.parse(existing.lastActivityAt || '') || 0;
        const srvTs = Date.parse(s.lastActivityAt || '') || 0;
        if (srvTs >= exTs) {
          merged.set(s.userId, s);
        }
      }
    }
  }

  return Array.from(merged.values())
    .map((rec) => {
      const liveStatus: DeviceSessionStatus =
        rec.status === 'ACTIVE' && Number(rec.expiresAtMs || 0) <= nowMs
          ? 'EXPIRED'
          : rec.status;
      return { ...rec, status: liveStatus };
    })
    .sort(
      (a, b) =>
        (Date.parse(b.lastActivityAt || b.loginAt || '') || 0) -
        (Date.parse(a.lastActivityAt || a.loginAt || '') || 0)
    );
}

export async function adminTerminateUserSession(
  userId: string,
  idToken?: string,
  reason: string = 'Terminated by administrator'
): Promise<{ success: boolean; session?: DeviceSessionRecord; error?: string }> {
  const res = await callSessionApi<{
    success: boolean;
    session?: DeviceSessionRecord;
    error?: string;
  }>(
    '/admin/sessions/terminate',
    {
      method: 'POST',
      body: JSON.stringify({ userId, reason })
    },
    idToken
  );

  const nowMs = Date.now();
  const nowIso = new Date(nowMs).toISOString();
  let updatedSession = res.data?.session;

  // Also ensure direct Firestore termination when Admin is signed into Firebase Client SDK
  try {
    const ref = doc(db, 'device_sessions', userId);
    const snap = await getDoc(ref);
    const existing = snap.exists() ? (snap.data() as DeviceSessionRecord) : null;
    const terminatedRecord: DeviceSessionRecord = updatedSession || {
      ...(existing || {
        userId,
        email: '',
        studentName: 'Student',
        accountRole: 'student',
        deviceId: 'admin_terminated',
        hardwareSignature: 'admin_terminated',
        deviceSignature: 'admin_terminated',
        deviceName: 'No Active Device',
        deviceType: 'Desktop',
        browser: 'N/A',
        os: 'N/A',
        userAgentSummary: '',
        loginAt: nowIso,
        lastActivityAt: nowIso
      }),
      activeSessionId: `terminated_${nowMs.toString(36)}_${Math.random().toString(36).slice(2, 8)}`,
      status: 'TERMINATED',
      terminatedBy: 'ADMIN',
      terminatedAt: nowIso,
      terminationReason: reason,
      expiresAt: nowIso,
      expiresAtMs: nowMs
    };
    await setDoc(ref, JSON.parse(JSON.stringify(terminatedRecord)));
    updatedSession = terminatedRecord;
  } catch (fsErr: any) {
    if (!res.ok) {
      return {
        success: false,
        error: res.data?.error || fsErr?.message || 'Failed to terminate session.'
      };
    }
  }

  return { success: true, session: updatedSession };
}
