import { ClassLevel, EducationBoard, SubjectName } from '../../types';
import { InstructionMedium } from '../../types/lessonPlanner';
import { ALL_10_CLASSES, getSubjectMeta, getSubjectsForClass } from '../classCurriculumConfig';
import {
  getVerifiedSubjectSyllabus,
  VerifiedSubjectSyllabusEntry,
} from '../lessonPlanner/verifiedSyllabusRegistry';
import { PHASE2_REBUILT_ENTRIES_MAP } from './phase2RebuiltEntries';
import { STAGE_C_VERIFIED_ENTRIES_MAP } from './stageCVerifiedEntries';

export type CentralVerificationStatus =
  | 'VERIFIED'
  | 'OUTDATED_REBUILD_REQUIRED'
  | 'PENDING_VERIFICATION'
  | 'SCHOOL_TEXTBOOK_DEPENDENT';

export type CentralCurriculumTrack =
  | 'OFFICIAL_BOARD_TEXTBOOK'
  | 'CURRICULAR_ENRICHMENT'
  | 'SCHOOL_DEPENDENT';

export type CentralChapterSectionType =
  | 'chapter'
  | 'unit'
  | 'prose'
  | 'poem'
  | 'grammar'
  | 'rapid_reading'
  | 'drama';

export interface CentralChapterItem {
  sequenceIndex: number;
  chapterNumber: number;
  chapterTitle: string;
  sectionOrPart?: string;
  sectionType: CentralChapterSectionType;
}

export interface CentralMediumVariant {
  medium: InstructionMedium;
  languageRole: 'First Language' | 'Second / Third Language' | 'Subject Textbook';
  status: CentralVerificationStatus;
  textbookTitle: string;
  publisher: string;
  academicYearEdition: string;
  officialSourceUrl: string;
  verificationNote: string;
  chapters: CentralChapterItem[];
}

export interface CentralSyllabusEntry {
  entryId: string; // `${board}__${classLevel}__${subject}`
  board: EducationBoard;
  classLevel: ClassLevel;
  classNumber: number;
  subject: SubjectName;
  shortCode: string;
  track: CentralCurriculumTrack;
  verificationStatus: CentralVerificationStatus;
  textbookTitle: string;
  publisher: string;
  academicYearEdition: string;
  applicableMediums: InstructionMedium[];
  officialSourceUrl: string;
  verificationNote: string;
  rebuildReason?: string;
  targetReplacementBook?: string;
  chapters: CentralChapterItem[];
  mediumVariants: CentralMediumVariant[];
}

interface RebuildOverrideSpec {
  rebuildReason: string;
  targetReplacementBook: string;
  mediumVariantOverrides?: CentralMediumVariant[];
}

const ENRICHMENT_SUBJECTS = new Set<SubjectName>([
  'General Knowledge',
  'Logical Reasoning',
  'Vocabulary and Grammar',
  'Moral Education',
  'Drawing and Creative Activities',
]);

function getBoardOfficialPortal(board: EducationBoard): string {
  if (board === 'CBSE') return 'https://ncert.nic.in/textbook.php';
  if (board === 'ICSE') return 'https://cisce.org/publications/';
  return 'https://books.ebalbharati.in/';
}

function getClassNum(classLevel: ClassLevel): number {
  return parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
}

function inferSectionType(title: string): CentralChapterSectionType {
  const lower = title.toLowerCase();
  if (lower.includes('(poem)') || lower.includes('कविता') || lower.includes('काव्य') || lower.includes('पद्य')) {
    return 'poem';
  }
  if (lower.includes('drama:') || lower.includes('julius caesar')) {
    return 'drama';
  }
  if (lower.includes('स्थूलवाचन') || lower.includes('पूरक पठन')) {
    return 'rapid_reading';
  }
  if (lower.includes('unit ')) {
    return 'unit';
  }
  return 'chapter';
}

function mapChapters(base: VerifiedSubjectSyllabusEntry): CentralChapterItem[] {
  return base.chapters.map((ch, idx) => ({
    sequenceIndex: idx + 1,
    chapterNumber: ch.chapterNumber,
    chapterTitle: ch.chapterTitle,
    ...(ch.sectionOrPart ? { sectionOrPart: ch.sectionOrPart } : {}),
    sectionType: inferSectionType(ch.chapterTitle),
  }));
}

