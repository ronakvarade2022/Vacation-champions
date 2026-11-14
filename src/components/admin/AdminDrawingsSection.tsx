import React, { useState, useMemo, useEffect } from 'react';
import { Palette, Plus, Trash2 } from 'lucide-react';
import type { DrawingCategory, DrawingSubmission, DrawingTemplate } from '../../types';
import { DRAWING_CATEGORIES, ACTIVE_DRAWING_CHALLENGES } from '../../data/drawingsData';
import { AdminPagination } from './AdminPagination';

interface DrawingTemplateRowProps {
  tpl: DrawingTemplate;
  onTogglePublished: (id: string) => void;
  onDelete: (id: string) => void;
}

const DrawingTemplateRow: React.FC<DrawingTemplateRowProps> = React.memo(
  ({ tpl, onTogglePublished, onDelete }) => (
    <tr className="hover:bg-slate-50/70 transition-colors">
      <td className="py-3 px-4">
        <div
          className="w-16 h-12 bg-white rounded-lg border border-slate-200 p-1 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
          dangerouslySetInnerHTML={{ __html: tpl.svgOutline }}
        />
      </td>
      <td className="py-3 px-4">
        <p className="font-extrabold text-slate-900">{tpl.title}</p>
        <p className="text-[11px] text-slate-500 max-w-sm truncate">{tpl.description}</p>
      </td>
      <td className="py-3 px-4">
        <span className="px-2 py-0.5 rounded-md font-bold text-rose-600 bg-rose-50">
          {tpl.category}
        </span>
      </td>
      <td className="py-3 px-4">
        <span className="px-2 py-0.5 rounded-md font-bold text-indigo-600 bg-indigo-50">
          {tpl.classTier}
        </span>
      </td>
      <td className="py-3 px-4">
        <button
          type="button"
          onClick={() => onTogglePublished(tpl.id)}
          className={`px-2.5 py-1 rounded-full font-bold text-[10px] cursor-pointer transition-all ${
            tpl.published ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
          }`}
        >
          {tpl.published ? '● Live (Published)' : '○ Hidden (Draft)'}
        </button>
      </td>
      <td className="py-3 px-4 text-right">
        <button
          type="button"
          onClick={() => onDelete(tpl.id)}
          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
          title="Delete template"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </td>
    </tr>
  )
);
DrawingTemplateRow.displayName = 'DrawingTemplateRow';

interface AdminDrawingsSectionProps {
  drawingTemplates: DrawingTemplate[];
  savedDrawings: DrawingSubmission[];
  toggleDrawingTemplatePublished: (id: string) => void;
  deleteDrawingTemplate: (id: string) => void;
  addDrawingTemplate: (tpl: DrawingTemplate) => void;
}

