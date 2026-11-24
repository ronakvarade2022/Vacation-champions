import crypto from 'crypto';
import type {
  DeviceSessionRecord,
  DeviceSessionStatus,
  DeviceType
} from '../types';
import {
  serverGetDoc,
  serverListCollection,
  serverQueryEqualsLimit1,
  serverSetDoc
} from '../../firebase/admin.ts';

export const SESSION_LOGGED_IN_ELSEWHERE_MESSAGE =
  'Your account has been logged in on another device. Please log in again.';

export const SINGLE_DEVICE_BLOCK_MESSAGE = SESSION_LOGGED_IN_ELSEWHERE_MESSAGE;

// Sliding inactivity window: 12 hours (automatically expires stale sessions after crash/abandoned browser)
export const SESSION_INACTIVITY_TTL_MS = 12 * 60 * 60 * 1000;
const RECOVERY_WINDOW_MS = 24 * 60 * 60 * 1000;
const MAX_RECOVERY_COUNT_24H = 3;

export const serverDeviceSessions = new Map<string, DeviceSessionRecord>();

export function clearInMemoryDeviceSessionsForTests(): void {
  serverDeviceSessions.clear();
}

export function generateActiveSessionId(): string {
  return `sess_${crypto.randomBytes(20).toString('hex')}`;
}

export interface DeviceClientMetadataInput {
  userId: string;
  firebaseUid?: string;
  email: string;
  studentName: string;
  accountRole: 'student' | 'teacher';
  deviceId: string;
  hardwareSignature: string;
  deviceSignature: string;
  deviceName?: string;
  deviceType?: DeviceType;
  browser?: string;
  os?: string;
  userAgentSummary?: string;
  preferredSessionId?: string;
}

export interface AcquireSessionResult {
  allowed: boolean;
  resumed?: boolean;
  code?: 'DEVICE_SESSION_ACTIVE_ELSEWHERE' | 'INVALID_INPUT';
  error?: string;
  session?: DeviceSessionRecord;
  activeDevice?: {
    deviceName: string;
    deviceType: DeviceType;
    browser: string;
    os: string;
    loginAt: string;
    lastActivityAt: string;
  };
}

export interface ValidateSessionResult {
  valid: boolean;
  bootstrapped?: boolean;
  reason?:
    | 'NO_ACTIVE_SESSION'
    | 'TERMINATED'
    | 'EXPIRED'
    | 'HARDWARE_OR_SESSION_MISMATCH';
  terminatedBy?: DeviceSessionRecord['terminatedBy'];
  error?: string;
  session?: DeviceSessionRecord;
}

function normalizeDeviceType(raw?: string): DeviceType {
  if (raw === 'Mobile' || raw === 'Tablet' || raw === 'Laptop' || raw === 'Desktop') {
    return raw;
  }
  return 'Desktop';
}

function normalizeEmail(raw?: string): string {
  return String(raw || '').trim().toLowerCase();
}

function normalizeMobileDigits(raw?: string): string {
  return String(raw || '').replace(/\D/g, '').slice(-10);
}

export function isSessionExpired(
  record: DeviceSessionRecord | null | undefined,
  nowMs: number = Date.now()
): boolean {
  if (!record) return true;
  if (record.status !== 'ACTIVE') return true;
  const expiresAtMs = Number(record.expiresAtMs || 0);
  return !Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs;
}

function toPublicDeviceSummary(record: DeviceSessionRecord) {
  return {
    deviceName: record.deviceName || 'Registered Device',
    deviceType: normalizeDeviceType(record.deviceType),
    browser: record.browser || 'Browser',
    os: record.os || 'OS',
    loginAt: record.loginAt,
    lastActivityAt: record.lastActivityAt
  };
}

export async function loadDeviceSessionFromStore(
  userId: string
): Promise<DeviceSessionRecord | null> {
  const cleanId = String(userId || '').trim();
  if (!cleanId) return null;

  const cached = serverDeviceSessions.get(cleanId);
  if (cached) {
    return cached;
  }

  try {
    const docData = await serverGetDoc('device_sessions', cleanId);
    if (docData && docData.userId && docData.activeSessionId) {
      const record = docData as DeviceSessionRecord;
      serverDeviceSessions.set(cleanId, record);
      return record;
    }
  } catch {
    // Graceful fallback when Firestore Admin credentials are absent locally
  }

  return null;
}

