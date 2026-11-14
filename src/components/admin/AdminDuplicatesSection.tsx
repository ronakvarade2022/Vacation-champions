import React, { useState, useMemo, useEffect } from 'react';
import type { QuizQuestion } from '../../types';
import {
  auditGlobalDuplicateQuestions,
  checkQuestionDuplicate,
  type GlobalDuplicateAuditReport,
} from '../../services/questionBankService';
import { getDemoQuestionsForBoardAndClass } from '../../data/demoQuestionsData';
import { getClassDemoWorksheets } from '../../data/classDemoWorksheetsData';
import { ALL_BOARDS } from '../../utils/subscriptionAccess';
import { ALL_ADMIN_CLASSES } from '../../utils/adminAnalytics';
import { AdminPagination } from './AdminPagination';

export interface RejectedDuplicateItem {
  id: string;
  candidateText: string;
  matchedQuestionId?: string;
  reason: string;
  similarityScore: number;
  timestamp: string;
}

interface AdminDuplicatesSectionProps {
  allQuestions: QuizQuestion[];
  rejectedDuplicates: RejectedDuplicateItem[];
}

export const AdminDuplicatesSection: React.FC<AdminDuplicatesSectionProps> = React.memo(
  ({ allQuestions, rejectedDuplicates }) => {
    const [testQuestionInput, setTestQuestionInput] = useState<string>('');
    const [testAnswerInput, setTestAnswerInput] = useState<string>('');
    const [duplicateScanResult, setDuplicateScanResult] = useState<{
      success: boolean;
      message: string;
    } | null>(null);
    const [rejPage, setRejPage] = useState<number>(1);
    const [rejPageSize, setRejPageSize] = useState<number>(15);

    // Lazily memoized ONLY when Duplicates tab is mounted (eliminates 15,280-stem scan on other tabs)
    const globalDupAudit: GlobalDuplicateAuditReport = useMemo(
      () => auditGlobalDuplicateQuestions(allQuestions),
      [allQuestions]
    );

    const demoCoverageCounts = useMemo(() => {
      let totalDemoQuestions = 0;
      let totalDemoWorksheets = 0;
      for (const b of ALL_BOARDS) {
        for (const c of ALL_ADMIN_CLASSES) {
          totalDemoQuestions += getDemoQuestionsForBoardAndClass(b, c).length;
          totalDemoWorksheets += getClassDemoWorksheets(c, b).length;
        }
      }
      return { totalDemoQuestions, totalDemoWorksheets };
    }, []);

    useEffect(() => {
      setRejPage(1);
    }, [rejectedDuplicates.length]);

    const safeRejPage = Math.min(
      rejPage,
      Math.max(1, Math.ceil(rejectedDuplicates.length / rejPageSize))
    );
    const paginatedRejected = useMemo(() => {
      const start = (safeRejPage - 1) * rejPageSize;
      return rejectedDuplicates.slice(start, start + rejPageSize);
    }, [rejectedDuplicates, safeRejPage, rejPageSize]);

    const handleRunDuplicateCheck = () => {
      if (!testQuestionInput) return;
      const dupCheck = checkQuestionDuplicate(testQuestionInput, testAnswerInput, allQuestions);
      if (dupCheck.isDuplicate) {
        setDuplicateScanResult({
          success: false,
          message: `DUPLICATE DETECTED: ${dupCheck.duplicateReason} (Matched: ${dupCheck.matchedQuestionId})`,
        });
      } else {
        setDuplicateScanResult({
          success: true,
          message: 'PASS: Genuinely unique question! Zero collision detected against entire database.',
        });
      }
    };

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            Zero-Repetition &amp; Cross-Board Duplicate Detection Engine
          </h2>
          <p className="text-xs text-slate-500">
            Evaluates exact text, token overlap, and semantic similarity across Maharashtra, CBSE, and ICSE to permanently prevent duplicate questions.
          </p>
        </div>

        {/* Global 3-Board Duplicate & Demo Coverage Live Audit Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div
            className={`p-4 rounded-2xl border ${
              globalDupAudit.duplicateGroupsCount === 0
                ? 'bg-emerald-50/70 border-emerald-300'
                : 'bg-rose-50/70 border-rose-300'
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Global Question Bank Integrity
            </p>
            <p
              className={`text-lg font-black mt-1 ${
                globalDupAudit.duplicateGroupsCount === 0 ? 'text-emerald-800' : 'text-rose-800'
              }`}
            >
              {globalDupAudit.duplicateGroupsCount === 0
                ? '0 Global Stem Collisions'
                : `${globalDupAudit.duplicateGroupsCount} Collisions`}
            </p>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Scanned {globalDupAudit.totalScanned.toLocaleString('en-IN')} active questions across Maharashtra, CBSE &amp; ICSE
            </p>
          </div>

          <div className="p-4 rounded-2xl border bg-blue-50/70 border-blue-200">
            <p className="text-[10px] font-black uppercase tracking-wider text-blue-800">
              Visitor Demo Questions
            </p>
            <p className="text-lg font-black text-blue-950 mt-1">
              {demoCoverageCounts.totalDemoQuestions} Total (20 / Board)
            </p>
            <p className="text-[11px] text-blue-700 mt-0.5">
              Strictly 2 unique demo questions per Class 1–10 per Board
            </p>
          </div>

          <div className="p-4 rounded-2xl border bg-indigo-50/70 border-indigo-200">
            <p className="text-[10px] font-black uppercase tracking-wider text-indigo-800">
              Visitor Demo Worksheets
            </p>
            <p className="text-lg font-black text-indigo-950 mt-1">
              {demoCoverageCounts.totalDemoWorksheets} Total (40 / Board)
            </p>
            <p className="text-[11px] text-indigo-700 mt-0.5">
              4 unique demo worksheets per Class 1–10 per Board (Math, Eng, Sci, GK)
            </p>
          </div>
        </div>

        {/* Interactive Duplicate Check Tool */}
        <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-3">
          <h4 className="font-bold text-xs uppercase text-amber-900">
            Interactive Semantic Similarity Checker
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={testQuestionInput}
              onChange={(e) => setTestQuestionInput(e.target.value)}
              placeholder="Enter candidate question to test against database..."
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden"
            />
            <input
              type="text"
              value={testAnswerInput}
              onChange={(e) => setTestAnswerInput(e.target.value)}
              placeholder="Target correct answer..."
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-medium focus:outline-hidden"
            />
          </div>
          <button
            type="button"
            onClick={handleRunDuplicateCheck}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
          >
            Run Duplicate Check
          </button>

          {duplicateScanResult && (
            <div
              className={`p-3 rounded-xl border text-xs font-medium ${
                duplicateScanResult.success
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border-rose-300'
              }`}
            >
              {duplicateScanResult.message}
            </div>
          )}
        </div>

        {/* Rejected Duplicates Log */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-800">
            Rejected Duplicate Records History ({rejectedDuplicates.length})
          </h3>

          {rejectedDuplicates.length === 0 ? (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
              No duplicate attempts recorded yet.
            </div>
          ) : (
            <>
              <AdminPagination
                totalItems={rejectedDuplicates.length}
                currentPage={safeRejPage}
                pageSize={rejPageSize}
                onPageChange={setRejPage}
                onPageSizeChange={setRejPageSize}
                pageSizeOptions={[10, 15, 30, 50]}
                itemLabel="blocked duplicates"
              />
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {paginatedRejected.map((rej) => (
                  <div key={rej.id} className="p-4 bg-rose-50/30 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-rose-700 uppercase text-[10px]">
                        Blocked: {rej.reason}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {new Date(rej.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="font-medium text-slate-800">
                      <strong>Attempted:</strong> "{rej.candidateText}"
                    </p>
                    {rej.matchedQuestionId && (
                      <p className="text-[11px] text-slate-500">
                        Matched existing: <strong>{rej.matchedQuestionId}</strong> (Similarity score:{' '}
                        {(rej.similarityScore * 100).toFixed(0)}%)
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
);
AdminDuplicatesSection.displayName = 'AdminDuplicatesSection';
