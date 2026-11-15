import React from 'react';
import { HelpCircle, BookOpen, MousePointerClick } from 'lucide-react';

interface SectionOrientationGuideProps {
  sectionNumber?: string;
  sectionTitle: string;
  whatIsThis: string;
  whatCanILearn: string;
  whatShouldIClick: string;
  accentTheme?: 'blue' | 'amber' | 'emerald' | 'purple' | 'rose' | 'indigo';
}

const THEME_STYLES: Record<
  NonNullable<SectionOrientationGuideProps['accentTheme']>,
  {
    wrapper: string;
    badge: string;
    cardBorder: string;
    iconBg1: string;
    iconBg2: string;
    iconBg3: string;
  }
> = {
  blue: {
    wrapper: 'bg-gradient-to-r from-sky-50 via-white to-blue-50 border-sky-200',
    badge: 'bg-blue-700 text-white',
    cardBorder: 'border-sky-200/90',
    iconBg1: 'bg-blue-100 text-blue-700',
    iconBg2: 'bg-emerald-100 text-emerald-700',
    iconBg3: 'bg-amber-100 text-amber-800',
  },
  amber: {
    wrapper: 'bg-gradient-to-r from-amber-50 via-white to-orange-50 border-amber-200',
    badge: 'bg-amber-600 text-white',
    cardBorder: 'border-amber-200/90',
    iconBg1: 'bg-amber-100 text-amber-800',
    iconBg2: 'bg-blue-100 text-blue-700',
    iconBg3: 'bg-emerald-100 text-emerald-700',
  },
  emerald: {
    wrapper: 'bg-gradient-to-r from-emerald-50 via-white to-teal-50 border-emerald-200',
    badge: 'bg-emerald-700 text-white',
    cardBorder: 'border-emerald-200/90',
    iconBg1: 'bg-emerald-100 text-emerald-800',
    iconBg2: 'bg-sky-100 text-sky-700',
    iconBg3: 'bg-amber-100 text-amber-800',
  },
  purple: {
    wrapper: 'bg-gradient-to-r from-purple-50 via-white to-fuchsia-50 border-purple-200',
    badge: 'bg-purple-700 text-white',
    cardBorder: 'border-purple-200/90',
    iconBg1: 'bg-purple-100 text-purple-800',
    iconBg2: 'bg-indigo-100 text-indigo-700',
    iconBg3: 'bg-amber-100 text-amber-800',
  },
  rose: {
    wrapper: 'bg-gradient-to-r from-rose-50 via-white to-orange-50 border-rose-200',
    badge: 'bg-rose-600 text-white',
    cardBorder: 'border-rose-200/90',
    iconBg1: 'bg-rose-100 text-rose-800',
    iconBg2: 'bg-amber-100 text-amber-800',
    iconBg3: 'bg-emerald-100 text-emerald-700',
  },
  indigo: {
    wrapper: 'bg-gradient-to-r from-indigo-50 via-white to-blue-50 border-indigo-200',
    badge: 'bg-indigo-700 text-white',
    cardBorder: 'border-indigo-200/90',
    iconBg1: 'bg-indigo-100 text-indigo-800',
    iconBg2: 'bg-emerald-100 text-emerald-700',
    iconBg3: 'bg-amber-100 text-amber-800',
  },
};

export const SectionOrientationGuide: React.FC<SectionOrientationGuideProps> = ({
  sectionNumber,
  sectionTitle,
  whatIsThis,
  whatCanILearn,
  whatShouldIClick,
  accentTheme = 'blue',
}) => {
  const style = THEME_STYLES[accentTheme];

  return (
    <section
      aria-label={`${sectionTitle} Student Guide`}
      className={`rounded-3xl p-4 sm:p-5 border-2 shadow-xs ${style.wrapper}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          {sectionNumber && (
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider ${style.badge}`}>
              {sectionNumber}
            </span>
          )}
          <h2 className="text-sm sm:text-base font-display font-black text-slate-900">
            Student Guide: {sectionTitle}
          </h2>
        </div>
        <span className="text-[11px] font-bold text-slate-500">
          Clear 3-Step Navigation Guide
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. WHAT IS THIS? */}
        <div className={`bg-white rounded-2xl p-3.5 border ${style.cardBorder} flex items-start gap-3 shadow-2xs`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg1}`}>
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              1. WHAT IS THIS?
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
              {whatIsThis}
            </p>
          </div>
        </div>

        {/* 2. WHAT CAN I LEARN HERE? */}
        <div className={`bg-white rounded-2xl p-3.5 border ${style.cardBorder} flex items-start gap-3 shadow-2xs`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg2}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              2. WHAT CAN I LEARN HERE?
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
              {whatCanILearn}
            </p>
          </div>
        </div>

        {/* 3. WHAT SHOULD I CLICK NEXT? */}
        <div className={`bg-white rounded-2xl p-3.5 border ${style.cardBorder} flex items-start gap-3 shadow-2xs`}>
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${style.iconBg3}`}>
            <MousePointerClick className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
              3. WHAT SHOULD I CLICK NEXT?
            </span>
            <p className="text-xs font-bold text-slate-800 mt-0.5 leading-snug">
              {whatShouldIClick}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