async function persistDeviceSessionToStore(
  record: DeviceSessionRecord
): Promise<void> {
  serverDeviceSessions.set(record.userId, record);
  try {
    await serverSetDoc('device_sessions', record.userId, record as Record<string, any>, {
      merge: false
    });
  } catch {
    // Client SDK writes directly when Admin credentials are not configured locally
  }
}

function buildFreshActiveSession(
  input: DeviceClientMetadataInput,
  nowMs: number = Date.now(),
  prior?: DeviceSessionRecord | null,
  sessionIdOverride?: string
): DeviceSessionRecord {
  const nowIso = new Date(nowMs).toISOString();
  const expiresAtMs = nowMs + SESSION_INACTIVITY_TTL_MS;
  const expiresAt = new Date(expiresAtMs).toISOString();

  return {
    userId: String(input.userId).trim(),
    firebaseUid: input.firebaseUid ? String(input.firebaseUid).trim() : prior?.firebaseUid,
    email: normalizeEmail(input.email || prior?.email),
    studentName: String(input.studentName || prior?.studentName || 'Student').slice(0, 100),
    accountRole: input.accountRole === 'teacher' ? 'teacher' : 'student',
    activeSessionId: sessionIdOverride || generateActiveSessionId(),
    deviceId: String(input.deviceId).trim().slice(0, 128),
    hardwareSignature: String(input.hardwareSignature).trim().slice(0, 128),
    deviceSignature: String(input.deviceSignature).trim().slice(0, 128),
    deviceName: String(input.deviceName || 'Registered Browser').slice(0, 120),
    deviceType: normalizeDeviceType(input.deviceType),
    browser: String(input.browser || 'Browser').slice(0, 60),
    os: String(input.os || 'Unknown OS').slice(0, 60),
    userAgentSummary: String(input.userAgentSummary || '').slice(0, 200),
    status: 'ACTIVE',
    loginAt: nowIso,
    lastActivityAt: nowIso,
    expiresAt,
    expiresAtMs,
    recoveryCount24h: prior?.recoveryCount24h || 0,
    lastRecoveryAt: prior?.lastRecoveryAt
  };
}

/**
 * Acquires or resumes the single active session for an account.
 * Strictly blocks if another device already holds a non-expired ACTIVE session.
 */
