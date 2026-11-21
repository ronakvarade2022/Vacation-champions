import { EducationBoard } from '../../types';
import type { OnlineWorksheet } from './types';
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

let cachedAllNew690Worksheets: OnlineWorksheet[] | null = null;

export function getAllNew690Worksheets(): OnlineWorksheet[] {
  if (!cachedAllNew690Worksheets) {
    cachedAllNew690Worksheets = [
      ...buildMhC1C2NewWorksheets(),
      ...buildMhC3C4NewWorksheets(),
      ...buildMhC5C6NewWorksheets(),
      ...buildMhC7C8NewWorksheets(),
      ...buildMhC9C10NewWorksheets(),
      ...buildCbseC1C2NewWorksheets(),
      ...buildCbseC3C4NewWorksheets(),
      ...buildCbseC5C6NewWorksheets(),
      ...buildCbseC7C8NewWorksheets(),
      ...buildCbseC9C10NewWorksheets(),
      ...buildIcseC1C2NewWorksheets(),
      ...buildIcseC3C4NewWorksheets(),
      ...buildIcseC5C6NewWorksheets(),
      ...buildIcseC7C8NewWorksheets(),
      ...buildIcseC9C10NewWorksheets(),
    ];
  }
  return cachedAllNew690Worksheets;
}

export function getNew23WorksheetsForClass(
  classLevel: string,
  board: EducationBoard = 'Maharashtra'
): OnlineWorksheet[] {
  return getAllNew690Worksheets().filter(
    ws => ws.board === board && ws.classLevel === classLevel
  );
}

export function getNew23WorksheetsForClassAndSubject(
  classLevel: string,
  subject: string,
  board: EducationBoard = 'Maharashtra'
): OnlineWorksheet[] {
  return getAllNew690Worksheets().filter(
    ws => ws.board === board && ws.classLevel === classLevel && ws.subject === subject
  );
}
