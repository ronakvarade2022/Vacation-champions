import type { SkillProgramCurriculum } from './skillProgramsTypes';

export const SKILL_CURRICULA_PART_2: Record<string, SkillProgramCurriculum> = {
  'logical-reasoning': {
    programId: 'logical-reasoning',
    part: 2,
    prerequisites: 'Basic arithmetic and alphabetical order (A=1..Z=26).',
    materialsNeeded: ['Grid paper or rough pad'],
    modules: [
      {
        id: 'lr-beg',
        level: 'Beginner',
        title: 'Number Sequences, Differences & Odd-One-Out Classification',
        durationMinutes: 25,
        objectives: ['Find patterns by computing first and second differences.', 'Group items by prime/square, geometric, or semantic property.'],
        conceptExplanation: [
          'Always write the gap between adjacent numbers first! If gaps grow smoothly (+2, +4, +6, +8), you instantly see the next jump (+10). Also check squares (1, 4, 9, 16, 25...) and primes (2, 3, 5, 7, 11...).',
        ],
        workedExamples: [
          { prompt: 'Find the next number: 3, 6, 11, 18, 27, ?', steps: ['Compute gaps: +3, +5, +7, +9', 'Next gap must be +11 -> 27 + 11 = 38. (Also n² + 2 check: 6² + 2 = 38!)'], finalAnswer: '38' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Find next: 2, 6, 12, 20, 30, ?', answer: '42 (gaps +4, +6, +8, +10, +12)' },
          { qNo: 2, question: 'Odd one out: 16, 25, 36, 48, 64', answer: '48 (others are perfect squares)' },
        ],
      },
      {
        id: 'lr-int',
        level: 'Intermediate',
        title: 'Coding-Decoding (EJOTY) & Direction Sense Maps',
        durationMinutes: 30,
        objectives: ['Use EJOTY (5-10-15-20-25) to decode alphabet shifts fast.', 'Trace North-East-South-West paths cleanly on an origin cross.'],
        conceptExplanation: [
          'Memorize EJOTY: E=5, J=10, O=15, T=20, Y=25. Need letter M? It sits 2 after J -> 10 + 3 = 13!',
          'For Direction Sense: facing North, a Right turn faces East; another Right faces South. Always compute net displacement with Pythagoras when slanted.',
        ],
        workedExamples: [
          { prompt: 'A boy walks 4 km North, then turns Right and walks 3 km. How far is he from the start?', steps: ['4 km North + 3 km East forms a right triangle.', 'Distance = √(4² + 3²) = √(16 + 9) = √25 = 5 km North-East.'], finalAnswer: '5 km (North-East)' },
        ],
        practiceExercises: [{ qNo: 1, question: 'If CAT -> DBU (+1 shift), what is DOG?', answer: 'EPH' }],
      },
      {
        id: 'lr-adv',
        level: 'Advanced',
        title: 'Blood Relations, Venn Diagrams & Syllogism Truth Checks',
        durationMinutes: 35,
        objectives: ['Draw generation-tree diagrams (+ male, - female) to solve family puzzles.', 'Test syllogisms ("All A are B") with overlapping circles without guessing.'],
        conceptExplanation: [
          'Never solve blood relations in your head—draw a vertical generation ladder! Grandparents top, parents middle, children bottom.',
        ],
        workedExamples: [
          { prompt: 'Statements: All roses are flowers. Some flowers are red. Can we conclude "All roses are red"?', steps: ['Draw Rose inside Flower circle. Draw Red circle overlapping Flower outside Rose.', 'Conclusion fails in at least one valid drawing -> Does NOT necessarily follow.'], finalAnswer: 'Does not follow' },
        ],
        practiceExercises: [{ qNo: 1, question: 'A is the brother of B. B is the mother of C. How is A related to C?', answer: 'Maternal Uncle' }],
      },
    ],
    worksheetActivities: [
      { title: '5-Round Logic Arena', instructions: 'Show the rule next to every answer.', tasks: ['1) Series: 5, 10, 20, 40, ?', '2) Walk 6m East, 8m North -> distance?', '3) Mirror image of clock showing 3:00?'] },
    ],
    capstoneProject: {
      title: 'Original 10-Puzzle Aptitude Challenge',
      brief: 'Author 10 logic puzzles (series, coding, directions, Venn) with full step-by-step explanations.',
      rubric: ['Mathematically unambiguous', 'Complete answer key'],
    },
    quiz: [
      { id: 'lrq1', level: 'Beginner', question: 'Find the missing term: 4, 9, 16, 25, ?, 49', options: ['30', '35', '36', '42'], correctIndex: 2, explanation: 'Squares of 2, 3, 4, 5, 6, 7 -> 6² = 36.' },
      { id: 'lrq2', level: 'Intermediate', question: 'Using EJOTY (E=5, J=10, O=15, T=20, Y=25), what position is letter Q?', options: ['16', '17', '18', '19'], correctIndex: 1, explanation: 'O=15, P=16, Q=17.' },
      { id: 'lrq3', level: 'Intermediate', question: 'Ravi walks 8 m South and then 6 m East. What is the shortest distance back to start?', options: ['14 m', '10 m', '12 m', '2 m'], correctIndex: 1, explanation: '√(8² + 6²) = √(64 + 36) = √100 = 10 m.' },
      { id: 'lrq4', level: 'Advanced', question: 'If "All pens are books" and "No book is a toy", which conclusion is guaranteed true?', options: ['Some pens are toys', 'No pen is a toy', 'All books are pens', 'All toys are books'], correctIndex: 1, explanation: 'Since every pen sits inside books, and books do not overlap toys, no pen can be a toy.' },
      { id: 'lrq5', level: 'Beginner', question: 'Spot the odd number out: 11, 13, 17, 21, 23', options: ['11', '17', '21', '23'], correctIndex: 2, explanation: '21 = 3 × 7 (composite); all others are prime numbers.' },
    ],
  },

  chess: {
    programId: 'chess',
    part: 2,
    prerequisites: 'Knowing how chess pieces move on an 8×8 board.',
    materialsNeeded: ['Chess board or coordinate grid'],
    modules: [
      {
        id: 'ch-beg',
        level: 'Beginner',
        title: 'Algebraic Coordinates, Piece Values & Golden Opening Rules',
        durationMinutes: 30,
        objectives: ['Read squares a1–h8 and move notation (e4, Nf3, O-O).', 'Use piece points (P=1, N=3, B=3, R=5, Q=9) and 3 Opening Principles.'],
        conceptExplanation: [
          'Three Golden Opening Principles: (1) Fight for the center (e4, d4, e5, d5); (2) Develop Knights and Bishops early (don\'t move Queen out prematurely); (3) Castle early (O-O) to tuck your King safely behind pawns.',
        ],
        workedExamples: [
          { prompt: 'Should you trade your Rook (5) for a Bishop (3) + Pawn (1)?', steps: ['Compare 5 vs (3 + 1 = 4). You lose 1 point ("losing the exchange"). Avoid unless it wins checkmate!'], finalAnswer: 'No — unfavourable exchange (5 vs 4)' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What is the symbol for Kingside Castling in chess notation?', answer: 'O-O (Queenside is O-O-O)' }],
      },
      {
        id: 'ch-int',
        level: 'Intermediate',
        title: 'Winning Material with Forks, Pins, Skewers & Discovered Attacks',
        durationMinutes: 35,
        objectives: ['Execute Knight & Pawn double attacks (Forks).', 'Tell an Absolute Pin (against King) from a Relative Pin & Skewer.'],
        conceptExplanation: [
          'Fork: One piece attacks two enemy pieces at once (Knights are fork champions because no other piece can trace an L-jump back at them!).',
          'Pin: A Bishop/Rook/Queen freezes a front piece because moving it exposes a MORE valuable piece (or the King) behind it. Skewer is the reverse: high piece in front is forced to move, exposing piece behind!',
        ],
        workedExamples: [
          { prompt: 'Your Knight lands on c7 checking Black\'s King on e8 AND attacking Black\'s Rook on a8.', steps: ['Since the King is in check, Black must move or block/capture if possible, leaving the Rook on a8 undefended ("Royal Family Fork").'], finalAnswer: 'Knight Fork wins the Rook' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Which pieces can deliver a Pin or Skewer?', answer: 'Long-range sliding pieces only: Queen, Rook, and Bishop (never Knight/Pawn/King).' }],
      },
      {
        id: 'ch-adv',
        level: 'Advanced',
        title: 'Essential Checkmates (Ladder, Queen+King) & Endgame Opposition',
        durationMinutes: 40,
        objectives: ['Deliver Ladder Mate (2 Rooks) and King+Queen mate without accidental Stalemate.', 'Promote pawns using King Opposition.'],
        conceptExplanation: [
          'Stalemate Trap! When winning with Queen + King vs lone King, NEVER leave the enemy King without legal moves unless it is in CHECK—otherwise the game ends in a 0.5–0.5 Draw!',
          'With King + Pawn vs King, keep your King IN FRONT of your pawn to seize direct Opposition.',
        ],
        workedExamples: [
          { prompt: 'Black King is trapped on h8; White Queen stands on g6; White King on f6. Whose move matters?', steps: ['g6 covers g8, h7, g7 — h8 is NOT in check, yet has zero legal squares! That would be STALEMATE if White moved Queen to g6 without check. Play Qg7# or Qh6+ instead!'], finalAnswer: 'Always check for legal enemy moves to prevent Stalemate' },
        ],
        practiceExercises: [{ qNo: 1, question: 'In chess, what score does a Stalemate give each player?', answer: 'Draw (0.5 point each)' }],
      },
    ],
    worksheetActivities: [
      { title: 'Coordinate & Tactical Checklist', instructions: 'Verify on a chessboard:', tasks: ['Locate squares c4, f7, g1', 'Play 1.e4 e5 2.Nf3 Nc6 3.Bc4 and spot weakest Black pawn (f7)', 'Practice Two-Rook Ladder Mate in < 6 moves'] },
    ],
    capstoneProject: {
      title: 'Annotated 10-Move Opening & Mate Showcase',
      brief: 'Write 10 annotated moves demonstrating center control, minor piece development, castling, and 1 tactical motif.',
      rubric: ['Valid algebraic notation', 'Explains why each move follows opening/tactic rules'],
    },
    quiz: [
      { id: 'chq1', level: 'Beginner', question: 'What is the standard relative value of a Rook vs a Knight?', options: ['Rook = 5, Knight = 3', 'Rook = 3, Knight = 5', 'Both = 4', 'Rook = 9, Knight = 3'], correctIndex: 0, explanation: 'Standard point scale: Pawn 1, Knight 3, Bishop 3, Rook 5, Queen 9.' },
      { id: 'chq2', level: 'Beginner', question: 'Which is a core Opening Principle for beginners?', options: ['Move your Queen 5 times before developing Bishops', 'Push edge a- and h-pawns first', 'Control the center, develop Knights/Bishops, and castle early', 'Never move center pawns'], correctIndex: 2, explanation: 'Center control, rapid development, and King safety (castling) are the 3 pillars.' },
      { id: 'chq3', level: 'Intermediate', question: 'When one piece simultaneously attacks two higher-value enemy targets, it is called a:', options: ['Stalemate', 'Fork', 'En Passant', 'Castling'], correctIndex: 1, explanation: 'A Fork is a single-move double attack.' },
      { id: 'chq4', level: 'Intermediate', question: 'In an Absolute Pin, the pinned piece:', options: ['Can legally move anywhere', 'Cannot legally move because doing so exposes its own King to check', 'Turns into a Knight', 'Must be traded for a pawn'], correctIndex: 1, explanation: 'Moving a piece pinned to the King would leave the King in check, which is illegal.' },
      { id: 'chq5', level: 'Advanced', question: 'When your opponent has NO legal move and their King is NOT in check, the result is:', options: ['You win immediately', 'Stalemate (Draw)', 'Opponent loses 5 points', 'Extra turn awarded'], correctIndex: 1, explanation: 'No legal moves without check is Stalemate, resulting in a draw.' },
    ],
  },

  'rubiks-cube': {
    programId: 'rubiks-cube',
    part: 2,
    prerequisites: 'None — complete beginners welcome.',
    materialsNeeded: ['Standard 3×3 Rubik\'s Cube'],
    modules: [
      {
        id: 'rc-beg',
        level: 'Beginner',
        title: 'Cube Anatomy, Move Notation & The "Righty Trigger" (R U R\' U\')',
        durationMinutes: 25,
        objectives: ['Know fixed centers (opposite pairs: White-Yellow, Red-Orange, Blue-Green) vs 12 edges vs 8 corners.', 'Perform R, R\', U, U\', L, F cleanly.'],
        conceptExplanation: [
          'Center caps NEVER swap sides! White is opposite Yellow. A plain letter (R, U, F) means turn that face 90° CLOCKWISE looking straight at that face. An apostrophe (R\', U\', F\') means 90° COUNTER-CLOCKWISE.',
          'Practice the 4-move Righty Algorithm: R U R\' U\' — do it 6 times from solved and the cube returns back to solved!',
        ],
        workedExamples: [{ prompt: 'Check the 6-cycle rule of R U R\' U\'.', steps: ['Starting solved, perform (R U R\' U\') × 6 smoothly without rotating the whole cube. Cube returns to solved!'], finalAnswer: 'Order 6 cycle verified' }],
        practiceExercises: [{ qNo: 1, question: 'How many center, edge, and corner cubies are on a 3×3 cube?', answer: '6 centers (1 colour), 12 edges (2 colours), 8 corners (3 colours)' }],
      },
      {
        id: 'rc-int',
        level: 'Intermediate',
        title: 'Daisy -> White Cross -> White Corners & Middle Layer Edges',
        durationMinutes: 35,
        objectives: ['Align White Cross edges with side centers.', 'Insert corners with (R U R\' U\') and middle edges left/right cleanly.'],
        conceptExplanation: [
          'Build a Daisy (4 White edge petals around Yellow center), match each petal\'s side colour to its side center, then turn F2 (180°) down to build a true aligned White Cross.',
          'Place White Cross on bottom. Hold target White corner above its home slot and repeat (R U R\' U\') until it clicks in neatly!',
        ],
        workedExamples: [{ prompt: 'Why must side colours of the White Cross match side centers?', steps: ['A White cross with mismatched side colours cannot hold valid corner pieces later.'], finalAnswer: 'Match cross edges to side centers first' }],
        practiceExercises: [{ qNo: 1, question: 'On a standard Western colour scheme, which centre sits opposite White?', answer: 'Yellow' }],
      },
      {
        id: 'rc-adv',
        level: 'Advanced',
        title: 'Yellow Cross (F R U R\' U\' F\'), Corner Positioning & Final Solve',
        durationMinutes: 35,
        objectives: ['Orient Yellow edges using F (R U R\' U\') F\'.', 'Align Yellow corners and finish the bottom twist calmly without scrambling!'],
        conceptExplanation: [
          'Never rotate the whole cube midway through finishing the last yellow corners! Hold Yellow at the bottom (or top depending on method) and use U-layer turns ONLY to bring the next unsolved corner into front-right before repeating (R U R\' U\'). Trust the final turn—the first two layers snap right back together!',
        ],
        workedExamples: [{ prompt: 'From a Yellow L-shape on top (at 9 and 12 o\'clock), form the Yellow Cross.', steps: ['Run F (R U R\' U\') F\' -> forms Horizontal Bar -> run F (R U R\' U\') F\' once more -> Yellow Cross complete!'], finalAnswer: 'Yellow Cross ready for Sune/corner align' }],
        practiceExercises: [{ qNo: 1, question: 'What common beginner mistake breaks the bottom layers while flipping final Yellow corners?', answer: 'Rotating the entire cube in hands instead of twisting only the U layer to swap corners.' }],
      },
    ],
    worksheetActivities: [
      { title: 'Notation Muscle Memory Drill', instructions: 'Practice smoothly without looking at hands:', tasks: ['R U R\' U\' × 6 (verify returns to solved)', 'L\' U\' L U × 6 (Lefty trigger)', 'F R U R\' U\' F\' edge flip practice'] },
    ],
    capstoneProject: {
      title: 'Full Timed Layer-by-Layer Solve Log',
      brief: 'Time 3 complete solves from random scrambles and note which stage took longest (Cross / F2L / Last Layer).',
      rubric: ['All 6 faces solved', 'Correct colour scheme alignment'],
    },
    quiz: [
      { id: 'rcq1', level: 'Beginner', question: 'On a 3×3 Rubik\'s Cube, which pieces NEVER move relative to one another?', options: ['Corners', 'Edges', 'Center pieces', 'Stickers on corners'], correctIndex: 2, explanation: 'The 6 centers are fixed on the internal 3-axis core.' },
      { id: 'rcq2', level: 'Beginner', question: 'What does R\' mean in Rubik\'s Cube notation?', options: ['Turn Right face 90° clockwise', 'Turn Right face 90° counter-clockwise', 'Turn Rear face 180°', 'Rotate entire cube right'], correctIndex: 1, explanation: 'Prime (\') always indicates a 90° counter-clockwise quarter turn when facing that side.' },
      { id: 'rcq3', level: 'Intermediate', question: 'Repeating the Righty Trigger (R U R\' U\') how many times brings a solved cube back to solved?', options: ['2 times', '4 times', '6 times', '8 times'], correctIndex: 2, explanation: 'The commutator (R U R\' U\') has order 6.' },
      { id: 'rcq4', level: 'Intermediate', question: 'Why is the White Cross supposed to match the side center colours too?', options: ['Only for decoration', 'So adjacent corners have matching center reference anchors', 'To loosen screws', 'Otherwise Yellow disappears'], correctIndex: 1, explanation: 'True layer-by-layer solving requires every First-Layer piece to match both bottom and side centers.' },
      { id: 'rcq5', level: 'Advanced', question: 'During the final Yellow corner twisting step, how do you move the next unsolved corner into place?', options: ['Turn the whole cube sideways', 'Rotate ONLY the top U layer to keep the bottom layers anchored', 'Peel off the sticker', 'Scramble the front face'], correctIndex: 1, explanation: 'Only turning the U-face keeps the paired bottom cancellation intact until the last corner finishes.' },
    ],
  },

  'coding-for-kids': {
    programId: 'coding-for-kids',
    part: 2,
    prerequisites: 'None — pure beginner logic.',
    materialsNeeded: ['Browser / Scratch or Python beginner notebook'],
    modules: [
      {
        id: 'ck-beg',
        level: 'Beginner',
        title: 'Algorithms, Sequences & Clear Step-by-Step Instructions',
        durationMinutes: 25,
        objectives: ['Write precise step-by-step recipes (algorithms) with zero ambiguity.', 'Spot ordering bugs in real-life sequences.'],
        conceptExplanation: [
          'Computers do EXACTLY what you say, never what you "meant"! An Algorithm is a finite, ordered sequence of steps that solves a problem cleanly.',
        ],
        workedExamples: [
          { prompt: 'Trace robot instructions: Start at (0,0) facing East. Move 2, Turn Left, Move 3.', steps: ['Move 2 East -> (2,0)', 'Turn Left -> faces North', 'Move 3 North -> (2,3)'], finalAnswer: '(2, 3) facing North' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What happens if you put "Pour milk" before "Open carton"?', answer: 'Sequence bug — step preconditions are violated.' }],
      },
      {
        id: 'ck-int',
        level: 'Intermediate',
        title: 'Variables, Loops (For/Repeat) & If-Else Conditionals',
        durationMinutes: 30,
        objectives: ['Use variables to store scores/counters.', 'Use Loops to eliminate copy-paste code and Conditionals to make decisions.'],
        conceptExplanation: [
          'Variable = labelled storage box (`score = 0`). Each time a student answers right, `score = score + 10`.',
          'Loop (`repeat 4 times: forward 50, turn right 90°`) draws a whole square in 3 lines instead of 8!',
        ],
        workedExamples: [
          { prompt: 'Trace: `total = 0`; repeat 4 times with `i = 1,2,3,4`: `total = total + i`. Final `total`?', steps: ['i=1 -> 1; i=2 -> 3; i=3 -> 6; i=4 -> 10'], finalAnswer: 'total = 10' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What angle turn repeated 6 times draws a regular hexagon?', answer: '60° (since 360° ÷ 6 = 60°)' }],
      },
      {
        id: 'ck-adv',
        level: 'Advanced',
        title: 'Functions, Lists & Systematic Bug Hunting',
        durationMinutes: 35,
        objectives: ['Package reusable steps into named Functions with inputs.', 'Trace off-by-one loop errors cleanly.'],
        conceptExplanation: [
          'Good programmers test edge cases! What happens if `score == 0`, list is empty, or input is negative? Always print/check intermediate variables when debugging.',
        ],
        workedExamples: [
          { prompt: 'Find the bug: `if score > 50: grade = "Pass"` for a student who scored exactly 50.', steps: ['Condition `> 50` excludes 50! Change to `>= 50`.'], finalAnswer: 'Fix boundary condition to `score >= 50`' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Why are Functions useful in large games/apps?', answer: 'Reusability — write once, call anywhere, fix bugs in one place.' }],
      },
    ],
    worksheetActivities: [
      { title: 'Loop Geometry & Flowchart Challenge', instructions: 'Write pseudocode for:', tasks: ['Draw a regular Triangle (turn angle?)', 'If temperature >= 30 show "Sunny", else show "Pleasant"'] },
    ],
    capstoneProject: {
      title: '3-Question Quiz Game Pseudocode Design',
      brief: 'Design inputs, score variable, loop, and high-score conditional for a 3-question school quiz.',
      rubric: ['Initializes score = 0', 'Clean if-else branch', 'Zero infinite loops'],
    },
    quiz: [
      { id: 'ckq1', level: 'Beginner', question: 'What is an "Algorithm" in computer science?', options: ['A broken screen', 'A clear step-by-step set of instructions to solve a task', 'Only hardware cables', 'A password'], correctIndex: 1, explanation: 'An algorithm is a well-defined sequence of steps producing a solution.' },
      { id: 'ckq2', level: 'Intermediate', question: 'In programming, a named container that stores changing values like "lives" or "score" is a:', options: ['Variable', 'Monitor', 'Compiler', 'Router'], correctIndex: 0, explanation: 'Variables hold data values that can be read and updated while a program runs.' },
      { id: 'ckq3', level: 'Intermediate', question: 'If a sprite repeats (move 100 steps, turn right 90°) exactly 4 times, what shape does it draw?', options: ['Triangle', 'Circle', 'Square', 'Pentagon'], correctIndex: 2, explanation: '4 equal sides with 90° turns closes a square (4 × 90° = 360°).' },
      { id: 'ckq4', level: 'Advanced', question: 'Why did `if marks > 40: pass()` fail a student who got 40 marks?', options: ['Syntax crash', 'Boundary bug: `>` strictly excludes 40; it needed `>= 40`', 'Computer cannot read 40', 'Loop ran backwards'], correctIndex: 1, explanation: 'Strict greater-than `>` misses exact boundary value 40; `>=` includes it.' },
      { id: 'ckq5', level: 'Beginner', question: 'Which structure lets a program make two different choices depending on a condition?', options: ['If–Else statement', 'Print font', 'Comment', 'File extension'], correctIndex: 0, explanation: 'If–Else branches execution based on whether a condition evaluates to true or false.' },
    ],
  },

  'drawing-creative': {
    programId: 'drawing-creative',
    part: 2,
    prerequisites: 'None.',
    materialsNeeded: ['Sketchbook, HB pencil, eraser, colour pencils/crayons (plus MyStudyZone Drawing Studio)'],
    modules: [
      {
        id: 'dc-beg',
        level: 'Beginner',
        title: 'Shape Construction Method (Circles, Ovals & Guidelines)',
        durationMinutes: 25,
        objectives: ['Sketch animals, birds, and objects starting from light geometric shapes.', 'Draw light construction lines before darkening final outlines.'],
        conceptExplanation: [
          'Every complex object hides simple shapes! A parrot = oval body + round head + triangle beak + curved tail. Keep pencil pressure light while positioning shapes, then darken only final contours.',
        ],
        workedExamples: [
          { prompt: 'Construct a simple sitting cat.', steps: ['1. Circle head + larger oval torso. 2. Two triangle ears. 3. Curved S-tail. 4. Erase guide intersections and darken clean outline.'], finalAnswer: 'Proportioned cat sketch' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Why should guideline shapes always be sketched lightly?', answer: 'So construction lines erase cleanly without scarring the paper.' }],
      },
      {
        id: 'dc-int',
        level: 'Intermediate',
        title: 'Colour Wheel Harmony: Primary, Secondary & Warm/Cool Contrast',
        durationMinutes: 30,
        objectives: ['Mix/pair Primary (Red, Yellow, Blue) -> Secondary (Orange, Green, Violet).', 'Use Warm foreground vs Cool background to make art pop.'],
        conceptExplanation: [
          'Warm colours (Red, Orange, Yellow) advance visually toward the viewer. Cool colours (Blue, Green, Violet) recede into calm sky/water/mountains—creating instant poster contrast!',
        ],
        workedExamples: [{ prompt: 'Pick a harmony scheme for "Save Trees Poster".', steps: ['Cool sky-blue background behind warm orange-gold sun and rich layered greens so key elements stand out cleanly.'], finalAnswer: 'Warm-Cool focal contrast' }],
        practiceExercises: [{ qNo: 1, question: 'Name the 3 Primary colours in traditional pigment mixing.', answer: 'Red, Yellow, and Blue' }],
      },
      {
        id: 'dc-adv',
        level: 'Advanced',
        title: 'Foreground-Midground-Background Depth & Directional Shading',
        durationMinutes: 35,
        objectives: ['Scale near objects larger and distant objects smaller/lighter.', 'Place consistent cast shadows opposite a single light source.'],
        conceptExplanation: [
          'Pick ONE light source arrow (e.g., top-left sun) and keep highlights on that side while shading opposite sides smoothly.',
        ],
        workedExamples: [{ prompt: 'Draw a receding road.', steps: ['Road edges converge toward a horizon vanishing point; roadside trees shrink gradually toward the horizon.'], finalAnswer: 'One-point perspective depth' }],
        practiceExercises: [{ qNo: 1, question: 'If the sun is at top-left, which side of a tree trunk gets the darker shadow?', answer: 'Bottom-right side' }],
      },
    ],
    worksheetActivities: [
      { title: '3-Shape Creature & Colour Gradient Practice', instructions: 'Complete inside sketchbook or Drawing Studio:', tasks: ['Draw 1 bird from 2 ovals', 'Shade 1 sphere smoothly from light to shadow', 'Create 1 Nature Poster using Warm/Cool contrast'] },
    ],
    capstoneProject: {
      title: 'Original Theme Artwork in Drawing Studio',
      brief: 'Create and save 1 complete composition applying geometric construction, warm/cool contrast, and foreground-background depth.',
      rubric: ['Balanced page composition', 'Cohesive colour harmony'],
    },
    quiz: [
      { id: 'dcq1', level: 'Beginner', question: 'Which set lists the 3 traditional Primary pigment colours?', options: ['Green, Orange, Violet', 'Red, Yellow, Blue', 'Black, Grey, White', 'Pink, Brown, Cyan'], correctIndex: 1, explanation: 'Red, Yellow, and Blue are the traditional primary colours used to mix secondary hues.' },
      { id: 'dcq2', level: 'Intermediate', question: 'Mixing Yellow and Blue produces which Secondary colour?', options: ['Orange', 'Purple', 'Green', 'Brown'], correctIndex: 2, explanation: 'Yellow + Blue = Green.' },
      { id: 'dcq3', level: 'Intermediate', question: 'Which colours are classified as "Cool" hues in art?', options: ['Red, Orange, Yellow', 'Blue, Green, Violet', 'Red and Yellow only', 'Brown and Gold'], correctIndex: 1, explanation: 'Blue, Green, and Violet evoke water, foliage, and sky coolness.' },
      { id: 'dcq4', level: 'Advanced', question: 'In one-point perspective, parallel road lines appear to meet at the:', options: ['Color wheel', 'Vanishing point on the horizon line', 'Shadow edge', 'Grid center'], correctIndex: 1, explanation: 'Parallel receding lines converge at a vanishing point along the eye-level horizon.' },
      { id: 'dcq5', level: 'Beginner', question: 'Why do artists start sketches with light circles and ovals?', options: ['To break pencil tips', 'To lock proportions easily before adding details and erasing guides', 'To make shadows darker', 'To waste space'], correctIndex: 1, explanation: 'Light basic shapes establish accurate scale and posture first.' },
    ],
  },

  'yoga-wellness': {
    programId: 'yoga-wellness',
    part: 2,
    prerequisites: 'Comfortable floor mat & empty stomach / 2 hrs after meals.',
    materialsNeeded: ['Yoga mat or folded cotton sheet'],
    modules: [
      {
        id: 'yw-beg',
        level: 'Beginner',
        title: 'Student Posture Reset: Tadasana, Vrikshasana & Neck/Eye Care',
        durationMinutes: 25,
        objectives: ['Practice safe alignment without forcing painful stretches.', 'Apply the 20-20-20 screen eye-care rule.'],
        conceptExplanation: [
          'Tadasana (Mountain Pose) realigns slouched study spines. Vrikshasana (Tree Pose) trains focus and balance—fix your eyes (Drishti) on one still spot ahead!',
          '20-20-20 Rule: every 20 minutes on a screen/book, look 20 feet away for 20 seconds.',
        ],
        workedExamples: [{ prompt: 'Safe Vrikshasana placement tip:', steps: ['Place raised foot on calf or inner thigh—NEVER press directly against the side of your knee joint!'], finalAnswer: 'Protect joints during balance poses' }],
        practiceExercises: [{ qNo: 1, question: 'What does 20-20-20 mean for students?', answer: 'Every 20 minutes, look 20 feet away for 20 seconds.' }],
      },
      {
        id: 'yw-int',
        level: 'Intermediate',
        title: 'Pranayama Focus Breaths: Anulom-Vilom & Bhramari',
        durationMinutes: 25,
        objectives: ['Calm pre-exam nerves using slow rhythmic nasal breathing.', 'Practice 4-count inhale / 6-count exhale safely (no dizzy breath holds).'],
        conceptExplanation: [
          'Longer exhales activate the body\'s calming parasympathetic system! Practice 5 rounds of Bhramari (soft humming bee exhale with eyes closed gently) before tough Maths/Science study.',
        ],
        workedExamples: [{ prompt: 'Calm 60-second exam reset:', steps: ['Sit upright -> 4-second nose inhale -> 6-second smooth exhale × 6 rounds.'], finalAnswer: 'Heart rate slows, focus sharpens' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Which breathing practice uses a gentle humming sound on exhale to quiet racing thoughts?', answer: 'Bhramari Pranayama' }],
      },
      {
        id: 'yw-adv',
        level: 'Advanced',
        title: '10-Minute Morning Focus Flow + Sleep & Hydration Routine',
        durationMinutes: 30,
        objectives: ['Sequence Cat-Cow, Child Pose (Balasana), Cobra (Bhujangasana), and Shavasana safely.', 'Align sleep (8–9 hrs for school students) with memory consolidation.'],
        conceptExplanation: [
          'Deep sleep cements daytime classroom study! Avoid bright screens 45 minutes before bed, hydrate evenly across the day, and stretch tight shoulders gently.',
        ],
        workedExamples: [{ prompt: 'Gentle post-study stretch:', steps: ['Vajrasana after meals aids comfort -> gentle spinal twist -> 2-minute quiet relaxation.'], finalAnswer: 'Balanced energy & calm posture' }],
        practiceExercises: [{ qNo: 1, question: 'Which yoga posture can be practiced gently right after meals?', answer: 'Vajrasana (Thunderbolt pose)' }],
      },
    ],
    worksheetActivities: [
      { title: '5-Day Wellness Habit Check-In', instructions: 'Track daily:', tasks: ['5 mins morning stretches', '3 rounds Bhramari before study', '8+ hrs sleep & 20-20-20 eye breaks'] },
    ],
    capstoneProject: {
      title: 'Personal 10-Minute Study-Break Wellness Routine',
      brief: 'Design and practice a 4-pose + 1-breathing custom break sequence tailored to your study schedule.',
      rubric: ['Safe joint alignment', 'Zero pain/strain', 'Includes eye & breath reset'],
    },
    quiz: [
      { id: 'ywq1', level: 'Beginner', question: 'In Vrikshasana (Tree Pose), where should you NEVER press your lifted foot?', options: ['Ankle/calf', 'Upper inner thigh', 'Directly sideways against the knee joint', 'Just above ankle'], correctIndex: 2, explanation: 'Lateral pressure directly against the knee can strain ligaments.' },
      { id: 'ywq2', level: 'Beginner', question: 'What is the 20-20-20 rule for students?', options: ['20 pushups every 20 hours', 'Every 20 minutes look 20 feet away for 20 seconds', 'Read 20 pages in 20 minutes', 'Sleep 20 hours'], correctIndex: 1, explanation: 'Relaxing eye focus at 20 feet prevents digital eye strain.' },
      { id: 'ywq3', level: 'Intermediate', question: 'Which breathing pattern calms exam anxiety fastest?', options: ['Fast shallow chest panting', 'Holding breath until dizzy', 'Slow diaphragmatic nasal inhale with slightly longer smooth exhale', 'Mouth breathing rapidly'], correctIndex: 2, explanation: 'Longer steady exhales stimulate the vagus nerve calming response.' },
      { id: 'ywq4', level: 'Intermediate', question: 'Bhramari Pranayama is famous for:', options: ['Weightlifting', 'A gentle humming exhale that calms the mind before study/sleep', 'Jumping squats', 'Holding breath underwater'], correctIndex: 1, explanation: 'Bhramari uses a gentle bee-humming exhale vibration to reduce mental chatter.' },
      { id: 'ywq5', level: 'Advanced', question: 'Which classic seated pose is traditionally safe even gently after meals?', options: ['Headstand', 'Vajrasana (kneeling posture)', 'Full wheel backbend', 'Handstand'], correctIndex: 1, explanation: 'Vajrasana sits upright calmly on bent shins and supports comfortable digestion.' },
    ],
  },

  'olympiad-prep': {
    programId: 'olympiad-prep',
    part: 2,
    prerequisites: 'School Maths & Science fundamentals.',
    materialsNeeded: ['Rough work grid notebook'],
    modules: [
      {
        id: 'ol-beg',
        level: 'Beginner',
        title: 'Bar Modelling & Working Backwards on Non-Routine Word Problems',
        durationMinutes: 30,
        objectives: ['Solve multi-step ratio/fraction word problems cleanly using visual bar models.', 'Invert sequential operations using Working Backwards.'],
        conceptExplanation: [
          'Instead of guessing equations, draw equal rectangular bars! If A has 3 units and B has 1 unit, and total = 48, then 4 units = 48 -> 1 unit = 12!',
        ],
        workedExamples: [
          { prompt: 'A number is doubled, then 7 is added, giving 31. Find the start number by working backwards.', steps: ['Undo +7 -> 31 - 7 = 24', 'Undo ×2 -> 24 ÷ 2 = 12', 'Check: (12×2)+7 = 31!'], finalAnswer: '12' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Sum of two numbers is 60 and one is 4 times the other. Find both using bar units.', answer: '5 units = 60 -> 1 unit = 12. Numbers: 12 and 48.' }],
      },
      {
        id: 'ol-int',
        level: 'Intermediate',
        title: 'Parity (Even/Odd Invariants), Pigeonhole & Counting Principles',
        durationMinutes: 35,
        objectives: ['Use Even/Odd parity to spot impossible cases instantly.', 'Apply Pigeonhole Principle to guarantee matches.'],
        conceptExplanation: [
          'Pigeonhole Principle: If you have 13 students and 12 birth months, AT LEAST two students MUST share a birth month! Similarly, if a drawer has black and white socks (2 colours), pulling 3 socks guarantees a matching pair!',
        ],
        workedExamples: [
          { prompt: 'Can 5 odd numbers add up to 100?', steps: ['Odd + Odd = Even, so an ODD count (5) of odd numbers always sums to an ODD number. Since 100 is Even -> Impossible!'], finalAnswer: 'No (Parity invariant)' },
        ],
        practiceExercises: [{ qNo: 1, question: 'A bag has red, blue, and green marbles. At least how many must you draw blindly to guarantee 2 of the SAME colour?', answer: '4 marbles (3 colours + 1)' }],
      },
      {
        id: 'ol-adv',
        level: 'Advanced',
        title: 'Achievers Section Strategy, Dimensional Sanity & Elimination',
        durationMinutes: 35,
        objectives: ['Eliminate 2–3 wrong choices using unit digits, divisibility, and bounds.', 'Budget 40% of exam time for high-weight Achievers questions.'],
        conceptExplanation: [
          'Always check unit digit and mod-9 first on tough calculations! Need 47² + 19²? Unit digits: 9 + 1 = 0 -> answer MUST end in 0!',
        ],
        workedExamples: [
          { prompt: 'Which option could equal 38 × 47: (A) 1784 (B) 1786 (C) 1788 (D) 1785?', steps: ['Units digit: 8 × 7 = 56 -> must end in 6! Only (B) ends in 6.'], finalAnswer: '(B) 1786' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What units digit does 23 × 17 + 14² have?', answer: '(3×7=1) + (4²=6) -> ends in 7' }],
      },
    ],
    worksheetActivities: [
      { title: '5-HOTS Olympiad Problem Set', instructions: 'Use strategy labels (Bar Model / Parity / Pigeonhole / Units Check):', tasks: ['1) Start ×3 - 5 = 22 -> start = ?', '2) 4 colours of socks -> min draws for 1 pair?', '3) Last digit of 27² + 16²?'] },
    ],
    capstoneProject: {
      title: 'Olympiad Error-Check Toolkit Card',
      brief: 'Solve 6 Achievers-level puzzles showing two checks on each answer (units digit + estimation).',
      rubric: ['Clear visual bar/invariant logic', '100% verified arithmetic'],
    },
    quiz: [
      { id: 'olq1', level: 'Beginner', question: 'Working backwards: Think of a number, multiply by 3, subtract 4, result is 29. What was the start number?', options: ['9', '10', '11', '12'], correctIndex: 2, explanation: '(29 + 4) ÷ 3 = 33 ÷ 3 = 11.' },
      { id: 'olq2', level: 'Beginner', question: 'Riya and Kabir together have 45 marbles. Riya has 4 times as many as Kabir. How many does Kabir have?', options: ['9', '11', '15', '36'], correctIndex: 0, explanation: '1 + 4 = 5 equal units = 45 -> 1 unit = 9.' },
      { id: 'olq3', level: 'Intermediate', question: 'A box holds Red, Green, Yellow, and Blue pens. Minimum draws needed blindly to guarantee 2 of the same colour:', options: ['2', '4', '5', '8'], correctIndex: 2, explanation: 'By Pigeonhole Principle, 4 colours + 1 = 5 draws guarantees a repeat.' },
      { id: 'olq4', level: 'Intermediate', question: 'Why is it impossible for the sum of 7 odd integers to equal 50?', options: ['Odd count of odd numbers always sums to an odd number', '50 is prime', '7 cannot divide 50', 'Even numbers cannot add'], correctIndex: 0, explanation: 'Sum of 7 odd numbers is odd, while 50 is even.' },
      { id: 'olq5', level: 'Advanced', question: 'Which option CANNOT equal 64 × 29 based solely on the units digit?', options: ['1856', '1846', '1854', '1956'], correctIndex: 2, explanation: '4 × 9 = 36 ends in 6, so 1854 (ending in 4) is impossible.' },
    ],
  },

  'financial-literacy': {
    programId: 'financial-literacy',
    part: 2,
    prerequisites: 'Basic percentages and arithmetic.',
    materialsNeeded: ['3-Jar Budget Sheet (Save / Spend / Share)'],
    modules: [
      {
        id: 'fl-beg',
        level: 'Beginner',
        title: 'Needs vs Wants & The 50-30-20 Smart Pocket-Money Rule',
        durationMinutes: 25,
        objectives: ['Separate Needs (food, school books, health) from Wants (gadgets, extra toys).', 'Budget pocket money into Save, Spend, and Share/Goals.'],
        conceptExplanation: [
          'Always "Pay Yourself First": whenever you receive gift or pocket money, set aside your Savings % BEFORE visiting the store!',
        ],
        workedExamples: [
          { prompt: 'A student receives ₹500 birthday gift and follows 50% Savings, 30% Planned Spend, 20% Learning/Sharing.', steps: ['Savings: ₹250; Planned Spend: ₹150; Learning/Share: ₹100.'], finalAnswer: '₹250 / ₹150 / ₹100' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Which is a Need vs a Want: (a) School Shoes (b) Limited-edition video game skin?', answer: '(a) Need, (b) Want' }],
      },
      {
        id: 'fl-int',
        level: 'Intermediate',
        title: 'Banking, Unit Price Math, Simple vs Compound Interest',
        durationMinutes: 30,
        objectives: ['Compare pack prices fairly via Unit Price (₹ per 100g/unit).', 'Compute Simple Interest (PRT/100) vs why Compound Interest grows faster.'],
        conceptExplanation: [
          'Simple Interest pays interest only on the original Principal. Compound Interest pays interest on BOTH Principal AND previously earned interest!',
        ],
        workedExamples: [
          { prompt: 'Compare ₹1,000 at 10% per year for 2 years: Simple vs Compound.', steps: ['Simple: Year 1 ₹100 + Year 2 ₹100 = ₹200 (Total ₹1,200).', 'Compound: Year 1 ₹100 (₹1,100) -> Year 2 10% of 1,100 = ₹110 (Total ₹1,210).'], finalAnswer: 'Compound yields ₹10 extra in 2 years (huge difference over 20 years!)' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Pack A: 400g for ₹80. Pack B: 500g for ₹90. Which is cheaper per 100g?', answer: 'Pack A = ₹20/100g; Pack B = ₹18/100g -> Pack B is cheaper' }],
      },
      {
        id: 'fl-adv',
        level: 'Advanced',
        title: 'UPI & OTP Digital Payment Safety Rules for Families',
        durationMinutes: 25,
        objectives: ['Understand that scanning a QR code or entering a UPI PIN ONLY SENDS money—never receives money!', 'Spot fake prize/refund phishing links immediately.'],
        conceptExplanation: [
          'Golden Rule #1: You NEVER enter your UPI PIN or OTP to RECEIVE money! Anyone claiming "enter PIN to accept prize/refund" is running a scam.',
        ],
        workedExamples: [{ prompt: 'A caller says you won ₹10,000 cashback and sends a "Collect / Pay Request" asking for your UPI PIN.', steps: ['Entering a UPI PIN authorizes money LEAVING your bank account -> Reject and block immediately!'], finalAnswer: 'Scam — Never enter UPI PIN to receive money' }],
        practiceExercises: [{ qNo: 1, question: 'Should you ever share an SMS OTP or bank PIN with "customer support"?', answer: 'NEVER. Genuine banks never ask for OTPs or PINs.' }],
      },
    ],
    worksheetActivities: [
      { title: 'Smart Consumer & Savings Plan Worksheet', instructions: 'Compute:', tasks: ['Compare ₹60/250ml vs ₹100/500ml juice', 'Calculate Simple Interest on ₹2000 at 8% for 3 years'] },
    ],
    capstoneProject: {
      title: '1-Month Personal Savings Goal Blueprint',
      brief: 'Set one ₹500 educational/sport goal, plan weekly Save/Spend budget allocations, and verify target date.',
      rubric: ['Clear Need vs Want separation', 'Accurate arithmetic'],
    },
    quiz: [
      { id: 'flq1', level: 'Beginner', question: 'What does "Pay Yourself First" mean when receiving ₹400 allowance?', options: ['Buy snacks immediately', 'Transfer your Savings share aside first before spending the rest', 'Borrow from friends', 'Spend all ₹400 day one'], correctIndex: 1, explanation: 'Saving before spending ensures goals get funded consistently.' },
      { id: 'flq2', level: 'Intermediate', question: 'Simple Interest on ₹2,000 at 5% per year for 2 years equals:', options: ['₹100', '₹200', '₹250', '₹2,200'], correctIndex: 1, explanation: 'SI = (2000 × 5 × 2) / 100 = ₹200.' },
      { id: 'flq3', level: 'Intermediate', question: 'Why does Compound Interest outgrow Simple Interest over 10+ years?', options: ['Bank doubles rates randomly', 'You earn interest on prior accumulated interest as well as principal', 'Principal disappears', 'Inflation subtracts it'], correctIndex: 1, explanation: 'Compounding adds each period\'s interest into the earning base.' },
      { id: 'flq4', level: 'Advanced', question: 'Do you EVER need to enter your UPI PIN to RECEIVE money sent by someone else?', options: ['Yes, always', 'Only for prizes', 'NO — UPI PIN is strictly required only when money leaves your account', 'Only above ₹500'], correctIndex: 2, explanation: 'Receiving UPI funds requires zero PIN entry; PIN requests authorize outgoing debits.' },
      { id: 'flq5', level: 'Intermediate', question: 'Brand X costs ₹120 for 600g. Brand Y costs ₹90 for 300g. Which has lower unit cost?', options: ['Brand X (₹20 per 100g)', 'Brand Y (₹30 per 100g)', 'Both equal', 'Cannot compare'], correctIndex: 0, explanation: 'X = 120/6 = ₹20 per 100g; Y = 90/3 = ₹30 per 100g.' },
    ],
  },

  'communication-life-skills': {
    programId: 'communication-life-skills',
    part: 2,
    prerequisites: 'None.',
    materialsNeeded: ['Weekly planner grid'],
    modules: [
      {
        id: 'cl-beg',
        level: 'Beginner',
        title: 'Active Listening & Clear "I-Statements" Respectful Speaking',
        durationMinutes: 25,
        objectives: ['Listen without interrupting and paraphrase what the other person meant.', 'Resolve disagreements calmly using "I feel... when... because...".'],
        conceptExplanation: [
          'Instead of blaming ("You never share the ball!"), use an I-statement: "I feel left out when I don\'t get a turn, because I want to play together. Could we rotate every 5 minutes?"',
        ],
        workedExamples: [{ prompt: 'Rewrite: "You broke my ruler, you\'re careless!"', steps: ['I-statement: "I feel upset that my ruler snapped because I need it for Maths today. Can we be gentler with supplies?"'], finalAnswer: 'Respectful problem-solving tone' }],
        practiceExercises: [{ qNo: 1, question: 'Name 2 nonverbal signs of Active Listening.', answer: 'Steady respectful eye contact, nodding, facing speaker without checking phone.' }],
      },
      {
        id: 'cl-int',
        level: 'Intermediate',
        title: 'Time Mastery: Eisenhower Matrix & 25-Minute Focus Blocks',
        durationMinutes: 30,
        objectives: ['Sort tasks into Urgent+Important vs Important-Not-Urgent (exam prep early!).', 'Defeat procrastination with 25-min study / 5-min break Pomodoro blocks.'],
        conceptExplanation: [
          'Top performers spend most of their week in Quadrant 2 (Important, NOT Yet Urgent): revising 1 chapter early BEFORE the night-before panic!',
        ],
        workedExamples: [{ prompt: 'Sort: (A) Tomorrow\'s Math HW (B) Next month\'s Science Project (C) Random notifications.', steps: ['A -> Q1 Urgent+Important; B -> Q2 Plan Now; C -> Q4 Eliminate/Delay.'], finalAnswer: 'Clear daily priority stack' }],
        practiceExercises: [{ qNo: 1, question: 'Which quadrant helps prevent last-night exam stress?', answer: 'Quadrant 2 (Important, Not Urgent — early consistent prep).' }],
      },
      {
        id: 'cl-adv',
        level: 'Advanced',
        title: 'Team Collaboration, Empathy & Growth Mindset Under Setbacks',
        durationMinutes: 30,
        objectives: ['Divide team project roles fairly with clear deadlines.', 'Turn low test marks into specific actionable study adjustments ("Yet" mindset).'],
        conceptExplanation: [
          'Fixed mindset says "I\'m bad at Geometry." Growth mindset says "I haven\'t mastered triangle proofs YET—I need 3 solved examples daily."',
        ],
        workedExamples: [{ prompt: 'Reframe: "I scored 11/20 so I should quit."', steps: ['Audit which 3 errors lost marks (formula, careless sign, unfinished) -> fix 1 habit per week.'], finalAnswer: 'Data-driven improvement plan' }],
        practiceExercises: [{ qNo: 1, question: 'What is the word that turns "I can\'t do this" into a Growth Mindset statement?', answer: '"Yet" ("I can\'t do this YET").' }],
      },
    ],
    worksheetActivities: [
      { title: 'Weekly Time-Priority & Team Plan', instructions: 'Complete for your upcoming week:', tasks: ['List 2 Q2 tasks for next week\'s test', 'Draft 1 calm I-statement', 'List 1 topic you want to master with a "Yet" plan'] },
    ],
    capstoneProject: {
      title: 'Personal Weekly Study & Life-Skills Charter',
      brief: 'Combine a 7-day Q1/Q2 planner, 25/5 focus blocks, and a reflection on a team challenge handled calmly.',
      rubric: ['Realistic time blocks', 'Demonstrates I-statements & Growth Mindset'],
    },
    quiz: [
      { id: 'clq1', level: 'Beginner', question: 'What makes an "I-statement" effective during a disagreement?', options: ['It blames the other person loudly', 'It states feelings and needs calmly without attacking character', 'It avoids talking forever', 'It demands punishment'], correctIndex: 1, explanation: 'I-statements express needs constructively without triggering defensiveness.' },
      { id: 'clq2', level: 'Intermediate', question: 'Revising for an exam starting 2 weeks early falls into which Eisenhower box?', options: ['Urgent & Important (Crisis)', 'Important, Not Yet Urgent (Quality Growth)', 'Urgent, Not Important', 'Neither Urgent nor Important'], correctIndex: 1, explanation: 'Early preparation sits in Quadrant 2—Important, Not Urgent—eliminating panic.' },
      { id: 'clq3', level: 'Intermediate', question: 'A standard Pomodoro study focus block recommends:', options: ['4 hours nonstop without water', '25 minutes focused study followed by a 5-minute break', '5 minutes study, 45 minutes gaming', 'Checking messages every minute'], correctIndex: 1, explanation: '25/5 intervals sustain high concentration while preventing fatigue.' },
      { id: 'clq4', level: 'Advanced', question: 'Which reflects a Growth Mindset response after a low quiz score?', options: ['"I am never going to understand Maths."', '"Let me inspect which chapter caused mistakes and practice 5 problems today."', '"The teacher dislikes everyone."', '"I will skip the next test."'], correctIndex: 1, explanation: 'Growth mindset treats mistakes as diagnostic feedback for targeted practice.' },
      { id: 'clq5', level: 'Beginner', question: 'Active Listening includes:', options: ['Interrupting mid-sentence to tell your own story', 'Staring at your phone while nodding', 'Waiting until the speaker finishes and briefly summarizing their key point', 'Changing topics immediately'], correctIndex: 2, explanation: 'Paraphrasing confirms genuine comprehension and respect.' },
    ],
  },
};
