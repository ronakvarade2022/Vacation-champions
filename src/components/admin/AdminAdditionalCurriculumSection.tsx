import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CheckCircle2,
  Download,
  Eye,
  EyeOff,
  Layers,
  Plus,
  RotateCcw,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import type { ClassLevel, EducationBoard } from '../../types';
import type { InstructionMedium } from '../../types/lessonPlanner';
import {
  ADDITIONAL_CURRICULUM_LABEL,
  type AdditionalChapterRecord,
  type AdditionalContentWorkflowStatus,
  type AdditionalSubjectDefinition,
} from '../../types/additionalCurriculum';
import {
  ALL_ADDITIONAL_BOARDS,
  ALL_ADDITIONAL_CLASSES,
} from '../../data/additionalCurriculum/subjectsCatalog';
import {
  getAdditionalCurriculumCompletionStats,
  getAllAdditionalChapters,
  getAllAdditionalSubjects,
  resetAdditionalCurriculumAdminOverrides,
  setAdditionalChapterWorkflowStatus,
  upsertAdditionalChapter,
  upsertAdditionalSubject,
} from '../../services/additionalCurriculumService';
import {
  exportAdditionalCurriculumSnapshot,
  getAdditionalCurriculumStorageStatus,
  importAdditionalCurriculumSnapshot,
  subscribeAdditionalCurriculumChanges,
} from '../../services/additionalCurriculumPersistence';

type AdminSubTab = 'overview' | 'subjects' | 'chapters';

const ALL_MEDIUMS: InstructionMedium[] = ['English', 'Marathi', 'Hindi', 'Semi-English'];
const WORKFLOW_STATUSES: AdditionalContentWorkflowStatus[] = [
  'DRAFT',
  'UNDER_REVIEW',
  'APPROVED',
  'PUBLISHED',
  'UNPUBLISHED',
];