/**
 * 28 entries that currently hold status: 'PASS' in verifiedSyllabusRegistry.ts
 * but failed independent official textbook verification during the syllabus audit:
 * - 24 CBSE entries (Classes 4, 5, 7, 8) using pre-NCF-SE / Rationalized books
 *   superseded by NCERT 2025-2026 NCF-SE 2023 editions.
 * - 4 Maharashtra SSC entries (Std 6 English hybrid/corrupted index; Std 9 Hindi,
 *   Std 10 Marathi, Std 10 Hindi misclassifying Second/Third-Language books across
 *   First-Language Hindi/Marathi mediums).
 */
function buildOutdatedRebuildMap(): Record<string, RebuildOverrideSpec> {
  const cbseNcfSeClass4Books: Record<string, string> = {
    Mathematics: 'NCERT Maths Mela – Textbook of Mathematics for Grade 4 (NCF-SE 2023)',
    English: 'NCERT Santoor – Textbook of English for Grade 4 (NCF-SE 2023)',
    Hindi: 'NCERT वीणा (Veena) – कक्षा ४ हिंदी पाठ्यपुस्तक (NCF-SE 2023)',
    'Environmental Studies': 'NCERT Our Wondrous World – Grade 4 EVS (NCF-SE 2023)',
  };

  const cbseNcfSeClass5Books: Record<string, string> = {
    Mathematics: 'NCERT Maths Mela – Textbook of Mathematics for Grade 5 (NCF-SE 2023)',
    English: 'NCERT Santoor – Textbook of English for Grade 5 (NCF-SE 2023)',
    Hindi: 'NCERT वीणा (Veena) – कक्षा ५ हिंदी पाठ्यपुस्तक (NCF-SE 2023)',
    'Environmental Studies': 'NCERT Our Wondrous World – Grade 5 EVS (NCF-SE 2023)',
  };

  const cbseNcfSeClass7Books: Record<string, string> = {
    Mathematics: 'NCERT Ganita Prakash – Textbook of Mathematics for Grade 7 (NCF-SE 2023)',
    Science: 'NCERT Curiosity – Textbook of Science for Grade 7 (NCF-SE 2023)',
    'Social Science': 'NCERT Exploring Society: India and Beyond – Grade 7 (NCF-SE 2023)',
    History: 'NCERT Exploring Society: India and Beyond – Grade 7 History Themes (NCF-SE 2023)',
    Geography: 'NCERT Exploring Society: India and Beyond – Grade 7 Geography Themes (NCF-SE 2023)',
    English: 'NCERT Poorvi – Textbook of English for Grade 7 (NCF-SE 2023)',
    Hindi: 'NCERT मल्हार (Malhar) – कक्षा ७ हिंदी पाठ्यपुस्तक (NCF-SE 2023)',
    Sanskrit: 'NCERT दीपकम् (Deepakam) – कक्षा ७ संस्कृत पाठ्यपुस्तकम् (NCF-SE 2023)',
  };

  const cbseNcfSeClass8Books: Record<string, string> = {
    Mathematics: 'NCERT Ganita Prakash – Textbook of Mathematics for Grade 8 (NCF-SE 2023)',
    Science: 'NCERT Curiosity – Textbook of Science for Grade 8 (NCF-SE 2023)',
    'Social Science': 'NCERT Exploring Society: India and Beyond – Grade 8 (NCF-SE 2023)',
    History: 'NCERT Exploring Society: India and Beyond – Grade 8 History Themes (NCF-SE 2023)',
    Geography: 'NCERT Exploring Society: India and Beyond – Grade 8 Geography Themes (NCF-SE 2023)',
    English: 'NCERT Poorvi – Textbook of English for Grade 8 (NCF-SE 2023)',
    Hindi: 'NCERT मल्हार (Malhar) – कक्षा ८ हिंदी पाठ्यपुस्तक (NCF-SE 2023)',
    Sanskrit: 'NCERT दीपकम् (Deepakam) – कक्षा ८ संस्कृत पाठ्यपुस्तकम् (NCF-SE 2023)',
  };

  const map: Record<string, RebuildOverrideSpec> = {};

  for (const [subj, book] of Object.entries(cbseNcfSeClass4Books)) {
    map[`CBSE__Class 4__${subj}`] = {
      rebuildReason:
        'Pre-NCF-SE NCERT textbook (Math-Magic / Marigold / Rimjhim / Looking Around) superseded for 2025–2026 academic session.',
      targetReplacementBook: book,
    };
  }
  for (const [subj, book] of Object.entries(cbseNcfSeClass5Books)) {
    map[`CBSE__Class 5__${subj}`] = {
      rebuildReason:
        'Pre-NCF-SE NCERT textbook (Math-Magic / Marigold / Rimjhim / Looking Around) superseded for 2025–2026 academic session.',
      targetReplacementBook: book,
    };
  }
  for (const [subj, book] of Object.entries(cbseNcfSeClass7Books)) {
    map[`CBSE__Class 7__${subj}`] = {
      rebuildReason:
        'Old Rationalized NCERT textbook superseded by NCF-SE 2023 Class 7 textbook series (Ganita Prakash / Curiosity / Exploring Society / Poorvi / Malhar / Deepakam).',
      targetReplacementBook: book,
    };
  }
  for (const [subj, book] of Object.entries(cbseNcfSeClass8Books)) {
    map[`CBSE__Class 8__${subj}`] = {
      rebuildReason:
        'Old Rationalized NCERT textbook superseded by NCF-SE 2023 Class 8 textbook series (Ganita Prakash / Curiosity / Exploring Society / Poorvi / Malhar / Deepakam).',
      targetReplacementBook: book,
    };
  }

  // Maharashtra 4 FAIL entries
  map['Maharashtra__Class 6__English'] = {
    rebuildReason:
      'Hybrid/corrupted chapter titles, missing Units 1.6, 1.7, Unit 3 prose/poems, and missing Units 4.5–4.8; lacks medium separation for My English Book Six.',
    targetReplacementBook:
      'English Balbharati Std 6 (English Medium) + My English Book Six (Marathi / Hindi / Semi-English Medium) – eBalbharati 2025–2026',
  };

  map['Maharashtra__Class 9__Hindi'] = {
    rebuildReason:
      'Medium misclassification: Hindi Lokbharati (Second/Third Language) was mapped to Hindi medium instead of Hindi Kumarbharati (First Language).',
    targetReplacementBook:
      'हिंदी लोकभारती कक्षा ९ (English/Marathi/Semi-English) + हिंदी कुमारभारती कक्षा ९ (Hindi Medium)',
  };

  map['Maharashtra__Class 10__Marathi'] = {
    rebuildReason:
      'Medium misclassification: Marathi Aksharbharati (Second Language) was mapped to Marathi medium instead of Marathi Kumarbharati (First Language).',
    targetReplacementBook:
      'मराठी अक्षरभारती इयत्ता १० वी (English/Hindi/Semi-English) + मराठी कुमारभारती इयत्ता १० वी (Marathi Medium)',
  };

  map['Maharashtra__Class 10__Hindi'] = {
    rebuildReason:
      'Medium misclassification: Hindi Lokbharati (Second/Third Language) was mapped to Hindi medium instead of Hindi Kumarbharati (First Language).',
    targetReplacementBook:
      'हिंदी लोकभारती कक्षा १० (English/Marathi/Semi-English) + हिंदी कुमारभारती कक्षा १० (Hindi Medium)',
  };

  return map;
}

