import React, { useState, useEffect } from 'react';
import {
  X, User, Lock, Phone, Mail, School, GraduationCap, ShieldAlert,
  Sparkles, CheckCircle2, Eye, EyeOff, ArrowLeft, KeyRound, Gift, MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ClassLevel } from '../types';
import {
  registerFirebaseEmailUser,
  saveStudentProfileToFirestore,
} from '../services/firebase';
import { referralService } from '../services/referralService';
import { sanitizeReferralCode } from '../utils/referralCoding';
import { formatStandardOrdinal } from '../utils/subscriptionAccess';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'teacher' | 'register' | 'admin' | 'forgot';
  initialEmail?: string;
  onSuccess?: () => void;
}

const CLASS_LEVELS: ClassLevel[] = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

const AVATARS = ['🦁', '🐯', '🐼', '🦊', '🚀', '🌟', '🦋', '🐬', '👩‍🏫', '👨‍🏫'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'login',
  initialEmail = '',
  onSuccess,
}) => {
  const {
    studentsList,
    registerStudent,
    loginWithEmail,
    loginAsTeacher,
    loginAsAdmin,
    recoverAccount,
  } = useApp();

  const [tab, setTab] = useState<'login' | 'teacher' | 'register' | 'admin' | 'forgot'>(defaultTab);

  // Student Login State
  const [loginEmail, setLoginEmail] = useState(initialEmail);
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Teacher Login State
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [showTeacherPassword, setShowTeacherPassword] = useState(false);

  // Forgot Password State (Registered Email Address)
  const [resetEmail, setResetEmail] = useState(initialEmail);
  const [resetEmailSentCount, setResetEmailSentCount] = useState(0);

  // Register State (Student & Teacher Class-Wise Registration — School Name OPTIONAL)
  const [regRoleType, setRegRoleType] = useState<'student' | 'teacher'>('student');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regMobile, setRegMobile] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regClass, setRegClass] = useState<ClassLevel>('Class 5');
  const [regAvatar, setRegAvatar] = useState('🌟');
  const [regSchool, setRegSchool] = useState('');
  const [regCity, setRegCity] = useState('Pune');
  const [regReferralCode, setRegReferralCode] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return sanitizeReferralCode(params.get('ref') || params.get('referral') || localStorage.getItem('vc_pending_ref_code'));
    } catch {
      return '';
    }
  });
  const [referralValidationInfo, setReferralValidationInfo] = useState<{
    checked: boolean;
    valid: boolean;
    referrerName?: string;
    referrerUserId?: string;
    message?: string;
  }>({ checked: false, valid: false });

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTab(defaultTab);
    if (initialEmail) {
      setLoginEmail(initialEmail);
      setResetEmail(initialEmail);
    }
    try {
      const params = new URLSearchParams(window.location.search);
      const urlRef = sanitizeReferralCode(
        params.get('ref') || params.get('referral') || localStorage.getItem('vc_pending_ref_code')
      );
      if (urlRef) {
        setRegReferralCode(urlRef);
      }
    } catch {
      // Ignore
    }
    setError('');
    setSuccessMsg('');
  }, [defaultTab, initialEmail, isOpen]);

  // Live validate referral code when entered or captured from URL
  useEffect(() => {
    const clean = sanitizeReferralCode(regReferralCode);
    if (!clean) {
      setReferralValidationInfo({ checked: false, valid: false });
      return;
    }

    let cancelled = false;
    referralService
      .validateCode(clean)
      .then((res) => {
        if (cancelled) return;
        setReferralValidationInfo({
          checked: true,
          valid: Boolean(res?.valid),
          referrerName: res?.referrerName,
          referrerUserId: res?.referrerUserId,
          message: res?.message || res?.error,
        });
      })
      .catch(() => {
        if (!cancelled) {
          setReferralValidationInfo({ checked: false, valid: false });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [regReferralCode]);

  if (!isOpen) return null;

  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidMobile = (mobile: string) => /^[6-9]\d{9}$/.test(mobile.trim());

  // --- 1. Student/Teacher Login via Email & Password ---
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!isValidEmail(loginEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!loginPassword) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    const res = await loginWithEmail(loginEmail.trim(), loginPassword);
    setIsLoading(false);

    if (!res.success) {
      setError(res.message);
      return;
    }

    onSuccess?.();
    onClose();
  };

  // --- 3. Student & Teacher Class-Wise Registration (School Name is OPTIONAL) ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    const roleLabel = regRoleType === 'teacher' ? 'Teacher' : 'Student';

    if (!regName.trim() || regName.trim().length < 2) {
      setError(`Please enter the ${roleLabel.toLowerCase()} full name.`);
      return;
    }

    const cleanEmail = regEmail.trim().toLowerCase();
    if (!isValidEmail(cleanEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    const cleanMobile = regMobile.replace(/\D/g, '').slice(-10);
    if (!isValidMobile(cleanMobile)) {
      setError('Mobile number is compulsory. Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    // Strict Unique Mobile Check (One mobile number = One account)
    const duplicateMobile = studentsList.find(
      s => s.mobile.replace(/\D/g, '').slice(-10) === cleanMobile
    );
    if (duplicateMobile) {
      setError(
        `One mobile number = One account. Mobile number ${cleanMobile} is already registered with "${duplicateMobile.name}" (${duplicateMobile.classLevel}).`
      );
      return;
    }

    // Strict Unique Email Check (One email = One account)
    const duplicateEmail = studentsList.find(
      s => s.email.trim().toLowerCase() === cleanEmail
    );
    if (duplicateEmail) {
      setError(
        `One email address = One account. Email "${cleanEmail}" is already registered with "${duplicateEmail.name}". Please sign in instead.`
      );
      return;
    }

    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    // NOTE: School Name is strictly OPTIONAL for both Students and Teachers!

    setIsLoading(true);

    // Validate optional referral code before creating account (prevents invalid referrals and self-referrals)
    const normalizedRefCode = sanitizeReferralCode(regReferralCode);
    let verifiedReferrerUserId: string | undefined;

    if (normalizedRefCode) {
      const refCheck = await referralService.validateCode(normalizedRefCode);
      if (!refCheck?.valid) {
        setIsLoading(false);
        setError(
          refCheck?.message ||
            refCheck?.error ||
            `Invalid referral code "${normalizedRefCode}". Please enter a valid referral code or leave the field blank.`
        );
        return;
      }
      verifiedReferrerUserId = refCheck.referrerUserId;

      // Prevent self-referral by matching email or mobile against referrer
      const referrerStudent = studentsList.find(
        (s) =>
          s.id === verifiedReferrerUserId ||
          sanitizeReferralCode(s.referralCode) === normalizedRefCode
      );
      if (
        referrerStudent &&
        (referrerStudent.email.trim().toLowerCase() === cleanEmail ||
          referrerStudent.mobile.replace(/\D/g, '').slice(-10) === cleanMobile)
      ) {
        setIsLoading(false);
        setError('Self-referral is not allowed. You cannot use your own referral code.');
        return;
      }
    }

    // 1. Create Firebase Email Auth User (fail closed if Firebase rejects or fails)
    const fbReg = await registerFirebaseEmailUser(cleanEmail, regPassword);
    if (!fbReg.success || !fbReg.user) {
      setIsLoading(false);
      setError(fbReg.error || 'Could not create your account. Please verify your email and try again.');
      return;
    }

    // 2. Register Student or Teacher in AppContext (Permanently locks selected classLevel & generates unique referralCode)
    const regResult = registerStudent(
      {
        name: regName.trim(),
        email: cleanEmail,
        mobile: cleanMobile,
        classLevel: regClass,
        accountRole: regRoleType,
        avatar: regAvatar || (regRoleType === 'teacher' ? '👩‍🏫' : '🌟'),
        schoolName: regSchool.trim(), // Optional — may be empty string
        parentName: '',
        parentConsent: true,
        referredByCode: normalizedRefCode || undefined,
        referredByStudentId: verifiedReferrerUserId,
      },
      {
        verifiedFirebaseUid: fbReg.user.uid,
        isEmailVerified: true,
        isPhoneVerified: false,
      }
    );

    if (!regResult.success) {
      setIsLoading(false);
      setError(regResult.message);
      return;
    }

    // 3. Persist Profile & Permanent Unique Referral Code + Selected Class to Firebase Firestore
    if (regResult.student) {
      if (normalizedRefCode) {
        regResult.student.referredByCode = normalizedRefCode;
        regResult.student.referredByStudentId = verifiedReferrerUserId;
      }
      await saveStudentProfileToFirestore(regResult.student);

      // 4. Register in Referral Hub & Track Referral Signup
      try {
        await referralService.registerAccount({
          userId: regResult.student.id,
          userName: regResult.student.name,
          userRole: 'student',
          className: regResult.student.classLevel,
          schoolName: regResult.student.schoolName || '',
          city: regCity.trim() || 'Pune',
          email: regResult.student.email,
          mobile: regResult.student.mobile,
        });
        if (normalizedRefCode) {
          await referralService.trackSignup({
            newUserId: regResult.student.id,
            newUserName: regResult.student.name,
            newUserRole: 'student',
            newUserClass: regResult.student.classLevel,
            schoolName: regResult.student.schoolName || '',
            city: regCity.trim() || 'Pune',
            email: regResult.student.email,
            mobile: regResult.student.mobile,
            referralCodeUsed: normalizedRefCode,
          });
        }
        localStorage.removeItem('vc_pending_ref_code');
      } catch {
        // Non-blocking referral registration
      }
    }

    setIsLoading(false);
    onSuccess?.();
    onClose();
  };

  // --- 4. Forgot Password / Reset Password via Firebase Authentication ---
  const sendResetLinkToRegisteredEmail = async () => {
    setError('');
    setSuccessMsg('');

    const cleanEmail = resetEmail.trim().toLowerCase();
    if (!cleanEmail) {
      setError('Please enter your registered email address.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setError('Friendly Notice: Please enter a valid email address (for example, student@example.com).');
      return;
    }

    setIsLoading(true);
    const res = await recoverAccount(cleanEmail);
    setIsLoading(false);

    if (!res.success) {
      setError(res.message);
      return;
    }

    setResetEmailSentCount((prev) => prev + 1);
    setSuccessMsg(res.message);
  };

  const handleRecoverPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetLinkToRegisteredEmail();
  };

  // --- 5. Teacher Portal Login ---
  const handleTeacherSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const res = await loginAsTeacher(teacherEmail, teacherPassword);
    setIsLoading(false);
    if (!res.success) {
      setError(res.message);
      return;
    }
    onSuccess?.();
    onClose();
  };

  // --- 6. Admin Login ---
  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    const res = await loginAsAdmin(adminEmail, adminPassword);
    setIsLoading(false);
    if (!res.success) {
      setError(res.message);
      return;
    }
    onSuccess?.();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto overscroll-contain">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-indigo-100 animate-in fade-in zoom-in-95 duration-200 m-auto my-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> MyStudyZone – An Interactive Learning Platform for Students
          </div>
          <h2 className="text-2xl font-black">
            {tab === 'login' && 'Student Portal Login'}
            {tab === 'teacher' && 'Teacher Portal Login'}
            {tab === 'register' && (regRoleType === 'teacher' ? 'Teacher Class-Wise Registration' : 'Student Class-Wise Registration')}
            {tab === 'forgot' && 'Forgot / Reset Password'}
            {tab === 'admin' && 'Platform Admin Console'}
          </h2>
          <p className="text-amber-200 font-bold text-xs mt-0.5">
            Learn, Practice, Explore and Achieve Excellence.
          </p>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1">
            {tab === 'login' && 'Sign in with your registered Email Address & Password'}
            {tab === 'teacher' && 'Sign in to the dedicated Teacher Portal for your registered class (Standards 1st to 10th)'}
            {tab === 'register' && 'Select ONE class from Standard 1st to Standard 10th • School Name is Optional'}
            {tab === 'forgot' && 'Enter your registered email address to receive a secure Firebase password reset link'}
            {tab === 'admin' && 'Authorized Administrator sign-in to manage platform settings'}
          </p>
        </div>

        {/* Navigation Tabs (Student Portal, Teacher Portal, New Registration, Admin — NO Parent Portal) */}
        <div className="flex flex-wrap border-b border-slate-200 bg-slate-50 px-4 pt-3 gap-1.5">
          <button
            type="button"
            onClick={() => { setTab('login'); setError(''); setSuccessMsg(''); }}
            className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-colors cursor-pointer ${
              tab === 'login' || tab === 'forgot'
                ? 'bg-white text-indigo-600 border-t border-x border-slate-200 -mb-px'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🎓 Student Login
          </button>
          <button
            type="button"
            onClick={() => { setTab('teacher'); setError(''); setSuccessMsg(''); }}
            className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-colors cursor-pointer ${
              tab === 'teacher'
                ? 'bg-white text-emerald-700 border-t border-x border-slate-200 -mb-px'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            👩‍🏫 Teacher Login
          </button>
          <button
            type="button"
            onClick={() => { setTab('register'); setError(''); setSuccessMsg(''); }}
            className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-colors cursor-pointer ${
              tab === 'register'
                ? 'bg-white text-indigo-600 border-t border-x border-slate-200 -mb-px'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ✨ Register (Student / Teacher)
          </button>
          <button
            type="button"
            onClick={() => { setTab('admin'); setError(''); setSuccessMsg(''); }}
            className={`px-3 py-2 text-xs font-bold rounded-t-xl transition-colors ml-auto cursor-pointer ${
              tab === 'admin'
                ? 'bg-white text-rose-600 border-t border-x border-slate-200 -mb-px'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Admin
          </button>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto">
          {error && (
            <div className="mb-4 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ==================== STUDENT LOGIN TAB ==================== */}
          {tab === 'login' && (
            <div>
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm font-medium"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setTab('forgot');
                        setResetEmail(loginEmail);
                        setError('');
                        setSuccessMsg('');
                      }}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Forgot Password?</span>
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all cursor-pointer"
                >
                  {isLoading ? 'Signing In...' : 'Sign In to Student Portal'}
                </button>
              </form>

              <p className="text-center text-xs text-slate-500 mt-5">
                New Student or Teacher?{' '}
                <button
                  type="button"
                  onClick={() => { setTab('register'); setError(''); setSuccessMsg(''); }}
                  className="text-indigo-600 font-bold hover:underline cursor-pointer"
                >
                  Create Class-Wise Account
                </button>
              </p>
            </div>
          )}

          {/* ==================== TEACHER PORTAL LOGIN TAB ==================== */}
          {tab === 'teacher' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <div className="font-black flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-emerald-700" />
                  <span>Dedicated Class-Wise Teacher Portal (Standards 1st to 10th)</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Teachers get complete access to their registered class’s subjects, online worksheets, 4-level quizzes, stories with audio, current affairs, scholarship sets, and solutions.
                </p>
              </div>

              <form onSubmit={handleTeacherSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Registered Teacher Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={teacherEmail}
                      onChange={(e) => setTeacherEmail(e.target.value)}
                      placeholder="teacher@example.com"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none text-sm font-medium"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showTeacherPassword ? 'text' : 'password'}
                      value={teacherPassword}
                      onChange={(e) => setTeacherPassword(e.target.value)}
                      placeholder="Enter teacher password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 focus:border-emerald-600 focus:outline-none text-sm font-medium"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowTeacherPassword(!showTeacherPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showTeacherPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setTab('forgot');
                        setResetEmail(teacherEmail);
                        setError('');
                        setSuccessMsg('');
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>Forgot Password?</span>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg cursor-pointer"
                >
                  {isLoading ? 'Signing In...' : 'Sign In to Teacher Portal'}
                </button>
              </form>

              <p className="text-center text-xs text-slate-500">
                Want to register as a Teacher?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setRegRoleType('teacher');
                    setRegAvatar('👩‍🏫');
                    setTab('register');
                    setError('');
                    setSuccessMsg('');
                  }}
                  className="text-emerald-700 font-bold hover:underline cursor-pointer"
                >
                  Register Teacher Account
                </button>
              </p>
            </div>
          )}

          {/* ==================== FORGOT PASSWORD TAB ==================== */}
          {tab === 'forgot' && (
            <form onSubmit={handleRecoverPassword} className="space-y-4">
              <button
                type="button"
                onClick={() => { setTab('login'); setError(''); setSuccessMsg(''); }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:underline mb-1 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
              </button>

              <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 text-xs text-indigo-950 space-y-1">
                <p className="font-bold">Secure Firebase Password Reset</p>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Enter your registered email address below. We will send a secure password reset link via Firebase Authentication. Your existing account, subscription plan, payment history, and saved learning progress will be preserved.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your registered email address"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all cursor-pointer"
              >
                {isLoading
                  ? 'Sending Secure Reset Link...'
                  : resetEmailSentCount > 0
                  ? 'Send Another Password Reset Link'
                  : 'Send Password Reset Link'}
              </button>

              {resetEmailSentCount > 0 && (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                  <p className="text-slate-700 font-semibold leading-relaxed">
                    Didn’t receive the email or did your previous reset link expire? You can request another reset link at any time or return to sign in once you’ve updated your password.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={sendResetLinkToRegisteredEmail}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-indigo-50 text-indigo-700 font-bold border border-indigo-200 transition-colors cursor-pointer"
                    >
                      Request Another Reset Link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setLoginEmail(resetEmail.trim());
                        setTab('login');
                        setError('');
                        setSuccessMsg('You can now sign in using your new password.');
                      }}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors cursor-pointer"
                    >
                      Proceed to Login
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}

          {/* ==================== NEW REGISTRATION TAB (STUDENT & TEACHER) ==================== */}
          {tab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              {/* Role Selector: Student Registration vs Teacher Registration */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Portal Account Type *
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setRegRoleType('student');
                      if (regAvatar === '👩‍🏫' || regAvatar === '👨‍🏫') setRegAvatar('🌟');
                    }}
                    className={`p-3 rounded-2xl border-2 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      regRoleType === 'student'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>🎓 Student Registration</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRegRoleType('teacher');
                      setRegAvatar('👩‍🏫');
                    }}
                    className={`p-3 rounded-2xl border-2 text-xs font-extrabold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      regRoleType === 'teacher'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-950 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    <span>👩‍🏫 Teacher Registration</span>
                  </button>
                </div>
              </div>

              {/* One Account – One Class – One Phone – One Email Policy Banner */}
              <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span className="text-[11px] font-bold text-amber-950 leading-snug">
                  <strong>One Account = One Class:</strong> Select one class from <strong>Standard 1st to Standard 10th</strong>. Your selected class ({regClass}) will be permanently saved to your account.
                </span>
              </div>

              {/* Avatar Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Choose Profile Avatar
                </label>
                <div className="flex gap-2 flex-wrap">
                  {AVATARS.map(av => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setRegAvatar(av)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border-2 transition-all cursor-pointer ${
                        regAvatar === av
                          ? 'border-indigo-600 bg-indigo-50 scale-110'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              {/* 1. Student Name / Teacher Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  {regRoleType === 'teacher' ? 'Teacher Full Name *' : 'Student Full Name *'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder={regRoleType === 'teacher' ? 'e.g. Prof. Meera Joshi' : 'e.g. Aarav Patil'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* 2. Mobile Number (10 digits, 1 phone = 1 account) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Mobile Number (10 Digits) *
                  </label>
                  <span className="text-[10px] font-bold text-indigo-600">
                    One Mobile = One Account
                  </span>
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    maxLength={10}
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* 3. Email Address (1 email = 1 account) */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Email Address *
                  </label>
                  <span className="text-[10px] font-bold text-indigo-600">
                    One Email = One Account
                  </span>
                </div>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder={regRoleType === 'teacher' ? 'teacher@example.com' : 'student@example.com'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm"
                    required
                  />
                </div>
              </div>

              {/* 4. Password & Confirm Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 chars"
                      className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* 5. Select ONE Class from Standard 1st to Standard 10th */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Select Class (Standard 1st to 10th) *
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700">
                    Permanently Saved to Account
                  </span>
                </div>
                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={regClass}
                    onChange={(e) => setRegClass(e.target.value as ClassLevel)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm font-bold bg-white text-slate-900"
                  >
                    {CLASS_LEVELS.map((c) => (
                      <option key={c} value={c}>
                        Standard {formatStandardOrdinal(c)} ({c})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 6. School Name (OPTIONAL for both Students and Teachers) & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    School Name <span className="text-slate-400 font-semibold">(Optional)</span>
                  </label>
                  <div className="relative">
                    <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={regSchool}
                      onChange={(e) => setRegSchool(e.target.value)}
                      placeholder="Optional school name"
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    City / District <span className="text-slate-400 font-semibold">(Optional)</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      placeholder="Pune"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:outline-none text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* 7. Optional Referral Code */}
              <div className="space-y-2 bg-indigo-50/60 p-3 rounded-xl border border-indigo-100">
                <div>
                  <label className="block text-xs font-bold text-indigo-900 uppercase tracking-wider mb-1">
                    Referral Code (Optional)
                  </label>
                  <div className="relative">
                    <Gift className="w-3.5 h-3.5 text-indigo-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={regReferralCode}
                      onChange={(e) => setRegReferralCode(e.target.value.toUpperCase())}
                      placeholder="Enter friend's referral code (optional)"
                      className="w-full pl-8 pr-3 py-2 rounded-lg border border-indigo-200 focus:border-indigo-600 focus:outline-none text-xs font-mono font-bold uppercase bg-white"
                    />
                  </div>
                </div>
                {regReferralCode.trim() && referralValidationInfo.checked && (
                  <div
                    className={`px-3 py-2 rounded-lg text-[11px] font-bold flex items-center gap-1.5 ${
                      referralValidationInfo.valid
                        ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-300'
                        : 'bg-rose-100/90 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {referralValidationInfo.valid ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>
                          Referral Link Active: Referred by{' '}
                          <strong>{referralValidationInfo.referrerName || 'Student Champion'}</strong> (Code:{' '}
                          <span className="font-mono">{regReferralCode.trim().toUpperCase()}</span>)
                        </span>
                      </>
                    ) : (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>{referralValidationInfo.message || 'Invalid referral code.'}</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all cursor-pointer"
              >
                {isLoading
                  ? 'Creating Account...'
                  : `Register ${regRoleType === 'teacher' ? 'Teacher' : 'Student'} Account for Standard ${formatStandardOrdinal(regClass)}`}
              </button>
            </form>
          )}

          {/* ==================== ADMIN TAB ==================== */}
          {tab === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Authorized Administrator Email
                </label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none text-sm"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Unlock Admin Dashboard
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
