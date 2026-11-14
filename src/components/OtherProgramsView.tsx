import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  Layers,
} from 'lucide-react';

interface OtherProgramsViewProps {
  onNavigateStudio: (targetTab: string) => void;
  onBackHome: () => void;
}

export const OtherProgramsView: React.FC<OtherProgramsViewProps> = ({
  onNavigateStudio,
  onBackHome,
}) => {
  const { learningPrograms } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const publishedPrograms = learningPrograms.filter((p) => p.published !== false);
  const categories = ['All', ...Array.from(new Set(publishedPrograms.map((p) => p.category)))];

  const visiblePrograms =
    selectedCategory === 'All'
      ? publishedPrograms
      : publishedPrograms.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-gradient-to-br from-amber-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Special Learning Programs &amp; Enrichment Studios</span>
          </span>
        </div>

        <div className="space-y-2 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
            Other Existing Learning Programs &amp; Champion Tracks
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Every specialized learning program created inside MyStudyZone—including AI Learning Academy, Future Skills, Brain Puzzles, Sudoku, Scholarship Champions, Story Libraries, and Custom Admin Programs—is organized here for quick discovery.
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Program Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {visiblePrograms.map((prog) => (
          <div
            key={prog.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl shrink-0">
                    {prog.iconEmoji || '🎓'}
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                      {prog.category}
                    </span>
                    <h2 className="font-display font-extrabold text-base text-slate-900 leading-snug">
                      {prog.title}
                    </h2>
                  </div>
                </div>
                {prog.badgeText && (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-extrabold shrink-0">
                    {prog.badgeText}
                  </span>
                )}
              </div>

              <p className="text-xs font-bold text-slate-700">{prog.subtitle}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>

              {prog.highlights && prog.highlights.length > 0 && (
                <ul className="space-y-1.5 pt-2 border-t border-slate-100">
                  {prog.highlights.map((h) => (
                    <li key={h} className="text-[11px] text-slate-700 font-medium flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button
              type="button"
              onClick={() => onNavigateStudio(prog.targetTab || 'future-skills')}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <span>Open {prog.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Direct Shortcuts to Academic Courses & Creative Hub */}
      <div className="bg-slate-50 rounded-3xl p-5 sm:p-6 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-300 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-sm text-slate-900">
              Explore Complete Classes 1–10 Board Syllabus
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Switch between Maharashtra State Board, CBSE, and ICSE with dedicated study notes, worksheets, and MCQs.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigateStudio('all-courses')}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto"
        >
          <GraduationCap className="w-4 h-4 text-amber-300" />
          <span>Browse All Courses</span>
        </button>
      </div>
    </div>
  );
};
