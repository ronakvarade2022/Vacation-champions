import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { SpecialCardIllustration } from './DashboardIllustrations';
import { SectionOrientationGuide } from './SectionOrientationGuide';

interface OtherProgramsViewProps {
  onNavigateStudio: (targetTab: string) => void;
  onBackHome: () => void;
}

const CORE_SPECIAL_PROGRAMMES = [
  {
    id: 'sp-drawing',
    title: '1. Drawing Studio',
    subtitle: 'Digital Colouring & Freehand Art Studio',
    description:
      'Explore 120+ interactive colouring templates, paint bucket flood-fill tools, freehand brushes, geometric shapes, and save your artwork to your gallery.',
    illustration: 'drawing' as const,
    cardGradient: 'from-[#f3e8ff] via-[#e9d5ff] to-[#d8b4fe]',
    borderClass: 'border-[#9333ea]/40',
    badgeText: '120+ Templates',
    targetTab: 'drawing',
    ctaLabel: 'Open Drawing Studio',
  },
  {
    id: 'sp-stories',
    title: '2. Story World',
    subtitle: '45+ Multilingual Audio Stories',
    description:
      'Listen to and read 45+ original stories across English, Hindi, and Marathi with natural voice narration, vocabulary builders, and comprehension checks.',
    illustration: 'stories' as const,
    cardGradient: 'from-[#ecfccb] via-[#d9f99d] to-[#bef264]',
    borderClass: 'border-[#65a30d]/40',
    badgeText: 'EN · HI · MR Audio',
    targetTab: 'stories',
    ctaLabel: 'Open Story World',
  },
  {
    id: 'sp-shivaji',
    title: '3. Shivaji Maharaj Stories',
    subtitle: '50 Chronological Swarajya History Chapters',
    description:
      'Discover the inspiring life of Chhatrapati Shivaji Maharaj from Shivneri Fort to Raigad Coronation across 50 illustrated chapters with voice narration.',
    illustration: 'shivaji' as const,
    cardGradient: 'from-[#fef3c7] via-[#fde68a] to-[#fcd34d]',
    borderClass: 'border-[#d97706]/40',
    badgeText: '50 Chapters',
    targetTab: 'shivaji',
    ctaLabel: 'Open Shivaji Stories',
  },
  {
    id: 'sp-moral',
    title: '4. Moral Stories',
    subtitle: 'Value Education & Character Building Tales',
    description:
      'Read inspiring Panchatantra fables, honesty and courage tales, and life-lesson stories with moral takeaways and interactive reflection questions.',
    illustration: 'moral' as const,
    cardGradient: 'from-[#ffedd5] via-[#fed7aa] to-[#fdba74]',
    borderClass: 'border-[#ea580c]/40',
    badgeText: 'Moral Values',
    targetTab: 'stories',
    ctaLabel: 'Read Moral Stories',
  },
  {
    id: 'sp-scholarship',
    title: '5. Scholarship Corner',
    subtitle: 'MSCE Std 4th (PSE) & Std 7th (UPS) Prep',
    description:
      'Practice 600+ scholarship questions across Paper I (Language & Mathematics) and Paper II (Third Language & Intelligence Test) with 90-minute mock sets.',
    illustration: 'scholarship' as const,
    cardGradient: 'from-[#dcfce7] via-[#bbf7d0] to-[#86efac]',
    borderClass: 'border-[#16a34a]/40',
    badgeText: 'Std 4th & 7th',
    targetTab: 'scholarship',
    ctaLabel: 'Open Scholarship Corner',
  },
  {
    id: 'sp-cricket-gk',
    title: '6. Cricket & GK',
    subtitle: 'Daily Cricket Current Affairs & General Knowledge',
    description:
      'Master daily cricket news, World Cup history, IPL records, Indian monuments, science facts, and current affairs across 4 progressive difficulty levels.',
    illustration: 'cricket' as const,
    cardGradient: 'from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]',
    borderClass: 'border-[#0284c7]/40',
    badgeText: '4 Levels · Daily GK',
    targetTab: 'cricket',
    ctaLabel: 'Open Cricket & GK',
  },
  {
    id: 'sp-ai-academy',
    title: '7. AI Learning Academy',
    subtitle: '8 Modules & 24 Interactive Future-Tech Lessons',
    description:
      'Learn Artificial Intelligence, Machine Learning, Neural Networks, Computer Vision, Robotics, Python basics, and Responsible AI Ethics step by step.',
    illustration: 'ai' as const,
    cardGradient: 'from-[#fae8ff] via-[#f5d0fe] to-[#e879f9]',
    borderClass: 'border-[#a21caf]/40',
    badgeText: '8 AI Modules',
    targetTab: 'future-skills',
    ctaLabel: 'Open AI Academy',
  },
  {
    id: 'sp-creative',
    title: '8. Creative Activities',
    subtitle: 'Creative Thinking, Riddles & Enrichment Workshops',
    description:
      'Engage in creative expression, lateral thinking riddles, pattern recognition challenges, and imaginative problem-solving activities.',
    illustration: 'writing' as const,
    cardGradient: 'from-[#ffe4e6] via-[#fecdd3] to-[#fda4af]',
    borderClass: 'border-[#e11d48]/40',
    badgeText: 'Creative Studio',
    targetTab: 'puzzles',
    ctaLabel: 'Start Creative Activities',
  },
];

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
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-amber-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-extrabold text-white cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home Dashboard</span>
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-extrabold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Section 3 · Special Learning &amp; Enrichment Programmes</span>
          </span>
        </div>

        <div className="space-y-2 max-w-3xl">
          <h1 className="text-2xl sm:text-4xl font-display font-extrabold tracking-tight">
            Special Learning Studios (8 Dedicated Programmes)
          </h1>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            Explore all extracurricular, creative, historical, scholarship, and future-technology programmes in one organised place. Each programme opens its own dedicated interactive studio page.
          </p>
        </div>
      </div>

      {/* 3-Question Orientation Guide */}
      <SectionOrientationGuide
        sectionNumber="Section 3 · Special Learning"
        sectionTitle="Enrichment & Extracurricular Programmes"
        whatIsThis="Your dedicated hub for creative arts, audio stories, Maratha history, scholarship prep, general knowledge, and AI education."
        whatCanILearn="Drawing Studio, Story World, Shivaji Maharaj Stories, Moral Stories, Scholarship Corner, Cricket & GK, AI Academy, and Creative Activities."
        whatShouldIClick="Click any of the 8 colourful programme cards below to launch its dedicated interactive studio page."
        accentTheme="amber"
      />

      {/* 8 Core Special Learning Programmes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {CORE_SPECIAL_PROGRAMMES.map((item) => (
          <div
            key={item.id}
            onClick={() => onNavigateStudio(item.targetTab)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onNavigateStudio(item.targetTab);
              }
            }}
            className={`group rounded-3xl bg-gradient-to-b ${item.cardGradient} border-2 ${item.borderClass} p-5 shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex flex-col justify-between space-y-4`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="w-18 h-18 rounded-2xl bg-white/75 p-2 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <SpecialCardIllustration type={item.illustration} className="w-full h-full" />
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white/90 text-[#0f2952] text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  {item.badgeText}
                </span>
              </div>

              <div>
                <h2 className="font-display font-black text-base sm:text-lg text-[#0f2952] leading-snug">
                  {item.title}
                </h2>
                <p className="text-xs font-extrabold text-[#0f2952]/80 mt-0.5">{item.subtitle}</p>
              </div>

              <p className="text-xs font-semibold text-[#0f2952]/85 leading-relaxed">
                {item.description}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onNavigateStudio(item.targetTab);
              }}
              className="w-full py-2.5 px-4 rounded-2xl bg-[#0f2952] hover:bg-[#1e3a8a] text-white font-display font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer transition-colors"
            >
              <span>{item.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Additional Custom Learning Tracks (If Published in Admin) */}
      {publishedPrograms.length > 0 && (
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-display font-extrabold text-slate-900">
                Additional Featured Tracks
              </h2>
              <p className="text-xs text-slate-600">
                Filter specialised enrichment tracks by category below.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-amber-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visiblePrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-xl shrink-0">
                        {prog.iconEmoji || '🎓'}
                      </div>
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-800 block">
                          {prog.category}
                        </span>
                        <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                          {prog.title}
                        </h3>
                      </div>
                    </div>
                    {prog.badgeText && (
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-800 text-[10px] font-extrabold shrink-0">
                        {prog.badgeText}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{prog.description}</p>

                  {prog.highlights && prog.highlights.length > 0 && (
                    <ul className="space-y-1 pt-2 border-t border-slate-100">
                      {prog.highlights.slice(0, 3).map((h) => (
                        <li
                          key={h}
                          className="text-[11px] text-slate-700 font-medium flex items-center gap-1.5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onNavigateStudio(prog.targetTab || 'scholarship')}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>Open {prog.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
