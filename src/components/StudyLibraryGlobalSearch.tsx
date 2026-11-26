import React, { useMemo, useState } from 'react';
import {
  Search,
  X,
  BookOpen,
  Library,
  Calculator,
  FlaskConical,
  Languages,
  Trophy,
  ArrowRight,
  FileText,
  PlayCircle,
  FileSpreadsheet,
  CheckSquare,
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { ALL_10_CLASSES, getSubjectsForClass } from '../data/classCurriculumConfig';
import { isVerifiedSyllabusPipelineEnabled } from '../data/verifiedSyllabus/syllabusFeatureFlags';
import { getOfficialTextbooksForBoardClass } from '../data/studyLibrary/textbookLibraryData';
import { getRichChaptersForSubject } from '../data/worksheets/builders/chapterCatalog';
import { resolveInlineAdditionalCurriculumFallback } from '../services/additionalCurriculumService';
import {
  ENGLISH_GRAMMAR_MODULES,
  MATH_FORMULA_TOPICS,
  SCHOLARSHIP_OLYMPIAD_TRACKS,
  SCIENCE_DIAGRAMS_LIST,
} from '../data/studyLibrary/specialAcademicHubsData';

export type GlobalSearchTargetTab =
  | 'textbooks'
  | 'chapter_notes'
  | 'textbook_solutions'
  | 'short_revision'
  | 'qa_bank'
  | 'worksheets_ref'
  | 'chapter_test'
  | 'model_papers'
  | 'pyq_papers'
  | 'video_lessons'
  | 'math_hub'
  | 'science_diagrams'
  | 'english_grammar'
  | 'scholarship_olympiad';

export interface GlobalSearchJumpTarget {
  board?: EducationBoard;
  classLevel?: ClassLevel;
  subject?: SubjectName;
  chapterNumber?: number;
  tab: GlobalSearchTargetTab;
}

interface SearchIndexEntry {
  id: string;
  kind:
    | 'chapter'
    | 'solutions'
    | 'textbook'
    | 'exam_paper'
    | 'video_lesson'
    | 'worksheet'
    | 'math'
    | 'science_diagram'
    | 'grammar'
    | 'scholarship';
  title: string;
  subtitle: string;
  searchBlob: string;
  board?: EducationBoard;
  classLevel?: ClassLevel;
  subject?: SubjectName;
  chapterNumber?: number;
  targetTab: GlobalSearchTargetTab;
}

interface StudyLibraryGlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBoard: EducationBoard;
  defaultClass: ClassLevel;
  onJumpToResult: (target: GlobalSearchJumpTarget) => void;
}

const BOARDS: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];

let cachedGlobalIndex: { key: string; entries: SearchIndexEntry[] } | null = null;
const cachedScopedIndexes = new Map<string, SearchIndexEntry[]>();

