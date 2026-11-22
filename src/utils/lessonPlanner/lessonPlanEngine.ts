import { ClassLevel, EducationBoard, SubjectName } from '../../types';
import {
  AnnualChapterPlanItem,
  AnnualExamPortionItem,
  AnnualPlanOutput,
  AnnualRevisionBlockItem,
  BoardCalendarConfig,
  CalendarSummaryMetrics,
  DailyLessonPlanItem,
  DailyTeachingPhase,
  GeneratedThreeTabLessonPlan,
  InstructionMedium,
  LessonDayType,
  MonthlyPlanItem,
  MonthlyWeeklyPacingItem,
  OutcomeAttainmentStatus,
  ResolvedCurriculumSubject,
  ResolvedPlanningUnit,
  SchoolCalendarOverride,
  TeacherLessonPlanState,
  TeacherProgressOverviewMetrics,
} from '../../types/lessonPlanner';
import {
  getAllowedMediumsForBoard,
  getDefaultBoardCalendar,
  mergeBoardAndSchoolCalendar,
  validateCalendarConfig,
} from '../../data/lessonPlanner/defaultBoardCalendars';
import { resolveBoardClassSubjectCurriculum } from './curriculumAdapter';

const WEEKDAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const;
const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;
const MONTH_SHORT = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

interface CalendarDayNode {
  date: string; // YYYY-MM-DD
  weekday: number; // 0=Sun..6=Sat
  weekdayLabel: string;
  monthKey: string; // YYYY-MM
  year: number;
  monthIndex: number; // 0..11
  dayOfMonth: number;
  weekNumberInYear: number;
  dayType: LessonDayType;
  isSchoolWorkingDay: boolean;
  isSubjectScheduledDay: boolean;
  holidayName?: string;
  vacationName?: string;
  examName?: string;
  revisionName?: string;
}

function parseIsoDateUtc(isoDate: string): Date {
  const [y, m, d] = isoDate.split('-').map((n) => parseInt(n, 10));
  return new Date(Date.UTC(y || 2026, (m || 1) - 1, d || 1));
}

