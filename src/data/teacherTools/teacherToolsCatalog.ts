export type TeacherToolCategoryId =
  | 'teaching-lesson-planning'
  | 'worksheets-question-papers'
  | 'assessment-evaluation'
  | 'student-management'
  | 'school-administration'
  | 'interactive-classroom'
  | 'ai-teaching-assistance'
  | 'teacher-productivity';

export type TeacherToolEngineKind =
  | 'lesson_builder'
  | 'question_paper'
  | 'assessment_calc'
  | 'roster_planner'
  | 'schedule_notice'
  | 'classroom_live'
  | 'pedagogy_helper'
  | 'productivity_calc';

export interface TeacherToolDefinition {
  id: string;
  number: number; // 1 to 130
  wave: 1 | 2 | 3 | 4 | 5 | 6;
  category: TeacherToolCategoryId;
  name: string;
  shortDesc: string;
  engine: TeacherToolEngineKind;
  defaultInputs: {
    subject?: string;
    classLevel?: string;
    topic?: string;
    secondaryParam?: string;
  };
  sampleGuidance: string;
  outputTemplate: string;
}

export interface TeacherLearningGuide {
  id: string;
  title: string;
  category: string;
  readTimeMinutes: number;
  summary: string;
  keyStrategies: string[];
  classroomSteps: string[];
  printableTakeaway: string;
}

export const TEACHER_TOOL_CATEGORIES: {
  id: TeacherToolCategoryId;
  label: string;
  shortLabel: string;
  description: string;
}[] = [
  {
    id: 'teaching-lesson-planning',
    label: '1. Teaching & Lesson Planning',
    shortLabel: 'Lesson Planning',
    description: 'Annual pacing, Bloom objectives, TLM selectors & differentiated teaching plans',
  },
  {
    id: 'worksheets-question-papers',
    label: '2. Worksheets & Question Papers',
    shortLabel: 'Question Papers',
    description: 'Blueprint builders, board weightage splits, MCQ/subjective sheet makers & A4 print',
  },
  {
    id: 'assessment-evaluation',
    label: '3. Assessment & Evaluation',
    shortLabel: 'Assessment',
    description: 'Rubrics, score aggregators, weak-topic diagnostics & CCE remarks',
  },
  {
    id: 'student-management',
    label: '4. Student Management',
    shortLabel: 'Students',
    description: 'Attendance percentages, seating charts, random group pickers & PTM slots',
  },
  {
    id: 'school-administration',
    label: '5. School Administration',
    shortLabel: 'Administration',
    description: 'Timetables, substitution rosters, exam hall seating & official circulars',
  },
  {
    id: 'interactive-classroom',
    label: '6. Interactive Classroom',
    shortLabel: 'Classroom',
    description: 'Live timers, flashcard drills, exit tickets, mental maths & angle explorers',
  },
  {
    id: 'ai-teaching-assistance',
    label: '7. AI Teaching Assistance',
    shortLabel: 'AI Teaching Help',
    description: 'Smart misconception predictors, Bloom rewriters, analogies & EN/HI/MR glossaries',
  },
  {
    id: 'teacher-productivity',
    label: '8. Teacher Productivity',
    shortLabel: 'Productivity',
    description: 'Portion meters, copy-checking counters, SGPA calculators & PD logs',
  },
];

type RawToolSpec = [
  TeacherToolCategoryId,
  1 | 2 | 3 | 4 | 5 | 6,
  TeacherToolEngineKind,
  string,
  string,
  string
];