export async function acquireDeviceSessionServer(
  input: DeviceClientMetadataInput,
  nowMs: number = Date.now()
): Promise<AcquireSessionResult> {
  const cleanUserId = String(input.userId || '').trim();
  const cleanDeviceId = String(input.deviceId || '').trim();
  const cleanHwSig = String(input.hardwareSignature || '').trim();
  const cleanDevSig = String(input.deviceSignature || '').trim();

  if (
    !cleanUserId ||
    cleanDeviceId.length < 6 ||
    cleanHwSig.length < 8 ||
    cleanDevSig.length < 8
  ) {
    return {
      allowed: false,
      code: 'INVALID_INPUT',
      error: 'Valid userId and device signatures are required.'
    };
  }

  const existing = await loadDeviceSessionFromStore(cleanUserId);

  if (existing && !isSessionExpired(existing, nowMs)) {
    const isSamePhysicalDevice =
      existing.deviceId === cleanDeviceId &&
      existing.hardwareSignature === cleanHwSig &&
      existing.deviceSignature === cleanDevSig;

    if (!isSamePhysicalDevice) {
      // Requirement 2: When the same student logs in on another device or browser,
      // automatically invalidate the previous session and issue a fresh active session.
      const fresh = buildFreshActiveSession(input, nowMs, existing);
      fresh.previousSessionId = existing.activeSessionId;
      fresh.previousDeviceId = existing.deviceId;
      await persistDeviceSessionToStore(fresh);
      return {
        allowed: true,
        resumed: false,
        session: fresh
      };
    }

    // Same physical device & browser safely resuming or re-logging in
    const nowIso = new Date(nowMs).toISOString();
    const expiresAtMs = nowMs + SESSION_INACTIVITY_TTL_MS;
    const resumedRecord: DeviceSessionRecord = {
      ...existing,
      firebaseUid: input.firebaseUid || existing.firebaseUid,
      email: normalizeEmail(input.email || existing.email),
      studentName: String(input.studentName || existing.studentName || 'Student').slice(0, 100),
      accountRole: input.accountRole === 'teacher' ? 'teacher' : existing.accountRole,
      activeSessionId: input.preferredSessionId || existing.activeSessionId,
      deviceName: String(input.deviceName || existing.deviceName || 'Registered Browser').slice(0, 120),
      deviceType: normalizeDeviceType(input.deviceType || existing.deviceType),
      browser: String(input.browser || existing.browser || 'Browser').slice(0, 60),
      os: String(input.os || existing.os || 'Unknown OS').slice(0, 60),
      userAgentSummary: String(input.userAgentSummary || existing.userAgentSummary || '').slice(0, 200),
      status: 'ACTIVE',
      lastActivityAt: nowIso,
      expiresAt: new Date(expiresAtMs).toISOString(),
      expiresAtMs
    };

    await persistDeviceSessionToStore(resumedRecord);
    return {
      allowed: true,
      resumed: true,
      session: resumedRecord
    };
  }

  // No active session, or previous session expired / terminated: issue fresh session
  const fresh = buildFreshActiveSession(input, nowMs, existing);
  await persistDeviceSessionToStore(fresh);

  return {
    allowed: true,
    resumed: false,
    session: fresh
  };
}

/**
 * Validates whether the caller's session ID + hardware signature match the authoritative active session.
 */
