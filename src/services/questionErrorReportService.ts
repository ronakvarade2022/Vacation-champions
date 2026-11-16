import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  TetCtetProposedCorrectionRecord,
  TetCtetProposedCorrectionValidation,
  TetCtetQuestionErrorReport,
  TetCtetReportCategory,
  TetCtetReportStatus,
} from '../types/questionErrorReport';
import { TetCtetModuleId, TetCtetSubjectId } from '../types/tetCtet';

/**
 * STRICT DATA PROTECTION NOTICE:
 * This service manages two completely separate tables:
 *   1. Student Question Error Reports (`vc_tet_ctet_question_error_reports_v1` & Firestore `question_reports`)
 *   2. Admin Proposed Correction Records (`vc_tet_ctet_proposed_corrections_v1`)
 *
 * It has ZERO write access to any existing question bank file, audit snapshot, or mock test generator.
 * All 200 GREEN mock tests and 36,480 canonical questions remain 100% READ-ONLY.
 */
const REPORTS_STORAGE_KEY = 'vc_tet_ctet_question_error_reports_v1';
const PROPOSED_CORRECTIONS_STORAGE_KEY = 'vc_tet_ctet_proposed_corrections_v1';
const FIRESTORE_REPORTS_COLLECTION = 'question_reports';

type ReportSubscriber = () => void;
const subscribers = new Set<ReportSubscriber>();

function notifyReportSubscribers(): void {
  subscribers.forEach((cb) => {
    try {
      cb();
    } catch {
      // ignore subscriber callback error
    }
  });
}

export function subscribeToQuestionErrorReports(callback: ReportSubscriber): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}

