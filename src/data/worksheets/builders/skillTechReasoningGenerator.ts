import { ClassLevel, EducationBoard, SubjectName } from '../../../types';
import { CompactWorksheetQuestionSpec, WorksheetItemFormat } from '../types';
import { getClassNumber, getStageBand, getBoardSyllabusLabel } from './chapterCatalog';

type SkillQ = {
  q: string;
  o: [string, string, string, string];
  a: 0 | 1 | 2 | 3;
  e: string;
};

function placeCorrect(
  correct: string,
  distractors: [string, string, string],
  targetIdx: 0 | 1 | 2 | 3
): { o: [string, string, string, string]; a: 0 | 1 | 2 | 3 } {
  const arr = [...distractors];
  arr.splice(targetIdx, 0, correct);
  return { o: [arr[0], arr[1], arr[2], arr[3]], a: targetIdx };
}

function rotateQ(item: SkillQ, shift: number, format: WorksheetItemFormat, c: string): CompactWorksheetQuestionSpec {
  const s = shift % 4;
  const map = [0, 1, 2, 3].map((i) => (i + s) % 4);
  const o: [string, string, string, string] = [
    item.o[map[0]],
    item.o[map[1]],
    item.o[map[2]],
    item.o[map[3]],
  ];
  const a = map.indexOf(item.a) as 0 | 1 | 2 | 3;
  return { f: format, c, q: item.q, o, a, e: item.e };
}

