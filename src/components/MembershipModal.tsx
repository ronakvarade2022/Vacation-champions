import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import {
  getRazorpayConfig,
  createRazorpayOrder,
  launchRazorpayCheckout,
  loadRazorpayScript,
  createRazorpayQrCode,
  checkRazorpayQrStatus,
  CreateQrResponse
} from '../services/paymentService';
import {
  ALL_CLASS_LEVELS,
  getBoardShortLabel,
  getCategorySubscriptionInfo,
  getClassSubscriptionInfo,
  getStudentPlanInfo,
  getPremiumActivatedBannerMessage,
  formatStandardOrdinal,
  hasCategoryAccess,
} from '../utils/subscriptionAccess';
import {
  PLAN_CATALOG,
  PLAN_CATALOG_LIST,
  PlanCatalogItem,
  getPlanCatalogItem,
  formatCategoriesListLabel,
} from '../data/planCatalog';
import { BOARD_META_LIST } from '../data/boards/boardMeta';
import {
  X, CheckCircle2, ShieldCheck, Crown, Lock, CreditCard, Smartphone,
  AlertCircle, Sparkles, RefreshCw, Copy, Check, Loader2,
  QrCode, ArrowLeft, Timer, CheckCircle, Gift, GraduationCap, Award, Layers
} from 'lucide-react';
import { ClassLevel, EducationBoard, PaymentTransaction, PlanSkuId } from '../types';

interface MembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedPlan?: 'basic' | 'premium';
  initialPlanSku?: PlanSkuId;
  initialSelectedClass?: ClassLevel;
  initialSelectedBoard?: EducationBoard;
  onRequestAuth?: (defaultTab?: 'login' | 'register') => void;
  onSwitchActiveClass?: (cls: ClassLevel, board?: EducationBoard) => void;
}

type ModalPlanGroupTab = 'classes' | 'tet_ctet' | 'scholarship';

function resolveGroupTabForSku(sku: PlanSkuId): ModalPlanGroupTab {
  if (sku === 'BOARD_CLASS') return 'classes';
  if (sku === 'SCHOLARSHIP_COMBO' || sku === 'SCHOLARSHIP_4TH' || sku === 'SCHOLARSHIP_7TH') return 'scholarship';
  return 'tet_ctet';
}