export async function validateDeviceSessionServer(
  input: {
    userId: string;
    activeSessionId?: string;
    deviceId: string;
    hardwareSignature: string;
    deviceSignature: string;
    allowBootstrapIfMissing?: boolean;
    firebaseUid?: string;
    email?: string;
    studentName?: string;
    accountRole?: 'student' | 'teacher';
    deviceName?: string;
    deviceType?: DeviceType;
    browser?: string;
    os?: string;
    userAgentSummary?: string;
  },
  nowMs: number = Date.now()
): Promise<ValidateSessionResult> {
  const cleanUserId = String(input.userId || '').trim();
  if (!cleanUserId) {
    return {
      valid: false,
      reason: 'NO_ACTIVE_SESSION',
      error: SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }

  const existing = await loadDeviceSessionFromStore(cleanUserId);

  if (!existing) {
    if (
      input.allowBootstrapIfMissing &&
      input.deviceId?.length >= 6 &&
      input.hardwareSignature?.length >= 8 &&
      input.deviceSignature?.length >= 8
    ) {
      const preferredSid =
        input.activeSessionId &&
        input.activeSessionId.length >= 8 &&
        input.activeSessionId.length <= 128
          ? input.activeSessionId
          : undefined;
      const fresh = buildFreshActiveSession(
        {
          userId: cleanUserId,
          firebaseUid: input.firebaseUid || cleanUserId,
          email: input.email || '',
          studentName: input.studentName || 'Student',
          accountRole: input.accountRole || 'student',
          deviceId: input.deviceId,
          hardwareSignature: input.hardwareSignature,
          deviceSignature: input.deviceSignature,
          deviceName: input.deviceName,
          deviceType: input.deviceType,
          browser: input.browser,
          os: input.os,
          userAgentSummary: input.userAgentSummary
        },
        nowMs,
        null,
        preferredSid
      );
      await persistDeviceSessionToStore(fresh);
      return {
        valid: true,
        bootstrapped: true,
        session: fresh
      };
    }

    return {
      valid: false,
      reason: 'NO_ACTIVE_SESSION',
      error: SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }

  if (existing.status === 'TERMINATED') {
    const isAdmin = existing.terminatedBy === 'ADMIN';
    const isRecovery = existing.terminatedBy === 'USER_RECOVERY';
    const isNewDevice = existing.terminatedBy === 'NEW_DEVICE_LOGIN';
    return {
      valid: false,
      reason: 'TERMINATED',
      terminatedBy: existing.terminatedBy,
      error: isAdmin
        ? 'Your session was terminated by the MyStudyZone Administrator. Please log in again.'
        : (isRecovery || isNewDevice)
        ? SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
        : 'Your account session was logged out. Please sign in again.'
    };
  }

  if (existing.status === 'EXPIRED' || Number(existing.expiresAtMs || 0) <= nowMs) {
    const expiredRecord: DeviceSessionRecord = {
      ...existing,
      status: 'EXPIRED',
      terminatedBy: existing.terminatedBy || 'EXPIRED',
      terminatedAt: existing.terminatedAt || new Date(nowMs).toISOString(),
      terminationReason: existing.terminationReason || 'Session expired due to inactivity'
    };
    await persistDeviceSessionToStore(expiredRecord);
    return {
      valid: false,
      reason: 'EXPIRED',
      error: 'Your session has expired due to inactivity. Please log in again.'
    };
  }

  // Strict zero-trust comparison: activeSessionId + deviceId + hardwareSignature + deviceSignature
  const sameHardwareAndBrowser =
    existing.deviceId === input.deviceId &&
    existing.hardwareSignature === input.hardwareSignature &&
    existing.deviceSignature === input.deviceSignature;

  const sameSessionId = Boolean(
    input.activeSessionId && existing.activeSessionId === input.activeSessionId
  );

  // Allow safe browser reopen on the exact same physical device & browser if caller didn't send an old conflicting session
  if (!sameHardwareAndBrowser || (!sameSessionId && input.activeSessionId)) {
    return {
      valid: false,
      reason: 'HARDWARE_OR_SESSION_MISMATCH',
      error: SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }

  // Refresh sliding inactivity expiration if > 30 seconds since last update
  const lastActivityMs = Date.parse(existing.lastActivityAt || '') || 0;
  if (nowMs - lastActivityMs >= 30_000) {
    const refreshed: DeviceSessionRecord = {
      ...existing,
      lastActivityAt: new Date(nowMs).toISOString(),
      expiresAt: new Date(nowMs + SESSION_INACTIVITY_TTL_MS).toISOString(),
      expiresAtMs: nowMs + SESSION_INACTIVITY_TTL_MS
    };
    await persistDeviceSessionToStore(refreshed);
    return {
      valid: true,
      session: refreshed
    };
  }

  return {
    valid: true,
    session: existing
  };
}

/**
 * Heartbeat updates lastActivityAt & extends expiresAtMs ONLY for the active device & session.
 * Supports authenticated recovery after server restarts when the caller presents a verified Firebase Auth ID token.
 */
export async function heartbeatDeviceSessionServer(
  input: {
    userId: string;
    activeSessionId: string;
    deviceId: string;
    hardwareSignature: string;
    deviceSignature: string;
    allowBootstrapIfMissing?: boolean;
    firebaseUid?: string;
    email?: string;
    studentName?: string;
    accountRole?: 'student' | 'teacher';
    deviceName?: string;
    deviceType?: DeviceType;
    browser?: string;
    os?: string;
    userAgentSummary?: string;
  },
  nowMs: number = Date.now()
): Promise<ValidateSessionResult> {
  const check = await validateDeviceSessionServer(input, nowMs);
  if (!check.valid || !check.session) {
    return check;
  }

  const updated: DeviceSessionRecord = {
    ...check.session,
    lastActivityAt: new Date(nowMs).toISOString(),
    expiresAt: new Date(nowMs + SESSION_INACTIVITY_TTL_MS).toISOString(),
    expiresAtMs: nowMs + SESSION_INACTIVITY_TTL_MS
  };
  await persistDeviceSessionToStore(updated);
  return {
    valid: true,
    bootstrapped: Boolean(check.bootstrapped),
    session: updated
  };
}

/**
 * Releases an active session immediately on logout so another device can log in.
 */
export async function releaseDeviceSessionServer(
  input: {
    userId: string;
    activeSessionId?: string;
    deviceId?: string;
    hardwareSignature?: string;
    reason?: string;
  },
  nowMs: number = Date.now()
): Promise<{ released: boolean; error?: string }> {
  const cleanUserId = String(input.userId || '').trim();
  if (!cleanUserId) return { released: false, error: 'userId is required.' };

  const existing = await loadDeviceSessionFromStore(cleanUserId);
  if (!existing) {
    return { released: true };
  }

  // Prevent Device B from blindly releasing Device A's active session unless same device/session
  if (existing.status === 'ACTIVE' && !isSessionExpired(existing, nowMs)) {
    const matchesSession =
      !input.activeSessionId || existing.activeSessionId === input.activeSessionId;
    const matchesHardware =
      !input.hardwareSignature || existing.hardwareSignature === input.hardwareSignature;
    if (!matchesSession || !matchesHardware) {
      return {
        released: false,
        error: SINGLE_DEVICE_BLOCK_MESSAGE
      };
    }
  }

  const nowIso = new Date(nowMs).toISOString();
  const terminated: DeviceSessionRecord = {
    ...existing,
    status: 'TERMINATED',
    terminatedBy: 'USER_LOGOUT',
    terminatedAt: nowIso,
    terminationReason: input.reason || 'Logged out by user',
    expiresAt: nowIso,
    expiresAtMs: nowMs
  };
  await persistDeviceSessionToStore(terminated);
  return { released: true };
}

/**
 * Lost / Damaged Device Recovery:
 * Verifies user identity (verified Firebase token UID + registered email/mobile match),
 * rate-limits abuse, terminates the prior device session, and activates the new device.
 */
export async function recoverDeviceSessionServer(
  input: DeviceClientMetadataInput & { mobile?: string },
  nowMs: number = Date.now()
): Promise<{
  success: boolean;
  statusCode: number;
  error?: string;
  session?: DeviceSessionRecord;
}> {
  const cleanUserId = String(input.userId || '').trim();
  const cleanEmail = normalizeEmail(input.email);
  const providedMobile = normalizeMobileDigits(input.mobile);

  if (!cleanUserId || !cleanEmail) {
    return {
      success: false,
      statusCode: 400,
      error: 'Registered email and account ID are required for device recovery.'
    };
  }

  if (providedMobile.length !== 10) {
    return {
      success: false,
      statusCode: 400,
      error: 'Please enter your registered 10-digit mobile number to verify device recovery.'
    };
  }

  // Verify against stored student profile if available
  let storedStudent: Record<string, any> | null = null;
  try {
    storedStudent = await serverGetDoc('students', cleanUserId);
    if (!storedStudent && cleanEmail) {
      const matched = await serverQueryEqualsLimit1('students', 'email', cleanEmail);
      if (matched) storedStudent = matched.data;
    }
  } catch {
    storedStudent = null;
  }

  if (storedStudent) {
    const storedEmail = normalizeEmail(storedStudent.email);
    const storedMobile = normalizeMobileDigits(storedStudent.mobile);
    if (storedEmail && storedEmail !== cleanEmail) {
      return {
        success: false,
        statusCode: 403,
        error: 'Email address does not match the registered student account.'
      };
    }
    if (storedMobile && storedMobile.length === 10 && storedMobile !== providedMobile) {
      return {
        success: false,
        statusCode: 403,
        error: 'Entered mobile number does not match the registered mobile number for this account.'
      };
    }
  }

  const existing = await loadDeviceSessionFromStore(cleanUserId);
  if (existing && existing.email && normalizeEmail(existing.email) !== cleanEmail) {
    return {
      success: false,
      statusCode: 403,
      error: 'Email does not match the active device session owner.'
    };
  }

  // Enforce 24-hour rolling recovery rate limit to deter credential sharing
  let nextCount = 1;
  if (existing?.lastRecoveryAt) {
    const lastRecMs = Date.parse(existing.lastRecoveryAt) || 0;
    if (nowMs - lastRecMs < RECOVERY_WINDOW_MS) {
      const currentCount = Number(existing.recoveryCount24h || 0);
      if (currentCount >= MAX_RECOVERY_COUNT_24H) {
        return {
          success: false,
          statusCode: 429,
          error:
            'Device recovery limit reached (max 3 recoveries per 24 hours). Please contact MyStudyZone support or wait 24 hours.'
        };
      }
      nextCount = currentCount + 1;
    }
  }

  const nowIso = new Date(nowMs).toISOString();
  const recovered = buildFreshActiveSession(input, nowMs, existing);
  recovered.recoveryCount24h = nextCount;
  recovered.lastRecoveryAt = nowIso;
  recovered.terminationReason = undefined;
  recovered.terminatedAt = undefined;
  recovered.terminatedBy = undefined;

  await persistDeviceSessionToStore(recovered);

  return {
    success: true,
    statusCode: 200,
    session: recovered
  };
}

/**
 * Admin Action: List all device sessions (merging Firestore and runtime cache) with live expiry evaluation.
 */
export async function listDeviceSessionsAdminServer(
  nowMs: number = Date.now()
): Promise<DeviceSessionRecord[]> {
  const merged = new Map<string, DeviceSessionRecord>();

  try {
    const docs = await serverListCollection('device_sessions', 500);
    for (const d of docs) {
      if (d.data && d.data.userId) {
        merged.set(d.id, d.data as DeviceSessionRecord);
      }
    }
  } catch {
    // Use runtime map if Firestore list is unavailable locally
  }

  for (const [uid, rec] of serverDeviceSessions.entries()) {
    const existing = merged.get(uid);
    if (!existing) {
      merged.set(uid, rec);
    } else {
      const existingAct = Date.parse(existing.lastActivityAt || '') || 0;
      const cacheAct = Date.parse(rec.lastActivityAt || '') || 0;
      if (cacheAct >= existingAct) {
        merged.set(uid, rec);
      }
    }
  }

  const list = Array.from(merged.values()).map((rec) => {
    const computedStatus: DeviceSessionStatus =
      rec.status === 'ACTIVE' && Number(rec.expiresAtMs || 0) <= nowMs
        ? 'EXPIRED'
        : rec.status;
    return {
      ...rec,
      status: computedStatus
    };
  });

  list.sort(
    (a, b) =>
      (Date.parse(b.lastActivityAt || b.loginAt || '') || 0) -
      (Date.parse(a.lastActivityAt || a.loginAt || '') || 0)
  );

  return list;
}

/**
 * Admin Action: Immediately terminate a user's active session so they are forced out on Device A
 * and unlocked to sign in on a new device.
 */
export async function terminateDeviceSessionAdminServer(
  userId: string,
  reason: string = 'Terminated by administrator',
  nowMs: number = Date.now()
): Promise<{ success: boolean; session: DeviceSessionRecord }> {
  const cleanUserId = String(userId || '').trim();
  if (!cleanUserId) {
    throw new Error('userId is required to terminate a session.');
  }

  const existing = await loadDeviceSessionFromStore(cleanUserId);
  const nowIso = new Date(nowMs).toISOString();

  const terminated: DeviceSessionRecord = existing
    ? {
        ...existing,
        activeSessionId: `terminated_${crypto.randomBytes(10).toString('hex')}`,
        status: 'TERMINATED',
        terminatedBy: 'ADMIN',
        terminatedAt: nowIso,
        terminationReason: reason,
        expiresAt: nowIso,
        expiresAtMs: nowMs
      }
    : {
        userId: cleanUserId,
        email: '',
        studentName: 'Student',
        accountRole: 'student',
        activeSessionId: `terminated_${crypto.randomBytes(10).toString('hex')}`,
        deviceId: 'admin_terminated',
        hardwareSignature: 'admin_terminated',
        deviceSignature: 'admin_terminated',
        deviceName: 'No Active Device',
        deviceType: 'Desktop',
        browser: 'N/A',
        os: 'N/A',
        userAgentSummary: '',
        status: 'TERMINATED',
        loginAt: nowIso,
        lastActivityAt: nowIso,
        expiresAt: nowIso,
        expiresAtMs: nowMs,
        terminatedBy: 'ADMIN',
        terminatedAt: nowIso,
        terminationReason: reason
      };

  await persistDeviceSessionToStore(terminated);
  return { success: true, session: terminated };
}
