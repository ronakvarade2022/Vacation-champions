import React, { useMemo, useState } from 'react';
import {
  Search,
  X,
  ArrowRight,
  Users,
  BookOpen,
  CreditCard,
  Building2,
  FolderKanban,
  HelpCircle,
  GraduationCap,
} from 'lucide-react';
import type {
  ClassLevel,
  EducationBoard,
  ParentProfile,
  PaymentTransaction,
  QuizQuestion,
  StudentProfile,
} from '../../types';
import { ALL_10_CLASSES, getSubjectsForClass } from '../../data/classCurriculumConfig';
import { getOfficialTextbooksForBoardClass } from '../../data/studyLibrary/textbookLibraryData';
import { getRichChaptersForSubject } from '../../data/worksheets/builders/chapterCatalog';
import {
  ADMIN_MAIN_CATEGORIES,
  ADMIN_SUBSECTIONS,
  type AdminJumpTarget,
  getAdminCategoryMeta,
} from './adminCatalogConfig';

interface AdminSearchEntry {
  id: string;
  kind:
    | 'section'
    | 'student'
    | 'teacher'
    | 'parent'
    | 'school'
    | 'board_subject'
    | 'textbook'
    | 'chapter'
    | 'question'
    | 'payment';
  title: string;
  subtitle: string;
  searchBlob: string;
  jump: AdminJumpTarget;
}

interface AdminGlobalSearchBarProps {
  studentsList: StudentProfile[];
  parentsList: ParentProfile[];
  allQuestions: QuizQuestion[];
  transactions: PaymentTransaction[];
  onNavigateJump: (target: AdminJumpTarget) => void;
}

const BOARDS: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];