export const AdminAdditionalCurriculumSection: React.FC = () => {
  const [subTab, setSubTab] = useState<AdminSubTab>('overview');
  const [version, setVersion] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const importInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return subscribeAdditionalCurriculumChanges(() => {
      setVersion((v) => v + 1);
    });
  }, []);

  // Filters for Chapters tab
  const [filterSubjectId, setFilterSubjectId] = useState<string>('ALL');
  const [filterClass, setFilterClass] = useState<string>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // New Subject form state
  const [showAddSubjectForm, setShowAddSubjectForm] = useState(false);
  const [newSubjName, setNewSubjName] = useState('');
  const [newSubjCode, setNewSubjCode] = useState('');
  const [newSubjMr, setNewSubjMr] = useState('');
  const [newSubjHi, setNewSubjHi] = useState('');
  const [newSubjTagline, setNewSubjTagline] = useState('');

  // New Chapter form state
  const [showAddChapterForm, setShowAddChapterForm] = useState(false);
  const [newChSubjectId, setNewChSubjectId] = useState('ADD_GK');
  const [newChClass, setNewChClass] = useState<ClassLevel>('Class 5');
  const [newChTitle, setNewChTitle] = useState('');
  const [newChMrTitle, setNewChMrTitle] = useState('');
  const [newChHiTitle, setNewChHiTitle] = useState('');
  const [newChExplanation, setNewChExplanation] = useState('');
  const [newChObjective, setNewChObjective] = useState('');
  const [newChWorksheetPrompt, setNewChWorksheetPrompt] = useState('');
  const [newChWorksheetAnswer, setNewChWorksheetAnswer] = useState('');
  const [newChMcqQuestion, setNewChMcqQuestion] = useState('');
  const [newChMcqOptA, setNewChMcqOptA] = useState('');
  const [newChMcqOptB, setNewChMcqOptB] = useState('');
  const [newChMcqOptC, setNewChMcqOptC] = useState('');
  const [newChMcqOptD, setNewChMcqOptD] = useState('');
  const [newChMcqCorrect, setNewChMcqCorrect] = useState<0 | 1 | 2 | 3>(0);

  const stats = useMemo(() => {
    void version;
    return getAdditionalCurriculumCompletionStats();
  }, [version]);

  const allSubjects = useMemo(() => {
    void version;
    return getAllAdditionalSubjects({ includeUnpublished: true });
  }, [version]);

  const allChapters = useMemo(() => {
    void version;
    return getAllAdditionalChapters({ includeUnpublished: true });
  }, [version]);

  const filteredChapters = useMemo(() => {
    return allChapters.filter((ch) => {
      if (filterSubjectId !== 'ALL' && ch.subjectId !== filterSubjectId) return false;
      if (filterClass !== 'ALL' && ch.classLevel !== filterClass) return false;
      if (filterStatus !== 'ALL' && ch.workflowStatus !== filterStatus) return false;
      return true;
    });
  }, [allChapters, filterSubjectId, filterClass, filterStatus]);

  const subjectMatrix = useMemo(() => {
    const counts = new Map<string, { total: number; published: number }>();
    for (const ch of allChapters) {
      const key = `${ch.subjectId}::${ch.classNumber}`;
      const curr = counts.get(key) || { total: 0, published: 0 };
      curr.total += 1;
      if (ch.workflowStatus === 'PUBLISHED') curr.published += 1;
      counts.set(key, curr);
    }
    return counts;
  }, [allChapters]);

  const storageStatus = useMemo(() => {
    void version;
    return getAdditionalCurriculumStorageStatus();
  }, [version]);

  const bump = (msg: string) => {
    setVersion((v) => v + 1);
    setFeedback(msg);
  };

  const handleExportBackup = () => {
    const snapshot = exportAdditionalCurriculumSnapshot();
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mystudyzone-additional-curriculum-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    setFeedback(
      `Exported CMS backup JSON (${Object.keys(snapshot.adminOverlay.subjectOverrides).length} subject override(s), ${Object.keys(snapshot.adminOverlay.chapterOverrides).length} chapter draft/override(s), ${snapshot.teacherAssignments.length} teacher assignment(s)).`
    );
  };

  const handleImportFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = importAdditionalCurriculumSnapshot(String(reader.result || ''));
      if (result.success) {
        bump(result.message);
      } else {
        setFeedback(result.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleToggleSubjectPublished = (subj: AdditionalSubjectDefinition) => {
    upsertAdditionalSubject({ ...subj, isPublished: !subj.isPublished });
    bump(`${subj.name} is now ${!subj.isPublished ? 'Published' : 'Unpublished'}.`);
  };

  const handleToggleSubjectMedium = (
    subj: AdditionalSubjectDefinition,
    medium: InstructionMedium
  ) => {
    const exists = subj.applicableMediums.includes(medium);
    const nextMediums = exists
      ? subj.applicableMediums.filter((m) => m !== medium)
      : [...subj.applicableMediums, medium];
    if (nextMediums.length === 0) return;
    upsertAdditionalSubject({ ...subj, applicableMediums: nextMediums });
    bump(`Updated mediums for ${subj.name}.`);
  };

  const handleToggleSubjectBoard = (
    subj: AdditionalSubjectDefinition,
    board: EducationBoard
  ) => {
    const exists = subj.applicableBoards.includes(board);
    const nextBoards = exists
      ? subj.applicableBoards.filter((b) => b !== board)
      : [...subj.applicableBoards, board];
    if (nextBoards.length === 0) return;
    upsertAdditionalSubject({ ...subj, applicableBoards: nextBoards });
    bump(`Updated boards for ${subj.name}.`);
  };

  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newSubjName.trim();
    if (!cleanName) return;
    const cleanCode = (newSubjCode.trim() || cleanName.slice(0, 3)).toUpperCase();
    const id = `ADD_CUSTOM_${cleanCode}_${Date.now().toString(36).toUpperCase()}`;

    upsertAdditionalSubject({
      id,
      code: cleanCode,
      name: cleanName,
      localizedNames: {
        English: cleanName,
        Marathi: newSubjMr.trim() || cleanName,
        Hindi: newSubjHi.trim() || cleanName,
      },
      tagline: newSubjTagline.trim() || 'Supplementary Enrichment Track',
      description: `${cleanName} — original supplementary enrichment subject under ${ADDITIONAL_CURRICULUM_LABEL}.`,
      applicableBoards: [...ALL_ADDITIONAL_BOARDS],
      applicableMediums: [...ALL_MEDIUMS],
      classesCovered: [...ALL_ADDITIONAL_CLASSES],
      accentColor: 'indigo',
      isPublished: true,
      isCustom: true,
    });

    setNewSubjName('');
    setNewSubjCode('');
    setNewSubjMr('');
    setNewSubjHi('');
    setNewSubjTagline('');
    setShowAddSubjectForm(false);
    bump(`Added new supplementary subject "${cleanName}".`);
  };

  const handleAddChapter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChTitle.trim() || !newChExplanation.trim()) return;
    const classNum = Number(newChClass.replace('Class ', '')) || 5;
    const existingForClass = allChapters.filter(
      (c) => c.subjectId === newChSubjectId && c.classNumber === classNum
    );
    const nextChapterNum = existingForClass.length + 1;
    const chapterId = `MSZ-ADD-${newChSubjectId}-C${classNum}-CH${nextChapterNum}-CUSTOM-${Date.now().toString(36).toUpperCase()}`;

    const newRecord: AdditionalChapterRecord = {
      chapterId,
      subjectId: newChSubjectId,
      classLevel: newChClass,
      classNumber: classNum,
      chapterNumber: nextChapterNum,
      title: newChTitle.trim(),
      localizedTitles: {
        English: newChTitle.trim(),
        Marathi: newChMrTitle.trim() || newChTitle.trim(),
        Hindi: newChHiTitle.trim() || newChTitle.trim(),
      },
      applicableBoards: [...ALL_ADDITIONAL_BOARDS],
      applicableMediums: [...ALL_MEDIUMS],
      curriculumLabel: ADDITIONAL_CURRICULUM_LABEL,
      workflowStatus: 'DRAFT',
      reviewedBy: 'Pending Admin Review',
      updatedAt: new Date().toISOString().slice(0, 10),
      learningObjectives: [
        newChObjective.trim() || `Understand the core concepts of ${newChTitle.trim()}.`,
      ],
      materials: {
        simpleExplanation: newChExplanation.trim(),
        keyTakeaways: [
          newChObjective.trim() || `Apply ${newChTitle.trim()} accurately in daily learning.`,
        ],
        workedExamples: [
          {
            title: 'Guided Example',
            detail: `Walk through one practical application of ${newChTitle.trim()} step by step.`,
          },
        ],
        handsOnActivity: {
          title: `${newChTitle.trim()} Practical Activity`,
          materialsNeeded: ['Notebook', 'Pencil'],
          steps: [
            'Discuss the chapter concept in pairs.',
            'Write one original real-life example and share with the class.',
          ],
        },
        practiceWorksheet: {
          worksheetId: `${chapterId}-WORKSHEET`,
          title: `${newChTitle.trim()} — Practice Worksheet (${newChClass})`,
          estimatedMinutes: 15,
          instructions: 'Complete the prompt clearly and check your response against the Answer Key.',
          items: [
            {
              id: `${chapterId}-WS-1`,
              type: 'application',
              prompt:
                newChWorksheetPrompt.trim() ||
                `Explain the key concept of "${newChTitle.trim()}" in two sentences.`,
              answer:
                newChWorksheetAnswer.trim() ||
                newChExplanation.trim().slice(0, 140),
            },
          ],
        },
        mcqQuiz: [
          {
            id: `${chapterId}-MCQ-1`,
            question:
              newChMcqQuestion.trim() ||
              `Which option best describes "${newChTitle.trim()}"?`,
            options: [
              newChMcqOptA.trim() || 'Core accurate definition',
              newChMcqOptB.trim() || 'Unrelated concept',
              newChMcqOptC.trim() || 'Opposite statement',
              newChMcqOptD.trim() || 'None of the above',
            ],
            correctIndex: newChMcqCorrect,
            explanation: `Matches the verified core concept of ${newChTitle.trim()}.`,
            difficulty: 'medium',
          },
        ],
        shortAnswerQuestions: [
          {
            id: `${chapterId}-SA-1`,
            question: `Summarize "${newChTitle.trim()}" in your own words.`,
            modelAnswer: newChExplanation.trim(),
            marks: 2,
          },
        ],
        revisionExercises: [
          `Review key concepts of "${newChTitle.trim()}" and test yourself without notes.`,
        ],
        teacherGuidance: {
          suggestedPeriods: 2,
          classroomStrategy: 'Introduce with a quick relatable example, then guide worksheet practice.',
          differentiationTip: 'Offer visual scaffolds for early learners and extension questions for fast finishers.',
          assessmentCue: 'Check conceptual clarity through the MCQ and short-answer reflection.',
        },
      },
      isCustom: true,
    };

    upsertAdditionalChapter(newRecord);
    setNewChTitle('');
    setNewChMrTitle('');
    setNewChHiTitle('');
    setNewChExplanation('');
    setNewChObjective('');
    setNewChWorksheetPrompt('');
    setNewChWorksheetAnswer('');
    setNewChMcqQuestion('');
    setNewChMcqOptA('');
    setNewChMcqOptB('');
    setNewChMcqOptC('');
    setNewChMcqOptD('');
    setShowAddChapterForm(false);
    setFilterSubjectId(newChSubjectId);
    setFilterClass(newChClass);
    setFilterStatus('ALL');
    bump(`Created draft chapter "${newRecord.title}" (${newChClass}). Use Review -> Approve -> Publish to activate.`);
  };

  const handleWorkflowChange = (
    chapter: AdditionalChapterRecord,
    nextStatus: AdditionalContentWorkflowStatus
  ) => {
    setAdditionalChapterWorkflowStatus(chapter.chapterId, nextStatus);
    bump(`Chapter "${chapter.title}" status updated to ${nextStatus}.`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-700">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{ADDITIONAL_CURRICULUM_LABEL} · Admin CMS</span>
            </div>
            <h2 className="mt-1 text-xl font-bold text-slate-900">
              Supplementary Curriculum Management &amp; Publishing Workflow
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Manage supplementary subjects, class-wise chapters (Classes 1–10), language mediums, and Review → Approve → Publish controls. Official board syllabus records remain 100% isolated and read-only here.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              onChange={handleImportFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={handleExportBackup}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 text-xs font-semibold text-indigo-800 hover:bg-indigo-100 whitespace-nowrap cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CMS Backup</span>
            </button>
            <button
              type="button"
              onClick={() => importInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Import Backup</span>
            </button>
            <button
              type="button"
              onClick={() => {
                resetAdditionalCurriculumAdminOverrides();
                bump('Restored default Additional Curriculum catalog & publication states.');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Custom Overrides
            </button>
          </div>
        </div>

        {/* Isolated Persistence Status Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 tabular-nums">
          <span>
            Persistence: <strong className="text-slate-900">Isolated Local + Real-Time Cross-Tab Sync</strong>
            {' · '}
            {storageStatus.customSubjectsCount} subject override(s) · {storageStatus.customChaptersCount} chapter draft(s) · {storageStatus.teacherAssignmentsCount} teacher assignment(s)
          </span>
          <span className="text-slate-500">
            Cloud Firestore sync staged (awaiting additive rules approval · zero impact on live collections)
          </span>
        </div>

        {/* Sub-tab navigation */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap gap-2">
          {(
            [
              { id: 'overview', label: 'Completion & Matrix' },
              { id: 'subjects', label: `Subjects & Mediums (${stats.totalSubjects})` },
              { id: 'chapters', label: `Chapters & Workflow (${stats.totalChapters})` },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setSubTab(t.id)}
              className={`px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0 transition-colors ${
                subTab === t.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {feedback && (
          <div className="mt-3 text-xs font-medium text-emerald-700">
            ✓ {feedback}
          </div>
        )}
      </div>

      {/* Sub-tab 1: Completion Overview & 10x10 Matrix */}
      {subTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: 'Subjects', value: `${stats.publishedSubjects}/${stats.totalSubjects}` },
              { label: 'Classes Covered', value: `${stats.classesCoveredCount}/10` },
              { label: 'Published Chapters', value: `${stats.publishedChapters}/${stats.totalChapters}` },
              { label: 'Practice Worksheets', value: `${stats.totalWorksheets}` },
              { label: 'MCQ Questions', value: `${stats.totalMcqQuestions}` },
              { label: 'Short Answers', value: `${stats.totalShortAnswerQuestions}` },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="text-xs font-medium text-slate-500">{kpi.label}</div>
                <div className="mt-1 text-2xl font-bold text-slate-900 tabular-nums">{kpi.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">
                Subject × Class Completion Matrix (Published / Total Chapters)
              </h3>
              <span className="text-xs text-slate-500">Classes 1–10</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Additional Subject</th>
                    {Array.from({ length: 10 }, (_, i) => i + 1).map((cls) => (
                      <th key={cls} className="py-2.5 px-2 text-center font-semibold tabular-nums">
                        C{cls}
                      </th>
                    ))}
                    <th className="py-2.5 px-3 text-right font-semibold">MCQs</th>
                    <th className="py-2.5 px-3 text-right font-semibold">WS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allSubjects.map((subj) => {
                    const rowStats = stats.bySubject[subj.id];
                    return (
                      <tr key={subj.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-4 font-semibold text-slate-900 whitespace-nowrap">
                          {subj.name}
                          {!subj.isPublished && (
                            <span className="ml-2 text-rose-600 font-normal">(Unpublished)</span>
                          )}
                        </td>
                        {Array.from({ length: 10 }, (_, i) => i + 1).map((cls) => {
                          const cell = subjectMatrix.get(`${subj.id}::${cls}`) || {
                            total: 0,
                            published: 0,
                          };
                          return (
                            <td
                              key={cls}
                              className={`py-2.5 px-2 text-center tabular-nums font-medium ${
                                cell.published > 0
                                  ? 'text-emerald-700'
                                  : cell.total > 0
                                    ? 'text-amber-700'
                                    : 'text-slate-300'
                              }`}
                            >
                              {cell.published}/{cell.total}
                            </td>
                          );
                        })}
                        <td className="py-2.5 px-3 text-right tabular-nums text-slate-700">
                          {rowStats?.mcqCount || 0}
                        </td>
                        <td className="py-2.5 px-3 text-right tabular-nums text-slate-700">
                          {rowStats?.worksheetCount || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sub-tab 2: Subjects & Mediums Manager */}
      {subTab === 'subjects' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              Manage Supplementary Subjects, Boards &amp; Languages
            </h3>
            <button
              type="button"
              onClick={() => setShowAddSubjectForm((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Additional Subject
            </button>
          </div>

          {showAddSubjectForm && (
            <form
              onSubmit={handleAddSubject}
              className="bg-white border border-indigo-200 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            >
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Subject Name (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newSubjName}
                  onChange={(e) => setNewSubjName(e.target.value)}
                  placeholder="e.g., Vedic Mathematics"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Short Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={newSubjCode}
                  onChange={(e) => setNewSubjCode(e.target.value)}
                  placeholder="e.g., VM"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Marathi Title
                </label>
                <input
                  type="text"
                  value={newSubjMr}
                  onChange={(e) => setNewSubjMr(e.target.value)}
                  placeholder="मराठी नाव"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Hindi Title
                </label>
                <input
                  type="text"
                  value={newSubjHi}
                  onChange={(e) => setNewSubjHi(e.target.value)}
                  placeholder="हिंदी नाम"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={newSubjTagline}
                  onChange={(e) => setNewSubjTagline(e.target.value)}
                  placeholder="Short focus description"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectForm(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  Save Subject
                </button>
              </div>
            </form>
          )}

          <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
            {allSubjects.map((subj) => (
              <div key={subj.id} className="p-4 flex flex-col gap-3">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-bold text-slate-900">
                      {subj.name}{' '}
                      <span className="font-mono text-xs text-slate-400 ml-1">({subj.code})</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Marathi: {subj.localizedNames.Marathi} · Hindi: {subj.localizedNames.Hindi}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleSubjectPublished(subj)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap shrink-0 ${
                      subj.isPublished
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {subj.isPublished ? (
                      <>
                        <Eye className="w-3.5 h-3.5" /> Published
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3.5 h-3.5" /> Unpublished
                      </>
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-slate-500 mr-1">Boards:</span>
                    {ALL_ADDITIONAL_BOARDS.map((b) => {
                      const active = subj.applicableBoards.includes(b);
                      return (
                        <button
                          key={b}
                          type="button"
                          onClick={() => handleToggleSubjectBoard(subj, b)}
                          className={`px-2 py-1 rounded border text-xs font-medium ${
                            active
                              ? 'bg-indigo-50 border-indigo-300 text-indigo-800'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}
                        >
                          {b}
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-semibold text-slate-500 mr-1">Mediums:</span>
                    {ALL_MEDIUMS.map((m) => {
                      const active = subj.applicableMediums.includes(m);
                      return (
                        <button
                          key={m}
                          type="button"
                          onClick={() => handleToggleSubjectMedium(subj, m)}
                          className={`px-2 py-1 rounded border text-xs font-medium ${
                            active
                              ? 'bg-slate-900 border-slate-900 text-white'
                              : 'bg-white border-slate-200 text-slate-400'
                          }`}
                        >
                          {m}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sub-tab 3: Chapters & Review/Approve/Publish Workflow */}
      {subTab === 'chapters' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-end justify-between gap-3">
            <div className="flex flex-wrap gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Subject</label>
                <select
                  value={filterSubjectId}
                  onChange={(e) => setFilterSubjectId(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium"
                >
                  <option value="ALL">All Subjects ({allSubjects.length})</option>
                  {allSubjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Class</label>
                <select
                  value={filterClass}
                  onChange={(e) => setFilterClass(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium"
                >
                  <option value="ALL">All Classes (1–10)</option>
                  {ALL_ADDITIONAL_CLASSES.map((cls) => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-medium"
                >
                  <option value="ALL">All Statuses</option>
                  {WORKFLOW_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowAddChapterForm((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 whitespace-nowrap shrink-0"
            >
              <Plus className="w-4 h-4" />
              Add Class-Wise Chapter
            </button>
          </div>

          {showAddChapterForm && (
            <form
              onSubmit={handleAddChapter}
              className="bg-white border border-indigo-200 rounded-xl p-5 space-y-4"
            >
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>Add New Supplementary Chapter (Created in DRAFT for Review Workflow)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Subject</label>
                  <select
                    value={newChSubjectId}
                    onChange={(e) => setNewChSubjectId(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    {allSubjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Class</label>
                  <select
                    value={newChClass}
                    onChange={(e) => setNewChClass(e.target.value as ClassLevel)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    {ALL_ADDITIONAL_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Chapter Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={newChTitle}
                    onChange={(e) => setNewChTitle(e.target.value)}
                    placeholder="e.g., Space Exploration Milestones"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Marathi Title
                  </label>
                  <input
                    type="text"
                    value={newChMrTitle}
                    onChange={(e) => setNewChMrTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Hindi Title
                  </label>
                  <input
                    type="text"
                    value={newChHiTitle}
                    onChange={(e) => setNewChHiTitle(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Primary Learning Objective
                  </label>
                  <input
                    type="text"
                    value={newChObjective}
                    onChange={(e) => setNewChObjective(e.target.value)}
                    placeholder="What learners will master"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Simple Concept Explanation *
                </label>
                <textarea
                  required
                  rows={2}
                  value={newChExplanation}
                  onChange={(e) => setNewChExplanation(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Worksheet Task Prompt
                  </label>
                  <input
                    type="text"
                    value={newChWorksheetPrompt}
                    onChange={(e) => setNewChWorksheetPrompt(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    Worksheet Answer Key
                  </label>
                  <input
                    type="text"
                    value={newChWorksheetAnswer}
                    onChange={(e) => setNewChWorksheetAnswer(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
                <div className="sm:col-span-2 lg:col-span-5">
                  <label className="block text-xs font-medium text-slate-600 mb-1">
                    4-Option MCQ Question
                  </label>
                  <input
                    type="text"
                    value={newChMcqQuestion}
                    onChange={(e) => setNewChMcqQuestion(e.target.value)}
                    placeholder="Enter question stem"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>
                <input
                  type="text"
                  value={newChMcqOptA}
                  onChange={(e) => setNewChMcqOptA(e.target.value)}
                  placeholder="Option A"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  value={newChMcqOptB}
                  onChange={(e) => setNewChMcqOptB(e.target.value)}
                  placeholder="Option B"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  value={newChMcqOptC}
                  onChange={(e) => setNewChMcqOptC(e.target.value)}
                  placeholder="Option C"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
                <input
                  type="text"
                  value={newChMcqOptD}
                  onChange={(e) => setNewChMcqOptD(e.target.value)}
                  placeholder="Option D"
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                />
                <select
                  value={newChMcqCorrect}
                  onChange={(e) => setNewChMcqCorrect(Number(e.target.value) as 0 | 1 | 2 | 3)}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs"
                >
                  <option value={0}>Correct: A</option>
                  <option value={1}>Correct: B</option>
                  <option value={2}>Correct: C</option>
                  <option value={3}>Correct: D</option>
                </select>
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddChapterForm(false)}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800"
                >
                  Create Draft Chapter
                </button>
              </div>
            </form>
          )}

          {/* Filtered Chapters Table */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600">
              <span className="font-semibold">
                Showing {filteredChapters.length} of {allChapters.length} supplementary chapters
              </span>
              <span>Workflow: DRAFT → UNDER_REVIEW → APPROVED → PUBLISHED</span>
            </div>
            <div className="divide-y divide-slate-100 max-h-[520px] overflow-y-auto">
              {filteredChapters.map((ch) => {
                const subjName =
                  allSubjects.find((s) => s.id === ch.subjectId)?.name || ch.subjectId;
                return (
                  <div
                    key={ch.chapterId}
                    className="px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-sm hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900">
                        {ch.classLevel} · Ch.{ch.chapterNumber}: {ch.title}
                      </div>
                      <div className="text-xs text-slate-500 tabular-nums mt-0.5">
                        {subjName} · {ch.materials.mcqQuiz.length} MCQs ·{' '}
                        {ch.materials.practiceWorksheet.items.length} WS tasks ·{' '}
                        {ch.materials.shortAnswerQuestions.length} Short Qs · Status:{' '}
                        <strong
                          className={
                            ch.workflowStatus === 'PUBLISHED'
                              ? 'text-emerald-700'
                              : ch.workflowStatus === 'UNPUBLISHED'
                                ? 'text-rose-700'
                                : 'text-amber-700'
                          }
                        >
                          {ch.workflowStatus}
                        </strong>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                      {ch.workflowStatus === 'DRAFT' && (
                        <button
                          type="button"
                          onClick={() => handleWorkflowChange(ch, 'UNDER_REVIEW')}
                          className="px-2.5 py-1 rounded-md border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100"
                        >
                          Submit Review
                        </button>
                      )}
                      {(ch.workflowStatus === 'DRAFT' || ch.workflowStatus === 'UNDER_REVIEW') && (
                        <button
                          type="button"
                          onClick={() => handleWorkflowChange(ch, 'APPROVED')}
                          className="px-2.5 py-1 rounded-md border border-indigo-300 bg-indigo-50 text-xs font-semibold text-indigo-800 hover:bg-indigo-100"
                        >
                          Approve
                        </button>
                      )}
                      {ch.workflowStatus !== 'PUBLISHED' ? (
                        <button
                          type="button"
                          onClick={() => handleWorkflowChange(ch, 'PUBLISHED')}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Publish
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleWorkflowChange(ch, 'UNPUBLISHED')}
                          className="px-2.5 py-1 rounded-md border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                        >
                          Unpublish
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAdditionalCurriculumSection;
