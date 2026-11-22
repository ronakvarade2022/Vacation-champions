import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Compass,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  Lightbulb,
  Printer,
  RotateCcw,
  Search,
  Sparkles,
  Target,
  Users,
  XCircle,
} from 'lucide-react';
import {
  getTetCtetNotesForSelection,
  getTetCtetSubjectsForPaper,
  subscribeToTetCtetNotesUpdates,
  TET_CTET_EXAM_META,
  TET_CTET_NOTE_LANGUAGES,
  TET_CTET_PAPER_META,
  TetCtetNoteExam,
  TetCtetNoteLanguage,
  TetCtetNotePaper,
  TetCtetNoteSubjectId,
  TetCtetStudyNoteDocument,
} from '../data/tetCtetNotes';

export interface TetCtetStudyNotesViewProps {
  initialExam?: TetCtetNoteExam;
  initialPaper?: TetCtetNotePaper;
  initialLanguage?: TetCtetNoteLanguage;
  embeddedInModule?: boolean;
  onBack?: () => void;
}

const UI_COPY: Record<
  TetCtetNoteLanguage,
  {
    studioBadge: string;
    studioTitle: string;
    studioSubtitle: string;
    backBtn: string;
    step1Exam: string;
    step2Paper: string;
    step3Lang: string;
    step4Subject: string;
    step5Topic: string;
    searchPlaceholder: string;
    printBtn: string;
    syllabusSourceLabel: string;
    fileRefLabel: string;
    officialPatternLabel: string;
    secIntro: string;
    secDefinition: string;
    secSubtopics: string;
    secDetailed: string;
    secConcepts: string;
    secTypes: string;
    secTheories: string;
    secThinkers: string;
    secExamples: string;
    secClassroom: string;
    secMethods: string;
    secExamFocusCtet: string;
    secExamFocusMahaTet: string;
    secExamPoints: string;
    secMistakes: string;
    secSummary: string;
    secRevision: string;
    secPracticeTitle: string;
    secPracticeDisclaimer: string;
    resetPractice: string;
    scoreLabel: string;
    correctLabel: string;
    incorrectLabel: string;
    explanationLabel: string;
    noNotesFound: string;
    marksUnit: string;
    questionsUnit: string;
    streamCore: string;
    streamMathSci: string;
    streamSst: string;
    prevUnit: string;
    nextUnit: string;
  }
