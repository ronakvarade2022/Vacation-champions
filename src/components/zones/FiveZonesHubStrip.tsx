import React from 'react';
import { Building2, GraduationCap, HeartHandshake, Sparkles, Users, Wrench } from 'lucide-react';

export interface FiveZonesHubStripProps {
  onNavigateZone: (tab: string) => void;
  onOpenTeacherPortal?: () => void;
}

export const FiveZonesHubStrip: React.FC<FiveZonesHubStripProps> = ({
  onNavigateZone,
  onOpenTeacherPortal,
}) => {
  const zones = [
    {
      id: 'student-zone',
      title: '1. Student Zone',
      badge: 'Classes 1–10 · Free Library',
      desc: 'MH, CBSE & ICSE verified chapter notes, textbook solutions & quizzes.',
      icon: GraduationCap,
      accent: 'border-indigo-200 bg-indigo-50/70 hover:border-indigo-400',
      iconBg: 'bg-indigo-600 text-white',
      onClick: () => onNavigateZone('study-materials'),
    },
    {
      id: 'teacher-zone',
      title: '2. Teacher Zone',
      badge: '130 Tools + Planner',
      desc: 'Complete 130 Teacher Tools, pedagogy guides, lesson planner & roster.',
      icon: Wrench,
      accent: 'border-teal-200 bg-teal-50/70 hover:border-teal-400',
      iconBg: 'bg-teal-600 text-white',
      onClick: () => (onOpenTeacherPortal ? onOpenTeacherPortal() : onNavigateZone('teacher-dashboard')),
    },
    {
      id: 'parent-zone',
      title: '3. Parent Zone',
      badge: 'Progress & Guides',
      desc: 'Secure child linking, attendance, homework status & parenting resources.',
      icon: HeartHandshake,
      accent: 'border-rose-200 bg-rose-50/70 hover:border-rose-400',
      iconBg: 'bg-rose-600 text-white',
      onClick: () => onNavigateZone('parent-zone'),
    },
    {
      id: 'school-college-zone',
      title: '4. School & College Zone',
      badge: 'Multi-Tenant ERP',
      desc: 'Campus rosters, timetables, marks, report cards & practical manuals.',
      icon: Building2,
      accent: 'border-sky-200 bg-sky-50/70 hover:border-sky-400',
      iconBg: 'bg-sky-700 text-white',
      onClick: () => onNavigateZone('school-college-zone'),
    },
    {
      id: 'coaching-zone',
      title: '5. Coaching & Skill Institute',
      badge: '18 Skill Programs',
      desc: 'Abacus, Vedic Maths, Phonics, Chess, Rubik\'s Cube & Academy Portal.',
      icon: Sparkles,
      accent: 'border-amber-300 bg-amber-50/80 hover:border-amber-500',
      iconBg: 'bg-amber-500 text-slate-950',
      onClick: () => onNavigateZone('coaching-zone'),
    },
  ];

  return (
    <section
      aria-label="Five Major Learning Portals"
      className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-600" />
          <h2 className="text-sm sm:text-base font-display font-black text-slate-900">
            Explore All 5 MyStudyZone Educational Portals
          </h2>
        </div>
        <span className="text-[11px] font-bold text-slate-500">
          Direct Portal Access for Students, Teachers, Parents, Schools &amp; Coaching Academies
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {zones.map((z) => {
          const Icon = z.icon;
          return (
            <button
              key={z.id}
              type="button"
              onClick={z.onClick}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2 ${z.accent}`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${z.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-black text-slate-700 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200">
                    {z.badge}
                  </span>
                </div>
                <div className="text-xs font-black text-slate-900">{z.title}</div>
                <p className="text-[11px] text-slate-600 leading-snug">{z.desc}</p>
              </div>
              <span className="text-[11px] font-extrabold text-indigo-900 pt-1">
                Open Zone →
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
