import React, { useState, useMemo, useEffect } from 'react';
import type { StoryItem } from '../../types';
import type { ShivajiStory } from '../../data/shivajiStoriesData';
import { AdminPagination } from './AdminPagination';
import { Eye, EyeOff, Plus, Trash2, X } from 'lucide-react';

interface AdminStoriesSectionProps {
  allStories: StoryItem[];
  shivajiStories: ShivajiStory[];
  onSaveStory: (story: StoryItem) => Promise<void>;
  onToggleStoryPublished: (storyId: string) => Promise<void>;
  onDeleteCustomStory: (storyId: string) => Promise<void>;
  onSaveShivajiStory: (story: ShivajiStory) => Promise<void>;
  onDeleteCustomShivajiStory: (storyId: string) => Promise<void>;
}

export const AdminStoriesSection: React.FC<AdminStoriesSectionProps> = React.memo(
  ({
    allStories,
    shivajiStories,
    onSaveStory,
    onToggleStoryPublished,
    onDeleteCustomStory,
    onSaveShivajiStory,
    onDeleteCustomShivajiStory,
  }) => {
    const [activeSubTab, setActiveSubTab] = useState<'story_world' | 'shivaji'>('story_world');
    const [languageFilter, setLanguageFilter] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(15);

    // Add Story World Modal
    const [showStoryModal, setShowStoryModal] = useState(false);
    const [storyTitle, setStoryTitle] = useState('');
    const [storyLang, setStoryLang] = useState<'English' | 'Hindi' | 'Marathi'>('English');
    const [storyCategory, setStoryCategory] = useState('Moral Values');
    const [storyClassRec, setStoryClassRec] = useState('Classes 1–5');
    const [storySummary, setStorySummary] = useState('');
    const [storyBody, setStoryBody] = useState('');
    const [storyMoral, setStoryMoral] = useState('');

    // Add Shivaji Chapter Modal
    const [showShivajiModal, setShowShivajiModal] = useState(false);
    const [shivTitleEn, setShivTitleEn] = useState('');
    const [shivTitleMr, setShivTitleMr] = useState('');
    const [shivYear, setShivYear] = useState('1660 CE');
    const [shivLocation, setShivLocation] = useState('Raigad Fort');
    const [shivSummaryEn, setShivSummaryEn] = useState('');
    const [shivBodyEn, setShivBodyEn] = useState('');
    const [shivMoralEn, setShivMoralEn] = useState('');

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

    const activeListLength =
      activeSubTab === 'story_world' ? filteredStories.length : shivajiStories.length;

    useEffect(() => {
      setCurrentPage(1);
    }, [languageFilter, activeSubTab]);

    const safePage = Math.min(currentPage, Math.max(1, Math.ceil(activeListLength / pageSize)));
    const paginatedStories = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredStories.slice(start, start + pageSize);
    }, [filteredStories, safePage, pageSize]);

    const paginatedShivaji = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return shivajiStories.slice(start, start + pageSize);
    }, [shivajiStories, safePage, pageSize]);

    const handleCreateStory = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!storyTitle.trim() || !storyBody.trim()) return;
      const paragraphs = storyBody
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean);
      const newStory: StoryItem = {
        id: `story_custom_${Date.now()}`,
        title: storyTitle.trim(),
        language: storyLang,
        themeColor: storyLang === 'Marathi' ? 'amber' : storyLang === 'Hindi' ? 'rose' : 'indigo',
        category: storyCategory.trim() || 'Moral Values',
        classRecommendation: storyClassRec.trim() || 'Classes 1–5',
        summary: storySummary.trim() || paragraphs[0] || storyTitle.trim(),
        content: paragraphs,
        moral: storyMoral.trim() || 'Always stay honest, kind, and curious.',
        vocabulary: [],
        questions: [],
        estimatedReadMinutes: Math.max(2, Math.ceil(paragraphs.length * 0.8)),
        audioSampleScript: paragraphs.join(' '),
        published: true,
        isCustom: true,
      };
      await onSaveStory(newStory);
      setStoryTitle('');
      setStorySummary('');
      setStoryBody('');
      setStoryMoral('');
      setShowStoryModal(false);
    };

    const handleCreateShivajiStory = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!shivTitleEn.trim() || !shivBodyEn.trim()) return;
      const paragraphs = shivBodyEn
        .split('\n')
        .map((p) => p.trim())
        .filter(Boolean);
      const titleEn = shivTitleEn.trim();
      const titleMr = shivTitleMr.trim() || titleEn;
      const summaryEn = shivSummaryEn.trim() || paragraphs[0] || titleEn;
      const moralEn = shivMoralEn.trim() || 'Courage, strategy, and respect for every citizen build Swarajya.';
      const nextOrder = shivajiStories.reduce((max, s) => Math.max(max, s.order), 0) + 1;

      const newChapter: ShivajiStory = {
        id: `SHIVAJI-CUSTOM-${Date.now()}`,
        order: nextOrder,
        year: shivYear.trim() || '1674 CE',
        location: shivLocation.trim() || 'Raigad',
        title: { English: titleEn, Marathi: titleMr, Hindi: titleEn },
        summary: { English: summaryEn, Marathi: summaryEn, Hindi: summaryEn },
        moral: { English: moralEn, Marathi: moralEn, Hindi: moralEn },
        paragraphs: { English: paragraphs, Marathi: paragraphs, Hindi: paragraphs },
        published: true,
        isCustom: true,
      };
      await onSaveShivajiStory(newChapter);
      setShivTitleEn('');
      setShivTitleMr('');
      setShivSummaryEn('');
      setShivBodyEn('');
      setShivMoralEn('');
      setShowShivajiModal(false);
    };

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900">
              Story World ({allStories.length}) &amp; Shivaji Maharaj Chapters ({shivajiStories.length})
            </h2>
            <p className="text-xs text-slate-500">
              Publish, hide, or add multilingual moral stories and historical Swarajya chapters stored in Firestore.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSubTab('story_world')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${
                activeSubTab === 'story_world'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Story World ({allStories.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('shivaji')}
              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer ${
                activeSubTab === 'shivaji'
                  ? 'bg-orange-600 text-white'
                  : 'bg-orange-50 text-orange-900 hover:bg-orange-100'
              }`}
            >
              Shivaji Maharaj ({shivajiStories.length})
            </button>
            <button
              type="button"
              onClick={() =>
                activeSubTab === 'story_world' ? setShowStoryModal(true) : setShowShivajiModal(true)
              }
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{activeSubTab === 'story_world' ? 'Add Story' : 'Add Shivaji Chapter'}</span>
            </button>
          </div>
        </div>

        {activeSubTab === 'story_world' && (
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
        )}

        <AdminPagination
          totalItems={activeListLength}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[9, 15, 30, 45]}
          itemLabel={activeSubTab === 'story_world' ? 'stories' : 'chapters'}
        />

        {activeSubTab === 'story_world' ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paginatedStories.map((story) => {
              const isPublished = story.published !== false;
              const isCustom = Boolean(story.isCustom && story.id.startsWith('story_custom_'));
              return (
                <div
                  key={story.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2.5 flex flex-col justify-between ${
                    isPublished ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-75'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                        {story.language}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{story.title}</h4>
                    <p className="text-slate-500 line-clamp-2">{story.summary}</p>
                    <p className="text-[11px] text-amber-900 font-medium italic">
                      Moral: {story.moral}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => void onToggleStoryPublished(story.id)}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-amber-700 cursor-pointer"
                    >
                      {isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isPublished ? 'Hide' : 'Publish'}</span>
                    </button>
                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => void onDeleteCustomStory(story.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {paginatedShivaji.map((ch) => {
              const isPublished = ch.published !== false;
              const isCustom = Boolean(ch.isCustom && ch.id.startsWith('SHIVAJI-CUSTOM-'));
              return (
                <div
                  key={ch.id}
                  className={`p-4 rounded-2xl border text-xs space-y-2.5 flex flex-col justify-between ${
                    isPublished ? 'border-orange-200 bg-white' : 'border-slate-200 bg-slate-50 opacity-75'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-orange-800 bg-orange-100 px-2 py-0.5 rounded text-[10px]">
                        Chapter {ch.order} · {ch.year}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isPublished ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                        }`}
                      >
                        {isPublished ? 'Published' : 'Hidden'}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900">{ch.title.English}</h4>
                    <p className="text-slate-500 line-clamp-2">{ch.summary.English}</p>
                    <p className="text-[11px] text-orange-900 font-medium">📍 {ch.location}</p>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() =>
                        void onSaveShivajiStory({ ...ch, published: !isPublished })
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-700 hover:text-orange-700 cursor-pointer"
                    >
                      {isPublished ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{isPublished ? 'Hide' : 'Publish'}</span>
                    </button>
                    {isCustom && (
                      <button
                        type="button"
                        onClick={() => void onDeleteCustomShivajiStory(ch.id)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add Story World Modal */}
        {showStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-amber-200 relative max-h-[90vh] overflow-y-auto space-y-4">
              <button
                type="button"
                onClick={() => setShowStoryModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-display font-extrabold text-slate-900">
                Add New Moral Story
              </h3>
              <form onSubmit={handleCreateStory} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="font-bold text-slate-700 block mb-1">Story Title *</label>
                    <input
                      type="text"
                      required
                      value={storyTitle}
                      onChange={(e) => setStoryTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Language</label>
                    <select
                      value={storyLang}
                      onChange={(e) => setStoryLang(e.target.value as 'English' | 'Hindi' | 'Marathi')}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-bold"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Marathi">Marathi</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Category</label>
                    <input
                      type="text"
                      value={storyCategory}
                      onChange={(e) => setStoryCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Recommended Classes</label>
                    <input
                      type="text"
                      value={storyClassRec}
                      onChange={(e) => setStoryClassRec(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Short Summary</label>
                  <input
                    type="text"
                    value={storySummary}
                    onChange={(e) => setStorySummary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Story Paragraphs (one paragraph per line) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={storyBody}
                    onChange={(e) => setStoryBody(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Moral Lesson</label>
                  <input
                    type="text"
                    value={storyMoral}
                    onChange={(e) => setStoryMoral(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowStoryModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer"
                  >
                    Publish Story
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Shivaji Chapter Modal */}
        {showShivajiModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-orange-200 relative max-h-[90vh] overflow-y-auto space-y-4">
              <button
                type="button"
                onClick={() => setShowShivajiModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-lg font-display font-extrabold text-slate-900">
                Add Shivaji Maharaj Historical Chapter
              </h3>
              <form onSubmit={handleCreateShivajiStory} className="space-y-3 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Chapter Title (English) *</label>
                    <input
                      type="text"
                      required
                      value={shivTitleEn}
                      onChange={(e) => setShivTitleEn(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Chapter Title (Marathi)</label>
                    <input
                      type="text"
                      value={shivTitleMr}
                      onChange={(e) => setShivTitleMr(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Historical Year</label>
                    <input
                      type="text"
                      value={shivYear}
                      onChange={(e) => setShivYear(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Fort / Location</label>
                    <input
                      type="text"
                      value={shivLocation}
                      onChange={(e) => setShivLocation(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Chapter Summary</label>
                  <input
                    type="text"
                    value={shivSummaryEn}
                    onChange={(e) => setShivSummaryEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Chapter Paragraphs (one paragraph per line) *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={shivBodyEn}
                    onChange={(e) => setShivBodyEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Leadership Moral</label>
                  <input
                    type="text"
                    value={shivMoralEn}
                    onChange={(e) => setShivMoralEn(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowShivajiModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold cursor-pointer"
                  >
                    Publish Chapter
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
);
AdminStoriesSection.displayName = 'AdminStoriesSection';
