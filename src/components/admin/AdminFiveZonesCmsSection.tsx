import React, { useEffect, useState } from 'react';
import { ALL_18_SKILL_PROGRAMS } from '../../data/skillPrograms/skillProgramsCatalog';
import { CheckCircle2, Globe, Layers, Lock, Settings, ShieldCheck, Unlock } from 'lucide-react';

interface FiveZonesCmsConfig {
  zonesEnabled: {
    studentZone: boolean;
    teacherZone: boolean;
    parentZone: boolean;
    schoolCollegeZone: boolean;
    coachingSkillZone: boolean;
  };
  pricingTierLabels: {
    independentSkillTrack: 'Free Preview + Certificate' | 'Included in Premium ₹99' | 'Paid Track';
    coachingInstitutePortal: 'Included Standard' | 'Enterprise SaaS Tier';
    schoolCollegePortal: 'Free Trial + Institutional' | 'Managed Institution Tier';
  };
  programPublishedMap: Record<string, boolean>;
}

const CMS_STORAGE_KEY = 'msz_five_zones_cms_config_v1';

const DEFAULT_CONFIG: FiveZonesCmsConfig = {
  zonesEnabled: {
    studentZone: true,
    teacherZone: true,
    parentZone: true,
    schoolCollegeZone: true,
    coachingSkillZone: true,
  },
  pricingTierLabels: {
    independentSkillTrack: 'Free Preview + Certificate',
    coachingInstitutePortal: 'Included Standard',
    schoolCollegePortal: 'Free Trial + Institutional',
  },
  programPublishedMap: Object.fromEntries(ALL_18_SKILL_PROGRAMS.map((p) => [p.id, true])),
};

