import {
  SupportTicket,
  SupportCategory,
  SupportUserCategory,
  normalizeSupportUserCategory,
  GrievanceRecord,
  GrievanceCategory,
  GrievanceStatus,
  QuestionReport,
  QuestionIssueType,
  FaqItem
} from '../types/support';
import { auth, db } from '../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  updateDoc,
  query,
  orderBy,
  limit,
  where
} from 'firebase/firestore';
import {
  ADMIN_CACHE_DEFAULT_TTL_MS,
  cachedAdminFetch,
  updateCachedAdminValue
} from './adminCacheService';

const STORAGE_KEYS = {
  TICKETS: 'vc_support_tickets_cache',
  GRIEVANCES: 'vc_grievances_cache',
  QUESTION_REPORTS: 'vc_question_reports_cache',
  FAQS: 'vc_site_faqs_cache'
};

// Seed FAQs with high quality educational and platform information
export const DEFAULT_FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Plans & Pricing',
    question: 'What are the subscription plans available on MyStudyZone?',
    answer: 'We offer transparent, one-time plans:\n1. FREE PLAN – ₹0 – Lifetime: Includes 2 Demo Worksheets (English & Mathematics for your registered class), English & Mathematics quizzes, Brain Puzzles, Sudoku, and 1 TET & 1 CTET Full-Length Free Demo Mock Test.\n2. SCHOOL PREMIUM PLAN – ₹99 – 1 Year (365 Days): Complete class-wise access to all school curriculum subjects, worksheets, 45+ audio moral stories, Chhatrapati Shivaji Maharaj 50 chapters, Drawing Studio, Cricket Quiz Arena, 4th & 7th Std Maharashtra Scholarship, Future AI Skills, and ₹5 referral cashback wallet.\n3. TEACHER PLANS – TET & CTET (Paper 1 & 2):\n   • TET (Paper 1 & 2): 6 Months ₹199 (MRP ₹399) | 1 Year ₹299 (MRP ₹599)\n   • CTET (Paper 1 & 2): 6 Months ₹199 (MRP ₹399) | 1 Year ₹299 (MRP ₹599)\n   • Combo Offer (TET Paper 1 & 2 + CTET Paper 1 & 2): 6 Months ₹349 (MRP ₹699) | 1 Year ₹499 (MRP ₹999)',
    tags: ['pricing', 'subscription', '99', '199', '299', '349', '499', 'tet', 'ctet', 'plans', '365 days', '1 year', '6 months']
  },
  {
    id: 'faq-2',
    category: 'Payment & Activation',
    question: 'How do I pay and how quickly is my subscription activated?',
    answer: 'You can pay instantly using Razorpay Checkout (UPI, Cards, NetBanking) or scan our dynamic Razorpay UPI QR Code using Google Pay, PhonePe, Paytm, or BHIM. Once payment is captured and verified by our backend server, your 1-year (365-day) subscription activates instantly in your profile.',
    tags: ['payment', 'razorpay', 'upi', 'qr code', 'activation']
  },
  {
    id: 'faq-3',
    category: 'Learning & Quizzes',
    question: 'How does the "Zero Repeated Questions" quiz system work?',
    answer: 'Our smart quiz engine tracks all attempted question IDs per student account in Firestore. When you start a 10-question practice set, the system filters out questions you have already attempted, ensuring you get fresh practice every single time until you complete the entire syllabus bank.',
    tags: ['quizzes', 'repeat', 'practice', 'questions']
  },
  {
    id: 'faq-4',
    category: 'Audio Stories & Media',
    question: 'Can I listen to stories in both Marathi and English?',
    answer: 'Yes! Story World features 45+ moral stories with natural female voice narrations in both Marathi and English. You can switch narration languages anytime, toggle text speed, and read synchronized bilingual text while listening.',
    tags: ['stories', 'marathi', 'english', 'audio', 'voice']
  },
  {
    id: 'faq-5',
    category: 'Scholarship Exam Prep',
    question: 'Which classes have Maharashtra Scholarship examination modules?',
    answer: 'We provide specialized Maharashtra State Examination Council (MSCE) scholarship preparation modules for Class 4 (Pre-Upper Primary) and Class 7 (Pre-Secondary), including Paper 1 (First Language & Mathematics) and Paper 2 (Third Language & Intelligence Test/Mental Ability).',
    tags: ['scholarship', 'class 4', 'class 7', 'msce']
  },
  {
    id: 'faq-6',
    category: 'Help & Complaints',
    question: 'What if a quiz question or answer appears incorrect?',
    answer: 'Under every quiz question, click the "Report Question" button. This automatically logs the question ID and your remarks. Our academic review panel will verify it against official Maharashtra State Board textbooks and update the question bank.',
    tags: ['incorrect answer', 'error', 'report', 'support']
  },
  {
    id: 'faq-7',
    category: 'Account & Safety',
    question: 'Can I switch my enrolled class grade?',
    answer: 'To protect syllabus progression and exam records, class levels are permanently locked upon enrollment. If you enrolled in the wrong class by mistake, please submit a Help & Support ticket with your student UID, and an administrator will review and adjust your grade.',
    tags: ['class switch', 'grade lock', 'account']
  }
];