const COMP_TECH_BANK: Record<'early' | 'upper_primary' | 'middle' | 'secondary', SkillQ[]> = {
  early: [
    { q: 'Which computer part looks like a television screen and displays pictures and words?', o: ['Keyboard', 'Monitor', 'Mouse', 'Speaker'], a: 1, e: 'A monitor is the visual output screen of a computer.' },
    { q: 'Which device is known as the "Brain of the Computer"?', o: ['Printer', 'CPU (Central Processing Unit)', 'Joystick', 'Webcam'], a: 1, e: 'The CPU processes all instructions and calculations.' },
    { q: 'Which key on the keyboard creates a blank space between two words?', o: ['Enter Key', 'Spacebar Key', 'Shift Key', 'Esc Key'], a: 1, e: 'The long Spacebar key inserts a space between words.' },
    { q: 'Which device lets us print drawings and homework onto paper?', o: ['Scanner', 'Printer', 'Microphone', 'Speaker'], a: 1, e: 'A printer creates hard-copy paper output.' },
    { q: 'True or False: Sitting upright at eye level with the monitor protects our eyes and back.', o: ['True', 'False', 'Only for teachers', 'Never needed'], a: 0, e: 'Good posture prevents eye and neck strain.' },
    { q: 'Odd one out among computer input parts: Keyboard, Mouse, Microphone, Monitor.', o: ['Keyboard', 'Mouse', 'Microphone', 'Monitor'], a: 3, e: 'Monitor is an output device while Keyboard, Mouse, and Microphone give input.' },
  ],
  upper_primary: [
    { q: 'What are the three stages of the fundamental computer working cycle (IPO)?', o: ['Internet – Paint – Output', 'Input – Processing – Output', 'Install – Print – Open', 'Integer – Program – Order'], a: 1, e: 'Computers receive Input, Process it in the CPU, and produce Output.' },
    { q: 'Which memory loses all unsaved data the moment electric power is switched off (volatile memory)?', o: ['Hard Disk', 'Pen Drive', 'RAM (Random Access Memory)', 'DVD'], a: 2, e: 'RAM is temporary volatile working memory; ROM and disks are non-volatile.' },
    { q: 'In Windows/Linux Desktop, what is a named container used to organise related documents and photos?', o: ['Cursor', 'Folder (Directory)', 'Pixel', 'Modem'], a: 1, e: 'Folders group related files neatly.' },
    { q: 'Which shortcut key combination saves your document quickly in word processors?', o: ['Ctrl + P', 'Ctrl + S', 'Ctrl + X', 'Ctrl + Z'], a: 1, e: 'Ctrl + S saves changes; Ctrl + Z undoes the last edit.' },
    { q: 'What is safe cyber behaviour if a stranger online asks for your home address or school password?', o: ['Send it immediately', 'Never share personal details or passwords and tell parents/teachers', 'Post it publicly', 'Click unknown prize links'], a: 1, e: 'Keeping passwords and personal identity private prevents cyber harm.' },
    { q: 'What do you call a step-by-step finite set of instructions written to solve a task?', o: ['Monitor', 'Algorithm', 'Firewall', 'Pixel'], a: 1, e: 'An algorithm is an ordered step-by-step solution method.' },
  ],
  middle: [
    { q: 'Which HTML5 tag pair creates the largest main heading on a webpage?', o: ['<p> ... </p>', '<h1> ... </h1>', '<title> ... </title>', '<img>'], a: 1, e: '<h1> defines the highest-level webpage heading (down to <h6>).' },
    { q: 'In Spreadsheets (Calc/Excel), every formula must begin with which symbol?', o: ['#', '=', '@', '$'], a: 1, e: 'Formulas like =SUM(A1:A5) always start with the "=" sign.' },
    { q: 'Which software acts as an Operating System managing hardware, memory, and applications?', o: ['MS PowerPoint', 'Linux Ubuntu / Microsoft Windows', 'Adobe Reader', 'Scratch'], a: 1, e: 'Windows, macOS, Linux, and Android are Operating Systems.' },
    { q: 'How does "Phishing" attack careless internet users?', o: ['Cleaning computer fans', 'Sending fake look-alike emails/links to steal OTPs or passwords', 'Upgrading RAM', 'Compressing images'], a: 1, e: 'Phishing uses deceptive messages pretending to be banks or trusted services.' },
    { q: 'Arrange computer memory units in ascending order (smallest to largest): Byte, Kilobyte, Megabyte, Gigabyte.', o: ['GB < MB < KB < Byte', 'Byte < KB < MB < GB', 'KB < Byte < GB < MB', 'Byte < MB < KB < GB'], a: 1, e: '1 KB = 1024 Bytes, 1 MB = 1024 KB, 1 GB = 1024 MB.' },
    { q: 'In ICSE BlueJ / Java basics, which data type stores whole integers without decimals?', o: ['double', 'int', 'char', 'boolean'], a: 1, e: '"int" stores 32-bit signed integers.' },
  ],
  secondary: [
    { q: 'In Java OOP (ICSE Computer Applications), what binds data members and methods together inside a class while restricting direct access?', o: ['Recursion', 'Encapsulation', 'Linear Search', 'Type Casting'], a: 1, e: 'Encapsulation wraps variables and methods into a single unit with access modifiers.' },
    { q: 'In SQL (Relational Databases), which command retrieves rows matching a condition from table "Students"?', o: ['INSERT INTO Students ...', 'SELECT * FROM Students WHERE ...', 'DROP TABLE Students;', 'COMMIT;'], a: 1, e: 'SELECT queries retrieve filtered records from a relational table.' },
    { q: 'What is the output of Java expression Math.sqrt(64) + Math.pow(3, 2)?', o: ['14.0', '17.0', '15.0', '18.0'], a: 1, e: 'Math.sqrt(64) = 8.0 and Math.pow(3, 2) = 9.0; 8.0 + 9.0 = 17.0.' },
    { q: 'In Binary Search on a sorted array of N elements, how does the algorithm narrow the search space each step?', o: ['Scans 1 element at a time', 'Compares the middle element and halves the search interval repeatedly', 'Sorts the array again', 'Checks only the first two indices'], a: 1, e: 'Binary search cuts the sorted search range in half at every comparison (O(log N)).' },
    { q: 'Which network protocol securely encrypts web communication between browser and server (green padlock)?', o: ['HTTP (plain)', 'HTTPS (HTTP over TLS/SSL)', 'FTP (unencrypted)', 'Telnet'], a: 1, e: 'HTTPS uses TLS/SSL encryption to protect data in transit.' },
    { q: 'In CSS styling, which property changes the text colour of an HTML paragraph?', o: ['background-size', 'color', 'border-radius', 'font-weight'], a: 1, e: 'CSS "color" sets foreground text colour.' },
  ],
};

