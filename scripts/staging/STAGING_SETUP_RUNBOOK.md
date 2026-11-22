# MyStudyZone — Separate Firebase Staging & Emulator Verification Runbook

This runbook prepares an isolated staging environment so all **8 pending live verification checks** can be executed **without touching the production Firebase project (`gen-lang-client-0860728359`) or any production user account**.

---

## Safety Rules (Non-Negotiable)
1. **Never** run staging tests against `gen-lang-client-0860728359` or production Firestore DB `ai-studio-vacationchampion-cedf2d74-0d25-42f6-8aaa-1a9e2fb4514d`.
2. **Never** weaken `firestore.rules`. Always deploy the exact unmodified `firestore.rules` to staging.
3. **Never** use production Teacher, Student, or Admin accounts for staging tests.
4. Keep **public launch on hold** until all 8 items below are recorded as **PASS** in staging.

---

## Option A — Local Java Firebase Emulator Suite (Fastest, Zero Cloud Cost)

### Prerequisites
- Node.js 20+
- Java Runtime Environment (JRE 17+) installed on the test workstation (`java -version`)

### Steps
1. Start the Auth & Firestore Emulators using the isolated staging config (loads the exact production `firestore.rules`):
   ```bash
   npx firebase-tools emulators:start --config firebase.staging.json --project mystudyzone-staging-demo
   ```
2. In a second terminal, run the automated staging SDK suite:
   ```bash
   STAGING_TARGET_MODE=emulator \
   STAGING_FIREBASE_PROJECT_ID=mystudyzone-staging-demo \
   npx tsx scripts/staging/verifyLessonPlannerStaging.ts
   ```
3. To test **Verified Admin** access in the Emulator UI (`http://127.0.0.1:4000/auth`):
   - Create a synthetic admin user (e.g., `staging.admin@example.test`), mark Email Verified = `true`, and add a matching document `/admins/{adminUid}` in the Firestore Emulator UI (`http://127.0.0.1:4000/firestore`).
   - Verify Admin can publish `/academic_calendars/mh_active`, `/cbse_active`, `/icse_active`, `/global_settings`, commit an atomic rollover creating `/academic_year_archives/Maharashtra_2026-2027`, and is **denied** updating or deleting that archive.

---

## Option B — Separate Dedicated Staging Firebase Project (Browser E2E Testing)

1. In Firebase Console, create a **new project** (e.g., `mystudyzone-staging`) separate from `gen-lang-client-0860728359`.
2. Enable **Authentication** (Email/Password + Google) and **Cloud Firestore** (default database).
3. Deploy the exact unmodified `firestore.rules` to the staging project only:
   ```bash
   npx firebase-tools deploy --only firestore:rules --project <YOUR_STAGING_PROJECT_ID>
   ```
4. Copy `.env.staging.example` to `.env.staging` (never committed to Git) and fill in the staging project's Web SDK config and synthetic test accounts (`Teacher A`, `Teacher B`, `Student`, `Staging Admin`).
5. Create `/admins/{stagingAdminUid}` in the staging Firestore console so `isAdmin()` recognizes your staging Admin without touching production.

---

## Sign-Off Checklist for the 8 Pending Tests

| # | Pending Test | Verification Method | Status |
|---|---|---|---|
| 1 | Java Firestore Emulator testing | Option A (`firebase.staging.json` + `verifyLessonPlannerStaging.ts`) | PENDING |
| 2 | Teacher A & Teacher B authentication | Synthetic accounts in Emulator / Staging Project | PENDING |
| 3 | Cross-teacher data isolation | `ISO-1` automated check + browser verification | PENDING |
| 4 | Teacher calendar saving & reloading | `CAL-1` automated check + browser reload in School Calendar Drawer | PENDING |
| 5 | Lesson completion persistence | `LP-1` automated check + Daily Lesson Plan toggle + reload | PENDING |
| 6 | Student portal browser testing | Sign in as synthetic Student; confirm no `LESSON PLANNER` button & all existing quizzes/worksheets/study library work | PENDING |
| 7 | Verified Admin access testing | Sign in as Staging Admin; publish board calendar, run atomic rollover, verify archive immutability, inspect 382-subject Curriculum Review Audit | PENDING |
| 8 | A4 PDF print preview | In Teacher Lesson Planner, open Print / A4 PDF for Annual, Monthly, Daily, and Complete 3-Plan Pack; verify clean A4 layout | PENDING |
