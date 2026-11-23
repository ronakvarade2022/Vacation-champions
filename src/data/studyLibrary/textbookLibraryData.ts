import {
  ClassLevel,
  EducationBoard,
  OfficialTextbookResource,
  SubjectName,
} from '../../types';
import type { InstructionMedium } from '../../types/lessonPlanner';
import {
  ALL_10_CLASSES,
  getSubjectMeta,
  getSubjectsForClass,
} from '../classCurriculumConfig';
import { CBSE_CURRICULUM_BY_CLASS } from '../boards/cbseCurriculumConfig';
import { isVerifiedSyllabusPipelineEnabled } from '../verifiedSyllabus/syllabusFeatureFlags';
import {
  getEffectiveSyllabusForConsumer,
  getSyllabusStatusPresentation,
} from '../../services/centralSyllabusService';
import { getRichChaptersForSubject } from '../worksheets/builders/chapterCatalog';

/**
 * Official Zero-Storage Textbook Library for Classes 1 to 10
 * Supports:
 * 1. Maharashtra State Board (MSBSHSE / Balbharati / Kumarbharati / Lokbharati) -> eBalbharati & DIKSHA
 * 2. CBSE Board (NCERT / NCF-SE) -> NCERT Textbook Portal, ePathshala & DIKSHA
 * 3. ICSE Board (CISCE) -> CISCE Official Curriculum & DIKSHA Portal
 *
 * Uses official government/board textbook portals so 0 MB of Firebase Storage
 * and 0 MB of Hosting.com disk space are consumed by large PDF uploads.
 */

function getClassNum(classLevel: ClassLevel): number {
  return parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
}

function getMaharashtraBookTitle(classNum: number, subject: SubjectName): string {
  if (subject === 'Marathi') {
    return classNum <= 8
      ? `मराठी बालभारती / सुलभभारती (इयत्ता ${classNum})`
      : `मराठी कुमारभारती / अक्षरभारती (इयत्ता ${classNum} - SSC)`;
  }
  if (subject === 'Hindi') {
    return classNum <= 8
      ? `हिंदी सुलभभारती (कक्षा ${classNum})`
      : `हिंदी लोकभारती (कक्षा ${classNum} - SSC)`;
  }
  if (subject === 'English') {
    return classNum <= 8
      ? `My English Book ${classNum} / English Balbharati (Std ${classNum})`
      : `English Kumarbharati (Std ${classNum} - MSBSHSE)`;
  }
  if (subject === 'Mathematics – Algebra') {
    return `Mathematics Part I – Algebra (Std ${classNum} MSBSHSE)`;
  }
  if (subject === 'Mathematics – Geometry') {
    return `Mathematics Part II – Geometry (Std ${classNum} MSBSHSE)`;
  }
  if (subject === 'Science' && classNum >= 9) {
    return `Science and Technology Part 1 & Part 2 (Std ${classNum} MSBSHSE)`;
  }
  if (subject === 'Physics') {
    return `Science & Technology Part 1 – Physics Section (Std ${classNum} MSBSHSE)`;
  }
  if (subject === 'Chemistry') {
    return `Science & Technology Part 1 & 2 – Chemistry Section (Std ${classNum} MSBSHSE)`;
  }
  if (subject === 'Biology') {
    return `Science & Technology Part 2 – Biology & Environment (Std ${classNum} MSBSHSE)`;
  }
  if (subject === 'Environmental Studies' && (classNum === 3 || classNum === 4 || classNum === 5)) {
    return `Environmental Studies (EVS Part 1 & Part 2 – Shivchatrapati) Std ${classNum}`;
  }
  return `Balbharati ${subject} Textbook (Std ${classNum} – Maharashtra State Board)`;
}