const DRAWING_ART_BANK: SkillQ[] = [
  { q: 'Which three colours are known as the Traditional Primary Colours in painting?', o: ['Green, Orange, Violet', 'Red, Yellow, and Blue', 'Black, White, Grey', 'Pink, Brown, Cyan'], a: 1, e: 'Primary colours (Red, Yellow, Blue) cannot be mixed from other pigments and create secondary colours.' },
  { q: 'What secondary colour is obtained when you mix equal amounts of Yellow and Blue paint?', o: ['Orange', 'Green', 'Purple', 'Brown'], a: 1, e: 'Yellow + Blue produces Green.' },
  { q: 'Warli folk painting—famous across Palghar & Thane in Maharashtra—traditionally uses which geometric shapes for figures?', o: ['3D cubes only', 'Two triangles joined at their tips + a circle head on mud walls', 'Octagons', 'Only straight vertical lines'], a: 1, e: 'Warli artists form expressive human and animal dancers using circles, triangles, and lines with rice paste.' },
  { q: 'What does "Warm Colours" refer to in an artist’s colour wheel?', o: ['Blue, Green, Violet', 'Red, Orange, and Yellow (resembling fire and sunshine)', 'Only Black and White', 'Silver and Grey'], a: 1, e: 'Red, orange, and yellow convey warmth, sunlight, and energy.' },
  { q: 'In pencil shading, what technique builds smooth dark tones using intersecting criss-cross parallel lines?', o: ['Eraser rubbing', 'Cross-hatching', 'Paper folding', 'Thumb stamping'], a: 1, e: 'Cross-hatching layers angled parallel strokes for tonal depth.' },
  { q: 'In One-Point Perspective landscape drawing, where do parallel railway tracks or roads appear to meet on the horizon?', o: ['Foreground corner', 'Vanishing Point', 'Colour Palette', 'Paper Border'], a: 1, e: 'Parallel lines receding away converge at the Vanishing Point on the eye-level horizon line.' },
  { q: 'What do we call two parts of a butterfly or Rangoli pattern that match identically on both sides of a central line?', o: ['Asymmetry', 'Bilateral Symmetry', 'Scribbling', 'Perspective blur'], a: 1, e: 'Bilateral symmetry mirrors equal shapes across an axis.' },
  { q: 'Which traditional Japanese paper-folding art creates cranes, boats, and geometric animals without glue or scissors?', o: ['Calligraphy', 'Origami', 'Mosaic', 'Pottery'], a: 1, e: 'Origami ("ori" folding + "kami" paper) transforms flat sheets into 3D forms.' },
  { q: 'Mixing Red + Blue in equal measure yields which secondary colour?', o: ['Green', 'Violet / Purple', 'Orange', 'Yellow'], a: 1, e: 'Red + Blue creates Purple/Violet.' },
  { q: 'Which cool colour creates a calm watery or evening sky mood in poster design?', o: ['Crimson Red', 'Cobalt Blue / Teal', 'Bright Orange', 'Neon Yellow'], a: 1, e: 'Blues and greens are cool colours evoking calm water and shade.' },
];