function generateTicketNumber(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `TKT-VC-${rand}`;
}

function generateGrievanceNumber(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `GRV-VC-${rand}`;
}

function generateReportNumber(): string {
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `REP-VC-${rand}`;
}

function getLocalData<T>(key: string, defaultVal: T[]): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultVal;
    return JSON.parse(raw);
  } catch {
    return defaultVal;
  }
}

function saveLocalData<T>(key: string, data: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn(`[SupportService] Failed to write localStorage for ${key}`, err);
  }
}

async function getOptionalBearerToken(): Promise<string> {
  try {
    if (auth?.currentUser) {
      return await auth.currentUser.getIdToken();
    }
  } catch {
    // Ignore token fetch errors
  }
  return '';
}

function mergeTicketByFreshness(
  map: Map<string, SupportTicket>,
  incoming: SupportTicket
): void {
  if (!incoming || !incoming.id) return;
  const existing = map.get(incoming.id);
  if (!existing) {
    map.set(incoming.id, incoming);
    return;
  }
  const existingTs = new Date(existing.updatedAt || existing.createdAt || 0).getTime();
  const incomingTs = new Date(incoming.updatedAt || incoming.createdAt || 0).getTime();
  if (incomingTs >= existingTs) {
    map.set(incoming.id, incoming);
  }
}

export function cacheSavedSupportTicketLocally(ticket: SupportTicket): void {
  const localList = getLocalData<SupportTicket>(STORAGE_KEYS.TICKETS, []);
  const filtered = localList.filter(
    (t) => t.id !== ticket.id && t.ticketNumber !== ticket.ticketNumber
  );
  filtered.unshift(ticket);
  saveLocalData(STORAGE_KEYS.TICKETS, filtered);
  updateCachedAdminValue<SupportTicket[]>('admin:support_tickets', (prev) => [
    ticket,
    ...prev.filter((t) => t.id !== ticket.id && t.ticketNumber !== ticket.ticketNumber),
  ]);
}

