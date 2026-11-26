import type { SkillProgramCurriculum } from './skillProgramsTypes';

export const SKILL_CURRICULA_PART_1: Record<string, SkillProgramCurriculum> = {
  abacus: {
    programId: 'abacus',
    part: 1,
    prerequisites: 'Ability to count and recognize numbers 0–99.',
    materialsNeeded: ['Standard 1:4 Soroban Abacus frame (or finger-abacus mental grid)', 'Notebook & pencil'],
    modules: [
      {
        id: 'abacus-beg',
        level: 'Beginner',
        title: 'Soroban Frame Mechanics, Value Beads & Direct Addition/Subtraction',
        durationMinutes: 30,
        objectives: [
          'Identify the horizontal beam, upper Heaven bead (value 5), and 4 lower Earth beads (value 1 each).',
          'Set and clear numbers 0 to 99 using thumb (push up Earth beads) and index finger (push down / Heaven bead).',
          'Compute direct sums and differences where enough beads exist on the rod.',
        ],
        conceptExplanation: [
          'A standard Japanese Soroban Abacus rod is divided by a horizontal calculation bar (beam). Any bead touching the beam is counted; beads away from the beam have zero value.',
          'Each column above the bar holds 1 Heaven bead worth 5 units on that rod. Below the bar are 4 Earth beads, each worth 1 unit.',
          'Use your RIGHT THUMB only to move Earth beads UP toward the beam, and your RIGHT INDEX finger to move Earth beads DOWN and Heaven beads UP or DOWN.',
        ],
        workedExamples: [
          {
            prompt: 'Compute 2 + 5 - 1 + 3 on the Units rod directly.',
            steps: [
              'Clear frame (0). Push 2 Earth beads UP with thumb -> rod shows 2.',
              '+ 5: Move Heaven bead DOWN toward the beam with index finger -> rod shows 5 + 2 = 7.',
              '- 1: Move 1 Earth bead DOWN away from beam with index finger -> rod shows 6.',
              '+ 3: Push 3 remaining Earth beads UP toward beam with thumb -> rod shows 5 + 4 = 9.',
            ],
            finalAnswer: '9',
          },
          {
            prompt: 'Represent 47 on the Tens and Units rods, then subtract 15.',
            steps: [
              'Tens rod: push 4 Earth beads UP (40). Units rod: move 1 Heaven bead DOWN (5) and 2 Earth beads UP (2) -> 47.',
              'Subtract 10 from Tens rod (index finger moves 1 Earth bead down -> 30).',
              'Subtract 5 from Units rod (index finger pushes Heaven bead up -> 2). Result: 32.',
            ],
            finalAnswer: '32',
          },
        ],
        practiceExercises: [
          { qNo: 1, question: 'What is the value when 1 Heaven bead and 3 Earth beads touch the beam on the Tens rod?', answer: '80 (8 tens)', hint: 'Heaven = 5, Earth = 3 -> digit 8 on Tens column.' },
          { qNo: 2, question: 'Compute directly using fingers: 1 + 3 + 5 - 4', answer: '5' },
          { qNo: 3, question: 'Compute directly: 24 + 55 - 12', answer: '67' },
          { qNo: 4, question: 'If all 4 Earth beads and the Heaven bead touch the beam on the Units rod, what digit is shown?', answer: '9' },
        ],
      },
      {
        id: 'abacus-int',
        level: 'Intermediate',
        title: 'Small Friends (+5 Complements) & Big Friends (+10 Complements)',
        durationMinutes: 40,
        objectives: [
          'Use Small Friend pairs that sum to 5: (1,4) and (2,3) when Earth beads run out.',
          'Use Big Friend pairs that sum to 10: (1,9), (2,8), (3,7), (4,6), (5,5).',
        ],
        conceptExplanation: [
          'When you need to add +4 on a rod that already shows 3, only 1 Earth bead remains. Instead, use the Small Friend rule: +4 = +5 - 1 (bring Heaven bead down 5, push 1 Earth bead down).',
          'For subtraction without enough Earth beads, invert it: -4 = -5 + 1; -3 = -5 + 2; -2 = -5 + 3; -1 = -5 + 4.',
          'When crossing a ten (e.g., 8 + 4), use Big Friends (+10 complements): +4 = +10 - 6. Push 1 bead up on Tens rod, remove 6 from Units rod.',
        ],
        workedExamples: [
          {
            prompt: 'Calculate 3 + 4 using Small Friends.',
            steps: [
              'Start with 3 Earth beads touching beam on Units rod.',
              'To add +4, Earth beads are insufficient (only 1 free).',
              'Apply Small Friend: +4 = +5 - 1. Move Heaven bead DOWN (+5) and pull 1 Earth bead DOWN (-1).',
              'Beam now touches 1 Heaven + 2 Earth = 7.',
            ],
            finalAnswer: '7',
          },
          {
            prompt: 'Calculate 28 + 16 using Big Friends.',
            steps: [
              'Set 28 (Tens = 2, Units = 8). Add 10 to Tens rod -> 38.',
              'Need +6 on Units rod (which shows 8). Apply Big Friend: +6 = +10 - 4.',
              'Add 1 on Tens rod (Tens = 4). Subtract 4 from Units rod (remove 5, add 1 -> 8 - 4 = 4).',
              'Result on rods: Tens = 4, Units = 4 -> 44.',
            ],
            finalAnswer: '44',
          },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Write the Small Friend complement formula for +3.', answer: '+3 = +5 - 2' },
          { qNo: 2, question: 'Compute 6 - 4 using Small Friends rule.', answer: '2 (since -4 = -5 + 1)' },
          { qNo: 3, question: 'Compute 17 + 8 using Big Friends rule.', answer: '25 (+8 = +10 - 2)' },
          { qNo: 4, question: 'Compute 42 - 7 using Big Friends rule.', answer: '35 (-7 = -10 + 3)' },
        ],
      },
      {
        id: 'abacus-adv',
        level: 'Advanced',
        title: 'Combination Complements & Anzan Mental Bead Visualization',
        durationMinutes: 45,
        objectives: [
          'Combine +10 and +5 rules smoothly (e.g. +6 = +10 - 5 + 1 on rods showing 5–8).',
          'Visualize 2-digit numbers on an imaginary mental Soroban (Anzan) for flash calculations.',
        ],
        conceptExplanation: [
          'On rods showing 5, 6, 7, or 8, subtracting 4 leaves you needing Combination rules: e.g. to compute 7 + 6, 7 has no 6 to subtract directly for +10-4, because Units shows 5+2 (only 2 Earth beads). So -4 becomes (-5 + 1): net rule +6 = +10 - 5 + 1.',
          'Practice Anzan daily by closing your eyes and picturing crisp glowing yellow beads moving up and down along a mental horizontal bar.',
        ],
        workedExamples: [
          {
            prompt: 'Compute 17 + 8 mentally via Anzan bead image.',
            steps: [
              'Picture Tens = 1, Units = 5 + 2 (7).',
              '+8 = +10 - 2: imagine Tens increasing to 2 and 2 lower Earth beads on Units dropping away.',
              'Units rod left only with Heaven bead (5). Mental photo reads 25.',
            ],
            finalAnswer: '25',
          },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Combination formula for +7 when Units rod shows 5 (or 6):', answer: '+7 = +10 - 5 + 2' },
          { qNo: 2, question: 'Anzan Rapid Flash: 14 + 23 - 15 + 18', answer: '40' },
          { qNo: 3, question: '2-digit × 1-digit Abacus split: 36 × 4', answer: '(30×4) + (6×4) = 120 + 24 = 144' },
        ],
      },
    ],
    worksheetActivities: [
      {
        title: '10-Line Soroban Speed Drill',
        instructions: 'Compute each chain strictly left to right on your abacus or mental bead frame without writing intermediate steps.',
        tasks: ['1) 4 + 5 - 3 + 2 =', '2) 8 + 7 - 6 + 9 =', '3) 19 + 24 - 16 + 15 =', '4) 35 + 28 - 19 + 46 =', '5) 62 - 27 + 18 - 14 ='],
      },
    ],
    capstoneProject: {
      title: 'Personal Anzan 60-Second Accuracy Log',
      brief: 'Record 20 single-and-double-digit complement problems timed in 60 seconds and check 100% accuracy.',
      rubric: ['Correct Small/Big friend formula identified', 'Zero counting on fingers', '18/20 or higher accuracy'],
    },
    quiz: [
      { id: 'abq1', level: 'Beginner', question: 'On a standard Soroban Abacus, what value does the upper Heaven bead carry on the Hundreds rod?', options: ['100', '500', '50', '5'], correctIndex: 1, explanation: 'Each column multiplies base digit value by place value: Heaven bead = 5 × 100 = 500.' },
      { id: 'abq2', level: 'Beginner', question: 'Which finger moves lower Earth beads UP toward the beam?', options: ['Index finger', 'Middle finger', 'Right thumb', 'Ring finger'], correctIndex: 2, explanation: 'Standard Soroban finger technique uses the thumb to push Earth beads up and index finger to move beads down.' },
      { id: 'abq3', level: 'Intermediate', question: 'To perform 4 + 3 on the Units rod, which Small Friend complement applies?', options: ['+3 = +5 - 2', '+3 = +10 - 7', '+3 = +5 + 2', '+3 = -5 + 2'], correctIndex: 0, explanation: '3 and 2 are Small Friends (3 + 2 = 5), so +3 equals +5 minus 2.' },
      { id: 'abq4', level: 'Intermediate', question: 'What is the Big Friend formula for +8 on the Abacus?', options: ['+10 - 8', '+5 - 2', '+10 - 2', '-10 + 2'], correctIndex: 2, explanation: 'Big Friend of 8 is 2 (since 8 + 2 = 10), so +8 = +10 - 2.' },
      { id: 'abq5', level: 'Advanced', question: 'What does Anzan refer to in Abacus training?', options: ['Oiling the beads', 'Mental calculation by visualizing the abacus', 'Adding columns right to left', 'Decimal division only'], correctIndex: 1, explanation: 'Anzan is the technique of picturing the Soroban frame mentally to calculate rapidly without physical beads.' },
    ],
  },

  'vedic-maths': {
    programId: 'vedic-maths',
    part: 1,
    prerequisites: 'Multiplication tables 1–10.',
    materialsNeeded: ['Scratch pad for mental cross-check notes'],
    modules: [
      {
        id: 'vedic-beg',
        level: 'Beginner',
        title: 'Nikhilam Subtraction (All from 9, Last from 10) & Base-10/100 Multiply',
        durationMinutes: 30,
        objectives: [
          'Subtract any number from 100, 1000, or 10000 instantly without borrowing.',
          'Multiply numbers near 10 or 100 using signed deficits/surpluses.',
        ],
        conceptExplanation: [
          'Sutra "Nikhilam Navatascaramam Dasatah" means "All from 9 and the last from 10." To do 1000 - 468, subtract 4 and 6 from 9 (5, 3) and the last digit 8 from 10 (2) -> 532.',
          'To multiply two numbers near Base 100 (like 97 × 96), write their deficits from 100 (-3 and -4). Left part = 97 - 4 = 93. Right part (2 digits) = (-3) × (-4) = 12. Answer: 9312.',
        ],
        workedExamples: [
          {
            prompt: 'Compute 10000 - 3724 mentally using Nikhilam.',
            steps: ['9 - 3 = 6', '9 - 7 = 2', '9 - 2 = 7', '10 - 4 = 6'],
            finalAnswer: '6276',
          },
          {
            prompt: 'Multiply 94 × 98 using Base 100 Nikhilam.',
            steps: [
              '94 is -6 from 100; 98 is -2 from 100.',
              'Cross-subtract: 94 - 2 = 92 (or 98 - 6 = 92).',
              'Multiply deficits: (-6) × (-2) = 12.',
              'Combine parts: 92 | 12 -> 9212.',
            ],
            finalAnswer: '9212',
          },
        ],
        practiceExercises: [
          { qNo: 1, question: '1000 - 639 =', answer: '361' },
          { qNo: 2, question: '95 × 97 =', answer: '9215 (left: 95-3=92, right: 5×3=15)' },
          { qNo: 3, question: '104 × 106 =', answer: '11024 (left: 104+6=110, right: 4×6=24)' },
        ],
      },
      {
        id: 'vedic-int',
        level: 'Intermediate',
        title: 'Ekadhikena Purvena (Squaring Ends in 5) & × 11 Trick',
        durationMinutes: 35,
        objectives: [
          'Square any number ending in 5 mentally in 2 seconds.',
          'Multiply any multi-digit number by 11 by neighbor addition.',
        ],
        conceptExplanation: [
          'For n5²: multiply the front part n by (n + 1), then attach 25. Example: 75² -> 7 × 8 = 56, attach 25 -> 5625.',
          'For × 11: copy last digit, add pairs of adjacent digits right-to-left (carrying 1 if sum >= 10), then copy first digit (+ carry). Example: 54 × 11 -> 5 | (5+4) | 4 = 594.',
        ],
        workedExamples: [
          {
            prompt: 'Find 85² and 115².',
            steps: ['85²: 8 × 9 = 72, attach 25 -> 7225.', '115²: 11 × 12 = 132, attach 25 -> 13225.'],
            finalAnswer: '7225 and 13225',
          },
        ],
        practiceExercises: [
          { qNo: 1, question: '65² =', answer: '4225' },
          { qNo: 2, question: '95² =', answer: '9025' },
          { qNo: 3, question: '67 × 11 =', answer: '737 (6 | 13 | 7 -> carry 1 -> 737)' },
        ],
      },
      {
        id: 'vedic-adv',
        level: 'Advanced',
        title: 'Urdhva Tiryagbhyam (Vertical & Crosswise) + Beejank Verification',
        durationMinutes: 40,
        objectives: [
          'Multiply arbitrary 2-digit × 2-digit numbers in a single line using I X I.',
          'Verify products instantly via Digital Root (Beejank mod 9).',
        ],
        conceptExplanation: [
          'For (ab) × (cd): Step 1 (Right vertical) b×d. Step 2 (Crosswise) a×d + b×c (+ carry). Step 3 (Left vertical) a×c (+ carry).',
          'Beejank check: Sum digits repeatedly until single digit (ignoring 9s). Beejank(A × B) must equal Beejank(Product).',
        ],
        workedExamples: [
          {
            prompt: 'Compute 43 × 26 using Vertical & Crosswise, then verify with Beejank.',
            steps: [
              'Right: 3 × 6 = 18 -> write 8, carry 1.',
              'Cross: (4×6) + (3×2) + 1 = 24 + 6 + 1 = 31 -> write 1, carry 3.',
              'Left: (4×2) + 3 = 11 -> result 1118.',
              'Beejank check: 4+3=7, 2+6=8. 7×8=56 -> 5+6=11 -> 2. Answer 1+1+1+8=11 -> 2. Exact match!',
            ],
            finalAnswer: '1118',
          },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Multiply 34 × 52 using Crosswise I X I.', answer: '1768' },
          { qNo: 2, question: 'Find Beejank (digital root) of 47892.', answer: '3 (discard 9, 4+7+8+2=21 -> 2+1=3)' },
        ],
      },
    ],
    worksheetActivities: [
      {
        title: 'Vedic 5-Sutra Rapid Practice Sheet',
        instructions: 'Solve without traditional long multiplication columns.',
        tasks: ['1) 1000 - 487 =', '2) 93 × 96 =', '3) 107 × 108 =', '4) 75² =', '5) 48 × 11 =', '6) 53 × 24 ='],
      },
    ],
    capstoneProject: {
      title: 'Speed Comparison Sheet (Traditional vs Vedic)',
      brief: 'Time yourself solving 10 Base-100 and Crosswise products traditionally vs Vedic Sutras and record time saved.',
      rubric: ['All 10 Beejank checks shown', 'Correct 2-digit padding on Base 100', 'Clear I-X-I steps'],
    },
    quiz: [
      { id: 'vmq1', level: 'Beginner', question: 'Using Nikhilam ("All from 9, last from 10"), what is 1000 - 274?', options: ['726', '736', '826', '626'], correctIndex: 0, explanation: '9-2=7, 9-7=2, 10-4=6 -> 726.' },
      { id: 'vmq2', level: 'Beginner', question: 'Using Base-100 Nikhilam, what is 96 × 98?', options: ['9408', '9418', '9308', '9508'], correctIndex: 0, explanation: 'Deficits -4 and -2. Left: 96-2=94. Right (2 digits): 4×2=08 -> 9408.' },
      { id: 'vmq3', level: 'Intermediate', question: 'What is 85² using Ekadhikena Purvena?', options: ['7225', '6425', '7250', '8125'], correctIndex: 0, explanation: '8 × (8+1) = 72, append 25 -> 7225.' },
      { id: 'vmq4', level: 'Intermediate', question: 'What is 72 × 11?', options: ['782', '792', '892', '772'], correctIndex: 1, explanation: '7 | (7+2) | 2 = 792.' },
      { id: 'vmq5', level: 'Advanced', question: 'What is the Beejank (Digital Root) check of 43 × 26 = 1118?', options: ['Both give 4', 'Both give 2', 'Both give 7', 'Both give 8'], correctIndex: 1, explanation: '7 × 8 = 56 -> 5+6=11 -> 2; 1+1+1+8=11 -> 2.' },
    ],
  },

  'mental-maths': {
    programId: 'mental-maths',
    part: 1,
    prerequisites: 'Addition, subtraction, multiplication up to 12×12.',
    materialsNeeded: ['Stopwatch or timer'],
    modules: [
      {
        id: 'mm-beg',
        level: 'Beginner',
        title: 'Left-to-Right Mental Addition & Compatible Pairs to 10 / 100',
        durationMinutes: 25,
        objectives: ['Add 2-digit numbers left-to-right (tens first, then ones).', 'Spot make-10 and make-100 friendly pairs immediately.'],
        conceptExplanation: [
          'School paper adds right-to-left, but the brain hears numbers left-to-right! For 47 + 38, think 47 + 30 = 77, then + 8 = 85.',
          'Look for compatible complements: 25+75=100, 36+64=100, 18+82=100.',
        ],
        workedExamples: [
          { prompt: 'Add 68 + 57 left-to-right.', steps: ['68 + 50 = 118', '118 + 7 = 125'], finalAnswer: '125' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Add left-to-right: 56 + 39', answer: '95 (56+30=86 -> +9 = 95)' },
          { qNo: 2, question: 'Group compatible pairs: 27 + 44 + 73 + 56', answer: '(27+73) + (44+56) = 100 + 100 = 200' },
        ],
      },
      {
        id: 'mm-int',
        level: 'Intermediate',
        title: 'Compensation, Doubling-Halving & Benchmark Fractions/Percentages',
        durationMinutes: 30,
        objectives: ['Multiply faster via ×5 (= ×10÷2), ×25 (= ×100÷4), and Doubling-Halving.', 'Find 10%, 5%, 15%, 25%, 50% mentally.'],
        conceptExplanation: [
          'Doubling & Halving preserves products: 16 × 35 = 8 × 70 = 560!',
          'Compensation turns ugly numbers clean: 398 + 247 = 400 + 247 - 2 = 645.',
          '10% moves decimal 1 place left. 5% is half of 10%. 15% = 10% + 5%.',
        ],
        workedExamples: [
          { prompt: 'Find 15% of ₹640 mentally.', steps: ['10% of 640 = ₹64', '5% of 640 = half of 64 = ₹32', '15% = 64 + 32 = ₹96'], finalAnswer: '₹96' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Use doubling & halving: 14 × 45', answer: '7 × 90 = 630' },
          { qNo: 2, question: 'Find 25% of 320', answer: '320 ÷ 4 = 80' },
        ],
      },
      {
        id: 'mm-adv',
        level: 'Advanced',
        title: 'Front-End Estimation & Sanity Checks for Word Problems',
        durationMinutes: 30,
        objectives: ['Estimate 3-digit operations to within 5% in 3 seconds.', 'Catch misplaced decimal points immediately.'],
        conceptExplanation: [
          'Before trusting an exam answer, bracket it! For 48.2 × 19.7, roughly 50 × 20 = 1000, so answer must sit just below 1000 (~950).',
        ],
        workedExamples: [
          { prompt: 'Estimate 298 × 41 before computing.', steps: ['Round 298 -> 300, 41 -> 40', 'Estimate: 300 × 40 = 12,000', 'Actual: 12,218 (very close!)'], finalAnswer: '~12,000' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Is 39 × 21 closer to 800 or 8000?', answer: '800 (~40 × 20 = 800; exact = 819)' },
        ],
      },
    ],
    worksheetActivities: [
      { title: 'Mental Grocery & Discount Basket', instructions: 'Compute totals and 15% discount mentally.', tasks: ['Item A ₹240 + Item B ₹160 = ?', '15% off ₹400 = ?', '36 × 25 = ?'] },
    ],
    capstoneProject: {
      title: 'Daily Mental Warmup Tracker (7 Days)',
      brief: 'Complete 15 oral percentage, doubling-halving, and compensation sums daily without pen/paper.',
      rubric: ['Shows compensation or benchmark breakdown', 'Over 85% accuracy'],
    },
    quiz: [
      { id: 'mmq1', level: 'Beginner', question: 'Which pair is compatible to make 100?', options: ['37 and 63', '37 and 73', '44 and 66', '28 and 82'], correctIndex: 0, explanation: '37 + 63 = 100.' },
      { id: 'mmq2', level: 'Intermediate', question: 'Using doubling and halving, 18 × 25 equals:', options: ['9 × 50 = 450', '9 × 25 = 225', '36 × 50 = 1800', '18 × 50 = 900'], correctIndex: 0, explanation: 'Halve 18 -> 9 and double 25 -> 50; 9 × 50 = 450.' },
      { id: 'mmq3', level: 'Intermediate', question: 'What is 15% of 400?', options: ['40', '50', '60', '75'], correctIndex: 2, explanation: '10% = 40, 5% = 20, total 15% = 60.' },
      { id: 'mmq4', level: 'Beginner', question: 'Compute 498 + 165 using compensation:', options: ['500 + 165 - 2 = 663', '500 + 165 + 2 = 667', '653', '673'], correctIndex: 0, explanation: 'Add 2 to make 500, add 165 (=665), subtract 2 (=663).' },
      { id: 'mmq5', level: 'Advanced', question: 'Quick estimate of 51.4 × 19.8 is closest to:', options: ['100', '1,000', '10,000', '250'], correctIndex: 1, explanation: '~50 × 20 = 1,000 (exact: 1017.72).' },
    ],
  },

  phonics: {
    programId: 'phonics',
    part: 1,
    prerequisites: 'Recognition of A–Z alphabet letters.',
    materialsNeeded: ['Sound cards or printed letter tiles'],
    modules: [
      {
        id: 'ph-beg',
        level: 'Beginner',
        title: 'Short Vowel Sounds & Smooth CVC Word Blending',
        durationMinutes: 25,
        objectives: ['Produce crisp pure phoneme sounds without adding extra "-uh" tails.', 'Blend Consonant-Vowel-Consonant (CVC) words cleanly.'],
        conceptExplanation: [
          'Short vowels: a (/æ/ apple), e (/ɛ/ egg), i (/ɪ/ igloo), o (/ɒ/ octopus), u (/ʌ/ umbrella).',
          'Say /m/—not "muh". Stretch continuous sounds (/m/, /s/, /f/) smoothly into the vowel: /sss/-/æ/-/t/ -> sat.',
        ],
        workedExamples: [
          { prompt: 'Blend and segment the word "ship" vs "bat".', steps: ['bat -> 3 phonemes: /b/ + /a/ + /t/', 'ship -> 3 phonemes: /sh/ + /i/ + /p/ (sh is 1 digraph sound)'], finalAnswer: 'bat (3 sounds), ship (3 sounds)' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Blend: /f/ + /o/ + /x/', answer: 'fox' },
          { qNo: 2, question: 'How many phonemes in "frog"?', answer: '4 (/f/ /r/ /o/ /g/)' },
        ],
      },
      {
        id: 'ph-int',
        level: 'Intermediate',
        title: 'Consonant Digraphs (sh, ch, th, wh, ck) & Magic Silent-E',
        durationMinutes: 30,
        objectives: ['Distinguish blends (bl, st — 2 sounds) from digraphs (sh, ch — 1 new sound).', 'Apply Magic-E to turn short vowels into long vowels (tap -> tape).'],
        conceptExplanation: [
          'Two consonants that team up to make ONE sound are digraphs: sh (ship), ch (chip), th (thin/this), ck (duck), wh (whale).',
          'Silent final E jumps over 1 consonant to make the first vowel say its alphabet name: cap -> cape, kit -> kite, hop -> hope, cub -> cube.',
        ],
        workedExamples: [
          { prompt: 'Transform 4 short-vowel words using Magic-E.', steps: ['mad -> made', 'fin -> fine', 'rob -> robe', 'cut -> cute'], finalAnswer: 'Short vowel shifts to Long vowel' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'What happens to "not" when Silent-E is added?', answer: 'note (long /o/)' },
          { qNo: 2, question: 'Circle the digraph in "thick":', answer: 'th and ck' },
        ],
      },
      {
        id: 'ph-adv',
        level: 'Advanced',
        title: 'Vowel Teams (ai/ay, ea/ee, oa/ow), R-Controlled & Syllables',
        durationMinutes: 35,
        objectives: ['Decode vowel teams and R-controlled Bossy-R patterns (ar, or, er, ir, ur).', 'Split 2-syllable words via VC/CV Rabbit Rule.'],
        conceptExplanation: [
          'Bossy R changes vowel sound: car (/ar/), fork (/or/), her/bird/surf (/er/).',
          'Vowel teams: ai in middle (rain), ay at end (play). oi in middle (coin), oy at end (toy).',
        ],
        workedExamples: [
          { prompt: 'Divide "basket" and "sunset" into syllables.', steps: ['bas-ket (VC/CV)', 'sun-set (VC/CV)'], finalAnswer: 'bas·ket, sun·set' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'Which spelling fits the end of a word for /ai/: "pl__"?', answer: 'ay -> play' },
        ],
      },
    ],
    worksheetActivities: [
      { title: 'CVC to Magic-E Transformer', instructions: 'Read aloud and add Magic-E.', tasks: ['1) tap -> ____', '2) hid -> ____', '3) cub -> ____', '4) slop -> ____'] },
    ],
    capstoneProject: {
      title: 'Personal Decodable Mini-Book (10 Sentences)',
      brief: 'Write and read aloud a 10-sentence story using at least 5 digraphs and 5 Magic-E words.',
      rubric: ['Smooth phoneme blending', 'Accurate Magic-E pronunciation'],
    },
    quiz: [
      { id: 'phq1', level: 'Beginner', question: 'Which word has the short /i/ vowel sound?', options: ['kite', 'sit', 'bike', 'rain'], correctIndex: 1, explanation: '"sit" uses short vowel /ɪ/, while kite/bike have long /ī/.' },
      { id: 'phq2', level: 'Intermediate', question: 'How many distinct sounds (phonemes) are in the word "chat"?', options: ['4', '3', '2', '5'], correctIndex: 1, explanation: '"ch" is 1 digraph sound + /æ/ + /t/ = 3 phonemes.' },
      { id: 'phq3', level: 'Intermediate', question: 'What does Magic Silent-E do in the word "made"?', options: ['Makes m silent', 'Makes a long (/ā/)', 'Adds another syllable', 'Changes d to t'], correctIndex: 1, explanation: 'Silent-E turns short /æ/ in "mad" into long /ā/ in "made".' },
      { id: 'phq4', level: 'Advanced', question: 'Which R-controlled pair makes the same sound as "bird"?', options: ['car and jar', 'her and fur', 'fork and corn', 'rain and play'], correctIndex: 1, explanation: 'er, ir, and ur share the /ɜːr/ sound (her, bird, fur).' },
      { id: 'phq5', level: 'Advanced', question: 'How do you split "rabbit" by VC/CV syllable division?', options: ['ra-bbit', 'rab-bit', 'rabb-it', 'r-abbit'], correctIndex: 1, explanation: 'When two consonants stand between two vowels, divide between the consonants: rab-bit.' },
    ],
  },

  'reading-skills': {
    programId: 'reading-skills',
    part: 1,
    prerequisites: 'Basic sentence reading comfort.',
    materialsNeeded: ['Short article or textbook paragraph', 'Highlighter or index card'],
    modules: [
      {
        id: 'rs-beg',
        level: 'Beginner',
        title: 'Phrase Chunking & Punctuation-Guided Expression',
        durationMinutes: 25,
        objectives: ['Stop reading word-by-word and group 3–4 word meaning chunks.', 'Use commas, full stops, and question marks to pace reading.'],
        conceptExplanation: [
          'Instead of reading "The / little / brown / dog / ran / across / the / yard", group phrases: "[The little brown dog] [ran] [across the yard]."',
          'Pause briefly at commas (1 beat), stop at periods (2 beats), and raise pitch slightly at question marks.',
        ],
        workedExamples: [
          { prompt: 'Mark phrase chunks in: "On Sunday morning, Aarav packed his telescope and hiked up the hill."', steps: ['[On Sunday morning,] [Aarav packed his telescope] [and hiked up the hill.]'], finalAnswer: '3 smooth phrases' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Why should we avoid moving a finger under every single word once fluent?', answer: 'It slows eye span to 1 word instead of 3–4 word meaningful chunks.' }],
      },
      {
        id: 'rs-int',
        level: 'Intermediate',
        title: 'SQ3R Active Reading, Skimming & Scanning',
        durationMinutes: 30,
        objectives: ['Distinguish Skimming (gist) vs Scanning (specific fact/date).', 'Apply Survey-Question-Read-Recite-Review on textbook chapters.'],
        conceptExplanation: [
          'Skimming reads titles, topic sentences (often first sentence of paragraphs), and summaries to understand overall topic fast.',
          'Scanning hunts for a exact keyword, number, or proper noun (like "1857" or "Photosynthesis") without reading every line.',
        ],
        workedExamples: [
          { prompt: 'You have 20 seconds to find what year the telescope was invented in a 2-page passage.', steps: ['Use Scanning: look only for 4-digit numerals and proper names.'], finalAnswer: 'Scanning' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Which skill helps find a train departure time on a timetable?', answer: 'Scanning' }],
      },
      {
        id: 'rs-adv',
        level: 'Advanced',
        title: 'Inference vs Explicit Fact & Main Idea Extraction',
        durationMinutes: 35,
        objectives: ['Tell explicit stated facts apart from evidence-based inferences.', 'Identify main idea + supporting details cleanly.'],
        conceptExplanation: [
          'Inference = Text Clues + Background Knowledge. If a passage says "Riya grabbed her umbrella and splashed through puddles," you infer it is raining even if the word rain never appears.',
        ],
        workedExamples: [
          { prompt: 'Sentence: "By 5 PM, the bakery shelves held only crumbs and a sold-out sign." What can you infer?', steps: ['Clue 1: crumbs left. Clue 2: sold-out sign -> Strong demand / busy successful day.'], finalAnswer: 'The bakery sold all its baked goods due to high demand.' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What is the difference between Topic (2–3 words) and Main Idea (complete sentence)?', answer: 'Topic names the subject; Main Idea states the key point the author makes about that subject.' }],
      },
    ],
    worksheetActivities: [
      { title: 'SQ3R Passage Breakdown', instructions: 'Pick any Science chapter page and write:', tasks: ['1 Question from the heading', '1 Topic Sentence', '1 Inference not directly stated'] },
    ],
    capstoneProject: {
      title: '1-Paragraph Precision Summary',
      brief: 'Condense a 400-word article into a clear 50-word summary capturing main idea + 3 supporting points.',
      rubric: ['No copied full sentences', 'Accurate main idea'],
    },
    quiz: [
      { id: 'rsq1', level: 'Beginner', question: 'What is phrase chunking in reading fluency?', options: ['Skipping difficult words', 'Grouping 3–4 words per eye fixation by meaning', 'Reading only last sentences', 'Whispering backwards'], correctIndex: 1, explanation: 'Grouping words into meaningful phrases speeds comprehension and improves oral expression.' },
      { id: 'rsq2', level: 'Intermediate', question: 'Looking quickly down a passage solely to locate a specific date or name is called:', options: ['Scanning', 'Annotating', 'Summarizing', 'Paraphrasing'], correctIndex: 0, explanation: 'Scanning searches rapidly for a specific detail; skimming looks for the overall gist.' },
      { id: 'rsq3', level: 'Intermediate', question: 'In SQ3R, what does the "Q" stand for?', options: ['Quit', 'Quote', 'Question', 'Quantify'], correctIndex: 2, explanation: 'SQ3R stands for Survey, Question, Read, Recite, Review.' },
      { id: 'rsq4', level: 'Advanced', question: '"Meera put on two sweaters and rubbed her freezing hands." That it is cold outside is:', options: ['An explicit date', 'An inference', 'A glossary term', 'A bibliography'], correctIndex: 1, explanation: 'Clues (sweaters, freezing hands) support the logical inference without explicitly naming the temperature.' },
      { id: 'rsq5', level: 'Advanced', question: 'Where is the topic sentence most frequently located in an informational paragraph?', options: ['At the very beginning', 'Hidden inside footnotes', 'In the index', 'Only in dialogue'], correctIndex: 0, explanation: 'Informational paragraphs commonly open with their topic sentence followed by supporting evidence.' },
    ],
  },

  handwriting: {
    programId: 'handwriting',
    part: 1,
    prerequisites: 'None — suitable from Class 1 upwards.',
    materialsNeeded: ['4-line notebook + single-line ruled notebook', 'HB pencil or smooth gel pen'],
    modules: [
      {
        id: 'hw-beg',
        level: 'Beginner',
        title: 'Dynamic Tripod Grip, Posture & The 4-Line Zone System',
        durationMinutes: 25,
        objectives: ['Hold pen lightly with thumb, index, and middle support.', 'Place sky, grass, and root letters strictly in their proper lines.'],
        conceptExplanation: [
          'Paper tilts ~20–30° counter-clockwise for right-handers (clockwise for left-handers) so the wrist glides naturally.',
          'Sky letters (b, d, f, h, k, l, t) touch the top sky line. Grass letters (a, c, e, m, n, o, r, s, u, v, w, x, z) fill the middle x-height zone cleanly. Root letters (g, j, p, q, y) descend below the baseline.',
        ],
        workedExamples: [
          { prompt: 'Classify the word "bright" into Sky, Grass, Root letters.', steps: ['b, h, t -> Sky (ascenders)', 'r, i -> Grass (middle)', 'g -> Root (descender)'], finalAnswer: 'b/h/t tall, r/i mid, g below baseline' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Name all 5 English lowercase root (descender) letters.', answer: 'g, j, p, q, y' }],
      },
      {
        id: 'hw-int',
        level: 'Intermediate',
        title: 'Uniform Slant, Letter Spacing & Anti-Cramp Flow',
        durationMinutes: 30,
        objectives: ['Control spacing: thin finger/toothpick space within words, 1 lowercase "o" gap between letters? No—consistent hairline inside letters and 1 letter-width between words.'],
        conceptExplanation: [
          'Use the "P-O-S-E" rule: Posture straight, O-shaped oval roundness, Slant uniform (all tall stems parallel), Even spaces between words (about one lowercase "m" width).',
        ],
        workedExamples: [
          { prompt: 'Why do loops on e, l, and g close up and look messy?', steps: ['Pen held too upright or too tightly, squeezing curves flat. Relax grip and open counter-ovals.'], finalAnswer: 'Open oval counters improve readability by >50%' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What is the ideal gap between two separate words?', answer: 'Roughly the width of one lowercase "o" or "a".' }],
      },
      {
        id: 'hw-adv',
        level: 'Advanced',
        title: 'Board-Exam Answer Sheet Presentation & Neat Headings',
        durationMinutes: 30,
        objectives: ['Structure school notebooks and exam papers with crisp margins, underlined headings, and clean corrections.'],
        conceptExplanation: [
          'If you make an error, draw ONE neat horizontal line across it—never dark scribbling blobs.',
          'Leave 1 blank line after every answer, box final math answers, and label diagram arrows strictly on the right in horizontal text.',
        ],
        workedExamples: [
          { prompt: 'Lay out a 3-mark Science answer neatly.', steps: ['Write bold Q.No in left margin -> Short intro line -> 3 numbered bullet points -> Underline key term -> Leave 1 line space.'], finalAnswer: 'Clean structured block' },
        ],
        practiceExercises: [{ qNo: 1, question: 'How should a crossed-out mistake be marked neatly in an exam?', answer: 'One single straight horizontal strikethrough line.' }],
      },
    ],
    worksheetActivities: [
      { title: 'Oval & Parallel Stem Drill (5 Lines)', instructions: 'Fill 2 lines of continuous counter-clockwise ovals, then 3 lines of sky-grass-root words ("brightly", "jumping", "elephant").', tasks: ['Uniform height', 'Parallel stems', 'Clean 1-letter word gap'] },
    ],
    capstoneProject: {
      title: 'Before & After Handwriting Transformation Page',
      brief: 'Write a 60-word paragraph on Day 1 and rewrite the same paragraph applying P-O-S-E rules after 6 practice sessions.',
      rubric: ['Consistent x-height', 'Clear ascenders/descenders', 'Even word spacing'],
    },
    quiz: [
      { id: 'hwq1', level: 'Beginner', question: 'Which group contains ONLY "Root" (descender) lowercase letters?', options: ['b, d, h, k', 'g, j, p, q, y', 'a, e, o, u', 'l, t, f, b'], correctIndex: 1, explanation: 'g, j, p, q, and y extend below the writing baseline.' },
      { id: 'hwq2', level: 'Beginner', question: 'Which fingers form the recommended Dynamic Tripod Grip?', options: ['Thumb, index finger, and middle finger resting below', 'All five fingers clenched tight', 'Index and pinky only', 'Ring finger pressing the tip'], correctIndex: 0, explanation: 'Thumb and index pinch lightly while the pen rests on the side of the middle finger.' },
      { id: 'hwq3', level: 'Intermediate', question: 'What makes cursive/print look uneven fastest even if individual letters are neat?', options: ['Inconsistent stem slant angle', 'Using blue ink', 'Writing on ruled lines', 'Using a sharp pencil'], correctIndex: 0, explanation: 'Mixed forward/backward slants break visual harmony; parallel stems make writing immediately legible.' },
      { id: 'hwq4', level: 'Advanced', question: 'What is the cleanest way to correct a spelling error during a board exam?', options: ['Scratch heavily in black spirals', 'Draw one neat single line through the word and write beside/above it', 'Tear out the page', 'Overwrite dark letters on top'], correctIndex: 1, explanation: 'A single clean strikethrough preserves neatness and avoids confusing the examiner.' },
      { id: 'hwq5', level: 'Intermediate', question: 'How wide should the gap between two separate words roughly be?', options: ['Width of one lowercase letter (like "o")', 'Half a page', 'Zero gap', 'Three inches'], correctIndex: 0, explanation: 'Roughly one letter-width keeps sentences crisp without crowding or floating.' },
    ],
  },

  'spoken-english': {
    programId: 'spoken-english',
    part: 1,
    prerequisites: 'Basic English vocabulary.',
    materialsNeeded: ['Mirror or audio recorder on phone/PC'],
    modules: [
      {
        id: 'se-beg',
        level: 'Beginner',
        title: 'High-Frequency Conversation Frames & Polite Requests',
        durationMinutes: 25,
        objectives: ['Replace fragmented 1-word answers with complete polite sentence frames.', 'Use Could you, May I, and Excuse me naturally.'],
        conceptExplanation: [
          'Think in whole frames instead of translating word-for-word! Use templates like: "Could you please repeat that?", "I am looking for...", "May I borrow your pen for a minute?"',
        ],
        workedExamples: [
          { prompt: 'Upgrade: "Give me water." -> Polite spoken request.', steps: ['Add modal frame: "Could I please have a glass of water?"'], finalAnswer: '"Could I please have a glass of water?"' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Convert "Say again" into a polite classroom frame.', answer: '"Excuse me, could you please explain that one more time?"' }],
      },
      {
        id: 'se-int',
        level: 'Intermediate',
        title: 'Fixing Common Everyday Errors & Clear Pronunciation',
        durationMinutes: 30,
        objectives: ['Fix frequent grammar slips ("revert back", "myself", "did not knew").', 'Distinguish /v/ vs /w/ and /s/ vs /sh/ clearly.'],
        conceptExplanation: [
          'Top fixes: Say "I am Aarav" (never "Myself Aarav"); Say "I did not know" (never "did not knew"—"did" already carries past tense!); Say "reply" instead of "revert back".',
        ],
        workedExamples: [
          { prompt: 'Correct: "Myself Rohan and I didn\'t went there yesterday."', steps: ['Change Myself -> My name is / I am', 'Change didn\'t went -> didn\'t go'], finalAnswer: '"My name is Rohan, and I didn\'t go there yesterday."' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Fix: "She didn\'t wrote the test."', answer: '"She didn\'t write the test."' }],
      },
      {
        id: 'se-adv',
        level: 'Advanced',
        title: '1-Minute Structured Impromptu Speaking (PREP Rule)',
        durationMinutes: 35,
        objectives: ['Speak smoothly for 60 seconds without "umm" fillers.', 'Maintain eye contact and clear voice projection.'],
        conceptExplanation: [
          'When asked an opinion unexpectedly, use PREP: Point (state view) -> Reason (why) -> Example (1 real instance) -> Point (wrap up neatly).',
        ],
        workedExamples: [
          { prompt: 'Speak on "Why Reading Daily Helps Students" using PREP.', steps: ['Point: Reading 15 minutes daily boosts exam scores.', 'Reason: It builds vocabulary and focus.', 'Example: Last term, daily story reading helped me understand Science passages faster.', 'Point: So 15 minutes of reading is the smartest daily habit.'], finalAnswer: '4-part smooth 45-second speech' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What does P-R-E-P stand for?', answer: 'Point, Reason, Example, Point' }],
      },
    ],
    worksheetActivities: [
      { title: '5 Everyday Dialogue Role-Plays', instructions: 'Speak both sides aloud cleanly.', tasks: ['At the school library counter', 'Introducing yourself to a new classmate', 'Explaining why homework is late politely'] },
    ],
    capstoneProject: {
      title: '60-Second Voice Introduction & Topic Talk',
      brief: 'Prepare and deliver a clean 60-second introduction + favorite subject pitch using PREP.',
      rubric: ['Zero "Myself..." errors', 'Complete polite sentences', 'Clear PREP structure'],
    },
    quiz: [
      { id: 'seq1', level: 'Beginner', question: 'Which self-introduction is grammatically correct?', options: ['Myself Priya from Class 6.', 'My name is Priya, and I study in Class 6.', 'I is Priya.', 'Me name Priya.'], correctIndex: 1, explanation: 'Avoid starting an introduction with "Myself"; use "I am..." or "My name is...".' },
      { id: 'seq2', level: 'Intermediate', question: 'Choose the correct negative past sentence:', options: ['He did not went to school.', 'He did not go to school.', 'He did not gone to school.', 'He was not went to school.'], correctIndex: 1, explanation: 'After "did not", always use the base verb (V1): "go", never "went".' },
      { id: 'seq3', level: 'Beginner', question: 'Which option sounds most polite when borrowing a notebook?', options: ['Give notebook now.', 'May I borrow your notebook for five minutes, please?', 'Your notebook give me.', 'Take out notebook.'], correctIndex: 1, explanation: '"May I..." with "please" is polite and standard.' },
      { id: 'seq4', level: 'Intermediate', question: 'Which sentence avoids redundant phrasing?', options: ['Please return back the book.', 'Please revert back fast.', 'Please reply by evening.', 'Discuss about the chapter.'], correctIndex: 2, explanation: '"Return" already includes "back", and "discuss" does not take "about".' },
      { id: 'seq5', level: 'Advanced', question: 'In the PREP speaking method, what comes right after giving your Reason?', options: ['A concrete Example', 'Walking off stage', 'Apologizing', 'A list of random words'], correctIndex: 0, explanation: 'PREP = Point -> Reason -> Example -> Point.' },
    ],
  },

  'vocabulary-grammar': {
    programId: 'vocabulary-grammar',
    part: 1,
    prerequisites: 'Basic Parts of Speech awareness.',
    materialsNeeded: ['Personal Word-Root Journal'],
    modules: [
      {
        id: 'vg-beg',
        level: 'Beginner',
        title: 'Greek & Latin Roots, Prefixes & Suffixes Power',
        durationMinutes: 30,
        objectives: ['Unlock dozens of words from roots like tele, bio, graph, port, aqua.', 'Predict meanings using prefixes (un-, dis-, pre-, mis-).'],
        conceptExplanation: [
          'If you know "bio" = life, "auto" = self, and "graph" = write, then autobiography = self + life + writing! Roots act as master keys for unseen vocabulary.',
        ],
        workedExamples: [
          { prompt: 'Decode "transport" and "microscope" using roots.', steps: ['trans (across) + port (carry) = carry across.', 'micro (small) + scope (look/see) = instrument to see tiny things.'], finalAnswer: 'Carry across; device to view tiny objects' },
        ],
        practiceExercises: [
          { qNo: 1, question: 'What does the prefix "pre-" mean in preview and pretest?', answer: 'Before' },
          { qNo: 2, question: 'What does "aqua" mean in aquarium and aquatic?', answer: 'Water' },
        ],
      },
      {
        id: 'vg-int',
        level: 'Intermediate',
        title: 'Subject-Verb Agreement & Tenses Mastery',
        durationMinutes: 35,
        objectives: ['Match singular/plural subjects across prepositional phrases and "each/everyone".', 'Keep tense consistent inside paragraphs.'],
        conceptExplanation: [
          'Golden rule: ignore intervening "of..." phrases when matching verb! "A basket [of ripe apples] IS (not are) on the table." "Each of the students HAS a pass."',
        ],
        workedExamples: [
          { prompt: 'Select the right verb: "Neither the teacher nor the students (was/were) late."', steps: ['With Either/Or and Neither/Nor, verb agrees with the CLOSER noun ("students" = plural).'], finalAnswer: 'were' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Fill in (is/are): "Everyone in our five classes ____ invited."', answer: 'is (Everyone is singular)' }],
      },
      {
        id: 'vg-adv',
        level: 'Advanced',
        title: 'Active vs Passive Transformation & Clause Craft',
        durationMinutes: 35,
        objectives: ['Convert sentences cleanly between Active and Passive Voice without changing tense.', 'Upgrade simple sentences using transition connectors.'],
        conceptExplanation: [
          'Active: Subject performs action ("The chef baked the cake"). Passive: Object becomes subject ("The cake was baked by the chef"). Preserve exact tense!',
        ],
        workedExamples: [
          { prompt: 'Convert to Passive: "The scientist is testing a new vaccine."', steps: ['Identify present continuous ("is testing") -> Passive uses "is being + V3":', 'New subject: "A new vaccine is being tested by the scientist."'], finalAnswer: '"A new vaccine is being tested by the scientist."' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Convert to Active: "The letter was written by Meera."', answer: '"Meera wrote the letter."' }],
      },
    ],
    worksheetActivities: [
      { title: 'Root Builder Matrix', instructions: 'Build 3 words each from roots:', tasks: ['tele (far)', 'spect (look)', 'dict (say/speak)'] },
    ],
    capstoneProject: {
      title: '25-Word Root Family & Grammar Upgrade Portfolio',
      brief: 'Collect 25 root-family words with sentences plus 5 transformed Active/Passive pairs.',
      rubric: ['Accurate root definitions', 'Zero subject-verb mismatches'],
    },
    quiz: [
      { id: 'vgq1', level: 'Beginner', question: 'What does the root "bio" mean in biology and biography?', options: ['Water', 'Earth', 'Life', 'Star'], correctIndex: 2, explanation: 'Greek root "bio" means life.' },
      { id: 'vgq2', level: 'Intermediate', question: 'Choose the grammatically correct sentence:', options: ['The box of chocolates are missing.', 'Each of the players have a jersey.', 'A bouquet of fresh roses smells wonderful.', 'Neither Priya nor her friends is coming.'], correctIndex: 2, explanation: 'Core subject "A bouquet" is singular -> "smells".' },
      { id: 'vgq3', level: 'Intermediate', question: 'Which option uses the prefix "mis-" accurately?', options: ['Misunderstand (understand wrongly)', 'Mishappy', 'Misseven', 'Misbig'], correctIndex: 0, explanation: 'Prefix "mis-" means wrongly or badly.' },
      { id: 'vgq4', level: 'Advanced', question: 'What is the correct Passive Voice of "Ananya won the trophy"?', options: ['The trophy was won by Ananya.', 'The trophy is won by Ananya.', 'The trophy has won Ananya.', 'Ananya was won the trophy.'], correctIndex: 0, explanation: 'Simple past "won" converts to "was won" in passive voice.' },
      { id: 'vgq5', level: 'Advanced', question: 'Which connector best expresses contrast?', options: ['Therefore', 'Furthermore', 'However', 'Similarly'], correctIndex: 2, explanation: '"However" signals a contrast; "therefore" signals a result.' },
    ],
  },

  'memory-development': {
    programId: 'memory-development',
    part: 1,
    prerequisites: 'None.',
    materialsNeeded: ['Notebook for personal 1–10 Peg list & study revision log'],
    modules: [
      {
        id: 'md-beg',
        level: 'Beginner',
        title: 'Story Linking & Number-Shape Peg System (1–10)',
        durationMinutes: 25,
        objectives: ['Turn dull lists into vivid moving cartoons using SEE (Senses, Exaggeration, Emotion).', 'Memorize any 10 ordered items forward or backward via Number-Shape Pegs.'],
        conceptExplanation: [
          'Number-Shape Pegs turn digits into memorable objects: 1=Candle/Pencil, 2=Swan, 3=Handcuffs/Butterfly, 4=Sailboat, 5=Hook, 6=Cherry/Whistle, 7=Boomerang, 8=Snowman, 9=Balloon, 10=Bat & Ball.',
          'To remember Item #4 = "Photosynthesis", picture a giant Sailboat (4) made of glowing green leaves drinking sunlight!',
        ],
        workedExamples: [
          { prompt: 'Link 3 random items: 1-Compass, 2-Pineapple, 3-Telescope.', steps: ['1 (Pencil) draws a spinning Compass; 2 (Swan) balances a giant prickly Pineapple on its head; 3 (Butterfly) peeks through a golden Telescope.'], finalAnswer: 'Ordered recall unlocked' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What makes a mental image stick 10x longer than plain reading?', answer: 'Color, action/motion, exaggeration, and weird humor.' }],
      },
      {
        id: 'md-int',
        level: 'Intermediate',
        title: 'Acronyms, Chaining & The Memory Palace (Loci Method)',
        durationMinutes: 30,
        objectives: ['Construct catchy acrostics for lists (like VIBGYOR or Planets).', 'Place 8–10 Science/History facts along rooms in your own home.'],
        conceptExplanation: [
          'Walk mentally through 8 stations at home: 1. Front Door -> 2. Shoe Rack -> 3. Living Sofa -> 4. TV Unit -> 5. Dining Table -> 6. Kitchen Sink -> 7. Study Desk -> 8. Balcony. Park one vivid picture at each station to recall chapters in exact order!',
        ],
        workedExamples: [
          { prompt: 'Remember Taxonomy Order: Kingdom, Phylum, Class, Order, Family, Genus, Species.', steps: ['Sentence: "King Philip Came Over For Good Soup."'], finalAnswer: 'K-P-C-O-F-G-S' },
        ],
        practiceExercises: [{ qNo: 1, question: 'Why is your own bedroom/home ideal for a Memory Palace?', answer: 'Your spatial brain already knows the room layout effortlessly.' }],
      },
      {
        id: 'md-adv',
        level: 'Advanced',
        title: 'Active Recall + Spaced Repetition (1-3-7-21 Cycle)',
        durationMinutes: 30,
        objectives: ['Beat the Ebbinghaus forgetting curve using timed active self-testing.', 'Eliminate passive rereading illusions.'],
        conceptExplanation: [
          'Reading notes 4 times feels easy but decays fast. Closing the book and recalling key points on Day 1, Day 3, Day 7, and Day 21 locks facts into long-term exam memory.',
        ],
        workedExamples: [
          { prompt: 'If you learn a History chapter on June 1, when are your 4 spaced reviews?', steps: ['June 1 (evening), June 4 (+3d), June 8 (+7d), June 22 (+21d).'], finalAnswer: '4 targeted 5-minute reviews beat 2 hours of last-night cramming' },
        ],
        practiceExercises: [{ qNo: 1, question: 'What is Active Recall?', answer: 'Forcing your brain to retrieve an answer from blank paper before peeking at notes.' }],
      },
    ],
    worksheetActivities: [
      { title: 'Build Your 8-Station Home Memory Palace', instructions: 'List 8 physical stops from your front door to bedroom and attach 8 Solar System planets in order.', tasks: ['Stop 1: Mercury', 'Stop 2: Venus', '...Stop 8: Neptune'] },
    ],
    capstoneProject: {
      title: '15-Fact Chapter Memory Palace Map',
      brief: 'Encode 15 Science or History syllabus points onto a mapped Memory Palace + 1-3-7-21 calendar.',
      rubric: ['Vivid visual hooks', 'Ordered recall verification'],
    },
    quiz: [
      { id: 'mdq1', level: 'Beginner', question: 'Why do exaggerated, bizarre mental pictures stick better than ordinary ones?', options: ['The brain filters out routine details and flags vivid novelty', 'Ordinary words are invisible', 'You only remember things in black and white', 'Only numbers work'], correctIndex: 0, explanation: 'Unusual motion and emotion activate stronger hippocampal memory encoding.' },
      { id: 'mdq2', level: 'Intermediate', question: 'The Method of Loci (Memory Palace) works by pairing information with:', options: ['Random phone numbers', 'Familiar spatial locations along a mental walk', 'Alphabetical dictionaries', 'Loud music'], correctIndex: 1, explanation: 'Spatial memory is one of the strongest human memory systems; walking familiar locations anchors order.' },
      { id: 'mdq3', level: 'Intermediate', question: 'VIBGYOR for rainbow colours is an example of which mnemonic?', options: ['Spaced repetition', 'Acronym / First-letter mnemonic', 'Peg word', 'Speed reading'], correctIndex: 1, explanation: 'VIBGYOR combines the first letters of Violet, Indigo, Blue, Green, Yellow, Orange, Red.' },
      { id: 'mdq4', level: 'Advanced', question: 'Which study method produces significantly stronger exam retention than rereading?', options: ['Highlighting every line yellow', 'Active Recall (self-testing from memory)', 'Reading silently 5 times in one night', 'Copying headings word-for-word'], correctIndex: 1, explanation: 'Retrieving answers without looking strengthens neural recall pathways dramatically.' },
      { id: 'mdq5', level: 'Advanced', question: 'What is the goal of the 1-3-7-21 Spaced Repetition schedule?', options: ['Study 21 hours straight', 'Review just before forgetting occurs to transfer facts to long-term memory', 'Skip weekends', 'Memorize page numbers'], correctIndex: 1, explanation: 'Timed intervals intercept forgetting right as memory fades, multiplying retention with minimal time.' },
    ],
  },
};
