/**
 * MyStudyZone — Staging & Local Java Firestore Emulator Verification Suite
 *
 * SAFETY GUARD:
 * - Hard-blocks execution against the production Firebase project (`gen-lang-client-0860728359`)
 *   or the production Firestore database (`ai-studio-vacationchampion-cedf2d74-0d25-42f6-8aaa-1a9e2fb4514d`).
 * - Never touches production user accounts.
 * - Tests the exact unmodified `firestore.rules` loaded into the Java Firestore Emulator
 *   or a dedicated staging Firebase project.
 *
 * Usage (Java Emulator):
 *   1. Terminal 1: npx firebase-tools emulators:start --config firebase.staging.json --project mystudyzone-staging-demo
 *   2. Terminal 2: npx tsx scripts/staging/verifyLessonPlannerStaging.ts
 */

import { initializeApp, deleteApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  connectFirestoreEmulator,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';
import { getDefaultBoardCalendar } from '../../src/data/lessonPlanner/defaultBoardCalendars';

const PRODUCTION_PROJECT_ID = 'gen-lang-client-0860728359';
const PRODUCTION_DB_ID = 'ai-studio-vacationchampion-cedf2d74-0d25-42f6-8aaa-1a9e2fb4514d';

const TARGET_MODE = (process.env.STAGING_TARGET_MODE || 'emulator').trim();
const PROJECT_ID = (process.env.STAGING_FIREBASE_PROJECT_ID || 'mystudyzone-staging-demo').trim();
const DATABASE_ID = (process.env.STAGING_FIREBASE_DATABASE_ID || '(default)').trim();
const AUTH_EMULATOR_HOST = (process.env.FIREBASE_AUTH_EMULATOR_HOST || '127.0.0.1:9099').trim();
const FIRESTORE_EMULATOR_HOST = (process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080').trim();

interface TestOutcome {
  id: string;
  label: string;
  status: 'PASS' | 'FAIL';
  detail: string;
}

function assertStagingOnly(): void {
  if (PROJECT_ID === PRODUCTION_PROJECT_ID || PROJECT_ID.includes(PRODUCTION_PROJECT_ID)) {
    throw new Error(
      `BLOCKED: Refusing to run staging tests against production project (${PRODUCTION_PROJECT_ID}).`
    );
  }
  if (DATABASE_ID === PRODUCTION_DB_ID) {
    throw new Error(
      `BLOCKED: Refusing to run staging tests against production Firestore DB (${PRODUCTION_DB_ID}).`
    );
  }
}

function createIsolatedClient(name: string) {
  const app: FirebaseApp = initializeApp(
    {
      apiKey: process.env.STAGING_FIREBASE_API_KEY || 'demo-staging-api-key',
      authDomain:
        process.env.STAGING_FIREBASE_AUTH_DOMAIN || `${PROJECT_ID}.firebaseapp.com`,
      projectId: PROJECT_ID,
      appId: process.env.STAGING_FIREBASE_APP_ID || '1:000000000000:web:staging000000000000',
    },
    name
  );
  const auth = getAuth(app);
  const db = DATABASE_ID === '(default)' ? getFirestore(app) : getFirestore(app, DATABASE_ID);

  if (TARGET_MODE === 'emulator') {
    const [fsHost, fsPortStr] = FIRESTORE_EMULATOR_HOST.split(':');
    connectAuthEmulator(auth, `http://${AUTH_EMULATOR_HOST}`, { disableWarnings: true });
    connectFirestoreEmulator(db, fsHost, Number(fsPortStr || 8080));
  }

  return { app, auth, db };
}

async function ensureUser(
  auth: ReturnType<typeof getAuth>,
  email: string,
  password: string
): Promise<string> {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    return cred.user.uid;
  } catch {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user.uid;
  }
}

async function expectDenied(fn: () => Promise<unknown>): Promise<boolean> {
  try {
    await fn();
    return false;
  } catch (err) {
    const msg = String(err || '');
    return (
      msg.includes('permission-denied') ||
      msg.includes('PERMISSION_DENIED') ||
      msg.includes('Missing or insufficient permissions')
    );
  }
}

async function runSuite(): Promise<void> {
  assertStagingOnly();

  const results: TestOutcome[] = [];
  const record = (id: string, label: string, passed: boolean, detail: string) => {
    results.push({ id, label, status: passed ? 'PASS' : 'FAIL', detail });
  };

  console.log(`\nMyStudyZone Staging Verification Suite`);
  console.log(`Mode: ${TARGET_MODE} | Project: ${PROJECT_ID} | DB: ${DATABASE_ID}\n`);

  const teacherAClient = createIsolatedClient('staging_teacher_a');
  const teacherBClient = createIsolatedClient('staging_teacher_b');
  const studentClient = createIsolatedClient('staging_student');

  try {
    // 1. Authenticate synthetic Teacher A, Teacher B, and Student accounts
    const teacherAEmail = process.env.STAGING_TEACHER_A_EMAIL || 'staging.teacher.a@example.test';
    const teacherAPass = process.env.STAGING_TEACHER_A_PASSWORD || 'ChangeMe_TeacherA_2026!';
    const teacherBEmail = process.env.STAGING_TEACHER_B_EMAIL || 'staging.teacher.b@example.test';
    const teacherBPass = process.env.STAGING_TEACHER_B_PASSWORD || 'ChangeMe_TeacherB_2026!';
    const studentEmail = process.env.STAGING_STUDENT_EMAIL || 'staging.student.a@example.test';
    const studentPass = process.env.STAGING_STUDENT_PASSWORD || 'ChangeMe_StudentA_2026!';

    const uidA = await ensureUser(teacherAClient.auth, teacherAEmail, teacherAPass);
    const uidB = await ensureUser(teacherBClient.auth, teacherBEmail, teacherBPass);
    const uidS = await ensureUser(studentClient.auth, studentEmail, studentPass);
    record('AUTH-1', 'Teacher A, Teacher B & Student synthetic auth', true, `uids=${uidA.slice(0, 6)},${uidB.slice(0, 6)},${uidS.slice(0, 6)}`);

    // Seed synthetic profiles in staging/emulator
    const nowIso = new Date().toISOString();
    await setDoc(doc(teacherAClient.db, 'students', uidA), {
      id: uidA,
      name: 'Staging Teacher A',
      email: teacherAEmail,
      accountRole: 'teacher',
      board: 'Maharashtra',
      classLevel: 'Class 5',
      registeredAt: nowIso,
    });
    await setDoc(doc(teacherBClient.db, 'students', uidB), {
      id: uidB,
      name: 'Staging Teacher B',
      email: teacherBEmail,
      accountRole: 'teacher',
      board: 'CBSE',
      classLevel: 'Class 8',
      registeredAt: nowIso,
    });
    await setDoc(doc(studentClient.db, 'students', uidS), {
      id: uidS,
      name: 'Staging Student A',
      email: studentEmail,
      accountRole: 'student',
      board: 'Maharashtra',
      classLevel: 'Class 5',
      registeredAt: nowIso,
    });

    // 2. Teacher A saves & reloads private school calendar
    const mhDefault = getDefaultBoardCalendar('Maharashtra');
    const calDocId = '2026-2027__Maharashtra';
    await setDoc(doc(teacherAClient.db, 'students', uidA, 'school_calendars', calDocId), {
      id: calDocId,
      teacherUid: uidA,
      board: 'Maharashtra',
      academicYear: '2026-2027',
      schoolName: 'Staging Vidyalaya A',
      medium: 'Semi-English',
      startDate: mhDefault.startDate,
      reopeningDate: mhDefault.reopeningDate,
      endDate: mhDefault.endDate,
      syllabusCompletionDeadline: mhDefault.syllabusCompletionDeadline,
      workingDaysOfWeek: mhDefault.workingDaysOfWeek,
      saturdayRule: mhDefault.saturdayRule,
      holidays: mhDefault.holidays,
      vacations: mhDefault.vacations,
      examWindows: mhDefault.examWindows,
      revisionWindows: mhDefault.revisionWindows,
      updatedAt: nowIso,
    });
    const reloadedCal = await getDoc(
      doc(teacherAClient.db, 'students', uidA, 'school_calendars', calDocId)
    );
    record(
      'CAL-1',
      'Teacher A private school calendar save & reload',
      reloadedCal.exists() && reloadedCal.data()?.schoolName === 'Staging Vidyalaya A',
      reloadedCal.exists() ? 'Saved & reloaded cleanly' : 'Document missing'
    );

    // 3. Teacher A saves & reloads lesson completion & private remarks
    const lpDocId = '2026-2027__Maharashtra__Class_5__Mathematics__Div_A';
    await setDoc(doc(teacherAClient.db, 'students', uidA, 'lesson_plans_state', lpDocId), {
      id: lpDocId,
      teacherUid: uidA,
      board: 'Maharashtra',
      classLevel: 'Class 5',
      subject: 'Mathematics',
      academicYear: '2026-2027',
      division: 'Div A',
      medium: 'Semi-English',
      periodsPerWeek: 5,
      teachingDays: [1, 2, 3, 4, 5],
      completedLessonDates: ['2026-06-15'],
      completedDateLocks: { mh_c5_mat_u1__p1: '2026-06-15' },
      completedChapterIds: [],
      chapterWeightOverrides: {},
      outcomeStatuses: {},
      outcomeNotes: {},
      permittedEdits: {},
      privateRemarks: { mh_c5_mat_u1__p1: 'Private note from Teacher A' },
      updatedAt: nowIso,
    });
    const reloadedState = await getDoc(
      doc(teacherAClient.db, 'students', uidA, 'lesson_plans_state', lpDocId)
    );
    record(
      'LP-1',
      'Teacher A lesson completion & remark persistence',
      reloadedState.exists() &&
        reloadedState.data()?.privateRemarks?.mh_c5_mat_u1__p1 === 'Private note from Teacher A',
      reloadedState.exists() ? 'Persisted & verified' : 'Missing'
    );

    // 4. Cross-teacher isolation (Teacher B cannot read or write Teacher A's private subcollections)
    const bReadACalDenied = await expectDenied(() =>
      getDoc(doc(teacherBClient.db, 'students', uidA, 'school_calendars', calDocId))
    );
    const bReadALpDenied = await expectDenied(() =>
      getDoc(doc(teacherBClient.db, 'students', uidA, 'lesson_plans_state', lpDocId))
    );
    const bWriteALpDenied = await expectDenied(() =>
      setDoc(doc(teacherBClient.db, 'students', uidA, 'lesson_plans_state', lpDocId), {
        id: lpDocId,
        teacherUid: uidB,
        updatedAt: nowIso,
      })
    );
    record(
      'ISO-1',
      'Cross-teacher isolation (Teacher B blocked from Teacher A data)',
      bReadACalDenied && bReadALpDenied && bWriteALpDenied,
      `readCalDenied=${bReadACalDenied}, readLpDenied=${bReadALpDenied}, writeLpDenied=${bWriteALpDenied}`
    );

    // 5. Student role escalation blocked + legitimate student profile update preserved
    const studentEscalateTeacherDenied = await expectDenied(() =>
      updateDoc(doc(studentClient.db, 'students', uidS), { accountRole: 'teacher' })
    );
    const studentEscalateAdminDenied = await expectDenied(() =>
      updateDoc(doc(studentClient.db, 'students', uidS), { accountRole: 'admin' })
    );
    let legitimateStudentUpdateOk = false;
    try {
      await updateDoc(doc(studentClient.db, 'students', uidS), { name: 'Staging Student Updated' });
      legitimateStudentUpdateOk = true;
    } catch {
      legitimateStudentUpdateOk = false;
    }
    record(
      'SEC-1',
      'Student accountRole escalation blocked & normal profile update allowed',
      studentEscalateTeacherDenied && studentEscalateAdminDenied && legitimateStudentUpdateOk,
      `toTeacherDenied=${studentEscalateTeacherDenied}, toAdminDenied=${studentEscalateAdminDenied}, normalUpdateOk=${legitimateStudentUpdateOk}`
    );

    // 6. Student blocked from /academic_calendars & /academic_year_archives; Teacher blocked from listing /academic_calendars
    const studentReadCalDenied = await expectDenied(() =>
      getDoc(doc(studentClient.db, 'academic_calendars', 'mh_active'))
    );
    const studentReadArchDenied = await expectDenied(() =>
      getDocs(
        query(
          collection(studentClient.db, 'academic_year_archives'),
          where('isArchivedSnapshot', '==', true)
        )
      )
    );
    const teacherListCalsDenied = await expectDenied(() =>
      getDocs(collection(teacherAClient.db, 'academic_calendars'))
    );
    const teacherDeleteArchDenied = await expectDenied(() =>
      deleteDoc(doc(teacherAClient.db, 'academic_year_archives', 'Maharashtra_2025-2026'))
    );
    record(
      'SEC-2',
      'Global calendars & archives role boundaries enforced',
      studentReadCalDenied &&
        studentReadArchDenied &&
        teacherListCalsDenied &&
        teacherDeleteArchDenied,
      `studentCalDenied=${studentReadCalDenied}, studentArchDenied=${studentReadArchDenied}, teacherListCalDenied=${teacherListCalsDenied}, archiveDeleteDenied=${teacherDeleteArchDenied}`
    );
  } finally {
    await Promise.allSettled([
      signOut(teacherAClient.auth),
      signOut(teacherBClient.auth),
      signOut(studentClient.auth),
      deleteApp(teacherAClient.app),
      deleteApp(teacherBClient.app),
      deleteApp(studentClient.app),
    ]);
  }

  let failed = 0;
  for (const r of results) {
    if (r.status === 'FAIL') failed += 1;
    console.log(`[${r.status}] ${r.id} — ${r.label} (${r.detail})`);
  }
  console.log(`\nSummary: ${results.length - failed}/${results.length} passed, ${failed} failed.`);
  if (failed > 0) process.exit(1);
}

runSuite().catch((err) => {
  console.error('Staging suite error:', err);
  process.exit(1);
});