const PHYSICAL_ED_BANK: SkillQ[] = [
  { q: 'In First Aid for an ankle sprain, what does the R.I.C.E. protocol stand for?', o: ['Run, Jump, Eat, Sleep', 'Rest, Ice, Compression, Elevation', 'Read, Inspect, Call, Exercise', 'Relax, Inhale, Cool, End'], a: 1, e: 'Rest, Ice pack, elastic Compression wrap, and Elevation reduce swelling.' },
  { q: 'Why must every athlete perform 5–10 minutes of dynamic warm-up before sprinting or sports?', o: ['To become tired early', 'To raise muscle temperature, loosen joints, and prevent pulls/injuries', 'To skip cool-down', 'It burns zero calories'], a: 1, e: 'Warm-up boosts blood flow to muscles and readies ligaments.' },
  { q: 'In Ashtanga Yoga (Patanjali), what does "Pranayama" primarily regulate?', o: ['Weightlifting sets', 'Conscious breath control and vital energy (Prana)', 'Shoe selection', 'Cricket bowling'], a: 1, e: 'Pranayama (Anulom-Vilom, Bhramari) improves lung capacity and mental focus.' },
  { q: 'Which vitamin does morning sunlight naturally help human skin synthesise for strong bones?', o: ['Vitamin C', 'Vitamin D', 'Vitamin B12', 'Vitamin K'], a: 1, e: 'Sunlight enables Vitamin D production needed for calcium absorption.' },
  { q: 'In Kho-Kho—a beloved traditional Indian team sport—how many players per team are on the court during a turn (or total squad 12, 9 on field)?', o: ['5 players', '9 players on field (3 defenders vs chasers)', '15 players', '2 players'], a: 1, e: 'Kho-Kho fields 9 chasers (8 sitting + 1 active) against batches of defenders.' },
  { q: 'What are the five interconnected Olympic Rings symbolic of?', o: ['Five continents united in friendship through sport', 'Five medals', 'Five years between games', 'Five sprint lanes'], a: 0, e: 'The five rings represent Africa, Americas, Asia, Europe, and Oceania.' },
  { q: 'How does adequate hydration (drinking water before, during, and after games) help an athlete?', o: ['Slows heart rate to zero', 'Regulates body temperature via sweat and prevents cramps/fatigue', 'Replaces all protein', 'Blocks oxygen'], a: 1, e: 'Water maintains blood volume and evaporative cooling.' },
];

