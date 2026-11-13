import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Lock, 
  CheckCircle2, 
  Scale, 
  BookOpen, 
  CreditCard, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface TermsAndPrivacyViewProps {
  initialTab?: 'terms' | 'privacy' | 'disclaimer' | 'refund';
  onNavigateTab?: (tab: string) => void;
}

export const TermsAndPrivacyView: React.FC<TermsAndPrivacyViewProps> = ({ 
  initialTab = 'terms',
  onNavigateTab 
}) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'disclaimer' | 'refund'>(initialTab);

  React.useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold uppercase tracking-wider">
            <Scale className="w-3.5 h-3.5" />
            <span>Legal, Privacy &amp; Educational Policies</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight leading-tight">
            Information Centre &amp; Compliance
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            MyStudyZone (mystudyzone.in) is committed to child data protection, academic integrity, and transparent governance for students, teachers, and parents.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 relative z-10">
          <button
            type="button"
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms &amp; Conditions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('refund')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'refund'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Refund Policy</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('disclaimer')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'disclaimer'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
            <span>Educational Disclaimer</span>
          </button>
        </div>
      </div>

      {/* TAB 1: TERMS & CONDITIONS */}
      {activeTab === 'terms' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Last Updated: November 2026
            </span>
            <h2 className="text-xl font-display font-bold text-slate-900 mt-1">
              Terms &amp; Conditions of Service
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Please read these terms carefully before enrolling in or using MyStudyZone (mystudyzone.in). By creating an account or subscribing, you and your guardian agree to these terms.
            </p>
          </div>

          {/* Explicit 7-Point Educational Disclaimer Section */}
          <div className="p-6 rounded-3xl bg-amber-50/70 border-2 border-amber-300 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-base text-amber-950">
                  Official 7-Point Educational Disclaimer
                </h3>
                <p className="text-[11px] text-amber-800 font-medium">
                  Mandatory notice regarding practice materials and syllabus coverage
                </p>
              </div>
            </div>

            <ol className="space-y-3 text-xs text-slate-700 leading-relaxed list-decimal list-inside pl-1 font-medium">
              <li className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                <strong>Educational Purpose Only:</strong> This website provides educational materials, practice questions, answers, notes, stories and other learning resources strictly for educational enrichment and supplementary self-practice.
              </li>
              <li className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                <strong>Accuracy &amp; Potential Inaccuracies:</strong> Although we try our best to maintain the highest accuracy across all subjects (Classes 1st to 10th), some questions, answers, explanations or educational materials may occasionally contain unintentional typographical errors, spelling mistakes or inaccuracies.
              </li>
              <li className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                <strong>Textbook &amp; Official Syllabus Verification:</strong> Students and guardians are strongly advised to verify important information through prescribed school textbooks, Maharashtra State Board official references, and authorized educational sources.
              </li>
              <li className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                <strong>Non-Liability Clause:</strong> The website owner, teachers, content contributors, and management are not liable or responsible for any direct, indirect, incidental, or consequential loss resulting from errors, omissions, or the use of educational materials.
              </li>
              <li className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                <strong>No Guaranteed Exam Outcomes:</strong> All content is formulated to support general school curriculum and competitive examination readiness (such as MSCE 4th &amp; 7th Std Scholarship), but does not guarantee specific exam outcomes, ranks, or scores.
              </li>
              <li className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                <strong>Intellectual Property &amp; Copyright:</strong> All questions, quizzes, audio moral story recordings, illustrations, coding modules, and software architecture are proprietary intellectual property. Content may not be copied, reproduced, redistributed, scraped, or sold without prior written permission.
              </li>
              <li className="p-2.5 bg-white/80 rounded-xl border border-amber-200">
                <strong>Fair Use &amp; Strict Prohibition on Misuse:</strong> Rules strictly prohibit system abuse, reverse engineering, unauthorized account sharing across non-family members, automated bot access, or fraudulent payment attempts. Violations will result in immediate termination without refund.
              </li>
            </ol>
          </div>

          {/* Subscription and Payment Policy */}
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Subscription Duration, Pricing &amp; Razorpay Payments</span>
            </h3>
            <p>
              MyStudyZone provides digital educational access through our Paid Premium Plan alongside our Lifetime Free Plan:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700">
              <li><strong>Free Plan (₹0):</strong> Lifetime access to 2 Demo Worksheets (English &amp; Mathematics for your registered class), English &amp; Mathematics quizzes, Brain Puzzles, and Sudoku.</li>
              <li><strong>Premium Plan (₹99):</strong> Valid for <strong>365 Days (1 Year)</strong> from verified purchase date &amp; time. Full class-wise unlock of all curriculum subjects, worksheets, 45+ audio stories, 50 Shivaji Maharaj stories, drawing studio, cricket quiz arena, scholarship prep, AI Academy, and ₹5 referral cashback wallet.</li>
            </ul>
            <p className="mt-2 text-[11px] text-slate-500">
              Payments are processed securely via Razorpay. Once digital access is activated, subscription fees are non-refundable except in confirmed duplicate billing or verified technical failure cases.
            </p>
          </div>

          {/* Student Account Integrity */}
          <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <h3 className="text-sm font-display font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600" />
              <span>Enrolled Class Lock &amp; Single-Student Policy</span>
            </h3>
            <p>
              To maintain academic consistency and comply with state assessment tracking, enrolled grade levels (Standard 1st to 10th) are permanently linked to each account. Users are prohibited from sharing credentials or attempting to bypass grade restrictions. If a grade adjustment is required, an official request may be filed through Help &amp; Support.
            </p>
          </div>
        </div>
      )}

      {/* TAB 2: PRIVACY POLICY */}
      {activeTab === 'privacy' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-8">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
              Privacy &amp; Child Safety Policy
            </span>
            <h2 className="text-xl font-display font-bold text-slate-900 mt-1">
              Student Data Protection &amp; Parental Oversight
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              We hold child privacy sacred. MyStudyZone does not display third-party advertisements, sell student behavioral data, or solicit unauthorized child communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Information We Collect</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                We only collect basic student/teacher profile information required for educational administration: name, grade level (Classes 1st to 10th), email address, mobile number, and learning progress logs.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CreditCard className="w-4 h-4 text-indigo-600" />
                <span>Razorpay Payment Security</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                We <strong>never</strong> store debit/credit card numbers, CVVs, netbanking passwords, or UPI PINs. All financial transactions are processed by RBI-licensed payment gateway Razorpay using 256-bit SSL encryption.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Zero Advertising Policy</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                MyStudyZone is 100% ad-free. We do not use third-party advertising networks, commercial tracking cookies, or cross-site profiling on children.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <Lock className="w-4 h-4 text-purple-600" />
                <span>Guardian Rights &amp; Account Deletion</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Parents may review their child's learning history, request data corrections, or request complete account erasure at any time by lodging a ticket via Help &amp; Support.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: REFUND & CANCELLATION POLICY */}
      {activeTab === 'refund' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 font-bold">
              Payment &amp; Subscription Transparency
            </span>
            <h2 className="text-xl font-display font-bold text-slate-900 mt-1">
              Refund &amp; Cancellation Policy
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              Clear rules for our ₹99 (365-Day / 1-Year) Class-Wise Premium Subscription processed via Razorpay.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <p>
                1. <strong>Try Before Purchasing:</strong> MyStudyZone provides a free Visitor Demo Mode (all classes 1st to 10th) as well as a Lifetime Free Plan so students and parents can thoroughly test quizzes, sample English &amp; Mathematics worksheets, audio stories, and puzzles prior to subscribing.
              </p>
              <p>
                2. <strong>Instant Digital Activation:</strong> Upon successful ₹99 payment verification through Razorpay, full Premium access for your selected class is activated immediately for 365 Days (1 Year). Because full digital educational content is unlocked immediately, subscriptions are generally non-refundable and non-cancellable once activated.
              </p>
              <p>
                3. <strong>Duplicate Charge / Technical Failure Exception:</strong> If your bank account or UPI wallet is debited more than once for the same transaction, or if a verified payment failed to activate your subscription, our team will verify the Razorpay transaction ID and either activate your 365-day plan or issue a full refund of the duplicate charge within 5–7 business days to the original payment method.
              </p>
              <p>
                4. <strong>How to Request Assistance:</strong> Submit your registered email, Razorpay Payment ID, and transaction date through Help &amp; Support or our Grievance Redressal desk for priority resolution.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">Need help with a billing or duplicate payment issue?</p>
                <p className="text-[11px] text-slate-600">Contact our official Grievance Redressal or Support desk with your Receipt / Payment ID.</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab?.('help-support')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-xs cursor-pointer transition-all"
                >
                  Help &amp; Support
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateTab?.('grievance')}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-extrabold text-xs cursor-pointer transition-all"
                >
                  Grievance Desk
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EDUCATIONAL DISCLAIMER */}
      {activeTab === 'disclaimer' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 font-bold">
              Important Academic Notice
            </span>
            <h2 className="text-xl font-display font-bold text-slate-900 mt-1">
              Comprehensive Educational Disclaimer
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
              This disclaimer applies to all practice modules, worksheets, quiz questions, answer keys, explanations, and audio stories hosted on mystudyzone.in.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
            <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3">
              <h3 className="font-extrabold text-sm text-amber-950">
                Notice to Parents, Teachers and Students:
              </h3>
              <p>
                1. <strong>Supplementary Nature:</strong> MyStudyZone – An Interactive Learning Platform for Students (mystudyzone.in) is designed as an interactive learning platform to supplement classroom instruction and textbook reading for students in Classes 1st to 10th. It is not an accredited school or degree-granting entity.
              </p>
              <p>
                2. <strong>Error Reporting Protocol:</strong> We maintain a rigorous question-curation process aligned with Maharashtra State Board syllabus. However, should you discover any ambiguity or discrepancy in any quiz or explanation, please use our inline <strong>"Report Issue"</strong> button or submit a grievance. Our teachers will verify and correct valid issues immediately.
              </p>
              <p>
                3. <strong>Exam Outcomes:</strong> Practice scores and championship ranks on MyStudyZone reflect engagement with practice quizzes and do not guarantee official school or MSCE scholarship exam results.
              </p>
              <p>
                4. <strong>Independent References:</strong> For state scholarship examinations and board evaluations, the syllabi and answer keys published by the Maharashtra State Council of Examination (MSCE) Pune remain the sole authoritative reference.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-bold text-slate-900">Have a concern or spotted an incorrect question?</p>
                <p className="text-[11px] text-slate-500">Submit a direct inquiry to our academic verification desk.</p>
              </div>
              <button
                type="button"
                onClick={() => onNavigateTab?.('help-support')}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow-xs cursor-pointer transition-all"
              >
                Open Help &amp; Support
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
