export type MsceMedium = 'English' | 'Marathi' | 'Hindi';
export type MsceQuestionDifficulty = 'Easy' | 'Medium' | 'Difficult';
export type MsceStdLevel = 'Std 4th' | 'Std 7th';
export type MscePaperNumber = 1 | 2;

export interface MsceQuestionVerification {
  greenVerified: boolean;
  verifiedAt: string;
  checks: {
    structureValid: boolean;
    fourDistinctOptions: boolean;
    answerKeyValid: boolean;
    computationAndGrammarValid: boolean;
    syllabusAligned: boolean;
    zeroDuplicate: boolean;
  };
  failureReasons: string[];
}

export interface MsceMockQuestion {
  id: string;
  questionNumber: number; // 1 to 75
  stdLevel: MsceStdLevel;
  mockTestNumber: number; // 1 to 25
  paperNumber: MscePaperNumber; // 1 or 2
  section: 'First Language' | 'Mathematics' | 'Second Language' | 'Intelligence Test';
  subjectLabel: string;
  languageRendered: MsceMedium;
  topic: string;
  difficulty: MsceQuestionDifficulty;
  marks: number; // 2 marks per question
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0 to 3
  explanation: string;
  translations: {
    English: {
      question: string;
      options: [string, string, string, string];
      explanation: string;
    };
    Marathi: {
      question: string;
      options: [string, string, string, string];
      explanation: string;
    };
    Hindi: {
      question: string;
      options: [string, string, string, string];
      explanation: string;
    };
  };
  normalizedHash: string;
  isCustomOverride?: boolean;
  verification?: MsceQuestionVerification;
}

export function normalizeQuestionText(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .trim();
}

export function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export function simplifyFraction(num: number, den: number): [number, number] {
  if (den === 0) return [num, 1];
  const sign = den < 0 ? -1 : 1;
  const g = gcd(Math.abs(num), Math.abs(den));
  return [(num * sign) / g, Math.abs(den) / g];
}

export function formatFraction(num: number, den: number): string {
  const [sn, sd] = simplifyFraction(num, den);
  return sd === 1 ? `${sn}` : `${sn}/${sd}`;
}

export function getDifficultyFor50Section(
  qIndexZeroBased: number,
  mockTestNumber: number
): MsceQuestionDifficulty {
  const rotated = (qIndexZeroBased + mockTestNumber * 3) % 50;
  if (rotated < 15) return 'Easy';
  if (rotated < 35) return 'Medium';
  return 'Difficult';
}

export function makeNumericOptions(
  correctValue: number,
  deltas: [number, number, number],
  correctIdx: number,
  prefix = '',
  suffix = '',
  allowNonPositive = false
): [string, string, string, string] {
  const wrongVals: number[] = [];
  for (const d of deltas) {
    let candidate = Number((correctValue + d).toFixed(4));
    let bump = 1;
    while (
      (!allowNonPositive && candidate <= 0) ||
      candidate === correctValue ||
      wrongVals.includes(candidate)
    ) {
      candidate = Number((correctValue + Math.abs(d || 2) + bump + wrongVals.length * 2).toFixed(4));
      bump++;
    }
    wrongVals.push(candidate);
  }
  const result: string[] = ['', '', '', ''];
  result[correctIdx] = `${prefix}${correctValue}${suffix}`;
  let wPtr = 0;
  for (let i = 0; i < 4; i++) {
    if (i !== correctIdx) {
      result[i] = `${prefix}${wrongVals[wPtr++]}${suffix}`;
    }
  }
  return result as [string, string, string, string];
}

export function placeStringOptions(
  correctText: string,
  wrongs: [string, string, string],
  correctIdx: number
): [string, string, string, string] {
  const used = new Set<string>([correctText.trim()]);
  const cleanWrongs: string[] = [];
  for (let i = 0; i < 3; i++) {
    let cand = (wrongs[i] || '').trim();
    let suffixIdx = 1;
    while (!cand || used.has(cand)) {
      cand = `${wrongs[i] || 'Option'} (${suffixIdx++})`;
    }
    used.add(cand);
    cleanWrongs.push(cand);
  }
  const result: string[] = ['', '', '', ''];
  result[correctIdx] = correctText;
  let wPtr = 0;
  for (let i = 0; i < 4; i++) {
    if (i !== correctIdx) {
      result[i] = cleanWrongs[wPtr++];
    }
  }
  return result as [string, string, string, string];
}

export interface RawGeneratedQuestion {
  topic: string;
  enQ: string;
  mrQ: string;
  hiQ: string;
  enOpts: [string, string, string, string];
  mrOpts: [string, string, string, string];
  hiOpts: [string, string, string, string];
  enExp: string;
  mrExp: string;
  hiExp: string;
}

export function toRomanNumeral(num: number): string {
  const table: Array<[number, string]> = [
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let n = Math.max(1, Math.min(399, Math.floor(num)));
  let out = '';
  for (const [val, sym] of table) {
    while (n >= val) {
      out += sym;
      n -= val;
    }
  }
  return out;
}
