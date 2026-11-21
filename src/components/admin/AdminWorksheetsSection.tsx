import React, { useState, useMemo, useEffect } from 'react';
import { BookOpen, Search, Eye, ChevronDown, ChevronUp, Layers } from 'lucide-react';
import type { ClassLevel, EducationBoard } from '../../types';
import {
  getAllWorksheetsForClass,
  getVisitorDemoWorksheetsForClass,
  type OnlineWorksheet,
  type WorksheetCollectionType,
} from '../../data/worksheetsData';
import { BOARD_META_LIST } from '../../data/boards/boardMeta';
import { ALL_ADMIN_CLASSES } from '../../utils/adminAnalytics';
import { getBoardShortLabel } from '../../utils/subscriptionAccess';
import { AdminPagination } from './AdminPagination';

interface AdminWorksheetsSectionProps {
  selectedBoardWorkspace: 'all' | EducationBoard;
  selectedClassWorkspace: string;
}

export const AdminWorksheetsSection: React.FC<AdminWorksheetsSectionProps> = React.memo(
  ({ selectedBoardWorkspace, selectedClassWorkspace }) => {
    const [activeBoard, setActiveBoard] = useState<EducationBoard>(
      selectedBoardWorkspace === 'all' ? 'Maharashtra' : selectedBoardWorkspace
    );
    const [activeClass, setActiveClass] = useState<ClassLevel>(
      selectedClassWorkspace !== 'all' ? (selectedClassWorkspace as ClassLevel) : 'Class 1'
    );
    const [typeFilter, setTypeFilter] = useState<'all' | 'demo' | 'premium'>('all');
    const [collectionFilter, setCollectionFilter] = useState<'all' | WorksheetCollectionType>('all');
    const [searchInput, setSearchInput] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [expandedWorksheetId, setExpandedWorksheetId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);

    // Sync local controls when parent workspace changes cleanly
    useEffect(() => {
      if (selectedBoardWorkspace !== 'all') {
        setActiveBoard(selectedBoardWorkspace);
      }
    }, [selectedBoardWorkspace]);

    useEffect(() => {
      if (selectedClassWorkspace !== 'all') {
        setActiveClass(selectedClassWorkspace as ClassLevel);
      }
    }, [selectedClassWorkspace]);

    useEffect(() => {
      const t = setTimeout(() => setDebouncedSearch(searchInput.trim().toLowerCase()), 200);
      return () => clearTimeout(t);
    }, [searchInput]);

    // Memoize worksheets strictly for active (board, class) — avoids building all 3*10*N worksheets on switch
    const classWorksheets: OnlineWorksheet[] = useMemo(() => {
      return getAllWorksheetsForClass(activeClass, activeBoard);
    }, [activeClass, activeBoard]);

    const visitorDemoCount = useMemo(
      () => getVisitorDemoWorksheetsForClass(activeClass, activeBoard).length,
      [activeClass, activeBoard]
    );

    const filteredWorksheets = useMemo(() => {
      return classWorksheets.filter((ws) => {
        if (typeFilter === 'demo' && !ws.isDemo) return false;
        if (typeFilter === 'premium' && ws.isDemo) return false;
        if (collectionFilter === 'existing' && ws.worksheetCollection === 'new_23') return false;
        if (collectionFilter === 'new_23' && ws.worksheetCollection !== 'new_23') return false;
        if (debouncedSearch) {
          const hit =
            ws.id.toLowerCase().includes(debouncedSearch) ||
            ws.title.toLowerCase().includes(debouncedSearch) ||
            ws.subject.toLowerCase().includes(debouncedSearch) ||
            ws.chapterName.toLowerCase().includes(debouncedSearch) ||
            (ws.topic || '').toLowerCase().includes(debouncedSearch);
          if (!hit) return false;
        }
        return true;
      });
    }, [classWorksheets, typeFilter, collectionFilter, debouncedSearch]);

    useEffect(() => {
      setCurrentPage(1);
    }, [activeBoard, activeClass, typeFilter, collectionFilter, debouncedSearch]);

    const totalPages = Math.max(1, Math.ceil(filteredWorksheets.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    const paginatedWorksheets = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredWorksheets.slice(start, start + pageSize);
    }, [filteredWorksheets, safePage, pageSize]);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                Board &amp; Class-Wise Worksheets Bank Inspector
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Independent worksheet isolation for Maharashtra State Board, CBSE (NCERT), and ICSE (CISCE) across Standards 1st to 10th.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-extrabold self-start sm:self-auto">
            {getBoardShortLabel(activeBoard)} • {activeClass}
          </span>
        </div>

        {/* Independent Board Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {BOARD_META_LIST.map((bm) => {
            const isSelected = activeBoard === bm.id;
            return (
              <button
                type="button"
                key={bm.id}
                onClick={() => setActiveBoard(bm.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-slate-50 hover:bg-amber-50/70 border-slate-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold">
                    {bm.icon} {bm.shortLabel}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-800 text-white' : 'bg-white text-slate-600 border border-slate-200'
                    }`}
                  >
                    Independent Bank
                  </span>
                </div>
                <p className={`text-[11px] mt-1 ${isSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                  {bm.affiliationLabel}
                </p>
              </button>
            );
          })}
        </div>

        {/* Quick Class Pills */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Select Standard (O(1) Board + Class Worksheet Load)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {ALL_ADMIN_CLASSES.map((cls) => {
              const isSelected = activeClass === cls;
              return (
                <button
                  type="button"
                  key={cls}
                  onClick={() => setActiveClass(cls)}
                  className={`py-2.5 px-2 rounded-xl border text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {cls}
                </button>
              );
            })}
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <p className="text-[10px] font-bold uppercase text-amber-900">Class Worksheets</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{classWorksheets.length}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {classWorksheets.filter((w) => w.worksheetCollection !== 'new_23').length} existing +{' '}
              {classWorksheets.filter((w) => w.worksheetCollection === 'new_23').length} new set ({getBoardShortLabel(activeBoard)})
            </p>
          </div>
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200">
            <p className="text-[10px] font-bold uppercase text-emerald-900">Free Registered Demo</p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">
              {classWorksheets.filter((w) => w.isDemo).length} Worksheets
            </p>
            <p className="text-[10px] text-emerald-600 mt-0.5">English + Mathematics #1</p>
          </div>
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-200">
            <p className="text-[10px] font-bold uppercase text-blue-900">Visitor Playground</p>
            <p className="text-2xl font-extrabold text-blue-700 mt-1">{visitorDemoCount} Worksheets</p>
            <p className="text-[10px] text-blue-600 mt-0.5">Math, Eng, Sci &amp; GK unique set</p>
          </div>
          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
            <p className="text-[10px] font-bold uppercase text-purple-900">Total Structured Qs</p>
            <p className="text-2xl font-extrabold text-purple-700 mt-1">
              {classWorksheets.reduce((s, w) => s + w.questions.length, 0)} Qs
            </p>
            <p className="text-[10px] text-purple-600 mt-0.5">Chapter-aligned multi-format bank</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {(['all', 'demo', 'premium'] as const).map((mode) => (
              <button
                type="button"
                key={mode}
                onClick={() => setTypeFilter(mode)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                  typeFilter === mode
                    ? 'bg-amber-600 text-white border-amber-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {mode === 'all'
                  ? 'All Worksheets'
                  : mode === 'demo'
                    ? 'Free Demo (Registered)'
                    : 'Premium Only (₹99)'}
              </button>
            ))}
            {([
              { id: 'all' as const, label: 'All Sets' },
              { id: 'existing' as const, label: 'Existing Set' },
              { id: 'new_23' as const, label: '23 New / Subject' },
            ]).map((col) => (
              <button
                type="button"
                key={col.id}
                onClick={() => setCollectionFilter(col.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border cursor-pointer transition-all ${
                  collectionFilter === col.id
                    ? 'bg-indigo-600 text-white border-indigo-600'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search worksheet ID, subject, chapter..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden font-medium"
            />
          </div>
        </div>

        <AdminPagination
          totalItems={filteredWorksheets.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[6, 10, 20, 40]}
          itemLabel="worksheets"
        />

        {/* Paginated Worksheets List */}
        <div className="space-y-3">
          {paginatedWorksheets.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500">
              No worksheets found for this filter combination.
            </div>
          ) : (
            paginatedWorksheets.map((ws) => {
              const isExpanded = expandedWorksheetId === ws.id;
              return (
                <div
                  key={ws.id}
                  className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/40"
                >
                  <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[11px] font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                          {ws.id}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                          {getBoardShortLabel(ws.board || activeBoard)} • {ws.classLevel}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            ws.isDemo
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-purple-100 text-purple-800 border border-purple-200'
                          }`}
                        >
                          {ws.isDemo ? 'FREE DEMO' : 'PREMIUM ₹99'}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                            ws.worksheetCollection === 'new_23'
                              ? 'bg-indigo-100 text-indigo-800 border border-indigo-200'
                              : 'bg-slate-100 text-slate-700 border border-slate-200'
                          }`}
                        >
                          {ws.worksheetCollection === 'new_23' ? '23 NEW SET' : 'EXISTING SET'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-900">{ws.title}</h4>
                      <p className="text-[11px] text-slate-500">
                        Chapter: <strong className="text-slate-700">{ws.chapterName}</strong> •{' '}
                        {ws.questions.length} Qs • {ws.totalMarks} Marks • {ws.durationMinutes} mins
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setExpandedWorksheetId(isExpanded ? null : ws.id)}
                      className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-center shrink-0"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>{isExpanded ? 'Hide Questions' : `Inspect ${ws.questions.length} Questions`}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="p-4 border-t border-slate-200 space-y-2 text-xs">
                      {ws.questions.map((q) => (
                        <div
                          key={q.id}
                          className="p-3 rounded-xl bg-white border border-slate-200 space-y-1"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[10px] font-bold text-slate-500">
                              Q{q.number} • {q.id} ({q.marks} Marks)
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                              {q.format.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className="font-bold text-slate-900">{q.prompt}</p>
                          <p className="text-[11px] text-emerald-700 font-bold">
                            ✓ Answer: {q.options[q.correctIndex]}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
);
AdminWorksheetsSection.displayName = 'AdminWorksheetsSection';