const OUTDATED_REBUILD_MAP = buildOutdatedRebuildMap();

function buildMediumVariantsForVerified(
  entryKey: string,
  base: VerifiedSubjectSyllabusEntry,
  mappedChapters: CentralChapterItem[]
): CentralMediumVariant[] {
  const officialSourceUrl = getBoardOfficialPortal(base.board);

  // Special explicit medium split for Maharashtra Std 8 English (Balbharati verified for English medium; My English Book 8 pending for non-English mediums)
  if (entryKey === 'Maharashtra__Class 8__English') {
    const variants: CentralMediumVariant[] = [
      {
        medium: 'English',
        languageRole: 'First Language',
        status: 'VERIFIED',
        textbookTitle: base.textbookTitle,
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: base.verificationNote,
        chapters: mappedChapters,
      },
    ];
    for (const med of ['Marathi', 'Hindi', 'Semi-English'] as InstructionMedium[]) {
      variants.push({
        medium: med,
        languageRole: 'Second / Third Language',
        status: 'PENDING_VERIFICATION',
        textbookTitle: 'My English Book Eight (Balbharati) – PENDING VERIFICATION',
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: `PENDING: Direct textbook index verification required for My English Book Eight (${med} medium).`,
        chapters: [],
      });
    }
    return variants;
  }

  return base.applicableMediums.map((medium) => ({
    medium,
    languageRole: 'Subject Textbook',
    status: 'VERIFIED',
    textbookTitle: base.textbookTitle,
    publisher: base.publisher,
    academicYearEdition: base.academicYearEdition,
    officialSourceUrl,
    verificationNote: base.verificationNote,
    chapters: mappedChapters,
  }));
}

