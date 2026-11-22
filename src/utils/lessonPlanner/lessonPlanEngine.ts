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
 * Localizes pedagogical sub-topic wrapper labels for the selected instruction medium
 * while preserving 100% of the original curriculum chapter/unit title and segment names.
 */
function localizeSubTopicForMedium(
  rawSubTopic: string,
  cleanTitle: string,
  curriculum: ResolvedCurriculumSubject,
  medium: InstructionMedium
): string {
  if (medium === 'English') return rawSubTopic;

  const subjectDisplay =
    medium === 'Marathi'
      ? curriculum.marathiName || curriculum.subject
      : medium === 'Hindi'
      ? curriculum.hindiName || curriculum.subject
      : `${curriculum.subject} (${curriculum.marathiName || curriculum.subject})`;

  const rules: {
    prefix: string;
    marathi: string;
    hindi: string;
    semi: string;
  }[] = [
    {
      prefix: 'Concept Introduction & Prior Knowledge: ',
      marathi: 'संकल्पना परिचय व पूर्वज्ञान: ',
      hindi: 'अवधारणा परिचय एवं पूर्वज्ञान: ',
      semi: 'Concept Intro / संकल्पना परिचय: ',
    },
    {
      prefix: 'Core Rules, Examples & Demonstration: ',
      marathi: 'मूळ नियम, उदाहरणे व प्रात्यक्षिक: ',
      hindi: 'मूल नियम, उदाहरण एवं प्रदर्शन: ',
      semi: 'Core Rules & Examples / मूळ नियम व उदाहरणे: ',
    },
    {
      prefix: 'Hands-On Classroom Practice & Application: ',
      marathi: 'प्रत्यक्ष वर्ग सराव व उपयोजन: ',
      hindi: 'प्रत्यक्ष कक्षा अभ्यास एवं अनुप्रयोग: ',
      semi: 'Classroom Practice / प्रत्यक्ष वर्ग सराव: ',
    },
    {
      prefix: 'Consolidation, Recap & Assessment Check: ',
      marathi: 'उजळणी, दृढीकरण व मूल्यमापन चाचणी: ',
      hindi: 'पुनरावृत्ति, सुदृढ़ीकरण एवं मूल्यांकन जाँच: ',
      semi: 'Recap & Check / उजळणी व मूल्यमापन: ',
    },
    {
      prefix: 'Foundation & Core Concepts: ',
      marathi: 'पायाभूत व मुख्य संकल्पना: ',
      hindi: 'आधारभूत एवं मुख्य अवधारणाएँ: ',
      semi: 'Foundation Concepts / पायाभूत संकल्पना: ',
    },
    {
      prefix: 'Deep Dive & Worked Examples: ',
      marathi: 'सखोल अभ्यास व सोडवलेली उदाहरणे: ',
      hindi: 'गहन अध्ययन एवं हल किए गए उदाहरण: ',
      semi: 'Worked Examples / सोडवलेली उदाहरणे: ',
    },
  ];

  for (const r of rules) {
    if (rawSubTopic.startsWith(r.prefix)) {
      const rest = rawSubTopic.slice(r.prefix.length);
      if (medium === 'Marathi') return `${r.marathi}${rest}`;
      if (medium === 'Hindi') return `${r.hindi}${rest}`;
      return `${r.semi}${rest}`;
    }
  }

  if (rawSubTopic.startsWith('Guided Application & Classroom Practice (')) {
    if (medium === 'Marathi') return `मार्गदर्शित उपयोजन व वर्ग सराव (${cleanTitle})`;
    if (medium === 'Hindi') return `निर्देशित अनुप्रयोग एवं कक्षा अभ्यास (${cleanTitle})`;
    return `Guided Practice / मार्गदर्शित वर्ग सराव (${cleanTitle})`;
  }

  if (rawSubTopic.startsWith('Formative Recap & Doubt Clearing (')) {
    if (medium === 'Marathi') return `रचनात्मक उजळणी व शंका निरसन (${subjectDisplay})`;
    if (medium === 'Hindi') return `रचनात्मक पुनरावृत्ति एवं शंका समाधान (${subjectDisplay})`;
    return `Formative Recap / रचनात्मक उजळणी व शंका निरसन (${subjectDisplay})`;
  }

  if (medium === 'Marathi') return `मुख्य संकल्पना व अध्यापन: ${rawSubTopic}`;
  if (medium === 'Hindi') return `मुख्य अवधारणा एवं शिक्षण: ${rawSubTopic}`;
  return `Core Concept / मुख्य संकल्पना: ${rawSubTopic}`;
}

/**
 * Original MyStudyZone Pedagogical Content Composer (Zero copied textbook prose).
 * Generates subject-domain, grade-stage, and medium-tailored methods, activities, aids, homework & outcomes.
 */