export const AdminDrawingsSection: React.FC<AdminDrawingsSectionProps> = React.memo(
  ({
    drawingTemplates,
    savedDrawings,
    toggleDrawingTemplatePublished,
    deleteDrawingTemplate,
    addDrawingTemplate,
  }) => {
    const [showAddTemplateModal, setShowAddTemplateModal] = useState<boolean>(false);
    const [newTplTitle, setNewTplTitle] = useState<string>('');
    const [newTplCategory, setNewTplCategory] =
      useState<DrawingCategory>('Nature and Scenery');
    const [newTplTier, setNewTplTier] = useState<'Classes 2–3' | 'Classes 4–5' | 'Classes 6–8'>(
      'Classes 2–3'
    );
    const [newTplDesc, setNewTplDesc] = useState<string>('');
    const [newTplSvg, setNewTplSvg] = useState<string>('');
    const [tplFilterCategory, setTplFilterCategory] = useState<string>('all');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);

    const publishedCount = useMemo(
      () => drawingTemplates.filter((t) => t.published).length,
      [drawingTemplates]
    );

    const filteredTemplates = useMemo(
      () =>
        drawingTemplates.filter(
          (t) => tplFilterCategory === 'all' || t.category === tplFilterCategory
        ),
      [drawingTemplates, tplFilterCategory]
    );

    useEffect(() => {
      setCurrentPage(1);
    }, [tplFilterCategory]);

    const safePage = Math.min(
      currentPage,
      Math.max(1, Math.ceil(filteredTemplates.length / pageSize))
    );
    const paginatedTemplates = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return filteredTemplates.slice(start, start + pageSize);
    }, [filteredTemplates, safePage, pageSize]);

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <Palette className="w-6 h-6 text-amber-600" />
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                Drawing Champions &amp; Outline Management
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Oversee ready-made colouring templates across 12 categories (A to L), class tiers, challenges, and student submissions.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAddTemplateModal(true)}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Outline Drawing</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200">
            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">
              Total Templates
            </p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{drawingTemplates.length}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">Across 12 core categories</p>
          </div>

          <div className="bg-emerald-50/70 rounded-2xl p-4 border border-emerald-200">
            <p className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">
              Published &amp; Live
            </p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-1">{publishedCount}</p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Available in student studio</p>
          </div>

          <div className="bg-indigo-50/70 rounded-2xl p-4 border border-indigo-200">
            <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">
              Student Artworks Saved
            </p>
            <p className="text-2xl font-extrabold text-indigo-700 mt-1">{savedDrawings.length}</p>
            <p className="text-[10px] text-indigo-600 mt-0.5">In student portfolios</p>
          </div>

          <div className="bg-rose-50/70 rounded-2xl p-4 border border-rose-200">
            <p className="text-[11px] font-bold text-rose-900 uppercase tracking-wider">
              Active Challenges
            </p>
            <p className="text-2xl font-extrabold text-rose-700 mt-1">
              {ACTIVE_DRAWING_CHALLENGES.length}
            </p>
            <p className="text-[10px] text-rose-600 mt-0.5">Daily, nature &amp; festival</p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-600">
            <span>Filter Templates by Category:</span>
            <span className="text-amber-600">
              {tplFilterCategory === 'all' ? 'All Categories' : tplFilterCategory}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              type="button"
              onClick={() => setTplFilterCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                tplFilterCategory === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All ({drawingTemplates.length})
            </button>
            {DRAWING_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.id}
                onClick={() => setTplFilterCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  tplFilterCategory === cat.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <AdminPagination
          totalItems={filteredTemplates.length}
          currentPage={safePage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          pageSizeOptions={[8, 12, 24, 50]}
          itemLabel="templates"
        />

        {/* Paginated Templates Table */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-extrabold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Preview</th>
                  <th className="py-3 px-4">Title &amp; Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Class Tier</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedTemplates.map((tpl) => (
                  <DrawingTemplateRow
                    key={tpl.id}
                    tpl={tpl}
                    onTogglePublished={toggleDrawingTemplatePublished}
                    onDelete={deleteDrawingTemplate}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Drawing Challenges Showcase */}
        <div className="pt-4 border-t border-slate-100 space-y-3">
          <h3 className="font-bold text-sm text-slate-800 flex items-center gap-2">
            <span>🏆</span> Active Live Drawing Challenges &amp; Competitions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ACTIVE_DRAWING_CHALLENGES.map((ch) => (
              <div
                key={ch.id}
                className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                      {ch.type}
                    </span>
                    <span className="text-xs font-extrabold text-slate-900">{ch.title}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{ch.description}</p>
                  <p className="text-[11px] text-slate-500 mt-1 font-medium">Theme: {ch.theme}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-rose-600 block">
                    +{ch.rewardPoints} Pts
                  </span>
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md block mt-1">
                    {ch.badgeName}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ADD DRAWING TEMPLATE MODAL */}
        {showAddTemplateModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl border border-amber-300 p-6 sm:p-8 space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900">
                    Add New Ready-Made Outline Drawing
                  </h3>
                  <p className="text-xs text-slate-500">
                    Create a new template for the Colouring World
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddTemplateModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newTplTitle.trim()) return;
                  const newTpl: DrawingTemplate = {
                    id: `tpl-${Date.now().toString(36)}`,
                    title: newTplTitle.trim(),
                    category: newTplCategory,
                    classTier: newTplTier,
                    description:
                      newTplDesc.trim() || 'A delightful outline drawing for young artists to colour.',
                    published: true,
                    svgOutline:
                      newTplSvg.trim() ||
                      `<svg viewBox="0 0 500 400" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="500" height="400" fill="#ffffff" stroke="#000000" stroke-width="4"/><circle cx="250" cy="200" r="100" fill="#ffffff" stroke="#000000" stroke-width="4"/><circle cx="210" cy="180" r="12" fill="#000000"/><circle cx="290" cy="180" r="12" fill="#000000"/><path d="M 210 230 Q 250 270 290 230" fill="none" stroke="#000000" stroke-width="4"/></svg>`,
                  };
                  addDrawingTemplate(newTpl);
                  setShowAddTemplateModal(false);
                  setNewTplTitle('');
                  setNewTplDesc('');
                  setNewTplSvg('');
                }}
                className="space-y-4 text-xs"
              >
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Drawing Title</label>
                  <input
                    type="text"
                    required
                    value={newTplTitle}
                    onChange={(e) => setNewTplTitle(e.target.value)}
                    placeholder="e.g. Royal Bengal Tiger, Sacred Lotus..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">
                      Category (12 Categories A-L)
                    </label>
                    <select
                      value={newTplCategory}
                      onChange={(e) => setNewTplCategory(e.target.value as DrawingCategory)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                    >
                      {DRAWING_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Class Tier</label>
                    <select
                      value={newTplTier}
                      onChange={(e) => setNewTplTier(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white"
                    >
                      <option value="Classes 2–3">Classes 2–3 (Beginner)</option>
                      <option value="Classes 4–5">Classes 4–5 (Intermediate)</option>
                      <option value="Classes 6–8">Classes 6–8 (Advanced)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Description</label>
                  <input
                    type="text"
                    value={newTplDesc}
                    onChange={(e) => setNewTplDesc(e.target.value)}
                    placeholder="Short description for students..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    SVG Vector Outline Code
                  </label>
                  <textarea
                    rows={4}
                    value={newTplSvg}
                    onChange={(e) => setNewTplSvg(e.target.value)}
                    placeholder='<svg viewBox="0 0 500 400" width="100%" height="100%" ...><rect ... stroke="#000000"/></svg>'
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-[11px] focus:outline-hidden"
                  />
                  <span className="text-[10px] text-slate-400">
                    Leave blank to use default child-friendly smiling avatar outline template.
                  </span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowAddTemplateModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-xs"
                  >
                    Save &amp; Publish Template
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
AdminDrawingsSection.displayName = 'AdminDrawingsSection';
