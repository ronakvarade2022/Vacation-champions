import crypto from 'crypto';
import dotenv from 'dotenv';
import {
  initializeApp as initializeAdminApp,
  getApps as getAdminApps,
  cert as adminCert
} from 'firebase-admin/app';
import { getFirestore as getAdminFirestoreSdk } from 'firebase-admin/firestore';
import { getAuth as getAdminAuthSdk } from 'firebase-admin/auth';
import {
  getSupportAiStatus,
  handleSupportChatRequest,
  handleSupportTicketSubmission
} from '../../server/supportAssistant.ts';
import {
  getAiServiceStatus,
  handleAiImageGenerate,
  handleAiTextGenerate
} from '../../server/aiToolsService.ts';
import {
  getSnapSolveStatus,
  handleSnapSolveDeleteSession,
  handleSnapSolveRecognize,
  handleSnapSolveSolve
} from '../../server/snapSolveService.ts';

dotenv.config();

const FIREBASE_PROJECT_ID = 'gen-lang-client-0860728359';
const FIRESTORE_DATABASE_ID =
  'ai-studio-vacationchampion-cedf2d74-0d25-42f6-8aaa-1a9e2fb4514d';
const AUTHORIZED_ADMIN_EMAIL = 'ronakvarade2022@gmail.com';

const processedPaymentIds = new Set();
const processedOrderIds = new Set();
const transactionLedger = [];
const netlifyDeviceSessions = new Map();
const SINGLE_DEVICE_BLOCK_MESSAGE =
  'Your account is currently active on another device. Please log out from your previous device before logging in here.';
const SESSION_INACTIVITY_TTL_MS = 12 * 60 * 60 * 1000;

