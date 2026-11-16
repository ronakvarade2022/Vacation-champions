import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  executeParallelCentralizedAudit,
  MockTestQaStatusRecord,
} from '../src/data/tetCtetCentralAuditEngine';

async function main() {
  const { report: fullReport, manifestEntries } = await executeParallelCentralizedAudit({
    auditMode: 'full',
    concurrency: 6,
    preserveVerifiedBatchIds: [
      'MAHA_TET_P1_AUDIT_B1',
      'MAHA_TET_P1_AUDIT_B2',
      'MAHA_TET_P1_AUDIT_B3',
    ],
    includePaper2SocialStudies: true,
    includePracticePools: true,
    includeMultiMediumVerification: true,
  });

const manifestPath = resolve(process.cwd(), 'src/data/tetCtetVerifiedBatchManifest.ts');
const manifestSource = `import type { TetCtetModuleId } from '../types/tetCtet';

export interface VerifiedBatchManifestEntry {
  batchId: string;
  moduleId: TetCtetModuleId;
  testStart: number;
  testEnd: number;
  totalQuestions: number;
  verifiedAt: string;
  canonicalStems: string[];
  numericSkeletons: string[];
}

// Auto-generated permanent verified batch hash manifest by scripts/runCentralAudit.ts
export const VERIFIED_MANIFEST_GENERATED_AT = ${JSON.stringify(fullReport.generatedAt)};
export const VERIFIED_TET_CTET_BATCH_MANIFEST: VerifiedBatchManifestEntry[] = ${JSON.stringify(
  manifestEntries,
  null,
  2
)};
`;
writeFileSync(manifestPath, manifestSource, 'utf8');

const statusByKey: Record<string, MockTestQaStatusRecord> = {};
for (const rec of fullReport.mockTestStatuses) {
  statusByKey[rec.key] = rec;
}

const snapshotPath = resolve(process.cwd(), 'src/data/tetCtetCentralAuditSnapshot.ts');
const snapshotSource = `import type {
  ConsolidatedTetCtetAuditReport,
  MockTestQaStatusRecord,
} from './tetCtetCentralAuditEngine';

// Auto-generated permanent QA & Publication audit record by scripts/runCentralAudit.ts
export const LATEST_TET_CTET_CENTRAL_AUDIT: ConsolidatedTetCtetAuditReport = ${JSON.stringify(
  fullReport,
  null,
  2
)};

export const MOCK_TEST_QA_STATUS_BY_KEY: Record<string, MockTestQaStatusRecord> = ${JSON.stringify(
  statusByKey,
  null,
  2
)};
`;
writeFileSync(snapshotPath, snapshotSource, 'utf8');

console.log('=== UNIFIED PARALLEL QA AUDIT & PUBLICATION READINESS REPORT ===');
console.log({
  generatedAt: fullReport.generatedAt,
  durationMs: fullReport.durationMs,
  totalMockTests: fullReport.totalMockTests,
  totalQuestions: fullReport.totalQuestions,
  preservedGreenTestsSkipped: fullReport.skippedVerifiedTests,
  preservedGreenQuestionsSkipped: fullReport.skippedVerifiedQuestions,
  freshlyScannedPendingTests: fullReport.freshlyScannedTests,
  verifiedQuestions: fullReport.questionsPassed,
  questionsReplaced: fullReport.questionsReplaced,
  duplicateQuestionsRemaining: fullReport.duplicateQuestionsDetected,
  incorrectAnswersRemaining: fullReport.incorrectQuestionsDetected,
  questionsRequiringManualReview: fullReport.questionsRequiringManualReview,
  mockTestsReadyForPublication: fullReport.publicationSummary.testsReadyForPublication,
  mockTestsNotReadyForPublication: fullReport.publicationSummary.testsNotReadyForPublication,
  publicationBreakdown: fullReport.publicationSummary,
  defectClassification: fullReport.defectClassification,
  checkpoint: fullReport.checkpoint,
  verifiedMediumsCheck: fullReport.verifiedMediumsCheck,
  practicePoolSummary: fullReport.practicePoolSummary,
  socialStudiesExtraChecked: fullReport.socialStudiesExtraChecked,
  sampleFindingsCount: fullReport.sampleFindings.length,
  sampleFindings: fullReport.sampleFindings.slice(0, 5),
});
}

main();