export const AdminGlobalSearchBar: React.FC<AdminGlobalSearchBarProps> = ({
  studentsList,
  parentsList,
  allQuestions,
  transactions,
  onNavigateJump,
}) => {
  const [query, setQuery] = useState<string>('');
  const [kindFilter, setKindFilter] = useState<'ALL' | AdminSearchEntry['kind']>('ALL');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // Static structural index (categories, subsections, boards, classes, subjects, textbooks, chapters)
  const staticCurriculumEntries = useMemo<AdminSearchEntry[]>(() => {
    const list: AdminSearchEntry[] = [];

    for (const sub of ADMIN_SUBSECTIONS) {
      const cat = getAdminCategoryMeta(sub.categoryId);
      list.push({
        id: `sec_${sub.id}`,
        kind: 'section',
        title: sub.title,
        subtitle: `Category ${cat.numberLabel}: ${cat.title} · ${sub.description}`,
        searchBlob: `${sub.title} ${cat.title} ${sub.description} ${sub.id}`.toLowerCase(),
        jump: { categoryId: sub.categoryId, subsectionId: sub.id },
      });
    }

    for (const cat of ADMIN_MAIN_CATEGORIES) {
      const subs = ADMIN_SUBSECTIONS.filter((s) => s.categoryId === cat.id);
      if (subs[0]) {
        list.push({
          id: `cat_${cat.id}`,
          kind: 'section',
          title: `Category ${cat.numberLabel}: ${cat.title}`,
          subtitle: cat.shortSubtitle,
          searchBlob: `${cat.title} ${cat.shortSubtitle} ${cat.description}`.toLowerCase(),
          jump: { categoryId: cat.id, subsectionId: subs[0].id },
        });
      }
    }

    for (const board of BOARDS) {
      for (const cls of ALL_10_CLASSES) {
        const subjects = getSubjectsForClass(cls, board);
        for (const subject of subjects) {
          list.push({
            id: `sub_${board}_${cls}_${subject}`,
            kind: 'board_subject',
            title: `${subject} (${board} · ${cls})`,
            subtitle: `Academic Management · Subject, Syllabus, Notes, Papers & Quiz`,
            searchBlob: `${board} ${cls} ${subject} syllabus subject notes worksheet`.toLowerCase(),
            jump: {
              categoryId: 'academic_management',
              subsectionId: 'chapters-notes-solutions',
              board,
              classLevel: cls,
              searchHint: subject,
            },
          });
          const chapters = getRichChaptersForSubject(board, cls, subject);
          chapters.forEach((chTitle, idx) => {
            list.push({
              id: `ch_${board}_${cls}_${subject}_${idx + 1}`,
              kind: 'chapter',
              title: `Ch ${idx + 1}: ${chTitle}`,
              subtitle: `${board} · ${cls} · ${subject} · Notes & Textbook Solutions`,
              searchBlob: `${chTitle} ${board} ${cls} ${subject} chapter ${idx + 1} notes solutions`.toLowerCase(),
              jump: {
                categoryId: 'academic_management',
                subsectionId: 'chapters-notes-solutions',
                board,
                classLevel: cls,
                searchHint: chTitle,
              },
            });
          });
        }
        const textbooks = getOfficialTextbooksForBoardClass(board, cls);
        for (const tb of textbooks) {
          list.push({
            id: `tb_${tb.id}`,
            kind: 'textbook',
            title: tb.bookTitle,
            subtitle: `Textbook · ${board} · ${cls} · ${tb.subject}`,
            searchBlob: `${tb.bookTitle} ${tb.publisher} ${tb.subject} ${board} ${cls} textbook`.toLowerCase(),
            jump: {
              categoryId: 'academic_management',
              subsectionId: 'textbooks-directory',
              board,
              classLevel: cls,
              searchHint: tb.bookTitle,
            },
          });
        }
      }
    }

    return list;
  }, []);

  // Dynamic live database entries (students, teachers, parents, schools, questions, payments)
  const dynamicEntries = useMemo<AdminSearchEntry[]>(() => {
    const list: AdminSearchEntry[] = [];
    const seenSchools = new Set<string>();

    for (const s of studentsList) {
      const isTeacher = s.accountRole === 'teacher';
      list.push({
        id: `usr_${s.id}`,
        kind: isTeacher ? 'teacher' : 'student',
        title: `${s.name} (${s.classLevel})`,
        subtitle: `${isTeacher ? 'Teacher' : 'Student'} · ${s.board || 'Maharashtra'} · ${s.mobile} · ${s.email} · Plan: ${s.plan}`,
        searchBlob: `${s.name} ${s.email} ${s.mobile} ${s.id} ${s.schoolName || ''} ${s.board || ''} ${s.classLevel} ${isTeacher ? 'teacher' : 'student'}`.toLowerCase(),
        jump: {
          categoryId: 'registration_users',
          subsectionId: isTeacher ? 'teachers-directory' : 'students',
          board: s.board || 'all',
          searchHint: s.name,
        },
      });
      if (s.schoolName && s.schoolName.trim()) {
        const schKey = s.schoolName.trim().toLowerCase();
        if (!seenSchools.has(schKey)) {
          seenSchools.add(schKey);
          list.push({
            id: `schname_${schKey}`,
            kind: 'school',
            title: s.schoolName.trim(),
            subtitle: `Registered School Reference · ${s.board || 'Maharashtra'}`,
            searchBlob: `${s.schoolName} school institution college`.toLowerCase(),
            jump: {
              categoryId: 'registration_users',
              subsectionId: 'schools-directory',
              searchHint: s.schoolName.trim(),
            },
          });
        }
      }
    }

    try {
      const rawInst = localStorage.getItem('msz_institutions_v1');
      if (rawInst) {
        const parsed = JSON.parse(rawInst) as Array<{ id: string; institutionName: string; city: string; institutionType: string }>;
        for (const inst of parsed) {
          list.push({
            id: `inst_${inst.id}`,
            kind: 'school',
            title: inst.institutionName,
            subtitle: `${inst.institutionType} · ${inst.city}`,
            searchBlob: `${inst.institutionName} ${inst.city} ${inst.institutionType} school college`.toLowerCase(),
            jump: {
              categoryId: 'registration_users',
              subsectionId: 'schools-directory',
              searchHint: inst.institutionName,
            },
          });
        }
      }
    } catch {
      // Ignore storage read issues cleanly
    }

    for (const p of parentsList) {
      list.push({
        id: `par_${p.id}`,
        kind: 'parent',
        title: p.name,
        subtitle: `Parent · ${p.mobile} · ${p.email} · Linked: ${p.linkedStudentIds?.length || 0}`,
        searchBlob: `${p.name} ${p.email} ${p.mobile} parent guardian`.toLowerCase(),
        jump: {
          categoryId: 'registration_users',
          subsectionId: 'parents-management',
          searchHint: p.name,
        },
      });
    }

    for (const tx of transactions.slice(0, 150)) {
      list.push({
        id: `tx_${tx.id}`,
        kind: 'payment',
        title: `${tx.receiptNumber || tx.id} — ${tx.studentName} (₹${tx.amount})`,
        subtitle: `Transaction · ${tx.status} · ${tx.planTitle} · PaymentId: ${tx.paymentId}`,
        searchBlob: `${tx.receiptNumber} ${tx.studentName} ${tx.paymentId} ${tx.orderId} ${tx.parentEmail} ${tx.planTitle} payment razorpay`.toLowerCase(),
        jump: {
          categoryId: 'finance_subscriptions',
          subsectionId: 'payments',
          board: tx.selectedBoard || 'all',
          searchHint: tx.paymentId || tx.studentName,
        },
      });
    }

    for (const q of allQuestions.slice(0, 200)) {
      list.push({
        id: `q_${q.id}`,
        kind: 'question',
        title: q.questionText.slice(0, 95) + (q.questionText.length > 95 ? '...' : ''),
        subtitle: `Question Bank · ${q.board || 'Maharashtra'} · ${q.classLevel} · ${q.subject} · L${q.level || 1}`,
        searchBlob: `${q.questionText} ${q.topic || ''} ${q.subject} ${q.classLevel} ${q.board || ''}`.toLowerCase(),
        jump: {
          categoryId: 'student_learning',
          subsectionId: 'questions',
          board: q.board || 'all',
          classLevel: q.classLevel,
        },
      });
    }

    return list;
  }, [studentsList, parentsList, transactions, allQuestions]);

  const matches = useMemo(() => {
    const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const pool = [...dynamicEntries, ...staticCurriculumEntries];

    const out: AdminSearchEntry[] = [];
    for (const entry of pool) {
      if (kindFilter !== 'ALL' && entry.kind !== kindFilter) continue;
      if (tokens.length === 0) {
        if (entry.kind === 'section') out.push(entry);
      } else {
        if (tokens.every((t) => entry.searchBlob.includes(t))) {
          out.push(entry);
        }
      }
      if (out.length >= 30) break;
    }
    return out;
  }, [query, kindFilter, dynamicEntries, staticCurriculumEntries]);

  const renderIcon = (kind: AdminSearchEntry['kind']) => {
    switch (kind) {
      case 'student':
        return <Users className="w-4 h-4 text-indigo-600 shrink-0" />;
      case 'teacher':
        return <GraduationCap className="w-4 h-4 text-teal-600 shrink-0" />;
      case 'school':
        return <Building2 className="w-4 h-4 text-sky-600 shrink-0" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-purple-600 shrink-0" />;
      case 'question':
        return <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />;
      case 'section':
        return <FolderKanban className="w-4 h-4 text-slate-700 shrink-0" />;
      default:
        return <BookOpen className="w-4 h-4 text-emerald-600 shrink-0" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-3 sm:p-4 space-y-2.5 relative">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onFocus={() => setIsOpen(true)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            placeholder="Global Admin Search: Students, Teachers, Schools, Boards, Subjects, Textbooks, Chapters, Payments, Reports..."
            className="w-full pl-10 pr-20 py-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white text-xs sm:text-sm font-medium text-slate-900 focus:outline-hidden focus:border-amber-500"
          />
          {(query || isOpen) && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setIsOpen(false);
              }}
              aria-label="Clear and close global search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 px-2 py-1 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-[11px] font-bold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3 h-3" />
              <span>Close</span>
            </button>
          )}
        </div>

        <select
          value={kindFilter}
          onChange={(e) => {
            setKindFilter(e.target.value as 'ALL' | AdminSearchEntry['kind']);
            setIsOpen(true);
          }}
          aria-label="Filter Admin search scope"
          className="px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-800 cursor-pointer"
        >
          <option value="ALL">All Admin Records</option>
          <option value="section">Dashboard Sections</option>
          <option value="student">Students</option>
          <option value="teacher">Teachers</option>
          <option value="school">Schools &amp; Colleges</option>
          <option value="parent">Parents</option>
          <option value="board_subject">Subjects &amp; Syllabi</option>
          <option value="textbook">Textbooks</option>
          <option value="chapter">Chapters &amp; Notes</option>
          <option value="question">Quiz Questions</option>
          <option value="payment">Razorpay Payments</option>
        </select>
      </div>

      {isOpen && (
        <div className="border-t border-slate-200 pt-2.5 max-h-80 overflow-y-auto divide-y divide-slate-100">
          <div className="pb-2 flex items-center justify-between text-[11px] text-slate-500 font-bold">
            <span>
              {query.trim()
                ? `${matches.length} admin match${matches.length === 1 ? '' : 'es'} found`
                : 'Quick Jump to Any Admin Section'}
            </span>
            <span>Role Scope: Master Administrator</span>
          </div>

          {matches.length === 0 ? (
            <div className="py-6 text-center text-xs text-slate-500">
              No matching records found for &ldquo;{query}&rdquo;. Try searching by student name,
              email, chapter, subject, payment ID, or tool name.
            </div>
          ) : (
            matches.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  onNavigateJump(m.jump);
                  setIsOpen(false);
                }}
                className="w-full py-2.5 px-2.5 hover:bg-amber-50/70 rounded-xl text-left flex items-center justify-between gap-3 cursor-pointer group transition-colors"
              >
                <div className="flex items-start gap-2.5 min-w-0">
                  <div className="mt-0.5">{renderIcon(m.kind)}</div>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 group-hover:text-amber-800 truncate">
                      {m.title}
                    </p>
                    <p className="text-[11px] text-slate-500 truncate">{m.subtitle}</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 shrink-0" />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};