let cachedNetlifyAdmin = null;
function getNetlifyFirebaseAdmin() {
  if (cachedNetlifyAdmin) return cachedNetlifyAdmin;
  try {
    const rawJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
    const rawEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const rawKey = process.env.FIREBASE_PRIVATE_KEY;
    let serviceAccount = null;

    if (rawJson && String(rawJson).trim()) {
      const cleaned = String(rawJson).trim().replace(/^["']+|["']+$/g, '').trim();
      const jsonStr = cleaned.startsWith('{')
        ? cleaned
        : Buffer.from(cleaned, 'base64').toString('utf8');
      const parsed = JSON.parse(jsonStr);
      if (parsed?.client_email && parsed?.private_key) {
        serviceAccount = {
          projectId: parsed.project_id || FIREBASE_PROJECT_ID,
          clientEmail: parsed.client_email,
          privateKey: String(parsed.private_key).replace(/\\n/g, '\n')
        };
      }
    } else if (rawEmail && rawKey) {
      serviceAccount = {
        projectId: process.env.FIREBASE_PROJECT_ID || FIREBASE_PROJECT_ID,
        clientEmail: String(rawEmail).trim().replace(/^["']+|["']+$/g, ''),
        privateKey: String(rawKey).trim().replace(/^["']+|["']+$/g, '').replace(/\\n/g, '\n')
      };
    }

    if (!serviceAccount) {
      cachedNetlifyAdmin = { db: null, auth: null, configured: false };
      return cachedNetlifyAdmin;
    }

    const appName = 'mystudyzone-netlify-admin';
    const existing = getAdminApps().find((a) => a.name === appName);
    const adminApp =
      existing ||
      initializeAdminApp(
        {
          credential: adminCert(serviceAccount),
          projectId: serviceAccount.projectId || FIREBASE_PROJECT_ID
        },
        appName
      );
    const db = getAdminFirestoreSdk(adminApp, FIRESTORE_DATABASE_ID);
    try {
      db.settings({ ignoreUndefinedProperties: true });
    } catch {
      // Ignore if already configured
    }
    const auth = getAdminAuthSdk(adminApp);
    cachedNetlifyAdmin = { db, auth, configured: true };
    return cachedNetlifyAdmin;
  } catch (err) {
    console.warn('[Netlify Firebase Admin Notice]:', err?.message || err);
    cachedNetlifyAdmin = { db: null, auth: null, configured: false };
    return cachedNetlifyAdmin;
  }
}

const PAID_SUBSCRIPTION_VALIDITY_DAYS = 365;
const IST_OFFSET_MS = 330 * 60 * 1000;

function formatIstDateString(date) {
  const istShifted = new Date(date.getTime() + IST_OFFSET_MS);
  const y = istShifted.getUTCFullYear();
  const m = String(istShifted.getUTCMonth() + 1).padStart(2, '0');
  const d = String(istShifted.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDaysIst(dateStr, days) {
  const parts = String(dateStr || '').split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return '';
  const dt = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2] + days));
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const d = String(dt.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function computeNetlifySubscriptionDates(now = new Date(), existingExpiresAt = null, validityDays = PAID_SUBSCRIPTION_VALIDITY_DAYS) {
  const effectiveValidityDays = Number(validityDays) > 0 ? Number(validityDays) : PAID_SUBSCRIPTION_VALIDITY_DAYS;
  const purchasedDateIst = formatIstDateString(now);
  let baseDateIst = purchasedDateIst;
  if (existingExpiresAt) {
    const parsedExp = String(existingExpiresAt).slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(parsedExp) && parsedExp > purchasedDateIst) {
      baseDateIst = parsedExp;
    }
  }
  const expiryDateIst = addDaysIst(baseDateIst, effectiveValidityDays);
  const startMs = Date.parse(`${purchasedDateIst}T00:00:00Z`);
  const endMs = Date.parse(`${expiryDateIst}T00:00:00Z`);
  const daysRemaining = Math.max(1, Math.round((endMs - startMs) / (1000 * 60 * 60 * 24)));
  return {
    startDateIso: purchasedDateIst,
    expiryDateIso: expiryDateIst,
    daysRemaining,
    validityDays: effectiveValidityDays
  };
}

function sanitizeEnvValue(val) {
  if (!val) return '';
  return String(val).trim().replace(/^["']+|["']+$/g, '').trim();
}

function isPlaceholderValue(val) {
  if (!val) return true;
  const upper = String(val).toUpperCase();
  return (
    upper.includes('YOUR_') ||
    upper.includes('MY_') ||
    upper.includes('REPLACE_') ||
    val === 'rzp_test_VACATION_CHAMP'
  );
}

function getResolvedRazorpayCredentials() {
  const rawId = sanitizeEnvValue(
    process.env.RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_LIVE_KEY_ID ||
      process.env.VITE_RAZORPAY_KEY_ID
  );
  const rawSecret = sanitizeEnvValue(
    process.env.RAZORPAY_KEY_SECRET ||
      process.env.RAZORPAY_LIVE_KEY_SECRET ||
      process.env.RAZORPAY_SECRET
  );
  const rawWebhookSecret = sanitizeEnvValue(
    process.env.RAZORPAY_WEBHOOK_SECRET
  );

  const cleanId = isPlaceholderValue(rawId) ? '' : rawId;
  const cleanSecret = isPlaceholderValue(rawSecret) ? '' : rawSecret;
  const cleanWebhookSecret = isPlaceholderValue(rawWebhookSecret)
    ? ''
    : rawWebhookSecret;

  let keyId = cleanId;
  let keySecret = cleanSecret;

  // Auto-correct if Key ID and Key Secret were entered in swapped order
  if (!cleanId.startsWith('rzp_') && cleanSecret.startsWith('rzp_')) {
    keyId = cleanSecret;
    keySecret = cleanId;
  }

  const hasValidKeyId =
    keyId.startsWith('rzp_live_') || keyId.startsWith('rzp_test_');
  const hasValidSecret = Boolean(
    keySecret && keySecret.length >= 12 && !keySecret.startsWith('rzp_')
  );
  const isConfigured = hasValidKeyId && hasValidSecret;
  const isLive = isConfigured && keyId.startsWith('rzp_live_');

  return {
    keyId: hasValidKeyId ? keyId : '',
    keySecret: hasValidSecret ? keySecret : '',
    webhookSecret: cleanWebhookSecret || (hasValidSecret ? keySecret : ''),
    hasExplicitWebhookSecret: Boolean(cleanWebhookSecret),
    isConfigured,
    isLive
  };
}

const STATIC_NETLIFY_TRUSTED_ORIGINS = new Set([
  'https://mystudyzone.in',
  'https://www.mystudyzone.in',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  ...(process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim().replace(/\/+$/, ''))
    .filter(Boolean)
]);

let currentRequestTrustedOrigin = null;

function resolveTrustedNetlifyOrigin(headers) {
  const raw = String(headers?.origin || headers?.Origin || '').trim().replace(/\/+$/, '');
  if (!raw) return null;
  if (STATIC_NETLIFY_TRUSTED_ORIGINS.has(raw)) return raw;
  if (/^https:\/\/ais-(dev|pre)-[a-z0-9-]+\.[a-z0-9-]+\.run\.app$/i.test(raw)) return raw;
  if (/^https:\/\/([a-z0-9-]+--)?[a-z0-9-]+\.netlify\.app$/i.test(raw)) return raw;
  return null;
}

function jsonResponse(statusCode, payload) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Vary': 'Origin',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
    'Access-Control-Allow-Headers':
      'Content-Type, Authorization, X-Razorpay-Signature, x-session-id, x-device-id, x-device-signature, x-hardware-signature, x-snapsolve-secret',
    'Cache-Control': 'no-store, no-cache, must-revalidate'
  };
  if (currentRequestTrustedOrigin) {
    headers['Access-Control-Allow-Origin'] = currentRequestTrustedOrigin;
    headers['Access-Control-Allow-Credentials'] = 'true';
  }
  return {
    statusCode,
    headers,
    body: JSON.stringify(payload)
  };
}

const VALID_NETLIFY_BOARDS = ['Maharashtra', 'CBSE', 'ICSE'];

const VALID_NETLIFY_CLASSES = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10'
];

function normalizeNetlifyBoard(raw) {
  const s = String(raw || '').trim().toUpperCase();
  if (!s || s === 'MAHARASHTRA' || s === 'MAHARASHTRA STATE BOARD' || s === 'MSBSHSE' || s === 'MH') {
    return 'Maharashtra';
  }
  if (s === 'CBSE' || s === 'NCERT' || s.includes('CENTRAL BOARD')) {
    return 'CBSE';
  }
  if (s === 'ICSE' || s === 'CISCE' || s.includes('INDIAN CERTIFICATE')) {
    return 'ICSE';
  }
  return 'Maharashtra';
}

function normalizeNetlifyClassLevel(raw) {
  const str = String(raw || '').trim();
  const m = /^(?:Class\s*)?(\d{1,2})(?:st|nd|rd|th)?$/i.exec(str);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return n >= 1 && n <= 10 ? `Class ${n}` : null;
}

function buildNetlifyBoardClassKey(board, classLevel) {
  return `${normalizeNetlifyBoard(board)}__${normalizeNetlifyClassLevel(classLevel) || 'Class 1'}`;
}

function parseNetlifyBoardClassKey(rawKey) {
  const str = String(rawKey || '').trim();
  if (!str) return null;
  if (str.includes('__')) {
    const [bRaw, cRaw] = str.split('__');
    const c = normalizeNetlifyClassLevel(cRaw);
    return c ? { board: normalizeNetlifyBoard(bRaw), classLevel: c } : null;
  }
  const c = normalizeNetlifyClassLevel(str);
  return c ? { board: 'Maharashtra', classLevel: c } : null;
}

const NETLIFY_PLAN_CATALOG = {
  BOARD_CLASS: { sku: 'BOARD_CLASS', title: 'Board & Class Annual Plan (Classes 1–10)', originalAmountInr: 199, amountInr: 99, amountPaise: 9900, validityDays: 365, validityLabel: '12 Months (1 Year)', unlockedCategories: [] },
  TET_6M: { sku: 'TET_6M', title: 'TET (Paper 1 & 2) – 6 Months', originalAmountInr: 399, amountInr: 199, amountPaise: 19900, validityDays: 180, validityLabel: '6 Months', unlockedCategories: ['maha_tet'] },
  CTET_6M: { sku: 'CTET_6M', title: 'CTET (Paper 1 & 2) – 6 Months', originalAmountInr: 399, amountInr: 199, amountPaise: 19900, validityDays: 180, validityLabel: '6 Months', unlockedCategories: ['ctet_paper_1', 'ctet_paper_2'] },
  TET_CTET_COMBO_6M: { sku: 'TET_CTET_COMBO_6M', title: 'TET + CTET Combo (Paper 1 & 2) – 6 Months', originalAmountInr: 699, amountInr: 349, amountPaise: 34900, validityDays: 180, validityLabel: '6 Months', unlockedCategories: ['maha_tet', 'ctet_paper_1', 'ctet_paper_2'] },
  TET_1Y: { sku: 'TET_1Y', title: 'TET (Paper 1 & 2) – 1 Year', originalAmountInr: 599, amountInr: 299, amountPaise: 29900, validityDays: 365, validityLabel: '1 Year', unlockedCategories: ['maha_tet'] },
  CTET_1Y: { sku: 'CTET_1Y', title: 'CTET (Paper 1 & 2) – 1 Year', originalAmountInr: 599, amountInr: 299, amountPaise: 29900, validityDays: 365, validityLabel: '1 Year', unlockedCategories: ['ctet_paper_1', 'ctet_paper_2'] },
  TET_CTET_COMBO_1Y: { sku: 'TET_CTET_COMBO_1Y', title: 'TET + CTET Combo (Paper 1 & 2) – 1 Year', originalAmountInr: 999, amountInr: 499, amountPaise: 49900, validityDays: 365, validityLabel: '1 Year', unlockedCategories: ['maha_tet', 'ctet_paper_1', 'ctet_paper_2'] },
  SCHOLARSHIP_COMBO: { sku: 'SCHOLARSHIP_COMBO', title: 'Scholarship Combo – Class 4 + Class 7', originalAmountInr: 199, amountInr: 99, amountPaise: 9900, validityDays: 365, validityLabel: '12 Months', unlockedCategories: ['scholarship_4th', 'scholarship_7th'] }
};

function resolveNetlifyPlanSku(rawSku, rawPlanId, amountPaiseOrInr) {
  const c1 = String(rawSku || '').trim().toUpperCase();
  if (NETLIFY_PLAN_CATALOG[c1]) return c1;
  if (c1 === 'MAHA_TET') return 'TET_1Y';
  if (c1 === 'CTET_PAPER_1' || c1 === 'CTET_PAPER_2' || c1 === 'CTET_COMBO') return 'CTET_1Y';
  if (c1 === 'TET_CTET_COMBO' || c1 === 'TEACHER_ALL_ACCESS') return 'TET_CTET_COMBO_1Y';
  if (c1 === 'SCHOLARSHIP_4TH' || c1 === 'SCHOLARSHIP_7TH') return 'SCHOLARSHIP_COMBO';

  const c2 = String(rawPlanId || '').trim().toUpperCase();
  if (NETLIFY_PLAN_CATALOG[c2]) return c2;
  if (c2 === 'MAHA_TET') return 'TET_1Y';
  if (c2 === 'CTET_PAPER_1' || c2 === 'CTET_PAPER_2' || c2 === 'CTET_COMBO') return 'CTET_1Y';
  if (c2 === 'TET_CTET_COMBO' || c2 === 'TEACHER_ALL_ACCESS') return 'TET_CTET_COMBO_1Y';
  if (c2 === 'SCHOLARSHIP_4TH' || c2 === 'SCHOLARSHIP_7TH') return 'SCHOLARSHIP_COMBO';

  if (typeof amountPaiseOrInr === 'number' && amountPaiseOrInr > 0) {
    const inr = amountPaiseOrInr >= 5000 ? Math.round(amountPaiseOrInr / 100) : Math.round(amountPaiseOrInr);
    if (inr === 499) return 'TET_CTET_COMBO_1Y';
    if (inr === 349) return 'TET_CTET_COMBO_6M';
    if (inr === 299) return 'TET_1Y';
    if (inr === 199) return 'TET_6M';
    if (inr === 99) return 'BOARD_CLASS';
  }
  return 'BOARD_CLASS';
}

function buildUpdatedNetlifyCategorySubscriptions(existingDoc, planItem, startDateIso, expiryDateIso, paymentId, orderId) {
  const existingCatMap = {};
  if (existingDoc?.categorySubscriptions && typeof existingDoc.categorySubscriptions === 'object') {
    for (const [k, rec] of Object.entries(existingDoc.categorySubscriptions)) {
      if (rec && typeof rec === 'object') existingCatMap[k] = { ...rec, categoryId: k };
    }
  }
  for (const catId of planItem.unlockedCategories || []) {
    existingCatMap[catId] = {
      categoryId: catId,
      planSku: planItem.sku,
      status: 'ACTIVE',
      purchasedAt: startDateIso,
      expiresAt: expiryDateIso,
      paymentId,
      orderId,
      amountInr: planItem.amountInr,
      validityDays: planItem.validityDays || PAID_SUBSCRIPTION_VALIDITY_DAYS,
      updatedAt: new Date().toISOString()
    };
  }
  const todayIst = formatIstDateString(new Date());
  const activatedCategoryKeys = Object.keys(existingCatMap).filter((catId) => {
    const rec = existingCatMap[catId];
    if (!rec || rec.status === 'EXPIRED') return false;
    const exp = String(rec.expiresAt || '').slice(0, 10);
    return !exp || exp >= todayIst;
  });
  return { categorySubscriptions: existingCatMap, activatedCategoryKeys };
}

function toFirestoreValue(val) {
  if (val === null || val === undefined) return { nullValue: null };
  if (typeof val === 'boolean') return { booleanValue: val };
  if (typeof val === 'number') {
    return Number.isInteger(val)
      ? { integerValue: String(val) }
      : { doubleValue: val };
  }
  if (Array.isArray(val)) {
    return {
      arrayValue: {
        values: val.map((item) => toFirestoreValue(item))
      }
    };
  }
  if (typeof val === 'object') {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== undefined) {
        fields[k] = toFirestoreValue(v);
      }
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}

function fromFirestoreValue(v) {
  if (!v || typeof v !== 'object') return null;
  if ('stringValue' in v) return v.stringValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return Number(v.doubleValue);
  if ('booleanValue' in v) return Boolean(v.booleanValue);
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) {
    const vals = Array.isArray(v.arrayValue?.values) ? v.arrayValue.values : [];
    return vals.map((item) => fromFirestoreValue(item));
  }
  if ('mapValue' in v) {
    const obj = {};
    const fields = v.mapValue?.fields || {};
    for (const [k, fv] of Object.entries(fields)) {
      obj[k] = fromFirestoreValue(fv);
    }
    return obj;
  }
  return null;
}

function buildUpdatedNetlifyClassSubscriptions(
  existingDoc,
  targetBoard,
  targetClass,
  startDateIso,
  expiryDateIso,
  paymentId,
  orderId,
  amountInr = 99
) {
  const resolvedBoard = normalizeNetlifyBoard(targetBoard);
  const resolvedClass = normalizeNetlifyClassLevel(targetClass) || 'Class 1';
  const targetKey = buildNetlifyBoardClassKey(resolvedBoard, resolvedClass);

  const existingMap = {};
  if (existingDoc?.classSubscriptions && typeof existingDoc.classSubscriptions === 'object') {
    for (const [rawKey, entry] of Object.entries(existingDoc.classSubscriptions)) {
      if (!entry || typeof entry !== 'object') continue;
      const parsed = parseNetlifyBoardClassKey(rawKey);
      const entryBoard = normalizeNetlifyBoard(
        entry.board || parsed?.board || existingDoc.primaryBoard || existingDoc.board || 'Maharashtra'
      );
      const entryClass = normalizeNetlifyClassLevel(entry.classLevel || parsed?.classLevel || rawKey);
      if (!entryClass) continue;
      const compositeKey = buildNetlifyBoardClassKey(entryBoard, entryClass);
      existingMap[compositeKey] = {
        ...entry,
        board: entryBoard,
        classLevel: entryClass,
        boardClassKey: compositeKey
      };
    }
  }

  if (existingDoc?.plan && existingDoc.plan !== 'free') {
    const legacyBoard = normalizeNetlifyBoard(
      existingDoc.activatedBoard || existingDoc.board || existingDoc.primaryBoard || 'Maharashtra'
    );
    const legacyCls =
      normalizeNetlifyClassLevel(existingDoc.activatedClassLevel) ||
      normalizeNetlifyClassLevel(existingDoc.classLevel) ||
      resolvedClass;
    const legacyKey = buildNetlifyBoardClassKey(legacyBoard, legacyCls);
    if (!existingMap[legacyKey]) {
      existingMap[legacyKey] = {
        board: legacyBoard,
        classLevel: legacyCls,
        boardClassKey: legacyKey,
        plan: existingDoc.plan === 'basic' ? 'basic' : 'premium',
        status: 'ACTIVE',
        purchasedAt: existingDoc.planPurchasedAt,
        expiresAt: existingDoc.planExpiresAt,
        paymentId: existingDoc.lastPaymentId,
        orderId: existingDoc.lastOrderId,
        amountInr: 99,
        validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
      };
    }
  }

  existingMap[targetKey] = {
    board: resolvedBoard,
    classLevel: resolvedClass,
    boardClassKey: targetKey,
    plan: 'premium',
    status: 'ACTIVE',
    purchasedAt: startDateIso,
    expiresAt: expiryDateIso,
    paymentId,
    orderId,
    amountInr,
    validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
    updatedAt: new Date().toISOString()
  };

  const todayIst = formatIstDateString(new Date());
  const activatedClassKeys = [];
  const activeClassSet = new Set();
  for (const b of VALID_NETLIFY_BOARDS) {
    for (const cls of VALID_NETLIFY_CLASSES) {
      const k = buildNetlifyBoardClassKey(b, cls);
      const rec = existingMap[k];
      if (!rec || rec.plan === 'free') continue;
      const exp = String(rec.expiresAt || '').slice(0, 10);
      if (!exp || exp >= todayIst) {
        activatedClassKeys.push(k);
        activeClassSet.add(cls);
      }
    }
  }

  const activatedClasses = VALID_NETLIFY_CLASSES.filter((c) => activeClassSet.has(c));
  const primaryBoard = normalizeNetlifyBoard(
    existingDoc?.primaryBoard || existingDoc?.board || resolvedBoard
  );
  const primaryClassLevel =
    normalizeNetlifyClassLevel(existingDoc?.primaryClassLevel) ||
    normalizeNetlifyClassLevel(existingDoc?.classLevel) ||
    resolvedClass;

  return {
    existingMap,
    activatedClasses,
    activatedClassKeys,
    primaryBoard,
    primaryClassLevel,
    targetKey
  };
}

async function patchFirestoreDocument(collectionName, docId, fieldsObj) {
  try {
    const cleanId = String(docId).trim();
    const { db } = getNetlifyFirebaseAdmin();
    if (db) {
      await db.collection(collectionName).doc(cleanId).set(fieldsObj, { merge: true });
      return;
    }

    const safeDocId = encodeURIComponent(cleanId);
    const fieldKeys = Object.keys(fieldsObj);
    const updateMask = fieldKeys
      .map((k) => `updateMask.fieldPaths=${encodeURIComponent(k)}`)
      .join('&');
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents/${collectionName}/${safeDocId}?${updateMask}`;

    const firestoreFields = {};
    for (const [k, v] of Object.entries(fieldsObj)) {
      firestoreFields[k] = toFirestoreValue(v);
    }

    await fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields: firestoreFields })
    });
  } catch (err) {
    console.warn(`[Netlify Firestore Sync Notice] (${collectionName}/${docId}):`, err?.message || err);
  }
}

async function getFirestoreDocument(collectionName, docId) {
  try {
    const cleanId = String(docId).trim();
    const { db } = getNetlifyFirebaseAdmin();
    if (db) {
      const snap = await db.collection(collectionName).doc(cleanId).get();
      return snap.exists ? snap.data() : null;
    }

    const safeDocId = encodeURIComponent(cleanId);
    const url = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents/${collectionName}/${safeDocId}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const docData = await res.json();
    if (!docData || !docData.fields) return null;
    const parsed = {};
    for (const [k, v] of Object.entries(docData.fields)) {
      parsed[k] = fromFirestoreValue(v);
    }
    return parsed;
  } catch {
    return null;
  }
}

async function verifyAndCaptureRazorpayPayment(creds, paymentId, expectedAmountPaise) {
  const authHeader =
    'Basic ' +
    Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString('base64');

  const res = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}`,
    {
      method: 'GET',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      }
    }
  );

  const paymentData = await res.json().catch(() => null);
  if (!res.ok || !paymentData || !paymentData.id) {
    return {
      confirmed: false,
      error:
        paymentData?.error?.description ||
        `Unable to verify payment ${paymentId} with Razorpay API (HTTP ${res.status}).`
    };
  }

  let status = String(paymentData.status || '').toLowerCase();
  const amount = Number(paymentData.amount || 0);
  const method = String(paymentData.method || 'RAZORPAY').toUpperCase();

  if (expectedAmountPaise && amount > 0 && amount < expectedAmountPaise) {
    return {
      confirmed: false,
      error: `Payment amount mismatch: expected ${expectedAmountPaise} paise, received ${amount} paise.`
    };
  }

  if (status === 'authorized') {
    const captureRes = await fetch(
      `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`,
      {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amount || expectedAmountPaise,
          currency: paymentData.currency || 'INR'
        })
      }
    );
    const capturedData = await captureRes.json().catch(() => null);
    if (captureRes.ok && capturedData?.status === 'captured') {
      status = 'captured';
    }
  }

  if (status !== 'captured') {
    return {
      confirmed: false,
      error: `Payment status is '${status}'. Subscription is only activated for captured payments.`
    };
  }

  return {
    confirmed: true,
    status: 'captured',
    method,
    amount,
    notes: paymentData.notes || {}
  };
}

export async function handler(event) {
  const rawOrigin = String(event.headers?.origin || event.headers?.Origin || '').trim();
  currentRequestTrustedOrigin = resolveTrustedNetlifyOrigin(event.headers);

  if (event.httpMethod === 'OPTIONS') {
    if (rawOrigin && !currentRequestTrustedOrigin) {
      return jsonResponse(403, { success: false, error: 'Origin not allowed by CORS policy.' });
    }
    return jsonResponse(204, { ok: true });
  }

  const rawPath =
    event.queryStringParameters?.path ||
    event.path ||
    (event.rawUrl ? new URL(event.rawUrl).pathname : '');

  // Normalize path whether called via /api/... or /.netlify/functions/api/...
  const normalizedPath = rawPath
    .replace(/^\/\.netlify\/functions\/api/, '')
    .replace(/^\/api/, '');

  const method = (event.httpMethod || 'GET').toUpperCase();

  // 1. GET /api/razorpay/config
  if (method === 'GET' && normalizedPath === '/razorpay/config') {
    const creds = getResolvedRazorpayCredentials();
    return jsonResponse(200, {
      success: true,
      keyId: creds.keyId || '',
      isLive: creds.isLive,
      mode: creds.isLive ? 'LIVE' : 'TEST',
      configured: creds.isConfigured,
      currency: 'INR',
      catalog: NETLIFY_PLAN_CATALOG,
      plans: {
        premium: {
          id: 'premium',
          name: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
          amount: 99,
          amountPaise: 9900,
          currency: 'INR',
          durationDays: 365
        }
      }
    });
  }

  // 2. POST /api/razorpay/create-order
  if (method === 'POST' && normalizedPath === '/razorpay/create-order') {
    try {
      const body = JSON.parse(event.body || '{}');
      const rawPlan = body.planId || body.plan || 'premium';
      const resolvedSku = resolveNetlifyPlanSku(body.planSku, rawPlan);
      const planItem = NETLIFY_PLAN_CATALOG[resolvedSku];
      const planId = rawPlan === 'premium' || Boolean(body.planSku) ? 'premium' : null;
      const { studentId, studentName, email, mobile, selectedBoard, board, selectedClass, classLevel } = body;
      const normalizedBoard = normalizeNetlifyBoard(selectedBoard || board);
      const normalizedClass = normalizeNetlifyClassLevel(selectedClass || classLevel) || '';

      if (!studentId) {
        return jsonResponse(400, {
          success: false,
          error: 'Student authentication required.'
        });
      }

      if (!planId) {
        return jsonResponse(400, {
          success: false,
          error: 'Invalid plan selected.'
        });
      }

      const creds = getResolvedRazorpayCredentials();
      if (!creds.isConfigured) {
        return jsonResponse(500, {
          success: false,
          error:
            'Razorpay LIVE API credentials (RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET) are not configured in production environment variables.'
        });
      }

      const amountInPaise = planItem.amountPaise;
      const amountInRupees = planItem.amountInr;
      const receiptNumber = `REC-VC-${Date.now().toString().slice(-8)}`;
      const authHeader =
        'Basic ' +
        Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString('base64');

      const orderRes = await fetch('https://api.razorpay.com/v1/orders', {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: receiptNumber,
          notes: {
            studentId: String(studentId).slice(0, 250),
            studentName: String(studentName || 'Student').slice(0, 250),
            email: String(email || '').slice(0, 250),
            mobile: String(mobile || '').slice(0, 250),
            selectedBoard: normalizedBoard,
            board: normalizedBoard,
            selectedClass: normalizedClass,
            classLevel: normalizedClass,
            planId: 'premium',
            planSku: resolvedSku,
            activatedCategories: planItem.unlockedCategories.join(','),
            subscriptionTier: 'premium',
            validityDays: String(planItem.validityDays)
          }
        })
      });

      const orderData = await orderRes.json().catch(() => null);
      if (!orderRes.ok || !orderData || !orderData.id) {
        return jsonResponse(502, {
          success: false,
          error:
            orderData?.error?.description ||
            'Razorpay order creation failed. Please verify LIVE API credentials.'
        });
      }

      return jsonResponse(200, {
        success: true,
        orderId: orderData.id,
        amount: Number(orderData.amount) || amountInPaise,
        amountRupees: amountInRupees,
        currency: orderData.currency || 'INR',
        keyId: creds.keyId,
        receiptNumber,
        planId,
        planSku: resolvedSku,
        unlockedCategories: planItem.unlockedCategories,
        planTitle: planItem.title,
        selectedBoard: normalizedBoard,
        selectedClass: normalizedClass || undefined,
        isMock: false,
        mode: creds.isLive ? 'LIVE' : 'TEST'
      });
    } catch (err) {
      return jsonResponse(500, {
        success: false,
        error: err?.message || 'Internal server error during order creation.'
      });
    }
  }

  // 2.1 POST /api/razorpay/create-qr
  if (method === 'POST' && normalizedPath === '/razorpay/create-qr') {
    try {
      const body = JSON.parse(event.body || '{}');
      const rawPlan = body.planId || body.plan || 'premium';
      const resolvedSku = resolveNetlifyPlanSku(body.planSku, rawPlan);
      const planItem = NETLIFY_PLAN_CATALOG[resolvedSku];
      const planId = rawPlan === 'premium' || Boolean(body.planSku) ? 'premium' : null;
      const { studentId, studentName, email, mobile, selectedBoard, board, selectedClass, classLevel } = body;
      const normalizedBoard = normalizeNetlifyBoard(selectedBoard || board);
      const normalizedClass = normalizeNetlifyClassLevel(selectedClass || classLevel) || '';

      if (!studentId) {
        return jsonResponse(400, { success: false, error: 'Student authentication required.' });
      }

      if (!planId) {
        return jsonResponse(400, { success: false, error: 'Invalid plan selected.' });
      }

      const creds = getResolvedRazorpayCredentials();
      if (!creds.isConfigured || !creds.keySecret) {
        return jsonResponse(500, {
          success: false,
          error: 'Razorpay LIVE API credentials are not configured in production environment variables.'
        });
      }

      const amountInPaise = planItem.amountPaise;
      const amountInRupees = planItem.amountInr;
      const planTitle =
        resolvedSku === 'BOARD_CLASS'
          ? normalizedClass
            ? `PREMIUM PLAN (${normalizedBoard} • ${normalizedClass}) – ₹${amountInRupees} – 365 Days`
            : `PREMIUM PLAN (${normalizedBoard}) – ₹${amountInRupees} – 365 Days (1 Year)`
          : `${planItem.title} – ₹${amountInRupees} – ${planItem.validityDays} Days (${planItem.validityLabel})`;
      const authHeader = 'Basic ' + Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString('base64');

      const qrRes = await fetch('https://api.razorpay.com/v1/payments/qr_codes', {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: 'upi_qr',
          name: 'MyStudyZone',
          usage: 'single_use',
          fixed_amount: true,
          payment_amount: amountInPaise,
          description: `${planTitle} • ${studentName || 'Student'}`,
          notes: {
            studentId: String(studentId).slice(0, 250),
            studentName: String(studentName || 'Student').slice(0, 250),
            email: String(email || '').slice(0, 250),
            mobile: String(mobile || '').slice(0, 250),
            selectedBoard: normalizedBoard,
            board: normalizedBoard,
            selectedClass: normalizedClass,
            classLevel: normalizedClass,
            planId: 'premium',
            planSku: resolvedSku,
            activatedCategories: planItem.unlockedCategories.join(','),
            subscriptionTier: 'premium',
            validityDays: String(planItem.validityDays)
          }
        })
      });

      const qrData = await qrRes.json().catch(() => null);

      if (!qrRes.ok || !qrData || !qrData.id) {
        const errorDesc = qrData?.error?.description || `Razorpay QR Code API returned HTTP ${qrRes.status}`;
        return jsonResponse(502, {
          success: false,
          error: `${errorDesc}. (To enable UPI QR Codes, go to Razorpay Dashboard → Account & Settings → Payment Methods → Enable UPI QR Code).`
        });
      }

      return jsonResponse(200, {
        success: true,
        qrId: qrData.id,
        imageUrl: qrData.image_url,
        amount: amountInPaise,
        amountRupees: amountInRupees,
        currency: 'INR',
        planId,
        planSku: resolvedSku,
        unlockedCategories: planItem.unlockedCategories,
        selectedBoard: normalizedBoard,
        selectedClass: normalizedClass || undefined,
        planTitle,
        status: qrData.status || 'active',
        createdAt: qrData.created_at || Math.floor(Date.now() / 1000),
        expiresInSeconds: 600,
        keyId: creds.keyId
      });
    } catch (err) {
      return jsonResponse(500, {
        success: false,
        error: err?.message || 'Error generating Razorpay QR code.'
      });
    }
  }

  // 2.2 GET /api/razorpay/qr-status/:qrId
  if (method === 'GET' && normalizedPath.startsWith('/razorpay/qr-status/')) {
    try {
      const qrId = normalizedPath.replace('/razorpay/qr-status/', '').split('?')[0];
      const params = event.queryStringParameters || {};
      const { studentId, planId, planSku, studentName, email, mobile, selectedBoard, board, selectedClass, classLevel } = params;

      const creds = getResolvedRazorpayCredentials();
      if (!creds.isConfigured || !creds.keySecret) {
        return jsonResponse(500, { success: false, error: 'Razorpay credentials not configured.' });
      }

      const authHeader = 'Basic ' + Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString('base64');

      // 1. Fetch QR status
      const qrRes = await fetch(`https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrId)}`, {
        headers: { Authorization: authHeader }
      });
      const qrData = await qrRes.json().catch(() => null);

      if (!qrRes.ok || !qrData) {
        return jsonResponse(502, { success: false, error: 'Unable to query QR code status from Razorpay.' });
      }

      const resolvedSku = resolveNetlifyPlanSku(
        qrData?.notes?.planSku,
        planSku || planId,
        Number(qrData?.payment_amount || 0)
      );
      const planItem = NETLIFY_PLAN_CATALOG[resolvedSku];
      const resolvedPlanId = 'premium';
      const expectedAmountPaise = planItem.amountPaise;
      const amountRupees = planItem.amountInr;

      // 2. Fetch payments received on this QR
      const paymentsRes = await fetch(`https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrId)}/payments`, {
        headers: { Authorization: authHeader }
      });
      const paymentsData = await paymentsRes.json().catch(() => null);
      const items = Array.isArray(paymentsData?.items) ? paymentsData.items : [];

      const successfulPayment = items.find(
        (item) => (item.status === 'captured' || item.status === 'authorized') && Number(item.amount) >= expectedAmountPaise
      );

      if (successfulPayment) {
        const paymentId = successfulPayment.id;
        const now = new Date();
        const existingStudentDoc = await getFirestoreDocument('students', String(studentId));
        const resolvedBoard = normalizeNetlifyBoard(
          qrData?.notes?.selectedBoard ||
            qrData?.notes?.board ||
            selectedBoard ||
            board ||
            existingStudentDoc?.board ||
            'Maharashtra'
        );
        const resolvedClass =
          normalizeNetlifyClassLevel(qrData?.notes?.selectedClass || qrData?.notes?.classLevel || selectedClass || classLevel) ||
          normalizeNetlifyClassLevel(existingStudentDoc?.classLevel) ||
          'Class 1';
        const targetKey = buildNetlifyBoardClassKey(resolvedBoard, resolvedClass);
        const isCategoryPlan = planItem.unlockedCategories.length > 0;
        const existingCatExpiry = isCategoryPlan
          ? existingStudentDoc?.categorySubscriptions?.[planItem.unlockedCategories[0]]?.expiresAt
          : undefined;
        const existingClassExpiry = !isCategoryPlan
          ? existingStudentDoc?.classSubscriptions?.[targetKey]?.expiresAt ||
            (resolvedBoard === 'Maharashtra' ? existingStudentDoc?.classSubscriptions?.[resolvedClass]?.expiresAt : undefined)
          : undefined;
        const dates = computeNetlifySubscriptionDates(now, isCategoryPlan ? existingCatExpiry : existingClassExpiry, planItem.validityDays);
        const startDateIso = dates.startDateIso;
        const expiryDateIso = dates.expiryDateIso;
        const planTitle = isCategoryPlan
          ? `${planItem.title} – ₹${amountRupees} – ${planItem.validityDays} Days (${planItem.validityLabel})`
          : `PREMIUM PLAN (${resolvedBoard} • ${resolvedClass}) – ₹${amountRupees} – 365 Days (1 Year)`;
        const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;

        if (isCategoryPlan) {
          const { categorySubscriptions, activatedCategoryKeys } = buildUpdatedNetlifyCategorySubscriptions(
            existingStudentDoc,
            planItem,
            startDateIso,
            expiryDateIso,
            paymentId,
            qrId
          );
          await Promise.all([
            patchFirestoreDocument('students', String(studentId), {
              id: String(studentId),
              activatedCategoryKeys,
              categorySubscriptions,
              plan: resolvedPlanId,
              subscriptionTier: 'premium',
              planLabel: planTitle,
              isLifetimeFree: false,
              planPurchasedAt: existingStudentDoc?.planPurchasedAt || startDateIso,
              planExpiresAt: existingStudentDoc?.planExpiresAt && existingStudentDoc.planExpiresAt > expiryDateIso ? existingStudentDoc.planExpiresAt : expiryDateIso,
              subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
              subscriptionStatus: 'ACTIVE',
              lastPaymentId: paymentId,
              lastOrderId: qrId,
              lastPaymentAmountInr: amountRupees,
              subscriptionUpdatedAt: now.toISOString()
            }),
            patchFirestoreDocument('transactions', `tx_${paymentId}`, {
              id: `tx_${paymentId}`,
              receiptNumber,
              studentId: String(studentId),
              studentName: String(studentName || 'Student'),
              parentEmail: String(email || ''),
              parentMobile: String(mobile || ''),
              planId: resolvedPlanId,
              planSku: resolvedSku,
              activatedCategories: planItem.unlockedCategories,
              planTitle,
              amount: amountRupees,
              currency: 'INR',
              orderId: qrId,
              paymentId,
              signature: `qr_verified_${paymentId}`,
              method: 'UPI',
              status: 'SUCCESS',
              createdAt: now.toISOString(),
              membershipStartDate: startDateIso,
              membershipExpiryDate: expiryDateIso
            })
          ]);
          return jsonResponse(200, {
            success: true,
            paid: true,
            status: 'PAID',
            paymentId,
            orderId: qrId,
            planSku: resolvedSku,
            activatedCategoryKeys,
            categorySubscriptions,
            method: 'UPI',
            amount: amountRupees,
            transaction: {
              id: `tx_${paymentId}`,
              receiptNumber,
              studentId: String(studentId),
              studentName: String(studentName || 'Student'),
              planId: resolvedPlanId,
              planSku: resolvedSku,
              activatedCategories: planItem.unlockedCategories,
              planTitle,
              amount: amountRupees,
              orderId: qrId,
              paymentId,
              method: 'UPI',
              status: 'SUCCESS',
              membershipStartDate: startDateIso,
              membershipExpiryDate: expiryDateIso
            },
            membership: {
              membershipId: `mem_${paymentId}`,
              studentId: String(studentId),
              studentName: String(studentName || 'Student'),
              activatedCategoryKeys,
              categorySubscriptions,
              planId: resolvedPlanId,
              planSku: resolvedSku,
              planTitle,
              amount: amountRupees,
              startDate: startDateIso,
              expiryDate: expiryDateIso,
              status: 'ACTIVE',
              paymentId,
              orderId: qrId,
              daysRemaining: dates.daysRemaining
            }
          });
        }

        const { existingMap, activatedClasses, activatedClassKeys, primaryBoard, primaryClassLevel } =
          buildUpdatedNetlifyClassSubscriptions(
            existingStudentDoc,
            resolvedBoard,
            resolvedClass,
            startDateIso,
            expiryDateIso,
            paymentId,
            qrId,
            amountRupees
          );

        // Patch Firestore
        await Promise.all([
          patchFirestoreDocument('students', String(studentId), {
            id: String(studentId),
            board: resolvedBoard,
            classLevel: resolvedClass,
            primaryBoard,
            primaryClassLevel,
            activatedBoard: resolvedBoard,
            activatedClassLevel: resolvedClass,
            activatedClasses,
            activatedClassKeys,
            classSubscriptions: existingMap,
            plan: resolvedPlanId,
            subscriptionTier: 'premium',
            planLabel: planTitle,
            isLifetimeFree: false,
            planPurchasedAt: startDateIso,
            planExpiresAt: expiryDateIso,
            subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
            subscriptionStatus: 'ACTIVE',
            lastPaymentId: paymentId,
            lastOrderId: qrId,
            lastPaymentAmountInr: amountRupees,
            subscriptionUpdatedAt: now.toISOString()
          }),
          patchFirestoreDocument('transactions', `tx_${paymentId}`, {
            id: `tx_${paymentId}`,
            receiptNumber,
            studentId: String(studentId),
            studentName: String(studentName || 'Student'),
            parentEmail: String(email || ''),
            parentMobile: String(mobile || ''),
            selectedBoard: resolvedBoard,
            selectedClass: resolvedClass,
            classLevel: resolvedClass,
            boardClassKey: targetKey,
            planId: resolvedPlanId,
            planSku: resolvedSku,
            planTitle,
            amount: amountRupees,
            currency: 'INR',
            orderId: qrId,
            paymentId,
            signature: `qr_verified_${paymentId}`,
            method: 'UPI',
            status: 'SUCCESS',
            createdAt: now.toISOString(),
            membershipStartDate: startDateIso,
            membershipExpiryDate: expiryDateIso
          })
        ]);

        return jsonResponse(200, {
          success: true,
          paid: true,
          status: 'PAID',
          paymentId,
          orderId: qrId,
          planSku: resolvedSku,
          selectedBoard: resolvedBoard,
          selectedClass: resolvedClass,
          boardClassKey: targetKey,
          activatedClasses,
          activatedClassKeys,
          method: 'UPI',
          amount: amountRupees,
          transaction: {
            id: `tx_${paymentId}`,
            receiptNumber,
            studentId: String(studentId),
            studentName: String(studentName || 'Student'),
            selectedBoard: resolvedBoard,
            selectedClass: resolvedClass,
            planId: resolvedPlanId,
            planSku: resolvedSku,
            planTitle,
            amount: amountRupees,
            orderId: qrId,
            paymentId,
            method: 'UPI',
            status: 'SUCCESS',
            membershipStartDate: startDateIso,
            membershipExpiryDate: expiryDateIso
          },
          membership: {
            membershipId: `mem_${paymentId}`,
            studentId: String(studentId),
            studentName: String(studentName || 'Student'),
            selectedBoard: resolvedBoard,
            selectedClass: resolvedClass,
            boardClassKey: targetKey,
            activatedClasses,
            activatedClassKeys,
            planId: resolvedPlanId,
            planSku: resolvedSku,
            planTitle,
            amount: amountRupees,
            startDate: startDateIso,
            expiryDate: expiryDateIso,
            status: 'ACTIVE',
            paymentId,
            orderId: qrId,
            daysRemaining: dates.daysRemaining
          }
        });
      }

      if (qrData.status === 'closed') {
        return jsonResponse(200, {
          success: true,
          paid: false,
          status: 'EXPIRED',
          message: 'QR code has expired. Please generate a new QR code.'
        });
      }

      return jsonResponse(200, {
        success: true,
        paid: false,
        status: 'WAITING',
        message: 'Waiting for UPI payment confirmation...'
      });
    } catch (err) {
      return jsonResponse(500, { success: false, error: err?.message || 'Error checking QR status.' });
    }
  }

  // 3. POST /api/razorpay/verify-payment
  if (method === 'POST' && normalizedPath === '/razorpay/verify-payment') {
    try {
      const body = JSON.parse(event.body || '{}');
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        planId,
        planSku: reqPlanSku,
        studentId,
        studentName,
        email,
        mobile,
        selectedBoard,
        board,
        selectedClass,
        classLevel,
        method: payMethod = 'UPI',
        currentExpiresAt
      } = body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return jsonResponse(400, {
          success: false,
          error:
            'Incomplete transaction information. Missing order ID, payment ID, or signature.'
        });
      }

      if (!studentId) {
        return jsonResponse(400, {
          success: false,
          error: 'Student identification missing.'
        });
      }

      if (planId !== 'premium' && !reqPlanSku) {
        return jsonResponse(400, {
          success: false,
          error: 'Valid Premium or Category Plan SKU is required for verification.'
        });
      }

      const candidateSku = resolveNetlifyPlanSku(reqPlanSku, planId);
      const candidateItem = NETLIFY_PLAN_CATALOG[candidateSku];

      if (
        processedPaymentIds.has(razorpay_payment_id) ||
        processedOrderIds.has(razorpay_order_id)
      ) {
        const existingTx = transactionLedger.find(
          (t) =>
            t.paymentId === razorpay_payment_id ||
            t.orderId === razorpay_order_id
        );
        return jsonResponse(200, {
          success: true,
          alreadyProcessed: true,
          planSku: existingTx?.planSku || candidateSku,
          selectedBoard: existingTx?.selectedBoard || 'Maharashtra',
          selectedClass: existingTx?.selectedClass,
          transaction: existingTx,
          message: 'This payment has already been verified and activated.'
        });
      }

      const creds = getResolvedRazorpayCredentials();
      if (!creds.isConfigured || !creds.keySecret) {
        return jsonResponse(500, {
          success: false,
          error: 'Razorpay LIVE API credentials are not configured on the server.'
        });
      }

      // Cryptographic HMAC-SHA256 verification
      const expectedSignature = crypto
        .createHmac('sha256', creds.keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      const expectedBuf = Buffer.from(expectedSignature, 'utf8');
      const providedBuf = Buffer.from(String(razorpay_signature).trim(), 'utf8');
      const isSignatureValid =
        expectedBuf.length === providedBuf.length &&
        crypto.timingSafeEqual(expectedBuf, providedBuf);

      if (!isSignatureValid) {
        return jsonResponse(400, {
          success: false,
          error:
            'Cryptographic payment signature mismatch. Payment verification failed.'
        });
      }

      const expectedAmountPaise = candidateItem.amountPaise;
      const captureCheck = await verifyAndCaptureRazorpayPayment(
        creds,
        razorpay_payment_id,
        expectedAmountPaise
      );

      if (!captureCheck.confirmed) {
        return jsonResponse(400, {
          success: false,
          error:
            captureCheck.error ||
            'Payment was not confirmed as captured by Razorpay API.'
        });
      }

      const notesSid = String(
        captureCheck.notes?.studentId || captureCheck.notes?.userId || ''
      ).trim();
      if (notesSid && notesSid !== String(studentId).trim()) {
        return jsonResponse(403, {
          success: false,
          error: 'Payment belongs to a different student account. Cross-student activation rejected.'
        });
      }

      const resolvedSku = resolveNetlifyPlanSku(
        captureCheck.notes?.planSku || candidateSku,
        planId,
        captureCheck.amount
      );
      const planItem = NETLIFY_PLAN_CATALOG[resolvedSku];
      const isCategoryPlan = planItem.unlockedCategories.length > 0;

      const now = new Date();
      const existingStudentDoc = await getFirestoreDocument('students', String(studentId));
      const resolvedBoard = normalizeNetlifyBoard(
        captureCheck.notes?.selectedBoard ||
          captureCheck.notes?.board ||
          selectedBoard ||
          board ||
          existingStudentDoc?.board ||
          'Maharashtra'
      );
      const resolvedClass =
        normalizeNetlifyClassLevel(
          captureCheck.notes?.selectedClass ||
            captureCheck.notes?.classLevel ||
            selectedClass ||
            classLevel
        ) ||
        normalizeNetlifyClassLevel(existingStudentDoc?.classLevel) ||
        'Class 1';
      const targetKey = buildNetlifyBoardClassKey(resolvedBoard, resolvedClass);
      const existingCatExpiry = isCategoryPlan
        ? existingStudentDoc?.categorySubscriptions?.[planItem.unlockedCategories[0]]?.expiresAt
        : undefined;
      const existingClassExpiry = !isCategoryPlan
        ? existingStudentDoc?.classSubscriptions?.[targetKey]?.expiresAt ||
          (resolvedBoard === 'Maharashtra' ? existingStudentDoc?.classSubscriptions?.[resolvedClass]?.expiresAt : undefined)
        : undefined;
      const dates = computeNetlifySubscriptionDates(
        now,
        isCategoryPlan
          ? existingCatExpiry
          : existingClassExpiry || (!existingStudentDoc?.classSubscriptions ? (currentExpiresAt || existingStudentDoc?.planExpiresAt) : undefined),
        planItem.validityDays
      );
      const startDateIso = dates.startDateIso;
      const expiryDateIso = dates.expiryDateIso;
      const daysRemaining = dates.daysRemaining;

      const verifiedAmount = planItem.amountInr;
      const planTitle = isCategoryPlan
        ? `${planItem.title} – ₹${verifiedAmount} – ${planItem.validityDays} Days (${planItem.validityLabel})`
        : `PREMIUM PLAN (${resolvedBoard} • ${resolvedClass}) – ₹${verifiedAmount} – 365 Days (1 Year)`;
      const subscriptionTier = 'premium';
      const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;
      const resolvedMethod = captureCheck.method || payMethod || 'RAZORPAY';

      if (isCategoryPlan) {
        const { categorySubscriptions, activatedCategoryKeys } = buildUpdatedNetlifyCategorySubscriptions(
          existingStudentDoc,
          planItem,
          startDateIso,
          expiryDateIso,
          razorpay_payment_id,
          razorpay_order_id
        );
        const transactionRecord = {
          id: `tx_${razorpay_payment_id}`,
          receiptNumber,
          studentId: String(studentId),
          studentName: String(studentName || 'Student'),
          parentEmail: String(email || ''),
          parentMobile: String(mobile || ''),
          planId: 'premium',
          planSku: resolvedSku,
          activatedCategories: planItem.unlockedCategories,
          planTitle,
          amount: verifiedAmount,
          currency: 'INR',
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          method: resolvedMethod,
          status: 'SUCCESS',
          createdAt: now.toISOString(),
          verifiedAt: now.toISOString(),
          membershipStartDate: startDateIso,
          membershipExpiryDate: expiryDateIso
        };
        const membershipRecord = {
          membershipId: `mem_${razorpay_payment_id}`,
          studentId: String(studentId),
          studentName: String(studentName || 'Student'),
          activatedCategoryKeys,
          categorySubscriptions,
          planId: 'premium',
          planSku: resolvedSku,
          planTitle,
          amount: verifiedAmount,
          startDate: startDateIso,
          expiryDate: expiryDateIso,
          status: 'ACTIVE',
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          daysRemaining
        };
        processedPaymentIds.add(razorpay_payment_id);
        processedOrderIds.add(razorpay_order_id);
        transactionLedger.unshift(transactionRecord);
        await Promise.all([
          patchFirestoreDocument('students', String(studentId), {
            id: String(studentId),
            activatedCategoryKeys,
            categorySubscriptions,
            plan: 'premium',
            subscriptionTier,
            planLabel: planTitle,
            isLifetimeFree: false,
            planPurchasedAt: existingStudentDoc?.planPurchasedAt || startDateIso,
            planExpiresAt: existingStudentDoc?.planExpiresAt && existingStudentDoc.planExpiresAt > expiryDateIso ? existingStudentDoc.planExpiresAt : expiryDateIso,
            subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
            subscriptionStatus: 'ACTIVE',
            lastPaymentId: razorpay_payment_id,
            lastOrderId: razorpay_order_id,
            lastPaymentAmountInr: verifiedAmount,
            subscriptionUpdatedAt: now.toISOString()
          }),
          patchFirestoreDocument('transactions', `tx_${razorpay_payment_id}`, {
            ...transactionRecord,
            subscriptionTier,
            savedToFirestoreAt: now.toISOString()
          })
        ]);
        return jsonResponse(200, {
          success: true,
          alreadyProcessed: false,
          planSku: resolvedSku,
          activatedCategoryKeys,
          categorySubscriptions,
          transaction: transactionRecord,
          membership: membershipRecord
        });
      }

      const { existingMap, activatedClasses, activatedClassKeys, primaryBoard, primaryClassLevel } =
        buildUpdatedNetlifyClassSubscriptions(
          existingStudentDoc,
          resolvedBoard,
          resolvedClass,
          startDateIso,
          expiryDateIso,
          razorpay_payment_id,
          razorpay_order_id,
          verifiedAmount
        );

      const transactionRecord = {
        id: `tx_${razorpay_payment_id}`,
        receiptNumber,
        studentId: String(studentId),
        studentName: String(studentName || 'Student'),
        parentEmail: String(email || ''),
        parentMobile: String(mobile || ''),
        selectedBoard: resolvedBoard,
        selectedClass: resolvedClass,
        classLevel: resolvedClass,
        boardClassKey: targetKey,
        planId: 'premium',
        planSku: resolvedSku,
        planTitle,
        amount: verifiedAmount,
        currency: 'INR',
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        method: resolvedMethod,
        status: 'SUCCESS',
        createdAt: now.toISOString(),
        verifiedAt: now.toISOString(),
        membershipStartDate: startDateIso,
        membershipExpiryDate: expiryDateIso
      };

      const membershipRecord = {
        membershipId: `mem_${razorpay_payment_id}`,
        studentId: String(studentId),
        studentName: String(studentName || 'Student'),
        selectedBoard: resolvedBoard,
        selectedClass: resolvedClass,
        boardClassKey: targetKey,
        activatedClasses,
        activatedClassKeys,
        planId: 'premium',
        planSku: resolvedSku,
        planTitle,
        amount: verifiedAmount,
        startDate: startDateIso,
        expiryDate: expiryDateIso,
        status: 'ACTIVE',
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        daysRemaining
      };

      processedPaymentIds.add(razorpay_payment_id);
      processedOrderIds.add(razorpay_order_id);
      transactionLedger.unshift(transactionRecord);

      // Update Firestore student & transaction documents
      await Promise.all([
        patchFirestoreDocument('students', String(studentId), {
          id: String(studentId),
          board: resolvedBoard,
          classLevel: resolvedClass,
          primaryBoard,
          primaryClassLevel,
          activatedBoard: resolvedBoard,
          activatedClassLevel: resolvedClass,
          activatedClasses,
          activatedClassKeys,
          classSubscriptions: existingMap,
          plan: 'premium',
          subscriptionTier,
          planLabel: planTitle,
          isLifetimeFree: false,
          planPurchasedAt: startDateIso,
          planExpiresAt: expiryDateIso,
          subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
          subscriptionStatus: 'ACTIVE',
          lastPaymentId: razorpay_payment_id,
          lastOrderId: razorpay_order_id,
          lastPaymentAmountInr: verifiedAmount,
          subscriptionUpdatedAt: now.toISOString()
        }),
        patchFirestoreDocument('transactions', `tx_${razorpay_payment_id}`, {
          ...transactionRecord,
          subscriptionTier,
          savedToFirestoreAt: now.toISOString()
        })
      ]);

      return jsonResponse(200, {
        success: true,
        alreadyProcessed: false,
        planSku: resolvedSku,
        selectedBoard: resolvedBoard,
        selectedClass: resolvedClass,
        boardClassKey: targetKey,
        activatedClasses,
        activatedClassKeys,
        classSubscriptions: existingMap,
        transaction: transactionRecord,
        membership: membershipRecord
      });
    } catch (err) {
      return jsonResponse(500, {
        success: false,
        error: err?.message || 'Internal server error during payment verification.'
      });
    }
  }

  // 4. POST /api/razorpay/payment-failed
  if (method === 'POST' && normalizedPath === '/razorpay/payment-failed') {
    try {
      const body = JSON.parse(event.body || '{}');
      const {
        orderId,
        paymentId,
        planId = 'premium',
        studentId = 'unknown',
        studentName = 'Student',
        email = '',
        mobile = '',
        reason = 'Payment cancelled or declined'
      } = body;

      const failedTx = {
        id: `tx_failed_${Date.now()}`,
        receiptNumber: `FAIL-VC-${Date.now().toString().slice(-6)}`,
        studentId: String(studentId),
        studentName: String(studentName),
        parentEmail: String(email),
        parentMobile: String(mobile),
        planId: 'premium',
        planTitle: 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)',
        amount: 99,
        currency: 'INR',
        orderId: orderId || `ord_failed_${Date.now()}`,
        paymentId: paymentId || `pay_failed_${Date.now()}`,
        signature: 'failed_or_cancelled',
        method: 'RAZORPAY',
        status: 'FAILED',
        createdAt: new Date().toISOString(),
        reason
      };

      transactionLedger.unshift(failedTx);
      return jsonResponse(200, {
        success: true,
        recorded: true,
        transaction: failedTx
      });
    } catch (err) {
      return jsonResponse(500, {
        success: false,
        error: err?.message || 'Error recording failed payment.'
      });
    }
  }

  // 5. POST /api/razorpay/webhook or /functions/webhook
  if (
    method === 'POST' &&
    (normalizedPath === '/razorpay/webhook' || normalizedPath === '/webhook')
  ) {
    try {
      const signature =
        event.headers?.['x-razorpay-signature'] ||
        event.headers?.['X-Razorpay-Signature'];
      const rawBody = event.body || '';
      const creds = getResolvedRazorpayCredentials();

      if (!signature || (!creds.webhookSecret && !creds.keySecret)) {
        return jsonResponse(400, {
          status: 'error',
          message: 'Missing webhook signature or secret.'
        });
      }

      const secrets = creds.hasExplicitWebhookSecret && creds.webhookSecret
        ? [creds.webhookSecret]
        : creds.keySecret
        ? [creds.keySecret]
        : [];
      let validSig = false;
      for (const sec of secrets) {
        const expected = crypto
          .createHmac('sha256', sec)
          .update(rawBody)
          .digest('hex');
        if (
          expected.length === signature.trim().length &&
          crypto.timingSafeEqual(
            Buffer.from(expected, 'utf8'),
            Buffer.from(signature.trim(), 'utf8')
          )
        ) {
          validSig = true;
          break;
        }
      }

      if (!validSig) {
        return jsonResponse(400, {
          status: 'error',
          message: 'Invalid X-Razorpay-Signature.'
        });
      }

      const payload = JSON.parse(rawBody);
      const eventType = String(payload?.event || '');

      if (eventType === 'payment.captured' || eventType === 'order.paid') {
        const paymentEntity = payload?.payload?.payment?.entity || {};
        const orderEntity = payload?.payload?.order?.entity || {};
        const notes = {
          ...(orderEntity.notes || {}),
          ...(paymentEntity.notes || {})
        };
        const studentId = String(notes.studentId || '').trim();
        const paymentId = String(paymentEntity.id || '').trim();
        const orderId = String(
          paymentEntity.order_id || orderEntity.id || ''
        ).trim();
        const amountPaise = Number(
          paymentEntity.amount || orderEntity.amount || 0
        );
        const planId = 'premium';

        if (studentId && paymentId) {
          const resolvedSku = resolveNetlifyPlanSku(notes.planSku, notes.planId, amountPaise);
          const planItem = NETLIFY_PLAN_CATALOG[resolvedSku];
          const isCategoryPlan = planItem.unlockedCategories.length > 0;
          const now = new Date();
          const existingStudentDoc = await getFirestoreDocument('students', studentId);
          const resolvedBoard = normalizeNetlifyBoard(
            notes.selectedBoard || notes.board || existingStudentDoc?.board || 'Maharashtra'
          );
          const resolvedClass =
            normalizeNetlifyClassLevel(notes.selectedClass || notes.classLevel) ||
            normalizeNetlifyClassLevel(existingStudentDoc?.classLevel) ||
            'Class 1';
          const targetKey = buildNetlifyBoardClassKey(resolvedBoard, resolvedClass);
          const existingCatExpiry = isCategoryPlan
            ? existingStudentDoc?.categorySubscriptions?.[planItem.unlockedCategories[0]]?.expiresAt
            : undefined;
          const existingClassExpiry = !isCategoryPlan
            ? existingStudentDoc?.classSubscriptions?.[targetKey]?.expiresAt ||
              (resolvedBoard === 'Maharashtra' ? existingStudentDoc?.classSubscriptions?.[resolvedClass]?.expiresAt : undefined)
            : undefined;
          const dates = computeNetlifySubscriptionDates(now, isCategoryPlan ? existingCatExpiry : existingClassExpiry, planItem.validityDays);
          const startDateIso = dates.startDateIso;
          const expiryDateIso = dates.expiryDateIso;
          const amountInr = planItem.amountInr;
          const planTitle = isCategoryPlan
            ? `${planItem.title} – ₹${amountInr} – ${planItem.validityDays} Days (${planItem.validityLabel})`
            : `PREMIUM PLAN (${resolvedBoard} • ${resolvedClass}) – ₹${amountInr} – 365 Days (1 Year)`;

          if (isCategoryPlan) {
            const { categorySubscriptions, activatedCategoryKeys } = buildUpdatedNetlifyCategorySubscriptions(
              existingStudentDoc,
              planItem,
              startDateIso,
              expiryDateIso,
              paymentId,
              orderId
            );
            await patchFirestoreDocument('students', studentId, {
              id: studentId,
              activatedCategoryKeys,
              categorySubscriptions,
              plan: planId,
              subscriptionTier: 'premium',
              planLabel: planTitle,
              isLifetimeFree: false,
              planPurchasedAt: existingStudentDoc?.planPurchasedAt || startDateIso,
              planExpiresAt: existingStudentDoc?.planExpiresAt && existingStudentDoc.planExpiresAt > expiryDateIso ? existingStudentDoc.planExpiresAt : expiryDateIso,
              subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
              subscriptionStatus: 'ACTIVE',
              lastPaymentId: paymentId,
              lastOrderId: orderId,
              lastPaymentAmountInr: amountInr,
              subscriptionUpdatedAt: now.toISOString()
            });
            return jsonResponse(200, {
              status: 'ok',
              event: eventType,
              studentId,
              planSku: resolvedSku,
              activatedCategoryKeys,
              plan: planId,
              planExpiresAt: expiryDateIso,
              validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
            });
          }

          const { existingMap, activatedClasses, activatedClassKeys, primaryBoard, primaryClassLevel } =
            buildUpdatedNetlifyClassSubscriptions(
              existingStudentDoc,
              resolvedBoard,
              resolvedClass,
              startDateIso,
              expiryDateIso,
              paymentId,
              orderId,
              amountInr
            );

          await patchFirestoreDocument('students', studentId, {
            id: studentId,
            board: resolvedBoard,
            classLevel: resolvedClass,
            primaryBoard,
            primaryClassLevel,
            activatedBoard: resolvedBoard,
            activatedClassLevel: resolvedClass,
            activatedClasses,
            activatedClassKeys,
            classSubscriptions: existingMap,
            plan: planId,
            subscriptionTier: 'premium',
            planLabel: planTitle,
            isLifetimeFree: false,
            planPurchasedAt: startDateIso,
            planExpiresAt: expiryDateIso,
            subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
            subscriptionStatus: 'ACTIVE',
            lastPaymentId: paymentId,
            lastOrderId: orderId,
            lastPaymentAmountInr: amountInr,
            subscriptionUpdatedAt: now.toISOString()
          });

          return jsonResponse(200, {
            status: 'ok',
            event: eventType,
            studentId,
            planSku: resolvedSku,
            selectedBoard: resolvedBoard,
            selectedClass: resolvedClass,
            boardClassKey: targetKey,
            activatedClasses,
            activatedClassKeys,
            plan: planId,
            planExpiresAt: expiryDateIso,
            validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
          });
        }
      }

      return jsonResponse(200, { status: 'ok', event: eventType });
    } catch (err) {
      return jsonResponse(500, {
        status: 'error',
        message: err?.message || 'Webhook processing error.'
      });
    }
  }

  // 5b. POST /api/auth/check-existing-account
  if (method === 'POST' && normalizedPath === '/auth/check-existing-account') {
    try {
      const body = JSON.parse(event.body || '{}');
      const cleanEmail = String(body.email || '').trim().toLowerCase();
      const cleanMobile = String(body.mobile || '').replace(/\D/g, '').slice(-10);
      const queryUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents:runQuery`;

      const querySingleField = async (fieldPath, val) => {
        if (!val) return null;
        const { db } = getNetlifyFirebaseAdmin();
        if (db) {
          const snap = await db.collection('students').where(fieldPath, '==', val).limit(1).get();
          if (snap.empty) return null;
          return { id: snap.docs[0].id, data: snap.docs[0].data() };
        }
        const qRes = await fetch(queryUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            structuredQuery: {
              from: [{ collectionId: 'students' }],
              where: {
                fieldFilter: {
                  field: { fieldPath },
                  op: 'EQUAL',
                  value: { stringValue: val }
                }
              },
              limit: 1
            }
          })
        });
        const rows = await qRes.json().catch(() => []);
        const doc = Array.isArray(rows) ? rows[0]?.document : null;
        if (!doc?.fields) return null;
        const parsed = {};
        for (const [k, fv] of Object.entries(doc.fields)) parsed[k] = fromFirestoreValue(fv);
        return { id: doc.name.split('/').pop(), data: parsed };
      };

      const [emailDoc, mobileDoc] = await Promise.all([
        cleanEmail ? querySingleField('email', cleanEmail) : Promise.resolve(null),
        cleanMobile.length >= 10 ? querySingleField('mobile', cleanMobile) : Promise.resolve(null)
      ]);

      if (!emailDoc && !mobileDoc) {
        return jsonResponse(200, { success: true, exists: false, matchedPair: false, activeClasses: [], activeClassKeys: [] });
      }
      if (emailDoc && mobileDoc && emailDoc.id === mobileDoc.id) {
        const todayIst = formatIstDateString(new Date());
        const map = emailDoc.data?.classSubscriptions || {};
        const activeClassKeys = [];
        const activeClassSet = new Set();
        for (const [k, r] of Object.entries(map)) {
          if (!r || r.plan === 'free') continue;
          if (!r.expiresAt || String(r.expiresAt).slice(0, 10) >= todayIst) {
            const parsed = parseNetlifyBoardClassKey(k);
            const b = normalizeNetlifyBoard(r.board || parsed?.board || emailDoc.data?.primaryBoard || emailDoc.data?.board || 'Maharashtra');
            const c = normalizeNetlifyClassLevel(r.classLevel || parsed?.classLevel || k);
            if (c) {
              activeClassKeys.push(buildNetlifyBoardClassKey(b, c));
              activeClassSet.add(c);
            }
          }
        }
        const activeClasses = VALID_NETLIFY_CLASSES.filter((c) => activeClassSet.has(c));
        return jsonResponse(200, {
          success: true,
          exists: true,
          matchedPair: true,
          accountRole: emailDoc.data?.accountRole === 'teacher' ? 'teacher' : 'student',
          primaryBoard: normalizeNetlifyBoard(emailDoc.data?.primaryBoard || emailDoc.data?.board || 'Maharashtra'),
          primaryClassLevel: emailDoc.data?.primaryClassLevel || emailDoc.data?.classLevel || 'Class 1',
          activeClasses,
          activeClassKeys
        });
      }
      return jsonResponse(200, {
        success: true,
        exists: true,
        matchedPair: false,
        mismatchField: emailDoc && !mobileDoc ? 'email' : 'mobile',
        activeClasses: [],
        activeClassKeys: []
      });
    } catch (err) {
      return jsonResponse(500, { success: false, error: err?.message });
    }
  }

  // 6. POST /api/subscription/sync
  if (method === 'POST' && normalizedPath === '/subscription/sync') {
    try {
      const body = JSON.parse(event.body || '{}');
      const cleanStudentId = String(body.studentId || '').trim();
      const requestedPlan = body.plan || 'free';
      const cleanPaymentId = String(body.paymentId || '').trim();
      const targetBoard = normalizeNetlifyBoard(body.selectedBoard || body.board || body.activatedBoard || 'Maharashtra');
      const targetClass =
        normalizeNetlifyClassLevel(body.selectedClass || body.activatedClassLevel) || 'Class 1';

      if (!cleanStudentId) {
        return jsonResponse(400, { success: false, error: 'studentId is required.' });
      }

      const { auth: adminAuth } = getNetlifyFirebaseAdmin();
      const isGuestOrDemo = cleanStudentId === 'guest' || cleanStudentId.startsWith('demo_');
      if (adminAuth && !isGuestOrDemo) {
        const authHeader = event.headers?.authorization || event.headers?.Authorization || '';
        if (!authHeader.startsWith('Bearer ')) {
          return jsonResponse(401, { success: false, error: 'Authentication Bearer token required.' });
        }
        try {
          const decoded = await adminAuth.verifyIdToken(authHeader.slice(7).trim());
          const existingStu = await getFirestoreDocument('students', cleanStudentId);
          const matchesOwner =
            decoded.uid === cleanStudentId || existingStu?.firebaseUid === decoded.uid;
          if (!matchesOwner && decoded.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL) {
            return jsonResponse(403, { success: false, error: 'Forbidden: Token mismatch.' });
          }
        } catch {
          return jsonResponse(401, { success: false, error: 'Invalid or expired authentication token.' });
        }
      }

      if (requestedPlan === 'basic' || requestedPlan === 'premium') {
        const isSynthetic =
          !cleanPaymentId ||
          cleanPaymentId.startsWith('pay_sim_') ||
          cleanPaymentId.startsWith('demo_') ||
          cleanPaymentId === 'simulated' ||
          cleanPaymentId.length < 6;
        if (isSynthetic) {
          return jsonResponse(403, {
            success: false,
            error: 'Paid Premium Plan requires a verified paymentId.'
          });
        }

        let verified = processedPaymentIds.has(cleanPaymentId);
        if (!verified) {
          const txDoc = await getFirestoreDocument('transactions', `tx_${cleanPaymentId}`);
          if (txDoc && txDoc.status === 'SUCCESS' && (!txDoc.studentId || txDoc.studentId === cleanStudentId)) {
            verified = true;
          }
        }
        if (!verified) {
          return jsonResponse(403, {
            success: false,
            error: 'Unverified paymentId. Premium subscription sync rejected.'
          });
        }
      }

      return jsonResponse(200, {
        success: true,
        subscription: {
          studentId: cleanStudentId,
          selectedBoard: targetBoard,
          selectedClass: targetClass,
          plan: requestedPlan === 'premium' || requestedPlan === 'basic' ? 'premium' : 'free',
          planPurchasedAt: body.planPurchasedAt,
          planExpiresAt: body.planExpiresAt,
          status: 'ACTIVE',
          updatedAt: new Date().toISOString()
        }
      });
    } catch (err) {
      return jsonResponse(500, { success: false, error: err?.message });
    }
  }

  // 6b. POST /api/subscription/switch-class
  if (method === 'POST' && normalizedPath === '/subscription/switch-class') {
    try {
      const body = JSON.parse(event.body || '{}');
      const cleanStudentId = String(body.studentId || '').trim();
      const targetClass = normalizeNetlifyClassLevel(
        body.targetClass || body.selectedClass || body.classLevel
      );
      if (!cleanStudentId || !targetClass) {
        return jsonResponse(400, { success: false, allowed: false, error: 'studentId and targetClass are required.' });
      }
      const { auth: adminAuth } = getNetlifyFirebaseAdmin();
      const isGuestOrDemo = cleanStudentId === 'guest' || cleanStudentId.startsWith('demo_');
      const docData = await getFirestoreDocument('students', cleanStudentId);
      if (adminAuth && !isGuestOrDemo) {
        const authHeader = event.headers?.authorization || event.headers?.Authorization || '';
        if (!authHeader.startsWith('Bearer ')) {
          return jsonResponse(401, { success: false, allowed: false, error: 'Authentication Bearer token required.' });
        }
        try {
          const decoded = await adminAuth.verifyIdToken(authHeader.slice(7).trim());
          const matchesOwner =
            decoded.uid === cleanStudentId || docData?.firebaseUid === decoded.uid;
          if (!matchesOwner && decoded.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL) {
            return jsonResponse(403, { success: false, allowed: false, error: 'Forbidden: Token mismatch.' });
          }
        } catch {
          return jsonResponse(401, { success: false, allowed: false, error: 'Invalid or expired authentication token.' });
        }
      }

      const targetBoard = normalizeNetlifyBoard(
        body.targetBoard || body.selectedBoard || body.board || docData?.board || 'Maharashtra'
      );
      const targetKey = buildNetlifyBoardClassKey(targetBoard, targetClass);
      const primaryBoard = normalizeNetlifyBoard(docData?.primaryBoard || docData?.board || 'Maharashtra');
      const primaryClass = normalizeNetlifyClassLevel(docData?.primaryClassLevel || docData?.classLevel) || 'Class 1';
      const entry =
        docData?.classSubscriptions?.[targetKey] ||
        (targetBoard === 'Maharashtra' ? docData?.classSubscriptions?.[targetClass] : undefined);
      const todayIst = formatIstDateString(new Date());
      const allClassesEntry = docData?.categorySubscriptions?.all_classes;
      const isAllClassesActive =
        allClassesEntry &&
        allClassesEntry.status === 'ACTIVE' &&
        (!allClassesEntry.expiresAt || String(allClassesEntry.expiresAt).slice(0, 10) >= todayIst);
      const isPaidActive =
        isAllClassesActive ||
        (entry &&
          entry.plan !== 'free' &&
          (!entry.expiresAt || String(entry.expiresAt).slice(0, 10) >= todayIst));
      const isAccessible = isPaidActive || (targetBoard === primaryBoard && targetClass === primaryClass);

      if (!isAccessible) {
        return jsonResponse(403, {
          success: false,
          allowed: false,
          needsPurchase: !entry,
          needsRenewal: Boolean(entry),
          targetBoard,
          targetClass,
          boardClassKey: targetKey,
          error: `${targetBoard} • ${targetClass} is locked. Activate or renew for ₹99 (365 Days).`
        });
      }

      if (!isGuestOrDemo) {
        await patchFirestoreDocument('students', cleanStudentId, { board: targetBoard, classLevel: targetClass });
      }
      return jsonResponse(200, {
        success: true,
        allowed: true,
        selectedBoard: targetBoard,
        selectedClass: targetClass,
        boardClassKey: targetKey
      });
    } catch (err) {
      return jsonResponse(500, { success: false, allowed: false, error: err?.message });
    }
  }

  // Reusable Firebase Bearer auth + student ownership check (mirrors server.ts)
  async function verifyNetlifyStudentOwnershipOrAdmin(reqEvent, targetStudentId) {
    const cleanTargetId = String(targetStudentId || '').trim();
    if (!cleanTargetId) {
      return { authorized: false, statusCode: 400, error: 'studentId is required.' };
    }
    const authHeader = reqEvent.headers?.authorization || reqEvent.headers?.Authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return { authorized: false, statusCode: 401, error: 'Authorization Bearer token required.' };
    }
    const token = authHeader.slice(7).trim();
    if (!token || token.length < 20) {
      return { authorized: false, statusCode: 401, error: 'Invalid Authorization Bearer token format.' };
    }
    const { auth: adminAuth } = getNetlifyFirebaseAdmin();
    if (!adminAuth) {
      return {
        authorized: false,
        statusCode: 503,
        error: 'Firebase Admin Auth is not configured on the server to verify authentication tokens.'
      };
    }
    try {
      const decoded = await adminAuth.verifyIdToken(token, true);
      if (decoded.uid === cleanTargetId) {
        return { authorized: true, statusCode: 200, uid: decoded.uid };
      }
      const docData = await getFirestoreDocument('students', cleanTargetId);
      if (docData?.firebaseUid === decoded.uid) {
        return { authorized: true, statusCode: 200, uid: decoded.uid };
      }
      if (decoded.email?.toLowerCase() === AUTHORIZED_ADMIN_EMAIL && decoded.email_verified) {
        return { authorized: true, statusCode: 200, uid: decoded.uid };
      }
      return {
        authorized: false,
        statusCode: 403,
        error: 'Forbidden: Authenticated user does not own this student account.'
      };
    } catch {
      return { authorized: false, statusCode: 401, error: 'Invalid or expired Firebase ID token.' };
    }
  }

  // 7. GET /api/subscription/status/:studentId (Protected by Firebase Bearer auth + ownership check)
  if (method === 'GET' && normalizedPath.startsWith('/subscription/status/')) {
    const studentId = normalizedPath.replace('/subscription/status/', '').trim();
    const ownerCheck = await verifyNetlifyStudentOwnershipOrAdmin(event, studentId);
    if (!ownerCheck.authorized) {
      return jsonResponse(ownerCheck.statusCode, {
        success: false,
        error: ownerCheck.error || 'Unauthorized access to subscription status.'
      });
    }
    const docData = await getFirestoreDocument('students', studentId);
    return jsonResponse(200, {
      success: true,
      subscription: {
        studentId,
        selectedBoard: normalizeNetlifyBoard(docData?.board || docData?.primaryBoard || 'Maharashtra'),
        selectedClass: docData?.classLevel || 'Class 1',
        primaryBoard: normalizeNetlifyBoard(docData?.primaryBoard || docData?.board || 'Maharashtra'),
        primaryClassLevel: docData?.primaryClassLevel || docData?.classLevel || 'Class 1',
        activatedClasses: docData?.activatedClasses || [],
        activatedClassKeys: docData?.activatedClassKeys || [],
        classSubscriptions: docData?.classSubscriptions || {},
        activatedCategoryKeys: docData?.activatedCategoryKeys || [],
        categorySubscriptions: docData?.categorySubscriptions || {},
        plan: docData?.plan || 'free',
        planPurchasedAt: docData?.planPurchasedAt || null,
        planExpiresAt: docData?.planExpiresAt || null,
        status: 'ACTIVE'
      }
    });
  }

  // 7b. GET /api/worksheets/access/:studentId (Synchronized with server.ts, protected by Bearer auth + ownership)
  if (method === 'GET' && normalizedPath.startsWith('/worksheets/access/')) {
    const studentId = normalizedPath.replace('/worksheets/access/', '').trim();
    const ownerCheck = await verifyNetlifyStudentOwnershipOrAdmin(event, studentId);
    if (!ownerCheck.authorized) {
      return jsonResponse(ownerCheck.statusCode, {
        success: false,
        error: ownerCheck.error || 'Unauthorized access to worksheet entitlements.'
      });
    }
    const docData = await getFirestoreDocument('students', studentId);
    const selectedBoard = normalizeNetlifyBoard(
      event.queryStringParameters?.selectedBoard ||
        event.queryStringParameters?.board ||
        docData?.board ||
        docData?.primaryBoard ||
        'Maharashtra'
    );
    const selectedClass =
      normalizeNetlifyClassLevel(event.queryStringParameters?.selectedClass || docData?.classLevel) ||
      'Class 1';
    const boardClassKey = buildNetlifyBoardClassKey(selectedBoard, selectedClass);
    const activatedClassKeys = Array.isArray(docData?.activatedClassKeys) ? docData.activatedClassKeys : [];
    const isPremium =
      docData?.plan === 'premium' ||
      activatedClassKeys.includes(boardClassKey) ||
      Boolean(docData?.classSubscriptions?.[boardClassKey]?.status === 'ACTIVE');
    return jsonResponse(200, {
      success: true,
      studentId,
      selectedBoard,
      selectedClass,
      effectivePlan: isPremium ? 'premium' : 'free',
      isPremium,
      printingAllowed: false,
      downloadingAllowed: false,
      activatedClassKeys
    });
  }

  // 7c. POST /api/worksheets/verify-access (Synchronized with server.ts, protected by Bearer auth + ownership)
  if (method === 'POST' && normalizedPath === '/worksheets/verify-access') {
    const body = JSON.parse(event.body || '{}');
    const cleanStudentId = String(body.studentId || '').trim();
    const cleanWorksheetId = String(body.worksheetId || '').trim();
    if (!cleanWorksheetId) {
      return jsonResponse(400, { success: false, allowed: false, error: 'worksheetId is required.' });
    }
    const isGuestOrDemo =
      !cleanStudentId || cleanStudentId === 'guest' || cleanStudentId.startsWith('demo_');
    if (!isGuestOrDemo) {
      const ownerCheck = await verifyNetlifyStudentOwnershipOrAdmin(event, cleanStudentId);
      if (!ownerCheck.authorized) {
        return jsonResponse(ownerCheck.statusCode, {
          success: false,
          allowed: false,
          error: ownerCheck.error || 'Unauthorized worksheet access verification.'
        });
      }
    }
    const docData = !isGuestOrDemo ? await getFirestoreDocument('students', cleanStudentId) : null;
    const selectedBoard = normalizeNetlifyBoard(body.selectedBoard || body.board || docData?.board || 'Maharashtra');
    const selectedClass = normalizeNetlifyClassLevel(body.selectedClass || docData?.classLevel) || 'Class 1';
    const boardClassKey = buildNetlifyBoardClassKey(selectedBoard, selectedClass);
    const activatedClassKeys = Array.isArray(docData?.activatedClassKeys) ? docData.activatedClassKeys : [];
    const isPremium =
      !isGuestOrDemo &&
      (docData?.plan === 'premium' ||
        activatedClassKeys.includes(boardClassKey) ||
        Boolean(docData?.classSubscriptions?.[boardClassKey]?.status === 'ACTIVE'));
    const isDemoWorksheet = /-1$/i.test(cleanWorksheetId) && /(ENGLISH|MATHEMATICS)/i.test(cleanWorksheetId);
    const allowed = isPremium || isDemoWorksheet;
    return jsonResponse(allowed ? 200 : 403, {
      success: allowed,
      allowed,
      studentId: cleanStudentId || 'guest',
      worksheetId: cleanWorksheetId,
      selectedBoard,
      selectedClass,
      effectivePlan: isPremium ? 'premium' : 'free'
    });
  }

  // 8. GET /api/payments/history (Protected by Verified Admin Auth)
  if (method === 'GET' && normalizedPath === '/payments/history') {
    const authHeader = event.headers?.authorization || event.headers?.Authorization || '';
    const { auth: adminAuth } = getNetlifyFirebaseAdmin();
    if (!authHeader.startsWith('Bearer ')) {
      return jsonResponse(401, { success: false, error: 'Administrator authentication required.' });
    }
    if (!adminAuth) {
      return jsonResponse(503, { success: false, error: 'Firebase Admin Auth is not configured.' });
    }
    try {
      const decoded = await adminAuth.verifyIdToken(authHeader.slice(7).trim(), true);
      if (decoded.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL || !decoded.email_verified) {
        return jsonResponse(403, { success: false, error: 'Verified administrator access required.' });
      }
    } catch {
      return jsonResponse(401, { success: false, error: 'Invalid or expired authentication token.' });
    }

    return jsonResponse(200, {
      success: true,
      transactions: transactionLedger
    });
  }

  // 9. REFERRAL SYSTEM ENDPOINTS FOR PUBLISHED MYSTUDYZONE.IN (/api/referrals/*)
  function generateUniqueNetlifyReferralCode(studentId) {
    const cleanId = String(studentId || '').trim();

    const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let h1 = 2166136261;
    let h2 = 16777619;
    const seed = cleanId || `stu_${Date.now()}`;
    for (let i = 0; i < seed.length; i++) {
      const ch = seed.charCodeAt(i);
      h1 ^= ch;
      h1 = Math.imul(h1, 16777619);
      h2 ^= ch + i * 31;
      h2 = Math.imul(h2, 1099511628211 & 0xffffffff);
    }
    const digitsPart = String((Math.abs(h1) % 900) + 100);
    let alphaPart = '';
    let temp = Math.abs(h2);
    for (let i = 0; i < 3; i++) {
      alphaPart += alphabet[temp % alphabet.length];
      temp = Math.floor(temp / alphabet.length) ^ (Math.abs(h1) >> (i * 3));
    }
    return `STUDY${digitsPart}${alphaPart}`;
  }

  async function resolveStudentReferralAccountNetlify(userId, fallbackName = 'Student Champion') {
    const cleanId = String(userId || '').trim();
    const [refDoc, stuDoc] = await Promise.all([
      getFirestoreDocument('referrals', cleanId),
      getFirestoreDocument('students', cleanId)
    ]);

    const rawCode = String(refDoc?.referralCode || stuDoc?.referralCode || '')
      .trim()
      .toUpperCase();
    const validExistingCode =
      rawCode && rawCode !== 'VC-STU-CHAMP' && rawCode !== 'DEFAULT' ? rawCode : '';
    const referralCode = validExistingCode || generateUniqueNetlifyReferralCode(cleanId);
    const referralLink = `https://mystudyzone.in/register?ref=${encodeURIComponent(referralCode)}`;
    const userName = String(refDoc?.userName || refDoc?.name || stuDoc?.name || fallbackName);
    const className = String(refDoc?.className || stuDoc?.classLevel || 'Class 5');

    const account = {
      id: `ref_acc_${cleanId}`,
      userId: cleanId,
      name: userName,
      userName,
      userRole: 'student',
      className,
      schoolName: String(refDoc?.schoolName || stuDoc?.schoolName || ''),
      city: String(refDoc?.city || 'Maharashtra'),
      email: String(refDoc?.email || stuDoc?.email || ''),
      mobile: String(refDoc?.mobile || stuDoc?.mobile || ''),
      referralCode,
      referralLink,
      referredByCode: refDoc?.referredByCode || stuDoc?.referredByCode || '',
      referredByUserId: refDoc?.referredByUserId || stuDoc?.referredByStudentId || '',
      totalInvitesSent: Number(refDoc?.totalInvitesSent || 0),
      totalSignups: Number(refDoc?.totalSignups || 0),
      successfulReferrals: Number(refDoc?.successfulReferrals || 0),
      pendingReferrals: Number(refDoc?.pendingReferrals || 0),
      totalEarnings: Number(refDoc?.totalEarnings || 0),
      availableWalletBalance: Number(refDoc?.availableWalletBalance || 0),
      withdrawnAmount: Number(refDoc?.withdrawnAmount || 0),
      pendingWithdrawalAmount: Number(refDoc?.pendingWithdrawalAmount || 0),
      freeMonthsEarned: Number(refDoc?.freeMonthsEarned || 0),
      totalXPBonus: Number(refDoc?.totalXPBonus || 0),
      currentTier: String(refDoc?.currentTier || 'None'),
      unlockedRewards: [],
      createdAt: String(refDoc?.createdAt || stuDoc?.registeredAt || new Date().toISOString()),
      updatedAt: new Date().toISOString()
    };

    if (!validExistingCode || !refDoc) {
      await Promise.all([
        patchFirestoreDocument('referrals', cleanId, account),
        patchFirestoreDocument('students', cleanId, {
          id: cleanId,
          referralCode,
          referralLink
        })
      ]);
    }

    return account;
  }

  // 9.1 GET /api/referrals/account/:userId
  if (method === 'GET' && normalizedPath.startsWith('/referrals/account/')) {
    const userId = decodeURIComponent(normalizedPath.replace('/referrals/account/', '').split('?')[0]);
    const account = await resolveStudentReferralAccountNetlify(userId);
    return jsonResponse(200, {
      success: true,
      account,
      transactions: [],
      payouts: [],
      payoutRequests: []
    });
  }

  // 9.2 POST /api/referrals/register
  if (method === 'POST' && normalizedPath === '/referrals/register') {
    const body = JSON.parse(event.body || '{}');
    const userId = String(body.userId || '').trim();
    if (!userId) {
      return jsonResponse(400, { success: false, error: 'User ID required.' });
    }
    const account = await resolveStudentReferralAccountNetlify(
      userId,
      body.userName || body.name || 'Student Champion'
    );
    return jsonResponse(200, {
      success: true,
      account
    });
  }

  // 9.3 POST /api/referrals/validate-code
  if (method === 'POST' && normalizedPath === '/referrals/validate-code') {
    const body = JSON.parse(event.body || '{}');
    const cleanCode = String(body.referralCode || body.code || '')
      .trim()
      .toUpperCase();
    const currentUserId = String(body.currentUserId || '').trim();

    if (!cleanCode || cleanCode === 'VC-STU-CHAMP') {
      return jsonResponse(200, {
        valid: false,
        message: 'Please enter a valid referral code.'
      });
    }

    // Query Firestore for matching referralCode
    try {
      const queryUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents:runQuery`;
      const qRes = await fetch(queryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'referrals' }],
            where: {
              fieldFilter: {
                field: { fieldPath: 'referralCode' },
                op: 'EQUAL',
                value: { stringValue: cleanCode }
              }
            },
            limit: 1
          }
        })
      });
      const qData = await qRes.json().catch(() => []);
      const docFound = Array.isArray(qData) && qData[0]?.document?.fields;
      if (docFound) {
        const ownerId = docFound.userId?.stringValue || '';
        const ownerName = docFound.userName?.stringValue || docFound.name?.stringValue || 'Student Champion';
        const ownerClass = docFound.className?.stringValue || 'Student';
        if (currentUserId && ownerId === currentUserId) {
          return jsonResponse(200, {
            valid: false,
            message: 'Self-referral is not allowed. You cannot use your own referral code.'
          });
        }
        return jsonResponse(200, {
          valid: true,
          code: cleanCode,
          referralCode: cleanCode,
          referrerUserId: ownerId,
          referrerName: ownerName,
          referrerClass: ownerClass,
          plan99Cashback: 5,
          message: `Valid code! Referred by ${ownerName}.`
        });
      }
    } catch {
      // Ignore query error
    }

    return jsonResponse(200, {
      valid: false,
      message: 'Invalid referral code. Please check the code and try again.'
    });
  }

  // 9.4 POST /api/referrals/track-signup
  if (method === 'POST' && normalizedPath === '/referrals/track-signup') {
    const body = JSON.parse(event.body || '{}');
    const newUserId = String(body.newUserId || body.newStudentId || '').trim();
    const newUserName = String(body.newUserName || 'Student Champion');
    const referralCodeUsed = String(body.referralCodeUsed || body.referralCode || '')
      .trim()
      .toUpperCase();

    if (!newUserId) {
      return jsonResponse(400, { success: false, error: 'newUserId is required.' });
    }

    const newAcc = await resolveStudentReferralAccountNetlify(newUserId, newUserName);
    if (referralCodeUsed && referralCodeUsed !== newAcc.referralCode) {
      await Promise.all([
        patchFirestoreDocument('students', newUserId, {
          id: newUserId,
          referredByCode: referralCodeUsed
        }),
        patchFirestoreDocument('referrals', newUserId, {
          userId: newUserId,
          referredByCode: referralCodeUsed
        })
      ]);
    }

    return jsonResponse(200, {
      success: true,
      tracked: Boolean(referralCodeUsed),
      account: newAcc
    });
  }

  // 9.5 POST /api/referrals/invite-click
  if (method === 'POST' && normalizedPath === '/referrals/invite-click') {
    return jsonResponse(200, { success: true });
  }

  // 9.6 GET /api/referrals/leaderboard
  if (method === 'GET' && normalizedPath === '/referrals/leaderboard') {
    try {
      const queryUrl = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/${FIRESTORE_DATABASE_ID}/documents:runQuery`;
      const qRes = await fetch(queryUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          structuredQuery: {
            from: [{ collectionId: 'referrals' }],
            limit: 50
          }
        })
      });
      const rows = await qRes.json().catch(() => []);
      const parsed = Array.isArray(rows)
        ? rows
            .map((r) => r?.document?.fields)
            .filter(Boolean)
            .map((f) => ({
              userId: f.userId?.stringValue || '',
              userName: f.userName?.stringValue || f.name?.stringValue || 'Student Champion',
              className: f.className?.stringValue || 'Student',
              schoolName: f.schoolName?.stringValue || 'MyStudyZone Academy',
              city: f.city?.stringValue || 'Maharashtra',
              successfulReferrals: Number(f.successfulReferrals?.integerValue || f.successfulReferrals?.doubleValue || 0),
              totalEarnings: Number(f.totalEarnings?.integerValue || f.totalEarnings?.doubleValue || 0),
              currentTier: f.currentTier?.stringValue || 'None'
            }))
            .filter((item) => item.successfulReferrals > 0)
            .sort((a, b) => b.successfulReferrals - a.successfulReferrals)
            .slice(0, 10)
            .map((item, idx) => ({ rank: idx + 1, ...item }))
        : [];
      return jsonResponse(200, { success: true, leaderboard: parsed });
    } catch {
      return jsonResponse(200, { success: true, leaderboard: [] });
    }
  }

  // 10. Single Device Session Management Endpoints (Netlify Production Parity)
  const reqHeaders = event.headers || {};
  const getHeader = (name) => {
    const lower = name.toLowerCase();
    for (const [k, v] of Object.entries(reqHeaders)) {
      if (k.toLowerCase() === lower) return String(v || '');
    }
    return '';
  };

  if (method === 'POST' && normalizedPath === '/auth/session/acquire') {
    try {
      const body = JSON.parse(event.body || '{}');
      const userId = String(body.userId || '').trim();
      const deviceId = String(body.deviceId || getHeader('x-device-id')).trim();
      const hardwareSignature = String(body.hardwareSignature || getHeader('x-hardware-signature')).trim();
      const deviceSignature = String(body.deviceSignature || getHeader('x-device-signature')).trim();

      if (!userId || deviceId.length < 6 || hardwareSignature.length < 8 || deviceSignature.length < 8) {
        return jsonResponse(400, {
          success: false,
          allowed: false,
          code: 'INVALID_INPUT',
          error: 'Valid userId and device signatures are required.'
        });
      }

      const nowMs = Date.now();
      const nowIso = new Date(nowMs).toISOString();
      const existing =
        (await getFirestoreDocument('device_sessions', userId)) ||
        netlifyDeviceSessions.get(userId) ||
        null;

      if (existing && existing.status === 'ACTIVE' && Number(existing.expiresAtMs || 0) > nowMs) {
        const sameDevice =
          existing.deviceId === deviceId &&
          existing.hardwareSignature === hardwareSignature &&
          existing.deviceSignature === deviceSignature;
        if (!sameDevice) {
          return jsonResponse(403, {
            success: false,
            allowed: false,
            code: 'DEVICE_SESSION_ACTIVE_ELSEWHERE',
            error: SINGLE_DEVICE_BLOCK_MESSAGE
          });
        }

        const resumed = {
          ...existing,
          lastActivityAt: nowIso,
          expiresAt: new Date(nowMs + SESSION_INACTIVITY_TTL_MS).toISOString(),
          expiresAtMs: nowMs + SESSION_INACTIVITY_TTL_MS
        };
        netlifyDeviceSessions.set(userId, resumed);
        await patchFirestoreDocument('device_sessions', userId, resumed);
        return jsonResponse(200, { success: true, allowed: true, resumed: true, session: resumed });
      }

      const fresh = {
        userId,
        firebaseUid: body.firebaseUid || undefined,
        email: String(body.email || '').trim().toLowerCase(),
        studentName: String(body.studentName || 'Student').slice(0, 100),
        accountRole: body.accountRole === 'teacher' ? 'teacher' : 'student',
        activeSessionId: `sess_${crypto.randomBytes(20).toString('hex')}`,
        deviceId,
        hardwareSignature,
        deviceSignature,
        deviceName: String(body.deviceName || 'Registered Browser').slice(0, 120),
        deviceType: body.deviceType || 'Desktop',
        browser: String(body.browser || 'Browser').slice(0, 60),
        os: String(body.os || 'Unknown OS').slice(0, 60),
        userAgentSummary: String(body.userAgentSummary || '').slice(0, 200),
        status: 'ACTIVE',
        loginAt: nowIso,
        lastActivityAt: nowIso,
        expiresAt: new Date(nowMs + SESSION_INACTIVITY_TTL_MS).toISOString(),
        expiresAtMs: nowMs + SESSION_INACTIVITY_TTL_MS
      };
      netlifyDeviceSessions.set(userId, fresh);
      await patchFirestoreDocument('device_sessions', userId, fresh);
      return jsonResponse(200, { success: true, allowed: true, resumed: false, session: fresh });
    } catch (err) {
      return jsonResponse(500, { success: false, allowed: false, error: err?.message });
    }
  }

  if (method === 'POST' && normalizedPath === '/auth/session/validate') {
    const body = JSON.parse(event.body || '{}');
    const userId = String(body.userId || '').trim();
    const activeSessionId = String(body.activeSessionId || getHeader('x-session-id')).trim();
    const deviceId = String(body.deviceId || getHeader('x-device-id')).trim();
    const hardwareSignature = String(body.hardwareSignature || getHeader('x-hardware-signature')).trim();
    const deviceSignature = String(body.deviceSignature || getHeader('x-device-signature')).trim();
    const nowMs = Date.now();
    const existing =
      (await getFirestoreDocument('device_sessions', userId)) ||
      netlifyDeviceSessions.get(userId) ||
      null;

    if (!existing) {
      if (body.allowBootstrapIfMissing && deviceId.length >= 6 && hardwareSignature.length >= 8) {
        const nowIso = new Date(nowMs).toISOString();
        const fresh = {
          userId,
          firebaseUid: body.firebaseUid || undefined,
          email: String(body.email || '').trim().toLowerCase(),
          studentName: String(body.studentName || 'Student').slice(0, 100),
          accountRole: body.accountRole === 'teacher' ? 'teacher' : 'student',
          activeSessionId: `sess_${crypto.randomBytes(20).toString('hex')}`,
          deviceId,
          hardwareSignature,
          deviceSignature,
          deviceName: String(body.deviceName || 'Registered Browser').slice(0, 120),
          deviceType: body.deviceType || 'Desktop',
          browser: String(body.browser || 'Browser').slice(0, 60),
          os: String(body.os || 'Unknown OS').slice(0, 60),
          userAgentSummary: String(body.userAgentSummary || '').slice(0, 200),
          status: 'ACTIVE',
          loginAt: nowIso,
          lastActivityAt: nowIso,
          expiresAt: new Date(nowMs + SESSION_INACTIVITY_TTL_MS).toISOString(),
          expiresAtMs: nowMs + SESSION_INACTIVITY_TTL_MS
        };
        netlifyDeviceSessions.set(userId, fresh);
        await patchFirestoreDocument('device_sessions', userId, fresh);
        return jsonResponse(200, { success: true, valid: true, bootstrapped: true, session: fresh });
      }
      return jsonResponse(401, { success: false, valid: false, reason: 'NO_ACTIVE_SESSION', error: SINGLE_DEVICE_BLOCK_MESSAGE });
    }

    if (existing.status === 'TERMINATED') {
      return jsonResponse(401, { success: false, valid: false, reason: 'TERMINATED', error: 'Your session was logged out or terminated. Please log in again.' });
    }
    if (existing.status === 'EXPIRED' || Number(existing.expiresAtMs || 0) <= nowMs) {
      return jsonResponse(401, { success: false, valid: false, reason: 'EXPIRED', error: 'Your session expired due to inactivity. Please log in again.' });
    }
    const sameHw =
      existing.deviceId === deviceId &&
      existing.hardwareSignature === hardwareSignature &&
      existing.deviceSignature === deviceSignature;
    const sameSess = !activeSessionId || existing.activeSessionId === activeSessionId;
    if (!sameHw || !sameSess) {
      return jsonResponse(401, { success: false, valid: false, reason: 'HARDWARE_OR_SESSION_MISMATCH', error: SINGLE_DEVICE_BLOCK_MESSAGE });
    }
    return jsonResponse(200, { success: true, valid: true, session: existing });
  }

  if (method === 'POST' && normalizedPath === '/auth/session/heartbeat') {
    const body = JSON.parse(event.body || '{}');
    const userId = String(body.userId || '').trim();
    const activeSessionId = String(body.activeSessionId || getHeader('x-session-id')).trim();
    const deviceId = String(body.deviceId || getHeader('x-device-id')).trim();
    const hardwareSignature = String(body.hardwareSignature || getHeader('x-hardware-signature')).trim();
    const deviceSignature = String(body.deviceSignature || getHeader('x-device-signature')).trim();
    const nowMs = Date.now();
    const existing =
      (await getFirestoreDocument('device_sessions', userId)) ||
      netlifyDeviceSessions.get(userId) ||
      null;
    if (
      !existing ||
      existing.status !== 'ACTIVE' ||
      Number(existing.expiresAtMs || 0) <= nowMs ||
      existing.activeSessionId !== activeSessionId ||
      existing.deviceId !== deviceId ||
      existing.hardwareSignature !== hardwareSignature ||
      existing.deviceSignature !== deviceSignature
    ) {
      return jsonResponse(401, { success: false, valid: false, error: SINGLE_DEVICE_BLOCK_MESSAGE });
    }
    const updated = {
      ...existing,
      lastActivityAt: new Date(nowMs).toISOString(),
      expiresAt: new Date(nowMs + SESSION_INACTIVITY_TTL_MS).toISOString(),
      expiresAtMs: nowMs + SESSION_INACTIVITY_TTL_MS
    };
    netlifyDeviceSessions.set(userId, updated);
    await patchFirestoreDocument('device_sessions', userId, updated);
    return jsonResponse(200, { success: true, valid: true, session: updated });
  }

  if (method === 'POST' && normalizedPath === '/auth/session/release') {
    const body = JSON.parse(event.body || '{}');
    const userId = String(body.userId || '').trim();
    const activeSessionId = String(body.activeSessionId || getHeader('x-session-id')).trim();
    const hardwareSignature = String(body.hardwareSignature || getHeader('x-hardware-signature')).trim();
    const nowMs = Date.now();
    const nowIso = new Date(nowMs).toISOString();
    const existing =
      (await getFirestoreDocument('device_sessions', userId)) ||
      netlifyDeviceSessions.get(userId) ||
      null;
    if (existing) {
      if (existing.status === 'ACTIVE' && Number(existing.expiresAtMs || 0) > nowMs) {
        const matchSess = !activeSessionId || existing.activeSessionId === activeSessionId;
        const matchHw = !hardwareSignature || existing.hardwareSignature === hardwareSignature;
        if (!matchSess || !matchHw) {
          return jsonResponse(403, {
            success: false,
            released: false,
            error: SINGLE_DEVICE_BLOCK_MESSAGE
          });
        }
      }
      const terminated = {
        ...existing,
        status: 'TERMINATED',
        terminatedBy: 'USER_LOGOUT',
        terminatedAt: nowIso,
        terminationReason: body.reason || 'Logged out by user',
        expiresAt: nowIso,
        expiresAtMs: nowMs
      };
      netlifyDeviceSessions.set(userId, terminated);
      await patchFirestoreDocument('device_sessions', userId, terminated);
    }
    return jsonResponse(200, { success: true, released: true });
  }

  if (method === 'POST' && normalizedPath === '/auth/session/recover') {
    const body = JSON.parse(event.body || '{}');
    const authHeader = getHeader('authorization');
    const { auth: adminAuth } = getNetlifyFirebaseAdmin();
    if (adminAuth) {
      if (!authHeader.startsWith('Bearer ')) {
        return jsonResponse(401, { success: false, error: 'Verified Firebase login required for device recovery.' });
      }
      try {
        await adminAuth.verifyIdToken(authHeader.slice(7).trim());
      } catch {
        return jsonResponse(401, { success: false, error: 'Invalid or expired authentication token.' });
      }
    }

    const userId = String(body.userId || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const providedMobile = String(body.mobile || '').replace(/\D/g, '').slice(-10);
    if (!userId || !email || providedMobile.length !== 10) {
      return jsonResponse(400, { success: false, error: 'Valid email and 10-digit mobile number are required.' });
    }
    const studentDoc = await getFirestoreDocument('students', userId);
    if (studentDoc?.mobile) {
      const storedMob = String(studentDoc.mobile).replace(/\D/g, '').slice(-10);
      if (storedMob.length === 10 && storedMob !== providedMobile) {
        return jsonResponse(403, { success: false, error: 'Entered mobile number does not match the registered mobile number.' });
      }
    }

    const nowMs = Date.now();
    const nowIso = new Date(nowMs).toISOString();
    const existing =
      (await getFirestoreDocument('device_sessions', userId)) ||
      netlifyDeviceSessions.get(userId) ||
      null;

    let nextRecoveryCount = 1;
    if (existing?.lastRecoveryAt) {
      const lastRecMs = Date.parse(existing.lastRecoveryAt) || 0;
      if (nowMs - lastRecMs < 24 * 60 * 60 * 1000) {
        const currCount = Number(existing.recoveryCount24h || 0);
        if (currCount >= 3) {
          return jsonResponse(429, {
            success: false,
            error: 'Device recovery limit reached (max 3 recoveries per 24 hours). Please contact MyStudyZone support or wait 24 hours.'
          });
        }
        nextRecoveryCount = currCount + 1;
      }
    }

    const recovered = {
      userId,
      firebaseUid: body.firebaseUid || existing?.firebaseUid || undefined,
      email,
      studentName: String(body.studentName || existing?.studentName || 'Student').slice(0, 100),
      accountRole: body.accountRole === 'teacher' ? 'teacher' : 'student',
      activeSessionId: `sess_${crypto.randomBytes(20).toString('hex')}`,
      deviceId: String(body.deviceId || getHeader('x-device-id')),
      hardwareSignature: String(body.hardwareSignature || getHeader('x-hardware-signature')),
      deviceSignature: String(body.deviceSignature || getHeader('x-device-signature')),
      deviceName: String(body.deviceName || 'Recovered Device').slice(0, 120),
      deviceType: body.deviceType || 'Desktop',
      browser: String(body.browser || 'Browser').slice(0, 60),
      os: String(body.os || 'Unknown OS').slice(0, 60),
      userAgentSummary: String(body.userAgentSummary || '').slice(0, 200),
      status: 'ACTIVE',
      loginAt: nowIso,
      lastActivityAt: nowIso,
      expiresAt: new Date(nowMs + SESSION_INACTIVITY_TTL_MS).toISOString(),
      expiresAtMs: nowMs + SESSION_INACTIVITY_TTL_MS,
      lastRecoveryAt: nowIso,
      recoveryCount24h: nextRecoveryCount
    };
    netlifyDeviceSessions.set(userId, recovered);
    await patchFirestoreDocument('device_sessions', userId, recovered);
    return jsonResponse(200, { success: true, session: recovered });
  }

  if (method === 'GET' && normalizedPath === '/admin/sessions') {
    const authHeader = getHeader('authorization');
    const { auth: adminAuth, db: adminDb } = getNetlifyFirebaseAdmin();
    if (!adminAuth || !authHeader.startsWith('Bearer ')) {
      return jsonResponse(401, { success: false, error: 'Administrator authentication required.' });
    }
    try {
      const decoded = await adminAuth.verifyIdToken(authHeader.slice(7).trim());
      if (decoded.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL || !decoded.email_verified) {
        return jsonResponse(403, { success: false, error: 'Forbidden.' });
      }
      const snap = await adminDb.collection('device_sessions').limit(500).get();
      const sessions = snap.docs.map((d) => d.data());
      return jsonResponse(200, { success: true, totalCount: sessions.length, sessions });
    } catch {
      return jsonResponse(401, { success: false, error: 'Invalid admin token.' });
    }
  }

  if (method === 'POST' && normalizedPath === '/admin/sessions/terminate') {
    const authHeader = getHeader('authorization');
    const { auth: adminAuth } = getNetlifyFirebaseAdmin();
    if (!adminAuth || !authHeader.startsWith('Bearer ')) {
      return jsonResponse(401, { success: false, error: 'Administrator authentication required.' });
    }
    try {
      const decoded = await adminAuth.verifyIdToken(authHeader.slice(7).trim());
      if (decoded.email?.toLowerCase() !== AUTHORIZED_ADMIN_EMAIL || !decoded.email_verified) {
        return jsonResponse(403, { success: false, error: 'Forbidden.' });
      }
      const body = JSON.parse(event.body || '{}');
      const userId = String(body.userId || '').trim();
      if (!userId) return jsonResponse(400, { success: false, error: 'userId is required.' });
      const nowMs = Date.now();
      const nowIso = new Date(nowMs).toISOString();
      const existing = (await getFirestoreDocument('device_sessions', userId)) || {};
      const terminated = {
        ...existing,
        userId,
        activeSessionId: `terminated_${crypto.randomBytes(10).toString('hex')}`,
        status: 'TERMINATED',
        terminatedBy: 'ADMIN',
        terminatedAt: nowIso,
        terminationReason: String(body.reason || 'Terminated by administrator'),
        expiresAt: nowIso,
        expiresAtMs: nowMs
      };
      netlifyDeviceSessions.set(userId, terminated);
      await patchFirestoreDocument('device_sessions', userId, terminated);
      return jsonResponse(200, { success: true, session: terminated });
    } catch {
      return jsonResponse(401, { success: false, error: 'Invalid admin token.' });
    }
  }

  if (method === 'GET' && normalizedPath === '/support/status') {
    return jsonResponse(200, getSupportAiStatus());
  }

  if (method === 'POST' && normalizedPath === '/support/chat') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const clientIp =
      String(
        event.headers?.['x-nf-client-connection-ip'] ||
          event.headers?.['x-forwarded-for'] ||
          'unknown'
      )
        .split(',')[0]
        .trim() || 'unknown';
    const payload = await handleSupportChatRequest(body, clientIp);
    return jsonResponse(payload.success ? 200 : 400, payload);
  }

  if (method === 'POST' && normalizedPath === '/support/tickets') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const clientIp =
      String(
        event.headers?.['x-nf-client-connection-ip'] ||
          event.headers?.['x-forwarded-for'] ||
          'unknown'
      )
        .split(',')[0]
        .trim() || 'unknown';
    const authHeader =
      event.headers?.authorization || event.headers?.Authorization || undefined;
    const result = await handleSupportTicketSubmission(
      body,
      { authorization: authHeader },
      clientIp
    );
    return jsonResponse(result.statusCode, result.payload);
  }

  // Centralized Gemini AI Studio routes (Student 30 Tools, Teacher 40 Tools, Core AI Studio)
  if (method === 'GET' && normalizedPath === '/ai/status') {
    return jsonResponse(200, getAiServiceStatus());
  }

  if (method === 'POST' && normalizedPath === '/ai/generate') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const clientIp =
      String(
        event.headers?.['x-nf-client-connection-ip'] ||
          event.headers?.['x-forwarded-for'] ||
          'unknown'
      )
        .split(',')[0]
        .trim() || 'unknown';
    const result = await handleAiTextGenerate(body, clientIp);
    return jsonResponse(result.statusCode, result.payload);
  }

  if (method === 'POST' && normalizedPath === '/ai/image') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const clientIp =
      String(
        event.headers?.['x-nf-client-connection-ip'] ||
          event.headers?.['x-forwarded-for'] ||
          'unknown'
      )
        .split(',')[0]
        .trim() || 'unknown';
    const result = await handleAiImageGenerate(body, clientIp);
    return jsonResponse(result.statusCode, result.payload);
  }

  // Centralized SnapSolve AI routes (Student & Teacher Portals)
  if (method === 'GET' && normalizedPath === '/snapsolve/status') {
    return jsonResponse(200, getSnapSolveStatus());
  }

  if (method === 'POST' && normalizedPath === '/snapsolve/recognize') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const clientIp =
      String(
        event.headers?.['x-nf-client-connection-ip'] ||
          event.headers?.['x-forwarded-for'] ||
          'unknown'
      )
        .split(',')[0]
        .trim() || 'unknown';
    const result = await handleSnapSolveRecognize(body, event.headers || {}, clientIp);
    return jsonResponse(result.statusCode, result.payload);
  }

  if (method === 'POST' && normalizedPath === '/snapsolve/solve') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const clientIp =
      String(
        event.headers?.['x-nf-client-connection-ip'] ||
          event.headers?.['x-forwarded-for'] ||
          'unknown'
      )
        .split(',')[0]
        .trim() || 'unknown';
    const result = await handleSnapSolveSolve(body, event.headers || {}, clientIp);
    return jsonResponse(result.statusCode, result.payload);
  }

  if (method === 'DELETE' && normalizedPath.startsWith('/snapsolve/session/')) {
    const sessionId = decodeURIComponent(normalizedPath.slice('/snapsolve/session/'.length)).trim();
    const result = await handleSnapSolveDeleteSession(sessionId, event.headers || {});
    return jsonResponse(result.statusCode, result.payload);
  }

  if (method === 'POST' && normalizedPath === '/study-library/verify-link') {
    let body = {};
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      body = {};
    }
    const rawUrl = String(body?.url || '').trim();
    let parsedUrl = null;
    try {
      parsedUrl = new URL(rawUrl);
    } catch {
      parsedUrl = null;
    }
    const host = parsedUrl ? parsedUrl.hostname.toLowerCase() : '';
    const isBlockedHost =
      !parsedUrl ||
      (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') ||
      host === 'localhost' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      host === '0.0.0.0' ||
      host === '::1' ||
      host === '[::1]' ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host);

    if (isBlockedHost) {
      return jsonResponse(400, {
        success: false,
        ok: false,
        status: 0,
        url: rawUrl,
        error: 'Invalid or restricted URL.',
        checkedAt: new Date().toISOString()
      });
    }

    const targetUrl = parsedUrl.toString();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    try {
      let response = await fetch(targetUrl, {
        method: 'HEAD',
        redirect: 'follow',
        signal: controller.signal,
        headers: {
          'User-Agent': 'MyStudyZone-LinkVerifier/1.0 (+https://mystudyzone.in)'
        }
      }).catch(() => null);

      if (!response || response.status === 405 || response.status === 403 || response.status >= 500) {
        response = await fetch(targetUrl, {
          method: 'GET',
          redirect: 'follow',
          signal: controller.signal,
          headers: {
            'User-Agent': 'MyStudyZone-LinkVerifier/1.0 (+https://mystudyzone.in)',
            Range: 'bytes=0-1024'
          }
        });
      }

      const ok = response.status >= 200 && response.status < 400;
      return jsonResponse(200, {
        success: true,
        ok,
        status: response.status,
        url: rawUrl,
        finalUrl: response.url || targetUrl,
        contentType: response.headers.get('content-type') || 'unknown',
        checkedAt: new Date().toISOString()
      });
    } catch (err) {
      return jsonResponse(200, {
        success: true,
        ok: false,
        status: 0,
        url: rawUrl,
        finalUrl: targetUrl,
        error: err?.name === 'AbortError' ? 'Connection timed out after 5 seconds.' : 'Unable to reach destination server.',
        checkedAt: new Date().toISOString()
      });
    } finally {
      clearTimeout(timeoutId);
    }
  }

  return jsonResponse(404, {
    success: false,
    error: `API route not found: ${method} ${rawPath}`
  });
}
