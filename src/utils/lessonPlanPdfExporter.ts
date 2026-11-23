import {
  GeneratedThreeTabLessonPlan,
  LessonPlanPdfScope,
} from '../types/lessonPlanner';
import { BOARD_DISPLAY_NAMES } from '../data/lessonPlanner/defaultBoardCalendars';
import { sanitizePrintableHtml } from './sanitizeMarkup';

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

const PRINT_IFRAME_ID = 'msz-lesson-plan-a4-print-frame';
const PRINT_ROOT_ID = 'msz-lesson-plan-a4-print-root';
const PRINT_STYLE_ID = 'msz-lesson-plan-a4-print-style';
const PRINT_BODY_CLASS = 'msz-lesson-plan-printing';

function buildA4Stylesheet(scopePrefix = ''): string {
  const p = scopePrefix ? `${scopePrefix} ` : '';
  return `
    @page {
      size: A4 portrait;
      margin: 12mm 10mm 14mm 10mm;
    }
    ${p}* {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    ${
      scopePrefix
        ? `
    @media screen {
      #${PRINT_ROOT_ID} {
        display: none !important;
      }
    }
    @media print {
      html.${PRINT_BODY_CLASS},
      body.${PRINT_BODY_CLASS} {
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
        max-width: none !important;
        height: auto !important;
        min-height: 0 !important;
        overflow: visible !important;
        background: #ffffff !important;
        color: #0f172a !important;
      }
      body.${PRINT_BODY_CLASS} > *:not(#${PRINT_ROOT_ID}) {
        display: none !important;
        visibility: hidden !important;
        height: 0 !important;
        max-height: 0 !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
        border: 0 !important;
      }
      body.${PRINT_BODY_CLASS} > #${PRINT_ROOT_ID} {
        display: block !important;
        visibility: visible !important;
        position: static !important;
        width: 100% !important;
        max-width: 100% !important;
        height: auto !important;
        overflow: visible !important;
        margin: 0 !important;
        padding: 0 !important;
        background: #ffffff !important;
        color: #0f172a !important;
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        font-size: 9.4pt !important;
        line-height: 1.45 !important;
      }
    }
    `
        : `
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      max-width: none;
      height: auto;
      overflow: visible;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 9.4pt;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    `
    }
    ${p}.a4-doc-container {
      width: 100%;
      max-width: 100%;
      margin: 0;
      padding: 0;
      overflow: visible;
      word-break: break-word;
      overflow-wrap: anywhere;
    }
    ${p}.header-box {
      border: 1.5px solid #0f172a;
      border-radius: 6px;
      padding: 9px 11px;
      margin-bottom: 12px;
      background: #f8fafc;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}.brand-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px 10px;
      font-size: 8.3pt;
      color: #475569;
      margin-bottom: 3px;
    }
    ${p}.brand-name {
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.01em;
    }
    ${p}.doc-title {
      font-size: 13.5pt;
      font-weight: 800;
      margin: 2px 0 6px 0;
      color: #0f172a;
      line-height: 1.25;
    }
    ${p}.meta-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin: 4px 0 0 0;
      font-size: 8.4pt;
    }
    ${p}.meta-table td {
      border: 1px solid #cbd5e1;
      padding: 3.5px 6px;
      background: #ffffff;
      color: #1e293b;
      vertical-align: top;
      word-break: break-word;
      overflow-wrap: anywhere;
    }
    ${p}.source-banner {
      margin-top: 7px;
      padding: 5px 8px;
      border-radius: 4px;
      font-size: 8.1pt;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      color: #334155;
      line-height: 1.35;
    }
    ${p}.source-banner.review {
      border-color: #d97706;
      background: #fffbeb;
      color: #92400e;
    }
    ${p}h2 {
      font-size: 10.8pt;
      font-weight: 800;
      color: #0f172a;
      margin: 12px 0 6px 0;
      padding-bottom: 3px;
      border-bottom: 1.5px solid #334155;
      break-after: avoid;
      page-break-after: avoid;
    }
    ${p}h3 {
      font-size: 9.6pt;
      font-weight: 700;
      color: #0f172a;
      margin: 7px 0 4px 0;
      break-after: avoid;
      page-break-after: avoid;
    }
    ${p}table.data-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin-bottom: 9px;
      font-size: 8.4pt;
    }
    ${p}table.data-table thead {
      display: table-header-group;
    }
    ${p}table.data-table tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}table.data-table th,
    ${p}table.data-table td {
      border: 1px solid #94a3b8;
      padding: 4.5px 6px;
      text-align: left;
      vertical-align: top;
      word-break: break-word;
      overflow-wrap: anywhere;
    }
    ${p}table.data-table th {
      background: #f1f5f9;
      font-weight: 700;
      color: #0f172a;
    }
    ${p}.kpi-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 6px 0;
      table-layout: fixed;
      margin: 0 -6px 10px -6px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}.kpi-cell {
      border: 1px solid #94a3b8;
      border-radius: 5px;
      padding: 6px 8px;
      background: #f8fafc;
      vertical-align: top;
    }
    ${p}.kpi-label {
      font-size: 7.5pt;
      color: #475569;
      text-transform: uppercase;
      font-weight: 700;
    }
    ${p}.kpi-value {
      font-size: 11.2pt;
      font-weight: 800;
      color: #0f172a;
      margin-top: 2px;
    }
    ${p}.card {
      border: 1px solid #94a3b8;
      border-radius: 6px;
      padding: 7px 9px;
      margin-bottom: 8px;
      background: #ffffff;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}.month-group-banner {
      background: #0f172a;
      color: #ffffff;
      font-size: 9.4pt;
      font-weight: 800;
      padding: 5px 9px;
      border-radius: 5px;
      margin: 11px 0 7px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px 10px;
      break-after: avoid;
      page-break-after: avoid;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}.daily-lesson-card {
      border: 1.25px solid #475569;
      border-radius: 6px;
      margin-bottom: 9px;
      background: #ffffff;
      overflow: visible;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}.daily-lesson-head {
      background: #f1f5f9;
      border-bottom: 1px solid #94a3b8;
      padding: 5.5px 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 4px 8px;
      font-size: 8.8pt;
      font-weight: 800;
      color: #0f172a;
    }
    ${p}.daily-lesson-body {
      padding: 6px 8px;
      font-size: 8.4pt;
      line-height: 1.42;
    }
    ${p}.daily-grid-table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      margin: 4px 0;
      font-size: 8.2pt;
    }
    ${p}.daily-grid-table tr {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}.daily-grid-table th,
    ${p}.daily-grid-table td {
      border: 1px solid #cbd5e1;
      padding: 3.5px 5.5px;
      vertical-align: top;
      text-align: left;
      word-break: break-word;
      overflow-wrap: anywhere;
    }
    ${p}.daily-grid-table th {
      background: #f8fafc;
      font-weight: 700;
      color: #1e293b;
      width: 24%;
    }
    ${p}.tag {
      display: inline-block;
      border: 1px solid #64748b;
      border-radius: 4px;
      padding: 1px 5px;
      font-size: 7.5pt;
      font-weight: 700;
      color: #0f172a;
      background: #ffffff;
      white-space: nowrap;
    }
    ${p}.tag-completed {
      border-color: #15803d;
      background: #dcfce7;
      color: #166534;
    }
    ${p}.page-break {
      break-before: page;
      page-break-before: always;
      height: 0;
      margin: 0;
      padding: 0;
    }
    ${p}ul {
      margin: 2px 0 4px 0;
      padding-left: 15px;
    }
    ${p}li {
      margin-bottom: 1.5px;
    }
    ${p}.remark-box {
      margin-top: 4px;
      padding: 4px 6px;
      background: #fefce8;
      border: 1px solid #eab308;
      border-radius: 4px;
      font-size: 8.2pt;
      color: #713f12;
    }
    ${p}.sig-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 14px 0;
      table-layout: fixed;
      margin: 20px -14px 0 -14px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
    ${p}.sig-cell {
      border-top: 1px solid #334155;
      padding-top: 5px;
      font-size: 8.2pt;
      color: #334155;
      text-align: center;
      vertical-align: top;
    }
    ${p}.footer-note {
      margin-top: 12px;
      padding-top: 5px;
      border-top: 1px solid #94a3b8;
      font-size: 7.6pt;
      color: #475569;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 4px 10px;
      break-inside: avoid;
      page-break-inside: avoid;
    }
  `;
}