// 1. Support Ticket Operations
export async function createSupportTicket(data: {
  studentId: string;
  studentName: string;
  email: string;
  mobile?: string;
  userCategory?: SupportUserCategory;
  category: SupportCategory;
  subject: string;
  description: string;
  screenshotUrl?: string;
}): Promise<SupportTicket> {
  const userCategory = normalizeSupportUserCategory(data.userCategory);

  // Try server endpoint first so ticket is persisted centrally
  const bearerToken = await getOptionalBearerToken();
  try {
    const res = await fetch('/api/support/tickets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      },
      body: JSON.stringify({
        userCategory,
        requesterRole: userCategory,
        name: data.studentName || 'Student',
        email: data.email,
        mobile: data.mobile || '',
        category: data.category,
        subject: data.subject.trim(),
        description: data.description.trim(),
        studentId: data.studentId || 'guest',
      }),
    });
    const payload = await res.json().catch(() => null);
    if (res.ok && payload?.success && payload?.persisted && payload?.ticket) {
      const serverTicket: SupportTicket = {
        ...payload.ticket,
        userCategory: normalizeSupportUserCategory(
          payload.ticket.userCategory || payload.ticket.requesterRole || userCategory
        ),
        screenshotUrl: data.screenshotUrl || payload.ticket.screenshotUrl || '',
      };
      cacheSavedSupportTicketLocally(serverTicket);
      try {
        if (db) {
          await setDoc(doc(db, 'support_tickets', serverTicket.id), serverTicket);
        }
      } catch {
        // Already persisted on server
      }
      return serverTicket;
    }
  } catch {
    // Fall back to Firestore + local cache if server endpoint unreachable
  }

  const ticketNumber = generateTicketNumber();
  const id = `tkt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const newTicket: SupportTicket = {
    id,
    ticketNumber,
    studentId: data.studentId || 'guest',
    studentName: data.studentName || 'Student',
    email: data.email,
    mobile: data.mobile || '',
    userCategory,
    requesterRole: userCategory,
    category: data.category,
    subject: data.subject.trim(),
    description: data.description.trim(),
    screenshotUrl: data.screenshotUrl || '',
    status: 'OPEN',
    priority: data.category.includes('Payment') ? 'HIGH' : 'MEDIUM',
    createdAt: now,
    updatedAt: now
  };

  cacheSavedSupportTicketLocally(newTicket);

  try {
    if (db) {
      await setDoc(doc(db, 'support_tickets', newTicket.id), newTicket);
    }
  } catch (err) {
    console.warn('[SupportService] Failed to sync ticket to Firestore, local copy active:', err);
  }

  return newTicket;
}

export async function getSupportTickets(
  studentId?: string,
  forceRefresh: boolean = false
): Promise<SupportTicket[]> {
  const bearerToken = await getOptionalBearerToken();

  if (studentId) {
    const localList = getLocalData<SupportTicket>(STORAGE_KEYS.TICKETS, []);
    const map = new Map<string, SupportTicket>();

    if (bearerToken) {
      try {
        const res = await fetch(
          `/api/support/tickets?studentId=${encodeURIComponent(studentId)}`,
          { headers: { Authorization: `Bearer ${bearerToken}` } }
        );
        const data = await res.json().catch(() => null);
        if (res.ok && Array.isArray(data?.tickets)) {
          for (const t of data.tickets as SupportTicket[]) {
            mergeTicketByFreshness(map, t);
          }
        }
      } catch {
        // Continue with Firestore + local cache
      }
    }

    try {
      if (db) {
        const snap = await getDocs(
          query(collection(db, 'support_tickets'), where('studentId', '==', studentId), limit(100))
        );
        if (!snap.empty) {
          snap.docs.forEach((d) => {
            mergeTicketByFreshness(map, d.data() as SupportTicket);
          });
        }
      }
    } catch {
      // Fallback to local cache
    }

    localList
      .filter((t) => t.studentId === studentId)
      .forEach((t) => mergeTicketByFreshness(map, t));

    return Array.from(map.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return cachedAdminFetch(
    'admin:support_tickets',
    async () => {
      const localList = getLocalData<SupportTicket>(STORAGE_KEYS.TICKETS, []);
      const map = new Map<string, SupportTicket>();

      if (bearerToken) {
        try {
          const res = await fetch('/api/support/tickets', {
            headers: { Authorization: `Bearer ${bearerToken}` },
          });
          const data = await res.json().catch(() => null);
          if (res.ok && Array.isArray(data?.tickets)) {
            for (const t of data.tickets as SupportTicket[]) {
              mergeTicketByFreshness(map, t);
            }
          }
        } catch {
          // Continue with Firestore + local cache
        }
      }

      try {
        if (db) {
          let snap;
          try {
            snap = await getDocs(
              query(collection(db, 'support_tickets'), orderBy('createdAt', 'desc'), limit(250))
            );
          } catch {
            snap = await getDocs(query(collection(db, 'support_tickets'), limit(250)));
          }
          if (!snap.empty) {
            snap.forEach((d) => {
              mergeTicketByFreshness(map, d.data() as SupportTicket);
            });
          }
        }
      } catch (err) {
        console.warn('[SupportService] Firestore read failed, using server & cached tickets:', err);
      }

      localList.forEach((t) => mergeTicketByFreshness(map, t));

      const merged = Array.from(map.values()).sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      saveLocalData(STORAGE_KEYS.TICKETS, merged);
      return merged;
    },
    { ttlMs: ADMIN_CACHE_DEFAULT_TTL_MS, forceRefresh }
  );
}

export async function getSupportTicketByNumber(ticketNumber: string): Promise<SupportTicket | null> {
  const trimmed = ticketNumber.trim().toUpperCase();
  if (!trimmed) return null;

  const bearerToken = await getOptionalBearerToken();
  const candidates: SupportTicket[] = [];

  try {
    const res = await fetch(
      `/api/support/tickets?ticketNumber=${encodeURIComponent(trimmed)}`,
      bearerToken ? { headers: { Authorization: `Bearer ${bearerToken}` } } : undefined
    );
    const data = await res.json().catch(() => null);
    if (res.ok && Array.isArray(data?.tickets) && data.tickets.length > 0) {
      candidates.push(...(data.tickets as SupportTicket[]));
    }
  } catch {
    // Fallback to Firestore / local cache below
  }

  try {
    if (db) {
      const snap = await getDocs(
        query(collection(db, 'support_tickets'), where('ticketNumber', '==', trimmed), limit(1))
      );
      if (!snap.empty) {
        candidates.push(snap.docs[0].data() as SupportTicket);
      }
    }
  } catch {
    // Ignore Firestore rule errors for guest/cross-account lookups
  }

  const localList = getLocalData<SupportTicket>(STORAGE_KEYS.TICKETS, []);
  const localHit = localList.find(
    (t) => t.ticketNumber.toUpperCase() === trimmed || t.id.toUpperCase() === trimmed
  );
  if (localHit) {
    candidates.push(localHit);
  }

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    const tB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    const tA = new Date(a.updatedAt || a.createdAt || 0).getTime();
    return tB - tA;
  });
  return candidates[0];
}

export async function updateSupportTicketStatus(
  ticketId: string, 
  status: SupportTicket['status'], 
  adminResponse?: string
): Promise<boolean> {
  const localList = getLocalData<SupportTicket>(STORAGE_KEYS.TICKETS, []);
  const idx = localList.findIndex(t => t.id === ticketId || t.ticketNumber === ticketId);
  const now = new Date().toISOString();

  if (idx !== -1) {
    localList[idx].status = status;
    localList[idx].updatedAt = now;
    if (adminResponse !== undefined) {
      localList[idx].adminResponse = adminResponse;
    }
    saveLocalData(STORAGE_KEYS.TICKETS, localList);
  }

  updateCachedAdminValue<SupportTicket[]>('admin:support_tickets', (prev) =>
    prev.map((t) =>
      t.id === ticketId || t.ticketNumber === ticketId
        ? {
            ...t,
            status,
            updatedAt: now,
            ...(adminResponse !== undefined ? { adminResponse } : {}),
          }
        : t
    )
  );

  const bearerToken = await getOptionalBearerToken();
  let serverUpdated = false;
  try {
    const res = await fetch(`/api/support/tickets/${encodeURIComponent(ticketId)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...(bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {}),
      },
      body: JSON.stringify({
        status,
        ...(adminResponse !== undefined ? { adminResponse } : {}),
      }),
    });
    serverUpdated = res.ok;
  } catch {
    serverUpdated = false;
  }

  try {
    if (db) {
      const tRef = doc(db, 'support_tickets', ticketId);
      const updateData: any = { status, updatedAt: now };
      if (adminResponse !== undefined) updateData.adminResponse = adminResponse;
      await updateDoc(tRef, updateData);
    }
    return true;
  } catch (err) {
    console.warn('[SupportService] Failed to update ticket in Firestore:', err);
    return serverUpdated || idx !== -1;
  }
}

