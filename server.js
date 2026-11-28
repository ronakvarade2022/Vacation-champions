// server.ts
import express from "express";
import compression from "compression";
import http from "http";
import { createServer as createViteServer } from "vite";
import path4 from "path";
import crypto6 from "crypto";
import dotenv3 from "dotenv";

// firebase/admin.ts
import crypto from "crypto";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import {
  initializeApp,
  getApps,
  cert,
  applicationDefault
} from "firebase-admin/app";
import { getFirestore as getAdminFirestoreSdk } from "firebase-admin/firestore";
import { getAuth as getAdminAuthSdk } from "firebase-admin/auth";
import {
  initializeApp as initializeClientApp,
  getApps as getClientApps,
  getApp as getClientApp
} from "firebase/app";
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
  getDocs as clientGetDocs
} from "firebase/firestore";
import { AsyncLocalStorage } from "async_hooks";
dotenv.config();
try {
  setClientFirestoreLogLevel("silent");
} catch {
}
var ADMIN_APP_NAME = "mystudyzone-admin";
var AUTHORIZED_ADMIN_EMAIL = "ronakvarade2022@gmail.com";
function loadFirebaseConfig() {
  const candidates = [
    path.resolve(process.cwd(), "firebase-applet-config.json"),
    new URL("./firebase-applet-config.json", import.meta.url),
    new URL("../firebase-applet-config.json", import.meta.url)
  ];
  for (const candidate of candidates) {
    try {
      const raw = fs.readFileSync(candidate, "utf8");
      if (raw) return JSON.parse(raw);
    } catch {
    }
  }
  throw new Error("Unable to locate or read firebase-applet-config.json");
}
var firebaseConfig = loadFirebaseConfig();
function sanitizeEnv(val) {
  if (!val) return "";
  return val.trim().replace(/^["']+|["']+$/g, "").trim();
}
function isPlaceholder(val) {
  if (!val) return true;
  const upper = val.toUpperCase();
  return upper.includes("YOUR_") || upper.includes("MY_") || upper.includes("REPLACE_") || upper.includes("EXAMPLE_");
}
function parseServiceAccountJson(raw) {
  const cleaned = sanitizeEnv(raw);
  if (!cleaned || isPlaceholder(cleaned)) return null;
  const candidates = [cleaned];
  if (!cleaned.startsWith("{")) {
    try {
      candidates.push(Buffer.from(cleaned, "base64").toString("utf8"));
    } catch {
    }
  }
  for (const candidate of candidates) {
    try {
      const parsed = JSON.parse(candidate);
      const clientEmail = String(parsed.client_email || parsed.clientEmail || "").trim();
      const privateKeyRaw = String(parsed.private_key || parsed.privateKey || "").trim();
      const projectId = String(
        parsed.project_id || parsed.projectId || firebaseConfig.projectId || ""
      ).trim();
      if (clientEmail && privateKeyRaw && !isPlaceholder(clientEmail) && !isPlaceholder(privateKeyRaw)) {
        return {
          projectId,
          clientEmail,
          privateKey: privateKeyRaw.replace(/\\n/g, "\n")
        };
      }
    } catch {
    }
  }
  return null;
}
var cachedState = null;
var cachedFallbackClientDb = null;
function getFallbackClientDb() {
  if (cachedFallbackClientDb) return cachedFallbackClientDb;
  const clientApp = getClientApps().length === 0 ? initializeClientApp(firebaseConfig) : getClientApp();
  cachedFallbackClientDb = getClientFirestore(clientApp, firebaseConfig.firestoreDatabaseId);
  return cachedFallbackClientDb;
}
function initAdminRuntime() {
  if (cachedState) return cachedState;
  const projectId = sanitizeEnv(process.env.FIREBASE_PROJECT_ID) || firebaseConfig.projectId;
  const databaseId = firebaseConfig.firestoreDatabaseId;
  let serviceAccount = null;
  let source = "none";
  const rawJsonEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (rawJsonEnv) {
    serviceAccount = parseServiceAccountJson(rawJsonEnv);
    if (serviceAccount) {
      source = "service_account_json";
    }
  }
  if (!serviceAccount) {
    const clientEmail = sanitizeEnv(process.env.FIREBASE_CLIENT_EMAIL);
    const privateKeyRaw = sanitizeEnv(process.env.FIREBASE_PRIVATE_KEY);
    if (clientEmail && privateKeyRaw && !isPlaceholder(clientEmail) && !isPlaceholder(privateKeyRaw)) {
      serviceAccount = {
        projectId,
        clientEmail,
        privateKey: privateKeyRaw.replace(/\\n/g, "\n")
      };
      source = "env_vars";
    }
  }
  const gacPath = sanitizeEnv(process.env.GOOGLE_APPLICATION_CREDENTIALS);
  const hasGacFile = Boolean(
    gacPath && !isPlaceholder(gacPath) && fs.existsSync(path.resolve(gacPath))
  );
  const hasExplicitCreds = Boolean(serviceAccount || hasGacFile);
  try {
    let adminApp = null;
    const existing = getApps().find((a) => a.name === ADMIN_APP_NAME);
    if (existing) {
      adminApp = existing;
      source = serviceAccount ? source : hasGacFile ? "google_application_credentials" : "none";
    } else if (serviceAccount) {
      adminApp = initializeApp(
        {
          credential: cert(serviceAccount),
          projectId: serviceAccount.projectId || projectId
        },
        ADMIN_APP_NAME
      );
    } else if (hasGacFile) {
      source = "google_application_credentials";
      adminApp = initializeApp(
        {
          credential: applicationDefault(),
          projectId
        },
        ADMIN_APP_NAME
      );
    } else {
      adminApp = initializeApp(
        {
          projectId
        },
        ADMIN_APP_NAME
      );
    }
    const db = hasExplicitCreds ? getAdminFirestoreSdk(adminApp, databaseId) : null;
    if (db) {
      try {
        db.settings({ ignoreUndefinedProperties: true });
      } catch {
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
  } catch (err) {
    const msg = err?.message || String(err);
    console.warn("[Firebase Admin SDK] Initialization failed:", msg);
    cachedState = {
      app: null,
      db: null,
      auth: null,
      source: "none",
      configured: false,
      hasServiceAccountCredentials: false,
      initError: msg
    };
    return cachedState;
  }
}
function getFirebaseAdminStatus() {
  const state = initAdminRuntime();
  return {
    configured: state.configured,
    source: state.source,
    projectId: firebaseConfig.projectId,
    databaseId: firebaseConfig.firestoreDatabaseId,
    authReady: Boolean(state.auth),
    firestoreReady: Boolean(state.db),
    ...state.initError ? { error: state.initError } : {}
  };
}
function isFirebaseAdminConfigured() {
  return initAdminRuntime().configured;
}
function getAdminFirestore() {
  return initAdminRuntime().db;
}
var requestBearerStorage = new AsyncLocalStorage();
function runWithRequestBearerToken(authHeader, fn) {
  const headerStr = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  const token = headerStr && headerStr.startsWith("Bearer ") ? headerStr.slice("Bearer ".length).trim() : void 0;
  return requestBearerStorage.run({ token: token && token.length >= 20 ? token : void 0 }, fn);
}
function getActiveRequestBearerToken() {
  return requestBearerStorage.getStore()?.token;
}
function sanitizeDocPayload(data) {
  return JSON.parse(JSON.stringify(data));
}
function jsToFirestoreValue(val) {
  if (val === null || val === void 0) {
    return { nullValue: null };
  }
  if (typeof val === "boolean") {
    return { booleanValue: val };
  }
  if (typeof val === "number") {
    if (Number.isInteger(val)) {
      return { integerValue: String(val) };
    }
    return { doubleValue: val };
  }
  if (typeof val === "string") {
    return { stringValue: val };
  }
  if (Array.isArray(val)) {
    return {
      arrayValue: {
        values: val.map((item) => jsToFirestoreValue(item))
      }
    };
  }
  if (typeof val === "object") {
    const fields = {};
    for (const [k, v] of Object.entries(val)) {
      if (v !== void 0) {
        fields[k] = jsToFirestoreValue(v);
      }
    }
    return { mapValue: { fields } };
  }
  return { stringValue: String(val) };
}
function firestoreValueToJs(fieldVal) {
  if (!fieldVal || typeof fieldVal !== "object") return null;
  if ("nullValue" in fieldVal) return null;
  if ("booleanValue" in fieldVal) return Boolean(fieldVal.booleanValue);
  if ("integerValue" in fieldVal) return Number(fieldVal.integerValue);
  if ("doubleValue" in fieldVal) return Number(fieldVal.doubleValue);
  if ("timestampValue" in fieldVal) return String(fieldVal.timestampValue);
  if ("stringValue" in fieldVal) return String(fieldVal.stringValue);
  if ("arrayValue" in fieldVal) {
    const arr = fieldVal.arrayValue?.values;
    return Array.isArray(arr) ? arr.map((v) => firestoreValueToJs(v)) : [];
  }
  if ("mapValue" in fieldVal) {
    const fields = fieldVal.mapValue?.fields;
    if (!fields || typeof fields !== "object") return {};
    const out = {};
    for (const [k, v] of Object.entries(fields)) {
      out[k] = firestoreValueToJs(v);
    }
    return out;
  }
  return null;
}
function firestoreDocToJs(docObj) {
  const out = {};
  const fields = docObj?.fields;
  if (fields && typeof fields === "object") {
    for (const [k, v] of Object.entries(fields)) {
      out[k] = firestoreValueToJs(v);
    }
  }
  return out;
}
function getFirestoreRestBaseUrl() {
  const projectId = encodeURIComponent(firebaseConfig.projectId);
  const databaseId = encodeURIComponent(firebaseConfig.firestoreDatabaseId);
  return `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${databaseId}/documents`;
}
async function firestoreRestGetDoc(collectionName, docId, bearerToken) {
  const baseUrl = getFirestoreRestBaseUrl();
  const apiKeyParam = firebaseConfig.apiKey ? `?key=${encodeURIComponent(String(firebaseConfig.apiKey))}` : "";
  const url = `${baseUrl}/${encodeURIComponent(collectionName)}/${encodeURIComponent(docId)}${apiKeyParam}`;
  const headers = {
    Accept: "application/json"
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }
  const res = await fetch(url, { method: "GET", headers });
  if (res.status === 404) {
    return null;
  }
  if (!res.ok) {
    const errText = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(`Firestore REST GET failed (${res.status}): ${errText}`);
  }
  const json = await res.json();
  return firestoreDocToJs(json);
}
async function firestoreRestPatchDoc(collectionName, docId, data, merge, bearerToken) {
  const baseUrl = getFirestoreRestBaseUrl();
  const cleanPayload = sanitizeDocPayload(data);
  const keys = Object.keys(cleanPayload);
  const queryParts = [];
  if (firebaseConfig.apiKey) {
    queryParts.push(`key=${encodeURIComponent(String(firebaseConfig.apiKey))}`);
  }
  if (merge) {
    for (const k of keys) {
      queryParts.push(`updateMask.fieldPaths=${encodeURIComponent(k)}`);
    }
  }
  const qs = queryParts.length > 0 ? `?${queryParts.join("&")}` : "";
  const url = `${baseUrl}/${encodeURIComponent(collectionName)}/${encodeURIComponent(docId)}${qs}`;
  const fields = {};
  for (const [k, v] of Object.entries(cleanPayload)) {
    if (v !== void 0) {
      fields[k] = jsToFirestoreValue(v);
    }
  }
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }
  const res = await fetch(url, {
    method: "PATCH",
    headers,
    body: JSON.stringify({ fields })
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(`Firestore REST PATCH failed (${res.status}): ${errText}`);
  }
}
async function firestoreRestQueryEqualsLimit1(collectionName, field, value, bearerToken) {
  const baseUrl = getFirestoreRestBaseUrl();
  const apiKeyParam = firebaseConfig.apiKey ? `?key=${encodeURIComponent(String(firebaseConfig.apiKey))}` : "";
  const url = `${baseUrl}:runQuery${apiKeyParam}`;
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json"
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }
  const body = {
    structuredQuery: {
      from: [{ collectionId: collectionName }],
      where: {
        fieldFilter: {
          field: { fieldPath: field },
          op: "EQUAL",
          value: jsToFirestoreValue(value)
        }
      },
      limit: 1
    }
  };
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body)
  });
  if (!res.ok) {
    const errText = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(`Firestore REST runQuery failed (${res.status}): ${errText}`);
  }
  const rows = await res.json();
  if (!Array.isArray(rows)) return null;
  for (const row of rows) {
    if (row?.document?.name) {
      const parts = row.document.name.split("/");
      const id = parts[parts.length - 1] || "";
      return { id, data: firestoreDocToJs(row.document) };
    }
  }
  return null;
}
async function firestoreRestListCollection(collectionName, maxLimit, bearerToken) {
  const baseUrl = getFirestoreRestBaseUrl();
  const queryParts = [`pageSize=${Math.min(Math.max(1, maxLimit), 500)}`];
  if (firebaseConfig.apiKey) {
    queryParts.push(`key=${encodeURIComponent(String(firebaseConfig.apiKey))}`);
  }
  const url = `${baseUrl}/${encodeURIComponent(collectionName)}?${queryParts.join("&")}`;
  const headers = {
    Accept: "application/json"
  };
  if (bearerToken) {
    headers.Authorization = `Bearer ${bearerToken}`;
  }
  const res = await fetch(url, { method: "GET", headers });
  if (!res.ok) {
    const errText = await res.text().catch(() => `HTTP ${res.status}`);
    throw new Error(`Firestore REST LIST failed (${res.status}): ${errText}`);
  }
  const json = await res.json();
  if (!Array.isArray(json?.documents)) return [];
  return json.documents.map((docItem) => {
    const parts = String(docItem.name || "").split("/");
    const id = parts[parts.length - 1] || "";
    return { id, data: firestoreDocToJs(docItem) };
  });
}
async function serverGetDoc(collectionName, docId, options) {
  const cleanId = String(docId || "").trim();
  if (!cleanId) return null;
  const adminDb = getAdminFirestore();
  if (adminDb) {
    const snap2 = await adminDb.collection(collectionName).doc(cleanId).get();
    return snap2.exists ? snap2.data() : null;
  }
  const bearerToken = options?.bearerToken || getActiveRequestBearerToken();
  if (bearerToken) {
    return firestoreRestGetDoc(collectionName, cleanId, bearerToken);
  }
  const clientDb = getFallbackClientDb();
  const snap = await clientGetDoc(clientDoc(clientDb, collectionName, cleanId));
  return snap.exists() ? snap.data() : null;
}
async function serverSetDoc(collectionName, docId, data, options = { merge: true }) {
  const cleanId = String(docId || "").trim();
  if (!cleanId) {
    throw new Error(`Invalid docId for ${collectionName}`);
  }
  const cleanPayload = sanitizeDocPayload(data);
  const adminDb = getAdminFirestore();
  if (adminDb) {
    await adminDb.collection(collectionName).doc(cleanId).set(cleanPayload, { merge: options.merge !== false });
    return { usedAdminSdk: true };
  }
  const bearerToken = options?.bearerToken || getActiveRequestBearerToken();
  if (bearerToken) {
    await firestoreRestPatchDoc(
      collectionName,
      cleanId,
      cleanPayload,
      options.merge !== false,
      bearerToken
    );
    return { usedAdminSdk: false };
  }
  const clientDb = getFallbackClientDb();
  await clientSetDoc(clientDoc(clientDb, collectionName, cleanId), cleanPayload, {
    merge: options.merge !== false
  });
  return { usedAdminSdk: false };
}
async function serverUpdateDoc(collectionName, docId, data, options) {
  const cleanId = String(docId || "").trim();
  if (!cleanId) {
    throw new Error(`Invalid docId for ${collectionName}`);
  }
  const cleanPayload = sanitizeDocPayload(data);
  const adminDb = getAdminFirestore();
  if (adminDb) {
    await adminDb.collection(collectionName).doc(cleanId).update(cleanPayload);
    return { usedAdminSdk: true };
  }
  const bearerToken = options?.bearerToken || getActiveRequestBearerToken();
  if (bearerToken) {
    await firestoreRestPatchDoc(collectionName, cleanId, cleanPayload, true, bearerToken);
    return { usedAdminSdk: false };
  }
  const clientDb = getFallbackClientDb();
  await clientUpdateDoc(clientDoc(clientDb, collectionName, cleanId), cleanPayload);
  return { usedAdminSdk: false };
}
async function serverQueryEqualsLimit1(collectionName, field, value, options) {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    const snap2 = await adminDb.collection(collectionName).where(field, "==", value).limit(1).get();
    if (snap2.empty) return null;
    const d2 = snap2.docs[0];
    return { id: d2.id, data: d2.data() };
  }
  const bearerToken = options?.bearerToken || getActiveRequestBearerToken();
  if (bearerToken) {
    return firestoreRestQueryEqualsLimit1(collectionName, field, value, bearerToken);
  }
  const clientDb = getFallbackClientDb();
  const q = clientQuery(
    clientCollection(clientDb, collectionName),
    clientWhere(field, "==", value),
    clientLimit(1)
  );
  const snap = await clientGetDocs(q);
  if (snap.empty) return null;
  const d = snap.docs[0];
  return { id: d.id, data: d.data() };
}
async function serverListCollection(collectionName, maxLimit = 500, options) {
  const adminDb = getAdminFirestore();
  if (adminDb) {
    const snap2 = await adminDb.collection(collectionName).limit(maxLimit).get();
    return snap2.docs.map((d) => ({
      id: d.id,
      data: d.data()
    }));
  }
  const bearerToken = options?.bearerToken || getActiveRequestBearerToken();
  if (bearerToken) {
    return firestoreRestListCollection(collectionName, maxLimit, bearerToken);
  }
  const clientDb = getFallbackClientDb();
  const q = clientQuery(
    clientCollection(clientDb, collectionName),
    clientLimit(maxLimit)
  );
  const snap = await clientGetDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    data: d.data()
  }));
}
async function verifyBearerIdToken(authHeader) {
  const headerStr = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!headerStr || !headerStr.startsWith("Bearer ")) {
    return {
      valid: false,
      statusCode: 401,
      error: "Authorization Bearer token required."
    };
  }
  const token = headerStr.slice("Bearer ".length).trim();
  if (!token || token.length < 20) {
    return {
      valid: false,
      statusCode: 401,
      error: "Invalid Authorization Bearer token format."
    };
  }
  const state = initAdminRuntime();
  const adminAuth = state.auth;
  if (!adminAuth) {
    return {
      valid: false,
      statusCode: 503,
      error: "Firebase Admin SDK credentials are not configured on the server to verify authentication tokens."
    };
  }
  try {
    const decoded = await adminAuth.verifyIdToken(
      token,
      state.hasServiceAccountCredentials
    );
    const activeStore = requestBearerStorage.getStore();
    if (activeStore) {
      activeStore.token = token;
      activeStore.uid = decoded.uid;
      activeStore.email = decoded.email?.toLowerCase();
    }
    return {
      valid: true,
      statusCode: 200,
      uid: decoded.uid,
      email: decoded.email?.toLowerCase(),
      emailVerified: Boolean(decoded.email_verified),
      token,
      decoded
    };
  } catch (err) {
    return {
      valid: false,
      statusCode: 401,
      error: err?.message || "Invalid or expired Firebase ID token."
    };
  }
}
async function verifyAdminRequest(headers) {
  const configuredAdminSecret = sanitizeEnv(process.env.ADMIN_API_SECRET);
  const providedSecretRaw = headers["x-admin-secret"];
  const providedSecret = Array.isArray(providedSecretRaw) ? providedSecretRaw[0] : providedSecretRaw;
  if (configuredAdminSecret && !isPlaceholder(configuredAdminSecret) && configuredAdminSecret.length >= 24 && providedSecret) {
    const expectedBuf = Buffer.from(configuredAdminSecret, "utf8");
    const providedBuf = Buffer.from(providedSecret.trim(), "utf8");
    if (expectedBuf.length === providedBuf.length && crypto.timingSafeEqual(expectedBuf, providedBuf)) {
      return { authorized: true, statusCode: 200, email: "server-admin-secret" };
    }
  }
  const tokenResult = await verifyBearerIdToken(headers.authorization);
  if (!tokenResult.valid || !tokenResult.uid) {
    return {
      authorized: false,
      statusCode: tokenResult.statusCode,
      error: tokenResult.error || "Administrator authentication required."
    };
  }
  if (tokenResult.email === AUTHORIZED_ADMIN_EMAIL && tokenResult.emailVerified === true) {
    return {
      authorized: true,
      statusCode: 200,
      uid: tokenResult.uid,
      email: tokenResult.email
    };
  }
  try {
    const adminDoc = await serverGetDoc("admins", tokenResult.uid, {
      bearerToken: tokenResult.token
    });
    if (adminDoc) {
      return {
        authorized: true,
        statusCode: 200,
        uid: tokenResult.uid,
        email: tokenResult.email
      };
    }
  } catch {
  }
  return {
    authorized: false,
    statusCode: 403,
    error: "Forbidden: Verified administrator privileges are required for this operation."
  };
}

// src/server/razorpayxPayoutService.ts
import crypto2 from "crypto";
import dotenv2 from "dotenv";
dotenv2.config();
function sanitizeEnv2(val) {
  if (!val) return "";
  return val.trim().replace(/^["']+|["']+$/g, "").trim();
}
function isPlaceholder2(val) {
  if (!val) return true;
  const upper = val.toUpperCase();
  return upper.includes("YOUR_") || upper.includes("MY_") || upper.includes("REPLACE_") || val.includes("rzp_test_VACATION_CHAMP");
}
function getResolvedRazorpayXCredentials() {
  const rawKeyId = sanitizeEnv2(
    process.env.RAZORPAYX_KEY_ID || process.env.RAZORPAY_KEY_ID
  );
  const rawKeySecret = sanitizeEnv2(
    process.env.RAZORPAYX_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET
  );
  const rawAccountNumber = sanitizeEnv2(process.env.RAZORPAYX_ACCOUNT_NUMBER);
  const rawWebhookSecret = sanitizeEnv2(
    process.env.RAZORPAYX_WEBHOOK_SECRET || process.env.RAZORPAY_WEBHOOK_SECRET
  );
  const keyId = isPlaceholder2(rawKeyId) ? "" : rawKeyId;
  const keySecret = isPlaceholder2(rawKeySecret) ? "" : rawKeySecret;
  const accountNumber = isPlaceholder2(rawAccountNumber) ? "" : rawAccountNumber;
  const webhookSecret = isPlaceholder2(rawWebhookSecret) ? "" : rawWebhookSecret;
  const hasKey = Boolean(keyId && keyId.startsWith("rzp_"));
  const hasSecret = Boolean(keySecret && keySecret.length >= 8);
  const hasAccount = Boolean(accountNumber && accountNumber.length >= 8);
  const isConfigured = hasKey && hasSecret && hasAccount;
  const isTestMode = keyId.startsWith("rzp_test_");
  return {
    keyId: hasKey ? keyId : "",
    keySecret: hasSecret ? keySecret : "",
    accountNumber: hasAccount ? accountNumber : "",
    webhookSecret,
    isConfigured,
    isTestMode
  };
}
async function dispatchRazorpayXPayout(params) {
  const creds = getResolvedRazorpayXCredentials();
  if (!creds.isConfigured) {
    console.log(`[RazorpayX Payout] Credentials not configured on server. Payout ${params.payoutId} queued for processing.`);
    return {
      success: true,
      status: "PENDING",
      mode: "AWAITING_CREDENTIALS",
      payoutReference: `REQ-${params.payoutId.slice(-8).toUpperCase()}`,
      message: "Withdrawal request registered successfully. RazorpayX Payout credentials (RAZORPAYX_KEY_ID, RAZORPAYX_KEY_SECRET, RAZORPAYX_ACCOUNT_NUMBER) must be configured in server environment variables to initiate automatic banking dispatch."
    };
  }
  const authHeader = "Basic " + Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64");
  const sanitizedAmountPaise = Math.round(params.amountRupees * 100);
  try {
    const contactRes = await fetch("https://api.razorpay.com/v1/contacts", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: params.userName.slice(0, 50) || "Student Champion",
        email: params.userEmail || "student@mystudyzone.in",
        contact: params.userMobile || "9876543210",
        type: "customer",
        reference_id: `cnt_${params.userId.slice(0, 30)}`,
        notes: {
          userId: params.userId,
          platform: "MyStudyZone"
        }
      })
    });
    const contactData = await contactRes.json().catch(() => null);
    if (!contactRes.ok || !contactData?.id) {
      const errDesc = contactData?.error?.description || `Failed to create RazorpayX contact (HTTP ${contactRes.status})`;
      console.error("[RazorpayX Contact Error]:", errDesc);
      return {
        success: false,
        status: "FAILED",
        mode: "FAILED",
        message: `Payout dispatch failed during beneficiary contact creation: ${errDesc}`,
        error: errDesc
      };
    }
    const contactId = contactData.id;
    let fundAccountPayload = null;
    if (params.method === "UPI") {
      if (!params.upiId || !params.upiId.includes("@")) {
        return {
          success: false,
          status: "FAILED",
          mode: "FAILED",
          message: "Invalid UPI ID format. Please provide a valid UPI address (e.g. mobile@upi).",
          error: "INVALID_UPI_VPA"
        };
      }
      fundAccountPayload = {
        contact_id: contactId,
        account_type: "vpa",
        vpa: {
          address: params.upiId.trim()
        }
      };
    } else {
      if (!params.bankDetails?.accountNumber || !params.bankDetails?.ifscCode) {
        return {
          success: false,
          status: "FAILED",
          mode: "FAILED",
          message: "Incomplete bank details. Account Number and IFSC Code are required.",
          error: "MISSING_BANK_DETAILS"
        };
      }
      fundAccountPayload = {
        contact_id: contactId,
        account_type: "bank_account",
        bank_account: {
          name: params.bankDetails.accountHolderName || params.userName,
          ifsc: params.bankDetails.ifscCode.toUpperCase().trim(),
          account_number: params.bankDetails.accountNumber.trim()
        }
      };
    }
    const fundRes = await fetch("https://api.razorpay.com/v1/fund_accounts", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(fundAccountPayload)
    });
    const fundData = await fundRes.json().catch(() => null);
    if (!fundRes.ok || !fundData?.id) {
      const errDesc = fundData?.error?.description || `Failed to create RazorpayX fund account (HTTP ${fundRes.status})`;
      console.error("[RazorpayX Fund Account Error]:", errDesc);
      return {
        success: false,
        status: "FAILED",
        mode: "FAILED",
        message: `Payout dispatch failed during fund account validation: ${errDesc}`,
        error: errDesc
      };
    }
    const fundAccountId = fundData.id;
    const payoutPayload = {
      account_number: creds.accountNumber,
      fund_account_id: fundAccountId,
      amount: sanitizedAmountPaise,
      currency: "INR",
      mode: params.method === "UPI" ? "UPI" : "IMPS",
      purpose: "cashback",
      queue_if_low_balance: true,
      reference_id: params.payoutId.slice(0, 40),
      narration: "MyStudyZone Cashback",
      notes: {
        userId: params.userId,
        payoutId: params.payoutId,
        platform: "MyStudyZone"
      }
    };
    const payoutRes = await fetch("https://api.razorpay.com/v1/payouts", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/json",
        "X-Payout-Idempotency": params.payoutId
      },
      body: JSON.stringify(payoutPayload)
    });
    const payoutData = await payoutRes.json().catch(() => null);
    if (!payoutRes.ok || !payoutData?.id) {
      const errDesc = payoutData?.error?.description || `RazorpayX Payout API rejected request (HTTP ${payoutRes.status})`;
      console.error("[RazorpayX Payout Error]:", errDesc);
      return {
        success: false,
        status: "FAILED",
        mode: "FAILED",
        message: `RazorpayX payout initiation failed: ${errDesc}`,
        error: errDesc
      };
    }
    const rzpPayoutId = payoutData.id;
    const rzpStatus = String(payoutData.status || "").toLowerCase();
    let resolvedStatus = "PROCESSING";
    if (rzpStatus === "processed") {
      resolvedStatus = "COMPLETED";
    } else if (rzpStatus === "rejected" || rzpStatus === "cancelled") {
      resolvedStatus = "FAILED";
    }
    return {
      success: resolvedStatus !== "FAILED",
      status: resolvedStatus,
      mode: "RAZORPAYX_AUTOMATED",
      razorpayxPayoutId: rzpPayoutId,
      payoutReference: payoutData.utr || rzpPayoutId,
      message: `RazorpayX automated payout initiated successfully (Status: ${rzpStatus.toUpperCase()}).`
    };
  } catch (error) {
    console.error("[RazorpayX Payout Exception]:", error);
    return {
      success: false,
      status: "FAILED",
      mode: "FAILED",
      message: `Network or server error contacting RazorpayX API: ${error?.message || error}`,
      error: error?.message || String(error)
    };
  }
}
function verifyRazorpayXPayoutWebhookSignature(rawBody, signatureHeader) {
  if (!signatureHeader) return false;
  const creds = getResolvedRazorpayXCredentials();
  const secret = creds.webhookSecret || creds.keySecret;
  if (!secret) return false;
  const bodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(String(rawBody), "utf8");
  const expectedSig = crypto2.createHmac("sha256", secret).update(bodyBuffer).digest("hex");
  const providedSig = signatureHeader.trim();
  if (expectedSig.length !== providedSig.length) return false;
  return crypto2.timingSafeEqual(Buffer.from(expectedSig, "utf8"), Buffer.from(providedSig, "utf8"));
}
async function processRazorpayXPayoutWebhookEvent(event) {
  const eventType = String(event?.event || "");
  const payoutEntity = event?.payload?.payout?.entity;
  if (!payoutEntity || !payoutEntity.id) {
    return { handled: false, message: "Missing payout entity in webhook payload." };
  }
  const rzpPayoutId = payoutEntity.id;
  const referenceId = String(payoutEntity.reference_id || "");
  const userId = String(payoutEntity.notes?.userId || "");
  const amountPaise = Number(payoutEntity.amount || 0);
  const amountRupees = Math.round(amountPaise / 100);
  const payoutDocId = referenceId || `payout_rzp_${rzpPayoutId}`;
  if (eventType === "payout.processed") {
    await serverSetDoc(
      "payout_requests",
      payoutDocId,
      {
        status: "COMPLETED",
        razorpayxPayoutId: rzpPayoutId,
        transactionReference: payoutEntity.utr || rzpPayoutId,
        processedAt: (/* @__PURE__ */ new Date()).toISOString(),
        adminNotes: "Automated RazorpayX payout confirmed successfully via webhook."
      },
      { merge: true }
    ).catch((err) => console.warn("[Webhook Firestore Update Notice]:", err));
    if (userId) {
      const udata = await serverGetDoc("referrals", userId).catch(() => null);
      if (udata) {
        const pending = Math.max(0, (udata.wallet?.pendingBalance || 0) - amountRupees);
        const withdrawn = (udata.wallet?.totalWithdrawn || 0) + amountRupees;
        await serverSetDoc(
          "referrals",
          userId,
          {
            wallet: {
              ...udata.wallet || {},
              pendingBalance: pending,
              totalWithdrawn: withdrawn
            },
            withdrawnAmount: withdrawn,
            pendingWithdrawalAmount: pending,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          { merge: true }
        ).catch((err) => console.warn("[Webhook Wallet Update Notice]:", err));
      }
    }
    return { handled: true, status: "COMPLETED", message: "Payout marked completed." };
  }
  if (eventType === "payout.failed" || eventType === "payout.reversed") {
    const failureReason = payoutEntity.failure_reason || eventType;
    await serverSetDoc(
      "payout_requests",
      payoutDocId,
      {
        status: "FAILED",
        razorpayxPayoutId: rzpPayoutId,
        processedAt: (/* @__PURE__ */ new Date()).toISOString(),
        adminNotes: `RazorpayX payout failed: ${failureReason}. Funds automatically restored to wallet.`
      },
      { merge: true }
    ).catch((err) => console.warn("[Webhook Firestore Update Notice]:", err));
    if (userId) {
      const udata = await serverGetDoc("referrals", userId).catch(() => null);
      if (udata) {
        const pending = Math.max(0, (udata.wallet?.pendingBalance || 0) - amountRupees);
        const available = (udata.wallet?.availableBalance || 0) + amountRupees;
        await serverSetDoc(
          "referrals",
          userId,
          {
            wallet: {
              ...udata.wallet || {},
              pendingBalance: pending,
              availableBalance: available
            },
            availableWalletBalance: available,
            pendingWithdrawalAmount: pending,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          },
          { merge: true }
        ).catch((err) => console.warn("[Webhook Balance Restore Notice]:", err));
      }
    }
    return { handled: true, status: "FAILED", message: "Payout failed, funds restored to user wallet." };
  }
  return { handled: true, status: eventType, message: `Ignored event: ${eventType}` };
}

// src/utils/referralCoding.ts
var PUBLISHED_REFERRAL_BASE_URL = "https://mystudyzone.in/register";
function sanitizeReferralCode(code) {
  if (!code) return "";
  const cleaned = String(code).trim().toUpperCase().replace(/[^A-Z0-9_-]/g, "");
  if (!cleaned || cleaned === "VC-STU-CHAMP" || cleaned === "DEFAULT" || cleaned === "UNDEFINED") {
    return "";
  }
  return cleaned;
}
function generateUniqueStudentReferralCode(studentId, _studentName, existingCodes) {
  const cleanId = String(studentId || "").trim();
  const usedSet = /* @__PURE__ */ new Set();
  if (existingCodes) {
    for (const c of existingCodes) {
      const norm = sanitizeReferralCode(c);
      if (norm) usedSet.add(norm);
    }
  }
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let h1 = 2166136261;
  let h2 = 16777619;
  const seed = cleanId || `stu_${Date.now()}_${Math.random()}`;
  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 16777619);
    h2 ^= ch + i * 31;
    h2 = Math.imul(h2, 1099511628211 & 4294967295);
  }
  const digitsPart = String(Math.abs(h1) % 900 + 100);
  let alphaPart = "";
  let temp = Math.abs(h2);
  for (let i = 0; i < 3; i++) {
    alphaPart += alphabet[temp % alphabet.length];
    temp = Math.floor(temp / alphabet.length) ^ Math.abs(h1) >> i * 3;
  }
  const baseCandidate = `STUDY${digitsPart}${alphaPart}`;
  if (!usedSet.has(baseCandidate)) {
    return baseCandidate;
  }
  let counter = 1;
  while (counter < 1e4) {
    const nextCandidate = `STUDY${digitsPart}${alphaPart}${counter}`;
    if (!usedSet.has(nextCandidate)) {
      return nextCandidate;
    }
    counter++;
  }
  return `STUDY${Date.now().toString(36).toUpperCase().slice(-6)}`;
}
function buildStudentReferralLink(referralCode) {
  const cleanCode = sanitizeReferralCode(referralCode);
  if (!cleanCode) {
    return PUBLISHED_REFERRAL_BASE_URL;
  }
  return `${PUBLISHED_REFERRAL_BASE_URL}?ref=${encodeURIComponent(cleanCode)}`;
}

// src/server/referralStore.ts
var STUDENT_DEFAULT_MILESTONES = [
  {
    id: "m-stu-5",
    count: 5,
    title: "Knowledge Ambassador Star",
    rewardType: "badge",
    rewardDescription: "Official Knowledge Ambassador Star Badge & Certificate",
    unlocked: false
  },
  {
    id: "m-stu-10",
    count: 10,
    title: "30-Day Premium Extension",
    rewardType: "subscription_extension",
    rewardDescription: "Free 30-Day All-Access Champion Premium Extension",
    unlocked: false
  },
  {
    id: "m-stu-25",
    count: 25,
    title: "3-Month Premium Pass",
    rewardType: "subscription_extension",
    rewardDescription: "Free 90-Day All-Access Champion Premium Pass",
    unlocked: false
  },
  {
    id: "m-stu-50",
    count: 50,
    title: "Diamond Ambassador Crown",
    rewardType: "badge",
    rewardDescription: "Diamond Ambassador Trophy & Lifetime Champion Hall of Fame",
    unlocked: false
  }
];
var TEACHER_DEFAULT_MILESTONES = [
  {
    id: "m-tch-5",
    count: 5,
    title: "Educator Achievement Badge",
    rewardType: "badge",
    rewardDescription: "Official Educator Excellence Pioneer Badge",
    unlocked: false
  },
  {
    id: "m-tch-10",
    count: 10,
    title: "1-Month Classroom Premium",
    rewardType: "subscription_extension",
    rewardDescription: "Free 30-Day Premium Pass for Classroom Teaching",
    unlocked: false
  },
  {
    id: "m-tch-25",
    count: 25,
    title: "3-Month Classroom Premium",
    rewardType: "subscription_extension",
    rewardDescription: "Free 90-Day Premium Pass with Special School Perks",
    unlocked: false
  },
  {
    id: "m-tch-50",
    count: 50,
    title: "Gold Educator Star Badge",
    rewardType: "badge",
    rewardDescription: "Gold Educator Medal & State-Level Mentor Honor",
    unlocked: false
  },
  {
    id: "m-tch-100",
    count: 100,
    title: "Excellence in Teaching Certificate",
    rewardType: "certificate",
    rewardDescription: "Distinguished State Educator Excellence Certificate (Printable/Downloadable)",
    unlocked: false
  }
];
var referralAccounts = /* @__PURE__ */ new Map();
var referralCodeIndex = /* @__PURE__ */ new Map();
var referralTransactions = [];
var payoutRequests = [];
var referralConfig = {
  programEnabled: true,
  budgetCap: 5e4,
  currentBudgetSpent: 1250,
  plan49ReferrerReward: 0,
  plan49BuyerReward: 0,
  plan99ReferrerReward: 5,
  // ₹5 Referrer Cashback on Premium Plan (₹99)
  plan99BuyerReward: 5,
  // ₹5 Buyer Cashback on Premium Plan (₹99)
  minPayoutAmount: 50,
  // ₹50 Minimum Withdrawal
  fraudDetectionStrict: true
};
function generateReferralCode(userType, name, userId) {
  if (userType === "teacher") {
    const cleanName = name.replace(/[^a-zA-Z]/g, "").toUpperCase().slice(0, 6) || "TEACH";
    const suffix = userId.replace(/[^0-9]/g, "").slice(-3) || Math.floor(100 + Math.random() * 900).toString();
    return `VC-TCH-${cleanName}${suffix}`;
  }
  return generateUniqueStudentReferralCode(userId, name, referralCodeIndex.keys());
}
function normalizeReferralAccountForClient(account) {
  const code = sanitizeReferralCode(account.referralCode) || generateUniqueStudentReferralCode(account.userId, account.name, referralCodeIndex.keys());
  const link = buildStudentReferralLink(code);
  const paidCount = Number(account.stats?.paidReferralsCount ?? account.successfulReferrals ?? 0);
  const totalSignups = Number(account.stats?.totalSignedUp ?? account.totalSignups ?? 0);
  const totalClicks = Number(account.stats?.totalClicks ?? account.totalInvitesSent ?? 0);
  const availBal = Number(account.wallet?.availableBalance ?? account.availableWalletBalance ?? 0);
  const pendBal = Number(account.wallet?.pendingBalance ?? account.pendingWithdrawalAmount ?? 0);
  const totEarned = Number(account.wallet?.totalEarned ?? account.totalEarnings ?? 0);
  const totWithdrawn = Number(account.wallet?.totalWithdrawn ?? account.withdrawnAmount ?? 0);
  let tier = "None";
  if (paidCount >= 50 || account.ambassadorCategory === "diamond_ambassador") tier = "Diamond";
  else if (paidCount >= 25) tier = "Gold";
  else if (paidCount >= 10) tier = "Silver";
  else if (paidCount >= 5) tier = "Bronze";
  return {
    ...account,
    userId: account.userId,
    name: account.name || account.userName || "Student Champion",
    userName: account.userName || account.name || "Student Champion",
    userRole: account.userRole || (account.userType === "teacher" ? "parent" : "student"),
    className: account.className || "Class 5",
    schoolName: account.schoolName || "",
    city: account.city || "Maharashtra",
    email: account.email || "",
    mobile: account.mobile || "",
    referralCode: code,
    referralLink: link,
    totalInvitesSent: totalClicks,
    totalSignups,
    successfulReferrals: paidCount,
    pendingReferrals: Math.max(0, totalSignups - paidCount),
    totalEarnings: totEarned,
    availableWalletBalance: availBal,
    withdrawnAmount: totWithdrawn,
    pendingWithdrawalAmount: pendBal,
    freeMonthsEarned: paidCount >= 25 ? 3 : paidCount >= 10 ? 1 : 0,
    totalXPBonus: paidCount * 200,
    currentTier: tier,
    unlockedRewards: (account.milestones || []).filter((m) => m.unlocked).map((m) => m.title)
  };
}
async function saveAccountToFirestore(account) {
  const normalized = normalizeReferralAccountForClient(account);
  try {
    await serverSetDoc(
      "referrals",
      account.userId,
      {
        ...normalized,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn(`[Firestore Sync Notice] referrals/${account.userId}:`, err?.message || err);
  }
  if (account.userType === "student") {
    try {
      await serverSetDoc(
        "students",
        account.userId,
        {
          id: account.userId,
          referralCode: normalized.referralCode,
          referralLink: normalized.referralLink
        },
        { merge: true }
      );
    } catch {
    }
  }
}
async function saveTransactionToFirestore(tx) {
  try {
    await serverSetDoc(
      "referral_transactions",
      tx.id,
      {
        ...tx,
        savedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn(`[Firestore Sync Notice] referral_transactions/${tx.id}:`, err?.message || err);
  }
}
async function savePayoutToFirestore(payout) {
  try {
    await serverSetDoc(
      "payout_requests",
      payout.id,
      {
        ...payout,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      { merge: true }
    );
  } catch (err) {
    console.warn(`[Firestore Sync Notice] payout_requests/${payout.id}:`, err?.message || err);
  }
}
async function getOrCreateReferralAccount(userId, userType = "student", name = "Student", email = "", mobile = "", schoolName = "", preferredReferralCode) {
  const cleanUserId = String(userId || "").trim();
  const cached = referralAccounts.get(cleanUserId);
  if (cached) {
    if (name && name !== "Student" && name !== "Champion" && cached.name === "Student Champion") {
      cached.name = name;
    }
    if (email && !cached.email) cached.email = email;
    if (mobile && !cached.mobile) cached.mobile = mobile;
    if (cached.referralCode) {
      referralCodeIndex.set(cached.referralCode.toUpperCase(), cleanUserId);
    }
    return normalizeReferralAccountForClient(cached);
  }
  let storedStudentData = null;
  try {
    const [refData, stuData] = await Promise.all([
      serverGetDoc("referrals", cleanUserId).catch(() => null),
      serverGetDoc("students", cleanUserId).catch(() => null)
    ]);
    if (stuData) {
      storedStudentData = stuData;
    }
    if (refData) {
      const data = refData;
      const existingCode = sanitizeReferralCode(data.referralCode) || sanitizeReferralCode(storedStudentData?.referralCode) || generateReferralCode(userType, data.name || data.userName || name, cleanUserId);
      const hydrated = normalizeReferralAccountForClient({
        ...data,
        id: data.id || `ref_acc_${cleanUserId}`,
        userId: cleanUserId,
        userType: data.userType || userType,
        name: data.name || data.userName || storedStudentData?.name || name || "Student Champion",
        email: data.email || storedStudentData?.email || email || "",
        mobile: data.mobile || storedStudentData?.mobile || mobile || "",
        referralCode: existingCode,
        ambassadorCategory: data.ambassadorCategory || "knowledge_ambassador",
        verificationStatus: data.verificationStatus || "NOT_APPLICABLE",
        wallet: data.wallet || {
          availableBalance: Number(data.availableWalletBalance || 0),
          pendingBalance: Number(data.pendingWithdrawalAmount || 0),
          totalEarned: Number(data.totalEarnings || 0),
          totalWithdrawn: Number(data.withdrawnAmount || 0),
          currency: "INR"
        },
        stats: data.stats || {
          totalClicks: Number(data.totalInvitesSent || 0),
          totalSignedUp: Number(data.totalSignups || 0),
          paidReferralsCount: Number(data.successfulReferrals || 0),
          plan49Referrals: 0,
          plan99Referrals: Number(data.successfulReferrals || 0)
        },
        milestones: Array.isArray(data.milestones) ? data.milestones : STUDENT_DEFAULT_MILESTONES.map((m) => ({ ...m })),
        createdAt: data.createdAt || storedStudentData?.registeredAt || (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: data.updatedAt || (/* @__PURE__ */ new Date()).toISOString()
      });
      referralAccounts.set(cleanUserId, hydrated);
      referralCodeIndex.set(existingCode.toUpperCase(), cleanUserId);
      return hydrated;
    }
  } catch (err) {
    console.log(`[Firestore Account Lookup Notice] for ${cleanUserId}:`, err?.message || err);
  }
  const storedCodeFromStudent = sanitizeReferralCode(storedStudentData?.referralCode);
  const cleanPreferred = sanitizeReferralCode(preferredReferralCode);
  let code = storedCodeFromStudent || (cleanPreferred && !referralCodeIndex.has(cleanPreferred) ? cleanPreferred : "") || generateReferralCode(userType, storedStudentData?.name || name, cleanUserId);
  const existingOwner = referralCodeIndex.get(code.toUpperCase());
  if (existingOwner && existingOwner !== cleanUserId) {
    code = generateUniqueStudentReferralCode(cleanUserId, name, referralCodeIndex.keys());
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  let category = "knowledge_ambassador";
  if (userType === "teacher") category = "educator_excellence";
  const milestonesClone = (userType === "teacher" ? TEACHER_DEFAULT_MILESTONES : STUDENT_DEFAULT_MILESTONES).map((m) => ({ ...m }));
  const newAccount = normalizeReferralAccountForClient({
    id: `ref_acc_${cleanUserId}`,
    userId: cleanUserId,
    userType,
    name: storedStudentData?.name || (name && name !== "Champion" ? name : "Student Champion"),
    email: storedStudentData?.email || email,
    mobile: storedStudentData?.mobile || mobile,
    referralCode: code,
    ambassadorCategory: category,
    schoolName: schoolName || storedStudentData?.schoolName || (userType === "teacher" ? "Vidya Mandir School" : void 0),
    verificationStatus: userType === "teacher" ? "PENDING" : "NOT_APPLICABLE",
    wallet: {
      availableBalance: 0,
      pendingBalance: 0,
      totalEarned: 0,
      totalWithdrawn: 0,
      currency: "INR"
    },
    stats: {
      totalClicks: 0,
      totalSignedUp: 0,
      paidReferralsCount: 0,
      plan49Referrals: 0,
      plan99Referrals: 0
    },
    milestones: milestonesClone,
    createdAt: storedStudentData?.registeredAt || now,
    updatedAt: now
  });
  referralAccounts.set(cleanUserId, newAccount);
  referralCodeIndex.set(code.toUpperCase(), cleanUserId);
  await saveAccountToFirestore(newAccount);
  return newAccount;
}
async function trackReferralSignup(referralCode, newStudentId, newStudentName = "Student", newStudentClass = "Class 5", newStudentMobile = "") {
  const cleanCode = sanitizeReferralCode(referralCode);
  const cleanNewId = String(newStudentId || "").trim();
  if (!cleanCode) return { tracked: false, reason: "Empty or invalid referral code." };
  const newStudentAcc = await getOrCreateReferralAccount(cleanNewId, "student", newStudentName);
  if (cleanCode === newStudentAcc.referralCode.toUpperCase()) {
    return { tracked: false, reason: "Self-referral is prohibited. You cannot use your own referral code." };
  }
  let referrerUserId = referralCodeIndex.get(cleanCode);
  if (!referrerUserId) {
    try {
      const match = await serverQueryEqualsLimit1("referrals", "referralCode", cleanCode);
      if (match) {
        referrerUserId = String(match.data.userId || match.id);
        referralCodeIndex.set(cleanCode, referrerUserId);
      }
    } catch {
    }
  }
  if (!referrerUserId || referrerUserId === cleanNewId) {
    return { tracked: false, reason: "Invalid or self referral code." };
  }
  const referrer = await getOrCreateReferralAccount(referrerUserId);
  if (!referrer) {
    return { tracked: false, reason: "Referrer account not found." };
  }
  const alreadySignedUp = referralTransactions.some(
    (t) => t.buyerStudentId === cleanNewId && t.referrerId === referrer.userId
  );
  if (!alreadySignedUp) {
    referrer.stats.totalSignedUp += 1;
    referrer.stats.totalClicks += 1;
    referrer.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    newStudentAcc.referredByCode = cleanCode;
    newStudentAcc.referredByUserId = referrer.userId;
    referralAccounts.set(cleanNewId, newStudentAcc);
    const signupTx = {
      id: `ref_signup_${cleanNewId}`,
      referralCode: cleanCode,
      referrerId: referrer.userId,
      referrerName: referrer.name,
      referrerType: referrer.userType,
      buyerStudentId: cleanNewId,
      buyerStudentName: newStudentName,
      buyerPlan: "premium",
      planAmount: 0,
      referrerReward: 0,
      buyerReward: 0,
      orderId: "",
      paymentId: "",
      status: "PENDING",
      description: `${newStudentName} (${newStudentClass}) registered using referral link ?ref=${cleanCode}. Cashback unlocks after \u20B999 Premium upgrade.`,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    referralTransactions.unshift(signupTx);
    await Promise.all([
      saveAccountToFirestore(referrer),
      saveTransactionToFirestore(signupTx),
      serverSetDoc(
        "students",
        cleanNewId,
        {
          id: cleanNewId,
          referredByCode: cleanCode,
          referredByStudentId: referrer.userId
        },
        { merge: true }
      ).catch(() => {
      }),
      serverSetDoc(
        "referrals",
        cleanNewId,
        {
          userId: cleanNewId,
          referredByCode: cleanCode,
          referredByUserId: referrer.userId
        },
        { merge: true }
      ).catch(() => {
      })
    ]);
  }
  return {
    tracked: true,
    referrerId: referrer.userId,
    referrerUserId: referrer.userId,
    referrerName: referrer.name,
    referralCode: referrer.referralCode,
    message: `Referred by ${referrer.name} (${referrer.referralCode})`
  };
}
async function processReferralPurchase(params) {
  if (!referralConfig.programEnabled) {
    return { credited: false, reason: "The referral rewards program is temporarily paused." };
  }
  const cleanCode = params.referralCode.trim().toUpperCase();
  let referrerUserId = referralCodeIndex.get(cleanCode);
  if (!referrerUserId) {
    for (const [uid, acc] of referralAccounts.entries()) {
      if (acc.referralCode && acc.referralCode.toUpperCase() === cleanCode) {
        referrerUserId = uid;
        referralCodeIndex.set(cleanCode, uid);
        break;
      }
    }
  }
  if (!referrerUserId) {
    try {
      const refMatch = await serverQueryEqualsLimit1("referrals", "referralCode", cleanCode);
      if (refMatch) {
        referrerUserId = String(refMatch.data.userId || refMatch.id);
        referralCodeIndex.set(cleanCode, referrerUserId);
      } else {
        const stuMatch = await serverQueryEqualsLimit1("students", "referralCode", cleanCode);
        if (stuMatch) {
          referrerUserId = String(stuMatch.data.id || stuMatch.id);
          referralCodeIndex.set(cleanCode, referrerUserId);
        }
      }
    } catch (err) {
      console.warn("[Referral Store] Firestore query fallback error during purchase processing:", err);
    }
  }
  if (!referrerUserId) {
    return { credited: false, reason: "Invalid or unrecognized referral code." };
  }
  const referrer = await getOrCreateReferralAccount(referrerUserId);
  if (!referrer) {
    return { credited: false, reason: "Referrer profile not found." };
  }
  if (referrer.userId === params.buyerStudentId || referrer.email && params.buyerEmail && referrer.email.toLowerCase() === params.buyerEmail.toLowerCase() || referrer.mobile && params.buyerMobile && referrer.mobile === params.buyerMobile) {
    console.warn(`[Referral Security] Blocked self-referral attempt by ${params.buyerStudentId} using code ${cleanCode}`);
    return { credited: false, reason: "Self-referral is prohibited. You cannot use your own referral code." };
  }
  const alreadyReferred = referralTransactions.find(
    (t) => (t.paymentId === params.paymentId || t.buyerStudentId === params.buyerStudentId && t.buyerPlan === params.planId) && t.status === "CREDITED"
  );
  if (alreadyReferred) {
    console.warn(`[Referral Security] Duplicate referral reward skipped for student ${params.buyerStudentId} / Payment: ${params.paymentId}`);
    return { credited: false, reason: "Referral reward has already been granted for this purchase." };
  }
  const isPremium = true;
  const referrerReward = referralConfig.plan99ReferrerReward;
  const buyerReward = referralConfig.plan99BuyerReward;
  const planAmount = 99;
  if (referralConfig.currentBudgetSpent + referrerReward + buyerReward > referralConfig.budgetCap) {
    console.warn("[Referral Budget] Referral reward skipped: monthly campaign budget cap reached.");
    return { credited: false, reason: "Monthly reward budget pool reached." };
  }
  referrer.wallet.availableBalance += referrerReward;
  referrer.wallet.totalEarned += referrerReward;
  referrer.stats.paidReferralsCount += 1;
  if (isPremium) {
    referrer.stats.plan99Referrals += 1;
  } else {
    referrer.stats.plan49Referrals += 1;
  }
  referrer.milestones.forEach((m) => {
    if (!m.unlocked && referrer.stats.paidReferralsCount >= m.count) {
      m.unlocked = true;
      m.unlockedAt = (/* @__PURE__ */ new Date()).toISOString();
      console.log(`[Referral Milestone Unlocked] Referrer ${referrer.name} unlocked ${m.title}!`);
    }
  });
  if (referrer.stats.paidReferralsCount >= 50 && referrer.ambassadorCategory !== "diamond_ambassador") {
    referrer.ambassadorCategory = "diamond_ambassador";
    console.log(`[Referral Promotion] ${referrer.name} promoted to \u{1F48E} DIAMOND AMBASSADOR!`);
  }
  const buyerAccount = await getOrCreateReferralAccount(
    params.buyerStudentId,
    "student",
    params.buyerStudentName,
    params.buyerEmail,
    params.buyerMobile
  );
  buyerAccount.wallet.availableBalance += buyerReward;
  buyerAccount.wallet.totalEarned += buyerReward;
  const transaction = {
    id: `ref_tx_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    referralCode: cleanCode,
    referrerId: referrer.userId,
    referrerName: referrer.name,
    referrerType: referrer.userType,
    buyerStudentId: params.buyerStudentId,
    buyerStudentName: params.buyerStudentName,
    buyerPlan: params.planId,
    planAmount,
    referrerReward,
    buyerReward,
    orderId: params.orderId,
    paymentId: params.paymentId,
    status: "CREDITED",
    description: `Earned \u20B9${referrerReward} cashback from ${params.buyerStudentName}'s \u20B9${planAmount} (${params.planId.toUpperCase()}) enrollment.`,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  referralTransactions.unshift(transaction);
  referralConfig.currentBudgetSpent += referrerReward + buyerReward;
  await Promise.all([
    saveAccountToFirestore(referrer),
    saveAccountToFirestore(buyerAccount),
    saveTransactionToFirestore(transaction)
  ]);
  console.log(`[Referral Credited & Saved to Firestore] Code: ${cleanCode} | Referrer: ${referrer.name} (+\u20B9${referrerReward}) | Buyer: ${params.buyerStudentName} (+\u20B9${buyerReward})`);
  return {
    credited: true,
    referrerReward,
    buyerReward,
    referrerName: referrer.name,
    transactionId: transaction.id
  };
}
async function reverseReferralOnRefund(paymentId, reason = "Customer refund processed") {
  const tx = referralTransactions.find((t) => t.paymentId === paymentId && t.status === "CREDITED");
  if (!tx) return false;
  const referrer = referralAccounts.get(tx.referrerId);
  if (referrer) {
    referrer.wallet.availableBalance = Math.max(0, referrer.wallet.availableBalance - tx.referrerReward);
    referrer.stats.paidReferralsCount = Math.max(0, referrer.stats.paidReferralsCount - 1);
    await saveAccountToFirestore(referrer);
  }
  const buyer = referralAccounts.get(tx.buyerStudentId);
  if (buyer) {
    buyer.wallet.availableBalance = Math.max(0, buyer.wallet.availableBalance - tx.buyerReward);
    await saveAccountToFirestore(buyer);
  }
  tx.status = "REVERSED";
  tx.reversedAt = (/* @__PURE__ */ new Date()).toISOString();
  tx.reversalReason = reason;
  await saveTransactionToFirestore(tx);
  referralConfig.currentBudgetSpent = Math.max(0, referralConfig.currentBudgetSpent - (tx.referrerReward + tx.buyerReward));
  console.log(`[Referral Reversal] Reversed rewards for payment ${paymentId} due to refund.`);
  return true;
}
async function validateReferralCode(code, currentUserId) {
  const cleanCode = sanitizeReferralCode(code);
  if (!cleanCode) {
    return {
      valid: false,
      error: "Please enter a valid referral code.",
      message: "Please enter a valid referral code."
    };
  }
  let referrerUserId = referralCodeIndex.get(cleanCode);
  if (!referrerUserId) {
    for (const [uid, acc] of referralAccounts.entries()) {
      if (acc.referralCode && acc.referralCode.toUpperCase() === cleanCode) {
        referrerUserId = uid;
        referralCodeIndex.set(cleanCode, uid);
        break;
      }
    }
  }
  if (!referrerUserId) {
    try {
      const refMatch = await serverQueryEqualsLimit1("referrals", "referralCode", cleanCode);
      if (refMatch) {
        referrerUserId = String(refMatch.data.userId || refMatch.id);
        referralCodeIndex.set(cleanCode, referrerUserId);
      } else {
        const stuMatch = await serverQueryEqualsLimit1("students", "referralCode", cleanCode);
        if (stuMatch) {
          referrerUserId = String(stuMatch.data.id || stuMatch.id);
          referralCodeIndex.set(cleanCode, referrerUserId);
        }
      }
    } catch {
    }
  }
  if (!referrerUserId) {
    return {
      valid: false,
      error: "Invalid referral code. Please check and try again.",
      message: "Invalid referral code. Please check and try again."
    };
  }
  if (currentUserId && referrerUserId === currentUserId) {
    return {
      valid: false,
      error: "You cannot use your own referral code (Self-referral prohibited).",
      message: "Self-referral is not allowed. You cannot use your own referral code."
    };
  }
  const referrer = await getOrCreateReferralAccount(referrerUserId);
  if (!referrer) {
    return {
      valid: false,
      error: "Referrer profile not found.",
      message: "Referrer profile not found."
    };
  }
  if (currentUserId && referrer.userId === currentUserId) {
    return {
      valid: false,
      error: "You cannot use your own referral code (Self-referral prohibited).",
      message: "Self-referral is not allowed. You cannot use your own referral code."
    };
  }
  return {
    valid: true,
    code: cleanCode,
    referralCode: cleanCode,
    referrerUserId: referrer.userId,
    referrerName: referrer.name,
    referrerClass: referrer.className || "Student",
    ambassadorCategory: referrer.ambassadorCategory,
    userType: referrer.userType,
    plan49Cashback: 0,
    plan99Cashback: referralConfig.plan99BuyerReward,
    message: `Valid code from ${referrer.name}! \u20B9${referralConfig.plan99ReferrerReward} referral cashback applies on verified \u20B999 Premium subscription.`
  };
}
async function submitPayoutRequest(params) {
  const account = await getOrCreateReferralAccount(params.userId);
  if (!account) {
    return { success: false, message: "Referral account not found." };
  }
  if (params.amount < referralConfig.minPayoutAmount) {
    return { success: false, message: `Minimum withdrawal amount is \u20B9${referralConfig.minPayoutAmount}.` };
  }
  if (params.amount > account.wallet.availableBalance) {
    return { success: false, message: `Insufficient available balance. You have \u20B9${account.wallet.availableBalance} available.` };
  }
  account.wallet.availableBalance -= params.amount;
  account.wallet.pendingBalance += params.amount;
  await saveAccountToFirestore(account);
  const payoutId = `payout_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const payout = {
    id: payoutId,
    userId: account.userId,
    userName: account.name,
    userType: account.userType,
    referralCode: account.referralCode,
    amount: params.amount,
    currency: "INR",
    method: params.method,
    upiId: params.upiId,
    bankDetails: params.bankDetails,
    status: "REQUESTED",
    createdAt: now,
    requestedAt: now
  };
  const rzpResult = await dispatchRazorpayXPayout({
    payoutId,
    userId: account.userId,
    userName: account.name,
    userEmail: account.email,
    userMobile: account.mobile,
    amountRupees: params.amount,
    method: params.method,
    upiId: params.upiId,
    bankDetails: params.bankDetails
  });
  if (rzpResult.status === "COMPLETED") {
    payout.status = "COMPLETED";
    payout.transactionReference = rzpResult.payoutReference;
    payout.processedAt = (/* @__PURE__ */ new Date()).toISOString();
    payout.adminNotes = `RazorpayX automated payout completed. Reference: ${rzpResult.payoutReference}`;
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - params.amount);
    account.wallet.totalWithdrawn += params.amount;
    await saveAccountToFirestore(account);
  } else if (rzpResult.status === "PROCESSING") {
    payout.status = "PROCESSED";
    payout.transactionReference = rzpResult.payoutReference;
    payout.adminNotes = `RazorpayX payout is processing (ID: ${rzpResult.razorpayxPayoutId || rzpResult.payoutReference}).`;
  } else if (rzpResult.status === "FAILED") {
    payout.status = "REJECTED";
    payout.adminNotes = `RazorpayX dispatch failed: ${rzpResult.error || rzpResult.message}. Funds restored to wallet.`;
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - params.amount);
    account.wallet.availableBalance += params.amount;
    await saveAccountToFirestore(account);
  } else {
    payout.status = "PENDING";
    payout.adminNotes = rzpResult.message;
  }
  payoutRequests.unshift(payout);
  await savePayoutToFirestore(payout);
  return {
    success: true,
    message: rzpResult.message || "Withdrawal request recorded successfully.",
    payout,
    razorpayxResult: rzpResult
  };
}
async function submitTeacherVerification(params) {
  const account = await getOrCreateReferralAccount(params.userId);
  if (!account) {
    return { success: false, message: "Account not found." };
  }
  account.userType = "teacher";
  account.ambassadorCategory = "educator_excellence";
  account.schoolName = params.schoolName;
  account.teacherIdNumber = params.teacherIdNumber;
  account.credentialsDocUrl = params.credentialsDocUrl;
  account.verificationStatus = "PENDING";
  account.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  if (account.milestones.length === 4) {
    account.milestones = TEACHER_DEFAULT_MILESTONES.map((m) => ({ ...m }));
  }
  await saveAccountToFirestore(account);
  return { success: true, message: "Teacher verification documents submitted. Admin will review within 24 hours.", account };
}
async function reviewTeacherVerification(userId, status, notes = "") {
  const account = await getOrCreateReferralAccount(userId);
  if (!account) {
    return { success: false, message: "Teacher account not found." };
  }
  account.verificationStatus = status;
  account.verificationNotes = notes;
  account.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await saveAccountToFirestore(account);
  return { success: true, message: `Teacher ${account.name} marked as ${status}.`, account };
}
async function processPayoutAction(payoutId, action, transactionRef = "", notes = "") {
  const payout = payoutRequests.find((p) => p.id === payoutId);
  if (!payout) {
    return { success: false, message: "Payout request not found." };
  }
  if (payout.status === "COMPLETED") {
    return { success: false, message: "Payout request has already been completed." };
  }
  const account = await getOrCreateReferralAccount(payout.userId);
  if (!account) {
    return { success: false, message: "Associated user account not found." };
  }
  if (action === "APPROVE") {
    payout.status = "COMPLETED";
    payout.transactionReference = transactionRef || `UPI-TXN-${Date.now().toString().slice(-6)}`;
    payout.processedAt = (/* @__PURE__ */ new Date()).toISOString();
    payout.adminNotes = notes || "Payout successfully processed to beneficiary account.";
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - payout.amount);
    account.wallet.totalWithdrawn += payout.amount;
  } else {
    payout.status = "REJECTED";
    payout.processedAt = (/* @__PURE__ */ new Date()).toISOString();
    payout.adminNotes = notes || "Withdrawal request rejected by administrator.";
    account.wallet.pendingBalance = Math.max(0, account.wallet.pendingBalance - payout.amount);
    account.wallet.availableBalance += payout.amount;
  }
  await Promise.all([
    saveAccountToFirestore(account),
    savePayoutToFirestore(payout)
  ]);
  return { success: true, message: `Payout request ${action === "APPROVE" ? "Approved & Completed" : "Rejected"}.` };
}
function getLeaderboardData() {
  const all = Array.from(referralAccounts.values());
  const students = all.filter((a) => a.userType === "student").sort((a, b) => b.stats.paidReferralsCount - a.stats.paidReferralsCount).slice(0, 10).map((a, idx) => ({
    rank: idx + 1,
    userId: a.userId,
    name: a.name,
    userType: a.userType,
    ambassadorCategory: a.ambassadorCategory,
    paidReferralsCount: a.stats.paidReferralsCount,
    paidReferrals: a.stats.paidReferralsCount,
    totalEarned: a.wallet.totalEarned,
    schoolName: a.schoolName,
    badge: a.ambassadorCategory === "diamond_ambassador" ? "\u{1F48E} Diamond" : "\u{1F381} Knowledge Ambassador"
  }));
  const teachers = all.filter((a) => a.userType === "teacher").sort((a, b) => b.stats.paidReferralsCount - a.stats.paidReferralsCount).slice(0, 10).map((a, idx) => ({
    rank: idx + 1,
    userId: a.userId,
    name: a.name,
    userType: a.userType,
    ambassadorCategory: a.ambassadorCategory,
    paidReferralsCount: a.stats.paidReferralsCount,
    paidReferrals: a.stats.paidReferralsCount,
    totalEarned: a.wallet.totalEarned,
    schoolName: a.schoolName,
    badge: "\u{1F3C6} Educator Excellence"
  }));
  const diamonds = all.filter((a) => a.ambassadorCategory === "diamond_ambassador" || a.stats.paidReferralsCount >= 50).sort((a, b) => b.stats.paidReferralsCount - a.stats.paidReferralsCount).map((a, idx) => ({
    rank: idx + 1,
    userId: a.userId,
    name: a.name,
    userType: a.userType,
    ambassadorCategory: "diamond_ambassador",
    paidReferralsCount: a.stats.paidReferralsCount,
    paidReferrals: a.stats.paidReferralsCount,
    totalEarned: a.wallet.totalEarned,
    schoolName: a.schoolName,
    badge: "\u{1F48E} Hall of Fame Diamond"
  }));
  return { students, teachers, diamonds };
}
function getAdminReferralStats() {
  const allAccounts = Array.from(referralAccounts.values());
  const totalPaidReferrals = allAccounts.reduce((acc, a) => acc + a.stats.paidReferralsCount, 0);
  const totalEarnedDistributed = allAccounts.reduce((acc, a) => acc + a.wallet.totalEarned, 0);
  const totalWithdrawn = allAccounts.reduce((acc, a) => acc + a.wallet.totalWithdrawn, 0);
  const totalPendingPayoutAmount = payoutRequests.filter((p) => p.status === "PENDING" || p.status === "REQUESTED" || p.status === "PROCESSED").reduce((acc, p) => acc + p.amount, 0);
  const pendingTeacherVerifications = allAccounts.filter(
    (a) => a.userType === "teacher" && a.verificationStatus === "PENDING"
  );
  const successfulPayoutCount = payoutRequests.filter((p) => p.status === "COMPLETED").length;
  const failedPayoutCount = payoutRequests.filter((p) => p.status === "FAILED" || p.status === "REJECTED").length;
  const pendingPayoutCount = payoutRequests.filter((p) => p.status === "PENDING" || p.status === "REQUESTED" || p.status === "PROCESSED").length;
  const rzpCreds = getResolvedRazorpayXCredentials();
  return {
    totalAmbassadors: allAccounts.length,
    studentAmbassadors: allAccounts.filter((a) => a.userType === "student").length,
    teacherAmbassadors: allAccounts.filter((a) => a.userType === "teacher").length,
    diamondAmbassadors: allAccounts.filter((a) => a.ambassadorCategory === "diamond_ambassador").length,
    // The exact 7 metrics requested by user:
    totalReferrals: totalPaidReferrals,
    successfulReferrals: totalPaidReferrals,
    totalCashbackDistributed: totalEarnedDistributed,
    totalWithdrawalAmount: totalWithdrawn,
    pendingPayouts: pendingPayoutCount,
    successfulPayouts: successfulPayoutCount,
    failedPayouts: failedPayoutCount,
    // Additional metrics for admin UI
    totalPaidReferrals,
    totalEarnedDistributed,
    totalWithdrawn,
    totalPendingPayoutAmount,
    pendingPayoutCount,
    successfulPayoutCount,
    failedPayoutCount,
    pendingTeacherCount: pendingTeacherVerifications.length,
    razorpayxConfigured: rzpCreds.isConfigured,
    razorpayxTestMode: rzpCreds.isTestMode,
    config: referralConfig,
    recentTransactions: referralTransactions.slice(0, 30),
    payoutRequests: payoutRequests.slice(0, 30),
    pendingTeachers: pendingTeacherVerifications
  };
}

// src/server/deviceSessionStore.ts
import crypto3 from "crypto";
var SESSION_LOGGED_IN_ELSEWHERE_MESSAGE = "Your account has been signed in on another device. Please log in again if you want to use this device.";
var SINGLE_DEVICE_BLOCK_MESSAGE = SESSION_LOGGED_IN_ELSEWHERE_MESSAGE;
var SESSION_INACTIVITY_TTL_MS = 12 * 60 * 60 * 1e3;
var RECOVERY_WINDOW_MS = 24 * 60 * 60 * 1e3;
var MAX_RECOVERY_COUNT_24H = 3;
var MAX_IN_MEMORY_SESSIONS = 5e3;
var serverDeviceSessions = /* @__PURE__ */ new Map();
var userSessionLocks = /* @__PURE__ */ new Map();
async function withUserSessionLock(userId, task) {
  const cleanId = String(userId || "").trim() || "__anonymous__";
  const previous = userSessionLocks.get(cleanId) || Promise.resolve();
  const next = previous.catch(() => void 0).then(() => task());
  const tracked = next.finally(() => {
    if (userSessionLocks.get(cleanId) === tracked) {
      userSessionLocks.delete(cleanId);
    }
  });
  userSessionLocks.set(cleanId, tracked);
  return next;
}
function pruneExpiredInMemorySessions(nowMs = Date.now()) {
  if (serverDeviceSessions.size <= MAX_IN_MEMORY_SESSIONS) return;
  for (const [uid, rec] of serverDeviceSessions.entries()) {
    if (rec.status !== "ACTIVE" || Number(rec.expiresAtMs || 0) <= nowMs) {
      serverDeviceSessions.delete(uid);
    }
    if (serverDeviceSessions.size <= MAX_IN_MEMORY_SESSIONS) break;
  }
}
function generateActiveSessionId() {
  return `sess_${crypto3.randomBytes(20).toString("hex")}`;
}
function normalizeDeviceType(raw) {
  if (raw === "Mobile" || raw === "Tablet" || raw === "Laptop" || raw === "Desktop") {
    return raw;
  }
  return "Desktop";
}
function normalizeEmail(raw) {
  return String(raw || "").trim().toLowerCase();
}
function normalizeMobileDigits(raw) {
  return String(raw || "").replace(/\D/g, "").slice(-10);
}
function isSessionExpired(record, nowMs = Date.now()) {
  if (!record) return true;
  if (record.status !== "ACTIVE") return true;
  const expiresAtMs = Number(record.expiresAtMs || 0);
  return !Number.isFinite(expiresAtMs) || expiresAtMs <= nowMs;
}
async function loadDeviceSessionFromStore(userId) {
  const cleanId = String(userId || "").trim();
  if (!cleanId) return null;
  const cached = serverDeviceSessions.get(cleanId);
  if (cached) {
    return cached;
  }
  try {
    const docData = await serverGetDoc("device_sessions", cleanId);
    if (docData && docData.userId && docData.activeSessionId) {
      const record = docData;
      serverDeviceSessions.set(cleanId, record);
      pruneExpiredInMemorySessions();
      return record;
    }
  } catch {
  }
  return null;
}
async function persistDeviceSessionToStore(record) {
  serverDeviceSessions.set(record.userId, record);
  pruneExpiredInMemorySessions();
  try {
    await serverSetDoc("device_sessions", record.userId, record, {
      merge: false
    });
  } catch {
  }
}
function buildFreshActiveSession(input, nowMs = Date.now(), prior, sessionIdOverride) {
  const nowIso = new Date(nowMs).toISOString();
  const expiresAtMs = nowMs + SESSION_INACTIVITY_TTL_MS;
  const expiresAt = new Date(expiresAtMs).toISOString();
  const nextVersion = Math.max(1, Number(prior?.sessionVersion || 0) + 1);
  return {
    userId: String(input.userId).trim(),
    firebaseUid: input.firebaseUid ? String(input.firebaseUid).trim() : prior?.firebaseUid,
    email: normalizeEmail(input.email || prior?.email),
    studentName: String(input.studentName || prior?.studentName || "Student").slice(0, 100),
    accountRole: input.accountRole === "teacher" ? "teacher" : "student",
    activeSessionId: sessionIdOverride || generateActiveSessionId(),
    sessionVersion: nextVersion,
    deviceId: String(input.deviceId).trim().slice(0, 128),
    hardwareSignature: String(input.hardwareSignature).trim().slice(0, 128),
    deviceSignature: String(input.deviceSignature).trim().slice(0, 128),
    deviceName: String(input.deviceName || "Registered Browser").slice(0, 120),
    deviceType: normalizeDeviceType(input.deviceType),
    browser: String(input.browser || "Browser").slice(0, 60),
    os: String(input.os || "Unknown OS").slice(0, 60),
    userAgentSummary: String(input.userAgentSummary || "").slice(0, 200),
    status: "ACTIVE",
    loginAt: nowIso,
    lastActivityAt: nowIso,
    expiresAt,
    expiresAtMs,
    previousSessionId: prior?.activeSessionId || void 0,
    previousDeviceId: prior?.deviceId || void 0,
    recoveryCount24h: prior?.recoveryCount24h || 0,
    lastRecoveryAt: prior?.lastRecoveryAt
  };
}
async function acquireDeviceSessionServer(input, nowMs = Date.now()) {
  const cleanUserId = String(input.userId || "").trim();
  const cleanDeviceId = String(input.deviceId || "").trim();
  const cleanHwSig = String(input.hardwareSignature || "").trim();
  const cleanDevSig = String(input.deviceSignature || "").trim();
  if (!cleanUserId || cleanDeviceId.length < 6 || cleanHwSig.length < 8 || cleanDevSig.length < 8) {
    return {
      allowed: false,
      code: "INVALID_INPUT",
      error: "Valid userId and device signatures are required."
    };
  }
  return withUserSessionLock(cleanUserId, async () => {
    const existing = await loadDeviceSessionFromStore(cleanUserId);
    const fresh = buildFreshActiveSession(
      input,
      nowMs,
      existing,
      input.preferredSessionId
    );
    await persistDeviceSessionToStore(fresh);
    return {
      allowed: true,
      resumed: false,
      session: fresh
    };
  });
}
async function validateDeviceSessionServer(input, nowMs = Date.now()) {
  const cleanUserId = String(input.userId || "").trim();
  if (!cleanUserId) {
    return {
      valid: false,
      reason: "NO_ACTIVE_SESSION",
      error: SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }
  return withUserSessionLock(cleanUserId, async () => {
    const existing = await loadDeviceSessionFromStore(cleanUserId);
    if (!existing) {
      if (input.allowBootstrapIfMissing && input.deviceId?.length >= 6 && input.hardwareSignature?.length >= 8 && input.deviceSignature?.length >= 8) {
        const preferredSid = input.activeSessionId && input.activeSessionId.length >= 8 && input.activeSessionId.length <= 128 ? input.activeSessionId : void 0;
        const fresh = buildFreshActiveSession(
          {
            userId: cleanUserId,
            firebaseUid: input.firebaseUid || cleanUserId,
            email: input.email || "",
            studentName: input.studentName || "Student",
            accountRole: input.accountRole || "student",
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
        reason: "NO_ACTIVE_SESSION",
        error: SINGLE_DEVICE_BLOCK_MESSAGE
      };
    }
    if (existing.status === "TERMINATED") {
      const isAdmin = existing.terminatedBy === "ADMIN";
      const isRecovery = existing.terminatedBy === "USER_RECOVERY";
      const isNewDevice = existing.terminatedBy === "NEW_DEVICE_LOGIN";
      return {
        valid: false,
        reason: "TERMINATED",
        terminatedBy: existing.terminatedBy,
        error: isAdmin ? "Your session was terminated by the MyStudyZone Administrator. Please log in again." : isRecovery || isNewDevice ? SESSION_LOGGED_IN_ELSEWHERE_MESSAGE : "Your account session was signed out. Please log in again."
      };
    }
    if (existing.status === "EXPIRED" || Number(existing.expiresAtMs || 0) <= nowMs) {
      const expiredRecord = {
        ...existing,
        status: "EXPIRED",
        terminatedBy: existing.terminatedBy || "EXPIRED",
        terminatedAt: existing.terminatedAt || new Date(nowMs).toISOString(),
        terminationReason: existing.terminationReason || "Session expired due to inactivity"
      };
      await persistDeviceSessionToStore(expiredRecord);
      return {
        valid: false,
        reason: "EXPIRED",
        error: "Your session has expired due to inactivity. Please log in again."
      };
    }
    const sameHardwareAndBrowser = existing.deviceId === input.deviceId && existing.hardwareSignature === input.hardwareSignature && existing.deviceSignature === input.deviceSignature;
    const sameSessionId = Boolean(
      input.activeSessionId && existing.activeSessionId === input.activeSessionId
    );
    const parsedInputVersion = input.sessionVersion !== void 0 && Number.isFinite(Number(input.sessionVersion)) ? Number(input.sessionVersion) : void 0;
    const versionMismatch = parsedInputVersion !== void 0 && existing.sessionVersion !== void 0 && parsedInputVersion !== Number(existing.sessionVersion);
    if (versionMismatch || input.activeSessionId && !sameSessionId) {
      return {
        valid: false,
        reason: "SESSION_SUPERSEDED",
        error: SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
      };
    }
    if (!sameHardwareAndBrowser) {
      return {
        valid: false,
        reason: "HARDWARE_OR_SESSION_MISMATCH",
        error: SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
      };
    }
    const lastActivityMs = Date.parse(existing.lastActivityAt || "") || 0;
    if (nowMs - lastActivityMs >= 3e4) {
      const refreshed = {
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
  });
}
async function heartbeatDeviceSessionServer(input, nowMs = Date.now()) {
  const cleanUserId = String(input.userId || "").trim();
  const check = await validateDeviceSessionServer(input, nowMs);
  if (!check.valid || !check.session || !cleanUserId) {
    return check;
  }
  return withUserSessionLock(cleanUserId, async () => {
    const latest = await loadDeviceSessionFromStore(cleanUserId);
    if (!latest || latest.status !== "ACTIVE" || latest.activeSessionId !== check.session.activeSessionId) {
      return {
        valid: false,
        reason: "SESSION_SUPERSEDED",
        error: SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
      };
    }
    const updated = {
      ...latest,
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
  });
}
async function releaseDeviceSessionServer(input, nowMs = Date.now()) {
  const cleanUserId = String(input.userId || "").trim();
  if (!cleanUserId) return { released: false, error: "userId is required." };
  return withUserSessionLock(cleanUserId, async () => {
    const existing = await loadDeviceSessionFromStore(cleanUserId);
    if (!existing) {
      return { released: true };
    }
    if (existing.status === "ACTIVE" && !isSessionExpired(existing, nowMs)) {
      const matchesSession = !input.activeSessionId || existing.activeSessionId === input.activeSessionId;
      const matchesHardware = !input.hardwareSignature || existing.hardwareSignature === input.hardwareSignature;
      if (!matchesSession || !matchesHardware) {
        return {
          released: true
        };
      }
    }
    const nowIso = new Date(nowMs).toISOString();
    const terminated = {
      ...existing,
      status: "TERMINATED",
      terminatedBy: "USER_LOGOUT",
      terminatedAt: nowIso,
      terminationReason: input.reason || "Logged out by user",
      expiresAt: nowIso,
      expiresAtMs: nowMs
    };
    await persistDeviceSessionToStore(terminated);
    return { released: true };
  });
}
async function recoverDeviceSessionServer(input, nowMs = Date.now()) {
  const cleanUserId = String(input.userId || "").trim();
  const cleanEmail = normalizeEmail(input.email);
  const providedMobile = normalizeMobileDigits(input.mobile);
  if (!cleanUserId || !cleanEmail) {
    return {
      success: false,
      statusCode: 400,
      error: "Registered email and account ID are required."
    };
  }
  return withUserSessionLock(cleanUserId, async () => {
    if (providedMobile.length === 10) {
      let storedStudent = null;
      try {
        storedStudent = await serverGetDoc("students", cleanUserId);
        if (!storedStudent && cleanEmail) {
          const matched = await serverQueryEqualsLimit1("students", "email", cleanEmail);
          if (matched) storedStudent = matched.data;
        }
      } catch {
        storedStudent = null;
      }
      if (storedStudent) {
        const storedMobile = normalizeMobileDigits(storedStudent.mobile);
        if (storedMobile && storedMobile.length === 10 && storedMobile !== providedMobile) {
          return {
            success: false,
            statusCode: 403,
            error: "Entered mobile number does not match the registered mobile number for this account."
          };
        }
      }
    }
    const existing = await loadDeviceSessionFromStore(cleanUserId);
    let nextCount = existing?.recoveryCount24h || 0;
    const nowIso = new Date(nowMs).toISOString();
    if (existing?.lastRecoveryAt && nowMs - (Date.parse(existing.lastRecoveryAt) || 0) < RECOVERY_WINDOW_MS) {
      nextCount = Math.min(MAX_RECOVERY_COUNT_24H, nextCount + 1);
    }
    const recovered = buildFreshActiveSession(input, nowMs, existing);
    recovered.recoveryCount24h = nextCount;
    recovered.lastRecoveryAt = nowIso;
    recovered.terminationReason = void 0;
    recovered.terminatedAt = void 0;
    recovered.terminatedBy = void 0;
    await persistDeviceSessionToStore(recovered);
    return {
      success: true,
      statusCode: 200,
      session: recovered
    };
  });
}
async function listDeviceSessionsAdminServer(nowMs = Date.now()) {
  const merged = /* @__PURE__ */ new Map();
  try {
    const docs = await serverListCollection("device_sessions", 500);
    for (const d of docs) {
      if (d.data && d.data.userId) {
        merged.set(d.id, d.data);
      }
    }
  } catch {
  }
  for (const [uid, rec] of serverDeviceSessions.entries()) {
    const existing = merged.get(uid);
    if (!existing) {
      merged.set(uid, rec);
    } else {
      const existingAct = Date.parse(existing.lastActivityAt || "") || 0;
      const cacheAct = Date.parse(rec.lastActivityAt || "") || 0;
      if (cacheAct >= existingAct) {
        merged.set(uid, rec);
      }
    }
  }
  const list = Array.from(merged.values()).map((rec) => {
    const computedStatus = rec.status === "ACTIVE" && Number(rec.expiresAtMs || 0) <= nowMs ? "EXPIRED" : rec.status;
    return {
      ...rec,
      status: computedStatus
    };
  });
  list.sort(
    (a, b) => (Date.parse(b.lastActivityAt || b.loginAt || "") || 0) - (Date.parse(a.lastActivityAt || a.loginAt || "") || 0)
  );
  return list;
}
async function terminateDeviceSessionAdminServer(userId, reason = "Terminated by administrator", nowMs = Date.now()) {
  const cleanUserId = String(userId || "").trim();
  if (!cleanUserId) {
    throw new Error("userId is required to terminate a session.");
  }
  return withUserSessionLock(cleanUserId, async () => {
    const existing = await loadDeviceSessionFromStore(cleanUserId);
    const nowIso = new Date(nowMs).toISOString();
    const nextVersion = Math.max(1, Number(existing?.sessionVersion || 0) + 1);
    const terminated = existing ? {
      ...existing,
      activeSessionId: `terminated_${crypto3.randomBytes(10).toString("hex")}`,
      sessionVersion: nextVersion,
      status: "TERMINATED",
      terminatedBy: "ADMIN",
      terminatedAt: nowIso,
      terminationReason: reason,
      expiresAt: nowIso,
      expiresAtMs: nowMs
    } : {
      userId: cleanUserId,
      email: "",
      studentName: "Student",
      accountRole: "student",
      activeSessionId: `terminated_${crypto3.randomBytes(10).toString("hex")}`,
      sessionVersion: nextVersion,
      deviceId: "admin_terminated",
      hardwareSignature: "admin_terminated",
      deviceSignature: "admin_terminated",
      deviceName: "No Active Device",
      deviceType: "Desktop",
      browser: "N/A",
      os: "N/A",
      userAgentSummary: "",
      status: "TERMINATED",
      loginAt: nowIso,
      lastActivityAt: nowIso,
      expiresAt: nowIso,
      expiresAtMs: nowMs,
      terminatedBy: "ADMIN",
      terminatedAt: nowIso,
      terminationReason: reason
    };
    await persistDeviceSessionToStore(terminated);
    return { success: true, session: terminated };
  });
}

// firebase/index.ts
import fs2 from "fs";
import path2 from "path";
import Razorpay from "razorpay";
import { initializeApp as initializeApp2, getApps as getApps2, getApp as getApp2 } from "firebase/app";
import { getFirestore, setLogLevel } from "firebase/firestore";

// src/utils/subscriptionDateUtils.ts
var SUBSCRIPTION_VALIDITY_DAYS = 365;
var PAID_SUBSCRIPTION_VALIDITY_DAYS = 365;
var IST_OFFSET_MS = (5 * 60 + 30) * 60 * 1e3;
var ONE_DAY_MS = 864e5;
function pad2(n) {
  return n < 10 ? `0${n}` : `${n}`;
}
function isValidCalendarDate(year, month, day) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || !Number.isInteger(day)) {
    return false;
  }
  if (year < 1970 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    return false;
  }
  const dt = new Date(Date.UTC(year, month - 1, day));
  return dt.getUTCFullYear() === year && dt.getUTCMonth() === month - 1 && dt.getUTCDate() === day;
}
function parseToIstDateParts(input) {
  if (input === null || input === void 0 || input === "") {
    return null;
  }
  if (typeof input === "string") {
    const trimmed = input.trim();
    const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
    if (dateOnlyMatch) {
      const year2 = Number(dateOnlyMatch[1]);
      const month2 = Number(dateOnlyMatch[2]);
      const day2 = Number(dateOnlyMatch[3]);
      if (!isValidCalendarDate(year2, month2, day2)) {
        return null;
      }
      return {
        year: year2,
        month: month2,
        day: day2,
        isoDate: `${year2}-${pad2(month2)}-${pad2(day2)}`
      };
    }
  }
  const dateObj = input instanceof Date ? input : new Date(input);
  if (isNaN(dateObj.getTime())) {
    return null;
  }
  const istShifted = new Date(dateObj.getTime() + IST_OFFSET_MS);
  const year = istShifted.getUTCFullYear();
  const month = istShifted.getUTCMonth() + 1;
  const day = istShifted.getUTCDate();
  if (!isValidCalendarDate(year, month, day)) {
    return null;
  }
  return {
    year,
    month,
    day,
    isoDate: `${year}-${pad2(month)}-${pad2(day)}`
  };
}
function toIstDateString(input) {
  const parts = parseToIstDateParts(input ?? /* @__PURE__ */ new Date());
  if (parts) {
    return parts.isoDate;
  }
  const fallback = parseToIstDateParts(/* @__PURE__ */ new Date());
  return fallback.isoDate;
}
function datePartsToUtcMidnightMs(parts) {
  return Date.UTC(parts.year, parts.month - 1, parts.day);
}
function addCalendarDaysIst(startInput, daysToAdd = SUBSCRIPTION_VALIDITY_DAYS) {
  const parts = parseToIstDateParts(startInput);
  if (!parts) {
    throw new Error(`Invalid start date for subscription calculation: ${String(startInput)}`);
  }
  const targetUtc = new Date(Date.UTC(parts.year, parts.month - 1, parts.day + daysToAdd));
  const y = targetUtc.getUTCFullYear();
  const m = targetUtc.getUTCMonth() + 1;
  const d = targetUtc.getUTCDate();
  return `${y}-${pad2(m)}-${pad2(d)}`;
}
function diffCalendarDaysIst(startInput, endInput) {
  const startParts = parseToIstDateParts(startInput);
  const endParts = parseToIstDateParts(endInput);
  if (!startParts || !endParts) {
    return null;
  }
  const startMs = datePartsToUtcMidnightMs(startParts);
  const endMs = datePartsToUtcMidnightMs(endParts);
  return Math.round((endMs - startMs) / ONE_DAY_MS);
}
function formatDateIstDisplay(input, includeIso = false) {
  const parts = parseToIstDateParts(input);
  if (!parts) {
    return "\u2014";
  }
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const human = `${pad2(parts.day)} ${months[parts.month - 1]} ${parts.year}`;
  return includeIso ? `${human} (${parts.isoDate})` : human;
}
function evaluateSubscriptionValidity(arg1, arg2, arg3, arg4) {
  let planPurchasedAt;
  let planExpiresAt;
  let nowRef;
  if (arg1 && typeof arg1 === "object" && !(arg1 instanceof Date)) {
    planPurchasedAt = arg1.planPurchasedAt;
    planExpiresAt = arg1.planExpiresAt;
    nowRef = arg1.now;
  } else if (typeof arg1 === "string" && (arg1 === "free" || arg1 === "basic" || arg1 === "premium")) {
    planPurchasedAt = arg2;
    planExpiresAt = typeof arg3 === "string" ? arg3 : null;
    nowRef = arg4;
  } else {
    planPurchasedAt = typeof arg1 === "string" ? arg1 : null;
    planExpiresAt = arg2;
    nowRef = arg3 ?? void 0;
  }
  const todayParts = parseToIstDateParts(nowRef ?? /* @__PURE__ */ new Date()) || parseToIstDateParts(/* @__PURE__ */ new Date());
  const todayIstIso = todayParts.isoDate;
  const purchasedParts = parseToIstDateParts(planPurchasedAt);
  const expiryParts = parseToIstDateParts(planExpiresAt);
  const purchasedDateIso = purchasedParts ? purchasedParts.isoDate : null;
  const purchasedDateDisplay = purchasedParts ? formatDateIstDisplay(purchasedParts.isoDate) : "\u2014";
  if (!expiryParts) {
    return {
      isValidDate: false,
      purchasedDateIso,
      purchaseDateIst: purchasedDateIso,
      purchasedDateDisplay,
      purchaseDateDisplay: purchasedDateDisplay,
      expiryDateIso: null,
      expiryDateIst: null,
      expiryDateDisplay: "\u2014",
      todayIstIso,
      rawDiffDays: null,
      daysRemaining: 0,
      totalValidityDays: null,
      configuredValidityDays: null,
      isExpired: false,
      isExpiringToday: false,
      isActive: false,
      statusCode: "EXPIRED",
      statusLabel: "EXPIRED",
      daysRemainingDisplay: "Missing / Invalid Expiry Date",
      expiryStatusSummary: "Subscription expiry date is missing or invalid"
    };
  }
  const expiryDateIso = expiryParts.isoDate;
  const expiryDateDisplay = formatDateIstDisplay(expiryDateIso);
  const rawDiffDays = diffCalendarDaysIst(todayIstIso, expiryDateIso) ?? 0;
  const totalValidityDays = purchasedDateIso && expiryDateIso ? diffCalendarDaysIst(purchasedDateIso, expiryDateIso) : null;
  if (rawDiffDays < 0) {
    return {
      isValidDate: true,
      purchasedDateIso,
      purchaseDateIst: purchasedDateIso,
      purchasedDateDisplay,
      purchaseDateDisplay: purchasedDateDisplay,
      expiryDateIso,
      expiryDateIst: expiryDateIso,
      expiryDateDisplay,
      todayIstIso,
      rawDiffDays,
      daysRemaining: 0,
      totalValidityDays,
      configuredValidityDays: totalValidityDays,
      isExpired: true,
      isExpiringToday: false,
      isActive: false,
      statusCode: "EXPIRED",
      statusLabel: "EXPIRED",
      daysRemainingDisplay: "0 Days Remaining (Expired)",
      expiryStatusSummary: `Expired on ${expiryDateDisplay} (${expiryDateIso})`
    };
  }
  if (rawDiffDays === 0) {
    return {
      isValidDate: true,
      purchasedDateIso,
      purchaseDateIst: purchasedDateIso,
      purchasedDateDisplay,
      purchaseDateDisplay: purchasedDateDisplay,
      expiryDateIso,
      expiryDateIst: expiryDateIso,
      expiryDateDisplay,
      todayIstIso,
      rawDiffDays: 0,
      daysRemaining: 0,
      totalValidityDays,
      configuredValidityDays: totalValidityDays,
      isExpired: false,
      isExpiringToday: true,
      isActive: true,
      statusCode: "EXPIRING_TODAY",
      statusLabel: "EXPIRING TODAY",
      daysRemainingDisplay: "Expires Today (Active until 11:59 PM IST)",
      expiryStatusSummary: `Expires Today \u2022 ${expiryDateDisplay} (11:59 PM IST)`
    };
  }
  const dayWord = rawDiffDays === 1 ? "Day" : "Days";
  return {
    isValidDate: true,
    purchasedDateIso,
    purchaseDateIst: purchasedDateIso,
    purchasedDateDisplay,
    purchaseDateDisplay: purchasedDateDisplay,
    expiryDateIso,
    expiryDateIst: expiryDateIso,
    expiryDateDisplay,
    todayIstIso,
    rawDiffDays,
    daysRemaining: rawDiffDays,
    totalValidityDays,
    configuredValidityDays: totalValidityDays,
    isExpired: false,
    isExpiringToday: false,
    isActive: true,
    statusCode: "ACTIVE",
    statusLabel: "ACTIVE",
    daysRemainingDisplay: `${rawDiffDays} ${dayWord} Remaining`,
    expiryStatusSummary: `Valid until ${expiryDateDisplay} (${expiryDateIso})`
  };
}
function istExpiryDateToUtcEndTimestamp(expiryIsoDate) {
  const parts = parseToIstDateParts(expiryIsoDate);
  if (!parts) {
    return (/* @__PURE__ */ new Date()).toISOString();
  }
  const endOfDayIstInUtcMs = Date.UTC(parts.year, parts.month - 1, parts.day, 23, 59, 59, 999) - IST_OFFSET_MS;
  return new Date(endOfDayIstInUtcMs).toISOString();
}
function computeSubscriptionActivationDates(params) {
  const rawTime = params?.verifiedAt ?? params?.verificationTimestamp;
  const nowDate = rawTime instanceof Date ? rawTime : rawTime ? new Date(rawTime) : /* @__PURE__ */ new Date();
  const safeNow = isNaN(nowDate.getTime()) ? /* @__PURE__ */ new Date() : nowDate;
  const verifiedAtUtc = safeNow.toISOString();
  const purchasedAt = toIstDateString(safeNow);
  const purchasedAtDisplay = formatDateIstDisplay(purchasedAt);
  const daysSpan = typeof params?.validityDays === "number" && params.validityDays > 0 ? params.validityDays : SUBSCRIPTION_VALIDITY_DAYS;
  let baseDateForExtension = purchasedAt;
  let isRenewalExtension = false;
  if (params?.existingExpiresAt && params?.existingPlanStatus !== "expired") {
    const existingParts = parseToIstDateParts(params.existingExpiresAt);
    if (existingParts) {
      const diffFromToday = diffCalendarDaysIst(purchasedAt, existingParts.isoDate);
      if (diffFromToday !== null && diffFromToday >= 0) {
        baseDateForExtension = existingParts.isoDate;
        isRenewalExtension = true;
      }
    }
  }
  const expiresAt = addCalendarDaysIst(baseDateForExtension, daysSpan);
  const expiresAtDisplay = formatDateIstDisplay(expiresAt);
  const expiresAtUtc = istExpiryDateToUtcEndTimestamp(expiresAt);
  const daysRemaining = Math.max(0, diffCalendarDaysIst(purchasedAt, expiresAt) ?? daysSpan);
  return {
    verifiedAtUtc,
    verifiedAtUtcIso: verifiedAtUtc,
    purchasedAt,
    purchasedDateIst: purchasedAt,
    purchasedAtDisplay,
    expiresAt,
    expiresDateIst: expiresAt,
    expiryDateIst: expiresAt,
    expiresAtDisplay,
    expiresAtUtc,
    validityDaysAdded: daysSpan,
    validityDays: daysSpan,
    daysRemaining,
    isRenewalExtension,
    isRenewalBeforeExpiry: isRenewalExtension
  };
}

// src/data/planCatalog.ts
var ALL_CATEGORY_IDS = [
  "scholarship_4th",
  "scholarship_7th",
  "maha_tet",
  "ctet_paper_1",
  "ctet_paper_2",
  "all_classes"
];
var PLAN_CATALOG = {
  // CLASS PLANS (CLASSES 1 TO 10) - Rs. 99
  BOARD_CLASS: {
    sku: "BOARD_CLASS",
    title: "Board & Class Annual Plan (Classes 1\u201310)",
    shortTitle: "Class Annual Plan",
    subtitle: "Full access for 1 selected Education Board & Class (All Subjects, Worksheets, Quizzes)",
    originalAmountInr: 199,
    amountInr: 99,
    amountPaise: 9900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 365,
    validityMonths: 12,
    validityLabel: "12 Months (1 Year)",
    unlockedCategories: [],
    isCombo: false,
    requiresBoardClass: true,
    audience: "all",
    badge: "Most Popular",
    highlights: [
      "Unlocks all subjects, chapter notes & printable worksheets for 1 Board + Class",
      "4-Level Adaptive Quizzes, Brain Puzzles, Stories & Drawing Studio",
      "Automatic MSCE Scholarship Access for Class 4 & Class 7 at no extra charge",
      "365 Days Full Annual Validity"
    ]
  },
  // 6 MONTH PLANS (180 DAYS)
  // Plan 1: TET – 6 Months
  TET_6M: {
    sku: "TET_6M",
    title: "TET (Paper 1 & 2) \u2013 6 Months",
    shortTitle: "TET (6 Months)",
    subtitle: "MAHA TET Paper 1 & Paper 2: 100 Full Mocks, Study Notes, Subject Drills & Revision Sets",
    originalAmountInr: 399,
    amountInr: 199,
    amountPaise: 19900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 180,
    validityMonths: 6,
    validityLabel: "6 Months",
    unlockedCategories: ["maha_tet"],
    isCombo: false,
    requiresBoardClass: false,
    audience: "teacher",
    badge: "6 Months Plan",
    highlights: [
      "50 Paper 1 (Classes 1\u20135) + 50 Paper 2 (Classes 6\u20138) Full Mock Exams",
      "Subject Practice Sets, Topic Mastery Drills & Revision Sprints",
      "Marathi, English, Hindi & Urdu Mediums",
      "180 Days (6 Months) Validity"
    ]
  },
  // Plan 2: CTET – 6 Months
  CTET_6M: {
    sku: "CTET_6M",
    title: "CTET (Paper 1 & 2) \u2013 6 Months",
    shortTitle: "CTET (6 Months)",
    subtitle: "CTET Paper 1 & Paper 2: 100 Full CBT Mocks (Math/Science & Social Studies)",
    originalAmountInr: 399,
    amountInr: 199,
    amountPaise: 19900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 180,
    validityMonths: 6,
    validityLabel: "6 Months",
    unlockedCategories: ["ctet_paper_1", "ctet_paper_2"],
    isCombo: false,
    requiresBoardClass: false,
    audience: "teacher",
    badge: "6 Months Plan",
    highlights: [
      "50 Paper 1 + 50 Paper 2 CBT Mock Examinations (15,000 Questions)",
      "NEP 2020 Pedagogical Framework & Bilingual CDPs",
      "Both Math/Science and Social Studies Streams Included",
      "180 Days (6 Months) Validity"
    ]
  },
  // Plan 3: TET + CTET COMBO – 6 Months
  TET_CTET_COMBO_6M: {
    sku: "TET_CTET_COMBO_6M",
    title: "Combo Offer: TET + CTET (Paper 1 & 2) \u2013 6 Months",
    shortTitle: "TET + CTET Combo (6M)",
    subtitle: "Combined access to MAHA TET (P1+P2) and CTET (P1+P2) \u2013 200 Mock Tests",
    originalAmountInr: 699,
    amountInr: 349,
    amountPaise: 34900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 180,
    validityMonths: 6,
    validityLabel: "6 Months",
    unlockedCategories: ["maha_tet", "ctet_paper_1", "ctet_paper_2"],
    isCombo: true,
    requiresBoardClass: false,
    audience: "teacher",
    badge: "Best 6M Value",
    highlights: [
      "All 200 Mock Exams: 100 MAHA TET + 100 CTET Papers",
      "Full Subject Drills, Topic Revision & PYQ Simulators",
      "Save \u20B9350 vs original price",
      "180 Days (6 Months) Combined Validity"
    ]
  },
  // 1 YEAR PLANS (365 DAYS / 12 MONTHS)
  // Plan 4: TET – 1 Year
  TET_1Y: {
    sku: "TET_1Y",
    title: "TET (Paper 1 & 2) \u2013 1 Year",
    shortTitle: "TET (1 Year)",
    subtitle: "MAHA TET Paper 1 & Paper 2: 100 Full Mocks, Study Notes, Subject Drills & Revision Sets",
    originalAmountInr: 599,
    amountInr: 299,
    amountPaise: 29900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 365,
    validityMonths: 12,
    validityLabel: "1 Year",
    unlockedCategories: ["maha_tet"],
    isCombo: false,
    requiresBoardClass: false,
    audience: "teacher",
    badge: "1 Year Plan",
    highlights: [
      "50 Paper 1 + 50 Paper 2 Full Mock Exams (15,000 Questions)",
      "MSCE Pune Syllabus, Topic Drills & PYQ Simulators",
      "Marathi, English, Hindi & Urdu Mediums",
      "365 Days (1 Year) Full Validity"
    ]
  },
  // Plan 5: CTET – 1 Year
  CTET_1Y: {
    sku: "CTET_1Y",
    title: "CTET (Paper 1 & 2) \u2013 1 Year",
    shortTitle: "CTET (1 Year)",
    subtitle: "CTET Paper 1 & Paper 2: 100 Full CBT Mocks (Math/Science & Social Studies)",
    originalAmountInr: 599,
    amountInr: 299,
    amountPaise: 29900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 365,
    validityMonths: 12,
    validityLabel: "1 Year",
    unlockedCategories: ["ctet_paper_1", "ctet_paper_2"],
    isCombo: false,
    requiresBoardClass: false,
    audience: "teacher",
    badge: "1 Year Plan",
    highlights: [
      "50 Paper 1 + 50 Paper 2 CBT Mock Examinations (15,000 Questions)",
      "CBSE Competency Patterns, Pedagogy Drills & Weak-Area Revision",
      "Both Math/Science & Social Studies Streams Included",
      "365 Days (1 Year) Full Validity"
    ]
  },
  // Plan 6: TET + CTET COMBO – 1 Year
  TET_CTET_COMBO_1Y: {
    sku: "TET_CTET_COMBO_1Y",
    title: "Combo Offer: TET + CTET (Paper 1 & 2) \u2013 1 Year",
    shortTitle: "TET + CTET Combo (1Y)",
    subtitle: "All 200 Teacher Eligibility Mock Tests across MAHA TET & CTET Papers 1 & 2",
    originalAmountInr: 999,
    amountInr: 499,
    amountPaise: 49900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 365,
    validityMonths: 12,
    validityLabel: "12 Months",
    unlockedCategories: ["maha_tet", "ctet_paper_1", "ctet_paper_2"],
    isCombo: true,
    requiresBoardClass: false,
    audience: "teacher",
    badge: "Best Annual Value",
    highlights: [
      "MAHA TET Paper 1 & 2 (100 Mocks) + CTET Paper 1 & 2 (100 Mocks)",
      "All 200 Mock Tests with Detailed Step-by-Step Solutions",
      "Save \u20B9500 vs original price",
      "365 Days (12 Months) Full Annual Access"
    ]
  },
  // SCHOLARSHIP PLAN
  // Plan 7: Scholarship Combo – Class 4 + Class 7
  SCHOLARSHIP_COMBO: {
    sku: "SCHOLARSHIP_COMBO",
    title: "Scholarship Combo \u2013 Class 4 + Class 7",
    shortTitle: "Scholarship Combo (4th + 7th)",
    subtitle: "Complete access to BOTH 4th Std PSE & 7th Std UPS MSCE Scholarship Exams",
    originalAmountInr: 199,
    amountInr: 99,
    amountPaise: 9900,
    discountPercent: 50,
    discountBadge: "SAVE 50%",
    validityDays: 365,
    validityMonths: 12,
    validityLabel: "12 Months",
    unlockedCategories: ["scholarship_4th", "scholarship_7th"],
    isCombo: true,
    requiresBoardClass: false,
    audience: "all",
    badge: "Std 4th + 7th Combo",
    highlights: [
      "50 Full MSCE Mock Exams (25 Std 4th + 25 Std 7th) with Paper 1 & Paper 2",
      "20 Full Practice Sets with Step-by-Step Solutions",
      "Marathi, English & Hindi Mediums",
      "Ideal for Teachers, Coaching Institutes & Multi-Child Families",
      "365 Days (12 Months) Full Validity"
    ]
  }
};
var PLAN_CATALOG_LIST = Object.values(PLAN_CATALOG);
var VALID_SKU_SET = new Set(Object.keys(PLAN_CATALOG));
function isValidPlanSku(val) {
  const norm = String(val || "").trim().toUpperCase();
  return Boolean(norm && (VALID_SKU_SET.has(norm) || isLegacySku(norm)));
}
function isLegacySku(val) {
  return [
    "SCHOLARSHIP_4TH",
    "SCHOLARSHIP_7TH",
    "MAHA_TET",
    "CTET_PAPER_1",
    "CTET_PAPER_2",
    "CTET_COMBO",
    "TET_CTET_COMBO",
    "TEACHER_ALL_ACCESS"
  ].includes(val);
}
function getPlanCatalogItem(sku) {
  const resolved = resolvePlanSku(sku);
  return PLAN_CATALOG[resolved] || PLAN_CATALOG.BOARD_CLASS;
}
function resolvePlanSku(rawSku, rawPlanId, amountPaiseOrInr) {
  const candidate = String(rawSku || "").trim().toUpperCase();
  if (VALID_SKU_SET.has(candidate)) {
    return candidate;
  }
  if (candidate === "MAHA_TET") return "TET_1Y";
  if (candidate === "CTET_PAPER_1" || candidate === "CTET_PAPER_2" || candidate === "CTET_COMBO") return "CTET_1Y";
  if (candidate === "TET_CTET_COMBO") return "TET_CTET_COMBO_1Y";
  if (candidate === "TEACHER_ALL_ACCESS") return "TET_CTET_COMBO_1Y";
  if (candidate === "SCHOLARSHIP_4TH" || candidate === "SCHOLARSHIP_7TH") return "SCHOLARSHIP_COMBO";
  const planCandidate = String(rawPlanId || "").trim().toUpperCase();
  if (VALID_SKU_SET.has(planCandidate)) {
    return planCandidate;
  }
  if (planCandidate === "MAHA_TET") return "TET_1Y";
  if (planCandidate === "CTET_PAPER_1" || planCandidate === "CTET_PAPER_2" || planCandidate === "CTET_COMBO") return "CTET_1Y";
  if (planCandidate === "TET_CTET_COMBO") return "TET_CTET_COMBO_1Y";
  if (planCandidate === "TEACHER_ALL_ACCESS") return "TET_CTET_COMBO_1Y";
  if (planCandidate === "SCHOLARSHIP_4TH" || planCandidate === "SCHOLARSHIP_7TH") return "SCHOLARSHIP_COMBO";
  if (typeof amountPaiseOrInr === "number" && amountPaiseOrInr > 0) {
    const inr = amountPaiseOrInr >= 5e3 ? Math.round(amountPaiseOrInr / 100) : Math.round(amountPaiseOrInr);
    if (inr === 499) return "TET_CTET_COMBO_1Y";
    if (inr === 349) return "TET_CTET_COMBO_6M";
    if (inr === 299) return "TET_1Y";
    if (inr === 199) return "TET_6M";
    if (inr === 99) return "BOARD_CLASS";
  }
  return "BOARD_CLASS";
}

// firebase/index.ts
try {
  setLogLevel("silent");
} catch {
}
function loadFirebaseConfig2() {
  const candidates = [
    path2.resolve(process.cwd(), "firebase-applet-config.json"),
    new URL("./firebase-applet-config.json", import.meta.url),
    new URL("../firebase-applet-config.json", import.meta.url)
  ];
  for (const candidate of candidates) {
    try {
      const raw = fs2.readFileSync(candidate, "utf8");
      if (raw) return JSON.parse(raw);
    } catch {
    }
  }
  throw new Error("Unable to locate or read firebase-applet-config.json");
}
var firebaseConfig2 = loadFirebaseConfig2();
var firebaseServerApp = getApps2().length === 0 ? initializeApp2(firebaseConfig2) : getApp2();
var serverDb = getFirestore(
  firebaseServerApp,
  firebaseConfig2.firestoreDatabaseId
);
var VALID_BOARDS = ["Maharashtra", "CBSE", "ICSE"];
function normalizeBackendBoard(raw) {
  const s = String(raw || "").trim().toUpperCase();
  if (!s || s === "MAHARASHTRA" || s === "MAHARASHTRA STATE BOARD" || s === "MSBSHSE" || s === "MH") {
    return "Maharashtra";
  }
  if (s === "CBSE" || s === "NCERT" || s.includes("CENTRAL BOARD")) {
    return "CBSE";
  }
  if (s === "ICSE" || s === "CISCE" || s.includes("INDIAN CERTIFICATE")) {
    return "ICSE";
  }
  return "Maharashtra";
}
var VALID_CLASS_LEVELS = [
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10"
];
function normalizeBackendClassLevel(raw) {
  const str = String(raw || "").trim();
  const match = /^(?:Class\s*)?(\d{1,2})(?:st|nd|rd|th)?$/i.exec(str);
  if (!match) return null;
  const num = parseInt(match[1], 10);
  if (num >= 1 && num <= 10) {
    return `Class ${num}`;
  }
  return null;
}
function buildBackendBoardClassKey(board, classLevel) {
  const b = normalizeBackendBoard(board);
  const c = normalizeBackendClassLevel(classLevel) || "Class 1";
  return `${b}__${c}`;
}
function parseBackendBoardClassKey(rawKey) {
  const str = String(rawKey || "").trim();
  if (!str) return null;
  if (str.includes("__")) {
    const [bRaw, cRaw] = str.split("__");
    const c2 = normalizeBackendClassLevel(cRaw);
    if (!c2) return null;
    return { board: normalizeBackendBoard(bRaw), classLevel: c2 };
  }
  const c = normalizeBackendClassLevel(str);
  if (!c) return null;
  return { board: "Maharashtra", classLevel: c };
}
function sanitizeEnvValue(val) {
  if (!val) return "";
  return val.trim().replace(/^["']+|["']+$/g, "").trim();
}
function isPlaceholderValue(val) {
  if (!val) return true;
  const upper = val.toUpperCase();
  return upper.includes("YOUR_") || upper.includes("MY_") || upper.includes("REPLACE_") || val === "rzp_test_VACATION_CHAMP";
}
function getResolvedRazorpayCredentials() {
  const rawId = sanitizeEnvValue(
    process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_LIVE_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID
  );
  const rawSecret = sanitizeEnvValue(
    process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_LIVE_KEY_SECRET || process.env.RAZORPAY_SECRET
  );
  const rawWebhookSecret = sanitizeEnvValue(process.env.RAZORPAY_WEBHOOK_SECRET);
  const cleanId = isPlaceholderValue(rawId) ? "" : rawId;
  const cleanSecret = isPlaceholderValue(rawSecret) ? "" : rawSecret;
  const cleanWebhookSecret = isPlaceholderValue(rawWebhookSecret) ? "" : rawWebhookSecret;
  let keyId = cleanId;
  let keySecret = cleanSecret;
  let wasSwappedInEnv = false;
  if (!cleanId.startsWith("rzp_") && cleanSecret.startsWith("rzp_")) {
    keyId = cleanSecret;
    keySecret = cleanId;
    wasSwappedInEnv = true;
  }
  const hasValidKeyId = keyId.startsWith("rzp_live_") || keyId.startsWith("rzp_test_");
  const hasValidSecret = Boolean(
    keySecret && keySecret.length >= 12 && !keySecret.startsWith("rzp_")
  );
  const isConfigured = hasValidKeyId && hasValidSecret;
  const isLive = isConfigured && keyId.startsWith("rzp_live_");
  return {
    keyId: hasValidKeyId ? keyId : "",
    keySecret: hasValidSecret ? keySecret : "",
    webhookSecret: cleanWebhookSecret || (hasValidSecret ? keySecret : ""),
    hasExplicitWebhookSecret: Boolean(cleanWebhookSecret),
    isConfigured,
    isLive,
    wasSwappedInEnv
  };
}
function createRazorpayClient() {
  const creds = getResolvedRazorpayCredentials();
  if (!creds.isConfigured) return null;
  try {
    return new Razorpay({
      key_id: creds.keyId,
      key_secret: creds.keySecret
    });
  } catch (err) {
    console.error("[Firebase/Razorpay] Initialization error:", err);
    return null;
  }
}
async function createRazorpayOrderBackend(params) {
  const { studentId, studentName, email, mobile, selectedBoard, selectedClass, referralCode } = params;
  if (!studentId) {
    throw new Error("Student authentication required.");
  }
  if (params.planId !== "premium" && !params.planSku) {
    throw new Error("Invalid plan selected.");
  }
  const resolvedSku = resolvePlanSku(params.planSku, params.planId);
  const planItem = getPlanCatalogItem(resolvedSku);
  const normalizedBoard = normalizeBackendBoard(selectedBoard);
  const normalizedClass = normalizeBackendClassLevel(selectedClass) || "";
  const planId = "premium";
  const amountInPaise = planItem.amountPaise;
  const amountInRupees = planItem.amountInr;
  const receiptNumber = `REC-VC-${Date.now().toString().slice(-8)}`;
  const creds = getResolvedRazorpayCredentials();
  const rzp = createRazorpayClient();
  if (!rzp || !creds.isConfigured) {
    throw new Error(
      "Razorpay LIVE API Key ID and Key Secret are not configured on the server."
    );
  }
  const orderPromise = rzp.orders.create({
    amount: amountInPaise,
    currency: "INR",
    receipt: receiptNumber,
    notes: {
      studentId: String(studentId).slice(0, 250),
      studentName: String(studentName || "Student").slice(0, 250),
      email: String(email || "").slice(0, 250),
      mobile: String(mobile || "").slice(0, 250),
      selectedBoard: normalizedBoard,
      board: normalizedBoard,
      selectedClass: normalizedClass,
      classLevel: normalizedClass,
      planId: "premium",
      planSku: resolvedSku,
      activatedCategories: planItem.unlockedCategories.join(","),
      subscriptionTier: "premium",
      validityDays: String(planItem.validityDays),
      referralCode: String(referralCode || "").slice(0, 100)
    }
  });
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(
      () => reject(
        new Error(
          "Razorpay order creation timed out after 15 seconds. Please check your network and try again."
        )
      ),
      15e3
    );
  });
  const order = await Promise.race([orderPromise, timeoutPromise]);
  if (!order || !order.id) {
    throw new Error("Razorpay API did not return a valid order ID.");
  }
  return {
    success: true,
    orderId: order.id,
    amount: Number(order.amount) || amountInPaise,
    amountRupees: amountInRupees,
    currency: order.currency || "INR",
    keyId: creds.keyId,
    receiptNumber,
    planId,
    planSku: resolvedSku,
    unlockedCategories: planItem.unlockedCategories,
    planTitle: planItem.title,
    selectedBoard: normalizedBoard,
    selectedClass: normalizedClass || void 0,
    isMock: false,
    mode: creds.isLive ? "LIVE" : "TEST"
  };
}
async function createRazorpayQrCodeBackend(params) {
  const { studentId, studentName, email, mobile, selectedBoard, selectedClass, referralCode } = params;
  if (!studentId) {
    throw new Error("Student authentication required.");
  }
  if (params.planId !== "premium" && !params.planSku) {
    throw new Error("Invalid plan selected.");
  }
  const resolvedSku = resolvePlanSku(params.planSku, params.planId);
  const planItem = getPlanCatalogItem(resolvedSku);
  const normalizedBoard = normalizeBackendBoard(selectedBoard);
  const normalizedClass = normalizeBackendClassLevel(selectedClass) || "";
  const planId = "premium";
  const amountInPaise = planItem.amountPaise;
  const amountInRupees = planItem.amountInr;
  const planTitle = resolvedSku === "BOARD_CLASS" ? normalizedClass ? `PREMIUM PLAN (${normalizedBoard} \u2022 ${normalizedClass}) \u2013 \u20B9${amountInRupees} \u2013 ${planItem.validityDays} Days` : `PREMIUM PLAN (${normalizedBoard}) \u2013 \u20B9${amountInRupees} \u2013 ${planItem.validityDays} Days` : `${planItem.title} \u2013 \u20B9${amountInRupees} \u2013 ${planItem.validityLabel}`;
  const creds = getResolvedRazorpayCredentials();
  if (!creds.isConfigured || !creds.keySecret) {
    throw new Error("Razorpay LIVE API credentials are not configured on the server.");
  }
  const authHeader = "Basic " + Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64");
  const qrRes = await fetch("https://api.razorpay.com/v1/payments/qr_codes", {
    method: "POST",
    headers: {
      Authorization: authHeader,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      type: "upi_qr",
      name: "MyStudyZone",
      usage: "single_use",
      fixed_amount: true,
      payment_amount: amountInPaise,
      description: `${planTitle} \u2022 ${studentName || "Student"}`,
      notes: {
        studentId: String(studentId).slice(0, 250),
        studentName: String(studentName || "Student").slice(0, 250),
        email: String(email || "").slice(0, 250),
        mobile: String(mobile || "").slice(0, 250),
        selectedBoard: normalizedBoard,
        board: normalizedBoard,
        selectedClass: normalizedClass,
        classLevel: normalizedClass,
        planId: "premium",
        planSku: resolvedSku,
        activatedCategories: planItem.unlockedCategories.join(","),
        subscriptionTier: "premium",
        validityDays: String(planItem.validityDays),
        referralCode: String(referralCode || "").slice(0, 100)
      }
    })
  });
  const qrData = await qrRes.json().catch(() => null);
  if (!qrRes.ok || !qrData || !qrData.id) {
    const errorDesc = qrData?.error?.description || `Razorpay QR Code API returned HTTP ${qrRes.status}`;
    console.warn("[Razorpay QR API Error]:", qrData?.error || errorDesc);
    throw new Error(
      `${errorDesc}. Note: If your Razorpay Live account does not have UPI QR enabled yet, please activate UPI QR Codes in Razorpay Dashboard \u2192 Account & Settings \u2192 Payment Methods \u2192 UPI QR.`
    );
  }
  return {
    success: true,
    qrId: qrData.id,
    imageUrl: qrData.image_url,
    amount: amountInPaise,
    amountRupees: amountInRupees,
    currency: "INR",
    planId,
    planSku: resolvedSku,
    unlockedCategories: planItem.unlockedCategories,
    selectedBoard: normalizedBoard,
    selectedClass: normalizedClass || void 0,
    planTitle,
    status: qrData.status || "active",
    createdAt: qrData.created_at || Math.floor(Date.now() / 1e3),
    expiresInSeconds: 600,
    // 10 minutes dynamic countdown
    keyId: creds.keyId,
    referralCode: referralCode || ""
  };
}
async function checkRazorpayQrCodeStatusBackend(params) {
  const { qrId, studentId, studentName, email, mobile, selectedBoard, selectedClass, referralCode } = params;
  const creds = getResolvedRazorpayCredentials();
  if (!creds.isConfigured || !creds.keySecret) {
    throw new Error("Razorpay LIVE API credentials are not configured on the server.");
  }
  const authHeader = "Basic " + Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString("base64");
  const qrRes = await fetch(
    `https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrId)}`,
    {
      headers: { Authorization: authHeader }
    }
  );
  const qrData = await qrRes.json().catch(() => null);
  if (!qrRes.ok || !qrData) {
    throw new Error("Unable to query QR code status from Razorpay API.");
  }
  const resolvedSku = resolvePlanSku(
    qrData?.notes?.planSku,
    params.planSku || params.planId,
    Number(qrData?.payment_amount || 0)
  );
  const planItem = getPlanCatalogItem(resolvedSku);
  const resolvedPlanId = "premium";
  const expectedAmountPaise = planItem.amountPaise;
  const amountRupees = planItem.amountInr;
  const resolvedBoard = normalizeBackendBoard(
    qrData?.notes?.selectedBoard || qrData?.notes?.board || selectedBoard
  );
  const resolvedClass = normalizeBackendClassLevel(qrData?.notes?.selectedClass || qrData?.notes?.classLevel || selectedClass) || void 0;
  const paymentsRes = await fetch(
    `https://api.razorpay.com/v1/payments/qr_codes/${encodeURIComponent(qrId)}/payments`,
    {
      headers: { Authorization: authHeader }
    }
  );
  const paymentsData = await paymentsRes.json().catch(() => null);
  const items = Array.isArray(paymentsData?.items) ? paymentsData.items : [];
  const successfulPayment = items.find(
    (item) => (item.status === "captured" || item.status === "authorized") && Number(item.amount) >= expectedAmountPaise
  );
  if (successfulPayment) {
    const paymentId = successfulPayment.id;
    const orderId = qrId;
    const method = String(successfulPayment.method || "UPI").toUpperCase();
    const activation = await updateStudentSubscriptionInFirestoreBackend({
      studentId: String(studentId),
      studentName: String(studentName || qrData?.notes?.studentName || "Student"),
      email: String(email || qrData?.notes?.email || ""),
      mobile: String(mobile || qrData?.notes?.mobile || ""),
      selectedBoard: resolvedBoard,
      selectedClass: resolvedClass,
      planId: resolvedPlanId,
      planSku: resolvedSku,
      paymentId: String(paymentId),
      orderId: String(orderId),
      signature: `qr_verified_${paymentId}`,
      method,
      amountInr: amountRupees
    });
    return {
      success: true,
      paid: true,
      status: "PAID",
      paymentId,
      orderId,
      method,
      amount: amountRupees,
      planSku: activation.planSku,
      activatedCategoryKeys: activation.activatedCategoryKeys,
      categorySubscriptions: activation.categorySubscriptions,
      selectedBoard: activation.selectedBoard,
      selectedClass: activation.selectedClass,
      transaction: {
        id: `tx_${paymentId}`,
        receiptNumber: activation.receiptNumber,
        studentId: String(studentId),
        studentName: String(studentName || "Student"),
        parentEmail: String(email || ""),
        parentMobile: String(mobile || ""),
        selectedBoard: activation.selectedBoard,
        selectedClass: activation.selectedClass,
        planId: resolvedPlanId,
        planSku: activation.planSku,
        activatedCategories: activation.unlockedCategories,
        planTitle: activation.planLabel,
        amount: amountRupees,
        currency: "INR",
        orderId,
        paymentId,
        signature: `qr_verified_${paymentId}`,
        method,
        status: "SUCCESS",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        membershipStartDate: activation.startDateIso,
        membershipExpiryDate: activation.expiryDateIso
      },
      membership: {
        membershipId: `mem_${paymentId}`,
        studentId: String(studentId),
        studentName: String(studentName || "Student"),
        selectedBoard: activation.selectedBoard,
        selectedClass: activation.selectedClass,
        activatedClasses: activation.activatedClasses,
        activatedClassKeys: activation.activatedClassKeys,
        activatedCategoryKeys: activation.activatedCategoryKeys,
        categorySubscriptions: activation.categorySubscriptions,
        planId: resolvedPlanId,
        planSku: activation.planSku,
        planTitle: activation.planLabel,
        amount: amountRupees,
        startDate: activation.startDateIso,
        expiryDate: activation.expiryDateIso,
        status: "ACTIVE",
        paymentId,
        orderId,
        daysRemaining: activation.daysRemaining
      },
      referralCode: referralCode || qrData?.notes?.referralCode || ""
    };
  }
  if (qrData.status === "closed") {
    return {
      success: true,
      paid: false,
      status: "EXPIRED",
      message: 'QR code has expired. Please click "Generate New QR Code" to proceed.'
    };
  }
  return {
    success: true,
    paid: false,
    status: "WAITING",
    message: "Waiting for UPI payment confirmation..."
  };
}
async function updateStudentSubscriptionInFirestoreBackend(params) {
  const {
    studentId,
    studentName = "Student",
    email = "",
    mobile = "",
    selectedBoard,
    selectedClass,
    paymentId,
    orderId,
    signature = "verified_webhook_signature",
    method = "RAZORPAY",
    amountInr
  } = params;
  const resolvedSku = resolvePlanSku(params.planSku, params.planId, amountInr);
  const planItem = getPlanCatalogItem(resolvedSku);
  const normalizedPlan = "premium";
  const subscriptionTier = "premium";
  const verifiedAmount = planItem.amountInr;
  const now = /* @__PURE__ */ new Date();
  const safeStudentId = String(studentId).trim();
  let existingData = null;
  try {
    existingData = await serverGetDoc("students", safeStudentId);
  } catch (readErr) {
    console.log(
      "[Firestore Backend] Notice reading existing student doc:",
      readErr?.message || readErr
    );
  }
  const resolvedBoard = normalizeBackendBoard(
    selectedBoard || existingData?.board || existingData?.primaryBoard || "Maharashtra"
  );
  const resolvedClass = normalizeBackendClassLevel(selectedClass) || normalizeBackendClassLevel(existingData?.classLevel) || normalizeBackendClassLevel(existingData?.activatedClassLevel) || "Class 1";
  const targetCompositeKey = buildBackendBoardClassKey(resolvedBoard, resolvedClass);
  const isCategoryPlan = planItem.unlockedCategories.length > 0;
  const planLabel = isCategoryPlan ? `${planItem.title} \u2013 \u20B9${verifiedAmount} \u2013 ${planItem.validityLabel}` : `PREMIUM PLAN (${resolvedBoard} \u2022 ${resolvedClass}) \u2013 \u20B9${verifiedAmount} \u2013 365 Days (1 Year)`;
  const existingMap = {};
  if (existingData?.classSubscriptions && typeof existingData.classSubscriptions === "object") {
    for (const [rawKey, rawRec] of Object.entries(existingData.classSubscriptions)) {
      if (!rawRec || typeof rawRec !== "object") continue;
      const parsedKey = parseBackendBoardClassKey(rawKey);
      const cls = normalizeBackendClassLevel(rawRec.classLevel || parsedKey?.classLevel);
      if (!cls) continue;
      const recBoard = rawRec.board ? normalizeBackendBoard(rawRec.board) : rawKey.includes("__") ? parsedKey?.board || "Maharashtra" : "Maharashtra";
      const compositeKey = buildBackendBoardClassKey(recBoard, cls);
      existingMap[compositeKey] = {
        ...rawRec,
        board: recBoard,
        classLevel: cls
      };
    }
  }
  if (existingData?.plan && existingData.plan !== "free" && existingData.activatedClassLevel) {
    const legacyBoard = normalizeBackendBoard(
      existingData.activatedBoard || existingData.primaryBoard || existingData.board || "Maharashtra"
    );
    const legacyClass = normalizeBackendClassLevel(existingData.activatedClassLevel) || normalizeBackendClassLevel(existingData.classLevel) || resolvedClass;
    const legacyCompositeKey = buildBackendBoardClassKey(legacyBoard, legacyClass);
    if (!existingMap[legacyCompositeKey]) {
      existingMap[legacyCompositeKey] = {
        board: legacyBoard,
        classLevel: legacyClass,
        plan: existingData.plan === "basic" ? "basic" : "premium",
        status: "ACTIVE",
        purchasedAt: existingData.planPurchasedAt,
        expiresAt: existingData.planExpiresAt,
        paymentId: existingData.lastPaymentId,
        orderId: existingData.lastOrderId,
        amountInr: 99,
        validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
      };
    }
  }
  const existingCatMap = {};
  if (existingData?.categorySubscriptions && typeof existingData.categorySubscriptions === "object") {
    for (const [catKey, rawRec] of Object.entries(existingData.categorySubscriptions)) {
      if (!rawRec || typeof rawRec !== "object") continue;
      existingCatMap[catKey] = { ...rawRec, categoryId: catKey };
    }
  }
  const collectActiveKeys = (map) => {
    const keys = [];
    const mhClasses = /* @__PURE__ */ new Set();
    for (const [key, rec] of Object.entries(map)) {
      if (!rec || rec.plan === "free") continue;
      if (evaluateSubscriptionValidity(rec.plan, rec.purchasedAt, rec.expiresAt, now).isExpired) {
        continue;
      }
      const parsed = parseBackendBoardClassKey(key);
      const b = normalizeBackendBoard(rec.board || parsed?.board);
      const c = normalizeBackendClassLevel(rec.classLevel || parsed?.classLevel);
      if (!c) continue;
      const comp = buildBackendBoardClassKey(b, c);
      if (!keys.includes(comp)) keys.push(comp);
      if (b === "Maharashtra") mhClasses.add(c);
    }
    return {
      activatedClassKeys: keys,
      activatedClasses: VALID_CLASS_LEVELS.filter((c) => mhClasses.has(c))
    };
  };
  const collectActiveCategories = (catMap) => {
    const activeCats = [];
    for (const [catId, rec] of Object.entries(catMap)) {
      if (!rec || rec.status === "EXPIRED") continue;
      if (evaluateSubscriptionValidity("premium", rec.purchasedAt, rec.expiresAt, now).isExpired) {
        continue;
      }
      if (!activeCats.includes(catId)) {
        activeCats.push(catId);
      }
    }
    return activeCats;
  };
  const existingMatchingEntry = Object.values(existingMap).find((entry) => entry && entry.paymentId === paymentId) || Object.values(existingCatMap).find((entry) => entry && entry.paymentId === paymentId);
  if (existingMatchingEntry || existingData?.lastPaymentId && existingData.lastPaymentId === paymentId) {
    const refEntry = existingMatchingEntry || existingMap[targetCompositeKey] || existingData;
    const refBoard = normalizeBackendBoard(refEntry?.board || resolvedBoard);
    const refClass = refEntry?.classLevel || resolvedClass;
    const refKey = buildBackendBoardClassKey(refBoard, refClass);
    const validity = evaluateSubscriptionValidity(
      "premium",
      refEntry?.purchasedAt || refEntry?.planPurchasedAt,
      refEntry?.expiresAt || refEntry?.planExpiresAt,
      now
    );
    const { activatedClasses: activatedClasses2, activatedClassKeys: activatedClassKeys2 } = collectActiveKeys(existingMap);
    const activatedCategoryKeys2 = collectActiveCategories(existingCatMap);
    return {
      success: true,
      alreadyProcessed: true,
      selectedBoard: refBoard,
      selectedClass: refClass,
      boardClassKey: refKey,
      plan: normalizedPlan,
      planSku: resolvedSku,
      unlockedCategories: planItem.unlockedCategories,
      subscriptionTier,
      planLabel,
      startDateIso: validity.purchaseDateIst || refEntry?.purchasedAt || refEntry?.planPurchasedAt || "",
      expiryDateIso: validity.expiryDateIst || refEntry?.expiresAt || refEntry?.planExpiresAt || "",
      daysRemaining: validity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS,
      receiptNumber: `REC-VC-${paymentId.slice(-6).toUpperCase()}`,
      activatedClasses: activatedClasses2,
      activatedClassKeys: activatedClassKeys2,
      classSubscriptions: existingMap,
      activatedCategoryKeys: activatedCategoryKeys2,
      categorySubscriptions: existingCatMap
    };
  }
  let updatedClassSubscriptions = { ...existingMap };
  let updatedCategorySubscriptions = { ...existingCatMap };
  let startDateIso = "";
  let expiryDateIso = "";
  let daysRemaining = PAID_SUBSCRIPTION_VALIDITY_DAYS;
  let verifiedAtUtcIso = now.toISOString();
  if (isCategoryPlan) {
    for (const catId of planItem.unlockedCategories) {
      const prevCat = existingCatMap[catId];
      const catAct = computeSubscriptionActivationDates({
        verificationTimestamp: now,
        existingPlan: prevCat ? "premium" : "free",
        existingExpiresAt: prevCat?.expiresAt,
        validityDays: planItem.validityDays
      });
      if (!startDateIso) {
        startDateIso = catAct.purchasedDateIst;
        expiryDateIso = catAct.expiryDateIst;
        daysRemaining = catAct.daysRemaining;
        verifiedAtUtcIso = catAct.verifiedAtUtcIso;
      }
      updatedCategorySubscriptions[catId] = {
        categoryId: catId,
        planSku: resolvedSku,
        status: "ACTIVE",
        purchasedAt: catAct.purchasedDateIst,
        expiresAt: catAct.expiryDateIst,
        paymentId: String(paymentId),
        orderId: String(orderId),
        amountInr: verifiedAmount,
        validityDays: planItem.validityDays,
        updatedAt: catAct.verifiedAtUtcIso
      };
    }
  } else {
    const targetExistingEntry = existingMap[targetCompositeKey];
    const activation = computeSubscriptionActivationDates({
      verificationTimestamp: now,
      existingPlan: targetExistingEntry?.plan || "free",
      existingExpiresAt: targetExistingEntry?.expiresAt || void 0,
      validityDays: planItem.validityDays
    });
    startDateIso = activation.purchasedDateIst;
    expiryDateIso = activation.expiryDateIst;
    daysRemaining = activation.daysRemaining;
    verifiedAtUtcIso = activation.verifiedAtUtcIso;
    updatedClassSubscriptions = {
      ...existingMap,
      [targetCompositeKey]: {
        board: resolvedBoard,
        classLevel: resolvedClass,
        plan: normalizedPlan,
        status: "ACTIVE",
        purchasedAt: startDateIso,
        expiresAt: expiryDateIso,
        paymentId: String(paymentId),
        orderId: String(orderId),
        amountInr: verifiedAmount,
        validityDays: planItem.validityDays,
        updatedAt: verifiedAtUtcIso
      }
    };
    if (resolvedClass === "Class 4") {
      updatedCategorySubscriptions["scholarship_4th"] = {
        categoryId: "scholarship_4th",
        planSku: "BOARD_CLASS",
        status: "ACTIVE",
        purchasedAt: startDateIso,
        expiresAt: expiryDateIso,
        paymentId: String(paymentId),
        orderId: String(orderId),
        amountInr: verifiedAmount,
        validityDays: planItem.validityDays,
        updatedAt: verifiedAtUtcIso
      };
    } else if (resolvedClass === "Class 7") {
      updatedCategorySubscriptions["scholarship_7th"] = {
        categoryId: "scholarship_7th",
        planSku: "BOARD_CLASS",
        status: "ACTIVE",
        purchasedAt: startDateIso,
        expiresAt: expiryDateIso,
        paymentId: String(paymentId),
        orderId: String(orderId),
        amountInr: verifiedAmount,
        validityDays: planItem.validityDays,
        updatedAt: verifiedAtUtcIso
      };
    }
  }
  const receiptNumber = `REC-VC-${Date.now().toString().slice(-6)}`;
  const { activatedClasses, activatedClassKeys } = collectActiveKeys(updatedClassSubscriptions);
  const activatedCategoryKeys = collectActiveCategories(updatedCategorySubscriptions);
  const preservedPrimaryBoard = normalizeBackendBoard(
    existingData?.primaryBoard || existingData?.board || resolvedBoard
  );
  const preservedPrimaryClass = normalizeBackendClassLevel(existingData?.primaryClassLevel) || normalizeBackendClassLevel(existingData?.classLevel) || resolvedClass;
  try {
    const studentPatch = {
      id: safeStudentId,
      primaryBoard: preservedPrimaryBoard,
      primaryClassLevel: preservedPrimaryClass,
      activatedClasses,
      activatedClassKeys,
      classSubscriptions: updatedClassSubscriptions,
      activatedCategoryKeys,
      categorySubscriptions: updatedCategorySubscriptions,
      plan: normalizedPlan,
      subscriptionTier,
      planLabel,
      isLifetimeFree: false,
      planPurchasedAt: existingData?.planPurchasedAt || startDateIso,
      planExpiresAt: existingData?.planExpiresAt && existingData.planExpiresAt > expiryDateIso ? existingData.planExpiresAt : expiryDateIso,
      subscriptionValidityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
      subscriptionStatus: "ACTIVE",
      lastPaymentId: paymentId,
      lastOrderId: orderId,
      lastPaymentAmountInr: verifiedAmount,
      verifiedAtUtc: verifiedAtUtcIso,
      subscriptionUpdatedAt: verifiedAtUtcIso
    };
    if (!isCategoryPlan) {
      studentPatch.board = resolvedBoard;
      studentPatch.classLevel = resolvedClass;
      studentPatch.activatedBoard = resolvedBoard;
      studentPatch.activatedClassLevel = resolvedClass;
    }
    await serverSetDoc("students", safeStudentId, studentPatch, { merge: true });
    const safePaymentId = String(paymentId).replace(/[^a-zA-Z0-9_-]/g, "_");
    const txDocId = safePaymentId.startsWith("tx_") ? safePaymentId : `tx_${safePaymentId}`;
    await serverSetDoc(
      "transactions",
      txDocId,
      {
        id: txDocId,
        receiptNumber,
        studentId: safeStudentId.slice(0, 128),
        studentName: String(studentName || "Student").slice(0, 100),
        parentEmail: String(email || "").slice(0, 150),
        parentMobile: String(mobile || "").slice(0, 20),
        selectedBoard: isCategoryPlan ? void 0 : resolvedBoard,
        selectedClass: isCategoryPlan ? void 0 : resolvedClass,
        classLevel: isCategoryPlan ? existingData?.classLevel : resolvedClass,
        planId: normalizedPlan,
        planSku: resolvedSku,
        activatedCategories: planItem.unlockedCategories,
        subscriptionTier,
        planTitle: planLabel,
        amount: verifiedAmount,
        currency: "INR",
        orderId: String(orderId),
        paymentId: String(paymentId),
        signature: String(signature),
        method: String(method || "RAZORPAY").toUpperCase(),
        status: "SUCCESS",
        createdAt: now.toISOString(),
        verifiedAt: now.toISOString(),
        membershipStartDate: startDateIso,
        membershipExpiryDate: expiryDateIso,
        savedToFirestoreAt: now.toISOString()
      },
      { merge: true }
    );
  } catch (writeErr) {
    console.warn(
      "[Firestore Backend] Error updating subscription in Firestore:",
      writeErr?.message || writeErr
    );
  }
  return {
    success: true,
    alreadyProcessed: false,
    selectedBoard: resolvedBoard,
    selectedClass: resolvedClass,
    boardClassKey: targetCompositeKey,
    plan: normalizedPlan,
    planSku: resolvedSku,
    unlockedCategories: planItem.unlockedCategories,
    subscriptionTier,
    planLabel,
    startDateIso,
    expiryDateIso,
    daysRemaining,
    receiptNumber,
    activatedClasses,
    activatedClassKeys,
    classSubscriptions: updatedClassSubscriptions,
    activatedCategoryKeys,
    categorySubscriptions: updatedCategorySubscriptions
  };
}

// functions/webhook.ts
import crypto4 from "crypto";

// src/server/razorpayPaymentStatusService.ts
async function fetchRazorpayPaymentById(paymentId) {
  const cleanPaymentId = String(paymentId || "").trim();
  if (!cleanPaymentId) {
    throw new Error("Payment ID is required to fetch Razorpay payment status.");
  }
  const creds = getResolvedRazorpayCredentials();
  if (!creds.isConfigured || !creds.keyId || !creds.keySecret) {
    throw new Error(
      "Server-side RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are required to query Razorpay API."
    );
  }
  const rzp = createRazorpayClient();
  if (rzp) {
    const payment = await rzp.payments.fetch(
      cleanPaymentId
    );
    return payment;
  }
  const basicAuth = Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString(
    "base64"
  );
  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(cleanPaymentId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        Accept: "application/json"
      }
    }
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.description || `Razorpay API returned HTTP ${response.status} while fetching payment ${cleanPaymentId}`
    );
  }
  return await response.json();
}
async function captureAuthorizedRazorpayPayment(paymentId, amountPaise, currency = "INR") {
  const creds = getResolvedRazorpayCredentials();
  if (!creds.isConfigured || !creds.keyId || !creds.keySecret) {
    throw new Error(
      "Server-side RAZORPAY_KEY_SECRET is not configured for payment capture."
    );
  }
  const rzp = createRazorpayClient();
  if (rzp) {
    const captured = await rzp.payments.capture(
      paymentId,
      amountPaise,
      currency
    );
    return captured;
  }
  const basicAuth = Buffer.from(`${creds.keyId}:${creds.keySecret}`).toString(
    "base64"
  );
  const response = await fetch(
    `https://api.razorpay.com/v1/payments/${encodeURIComponent(paymentId)}/capture`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ amount: amountPaise, currency })
    }
  );
  if (!response.ok) {
    const errBody = await response.json().catch(() => ({}));
    throw new Error(
      errBody?.error?.description || `Failed to capture payment ${paymentId} (HTTP ${response.status})`
    );
  }
  return await response.json();
}
async function verifyAndConfirmCapturedPayment(params) {
  const {
    paymentId,
    orderId = "",
    expectedPlanId,
    expectedPlanSku,
    fallbackMethod = "UPI",
    autoCaptureIfAuthorized = true
  } = params;
  const cleanPaymentId = String(paymentId || "").trim();
  const cleanOrderId = String(orderId || "").trim();
  if (!cleanPaymentId) {
    return {
      confirmed: false,
      status: "missing_payment_id",
      captured: false,
      paymentId: "",
      orderId: cleanOrderId,
      amountPaise: 0,
      amountRupees: 0,
      currency: "INR",
      planId: expectedPlanId || "premium",
      planSku: resolvePlanSku(expectedPlanSku, expectedPlanId),
      subscriptionTier: (expectedPlanId || "premium") === "premium" ? "premium" : "standard",
      method: String(fallbackMethod || "RAZORPAY").toUpperCase(),
      email: "",
      mobile: "",
      notes: {},
      error: "Missing Razorpay payment ID."
    };
  }
  try {
    let payment = await fetchRazorpayPaymentById(cleanPaymentId);
    const inferredPlanId = "premium";
    const resolvedSku = resolvePlanSku(
      expectedPlanSku || payment.notes?.planSku,
      expectedPlanId || payment.notes?.planId,
      Number(payment.amount || 0)
    );
    const planItem = getPlanCatalogItem(resolvedSku);
    const expectedPaise = planItem.amountPaise;
    if (payment.status === "authorized" && autoCaptureIfAuthorized) {
      try {
        payment = await captureAuthorizedRazorpayPayment(
          cleanPaymentId,
          expectedPaise,
          payment.currency || "INR"
        );
        console.log(
          `[Razorpay Capture Service] Successfully captured authorized payment: ${cleanPaymentId}`
        );
      } catch (captureErr) {
        payment = await fetchRazorpayPaymentById(cleanPaymentId);
        if (payment.status !== "captured") {
          return {
            confirmed: false,
            status: payment.status || "authorized",
            captured: Boolean(payment.captured),
            paymentId: cleanPaymentId,
            orderId: payment.order_id || cleanOrderId,
            amountPaise: Number(payment.amount || 0),
            amountRupees: Math.round(Number(payment.amount || 0) / 100),
            currency: payment.currency || "INR",
            planId: inferredPlanId,
            subscriptionTier: inferredPlanId === "premium" ? "premium" : "standard",
            method: String(payment.method || fallbackMethod).toUpperCase(),
            email: String(payment.email || ""),
            mobile: String(payment.contact || ""),
            notes: payment.notes || {},
            error: captureErr?.message || "Payment was authorized but could not be captured."
          };
        }
      }
    }
    const isCaptured = payment.status === "captured" && payment.captured !== false;
    if (!isCaptured) {
      return {
        confirmed: false,
        status: payment.status || "unknown",
        captured: false,
        paymentId: cleanPaymentId,
        orderId: payment.order_id || cleanOrderId,
        amountPaise: Number(payment.amount || 0),
        amountRupees: Math.round(Number(payment.amount || 0) / 100),
        currency: payment.currency || "INR",
        planId: inferredPlanId,
        subscriptionTier: inferredPlanId === "premium" ? "premium" : "standard",
        method: String(payment.method || fallbackMethod).toUpperCase(),
        email: String(payment.email || ""),
        mobile: String(payment.contact || ""),
        notes: payment.notes || {},
        error: `Payment status is '${payment.status}'. Subscriptions are only activated upon confirmed 'captured' status.`
      };
    }
    if (cleanOrderId && payment.order_id && payment.order_id !== cleanOrderId) {
      return {
        confirmed: false,
        status: payment.status,
        captured: false,
        paymentId: cleanPaymentId,
        orderId: payment.order_id,
        amountPaise: Number(payment.amount || 0),
        amountRupees: Math.round(Number(payment.amount || 0) / 100),
        currency: payment.currency || "INR",
        planId: inferredPlanId,
        subscriptionTier: inferredPlanId === "premium" ? "premium" : "standard",
        method: String(payment.method || fallbackMethod).toUpperCase(),
        email: String(payment.email || ""),
        mobile: String(payment.contact || ""),
        notes: payment.notes || {},
        error: `Order ID mismatch: payment belongs to order ${payment.order_id}, expected ${cleanOrderId}.`
      };
    }
    if ((expectedPlanId || expectedPlanSku) && Number(payment.amount) !== expectedPaise) {
      return {
        confirmed: false,
        status: payment.status,
        captured: true,
        paymentId: cleanPaymentId,
        orderId: payment.order_id || cleanOrderId,
        amountPaise: Number(payment.amount || 0),
        amountRupees: Math.round(Number(payment.amount || 0) / 100),
        currency: payment.currency || "INR",
        planId: inferredPlanId,
        planSku: resolvedSku,
        subscriptionTier: inferredPlanId === "premium" ? "premium" : "standard",
        method: String(payment.method || fallbackMethod).toUpperCase(),
        email: String(payment.email || ""),
        mobile: String(payment.contact || ""),
        notes: payment.notes || {},
        error: `Captured payment amount mismatch: expected \u20B9${expectedPaise / 100}, received \u20B9${Number(payment.amount) / 100}.`
      };
    }
    if (payment.currency && payment.currency !== "INR") {
      return {
        confirmed: false,
        status: payment.status,
        captured: true,
        paymentId: cleanPaymentId,
        orderId: payment.order_id || cleanOrderId,
        amountPaise: Number(payment.amount || 0),
        amountRupees: Math.round(Number(payment.amount || 0) / 100),
        currency: payment.currency,
        planId: inferredPlanId,
        planSku: resolvedSku,
        subscriptionTier: inferredPlanId === "premium" ? "premium" : "standard",
        method: String(payment.method || fallbackMethod).toUpperCase(),
        email: String(payment.email || ""),
        mobile: String(payment.contact || ""),
        notes: payment.notes || {},
        error: `Invalid payment currency '${payment.currency}'. Expected INR.`
      };
    }
    return {
      confirmed: true,
      status: "captured",
      captured: true,
      paymentId: payment.id || cleanPaymentId,
      orderId: payment.order_id || cleanOrderId,
      amountPaise: Number(payment.amount),
      amountRupees: Math.round(Number(payment.amount) / 100),
      currency: payment.currency || "INR",
      planId: inferredPlanId,
      planSku: resolvedSku,
      subscriptionTier: inferredPlanId === "premium" ? "premium" : "standard",
      method: String(payment.method || fallbackMethod).toUpperCase(),
      email: String(payment.email || ""),
      mobile: String(payment.contact || ""),
      notes: payment.notes || {}
    };
  } catch (err) {
    return {
      confirmed: false,
      status: "error",
      captured: false,
      paymentId: cleanPaymentId,
      orderId: cleanOrderId,
      amountPaise: 0,
      amountRupees: 0,
      currency: "INR",
      planId: expectedPlanId || "premium",
      subscriptionTier: (expectedPlanId || "premium") === "premium" ? "premium" : "standard",
      method: String(fallbackMethod || "RAZORPAY").toUpperCase(),
      email: "",
      mobile: "",
      notes: {},
      error: err?.message || "Unable to confirm payment capture status with Razorpay API."
    };
  }
}

// functions/webhook.ts
function verifyWebhookSignature(rawBody, signatureHeader) {
  if (!signatureHeader || typeof signatureHeader !== "string") {
    return { valid: false, reason: "Missing X-Razorpay-Signature header." };
  }
  const rawWebhookSecret = sanitizeEnvValue(process.env.RAZORPAY_WEBHOOK_SECRET);
  const creds = getResolvedRazorpayCredentials();
  const candidateSecrets = [];
  if (rawWebhookSecret && !isPlaceholderValue(rawWebhookSecret)) {
    candidateSecrets.push(rawWebhookSecret);
  } else if (creds.keySecret) {
    candidateSecrets.push(creds.keySecret);
  }
  if (candidateSecrets.length === 0) {
    return {
      valid: false,
      reason: "RAZORPAY_WEBHOOK_SECRET is not configured on the server."
    };
  }
  const bodyBuffer = Buffer.isBuffer(rawBody) ? rawBody : Buffer.from(String(rawBody), "utf8");
  const providedSigBuffer = Buffer.from(signatureHeader.trim(), "utf8");
  for (const secret of candidateSecrets) {
    const expectedHex = crypto4.createHmac("sha256", secret).update(bodyBuffer).digest("hex");
    const expectedSigBuffer = Buffer.from(expectedHex, "utf8");
    if (providedSigBuffer.length === expectedSigBuffer.length && crypto4.timingSafeEqual(providedSigBuffer, expectedSigBuffer)) {
      return { valid: true };
    }
  }
  return {
    valid: false,
    reason: "X-Razorpay-Signature verification failed."
  };
}
async function processPaymentCapturedEvent(params) {
  const { paymentEntity, orderEntity, signature } = params;
  const paymentId = String(paymentEntity?.id || "").trim();
  if (!paymentId) {
    throw new Error("Missing payment.entity.id in payment.captured event.");
  }
  const orderId = String(
    paymentEntity?.order_id || orderEntity?.id || `order_webhook_${Date.now()}`
  ).trim();
  const amountPaise = Number(
    paymentEntity?.amount || orderEntity?.amount || 0
  );
  const notes = {
    ...orderEntity?.notes || {},
    ...paymentEntity?.notes || {}
  };
  const studentId = String(notes.studentId || notes.userId || "").trim();
  if (!studentId) {
    throw new Error(
      "Missing studentId in payment notes. Cannot associate payment with a Firestore user document."
    );
  }
  const planId = "premium";
  const resolvedSku = resolvePlanSku(notes.planSku, notes.planId, amountPaise);
  const planItem = getPlanCatalogItem(resolvedSku);
  const amountInr = planItem.amountInr;
  let method = String(paymentEntity?.method || "RAZORPAY").toUpperCase();
  if (amountPaise > 0 && amountPaise < planItem.amountPaise) {
    throw new Error(
      `Webhook payment amount (${amountPaise} paise) is below the \u20B9${amountInr} (${planItem.amountPaise} paise) plan price.`
    );
  }
  const creds = getResolvedRazorpayCredentials();
  if (creds.isConfigured) {
    const apiCaptureCheck = await verifyAndConfirmCapturedPayment({
      paymentId,
      orderId: paymentEntity?.order_id || orderEntity?.id || "",
      expectedPlanId: planId,
      expectedPlanSku: resolvedSku,
      fallbackMethod: method,
      autoCaptureIfAuthorized: true
    });
    if (!apiCaptureCheck.confirmed) {
      throw new Error(
        apiCaptureCheck.error || `Payment ${paymentId} is not confirmed as captured in Razorpay API.`
      );
    }
    if (apiCaptureCheck.method) {
      method = apiCaptureCheck.method;
    }
  } else if (paymentEntity?.status && paymentEntity.status !== "captured" && paymentEntity.status !== "authorized") {
    throw new Error(
      `Webhook payment status '${paymentEntity.status}' is not captured. Subscription was not activated.`
    );
  }
  const existingData = await serverGetDoc("students", studentId).catch(() => null);
  const studentName = String(
    notes.studentName || existingData?.name || "Student"
  ).trim();
  const email = String(
    notes.email || paymentEntity?.email || existingData?.email || ""
  ).trim();
  const mobile = String(
    notes.mobile || paymentEntity?.contact || existingData?.mobile || ""
  ).trim();
  const selectedBoard = normalizeBackendBoard(
    notes.selectedBoard || notes.board || existingData?.board || "Maharashtra"
  );
  const selectedClass = normalizeBackendClassLevel(notes.selectedClass || notes.classLevel) || normalizeBackendClassLevel(existingData?.classLevel) || "Class 1";
  const activation = await updateStudentSubscriptionInFirestoreBackend({
    studentId,
    studentName,
    email,
    mobile,
    selectedBoard,
    selectedClass,
    planId,
    planSku: resolvedSku,
    paymentId,
    orderId,
    signature,
    method,
    amountInr
  });
  return {
    success: true,
    alreadyProcessed: activation.alreadyProcessed,
    studentId,
    studentName,
    selectedBoard: activation.selectedBoard,
    selectedClass: activation.selectedClass,
    boardClassKey: activation.boardClassKey,
    planId: activation.plan,
    planSku: activation.planSku,
    unlockedCategories: activation.unlockedCategories,
    subscriptionTier: activation.subscriptionTier,
    planLabel: activation.planLabel,
    amountInr,
    paymentId,
    orderId,
    method,
    startDateIso: activation.startDateIso,
    expiryDateIso: activation.expiryDateIso,
    daysRemaining: activation.daysRemaining,
    receiptNumber: activation.receiptNumber,
    activatedClasses: activation.activatedClasses || [activation.selectedClass],
    activatedClassKeys: activation.activatedClassKeys || [activation.boardClassKey],
    classSubscriptions: activation.classSubscriptions || {},
    activatedCategoryKeys: activation.activatedCategoryKeys || [],
    categorySubscriptions: activation.categorySubscriptions || {}
  };
}
async function handleRazorpayWebhook(req, res) {
  try {
    const signature = req.headers["x-razorpay-signature"] || req.headers["X-Razorpay-Signature"];
    const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(
      typeof req.body === "string" ? req.body : JSON.stringify(req.body || {}),
      "utf8"
    );
    const verification = verifyWebhookSignature(rawBody, signature);
    if (!verification.valid) {
      return res.status(400).json({
        status: "error",
        message: verification.reason || "Invalid X-Razorpay-Signature."
      });
    }
    const event = JSON.parse(rawBody.toString("utf8"));
    const eventType = String(event?.event || "");
    if (eventType === "payment.captured" || eventType === "order.paid") {
      const paymentEntity = event?.payload?.payment?.entity;
      const orderEntity = event?.payload?.order?.entity;
      if (!paymentEntity || !paymentEntity.id) {
        return res.status(400).json({
          status: "error",
          message: "Missing payment.entity in webhook payload."
        });
      }
      const result = await processPaymentCapturedEvent({
        paymentEntity,
        orderEntity,
        signature: signature || "verified_webhook_signature"
      });
      return res.status(200).json({
        status: "ok",
        event: eventType,
        studentId: result.studentId,
        selectedBoard: result.selectedBoard,
        selectedClass: result.selectedClass,
        boardClassKey: result.boardClassKey,
        plan: result.planId,
        subscriptionTier: result.subscriptionTier,
        planExpiresAt: result.expiryDateIso,
        validityDays: 365,
        alreadyProcessed: result.alreadyProcessed
      });
    }
    return res.status(200).json({ status: "ok", event: eventType });
  } catch (error) {
    console.error("[functions/webhook.ts Error]:", error);
    return res.status(500).json({
      status: "error",
      message: error?.message || "Internal webhook processing error."
    });
  }
}

// server/supportAssistant.ts
import { ThinkingLevel, Type } from "@google/genai";
import fs3 from "fs";
import path3 from "path";

// server/geminiClient.ts
import { GoogleGenAI } from "@google/genai";
var GEMINI_PRIMARY_MODEL = "gemini-4-hydrogen";
var GEMINI_FALLBACK_MODEL = "gemini-3.1-flash-lite";
var GEMINI_IMAGE_MODEL = "gemini-3.1-flash-lite-image";
var GEMINI_MAX_PRIMARY_ATTEMPTS = 3;
function getConfiguredGeminiApiKey() {
  const raw = String(process.env.GEMINI_API_KEY || "").trim().replace(/^["']+|["']+$/g, "").trim();
  if (!raw) return "";
  const upper = raw.toUpperCase();
  if (upper.includes("MY_GEMINI_API_KEY") || upper.includes("YOUR_") || upper.includes("REPLACE_") || upper.includes("EXAMPLE_")) {
    return "";
  }
  return raw;
}
function createGeminiServerClient(explicitApiKey) {
  const apiKey = explicitApiKey || getConfiguredGeminiApiKey();
  if (!apiKey) {
    const missingErr = new Error("MISSING_GEMINI_API_KEY");
    missingErr.code = "MISSING_GEMINI_API_KEY";
    missingErr.status = 503;
    throw missingErr;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build"
      }
    }
  });
}
function isGeminiQuotaError(err) {
  const msg = err instanceof Error ? err.message : String(err || "");
  const status = Number(err?.status || 0);
  const lower = msg.toLowerCase();
  return status === 429 || lower.includes("429") || lower.includes("resource_exhausted") || lower.includes("quota");
}
function isGeminiAuthError(err) {
  const msg = err instanceof Error ? err.message : String(err || "");
  const status = Number(err?.status || 0);
  const lower = msg.toLowerCase();
  return status === 401 || status === 403 || lower.includes("api_key_invalid") || lower.includes("api key not valid") || lower.includes("invalid api key") || lower.includes("permission_denied") || lower.includes("unauthenticated");
}
function isTransientGeminiError(err) {
  if (isGeminiQuotaError(err) || isGeminiAuthError(err)) {
    return false;
  }
  const msg = err instanceof Error ? err.message : String(err || "");
  const status = Number(err?.status || 0);
  const lower = msg.toLowerCase();
  return status === 503 || status === 502 || status === 504 || lower.includes("503") || lower.includes("unavailable") || lower.includes("high demand") || lower.includes("overloaded") || lower.includes("temporarily unavailable") || lower.includes("etimedout") || lower.includes("econnreset") || lower.includes("socket hang up") || lower.includes("fetch failed");
}
function safeParseGeminiJson(rawText) {
  const trimmed = String(rawText || "").trim();
  if (!trimmed) return null;
  const tryParse = (candidate) => {
    try {
      const parsed = JSON.parse(candidate);
      return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  };
  const direct = tryParse(trimmed);
  if (direct) return direct;
  const unfenced = trimmed.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/i, "").trim();
  const parsedUnfenced = tryParse(unfenced);
  if (parsedUnfenced) return parsedUnfenced;
  const firstBrace = unfenced.indexOf("{");
  const lastBrace = unfenced.lastIndexOf("}");
  const sliced = firstBrace >= 0 && lastBrace > firstBrace ? unfenced.slice(firstBrace, lastBrace + 1) : unfenced;
  const parsedSliced = tryParse(sliced);
  if (parsedSliced) return parsedSliced;
  const repaired = sliced.replace(/\\(?!["\\/bfnrtu])/g, "\\\\").replace(/[\u0000-\u0019]+/g, " ");
  return tryParse(repaired);
}
function sleepMs(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function sanitizeFallbackRequestParams(requestParams) {
  if (!requestParams.config || typeof requestParams.config !== "object") {
    return requestParams;
  }
  const configRecord = requestParams.config;
  if (!("thinkingConfig" in configRecord)) {
    return requestParams;
  }
  const nextConfig = { ...configRecord };
  delete nextConfig.thinkingConfig;
  return {
    ...requestParams,
    config: nextConfig
  };
}
function redactPotentialSecrets(raw) {
  return String(raw || "").replace(/AIza[0-9A-Za-z\-_]{20,}/g, "[REDACTED_KEY]");
}
async function generateGeminiContentWithFallback(requestParams, options = {}) {
  const ai = createGeminiServerClient(options.apiKey);
  const maxPrimaryAttempts = Math.min(
    Math.max(Number(options.maxPrimaryAttempts ?? GEMINI_MAX_PRIMARY_ATTEMPTS), 1),
    GEMINI_MAX_PRIMARY_ATTEMPTS
  );
  const requireValidJson = Boolean(options.requireValidJson);
  const validateJson = options.validateJson;
  let attemptsMade = 0;
  let lastError;
  let shouldTryFallback = false;
  for (let attempt = 1; attempt <= maxPrimaryAttempts; attempt += 1) {
    attemptsMade += 1;
    try {
      const response = await ai.models.generateContent({
        model: GEMINI_PRIMARY_MODEL,
        ...requestParams
      });
      const parsedJson = requireValidJson ? safeParseGeminiJson(response.text || "") : null;
      const jsonOk = !requireValidJson || parsedJson !== null && (!validateJson || validateJson(parsedJson));
      if (jsonOk) {
        return {
          response,
          parsedJson,
          modelUsed: GEMINI_PRIMARY_MODEL,
          primaryModel: GEMINI_PRIMARY_MODEL,
          fallbackModel: GEMINI_FALLBACK_MODEL,
          attemptsMade,
          usedFallback: false
        };
      }
      lastError = Object.assign(new Error("AI_INVALID_JSON_RESPONSE"), {
        code: "AI_INVALID_RESPONSE"
      });
      shouldTryFallback = true;
      break;
    } catch (err) {
      lastError = err;
      if (isGeminiQuotaError(err)) {
        shouldTryFallback = true;
        break;
      }
      if (!isTransientGeminiError(err)) {
        if (err && typeof err === "object") {
          err.attemptsMade = attemptsMade;
        }
        throw err;
      }
      if (attempt < maxPrimaryAttempts) {
        const baseDelay = attempt === 1 ? 850 : 2100;
        const jitter = Math.floor(Math.random() * 250);
        await sleepMs(baseDelay + jitter);
      } else {
        shouldTryFallback = true;
      }
    }
  }
  if (!shouldTryFallback) {
    if (lastError && typeof lastError === "object") {
      lastError.attemptsMade = attemptsMade;
    }
    throw lastError;
  }
  await sleepMs(450);
  attemptsMade += 1;
  const fallbackParams = sanitizeFallbackRequestParams(requestParams);
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_FALLBACK_MODEL,
      ...fallbackParams
    });
    const parsedJson = requireValidJson ? safeParseGeminiJson(response.text || "") : null;
    const jsonOk = !requireValidJson || parsedJson !== null && (!validateJson || validateJson(parsedJson));
    if (!jsonOk) {
      const invalidErr = new Error("AI_INVALID_JSON_RESPONSE");
      invalidErr.code = "AI_INVALID_RESPONSE";
      invalidErr.attemptsMade = attemptsMade;
      throw invalidErr;
    }
    return {
      response,
      parsedJson,
      modelUsed: GEMINI_FALLBACK_MODEL,
      primaryModel: GEMINI_PRIMARY_MODEL,
      fallbackModel: GEMINI_FALLBACK_MODEL,
      attemptsMade,
      usedFallback: true
    };
  } catch (fallbackErr) {
    const finalErr = isTransientGeminiError(fallbackErr) || isGeminiQuotaError(fallbackErr) || isGeminiAuthError(fallbackErr) || fallbackErr?.code === "AI_INVALID_RESPONSE" ? fallbackErr : lastError || fallbackErr;
    if (finalErr && typeof finalErr === "object") {
      finalErr.attemptsMade = attemptsMade;
    }
    throw finalErr;
  }
}
function mapGeminiHttpError(err, contextLabel = "MyStudyZone AI") {
  const rawMsg = redactPotentialSecrets(err instanceof Error ? err.message : String(err || "AI error"));
  const code = String(err?.code || "");
  const attemptsMade = Number(err?.attemptsMade || 0) || void 0;
  if (code === "MISSING_GEMINI_API_KEY" || rawMsg.includes("MISSING_GEMINI_API_KEY")) {
    return {
      statusCode: 503,
      errorCode: "MISSING_GEMINI_API_KEY",
      retryable: false,
      attemptsMade,
      message: "GEMINI_API_KEY is not configured on the server. Add GEMINI_API_KEY in Settings -> Secrets to enable live AI generation."
    };
  }
  if (isGeminiAuthError(err)) {
    return {
      statusCode: 403,
      errorCode: "API_KEY_INVALID",
      retryable: false,
      attemptsMade,
      message: "Server Gemini API key was rejected or lacks permission. Please verify GEMINI_API_KEY in Settings -> Secrets."
    };
  }
  if (isGeminiQuotaError(err)) {
    return {
      statusCode: 429,
      errorCode: "QUOTA_EXHAUSTED",
      retryable: true,
      retryAfterSeconds: 30,
      attemptsMade,
      message: "Free-tier Gemini AI usage limit was temporarily reached. Paid billing is never activated automatically \u2014 please wait a moment and retry."
    };
  }
  if (isTransientGeminiError(err)) {
    return {
      statusCode: 503,
      errorCode: "AI_UNAVAILABLE",
      retryable: true,
      retryAfterSeconds: 10,
      attemptsMade,
      message: "Free Gemini AI servers are temporarily busy (HTTP 503) even after automatic retries. Please click Retry in a few seconds."
    };
  }
  if (code === "AI_INVALID_RESPONSE" || rawMsg.includes("AI_INVALID_JSON_RESPONSE")) {
    return {
      statusCode: 502,
      errorCode: "AI_INVALID_RESPONSE",
      retryable: true,
      retryAfterSeconds: 5,
      attemptsMade,
      message: `${contextLabel} received an incomplete response from Gemini AI. Please click Retry.`
    };
  }
  return {
    statusCode: 502,
    errorCode: "AI_SERVICE_ERROR",
    retryable: true,
    retryAfterSeconds: 5,
    attemptsMade,
    message: `${contextLabel} could not complete AI processing right now. Please retry.`
  };
}

// src/data/helpSupportKnowledgeBase.ts
var SUPPORT_NAVIGATION_ALLOWLIST = {
  open_worksheets: {
    defaultLabel: "OPEN WORKSHEETS",
    description: "Class-wise & board-wise online interactive worksheets (Classes 1 to 10)"
  },
  open_syllabus: {
    defaultLabel: "OPEN SYLLABUS & STUDY NOTES",
    description: "Chapter-wise study notes, syllabus concepts, formulas & solved examples"
  },
  open_all_courses: {
    defaultLabel: "OPEN COURSES (CLASSES 1\u201310)",
    description: "All Courses directory for Maharashtra, CBSE, and ICSE Boards"
  },
  open_quizzes: {
    defaultLabel: "OPEN PRACTICE QUIZZES",
    description: "4-level subject practice quizzes with zero repeated questions"
  },
  open_scholarship: {
    defaultLabel: "OPEN 4TH & 7TH SCHOLARSHIP",
    description: "MSCE Pune Standard 4th (PSE) and Standard 7th (UPS) Scholarship prep & mocks"
  },
  open_tet_ctet: {
    defaultLabel: "OPEN TET & CTET EXAM PREP",
    description: "MAHA TET and CTET Paper 1 & Paper 2 full-length CBT mock tests"
  },
  open_teacher_resources: {
    defaultLabel: "OPEN TEACHER PORTAL",
    description: "Teacher Portal for Classes 1\u201310 worksheets, lesson planner, notes & TET/CTET"
  },
  open_lesson_planner: {
    defaultLabel: "OPEN TEACHER LESSON PLANNER",
    description: "Annual, Monthly & Daily Lesson Planner with A4 PDF export for teachers"
  },
  open_student_portal: {
    defaultLabel: "OPEN STUDENT PORTAL",
    description: "Student Portal dashboard for Classes 1\u201310 study notes, worksheets & exams"
  },
  open_parent_portal: {
    defaultLabel: "OPEN PARENT PORTAL",
    description: "Parent Portal for child account linking, progress reports & attendance tracking"
  },
  open_college_portal: {
    defaultLabel: "OPEN COLLEGE PORTAL",
    description: "College & School Portal for divisions, faculty allocation, student roster & analytics"
  },
  open_institute_portal: {
    defaultLabel: "OPEN INSTITUTE PORTAL",
    description: "Coaching & Skill Institute Portal for batches, mock test series, fees & certificates"
  },
  open_ai_tools: {
    defaultLabel: "OPEN AI GENERATOR & TOOLS",
    description: "AI Generator Studio for worksheets, notes, question papers, quizzes & slides"
  },
  open_question_paper_generator: {
    defaultLabel: "OPEN QUESTION PAPER GENERATOR",
    description: "AI Question Paper Generator for formal 20\u2013100 mark exam papers with marking schemes"
  },
  open_dictionary: {
    defaultLabel: "OPEN TRILINGUAL DICTIONARY",
    description: "Original MyStudyZone English\u2013Marathi\u2013Hindi Trilingual Dictionary"
  },
  open_thought_of_the_day: {
    defaultLabel: "OPEN THOUGHT OF THE DAY",
    description: "1,000+ trilingual motivational & educational Thoughts of the Day"
  },
  open_stories: {
    defaultLabel: "OPEN STORY WORLD",
    description: "45+ English, Hindi & Marathi audio stories with voice narration & morals"
  },
  open_shivaji: {
    defaultLabel: "OPEN SHIVAJI MAHARAJ STORIES",
    description: "50 chronological Chhatrapati Shivaji Maharaj historical chapters with audio"
  },
  open_drawing: {
    defaultLabel: "OPEN DRAWING STUDIO",
    description: "Digital colouring templates, drawing canvas & saved artwork gallery"
  },
  open_puzzles: {
    defaultLabel: "OPEN BRAIN PUZZLES",
    description: "Free interactive logic riddles and lateral thinking puzzles"
  },
  open_sudoku: {
    defaultLabel: "OPEN SUDOKU",
    description: "Free 4x4, 6x6 and 9x9 interactive Sudoku challenges"
  },
  open_cricket: {
    defaultLabel: "OPEN CRICKET & GK",
    description: "Cricket Champions Hub and General Knowledge quizzes"
  },
  open_ai_academy: {
    defaultLabel: "OPEN AI LEARNING ACADEMY",
    description: "AI Learning Academy & Future Skills modules"
  },
  open_other_programs: {
    defaultLabel: "OPEN SPECIAL LEARNING",
    description: "All Special Learning studios and enrichment programs"
  },
  open_demo: {
    defaultLabel: "OPEN FREE DEMO TESTS",
    description: "Free visitor demo quizzes, curriculum previews & full-length demo mock tests"
  },
  open_certificates: {
    defaultLabel: "OPEN CERTIFICATES & LEADERBOARD",
    description: "Milestone Champion Certificates and leaderboard rankings"
  },
  open_referrals: {
    defaultLabel: "OPEN REFER & EARN",
    description: "Referral link sharing and \u20B95 cashback wallet"
  },
  open_profile: {
    defaultLabel: "OPEN MY ACCOUNT",
    description: "Personal profile, active plans, UID and account details"
  },
  open_plans: {
    defaultLabel: "VIEW PLANS & PRICING",
    description: "Free \u20B90 Lifetime plan, \u20B999 / 365 Days class plans & TET/CTET plans"
  },
  open_login: {
    defaultLabel: "OPEN STUDENT LOGIN",
    description: "Sign in with registered email and password"
  },
  open_teacher_login: {
    defaultLabel: "OPEN TEACHER LOGIN",
    description: "Dedicated Teacher Portal sign-in"
  },
  open_register: {
    defaultLabel: "OPEN REGISTRATION",
    description: "Create a new Student, Teacher, Parent, College or Institute account"
  },
  open_password_reset: {
    defaultLabel: "OPEN PASSWORD RESET",
    description: "Reset forgotten password via registered email link"
  },
  open_dashboard: {
    defaultLabel: "OPEN MAIN DASHBOARD",
    description: "Return to the main MyStudyZone home dashboard"
  }
};
function buildNavigationAction(id, targetClass, targetBoard, targetPortal) {
  const base = SUPPORT_NAVIGATION_ALLOWLIST[id];
  const resolvedPortal = targetPortal && targetPortal !== "visitor" && targetPortal !== "homepage" ? targetPortal : void 0;
  let label = base.defaultLabel;
  if (id === "open_worksheets" && targetClass) {
    label = `OPEN ${targetClass.toUpperCase()} WORKSHEETS`;
  } else if (id === "open_syllabus" && targetClass) {
    label = `OPEN ${targetClass.toUpperCase()} SYLLABUS`;
  } else if (id === "open_all_courses" && targetBoard) {
    label = `OPEN ${targetBoard.toUpperCase()} COURSES`;
  } else if (id === "open_login" && resolvedPortal) {
    const loginLabels = {
      student: "OPEN STUDENT LOGIN",
      teacher: "OPEN TEACHER LOGIN",
      parent: "OPEN PARENT LOGIN",
      college: "OPEN COLLEGE LOGIN",
      institute: "OPEN INSTITUTE LOGIN"
    };
    label = loginLabels[resolvedPortal];
  } else if (id === "open_register" && resolvedPortal) {
    const registerLabels = {
      student: "OPEN STUDENT REGISTRATION",
      teacher: "OPEN TEACHER REGISTRATION",
      parent: "OPEN PARENT REGISTRATION",
      college: "OPEN COLLEGE REGISTRATION",
      institute: "OPEN INSTITUTE REGISTRATION"
    };
    label = registerLabels[resolvedPortal];
  }
  return {
    id,
    label,
    ...targetClass ? { targetClass } : {},
    ...targetBoard ? { targetBoard } : {},
    ...resolvedPortal ? { targetPortal: resolvedPortal } : {}
  };
}
function detectQueryLanguage(text) {
  const raw = String(text || "").trim();
  if (!raw) return "en";
  if (/[\u0900-\u097F]/.test(raw)) {
    const marathiHints = [
      "\u0906\u0939\u0947",
      "\u0906\u0939\u0947\u0924",
      "\u0928\u093E\u0939\u0940",
      "\u0915\u0941\u0920\u0947",
      "\u0915\u0938\u0947",
      "\u0915\u0938\u093E",
      "\u0915\u0936\u0940",
      "\u092E\u093E\u091D\u0940",
      "\u092E\u093E\u091D\u093E",
      "\u092E\u093E\u091D\u0947",
      "\u0907\u092F\u0924\u094D\u0924\u093E",
      "\u0905\u092D\u094D\u092F\u093E\u0938\u0915\u094D\u0930\u092E",
      "\u0936\u093F\u0915\u094D\u0937\u0915",
      "\u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940",
      "\u092A\u093E\u0939\u093F\u091C\u0947",
      "\u092E\u0926\u0924",
      "\u0932\u0949\u0917\u093F\u0928",
      "\u0928\u094B\u0902\u0926\u0923\u0940",
      "\u0915\u0943\u092A\u092F\u093E",
      "\u092E\u093F\u0933\u0947\u0932",
      "\u092C\u0918\u093E\u092F\u091A\u0947",
      "\u0938\u093E\u0902\u0917\u093E",
      "\u0915\u0930\u093E\u092F\u091A\u0947",
      "\u0935\u093F\u0938\u0930\u0932\u094B",
      "\u092A\u093E\u0938\u0935\u0930\u094D\u0921"
    ];
    const hindiHints = [
      "\u0939\u0948",
      "\u0939\u0948\u0902",
      "\u0928\u0939\u0940\u0902",
      "\u0915\u0939\u093E\u0901",
      "\u0915\u0939\u093E\u0902",
      "\u0915\u0948\u0938\u0947",
      "\u092E\u0947\u0930\u093E",
      "\u092E\u0947\u0930\u0940",
      "\u092E\u0947\u0930\u0947",
      "\u0915\u0915\u094D\u0937\u093E",
      "\u091A\u093E\u0939\u093F\u090F",
      "\u092E\u0926\u0926",
      "\u092C\u0924\u093E\u0907\u090F",
      "\u092E\u093F\u0932\u0947\u0917\u093E",
      "\u092E\u093F\u0932\u0947\u0917\u0940",
      "\u0915\u0930\u0947\u0902",
      "\u0916\u094B\u0932\u0947\u0902",
      "\u092D\u0942\u0932",
      "\u0917\u092F\u093E",
      "\u0926\u0947\u0916\u0928\u093E",
      "\u092C\u0924\u093E\u0913",
      "\u091B\u093E\u0924\u094D\u0930"
    ];
    let mrScore = 0;
    let hiScore = 0;
    for (const w of marathiHints) if (raw.includes(w)) mrScore += 1;
    for (const w of hindiHints) if (raw.includes(w)) hiScore += 1;
    if (mrScore > hiScore) return "mr";
    if (hiScore > 0) return "hi";
    if (raw.includes("\u0933") || /्या|चे|ची|चा|तील|मध्ये/.test(raw)) return "mr";
    return "hi";
  }
  const lower = raw.toLowerCase();
  const marathiRoman = [
    "kuthe",
    "kase",
    "kasa",
    "kashi",
    "iyatta",
    "abhyaskram",
    "shikshak",
    "pahije",
    "visarlo",
    "milel",
    "aahe",
    "ahe",
    "majha",
    "majhi",
    "krpaya",
    "sanga"
  ];
  const hindiRoman = [
    "kaha",
    "kahan",
    "kaise",
    "kya",
    "milega",
    "milegi",
    "chahiye",
    "madad",
    "batao",
    "bataiye",
    "kaksha",
    "bhul",
    "gaya",
    "karna",
    "dekho",
    "mera",
    "meri",
    "hai"
  ];
  let mrR = 0;
  let hiR = 0;
  for (const w of marathiRoman) {
    if (new RegExp(`\\b${w}\\b`, "i").test(lower)) mrR += 1;
  }
  for (const w of hindiRoman) {
    if (new RegExp(`\\b${w}\\b`, "i").test(lower)) hiR += 1;
  }
  if (mrR > hiR && mrR >= 1) return "mr";
  if (hiR >= 1) return "hi";
  return "en";
}
function extractClassLevel(text) {
  const normalized = String(text || "").replace(/[०१२३४५६७८९]/g, (d) => String("\u0966\u0967\u0968\u0969\u096A\u096B\u096C\u096D\u096E\u096F".indexOf(d))).toLowerCase();
  const match = /(?:class|std|standard|grade|kaksha|iyatta|कक्षा|इयत्ता)\s*[-:]?\s*(10|9|8|7|6|5|4|3|2|1)(?:st|nd|rd|th|vi|wi|ve|ती|री|ली|थी|वी|व्या)?\b/i.exec(
    normalized
  ) || /\b(10|9|8|7|6|5|4|3|2|1)(?:st|nd|rd|th)\s*(?:class|std|standard|worksheet|worksheets|syllabus|notes|quiz|quizzes)\b/i.exec(
    normalized
  );
  if (match) {
    const n = parseInt(match[1], 10);
    if (n >= 1 && n <= 10) return `Class ${n}`;
  }
  const wordMap = {
    first: "Class 1",
    second: "Class 2",
    third: "Class 3",
    fourth: "Class 4",
    fifth: "Class 5",
    sixth: "Class 6",
    seventh: "Class 7",
    eighth: "Class 8",
    ninth: "Class 9",
    tenth: "Class 10"
  };
  for (const [word, cls] of Object.entries(wordMap)) {
    if (new RegExp(`\\b${word}\\b`, "i").test(normalized)) return cls;
  }
  return void 0;
}
function extractBoard(text) {
  const lower = String(text || "").toLowerCase();
  if (/\bcbse\b|\bncert\b|सीबीएसई/.test(lower)) return "CBSE";
  if (/\bicse\b|\bcisce\b|आयसीएसई/.test(lower)) return "ICSE";
  if (/maharashtra|maharastra|ssc|balbharati|msce|महाराष्ट्र/.test(lower)) return "Maharashtra";
  return void 0;
}
function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (Math.abs(m - n) > 2) return 3;
  const dp = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= n; j++) {
      const tmp = dp[j];
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[j] = Math.min(dp[j] + 1, dp[j - 1] + 1, prev + cost);
      prev = tmp;
    }
  }
  return dp[n];
}
function tokenizeNormalized(text) {
  return String(text || "").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean);
}
function hasFuzzyKeyword(tokens, rawLower, keywords) {
  for (const kw of keywords) {
    if (kw.includes(" ")) {
      if (rawLower.includes(kw)) return true;
      continue;
    }
    if (tokens.includes(kw) || rawLower.includes(kw)) return true;
    if (kw.length >= 5) {
      for (const tok of tokens) {
        if (tok.length >= 4 && levenshtein(tok, kw) <= (kw.length >= 8 ? 2 : 1)) {
          return true;
        }
      }
    }
  }
  return false;
}
var KB_TOPICS = [
  {
    id: "greeting",
    priority: 10,
    keywords: ["hello", "hi", "hey", "namaste", "namaskar", "good morning", "good afternoon", "good evening", "\u0928\u092E\u0938\u094D\u0924\u0947", "\u0928\u092E\u0938\u094D\u0915\u093E\u0930", "\u0939\u0945\u0932\u094B"],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_lesson_planner", "open_question_paper_generator", "open_tet_ctet"] : role === "parent" ? ["open_parent_portal", "open_register", "open_login"] : role === "college" ? ["open_college_portal", "open_register", "open_login"] : role === "institute" ? ["open_institute_portal", "open_register", "open_login"] : role === "student" ? ["open_syllabus", "open_worksheets", "open_quizzes"] : ["open_student_portal", "open_teacher_resources", "open_parent_portal"],
    responses: {
      en: (_c, _b, role) => {
        if (role === "teacher") {
          return "Hello Teacher! I am your Teacher Portal Help & Support Assistant.\n\nI can help you step by step with:\n\u2022 Teacher Lesson Planner (Annual, Monthly & Daily plans with A4 PDF export)\n\u2022 AI Question Paper Generator & Worksheet / Assignment Builders\n\u2022 Classes 1\u201310 Teaching Materials (Maharashtra, CBSE & ICSE)\n\u2022 MAHA TET & CTET Paper 1 & 2 Mock Tests\n\nWhat would you like help with today?";
        }
        if (role === "parent") {
          return "Hello Parent! I am your Parent Portal Help & Support Assistant.\n\nI can help you with:\n\u2022 Parent Registration & Login\n\u2022 Linking your child\u2019s Student account\n\u2022 Tracking subject progress, quiz scores, and attendance reports\n\nHow can I assist you today?";
        }
        if (role === "college") {
          return "Hello! I am your College Portal Help & Support Assistant.\n\nI can guide you through:\n\u2022 College / School Registration & Login\n\u2022 Classes, Streams & Divisions setup\n\u2022 Faculty Subject Allocation & Student Directory\n\u2022 Institutional Calendar, Result Analytics & Circulars\n\nWhat would you like help with today?";
        }
        if (role === "institute") {
          return "Hello! I am your Institute Portal Help & Support Assistant.\n\nI can guide you through:\n\u2022 Institute Registration & Login\n\u2022 Coaching Batches & Mock Test Series\n\u2022 18 Skill Academy Programs (Abacus, Vedic Maths, Phonics, Coding)\n\u2022 Trainer Roster, Fee Ledger & Certificates\n\nHow can I assist you today?";
        }
        if (role === "student") {
          return "Hello! I am your Student Portal Help & Support Assistant.\n\nI can help you step by step with:\n\u2022 Registration & Login\n\u2022 Finding Subjects, Chapters & Study Notes (Classes 1\u201310)\n\u2022 Interactive Worksheets & 4-Level Practice Quizzes\n\u2022 4th & 7th Scholarship, Trilingual Dictionary & \u20B999 Class Plans\n\nWhat would you like help with today?";
        }
        return "Hello! I am your MyStudyZone AI Help & Support Assistant.\n\nI can guide you step by step across all 5 portals:\n1. Student Portal: Registration, finding subjects & chapters, study notes, worksheets, online exams & \u20B999 class plan.\n2. Teacher Portal: Registration, Lesson Planner (Annual/Monthly/Daily), Question Paper Generator & TET/CTET.\n3. Parent Portal: Registration, linking child student accounts, progress reports & attendance.\n4. College Portal: Divisions, faculty allocation, student roster, calendar & result analytics.\n5. Institute Portal: Coaching batches, mock test series, 18 skill programs, fee ledger & certificates.\n\nWhat would you like help with today?";
      },
      hi: (_c, _b, role) => {
        if (role === "teacher") {
          return "\u0928\u092E\u0938\u094D\u0924\u0947 \u0936\u093F\u0915\u094D\u0937\u0915 \u092E\u0939\u094B\u0926\u092F! \u092E\u0948\u0902 \u0906\u092A\u0915\u093E Teacher Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u0915 \u0939\u0942\u0901\u0964\n\n\u092E\u0948\u0902 \u0906\u092A\u0915\u0940 \u0907\u0928 \u0935\u093F\u0937\u092F\u094B\u0902 \u092E\u0947\u0902 \u092E\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901:\n\u2022 Teacher Lesson Planner (\u0935\u093E\u0930\u094D\u0937\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u0935 \u0926\u0948\u0928\u093F\u0915 \u092A\u093E\u0920 \u092F\u094B\u091C\u0928\u093E + A4 PDF)\n\u2022 AI \u092A\u094D\u0930\u0936\u094D\u0928-\u092A\u0924\u094D\u0930 (Question Paper) \u0935 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u091C\u0928\u0930\u0947\u091F\u0930\n\u2022 \u0915\u0915\u094D\u0937\u093E 1\u201310 \u0936\u093F\u0915\u094D\u0937\u0923 \u0938\u093E\u092E\u0917\u094D\u0930\u0940 \u0914\u0930 MAHA TET / CTET \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F\n\n\u092C\u0924\u093E\u0907\u090F, \u0906\u091C \u092E\u0948\u0902 \u0906\u092A\u0915\u0940 \u0915\u094D\u092F\u093E \u092E\u0926\u0926 \u0915\u0930\u0942\u0901?";
        }
        if (role === "parent") {
          return "\u0928\u092E\u0938\u094D\u0924\u0947! \u092E\u0948\u0902 \u0906\u092A\u0915\u093E Parent Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u0915 \u0939\u0942\u0901\u0964 \u092E\u0948\u0902 \u0905\u092D\u093F\u092D\u093E\u0935\u0915 \u092A\u0902\u091C\u0940\u0915\u0930\u0923, \u092C\u091A\u094D\u091A\u0947 \u0915\u0947 \u091B\u093E\u0924\u094D\u0930 \u0916\u093E\u0924\u0947 \u0915\u094B \u0932\u093F\u0902\u0915 \u0915\u0930\u0928\u0947 \u0914\u0930 \u092A\u094D\u0930\u094B\u0917\u094D\u0930\u0947\u0938 \u0930\u093F\u092A\u094B\u0930\u094D\u091F \u0926\u0947\u0916\u0928\u0947 \u092E\u0947\u0902 \u0906\u092A\u0915\u0940 \u092E\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901\u0964 \u092C\u0924\u093E\u0907\u090F, \u0915\u094D\u092F\u093E \u0938\u0939\u093E\u092F\u0924\u093E \u091A\u093E\u0939\u093F\u090F?";
        }
        if (role === "college") {
          return "\u0928\u092E\u0938\u094D\u0924\u0947! \u092E\u0948\u0902 \u0906\u092A\u0915\u093E College Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u0915 \u0939\u0942\u0901\u0964 \u092E\u0948\u0902 \u0915\u0949\u0932\u0947\u091C \u092A\u0902\u091C\u0940\u0915\u0930\u0923, \u0921\u093F\u0935\u0940\u091C\u093C\u0928, \u092B\u0948\u0915\u0932\u094D\u091F\u0940 \u0906\u0935\u0902\u091F\u0928, \u091B\u093E\u0924\u094D\u0930 \u0938\u0942\u091A\u0940 \u0914\u0930 \u092A\u0930\u093F\u0923\u093E\u092E \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u092E\u0947\u0902 \u0906\u092A\u0915\u0940 \u0938\u0939\u093E\u092F\u0924\u093E \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901\u0964";
        }
        if (role === "institute") {
          return "\u0928\u092E\u0938\u094D\u0924\u0947! \u092E\u0948\u0902 \u0906\u092A\u0915\u093E Institute Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u0915 \u0939\u0942\u0901\u0964 \u092E\u0948\u0902 \u0915\u094B\u091A\u093F\u0902\u0917 \u092C\u0948\u091A, \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0938\u0940\u0930\u0940\u091C\u093C, 18 \u0938\u094D\u0915\u093F\u0932 \u092A\u094D\u0930\u094B\u0917\u094D\u0930\u093E\u092E \u0914\u0930 \u092B\u0940\u0938 \u0932\u0947\u091C\u0930 \u092E\u0947\u0902 \u0906\u092A\u0915\u0940 \u092E\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901\u0964";
        }
        if (role === "student") {
          return "\u0928\u092E\u0938\u094D\u0924\u0947! \u092E\u0948\u0902 \u0906\u092A\u0915\u093E Student Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u0915 \u0939\u0942\u0901\u0964 \u092E\u0948\u0902 \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938, \u0935\u0930\u094D\u0915\u0936\u0940\u091F, \u0911\u0928\u0932\u093E\u0907\u0928 \u0915\u094D\u0935\u093F\u091C\u093C, \u0938\u094D\u0915\u0949\u0932\u0930\u0936\u093F\u092A, \u0936\u092C\u094D\u0926\u0915\u094B\u0936 \u0914\u0930 \u20B999 \u092A\u094D\u0932\u093E\u0928 \u0915\u0947 \u092C\u093E\u0930\u0947 \u092E\u0947\u0902 \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923 \u092E\u0926\u0926 \u0915\u0930 \u0938\u0915\u0924\u093E \u0939\u0942\u0901\u0964";
        }
        return "\u0928\u092E\u0938\u094D\u0924\u0947! \u092E\u0948\u0902 \u0906\u092A\u0915\u093E MyStudyZone AI \u0939\u0947\u0932\u094D\u092A \u090F\u0902\u0921 \u0938\u092A\u094B\u0930\u094D\u091F \u0938\u0939\u093E\u092F\u0915 \u0939\u0942\u0901\u0964\n\n\u092E\u0948\u0902 \u0938\u092D\u0940 5 \u092A\u094B\u0930\u094D\u091F\u0932\u094D\u0938 (Student, Teacher, Parent, College, Institute) \u0915\u0947 \u0932\u093F\u090F \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0928 \u0926\u0947\u0924\u093E \u0939\u0942\u0901\u0964 \u092C\u0924\u093E\u0907\u090F, \u0906\u091C \u092E\u0948\u0902 \u0906\u092A\u0915\u0940 \u0915\u094D\u092F\u093E \u092E\u0926\u0926 \u0915\u0930\u0942\u0901?";
      },
      mr: (_c, _b, role) => {
        if (role === "teacher") {
          return "\u0928\u092E\u0938\u094D\u0915\u093E\u0930! \u092E\u0940 \u0924\u0941\u092E\u091A\u093E Teacher Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u094D\u092F\u0915 \u0906\u0939\u0947.\n\n\u092E\u0940 \u0924\u0941\u092E\u094D\u0939\u093E\u0932\u093E \u0916\u093E\u0932\u0940\u0932 \u0938\u0941\u0935\u093F\u0927\u093E\u0902\u0938\u093E\u0920\u0940 \u092E\u0926\u0924 \u0915\u0930\u0942 \u0936\u0915\u0924\u094B:\n\u2022 Teacher Lesson Planner (\u0935\u093E\u0930\u094D\u0937\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u0935 \u0926\u0948\u0928\u0902\u0926\u093F\u0928 \u092A\u093E\u0920 \u0928\u093F\u092F\u094B\u091C\u0928 + A4 PDF)\n\u2022 AI \u092A\u094D\u0930\u0936\u094D\u0928\u092A\u0924\u094D\u0930\u093F\u0915\u093E (Question Paper) \u0935 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u091C\u0928\u0930\u0947\u091F\u0930\n\u2022 \u0907\u092F\u0924\u094D\u0924\u093E \u0967\u2013\u0967\u0966 \u0905\u0927\u094D\u092F\u092F\u0928 \u0938\u093E\u0939\u093F\u0924\u094D\u092F \u0906\u0923\u093F MAHA TET / CTET \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F\n\n\u0938\u093E\u0902\u0917\u093E, \u0906\u091C \u0924\u0941\u092E\u094D\u0939\u093E\u0932\u093E \u0915\u0936\u0940 \u092E\u0926\u0924 \u0939\u0935\u0940 \u0906\u0939\u0947?";
        }
        if (role === "parent") {
          return "\u0928\u092E\u0938\u094D\u0915\u093E\u0930! \u092E\u0940 \u0924\u0941\u092E\u091A\u093E Parent Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u094D\u092F\u0915 \u0906\u0939\u0947. \u092A\u093E\u0932\u0915 \u0928\u094B\u0902\u0926\u0923\u0940, \u092E\u0941\u0932\u093E\u091A\u0947 \u0916\u093E\u0924\u0947 \u091C\u094B\u0921\u0923\u0947 \u0906\u0923\u093F \u092A\u094D\u0930\u0917\u0924\u0940 \u0905\u0939\u0935\u093E\u0932 \u092A\u093E\u0939\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u092E\u0940 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0928 \u0915\u0930\u0942 \u0936\u0915\u0924\u094B.";
        }
        if (role === "college") {
          return "\u0928\u092E\u0938\u094D\u0915\u093E\u0930! \u092E\u0940 \u0924\u0941\u092E\u091A\u093E College Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u094D\u092F\u0915 \u0906\u0939\u0947. \u0915\u0949\u0932\u0947\u091C \u0928\u094B\u0902\u0926\u0923\u0940, \u0924\u0941\u0915\u0921\u094D\u092F\u093E, \u0936\u093F\u0915\u094D\u0937\u0915 \u0928\u093F\u092F\u094B\u091C\u0928, \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940 \u092F\u093E\u0926\u0940 \u0906\u0923\u093F \u0928\u093F\u0915\u093E\u0932 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u092F\u093E\u092C\u093E\u092C\u0924 \u092E\u0940 \u092E\u0926\u0924 \u0915\u0930\u0942 \u0936\u0915\u0924\u094B.";
        }
        if (role === "institute") {
          return "\u0928\u092E\u0938\u094D\u0915\u093E\u0930! \u092E\u0940 \u0924\u0941\u092E\u091A\u093E Institute Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u094D\u092F\u0915 \u0906\u0939\u0947. \u0915\u094B\u091A\u093F\u0902\u0917 \u092C\u0945\u091A\u0947\u0938, \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0938\u093F\u0930\u0940\u091C, \u0967\u096E \u0915\u094C\u0936\u0932\u094D\u092F \u0909\u092A\u0915\u094D\u0930\u092E \u0906\u0923\u093F \u092B\u0940 \u0932\u0947\u091C\u0930 \u092F\u093E\u092C\u093E\u092C\u0924 \u092E\u0940 \u092E\u0926\u0924 \u0915\u0930\u0942 \u0936\u0915\u0924\u094B.";
        }
        if (role === "student") {
          return "\u0928\u092E\u0938\u094D\u0915\u093E\u0930! \u092E\u0940 \u0924\u0941\u092E\u091A\u093E Student Portal \u0939\u0947\u0932\u094D\u092A \u0938\u0939\u093E\u092F\u094D\u092F\u0915 \u0906\u0939\u0947. \u0935\u093F\u0937\u092F \u0935 \u0927\u0921\u0947 \u0936\u094B\u0927\u0923\u0947, \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938, \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938, \u0911\u0928\u0932\u093E\u0907\u0928 \u0915\u094D\u0935\u093F\u091D, \u0936\u092C\u094D\u0926\u0915\u094B\u0936 \u0906\u0923\u093F \u20B9\u096F\u096F \u092A\u094D\u0932\u093E\u0928\u0938\u093E\u0920\u0940 \u092E\u0940 \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947 \u092E\u0926\u0924 \u0915\u0930\u0924\u094B.";
        }
        return "\u0928\u092E\u0938\u094D\u0915\u093E\u0930! \u092E\u0940 \u0924\u0941\u092E\u091A\u093E MyStudyZone AI \u0939\u0947\u0932\u094D\u092A \u0905\u0901\u0921 \u0938\u092A\u094B\u0930\u094D\u091F \u0938\u0939\u093E\u092F\u094D\u092F\u0915 \u0906\u0939\u0947.\n\n\u092E\u0940 \u0938\u0930\u094D\u0935 \u096B \u092A\u094B\u0930\u094D\u091F\u0932\u094D\u0938\u0938\u093E\u0920\u0940 (Student, Teacher, Parent, College, Institute) \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0928 \u0915\u0930\u0924\u094B. \u0938\u093E\u0902\u0917\u093E, \u0906\u091C \u092E\u0940 \u0924\u0941\u092E\u091A\u0940 \u0915\u093E\u092F \u092E\u0926\u0924 \u0915\u0930\u0942?";
      }
    }
  },
  {
    id: "question_paper_generator",
    priority: 96,
    keywords: [
      "question paper",
      "question paper generator",
      "generate question paper",
      "generate a question paper",
      "create question paper",
      "make question paper",
      "exam paper",
      "unit test paper",
      "term paper",
      "marking scheme",
      "\u092A\u094D\u0930\u0936\u094D\u0928\u092A\u0924\u094D\u0930",
      "\u092A\u094D\u0930\u0936\u094D\u0928\u092A\u0924\u094D\u0930\u093F\u0915\u093E",
      "\u092A\u0947\u092A\u0930 \u092C\u0928\u0935\u093E\u092F\u091A\u093E",
      "\u092A\u0947\u092A\u0930 \u0915\u0948\u0938\u0947 \u092C\u0928\u093E\u090F\u0902"
    ],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_question_paper_generator", "open_lesson_planner", "open_teacher_resources"] : ["open_question_paper_generator", "open_ai_tools"],
    responses: {
      en: (cls, board, role) => {
        const scope = [board || "Maharashtra / CBSE / ICSE", cls || "Classes 1\u201310"].join(" \u2022 ");
        const prefix = role === "teacher" ? "How Teachers Can Generate a Question Paper Step by Step" : "How to Generate a Question Paper on MyStudyZone Step by Step";
        return `${prefix} (${scope}):
1. Open the AI Question Paper Generator by clicking OPEN QUESTION PAPER GENERATOR below (or open Learning Tools / 40 AI Tools \u2192 "Core 10 AI Generators" \u2192 "AI Question Paper Generator").
2. Select your Education Board (Maharashtra / CBSE / ICSE), Class (1\u201310), Subject, and Medium/Language (English / Marathi / Hindi).
3. Choose a Syllabus Chapter from the dropdown or enter your custom Topic / Exam Syllabus.
4. Set Total Marks (20 to 100 Marks), Exam Duration (e.g., 90 Minutes), and Difficulty Level.
5. Click Generate to build a complete exam paper with Paper Header, Section A (Objective/MCQs), Section B (Short Answer), Section C (Long Answer), and a Complete Marking Scheme / Answer Key.
6. Review or edit inline, then export as A4 PDF, Word (.docx), or Print directly.${role === "teacher" ? '\n\nTip: Inside "Teacher 40 AI Productivity Tools", you also have specialized Question Paper Generator (#15), Class Test Creator (#20), and Unit Test Creator (#21).' : ""}`;
      },
      hi: (cls, board) => {
        const scope = [board || "Maharashtra / CBSE / ICSE", cls || "\u0915\u0915\u094D\u0937\u093E 1\u201310"].join(" \u2022 ");
        return `MyStudyZone \u092A\u0930 \u092A\u094D\u0930\u0936\u094D\u0928-\u092A\u0924\u094D\u0930 (Question Paper) \u0915\u0948\u0938\u0947 \u092C\u0928\u093E\u090F\u0902 (${scope}) \u2014 \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923:
1. \u0928\u0940\u091A\u0947 OPEN QUESTION PAPER GENERATOR \u092C\u091F\u0928 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 (\u092F\u093E AI Tools Studio \u2192 "Core 10 AI Generators" \u2192 "AI Question Paper Generator" \u0916\u094B\u0932\u0947\u0902)\u0964
2. \u0905\u092A\u0928\u093E \u092C\u094B\u0930\u094D\u0921 (Maharashtra / CBSE / ICSE), \u0915\u0915\u094D\u0937\u093E (1\u201310), \u0935\u093F\u0937\u092F \u0914\u0930 \u092D\u093E\u0937\u093E \u091A\u0941\u0928\u0947\u0902\u0964
3. \u092A\u093E\u0920\u094D\u092F\u0915\u094D\u0930\u092E \u0915\u093E \u0905\u0927\u094D\u092F\u093E\u092F \u091A\u0941\u0928\u0947\u0902 \u092F\u093E \u0905\u092A\u0928\u093E \u091F\u0949\u092A\u093F\u0915 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964
4. \u0915\u0941\u0932 \u0905\u0902\u0915 (Marks: 20\u2013100), \u0938\u092E\u092F (Duration) \u0914\u0930 \u0915\u0920\u093F\u0928\u093E\u0908 \u0938\u094D\u0924\u0930 (Difficulty) \u091A\u0941\u0928\u0947\u0902\u0964
5. Generate \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 \u2014 \u0938\u093F\u0938\u094D\u091F\u092E \u0938\u0947\u0915\u094D\u0936\u0928 A, B, C \u0914\u0930 \u092A\u0942\u0930\u0940 Answer Key / Marking Scheme \u0915\u0947 \u0938\u093E\u0925 \u092A\u094D\u0930\u0936\u094D\u0928-\u092A\u0924\u094D\u0930 \u0924\u0948\u092F\u093E\u0930 \u0915\u0930 \u0926\u0947\u0917\u093E, \u091C\u093F\u0938\u0947 \u0906\u092A PDF \u092F\u093E DOCX \u092E\u0947\u0902 \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964`;
      },
      mr: (cls, board) => {
        const scope = [board || "Maharashtra / CBSE / ICSE", cls || "\u0907\u092F\u0924\u094D\u0924\u093E \u0967\u2013\u0967\u0966"].join(" \u2022 ");
        return `MyStudyZone \u0935\u0930 \u092A\u094D\u0930\u0936\u094D\u0928\u092A\u0924\u094D\u0930\u093F\u0915\u093E (Question Paper) \u0915\u0936\u0940 \u0924\u092F\u093E\u0930 \u0915\u0930\u093E\u0935\u0940 (${scope}) \u2014 \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947:
1. \u0916\u093E\u0932\u0940\u0932 OPEN QUESTION PAPER GENERATOR \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E (\u0915\u093F\u0902\u0935\u093E AI Tools Studio \u2192 "Core 10 AI Generators" \u2192 "AI Question Paper Generator" \u0909\u0918\u0921\u093E).
2. \u0924\u0941\u092E\u091A\u0947 \u092C\u094B\u0930\u094D\u0921 (Maharashtra / CBSE / ICSE), \u0907\u092F\u0924\u094D\u0924\u093E (\u0967\u2013\u0967\u0966), \u0935\u093F\u0937\u092F \u0906\u0923\u093F \u092D\u093E\u0937\u093E \u0928\u093F\u0935\u0921\u093E.
3. \u0905\u092D\u094D\u092F\u093E\u0938\u0915\u094D\u0930\u092E\u093E\u0924\u0940\u0932 \u0927\u0921\u093E \u0928\u093F\u0935\u0921\u093E \u0915\u093F\u0902\u0935\u093E \u0924\u0941\u092E\u091A\u093E \u0918\u091F\u0915 (Topic) \u091F\u093E\u0915\u093E.
4. \u090F\u0915\u0942\u0923 \u0917\u0941\u0923 (Marks: 20\u2013100), \u0935\u0947\u0933 (Duration) \u0906\u0923\u093F \u0915\u093E\u0920\u093F\u0923\u094D\u092F \u092A\u093E\u0924\u0933\u0940 (Difficulty) \u0928\u093F\u0935\u0921\u093E.
5. Generate \u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0924\u093E\u091A \u0935\u093F\u092D\u093E\u0917 A, B, C \u0906\u0923\u093F \u0938\u0902\u092A\u0942\u0930\u094D\u0923 \u0909\u0924\u094D\u0924\u0930\u0938\u0942\u091A\u0940\u0938\u0939 (Marking Scheme) \u092A\u094D\u0930\u0936\u094D\u0928\u092A\u0924\u094D\u0930\u093F\u0915\u093E \u0924\u092F\u093E\u0930 \u0939\u094B\u0908\u0932; \u0924\u0940 \u0924\u0941\u092E\u094D\u0939\u0940 PDF \u0915\u093F\u0902\u0935\u093E Word (.docx) \u0938\u094D\u0935\u0930\u0942\u092A\u093E\u0924 \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u0942 \u0936\u0915\u0924\u093E.`;
      }
    }
  },
  {
    id: "unresolved_account_problem",
    priority: 100,
    keywords: [
      "cannot login",
      "cant login",
      "login failed",
      "login error",
      "not opening",
      "payment deducted",
      "paid but locked",
      "plan not activated",
      "still locked",
      "wrong class",
      "change class",
      "single device",
      "another device",
      "blocked",
      "bug",
      "technical error",
      "not working",
      "submit request",
      "support request",
      "complaint",
      "raise ticket",
      "support ticket",
      "contact support",
      "escalate",
      "talk to admin",
      "help desk ticket",
      "\u0932\u0949\u0917\u093F\u0928 \u0928\u0939\u0940\u0902",
      "\u0938\u092E\u0938\u094D\u092F\u093E",
      "\u092A\u0947\u092E\u0947\u0902\u091F \u0915\u091F",
      "\u0905\u0921\u091A\u0923",
      "\u0932\u0949\u0917\u093F\u0928 \u0939\u094B\u0924 \u0928\u093E\u0939\u0940",
      "\u0924\u0915\u094D\u0930\u093E\u0930"
    ],
    suggestSupportTicket: true,
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_password_reset", "open_teacher_login"] : ["open_password_reset", "open_login"],
    responses: {
      en: () => 'Here are quick step-by-step checks before escalating to our Support Team:\n1. Verify Portal Role: Make sure you are logging into your matching portal (Student, Teacher, Parent, College, or Institute) with your registered email.\n2. Single-Device Protection: If your account is active on another phone/browser, sign out there first or click "Lost/Damaged Device Recovery" inside the Login window.\n3. Forgot Password: Click "Forgot Password" in the Login modal to get an instant reset link on your email.\n4. Payment Refresh: If a \u20B999 plan payment was deducted but appears locked, log out and log back in once.\n\nHow to Contact Support:\nClick the "SUBMIT A SUPPORT REQUEST" button below, choose your User Category (Student, Teacher, Parent, College, or Institute), fill in your Name, Registered Email, Issue Category, and Problem Description, and receive an official Ticket Number for Admin review.',
      hi: () => '\u0938\u092A\u094B\u0930\u094D\u091F \u091F\u0940\u092E \u0915\u094B \u0938\u092E\u0938\u094D\u092F\u093E \u092D\u0947\u091C\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u092F\u0947 \u0906\u0938\u093E\u0928 \u0915\u0926\u092E \u0906\u091C\u093C\u092E\u093E\u090F\u0901:\n1. \u0938\u0939\u0940 \u092A\u094B\u0930\u094D\u091F\u0932 \u091A\u0941\u0928\u0947\u0902: \u0938\u0941\u0928\u093F\u0936\u094D\u091A\u093F\u0924 \u0915\u0930\u0947\u0902 \u0915\u093F \u0906\u092A \u0938\u0939\u0940 \u092A\u094B\u0930\u094D\u091F\u0932 (Student, Teacher, Parent, College \u092F\u093E Institute) \u092A\u0930 \u092A\u0902\u091C\u0940\u0915\u0943\u0924 \u0908\u092E\u0947\u0932 \u0938\u0947 \u0932\u0949\u0917\u093F\u0928 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964\n2. Single-Device \u0938\u0941\u0930\u0915\u094D\u0937\u093E: \u092F\u0926\u093F \u0905\u0915\u093E\u0909\u0902\u091F \u0915\u093F\u0938\u0940 \u0926\u0942\u0938\u0930\u0947 \u092B\u094B\u0928/\u092C\u094D\u0930\u093E\u0909\u091C\u093C\u0930 \u092E\u0947\u0902 \u0916\u0941\u0932\u093E \u0939\u0948, \u0924\u094B \u0935\u0939\u093E\u0901 \u0938\u0947 Logout \u0915\u0930\u0947\u0902 \u092F\u093E Login \u092C\u0949\u0915\u094D\u0938 \u092E\u0947\u0902 Device Recovery \u091A\u0941\u0928\u0947\u0902\u0964\n3. \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0930\u0940\u0938\u0947\u091F: \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0942\u0932 \u0917\u090F \u0939\u094B\u0902 \u0924\u094B Forgot Password \u0938\u0947 \u0908\u092E\u0947\u0932 \u092A\u0930 \u0930\u0940\u0938\u0947\u091F \u0932\u093F\u0902\u0915 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902\u0964\n4. \u092A\u0947\u092E\u0947\u0902\u091F \u0930\u093F\u092B\u094D\u0930\u0947\u0936: \u20B999 \u092A\u0947\u092E\u0947\u0902\u091F \u0915\u0947 \u092C\u093E\u0926 \u092A\u094D\u0932\u093E\u0928 \u0932\u0949\u0915 \u0926\u093F\u0916\u0947 \u0924\u094B \u090F\u0915 \u092C\u093E\u0930 Logout \u0915\u0930\u0915\u0947 \u092B\u093F\u0930 Login \u0915\u0930\u0947\u0902\u0964\n\n\u0938\u092A\u094B\u0930\u094D\u091F \u091F\u0940\u092E \u0938\u0947 \u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902:\n\u0928\u0940\u091A\u0947 "SUBMIT A SUPPORT REQUEST" \u092C\u091F\u0928 \u0926\u092C\u093E\u090F\u0901, \u0905\u092A\u0928\u0940 \u0936\u094D\u0930\u0947\u0923\u0940 (Student/Teacher/Parent/College/Institute), \u0928\u093E\u092E, \u0908\u092E\u0947\u0932, \u0938\u092E\u0938\u094D\u092F\u093E \u0936\u094D\u0930\u0947\u0923\u0940 \u0935 \u0935\u093F\u0935\u0930\u0923 \u092D\u0930\u0947\u0902 \u0914\u0930 \u0924\u0941\u0930\u0902\u0924 \u0905\u092A\u0928\u093E \u091F\u093F\u0915\u091F \u0928\u0902\u092C\u0930 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930\u0947\u0902\u0964',
      mr: () => '\u0938\u092A\u094B\u0930\u094D\u091F \u091F\u0940\u092E\u0915\u0921\u0947 \u0924\u0915\u094D\u0930\u093E\u0930 \u092A\u093E\u0920\u0935\u0923\u094D\u092F\u093E\u092A\u0942\u0930\u094D\u0935\u0940 \u0916\u093E\u0932\u0940\u0932 \u0938\u094B\u092A\u094D\u092F\u093E \u092A\u093E\u092F\u0931\u094D\u092F\u093E \u0924\u092A\u093E\u0938\u093E:\n1. \u092F\u094B\u0917\u094D\u092F \u092A\u094B\u0930\u094D\u091F\u0932 \u0928\u093F\u0935\u0921\u093E: \u0924\u0941\u092E\u094D\u0939\u0940 \u092F\u094B\u0917\u094D\u092F \u092A\u094B\u0930\u094D\u091F\u0932\u0935\u0930 (Student, Teacher, Parent, College \u0915\u093F\u0902\u0935\u093E Institute) \u0924\u0941\u092E\u091A\u094D\u092F\u093E \u0928\u094B\u0902\u0926\u0923\u0940\u0915\u0943\u0924 \u0908\u092E\u0947\u0932\u0928\u0947 \u0932\u0949\u0917\u093F\u0928 \u0915\u0930\u0924 \u0906\u0939\u093E\u0924 \u092F\u093E\u091A\u0940 \u0916\u093E\u0924\u094D\u0930\u0940 \u0915\u0930\u093E.\n2. Single-Device \u0938\u0941\u0930\u0915\u094D\u0937\u093E: \u0924\u0941\u092E\u091A\u0947 \u0916\u093E\u0924\u0947 \u0926\u0941\u0938\u0931\u094D\u092F\u093E \u0921\u093F\u0935\u094D\u0939\u093E\u0907\u0938\u0935\u0930 \u0938\u0941\u0930\u0942 \u0905\u0938\u0932\u094D\u092F\u093E\u0938 \u0924\u0947\u0925\u0942\u0928 Logout \u0915\u0930\u093E \u0915\u093F\u0902\u0935\u093E Login \u0935\u093F\u0902\u0921\u094B\u092E\u0927\u0940\u0932 Device Recovery \u0935\u093E\u092A\u0930\u093E.\n3. \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0930\u0940\u0938\u0947\u091F: \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0935\u093F\u0938\u0930\u0932\u094D\u092F\u093E\u0938 Forgot Password \u0935\u093E\u092A\u0930\u0942\u0928 \u0908\u092E\u0947\u0932\u0935\u0930 \u0930\u0940\u0938\u0947\u091F \u0932\u093F\u0902\u0915 \u092E\u093F\u0933\u0935\u093E.\n4. \u092A\u0947\u092E\u0947\u0902\u091F \u0930\u093F\u092B\u094D\u0930\u0947\u0936: \u20B9\u096F\u096F \u092A\u0947\u092E\u0947\u0902\u091F\u0928\u0902\u0924\u0930 \u092A\u094D\u0932\u093E\u0928 \u0932\u0949\u0915 \u0926\u093F\u0938\u0924 \u0905\u0938\u0932\u094D\u092F\u093E\u0938 \u090F\u0915\u0926\u093E Logout \u0915\u0930\u0942\u0928 \u092A\u0941\u0928\u094D\u0939\u093E Login \u0915\u0930\u093E.\n\n\u0938\u092A\u094B\u0930\u094D\u091F \u091F\u0940\u092E\u0936\u0940 \u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0938\u093E \u0938\u093E\u0927\u093E\u0935\u093E:\n\u0916\u093E\u0932\u0940\u0932 "SUBMIT A SUPPORT REQUEST" \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E, \u0924\u0941\u092E\u091A\u093E \u092A\u094D\u0930\u0915\u093E\u0930 (Student/Teacher/Parent/College/Institute), \u0928\u093E\u0935, \u0908\u092E\u0947\u0932 \u0935 \u0938\u092E\u0938\u094D\u092F\u0947\u091A\u0947 \u0935\u0930\u094D\u0923\u0928 \u092D\u0930\u093E \u0906\u0923\u093F \u0905\u0927\u093F\u0915\u0943\u0924 \u0924\u093F\u0915\u0940\u091F \u0915\u094D\u0930\u092E\u093E\u0902\u0915 \u092E\u093F\u0933\u0935\u093E.'
    }
  },
  {
    id: "password_reset",
    priority: 90,
    keywords: [
      "forgot password",
      "reset password",
      "password problem",
      "password change",
      "pasword",
      "bhul gaya",
      "visarlo",
      "\u092A\u093E\u0938\u0935\u0930\u094D\u0921",
      "\u0930\u0940\u0938\u0947\u091F"
    ],
    suggestSupportTicket: true,
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_password_reset", "open_teacher_login"] : ["open_password_reset", "open_login"],
    responses: {
      en: () => 'How to Reset Your Password Step by Step:\n1. Click Login at the top-right and select "Forgot Password" (or click OPEN PASSWORD RESET below).\n2. Enter your registered email address and submit.\n3. Open the password reset email sent by MyStudyZone (check Spam/Promotions if not in Inbox) and set a new password.\n\nSafety Rule: Never share your password or OTP with anyone. If you still need help, click SUBMIT A SUPPORT REQUEST below.',
      hi: () => '\u0905\u092A\u0928\u093E \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0930\u0940\u0938\u0947\u091F \u0915\u0930\u0928\u0947 \u0915\u0947 \u091A\u0930\u0923:\n1. \u090A\u092A\u0930 \u0926\u093E\u0908\u0902 \u0913\u0930 Login \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 \u0914\u0930 "Forgot Password" \u091A\u0941\u0928\u0947\u0902 (\u092F\u093E \u0928\u0940\u091A\u0947 OPEN PASSWORD RESET \u0926\u092C\u093E\u090F\u0901)\u0964\n2. \u0905\u092A\u0928\u093E \u092A\u0902\u091C\u0940\u0915\u0943\u0924 \u0908\u092E\u0947\u0932 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964\n3. \u0906\u092A\u0915\u0947 \u0908\u092E\u0947\u0932 \u092A\u0930 \u0906\u090F \u0930\u0940\u0938\u0947\u091F \u0932\u093F\u0902\u0915 (Spam \u092B\u093C\u094B\u0932\u094D\u0921\u0930 \u092D\u0940 \u0926\u0947\u0916\u0947\u0902) \u0938\u0947 \u0928\u092F\u093E \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0938\u0947\u091F \u0915\u0930\u0947\u0902\u0964\n\n\u092F\u0926\u093F \u092B\u093F\u0930 \u092D\u0940 \u0926\u093F\u0915\u094D\u0915\u0924 \u0939\u094B, \u0924\u094B \u0928\u0940\u091A\u0947 SUBMIT A SUPPORT REQUEST \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902\u0964',
      mr: () => '\u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0930\u0940\u0938\u0947\u091F \u0915\u0930\u0923\u094D\u092F\u093E\u091A\u094D\u092F\u093E \u092A\u093E\u092F\u0931\u094D\u092F\u093E:\n1. \u0935\u0930 \u0909\u091C\u0935\u0940\u0915\u0921\u0947 Login \u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0942\u0928 "Forgot Password" \u0928\u093F\u0935\u0921\u093E (\u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 OPEN PASSWORD RESET \u0926\u093E\u092C\u093E).\n2. \u0924\u0941\u092E\u091A\u093E \u0928\u094B\u0902\u0926\u0923\u0940\u0915\u0943\u0924 \u0908\u092E\u0947\u0932 \u092A\u0924\u094D\u0924\u093E \u091F\u093E\u0915\u093E.\n3. \u0908\u092E\u0947\u0932\u0935\u0930 \u0906\u0932\u0947\u0932\u094D\u092F\u093E \u0932\u093F\u0902\u0915\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0942\u0928 (Spam \u092B\u094B\u0932\u094D\u0921\u0930\u0939\u0940 \u0924\u092A\u093E\u0938\u093E) \u0928\u0935\u0940\u0928 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0938\u0947\u091F \u0915\u0930\u093E.\n\n\u0905\u0921\u091A\u0923 \u092F\u0947\u0924 \u0905\u0938\u0932\u094D\u092F\u093E\u0938 \u0916\u093E\u0932\u0940\u0932 SUBMIT A SUPPORT REQUEST \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.'
    }
  },
  {
    id: "parent_portal_support",
    priority: 89,
    keywords: [
      "parent",
      "parents",
      "parent portal",
      "parent login",
      "parent register",
      "parent registration",
      "link child",
      "connect student",
      "child progress",
      "student progress",
      "parent report",
      "parent dashboard",
      "palak",
      "\u092A\u093E\u0932\u0915",
      "\u092A\u0948\u0930\u0947\u0902\u091F",
      "\u092C\u091A\u094D\u091A\u0947 \u0915\u0940 \u092A\u094D\u0930\u0917\u0924\u093F",
      "\u092E\u0941\u0932\u093E\u091A\u0940 \u092A\u094D\u0930\u0917\u0924\u0940"
    ],
    actionIds: () => ["open_parent_portal", "open_register", "open_login"],
    responses: {
      en: () => 'Parent Portal Guide \u2014 Step by Step:\n1. Parent Registration & Login: From the homepage, click the "Parent Portal" card (or click Register \u2192 select Parent), enter your Parent Name, Email, Mobile Number, and Password.\n2. Connecting with Your Child\u2019s Student Account: Inside the Parent Portal, open "Link Child Account" and enter your child\u2019s registered Student Email and Mobile Number to connect their profile.\n3. Understanding Student Progress & Reports:\n   \u2022 View subject-wise progress, completed chapters, and worksheet scores.\n   \u2022 Check online exam/quiz scorecards, accuracy percentage, and attendance.\n   \u2022 Download/view progress reports and communicate with teachers.\n\nClick OPEN PARENT PORTAL below to go directly to the Parent Portal.',
      hi: () => 'Parent Portal (\u0905\u092D\u093F\u092D\u093E\u0935\u0915 \u092A\u094B\u0930\u094D\u091F\u0932) \u2014 \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u093F\u0915\u093E:\n1. \u092A\u0948\u0930\u0947\u0902\u091F \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0914\u0930 \u0932\u0949\u0917\u093F\u0928: \u0939\u094B\u092E\u092A\u0947\u091C \u092A\u0930 "Parent Portal" \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 (\u092F\u093E Register \u2192 Parent \u091A\u0941\u0928\u0947\u0902) \u0914\u0930 \u0905\u092A\u0928\u093E \u0928\u093E\u092E, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0935 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964\n2. \u092C\u091A\u094D\u091A\u0947 \u0915\u0947 Student Account \u0938\u0947 \u0915\u0948\u0938\u0947 \u091C\u0941\u0921\u093C\u0947\u0902: Parent Portal \u0915\u0947 \u0905\u0902\u0926\u0930 "Link Child Account" \u092E\u0947\u0902 \u0905\u092A\u0928\u0947 \u092C\u091A\u094D\u091A\u0947 \u0915\u093E \u092A\u0902\u091C\u0940\u0915\u0943\u0924 Student Email \u0914\u0930 Mobile Number \u0921\u093E\u0932\u0915\u0930 \u092A\u094D\u0930\u094B\u092B\u093C\u093E\u0907\u0932 \u0932\u093F\u0902\u0915 \u0915\u0930\u0947\u0902\u0964\n3. \u092A\u094D\u0930\u0917\u0924\u093F \u0914\u0930 \u0930\u093F\u092A\u094B\u0930\u094D\u091F \u0915\u0948\u0938\u0947 \u0926\u0947\u0916\u0947\u0902:\n   \u2022 \u0935\u093F\u0937\u092F-\u0935\u093E\u0930 \u092A\u094D\u0930\u0917\u0924\u093F, \u092A\u0942\u0930\u0947 \u0915\u093F\u090F \u0917\u090F \u0905\u0927\u094D\u092F\u093E\u092F \u0914\u0930 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u0938\u094D\u0915\u094B\u0930 \u0926\u0947\u0916\u0947\u0902\u0964\n   \u2022 \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u0930\u0940\u0915\u094D\u0937\u093E/\u0915\u094D\u0935\u093F\u091C\u093C \u0938\u094D\u0915\u094B\u0930\u0915\u093E\u0930\u094D\u0921, \u0938\u091F\u0940\u0915\u0924\u093E \u092A\u094D\u0930\u0924\u093F\u0936\u0924 \u0914\u0930 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F (Attendance) \u091F\u094D\u0930\u0948\u0915 \u0915\u0930\u0947\u0902\u0964\n\n\u0938\u0940\u0927\u0947 \u091C\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0928\u0940\u091A\u0947 OPEN PARENT PORTAL \u092C\u091F\u0928 \u0926\u092C\u093E\u090F\u0901\u0964',
      mr: () => 'Parent Portal (\u092A\u093E\u0932\u0915 \u092A\u094B\u0930\u094D\u091F\u0932) \u2014 \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947 \u092E\u093E\u0939\u093F\u0924\u0940:\n1. \u092A\u093E\u0932\u0915 \u0928\u094B\u0902\u0926\u0923\u0940 \u0906\u0923\u093F \u0932\u0949\u0917\u093F\u0928: \u092E\u0941\u0916\u094D\u092F\u092A\u0943\u0937\u094D\u0920\u093E\u0935\u0930\u0940\u0932 "Parent Portal" \u0915\u093E\u0930\u094D\u0921\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E (\u0915\u093F\u0902\u0935\u093E Register \u2192 Parent \u0928\u093F\u0935\u0921\u093E) \u0906\u0923\u093F \u0924\u0941\u092E\u091A\u0947 \u0928\u093E\u0935, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0935 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u091F\u093E\u0915\u093E.\n2. \u092E\u0941\u0932\u093E\u091A\u094D\u092F\u093E Student \u0916\u093E\u0924\u094D\u092F\u093E\u0936\u0940 \u0915\u0938\u0947 \u091C\u094B\u0921\u093E\u0935\u0947: Parent Portal \u092E\u0927\u094D\u092F\u0947 "Link Child Account" \u0928\u093F\u0935\u0921\u0942\u0928 \u092E\u0941\u0932\u093E\u091A\u093E \u0928\u094B\u0902\u0926\u0923\u0940\u0915\u0943\u0924 Student Email \u0906\u0923\u093F \u092E\u094B\u092C\u093E\u0907\u0932 \u0928\u0902\u092C\u0930 \u091F\u093E\u0915\u0942\u0928 \u0916\u093E\u0924\u0947 \u091C\u094B\u0921\u093E.\n3. \u092E\u0941\u0932\u093E\u091A\u0940 \u092A\u094D\u0930\u0917\u0924\u0940 \u0906\u0923\u093F \u0905\u0939\u0935\u093E\u0932 (Reports):\n   \u2022 \u0935\u093F\u0937\u092F\u0928\u093F\u0939\u093E\u092F \u092A\u094D\u0930\u0917\u0924\u0940, \u092A\u0942\u0930\u094D\u0923 \u091D\u093E\u0932\u0947\u0932\u0947 \u0927\u0921\u0947 \u0906\u0923\u093F \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u0917\u0941\u0923 \u092A\u0939\u093E.\n   \u2022 \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0928\u093F\u0915\u093E\u0932, \u0905\u091A\u0942\u0915\u0924\u093E \u091F\u0915\u094D\u0915\u0947\u0935\u093E\u0930\u0940 \u0906\u0923\u093F \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u0940 (Attendance) \u0924\u092A\u093E\u0938\u093E.\n\n\u0925\u0947\u091F \u0909\u0918\u0921\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0916\u093E\u0932\u0940\u0932 OPEN PARENT PORTAL \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.'
    }
  },
  {
    id: "college_portal_support",
    priority: 88,
    keywords: [
      "college",
      "colleges",
      "college portal",
      "school portal",
      "school admin",
      "college login",
      "college register",
      "college registration",
      "college dashboard",
      "divisions",
      "faculty allocation",
      "institutional",
      "\u092E\u0939\u093E\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F",
      "\u0915\u0949\u0932\u0947\u091C",
      "\u0936\u093E\u0933\u093E \u092A\u094B\u0930\u094D\u091F\u0932"
    ],
    actionIds: () => ["open_college_portal", "open_register", "open_login"],
    responses: {
      en: () => 'College & School Portal Guide \u2014 Step by Step:\n1. Registration & Account Setup: Click the "College Portal" card on the homepage, select Register as College/School, and enter your Institution Name, UDISE / Registration Code, City, Official Email, Mobile, and Password.\n2. Available College Features & Dashboard Navigation:\n   \u2022 Overview & Academic KPIs: Monitor total enrolled students, active faculty, divisions, and average pass rate.\n   \u2022 Classes, Streams & Divisions: Manage standards/streams, divisions, class teachers, and room allocations.\n   \u2022 Faculty Allocation: Assign teachers to subjects and divisions and track workload.\n   \u2022 Student Directory: View student roster, attendance percentage, and fee status.\n   \u2022 Institutional Calendar, Result Analytics & Campus Circulars: Publish notices, schedule exams, and inspect class-wise result analytics.\n\nClick OPEN COLLEGE PORTAL below to access the College Portal.',
      hi: () => 'College Portal (\u0915\u0949\u0932\u0947\u091C \u0935 \u0938\u094D\u0915\u0942\u0932 \u092A\u094B\u0930\u094D\u091F\u0932) \u2014 \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u093F\u0915\u093E:\n1. \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0914\u0930 \u0932\u0949\u0917\u093F\u0928: \u0939\u094B\u092E\u092A\u0947\u091C \u092A\u0930 "College Portal" \u0915\u093E\u0930\u094D\u0921 \u0916\u094B\u0932\u0947\u0902, Register \u092E\u0947\u0902 \u0938\u0902\u0938\u094D\u0925\u093E \u0915\u093E \u0928\u093E\u092E, UDISE/\u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0915\u094B\u0921, \u0936\u0939\u0930, \u0906\u0927\u093F\u0915\u093E\u0930\u093F\u0915 \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0914\u0930 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0930\u0947\u0902\u0964\n2. \u0915\u0949\u0932\u0947\u091C \u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921 \u0915\u0940 \u092E\u0941\u0916\u094D\u092F \u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0901:\n   \u2022 Classes & Divisions: \u0915\u0915\u094D\u0937\u093E\u090F\u0901, \u0938\u094D\u091F\u094D\u0930\u0940\u092E, \u0921\u093F\u0935\u0940\u091C\u093C\u0928 \u0914\u0930 \u0915\u094D\u0932\u093E\u0938 \u091F\u0940\u091A\u0930 \u092A\u094D\u0930\u092C\u0902\u0927\u093F\u0924 \u0915\u0930\u0947\u0902\u0964\n   \u2022 Faculty Allocation: \u0936\u093F\u0915\u094D\u0937\u0915\u094B\u0902 \u0915\u094B \u0935\u093F\u0937\u092F \u0914\u0930 \u0921\u093F\u0935\u0940\u091C\u093C\u0928 \u0906\u0935\u0902\u091F\u093F\u0924 \u0915\u0930\u0947\u0902\u0964\n   \u2022 Student Directory: \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0940 \u0938\u0942\u091A\u0940, \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F \u0914\u0930 \u092B\u0940\u0938 \u0938\u094D\u0925\u093F\u0924\u093F \u0926\u0947\u0916\u0947\u0902\u0964\n   \u2022 Calendar, Result Analytics & Circulars: \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u0915\u0948\u0932\u0947\u0902\u0921\u0930, \u092A\u0930\u093F\u0923\u093E\u092E \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u0914\u0930 \u0915\u0948\u0902\u092A\u0938 \u0928\u094B\u091F\u093F\u0938 \u091C\u093E\u0930\u0940 \u0915\u0930\u0947\u0902\u0964\n\n\u0928\u0940\u091A\u0947 OPEN COLLEGE PORTAL \u092C\u091F\u0928 \u0926\u092C\u093E\u0915\u0930 \u0938\u0940\u0927\u0947 \u0916\u094B\u0932\u0947\u0902\u0964',
      mr: () => 'College Portal (\u092E\u0939\u093E\u0935\u093F\u0926\u094D\u092F\u093E\u0932\u092F \u0935 \u0936\u093E\u0933\u093E \u092A\u094B\u0930\u094D\u091F\u0932) \u2014 \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947 \u092E\u093E\u0939\u093F\u0924\u0940:\n1. \u0928\u094B\u0902\u0926\u0923\u0940 \u0906\u0923\u093F \u0932\u0949\u0917\u093F\u0928: \u092E\u0941\u0916\u094D\u092F\u092A\u0943\u0937\u094D\u0920\u093E\u0935\u0930\u0940\u0932 "College Portal" \u0915\u093E\u0930\u094D\u0921\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E, Register \u092E\u0927\u094D\u092F\u0947 \u0938\u0902\u0938\u094D\u0925\u0947\u091A\u0947 \u0928\u093E\u0935, UDISE/\u0928\u094B\u0902\u0926\u0923\u0940 \u0915\u094B\u0921, \u0936\u0939\u0930, \u0905\u0927\u093F\u0915\u0943\u0924 \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0935 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0930\u093E.\n2. \u0915\u0949\u0932\u0947\u091C \u0921\u0945\u0936\u092C\u094B\u0930\u094D\u0921\u0935\u0930\u0940\u0932 \u092A\u094D\u0930\u092E\u0941\u0916 \u0938\u0941\u0935\u093F\u0927\u093E:\n   \u2022 Classes & Divisions: \u0935\u0930\u094D\u0917, \u0936\u093E\u0916\u093E (Streams), \u0924\u0941\u0915\u0921\u094D\u092F\u093E \u0906\u0923\u093F \u0935\u0930\u094D\u0917\u0936\u093F\u0915\u094D\u0937\u0915 \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0915\u0930\u093E.\n   \u2022 Faculty Allocation: \u0936\u093F\u0915\u094D\u0937\u0915\u093E\u0902\u0928\u093E \u0935\u093F\u0937\u092F \u0935 \u0924\u0941\u0915\u0921\u094D\u092F\u093E \u0928\u0947\u092E\u0942\u0928 \u0926\u094D\u092F\u093E.\n   \u2022 Student Directory: \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940 \u092F\u093E\u0926\u0940, \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u0940 \u0935 \u092B\u0940 \u0938\u094D\u0925\u093F\u0924\u0940 \u092A\u0939\u093E.\n   \u2022 Calendar, Result Analytics & Circulars: \u0936\u0948\u0915\u094D\u0937\u0923\u093F\u0915 \u0926\u093F\u0928\u0926\u0930\u094D\u0936\u093F\u0915\u093E, \u0928\u093F\u0915\u093E\u0932 \u0935\u093F\u0936\u094D\u0932\u0947\u0937\u0923 \u0906\u0923\u093F \u092A\u0930\u093F\u092A\u0924\u094D\u0930\u0915\u0947 \u092A\u094D\u0930\u0938\u093F\u0926\u094D\u0927 \u0915\u0930\u093E.\n\n\u0925\u0947\u091F \u0909\u0918\u0921\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0916\u093E\u0932\u0940\u0932 OPEN COLLEGE PORTAL \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.'
    }
  },
  {
    id: "institute_portal_support",
    priority: 88,
    keywords: [
      "institute",
      "institutes",
      "institute portal",
      "coaching",
      "coaching portal",
      "coaching institute",
      "institute login",
      "institute register",
      "institute dashboard",
      "batches",
      "batch management",
      "fee ledger",
      "mock test series",
      "\u0907\u0928\u094D\u0938\u094D\u091F\u093F\u091F\u094D\u092F\u0942\u091F",
      "\u0915\u094B\u091A\u093F\u0902\u0917",
      "\u0938\u0902\u0938\u094D\u0925\u093E \u092A\u094B\u0930\u094D\u091F\u0932"
    ],
    actionIds: () => ["open_institute_portal", "open_register", "open_login"],
    responses: {
      en: () => 'Institute Portal Guide \u2014 Step by Step:\n1. Registration & Login: Click the "Institute Portal" card on the homepage, select Register as Institute, and fill in your Coaching/Academy Name, Registration Code, Focus Stream (Scholarship/Foundation/Olympiad/Skill Academy), Official Email, Mobile, and Password.\n2. Institute Dashboard & Management Features:\n   \u2022 Batches & Schedules: Create and manage morning/evening coaching batches, timings, mentors, and seat capacity.\n   \u2022 Mock Test Series: Conduct Scholarship, Olympiad, Foundation, and TET/CTET mock test series and view top scores.\n   \u2022 18 Skill Academy Programs: Run Abacus, Vedic Maths, English Phonics, Coding, Handwriting, Robotics, and more.\n   \u2022 Trainer Roster & Fee Ledger: Manage faculty assignments, fee collection status, and issue Course Completion Certificates.\n\nClick OPEN INSTITUTE PORTAL below to open the Institute Portal.',
      hi: () => 'Institute Portal (\u0915\u094B\u091A\u093F\u0902\u0917 \u0935 \u0938\u094D\u0915\u093F\u0932 \u0907\u0902\u0938\u094D\u091F\u0940\u091F\u094D\u092F\u0942\u091F \u092A\u094B\u0930\u094D\u091F\u0932) \u2014 \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923 \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u093F\u0915\u093E:\n1. \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0914\u0930 \u0932\u0949\u0917\u093F\u0928: \u0939\u094B\u092E\u092A\u0947\u091C \u092A\u0930 "Institute Portal" \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902, Register \u092E\u0947\u0902 \u0905\u092A\u0928\u0947 \u0907\u0902\u0938\u094D\u091F\u0940\u091F\u094D\u092F\u0942\u091F \u0915\u093E \u0928\u093E\u092E, \u0915\u094B\u0921, \u092B\u094B\u0915\u0938 \u0938\u094D\u091F\u094D\u0930\u0940\u092E, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0914\u0930 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902\u0964\n2. \u0907\u0902\u0938\u094D\u091F\u0940\u091F\u094D\u092F\u0942\u091F \u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921 \u0915\u0940 \u092A\u094D\u0930\u092C\u0902\u0927\u0928 \u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0901:\n   \u2022 Batches & Schedules: \u0915\u094B\u091A\u093F\u0902\u0917 \u092C\u0948\u091A, \u0938\u092E\u092F, \u092E\u0947\u0902\u091F\u0930 \u0914\u0930 \u091B\u093E\u0924\u094D\u0930 \u0915\u094D\u0937\u092E\u0924\u093E \u092A\u094D\u0930\u092C\u0902\u0927\u093F\u0924 \u0915\u0930\u0947\u0902\u0964\n   \u2022 Mock Test Series: \u0938\u094D\u0915\u0949\u0932\u0930\u0936\u093F\u092A, \u0913\u0932\u0902\u092A\u093F\u092F\u093E\u0921, \u092B\u093E\u0909\u0902\u0921\u0947\u0936\u0928 \u0914\u0930 TET/CTET \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0938\u0940\u0930\u0940\u091C\u093C \u091A\u0932\u093E\u090F\u0901\u0964\n   \u2022 18 Skill Academy Programs: \u0905\u092C\u0947\u0915\u0938, \u0935\u0948\u0926\u093F\u0915 \u092E\u0948\u0925\u094D\u0938, \u092B\u094B\u0928\u093F\u0915\u094D\u0938, \u0915\u094B\u0921\u093F\u0902\u0917 \u0906\u0926\u093F \u0915\u094B\u0930\u094D\u0938 \u0938\u0902\u091A\u093E\u0932\u093F\u0924 \u0915\u0930\u0947\u0902\u0964\n   \u2022 Trainer Roster, Fee Ledger & Certificates: \u091F\u094D\u0930\u0947\u0928\u0930 \u0938\u0942\u091A\u0940, \u092B\u0940\u0938 \u0932\u0947\u091C\u0930 \u0914\u0930 \u0915\u094B\u0930\u094D\u0938 \u0938\u0930\u094D\u091F\u093F\u092B\u093F\u0915\u0947\u091F \u091C\u093E\u0930\u0940 \u0915\u0930\u0947\u0902\u0964\n\n\u0928\u0940\u091A\u0947 OPEN INSTITUTE PORTAL \u092C\u091F\u0928 \u0926\u092C\u093E\u0915\u0930 \u0938\u0940\u0927\u0947 \u0916\u094B\u0932\u0947\u0902\u0964',
      mr: () => 'Institute Portal (\u0915\u094B\u091A\u093F\u0902\u0917 \u0935 \u0915\u094C\u0936\u0932\u094D\u092F \u0938\u0902\u0938\u094D\u0925\u093E \u092A\u094B\u0930\u094D\u091F\u0932) \u2014 \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947 \u092E\u093E\u0939\u093F\u0924\u0940:\n1. \u0928\u094B\u0902\u0926\u0923\u0940 \u0906\u0923\u093F \u0932\u0949\u0917\u093F\u0928: \u092E\u0941\u0916\u094D\u092F\u092A\u0943\u0937\u094D\u0920\u093E\u0935\u0930\u0940\u0932 "Institute Portal" \u0915\u093E\u0930\u094D\u0921\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E, Register \u092E\u0927\u094D\u092F\u0947 \u0938\u0902\u0938\u094D\u0925\u0947\u091A\u0947 \u0928\u093E\u0935, \u0928\u094B\u0902\u0926\u0923\u0940 \u0915\u094B\u0921, \u092E\u0941\u0916\u094D\u092F \u0935\u093F\u092D\u093E\u0917, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0935 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0930\u093E.\n2. \u0907\u0928\u094D\u0938\u094D\u091F\u093F\u091F\u094D\u092F\u0942\u091F \u0921\u0945\u0936\u092C\u094B\u0930\u094D\u0921\u0935\u0930\u0940\u0932 \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093E\u092A\u0928 \u0938\u0941\u0935\u093F\u0927\u093E:\n   \u2022 Batches & Schedules: \u0915\u094B\u091A\u093F\u0902\u0917 \u092C\u0945\u091A\u0947\u0938, \u0935\u0947\u0933, \u092E\u093E\u0930\u094D\u0917\u0926\u0930\u094D\u0936\u0915 \u0906\u0923\u093F \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940 \u0915\u094D\u0937\u092E\u0924\u093E \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093E\u092A\u093F\u0924 \u0915\u0930\u093E.\n   \u2022 Mock Test Series: \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940, \u0911\u0932\u093F\u092E\u094D\u092A\u093F\u092F\u093E\u0921, \u092B\u093E\u0909\u0902\u0921\u0947\u0936\u0928 \u0935 TET/CTET \u0938\u0930\u093E\u0935 \u091A\u093E\u091A\u0923\u094D\u092F\u093E \u0918\u094D\u092F\u093E.\n   \u2022 18 Skill Academy Programs: \u0905\u092C\u0945\u0915\u0938, \u0935\u0948\u0926\u093F\u0915 \u0917\u0923\u093F\u0924, \u092B\u094B\u0928\u093F\u0915\u094D\u0938, \u0915\u094B\u0921\u093F\u0902\u0917 \u0907\u0924\u094D\u092F\u093E\u0926\u0940 \u0967\u096E \u0909\u092A\u0915\u094D\u0930\u092E \u091A\u093E\u0932\u0935\u093E.\n   \u2022 Trainer Roster, Fee Ledger & Certificates: \u092A\u094D\u0930\u0936\u093F\u0915\u094D\u0937\u0915 \u092F\u093E\u0926\u0940, \u092B\u0940 \u0932\u0947\u091C\u0930 \u0906\u0923\u093F \u0915\u094B\u0930\u094D\u0938 \u092A\u0942\u0930\u094D\u0923\u0924\u094D\u0935\u093E\u091A\u0940 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930\u0947 \u0926\u094D\u092F\u093E.\n\n\u0925\u0947\u091F \u0909\u0918\u0921\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0916\u093E\u0932\u0940\u0932 OPEN INSTITUTE PORTAL \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.'
    }
  },
  {
    id: "teacher_lesson_planner_and_assignments",
    priority: 87,
    keywords: [
      "lesson plan",
      "lesson planner",
      "annual plan",
      "monthly plan",
      "daily plan",
      "assignment",
      "create assignment",
      "homework",
      "student management",
      "manage students",
      "\u0932\u0947\u0938\u0928 \u092A\u094D\u0932\u093E\u0928\u0930",
      "\u0905\u0938\u093E\u0907\u0928\u092E\u0947\u0902\u091F",
      "\u092A\u093E\u0920\u094D\u092F\u093E\u091A\u0947 \u0928\u093F\u092F\u094B\u091C\u0928",
      "\u091F\u093E\u091A\u0923"
    ],
    actionIds: () => ["open_lesson_planner", "open_teacher_resources", "open_ai_tools"],
    responses: {
      en: () => 'Teacher Support \u2014 Lesson Planner, Assignments & Student Management:\n1. How to Use the Lesson Planner:\n   \u2022 Open the Teacher Portal and click "Lesson Planner" (or click OPEN TEACHER LESSON PLANNER below).\n   \u2022 Select your Board (Maharashtra / CBSE / ICSE), Medium, Class (1\u201310), and Subject.\n   \u2022 Switch between Annual Plan, Monthly Plan, and Daily Lesson Plan tabs, customize school holidays in the School Calendar Drawer, and export clean A4 PDFs.\n2. Assignment & Worksheet Creation:\n   \u2022 Use the Teacher AI Generator / Worksheet & Question Paper Maker in the Teacher Portal to generate custom assignments, chapter tests, and answer keys.\n3. Student Management:\n   \u2022 Track student attendance, review submitted worksheets/quizzes, and monitor class performance from your Teacher Dashboard.',
      hi: () => '\u091F\u0940\u091A\u0930 \u0938\u092A\u094B\u0930\u094D\u091F \u2014 \u0932\u0947\u0938\u0928 \u092A\u094D\u0932\u093E\u0928\u0930, \u0905\u0938\u093E\u0907\u0928\u092E\u0947\u0902\u091F \u0914\u0930 \u091B\u093E\u0924\u094D\u0930 \u092A\u094D\u0930\u092C\u0902\u0927\u0928:\n1. Lesson Planner \u0915\u0948\u0938\u0947 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902:\n   \u2022 Teacher Portal \u092E\u0947\u0902 "Lesson Planner" \u0916\u094B\u0932\u0947\u0902 (\u092F\u093E \u0928\u0940\u091A\u0947 OPEN TEACHER LESSON PLANNER \u0926\u092C\u093E\u090F\u0901)\u0964\n   \u2022 \u0905\u092A\u0928\u093E \u092C\u094B\u0930\u094D\u0921 (Maharashtra / CBSE / ICSE), \u092E\u093E\u0927\u094D\u092F\u092E, \u0915\u0915\u094D\u0937\u093E (1\u201310) \u0914\u0930 \u0935\u093F\u0937\u092F \u091A\u0941\u0928\u0947\u0902\u0964\n   \u2022 Annual Plan, Monthly Plan \u0914\u0930 Daily Lesson Plan \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0947\u0902 \u0914\u0930 A4 PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921/\u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0947\u0902\u0964\n2. Assignment \u0914\u0930 Worksheet \u0928\u093F\u0930\u094D\u092E\u093E\u0923:\n   \u2022 Teacher AI Generator \u0938\u0947 \u0915\u0938\u094D\u091F\u092E \u0935\u0930\u094D\u0915\u0936\u0940\u091F, \u092A\u094D\u0930\u0936\u094D\u0928-\u092A\u0924\u094D\u0930 \u0914\u0930 \u0909\u0924\u094D\u0924\u0930-\u0915\u0941\u0902\u091C\u0940 \u0924\u0948\u092F\u093E\u0930 \u0915\u0930\u0947\u0902\u0964\n3. Student Management:\n   \u2022 \u091F\u0940\u091A\u0930 \u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921 \u0938\u0947 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u093F, \u0915\u094D\u0935\u093F\u091C\u093C \u0938\u094D\u0915\u094B\u0930 \u0914\u0930 \u092A\u094D\u0930\u0917\u0924\u093F \u091F\u094D\u0930\u0948\u0915 \u0915\u0930\u0947\u0902\u0964',
      mr: () => '\u0936\u093F\u0915\u094D\u0937\u0915 \u092E\u0926\u0924 \u2014 \u0932\u0947\u0938\u0928 \u092A\u094D\u0932\u093E\u0928\u0930, \u0905\u0938\u093E\u0907\u0928\u092E\u0947\u0902\u091F \u0906\u0923\u093F \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940 \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093E\u092A\u0928:\n1. Lesson Planner \u0915\u0938\u093E \u0935\u093E\u092A\u0930\u093E\u0935\u093E:\n   \u2022 Teacher Portal \u092E\u0927\u094D\u092F\u0947 "Lesson Planner" \u0909\u0918\u0921\u093E (\u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 OPEN TEACHER LESSON PLANNER \u0926\u093E\u092C\u093E).\n   \u2022 \u0924\u0941\u092E\u091A\u0947 \u092C\u094B\u0930\u094D\u0921 (Maharashtra / CBSE / ICSE), \u092E\u093E\u0927\u094D\u092F\u092E, \u0907\u092F\u0924\u094D\u0924\u093E (\u0967\u2013\u0967\u0966) \u0906\u0923\u093F \u0935\u093F\u0937\u092F \u0928\u093F\u0935\u0921\u093E.\n   \u2022 \u0935\u093E\u0930\u094D\u0937\u093F\u0915 (Annual), \u092E\u093E\u0938\u093F\u0915 (Monthly) \u0906\u0923\u093F \u0926\u0948\u0928\u0902\u0926\u093F\u0928 (Daily) \u092A\u093E\u0920 \u091F\u093E\u091A\u0923 \u0924\u092F\u093E\u0930 \u0915\u0930\u093E \u0935 A4 PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u0930\u093E.\n2. Assignment \u0935 Worksheet \u0924\u092F\u093E\u0930 \u0915\u0930\u0923\u0947:\n   \u2022 Teacher AI Generator \u0935\u093E\u092A\u0930\u0942\u0928 \u0938\u0930\u093E\u0935\u092A\u0924\u094D\u0930\u093F\u0915\u093E, \u092A\u094D\u0930\u0936\u094D\u0928\u092A\u0924\u094D\u0930\u093F\u0915\u093E \u0935 \u0909\u0924\u094D\u0924\u0930\u0938\u0942\u091A\u0940 \u0924\u092F\u093E\u0930 \u0915\u0930\u093E.\n3. \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940 \u0935\u094D\u092F\u0935\u0938\u094D\u0925\u093E\u092A\u0928:\n   \u2022 \u0936\u093F\u0915\u094D\u0937\u0915 \u0921\u0945\u0936\u092C\u094B\u0930\u094D\u0921\u0935\u0930\u0942\u0928 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u091A\u0940 \u0909\u092A\u0938\u094D\u0925\u093F\u0924\u0940, \u0917\u0941\u0923 \u0906\u0923\u093F \u092A\u094D\u0930\u0917\u0924\u0940 \u0924\u092A\u093E\u0938\u093E.'
    }
  },
  {
    id: "ai_generator_and_tools",
    priority: 86,
    keywords: [
      "ai generator",
      "ai tool",
      "ai tools",
      "how to use ai",
      "learning tools",
      "pdf maker",
      "notes generator",
      "worksheet generator",
      "presentation maker",
      "dictionary",
      "trilingual dictionary",
      "thought of the day",
      "\u0936\u092C\u094D\u0926\u0915\u094B\u0936",
      "\u0938\u0941\u0935\u093F\u091A\u093E\u0930",
      "\u090F\u0906\u0908 \u091C\u0928\u0930\u0947\u091F\u0930"
    ],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_question_paper_generator", "open_ai_tools", "open_lesson_planner"] : ["open_ai_tools", "open_dictionary", "open_thought_of_the_day"],
    responses: {
      en: (_c, _b, role) => role === "teacher" ? 'How Teachers Use MyStudyZone 40+ AI Tools Studio Step by Step:\n1. Open AI Tools Studio via "40 AI Tools" in your Teacher bar (or click OPEN AI GENERATOR & TOOLS / OPEN QUESTION PAPER GENERATOR below).\n2. Choose from 40 Teacher Productivity Tools (Lesson Plans, Question Papers, Worksheets, Rubrics, PTM Circulars) or Core 10 AI Generators.\n3. Select your Board (Maharashtra / CBSE / ICSE), Class (1\u201310), Subject, Medium, and Chapter/Topic.\n4. Click Generate and export clean PDF, Word (.docx), Excel (.xlsx), or PowerPoint (.pptx) files.' : 'How to Use the MyStudyZone AI Generator & Learning Tools Step by Step:\n1. AI Generator Studio (30+ Student Tools & Core Generators):\n   \u2022 Click "Learning Tools" on the homepage or "AI Tools Studio" inside your portal (or click OPEN AI GENERATOR & TOOLS below).\n   \u2022 Pick a tool (Notes Generator, Worksheet Generator, Question Paper Maker, Quiz Generator, Presentation Slides, Flashcards, or PDF Maker).\n   \u2022 Select your Board, Class (1\u201310), Subject, Language (English / Marathi / Hindi), and enter your Chapter or Topic.\n   \u2022 Click Generate to get structured educational content ready to view or export.\n2. Trilingual Dictionary (English\u2013Marathi\u2013Hindi):\n   \u2022 Type any single word in English, Marathi, or Hindi to view its pronunciation, simple & detailed meanings in all 3 languages, synonyms, antonyms, and example sentences.\n3. Thought of the Day:\n   \u2022 Explore 1,000+ verified motivational and educational thoughts in English, Marathi, and Hindi.',
      hi: () => 'MyStudyZone AI Generator \u0914\u0930 Learning Tools \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902:\n1. AI Generator Studio:\n   \u2022 \u0939\u094B\u092E\u092A\u0947\u091C \u092A\u0930 "Learning Tools" \u092F\u093E \u092A\u094B\u0930\u094D\u091F\u0932 \u092E\u0947\u0902 "AI Tools Studio" \u0916\u094B\u0932\u0947\u0902 (\u092F\u093E \u0928\u0940\u091A\u0947 OPEN AI GENERATOR & TOOLS \u0926\u092C\u093E\u090F\u0901)\u0964\n   \u2022 \u0905\u092A\u0928\u093E \u091F\u0942\u0932 \u091A\u0941\u0928\u0947\u0902 (Worksheet Generator, Notes Generator, Question Paper, Quiz \u092F\u093E Slides)\u0964\n   \u2022 \u092C\u094B\u0930\u094D\u0921, \u0915\u0915\u094D\u0937\u093E (1\u201310), \u0935\u093F\u0937\u092F, \u092D\u093E\u0937\u093E (English/Marathi/Hindi) \u0914\u0930 \u091F\u0949\u092A\u093F\u0915 \u092D\u0930\u0915\u0930 Generate \u0926\u092C\u093E\u090F\u0901\u0964\n2. Trilingual Dictionary (\u0905\u0902\u0917\u094D\u0930\u0947\u091C\u0940\u2013\u092E\u0930\u093E\u0920\u0940\u2013\u0939\u093F\u0902\u0926\u0940 \u0936\u092C\u094D\u0926\u0915\u094B\u0936):\n   \u2022 \u0915\u093F\u0938\u0940 \u092D\u0940 \u090F\u0915 \u0936\u092C\u094D\u0926 \u0915\u094B \u0916\u094B\u091C\u0947\u0902 \u0914\u0930 \u0924\u0940\u0928\u094B\u0902 \u092D\u093E\u0937\u093E\u0913\u0902 \u092E\u0947\u0902 \u0905\u0930\u094D\u0925, \u0909\u091A\u094D\u091A\u093E\u0930\u0923, \u0938\u092E\u093E\u0928\u093E\u0930\u094D\u0925\u0940, \u0935\u093F\u0930\u0941\u0926\u094D\u0927\u093E\u0930\u094D\u0925\u0940 \u0914\u0930 \u0909\u0926\u093E\u0939\u0930\u0923 \u0935\u093E\u0915\u094D\u092F \u0926\u0947\u0916\u0947\u0902\u0964\n3. Thought of the Day:\n   \u2022 \u0924\u0940\u0928\u094B\u0902 \u092D\u093E\u0937\u093E\u0913\u0902 \u092E\u0947\u0902 1,000+ \u092A\u094D\u0930\u0947\u0930\u0923\u093E\u0926\u093E\u092F\u0915 \u0938\u0941\u0935\u093F\u091A\u093E\u0930 \u092A\u0922\u093C\u0947\u0902\u0964',
      mr: () => 'MyStudyZone AI Generator \u0906\u0923\u093F Learning Tools \u0915\u0938\u0947 \u0935\u093E\u092A\u0930\u093E\u0935\u0947:\n1. AI Generator Studio:\n   \u2022 \u092E\u0941\u0916\u094D\u092F\u092A\u0943\u0937\u094D\u0920\u093E\u0935\u0930 "Learning Tools" \u0915\u093F\u0902\u0935\u093E \u092A\u094B\u0930\u094D\u091F\u0932\u092E\u0927\u094D\u092F\u0947 "AI Tools Studio" \u0909\u0918\u0921\u093E (\u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 OPEN AI GENERATOR & TOOLS \u0926\u093E\u092C\u093E).\n   \u2022 \u0906\u0935\u0936\u094D\u092F\u0915 \u091F\u0942\u0932 \u0928\u093F\u0935\u0921\u093E (Worksheet Generator, Notes Generator, Question Paper, Quiz \u0915\u093F\u0902\u0935\u093E Slides).\n   \u2022 \u092C\u094B\u0930\u094D\u0921, \u0907\u092F\u0924\u094D\u0924\u093E (\u0967\u2013\u0967\u0966), \u0935\u093F\u0937\u092F, \u092D\u093E\u0937\u093E (English/Marathi/Hindi) \u0906\u0923\u093F \u0918\u091F\u0915 \u091F\u093E\u0915\u0942\u0928 Generate \u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.\n2. Trilingual Dictionary (\u0907\u0902\u0917\u094D\u0930\u091C\u0940\u2013\u092E\u0930\u093E\u0920\u0940\u2013\u0939\u093F\u0902\u0926\u0940 \u0936\u092C\u094D\u0926\u0915\u094B\u0936):\n   \u2022 \u0915\u094B\u0923\u0924\u093E\u0939\u0940 \u090F\u0915 \u0936\u092C\u094D\u0926 \u0936\u094B\u0927\u093E \u0906\u0923\u093F \u0924\u093F\u0928\u094D\u0939\u0940 \u092D\u093E\u0937\u093E\u0902\u092E\u0927\u094D\u092F\u0947 \u0905\u0930\u094D\u0925, \u0909\u091A\u094D\u091A\u093E\u0930, \u0938\u092E\u093E\u0928\u093E\u0930\u094D\u0925\u0940, \u0935\u093F\u0930\u0941\u0926\u094D\u0927\u093E\u0930\u094D\u0925\u0940 \u0936\u092C\u094D\u0926 \u0935 \u0909\u0926\u093E\u0939\u0930\u0923\u0947 \u092A\u0939\u093E.\n3. Thought of the Day (\u0906\u091C\u091A\u093E \u0938\u0941\u0935\u093F\u091A\u093E\u0930):\n   \u2022 \u0907\u0902\u0917\u094D\u0930\u091C\u0940, \u092E\u0930\u093E\u0920\u0940 \u0906\u0923\u093F \u0939\u093F\u0902\u0926\u0940\u0924\u0940\u0932 \u0967,\u0966\u0966\u0966+ \u092A\u094D\u0930\u0947\u0930\u0923\u093E\u0926\u093E\u092F\u0940 \u0938\u0941\u0935\u093F\u091A\u093E\u0930 \u0935\u093E\u091A\u093E.'
    }
  },
  {
    id: "teacher_resources",
    priority: 85,
    keywords: [
      "teacher resources",
      "teaching resources",
      "teaching material",
      "teacher portal",
      "teacher dashboard",
      "teacher facility",
      "teacher facilities",
      "for teachers",
      "educator",
      "techer",
      "shikshak",
      "how to access teacher portal",
      "\u0936\u093F\u0915\u094D\u0937\u0915",
      "\u0905\u0927\u094D\u092F\u093E\u092A\u0928"
    ],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_teacher_resources", "open_lesson_planner", "open_question_paper_generator", "open_tet_ctet"] : ["open_teacher_login", "open_teacher_resources", "open_lesson_planner", "open_tet_ctet"],
    responses: {
      en: () => 'How to Access & Use the MyStudyZone Teacher Portal:\n1. From the homepage, click the "Teacher Portal" card (or click Login / Register \u2192 select Teacher).\n2. Inside the Teacher Portal, you get unified access to:\n   \u2022 Teacher Lesson Planner (Annual, Monthly & Daily plans with A4 PDF export)\n   \u2022 AI Worksheet, Question Paper & Assignment Generators\n   \u2022 Classes 1 to 10 curriculum across Maharashtra State Board, CBSE, and ICSE\n   \u2022 Class-wise interactive Worksheets, Chapter Study Notes & 4-Level Quizzes\n   \u2022 MAHA TET & CTET (Paper 1 & Paper 2) mock tests and 4th & 7th Scholarship prep\n\nClick OPEN TEACHER PORTAL or OPEN TEACHER LESSON PLANNER below to begin.',
      hi: () => 'MyStudyZone \u091F\u0940\u091A\u0930 \u092A\u094B\u0930\u094D\u091F\u0932 \u0915\u0948\u0938\u0947 \u0916\u094B\u0932\u0947\u0902 \u0914\u0930 \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902:\n1. \u0939\u094B\u092E\u092A\u0947\u091C \u092A\u0930 "Teacher Portal" \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 (\u092F\u093E Login / Register \u2192 Teacher \u091A\u0941\u0928\u0947\u0902)\u0964\n2. \u091F\u0940\u091A\u0930 \u092A\u094B\u0930\u094D\u091F\u0932 \u092E\u0947\u0902 \u0936\u093F\u0915\u094D\u0937\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0909\u092A\u0932\u092C\u094D\u0927 \u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0901:\n   \u2022 Teacher Lesson Planner (\u0935\u093E\u0930\u094D\u0937\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u0935 \u0926\u0948\u0928\u093F\u0915 \u092A\u093E\u0920 \u092F\u094B\u091C\u0928\u093E + A4 PDF \u090F\u0915\u094D\u0938\u092A\u094B\u0930\u094D\u091F)\n   \u2022 AI \u0935\u0930\u094D\u0915\u0936\u0940\u091F, \u092A\u094D\u0930\u0936\u094D\u0928-\u092A\u0924\u094D\u0930 \u0914\u0930 \u0905\u0938\u093E\u0907\u0928\u092E\u0947\u0902\u091F \u091C\u0928\u0930\u0947\u091F\u0930\n   \u2022 \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u092C\u094B\u0930\u094D\u0921, CBSE \u0914\u0930 ICSE \u0915\u0947 \u0915\u0915\u094D\u0937\u093E 1 \u0938\u0947 10 \u0924\u0915 \u0915\u0947 \u0928\u094B\u091F\u094D\u0938 \u0935 \u0935\u0930\u094D\u0915\u0936\u0940\u091F\n   \u2022 MAHA TET \u0914\u0930 CTET (\u092A\u0947\u092A\u0930 1 \u0935 2) \u0924\u0925\u093E \u0938\u094D\u0915\u0949\u0932\u0930\u0936\u093F\u092A \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F\u0964\n\n\u0938\u0940\u0927\u0947 \u091C\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0928\u0940\u091A\u0947 \u0926\u093F\u090F \u092C\u091F\u0928 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902\u0964',
      mr: () => 'MyStudyZone \u0936\u093F\u0915\u094D\u0937\u0915 \u092A\u094B\u0930\u094D\u091F\u0932 \u0915\u0938\u0947 \u0909\u0918\u0921\u093E\u0935\u0947 \u0906\u0923\u093F \u0935\u093E\u092A\u0930\u093E\u0935\u0947:\n1. \u092E\u0941\u0916\u094D\u092F\u092A\u0943\u0937\u094D\u0920\u093E\u0935\u0930\u0940\u0932 "Teacher Portal" \u0915\u093E\u0930\u094D\u0921\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E (\u0915\u093F\u0902\u0935\u093E Login / Register \u2192 Teacher \u0928\u093F\u0935\u0921\u093E).\n2. \u0936\u093F\u0915\u094D\u0937\u0915 \u092A\u094B\u0930\u094D\u091F\u0932\u0935\u0930\u0940\u0932 \u092A\u094D\u0930\u092E\u0941\u0916 \u0938\u0941\u0935\u093F\u0927\u093E:\n   \u2022 Teacher Lesson Planner (\u0935\u093E\u0930\u094D\u0937\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u0935 \u0926\u0948\u0928\u0902\u0926\u093F\u0928 \u092A\u093E\u0920 \u0928\u093F\u092F\u094B\u091C\u0928 + A4 PDF \u092A\u094D\u0930\u093F\u0902\u091F)\n   \u2022 AI \u0935\u0930\u094D\u0915\u0936\u0940\u091F, \u092A\u094D\u0930\u0936\u094D\u0928\u092A\u0924\u094D\u0930\u093F\u0915\u093E \u0935 \u0905\u0938\u093E\u0907\u0928\u092E\u0947\u0902\u091F \u091C\u0928\u0930\u0947\u091F\u0930\n   \u2022 \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u092C\u094B\u0930\u094D\u0921, CBSE \u0935 ICSE \u092E\u0927\u0940\u0932 \u0907\u092F\u0924\u094D\u0924\u093E \u0967 \u0924\u0947 \u0967\u0966 \u091A\u0947 \u0938\u0930\u094D\u0935 \u0935\u093F\u0937\u092F, \u0928\u094B\u091F\u094D\u0938 \u0935 \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938\n   \u2022 MAHA TET \u0906\u0923\u093F CTET (\u092A\u0947\u092A\u0930 \u0967 \u0935 \u0968) \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F.\n\n\u0916\u093E\u0932\u0940\u0932 \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0942\u0928 \u0925\u0947\u091F \u092A\u094D\u0930\u0935\u0947\u0936 \u0915\u0930\u093E.'
    }
  },
  {
    id: "tet_ctet",
    priority: 82,
    keywords: ["tet", "ctet", "maha tet", "mahatet", "paper 1", "paper 2", "\u091F\u0940\u0908\u091F\u0940", "\u0938\u0940\u091F\u0940\u0908\u091F\u0940"],
    actionIds: () => ["open_tet_ctet", "open_demo"],
    responses: {
      en: () => "In the TET & CTET Exam Prep section, teachers and aspirants can access:\n\u2022 Maharashtra TET (Paper 1 & Paper 2)\n\u2022 CTET Paper 1 (Classes 1\u20135) and CTET Paper 2 (Classes 6\u20138)\n\u2022 Free Demo Mock Tests with real 150-minute countdown timers and detailed solutions, plus full mock test series plans.",
      hi: () => "TET \u0914\u0930 CTET Exam Prep \u0905\u0928\u0941\u092D\u093E\u0917 \u092E\u0947\u0902 \u0906\u092A\u0915\u094B \u092E\u093F\u0932\u0924\u093E \u0939\u0948:\n\u2022 \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 TET (\u092A\u0947\u092A\u0930 1 \u0935 \u092A\u0947\u092A\u0930 2)\n\u2022 CTET \u092A\u0947\u092A\u0930 1 (\u0915\u0915\u094D\u0937\u093E 1\u20135) \u0914\u0930 CTET \u092A\u0947\u092A\u0930 2 (\u0915\u0915\u094D\u0937\u093E 6\u20138)\n\u2022 \u0930\u093F\u092F\u0932 \u091F\u093E\u0907\u092E\u0930 \u0914\u0930 \u0938\u092E\u093E\u0927\u093E\u0928 \u0938\u0939\u093F\u0924 \u092B\u094D\u0930\u0940 \u0921\u0947\u092E\u094B \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0924\u0925\u093E \u092A\u0942\u0930\u094D\u0923 \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0938\u0940\u0930\u0940\u091C\u0964",
      mr: () => "TET \u0906\u0923\u093F CTET Exam Prep \u0935\u093F\u092D\u093E\u0917\u093E\u0924 \u0909\u092A\u0932\u092C\u094D\u0927 \u0938\u0941\u0935\u093F\u0927\u093E:\n\u2022 \u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 TET (\u092A\u0947\u092A\u0930 \u0967 \u0935 \u092A\u0947\u092A\u0930 \u0968)\n\u2022 CTET \u092A\u0947\u092A\u0930 \u0967 (\u0907\u092F\u0924\u094D\u0924\u093E \u0967\u2013\u096B) \u0906\u0923\u093F CTET \u092A\u0947\u092A\u0930 \u0968 (\u0907\u092F\u0924\u094D\u0924\u093E \u096C\u2013\u096E)\n\u2022 \u0905\u091A\u0942\u0915 \u091F\u093E\u0907\u092E\u0930 \u0935 \u0938\u094D\u092A\u0937\u094D\u091F\u0940\u0915\u0930\u0923\u093E\u0938\u0939 \u092E\u094B\u092B\u0924 \u0921\u0947\u092E\u094B \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0924\u0938\u0947\u091A \u0938\u0902\u092A\u0942\u0930\u094D\u0923 \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0938\u093F\u0930\u0940\u091C."
    }
  },
  {
    id: "scholarship",
    priority: 80,
    keywords: ["scholarship", "sholarship", "msce", "pse", "ups", "\u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940", "\u0938\u094D\u0915\u0949\u0932\u0930\u0936\u093F\u092A"],
    actionIds: () => ["open_scholarship", "open_demo"],
    responses: {
      en: () => "MyStudyZone Scholarship Corner follows the MSCE Pune pattern for Standard 4th (PSE) and Standard 7th (UPS):\n\u2022 Paper 1: First Language (English) & Mathematics\n\u2022 Paper 2: Third Language (Marathi) & Intelligence Test\n\u2022 Includes free interactive demo mock tests (90-minute timer, question palette & solutions) as well as full mock test sets.",
      hi: () => "MyStudyZone \u0938\u094D\u0915\u0949\u0932\u0930\u0936\u093F\u092A \u0915\u0949\u0930\u094D\u0928\u0930 \u092E\u0947\u0902 MSCE \u092A\u0941\u0923\u0947 \u092A\u0948\u091F\u0930\u094D\u0928 \u0915\u0947 \u0905\u0928\u0941\u0938\u093E\u0930 \u0915\u0915\u094D\u0937\u093E 4\u0925\u0940 (PSE) \u0914\u0930 \u0915\u0915\u094D\u0937\u093E 7\u0935\u0940\u0902 (UPS) \u0915\u0940 \u0924\u0948\u092F\u093E\u0930\u0940 \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948:\n\u2022 \u092A\u0947\u092A\u0930 1: \u092A\u094D\u0930\u0925\u092E \u092D\u093E\u0937\u093E (English) \u0914\u0930 \u0917\u0923\u093F\u0924\n\u2022 \u092A\u0947\u092A\u0930 2: \u0924\u0943\u0924\u0940\u092F \u092D\u093E\u0937\u093E (Marathi) \u0914\u0930 \u092C\u0941\u0926\u094D\u0927\u093F\u092E\u0924\u094D\u0924\u093E \u091A\u093E\u091A\u0923\u0940\n\u2022 90-\u092E\u093F\u0928\u091F \u091F\u093E\u0907\u092E\u0930 \u0935\u093E\u0932\u093E \u092B\u094D\u0930\u0940 \u0921\u0947\u092E\u094B \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0914\u0930 \u092A\u0942\u0930\u094D\u0923 \u092E\u0949\u0915 \u0938\u0947\u091F \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948\u0902\u0964",
      mr: () => "MyStudyZone \u0938\u094D\u0915\u0949\u0932\u0930\u0936\u093F\u092A \u0915\u0949\u0930\u094D\u0928\u0930\u092E\u0927\u094D\u092F\u0947 MSCE \u092A\u0941\u0923\u0947 \u0905\u092D\u094D\u092F\u093E\u0938\u0915\u094D\u0930\u092E\u093E\u0928\u0941\u0938\u093E\u0930 \u0907\u092F\u0924\u094D\u0924\u093E \u096A \u0925\u0940 (PSE) \u0906\u0923\u093F \u0907\u092F\u0924\u094D\u0924\u093E \u096D \u0935\u0940 (UPS) \u0938\u093E\u0920\u0940 \u0938\u0902\u092A\u0942\u0930\u094D\u0923 \u0938\u0930\u093E\u0935 \u0909\u092A\u0932\u092C\u094D\u0927 \u0906\u0939\u0947:\n\u2022 \u092A\u0947\u092A\u0930 \u0967: \u092A\u094D\u0930\u0925\u092E \u092D\u093E\u0937\u093E (English) \u0935 \u0917\u0923\u093F\u0924\n\u2022 \u092A\u0947\u092A\u0930 \u0968: \u0924\u0943\u0924\u0940\u092F \u092D\u093E\u0937\u093E (\u092E\u0930\u093E\u0920\u0940) \u0935 \u092C\u0941\u0926\u094D\u0927\u093F\u092E\u0924\u094D\u0924\u093E \u091A\u093E\u091A\u0923\u0940\n\u2022 \u096F\u0966 \u092E\u093F\u0928\u093F\u091F\u093E\u0902\u091A\u094D\u092F\u093E \u091F\u093E\u0907\u092E\u0930\u0938\u0939 \u092E\u094B\u092B\u0924 \u0921\u0947\u092E\u094B \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F \u0906\u0923\u093F \u0938\u0902\u092A\u0942\u0930\u094D\u0923 \u092A\u094D\u0930\u0936\u094D\u0928\u0938\u0902\u091A \u0909\u092A\u0932\u092C\u094D\u0927 \u0906\u0939\u0947\u0924."
    }
  },
  {
    id: "worksheets",
    priority: 78,
    keywords: ["worksheet", "worksheets", "workshets", "exercise", "exercises", "practice sheet", "how to access worksheets", "\u0935\u0930\u094D\u0915\u0936\u0940\u091F", "\u0938\u0930\u093E\u0935\u092A\u0924\u094D\u0930\u093F\u0915\u093E"],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_worksheets", "open_ai_tools", "open_lesson_planner"] : ["open_worksheets", "open_quizzes"],
    responses: {
      en: (cls, board, role) => {
        const scope = [board ? `${board} Board` : "", cls || "Classes 1\u201310"].filter(Boolean).join(" \u2022 ");
        if (role === "teacher") {
          return `How Teachers Access & Create Worksheets (${scope}) Step by Step:
1. Click "Worksheets" in your Teacher bar (or OPEN WORKSHEETS below) to inspect ready-made interactive board & class worksheets (Classes 1\u201310).
2. Select Education Board (Maharashtra / CBSE / ICSE), Class (1\u201310), and Subject.
3. To generate custom printable classroom worksheets with answer keys, open 40 AI Tools \u2192 "Worksheet Generator" (or click OPEN AI GENERATOR & TOOLS below).`;
        }
        return `How to Access Worksheets (${scope}) Step by Step:
1. Click the "Worksheets" card on your dashboard or homepage (or click OPEN WORKSHEETS below).
2. Select your Education Board (Maharashtra / CBSE / ICSE), Class (1\u201310), and Subject.
3. Click any chapter worksheet to solve interactive questions online with instant scoring and explanations.
\u2022 Free Plan: 2 Demo Worksheets (English & Mathematics) for your registered Board & Class.
\u2022 Premium \u20B999 (365 Days): Unlocks all subjects' worksheets for that Board & Class.
\u2022 Note: Student worksheets are interactive online resources (printing/offline downloads are disabled).`;
      },
      hi: (cls, board, role) => {
        const scope = [board ? `${board} \u092C\u094B\u0930\u094D\u0921` : "", cls || "\u0915\u0915\u094D\u0937\u093E 1 \u0938\u0947 10"].filter(Boolean).join(" \u2022 ");
        if (role === "teacher") {
          return `\u0936\u093F\u0915\u094D\u0937\u0915\u094B\u0902 \u0915\u0947 \u0932\u093F\u090F \u0935\u0930\u094D\u0915\u0936\u0940\u091F (${scope}) \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0915\u0947 \u091A\u0930\u0923:
1. \u091F\u0940\u091A\u0930 \u092C\u093E\u0930 \u092E\u0947\u0902 "Worksheets" \u0916\u094B\u0932\u0947\u0902 (\u092F\u093E \u0928\u0940\u091A\u0947 OPEN WORKSHEETS \u0926\u092C\u093E\u090F\u0901) \u0914\u0930 \u092C\u094B\u0930\u094D\u0921, \u0915\u0915\u094D\u0937\u093E \u0935 \u0935\u093F\u0937\u092F \u091A\u0941\u0928\u0947\u0902\u0964
2. \u0915\u0938\u094D\u091F\u092E \u092A\u094D\u0930\u093F\u0902\u091F\u0947\u092C\u0932 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u0935 \u0909\u0924\u094D\u0924\u0930-\u0915\u0941\u0902\u091C\u0940 \u092C\u0928\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F 40 AI Tools \u2192 "Worksheet Generator" \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0947\u0902\u0964`;
        }
        return `\u0935\u0930\u094D\u0915\u0936\u0940\u091F (${scope}) \u0915\u0948\u0938\u0947 \u0916\u094B\u0932\u0947\u0902 \u2014 \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923:
1. \u0939\u094B\u092E\u092A\u0947\u091C \u092F\u093E \u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921 \u092A\u0930 "Worksheets" \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 (\u092F\u093E \u0928\u0940\u091A\u0947 OPEN WORKSHEETS \u0926\u092C\u093E\u090F\u0901)\u0964
2. \u0905\u092A\u0928\u093E \u092C\u094B\u0930\u094D\u0921, \u0915\u0915\u094D\u0937\u093E (1\u201310) \u0914\u0930 \u0935\u093F\u0937\u092F \u091A\u0941\u0928\u0947\u0902\u0964
3. \u0915\u093F\u0938\u0940 \u092D\u0940 \u0905\u0927\u094D\u092F\u093E\u092F \u0915\u0940 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u0916\u094B\u0932\u0915\u0930 \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u094D\u0930\u0936\u094D\u0928 \u0939\u0932 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0924\u0941\u0930\u0902\u0924 \u0938\u094D\u0915\u094B\u0930 \u0926\u0947\u0916\u0947\u0902\u0964
\u2022 \u092B\u094D\u0930\u0940 \u092A\u094D\u0932\u093E\u0928: \u092A\u0902\u091C\u0940\u0915\u0943\u0924 \u092C\u094B\u0930\u094D\u0921 \u0935 \u0915\u0915\u094D\u0937\u093E \u0915\u0940 2 \u0921\u0947\u092E\u094B \u0935\u0930\u094D\u0915\u0936\u0940\u091F (English \u0914\u0930 Maths) \u092E\u0941\u092B\u094D\u0924 \u0939\u0948\u0902\u0964
\u2022 \u20B999 (365 \u0926\u093F\u0928) \u092A\u094D\u0932\u093E\u0928: \u0909\u0938 \u0915\u0915\u094D\u0937\u093E \u0915\u0947 \u0938\u092D\u0940 \u0935\u093F\u0937\u092F\u094B\u0902 \u0915\u0940 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u0905\u0928\u0932\u0949\u0915 \u0915\u0930\u0924\u093E \u0939\u0948\u0964`;
      },
      mr: (cls, board, role) => {
        const scope = [board ? `${board} \u092C\u094B\u0930\u094D\u0921` : "", cls || "\u0907\u092F\u0924\u094D\u0924\u093E \u0967 \u0924\u0947 \u0967\u0966"].filter(Boolean).join(" \u2022 ");
        if (role === "teacher") {
          return `\u0936\u093F\u0915\u094D\u0937\u0915\u093E\u0902\u0938\u093E\u0920\u0940 \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938 (${scope}) \u0935\u093E\u092A\u0930\u0923\u094D\u092F\u093E\u091A\u094D\u092F\u093E \u092A\u093E\u092F\u0931\u094D\u092F\u093E:
1. \u091F\u0940\u091A\u0930 \u092C\u093E\u0930\u092E\u0927\u0942\u0928 "Worksheets" \u0909\u0918\u0921\u093E (\u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 OPEN WORKSHEETS \u0926\u093E\u092C\u093E) \u0906\u0923\u093F \u092C\u094B\u0930\u094D\u0921, \u0907\u092F\u0924\u094D\u0924\u093E \u0935 \u0935\u093F\u0937\u092F \u0928\u093F\u0935\u0921\u093E.
2. \u0928\u0935\u0940\u0928 \u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0923\u094D\u092F\u093E\u092F\u094B\u0917\u094D\u092F \u0938\u0930\u093E\u0935\u092A\u0924\u094D\u0930\u093F\u0915\u093E \u0924\u092F\u093E\u0930 \u0915\u0930\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 40 AI Tools \u2192 "Worksheet Generator" \u0935\u093E\u092A\u0930\u093E.`;
        }
        return `\u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938 (${scope}) \u0915\u0936\u093E \u0909\u0918\u0921\u093E\u0935\u094D\u092F\u093E\u0924 \u2014 \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947:
1. \u092E\u0941\u0916\u094D\u092F\u092A\u0943\u0937\u094D\u0920 \u0915\u093F\u0902\u0935\u093E \u0921\u0945\u0936\u092C\u094B\u0930\u094D\u0921\u0935\u0930\u0940\u0932 "Worksheets" \u0915\u093E\u0930\u094D\u0921\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E (\u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 OPEN WORKSHEETS \u0926\u093E\u092C\u093E).
2. \u0924\u0941\u092E\u091A\u0947 \u092C\u094B\u0930\u094D\u0921, \u0907\u092F\u0924\u094D\u0924\u093E (\u0967\u2013\u0967\u0966) \u0906\u0923\u093F \u0935\u093F\u0937\u092F \u0928\u093F\u0935\u0921\u093E.
3. \u0915\u094B\u0923\u0924\u094D\u092F\u093E\u0939\u0940 \u0927\u0921\u094D\u092F\u093E\u091A\u0940 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u0928\u093F\u0935\u0921\u0942\u0928 \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u094D\u0930\u0936\u094D\u0928 \u0938\u094B\u0921\u0935\u093E \u0935 \u0932\u0917\u0947\u091A \u0917\u0941\u0923 \u092A\u0939\u093E.
\u2022 \u092E\u094B\u092B\u0924 \u092A\u094D\u0932\u093E\u0928: \u0928\u094B\u0902\u0926\u0923\u0940\u0915\u0943\u0924 \u092C\u094B\u0930\u094D\u0921 \u0935 \u0907\u092F\u0924\u094D\u0924\u0947\u0938\u093E\u0920\u0940 \u0968 \u0921\u0947\u092E\u094B \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938 (English \u0935 Maths) \u092E\u094B\u092B\u0924 \u0906\u0939\u0947\u0924.
\u2022 \u20B9\u096F\u096F (\u0969\u096C\u096B \u0926\u093F\u0935\u0938) \u092A\u094D\u0932\u093E\u0928: \u0924\u094D\u092F\u093E \u0907\u092F\u0924\u094D\u0924\u0947\u091A\u0947 \u0938\u0930\u094D\u0935 \u0935\u093F\u0937\u092F \u0916\u0941\u0932\u0947 \u0915\u0930\u0924\u094B.`;
      }
    }
  },
  {
    id: "syllabus_and_notes",
    priority: 76,
    keywords: [
      "syllabus",
      "silabus",
      "sylabus",
      "curriculum",
      "study material",
      "study materials",
      "notes",
      "chapter notes",
      "textbook",
      "summary",
      "find subjects",
      "find chapters",
      "where to find study notes",
      "how to find notes",
      "abhyaskram",
      "\u0905\u092D\u094D\u092F\u093E\u0938\u0915\u094D\u0930\u092E",
      "\u0938\u093F\u0932\u0947\u092C\u0938",
      "\u0928\u094B\u091F\u094D\u0938"
    ],
    actionIds: () => ["open_syllabus", "open_all_courses"],
    responses: {
      en: (cls, board, role) => {
        const scope = [board || "Maharashtra / CBSE / ICSE", cls || "Classes 1 to 10"].join(" \u2022 ");
        const portalHint = role === "teacher" ? "Teacher Study Library" : "Student Portal \u2192 Study Materials";
        return `Where to Find Subjects, Chapters & Study Notes (${scope}) Step by Step:
1. Open ${portalHint} or "Study Notes" (or click OPEN SYLLABUS & STUDY NOTES below).
2. Step 1: Select your Board (Maharashtra State Board, CBSE, or ICSE), Medium (English / Marathi / Hindi / Semi-English), and Standard (Class 1 to 10).
3. Step 2: Click on any Subject card (e.g., Mathematics, Science, English, History).
4. Step 3: Select your Chapter from the clean chapter list to read detailed study notes, key definitions, formulas, solved examples, and revision checklists.`;
      },
      hi: (cls, board) => {
        const scope = [board || "Maharashtra / CBSE / ICSE", cls || "\u0915\u0915\u094D\u0937\u093E 1 \u0938\u0947 10"].join(" \u2022 ");
        return `\u0935\u093F\u0937\u092F, \u0905\u0927\u094D\u092F\u093E\u092F \u0914\u0930 \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938 (${scope}) \u0915\u0939\u093E\u0901 \u0914\u0930 \u0915\u0948\u0938\u0947 \u0922\u0942\u0901\u0922\u0947\u0902:
1. Study Notes / Study Materials \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 (\u092F\u093E \u0928\u0940\u091A\u0947 OPEN SYLLABUS & STUDY NOTES \u0926\u092C\u093E\u090F\u0901)\u0964
2. \u091A\u0930\u0923 1: \u0905\u092A\u0928\u093E \u092C\u094B\u0930\u094D\u0921 (Maharashtra / CBSE / ICSE), \u092E\u093E\u0927\u094D\u092F\u092E \u0914\u0930 \u0915\u0915\u094D\u0937\u093E (1\u201310) \u091A\u0941\u0928\u0947\u0902\u0964
3. \u091A\u0930\u0923 2: \u0905\u092A\u0928\u0947 \u0935\u093F\u0937\u092F (Subject) \u0915\u093E\u0930\u094D\u0921 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902\u0964
4. \u091A\u0930\u0923 3: \u0905\u0927\u094D\u092F\u093E\u092F (Chapter) \u0915\u0940 \u0938\u0942\u091A\u0940 \u0938\u0947 \u0915\u094B\u0908 \u092D\u0940 \u092A\u093E\u0920 \u091A\u0941\u0928\u0947\u0902 \u0914\u0930 \u0935\u093F\u0938\u094D\u0924\u0943\u0924 \u0928\u094B\u091F\u094D\u0938, \u0938\u0942\u0924\u094D\u0930, \u0939\u0932 \u0915\u093F\u090F \u0917\u090F \u0909\u0926\u093E\u0939\u0930\u0923 \u0935 \u0930\u093F\u0935\u0940\u091C\u0928 \u091A\u0947\u0915\u0932\u093F\u0938\u094D\u091F \u092A\u0922\u093C\u0947\u0902\u0964`;
      },
      mr: (cls, board) => {
        const scope = [board || "Maharashtra / CBSE / ICSE", cls || "\u0907\u092F\u0924\u094D\u0924\u093E \u0967 \u0924\u0947 \u0967\u0966"].join(" \u2022 ");
        return `\u0935\u093F\u0937\u092F, \u0927\u0921\u0947 \u0906\u0923\u093F \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938 (${scope}) \u0915\u0941\u0920\u0947 \u0935 \u0915\u0938\u0947 \u0936\u094B\u0927\u093E\u0935\u0947\u0924:
1. Study Notes / Study Materials \u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E (\u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 OPEN SYLLABUS & STUDY NOTES \u0926\u093E\u092C\u093E).
2. \u092A\u093E\u092F\u0930\u0940 \u0967: \u0924\u0941\u092E\u091A\u0947 \u092C\u094B\u0930\u094D\u0921 (Maharashtra / CBSE / ICSE), \u092E\u093E\u0927\u094D\u092F\u092E \u0906\u0923\u093F \u0907\u092F\u0924\u094D\u0924\u093E (\u0967\u2013\u0967\u0966) \u0928\u093F\u0935\u0921\u093E.
3. \u092A\u093E\u092F\u0930\u0940 \u0968: \u0935\u093F\u0937\u092F\u093E\u091A\u094D\u092F\u093E (Subject) \u0915\u093E\u0930\u094D\u0921\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.
4. \u092A\u093E\u092F\u0930\u0940 \u0969: \u0927\u0921\u094D\u092F\u093E\u0902\u091A\u094D\u092F\u093E \u092F\u093E\u0926\u0940\u0924\u0942\u0928 \u0915\u094B\u0923\u0924\u093E\u0939\u0940 \u0927\u0921\u093E \u0928\u093F\u0935\u0921\u093E \u0906\u0923\u093F \u0938\u0935\u093F\u0938\u094D\u0924\u0930 \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938, \u0938\u0942\u0924\u094D\u0930\u0947, \u0938\u094B\u0921\u0935\u0932\u0947\u0932\u0940 \u0909\u0926\u093E\u0939\u0930\u0923\u0947 \u0935 \u0909\u091C\u0933\u0923\u0940 \u091A\u0947\u0915\u0932\u093F\u0938\u094D\u091F \u0935\u093E\u091A\u093E.`;
      }
    }
  },
  {
    id: "download_resources",
    priority: 90,
    keywords: ["download", "downlod", "pdf", "print", "save offline", "\u0921\u093E\u0909\u0928\u0932\u094B\u0921", "\u092A\u094D\u0930\u093F\u0902\u091F"],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_lesson_planner", "open_question_paper_generator", "open_ai_tools"] : ["open_worksheets", "open_syllabus", "open_certificates"],
    responses: {
      en: (_c, _b, role) => role === "teacher" ? "Teacher Export & Print Rules on MyStudyZone:\n\u2022 Teachers CAN export Annual, Monthly, and Daily Lesson Plans as clean A4 PDFs directly from the Teacher Lesson Planner.\n\u2022 Teachers CAN export AI-generated Question Papers, Worksheets, Revision Notes, Timetables & Rubrics as PDF, DOCX, XLSX, or PPTX from 40 AI Tools Studio.\n\u2022 Built-in Student Chapter Worksheets and Study Materials remain online-only interactive modules." : "Important accuracy note about downloads on MyStudyZone:\n\u2022 Student Worksheets and Study Materials are strictly online interactive resources \u2014 offline PDF downloading and printing are disabled to protect educational content.\n\u2022 Teachers CAN export their Annual, Monthly, and Daily Lesson Plans as A4 PDFs from the Teacher Lesson Planner.\n\u2022 Students CAN view/print earned Milestone Champion Certificates from Certificates & Leaderboard, and save Drawing Studio artwork in their gallery.",
      hi: () => "\u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0938\u0947 \u091C\u0941\u0921\u093C\u0940 \u0938\u0939\u0940 \u091C\u093E\u0928\u0915\u093E\u0930\u0940:\n\u2022 \u091B\u093E\u0924\u094D\u0930\u094B\u0902 \u0915\u0940 \u0935\u0930\u094D\u0915\u0936\u0940\u091F \u0914\u0930 \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938 \u0911\u0928\u0932\u093E\u0907\u0928 \u0907\u0902\u091F\u0930\u0948\u0915\u094D\u091F\u093F\u0935 \u0909\u092A\u092F\u094B\u0917 \u0915\u0947 \u0932\u093F\u090F \u0939\u0948\u0902 \u2014 \u0907\u0928\u0915\u093E PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u092F\u093E \u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0928\u093E \u092C\u0902\u0926 \u0930\u0916\u093E \u0917\u092F\u093E \u0939\u0948\u0964\n\u2022 \u0936\u093F\u0915\u094D\u0937\u0915 Teacher Lesson Planner \u0938\u0947 \u0905\u092A\u0928\u0940 \u0935\u093E\u0930\u094D\u0937\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u0935 \u0926\u0948\u0928\u093F\u0915 \u092A\u093E\u0920 \u092F\u094B\u091C\u0928\u093E \u0915\u093E A4 PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921/\u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964\n\u2022 \u091B\u093E\u0924\u094D\u0930 \u0905\u092A\u0928\u0947 \u091A\u0948\u0902\u092A\u093F\u092F\u0928 \u0938\u0930\u094D\u091F\u093F\u092B\u093F\u0915\u0947\u091F \u0915\u094B Certificates & Leaderboard \u0938\u0947 \u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
      mr: () => "\u0921\u093E\u0909\u0928\u0932\u094B\u0921\u092C\u093E\u092C\u0924 \u0905\u091A\u0942\u0915 \u092E\u093E\u0939\u093F\u0924\u0940:\n\u2022 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u094D\u092F\u093E\u0902\u091A\u094D\u092F\u093E \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938 \u0906\u0923\u093F \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938 \u092B\u0915\u094D\u0924 \u0911\u0928\u0932\u093E\u0907\u0928 \u0938\u0930\u093E\u0935 \u0935 \u0935\u093E\u091A\u0928\u093E\u0938\u093E\u0920\u0940 \u0906\u0939\u0947\u0924 \u2014 \u0924\u094D\u092F\u093E\u0902\u091A\u0947 PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921 \u0915\u093F\u0902\u0935\u093E \u092A\u094D\u0930\u093F\u0902\u091F \u092C\u0902\u0926 \u0906\u0939\u0947.\n\u2022 \u0936\u093F\u0915\u094D\u0937\u0915 Teacher Lesson Planner \u092E\u0927\u0942\u0928 \u0935\u093E\u0930\u094D\u0937\u093F\u0915, \u092E\u093E\u0938\u093F\u0915 \u0935 \u0926\u0948\u0928\u0902\u0926\u093F\u0928 \u092A\u093E\u0920 \u0928\u093F\u092F\u094B\u091C\u0928\u093E\u091A\u0940 A4 PDF \u0921\u093E\u0909\u0928\u0932\u094B\u0921/\u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0942 \u0936\u0915\u0924\u093E\u0924.\n\u2022 \u0935\u093F\u0926\u094D\u092F\u093E\u0930\u094D\u0925\u0940 \u092E\u093F\u0933\u0935\u0932\u0947\u0932\u0940 \u091A\u0945\u092E\u094D\u092A\u093F\u092F\u0928 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930\u0947 Certificates & Leaderboard \u092E\u0927\u0942\u0928 \u092A\u093E\u0939\u0942/\u092A\u094D\u0930\u093F\u0902\u091F \u0915\u0930\u0942 \u0936\u0915\u0924\u093E\u0924."
    }
  },
  {
    id: "stories_and_shivaji",
    priority: 70,
    keywords: ["story", "stories", "moral", "shivaji", "maharaj", "audio story", "\u0917\u094B\u0937\u094D\u091F\u0940", "\u0915\u0939\u093E\u0928\u0940", "\u0915\u0939\u093E\u0928\u093F\u092F\u093E\u0901", "\u0936\u093F\u0935\u093E\u091C\u0940"],
    actionIds: (_c, _b, _r) => ["open_stories", "open_shivaji"],
    responses: {
      en: () => "MyStudyZone has two dedicated story sections:\n1. Story World: 45+ English, Hindi, and Marathi stories with natural voice audio narration, morals, and vocabulary.\n2. Chhatrapati Shivaji Maharaj Stories: 50 chronological Swarajya history chapters with voice narration.\n\nClick either button below to explore them.",
      hi: () => "MyStudyZone \u092E\u0947\u0902 \u0926\u094B \u0935\u093F\u0936\u0947\u0937 \u0915\u0939\u093E\u0928\u0940 \u0905\u0928\u0941\u092D\u093E\u0917 \u0939\u0948\u0902:\n1. Story World: \u0905\u0902\u0917\u094D\u0930\u0947\u091C\u0940, \u0939\u093F\u0902\u0926\u0940 \u0914\u0930 \u092E\u0930\u093E\u0920\u0940 \u092E\u0947\u0902 45+ \u0911\u0921\u093F\u092F\u094B \u0915\u0939\u093E\u0928\u093F\u092F\u093E\u0901 (\u0935\u0949\u0907\u0938 \u0928\u0930\u0947\u0936\u0928 \u0914\u0930 \u0928\u0948\u0924\u093F\u0915 \u0938\u0940\u0916 \u0938\u0939\u093F\u0924)\u0964\n2. \u091B\u0924\u094D\u0930\u092A\u0924\u093F \u0936\u093F\u0935\u093E\u091C\u0940 \u092E\u0939\u093E\u0930\u093E\u091C \u0915\u0940 \u0915\u0939\u093E\u0928\u093F\u092F\u093E\u0901: \u0938\u094D\u0935\u0930\u093E\u091C\u094D\u092F \u0907\u0924\u093F\u0939\u093E\u0938 \u0915\u0947 50 \u0915\u094D\u0930\u092E\u093E\u0928\u0941\u0938\u093E\u0930 \u0905\u0927\u094D\u092F\u093E\u092F\u0964\n\n\u0928\u0940\u091A\u0947 \u0926\u093F\u090F \u092C\u091F\u0928 \u0938\u0947 \u0938\u0940\u0927\u0947 \u0916\u094B\u0932\u0947\u0902\u0964",
      mr: () => "MyStudyZone \u0935\u0930 \u0926\u094B\u0928 \u0916\u093E\u0938 \u0917\u094B\u0937\u094D\u091F\u0940\u0902\u091A\u0947 \u0935\u093F\u092D\u093E\u0917 \u0906\u0939\u0947\u0924:\n1. Story World: \u092E\u0930\u093E\u0920\u0940, \u0939\u093F\u0902\u0926\u0940 \u0935 \u0907\u0902\u0917\u094D\u0930\u091C\u0940 \u092D\u093E\u0937\u0947\u0924\u0940\u0932 \u096A\u096B+ \u0911\u0921\u093F\u0913 \u0917\u094B\u0937\u094D\u091F\u0940 (\u0906\u0935\u093E\u091C\u093E\u0924 \u0915\u0925\u0928 \u0935 \u0924\u093E\u0924\u094D\u092A\u0930\u094D\u092F\u093E\u0938\u0939).\n2. \u091B\u0924\u094D\u0930\u092A\u0924\u0940 \u0936\u093F\u0935\u093E\u091C\u0940 \u092E\u0939\u093E\u0930\u093E\u091C \u0917\u094B\u0937\u094D\u091F\u0940: \u0938\u094D\u0935\u0930\u093E\u091C\u094D\u092F\u093E\u091A\u094D\u092F\u093E \u0907\u0924\u093F\u0939\u093E\u0938\u093E\u0924\u0940\u0932 \u096B\u0966 \u0915\u094D\u0930\u092E\u093E\u0928\u0941\u0938\u093E\u0930 \u0905\u0927\u094D\u092F\u093E\u092F.\n\n\u0916\u093E\u0932\u0940\u0932 \u092C\u091F\u0923\u093E\u0902\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0942\u0928 \u0909\u0918\u0921\u093E."
    }
  },
  {
    id: "drawing_studio",
    priority: 68,
    keywords: ["drawing", "paint", "colouring", "coloring", "art", "\u091A\u093F\u0924\u094D\u0930\u0915\u0932\u093E", "\u0921\u094D\u0930\u0949\u0907\u0902\u0917"],
    actionIds: () => ["open_drawing"],
    responses: {
      en: () => "Our Drawing Studio includes 120+ interactive colouring templates, freehand drawing brushes, flood-fill paint bucket, shapes, and a saved artwork gallery inside the browser.",
      hi: () => "Drawing Studio \u092E\u0947\u0902 120+ \u0915\u0932\u0930\u093F\u0902\u0917 \u091F\u0947\u092E\u094D\u092A\u0932\u0947\u091F, \u092B\u094D\u0930\u0940\u0939\u0948\u0902\u0921 \u092C\u094D\u0930\u0936, \u092A\u0947\u0902\u091F \u092C\u0915\u0947\u091F \u091F\u0942\u0932, \u0936\u0947\u092A\u094D\u0938 \u0914\u0930 \u0906\u092A\u0915\u0940 \u092C\u0928\u093E\u0908 \u0917\u0908 \u0921\u094D\u0930\u093E\u0907\u0902\u0917 \u0938\u0947\u0935 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0917\u0948\u0932\u0930\u0940 \u0909\u092A\u0932\u092C\u094D\u0927 \u0939\u0948\u0964",
      mr: () => "Drawing Studio \u092E\u0927\u094D\u092F\u0947 \u0967\u0968\u0966+ \u0915\u0932\u0930\u093F\u0902\u0917 \u091F\u0947\u092E\u094D\u092A\u094D\u0932\u0947\u091F\u094D\u0938, \u092B\u094D\u0930\u0940\u0939\u0901\u0921 \u092C\u094D\u0930\u0936, \u092A\u0947\u0902\u091F \u092C\u0915\u0947\u091F, \u0906\u0915\u093E\u0930 \u0906\u0923\u093F \u0924\u0941\u092E\u091A\u0940 \u091A\u093F\u0924\u094D\u0930\u0947 \u0938\u0947\u0935 \u0915\u0930\u0923\u094D\u092F\u093E\u0938\u093E\u0920\u0940 \u0906\u0930\u094D\u091F \u0917\u0945\u0932\u0930\u0940 \u0909\u092A\u0932\u092C\u094D\u0927 \u0906\u0939\u0947."
    }
  },
  {
    id: "quizzes_and_puzzles",
    priority: 65,
    keywords: ["quiz", "quizzes", "mcq", "exam", "exams", "online exam", "examination", "puzzle", "puzzles", "sudoku", "cricket", "gk", "ai academy", "future skills", "\u0915\u094D\u0935\u093F\u091C\u093C", "\u092A\u0930\u0940\u0915\u094D\u0937\u093E", "\u0915\u094B\u0921\u0947", "\u0938\u0941\u0921\u094B\u0915\u0942"],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_tet_ctet", "open_question_paper_generator", "open_quizzes"] : ["open_quizzes", "open_scholarship", "open_puzzles", "open_sudoku"],
    responses: {
      en: (_c, _b, role) => role === "teacher" ? "MyStudyZone Examination & Assessment Tools for Teachers:\n\u2022 MAHA TET & CTET (Paper 1 & 2): 200+ full-length 150-minute CBT mock tests with detailed solutions.\n\u2022 AI Question Paper & MCQ Generator: Create custom 20\u2013100 mark exam papers or interactive MCQ quizzes for your classes.\n\u2022 Student 4-Level Quizzes & 4th/7th Scholarship Preview: Inspect practice sets across Maharashtra, CBSE & ICSE." : "Understanding MyStudyZone Examination & Quiz Features:\n\u2022 4-Level Subject Practice Quizzes: Level 1 (Beginner) to Level 4 (Master) with zero-repeated-question tracking and instant explanations.\n\u2022 Competitive Mock Exams: 4th & 7th Standard MSCE Scholarship CBT Mocks (90-min timer).\n\u2022 Milestone Champion Certificates: Earn printable Gold/Silver/Bronze certificates and leaderboard rank points as you pass quizzes.\n\u2022 Free Brain Training: Brain Puzzles, 4\xD74/6\xD76/9\xD79 Sudoku, Cricket & GK Arena, and AI Learning Academy.",
      hi: () => "MyStudyZone \u0915\u0940 \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u0930\u0940\u0915\u094D\u0937\u093E (Examination) \u0914\u0930 \u0915\u094D\u0935\u093F\u091C\u093C \u0938\u0941\u0935\u093F\u0927\u093E\u090F\u0901:\n\u2022 4-\u0932\u0947\u0935\u0932 \u0935\u093F\u0937\u092F\u0935\u093E\u0930 \u092A\u094D\u0930\u0948\u0915\u094D\u091F\u093F\u0938 \u0915\u094D\u0935\u093F\u091C\u093C: \u092C\u093F\u0928\u093E \u0926\u094B\u0939\u0930\u093E\u090F \u0917\u090F \u092A\u094D\u0930\u0936\u094D\u0928\u094B\u0902 \u0914\u0930 \u0924\u0924\u094D\u0915\u093E\u0932 \u0938\u092E\u093E\u0927\u093E\u0928 \u0915\u0947 \u0938\u093E\u0925\u0964\n\u2022 \u092A\u094D\u0930\u0924\u093F\u092F\u094B\u0917\u0940 \u092E\u0949\u0915 \u092A\u0930\u0940\u0915\u094D\u0937\u093E\u090F\u0901: \u0915\u0915\u094D\u0937\u093E 4\u0925\u0940 \u0935 7\u0935\u0940\u0902 \u0938\u094D\u0915\u0949\u0932\u0930\u0936\u093F\u092A (90-\u092E\u093F\u0928\u091F \u091F\u093E\u0907\u092E\u0930) \u0914\u0930 MAHA TET / CTET \u092A\u0947\u092A\u0930 1 \u0935 2 (150-\u092E\u093F\u0928\u091F \u091F\u093E\u0907\u092E\u0930)\u0964\n\u2022 \u091A\u0948\u0902\u092A\u093F\u092F\u0928 \u0938\u0930\u094D\u091F\u093F\u092B\u093F\u0915\u0947\u091F \u0914\u0930 \u0932\u0940\u0921\u0930\u092C\u094B\u0930\u094D\u0921: \u0915\u094D\u0935\u093F\u091C\u093C \u092A\u093E\u0938 \u0915\u0930\u0928\u0947 \u092A\u0930 \u0938\u0930\u094D\u091F\u093F\u092B\u093F\u0915\u0947\u091F \u0914\u0930 \u0930\u0948\u0902\u0915 \u092A\u0949\u0907\u0902\u091F\u094D\u0938 \u092E\u093F\u0932\u0924\u0947 \u0939\u0948\u0902\u0964\n\u2022 \u092C\u094D\u0930\u0947\u0928 \u092A\u091C\u093C\u0932\u094D\u0938, \u0938\u0941\u0921\u094B\u0915\u0942, \u0915\u094D\u0930\u093F\u0915\u0947\u091F GK \u0914\u0930 AI Learning Academy\u0964",
      mr: () => "MyStudyZone \u0935\u0930\u0940\u0932 \u0911\u0928\u0932\u093E\u0907\u0928 \u092A\u0930\u0940\u0915\u094D\u0937\u093E (Examination) \u0906\u0923\u093F \u0915\u094D\u0935\u093F\u091D \u0938\u0941\u0935\u093F\u0927\u093E:\n\u2022 \u096A-\u0932\u0947\u0935\u094D\u0939\u0932 \u0935\u093F\u0937\u092F\u0928\u093F\u0939\u093E\u092F \u0938\u0930\u093E\u0935 \u0915\u094D\u0935\u093F\u091D: \u092A\u094D\u0930\u0936\u094D\u0928 \u092A\u0941\u0928\u094D\u0939\u093E \u0928 \u092F\u0947\u0923\u093E\u0930\u0940 \u092A\u094D\u0930\u0923\u093E\u0932\u0940 \u0906\u0923\u093F \u0932\u0917\u0947\u091A \u0938\u094D\u092A\u0937\u094D\u091F\u0940\u0915\u0930\u0923.\n\u2022 \u0938\u094D\u092A\u0930\u094D\u0927\u093E \u092A\u0930\u0940\u0915\u094D\u0937\u093E \u092E\u0949\u0915 \u091F\u0947\u0938\u094D\u091F: \u0907\u092F\u0924\u094D\u0924\u093E \u096A \u0925\u0940 \u0935 \u096D \u0935\u0940 \u0936\u093F\u0937\u094D\u092F\u0935\u0943\u0924\u094D\u0924\u0940 (\u096F\u0966-\u092E\u093F\u0928\u093F\u091F\u0947 \u091F\u093E\u0907\u092E\u0930) \u0906\u0923\u093F MAHA TET / CTET \u092A\u0947\u092A\u0930 \u0967 \u0935 \u0968 (\u0967\u096B\u0966-\u092E\u093F\u0928\u093F\u091F\u0947 \u091F\u093E\u0907\u092E\u0930).\n\u2022 \u091A\u0945\u092E\u094D\u092A\u093F\u092F\u0928 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930\u0947 \u0935 \u0932\u0940\u0921\u0930\u092C\u094B\u0930\u094D\u0921: \u0938\u0930\u093E\u0935 \u092A\u0942\u0930\u094D\u0923 \u0915\u0947\u0932\u094D\u092F\u093E\u0935\u0930 \u092A\u094D\u0930\u092E\u093E\u0923\u092A\u0924\u094D\u0930 \u0935 \u0917\u0941\u0923 \u092E\u093F\u0933\u0924\u093E\u0924.\n\u2022 \u092C\u094D\u0930\u0947\u0928 \u092A\u091D\u0932\u094D\u0938, \u0938\u0941\u0921\u094B\u0915\u0942, \u0915\u094D\u0930\u093F\u0915\u0947\u091F GK \u0906\u0923\u093F AI Learning Academy."
    }
  },
  {
    id: "registration_and_login",
    priority: 62,
    keywords: ["register", "registration", "sign up", "signup", "create account", "how to register", "login", "log in", "logout", "sign in", "\u0928\u094B\u0902\u0926\u0923\u0940", "\u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928", "\u0932\u0949\u0917\u093F\u0928", "\u0932\u0949\u0917\u0906\u0909\u091F"],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_teacher_login", "open_register", "open_password_reset"] : ["open_register", "open_login", "open_password_reset"],
    responses: {
      en: (_c, _b, role) => {
        if (role === "teacher") {
          return "How to Register & Login to the Teacher Portal Step by Step:\n1. Click OPEN TEACHER REGISTRATION (or click Teacher Portal \u2192 Register as Teacher).\n2. Enter your Full Name, Qualification (B.Ed./D.Ed./M.Sc.), Subjects Taught, Board (Maharashtra/CBSE/ICSE), Experience, School Name, Email, Mobile & Password.\n3. After registering, click OPEN TEACHER LOGIN to open your Teacher Command Center (Lesson Planner, 40 AI Tools, Worksheets, TET/CTET Mocks).";
        }
        if (role === "parent") {
          return "How to Register & Login to the Parent Portal Step by Step:\n1. Click OPEN PARENT REGISTRATION (or click Parent Portal \u2192 Register as Parent).\n2. Enter your Parent Name, your Child\u2019s Registered Student Email & Mobile (for account linking), your Email, and Password.\n3. Sign in anytime using OPEN PARENT LOGIN to monitor student progress, quiz reports, and attendance.";
        }
        if (role === "college") {
          return "How to Register & Login to the College Portal Step by Step:\n1. Click OPEN COLLEGE REGISTRATION (or click College Portal \u2192 Register as College/School).\n2. Fill in your Institution Name, UDISE / Registration Code, Principal/Admin Name, City, Official Email, Phone & Password.\n3. Sign in via OPEN COLLEGE LOGIN to manage divisions, faculty allocation, student roster, and result analytics.";
        }
        if (role === "institute") {
          return "How to Register & Login to the Institute Portal Step by Step:\n1. Click OPEN INSTITUTE REGISTRATION (or click Institute Portal \u2192 Register as Institute).\n2. Fill in your Institute Name, Registration Code, Director Name, Focus Stream, Official Email, Phone & Password.\n3. Sign in via OPEN INSTITUTE LOGIN to manage coaching batches, mock test series, 18 skill programs, and fee ledger.";
        }
        if (role === "student") {
          return "How to Register & Login as a Student Step by Step:\n1. Click OPEN STUDENT REGISTRATION below (or click Register at top-right \u2192 Student).\n2. Enter your Full Name, Education Board (Maharashtra / CBSE / ICSE), Standard/Class (1\u201310), Medium, School Name, Email, Mobile & Password.\n3. Sign in anytime via OPEN STUDENT LOGIN to access Study Notes, Worksheets, Quizzes, Scholarship & Trilingual Dictionary.";
        }
        return 'How to Register & Login on MyStudyZone Step by Step:\n1. Click the "Register" button at the top-right of the homepage (or click OPEN REGISTRATION below), OR click any of the 5 portal cards (Student, Teacher, Parent, College, or Institute).\n2. Each portal has its own dedicated registration form:\n   \u2022 Student: Name, Board (Maharashtra/CBSE/ICSE), Class (1\u201310), Medium, School Name, Email, Mobile & Password.\n   \u2022 Teacher: Name, Qualification, Subjects Taught, Board, Experience, School Name, Email, Mobile & Password.\n   \u2022 Parent: Parent Name, Child\u2019s Student Email & Mobile (for linking), Email & Password.\n   \u2022 College: College/School Name, UDISE/Registration Code, Principal/Admin Name, City, Official Email, Phone & Password.\n   \u2022 Institute: Institute Name, Registration Code, Director Name, Focus Stream, Official Email, Phone & Password.\n3. After registering, sign in anytime using Login and your role will open your dedicated portal dashboard automatically.';
      },
      hi: (_c, _b, role) => {
        if (role === "teacher") {
          return "\u091F\u0940\u091A\u0930 \u092A\u094B\u0930\u094D\u091F\u0932 \u092E\u0947\u0902 \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0914\u0930 \u0932\u0949\u0917\u093F\u0928 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902:\n1. \u0928\u0940\u091A\u0947 OPEN TEACHER REGISTRATION \u0926\u092C\u093E\u090F\u0901\u0964\n2. \u0905\u092A\u0928\u093E \u0928\u093E\u092E, \u092F\u094B\u0917\u094D\u092F\u0924\u093E, \u092A\u0922\u093C\u093E\u090F \u091C\u093E\u0928\u0947 \u0935\u093E\u0932\u0947 \u0935\u093F\u0937\u092F, \u092C\u094B\u0930\u094D\u0921, \u0938\u094D\u0915\u0942\u0932, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0914\u0930 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0930\u0947\u0902\u0964\n3. \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0915\u0947 \u092C\u093E\u0926 OPEN TEACHER LOGIN \u0938\u0947 \u0938\u0940\u0927\u0947 Teacher Command Center \u0916\u094B\u0932\u0947\u0902\u0964";
        }
        return 'MyStudyZone \u092A\u0930 \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0914\u0930 \u0932\u0949\u0917\u093F\u0928 \u0915\u0948\u0938\u0947 \u0915\u0930\u0947\u0902 \u2014 \u091A\u0930\u0923-\u0926\u0930-\u091A\u0930\u0923:\n1. \u0939\u094B\u092E\u092A\u0947\u091C \u0915\u0947 \u090A\u092A\u0930 \u0926\u093E\u0908\u0902 \u0913\u0930 "Register" \u092C\u091F\u0928 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0947\u0902 (\u092F\u093E \u0928\u0940\u091A\u0947 OPEN REGISTRATION \u0926\u092C\u093E\u090F\u0901), \u092F\u093E \u0915\u093F\u0938\u0940 \u092D\u0940 \u092A\u094B\u0930\u094D\u091F\u0932 \u0915\u093E\u0930\u094D\u0921 (Student, Teacher, Parent, College, Institute) \u0915\u094B \u091A\u0941\u0928\u0947\u0902\u0964\n2. \u092A\u094D\u0930\u0924\u094D\u092F\u0947\u0915 \u092A\u094B\u0930\u094D\u091F\u0932 \u0915\u093E \u0905\u092A\u0928\u093E \u0905\u0932\u0917 \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u092B\u0949\u0930\u094D\u092E \u0939\u0948 \u2014 \u0905\u092A\u0928\u093E \u0928\u093E\u092E, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0935 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0930\u0915\u0930 \u0905\u0915\u093E\u0909\u0902\u091F \u092C\u0928\u093E\u090F\u0901\u0964\n3. \u0930\u091C\u093F\u0938\u094D\u091F\u094D\u0930\u0947\u0936\u0928 \u0915\u0947 \u092C\u093E\u0926 Login \u0938\u0947 \u0915\u092D\u0940 \u092D\u0940 \u0905\u092A\u0928\u0947 \u092A\u094B\u0930\u094D\u091F\u0932 \u0921\u0948\u0936\u092C\u094B\u0930\u094D\u0921 \u092E\u0947\u0902 \u092A\u094D\u0930\u0935\u0947\u0936 \u0915\u0930\u0947\u0902\u0964';
      },
      mr: (_c, _b, role) => {
        if (role === "teacher") {
          return "\u0936\u093F\u0915\u094D\u0937\u0915 \u092A\u094B\u0930\u094D\u091F\u0932\u0935\u0930 \u0928\u094B\u0902\u0926\u0923\u0940 \u0906\u0923\u093F \u0932\u0949\u0917\u093F\u0928 \u0915\u0938\u0947 \u0915\u0930\u093E\u0935\u0947:\n1. \u0916\u093E\u0932\u0940\u0932 OPEN TEACHER REGISTRATION \u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.\n2. \u0924\u0941\u092E\u091A\u0947 \u0928\u093E\u0935, \u092A\u093E\u0924\u094D\u0930\u0924\u093E, \u0936\u093F\u0915\u0935\u0932\u0947 \u091C\u093E\u0923\u093E\u0930\u0947 \u0935\u093F\u0937\u092F, \u092C\u094B\u0930\u094D\u0921, \u0936\u093E\u0933\u093E, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0935 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0930\u093E.\n3. \u0928\u094B\u0902\u0926\u0923\u0940\u0928\u0902\u0924\u0930 OPEN TEACHER LOGIN \u0935\u093E\u092A\u0930\u0942\u0928 \u0925\u0947\u091F Teacher Command Center \u0909\u0918\u0921\u093E.";
        }
        return 'MyStudyZone \u0935\u0930 \u0928\u094B\u0902\u0926\u0923\u0940 (Registration) \u0906\u0923\u093F \u0932\u0949\u0917\u093F\u0928 \u0915\u0938\u0947 \u0915\u0930\u093E\u0935\u0947 \u2014 \u092A\u093E\u092F\u0930\u0940-\u092A\u093E\u092F\u0930\u0940\u0928\u0947:\n1. \u092E\u0941\u0916\u094D\u092F\u092A\u0943\u0937\u094D\u0920\u093E\u0935\u0930 \u0909\u091C\u0935\u0940\u0915\u0921\u0947 "Register" \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E (\u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 OPEN REGISTRATION \u0926\u093E\u092C\u093E), \u0915\u093F\u0902\u0935\u093E \u096B \u092A\u0948\u0915\u0940 \u0915\u094B\u0923\u0924\u094D\u092F\u093E\u0939\u0940 \u092A\u094B\u0930\u094D\u091F\u0932 \u0915\u093E\u0930\u094D\u0921\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E.\n2. \u0924\u0941\u092E\u091A\u094D\u092F\u093E \u092A\u094B\u0930\u094D\u091F\u0932\u0928\u0941\u0938\u093E\u0930 \u0928\u093E\u0935, \u0908\u092E\u0947\u0932, \u092E\u094B\u092C\u093E\u0907\u0932 \u0935 \u092A\u093E\u0938\u0935\u0930\u094D\u0921 \u092D\u0930\u0942\u0928 \u0916\u093E\u0924\u0947 \u0924\u092F\u093E\u0930 \u0915\u0930\u093E.\n3. \u0928\u094B\u0902\u0926\u0923\u0940\u0928\u0902\u0924\u0930 Login \u0935\u093E\u092A\u0930\u0942\u0928 \u0915\u0927\u0940\u0939\u0940 \u0924\u0941\u092E\u091A\u094D\u092F\u093E \u092A\u094B\u0930\u094D\u091F\u0932 \u0921\u0945\u0936\u092C\u094B\u0930\u094D\u0921\u0935\u0930 \u092A\u094D\u0930\u0935\u0947\u0936 \u0915\u0930\u093E.';
      }
    }
  },
  {
    id: "boards_and_plans",
    priority: 60,
    keywords: ["maharashtra", "cbse", "icse", "subscription plan", "plan details", "free plan", "premium plan", "price", "pricing", "99", "fee", "subscription", "payment", "\u092A\u094D\u0932\u093E\u0928", "\u092B\u0940\u0938", "\u092C\u094B\u0930\u094D\u0921"],
    actionIds: (_c, _b, role) => role === "teacher" ? ["open_tet_ctet", "open_plans"] : ["open_all_courses", "open_plans"],
    responses: {
      en: (_c, _b, role) => role === "teacher" ? "Teacher Subscription Plans & Pricing on MyStudyZone:\n\u2022 TEACHER PLANS \u2013 MAHA TET & CTET (Paper 1 & 2):\n  \u2013 TET Only (Paper 1 & 2): 6 Months \u20B9199 | 1 Year \u20B9299\n  \u2013 CTET Only (Paper 1 & 2): 6 Months \u20B9199 | 1 Year \u20B9299\n  \u2013 Combo Offer (TET + CTET Paper 1 & 2): 6 Months \u20B9349 | 1 Year \u20B9499\n\u2022 SCHOOL CLASS ACCESS (Classes 1\u201310 across Maharashtra, CBSE & ICSE): Free \u20B90 Demo Plan or \u20B999 / 365 Days per Board & Class." : "MyStudyZone Subscription & Payment Guide (Classes 1 to 10 across Maharashtra, CBSE & ICSE Boards):\n\u2022 FREE PLAN (\u20B90 Lifetime): Includes 2 Demo Worksheets (English & Math), English & Math Quizzes, Brain Puzzles, Sudoku, Trilingual Dictionary, Thought of the Day, and Chapter 1 sample notes.\n\u2022 SCHOOL PREMIUM PLAN (\u20B999 / 365 Days): Full 1-year unlock of all subjects, chapter study notes, interactive worksheets, 4-level quizzes, stories, drawing studio, cricket GK & AI learning academy for your selected Board & Class.\n\u2022 SCHOLARSHIP COMBO (Std 4th & 7th): \u20B999 / 365 Days.",
      hi: () => "MyStudyZone \u0938\u092C\u094D\u0938\u0915\u094D\u0930\u093F\u092A\u094D\u0936\u0928 \u0914\u0930 \u092A\u0947\u092E\u0947\u0902\u091F \u091C\u093E\u0928\u0915\u093E\u0930\u0940 (\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u092C\u094B\u0930\u094D\u0921, CBSE \u0914\u0930 ICSE \u2014 \u0915\u0915\u094D\u0937\u093E 1 \u0938\u0947 10):\n\u2022 FREE PLAN (\u20B90 \u0932\u093E\u0907\u092B\u091F\u093E\u0907\u092E): 2 \u0921\u0947\u092E\u094B \u0935\u0930\u094D\u0915\u0936\u0940\u091F, English/Maths \u0915\u094D\u0935\u093F\u091C\u093C, \u092A\u091C\u093C\u0932\u094D\u0938, \u0938\u0941\u0921\u094B\u0915\u0942, \u0936\u092C\u094D\u0926\u0915\u094B\u0936, \u0938\u0941\u0935\u093F\u091A\u093E\u0930 \u0914\u0930 \u0938\u0948\u0902\u092A\u0932 \u0928\u094B\u091F\u094D\u0938\u0964\n\u2022 SCHOOL PREMIUM PLAN (\u20B999 / 365 \u0926\u093F\u0928): \u091A\u0941\u0928\u0947 \u0939\u0941\u090F \u092C\u094B\u0930\u094D\u0921 \u0935 \u0915\u0915\u094D\u0937\u093E \u0915\u0947 \u0938\u092D\u0940 \u0935\u093F\u0937\u092F, \u0935\u0930\u094D\u0915\u0936\u0940\u091F, \u0928\u094B\u091F\u094D\u0938, \u0915\u0939\u093E\u0928\u093F\u092F\u093E\u0901, \u0921\u094D\u0930\u093E\u0907\u0902\u0917, \u0915\u094D\u0930\u093F\u0915\u0947\u091F GK \u0914\u0930 AI \u0905\u0915\u093E\u0926\u092E\u0940 \u092A\u0942\u0930\u0947 1 \u0935\u0930\u094D\u0937 \u0915\u0947 \u0932\u093F\u090F \u0905\u0928\u0932\u0949\u0915\u0964\n\u2022 TEACHER PLANS \u2013 TET & CTET (Paper 1 & 2):\n  \u2013 TET \u092F\u093E CTET: 6 \u092E\u093E\u0939 \u20B9199 | 1 \u0935\u0930\u094D\u0937 \u20B9299\n  \u2013 Combo Offer (TET + CTET): 6 \u092E\u093E\u0939 \u20B9349 | 1 \u0935\u0930\u094D\u0937 \u20B9499\u0964",
      mr: () => "MyStudyZone \u0938\u092C\u0938\u094D\u0915\u094D\u0930\u093F\u092A\u094D\u0936\u0928 \u0935 \u092A\u0947\u092E\u0947\u0902\u091F \u092E\u093E\u0939\u093F\u0924\u0940 (\u092E\u0939\u093E\u0930\u093E\u0937\u094D\u091F\u094D\u0930 \u092C\u094B\u0930\u094D\u0921, CBSE \u0906\u0923\u093F ICSE \u2014 \u0907\u092F\u0924\u094D\u0924\u093E \u0967 \u0924\u0947 \u0967\u0966):\n\u2022 FREE PLAN (\u20B9\u0966 \u0906\u091C\u0940\u0935\u0928): \u0968 \u0921\u0947\u092E\u094B \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938, English/Maths \u0915\u094D\u0935\u093F\u091D, \u092A\u091D\u0932\u094D\u0938, \u0938\u0941\u0921\u094B\u0915\u0942, \u0936\u092C\u094D\u0926\u0915\u094B\u0936, \u0938\u0941\u0935\u093F\u091A\u093E\u0930 \u0935 \u0928\u092E\u0941\u0928\u093E \u0928\u094B\u091F\u094D\u0938.\n\u2022 SCHOOL PREMIUM PLAN (\u20B9\u096F\u096F / \u0969\u096C\u096B \u0926\u093F\u0935\u0938): \u0928\u093F\u0935\u0921\u0932\u0947\u0932\u094D\u092F\u093E \u092C\u094B\u0930\u094D\u0921 \u0935 \u0907\u092F\u0924\u094D\u0924\u0947\u0938\u093E\u0920\u0940 \u0938\u0930\u094D\u0935 \u0935\u093F\u0937\u092F, \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938, \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938, \u0917\u094B\u0937\u094D\u091F\u0940, \u0921\u094D\u0930\u0949\u0907\u0902\u0917, \u0915\u094D\u0930\u093F\u0915\u0947\u091F GK \u0935 AI \u0905\u0915\u093E\u0926\u092E\u0940 \u0967 \u0935\u0930\u094D\u0937\u093E\u0938\u093E\u0920\u0940 \u092A\u0942\u0930\u094D\u0923\u092A\u0923\u0947 \u0916\u0941\u0932\u0947 \u0939\u094B\u0924\u093E\u0924.\n\u2022 TEACHER PLANS \u2013 TET & CTET (Paper 1 & 2):\n  \u2013 TET \u0915\u093F\u0902\u0935\u093E CTET: \u096C \u092E\u0939\u093F\u0928\u0947 \u20B9\u0967\u096F\u096F | \u0967 \u0935\u0930\u094D\u0937 \u20B9\u0968\u096F\u096F\n  \u2013 Combo Offer (TET + CTET): \u096C \u092E\u0939\u093F\u0928\u0947 \u20B9\u0969\u096A\u096F | \u0967 \u0935\u0930\u094D\u0937 \u20B9\u096A\u096F\u096F."
    }
  }
];
function matchKnowledgeBaseFastPath(userMessage, options) {
  const raw = String(userMessage || "").trim();
  const language = detectQueryLanguage(raw);
  const detectedClass = extractClassLevel(raw);
  const detectedBoard = extractBoard(raw);
  const tokens = tokenizeNormalized(raw);
  const rawLower = raw.toLowerCase();
  const isComplexMultiQuestion = raw.length > 160 || raw.split("?").length > 2 || /\b(difference|compare|why|suggest|recommend|error|stuck)\b/i.test(rawLower);
  let bestTopic = null;
  let bestScore = 0;
  for (const topic of KB_TOPICS) {
    let hits = 0;
    for (const kw of topic.keywords) {
      if (hasFuzzyKeyword(tokens, rawLower, [kw])) {
        hits += 1;
      }
    }
    if (hits > 0) {
      const score = topic.priority + hits * 5;
      if (score > bestScore) {
        bestScore = score;
        bestTopic = topic;
      }
    }
  }
  if (bestTopic && (options?.includeComplexMatch || bestTopic.id === "unresolved_account_problem" || bestTopic.id === "password_reset" || bestTopic.id === "question_paper_generator" || !isComplexMultiQuestion)) {
    const actionIds = bestTopic.actionIds(detectedClass, detectedBoard, options?.userRole);
    const navigationActions = actionIds.map(
      (id) => buildNavigationAction(id, detectedClass, detectedBoard, options?.userRole)
    );
    return {
      matched: true,
      reply: bestTopic.responses[language](detectedClass, detectedBoard, options?.userRole),
      language,
      navigationActions,
      suggestSupportTicket: Boolean(bestTopic.suggestSupportTicket),
      topicId: bestTopic.id
    };
  }
  return {
    matched: false,
    reply: "",
    language,
    navigationActions: [],
    suggestSupportTicket: false
  };
}
var HELP_DESK_SYSTEM_PROMPT = `
You are the official AI Help & Support Assistant for MyStudyZone (mystudyzone.in), a comprehensive Indian educational platform with FIVE dedicated portals:
1. Student Portal (Classes 1 to 10 across Maharashtra State Board, CBSE, and ICSE)
2. Teacher Portal (Lesson Planner, Question Paper & Worksheet Generators, Student Management, TET & CTET Prep)
3. Parent Portal (Child Account Linking, Student Progress Tracking, Exam Reports & Attendance)
4. College Portal (Classes/Streams/Divisions, Faculty Allocation, Student Directory, Institutional Calendar, Result Analytics & Circulars)
5. Institute Portal (Coaching Batches, Mock Test Series, 18 Skill Academy Programs like Abacus/Vedic Maths/Phonics, Trainer Roster, Fee Ledger & Certificates)

STRICT RESPONSE RULES \u2014 NEVER VIOLATE:
1. SIMPLE, FRIENDLY, PORTAL-SPECIFIC & STEP-BY-STEP:
   - Strictly respect "Current User Portal Context":
     \u2022 If Current User Portal Context is "teacher", give Teacher-specific answers and Teacher navigation buttons ONLY \u2014 never show Student-only topics unless the user explicitly asks about Students.
     \u2022 Apply the exact same strict portal isolation for "student", "parent", "college", and "institute".
   - Provide numbered step-by-step instructions whenever explaining how to register, login, generate a question paper, find study notes, access worksheets, use the Lesson Planner, link a child account, or use portal features.
2. ACCURACY ONLY \u2014 NEVER INVENT FEATURES:
   - Only describe features, boards, classes, plans, and sections that actually exist on MyStudyZone:
     \u2022 Student Support: Separate Student Registration & Login; Study Materials (Select Board -> Medium -> Standard Class 1\u201310 -> Subject -> Chapter -> View Notes); Online Interactive Worksheets; 4-Level Practice Quizzes; 4th & 7th MSCE Scholarship; Story World (45+ audio stories); Chhatrapati Shivaji Maharaj 50 chapters; Drawing Studio; Brain Puzzles & Sudoku; Trilingual Dictionary (English-Marathi-Hindi); Thought of the Day (1,000+ trilingual thoughts); Free \u20B90 Plan vs \u20B999 / 365 Days Class Plan.
     \u2022 Teacher Support: Separate Teacher Registration & Login; Teacher Lesson Planner (Annual, Monthly, and Daily Lesson Plans with School Calendar Drawer and A4 PDF export); AI Tools Studio -> AI Question Paper Generator (or 40 Teacher AI Tools -> #15 Question Paper Generator), Worksheet & Assignment Generators; Student Management & Performance tracking; MAHA TET & CTET (Paper 1 & 2) mock tests.
     \u2022 Parent Support: Separate Parent Registration & Login; connecting/linking with student accounts using the child's registered Student Email & Mobile; viewing subject-wise student progress, worksheet completion, quiz scorecards, and attendance reports.
     \u2022 College Support: Separate College/School Registration & Login (Institution Name, UDISE/Registration Code, Official Email); managing classes/streams/divisions, faculty subject allocation, student roster, institutional calendar, result analytics, and campus circulars.
     \u2022 Institute Support: Separate Coaching/Institute Registration & Login; managing coaching batches & timings, mock test series, 18 skill academy programs (Abacus, Vedic Maths, Phonics, Coding, etc.), trainer roster, fee ledger, and course completion certificates.
     \u2022 AI Question Paper Generator: Open "Learning Tools" / "AI Tools Studio" -> select "AI Question Paper Generator", pick Board, Class (1\u201310), Subject, Language, Chapter/Topic, Total Marks (20\u2013100), Duration & Difficulty, and click Generate to produce a formal paper with Marking Scheme & PDF/DOCX export.
     \u2022 Download Rule: Student Worksheets and Study Notes are interactive online resources (PDF downloading/printing of student worksheets is disabled). Teachers CAN export Lesson Plans and AI Question Papers/Worksheets as PDFs, and students CAN print earned Champion Certificates.
3. PRIVACY & SECURITY:
   - Never expose other users' information.
   - Never request passwords, OTPs, API keys, bank details, or UPI/card PINs.
   - Never provide unauthorized account or payment information or claim to have automatically modified an account.
4. MULTILINGUAL SUPPORT:
   - Reply in the user's language: English ('en'), Hindi ('hi'), or Marathi ('mr').
5. NAVIGATION ACTIONS:
   - Choose 0 to 3 helpful navigationActionIds from this exact allowlist:
     open_question_paper_generator, open_worksheets, open_syllabus, open_all_courses, open_quizzes, open_scholarship, open_tet_ctet, open_teacher_resources, open_lesson_planner, open_student_portal, open_parent_portal, open_college_portal, open_institute_portal, open_ai_tools, open_dictionary, open_thought_of_the_day, open_stories, open_shivaji, open_drawing, open_puzzles, open_sudoku, open_cricket, open_ai_academy, open_other_programs, open_demo, open_certificates, open_referrals, open_profile, open_plans, open_login, open_teacher_login, open_register, open_password_reset, open_dashboard.
6. ADMIN SUPPORT ESCALATION:
   - If the AI cannot resolve a personal account, login, payment, class change, or technical problem, or if the user asks to contact support, set suggestSupportTicket=true and instruct them to click "SUBMIT A SUPPORT REQUEST" below to generate an official support ticket for the administrator.
`.trim();

// src/types/support.ts
var SUPPORT_USER_CATEGORY_LABELS = {
  student: "Student",
  teacher: "Teacher",
  parent: "Parent",
  college: "College",
  institute: "Institute"
};
function normalizeSupportUserCategory(raw) {
  const val = String(raw || "").trim().toLowerCase();
  if (val === "teacher") return "teacher";
  if (val === "parent") return "parent";
  if (val === "college" || val === "school_admin" || val === "school") return "college";
  if (val === "institute" || val === "institute_admin" || val === "coaching") return "institute";
  return "student";
}

// server/supportAssistant.ts
var VALID_CLASSES = /* @__PURE__ */ new Set([
  "Class 1",
  "Class 2",
  "Class 3",
  "Class 4",
  "Class 5",
  "Class 6",
  "Class 7",
  "Class 8",
  "Class 9",
  "Class 10"
]);
var VALID_BOARDS2 = /* @__PURE__ */ new Set(["Maharashtra", "CBSE", "ICSE"]);
var VALID_SUPPORT_CATEGORIES = /* @__PURE__ */ new Set([
  "Registration & Login",
  "Password Reset",
  "Payment & Subscription",
  "Educational Material Access",
  "Notes & Study Material Downloads",
  "Technical Errors",
  "Incorrect Questions or Answers",
  "Website Navigation",
  "General Queries"
]);
var VALID_TICKET_STATUSES = /* @__PURE__ */ new Set([
  "OPEN",
  "IN_PROGRESS",
  "RESOLVED",
  "CLOSED"
]);
var MAX_MESSAGE_CHARS = 600;
var MAX_HISTORY_TURNS = 6;
var CHAT_WINDOW_MS = 10 * 60 * 1e3;
var MAX_REQUESTS_PER_IP = 45;
var MAX_AI_CALLS_PER_IP = 15;
var MAX_DAILY_AI_CALLS = 500;
var TICKET_WINDOW_MS = 15 * 60 * 1e3;
var MAX_TICKETS_PER_IP = 10;
var ipRequestTimestamps = /* @__PURE__ */ new Map();
var ipAiTimestamps = /* @__PURE__ */ new Map();
var ipTicketTimestamps = /* @__PURE__ */ new Map();
var dailyAiTracker = {
  dateKey: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
  count: 0,
  quotaCooldownUntilMs: 0,
  lastKeyErrorReason: "",
  lastUpstreamErrorAt: 0
};
var SUPPORT_STORE_DIR = path3.join(process.cwd(), "data");
var SUPPORT_STORE_FILE = path3.join(SUPPORT_STORE_DIR, "support_tickets_store.json");
var serverSupportTicketsMap = /* @__PURE__ */ new Map();
var supportTicketsLoadedFromDisk = false;
function ensureServerSupportTicketsLoaded() {
  if (supportTicketsLoadedFromDisk) return;
  supportTicketsLoadedFromDisk = true;
  try {
    if (fs3.existsSync(SUPPORT_STORE_FILE)) {
      const raw = fs3.readFileSync(SUPPORT_STORE_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (item && typeof item.id === "string" && typeof item.ticketNumber === "string") {
            serverSupportTicketsMap.set(item.id, item);
          }
        }
      }
    }
  } catch (err) {
    console.warn("[Support Store Load Warning]:", err);
  }
}
function flushServerSupportTicketsToDisk() {
  try {
    if (!fs3.existsSync(SUPPORT_STORE_DIR)) {
      fs3.mkdirSync(SUPPORT_STORE_DIR, { recursive: true });
    }
    const list = Array.from(serverSupportTicketsMap.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    fs3.writeFileSync(SUPPORT_STORE_FILE, JSON.stringify(list, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn("[Support Store Save Warning]:", err);
    return serverSupportTicketsMap.size > 0;
  }
}
function maskEmailForPublicLookup(rawEmail) {
  const email = String(rawEmail || "").trim();
  const atIdx = email.indexOf("@");
  if (atIdx <= 1) return email ? "***" : "";
  return `${email.slice(0, 2)}***${email.slice(atIdx)}`;
}
async function getServerSupportTickets(options) {
  ensureServerSupportTicketsLoaded();
  const mergedMap = /* @__PURE__ */ new Map();
  const pickFresher = (existing, incoming) => {
    if (!existing) return incoming;
    const tExisting = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
    const tIncoming = new Date(incoming.updatedAt || incoming.createdAt || 0).getTime();
    return tIncoming >= tExisting ? incoming : existing;
  };
  for (const t of serverSupportTicketsMap.values()) {
    mergedMap.set(t.id, t);
  }
  try {
    if (options?.ticketNumber) {
      const targetUpper = options.ticketNumber.trim().toUpperCase();
      const diskMatch = Array.from(mergedMap.values()).find(
        (t) => t.ticketNumber.toUpperCase() === targetUpper || t.id.toUpperCase() === targetUpper
      );
      if (isFirebaseAdminConfigured() || options.bearerToken) {
        const docMatch = await serverQueryEqualsLimit1(
          "support_tickets",
          "ticketNumber",
          targetUpper,
          options.bearerToken ? { bearerToken: options.bearerToken } : void 0
        ).catch(() => null);
        if (docMatch?.data) {
          const fsTicket = {
            ...docMatch.data,
            id: docMatch.data.id || docMatch.id
          };
          mergedMap.set(fsTicket.id, pickFresher(mergedMap.get(fsTicket.id), fsTicket));
        }
      }
      const list2 = Array.from(mergedMap.values()).filter(
        (t) => t.ticketNumber.toUpperCase() === targetUpper || t.id.toUpperCase() === targetUpper
      );
      const finalList = list2.length ? list2 : diskMatch ? [diskMatch] : [];
      if (options.includeContactDetails) return finalList;
      return finalList.map((t) => ({
        ...t,
        email: maskEmailForPublicLookup(t.email),
        mobile: ""
      }));
    }
    if (isFirebaseAdminConfigured() || options?.bearerToken) {
      const docs = await serverListCollection(
        "support_tickets",
        300,
        options?.bearerToken ? { bearerToken: options.bearerToken } : void 0
      ).catch(() => []);
      for (const item of docs) {
        if (item?.data && (item.data.ticketNumber || item.data.id)) {
          const fsTicket = {
            ...item.data,
            id: item.data.id || item.id
          };
          mergedMap.set(fsTicket.id, pickFresher(mergedMap.get(fsTicket.id), fsTicket));
        }
      }
    }
  } catch (err) {
    console.warn("[Support Ticket Firestore Read Warning]:", err);
  }
  const list = Array.from(mergedMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  if (options?.studentId) {
    return list.filter((t) => t.studentId === options.studentId);
  }
  return list;
}
async function updateServerSupportTicketStatus(ticketId, statusRaw, adminResponseRaw, bearerToken) {
  ensureServerSupportTicketsLoaded();
  const cleanId = String(ticketId || "").trim();
  if (!cleanId) {
    return {
      statusCode: 400,
      payload: { success: false, error: "Ticket ID is required." }
    };
  }
  const normalizedUpper = String(statusRaw || "").trim().toUpperCase();
  const mappedStatus = normalizedUpper === "NEW" || normalizedUpper === "OPEN" ? "OPEN" : normalizedUpper === "IN_PROGRESS" || normalizedUpper === "IN PROGRESS" || normalizedUpper === "PENDING" ? "IN_PROGRESS" : normalizedUpper === "RESOLVED" ? "RESOLVED" : normalizedUpper === "CLOSED" ? "CLOSED" : VALID_TICKET_STATUSES.has(statusRaw) ? statusRaw : "IN_PROGRESS";
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const cleanResponse = adminResponseRaw !== void 0 ? String(adminResponseRaw).trim().slice(0, 2e3) : void 0;
  let targetKey = cleanId;
  let existing = serverSupportTicketsMap.get(cleanId);
  if (!existing) {
    const cleanUpper = cleanId.toUpperCase();
    for (const [k, v] of serverSupportTicketsMap.entries()) {
      if (v.ticketNumber.toUpperCase() === cleanUpper || v.id.toUpperCase() === cleanUpper) {
        targetKey = k;
        existing = v;
        break;
      }
    }
  }
  let updatedTicket;
  if (existing) {
    updatedTicket = {
      ...existing,
      status: mappedStatus,
      ...cleanResponse !== void 0 ? { adminResponse: cleanResponse } : {},
      updatedAt: nowIso
    };
    serverSupportTicketsMap.set(targetKey, updatedTicket);
    flushServerSupportTicketsToDisk();
  }
  if (isFirebaseAdminConfigured() || bearerToken) {
    try {
      await serverUpdateDoc(
        "support_tickets",
        targetKey,
        {
          status: mappedStatus,
          ...cleanResponse !== void 0 ? { adminResponse: cleanResponse } : {},
          updatedAt: nowIso
        },
        bearerToken ? { bearerToken } : void 0
      );
    } catch (err) {
      console.warn("[Support Ticket Firestore Update Warning]:", err);
    }
  }
  if (!updatedTicket && !isFirebaseAdminConfigured() && !bearerToken) {
    return {
      statusCode: 404,
      payload: { success: false, error: "Support ticket not found." }
    };
  }
  return {
    statusCode: 200,
    payload: {
      success: true,
      ticketId: targetKey,
      status: mappedStatus,
      adminResponse: cleanResponse,
      updatedAt: nowIso,
      ticket: updatedTicket
    }
  };
}
function pruneAndCheckWindow(store, ip, windowMs, limit, record = true) {
  const now = Date.now();
  const list = (store.get(ip) || []).filter((ts) => now - ts < windowMs);
  if (list.length >= limit) {
    store.set(ip, list);
    return false;
  }
  if (record) {
    list.push(now);
    store.set(ip, list);
  }
  return true;
}
function getSupportAiStatus() {
  const apiKey = getConfiguredGeminiApiKey();
  const todayKey = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  if (dailyAiTracker.dateKey !== todayKey) {
    dailyAiTracker = {
      dateKey: todayKey,
      count: 0,
      quotaCooldownUntilMs: 0,
      lastKeyErrorReason: "",
      lastUpstreamErrorAt: 0
    };
  }
  if (!apiKey) {
    return {
      aiConnected: false,
      configured: false,
      mode: "knowledge_base",
      reason: "missing_key",
      model: GEMINI_PRIMARY_MODEL,
      fallbackModel: GEMINI_FALLBACK_MODEL,
      message: "Knowledge Base Mode (Server GEMINI_API_KEY not configured \u2014 free Knowledge Base & Support Tickets active)"
    };
  }
  if (dailyAiTracker.lastKeyErrorReason === "api_key_invalid") {
    return {
      aiConnected: false,
      configured: false,
      mode: "knowledge_base",
      reason: "api_key_invalid",
      model: GEMINI_PRIMARY_MODEL,
      fallbackModel: GEMINI_FALLBACK_MODEL,
      message: "Knowledge Base Mode (Configured GEMINI_API_KEY rejected \u2014 check Settings > Secrets)"
    };
  }
  if (dailyAiTracker.count >= MAX_DAILY_AI_CALLS || Date.now() < dailyAiTracker.quotaCooldownUntilMs) {
    return {
      aiConnected: false,
      configured: true,
      mode: "knowledge_base",
      reason: "quota_exceeded",
      model: GEMINI_PRIMARY_MODEL,
      fallbackModel: GEMINI_FALLBACK_MODEL,
      message: "Knowledge Base Mode (Free-tier AI quota temporarily cooling down \u2014 paid billing is never auto-enabled)"
    };
  }
  if (dailyAiTracker.lastUpstreamErrorAt && Date.now() - dailyAiTracker.lastUpstreamErrorAt < 60 * 1e3) {
    return {
      aiConnected: false,
      configured: true,
      mode: "knowledge_base",
      reason: "upstream_error",
      model: GEMINI_PRIMARY_MODEL,
      fallbackModel: GEMINI_FALLBACK_MODEL,
      message: "Knowledge Base Mode (Gemini service temporarily busy \u2014 Knowledge Base & Support Tickets active)"
    };
  }
  return {
    aiConnected: true,
    configured: true,
    mode: "live_ai",
    reason: "ok",
    model: GEMINI_PRIMARY_MODEL,
    fallbackModel: GEMINI_FALLBACK_MODEL,
    message: `Live Free-Tier Gemini AI Connected (${GEMINI_PRIMARY_MODEL} + ${GEMINI_FALLBACK_MODEL} fallback)`
  };
}
function resolvePortalContext(rawRole, rawPortal) {
  const portalStr = String(rawPortal || rawRole || "").trim().toLowerCase();
  if (portalStr === "teacher") return "teacher";
  if (portalStr === "parent" || portalStr === "parent-zone") return "parent";
  if (portalStr === "college" || portalStr === "school_admin" || portalStr === "school-college-zone") {
    return "college";
  }
  if (portalStr === "institute" || portalStr === "institute_admin" || portalStr === "coaching-zone") {
    return "institute";
  }
  if (portalStr === "student") return "student";
  if (portalStr === "homepage" || portalStr === "public-home") return "homepage";
  return "visitor";
}
function buildFallbackMessage(lang, userMessage, suggestTicket, portalContext) {
  const cls = extractClassLevel(userMessage);
  const board = extractBoard(userMessage);
  const actions = portalContext === "teacher" ? [
    buildNavigationAction("open_teacher_resources", cls, board, "teacher"),
    buildNavigationAction("open_lesson_planner", cls, board, "teacher"),
    buildNavigationAction("open_question_paper_generator", cls, board, "teacher"),
    buildNavigationAction("open_worksheets", cls, board, "teacher")
  ] : portalContext === "parent" ? [
    buildNavigationAction("open_parent_portal", cls, board, "parent"),
    buildNavigationAction("open_register", cls, board, "parent"),
    buildNavigationAction("open_login", cls, board, "parent")
  ] : portalContext === "college" ? [
    buildNavigationAction("open_college_portal", cls, board, "college"),
    buildNavigationAction("open_register", cls, board, "college"),
    buildNavigationAction("open_login", cls, board, "college")
  ] : portalContext === "institute" ? [
    buildNavigationAction("open_institute_portal", cls, board, "institute"),
    buildNavigationAction("open_register", cls, board, "institute"),
    buildNavigationAction("open_login", cls, board, "institute")
  ] : portalContext === "student" ? [
    buildNavigationAction("open_syllabus", cls, board, "student"),
    buildNavigationAction("open_worksheets", cls, board, "student"),
    buildNavigationAction("open_quizzes", cls, board, "student"),
    buildNavigationAction("open_dictionary", cls, board, "student")
  ] : [
    buildNavigationAction("open_student_portal"),
    buildNavigationAction("open_teacher_resources"),
    buildNavigationAction("open_parent_portal"),
    buildNavigationAction("open_ai_tools")
  ];
  if (lang === "hi") {
    return {
      reply: suggestTicket ? "\u0906\u092A \u0938\u0940\u0927\u0947 \u0928\u0940\u091A\u0947 \u0926\u093F\u090F \u0917\u090F \u0928\u0947\u0935\u093F\u0917\u0947\u0936\u0928 \u092C\u091F\u0928 \u0938\u0947 \u0938\u0902\u092C\u0902\u0927\u093F\u0924 \u092A\u094B\u0930\u094D\u091F\u0932 \u092F\u093E \u0938\u0947\u0915\u094D\u0936\u0928 \u0916\u094B\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964 \u092F\u0926\u093F \u092F\u0939 \u0906\u092A\u0915\u0947 \u0916\u093E\u0924\u0947, \u0932\u0949\u0917\u093F\u0928, \u092A\u0947\u092E\u0947\u0902\u091F \u092F\u093E \u0915\u093F\u0938\u0940 \u0924\u0915\u0928\u0940\u0915\u0940 \u0938\u092E\u0938\u094D\u092F\u093E \u0938\u0947 \u091C\u0941\u0921\u093C\u093E \u0939\u0948, \u0924\u094B \u0915\u0943\u092A\u092F\u093E SUBMIT A SUPPORT REQUEST \u092C\u091F\u0928 \u092A\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u0915\u0947 \u0905\u092A\u0928\u0940 \u0938\u092E\u0938\u094D\u092F\u093E \u092D\u0947\u091C\u0947\u0902\u0964" : "\u0906\u092A \u0928\u0940\u091A\u0947 \u0926\u093F\u090F \u0917\u090F \u0921\u093E\u092F\u0930\u0947\u0915\u094D\u091F \u092C\u091F\u0928 \u0938\u0947 \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938, \u0935\u0930\u094D\u0915\u0936\u0940\u091F, AI \u091C\u0928\u0930\u0947\u091F\u0930, \u091F\u0940\u091A\u0930 \u0932\u0947\u0938\u0928 \u092A\u094D\u0932\u093E\u0928\u0930 \u092F\u093E \u0905\u092A\u0928\u0947 \u092A\u094B\u0930\u094D\u091F\u0932 (Student, Teacher, Parent, College, Institute) \u0916\u094B\u0932 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964 \u0915\u093F\u0938\u0940 \u0935\u094D\u092F\u0915\u094D\u0924\u093F\u0917\u0924 \u0938\u092E\u0938\u094D\u092F\u093E \u0915\u0947 \u0932\u093F\u090F \u0906\u092A Support Request \u092D\u0940 \u092D\u0947\u091C \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964",
      navigationActions: actions
    };
  }
  if (lang === "mr") {
    return {
      reply: suggestTicket ? "\u0924\u0941\u092E\u094D\u0939\u0940 \u0916\u093E\u0932\u0940\u0932 \u0921\u093E\u092F\u0930\u0947\u0915\u094D\u091F \u092C\u091F\u0923\u093E\u0902\u0926\u094D\u0935\u093E\u0930\u0947 \u0938\u0902\u092C\u0902\u0927\u093F\u0924 \u092A\u094B\u0930\u094D\u091F\u0932 \u0915\u093F\u0902\u0935\u093E \u0935\u093F\u092D\u093E\u0917 \u0909\u0918\u0921\u0942 \u0936\u0915\u0924\u093E. \u0939\u0940 \u0924\u0941\u092E\u091A\u094D\u092F\u093E \u0916\u093E\u0924\u094D\u092F\u093E\u0936\u0940, \u0932\u0949\u0917\u093F\u0928, \u092A\u0947\u092E\u0947\u0902\u091F \u0915\u093F\u0902\u0935\u093E \u0924\u093E\u0902\u0924\u094D\u0930\u093F\u0915 \u0905\u0921\u091A\u0923\u0940\u0936\u0940 \u0938\u0902\u092C\u0902\u0927\u093F\u0924 \u0938\u092E\u0938\u094D\u092F\u093E \u0905\u0938\u0932\u094D\u092F\u093E\u0938 \u0915\u0943\u092A\u092F\u093E \u0916\u093E\u0932\u0940\u0932 SUBMIT A SUPPORT REQUEST \u092C\u091F\u0923\u093E\u0935\u0930 \u0915\u094D\u0932\u093F\u0915 \u0915\u0930\u093E." : "\u0924\u0941\u092E\u094D\u0939\u0940 \u0916\u093E\u0932\u0940\u0932 \u0921\u093E\u092F\u0930\u0947\u0915\u094D\u091F \u092C\u091F\u0923\u093E\u0902\u0926\u094D\u0935\u093E\u0930\u0947 \u0938\u094D\u091F\u0921\u0940 \u0928\u094B\u091F\u094D\u0938, \u0935\u0930\u094D\u0915\u0936\u0940\u091F\u094D\u0938, AI \u091C\u0928\u0930\u0947\u091F\u0930, \u0936\u093F\u0915\u094D\u0937\u0915 \u0932\u0947\u0938\u0928 \u092A\u094D\u0932\u093E\u0928\u0930 \u0915\u093F\u0902\u0935\u093E \u0924\u0941\u092E\u091A\u0947 \u092A\u094B\u0930\u094D\u091F\u0932 (Student, Teacher, Parent, College, Institute) \u0909\u0918\u0921\u0942 \u0936\u0915\u0924\u093E. \u0935\u0948\u092F\u0915\u094D\u0924\u093F\u0915 \u0905\u0921\u091A\u0923\u0940\u0938\u093E\u0920\u0940 Support Request \u0926\u0947\u0916\u0940\u0932 \u092A\u093E\u0920\u0935\u0942 \u0936\u0915\u0924\u093E.",
      navigationActions: actions
    };
  }
  return {
    reply: suggestTicket ? "You can jump directly to key MyStudyZone portals and sections using the buttons below. If you are facing a personal account, login, payment, or technical issue, click SUBMIT A SUPPORT REQUEST below to escalate your request to our Admin Support team." : "You can use the direct navigation buttons below to open Study Notes, Worksheets, the AI Generator, Teacher Lesson Planner, or any of the 5 Portals (Student, Teacher, Parent, College, Institute). Feel free to ask a specific question or click SUBMIT A SUPPORT REQUEST if you need admin assistance.",
    navigationActions: actions
  };
}
async function handleSupportChatRequest(body, clientIp) {
  const rawMessage = String(body?.message || "").trim();
  if (!rawMessage) {
    return {
      success: false,
      source: "knowledge_base",
      aiStatus: "upstream_error",
      reply: "Please type your question so I can help you.",
      language: "en",
      navigationActions: [],
      suggestSupportTicket: false
    };
  }
  const message = rawMessage.slice(0, MAX_MESSAGE_CHARS);
  const lang = detectQueryLanguage(message);
  const portalContext = resolvePortalContext(body?.userRole, body?.portalContext);
  const withinGlobalLimit = pruneAndCheckWindow(
    ipRequestTimestamps,
    clientIp || "unknown",
    CHAT_WINDOW_MS,
    MAX_REQUESTS_PER_IP
  );
  if (!withinGlobalLimit) {
    return {
      success: true,
      source: "kb_fallback",
      aiStatus: "rate_limited",
      reply: lang === "hi" ? "\u092C\u0939\u0941\u0924 \u0905\u0927\u093F\u0915 \u0938\u0902\u0926\u0947\u0936 \u092D\u0947\u091C\u0947 \u0917\u090F \u0939\u0948\u0902\u0964 \u0915\u0943\u092A\u092F\u093E \u0915\u0941\u091B \u092E\u093F\u0928\u091F \u092C\u093E\u0926 \u092A\u0941\u0928\u0903 \u092A\u094D\u0930\u092F\u093E\u0938 \u0915\u0930\u0947\u0902, \u092F\u093E \u0928\u0940\u091A\u0947 \u0926\u093F\u090F \u092C\u091F\u0928 \u0938\u0947 \u0905\u092A\u0928\u0940 \u0938\u092E\u0938\u094D\u092F\u093E \u092D\u0947\u091C\u0947\u0902\u0964" : lang === "mr" ? "\u0916\u0942\u092A \u091C\u093E\u0938\u094D\u0924 \u0938\u0902\u0926\u0947\u0936 \u092A\u093E\u0920\u0935\u0932\u0947 \u0917\u0947\u0932\u0947 \u0906\u0939\u0947\u0924. \u0915\u0943\u092A\u092F\u093E \u0925\u094B\u0921\u094D\u092F\u093E \u0935\u0947\u0933\u093E\u0928\u0947 \u092A\u0941\u0928\u094D\u0939\u093E \u092A\u094D\u0930\u092F\u0924\u094D\u0928 \u0915\u0930\u093E, \u0915\u093F\u0902\u0935\u093E \u0916\u093E\u0932\u0940\u0932 \u092C\u091F\u0923\u093E\u0935\u0930\u0942\u0928 \u0924\u0915\u094D\u0930\u093E\u0930 \u0928\u094B\u0902\u0926\u0935\u093E." : "Too many messages sent in a short time. Please wait a few minutes or submit a Support Request below.",
      language: lang,
      navigationActions: [buildNavigationAction("open_dashboard")],
      suggestSupportTicket: true,
      portalContext,
      notice: "Rate limit reached to keep MyStudyZone Help Desk fast and free for everyone."
    };
  }
  const kbMatch = matchKnowledgeBaseFastPath(message, { userRole: portalContext });
  if (kbMatch.matched) {
    return {
      success: true,
      source: "knowledge_base",
      aiStatus: "kb_fastpath",
      reply: kbMatch.reply,
      language: kbMatch.language,
      navigationActions: kbMatch.navigationActions,
      suggestSupportTicket: kbMatch.suggestSupportTicket,
      portalContext
    };
  }
  const apiKey = getConfiguredGeminiApiKey();
  const todayKey = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  if (dailyAiTracker.dateKey !== todayKey) {
    dailyAiTracker = {
      dateKey: todayKey,
      count: 0,
      quotaCooldownUntilMs: 0,
      lastKeyErrorReason: "",
      lastUpstreamErrorAt: 0
    };
  }
  const buildKbOrGenericFallback = (aiStatus, notice, suggestTicket) => {
    const complexKbMatch = matchKnowledgeBaseFastPath(message, {
      userRole: portalContext,
      includeComplexMatch: true
    });
    if (complexKbMatch.matched) {
      return {
        success: true,
        source: "kb_fallback",
        aiStatus,
        reply: complexKbMatch.reply,
        language: complexKbMatch.language,
        navigationActions: complexKbMatch.navigationActions,
        suggestSupportTicket: complexKbMatch.suggestSupportTicket || suggestTicket,
        portalContext,
        notice
      };
    }
    const fb = buildFallbackMessage(lang, message, suggestTicket, portalContext);
    return {
      success: true,
      source: "kb_fallback",
      aiStatus,
      reply: fb.reply,
      language: lang,
      navigationActions: fb.navigationActions,
      suggestSupportTicket: true,
      portalContext,
      notice
    };
  };
  if (!apiKey) {
    return buildKbOrGenericFallback(
      "missing_key",
      "Running in Knowledge Base Mode (GEMINI_API_KEY is not configured on the server). Step-by-step portal guides, direct navigation, and Support Tickets remain active.",
      false
    );
  }
  if (dailyAiTracker.count >= MAX_DAILY_AI_CALLS || Date.now() < dailyAiTracker.quotaCooldownUntilMs) {
    return buildKbOrGenericFallback(
      "quota_exceeded",
      "Free-tier AI quota is temporarily cooling down. Paid models are never activated automatically. Knowledge Base guidance and Admin Support Tickets remain fully active.",
      true
    );
  }
  const withinAiIpLimit = pruneAndCheckWindow(
    ipAiTimestamps,
    clientIp || "unknown",
    CHAT_WINDOW_MS,
    MAX_AI_CALLS_PER_IP
  );
  if (!withinAiIpLimit) {
    return buildKbOrGenericFallback(
      "rate_limited",
      "Free AI chat limit reached for this session window. Showing Knowledge Base guidance & direct links.",
      true
    );
  }
  try {
    dailyAiTracker.count += 1;
    const rawHistory = Array.isArray(body?.history) ? body.history : [];
    const safeHistory = rawHistory.slice(-MAX_HISTORY_TURNS).map((t) => ({
      role: t?.role === "assistant" ? "assistant" : "user",
      text: String(t?.text || "").slice(0, 400)
    })).filter((t) => Boolean(t.text));
    const historyText = safeHistory.map((t) => `${t.role === "assistant" ? "Assistant" : "User"}: ${t.text}`).join("\n");
    const promptText = [
      `Current User Portal Context: ${portalContext}`,
      historyText ? `Recent Conversation:
${historyText}` : "",
      `Latest User Question: ${message}`
    ].filter(Boolean).join("\n\n");
    const generationResult = await generateGeminiContentWithFallback(
      {
        contents: promptText,
        config: {
          systemInstruction: HELP_DESK_SYSTEM_PROMPT,
          responseMimeType: "application/json",
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              reply: {
                type: Type.STRING,
                description: "Simple, friendly, short, step-by-step answer in the user language (English, Hindi, or Marathi) using ONLY real MyStudyZone features."
              },
              language: {
                type: Type.STRING,
                description: "Language code: en, hi, or mr"
              },
              navigationActionIds: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "0 to 3 exact allowlisted action IDs from system instructions"
              },
              detectedClass: {
                type: Type.STRING,
                description: "Optional Class 1 through Class 10 if specifically requested"
              },
              detectedBoard: {
                type: Type.STRING,
                description: "Optional Maharashtra, CBSE, or ICSE if specifically requested"
              },
              suggestSupportTicket: {
                type: Type.BOOLEAN,
                description: "True if the user has a personal account, login, payment, class correction, or unresolved technical problem."
              }
            },
            required: ["reply", "language", "navigationActionIds", "suggestSupportTicket"]
          }
        }
      },
      {
        apiKey,
        requireValidJson: true,
        validateJson: (candidate) => Boolean(String(candidate.reply || "").trim())
      }
    );
    dailyAiTracker.lastKeyErrorReason = "";
    dailyAiTracker.lastUpstreamErrorAt = 0;
    dailyAiTracker.quotaCooldownUntilMs = 0;
    const parsed = generationResult.parsedJson || safeParseGeminiJson(generationResult.response.text || "") || {};
    const replyLang = parsed.language === "hi" || parsed.language === "mr" ? parsed.language : lang;
    const targetClass = parsed.detectedClass && VALID_CLASSES.has(parsed.detectedClass) ? parsed.detectedClass : extractClassLevel(message);
    const targetBoard = parsed.detectedBoard && VALID_BOARDS2.has(parsed.detectedBoard) ? parsed.detectedBoard : extractBoard(message);
    const lowerMsg = message.toLowerCase();
    const isPortalActionAllowedForContext = (actionId) => {
      if (portalContext === "teacher" && actionId === "open_student_portal") {
        return lowerMsg.includes("student portal");
      }
      if (portalContext === "parent" && (actionId === "open_student_portal" || actionId === "open_teacher_resources")) {
        return lowerMsg.includes("student portal") || lowerMsg.includes("teacher portal");
      }
      if (portalContext === "college" && (actionId === "open_student_portal" || actionId === "open_institute_portal")) {
        return lowerMsg.includes("student portal") || lowerMsg.includes("institute portal");
      }
      if (portalContext === "institute" && (actionId === "open_student_portal" || actionId === "open_college_portal")) {
        return lowerMsg.includes("student portal") || lowerMsg.includes("college portal");
      }
      return true;
    };
    const validActions = [];
    const seenIds = /* @__PURE__ */ new Set();
    for (const rawId of parsed.navigationActionIds || []) {
      const id = String(rawId || "").trim();
      if (id in SUPPORT_NAVIGATION_ALLOWLIST && !seenIds.has(id) && isPortalActionAllowedForContext(id) && validActions.length < 3) {
        seenIds.add(id);
        validActions.push(buildNavigationAction(id, targetClass, targetBoard, portalContext));
      }
    }
    const cleanReply = String(parsed.reply || "").trim();
    if (!cleanReply) {
      dailyAiTracker.lastUpstreamErrorAt = Date.now();
      return buildKbOrGenericFallback(
        "upstream_error",
        "AI response was empty. Showing verified Knowledge Base guidance instead.",
        Boolean(parsed.suggestSupportTicket)
      );
    }
    return {
      success: true,
      source: "gemini_ai",
      aiStatus: "ok",
      reply: cleanReply,
      language: replyLang,
      navigationActions: validActions,
      suggestSupportTicket: Boolean(parsed.suggestSupportTicket),
      portalContext,
      modelUsed: generationResult.modelUsed,
      usedFallback: generationResult.usedFallback
    };
  } catch (err) {
    const errMsg = String(err?.message || err || "");
    const isQuota = isGeminiQuotaError(err);
    const isInvalidKey = isGeminiAuthError(err);
    console.warn("[Support Assistant AI Fallback]:", errMsg.replace(/AIza[0-9A-Za-z\-_]{20,}/g, "[REDACTED_KEY]"));
    if (isQuota) {
      dailyAiTracker.quotaCooldownUntilMs = Date.now() + 60 * 1e3;
    } else if (isInvalidKey) {
      dailyAiTracker.lastKeyErrorReason = "api_key_invalid";
    } else {
      dailyAiTracker.lastUpstreamErrorAt = Date.now();
    }
    return buildKbOrGenericFallback(
      isQuota ? "quota_exceeded" : "upstream_error",
      isQuota ? "Free-tier AI quota is temporarily cooling down. Paid models are never activated automatically. Showing Knowledge Base guidance and Support Request option." : isInvalidKey ? "Configured GEMINI_API_KEY could not be authenticated by Gemini. Running in Knowledge Base mode." : "AI assistant is temporarily unavailable. Showing Knowledge Base guidance and Support Request option.",
      true
    );
  }
}
async function handleSupportTicketSubmission(body, headers, clientIp) {
  ensureServerSupportTicketsLoaded();
  const withinTicketLimit = pruneAndCheckWindow(
    ipTicketTimestamps,
    clientIp || "unknown",
    TICKET_WINDOW_MS,
    MAX_TICKETS_PER_IP
  );
  if (!withinTicketLimit) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        persisted: false,
        error: "Too many support requests submitted from your connection. Please try again in 15 minutes."
      }
    };
  }
  const userCategory = normalizeSupportUserCategory(
    String(body?.userCategory || body?.requesterRole || "student")
  );
  const categoryLabel = SUPPORT_USER_CATEGORY_LABELS[userCategory];
  const name = String(body?.name || "").trim().slice(0, 100);
  const email = String(body?.email || "").trim().toLowerCase().slice(0, 150);
  const mobile = String(body?.mobile || "").replace(/[^\d+\-\s]/g, "").trim().slice(0, 20);
  const rawCategory = String(body?.category || "General Queries").trim();
  const category = VALID_SUPPORT_CATEGORIES.has(rawCategory) ? rawCategory : "General Queries";
  const description = String(body?.description || "").trim().slice(0, 1800);
  const subjectInput = String(body?.subject || "").trim().slice(0, 180);
  const portalContext = String(body?.portalContext || userCategory).trim().slice(0, 40);
  if (name.length < 2) {
    return {
      statusCode: 400,
      payload: { success: false, persisted: false, error: "Please enter your full name." }
    };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      statusCode: 400,
      payload: { success: false, persisted: false, error: "Please enter a valid registered email address." }
    };
  }
  if (description.length < 10) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        persisted: false,
        error: "Please describe your problem in at least 10 characters."
      }
    };
  }
  let verifiedUid = null;
  let bearerToken = "";
  if (headers.authorization) {
    const authRes = await verifyBearerIdToken(headers.authorization).catch(() => null);
    if (authRes?.valid && authRes.uid) {
      verifiedUid = authRes.uid;
      bearerToken = authRes.token || "";
    }
  }
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const rand = Math.floor(1e4 + Math.random() * 9e4);
  const ticketNumber = `TKT-MSZ-${rand}`;
  const ticketId = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const subject = subjectInput || `[${categoryLabel}] ${category}`;
  const ticketDoc = {
    id: ticketId,
    ticketNumber,
    studentId: verifiedUid || String(body?.studentId || "guest_helpdesk").slice(0, 128),
    studentName: name,
    userCategory,
    requesterRole: userCategory,
    portalContext,
    email,
    mobile,
    category,
    subject,
    description,
    status: "OPEN",
    priority: category.includes("Payment") ? "HIGH" : "MEDIUM",
    createdAt: nowIso,
    updatedAt: nowIso
  };
  try {
    serverSupportTicketsMap.set(ticketId, ticketDoc);
    const savedToDisk = flushServerSupportTicketsToDisk();
    let savedToFirestore = false;
    if (isFirebaseAdminConfigured() || bearerToken) {
      const writeRes = await serverSetDoc(
        "support_tickets",
        ticketId,
        ticketDoc,
        { merge: false, ...bearerToken ? { bearerToken } : {} }
      ).catch(() => null);
      savedToFirestore = Boolean(writeRes);
    }
    if (!savedToDisk && !savedToFirestore && serverSupportTicketsMap.size === 0) {
      return {
        statusCode: 500,
        payload: {
          success: false,
          persisted: false,
          error: "Unable to save your support request right now. Please try again."
        }
      };
    }
    return {
      statusCode: 201,
      payload: {
        success: true,
        persisted: true,
        storage: savedToFirestore ? "firestore_synced" : "server_persistent_store",
        ticket: ticketDoc
      }
    };
  } catch (err) {
    console.error("[Support Ticket Server Error]:", err);
    return {
      statusCode: 500,
      payload: {
        success: false,
        persisted: false,
        error: "Unable to save your support request right now. Please retry or email support@mystudyzone.in."
      }
    };
  }
}

// server/aiToolsService.ts
import { Type as Type2 } from "@google/genai";
var VALID_TEXT_TOOLS = /* @__PURE__ */ new Set([
  "pdf_maker",
  "worksheet_generator",
  "question_paper_generator",
  "notes_generator",
  "presentation_maker",
  "quiz_generator",
  "resume_maker",
  "letter_generator",
  "content_generator",
  "teacher_productivity_tool",
  "student_learning_tool"
]);
var AI_WINDOW_MS = 10 * 60 * 1e3;
var MAX_AI_REQUESTS_PER_IP = 40;
var ipAiRequestLog = /* @__PURE__ */ new Map();
function checkIpRateLimit(ip) {
  const now = Date.now();
  const list = (ipAiRequestLog.get(ip) || []).filter((ts) => now - ts < AI_WINDOW_MS);
  if (list.length >= MAX_AI_REQUESTS_PER_IP) {
    ipAiRequestLog.set(ip, list);
    return false;
  }
  list.push(now);
  ipAiRequestLog.set(ip, list);
  return true;
}
function getAiServiceStatus() {
  const configured = Boolean(getConfiguredGeminiApiKey());
  return {
    configured,
    textModel: GEMINI_PRIMARY_MODEL,
    fallbackModel: GEMINI_FALLBACK_MODEL,
    imageModel: GEMINI_IMAGE_MODEL,
    message: configured ? `Server Gemini AI runtime is configured and ready (${GEMINI_PRIMARY_MODEL} with free-tier ${GEMINI_FALLBACK_MODEL} fallback).` : "GEMINI_API_KEY is not configured in Settings -> Secrets on the server. Live AI generation is disabled (zero fake outputs)."
  };
}
async function handleAiTextGenerate(body, clientIp) {
  if (!checkIpRateLimit(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: "RATE_LIMITED",
        retryable: true,
        retryAfterSeconds: 60,
        message: "Too many AI requests from this connection. Please wait a few minutes and retry."
      }
    };
  }
  const apiKey = getConfiguredGeminiApiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: "MISSING_GEMINI_API_KEY",
        retryable: false,
        message: "GEMINI_API_KEY is not configured on the server. Add GEMINI_API_KEY in Settings -> Secrets to run real AI generation."
      }
    };
  }
  const toolId = String(body.toolId || "").trim();
  if (!VALID_TEXT_TOOLS.has(toolId)) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: "INVALID_TOOL_ID",
        message: "Requested AI toolId is invalid."
      }
    };
  }
  const topic = String(body.topic || body.prompt || "").trim().slice(0, 1600);
  const board = String(body.board || "Maharashtra").trim().slice(0, 40);
  const classLevel = String(body.classLevel || "Class 5").trim().slice(0, 30);
  const subject = String(body.subject || "Mathematics").trim().slice(0, 80);
  const language = String(body.language || "English").trim().slice(0, 30);
  const instructions = String(body.instructions || "").trim().slice(0, 1e3);
  const count = Math.min(Math.max(Number(body.count) || 5, 1), 25);
  const roleToolName = String(body.toolName || "").trim().slice(0, 100);
  const roleToolCategory = String(body.toolCategory || "").trim().slice(0, 80);
  const outputKindRaw = String(body.outputKind || "document").trim();
  if (!topic) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: "MISSING_PROMPT",
        message: "Please enter a topic, prompt, or document request before generating."
      }
    };
  }
  try {
    if (toolId === "quiz_generator" || (toolId === "teacher_productivity_tool" || toolId === "student_learning_tool") && outputKindRaw === "quiz") {
      const result2 = await generateGeminiContentWithFallback(
        {
          contents: `${roleToolName ? `Tool: ${roleToolName}. ` : ""}Generate ${count} original, accurate multiple-choice questions in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction: "You are a strict Indian school academic curriculum author. Ensure factual and mathematical accuracy. Return valid JSON matching the schema with all required fields populated.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type2.OBJECT,
              properties: {
                title: { type: Type2.STRING },
                questions: {
                  type: Type2.ARRAY,
                  items: {
                    type: Type2.OBJECT,
                    properties: {
                      question: { type: Type2.STRING },
                      options: {
                        type: Type2.ARRAY,
                        items: { type: Type2.STRING }
                      },
                      correctIndex: { type: Type2.INTEGER },
                      explanation: { type: Type2.STRING }
                    },
                    required: ["question", "options", "correctIndex", "explanation"]
                  }
                }
              },
              required: ["title", "questions"]
            }
          }
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.questions) && parsed.questions.length > 0
        }
      );
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: "quiz",
          model: result2.modelUsed,
          primaryModel: result2.primaryModel,
          fallbackModel: result2.fallbackModel,
          usedFallback: result2.usedFallback,
          attemptsMade: result2.attemptsMade,
          structured: result2.parsedJson
        }
      };
    }
    if (toolId === "presentation_maker" || (toolId === "teacher_productivity_tool" || toolId === "student_learning_tool") && outputKindRaw === "slides") {
      const slideCount = Math.min(Math.max(count, 3), 12);
      const result2 = await generateGeminiContentWithFallback(
        {
          contents: `${roleToolName ? `Tool: ${roleToolName}. ` : ""}Create a ${slideCount}-slide educational presentation deck in ${language} for ${board} ${classLevel} ${subject} on "${topic}". Include concise bullet points and practical speaker notes for each slide. ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction: "You create classroom-ready structured slide decks with clear bullet points and teacher/student speaker notes. Populate all required JSON fields.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type2.OBJECT,
              properties: {
                title: { type: Type2.STRING },
                subtitle: { type: Type2.STRING },
                slides: {
                  type: Type2.ARRAY,
                  items: {
                    type: Type2.OBJECT,
                    properties: {
                      slideNumber: { type: Type2.INTEGER },
                      title: { type: Type2.STRING },
                      bullets: {
                        type: Type2.ARRAY,
                        items: { type: Type2.STRING }
                      },
                      speakerNotes: { type: Type2.STRING }
                    },
                    required: ["slideNumber", "title", "bullets", "speakerNotes"]
                  }
                }
              },
              required: ["title", "subtitle", "slides"]
            }
          }
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.slides) && parsed.slides.length > 0
        }
      );
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: "slides",
          model: result2.modelUsed,
          primaryModel: result2.primaryModel,
          fallbackModel: result2.fallbackModel,
          usedFallback: result2.usedFallback,
          attemptsMade: result2.attemptsMade,
          structured: result2.parsedJson
        }
      };
    }
    if ((toolId === "teacher_productivity_tool" || toolId === "student_learning_tool") && outputKindRaw === "table") {
      const result2 = await generateGeminiContentWithFallback(
        {
          contents: `Tool: ${roleToolName || "Academic Table Generator"} (${roleToolCategory || "Education"}). Context: ${board} Board, ${classLevel}, Subject: ${subject}, Language: ${language}. Request: "${topic}". ${instructions} Output an organized, ready-to-print tabular grid (columns + rows) suitable for Excel (.xlsx) and A4 PDF export.`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction: "You are an Indian school & academic operations planner. Generate clean, practical tabular schedules, registers, marksheets, seating charts, or study planners matching the exact JSON schema with all required fields populated.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type2.OBJECT,
              properties: {
                title: { type: Type2.STRING },
                subtitle: { type: Type2.STRING },
                columns: {
                  type: Type2.ARRAY,
                  items: { type: Type2.STRING }
                },
                rows: {
                  type: Type2.ARRAY,
                  items: {
                    type: Type2.ARRAY,
                    items: { type: Type2.STRING }
                  }
                },
                notes: { type: Type2.STRING }
              },
              required: ["title", "columns", "rows"]
            }
          }
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.columns) && parsed.columns.length > 0
        }
      );
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: "table",
          model: result2.modelUsed,
          primaryModel: result2.primaryModel,
          fallbackModel: result2.fallbackModel,
          usedFallback: result2.usedFallback,
          attemptsMade: result2.attemptsMade,
          structured: result2.parsedJson
        }
      };
    }
    if ((toolId === "teacher_productivity_tool" || toolId === "student_learning_tool") && outputKindRaw === "flashcards") {
      const result2 = await generateGeminiContentWithFallback(
        {
          contents: `Tool: ${roleToolName || "Study Flashcards"}. Create ${Math.min(Math.max(count, 4), 16)} study cards in ${language} for ${board} ${classLevel} ${subject} on "${topic}". ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction: "You create high-retention study flashcards, definitions, formulas, and bilingual vocabulary cards matching the exact JSON schema with all required fields populated.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type2.OBJECT,
              properties: {
                title: { type: Type2.STRING },
                subtitle: { type: Type2.STRING },
                cards: {
                  type: Type2.ARRAY,
                  items: {
                    type: Type2.OBJECT,
                    properties: {
                      front: { type: Type2.STRING },
                      back: { type: Type2.STRING },
                      hint: { type: Type2.STRING }
                    },
                    required: ["front", "back", "hint"]
                  }
                }
              },
              required: ["title", "cards"]
            }
          }
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Array.isArray(parsed.cards) && parsed.cards.length > 0
        }
      );
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          outputKind: "flashcards",
          model: result2.modelUsed,
          primaryModel: result2.primaryModel,
          fallbackModel: result2.fallbackModel,
          usedFallback: result2.usedFallback,
          attemptsMade: result2.attemptsMade,
          structured: result2.parsedJson
        }
      };
    }
    if (toolId === "resume_maker") {
      const result2 = await generateGeminiContentWithFallback(
        {
          contents: `Refine and structure an ATS-friendly academic/teaching/student resume based on these details: ${topic}. Additional focus: ${instructions}`,
          config: {
            temperature: 0.3,
            maxOutputTokens: 8192,
            systemInstruction: "You are a career coach for educators and students in India. Improve phrasing clearly without inventing fake degrees or employers not provided. Populate all required JSON fields.",
            responseMimeType: "application/json",
            responseSchema: {
              type: Type2.OBJECT,
              properties: {
                headline: { type: Type2.STRING },
                summary: { type: Type2.STRING },
                skills: {
                  type: Type2.ARRAY,
                  items: { type: Type2.STRING }
                },
                highlights: {
                  type: Type2.ARRAY,
                  items: { type: Type2.STRING }
                }
              },
              required: ["headline", "summary", "skills", "highlights"]
            }
          }
        },
        {
          apiKey,
          requireValidJson: true,
          validateJson: (parsed) => Boolean(String(parsed.headline || "").trim() || String(parsed.summary || "").trim())
        }
      );
      return {
        statusCode: 200,
        payload: {
          success: true,
          toolId,
          model: result2.modelUsed,
          primaryModel: result2.primaryModel,
          fallbackModel: result2.fallbackModel,
          usedFallback: result2.usedFallback,
          attemptsMade: result2.attemptsMade,
          structured: result2.parsedJson
        }
      };
    }
    const promptByTool = {
      pdf_maker: `Write a complete, well-structured educational PDF document in ${language} for ${board} ${classLevel} ${subject} titled/about "${topic}". Organize into clear sections suitable for direct PDF publication. ${instructions}`,
      worksheet_generator: `Create a printable classroom practice worksheet in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". Include varied sections (Fill in the Blanks, True/False, Short Questions, Problem Solving) AND a complete Answer Key section at the end. ${instructions}`,
      question_paper_generator: `Create a formal school examination Question Paper in ${language} aligned to ${board} Board ${classLevel} ${subject} covering "${topic}". Include Paper Header (Time, Total Marks), Section A (MCQs/Objective), Section B (Short Answer), Section C (Long Answer/Application), and a Complete Marking Scheme / Answer Key section. ${instructions}`,
      notes_generator: `Write comprehensive, student-friendly Chapter Revision Notes in ${language} for ${board} Board ${classLevel} ${subject} on "${topic}". Include Overview, Key Concepts & Definitions, Important Formulas/Rules, Worked Examples, and Quick Revision Bullets. ${instructions}`,
      letter_generator: `Write a formal, clear, ready-to-send school/educational letter in ${language} for the request: "${topic}". Include Date placeholder, Recipient block, Subject line, clear body paragraphs, and Sign-off. ${instructions}`,
      content_generator: `Create engaging, original educational content in ${language} for ${board} ${classLevel} ${subject} on "${topic}". Additional context: ${instructions}`,
      teacher_productivity_tool: `You are executing Teacher Tool "${roleToolName || "Educator Generator"}" (${roleToolCategory || "Teaching"}). Language: ${language}. Curriculum: ${board} Board, ${classLevel}, ${subject}. Topic/Request: "${topic}". ${instructions} Produce complete, classroom-ready sections with clear headings, practical steps/questions, and teacher notes or answer keys wherever applicable.`,
      student_learning_tool: `You are executing Student Learning Tool "${roleToolName || "Student Study Helper"}" (${roleToolCategory || "Learning"}). Language: ${language}. Student Profile: ${board} Board, ${classLevel}, ${subject}. Request/Question: "${topic}". ${instructions} Provide clear, step-by-step, age-appropriate explanations, worked examples, memory tips, and practice checks.`
    };
    const result = await generateGeminiContentWithFallback(
      {
        contents: promptByTool[toolId] || topic,
        config: {
          temperature: 0.3,
          maxOutputTokens: 8192,
          systemInstruction: "You are an expert Indian curriculum author, educator, and tutor for MyStudyZone. Output clear structured JSON with title, subtitle, and well-organized sections matching all required fields.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type2.OBJECT,
            properties: {
              title: { type: Type2.STRING },
              subtitle: { type: Type2.STRING },
              sections: {
                type: Type2.ARRAY,
                items: {
                  type: Type2.OBJECT,
                  properties: {
                    heading: { type: Type2.STRING },
                    body: { type: Type2.STRING }
                  },
                  required: ["heading", "body"]
                }
              }
            },
            required: ["title", "subtitle", "sections"]
          }
        }
      },
      {
        apiKey,
        requireValidJson: true,
        validateJson: (parsed) => Array.isArray(parsed.sections) && parsed.sections.length > 0
      }
    );
    return {
      statusCode: 200,
      payload: {
        success: true,
        toolId,
        outputKind: "document",
        model: result.modelUsed,
        primaryModel: result.primaryModel,
        fallbackModel: result.fallbackModel,
        usedFallback: result.usedFallback,
        attemptsMade: result.attemptsMade,
        structured: result.parsedJson
      }
    };
  } catch (err) {
    const mapped = mapGeminiHttpError(err, "MyStudyZone AI Studio");
    return {
      statusCode: mapped.statusCode,
      payload: {
        success: false,
        errorCode: mapped.errorCode,
        retryable: mapped.retryable,
        retryAfterSeconds: mapped.retryAfterSeconds,
        attemptsMade: mapped.attemptsMade,
        message: mapped.message
      }
    };
  }
}
async function handleAiImageGenerate(body, clientIp) {
  if (!checkIpRateLimit(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: "RATE_LIMITED",
        retryable: true,
        retryAfterSeconds: 60,
        message: "Too many AI image requests. Please wait a few minutes and retry."
      }
    };
  }
  const apiKey = getConfiguredGeminiApiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: "MISSING_GEMINI_API_KEY",
        retryable: false,
        message: "GEMINI_API_KEY is not configured on the server. AI Image Generator requires a configured billing-enabled GEMINI_API_KEY in Settings -> Secrets."
      }
    };
  }
  const prompt = String(body.prompt || "").trim().slice(0, 800);
  const style = String(body.style || "Educational Illustration").trim().slice(0, 80);
  const aspectRaw = String(body.aspectRatio || "1:1").trim();
  const allowedRatios = /* @__PURE__ */ new Set(["1:1", "3:4", "4:3", "9:16", "16:9"]);
  const aspectRatio = allowedRatios.has(aspectRaw) ? aspectRaw : "1:1";
  if (!prompt) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: "MISSING_PROMPT",
        message: "Please describe the educational diagram or illustration you want to generate."
      }
    };
  }
  const ai = createGeminiServerClient(apiKey);
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_IMAGE_MODEL,
      contents: {
        parts: [
          {
            text: `Create a clean, school-safe ${style} visual: ${prompt}`
          }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio
        }
      }
    });
    const parts = response.candidates?.[0]?.content?.parts ?? [];
    let imageDataUrl = "";
    let caption = "";
    for (const part of parts) {
      if (part.inlineData?.data) {
        const mime = part.inlineData.mimeType ?? "image/png";
        imageDataUrl = `data:${mime};base64,${part.inlineData.data}`;
      } else if (part.text) {
        caption += part.text;
      }
    }
    if (!imageDataUrl) {
      return {
        statusCode: 502,
        payload: {
          success: false,
          errorCode: "NO_IMAGE_RETURNED",
          message: caption || "Gemini image model did not return an image asset for this prompt. Try refining your prompt."
        }
      };
    }
    return {
      statusCode: 200,
      payload: {
        success: true,
        model: GEMINI_IMAGE_MODEL,
        aspectRatio,
        imageDataUrl,
        caption
      }
    };
  } catch (err) {
    const rawMsg = String(err?.message || err || "AI image generation failed");
    const upper = rawMsg.toUpperCase();
    const isPaidOrPerm = upper.includes("BILLING") || upper.includes("PAID") || upper.includes("PERMISSION_DENIED") || upper.includes("403") || upper.includes("RESOURCE_EXHAUSTED");
    if (isPaidOrPerm) {
      return {
        statusCode: 403,
        payload: {
          success: false,
          errorCode: "PAID_KEY_REQUIRED",
          retryable: false,
          message: `Image generation model (${GEMINI_IMAGE_MODEL}) requires a billing-enabled Gemini API key. MyStudyZone operates strictly on free-tier Gemini models unless billing is explicitly enabled.`
        }
      };
    }
    const mapped = mapGeminiHttpError(err, "MyStudyZone AI Image Generator");
    return {
      statusCode: mapped.statusCode,
      payload: {
        success: false,
        errorCode: mapped.errorCode,
        retryable: mapped.retryable,
        retryAfterSeconds: mapped.retryAfterSeconds,
        message: mapped.message
      }
    };
  }
}

// server/dictionaryService.ts
var DICTIONARY_COLLECTION = "msz_dictionary_catalog";
var DICTIONARY_INDEX_DOC = "custom_verified_entries_v1";
var serverCustomWordsMap = /* @__PURE__ */ new Map();
var initialSyncAttempted = false;
async function ensureServerDictionaryLoaded() {
  if (initialSyncAttempted) return;
  initialSyncAttempted = true;
  try {
    const docData = await serverGetDoc(DICTIONARY_COLLECTION, DICTIONARY_INDEX_DOC);
    if (docData && Array.isArray(docData.entries)) {
      for (const item of docData.entries) {
        if (item && item.english) {
          serverCustomWordsMap.set(item.english.toLowerCase(), item);
        }
      }
    }
  } catch {
  }
}
async function getServerCustomDictionaryEntries() {
  await ensureServerDictionaryLoaded();
  return Array.from(serverCustomWordsMap.values()).sort(
    (a, b) => a.english.localeCompare(b.english)
  );
}
async function addServerCustomDictionaryEntry(raw) {
  await ensureServerDictionaryLoaded();
  const english = String(raw.english || "").trim();
  const marathiWord = String(raw.marathiWord || "").trim();
  const hindiWord = String(raw.hindiWord || "").trim();
  const englishMeaning = String(raw.englishMeaning || "").trim();
  const marathiMeaning = String(raw.marathiMeaning || "").trim();
  const hindiMeaning = String(raw.hindiMeaning || "").trim();
  if (!english || !marathiWord || !hindiWord || !englishMeaning || !marathiMeaning || !hindiMeaning) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        message: "English word, Marathi word, Hindi word, and meanings in all 3 languages are required."
      }
    };
  }
  const formattedEnglish = english.charAt(0).toUpperCase() + english.slice(1);
  const id = String(raw.id || "").trim() || `msz-orig-${Date.now()}-${formattedEnglish.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;
  const rawSynonyms = raw.synonyms || {};
  const rawAntonyms = raw.antonyms || {};
  const rawExamples = raw.examples || {};
  const rawSimple = raw.simpleMeaning || {};
  const rawDetailed = raw.detailedMeaning || {};
  const entry = {
    id,
    english: formattedEnglish,
    pronunciation: String(raw.pronunciation || formattedEnglish.toLowerCase()).trim(),
    partOfSpeech: String(raw.partOfSpeech || "Noun").trim(),
    classGroup: String(raw.classGroup || "Classes 4\u20136").trim(),
    category: String(raw.category || "Academic & School").trim(),
    englishMeaning,
    marathiWord,
    marathiMeaning,
    hindiWord,
    hindiMeaning,
    simpleMeaning: {
      english: String(rawSimple.english || englishMeaning).trim(),
      marathi: String(rawSimple.marathi || marathiMeaning).trim(),
      hindi: String(rawSimple.hindi || hindiMeaning).trim()
    },
    detailedMeaning: {
      english: String(rawDetailed.english || englishMeaning).trim(),
      marathi: String(rawDetailed.marathi || marathiMeaning).trim(),
      hindi: String(rawDetailed.hindi || hindiMeaning).trim()
    },
    synonyms: {
      english: Array.isArray(rawSynonyms.english) ? rawSynonyms.english.map((s) => String(s).trim()).filter(Boolean) : [],
      marathi: Array.isArray(rawSynonyms.marathi) ? rawSynonyms.marathi.map((s) => String(s).trim()).filter(Boolean) : [],
      hindi: Array.isArray(rawSynonyms.hindi) ? rawSynonyms.hindi.map((s) => String(s).trim()).filter(Boolean) : []
    },
    antonyms: {
      english: Array.isArray(rawAntonyms.english) ? rawAntonyms.english.map((s) => String(s).trim()).filter(Boolean) : [],
      marathi: Array.isArray(rawAntonyms.marathi) ? rawAntonyms.marathi.map((s) => String(s).trim()).filter(Boolean) : [],
      hindi: Array.isArray(rawAntonyms.hindi) ? rawAntonyms.hindi.map((s) => String(s).trim()).filter(Boolean) : []
    },
    examples: {
      english: String(rawExamples.english || "").trim() || `We studied the word "${formattedEnglish}" in our lesson today.`,
      marathi: String(rawExamples.marathi || "").trim() || `\u0906\u092E\u094D\u0939\u0940 \u0906\u091C \u092A\u093E\u0920\u093E\u0924 "${marathiWord}" \u0939\u093E \u0936\u092C\u094D\u0926 \u0936\u093F\u0915\u0932\u094B.`,
      hindi: String(rawExamples.hindi || "").trim() || `\u0939\u092E\u0928\u0947 \u0906\u091C \u092A\u093E\u0920 \u092E\u0947\u0902 "${hindiWord}" \u0936\u092C\u094D\u0926 \u0915\u093E \u0905\u0927\u094D\u092F\u092F\u0928 \u0915\u093F\u092F\u093E\u0964`
    },
    letter: formattedEnglish.charAt(0).toUpperCase(),
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    sourceAttribution: "100% Original MyStudyZone Trilingual Educational Lexicon (Independently Developed)"
  };
  serverCustomWordsMap.set(formattedEnglish.toLowerCase(), entry);
  try {
    const allCustom = Array.from(serverCustomWordsMap.values()).slice(-1500);
    await serverSetDoc(
      DICTIONARY_COLLECTION,
      DICTIONARY_INDEX_DOC,
      {
        id: DICTIONARY_INDEX_DOC,
        entries: allCustom,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      { merge: true }
    );
  } catch {
  }
  return {
    statusCode: 200,
    payload: {
      success: true,
      entry,
      totalCustomEntries: serverCustomWordsMap.size,
      message: `Original entry "${formattedEnglish}" saved to MyStudyZone Firebase Dictionary.`
    }
  };
}

// server/snapSolveService.ts
import crypto5 from "crypto";
import { Type as Type3 } from "@google/genai";
var SNAPSOLVE_MODEL = GEMINI_PRIMARY_MODEL;
var SNAPSOLVE_FALLBACK_MODEL = GEMINI_FALLBACK_MODEL;
var SNAPSOLVE_MAX_PAGES = 10;
var SNAPSOLVE_MAX_PAGE_BYTES = 5 * 1024 * 1024;
var SNAPSOLVE_SESSION_TTL_MS = 20 * 60 * 1e3;
var SNAPSOLVE_ALLOWED_MIMES = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/png",
  "image/webp"
]);
var SNAPSOLVE_PRIVACY_NOTICE = "Temporary Processing Notice: Uploaded question images/pages are transmitted securely to Google Gemini AI strictly for generating answers in your active session. They are kept in ephemeral server memory only (auto-cleared within 20 minutes or when you click Start New Document) and are never saved unless you explicitly choose Save to My Documents.";
var VALID_ANSWER_STYLES = /* @__PURE__ */ new Set([
  "short",
  "detailed",
  "step_by_step",
  "exam_ready",
  "simple"
]);
var VALID_QUESTION_TYPES = /* @__PURE__ */ new Set([
  "mcq",
  "short_answer",
  "long_answer",
  "numerical",
  "fill_blank",
  "true_false",
  "match",
  "diagram",
  "passage",
  "other"
]);
var ephemeralSessions = /* @__PURE__ */ new Map();
var RATE_WINDOW_MS = 10 * 60 * 1e3;
var MAX_REQUESTS_PER_IP2 = 35;
var ipRequestLog = /* @__PURE__ */ new Map();
function checkIpRateLimit2(ip) {
  const now = Date.now();
  const timestamps = (ipRequestLog.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (timestamps.length >= MAX_REQUESTS_PER_IP2) {
    ipRequestLog.set(ip, timestamps);
    return false;
  }
  timestamps.push(now);
  ipRequestLog.set(ip, timestamps);
  return true;
}
function purgeExpiredSessions() {
  const now = Date.now();
  for (const [id, session] of ephemeralSessions.entries()) {
    if (now >= session.expiresAtMs) {
      session.questions = [];
      session.solutionsByQuestionId = {};
      ephemeralSessions.delete(id);
    }
  }
}
var cleanupTimer = setInterval(purgeExpiredSessions, 5 * 60 * 1e3);
if (typeof cleanupTimer.unref === "function") {
  cleanupTimer.unref();
}
function sanitizeNumberLabel(raw, fallbackIndex) {
  const cleaned = String(raw || "").replace(/\}\s*\{[\s\S]*$/g, "").replace(/\\+"/g, "").replace(/["{}[\]]+/g, "").replace(/\s+/g, " ").trim().slice(0, 40);
  return cleaned || `Q${fallbackIndex + 1}`;
}
function mapSnapSolveGeminiError(err) {
  const mapped = mapGeminiHttpError(err, "SnapSolve AI");
  if (mapped.errorCode === "AI_UNAVAILABLE") {
    return {
      ...mapped,
      message: "Free Gemini AI servers are temporarily busy (HTTP 503) even after automatic retries. Your uploaded pages and any completed answers remain safe \u2014 please click Retry in a few seconds."
    };
  }
  return mapped;
}
function stripBase64DataUrlPrefix(raw) {
  const trimmed = String(raw || "").trim();
  const match = trimmed.match(/^data:([a-zA-Z0-9/+.-]+);base64,(.+)$/s);
  if (match) {
    return {
      embeddedMime: match[1].toLowerCase(),
      base64: match[2].replace(/\s+/g, "")
    };
  }
  return {
    base64: trimmed.replace(/\s+/g, "")
  };
}
function sanitizePortalRole(raw) {
  if (raw === "student" || raw === "teacher") return raw;
  return null;
}
function readHeaderValue(headers, name) {
  const target = name.toLowerCase();
  for (const [k, v] of Object.entries(headers || {})) {
    if (k.toLowerCase() === target) {
      return Array.isArray(v) ? String(v[0] || "").trim() : String(v || "").trim();
    }
  }
  return "";
}
async function resolveOptionalUid(authHeader) {
  const raw = Array.isArray(authHeader) ? authHeader[0] : authHeader;
  if (!raw || !raw.trim()) {
    return { uid: null };
  }
  const verified = await verifyBearerIdToken(raw);
  if (!verified.valid || !verified.uid) {
    return {
      uid: null,
      authError: {
        statusCode: verified.statusCode || 401,
        message: verified.error || "Invalid authentication token."
      }
    };
  }
  return { uid: verified.uid };
}
function verifySessionSecret(provided, expected) {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return crypto5.timingSafeEqual(a, b);
}
function getSnapSolveStatus() {
  const configured = Boolean(getConfiguredGeminiApiKey());
  return {
    configured,
    model: SNAPSOLVE_MODEL,
    fallbackModel: SNAPSOLVE_FALLBACK_MODEL,
    limits: {
      maxPages: SNAPSOLVE_MAX_PAGES,
      maxPageBytes: SNAPSOLVE_MAX_PAGE_BYTES,
      allowedFormats: ["JPG", "JPEG", "PNG", "WebP", "PDF"]
    },
    privacyNotice: SNAPSOLVE_PRIVACY_NOTICE,
    message: configured ? "SnapSolve AI (Free-Tier Gemini Vision) is ready." : "GEMINI_API_KEY is not configured on the server. Live SnapSolve scanning is disabled until configured."
  };
}
async function handleSnapSolveRecognize(body, headers, clientIp) {
  purgeExpiredSessions();
  if (!checkIpRateLimit2(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: "RATE_LIMITED",
        message: "Too many requests from this connection. Please wait a few minutes and retry."
      }
    };
  }
  const portalRole = sanitizePortalRole(body.portalRole);
  if (!portalRole) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: "INVALID_ROLE",
        message: 'Valid portalRole ("student" or "teacher") is required.'
      }
    };
  }
  const authCheck = await resolveOptionalUid(headers.authorization);
  if (authCheck.authError) {
    return {
      statusCode: authCheck.authError.statusCode,
      payload: {
        success: false,
        errorCode: "INVALID_AUTH",
        message: authCheck.authError.message
      }
    };
  }
  const rawPages = Array.isArray(body.pages) ? body.pages : [];
  if (rawPages.length === 0) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: "NO_PAGES",
        message: "Please upload at least one question image or PDF page."
      }
    };
  }
  if (rawPages.length > SNAPSOLVE_MAX_PAGES) {
    return {
      statusCode: 400,
      payload: {
        success: false,
        errorCode: "MAX_PAGES_EXCEEDED",
        message: `Maximum ${SNAPSOLVE_MAX_PAGES} pages allowed per SnapSolve document.`
      }
    };
  }
  const validatedPages = [];
  let totalDecodedBytes = 0;
  for (let idx = 0; idx < rawPages.length; idx += 1) {
    const item = rawPages[idx];
    const rawPageNum = Number(item?.pageNumber || idx + 1);
    const pageNumber = Number.isFinite(rawPageNum) && rawPageNum > 0 ? Math.floor(rawPageNum) : idx + 1;
    const { base64, embeddedMime } = stripBase64DataUrlPrefix(String(item?.base64Data || ""));
    const mimeType = String(item?.mimeType || embeddedMime || "").trim().toLowerCase();
    if (!SNAPSOLVE_ALLOWED_MIMES.has(mimeType)) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: "UNSUPPORTED_FORMAT",
          message: `Page ${pageNumber} uses an unsupported format. Allowed: JPG, JPEG, PNG, WebP (or PDF converted to pages).`
        }
      };
    }
    if (!base64 || base64.length < 32) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: "EMPTY_PAGE_DATA",
          message: `Page ${pageNumber} image data is empty or invalid.`
        }
      };
    }
    const decodedBytes = Math.floor(base64.length * 3 / 4);
    if (decodedBytes > SNAPSOLVE_MAX_PAGE_BYTES) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: "PAGE_TOO_LARGE",
          message: `Page ${pageNumber} exceeds the 5 MB per-page limit. Please compress or retake the photo.`
        }
      };
    }
    totalDecodedBytes += decodedBytes;
    if (totalDecodedBytes > 25 * 1024 * 1024) {
      return {
        statusCode: 400,
        payload: {
          success: false,
          errorCode: "PAYLOAD_TOO_LARGE",
          message: "Combined uploaded pages exceed the 25 MB document limit."
        }
      };
    }
    validatedPages.push({ pageNumber, mimeType, base64Data: base64 });
  }
  const apiKey = getConfiguredGeminiApiKey();
  if (!apiKey) {
    return {
      statusCode: 503,
      payload: {
        success: false,
        errorCode: "MISSING_GEMINI_API_KEY",
        message: "GEMINI_API_KEY is not configured on the server. Live question scanning is unavailable."
      }
    };
  }
  const subjectHint = String(body.subjectHint || "Auto-Detect").trim().slice(0, 80);
  const answerLanguageHint = String(body.answerLanguageHint || "Auto-Detect").trim().slice(0, 80);
  const systemPrompt = [
    "You are SnapSolve AI OCR & Question Extractor for Indian school & competitive education (English, Marathi & Hindi Devanagari, and Mathematics).",
    `Inspect EVERY SINGLE ONE of the ${validatedPages.length} attached page(s) strictly in sequential order (Page 1 through Page ${validatedPages.length}).`,
    "CRITICAL RULES:",
    `1. Do NOT stop early after Page 1 or the first 1-2 questions \u2014 extract ALL questions across ALL ${validatedPages.length} attached page(s) from top to bottom.`,
    '2. Preserve EVERY question, sub-question, MCQ option, fill-in-the-blank, table, equation, and original plain numbering label (e.g., "Q1", "1(a)", "Q.2 (i)", "\u092A\u094D\u0930. \u0967") in the EXACT sequence it appears.',
    "3. Output plain clean text for numberLabel with NO extra symbols, braces, or JSON metadata.",
    "4. NEVER merge two separate questions, NEVER reorder questions, and NEVER invent missing text.",
    "5. Support printed text, handwritten questions, Math Unicode symbols (\u221A, \u03C0, \u2211, \u2264, \u2265, \xD7, \xF7, \xB2, \xB3), Marathi & Hindi Devanagari script accurately.",
    "6. If a question is blurry, cut off, shadowed, or unreadable, STILL include an entry in its exact sequence position with isReadable=false and a clear unreadableReason rather than guessing or omitting it.",
    "7. If a question relies on a visual figure/diagram/geometry/chart, set hasDiagram=true and summarize visible labels in diagramDescription.",
    `Context Hints \u2014 Portal Role: ${portalRole}; Subject Hint: ${subjectHint}; Preferred Language Hint: ${answerLanguageHint}.`
  ].join("\n");
  const contentParts = [{ text: systemPrompt }];
  for (const page of validatedPages) {
    contentParts.push({
      text: `--- PAGE ${page.pageNumber} OF ${validatedPages.length} START ---`
    });
    contentParts.push({
      inlineData: {
        mimeType: page.mimeType,
        data: page.base64Data
      }
    });
  }
  try {
    const { response, parsedJson, modelUsed, attemptsMade, usedFallback } = await generateGeminiContentWithFallback(
      {
        contents: [
          {
            role: "user",
            parts: contentParts
          }
        ],
        config: {
          temperature: 0.1,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type3.OBJECT,
            properties: {
              detectedSubject: { type: Type3.STRING },
              detectedLanguage: { type: Type3.STRING },
              extractionWarnings: {
                type: Type3.ARRAY,
                items: { type: Type3.STRING }
              },
              questions: {
                type: Type3.ARRAY,
                items: {
                  type: Type3.OBJECT,
                  properties: {
                    order: { type: Type3.INTEGER },
                    numberLabel: { type: Type3.STRING },
                    pageNumber: { type: Type3.INTEGER },
                    questionText: { type: Type3.STRING },
                    questionType: {
                      type: Type3.STRING,
                      enum: [
                        "mcq",
                        "short_answer",
                        "long_answer",
                        "numerical",
                        "fill_blank",
                        "true_false",
                        "match",
                        "diagram",
                        "passage",
                        "other"
                      ]
                    },
                    options: {
                      type: Type3.ARRAY,
                      items: { type: Type3.STRING }
                    },
                    hasDiagram: { type: Type3.BOOLEAN },
                    diagramDescription: { type: Type3.STRING },
                    isReadable: { type: Type3.BOOLEAN },
                    unreadableReason: { type: Type3.STRING },
                    subquestions: {
                      type: Type3.ARRAY,
                      items: { type: Type3.STRING }
                    }
                  },
                  required: [
                    "order",
                    "numberLabel",
                    "pageNumber",
                    "questionText",
                    "questionType",
                    "isReadable"
                  ]
                }
              }
            },
            required: ["detectedSubject", "detectedLanguage", "questions"]
          }
        }
      },
      {
        apiKey,
        requireValidJson: true
      }
    );
    const parsed = parsedJson || safeParseGeminiJson(response.text || "");
    const rawQuestions = Array.isArray(parsed?.questions) ? parsed.questions : [];
    const sortedRawQuestions = rawQuestions.map((item, rawIdx) => ({ item, rawIdx })).sort((a, b) => {
      const qa = a.item || {};
      const qb = b.item || {};
      const pa = Math.max(1, Math.floor(Number(qa.pageNumber || 1)));
      const pb = Math.max(1, Math.floor(Number(qb.pageNumber || 1)));
      if (pa !== pb) return pa - pb;
      const oa = Number(qa.order);
      const ob = Number(qb.order);
      if (Number.isFinite(oa) && Number.isFinite(ob) && oa !== ob) {
        return oa - ob;
      }
      return a.rawIdx - b.rawIdx;
    }).map((entry) => entry.item);
    const normalizedQuestions = sortedRawQuestions.map((rawItem, idx) => {
      const q = rawItem || {};
      const rawType = String(q.questionType || "other").trim();
      const questionType = VALID_QUESTION_TYPES.has(rawType) ? rawType : "other";
      const pageNum = Math.min(
        validatedPages.length,
        Math.max(1, Math.floor(Number(q.pageNumber || 1)))
      );
      const isReadable = q.isReadable !== false;
      const numberLabel = sanitizeNumberLabel(q.numberLabel, idx);
      const questionText = String(q.questionText || "").trim().slice(0, 4e3);
      const options = Array.isArray(q.options) ? q.options.map((o) => String(o || "").trim()).filter(Boolean).slice(0, 10) : [];
      const subquestions = Array.isArray(q.subquestions) ? q.subquestions.map((s) => String(s || "").trim()).filter(Boolean).slice(0, 15) : [];
      return {
        id: `q_${idx + 1}_${crypto5.randomBytes(4).toString("hex")}`,
        order: idx + 1,
        numberLabel,
        pageNumber: pageNum,
        questionText: questionText || (isReadable ? `${numberLabel} (Empty text detected)` : `${numberLabel} (Unreadable section on Page ${pageNum})`),
        questionType,
        options,
        hasDiagram: Boolean(q.hasDiagram),
        diagramDescription: String(q.diagramDescription || "").trim().slice(0, 1e3),
        isReadable,
        unreadableReason: isReadable ? "" : String(
          q.unreadableReason || "Image clarity or lighting made this question unreadable. You can edit the text manually or retake the photo."
        ).trim().slice(0, 300),
        subquestions
      };
    });
    const warnings = Array.isArray(parsed?.extractionWarnings) ? parsed.extractionWarnings.map((w) => String(w || "").trim()).filter(Boolean).slice(0, 10) : [];
    if (normalizedQuestions.length === 0) {
      warnings.push(
        "No clear questions were detected on the uploaded pages. Please check lighting, rotate if sideways, or add clearer pages."
      );
    }
    const sessionId = `snap_${crypto5.randomBytes(12).toString("hex")}`;
    const sessionSecret = crypto5.randomBytes(24).toString("hex");
    const nowMs = Date.now();
    const session = {
      sessionId,
      sessionSecret,
      portalRole,
      ownerUid: authCheck.uid,
      createdAtMs: nowMs,
      expiresAtMs: nowMs + SNAPSOLVE_SESSION_TTL_MS,
      pageCount: validatedPages.length,
      detectedSubject: String(parsed?.detectedSubject || subjectHint || "General Studies").trim().slice(0, 80),
      detectedLanguage: String(parsed?.detectedLanguage || answerLanguageHint || "English").trim().slice(0, 60),
      extractionWarnings: warnings,
      questions: normalizedQuestions,
      solutionsByQuestionId: {}
    };
    ephemeralSessions.set(sessionId, session);
    return {
      statusCode: 200,
      payload: {
        success: true,
        sessionId,
        sessionSecret,
        expiresAt: new Date(session.expiresAtMs).toISOString(),
        portalRole,
        pageCount: validatedPages.length,
        detectedSubject: session.detectedSubject,
        detectedLanguage: session.detectedLanguage,
        extractionWarnings: session.extractionWarnings,
        questions: normalizedQuestions,
        modelUsed,
        attemptsMade,
        usedFallback,
        privacyNotice: SNAPSOLVE_PRIVACY_NOTICE
      }
    };
  } catch (err) {
    const mapped = mapSnapSolveGeminiError(err);
    return {
      statusCode: mapped.statusCode,
      payload: {
        success: false,
        errorCode: mapped.errorCode,
        retryable: mapped.retryable,
        retryAfterSeconds: mapped.retryAfterSeconds,
        attemptsMade: mapped.attemptsMade,
        message: mapped.message
      }
    };
  }
}
async function handleSnapSolveSolve(body, headers, clientIp) {
  purgeExpiredSessions();
  if (!checkIpRateLimit2(clientIp)) {
    return {
      statusCode: 429,
      payload: {
        success: false,
        errorCode: "RATE_LIMITED",
        message: "Too many requests from this connection. Please wait a few minutes and retry."
      }
    };
  }
  const sessionId = String(body.sessionId || "").trim();
  const session = ephemeralSessions.get(sessionId);
  if (!session) {
    return {
      statusCode: 404,
      payload: {
        success: false,
        errorCode: "SESSION_EXPIRED",
        message: "Your temporary SnapSolve session has expired or been cleared. Please scan or upload the pages again."
      }
    };
  }
  const providedSecret = readHeaderValue(headers, "x-snapsolve-secret");
  if (!verifySessionSecret(providedSecret, session.sessionSecret)) {
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: "FORBIDDEN_SESSION",
        message: "Unauthorized access to SnapSolve session."
      }
    };
  }
  if (session.ownerUid) {
    const authCheck = await resolveOptionalUid(headers.authorization);
    if (authCheck.authError || authCheck.uid !== session.ownerUid) {
      return {
        statusCode: 403,
        payload: {
          success: false,
          errorCode: "UID_MISMATCH",
          message: "This SnapSolve session belongs to a different signed-in account."
        }
      };
    }
  }
  const portalRole = sanitizePortalRole(body.portalRole) || session.portalRole;
  if (portalRole !== session.portalRole) {
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: "ROLE_MISMATCH",
        message: "Student and Teacher SnapSolve sessions are isolated and cannot be crossed."
      }
    };
  }
  const subject = String(body.subject || session.detectedSubject || "General Studies").trim().slice(0, 80);
  const answerLanguage = String(body.answerLanguage || "Auto-Detect (Same as Question)").trim().slice(0, 80);
  const rawStyle = String(body.answerStyle || "step_by_step").trim();
  const answerStyle = VALID_ANSWER_STYLES.has(rawStyle) ? rawStyle : "step_by_step";
  const rawEditedQuestions = Array.isArray(body.questions) ? body.questions : session.questions;
  const normalizedQuestions = rawEditedQuestions.slice(0, 60).map((item, idx) => {
    const q = item || {};
    const rawType = String(q.questionType || "other").trim();
    return {
      id: String(q.id || `q_${idx + 1}`).trim().slice(0, 64),
      order: idx + 1,
      numberLabel: String(q.numberLabel || `Q${idx + 1}`).trim().slice(0, 40) || `Q${idx + 1}`,
      pageNumber: Math.max(1, Math.floor(Number(q.pageNumber || 1))),
      questionText: String(q.questionText || "").trim().slice(0, 4e3),
      questionType: VALID_QUESTION_TYPES.has(rawType) ? rawType : "other",
      options: Array.isArray(q.options) ? q.options.map((o) => String(o || "").trim()).filter(Boolean).slice(0, 10) : [],
      hasDiagram: Boolean(q.hasDiagram),
      diagramDescription: String(q.diagramDescription || "").trim().slice(0, 1e3),
      isReadable: q.isReadable !== false,
      unreadableReason: String(q.unreadableReason || "").trim().slice(0, 300),
      subquestions: Array.isArray(q.subquestions) ? q.subquestions.map((s) => String(s || "").trim()).filter(Boolean).slice(0, 15) : []
    };
  });
  session.questions = normalizedQuestions;
  const targetIdsSet = Array.isArray(body.targetQuestionIds) && body.targetQuestionIds.length > 0 ? new Set(body.targetQuestionIds.map((id) => String(id || "").trim()).filter(Boolean)) : null;
  const questionsToProcess = targetIdsSet ? normalizedQuestions.filter((q) => targetIdsSet.has(q.id)) : normalizedQuestions;
  const readableBatchQueue = [];
  for (const q of questionsToProcess) {
    if (!q.isReadable || !q.questionText.trim()) {
      session.solutionsByQuestionId[q.id] = {
        questionId: q.id,
        order: q.order,
        numberLabel: q.numberLabel,
        pageNumber: q.pageNumber,
        questionText: q.questionText,
        status: "unreadable",
        shortAnswer: "",
        answerText: "",
        steps: [],
        finalAnswer: "",
        teachingNote: "",
        errorMessage: q.unreadableReason || "Marked unreadable because the scanned image was unclear or empty. Edit the question text to solve it.",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
    } else {
      readableBatchQueue.push(q);
    }
  }
  let lastModelUsed = SNAPSOLVE_MODEL;
  let totalAttemptsMade = 0;
  let batchFailure = null;
  if (readableBatchQueue.length > 0) {
    const apiKey = getConfiguredGeminiApiKey();
    if (!apiKey) {
      return {
        statusCode: 503,
        payload: {
          success: false,
          errorCode: "MISSING_GEMINI_API_KEY",
          retryable: false,
          message: "GEMINI_API_KEY is not configured on the server."
        }
      };
    }
    const BATCH_SIZE = 6;
    const styleInstructionMap = {
      short: "Short Answers: Crisp 1-3 sentence direct answer. For MCQs give option + brief reason; for Maths keep only key formula & final value.",
      detailed: "Detailed Answers: Thorough multi-part conceptual explanation covering definitions, formulas, reasoning, and complete solution.",
      step_by_step: 'Step-by-Step Solutions: Populate "steps" array with clear numbered logical steps leading cleanly to a highlighted "finalAnswer".',
      exam_ready: "Exam-Ready Answers: Structured board/competitive exam presentation (Given, Formula/Principle, Working/Key Points, Conclusion) formatted for full marks.",
      simple: "Simple Explanations for Students: Friendly, easy-to-understand everyday wording suitable for school learners with zero confusing jargon."
    };
    const getLanguageGuidance = (lang) => {
      const lower = lang.toLowerCase();
      if (lower.includes("bilingual") && lower.includes("marathi")) {
        return 'Language Rule: Provide BILINGUAL output (English + Marathi Devanagari script). In "answerText", "steps", and "finalAnswer", clearly include BOTH English and Marathi (\u092E\u0930\u093E\u0920\u0940) explanations side-by-side or paired cleanly.';
      }
      if (lower.includes("bilingual") && lower.includes("hindi")) {
        return 'Language Rule: Provide BILINGUAL output (English + Hindi Devanagari script). In "answerText", "steps", and "finalAnswer", clearly include BOTH English and Hindi (\u0939\u093F\u0928\u094D\u0926\u0940) explanations side-by-side or paired cleanly.';
      }
      if (lower === "marathi" || lower.includes("\u092E\u0930\u093E\u0920\u0940")) {
        return 'Language Rule: Write ALL explanations, "steps", "answerText", "shortAnswer", and "finalAnswer" in strict, natural Marathi (\u092E\u0930\u093E\u0920\u0940 Devanagari: \u0906\u0939\u0947, \u0906\u0939\u0947\u0924, \u0915\u0930\u093E) \u2014 NEVER mix Hindi words like \u0939\u0948/\u0939\u0948\u0902 even if the question text is in English or Hindi. Preserve mathematical numbers/symbols accurately.';
      }
      if (lower === "hindi" || lower.includes("\u0939\u093F\u0928\u094D\u0926\u0940")) {
        return 'Language Rule: Write ALL explanations, "steps", "answerText", "shortAnswer", and "finalAnswer" in strict, natural Hindi (\u0939\u093F\u0928\u094D\u0926\u0940 Devanagari: \u0939\u0948, \u0939\u0948\u0902, \u0915\u0930\u0947\u0902) \u2014 NEVER mix Marathi words like \u0906\u0939\u0947/\u0915\u0930\u0942\u0928 even if the question text is in English or Marathi. Preserve mathematical numbers/symbols accurately.';
      }
      if (lower === "english") {
        return 'Language Rule: Write ALL explanations, "steps", "answerText", "shortAnswer", and "finalAnswer" in clear English.';
      }
      return "Language Rule: Auto-detect EACH question's language independently and answer ONLY in that question's own language (strict Marathi for Marathi questions, strict Hindi for Hindi questions, English for English questions \u2014 never bleed words across questions).";
    };
    for (let start = 0; start < readableBatchQueue.length; start += BATCH_SIZE) {
      const chunk = readableBatchQueue.slice(start, start + BATCH_SIZE);
      const roleGuidance = portalRole === "teacher" ? "Role: Teacher Educator Answer Key. Also populate teachingNote with a brief 1-2 line marking/classroom verification cue or common mistake to watch for." : "Role: Student Learning Companion. Make explanations encouraging, crystal clear, and leave teachingNote empty string unless a quick study tip helps.";
      const prompt = [
        `You are solving school/exam questions accurately for MyStudyZone SnapSolve AI.`,
        `Subject: ${subject}`,
        `Requested Answer Language: ${answerLanguage}`,
        getLanguageGuidance(answerLanguage),
        `Answer Style: ${styleInstructionMap[answerStyle]}`,
        roleGuidance,
        "STRICT ACCURACY RULES:",
        '- Return one solution object for EVERY question in the input list below, copying its exact "questionId" verbatim.',
        "- NEVER skip, combine, or reorder questions. Maintain exact question numbering.",
        '- For Mathematics, Arithmetic, Algebra, Geometry, Trigonometry, Physics/Chemistry numericals: ALWAYS populate "steps" array with explicit step-by-step working (Given -> Formula -> Substitution -> Calculation -> Result) AND put the exact final result in "finalAnswer".',
        "- Keep Devanagari (Marathi/Hindi) script and Unicode math symbols (\xD7, \xF7, \xB2, \xB3, \u221A, \u03C0, \u2220, \xB0) intact.",
        "",
        "INPUT QUESTIONS:",
        JSON.stringify(
          chunk.map((q) => ({
            questionId: q.id,
            order: q.order,
            numberLabel: q.numberLabel,
            questionType: q.questionType,
            questionText: q.questionText,
            options: q.options,
            diagramDescription: q.diagramDescription,
            subquestions: q.subquestions
          }))
        )
      ].join("\n");
      try {
        const solveConfig = {
          temperature: 0.2,
          maxOutputTokens: 8192,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type3.OBJECT,
            properties: {
              solutions: {
                type: Type3.ARRAY,
                items: {
                  type: Type3.OBJECT,
                  properties: {
                    questionId: { type: Type3.STRING },
                    shortAnswer: { type: Type3.STRING },
                    answerText: { type: Type3.STRING },
                    steps: {
                      type: Type3.ARRAY,
                      items: { type: Type3.STRING }
                    },
                    finalAnswer: { type: Type3.STRING },
                    teachingNote: { type: Type3.STRING }
                  },
                  required: ["questionId", "answerText", "finalAnswer"]
                }
              }
            },
            required: ["solutions"]
          }
        };
        const firstCall = await generateGeminiContentWithFallback(
          {
            contents: prompt,
            config: solveConfig
          },
          {
            apiKey,
            requireValidJson: true,
            validateJson: (candidate) => Array.isArray(candidate.solutions) && candidate.solutions.length > 0
          }
        );
        lastModelUsed = firstCall.modelUsed;
        totalAttemptsMade += firstCall.attemptsMade;
        const parsed = firstCall.parsedJson || safeParseGeminiJson(firstCall.response.text || "");
        const returnedList = Array.isArray(parsed?.solutions) ? parsed.solutions : [];
        const byId = /* @__PURE__ */ new Map();
        const usedRowIndices = /* @__PURE__ */ new Set();
        returnedList.forEach((row, rIdx) => {
          if (row && typeof row === "object") {
            const qid = String(row.questionId || "").trim();
            if (qid) byId.set(qid, row);
          }
          void rIdx;
        });
        for (let chunkIdx = 0; chunkIdx < chunk.length; chunkIdx += 1) {
          const q = chunk[chunkIdx];
          let match = byId.get(q.id);
          if (!match) {
            const prefixIdx = returnedList.findIndex((row, idx) => {
              if (usedRowIndices.has(idx) || !row || typeof row !== "object") return false;
              const rowObj = row;
              const rowId = String(rowObj.questionId || "").trim();
              return rowId === `q_${q.order}` || rowId === String(q.order) || rowId === q.numberLabel || q.id.includes("_") && rowId.startsWith(`q_${q.order}_`);
            });
            if (prefixIdx >= 0) {
              usedRowIndices.add(prefixIdx);
              match = returnedList[prefixIdx];
            } else if (returnedList.length === chunk.length && returnedList[chunkIdx] && typeof returnedList[chunkIdx] === "object" && !usedRowIndices.has(chunkIdx)) {
              usedRowIndices.add(chunkIdx);
              match = returnedList[chunkIdx];
            } else if (chunk.length === 1 && returnedList.length === 1 && returnedList[0] && typeof returnedList[0] === "object") {
              usedRowIndices.add(0);
              match = returnedList[0];
            }
          } else {
            const exactIdx = returnedList.indexOf(match);
            if (exactIdx >= 0) usedRowIndices.add(exactIdx);
          }
          const answerText = String(match?.answerText || "").trim();
          const finalAnswer = String(match?.finalAnswer || "").trim();
          if (!match || !answerText && !finalAnswer) {
            session.solutionsByQuestionId[q.id] = {
              questionId: q.id,
              order: q.order,
              numberLabel: q.numberLabel,
              pageNumber: q.pageNumber,
              questionText: q.questionText,
              status: "failed",
              shortAnswer: "",
              answerText: "",
              steps: [],
              finalAnswer: "",
              teachingNote: "",
              errorMessage: "AI did not return a complete answer for this question. Click Retry on this item.",
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            };
            continue;
          }
          const steps = Array.isArray(match.steps) ? match.steps.map((s) => String(s || "").trim()).filter(Boolean).slice(0, 30) : [];
          session.solutionsByQuestionId[q.id] = {
            questionId: q.id,
            order: q.order,
            numberLabel: q.numberLabel,
            pageNumber: q.pageNumber,
            questionText: q.questionText,
            status: "solved",
            shortAnswer: String(match.shortAnswer || finalAnswer || "").trim().slice(0, 600),
            answerText: answerText.slice(0, 6e3),
            steps,
            finalAnswer: (finalAnswer || String(match.shortAnswer || "")).trim().slice(0, 800),
            teachingNote: String(match.teachingNote || "").trim().slice(0, 800),
            errorMessage: "",
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
        }
      } catch (err) {
        const mapped = mapSnapSolveGeminiError(err);
        totalAttemptsMade += mapped.attemptsMade || 1;
        batchFailure = {
          statusCode: mapped.statusCode,
          errorCode: mapped.errorCode,
          retryable: mapped.retryable,
          retryAfterSeconds: mapped.retryAfterSeconds,
          message: mapped.message
        };
        const remainingItems = readableBatchQueue.slice(start);
        for (const q of remainingItems) {
          session.solutionsByQuestionId[q.id] = {
            questionId: q.id,
            order: q.order,
            numberLabel: q.numberLabel,
            pageNumber: q.pageNumber,
            questionText: q.questionText,
            status: "failed",
            shortAnswer: "",
            answerText: "",
            steps: [],
            finalAnswer: "",
            teachingNote: "",
            errorMessage: mapped.message,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
        }
        break;
      }
    }
  }
  session.expiresAtMs = Date.now() + SNAPSOLVE_SESSION_TTL_MS;
  const orderedSolutions = normalizedQuestions.map((q) => {
    const existing = session.solutionsByQuestionId[q.id];
    if (existing) {
      return {
        ...existing,
        order: q.order,
        numberLabel: q.numberLabel,
        pageNumber: q.pageNumber,
        questionText: q.questionText
      };
    }
    return {
      questionId: q.id,
      order: q.order,
      numberLabel: q.numberLabel,
      pageNumber: q.pageNumber,
      questionText: q.questionText,
      status: q.isReadable ? "failed" : "unreadable",
      shortAnswer: "",
      answerText: "",
      steps: [],
      finalAnswer: "",
      teachingNote: "",
      errorMessage: q.isReadable ? "Not yet solved." : q.unreadableReason || "Question image unreadable.",
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  });
  const stats = {
    total: orderedSolutions.length,
    solved: orderedSolutions.filter((s) => s.status === "solved").length,
    failed: orderedSolutions.filter((s) => s.status === "failed").length,
    unreadable: orderedSolutions.filter((s) => s.status === "unreadable").length
  };
  if (batchFailure) {
    if (stats.solved === 0) {
      return {
        statusCode: batchFailure.statusCode,
        payload: {
          success: false,
          errorCode: batchFailure.errorCode,
          retryable: batchFailure.retryable,
          retryAfterSeconds: batchFailure.retryAfterSeconds,
          attemptsMade: totalAttemptsMade,
          message: batchFailure.message,
          questions: session.questions,
          solutions: orderedSolutions,
          stats
        }
      };
    }
    return {
      statusCode: 200,
      payload: {
        success: true,
        partialFailure: true,
        errorCode: batchFailure.errorCode,
        retryable: batchFailure.retryable,
        retryAfterSeconds: batchFailure.retryAfterSeconds,
        attemptsMade: totalAttemptsMade,
        warningMessage: batchFailure.message,
        sessionId: session.sessionId,
        expiresAt: new Date(session.expiresAtMs).toISOString(),
        subject,
        answerLanguage,
        answerStyle,
        modelUsed: lastModelUsed,
        questions: session.questions,
        solutions: orderedSolutions,
        stats
      }
    };
  }
  return {
    statusCode: 200,
    payload: {
      success: true,
      sessionId: session.sessionId,
      expiresAt: new Date(session.expiresAtMs).toISOString(),
      subject,
      answerLanguage,
      answerStyle,
      modelUsed: lastModelUsed,
      attemptsMade: totalAttemptsMade,
      questions: session.questions,
      solutions: orderedSolutions,
      stats
    }
  };
}
async function handleSnapSolveDeleteSession(sessionId, headers) {
  purgeExpiredSessions();
  const cleanId = String(sessionId || "").trim();
  const session = ephemeralSessions.get(cleanId);
  if (!session) {
    return {
      statusCode: 200,
      payload: {
        success: true,
        cleared: true,
        message: "Temporary SnapSolve session already cleared."
      }
    };
  }
  const providedSecret = readHeaderValue(headers, "x-snapsolve-secret");
  if (!verifySessionSecret(providedSecret, session.sessionSecret)) {
    return {
      statusCode: 403,
      payload: {
        success: false,
        errorCode: "FORBIDDEN_SESSION",
        message: "Unauthorized session cleanup request."
      }
    };
  }
  if (session.ownerUid) {
    const authCheck = await resolveOptionalUid(headers.authorization);
    if (authCheck.authError || authCheck.uid !== session.ownerUid) {
      return {
        statusCode: 403,
        payload: {
          success: false,
          errorCode: "UID_MISMATCH",
          message: "This SnapSolve session belongs to a different signed-in account."
        }
      };
    }
  }
  session.questions = [];
  session.solutionsByQuestionId = {};
  ephemeralSessions.delete(cleanId);
  return {
    statusCode: 200,
    payload: {
      success: true,
      cleared: true,
      message: "Temporary uploaded pages and session answers cleared from server memory."
    }
  };
}

// server.ts
dotenv3.config();
var app = express();
var PORT = parseInt(process.env.PORT || "3000", 10);
app.use(compression({ threshold: 1024 }));
var transactionLedger = [];
var processedPaymentIds = /* @__PURE__ */ new Set();
var processedOrderIds = /* @__PURE__ */ new Set();
var STATIC_TRUSTED_ORIGINS = /* @__PURE__ */ new Set([
  "https://mystudyzone.in",
  "https://www.mystudyzone.in",
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  ...(process.env.ALLOWED_ORIGINS || "").split(",").map((o) => o.trim().replace(/\/+$/, "")).filter(Boolean)
]);
function resolveTrustedCorsOrigin(rawOrigin) {
  const origin = (Array.isArray(rawOrigin) ? rawOrigin[0] : rawOrigin || "").trim().replace(/\/+$/, "");
  if (!origin) return null;
  if (STATIC_TRUSTED_ORIGINS.has(origin)) return origin;
  if (/^https:\/\/ais-(dev|pre)-[a-z0-9-]+\.[a-z0-9-]+\.run\.app$/i.test(origin)) {
    return origin;
  }
  if (/^https:\/\/([a-z0-9-]+--)?[a-z0-9-]+\.netlify\.app$/i.test(origin)) {
    return origin;
  }
  return null;
}
app.use((req, res, next) => {
  const rawOrigin = req.headers.origin;
  const trustedOrigin = resolveTrustedCorsOrigin(rawOrigin);
  res.setHeader("Vary", "Origin");
  if (trustedOrigin) {
    res.setHeader("Access-Control-Allow-Origin", trustedOrigin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Razorpay-Signature, x-session-id, x-device-id, x-device-signature, x-hardware-signature, x-snapsolve-secret"
  );
  if (req.method === "OPTIONS") {
    if (rawOrigin && !trustedOrigin) {
      return res.status(403).json({ success: false, error: "Origin not allowed by CORS policy." });
    }
    return res.status(204).end();
  }
  if (req.url.startsWith("/.netlify/functions/api")) {
    req.url = req.url.replace(/^\/\.netlify\/functions\/api/, "/api") || "/api";
  }
  next();
});
app.use("/api/razorpay/webhook", express.raw({ type: "application/json" }));
app.use("/functions/webhook", express.raw({ type: "application/json" }));
app.use("/api/razorpayx/webhook", express.raw({ type: "application/json" }));
app.use("/api/snapsolve", express.json({ limit: "30mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, _res, next) => {
  runWithRequestBearerToken(req.headers.authorization, () => {
    next();
  });
});
app.get("/api/razorpay/config", (_req, res) => {
  const creds = getResolvedRazorpayCredentials();
  res.json({
    success: true,
    keyId: creds.keyId || "rzp_test_VACATION_CHAMP",
    isLive: creds.isLive,
    mode: creds.isLive ? "LIVE" : "TEST",
    configured: creds.isConfigured,
    currency: "INR",
    plans: {
      premium: {
        id: "premium",
        name: "PREMIUM PLAN \u2013 \u20B999 \u2013 365 Days (1 Year)",
        amount: 99,
        amountPaise: 9900,
        currency: "INR",
        durationDays: 365
      }
    },
    catalog: PLAN_CATALOG
  });
});
app.post("/api/razorpay/create-order", async (req, res) => {
  try {
    const rawPlan = req.body.planId || req.body.plan || "premium";
    const rawSku = req.body.planSku;
    const planSku = resolvePlanSku(rawSku, rawPlan);
    if (rawSku && !isValidPlanSku(rawSku)) {
      return res.status(400).json({ success: false, error: `Invalid plan SKU requested: ${String(rawSku)}` });
    }
    const planId = rawPlan === "premium" || isValidPlanSku(planSku) ? "premium" : null;
    const { studentId, studentName, email, mobile, selectedBoard, board, selectedClass, classLevel, referralCode } = req.body;
    const normalizedBoard = normalizeBackendBoard(selectedBoard || board);
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || void 0;
    if (!studentId) {
      return res.status(400).json({ success: false, error: "Student authentication required." });
    }
    if (!planId) {
      return res.status(400).json({ success: false, error: "Invalid plan selected." });
    }
    try {
      const orderPayload = await createRazorpayOrderBackend({
        planId,
        planSku,
        studentId: String(studentId),
        studentName,
        email,
        mobile,
        selectedBoard: normalizedBoard,
        selectedClass: normalizedClass,
        referralCode: referralCode ? String(referralCode).trim() : void 0
      });
      console.log(
        `[Razorpay ${orderPayload.mode}] Created order: ${orderPayload.orderId} | SKU: ${planSku} | Student: ${studentId} (${normalizedBoard} \u2022 ${normalizedClass || "default"}) (\u20B9${orderPayload.amountRupees} / ${orderPayload.amount} paise)`
      );
      return res.json(orderPayload);
    } catch (rzpError) {
      console.error("[Razorpay API Error creating order]:", rzpError);
      return res.status(502).json({
        success: false,
        error: rzpError?.error?.description || rzpError?.message || "Razorpay order creation failed. Please verify API credentials."
      });
    }
  } catch (error) {
    console.error("[Create Order Error]:", error);
    return res.status(500).json({ success: false, error: "Internal server error during order creation." });
  }
});
app.post("/api/razorpay/create-qr", async (req, res) => {
  try {
    const rawPlan = req.body.planId || req.body.plan || "premium";
    const rawSku = req.body.planSku;
    const planSku = resolvePlanSku(rawSku, rawPlan);
    if (rawSku && !isValidPlanSku(rawSku)) {
      return res.status(400).json({ success: false, error: `Invalid plan SKU requested: ${String(rawSku)}` });
    }
    const planId = rawPlan === "premium" || isValidPlanSku(planSku) ? "premium" : null;
    const { studentId, studentName, email, mobile, selectedBoard, board, selectedClass, classLevel, referralCode } = req.body;
    const normalizedBoard = normalizeBackendBoard(selectedBoard || board);
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || void 0;
    if (!studentId) {
      return res.status(400).json({ success: false, error: "Student authentication required." });
    }
    if (!planId) {
      return res.status(400).json({ success: false, error: "Invalid plan selected." });
    }
    const qrPayload = await createRazorpayQrCodeBackend({
      planId,
      planSku,
      studentId: String(studentId),
      studentName,
      email,
      mobile,
      selectedBoard: normalizedBoard,
      selectedClass: normalizedClass,
      referralCode: referralCode ? String(referralCode).trim() : void 0
    });
    console.log(`[Razorpay QR] Dynamic QR code created: ${qrPayload.qrId} | SKU: ${planSku} | Student: ${studentId} (${normalizedBoard} \u2022 ${normalizedClass || "default"}) (\u20B9${qrPayload.amountRupees})`);
    return res.json(qrPayload);
  } catch (error) {
    console.error("[Create QR Error]:", error);
    return res.status(502).json({
      success: false,
      error: error?.message || "Razorpay QR Code creation failed."
    });
  }
});
app.get("/api/razorpay/qr-status/:qrId", async (req, res) => {
  try {
    const { qrId } = req.params;
    const {
      studentId,
      planId,
      planSku,
      studentName,
      email,
      mobile,
      selectedBoard,
      board,
      selectedClass,
      classLevel,
      referralCode
    } = req.query;
    const normalizedBoard = selectedBoard || board ? normalizeBackendBoard(selectedBoard || board) : void 0;
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || void 0;
    const requestedSku = resolvePlanSku(planSku, planId);
    if (!qrId) {
      return res.status(400).json({ success: false, error: "QR Code ID is required." });
    }
    const statusResult = await checkRazorpayQrCodeStatusBackend({
      qrId: String(qrId),
      studentId: String(studentId || "student"),
      planId: "premium",
      planSku: requestedSku,
      studentName,
      email,
      mobile,
      selectedBoard: normalizedBoard,
      selectedClass: normalizedClass,
      referralCode: referralCode ? String(referralCode).trim() : void 0
    });
    if (statusResult.paid && statusResult.status === "PAID") {
      const paidSku = resolvePlanSku(
        statusResult.planSku || statusResult.membership?.planSku,
        requestedSku,
        statusResult.amount || statusResult.membership?.amount
      );
      const catalogItem = getPlanCatalogItem(paidSku);
      const isCategoryPlan = catalogItem.unlockedCategories.length > 0;
      if (studentId) {
        await evaluateServerSubscriptionFromStore(String(studentId));
        const cached = serverStudentSubscriptions.get(String(studentId));
        if (cached && statusResult.membership) {
          if (isCategoryPlan) {
            const existingCatMap = { ...cached.categorySubscriptions || {} };
            const nowIso = (/* @__PURE__ */ new Date()).toISOString();
            for (const catId of catalogItem.unlockedCategories) {
              existingCatMap[catId] = {
                categoryId: catId,
                planSku: paidSku,
                status: "ACTIVE",
                purchasedAt: statusResult.membership.startDate,
                expiresAt: statusResult.membership.expiryDate,
                paymentId: String(statusResult.paymentId || ""),
                orderId: String(statusResult.orderId || qrId),
                amountInr: catalogItem.amountInr,
                validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
                updatedAt: nowIso
              };
            }
            const updatedDraft = {
              ...cached,
              plan: "premium",
              categorySubscriptions: existingCatMap,
              activatedCategoryKeys: Object.keys(existingCatMap),
              isLifetimeFree: false,
              planPurchasedAt: cached.planPurchasedAt || statusResult.membership.startDate,
              planExpiresAt: cached.planExpiresAt && cached.planExpiresAt > statusResult.membership.expiryDate ? cached.planExpiresAt : statusResult.membership.expiryDate,
              paymentId: String(statusResult.paymentId || ""),
              updatedAt: nowIso
            };
            serverStudentSubscriptions.set(String(studentId), updatedDraft);
          } else {
            const paidBoard = normalizeBackendBoard(
              statusResult.selectedBoard || normalizedBoard || cached.selectedBoard
            );
            const paidClass = normalizeBackendClassLevel(statusResult.selectedClass || normalizedClass) || cached.selectedClass || "Class 1";
            const paidKey = buildBackendBoardClassKey(paidBoard, paidClass);
            const updatedMap = {
              ...cached.classSubscriptions || {},
              [paidKey]: {
                board: paidBoard,
                classLevel: paidClass,
                boardClassKey: paidKey,
                plan: "premium",
                status: "ACTIVE",
                purchasedAt: statusResult.membership.startDate,
                expiresAt: statusResult.membership.expiryDate,
                paymentId: String(statusResult.paymentId || ""),
                orderId: String(statusResult.orderId || qrId),
                amountInr: catalogItem.amountInr,
                validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
                updatedAt: (/* @__PURE__ */ new Date()).toISOString()
              }
            };
            const updatedDraft = {
              ...cached,
              plan: "premium",
              selectedBoard: paidBoard,
              selectedClass: paidClass,
              primaryBoard: cached.primaryBoard || cached.selectedBoard || paidBoard,
              primaryClassLevel: cached.primaryClassLevel || cached.selectedClass || paidClass,
              activatedBoard: paidBoard,
              activatedClassLevel: paidClass,
              classSubscriptions: updatedMap,
              isLifetimeFree: false,
              planPurchasedAt: statusResult.membership.startDate,
              planExpiresAt: statusResult.membership.expiryDate,
              paymentId: String(statusResult.paymentId || ""),
              updatedAt: (/* @__PURE__ */ new Date()).toISOString()
            };
            updatedDraft.activatedClassKeys = getServerActivatedBoardClassKeys(updatedDraft);
            updatedDraft.activatedClasses = getServerActivatedClasses(updatedDraft);
            serverStudentSubscriptions.set(String(studentId), updatedDraft);
          }
        }
      }
      const activeReferralCode = referralCode || statusResult.referralCode;
      if (activeReferralCode && typeof activeReferralCode === "string") {
        try {
          const attribution = await processReferralPurchase({
            referralCode: activeReferralCode,
            buyerStudentId: String(studentId),
            buyerStudentName: String(studentName || "Student"),
            buyerEmail: String(email || ""),
            buyerMobile: String(mobile || ""),
            planId: "premium",
            orderId: String(statusResult.orderId || qrId),
            paymentId: String(statusResult.paymentId)
          });
          if (attribution.credited) {
            console.log(`[QR Referral Credited] Code: ${activeReferralCode} | Referrer: ${attribution.referrerName} (+\u20B9${attribution.referrerReward})`);
            statusResult.referral = attribution;
          }
        } catch (refErr) {
          console.error("[QR Referral Crediting Error]:", refErr);
        }
      }
    }
    return res.json(statusResult);
  } catch (error) {
    console.error("[Check QR Status Error]:", error);
    return res.status(500).json({
      success: false,
      error: error?.message || "Failed to check QR code payment status."
    });
  }
});
app.post("/api/razorpay/verify-payment", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      planId,
      planSku: requestedPlanSku,
      studentId,
      studentName,
      email,
      mobile,
      selectedBoard,
      board,
      selectedClass,
      classLevel,
      method = "UPI",
      currentExpiresAt,
      referralCode
    } = req.body;
    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({
        success: false,
        error: "Incomplete transaction information. Missing order or payment ID."
      });
    }
    if (!studentId) {
      return res.status(400).json({
        success: false,
        error: "Student identification missing. Cannot activate membership without verified student account."
      });
    }
    if (planId !== "premium" && !requestedPlanSku) {
      return res.status(400).json({
        success: false,
        error: "Valid Premium or Category Plan SKU is required for verification."
      });
    }
    const candidatePlanSku = requestedPlanSku ? resolvePlanSku(requestedPlanSku, planId) : void 0;
    if (processedPaymentIds.has(razorpay_payment_id) || processedOrderIds.has(razorpay_order_id)) {
      const existing = transactionLedger.find(
        (t) => t.paymentId === razorpay_payment_id || t.orderId === razorpay_order_id
      );
      if (existing && existing.studentId && existing.studentId !== String(studentId).trim()) {
        return res.status(403).json({
          success: false,
          error: "This payment/order belongs to another student account."
        });
      }
      console.warn(`[Razorpay] Duplicate payment verification blocked for Payment: ${razorpay_payment_id} / Order: ${razorpay_order_id}`);
      const existingSub = serverStudentSubscriptions.get(String(studentId));
      const existingValidity = evaluateSubscriptionValidity(
        "premium",
        existing?.membershipStartDate || existingSub?.planPurchasedAt,
        existing?.membershipExpiryDate || existingSub?.planExpiresAt
      );
      return res.json({
        success: true,
        alreadyProcessed: true,
        planSku: existing?.planSku || candidatePlanSku,
        activatedCategoryKeys: existingSub?.activatedCategoryKeys || [],
        categorySubscriptions: existingSub?.categorySubscriptions || {},
        selectedBoard: existing?.selectedBoard || existingSub?.activatedBoard || existingSub?.selectedBoard || "Maharashtra",
        selectedClass: existing?.selectedClass || existingSub?.activatedClassLevel,
        transaction: existing,
        membership: existing ? {
          membershipId: `mem_${existing.id}`,
          studentId: existing.studentId,
          studentName: existing.studentName,
          selectedBoard: existing.selectedBoard || "Maharashtra",
          selectedClass: existing.selectedClass,
          planId: existing.planId,
          planSku: existing.planSku,
          activatedCategoryKeys: existingSub?.activatedCategoryKeys || [],
          categorySubscriptions: existingSub?.categorySubscriptions || {},
          planTitle: existing.planTitle,
          amount: existing.amount,
          startDate: existingValidity.purchaseDateIst || existing.membershipStartDate || "",
          expiryDate: existingValidity.expiryDateIst || existing.membershipExpiryDate || existingSub?.planExpiresAt || "",
          status: "ACTIVE",
          paymentId: existing.paymentId,
          orderId: existing.orderId,
          daysRemaining: existingValidity.daysRemaining ?? PAID_SUBSCRIPTION_VALIDITY_DAYS
        } : void 0,
        message: "This payment has already been verified and activated."
      });
    }
    const creds = getResolvedRazorpayCredentials();
    if (!creds.isConfigured || !creds.keySecret) {
      return res.status(500).json({
        success: false,
        error: "Razorpay LIVE API credentials are not configured on the server."
      });
    }
    if (!razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: "Missing Razorpay cryptographic payment signature."
      });
    }
    const expectedSignature = crypto6.createHmac("sha256", creds.keySecret).update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
    const expectedBuf = Buffer.from(expectedSignature, "utf8");
    const providedBuf = Buffer.from(String(razorpay_signature).trim(), "utf8");
    const isSignatureValid = expectedBuf.length === providedBuf.length && crypto6.timingSafeEqual(expectedBuf, providedBuf);
    if (!isSignatureValid) {
      console.log(`[Razorpay Signature Mismatch] Order: ${razorpay_order_id}, Payment: ${razorpay_payment_id}`);
      return res.status(400).json({
        success: false,
        error: "Cryptographic payment signature mismatch. Payment verification failed."
      });
    }
    let capturedMethod = method;
    const captureStatus = await verifyAndConfirmCapturedPayment({
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      expectedPlanId: "premium",
      expectedPlanSku: candidatePlanSku,
      fallbackMethod: method,
      autoCaptureIfAuthorized: true
    });
    if (!captureStatus.confirmed) {
      return res.status(400).json({
        success: false,
        error: captureStatus.error || `Payment ${razorpay_payment_id} was not confirmed as captured by Razorpay API. Subscription was not activated.`
      });
    }
    const notesStudentId = String(
      captureStatus.notes?.studentId || captureStatus.notes?.userId || ""
    ).trim();
    if (notesStudentId && notesStudentId !== String(studentId).trim()) {
      return res.status(403).json({
        success: false,
        error: "Payment belongs to a different student account. Cross-student activation rejected."
      });
    }
    if (captureStatus.method) {
      capturedMethod = captureStatus.method;
    }
    const resolvedSku = resolvePlanSku(
      captureStatus.notes?.planSku || candidatePlanSku || captureStatus.planSku,
      planId,
      captureStatus.amountPaise
    );
    const planItem = getPlanCatalogItem(resolvedSku);
    const verifiedAmount = planItem.amountInr;
    const existingServerSub = await evaluateServerSubscriptionFromStore(String(studentId));
    const targetBoard = normalizeBackendBoard(
      captureStatus.notes?.selectedBoard || captureStatus.notes?.board || selectedBoard || board || existingServerSub.selectedBoard
    );
    const targetClass = normalizeBackendClassLevel(
      captureStatus.notes?.selectedClass || captureStatus.notes?.classLevel || selectedClass || classLevel
    ) || existingServerSub.selectedClass || "Class 1";
    const backendActivation = await updateStudentSubscriptionInFirestoreBackend({
      studentId: String(studentId),
      studentName: String(studentName || "Student"),
      email: String(email || ""),
      mobile: String(mobile || ""),
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      planId: "premium",
      planSku: resolvedSku,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      signature: razorpay_signature || "verified_sig",
      method: capturedMethod,
      amountInr: verifiedAmount,
      currentExpiresAt
    });
    const receiptNumber = backendActivation.receiptNumber || `REC-VC-${Date.now().toString().slice(-6)}`;
    const startDateIso = backendActivation.startDateIso;
    const expiryDateIso = backendActivation.expiryDateIso;
    const daysRemaining = backendActivation.daysRemaining;
    const resolvedPaidBoard = backendActivation.selectedBoard || targetBoard;
    const resolvedPaidClass = backendActivation.selectedClass || targetClass;
    const resolvedBoardClassKey = backendActivation.boardClassKey || buildBackendBoardClassKey(resolvedPaidBoard, resolvedPaidClass);
    const isCategoryPlan = backendActivation.unlockedCategories.length > 0;
    const transactionRecord = {
      id: `tx_${razorpay_payment_id}`,
      receiptNumber,
      studentId: String(studentId),
      studentName: String(studentName || "Student"),
      parentEmail: String(email || ""),
      parentMobile: String(mobile || ""),
      selectedBoard: isCategoryPlan ? void 0 : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? void 0 : resolvedPaidClass,
      planId: "premium",
      planSku: resolvedSku,
      activatedCategories: backendActivation.unlockedCategories,
      planTitle: backendActivation.planLabel,
      amount: verifiedAmount,
      currency: "INR",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature || "verified_sig",
      method: capturedMethod,
      status: "SUCCESS",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      verifiedAt: (/* @__PURE__ */ new Date()).toISOString(),
      membershipStartDate: startDateIso,
      membershipExpiryDate: expiryDateIso
    };
    const membershipRecord = {
      membershipId: `mem_${razorpay_payment_id}`,
      studentId: String(studentId),
      studentName: String(studentName || "Student"),
      selectedBoard: isCategoryPlan ? existingServerSub.selectedBoard : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? existingServerSub.selectedClass : resolvedPaidClass,
      boardClassKey: isCategoryPlan ? void 0 : resolvedBoardClassKey,
      activatedClasses: backendActivation.activatedClasses,
      activatedClassKeys: backendActivation.activatedClassKeys,
      activatedCategoryKeys: backendActivation.activatedCategoryKeys,
      categorySubscriptions: backendActivation.categorySubscriptions,
      planId: "premium",
      planSku: resolvedSku,
      planTitle: backendActivation.planLabel,
      amount: verifiedAmount,
      startDate: startDateIso,
      expiryDate: expiryDateIso,
      status: "ACTIVE",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      daysRemaining
    };
    processedPaymentIds.add(razorpay_payment_id);
    processedOrderIds.add(razorpay_order_id);
    transactionLedger.unshift(transactionRecord);
    serverStudentSubscriptions.set(String(studentId), {
      studentId: String(studentId),
      plan: "premium",
      selectedBoard: isCategoryPlan ? existingServerSub.selectedBoard || "Maharashtra" : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? existingServerSub.selectedClass || "Class 1" : resolvedPaidClass,
      primaryBoard: existingServerSub.primaryBoard || existingServerSub.selectedBoard || resolvedPaidBoard,
      primaryClassLevel: existingServerSub.primaryClassLevel || existingServerSub.selectedClass || resolvedPaidClass,
      activatedBoard: isCategoryPlan ? existingServerSub.activatedBoard : resolvedPaidBoard,
      activatedClassLevel: isCategoryPlan ? existingServerSub.activatedClassLevel : resolvedPaidClass,
      activatedClasses: backendActivation.activatedClasses,
      activatedClassKeys: backendActivation.activatedClassKeys,
      classSubscriptions: backendActivation.classSubscriptions,
      activatedCategoryKeys: backendActivation.activatedCategoryKeys,
      categorySubscriptions: backendActivation.categorySubscriptions,
      accountRole: existingServerSub.accountRole || "student",
      hasStoredProfile: true,
      isLifetimeFree: false,
      planPurchasedAt: existingServerSub.planPurchasedAt || startDateIso,
      planExpiresAt: existingServerSub.planExpiresAt && existingServerSub.planExpiresAt > expiryDateIso ? existingServerSub.planExpiresAt : expiryDateIso,
      paymentId: razorpay_payment_id,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    console.log(`[Payment Verified] Student: ${studentId} | SKU: ${resolvedSku} | Amount: \u20B9${verifiedAmount} | Valid till: ${membershipRecord.expiryDate}`);
    let referralResult = null;
    if (referralCode && typeof referralCode === "string") {
      try {
        const attribution = await processReferralPurchase({
          referralCode,
          buyerStudentId: String(studentId),
          buyerStudentName: String(studentName || "Student"),
          buyerEmail: String(email || ""),
          buyerMobile: String(mobile || ""),
          planId: "premium",
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id
        });
        if (attribution.credited) {
          referralResult = attribution;
          console.log(`[Referral Reward Applied] Referrer: ${attribution.referrerName} (+\u20B9${attribution.referrerReward}) | Buyer: ${studentName} (+\u20B9${attribution.buyerReward})`);
        } else {
          console.warn(`[Referral Not Credited] Reason: ${attribution.reason}`);
          referralResult = { credited: false, reason: attribution.reason };
        }
      } catch (refErr) {
        console.error("[Referral Processing Error]:", refErr);
      }
    }
    return res.json({
      success: true,
      planSku: resolvedSku,
      selectedBoard: isCategoryPlan ? existingServerSub.selectedBoard : resolvedPaidBoard,
      selectedClass: isCategoryPlan ? existingServerSub.selectedClass : resolvedPaidClass,
      boardClassKey: isCategoryPlan ? void 0 : resolvedBoardClassKey,
      activatedClasses: backendActivation.activatedClasses,
      activatedClassKeys: backendActivation.activatedClassKeys,
      classSubscriptions: backendActivation.classSubscriptions,
      activatedCategoryKeys: backendActivation.activatedCategoryKeys,
      categorySubscriptions: backendActivation.categorySubscriptions,
      message: isCategoryPlan ? `Payment verified and ${planItem.title} activated for 365 days.` : `Payment verified and ${resolvedPaidBoard} (${resolvedPaidClass}) subscription activated for 365 days.`,
      transaction: transactionRecord,
      membership: membershipRecord,
      referral: referralResult
    });
  } catch (error) {
    console.error("[Payment Verification Exception]:", error);
    return res.status(500).json({ success: false, error: "Internal server error during verification." });
  }
});
app.post("/api/razorpay/payment-failed", (req, res) => {
  try {
    const {
      orderId = `order_cancelled_${Date.now()}`,
      paymentId = `pay_cancelled_${Date.now()}`,
      planId = "premium",
      studentId = "unknown_student",
      studentName = "Student",
      email = "",
      mobile = "",
      selectedBoard,
      board,
      selectedClass,
      classLevel,
      method = "RAZORPAY"
    } = req.body || {};
    const validPlanId = "premium";
    const amount = 99;
    const normalizedBoard = normalizeBackendBoard(selectedBoard || board);
    const normalizedClass = normalizeBackendClassLevel(selectedClass || classLevel) || void 0;
    const failedRecord = {
      id: `tx_failed_${Date.now()}`,
      receiptNumber: `FAIL-VC-${Date.now().toString().slice(-6)}`,
      studentId: String(studentId),
      studentName: String(studentName),
      parentEmail: String(email),
      parentMobile: String(mobile),
      selectedBoard: normalizedBoard,
      selectedClass: normalizedClass,
      planId: validPlanId,
      planTitle: normalizedClass ? `PREMIUM PLAN (${normalizedBoard} \u2022 ${normalizedClass}) \u2013 \u20B999 \u2013 365 Days (1 Year)` : `PREMIUM PLAN (${normalizedBoard}) \u2013 \u20B999 \u2013 365 Days (1 Year)`,
      amount,
      currency: "INR",
      orderId: String(orderId),
      paymentId: String(paymentId),
      signature: "failed_or_cancelled",
      method: String(method),
      status: "FAILED",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (String(studentId) !== "guest_audit") {
      transactionLedger.unshift(failedRecord);
    }
    return res.json({
      success: true,
      recorded: true,
      transaction: failedRecord
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/razorpay/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"] || req.headers["X-Razorpay-Signature"];
    const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(
      typeof req.body === "string" ? req.body : JSON.stringify(req.body || {}),
      "utf8"
    );
    const sigCheck = verifyWebhookSignature(rawBody, signature);
    if (!sigCheck.valid) {
      console.log(`[Razorpay Webhook] Rejected webhook request: ${sigCheck.reason}`);
      return res.status(400).json({
        status: "error",
        message: sigCheck.reason || "Invalid X-Razorpay-Signature."
      });
    }
    const event = JSON.parse(rawBody.toString("utf8"));
    const eventType = String(event?.event || "");
    const paymentEntity = event?.payload?.payment?.entity;
    const orderEntity = event?.payload?.order?.entity;
    console.log(
      `[Razorpay Webhook Event Verified]: ${eventType} | Payment ID: ${paymentEntity?.id || "N/A"}`
    );
    if (eventType === "payment.captured" || eventType === "order.paid") {
      if (!paymentEntity || !paymentEntity.id) {
        return res.status(400).json({
          status: "error",
          message: "Missing payment entity in webhook payload."
        });
      }
      const paymentId = String(paymentEntity.id);
      const orderId = String(
        paymentEntity.order_id || orderEntity?.id || `order_webhook_${Date.now()}`
      );
      const amountPaise = Number(paymentEntity.amount || orderEntity?.amount || 0);
      const notes = {
        ...orderEntity?.notes || {},
        ...paymentEntity?.notes || {}
      };
      const studentId = String(notes.studentId || notes.userId || "").trim();
      const studentName = String(notes.studentName || "Student").trim();
      const email = String(notes.email || paymentEntity.email || "").trim();
      const mobile = String(notes.mobile || paymentEntity.contact || "").trim();
      const referralCode = String(notes.referralCode || "").trim();
      const method = String(paymentEntity.method || "RAZORPAY").toUpperCase();
      const planId = "premium";
      const resolvedWebhookSku = resolvePlanSku(notes.planSku, notes.planId, amountPaise);
      const webhookPlanItem = getPlanCatalogItem(resolvedWebhookSku);
      const subscriptionTier = "premium";
      const verifiedAmount = webhookPlanItem.amountInr;
      const notesSelectedBoard = normalizeBackendBoard(
        notes.selectedBoard || notes.board || "Maharashtra"
      );
      const notesSelectedClass = normalizeBackendClassLevel(
        notes.selectedClass || notes.classLevel
      );
      let firestoreUpdateResult = null;
      if (studentId) {
        const captured = await processPaymentCapturedEvent({
          paymentEntity,
          orderEntity,
          signature: signature || "verified_webhook_signature"
        });
        firestoreUpdateResult = captured;
        const existingCached = serverStudentSubscriptions.get(studentId);
        const isCatPurchase = (captured.unlockedCategories?.length || 0) > 0;
        serverStudentSubscriptions.set(studentId, {
          studentId,
          plan: planId,
          selectedBoard: isCatPurchase ? existingCached?.selectedBoard || captured.selectedBoard : captured.selectedBoard,
          selectedClass: isCatPurchase ? existingCached?.selectedClass || captured.selectedClass : captured.selectedClass,
          primaryBoard: existingCached?.primaryBoard || existingCached?.selectedBoard || captured.selectedBoard,
          primaryClassLevel: existingCached?.primaryClassLevel || existingCached?.selectedClass || captured.selectedClass,
          activatedBoard: isCatPurchase ? existingCached?.activatedBoard : captured.selectedBoard,
          activatedClassLevel: isCatPurchase ? existingCached?.activatedClassLevel : captured.selectedClass,
          activatedClasses: captured.activatedClasses,
          activatedClassKeys: captured.activatedClassKeys,
          classSubscriptions: captured.classSubscriptions,
          activatedCategoryKeys: captured.activatedCategoryKeys || existingCached?.activatedCategoryKeys || [],
          categorySubscriptions: captured.categorySubscriptions || existingCached?.categorySubscriptions || {},
          accountRole: existingCached?.accountRole || "student",
          hasStoredProfile: true,
          isLifetimeFree: false,
          planPurchasedAt: existingCached?.planPurchasedAt || captured.startDateIso,
          planExpiresAt: existingCached?.planExpiresAt && existingCached.planExpiresAt > captured.expiryDateIso ? existingCached.planExpiresAt : captured.expiryDateIso,
          paymentId,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
      if (!processedPaymentIds.has(paymentId)) {
        processedPaymentIds.add(paymentId);
        if (orderId) {
          processedOrderIds.add(orderId);
        }
        const fallbackActivation = computeSubscriptionActivationDates({
          verificationTimestamp: /* @__PURE__ */ new Date()
        });
        const nowIso = fallbackActivation.verifiedAtUtcIso;
        const startDateIso = firestoreUpdateResult?.startDateIso || fallbackActivation.purchasedDateIst;
        const expiryDateIso = firestoreUpdateResult?.expiryDateIso || fallbackActivation.expiryDateIst;
        const receiptNumber = firestoreUpdateResult?.receiptNumber || `REC-VC-${Date.now().toString().slice(-6)}`;
        const resolvedBoard = firestoreUpdateResult?.selectedBoard || notesSelectedBoard;
        const resolvedClass = firestoreUpdateResult?.selectedClass || notesSelectedClass || "Class 1";
        transactionLedger.unshift({
          id: `tx_${paymentId}`,
          receiptNumber,
          studentId: studentId || "webhook_student",
          studentName,
          parentEmail: email,
          parentMobile: mobile,
          selectedBoard: resolvedBoard,
          selectedClass: resolvedClass,
          planId,
          planSku: resolvedWebhookSku,
          activatedCategories: webhookPlanItem.unlockedCategories,
          planTitle: firestoreUpdateResult?.planLabel || `${webhookPlanItem.title} \u2013 \u20B9${verifiedAmount} \u2013 ${webhookPlanItem.validityDays} Days (${webhookPlanItem.validityLabel})`,
          amount: verifiedAmount,
          currency: "INR",
          orderId,
          paymentId,
          signature: signature || "verified_webhook_signature",
          method,
          status: "SUCCESS",
          createdAt: nowIso,
          verifiedAt: nowIso,
          membershipStartDate: startDateIso,
          membershipExpiryDate: expiryDateIso
        });
        if (studentId && referralCode) {
          try {
            await processReferralPurchase({
              referralCode,
              buyerStudentId: studentId,
              buyerStudentName: studentName,
              buyerEmail: email,
              buyerMobile: mobile,
              planId,
              orderId,
              paymentId
            });
          } catch (refErr) {
            console.error("[Razorpay Webhook Referral Error]:", refErr);
          }
        }
      }
      console.log(
        `[Razorpay Webhook payment.captured] Student: ${studentId || "N/A"} | SKU: ${resolvedWebhookSku} | Tier: ${subscriptionTier} (${planId}) | Expiry: ${firestoreUpdateResult?.expiryDateIso || "365 Days"}`
      );
      return res.status(200).json({
        status: "ok",
        event: eventType,
        studentId: studentId || null,
        planSku: resolvedWebhookSku,
        selectedBoard: firestoreUpdateResult?.selectedBoard || notesSelectedBoard,
        selectedClass: firestoreUpdateResult?.selectedClass || notesSelectedClass || null,
        boardClassKey: firestoreUpdateResult?.boardClassKey || null,
        activatedClasses: firestoreUpdateResult?.activatedClasses || [],
        activatedClassKeys: firestoreUpdateResult?.activatedClassKeys || [],
        activatedCategoryKeys: firestoreUpdateResult?.activatedCategoryKeys || [],
        plan: planId,
        subscriptionTier,
        planExpiresAt: firestoreUpdateResult?.expiryDateIso || null,
        validityDays: 365
      });
    } else if (eventType === "refund.processed" || eventType === "refund.created") {
      const paymentId = paymentEntity?.id || event?.payload?.refund?.entity?.payment_id;
      if (paymentId) {
        reverseReferralOnRefund(paymentId, `Refund event: ${eventType}`);
        console.log(
          `[Razorpay Webhook] Reverted referral attribution for refunded payment: ${paymentId}`
        );
      }
    }
    return res.status(200).json({ status: "ok", event: eventType });
  } catch (error) {
    console.error("[Razorpay Webhook Error]:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
});
app.post("/functions/webhook", handleRazorpayWebhook);
app.get("/api/razorpay/payment-status/:paymentId", async (req, res) => {
  try {
    const paymentId = String(req.params.paymentId || "").trim();
    const orderId = req.query.orderId ? String(req.query.orderId) : void 0;
    const planId = req.query.planId === "basic" || req.query.planId === "premium" ? req.query.planId : void 0;
    if (!paymentId) {
      return res.status(400).json({
        success: false,
        error: "Payment ID is required."
      });
    }
    const statusResult = await verifyAndConfirmCapturedPayment({
      paymentId,
      orderId,
      expectedPlanId: planId,
      autoCaptureIfAuthorized: true
    });
    try {
      const rawPayment = await fetchRazorpayPaymentById(paymentId);
      return res.json({
        success: statusResult.confirmed,
        ...statusResult,
        razorpayStatus: rawPayment.status
      });
    } catch {
    }
    return res.json({
      success: statusResult.confirmed,
      ...statusResult
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      confirmed: false,
      error: error?.message || "Unable to fetch payment status from Razorpay API."
    });
  }
});
app.get("/api/payments", async (req, res) => {
  const adminCheck = await verifyAdminRequest(req.headers);
  if (!adminCheck.authorized) {
    return res.status(adminCheck.statusCode).json({
      success: false,
      error: adminCheck.error || "Administrator authentication required."
    });
  }
  res.json({
    success: true,
    totalCount: transactionLedger.length,
    transactions: transactionLedger
  });
});
app.get("/api/health", (_req, res) => {
  const creds = getResolvedRazorpayCredentials();
  const adminStatus = getFirebaseAdminStatus();
  res.json({
    status: "healthy",
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    razorpayConfigured: creds.isConfigured,
    razorpayMode: creds.isLive ? "LIVE" : "TEST",
    webhookSecretConfigured: creds.hasExplicitWebhookSecret,
    firebaseAdminConfigured: adminStatus.configured,
    firebaseAdminSource: adminStatus.source,
    firestoreDatabaseId: adminStatus.databaseId
  });
});
app.get("/api/referrals/account/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { userType, name, email, mobile, schoolName } = req.query;
    if (!userId) {
      return res.status(400).json({ success: false, error: "User ID required." });
    }
    const rawAccount = await getOrCreateReferralAccount(
      String(userId),
      userType || "student",
      String(name || "Champion"),
      String(email || ""),
      String(mobile || ""),
      String(schoolName || "")
    );
    const account = normalizeReferralAccountForClient(rawAccount);
    const userTransactions = referralTransactions.filter((t) => t.referrerId === userId || t.buyerStudentId === userId).slice(0, 30).map((t) => ({
      ...t,
      referrerUserId: t.referrerId,
      referrerCode: t.referralCode,
      referredUserId: t.buyerStudentId,
      referredUserName: t.buyerStudentName || "Student",
      referredUserClass: "Class 5",
      referredUserMobileMasked: "98******10",
      planPurchased: t.planAmount >= 99 ? "premium" : "none",
      planAmountPaid: t.planAmount || 0,
      rewardAmount: t.referrerId === userId ? t.referrerReward : t.buyerReward,
      xpAwarded: t.status === "CREDITED" ? 200 : 0,
      status: t.status === "CREDITED" ? "VERIFIED_REWARDED" : t.status === "PENDING" ? "SIGNED_UP_PENDING_PAYMENT" : t.status
    }));
    const userPayouts = payoutRequests.filter((p) => p.userId === userId).slice(0, 30).map((p) => ({
      ...p,
      userRole: p.userType === "teacher" ? "parent" : "student",
      payoutMethod: p.method || "BANK",
      bankAccountName: p.bankDetails?.accountHolderName || p.userName,
      bankAccountNumber: p.bankDetails?.accountNumber || "",
      bankIfsc: p.bankDetails?.ifscCode || "",
      status: p.status === "COMPLETED" ? "PAID" : p.status === "REQUESTED" ? "PENDING" : p.status,
      transactionRefId: p.transactionReference,
      adminRemarks: p.adminNotes,
      requestedAt: p.requestedAt || p.createdAt
    }));
    return res.json({
      success: true,
      account,
      transactions: userTransactions,
      payouts: userPayouts,
      payoutRequests: userPayouts,
      config: {
        plan49ReferrerReward: referralConfig.plan49ReferrerReward,
        plan49BuyerReward: referralConfig.plan49BuyerReward,
        plan99ReferrerReward: referralConfig.plan99ReferrerReward,
        plan99BuyerReward: referralConfig.plan99BuyerReward,
        minPayoutAmount: referralConfig.minPayoutAmount,
        programEnabled: referralConfig.programEnabled
      }
    });
  } catch (error) {
    console.error("[Referral API] Get Account Error:", error);
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/referrals/register", async (req, res) => {
  try {
    const {
      userId,
      userType = "student",
      userRole,
      name,
      userName,
      email,
      mobile,
      schoolName,
      preferredReferralCode
    } = req.body;
    const resolvedName = String(name || userName || "Student Champion");
    if (!userId) {
      return res.status(400).json({ success: false, error: "User ID is required." });
    }
    const rawAccount = await getOrCreateReferralAccount(
      String(userId),
      userType === "teacher" || userRole === "teacher" ? "teacher" : "student",
      resolvedName,
      String(email || ""),
      String(mobile || ""),
      String(schoolName || ""),
      preferredReferralCode ? String(preferredReferralCode) : void 0
    );
    const account = normalizeReferralAccountForClient(rawAccount);
    return res.json({
      success: true,
      message: `Welcome ${account.name}! Your unique referral code ${account.referralCode} is ready.`,
      account
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/referrals/track-signup", async (req, res) => {
  try {
    const {
      referralCode,
      referralCodeUsed,
      newStudentId,
      newUserId,
      newUserName,
      newUserClass,
      mobile
    } = req.body;
    const resolvedCode = String(referralCode || referralCodeUsed || "").trim();
    const resolvedStudentId = String(newStudentId || newUserId || "").trim();
    if (!resolvedStudentId) {
      return res.status(400).json({ success: false, error: "newStudentId / newUserId is required." });
    }
    if (!resolvedCode) {
      const account = await getOrCreateReferralAccount(
        resolvedStudentId,
        "student",
        String(newUserName || "Student Champion")
      );
      return res.json({
        success: true,
        tracked: false,
        account: normalizeReferralAccountForClient(account)
      });
    }
    const result = await trackReferralSignup(
      resolvedCode,
      resolvedStudentId,
      String(newUserName || "Student"),
      String(newUserClass || "Class 5"),
      String(mobile || "")
    );
    return res.json({ success: result.tracked, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/referrals/invite-click", async (req, res) => {
  try {
    const { userId } = req.body;
    if (userId) {
      const acc = await getOrCreateReferralAccount(String(userId));
      acc.stats.totalClicks += 1;
      await saveAccountToFirestore(acc);
    }
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
var handleValidateReferralCode = async (req, res) => {
  try {
    const code = req.body?.code || req.body?.referralCode || req.query?.code || req.query?.referralCode || "";
    const currentUserId = req.body?.currentUserId || req.body?.studentId || req.query?.currentUserId || req.query?.studentId;
    const resolvedCode = String(code).trim();
    const result = await validateReferralCode(
      resolvedCode,
      currentUserId ? String(currentUserId) : void 0
    );
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ valid: false, error: error.message, message: error.message });
  }
};
app.post("/api/referrals/validate-code", handleValidateReferralCode);
app.get("/api/referrals/validate-code", handleValidateReferralCode);
app.post("/api/referrals/payout-request", async (req, res) => {
  try {
    const {
      userId,
      amount,
      method,
      payoutMethod,
      upiId,
      bankDetails,
      bankAccountName,
      bankAccountNumber,
      bankIfsc
    } = req.body;
    const resolvedMethod = (method || payoutMethod || "BANK") === "UPI" ? "UPI" : "BANK";
    if (!userId || !amount) {
      return res.status(400).json({ success: false, message: "Missing required withdrawal details." });
    }
    const sessionCheck = await verifyRequestDeviceSession(req, String(userId));
    if (!sessionCheck.valid) {
      return res.status(sessionCheck.statusCode).json({
        success: false,
        code: "SINGLE_DEVICE_SESSION_INVALID",
        message: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
      });
    }
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid withdrawal amount." });
    }
    const resolvedBankDetails = bankDetails || (bankAccountNumber ? {
      accountHolderName: String(bankAccountName || "").trim(),
      accountNumber: String(bankAccountNumber || "").trim(),
      ifscCode: String(bankIfsc || "").trim().toUpperCase(),
      bankName: "Verified Bank Account"
    } : void 0);
    const result = await submitPayoutRequest({
      userId: String(userId),
      amount: numAmount,
      method: resolvedMethod,
      upiId: upiId ? String(upiId).trim() : void 0,
      bankDetails: resolvedBankDetails
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.get("/api/referrals/leaderboard", (_req, res) => {
  try {
    const data = getLeaderboardData();
    const leaderboard = data.students.map((s, idx) => ({
      rank: idx + 1,
      userId: s.userId,
      userName: s.name,
      className: "Class 5",
      schoolName: s.schoolName || "MyStudyZone Academy",
      city: "Maharashtra",
      successfulReferrals: s.paidReferralsCount,
      totalEarnings: s.totalEarned,
      currentTier: s.paidReferralsCount >= 50 ? "Diamond" : s.paidReferralsCount >= 25 ? "Gold" : s.paidReferralsCount >= 10 ? "Silver" : s.paidReferralsCount >= 5 ? "Bronze" : "None"
    }));
    return res.json({ success: true, leaderboard, ...data });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/referrals/teacher-verify", async (req, res) => {
  try {
    const { userId, schoolName, teacherIdNumber, credentialsDocUrl } = req.body;
    if (!userId || !schoolName) {
      return res.status(400).json({ success: false, message: "School name is required for verification." });
    }
    const result = await submitTeacherVerification({
      userId: String(userId),
      schoolName: String(schoolName),
      teacherIdNumber: teacherIdNumber ? String(teacherIdNumber) : void 0,
      credentialsDocUrl: credentialsDocUrl ? String(credentialsDocUrl) : void 0
    });
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.get("/api/referrals/admin/stats", async (req, res) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        error: adminCheck.error || "Administrator authentication required."
      });
    }
    const stats = getAdminReferralStats();
    return res.json({ success: true, stats });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/referrals/admin/verify-teacher", async (req, res) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        message: adminCheck.error || "Administrator authentication required."
      });
    }
    const { userId, status, notes } = req.body;
    if (!userId || status !== "VERIFIED" && status !== "REJECTED") {
      return res.status(400).json({ success: false, message: "Valid userId and status (VERIFIED/REJECTED) required." });
    }
    const result = await reviewTeacherVerification(String(userId), status, notes ? String(notes) : "");
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.post("/api/referrals/admin/payout-action", async (req, res) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        message: adminCheck.error || "Administrator authentication required."
      });
    }
    const { payoutId, action, transactionRef, notes } = req.body;
    if (!payoutId || action !== "APPROVE" && action !== "REJECT") {
      return res.status(400).json({ success: false, message: "Valid payoutId and action (APPROVE/REJECT) required." });
    }
    const result = await processPayoutAction(String(payoutId), action, transactionRef, notes);
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.post("/api/razorpayx/webhook", async (req, res) => {
  try {
    const signature = req.headers["x-razorpay-signature"] || req.headers["X-Razorpay-Signature"];
    const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(
      typeof req.body === "string" ? req.body : JSON.stringify(req.body || {}),
      "utf8"
    );
    const isValid = verifyRazorpayXPayoutWebhookSignature(rawBody, signature);
    if (!isValid) {
      console.warn("[RazorpayX Webhook] Rejected: Invalid signature");
      return res.status(400).json({ status: "error", message: "Invalid X-Razorpay-Signature." });
    }
    const event = JSON.parse(rawBody.toString("utf8"));
    console.log(`[RazorpayX Payout Webhook Event]: ${event?.event}`);
    const result = await processRazorpayXPayoutWebhookEvent(event);
    return res.json({ status: "ok", ...result });
  } catch (error) {
    console.error("[RazorpayX Webhook Error]:", error);
    return res.status(500).json({ status: "error", message: error.message });
  }
});
app.post("/api/referrals/admin/update-config", async (req, res) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode).json({
        success: false,
        error: adminCheck.error || "Administrator authentication required."
      });
    }
    const updates = req.body;
    if (typeof updates.programEnabled === "boolean") referralConfig.programEnabled = updates.programEnabled;
    if (typeof updates.budgetCap === "number") referralConfig.budgetCap = updates.budgetCap;
    if (typeof updates.plan49ReferrerReward === "number") referralConfig.plan49ReferrerReward = updates.plan49ReferrerReward;
    if (typeof updates.plan49BuyerReward === "number") referralConfig.plan49BuyerReward = updates.plan49BuyerReward;
    if (typeof updates.plan99ReferrerReward === "number") referralConfig.plan99ReferrerReward = updates.plan99ReferrerReward;
    if (typeof updates.plan99BuyerReward === "number") referralConfig.plan99BuyerReward = updates.plan99BuyerReward;
    if (typeof updates.minPayoutAmount === "number") referralConfig.minPayoutAmount = updates.minPayoutAmount;
    return res.json({ success: true, message: "Referral system configuration updated.", config: referralConfig });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
var serverStudentSubscriptions = /* @__PURE__ */ new Map();
var SERVER_FREE_ALLOWED_SUBJECTS = /* @__PURE__ */ new Set([
  "English",
  "Mathematics",
  "Mathematics \u2013 Algebra",
  "Mathematics \u2013 Geometry"
]);
var SERVER_FREE_ALLOWED_FEATURES = /* @__PURE__ */ new Set([
  "dashboard",
  "profile",
  "demo",
  "puzzles",
  "sudoku",
  "quizzes",
  "worksheets",
  "study-material",
  "referrals"
]);
function parseServerWorksheetBoardAndClass(worksheetId) {
  const trimmed = String(worksheetId || "").trim();
  const boardMatch = /^WS-(?:NEW-)?(CBSE|ICSE|MH|MAHARASHTRA)-C(\d{1,2})-/i.exec(trimmed);
  if (boardMatch) {
    const n = parseInt(boardMatch[2], 10);
    if (n >= 1 && n <= 10) {
      return {
        board: normalizeBackendBoard(boardMatch[1]),
        classLevel: `Class ${n}`
      };
    }
  }
  const mhMatch = /^WS-C(\d{1,2})-/i.exec(trimmed);
  if (mhMatch) {
    const n = parseInt(mhMatch[1], 10);
    if (n >= 1 && n <= 10) {
      return {
        board: "Maharashtra",
        classLevel: `Class ${n}`
      };
    }
  }
  return null;
}
function hasServerUniversalWorksheetAccess(sub) {
  return hasServerCategoryAccess(sub, "all_classes") || getServerActivatedBoardClassKeys(sub).length > 0;
}
function getServerFreeDemoIdsForClass(classLevel = "Class 1", board = "Maharashtra") {
  const cNum = parseInt(String(classLevel).replace("Class ", ""), 10) || 1;
  const resolvedBoard = normalizeBackendBoard(board);
  if (resolvedBoard === "CBSE") {
    return [`WS-CBSE-C${cNum}-ENGLISH-1`, `WS-CBSE-C${cNum}-MATHEMATICS-1`];
  }
  if (resolvedBoard === "ICSE") {
    return [`WS-ICSE-C${cNum}-ENGLISH-1`, `WS-ICSE-C${cNum}-MATHEMATICS-1`];
  }
  const mathKey = cNum === 10 ? "MATHEMATICSALGEBRA" : "MATHEMATICS";
  return [`WS-C${cNum}-ENGLISH-1`, `WS-C${cNum}-${mathKey}-1`];
}
function extractServerClassSubscriptionsMap(raw) {
  const result = {};
  if (!raw) return result;
  if (raw.classSubscriptions && typeof raw.classSubscriptions === "object") {
    for (const [k, entry] of Object.entries(raw.classSubscriptions)) {
      if (!entry || typeof entry !== "object") continue;
      const parsedFromKey = parseBackendBoardClassKey(k);
      const board = normalizeBackendBoard(
        entry.board || parsedFromKey?.board || raw.primaryBoard || raw.board || "Maharashtra"
      );
      const cls = normalizeBackendClassLevel(entry.classLevel || parsedFromKey?.classLevel || k);
      if (!cls) continue;
      const compositeKey = buildBackendBoardClassKey(board, cls);
      const plan = entry.plan === "basic" || entry.plan === "premium" ? entry.plan : "free";
      result[compositeKey] = {
        board,
        classLevel: cls,
        boardClassKey: compositeKey,
        plan,
        status: entry.status || "LOCKED",
        purchasedAt: entry.purchasedAt,
        expiresAt: entry.expiresAt,
        paymentId: entry.paymentId,
        orderId: entry.orderId,
        amountInr: entry.amountInr,
        validityDays: entry.validityDays,
        updatedAt: entry.updatedAt
      };
    }
  }
  if (raw.plan && raw.plan !== "free" && raw.activatedClassLevel) {
    const legacyBoard = normalizeBackendBoard(raw.activatedBoard || raw.board || raw.primaryBoard || "Maharashtra");
    const legacyClass = normalizeBackendClassLevel(raw.activatedClassLevel) || normalizeBackendClassLevel(raw.classLevel) || normalizeBackendClassLevel(raw.selectedClass) || "Class 1";
    const legacyKey = buildBackendBoardClassKey(legacyBoard, legacyClass);
    if (!result[legacyKey]) {
      result[legacyKey] = {
        board: legacyBoard,
        classLevel: legacyClass,
        boardClassKey: legacyKey,
        plan: raw.plan === "basic" ? "basic" : "premium",
        status: "ACTIVE",
        purchasedAt: raw.planPurchasedAt,
        expiresAt: raw.planExpiresAt,
        paymentId: raw.lastPaymentId || raw.paymentId,
        orderId: raw.lastOrderId,
        amountInr: 99,
        validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS
      };
    }
  }
  return result;
}
var SERVER_CATEGORY_SPLIT_DATE = "2026-11-16";
function extractServerCategorySubscriptionsMap(raw) {
  const result = {};
  if (!raw || !raw.categorySubscriptions || typeof raw.categorySubscriptions !== "object") {
    return result;
  }
  for (const [k, rec] of Object.entries(raw.categorySubscriptions)) {
    if (!rec || typeof rec !== "object") continue;
    const catId = k;
    if (ALL_CATEGORY_IDS.includes(catId)) {
      result[catId] = { ...rec, categoryId: catId };
    }
  }
  return result;
}
function hasServerCategoryAccess(sub, categoryId) {
  const catMap = extractServerCategorySubscriptionsMap(sub);
  const direct = catMap[categoryId];
  if (direct && direct.status === "ACTIVE") {
    if (!evaluateSubscriptionValidity("premium", direct.purchasedAt, direct.expiresAt).isExpired) {
      return true;
    }
  }
  const allBundle = catMap.all_classes;
  if (categoryId !== "all_classes" && allBundle && allBundle.status === "ACTIVE" && allBundle.planSku === "TEACHER_ALL_ACCESS") {
    if (!evaluateSubscriptionValidity("premium", allBundle.purchasedAt, allBundle.expiresAt).isExpired) {
      return true;
    }
  }
  if (sub.accountRole !== "teacher" && (categoryId === "scholarship_4th" || categoryId === "scholarship_7th")) {
    const legacyClass = categoryId === "scholarship_4th" ? "Class 4" : "Class 7";
    const classStatus = getServerBoardClassStatus(sub, sub.selectedBoard || "Maharashtra", legacyClass);
    const pDate = String(classStatus.purchasedAt || "").slice(0, 10);
    if (classStatus.isPaidActive && (!pDate || pDate <= SERVER_CATEGORY_SPLIT_DATE)) {
      return true;
    }
  }
  return false;
}
function getServerActivatedCategoryKeys(sub) {
  return ALL_CATEGORY_IDS.filter((catId) => hasServerCategoryAccess(sub, catId));
}
function getServerBoardClassStatus(sub, targetBoard, targetClass) {
  const normalizedBoard = normalizeBackendBoard(targetBoard || sub.selectedBoard || sub.primaryBoard || "Maharashtra");
  const normalizedTarget = normalizeBackendClassLevel(targetClass) || "Class 1";
  const boardClassKey = buildBackendBoardClassKey(normalizedBoard, normalizedTarget);
  const rawMap = extractServerClassSubscriptionsMap(sub);
  const entry = rawMap[boardClassKey];
  const baseFreeBoard = normalizeBackendBoard(
    sub.primaryBoard || sub.selectedBoard || "Maharashtra"
  );
  const baseFreeClass = normalizeBackendClassLevel(sub.primaryClassLevel) || normalizeBackendClassLevel(sub.selectedClass) || "Class 1";
  const isBaseFreePair = normalizedBoard === baseFreeBoard && normalizedTarget === baseFreeClass;
  const allClassesEntry = extractServerCategorySubscriptionsMap(sub).all_classes;
  if (allClassesEntry && allClassesEntry.status === "ACTIVE") {
    const bundleVal = evaluateSubscriptionValidity("premium", allClassesEntry.purchasedAt, allClassesEntry.expiresAt);
    if (!bundleVal.isExpired) {
      return {
        board: normalizedBoard,
        classLevel: normalizedTarget,
        boardClassKey,
        status: "ACTIVE_PAID",
        isPaidActive: true,
        isFreeBase: isBaseFreePair,
        isExpired: false,
        isAccessible: true,
        purchasedAt: bundleVal.purchaseDateIst || allClassesEntry.purchasedAt,
        expiresAt: bundleVal.expiryDateIst || allClassesEntry.expiresAt
      };
    }
  }
  if (entry && (entry.plan === "premium" || entry.plan === "basic")) {
    const validity = evaluateSubscriptionValidity(
      entry.plan,
      entry.purchasedAt,
      entry.expiresAt
    );
    if (validity.isExpired) {
      return {
        board: normalizedBoard,
        classLevel: normalizedTarget,
        boardClassKey,
        status: "EXPIRED",
        isPaidActive: false,
        isFreeBase: isBaseFreePair,
        isExpired: true,
        isAccessible: false,
        purchasedAt: entry.purchasedAt,
        expiresAt: entry.expiresAt
      };
    }
    return {
      board: normalizedBoard,
      classLevel: normalizedTarget,
      boardClassKey,
      status: "ACTIVE_PAID",
      isPaidActive: true,
      isFreeBase: isBaseFreePair,
      isExpired: false,
      isAccessible: true,
      purchasedAt: validity.purchaseDateIst || entry.purchasedAt,
      expiresAt: validity.expiryDateIst || entry.expiresAt
    };
  }
  const isStudentActivatedPair = Array.isArray(sub.studentActivatedClassKeys) && sub.studentActivatedClassKeys.includes(boardClassKey) || Array.isArray(sub.activatedClassKeys) && sub.activatedClassKeys.includes(boardClassKey);
  if (isBaseFreePair || isStudentActivatedPair) {
    return {
      board: normalizedBoard,
      classLevel: normalizedTarget,
      boardClassKey,
      status: "ACTIVE_FREE",
      isPaidActive: false,
      isFreeBase: true,
      isExpired: false,
      isAccessible: true,
      expiresAt: null
    };
  }
  return {
    board: normalizedBoard,
    classLevel: normalizedTarget,
    boardClassKey,
    status: "LOCKED",
    isPaidActive: false,
    isFreeBase: false,
    isExpired: false,
    isAccessible: false,
    expiresAt: null
  };
}
function getServerActivatedBoardClassKeys(sub) {
  const keys = [];
  for (const board of VALID_BOARDS) {
    for (const cls of VALID_CLASS_LEVELS) {
      if (getServerBoardClassStatus(sub, board, cls).status === "ACTIVE_PAID") {
        keys.push(buildBackendBoardClassKey(board, cls));
      }
    }
  }
  return keys;
}
function getServerActivatedClasses(sub, boardFilter) {
  if (boardFilter) {
    const targetBoard = normalizeBackendBoard(boardFilter);
    return VALID_CLASS_LEVELS.filter(
      (cls) => getServerBoardClassStatus(sub, targetBoard, cls).status === "ACTIVE_PAID"
    );
  }
  const activeSet = /* @__PURE__ */ new Set();
  for (const board of VALID_BOARDS) {
    for (const cls of VALID_CLASS_LEVELS) {
      if (getServerBoardClassStatus(sub, board, cls).status === "ACTIVE_PAID") {
        activeSet.add(cls);
      }
    }
  }
  return VALID_CLASS_LEVELS.filter((c) => activeSet.has(c));
}
function evaluateServerSubscription(studentId) {
  const existing = serverStudentSubscriptions.get(studentId);
  if (!existing) {
    return {
      studentId,
      plan: "free",
      selectedBoard: "Maharashtra",
      selectedClass: "Class 1",
      primaryBoard: "Maharashtra",
      primaryClassLevel: "Class 1",
      activatedBoard: null,
      activatedClassLevel: null,
      activatedClasses: [],
      activatedClassKeys: [],
      classSubscriptions: {},
      activatedCategoryKeys: [],
      categorySubscriptions: {},
      accountRole: "student",
      hasStoredProfile: false,
      isLifetimeFree: true,
      planExpiresAt: null,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  const classMap = extractServerClassSubscriptionsMap(existing);
  const categoryMap = extractServerCategorySubscriptionsMap(existing);
  const selectedBoard = normalizeBackendBoard(existing.selectedBoard || existing.primaryBoard || "Maharashtra");
  const selected = normalizeBackendClassLevel(existing.selectedClass) || "Class 1";
  const primaryBoard = normalizeBackendBoard(existing.primaryBoard || selectedBoard);
  const primary = normalizeBackendClassLevel(existing.primaryClassLevel) || selected;
  const refreshedSub = {
    ...existing,
    selectedBoard,
    selectedClass: selected,
    primaryBoard,
    primaryClassLevel: primary,
    classSubscriptions: classMap,
    categorySubscriptions: categoryMap
  };
  const activePaidKeys = getServerActivatedBoardClassKeys(refreshedSub);
  const activePaidClasses = getServerActivatedClasses(refreshedSub);
  const activeCategoryKeys = getServerActivatedCategoryKeys(refreshedSub);
  const selectedInfo = getServerBoardClassStatus(refreshedSub, selectedBoard, selected);
  if (selectedInfo.isPaidActive) {
    return {
      ...refreshedSub,
      plan: "premium",
      activatedBoard: selectedBoard,
      activatedClassLevel: selected,
      activatedClasses: activePaidClasses,
      activatedClassKeys: activePaidKeys,
      activatedCategoryKeys: activeCategoryKeys,
      isLifetimeFree: false,
      planPurchasedAt: selectedInfo.purchasedAt,
      planExpiresAt: selectedInfo.expiresAt || null
    };
  }
  if (activePaidKeys.length > 0 || activeCategoryKeys.length > 0) {
    const parsedFirst = activePaidKeys[0] ? parseBackendBoardClassKey(activePaidKeys[0]) : null;
    const firstActiveInfo = parsedFirst ? getServerBoardClassStatus(refreshedSub, parsedFirst.board, parsedFirst.classLevel) : null;
    return {
      ...refreshedSub,
      plan: "premium",
      activatedBoard: parsedFirst?.board || null,
      activatedClassLevel: parsedFirst?.classLevel || null,
      activatedClasses: activePaidClasses,
      activatedClassKeys: activePaidKeys,
      activatedCategoryKeys: activeCategoryKeys,
      isLifetimeFree: false,
      planPurchasedAt: firstActiveInfo?.purchasedAt || existing.planPurchasedAt,
      planExpiresAt: firstActiveInfo?.expiresAt || existing.planExpiresAt || null
    };
  }
  return {
    ...refreshedSub,
    plan: "free",
    activatedBoard: null,
    activatedClassLevel: null,
    activatedClasses: [],
    activatedClassKeys: [],
    activatedCategoryKeys: [],
    isLifetimeFree: true,
    planExpiresAt: null,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function evaluateServerSubscriptionFromStore(studentId) {
  const cleanId = String(studentId || "").trim();
  const cached = cleanId ? serverStudentSubscriptions.get(cleanId) : void 0;
  if (cached) {
    return evaluateServerSubscription(cleanId);
  }
  if (cleanId && cleanId !== "guest" && !cleanId.startsWith("demo_")) {
    try {
      const data = await serverGetDoc("students", cleanId);
      if (data) {
        const classMap = extractServerClassSubscriptionsMap(data);
        const categoryMap = extractServerCategorySubscriptionsMap(data);
        const primaryBoard = normalizeBackendBoard(data.primaryBoard || data.board || "Maharashtra");
        const selectedBoard = normalizeBackendBoard(data.activeWorkspaceBoard || data.board || primaryBoard);
        const primary = normalizeBackendClassLevel(data.primaryClassLevel) || normalizeBackendClassLevel(data.classLevel) || "Class 1";
        const selected = normalizeBackendClassLevel(data.activeWorkspaceClassLevel || data.classLevel) || primary;
        const studentActivatedClassKeys = Array.isArray(data.studentActivatedClassKeys) ? data.studentActivatedClassKeys.filter((k) => typeof k === "string") : [];
        const baseRecord = {
          studentId: cleanId,
          plan: data.plan === "premium" || data.plan === "basic" ? "premium" : "free",
          selectedBoard,
          selectedClass: selected,
          primaryBoard,
          primaryClassLevel: primary,
          activatedBoard: data.activatedBoard ? normalizeBackendBoard(data.activatedBoard) : null,
          activatedClassLevel: normalizeBackendClassLevel(data.activatedClassLevel) || null,
          studentActivatedClassKeys,
          classSubscriptions: classMap,
          categorySubscriptions: categoryMap,
          activatedCategoryKeys: Array.isArray(data.activatedCategoryKeys) ? data.activatedCategoryKeys : [],
          accountRole: data.accountRole === "teacher" ? "teacher" : "student",
          hasStoredProfile: true,
          isLifetimeFree: data.plan === "free",
          planPurchasedAt: data.planPurchasedAt,
          planExpiresAt: data.planExpiresAt || null,
          paymentId: data.lastPaymentId ? String(data.lastPaymentId) : void 0,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        serverStudentSubscriptions.set(cleanId, baseRecord);
        const evaluated = evaluateServerSubscription(cleanId);
        serverStudentSubscriptions.set(cleanId, evaluated);
        return evaluated;
      }
    } catch {
    }
  }
  return evaluateServerSubscription(cleanId);
}
app.post("/api/auth/check-existing-account", async (req, res) => {
  try {
    const rawEmail = String(req.body?.email || "").trim().toLowerCase();
    const rawMobileDigits = String(req.body?.mobile || "").replace(/\D/g, "").slice(-10);
    if (!rawEmail && rawMobileDigits.length < 10) {
      return res.status(400).json({
        success: false,
        error: "Email or 10-digit mobile number is required."
      });
    }
    const [
      emailMatch,
      mobileMatch,
      portalEmailMatch,
      portalMobileMatch,
      parentEmailMatch,
      parentMobileMatch
    ] = await Promise.all([
      rawEmail ? serverQueryEqualsLimit1("students", "email", rawEmail).catch(() => null) : Promise.resolve(null),
      rawMobileDigits.length >= 10 ? serverQueryEqualsLimit1("students", "mobile", rawMobileDigits).catch(() => null) : Promise.resolve(null),
      rawEmail ? serverQueryEqualsLimit1("portal_roles", "email", rawEmail).catch(() => null) : Promise.resolve(null),
      rawMobileDigits.length >= 10 ? serverQueryEqualsLimit1("portal_roles", "mobile", rawMobileDigits).catch(() => null) : Promise.resolve(null),
      rawEmail ? serverQueryEqualsLimit1("parents", "email", rawEmail).catch(() => null) : Promise.resolve(null),
      rawMobileDigits.length >= 10 ? serverQueryEqualsLimit1("parents", "mobile", rawMobileDigits).catch(() => null) : Promise.resolve(null)
    ]);
    if (!emailMatch && !mobileMatch) {
      if (portalEmailMatch || portalMobileMatch || parentEmailMatch || parentMobileMatch) {
        const mismatchField2 = portalEmailMatch || parentEmailMatch ? "email" : "mobile";
        const detectedRole = portalEmailMatch?.data?.role || portalMobileMatch?.data?.role || "parent";
        return res.json({
          success: true,
          exists: true,
          matchedPair: false,
          mismatchField: mismatchField2,
          accountRole: detectedRole,
          activeClasses: [],
          activeClassKeys: [],
          message: `This ${mismatchField2 === "email" ? "email address" : "mobile number"} is already registered under a ${String(detectedRole).replace("_", " ")} portal account. Please sign in to that portal instead of creating a duplicate account.`
        });
      }
      return res.json({
        success: true,
        exists: false,
        matchedPair: false,
        activeClasses: [],
        activeClassKeys: []
      });
    }
    if (emailMatch && mobileMatch && emailMatch.id === mobileMatch.id) {
      const sub = await evaluateServerSubscriptionFromStore(emailMatch.id);
      const activeClasses = getServerActivatedClasses(sub);
      const activeClassKeys = getServerActivatedBoardClassKeys(sub);
      return res.json({
        success: true,
        exists: true,
        matchedPair: true,
        accountRole: emailMatch.data.accountRole === "teacher" ? "teacher" : "student",
        primaryBoard: sub.primaryBoard || sub.selectedBoard || "Maharashtra",
        primaryClassLevel: sub.primaryClassLevel || sub.selectedClass || "Class 1",
        activeClasses,
        activeClassKeys,
        message: "Existing account matched by mobile & email."
      });
    }
    const mismatchField = emailMatch && !mobileMatch ? "email" : !emailMatch && mobileMatch ? "mobile" : "email";
    return res.json({
      success: true,
      exists: true,
      matchedPair: false,
      mismatchField,
      activeClasses: [],
      activeClassKeys: [],
      message: mismatchField === "email" ? "This email address is already linked to a different mobile number. Please enter your exact registered email and mobile number together." : "This mobile number is already linked to a different email address. Please enter your exact registered email and mobile number together."
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error?.message || "Account check failed." });
  }
});
async function verifyRequestDeviceSession(req, studentId) {
  const cleanId = String(studentId || "").trim();
  if (!cleanId || cleanId === "guest" || cleanId.startsWith("demo_")) {
    return { valid: true, statusCode: 200 };
  }
  const sessionId = String(req.headers["x-session-id"] || "").trim();
  const sessionVersionRaw = req.headers["x-session-version"];
  const sessionVersion = sessionVersionRaw !== void 0 && String(sessionVersionRaw).trim() !== "" ? Number(sessionVersionRaw) : void 0;
  const deviceId = String(req.headers["x-device-id"] || "").trim();
  const hardwareSignature = String(req.headers["x-hardware-signature"] || "").trim();
  const deviceSignature = String(req.headers["x-device-signature"] || "").trim();
  const existing = await loadDeviceSessionFromStore(cleanId);
  const hasSessionHeaders = Boolean(sessionId || deviceId || hardwareSignature || deviceSignature);
  if (!existing && !hasSessionHeaders) {
    return { valid: true, statusCode: 200 };
  }
  if (existing && existing.status === "ACTIVE" && Number(existing.expiresAtMs || 0) > Date.now() && !hasSessionHeaders) {
    return {
      valid: false,
      statusCode: 401,
      error: SINGLE_DEVICE_BLOCK_MESSAGE
    };
  }
  if (hasSessionHeaders) {
    const check = await validateDeviceSessionServer({
      userId: cleanId,
      activeSessionId: sessionId || void 0,
      sessionVersion: Number.isFinite(sessionVersion) ? sessionVersion : void 0,
      deviceId: deviceId || "",
      hardwareSignature: hardwareSignature || "",
      deviceSignature: deviceSignature || "",
      allowBootstrapIfMissing: !existing
    });
    if (!check.valid) {
      return {
        valid: false,
        statusCode: 401,
        error: check.error || SINGLE_DEVICE_BLOCK_MESSAGE
      };
    }
  }
  return { valid: true, statusCode: 200 };
}
app.post("/api/auth/session/acquire", async (req, res) => {
  try {
    let verifiedUid;
    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid && isFirebaseAdminConfigured()) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          allowed: false,
          error: tokenCheck.error || "Authentication token verification failed."
        });
      }
      if (tokenCheck.valid) {
        verifiedUid = tokenCheck.uid;
      }
    }
    const body = req.body || {};
    const userId = String(body.userId || verifiedUid || "").trim();
    const result = await acquireDeviceSessionServer({
      userId,
      firebaseUid: body.firebaseUid || verifiedUid,
      email: String(body.email || ""),
      studentName: String(body.studentName || "Student"),
      accountRole: body.accountRole === "teacher" ? "teacher" : "student",
      deviceId: String(body.deviceId || req.headers["x-device-id"] || ""),
      hardwareSignature: String(body.hardwareSignature || req.headers["x-hardware-signature"] || ""),
      deviceSignature: String(body.deviceSignature || req.headers["x-device-signature"] || ""),
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });
    if (!result.allowed) {
      return res.status(400).json({
        success: false,
        allowed: false,
        code: result.code,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE,
        activeDevice: result.activeDevice
      });
    }
    return res.json({
      success: true,
      allowed: true,
      resumed: Boolean(result.resumed),
      session: result.session
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      allowed: false,
      error: error?.message || "Failed to acquire device session."
    });
  }
});
app.post("/api/auth/session/validate", async (req, res) => {
  try {
    const body = req.body || {};
    const userId = String(body.userId || "").trim();
    let verifiedUid;
    let verifiedEmail;
    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          valid: false,
          error: tokenCheck.error || "Invalid or expired Firebase ID token."
        });
      }
      verifiedUid = tokenCheck.uid;
      verifiedEmail = tokenCheck.email;
    }
    const isVerifiedOwner = Boolean(
      verifiedUid && (verifiedUid === userId || body.firebaseUid && verifiedUid === String(body.firebaseUid).trim())
    );
    const rawVer = body.sessionVersion ?? req.headers["x-session-version"];
    const sessionVersion = rawVer !== void 0 && String(rawVer).trim() !== "" && Number.isFinite(Number(rawVer)) ? Number(rawVer) : void 0;
    const result = await validateDeviceSessionServer({
      userId,
      activeSessionId: body.activeSessionId || req.headers["x-session-id"] || void 0,
      sessionVersion,
      deviceId: String(body.deviceId || req.headers["x-device-id"] || ""),
      hardwareSignature: String(body.hardwareSignature || req.headers["x-hardware-signature"] || ""),
      deviceSignature: String(body.deviceSignature || req.headers["x-device-signature"] || ""),
      allowBootstrapIfMissing: isVerifiedOwner || Boolean(body.allowBootstrapIfMissing) && !req.headers.authorization,
      firebaseUid: verifiedUid || body.firebaseUid,
      email: verifiedEmail || body.email,
      studentName: body.studentName,
      accountRole: body.accountRole === "teacher" ? "teacher" : "student",
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });
    if (!result.valid) {
      return res.status(401).json({
        success: false,
        valid: false,
        code: "SINGLE_DEVICE_SESSION_INVALID",
        reason: result.reason,
        terminatedBy: result.terminatedBy,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }
    return res.json({
      success: true,
      valid: true,
      bootstrapped: Boolean(result.bootstrapped),
      session: result.session
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      valid: false,
      error: error?.message || "Session validation error."
    });
  }
});
app.post("/api/auth/session/heartbeat", async (req, res) => {
  try {
    const body = req.body || {};
    const userId = String(body.userId || "").trim();
    let verifiedUid;
    let verifiedEmail;
    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          valid: false,
          error: tokenCheck.error || "Invalid or expired Firebase ID token."
        });
      }
      verifiedUid = tokenCheck.uid;
      verifiedEmail = tokenCheck.email;
    }
    const isVerifiedOwner = Boolean(
      verifiedUid && (verifiedUid === userId || body.firebaseUid && verifiedUid === String(body.firebaseUid).trim())
    );
    const rawVer = body.sessionVersion ?? req.headers["x-session-version"];
    const sessionVersion = rawVer !== void 0 && String(rawVer).trim() !== "" && Number.isFinite(Number(rawVer)) ? Number(rawVer) : void 0;
    const result = await heartbeatDeviceSessionServer({
      userId,
      activeSessionId: String(body.activeSessionId || req.headers["x-session-id"] || ""),
      sessionVersion,
      deviceId: String(body.deviceId || req.headers["x-device-id"] || ""),
      hardwareSignature: String(body.hardwareSignature || req.headers["x-hardware-signature"] || ""),
      deviceSignature: String(body.deviceSignature || req.headers["x-device-signature"] || ""),
      allowBootstrapIfMissing: isVerifiedOwner,
      firebaseUid: verifiedUid || body.firebaseUid,
      email: verifiedEmail || body.email,
      studentName: body.studentName,
      accountRole: body.accountRole === "teacher" ? "teacher" : "student",
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });
    if (!result.valid) {
      return res.status(401).json({
        success: false,
        valid: false,
        code: "SINGLE_DEVICE_SESSION_INVALID",
        reason: result.reason,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }
    return res.json({
      success: true,
      valid: true,
      bootstrapped: Boolean(result.bootstrapped),
      session: result.session
    });
  } catch (error) {
    return res.status(500).json({ success: false, valid: false, error: error?.message });
  }
});
app.post("/api/auth/session/release", async (req, res) => {
  try {
    const body = req.body || {};
    const result = await releaseDeviceSessionServer({
      userId: String(body.userId || "").trim(),
      activeSessionId: body.activeSessionId || req.headers["x-session-id"] || void 0,
      deviceId: body.deviceId || req.headers["x-device-id"] || void 0,
      hardwareSignature: body.hardwareSignature || req.headers["x-hardware-signature"] || void 0,
      reason: body.reason ? String(body.reason) : void 0
    });
    if (!result.released) {
      return res.status(403).json({
        success: false,
        released: false,
        error: result.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }
    return res.json({ success: true, released: true });
  } catch (error) {
    return res.status(500).json({ success: false, released: false, error: error?.message });
  }
});
app.post("/api/auth/session/recover", async (req, res) => {
  try {
    let verifiedUid;
    let verifiedEmail;
    if (req.headers.authorization) {
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          error: tokenCheck.error || "Verified Firebase login required for device recovery."
        });
      }
      verifiedUid = tokenCheck.uid;
      verifiedEmail = tokenCheck.email;
    }
    const body = req.body || {};
    const result = await recoverDeviceSessionServer({
      userId: String(body.userId || verifiedUid || "").trim(),
      firebaseUid: body.firebaseUid || verifiedUid,
      email: String(verifiedEmail || body.email || ""),
      mobile: String(body.mobile || ""),
      studentName: String(body.studentName || "Student"),
      accountRole: body.accountRole === "teacher" ? "teacher" : "student",
      deviceId: String(body.deviceId || req.headers["x-device-id"] || ""),
      hardwareSignature: String(body.hardwareSignature || req.headers["x-hardware-signature"] || ""),
      deviceSignature: String(body.deviceSignature || req.headers["x-device-signature"] || ""),
      deviceName: body.deviceName,
      deviceType: body.deviceType,
      browser: body.browser,
      os: body.os,
      userAgentSummary: body.userAgentSummary
    });
    return res.status(result.statusCode).json({
      success: result.success,
      error: result.error,
      session: result.session
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || "Device recovery failed."
    });
  }
});
app.get("/api/admin/sessions", async (req, res) => {
  const adminCheck = await verifyAdminRequest(req.headers);
  if (!adminCheck.authorized) {
    return res.status(adminCheck.statusCode).json({
      success: false,
      error: adminCheck.error || "Administrator authentication required."
    });
  }
  const sessions = await listDeviceSessionsAdminServer();
  return res.json({
    success: true,
    totalCount: sessions.length,
    sessions
  });
});
app.post("/api/admin/sessions/terminate", async (req, res) => {
  const adminCheck = await verifyAdminRequest(req.headers);
  if (!adminCheck.authorized) {
    return res.status(adminCheck.statusCode).json({
      success: false,
      error: adminCheck.error || "Administrator authentication required."
    });
  }
  try {
    const userId = String(req.body?.userId || "").trim();
    if (!userId) {
      return res.status(400).json({ success: false, error: "userId is required." });
    }
    const reason = String(req.body?.reason || "Terminated by administrator");
    const result = await terminateDeviceSessionAdminServer(userId, reason);
    return res.json({
      success: true,
      session: result.session
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error?.message || "Failed to terminate session."
    });
  }
});
app.post("/api/subscription/sync", async (req, res) => {
  try {
    const {
      studentId,
      plan,
      selectedBoard,
      board,
      selectedClass,
      activatedBoard,
      activatedClassLevel,
      accountRole,
      planPurchasedAt,
      planExpiresAt,
      paymentId
    } = req.body || {};
    const cleanStudentId = String(studentId || "").trim();
    if (!cleanStudentId) {
      return res.status(400).json({ success: false, error: "studentId is required." });
    }
    const isGuestOrDemo = cleanStudentId === "guest" || cleanStudentId.startsWith("demo_");
    if (!isGuestOrDemo) {
      const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
      if (!sessionCheck.valid) {
        return res.status(sessionCheck.statusCode).json({
          success: false,
          code: "SINGLE_DEVICE_SESSION_INVALID",
          error: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
        });
      }
    }
    if (isFirebaseAdminConfigured() && !isGuestOrDemo) {
      if (!req.headers.authorization) {
        return res.status(401).json({
          success: false,
          error: "Authentication Bearer token required for subscription synchronization."
        });
      }
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid || !tokenCheck.uid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          error: tokenCheck.error || "Invalid authentication token."
        });
      }
      const existingStudent = await serverGetDoc("students", cleanStudentId).catch(() => null);
      const matchesOwner = tokenCheck.uid === cleanStudentId || existingStudent?.firebaseUid === tokenCheck.uid;
      if (!matchesOwner) {
        const adminCheck = await verifyAdminRequest(req.headers);
        if (!adminCheck.authorized) {
          return res.status(403).json({
            success: false,
            error: "Forbidden: Token does not match target student account."
          });
        }
      }
    }
    const existingStoredSub = await evaluateServerSubscriptionFromStore(cleanStudentId);
    const storedStudent = await serverGetDoc("students", cleanStudentId).catch(() => null);
    const existingServerSub = serverStudentSubscriptions.get(cleanStudentId) || existingStoredSub;
    const existingMap = extractServerClassSubscriptionsMap(storedStudent || existingServerSub);
    const existingCatMap = extractServerCategorySubscriptionsMap(storedStudent || existingServerSub);
    const requestedTargetBoard = normalizeBackendBoard(
      selectedBoard || board || activatedBoard || storedStudent?.board || existingServerSub?.selectedBoard || "Maharashtra"
    );
    const requestedTargetClass = normalizeBackendClassLevel(selectedClass || activatedClassLevel) || normalizeBackendClassLevel(storedStudent?.classLevel) || existingServerSub?.selectedClass || "Class 1";
    const primaryBoard = normalizeBackendBoard(
      storedStudent?.primaryBoard || existingServerSub?.primaryBoard || storedStudent?.board || requestedTargetBoard
    );
    const primaryClassLevel = normalizeBackendClassLevel(storedStudent?.primaryClassLevel) || normalizeBackendClassLevel(existingServerSub?.primaryClassLevel) || normalizeBackendClassLevel(storedStudent?.classLevel) || requestedTargetClass;
    const resolvedRole = storedStudent?.accountRole === "teacher" || accountRole === "teacher" ? "teacher" : "student";
    if (plan === "basic" || plan === "premium") {
      const cleanPaymentId = String(paymentId || "").trim();
      const isSyntheticPayment = !cleanPaymentId || cleanPaymentId.startsWith("pay_sim_") || cleanPaymentId.startsWith("demo_") || cleanPaymentId === "simulated" || cleanPaymentId.length < 6;
      if (isSyntheticPayment) {
        return res.status(403).json({
          success: false,
          error: "Paid Plan requires a verified paymentId."
        });
      }
      let verifiedBoardFromProof = null;
      let verifiedClassFromProof = null;
      let verifiedPlanSkuFromProof = req.body?.planSku ? resolvePlanSku(req.body.planSku, "premium") : null;
      let paymentVerified = processedPaymentIds.has(cleanPaymentId);
      const ledgerMatch = transactionLedger.find(
        (t) => t.paymentId === cleanPaymentId && t.status === "SUCCESS" && t.studentId === cleanStudentId
      );
      if (ledgerMatch) {
        paymentVerified = true;
        if (ledgerMatch.planSku) verifiedPlanSkuFromProof = ledgerMatch.planSku;
        verifiedBoardFromProof = ledgerMatch.selectedBoard ? normalizeBackendBoard(ledgerMatch.selectedBoard) : null;
        verifiedClassFromProof = normalizeBackendClassLevel(ledgerMatch.selectedClass);
      }
      if (!paymentVerified || !verifiedClassFromProof || !verifiedPlanSkuFromProof) {
        const safePaymentId = cleanPaymentId.replace(/[^a-zA-Z0-9_-]/g, "_");
        const txDocId = safePaymentId.startsWith("tx_") ? safePaymentId : `tx_${safePaymentId}`;
        const txDoc = await serverGetDoc("transactions", txDocId).catch(() => null);
        if (txDoc && txDoc.status === "SUCCESS" && (!txDoc.studentId || txDoc.studentId === cleanStudentId)) {
          paymentVerified = true;
          processedPaymentIds.add(cleanPaymentId);
          if (txDoc.planSku) {
            verifiedPlanSkuFromProof = resolvePlanSku(txDoc.planSku, "premium", txDoc.amount);
          }
          if (txDoc.selectedBoard || txDoc.board) {
            verifiedBoardFromProof = normalizeBackendBoard(txDoc.selectedBoard || txDoc.board);
          }
          verifiedClassFromProof = normalizeBackendClassLevel(txDoc.selectedClass || txDoc.classLevel) || verifiedClassFromProof;
        }
      }
      if (!paymentVerified && storedStudent?.lastPaymentId === cleanPaymentId && storedStudent?.plan === "premium") {
        paymentVerified = true;
      }
      if (!paymentVerified && getResolvedRazorpayCredentials().isConfigured) {
        const apiCheck = await verifyAndConfirmCapturedPayment({
          paymentId: cleanPaymentId,
          expectedPlanId: "premium",
          expectedPlanSku: verifiedPlanSkuFromProof || void 0,
          autoCaptureIfAuthorized: false
        });
        const notesSid = String(apiCheck.notes?.studentId || "").trim();
        if (apiCheck.confirmed && (!notesSid || notesSid === cleanStudentId)) {
          paymentVerified = true;
          processedPaymentIds.add(cleanPaymentId);
          verifiedPlanSkuFromProof = resolvePlanSku(
            apiCheck.notes?.planSku || apiCheck.planSku,
            "premium",
            apiCheck.amountPaise
          );
          if (apiCheck.notes?.selectedBoard || apiCheck.notes?.board) {
            verifiedBoardFromProof = normalizeBackendBoard(
              apiCheck.notes?.selectedBoard || apiCheck.notes?.board
            );
          }
          verifiedClassFromProof = normalizeBackendClassLevel(
            apiCheck.notes?.selectedClass || apiCheck.notes?.classLevel
          ) || verifiedClassFromProof;
        }
      }
      if (!paymentVerified) {
        return res.status(403).json({
          success: false,
          error: "Unverified paymentId. Premium subscription sync rejected."
        });
      }
      const resolvedSyncSku = verifiedPlanSkuFromProof || "BOARD_CLASS";
      const syncPlanItem = getPlanCatalogItem(resolvedSyncSku);
      const isCatSync = syncPlanItem.unlockedCategories.length > 0;
      if (isCatSync) {
        const updatedCatMap = { ...existingCatMap };
        let resStart = "";
        let resExp = "";
        for (const catId of syncPlanItem.unlockedCategories) {
          const prevCat = updatedCatMap[catId];
          const fallbackCatDates = computeSubscriptionActivationDates({
            verificationTimestamp: prevCat?.purchasedAt || planPurchasedAt || /* @__PURE__ */ new Date(),
            existingPlan: prevCat ? "premium" : "free",
            existingExpiresAt: prevCat?.expiresAt
          });
          resStart = prevCat?.purchasedAt || planPurchasedAt || fallbackCatDates.purchasedDateIst;
          resExp = prevCat?.expiresAt || planExpiresAt || fallbackCatDates.expiryDateIst;
          updatedCatMap[catId] = {
            categoryId: catId,
            planSku: resolvedSyncSku,
            status: "ACTIVE",
            purchasedAt: resStart,
            expiresAt: resExp,
            paymentId: cleanPaymentId,
            amountInr: syncPlanItem.amountInr,
            validityDays: syncPlanItem.validityDays,
            updatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
        }
        const draftSub2 = {
          ...existingServerSub,
          studentId: cleanStudentId,
          plan: "premium",
          selectedBoard: existingServerSub.selectedBoard || requestedTargetBoard,
          selectedClass: existingServerSub.selectedClass || requestedTargetClass,
          primaryBoard,
          primaryClassLevel,
          classSubscriptions: existingMap,
          categorySubscriptions: updatedCatMap,
          accountRole: resolvedRole,
          hasStoredProfile: Boolean(storedStudent) || cleanStudentId !== "guest" && !cleanStudentId.startsWith("demo_"),
          isLifetimeFree: false,
          planPurchasedAt: existingServerSub.planPurchasedAt || resStart,
          planExpiresAt: existingServerSub.planExpiresAt && existingServerSub.planExpiresAt > resExp ? existingServerSub.planExpiresAt : resExp,
          paymentId: cleanPaymentId,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        draftSub2.activatedClassKeys = getServerActivatedBoardClassKeys(draftSub2);
        draftSub2.activatedClasses = getServerActivatedClasses(draftSub2);
        draftSub2.activatedCategoryKeys = getServerActivatedCategoryKeys(draftSub2);
        serverStudentSubscriptions.set(cleanStudentId, draftSub2);
        return res.json({ success: true, subscription: draftSub2 });
      }
      const targetPaidBoard = verifiedBoardFromProof || requestedTargetBoard;
      const targetPaidClass = verifiedClassFromProof || requestedTargetClass;
      const targetCompositeKey = buildBackendBoardClassKey(targetPaidBoard, targetPaidClass);
      const existingEntry = existingMap[targetCompositeKey];
      const fallbackDates = computeSubscriptionActivationDates({
        verificationTimestamp: existingEntry?.purchasedAt || planPurchasedAt || /* @__PURE__ */ new Date(),
        existingPlan: existingEntry?.plan || "free",
        existingExpiresAt: existingEntry?.expiresAt
      });
      const resolvedStart = existingEntry?.purchasedAt || planPurchasedAt || fallbackDates.purchasedDateIst;
      const resolvedExpiry = existingEntry?.expiresAt || planExpiresAt || fallbackDates.expiryDateIst;
      const updatedMap = {
        ...existingMap,
        [targetCompositeKey]: {
          board: targetPaidBoard,
          classLevel: targetPaidClass,
          boardClassKey: targetCompositeKey,
          plan: "premium",
          status: "ACTIVE",
          purchasedAt: resolvedStart,
          expiresAt: resolvedExpiry,
          paymentId: cleanPaymentId,
          amountInr: 99,
          validityDays: PAID_SUBSCRIPTION_VALIDITY_DAYS,
          updatedAt: (/* @__PURE__ */ new Date()).toISOString()
        }
      };
      const draftSub = {
        studentId: cleanStudentId,
        plan: "premium",
        selectedBoard: targetPaidBoard,
        selectedClass: targetPaidClass,
        primaryBoard,
        primaryClassLevel,
        activatedBoard: targetPaidBoard,
        activatedClassLevel: targetPaidClass,
        classSubscriptions: updatedMap,
        categorySubscriptions: existingCatMap,
        accountRole: resolvedRole,
        hasStoredProfile: Boolean(storedStudent) || cleanStudentId !== "guest" && !cleanStudentId.startsWith("demo_"),
        isLifetimeFree: false,
        planPurchasedAt: resolvedStart,
        planExpiresAt: resolvedExpiry,
        paymentId: cleanPaymentId,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      draftSub.activatedClassKeys = getServerActivatedBoardClassKeys(draftSub);
      draftSub.activatedClasses = getServerActivatedClasses(draftSub);
      draftSub.activatedCategoryKeys = getServerActivatedCategoryKeys(draftSub);
      serverStudentSubscriptions.set(cleanStudentId, draftSub);
      return res.json({ success: true, subscription: draftSub });
    }
    const freeRecord = {
      studentId: cleanStudentId,
      plan: "free",
      selectedBoard: requestedTargetBoard,
      selectedClass: requestedTargetClass,
      primaryBoard,
      primaryClassLevel,
      activatedBoard: null,
      activatedClassLevel: null,
      activatedClasses: [],
      activatedClassKeys: [],
      classSubscriptions: existingMap,
      activatedCategoryKeys: [],
      categorySubscriptions: existingCatMap,
      accountRole: resolvedRole,
      hasStoredProfile: Boolean(storedStudent) || cleanStudentId !== "guest" && !cleanStudentId.startsWith("demo_"),
      isLifetimeFree: true,
      planExpiresAt: null,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const evaluatedFree = (() => {
      serverStudentSubscriptions.set(cleanStudentId, freeRecord);
      return evaluateServerSubscription(cleanStudentId);
    })();
    serverStudentSubscriptions.set(cleanStudentId, evaluatedFree);
    return res.json({ success: true, subscription: evaluatedFree });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});
app.post("/api/subscription/switch-class", async (req, res) => {
  try {
    const cleanStudentId = String(req.body?.studentId || "").trim();
    const targetClass = normalizeBackendClassLevel(
      req.body?.targetClass || req.body?.selectedClass || req.body?.classLevel
    );
    if (!cleanStudentId || !targetClass) {
      return res.status(400).json({
        success: false,
        allowed: false,
        error: "Valid studentId and targetClass (Class 1 to Class 10) are required."
      });
    }
    const isGuestOrDemo = cleanStudentId === "guest" || cleanStudentId.startsWith("demo_");
    if ((isFirebaseAdminConfigured() || req.headers.authorization) && !isGuestOrDemo) {
      if (!req.headers.authorization) {
        return res.status(401).json({
          success: false,
          allowed: false,
          error: "Authentication Bearer token required to switch active class or board."
        });
      }
      const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
      if (!tokenCheck.valid || !tokenCheck.uid) {
        return res.status(tokenCheck.statusCode).json({
          success: false,
          allowed: false,
          error: tokenCheck.error || "Invalid authentication token."
        });
      }
      const existingStudent = await serverGetDoc("students", cleanStudentId).catch(() => null);
      const matchesOwner = tokenCheck.uid === cleanStudentId || existingStudent?.firebaseUid === tokenCheck.uid;
      if (!matchesOwner) {
        const adminCheck = await verifyAdminRequest(req.headers);
        if (!adminCheck.authorized) {
          return res.status(403).json({
            success: false,
            allowed: false,
            error: "Forbidden: Token does not match target student account."
          });
        }
      }
    }
    const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
    if (!sessionCheck.valid) {
      return res.status(sessionCheck.statusCode).json({
        success: false,
        allowed: false,
        code: "SINGLE_DEVICE_SESSION_INVALID",
        error: sessionCheck.error || SINGLE_DEVICE_BLOCK_MESSAGE
      });
    }
    const sub = await evaluateServerSubscriptionFromStore(cleanStudentId);
    const targetBoard = normalizeBackendBoard(
      req.body?.targetBoard || req.body?.selectedBoard || req.body?.board || sub.selectedBoard
    );
    const targetCompositeKey = buildBackendBoardClassKey(targetBoard, targetClass);
    const incomingStudentKeys = Array.isArray(req.body?.studentActivatedClassKeys) ? req.body.studentActivatedClassKeys.map((k) => parseBackendBoardClassKey(String(k || ""))).filter(Boolean).map((p) => buildBackendBoardClassKey(p.board, p.classLevel)) : [];
    const activateIfMissing = Boolean(req.body?.activateAdditionalBoardClass);
    const mergedStudentActivatedKeys = Array.from(
      /* @__PURE__ */ new Set([
        ...Array.isArray(sub.studentActivatedClassKeys) ? sub.studentActivatedClassKeys : [],
        ...incomingStudentKeys,
        ...activateIfMissing ? [targetCompositeKey] : []
      ])
    );
    const subWithActivations = {
      ...sub,
      studentActivatedClassKeys: mergedStudentActivatedKeys
    };
    const classStatus = getServerBoardClassStatus(subWithActivations, targetBoard, targetClass);
    if (!classStatus.isAccessible) {
      return res.status(403).json({
        success: false,
        allowed: false,
        status: classStatus.status,
        needsPurchase: classStatus.status === "LOCKED",
        needsRenewal: classStatus.status === "EXPIRED",
        targetBoard,
        targetClass,
        boardClassKey: classStatus.boardClassKey,
        error: classStatus.status === "EXPIRED" ? `Your subscription for ${targetBoard} \u2022 ${targetClass} has expired. Renew ${targetBoard} (${targetClass}) for \u20B999 (365 Days) to switch.` : `${targetBoard} \u2022 ${targetClass} is locked on your account. Activate ${targetBoard} (${targetClass}) before switching.`
      });
    }
    const updatedSub = {
      ...subWithActivations,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      plan: classStatus.isPaidActive ? "premium" : "free",
      activatedBoard: classStatus.isPaidActive ? targetBoard : sub.activatedBoard,
      activatedClassLevel: classStatus.isPaidActive ? targetClass : sub.activatedClassLevel,
      planPurchasedAt: classStatus.purchasedAt || sub.planPurchasedAt,
      planExpiresAt: classStatus.expiresAt ?? sub.planExpiresAt,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    serverStudentSubscriptions.set(cleanStudentId, updatedSub);
    try {
      if (!isGuestOrDemo) {
        const isPrimaryOrPaid = targetBoard === (sub.primaryBoard || "Maharashtra") && targetClass === (sub.primaryClassLevel || "Class 1") || classStatus.isPaidActive;
        const updateDocPayload = {
          activeWorkspaceBoard: targetBoard,
          activeWorkspaceClassLevel: targetClass,
          lastActiveDate: (/* @__PURE__ */ new Date()).toISOString()
        };
        if (mergedStudentActivatedKeys.length > 0) {
          updateDocPayload.studentActivatedClassKeys = mergedStudentActivatedKeys;
        }
        if (isPrimaryOrPaid) {
          updateDocPayload.board = targetBoard;
          updateDocPayload.classLevel = targetClass;
        }
        await serverUpdateDoc("students", cleanStudentId, updateDocPayload);
      }
    } catch {
    }
    return res.json({
      success: true,
      allowed: true,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      boardClassKey: classStatus.boardClassKey,
      studentActivatedClassKeys: mergedStudentActivatedKeys,
      status: classStatus.status,
      subscription: updatedSub
    });
  } catch (error) {
    return res.status(500).json({ success: false, allowed: false, error: error.message });
  }
});
async function verifyStudentOwnershipOrAdmin(req, targetStudentId) {
  const cleanTargetId = String(targetStudentId || "").trim();
  if (!cleanTargetId) {
    return { authorized: false, statusCode: 400, error: "studentId is required." };
  }
  const tokenCheck = await verifyBearerIdToken(req.headers.authorization);
  if (!tokenCheck.valid || !tokenCheck.uid) {
    return {
      authorized: false,
      statusCode: tokenCheck.statusCode || 401,
      error: tokenCheck.error || "Valid Firebase Authorization Bearer token required."
    };
  }
  if (tokenCheck.uid === cleanTargetId) {
    return { authorized: true, statusCode: 200, uid: tokenCheck.uid };
  }
  const existingStudent = await serverGetDoc("students", cleanTargetId).catch(() => null);
  if (existingStudent?.firebaseUid === tokenCheck.uid) {
    return { authorized: true, statusCode: 200, uid: tokenCheck.uid };
  }
  const adminCheck = await verifyAdminRequest(req.headers);
  if (adminCheck.authorized) {
    return { authorized: true, statusCode: 200, uid: tokenCheck.uid };
  }
  return {
    authorized: false,
    statusCode: 403,
    error: "Forbidden: Authenticated user does not own this student account."
  };
}
app.get("/api/subscription/status/:studentId", async (req, res) => {
  const studentId = String(req.params.studentId || "").trim();
  const ownerCheck = await verifyStudentOwnershipOrAdmin(req, studentId);
  if (!ownerCheck.authorized) {
    return res.status(ownerCheck.statusCode).json({
      success: false,
      error: ownerCheck.error || "Unauthorized access to subscription status."
    });
  }
  const sub = await evaluateServerSubscriptionFromStore(studentId);
  const queryBoard = req.query.board ? normalizeBackendBoard(String(req.query.board)) : null;
  const userBoard = queryBoard || sub.selectedBoard || sub.primaryBoard || "Maharashtra";
  const userClass = sub.selectedClass || sub.primaryClassLevel || "Class 1";
  const demoIds = getServerFreeDemoIdsForClass(userClass, userBoard);
  const perClassStatus = Object.fromEntries(
    VALID_CLASS_LEVELS.map((cls) => [cls, getServerBoardClassStatus(sub, userBoard, cls)])
  );
  const perBoardClassStatus = Object.fromEntries(
    VALID_BOARDS.flatMap(
      (b) => VALID_CLASS_LEVELS.map((cls) => [
        buildBackendBoardClassKey(b, cls),
        getServerBoardClassStatus(sub, b, cls)
      ])
    )
  );
  return res.json({
    success: true,
    subscription: sub,
    perClassStatus,
    perBoardClassStatus,
    activatedCategoryKeys: getServerActivatedCategoryKeys(sub),
    categorySubscriptions: sub.categorySubscriptions || {},
    catalog: PLAN_CATALOG,
    plans: {
      free: {
        id: "free",
        name: "Free Plan",
        priceInr: 0,
        validity: "Lifetime (Never Expires)",
        selectedBoard: sub.primaryBoard || userBoard,
        selectedClass: sub.primaryClassLevel || userClass,
        allowedSubjects: Array.from(SERVER_FREE_ALLOWED_SUBJECTS),
        allowedWorksheets: demoIds,
        allowedFeatures: Array.from(SERVER_FREE_ALLOWED_FEATURES)
      },
      premium: {
        id: "premium",
        name: "Premium Plan",
        priceInr: 99,
        validity: "1 Year (365 Days) Per Board & Class",
        selectedBoard: userBoard,
        selectedClass: userClass,
        activatedClasses: getServerActivatedClasses(sub, userBoard),
        activatedClassKeys: getServerActivatedBoardClassKeys(sub),
        activatedCategoryKeys: getServerActivatedCategoryKeys(sub),
        allowedSubjects: "ALL_SUBJECTS_FOR_SELECTED_BOARD_AND_CLASS",
        allowedWorksheets: `ALL_WORKSHEETS_FOR_${userBoard.toUpperCase()}_${userClass.toUpperCase().replace(/\s+/g, "_")}`,
        allowedFeatures: "ALL_FEATURES"
      }
    }
  });
});
var SERVER_WORKSHEET_UPGRADE_MSG = "Unlock All Worksheets for Your Board & Class \u2013 Only \u20B999!";
app.post("/api/subscription/verify-access", async (req, res) => {
  const { studentId, feature, categoryId, subject, worksheetId, selectedBoard, board, selectedClass } = req.body || {};
  const cleanStudentId = String(studentId || "").trim();
  const isGuestOrDemo = !cleanStudentId || cleanStudentId === "guest" || cleanStudentId.startsWith("demo_");
  if (!isGuestOrDemo) {
    const ownerCheck = await verifyStudentOwnershipOrAdmin(req, cleanStudentId);
    if (!ownerCheck.authorized) {
      return res.status(ownerCheck.statusCode).json({
        allowed: false,
        error: ownerCheck.error || "Unauthorized access verification request."
      });
    }
    const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
    if (!sessionCheck.valid) {
      return res.status(sessionCheck.statusCode).json({
        allowed: false,
        code: "SINGLE_DEVICE_SESSION_INVALID",
        error: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE,
        message: sessionCheck.error || SESSION_LOGGED_IN_ELSEWHERE_MESSAGE
      });
    }
  }
  const sub = await evaluateServerSubscriptionFromStore(cleanStudentId);
  if (categoryId) {
    const cat = String(categoryId);
    const allowed = ALL_CATEGORY_IDS.includes(cat) && hasServerCategoryAccess(sub, cat);
    return res.json({
      success: true,
      allowed,
      categoryId: cat,
      activatedCategoryKeys: getServerActivatedCategoryKeys(sub),
      effectivePlan: allowed ? "premium" : "free",
      requiredPlan: "premium",
      message: allowed ? "Category plan access granted." : `Paid plan required to unlock ${cat}.`
    });
  }
  const requestedBoard = selectedBoard || board ? normalizeBackendBoard(selectedBoard || board) : null;
  const requestedClass = normalizeBackendClassLevel(selectedClass);
  const userBoard = (sub.hasStoredProfile ? sub.selectedBoard : requestedBoard) || sub.selectedBoard || sub.primaryBoard || "Maharashtra";
  const userClass = (sub.hasStoredProfile ? sub.selectedClass : requestedClass) || sub.selectedClass || sub.primaryClassLevel || "Class 1";
  if (worksheetId) {
    const cleanWsId = String(worksheetId).trim();
    const parsedWs = parseServerWorksheetBoardAndClass(cleanWsId);
    const wsBoard = parsedWs?.board || requestedBoard || userBoard;
    const wsClass = parsedWs?.classLevel || requestedClass || userClass;
    const wsClassStatus = getServerBoardClassStatus(sub, wsBoard, wsClass);
    const activePaidKeys = getServerActivatedBoardClassKeys(sub);
    const hasUniversalWs = wsClassStatus.isPaidActive || hasServerUniversalWorksheetAccess(sub);
    const demoIds = new Set(getServerFreeDemoIdsForClass(wsClass, wsBoard));
    const isDemo = demoIds.has(cleanWsId);
    let allowed = false;
    let upgradeMsg = SERVER_WORKSHEET_UPGRADE_MSG;
    if (hasUniversalWs) {
      allowed = true;
      upgradeMsg = "";
    } else if (wsClassStatus.status === "EXPIRED") {
      if (wsClassStatus.isFreeBase && activePaidKeys.length === 0 && isDemo) {
        allowed = true;
        upgradeMsg = "";
      } else {
        allowed = false;
        upgradeMsg = `Subscription Expired: Your 1-year subscription for ${wsBoard} (${wsClass}) has expired. Renew for \u20B999 (365 Days) to restore access!`;
      }
    } else if (wsClassStatus.status === "LOCKED") {
      allowed = false;
      upgradeMsg = `Board & Class Restriction: ${wsBoard} (${wsClass}) is locked on your account. Activate ${wsBoard} (${wsClass}) for \u20B999 (365 Days) to unlock all worksheets.`;
    } else {
      allowed = isDemo;
    }
    return res.json({
      success: true,
      allowed,
      isDemo: hasUniversalWs ? false : isDemo && allowed,
      isOtherClassLocked: !hasUniversalWs && wsClassStatus.status === "LOCKED",
      isClassExpired: !hasUniversalWs && wsClassStatus.status === "EXPIRED",
      selectedBoard: userBoard,
      selectedClass: userClass,
      worksheetBoard: wsBoard,
      worksheetClass: wsClass,
      effectivePlan: hasUniversalWs ? "premium" : "free",
      requiredPlan: "premium",
      upgradeMessage: allowed ? "" : upgradeMsg,
      message: allowed ? "Worksheet access granted." : upgradeMsg
    });
  }
  const targetBoard = requestedBoard || userBoard;
  const targetClass = requestedClass || userClass;
  const targetStatus = getServerBoardClassStatus(sub, targetBoard, targetClass);
  if (subject) {
    const allowedOnFree = SERVER_FREE_ALLOWED_SUBJECTS.has(String(subject));
    let allowed = false;
    if (targetStatus.isPaidActive) {
      allowed = true;
    } else if (targetStatus.status === "ACTIVE_FREE") {
      allowed = allowedOnFree;
    } else if (targetStatus.status === "EXPIRED") {
      allowed = targetStatus.isFreeBase && getServerActivatedBoardClassKeys(sub).length === 0 && allowedOnFree;
    }
    return res.json({
      success: true,
      allowed,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      effectivePlan: targetStatus.isPaidActive ? "premium" : "free",
      requiredPlan: "premium",
      message: allowed ? "Access granted." : targetStatus.status === "LOCKED" ? `${targetBoard} \u2022 ${targetClass} is locked. Activate for \u20B999 (365 Days) to unlock ${subject}.` : `${subject} requires the \u20B999 Premium Plan for ${targetBoard} (${targetClass}).`
    });
  }
  if (feature) {
    const cleanFeature = String(feature);
    const hasAnyActivePaid = getServerActivatedBoardClassKeys(sub).length > 0;
    const isBoardClassFeature = cleanFeature === "study-material";
    const hasCategoryUnlock = cleanFeature === "scholarship" && (hasServerCategoryAccess(sub, "scholarship_4th") || hasServerCategoryAccess(sub, "scholarship_7th")) || cleanFeature === "tet-ctet" && (hasServerCategoryAccess(sub, "maha_tet") || hasServerCategoryAccess(sub, "ctet_paper_1") || hasServerCategoryAccess(sub, "ctet_paper_2"));
    const allowed = isBoardClassFeature ? targetStatus.isPaidActive || targetStatus.status === "ACTIVE_FREE" : cleanFeature === "scholarship" || cleanFeature === "tet-ctet" ? hasCategoryUnlock : targetStatus.isPaidActive || hasAnyActivePaid || SERVER_FREE_ALLOWED_FEATURES.has(cleanFeature);
    const effectivePlan = hasCategoryUnlock || targetStatus.isPaidActive || !isBoardClassFeature && hasAnyActivePaid ? "premium" : "free";
    return res.json({
      success: true,
      allowed,
      selectedBoard: targetBoard,
      selectedClass: targetClass,
      effectivePlan,
      requiredPlan: "premium",
      message: allowed ? "Access granted." : "This feature requires an active paid subscription plan."
    });
  }
  return res.json({
    success: true,
    allowed: targetStatus.isAccessible,
    selectedBoard: targetBoard,
    selectedClass: targetClass,
    effectivePlan: targetStatus.isPaidActive ? "premium" : "free"
  });
});
app.get("/api/worksheets/access/:studentId", async (req, res) => {
  const studentId = String(req.params.studentId || "").trim();
  const ownerCheck = await verifyStudentOwnershipOrAdmin(req, studentId);
  if (!ownerCheck.authorized) {
    return res.status(ownerCheck.statusCode).json({
      success: false,
      error: ownerCheck.error || "Unauthorized access to worksheet entitlements."
    });
  }
  const queryBoard = req.query.selectedBoard || req.query.board ? normalizeBackendBoard(String(req.query.selectedBoard || req.query.board)) : null;
  const queryClass = req.query.selectedClass ? normalizeBackendClassLevel(String(req.query.selectedClass)) : null;
  const sub = await evaluateServerSubscriptionFromStore(studentId);
  const userBoard = (sub.hasStoredProfile ? queryBoard || sub.selectedBoard : queryBoard) || sub.selectedBoard || sub.primaryBoard || "Maharashtra";
  const userClass = (sub.hasStoredProfile ? queryClass || sub.selectedClass : queryClass) || sub.selectedClass || sub.primaryClassLevel || "Class 1";
  const classStatus = getServerBoardClassStatus(sub, userBoard, userClass);
  const isPremium = classStatus.isPaidActive || hasServerUniversalWorksheetAccess(sub);
  const demoIds = getServerFreeDemoIdsForClass(userClass, userBoard);
  return res.json({
    success: true,
    studentId,
    selectedBoard: userBoard,
    selectedClass: userClass,
    classStatus: classStatus.status,
    activatedBoard: classStatus.isPaidActive ? userBoard : null,
    activatedClassLevel: classStatus.isPaidActive ? userClass : null,
    activatedClasses: getServerActivatedClasses(sub, userBoard),
    activatedClassKeys: getServerActivatedBoardClassKeys(sub),
    effectivePlan: isPremium ? "premium" : "free",
    isPremium,
    printingAllowed: false,
    downloadingAllowed: false,
    demoWorksheetIds: !isPremium && classStatus.status === "ACTIVE_FREE" ? demoIds : [],
    allowedWorksheets: isPremium ? "ALL_WORKSHEETS_UNIVERSAL_ALL_BOARDS_CLASSES_1_TO_10" : classStatus.status === "ACTIVE_FREE" ? demoIds : [],
    upgradeMessage: SERVER_WORKSHEET_UPGRADE_MSG
  });
});
app.post("/api/worksheets/verify-access", async (req, res) => {
  const { studentId, worksheetId, selectedBoard, board, selectedClass } = req.body || {};
  const cleanStudentId = String(studentId || "").trim();
  const cleanWorksheetId = String(worksheetId || "").trim();
  if (!cleanWorksheetId) {
    return res.status(400).json({
      success: false,
      allowed: false,
      error: "worksheetId is required."
    });
  }
  const isGuestOrDemo = !cleanStudentId || cleanStudentId === "guest" || cleanStudentId.startsWith("demo_");
  if (!isGuestOrDemo) {
    const ownerCheck = await verifyStudentOwnershipOrAdmin(req, cleanStudentId);
    if (!ownerCheck.authorized) {
      return res.status(ownerCheck.statusCode).json({
        success: false,
        allowed: false,
        error: ownerCheck.error || "Unauthorized worksheet access verification."
      });
    }
  }
  const sessionCheck = await verifyRequestDeviceSession(req, cleanStudentId);
  if (!sessionCheck.valid) {
    return res.status(sessionCheck.statusCode).json({
      success: false,
      allowed: false,
      code: "SINGLE_DEVICE_SESSION_INVALID",
      error: sessionCheck.error || SINGLE_DEVICE_BLOCK_MESSAGE
    });
  }
  const sub = await evaluateServerSubscriptionFromStore(cleanStudentId);
  const parsedWs = parseServerWorksheetBoardAndClass(cleanWorksheetId);
  const userBoard = (sub.hasStoredProfile ? sub.selectedBoard : selectedBoard || board ? normalizeBackendBoard(selectedBoard || board) : null) || sub.selectedBoard || sub.primaryBoard || parsedWs?.board || "Maharashtra";
  const userClass = (sub.hasStoredProfile ? sub.selectedClass : normalizeBackendClassLevel(selectedClass)) || sub.selectedClass || sub.primaryClassLevel || parsedWs?.classLevel || "Class 1";
  const wsBoard = parsedWs?.board || userBoard;
  const wsClass = parsedWs?.classLevel || userClass;
  const wsClassStatus = getServerBoardClassStatus(sub, wsBoard, wsClass);
  const activePaidKeys = getServerActivatedBoardClassKeys(sub);
  const hasUniversalWs = wsClassStatus.isPaidActive || hasServerUniversalWorksheetAccess(sub);
  const demoIds = new Set(getServerFreeDemoIdsForClass(wsClass, wsBoard));
  const isDemo = demoIds.has(cleanWorksheetId);
  let allowed = false;
  let upgradeMsg = SERVER_WORKSHEET_UPGRADE_MSG;
  if (hasUniversalWs) {
    allowed = true;
    upgradeMsg = "";
  } else if (wsClassStatus.status === "EXPIRED") {
    if (wsClassStatus.isFreeBase && activePaidKeys.length === 0 && isDemo) {
      allowed = true;
      upgradeMsg = "";
    } else {
      allowed = false;
      upgradeMsg = `Subscription Expired: Your 1-year subscription for ${wsBoard} (${wsClass}) has expired. Renew for \u20B999 (365 Days) to restore access!`;
    }
  } else if (wsClassStatus.status === "LOCKED") {
    allowed = false;
    upgradeMsg = `Board & Class Restriction: ${wsBoard} (${wsClass}) is locked on your account. Activate ${wsBoard} (${wsClass}) for \u20B999 (365 Days) to unlock worksheets.`;
  } else {
    allowed = isDemo;
  }
  return res.status(allowed ? 200 : 403).json({
    success: allowed,
    allowed,
    isDemo: hasUniversalWs ? false : isDemo && allowed,
    isOtherClassLocked: !hasUniversalWs && wsClassStatus.status === "LOCKED",
    isClassExpired: !hasUniversalWs && wsClassStatus.status === "EXPIRED",
    studentId: cleanStudentId,
    selectedBoard: userBoard,
    selectedClass: userClass,
    worksheetBoard: wsBoard,
    worksheetClass: wsClass,
    worksheetId: cleanWorksheetId,
    effectivePlan: hasUniversalWs ? "premium" : "free",
    requiredPlan: "premium",
    printingAllowed: false,
    downloadingAllowed: false,
    upgradeMessage: allowed ? "" : upgradeMsg
  });
});
function resolveClientIp(req) {
  const fwd = req.headers["x-forwarded-for"];
  if (typeof fwd === "string" && fwd.trim()) {
    return fwd.split(",")[0].trim();
  }
  return req.ip || req.socket?.remoteAddress || "unknown";
}
app.post("/api/support/chat", async (req, res) => {
  try {
    const payload = await handleSupportChatRequest(
      req.body || {},
      resolveClientIp(req)
    );
    return res.status(payload.success ? 200 : 400).json(payload);
  } catch (err) {
    console.error("[Support Chat Route Error]:", err);
    return res.status(500).json({
      success: false,
      source: "kb_fallback",
      aiStatus: "upstream_error",
      reply: "Help Desk encountered a temporary issue. Please retry your question or submit a Support Request.",
      language: "en",
      navigationActions: [],
      suggestSupportTicket: true
    });
  }
});
app.get("/api/support/status", (_req, res) => {
  return res.json({
    success: true,
    ...getSupportAiStatus()
  });
});
app.get("/api/support/tickets", async (req, res) => {
  try {
    const studentId = req.query.studentId ? String(req.query.studentId).trim() : void 0;
    const ticketNumber = req.query.ticketNumber ? String(req.query.ticketNumber).trim() : void 0;
    const authHeader = req.headers.authorization;
    const rawToken = typeof authHeader === "string" && authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : void 0;
    if (ticketNumber) {
      const adminCheck2 = rawToken ? await verifyAdminRequest(req.headers).catch(() => ({ authorized: false })) : { authorized: false };
      const tickets2 = await getServerSupportTickets({
        ticketNumber,
        bearerToken: rawToken,
        includeContactDetails: Boolean(adminCheck2.authorized)
      });
      return res.json({
        success: true,
        count: tickets2.length,
        tickets: tickets2
      });
    }
    if (studentId) {
      const tokenRes = rawToken ? await verifyBearerIdToken(authHeader).catch(() => null) : null;
      const adminCheck2 = !tokenRes?.valid || tokenRes.uid !== studentId ? await verifyAdminRequest(req.headers).catch(() => ({ authorized: false, statusCode: 401 })) : { authorized: true, statusCode: 200 };
      const isOwner = Boolean(tokenRes?.valid && tokenRes.uid === studentId);
      if (!isOwner && !adminCheck2.authorized) {
        return res.status(401).json({
          success: false,
          tickets: [],
          error: "Authentication required to list account support tickets."
        });
      }
      const tickets2 = await getServerSupportTickets({
        studentId,
        bearerToken: rawToken,
        includeContactDetails: true
      });
      return res.json({
        success: true,
        count: tickets2.length,
        tickets: tickets2
      });
    }
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode || 401).json({
        success: false,
        tickets: [],
        error: adminCheck.error || "Administrator authorization required to list all support tickets."
      });
    }
    const tickets = await getServerSupportTickets({
      bearerToken: rawToken,
      includeContactDetails: true
    });
    return res.json({
      success: true,
      count: tickets.length,
      tickets
    });
  } catch (err) {
    console.error("[Support Ticket List Route Error]:", err);
    return res.status(500).json({
      success: false,
      tickets: [],
      error: "Unable to load support requests right now."
    });
  }
});
app.post("/api/support/tickets", async (req, res) => {
  try {
    const result = await handleSupportTicketSubmission(
      req.body || {},
      { authorization: req.headers.authorization },
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err) {
    console.error("[Support Ticket Route Error]:", err);
    return res.status(500).json({
      success: false,
      persisted: false,
      error: "Unable to submit your support request right now. Please try again shortly."
    });
  }
});
app.patch("/api/support/tickets/:ticketId", async (req, res) => {
  try {
    const adminCheck = await verifyAdminRequest(req.headers);
    if (!adminCheck.authorized) {
      return res.status(adminCheck.statusCode || 401).json({
        success: false,
        error: adminCheck.error || "Administrator authorization required to update support tickets."
      });
    }
    const authHeader = req.headers.authorization;
    const rawToken = typeof authHeader === "string" && authHeader.startsWith("Bearer ") ? authHeader.slice("Bearer ".length).trim() : void 0;
    const ticketId = String(req.params.ticketId || "").trim();
    const { status, adminResponse } = req.body || {};
    const result = await updateServerSupportTicketStatus(
      ticketId,
      String(status || "IN_PROGRESS"),
      adminResponse !== void 0 ? String(adminResponse) : void 0,
      rawToken
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err) {
    console.error("[Support Ticket Update Route Error]:", err);
    return res.status(500).json({
      success: false,
      error: "Unable to update support ticket status."
    });
  }
});
app.get("/api/ai/status", (_req, res) => {
  return res.json({
    success: true,
    ...getAiServiceStatus()
  });
});
app.post("/api/ai/generate", async (req, res) => {
  try {
    const result = await handleAiTextGenerate(
      req.body || {},
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err) {
    console.error("[AI Generate Route Error]:", err);
    return res.status(500).json({
      success: false,
      errorCode: "INTERNAL_ERROR",
      message: "Unexpected AI server error."
    });
  }
});
app.post("/api/ai/image", async (req, res) => {
  try {
    const result = await handleAiImageGenerate(
      req.body || {},
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err) {
    console.error("[AI Image Route Error]:", err);
    return res.status(500).json({
      success: false,
      errorCode: "INTERNAL_ERROR",
      message: "Unexpected AI image server error."
    });
  }
});
app.get("/api/snapsolve/status", (_req, res) => {
  return res.json({
    success: true,
    ...getSnapSolveStatus()
  });
});
app.post("/api/snapsolve/recognize", async (req, res) => {
  try {
    const result = await handleSnapSolveRecognize(
      req.body || {},
      req.headers,
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch {
    return res.status(500).json({
      success: false,
      errorCode: "INTERNAL_ERROR",
      message: "Unexpected error while scanning uploaded pages."
    });
  }
});
app.post("/api/snapsolve/solve", async (req, res) => {
  try {
    const result = await handleSnapSolveSolve(
      req.body || {},
      req.headers,
      resolveClientIp(req)
    );
    return res.status(result.statusCode).json(result.payload);
  } catch {
    return res.status(500).json({
      success: false,
      errorCode: "INTERNAL_ERROR",
      message: "Unexpected error while generating SnapSolve answers."
    });
  }
});
app.delete("/api/snapsolve/session/:sessionId", async (req, res) => {
  try {
    const result = await handleSnapSolveDeleteSession(
      String(req.params.sessionId || ""),
      req.headers
    );
    return res.status(result.statusCode).json(result.payload);
  } catch {
    return res.status(500).json({
      success: false,
      errorCode: "INTERNAL_ERROR",
      message: "Failed to clear temporary SnapSolve session."
    });
  }
});
app.get("/api/dictionary/entries", async (_req, res) => {
  try {
    const entries = await getServerCustomDictionaryEntries();
    return res.json({
      success: true,
      count: entries.length,
      entries
    });
  } catch (err) {
    console.error("[Dictionary GET Error]:", err);
    return res.status(500).json({
      success: false,
      entries: [],
      message: "Failed to load custom dictionary entries."
    });
  }
});
app.post("/api/dictionary/entries", async (req, res) => {
  try {
    const result = await addServerCustomDictionaryEntry(
      req.body || {}
    );
    return res.status(result.statusCode).json(result.payload);
  } catch (err) {
    console.error("[Dictionary POST Error]:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to save dictionary entry."
    });
  }
});
function isSafeExternalEducationalUrl(rawUrl) {
  try {
    const trimmed = String(rawUrl || "").trim();
    if (!trimmed) return { safe: false, reason: "URL is required." };
    const parsed = new URL(trimmed);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return { safe: false, reason: "Only HTTP/HTTPS educational links are permitted." };
    }
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".local") || host.endsWith(".internal") || host === "0.0.0.0" || host === "::1" || host === "[::1]" || /^127\./.test(host) || /^10\./.test(host) || /^192\.168\./.test(host) || /^169\.254\./.test(host) || /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(host)) {
      return { safe: false, reason: "Private or local network addresses are not permitted." };
    }
    return { safe: true, parsed };
  } catch {
    return { safe: false, reason: "Malformed URL format." };
  }
}
app.post("/api/study-library/verify-link", async (req, res) => {
  const rawUrl = String(req.body?.url || "").trim();
  const check = isSafeExternalEducationalUrl(rawUrl);
  if (!check.safe || !check.parsed) {
    return res.status(400).json({
      success: false,
      ok: false,
      status: 0,
      url: rawUrl,
      error: check.reason || "Invalid URL.",
      checkedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
  const targetUrl = check.parsed.toString();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5e3);
  try {
    let response = await fetch(targetUrl, {
      method: "HEAD",
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "User-Agent": "MyStudyZone-LinkVerifier/1.0 (+https://mystudyzone.in)"
      }
    }).catch(() => null);
    if (!response || response.status === 405 || response.status === 403 || response.status >= 500) {
      response = await fetch(targetUrl, {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: {
          "User-Agent": "MyStudyZone-LinkVerifier/1.0 (+https://mystudyzone.in)",
          Range: "bytes=0-1024"
        }
      });
    }
    const ok = response.status >= 200 && response.status < 400;
    return res.status(200).json({
      success: true,
      ok,
      status: response.status,
      url: rawUrl,
      finalUrl: response.url || targetUrl,
      contentType: response.headers.get("content-type") || "unknown",
      checkedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  } catch (err) {
    return res.status(200).json({
      success: true,
      ok: false,
      status: 0,
      url: rawUrl,
      finalUrl: targetUrl,
      error: err?.name === "AbortError" ? "Connection timed out after 5 seconds." : "Unable to reach destination server.",
      checkedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  } finally {
    clearTimeout(timeoutId);
  }
});
async function startServer() {
  const isProduction = process.env.NODE_ENV === "production";
  const httpServer = http.createServer(app);
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        allowedHosts: [
          "mystudyzone.in",
          "www.mystudyzone.in",
          ".netlify.app",
          "ais-dev-alhqutb2uhqexyjuas5mhs-851623560969.asia-northeast1.run.app",
          "ais-pre-alhqutb2uhqexyjuas5mhs-851623560969.asia-northeast1.run.app",
          ".run.app",
          "localhost",
          "127.0.0.1"
        ],
        hmr: false,
        ws: false,
        watch: null
      },
      appType: "spa"
    });
    app.get("/@vite/client", (_req, res) => {
      res.setHeader("Content-Type", "application/javascript; charset=utf-8");
      res.setHeader("Cache-Control", "no-cache");
      res.send(`
const sheetsMap = new Map();
const linkSheetsMap = new Map();
if ("document" in globalThis) {
  document.querySelectorAll("style[data-vite-dev-id]").forEach((el) => {
    sheetsMap.set(el.getAttribute("data-vite-dev-id"), el);
  });
  document.querySelectorAll('link[rel="stylesheet"][data-vite-dev-id]').forEach((el) => {
    linkSheetsMap.set(el.getAttribute("data-vite-dev-id"), el);
  });
}
let lastInsertedStyle;
export function updateStyle(id, content) {
  if (linkSheetsMap.has(id)) return;
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.setAttribute("data-vite-dev-id", id);
    style.textContent = content;
    if (!lastInsertedStyle) {
      document.head.appendChild(style);
      setTimeout(() => { lastInsertedStyle = undefined; }, 0);
    } else {
      lastInsertedStyle.insertAdjacentElement("afterend", style);
    }
    lastInsertedStyle = style;
  } else if (style.textContent !== content) {
    style.textContent = content;
  }
  sheetsMap.set(id, style);
}
export function removeStyle(id) {
  if (linkSheetsMap.has(id)) {
    document.querySelectorAll('link[rel="stylesheet"][data-vite-dev-id="' + CSS.escape(id) + '"]').forEach((el) => el.remove());
    linkSheetsMap.delete(id);
  }
  const style = sheetsMap.get(id);
  if (style) {
    document.head.removeChild(style);
    sheetsMap.delete(id);
  }
}
export function createHotContext() {
  return {
    data: {},
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    decline() {},
    invalidate() {},
    on() {},
    off() {},
    send() {}
  };
}
export function injectQuery(url, queryToInject) {
  if (url[0] !== "." && url[0] !== "/") return url;
  const pathname = url.replace(/[?#].*$/, "");
  const { search, hash } = new URL(url, "http://vite.dev");
  return pathname + "?" + queryToInject + (search ? "&" + search.slice(1) : "") + (hash || "");
}
export class ErrorOverlay extends HTMLElement {}
`);
    });
    app.use(vite.middlewares);
    console.log("[Dev Mode] Vite middlewares mounted to Express (HMR WebSocket disabled).");
  } else {
    const distPath = path4.resolve(process.cwd(), "dist");
    app.use(
      express.static(distPath, {
        maxAge: "1y",
        immutable: true,
        setHeaders: (res, filePath) => {
          if (filePath.endsWith(".html") || filePath.endsWith("manifest.json") || filePath.endsWith("manifest.webmanifest") || filePath.endsWith("sw.js") || filePath.endsWith("registerSW.js")) {
            res.setHeader("Cache-Control", "no-cache, must-revalidate");
          } else if (filePath.includes(`${path4.sep}assets${path4.sep}`)) {
            res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
          }
        }
      })
    );
    app.get("*", (_req, res) => {
      res.setHeader("Cache-Control", "no-cache, must-revalidate");
      res.sendFile(path4.resolve(distPath, "index.html"));
    });
    console.log("[Production Mode] Compressed static dist served with immutable asset caching.");
  }
  const rawPort = process.env.PORT;
  if (rawPort === "passenger") {
    httpServer.listen("passenger", () => {
      console.log("\u{1F680} Champion Learning Server running via Phusion Passenger");
    });
  } else if (rawPort && (rawPort.startsWith("/") || rawPort.endsWith(".sock"))) {
    httpServer.listen(rawPort, () => {
      console.log(`\u{1F680} Champion Learning Server running on Unix socket: ${rawPort}`);
    });
  } else {
    const listenPort = parseInt(rawPort || "3000", 10) || 3e3;
    httpServer.listen(listenPort, "0.0.0.0", () => {
      console.log(`\u{1F680} Champion Learning Server running on http://0.0.0.0:${listenPort}`);
    });
  }
}
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
