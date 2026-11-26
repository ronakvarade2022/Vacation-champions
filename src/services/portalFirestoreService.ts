import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from './firebase';
import type {
  ClassLevel,
  EducationBoard,
  ParentProfile,
  PortalRole,
  StudentProfile,
  SubjectName,
} from '../types';

export type VerificationStatus = 'PENDING_VERIFICATION' | 'VERIFIED' | 'REJECTED';

export interface PortalRoleRecord {
  id: string;
  role: Exclude<PortalRole, 'admin'>;
  displayName: string;
  email: string;
  mobile: string;
  city?: string;
  board?: EducationBoard;
  classLevel?: ClassLevel;
  medium?: 'English' | 'Marathi' | 'Hindi' | 'Semi-English';
  qualification?: string;
  teachingSubjects?: SubjectName[];
  classesTaught?: ClassLevel[];
  relationship?: 'Mother' | 'Father' | 'Guardian';
  institutionId?: string;
  instituteId?: string;
  verificationStatus?: VerificationStatus;
  createdAt: string;
  updatedAt: string;
}

const PORTAL_ROLES_LOCAL_KEY = 'msz_portal_roles_cache_v1';
const CORE_SKILL_PROGRESS_LOCAL_KEY = 'msz_core_skill_progress_v1';

export interface CoreSkillProgressRecord {
  vedicCompletedChapters: string[];
  vedicBestSpeedScore: number;
  abacusCompletedLessons: string[];
  abacusBestFlashScore: number;
  phonicsCompletedLevels: string[];
  phonicsBestScore: number;
  updatedAt: string;
}

export const DEFAULT_CORE_SKILL_PROGRESS: CoreSkillProgressRecord = {
  vedicCompletedChapters: [],
  vedicBestSpeedScore: 0,
  abacusCompletedLessons: [],
  abacusBestFlashScore: 0,
  phonicsCompletedLevels: [],
  phonicsBestScore: 0,
  updatedAt: new Date().toISOString(),
};