function readLocalTable<T>(key: string): T[] {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalTable<T>(key: string, rows: T[]): void {
  try {
    localStorage.setItem(key, JSON.stringify(rows));
  } catch (err) {
    console.warn(`[QuestionErrorReportService] LocalStorage write warning for ${key}:`, err);
  }
}

function generateReportNumber(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `QER-${rand}`;
}

function generateCorrectionId(): string {
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `pcorr_${Date.now()}_${rand}`;
}

export function getAllLocalQuestionErrorReports(): TetCtetQuestionErrorReport[] {
  return readLocalTable<TetCtetQuestionErrorReport>(REPORTS_STORAGE_KEY).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getAllProposedCorrectionRecords(): TetCtetProposedCorrectionRecord[] {
  return readLocalTable<TetCtetProposedCorrectionRecord>(PROPOSED_CORRECTIONS_STORAGE_KEY).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

/**
 * Checks if the same student has already submitted a report for the same question and category
 * (or any active non-rejected report on the same question with the same category) to prevent accidental duplicates.
 */
export function findDuplicateStudentReport(params: {
  studentId: string;
  questionId: string;
  reportCategory: TetCtetReportCategory;
}): TetCtetQuestionErrorReport | null {
  const { studentId, questionId, reportCategory } = params;
  const normalizedStudent = (studentId || 'guest_student').trim();
  const normalizedQId = questionId.trim();
  const all = getAllLocalQuestionErrorReports();
  return (
    all.find(
      (r) =>
        r.studentId === normalizedStudent &&
        r.questionId === normalizedQId &&
        r.reportCategory === reportCategory
    ) || null
  );
}

/**
 * Returns all reports submitted by a specific student for a given questionId so the UI
 * can show live tracking badges (`Submitted`, `Under Review`, `Confirmed`, `Corrected`, `Rejected`).
 */
export function getStudentReportsForQuestion(
  studentId: string,
  questionId: string
): TetCtetQuestionErrorReport[] {
  const normalizedStudent = (studentId || 'guest_student').trim();
  return getAllLocalQuestionErrorReports().filter(
    (r) => r.studentId === normalizedStudent && r.questionId === questionId
  );
}

/**
 * Returns all reports submitted by a specific student across all mock tests.
 */
export function getStudentQuestionErrorReports(studentId: string): TetCtetQuestionErrorReport[] {
  const normalizedStudent = (studentId || 'guest_student').trim();
  return getAllLocalQuestionErrorReports().filter((r) => r.studentId === normalizedStudent);
}

/**
 * Submits a new Student Question Error Report into the separate `question_reports` table.
 * NEVER modifies any question in the question bank.
 */
export async function submitTetCtetQuestionErrorReport(input: {
  studentId: string;
  studentName: string;
  mockTestId: string;
  testNumber: number;
  moduleId: TetCtetModuleId;
  moduleTitle: string;
  subjectId: TetCtetSubjectId;
  subject: string;
  questionId: string;
  questionNumber: number;
  originalQuestionText: string;
  originalOptions: [string, string, string, string];
  originalCorrectAnswer: number;
  originalExplanation: string;
  selectedLanguage: string;
  reportCategory: TetCtetReportCategory;
  studentExplanation?: string;
}): Promise<{
  success: boolean;
  isDuplicate: boolean;
  report: TetCtetQuestionErrorReport;
  message: string;
}> {
  const cleanStudentId = (input.studentId || auth?.currentUser?.uid || 'guest_student')
    .trim()
    .slice(0, 128);
  const cleanStudentName = (input.studentName || 'Student Candidate').trim().slice(0, 100);
  const cleanQuestionId = input.questionId.trim().slice(0, 128);
  const cleanExplanation = (input.studentExplanation || '').trim().slice(0, 1500);

  if (!input.reportCategory) {
    throw new Error('Error category is required.');
  }

  if (!cleanExplanation) {
    throw new Error('Short explanation is required to submit a question error report.');
  }

  // Prevent accidental duplicate submissions from the same student for the same question and issue
  const existing = findDuplicateStudentReport({
    studentId: cleanStudentId,
    questionId: cleanQuestionId,
    reportCategory: input.reportCategory,
  });

  if (existing) {
    return {
      success: false,
      isDuplicate: true,
      report: existing,
      message: `You have already submitted a report (${existing.reportNumber}) for this question under "${input.reportCategory}". Current Status: ${existing.status}.`,
    };
  }

  const nowIso = new Date().toISOString();
  const id = `qer_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const reportNumber = generateReportNumber();

  const newReport: TetCtetQuestionErrorReport = {
    id,
    reportNumber,
    studentId: cleanStudentId,
    studentName: cleanStudentName,
    mockTestId: input.mockTestId.trim().slice(0, 120),
    testNumber: Number(input.testNumber) || 1,
    moduleId: input.moduleId,
    moduleTitle: input.moduleTitle.trim().slice(0, 120),
    subjectId: input.subjectId,
    subject: input.subject.trim().slice(0, 120),
    questionId: cleanQuestionId,
    questionNumber: Number(input.questionNumber) || 1,
    originalQuestionText: input.originalQuestionText,
    originalOptions: [
      input.originalOptions[0] || '',
      input.originalOptions[1] || '',
      input.originalOptions[2] || '',
      input.originalOptions[3] || '',
    ],
    originalCorrectAnswer: Number(input.originalCorrectAnswer) || 0,
    originalExplanation: input.originalExplanation || '',
    selectedLanguage: (input.selectedLanguage || 'English').trim().slice(0, 40),
    reportCategory: input.reportCategory,
    studentExplanation: cleanExplanation,
    status: 'Submitted',
    createdAt: nowIso,
    updatedAt: nowIso,
    statusHistory: [
      {
        status: 'Submitted',
        timestamp: nowIso,
        actorName: cleanStudentName,
        actorRole: 'student',
        note: cleanExplanation || `Reported under category: ${input.reportCategory}`,
      },
    ],
  };

  const currentReports = getAllLocalQuestionErrorReports();
  const updatedReports = [newReport, ...currentReports];
  writeLocalTable(REPORTS_STORAGE_KEY, updatedReports);
  notifyReportSubscribers();

  // Sync to Firestore `question_reports` collection if student is signed in with Firebase Auth
  try {
    const uid = auth?.currentUser?.uid;
    if (db && uid) {
      const firestorePayload = {
        ...newReport,
        studentId: uid,
        issueType: newReport.reportCategory,
        details: newReport.studentExplanation || newReport.reportCategory,
      };
      await setDoc(doc(db, FIRESTORE_REPORTS_COLLECTION, newReport.id), firestorePayload);
    }
  } catch (err) {
    console.warn('[QuestionErrorReportService] Firestore sync deferred (local record saved):', err);
  }

  return {
    success: true,
    isDuplicate: false,
    report: newReport,
    message: 'Thank you! Your report has been submitted successfully.',
  };
}

/**
 * Fetches all student question error reports (merging Firestore `question_reports` if available with local table).
 */
export async function fetchAllQuestionErrorReports(): Promise<TetCtetQuestionErrorReport[]> {
  const localReports = getAllLocalQuestionErrorReports();
  try {
    if (db && auth?.currentUser) {
      let snap;
      try {
        snap = await getDocs(
          query(collection(db, FIRESTORE_REPORTS_COLLECTION), orderBy('createdAt', 'desc'), limit(250))
        );
      } catch {
        snap = await getDocs(
          query(
            collection(db, FIRESTORE_REPORTS_COLLECTION),
            where('studentId', '==', auth.currentUser.uid),
            limit(100)
          )
        );
      }
      if (snap && !snap.empty) {
        const map = new Map<string, TetCtetQuestionErrorReport>();
        localReports.forEach((r) => map.set(r.id, r));
        snap.forEach((docSnap) => {
          const data = docSnap.data() as Partial<TetCtetQuestionErrorReport>;
          if (data && data.id && data.questionId && data.moduleId) {
            const existing = map.get(data.id);
            if (!existing || new Date(data.updatedAt || 0) > new Date(existing.updatedAt || 0)) {
              map.set(data.id, data as TetCtetQuestionErrorReport);
            }
          }
        });
        const merged = Array.from(map.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        writeLocalTable(REPORTS_STORAGE_KEY, merged);
        return merged;
      }
    }
  } catch {
    // Use local table seamlessly
  }
  return localReports;
}

/**
 * ADMIN-ONLY: Updates the review status of a student question error report.
 * Never mutates any question in the question bank.
 */
export async function adminUpdateQuestionReportStatus(params: {
  reportId: string;
  newStatus: TetCtetReportStatus;
  adminName: string;
  adminRemarks?: string;
  isAuthorizedAdmin: boolean;
}): Promise<{ success: boolean; message: string; updatedReport?: TetCtetQuestionErrorReport }> {
  const { reportId, newStatus, adminName, adminRemarks, isAuthorizedAdmin } = params;

  if (!isAuthorizedAdmin) {
    return {
      success: false,
      message: 'Access Denied: Only authorised administrators can review and update question error reports.',
    };
  }

  const allReports = getAllLocalQuestionErrorReports();
  const idx = allReports.findIndex((r) => r.id === reportId || r.reportNumber === reportId);
  if (idx === -1) {
    return {
      success: false,
      message: 'Report record not found.',
    };
  }

  const nowIso = new Date().toISOString();
  const current = allReports[idx];
  const cleanAdmin = (adminName || 'Master Administrator').trim();
  const cleanNote = (adminRemarks ?? current.adminRemarks ?? '').trim();

  const updatedReport: TetCtetQuestionErrorReport = {
    ...current,
    status: newStatus,
    updatedAt: nowIso,
    reviewedByAdmin: cleanAdmin,
    reviewedAt: nowIso,
    adminRemarks: cleanNote,
    statusHistory: [
      ...(current.statusHistory || []),
      {
        status: newStatus,
        timestamp: nowIso,
        actorName: cleanAdmin,
        actorRole: 'admin',
        note: cleanNote || `Status updated to ${newStatus} by administrator.`,
      },
    ],
  };

  allReports[idx] = updatedReport;
  writeLocalTable(REPORTS_STORAGE_KEY, allReports);
  notifyReportSubscribers();

  try {
    if (db && auth?.currentUser) {
      await updateDoc(doc(db, FIRESTORE_REPORTS_COLLECTION, current.id), {
        status: newStatus,
        updatedAt: nowIso,
        reviewedByAdmin: cleanAdmin,
        reviewedAt: nowIso,
        adminRemarks: cleanNote,
        statusHistory: updatedReport.statusHistory,
      });
    }
  } catch {
    // Local table already updated
  }

  return {
    success: true,
    message: `Report ${current.reportNumber} marked as "${newStatus}".`,
    updatedReport,
  };
}

/**
 * Validates a proposed correction record before an administrator can approve it.
 */
export function validateProposedCorrectionPayload(params: {
  proposedQuestionText: string;
  proposedOptions: [string, string, string, string];
  proposedCorrectAnswer: number;
  proposedExplanation: string;
  affectedLanguages: string[];
}): TetCtetProposedCorrectionValidation {
  const issues: string[] = [];
  const stem = (params.proposedQuestionText || '').trim();
  const hasValidStem = stem.length >= 12;
  if (!hasValidStem) {
    issues.push('Proposed question text must be at least 12 characters long.');
  }

  const trimmedOpts = (params.proposedOptions || ['', '', '', '']).map((o) => (o || '').trim());
  const nonEmptyOpts = trimmedOpts.length === 4 && trimmedOpts.every((o) => o.length > 0);
  const uniqueOpts = new Set(trimmedOpts.map((o) => o.toLowerCase())).size === 4;
  const hasFourDistinctOptions = nonEmptyOpts && uniqueOpts;
  if (!hasFourDistinctOptions) {
    issues.push('All 4 options (A, B, C, D) must be non-empty and distinct.');
  }

  const hasValidAnswerKey =
    Number.isInteger(params.proposedCorrectAnswer) &&
    params.proposedCorrectAnswer >= 0 &&
    params.proposedCorrectAnswer <= 3;
  if (!hasValidAnswerKey) {
    issues.push('Correct answer key must be one of Option A (0), B (1), C (2), or D (3).');
  }

  const expl = (params.proposedExplanation || '').trim();
  const hasValidExplanation = expl.length >= 12;
  if (!hasValidExplanation) {
    issues.push('Proposed explanation must be at least 12 characters long.');
  }

  const revalidatedLanguages =
    params.affectedLanguages && params.affectedLanguages.length > 0
      ? params.affectedLanguages
      : ['English', 'Marathi', 'Hindi'];

  return {
    isValid:
      hasValidStem &&
      hasFourDistinctOptions &&
      hasValidAnswerKey &&
      hasValidExplanation &&
      issues.length === 0,
    hasValidStem,
    hasFourDistinctOptions,
    hasValidAnswerKey,
    hasValidExplanation,
    revalidatedLanguages,
    issues,
  };
}

/**
 * ADMIN-ONLY CONTROLLED CORRECTION PROCESS:
 * 1. Verifies administrator authorization.
 * 2. Validates the proposed question, 4 distinct options, answer key, explanation, and affected languages.
 * 3. Creates a separate `TetCtetProposedCorrectionRecord` in `vc_tet_ctet_proposed_corrections_v1`
 *    preserving the original question snapshot and full audit trail.
 * 4. Marks the corresponding report as `Corrected` (when `approveImmediately` is true) or `Confirmed`
 *    while leaving the canonical tested question-bank files 100% untouched and READ-ONLY.
 */
export async function adminCreateSeparateProposedCorrection(params: {
  reportId: string;
  proposedQuestionText: string;
  proposedOptions: [string, string, string, string];
  proposedCorrectAnswer: number;
  proposedExplanation: string;
  affectedLanguages: string[];
  correctionSummary: string;
  adminName: string;
  approveImmediately: boolean;
  isAuthorizedAdmin: boolean;
}): Promise<{
  success: boolean;
  message: string;
  correctionRecord?: TetCtetProposedCorrectionRecord;
  updatedReport?: TetCtetQuestionErrorReport;
}> {
  if (!params.isAuthorizedAdmin) {
    return {
      success: false,
      message: 'Access Denied: Only authorised administrators can create or approve proposed corrections.',
    };
  }

  const allReports = getAllLocalQuestionErrorReports();
  const repIdx = allReports.findIndex((r) => r.id === params.reportId || r.reportNumber === params.reportId);
  if (repIdx === -1) {
    return {
      success: false,
      message: 'Referenced question error report was not found.',
    };
  }

  const report = allReports[repIdx];
  const validation = validateProposedCorrectionPayload({
    proposedQuestionText: params.proposedQuestionText,
    proposedOptions: params.proposedOptions,
    proposedCorrectAnswer: params.proposedCorrectAnswer,
    proposedExplanation: params.proposedExplanation,
    affectedLanguages: params.affectedLanguages,
  });

  if (!validation.isValid) {
    return {
      success: false,
      message: `Validation failed: ${validation.issues.join(' ')}`,
    };
  }

  const nowIso = new Date().toISOString();
  const cleanAdmin = (params.adminName || 'Master Administrator').trim();
  const correctionId = generateCorrectionId();

  const correctionRecord: TetCtetProposedCorrectionRecord = {
    id: correctionId,
    reportId: report.id,
    reportNumber: report.reportNumber,
    questionId: report.questionId,
    moduleId: report.moduleId,
    testNumber: report.testNumber,
    subjectId: report.subjectId,
    subject: report.subject,
    selectedLanguage: report.selectedLanguage,
    originalQuestionSnapshot: {
      questionId: report.questionId,
      questionNumber: report.questionNumber,
      questionText: report.originalQuestionText,
      options: report.originalOptions,
      correctAnswer: report.originalCorrectAnswer,
      explanation: report.originalExplanation,
      language: report.selectedLanguage,
    },
    proposedQuestionText: params.proposedQuestionText.trim(),
    proposedOptions: [
      params.proposedOptions[0].trim(),
      params.proposedOptions[1].trim(),
      params.proposedOptions[2].trim(),
      params.proposedOptions[3].trim(),
    ],
    proposedCorrectAnswer: params.proposedCorrectAnswer,
    proposedExplanation: params.proposedExplanation.trim(),
    affectedLanguages: validation.revalidatedLanguages,
    correctionSummary:
      (params.correctionSummary || '').trim() ||
      `Verified and logged separate correction record for ${report.questionId}.`,
    validation,
    approvalStatus: params.approveImmediately
      ? 'ADMIN_APPROVED_CORRECTION'
      : 'PROPOSED_FOR_REVIEW',
    createdByAdmin: cleanAdmin,
    createdAt: nowIso,
    ...(params.approveImmediately
      ? {
          approvedByAdmin: cleanAdmin,
          approvedAt: nowIso,
        }
      : {}),
  };

  const existingCorrections = getAllProposedCorrectionRecords();
  writeLocalTable(PROPOSED_CORRECTIONS_STORAGE_KEY, [correctionRecord, ...existingCorrections]);

  const nextStatus: TetCtetReportStatus = params.approveImmediately ? 'Corrected' : 'Confirmed';
  const updatedReport: TetCtetQuestionErrorReport = {
    ...report,
    status: nextStatus,
    updatedAt: nowIso,
    reviewedByAdmin: cleanAdmin,
    reviewedAt: nowIso,
    adminRemarks: correctionRecord.correctionSummary,
    proposedCorrectionId: correctionRecord.id,
    statusHistory: [
      ...(report.statusHistory || []),
      {
        status: nextStatus,
        timestamp: nowIso,
        actorName: cleanAdmin,
        actorRole: 'admin',
        note: `${
          params.approveImmediately
            ? 'Approved separate correction record'
            : 'Saved proposed correction record'
        } (${correctionRecord.id}) — Original question preserved in read-only bank.`,
      },
    ],
  };

  allReports[repIdx] = updatedReport;
  writeLocalTable(REPORTS_STORAGE_KEY, allReports);
  notifyReportSubscribers();

  return {
    success: true,
    message: params.approveImmediately
      ? `Separate Proposed Correction (${correctionRecord.id}) validated and approved by ${cleanAdmin}. Report marked as "Corrected" while preserving original question history.`
      : `Proposed Correction (${correctionRecord.id}) saved for review. Original question preserved untouched.`,
    correctionRecord,
    updatedReport,
  };
}
