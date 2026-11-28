import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  type Timestamp,
} from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from './firebase';

export type SnapSolvePortalRole = 'student' | 'teacher';

export interface SavedSnapSolveQuestionItem {
  id: string;
  order: number;
  numberLabel: string;
  pageNumber: number;
  questionText: string;
  questionType: string;
  isReadable: boolean;
}

export interface SavedSnapSolveSolutionItem {
  questionId: string;
  order: number;
  numberLabel: string;
  status: 'solved' | 'failed' | 'unreadable';
  shortAnswer: string;
  answerText: string;
  steps: string[];
  finalAnswer: string;
  teachingNote: string;
}

export interface SavedSnapSolveDocument {
  id: string;
  ownerUid: string;
  portalRole: SnapSolvePortalRole;
  title: string;
  subject: string;
  answerLanguage: string;
  answerStyle: string;
  pageCount: number;
  questions: SavedSnapSolveQuestionItem[];
  solutions: SavedSnapSolveSolutionItem[];
  createdAt: string;
  updatedAt: string;
}

const COLLECTION_NAME = 'snapsolve_documents';

function normalizeTimestampString(val: unknown): string {
  if (typeof val === 'string') return val;
  if (val && typeof (val as Timestamp).toDate === 'function') {
    try {
      return (val as Timestamp).toDate().toISOString();
    } catch {
      return new Date().toISOString();
    }
  }
  return new Date().toISOString();
}

export async function listMySnapSolveDocuments(
  portalRole: SnapSolvePortalRole
): Promise<SavedSnapSolveDocument[]> {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];

  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where('ownerUid', '==', uid),
      limit(50)
    );
    const snap = await getDocs(q);
    const docs: SavedSnapSolveDocument[] = [];
    snap.forEach((docSnap) => {
      const data = docSnap.data() || {};
      if (data.portalRole !== portalRole) return;
      docs.push({
        id: String(data.id || docSnap.id),
        ownerUid: String(data.ownerUid || uid),
        portalRole,
        title: String(data.title || 'Untitled SnapSolve Document'),
        subject: String(data.subject || 'General Studies'),
        answerLanguage: String(data.answerLanguage || 'English'),
        answerStyle: String(data.answerStyle || 'step_by_step'),
        pageCount: Number(data.pageCount || 1),
        questions: Array.isArray(data.questions) ? data.questions : [],
        solutions: Array.isArray(data.solutions) ? data.solutions : [],
        createdAt: normalizeTimestampString(data.createdAt),
        updatedAt: normalizeTimestampString(data.updatedAt),
      });
    });

    return docs.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, COLLECTION_NAME);
    return [];
  }
}

export async function saveSnapSolveDocument(input: {
  id?: string;
  portalRole: SnapSolvePortalRole;
  title: string;
  subject: string;
  answerLanguage: string;
  answerStyle: string;
  pageCount: number;
  questions: SavedSnapSolveQuestionItem[];
  solutions: SavedSnapSolveSolutionItem[];
}): Promise<SavedSnapSolveDocument> {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('Please sign in to save documents to My Documents.');
  }

  const isUpdate = Boolean(input.id);
  const docId =
    input.id && /^[a-zA-Z0-9_-]{1,128}$/.test(input.id)
      ? input.id
      : `ssdoc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const docPath = `${COLLECTION_NAME}/${docId}`;

  // Store bounded text/metadata only (never large source page base64 images)
  const boundedQuestions = input.questions.slice(0, 60).map((q, idx) => ({
    id: String(q.id || `q_${idx + 1}`).slice(0, 64),
    order: idx + 1,
    numberLabel: String(q.numberLabel || `Q${idx + 1}`).slice(0, 40),
    pageNumber: Math.max(1, Math.min(20, Math.floor(Number(q.pageNumber || 1)))),
    questionText: String(q.questionText || '').slice(0, 2000),
    questionType: String(q.questionType || 'other').slice(0, 32),
    isReadable: Boolean(q.isReadable),
  }));

  const boundedSolutions = input.solutions.slice(0, 60).map((s, idx) => ({
    questionId: String(s.questionId || `q_${idx + 1}`).slice(0, 64),
    order: idx + 1,
    numberLabel: String(s.numberLabel || `Q${idx + 1}`).slice(0, 40),
    status: s.status === 'solved' || s.status === 'failed' || s.status === 'unreadable' ? s.status : 'solved',
    shortAnswer: String(s.shortAnswer || '').slice(0, 500),
    answerText: String(s.answerText || '').slice(0, 4000),
    steps: Array.isArray(s.steps)
      ? s.steps.slice(0, 20).map((st) => String(st || '').slice(0, 400))
      : [],
    finalAnswer: String(s.finalAnswer || '').slice(0, 500),
    teachingNote: String(s.teachingNote || '').slice(0, 500),
  }));

  const title = String(input.title || `${input.subject} Questions & Answers`).trim().slice(0, 140) || 'SnapSolve Document';
  const subject = String(input.subject || 'General Studies').trim().slice(0, 80);
  const answerLanguage = String(input.answerLanguage || 'English').trim().slice(0, 80);
  const answerStyle = String(input.answerStyle || 'step_by_step').trim().slice(0, 40);
  const pageCount = Math.max(1, Math.min(10, Math.floor(Number(input.pageCount || 1))));

  try {
    const ref = doc(db, COLLECTION_NAME, docId);
    if (isUpdate) {
      await updateDoc(ref, {
        title,
        subject,
        answerLanguage,
        answerStyle,
        pageCount,
        questions: boundedQuestions,
        solutions: boundedSolutions,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        id: docId,
        ownerUid: uid,
        portalRole: input.portalRole,
        title,
        subject,
        answerLanguage,
        answerStyle,
        pageCount,
        questions: boundedQuestions,
        solutions: boundedSolutions,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    const nowIso = new Date().toISOString();
    return {
      id: docId,
      ownerUid: uid,
      portalRole: input.portalRole,
      title,
      subject,
      answerLanguage,
      answerStyle,
      pageCount,
      questions: boundedQuestions,
      solutions: boundedSolutions,
      createdAt: nowIso,
      updatedAt: nowIso,
    };
  } catch (err) {
    handleFirestoreError(
      err,
      isUpdate ? OperationType.UPDATE : OperationType.CREATE,
      docPath
    );
    throw err;
  }
}

export async function deleteSnapSolveDocument(docId: string): Promise<void> {
  const uid = auth.currentUser?.uid;
  if (!uid) {
    throw new Error('Authentication required.');
  }
  const docPath = `${COLLECTION_NAME}/${docId}`;
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, docId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, docPath);
    throw err;
  }
}
