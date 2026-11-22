import {
  GeneratedThreeTabLessonPlan,
  LessonPlanPdfScope,
} from '../types/lessonPlanner';
import { BOARD_DISPLAY_NAMES } from '../data/lessonPlanner/defaultBoardCalendars';

/**
 * Clean A4 PDF Print / Save-as-PDF Exporter for the MyStudyZone Automatic Teacher Lesson Planner.
 *
 * Reuses the exact isolated hidden-iframe A4 portrait pattern from `src/utils/studyMaterialPdfExporter.ts`:
 * - Zero extra third-party PDF libraries (no jspdf).
 * - NEVER modifies `src/index.css` or parent `@media print` Worksheet anti-print protection.
 * - NEVER calls `window.open()` or `window.alert()`.
 * - Escapes every dynamic and teacher-entered string safely before HTML construction.
 */

function escapeHtml(raw: unknown): string {
  return String(raw ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatIsoDisplay(iso?: string | null): string {
  if (!iso) return '—';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function printLessonPlanHtmlViaHiddenIframe(documentTitle: string, bodyHtml: string): void {
  if (typeof document === 'undefined') return;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(documentTitle)}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 13mm 12mm 15mm 12mm;
    }
    * {
      box-sizing: border-box;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 9.8pt;
      line-height: 1.48;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header-box {
      border: 1.5px solid #0f172a;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 14px;
      background: #f8fafc;
    }
    .brand-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 8.5pt;
      color: #475569;
      margin-bottom: 4px;
    }
    .brand-name {
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.02em;
    }
    .doc-title {
      font-size: 14.5pt;
      font-weight: 800;
      margin: 3px 0 5px 0;
      color: #0f172a;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 4px 10px;
      font-size: 8.8pt;
      color: #1e293b;
      margin-top: 4px;
    }
    .source-banner {
      margin-top: 8px;
      padding: 5px 8px;
      border-radius: 4px;
      font-size: 8.4pt;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #334155;
    }
    .source-banner.review {
      border-color: #d97706;
      background: #fffbeb;
      color: #92400e;
    }
    h2 {
      font-size: 11.2pt;
      font-weight: 800;
      color: #0f172a;
      margin: 14px 0 7px 0;
      padding-bottom: 3px;
      border-bottom: 1.5px solid #cbd5e1;
      page-break-after: avoid;
    }
    h3 {
      font-size: 9.8pt;
      font-weight: 700;
      color: #1e293b;
      margin: 8px 0 4px 0;
      page-break-after: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      font-size: 8.7pt;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 5px 6px;
      text-align: left;
      vertical-align: top;
    }
    th {
      background: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
    }
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 10px;
    }
    .kpi-card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 7px 8px;
      background: #f8fafc;
    }
    .kpi-label {
      font-size: 7.8pt;
      color: #475569;
      text-transform: uppercase;
      font-weight: 700;
    }
    .kpi-value {
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
      margin-top: 2px;
    }
    .card {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 9px;
      background: #ffffff;
      page-break-inside: avoid;
    }
    .tag {
      display: inline-block;
      border: 1px solid #94a3b8;
      border-radius: 4px;
      padding: 1px 5px;
      font-size: 7.8pt;
      font-weight: 700;
      color: #1e293b;
      background: #f8fafc;
    }
    .page-break {
      page-break-before: always;
    }
    ul {
      margin: 3px 0 6px 0;
      padding-left: 16px;
    }
    li {
      margin-bottom: 2px;
    }
    .sig-grid {
      margin-top: 22px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
      page-break-inside: avoid;
    }
    .sig-box {
      border-top: 1px solid #334155;
      padding-top: 5px;
      font-size: 8.5pt;
      color: #334155;
      text-align: center;
    }
    .footer-note {
      margin-top: 14px;
      padding-top: 6px;
      border-top: 1px solid #cbd5e1;
      font-size: 7.8pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  ${bodyHtml}
  <div class="sig-grid">
    <div class="sig-box">Subject Teacher Signature &amp; Date</div>
    <div class="sig-box">Head of Department / Supervisor</div>
    <div class="sig-box">Principal Signature &amp; School Stamp</div>
  </div>
  <div class="footer-note">
    <span>MyStudyZone Automatic Teacher Lesson Planner (mystudyzone.in) — Original Teaching Plan</span>
    <span>A4 Official Teacher Record</span>
  </div>
</body>
</html>`;

  const iframe = document.createElement('iframe');
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';

  document.body.appendChild(iframe);

  const cleanup = () => {
    setTimeout(() => {
      try {
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
      } catch {
        // ignore cleanup error
      }
    }, 1400);
  };

  try {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!doc || !iframe.contentWindow) {
      cleanup();
      return;
    }
    doc.open();
    doc.write(fullHtml);
    doc.close();

    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        cleanup();
      }
    }, 260);
  } catch {
    cleanup();
  }
}

function buildHeaderHtml(
  plan: GeneratedThreeTabLessonPlan,
  scopeTitle: string,
  teacherName?: string
): string {
  const { curriculum, effectiveCalendar, schoolName, medium, division, periodsPerWeek } = plan;
  const boardName = BOARD_DISPLAY_NAMES[curriculum.board];
  const isReviewUnits =
    curriculum.curriculumSourceType === 'curriculum_based_planning_units';

  return `
    <div class="header-box">
      <div class="brand-row">
        <span class="brand-name">${escapeHtml(schoolName)} &middot; MyStudyZone Teacher Lesson Planner</span>
        <span>${escapeHtml(scopeTitle)}</span>
      </div>
      <div class="doc-title">${escapeHtml(curriculum.classLevel)} (${escapeHtml(
        division
      )}) &mdash; ${escapeHtml(curriculum.subject)}</div>
      <div class="meta-grid">
        <div><strong>Board:</strong> ${escapeHtml(boardName)}</div>
        <div><strong>Academic Year:</strong> ${escapeHtml(effectiveCalendar.academicYear)}</div>
        <div><strong>Medium:</strong> ${escapeHtml(medium)}</div>
        <div><strong>Textbook / Ref:</strong> ${escapeHtml(curriculum.bookTitle)}</div>
        <div><strong>Edition:</strong> ${escapeHtml(curriculum.editionYear)}</div>
        <div><strong>Schedule:</strong> ${escapeHtml(periodsPerWeek)} periods/week (${escapeHtml(
          effectiveCalendar.defaultPeriodMinutes
        )} min)</div>
        ${
          teacherName
            ? `<div><strong>Teacher:</strong> ${escapeHtml(teacherName)}</div>`
            : ''
        }
        <div><strong>Reopening:</strong> ${escapeHtml(
          formatIsoDisplay(effectiveCalendar.reopeningDate)
        )}</div>
        <div><strong>Syllabus Deadline:</strong> ${escapeHtml(
          formatIsoDisplay(effectiveCalendar.syllabusCompletionDeadline)
        )}</div>
      </div>
      <div class="source-banner ${isReviewUnits ? 'review' : ''}">
        <strong>Curriculum Unit Source:</strong> ${escapeHtml(curriculum.curriculumSourceLabel)}
        ${
          isReviewUnits
            ? ' &mdash; Structured using MyStudyZone Curriculum-Based Planning Units (not presented as official textbook chapter tables; reviewable by Admin).'
            : ' &mdash; Mapped to verified board curriculum sequence; all teaching plans, activities, and outcomes are original MyStudyZone content.'
        }
      </div>
    </div>
  `;
}

function buildAnnualSectionHtml(plan: GeneratedThreeTabLessonPlan): string {
  const { calendarSummary, annualPlan, progressOverview } = plan;

  const chapterRows = annualPlan.allChapters
    .map(
      (ch) => `
      <tr>
        <td><strong>${ch.unitNumber}</strong></td>
        <td>
          <strong>${escapeHtml(ch.title)}</strong><br/>
          <span style="font-size:8pt; color:#475569;">Activity: ${escapeHtml(
            ch.suggestedActivity
          )}</span>
        </td>
        <td>${escapeHtml(ch.term)}</td>
        <td>${escapeHtml(ch.allocatedPeriods)}</td>
        <td>${escapeHtml(formatIsoDisplay(ch.plannedStartDate))} &ndash; ${escapeHtml(
          formatIsoDisplay(ch.plannedEndDate)
        )}</td>
        <td>${escapeHtml(ch.completionPercent)}% (${ch.completedLessonsCount}/${ch.totalLessonsCount})</td>
      </tr>`
    )
    .join('');

  const examRows = annualPlan.examRoadmap
    .map(
      (ex) => `
      <tr>
        <td><strong>${escapeHtml(ex.name)}</strong> (${escapeHtml(ex.term)})</td>
        <td>${escapeHtml(formatIsoDisplay(ex.startDate))} &ndash; ${escapeHtml(
          formatIsoDisplay(ex.endDate)
        )}</td>
        <td>${escapeHtml(
          ex.coveredUnitNumbers.length > 0
            ? `Units ${ex.coveredUnitNumbers.join(', ')}`
            : 'Planned Units'
        )}</td>
        <td>${escapeHtml(ex.oralPracticalCheckpoint)}</td>
      </tr>`
    )
    .join('');

  const revRows = annualPlan.revisionRoadmap
    .map(
      (rv) => `
      <tr>
        <td><strong>${escapeHtml(rv.name)}</strong></td>
        <td>${escapeHtml(formatIsoDisplay(rv.startDate))} &ndash; ${escapeHtml(
          formatIsoDisplay(rv.endDate)
        )}</td>
        <td>${escapeHtml(rv.revisionDaysCount)} days</td>
        <td>${escapeHtml(rv.strategySummary)}</td>
      </tr>`
    )
    .join('');

  return `
    <h2>1. Annual Calendar &amp; Progress Summary</h2>
    <div class="kpi-row">
      <div class="kpi-card">
        <div class="kpi-label">School Working Days</div>
        <div class="kpi-value">${calendarSummary.totalSchoolWorkingDays}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Subject Teaching Days</div>
        <div class="kpi-value">${calendarSummary.subjectTeachingDaysBeforeDeadline}</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Holidays &amp; Vacations</div>
        <div class="kpi-value">${calendarSummary.holidayCount}H / ${calendarSummary.vacationDayCount}V</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-label">Syllabus Completion</div>
        <div class="kpi-value">${progressOverview.syllabusCompletionPercent}%</div>
      </div>
    </div>

    <h2>2. Annual Term-Wise Unit Distribution (${annualPlan.allChapters.length} Units)</h2>
    <table>
      <thead>
        <tr>
          <th style="width:6%;">#</th>
          <th style="width:38%;">Unit / Topic &amp; Key Activity</th>
          <th style="width:10%;">Term</th>
          <th style="width:10%;">Periods</th>
          <th style="width:20%;">Planned Dates</th>
          <th style="width:16%;">Progress</th>
        </tr>
      </thead>
      <tbody>${chapterRows}</tbody>
    </table>

    <h2>3. Examination &amp; Portion Roadmap</h2>
    <table>
      <thead>
        <tr>
          <th style="width:26%;">Examination</th>
          <th style="width:20%;">Window</th>
          <th style="width:24%;">Auto-Computed Portion</th>
          <th style="width:30%;">Oral / Practical Checkpoint</th>
        </tr>
      </thead>
      <tbody>${examRows}</tbody>
    </table>

    <h2>4. Spaced Revision Roadmap</h2>
    <table>
      <thead>
        <tr>
          <th style="width:26%;">Revision Block</th>
          <th style="width:20%;">Window</th>
          <th style="width:12%;">Days</th>
          <th style="width:42%;">Focus Strategy</th>
        </tr>
      </thead>
      <tbody>${revRows}</tbody>
    </table>
  `;
}

function buildMonthlySectionHtml(
  plan: GeneratedThreeTabLessonPlan,
  selectedMonthKey?: string
): string {
  const months = selectedMonthKey
    ? plan.monthlyPlans.filter((m) => m.monthKey === selectedMonthKey)
    : plan.monthlyPlans;

  const blocks = months
    .map((m) => {
      const weekRows = m.weeklyBreakdown
        .map(
          (w) => `
          <tr>
            <td><strong>${escapeHtml(w.weekLabel)}</strong><br/>${escapeHtml(
              formatIsoDisplay(w.startDate)
            )} &ndash; ${escapeHtml(formatIsoDisplay(w.endDate))}</td>
            <td>${w.schoolWorkingDays} work / ${w.subjectTeachingPeriods} subj</td>
            <td>${escapeHtml(w.targetChapters.join('; ') || 'Non-teaching / Assessment')}</td>
            <td>${escapeHtml(w.keyMilestone)}</td>
            <td>${w.completedLessons}/${w.totalLessons}</td>
          </tr>`
        )
        .join('');

      const holidaysStr =
        m.holidayCallouts.length > 0
          ? m.holidayCallouts
              .map((h) => `${formatIsoDisplay(h.date)} (${h.name})`)
              .join(', ')
          : 'None';

      return `
        <div class="card">
          <h3>${escapeHtml(m.monthLabel)} &mdash; ${m.schoolWorkingDays} Working Days &middot; ${m.subjectTeachingPeriods} Subject Periods (${m.completionPercent}% Done)</h3>
          <p style="font-size:8.4pt; color:#334155; margin:2px 0 6px 0;">
            <strong>Holidays:</strong> ${escapeHtml(holidaysStr)}
            ${
              m.vacationCallouts.length
                ? ` &nbsp;|&nbsp; <strong>Vacations:</strong> ${escapeHtml(
                    m.vacationCallouts.join(', ')
                  )}`
                : ''
            }
            ${
              m.examCallouts.length
                ? ` &nbsp;|&nbsp; <strong>Exams:</strong> ${escapeHtml(
                    m.examCallouts.join(', ')
                  )}`
                : ''
            }
          </p>
          <table>
            <thead>
              <tr>
                <th style="width:20%;">Week &amp; Dates</th>
                <th style="width:14%;">Days</th>
                <th style="width:30%;">Target Units</th>
                <th style="width:26%;">Milestone / Checkpoint</th>
                <th style="width:10%;">Done</th>
              </tr>
            </thead>
            <tbody>${weekRows}</tbody>
          </table>
        </div>
      `;
    })
    .join('');

  return `
    <h2>Monthly Plan &amp; Integrated Weekly Pacing Breakdown</h2>
    ${blocks}
  `;
}

function buildDailySectionHtml(
  plan: GeneratedThreeTabLessonPlan,
  selectedMonthKey?: string,
  includePrivateRemarks = true
): string {
  const lessons = selectedMonthKey
    ? plan.dailyPlans.filter((d) => d.monthKey === selectedMonthKey)
    : plan.dailyPlans.slice(0, 45);

  const cards = lessons
    .map((lp) => {
      const phasesHtml = lp.methodology5Phase
        .map(
          (ph) =>
            `<li><strong>${escapeHtml(ph.phase)} (${ph.minutes}m):</strong> ${escapeHtml(
              ph.instruction
            )}</li>`
        )
        .join('');

      return `
        <div class="card">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
            <strong>#${lp.sequenceNumber} &middot; ${escapeHtml(
              formatIsoDisplay(lp.date)
            )} (${escapeHtml(lp.weekdayLabel)}) &mdash; Unit ${lp.unitNumber}: ${escapeHtml(
              lp.unitTitle
            )}</strong>
            <span class="tag">${lp.isCompleted ? 'COMPLETED' : lp.dayType.toUpperCase()} &middot; ${
              lp.durationMinutes
            } min</span>
          </div>
          <p style="margin:2px 0 4px 0;"><strong>Sub-Topic Focus:</strong> ${escapeHtml(
            lp.subTopicFocus
          )}</p>
          <p style="margin:2px 0 4px 0;"><strong>Learning Objectives:</strong> ${escapeHtml(
            lp.learningObjectives.join(' | ')
          )}</p>
          <div style="margin:3px 0;"><strong>5-Phase Classroom Methodology:</strong><ul>${phasesHtml}</ul></div>
          <p style="margin:2px 0;"><strong>Teaching Aids:</strong> ${escapeHtml(
            lp.teachingAids.join('; ')
          )}</p>
          <p style="margin:2px 0;"><strong>Activity / Practical Work:</strong> ${escapeHtml(
            lp.activityAndPractical.title
          )} &mdash; ${escapeHtml(lp.activityAndPractical.instructions)}</p>
          <p style="margin:2px 0;"><strong>Homework (${
            lp.homeworkPlan.estimatedMinutes
          } min, Due ${escapeHtml(formatIsoDisplay(lp.homeworkPlan.dueDate))}):</strong> ${escapeHtml(
            lp.homeworkPlan.coreTask
          )}</p>
          <p style="margin:2px 0;"><strong>Formative Check:</strong> ${escapeHtml(
            lp.formativeCheck
          )}</p>
          ${
            includePrivateRemarks && lp.privateRemark
              ? `<p style="margin:4px 0 0 0; padding:4px 6px; background:#fefce8; border:1px solid #fde047; border-radius:4px;"><strong>Teacher Remark:</strong> ${escapeHtml(
                  lp.privateRemark
                )}</p>`
              : ''
          }
        </div>
      `;
    })
    .join('');

  return `
    <h2>Daily Lesson Plan Classroom Diary (${lessons.length} Scheduled Sessions${
      selectedMonthKey ? ` — ${escapeHtml(selectedMonthKey)}` : ''
    })</h2>
    ${cards || '<p>No daily lessons scheduled in the selected range.</p>'}
  `;
}

export function buildLessonPlanA4Html(params: {
  plan: GeneratedThreeTabLessonPlan;
  scope: LessonPlanPdfScope;
  selectedMonthKey?: string;
  teacherName?: string;
  includePrivateRemarks?: boolean;
}): { title: string; bodyHtml: string } {
  const {
    plan,
    scope,
    selectedMonthKey,
    teacherName,
    includePrivateRemarks = true,
  } = params;

  const scopeLabel =
    scope === 'annual'
      ? 'Annual Lesson Plan'
      : scope === 'monthly'
      ? selectedMonthKey
        ? `Monthly Lesson Plan (${selectedMonthKey})`
        : 'Monthly Lesson Plan (Full Year)'
      : scope === 'daily'
      ? selectedMonthKey
        ? `Daily Lesson Plan Diary (${selectedMonthKey})`
        : 'Daily Lesson Plan Diary'
      : 'Complete 3-Plan Teacher Subject Pack';

  const title = `MyStudyZone Lesson Plan - ${plan.curriculum.board} ${plan.curriculum.classLevel} ${plan.curriculum.subject} - ${scopeLabel}`;
  const headerHtml = buildHeaderHtml(plan, scopeLabel, teacherName);

  let contentHtml = '';
  if (scope === 'annual') {
    contentHtml = buildAnnualSectionHtml(plan);
  } else if (scope === 'monthly') {
    contentHtml = buildMonthlySectionHtml(plan, selectedMonthKey);
  } else if (scope === 'daily') {
    contentHtml = buildDailySectionHtml(plan, selectedMonthKey, includePrivateRemarks);
  } else {
    contentHtml = `
      ${buildAnnualSectionHtml(plan)}
      <div class="page-break"></div>
      ${buildMonthlySectionHtml(plan)}
      <div class="page-break"></div>
      ${buildDailySectionHtml(plan, selectedMonthKey, includePrivateRemarks)}
    `;
  }

  return {
    title,
    bodyHtml: `${headerHtml}${contentHtml}`,
  };
}

export function printLessonPlanA4(params: {
  plan: GeneratedThreeTabLessonPlan;
  scope: LessonPlanPdfScope;
  selectedMonthKey?: string;
  teacherName?: string;
  includePrivateRemarks?: boolean;
}): void {
  const { title, bodyHtml } = buildLessonPlanA4Html(params);
  printLessonPlanHtmlViaHiddenIframe(title, bodyHtml);
}
