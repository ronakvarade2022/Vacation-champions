import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import {
  initializeApp,
  getApps,
  getApp,
  cert,
  applicationDefault,
  type App as AdminApp,
  type ServiceAccount
} from 'firebase-admin/app';
import { getFirestore as getAdminFirestoreSdk, type Firestore as AdminFirestore } from 'firebase-admin/firestore';
import { getAuth as getAdminAuthSdk, type Auth as AdminAuth, type DecodedIdToken } from 'firebase-admin/auth';
import {
  initializeApp as initializeClientApp,
  getApps as getClientApps,
  getApp as getClientApp
} from 'firebase/app';
import {
  getFirestore as getClientFirestore,
  setLogLevel as setClientFirestoreLogLevel,
  doc as clientDoc,
  getDoc as clientGetDoc,
  setDoc as clientSetDoc,
  updateDoc as clientUpdateDoc,
  collection as clientCollection,
  query as clientQuery,
  where as clientWhere,
  limit as clientLimit,
  getDocs as clientGetDocs,
  type Firestore as ClientFirestore
} from 'firebase/firestore';

dotenv.config();

try {
  setClientFirestoreLogLevel('silent');
} catch {
  // Ignore if unsupported
}

const ADMIN_APP_NAME = 'mystudyzone-admin';
const AUTHORIZED_ADMIN_EMAIL = 'ronakvarade2022@gmail.com';

function loadFirebaseConfig(): {
  projectId: string;
  firestoreDatabaseId: string;
  [key: string]: unknown;
} {
  const candidates: (string | URL)[] = [
    path.resolve(process.cwd(), 'firebase-applet-config.json'),
    new URL('./firebase-applet-config.json', import.meta.url),
    new URL('../firebase-applet-config.json', import.meta.url)
  ];
  for (const candidate of candidates) {
    try {
      const raw = fs.readFileSync(candidate, 'utf8');
      if (raw) return JSON.parse(raw);
    } catch {
      // try next candidate
    }
  }
  throw new Error('Unable to locate or read firebase-applet-config.json');
}

const firebaseConfig = loadFirebaseConfig();

export type FirebaseAdminCredentialSource =
  | 'service_account_json'
  | 'env_vars'
  | 'google_application_credentials'
  | 'gcp_runtime_adc'
  | 'none';

export interface FirebaseAdminStatus {
  configured: boolean;
  source: FirebaseAdminCredentialSource;
  projectId: string;
  databaseId: string;
  authReady: boolean;
  firestoreReady: boolean;
  error?: string;
}

function sanitizeEnv(val: string | undefined): string {
  if (!val) return '';
  return val.trim().replace(/^["']+|["']+$/g, '').trim();
}

function isPlaceholder(val: string): boolean {
  if (!val) return true;
  const upper = val.toUpperCase();
  return (
    upper.includes('YOUR_') ||
    upper.includes('MY_') ||
    upper.includes('REPLACE_') ||
    upper.includes('EXAMPLE_')
  );
}

function parseServiceAccountJson(raw: string): ServiceAccount | null {
  const cleaned = sanitizeEnv(raw);
  if (!cleaned || isPlaceholder(cleaned)) return null;

  const candidates = [cleaned];
  // Support base64-encoded service account JSON (common in Netlify/Cloud env panels)
  if (!cleaned.startsWith('{')) {
    try {
      candidates.push(Buffer.from(cleaned, 'base64').toString('utf8'));
    } catch {
      // Ignore invalid base64
    }
  }

  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate) as Record<string, unknown>;
      const clientEmail = String(parsed.client_email || parsed.clientEmail || '').trim();
      const privateKeyRaw = String(parsed.private_key || parsed.privateKey || '').trim();
      const projectId = String(
        parsed.project_id || parsed.projectId || firebaseConfig.projectId || ''
      ).trim();

      if (
        clientEmail &&
        privateKeyRaw &&
        !isPlaceholder(clientEmail) &&
        !isPlaceholder(privateKeyRaw)
      ) {
        return {
          projectId,
          clientEmail,
          privateKey: privateKeyRaw.replace(/\\n/g, '\n')
        };
      }
    } catch {
      // Try next candidate
    }
  }
  return null;
}

interface AdminRuntimeState {
  app: AdminApp | null;
  db: AdminFirestore | null;
  auth: AdminAuth | null;
  source: FirebaseAdminCredentialSource;
  configured: boolean;
  hasServiceAccountCredentials: boolean;
  initError?: string;
}

let cachedState: AdminRuntimeState | null = null;
let cachedFallbackClientDb: ClientFirestore | null = null;