function formatUtcDateIso(dt: Date): string {
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  const d = String(dt.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function addDaysUtc(dt: Date, days: number): Date {
  return new Date(dt.getTime() + days * 86400000);
}

function getSaturdayOrdinalInMonth(dayOfMonth: number): number {
  return Math.floor((dayOfMonth - 1) / 7) + 1;
}

function isDateInRange(dateIso: string, startIso: string, endIso: string): boolean {
  return dateIso >= startIso && dateIso <= endIso;
}

function normalizeTeachingDays(
  workingDaysOfWeek: number[],
  saturdayRule: BoardCalendarConfig['saturdayRule'],
  requestedTeachingDays: number[],
  periodsPerWeek: number
): number[] {
  const allowedSchoolWeekdays = workingDaysOfWeek.filter((d) => {
    if (d < 1 || d > 6) return false;
    if (d === 6 && saturdayRule === 'off') return false;
    return true;
  });

  const safeSchoolDays =
    allowedSchoolWeekdays.length > 0 ? allowedSchoolWeekdays : [1, 2, 3, 4, 5];

  const filtered = requestedTeachingDays
    .filter((d) => safeSchoolDays.includes(d))
    .filter((v, idx, arr) => arr.indexOf(v) === idx)
    .sort((a, b) => a - b);

  if (filtered.length > 0) return filtered;

  const targetCount = Math.max(1, Math.min(periodsPerWeek, safeSchoolDays.length));
  return safeSchoolDays.slice(0, targetCount);
}

/**
 * Pure working-day calendar solver: iterates chronologically from reopeningDate to endDate,
 * skipping Sundays, off Saturdays, holidays, vacations, and exams.
 */
export function resolveCalendarTimeline(
  calendar: BoardCalendarConfig,
  subjectTeachingDays: number[]
): {
  days: CalendarDayNode[];
  summary: CalendarSummaryMetrics;
} {
  const startDt = parseIsoDateUtc(calendar.reopeningDate);
  const endDt = parseIsoDateUtc(calendar.endDate);
  const warnings = validateCalendarConfig(calendar);

  const holidayMap = new Map<string, string>();
  for (const h of calendar.holidays) {
    if (h.date) holidayMap.set(h.date, h.name || 'Public Holiday');
  }

  const workingSet = new Set<number>(
    calendar.workingDaysOfWeek.filter((d) => d >= 1 && d <= 6)
  );
  const subjectDaySet = new Set<number>(subjectTeachingDays);

  const days: CalendarDayNode[] = [];
  let sundayCount = 0;
  let saturdayOffCount = 0;
  let holidayCount = 0;
  let vacationDayCount = 0;
  let examDayCount = 0;
  let revisionDayCount = 0;
  let totalSchoolWorkingDays = 0;
  let subjectTeachingDaysBeforeDeadline = 0;
  let subjectTeachingDaysFullYear = 0;
  let halfDayCount = 0;

  let cursor = startDt;
  let dayIdx = 0;
  const maxSpanDays = 400; // hard safety cap

  while (cursor <= endDt && dayIdx < maxSpanDays) {
    const dateIso = formatUtcDateIso(cursor);
    const weekday = cursor.getUTCDay();
    const year = cursor.getUTCFullYear();
    const monthIndex = cursor.getUTCMonth();
    const dayOfMonth = cursor.getUTCDate();
    const monthKey = `${year}-${String(monthIndex + 1).padStart(2, '0')}`;
    const weekNumberInYear = Math.floor(dayIdx / 7) + 1;

    const vacationHit = calendar.vacations.find((v) =>
      isDateInRange(dateIso, v.startDate, v.endDate)
    );
    const holidayName = holidayMap.get(dateIso);
    const examHit = calendar.examWindows.find((e) =>
      isDateInRange(dateIso, e.startDate, e.endDate)
    );
    const revisionHit = calendar.revisionWindows.find((r) =>
      isDateInRange(dateIso, r.startDate, r.endDate)
    );

    let dayType: LessonDayType = 'teaching';
    let isSchoolWorkingDay = false;
    let isSubjectScheduledDay = false;

    if (weekday === 0) {
      dayType = 'sunday';
      sundayCount += 1;
    } else if (vacationHit) {
      dayType = 'vacation';
      vacationDayCount += 1;
    } else if (holidayName) {
      dayType = 'holiday';
      holidayCount += 1;
    } else if (
      weekday === 6 &&
      (calendar.saturdayRule === 'off' ||
        !workingSet.has(6) ||
        (calendar.saturdayRule === 'second_fourth_off' &&
          (getSaturdayOrdinalInMonth(dayOfMonth) === 2 ||
            getSaturdayOrdinalInMonth(dayOfMonth) === 4)))
    ) {
      dayType = 'saturday_off';
      saturdayOffCount += 1;
    } else if (!workingSet.has(weekday)) {
      dayType = 'non_timetable_day';
    } else if (examHit) {
      dayType = 'exam';
      examDayCount += 1;
      isSchoolWorkingDay = true;
      totalSchoolWorkingDays += 1;
    } else if (revisionHit) {
      dayType = 'revision';
      revisionDayCount += 1;
      isSchoolWorkingDay = true;
      totalSchoolWorkingDays += 1;
      if (subjectDaySet.has(weekday)) {
        isSubjectScheduledDay = true;
      }
    } else {
      isSchoolWorkingDay = true;
      totalSchoolWorkingDays += 1;
      const isHalfSat = weekday === 6 && calendar.saturdayRule === 'half_day';
      if (isHalfSat) halfDayCount += 1;

      if (subjectDaySet.has(weekday)) {
        dayType = isHalfSat ? 'half_day_teaching' : 'teaching';
        isSubjectScheduledDay = true;
        subjectTeachingDaysFullYear += 1;
        if (dateIso <= calendar.syllabusCompletionDeadline) {
          subjectTeachingDaysBeforeDeadline += 1;
        }
      } else {
        dayType = 'non_timetable_day';
      }
    }

    days.push({
      date: dateIso,
      weekday,
      weekdayLabel: WEEKDAY_NAMES[weekday],
      monthKey,
      year,
      monthIndex,
      dayOfMonth,
      weekNumberInYear,
      dayType,
      isSchoolWorkingDay,
      isSubjectScheduledDay,
      holidayName,
      vacationName: vacationHit?.name,
      examName: examHit?.name,
      revisionName: revisionHit?.name,
    });

    cursor = addDaysUtc(cursor, 1);
    dayIdx += 1;
  }

  let syllabusHealth: CalendarSummaryMetrics['syllabusHealth'] = 'on_track';
  if (subjectTeachingDaysBeforeDeadline < 20) {
    syllabusHealth = 'compressed';
    warnings.push(
      `Only ${subjectTeachingDaysBeforeDeadline} subject teaching days exist before ${calendar.syllabusCompletionDeadline}. Consider increasing weekly periods or reviewing vacations/deadlines.`
    );
  } else if (subjectTeachingDaysBeforeDeadline < 45) {
    syllabusHealth = 'tight';
  }

  return {
    days,
    summary: {
      academicYear: calendar.academicYear,
      board: calendar.board,
      startDate: calendar.startDate,
      reopeningDate: calendar.reopeningDate,
      endDate: calendar.endDate,
      syllabusCompletionDeadline: calendar.syllabusCompletionDeadline,
      totalCalendarDays: days.length,
      sundayCount,
      saturdayOffCount,
      holidayCount,
      vacationDayCount,
      examDayCount,
      revisionDayCount,
      totalSchoolWorkingDays,
      subjectTeachingDaysBeforeDeadline,
      subjectTeachingDaysFullYear,
      halfDayCount,
      syllabusHealth,
      warnings,
    },
  };
}

/**
 * Helper used by Admin Pre-Rollover Preview and Archive Snapshots to summarize a board calendar.
 */
export function computeCalendarArchiveSummary(calendar: BoardCalendarConfig) {
  const { summary } = resolveCalendarTimeline(calendar, calendar.workingDaysOfWeek);
  return {
    totalCalendarDays: summary.totalCalendarDays,
    totalWorkingDays: summary.totalSchoolWorkingDays,
    totalHolidayDays: summary.holidayCount,
    totalVacationDays: summary.vacationDayCount,
    totalExamDays: summary.examDayCount,
    totalRevisionDays: summary.revisionDayCount,
    netTeachingDays: summary.subjectTeachingDaysBeforeDeadline,
  };
}

/**
 * Distributes available teaching periods proportionally across chapters/units,
 * guaranteeing at least 1 scheduled period per unit.
 */
function allocatePeriodsAcrossUnits(
  units: ResolvedPlanningUnit[],
  totalAvailablePeriods: number,
  weightOverrides: Record<string, number>
): number[] {
  const count = units.length;
  if (count === 0) return [];

  const weights = units.map((u) => {
    const ov = weightOverrides[u.unitId];
    if (typeof ov === 'number' && Number.isFinite(ov)) {
      return Math.max(1, Math.min(20, Math.round(ov)));
    }
    return Math.max(1, u.defaultWeight);
  });

  if (totalAvailablePeriods <= count) {
    return units.map(() => 1);
  }

  const totalWeight = weights.reduce((acc, w) => acc + w, 0) || count;
  const rawAlloc = weights.map((w) => (w / totalWeight) * totalAvailablePeriods);
  const floorAlloc = rawAlloc.map((v) => Math.max(1, Math.floor(v)));
  let assigned = floorAlloc.reduce((acc, n) => acc + n, 0);

  // Adjust remainders deterministically so sum matches totalAvailablePeriods
  const remainders = rawAlloc
    .map((v, idx) => ({ idx, rem: v - Math.floor(v) }))
    .sort((a, b) => b.rem - a.rem || a.idx - b.idx);

  let ptr = 0;
  while (assigned < totalAvailablePeriods && remainders.length > 0) {
    floorAlloc[remainders[ptr % remainders.length].idx] += 1;
    assigned += 1;
    ptr += 1;
  }

  while (assigned > totalAvailablePeriods) {
    let maxIdx = -1;
    let maxVal = 1;
    for (let i = 0; i < floorAlloc.length; i++) {
      if (floorAlloc[i] > maxVal) {
        maxVal = floorAlloc[i];
        maxIdx = i;
      }
    }
    if (maxIdx === -1) break;
    floorAlloc[maxIdx] -= 1;
    assigned -= 1;
  }

  return floorAlloc;
}

/**
 * Original MyStudyZone Pedagogical Content Composer (Zero copied textbook prose).
 * Generates subject-domain & grade-stage tailored methods, activities, aids, homework & outcomes.
 */
function getDomainPedagogyProfile(
  curriculum: ResolvedCurriculumSubject,
  unit: ResolvedPlanningUnit
) {
  const { subject, category, stageBand, classNumber } = curriculum;
  const topic = unit.cleanTitle;

  const isMath =
    subject === 'Mathematics' ||
    subject === 'Mathematics – Algebra' ||
    subject === 'Mathematics – Geometry';
  const isScience =
    category === 'science' ||
    subject === 'Science' ||
    subject === 'Physics' ||
    subject === 'Chemistry' ||
    subject === 'Biology';
  const isLanguage = category === 'language';
  const isSocial = category === 'social';

  const hwMinutes =
    stageBand === 'early'
      ? 15
      : stageBand === 'upper_primary'
      ? 20
      : stageBand === 'middle'
      ? 30
      : 40;

  if (isMath) {
    return {
      aids: [
        'Blackboard / Chalk with step-by-step colour coding',
        stageBand === 'early'
          ? 'Counting beads, number strips & paper cut-out shapes'
          : 'Geometry ruler/set-square, graph grid & formula anchor chart',
        'Printed/board worked-example cards for pair checking',
      ],
      activityTitle: `Hands-On Math Modelling: ${topic}`,
      activityInstructions:
        stageBand === 'early'
          ? `Use classroom objects, number cards, and visual groupings to physically demonstrate ${topic} in pairs before writing sums in notebooks.`
          : `Divide learners into small groups to solve 2 real-life Indian context word problems on ${topic}, verify answers by inverse checking, and present one method on the board.`,
      materials:
        stageBand === 'early'
          ? ['Number flashcards', 'Counters/pebbles', 'Squared notebook']
          : ['Graph sheet / Geometry box', 'Chalk & mini-whiteboard', 'Step-verification rubric'],
      prerequisites: `Prior Class ${Math.max(1, classNumber - 1)} numeracy, place-value accuracy, and mental arithmetic fluency linked to ${topic}.`,
      misconceptions: `Sign/place-value slips, skipping intermediate working steps, or misreading units while solving applied problems in ${topic}.`,
      remedial: `Provide scaffolded step-by-step solved templates with smaller numbers and peer-buddy verification before independent practice.`,
      enrichment: `Assign open-ended multi-step reasoning challenges and ask learners to frame their own real-life problem based on ${topic}.`,
      hwMinutes,
      oralPracticalCheckpoint: 'Mental math viva, geometry/graph notebook check & formula recall drill.',
    };
  }

  if (isScience) {
    return {
      aids: [
        'Labelled chalkboard diagram & concept flow-map',
        'Low-cost classroom observation kit / everyday specimens',
        'Cause-and-effect comparison table on the board',
      ],
      activityTitle: `Observation & Inquiry Lab: ${topic}`,
      activityInstructions:
        stageBand === 'early'
          ? `Conduct a guided classroom/schoolyard observation walk related to ${topic}; learners draw one observed detail and share one sentence aloud.`
          : `Perform a structured Predict → Observe → Explain demonstration on ${topic}; students record observations, labelled diagrams, and inference statements in practical journals.`,
      materials: ['Observation notebook', 'Low-cost classroom demo items', 'Diagram stencil / chart'],
      prerequisites: `Everyday sensory observations and earlier foundational concepts connecting directly to ${topic}.`,
      misconceptions: `Confusing everyday colloquial meanings with scientific terms or drawing unlabelled diagrams without directional arrows in ${topic}.`,
      remedial: `Use concrete visual analogies, bilingual keyword flashcards, and guided fill-in-the-diagram worksheets.`,
      enrichment: `Encourage a mini-investigation log connecting ${topic} to local environment, water/energy conservation, or ISRO/Indian science applications.`,
      hwMinutes,
      oralPracticalCheckpoint: 'Practical journal verification, neat labelled diagram test & observation viva.',
    };
  }

  if (isLanguage) {
    return {
      aids: [
        'Story/grammar anchor chart & word-wall strips',
        'Pronunciation model reading & sentence-frame strips',
        'Picture prompt cards for guided expression',
      ],
      activityTitle: `Interactive Reading, Speaking & Language Studio: ${topic}`,
      activityInstructions:
        stageBand === 'early'
          ? `Run choral loud-reading, sound-blending flashcards, and picture-to-sentence matching around ${topic} so every child speaks aloud.`
          : `Conduct pair-reading comprehension, contextual vocabulary mapping, and a short 3-minute structured speaking/writing drill applying ${topic}.`,
      materials: ['Vocabulary flashcards', 'Picture/prompt cards', 'Grammar notebook'],
      prerequisites: `Listening comprehension, core sight vocabulary, and sentence-punctuation habits from previous units.`,
      misconceptions: `Literal word-for-word translation errors, tense/agreement mismatch, or phonetic spelling slips in ${topic}.`,
      remedial: `Offer sentence starters, slow echo-reading in small circles, and visual grammar colour-coding.`,
      enrichment: `Invite learners to compose an original short dialogue, diary entry, or creative paragraph integrating target expressions from ${topic}.`,
      hwMinutes,
      oralPracticalCheckpoint: 'Loud reading fluency, dictation check, recitation & oral comprehension viva.',
    };
  }

  if (isSocial) {
    return {
      aids: [
        'India / Maharashtra / World wall map & timeline strip',
        'Primary-source visual cards & civic flowchart',
        'Comparison chart connecting past/geography to daily civic life',
      ],
      activityTitle: `Map, Timeline & Civic Inquiry Workshop: ${topic}`,
      activityInstructions: `Guide learners to locate key regions/dates for ${topic} on an outline map or timeline strip, followed by a structured 5-minute group discussion linking the concept to responsible citizenship.`,
      materials: ['Outline map / timeline sheet', 'Coloured pencils', 'Group discussion prompt card'],
      prerequisites: `Basic map directions, chronological awareness, and community/civic concepts introduced in earlier grades.`,
      misconceptions: `Memorising isolated dates or terms without grasping cause-and-effect relationships or geographic context in ${topic}.`,
      remedial: `Provide visual chronological flowcharts and simplified key-term summary tables.`,
      enrichment: `Assign a short local-heritage or case-study reflection linking ${topic} to current civic institutions or regional geography.`,
      hwMinutes,
      oralPracticalCheckpoint: 'Map pointing / timeline verification, project chart & oral reasoning viva.',
    };
  }

  // Skill / Computer / IT / Art / PE / Moral / GK / Reasoning
  return {
    aids: [
      'Visual step-sequence chart on chalkboard',
      'Hands-on demonstration model / digital or physical toolkit',
      'Checklist rubric for peer and self-evaluation',
    ],
    activityTitle: `Applied Skill & Creation Studio: ${topic}`,
    activityInstructions: `Demonstrate one complete worked model of ${topic}, then have learners execute a structured hands-on mini-task individually or in pairs using the classroom checklist.`,
    materials: ['Practice sheet / activity kit', 'Checklist rubric', 'Student skill portfolio'],
    prerequisites: `Basic classroom readiness, safe tool handling, and foundational skill habits supporting ${topic}.`,
    misconceptions: `Rushing to final output without planning steps or overlooking accuracy/safety rules in ${topic}.`,
    remedial: `Break the task into 3 micro-steps with immediate teacher check-ins after each step.`,
    enrichment: `Challenge learners to extend the activity with an original variation or peer-mentor a classmate.`,
    hwMinutes,
    oralPracticalCheckpoint: 'Practical skill demonstration, portfolio review & structured oral check.',
  };
}

function buildDaily5PhaseMethodology(
  durationMinutes: number,
  subTopic: string,
  unitTitle: string,
  periodIndex: number,
  totalPeriods: number,
  dayType: 'teaching' | 'half_day_teaching' | 'revision'
): DailyTeachingPhase[] {
  const total = Math.max(25, Math.min(60, durationMinutes));
  const warmUp = Math.max(4, Math.round(total * 0.12));
  const demo = Math.max(8, Math.round(total * 0.28));
  const guided = Math.max(8, Math.round(total * 0.25));
  const activity = Math.max(6, Math.round(total * 0.22));
  const recap = Math.max(4, total - (warmUp + demo + guided + activity));

  if (dayType === 'revision') {
    return [
      {
        phase: 'Warm-Up',
        minutes: warmUp,
        instruction: `Quick 3-question rapid oral recall on key definitions and rules from ${unitTitle}.`,
      },
      {
        phase: 'Concept Demo',
        minutes: demo,
        instruction: `Re-explain high-error areas and common exam mistakes identified during ${subTopic}.`,
      },
      {
        phase: 'Guided Practice',
        minutes: guided,
        instruction: `Timed board-pattern practice set covering mixed-difficulty items on ${subTopic}.`,
      },
      {
        phase: 'Activity / Practical',
        minutes: activity,
        instruction: `Peer-correction workshop using marking-scheme keywords and step checkpoints.`,
      },
      {
        phase: 'Recap & Check',
        minutes: recap,
        instruction: `Identify individual doubt points and assign focused pre-exam revision targets.`,
      },
    ];
  }

  const openingLead =
    periodIndex === 1
      ? `Connect learners' prior real-life experience to introduce ${unitTitle} and preview "${subTopic}".`
      : `Recap Period ${periodIndex - 1} key takeaways using 2 quick oral prompts before transitioning to "${subTopic}".`;

  const closingLead =
    periodIndex === totalPeriods
      ? `Synthesise complete unit highlights of ${unitTitle}, run a 3-point exit check, and preview unit assessment readiness.`
      : `Summarise 3 board takeaways for "${subTopic}" and verify understanding with an exit question before Period ${periodIndex + 1}.`;

  return [
    { phase: 'Warm-Up', minutes: warmUp, instruction: openingLead },
    {
      phase: 'Concept Demo',
      minutes: demo,
      instruction: `Present "${subTopic}" using clear board structure, relatable Indian classroom examples, and step-by-step modelling.`,
    },
    {
      phase: 'Guided Practice',
      minutes: guided,
      instruction: `Solve 2–3 graded examples collaboratively with the class, checking notebook steps and addressing misconceptions immediately.`,
    },
    {
      phase: 'Activity / Practical',
      minutes: activity,
      instruction: `Run a short structured pair/group task applying "${subTopic}" so learners actively demonstrate the concept.`,
    },
    { phase: 'Recap & Check', minutes: recap, instruction: closingLead },
  ];
}

function buildLearningOutcomesForUnit(
  curriculum: ResolvedCurriculumSubject,
  unit: ResolvedPlanningUnit,
  outcomeStatuses: Record<string, OutcomeAttainmentStatus>,
  outcomeNotes: Record<string, string>
): AnnualChapterPlanItem['learningOutcomes'] {
  const topic = unit.cleanTitle;
  const templates: {
    suffix: string;
    bloomLevel: 'Remember & Understand' | 'Apply & Demonstrate' | 'Analyze & Evaluate';
    statement: string;
    assessmentMethod: string;
  }[] = [
    {
      suffix: 'lo1',
      bloomLevel: 'Remember & Understand',
      statement: `Explain core terms, structure, and foundational ideas of "${topic}" accurately in own words (${curriculum.classLevel} ${curriculum.subject}).`,
      assessmentMethod: 'Oral questioning, concept map & 5-minute exit slip',
    },
    {
      suffix: 'lo2',
      bloomLevel: 'Apply & Demonstrate',
      statement: `Apply concepts and procedures from "${topic}" to solve structured classroom exercises and hands-on tasks independently.`,
      assessmentMethod: 'Notebook classwork check, activity rubric & homework verification',
    },
    {
      suffix: 'lo3',
      bloomLevel: 'Analyze & Evaluate',
      statement: `Connect "${topic}" to real-life situations, spot common errors, and justify reasoning during revision and term evaluations.`,
      assessmentMethod: 'Unit/Periodic test items, peer review & oral/practical viva',
    },
  ];

  return templates.map((t) => {
    const outcomeId = `${unit.unitId}__${t.suffix}`;
    return {
      outcomeId,
      bloomLevel: t.bloomLevel,
      statement: t.statement,
      assessmentMethod: t.assessmentMethod,
      status: outcomeStatuses[outcomeId] || 'planned',
      privateNote: outcomeNotes[outcomeId] || '',
    };
  });
}

export interface GenerateLessonPlanInput {
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  boardCalendar?: BoardCalendarConfig | null;
  schoolOverride?: SchoolCalendarOverride | null;
  teacherState?: Partial<TeacherLessonPlanState> | null;
  isArchivedReadOnly?: boolean;
  defaultPeriodMinutes?: number;
}

/**
 * Master Deterministic 3-Tab Generator:
 * Synchronises Annual Plan, Monthly Plan (with embedded Weekly Pacing), and Daily Lesson Plan
 * from a single calendar timeline so changing any authorised calendar setting recalculates all 3 tabs instantly.
 */
export function generateThreeTabLessonPlan(
  input: GenerateLessonPlanInput
): GeneratedThreeTabLessonPlan {
  const baseBoardCal = input.boardCalendar || getDefaultBoardCalendar(input.board);
  const effectiveCalendar = mergeBoardAndSchoolCalendar(baseBoardCal, input.schoolOverride);
  const curriculum = resolveBoardClassSubjectCurriculum(
    input.board,
    input.classLevel,
    input.subject,
    effectiveCalendar.textbookEdition
  );

  const allowedMediums = getAllowedMediumsForBoard(input.board);
  const requestedMedium =
    input.teacherState?.medium ||
    input.schoolOverride?.medium ||
    allowedMediums[0];
  const medium: InstructionMedium = allowedMediums.includes(requestedMedium)
    ? requestedMedium
    : allowedMediums[0];

  const division = (input.teacherState?.division || 'Div A').trim() || 'Div A';
  const schoolName =
    (input.schoolOverride?.schoolName || '').trim() ||
    `${input.board} Partner School`;

  const periodsPerWeek = Math.max(
    1,
    Math.min(
      6,
      input.teacherState?.periodsPerWeek ?? curriculum.defaultPeriodsPerWeek
    )
  );

  const teachingDays = normalizeTeachingDays(
    effectiveCalendar.workingDaysOfWeek,
    effectiveCalendar.saturdayRule,
    input.teacherState?.teachingDays?.length
      ? input.teacherState.teachingDays
      : curriculum.defaultTeachingDays,
    periodsPerWeek
  );

  const { days: timeline, summary: calendarSummary } = resolveCalendarTimeline(
    effectiveCalendar,
    teachingDays
  );

  const baseDuration =
    input.defaultPeriodMinutes || effectiveCalendar.defaultPeriodMinutes || 40;

  // Extract teaching slots up to syllabusCompletionDeadline (with graceful fallback to full-year if deadline is tight)
  const teachingNodesBeforeDeadline = timeline.filter(
    (d) =>
      (d.dayType === 'teaching' || d.dayType === 'half_day_teaching') &&
      d.date <= effectiveCalendar.syllabusCompletionDeadline
  );
  const teachingNodesFullYear = timeline.filter(
    (d) => d.dayType === 'teaching' || d.dayType === 'half_day_teaching'
  );
  const activeTeachingNodes =
    teachingNodesBeforeDeadline.length >= curriculum.units.length
      ? teachingNodesBeforeDeadline
      : teachingNodesFullYear;

  const weightOverrides = input.teacherState?.chapterWeightOverrides || {};
  const allocatedPeriods = allocatePeriodsAcrossUnits(
    curriculum.units,
    activeTeachingNodes.length,
    weightOverrides
  );

  // Build ordered logical lesson slots (one slot per unit period)
  interface LogicalLessonSlot {
    lessonKey: string;
    unit: ResolvedPlanningUnit;
    periodIndexInUnit: number;
    totalPeriodsInUnit: number;
  }

  const logicalSlots: LogicalLessonSlot[] = [];
  curriculum.units.forEach((unit, uIdx) => {
    const count = allocatedPeriods[uIdx] || 1;
    for (let p = 1; p <= count; p++) {
      logicalSlots.push({
        lessonKey: `${unit.unitId}__p${p}`,
        unit,
        periodIndexInUnit: p,
        totalPeriodsInUnit: count,
      });
    }
  });

  const completedDatesSet = new Set<string>(input.teacherState?.completedLessonDates || []);
  const completedDateLocks = input.teacherState?.completedDateLocks || {};
  const shiftAnchorDate = input.teacherState?.shiftAnchorDate;
  const permittedEditsMap = input.teacherState?.permittedEdits || {};
  const privateRemarksMap = input.teacherState?.privateRemarks || {};
  const outcomeStatusesMap = input.teacherState?.outcomeStatuses || {};
  const outcomeNotesMap = input.teacherState?.outcomeNotes || {};

  // Map logical lesson slots to actual chronological teaching dates,
  // honoring locked completed dates and optional mid-year forward shift for uncompleted lessons.
  const dailyPlans: DailyLessonPlanItem[] = [];
  const usedDates = new Set<string>();
  const remainingNodesQueue = [...activeTeachingNodes];
  const overflowNodesQueue = teachingNodesFullYear.filter(
    (n) => !activeTeachingNodes.some((a) => a.date === n.date)
  );
  const combinedQueue = [...remainingNodesQueue, ...overflowNodesQueue];

  const takeNextAvailableNode = (minDate?: string): CalendarDayNode | null => {
    for (let i = 0; i < combinedQueue.length; i++) {
      const candidate = combinedQueue[i];
      if (usedDates.has(candidate.date)) continue;
      if (minDate && candidate.date < minDate) continue;
      usedDates.add(candidate.date);
      return candidate;
    }
    // Fallback if shift pushed past available slots: take earliest unused slot
    for (let i = 0; i < combinedQueue.length; i++) {
      const candidate = combinedQueue[i];
      if (!usedDates.has(candidate.date)) {
        usedDates.add(candidate.date);
        return candidate;
      }
    }
    return null;
  };

  // Pre-build a quick date->node index for locked completions and due-date calculation
  const nodeByDate = new Map<string, CalendarDayNode>();
  for (const n of timeline) nodeByDate.set(n.date, n);

  const findNextWorkingDateAfter = (dateIso: string): string => {
    const idx = timeline.findIndex((d) => d.date === dateIso);
    if (idx >= 0) {
      for (let i = idx + 1; i < timeline.length; i++) {
        if (timeline[i].isSchoolWorkingDay) return timeline[i].date;
      }
    }
    return formatUtcDateIso(addDaysUtc(parseIsoDateUtc(dateIso), 1));
  };

  const unitDateBounds = new Map<
    string,
    { start: string | null; end: string | null; completed: number; total: number }
  >();
  for (const u of curriculum.units) {
    unitDateBounds.set(u.unitId, { start: null, end: null, completed: 0, total: 0 });
  }

  let seq = 1;

  for (const slot of logicalSlots) {
    const lockedDate = completedDateLocks[slot.lessonKey];
    let assignedNode: CalendarDayNode | null = null;

    if (lockedDate && nodeByDate.has(lockedDate) && !usedDates.has(lockedDate)) {
      assignedNode = nodeByDate.get(lockedDate) || null;
      if (assignedNode) usedDates.add(assignedNode.date);
    } else {
      const isAlreadyDoneByDate = Boolean(lockedDate);
      const minDateForSlot =
        !isAlreadyDoneByDate && shiftAnchorDate ? shiftAnchorDate : undefined;
      assignedNode = takeNextAvailableNode(minDateForSlot);
    }

    if (!assignedNode) {
      // Calendar severely compressed; attach to syllabus deadline cleanly so zero units disappear
      assignedNode =
        nodeByDate.get(effectiveCalendar.syllabusCompletionDeadline) ||
        timeline[timeline.length - 1];
      if (!assignedNode) continue;
    }

    const profile = getDomainPedagogyProfile(curriculum, slot.unit);
    const subTopicIndex =
      Math.floor(
        ((slot.periodIndexInUnit - 1) / Math.max(1, slot.totalPeriodsInUnit)) *
          slot.unit.subTopics.length
      ) % Math.max(1, slot.unit.subTopics.length);
    const defaultSubTopic =
      slot.unit.subTopics[subTopicIndex] ||
      `${slot.unit.cleanTitle} — Part ${slot.periodIndexInUnit}`;

    const edits = permittedEditsMap[slot.lessonKey];
    const subTopicFocus = edits?.subTopicFocus?.trim() || defaultSubTopic;
    const isCompleted =
      Boolean(lockedDate) || completedDatesSet.has(assignedNode.date);

    const dayType: 'teaching' | 'half_day_teaching' | 'revision' =
      assignedNode.dayType === 'half_day_teaching' ? 'half_day_teaching' : 'teaching';
    const durationMinutes =
      dayType === 'half_day_teaching' ? Math.max(25, baseDuration - 10) : baseDuration;

    const methodology5Phase = buildDaily5PhaseMethodology(
      durationMinutes,
      subTopicFocus,
      slot.unit.cleanTitle,
      slot.periodIndexInUnit,
      slot.totalPeriodsInUnit,
      dayType
    );

    const dueDate = findNextWorkingDateAfter(assignedNode.date);

    const dailyItem: DailyLessonPlanItem = {
      lessonKey: slot.lessonKey,
      sequenceNumber: seq++,
      date: assignedNode.date,
      weekdayLabel: assignedNode.weekdayLabel,
      monthKey: assignedNode.monthKey,
      weekNumberInYear: assignedNode.weekNumberInYear,
      dayType,
      durationMinutes,
      unitId: slot.unit.unitId,
      unitNumber: slot.unit.unitNumber,
      unitTitle: slot.unit.title,
      unitSourceLabel: curriculum.curriculumSourceLabel,
      periodIndexInUnit: slot.periodIndexInUnit,
      totalPeriodsInUnit: slot.totalPeriodsInUnit,
      subTopicFocus,
      learningObjectives: [
        `Understand and explain the key idea of "${subTopicFocus}" with classroom examples.`,
        `Demonstrate accurate step-by-step practice on ${slot.unit.cleanTitle} (Period ${slot.periodIndexInUnit}/${slot.totalPeriodsInUnit}).`,
      ],
      methodology5Phase,
      teachingAids: edits?.teachingAidNote?.trim()
        ? [edits.teachingAidNote.trim(), ...profile.aids]
        : profile.aids,
      boardSummaryPoints: [
        `Unit ${slot.unit.unitNumber}: ${slot.unit.cleanTitle}`,
        `Focus: ${subTopicFocus}`,
        `Key Check: Verify steps, keywords & neat representation before notebook sign-off.`,
      ],
      activityAndPractical: {
        title: profile.activityTitle,
        instructions: edits?.activityNote?.trim() || profile.activityInstructions,
        materials: profile.materials,
      },
      homeworkPlan: {
        coreTask:
          edits?.homeworkNote?.trim() ||
          `Revise classwork notes on "${subTopicFocus}" and complete 3 structured practice items in your ${curriculum.subject} notebook.`,
        applicationTask: `Write 1 real-life example or self-check question based on "${subTopicFocus}" for tomorrow's warm-up.`,
        estimatedMinutes: profile.hwMinutes,
        dueDate,
      },
      formativeCheck: `3-minute oral & notebook exit check on "${subTopicFocus}" (target: 80% class readiness before next period).`,
      isCompleted,
      lockedCompletedDate: lockedDate,
      permittedEdits: edits,
      privateRemark: privateRemarksMap[slot.lessonKey] || '',
    };

    dailyPlans.push(dailyItem);

    const bounds = unitDateBounds.get(slot.unit.unitId);
    if (bounds) {
      if (!bounds.start || assignedNode.date < bounds.start) bounds.start = assignedNode.date;
      if (!bounds.end || assignedNode.date > bounds.end) bounds.end = assignedNode.date;
      bounds.total += 1;
      if (isCompleted) bounds.completed += 1;
    }
  }

  // Also include Revision Window sessions inside Daily Plans so revision blocks stay synchronised
  const revisionNodes = timeline.filter(
    (d) => d.dayType === 'revision' && d.isSubjectScheduledDay
  );
  for (let rIdx = 0; rIdx < revisionNodes.length; rIdx++) {
    const revNode = revisionNodes[rIdx];
    const lessonKey = `rev__${revNode.date}`;
    const coveredUnitsSoFar = curriculum.units.filter((u) => {
      const b = unitDateBounds.get(u.unitId);
      return b?.start && b.start <= revNode.date;
    });
    const focusUnit =
      coveredUnitsSoFar[rIdx % Math.max(1, coveredUnitsSoFar.length)] ||
      curriculum.units[0];
    if (!focusUnit) continue;

    const profile = getDomainPedagogyProfile(curriculum, focusUnit);
    const edits = permittedEditsMap[lessonKey];
    const subTopicFocus =
      edits?.subTopicFocus?.trim() ||
      `${revNode.revisionName || 'Scheduled Revision'}: ${focusUnit.cleanTitle}`;
    const isCompleted =
      Boolean(completedDateLocks[lessonKey]) || completedDatesSet.has(revNode.date);

    dailyPlans.push({
      lessonKey,
      sequenceNumber: seq++,
      date: revNode.date,
      weekdayLabel: revNode.weekdayLabel,
      monthKey: revNode.monthKey,
      weekNumberInYear: revNode.weekNumberInYear,
      dayType: 'revision',
      durationMinutes: baseDuration,
      unitId: focusUnit.unitId,
      unitNumber: focusUnit.unitNumber,
      unitTitle: `${revNode.revisionName || 'Revision'} — ${focusUnit.title}`,
      unitSourceLabel: curriculum.curriculumSourceLabel,
      periodIndexInUnit: rIdx + 1,
      totalPeriodsInUnit: revisionNodes.length,
      subTopicFocus,
      learningObjectives: [
        `Consolidate key concepts, rules, and board-pattern answers for ${focusUnit.cleanTitle}.`,
        `Resolve individual student misconceptions prior to upcoming examination.`,
      ],
      methodology5Phase: buildDaily5PhaseMethodology(
        baseDuration,
        subTopicFocus,
        focusUnit.cleanTitle,
        rIdx + 1,
        revisionNodes.length,
        'revision'
      ),
      teachingAids: edits?.teachingAidNote?.trim()
        ? [edits.teachingAidNote.trim(), 'Previous-unit recap chart & sample rubric']
        : ['Recap anchor chart', 'Timed revision practice sheet', 'Marking-scheme checklist'],
      boardSummaryPoints: [
        `Revision Target: ${revNode.revisionName || 'Pre-Exam Consolidation'}`,
        `Unit Focus: ${focusUnit.cleanTitle}`,
        `Exam Readiness: Time management, neat diagrams/steps & keyword accuracy.`,
      ],
      activityAndPractical: {
        title: `Peer Revision & Viva Drill: ${focusUnit.cleanTitle}`,
        instructions:
          edits?.activityNote?.trim() ||
          `Conduct rapid pair-quizzing and step-error spotting on high-weightage questions from ${focusUnit.cleanTitle}.`,
        materials: ['Revision checklist', 'Practice notebook', 'Marking rubric'],
      },
      homeworkPlan: {
        coreTask:
          edits?.homeworkNote?.trim() ||
          `Complete 1 timed self-test set on ${focusUnit.cleanTitle} and flag any doubts for next class.`,
        applicationTask: `Prepare a 5-bullet one-page summary card for ${focusUnit.cleanTitle}.`,
        estimatedMinutes: profile.hwMinutes,
        dueDate: findNextWorkingDateAfter(revNode.date),
      },
      formativeCheck: `Timed 10-minute diagnostic check + doubt-resolution log on ${focusUnit.cleanTitle}.`,
      isCompleted,
      lockedCompletedDate: completedDateLocks[lessonKey],
      permittedEdits: edits,
      privateRemark: privateRemarksMap[lessonKey] || '',
    });
  }

  // Sort daily plans strictly chronologically & re-index sequenceNumber
  dailyPlans.sort((a, b) => a.date.localeCompare(b.date) || a.sequenceNumber - b.sequenceNumber);
  dailyPlans.forEach((item, idx) => {
    item.sequenceNumber = idx + 1;
  });

  // ------------------------------------------------------------------
  // 1. ANNUAL PLAN OUTPUT (Term 1/2 Chapters + Exam & Revision Roadmap + Outcomes)
  // ------------------------------------------------------------------
  const completedChapterIdsSet = new Set<string>(input.teacherState?.completedChapterIds || []);

  const allChapters: AnnualChapterPlanItem[] = curriculum.units.map((unit, idx) => {
    const profile = getDomainPedagogyProfile(curriculum, unit);
    const bounds = unitDateBounds.get(unit.unitId) || {
      start: null,
      end: null,
      completed: 0,
      total: 0,
    };
    const outcomes = buildLearningOutcomesForUnit(
      curriculum,
      unit,
      outcomeStatusesMap,
      outcomeNotesMap
    );
    const pct =
      bounds.total > 0 ? Math.round((bounds.completed / bounds.total) * 100) : 0;
    const isCompleted =
      completedChapterIdsSet.has(unit.unitId) ||
      (bounds.total > 0 && bounds.completed >= bounds.total);

    return {
      unitId: unit.unitId,
      unitNumber: unit.unitNumber,
      title: unit.title,
      cleanTitle: unit.cleanTitle,
      sourceKind: unit.sourceKind,
      term: unit.recommendedTerm,
      allocatedPeriods: allocatedPeriods[idx] || 1,
      defaultWeight: unit.defaultWeight,
      plannedStartDate: bounds.start,
      plannedEndDate: bounds.end,
      prerequisites: profile.prerequisites,
      keyConcepts: unit.subTopics,
      commonMisconceptions: profile.misconceptions,
      remedialStrategy: profile.remedial,
      enrichmentStrategy: profile.enrichment,
      suggestedActivity: profile.activityTitle,
      practicalMaterials: profile.materials,
      learningOutcomes: outcomes,
      completedLessonsCount: bounds.completed,
      totalLessonsCount: bounds.total,
      completionPercent: isCompleted ? 100 : pct,
      isCompleted,
    };
  });

  const examRoadmap: AnnualExamPortionItem[] = effectiveCalendar.examWindows.map((ew) => {
    const examDaysCount = timeline.filter(
      (d) => d.dayType === 'exam' && isDateInRange(d.date, ew.startDate, ew.endDate)
    ).length;

    const covered = allChapters.filter(
      (ch) => ch.plannedStartDate && ch.plannedStartDate <= ew.startDate
    );
    const sampleProfile = curriculum.units[0]
      ? getDomainPedagogyProfile(curriculum, curriculum.units[0])
      : null;

    return {
      id: ew.id,
      name: ew.name,
      term: ew.term || 'Annual',
      startDate: ew.startDate,
      endDate: ew.endDate,
      examDaysCount,
      coveredUnitNumbers: covered.map((c) => c.unitNumber),
      coveredUnitTitles: covered.map((c) => `Unit ${c.unitNumber}: ${c.cleanTitle}`),
      oralPracticalCheckpoint:
        sampleProfile?.oralPracticalCheckpoint ||
        'Oral viva, notebook check & practical evaluation.',
      notes: ew.notes,
    };
  });

  const revisionRoadmap: AnnualRevisionBlockItem[] = effectiveCalendar.revisionWindows.map(
    (rw) => {
      const revisionDaysCount = timeline.filter(
        (d) => d.dayType === 'revision' && isDateInRange(d.date, rw.startDate, rw.endDate)
      ).length;
      const focus = allChapters
        .filter((ch) => ch.plannedStartDate && ch.plannedStartDate <= rw.startDate)
        .map((c) => `Unit ${c.unitNumber}: ${c.cleanTitle}`);

      return {
        id: rw.id,
        name: rw.name,
        term: rw.term || 'Annual',
        startDate: rw.startDate,
        endDate: rw.endDate,
        revisionDaysCount,
        focusUnits: focus.length > 0 ? focus : allChapters.map((c) => c.cleanTitle),
        strategySummary:
          rw.term === 'Term 1'
            ? 'Concept recap maps, doubt-clearing circles, and Term 1 model practice paper.'
            : 'Full-syllabus spaced revision, error-analysis drills, and board-pattern specimen practice.',
      };
    }
  );

  const totalOutcomes = allChapters.reduce((s, c) => s + c.learningOutcomes.length, 0);
  const achievedOutcomes = allChapters.reduce(
    (s, c) => s + c.learningOutcomes.filter((o) => o.status === 'achieved').length,
    0
  );

  const annualPlan: AnnualPlanOutput = {
    term1Chapters: allChapters.filter((c) => c.term === 'Term 1'),
    term2Chapters: allChapters.filter((c) => c.term === 'Term 2'),
    allChapters,
    examRoadmap,
    revisionRoadmap,
    totalAllocatedPeriods: allChapters.reduce((s, c) => s + c.allocatedPeriods, 0),
    totalOutcomes,
    achievedOutcomes,
  };

  // ------------------------------------------------------------------
  // 2. MONTHLY PLAN OUTPUT (with Embedded Weekly Pacing Breakdown)
  // ------------------------------------------------------------------
  const monthKeysOrdered: string[] = [];
  const monthDaysMap = new Map<string, CalendarDayNode[]>();
  for (const node of timeline) {
    if (!monthDaysMap.has(node.monthKey)) {
      monthKeysOrdered.push(node.monthKey);
      monthDaysMap.set(node.monthKey, []);
    }
    monthDaysMap.get(node.monthKey)!.push(node);
  }

  const dailyByMonth = new Map<string, DailyLessonPlanItem[]>();
  for (const dp of dailyPlans) {
    if (!dailyByMonth.has(dp.monthKey)) dailyByMonth.set(dp.monthKey, []);
    dailyByMonth.get(dp.monthKey)!.push(dp);
  }

  const monthlyPlans: MonthlyPlanItem[] = monthKeysOrdered.map((monthKey) => {
    const mDays = monthDaysMap.get(monthKey) || [];
    const mLessons = dailyByMonth.get(monthKey) || [];
    const first = mDays[0];
    const monthLabel = first
      ? `${MONTH_NAMES[first.monthIndex]} ${first.year}`
      : monthKey;
    const shortLabel = first
      ? `${MONTH_SHORT[first.monthIndex]} ${String(first.year).slice(-2)}`
      : monthKey;

    const holidayCallouts: { date: string; name: string }[] = [];
    const vacationSet = new Set<string>();
    const examSet = new Set<string>();
    const revisionSet = new Set<string>();

    let schoolWorkingDays = 0;
    for (const d of mDays) {
      if (d.isSchoolWorkingDay) schoolWorkingDays += 1;
      if (d.holidayName) holidayCallouts.push({ date: d.date, name: d.holidayName });
      if (d.vacationName) vacationSet.add(d.vacationName);
      if (d.examName) examSet.add(d.examName);
      if (d.revisionName) revisionSet.add(d.revisionName);
    }

    // Aggregate target chapters in this month
    const chapterCountMap = new Map<
      string,
      { unitId: string; unitNumber: number; title: string; periodsInMonth: number }
    >();
    const activityHighlightSet = new Set<string>();
    for (const lp of mLessons) {
      if (lp.dayType !== 'revision') {
        const prev = chapterCountMap.get(lp.unitId);
        if (prev) {
          prev.periodsInMonth += 1;
        } else {
          chapterCountMap.set(lp.unitId, {
            unitId: lp.unitId,
            unitNumber: lp.unitNumber,
            title: lp.unitTitle,
            periodsInMonth: 1,
          });
        }
      }
      activityHighlightSet.add(lp.activityAndPractical.title);
    }

    // Build Weekly Pacing Breakdown (grouped by Monday-Sunday spans inside the month)
    const weeksMap = new Map<number, CalendarDayNode[]>();
    const weekOrder: number[] = [];
    for (const d of mDays) {
      if (!weeksMap.has(d.weekNumberInYear)) {
        weekOrder.push(d.weekNumberInYear);
        weeksMap.set(d.weekNumberInYear, []);
      }
      weeksMap.get(d.weekNumberInYear)!.push(d);
    }

    const weeklyBreakdown: MonthlyWeeklyPacingItem[] = weekOrder.map((wkNum, idxInMonth) => {
      const wDays = weeksMap.get(wkNum) || [];
      const wStart = wDays[0]?.date || '';
      const wEnd = wDays[wDays.length - 1]?.date || '';
      const wLessons = mLessons.filter((l) => l.date >= wStart && l.date <= wEnd);
      const wTargets = Array.from(new Set(wLessons.map((l) => `Unit ${l.unitNumber}: ${l.unitTitle}`)));
      const wExamDays = wDays.filter((d) => d.dayType === 'exam').length;
      const wRevDays = wDays.filter((d) => d.dayType === 'revision').length;
      const wWorkDays = wDays.filter((d) => d.isSchoolWorkingDay).length;
      const wCompleted = wLessons.filter((l) => l.isCompleted).length;

      let keyMilestone = 'Regular curriculum teaching & formative notebook checks';
      if (wExamDays > 0) {
        keyMilestone = `Examination Window (${wDays.find((d) => d.examName)?.examName || 'Assessment'})`;
      } else if (wRevDays > 0) {
        keyMilestone = `Revision Sprint (${wDays.find((d) => d.revisionName)?.revisionName || 'Consolidation'})`;
      } else if (wLessons.length === 0) {
        keyMilestone = wDays.some((d) => d.vacationName)
          ? `Scheduled Vacation (${wDays.find((d) => d.vacationName)?.vacationName})`
          : 'Non-teaching / Holiday Week';
      } else if (wLessons.some((l) => l.periodIndexInUnit === l.totalPeriodsInUnit)) {
        keyMilestone = 'Unit completion milestone + formative recap & homework review';
      }

      return {
        weekNumberInYear: wkNum,
        weekLabel: `Week ${idxInMonth + 1} (Wk ${wkNum})`,
        startDate: wStart,
        endDate: wEnd,
        schoolWorkingDays: wWorkDays,
        subjectTeachingPeriods: wLessons.filter((l) => l.dayType !== 'revision').length,
        revisionDays: wRevDays,
        examDays: wExamDays,
        targetChapters: wTargets,
        keyMilestone,
        completedLessons: wCompleted,
        totalLessons: wLessons.length,
      };
    });

    const completedLessons = mLessons.filter((l) => l.isCompleted).length;
    const totalLessons = mLessons.length;

    return {
      monthKey,
      monthLabel,
      shortLabel,
      schoolWorkingDays,
      subjectTeachingPeriods: mLessons.filter((l) => l.dayType !== 'revision').length,
      holidayCallouts,
      vacationCallouts: Array.from(vacationSet),
      examCallouts: Array.from(examSet),
      revisionCallouts: Array.from(revisionSet),
      targetChapters: Array.from(chapterCountMap.values()).sort(
        (a, b) => a.unitNumber - b.unitNumber
      ),
      monthlyActivitiesHighlight: Array.from(activityHighlightSet).slice(0, 4),
      weeklyBreakdown,
      completedLessons,
      totalLessons,
      completionPercent:
        totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
    };
  });

  // ------------------------------------------------------------------
  // 3. TEACHER PROGRESS OVERVIEW METRICS
  // ------------------------------------------------------------------
  const totalScheduledLessons = dailyPlans.length;
  const completedLessons = dailyPlans.filter((d) => d.isCompleted).length;
  const pendingLessons = Math.max(0, totalScheduledLessons - completedLessons);
  const syllabusCompletionPercent =
    totalScheduledLessons > 0
      ? Math.round((completedLessons / totalScheduledLessons) * 100)
      : 0;
  const completedChaptersCount = allChapters.filter((c) => c.isCompleted).length;
  const nextScheduledLesson = dailyPlans.find((d) => !d.isCompleted) || null;

  const progressOverview: TeacherProgressOverviewMetrics = {
    totalScheduledLessons,
    completedLessons,
    pendingLessons,
    syllabusCompletionPercent,
    completedChaptersCount,
    totalChaptersCount: allChapters.length,
    nextScheduledLesson,
    achievedOutcomesCount: achievedOutcomes,
    totalOutcomesCount: totalOutcomes,
  };

  return {
    curriculum,
    effectiveCalendar,
    schoolName,
    medium,
    division,
    periodsPerWeek,
    teachingDays,
    isArchivedReadOnly: Boolean(input.isArchivedReadOnly),
    calendarSummary,
    progressOverview,
    annualPlan,
    monthlyPlans,
    dailyPlans,
  };
}