export const AdminFiveZonesCmsSection: React.FC = () => {
  const [config, setConfig] = useState<FiveZonesCmsConfig>(() => {
    try {
      const raw = localStorage.getItem(CMS_STORAGE_KEY);
      return raw ? { ...DEFAULT_CONFIG, ...(JSON.parse(raw) as FiveZonesCmsConfig) } : DEFAULT_CONFIG;
    } catch {
      return DEFAULT_CONFIG;
    }
  });
  const [savedNotice, setSavedNotice] = useState<string | null>(null);

  const instituteCount = (() => {
    try {
      return JSON.parse(localStorage.getItem('msz_coaching_institutes_v1') || '[]').length;
    } catch {
      return 0;
    }
  })();

  const schoolCount = (() => {
    try {
      return JSON.parse(localStorage.getItem('msz_institutions_v1') || '[]').length;
    } catch {
      return 0;
    }
  })();

  const enrollmentCount = (() => {
    try {
      return JSON.parse(localStorage.getItem('msz_skill_enrollments_v1') || '[]').length;
    } catch {
      return 0;
    }
  })();

  useEffect(() => {
    try {
      localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(config));
    } catch {}
  }, [config]);

  const saveNoticeBanner = (msg: string) => {
    setSavedNotice(msg);
    setTimeout(() => setSavedNotice(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-display font-black text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              <span>Central 5-Zone CMS, Institutions &amp; Access Controls</span>
            </h2>
            <p className="text-xs text-slate-600">
              Publish/hide the 5 Learning Portals, toggle any of the 18 Skill Development programs, and audit multi-tenant Schools &amp; Coaching Institutes.
            </p>
          </div>
          {savedNotice && (
            <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 text-xs font-black flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>{savedNotice}</span>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
            <span className="font-bold text-indigo-800 uppercase text-[10px]">Independent Skill Enrolments</span>
            <div className="text-2xl font-black text-slate-900">{enrollmentCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-emerald-800 uppercase text-[10px]">Registered Coaching Academies</span>
            <div className="text-2xl font-black text-slate-900">{instituteCount}</div>
          </div>
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="font-bold text-sky-800 uppercase text-[10px]">Registered Schools &amp; Colleges</span>
            <div className="text-2xl font-black text-slate-900">{schoolCount}</div>
          </div>
        </div>
      </div>

      {/* Zone Visibility Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Five-Zone Portal Publishing Toggles</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 text-xs">
          {(
            [
              ['studentZone', '1. Student Zone'],
              ['teacherZone', '2. Teacher Zone (130 Tools)'],
              ['parentZone', '3. Parent Zone'],
              ['schoolCollegeZone', '4. School & College Zone'],
              ['coachingSkillZone', '5. Coaching & Skill Institute'],
            ] as const
          ).map(([key, label]) => {
            const enabled = config.zonesEnabled[key];
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  setConfig((prev) => ({
                    ...prev,
                    zonesEnabled: { ...prev.zonesEnabled, [key]: !enabled },
                  }));
                  saveNoticeBanner(`Updated "${label}" status.`);
                }}
                className={`p-3 rounded-2xl border text-left cursor-pointer transition-colors space-y-1 ${
                  enabled
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                    : 'bg-slate-100 border-slate-300 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-black">{label}</span>
                  {enabled ? <Unlock className="w-3.5 h-3.5 text-emerald-700" /> : <Lock className="w-3.5 h-3.5" />}
                </div>
                <div className="text-[10px] font-bold">{enabled ? 'Published Live' : 'Hidden'}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing & Access Configuration (Non-Breaking Additive Config) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3 text-xs">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-4 h-4 text-amber-600" />
          <span>Zone Access &amp; Commercial Tier Governance (Existing Razorpay ₹99 Plans Preserved)</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1">18 Skill Programs Student Access</label>
            <select
              value={config.pricingTierLabels.independentSkillTrack}
              onChange={(e) => {
                setConfig((prev) => ({
                  ...prev,
                  pricingTierLabels: {
                    ...prev.pricingTierLabels,
                    independentSkillTrack: e.target.value as FiveZonesCmsConfig['pricingTierLabels']['independentSkillTrack'],
                  },
                }));
                saveNoticeBanner('Saved Skill Track access policy.');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
            >
              <option value="Free Preview + Certificate">Free Preview + Certificate</option>
              <option value="Included in Premium ₹99">Included in Premium ₹99</option>
              <option value="Paid Track">Paid Track</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">Coaching Institute Tier</label>
            <select
              value={config.pricingTierLabels.coachingInstitutePortal}
              onChange={(e) => {
                setConfig((prev) => ({
                  ...prev,
                  pricingTierLabels: {
                    ...prev.pricingTierLabels,
                    coachingInstitutePortal: e.target.value as FiveZonesCmsConfig['pricingTierLabels']['coachingInstitutePortal'],
                  },
                }));
                saveNoticeBanner('Saved Institute tier policy.');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
            >
              <option value="Included Standard">Included Standard</option>
              <option value="Enterprise SaaS Tier">Enterprise SaaS Tier</option>
            </select>
          </div>
          <div>
            <label className="block font-bold text-slate-700 mb-1">School &amp; College Tier</label>
            <select
              value={config.pricingTierLabels.schoolCollegePortal}
              onChange={(e) => {
                setConfig((prev) => ({
                  ...prev,
                  pricingTierLabels: {
                    ...prev.pricingTierLabels,
                    schoolCollegePortal: e.target.value as FiveZonesCmsConfig['pricingTierLabels']['schoolCollegePortal'],
                  },
                }));
                saveNoticeBanner('Saved School/College tier policy.');
              }}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold"
            >
              <option value="Free Trial + Institutional">Free Trial + Institutional</option>
              <option value="Managed Institution Tier">Managed Institution Tier</option>
            </select>
          </div>
        </div>
      </div>

      {/* 18 Skill Programs Publish Control */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <span>18 Skill &amp; Coaching Programs Publication Manager</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
          {ALL_18_SKILL_PROGRAMS.map((prog) => {
            const isPub = config.programPublishedMap[prog.id] !== false;
            return (
              <div
                key={prog.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-2"
              >
                <div className="min-w-0">
                  <div className="font-black text-slate-900 truncate">
                    {prog.number}. {prog.title}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{prog.category}</div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setConfig((prev) => ({
                      ...prev,
                      programPublishedMap: { ...prev.programPublishedMap, [prog.id]: !isPub },
                    }));
                    saveNoticeBanner(`Updated "${prog.title}".`);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-black cursor-pointer shrink-0 ${
                    isPub ? 'bg-emerald-600 text-white' : 'bg-slate-300 text-slate-800'
                  }`}
                >
                  {isPub ? 'Published' : 'Draft'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
