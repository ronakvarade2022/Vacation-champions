# Additional Curriculum Cloud Firestore Sync — Phase 0 Security Specification

## 1. Scope & Additive Boundaries
- **Collections Covered (4 additive paths only)**:
  1. `/additional_curriculum_subjects/{subjectId}` (Top-level Zero-PII CMS catalog)
  2. `/additional_curriculum_chapters/{chapterId}` (Top-level Zero-PII CMS chapter catalog)
  3. `/additional_curriculum_assignments/{assignmentId}` (Top-level Zero-PII supplementary assignments)
  4. `/students/{studentId}/additional_progress/{chapterId}` (Per-student supplementary progress subcollection)
- **Zero Impact Invariants**:
  - All 16 existing production Firestore collections (`students`, `attempts`, `attendance`, `assignments`, `fees`, `school_calendars`, `lesson_plans_state`, `parents`, `admins`, `announcements`, `transactions`, `referrals`, `referral_transactions`, `payout_requests`, `support_tickets`, `grievances`, `question_reports`, `device_sessions`, `platform_config`, `special_content`, `academic_calendars`, `academic_year_archives`) remain completely untouched.
  - Official verified syllabus (`182` verified textbook entries, `2,732` chapters, `47` `INTEGRATED_INTO_PARENT` mappings) and paid subscription gates remain strictly isolated and read-only.

## 2. Core Data & Access Invariants
1. **Master Gate on Subcollection**: Progress documents at `/students/{studentId}/additional_progress/{chapterId}` can only be created or updated when the parent `/students/{studentId}` profile document exists and the caller passes `isStudentDocOwner(studentId)` or `isAdmin()`.
2. **Minimum Read Permissions (No Blanket Unauthenticated Access)**:
   - `/additional_curriculum_subjects/{subjectId}`: Published subjects (`isPublished == true`) readable only by signed-in users (`isSignedIn()`); unpublished subjects readable only by `isAdmin()`.
   - `/additional_curriculum_chapters/{chapterId}`: Published chapters (`workflowStatus == 'PUBLISHED'`) readable only by signed-in users (`isSignedIn()`); draft/review/approved/unpublished chapters readable only by `isAdmin()`.
   - `/additional_curriculum_assignments/{assignmentId}`: No blanket `allow list: if isSignedIn();`. List queries must explicitly evaluate `resource.data` fields (`isAdmin() || (isSignedIn() && (resource.data.teacherUid == request.auth.uid || (resource.data.board in ['Maharashtra', 'CBSE', 'ICSE'] && resource.data.classLevel is string && resource.data.classLevel.size() > 0 && resource.data.status in ['ACTIVE', 'COMPLETED'])))`).
   - `/students/{studentId}/additional_progress/{chapterId}`: Readable only by `isStudentDocOwner(studentId)`, `isParentOf(studentId)`, or `isAdmin()`.
3. **Zero-PII Enforcement**: Top-level CMS and Assignment collections explicitly forbid `email`, `mobile`, `phone`, `passwordHash`, `isAdmin`, and `role` fields.
4. **Validation Blueprints & Total Size Guards**: Every document path variable passes `isValidId()` (`^[a-zA-Z0-9_\-]+$`, `1..128` chars), every `create` and `update` passes a dedicated `isValidAdditional*` blueprint enforcing `hasAll`/`hasOnly` keys and `.size()` limits on all strings, lists, and maps.
5. **Action-Based Updates & Monotonic Progress Guard**:
   - Subjects/Chapters updates check immutable keys (`id` / `chapterId`, `curriculumLabel`) and `affectedKeys().hasOnly(...)`.
   - Assignment updates check immutable identity (`assignmentId`, `teacherId`, `teacherUid`, `assignedAt`) and restrict teacher updates to `affectedKeys().hasOnly(['status', 'updatedAt'])`.
   - Student progress updates check immutable identity (`studentId`, `chapterId`, `subjectId`), restrict fields to progress state via `affectedKeys().hasOnly(...)`, and require `incoming().bestQuizScore >= existing().bestQuizScore` (for non-admin writes).

## 3. The "Dirty Dozen" Negative Security Payloads (All Must Fail -> `PERMISSION_DENIED`)
1. **Unauthenticated Catalog Read**: Anonymous user attempts `get` or `list` on `additional_curriculum_subjects` or `additional_curriculum_chapters` -> DENIED (`isSignedIn()` missing).
2. **Unpublished Chapter Leak**: Signed-in student attempts `get` or `list` on a `DRAFT` / `UNDER_REVIEW` / `UNPUBLISHED` chapter -> DENIED.
3. **Student CMS Tampering**: Signed-in non-admin student attempts `create` or `update` on `additional_curriculum_subjects` or `additional_curriculum_chapters` -> DENIED (`isAdmin()` false).
4. **Shadow / Ghost Field Injection (Subject/Chapter)**: Caller adds `{ isVerifiedAdmin: true }` or `{ role: 'admin' }` on `create` or `update` -> DENIED (`hasOnly` / `affectedKeys().hasOnly` rejects).
5. **PII Injection in Catalog/Assignment**: Caller includes `{ email: 'x@y.com' }` or `{ mobile: '9999999999' }` -> DENIED (`!('email' in data) && !('mobile' in data)`).
6. **Student Creating Teacher Assignment**: Signed-in user whose `/students/{uid}` has `accountRole: 'student'` attempts to create `additional_curriculum_assignments` -> DENIED (`isTeacherAccount()` false).
7. **Teacher UID Spoofing**: Teacher A attempts to create an assignment with `teacherUid: teacherB_uid` or `teacherId: teacherB_id` -> DENIED (`teacherUid == request.auth.uid && isStudentDocOwner(teacherId)`).
8. **Cross-Teacher Assignment Mutation/Deletion**: Teacher B attempts to update or delete Teacher A's assignment -> DENIED (`existing().teacherUid == request.auth.uid` false).
9. **Blanket Assignment List Without Valid Status/Board**: Querying malformed/unscoped assignments -> DENIED by `resource.data` predicates.
10. **Cross-Student Progress Read/Write**: Student A attempts to read or write `/students/{studentB}/additional_progress/{chapterId}` -> DENIED (`isStudentDocOwner` false).
11. **Orphaned Progress Write (Missing Master Gate)**: Signed-in user without a `/students/{studentId}` profile attempts to write `/students/{studentId}/additional_progress/{chapterId}` -> DENIED (`exists(/databases/.../students/$(studentId))` false).
12. **Score Poisoning / Regression / Path Poisoning**: Student writes `bestQuizScore: 99` when `quizTotal: 4`, lowers `bestQuizScore` below `existing().bestQuizScore`, or uses invalid `chapterId` containing `/` or `>128` chars -> DENIED.
