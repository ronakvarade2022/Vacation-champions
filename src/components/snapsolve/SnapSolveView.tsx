import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BookOpen,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Download,
  Edit3,
  Eye,
  FilePlus2,
  FileText,
  FolderOpen,
  GraduationCap,
  ImagePlus,
  Loader2,
  Lock,
  Plus,
  Printer,
  RefreshCw,
  RotateCw,
  Save,
  ScanLine,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { auth } from '../../services/firebase';
import { renderPdfPagesToImages, readFileAsArrayBufferSafe } from '../../utils/browserPdfOfficeTools';
import {
  downloadUniversalPdf,
  printUniversalDocument,
  type UniversalPdfDocument,
  type UniversalQaItem,
} from '../../utils/universalPdfPrintEngine';
import { UniversalPrintPreviewModal } from '../productivity/UniversalPrintPreviewModal';
import {
  deleteSnapSolveDocument,
  listMySnapSolveDocuments,
  saveSnapSolveDocument,
  type SavedSnapSolveDocument,
  type SnapSolvePortalRole,
} from '../../services/snapSolveFirestoreService';

export type SnapSolveAnswerStyle =
  | 'short'
  | 'detailed'
  | 'step_by_step'
  | 'exam_ready'
  | 'simple';

export interface SnapSolvePageItem {
  id: string;
  pageNumber: number;
  name: string;
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp';
  dataUrl: string;
  byteSize: number;
  sourceKind: 'camera' | 'image' | 'pdf';
}

export interface SnapSolveQuestionItem {
  id: string;
  order: number;
  numberLabel: string;
  pageNumber: number;
  questionText: string;
  questionType: string;
  options: string[];
  hasDiagram: boolean;
  diagramDescription: string;
  isReadable: boolean;
  unreadableReason: string;
  subquestions: string[];
}

export interface SnapSolveSolutionItem {
  questionId: string;
  order: number;
  numberLabel: string;
  pageNumber: number;
  questionText: string;
  status: 'solved' | 'failed' | 'unreadable';
  shortAnswer: string;
  answerText: string;
  steps: string[];
  finalAnswer: string;
  teachingNote: string;
  errorMessage: string;
  updatedAt: string;
}

export interface SnapSolveViewProps {
  portalRole: SnapSolvePortalRole;
  userId?: string;
  userName?: string;
  isAuthenticated: boolean;
  defaultSubject?: string;
  defaultLanguage?: string;
  onRequireAuth?: () => void;
  onBack?: () => void;
}

const MAX_PAGES = 10;
const MAX_PAGE_BYTES = 5 * 1024 * 1024;

const SUBJECT_OPTIONS = [
  'Auto-Detect',
  'Mathematics',
  'Science',
  'English',
  'Marathi',
  'Hindi',
  'Social Studies',
  'History & Geography',
  'Civics',
  'Computer Studies',
  'General Knowledge (GK)',
  'Logical Reasoning',
  'EVS',
  'Moral Education',
  'Financial Literacy',
  'Other',
];

const ANSWER_LANGUAGE_OPTIONS = [
  'Auto-Detect (Same as Question)',
  'English',
  'Marathi',
  'Hindi',
  'Bilingual (English + Marathi)',
  'Bilingual (English + Hindi)',
];

const ANSWER_STYLE_OPTIONS: Array<{
  id: SnapSolveAnswerStyle;
  label: string;
  description: string;
}> = [
  {
    id: 'step_by_step',
    label: 'Step-by-Step Solutions',
    description: 'Numbered logical steps & highlighted final answer (best for Maths & Science).',
  },
  {
    id: 'exam_ready',
    label: 'Exam-Ready Answers',
    description: 'Board & competitive exam structure with key terms and scoring points.',
  },
  {
    id: 'short',
    label: 'Short Answers',
    description: 'Crisp, direct answers for quick revision & MCQs.',
  },
  {
    id: 'detailed',
    label: 'Detailed Answers',
    description: 'In-depth explanation covering concept, reasoning, and complete answer.',
  },
  {
    id: 'simple',
    label: 'Simple Explanations for Students',
    description: 'Easy everyday wording designed for school learners.',
  },
];

function estimateDataUrlBytes(dataUrl: string): number {
  const commaIdx = dataUrl.indexOf(',');
  const b64 = commaIdx >= 0 ? dataUrl.slice(commaIdx + 1) : dataUrl;
  return Math.floor((b64.length * 3) / 4);
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error(`Unable to read "${file.name}".`));
    reader.readAsDataURL(file);
  });
}

function normalizeImageDataUrlForUpload(
  rawDataUrl: string,
  preferredMime: 'image/jpeg' | 'image/png' | 'image/webp'
): Promise<{ dataUrl: string; mimeType: 'image/jpeg' | 'image/png' | 'image/webp'; byteSize: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const initialBytes = estimateDataUrlBytes(rawDataUrl);
      const maxDim = 2200;
      const scale =
        img.naturalWidth > maxDim || img.naturalHeight > maxDim
          ? Math.min(maxDim / img.naturalWidth, maxDim / img.naturalHeight)
          : 1;

      if (scale === 1 && initialBytes <= MAX_PAGE_BYTES) {
        resolve({
          dataUrl: rawDataUrl,
          mimeType: preferredMime,
          byteSize: initialBytes,
        });
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas context unavailable while optimizing photo.'));
        return;
      }
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      let outMime: 'image/jpeg' | 'image/png' | 'image/webp' =
        preferredMime === 'image/png' && initialBytes <= MAX_PAGE_BYTES
          ? 'image/png'
          : 'image/jpeg';
      let quality = 0.88;
      let outUrl = canvas.toDataURL(outMime, outMime === 'image/jpeg' ? quality : undefined);
      let outBytes = estimateDataUrlBytes(outUrl);

      while (outBytes > MAX_PAGE_BYTES && quality >= 0.5) {
        outMime = 'image/jpeg';
        quality -= 0.1;
        outUrl = canvas.toDataURL('image/jpeg', quality);
        outBytes = estimateDataUrlBytes(outUrl);
      }

      if (outBytes > MAX_PAGE_BYTES) {
        reject(new Error('Image remains larger than 5 MB even after optimization.'));
        return;
      }

      resolve({
        dataUrl: outUrl,
        mimeType: outMime,
        byteSize: outBytes,
      });
    };
    img.onerror = () => reject(new Error('Invalid or corrupted image file.'));
    img.src = rawDataUrl;
  });
}

function rotateDataUrl90Deg(
  dataUrl: string,
  mimeType: 'image/jpeg' | 'image/png' | 'image/webp'
): Promise<{ dataUrl: string; byteSize: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalHeight || img.height;
      canvas.height = img.naturalWidth || img.width;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Canvas unavailable to rotate image.'));
        return;
      }
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(Math.PI / 2);
      ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
      const outUrl = canvas.toDataURL(mimeType, mimeType === 'image/png' ? undefined : 0.9);
      resolve({ dataUrl: outUrl, byteSize: estimateDataUrlBytes(outUrl) });
    };
    img.onerror = () => reject(new Error('Could not rotate page image.'));
    img.src = dataUrl;
  });
}

async function getOptionalAuthHeaders(extra?: Record<string, string>): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(extra || {}),
  };
  try {
    const token = await auth.currentUser?.getIdToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
  } catch {
    // Allow unauthenticated ephemeral instant-solve sessions without forcing login
  }
  return headers;
}