function buildPrintableInnerMarkup(bodyHtml: string): string {
  return `
    <div class="a4-doc-container">
      ${bodyHtml}
      <table class="sig-table" role="presentation">
        <tbody>
          <tr>
            <td class="sig-cell">Subject Teacher Signature &amp; Date</td>
            <td class="sig-cell">Head of Department / Supervisor</td>
            <td class="sig-cell">Principal Signature &amp; School Stamp</td>
          </tr>
        </tbody>
      </table>
      <div class="footer-note">
        <span>MyStudyZone Automatic Teacher Lesson Planner (mystudyzone.in) — Original Teaching Plan</span>
        <span>A4 Official Teacher Record</span>
      </div>
    </div>
  `;
}

function removeExistingPrintArtifacts(): void {
  if (typeof document === 'undefined') return;
  try {
    document.documentElement?.classList?.remove(PRINT_BODY_CLASS);
    document.body?.classList?.remove(PRINT_BODY_CLASS);
    const oldFrame = document.getElementById?.(PRINT_IFRAME_ID);
    if (oldFrame && oldFrame.parentNode) {
      oldFrame.parentNode.removeChild(oldFrame);
    }
    const oldRoot = document.getElementById?.(PRINT_ROOT_ID);
    if (oldRoot && oldRoot.parentNode) {
      oldRoot.parentNode.removeChild(oldRoot);
    }
    const oldStyle = document.getElementById?.(PRINT_STYLE_ID);
    if (oldStyle && oldStyle.parentNode) {
      oldStyle.parentNode.removeChild(oldStyle);
    }
  } catch {
    // Safe fallback for minimal test DOM mocks
  }
}