function buildStudyLibraryEntriesForScope(params: {
  boards: EducationBoard[];
  classes: ClassLevel[];
  includeSpecialHubs: boolean;
}): SearchIndexEntry[] {
  const entries: SearchIndexEntry[] = [];

  for (const board of params.boards) {
    for (const classLevel of params.classes) {
      const textbooks = getOfficialTextbooksForBoardClass(board, classLevel);
      for (const tb of textbooks) {
        entries.push({
          id: `tb_${tb.id}`,
          kind: 'textbook',
          title: tb.bookTitle,
          subtitle: `${board} · ${classLevel} · ${tb.subject} · ${tb.publisher}`,
          searchBlob: `${tb.bookTitle} ${tb.subject} ${tb.publisher} ${tb.syllabusCode} ${board} ${classLevel} textbook`.toLowerCase(),
          board,
          classLevel,
          subject: tb.subject,
          targetTab: 'textbooks',
        });
      }

      const subjects = getSubjectsForClass(classLevel, board);
      for (const subject of subjects) {
        const chapterTitles = getRichChaptersForSubject(board, classLevel, subject);
        if (chapterTitles.length > 0) {
          chapterTitles.forEach((rawTitle, idx) => {
            const chNum = idx + 1;
            entries.push({
              id: `ch_${board}_${classLevel}_${subject}_${chNum}`,
              kind: 'chapter',
              title: `Ch ${chNum}: ${rawTitle}`,
              subtitle: `${board} · ${classLevel} · ${subject} · Chapter Notes, Revision, Q&A & Test`,
              searchBlob: `${rawTitle} ${subject} ${board} ${classLevel} chapter ${chNum} notes revision`.toLowerCase(),
              board,
              classLevel,
              subject,
              chapterNumber: chNum,
              targetTab: 'chapter_notes',
            });
            entries.push({
              id: `sol_${board}_${classLevel}_${subject}_${chNum}`,
              kind: 'solutions',
              title: `Exercise Solutions — Ch ${chNum}: ${rawTitle}`,
              subtitle: `${board} · ${classLevel} · ${subject} · Complete Textbook Exercise Solutions`,
              searchBlob: `${rawTitle} ${subject} ${board} ${classLevel} chapter ${chNum} solution answers exercise textbook`.toLowerCase(),
              board,
              classLevel,
              subject,
              chapterNumber: chNum,
              targetTab: 'textbook_solutions',
            });
            entries.push({
              id: `vid_${board}_${classLevel}_${subject}_${chNum}`,
              kind: 'video_lesson',
              title: `Video Lesson — Ch ${chNum}: ${rawTitle}`,
              subtitle: `${board} · ${classLevel} · ${subject} · Structured Video Lesson`,
              searchBlob: `${rawTitle} ${subject} ${board} ${classLevel} chapter ${chNum} video lecture diksha`.toLowerCase(),
              board,
              classLevel,
              subject,
              chapterNumber: chNum,
              targetTab: 'video_lessons',
            });
          });
          entries.push({
            id: `mp_${board}_${classLevel}_${subject}`,
            kind: 'exam_paper',
            title: `${subject} Model Question Papers (${board} ${classLevel})`,
            subtitle: `${board} · ${classLevel} · 3 Board Blueprint Model Papers + Solutions`,
            searchBlob: `${subject} ${board} ${classLevel} model paper question paper sample blueprint`.toLowerCase(),
            board,
            classLevel,
            subject,
            targetTab: 'model_papers',
          });
          entries.push({
            id: `pyq_${board}_${classLevel}_${subject}`,
            kind: 'exam_paper',
            title: `${subject} Previous Year Question Papers (PYQ Archive)`,
            subtitle: `${board} · ${classLevel} · Solved PYQ Archive (2022–2025)`,
            searchBlob: `${subject} ${board} ${classLevel} previous year pyq question paper solved archive`.toLowerCase(),
            board,
            classLevel,
            subject,
            targetTab: 'pyq_papers',
          });
          entries.push({
            id: `ws_${board}_${classLevel}_${subject}`,
            kind: 'worksheet',
            title: `${subject} Chapter Practice Worksheets (${board} ${classLevel})`,
            subtitle: `${board} · ${classLevel} · ${subject} · Auto-Graded Worksheets`,
            searchBlob: `${subject} ${board} ${classLevel} worksheet practice exercise`.toLowerCase(),
            board,
            classLevel,
            subject,
            targetTab: 'worksheets_ref',
          });
        } else {
          const inlineAdditional = resolveInlineAdditionalCurriculumFallback({
            board,
            classLevel,
            subject,
            medium: 'English',
          });
          if (inlineAdditional) {
            inlineAdditional.chapters.forEach((ch) => {
              entries.push({
                id: `addch_${board}_${classLevel}_${subject}_${ch.chapterId}`,
                kind: 'chapter',
                title: `Ch ${ch.chapterNumber}: ${ch.title}`,
                subtitle: `${board} · ${classLevel} · ${subject} · Supplementary Notes, Worksheet & Quiz`,
                searchBlob: `${ch.title} ${ch.localizedTitles.Marathi} ${ch.localizedTitles.Hindi} ${subject} ${board} ${classLevel} chapter ${ch.chapterNumber}`.toLowerCase(),
                board,
                classLevel,
                subject,
                chapterNumber: ch.chapterNumber,
                targetTab: 'chapter_notes',
              });
            });
          }
        }
      }
    }
  }

  // 2. Special Hubs (included when building default or global index)
  if (params.includeSpecialHubs) {
    for (const topic of MATH_FORMULA_TOPICS) {
      const formulaNames = topic.formulas.map((f) => `${f.name} ${f.formula}`).join(' ');
      entries.push({
        id: `math_${topic.id}`,
        kind: 'math',
        title: topic.title,
        subtitle: `Mathematics Formula Hub · ${topic.stage} · ${topic.formulas.length} Formulas`,
        searchBlob: `${topic.title} ${topic.stage} ${formulaNames} math formula theorem`.toLowerCase(),
        targetTab: 'math_hub',
      });
    }

    for (const diag of SCIENCE_DIAGRAMS_LIST) {
      const partsBlob = diag.keyParts.map((p) => `${p.label} ${p.functionText}`).join(' ');
      entries.push({
        id: `diag_${diag.id}`,
        kind: 'science_diagram',
        title: diag.title,
        subtitle: `Science SVG Diagram · ${diag.discipline} · ${diag.stage}`,
        searchBlob: `${diag.title} ${diag.discipline} ${diag.stage} ${partsBlob} diagram svg science`.toLowerCase(),
        targetTab: 'science_diagrams',
      });
    }

    for (const mod of ENGLISH_GRAMMAR_MODULES) {
      const rulesBlob = mod.rules.map((r) => `${r.heading} ${r.formulaOrRule}`).join(' ');
      entries.push({
        id: `gram_${mod.id}`,
        kind: 'grammar',
        title: mod.title,
        subtitle: `English Grammar Hub · ${mod.stage} · ${mod.rules.length} Core Rules`,
        searchBlob: `${mod.title} ${mod.stage} ${rulesBlob} english grammar tenses voice speech`.toLowerCase(),
        targetTab: 'english_grammar',
      });
    }

    for (const tr of SCHOLARSHIP_OLYMPIAD_TRACKS) {
      entries.push({
        id: `sch_${tr.id}`,
        kind: 'scholarship',
        title: tr.examTitle,
        subtitle: `Scholarship & Olympiad Hub · ${tr.targetClasses} · ${tr.officialAuthority}`,
        searchBlob: `${tr.examTitle} ${tr.officialAuthority} ${tr.targetClasses} ${tr.keyTopics.join(' ')} scholarship olympiad`.toLowerCase(),
        targetTab: 'scholarship_olympiad',
      });
    }
  }

  return entries;
}