function buildMediumVariantsForRebuild(
  entryKey: string,
  base: VerifiedSubjectSyllabusEntry,
  spec: RebuildOverrideSpec
): CentralMediumVariant[] {
  const officialSourceUrl = getBoardOfficialPortal(base.board);
  const mappedChapters = mapChapters(base);

  // For MH C9 Hindi, C10 Marathi, C10 Hindi: Second/Third language book index is authentic, First-Language Kumarbharati is missing
  if (entryKey === 'Maharashtra__Class 9__Hindi' || entryKey === 'Maharashtra__Class 10__Hindi') {
    return [
      {
        medium: 'English',
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: base.textbookTitle,
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: `${base.verificationNote} Valid for Second/Third Language mediums.`,
        chapters: mappedChapters,
      },
      {
        medium: 'Marathi',
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: base.textbookTitle,
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: `${base.verificationNote} Valid for Second/Third Language mediums.`,
        chapters: mappedChapters,
      },
      {
        medium: 'Semi-English',
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: base.textbookTitle,
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: `${base.verificationNote} Valid for Second/Third Language mediums.`,
        chapters: mappedChapters,
      },
      {
        medium: 'Hindi',
        languageRole: 'First Language',
        status: 'PENDING_VERIFICATION',
        textbookTitle: `हिंदी कुमारभारती (${base.classLevel} – First Language)`,
        publisher: base.publisher,
        academicYearEdition: 'PENDING VERIFICATION',
        officialSourceUrl,
        verificationNote: spec.rebuildReason,
        chapters: [],
      },
    ];
  }

  if (entryKey === 'Maharashtra__Class 10__Marathi') {
    return [
      {
        medium: 'English',
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: base.textbookTitle,
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: `${base.verificationNote} Valid for Second Language mediums.`,
        chapters: mappedChapters,
      },
      {
        medium: 'Hindi',
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: base.textbookTitle,
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: `${base.verificationNote} Valid for Second Language mediums.`,
        chapters: mappedChapters,
      },
      {
        medium: 'Semi-English',
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: base.textbookTitle,
        publisher: base.publisher,
        academicYearEdition: base.academicYearEdition,
        officialSourceUrl,
        verificationNote: `${base.verificationNote} Valid for Second Language mediums.`,
        chapters: mappedChapters,
      },
      {
        medium: 'Marathi',
        languageRole: 'First Language',
        status: 'PENDING_VERIFICATION',
        textbookTitle: 'मराठी कुमारभारती (इयत्ता १० वी – First Language)',
        publisher: base.publisher,
        academicYearEdition: 'PENDING VERIFICATION',
        officialSourceUrl,
        verificationNote: spec.rebuildReason,
        chapters: [],
      },
    ];
  }

  // CBSE C4/5/7/8 and MH C6 English require full entry chapter index replacement (chapters: [])
  return base.applicableMediums.map((medium) => ({
    medium,
    languageRole: 'Subject Textbook',
    status: 'OUTDATED_REBUILD_REQUIRED',
    textbookTitle: spec.targetReplacementBook,
    publisher: base.publisher,
    academicYearEdition: '2025–2026 Rebuild Pending',
    officialSourceUrl,
    verificationNote: spec.rebuildReason,
    chapters: [],
  }));
}

