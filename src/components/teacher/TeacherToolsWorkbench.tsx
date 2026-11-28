import React, { useEffect, useMemo, useState } from 'react';
import {
  ALL_130_TEACHER_TOOLS,
  TEACHER_LEARNING_MATERIALS,
  TEACHER_TOOL_CATEGORIES,
  type TeacherLearningGuide,
  type TeacherToolCategoryId,
  type TeacherToolDefinition,
} from '../../data/teacherTools/teacherToolsCatalog';
import {
  BookOpen,
  Calculator,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Copy,
  FileText,
  Filter,
  Layers,
  Play,
  Printer,
  RotateCcw,
  Search,
  Sparkles,
  Users,
  Wrench,
} from 'lucide-react';
import { ALL_10_CLASSES } from '../../data/classCurriculumConfig';
import { downloadTextAsPdf } from '../../utils/realFileExports';
import { UniversalPrintPreviewModal } from '../productivity/UniversalPrintPreviewModal';
import type { UniversalPdfDocument } from '../../utils/universalPdfPrintEngine';
import type { EducationBoard } from '../../types';

const TEACHER_SAVED_KEY = 'msz_teacher_tools_saved_v1';

interface SavedToolRecord {
  id: string;
  toolId: string;
  toolName: string;
  savedAt: string;
  summary: string;
  content: string;
}

function loadSavedOutputs(): SavedToolRecord[] {
  try {
    const raw = localStorage.getItem(TEACHER_SAVED_KEY);
    return raw ? (JSON.parse(raw) as SavedToolRecord[]) : [];
  } catch {
    return [];
  }
}

