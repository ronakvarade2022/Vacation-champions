import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ClassLevel } from '../types';
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  ShieldCheck, 
  Users, 
  Award, 
  Trophy, 
  Flame, 
  Coins, 
  Calendar, 
  School, 
  CheckCircle, 
  CheckCircle2,
  BookOpen,
  FileText,
  Sparkles, 
  LogOut,
  ArrowRight,
  Crown,
  RefreshCw,
  LifeBuoy,
  HelpCircle,
  Scale,
  AlertTriangle,
  Info,
  Bot,
  Copy,
  Share2,
  Gift,
  Link as LinkIcon
} from 'lucide-react';
import {
  getStudentPlanInfo,
  getClassSubscriptionInfo,
  getActivatedClassesList,
  getPrimaryBaseClass,
} from '../utils/subscriptionAccess';
import {
  generateUniqueStudentReferralCode,
  buildStudentReferralLink,
  buildStudentReferralDisplayLink
} from '../utils/referralCoding';
import { ALL_10_CLASSES, ALL_10_CLASSES_META, getSubjectsForClass } from '../data/classCurriculumConfig';

interface StudentProfileViewProps {
  onOpenMembership: (plan?: 'basic' | 'premium', targetClass?: ClassLevel) => void;
  onNavigateTab: (tab: string) => void;
}

