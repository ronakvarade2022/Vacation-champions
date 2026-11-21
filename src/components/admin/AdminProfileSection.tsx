import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface AdminProfileSectionProps {
  studentsCount: number;
  questionsCount: number;
}

export const AdminProfileSection: React.FC<AdminProfileSectionProps> = React.memo(
  ({ studentsCount, questionsCount }) => {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-purple-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-purple-600/30 border border-purple-400/40 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
                🛡️
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-display font-extrabold tracking-tight">
                    Supervisor Profile &amp; Control
                  </h2>
                  <span className="px-3 py-0.5 rounded-full bg-purple-500/30 text-purple-200 border border-purple-400/30 text-xs font-bold">
                    Master Role
                  </span>
                </div>
                <p className="text-slate-300 text-xs sm:text-sm font-medium mt-1">
                  Primary System Administrator: <strong className="text-purple-300">Master Admin Portal</strong>
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Firebase Session</span>
            </span>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Administrative Access &amp; System Governance</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Identity and RBAC permission audit for this session.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-500 uppercase text-[10px]">Supervisor Role</p>
              <p className="font-bold text-sm text-slate-800">Platform SuperAdmin</p>
              <p className="text-[11px] text-emerald-700 font-medium">
                ✓ Firebase Whitelisted SuperAdmin
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-500 uppercase text-[10px]">Security Guard</p>
              <p className="font-bold text-sm text-slate-800">Firebase Role ABAC</p>
              <p className="text-[11px] text-slate-500 font-medium">
                Enforced at Firestore Security Rules
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-500 uppercase text-[10px]">Database Project</p>
              <p
                className="font-mono font-bold text-xs text-slate-800 truncate"
                title="ai-studio-vacationchampion-cedf2d74-0d25-42f6-8aaa-1a9e2fb4514d"
              >
                ai-studio-vacationchampion
              </p>
              <p className="text-[11px] text-slate-500 font-medium">Region: asia-south1 (Mumbai)</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-500 uppercase text-[10px]">
                Enrolled Students Managed
              </p>
              <p className="font-bold text-sm text-slate-800">{studentsCount} Active Records</p>
              <p className="text-[11px] text-slate-500 font-medium">Class 1 to Class 10 Accounts</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-500 uppercase text-[10px]">Curriculum Bank</p>
              <p className="font-bold text-sm text-slate-800">
                {questionsCount.toLocaleString('en-IN')} Vetted Questions
              </p>
              <p className="text-[11px] text-slate-500 font-medium">
                Maharashtra • CBSE • ICSE • 4 Levels
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
              <p className="font-bold text-slate-500 uppercase text-[10px]">MSCE Scholarship</p>
              <p className="font-bold text-sm text-slate-800">20 Practice Tests (600 Qs)</p>
              <p className="text-[11px] text-slate-500 font-medium">
                Std 4th &amp; Std 7th in 7 Languages
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
AdminProfileSection.displayName = 'AdminProfileSection';