function getCbseBookTitle(classLevel: ClassLevel, classNum: number, subject: SubjectName): string {
  const mapped = CBSE_CURRICULUM_BY_CLASS[classLevel]?.textbooks?.[subject];
  if (mapped) return mapped;
  if (subject === 'English') {
    const titles: Record<number, string> = {
      1: 'NCERT Mridang / Marigold – Class 1 English',
      2: 'NCERT Mridang / Marigold – Class 2 English',
      3: 'NCERT Santoor / Marigold – Class 3 English',
      4: 'NCERT Marigold – Class 4 English',
      5: 'NCERT Marigold – Class 5 English',
      6: 'NCERT Poorvi / Honeysuckle – Class 6 English',
      7: 'NCERT Honeycomb & An Alien Hand – Class 7 English',
      8: 'NCERT Honeydew & It So Happened – Class 8 English',
      9: 'NCERT Beehive & Moments – Class 9 English',
      10: 'NCERT First Flight & Footprints Without Feet – Class 10 English',
    };
    return titles[classNum] || `NCERT Class ${classNum} English`;
  }
  if (subject === 'Hindi') {
    const titles: Record<number, string> = {
      1: 'NCERT सारंगी / रिमझिम भाग १ (Class 1 Hindi)',
      2: 'NCERT सारंगी / रिमझिम भाग २ (Class 2 Hindi)',
      3: 'NCERT वीणा / रिमझिम भाग ३ (Class 3 Hindi)',
      4: 'NCERT रिमझिम भाग ४ (Class 4 Hindi)',
      5: 'NCERT रिमझिम भाग ५ (Class 5 Hindi)',
      6: 'NCERT मल्हार / वसंत भाग १ (Class 6 Hindi)',
      7: 'NCERT वसंत भाग २ (Class 7 Hindi)',
      8: 'NCERT वसंत भाग ३ (Class 8 Hindi)',
      9: 'NCERT क्षितिज भाग १ व कृतिका भाग १ (Class 9 Hindi)',
      10: 'NCERT क्षितिज भाग २ व कृतिका भाग २ (Class 10 Hindi)',
    };
    return titles[classNum] || `NCERT Class ${classNum} Hindi`;
  }
  if (subject === 'Mathematics') {
    if (classNum <= 2) return `NCERT Joyful Mathematics / Math-Magic (Class ${classNum})`;
    if (classNum === 3) return `NCERT Maths Mela / Math-Magic (Class 3)`;
    if (classNum === 6) return `NCERT Ganita Prakash / Mathematics (Class 6)`;
    return `NCERT Mathematics Textbook for Class ${classNum}`;
  }
  if (subject === 'Science' && classNum === 6) {
    return `NCERT Curiosity / Science Textbook for Class 6`;
  }
  if (subject === 'Social Science' && classNum === 6) {
    return `NCERT Exploring Society: India and Beyond (Class 6 Social Science)`;
  }
  return `NCERT ${subject} Textbook for Class ${classNum} (CBSE NCF-SE)`;
}

function getIcseBookTitle(classNum: number, subject: SubjectName): string {
  if (classNum >= 9) {
    if (subject === 'English') {
      return `CISCE ICSE Class ${classNum} English Paper 1 (Language) & Paper 2 (Treasure Chest / Julius Caesar)`;
    }
    if (subject === 'Computer Applications') {
      return `CISCE ICSE Class ${classNum} Computer Applications (Java & BlueJ OOP Curriculum)`;
    }
    return `CISCE ICSE Class ${classNum} Prescribed ${subject} Curriculum Textbook`;
  }
  return `CISCE Primary & Middle School Series • Class ${classNum} ${subject}`;
}

