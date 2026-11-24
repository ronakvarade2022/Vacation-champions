/**
 * Verification Suite for MY STUDYZONE ADDITIONAL CURRICULUM Cloud Firestore Sync.
 * Non-destructive: uses in-memory storage + read-only REST probes (never mutates production Firestore).
 */
import fs from 'fs';
import path from 'path';
import {
  ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED,
  ADDITIONAL_FIRESTORE_COLLECTIONS,
  exportAdditionalCurriculumSnapshot,
  getAdditionalCurriculumStorageStatus,
  importAdditionalCurriculumSnapshot,
  sanitizeAssignmentPayloadForFirestore,
  sanitizeChapterPayloadForFirestore,
  sanitizeFirestoreDocId,
  sanitizeProgressPayloadForFirestore,
  sanitizeSubjectPayloadForFirestore,
} from '../../src/services/additionalCurriculumPersistence';
import {
  createTeacherAdditionalAssignment,
  deleteTeacherAdditionalAssignment,
  getAllAdditionalChapters,
  getAllAdditionalSubjects,
  getStudentAdditionalProgressMap,
  markAdditionalNotesCompleted,
  markAdditionalWorksheetCompleted,
  recordAdditionalQuizAttempt,
  resolveInlineAdditionalCurriculumFallback,
  setAdditionalChapterWorkflowStatus,
  toggleTeacherAssignmentStatus,
  upsertAdditionalChapter,
  upsertAdditionalSubject,
} from '../../src/services/additionalCurriculumService';
import {
  ALL_ADDITIONAL_BOARDS,
  ALL_ADDITIONAL_CLASSES,
  DEFAULT_ADDITIONAL_SUBJECTS,
} from '../../src/data/additionalCurriculum/subjectsCatalog';
import { DEFAULT_ADDITIONAL_CHAPTERS } from '../../src/data/additionalCurriculum/additionalCurriculumRegistry';
import { getCentralSyllabusSummaryStats } from '../../src/services/centralSyllabusService';
import type { SubjectName } from '../../src/types';

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`ASSERTION FAILED: ${msg}`);
}

function setupMockWindowStorage(): void {
  const store = new Map<string, string>();
  const mockStorage = {
    getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
    setItem: (k: string, v: string) => {
      store.set(k, String(v));
    },
    removeItem: (k: string) => {
      store.delete(k);
    },
    clear: () => {
      store.clear();
    },
  };
  (globalThis as any).window = {
    localStorage: mockStorage,
    dispatchEvent: () => true,
    addEventListener: () => {},
    removeEventListener: () => {},
  };
  if (typeof (globalThis as any).CustomEvent === 'undefined') {
    (globalThis as any).CustomEvent = class {
      type: string;
      detail: unknown;
      constructor(type: string, init?: { detail?: unknown }) {
        this.type = type;
        this.detail = init?.detail;
      }
    };
  }
}

