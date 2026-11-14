import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface AdminSettingsSectionProps {
  initialTimers: {
    classes2to3: number;
    classes4to5: number;
    classes6to8: number;
  };
  onSaveTimers: (c23: number, c45: number, c68: number) => void;
}

export const AdminSettingsSection: React.FC<AdminSettingsSectionProps> = React.memo(
  ({ initialTimers, onSaveTimers }) => {
    const [c23Timer, setC23Timer] = useState<number>(initialTimers.classes2to3);
    const [c45Timer, setC45Timer] = useState<number>(initialTimers.classes4to5);
    const [c68Timer, setC68Timer] = useState<number>(initialTimers.classes6to8);
    const [timerSaved, setTimerSaved] = useState<boolean>(false);

    const handleSaveTimers = () => {
      onSaveTimers(c23Timer, c45Timer, c68Timer);
      setTimerSaved(true);
      setTimeout(() => setTimerSaved(false), 3000);
    };

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-display font-bold text-slate-900">
            Quiz Timers &amp; Platform Configurations
          </h2>
          <p className="text-xs text-slate-500">
            Adjust class-wise countdown timers and point allocation rules.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <label className="block text-xs font-bold text-amber-950">
              Classes 2–3 Timer (seconds)
            </label>
            <input
              type="number"
              min="10"
              max="60"
              value={c23Timer}
              onChange={(e) => setC23Timer(parseInt(e.target.value, 10) || 30)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
            />
            <span className="text-[11px] text-slate-500 block">Suggested: 30 seconds</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <label className="block text-xs font-bold text-amber-950">
              Classes 4–5 Timer (seconds)
            </label>
            <input
              type="number"
              min="10"
              max="60"
              value={c45Timer}
              onChange={(e) => setC45Timer(parseInt(e.target.value, 10) || 25)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
            />
            <span className="text-[11px] text-slate-500 block">Suggested: 25 seconds</span>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
            <label className="block text-xs font-bold text-amber-950">
              Classes 6–8 Timer (seconds)
            </label>
            <input
              type="number"
              min="10"
              max="60"
              value={c68Timer}
              onChange={(e) => setC68Timer(parseInt(e.target.value, 10) || 20)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 font-bold text-sm bg-white"
            />
            <span className="text-[11px] text-slate-500 block">Suggested: 20 seconds</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSaveTimers}
            className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
          >
            Save Timer Changes
          </button>
          {timerSaved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" /> Timers updated across platform!
            </span>
          )}
        </div>
      </div>
    );
  }
);
AdminSettingsSection.displayName = 'AdminSettingsSection';
