import React, { useState, useMemo, useEffect } from 'react';
import {
  STD_4_SCHOLARSHIP_BANK,
  STD_7_SCHOLARSHIP_BANK,
  MSCE_LANGUAGES,
} from '../../data/scholarshipData';
import { AdminPagination } from './AdminPagination';

export const AdminScholarshipSection: React.FC = React.memo(() => {
  const [selectedStd, setSelectedStd] = useState<'Std 4' | 'Std 7'>('Std 4');
  const [testFilter, setTestFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);

  const activeBank = selectedStd === 'Std 4' ? STD_4_SCHOLARSHIP_BANK : STD_7_SCHOLARSHIP_BANK;

  const filteredQuestions = useMemo(() => {
    if (testFilter === 'all') return activeBank;
    return activeBank.filter((q) => String(q.testNumber) === testFilter);
  }, [activeBank, testFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedStd, testFilter]);

  const safePage = Math.min(
    currentPage,
    Math.max(1, Math.ceil(filteredQuestions.length / pageSize))
  );
  const paginatedQuestions = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredQuestions.slice(start, start + pageSize);
  }, [filteredQuestions, safePage, pageSize]);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h2 className="text-xl font-display font-extrabold text-slate-900">
              Maharashtra MSCE Scholarship Practice Banks &amp; Multilingual Engine
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Official syllabus for Std 4th (Primary) &amp; Std 7th (Upper Primary) across 7 approved MSCE mediums.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-amber-900 bg-amber-100 px-3.5 py-1.5 rounded-xl self-start sm:self-auto">
          <span>7 Official Languages Supported</span>
        </div>
      </div>

      {/* Languages overview */}
      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2">
        <span className="font-bold text-amber-950 block">Approved Examination Languages:</span>
        <div className="flex flex-wrap gap-2">
          {MSCE_LANGUAGES.map((lang) => (
            <span
              key={lang.id}
              className="bg-white border border-amber-300 text-amber-900 px-3 py-1 rounded-xl font-bold"
            >
              {lang.label}
            </span>
          ))}
        </div>
      </div>

      {/* Switcher + Test Filter (avoids rendering all 600 DOM nodes at once) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedStd('Std 4')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
              selectedStd === 'Std 4'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
            }`}
          >
            Std 4th – Primary Scholarship ({STD_4_SCHOLARSHIP_BANK.length} Qs)
          </button>
          <button
            type="button"
            onClick={() => setSelectedStd('Std 7')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer transition-all ${
              selectedStd === 'Std 7'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
            }`}
          >
            Std 7th – Upper Primary ({STD_7_SCHOLARSHIP_BANK.length} Qs)
          </button>
        </div>

        <select
          value={testFilter}
          onChange={(e) => setTestFilter(e.target.value)}
          className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700 self-start sm:self-auto"
        >
          <option value="all">All 10 Practice Tests</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={String(num)}>
              Practice Test Set {num}
            </option>
          ))}
        </select>
      </div>

      <AdminPagination
        totalItems={filteredQuestions.length}
        currentPage={safePage}
        pageSize={pageSize}
        onPageChange={setCurrentPage}
        onPageSizeChange={setPageSize}
        pageSizeOptions={[10, 15, 30, 50]}
        itemLabel="scholarship questions"
      />

      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-slate-900">
            {selectedStd === 'Std 4'
              ? 'Std 4th – Primary Scholarship (PSE)'
              : 'Std 7th – Upper Primary Scholarship (UPS)'}
          </h3>
          <span className="text-xs bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold">
            10 Tests Active
          </span>
        </div>
        <p className="text-xs text-slate-500">
          {selectedStd === 'Std 4'
            ? 'Paper 1 (Language & Maths) + Paper 2 (Third Lang & Intelligence). Total 150 marks per paper.'
            : 'Advanced Algebra, Geometry, Reasoning, Clock Angles, Coding & Comprehension.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {paginatedQuestions.map((q) => (
            <div
              key={q.id}
              className="p-3 bg-white rounded-xl border border-slate-200 text-[11px] space-y-1 shadow-2xs"
            >
              <span className="font-bold text-slate-800 block">
                Test {q.testNumber} • {q.subject}
              </span>
              <p className="text-slate-600 line-clamp-2">{q.questionText.English}</p>
              <p className="text-emerald-800 font-semibold">
                Answer: {q.options.English[q.correctIndex]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
AdminScholarshipSection.displayName = 'AdminScholarshipSection';
