import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface AdminPaginationProps {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  itemLabel?: string;
}

export const AdminPagination: React.FC<AdminPaginationProps> = React.memo(({
  totalItems,
  currentPage,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [15, 25, 50, 100],
  itemLabel = 'items',
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIdx = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const endIdx = Math.min(totalItems, safePage * pageSize);

  const pageNumbers: number[] = [];
  const maxButtons = 5;
  let startPage = Math.max(1, safePage - Math.floor(maxButtons / 2));
  const endPage = Math.min(totalPages, startPage + maxButtons - 1);
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }
  for (let p = startPage; p <= endPage; p++) {
    pageNumbers.push(p);
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 bg-slate-50/80 border border-slate-200 rounded-2xl text-xs">
      <div className="flex flex-wrap items-center gap-3 text-slate-600 font-medium">
        <span>
          Showing <strong className="text-slate-900">{startIdx}–{endIdx}</strong> of{' '}
          <strong className="text-slate-900">{totalItems.toLocaleString('en-IN')}</strong> {itemLabel}
        </span>

        {onPageSizeChange && (
          <label className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-600">
            <span>Rows:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                onPageSizeChange(Number(e.target.value));
                onPageChange(1);
              }}
              className="px-2 py-1 rounded-lg border border-slate-300 bg-white text-slate-800 font-bold text-xs cursor-pointer"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="flex items-center gap-1 self-end sm:self-auto">
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(1)}
          aria-label="First page"
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          disabled={safePage <= 1}
          onClick={() => onPageChange(safePage - 1)}
          aria-label="Previous page"
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {pageNumbers.map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => onPageChange(num)}
            className={`min-w-[28px] h-7 px-2 rounded-lg text-[11px] font-extrabold transition-colors cursor-pointer ${
              num === safePage
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-amber-50'
            }`}
          >
            {num}
          </button>
        ))}

        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(safePage + 1)}
          aria-label="Next page"
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          disabled={safePage >= totalPages}
          onClick={() => onPageChange(totalPages)}
          aria-label="Last page"
          className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-amber-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
});

AdminPagination.displayName = 'AdminPagination';