function getDomainPedagogyProfile(
  curriculum: ResolvedCurriculumSubject,
  unit: ResolvedPlanningUnit,
  medium: InstructionMedium = 'English'
) {
  const { subject, category, stageBand, classNumber } = curriculum;
  const topic = unit.cleanTitle;
  const prevClass = Math.max(1, classNumber - 1);

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

  if (medium === 'Marathi') {
    if (isMath) {
      return {
        aids: [
          'रंगीत खडू व फळ्यावरील पायरीनिहाय गणितीय मांडणी',
          stageBand === 'early'
            ? 'मणी, संख्या-पट्ट्या व कागदी भौमितिक आकार'
            : 'कंपास पेटी, आलेख कागद व सूत्र तक्ता (Formula Chart)',
          'जोडीने तपासणीसाठी सोडवलेल्या उदाहरणांची कार्डे',
        ],
        activityTitle: `प्रत्यक्ष गणितीय कृती व मॉडेलिंग: ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `वहीत उदाहरणे सोडवण्यापूर्वी वर्गातील वस्तू, संख्या-कार्डे व गट पद्धतीचा वापर करून "${topic}" प्रत्यक्ष जोडीत करून दाखवा.`
            : `विद्यार्थ्यांचे लहान गट करून "${topic}" वरील दैनंदिन जीवनाशी संबंधित २ शाब्दिक उदाहरणे सोडवा, पडताळणी करा व एक पद्धत फळ्यावर सादर करा.`,
        materials:
          stageBand === 'early'
            ? ['संख्या फ्लॅशकार्ड्स', 'मोजण्याचे मणी / खडे', 'चौकटीची वही']
            : ['आलेख कागद / भूमिती पेटी', 'खडू व लघु-फलक', 'पायरी-तपासणी तक्ता'],
        prerequisites: `इयत्ता ${prevClass} मधील मूलभूत संख्याज्ञान, स्थानिक किंमत आणि "${topic}" शी संबंधित तोंडी आकडेमोड कौशल्य.`,
        misconceptions: `"${topic}" वरील उदाहरणे सोडवताना चिन्हांच्या चुका, मधल्या पायऱ्या गाळणे किंवा एकके (Units) चुकीची लिहिणे.`,
        remedial: `लहान संख्यांचा वापर करून पायरीनिहाय सोडवलेली नमुना उदाहरणे व मित्र-जोडी (Peer-buddy) पडताळणी द्यावी.`,
        enrichment: `बहु-पायरी तार्किक आव्हानात्मक प्रश्न द्यावेत आणि विद्यार्थ्यांना "${topic}" वर स्वतःचे व्यावहारिक उदाहरण तयार करण्यास सांगावे.`,
        hwMinutes,
        oralPracticalCheckpoint: 'तोंडी गणित चाचणी, भूमिती/आलेख वही तपासणी व सूत्र उजळणी.',
      };
    }

    if (isScience) {
      return {
        aids: [
          'फळ्यावरील नामनिर्देशित आकृती व संकल्पना ओघतक्ता',
          'अल्प-खर्चातील वर्ग प्रयोग साहित्य / दैनंदिन नमुने',
          'कार्य-कारण भाव दर्शवणारा तुलनात्मक तक्ता',
        ],
        activityTitle: `निरीक्षण व प्रयोगशाळा जिज्ञासा कृती: ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `"${topic}" शी संबंधित वर्ग किंवा शाळा परिसरात मार्गदर्शित निरीक्षण फेरी घ्या; विद्यार्थ्यांनी एक आकृती काढून एका वाक्यात निरीक्षण सांगावे.`
            : `"${topic}" वर 'अंदाज करा → निरीक्षण करा → स्पष्ट करा' (Predict-Observe-Explain) प्रात्यक्षिक घ्या; विद्यार्थ्यांनी प्रयोगवहीत निरीक्षणे, नामनिर्देशित आकृती व निष्कर्ष नोंदवावेत.`,
        materials: ['निरीक्षण वही / प्रयोगवही', 'वर्ग प्रात्यक्षिक साहित्य', 'आकृती तक्ता / स्टेन्सिल'],
        prerequisites: `दैनंदिन परिसरातील निरीक्षणे आणि "${topic}" शी जोडलेल्या मागील इयत्तेतील मूलभूत वैज्ञानिक संकल्पना.`,
        misconceptions: `दैनंदिन भाषेतील अर्थ व शास्त्रीय संज्ञा यात गोंधळ करणे किंवा "${topic}" मध्ये बाण व नावांशिवाय अपूर्ण आकृती काढणे.`,
        remedial: `प्रत्यक्ष दृश्य उदाहरणे, द्विभाषिक मुख्य शब्द-कार्डे आणि रिकाम्या जागा भरा प्रकारातील आकृती सराव द्यावा.`,
        enrichment: `"${topic}" चा स्थानिक पर्यावरण, जल/ऊर्जा संवर्धन किंवा भारतीय वैज्ञानिक प्रगतीशी संबंध जोडणारा लहान प्रकल्प द्यावा.`,
        hwMinutes,
        oralPracticalCheckpoint: 'प्रयोगवही तपासणी, सुबक नामनिर्देशित आकृती चाचणी व तोंडी प्रश्नोत्तरे.',
      };
    }

    if (isLanguage) {
      return {
        aids: [
          'कथा/व्याकरण तक्ता व शब्द-भिंत (Word-Wall) पट्ट्या',
          'आदर्श प्रकट वाचन व वाक्य-रचना नमुना पट्ट्या',
          'मार्गदर्शित अभिव्यक्तीसाठी चित्र-कार्डे',
        ],
        activityTitle: `संवादात्मक वाचन, संभाषण व भाषा कृती: ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `"${topic}" वर सामूहिक प्रकट वाचन, ध्वनी-उच्चार कार्डे आणि चित्र-वाक्य जोड्या लावण्याचा सराव घ्यावा जेणेकरून प्रत्येक विद्यार्थी बोलेल.`
            : `"${topic}" चा वापर करून जोडीने आकलन वाचन, संदर्भासहित शब्दसंग्रह मांडणी आणि ३ मिनिटांचा संभाषण/लेखन सराव घ्यावा.`,
        materials: ['शब्दसंग्रह फ्लॅशकार्ड्स', 'चित्र / संवाद कार्डे', 'व्याकरण व भाषा वही'],
        prerequisites: `मागील घटकांमधील श्रवण आकलन, मूलभूत शब्दसंग्रह आणि विरामचिन्हांच्या योग्य सवयी.`,
        misconceptions: `"${topic}" मध्ये शब्दशः भाषांतराच्या चुका, काळ/लिंग/वचन विसंगती किंवा शुद्धलेखनातील त्रुटी.`,
        remedial: `वाक्य-सुरुवात नमुने (Sentence Starters), लहान गटात सावकाश अनुवाचन आणि रंगीत व्याकरण तक्ते वापरावेत.`,
        enrichment: `"${topic}" मधील नवीन शब्द व वाक्प्रचार वापरून लहान संवाद, दैनंदिनी किंवा सर्जनशील परिच्छेद लिहिण्यास प्रेरित करावे.`,
        hwMinutes,
        oralPracticalCheckpoint: 'प्रकट वाचन ओघ, श्रुतलेखन (Dictation), कविता/पाठांतर व तोंडी आकलन चाचणी.',
      };
    }

    if (isSocial) {
      return {
        aids: [
          'भारत / महाराष्ट्र / जग भित्ती-नकाशा व कालरेषा पट्टी',
          'ऐतिहासिक/भौगोलिक संदर्भ कार्डे व नागरिकशास्त्र ओघतक्ता',
          'इतिहास/भूगोल यांचा दैनंदिन नागरी जीवनाशी संबंध दर्शवणारा तक्ता',
        ],
        activityTitle: `नकाशा, कालरेषा व नागरी जिज्ञासा कार्यशाळा: ${topic}`,
        activityInstructions: `विद्यार्थ्यांना आराखडा नकाशा किंवा कालरेषेवर "${topic}" मधील महत्त्वाची ठिकाणे/घटना शोधण्यास सांगावे व जबाबदार नागरिकत्वाशी जोडणारी ५ मिनिटांची गटचर्चा घ्यावी.`,
        materials: ['आराखडा नकाशा / कालरेषा पत्रक', 'रंगीत पेन्सिल', 'गटचर्चा प्रश्न-कार्ड'],
        prerequisites: `नकाशातील मुख्य दिशा, कालानुक्रम समज आणि मागील इयत्तेतील समाज व परिसर विषयक मूलभूत कल्पना.`,
        misconceptions: `"${topic}" मधील कार्य-कारण भाव किंवा भौगोलिक संदर्भ न समजता केवळ तारखा व नावे पाठ करणे.`,
        remedial: `चित्रमय कालानुक्रम ओघतक्ते (Flowcharts) आणि महत्त्वाच्या संज्ञांचा सोपा सारांश तक्ता द्यावा.`,
        enrichment: `"${topic}" चा स्थानिक वारसा, भौगोलिक वैशिष्ट्ये किंवा सध्याच्या नागरी संस्थांशी संबंध जोडणारे टिपण तयार करण्यास सांगावे.`,
        hwMinutes,
        oralPracticalCheckpoint: 'नकाशा भरणे / कालरेषा पडताळणी, प्रकल्प तक्ता व तोंडी कारणमीमांसा चाचणी.',
      };
    }

    return {
      aids: [
        'फळ्यावरील पायरीनिहाय कृती-क्रम तक्ता',
        'प्रत्यक्ष प्रात्यक्षिक प्रतिकृती / डिजिटल किंवा कृती साहित्य संच',
        'स्वयं व गट मूल्यमापनासाठी तपासणी सूची (Checklist)',
      ],
      activityTitle: `उपयोजित कौशल्य व निर्मिती कार्यशाळा: ${topic}`,
      activityInstructions: `"${topic}" चे एक पूर्ण प्रात्यक्षिक दाखवा आणि त्यानंतर विद्यार्थ्यांना तपासणी सूचीनुसार वैयक्तिक किंवा जोडीने लहान कृती पूर्ण करण्यास सांगा.`,
      materials: ['सराव पत्रक / कृती संच', 'तपासणी रुब्रिक', 'विद्यार्थी कौशल्य पोर्टफोलिओ'],
      prerequisites: `वर्ग शिस्त, साहित्याची सुरक्षित हाताळणी आणि "${topic}" साठी आवश्यक मूलभूत कौशल्य सवयी.`,
      misconceptions: `कृतीचे नियोजन न करता घाईघाईने अंतिम उत्तराकडे जाणे किंवा "${topic}" मधील अचूकता व सुरक्षितता नियमांकडे दुर्लक्ष करणे.`,
      remedial: `संपूर्ण कृती ३ लहान टप्प्यांत विभागून प्रत्येक टप्प्यानंतर शिक्षकांनी त्वरित मार्गदर्शन करावे.`,
      enrichment: `विद्यार्थ्यांना या कृतीमध्ये स्वतःची कल्पकता जोडून नवीन नमुना तयार करण्यास किंवा वर्गमित्रास मदत करण्यास प्रोत्साहित करावे.`,
      hwMinutes,
      oralPracticalCheckpoint: 'प्रत्यक्ष कौशल्य प्रात्यक्षिक, पोर्टफोलिओ तपासणी व तोंडी मूल्यमापन.',
    };
  }

  if (medium === 'Hindi') {
    if (isMath) {
      return {
        aids: [
          'रंगीन चॉक एवं श्यामपट्ट पर चरणबद्ध गणितीय संरचना',
          stageBand === 'early'
            ? 'गिनती के मनके, संख्या-पट्टियाँ एवं कागज़ की ज्यामितीय आकृतियाँ'
            : 'ज्यामिति बॉक्स, ग्राफ़ शीट एवं सूत्र चार्ट (Formula Chart)',
          'जोड़ी में जाँच हेतु हल किए गए उदाहरण कार्ड',
        ],
        activityTitle: `प्रत्यक्ष गणितीय मॉडलिंग गतिविधि: ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `कॉपी में प्रश्न हल करने से पहले कक्षा की वस्तुओं, संख्या-कार्डों और समूहों की सहायता से जोड़ी में "${topic}" को प्रत्यक्ष रूप से प्रदर्शित करें।`
            : `विद्यार्थियों को छोटे समूहों में बाँटकर "${topic}" पर आधारित २ दैनिक जीवन के शाब्दिक प्रश्न हल कराएँ, उत्तर की जाँच करें और एक विधि बोर्ड पर प्रस्तुत कराएँ।`,
        materials:
          stageBand === 'early'
            ? ['संख्या फ़्लैशकार्ड', 'गिनती के मनके / कंकड़', 'चौकोर खानों की कॉपी']
            : ['ग्राफ़ शीट / ज्यामिति बॉक्स', 'चॉक एवं मिनी-बोर्ड', 'चरण-जाँच तालिका'],
        prerequisites: `कक्षा ${prevClass} की आधारभूत संख्या-समझ, स्थानीय मान की सटीकता और "${topic}" से जुड़ी मौखिक गणना क्षमता।`,
        misconceptions: `"${topic}" के अनुप्रयुक्त प्रश्न हल करते समय चिह्न/स्थानीय मान की त्रुटि, बीच के चरण छोड़ना या इकाइयाँ (Units) गलत लिखना।`,
        remedial: `छोटी संख्याओं के साथ चरणबद्ध हल किए गए टेम्पलेट और स्वतंत्र अभ्यास से पहले सहपाठी-जाँच (Peer check) प्रदान करें।`,
        enrichment: `बहु-चरणीय तार्किक चुनौतियाँ दें और विद्यार्थियों को "${topic}" पर आधारित अपना स्वयं का व्यावहारिक प्रश्न बनाने के लिए प्रेरित करें।`,
        hwMinutes,
        oralPracticalCheckpoint: 'मौखिक गणित प्रश्नोत्तरी, ज्यामिति/ग्राफ़ कॉपी जाँच एवं सूत्र स्मरण अभ्यास।',
      };
    }

    if (isScience) {
      return {
        aids: [
          'श्यामपट्ट पर नामांकित चित्र एवं अवधारणा प्रवाह-मानचित्र',
          'कम लागत वाली कक्षा अवलोकन किट / दैनिक जीवन के नमूने',
          'बोर्ड पर कारण-प्रभाव तुलनात्मक तालिका',
        ],
        activityTitle: `अवलोकन एवं प्रयोगशाला जिज्ञासा गतिविधि: ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `"${topic}" से संबंधित कक्षा या विद्यालय परिसर में निर्देशित अवलोकन करवाएँ; विद्यार्थी एक देखा गया विवरण चित्रित करें और एक वाक्य बोलकर साझा करें।`
            : `"${topic}" पर 'अनुमान लगाएँ → अवलोकन करें → व्याख्या करें' (Predict-Observe-Explain) प्रदर्शन करें; विद्यार्थी प्रायोगिक कॉपी में प्रेक्षण, नामांकित चित्र और निष्कर्ष लिखें।`,
        materials: ['अवलोकन / प्रायोगिक कॉपी', 'कक्षा प्रदर्शन सामग्री', 'चित्र चार्ट / स्टेंसिल'],
        prerequisites: `दैनिक संवेदी अवलोकन और पिछली कक्षाओं की आधारभूत वैज्ञानिक अवधारणाएँ जो सीधे "${topic}" से जुड़ती हैं।`,
        misconceptions: `"${topic}" में बोलचाल के शब्दों को वैज्ञानिक शब्दावली समझ लेना या बिना दिशा-तीर और नामांकन के अधूरे चित्र बनाना।`,
        remedial: `मूर्त दृश्य उदाहरण, द्विभाषी मुख्य-शब्द फ़्लैशकार्ड और रिक्त-स्थान पूर्ति वाले चित्र अभ्यास पत्रक का उपयोग करें।`,
        enrichment: `"${topic}" को स्थानीय पर्यावरण, जल/ऊर्जा संरक्षण या भारतीय वैज्ञानिक अनुप्रयोगों से जोड़ने वाला एक लघु अन्वेषण नोट तैयार कराएँ।`,
        hwMinutes,
        oralPracticalCheckpoint: 'प्रायोगिक कॉपी सत्यापन, स्वच्छ नामांकित चित्र परीक्षण एवं मौखिक प्रश्नोत्तरी।',
      };
    }

    if (isLanguage) {
      return {
        aids: [
          'कहानी/व्याकरण चार्ट एवं शब्द-दीवार (Word-Wall) पट्टियाँ',
          'आदर्श सस्वर वाचन एवं वाक्य-संरचना पट्टियाँ',
          'निर्देशित अभिव्यक्ति हेतु चित्र-प्रॉम्प्ट कार्ड',
        ],
        activityTitle: `संवादात्मक पठन, वाचन एवं भाषा स्टूडियो: ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `"${topic}" पर सामूहिक सस्वर पठन, ध्वनि-मिश्रण फ़्लैशकार्ड और चित्र-वाक्य मिलान कराएँ ताकि प्रत्येक बच्चा स्पष्ट रूप से बोल सके।`
            : `"${topic}" का प्रयोग करते हुए जोड़ी में पठन-बोध, संदर्भगत शब्दावली मानचित्रण और ३ मिनट का संरचित वाचन/लेखन अभ्यास कराएँ।`,
        materials: ['शब्दावली फ़्लैशकार्ड', 'चित्र / संवाद कार्ड', 'व्याकरण कॉपी'],
        prerequisites: `पिछली इकाइयों से श्रवण बोध, मूल शब्दावली और वाक्य विराम-चिह्नों की आदतें।`,
        misconceptions: `"${topic}" में शब्दशः अनुवाद की त्रुटियाँ, काल/लिंग/वचन की असंगति या वर्तनी की अशुद्धियाँ।`,
        remedial: `वाक्य-प्रारंभक (Sentence Starters), छोटे समूह में धीमा अनुकरण-वाचन और रंगीन व्याकरण चार्ट प्रदान करें।`,
        enrichment: `विद्यार्थियों को "${topic}" की लक्षित अभिव्यक्तियों का उपयोग करते हुए एक मौलिक संवाद, डायरी प्रविष्टि या रचनात्मक अनुच्छेद लिखने को कहें।`,
        hwMinutes,
        oralPracticalCheckpoint: 'सस्वर पठन प्रवाह, श्रुतलेख जाँच, सस्वर पाठ एवं मौखिक बोध प्रश्नोत्तरी।',
      };
    }

    if (isSocial) {
      return {
        aids: [
          'भारत / राज्य / विश्व दीवार मानचित्र एवं कालरेखा पट्टी',
          'प्राथमिक-स्रोत दृश्य कार्ड एवं नागरिक शास्त्र प्रवाह-चार्ट',
          'इतिहास/भूगोल को दैनिक नागरिक जीवन से जोड़ने वाली तुलना तालिका',
        ],
        activityTitle: `मानचित्र, कालरेखा एवं नागरिक जिज्ञासा कार्यशाला: ${topic}`,
        activityInstructions: `विद्यार्थियों को रूपरेखा मानचित्र या कालरेखा पट्टी पर "${topic}" के प्रमुख क्षेत्रों/तिथियों को चिह्नित करने के लिए निर्देशित करें, और जिम्मेदार नागरिकता से जोड़ते हुए ५ मिनट की समूह चर्चा कराएँ।`,
        materials: ['रूपरेखा मानचित्र / कालरेखा पत्रक', 'रंगीन पेंसिलें', 'समूह चर्चा प्रश्न-कार्ड'],
        prerequisites: `मानचित्र की दिशाओं की समझ, कालानुक्रमिक जागरूकता और पिछली कक्षाओं में पढ़ी गई सामुदायिक/नागरिक अवधारणाएँ।`,
        misconceptions: `"${topic}" में कारण-प्रभाव संबंधों या भौगोलिक संदर्भ को समझे बिना केवल तिथियाँ या शब्दावली रटना।`,
        remedial: `दृश्य कालानुक्रमिक प्रवाह-चार्ट और सरल मुख्य-शब्द सारांश तालिकाएँ उपलब्ध कराएँ।`,
        enrichment: `"${topic}" को स्थानीय विरासत, क्षेत्रीय भूगोल या वर्तमान नागरिक संस्थाओं से जोड़ते हुए एक संक्षिप्त केस-स्टडी टिप्पणी लिखने को दें।`,
        hwMinutes,
        oralPracticalCheckpoint: 'मानचित्र अंकन / कालरेखा सत्यापन, प्रोजेक्ट चार्ट एवं मौखिक तर्क प्रश्नोत्तरी।',
      };
    }

    return {
      aids: [
        'श्यामपट्ट पर दृश्य चरण-क्रम चार्ट',
        'प्रत्यक्ष प्रदर्शन मॉडल / डिजिटल या भौतिक टूलकिट',
        'सहपाठी एवं स्व-मूल्यांकन हेतु जाँच-सूची (Checklist)',
      ],
      activityTitle: `अनुप्रयुक्त कौशल एवं सृजन कार्यशाला: ${topic}`,
      activityInstructions: `"${topic}" का एक पूर्ण कार्यशील मॉडल प्रदर्शित करें, फिर विद्यार्थियों से कक्षा जाँच-सूची का उपयोग करते हुए व्यक्तिगत या जोड़ी में एक व्यावहारिक लघु-कार्य पूर्ण कराएँ।`,
      materials: ['अभ्यास पत्रक / गतिविधि किट', 'जाँच-सूची रुब्रिक', 'विद्यार्थी कौशल पोर्टफोलियो'],
      prerequisites: `बुनियादी कक्षा तत्परता, उपकरणों का सुरक्षित उपयोग और "${topic}" में सहायक आधारभूत कौशल आदतें।`,
      misconceptions: `चरणों की योजना बनाए बिना सीधे अंतिम परिणाम की ओर बढ़ना या "${topic}" में सटीकता/सुरक्षा नियमों की अनदेखी करना।`,
      remedial: `कार्य को ३ सूक्ष्म-चरणों में विभाजित करें और प्रत्येक चरण के बाद शिक्षक द्वारा तुरंत मार्गदर्शन दिया जाए।`,
      enrichment: `विद्यार्थियों को मौलिक विविधता के साथ गतिविधि का विस्तार करने या किसी सहपाठी की सहायता करने की चुनौती दें।`,
      hwMinutes,
      oralPracticalCheckpoint: 'प्रायोगिक कौशल प्रदर्शन, पोर्टफोलियो समीक्षा एवं संरचित मौखिक जाँच।',
    };
  }

  if (medium === 'Semi-English') {
    if (isMath) {
      return {
        aids: [
          'Blackboard step-by-step colour coding (फळ्यावरील पायरीनिहाय मांडणी व English-Marathi math terms)',
          stageBand === 'early'
            ? 'Counting beads, number strips & shapes (मणी, संख्या-पट्ट्या व आकार)'
            : 'Geometry kit, graph grid & formula chart (भूमिती पेटी, आलेख व सूत्र तक्ता)',
          'Worked-example cards for pair verification (जोडीने तपासणीसाठी सोडवलेली उदाहरणे)',
        ],
        activityTitle: `Hands-On Math Modelling (प्रत्यक्ष गणितीय कृती): ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `Demonstrate ${topic} in pairs using classroom objects & number cards, explaining key terms in English and Marathi (इंग्रजी संज्ञा व मराठी स्पष्टीकरणासह जोडीत सराव).`
            : `Solve 2 real-life word problems on ${topic} in small groups using English mathematical terms with Marathi conceptual explanation, and verify steps on the board.`,
        materials:
          stageBand === 'early'
            ? ['Number flashcards (संख्या कार्डे)', 'Counters (मोजण्याचे मणी)', 'Squared notebook (चौकटीची वही)']
            : ['Graph / Geometry box (आलेख / भूमिती पेटी)', 'Chalk & mini-board', 'Step-check rubric (पायरी तपासणी तक्ता)'],
        prerequisites: `Class ${prevClass} numeracy, place-value & bilingual math terminology linked to ${topic} (मागील इयत्तेतील संख्याज्ञान व द्विभाषिक गणितीय संज्ञा).`,
        misconceptions: `Sign/unit slips or skipping intermediate steps while solving problems on ${topic} (चिन्हे, एकके किंवा मधल्या पायऱ्या गाळण्याच्या चुका).`,
        remedial: `Scaffolded step-by-step solved templates with bilingual hints & peer-buddy check (द्विभाषिक टिपांसह पायरीनिहाय नमुना उदाहरणे).`,
        enrichment: `Multi-step HOTS reasoning challenge & framing a bilingual word problem on ${topic} (बहु-पायरी तार्किक प्रश्न व नवीन उदाहरण तयार करणे).`,
        hwMinutes,
        oralPracticalCheckpoint: 'Bilingual mental math viva, formula recall & geometry/graph notebook check (द्विभाषिक तोंडी चाचणी व वही तपासणी).',
      };
    }

    if (isScience) {
      return {
        aids: [
          'Labelled diagram with English scientific terms & Marathi explanation (इंग्रजी वैज्ञानिक संज्ञांसह नामनिर्देशित आकृती)',
          'Low-cost classroom observation kit / specimens (वर्ग प्रयोग साहित्य व नमुने)',
          'Bilingual cause-and-effect comparison chart (द्विभाषिक कार्य-कारण तुलना तक्ता)',
        ],
        activityTitle: `Observation & Inquiry Lab (निरीक्षण व प्रयोग कृती): ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `Guided observation walk on ${topic}; learners draw one detail and name it using English key terms with Marathi meaning (आकृती काढून इंग्रजी-मराठी संज्ञा सांगणे).`
            : `Run a Predict → Observe → Explain demo on ${topic}; record English technical terms, labelled diagrams, and bilingual inference notes in practical journals.`,
        materials: ['Observation / Practical journal (प्रयोगवही)', 'Demo specimens (प्रयोग साहित्य)', 'Diagram chart (आकृती तक्ता)'],
        prerequisites: `Everyday observations & foundational concepts connected to ${topic} (दैनंदिन निरीक्षणे व पूर्वज्ञान).`,
        misconceptions: `Confusing colloquial Marathi words with precise English scientific terms or unlabelled diagrams in ${topic} (वैज्ञानिक संज्ञा व आकृतीच्या नावांतील गोंधळ).`,
        remedial: `Bilingual English–Marathi glossary flashcards, visual analogies & guided diagram sheets (द्विभाषिक शब्द-कार्डे व आकृती सराव).`,
        enrichment: `Mini-investigation connecting ${topic} to local environment & Indian science applications (स्थानिक पर्यावरण व विज्ञानाशी जोडणारा लहान प्रकल्प).`,
        hwMinutes,
        oralPracticalCheckpoint: 'Practical journal check, English-labelled diagram test & bilingual viva (प्रयोगवही, आकृती व द्विभाषिक तोंडी चाचणी).',
      };
    }

    if (isLanguage) {
      return {
        aids: [
          'Story/grammar anchor chart & bilingual word-wall strips (व्याकरण तक्ता व द्विभाषिक शब्द-पट्ट्या)',
          'Model pronunciation & sentence-frame strips (उच्चार व वाक्य-रचना पट्ट्या)',
          'Picture prompt cards for guided expression (चित्र-कार्डे)',
        ],
        activityTitle: `Interactive Language & Speaking Studio (वाचन व संभाषण कृती): ${topic}`,
        activityInstructions:
          stageBand === 'early'
            ? `Choral loud-reading, phonics flashcards, and picture-to-sentence matching on ${topic} with supportive Marathi meaning cues.`
            : `Pair-reading comprehension, contextual vocabulary mapping, and a 3-minute speaking/writing drill applying ${topic} with bilingual scaffolding.`,
        materials: ['Vocabulary flashcards (शब्द कार्डे)', 'Picture prompts (चित्र कार्डे)', 'Language notebook (भाषा वही)'],
        prerequisites: `Listening comprehension, core vocabulary & sentence punctuation from earlier units (श्रवण आकलन व मूलभूत शब्दसंग्रह).`,
        misconceptions: `Word-for-word translation slips, tense mismatch, or spelling errors in ${topic} (शब्दशः भाषांतर व व्याकरणातील चुका).`,
        remedial: `Sentence starters, echo-reading in small circles & colour-coded grammar cues (वाक्य-सुरुवात नमुने व सामूहिक वाचन सराव).`,
        enrichment: `Compose a short dialogue, diary entry, or creative paragraph integrating target expressions from ${topic} (संवाद किंवा लघु-परिच्छेद लेखन).`,
        hwMinutes,
        oralPracticalCheckpoint: 'Loud reading fluency, dictation, recitation & oral comprehension check (प्रकट वाचन, श्रुतलेखन व तोंडी आकलन).',
      };
    }

    if (isSocial) {
      return {
        aids: [
          'India / Maharashtra / World wall map & timeline strip (भित्ती-नकाशा व कालरेषा पट्टी)',
          'Primary-source visual cards & bilingual civic flowchart (द्विभाषिक नागरिकशास्त्र ओघतक्ता)',
          'Comparison chart linking concepts to daily civic life (दैनंदिन जीवनाशी जोडणारा तक्ता)',
        ],
        activityTitle: `Map, Timeline & Civic Workshop (नकाशा व कालरेषा कार्यशाळा): ${topic}`,
        activityInstructions: `Locate key regions/dates for ${topic} on an outline map or timeline strip, followed by a 5-minute bilingual group discussion on responsible citizenship (नकाशा/कालरेषा नोंद व द्विभाषिक गटचर्चा).`,
        materials: ['Outline map / timeline (आराखडा नकाशा / कालरेषा)', 'Coloured pencils', 'Discussion card (चर्चा कार्ड)'],
        prerequisites: `Basic map directions, chronological awareness & civic concepts from earlier grades (नकाशा दिशा व कालानुक्रम पूर्वज्ञान).`,
        misconceptions: `Memorising dates/terms without cause-and-effect understanding in ${topic} (कार्य-कारण भाव न समजता केवळ पाठांतर करणे).`,
        remedial: `Bilingual chronological flowcharts & key-term summary tables (द्विभाषिक ओघतक्ते व संज्ञा सारांश).`,
        enrichment: `Local-heritage or civic case-study note linking ${topic} to regional geography/institutions (स्थानिक वारसा किंवा नागरी संस्थांशी जोडणारे टिपण).`,
        hwMinutes,
        oralPracticalCheckpoint: 'Map pointing / timeline check, project chart & bilingual reasoning viva (नकाशा/कालरेषा तपासणी व तोंडी चाचणी).',
      };
    }

    return {
      aids: [
        'Bilingual step-sequence chart on chalkboard (फळ्यावरील द्विभाषिक कृती-क्रम तक्ता)',
        'Hands-on demonstration model / toolkit (प्रत्यक्ष प्रात्यक्षिक साहित्य संच)',
        'Checklist rubric for peer & self-evaluation (स्वयं व गट तपासणी सूची)',
      ],
      activityTitle: `Applied Skill & Creation Studio (उपयोजित कौशल्य कार्यशाळा): ${topic}`,
      activityInstructions: `Demonstrate one complete worked model of ${topic} with English technical terms and Marathi explanation, then guide learners through a paired hands-on mini-task.`,
      materials: ['Practice sheet / kit (सराव पत्रक)', 'Checklist rubric (तपासणी तक्ता)', 'Skill portfolio (कौशल्य पोर्टफोलिओ)'],
      prerequisites: `Classroom readiness, safe tool handling & foundational skill habits for ${topic} (मूलभूत पूर्वतयारी व कौशल्य सवयी).`,
      misconceptions: `Skipping planning steps or overlooking accuracy rules in ${topic} (नियोजन न करता घाईने कृती करणे).`,
      remedial: `Break the task into 3 micro-steps with bilingual teacher check-ins (३ लहान टप्प्यांत विभाजन व मार्गदर्शन).`,
      enrichment: `Extend the activity with an original variation or peer-mentoring (कल्पकतेने नवीन नमुना तयार करणे).`,
      hwMinutes,
      oralPracticalCheckpoint: 'Practical skill demo, portfolio review & bilingual oral check (प्रत्यक्ष कौशल्य प्रात्यक्षिक व तोंडी मूल्यमापन).',
    };
  }

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
      prerequisites: `Prior Class ${prevClass} numeracy, place-value accuracy, and mental arithmetic fluency linked to ${topic}.`,
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
  dayType: 'teaching' | 'half_day_teaching' | 'revision',
  medium: InstructionMedium = 'English'
): DailyTeachingPhase[] {
  const total = Math.max(25, Math.min(60, durationMinutes));
  const warmUp = Math.max(4, Math.round(total * 0.12));
  const demo = Math.max(8, Math.round(total * 0.28));
  const guided = Math.max(8, Math.round(total * 0.25));
  const activity = Math.max(6, Math.round(total * 0.22));
  const recap = Math.max(4, total - (warmUp + demo + guided + activity));

  if (dayType === 'revision') {
    if (medium === 'Marathi') {
      return [
        {
          phase: 'Warm-Up',
          minutes: warmUp,
          instruction: `"${unitTitle}" मधील महत्त्वाच्या व्याख्या व नियमांवर ३ जलद तोंडी प्रश्नोत्तरे.`,
        },
        {
          phase: 'Concept Demo',
          minutes: demo,
          instruction: `"${subTopic}" मधील कठीण भाग आणि परीक्षेत होणाऱ्या सामान्य चुकांचे फळ्यावर पुन्हा स्पष्टीकरण.`,
        },
        {
          phase: 'Guided Practice',
          minutes: guided,
          instruction: `"${subTopic}" वरील विविध काठीण्यपातळीच्या प्रश्नांचा वेळेत बोर्ड-पद्धतीनुसार सराव.`,
        },
        {
          phase: 'Activity / Practical',
          minutes: activity,
          instruction: `गुणदान योजनेतील (Marking Scheme) मुख्य शब्द व पायऱ्यांनुसार मित्र-तपासणी कार्यशाळा.`,
        },
        {
          phase: 'Recap & Check',
          minutes: recap,
          instruction: `वैयक्तिक शंकांचे निरसन करा आणि आगामी परीक्षेसाठी उजळणी उद्दिष्टे निश्चित करा.`,
        },
      ];
    }

    if (medium === 'Hindi') {
      return [
        {
          phase: 'Warm-Up',
          minutes: warmUp,
          instruction: `"${unitTitle}" की प्रमुख परिभाषाओं और नियमों पर ३ त्वरित मौखिक प्रश्नोत्तर।`,
        },
        {
          phase: 'Concept Demo',
          minutes: demo,
          instruction: `"${subTopic}" के कठिन बिंदुओं और परीक्षा में होने वाली सामान्य त्रुटियों का पुनः स्पष्टीकरण।`,
        },
        {
          phase: 'Guided Practice',
          minutes: guided,
          instruction: `"${subTopic}" पर मिश्रित कठिनाई स्तर के बोर्ड-पैटर्न प्रश्नों का समयबद्ध अभ्यास।`,
        },
        {
          phase: 'Activity / Practical',
          minutes: activity,
          instruction: `अंकन-योजना (Marking Scheme) के मुख्य शब्दों और चरणों के आधार पर सहपाठी-जाँच कार्यशाला।`,
        },
        {
          phase: 'Recap & Check',
          minutes: recap,
          instruction: `व्यक्तिगत शंकाओं की पहचान करें और परीक्षा-पूर्व केंद्रित पुनरावृत्ति लक्ष्य निर्धारित करें।`,
        },
      ];
    }

    if (medium === 'Semi-English') {
      return [
        {
          phase: 'Warm-Up',
          minutes: warmUp,
          instruction: `Rapid 3-question bilingual oral recall on key terms & rules from ${unitTitle} (मुख्य संज्ञा व नियमांची तोंडी उजळणी).`,
        },
        {
          phase: 'Concept Demo',
          minutes: demo,
          instruction: `Re-explain high-error areas in "${subTopic}" using English technical terms and Marathi clarification (कठीण संकल्पनांचे द्विभाषिक स्पष्टीकरण).`,
        },
        {
          phase: 'Guided Practice',
          minutes: guided,
          instruction: `Timed board-pattern practice set on "${subTopic}" with step-by-step verification (वेळेत बोर्ड-पॅटर्न सराव).`,
        },
        {
          phase: 'Activity / Practical',
          minutes: activity,
          instruction: `Peer-correction workshop using English marking-scheme keywords & step checkpoints (गुणदान मुख्य शब्दांनुसार जोडीत तपासणी).`,
        },
        {
          phase: 'Recap & Check',
          minutes: recap,
          instruction: `Resolve individual doubts & assign pre-exam revision targets (शंका निरसन व परीक्षापूर्व उजळणी).`,
        },
      ];
    }

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

  if (medium === 'Marathi') {
    const openingLead =
      periodIndex === 1
        ? `विद्यार्थ्यांच्या दैनंदिन अनुभवाशी जोडून "${unitTitle}" घटकाची प्रस्तावना करा व "${subTopic}" ची ओळख करून द्या.`
        : `तासिका ${periodIndex - 1} मधील मुख्य मुद्द्यांची २ तोंडी प्रश्नांनी उजळणी करून "${subTopic}" कडे वळा.`;

    const closingLead =
      periodIndex === totalPeriods
        ? `"${unitTitle}" घटकाच्या सर्व मुख्य मुद्द्यांचा गोषवारा घ्या, ३ प्रश्नांची मूल्यमापन चाचणी घ्या व घटक चाचणीची पूर्वतयारी तपासा.`
        : `फळ्यावरील "${subTopic}" चे ३ मुख्य मुद्दे सारांशित करा आणि तासिका ${periodIndex + 1} पूर्वी आकलन तपासणी प्रश्न विचारा.`;

    return [
      { phase: 'Warm-Up', minutes: warmUp, instruction: openingLead },
      {
        phase: 'Concept Demo',
        minutes: demo,
        instruction: `फळ्यावरील सुस्पष्ट मांडणी, दैनंदिन उदाहरणे आणि पायरीनिहाय प्रात्यक्षिकाद्वारे "${subTopic}" समजावून सांगा.`,
      },
      {
        phase: 'Guided Practice',
        minutes: guided,
        instruction: `वर्गासोबत २–३ श्रेणीबद्ध उदाहरणे सोडवून घ्या, वहीतील पायऱ्या तपासा आणि शंकांचे लगेच निरसन करा.`,
      },
      {
        phase: 'Activity / Practical',
        minutes: activity,
        instruction: `विद्यार्थ्यांनी संकल्पना प्रत्यक्ष करून दाखवावी यासाठी "${subTopic}" वर आधारित जोडी/गट कृती घ्या.`,
      },
      { phase: 'Recap & Check', minutes: recap, instruction: closingLead },
    ];
  }

  if (medium === 'Hindi') {
    const openingLead =
      periodIndex === 1
        ? `विद्यार्थियों के दैनिक जीवन के अनुभवों से जोड़ते हुए "${unitTitle}" का परिचय दें और "${subTopic}" की रूपरेखा प्रस्तुत करें।`
        : `कालांश ${periodIndex - 1} के मुख्य बिंदुओं की २ त्वरित मौखिक प्रश्नों से पुनरावृत्ति करें और "${subTopic}" की ओर बढ़ें।`;

    const closingLead =
      periodIndex === totalPeriods
        ? `"${unitTitle}" के संपूर्ण मुख्य बिंदुओं का संश्लेषण करें, ३-बिंदु जाँच प्रश्न पूछें और इकाई मूल्यांकन तत्परता की समीक्षा करें।`
        : `श्यामपट्ट पर "${subTopic}" के ३ मुख्य बिंदुओं का सारांश दें और कालांश ${periodIndex + 1} से पहले एक जाँच प्रश्न से समझ सुनिश्चित करें।`;

    return [
      { phase: 'Warm-Up', minutes: warmUp, instruction: openingLead },
      {
        phase: 'Concept Demo',
        minutes: demo,
        instruction: `स्पष्ट श्यामपट्ट संरचना, प्रासंगिक कक्षा उदाहरणों और चरणबद्ध मॉडलिंग के माध्यम से "${subTopic}" प्रस्तुत करें।`,
      },
      {
        phase: 'Guided Practice',
        minutes: guided,
        instruction: `कक्षा के साथ मिलकर २–३ क्रमिक उदाहरण हल करें, कॉपी के चरणों की जाँच करें और भ्रांतियों का तुरंत समाधान करें।`,
      },
      {
        phase: 'Activity / Practical',
        minutes: activity,
        instruction: `"${subTopic}" का अनुप्रयोग करते हुए एक संक्षिप्त जोड़ी/समूह गतिविधि कराएँ ताकि विद्यार्थी अवधारणा को सक्रिय रूप से प्रदर्शित करें।`,
      },
      { phase: 'Recap & Check', minutes: recap, instruction: closingLead },
    ];
  }

  if (medium === 'Semi-English') {
    const openingLead =
      periodIndex === 1
        ? `Connect prior real-life experience to introduce ${unitTitle} and preview "${subTopic}" using English terms & Marathi context (पूर्वज्ञानाशी जोडून द्विभाषिक प्रस्तावना).`
        : `Recap Period ${periodIndex - 1} takeaways with 2 quick bilingual prompts before starting "${subTopic}" (मागील तासिकेची द्विभाषिक उजळणी).`;

    const closingLead =
      periodIndex === totalPeriods
        ? `Synthesise complete unit highlights of ${unitTitle} and run a 3-point bilingual exit check (संपूर्ण घटकाचा सारांश व आकलन चाचणी).`
        : `Summarise 3 board takeaways for "${subTopic}" (English keywords + Marathi summary) before Period ${periodIndex + 1}.`;

    return [
      { phase: 'Warm-Up', minutes: warmUp, instruction: openingLead },
      {
        phase: 'Concept Demo',
        minutes: demo,
        instruction: `Present "${subTopic}" with English technical terms on the board and clear Marathi conceptual explanation (इंग्रजी संज्ञा व मराठीतून सविस्तर स्पष्टीकरण).`,
      },
      {
        phase: 'Guided Practice',
        minutes: guided,
        instruction: `Solve 2–3 graded examples collaboratively, verifying English terminology and step-by-step notebook work (२-३ उदाहरणांचा मार्गदर्शित सराव व वही तपासणी).`,
      },
      {
        phase: 'Activity / Practical',
        minutes: activity,
        instruction: `Run a structured pair/group task applying "${subTopic}" with bilingual peer discussion (जोडी किंवा गटात प्रत्यक्ष कृती सराव).`,
      },
      { phase: 'Recap & Check', minutes: recap, instruction: closingLead },
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
  outcomeNotes: Record<string, string>,
  medium: InstructionMedium = 'English'
): AnnualChapterPlanItem['learningOutcomes'] {
  const topic = unit.cleanTitle;

  const templates: {
    suffix: string;
    bloomLevel: 'Remember & Understand' | 'Apply & Demonstrate' | 'Analyze & Evaluate';
    statement: string;
    assessmentMethod: string;
  }[] =
    medium === 'Marathi'
      ? [
          {
            suffix: 'lo1',
            bloomLevel: 'Remember & Understand',
            statement: `"${topic}" मधील मूळ संज्ञा, रचना आणि पायाभूत संकल्पना स्वतःच्या शब्दांत अचूकपणे स्पष्ट करतो/करते (${curriculum.classLevel} ${curriculum.marathiName || curriculum.subject}).`,
            assessmentMethod: 'तोंडी प्रश्नोत्तरे, संकल्पना तक्ता व ५ मिनिटांची आकलन चाचणी',
          },
          {
            suffix: 'lo2',
            bloomLevel: 'Apply & Demonstrate',
            statement: `"${topic}" मधील संकल्पना व पद्धतींचा वापर करून वर्गातील उदाहरणे व प्रत्यक्ष कृती स्वतंत्रपणे सोडवतो/सोडवते.`,
            assessmentMethod: 'वर्गकार्य वही तपासणी, कृती रुब्रिक व गृहपाठ पडताळणी',
          },
          {
            suffix: 'lo3',
            bloomLevel: 'Analyze & Evaluate',
            statement: `"${topic}" चा दैनंदिन जीवनातील परिस्थितीशी संबंध जोडतो/जोडते, सामान्य चुका ओळखतो/ओळखते आणि उजळणी व परीक्षेत सकारण स्पष्टीकरण देतो/देते.`,
            assessmentMethod: 'घटक/सत्र चाचणी प्रश्न, मित्र-मूल्यमापन व तोंडी/प्रात्यक्षिक चाचणी',
          },
        ]
      : medium === 'Hindi'
      ? [
          {
            suffix: 'lo1',
            bloomLevel: 'Remember & Understand',
            statement: `"${topic}" की मूल शब्दावली, संरचना और आधारभूत विचारों को अपने शब्दों में सटीक रूप से स्पष्ट करता/करती है (${curriculum.classLevel} ${curriculum.hindiName || curriculum.subject})।`,
            assessmentMethod: 'मौखिक प्रश्नोत्तर, अवधारणा मानचित्र एवं ५-मिनट निकास पर्ची',
          },
          {
            suffix: 'lo2',
            bloomLevel: 'Apply & Demonstrate',
            statement: `"${topic}" की अवधारणाओं और विधियों का अनुप्रयोग कर कक्षा अभ्यास तथा व्यावहारिक कार्यों को स्वतंत्र रूप से हल करता/करती है।`,
            assessmentMethod: 'कक्षाकार्य कॉपी जाँच, गतिविधि रुब्रिक एवं गृहकार्य सत्यापन',
          },
          {
            suffix: 'lo3',
            bloomLevel: 'Analyze & Evaluate',
            statement: `"${topic}" को वास्तविक जीवन की स्थितियों से जोड़ता/जोड़ती है, सामान्य त्रुटियों को पहचानता/पहचानती है और मूल्यांकन में तार्किक पुष्टि करता/करती है।`,
            assessmentMethod: 'इकाई/आवधिक परीक्षण प्रश्न, सहपाठी समीक्षा एवं मौखिक/प्रायोगिक परीक्षा',
          },
        ]
      : medium === 'Semi-English'
      ? [
          {
            suffix: 'lo1',
            bloomLevel: 'Remember & Understand',
            statement: `Explain core English terms and foundational ideas of "${topic}" accurately with Marathi conceptual clarity (${curriculum.classLevel} ${curriculum.subject}).`,
            assessmentMethod: 'Bilingual oral questioning, concept map & 5-min exit slip (द्विभाषिक तोंडी प्रश्न व संकल्पना तक्ता)',
          },
          {
            suffix: 'lo2',
            bloomLevel: 'Apply & Demonstrate',
            statement: `Apply concepts and procedures from "${topic}" to solve structured exercises and hands-on tasks independently (संकल्पनांचे उपयोजन व स्वतंत्र सराव).`,
            assessmentMethod: 'Notebook classwork check, activity rubric & homework review (वही तपासणी व गृहपाठ पडताळणी)',
          },
          {
            suffix: 'lo3',
            bloomLevel: 'Analyze & Evaluate',
            statement: `Connect "${topic}" to real-life contexts, spot common errors, and justify reasoning in English/Marathi during assessments (दैनंदिन जीवनाशी संबंध व सकारण स्पष्टीकरण).`,
            assessmentMethod: 'Unit test items, peer review & bilingual oral/practical viva (घटक चाचणी व प्रात्यक्षिक मूल्यमापन)',
          },
        ]
      : [
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

    const profile = getDomainPedagogyProfile(curriculum, slot.unit, medium);
    const subTopicIndex =
      Math.floor(
        ((slot.periodIndexInUnit - 1) / Math.max(1, slot.totalPeriodsInUnit)) *
          slot.unit.subTopics.length
      ) % Math.max(1, slot.unit.subTopics.length);
    const rawDefaultSubTopic =
      slot.unit.subTopics[subTopicIndex] ||
      `${slot.unit.cleanTitle} — Part ${slot.periodIndexInUnit}`;
    const defaultSubTopic = localizeSubTopicForMedium(
      rawDefaultSubTopic,
      slot.unit.cleanTitle,
      curriculum,
      medium
    );

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
      dayType,
      medium
    );

    const dueDate = findNextWorkingDateAfter(assignedNode.date);

    const learningObjectives =
      medium === 'Marathi'
        ? [
            `वर्गातील उदाहरणांसह "${subTopicFocus}" मधील मुख्य संकल्पना समजून घेणे व स्पष्ट करणे.`,
            `"${slot.unit.cleanTitle}" घटकाचा पायरीनिहाय अचूक सराव पूर्ण करणे (तासिका ${slot.periodIndexInUnit}/${slot.totalPeriodsInUnit}).`,
          ]
        : medium === 'Hindi'
        ? [
            `कक्षा के उदाहरणों के साथ "${subTopicFocus}" की मुख्य अवधारणा को समझना और स्पष्ट करना।`,
            `"${slot.unit.cleanTitle}" पर चरणबद्ध सटीक अभ्यास प्रदर्शित करना (कालांश ${slot.periodIndexInUnit}/${slot.totalPeriodsInUnit})।`,
          ]
        : medium === 'Semi-English'
        ? [
            `Understand and explain "${subTopicFocus}" using English terminology and Marathi conceptual explanation (मुख्य संकल्पना समजून स्पष्ट करणे).`,
            `Demonstrate accurate step-by-step practice on ${slot.unit.cleanTitle} (Period ${slot.periodIndexInUnit}/${slot.totalPeriodsInUnit} — पायरीनिहाय अचूक सराव).`,
          ]
        : [
            `Understand and explain the key idea of "${subTopicFocus}" with classroom examples.`,
            `Demonstrate accurate step-by-step practice on ${slot.unit.cleanTitle} (Period ${slot.periodIndexInUnit}/${slot.totalPeriodsInUnit}).`,
          ];

    const boardSummaryPoints =
      medium === 'Marathi'
        ? [
            `घटक ${slot.unit.unitNumber}: ${slot.unit.cleanTitle}`,
            `अध्यापन केंद्रबिंदू: ${subTopicFocus}`,
            `मुख्य तपासणी: वहीत नोंद करण्यापूर्वी पायऱ्या, महत्त्वाचे शब्द व सुबक मांडणी तपासा.`,
          ]
        : medium === 'Hindi'
        ? [
            `इकाई ${slot.unit.unitNumber}: ${slot.unit.cleanTitle}`,
            `शिक्षण केंद्रबिंदु: ${subTopicFocus}`,
            `मुख्य जाँच: कॉपी हस्ताक्षर से पूर्व चरण, मुख्य शब्द एवं स्वच्छ प्रस्तुति सत्यापित करें।`,
          ]
        : medium === 'Semi-English'
        ? [
            `Unit / घटक ${slot.unit.unitNumber}: ${slot.unit.cleanTitle}`,
            `Focus / केंद्रबिंदू: ${subTopicFocus}`,
            `Key Check / तपासणी: Verify English keywords, steps & neat notebook representation (पायऱ्या व मुख्य संज्ञा तपासा).`,
          ]
        : [
            `Unit ${slot.unit.unitNumber}: ${slot.unit.cleanTitle}`,
            `Focus: ${subTopicFocus}`,
            `Key Check: Verify steps, keywords & neat representation before notebook sign-off.`,
          ];

    const defaultCoreHomework =
      medium === 'Marathi'
        ? `"${subTopicFocus}" वरील वर्गकार्य टिपणांची उजळणी करा आणि तुमच्या ${curriculum.marathiName || curriculum.subject} वहीत ३ सराव प्रश्न पूर्ण करा.`
        : medium === 'Hindi'
        ? `"${subTopicFocus}" के कक्षाकार्य नोट्स की पुनरावृत्ति करें और अपनी ${curriculum.hindiName || curriculum.subject} कॉपी में ३ संरचित अभ्यास प्रश्न पूरे करें।`
        : medium === 'Semi-English'
        ? `Revise classwork notes on "${subTopicFocus}" and complete 3 structured practice items in your ${curriculum.subject} notebook (वर्गकार्य उजळणी व ३ सराव प्रश्न पूर्ण करा).`
        : `Revise classwork notes on "${subTopicFocus}" and complete 3 structured practice items in your ${curriculum.subject} notebook.`;

    const applicationHomework =
      medium === 'Marathi'
        ? `उद्याच्या पूर्वतयारीसाठी "${subTopicFocus}" वर आधारित १ दैनंदिन जीवनातील उदाहरण किंवा स्वयं-तपासणी प्रश्न लिहा.`
        : medium === 'Hindi'
        ? `कल के वार्म-अप के लिए "${subTopicFocus}" पर आधारित १ दैनिक जीवन का उदाहरण या स्व-जाँच प्रश्न लिखें।`
        : medium === 'Semi-English'
        ? `Write 1 real-life example or bilingual self-check question on "${subTopicFocus}" for tomorrow's warm-up (१ दैनंदिन उदाहरण किंवा स्वयं-तपासणी प्रश्न लिहा).`
        : `Write 1 real-life example or self-check question based on "${subTopicFocus}" for tomorrow's warm-up.`;

    const formativeCheckText =
      medium === 'Marathi'
        ? `"${subTopicFocus}" वर ३ मिनिटांची तोंडी व वही तपासणी चाचणी (उद्दिष्ट: पुढील तासिकेपूर्वी ८०% वर्ग आकलन).`
        : medium === 'Hindi'
        ? `"${subTopicFocus}" पर ३-मिनट की मौखिक एवं कॉपी निकास जाँच (लक्ष्य: अगले कालांश से पूर्व ८०% कक्षा तत्परता)।`
        : medium === 'Semi-English'
        ? `3-minute bilingual oral & notebook exit check on "${subTopicFocus}" (target: 80% class readiness / ८०% वर्ग आकलन).`
        : `3-minute oral & notebook exit check on "${subTopicFocus}" (target: 80% class readiness before next period).`;

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
      learningObjectives,
      methodology5Phase,
      teachingAids: edits?.teachingAidNote?.trim()
        ? [edits.teachingAidNote.trim(), ...profile.aids]
        : profile.aids,
      boardSummaryPoints,
      activityAndPractical: {
        title: profile.activityTitle,
        instructions: edits?.activityNote?.trim() || profile.activityInstructions,
        materials: profile.materials,
      },
      homeworkPlan: {
        coreTask: edits?.homeworkNote?.trim() || defaultCoreHomework,
        applicationTask: applicationHomework,
        estimatedMinutes: profile.hwMinutes,
        dueDate,
      },
      formativeCheck: formativeCheckText,
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

    const profile = getDomainPedagogyProfile(curriculum, focusUnit, medium);
    const edits = permittedEditsMap[lessonKey];
    const revLabelDefault =
      medium === 'Marathi'
        ? revNode.revisionName || 'नियोजित उजळणी'
        : medium === 'Hindi'
        ? revNode.revisionName || 'निर्धारित पुनरावृत्ति'
        : revNode.revisionName || 'Scheduled Revision';
    const subTopicFocus =
      edits?.subTopicFocus?.trim() ||
      `${revLabelDefault}: ${focusUnit.cleanTitle}`;
    const isCompleted =
      Boolean(completedDateLocks[lessonKey]) || completedDatesSet.has(revNode.date);

    const revObjectives =
      medium === 'Marathi'
        ? [
            `"${focusUnit.cleanTitle}" मधील मुख्य संकल्पना, नियम आणि परीक्षा-पद्धतीच्या उत्तरांची एकत्रित उजळणी करणे.`,
            `आगामी परीक्षेपूर्वी विद्यार्थ्यांच्या वैयक्तिक शंका व चुकांचे निराकरण करणे.`,
          ]
        : medium === 'Hindi'
        ? [
            `"${focusUnit.cleanTitle}" की मुख्य अवधारणाओं, नियमों और बोर्ड-पैटर्न उत्तरों का सुदृढ़ीकरण करना।`,
            `आगामी परीक्षा से पूर्व विद्यार्थियों की व्यक्तिगत भ्रांतियों का समाधान करना।`,
          ]
        : medium === 'Semi-English'
        ? [
            `Consolidate key concepts, English keywords, and board-pattern answers for ${focusUnit.cleanTitle} (मुख्य संकल्पना व बोर्ड-पॅटर्न उत्तरांची उजळणी).`,
            `Resolve individual student misconceptions prior to examination (परीक्षेपूर्वी शंका निरसन).`,
          ]
        : [
            `Consolidate key concepts, rules, and board-pattern answers for ${focusUnit.cleanTitle}.`,
            `Resolve individual student misconceptions prior to upcoming examination.`,
          ];

    const revAidsDefault =
      medium === 'Marathi'
        ? ['उजळणी सारांश तक्ता', 'वेळेत सोडवण्याची सराव प्रश्नपत्रिका', 'गुणदान तपासणी सूची']
        : medium === 'Hindi'
        ? ['पुनरावृत्ति सारांश चार्ट', 'समयबद्ध अभ्यास प्रश्न-पत्र', 'अंकन-योजना जाँच-सूची']
        : medium === 'Semi-English'
        ? ['Bilingual recap anchor chart (द्विभाषिक उजळणी तक्ता)', 'Timed revision practice sheet (सराव पत्रक)', 'Marking-scheme checklist']
        : ['Recap anchor chart', 'Timed revision practice sheet', 'Marking-scheme checklist'];

    const revBoardPoints =
      medium === 'Marathi'
        ? [
            `उजळणी उद्दिष्ट: ${revNode.revisionName || 'परीक्षापूर्व दृढीकरण'}`,
            `केंद्रित घटक: ${focusUnit.cleanTitle}`,
            `परीक्षा पूर्वतयारी: वेळेचे नियोजन, सुबक आकृत्या/पायऱ्या आणि अचूक मुख्य शब्द.`,
          ]
        : medium === 'Hindi'
        ? [
            `पुनरावृत्ति लक्ष्य: ${revNode.revisionName || 'परीक्षा-पूर्व सुदृढ़ीकरण'}`,
            `इकाई केंद्रबिंदु: ${focusUnit.cleanTitle}`,
            `परीक्षा तत्परता: समय प्रबंधन, स्वच्छ चित्र/चरण एवं मुख्य शब्दों की सटीकता।`,
          ]
        : medium === 'Semi-English'
        ? [
            `Revision Target / उजळणी उद्दिष्ट: ${revNode.revisionName || 'Pre-Exam Consolidation'}`,
            `Unit Focus / घटक: ${focusUnit.cleanTitle}`,
            `Exam Readiness: Time management, neat diagrams/steps & English keyword accuracy (वेळेचे नियोजन व अचूक मुख्य शब्द).`,
          ]
        : [
            `Revision Target: ${revNode.revisionName || 'Pre-Exam Consolidation'}`,
            `Unit Focus: ${focusUnit.cleanTitle}`,
            `Exam Readiness: Time management, neat diagrams/steps & keyword accuracy.`,
          ];

    const revActivityTitle =
      medium === 'Marathi'
        ? `गट उजळणी व तोंडी प्रश्नोत्तर सराव: ${focusUnit.cleanTitle}`
        : medium === 'Hindi'
        ? `सहपाठी पुनरावृत्ति एवं मौखिक अभ्यास: ${focusUnit.cleanTitle}`
        : medium === 'Semi-English'
        ? `Peer Revision & Bilingual Viva Drill (जोडीत उजळणी सराव): ${focusUnit.cleanTitle}`
        : `Peer Revision & Viva Drill: ${focusUnit.cleanTitle}`;

    const revActivityInstructions =
      medium === 'Marathi'
        ? `"${focusUnit.cleanTitle}" मधील महत्त्वाच्या प्रश्नांवर जोडीने जलद प्रश्नोत्तरे आणि पायऱ्यांमधील चुका ओळखण्याचा सराव घ्या.`
        : medium === 'Hindi'
        ? `"${focusUnit.cleanTitle}" के उच्च-अंक वाले प्रश्नों पर जोड़ी में त्वरित प्रश्नोत्तरी और चरण-त्रुटि पहचान अभ्यास कराएँ।`
        : medium === 'Semi-English'
        ? `Conduct rapid pair-quizzing and step-error spotting on high-weightage questions from ${focusUnit.cleanTitle} using English terms & Marathi explanation.`
        : `Conduct rapid pair-quizzing and step-error spotting on high-weightage questions from ${focusUnit.cleanTitle}.`;

    const revMaterials =
      medium === 'Marathi'
        ? ['उजळणी तपासणी सूची', 'सराव वही', 'गुणदान तक्ता']
        : medium === 'Hindi'
        ? ['पुनरावृत्ति जाँच-सूची', 'अभ्यास कॉपी', 'अंकन रुब्रिक']
        : medium === 'Semi-English'
        ? ['Revision checklist (उजळणी सूची)', 'Practice notebook (सराव वही)', 'Marking rubric']
        : ['Revision checklist', 'Practice notebook', 'Marking rubric'];

    const revCoreHw =
      medium === 'Marathi'
        ? `"${focusUnit.cleanTitle}" वर १ वेळेत स्वयं-चाचणी संच पूर्ण करा आणि पुढील वर्गासाठी शंकांची नोंद ठेवा.`
        : medium === 'Hindi'
        ? `"${focusUnit.cleanTitle}" पर १ समयबद्ध स्व-परीक्षण सेट पूरा करें और अगली कक्षा के लिए शंकाएँ चिह्नित करें।`
        : medium === 'Semi-English'
        ? `Complete 1 timed self-test set on ${focusUnit.cleanTitle} and flag doubts for next class (१ स्वयं-चाचणी पूर्ण करा व शंका नोंदवा).`
        : `Complete 1 timed self-test set on ${focusUnit.cleanTitle} and flag any doubts for next class.`;

    const revAppHw =
      medium === 'Marathi'
        ? `"${focusUnit.cleanTitle}" साठी ५ मुद्द्यांचे एक-पानी उजळणी सारांश कार्ड तयार करा.`
        : medium === 'Hindi'
        ? `"${focusUnit.cleanTitle}" के लिए ५ बिंदुओं वाला एक-पृष्ठीय सारांश कार्ड तैयार करें।`
        : medium === 'Semi-English'
        ? `Prepare a 5-bullet bilingual summary card for ${focusUnit.cleanTitle} (५ मुद्द्यांचे द्विभाषिक उजळणी कार्ड तयार करा).`
        : `Prepare a 5-bullet one-page summary card for ${focusUnit.cleanTitle}.`;

    const revFormative =
      medium === 'Marathi'
        ? `"${focusUnit.cleanTitle}" वर १० मिनिटांची निदान चाचणी व शंका-निरसन नोंद.`
        : medium === 'Hindi'
        ? `"${focusUnit.cleanTitle}" पर १०-मिनट की नैदानिक जाँच एवं शंका-समाधान लॉग।`
        : medium === 'Semi-English'
        ? `Timed 10-minute diagnostic check + bilingual doubt-resolution log on ${focusUnit.cleanTitle} (१० मिनिटांची निदान चाचणी व शंका निरसन).`
        : `Timed 10-minute diagnostic check + doubt-resolution log on ${focusUnit.cleanTitle}.`;

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
      learningObjectives: revObjectives,
      methodology5Phase: buildDaily5PhaseMethodology(
        baseDuration,
        subTopicFocus,
        focusUnit.cleanTitle,
        rIdx + 1,
        revisionNodes.length,
        'revision',
        medium
      ),
      teachingAids: edits?.teachingAidNote?.trim()
        ? [edits.teachingAidNote.trim(), ...revAidsDefault]
        : revAidsDefault,
      boardSummaryPoints: revBoardPoints,
      activityAndPractical: {
        title: revActivityTitle,
        instructions: edits?.activityNote?.trim() || revActivityInstructions,
        materials: revMaterials,
      },
      homeworkPlan: {
        coreTask: edits?.homeworkNote?.trim() || revCoreHw,
        applicationTask: revAppHw,
        estimatedMinutes: profile.hwMinutes,
        dueDate: findNextWorkingDateAfter(revNode.date),
      },
      formativeCheck: revFormative,
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
    const profile = getDomainPedagogyProfile(curriculum, unit, medium);
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
      outcomeNotesMap,
      medium
    );
    const localizedKeyConcepts = unit.subTopics.map((st) =>
      localizeSubTopicForMedium(st, unit.cleanTitle, curriculum, medium)
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
      keyConcepts: localizedKeyConcepts,
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
      ? getDomainPedagogyProfile(curriculum, curriculum.units[0], medium)
      : null;

    const defaultOralCheckpoint =
      medium === 'Marathi'
        ? 'तोंडी प्रश्नोत्तरे, वही तपासणी व प्रात्यक्षिक मूल्यमापन.'
        : medium === 'Hindi'
        ? 'मौखिक परीक्षा, कॉपी जाँच एवं प्रायोगिक मूल्यांकन।'
        : medium === 'Semi-English'
        ? 'Bilingual oral viva, notebook check & practical evaluation (द्विभाषिक तोंडी व प्रात्यक्षिक मूल्यमापन).'
        : 'Oral viva, notebook check & practical evaluation.';

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
        sampleProfile?.oralPracticalCheckpoint || defaultOralCheckpoint,
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

      const strategySummary =
        medium === 'Marathi'
          ? rw.term === 'Term 1'
            ? 'संकल्पना उजळणी तक्ते, शंका-निरसन गटचर्चा आणि प्रथम सत्र नमुना प्रश्नपत्रिका सराव.'
            : 'संपूर्ण अभ्यासक्रमाची टप्प्याटप्प्याने उजळणी, चुकांचे विश्लेषण आणि बोर्ड-पद्धतीच्या सराव प्रश्नपत्रिका.'
          : medium === 'Hindi'
          ? rw.term === 'Term 1'
            ? 'अवधारणा पुनरावृत्ति मानचित्र, शंका-समाधान सत्र एवं प्रथम सत्र मॉडल प्रश्न-पत्र अभ्यास।'
            : 'संपूर्ण पाठ्यक्रम की अंतराल पुनरावृत्ति, त्रुटि-विश्लेषण अभ्यास एवं बोर्ड-पैटर्न आदर्श प्रश्न-पत्र।'
          : medium === 'Semi-English'
          ? rw.term === 'Term 1'
            ? 'Bilingual concept recap maps, doubt-clearing circles & Term 1 model practice paper (प्रथम सत्र द्विभाषिक उजळणी व सराव प्रश्नपत्रिका).'
            : 'Full-syllabus spaced revision, error-analysis drills & board-pattern specimen practice (संपूर्ण अभ्यासक्रम उजळणी व बोर्ड-पॅटर्न सराव).'
          : rw.term === 'Term 1'
          ? 'Concept recap maps, doubt-clearing circles, and Term 1 model practice paper.'
          : 'Full-syllabus spaced revision, error-analysis drills, and board-pattern specimen practice.';

      return {
        id: rw.id,
        name: rw.name,
        term: rw.term || 'Annual',
        startDate: rw.startDate,
        endDate: rw.endDate,
        revisionDaysCount,
        focusUnits: focus.length > 0 ? focus : allChapters.map((c) => c.cleanTitle),
        strategySummary,
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

      let keyMilestone =
        medium === 'Marathi'
          ? 'नियमित अभ्यासक्रम अध्यापन व रचनात्मक वही तपासणी'
          : medium === 'Hindi'
          ? 'नियमित पाठ्यक्रम शिक्षण एवं रचनात्मक कॉपी जाँच'
          : medium === 'Semi-English'
          ? 'Regular curriculum teaching & formative notebook checks (नियमित अध्यापन व वही तपासणी)'
          : 'Regular curriculum teaching & formative notebook checks';

      if (wExamDays > 0) {
        const exName = wDays.find((d) => d.examName)?.examName || 'Assessment';
        keyMilestone =
          medium === 'Marathi'
            ? `परीक्षा कालावधी (${exName})`
            : medium === 'Hindi'
            ? `परीक्षा अवधि (${exName})`
            : medium === 'Semi-English'
            ? `Examination Window / परीक्षा कालावधी (${exName})`
            : `Examination Window (${exName})`;
      } else if (wRevDays > 0) {
        const revName = wDays.find((d) => d.revisionName)?.revisionName || 'Consolidation';
        keyMilestone =
          medium === 'Marathi'
            ? `उजळणी सत्र (${revName})`
            : medium === 'Hindi'
            ? `पुनरावृत्ति सत्र (${revName})`
            : medium === 'Semi-English'
            ? `Revision Sprint / उजळणी सत्र (${revName})`
            : `Revision Sprint (${revName})`;
      } else if (wLessons.length === 0) {
        const vacName = wDays.find((d) => d.vacationName)?.vacationName;
        keyMilestone = vacName
          ? medium === 'Marathi'
            ? `नियोजित सुट्टी (${vacName})`
            : medium === 'Hindi'
            ? `निर्धारित अवकाश (${vacName})`
            : medium === 'Semi-English'
            ? `Scheduled Vacation / नियोजित सुट्टी (${vacName})`
            : `Scheduled Vacation (${vacName})`
          : medium === 'Marathi'
          ? 'अध्यापन-विरहित / सुट्टीचा आठवडा'
          : medium === 'Hindi'
          ? 'गैर-शिक्षण / अवकाश सप्ताह'
          : medium === 'Semi-English'
          ? 'Non-teaching / Holiday Week (सुट्टीचा आठवडा)'
          : 'Non-teaching / Holiday Week';
      } else if (wLessons.some((l) => l.periodIndexInUnit === l.totalPeriodsInUnit)) {
        keyMilestone =
          medium === 'Marathi'
            ? 'घटक पूर्णत्व टप्पा + रचनात्मक उजळणी व गृहपाठ आढावा'
            : medium === 'Hindi'
            ? 'इकाई पूर्णता पड़ाव + रचनात्मक पुनरावृत्ति एवं गृहकार्य समीक्षा'
            : medium === 'Semi-English'
            ? 'Unit completion milestone + formative recap & homework review (घटक पूर्णत्व व उजळणी आढावा)'
            : 'Unit completion milestone + formative recap & homework review';
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
