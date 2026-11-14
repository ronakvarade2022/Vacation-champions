import React, { useState, useMemo, useEffect } from 'react';
import type { StoryItem } from '../../types';
import { AdminPagination } from './AdminPagination';

interface AdminStoriesSectionProps {
  allStories: StoryItem[];
}

export const AdminStoriesSection: React.FC<AdminStoriesSectionProps> = React.memo(
  ({ allStories }) => {
    const [languageFilter, setLanguageFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(15);

    const languages = useMemo(
      () => Array.from(new Set(allStories.map((s) => s.language))).sort(),
      [allStories]
    );

    const filteredStories = useMemo(
      () =>
        languageFilter === 'all'
          ? allStories
          : allStories.filter((s) => s.language === languageFilter),
      [allStories, languageFilter]
    );

    useEffect(() => {
      setCurrentPage(1);
    }, [languageFilter]);

    const safePage = Math.min(
      currentPage,
      Math.max(1, Math.ceil(filteredStories.length / pageSize))
    );
    const paginatedStories = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredStories.slice(start, start + pageSize);
    }, [filteredStories, safePage, pageSize]);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Original Story Library ({allStories.length} Stories)
            </h2>
            <p className="text-xs text-slate-500">
              15 English • 15 Hindi • 15 Marathi stories with comprehension questions and audio scripts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => setLanguageFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                languageFilter === 'all'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({allStories.length})
            </button>
            {languages.map((lang) => (
              <button
                type="button"
                key={lang}
                onClick={() => setLanguageFilter(lang)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  languageFilter === lang
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <AdminPagination
          totalItems={filteredStories.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[9, 15, 30, 45]}
          itemLabel="stories"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {paginatedStories.map((story) => (
            <div key={story.id} className="p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                  {story.language}
                </span>
                <span className="text-slate-400 font-mono text-[10px]">{story.id}</span>
              </div>
              <h4 className="font-bold text-sm text-slate-900">{story.title}</h4>
              <p className="text-slate-500 line-clamp-2">{story.summary}</p>
              <p className="text-[11px] text-amber-900 font-medium italic">
                Moral: {story.moral}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
);
AdminStoriesSection.displayName = 'AdminStoriesSection';
