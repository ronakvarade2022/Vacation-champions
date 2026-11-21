import { ClassLevel, EducationBoard, SubjectName } from '../../../types';
import { getSubjectsForClass, getSubjectMeta } from '../../classCurriculumConfig';
import { getCurriculumQuestionsForLevel } from '../../../services/curriculumQuestionBank';
import {
  OnlineWorksheet,
  WorksheetItemFormat,
  WorksheetDifficultyLevel,
  WorksheetQuestionItem,
  CompactWorksheetQuestionSpec,
  WORKSHEET_FORMAT_LABELS,
} from '../types';
import {
  PATTERN_MIXES_23,
  getDifficultyForWorksheetNumber,
  getClassNumber,
  getBoardSyllabusLabel,
  getRichChaptersForSubject,
} from './chapterCatalog';
import { generateMathQuestionForSlot } from './mathGenerator';
import { generateLanguageQuestionForSlot } from './languageGenerator';
import { generateScienceEvsQuestionForSlot } from './scienceEvsGenerator';
import { generateSocialHumanitiesQuestionForSlot } from './socialHumanitiesGenerator';
import { generateSkillTechReasoningQuestionForSlot } from './skillTechReasoningGenerator';

/**
 * Unambiguous subject code map so subjects with long shared prefixes
 * (e.g., Environmental Studies vs Environmental Education) never collide in worksheet IDs.
 */
const UNIQUE_SUBJ_ID_CODE: Record<SubjectName, string> = {
  'Mathematics': 'MATHEMATICS',
  'English': 'ENGLISH',
  'Hindi': 'HINDI',
  'Marathi': 'MARATHI',
  'Science': 'SCIENCE',
  'General Knowledge': 'GENERALKNOWL',
  'Social Studies': 'SOCIALSTUDIE',
  'History': 'HISTORY',
  'Geography': 'GEOGRAPHY',
  'Computer Knowledge': 'COMPUTERKNOW',
  'Logical Reasoning': 'LOGICALREASO',
  'Environmental Studies': 'ENVSTUDIES',
  'Moral Education': 'MORALEDUCATI',
  'Vocabulary and Grammar': 'VOCABULARYAN',
  'Drawing and Creative Activities': 'DRAWINGANDCR',
  'Physics': 'PHYSICS',
  'Chemistry': 'CHEMISTRY',
  'Biology': 'BIOLOGY',
  'Political Science': 'POLITICALSCI',
  'Information Technology': 'INFORMATIONT',
  'Environmental Education': 'ENVEDUCATION',
  'Physical Education': 'PHYSICALEDUC',
  'Mathematics – Algebra': 'MATHALGEBRA',
  'Mathematics – Geometry': 'MATHGEOMETRY',
  'Social Science': 'SOCIALSCIENC',
  'History & Civics': 'HISTORYCIVIC',
  'Computer Studies': 'COMPUTERSTUD',
  'Computer Applications': 'COMPUTERAPPL',
  'Economics': 'ECONOMICS',
  'Commercial Studies': 'COMMERCIALST',
  'Sanskrit': 'SANSKRIT',
};

const DEFAULT_INSTRUCTIONS: Record<WorksheetDifficultyLevel, string[]> = {
  Foundation: [
    'Read each question carefully and use the written scratchpad where provided to note key steps.',
    'Attempt all objective, fill-in-the-blank, matching, and visual questions carefully.',
    'Submit online to review instant marks and detailed concept explanations.',
  ],
  Intermediate: [
    'Show working steps or concise structured responses in the practice box before locking your answer.',
    'Pay close attention to units, grammar rules, and sequence order across mixed question patterns.',
    'Submit online to unlock model answers and reinforce chapter mastery.',
  ],
  Advanced: [
    'Analyse statements, diagrams, and real-world scenarios carefully before choosing the verified response.',
    'Use the written explanation box to structure multi-step reasoning and calculations.',
    'Complete all questions to earn full marks and review detailed step-by-step solutions.',
  ],
  HOTS: [
    'Apply higher-order thinking, assertion-reasoning logic, and cross-concept synthesis.',
    'Read case-study extracts thoroughly before answering competency-based items.',
    'Record your reasoning trace in the written space and submit online for complete evaluation.',
  ],
};