// 2. Grievance Redressal Operations
export async function createGrievance(data: {
  studentId: string;
  studentName: string;
  email: string;
  mobile?: string;
  category: GrievanceCategory;
  subject: string;
  description: string;
}): Promise<GrievanceRecord> {
  const grievanceNumber = generateGrievanceNumber();
  const id = `grv_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const newGrievance: GrievanceRecord = {
    id,
    grievanceNumber,
    studentId: data.studentId || 'guest',
    studentName: data.studentName || 'Student',
    email: data.email,
    mobile: data.mobile || '',
    category: data.category,
    subject: data.subject.trim(),
    description: data.description.trim(),
    status: 'Submitted',
    createdAt: now,
    updatedAt: now
  };

  const localList = getLocalData<GrievanceRecord>(STORAGE_KEYS.GRIEVANCES, []);
  localList.unshift(newGrievance);
  saveLocalData(STORAGE_KEYS.GRIEVANCES, localList);
  updateCachedAdminValue<GrievanceRecord[]>('admin:grievances', (prev) => [newGrievance, ...prev]);

  try {
    if (db) {
      await setDoc(doc(db, 'grievances', newGrievance.id), newGrievance);
    }
  } catch (err) {
    console.warn('[SupportService] Grievance Firestore sync deferred:', err);
  }

  return newGrievance;
}

export async function getGrievances(
  studentId?: string,
  forceRefresh: boolean = false
): Promise<GrievanceRecord[]> {
  if (studentId) {
    const localList = getLocalData<GrievanceRecord>(STORAGE_KEYS.GRIEVANCES, []);
    try {
      if (db) {
        const snap = await getDocs(
          query(collection(db, 'grievances'), where('studentId', '==', studentId), limit(100))
        );
        if (!snap.empty) {
          const firestoreList = snap.docs.map(d => d.data() as GrievanceRecord);
          const map = new Map<string, GrievanceRecord>();
          firestoreList.forEach(g => map.set(g.id, g));
          localList.filter(g => g.studentId === studentId).forEach(g => {
            if (!map.has(g.id)) map.set(g.id, g);
          });
          return Array.from(map.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
      }
    } catch {
      // Fallback
    }
    return localList.filter(g => g.studentId === studentId);
  }

  return cachedAdminFetch(
    'admin:grievances',
    async () => {
      const localList = getLocalData<GrievanceRecord>(STORAGE_KEYS.GRIEVANCES, []);
      try {
        if (db) {
          let snap;
          try {
            snap = await getDocs(
              query(collection(db, 'grievances'), orderBy('createdAt', 'desc'), limit(250))
            );
          } catch {
            snap = await getDocs(query(collection(db, 'grievances'), limit(250)));
          }
          if (!snap.empty) {
            const firestoreList: GrievanceRecord[] = [];
            snap.forEach(d => {
              firestoreList.push(d.data() as GrievanceRecord);
            });
            const map = new Map<string, GrievanceRecord>();
            firestoreList.forEach(g => map.set(g.id, g));
            localList.forEach(g => {
              if (!map.has(g.id)) map.set(g.id, g);
            });
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            saveLocalData(STORAGE_KEYS.GRIEVANCES, merged);
            return merged;
          }
        }
      } catch (err) {
        console.warn('[SupportService] Firestore read failed for grievances:', err);
      }
      return localList;
    },
    { ttlMs: ADMIN_CACHE_DEFAULT_TTL_MS, forceRefresh }
  );
}

export async function getGrievanceByNumber(grievanceNumber: string): Promise<GrievanceRecord | null> {
  const trimmed = grievanceNumber.trim().toUpperCase();
  const all = await getGrievances();
  const found = all.find(g => g.grievanceNumber.toUpperCase() === trimmed || g.id === trimmed);
  return found || null;
}

export async function updateGrievanceStatus(
  grievanceId: string, 
  status: GrievanceStatus, 
  adminResolution?: string
): Promise<boolean> {
  const localList = getLocalData<GrievanceRecord>(STORAGE_KEYS.GRIEVANCES, []);
  const idx = localList.findIndex(g => g.id === grievanceId || g.grievanceNumber === grievanceId);
  const now = new Date().toISOString();

  if (idx !== -1) {
    localList[idx].status = status;
    localList[idx].updatedAt = now;
    if (adminResolution !== undefined) {
      localList[idx].adminResolution = adminResolution;
    }
    saveLocalData(STORAGE_KEYS.GRIEVANCES, localList);
  }

  updateCachedAdminValue<GrievanceRecord[]>('admin:grievances', (prev) =>
    prev.map((g) =>
      g.id === grievanceId || g.grievanceNumber === grievanceId
        ? {
            ...g,
            status,
            updatedAt: now,
            ...(adminResolution !== undefined ? { adminResolution } : {}),
          }
        : g
    )
  );

  try {
    if (db) {
      const gRef = doc(db, 'grievances', grievanceId);
      const updateData: any = { status, updatedAt: now };
      if (adminResolution !== undefined) updateData.adminResolution = adminResolution;
      await updateDoc(gRef, updateData);
    }
    return true;
  } catch (err) {
    console.warn('[SupportService] Failed to update grievance in Firestore:', err);
    return idx !== -1;
  }
}

// 3. Question Reporting Operations
export async function createQuestionReport(data: {
  questionId: string;
  questionText: string;
  board?: string;
  subject: string;
  classLevel: string;
  selectedAnswer?: string;
  correctAnswer?: string;
  issueType: QuestionIssueType;
  details: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
}): Promise<QuestionReport> {
  const reportNumber = generateReportNumber();
  const id = `rep_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const now = new Date().toISOString();

  const newReport: QuestionReport = {
    id,
    reportNumber,
    questionId: data.questionId,
    questionText: data.questionText,
    board: data.board || 'Maharashtra',
    subject: data.subject,
    classLevel: data.classLevel,
    selectedAnswer: data.selectedAnswer,
    correctAnswer: data.correctAnswer,
    issueType: data.issueType,
    details: data.details.trim(),
    studentId: data.studentId,
    studentName: data.studentName,
    studentEmail: data.studentEmail,
    status: 'PENDING_REVIEW',
    createdAt: now
  };

  const localList = getLocalData<QuestionReport>(STORAGE_KEYS.QUESTION_REPORTS, []);
  localList.unshift(newReport);
  saveLocalData(STORAGE_KEYS.QUESTION_REPORTS, localList);
  updateCachedAdminValue<QuestionReport[]>('admin:question_reports', (prev) => [newReport, ...prev]);

  try {
    if (db) {
      await setDoc(doc(db, 'question_reports', newReport.id), newReport);
    }
  } catch (err) {
    console.warn('[SupportService] Question report Firestore sync deferred:', err);
  }

  return newReport;
}