// Exact 130 distinct Teacher Tools (18 + 18 + 16 + 16 + 16 + 16 + 15 + 15 = 130)
const RAW_130_TEACHER_TOOLS: RawToolSpec[] = [
  // Category 1: Teaching & Lesson Planning (18)
  ['teaching-lesson-planning', 1, 'lesson_builder', 'Annual Syllabus Pacing Builder', 'Map total chapters across academic months with buffer revision weeks.', 'Distribute chapters proportionally across Term 1 and Term 2 working weeks.'],
  ['teaching-lesson-planning', 1, 'lesson_builder', 'Monthly Unit Sequencer', 'Break monthly syllabus targets into weekly teaching blocks.', 'Group prerequisite concepts early and reserve Week 4 for formative check.'],
  ['teaching-lesson-planning', 1, 'lesson_builder', 'Daily 40-Min Lesson Builder', 'Structure Warm-Up (5m), Core Concept (18m), Guided Practice (10m), Wrap-Up (7m).', 'Use 4-part pacing to maintain student focus in every period.'],
  ['teaching-lesson-planning', 1, 'lesson_builder', 'Bloom Taxonomy Objective Writer', 'Generate measurable outcomes across Remember, Understand, Apply, Analyse, Evaluate, Create.', 'Start each learning objective with an observable action verb.'],
  ['teaching-lesson-planning', 1, 'lesson_builder', 'NCERT / Balbharati Learning Outcome Mapper', 'Align textbook chapters with board-mandated competency codes.', 'Match each chapter topic with one concrete student demonstration.'],
  ['teaching-lesson-planning', 2, 'lesson_builder', 'Spiral Curriculum Continuity Mapper', 'Identify prior-class prerequisites and next-class extensions for any topic.', 'Review Class n-1 gaps for 5 minutes before introducing new formulas.'],
  ['teaching-lesson-planning', 2, 'lesson_builder', 'Flipped Classroom Pre-Work Planner', 'Create 10-minute home prep tasks before interactive class problem solving.', 'Assign short reading or observation at home; use class time for active practice.'],
  ['teaching-lesson-planning', 2, 'lesson_builder', '3-Tier Differentiated Instruction Builder', 'Design Foundation, Core, and Challenge tasks for mixed-ability classrooms.', 'Ensure every tier targets the same central concept at adjusted scaffolding.'],
  ['teaching-lesson-planning', 2, 'lesson_builder', 'Remedial Teaching Plan Generator', 'Build focused 15-minute catch-up micro-lessons for struggling learners.', 'Diagnose specific step errors rather than repeating the whole chapter.'],
  ['teaching-lesson-planning', 3, 'lesson_builder', 'Academic Bridge Course Designer', 'Create 2-week start-of-year foundation refreshers between classes.', 'Prioritise arithmetic fluency, reading comprehension, and core definitions.'],
  ['teaching-lesson-planning', 3, 'lesson_builder', 'Multigrade Classroom Split Scheduler', 'Manage two grade levels simultaneously with alternating direct & seatwork blocks.', 'Pair silent practice in Grade A with board instruction in Grade B.'],
  ['teaching-lesson-planning', 3, 'lesson_builder', 'Teaching Aids & TLM Selector', 'Select concrete manipulatives, charts, models, and low-cost lab items per topic.', 'Follow Concrete → Pictorial → Abstract progression for primary/middle learners.'],
  ['teaching-lesson-planning', 4, 'lesson_builder', 'Activity-Based Learning (ABL) Script', 'Plan hands-on 15-minute group activities with materials and debrief prompts.', 'Keep group sizes to 3–4 learners with assigned Recorder and Presenter roles.'],
  ['teaching-lesson-planning', 4, 'lesson_builder', 'Storytelling Lesson Hook Generator', 'Open lessons with relatable 3-minute real-life narratives or historical hooks.', 'Connect chapter concepts to daily life before introducing formal definitions.'],
  ['teaching-lesson-planning', 4, 'lesson_builder', 'Science Demonstration Safety & Steps Planner', 'Document aim, apparatus, procedure, observation, and precaution for live demos.', 'Test every demonstration beforehand and list safety rules on the board.'],
  ['teaching-lesson-planning', 5, 'lesson_builder', 'Concept Map & Mind-Map Outliner', 'Organise central ideas, sub-branches, formulas, and examples hierarchically.', 'Visualise chapter links so students revise an entire chapter on one page.'],
  ['teaching-lesson-planning', 5, 'lesson_builder', 'Peer-Teaching Pair Planner', 'Structure buddy explanations with guided checklists for collaborative mastery.', 'Pair steady learners with developing peers using structured prompt cards.'],
  ['teaching-lesson-planning', 6, 'lesson_builder', 'Pre-Exam Revision Week Blueprint', 'Schedule rapid formula recall, past paper drills, and doubt-clearing clinics.', 'Allocate 60% time to weak topics and 40% to timed paper practice.'],

  // Category 2: Worksheets & Question Papers (18)
  ['worksheets-question-papers', 1, 'question_paper', 'Question Paper Blueprint Builder', 'Balance section-wise marks, question counts, and chapter weightage cleanly.', 'Verify total marks match the exam target (20 / 40 / 80 / 100 marks).'],
  ['worksheets-question-papers', 1, 'question_paper', 'Board-Pattern Marks Split Calculator', 'Compute Objective (25%), Short Answer (45%), and Long Answer (30%) distributions.', 'Align internal assessments with SSC / CBSE / ICSE marking schemes.'],
  ['worksheets-question-papers', 1, 'question_paper', 'Balanced Difficulty Mix Generator', 'Configure Easy (40%), Medium (40%), and HOTS/Challenge (20%) question counts.', 'Start papers with confidence-building Easy items before HOTS items.'],
  ['worksheets-question-papers', 1, 'question_paper', 'MCQ Option Shuffler & Key Builder', 'Scramble option orders into Set A / Set B papers with automatic answer keys.', 'Avoid predictable option patterns across consecutive questions.'],
  ['worksheets-question-papers', 2, 'question_paper', 'Fill-in-the-Blanks Sheet Maker', 'Draft textbook-aligned fill-in-the-blank drills with keyword bank & answers.', 'Keep blanks focused on core terminology rather than trivial helper words.'],
  ['worksheets-question-papers', 2, 'question_paper', 'Match-the-Pairs Sheet Maker', 'Create Column A vs Column B matching worksheets with distractor items.', 'Add 1 extra item in Column B to prevent elimination guessing on the last item.'],
  ['worksheets-question-papers', 2, 'question_paper', 'True/False with Reason Maker', 'Build conceptual True/False exercises requiring correction of false statements.', 'Require a 1-line justification so students don’t guess 50/50.'],
  ['worksheets-question-papers', 2, 'question_paper', 'Assertion–Reason Question Builder', 'Author CBSE-style Assertion (A) and Reason (R) competency test items.', 'Verify whether R is both factually true and directly explains A.'],
  ['worksheets-question-papers', 3, 'question_paper', 'Case-Study Passage Question Builder', 'Structure 4-mark scenario paragraphs followed by 3 sub-questions + marking key.', 'Ground scenarios in real-world Indian contexts from the textbook.'],
  ['worksheets-question-papers', 3, 'question_paper', 'Maths Step-Wise Problem Sheet Maker', 'Format word problems with Given → Formula → Steps → Answer with Unit keys.', 'Award partial step marks clearly in the teacher marking key.'],
  ['worksheets-question-papers', 3, 'question_paper', 'Algebraic Equation Practice Generator', 'Produce graded linear and quadratic practice sets with instant answer keys.', 'Progress from integer coefficients to fractions and word applications.'],
  ['worksheets-question-papers', 4, 'question_paper', 'Geometry Proof & Diagram Prompt Builder', 'Create Given / To Prove / Construction / Proof templates for geometric theorems.', 'Include neat figure-labelling instructions for full marks.'],
  ['worksheets-question-papers', 4, 'question_paper', 'Science Diagram Labelling Sheet Maker', 'Build unlabelled diagram callout checklists and biological/physics descriptions.', 'Test both structure recognition and single-line function notes.'],
  ['worksheets-question-papers', 4, 'question_paper', 'Reading Comprehension Worksheet Builder', 'Prepare unseen/seen passages with factual, inferential, and vocabulary items.', 'Include 1 title-selection item and 2 vocabulary-in-context questions.'],
  ['worksheets-question-papers', 5, 'question_paper', 'English Grammar Drill Sheet Maker', 'Build exercises for tenses, voice, speech, clauses, prepositions, and punctuation.', 'Provide rule reminders at the top of each drill section.'],
  ['worksheets-question-papers', 5, 'question_paper', 'Vocabulary & Cloze Test Maker', 'Construct synonym/antonym drills and contextual paragraph cloze passages.', 'Test words drawn directly from the chapter glossary.'],
  ['worksheets-question-papers', 5, 'question_paper', '1-Page Formula & Rule Sheet Builder', 'Compile chapter equations, identities, and units into a crisp A4 revision card.', 'Highlight unit conversions and sign conventions clearly.'],
  ['worksheets-question-papers', 6, 'question_paper', 'A4 Printable Question Paper & Key Exporter', 'Format school header, instructions, sections, and separate Answer Key for print.', 'Always preview pagination before printing class sets.'],

  // Category 3: Assessment & Evaluation (16)
  ['assessment-evaluation', 1, 'assessment_calc', '4-Level Evaluation Rubric Builder', 'Create Exemplary / Proficient / Developing / Needs Support criteria tables.', 'Share rubric descriptors with students before project submission.'],
  ['assessment-evaluation', 1, 'assessment_calc', 'Oral & Viva Assessment Checklist', 'Track fluency, pronunciation, concept clarity, and confidence out of 10/20.', 'Keep oral rubrics quick to score in 90 seconds per student.'],
  ['assessment-evaluation', 1, 'assessment_calc', 'Practical Lab Evaluation Sheet', 'Grade apparatus handling, observation table accuracy, readings, and safety.', 'Separate procedural marks from final numerical result marks.'],
  ['assessment-evaluation', 2, 'assessment_calc', 'Project Work & Model Grading Guide', 'Score originality, research accuracy, presentation, and viva defence.', 'Weight student understanding higher than decorative packaging.'],
  ['assessment-evaluation', 2, 'assessment_calc', 'Class Score Distribution Analyzer', 'Compute class mean, median, highest, lowest, and pass% from entered marks.', 'Use median alongside mean when extreme outliers skew class averages.'],
  ['assessment-evaluation', 2, 'assessment_calc', 'Question Item Difficulty Analyzer', 'Calculate % of students answering each question correctly to spot hard items.', 'Reteach any concept where class accuracy falls below 45%.'],
  ['assessment-evaluation', 3, 'assessment_calc', 'Weak-Topic Diagnostic Matrix', 'Pinpoint specific sub-skills dragging down unit test performance.', 'Group weak topics into immediate reteach vs spiral practice buckets.'],
  ['assessment-evaluation', 3, 'assessment_calc', 'Competency Mastery Tracker', 'Track Emerging / Developing / Mastery tiers per chapter outcome.', 'Focus revision clinics on learners still in the Emerging band.'],
  ['assessment-evaluation', 3, 'assessment_calc', 'Homework Quality & Timeliness Grader', 'Log complete, partial, late, and neatness indicators cleanly.', 'Reward consistency over perfection in daily notebook habits.'],
  ['assessment-evaluation', 4, 'assessment_calc', 'Raw Score to Grade / Percentage Converter', 'Convert raw marks out of 20/25/40/80 into percentages and standard grades.', 'Check rounding policy consistently across all divisions.'],
  ['assessment-evaluation', 4, 'assessment_calc', 'Error Pattern Classifier (Careless vs Concept)', 'Categorise student mistakes into Formula, Calculation, Sign, or Reading errors.', 'Targeted error labels help students self-correct faster.'],
  ['assessment-evaluation', 4, 'assessment_calc', 'Pre-Test vs Post-Test Gain Calculator', 'Measure exact improvement percentage after remedial intervention.', 'Celebrate positive score deltas with learners and parents.'],
  ['assessment-evaluation', 5, 'assessment_calc', 'CCE / Formative Assessment Record Sheet', 'Combine Classwork, Oral, Activity, and Unit Test scores into term totals.', 'Maintain weighted totals automatically across all terms.'],
  ['assessment-evaluation', 5, 'assessment_calc', 'Report Card Remarks Generator', 'Generate constructive, strength-first personalized student report comments.', 'Pair one genuine strength with one actionable improvement step.'],
  ['assessment-evaluation', 6, 'assessment_calc', 'Board Passing & Distinction Threshold Checker', 'Flag students needing grace/support (<35%) vs merit scholars (>75%).', 'Identify borderline learners early for targeted support.'],
  ['assessment-evaluation', 6, 'assessment_calc', 'Moderation & Re-evaluation Tally Sheet', 'Track question-by-question mark revisions cleanly during paper checking.', 'Record old vs revised totals transparently for audit accuracy.'],

  // Category 4: Student Management (16)
  ['student-management', 1, 'roster_planner', 'Daily Attendance Register & % Calculator', 'Mark Present/Absent counts and flag learners below 75% attendance.', 'Review attendance patterns weekly to catch early absenteeism.'],
  ['student-management', 1, 'roster_planner', 'Monthly Attendance Defaulter Alert List', 'Filter students needing parent outreach due to consecutive absences.', 'Send polite, supportive check-in messages after 3 consecutive absences.'],
  ['student-management', 2, 'roster_planner', 'Smart Classroom Seating Chart Designer', 'Arrange benches by rows/columns with front-row vision/focus priorities.', 'Rotate rows monthly so every learner gets fair board visibility.'],
  ['student-management', 2, 'roster_planner', 'Random Student & Fair-Turn Picker', 'Pick non-repeating cold-call names fairly during classroom Q&A.', 'Gives quiet learners equal speaking opportunities.'],
  ['student-management', 2, 'roster_planner', 'Balanced Mixed-Ability Group Maker', 'Split a class list into balanced 3–5 member project teams.', 'Mix strengths so every group has readers, calculators, and presenters.'],
  ['student-management', 3, 'roster_planner', 'Roll Number & Admission Roster Organiser', 'Sort class lists alphabetically or by GR number cleanly.', 'Export clean numbered roll lists for registers and exam sheets.'],
  ['student-management', 3, 'roster_planner', 'Reading Fluency & Comprehension Tracker', 'Log WPM fluency and comprehension bands across primary/middle classes.', 'Track term-on-term reading growth smoothly.'],
  ['student-management', 3, 'roster_planner', 'Positive Behaviour & Star-of-Week Log', 'Record helpfulness, leadership, neatness, and discipline milestones.', 'Reinforce positive habits visibly in front of peers.'],
  ['student-management', 4, 'roster_planner', 'School House & Club Allocator', 'Distribute learners evenly across 4 school houses or academic clubs.', 'Keep gender and class-strength balance across houses.'],
  ['student-management', 4, 'roster_planner', 'Parent-Teacher Meeting (PTM) Slot Scheduler', 'Generate 10-minute sequential parent appointment slots without overlap.', 'Leave a 10-minute buffer every hour for longer parent discussions.'],
  ['student-management', 4, 'roster_planner', 'Student Leave & Medical Absence Log', 'Document approved leaves and arrange missed class notes catch-up.', 'Attach missed worksheet checklist when student returns.'],
  ['student-management', 5, 'roster_planner', 'Class Birthday & Achievement Calendar', 'Organise monthly student birthdays and badge celebrations.', 'Simple acknowledgement boosts classroom belonging.'],
  ['student-management', 5, 'roster_planner', 'Individual Learning Support (IEP) Log', 'Track seating, extra-time, or font-size accommodations privately.', 'Review accommodations at the start of every term.'],
  ['student-management', 5, 'roster_planner', 'Notebook & Assignment Submission Tracker', 'Track pending vs checked notebooks across subjects.', 'Spot chronic non-submission early before term exams.'],
  ['student-management', 6, 'roster_planner', 'Peer Buddy & Study Partner Matcher', 'Pair learners thoughtfully for reading buddies or lab partners.', 'Rotate partners each unit for broader social collaboration.'],
  ['student-management', 6, 'roster_planner', 'Annual Student Promotion & Portfolio Checklist', 'Verify term marks, attendance, and portfolio completion for class promotion.', 'Ensure all certificates and project scores are archived before promotion.'],

  // Category 5: School Administration (16)
  ['school-administration', 1, 'schedule_notice', '8-Period Class Timetable Builder', 'Assign subjects across Mon–Sat periods avoiding heavy back-to-back fatigue.', 'Place Mathematics and Languages during peak morning concentration periods.'],
  ['school-administration', 1, 'schedule_notice', 'Teacher Substitution Duty Planner', 'Reassign vacant periods fairly when faculty are on leave.', 'Balance substitution load across teachers with free periods.'],
  ['school-administration', 2, 'schedule_notice', 'Exam Invigilation Duty Roster', 'Schedule block supervisors across morning and afternoon exam shifts.', 'Avoid assigning subject teachers to invigilate their own subject exam.'],
  ['school-administration', 2, 'schedule_notice', 'Exam Hall Zig-Zag Seating Matrix', 'Interleave two classes/roll ranges across benches to prevent copying.', 'Generate bench-by-bench roll maps for classroom doors.'],
  ['school-administration', 2, 'schedule_notice', 'Holiday & Term Working-Day Calculator', 'Count net instructional days excluding Sundays, festivals, and exam weeks.', 'Keep 10% buffer days for weather or unexpected school closures.'],
  ['school-administration', 3, 'schedule_notice', 'Morning Assembly Programme Planner', 'Schedule prayer, thought-for-the-day, news, quiz, and class presentation duties.', 'Rotate responsibility weekly across classes and houses.'],
  ['school-administration', 3, 'schedule_notice', 'Science & Computer Lab Slot Allocator', 'Coordinate shared laboratory bookings without timetable clashes.', 'Reserve 15 minutes between practical batches for equipment reset.'],
  ['school-administration', 4, 'schedule_notice', 'Textbook & Classroom Inventory Register', 'Track distributed workbooks, chalk/markers, charts, and lab kits.', 'Flag low-stock items ahead of new term openings.'],
  ['school-administration', 4, 'schedule_notice', 'Fee Due Polite Reminder Notice Maker', 'Draft respectful fee instalment reminder circulars with due dates.', 'Always specify office hours and digital payment options clearly.'],
  ['school-administration', 4, 'schedule_notice', 'Bonafide & Character Certificate Drafter', 'Format standard school bonafide / study certificate templates for verification.', 'Verify GR number and date of birth carefully before issuing.'],
  ['school-administration', 5, 'schedule_notice', 'Official School Circular & Parent Notice Builder', 'Generate clean A4 circulars for PTMs, timings, uniforms, or holidays.', 'Include Date, Ref No., Clear Action Item, and Principal/Coordinator sign-off.'],
  ['school-administration', 5, 'schedule_notice', 'PTM Agenda & Talking Points Sheet', 'Prepare structured 5-point discussion agendas for class teachers.', 'Cover Attendance, Academic Progress, Notebook Habits, and Home Support.'],
  ['school-administration', 5, 'schedule_notice', 'Annual Event & Exhibition Checklist', 'Track stage, sound, judges, certificates, and student volunteers.', 'Assign clear owners 14 days prior to Science Fair or Annual Day.'],
  ['school-administration', 6, 'schedule_notice', 'Field Trip Consent & Safety Checklist', 'Draft parent permission slips, emergency contacts, and headcount sheets.', 'Maintain buddy-pair headcounts at every boarding and return stop.'],
  ['school-administration', 6, 'schedule_notice', 'Exam Timetable & Portion Sheet Publisher', 'Format clean exam date-sheets with syllabus chapters and timing rules.', 'Distribute exam schedules at least 3 weeks ahead of assessment week.'],
  ['school-administration', 6, 'schedule_notice', 'Monthly Academic Coordinator Digest', 'Summarise syllabus %, test results, attendance averages, and key notices.', 'Share concise bullet summaries in monthly staff reviews.'],

  // Category 6: Interactive Classroom (16)
  ['interactive-classroom', 1, 'classroom_live', 'Smart-TV Classroom Countdown Timer', 'Large readable 1/2/5/10/15-min countdown timer for class drills & Smart TVs.', 'Visible countdowns keep group activities on schedule effortlessly.'],
  ['interactive-classroom', 1, 'classroom_live', 'Quiz Buzzer & Team Scoreboard', 'Live 4-team scoreboard (+10 / +5 / -5) for classroom quiz competitions.', 'Encourage team discussion before locking final answers.'],
  ['interactive-classroom', 2, 'classroom_live', 'Interactive Vocabulary & Formula Flashcards', 'Flip cards interactively for rapid board/TV oral classroom revision.', 'Ask the whole class to think 3 seconds before revealing the back card.'],
  ['interactive-classroom', 2, 'classroom_live', 'Quick Classroom Poll & Tally Counter', 'Tally A / B / C / D hand-raise votes live to check instant understanding.', 'Re-explain immediately if less than 70% choose the right concept.'],
  ['interactive-classroom', 3, 'classroom_live', '3-2-1 Exit Ticket Prompt Generator', 'Display crisp end-of-period reflection prompts on Smart TV or board.', 'Collect 3 takeaways, 2 examples, and 1 lingering question in 3 minutes.'],
  ['interactive-classroom', 3, 'classroom_live', 'Think-Pair-Share Discussion Timer', 'Three-phase classroom protocol timer: Think (1m) → Pair (2m) → Share (3m).', 'Gives introverted learners thinking time before speaking publicly.'],
  ['interactive-classroom', 3, 'classroom_live', 'Rapid-Fire Mental Maths Caller', 'Generate endless live arithmetic, tables, squares, and percentage drills.', 'Start each maths lesson with 3 minutes of oral mental agility.'],
  ['interactive-classroom', 4, 'classroom_live', 'Spelling Bee & Dictation Word Caller', 'Display graded spelling words with meanings, sentences, and syllable splits.', 'Pronounce word, read example sentence, then repeat clearly.'],
  ['interactive-classroom', 4, 'classroom_live', 'Classroom Noise & Focus Traffic Light', 'Visual Red (Silent), Amber (Whisper Pair), Green (Group Talk) display mode.', 'Set expectations visually before switching classroom tasks.'],
  ['interactive-classroom', 4, 'classroom_live', 'Word-of-the-Day Interactive Board', 'Display English/Hindi/Marathi daily word, meaning, synonym & sample sentence.', 'Challenge students to use today’s word in one notebook sentence.'],
  ['interactive-classroom', 5, 'classroom_live', 'Interactive Fraction & Percentage Visualizer', 'Demonstrate numerator/denominator bars and exact percentage equivalents live.', 'Help learners see why 1/2 = 2/4 = 50% visually.'],
  ['interactive-classroom', 5, 'classroom_live', 'Geometry Angle Type Interactive Explorer', 'Explore Acute, Right, Obtuse, Straight, and Reflex angles with degree sliders.', 'Show real-world clock-hand angles between 0° and 360°.'],
  ['interactive-classroom', 5, 'classroom_live', 'Science Unit Converter (SI / CGS / Temp)', 'Convert m/cm/km, g/kg, °C/K/°F, and m/s ↔ km/h instantaneously.', 'Check conversion factor (×1000 vs ÷1000) step by step on screen.'],
  ['interactive-classroom', 6, 'classroom_live', 'Classroom Debate & Turn Moderator', 'Manage For/Against speaker rounds with timed rebuttal indicators.', 'Teach respectful evidence-backed speaking and active listening.'],
  ['interactive-classroom', 6, 'classroom_live', 'K-W-L Board (Know · Want · Learned)', 'Capture prior knowledge, curiosity questions, and summary takeaways live.', 'Revisit the "Want to Know" column at the end of the chapter.'],
  ['interactive-classroom', 6, 'classroom_live', '2-Minute Brain-Break Activity Spinner', 'Pick energising stretch, deep-breathing, or lateral-riddle breaks between periods.', 'Resets attention quickly during afternoon double periods.'],

  // Category 7: AI Teaching Assistance (15 — deterministic zero-cost pedagogy engines)
  ['ai-teaching-assistance', 2, 'pedagogy_helper', 'Lesson Hook & Real-Life Analogy Suggester', 'Generate age-appropriate Indian real-life analogies for abstract concepts.', 'Pairs concrete everyday objects with textbook definitions.'],
  ['ai-teaching-assistance', 2, 'pedagogy_helper', 'Word-Problem Contextual Framer', 'Turn bare equations into relatable market, train, cricket, or farm word problems.', 'Keep numbers clean and realistic for the target grade.'],
  ['ai-teaching-assistance', 3, 'pedagogy_helper', 'Common Student Misconception Predictor', 'Anticipate typical sign, unit, or grammar traps before teaching a topic.', 'Address common misconceptions explicitly during board examples.'],
  ['ai-teaching-assistance', 3, 'pedagogy_helper', 'Bloom Level Question Rewriter', 'Upgrade simple Recall questions into Application, Analysis, or Evaluation items.', 'Transform "Define X" into "Compare X and Y in a real scenario".'],
  ['ai-teaching-assistance', 3, 'pedagogy_helper', 'Simplified Explainer for Struggling Learners', 'Break dense textbook paragraphs into short 3-step plain-language explanations.', 'Use short sentences and bold keywords.'],
  ['ai-teaching-assistance', 4, 'pedagogy_helper', 'Challenge Extender for Gifted Students', 'Generate open-ended HOTS and Olympiad extensions for early finishers.', 'Keep fast learners engaged meaningfully without busywork.'],
  ['ai-teaching-assistance', 4, 'pedagogy_helper', 'Multilingual Term Bridge (EN / HI / MR)', 'Provide side-by-side English, Hindi, and Marathi subject vocabulary cues.', 'Supports Semi-English and regional medium transitions seamlessly.'],
  ['ai-teaching-assistance', 4, 'pedagogy_helper', 'Essay & Answer Feedback Phrase Assistant', 'Build constructive, encouraging marking remarks tailored to answer quality.', 'Focus feedback on clarity, evidence, and structure.'],
  ['ai-teaching-assistance', 5, 'pedagogy_helper', 'Reading Passage Complexity Estimator', 'Analyse sentence length and vocabulary density to match student grade level.', 'Keep primary passages short and concrete.'],
  ['ai-teaching-assistance', 5, 'pedagogy_helper', 'Cross-Subject Integration Connector', 'Link Math/Science topics with Geography, History, Art, and Life Skills.', 'Supports NEP 2020 multidisciplinary teaching goals.'],
  ['ai-teaching-assistance', 5, 'pedagogy_helper', 'Polite Parent Message Phrasing Assistant', 'Draft empathetic, solution-oriented messages for attendance, marks, or focus concerns.', 'Start with appreciation before raising any concern.'],
  ['ai-teaching-assistance', 6, 'pedagogy_helper', 'Exam Revision Topic Priority Ranker', 'Rank chapters by weightage × difficulty × class weakness score.', 'Allocate extra revision periods to high-weightage weak topics.'],
  ['ai-teaching-assistance', 6, 'pedagogy_helper', 'Concept Prerequisite Dependency Checker', 'List exact earlier concepts needed before starting today’s chapter.', 'Spend 5 minutes checking readiness before new derivations.'],
  ['ai-teaching-assistance', 6, 'pedagogy_helper', 'Mnemonic & Memory Aid Builder', 'Create memorable acronyms and visual cues (BODMAS, VIBGYOR, SOH-CAH-TOA).', 'Pair mnemonics with true conceptual meaning.'],
  ['ai-teaching-assistance', 6, 'pedagogy_helper', 'Weekly Teaching Reflection Coach', 'Guide 5-minute Friday self-review on engagement, pacing, and next-week tweaks.', 'Small weekly adjustments compound across the whole term.'],

  // Category 8: Teacher Productivity (15)
  ['teacher-productivity', 1, 'productivity_calc', 'Daily Period & Task Checklist', 'Manage teaching tasks, copies to check, and admin submissions for today.', 'Clear top 3 priorities before leaving school.'],
  ['teacher-productivity', 1, 'productivity_calc', 'Marks Percentage & GPA Converter', 'Quick batch percentage, CGPA/SGPA, and class distinction calculator.', 'Handles custom max marks (10, 20, 25, 40, 50, 80, 100).'],
  ['teacher-productivity', 2, 'productivity_calc', 'Weighted Term Grade Calculator', 'Compute final term score from Unit Test + Notebook + Activity + Exam weights.', 'Verifies component weight sums equal 100%.'],
  ['teacher-productivity', 2, 'productivity_calc', 'Assignment Deadline & Submission Tracker', 'Track pending due dates across classes and subjects in one view.', 'Flag overdue deadlines cleanly.'],
  ['teacher-productivity', 3, 'productivity_calc', 'Copy-Checking Batch Progress Counter', 'Track checked vs remaining notebooks across divisions cleanly.', 'Log progress batch by batch during free periods.'],
  ['teacher-productivity', 3, 'productivity_calc', 'Parent Call & Follow-Up Log', 'Record parent outreach date, summary, and agreed follow-up action.', 'Maintain concise factual communication records.'],
  ['teacher-productivity', 4, 'productivity_calc', 'Weekly Teaching Workload Calculator', 'Sum teaching periods, lab hours, and substitution duties per week.', 'Ensure balanced preparation and grading time.'],
  ['teacher-productivity', 4, 'productivity_calc', 'Annual Portion Completion % Meter', 'Calculate exact % of textbook chapters taught vs remaining.', 'Spot lagging classes early before exam month.'],
  ['teacher-productivity', 5, 'productivity_calc', 'Continuous Professional Development (PD) Log', 'Track NEP 2020 50-hour annual teacher training workshops & certificates.', 'Log date, hours, host institute, and key classroom takeaway.'],
  ['teacher-productivity', 5, 'productivity_calc', 'NEP 2020 Pedagogical Journal', 'Document competency-based and experiential teaching experiments.', 'Build an evidence portfolio for annual appraisals.'],
  ['teacher-productivity', 5, 'productivity_calc', 'Quick Classroom Sticky Notes Pad', 'Save persistent period reminders locally with zero cloud quota cost.', 'Store exam seat notes, lab keys, or homework cues.'],
  ['teacher-productivity', 6, 'productivity_calc', 'Question Paper Moderation Checklist', 'Verify syllabus coverage, mark totals, diagrams, and zero typos pre-print.', 'Complete all 8 checks before final cyclostyling/printing.'],
  ['teacher-productivity', 6, 'productivity_calc', 'Answer Key Accuracy Proofreader Checklist', 'Cross-verify MCQ indices, step marks, and units before grading starts.', 'Prevents post-exam mark disputes.'],
  ['teacher-productivity', 6, 'productivity_calc', 'Subject Reference Bookmark Organiser', 'Keep verified eBalbharati, NCERT, DIKSHA, and CISCE links organised.', 'One-click access during classroom Smart TV lessons.'],
  ['teacher-productivity', 6, 'productivity_calc', 'End-of-Term Class Handover Checklist', 'Complete registers, mark sheets, leftover syllabus notes, and lockers cleanly.', 'Smooth transition for next term or substitute faculty.'],
];