> = {
  English: {
    studioBadge: 'Official Syllabus Study Notes · EN / MR / HI',
    studioTitle: 'TET & CTET Complete Study Notes',
    studioSubtitle:
      'Original, examination-oriented notes mapped strictly to CBSE CTET (ctet.nic.in) and MSCE Pune MAHA TET (mahatet.in) official syllabi.',
    backBtn: 'Back to TET & CTET Hub',
    step1Exam: '1. Select Examination',
    step2Paper: '2. Select Paper',
    step3Lang: '3. Select Medium / Language',
    step4Subject: '4. Select Subject',
    step5Topic: '5. Select Unit & Topic (Notes open immediately below)',
    searchPlaceholder: 'Filter topics or keywords in this subject...',
    printBtn: 'Print / Save PDF',
    syllabusSourceLabel: 'Official Syllabus Reference',
    fileRefLabel: 'Document Ref',
    officialPatternLabel: 'Official Exam Pattern',
    secIntro: 'Introduction & Exam Weightage',
    secDefinition: 'Core Meaning & Definition',
    secSubtopics: 'Official Syllabus Subtopics Covered',
    secDetailed: 'Detailed Conceptual Explanation',
    secConcepts: 'High-Yield Key Concepts & Formulas',
    secTypes: 'Types, Stages & Classifications',
    secTheories: 'Key Principles & Educational Theories',
    secThinkers: 'Key Thinkers, Psychologists & Reformers',
    secExamples: 'Solved / Practical Exam Examples',
    secClassroom: 'Classroom Applications',
    secMethods: 'Recommended Teaching Methods & Pedagogy',
    secExamFocusCtet: 'CBSE CTET Specific Examination Focus',
    secExamFocusMahaTet: 'MSCE Pune MAHA TET Specific Examination Focus',
    secExamPoints: 'Important Exam-Oriented Points',
    secMistakes: 'Common Mistakes & Exam Traps to Avoid',
    secSummary: 'Concise Topic Summary',
    secRevision: 'Quick Last-Minute Revision Checklist',
    secPracticeTitle: 'Topic-Wise Practice Questions (MCQs)',
    secPracticeDisclaimer: 'Original Syllabus Practice Questions (Prepared for concept mastery — distinct from official PYQs)',
    resetPractice: 'Reset Practice',
    scoreLabel: 'Score',
    correctLabel: 'Correct Answer',
    incorrectLabel: 'Review Explanation',
    explanationLabel: 'Explanation',
    noNotesFound: 'No published study notes matched your filter for this selection.',
    marksUnit: 'Marks',
    questionsUnit: 'Qs',
    streamCore: 'Compulsory',
    streamMathSci: 'Math & Science Stream',
    streamSst: 'Social Studies Stream',
    prevUnit: 'Previous Unit',
    nextUnit: 'Next Unit',
  },
  Marathi: {
    studioBadge: 'अधिकृत अभ्यासक्रम नोट्स · English / मराठी / हिन्दी',
    studioTitle: 'TET व CTET संपूर्ण अभ्यास नोट्स',
    studioSubtitle:
      'CBSE CTET (ctet.nic.in) व MSCE पुणे MAHA TET (mahatet.in) च्या अधिकृत अभ्यासक्रमावर आधारित स्वतंत्र व परीक्षाभिमुख नोट्स.',
    backBtn: 'TET व CTET मुख्य विभागात परत जा',
    step1Exam: '१. परीक्षा निवडा',
    step2Paper: '२. पेपर निवडा',
    step3Lang: '३. भाषा / माध्यम निवडा',
    step4Subject: '४. विषय निवडा',
    step5Topic: '५. घटक व उपघटक निवडा (संपूर्ण नोट्स खाली लगेच उघडतील)',
    searchPlaceholder: 'या विषयातील घटक किंवा शब्द शोधा...',
    printBtn: 'प्रिंट / PDF जतन करा',
    syllabusSourceLabel: 'अधिकृत अभ्यासक्रम संदर्भ',
    fileRefLabel: 'दस्तऐवज संदर्भ',
    officialPatternLabel: 'अधिकृत परीक्षा आराखडा',
    secIntro: 'प्रस्तावना व परीक्षा महत्त्व',
    secDefinition: 'मुख्य अर्थ व व्याख्या',
    secSubtopics: 'अधिकृत अभ्यासक्रमातील समाविष्ट उपघटक',
    secDetailed: 'सविस्तर संकल्पनात्मक स्पष्टीकरण',
    secConcepts: 'महत्त्वाच्या संकल्पना व सूत्रे',
    secTypes: 'प्रकार, टप्पे व वर्गीकरण',
    secTheories: 'महत्त्वाची तत्त्वे व शैक्षणिक उपपत्ती',
    secThinkers: 'प्रमुख विचारवंत, मानसशास्त्रज्ञ व समाजसुधारक',
    secExamples: 'सोडवलेली / व्यावहारिक उदाहरणे',
    secClassroom: 'वर्गातील प्रत्यक्ष उपयोजन',
    secMethods: 'प्रभावी अध्यापन पद्धती',
    secExamFocusCtet: 'CBSE CTET परीक्षेसाठी विशेष भर',
    secExamFocusMahaTet: 'MSCE पुणे MAHA TET परीक्षेसाठी विशेष भर',
    secExamPoints: 'परीक्षेसाठी अत्यंत महत्त्वाचे मुद्दे',
    secMistakes: 'टाळावयाच्या सामान्य चुका व फसवे प्रश्न',
    secSummary: 'घटकाचा संक्षिप्त सारांश',
    secRevision: 'जलद उजळणी सूची (Quick Revision)',
    secPracticeTitle: 'घटकनिहाय सराव बहुपर्यायी प्रश्न (MCQs)',
    secPracticeDisclaimer: 'अधिकृत अभ्यासक्रमावर आधारित मूळ सराव प्रश्न (संकल्पना दृढीकरणासाठी — अधिकृत PYQs पासून स्वतंत्र)',
    resetPractice: 'सराव पुन्हा सुरू करा',
    scoreLabel: 'गुण',
    correctLabel: 'बरोबर उत्तर',
    incorrectLabel: 'स्पष्टीकरण अभ्यासा',
    explanationLabel: 'स्पष्टीकरण',
    noNotesFound: 'या निवडीसाठी प्रकाशित अभ्यास नोट्स उपलब्ध नाहीत.',
    marksUnit: 'गुण',
    questionsUnit: 'प्रश्न',
    streamCore: 'अनिवार्य',
    streamMathSci: 'गणित व विज्ञान गट',
    streamSst: 'सामाजिक शास्त्र गट',
    prevUnit: 'मागील घटक',
    nextUnit: 'पुढील घटक',
  },
  Hindi: {
    studioBadge: 'आधिकारिक पाठ्यक्रम नोट्स · English / मराठी / हिन्दी',
    studioTitle: 'TET एवं CTET संपूर्ण अध्ययन नोट्स',
    studioSubtitle:
      'CBSE CTET (ctet.nic.in) तथा MSCE पुणे MAHA TET (mahatet.in) के आधिकारिक पाठ्यक्रम पर आधारित मौलिक एवं परीक्षा-केंद्रित नोट्स।',
    backBtn: 'TET एवं CTET मुख्य खंड में वापस जाएँ',
    step1Exam: '1. परीक्षा चुनें',
    step2Paper: '2. पेपर चुनें',
    step3Lang: '3. भाषा / माध्यम चुनें',
    step4Subject: '4. विषय चुनें',
    step5Topic: '5. इकाई और विषय चुनें (संपूर्ण नोट्स ठीक नीचे खुलेंगे)',
    searchPlaceholder: 'इस विषय के अंतर्गत इकाई या शब्द खोजें...',
    printBtn: 'प्रिंट / PDF सहेजें',
    syllabusSourceLabel: 'आधिकारिक पाठ्यक्रम संदर्भ',
    fileRefLabel: 'दस्तावेज़ संदर्भ',
    officialPatternLabel: 'आधिकारिक परीक्षा पैटर्न',
    secIntro: 'परिचय एवं परीक्षा भार',
    secDefinition: 'मुख्य अर्थ एवं परिभाषा',
    secSubtopics: 'आधिकारिक पाठ्यक्रम के उपविषय',
    secDetailed: 'विस्तृत अवधारणात्मक व्याख्या',
    secConcepts: 'प्रमुख अवधारणाएँ एवं सूत्र',
    secTypes: 'प्रकार, अवस्थाएँ एवं वर्गीकरण',
    secTheories: 'प्रमुख सिद्धांत एवं शैक्षिक विचार',
    secThinkers: 'प्रमुख विचारक, मनोवैज्ञानिक एवं सुधारक',
    secExamples: 'व्यावहारिक एवं हल किए गए उदाहरण',
    secClassroom: 'कक्षा-कक्ष अनुप्रयोग',
    secMethods: 'प्रभावी शिक्षण विधियाँ',
    secExamFocusCtet: 'CBSE CTET परीक्षा विशेष फोकस',
    secExamFocusMahaTet: 'MSCE पुणे MAHA TET परीक्षा विशेष फोकस',
    secExamPoints: 'परीक्षा-उपयोगी महत्वपूर्ण बिंदु',
    secMistakes: 'सामान्य गलतियाँ जिनसे बचना चाहिए',
    secSummary: 'इकाई का संक्षिप्त सारांश',
    secRevision: 'त्वरित पुनरावृत्ति बिंदु (Quick Revision)',
    secPracticeTitle: 'विषयवार अभ्यास प्रश्न (MCQs)',
    secPracticeDisclaimer: 'आधिकारिक पाठ्यक्रम आधारित मौलिक अभ्यास प्रश्न (अवधारणा अभ्यास हेतु — आधिकारिक PYQs से पृथक)',
    resetPractice: 'अभ्यास रीसेट करें',
    scoreLabel: 'स्कोर',
    correctLabel: 'सही उत्तर',
    incorrectLabel: 'व्याख्या देखें',
    explanationLabel: 'व्याख्या',
    noNotesFound: 'इस चयन के लिए कोई प्रकाशित अध्ययन नोट्स उपलब्ध नहीं हैं।',
    marksUnit: 'अंक',
    questionsUnit: 'प्रश्न',
    streamCore: 'अनिवार्य',
    streamMathSci: 'गणित एवं विज्ञान वर्ग',
    streamSst: 'सामाजिक अध्ययन वर्ग',
    prevUnit: 'पिछली इकाई',
    nextUnit: 'अगली इकाई',
  },
};