function getFallbackClientDb(): ClientFirestore {
  if (cachedFallbackClientDb) return cachedFallbackClientDb;
  const clientApp =
    getClientApps().length === 0 ? initializeClientApp(firebaseConfig) : getClientApp();
  cachedFallbackClientDb = getClientFirestore(clientApp, firebaseConfig.firestoreDatabaseId);
  return cachedFallbackClientDb;
}

function initAdminRuntime(): AdminRuntimeState {
  if (cachedState) return cachedState;

  const projectId =
    sanitizeEnv(process.env.FIREBASE_PROJECT_ID) || firebaseConfig.projectId;
  const databaseId = firebaseConfig.firestoreDatabaseId;

  let serviceAccount: ServiceAccount | null = null;
  let source: FirebaseAdminCredentialSource = 'none';

  // 1. Check FIREBASE_SERVICE_ACCOUNT_JSON (raw JSON or base64 JSON)
  const rawJsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (rawJsonEnv) {
    serviceAccount = parseServiceAccountJson(rawJsonEnv);
    if (serviceAccount) {
      source = 'service_account_json';
    }
  }

  // 2. Check individual FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY env vars
  if (!serviceAccount) {
    const clientEmail = sanitizeEnv(process.env.FIREBASE_CLIENT_EMAIL);
    const privateKeyRaw = sanitizeEnv(process.env.FIREBASE_PRIVATE_KEY);
    if (
      clientEmail &&
      privateKeyRaw &&
      !isPlaceholder(clientEmail) &&
      !isPlaceholder(privateKeyRaw)
    ) {
      serviceAccount = {
        projectId,
        clientEmail,
        privateKey: privateKeyRaw.replace(/\\n/g, '\n')
      };
      source = 'env_vars';
    }
  }

  // 3. Check GOOGLE_APPLICATION_CREDENTIALS file path
  const gacPath = sanitizeEnv(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const hasGacFile = Boolean(
    gacPath && !isPlaceholder(gacPath) && fs.existsSync(path.resolve(gacPath))
  );

  // 4. Only treat explicit credentials as Admin Firestore ready; use projectId-scoped app for public JWT verification
  const hasExplicitCreds = Boolean(serviceAccount || hasGacFile);

  try {
    let adminApp: AdminApp | null = null;

    const existing = getApps().find((a) => a.name === ADMIN_APP_NAME);
    if (existing) {
      adminApp = existing;
      source = serviceAccount
        ? source
        : hasGacFile
        ? 'google_application_credentials'
        : 'none';
    } else if (serviceAccount) {
      adminApp = initializeApp(
        {
          credential: cert(serviceAccount),
          projectId: serviceAccount.projectId || projectId
        },
        ADMIN_APP_NAME
      );
    } else if (hasGacFile) {
      source = 'google_application_credentials';
      adminApp = initializeApp(
        {
          credential: applicationDefault(),
          projectId
        },
        ADMIN_APP_NAME
      );
    } else {
      // Initialize project-scoped Admin Auth verifier (verifies Firebase Auth RS256 ID tokens cleanly)
      adminApp = initializeApp(
        {
          projectId
        },
        ADMIN_APP_NAME
      );
    }

    const db = hasExplicitCreds
      ? getAdminFirestoreSdk(adminApp, databaseId)
      : null;
    if (db) {
      try {
        db.settings({ ignoreUndefinedProperties: true });
      } catch {
        // settings() may only be called once per Firestore instance
      }
    }
    const auth = getAdminAuthSdk(adminApp);

    cachedState = {
      app: adminApp,
      db,
      auth,
      source,
      configured: hasExplicitCreds,
      hasServiceAccountCredentials: hasExplicitCreds
    };
    if (hasExplicitCreds) {
      console.log(
        `[Firebase Admin SDK] Initialized (${source}) for project=${projectId}, database=${databaseId}`
      );
    } else {
      console.log(
        `[Firebase Admin SDK] Running without service account credentials (JWT verifier active for ${projectId}; set FIREBASE_SERVICE_ACCOUNT_JSON for full Admin Firestore access).`
      );
    }
    return cachedState;
  } catch (err: any) {
    const msg = err?.message || String(err);
    console.warn('[Firebase Admin SDK] Initialization failed:', msg);
    cachedState = {
      app: null,
      db: null,
      auth: null,
      source: 'none',
      configured: false,
      hasServiceAccountCredentials: false,
      initError: msg
    };
    return cachedState;
  }
}

export function getFirebaseAdminStatus(): FirebaseAdminStatus {
  const state = initAdminRuntime();
  return {
    configured: state.configured,
    source: state.source,
    projectId: firebaseConfig.projectId,
    databaseId: firebaseConfig.firestoreDatabaseId,
    authReady: Boolean(state.auth),
    firestoreReady: Boolean(state.db),
    ...(state.initError ? { error: state.initError } : {})
  };
}

export function isFirebaseAdminConfigured(): boolean {
  return initAdminRuntime().configured;
}

export function getAdminApp(): AdminApp | null {
  return initAdminRuntime().app;
}

export function getAdminFirestore(): AdminFirestore | null {
  return initAdminRuntime().db;
}

export function getAdminAuth(): AdminAuth | null {
  return initAdminRuntime().auth;
}

function sanitizeDocPayload(data: Record<string, any>): Record<string, any> {
  return JSON.parse(JSON.stringify(data));
}

/**
 * Reads a document via Firebase Admin SDK (`adminDb`) when configured,
 * falling back to the unprivileged client SDK only if Admin credentials are not yet provisioned.
 */
export async function serverGetDoc(
  collectionName: string,
  docId: string
): Promise<Record<string, any> | null> {
  const cleanId = String(docId || '').trim();
  if (!cleanId) return null;

  const adminDb = getAdminFirestore();
  if (adminDb) {
    const snap = await adminDb.collection(collectionName).doc(cleanId).get();
    return snap.exists ? (snap.data() as Record<string, any>) : null;
  }

  const clientDb = getFallbackClientDb();
  const snap = await clientGetDoc(clientDoc(clientDb, collectionName, cleanId));
  return snap.exists() ? (snap.data() as Record<string, any>) : null;
}

/**
 * Writes/merges a document via Firebase Admin SDK (`adminDb`) when configured,
 * bypassing client security rules for verified server/webhook operations.
 */
export async function serverSetDoc(
  collectionName: string,
  docId: string,
  data: Record<string, any>,
  options: { merge?: boolean } = { merge: true }
): Promise<{ usedAdminSdk: boolean }> {
  const cleanId = String(docId || '').trim();
  if (!cleanId) {
    throw new Error(`Invalid docId for ${collectionName}`);
  }
  const cleanPayload = sanitizeDocPayload(data);
  const adminDb = getAdminFirestore();

  if (adminDb) {
    await adminDb
      .collection(collectionName)
      .doc(cleanId)
      .set(cleanPayload, { merge: options.merge !== false });
    return { usedAdminSdk: true };
  }

  const clientDb = getFallbackClientDb();
  await clientSetDoc(clientDoc(clientDb, collectionName, cleanId), cleanPayload, {
    merge: options.merge !== false
  });
  return { usedAdminSdk: false };
}

/**
 * Updates specific fields on an existing document via Firebase Admin SDK (`adminDb`) when configured.
 */
export async function serverUpdateDoc(
  collectionName: string,
  docId: string,
  data: Record<string, any>
): Promise<{ usedAdminSdk: boolean }> {
  const cleanId = String(docId || '').trim();
  if (!cleanId) {
    throw new Error(`Invalid docId for ${collectionName}`);
  }
  const cleanPayload = sanitizeDocPayload(data);
  const adminDb = getAdminFirestore();

  if (adminDb) {
    await adminDb.collection(collectionName).doc(cleanId).update(cleanPayload);
    return { usedAdminSdk: true };
  }

  const clientDb = getFallbackClientDb();
  await clientUpdateDoc(clientDoc(clientDb, collectionName, cleanId), cleanPayload);
  return { usedAdminSdk: false };
}

/**
 * Queries a collection with an equality filter (`limit 1`) via Admin SDK when configured.
 */
export async function serverQueryEqualsLimit1(
  collectionName: string,
  field: string,
  value: string | number | boolean
): Promise<{ id: string; data: Record<string, any> } | null> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    const snap = await adminDb
      .collection(collectionName)
      .where(field, '==', value)
      .limit(1)
      .get();
    if (snap.empty) return null;
    const d = snap.docs[0];
    return { id: d.id, data: d.data() as Record<string, any> };
  }

  const clientDb = getFallbackClientDb();
  const q = clientQuery(
    clientCollection(clientDb, collectionName),
    clientWhere(field, '==', value),
    clientLimit(1)
  );
  const snap = await clientGetDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, data: d.data() as Record<string, any> };
}