function readLocalPortalMap(): Record<string, PortalRoleRecord> {
  try {
    const raw = localStorage.getItem(PORTAL_ROLES_LOCAL_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeLocalPortalMap(map: Record<string, PortalRoleRecord>): void {
  try {
    localStorage.setItem(PORTAL_ROLES_LOCAL_KEY, JSON.stringify(map));
  } catch {
    // Ignore storage quota errors
  }
}

export function findLocalPortalAccountByEmailOrMobile(
  email: string,
  mobile?: string
): PortalRoleRecord | null {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const cleanMobile = String(mobile || '').replace(/\D/g, '').slice(-10);
  const all = Object.values(readLocalPortalMap());
  return (
    all.find(
      (item) =>
        (cleanEmail && item.email.trim().toLowerCase() === cleanEmail) ||
        (cleanMobile.length === 10 &&
          item.mobile.replace(/\D/g, '').slice(-10) === cleanMobile)
    ) || null
  );
}

export async function savePortalRoleRecord(record: PortalRoleRecord): Promise<void> {
  const cleanId = String(record.id || '').trim();
  if (!cleanId) return;
  const safeRecord: PortalRoleRecord = {
    ...record,
    id: cleanId,
    email: record.email.trim().toLowerCase(),
    mobile: record.mobile.replace(/\D/g, '').slice(-10),
    updatedAt: new Date().toISOString(),
  };

  const localMap = readLocalPortalMap();
  localMap[cleanId] = safeRecord;
  writeLocalPortalMap(localMap);

  try {
    const cleanPayload = JSON.parse(JSON.stringify(safeRecord));
    await setDoc(doc(db, 'portal_roles', cleanId), cleanPayload, { merge: true });
  } catch {
    // Local cache preserves offline continuity if rules/network reject
  }
}

export async function fetchPortalRoleRecord(
  uid: string,
  emailHint?: string
): Promise<PortalRoleRecord | null> {
  const cleanUid = String(uid || '').trim();
  const cleanEmail = String(emailHint || '').trim().toLowerCase();
  const localMap = readLocalPortalMap();

  try {
    if (cleanUid) {
      const snap = await getDoc(doc(db, 'portal_roles', cleanUid));
      if (snap.exists()) {
        const data = snap.data() as PortalRoleRecord;
        localMap[cleanUid] = data;
        writeLocalPortalMap(localMap);
        return data;
      }
    }
    if (cleanEmail) {
      const q = query(
        collection(db, 'portal_roles'),
        where('email', '==', cleanEmail),
        limit(1)
      );
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        const data = qSnap.docs[0].data() as PortalRoleRecord;
        localMap[data.id] = data;
        writeLocalPortalMap(localMap);
        return data;
      }
    }
  } catch {
    // Fallback to local cache
  }

  if (cleanUid && localMap[cleanUid]) {
    return localMap[cleanUid];
  }
  if (cleanEmail) {
    return (
      Object.values(localMap).find(
        (r) => r.email.trim().toLowerCase() === cleanEmail
      ) || null
    );
  }
  return null;
}

export async function saveParentProfileToFirestore(
  parent: ParentProfile
): Promise<{ success: boolean }> {
  try {
    const cleanPayload = JSON.parse(
      JSON.stringify({
        ...parent,
        email: parent.email.trim().toLowerCase(),
        mobile: parent.mobile.replace(/\D/g, '').slice(-10),
        updatedAt: new Date().toISOString(),
      })
    );
    await setDoc(doc(db, 'parents', parent.id), cleanPayload, { merge: true });
    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function fetchParentProfileFromFirestore(
  uid: string
): Promise<ParentProfile | null> {
  const cleanUid = String(uid || '').trim();
  if (!cleanUid) return null;
  try {
    const snap = await getDoc(doc(db, 'parents', cleanUid));
    if (snap.exists()) {
      return snap.data() as ParentProfile;
    }
  } catch {
    // Ignore offline error
  }
  return null;
}

export async function lookupStudentForParentLinking(params: {
  studentEmailOrId: string;
  studentMobile: string;
  localStudents: StudentProfile[];
}): Promise<{ found: boolean; student?: StudentProfile; reason?: string }> {
  const cleanQuery = params.studentEmailOrId.trim().toLowerCase();
  const cleanMobile = params.studentMobile.replace(/\D/g, '').slice(-10);

  if (!cleanQuery || cleanMobile.length !== 10) {
    return {
      found: false,
      reason: 'Enter the student registered email/ID and exact 10-digit mobile number.',
    };
  }

  const localMatch = params.localStudents.find(
    (s) =>
      s.accountRole !== 'teacher' &&
      (s.email.trim().toLowerCase() === cleanQuery ||
        s.id.toLowerCase() === cleanQuery ||
        (s.parentLinkCode || '').toLowerCase() === cleanQuery) &&
      s.mobile.replace(/\D/g, '').slice(-10) === cleanMobile
  );

  if (localMatch) {
    return { found: true, student: localMatch };
  }

  try {
    if (cleanQuery.includes('@')) {
      const q = query(
        collection(db, 'students'),
        where('email', '==', cleanQuery),
        limit(1)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        const stu = snap.docs[0].data() as StudentProfile;
        if (
          stu.accountRole !== 'teacher' &&
          (stu.mobile || '').replace(/\D/g, '').slice(-10) === cleanMobile
        ) {
          return { found: true, student: stu };
        }
      }
    }
  } catch {
    // Ignore permission restriction on unlinked Firestore query
  }

  return {
    found: false,
    reason:
      'No verified Student account matched both that Email/ID and 10-digit Mobile number.',
  };
}

export async function saveParentMessageToFirestore(
  parentId: string,
  message: {
    id: string;
    studentId: string;
    studentName: string;
    recipient: 'Class Teacher' | 'School Office';
    subject: string;
    body: string;
    sentAt: string;
    status: 'SENT' | 'REPLIED';
  }
): Promise<void> {
  try {
    await setDoc(
      doc(db, 'parents', parentId, 'messages', message.id),
      JSON.parse(JSON.stringify(message)),
      { merge: true }
    );
  } catch {
    // Fallback is stored cleanly in local state/storage by ParentZoneView
  }
}

export function loadCoreSkillProgress(userId?: string): CoreSkillProgressRecord {
  const key = `${CORE_SKILL_PROGRESS_LOCAL_KEY}_${userId || 'guest'}`;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { ...DEFAULT_CORE_SKILL_PROGRESS };
    return { ...DEFAULT_CORE_SKILL_PROGRESS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_CORE_SKILL_PROGRESS };
  }
}

export function saveCoreSkillProgress(
  progress: CoreSkillProgressRecord,
  userId?: string
): void {
  const key = `${CORE_SKILL_PROGRESS_LOCAL_KEY}_${userId || 'guest'}`;
  try {
    localStorage.setItem(
      key,
      JSON.stringify({ ...progress, updatedAt: new Date().toISOString() })
    );
  } catch {
    // Ignore quota errors
  }
}
