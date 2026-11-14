import React, { useState } from 'react';
import type { QuizLevel } from '../../types';
import { DAILY_CRICKET_QUESTIONS_BANK } from '../../data/cricketQuizData';

export const AdminCricketSection: React.FC = React.memo(() => {
  const [activeLevel, setActiveLevel] = useState<QuizLevel>(1);

  const lvlTitle =
    activeLevel === 1
      ? 'Beginner'
      : activeLevel === 2
        ? 'Intermediate'
        : activeLevel === 3
          ? 'Advanced'
          : 'Champion';
  const qList = DAILY_CRICKET_QUESTIONS_BANK[activeLevel] || [];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏏</span>
            <h2 className="text-xl font-display font-extrabold text-slate-900">
              Daily Cricket Champions Question Bank (40 Questions)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Verified daily cricket current affairs, IPL 2024, World Cup records, terminology, and women's cricket.
          </p>
        </div>
        <div className="bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-xl text-xs font-bold self-start sm:self-auto">
          Status: Verified Live Daily Bank
        </div>
      </div>

      {/* Level Switcher so only 10 questions render at a time */}
      <div className="flex flex-wrap gap-2">
        {([1, 2, 3, 4] as QuizLevel[]).map((lvl) => {
          const title =
            lvl === 1 ? 'Beginner' : lvl === 2 ? 'Intermediate' : lvl === 3 ? 'Advanced' : 'Champion';
          return (
            <button
              type="button"
              key={lvl}
              onClick={() => setActiveLevel(lvl)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                activeLevel === lvl
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                  : 'bg-emerald-50/50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
              }`}
            >
              Level {lvl} – {title} (10 Qs)
            </button>
          );
        })}
      </div>

      <div className="p-5 rounded-2xl bg-emerald-50/40 border border-emerald-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm text-emerald-950 flex items-center gap-2">
            <span>
              Level {activeLevel} – {lvlTitle}
            </span>
            <span className="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">
              {qList.length} Questions
            </span>
          </h3>
          <span className="text-xs text-slate-500">Anti-Pattern Randomizer Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {qList.map((q, qIdx) => (
            <div
              key={q.id}
              className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1.5 shadow-2xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">
                  Q{qIdx + 1}. {q.question}
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded shrink-0 ml-2">
                  {q.category}
                </span>
              </div>
              <div className="text-[11px] text-slate-600">
                <strong>Answer: </strong>
                <span className="text-emerald-800 font-bold">{q.options[q.correctIndex]}</span>
              </div>
              <p className="text-[10px] text-slate-500 italic">{q.explanation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});
AdminCricketSection.displayName = 'AdminCricketSection';
