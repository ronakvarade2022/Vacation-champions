import { TetCtetQuestionPattern } from '../../types/tetCtet';

export interface CuratedTrilingualMcq {
  topic: string;
  pattern: TetCtetQuestionPattern;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Pedagogical HOTS';
  en: { q: string; opts: [string, string, string, string]; exp: string };
  mr: { q: string; opts: [string, string, string, string]; exp: string };
  hi: { q: string; opts: [string, string, string, string]; exp: string };
}

export interface CuratedLangPassageItem {
  title: string;
  genre: 'Prose' | 'Poetry';
  text: string;
  questions: Array<{
    topic: string;
    difficulty: 'Easy' | 'Moderate' | 'Difficult';
    q: string;
    opts: [string, string, string, string];
    exp: string;
  }>;
}

export interface CuratedLangMcqItem {
  topic: string;
  pattern: TetCtetQuestionPattern;
  difficulty: 'Easy' | 'Moderate' | 'Difficult' | 'Pedagogical HOTS';
  q: string;
  opts: [string, string, string, string];
  exp: string;
}