export async function getQuestionReports(forceRefresh: boolean = false): Promise<QuestionReport[]> {
  return cachedAdminFetch(
    'admin:question_reports',
    async () => {
      const localList = getLocalData<QuestionReport>(STORAGE_KEYS.QUESTION_REPORTS, []);
      try {
        if (db) {
          let snap;
          try {
            snap = await getDocs(
              query(collection(db, 'question_reports'), orderBy('createdAt', 'desc'), limit(250))
            );
          } catch {
            snap = await getDocs(query(collection(db, 'question_reports'), limit(250)));
          }
          if (!snap.empty) {
            const firestoreList: QuestionReport[] = [];
            snap.forEach(d => firestoreList.push(d.data() as QuestionReport));
            const map = new Map<string, QuestionReport>();
            firestoreList.forEach(r => map.set(r.id, r));
            localList.forEach(r => {
              if (!map.has(r.id)) map.set(r.id, r);
            });
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            saveLocalData(STORAGE_KEYS.QUESTION_REPORTS, merged);
            return merged;
          }
        }
      } catch (err) {
        console.warn('[SupportService] Failed to read question reports from Firestore:', err);
      }
      return localList;
    },
    { ttlMs: ADMIN_CACHE_DEFAULT_TTL_MS, forceRefresh }
  );
}

