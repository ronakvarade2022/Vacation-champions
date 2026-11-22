/**
 * Feature flags governing the Central Verified Syllabus Pipeline.
 *
 * PHASE 1 GUARANTEE:
 * - All migration/pipeline flags remain strictly FALSE (OFF) by default.
 * - Existing student content, Teacher Lesson Planner, Firestore rules, student records,
 *   payment records, and historical content IDs remain 100% untouched.
 * - Flipping `USE_VERIFIED_SYLLABUS_PIPELINE` back to `false` provides instant rollback.
 */
export interface SyllabusFeatureFlagConfig {
  readonly USE_VERIFIED_SYLLABUS_PIPELINE: boolean;
  readonly ENABLE_STUDENT_CONTENT_MIGRATION: boolean;
  readonly PRESERVE_LEGACY_IDS: boolean;
  readonly STRICT_PENDING_NO_SYNTHETIC_CHAPTERS: boolean;
  readonly CENTRAL_SYLLABUS_VERSION: string;
}

export const SYLLABUS_FEATURE_FLAGS: SyllabusFeatureFlagConfig = Object.freeze({
  USE_VERIFIED_SYLLABUS_PIPELINE: true,
  ENABLE_STUDENT_CONTENT_MIGRATION: false,
  PRESERVE_LEGACY_IDS: true,
  STRICT_PENDING_NO_SYNTHETIC_CHAPTERS: true,
  CENTRAL_SYLLABUS_VERSION: 'phase2-v1.0.0',
});

/**
 * Checks whether consumers should read from the new Central Syllabus Pipeline.
 * Always returns `false` unless explicitly enabled in `SYLLABUS_FEATURE_FLAGS`
 * OR explicitly overridden by a dry-run/test harness (`overrideFlag === true`).
 */
export function isVerifiedSyllabusPipelineEnabled(overrideFlag?: boolean): boolean {
  if (typeof overrideFlag === 'boolean') {
    return overrideFlag;
  }
  return SYLLABUS_FEATURE_FLAGS.USE_VERIFIED_SYLLABUS_PIPELINE;
}