function generateDomainSpec(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  wsNum: number,
  qIdx: number,
  format: WorksheetItemFormat,
  chapterName: string
): CompactWorksheetQuestionSpec {
  if (
    subject === 'Mathematics' ||
    subject === 'Mathematics – Algebra' ||
    subject === 'Mathematics – Geometry'
  ) {
    return generateMathQuestionForSlot(board, classLevel, subject, wsNum, qIdx, format, chapterName);
  }
  if (
    subject === 'English' ||
    subject === 'Vocabulary and Grammar' ||
    subject === 'Hindi' ||
    subject === 'Marathi' ||
    subject === 'Sanskrit'
  ) {
    return generateLanguageQuestionForSlot(board, classLevel, subject, wsNum, qIdx, format, chapterName);
  }
  if (
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology' ||
    subject === 'Environmental Studies' ||
    subject === 'Environmental Education'
  ) {
    return generateScienceEvsQuestionForSlot(board, classLevel, subject, wsNum, qIdx, format, chapterName);
  }
  if (
    subject === 'Computer Knowledge' ||
    subject === 'Computer Studies' ||
    subject === 'Computer Applications' ||
    subject === 'Information Technology' ||
    subject === 'Logical Reasoning' ||
    subject === 'Drawing and Creative Activities' ||
    subject === 'Physical Education'
  ) {
    return generateSkillTechReasoningQuestionForSlot(board, classLevel, subject, wsNum, qIdx, format, chapterName);
  }
  return generateSocialHumanitiesQuestionForSlot(board, classLevel, subject, wsNum, qIdx, format, chapterName);
}

/**
 * Ensures any `(board, classLevel, subject)` has EXACTLY 23 NEW (`new_23`) worksheets:
 * 1) Preserves any hand-crafted `new_23` sheets first (keeping their original IDs intact).
 * 2) Synthesizes remaining sheets cleanly up to 23 using all syllabus chapters,
 *    23 distinct question-pattern combinations, unused level 1-4 curriculum items,
 *    and domain-specific parametric + concept banks.
 */