/**
 * Lists documents from a collection via Admin SDK when configured (or fallback client SDK).
 */
export async function serverListCollection(
  collectionName: string,
  maxLimit: number = 500
): Promise<{ id: string; data: Record<string, any> }[]> {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    const snap = await adminDb.collection(collectionName).limit(maxLimit).get();
    return snap.docs.map((d) => ({
      id: d.id,
      data: d.data() as Record<string, any>
    }));
  }

  const clientDb = getFallbackClientDb();
  const q = clientQuery(
    clientCollection(clientDb, collectionName),
    clientLimit(maxLimit)
  );
  const snap = await clientGetDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    data: d.data() as Record<string, any>
  }));
}

export interface BearerAuthResult {
  valid: boolean;
  statusCode: number;
  uid?: string;
  email?: string;
  emailVerified?: boolean;
  decoded?: DecodedIdToken;
  error?: string;
}

/**
 * Verifies a Firebase Auth Bearer ID token via Firebase Admin Auth.
 * Fails closed (401/503) if the token is missing, invalid, revoked, or Admin Auth is unconfigured.
 */
export async function verifyBearerIdToken(
  authHeader?: string | string[]
): Promise<BearerAuthResult> {
  const headerStr = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!headerStr || !headerStr.startsWith('Bearer ')) {
    return {
      valid: false,
      statusCode: 401,
      error: 'Authorization Bearer token required.'
    };
  }

  const token = headerStr.slice('Bearer '.length).trim();
  if (!token || token.length < 20) {
    return {
      valid: false,
      statusCode: 401,
      error: 'Invalid Authorization Bearer token format.'
    };
  }

  const state = initAdminRuntime();
  const adminAuth = state.auth;
  if (!adminAuth) {
    return {
      valid: false,
      statusCode: 503,
      error:
        'Firebase Admin SDK credentials are not configured on the server to verify authentication tokens.'
    };
  }

  try {
    // Only query Identity Toolkit revocation list when explicit service account credentials exist
    const decoded = await adminAuth.verifyIdToken(
      token,
      state.hasServiceAccountCredentials
    );
    return {
      valid: true,
      statusCode: 200,
      uid: decoded.uid,
      email: decoded.email?.toLowerCase(),
      emailVerified: Boolean(decoded.email_verified),
      decoded
    };
  } catch (err: any) {
    return {
      valid: false,
      statusCode: 401,
      error: err?.message || 'Invalid or expired Firebase ID token.'
    };
  }
}

