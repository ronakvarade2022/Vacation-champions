import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Edit3,
  FileSpreadsheet,
  FileText,
  GraduationCap,
  Image as ImageIcon,
  Layers,
  Loader2,
  Mail,
  PenTool,
  Presentation,
  Printer,
  RefreshCw,
  Search,
  ShieldAlert,
  Sparkles,
  Table as TableIcon,
  Wrench,
} from 'lucide-react';
import {
  downloadBase64ImagePng,
  downloadDocumentAsDocx,
  downloadJsonFile,
  downloadPlainTextFile,
  downloadPresentationAsPdf,
  downloadPresentationAsPptx,
  downloadResumeAsPdf,
  downloadTableAsXlsx,
  downloadTextAsPdf,
  type PdfSectionBlock,
  type PresentationSlideExportItem,
  type PrintExportPayload,
} from '../../utils/realFileExports';
import {
  STUDENT_30_AI_TOOLS,
  TEACHER_40_AI_TOOLS,
  type RoleAiToolDefinition,
} from '../../data/aiToolsCatalog';
import { ALL_10_CLASSES, getSubjectsForClass } from '../../data/classCurriculumConfig';
import { getRichChaptersForSubject } from '../../data/worksheets/builders/chapterCatalog';
import { PrintPreviewStudio } from '../productivity/PrintPreviewStudio';
import type { ClassLevel, EducationBoard, SubjectName } from '../../types';

export type AiHubToolId =
  | 'pdf_maker'
  | 'image_generator'
  | 'worksheet_generator'
  | 'question_paper_generator'
  | 'notes_generator'
  | 'presentation_maker'
  | 'quiz_generator'
  | 'resume_maker'
  | 'letter_generator'
  | 'content_generator';

interface AiToolMeta {
  id: AiHubToolId;
  title: string;
  shortDesc: string;
  category: 'Documents & Exports' | 'Classroom & Exams' | 'Visual & Career';
  icon: React.ComponentType<{ className?: string }>;
  offlineReady?: boolean;
}

const CORE_10_TOOLS: AiToolMeta[] = [
  { id: 'pdf_maker', title: 'AI PDF Maker', shortDesc: 'Compile custom study PDFs manually or draft full documents with Gemini.', category: 'Documents & Exports', icon: FileText, offlineReady: true },
  { id: 'image_generator', title: 'AI Image Generator', shortDesc: 'Create school-safe diagrams, charts & illustrations and export PNG.', category: 'Visual & Career', icon: ImageIcon },
  { id: 'worksheet_generator', title: 'AI Worksheet Generator', shortDesc: 'Generate board-aligned practice worksheets with full answer keys.', category: 'Classroom & Exams', icon: FileSpreadsheet },
  { id: 'question_paper_generator', title: 'AI Question Paper Generator', shortDesc: 'Build formal exam papers (20–100 marks) with marking schemes.', category: 'Classroom & Exams', icon: ClipboardCheck },
  { id: 'notes_generator', title: 'AI Notes Generator', shortDesc: 'Produce chapter summaries, definitions, formulas & worked examples.', category: 'Classroom & Exams', icon: BookOpen },
  { id: 'presentation_maker', title: 'AI Presentation Maker', shortDesc: 'Draft classroom slide decks with speaker notes and PPTX/PDF export.', category: 'Documents & Exports', icon: Presentation },
  { id: 'quiz_generator', title: 'AI Quiz Generator', shortDesc: 'Generate interactive MCQs you can play right here or export as PDF/JSON.', category: 'Classroom & Exams', icon: Sparkles },
  { id: 'resume_maker', title: 'AI Resume Maker', shortDesc: 'Build & export teacher/student resumes to PDF with optional AI polish.', category: 'Visual & Career', icon: Briefcase, offlineReady: true },
  { id: 'letter_generator', title: 'AI Letter Generator', shortDesc: 'Draft leave applications, bonafide requests, PTM circulars & notices.', category: 'Documents & Exports', icon: Mail },
  { id: 'content_generator', title: 'AI Content Generator', shortDesc: 'Create assembly speeches, lesson hooks, study guides & newsletters.', category: 'Visual & Career', icon: PenTool },
];

interface AiStatusState {
  loading: boolean;
  configured: boolean;
  textModel: string;
  imageModel: string;
  message: string;
}

interface StructuredDocOutput {
  title: string;
  subtitle?: string;
  sections: PdfSectionBlock[];
}

interface StructuredTableOutput {
  title: string;
  subtitle?: string;
  columns: string[];
  rows: string[][];
  notes?: string;
}

interface FlashcardItem {
  front: string;
  back: string;
  hint?: string;
}

interface FlashcardsOutput {
  title: string;
  subtitle?: string;
  cards: FlashcardItem[];
}

interface QuizQuestionOutput {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
}

interface QuizOutput {
  title: string;
  questions: QuizQuestionOutput[];
}

interface PresentationOutput {
  title: string;
  subtitle?: string;
  slides: PresentationSlideExportItem[];
}

export type StudioModeTab = 'student_30' | 'teacher_40' | 'core_10';

export interface AIToolsHubViewProps {
  portalMode?: 'student' | 'teacher' | 'all';
  studentContext?: {
    board?: EducationBoard;
    classLevel?: ClassLevel;
    medium?: string;
    name?: string;
  };
  onOpenDocumentStudio?: (initialTab?: 'images' | 'pdf_office' | 'print_preview' | 'qr_barcode') => void;
  onBackHome: () => void;
}

