import {
  ClassLevel,
  EducationBoard,
  EducationalVideoLesson,
  SubjectName,
} from '../../types';
import { getSubjectMeta } from '../classCurriculumConfig';
import { getRichChaptersForSubject } from '../worksheets/builders/chapterCatalog';

/**
 * Chapter-Aligned Educational Video Lessons Hub (Zero Storage Overhead)
 * Connects every chapter across Maharashtra State Board, CBSE, and ICSE (Classes 1 to 10)
 * to verified government & open educational portals (DIKSHA, PM eVIDYA / NCERT, eBalbharati, CISCE)
 * alongside structured video lecture outlines and learning objectives.
 */

function getClassNum(classLevel: ClassLevel): number {
  return parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
}

function cleanChapterTitle(raw: string): string {
  return raw
    .replace(/^(Chapter|Unit|Module|Art|पाठ|घटक)\s*[0-9१२३४५६७८९०]+\s*:\s*/i, '')
    .trim();
}

export function getVideoLessonsForSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName
): EducationalVideoLesson[] {
  const cNum = getClassNum(classLevel);
  const subjMeta = getSubjectMeta(subject, board);
  const chapters = getRichChaptersForSubject(board, classLevel, subject);

  return chapters.map((chapterTitle, idx) => {
    const chapterNumber = idx + 1;
    const topic = cleanChapterTitle(chapterTitle);
    const searchKeyword = encodeURIComponent(`${board} Class ${cNum} ${subject} ${topic}`);

    const providerName =
      board === 'CBSE'
        ? 'PM eVIDYA / NCERT Official & DIKSHA'
        : board === 'ICSE'
        ? 'CISCE Curriculum Channel & DIKSHA National'
        : 'SCERT Maharashtra / eBalbharati & DIKSHA';

    const officialVideoPortalUrl =
      board === 'CBSE'
        ? 'https://www.youtube.com/@NCERTOFFICIAL'
        : board === 'ICSE'
        ? 'https://diksha.gov.in/'
        : 'https://diksha.gov.in/maharashtra/';

    const dikshaSearchUrl = `https://diksha.gov.in/explore?key=${searchKeyword}`;
    const durationMin = cNum <= 4 ? 12 + (idx % 6) : 18 + (idx % 10);

    return {
      id: `VID-${board.toUpperCase()}-C${cNum}-${subjMeta.shortCode}-CH${chapterNumber}`,
      board,
      classLevel,
      subject,
      chapterNumber,
      chapterTitle,
      lessonTitle: `Video Lesson ${chapterNumber}: ${topic} (${board} ${classLevel})`,
      durationLabel: `${durationMin} mins`,
      mediums:
        board === 'Maharashtra'
          ? ['English', 'Marathi', 'Hindi']
          : board === 'CBSE'
          ? ['English', 'Hindi']
          : ['English'],
      providerName,
      officialVideoPortalUrl,
      dikshaSearchUrl,
      ncertVideoUrl: `https://www.youtube.com/@NCERTOFFICIAL/search?query=${searchKeyword}`,
      learningObjectives: [
        `Visualise the core foundational concept of "${topic}" using animated real-life examples.`,
        `Master textbook definitions, rules, or formulas required for ${board} Class ${cNum} ${subject}.`,
        `Follow guided problem walkthroughs and avoid common exam mistakes.`,
      ],
      lessonOutline: [
        `00:00 – 03:00 | Chapter Warm-up & Real-Life Motivation for ${topic}`,
        `03:00 – 09:00 | Core Concept Visual Explanation & Step-by-Step Rules`,
        `09:00 – 14:00 | Solved Textbook Examples & Diagram Walkthrough`,
        `14:00 – ${durationMin}:00 | Quick Exam Recap & Top Scoring Tips`,
      ],
      keyTakeaway: `Watch this ${durationMin}-minute structured lesson via ${providerName}, then immediately solve the Chapter Practice Test inside MyStudyZone to lock in 90%+ mastery.`,
    };
  });
}
