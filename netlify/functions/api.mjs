import crypto from 'crypto';
import dotenv from 'dotenv';
import {
  initializeApp as initializeAdminApp,
  getApps as getAdminApps,
  cert as adminCert
} from 'firebase-admin/app';
import { getFirestore as getAdminFirestoreSdk } from 'firebase-admin/firestore';
import { getAuth as getAdminAuthSdk } from 'firebase-admin/auth';

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

function computeNetlifySubscriptionDates(now = new Date(), existingExpiresAt = null) {
  const purchasedDateIst = formatIstDateString(now);
  let baseDateIst = purchasedDateIst;
  if (existingExpiresAt) {
    const parsedExp = String(existingExpiresAt).slice(0, 10);
    if (/^\d{4}-\d{2}-\d{2}$/.test(parsedExp) && parsedExp > purchasedDateIst) {
      baseDateIst = parsedExp;
    }
  }
  const expiryDateIst = addDaysIst(baseDateIst, PAID_SUBSCRIPTION_VALIDITY_DAYS);
  const startMs = Date.parse(`${purchasedDateIst}T00:00:00Z`);
  const endMs = Date.parse(`${expiryDateIst}T00:00:00Z`);
  const daysRemaining = Math.max(1, Math.round((endMs - startMs) / (1000 * 60 * 60 * 24)));
  return {
    startDateIso: purchasedDateIst,
    expiryDateIso: expiryDateIst,
    daysRemaining,
    validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
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

function jsonResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers':
        'Content-Type, Authorization, X-Razorpay-Signature, x-session-id, x-device-id, x-device-signature, x-hardware-signature',
      'Cache-Control': 'no-store, no-cache, must-revalidate'
    },
    body: JSON.stringify(payload)
  };
}

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

