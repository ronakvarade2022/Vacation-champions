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
} from 'lucide-react';
import { ClassLevel, EducationBoard, SubjectName } from '../types';
import { ALL_10_CLASSES, getSubjectsForClass } from '../data/classCurriculumConfig';
import { getOfficialTextbooksForBoardClass } from '../data/studyLibrary/textbookLibraryData';
import { getRichChaptersForSubject } from '../data/worksheets/builders/chapterCatalog';
import {
  ENGLISH_GRAMMAR_MODULES,
  MATH_FORMULA_TOPICS,
  SCHOLARSHIP_OLYMPIAD_TRACKS,
  SCIENCE_DIAGRAMS_LIST,
} from '../data/studyLibrary/specialAcademicHubsData';

export type GlobalSearchTargetTab =
  | 'textbooks'
  | 'chapter_notes'
  | 'short_revision'
  | 'qa_bank'
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
  kind: 'chapter' | 'textbook' | 'math' | 'science_diagram' | 'grammar' | 'scholarship';
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

let cachedGlobalIndex: SearchIndexEntry[] | null = null;

function buildGlobalStudyLibraryIndex(): SearchIndexEntry[] {
  if (cachedGlobalIndex) return cachedGlobalIndex;

  const entries: SearchIndexEntry[] = [];

  // 1. All 3 Boards × 10 Classes Textbooks & Chapters (382 textbooks + 3,542 chapters)
  for (const board of BOARDS) {
    for (const classLevel of ALL_10_CLASSES) {
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
        chapterTitles.forEach((rawTitle, idx) => {
          const chNum = idx + 1;
          entries.push({
            id: `ch_${board}_${classLevel}_${subject}_${chNum}`,
            kind: 'chapter',
            title: `Ch ${chNum}: ${rawTitle}`,
            subtitle: `${board} · ${classLevel} · ${subject} · Notes, Revision, Q&A & Test`,
            searchBlob: `${rawTitle} ${subject} ${board} ${classLevel} chapter ${chNum}`.toLowerCase(),
            board,
            classLevel,
            subject,
            chapterNumber: chNum,
            targetTab: 'chapter_notes',
          });
        });
      }
    }
  }

  // 2. Math Formulas Hub
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

  // 3. Science Diagrams (12 SVGs)
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

  // 4. English Grammar Hub
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

  // 5. Scholarship & Olympiad Hub
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

  cachedGlobalIndex = entries;
  return entries;
}

export const StudyLibraryGlobalSearch: React.FC<StudyLibraryGlobalSearchProps> = ({
  isOpen,
  onClose,
  defaultBoard,
  defaultClass,
  onJumpToResult,
}) => {
  const [query, setQuery] = useState<string>('');
  const [boardFilter, setBoardFilter] = useState<'ALL' | EducationBoard>('ALL');
  const [classFilter, setClassFilter] = useState<'ALL' | ClassLevel>('ALL');
  const [kindFilter, setKindFilter] = useState<'ALL' | SearchIndexEntry['kind']>('ALL');

  const allEntries = useMemo(() => {
    if (!isOpen) return [];
    return buildGlobalStudyLibraryIndex();
  }, [isOpen]);

  const results = useMemo(() => {
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
        // When query is empty, show curated items relevant to user's current board & class plus special hubs
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
      if (matched.length >= 40) break;
    }
    return matched;
  }, [isOpen, allEntries, query, boardFilter, classFilter, kindFilter, defaultBoard, defaultClass]);

  if (!isOpen) return null;

  const renderKindIcon = (kind: SearchIndexEntry['kind']) => {
    switch (kind) {
      case 'textbook':
        return <Library className="w-4 h-4 text-amber-600 shrink-0" />;
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
                Instant search across 3 Boards, Classes 1–10, 382 Textbooks, 3,542 Chapters,
                Formulas, 12 Science Diagrams &amp; Grammar (0 database reads)
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
              placeholder="Try: Photosynthesis, Trigonometry, Shivaji, Pythagoras, NCERT Science, Tenses..."
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
              <option value="chapter">Chapters (Notes / Q&amp;A / Tests)</option>
              <option value="textbook">Official Textbooks</option>
              <option value="math">Math Formula Hub</option>
              <option value="science_diagram">Science SVG Diagrams</option>
              <option value="grammar">English Grammar Hub</option>
              <option value="scholarship">Scholarship &amp; Olympiad</option>
            </select>

            <span className="ml-auto text-[11px] font-semibold text-slate-500 tabular-nums">
              Showing {results.length} match{results.length === 1 ? '' : 'es'}
            </span>
          </div>
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
            results.map((item) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};