export const TeacherToolsWorkbench: React.FC<{
  board: EducationBoard;
  classLevel: string;
  onOpenLessonPlanner?: () => void;
}> = ({ board, classLevel, onOpenLessonPlanner }) => {
  const [subMode, setSubMode] = useState<'tools' | 'guides' | 'saved'>('tools');
  const [selectedCategory, setSelectedCategory] = useState<'all' | TeacherToolCategoryId>('all');
  const [selectedWave, setSelectedWave] = useState<number>(0); // 0 = All Waves
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTool, setActiveTool] = useState<TeacherToolDefinition>(ALL_130_TEACHER_TOOLS[0]);
  const [activeGuide, setActiveGuide] = useState<TeacherLearningGuide>(TEACHER_LEARNING_MATERIALS[0]);
  const [savedRecords, setSavedRecords] = useState<SavedToolRecord[]>(() => loadSavedOutputs());
  const [copyToast, setCopyToast] = useState<string | null>(null);
  const [printPreviewDoc, setPrintPreviewDoc] = useState<UniversalPdfDocument | null>(null);

  // Shared Dynamic Tool Workspace Inputs
  const [toolBoard, setToolBoard] = useState<EducationBoard>(board);
  const [toolClass, setToolClass] = useState<string>(classLevel || 'Class 5');
  const [toolSubject, setToolSubject] = useState<string>('Mathematics');
  const [toolTopic, setToolTopic] = useState<string>('Fractions & Applications');
  const [toolNotes, setToolNotes] = useState<string>('');

  // Engine-specific interactive state
  // 1) Question Paper / Blueprint builder
  const [qpTotalMarks, setQpTotalMarks] = useState<number>(40);
  const [qpEasyPct, setQpEasyPct] = useState<number>(40);
  const [qpMedPct, setQpMedPct] = useState<number>(40);

  // 2) Assessment / Marks calculator
  const [rawMarksText, setRawMarksText] = useState<string>('34, 28, 39, 19, 31, 25, 37, 14, 29, 36');
  const [maxMarksInput, setMaxMarksInput] = useState<number>(40);

  // 3) Roster / Attendance / Group Picker
  const [rosterNamesText, setRosterNamesText] = useState<string>(
    'Aarav Patil, Ananya Deshmukh, Kabir Joshi, Meera Kulkarni, Rohan Sharma, Sanya Verma, Vedant More, Diya Nair'
  );
  const [groupSize, setGroupSize] = useState<number>(3);
  const [pickedStudent, setPickedStudent] = useState<string | null>(null);

  // 4) Interactive Classroom Timer / Drills
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(120);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [teamScores, setTeamScores] = useState<[number, number, number, number]>([10, 15, 10, 20]);
  const [angleDeg, setAngleDeg] = useState<number>(60);
  const [mentalSeed, setMentalSeed] = useState<number>(1);

  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => {
      setTimerSecondsLeft((prev) => {
        if (prev <= 1) {
          setTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  const filteredTools = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return ALL_130_TEACHER_TOOLS.filter((tool) => {
      if (selectedCategory !== 'all' && tool.category !== selectedCategory) return false;
      if (selectedWave > 0 && tool.wave !== selectedWave) return false;
      if (q) {
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.shortDesc.toLowerCase().includes(q) ||
          tool.id.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedWave, searchQuery]);

  // Real calculated marks analytics
  const marksAnalytics = useMemo(() => {
    const nums = rawMarksText
      .split(/[,\s]+/)
      .map((s) => Number(s.trim()))
      .filter((n) => !Number.isNaN(n) && n >= 0);
    if (nums.length === 0) return null;
    const sorted = [...nums].sort((a, b) => a - b);
    const sum = nums.reduce((a, b) => a + b, 0);
    const avg = sum / nums.length;
    const median =
      sorted.length % 2 === 1
        ? sorted[(sorted.length - 1) / 2]
        : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
    const passThreshold = maxMarksInput * 0.35;
    const distinctionThreshold = maxMarksInput * 0.75;
    const passed = nums.filter((n) => n >= passThreshold).length;
    const distinctions = nums.filter((n) => n >= distinctionThreshold).length;
    return {
      count: nums.length,
      avg: avg.toFixed(1),
      avgPct: ((avg / (maxMarksInput || 1)) * 100).toFixed(1),
      median: median.toFixed(1),
      highest: sorted[sorted.length - 1],
      lowest: sorted[0],
      passRate: Math.round((passed / nums.length) * 100),
      distinctions,
    };
  }, [rawMarksText, maxMarksInput]);

  // Balanced Groups Generator
  const generatedGroups = useMemo(() => {
    const names = rosterNamesText
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const size = Math.max(2, Math.min(8, groupSize));
    const groups: string[][] = [];
    for (let i = 0; i < names.length; i += size) {
      groups.push(names.slice(i, i + size));
    }
    return { names, groups };
  }, [rosterNamesText, groupSize]);

  // Deterministic live generated output tailored to the active tool
  const generatedToolOutput = useMemo(() => {
    const t = activeTool;
    const header = `${t.id}: ${t.name}\nBoard: ${toolBoard} | Class: ${toolClass} | Subject: ${toolSubject} | Topic: ${toolTopic}\n--------------------------------------------------`;

    if (t.engine === 'lesson_builder') {
      return `${header}
1. Measurable Learning Objective (Bloom's Apply/Understand):
   Students will be able to explain core principles of "${toolTopic}" and solve 5 guided exercises accurately.
2. Concrete-Pictorial-Abstract (CRA) Teaching Plan (40 Mins):
   • 00–05 Min (Warm-Up Hook): Ask 2 recall questions from prior ${toolClass} basics.
   • 05–20 Min (Concept & Board Demonstration): Demonstrate ${toolTopic} using visual aids/examples.
   • 20–32 Min (Guided Pair Practice): Differentiated tasks — Foundation (3 items), Core (4 items), Challenge (2 HOTS).
   • 32–40 Min (Exit Ticket & Homework): 2-minute concept check + textbook practice assignment.
3. Teaching Aids / TLM: Chart, Marker, Textbook Reference, Manipulatives.
4. Teacher Custom Notes: ${toolNotes || t.sampleGuidance}`;
    }

    if (t.engine === 'question_paper') {
      const hardPct = Math.max(0, 100 - qpEasyPct - qpMedPct);
      const secA = Math.round(qpTotalMarks * 0.25);
      const secB = Math.round(qpTotalMarks * 0.45);
      const secC = qpTotalMarks - secA - secB;
      return `${header}
QUESTION PAPER BLUEPRINT (${qpTotalMarks} Marks)
• Difficulty Split: Easy ${qpEasyPct}% (${Math.round((qpTotalMarks * qpEasyPct) / 100)}M) | Medium ${qpMedPct}% (${Math.round((qpTotalMarks * qpMedPct) / 100)}M) | HOTS ${hardPct}% (${Math.round((qpTotalMarks * hardPct) / 100)}M)
• Section A — Objective / MCQ / Fill Blanks / True-False: ${secA} Marks (1M each)
• Section B — Short Answer / Give Reasons / Step-wise Sums: ${secB} Marks (2M–3M each)
• Section C — Long Answer / Word Problems / Proofs: ${secC} Marks (4M each)
SAMPLE ITEMS (${toolTopic}):
Q1. [1M] Identify the key rule/property in ${toolTopic}.
Q2. [2M] Differentiate or solve with step-wise working on ${toolTopic}.
Q3. [4M] Real-world application problem & complete explanation on ${toolTopic}.
Teacher Notes: ${toolNotes || t.sampleGuidance}`;
    }

    if (t.engine === 'assessment_calc') {
      const a = marksAnalytics;
      return `${header}
ASSESSMENT & EVALUATION SUMMARY (Max Marks: ${maxMarksInput})
• Total Scripts Evaluated: ${a?.count ?? 0}
• Class Mean: ${a?.avg ?? 0} / ${maxMarksInput} (${a?.avgPct ?? 0}%) | Median: ${a?.median ?? 0}
• Range: Lowest ${a?.lowest ?? 0} — Highest ${a?.highest ?? 0}
• Pass Rate (>=35%): ${a?.passRate ?? 0}% | Distinctions (>=75%): ${a?.distinctions ?? 0}
RUBRIC & FEEDBACK ACTION:
• >=75%: Ready for HOTS & Olympiad extension tasks.
• 45–74%: Reinforce step presentation & formula selection.
• <45%: Schedule 15-minute remedial clinic on ${toolTopic}.
Notes: ${toolNotes || t.sampleGuidance}`;
    }

    if (t.engine === 'roster_planner') {
      return `${header}
CLASSROOM ROSTER & GROUP PLAN
• Total Students Listed: ${generatedGroups.names.length}
• Formed Groups (${generatedGroups.groups.length} teams of ~${groupSize}):
${generatedGroups.groups.map((g, idx) => `  Team ${idx + 1}: ${g.join(', ')}`).join('\n')}
• Attendance / PTM Guidance: ${t.sampleGuidance}
${toolNotes ? `• Teacher Notes: ${toolNotes}` : ''}`;
    }

    if (t.engine === 'schedule_notice') {
      return `${header}
OFFICIAL SCHOOL SCHEDULE / CIRCULAR DRAFT
Ref: MSZ/${toolBoard.toUpperCase().slice(0, 3)}/${new Date().getFullYear()} | Class: ${toolClass}
Subject: ${t.name} — ${toolTopic}
--------------------------------------------------
Dear Faculty / Parents / Students,
1. Purpose: Smooth academic coordination for ${toolSubject} (${toolClass}).
2. Schedule / Action Block: Mon–Sat morning periods prioritised for core learning; lab/activity slots allocated without overlap.
3. Compliance Notes: ${toolNotes || t.sampleGuidance}
Issued by: Class Teacher / Academic Coordinator`;
    }

    if (t.engine === 'pedagogy_helper') {
      return `${header}
SMART PEDAGOGY & MULTILINGUAL BRIDGE (${toolTopic})
• Real-Life Hook / Analogy: Connect "${toolTopic}" to daily Indian contexts (shopping change, train timetables, cricket strike-rates, kitchen measurements).
• Predicted Misconception Alert: Learners often mix units or sign rules when rushing steps — emphasise writing "Given + Unit" first.
• Bloom Upgrade (Recall → HOTS): Instead of "State the definition", ask "What happens if one parameter doubles? Justify."
• Multilingual Bridge: English: "${toolTopic}" | Hindi: विषय अवधारणा | Marathi: मुख्य संकल्पना व नियम.
• Guided Adaptation: ${toolNotes || t.sampleGuidance}`;
    }

    if (t.engine === 'classroom_live') {
      const angleLabel =
        angleDeg === 90
          ? 'Right Angle (90°)'
          : angleDeg === 180
          ? 'Straight Angle (180°)'
          : angleDeg < 90
          ? `Acute Angle (${angleDeg}°)`
          : angleDeg < 180
          ? `Obtuse Angle (${angleDeg}°)`
          : `Reflex Angle (${angleDeg}°)`;
      return `${header}
LIVE CLASSROOM SESSION SUMMARY
• Active Angle Visualizer: ${angleLabel}
• Quiz Team Scores: Team A=${teamScores[0]} | Team B=${teamScores[1]} | Team C=${teamScores[2]} | Team D=${teamScores[3]}
• Recommended Drill: Run a 2-minute countdown Think-Pair-Share on "${toolTopic}".
${toolNotes ? `• Board Prompt: ${toolNotes}` : ''}`;
    }

    // productivity_calc fallback
    return `${header}
TEACHER PRODUCTIVITY & QUALITY LOG
• Checklist Verification:
  [✓] Aligned with ${toolBoard} ${toolClass} ${toolSubject} syllabus
  [✓] Answer key & units double-checked
  [✓] Accessible on mobile & classroom Smart TV display
• Action Item: ${toolNotes || t.sampleGuidance}`;
  }, [
    activeTool,
    toolBoard,
    toolClass,
    toolSubject,
    toolTopic,
    toolNotes,
    qpTotalMarks,
    qpEasyPct,
    qpMedPct,
    marksAnalytics,
    maxMarksInput,
    generatedGroups,
    groupSize,
    angleDeg,
    teamScores,
  ]);

  const handleSaveOutput = () => {
    const newRec: SavedToolRecord = {
      id: `SAVED-${Date.now()}`,
      toolId: activeTool.id,
      toolName: activeTool.name,
      savedAt: new Date().toLocaleString('en-IN'),
      summary: `${toolBoard} · ${toolClass} · ${toolSubject} · ${toolTopic}`,
      content: generatedToolOutput,
    };
    const updated = [newRec, ...savedRecords].slice(0, 40);
    setSavedRecords(updated);
    try {
      localStorage.setItem(TEACHER_SAVED_KEY, JSON.stringify(updated));
    } catch {
      // Ignore storage quota if full
    }
    setCopyToast('Saved to My Teacher Library!');
    setTimeout(() => setCopyToast(null), 2200);
  };

  const handleCopyOutput = async () => {
    try {
      await navigator.clipboard.writeText(generatedToolOutput);
      setCopyToast('Copied to clipboard!');
    } catch {
      setCopyToast('Ready to copy from preview box');
    }
    setTimeout(() => setCopyToast(null), 2000);
  };

  const mentalDrill = useMemo(() => {
    const a = ((mentalSeed * 7) % 19) + 6;
    const b = ((mentalSeed * 5) % 14) + 4;
    const ops = [
      { q: `${a} × ${b}`, ans: a * b },
      { q: `${a * 10} + ${b * 5}`, ans: a * 10 + b * 5 },
      { q: `${a}²`, ans: a * a },
      { q: `25% of ${b * 4}`, ans: b },
    ];
    return ops[mentalSeed % ops.length];
  }, [mentalSeed]);

  const mins = String(Math.floor(timerSecondsLeft / 60)).padStart(2, '0');
  const secs = String(timerSecondsLeft % 60).padStart(2, '0');

  return (
    <div className="space-y-6">
      {/* Top Sub-Navigation */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-emerald-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black uppercase tracking-wider">
              130 Teacher Tools Suite
            </span>
            <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
              8 Categories · Waves 1–6 Complete
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-display font-black text-slate-900 mt-1">
            Teacher Tools Workbench &amp; Pedagogical Resource Library
          </h2>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSubMode('tools')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              subMode === 'tools'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            All 130 Tools ({ALL_130_TEACHER_TOOLS.length})
          </button>
          <button
            type="button"
            onClick={() => setSubMode('guides')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              subMode === 'guides'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Teacher Guides &amp; Training ({TEACHER_LEARNING_MATERIALS.length})
          </button>
          <button
            type="button"
            onClick={() => setSubMode('saved')}
            className={`px-3.5 py-2 rounded-xl text-xs font-extrabold cursor-pointer transition-all ${
              subMode === 'saved'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Saved Outputs ({savedRecords.length})
          </button>
          {onOpenLessonPlanner && (
            <button
              type="button"
              onClick={onOpenLessonPlanner}
              className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
            >
              Open 3-Tab Lesson Planner →
            </button>
          )}
        </div>
      </div>

      {subMode === 'guides' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="lg:col-span-4 space-y-2.5">
            {TEACHER_LEARNING_MATERIALS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setActiveGuide(g)}
                className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeGuide.id === g.id
                    ? 'bg-indigo-50 border-indigo-400 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-indigo-200'
                }`}
              >
                <span className="text-[11px] font-black uppercase text-indigo-600">
                  {g.category} · {g.readTimeMinutes} min read
                </span>
                <p className="text-sm font-extrabold text-slate-900 mt-1">{g.title}</p>
              </button>
            ))}
          </div>
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-5">
            <div>
              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-black">
                {activeGuide.category}
              </span>
              <h3 className="text-xl font-display font-black text-slate-900 mt-2">
                {activeGuide.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">{activeGuide.summary}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
              <h4 className="text-xs font-black uppercase text-slate-700">Core Pedagogical Strategies</h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                {activeGuide.keyStrategies.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-2">
              <h4 className="text-xs font-black uppercase text-amber-800">Classroom Execution Steps</h4>
              <ol className="list-decimal list-inside space-y-1.5 text-xs sm:text-sm text-slate-800">
                {activeGuide.classroomSteps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <p className="text-xs font-bold text-indigo-700">
                Takeaway: {activeGuide.printableTakeaway}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setPrintPreviewDoc({
                      title: activeGuide.title,
                      subtitle: `Pedagogy Guide · ${activeGuide.category} · ${activeGuide.readTimeMinutes} min read`,
                      headerTag: 'PEDAGOGY GUIDE',
                      sections: [
                        { heading: 'Overview', body: activeGuide.summary },
                        {
                          heading: 'Core Pedagogical Strategies',
                          bullets: activeGuide.keyStrategies,
                        },
                        {
                          heading: 'Classroom Execution Steps',
                          bullets: activeGuide.classroomSteps.map((s, idx) => `${idx + 1}. ${s}`),
                        },
                        {
                          heading: 'Key Takeaway',
                          body: activeGuide.printableTakeaway,
                        },
                      ],
                      filename: `pedagogy_guide_${activeGuide.title.toLowerCase().replace(/[^a-z0-9]+/g, '_')}`,
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Preview &amp; Print / PDF (A4)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {subMode === 'saved' && (
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-display font-black text-slate-900">
              Saved Teacher Tool Outputs ({savedRecords.length})
            </h3>
          </div>
          {savedRecords.length === 0 ? (
            <p className="text-xs text-slate-500 py-8 text-center">
              Open any of the 130 Teacher Tools and click &ldquo;Save to Library&rdquo; to keep reusable lesson plans, question blueprints, circulars, and score reports here.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {savedRecords.map((rec) => (
                <div key={rec.id} className="rounded-2xl p-4 border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-black text-emerald-700">
                      {rec.toolId} · {rec.toolName}
                    </span>
                    <span className="text-[11px] text-slate-500">{rec.savedAt}</span>
                  </div>
                  <p className="text-[11px] font-bold text-slate-600">{rec.summary}</p>
                  <pre className="text-[11px] text-slate-700 whitespace-pre-wrap bg-white p-3 rounded-xl border border-slate-200 max-h-44 overflow-y-auto font-sans">
                    {rec.content}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {subMode === 'tools' && (
        <div className="space-y-5">
          {/* Category Pills & Wave/Search Filter */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search all 130 tools (e.g., Rubric, Timetable, MCQ, Seating, Bloom, Timer)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="md:col-span-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as 'all' | TeacherToolCategoryId)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                >
                  <option value="all">All 8 Categories (130 Tools)</option>
                  {TEACHER_TOOL_CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-3">
                <select
                  value={selectedWave}
                  onChange={(e) => setSelectedWave(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold bg-white"
                >
                  <option value={0}>All Release Waves (1–6)</option>
                  {[1, 2, 3, 4, 5, 6].map((w) => (
                    <option key={w} value={w}>
                      Wave {w}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                All (130)
              </button>
              {TEACHER_TOOL_CATEGORIES.map((cat) => {
                const count = ALL_130_TEACHER_TOOLS.filter((t) => t.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.shortLabel} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tool Selector List + Active Interactive Engine */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5 bg-white rounded-3xl p-4 border border-slate-200 shadow-sm">
              <p className="text-xs font-black uppercase text-slate-500 mb-3">
                Showing {filteredTools.length} of 130 Interactive Tools
              </p>
              <div className="space-y-2 max-h-[620px] overflow-y-auto pr-1">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => setActiveTool(tool)}
                    className={`w-full text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                      activeTool.id === tool.id
                        ? 'bg-emerald-50 border-emerald-400 shadow-sm'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {tool.id} · Wave {tool.wave}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500">
                        {TEACHER_TOOL_CATEGORIES.find((c) => c.id === tool.category)?.shortLabel}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 mt-1">
                      {tool.number}. {tool.name}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-0.5 line-clamp-2">{tool.shortDesc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Tool Interactive Workbench */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-5 sm:p-6 border border-emerald-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-black uppercase text-emerald-700">
                    {activeTool.id} · Wave {activeTool.wave} ·{' '}
                    {TEACHER_TOOL_CATEGORIES.find((c) => c.id === activeTool.category)?.label}
                  </span>
                  <h3 className="text-lg sm:text-xl font-display font-black text-slate-900 mt-0.5">
                    {activeTool.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-0.5">{activeTool.shortDesc}</p>
                </div>
              </div>

              {/* Common Context Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <select
                  value={toolBoard}
                  onChange={(e) => setToolBoard(e.target.value as EducationBoard)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                >
                  <option value="Maharashtra">Maharashtra Board</option>
                  <option value="CBSE">CBSE (NCERT)</option>
                  <option value="ICSE">ICSE (CISCE)</option>
                </select>
                <select
                  value={toolClass}
                  onChange={(e) => setToolClass(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                >
                  {ALL_10_CLASSES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={toolSubject}
                  onChange={(e) => setToolSubject(e.target.value)}
                  placeholder="Subject"
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <input
                  type="text"
                  value={toolTopic}
                  onChange={(e) => setToolTopic(e.target.value)}
                  placeholder="Chapter / Topic / Event Name"
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
                <input
                  type="text"
                  value={toolNotes}
                  onChange={(e) => setToolNotes(e.target.value)}
                  placeholder="Custom teacher remark or instruction (optional)"
                  className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium"
                />
              </div>

              {/* Engine-Specific Interactive Controls */}
              {activeTool.engine === 'question_paper' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-indigo-50/70 p-3 rounded-2xl border border-indigo-200">
                  <label className="text-[11px] font-bold text-slate-700 space-y-1 block">
                    <span>Total Marks</span>
                    <input
                      type="number"
                      min={10}
                      max={100}
                      value={qpTotalMarks}
                      onChange={(e) => setQpTotalMarks(Number(e.target.value) || 40)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-white text-xs font-bold"
                    />
                  </label>
                  <label className="text-[11px] font-bold text-slate-700 space-y-1 block">
                    <span>Easy %</span>
                    <input
                      type="number"
                      min={10}
                      max={80}
                      value={qpEasyPct}
                      onChange={(e) => setQpEasyPct(Number(e.target.value) || 40)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-white text-xs font-bold"
                    />
                  </label>
                  <label className="text-[11px] font-bold text-slate-700 space-y-1 block">
                    <span>Medium %</span>
                    <input
                      type="number"
                      min={10}
                      max={80}
                      value={qpMedPct}
                      onChange={(e) => setQpMedPct(Number(e.target.value) || 40)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-white text-xs font-bold"
                    />
                  </label>
                </div>
              )}

              {activeTool.engine === 'assessment_calc' && (
                <div className="space-y-2 bg-amber-50/70 p-3 rounded-2xl border border-amber-200">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Enter Student Marks (comma separated)
                      </label>
                      <input
                        type="text"
                        value={rawMarksText}
                        onChange={(e) => setRawMarksText(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-1">
                        Max Marks
                      </label>
                      <input
                        type="number"
                        min={5}
                        max={100}
                        value={maxMarksInput}
                        onChange={(e) => setMaxMarksInput(Number(e.target.value) || 40)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-amber-200 bg-white text-xs font-bold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {activeTool.engine === 'roster_planner' && (
                <div className="space-y-2 bg-sky-50/70 p-3 rounded-2xl border border-sky-200">
                  <label className="text-[11px] font-bold text-slate-700 block">
                    Student Roster Names (comma or newline separated)
                  </label>
                  <textarea
                    rows={2}
                    value={rosterNamesText}
                    onChange={(e) => setRosterNamesText(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-sky-200 bg-white text-xs font-medium"
                  />
                  <div className="flex flex-wrap items-center gap-2">
                    <label className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                      <span>Team Size:</span>
                      <input
                        type="number"
                        min={2}
                        max={8}
                        value={groupSize}
                        onChange={(e) => setGroupSize(Number(e.target.value) || 3)}
                        className="w-16 px-2 py-1 rounded-lg border border-sky-200 bg-white text-xs font-bold"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const list = generatedGroups.names;
                        if (list.length > 0) {
                          setPickedStudent(list[Math.floor(Math.random() * list.length)]);
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-sky-600 text-white text-xs font-extrabold cursor-pointer"
                    >
                      Pick Random Student
                    </button>
                    {pickedStudent && (
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-black">
                        Selected: {pickedStudent}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeTool.engine === 'classroom_live' && (
                <div className="space-y-3 bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-purple-700" />
                      <span className="text-2xl font-display font-black text-slate-900 tabular-nums">
                        {mins}:{secs}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => setTimerRunning((r) => !r)}
                        className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-extrabold cursor-pointer"
                      >
                        {timerRunning ? 'Pause' : 'Start Timer'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTimerRunning(false);
                          setTimerSecondsLeft(120);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-bold cursor-pointer"
                      >
                        Reset 2m
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setTimerRunning(false);
                          setTimerSecondsLeft(300);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white border border-purple-200 text-xs font-bold cursor-pointer"
                      >
                        5m
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(['Team A', 'Team B', 'Team C', 'Team D'] as const).map((label, idx) => (
                      <div key={label} className="bg-white rounded-xl p-2 border border-purple-200 text-center">
                        <p className="text-[11px] font-bold text-slate-600">{label}</p>
                        <p className="text-lg font-black text-purple-700">{teamScores[idx]}</p>
                        <div className="flex justify-center gap-1 mt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setTeamScores((prev) => {
                                const next = [...prev] as [number, number, number, number];
                                next[idx] += 5;
                                return next;
                              })
                            }
                            className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black cursor-pointer"
                          >
                            +5
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setTeamScores((prev) => {
                                const next = [...prev] as [number, number, number, number];
                                next[idx] = Math.max(0, next[idx] - 5);
                                return next;
                              })
                            }
                            className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-black cursor-pointer"
                          >
                            -5
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="bg-white rounded-xl p-2.5 border border-purple-200">
                      <div className="flex items-center justify-between text-[11px] font-bold">
                        <span>Angle Explorer: {angleDeg}°</span>
                        <input
                          type="range"
                          min={5}
                          max={355}
                          value={angleDeg}
                          onChange={(e) => setAngleDeg(Number(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-2.5 border border-purple-200 flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-800">
                        Mental Drill: {mentalDrill.q} = <span className="text-emerald-700">{mentalDrill.ans}</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setMentalSeed((s) => s + 1)}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold cursor-pointer"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Generated Live Output Preview */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-600">
                    Generated Ready-to-Use Teacher Output
                  </span>
                  {copyToast && (
                    <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {copyToast}
                    </span>
                  )}
                </div>
                <pre className="text-xs text-slate-800 whitespace-pre-wrap bg-slate-50 p-4 rounded-2xl border border-slate-200 font-sans leading-relaxed max-h-72 overflow-y-auto">
                  {generatedToolOutput}
                </pre>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleSaveOutput}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save to Library</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyOutput}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold cursor-pointer flex items-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Output</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    downloadTextAsPdf({
                      title: activeTool.name,
                      subtitle: `${toolBoard} · ${toolClass} · ${toolSubject}`,
                      sections: [{ heading: activeTool.name, body: generatedToolOutput }],
                      filename: `${activeTool.id.toLowerCase()}-${toolClass.toLowerCase().replace(/\s+/g, '-')}`,
                    });
                  }}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-extrabold cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setPrintPreviewDoc({
                      title: activeTool.name,
                      subtitle: `${toolBoard} · ${toolClass} · ${toolSubject}`,
                      headerTag: 'TEACHER TOOL',
                      metaItems: [
                        { label: 'Board', value: toolBoard },
                        { label: 'Class', value: toolClass },
                        { label: 'Subject', value: toolSubject },
                        { label: 'Topic', value: toolTopic || activeTool.name },
                      ],
                      sections: [{ heading: activeTool.name, body: generatedToolOutput }],
                      filename: `${activeTool.id.toLowerCase()}-${toolClass.toLowerCase().replace(/\s+/g, '-')}`,
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Preview &amp; Print (A4)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {printPreviewDoc && (
        <UniversalPrintPreviewModal
          document={printPreviewDoc}
          onClose={() => setPrintPreviewDoc(null)}
        />
      )}
    </div>
  );
};