export const MembershipModal: React.FC<MembershipModalProps> = ({
  isOpen,
  onClose,
  initialPlanSku = 'BOARD_CLASS',
  initialSelectedClass,
  initialSelectedBoard,
  onRequestAuth,
  onSwitchActiveClass,
}) => {
  const { currentStudent, activateVerifiedMembership, switchActiveClass } = useApp();

  const [selectedPlanSku, setSelectedPlanSku] = useState<PlanSkuId>(initialPlanSku || 'BOARD_CLASS');
  const [planGroupTab, setPlanGroupTab] = useState<ModalPlanGroupTab>(() =>
    resolveGroupTabForSku(initialPlanSku || 'BOARD_CLASS')
  );
  const [tetCtetDuration, setTetCtetDuration] = useState<'6m' | '1y'>('6m');

  const [targetBoard, setTargetBoard] = useState<EducationBoard>(
    initialSelectedBoard || currentStudent?.board || 'Maharashtra'
  );
  const [targetClass, setTargetClass] = useState<ClassLevel>(
    initialSelectedClass || currentStudent?.classLevel || 'Class 5'
  );
  const [step, setStep] = useState<'select' | 'qr_code' | 'processing' | 'success' | 'failed'>('select');
  const [isCreatingOrder, setIsCreatingOrder] = useState<boolean>(false);
  const [lastTransaction, setLastTransaction] = useState<PaymentTransaction | null>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [failedOrderId, setFailedOrderId] = useState('');
  const [isDomainMismatchError, setIsDomainMismatchError] = useState(false);
  const [copiedDomainUrl, setCopiedDomainUrl] = useState(false);
  const [expiryDateStr, setExpiryDateStr] = useState('');
  const [daysRemainingNum, setDaysRemainingNum] = useState(365);
  const [gatewayMode, setGatewayMode] = useState<'LIVE' | 'TEST'>('LIVE');

  // Optional Referral Code Input for ₹5 Cashback on ₹99 Premium Purchase
  const [referralCodeInput, setReferralCodeInput] = useState<string>('');
  const [referralCreditedNotice, setReferralCreditedNotice] = useState<string>('');

  // Dynamic QR Code Payment State
  const [qrData, setQrData] = useState<CreateQrResponse | null>(null);
  const [qrCountdown, setQrCountdown] = useState<number>(600); // 10 minutes (600s)
  const [qrStatus, setQrStatus] = useState<'WAITING' | 'VERIFYING' | 'PAID' | 'EXPIRED' | 'FAILED'>('WAITING');
  const [isCheckingQr, setIsCheckingQr] = useState<boolean>(false);
  const [qrStatusNotice, setQrStatusNotice] = useState<string>('');

  // Synchronous lock to prevent duplicate rapid clicks on ₹99 buttons
  const isCheckoutBusyRef = useRef<boolean>(false);
  const qrPollIntervalRef = useRef<any>(null);
  const qrTimerIntervalRef = useRef<any>(null);

  // Clear timers helper
  const clearQrTimers = () => {
    if (qrPollIntervalRef.current) {
      clearInterval(qrPollIntervalRef.current);
      qrPollIntervalRef.current = null;
    }
    if (qrTimerIntervalRef.current) {
      clearInterval(qrTimerIntervalRef.current);
      qrTimerIntervalRef.current = null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      const nextSku: PlanSkuId = initialPlanSku || 'BOARD_CLASS';
      setSelectedPlanSku(nextSku);
      setPlanGroupTab(resolveGroupTabForSku(nextSku));
      if (
        nextSku === 'TET_1Y' ||
        nextSku === 'CTET_1Y' ||
        nextSku === 'TET_CTET_COMBO_1Y' ||
        nextSku === 'MAHA_TET' ||
        nextSku === 'CTET_COMBO' ||
        nextSku === 'TEACHER_ALL_ACCESS'
      ) {
        setTetCtetDuration('1y');
      } else {
        setTetCtetDuration('6m');
      }
      setTargetBoard(initialSelectedBoard || currentStudent?.board || 'Maharashtra');
      setTargetClass(initialSelectedClass || currentStudent?.classLevel || 'Class 5');
      setStep('select');
      setIsCreatingOrder(false);
      isCheckoutBusyRef.current = false;
      setErrorMsg('');
      setFailedOrderId('');
      setIsDomainMismatchError(false);
      setCopiedDomainUrl(false);
      setQrData(null);
      setQrStatus('WAITING');
      setQrStatusNotice('');
      setReferralCreditedNotice('');
      clearQrTimers();

      const resolvedRef = currentStudent?.referredByCode
        ? currentStudent.referredByCode.toUpperCase()
        : '';
      setReferralCodeInput(resolvedRef);

      // Preload Razorpay Checkout script immediately when modal opens so button click is fast
      loadRazorpayScript().catch((err) => {
        console.info('[Razorpay] Preload notice:', err);
      });

      getRazorpayConfig()
        .then((cfg) => {
          if (cfg && cfg.mode) {
            setGatewayMode(cfg.mode);
          }
        })
        .catch(() => {});
    } else {
      clearQrTimers();
    }

    return () => {
      clearQrTimers();
    };
  }, [isOpen, initialPlanSku, initialSelectedClass, initialSelectedBoard, currentStudent?.board, currentStudent?.classLevel, currentStudent?.referredByCode]);

  // QR Code active countdown timer & auto-polling effect
  useEffect(() => {
    if (step === 'qr_code' && qrData) {
      clearQrTimers();

      // Countdown ticker: 1s
      qrTimerIntervalRef.current = setInterval(() => {
        setQrCountdown((prev) => {
          if (prev <= 1) {
            clearQrTimers();
            setQrStatus('EXPIRED');
            setQrStatusNotice('QR code validity expired. Click "Generate New QR Code" below.');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // Auto-poll payment status every 4 seconds
      qrPollIntervalRef.current = setInterval(async () => {
        if (!currentStudent || !qrData.qrId) return;
        try {
          const checkRes = await checkRazorpayQrStatus(
            qrData.qrId,
            currentStudent,
            'premium',
            referralCodeInput.trim(),
            targetClass,
            targetBoard,
            selectedPlanSku
          );
          if (checkRes.paid && checkRes.status === 'PAID') {
            clearQrTimers();
            setQrStatus('PAID');
            const paidCatalog = getPlanCatalogItem(checkRes.planSku || selectedPlanSku);
            setQrStatusNotice(
              `Payment Verified! Activating ${paidCatalog.shortTitle} (₹${paidCatalog.amountInr})...`
            );
            if ((checkRes as any).referral?.credited) {
              setReferralCreditedNotice(
                `₹5 Referral Cashback Credited! (Referrer: ${(checkRes as any).referral.referrerName})`
              );
            }
            if (checkRes.transaction) {
              activateVerifiedMembership(
                checkRes.transaction,
                checkRes.membership?.expiryDate
              );
              setLastTransaction(checkRes.transaction);
              setExpiryDateStr(checkRes.membership?.expiryDate || '');
              setDaysRemainingNum(checkRes.membership?.daysRemaining || 365);
              setStep('success');
            }
          } else if (checkRes.status === 'EXPIRED') {
            clearQrTimers();
            setQrStatus('EXPIRED');
            setQrStatusNotice('QR Code expired. Click "Generate New QR Code".');
          }
        } catch (pollErr) {
          console.debug('[QR Auto-Poll]', pollErr);
        }
      }, 4000);
    }

    return () => {
      clearQrTimers();
    };
  }, [step, qrData, currentStudent, referralCodeInput, targetClass, targetBoard, selectedPlanSku]);

  if (!isOpen) return null;

  const activeCatalogItem: PlanCatalogItem = getPlanCatalogItem(selectedPlanSku);
  const targetClassInfo = getClassSubscriptionInfo(currentStudent, targetClass, undefined, targetBoard);
  const planInfo = getStudentPlanInfo(currentStudent, undefined, targetClass, targetBoard);

  // Format countdown seconds into MM:SS
  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Option 1: Create Server LIVE Order & Immediately Open Official Razorpay Checkout
  const handleInitiateCheckout = async (skuOverride?: PlanSkuId) => {
    const skuToBuy: PlanSkuId = skuOverride || selectedPlanSku;
    const itemToBuy = getPlanCatalogItem(skuToBuy);
    if (skuOverride && skuOverride !== selectedPlanSku) {
      setSelectedPlanSku(skuOverride);
    }

    if (isCheckoutBusyRef.current) {
      console.info('[Razorpay] Ignoring duplicate click while order/checkout is initializing.');
      return;
    }

    setErrorMsg('');
    setFailedOrderId('');
    setIsDomainMismatchError(false);

    if (!currentStudent || !currentStudent.id) {
      const authErr = `Please sign in to your Student or Teacher account before purchasing ${itemToBuy.title} (₹${itemToBuy.amountInr}).`;
      setErrorMsg(authErr);
      setStep('failed');
      return;
    }

    isCheckoutBusyRef.current = true;
    const activeRefCode = (
      referralCodeInput.trim() ||
      currentStudent?.referredByCode ||
      ''
    ).toUpperCase();

    try {
      const [scriptReady, orderData] = await Promise.all([
        loadRazorpayScript(),
        createRazorpayOrder(currentStudent, 'premium', activeRefCode, targetClass, targetBoard, skuToBuy)
      ]);

      if (!scriptReady || typeof (window as any).Razorpay !== 'function') {
        isCheckoutBusyRef.current = false;
        setIsCreatingOrder(false);
        const sdkErr =
          'Razorpay Checkout script (checkout.razorpay.com) failed to load. Please check your internet connection or disable any ad-blocker and click Retry Payment.';
        setErrorMsg(sdkErr);
        setFailedOrderId(orderData?.orderId || '');
        setStep('failed');
        return;
      }

      if (orderData.mode) {
        setGatewayMode(orderData.mode);
      }

      await launchRazorpayCheckout({
        orderData,
        student: currentStudent,
        planId: 'premium',
        planSku: skuToBuy,
        selectedBoard: targetBoard,
        selectedClass: targetClass,
        referralCode: activeRefCode || undefined,
        onCheckoutOpened: () => {
          isCheckoutBusyRef.current = false;
          setIsCreatingOrder(false);
        },
        onVerifyingStart: () => {
          isCheckoutBusyRef.current = true;
          setIsCreatingOrder(false);
          setStep('processing');
        },
        onSuccess: (verifyResult) => {
          isCheckoutBusyRef.current = false;
          setIsCreatingOrder(false);
          if (verifyResult.success && verifyResult.transaction) {
            if (!verifyResult.alreadyProcessed) {
              activateVerifiedMembership(
                verifyResult.transaction,
                verifyResult.membership?.expiryDate
              );
            }
            if (verifyResult.referral?.credited) {
              setReferralCreditedNotice(
                `₹5 Referral Cashback Credited! (Referrer: ${verifyResult.referral.referrerName})`
              );
            }
            setLastTransaction(verifyResult.transaction);
            setExpiryDateStr(verifyResult.membership?.expiryDate || '');
            setDaysRemainingNum(verifyResult.membership?.daysRemaining || 365);
            setStep('success');
          } else {
            const verifyErr =
              verifyResult.error ||
              'Payment signature verification failed on server. Subscription was not activated.';
            setErrorMsg(verifyErr);
            setFailedOrderId(orderData.orderId);
            setStep('failed');
          }
        },
        onFailure: (errMessage, metadata) => {
          isCheckoutBusyRef.current = false;
          setIsCreatingOrder(false);
          setErrorMsg(errMessage);
          setFailedOrderId(metadata?.orderId || orderData.orderId || '');
          setIsDomainMismatchError(Boolean(metadata?.isDomainMismatch));
          setStep('failed');
        }
      });
    } catch (err: any) {
      isCheckoutBusyRef.current = false;
      setIsCreatingOrder(false);
      const message =
        err?.message ||
        'Could not create Razorpay LIVE payment order. Please check your internet connection and try again.';
      setErrorMsg(message);
      setStep('failed');
    }
  };

  // Option 2: Generate Dynamic Razorpay UPI QR Code
  const handleInitiateQrPayment = async (skuOverride?: PlanSkuId) => {
    const skuToBuy: PlanSkuId = skuOverride || selectedPlanSku;
    const itemToBuy = getPlanCatalogItem(skuToBuy);
    if (skuOverride && skuOverride !== selectedPlanSku) {
      setSelectedPlanSku(skuOverride);
    }

    if (isCheckoutBusyRef.current) return;
    setErrorMsg('');
    setFailedOrderId('');
    setIsDomainMismatchError(false);

    if (!currentStudent || !currentStudent.id) {
      setErrorMsg(`Please sign in to your Student or Teacher account before purchasing ${itemToBuy.title} (₹${itemToBuy.amountInr}).`);
      setStep('failed');
      return;
    }

    isCheckoutBusyRef.current = true;
    setIsCreatingOrder(true);
    setQrStatusNotice('Contacting Razorpay Live QR Code API...');
    const activeRefCode = (
      referralCodeInput.trim() ||
      currentStudent?.referredByCode ||
      ''
    ).toUpperCase();

    try {
      const data = await createRazorpayQrCode(
        currentStudent,
        'premium',
        activeRefCode,
        targetClass,
        targetBoard,
        skuToBuy
      );
      setQrData(data);
      setQrCountdown(data.expiresInSeconds || 600);
      setQrStatus('WAITING');
      const scopeDesc = itemToBuy.requiresBoardClass
        ? `${getBoardShortLabel(targetBoard)} • ${targetClass}`
        : itemToBuy.shortTitle;
      setQrStatusNotice(`Scan using Google Pay, PhonePe, Paytm or any UPI App to pay ₹${itemToBuy.amountInr} for ${scopeDesc}.`);
      setStep('qr_code');
      isCheckoutBusyRef.current = false;
      setIsCreatingOrder(false);
    } catch (err: any) {
      isCheckoutBusyRef.current = false;
      setIsCreatingOrder(false);
      const msg = err?.message || 'Could not generate Razorpay UPI QR code.';
      setErrorMsg(msg);
      setStep('failed');
    }
  };

  // Manual Check Payment Status button for QR Code
  const handleManualCheckQrStatus = async () => {
    if (!qrData || !currentStudent || isCheckingQr) return;
    setIsCheckingQr(true);
    setQrStatusNotice(
      `Checking ₹${activeCatalogItem.amountInr} payment (${activeCatalogItem.shortTitle}) with Razorpay & Bank...`
    );
    try {
      const checkRes = await checkRazorpayQrStatus(
        qrData.qrId,
        currentStudent,
        'premium',
        referralCodeInput.trim(),
        targetClass,
        targetBoard,
        selectedPlanSku
      );
      if (checkRes.paid && checkRes.status === 'PAID') {
        clearQrTimers();
        setQrStatus('PAID');
        if ((checkRes as any).referral?.credited) {
          setReferralCreditedNotice(
            `₹5 Referral Cashback Credited! (Referrer: ${(checkRes as any).referral.referrerName})`
          );
        }
        if (checkRes.transaction) {
          activateVerifiedMembership(
            checkRes.transaction,
            checkRes.membership?.expiryDate
          );
          setLastTransaction(checkRes.transaction);
          setExpiryDateStr(checkRes.membership?.expiryDate || '');
          setDaysRemainingNum(checkRes.membership?.daysRemaining || 365);
          setStep('success');
        }
      } else if (checkRes.status === 'EXPIRED') {
        setQrStatus('EXPIRED');
        setQrStatusNotice('QR code has expired. Please click "Generate New QR Code".');
      } else {
        setQrStatusNotice('Payment not yet detected. If amount was debited, it will update automatically in a few seconds.');
      }
    } catch (err: any) {
      setQrStatusNotice(err?.message || 'Failed to check status. Retrying automatically...');
    } finally {
      setIsCheckingQr(false);
    }
  };

  const resetModal = () => {
    clearQrTimers();
    isCheckoutBusyRef.current = false;
    setIsCreatingOrder(false);
    setStep('select');
    setErrorMsg('');
    setFailedOrderId('');
    setIsDomainMismatchError(false);
    setQrData(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-3 sm:p-4 overflow-y-auto overscroll-contain">
      <div className="bg-white rounded-3xl max-w-4xl w-full border border-amber-200 shadow-2xl overflow-hidden m-auto my-auto animate-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OFFICIAL SUBSCRIPTION PLANS • {gatewayMode} GATEWAY
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold mt-0.5">
                Champion Learning Subscription Plans
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={resetModal}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-8 max-h-[82vh] overflow-y-auto">
          {!currentStudent && (
            <div className="mb-6 p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5">
                <p className="text-xs font-black uppercase tracking-wider text-indigo-800">
                  Registration Required Before Purchase
                </p>
                <p className="text-xs font-semibold text-slate-700">
                  Sign in or create a free Student or Teacher account first so your purchased Classes 1–10, Scholarship, TET, CTET, or Bundle plan links permanently to your profile.
                </p>
              </div>
              {onRequestAuth && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      resetModal();
                      onRequestAuth('login');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white hover:bg-indigo-100 text-indigo-900 border border-indigo-200 font-black text-xs cursor-pointer"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      resetModal();
                      onRequestAuth('register');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer"
                  >
                    Register Free
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Plan Category Group Switcher (Classes 1-10 | TET & CTET Plans | Scholarship Plans) */}
          {step === 'select' && (
            <div className="mb-5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setPlanGroupTab('classes');
                  setSelectedPlanSku('BOARD_CLASS');
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  planGroupTab === 'classes'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-amber-400" />
                <span>Classes 1–10 (₹99)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlanGroupTab('tet_ctet');
                  if (tetCtetDuration === '6m') {
                    setSelectedPlanSku('TET_6M');
                  } else {
                    setSelectedPlanSku('TET_1Y');
                  }
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  planGroupTab === 'tet_ctet'
                    ? 'bg-indigo-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>TET &amp; CTET Plans (6M / 1Y)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlanGroupTab('scholarship');
                  setSelectedPlanSku('SCHOLARSHIP_COMBO');
                }}
                className={`py-2.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  planGroupTab === 'scholarship'
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-white'
                }`}
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Scholarship (Std 4 &amp; 7)</span>
              </button>
            </div>
          )}

          {/* Board & Class 1 to 10 Subscription Selector Strip */}
          {currentStudent && step === 'select' && planGroupTab === 'classes' && (
            <div className="mb-5 p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-indigo-700" />
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-950">
                    Select Board &amp; Class to Activate, Switch, or Renew (Maharashtra • CBSE • ICSE)
                  </span>
                </div>
                <span className="text-[11px] font-bold text-indigo-800">
                  Selected: <strong>{getBoardShortLabel(targetBoard)} • {targetClass}</strong> (₹99 / 365 Days each)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {BOARD_META_LIST.map((bMeta) => {
                  const isTargetB = targetBoard === bMeta.id;
                  return (
                    <button
                      key={bMeta.id}
                      type="button"
                      onClick={() => setTargetBoard(bMeta.id)}
                      className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        isTargetB
                          ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-black flex items-center gap-1.5">
                          <span>{bMeta.icon}</span>
                          <span>{getBoardShortLabel(bMeta.id)}</span>
                        </span>
                        {isTargetB && (
                          <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950">
                            Selected
                          </span>
                        )}
                      </div>
                      <span className={`text-[10px] block truncate mt-0.5 ${isTargetB ? 'text-slate-300' : 'text-slate-500'}`}>
                        {bMeta.affiliationLabel}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {ALL_CLASS_LEVELS.map((cls) => {
                  const cInfo = getClassSubscriptionInfo(currentStudent, cls, undefined, targetBoard);
                  const isTarget = cls === targetClass;
                  return (
                    <button
                      key={cls}
                      type="button"
                      onClick={() => setTargetClass(cls)}
                      className={`p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        isTarget
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm ring-2 ring-indigo-300'
                          : cInfo.isPaidActive
                          ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-emerald-300'
                          : cInfo.isFreeBase
                          ? 'bg-white hover:bg-indigo-50 text-slate-800 border-indigo-300'
                          : cInfo.isExpired
                          ? 'bg-rose-50 hover:bg-rose-100 text-rose-900 border-rose-300'
                          : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-black">{cls}</span>
                        {cInfo.isPaidActive ? (
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${isTarget ? 'bg-emerald-400 text-slate-950' : 'bg-emerald-200 text-emerald-900'}`}>
                            Paid
                          </span>
                        ) : cInfo.isFreeBase ? (
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${isTarget ? 'bg-white/25 text-white' : 'bg-indigo-100 text-indigo-800'}`}>
                            Free
                          </span>
                        ) : cInfo.isExpired ? (
                          <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${isTarget ? 'bg-rose-400 text-slate-950' : 'bg-rose-200 text-rose-900'}`}>
                            Expired
                          </span>
                        ) : (
                          <Lock className={`w-3 h-3 ${isTarget ? 'text-amber-300' : 'text-slate-400'}`} />
                        )}
                      </div>
                      <span className={`text-[10px] block truncate mt-0.5 font-semibold ${isTarget ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {cInfo.isPaidActive
                          ? cInfo.daysRemainingDisplay
                          : cInfo.isFreeBase
                          ? 'Free Base'
                          : cInfo.isExpired
                          ? 'Renew ₹99'
                          : 'Locked • ₹99'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Active Subscription Banner (Shown when browsing Classes 1–10 tab) */}
          {currentStudent && planGroupTab === 'classes' && (
            <div className="mb-6 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currentStudent.avatar || '🌟'}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-500">
                      {currentStudent.accountRole === 'teacher' ? 'Teacher' : 'Student'}:{' '}
                      <strong className="text-slate-900">{currentStudent.name}</strong> ({getBoardShortLabel(targetBoard)} • Standard {formatStandardOrdinal(targetClass)})
                    </p>
                    <p className="text-sm font-black text-indigo-950">
                      Status for {getBoardShortLabel(targetBoard)} • {targetClass}:{' '}
                      <span className={targetClassInfo.isLocked && !targetClassInfo.isExpired ? 'text-amber-700' : targetClassInfo.isExpired ? 'text-rose-700' : 'text-emerald-700'}>
                        {targetClassInfo.status === 'LOCKED'
                          ? `LOCKED — Purchase ₹99 (365 Days) to Unlock`
                          : planInfo.planDisplayName}
                      </span>
                      {' • '}
                      <span className="text-xs font-bold text-slate-600">
                        {targetClassInfo.isPaidActive
                          ? `Purchased: ${planInfo.purchasedDisplay} • Expires: ${planInfo.expiryDisplay} • ${planInfo.daysRemainingDisplay}`
                          : targetClassInfo.daysRemainingDisplay}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {targetClassInfo.isAccessible && (currentStudent.classLevel !== targetClass || (currentStudent.board || 'Maharashtra') !== targetBoard) && (
                    <button
                      type="button"
                      onClick={async () => {
                        await switchActiveClass(targetClass, targetBoard);
                        onSwitchActiveClass?.(targetClass, targetBoard);
                        resetModal();
                      }}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black cursor-pointer shadow-xs"
                    >
                      Switch to {getBoardShortLabel(targetBoard)} {targetClass} →
                    </button>
                  )}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-black border ${
                      targetClassInfo.isExpired
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : targetClassInfo.status === 'LOCKED'
                        ? 'bg-amber-100 text-amber-900 border-amber-300'
                        : planInfo.isExpiringToday
                        ? 'bg-amber-100 text-amber-900 border-amber-400'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {targetClassInfo.isExpired
                      ? '● EXPIRED — RENEW ₹99'
                      : targetClassInfo.status === 'LOCKED'
                      ? '● LOCKED — PAY ₹99 TO UNLOCK'
                      : planInfo.isExpiringToday
                      ? '● EXPIRING TODAY — RENEW FOR +365 DAYS'
                      : `● ACTIVE (${targetClassInfo.isPaidActive ? planInfo.daysRemainingDisplay : 'Free Base'})`}
                  </span>
                </div>
              </div>

              {targetClassInfo.isPaidActive && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 text-xs font-black flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{getPremiumActivatedBannerMessage(targetClass, targetBoard)}</span>
                </div>
              )}

              {targetClassInfo.status === 'LOCKED' && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 text-xs font-bold flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>
                    <strong>{getBoardShortLabel(targetBoard)} • {targetClass}</strong> stays locked independently until its ₹99 payment is verified. Your existing active boards, classes &amp; exam categories remain unaffected.
                  </span>
                </div>
              )}

              {targetClassInfo.isExpired && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-xs font-bold text-rose-900">
                    ⚠️ Your <strong>{getBoardShortLabel(targetBoard)} • {targetClass}</strong> 365-day subscription expired ({targetClassInfo.expiryDisplay}). Renew below for ₹99 (365 Days) — your other active classes stay unaffected!
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={isCreatingOrder}
                      onClick={() => handleInitiateCheckout('BOARD_CLASS')}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-black text-xs cursor-pointer shadow-xs flex items-center gap-1.5"
                    >
                      <span>Renew {targetClass} (₹99) →</span>
                    </button>
                    <button
                      type="button"
                      disabled={isCreatingOrder}
                      onClick={() => handleInitiateQrPayment('BOARD_CLASS')}
                      className="px-3 py-1.5 rounded-lg bg-indigo-900 hover:bg-indigo-950 text-white font-black text-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5 text-amber-300" />
                      <span>Scan UPI QR (₹99)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ==================== STEP 1: SELECT PLAN ==================== */}
          {step === 'select' && (
            <div className="space-y-6">
              {/* Order Creation Loading Banner */}
              {isCreatingOrder && (
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center gap-3 text-indigo-950 animate-in fade-in duration-150">
                  <Loader2 className="w-5 h-5 text-indigo-600 animate-spin shrink-0" />
                  <span className="text-xs sm:text-sm font-black">
                    Generating Razorpay {gatewayMode} payment request for {activeCatalogItem.title} – ₹{activeCatalogItem.amountInr} ({activeCatalogItem.validityDays} Days)...
                  </span>
                </div>
              )}

              {/* TET & CTET PLANS (6 MONTHS & 1 YEAR) */}
              {planGroupTab === 'tet_ctet' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-black text-indigo-950">
                        Teacher Eligibility Test Plans: MAHA TET &amp; CTET
                      </p>
                      <p className="text-slate-600 font-medium">
                        Choose 6 Months or 1 Year validity. All plans include official CBT mock test simulators, detailed explanations &amp; bilingual questions.
                      </p>
                    </div>
                    {currentStudent && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200">
                        Account: {currentStudent.name} ({currentStudent.accountRole === 'teacher' ? 'Teacher' : currentStudent.classLevel})
                      </span>
                    )}
                  </div>

                  {/* Duration Toggle: 6 Months vs 1 Year */}
                  <div className="flex items-center justify-center gap-2 p-1 rounded-2xl bg-slate-100 border border-slate-200 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setTetCtetDuration('6m');
                        if (selectedPlanSku === 'TET_1Y') setSelectedPlanSku('TET_6M');
                        else if (selectedPlanSku === 'CTET_1Y') setSelectedPlanSku('CTET_6M');
                        else if (selectedPlanSku === 'TET_CTET_COMBO_1Y') setSelectedPlanSku('TET_CTET_COMBO_6M');
                        else setSelectedPlanSku('TET_6M');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        tetCtetDuration === '6m'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span>6 MONTH PLANS</span>
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950">
                        SAVE 50%
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setTetCtetDuration('1y');
                        if (selectedPlanSku === 'TET_6M') setSelectedPlanSku('TET_1Y');
                        else if (selectedPlanSku === 'CTET_6M') setSelectedPlanSku('CTET_1Y');
                        else if (selectedPlanSku === 'TET_CTET_COMBO_6M') setSelectedPlanSku('TET_CTET_COMBO_1Y');
                        else setSelectedPlanSku('TET_1Y');
                      }}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                        tetCtetDuration === '1y'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      <span>1 YEAR PLANS</span>
                      <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-emerald-400 text-slate-950">
                        SAVE 50%
                      </span>
                    </button>
                  </div>

                  {/* 3 Cards Grid for 6M or 1Y */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {PLAN_CATALOG_LIST.filter((item) => {
                      if (tetCtetDuration === '6m') {
                        return item.sku === 'TET_6M' || item.sku === 'CTET_6M' || item.sku === 'TET_CTET_COMBO_6M';
                      }
                      return item.sku === 'TET_1Y' || item.sku === 'CTET_1Y' || item.sku === 'TET_CTET_COMBO_1Y';
                    }).map((item) => {
                      const isSelected = selectedPlanSku === item.sku;
                      const unlockedAlready =
                        item.unlockedCategories.length > 0 &&
                        item.unlockedCategories.every((catId) => hasCategoryAccess(currentStudent, catId));
                      const catStatusSummary = item.unlockedCategories
                        .map((catId) => {
                          const info = getCategorySubscriptionInfo(currentStudent, catId);
                          return info.isPaidActive ? `${info.label}: Active (${info.daysRemainingDisplay})` : null;
                        })
                        .filter(Boolean);

                      return (
                        <div
                          key={item.sku}
                          onClick={() => setSelectedPlanSku(item.sku)}
                          className={`p-5 rounded-3xl border-2 flex flex-col justify-between gap-4 transition-all cursor-pointer relative ${
                            isSelected
                              ? 'border-amber-500 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 shadow-lg ring-2 ring-amber-300'
                              : unlockedAlready
                              ? 'border-emerald-300 bg-emerald-50/40 hover:border-emerald-400'
                              : 'border-slate-200 bg-white hover:border-indigo-300'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-700">
                                {item.validityLabel}
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                                {item.discountBadge}
                              </span>
                            </div>

                            <div>
                              <h3 className="text-base font-black text-slate-900">{item.title}</h3>
                              <p className="text-xs text-slate-600 mt-0.5">{item.subtitle}</p>
                            </div>

                            {/* Prominent Original vs Discounted Price Display */}
                            <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-slate-400 line-through">
                                    ₹{item.originalAmountInr}
                                  </span>
                                  <span className="text-2xl sm:text-3xl font-black text-amber-600">
                                    ₹{item.amountInr}
                                  </span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 block">
                                  Validity: {item.validityLabel} ({item.validityDays} Days)
                                </span>
                              </div>
                              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                50% OFF
                              </span>
                            </div>

                            <ul className="space-y-1.5 text-xs text-slate-700 font-semibold">
                              {item.highlights.map((hl) => (
                                <li key={hl} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>

                            {catStatusSummary.length > 0 && (
                              <div className="p-2.5 rounded-xl bg-emerald-100/80 border border-emerald-300 text-[11px] font-bold text-emerald-900">
                                {catStatusSummary.join(' · ')}
                              </div>
                            )}
                          </div>

                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            {currentStudent ? (
                              <>
                                <button
                                  type="button"
                                  disabled={isCreatingOrder}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    void handleInitiateCheckout(item.sku);
                                  }}
                                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-sm cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                                >
                                  <CreditCard className="w-3.5 h-3.5" />
                                  <span>BUY NOW (₹{item.amountInr})</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={isCreatingOrder}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    void handleInitiateQrPayment(item.sku);
                                  }}
                                  className="w-full py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-[11px] border border-amber-200 cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <QrCode className="w-3 h-3 text-amber-700" />
                                  <span>Pay via UPI QR (₹{item.amountInr})</span>
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetModal();
                                  onRequestAuth?.('login');
                                }}
                                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer"
                              >
                                Sign In to Unlock
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* SCHOLARSHIP PLANS (CLASS 4 & CLASS 7) */}
              {planGroupTab === 'scholarship' && (
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div>
                      <p className="font-black text-amber-950">
                        MSCE Pune Scholarship Examination (Std 4th PSE &amp; Std 7th UPS)
                      </p>
                      <p className="text-slate-600 font-medium">
                        Two options available: included free with Class purchase, or get the complete 4th + 7th Combined Plan.
                      </p>
                    </div>
                    {currentStudent && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-lg border border-emerald-200">
                        Account: {currentStudent.name} ({currentStudent.accountRole === 'teacher' ? 'Teacher' : currentStudent.classLevel})
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* OPTION A: INCLUDED WITH CLASS PURCHASE */}
                    <div className="p-5 sm:p-6 rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/60 via-white to-blue-50/40 flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 text-indigo-900">
                            Option A
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                            INCLUDED FREE
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          Included with Class 4 or Class 7 Plan
                        </h3>
                        <p className="text-xs text-slate-600 mt-1">
                          Class 4 or Class 7 students receive full respective Scholarship access at ₹0 extra fee when purchasing their Class Plan.
                        </p>

                        <div className="my-4 p-3 rounded-2xl bg-white border border-indigo-200">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-400 line-through">₹199</span>
                            <span className="text-2xl font-black text-indigo-900">₹99</span>
                            <span className="text-xs font-bold text-slate-500">/ 12 Months (Per Class)</span>
                          </div>
                          <span className="text-[11px] font-bold text-emerald-700 block mt-0.5">
                            ✓ Scholarship Access is 100% Included in the ₹99 Class Fee!
                          </span>
                        </div>

                        <ul className="space-y-2 text-xs text-slate-700 font-semibold">
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Class 4 Students:</strong> Automatic access to all 25 4th Std MSCE Full Mocks + 10 Practice Sets (PSE).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span><strong>Class 7 Students:</strong> Automatic access to all 25 7th Std MSCE Full Mocks + 10 Practice Sets (UPS).</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Marathi, English &amp; Hindi Mediums supported.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>Full curriculum access for your class (All Subjects, Notes, Worksheets &amp; Quizzes) also unlocked!</span>
                          </li>
                        </ul>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setPlanGroupTab('classes');
                          if (currentStudent?.classLevel === 'Class 7') {
                            setTargetClass('Class 7');
                          } else {
                            setTargetClass('Class 4');
                          }
                          setSelectedPlanSku('BOARD_CLASS');
                        }}
                        className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer shadow-sm transition-all"
                      >
                        Select Class 4 or 7 in Classes Tab (₹99) →
                      </button>
                    </div>

                    {/* OPTION B: PLAN 7 - SCHOLARSHIP COMBO (CLASS 4 + CLASS 7) */}
                    {(() => {
                      const item = PLAN_CATALOG.SCHOLARSHIP_COMBO;
                      const isSelected = selectedPlanSku === item.sku;
                      const unlockedAlready =
                        hasCategoryAccess(currentStudent, 'scholarship_4th') &&
                        hasCategoryAccess(currentStudent, 'scholarship_7th');

                      return (
                        <div
                          onClick={() => setSelectedPlanSku(item.sku)}
                          className={`p-5 sm:p-6 rounded-3xl border-2 flex flex-col justify-between gap-4 transition-all cursor-pointer relative ${
                            isSelected
                              ? 'border-amber-500 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 shadow-lg ring-2 ring-amber-300'
                              : unlockedAlready
                              ? 'border-emerald-300 bg-emerald-50/40 hover:border-emerald-400'
                              : 'border-slate-200 bg-white hover:border-amber-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-900 text-amber-300">
                                Option B • Plan 7
                              </span>
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                                {item.discountBadge}
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-black text-slate-900">
                              {item.title}
                            </h3>
                            <p className="text-xs text-slate-600 mt-1">
                              {item.subtitle}
                            </p>

                            {/* Pricing Block with Strikethrough & Highlight */}
                            <div className="my-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-center justify-between gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-slate-400 line-through">
                                    ₹{item.originalAmountInr}
                                  </span>
                                  <span className="text-2xl sm:text-3xl font-black text-amber-600">
                                    ₹{item.amountInr}
                                  </span>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 block">
                                  Validity: {item.validityLabel} ({item.validityDays} Days)
                                </span>
                              </div>
                              <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                                50% OFF
                              </span>
                            </div>

                            <ul className="space-y-1.5 text-xs text-slate-700 font-semibold mb-4">
                              {item.highlights.map((hl) => (
                                <li key={hl} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  <span>{hl}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="pt-3 border-t border-slate-100 space-y-2">
                            {currentStudent ? (
                              <>
                                <button
                                  type="button"
                                  disabled={isCreatingOrder}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    void handleInitiateCheckout(item.sku);
                                  }}
                                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                                >
                                  <CreditCard className="w-3.5 h-3.5" />
                                  <span>BUY NOW (₹{item.amountInr})</span>
                                </button>
                                <button
                                  type="button"
                                  disabled={isCreatingOrder}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    void handleInitiateQrPayment(item.sku);
                                  }}
                                  className="w-full py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-950 font-bold text-[11px] border border-amber-200 cursor-pointer flex items-center justify-center gap-1"
                                >
                                  <QrCode className="w-3 h-3 text-amber-700" />
                                  <span>Pay via UPI QR (₹{item.amountInr})</span>
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  resetModal();
                                  onRequestAuth?.('login');
                                }}
                                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs cursor-pointer"
                              >
                                Sign In to Unlock
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {planGroupTab === 'classes' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PLAN 1: FREE PLAN – ₹0 – Lifetime */}
                <div
                  className={`p-6 rounded-3xl border-2 flex flex-col justify-between transition-all ${
                    targetClassInfo.isFreeBase && !targetClassInfo.isPaidActive
                      ? 'border-emerald-500 bg-emerald-50/30 shadow-sm'
                      : 'border-slate-200 bg-slate-50/60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        FREE DEMO ACCESS
                      </span>
                      <span className="text-xs font-bold text-emerald-700">
                        {targetClassInfo.isFreeBase ? `Standard ${formatStandardOrdinal(targetClass)}` : 'Base Class Only'}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900">
                      FREE PLAN – ₹0 – Lifetime
                    </h3>
                    <div className="mt-2 mb-4 flex items-baseline gap-1">
                      <span className="text-4xl font-black text-slate-900">₹0</span>
                      <span className="text-xs text-emerald-700 font-black">/ Lifetime</span>
                    </div>

                    <p className="text-xs font-bold text-slate-600 mb-3">
                      Free demo access applies to your base registered board &amp; class ({getBoardShortLabel(currentStudent?.primaryBoard || currentStudent?.board || targetBoard)} • {currentStudent?.primaryClassLevel || currentStudent?.classLevel || targetClass}):
                    </p>

                    <ul className="space-y-2.5 text-xs text-slate-700 font-bold mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>2 Free Demo Worksheets: 1 English &amp; 1 Mathematics (Base Board &amp; Class)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>Brain Puzzles (Logic, Riddles &amp; Brain Games) &amp; Sudoku</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>English &amp; Mathematics Subject Quizzes &amp; Preview Study Notes</span>
                      </li>
                      <li className="flex items-start gap-2 text-slate-400">
                        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>All Other Worksheets for {getBoardShortLabel(targetBoard)} Standard {formatStandardOrdinal(targetClass)} Locked</span>
                      </li>
                      <li className="flex items-start gap-2 text-slate-400">
                        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Other Subjects, Stories, Drawing, Cricket &amp; Scholarship Locked</span>
                      </li>
                      <li className="flex items-start gap-2 text-slate-400">
                        <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>Other Boards (CBSE/ICSE/MH) &amp; Classes (₹99 Each) Locked Until Paid Activation</span>
                      </li>
                    </ul>
                  </div>

                  <div className="w-full py-3 rounded-2xl bg-emerald-100 text-emerald-900 font-black text-xs text-center border border-emerald-300">
                    {targetClassInfo.isFreeBase && !targetClassInfo.isPaidActive
                      ? `✓ Active on Base (${getBoardShortLabel(targetBoard)} • ${targetClass})`
                      : !targetClassInfo.isFreeBase
                      ? `🔒 Not Included for ${getBoardShortLabel(targetBoard)} ${targetClass} — Pay ₹99`
                      : '✓ Base Plan Included Forever'}
                  </div>
                </div>

                {/* PLAN 2: PREMIUM PLAN – ₹99 – 365 Days (1 Year) */}
                <div className="p-6 rounded-3xl border-2 border-amber-500 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/60 shadow-xl flex flex-col justify-between relative transition-all">
                  <div className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-[10px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {getBoardShortLabel(targetBoard).toUpperCase()} • STD {formatStandardOrdinal(targetClass).toUpperCase()} UNLOCK
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-900">
                        BOARD &amp; CLASS ANNUAL PLAN
                      </span>
                      <span className="text-xs font-bold text-amber-800">12 Months (365 Days) Validity</span>
                    </div>

                    <h3 className="text-lg font-black text-slate-900">
                      Class Annual Plan ({getBoardShortLabel(targetBoard)} • Std {formatStandardOrdinal(targetClass)})
                    </h3>

                    {/* Prominent Original vs Discounted Price Display */}
                    <div className="my-3.5 p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/90 flex items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-slate-400 line-through">₹199</span>
                          <span className="text-3xl font-black text-amber-600">₹99</span>
                        </div>
                        <span className="text-xs font-bold text-slate-600">
                          Validity: 12 Months (365 Days) • {getBoardShortLabel(targetBoard)} {targetClass}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black uppercase tracking-wider shadow-xs">
                        SAVE 50%
                      </span>
                    </div>

                    {(targetClass === 'Class 4' || targetClass === 'Class 7') && (
                      <div className="mb-3.5 p-3 rounded-xl bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-300 text-amber-950 text-xs font-black flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>
                          {targetClass === 'Class 4'
                            ? '✓ 4th Std MSCE Scholarship Exam (PSE) Included Free (₹0 Extra Fee)!'
                            : '✓ 7th Std MSCE Scholarship Exam (UPS) Included Free (₹0 Extra Fee)!'}
                        </span>
                      </div>
                    )}

                    <p className="text-xs font-bold text-amber-900 mb-3">
                      Unlock all worksheets, study materials &amp; subjects for {getBoardShortLabel(targetBoard)} Standard {formatStandardOrdinal(targetClass)}:
                    </p>

                    <ul className="space-y-2 text-xs text-slate-800 font-bold mb-5">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Unlock All Worksheets &amp; Chapter Study Notes for {getBoardShortLabel(targetBoard)} Std {formatStandardOrdinal(targetClass)}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Unlock All {getBoardShortLabel(targetBoard)} Curriculum Subjects for {targetClass} (4 Levels)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>All Quizzes, Shivaji Stories (50), Other Stories (45) &amp; Drawing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Cricket Champions Hub, Scholarship &amp; AI Learning Academy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>Official Certificates, Leaderboard &amp; ₹5 Referral Cashback</span>
                      </li>
                      <li className="flex items-start gap-2 text-indigo-800">
                        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>Independent 365-Day Validity Linked to {getBoardShortLabel(targetBoard)} {targetClass} on Your Account</span>
                      </li>
                    </ul>
                  </div>

                  {currentStudent ? (
                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        disabled={isCreatingOrder}
                        onClick={() => handleInitiateCheckout()}
                        className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-60 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>BUY NOW (₹99)</span>
                      </button>
                      <button
                        type="button"
                        disabled={isCreatingOrder}
                        onClick={() => handleInitiateQrPayment()}
                        className="w-full py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs border border-amber-300 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <QrCode className="w-3.5 h-3.5 text-amber-800" />
                        <span>Pay via UPI QR Code (₹99)</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-2">
                      <button
                        type="button"
                        onClick={() => {
                          resetModal();
                          onRequestAuth?.('register');
                        }}
                        className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition-all cursor-pointer"
                      >
                        Register Free Account to Unlock ₹99 Plan
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          resetModal();
                          onRequestAuth?.('login');
                        }}
                        className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition-all cursor-pointer"
                      >
                        Already Registered? Sign In
                      </button>
                    </div>
                  )}
                </div>
              </div>
              )}

              {/* Two Payment Options Bar: Online Checkout vs Dynamic UPI QR */}
              {currentStudent && (
                <div className="p-5 rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 text-white shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                        SELECTED PLAN: {activeCatalogItem.title.toUpperCase()} (₹{activeCatalogItem.amountInr} – {activeCatalogItem.validityDays} Days)
                      </span>
                      <h4 className="text-base sm:text-lg font-extrabold mt-0.5">
                        Choose Your Payment Method (₹{activeCatalogItem.amountInr})
                      </h4>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      1 Year (365 Days) Validity • Instant Activation
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {/* Option A: Razorpay Online Checkout */}
                    <button
                      type="button"
                      disabled={isCreatingOrder}
                      onClick={() => handleInitiateCheckout()}
                      className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:opacity-60 text-slate-950 font-black text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5"
                    >
                      {isCreatingOrder ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Opening Checkout...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>Pay Online (Razorpay Checkout) – ₹{activeCatalogItem.amountInr}</span>
                        </>
                      )}
                    </button>

                    {/* Option B: Razorpay Live Dynamic UPI QR Code */}
                    <button
                      type="button"
                      disabled={isCreatingOrder}
                      onClick={() => handleInitiateQrPayment()}
                      className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:opacity-60 text-slate-950 font-black text-sm shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2.5"
                    >
                      <QrCode className="w-5 h-5 text-slate-950" />
                      <span>Pay with UPI QR Code – ₹{activeCatalogItem.amountInr}</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5 text-xs text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    <strong>Strict Payment Verification:</strong> Both Online Checkout &amp; UPI QR Codes are verified directly via Razorpay before activating your 1-year (365-day) plan.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-indigo-600" /> Google Pay</span>
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-indigo-600" /> PhonePe</span>
                  <span className="flex items-center gap-1"><Smartphone className="w-3.5 h-3.5 text-indigo-600" /> Paytm</span>
                  <span className="flex items-center gap-1"><CreditCard className="w-3.5 h-3.5 text-indigo-600" /> Cards/NetBanking</span>
                </div>
              </div>
            </div>
          )}

          {/* ==================== STEP 2: DYNAMIC UPI QR CODE PAYMENT SCREEN (₹99) ==================== */}
          {step === 'qr_code' && qrData && (
            <div className="max-w-md mx-auto py-4 space-y-5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Plans</span>
                </button>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  <Timer className="w-4 h-4 text-amber-600 animate-pulse" />
                  <span>Valid for: {formatCountdown(qrCountdown)}</span>
                </div>
              </div>

              {/* QR Code Container Card */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white shadow-2xl text-center space-y-4 border border-indigo-800">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                    RAZORPAY DYNAMIC UPI QR CODE • {activeCatalogItem.shortTitle.toUpperCase()} (₹{activeCatalogItem.amountInr})
                  </span>
                  <h3 className="text-xl font-black mt-0.5">
                    Scan &amp; Pay ₹{activeCatalogItem.amountInr} ({activeCatalogItem.requiresBoardClass ? `${getBoardShortLabel(targetBoard)} • ${targetClass}` : activeCatalogItem.shortTitle})
                  </h3>
                  <p className="text-xs text-indigo-200 mt-0.5">
                    Account: <strong>{currentStudent?.name}</strong> • Unlocking:{' '}
                    <strong>
                      {activeCatalogItem.requiresBoardClass
                        ? `${getBoardShortLabel(targetBoard)} ${targetClass}`
                        : formatCategoriesListLabel(activeCatalogItem.unlockedCategories) || activeCatalogItem.shortTitle}
                    </strong>{' '}
                    (365 Days Access)
                  </p>
                </div>

                {/* QR Code Graphic Box */}
                <div className="relative mx-auto w-56 h-56 p-3 bg-white rounded-3xl shadow-xl border-4 border-amber-400 flex items-center justify-center overflow-hidden">
                  {qrStatus === 'EXPIRED' ? (
                    <div className="text-center p-4 space-y-2 text-rose-600">
                      <AlertCircle className="w-10 h-10 mx-auto" />
                      <p className="text-xs font-extrabold text-slate-900">QR Code Expired</p>
                      <p className="text-[10px] text-slate-500">Validity period finished. Please generate a fresh code.</p>
                    </div>
                  ) : qrData.imageUrl ? (
                    <img
                      src={qrData.imageUrl}
                      alt={`Razorpay Dynamic UPI QR Code for ${activeCatalogItem.shortTitle}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-center p-4 space-y-2 text-indigo-950">
                      <QrCode className="w-16 h-16 mx-auto text-indigo-600 animate-pulse" />
                      <p className="text-xs font-black">Generating Live QR...</p>
                    </div>
                  )}
                </div>

                {/* Step-by-Step Payment Instructions */}
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-left text-[11px] text-indigo-100 space-y-1">
                  <p className="font-extrabold text-amber-300 uppercase tracking-wider text-[10px]">
                    Payment Instructions:
                  </p>
                  <p>1. Open Google Pay, PhonePe, Paytm, or BHIM on your phone.</p>
                  <p>2. Scan the dynamic QR code above and approve the ₹{activeCatalogItem.amountInr} payment.</p>
                  <p>3. Keep this screen open — your membership activates automatically upon verification.</p>
                </div>

                {/* Status Indicator */}
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-white/10 border border-white/20">
                    {qrStatus === 'WAITING' && (
                      <>
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <span className="text-amber-300">Pending Payment (₹{activeCatalogItem.amountInr}) — Waiting for Scan...</span>
                      </>
                    )}
                    {qrStatus === 'VERIFYING' && (
                      <>
                        <Loader2 className="w-3.5 h-3.5 text-blue-300 animate-spin" />
                        <span className="text-blue-300">Verifying Payment...</span>
                      </>
                    )}
                    {qrStatus === 'PAID' && (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Payment Successful!</span>
                      </>
                    )}
                    {qrStatus === 'EXPIRED' && (
                      <>
                        <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span className="text-rose-300">QR Code Expired</span>
                      </>
                    )}
                  </div>
                  {qrStatusNotice && (
                    <p className="text-[11px] text-indigo-200 font-medium">
                      {qrStatusNotice}
                    </p>
                  )}
                </div>

                {/* Supported UPI Apps Row */}
                <div className="pt-2 border-t border-white/10 flex items-center justify-center gap-4 text-[10px] text-indigo-200 font-bold">
                  <span>Google Pay</span>
                  <span>•</span>
                  <span>PhonePe</span>
                  <span>•</span>
                  <span>Paytm</span>
                  <span>•</span>
                  <span>BHIM</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5">
                {qrStatus === 'EXPIRED' ? (
                  <button
                    type="button"
                    onClick={() => handleInitiateQrPayment()}
                    className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Generate New QR Code (₹{activeCatalogItem.amountInr})</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isCheckingQr}
                    onClick={handleManualCheckQrStatus}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isCheckingQr ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Checking Status with Bank...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Check Payment Status</span>
                      </>
                    )}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleInitiateCheckout()}
                  className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-black text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                  <span>Switch to Razorpay Online Checkout (Card / NetBanking / UPI)</span>
                </button>
              </div>
            </div>
          )}

          {/* ==================== STEP 3: PROCESSING (SERVER SIGNATURE & CAPTURE VERIFICATION) ==================== */}
          {step === 'processing' && (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full border-4 border-indigo-200 border-t-indigo-600 animate-spin mx-auto" />
              <h3 className="text-lg font-display font-bold text-slate-900">
                Verifying Payment Signature &amp; Activating 365-Day Subscription...
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Confirming cryptographic payment signature and capture status with Razorpay &amp; Firebase for {activeCatalogItem.title} (₹{activeCatalogItem.amountInr}). Please do not close this window.
              </p>
            </div>
          )}

          {/* ==================== STEP 4: SUCCESS ==================== */}
          {step === 'success' && lastTransaction && (() => {
            const txCatalog = getPlanCatalogItem(lastTransaction.planSku || selectedPlanSku);
            const txCategories =
              lastTransaction.activatedCategories && lastTransaction.activatedCategories.length > 0
                ? lastTransaction.activatedCategories
                : txCatalog.unlockedCategories;
            const txAmount = lastTransaction.amount || txCatalog.amountInr;
            return (
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  PAYMENT VERIFIED &amp; SAVED TO FIREBASE
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 mt-2">
                  {txCatalog.title} Activated! (₹{txAmount}) 👑
                </h3>
                <div className="mt-3 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm max-w-lg mx-auto">
                  {txCategories.length > 0
                    ? `Unlocked Categories: ${formatCategoriesListLabel(txCategories)} (365 Days Full Access)`
                    : getPremiumActivatedBannerMessage(
                        (lastTransaction.selectedClass as ClassLevel) || targetClass,
                        (lastTransaction.selectedBoard as EducationBoard) || targetBoard
                      )}
                </div>
                {referralCreditedNotice && (
                  <p className="mt-2 inline-block px-3 py-1 rounded-xl bg-amber-100 text-amber-900 text-xs font-extrabold border border-amber-300">
                    🎁 {referralCreditedNotice}
                  </p>
                )}
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 text-left text-xs space-y-2.5 max-w-md mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-400">Receipt Number:</span>
                  <span className="font-mono font-bold text-slate-800">{lastTransaction.receiptNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Razorpay Order/QR ID:</span>
                  <span className="font-mono text-slate-700">{lastTransaction.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Razorpay Payment ID:</span>
                  <span className="font-mono text-slate-700">{lastTransaction.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Account Holder:</span>
                  <span className="font-bold text-slate-800">{lastTransaction.studentName}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-slate-400">Unlocked Scope:</span>
                  <span className="font-extrabold text-emerald-700 text-right">
                    {txCategories.length > 0
                      ? formatCategoriesListLabel(txCategories)
                      : `${getBoardShortLabel((lastTransaction.selectedBoard as EducationBoard) || targetBoard)} • Standard ${formatStandardOrdinal((lastTransaction.selectedClass as ClassLevel) || targetClass)} (${(lastTransaction.selectedClass as ClassLevel) || targetClass})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Activated Plan:</span>
                  <span className="font-bold text-indigo-700">
                    {txCatalog.shortTitle} (₹{txAmount} – 365 Days)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Amount Paid:</span>
                  <span className="font-extrabold text-emerald-600">₹{txAmount}.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Purchase Date (IST):</span>
                  <span className="font-bold text-slate-800">
                    {lastTransaction.membershipStartDate || planInfo.purchasedDateIso || 'Verified Today (IST)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Valid Until (Expiry Date IST):</span>
                  <span className="font-bold text-emerald-700">
                    {expiryDateStr || lastTransaction.membershipExpiryDate || '365 Days (1 Year)'} ({daysRemainingNum} Days Remaining)
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetModal}
                className="w-full max-w-md py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-all cursor-pointer shadow-md"
              >
                Go to My Unlocked Dashboard →
              </button>
            </div>
            );
          })()}

          {/* ==================== STEP 5: FAILED / CANCELLED ==================== */}
          {step === 'failed' && (
            <div className="py-6 text-center space-y-5">
              <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                  PAYMENT NOT COMPLETED • PLAN NOT ACTIVATED
                </span>
                <h3 className="text-xl font-display font-extrabold text-slate-900 mt-2">
                  Subscription Upgrade Was Not Activated
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 max-w-md mx-auto leading-relaxed font-medium">
                  {errorMsg || `Your payment could not be completed or verified. Paid plans are only activated after a verified ₹${activeCatalogItem.amountInr} payment.`}
                </p>
                {failedOrderId && (
                  <p className="text-[11px] font-mono text-slate-400 mt-1">
                    Order Ref: {failedOrderId}
                  </p>
                )}
              </div>

              {isDomainMismatchError && typeof window !== 'undefined' && (
                <div className="max-w-lg mx-auto p-4 rounded-2xl bg-amber-50 border border-amber-300 text-left space-y-2.5">
                  <p className="text-xs font-black uppercase tracking-wider text-amber-900">
                    ⚠️ Razorpay Live Website Whitelist Required
                  </p>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Razorpay Live Mode blocked this domain because{' '}
                    <code className="font-mono font-bold bg-amber-100 px-1.5 py-0.5 rounded">
                      {window.location.origin}
                    </code>{' '}
                    is not yet added under your{' '}
                    <strong>Razorpay Dashboard → Account &amp; Settings → Website and app settings</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.origin);
                      setCopiedDomainUrl(true);
                      setTimeout(() => setCopiedDomainUrl(false), 2500);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-black text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    {copiedDomainUrl ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Copied Website URL ({window.location.origin})</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Website URL for Razorpay Settings</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  disabled={isCreatingOrder}
                  onClick={() => {
                    setStep('select');
                    handleInitiateCheckout();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Retry Online Checkout (₹{activeCatalogItem.amountInr})</span>
                </button>
                <button
                  type="button"
                  disabled={isCreatingOrder}
                  onClick={() => {
                    setStep('select');
                    handleInitiateQrPayment();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-slate-950 font-black text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Try UPI QR Code (₹{activeCatalogItem.amountInr})</span>
                </button>
                <button
                  type="button"
                  onClick={resetModal}
                  className="py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