function getScopedOrGlobalStudyLibraryIndex(params: {
  includeAllBoards: boolean;
  defaultBoard: EducationBoard;
  defaultClass: ClassLevel;
}): SearchIndexEntry[] {
  const modeKey = isVerifiedSyllabusPipelineEnabled() ? 'central_v2' : 'legacy_v2';
  if (params.includeAllBoards) {
    if (cachedGlobalIndex && cachedGlobalIndex.key === modeKey) {
      return cachedGlobalIndex.entries;
    }
    const fullEntries = buildStudyLibraryEntriesForScope({
      boards: BOARDS,
      classes: ALL_10_CLASSES,
      includeSpecialHubs: true,
    });
    cachedGlobalIndex = { key: modeKey, entries: fullEntries };
    return fullEntries;
  }

  const scopeKey = `${modeKey}|${params.defaultBoard}|${params.defaultClass}`;
  const cachedScoped = cachedScopedIndexes.get(scopeKey);
  if (cachedScoped) return cachedScoped;

  const scopedEntries = buildStudyLibraryEntriesForScope({
    boards: [params.defaultBoard],
    classes: [params.defaultClass],
    includeSpecialHubs: true,
  });
  if (cachedScopedIndexes.size >= 12) {
    const oldest = cachedScopedIndexes.keys().next().value;
    if (oldest) cachedScopedIndexes.delete(oldest);
  }
  cachedScopedIndexes.set(scopeKey, scopedEntries);
  return scopedEntries;
}