export function buildComplete23NewWorksheetsForClassSubject(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  seedHandcraftedForSubject: OnlineWorksheet[],
  usedIdsInClass: Set<string>
): OnlineWorksheet[] {
  const cNum = getClassNumber(classLevel);
  const boardCode = board === 'CBSE' ? 'CBSE' : board === 'ICSE' ? 'ICSE' : 'MH';
  const boardPrefix = getBoardSyllabusLabel(board, cNum);
  const subjMeta = getSubjectMeta(subject, board);
  const chapters = getRichChaptersForSubject(board, classLevel, subject);

  // Preserve hand-crafted worksheets for this subject first (up to 23), keeping their original IDs intact
  const result: OnlineWorksheet[] = seedHandcraftedForSubject.slice(0, 23).map((ws, idx) => {
    usedIdsInClass.add(ws.id);
    return {
      ...ws,
      board,
      classLevel,
      subject,
      worksheetCollection: 'new_23',
      worksheetNumber: idx + 1,
    };
  });

  if (result.length >= 23) {
    return result;
  }

  // Pull the 20 UNUSED questions (indices 5..9 of Levels 1..4) that Existing Set #1/#2 did not use
  const unusedCurriculumPool = [
    ...getCurriculumQuestionsForLevel(classLevel, subject, 1, board).slice(5, 10),
    ...getCurriculumQuestionsForLevel(classLevel, subject, 2, board).slice(5, 10),
    ...getCurriculumQuestionsForLevel(classLevel, subject, 3, board).slice(5, 10),
    ...getCurriculumQuestionsForLevel(classLevel, subject, 4, board).slice(5, 10),
  ];

  const subjCode =
    UNIQUE_SUBJ_ID_CODE[subject] ||
    subject.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 12);

  for (let wsNum = result.length + 1; wsNum <= 23; wsNum++) {
    let candidateId = `WS-NEW-${boardCode}-C${cNum}-${subjCode}-${wsNum}`;
    let bump = wsNum;
    while (usedIdsInClass.has(candidateId)) {
      bump += 100;
      candidateId = `WS-NEW-${boardCode}-C${cNum}-${subjCode}-${bump}`;
    }
    usedIdsInClass.add(candidateId);

    const chapterName =
      wsNum <= 19
        ? chapters[(wsNum - 1) % chapters.length]
        : wsNum <= 21
          ? `Multi-Chapter Integration: ${chapters[(wsNum - 1) % chapters.length]} & Revision`
          : `Full-Syllabus Competency & HOTS Mastery: ${subject} (${classLevel})`;

    const difficultyLevel = getDifficultyForWorksheetNumber(wsNum);
    const patternMix = PATTERN_MIXES_23[(wsNum - 1) % PATTERN_MIXES_23.length];
    const formatsSet = new Set<WorksheetItemFormat>();
    const questions: WorksheetQuestionItem[] = [];
    let totalMarks = 0;

    for (let qIdx = 0; qIdx < 6; qIdx++) {
      const fmt = patternMix[qIdx];
      formatsSet.add(fmt);
      const fmtMeta = WORKSHEET_FORMAT_LABELS[fmt];

      // Use one unused board+class curriculum question on qIdx === 0 for worksheets #1..#20
      const currItem =
        qIdx === 0 && wsNum <= unusedCurriculumPool.length
          ? unusedCurriculumPool[wsNum - 1]
          : null;

      let spec: CompactWorksheetQuestionSpec;
      if (currItem && currItem.options && currItem.options.length >= 4) {
        const cleanQ = currItem.questionText.replace(/^\[.*?\]\s*/, '').trim();
        spec = {
          f: fmt,
          c: currItem.topic || chapterName,
          q: cleanQ,
          o: [currItem.options[0], currItem.options[1], currItem.options[2], currItem.options[3]],
          a: (currItem.correctIndex % 4) as 0 | 1 | 2 | 3,
          e: currItem.explanation,
          m: fmt === 'long_answer' || fmt === 'case_based' || fmt === 'hots' ? 3 : 2,
        };
      } else {
        spec = generateDomainSpec(board, classLevel, subject, wsNum, qIdx, fmt, chapterName);
      }

      const marks = spec.m ?? (fmt === 'long_answer' || fmt === 'case_based' || fmt === 'hots' ? 3 : 2);
      totalMarks += marks;

      questions.push({
        id: `${candidateId}-Q${qIdx + 1}`,
        number: qIdx + 1,
        format: fmt,
        chapterTitle: spec.c || chapterName,
        prompt: `${fmtMeta.label}: ${spec.q}`.startsWith(fmtMeta.label)
          ? spec.q
          : spec.q,
        options: spec.o,
        correctIndex: spec.a,
        modelWrittenAnswer: spec.w || `${spec.o[spec.a]} — ${spec.e}`,
        explanation: spec.e,
        marks,
      });
    }

    const durationMinutes =
      difficultyLevel === 'HOTS' ? 25 : difficultyLevel === 'Advanced' ? 22 : 18;

    const shortBoard = board === 'Maharashtra' ? '' : `${board} `;
    result.push({
      id: candidateId,
      board,
      classLevel,
      subject,
      worksheetNumber: wsNum,
      worksheetCollection: 'new_23',
      title: `${shortBoard}Std ${cNum} ${subject} – Practice Set #${wsNum}: ${chapterName.replace(/^Chapter \d+:\s*|^Unit \d+:\s*|^पाठ [१-९]+:\s*|^घटक [१-९]+:\s*|^Module \d+:\s*/i, '')}`,
      marathiSubtitle:
        board === 'Maharashtra'
          ? `${subjMeta.marathiName} • ${classLevel} • कार्यपत्रिका #${wsNum} (${difficultyLevel})`
          : `${boardPrefix} • ${classLevel} ${subject} • Worksheet #${wsNum} (${difficultyLevel})`,
      chapterName,
      topic: chapterName,
      learningObjectives: [
        `Master core concepts from ${chapterName} under ${boardPrefix}`,
        `Apply ${Array.from(formatsSet).slice(0, 3).map((f) => WORKSHEET_FORMAT_LABELS[f].label).join(', ')} question patterns accurately`,
      ],
      instructions: DEFAULT_INSTRUCTIONS[difficultyLevel],
      difficultyLevel,
      durationMinutes,
      totalMarks,
      isDemo: false,
      formatsIncluded: Array.from(formatsSet),
      questions,
    });
  }

  return result;
}

export function buildAll23NewWorksheetsForClass(
  board: EducationBoard,
  classLevel: ClassLevel,
  handcraftedClassSheets: OnlineWorksheet[]
): OnlineWorksheet[] {
  const subjects = getSubjectsForClass(classLevel, board);
  const bySubject = new Map<SubjectName, OnlineWorksheet[]>();
  const usedIdsInClass = new Set<string>();

  for (const ws of handcraftedClassSheets) {
    const arr = bySubject.get(ws.subject) || [];
    arr.push(ws);
    bySubject.set(ws.subject, arr);
    usedIdsInClass.add(ws.id);
  }

  const allForClass: OnlineWorksheet[] = [];
  for (const subj of subjects) {
    const seed = bySubject.get(subj) || [];
    allForClass.push(
      ...buildComplete23NewWorksheetsForClassSubject(
        board,
        classLevel,
        subj,
        seed,
        usedIdsInClass
      )
    );
  }
  return allForClass;
}