export async function updateQuestionReportStatus(
  reportId: string, 
  status: QuestionReport['status'], 
  adminNotes?: string
): Promise<boolean> {
  const localList = getLocalData<QuestionReport>(STORAGE_KEYS.QUESTION_REPORTS, []);
  const idx = localList.findIndex(r => r.id === reportId || r.reportNumber === reportId);

  if (idx !== -1) {
    localList[idx].status = status;
    if (adminNotes !== undefined) localList[idx].adminNotes = adminNotes;
    saveLocalData(STORAGE_KEYS.QUESTION_REPORTS, localList);
  }

  updateCachedAdminValue<QuestionReport[]>('admin:question_reports', (prev) =>
    prev.map((r) =>
      r.id === reportId || r.reportNumber === reportId
        ? { ...r, status, ...(adminNotes !== undefined ? { adminNotes } : {}) }
        : r
    )
  );

  try {
    if (db) {
      const rRef = doc(db, 'question_reports', reportId);
      const updateData: any = { status };
      if (adminNotes !== undefined) updateData.adminNotes = adminNotes;
      await updateDoc(rRef, updateData);
    }
    return true;
  } catch (err) {
    console.warn('[SupportService] Failed to update question report in Firestore:', err);
    return idx !== -1;
  }
}

// 4. FAQ Operations
export async function getSiteFaqs(): Promise<FaqItem[]> {
  const localList = getLocalData<FaqItem>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
  return localList;
}

export async function saveSiteFaq(faq: FaqItem): Promise<void> {
  const localList = getLocalData<FaqItem>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
  const idx = localList.findIndex(f => f.id === faq.id);
  if (idx !== -1) {
    localList[idx] = faq;
  } else {
    localList.push(faq);
  }
  saveLocalData(STORAGE_KEYS.FAQS, localList);
}

export async function deleteSiteFaq(faqId: string): Promise<void> {
  const localList = getLocalData<FaqItem>(STORAGE_KEYS.FAQS, DEFAULT_FAQS);
  const filtered = localList.filter(f => f.id !== faqId);
  saveLocalData(STORAGE_KEYS.FAQS, filtered);
}