export interface AdminRequestVerificationResult {
  authorized: boolean;
  statusCode: number;
  uid?: string;
  email?: string;
  error?: string;
}

/**
 * Verifies that an HTTP request comes from an authorized MyStudyZone Administrator
 * (`ronakvarade2022@gmail.com` with verified email, OR a user listed in `/admins/{uid}`)
 * OR carries a timing-safe server-to-server `X-Admin-Secret` if explicitly configured in env.
 */
export async function verifyAdminRequest(headers: {
  authorization?: string | string[];
  'x-admin-secret'?: string | string[];
}): Promise<AdminRequestVerificationResult> {
  // Optional server-to-server admin secret (only active when explicitly set in env)
  const configuredAdminSecret = sanitizeEnv(process.env.ADMIN_API_SECRET);
  const providedSecretRaw = headers['x-admin-secret'];
  const providedSecret = Array.isArray(providedSecretRaw)
    ? providedSecretRaw[0]
    : providedSecretRaw;

  if (
    configuredAdminSecret &&
    !isPlaceholder(configuredAdminSecret) &&
    configuredAdminSecret.length >= 24 &&
    providedSecret
  ) {
    const expectedBuf = Buffer.from(configuredAdminSecret, 'utf8');
    const providedBuf = Buffer.from(providedSecret.trim(), 'utf8');
    if (
      expectedBuf.length === providedBuf.length &&
      crypto.timingSafeEqual(expectedBuf, providedBuf)
    ) {
      return { authorized: true, statusCode: 200, email: 'server-admin-secret' };
    }
  }

  const tokenResult = await verifyBearerIdToken(headers.authorization);
  if (!tokenResult.valid || !tokenResult.uid) {
    return {
      authorized: false,
      statusCode: tokenResult.statusCode,
      error: tokenResult.error || 'Administrator authentication required.'
    };
  }

  // Primary authorized supervisor check (matches firestore.rules isAdmin())
  if (
    tokenResult.email === AUTHORIZED_ADMIN_EMAIL &&
    tokenResult.emailVerified === true
  ) {
    return {
      authorized: true,
      statusCode: 200,
      uid: tokenResult.uid,
      email: tokenResult.email
    };
  }

  // Secondary check: /admins/{uid} role document in Firestore
  const adminDb = getAdminFirestore();
  if (adminDb) {
    try {
      const adminDocSnap = await adminDb.collection('admins').doc(tokenResult.uid).get();
      if (adminDocSnap.exists) {
        return {
          authorized: true,
          statusCode: 200,
          uid: tokenResult.uid,
          email: tokenResult.email
        };
      }
    } catch {
      // Fall through to 403
    }
  }

  return {
    authorized: false,
    statusCode: 403,
    error: 'Forbidden: Verified administrator privileges are required for this operation.'
  };
}
