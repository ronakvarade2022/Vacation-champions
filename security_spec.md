# Security Specification - MyStudyZone

## 1. Data Invariants
1. All unauthenticated reads and writes are denied by default across `/students`, `/parents`, `/admins`, `/transactions`, `/referrals`, `/referral_transactions`, `/payout_requests`, `/support_tickets`, `/grievances`, and `/question_reports`.
2. A student profile in `/students/{studentId}` must have `id == studentId`, match `request.auth.uid` on creation, and NEVER store `passwordHash`, `isAdmin`, or spoofed role fields.
3. Non-admin users cannot create a profile directly on a paid plan (`plan` must default to `'free'`) and cannot upgrade `plan` to `'premium'` without a verified Razorpay `lastPaymentId`.
4. An attempt in `/students/{studentId}/attempts/{attemptId}` must belong strictly to the authenticated student matching `studentId` (`isOwner(studentId)`), with immutable creation (`update: false`).
5. Payment transactions in `/transactions/{transactionId}` can only be read by the owning student, their linked parent, or verified Admin (`ronakvarade2022@gmail.com`), and cannot be created for another `studentId`.
6. Personally Identifiable Information (`email`, `mobile`) in `/students`, `/parents`, `/referrals`, `/support_tickets`, `/grievances`, and `/payout_requests` is strictly isolated from public/cross-user `get` and `list` access.
7. Every document ID path variable must satisfy `isValidId()` (`^[a-zA-Z0-9_-]{1,128}$`), and every string field enforces explicit `.size()` boundaries.

## 2. The Dirty Dozen Payloads (Targeting Security Boundaries)
1. **Unauthenticated Student Scrape**: Unauthenticated `get` or `list` on `/students` -> Rejected by `isOwner(studentId)` / `isSignedIn() && resource.data.id == request.auth.uid`.
2. **Password Hash Persistence**: Writing `{ id: uid, name: '...', passwordHash: 'secret' }` to `/students/{uid}` -> Rejected by `!('passwordHash' in data)` in `isValidStudentProfile`.
3. **Privilege / Role Escalation**: Injecting `{ isAdmin: true }` or `{ role: 'admin' }` inside `/students/{uid}` -> Rejected by `!('isAdmin' in data) && !('role' in data)`.
4. **Free-to-Premium Plan Spoofing**: Updating `/students/{uid}` to `{ plan: 'premium' }` without a verified `lastPaymentId` -> Rejected by `incoming().lastPaymentId is string && incoming().lastPaymentId.size() >= 6`.
5. **Cross-Student Attempt Hijacking**: User A creating `/students/userB/attempts/att1` -> Rejected because `request.auth.uid != studentId`.
6. **Immutability Bypass on Exam Records**: Updating score on `/students/{uid}/attempts/{attId}` -> Rejected by `allow update: if false;`.
7. **Unverified Admin Email Spoofing**: Request with `email == 'ronakvarade2022@gmail.com'` and `email_verified == false` -> Rejected by `request.auth.token.email_verified == true`.
8. **Fake Payment Transaction Injection**: User A creating `/transactions/tx_fake` with `studentId: 'userB'` -> Rejected because `incoming().studentId == request.auth.uid`.
9. **Malicious Path ID Poisoning**: Writing to `/students/..%2Fetc%2Fpasswd` or >128-char ID -> Rejected by `isValidId(studentId)`.
10. **Support Ticket & Grievance PII Exposure**: User A listing or reading User B's `/support_tickets/{id}` or `/grievances/{id}` -> Rejected by `resource.data.studentId == request.auth.uid || isAdmin()`.
11. **Self-Approve Referral Payout**: User A updating `/payout_requests/{id}` `status` to `'COMPLETED'` -> Rejected by `allow update, delete: if isAdmin();`.
12. **Below-Minimum or Cross-User Payout**: Creating `/payout_requests/{id}` with `amount: -50` or `userId: 'otherUser'` -> Rejected by `incoming().userId == request.auth.uid && incoming().amount >= 50`.
13. **SnapSolve Cross-User Document Read / Ownership Hijack**: Reading or creating `/snapsolve_documents/{docId}` with `ownerUid != request.auth.uid`, changing `portalRole` (`student` <-> `teacher`) on update, or storing oversized arrays (`> 60` items) -> Rejected by `isValidSnapSolveDocument(incoming())`, `ownerUid == request.auth.uid`, and immutable `portalRole`/`ownerUid`/`createdAt`.