export function getOfficialTextbookForSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OfficialTextbookResource {
  const classNum = getClassNum(classLevel);
  const subjMeta = getSubjectMeta(subject, board);
  const useVerifiedPipeline = isVerifiedSyllabusPipelineEnabled(useVerifiedPipelineOverride);
  const centralResolution = useVerifiedPipeline
    ? getEffectiveSyllabusForConsumer({
        board,
        classLevel,
        subject,
        medium,
        useVerifiedPipelineOverride: true,
      })
    : null;
  const chapters = getRichChaptersForSubject(
    board,
    classLevel,
    subject,
    medium,
    useVerifiedPipelineOverride
  );
  const isBlockedPending = Boolean(centralResolution && centralResolution.mode !== 'central_verified');
  const blockedBadgeLabel = centralResolution
    ? getSyllabusStatusPresentation(centralResolution).badgeLabel
    : 'PENDING VERIFICATION';

  if (board === 'CBSE') {
    const defaultTitle = getCbseBookTitle(classLevel, classNum, subject);
    return {
      id: `TB-CBSE-C${classNum}-${subjMeta.shortCode}`,
      board,
      classLevel,
      subject,
      bookTitle: isBlockedPending
        ? `${defaultTitle} [${blockedBadgeLabel}]`
        : centralResolution?.textbookTitle || defaultTitle,
      publisher:
        centralResolution?.publisher ||
        'National Council of Educational Research and Training (NCERT), New Delhi',
      editionYear: isBlockedPending
        ? blockedBadgeLabel
        : centralResolution?.academicYearEdition ||
          '2025–2026 Academic Edition (NEP 2020 / NCF-SE Aligned)',
      mediums: subject === 'Marathi' ? ['Marathi'] : subject === 'Hindi' ? ['Hindi'] : ['English', 'Hindi'],
      officialReadUrl: centralResolution?.officialSourceUrl || 'https://ncert.nic.in/textbook.php',
      officialPortalName: 'NCERT Official e-Textbooks Portal',
      secondaryPortalUrl: 'https://epathshala.nic.in/',
      secondaryPortalName: 'ePathshala / DIKSHA Govt Portal',
      syllabusCode: `CBSE-NCERT-C${classNum}-${subjMeta.shortCode}`,
      totalChapters: chapters.length,
      chapters,
    };
  }

  if (board === 'ICSE') {
    const defaultTitle = getIcseBookTitle(classNum, subject);
    return {
      id: `TB-ICSE-C${classNum}-${subjMeta.shortCode}`,
      board,
      classLevel,
      subject,
      bookTitle: isBlockedPending
        ? `${defaultTitle} [${blockedBadgeLabel}]`
        : centralResolution?.textbookTitle || defaultTitle,
      publisher:
        centralResolution?.publisher ||
        'Council for the Indian School Certificate Examinations (CISCE), New Delhi',
      editionYear: isBlockedPending
        ? blockedBadgeLabel
        : centralResolution?.academicYearEdition || '2025–2026 CISCE Academic Regulations & Syllabus',
      mediums: subject === 'Hindi' ? ['Hindi'] : subject === 'Marathi' ? ['Marathi'] : ['English'],
      officialReadUrl: centralResolution?.officialSourceUrl || 'https://cisce.org/publications/',
      officialPortalName: 'CISCE Official Publications & Syllabus Hub',
      secondaryPortalUrl: 'https://diksha.gov.in/',
      secondaryPortalName: 'DIKSHA National Digital Infrastructure',
      syllabusCode: `CISCE-ICSE-C${classNum}-${subjMeta.shortCode}`,
      totalChapters: chapters.length,
      chapters,
    };
  }

  // Default: Maharashtra State Board (MSBSHSE / Balbharati)
  const defaultTitle = getMaharashtraBookTitle(classNum, subject);
  return {
    id: `TB-MH-C${classNum}-${subjMeta.shortCode}`,
    board: 'Maharashtra',
    classLevel,
    subject,
    bookTitle: isBlockedPending
      ? `${centralResolution?.textbookTitle || defaultTitle} [${blockedBadgeLabel}]`
      : centralResolution?.textbookTitle || defaultTitle,
    publisher:
      centralResolution?.publisher ||
      'Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune',
    editionYear: isBlockedPending
      ? blockedBadgeLabel
      : centralResolution?.academicYearEdition || '2025–2026 MSBSHSE Revised Edition',
    mediums:
      subject === 'Marathi'
        ? ['Marathi']
        : subject === 'Hindi'
        ? ['Hindi']
        : ['English', 'Marathi', 'Hindi'],
    officialReadUrl: centralResolution?.officialSourceUrl || 'https://books.ebalbharati.in/',
    officialPortalName: 'eBalbharati Official Digital Textbook Library',
    secondaryPortalUrl: 'https://diksha.gov.in/maharashtra/',
    secondaryPortalName: 'DIKSHA Maharashtra SCERT Portal',
    syllabusCode: `MSBSHSE-BAL-C${classNum}-${subjMeta.shortCode}`,
    totalChapters: chapters.length,
    chapters,
  };
}

export function getOfficialTextbooksForBoardClass(
  board: EducationBoard,
  classLevel: ClassLevel,
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OfficialTextbookResource[] {
  const subjects = getSubjectsForClass(classLevel, board);
  return subjects.map((subject) =>
    getOfficialTextbookForSubject(board, classLevel, subject, medium, useVerifiedPipelineOverride)
  );
}

export function getAllBoardTextbookSummary(): {
  board: EducationBoard;
  totalClasses: number;
  totalTextbooks: number;
}[] {
  const boards: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];
  return boards.map((board) => {
    let count = 0;
    for (const cls of ALL_10_CLASSES) {
      count += getSubjectsForClass(cls, board).length;
    }
    return {
      board,
      totalClasses: ALL_10_CLASSES.length,
      totalTextbooks: count,
    };
  });
}