function normalizeNetlifyClassLevel(raw) {
  const str = String(raw || '').trim();
  const m = /^(?:Class\s*)?(\d{1,2})(?:st|nd|rd|th)?$/i.exec(str);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return n >= 1 && n <= 10 ? `Class ${n}` : null;
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

function buildUpdatedNetlifyClassSubscriptions(existingDoc, targetClass, startDateIso, expiryDateIso, paymentId, orderId, amountInr = 99) {
  const existingMap =
    existingDoc?.classSubscriptions && typeof existingDoc.classSubscriptions === 'object'
      ? { ...existingDoc.classSubscriptions }
      : {};

  if (existingDoc?.plan && existingDoc.plan !== 'free') {
    const legacyCls =
      normalizeNetlifyClassLevel(existingDoc.activatedClassLevel) ||
      normalizeNetlifyClassLevel(existingDoc.classLevel) ||
      targetClass;
    if (!existingMap[legacyCls]) {
      existingMap[legacyCls] = {
        classLevel: legacyCls,
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

  existingMap[targetClass] = {
    classLevel: targetClass,
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
  const activatedClasses = VALID_NETLIFY_CLASSES.filter((cls) => {
    const rec = existingMap[cls];
    if (!rec || rec.plan === 'free') return false;
    const exp = String(rec.expiresAt || '').slice(0, 10);
    return !exp || exp >= todayIst;
  });

  const primaryClassLevel =
    normalizeNetlifyClassLevel(existingDoc?.primaryClassLevel) ||
    normalizeNetlifyClassLevel(existingDoc?.classLevel) ||
    targetClass;

  return { existingMap, activatedClasses, primaryClassLevel };
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
  if (event.httpMethod === 'OPTIONS') {
    return jsonResponse(200, { ok: true });
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
      const planId = rawPlan === 'premium' ? 'premium' : null;
      const { studentId, studentName, email, mobile, selectedClass, classLevel } = body;
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
          error: 'Invalid plan selected. Only the ₹99 Premium Plan is available.'
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

      const amountInPaise = 9900;
      const amountInRupees = 99;
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
            selectedClass: normalizedClass,
            classLevel: normalizedClass,
            planId: 'premium',
            subscriptionTier: 'premium',
            validityDays: '365'
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
      const planId = rawPlan === 'premium' ? 'premium' : null;
      const { studentId, studentName, email, mobile, selectedClass, classLevel } = body;
      const normalizedClass = normalizeNetlifyClassLevel(selectedClass || classLevel) || '';

      if (!studentId) {
        return jsonResponse(400, { success: false, error: 'Student authentication required.' });
      }

      if (!planId) {
        return jsonResponse(400, { success: false, error: 'Invalid plan selected. Only the ₹99 Premium Plan is available.' });
      }

      const creds = getResolvedRazorpayCredentials();
      if (!creds.isConfigured || !creds.keySecret) {
        return jsonResponse(500, {
          success: false,
          error: 'Razorpay LIVE API credentials are not configured in production environment variables.'
        });
      }

      const amountInPaise = 9900;
      const amountInRupees = 99;
      const planTitle = normalizedClass
        ? `PREMIUM PLAN (${normalizedClass}) – ₹99 – 365 Days`
        : 'PREMIUM PLAN – ₹99 – 365 Days (1 Year)';
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
            selectedClass: normalizedClass,
            classLevel: normalizedClass,
            planId: 'premium',
            subscriptionTier: 'premium',
            validityDays: '365'
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
      const { studentId, planId, studentName, email, mobile, selectedClass, classLevel } = params;

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

      const resolvedPlanId = 'premium';
      const expectedAmountPaise = 9900;
      const amountRupees = 99;

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
        const resolvedClass =
          normalizeNetlifyClassLevel(qrData?.notes?.selectedClass || qrData?.notes?.classLevel || selectedClass || classLevel) ||
          normalizeNetlifyClassLevel(existingStudentDoc?.classLevel) ||
          'Class 1';
        const existingClassExpiry = existingStudentDoc?.classSubscriptions?.[resolvedClass]?.expiresAt;
        const dates = computeNetlifySubscriptionDates(now, existingClassExpiry);
        const startDateIso = dates.startDateIso;
        const expiryDateIso = dates.expiryDateIso;
        const planTitle = `PREMIUM PLAN (${resolvedClass}) – ₹99 – 365 Days (1 Year)`;
        const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;
        const { existingMap, activatedClasses, primaryClassLevel } = buildUpdatedNetlifyClassSubscriptions(
          existingStudentDoc,
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
            classLevel: resolvedClass,
            primaryClassLevel,
            activatedClassLevel: resolvedClass,
            activatedClasses,
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
            selectedClass: resolvedClass,
            classLevel: resolvedClass,
            planId: resolvedPlanId,
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
          selectedClass: resolvedClass,
          activatedClasses,
          method: 'UPI',
          amount: amountRupees,
          transaction: {
            id: `tx_${paymentId}`,
            receiptNumber,
            studentId: String(studentId),
            studentName: String(studentName || 'Student'),
            selectedClass: resolvedClass,
            planId: resolvedPlanId,
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
            selectedClass: resolvedClass,
            activatedClasses,
            planId: resolvedPlanId,
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
        studentId,
        studentName,
        email,
        mobile,
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

      if (planId !== 'premium') {
        return jsonResponse(400, {
          success: false,
          error: 'Only the ₹99 Premium Plan is valid for subscription verification.'
        });
      }

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

      const expectedAmountPaise = 9900;
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

      // Compute exact 365-day expiry date in IST ONLY for the resolved selectedClass
      const now = new Date();
      const existingStudentDoc = await getFirestoreDocument('students', String(studentId));
      const resolvedClass =
        normalizeNetlifyClassLevel(
          captureCheck.notes?.selectedClass ||
            captureCheck.notes?.classLevel ||
            selectedClass ||
            classLevel
        ) ||
        normalizeNetlifyClassLevel(existingStudentDoc?.classLevel) ||
        'Class 1';
      const existingClassExpiry = existingStudentDoc?.classSubscriptions?.[resolvedClass]?.expiresAt;
      const dates = computeNetlifySubscriptionDates(
        now,
        existingClassExpiry || (!existingStudentDoc?.classSubscriptions ? (currentExpiresAt || existingStudentDoc?.planExpiresAt) : undefined)
      );
      const startDateIso = dates.startDateIso;
      const expiryDateIso = dates.expiryDateIso;
      const daysRemaining = dates.daysRemaining;

      const verifiedAmount = 99;
      const planTitle = `PREMIUM PLAN (${resolvedClass}) – ₹99 – 365 Days (1 Year)`;
      const subscriptionTier = 'premium';
      const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;
      const resolvedMethod = captureCheck.method || payMethod || 'RAZORPAY';

      const { existingMap, activatedClasses, primaryClassLevel } = buildUpdatedNetlifyClassSubscriptions(
        existingStudentDoc,
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
        selectedClass: resolvedClass,
        classLevel: resolvedClass,
        planId,
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
        selectedClass: resolvedClass,
        activatedClasses,
        planId,
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
          classLevel: resolvedClass,
          primaryClassLevel,
          activatedClassLevel: resolvedClass,
          activatedClasses,
          classSubscriptions: existingMap,
          plan: planId,
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
        selectedClass: resolvedClass,
        activatedClasses,
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
          const now = new Date();
          const existingStudentDoc = await getFirestoreDocument('students', studentId);
          const resolvedClass =
            normalizeNetlifyClassLevel(notes.selectedClass || notes.classLevel) ||
            normalizeNetlifyClassLevel(existingStudentDoc?.classLevel) ||
            'Class 1';
          const existingClassExpiry = existingStudentDoc?.classSubscriptions?.[resolvedClass]?.expiresAt;
          const dates = computeNetlifySubscriptionDates(now, existingClassExpiry);
          const startDateIso = dates.startDateIso;
          const expiryDateIso = dates.expiryDateIso;
          const amountInr = 99;
          const planTitle = `PREMIUM PLAN (${resolvedClass}) – ₹99 – 365 Days (1 Year)`;
          const { existingMap, activatedClasses, primaryClassLevel } = buildUpdatedNetlifyClassSubscriptions(
            existingStudentDoc,
            resolvedClass,
            startDateIso,
            expiryDateIso,
            paymentId,
            orderId,
            amountInr
          );

          await patchFirestoreDocument('students', studentId, {
            id: studentId,
            classLevel: resolvedClass,
            primaryClassLevel,
            activatedClassLevel: resolvedClass,
            activatedClasses,
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
            selectedClass: resolvedClass,
            activatedClasses,
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
        return jsonResponse(200, { success: true, exists: false, matchedPair: false, activeClasses: [] });
      }
      if (emailDoc && mobileDoc && emailDoc.id === mobileDoc.id) {
        const todayIst = formatIstDateString(new Date());
        const map = emailDoc.data?.classSubscriptions || {};
        const activeClasses = VALID_NETLIFY_CLASSES.filter((c) => {
          const r = map[c];
          return r && r.plan !== 'free' && (!r.expiresAt || String(r.expiresAt).slice(0, 10) >= todayIst);
        });
        return jsonResponse(200, {
          success: true,
          exists: true,
          matchedPair: true,
          accountRole: emailDoc.data?.accountRole === 'teacher' ? 'teacher' : 'student',
          primaryClassLevel: emailDoc.data?.primaryClassLevel || emailDoc.data?.classLevel || 'Class 1',
          activeClasses
        });
      }
      return jsonResponse(200, {
        success: true,
        exists: true,
        matchedPair: false,
        mismatchField: emailDoc && !mobileDoc ? 'email' : 'mobile',
        activeClasses: []
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
      const targetClass =
        normalizeNetlifyClassLevel(body.selectedClass || body.activatedClassLevel) || 'Class 1';

      if (!cleanStudentId) {
        return jsonResponse(400, { success: false, error: 'studentId is required.' });
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
      const docData = await getFirestoreDocument('students', cleanStudentId);
      const primaryClass = normalizeNetlifyClassLevel(docData?.primaryClassLevel || docData?.classLevel) || 'Class 1';
      const entry = docData?.classSubscriptions?.[targetClass];
      const todayIst = formatIstDateString(new Date());
      const isPaidActive =
        entry &&
        entry.plan !== 'free' &&
        (!entry.expiresAt || String(entry.expiresAt).slice(0, 10) >= todayIst);
      const isAccessible = isPaidActive || targetClass === primaryClass;

      if (!isAccessible) {
        return jsonResponse(403, {
          success: false,
          allowed: false,
          needsPurchase: !entry,
          needsRenewal: Boolean(entry),
          error: `${targetClass} is locked. Activate or renew ${targetClass} for ₹99 (365 Days).`
        });
      }

      if (cleanStudentId !== 'guest' && !cleanStudentId.startsWith('demo_')) {
        await patchFirestoreDocument('students', cleanStudentId, { classLevel: targetClass });
      }
      return jsonResponse(200, { success: true, allowed: true, selectedClass: targetClass });
    } catch (err) {
      return jsonResponse(500, { success: false, allowed: false, error: err?.message });
    }
  }

  // 7. GET /api/subscription/status/:studentId
  if (method === 'GET' && normalizedPath.startsWith('/subscription/status/')) {
    const studentId = normalizedPath.replace('/subscription/status/', '');
    const docData = await getFirestoreDocument('students', studentId);
    return jsonResponse(200, {
      success: true,
      subscription: {
        studentId,
        selectedClass: docData?.classLevel || 'Class 1',
        primaryClassLevel: docData?.primaryClassLevel || docData?.classLevel || 'Class 1',
        activatedClasses: docData?.activatedClasses || [],
        classSubscriptions: docData?.classSubscriptions || {},
        plan: docData?.plan || 'free',
        planPurchasedAt: docData?.planPurchasedAt || null,
        planExpiresAt: docData?.planExpiresAt || null,
        status: 'ACTIVE'
      }
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

  return jsonResponse(404, {
    success: false,
    error: `API route not found: ${method} ${rawPath}`
  });
}
