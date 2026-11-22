import { ClassLevel, EducationBoard } from '../../types';
import type { InstructionMedium } from '../../types/lessonPlanner';
import { ALL_10_CLASSES } from '../classCurriculumConfig';
import { isVerifiedSyllabusPipelineEnabled } from '../verifiedSyllabus/syllabusFeatureFlags';
import type { OnlineWorksheet } from './types';
import { buildAll23NewWorksheetsForClass } from './builders/worksheetFactory';
import { buildMhC1C2NewWorksheets } from './mhC1C2';
import { buildMhC3C4NewWorksheets } from './mhC3C4';
import { buildMhC5C6NewWorksheets } from './mhC5C6';
import { buildMhC7C8NewWorksheets } from './mhC7C8';
import { buildMhC9C10NewWorksheets } from './mhC9C10';
import { buildCbseC1C2NewWorksheets } from './cbseC1C2';
import { buildCbseC3C4NewWorksheets } from './cbseC3C4';
import { buildCbseC5C6NewWorksheets } from './cbseC5C6';
import { buildCbseC7C8NewWorksheets } from './cbseC7C8';
import { buildCbseC9C10NewWorksheets } from './cbseC9C10';
import { buildIcseC1C2NewWorksheets } from './icseC1C2';
import { buildIcseC3C4NewWorksheets } from './icseC3C4';
import { buildIcseC5C6NewWorksheets } from './icseC5C6';
import { buildIcseC7C8NewWorksheets } from './icseC7C8';
import { buildIcseC9C10NewWorksheets } from './icseC9C10';

export * from './types';

const classPairSeedCache = new Map<string, OnlineWorksheet[]>();
const expandedClassCache = new Map<string, OnlineWorksheet[]>();

function getSeedPairWorksheets(board: EducationBoard, cNum: number): OnlineWorksheet[] {
  const pairKey = `${board}__${cNum <= 2 ? '1_2' : cNum <= 4 ? '3_4' : cNum <= 6 ? '5_6' : cNum <= 8 ? '7_8' : '9_10'}`;
  const cached = classPairSeedCache.get(pairKey);
  if (cached) return cached;

  let built: OnlineWorksheet[] = [];
  if (board === 'Maharashtra') {
    built =
      cNum <= 2
        ? buildMhC1C2NewWorksheets()
        : cNum <= 4
          ? buildMhC3C4NewWorksheets()
          : cNum <= 6
            ? buildMhC5C6NewWorksheets()
            : cNum <= 8
              ? buildMhC7C8NewWorksheets()
              : buildMhC9C10NewWorksheets();
  } else if (board === 'CBSE') {
    built =
      cNum <= 2
        ? buildCbseC1C2NewWorksheets()
        : cNum <= 4
          ? buildCbseC3C4NewWorksheets()
          : cNum <= 6
            ? buildCbseC5C6NewWorksheets()
            : cNum <= 8
              ? buildCbseC7C8NewWorksheets()
              : buildCbseC9C10NewWorksheets();
  } else {
    built =
      cNum <= 2
        ? buildIcseC1C2NewWorksheets()
        : cNum <= 4
          ? buildIcseC3C4NewWorksheets()
          : cNum <= 6
            ? buildIcseC5C6NewWorksheets()
            : cNum <= 8
              ? buildIcseC7C8NewWorksheets()
              : buildIcseC9C10NewWorksheets();
  }

  classPairSeedCache.set(pairKey, built);
  return built;
}

export function getNew23WorksheetsForClass(
  classLevel: string,
  board: EducationBoard = 'Maharashtra',
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OnlineWorksheet[] {
  const normalizedBoard: EducationBoard = board === 'CBSE' ? 'CBSE' : board === 'ICSE' ? 'ICSE' : 'Maharashtra';
  const cNum = parseInt(String(classLevel).replace('Class ', ''), 10) || 1;
  const safeClass = (`Class ${Math.min(10, Math.max(1, cNum))}`) as ClassLevel;
  const flagEnabled = isVerifiedSyllabusPipelineEnabled(useVerifiedPipelineOverride);
  const cacheKey = `${flagEnabled ? 'central' : 'legacy'}__${medium || 'default'}__${normalizedBoard}__${safeClass}`;

  const cached = expandedClassCache.get(cacheKey);
  if (cached) return cached;

  const seedForClass = getSeedPairWorksheets(normalizedBoard, cNum).filter(
    (ws) => ws.board === normalizedBoard && ws.classLevel === safeClass
  );
  const fullClassSheets = buildAll23NewWorksheetsForClass(
    normalizedBoard,
    safeClass,
    seedForClass,
    medium,
    useVerifiedPipelineOverride
  );
  expandedClassCache.set(cacheKey, fullClassSheets);
  return fullClassSheets;
}

export function getNew23WorksheetsForClassAndSubject(
  classLevel: string,
  subject: string,
  board: EducationBoard = 'Maharashtra',
  medium?: InstructionMedium,
  useVerifiedPipelineOverride?: boolean
): OnlineWorksheet[] {
  return getNew23WorksheetsForClass(
    classLevel,
    board,
    medium,
    useVerifiedPipelineOverride
  ).filter((ws) => ws.subject === subject);
}

let cachedAllNewWorksheets: OnlineWorksheet[] | null = null;

export function getAllNew690Worksheets(): OnlineWorksheet[] {
  if (!cachedAllNewWorksheets) {
    const all: OnlineWorksheet[] = [];
    for (const board of ['Maharashtra', 'CBSE', 'ICSE'] as const) {
      for (const cls of ALL_10_CLASSES) {
        all.push(...getNew23WorksheetsForClass(cls, board));
      }
    }
    cachedAllNewWorksheets = all;
  }
  return cachedAllNewWorksheets;
}