export function generateSkillTechReasoningQuestionForSlot(
  board: EducationBoard,
  classLevel: ClassLevel,
  subject: SubjectName,
  wsNum: number,
  qIdx: number,
  format: WorksheetItemFormat,
  chapterName: string
): CompactWorksheetQuestionSpec {
  const c = getClassNumber(classLevel);
  const band = getStageBand(c);
  const boardTag = getBoardSyllabusLabel(board, c);
  const seed = wsNum * 47 + qIdx * 23 + c * 11;
  const ansIdx = (seed % 4) as 0 | 1 | 2 | 3;

  // 1. LOGICAL REASONING (100% Parametric infinite unique puzzles!)
  if (subject === 'Logical Reasoning') {
    const mode = (wsNum + qIdx) % 5;
    if (mode === 0) {
      // Number series: increasing difference or square/step
      const a0 = 3 + ((wsNum * 2 + qIdx) % 9);
      const d0 = ((wsNum + qIdx) % 4) + 2;
      const inc = c >= 6 ? 2 : 0;
      const n1 = a0;
      const n2 = n1 + d0;
      const n3 = n2 + d0 + inc;
      const n4 = n3 + d0 + inc * 2;
      const n5 = n4 + d0 + inc * 3;
      const { o, a } = placeCorrect(
        `${n5}`,
        [`${n5 - 2}`, `${n5 + 3}`, `${n5 + d0}`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `(${boardTag} • Logical Set ${wsNum}) Find the missing next number in the series: ${n1}, ${n2}, ${n3}, ${n4}, ___`,
        o,
        a,
        e: inc === 0
          ? `Each term increases by a constant +${d0}: ${n4} + ${d0} = ${n5}.`
          : `Differences increase by +${inc} (+${d0}, +${d0 + inc}, +${d0 + 2 * inc}, +${d0 + 3 * inc}): ${n4} + ${d0 + 3 * inc} = ${n5}.`,
      };
    } else if (mode === 1) {
      // Alphabet shift coding-decoding
      const words = ['BOOK', 'STAR', 'MIND', 'TREE', 'MATH', 'HERO', 'LAMP', 'RAIN', 'GOAL', 'GOLD'];
      const word = words[(wsNum + qIdx) % words.length];
      const shiftLet = ((wsNum + qIdx) % 2) + 1;
      const encode = (w: string, sh: number) =>
        w
          .split('')
          .map((ch) => String.fromCharCode(((ch.charCodeAt(0) - 65 + sh) % 26) + 65))
          .join('');
      const coded = encode(word, shiftLet);
      const targetWord = words[(wsNum + qIdx + 3) % words.length];
      const ansWord = encode(targetWord, shiftLet);
      const { o, a } = placeCorrect(
        ansWord,
        [encode(targetWord, shiftLet + 1), encode(targetWord, shiftLet + 2), encode(targetWord, shiftLet + 3)],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `In a certain code language, ${word} is written as ${coded}. How will ${targetWord} be written in that code?`,
        o,
        a,
        e: `Every letter moves forward +${shiftLet} position(s) in the English alphabet, turning ${targetWord} into ${ansWord}.`,
      };
    } else if (mode === 2) {
      // Direction sense distance
      const east = (((wsNum + qIdx) % 4) + 3) * 2;
      const north = (((wsNum * 2 + qIdx) % 3) + 2) * 3;
      const west = east - 3;
      const netE = east - west; // = 3
      const pythPairs: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13]];
      const [dx, dy, hyp] = pythPairs[(wsNum + qIdx) % pythPairs.length];
      const { o, a } = placeCorrect(
        `${hyp} m North-East`,
        [`${dx + dy} m East`, `${hyp + 2} m South-West`, `${dy} m North`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `Ria walks ${dx} metres East from school gate and then turns left to walk ${dy} metres North (Set ${wsNum}: ref ${netE}m/${north}m scale). How far and in which direction is she from the gate?`,
        o,
        a,
        e: `Straight-line distance = √(${dx}² + ${dy}²) = ${hyp} m, in the North-East direction.`,
      };
    } else if (mode === 3) {
      // Ranking / Queue Position
      const fromLeft = 7 + ((wsNum + qIdx) % 12);
      const fromRight = 9 + ((wsNum * 2 + qIdx) % 14);
      const totalStudents = fromLeft + fromRight - 1;
      const { o, a } = placeCorrect(
        `${totalStudents}`,
        [`${fromLeft + fromRight}`, `${totalStudents - 1}`, `${totalStudents + 2}`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `In a morning assembly row, Aarav stands ${fromLeft}th from the left end and ${fromRight}th from the right end. How many students are in the row?`,
        o,
        a,
        e: `Total = (${fromLeft} + ${fromRight}) − 1 (Aarav counted twice) = ${totalStudents}.`,
      };
    } else {
      // Odd-one-out / Analogy
      const groups: Array<[string, [string, string, string], string]> = [
        ['Circle (no corners/straight edges)', ['Triangle', 'Square', 'Pentagon'], 'Triangle, Square, and Pentagon are straight-sided polygons; a Circle is curved.'],
        ['Potato (underground stem tuber)', ['Apple', 'Mango', 'Banana'], 'Potato is a root/tuber vegetable while the others are tree fruits.'],
        ['Jupiter (Gas Giant outer planet)', ['Mercury', 'Venus', 'Mars'], 'Mercury, Venus, and Mars are rocky inner terrestrial planets; Jupiter is a gas giant.'],
        ['49 (square number; rest are primes: 11, 13, 17)', ['11', '13', '17'], '11, 13, 17 are prime numbers, while 49 = 7 × 7 is composite.'],
      ];
      const g = groups[(wsNum + qIdx) % groups.length];
      const { o, a } = placeCorrect(g[0], g[1], ansIdx);
      return {
        f: format,
        c: chapterName,
        q: `Find the Odd One Out (reasoning classification, Set ${wsNum}):`,
        o,
        a,
        e: g[2],
      };
    }
  }

  // 2. COMPUTER BINARY / MEMORY CONVERSION PARAMETRIC QUESTION FOR COMPUTER SUBJECTS
  if (
    (subject === 'Computer Knowledge' ||
      subject === 'Computer Studies' ||
      subject === 'Computer Applications' ||
      subject === 'Information Technology') &&
    c >= 5 &&
    qIdx === 3
  ) {
    if ((wsNum + qIdx) % 2 === 0) {
      const dec = 5 + ((wsNum * 3 + qIdx) % 24);
      const bin = dec.toString(2);
      const d1 = (dec + 1).toString(2);
      const d2 = Math.max(2, dec - 1).toString(2);
      const d3 = (dec + 3).toString(2);
      const { o, a } = placeCorrect(bin, [d1, d2, d3], ansIdx);
      return {
        f: format,
        c: chapterName,
        q: `(${boardTag} • Number System Set ${wsNum}) Convert the decimal number ${dec}₁₀ into its Binary (base-2) representation.`,
        o,
        a,
        e: `Dividing ${dec} repeatedly by 2 gives remainders forming binary (${bin})₂.`,
      };
    } else {
      const mb = ((wsNum + qIdx) % 4) + 2;
      const kb = mb * 1024;
      const { o, a } = placeCorrect(
        `${kb} KB`,
        [`${mb * 1000} KB`, `${kb + 512} KB`, `${Math.round(kb / 2)} KB`],
        ansIdx
      );
      return {
        f: format,
        c: chapterName,
        q: `An image file measures ${mb} Megabytes (MB). How many Kilobytes (KB) is this using standard binary 1 MB = 1024 KB?`,
        o,
        a,
        e: `${mb} × 1024 KB = ${kb} KB.`,
      };
    }
  }

  // 3. PHYSICAL EDUCATION PARAMETRIC BMI PROBLEM (Secondary)
  if (subject === 'Physical Education' && qIdx === 3) {
    const wt = (((wsNum + qIdx) % 4) + 4) * 12; // e.g. 48, 60, 72, 84 kg -> simple nice numbers
    const exactCases: Array<[number, string, number]> = [
      [50, '2.0 m', 12.5],
      [64, '1.6 m', 25.0],
      [72, '1.5 m', 32.0],
      [45, '1.5 m', 20.0],
      [49, '1.4 m', 25.0],
      [81, '1.8 m', 25.0],
    ];
    const [wKg, hLabel, bmiAns] = exactCases[(wsNum + qIdx) % exactCases.length];
    const { o, a } = placeCorrect(
      `${bmiAns.toFixed(1)} kg/m²`,
      [`${(bmiAns + 4.5).toFixed(1)} kg/m²`, `${Math.max(10, bmiAns - 3.5).toFixed(1)} kg/m²`, `${(bmiAns * 2).toFixed(1)} kg/m²`],
      ansIdx
    );
    return {
      f: format,
      c: chapterName,
      q: `Calculate the Body Mass Index (BMI = Weight / Height²) for a student weighing ${wKg} kg with height ${hLabel} (ref ${wt}).`,
      o,
      a,
      e: `BMI = ${wKg} ÷ (${hLabel.replace(' m', '')})² = ${bmiAns.toFixed(1)} kg/m².`,
    };
  }

  let pool: SkillQ[];
  if (subject === 'Drawing and Creative Activities') {
    pool = DRAWING_ART_BANK;
  } else if (subject === 'Physical Education') {
    pool = PHYSICAL_ED_BANK;
  } else {
    pool = COMP_TECH_BANK[band];
  }

  const idx = (wsNum * 6 + qIdx) % pool.length;
  const item = pool[idx];
  const pass = Math.floor((wsNum * 6 + qIdx) / pool.length);
  const qText =
    pass === 0
      ? item.q
      : `(${boardTag} • ${classLevel} ${subject} • Set ${wsNum}) ${item.q}`;

  return rotateQ({ ...item, q: qText }, seed, format, chapterName);
}