export const ALL_130_TEACHER_TOOLS: TeacherToolDefinition[] = RAW_130_TEACHER_TOOLS.map(
  ([category, wave, engine, name, shortDesc, sampleGuidance], index) => {
    const num = index + 1;
    const catMeta = TEACHER_TOOL_CATEGORIES.find((c) => c.id === category);
    return {
      id: `TT-${String(num).padStart(3, '0')}`,
      number: num,
      wave,
      category,
      name,
      shortDesc,
      engine,
      defaultInputs: {
        subject: 'Mathematics',
        classLevel: 'Class 5',
        topic: 'Fractions & Real-Life Applications',
        secondaryParam: '40 Minutes / Term 1',
      },
      sampleGuidance,
      outputTemplate: `${name} (${catMeta?.shortLabel || category})`,
    };
  }
);

export const TEACHER_LEARNING_MATERIALS: TeacherLearningGuide[] = [
  {
    id: 'TMG-01',
    title: 'NEP 2020 Competency-Based Lesson Design (5E Pedagogical Model)',
    category: 'Pedagogy & Training',
    readTimeMinutes: 6,
    summary:
      'Step-by-step framework for shifting classrooms from rote memorisation to conceptual mastery using Engage, Explore, Explain, Elaborate, and Evaluate.',
    keyStrategies: [
      'Engage (5 min): Start with a puzzling question, real-world object, or local Maharashtra/Indian context.',
      'Explore (10 min): Let student pairs observe patterns, test manipulatives, or read data before giving definitions.',
      'Explain (12 min): Formalise vocabulary, mathematical formulas, and board notes with student input.',
      'Elaborate & Evaluate (13 min): Apply to an unfamiliar problem + 2-minute exit ticket check.',
    ],
    classroomSteps: [
      'Write 1 clear Learning Outcome on the top-left of the blackboard before class begins.',
      'Limit continuous teacher lecturing to 10–12 minutes maximum per cycle.',
      'Collect at least 3 student responses (including one struggling learner) before confirming an answer.',
    ],
    printableTakeaway: 'Use 5E daily: Hook → Hands-On → Formalise → Apply → Quick Exit Check.',
  },
  {
    id: 'TMG-02',
    title: 'Mathematics Teaching Guide: CRA Method (Concrete → Representational → Abstract)',
    category: 'Subject Teaching Resource (Maths)',
    readTimeMinutes: 7,
    summary:
      'Proven classroom progression to eliminate math anxiety in Classes 1–10 when teaching place value, fractions, integers, algebra, and geometry.',
    keyStrategies: [
      'Concrete Stage: Use paper strips for fractions, straws/sticks for place value, or cardboard cut-outs for area.',
      'Representational Stage: Draw bar models, number lines, area grids, and factor trees on the board.',
      'Abstract Stage: Transition smoothly into symbolic notation (a/b, x+y=10, A=l×b) only after visual understanding.',
    ],
    classroomSteps: [
      'Never introduce a formula without first demonstrating why it holds on a small numerical example.',
      'Mandate 4-line notebook structure: Given → Formula → Step-by-Step Substitution → Final Answer with Unit.',
      'Diagnose whether an error is conceptual (wrong operation) or procedural (arithmetic slip).',
    ],
    printableTakeaway: 'Touch & See (Concrete) → Draw (Visual) → Calculate (Symbolic Formula).',
  },
  {
    id: 'TMG-03',
    title: 'Science Inquiry & Safe Demonstration Handbook (Classes 3–10)',
    category: 'Subject Teaching Resource (Science)',
    readTimeMinutes: 6,
    summary:
      'Practical classroom techniques for conducting inquiry experiments, lab safety checklists, and diagram mastery without expensive lab gear.',
    keyStrategies: [
      'Predict-Observe-Explain (POE): Ask students to predict experiment outcomes in writing before performing the demo.',
      'Low-Cost TLM: Use plastic bottles for air pressure, magnets + iron filings, turmeric indicator for acids/bases.',
      'Diagram Mastery: Teach neat horizontal pencil labelling lines on the right side only—never crossing label lines.',
    ],
    classroomSteps: [
      'Check apparatus stability and fire/chemical precautions 15 minutes before the bell.',
      'Have students record Observations separately from Inferences.',
      'Ask "Give Scientific Reason" questions after every demo.',
    ],
    printableTakeaway: 'Predict first → Observe carefully → Explain scientific principle.',
  },
  {
    id: 'TMG-04',
    title: 'Language & English LSRW Classroom Framework (Listening, Speaking, Reading, Writing)',
    category: 'Subject Teaching Resource (Languages)',
    readTimeMinutes: 5,
    summary:
      'Balanced teaching methods for English, Marathi, and Hindi covering phonics, guided reading, grammar in context, and paragraph writing.',
    keyStrategies: [
      'Modelled Reading: Read prose/poetry aloud with natural intonation before asking students to read in chorus/pairs.',
      'Contextual Grammar: Teach tenses, voice, and parts of speech using sentences from the lesson itself.',
      'Guided Writing Scaffold: Provide a 4-point outline (Opening, 2 Body Points, Closing) before free composition.',
    ],
    classroomSteps: [
      'Maintain a 5-word "Classroom Word Wall" updated every Monday.',
      'Correct writing errors constructively using codes (Sp = Spelling, T = Tense, P = Punctuation).',
      'Give every learner at least 1 minute of structured pair-speaking weekly.',
    ],
    printableTakeaway: 'Hear it → Speak it → Read it aloud → Write with scaffold.',
  },
  {
    id: 'TMG-05',
    title: 'Question Paper Setting & Balanced Assessment Blueprint Guide',
    category: 'Assessment & Examination',
    readTimeMinutes: 6,
    summary:
      'How to construct fair, error-free unit tests and term papers aligned with Maharashtra SSC, CBSE NCF-SE, and ICSE weightage patterns.',
    keyStrategies: [
      'Difficulty Balance: 40% Easy (confidence), 40% Moderate (core syllabus), 20% HOTS/Application.',
      'Clear Marking Scheme: Always write step-wise marks alongside the Teacher Answer Key before printing.',
      'Zero Ambiguity: Verify diagrams, units, and internal choices are balanced in difficulty.',
    ],
    classroomSteps: [
      'Build the Blueprint Grid first (Chapters × Marks × Question Type).',
      'Solve the entire question paper yourself to verify realistic completion time (aim for 80% time usage).',
      'Run a second-teacher moderation check for typos or calculation slips.',
    ],
    printableTakeaway: 'Blueprint First → Solve Every Sum Yourself → Moderation Proofread.',
  },
];
