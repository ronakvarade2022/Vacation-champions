import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Briefcase,
  CheckCircle2,
  ClipboardCheck,
  Download,
  FileSpreadsheet,
  FileText,
  Image as ImageIcon,
  Layers,
  Loader2,
  Mail,
  PenTool,
  Presentation,
  RefreshCw,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';
import {
  downloadBase64ImagePng,
  downloadJsonFile,
  downloadPlainTextFile,
  downloadPresentationAsPdf,
  downloadResumeAsPdf,
  downloadTextAsPdf,
  type PdfSectionBlock,
  type PresentationSlideExportItem,
} from '../../utils/realFileExports';

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

const AI_TOOLS: AiToolMeta[] = [
  {
    id: 'pdf_maker',
    title: 'AI PDF Maker',
    shortDesc: 'Compile custom study PDFs manually or draft full documents with Gemini.',
    category: 'Documents & Exports',
    icon: FileText,
    offlineReady: true,
  },
  {
    id: 'image_generator',
    title: 'AI Image Generator',
    shortDesc: 'Create school-safe diagrams, charts & illustrations and export PNG.',
    category: 'Visual & Career',
    icon: ImageIcon,
  },
  {
    id: 'worksheet_generator',
    title: 'AI Worksheet Generator',
    shortDesc: 'Generate board-aligned practice worksheets with full answer keys.',
    category: 'Classroom & Exams',
    icon: FileSpreadsheet,
  },
  {
    id: 'question_paper_generator',
    title: 'AI Question Paper Generator',
    shortDesc: 'Build formal exam papers (20–100 marks) with marking schemes.',
    category: 'Classroom & Exams',
    icon: ClipboardCheck,
  },
  {
    id: 'notes_generator',
    title: 'AI Notes Generator',
    shortDesc: 'Produce chapter summaries, definitions, formulas & worked examples.',
    category: 'Classroom & Exams',
    icon: BookOpen,
  },
  {
    id: 'presentation_maker',
    title: 'AI Presentation Maker',
    shortDesc: 'Draft classroom slide decks with speaker notes and landscape PDF export.',
    category: 'Documents & Exports',
    icon: Presentation,
  },
  {
    id: 'quiz_generator',
    title: 'AI Quiz Generator',
    shortDesc: 'Generate interactive MCQs you can play right here or export as PDF/JSON.',
    category: 'Classroom & Exams',
    icon: Sparkles,
  },
  {
    id: 'resume_maker',
    title: 'AI Resume Maker',
    shortDesc: 'Build & export teacher/student resumes to PDF with optional AI polish.',
    category: 'Visual & Career',
    icon: Briefcase,
    offlineReady: true,
  },
  {
    id: 'letter_generator',
    title: 'AI Letter Generator',
    shortDesc: 'Draft leave applications, bonafide requests, PTM circulars & notices.',
    category: 'Documents & Exports',
    icon: Mail,
  },
  {
    id: 'content_generator',
    title: 'AI Content Generator',
    shortDesc: 'Create assembly speeches, lesson hooks, study guides & newsletters.',
    category: 'Visual & Career',
    icon: PenTool,
  },
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

export interface AIToolsHubViewProps {
  onBackHome: () => void;
}

export const AIToolsHubView: React.FC<AIToolsHubViewProps> = ({ onBackHome }) => {
  const [selectedTool, setSelectedTool] = useState<AiHubToolId>('pdf_maker');
  const [aiStatus, setAiStatus] = useState<AiStatusState>({
    loading: true,
    configured: false,
    textModel: 'gemini-4-hydrogen',
    imageModel: 'gemini-3.1-flash-lite-image',
    message: 'Checking server AI configuration...',
  });

  // Shared curriculum & document inputs
  const [board, setBoard] = useState<string>('Maharashtra');
  const [classLevel, setClassLevel] = useState<string>('Class 5');
  const [subject, setSubject] = useState<string>('Mathematics');
  const [language, setLanguage] = useState<string>('English');
  const [topic, setTopic] = useState<string>('');
  const [instructions, setInstructions] = useState<string>('');
  const [count, setCount] = useState<number>(6);
  const [marks, setMarks] = useState<number>(40);
  const [duration, setDuration] = useState<string>('90 Minutes');
  const [difficulty, setDifficulty] = useState<string>('Balanced (Easy + Medium + HOTS)');
  const [letterType, setLetterType] = useState<string>('Student Leave Application');
  const [contentFormat, setContentFormat] = useState<string>('Morning Assembly Speech');

  // Offline / Manual PDF Maker inputs
  const [manualPdfTitle, setManualPdfTitle] = useState<string>('Chapter Practice Notes');
  const [manualPdfSubtitle, setManualPdfSubtitle] = useState<string>('Maharashtra State Board · Class 5');
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
  const [resumeName, setResumeName] = useState<string>('');
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

  // Generation state & outputs
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [errorBanner, setErrorBanner] = useState<{ code?: string; message: string } | null>(null);
  const [docOutput, setDocOutput] = useState<StructuredDocOutput | null>(null);
  const [quizOutput, setQuizOutput] = useState<QuizOutput | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [deckOutput, setDeckOutput] = useState<PresentationOutput | null>(null);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number>(0);

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

  const currentToolMeta = AI_TOOLS.find((t) => t.id === selectedTool) || AI_TOOLS[0];

  const handleSelectTool = (toolId: AiHubToolId) => {
    setSelectedTool(toolId);
    setErrorBanner(null);
  };

  const buildEffectiveTopicAndInstructions = (): { effectiveTopic: string; effectiveInstructions: string } => {
    if (selectedTool === 'question_paper_generator') {
      return {
        effectiveTopic: topic.trim(),
        effectiveInstructions: `Total Marks: ${marks}. Duration: ${duration}. Difficulty: ${difficulty}. ${instructions}`.trim(),
      };
    }
    if (selectedTool === 'worksheet_generator' || selectedTool === 'quiz_generator') {
      return {
        effectiveTopic: topic.trim(),
        effectiveInstructions: `Difficulty: ${difficulty}. ${instructions}`.trim(),
      };
    }
    if (selectedTool === 'letter_generator') {
      return {
        effectiveTopic: `${letterType}: ${topic.trim()}`.trim(),
        effectiveInstructions: instructions.trim(),
      };
    }
    if (selectedTool === 'content_generator') {
      return {
        effectiveTopic: `${contentFormat} on "${topic.trim()}"`.trim(),
        effectiveInstructions: instructions.trim(),
      };
    }
    if (selectedTool === 'resume_maker') {
      const raw = [
        `Name: ${resumeName || 'Educator / Student'}`,
        `Headline: ${resumeHeadline}`,
        `Summary: ${resumeSummary}`,
        `Experience: ${resumeExpRole} at ${resumeExpOrg} (${resumeExpDuration}) - ${resumeExpHighlights}`,
        `Education: ${resumeEduDegree}, ${resumeEduInst} (${resumeEduYear})`,
        `Skills: ${resumeSkillsRaw}`,
      ].join('\n');
      return {
        effectiveTopic: raw,
        effectiveInstructions: instructions.trim(),
      };
    }
    return {
      effectiveTopic: topic.trim(),
      effectiveInstructions: instructions.trim(),
    };
  };

  const handleGenerateTextTool = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorBanner(null);

    const { effectiveTopic, effectiveInstructions } = buildEffectiveTopicAndInstructions();
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
          toolId: selectedTool,
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
      if (selectedTool === 'quiz_generator') {
        const questions = Array.isArray(structured.questions) ? structured.questions : [];
        setQuizOutput({
          title: structured.title || `${subject} Quiz · ${topic}`,
          questions,
        });
        setQuizAnswers({});
        setQuizSubmitted(false);
      } else if (selectedTool === 'presentation_maker') {
        const slides = Array.isArray(structured.slides) ? structured.slides : [];
        setDeckOutput({
          title: structured.title || topic,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          slides,
        });
        setActiveSlideIdx(0);
      } else if (selectedTool === 'resume_maker') {
        if (structured.headline) setResumeHeadline(String(structured.headline));
        if (structured.summary) setResumeSummary(String(structured.summary));
        if (Array.isArray(structured.skills) && structured.skills.length > 0) {
          setResumeSkillsRaw(structured.skills.join(', '));
        }
        if (Array.isArray(structured.highlights) && structured.highlights.length > 0) {
          setResumeExpHighlights(structured.highlights.join('\n'));
        }
      } else {
        const sections = Array.isArray(structured.sections) ? structured.sections : [];
        setDocOutput({
          title: structured.title || topic,
          subtitle: structured.subtitle || `${board} · ${classLevel} · ${subject}`,
          sections,
        });
      }
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

  const handleCompileManualPdf = () => {
    if (!manualPdfTitle.trim() && !manualPdfBody.trim()) {
      setErrorBanner({
        code: 'EMPTY_DOCUMENT',
        message: 'Enter a document title and body content to compile your PDF.',
      });
      return;
    }
    setErrorBanner(null);
    downloadTextAsPdf({
      title: manualPdfTitle.trim() || 'Study Document',
      subtitle: manualPdfSubtitle.trim() || `${board} · ${classLevel} · ${subject}`,
      metaLines: [`Board: ${board}  |  Class: ${classLevel}  |  Language: ${language}`],
      sections: [
        {
          heading: subject ? `${subject} Document` : 'Document Content',
          body: manualPdfBody.trim(),
        },
      ],
      filename: manualPdfTitle.trim() || 'mystudyzone_document',
    });
  };

  const handleDownloadResume = () => {
    const skills = resumeSkillsRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const highlights = resumeExpHighlights
      .split('\n')
      .map((h) => h.trim())
      .filter(Boolean);

    downloadResumeAsPdf({
      fullName: resumeName.trim() || 'Candidate Name',
      headline: resumeHeadline.trim(),
      email: resumeEmail.trim(),
      phone: resumePhone.trim(),
      location: resumeLocation.trim(),
      summary: resumeSummary.trim(),
      experience: resumeExpRole.trim()
        ? [
            {
              role: resumeExpRole.trim(),
              org: resumeExpOrg.trim() || 'Institution',
              duration: resumeExpDuration.trim(),
              highlights,
            },
          ]
        : [],
      education: resumeEduDegree.trim()
        ? [
            {
              degree: resumeEduDegree.trim(),
              institution: resumeEduInst.trim(),
              year: resumeEduYear.trim(),
            },
          ]
        : [],
      skills,
      filename: `${resumeName.trim() || 'resume'}_cv`,
    });
  };

  const formatDocPlainText = (doc: StructuredDocOutput): string => {
    const parts = [doc.title, doc.subtitle || '', '========================================'];
    for (const s of doc.sections) {
      if (s.heading) parts.push(`\n${s.heading}\n----------------------------------------`);
      parts.push(s.body);
    }
    return parts.filter(Boolean).join('\n');
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer whitespace-nowrap transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            type="button"
            onClick={() => void loadAiStatus()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 cursor-pointer whitespace-nowrap"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${aiStatus.loading ? 'animate-spin' : ''}`} />
            <span>Refresh AI Status</span>
          </button>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-indigo-300">
            MyStudyZone AI Tools Studio · 10 Real Productivity &amp; Academic Generators · Zero Fake Outputs
          </p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
            10 Real AI Study &amp; Educator Tools
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl">
            Generate curriculum-aligned PDFs, worksheets, question papers, chapter notes, slide decks, interactive quizzes, formal letters, and educational illustrations with direct PDF/PNG/JSON downloads.
          </p>
        </div>

        {/* Live Server Configuration Banner */}
        <div
          className={`rounded-xl p-3.5 border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 ${
            aiStatus.loading
              ? 'bg-slate-800/80 border-slate-700 text-slate-200'
              : aiStatus.configured
              ? 'bg-emerald-950/60 border-emerald-700/70 text-emerald-100'
              : 'bg-amber-950/60 border-amber-700/70 text-amber-100'
          }`}
        >
          <div className="flex items-start gap-2.5">
            {aiStatus.configured ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-semibold">
                {aiStatus.loading
                  ? 'Checking Gemini Server Status...'
                  : aiStatus.configured
                  ? `Server Gemini AI Ready · Text: ${aiStatus.textModel} · Image: ${aiStatus.imageModel}`
                  : 'Gemini API Key Required on Server'}
              </div>
              <p className="text-slate-300 mt-0.5">
                {aiStatus.configured
                  ? aiStatus.message
                  : `${aiStatus.message} Offline manual PDF Maker & Resume PDF Export continue working immediately.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Zone Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Tool Selector Sidebar */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-2">
          <div className="px-2 pb-2 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900">Select AI Tool (1–10)</h2>
            <span className="text-xs text-slate-500 tabular-nums">10 Tools</span>
          </div>

          <div className="space-y-1.5">
            {AI_TOOLS.map((tool, index) => {
              const Icon = tool.icon;
              const isSelected = selectedTool === tool.id;
              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => handleSelectTool(tool.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-indigo-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold truncate">
                        {index + 1}. {tool.title}
                      </span>
                      {tool.offlineReady && (
                        <span
                          className={`text-[11px] font-medium whitespace-nowrap ${
                            isSelected ? 'text-indigo-100' : 'text-emerald-700'
                          }`}
                        >
                          Offline PDF
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-xs mt-0.5 line-clamp-2 ${
                        isSelected ? 'text-indigo-100' : 'text-slate-500'
                      }`}
                    >
                      {tool.shortDesc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Interactive Workbench */}
        <section className="lg:col-span-8 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs text-slate-500">
                  {currentToolMeta.category} · Real File Output
                </p>
                <h2 className="text-xl font-display font-bold text-slate-900 mt-0.5">
                  {currentToolMeta.title}
                </h2>
                <p className="text-sm text-slate-600 mt-1">{currentToolMeta.shortDesc}</p>
              </div>
            </div>

            {errorBanner && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 text-xs text-rose-900 flex items-start gap-2.5">
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-bold">
                    {errorBanner.code ? `Notice (${errorBanner.code})` : 'Request Notice'}
                  </div>
                  <p>{errorBanner.message}</p>
                </div>
              </div>
            )}

            {/* TOOL 2: IMAGE GENERATOR */}
            {selectedTool === 'image_generator' ? (
              <form onSubmit={handleGenerateImage} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Image Description / Educational Concept *
                  </label>
                  <textarea
                    rows={3}
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="e.g. Labeled cross-section diagram of human heart showing chambers and blood flow arrows for Class 7 Science"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Visual Style
                    </label>
                    <select
                      value={imageStyle}
                      onChange={(e) => setImageStyle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    >
                      <option>Clean Educational Textbook Diagram</option>
                      <option>Classroom Infographic Chart</option>
                      <option>Watercolor Children Story Illustration</option>
                      <option>Minimalist Isometric Science Visual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Aspect Ratio
                    </label>
                    <select
                      value={aspectRatio}
                      onChange={(e) => setAspectRatio(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
                    >
                      <option value="16:9">16:9 (Widescreen / Slides)</option>
                      <option value="4:3">4:3 (Worksheet / Textbook)</option>
                      <option value="1:1">1:1 (Square Card)</option>
                      <option value="3:4">3:4 (Poster / Book Cover)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer whitespace-nowrap"
                >
                  {isGenerating ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <ImageIcon className="w-4 h-4" />
                  )}
                  <span>{isGenerating ? 'Generating Image...' : 'Generate Image with Gemini'}</span>
                </button>

                {imageResult && (
                  <div className="pt-4 border-t border-slate-200 space-y-3">
                    <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
                      <img
                        src={imageResult.dataUrl}
                        alt={imageResult.caption || 'Generated educational visual'}
                        className="w-full max-h-[440px] object-contain mx-auto"
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-slate-600">
                        Generated via {aiStatus.imageModel} · Aspect {imageResult.aspectRatio}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          downloadBase64ImagePng(imageResult.dataUrl, 'mystudyzone_visual')
                        }
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PNG</span>
                      </button>
                    </div>
                  </div>
                )}
              </form>
            ) : selectedTool === 'resume_maker' ? (
              /* TOOL 8: RESUME MAKER (Instant Offline PDF + Optional Gemini Polish) */
              <form onSubmit={handleGenerateTextTool} className="space-y-4 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={resumeName}
                      onChange={(e) => setResumeName(e.target.value)}
                      placeholder="e.g. Sneha Kulkarni"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Professional Headline
                    </label>
                    <input
                      type="text"
                      value={resumeHeadline}
                      onChange={(e) => setResumeHeadline(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={resumeEmail}
                      onChange={(e) => setResumeEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={resumePhone}
                      onChange={(e) => setResumePhone(e.target.value)}
                      placeholder="10-digit mobile"
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      value={resumeLocation}
                      onChange={(e) => setResumeLocation(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Career Summary
                    </label>
                    <textarea
                      rows={3}
                      value={resumeSummary}
                      onChange={(e) => setResumeSummary(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Latest Role
                    </label>
                    <input
                      type="text"
                      value={resumeExpRole}
                      onChange={(e) => setResumeExpRole(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      School / Organization &amp; Years
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={resumeExpOrg}
                        onChange={(e) => setResumeExpOrg(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                      <input
                        type="text"
                        value={resumeExpDuration}
                        onChange={(e) => setResumeExpDuration(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Achievements &amp; Responsibilities (one per line)
                    </label>
                    <textarea
                      rows={3}
                      value={resumeExpHighlights}
                      onChange={(e) => setResumeExpHighlights(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Qualification / Degree
                    </label>
                    <input
                      type="text"
                      value={resumeEduDegree}
                      onChange={(e) => setResumeEduDegree(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        University / Board
                      </label>
                      <input
                        type="text"
                        value={resumeEduInst}
                        onChange={(e) => setResumeEduInst(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={resumeEduYear}
                        onChange={(e) => setResumeEduYear(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={resumeSkillsRaw}
                      onChange={(e) => setResumeSkillsRaw(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleDownloadResume}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Resume PDF</span>
                  </button>
                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer whitespace-nowrap"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>{isGenerating ? 'Polishing...' : 'Polish Phrasing with Gemini AI'}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* SHARED FORM FOR PDF MAKER + ACADEMIC GENERATORS */
              <div className="space-y-6">
                {selectedTool === 'pdf_maker' && (
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">
                          Direct PDF Compiler (Instant Offline Export)
                        </h3>
                        <p className="text-xs text-slate-600">
                          Write or paste your own text and export a formatted A4 PDF immediately without needing an API key.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleCompileManualPdf}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold cursor-pointer whitespace-nowrap"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download Real PDF Now</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <input
                        type="text"
                        value={manualPdfTitle}
                        onChange={(e) => setManualPdfTitle(e.target.value)}
                        placeholder="PDF Document Title"
                        className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      />
                      <input
                        type="text"
                        value={manualPdfSubtitle}
                        onChange={(e) => setManualPdfSubtitle(e.target.value)}
                        placeholder="Subtitle / Class / Board"
                        className="px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      />
                    </div>
                    <textarea
                      rows={4}
                      value={manualPdfBody}
                      onChange={(e) => setManualPdfBody(e.target.value)}
                      placeholder="Paste notes, solutions, formulas, or circulars here..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-sm"
                    />
                  </div>
                )}

                <form onSubmit={handleGenerateTextTool} className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Board</label>
                      <select
                        value={board}
                        onChange={(e) => setBoard(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      >
                        <option>Maharashtra</option>
                        <option>CBSE</option>
                        <option>ICSE</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Class</label>
                      <select
                        value={classLevel}
                        onChange={(e) => setClassLevel(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      >
                        {Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`).map((cls) => (
                          <option key={cls} value={cls}>
                            {cls}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Subject</label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Language</label>
                      <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      >
                        <option>English</option>
                        <option>Marathi</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                  </div>

                  {selectedTool === 'question_paper_generator' && (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Total Marks</label>
                        <select
                          value={marks}
                          onChange={(e) => setMarks(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                        >
                          <option value={20}>20 Marks</option>
                          <option value={40}>40 Marks</option>
                          <option value={80}>80 Marks</option>
                          <option value={100}>100 Marks</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Duration</label>
                        <input
                          type="text"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                        <select
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                        >
                          <option>Easy / Foundation</option>
                          <option>Balanced (Easy + Medium + HOTS)</option>
                          <option>Board Exam Challenge</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {(selectedTool === 'quiz_generator' ||
                    selectedTool === 'presentation_maker' ||
                    selectedTool === 'worksheet_generator') && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          {selectedTool === 'presentation_maker' ? 'Slide Count' : 'Question Count'}
                        </label>
                        <input
                          type="number"
                          min={3}
                          max={20}
                          value={count}
                          onChange={(e) => setCount(Math.min(20, Math.max(3, Number(e.target.value) || 5)))}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 tabular-nums"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
                        <select
                          value={difficulty}
                          onChange={(e) => setDifficulty(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                        >
                          <option>Easy / Foundation</option>
                          <option>Balanced (Easy + Medium + HOTS)</option>
                          <option>Scholarship / Olympiad Level</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {selectedTool === 'letter_generator' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Letter Purpose</label>
                      <select
                        value={letterType}
                        onChange={(e) => setLetterType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      >
                        <option>Student Leave Application</option>
                        <option>Bonafide Certificate Request</option>
                        <option>Transfer Certificate (TC) Application</option>
                        <option>PTM Circular to Parents</option>
                        <option>Fee Structure &amp; Scholarship Notice</option>
                      </select>
                    </div>
                  )}

                  {selectedTool === 'content_generator' && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Content Format</label>
                      <select
                        value={contentFormat}
                        onChange={(e) => setContentFormat(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                      >
                        <option>Morning Assembly Speech</option>
                        <option>Classroom Lesson Hook &amp; Activity</option>
                        <option>School Monthly Newsletter Article</option>
                        <option>Parent Orientation Handout</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Topic / Chapter Name / Key Details *
                    </label>
                    <input
                      type="text"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder="e.g. Fractions & Decimals, Photosynthesis, Leave for family function..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Additional Teacher / Student Instructions (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Specific subtopics, word-problem examples, or tone preferences..."
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold cursor-pointer whitespace-nowrap"
                  >
                    {isGenerating ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Sparkles className="w-4 h-4" />
                    )}
                    <span>
                      {isGenerating
                        ? 'Generating with Gemini AI...'
                        : `Generate ${currentToolMeta.title.replace('AI ', '')} with Gemini`}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Interactive Output Viewer: Playable Quiz */}
          {selectedTool === 'quiz_generator' && quizOutput && quizOutput.questions.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{quizOutput.title}</h3>
                  <p className="text-xs text-slate-500 tabular-nums">
                    {quizOutput.questions.length} Interactive Questions
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => downloadJsonFile(quizOutput, `${quizOutput.title}_quiz`)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export JSON</span>
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
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF + Key</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {quizOutput.questions.map((q, qIdx) => {
                  const chosen = quizAnswers[qIdx];
                  return (
                    <div key={qIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5">
                      <div className="text-sm font-semibold text-slate-900">
                        {qIdx + 1}. {q.question}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt, oIdx) => {
                          const isChosen = chosen === oIdx;
                          const isCorrect = q.correctIndex === oIdx;
                          let btnCls = 'bg-white border-slate-200 text-slate-800 hover:bg-slate-100';
                          if (quizSubmitted) {
                            if (isCorrect) btnCls = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                            else if (isChosen && !isCorrect) btnCls = 'bg-rose-50 border-rose-400 text-rose-900';
                          } else if (isChosen) {
                            btnCls = 'bg-indigo-600 border-indigo-600 text-white font-semibold';
                          }
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() =>
                                !quizSubmitted && setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))
                              }
                              className={`p-2.5 rounded-lg border text-left text-xs cursor-pointer transition-colors ${btnCls}`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}
                            </button>
                          );
                        })}
                      </div>
                      {quizSubmitted && q.explanation && (
                        <p className="text-xs text-slate-600 pt-1">Explanation: {q.explanation}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                {!quizSubmitted ? (
                  <button
                    type="button"
                    onClick={() => setQuizSubmitted(true)}
                    className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    Submit &amp; Grade Quiz
                  </button>
                ) : (
                  <div className="text-sm font-bold text-emerald-700 tabular-nums">
                    Score:{' '}
                    {quizOutput.questions.filter((q, idx) => quizAnswers[idx] === q.correctIndex).length} /{' '}
                    {quizOutput.questions.length}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interactive Output Viewer: Presentation Slides */}
          {selectedTool === 'presentation_maker' && deckOutput && deckOutput.slides.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{deckOutput.title}</h3>
                  <p className="text-xs text-slate-500">
                    {deckOutput.subtitle} · {deckOutput.slides.length} Slides
                  </p>
                </div>
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Download Landscape Slides PDF</span>
                </button>
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
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold cursor-pointer"
                >
                  Previous Slide
                </button>
                <button
                  type="button"
                  disabled={activeSlideIdx >= deckOutput.slides.length - 1}
                  onClick={() => setActiveSlideIdx((i) => Math.min(deckOutput.slides.length - 1, i + 1))}
                  className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold cursor-pointer"
                >
                  Next Slide
                </button>
              </div>
            </div>
          )}

          {/* Structured Document Preview + PDF / TXT Download */}
          {selectedTool !== 'quiz_generator' &&
            selectedTool !== 'presentation_maker' &&
            selectedTool !== 'image_generator' &&
            selectedTool !== 'resume_maker' &&
            docOutput && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{docOutput.title}</h3>
                    {docOutput.subtitle && (
                      <p className="text-xs text-slate-500 mt-0.5">{docOutput.subtitle}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        downloadPlainTextFile(formatDocPlainText(docOutput), docOutput.title, 'txt')
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 cursor-pointer whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download .TXT</span>
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
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Real PDF</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {docOutput.sections.map((sec, idx) => (
                    <div key={idx} className="space-y-1.5">
                      {sec.heading && (
                        <h4 className="text-sm font-bold text-indigo-900">{sec.heading}</h4>
                      )}
                      <div className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">
                        {sec.body}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </section>
      </div>
    </div>
  );
};
