import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  executeCentralizedAuditWithManifest,
  MockTestQaStatusRecord,
} from '../src/data/tetCtetCentralAuditEngine';

const { report: fullReport, manifestEntries } = executeCentralizedAuditWithManifest({
  auditMode: 'full',
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

console.log('=== STEP 2 & STEP 7: QA AUDIT & PUBLICATION READINESS REPORT ===');
console.log({
  generatedAt: fullReport.generatedAt,
  durationMs: fullReport.durationMs,
  totalMockTests: fullReport.totalMockTests,
  totalQuestions: fullReport.totalQuestions,
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
});