export const AIToolsHubView: React.FC<AIToolsHubViewProps> = ({
  portalMode = 'all',
  studentContext,
  onOpenDocumentStudio,
  onBackHome,
}) => {
  const defaultStudioTab: StudioModeTab =
    portalMode === 'teacher'
      ? 'teacher_40'
      : portalMode === 'student'
      ? 'student_30'
      : 'student_30';

  const [studioTab, setStudioTab] = useState<StudioModeTab>(defaultStudioTab);
  const [selectedCoreTool, setSelectedCoreTool] = useState<AiHubToolId>('pdf_maker');
  const [selectedTeacherToolId, setSelectedTeacherToolId] = useState<string>(TEACHER_40_AI_TOOLS[0].id);
  const [selectedStudentToolId, setSelectedStudentToolId] = useState<string>(STUDENT_30_AI_TOOLS[0].id);
  const [toolSearchQuery, setToolSearchQuery] = useState<string>('');
  const [toolCategoryFilter, setToolCategoryFilter] = useState<string>('All');

  useEffect(() => {
    if (portalMode === 'teacher') setStudioTab('teacher_40');
    else if (portalMode === 'student') setStudioTab('student_30');
  }, [portalMode]);

  const [aiStatus, setAiStatus] = useState<AiStatusState>({
    loading: true,
    configured: false,
    textModel: 'gemini-4-hydrogen',
    imageModel: 'gemini-3.1-flash-lite-image',
    message: 'Checking server AI configuration...',
  });

  // Curriculum Inputs (Auto-populated from registered Student/Teacher context when available)
  const [board, setBoard] = useState<EducationBoard>(studentContext?.board || 'Maharashtra');
  const [classLevel, setClassLevel] = useState<ClassLevel>(studentContext?.classLevel || 'Class 5');
  const availableSubjects = useMemo(
    () => getSubjectsForClass(classLevel, board),
    [classLevel, board]
  );
  const [subject, setSubject] = useState<string>(() => availableSubjects[0] || 'Mathematics');
  const [language, setLanguage] = useState<string>(studentContext?.medium || 'English');
  const [selectedSyllabusChapter, setSelectedSyllabusChapter] = useState<string>('');
  const [topic, setTopic] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [count, setCount] = useState<number>(6);
  const [marks, setMarks] = useState<number>(40);
  const [duration, setDuration] = useState<string>('90 Minutes');
  const [difficulty, setDifficulty] = useState<string>('Balanced (Easy + Medium + HOTS)');
  const [letterType, setLetterType] = useState<string>('Student Leave Application');
  const [contentFormat, setContentFormat] = useState<string>('Morning Assembly Speech');

  useEffect(() => {
    if (studentContext?.board) setBoard(studentContext.board);
    if (studentContext?.classLevel) setClassLevel(studentContext.classLevel);
    if (studentContext?.medium) setLanguage(studentContext.medium);
  }, [studentContext?.board, studentContext?.classLevel, studentContext?.medium]);

  useEffect(() => {
    if (availableSubjects.length > 0 && !availableSubjects.includes(subject as SubjectName)) {
      setSubject(availableSubjects[0]);
    }
  }, [availableSubjects, subject]);

  const syllabusChapterOptions = useMemo(
    () => getRichChaptersForSubject(board, classLevel, subject as SubjectName),
    [board, classLevel, subject]
  );

  // Offline / Manual PDF Maker inputs
  const [manualPdfTitle, setManualPdfTitle] = useState<string>('Chapter Practice Notes');
  const [manualPdfSubtitle, setManualPdfSubtitle] = useState<string>(`${board} · ${classLevel}`);
  const [manualPdfBody, setManualPdfBody] = useState<string>(
    '1. Key Concept Summary\nWrite or paste your classroom notes, formulas, or solved homework here.\n\n2. Worked Examples\nExample 1: Write step-by-step calculations clearly.'
  );

  // Image generator inputs & output
  const [imagePrompt, setImagePrompt] = useState<string>('');
  const [imageStyle, setImageStyle] = useState<string>('Clean Educational Textbook Diagram');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '16:9' | '4:3' | '3:4'>('16:9');
  const [imageResult, setImageResult] = useState<{
    dataUrl: string;
    caption: string;
    aspectRatio: string;
  } | null>(null);

  // Resume Maker inputs
  const [resumeName, setResumeName] = useState<string>(studentContext?.name || '');
  const [resumeHeadline, setResumeHeadline] = useState<string>('Mathematics & Science Educator (B.Ed., TET Qualified)');
  const [resumeEmail, setResumeEmail] = useState<string>('');
  const [resumePhone, setResumePhone] = useState<string>('');
  const [resumeLocation, setResumeLocation] = useState<string>('Pune, Maharashtra');
  const [resumeSummary, setResumeSummary] = useState<string>(
    'Dedicated educator committed to concept clarity, activity-based teaching, and continuous assessment across Classes 1 to 10.'
  );
  const [resumeExpRole, setResumeExpRole] = useState<string>('Assistant Teacher');
  const [resumeExpOrg, setResumeExpOrg] = useState<string>('Adarsh Vidyalaya');
  const [resumeExpDuration, setResumeExpDuration] = useState<string>('2022 – Present');
  const [resumeExpHighlights, setResumeExpHighlights] = useState<string>(
    'Designed weekly practice worksheets and remedial sessions for Std 5–8\nConducted Science & Maths Olympiad preparation workshops'
  );
  const [resumeEduDegree, setResumeEduDegree] = useState<string>('B.Sc., B.Ed.');
  const [resumeEduInst, setResumeEduInst] = useState<string>('Savitribai Phule Pune University');
  const [resumeEduYear, setResumeEduYear] = useState<string>('2021');
  const [resumeSkillsRaw, setResumeSkillsRaw] = useState<string>(
    'Lesson Planning, Classroom Assessment, CBSE & SSC Pedagogy, Digital Worksheets'
  );

  // Generation State & Interactive Outputs
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorBanner, setErrorBanner] = useState<{ code?: string; message: string } | null>(null);
  const [docOutput, setDocOutput] = useState<StructuredDocOutput | null>(null);
  const [tableOutput, setTableOutput] = useState<StructuredTableOutput | null>(null);
  const [flashcardsOutput, setFlashcardsOutput] = useState<FlashcardsOutput | null>(null);
  const [flippedCardMap, setFlippedCardMap] = useState<Record<number, boolean>>({});
  const [quizOutput, setQuizOutput] = useState<QuizOutput | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [deckOutput, setDeckOutput] = useState<PresentationOutput | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [printPreviewPayload, setPrintPreviewPayload] = useState<PrintExportPayload | null>(null);

  const loadAiStatus = async () => {
    setAiStatus((prev) => ({ ...prev, loading: true }));
    try {
      const res = await fetch('/api/ai/status');
      const data = await res.json();
      setAiStatus({
        loading: false,
        configured: Boolean(data?.configured),
        textModel: String(data?.textModel || 'gemini-4-hydrogen'),
        imageModel: String(data?.imageModel || 'gemini-3.1-flash-lite-image'),
        message: String(data?.message || ''),
      });
    } catch {
      setAiStatus({
        loading: false,
        configured: false,
        textModel: 'gemini-4-hydrogen',
        imageModel: 'gemini-3.1-flash-lite-image',
        message: 'Could not reach /api/ai/status on the backend server.',
      });
    }
  };

  useEffect(() => {
    void loadAiStatus();
  }, []);

  const activeRoleCatalog = useMemo(() => {
    const base = studioTab === 'teacher_40' ? TEACHER_40_AI_TOOLS : STUDENT_30_AI_TOOLS;
    const q = toolSearchQuery.trim().toLowerCase();
    return base.filter((t) => {
      if (toolCategoryFilter !== 'All' && t.category !== toolCategoryFilter) return false;
      if (!q) return true;
      return (
        t.title.toLowerCase().includes(q) ||
        t.desc.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    });
  }, [studioTab, toolSearchQuery, toolCategoryFilter]);

  const roleCategories = useMemo(() => {
    const base = studioTab === 'teacher_40' ? TEACHER_40_AI_TOOLS : STUDENT_30_AI_TOOLS;
    return ['All', ...Array.from(new Set(base.map((t) => t.category)))];
  }, [studioTab]);

  const activeRoleTool: RoleAiToolDefinition = useMemo(() => {
    if (studioTab === 'teacher_40') {
      return TEACHER_40_AI_TOOLS.find((t) => t.id === selectedTeacherToolId) || TEACHER_40_AI_TOOLS[0];
    }
    return STUDENT_30_AI_TOOLS.find((t) => t.id === selectedStudentToolId) || STUDENT_30_AI_TOOLS[0];
  }, [studioTab, selectedTeacherToolId, selectedStudentToolId]);

  const currentCoreMeta = CORE_10_TOOLS.find((t) => t.id === selectedCoreTool) || CORE_10_TOOLS[0];

  const clearOutputs = () => {
    setDocOutput(null);
    setTableOutput(null);
    setFlashcardsOutput(null);
    setQuizOutput(null);
    setDeckOutput(null);
    setErrorBanner(null);
  };

  const handleGenerateRoleTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);
    const effectiveTopic = topic.trim() || selectedSyllabusChapter.trim();
    if (!effectiveTopic) {
      setErrorBanner({
        code: 'MISSING_PROMPT',
        message: 'Please select a chapter or enter a topic/question before generating.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: studioTab === 'teacher_40' ? 'teacher_productivity_tool' : 'student_learning_tool',
          roleToolId: activeRoleTool.id,
          toolName: activeRoleTool.title,
          toolCategory: activeRoleTool.category,
          outputKind: activeRoleTool.outputKind,
          topic: effectiveTopic,
          board,
          classLevel,
          subject,
          language,
          instructions: `${activeRoleTool.defaultInstructions} ${instructions}`.trim(),
          count,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        setErrorBanner({
          code: data?.errorCode || `HTTP_${response.status}`,
          message: data?.message || 'AI generation failed.',
        });
        return;
      }

      const structured = data.structured || {};
      const outKind = data.outputKind || activeRoleTool.outputKind;

      clearOutputs();
      if (outKind === 'quiz') {
        setQuizOutput({
          title: structured.title || `${activeRoleTool.title} — ${effectiveTopic}`,
          questions: Array.isArray(structured.questions) ? structured.questions : [],
        });
        setQuizAnswers({});
        setQuizSubmitted(false);
      } else if (outKind === 'slides') {
        setDeckOutput({
          title: structured.title || effectiveTopic,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          slides: Array.isArray(structured.slides) ? structured.slides : [],
        });
        setActiveSlideIdx(0);
      } else if (outKind === 'table') {
        setTableOutput({
          title: structured.title || activeRoleTool.title,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          columns: Array.isArray(structured.columns) ? structured.columns : ['Item', 'Details'],
          rows: Array.isArray(structured.rows) ? structured.rows : [],
          notes: structured.notes ? String(structured.notes) : '',
        });
      } else if (outKind === 'flashcards') {
        setFlashcardsOutput({
          title: structured.title || activeRoleTool.title,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          cards: Array.isArray(structured.cards) ? structured.cards : [],
        });
        setFlippedCardMap({});
      } else {
        setDocOutput({
          title: structured.title || `${activeRoleTool.title}: ${effectiveTopic}`,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          sections: Array.isArray(structured.sections) ? structured.sections : [],
        });
      }
      setEditMode(false);
    } catch {
      setErrorBanner({
        code: 'NETWORK_ERROR',
        message: 'Network error while reaching /api/ai/generate.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateCoreTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);

    let effectiveTopic = topic.trim() || selectedSyllabusChapter.trim();
    let effectiveInstructions = instructions.trim();
    if (selectedCoreTool === 'question_paper_generator') {
      effectiveInstructions = `Total Marks: ${marks}. Duration: ${duration}. Difficulty: ${difficulty}. ${instructions}`.trim();
    } else if (selectedCoreTool === 'letter_generator') {
      effectiveTopic = `${letterType}: ${effectiveTopic}`.trim();
    } else if (selectedCoreTool === 'content_generator') {
      effectiveTopic = `${contentFormat} on "${effectiveTopic}"`.trim();
    } else if (selectedCoreTool === 'resume_maker') {
      effectiveTopic = [
        `Name: ${resumeName || 'Educator / Student'}`,
        `Headline: ${resumeHeadline}`,
        `Summary: ${resumeSummary}`,
        `Experience: ${resumeExpRole} at ${resumeExpOrg} (${resumeExpDuration}) - ${resumeExpHighlights}`,
        `Education: ${resumeEduDegree}, ${resumeEduInst} (${resumeEduYear})`,
        `Skills: ${resumeSkillsRaw}`,
      ].join('\n');
    }

    if (!effectiveTopic) {
      setErrorBanner({
        code: 'MISSING_PROMPT',
        message: 'Please enter a topic, chapter, or request before generating.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          toolId: selectedCoreTool,
          topic: effectiveTopic,
          board,
          classLevel,
          subject,
          language,
          instructions: effectiveInstructions,
          count,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        setErrorBanner({
          code: data?.errorCode || `HTTP_${response.status}`,
          message: data?.message || 'AI request failed.',
        });
        return;
      }

      const structured = data.structured || {};
      clearOutputs();
      if (selectedCoreTool === 'quiz_generator') {
        setQuizOutput({
          title: structured.title || `${subject} Quiz · ${effectiveTopic}`,
          questions: Array.isArray(structured.questions) ? structured.questions : [],
        });
        setQuizAnswers({});
        setQuizSubmitted(false);
      } else if (selectedCoreTool === 'presentation_maker') {
        setDeckOutput({
          title: structured.title || effectiveTopic,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          slides: Array.isArray(structured.slides) ? structured.slides : [],
        });
        setActiveSlideIdx(0);
      } else if (selectedCoreTool === 'resume_maker') {
        if (structured.headline) setResumeHeadline(String(structured.headline));
        if (structured.summary) setResumeSummary(String(structured.summary));
        if (Array.isArray(structured.skills) && structured.skills.length > 0) {
          setResumeSkillsRaw(structured.skills.join(', '));
        }
        if (Array.isArray(structured.highlights) && structured.highlights.length > 0) {
          setResumeExpHighlights(structured.highlights.join('\n'));
        }
      } else {
        setDocOutput({
          title: structured.title || effectiveTopic,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          sections: Array.isArray(structured.sections) ? structured.sections : [],
        });
      }
      setEditMode(false);
    } catch {
      setErrorBanner({
        code: 'NETWORK_ERROR',
        message: 'Network error while reaching /api/ai/generate.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);
    if (!imagePrompt.trim()) {
      setErrorBanner({
        code: 'MISSING_PROMPT',
        message: 'Please describe the educational diagram or illustration to generate.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt.trim(),
          style: imageStyle,
          aspectRatio,
        }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) {
        setErrorBanner({
          code: data?.errorCode || `HTTP_${response.status}`,
          message: data?.message || 'Image generation failed.',
        });
        return;
      }
      setImageResult({
        dataUrl: data.imageDataUrl,
        caption: data.caption || imagePrompt.trim(),
        aspectRatio: data.aspectRatio || aspectRatio,
      });
    } catch {
      setErrorBanner({
        code: 'NETWORK_ERROR',
        message: 'Network error while reaching /api/ai/image.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDocPlainText = (doc: StructuredDocOutput): string => {
    const parts = [doc.title, doc.subtitle || '', '========================================'];
    for (const s of doc.sections) {
      if (s.heading) parts.push(`\n${s.heading}\n----------------------------------------`);
      parts.push(s.body);
    }
    return parts.filter(Boolean).join('\n');
  };

  const allowedTabs: Array<{ id: StudioModeTab; label: string; icon: React.ComponentType<{ className?: string }> }> =
    portalMode === 'teacher'
      ? [
          { id: 'teacher_40', label: 'Teacher 40 AI Productivity Tools', icon: Wrench },
          { id: 'core_10', label: 'Core 10 AI & Image Studio', icon: Sparkles },
        ]
      : portalMode === 'student'
      ? [
          { id: 'student_30', label: 'Student 30 AI Learning Tools', icon: GraduationCap },
          { id: 'core_10', label: 'Core 10 AI & PDF Studio', icon: Sparkles },
        ]
      : [
          { id: 'student_30', label: 'Student 30 AI Learning Tools', icon: GraduationCap },
          { id: 'teacher_40', label: 'Teacher 40 AI Productivity Tools', icon: Wrench },
          { id: 'core_10', label: 'Core 10 AI Generators', icon: Sparkles },
        ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            {onOpenDocumentStudio && (
              <button
                type="button"
                onClick={() => onOpenDocumentStudio('images')}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Document, Image, PDF, QR &amp; Print Studio</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => void loadAiStatus()}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${aiStatus.loading ? 'animate-spin' : ''}`} />
              <span>Refresh AI Status</span>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-indigo-300">
            MyStudyZone AI Productivity Ecosystem · Editable Outputs · PDF, DOCX, XLSX, PPTX &amp; Print Preview
          </p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
            {portalMode === 'teacher'
              ? 'Teacher Daily AI Productivity Studio (40+ Tools)'
              : portalMode === 'student'
              ? 'Student Daily AI Learning Studio (30+ Tools)'
              : 'Teacher (40 Tools) & Student (30 Tools) AI Productivity Studio'}
          </h1>
        </div>

        {/* Studio Switch Tabs */}
        <div className="flex flex-wrap gap-2">
          {allowedTabs.map((t) => {
            const Icon = t.icon;
            const active = studioTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setStudioTab(t.id);
                  setToolCategoryFilter('All');
                  setToolSearchQuery('');
                  setErrorBanner(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Live AI Runtime Status Banner */}
        <div
          className={`rounded-xl p-3 border text-xs flex items-center gap-2.5 ${
            aiStatus.loading
              ? 'bg-slate-800/80 border-slate-700 text-slate-200'
              : aiStatus.configured
              ? 'bg-emerald-950/60 border-emerald-700/70 text-emerald-100'
              : 'bg-amber-950/60 border-amber-700/70 text-amber-100'
          }`}
        >
          {aiStatus.configured ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <div>
            <span className="font-semibold">
              {aiStatus.configured
                ? `Gemini Ready (${aiStatus.textModel})`
                : 'Gemini API Key Required on Server'}
            </span>
            <span className="text-slate-300 ml-2">{aiStatus.message}</span>
          </div>
        </div>
      </div>

      {/* Main Two-Zone Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Tool Directory Sidebar */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
          {studioTab === 'core_10' ? (
            <>
              <div className="px-1 pb-2 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Core 10 AI Generators</h2>
                <span className="text-xs text-slate-500">10 Tools</span>
              </div>
              <div className="space-y-1.5">
                {CORE_10_TOOLS.map((tool, idx) => {
                  const Icon = tool.icon;
                  const active = selectedCoreTool === tool.id;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        setSelectedCoreTool(tool.id);
                        setErrorBanner(null);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-2.5 ${
                        active
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${active ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-indigo-700'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold truncate">
                          {idx + 1}. {tool.title}
                        </div>
                        <p className={`text-[11px] truncate ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                          {tool.shortDesc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          ) : (
            <>
              <div className="px-1 pb-2 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">
                  {studioTab === 'teacher_40' ? '40 Teacher Productivity Tools' : '30 Student Learning Tools'}
                </h2>
                <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                  {activeRoleCatalog.length} Shown
                </span>
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={toolSearchQuery}
                  onChange={(e) => setToolSearchQuery(e.target.value)}
                  placeholder="Search tools (e.g. Timetable, Notes, Solver)..."
                  className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-300 text-xs"
                />
              </div>

              <div className="flex flex-wrap gap-1">
                {roleCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setToolCategoryFilter(cat)}
                    className={`px-2 py-1 rounded-lg text-[11px] font-bold cursor-pointer ${
                      toolCategoryFilter === cat
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="space-y-1.5 max-h-[540px] overflow-y-auto pr-1">
                {activeRoleCatalog.map((tool) => {
                  const active = activeRoleTool.id === tool.id;
                  return (
                    <button
                      key={tool.id}
                      type="button"
                      onClick={() => {
                        if (studioTab === 'teacher_40') setSelectedTeacherToolId(tool.id);
                        else setSelectedStudentToolId(tool.id);
                        setErrorBanner(null);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl border transition-colors cursor-pointer ${
                        active
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold truncate">
                          {tool.num}. {tool.title}
                        </span>
                        <span
                          className={`text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded ${
                            active ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {tool.outputKind}
                        </span>
                      </div>
                      <p className={`text-[11px] mt-0.5 line-clamp-2 ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                        {tool.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </aside>

        {/* Right Interactive Generator & Output Editor */}
        <section className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <p className="text-xs font-semibold text-indigo-600">
                {studioTab === 'core_10'
                  ? `${currentCoreMeta.category} · Real File Export`
                  : `${activeRoleTool.category} · Tool #${activeRoleTool.num} · Output: ${activeRoleTool.outputKind.toUpperCase()}`}
              </p>
              <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                {studioTab === 'core_10' ? currentCoreMeta.title : activeRoleTool.title}
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">
                {studioTab === 'core_10' ? currentCoreMeta.shortDesc : activeRoleTool.desc}
              </p>
            </div>

            {errorBanner && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-3.5 text-xs text-rose-900 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">{errorBanner.code || 'Notice'}: </span>
                  <span>{errorBanner.message}</span>
                </div>
              </div>
            )}

            {/* CORE 10 SPECIAL CASES: IMAGE GENERATOR & RESUME MAKER */}
            {studioTab === 'core_10' && selectedCoreTool === 'image_generator' ? (
              <form onSubmit={handleGenerateImage} className="space-y-4 text-sm">
                <textarea
                  rows={3}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  placeholder="Describe educational diagram or illustration..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select value={imageStyle} onChange={(e) => setImageStyle(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 bg-white">
                    <option>Clean Educational Textbook Diagram</option>
                    <option>Classroom Infographic Chart</option>
                    <option>Watercolor Children Story Illustration</option>
                    <option>Minimalist Isometric Science Visual</option>
                  </select>
                  <select value={aspectRatio} onChange={(e) => setAspectRatio(e.target.value as any)} className="px-3 py-2 rounded-xl border border-slate-300 bg-white">
                    <option value="16:9">16:9 Widescreen</option>
                    <option value="4:3">4:3 Textbook</option>
                    <option value="1:1">1:1 Square</option>
                    <option value="3:4">3:4 Poster</option>
                  </select>
                </div>
                <button type="submit" disabled={isGenerating} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold cursor-pointer">
                  {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImageIcon className="w-4 h-4" />}
                  <span>{isGenerating ? 'Generating...' : 'Generate Image with Gemini'}</span>
                </button>
                {imageResult && (
                  <div className="pt-3 border-t border-slate-200 space-y-3">
                    <img src={imageResult.dataUrl} alt={imageResult.caption} className="max-h-96 mx-auto rounded-xl border" />
                    <button
                      type="button"
                      onClick={() => downloadBase64ImagePng(imageResult.dataUrl, 'mystudyzone_visual')}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" /> Download PNG
                    </button>
                  </div>
                )}
              </form>
            ) : studioTab === 'core_10' && selectedCoreTool === 'resume_maker' ? (
              <form onSubmit={handleGenerateCoreTool} className="space-y-3.5 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input type="text" value={resumeName} onChange={(e) => setResumeName(e.target.value)} placeholder="Full Name" className="px-3 py-2 rounded-xl border border-slate-300" />
                  <input type="text" value={resumeHeadline} onChange={(e) => setResumeHeadline(e.target.value)} placeholder="Headline" className="px-3 py-2 rounded-xl border border-slate-300" />
                  <input type="email" value={resumeEmail} onChange={(e) => setResumeEmail(e.target.value)} placeholder="Email" className="px-3 py-2 rounded-xl border border-slate-300" />
                  <input type="tel" value={resumePhone} onChange={(e) => setResumePhone(e.target.value)} placeholder="Phone" className="px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <textarea rows={2} value={resumeSummary} onChange={(e) => setResumeSummary(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" value={resumeExpRole} onChange={(e) => setResumeExpRole(e.target.value)} placeholder="Role" className="px-3 py-2 rounded-xl border border-slate-300" />
                  <input type="text" value={resumeExpOrg} onChange={(e) => setResumeExpOrg(e.target.value)} placeholder="School / Org" className="px-3 py-2 rounded-xl border border-slate-300" />
                  <input type="text" value={resumeExpDuration} onChange={(e) => setResumeExpDuration(e.target.value)} placeholder="Years" className="px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <textarea rows={2} value={resumeExpHighlights} onChange={(e) => setResumeExpHighlights(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                <div className="grid grid-cols-3 gap-2">
                  <input type="text" value={resumeEduDegree} onChange={(e) => setResumeEduDegree(e.target.value)} placeholder="Degree" className="px-3 py-2 rounded-xl border border-slate-300" />
                  <input type="text" value={resumeEduInst} onChange={(e) => setResumeEduInst(e.target.value)} placeholder="Institution" className="px-3 py-2 rounded-xl border border-slate-300" />
                  <input type="text" value={resumeEduYear} onChange={(e) => setResumeEduYear(e.target.value)} placeholder="Year" className="px-3 py-2 rounded-xl border border-slate-300" />
                </div>
                <input type="text" value={resumeSkillsRaw} onChange={(e) => setResumeSkillsRaw(e.target.value)} placeholder="Skills comma-separated" className="w-full px-3 py-2 rounded-xl border border-slate-300" />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadResumeAsPdf({
                        fullName: resumeName || 'Candidate Name',
                        headline: resumeHeadline,
                        email: resumeEmail,
                        phone: resumePhone,
                        location: resumeLocation,
                        summary: resumeSummary,
                        experience: resumeExpRole ? [{ role: resumeExpRole, org: resumeExpOrg, duration: resumeExpDuration, highlights: resumeExpHighlights.split('\n').filter(Boolean) }] : [],
                        education: resumeEduDegree ? [{ degree: resumeEduDegree, institution: resumeEduInst, year: resumeEduYear }] : [],
                        skills: resumeSkillsRaw.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Resume PDF
                  </button>
                  <button type="submit" disabled={isGenerating} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5" /> Polish with Gemini AI
                  </button>
                </div>
              </form>
            ) : (
              /* SHARED FORM FOR TEACHER 40 / STUDENT 30 / CORE TEXT TOOLS */
              <div className="space-y-5">
                {studioTab === 'core_10' && selectedCoreTool === 'pdf_maker' && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-2.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-slate-900">Instant Offline PDF &amp; DOCX Compiler</span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            downloadTextAsPdf({
                              title: manualPdfTitle || 'Study Document',
                              subtitle: manualPdfSubtitle,
                              sections: [{ heading: subject, body: manualPdfBody }],
                              filename: manualPdfTitle || 'mystudyzone_doc',
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold cursor-pointer"
                        >
                          Download PDF
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            void downloadDocumentAsDocx({
                              title: manualPdfTitle || 'Study Document',
                              subtitle: manualPdfSubtitle,
                              sections: [{ heading: subject, body: manualPdfBody }],
                              filename: manualPdfTitle || 'mystudyzone_doc',
                            })
                          }
                          className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold cursor-pointer"
                        >
                          Download DOCX
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input type="text" value={manualPdfTitle} onChange={(e) => setManualPdfTitle(e.target.value)} className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white" />
                      <input type="text" value={manualPdfSubtitle} onChange={(e) => setManualPdfSubtitle(e.target.value)} className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white" />
                    </div>
                    <textarea rows={3} value={manualPdfBody} onChange={(e) => setManualPdfBody(e.target.value)} className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white" />
                  </div>
                )}

                <form
                  onSubmit={studioTab === 'core_10' ? handleGenerateCoreTool : handleGenerateRoleTool}
                  className="space-y-4 text-sm"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Board</label>
                      <select
                        value={board}
                        onChange={(e) => setBoard(e.target.value as EducationBoard)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                      >
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="CBSE">CBSE</option>
                        <option value="ICSE">ICSE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                      <select
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value as ClassLevel)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                      >
                        {ALL_10_CLASSES.map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                      >
                        {availableSubjects.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Medium</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs font-semibold"
                      >
                        <option value="English">English</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Semi-English">Semi-English</option>
                      </select>
                    </div>
                  </div>

                  {/* Direct Syllabus Chapter Picker */}
                  {syllabusChapterOptions.length > 0 && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quick-Fill from Real Syllabus Chapter ({board} · {classLevel} · {subject})
                      </label>
                      <select
                        value={selectedSyllabusChapter}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedSyllabusChapter(val);
                          if (val) setTopic(val);
                        }}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold"
                      >
                        <option value="">-- Choose a Syllabus Chapter (or type custom topic below) --</option>
                        {syllabusChapterOptions.map((ch, idx) => (
                          <option key={idx} value={`Chapter ${idx + 1}: ${ch}`}>
                            Chapter {idx + 1}: {ch}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {studioTab === 'core_10' && selectedCoreTool === 'question_paper_generator' && (
                    <div className="grid grid-cols-3 gap-2">
                      <select value={marks} onChange={(e) => setMarks(Number(e.target.value))} className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs">
                        <option value={20}>20 Marks</option>
                        <option value={40}>40 Marks</option>
                        <option value={80}>80 Marks</option>
                      </select>
                      <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 text-xs" />
                      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs">
                        <option>Easy / Foundation</option>
                        <option>Balanced (Easy + Medium + HOTS)</option>
                        <option>Board Exam Challenge</option>
                      </select>
                    </div>
                  )}

                  {studioTab === 'core_10' && selectedCoreTool === 'letter_generator' && (
                    <select value={letterType} onChange={(e) => setLetterType(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs">
                      <option>Student Leave Application</option>
                      <option>Bonafide Certificate Request</option>
                      <option>PTM Circular to Parents</option>
                    </select>
                  )}

                  {studioTab === 'core_10' && selectedCoreTool === 'content_generator' && (
                    <select value={contentFormat} onChange={(e) => setContentFormat(e.target.value)} className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs">
                      <option>Morning Assembly Speech</option>
                      <option>Classroom Lesson Hook &amp; Activity</option>
                      <option>School Newsletter Article</option>
                    </select>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Topic / Chapter / Specific Question *
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder={
                        studioTab === 'core_10'
                          ? 'e.g. Fractions & Decimals, Photosynthesis...'
                          : activeRoleTool.promptHint
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Extra Preferences (Optional)
                      </label>
                      <input
                        type="text"
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                        placeholder="e.g. Include Hindi meanings, 20 marks, simple language..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Items / Slides / Cards Count
                      </label>
                      <input
                        type="number"
                        min={3}
                        max={20}
                        value={count}
                        onChange={(e) => setCount(Math.min(20, Math.max(3, Number(e.target.value) || 6)))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs tabular-nums"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer"
                  >
                    {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>
                      {isGenerating
                        ? 'Generating with Gemini AI...'
                        : `Generate ${studioTab === 'core_10' ? currentCoreMeta.title : activeRoleTool.title}`}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* OUTPUT 1: DOCUMENT (EDITABLE + PRINT PREVIEW + PDF + DOCX + TXT) */}
          {docOutput && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex-1 min-w-[200px]">
                  {editMode ? (
                    <input
                      type="text"
                      value={docOutput.title}
                      onChange={(e) => setDocOutput((p) => (p ? { ...p, title: e.target.value } : p))}
                      className="w-full px-2.5 py-1 rounded border border-indigo-300 font-bold text-base"
                    />
                  ) : (
                    <h3 className="text-lg font-bold text-slate-900">{docOutput.title}</h3>
                  )}
                  {docOutput.subtitle && <p className="text-xs text-slate-500 mt-0.5">{docOutput.subtitle}</p>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditMode((v) => !v)}
                    className={`inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      editMode ? 'bg-indigo-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> {editMode ? 'Done Editing' : 'Edit Text'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPrintPreviewPayload({
                        title: docOutput.title,
                        subtitle: docOutput.subtitle,
                        metaLines: [`${board} · ${classLevel} · ${subject} · ${language}`],
                        sections: docOutput.sections,
                        filename: docOutput.title,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Preview
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadTextAsPdf({
                        title: docOutput.title,
                        subtitle: docOutput.subtitle,
                        metaLines: [`${board} · ${classLevel} · ${subject} · ${language}`],
                        sections: docOutput.sections,
                        filename: docOutput.title,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void downloadDocumentAsDocx({
                        title: docOutput.title,
                        subtitle: docOutput.subtitle,
                        metaLines: [`${board} · ${classLevel} · ${subject} · ${language}`],
                        sections: docOutput.sections,
                        filename: docOutput.title,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-blue-700 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> DOCX
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadPlainTextFile(formatDocPlainText(docOutput), docOutput.title, 'txt')}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold cursor-pointer"
                  >
                    TXT
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {docOutput.sections.map((sec, idx) => (
                  <div key={idx} className="space-y-1.5">
                    {editMode ? (
                      <>
                        <input
                          type="text"
                          value={sec.heading || ''}
                          onChange={(e) =>
                            setDocOutput((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    sections: prev.sections.map((s, si) =>
                                      si === idx ? { ...s, heading: e.target.value } : s
                                    ),
                                  }
                                : prev
                            )
                          }
                          className="w-full px-2.5 py-1 rounded border border-slate-300 text-xs font-bold"
                        />
                        <textarea
                          rows={4}
                          value={sec.body}
                          onChange={(e) =>
                            setDocOutput((prev) =>
                              prev
                                ? {
                                    ...prev,
                                    sections: prev.sections.map((s, si) =>
                                      si === idx ? { ...s, body: e.target.value } : s
                                    ),
                                  }
                                : prev
                            )
                          }
                          className="w-full px-2.5 py-1.5 rounded border border-slate-300 text-xs"
                        />
                      </>
                    ) : (
                      <>
                        {sec.heading && <h4 className="text-sm font-bold text-indigo-900">{sec.heading}</h4>}
                        <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{sec.body}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OUTPUT 2: STRUCTURED TABLE (TIMETABLE, ATTENDANCE, MARKSHEET, REPORT CARD) */}
          {tableOutput && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <TableIcon className="w-4 h-4 text-emerald-700" />
                    <span>{tableOutput.title}</span>
                  </h3>
                  {tableOutput.subtitle && <p className="text-xs text-slate-500">{tableOutput.subtitle}</p>}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEditMode((v) => !v)}
                    className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold cursor-pointer"
                  >
                    {editMode ? 'Done Editing' : 'Edit Cells'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPrintPreviewPayload({
                        title: tableOutput.title,
                        subtitle: tableOutput.subtitle,
                        table: { columns: tableOutput.columns, rows: tableOutput.rows },
                        sections: tableOutput.notes ? [{ heading: 'Notes', body: tableOutput.notes }] : [],
                        filename: tableOutput.title,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-black cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Preview
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void downloadTableAsXlsx({
                        sheetName: tableOutput.title.slice(0, 28),
                        columns: tableOutput.columns,
                        rows: tableOutput.rows,
                        filename: tableOutput.title,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Excel (.xlsx)
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void downloadDocumentAsDocx({
                        title: tableOutput.title,
                        subtitle: tableOutput.subtitle,
                        table: { columns: tableOutput.columns, rows: tableOutput.rows },
                        filename: tableOutput.title,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-blue-700 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> DOCX
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      {tableOutput.columns.map((c, ci) => (
                        <th key={ci} className="px-3 py-2 text-left font-bold border border-slate-700">
                          {c}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableOutput.rows.map((r, ri) => (
                      <tr key={ri} className={ri % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                        {tableOutput.columns.map((_, ci) => (
                          <td key={ci} className="px-2.5 py-1.5 border border-slate-200">
                            {editMode ? (
                              <input
                                type="text"
                                value={r[ci] ?? ''}
                                onChange={(e) =>
                                  setTableOutput((prev) =>
                                    prev
                                      ? {
                                          ...prev,
                                          rows: prev.rows.map((rowItem, rIdx) =>
                                            rIdx === ri
                                              ? rowItem.map((cell, cIdx) => (cIdx === ci ? e.target.value : cell))
                                              : rowItem
                                          ),
                                        }
                                      : prev
                                  )
                                }
                                className="w-full px-1.5 py-0.5 border border-indigo-200 rounded"
                              />
                            ) : (
                              r[ci] ?? ''
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {tableOutput.notes && <p className="text-xs text-slate-600">{tableOutput.notes}</p>}
            </div>
          )}

          {/* OUTPUT 3: FLASHCARDS */}
          {flashcardsOutput && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{flashcardsOutput.title}</h3>
                  <p className="text-xs text-slate-500">{flashcardsOutput.cards.length} Interactive Study Cards (Click card to flip)</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() =>
                      downloadTextAsPdf({
                        title: flashcardsOutput.title,
                        subtitle: flashcardsOutput.subtitle,
                        sections: flashcardsOutput.cards.map((c, i) => ({
                          heading: `Card ${i + 1}: ${c.front}`,
                          body: `${c.back}${c.hint ? `\nHint: ${c.hint}` : ''}`,
                        })),
                        filename: `${flashcardsOutput.title}_cards`,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void downloadTableAsXlsx({
                        sheetName: 'Flashcards',
                        columns: ['Front', 'Back', 'Memory Hint'],
                        rows: flashcardsOutput.cards.map((c) => [c.front, c.back, c.hint || '']),
                        filename: `${flashcardsOutput.title}_cards`,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> XLSX
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {flashcardsOutput.cards.map((c, idx) => {
                  const flipped = Boolean(flippedCardMap[idx]);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFlippedCardMap((p) => ({ ...p, [idx]: !p[idx] }))}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer min-h-[110px] flex flex-col justify-between ${
                        flipped
                          ? 'bg-indigo-600 border-indigo-600 text-white'
                          : 'bg-slate-50 border-slate-200 hover:border-indigo-300 text-slate-900'
                      }`}
                    >
                      <span className={`text-[10px] font-bold uppercase ${flipped ? 'text-indigo-200' : 'text-indigo-600'}`}>
                        {flipped ? `Answer · Card ${idx + 1}` : `Prompt · Card ${idx + 1} (Tap to Flip)`}
                      </span>
                      <div className="text-sm font-bold my-2">{flipped ? c.back : c.front}</div>
                      {c.hint && (
                        <div className={`text-[11px] ${flipped ? 'text-indigo-100' : 'text-slate-500'}`}>
                          Hint: {c.hint}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* OUTPUT 4: PLAYABLE QUIZ */}
          {quizOutput && quizOutput.questions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{quizOutput.title}</h3>
                  <p className="text-xs text-slate-500 tabular-nums">{quizOutput.questions.length} Interactive Questions</p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => downloadJsonFile(quizOutput, `${quizOutput.title}_quiz`)}
                    className="px-3 py-2 rounded-xl bg-slate-100 text-xs font-bold cursor-pointer"
                  >
                    JSON
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void downloadTableAsXlsx({
                        sheetName: 'QuizBank',
                        columns: ['Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Correct Answer', 'Explanation'],
                        rows: quizOutput.questions.map((q) => [
                          q.question,
                          q.options[0] || '',
                          q.options[1] || '',
                          q.options[2] || '',
                          q.options[3] || '',
                          q.options[q.correctIndex] || '',
                          q.explanation || '',
                        ]),
                        filename: `${quizOutput.title}_quiz`,
                      })
                    }
                    className="px-3 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold cursor-pointer"
                  >
                    XLSX
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadTextAsPdf({
                        title: quizOutput.title,
                        subtitle: `${board} · ${classLevel} · ${subject}`,
                        sections: quizOutput.questions.map((q, idx) => ({
                          heading: `Q${idx + 1}. ${q.question}`,
                          body:
                            q.options.map((o, oi) => `(${String.fromCharCode(65 + oi)}) ${o}`).join('\n') +
                            `\nAnswer: ${q.options[q.correctIndex] || ''}` +
                            (q.explanation ? `\nExplanation: ${q.explanation}` : ''),
                        })),
                        filename: `${quizOutput.title}_quiz`,
                      })
                    }
                    className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> PDF + Key
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {quizOutput.questions.map((q, qIdx) => {
                  const chosen = quizAnswers[qIdx];
                  return (
                    <div key={qIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <div className="text-sm font-semibold text-slate-900">
                        {qIdx + 1}. {q.question}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isChosen = chosen === oIdx;
                          const isCorrect = q.correctIndex === oIdx;
                          let cls = 'bg-white border-slate-200 text-slate-800';
                          if (quizSubmitted) {
                            if (isCorrect) cls = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                            else if (isChosen) cls = 'bg-rose-50 border-rose-400 text-rose-900';
                          } else if (isChosen) {
                            cls = 'bg-indigo-600 border-indigo-600 text-white font-semibold';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => !quizSubmitted && setQuizAnswers((p) => ({ ...p, [qIdx]: oIdx }))}
                              className={`p-2.5 rounded-lg border text-left text-xs cursor-pointer ${cls}`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && q.explanation && (
                        <p className="text-xs text-slate-600">Explanation: {q.explanation}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {!quizSubmitted ? (
                <button
                  type="button"
                  onClick={() => setQuizSubmitted(true)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold cursor-pointer"
                >
                  Submit &amp; Grade Quiz
                </button>
              ) : (
                <div className="text-sm font-bold text-emerald-700">
                  Score: {quizOutput.questions.filter((q, idx) => quizAnswers[idx] === q.correctIndex).length} / {quizOutput.questions.length}
                </div>
              )}
            </div>
          )}

          {/* OUTPUT 5: SLIDE DECK (PPTX + PDF) */}
          {deckOutput && deckOutput.slides.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{deckOutput.title}</h3>
                  <p className="text-xs text-slate-500">
                    {deckOutput.subtitle} · {deckOutput.slides.length} Slides
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      void downloadPresentationAsPptx({
                        title: deckOutput.title,
                        subtitle: deckOutput.subtitle,
                        slides: deckOutput.slides,
                        filename: `${deckOutput.title}_deck`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PPTX
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      downloadPresentationAsPdf({
                        title: deckOutput.title,
                        subtitle: deckOutput.subtitle,
                        slides: deckOutput.slides,
                        filename: `${deckOutput.title}_slides`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" /> Landscape PDF
                  </button>
                </div>
              </div>

              <div className="rounded-xl bg-slate-900 text-white p-6 space-y-4 min-h-[220px]">
                <div className="text-xs text-indigo-300 tabular-nums">
                  Slide {activeSlideIdx + 1} of {deckOutput.slides.length}
                </div>
                <h4 className="text-xl font-bold">{deckOutput.slides[activeSlideIdx]?.title}</h4>
                <ul className="space-y-2 text-sm text-slate-200 list-disc pl-5">
                  {(deckOutput.slides[activeSlideIdx]?.bullets || []).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
                {deckOutput.slides[activeSlideIdx]?.speakerNotes && (
                  <div className="pt-3 border-t border-slate-800 text-xs text-slate-300">
                    Speaker Notes: {deckOutput.slides[activeSlideIdx]?.speakerNotes}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  disabled={activeSlideIdx <= 0}
                  onClick={() => setActiveSlideIdx((i) => Math.max(0, i - 1))}
                  className="px-4 py-2 rounded-lg bg-slate-100 disabled:opacity-40 text-xs font-bold cursor-pointer"
                >
                  Previous Slide
                </button>
                <button
                  type="button"
                  disabled={activeSlideIdx >= deckOutput.slides.length - 1}
                  onClick={() => setActiveSlideIdx((i) => Math.min(deckOutput.slides.length - 1, i + 1))}
                  className="px-4 py-2 rounded-lg bg-slate-100 disabled:opacity-40 text-xs font-bold cursor-pointer"
                >
                  Next Slide
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Print Preview Modal */}
      {printPreviewPayload && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs overflow-y-auto p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-6xl mx-auto">
            <PrintPreviewStudio
              initialPayload={printPreviewPayload}
              onClose={() => setPrintPreviewPayload(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