function buildCentralSyllabusRecords(): Record<string, CentralSyllabusEntry> {
  const boards: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];
  const map: Record<string, CentralSyllabusEntry> = {};

  for (const board of boards) {
    for (const classLevel of ALL_10_CLASSES) {
      const classNumber = getClassNum(classLevel);
      const subjects = getSubjectsForClass(classLevel, board);

      for (const subject of subjects) {
        const entryId = `${board}__${classLevel}__${subject}`;
        const subjMeta = getSubjectMeta(subject, board);
        const base = getVerifiedSubjectSyllabus(board, classLevel, subject);
        const officialSourceUrl = getBoardOfficialPortal(board);
        const isEnrichment = ENRICHMENT_SUBJECTS.has(subject);
        const stageCVerified = STAGE_C_VERIFIED_ENTRIES_MAP[entryId];
        if (stageCVerified) {
          map[entryId] = {
            entryId,
            board,
            classLevel,
            classNumber,
            subject,
            shortCode: subjMeta.shortCode,
            track: 'OFFICIAL_BOARD_TEXTBOOK',
            verificationStatus: stageCVerified.verificationStatus,
            textbookTitle: stageCVerified.textbookTitle,
            publisher: stageCVerified.publisher,
            academicYearEdition: stageCVerified.academicYearEdition,
            applicableMediums: stageCVerified.applicableMediums,
            officialSourceUrl: stageCVerified.officialSourceUrl,
            verificationNote: stageCVerified.verificationNote,
            chapters: stageCVerified.chapters,
            mediumVariants: stageCVerified.mediumVariants,
          };
          continue;
        }
        const phase2Rebuilt = PHASE2_REBUILT_ENTRIES_MAP[entryId];
        if (phase2Rebuilt) {
          map[entryId] = {
            entryId,
            board,
            classLevel,
            classNumber,
            subject,
            shortCode: subjMeta.shortCode,
            track: 'OFFICIAL_BOARD_TEXTBOOK',
            verificationStatus: phase2Rebuilt.verificationStatus,
            textbookTitle: phase2Rebuilt.textbookTitle,
            publisher: phase2Rebuilt.publisher,
            academicYearEdition: phase2Rebuilt.academicYearEdition,
            applicableMediums: base.applicableMediums,
            officialSourceUrl: phase2Rebuilt.officialSourceUrl,
            verificationNote: phase2Rebuilt.verificationNote,
            ...(phase2Rebuilt.rebuildReason ? { rebuildReason: phase2Rebuilt.rebuildReason } : {}),
            ...(phase2Rebuilt.targetReplacementBook
              ? { targetReplacementBook: phase2Rebuilt.targetReplacementBook }
              : {}),
            chapters: phase2Rebuilt.chapters,
            mediumVariants: phase2Rebuilt.mediumVariants,
          };
          continue;
        }

        const rebuildSpec = OUTDATED_REBUILD_MAP[entryId];

        if (rebuildSpec) {
          map[entryId] = {
            entryId,
            board,
            classLevel,
            classNumber,
            subject,
            shortCode: subjMeta.shortCode,
            track: 'OFFICIAL_BOARD_TEXTBOOK',
            verificationStatus: 'OUTDATED_REBUILD_REQUIRED',
            textbookTitle: base.textbookTitle,
            publisher: base.publisher,
            academicYearEdition: base.academicYearEdition,
            applicableMediums: base.applicableMediums,
            officialSourceUrl,
            verificationNote: rebuildSpec.rebuildReason,
            rebuildReason: rebuildSpec.rebuildReason,
            targetReplacementBook: rebuildSpec.targetReplacementBook,
            chapters: [],
            mediumVariants: buildMediumVariantsForRebuild(entryId, base, rebuildSpec),
          };
          continue;
        }

        if (base.status === 'PASS' && base.chapters.length > 0) {
          const mappedChapters = mapChapters(base);
          map[entryId] = {
            entryId,
            board,
            classLevel,
            classNumber,
            subject,
            shortCode: subjMeta.shortCode,
            track: 'OFFICIAL_BOARD_TEXTBOOK',
            verificationStatus: 'VERIFIED',
            textbookTitle: base.textbookTitle,
            publisher: base.publisher,
            academicYearEdition: base.academicYearEdition,
            applicableMediums: base.applicableMediums,
            officialSourceUrl,
            verificationNote: base.verificationNote,
            chapters: mappedChapters,
            mediumVariants: buildMediumVariantsForVerified(entryId, base, mappedChapters),
          };
          continue;
        }

        const isIcseSchoolBook = board === 'ICSE' && !isEnrichment;
        const status: CentralVerificationStatus = isIcseSchoolBook
          ? 'SCHOOL_TEXTBOOK_DEPENDENT'
          : 'PENDING_VERIFICATION';
        const track: CentralCurriculumTrack = isEnrichment
          ? 'CURRICULAR_ENRICHMENT'
          : isIcseSchoolBook
          ? 'SCHOOL_DEPENDENT'
          : 'OFFICIAL_BOARD_TEXTBOOK';

        map[entryId] = {
          entryId,
          board,
          classLevel,
          classNumber,
          subject,
          shortCode: subjMeta.shortCode,
          track,
          verificationStatus: status,
          textbookTitle: base.textbookTitle,
          publisher: base.publisher,
          academicYearEdition: base.academicYearEdition,
          applicableMediums: base.applicableMediums,
          officialSourceUrl,
          verificationNote: base.verificationNote,
          chapters: [],
          mediumVariants: [],
        };
      }
    }
  }

  return map;
}

export const CENTRAL_SYLLABUS_MAP: Readonly<Record<string, CentralSyllabusEntry>> = Object.freeze(
  buildCentralSyllabusRecords()
);

export const CENTRAL_SYLLABUS_ENTRIES: readonly CentralSyllabusEntry[] = Object.freeze(
  Object.values(CENTRAL_SYLLABUS_MAP)
);