export const SnapSolveView: React.FC<SnapSolveViewProps> = ({
  portalRole,
  userName,
  isAuthenticated,
  defaultSubject,
  defaultLanguage,
  onRequireAuth,
  onBack,
}) => {
  const isTeacher = portalRole === 'teacher';

  const [statusLoading, setStatusLoading] = useState(true);
  const [aiConfigured, setAiConfigured] = useState(false);
  const [privacyNotice, setPrivacyNotice] = useState(
    'Temporary Processing Notice: Uploaded question pages are processed in memory by Google Gemini AI and cleared automatically after your session.'
  );

  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState<
    'scan' | 'review' | 'results' | 'saved'
  >('scan');

  // Upload & page management state
  const [pages, setPages] = useState<SnapSolvePageItem[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [previewPage, setPreviewPage] = useState<SnapSolvePageItem | null>(null);

  // Camera modal state
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);

  // File input refs
  const mobileCameraInputRef = useRef<HTMLInputElement | null>(null);
  const imageUploadInputRef = useRef<HTMLInputElement | null>(null);
  const pdfUploadInputRef = useRef<HTMLInputElement | null>(null);

  // Solver options
  const [subject, setSubject] = useState<string>(defaultSubject || 'Auto-Detect');
  const [answerLanguage, setAnswerLanguage] = useState<string>(
    defaultLanguage && ANSWER_LANGUAGE_OPTIONS.includes(defaultLanguage)
      ? defaultLanguage
      : 'Auto-Detect (Same as Question)'
  );
  const [answerStyle, setAnswerStyle] = useState<SnapSolveAnswerStyle>(
    isTeacher ? 'exam_ready' : 'step_by_step'
  );
  const [documentTitle, setDocumentTitle] = useState<string>(
    isTeacher ? 'SnapSolve Teacher Answer Key' : 'SnapSolve Practice Solutions'
  );

  // Active ephemeral session state
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [sessionSecret, setSessionSecret] = useState<string | null>(null);
  const [detectedSubject, setDetectedSubject] = useState<string>('');
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');
  const [extractionWarnings, setExtractionWarnings] = useState<string[]>([]);
  const [questions, setQuestions] = useState<SnapSolveQuestionItem[]>([]);
  const [solutions, setSolutions] = useState<SnapSolveSolutionItem[]>([]);

  // UI operation states
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [isSolving, setIsSolving] = useState(false);
  const [retryingQuestionIds, setRetryingQuestionIds] = useState<Record<string, boolean>>({});
  const [bannerError, setBannerError] = useState<string | null>(null);
  const [isRetryableBannerError, setIsRetryableBannerError] = useState(false);
  const [lastRetryAction, setLastRetryAction] = useState<
    | { type: 'recognize' }
    | { type: 'solve'; targetQuestionIds?: string[] }
    | null
  >(null);
  const [bannerSuccess, setBannerSuccess] = useState<string | null>(null);

  // Results interactions
  const [collapsedById, setCollapsedById] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [editingQuestionDraft, setEditingQuestionDraft] = useState<string>('');
  const [editingAnswerId, setEditingAnswerId] = useState<string | null>(null);
  const [editingAnswerDraft, setEditingAnswerDraft] = useState<{
    answerText: string;
    stepsText: string;
    finalAnswer: string;
    teachingNote: string;
  }>({
    answerText: '',
    stepsText: '',
    finalAnswer: '',
    teachingNote: '',
  });
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const questionCardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // PDF / Print modal state
  const [printPreviewDoc, setPrintPreviewDoc] = useState<UniversalPdfDocument | null>(null);

  // Saved Documents (Firestore role-isolated)
  const [savedDocs, setSavedDocs] = useState<SavedSnapSolveDocument[]>([]);
  const [loadingSavedDocs, setLoadingSavedDocs] = useState(false);
  const [isSavingDoc, setIsSavingDoc] = useState(false);
  const [loadedSavedDocId, setLoadedSavedDocId] = useState<string | undefined>(undefined);

  // Reset active session cleanly when role changes (Student vs Teacher strict isolation)
  useEffect(() => {
    setPages([]);
    setSessionId(null);
    setSessionSecret(null);
    setQuestions([]);
    setSolutions([]);
    setExtractionWarnings([]);
    setSavedDocs([]);
    setLoadedSavedDocId(undefined);
    setBannerError(null);
    setBannerSuccess(null);
    setAnswerStyle(portalRole === 'teacher' ? 'exam_ready' : 'step_by_step');
    setDocumentTitle(
      portalRole === 'teacher'
        ? 'SnapSolve Teacher Answer Key'
        : 'SnapSolve Practice Solutions'
    );
    setActiveWorkspaceTab('scan');
  }, [portalRole]);

  // Fetch status
  const refreshStatus = useCallback(async () => {
    setStatusLoading(true);
    try {
      const res = await fetch('/api/snapsolve/status');
      const data = await res.json();
      setAiConfigured(Boolean(data?.configured));
      if (data?.privacyNotice) {
        setPrivacyNotice(String(data.privacyNotice));
      }
    } catch {
      setAiConfigured(false);
    } finally {
      setStatusLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshStatus();
  }, [refreshStatus]);

  const loadSavedDocuments = useCallback(async () => {
    if (!isAuthenticated) {
      setSavedDocs([]);
      return;
    }
    setLoadingSavedDocs(true);
    try {
      const docs = await listMySnapSolveDocuments(portalRole);
      setSavedDocs(docs);
    } catch (err: any) {
      setBannerError(err?.message || 'Unable to load your saved SnapSolve documents.');
    } finally {
      setLoadingSavedDocs(false);
    }
  }, [isAuthenticated, portalRole]);

  useEffect(() => {
    if (activeWorkspaceTab === 'saved' && isAuthenticated) {
      void loadSavedDocuments();
    }
  }, [activeWorkspaceTab, isAuthenticated, loadSavedDocuments]);

  // Camera lifecycle cleanup
  const stopCameraStream = useCallback(() => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {
          // Ignore track stop errors
        }
      });
      cameraStreamRef.current = null;
    }
    setIsCameraOpen(false);
  }, []);

  useEffect(() => {
    return () => {
      if (cameraStreamRef.current) {
        cameraStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  const openLiveCameraModal = async () => {
    setBannerError(null);
    setCameraError(null);
    if (pages.length >= MAX_PAGES) {
      setBannerError(`Maximum ${MAX_PAGES} pages allowed per SnapSolve document.`);
      return;
    }
    if (!navigator?.mediaDevices?.getUserMedia) {
      // Fallback straight to native mobile camera file input
      mobileCameraInputRef.current?.click();
      return;
    }
    setIsCameraOpen(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      cameraStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch {
      setCameraError(
        'Live camera preview is unavailable or blocked. Use "Mobile Camera" or "Upload Image(s)" instead.'
      );
    }
  };

  const captureFromLiveCamera = async () => {
    const video = videoRef.current;
    if (!video || video.videoWidth <= 0) return;
    if (pages.length >= MAX_PAGES) {
      stopCameraStream();
      setBannerError(`Maximum ${MAX_PAGES} pages reached.`);
      return;
    }
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const rawUrl = canvas.toDataURL('image/jpeg', 0.9);
    try {
      const normalized = await normalizeImageDataUrlForUpload(rawUrl, 'image/jpeg');
      setPages((prev) => [
        ...prev,
        {
          id: `pg_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
          pageNumber: prev.length + 1,
          name: `Camera Scan ${prev.length + 1}.jpg`,
          mimeType: normalized.mimeType,
          dataUrl: normalized.dataUrl,
          byteSize: normalized.byteSize,
          sourceKind: 'camera',
        },
      ]);
      stopCameraStream();
    } catch (err: any) {
      setCameraError(err?.message || 'Unable to capture photo.');
    }
  };

  const appendImageFiles = async (fileList: FileList | null, sourceKind: 'camera' | 'image') => {
    if (!fileList || fileList.length === 0) return;
    setBannerError(null);
    setBannerSuccess(null);
    setIsProcessingFiles(true);

    try {
      const remaining = MAX_PAGES - pages.length;
      if (remaining <= 0) {
        setBannerError(`Maximum ${MAX_PAGES} pages per document reached. Remove a page or start a new document.`);
        return;
      }

      const selectedFiles = Array.from(fileList).slice(0, remaining);
      if (fileList.length > remaining) {
        setBannerError(
          `Only the first ${remaining} file(s) were added because documents allow up to ${MAX_PAGES} pages.`
        );
      }

      const addedPages: SnapSolvePageItem[] = [];
      for (const file of selectedFiles) {
        const lowerName = file.name.toLowerCase();
        let mime: 'image/jpeg' | 'image/png' | 'image/webp' | null = null;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || lowerName.endsWith('.jpg') || lowerName.endsWith('.jpeg')) {
          mime = 'image/jpeg';
        } else if (file.type === 'image/png' || lowerName.endsWith('.png')) {
          mime = 'image/png';
        } else if (file.type === 'image/webp' || lowerName.endsWith('.webp')) {
          mime = 'image/webp';
        }

        if (!mime) {
          setBannerError(
            `"${file.name}" has an unsupported format. Allowed formats: JPG, JPEG, PNG, WebP, and PDF.`
          );
          continue;
        }

        const rawDataUrl = await readFileAsDataUrl(file);
        const normalized = await normalizeImageDataUrlForUpload(rawDataUrl, mime);
        addedPages.push({
          id: `pg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          pageNumber: pages.length + addedPages.length + 1,
          name: file.name,
          mimeType: normalized.mimeType,
          dataUrl: normalized.dataUrl,
          byteSize: normalized.byteSize,
          sourceKind,
        });
      }

      if (addedPages.length > 0) {
        setPages((prev) =>
          [...prev, ...addedPages].map((p, idx) => ({ ...p, pageNumber: idx + 1 }))
        );
      }
    } catch (err: any) {
      setBannerError(err?.message || 'Failed to read uploaded image.');
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const appendPdfFile = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    setBannerError(null);
    setBannerSuccess(null);

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setBannerError('Please select a valid PDF (.pdf) document.');
      return;
    }

    const remaining = MAX_PAGES - pages.length;
    if (remaining <= 0) {
      setBannerError(`Maximum ${MAX_PAGES} pages reached.`);
      return;
    }

    setIsProcessingFiles(true);
    try {
      const buffer = await readFileAsArrayBufferSafe(file);
      const rendered = await renderPdfPagesToImages(buffer, {
        scale: 1.5,
        mime: 'image/jpeg',
        quality: 0.9,
        maxPages: remaining,
      });

      if (rendered.totalPages > remaining) {
        setBannerError(
          `PDF has ${rendered.totalPages} pages; first ${remaining} page(s) were imported to fit the ${MAX_PAGES}-page document limit.`
        );
      }

      const added: SnapSolvePageItem[] = [];
      for (const pg of rendered.pages) {
        const normalized = await normalizeImageDataUrlForUpload(pg.dataUrl, 'image/jpeg');
        added.push({
          id: `pg_${Date.now()}_${pg.pageNumber}_${Math.random().toString(36).slice(2, 6)}`,
          pageNumber: pages.length + added.length + 1,
          name: `${file.name} (Page ${pg.pageNumber})`,
          mimeType: normalized.mimeType,
          dataUrl: normalized.dataUrl,
          byteSize: normalized.byteSize,
          sourceKind: 'pdf',
        });
      }

      if (added.length > 0) {
        setPages((prev) =>
          [...prev, ...added].map((p, idx) => ({ ...p, pageNumber: idx + 1 }))
        );
      }
    } catch (err: any) {
      setBannerError(err?.message || 'Unable to extract pages from the uploaded PDF.');
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleMovePage = (idx: number, direction: -1 | 1) => {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= pages.length) return;
    setPages((prev) => {
      const next = [...prev];
      const temp = next[idx];
      next[idx] = next[targetIdx];
      next[targetIdx] = temp;
      return next.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    });
  };

  const handleRotatePage = async (idx: number) => {
    const target = pages[idx];
    if (!target) return;
    try {
      const rotated = await rotateDataUrl90Deg(target.dataUrl, target.mimeType);
      setPages((prev) =>
        prev.map((p, i) =>
          i === idx ? { ...p, dataUrl: rotated.dataUrl, byteSize: rotated.byteSize } : p
        )
      );
    } catch (err: any) {
      setBannerError(err?.message || 'Failed to rotate page.');
    }
  };

  const handleRemovePage = (idx: number) => {
    setPages((prev) =>
      prev.filter((_, i) => i !== idx).map((p, i) => ({ ...p, pageNumber: i + 1 }))
    );
  };

  // Recognize uploaded pages via backend
  const handleRecognizePages = async () => {
    if (pages.length === 0) {
      setBannerError('Please upload or capture at least one question image or PDF page first.');
      setIsRetryableBannerError(false);
      setLastRetryAction(null);
      return;
    }
    setBannerError(null);
    setIsRetryableBannerError(false);
    setLastRetryAction(null);
    setBannerSuccess(null);
    setIsRecognizing(true);

    try {
      // Clean up previous ephemeral session silently if one existed
      if (sessionId && sessionSecret) {
        const cleanupHeaders = await getOptionalAuthHeaders({
          'x-snapsolve-secret': sessionSecret,
        });
        void fetch(`/api/snapsolve/session/${encodeURIComponent(sessionId)}`, {
          method: 'DELETE',
          headers: cleanupHeaders,
        }).catch(() => {});
      }

      const headers = await getOptionalAuthHeaders();
      const res = await fetch('/api/snapsolve/recognize', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          portalRole,
          subjectHint: subject,
          answerLanguageHint: answerLanguage,
          pages: pages.map((p) => ({
            pageNumber: p.pageNumber,
            mimeType: p.mimeType,
            base64Data: p.dataUrl,
          })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        const canRetry = Boolean(data?.retryable) || res.status === 503;
        setBannerError(
          data?.message || 'Could not recognize questions from uploaded pages.'
        );
        setIsRetryableBannerError(canRetry);
        setLastRetryAction(canRetry ? { type: 'recognize' } : null);
        return;
      }

      setSessionId(data.sessionId);
      setSessionSecret(data.sessionSecret);
      setDetectedSubject(data.detectedSubject || subject);
      setDetectedLanguage(data.detectedLanguage || 'English');
      setExtractionWarnings(Array.isArray(data.extractionWarnings) ? data.extractionWarnings : []);
      setQuestions(Array.isArray(data.questions) ? data.questions : []);
      setSolutions([]);
      setEditingAnswerId(null);
      setEditingQuestionId(null);
      setLoadedSavedDocId(undefined);

      if (subject === 'Auto-Detect' && data.detectedSubject) {
        setDocumentTitle(
          `${data.detectedSubject} — ${isTeacher ? 'Teacher Answer Key' : 'Solved Questions'}`
        );
      }

      setActiveWorkspaceTab('review');
    } catch {
      setBannerError('Network error while contacting SnapSolve AI recognition service.');
      setIsRetryableBannerError(true);
      setLastRetryAction({ type: 'recognize' });
    } finally {
      setIsRecognizing(false);
    }
  };

  // Solve extracted/edited questions (all or partial retry targetQuestionIds)
  const handleSolveQuestions = async (
    targetQuestionIds?: string[],
    overrideOptions?: { answerStyle?: SnapSolveAnswerStyle; answerLanguage?: string }
  ) => {
    if (!sessionId || !sessionSecret) {
      setBannerError('No active scanned session found. Please scan your pages first.');
      setIsRetryableBannerError(false);
      setLastRetryAction(null);
      return;
    }
    if (questions.length === 0) {
      setBannerError('No extracted questions available to solve.');
      setIsRetryableBannerError(false);
      setLastRetryAction(null);
      return;
    }

    const effectiveStyle = overrideOptions?.answerStyle || answerStyle;
    const effectiveLanguage = overrideOptions?.answerLanguage || answerLanguage;

    setBannerError(null);
    setIsRetryableBannerError(false);
    setLastRetryAction(null);
    setBannerSuccess(null);

    if (targetQuestionIds && targetQuestionIds.length > 0) {
      setRetryingQuestionIds((prev) => {
        const next = { ...prev };
        targetQuestionIds.forEach((id) => {
          next[id] = true;
        });
        return next;
      });
    } else {
      setIsSolving(true);
    }

    try {
      const headers = await getOptionalAuthHeaders({
        'x-snapsolve-secret': sessionSecret,
      });
      const resolvedSubject =
        subject === 'Auto-Detect' ? detectedSubject || 'General Studies' : subject;

      const res = await fetch('/api/snapsolve/solve', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          sessionId,
          portalRole,
          subject: resolvedSubject,
          answerLanguage: effectiveLanguage,
          answerStyle: effectiveStyle,
          questions,
          targetQuestionIds,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        const returnedSolutions: SnapSolveSolutionItem[] = Array.isArray(data?.solutions)
          ? data.solutions
          : [];
        if (returnedSolutions.length > 0) {
          setSolutions(returnedSolutions);
          setActiveWorkspaceTab('results');
        }
        const canRetry = Boolean(data?.retryable) || res.status === 503;
        const failedIds = returnedSolutions
          .filter((s) => s.status === 'failed')
          .map((s) => s.questionId);
        setBannerError(data?.message || 'Failed to generate answers.');
        setIsRetryableBannerError(canRetry);
        setLastRetryAction(
          canRetry
            ? {
                type: 'solve',
                targetQuestionIds:
                  failedIds.length > 0 ? failedIds : targetQuestionIds,
              }
            : null
        );
        return;
      }

      if (Array.isArray(data.questions)) {
        setQuestions(data.questions);
      }
      const nextSolutions: SnapSolveSolutionItem[] = Array.isArray(data.solutions)
        ? data.solutions
        : [];
      setSolutions(nextSolutions);
      setEditingAnswerId(null);
      setActiveWorkspaceTab('results');

      if (data.partialFailure) {
        const failedIds = nextSolutions
          .filter((s) => s.status === 'failed')
          .map((s) => s.questionId);
        setBannerError(
          data.warningMessage ||
            'Some questions could not be solved due to temporary AI demand. Completed answers were saved — retry the remaining questions below.'
        );
        setIsRetryableBannerError(Boolean(data.retryable));
        setLastRetryAction({
          type: 'solve',
          targetQuestionIds: failedIds.length > 0 ? failedIds : targetQuestionIds,
        });
      } else if (!targetQuestionIds) {
        setFocusedIndex(0);
      }
    } catch {
      setBannerError('Network error while generating answers.');
      setIsRetryableBannerError(true);
      setLastRetryAction({ type: 'solve', targetQuestionIds });
    } finally {
      setIsSolving(false);
      if (targetQuestionIds && targetQuestionIds.length > 0) {
        setRetryingQuestionIds((prev) => {
          const next = { ...prev };
          targetQuestionIds.forEach((id) => {
            delete next[id];
          });
          return next;
        });
      }
    }
  };

  // Inline edit saved from Results card -> update question & regenerate just that question
  const handleSaveEditedQuestionAndRegenerate = async (qId: string) => {
    const cleanText = editingQuestionDraft.trim();
    if (!cleanText) return;
    const updatedQuestions = questions.map((q) =>
      q.id === qId
        ? { ...q, questionText: cleanText, isReadable: true, unreadableReason: '' }
        : q
    );
    setQuestions(updatedQuestions);
    setEditingQuestionId(null);

    if (!sessionId || !sessionSecret) {
      setBannerError(
        'Cannot regenerate live answers for an archived document without rescanning pages.'
      );
      return;
    }

    setBannerError(null);
    setIsRetryableBannerError(false);
    setLastRetryAction(null);
    setRetryingQuestionIds((prev) => ({ ...prev, [qId]: true }));
    try {
      const headers = await getOptionalAuthHeaders({
        'x-snapsolve-secret': sessionSecret,
      });
      const resolvedSubject =
        subject === 'Auto-Detect' ? detectedSubject || 'General Studies' : subject;
      const res = await fetch('/api/snapsolve/solve', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          sessionId,
          portalRole,
          subject: resolvedSubject,
          answerLanguage,
          answerStyle,
          questions: updatedQuestions,
          targetQuestionIds: [qId],
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success || data?.partialFailure) {
        const canRetry = Boolean(data?.retryable) || res.status === 503;
        if (Array.isArray(data?.solutions) && data.solutions.length > 0) {
          setSolutions(data.solutions);
        }
        setBannerError(
          data?.warningMessage ||
            data?.message ||
            'Could not regenerate answer for the edited question.'
        );
        setIsRetryableBannerError(canRetry);
        setLastRetryAction(canRetry ? { type: 'solve', targetQuestionIds: [qId] } : null);
        return;
      }
      setSolutions(Array.isArray(data.solutions) ? data.solutions : []);
    } catch {
      setBannerError('Network error while regenerating answer.');
      setIsRetryableBannerError(true);
      setLastRetryAction({ type: 'solve', targetQuestionIds: [qId] });
    } finally {
      setRetryingQuestionIds((prev) => {
        const next = { ...prev };
        delete next[qId];
        return next;
      });
    }
  };

  // Inline direct edit of a generated answer without reprocessing the document
  const handleStartEditingAnswer = (item: SnapSolveSolutionItem) => {
    setEditingQuestionId(null);
    setEditingAnswerId(item.questionId);
    setEditingAnswerDraft({
      answerText: item.answerText || '',
      stepsText: (item.steps || []).join('\n'),
      finalAnswer: item.finalAnswer || '',
      teachingNote: item.teachingNote || '',
    });
    setCollapsedById((prev) => ({ ...prev, [item.questionId]: false }));
  };

  const handleSaveEditedAnswer = (questionId: string) => {
    const cleanedSteps = editingAnswerDraft.stepsText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const cleanedAnswerText = editingAnswerDraft.answerText.trim();
    const cleanedFinalAnswer = editingAnswerDraft.finalAnswer.trim();
    const cleanedTeachingNote = editingAnswerDraft.teachingNote.trim();

    if (!cleanedAnswerText && !cleanedFinalAnswer && cleanedSteps.length === 0) {
      setBannerError('Please enter an answer, step, or final answer before saving.');
      setIsRetryableBannerError(false);
      return;
    }

    const updatedStamp = new Date().toISOString();
    let targetLabel = '';

    setSolutions((prev) =>
      prev.map((sol) => {
        if (sol.questionId !== questionId) return sol;
        targetLabel = sol.numberLabel || `Q${sol.order}`;
        return {
          ...sol,
          status: 'solved',
          answerText: cleanedAnswerText,
          steps: cleanedSteps,
          finalAnswer: cleanedFinalAnswer,
          shortAnswer: cleanedFinalAnswer || cleanedAnswerText.slice(0, 240),
          teachingNote: cleanedTeachingNote,
          errorMessage: '',
          updatedAt: updatedStamp,
        };
      })
    );

    setEditingAnswerId(null);
    setBannerError(null);
    setIsRetryableBannerError(false);
    setBannerSuccess(
      `Saved your edits for ${targetLabel || 'this question'} without reprocessing the document.`
    );
  };

  const handleStartNewDocument = async () => {
    setBannerError(null);
    setIsRetryableBannerError(false);
    setLastRetryAction(null);
    setBannerSuccess(null);
    if (sessionId && sessionSecret) {
      const headers = await getOptionalAuthHeaders({
        'x-snapsolve-secret': sessionSecret,
      });
      void fetch(`/api/snapsolve/session/${encodeURIComponent(sessionId)}`, {
        method: 'DELETE',
        headers,
      }).catch(() => {});
    }
    setPages([]);
    setSessionId(null);
    setSessionSecret(null);
    setDetectedSubject('');
    setDetectedLanguage('');
    setExtractionWarnings([]);
    setQuestions([]);
    setSolutions([]);
    setLoadedSavedDocId(undefined);
    setEditingQuestionId(null);
    setEditingAnswerId(null);
    setActiveWorkspaceTab('scan');
  };

  const handleCopyAnswer = async (item: SnapSolveSolutionItem) => {
    const pieces = [
      `${item.numberLabel}: ${item.questionText}`,
      ...(item.steps.length > 0 ? ['Steps:', ...item.steps.map((s, i) => `  ${i + 1}. ${s}`)] : []),
      item.answerText ? `Answer: ${item.answerText}` : '',
      item.finalAnswer ? `Final Answer: ${item.finalAnswer}` : '',
      isTeacher && item.teachingNote ? `Teacher Note: ${item.teachingNote}` : '',
    ].filter(Boolean);
    try {
      await navigator.clipboard.writeText(pieces.join('\n'));
      setCopiedId(item.questionId);
      setTimeout(() => setCopiedId((curr) => (curr === item.questionId ? null : curr)), 2000);
    } catch {
      setBannerError('Clipboard permission denied in browser.');
    }
  };

  const buildUniversalPdfDoc = useCallback((): UniversalPdfDocument => {
    const resolvedSub =
      subject === 'Auto-Detect' ? detectedSubject || 'General Studies' : subject;
    const styleLabel =
      ANSWER_STYLE_OPTIONS.find((s) => s.id === answerStyle)?.label || answerStyle;

    const qaItems: UniversalQaItem[] = (solutions.length > 0
      ? solutions
      : questions.map((q) => ({
          questionId: q.id,
          order: q.order,
          numberLabel: q.numberLabel,
          pageNumber: q.pageNumber,
          questionText: q.questionText,
          status: (q.isReadable ? 'failed' : 'unreadable') as 'failed' | 'unreadable',
          shortAnswer: '',
          answerText: '',
          steps: [],
          finalAnswer: '',
          teachingNote: '',
          errorMessage: q.unreadableReason || 'Answer not yet generated.',
          updatedAt: new Date().toISOString(),
        }))
    ).map((sol) => ({
      numberLabel: sol.numberLabel,
      question: sol.questionText,
      statusBadge:
        sol.status === 'solved'
          ? 'Solved'
          : sol.status === 'unreadable'
          ? 'Unreadable'
          : 'Needs Retry',
      answer: sol.answerText || undefined,
      steps: sol.steps.length > 0 ? sol.steps : undefined,
      finalAnswer: sol.finalAnswer || undefined,
      explanation: isTeacher && sol.teachingNote ? `Teacher Note: ${sol.teachingNote}` : undefined,
      unreadableNote: sol.status !== 'solved' ? sol.errorMessage : undefined,
    }));

    return {
      title: documentTitle.trim() || `${resolvedSub} — SnapSolve Solutions`,
      subtitle: `${isTeacher ? 'Teacher Answer Key & Assessment Reference' : 'Student Guided Study Solutions'} · ${resolvedSub}`,
      portalBadge: isTeacher ? 'TEACHER SNAPSOLVE STUDIO' : 'STUDENT SNAPSOLVE AI',
      metaItems: [
        `Subject: ${resolvedSub}`,
        `Language: ${answerLanguage}`,
        `Style: ${styleLabel}`,
        `Pages Scanned: ${Math.max(1, pages.length || 1)}`,
        `Total Questions: ${qaItems.length}`,
        userName ? `Prepared By: ${userName}` : '',
      ].filter(Boolean),
      summaryCards: [
        {
          label: 'Total Questions',
          value: String(qaItems.length),
          tone: 'indigo',
        },
        {
          label: 'Solved',
          value: String(solutions.filter((s) => s.status === 'solved').length),
          tone: 'emerald',
        },
        {
          label: 'Needs Review',
          value: String(solutions.filter((s) => s.status !== 'solved').length),
          tone: 'amber',
        },
      ],
      qaItems,
      footerNote: 'MyStudyZone SnapSolve AI · Learn • Practice • Excel',
      filename: `${documentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '_') || 'snapsolve_solutions'}.pdf`,
    };
  }, [
    answerLanguage,
    answerStyle,
    detectedSubject,
    documentTitle,
    isTeacher,
    pages.length,
    questions,
    solutions,
    subject,
    userName,
  ]);

  const handleSaveToMyDocuments = async () => {
    setBannerError(null);
    setBannerSuccess(null);

    if (!isAuthenticated) {
      if (onRequireAuth) {
        onRequireAuth();
      } else {
        setBannerError('Please sign in to save SnapSolve documents to your personal My Documents library.');
      }
      return;
    }

    if (solutions.length === 0 && questions.length === 0) {
      setBannerError('Scan and generate answers before saving a document.');
      return;
    }

    setIsSavingDoc(true);
    try {
      const resolvedSub =
        subject === 'Auto-Detect' ? detectedSubject || 'General Studies' : subject;
      const saved = await saveSnapSolveDocument({
        id: loadedSavedDocId,
        portalRole,
        title: documentTitle.trim() || `${resolvedSub} SnapSolve Notes`,
        subject: resolvedSub,
        answerLanguage,
        answerStyle,
        pageCount: Math.max(1, pages.length || 1),
        questions: questions.map((q) => ({
          id: q.id,
          order: q.order,
          numberLabel: q.numberLabel,
          pageNumber: q.pageNumber,
          questionText: q.questionText,
          questionType: q.questionType,
          isReadable: q.isReadable,
        })),
        solutions: solutions.map((s) => ({
          questionId: s.questionId,
          order: s.order,
          numberLabel: s.numberLabel,
          status: s.status,
          shortAnswer: s.shortAnswer,
          answerText: s.answerText,
          steps: s.steps,
          finalAnswer: s.finalAnswer,
          teachingNote: s.teachingNote,
        })),
      });
      setLoadedSavedDocId(saved.id);
      setBannerSuccess(
        `Saved to your private ${isTeacher ? 'Teacher' : 'Student'} My Documents library.`
      );
      void loadSavedDocuments();
    } catch (err: any) {
      setBannerError(err?.message || 'Unable to save SnapSolve document right now.');
    } finally {
      setIsSavingDoc(false);
    }
  };

  const handleOpenSavedDocument = (savedDoc: SavedSnapSolveDocument) => {
    setBannerError(null);
    setBannerSuccess(null);
    setSessionId(null);
    setSessionSecret(null);
    setLoadedSavedDocId(savedDoc.id);
    setDocumentTitle(savedDoc.title);
    setSubject(savedDoc.subject);
    setAnswerLanguage(savedDoc.answerLanguage);
    setAnswerStyle((savedDoc.answerStyle as SnapSolveAnswerStyle) || 'step_by_step');
    setQuestions(
      savedDoc.questions.map((q) => ({
        id: q.id,
        order: q.order,
        numberLabel: q.numberLabel,
        pageNumber: q.pageNumber,
        questionText: q.questionText,
        questionType: q.questionType,
        options: [],
        hasDiagram: false,
        diagramDescription: '',
        isReadable: q.isReadable,
        unreadableReason: '',
        subquestions: [],
      }))
    );
    setSolutions(
      savedDoc.solutions.map((s) => ({
        questionId: s.questionId,
        order: s.order,
        numberLabel: s.numberLabel,
        pageNumber: 1,
        questionText:
          savedDoc.questions.find((q) => q.id === s.questionId)?.questionText || '',
        status: s.status,
        shortAnswer: s.shortAnswer,
        answerText: s.answerText,
        steps: s.steps || [],
        finalAnswer: s.finalAnswer,
        teachingNote: s.teachingNote || '',
        errorMessage: '',
        updatedAt: savedDoc.updatedAt,
      }))
    );
    setActiveWorkspaceTab('results');
  };

  const handleDeleteSavedDocument = async (docId: string) => {
    try {
      await deleteSnapSolveDocument(docId);
      setSavedDocs((prev) => prev.filter((d) => d.id !== docId));
      if (loadedSavedDocId === docId) setLoadedSavedDocId(undefined);
    } catch (err: any) {
      setBannerError(err?.message || 'Unable to delete document.');
    }
  };

  const failedSolutionIds = useMemo(
    () => solutions.filter((s) => s.status === 'failed').map((s) => s.questionId),
    [solutions]
  );

  const solvedCount = useMemo(
    () => solutions.filter((s) => s.status === 'solved').length,
    [solutions]
  );

  const jumpToQuestionIndex = (idx: number) => {
    if (idx < 0 || idx >= solutions.length) return;
    setFocusedIndex(idx);
    const targetId = solutions[idx].questionId;
    setCollapsedById((prev) => ({ ...prev, [targetId]: false }));
    const el = questionCardRefs.current[targetId];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-5 sm:py-7 space-y-5">
      {/* Header */}
      <div
        className={`rounded-3xl p-5 sm:p-7 text-white shadow-xl border ${
          isTeacher
            ? 'bg-gradient-to-br from-[#0b1930] via-[#0f2942] to-teal-900 border-teal-700/60'
            : 'bg-gradient-to-br from-indigo-700 via-blue-700 to-sky-700 border-blue-500/40'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-xs font-bold text-white cursor-pointer transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to {isTeacher ? 'Teacher Portal' : 'Student Portal'}</span>
            </button>
          ) : (
            <span />
          )}

          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/15 text-xs font-bold">
              {isTeacher ? (
                <>
                  <GraduationCap className="w-3.5 h-3.5 text-teal-300" />
                  <span>Teacher Answer Key Workspace</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>Student Guided Study Workspace</span>
                </>
              )}
            </span>

            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border ${
                statusLoading
                  ? 'bg-slate-800/70 border-slate-600 text-slate-200'
                  : aiConfigured
                  ? 'bg-emerald-500/20 border-emerald-300/40 text-emerald-100'
                  : 'bg-amber-500/25 border-amber-300/50 text-amber-100'
              }`}
            >
              {statusLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : aiConfigured ? (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              ) : (
                <ShieldAlert className="w-3.5 h-3.5 text-amber-300" />
              )}
              <span>
                {statusLoading
                  ? 'Checking Free AI...'
                  : aiConfigured
                  ? 'Free Gemini Vision Ready'
                  : 'AI Key Not Configured'}
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              SnapSolve AI – Scan, Solve &amp; Learn
            </h1>
            <p className="text-xs sm:text-sm text-white/90 max-w-2xl leading-relaxed">
              {isTeacher
                ? 'Scan question papers, textbook exercises, or handwritten worksheets (English, Marathi, Hindi & Maths) to generate structured exam-ready answer keys and printable A4 PDFs.'
                : 'Take a photo or upload worksheet, notebook, or textbook pages to get clear sequential step-by-step explanations and downloadable A4 study PDFs.'}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {(pages.length > 0 || questions.length > 0 || solutions.length > 0) && (
              <button
                type="button"
                onClick={() => void handleStartNewDocument()}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-500/90 hover:bg-rose-500 text-white text-xs font-bold cursor-pointer shadow-sm"
              >
                <FilePlus2 className="w-3.5 h-3.5" />
                <span>Start New Document</span>
              </button>
            )}
          </div>
        </div>

        {/* Workspace Mode Tabs */}
        <div className="mt-5 pt-4 border-t border-white/15 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveWorkspaceTab('scan')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              activeWorkspaceTab === 'scan'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>1. Upload / Scan ({pages.length}/{MAX_PAGES})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveWorkspaceTab('review')}
            disabled={questions.length === 0}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all disabled:opacity-45 disabled:cursor-not-allowed ${
              activeWorkspaceTab === 'review'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>2. Review Questions ({questions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveWorkspaceTab('results')}
            disabled={solutions.length === 0}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all disabled:opacity-45 disabled:cursor-not-allowed ${
              activeWorkspaceTab === 'results'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>3. View Answers ({solvedCount}/{solutions.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveWorkspaceTab('saved')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              activeWorkspaceTab === 'saved'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5" />
            <span>{isTeacher ? 'Saved Teacher Keys' : 'My Saved Documents'}</span>
          </button>
        </div>
      </div>

      {/* Clear Temporary Processing & AI Privacy Notice */}
      <div className="rounded-2xl bg-sky-50 border border-sky-200 px-4 py-3 flex items-start gap-3 text-xs text-sky-950">
        <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
        <div className="space-y-0.5 leading-relaxed">
          <p className="font-bold text-sky-950">Privacy &amp; Temporary Processing Notice</p>
          <p className="text-sky-900">{privacyNotice}</p>
        </div>
      </div>

      {/* Status Alerts */}
      {bannerError && (
        <div className="rounded-2xl bg-rose-50 border border-rose-200 px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-rose-900">
          <div className="flex items-start gap-2.5 flex-1 min-w-[220px]">
            <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-medium">{bannerError}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isRetryableBannerError && lastRetryAction && (
              <button
                type="button"
                disabled={isRecognizing || isSolving}
                onClick={() => {
                  if (lastRetryAction.type === 'recognize') {
                    void handleRecognizePages();
                  } else {
                    void handleSolveQuestions(lastRetryAction.targetQuestionIds);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRecognizing || isSolving ? 'animate-spin' : ''}`} />
                <span>
                  {lastRetryAction.type === 'recognize'
                    ? 'Retry Scan'
                    : lastRetryAction.targetQuestionIds?.length
                    ? `Retry Failed (${lastRetryAction.targetQuestionIds.length})`
                    : 'Retry Solve'}
                </span>
              </button>
            )}
            <button
              type="button"
              onClick={() => {
                setBannerError(null);
                setIsRetryableBannerError(false);
              }}
              className="p-1 text-rose-700 hover:bg-rose-100 rounded-lg cursor-pointer"
              aria-label="Dismiss error"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {bannerSuccess && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 px-4 py-3 flex items-start justify-between gap-3 text-xs sm:text-sm text-emerald-900">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span className="font-semibold">{bannerSuccess}</span>
          </div>
          <button
            type="button"
            onClick={() => setBannerSuccess(null)}
            className="p-1 text-emerald-700 hover:bg-emerald-100 rounded-lg cursor-pointer"
            aria-label="Dismiss message"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Hidden File Inputs */}
      <input
        ref={mobileCameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          void appendImageFiles(e.target.files, 'camera');
          e.target.value = '';
        }}
      />
      <input
        ref={imageUploadInputRef}
        type="file"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          void appendImageFiles(e.target.files, 'image');
          e.target.value = '';
        }}
      />
      <input
        ref={pdfUploadInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={(e) => {
          void appendPdfFile(e.target.files);
          e.target.value = '';
        }}
      />

      {/* TAB 1: UPLOAD & MANAGE PAGES */}
      {activeWorkspaceTab === 'scan' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left 7 cols: Upload & Page List */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-display font-black text-slate-900">
                  Upload or Capture Question Pages
                </h2>
                <p className="text-xs text-slate-600">
                  Allowed: JPG, JPEG, PNG, WebP, or Multi-Page PDF · Max {MAX_PAGES} pages · Max 5 MB per page
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 text-xs font-extrabold">
                {pages.length} / {MAX_PAGES} Pages
              </span>
            </div>

            {/* 4 Upload Entry Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <button
                type="button"
                onClick={() => mobileCameraInputRef.current?.click()}
                disabled={pages.length >= MAX_PAGES || isProcessingFiles}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 hover:border-indigo-500 hover:bg-indigo-50 text-indigo-900 cursor-pointer transition-all disabled:opacity-50"
              >
                <Camera className="w-5 h-5 text-indigo-600" />
                <span className="text-xs font-extrabold">Mobile Camera</span>
              </button>

              <button
                type="button"
                onClick={() => void openLiveCameraModal()}
                disabled={pages.length >= MAX_PAGES || isProcessingFiles}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl border-2 border-sky-200 bg-sky-50/70 hover:border-sky-500 hover:bg-sky-50 text-sky-900 cursor-pointer transition-all disabled:opacity-50"
              >
                <ScanLine className="w-5 h-5 text-sky-600" />
                <span className="text-xs font-extrabold">Live Camera</span>
              </button>

              <button
                type="button"
                onClick={() => imageUploadInputRef.current?.click()}
                disabled={pages.length >= MAX_PAGES || isProcessingFiles}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/70 hover:border-emerald-500 hover:bg-emerald-50 text-emerald-900 cursor-pointer transition-all disabled:opacity-50"
              >
                <ImagePlus className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-extrabold">Upload Image(s)</span>
              </button>

              <button
                type="button"
                onClick={() => pdfUploadInputRef.current?.click()}
                disabled={pages.length >= MAX_PAGES || isProcessingFiles}
                className="flex flex-col items-center justify-center gap-1.5 p-3.5 rounded-2xl border-2 border-amber-200 bg-amber-50/70 hover:border-amber-500 hover:bg-amber-50 text-amber-900 cursor-pointer transition-all disabled:opacity-50"
              >
                <FileText className="w-5 h-5 text-amber-600" />
                <span className="text-xs font-extrabold">Upload PDF</span>
              </button>
            </div>

            {isProcessingFiles && (
              <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 flex items-center gap-2.5 text-xs font-bold text-slate-700">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Preparing &amp; optimizing uploaded pages...</span>
              </div>
            )}

            {/* Page Preview Grid */}
            {pages.length === 0 ? (
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/70 p-8 text-center space-y-2">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-bold text-slate-700">No pages added yet</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Take a clear photo of textbook exercises, handwritten notebook questions, or upload a multi-page question paper PDF. You can rotate, reorder, preview, and add more pages before scanning.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-700">
                    Uploaded Pages (processed in exact order below)
                  </p>
                  {pages.length < MAX_PAGES && (
                    <button
                      type="button"
                      onClick={() => imageUploadInputRef.current?.click()}
                      className="inline-flex items-center gap-1 text-xs font-bold text-indigo-700 hover:text-indigo-900 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Scan / Add Another Page</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pages.map((page, idx) => (
                    <div
                      key={page.id}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-3 flex gap-3 items-start"
                    >
                      <button
                        type="button"
                        onClick={() => setPreviewPage(page)}
                        className="w-20 h-24 shrink-0 rounded-xl overflow-hidden border border-slate-200 bg-white relative group cursor-pointer"
                        title="Preview full page"
                      >
                        <img
                          src={page.dataUrl}
                          alt={`Page ${page.pageNumber}`}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Eye className="w-4 h-4" />
                        </span>
                      </button>

                      <div className="flex-1 min-w-0 space-y-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="px-2 py-0.5 rounded bg-indigo-600 text-white text-[11px] font-black">
                              Page {page.pageNumber}
                            </span>
                            <span className="text-[11px] text-slate-500 font-semibold">
                              {(page.byteSize / 1024).toFixed(0)} KB
                            </span>
                          </div>
                          <p className="text-xs font-bold text-slate-800 truncate mt-1">
                            {page.name}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setPreviewPage(page)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                            title="Preview full page"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void handleRotatePage(idx)}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer"
                            title="Rotate 90° clockwise"
                          >
                            <RotateCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMovePage(idx, -1)}
                            disabled={idx === 0}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:opacity-40"
                            title="Move earlier"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMovePage(idx, 1)}
                            disabled={idx === pages.length - 1}
                            className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 cursor-pointer disabled:opacity-40"
                            title="Move later"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemovePage(idx)}
                            className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 hover:bg-rose-100 text-rose-700 cursor-pointer"
                            title="Remove page"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right 5 cols: Subject, Language, Answer Style & Scan Submit */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h2 className="text-lg font-display font-black text-slate-900">
              Subject, Language &amp; Answer Format
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Document Title (for PDF &amp; Saving)
                </label>
                <input
                  type="text"
                  maxLength={140}
                  value={documentTitle}
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="e.g., Class 8 Maths Linear Equations Practice"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Answer Language
                </label>
                <select
                  value={answerLanguage}
                  onChange={(e) => setAnswerLanguage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {ANSWER_LANGUAGE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Answer Format Style
                </label>
                <div className="space-y-1.5">
                  {ANSWER_STYLE_OPTIONS.map((styleOpt) => {
                    const selected = answerStyle === styleOpt.id;
                    return (
                      <button
                        key={styleOpt.id}
                        type="button"
                        onClick={() => setAnswerStyle(styleOpt.id)}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all cursor-pointer ${
                          selected
                            ? 'border-indigo-600 bg-indigo-50/70'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-extrabold text-slate-900">
                            {styleOpt.label}
                          </span>
                          {selected && <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          {styleOpt.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => void handleRecognizePages()}
              disabled={pages.length === 0 || isRecognizing}
              className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-display font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRecognizing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Scanning {pages.length} Page(s) with SnapSolve AI...</span>
                </>
              ) : (
                <>
                  <ScanLine className="w-4 h-4" />
                  <span>Scan &amp; Extract Questions ({pages.length} Page{pages.length === 1 ? '' : 's'})</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: REVIEW & EDIT EXTRACTED QUESTIONS BEFORE SOLVING */}
      {activeWorkspaceTab === 'review' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h2 className="text-lg font-display font-black text-slate-900">
                Review &amp; Edit Extracted Questions ({questions.length})
              </h2>
              <p className="text-xs text-slate-600">
                Detected Subject: <strong>{detectedSubject || subject}</strong> · Detected Language:{' '}
                <strong>{detectedLanguage || 'English'}</strong> · Sequence preserved verbatim from your pages.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <select
                value={answerLanguage}
                onChange={(e) => setAnswerLanguage(e.target.value)}
                aria-label="Select answer language"
                className="px-2.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
              >
                {ANSWER_LANGUAGE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              <select
                value={answerStyle}
                onChange={(e) => setAnswerStyle(e.target.value as SnapSolveAnswerStyle)}
                aria-label="Select answer format style"
                className="px-2.5 py-2 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800"
              >
                {ANSWER_STYLE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setActiveWorkspaceTab('scan')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Scan Another Page</span>
              </button>

              <button
                type="button"
                onClick={() => void handleSolveQuestions()}
                disabled={questions.length === 0 || isSolving}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-black shadow-sm cursor-pointer disabled:opacity-50"
              >
                {isSolving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Solving {questions.length} Questions...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Solve All {questions.length} Questions</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {extractionWarnings.length > 0 && (
            <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 space-y-1 text-xs text-amber-950">
              <p className="font-bold">Scan Notes &amp; Warnings</p>
              <ul className="list-disc pl-5 space-y-0.5">
                {extractionWarnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}

          {questions.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-center text-sm text-slate-600">
              No readable questions were detected. Try rotating or retaking the photo with brighter lighting.
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q, idx) => (
                <div
                  key={q.id}
                  className={`rounded-2xl border p-4 space-y-2.5 ${
                    q.isReadable
                      ? 'border-slate-200 bg-slate-50/60'
                      : 'border-amber-300 bg-amber-50/70'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-indigo-600 text-white text-xs font-black">
                        #{q.order}
                      </span>
                      <input
                        type="text"
                        value={q.numberLabel}
                        onChange={(e) => {
                          const val = e.target.value;
                          setQuestions((prev) =>
                            prev.map((item, i) =>
                              i === idx ? { ...item, numberLabel: val } : item
                            )
                          );
                        }}
                        aria-label={`Question ${q.order} label`}
                        className="w-24 px-2 py-1 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">
                        Page {q.pageNumber} · Type: {q.questionType.replace('_', ' ')}
                      </span>
                      {!q.isReadable && (
                        <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-950 text-[11px] font-extrabold">
                          Unclear / Unreadable — Edit text below to solve
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setQuestions((prev) =>
                          prev
                            .filter((_, i) => i !== idx)
                            .map((item, i) => ({ ...item, order: i + 1 }))
                        );
                      }}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>

                  {!q.isReadable && q.unreadableReason && (
                    <p className="text-xs text-amber-900 font-medium">
                      Reason noted by scanner: {q.unreadableReason}
                    </p>
                  )}

                  <textarea
                    rows={2}
                    value={q.questionText}
                    onChange={(e) => {
                      const val = e.target.value;
                      setQuestions((prev) =>
                        prev.map((item, i) =>
                          i === idx
                            ? {
                                ...item,
                                questionText: val,
                                isReadable: Boolean(val.trim()),
                              }
                            : item
                        )
                      );
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {q.hasDiagram && q.diagramDescription && (
                    <p className="text-[11px] text-slate-600 bg-white border border-slate-200 rounded-lg px-2.5 py-1.5">
                      <strong>Diagram context:</strong> {q.diagramDescription}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SEQUENTIAL RESULTS + PDF / PRINT / SAVE CONTROLS */}
      {activeWorkspaceTab === 'results' && (
        <div className="space-y-4">
          {/* Action Toolbar */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <div>
                <h2 className="text-base sm:text-lg font-display font-black text-slate-900">
                  {documentTitle || 'Solved Questions & Answers'}
                </h2>
                <p className="text-xs text-slate-600">
                  {solvedCount} of {solutions.length} answered in exact scanned sequence · Format:{' '}
                  <strong>{ANSWER_STYLE_OPTIONS.find((s) => s.id === answerStyle)?.label}</strong>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPrintPreviewDoc(buildUniversalPdfDoc())}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Preview &amp; Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    printUniversalDocument(buildUniversalPdfDoc(), {
                      paperSize: 'A4',
                      orientation: 'portrait',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>

                <button
                  type="button"
                  onClick={() => void handleSaveToMyDocuments()}
                  disabled={isSavingDoc}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer disabled:opacity-50"
                >
                  {isSavingDoc ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : isAuthenticated ? (
                    <Save className="w-3.5 h-3.5" />
                  ) : (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                  <span>{loadedSavedDocId ? 'Update Saved Doc' : 'Save to My Documents'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveWorkspaceTab('scan')}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Scan Another Page</span>
                </button>
              </div>
            </div>

            {/* Failed item partial retry bar & Prev/Next navigator */}
            <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => jumpToQuestionIndex(focusedIndex - 1)}
                  disabled={focusedIndex <= 0}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous Question</span>
                </button>
                <button
                  type="button"
                  onClick={() => jumpToQuestionIndex(focusedIndex + 1)}
                  disabled={focusedIndex >= solutions.length - 1}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer disabled:opacity-40"
                >
                  <span>Next Question</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setCollapsedById({})}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 cursor-pointer"
                >
                  Expand All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next: Record<string, boolean> = {};
                    solutions.forEach((s) => {
                      next[s.questionId] = true;
                    });
                    setCollapsedById(next);
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-bold text-slate-700 cursor-pointer"
                >
                  Collapse All
                </button>
              </div>

              {failedSolutionIds.length > 0 && sessionId && (
                <button
                  type="button"
                  onClick={() => void handleSolveQuestions(failedSolutionIds)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retry Failed Questions Only ({failedSolutionIds.length})</span>
                </button>
              )}
            </div>

            {sessionId && (
              <div className="pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-600">
                  Switch Language or Answer Style:
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={answerLanguage}
                    onChange={(e) => setAnswerLanguage(e.target.value)}
                    aria-label="Change answer language"
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800"
                  >
                    {ANSWER_LANGUAGE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <select
                    value={answerStyle}
                    onChange={(e) => setAnswerStyle(e.target.value as SnapSolveAnswerStyle)}
                    aria-label="Change answer style"
                    className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-800"
                  >
                    {ANSWER_STYLE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    disabled={isSolving}
                    onClick={() => void handleSolveQuestions()}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 text-xs font-extrabold cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSolving ? 'animate-spin' : ''}`} />
                    <span>{isSolving ? 'Updating...' : 'Apply & Re-Solve'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sequential Q&A Cards */}
          <div className="space-y-3.5">
            {solutions.map((item, idx) => {
              const collapsed = Boolean(collapsedById[item.questionId]);
              const isRetrying = Boolean(retryingQuestionIds[item.questionId]);
              const isEditingQuestion = editingQuestionId === item.questionId;
              const isEditingAnswer = editingAnswerId === item.questionId;
              const matchedQuestion = questions.find((q) => q.id === item.questionId);
              const canRetryIndividually = Boolean(
                sessionId && sessionSecret && (matchedQuestion?.isReadable ?? item.status !== 'unreadable')
              );

              return (
                <div
                  key={item.questionId}
                  ref={(el) => {
                    questionCardRefs.current[item.questionId] = el;
                  }}
                  className={`bg-white rounded-3xl border shadow-xs overflow-hidden transition-all ${
                    focusedIndex === idx
                      ? 'border-indigo-400 ring-2 ring-indigo-100'
                      : 'border-slate-200'
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-100 flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-xs font-black">
                          {item.numberLabel || `Q${item.order}`}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                            item.status === 'solved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : item.status === 'unreadable'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {item.status === 'solved'
                            ? 'Solved'
                            : item.status === 'unreadable'
                            ? 'Unreadable Image Section'
                            : 'Failed — Retry Available'}
                        </span>
                      </div>

                      {!isEditingQuestion ? (
                        <p className="text-sm sm:text-base font-bold text-slate-900 whitespace-pre-wrap leading-relaxed">
                          {item.questionText}
                        </p>
                      ) : (
                        <div className="space-y-2 pt-1">
                          <textarea
                            rows={3}
                            value={editingQuestionDraft}
                            onChange={(e) => setEditingQuestionDraft(e.target.value)}
                            className="w-full px-3 py-2 rounded-xl border border-indigo-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => void handleSaveEditedQuestionAndRegenerate(item.questionId)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                            >
                              <RefreshCw className="w-3.5 h-3.5" />
                              <span>Save &amp; Regenerate Answer</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingQuestionId(null)}
                              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-bold text-slate-700 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAnswerId(null);
                          setEditingQuestionId(item.questionId);
                          setEditingQuestionDraft(item.questionText);
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-[11px] font-bold text-slate-700 cursor-pointer"
                        title="Edit question text & regenerate answer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Edit Question</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStartEditingAnswer(item)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-[11px] font-bold text-indigo-800 cursor-pointer"
                        title="Edit generated answer directly without reprocessing the document"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Answer</span>
                      </button>

                      {canRetryIndividually && (
                        <button
                          type="button"
                          disabled={isRetrying || isSolving}
                          onClick={() => void handleSolveQuestions([item.questionId])}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border border-amber-200 bg-amber-50 hover:bg-amber-100 text-[11px] font-bold text-amber-900 cursor-pointer disabled:opacity-50"
                          title="Retry only this question"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isRetrying ? 'animate-spin' : ''}`} />
                          <span className="hidden sm:inline">Retry</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => void handleCopyAnswer(item)}
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedId === item.questionId ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setCollapsedById((prev) => ({
                            ...prev,
                            [item.questionId]: !collapsed,
                          }))
                        }
                        className="p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 cursor-pointer"
                        title={collapsed ? 'Expand answer' : 'Collapse answer'}
                      >
                        {collapsed ? (
                          <ChevronDown className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronUp className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  {!collapsed && (
                    <div className="p-4 sm:p-5 space-y-3">
                      {isRetrying ? (
                        <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 py-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Regenerating answer for {item.numberLabel}...</span>
                        </div>
                      ) : isEditingAnswer ? (
                        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-4 space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-black text-indigo-950">
                              Edit Generated Answer ({item.numberLabel || `Q${item.order}`}) — Direct Save, Zero Reprocessing
                            </p>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Step-by-Step Working (one step per line)
                            </label>
                            <textarea
                              rows={4}
                              value={editingAnswerDraft.stepsText}
                              onChange={(e) =>
                                setEditingAnswerDraft((prev) => ({
                                  ...prev,
                                  stepsText: e.target.value,
                                }))
                              }
                              placeholder="Step 1: Given values..."
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Main Answer / Explanation
                            </label>
                            <textarea
                              rows={3}
                              value={editingAnswerDraft.answerText}
                              onChange={(e) =>
                                setEditingAnswerDraft((prev) => ({
                                  ...prev,
                                  answerText: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold text-slate-700 mb-1">
                              Final Answer
                            </label>
                            <input
                              type="text"
                              value={editingAnswerDraft.finalAnswer}
                              onChange={(e) =>
                                setEditingAnswerDraft((prev) => ({
                                  ...prev,
                                  finalAnswer: e.target.value,
                                }))
                              }
                              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                          </div>

                          {isTeacher && (
                            <div>
                              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                                Teacher Evaluation Cue (Optional)
                              </label>
                              <input
                                type="text"
                                value={editingAnswerDraft.teachingNote}
                                onChange={(e) =>
                                  setEditingAnswerDraft((prev) => ({
                                    ...prev,
                                    teachingNote: e.target.value,
                                  }))
                                }
                                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              />
                            </div>
                          )}

                          <div className="flex flex-wrap gap-2 pt-1">
                            <button
                              type="button"
                              onClick={() => handleSaveEditedAnswer(item.questionId)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer"
                            >
                              <Save className="w-3.5 h-3.5" />
                              <span>Save Answer Changes</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingAnswerId(null)}
                              className="px-3.5 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : item.status === 'solved' ? (
                        <>
                          {item.steps.length > 0 && (
                            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-3.5 space-y-1.5">
                              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-600">
                                Step-by-Step Solution
                              </p>
                              <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm text-slate-800 leading-relaxed">
                                {item.steps.map((step, sIdx) => (
                                  <li key={sIdx}>{step}</li>
                                ))}
                              </ol>
                            </div>
                          )}

                          {item.answerText && (
                            <div className="text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                              {item.answerText}
                            </div>
                          )}

                          {item.finalAnswer && (
                            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-xs sm:text-sm text-emerald-950 font-bold">
                              Final Answer: {item.finalAnswer}
                            </div>
                          )}

                          {isTeacher && item.teachingNote && (
                            <div className="rounded-xl bg-teal-50 border border-teal-200 px-3.5 py-2.5 text-xs text-teal-950">
                              <strong>Teacher Evaluation Cue:</strong> {item.teachingNote}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 flex flex-wrap items-center justify-between gap-3">
                          <p className="text-xs text-amber-950 font-medium">
                            {item.errorMessage || 'Could not generate answer for this question.'}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setEditingAnswerId(null);
                                setEditingQuestionId(item.questionId);
                                setEditingQuestionDraft(item.questionText);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white border border-amber-300 text-xs font-bold text-amber-900 cursor-pointer"
                            >
                              Edit Question
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartEditingAnswer(item)}
                              className="px-3 py-1.5 rounded-lg bg-white border border-indigo-300 text-xs font-bold text-indigo-900 cursor-pointer"
                            >
                              Write Answer Manually
                            </button>
                            {sessionId && item.status === 'failed' && (
                              <button
                                type="button"
                                onClick={() => void handleSolveQuestions([item.questionId])}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black cursor-pointer"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                                <span>Retry This Question</span>
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: ROLE-ISOLATED MY SAVED DOCUMENTS */}
      {activeWorkspaceTab === 'saved' && (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-display font-black text-slate-900">
                {isTeacher ? 'Saved Teacher Answer Keys' : 'Saved Student SnapSolve Documents'}
              </h2>
              <p className="text-xs text-slate-600">
                Private to your signed-in {isTeacher ? 'Teacher' : 'Student'} account. Only extracted questions &amp; generated answers are stored (source photos are never retained permanently).
              </p>
            </div>
            {isAuthenticated && (
              <button
                type="button"
                onClick={() => void loadSavedDocuments()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loadingSavedDocs ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            )}
          </div>

          {!isAuthenticated ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center space-y-3">
              <Lock className="w-7 h-7 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-800">
                Sign in to save or view your personal My Documents library
              </p>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Instant Scan &amp; Solve works without saving anything permanently. Sign in only if you want to store solved sets in your private My Documents history.
              </p>
              {onRequireAuth && (
                <button
                  type="button"
                  onClick={onRequireAuth}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold cursor-pointer"
                >
                  Login / Register to Save Documents
                </button>
              )}
            </div>
          ) : loadingSavedDocs ? (
            <div className="py-10 flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
              <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
              <span>Loading your private saved documents...</span>
            </div>
          ) : savedDocs.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 border border-slate-200 p-8 text-center space-y-2">
              <FolderOpen className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700">No saved SnapSolve documents yet</p>
              <p className="text-xs text-slate-500">
                After scanning and solving questions, click &ldquo;Save to My Documents&rdquo; to keep the Q&amp;A set here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {savedDocs.map((docItem) => (
                <div
                  key={docItem.id}
                  className="rounded-2xl border border-slate-200 p-4 flex flex-col justify-between gap-3 hover:border-indigo-300 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-800 text-[11px] font-bold">
                        {docItem.subject}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {new Date(docItem.updatedAt).toLocaleDateString('en-IN')}
                      </span>
                    </div>
                    <h3 className="text-sm font-black text-slate-900">{docItem.title}</h3>
                    <p className="text-xs text-slate-600">
                      {docItem.questions.length} question(s) · {docItem.answerLanguage}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => handleOpenSavedDocument(docItem)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Open Answers</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const pdfDoc: UniversalPdfDocument = {
                          title: docItem.title,
                          subtitle: `${isTeacher ? 'Teacher Answer Key' : 'Student Solved Questions'} · ${docItem.subject}`,
                          portalBadge: isTeacher ? 'TEACHER SNAPSOLVE' : 'STUDENT SNAPSOLVE',
                          metaItems: [
                            `Subject: ${docItem.subject}`,
                            `Language: ${docItem.answerLanguage}`,
                            `Questions: ${docItem.solutions.length}`,
                          ],
                          qaItems: docItem.solutions.map((s) => ({
                            numberLabel: s.numberLabel,
                            question:
                              docItem.questions.find((q) => q.id === s.questionId)?.questionText || '',
                            answer: s.answerText || undefined,
                            steps: s.steps?.length ? s.steps : undefined,
                            finalAnswer: s.finalAnswer || undefined,
                          })),
                          footerNote: 'MyStudyZone SnapSolve AI · Learn • Practice • Excel',
                        };
                        void downloadUniversalPdf(pdfDoc, {
                          paperSize: 'A4',
                          orientation: 'portrait',
                        });
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-xs font-bold text-slate-800 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF (A4)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => void handleDeleteSavedDocument(docItem.id)}
                      className="ml-auto p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 cursor-pointer"
                      title="Delete saved document"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Fullscreen Page Preview Modal */}
      {previewPage && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setPreviewPage(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
              <span className="text-sm font-black text-slate-900">
                Page {previewPage.pageNumber}: {previewPage.name}
              </span>
              <button
                type="button"
                onClick={() => setPreviewPage(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1 bg-slate-100 flex items-center justify-center">
              <img
                src={previewPage.dataUrl}
                alt={`Preview of page ${previewPage.pageNumber}`}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow"
              />
            </div>
          </div>
        </div>
      )}

      {/* Live Camera Capture Modal */}
      {isCameraOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-xl w-full overflow-hidden text-white shadow-2xl">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-sm font-black">Live Camera Question Scanner</span>
              <button
                type="button"
                onClick={stopCameraStream}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              {cameraError ? (
                <div className="rounded-2xl bg-rose-950/60 border border-rose-700/70 p-4 text-xs text-rose-100">
                  {cameraError}
                </div>
              ) : (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full rounded-2xl bg-black max-h-[55vh] object-contain"
                />
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={stopCameraStream}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                {!cameraError && (
                  <button
                    type="button"
                    onClick={() => void captureFromLiveCamera()}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-black cursor-pointer"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Capture Page</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Universal A4 PDF & Print Preview Modal */}
      <UniversalPrintPreviewModal
        documentPayload={printPreviewDoc}
        defaultPaperSize="A4"
        defaultOrientation="portrait"
        onClose={() => setPrintPreviewDoc(null)}
      />
    </div>
  );
};