export const StudyLibraryGlobalSearch: React.FC<StudyLibraryGlobalSearchProps> = ({
  isOpen,
  onClose,
  defaultBoard,
  defaultClass,
  onJumpToResult,
}) => {
  const [query, setQuery] = useState<string>('');
  const [boardFilter, setBoardFilter] = useState<'ALL' | EducationBoard>(defaultBoard);
  const [classFilter, setClassFilter] = useState<'ALL' | ClassLevel>(defaultClass);
  const [kindFilter, setKindFilter] = useState<'ALL' | SearchIndexEntry['kind']>('ALL');
  const [visibleLimit, setVisibleLimit] = useState<number>(25);

  const needsAllBoardsIndex =
    boardFilter === 'ALL' ||
    classFilter === 'ALL' ||
    boardFilter !== defaultBoard ||
    classFilter !== defaultClass;

  const allEntries = useMemo(() => {
    if (!isOpen) return [];
    return getScopedOrGlobalStudyLibraryIndex({
      includeAllBoards: needsAllBoardsIndex,
      defaultBoard,
      defaultClass,
    });
  }, [isOpen, needsAllBoardsIndex, defaultBoard, defaultClass]);

  const allMatchedResults = useMemo(() => {
    if (!isOpen) return [];
    const tokens = query
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean);

    const matched: SearchIndexEntry[] = [];
    for (const item of allEntries) {
      if (kindFilter !== 'ALL' && item.kind !== kindFilter) continue;
      if (boardFilter !== 'ALL' && item.board && item.board !== boardFilter) continue;
      if (classFilter !== 'ALL' && item.classLevel && item.classLevel !== classFilter) continue;

      if (tokens.length === 0) {
        if (
          !item.board ||
          (item.board === defaultBoard && item.classLevel === defaultClass)
        ) {
          matched.push(item);
        }
      } else {
        const allMatch = tokens.every((tk) => item.searchBlob.includes(tk));
        if (allMatch) {
          matched.push(item);
        }
      }
      if (matched.length >= 100) break;
    }
    return matched;
  }, [isOpen, allEntries, query, boardFilter, classFilter, kindFilter, defaultBoard, defaultClass]);

  const results = useMemo(
    () => allMatchedResults.slice(0, visibleLimit),
    [allMatchedResults, visibleLimit]
  );

  if (!isOpen) return null;

  const renderKindIcon = (kind: SearchIndexEntry['kind']) => {
    switch (kind) {
      case 'textbook':
        return <Library className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'solutions':
        return <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'exam_paper':
        return <FileText className="w-4 h-4 text-purple-600 shrink-0" />;
      case 'video_lesson':
        return <PlayCircle className="w-4 h-4 text-rose-600 shrink-0" />;
      case 'worksheet':
        return <FileSpreadsheet className="w-4 h-4 text-sky-600 shrink-0" />;
      case 'math':
        return <Calculator className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 'science_diagram':
        return <FlaskConical className="w-4 h-4 text-emerald-600 shrink-0" />;
      case 'grammar':
        return <Languages className="w-4 h-4 text-slate-700 shrink-0" />;
      case 'scholarship':
        return <Trophy className="w-4 h-4 text-amber-600 shrink-0" />;
      default:
        return <BookOpen className="w-4 h-4 text-indigo-600 shrink-0" />;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-start justify-center p-3 sm:p-6 pt-8 sm:pt-14 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Global Study Library Search"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[84vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Search Input Row */}
        <div className="p-4 sm:p-5 border-b border-slate-200 space-y-3 bg-slate-50">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-display font-black text-slate-900">
                Global Study Material Search
              </h2>
              <p className="text-xs text-slate-600">
                Instant search across Textbooks, Chapters, Exercise Solutions, Question Papers,
                Video Lessons, Worksheets, Math Formulas, Science Diagrams &amp; Grammar
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Search"
              className="p-2 rounded-xl bg-white hover:bg-slate-200 text-slate-700 border border-slate-200 cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: Photosynthesis, Trigonometry, Shivaji, PYQ, Model Paper, Video, Exercise Solutions..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:border-indigo-600 shadow-2xs"
            />
          </div>

          {/* Filter Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={boardFilter}
              onChange={(e) => setBoardFilter(e.target.value as 'ALL' | EducationBoard)}
              aria-label="Filter by Board"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-semibold"
            >
              <option value="ALL">All 3 Boards</option>
              <option value="Maharashtra">Maharashtra Board</option>
              <option value="CBSE">CBSE (NCERT)</option>
              <option value="ICSE">ICSE (CISCE)</option>
            </select>

            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value as 'ALL' | ClassLevel)}
              aria-label="Filter by Class"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-semibold"
            >
              <option value="ALL">All Classes (1–10)</option>
              {ALL_10_CLASSES.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>

            <select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value as 'ALL' | SearchIndexEntry['kind'])}
              aria-label="Filter by Resource Type"
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-800 font-semibold"
            >
              <option value="ALL">All Resource Types</option>
              <option value="chapter">Chapters &amp; Notes</option>
              <option value="solutions">Textbook Exercise Solutions</option>
              <option value="textbook">Official Textbooks</option>
              <option value="exam_paper">Model &amp; PYQ Question Papers</option>
              <option value="video_lesson">Video Lessons</option>
              <option value="worksheet">Chapter Worksheets</option>
              <option value="math">Math Formula Hub</option>
              <option value="science_diagram">Science SVG Diagrams</option>
              <option value="grammar">English Grammar Hub</option>
              <option value="scholarship">Scholarship &amp; Olympiad</option>
            </select>

            <span className="ml-auto text-[11px] font-semibold text-slate-500 tabular-nums">
              Showing {results.length} of {allMatchedResults.length} match{allMatchedResults.length === 1 ? '' : 'es'}
            </span>
          </div>
          {!needsAllBoardsIndex && (
            <div className="flex items-center justify-between gap-2 text-[11px] text-indigo-800 bg-indigo-50 border border-indigo-200 rounded-lg px-2.5 py-1.5">
              <span>
                Searching fast index for <strong>{defaultBoard} · {defaultClass}</strong>
              </span>
              <button
                type="button"
                onClick={() => {
                  setBoardFilter('ALL');
                  setClassFilter('ALL');
                  setVisibleLimit(25);
                }}
                className="font-black underline cursor-pointer shrink-0"
              >
                Search All 3 Boards &amp; 10 Classes
              </button>
            </div>
          )}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto divide-y divide-slate-100 flex-1">
          {results.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <p className="text-sm font-bold text-slate-800">
                No matching chapters, textbooks, or hubs found for &ldquo;{query}&rdquo;.
              </p>
              <p className="text-xs text-slate-500">
                Try broadening your Board/Class filter or searching a shorter keyword like
                &ldquo;Fractions&rdquo;, &ldquo;Cell&rdquo;, &ldquo;Electricity&rdquo;, or
                &ldquo;Grammar&rdquo;.
              </p>
            </div>
          ) : (
            <>
              {results.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onJumpToResult({
                      board: item.board,
                      classLevel: item.classLevel,
                      subject: item.subject,
                      chapterNumber: item.chapterNumber,
                      tab: item.targetTab,
                    });
                    onClose();
                  }}
                  className="w-full py-3 px-3 hover:bg-indigo-50/70 rounded-xl text-left flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className="mt-0.5">{renderKindIcon(item.kind)}</div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-indigo-700 truncate">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                </button>
              ))}
              {results.length < allMatchedResults.length && (
                <div className="pt-3 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleLimit((prev) => prev + 25)}
                    className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-extrabold cursor-pointer"
                  >
                    Show 25 More Results ({allMatchedResults.length - results.length} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