export const StudentProfileView: React.FC<StudentProfileViewProps> = ({
  onOpenMembership,
  onNavigateTab
}) => {
  const { 
    currentUser,
    currentStudent, 
    studentsList, 
    quickSwitchStudent, 
    openAuthModal, 
    logout,
    allAttempts,
    savedDrawings,
    switchActiveClass
  } = useApp();
  const [copiedRefLink, setCopiedRefLink] = useState(false);
  const [copiedRefCode, setCopiedRefCode] = useState(false);
  const [promotionBannerMsg, setPromotionBannerMsg] = useState<string | null>(null);

  if (!currentStudent) return null;

  const studentReferralCode = currentStudent.referralCode || generateUniqueStudentReferralCode(currentStudent.id, currentStudent.name);
  const studentReferralLink = currentStudent.referralLink || buildStudentReferralLink(studentReferralCode);
  const studentReferralDisplayLink = buildStudentReferralDisplayLink(studentReferralCode);

  const handleCopyProfileRefLink = async () => {
    try {
      await navigator.clipboard.writeText(studentReferralLink);
      setCopiedRefLink(true);
      setTimeout(() => setCopiedRefLink(false), 2500);
    } catch {
      // Fallback copy
    }
  };

  const handleCopyProfileRefCode = async () => {
    try {
      await navigator.clipboard.writeText(studentReferralCode);
      setCopiedRefCode(true);
      setTimeout(() => setCopiedRefCode(false), 2500);
    } catch {
      // Fallback copy
    }
  };

  const handleShareProfileRefLink = async () => {
    const shareText = `Join MyStudyZone (${currentStudent.classLevel}) with my unique referral code ${studentReferralCode}! Register here: ${studentReferralLink}`;
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'MyStudyZone Student Referral',
          text: shareText,
          url: studentReferralLink
        });
        return;
      } catch {
        // Fallback to clipboard + WhatsApp
      }
    }
    await handleCopyProfileRefLink();
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const studentAttempts = allAttempts.filter(a => a.studentId === currentStudent.id);
  const drawingsCount = savedDrawings.filter(d => d.studentId === currentStudent.id).length;
  const storiesCount = currentStudent.completedStoryIds?.length || 0;
  const planInfo = getStudentPlanInfo(currentStudent);

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in duration-200">
      {/* 1. Clear Profile Title Header with Icon & Direct Sign Out Button */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-display font-black text-slate-900 tracking-tight">
                Student Profile
              </h1>
              <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                (विद्यार्थी प्रोफाइल)
              </span>
              <span className="text-[11px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                MyStudyZone – An Interactive Learning Platform for Students
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Learn, Practice, Explore and Achieve Excellence. • Account UID: <span className="font-mono font-bold text-slate-700">{currentStudent.id}</span> • Active Class: <strong className="text-slate-800">{currentStudent.classLevel}</strong> • Base Free Class: <strong className="text-indigo-700">{getPrimaryBaseClass(currentStudent)}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Profile Page Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-orange-500/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-inner border border-white/25 shrink-0">
              {currentStudent.avatar || '🦁'}
            </div>
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight">
                  {currentStudent.name}
                </h2>
                <span className="px-3 py-0.5 rounded-full bg-white/20 text-white font-extrabold text-xs border border-white/25">
                  Active: {currentStudent.classLevel}
                </span>
                {getActivatedClassesList(currentStudent).length > 0 && (
                  <span className="px-3 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-xs">
                    {getActivatedClassesList(currentStudent).length} Paid Class{getActivatedClassesList(currentStudent).length === 1 ? '' : 'es'}
                  </span>
                )}
                <span className="px-3 py-0.5 rounded-full bg-slate-950/75 text-amber-300 font-extrabold text-xs border border-amber-300/40 flex items-center gap-1">
                  <Crown className="w-3.5 h-3.5 text-amber-300" />
                  <span>{planInfo.planDisplayName}</span>
                </span>
              </div>
              <p className="text-amber-100 text-xs sm:text-sm font-medium">
                {currentStudent.accountRole === 'teacher' ? 'Registered Teacher Account' : 'Registered Student Account'} • UID: <span className="font-mono">{currentStudent.id}</span> • Validity: <strong>{planInfo.daysRemainingDisplay}</strong>
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-2xs ${
                  currentStudent.isPhoneVerified
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-black/25 text-amber-100 border border-white/25'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>{currentStudent.isPhoneVerified ? 'Phone OTP Verified' : 'Phone Registered'}</span>
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-2xs ${
                  currentStudent.isEmailVerified
                    ? 'bg-emerald-500/90 text-white'
                    : 'bg-black/25 text-amber-100 border border-white/25'
                }`}>
                  <CheckCircle className="w-3 h-3" />
                  <span>{currentStudent.isEmailVerified ? 'Email Link Verified' : 'Email Registered'}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-black/20 text-amber-200 text-[11px] font-bold">
                  🔥 {currentStudent.streakDays} Day Streak
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 self-start sm:self-center shrink-0">
            <button
              onClick={() => onOpenMembership('premium', currentStudent.classLevel)}
              className="px-4 py-2.5 rounded-2xl bg-white text-amber-900 font-extrabold text-xs shadow-md hover:bg-amber-50 transition-all cursor-pointer"
            >
              {planInfo.isPaidPlanExpired
                ? `Renew ${currentStudent.classLevel} (₹99)`
                : planInfo.effectivePlan === 'premium'
                ? `Extend ${currentStudent.classLevel} (₹99)`
                : `Upgrade ${currentStudent.classLevel} (₹99)`}
            </button>
          </div>
        </div>
      </div>

      {/* CLASS-WISE SUBSCRIPTIONS & ACCESS SECTION (Multi-Class Account Support) */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-indigo-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🎓</span>
              <h2 className="text-base sm:text-lg font-display font-extrabold text-slate-900">
                Class-Wise Subscriptions &amp; Access (Classes 1st to 10th)
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Your {currentStudent.accountRole === 'teacher' ? 'teacher' : 'student'} account supports multiple class subscriptions on the same mobile &amp; email. Switch between unlocked classes or activate an additional class for <strong>₹99 (365 Days)</strong>.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenMembership('premium')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-extrabold self-start sm:self-center shrink-0 cursor-pointer shadow-xs"
          >
            + Activate Another Class (₹99)
          </button>
        </div>

        {promotionBannerMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{promotionBannerMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
          {ALL_10_CLASSES.map((cls) => {
            const meta = ALL_10_CLASSES_META.find((m) => m.classLevel === cls);
            const isCurrent = currentStudent.classLevel === cls;
            const cInfo = getClassSubscriptionInfo(currentStudent, cls);
            return (
              <button
                key={cls}
                type="button"
                onClick={async () => {
                  if (cInfo.isAccessible) {
                    if (!isCurrent) {
                      const res = await switchActiveClass(cls);
                      setPromotionBannerMsg(res.message);
                      setTimeout(() => setPromotionBannerMsg(null), 4500);
                    }
                  } else {
                    onOpenMembership('premium', cls);
                  }
                }}
                className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md scale-[1.02]'
                    : cInfo.isPaidActive
                    ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-400'
                    : cInfo.isFreeBase
                    ? 'bg-indigo-50 hover:bg-indigo-100 text-indigo-950 border-indigo-300'
                    : cInfo.isExpired
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300'
                    : 'bg-slate-50 hover:bg-amber-50 text-slate-600 border-slate-200 hover:border-amber-300'
                }`}
              >
                <div className="text-xs font-black flex items-center justify-center gap-1">
                  {!cInfo.isAccessible && <Lock className="w-2.5 h-2.5 text-amber-600" />}
                  <span>{cls}</span>
                </div>
                <div className={`text-[10px] font-bold ${isCurrent ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {isCurrent
                    ? 'Active Now'
                    : cInfo.isPaidActive
                    ? `Paid (${cInfo.daysRemaining}d)`
                    : cInfo.isFreeBase
                    ? 'Free Base'
                    : cInfo.isExpired
                    ? 'Expired • ₹99'
                    : meta?.marathiLabel}
                </div>
              </button>
            );
          })}
        </div>

        {/* Per-Class Subscription Ledger (Active Paid, Expired & Base Free Classes) */}
        <div className="pt-2 space-y-2">
          <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
            Your Class Subscription Statuses ({getSubjectsForClass(currentStudent.classLevel).length} Subjects in Active {currentStudent.classLevel})
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ALL_10_CLASSES.map((cls) => getClassSubscriptionInfo(currentStudent, cls))
              .filter((cInfo) => cInfo.isPaidActive || cInfo.isExpired || cInfo.isFreeBase)
              .map((cInfo) => (
                <div
                  key={cInfo.classLevel}
                  className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs ${
                    cInfo.isPaidActive
                      ? 'bg-emerald-50/70 border-emerald-300'
                      : cInfo.isExpired
                      ? 'bg-rose-50/70 border-rose-300'
                      : 'bg-indigo-50/60 border-indigo-200'
                  }`}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-black text-slate-900">{cInfo.classLevel}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          cInfo.isPaidActive
                            ? 'bg-emerald-600 text-white'
                            : cInfo.isExpired
                            ? 'bg-rose-600 text-white'
                            : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {cInfo.isPaidActive ? 'Active Paid' : cInfo.isExpired ? 'Expired' : 'Free Base'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium mt-0.5 truncate">
                      {cInfo.isPaidActive
                        ? `Expires: ${cInfo.expiryDisplay} • ${cInfo.daysRemainingDisplay}`
                        : cInfo.isExpired
                        ? `${cInfo.expiryDisplay}`
                        : 'Lifetime Free Demo (2 Worksheets, English & Math)'}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {cInfo.isAccessible && cInfo.classLevel !== currentStudent.classLevel && (
                      <button
                        type="button"
                        onClick={async () => {
                          const res = await switchActiveClass(cInfo.classLevel);
                          setPromotionBannerMsg(res.message);
                          setTimeout(() => setPromotionBannerMsg(null), 4000);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white font-bold text-[11px] cursor-pointer hover:bg-slate-800"
                      >
                        Switch
                      </button>
                    )}
                    {(!cInfo.isPaidActive || cInfo.isExpired) && (
                      <button
                        type="button"
                        onClick={() => onOpenMembership('premium', cInfo.classLevel)}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[11px] cursor-pointer"
                      >
                        {cInfo.isExpired ? 'Renew ₹99' : 'Upgrade ₹99'}
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* PERMANENT STUDENT REFERRAL CODE & LINK SECTION */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-7 text-white border-2 border-emerald-400/40 shadow-lg space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-400 text-slate-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                <Gift className="w-3.5 h-3.5" />
                <span>Unique Student Referral Link</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-emerald-200 font-bold text-[11px] border border-white/15">
                ₹5 Cashback per Verified ₹99 Premium Referral
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-display font-extrabold tracking-tight text-white pt-1">
              {currentStudent.name}&apos;s Permanent Referral Code &amp; Link
            </h2>
            <p className="text-xs text-emerald-100/80 font-medium">
              Saved permanently in Firebase Firestore against UID <span className="font-mono font-bold text-white">{currentStudent.id}</span>. Remains unchanged across every login.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('referrals')}
            className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer shrink-0 shadow-md"
          >
            <span>Open Referral Wallet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Unique Referral Code Box */}
          <div className="md:col-span-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col justify-between gap-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 block">
                Your Unique Referral Code
              </span>
              <p className="text-2xl font-mono font-black tracking-widest text-white mt-1">
                {studentReferralCode}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyProfileRefCode}
              className="w-full py-2 px-3 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              {copiedRefCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRefCode ? 'Code Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          {/* Unique Referral Link Box + Copy Link & Share Link Buttons */}
          <div className="md:col-span-8 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                  <LinkIcon className="w-3 h-3" />
                  <span>Your Unique Registration Referral Link</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-200 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-400/30">
                  Live on mystudyzone.in
                </span>
              </div>
              <p className="font-mono font-bold text-xs sm:text-sm text-amber-300 break-all mt-1.5 select-all">
                {studentReferralDisplayLink}
              </p>
              <p className="text-[11px] text-white/60 font-mono truncate mt-0.5">
                {studentReferralLink}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                type="button"
                onClick={handleCopyProfileRefLink}
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                {copiedRefLink ? <CheckCircle2 className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4" />}
                <span>{copiedRefLink ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              <button
                type="button"
                onClick={handleShareProfileRefLink}
                className="flex-1 min-w-[140px] py-2.5 px-4 rounded-xl bg-white hover:bg-amber-50 text-slate-950 font-black text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Share2 className="w-4 h-4 text-emerald-700" />
                <span>Share Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Complete & Professional 13-Option Profile & Information Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center text-sm font-black shadow-xs">
                13
              </span>
              <h2 className="text-lg sm:text-xl font-display font-extrabold text-slate-900">
                Student Portal, Help &amp; Information Centre
              </h2>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              All 13 official sections for profile management, support tickets, legal disclaimers, and grievance redressal.
            </p>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full self-start sm:self-auto border border-amber-200">
            Official Directory
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* 1. My Profile */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('section-profile-stats');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs hover:shadow-md transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-amber-100 uppercase block">Section 1</span>
              <p className="font-extrabold text-xs text-white truncate">1. My Profile (माझी प्रोफाइल)</p>
              <p className="text-[11px] text-amber-100/90 truncate">Points, streak, badges &amp; level</p>
            </div>
          </button>

          {/* 2. My Account */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('section-credentials');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 2</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">2. My Account (माझे खाते)</p>
              <p className="text-[11px] text-slate-500 truncate">Verified credentials &amp; school</p>
            </div>
          </button>

          {/* 3. My Subscription / Plan Details */}
          <button
            type="button"
            onClick={() => onOpenMembership('premium', currentStudent.classLevel)}
            className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0">
              <Crown className="w-4 h-4 text-amber-700" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-amber-700 uppercase block">Section 3</span>
              <p className="font-extrabold text-xs text-amber-950 truncate">3. My Subscription (₹99 Premium)</p>
              <p className="text-[11px] text-amber-800 truncate">365-Day (1 Year) status &amp; renewal</p>
            </div>
          </button>

          {/* 4. Help & Support */}
          <button
            type="button"
            onClick={() => onNavigateTab('help-support')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <LifeBuoy className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 4</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">4. Help &amp; Support (मदत केंद्र)</p>
              <p className="text-[11px] text-slate-500 truncate">Submit ticket &amp; track status</p>
            </div>
          </button>

          {/* 5. FAQs */}
          <button
            type="button"
            onClick={() => onNavigateTab('faqs')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 5</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">5. FAQs (नेहमीचे प्रश्न)</p>
              <p className="text-[11px] text-slate-500 truncate">Answers to common questions</p>
            </div>
          </button>

          {/* 6. Terms & Conditions */}
          <button
            type="button"
            onClick={() => onNavigateTab('terms')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 6</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">6. Terms &amp; Conditions</p>
              <p className="text-[11px] text-slate-500 truncate">7-point educational disclaimer</p>
            </div>
          </button>

          {/* 7. Privacy Policy */}
          <button
            type="button"
            onClick={() => onNavigateTab('privacy')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 7</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">7. Privacy Policy (गोपनीयता)</p>
              <p className="text-[11px] text-slate-500 truncate">Child data &amp; Razorpay security</p>
            </div>
          </button>

          {/* 8. Disclaimer */}
          <button
            type="button"
            onClick={() => onNavigateTab('disclaimer')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 8</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">8. Disclaimer (अस्वीकरण)</p>
              <p className="text-[11px] text-slate-500 truncate">Official academic notice</p>
            </div>
          </button>

          {/* 9. Grievance Redressal */}
          <button
            type="button"
            onClick={() => onNavigateTab('grievance')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 9</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">9. Grievance Redressal</p>
              <p className="text-[11px] text-slate-500 truncate">Report incorrect content &amp; track</p>
            </div>
          </button>

          {/* 10. About Us */}
          <button
            type="button"
            onClick={() => onNavigateTab('about')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Info className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 10</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">10. About Us (आमच्याबद्दल)</p>
              <p className="text-[11px] text-slate-500 truncate">Mission &amp; 14 school subjects</p>
            </div>
          </button>

          {/* 11. Contact Us */}
          <button
            type="button"
            onClick={() => onNavigateTab('contact')}
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Section 11</span>
              <p className="font-extrabold text-xs text-slate-900 truncate">11. Contact Us (संपर्क करा)</p>
              <p className="text-[11px] text-slate-500 truncate">Helpline, email &amp; hours</p>
            </div>
          </button>

          {/* 12. Referral Cashback & Wallet */}
          <button
            type="button"
            onClick={() => {
              onNavigateTab('referrals');
            }}
            className="p-3.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-200 text-emerald-900 flex items-center justify-center shrink-0">
              <Coins className="w-4 h-4 text-emerald-700" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-700 uppercase">Section 12</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-200 text-emerald-900 text-[9px] font-black uppercase">₹5 Cashback</span>
              </div>
              <p className="font-extrabold text-xs text-emerald-950 truncate">12. Referral Wallet &amp; Withdraw</p>
              <p className="text-[11px] text-emerald-800 truncate">Earn ₹5 per referral &amp; withdraw</p>
            </div>
          </button>

          {/* 13. Logout */}
          <button
            type="button"
            onClick={async () => {
              await logout();
            }}
            className="p-3.5 rounded-2xl bg-red-50 hover:bg-red-100 border border-red-200 transition-all text-left flex items-start gap-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0">
              <LogOut className="w-4 h-4 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-red-500 uppercase block">Section 13</span>
              <p className="font-extrabold text-xs text-red-700 truncate">13. Sign Out (लॉग आउट)</p>
              <p className="text-[11px] text-red-500 truncate">Securely end current session</p>
            </div>
          </button>
        </div>
      </div>

      {/* 0. Account Subscription Status & 3-Plan Validity Overview (Synchronized with Firebase) */}
      <div id="section-subscription" className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Crown className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-display font-bold text-slate-900">
                My Subscription Plan &amp; Validity
              </h2>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                  planInfo.isPaidPlanExpired
                    ? 'bg-rose-100 text-rose-800 border-rose-300'
                    : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                }`}
              >
                ● {planInfo.isPaidPlanExpired ? 'PAID PLAN EXPIRED • FREE PLAN ACTIVE' : `${planInfo.statusLabel} (${planInfo.daysRemainingDisplay})`}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-1">
              {planInfo.isPaidPlanExpired
                ? `Your previous ${planInfo.expiredPlanName} expired. You are currently on FREE PLAN – ₹0 – Lifetime. Renew your ₹99 Premium Plan for 365 Days (1 Year) access.`
                : `Current Active Plan: ${planInfo.planDisplayName} • Remaining Validity: ${planInfo.daysRemainingDisplay}`}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenMembership('premium', currentStudent.classLevel)}
            className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-extrabold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            {planInfo.isPaidPlanExpired ? (
              <>
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Renew ₹99 Plan (365 Days)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{planInfo.effectivePlan === 'premium' ? 'Extend ₹99 Plan (365 Days)' : 'Upgrade to ₹99 Premium (365 Days)'}</span>
              </>
            )}
          </button>
        </div>

        {/* 5 Key Account Subscription Metrics (IST Synchronized) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-400 uppercase text-[10px] block">Current Active Plan</span>
            <span className="font-extrabold text-xs sm:text-sm text-slate-900 block mt-0.5">{planInfo.planDisplayName}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-400 uppercase text-[10px] block">Subscription Status</span>
            <span className={`font-extrabold text-xs sm:text-sm block mt-0.5 ${
              planInfo.isPaidPlanExpired
                ? 'text-rose-700'
                : planInfo.isExpiringToday
                ? 'text-amber-700'
                : 'text-emerald-700'
            }`}>
              {planInfo.isPaidPlanExpired
                ? 'EXPIRED (Free Plan Active)'
                : planInfo.isExpiringToday
                ? 'EXPIRING TODAY (IST)'
                : 'ACTIVE'}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-400 uppercase text-[10px] block">Purchase Date (IST)</span>
            <span className="font-bold text-xs text-slate-800 block mt-0.5">
              {planInfo.purchasedDateIso
                ? `${planInfo.purchasedDisplay} (${planInfo.purchasedDateIso})`
                : planInfo.purchasedDisplay}
            </span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
            <span className="font-bold text-slate-400 uppercase text-[10px] block">Valid Until / Expiry (IST)</span>
            <span className="font-bold text-xs text-emerald-700 block mt-0.5">{planInfo.expiryDisplay}</span>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 col-span-2 sm:col-span-1">
            <span className="font-bold text-slate-400 uppercase text-[10px] block">Remaining Validity</span>
            <span className="font-extrabold text-xs sm:text-sm text-amber-900 block mt-0.5">{planInfo.daysRemainingDisplay}</span>
          </div>
        </div>

        {/* 2 Subscription Plans Cards (Free ₹0 & Premium ₹99) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 1. FREE PLAN – ₹0 – Lifetime */}
          <div className={`p-4 rounded-2xl border-2 flex flex-col justify-between ${
            planInfo.effectivePlan === 'free' ? 'border-emerald-500 bg-emerald-50/40' : 'border-slate-200 bg-slate-50/60'
          }`}>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mb-1.5">
                FREE PLAN – ₹0 – Lifetime
              </span>
              <p className="text-base font-black text-slate-900">₹0 • Lifetime</p>
              <p className="text-[11px] text-slate-600 mt-1">
                Brain Puzzles, Sudoku, English &amp; Mathematics Quizzes. Never expires.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-emerald-200/60 text-[11px] font-extrabold text-emerald-800">
              {planInfo.effectivePlan === 'free' ? '✓ Currently Active Plan' : '✓ Included Forever'}
            </div>
          </div>

          {/* 2. PREMIUM PLAN – ₹99 – 365 Days (1 Year) */}
          <div
            onClick={() => onOpenMembership('premium', currentStudent.classLevel)}
            className={`p-4 rounded-2xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
              planInfo.effectivePlan === 'premium' ? 'border-amber-500 bg-amber-50/60' : 'border-amber-300 hover:border-amber-500 bg-amber-50/30'
            }`}
          >
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white inline-block mb-1.5">
                PREMIUM PLAN – ₹99 – 365 Days (1 Year)
              </span>
              <p className="text-base font-black text-amber-900">₹99 • 365 Days (1 Year)</p>
              <p className="text-[11px] text-slate-700 mt-1">
                Full Unlock: All 14 School Subjects, Shivaji Stories, Story World, Drawing Studio, Cricket, Scholarship (4th &amp; 7th), AI Academy &amp; Certificates.
              </p>
            </div>
            <div className="mt-3 pt-2 border-t border-amber-200/80 text-[11px] font-extrabold text-amber-900 flex items-center justify-between">
              <span>{planInfo.effectivePlan === 'premium' ? '✓ Active (Extend 365 Days)' : 'Upgrade / Renew ₹99 (365 Days)'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 1. Official Credentials & Verification Details */}
      <div id="section-credentials" className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600" />
            <span>Student & Guardian Credentials</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Contact records and class enrollment locked according to platform policy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          {/* Mobile Number */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-500 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>Registered Mobile Number</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                currentStudent.isPhoneVerified
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-900'
              }`}>
                {currentStudent.isPhoneVerified ? 'OTP Ownership Verified' : 'Registered (Not OTP-Verified)'}
              </span>
            </div>
            <p className="font-mono font-bold text-sm text-slate-800">
              +91 {currentStudent.mobile.replace(/\D/g, '').slice(-10)}
            </p>
          </div>

          {/* Email Address */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-500 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>Registered Email Address</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                currentStudent.isEmailVerified
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-blue-100 text-blue-900'
              }`}>
                {currentStudent.isEmailVerified ? 'Link Verified' : 'Registered Account Email'}
              </span>
            </div>
            <p className="font-medium text-xs text-slate-800 truncate" title={currentStudent.email}>
              {currentStudent.email}
            </p>
          </div>

          {/* Parent/Guardian */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Parent / Guardian Name</span>
            </span>
            <p className="font-bold text-sm text-slate-800">
              {currentStudent.parentName || 'Guardian'}
            </p>
          </div>

          {/* Active & Base Enrolled Class */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-500 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5 text-slate-400" />
                <span>Active Workspace Class</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-100 text-indigo-900">
                Base: {getPrimaryBaseClass(currentStudent)}
              </span>
            </div>
            <p className="font-bold text-sm text-slate-800">
              {currentStudent.classLevel}
            </p>
          </div>

          {/* School Name */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 flex items-center gap-1.5">
              <School className="w-3.5 h-3.5 text-slate-400" />
              <span>School / Institution</span>
            </span>
            <p className="font-medium text-xs text-slate-800">
              {currentStudent.schoolName || 'Primary / High School'}
            </p>
          </div>

          {/* Registration Date */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="font-bold text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Registered On</span>
            </span>
            <p className="font-medium text-xs text-slate-800">
              {new Date(currentStudent.registeredAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Learning Progress & Achievement Summary */}
      <div id="section-profile-stats" className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-600" />
            <span>Learning Milestones & Progress</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Overall educational accomplishments achieved on this account.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <span className="text-2xl block mb-1">🪙</span>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Champion Points</p>
            <p className="text-xl font-extrabold text-amber-900">{currentStudent.points} XP</p>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
            <span className="text-2xl block mb-1">📝</span>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Quizzes Taken</p>
            <p className="text-xl font-extrabold text-blue-900">{studentAttempts.length}</p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <span className="text-2xl block mb-1">📖</span>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Stories Completed</p>
            <p className="text-xl font-extrabold text-emerald-900">{storiesCount} / 45</p>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200">
            <span className="text-2xl block mb-1">🎨</span>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Saved Artworks</p>
            <p className="text-xl font-extrabold text-purple-900">{drawingsCount}</p>
          </div>
        </div>
      </div>

      {/* 2B. Student's Own Attendance Records */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-600" />
              <span>My Attendance Record</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Verified daily learning attendance for {currentStudent.name}
            </p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            100% Verified Presence
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {(currentStudent.attendanceRecords && currentStudent.attendanceRecords.length > 0) ? (
            currentStudent.attendanceRecords.map(rec => (
              <div key={rec.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-2 text-xs">
                <div>
                  <p className="font-extrabold text-slate-800">{rec.date}</p>
                  <p className="text-[11px] text-slate-500">{rec.remarks || 'Daily Lesson & Practice'}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] uppercase ${
                  rec.status === 'present' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                  rec.status === 'late' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                  'bg-rose-100 text-rose-800 border border-rose-300'
                }`}>
                  {rec.status}
                </span>
              </div>
            ))
          ) : (
            <div className="col-span-full p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center">
              No attendance logs recorded yet.
            </div>
          )}
        </div>
      </div>

      {/* 2C. Student's Own Academic Assignments */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-600" />
              <span>My Assignments & Homework</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Curriculum exercises assigned for {currentStudent.classLevel}
            </p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-300">
            {currentStudent.assignments?.filter(a => a.status === 'graded').length || 0} Graded
          </span>
        </div>

        <div className="space-y-2.5">
          {(currentStudent.assignments && currentStudent.assignments.length > 0) ? (
            currentStudent.assignments.map(assign => (
              <div key={assign.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-100 text-amber-900 mr-2">
                      {assign.subject}
                    </span>
                    <strong className="text-sm text-slate-900">{assign.title}</strong>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] uppercase ${
                      assign.status === 'graded' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      assign.status === 'submitted' ? 'bg-blue-100 text-blue-800 border border-blue-300' :
                      'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}>
                      {assign.status}
                    </span>
                    {assign.score !== undefined && (
                      <span className="font-extrabold text-xs text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Score: {assign.score} / {assign.maxScore}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{assign.description}</p>
                {assign.teacherFeedback && (
                  <p className="text-emerald-700 text-[11px] font-semibold bg-emerald-50/60 p-2 rounded-xl border border-emerald-200">
                    👨‍🏫 Teacher Feedback: "{assign.teacherFeedback}"
                  </p>
                )}
                <p className="text-[10px] text-slate-400">Due Date: {assign.dueDate}</p>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center">
              No assignments assigned currently.
            </div>
          )}
        </div>
      </div>

      {/* 2D. Student's Own Fee Details */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-600" />
              <span>Tuition & Fee Records</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Official payment receipts and fee status for {currentStudent.name}
            </p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
            All Dues Cleared
          </span>
        </div>

        <div className="space-y-2.5">
          {(currentStudent.feeRecords && currentStudent.feeRecords.length > 0) ? (
            currentStudent.feeRecords.map(fee => (
              <div key={fee.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-slate-900">{fee.title}</strong>
                    <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] uppercase ${
                      fee.status === 'paid' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      fee.status === 'due' ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                      'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {fee.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Receipt: <span className="font-mono">{fee.receiptNo || 'VC-REC-2026-001'}</span> • Due: {fee.dueDate}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-base font-extrabold text-slate-900">₹{(fee.amount || fee.totalAmount || 0).toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-emerald-700 font-bold">Paid on {fee.paidAt || '2026-04-01'}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-xl bg-slate-50 text-slate-500 text-xs text-center">
              No fee records currently active.
            </div>
          )}
        </div>
      </div>

      {/* 2E. Subject Marks & Results Summary */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>Subject Marks & Quiz Results</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Recent test scores and performance history for {currentStudent.name}
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('quiz')}
            className="self-start sm:self-auto text-xs font-bold text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
          >
            <span>Take New Quiz</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {studentAttempts.length > 0 ? (
          <div className="space-y-2">
            {studentAttempts.slice(0, 5).map(att => (
              <div key={att.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-slate-800">{att.subject}</strong>
                    <span className="text-[10px] bg-amber-100 text-amber-900 font-extrabold px-2 py-0.5 rounded">
                      Level {att.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {new Date(att.completedAt || Date.now()).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-extrabold ${(att.scorePercent || 0) >= 80 ? 'text-emerald-700' : (att.scorePercent || 0) >= 60 ? 'text-amber-700' : 'text-rose-700'}`}>
                    {att.correctCount} / {att.totalQuestions} ({att.scorePercent || 0}%)
                  </span>
                  <p className="text-[10px] text-slate-500 font-medium">+{att.pointsEarned || 0} XP</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
            No quiz attempts recorded yet. Start practicing to earn marks!
          </div>
        )}
      </div>

      {/* 3. Account Switching & Privacy Isolation Enforcement */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-600" />
              <span>Student Account Isolation & Security</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Zero-Trust privacy protection: Students can access only their own individual records.
            </p>
          </div>

          {currentUser?.role === 'admin' && (
            <button
              onClick={openAuthModal}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 hover:underline cursor-pointer self-start sm:self-auto"
            >
              + Register New Student
            </button>
          )}
        </div>

        {currentUser?.role !== 'admin' ? (
          /* Single-Account Session Lock - students and teachers cannot view or switch other profiles */
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-300 space-y-2">
            <div className="flex items-center gap-2 text-amber-950 font-extrabold text-xs">
              <Lock className="w-4 h-4 text-amber-700" />
              <span>Single-Account Authenticated Session</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              You are securely signed in as <strong>{currentStudent.name}</strong> ({currentStudent.classLevel}). In compliance with data protection policy, accounts are strictly isolated and cannot view or switch to other users' profiles or records.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                ✓ Private Student Vault
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px]">
                ✓ Firebase Authenticated Session
              </span>
            </div>
          </div>
        ) : (
          /* Verified Admin Role Only */
          <div className="flex flex-wrap gap-2.5">
            {studentsList.map(s => {
              const isCurrent = s.id === currentStudent.id;
              return (
                <button
                  key={s.id}
                  onClick={() => quickSwitchStudent(s.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2.5 ${
                    isCurrent
                      ? 'bg-amber-300 text-amber-950 border-2 border-amber-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 hover:bg-amber-100/60 border border-slate-200'
                  }`}
                >
                  <span className="text-xl">{s.avatar}</span>
                  <div className="text-left">
                    <p className="font-extrabold">{s.name}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{s.classLevel} • {s.points} XP</p>
                  </div>
                  {isCurrent && <span className="text-[10px] text-emerald-800 font-extrabold bg-emerald-100 px-2 py-0.5 rounded">Active</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. VERY BOTTOM OF PROFILE PAGE: EXCLUSIVE RED SIGN OUT BUTTON */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-red-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600 space-y-1">
            <h3 className="text-base font-display font-bold text-slate-900">
              Session & Account Sign Out
            </h3>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Signing out will securely terminate your Firebase authentication session for <strong>{currentStudent.name}</strong> ({currentStudent.classLevel}). All progress is securely saved.
            </p>
          </div>

          {/* PROMINENT RED "SIGN OUT" BUTTON */}
          <button
            type="button"
            onClick={async () => {
              await logout();
            }}
            className="w-full sm:w-auto min-h-[52px] px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-sm tracking-wider uppercase shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer shrink-0"
          >
            <LogOut className="w-5 h-5 text-white" />
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