function printLessonPlanHtmlViaHiddenIframe(documentTitle: string, bodyHtml: string): void {
  if (typeof document === 'undefined') return;

  removeExistingPrintArtifacts();

  const innerMarkup = sanitizePrintableHtml(buildPrintableInnerMarkup(bodyHtml));

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(documentTitle)}</title>
  <style>${buildA4Stylesheet('')}</style>
</head>
<body>
  ${innerMarkup}
</body>
</html>`;

  // 1. Mount top-level @media print A4 container on document.body so mobile browsers
  //    (Android Chrome / iOS Safari) that delegate iframe.contentWindow.print() to
  //    top-level window.print() hide all website headers/navigation (#root) and
  //    paginate the full unclipped A4 Portrait document directly.
  try {
    if (document.head && document.body?.classList) {
      const styleEl = document.createElement('style');
      if (styleEl && 'id' in styleEl) {
        styleEl.id = PRINT_STYLE_ID;
        styleEl.textContent = buildA4Stylesheet(`#${PRINT_ROOT_ID}`);
        document.head.appendChild(styleEl);
      }

      const printRoot = document.createElement('div');
      if (printRoot && 'id' in printRoot) {
        printRoot.id = PRINT_ROOT_ID;
        printRoot.setAttribute?.('aria-hidden', 'true');
        printRoot.innerHTML = innerMarkup;
        document.body.appendChild(printRoot);
      }

      document.documentElement?.classList?.add(PRINT_BODY_CLASS);
      document.body.classList.add(PRINT_BODY_CLASS);
    }
  } catch {
    // Ignore in headless test mocks
  }

  // 2. Create A4-dimensioned hidden iframe (not 0x0 and not visibility:hidden so
  //    desktop & mobile WebKit/Blink print engines compute true A4 portrait width).
  const iframe = document.createElement('iframe');
  iframe.id = PRINT_IFRAME_ID;
  iframe.setAttribute('aria-hidden', 'true');
  iframe.style.position = 'fixed';
  iframe.style.left = '-10000px';
  iframe.style.top = '0';
  iframe.style.width = '210mm';
  iframe.style.height = '297mm';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  iframe.style.pointerEvents = 'none';
  iframe.style.zIndex = '-1';

  document.body.appendChild(iframe);

  let cleanedUp = false;
  const cleanup = () => {
    if (cleanedUp) return;
    cleanedUp = true;
    removeExistingPrintArtifacts();
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

    // Clean up only after the user closes the print preview dialog (or after 60s safety timeout),
    // never after 1.4s while the mobile/desktop print preview is still open and paginating.
    try {
      iframe.contentWindow.addEventListener?.('afterprint', () => {
        setTimeout(cleanup, 400);
      });
      if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        const onParentAfterPrint = () => {
          window.removeEventListener('afterprint', onParentAfterPrint);
          setTimeout(cleanup, 400);
        };
        window.addEventListener('afterprint', onParentAfterPrint);
      }
    } catch {
      // Ignore listener errors in mock environments
    }

    setTimeout(() => {
      try {
        const ua =
          typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent : '';
        const isMobileViewport =
          /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
          (typeof window !== 'undefined' &&
            typeof window.innerWidth === 'number' &&
            window.innerWidth > 0 &&
            window.innerWidth <= 768);

        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();

        // On mobile browsers where iframe.contentWindow.print() may no-op inside an offscreen frame,
        // ensure top-level print dialog opens against #msz-lesson-plan-a4-print-root if needed.
        if (
          isMobileViewport &&
          typeof window !== 'undefined' &&
          typeof window.print === 'function' &&
          !iframe.contentWindow?.print
        ) {
          window.print();
        }
      } finally {
        setTimeout(cleanup, 60000);
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

  const localizedSubjectSuffix =
    medium === 'Marathi' && curriculum.marathiName && curriculum.marathiName !== curriculum.subject
      ? ` (${curriculum.marathiName})`
      : medium === 'Hindi' && curriculum.hindiName && curriculum.hindiName !== curriculum.subject
      ? ` (${curriculum.hindiName})`
      : medium === 'Semi-English' &&
        curriculum.marathiName &&
        curriculum.marathiName !== curriculum.subject
      ? ` (${curriculum.marathiName})`
      : '';

  const mediumDisplayLabel =
    medium === 'Marathi'
      ? 'Marathi (मराठी माध्यम)'
      : medium === 'Hindi'
      ? 'Hindi (हिन्दी माध्यम)'
      : medium === 'Semi-English'
      ? 'Semi-English (सेमी-इंग्रजी माध्यम)'
      : 'English';

  return `
    <div class="header-box">
      <div class="brand-row">
        <span class="brand-name">${escapeHtml(schoolName)} &middot; MyStudyZone Teacher Lesson Planner</span>
        <span><strong>${escapeHtml(scopeTitle)}</strong></span>
      </div>
      <div class="doc-title">${escapeHtml(curriculum.classLevel)} (${escapeHtml(
        division
      )}) &mdash; ${escapeHtml(curriculum.subject)}${escapeHtml(localizedSubjectSuffix)}</div>
      <table class="meta-table" role="presentation">
        <tbody>
          <tr>
            <td><strong>Board:</strong> ${escapeHtml(boardName)}</td>
            <td><strong>Academic Year:</strong> ${escapeHtml(effectiveCalendar.academicYear)}</td>
            <td><strong>Medium:</strong> ${escapeHtml(mediumDisplayLabel)}</td>
          </tr>
          <tr>
            <td><strong>Textbook / Ref:</strong> ${escapeHtml(curriculum.bookTitle)}</td>
            <td><strong>Edition:</strong> ${escapeHtml(curriculum.editionYear)}</td>
            <td><strong>Schedule:</strong> ${escapeHtml(periodsPerWeek)} periods/wk (${escapeHtml(
              effectiveCalendar.defaultPeriodMinutes
            )} min)</td>
          </tr>
          <tr>
            <td><strong>Reopening:</strong> ${escapeHtml(
              formatIsoDisplay(effectiveCalendar.reopeningDate)
            )}</td>
            <td><strong>Syllabus Deadline:</strong> ${escapeHtml(
              formatIsoDisplay(effectiveCalendar.syllabusCompletionDeadline)
            )}</td>
            <td><strong>Teacher:</strong> ${escapeHtml(teacherName || 'Subject Teacher')}</td>
          </tr>
        </tbody>
      </table>
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
          <span style="font-size:7.9pt; color:#334155;"><strong>Key Concepts:</strong> ${escapeHtml(
            ch.keyConcepts.join(', ')
          )}</span><br/>
          <span style="font-size:7.9pt; color:#475569;"><strong>Activity:</strong> ${escapeHtml(
            ch.suggestedActivity
          )}</span><br/>
          <span style="font-size:7.8pt; color:#475569;"><strong>Outcome:</strong> ${escapeHtml(
            ch.learningOutcomes[0]?.statement || ''
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
    <table class="kpi-table" role="presentation">
      <tbody>
        <tr>
          <td class="kpi-cell">
            <div class="kpi-label">School Working Days</div>
            <div class="kpi-value">${calendarSummary.totalSchoolWorkingDays}</div>
          </td>
          <td class="kpi-cell">
            <div class="kpi-label">Subject Teaching Days</div>
            <div class="kpi-value">${calendarSummary.subjectTeachingDaysBeforeDeadline}</div>
          </td>
          <td class="kpi-cell">
            <div class="kpi-label">Holidays &amp; Vacations</div>
            <div class="kpi-value">${calendarSummary.holidayCount}H / ${calendarSummary.vacationDayCount}V</div>
          </td>
          <td class="kpi-cell">
            <div class="kpi-label">Syllabus Completion</div>
            <div class="kpi-value">${progressOverview.syllabusCompletionPercent}%</div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2>2. Annual Term-Wise Unit Distribution (${annualPlan.allChapters.length} Units)</h2>
    <table class="data-table">
      <thead>
        <tr>
          <th style="width:6%;">#</th>
          <th style="width:40%;">Unit / Topic, Concepts &amp; Key Activity</th>
          <th style="width:10%;">Term</th>
          <th style="width:9%;">Periods</th>
          <th style="width:20%;">Planned Dates</th>
          <th style="width:15%;">Progress</th>
        </tr>
      </thead>
      <tbody>${chapterRows}</tbody>
    </table>

    <h2>3. Examination &amp; Portion Roadmap</h2>
    <table class="data-table">
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
    <table class="data-table">
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
  const normalizedMonthKey =
    selectedMonthKey && selectedMonthKey.toLowerCase() !== 'all'
      ? selectedMonthKey
      : undefined;
  const months = normalizedMonthKey
    ? plan.monthlyPlans.filter((m) => m.monthKey === normalizedMonthKey)
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
          <p style="font-size:8.2pt; color:#334155; margin:2px 0 6px 0;">
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
            ${
              m.monthlyActivitiesHighlight.length
                ? `<br/><strong>Monthly Activities:</strong> ${escapeHtml(
                    m.monthlyActivitiesHighlight.join(' • ')
                  )}`
                : ''
            }
          </p>
          <table class="data-table" style="margin-bottom:0;">
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
  const normalizedMonthKey =
    selectedMonthKey && selectedMonthKey.toLowerCase() !== 'all'
      ? selectedMonthKey
      : undefined;

  // Render 100% of scheduled lessons in the selected scope (never truncate or slice off lessons)
  const lessons = normalizedMonthKey
    ? plan.dailyPlans.filter((d) => d.monthKey === normalizedMonthKey)
    : plan.dailyPlans;

  if (lessons.length === 0) {
    return `
      <h2>Daily Lesson Plan Classroom Diary (0 Scheduled Sessions)</h2>
      <p>No daily lessons scheduled in the selected range.</p>
    `;
  }

  const monthLabelByKey = new Map<string, string>();
  for (const m of plan.monthlyPlans) {
    monthLabelByKey.set(m.monthKey, m.monthLabel);
  }

  // Group lessons chronologically by month so multi-page A4 printouts have clear section headers
  const groupedByMonth: { monthKey: string; monthLabel: string; items: typeof lessons }[] = [];
  for (const lp of lessons) {
    const lastGroup = groupedByMonth[groupedByMonth.length - 1];
    if (!lastGroup || lastGroup.monthKey !== lp.monthKey) {
      groupedByMonth.push({
        monthKey: lp.monthKey,
        monthLabel: monthLabelByKey.get(lp.monthKey) || lp.monthKey,
        items: [lp],
      });
    } else {
      lastGroup.items.push(lp);
    }
  }

  const monthSectionsHtml = groupedByMonth
    .map((group) => {
      const completedInGroup = group.items.filter((i) => i.isCompleted).length;
      const cardsHtml = group.items
        .map((lp) => {
          const phasesRowsHtml = lp.methodology5Phase
            .map(
              (ph) => `
              <tr>
                <td style="width:26%; font-weight:700; background:#f8fafc;">${escapeHtml(
                  ph.phase
                )} (${ph.minutes} min)</td>
                <td style="width:74%;">${escapeHtml(ph.instruction)}</td>
              </tr>`
            )
            .join('');

          const objectivesListHtml = lp.learningObjectives
            .map((obj) => `<li>${escapeHtml(obj)}</li>`)
            .join('');

          const boardPointsHtml =
            lp.boardSummaryPoints && lp.boardSummaryPoints.length > 0
              ? lp.boardSummaryPoints.map((pt) => escapeHtml(pt)).join(' &bull; ')
              : '';

          const materialsStr =
            lp.activityAndPractical.materials && lp.activityAndPractical.materials.length > 0
              ? lp.activityAndPractical.materials.map((m) => escapeHtml(m)).join(', ')
              : 'Standard classroom notebook & chalkboard';

          const statusBadgeText = lp.isCompleted
            ? `COMPLETED${
                lp.lockedCompletedDate
                  ? ` (${formatIsoDisplay(lp.lockedCompletedDate)})`
                  : ''
              }`
            : lp.dayType === 'half_day_teaching'
              ? 'HALF-DAY SESSION'
              : lp.dayType === 'revision'
                ? 'REVISION SESSION'
                : 'SCHEDULED';

          const teachingAidExtra = lp.permittedEdits?.teachingAidNote
            ? `<br/><span><strong>Teacher Aid Note:</strong> ${escapeHtml(
                lp.permittedEdits.teachingAidNote
              )}</span>`
            : '';

          const activityExtra = lp.permittedEdits?.activityNote
            ? `<br/><span><strong>Teacher Activity Note:</strong> ${escapeHtml(
                lp.permittedEdits.activityNote
              )}</span>`
            : '';

          const homeworkExtra = lp.permittedEdits?.homeworkNote
            ? `<br/><span><strong>Teacher Homework Note:</strong> ${escapeHtml(
                lp.permittedEdits.homeworkNote
              )}</span>`
            : '';

          return `
            <div class="daily-lesson-card">
              <div class="daily-lesson-head">
                <span>
                  Lesson #${lp.sequenceNumber} &middot; ${escapeHtml(
                    formatIsoDisplay(lp.date)
                  )} (${escapeHtml(lp.weekdayLabel)}) &mdash; Unit ${lp.unitNumber}: ${escapeHtml(
                    lp.unitTitle
                  )} (Period ${lp.periodIndexInUnit} of ${lp.totalPeriodsInUnit})
                </span>
                <span class="tag ${lp.isCompleted ? 'tag-completed' : ''}">
                  ${escapeHtml(statusBadgeText)} &middot; ${lp.durationMinutes} min
                </span>
              </div>
              <div class="daily-lesson-body">
                <table class="daily-grid-table" role="presentation">
                  <tbody>
                    <tr>
                      <th>Sub-Topic Focus</th>
                      <td><strong>${escapeHtml(lp.subTopicFocus)}</strong> <span style="color:#475569;">(${escapeHtml(
                        lp.unitSourceLabel
                      )})</span></td>
                    </tr>
                    <tr>
                      <th>Learning Objectives</th>
                      <td><ul>${objectivesListHtml}</ul></td>
                    </tr>
                  </tbody>
                </table>

                <div style="font-weight:700; color:#0f172a; margin:4px 0 2px 0;">
                  5-Phase Classroom Teaching Methodology (${lp.durationMinutes} Minutes):
                </div>
                <table class="daily-grid-table">
                  <tbody>${phasesRowsHtml}</tbody>
                </table>

                <table class="daily-grid-table" role="presentation">
                  <tbody>
                    <tr>
                      <th>Teaching Aids &amp; Board Summary</th>
                      <td>
                        <strong>Aids:</strong> ${escapeHtml(lp.teachingAids.join('; '))}
                        ${
                          boardPointsHtml
                            ? `<br/><strong>Board Summary Points:</strong> ${boardPointsHtml}`
                            : ''
                        }
                        ${teachingAidExtra}
                      </td>
                    </tr>
                    <tr>
                      <th>Activity / Practical Work</th>
                      <td>
                        <strong>${escapeHtml(lp.activityAndPractical.title)}:</strong> ${escapeHtml(
                          lp.activityAndPractical.instructions
                        )}
                        <br/><strong>Materials:</strong> ${materialsStr}
                        ${activityExtra}
                      </td>
                    </tr>
                    <tr>
                      <th>Homework (${lp.homeworkPlan.estimatedMinutes} min, Due ${escapeHtml(
                        formatIsoDisplay(lp.homeworkPlan.dueDate)
                      )})</th>
                      <td>
                        <strong>Core Practice:</strong> ${escapeHtml(lp.homeworkPlan.coreTask)}
                        ${
                          lp.homeworkPlan.applicationTask
                            ? `<br/><strong>Application Task:</strong> ${escapeHtml(
                                lp.homeworkPlan.applicationTask
                              )}`
                            : ''
                        }
                        ${homeworkExtra}
                      </td>
                    </tr>
                    <tr>
                      <th>Formative Check</th>
                      <td>${escapeHtml(lp.formativeCheck)}</td>
                    </tr>
                  </tbody>
                </table>

                ${
                  includePrivateRemarks && lp.privateRemark
                    ? `<div class="remark-box"><strong>Teacher Remark:</strong> ${escapeHtml(
                        lp.privateRemark
                      )}</div>`
                    : ''
                }
              </div>
            </div>
          `;
        })
        .join('');

      return `
        <div class="month-group-banner">
          <span>${escapeHtml(group.monthLabel)} &mdash; Daily Classroom Teaching Diary</span>
          <span>${group.items.length} Sessions (${completedInGroup}/${group.items.length} Completed)</span>
        </div>
        ${cardsHtml}
      `;
    })
    .join('');

  const selectedMonthLabel = normalizedMonthKey
    ? monthLabelByKey.get(normalizedMonthKey) || normalizedMonthKey
    : '';

  return `
    <h2>Daily Lesson Plan Classroom Diary (${lessons.length} Scheduled Sessions${
      selectedMonthLabel ? ` &mdash; ${escapeHtml(selectedMonthLabel)}` : ' &mdash; Full Academic Year'
    })</h2>
    ${monthSectionsHtml}
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

  const normalizedMonthKey =
    selectedMonthKey && selectedMonthKey.toLowerCase() !== 'all'
      ? selectedMonthKey
      : undefined;

  const scopeLabel =
    scope === 'annual'
      ? 'Annual Lesson Plan'
      : scope === 'monthly'
      ? normalizedMonthKey
        ? `Monthly Lesson Plan (${normalizedMonthKey})`
        : 'Monthly Lesson Plan (Full Year)'
      : scope === 'daily'
      ? normalizedMonthKey
        ? `Daily Lesson Plan Diary (${normalizedMonthKey})`
        : 'Daily Lesson Plan Diary'
      : 'Complete 3-Plan Teacher Subject Pack';

  const title = `MyStudyZone Lesson Plan - ${plan.curriculum.board} ${plan.curriculum.classLevel} ${plan.curriculum.subject} - ${scopeLabel}`;
  const headerHtml = buildHeaderHtml(plan, scopeLabel, teacherName);

  let contentHtml = '';
  if (scope === 'annual') {
    contentHtml = buildAnnualSectionHtml(plan);
  } else if (scope === 'monthly') {
    contentHtml = buildMonthlySectionHtml(plan, normalizedMonthKey);
  } else if (scope === 'daily') {
    contentHtml = buildDailySectionHtml(plan, normalizedMonthKey, includePrivateRemarks);
  } else {
    contentHtml = `
      ${buildAnnualSectionHtml(plan)}
      <div class="page-break"></div>
      ${buildMonthlySectionHtml(plan)}
      <div class="page-break"></div>
      ${buildDailySectionHtml(plan, normalizedMonthKey, includePrivateRemarks)}
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