const LANG_DISPLAY_LABELS: Record<TetCtetNoteLanguage, { label: string; sub: string }> = {
  English: { label: 'English', sub: 'English Medium' },
  Marathi: { label: 'मराठी', sub: 'Marathi Medium' },
  Hindi: { label: 'हिन्दी', sub: 'Hindi Medium' },
};

export const TetCtetStudyNotesView: React.FC<TetCtetStudyNotesViewProps> = ({
  initialExam = 'CTET',
  initialPaper = 'PAPER_1',
  initialLanguage = 'English',
  embeddedInModule = false,
  onBack,
}) => {
  const [exam, setExam] = useState<TetCtetNoteExam>(initialExam);
  const [paper, setPaper] = useState<TetCtetNotePaper>(initialPaper);
  const [language, setLanguage] = useState<TetCtetNoteLanguage>(initialLanguage);
  const [subjectId, setSubjectId] = useState<TetCtetNoteSubjectId>('CDP');
  const [selectedNoteId, setSelectedNoteId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revisionTick, setRevisionTick] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  // Sync when embedded inside TetCtetModuleView and parent switches module/medium
  useEffect(() => {
    setExam(initialExam);
  }, [initialExam]);

  useEffect(() => {
    setPaper(initialPaper);
  }, [initialPaper]);

  useEffect(() => {
    setLanguage(initialLanguage);
  }, [initialLanguage]);

  // Listen for live admin publish/hide/edit/add updates
  useEffect(() => {
    return subscribeToTetCtetNotesUpdates(() => {
      setRevisionTick((t) => t + 1);
    });
  }, []);

  const paperSubjects = useMemo(() => getTetCtetSubjectsForPaper(paper), [paper]);

  // Keep subjectId valid whenever Paper changes (e.g., EVS -> Paper II defaults to CDP)
  useEffect(() => {
    if (!paperSubjects.some((s) => s.subjectId === subjectId)) {
      setSubjectId(paperSubjects[0].subjectId);
    }
  }, [paperSubjects, subjectId]);

  const subjectNotes = useMemo(() => {
    void revisionTick;
    return getTetCtetNotesForSelection(exam, paper, language, subjectId, false);
  }, [exam, paper, language, subjectId, revisionTick]);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return subjectNotes;
    return subjectNotes.filter(
      (doc) =>
        doc.unitTitle.toLowerCase().includes(q) ||
        doc.topicTitle.toLowerCase().includes(q) ||
        doc.documentTitle.toLowerCase().includes(q) ||
        doc.body.subtopics.some((s) => s.toLowerCase().includes(q))
    );
  }, [subjectNotes, searchQuery]);

  // Ensure a valid selected topic whenever selection changes
  useEffect(() => {
    if (filteredNotes.length === 0) {
      setSelectedNoteId('');
      return;
    }
    if (!filteredNotes.some((n) => n.id === selectedNoteId)) {
      setSelectedNoteId(filteredNotes[0].id);
    }
  }, [filteredNotes, selectedNoteId]);

  // Clear MCQ attempt state when switching to a different note
  useEffect(() => {
    setAnswers({});
  }, [selectedNoteId]);

  const activeDoc: TetCtetStudyNoteDocument | undefined = useMemo(
    () => filteredNotes.find((n) => n.id === selectedNoteId) ?? filteredNotes[0],
    [filteredNotes, selectedNoteId]
  );

  const activeIndex = activeDoc ? filteredNotes.findIndex((n) => n.id === activeDoc.id) : -1;
  const copy = UI_COPY[language];
  const examMeta = TET_CTET_EXAM_META[exam];
  const paperMeta = TET_CTET_PAPER_META[paper];

  const practiceStats = useMemo(() => {
    if (!activeDoc) return { answered: 0, correct: 0, total: 0 };
    const qs = activeDoc.body.practiceQuestions;
    let answered = 0;
    let correct = 0;
    for (const q of qs) {
      if (answers[q.id] !== undefined) {
        answered += 1;
        if (answers[q.id] === q.correctAnswer) correct += 1;
      }
    }
    return { answered, correct, total: qs.length };
  }, [activeDoc, answers]);

  const handlePrint = () => {
    if (typeof window !== 'undefined' && typeof window.print === 'function') {
      window.print();
    }
  };

  return (
    <div className="space-y-5">
      {/* Top Studio Header */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 shadow-md border border-indigo-800/40 print:hidden">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              {!embeddedInModule && onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  {copy.backBtn}
                </button>
              )}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                {copy.studioBadge}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {copy.studioTitle}
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              {copy.studioSubtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white text-indigo-950 hover:bg-indigo-50 text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              {copy.printBtn}
            </button>
          </div>
        </div>

        {/* Official Exam Authority & Pattern Banner */}
        <div className="mt-4 pt-3.5 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5">
            <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
              {examMeta.fullName[language]}
            </div>
            <div className="text-white/95 font-medium mt-0.5">
              {examMeta.authority[language]} · <span className="text-emerald-300">{examMeta.officialPortal}</span>
            </div>
          </div>
          <div className="rounded-xl bg-white/5 border border-white/10 px-3.5 py-2.5">
            <div className="text-[11px] uppercase tracking-wider text-indigo-300 font-semibold">
              {copy.officialPatternLabel}
            </div>
            <div className="text-white/95 font-medium mt-0.5">{examMeta.patternSummary[language]}</div>
          </div>
        </div>
      </div>

      {/* 5-LEVEL STRUCTURED SELECTOR PANEL */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4 print:hidden">
        {/* Levels 1, 2, 3 in one clean horizontal responsive grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Level 1: Examination */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              {copy.step1Exam}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['CTET', 'MAHA_TET'] as TetCtetNoteExam[]).map((ex) => {
                const active = exam === ex;
                return (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setExam(ex)}
                    className={`px-3 py-2.5 rounded-xl border text-left transition cursor-pointer ${
                      active
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50 hover:border-indigo-300'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{ex === 'CTET' ? 'CTET (CBSE)' : 'MAHA TET'}</div>
                    <div className={`text-[10px] mt-0.5 ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                      {ex === 'CTET' ? 'ctet.nic.in' : 'mahatet.in'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 2: Paper */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              {copy.step2Paper}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {(['PAPER_1', 'PAPER_2'] as TetCtetNotePaper[]).map((p) => {
                const active = paper === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPaper(p)}
                    className={`px-3 py-2.5 rounded-xl border text-left transition cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50 hover:border-emerald-300'
                    }`}
                  >
                    <div className="text-xs font-extrabold">
                      {p === 'PAPER_1' ? 'Paper I (I–V)' : 'Paper II (VI–VIII)'}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${active ? 'text-emerald-100' : 'text-slate-500'}`}>
                      {TET_CTET_PAPER_META[p].classesLabels[language]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Level 3: Language */}
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              {copy.step3Lang}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {TET_CTET_NOTE_LANGUAGES.map((lang) => {
                const active = language === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setLanguage(lang)}
                    className={`px-2.5 py-2.5 rounded-xl border text-center transition cursor-pointer ${
                      active
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50 hover:border-amber-300'
                    }`}
                  >
                    <div className="text-xs font-extrabold">{LANG_DISPLAY_LABELS[lang].label}</div>
                    <div className={`text-[10px] mt-0.5 ${active ? 'text-amber-100' : 'text-slate-500'}`}>
                      {lang === 'English' ? 'EN' : lang === 'Marathi' ? 'MR' : 'HI'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Level 4: Subject Row */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {copy.step4Subject} · <span className="text-indigo-700">{paperMeta.labels[language]}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {paperSubjects.map((subj) => {
              const active = subjectId === subj.subjectId;
              const streamTag =
                subj.streamGroup === 'MATH_SCIENCE'
                  ? copy.streamMathSci
                  : subj.streamGroup === 'SOCIAL_STUDIES'
                    ? copy.streamSst
                    : copy.streamCore;
              return (
                <button
                  key={subj.subjectId}
                  type="button"
                  onClick={() => {
                    setSubjectId(subj.subjectId);
                    setSearchQuery('');
                  }}
                  className={`px-3.5 py-2 rounded-xl border text-left transition cursor-pointer ${
                    active
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold">{subj.labels[language]}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        active ? 'bg-white/15 text-white' : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {subj.marks} {copy.marksUnit}
                    </span>
                  </div>
                  <div className={`text-[10px] mt-0.5 ${active ? 'text-slate-300' : 'text-slate-500'}`}>
                    {streamTag}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level 5: Unit & Topic Selector Bar */}
        <div className="pt-3 border-t border-slate-100 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              {copy.step5Topic}
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {filteredNotes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
              {filteredNotes.map((doc) => {
                const isSelected = activeDoc?.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => setSelectedNoteId(doc.id)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 ring-2 ring-indigo-600/20 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded ${
                            isSelected
                              ? 'bg-indigo-600 text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          U{doc.unitNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          {doc.body.practiceQuestions.length} MCQs
                        </span>
                      </div>
                      <div
                        className={`text-xs font-bold mt-1.5 leading-snug ${
                          isSelected ? 'text-indigo-950' : 'text-slate-800'
                        }`}
                      >
                        {doc.unitTitle}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                        {doc.topicTitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
              {copy.noNotesFound}
            </div>
          )}
        </div>
      </div>

      {/* SELECTED STUDY NOTE CONTENT — RENDERED IMMEDIATELY BELOW THE TOPIC BAR */}
      {activeDoc && (
        <article className="rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* Document Header Strip */}
          <div className="bg-gradient-to-r from-indigo-50 via-white to-emerald-50 border-b border-slate-200 p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white text-[11px] font-bold">
                {exam === 'CTET' ? 'CBSE CTET' : 'MSCE MAHA TET'}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-600 text-white text-[11px] font-bold">
                {paperMeta.labels[language]}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-amber-600 text-white text-[11px] font-bold">
                {LANG_DISPLAY_LABELS[language].label}
              </span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-white text-[11px] font-bold">
                {activeDoc.subjectName}
              </span>
            </div>

            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 leading-snug">
              {activeDoc.documentTitle}
            </h3>
            <p className="text-xs sm:text-sm font-medium text-indigo-800 mt-1">
              {activeDoc.unitTitle} · {activeDoc.topicTitle}
            </p>

            <div className="mt-3 pt-3 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-600">
              <div>
                <span className="font-bold text-slate-800">{copy.syllabusSourceLabel}:</span>{' '}
                {activeDoc.syllabusSource}
              </div>
              <div className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                {copy.fileRefLabel}: {activeDoc.fileReference}
              </div>
            </div>
          </div>

          {/* Structured Academic Body */}
          <div className="p-5 sm:p-7 space-y-6 text-slate-800">
            {/* 1. Introduction & Definition */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <section className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 mb-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  {copy.secIntro}
                </h4>
                <p className="text-sm leading-relaxed text-slate-700">{activeDoc.body.introduction}</p>
              </section>

              <section className="rounded-xl bg-indigo-50/60 border border-indigo-200 p-4">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-indigo-950 mb-2">
                  <Compass className="w-4 h-4 text-indigo-600" />
                  {copy.secDefinition}
                </h4>
                <p className="text-sm leading-relaxed text-slate-800">
                  {activeDoc.body.meaningAndDefinition}
                </p>
              </section>
            </div>

            {/* 2. Official Subtopics Covered */}
            {activeDoc.body.subtopics.length > 0 && (
              <section className="rounded-xl border border-slate-200 p-4">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-slate-900 mb-3">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  {copy.secSubtopics}
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {activeDoc.body.subtopics.map((sub, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 3. Detailed Conceptual Explanation */}
            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-base font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                {copy.secDetailed}
              </h4>
              <div className="space-y-3">
                {activeDoc.body.detailedExplanation.map((para, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl bg-white border border-slate-200/90 p-4 text-sm leading-relaxed text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
                  >
                    {para}
                  </div>
                ))}
              </div>
            </section>

            {/* 4. High-Yield Key Concepts */}
            {activeDoc.body.importantConcepts.length > 0 && (
              <section className="rounded-xl bg-amber-50/70 border border-amber-200 p-4 sm:p-5">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-amber-950 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  {copy.secConcepts}
                </h4>
                <ul className="space-y-2">
                  {activeDoc.body.importantConcepts.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-800">
                      <ChevronRight className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* 5. Comparison Table (when present) */}
            {activeDoc.body.comparisonTable && (
              <section className="space-y-2">
                <h4 className="text-sm font-extrabold text-slate-900">
                  {activeDoc.body.comparisonTable.caption}
                </h4>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        {activeDoc.body.comparisonTable.headers.map((h, i) => (
                          <th key={i} className="px-3.5 py-2.5 font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activeDoc.body.comparisonTable.rows.map((row, rIdx) => (
                        <tr
                          key={rIdx}
                          className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
                        >
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`px-3.5 py-2.5 align-top ${
                                cIdx === 0 ? 'font-bold text-slate-900' : 'text-slate-700'
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* 6. Optional Types / Theories / Thinkers */}
            {((activeDoc.body.typesAndClassifications && activeDoc.body.typesAndClassifications.length > 0) ||
              (activeDoc.body.importantPrinciples && activeDoc.body.importantPrinciples.length > 0) ||
              (activeDoc.body.educationalTheories && activeDoc.body.educationalTheories.length > 0)) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeDoc.body.typesAndClassifications && activeDoc.body.typesAndClassifications.length > 0 && (
                  <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-2">{copy.secTypes}</h4>
                    <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                      {activeDoc.body.typesAndClassifications.map((t, i) => (
                        <li key={i}>{t}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {((activeDoc.body.importantPrinciples && activeDoc.body.importantPrinciples.length > 0) ||
                  (activeDoc.body.educationalTheories && activeDoc.body.educationalTheories.length > 0)) && (
                  <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h4 className="text-sm font-extrabold text-slate-900 mb-2">{copy.secTheories}</h4>
                    <ul className="space-y-1.5 text-sm text-slate-700 list-disc pl-5">
                      {(activeDoc.body.importantPrinciples || []).map((p, i) => (
                        <li key={`p-${i}`}>{p}</li>
                      ))}
                      {(activeDoc.body.educationalTheories || []).map((th, i) => (
                        <li key={`th-${i}`}>{th}</li>
                      ))}
                    </ul>
                  </section>
                )}
              </div>
            )}

            {activeDoc.body.keyThinkers && activeDoc.body.keyThinkers.length > 0 && (
              <section className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-4">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-indigo-950 mb-3">
                  <Users className="w-4 h-4 text-indigo-600" />
                  {copy.secThinkers}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {activeDoc.body.keyThinkers.map((tk, i) => (
                    <div key={i} className="rounded-lg bg-white border border-indigo-100 p-3">
                      <div className="text-xs font-extrabold text-indigo-900">{tk.name}</div>
                      <div className="text-xs text-slate-700 mt-1 leading-relaxed">{tk.contribution}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 7. Practical Examples, Classroom Applications & Teaching Methods */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {activeDoc.body.practicalExamples.length > 0 && (
                <section className="rounded-xl border border-slate-200 p-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-700 mb-2.5">
                    {copy.secExamples}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {activeDoc.body.practicalExamples.map((ex, i) => (
                      <li key={i} className="bg-slate-50 rounded-lg p-2.5 border border-slate-100">
                        {ex}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {activeDoc.body.classroomApplications.length > 0 && (
                <section className="rounded-xl border border-slate-200 p-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 mb-2.5">
                    {copy.secClassroom}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {activeDoc.body.classroomApplications.map((ca, i) => (
                      <li key={i} className="bg-emerald-50/40 rounded-lg p-2.5 border border-emerald-100">
                        {ca}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {activeDoc.body.teachingMethods.length > 0 && (
                <section className="rounded-xl border border-slate-200 p-4">
                  <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-700 mb-2.5">
                    {copy.secMethods}
                  </h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {activeDoc.body.teachingMethods.map((tm, i) => (
                      <li key={i} className="bg-purple-50/40 rounded-lg p-2.5 border border-purple-100">
                        {tm}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* 8. STRICTLY ISOLATED EXAM-SPECIFIC FOCUS BOX */}
            <section
              className={`rounded-xl border-2 p-4 sm:p-5 ${
                exam === 'CTET'
                  ? 'bg-blue-50/70 border-blue-300'
                  : 'bg-orange-50/70 border-orange-300'
              }`}
            >
              <h4
                className={`flex items-center gap-2 text-sm font-extrabold mb-2 ${
                  exam === 'CTET' ? 'text-blue-950' : 'text-orange-950'
                }`}
              >
                <Target className={`w-4 h-4 ${exam === 'CTET' ? 'text-blue-700' : 'text-orange-700'}`} />
                {exam === 'CTET' ? copy.secExamFocusCtet : copy.secExamFocusMahaTet}
              </h4>
              <p className="text-sm leading-relaxed text-slate-800">
                {exam === 'CTET'
                  ? activeDoc.body.examSpecificFocus.ctet
                  : activeDoc.body.examSpecificFocus.mahaTet}
              </p>
            </section>

            {/* 9. Important Exam Points & Common Mistakes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeDoc.body.importantExamPoints.length > 0 && (
                <section className="rounded-xl bg-emerald-50/60 border border-emerald-200 p-4">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-emerald-950 mb-2.5">
                    <Award className="w-4 h-4 text-emerald-700" />
                    {copy.secExamPoints}
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-800">
                    {activeDoc.body.importantExamPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {activeDoc.body.commonMistakes.length > 0 && (
                <section className="rounded-xl bg-rose-50/60 border border-rose-200 p-4">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-rose-950 mb-2.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    {copy.secMistakes}
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-800">
                    {activeDoc.body.commonMistakes.map((m, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* 10. Topic Summary & Quick Revision Points */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <section className="rounded-xl bg-slate-900 text-white p-4 sm:p-5">
                <h4 className="flex items-center gap-2 text-sm font-extrabold text-indigo-200 mb-2">
                  <GraduationCap className="w-4 h-4 text-indigo-300" />
                  {copy.secSummary}
                </h4>
                <p className="text-sm leading-relaxed text-slate-100">{activeDoc.body.topicSummary}</p>
              </section>

              {activeDoc.body.revisionPoints.length > 0 && (
                <section className="rounded-xl bg-indigo-950 text-white p-4 sm:p-5">
                  <h4 className="flex items-center gap-2 text-sm font-extrabold text-amber-300 mb-2.5">
                    <ClipboardList className="w-4 h-4 text-amber-300" />
                    {copy.secRevision}
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-indigo-100">
                    {activeDoc.body.revisionPoints.map((rp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-300 font-bold">•</span>
                        <span>{rp}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            {/* 11. Interactive Original Practice MCQs */}
            {activeDoc.body.practiceQuestions.length > 0 && (
              <section className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/30 p-4 sm:p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h4 className="flex items-center gap-2 text-base font-extrabold text-indigo-950">
                      <HelpCircle className="w-5 h-5 text-indigo-600" />
                      {copy.secPracticeTitle}
                    </h4>
                    <p className="text-xs text-indigo-700 font-medium mt-0.5">
                      {copy.secPracticeDisclaimer}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-white border border-indigo-200 text-xs font-extrabold text-indigo-900">
                      {copy.scoreLabel}: {practiceStats.correct} / {practiceStats.total}
                    </span>
                    {practiceStats.answered > 0 && (
                      <button
                        type="button"
                        onClick={() => setAnswers({})}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {copy.resetPractice}
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {activeDoc.body.practiceQuestions.map((mcq, qIdx) => {
                    const picked = answers[mcq.id];
                    const isAnswered = picked !== undefined;
                    const isCorrect = picked === mcq.correctAnswer;
                    return (
                      <div
                        key={mcq.id}
                        className="rounded-xl bg-white border border-slate-200 p-4 space-y-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-bold text-slate-900 leading-snug">
                            Q{qIdx + 1}. {mcq.question}
                          </div>
                          <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded shrink-0">
                            {mcq.topicReference}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {mcq.options.map((opt, oIdx) => {
                            const selected = picked === oIdx;
                            const correctOpt = oIdx === mcq.correctAnswer;
                            let btnClass =
                              'bg-slate-50 border-slate-200 text-slate-800 hover:border-indigo-400 hover:bg-indigo-50/40';
                            if (isAnswered) {
                              if (correctOpt) {
                                btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold';
                              } else if (selected && !correctOpt) {
                                btnClass = 'bg-rose-50 border-rose-500 text-rose-950';
                              } else {
                                btnClass = 'bg-slate-50 border-slate-200 text-slate-500 opacity-80';
                              }
                            }
                            return (
                              <button
                                key={oIdx}
                                type="button"
                                disabled={isAnswered}
                                onClick={() => setAnswers((prev) => ({ ...prev, [mcq.id]: oIdx }))}
                                className={`text-left px-3 py-2.5 rounded-lg border text-xs sm:text-sm transition flex items-start gap-2 ${
                                  isAnswered ? 'cursor-default' : 'cursor-pointer'
                                } ${btnClass}`}
                              >
                                <span className="font-extrabold shrink-0">
                                  {String.fromCharCode(65 + oIdx)}.
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>
                        {isAnswered && (
                          <div
                            className={`rounded-lg p-3 text-xs sm:text-sm border ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                                : 'bg-amber-50 border-amber-200 text-amber-950'
                            }`}
                          >
                            <div className="font-extrabold mb-1">
                              {isCorrect ? `✓ ${copy.correctLabel}` : `✕ ${copy.incorrectLabel}`}
                            </div>
                            <div>
                              <span className="font-bold">{copy.explanationLabel}:</span> {mcq.explanation}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Prev / Next Unit Navigation Footer */}
            {filteredNotes.length > 1 && (
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3 print:hidden">
                <button
                  type="button"
                  disabled={activeIndex <= 0}
                  onClick={() => {
                    if (activeIndex > 0) setSelectedNoteId(filteredNotes[activeIndex - 1].id);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  ← {copy.prevUnit}
                </button>
                <span className="text-xs font-semibold text-slate-500">
                  {activeIndex + 1} / {filteredNotes.length}
                </span>
                <button
                  type="button"
                  disabled={activeIndex >= filteredNotes.length - 1}
                  onClick={() => {
                    if (activeIndex < filteredNotes.length - 1) {
                      setSelectedNoteId(filteredNotes[activeIndex + 1].id);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-xs font-bold text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {copy.nextUnit} →
                </button>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
};

export default TetCtetStudyNotesView;