async function main(): Promise<void> {
  const root = process.cwd();
  const rulesText = fs.readFileSync(path.join(root, 'firestore.rules'), 'utf8');
  const blueprint = JSON.parse(fs.readFileSync(path.join(root, 'firebase-blueprint.json'), 'utf8'));
  const fbConfig = JSON.parse(fs.readFileSync(path.join(root, 'firebase-applet-config.json'), 'utf8'));

  // 1. Rules & Blueprint Checks
  assert(
    /allow read, write: if false;/.test(rulesText),
    'Default-deny catch-all missing in firestore.rules'
  );
  assert(!/allow read, write: if true/.test(rulesText), 'Wildcard allow-true detected in firestore.rules');

  const preservedCollections = [
    '/students/{studentId}',
    '/attempts/{attemptId}',
    '/attendance/{attendanceId}',
    '/assignments/{assignmentId}',
    '/fees/{feeId}',
    '/school_calendars/{calendarId}',
    '/lesson_plans_state/{stateId}',
    '/parents/{parentId}',
    '/admins/{adminId}',
    '/announcements/{announcementId}',
    '/transactions/{transactionId}',
    '/referrals/{userId}',
    '/referral_transactions/{txId}',
    '/payout_requests/{payoutId}',
    '/support_tickets/{ticketId}',
    '/grievances/{grievanceId}',
    '/question_reports/{reportId}',
    '/device_sessions/{userId}',
    '/platform_config/{configId}',
    '/special_content/{itemId}',
    '/academic_calendars/{calendarId}',
    '/academic_year_archives/{archiveId}',
  ];
  for (const col of preservedCollections) {
    assert(rulesText.includes(col), `Preserved rule block missing: ${col}`);
  }

  const newRules = [
    'match /additional_progress/{chapterId}',
    'match /additional_curriculum_subjects/{subjectId}',
    'match /additional_curriculum_chapters/{chapterId}',
    'match /additional_curriculum_assignments/{assignmentId}',
    'function isValidAdditionalProgress(data)',
    'function isValidAdditionalSubject(data)',
    'function isValidAdditionalChapter(data)',
    'function isValidAdditionalAssignment(data)',
  ];
  for (const r of newRules) {
    assert(rulesText.includes(r), `Additive rule/helper missing: ${r}`);
  }
  assert(
    !/match \/additional_curriculum_assignments\/\{assignmentId\}[\s\S]*?allow get, list: if isSignedIn\(\);/.test(
      rulesText
    ),
    'Blanket allow get, list: if isSignedIn() must NOT exist on additional_curriculum_assignments'
  );

  const blueprintEntities = [
    'AdditionalCurriculumSubject',
    'AdditionalCurriculumChapter',
    'AdditionalCurriculumAssignment',
    'AdditionalCurriculumProgress',
  ];
  for (const ent of blueprintEntities) {
    assert(Boolean(blueprint.entities?.[ent]), `Blueprint entity missing: ${ent}`);
  }
  const blueprintPaths = [
    '/students/{studentId}/additional_progress/{chapterId}',
    '/additional_curriculum_subjects/{subjectId}',
    '/additional_curriculum_chapters/{chapterId}',
    '/additional_curriculum_assignments/{assignmentId}',
  ];
  for (const bp of blueprintPaths) {
    assert(Boolean(blueprint.firestore?.[bp]), `Blueprint path missing: ${bp}`);
  }
  console.log('CHECK 1 (Rules & Blueprint): PASS');

  // 2. Payload Sanitization & Dirty Dozen Boundary Checks
  assert(ADDITIONAL_CURRICULUM_CLOUD_SYNC_ENABLED === true, 'Cloud sync flag must be enabled');
  assert(
    ADDITIONAL_FIRESTORE_COLLECTIONS.subjects === 'additional_curriculum_subjects' &&
      ADDITIONAL_FIRESTORE_COLLECTIONS.chapters === 'additional_curriculum_chapters' &&
      ADDITIONAL_FIRESTORE_COLLECTIONS.assignments === 'additional_curriculum_assignments' &&
      ADDITIONAL_FIRESTORE_COLLECTIONS.studentProgressSubcollection === 'additional_progress',
    'Collection names mismatch'
  );

  for (const subj of DEFAULT_ADDITIONAL_SUBJECTS) {
    const clean = sanitizeSubjectPayloadForFirestore(subj, 'admin_uid_1');
    assert(clean.id === subj.id && clean.updatedByUid === 'admin_uid_1', `Bad subject sanitize: ${subj.id}`);
    assert(!('email' in clean) && !('mobile' in clean) && !('isAdmin' in clean), 'PII leaked in subject');
  }
  for (const ch of DEFAULT_ADDITIONAL_CHAPTERS) {
    const clean = sanitizeChapterPayloadForFirestore(ch, 'admin_uid_1');
    assert(
      clean.chapterId === ch.chapterId &&
        clean.curriculumLabel === 'MY STUDYZONE ADDITIONAL CURRICULUM' &&
        clean.updatedByUid === 'admin_uid_1',
      `Bad chapter sanitize: ${ch.chapterId}`
    );
  }

  // Dirty Dozen payload poisoning resistance tests
  const poisonedProgress = sanitizeProgressPayloadForFirestore({
    studentId: 'stu/../../evil_' + 'x'.repeat(200),
    chapterId: 'ch?bad/id',
    subjectId: 'ADD_GK',
    classLevel: 'Class 5',
    board: 'Maharashtra',
    medium: 'English',
    notesCompleted: true,
    worksheetCompleted: false,
    quizCompleted: true,
    bestQuizScore: 999,
    quizTotal: 4,
    lastUpdatedAt: new Date().toISOString(),
    isAdmin: true,
    email: 'leak@test.com',
  } as any);
  assert(
    /^[a-zA-Z0-9_\-]+$/.test(String(poisonedProgress.studentId)) &&
      String(poisonedProgress.studentId).length <= 128 &&
      /^[a-zA-Z0-9_\-]+$/.test(String(poisonedProgress.chapterId)) &&
      Number(poisonedProgress.bestQuizScore) <= Number(poisonedProgress.quizTotal) &&
      !('isAdmin' in poisonedProgress) &&
      !('email' in poisonedProgress),
    'Dirty Dozen progress sanitization failed'
  );

  const poisonedAssignment = sanitizeAssignmentPayloadForFirestore(
    {
      assignmentId: 'ASN/bad id',
      teacherId: 'teacher_1',
      teacherName: 'T'.repeat(250),
      board: 'Maharashtra',
      classLevel: 'Class 5',
      medium: 'English',
      division: 'A'.repeat(80),
      subjectId: 'ADD_GK',
      chapterId: 'MSZ_CH_1',
      chapterTitle: 'Title',
      dueDate: '2026-12-01',
      teacherNote: 'N'.repeat(1200),
      assignedAt: new Date().toISOString(),
      status: 'ACTIVE',
      mobile: '9999999999',
      role: 'admin',
    } as any,
    'teacher_uid_1'
  );
  assert(
    String(poisonedAssignment.teacherName).length === 100 &&
      String(poisonedAssignment.division).length === 30 &&
      String(poisonedAssignment.teacherNote).length === 500 &&
      sanitizeFirestoreDocId('bad/id?x') === 'bad_id_x' &&
      !('mobile' in poisonedAssignment) &&
      !('role' in poisonedAssignment),
    'Dirty Dozen assignment sanitization failed'
  );
  console.log('CHECK 2 (Payload Sanitization & Dirty Dozen Boundaries): PASS');

  // 3. Isolated Local + Cloud Adapter Persistence & Monotonic Progress
  setupMockWindowStorage();
  const baseSubj = DEFAULT_ADDITIONAL_SUBJECTS[0];
  upsertAdditionalSubject({ ...baseSubj, tagline: 'Updated Tagline Check' });
  const loadedSubjs = getAllAdditionalSubjects({ includeUnpublished: true });
  assert(
    loadedSubjs.find((s) => s.id === baseSubj.id)?.tagline === 'Updated Tagline Check',
    'Subject override persistence failed'
  );

  const baseCh = DEFAULT_ADDITIONAL_CHAPTERS[0];
  upsertAdditionalChapter({ ...baseCh, title: 'Draft Title Check' });
  setAdditionalChapterWorkflowStatus(baseCh.chapterId, 'PUBLISHED', 'Verifier');
  const loadedCh = getAllAdditionalChapters({ includeUnpublished: true }).find(
    (c) => c.chapterId === baseCh.chapterId
  );
  assert(loadedCh?.workflowStatus === 'PUBLISHED', 'Chapter workflow persistence failed');

  const asn = createTeacherAdditionalAssignment({
    teacherId: 'teacher_1',
    teacherName: 'Teacher One',
    board: 'Maharashtra',
    classLevel: 'Class 5',
    medium: 'English',
    division: 'A',
    subjectId: baseSubj.id,
    chapterId: baseCh.chapterId,
    chapterTitle: baseCh.title,
    dueDate: '2026-12-01',
    teacherNote: 'Complete quiz',
  });
  const toggled = toggleTeacherAssignmentStatus(asn.assignmentId);
  assert(toggled.find((a) => a.assignmentId === asn.assignmentId)?.status === 'COMPLETED', 'Assignment toggle failed');
  const afterDel = deleteTeacherAdditionalAssignment(asn.assignmentId);
  assert(!afterDel.some((a) => a.assignmentId === asn.assignmentId), 'Assignment delete failed');

  markAdditionalNotesCompleted('stu_1', baseCh, 'Maharashtra', 'English');
  markAdditionalWorksheetCompleted('stu_1', baseCh, 'Maharashtra', 'English');
  recordAdditionalQuizAttempt('stu_1', baseCh, 'Maharashtra', 'English', 4, 4);
  recordAdditionalQuizAttempt('stu_1', baseCh, 'Maharashtra', 'English', 2, 4); // Must not regress!
  const prog = getStudentAdditionalProgressMap('stu_1')[baseCh.chapterId];
  assert(
    prog.notesCompleted && prog.worksheetCompleted && prog.quizCompleted && prog.bestQuizScore === 4,
    'Monotonic student progress failed'
  );

  const snap = exportAdditionalCurriculumSnapshot();
  const imp = importAdditionalCurriculumSnapshot(JSON.stringify(snap));
  assert(imp.success, 'Snapshot export/import failed');
  assert(getAdditionalCurriculumStorageStatus().cloudSyncEnabled === true, 'Storage status check failed');
  console.log('CHECK 3 (Supplementary Persistence & Snapshot): PASS');

  // Reset mock storage cleanly before 300-slot audit
  (globalThis as any).window.localStorage.clear();

  // 4. 300-Slot Board x Class x Additional Subject Mapping & Central Syllabus Integrity
  const mappingChecks: Array<[SubjectName, string]> = [
    ['General Knowledge', 'ADD_GK'],
    ['Logical Reasoning', 'ADD_LR'],
    ['Moral Education', 'ADD_ME'],
    ['Computer Knowledge', 'ADD_CK'],
    ['Vocabulary and Grammar', 'ADD_VG'],
    ['Drawing and Creative Activities', 'ADD_DC'],
    ['Environmental Awareness', 'ADD_EA'],
    ['Life Skills', 'ADD_LS'],
    ['General Science Activities', 'ADD_GS'],
    ['Financial Literacy & Digital Citizenship', 'ADD_FD'],
  ];

  let officialVerifiedSlots = 0;
  let inlineResolvedSlots = 0;
  for (const board of ALL_ADDITIONAL_BOARDS) {
    for (const cls of ALL_ADDITIONAL_CLASSES) {
      for (const [subjName, expectedId] of mappingChecks) {
        const res = resolveInlineAdditionalCurriculumFallback({
          board,
          classLevel: cls,
          subject: subjName,
          medium: 'English',
        });
        if (res === null) {
          officialVerifiedSlots += 1;
        } else {
          assert(res.additionalSubject.id === expectedId, `Slot mismatch ${board}/${cls}/${subjName}`);
          inlineResolvedSlots += 1;
        }
      }
    }
  }
  assert(
    officialVerifiedSlots + inlineResolvedSlots === 300 &&
      officialVerifiedSlots === 9 &&
      inlineResolvedSlots === 291,
    `300-slot audit mismatch: official=${officialVerifiedSlots}, inline=${inlineResolvedSlots}`
  );
  const centralStats = getCentralSyllabusSummaryStats();
  assert(
    centralStats.verifiedCount === 182 &&
      centralStats.totalVerifiedChapters === 2732 &&
      centralStats.integratedCount === 47 &&
      centralStats.pendingCount === 0,
    `Central syllabus counts altered: ${JSON.stringify(centralStats)}`
  );
  console.log(
    `CHECK 4 (300-Slot Mapping & Central Syllabus Integrity): PASS (official=${officialVerifiedSlots}, inline=${inlineResolvedSlots}, verified=${centralStats.verifiedCount}, chapters=${centralStats.totalVerifiedChapters}, integrated=${centralStats.integratedCount})`
  );

  // 5. Read-Only Live Production Firestore Probe (REST v1)
  const baseUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
    fbConfig.projectId
  )}/databases/${encodeURIComponent(fbConfig.firestoreDatabaseId)}/documents`;
  const probes = [
    'platform_config/main',
    'additional_curriculum_subjects',
    'additional_curriculum_chapters',
    'additional_curriculum_assignments',
    'students/__probe_readonly__/additional_progress',
  ];
  const probeResults: Record<string, number> = {};
  for (const p of probes) {
    const r = await fetch(`${baseUrl}/${p}?key=${encodeURIComponent(fbConfig.apiKey)}`);
    probeResults[p] = r.status;
  }
  console.log('CHECK 5 (Read-Only Live Firestore REST Probe):', probeResults);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
