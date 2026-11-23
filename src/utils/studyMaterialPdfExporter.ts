import {
  ChapterStudyMaterial,
  EducationBoard,
  ClassLevel,
  SubjectName,
  StudyLibraryExamPaper,
} from '../types';
import { sanitizePrintableHtml } from './sanitizeMarkup';

/**
 * Clean A4 PDF Print / Download Exporter STRICTLY Scoped to the Free Study Material Library.
 *
 * Security & Protection Guarantee:
 * - Renders an isolated, self-contained A4 HTML document inside a temporary hidden <iframe>
 *   and triggers `iframe.contentWindow.print()`.
 * - NEVER modifies `src/index.css` or the parent window's `@media print` Worksheet anti-print rules
 *   (`.worksheet-no-print-zone` and `.worksheet-print-blocked-notice` remain 100% intact).
 * - NEVER uses `window.open()` or `window.alert()` (iframe-safe).
 * - Escapes all dynamic text safely before constructing printable HTML.
 */

function escapeHtml(raw: unknown): string {
  return String(raw ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function printHtmlViaHiddenIframe(documentTitle: string, bodyHtml: string): void {
  if (typeof document === 'undefined') return;

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${escapeHtml(documentTitle)}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 15mm 14mm 16mm 14mm;
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
      font-size: 11pt;
      line-height: 1.55;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .header-box {
      border-bottom: 2px solid #0f172a;
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .brand-row {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      font-size: 9pt;
      color: #475569;
      margin-bottom: 4px;
    }
    .brand-name {
      font-weight: 800;
      color: #0f172a;
      letter-spacing: 0.02em;
    }
    .doc-title {
      font-size: 16pt;
      font-weight: 800;
      margin: 4px 0 4px 0;
      color: #0f172a;
    }
    .doc-meta {
      font-size: 9.5pt;
      color: #334155;
      margin: 0;
    }
    h2 {
      font-size: 12pt;
      font-weight: 800;
      color: #0f172a;
      margin: 16px 0 8px 0;
      padding-bottom: 4px;
      border-bottom: 1px solid #cbd5e1;
      page-break-after: avoid;
    }
    h3 {
      font-size: 10.5pt;
      font-weight: 700;
      color: #1e293b;
      margin: 10px 0 4px 0;
      page-break-after: avoid;
    }
    p {
      margin: 0 0 8px 0;
    }
    ul, ol {
      margin: 4px 0 10px 0;
      padding-left: 20px;
    }
    li {
      margin-bottom: 4px;
    }
    .card {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
      background: #f8fafc;
      page-break-inside: avoid;
    }
    .card-white {
      border: 1px solid #cbd5e1;
      border-radius: 8px;
      padding: 10px 12px;
      margin-bottom: 10px;
      background: #ffffff;
      page-break-inside: avoid;
    }
    .formula-block {
      font-family: 'Courier New', Courier, monospace;
      font-weight: 700;
      font-size: 10pt;
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      padding: 6px 10px;
      border-radius: 6px;
      margin-bottom: 6px;
    }
    .qa-meta {
      font-size: 8.5pt;
      font-weight: 700;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 3px;
    }
    .answer-box {
      margin-top: 6px;
      padding: 8px 10px;
      border: 1px solid #94a3b8;
      border-radius: 6px;
      background: #ffffff;
      white-space: pre-line;
      font-size: 10pt;
    }
    .tip-note {
      margin-top: 4px;
      font-size: 9pt;
      color: #334155;
      font-style: italic;
    }
    .footer-note {
      margin-top: 22px;
      padding-top: 8px;
      border-top: 1px solid #cbd5e1;
      font-size: 8.5pt;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  ${sanitizePrintableHtml(bodyHtml)}
  <div class="footer-note">
    <span>MyStudyZone Free Study Material Library (mystudyzone.in) — 100% Free Study Resource</span>
    <span>Printed for Personal Study &amp; Classroom Revision</span>
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
    }, 1200);
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

    // Wait briefly so layout & fonts paint cleanly before triggering print dialog
    setTimeout(() => {
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } finally {
        cleanup();
      }
    }, 250);
  } catch {
    cleanup();
  }
}

export function printChapterStudySheetA4(params: {
  mode: 'chapter_notes' | 'short_revision' | 'qa_bank';
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  chapter: ChapterStudyMaterial;
}): void {
  const { mode, board, classLevel, subject, chapter } = params;
  const modeLabel =
    mode === 'short_revision'
      ? '1-Page Short Revision Sheet'
      : mode === 'qa_bank'
      ? '9-Format Solved Q&A Bank'
      : 'Detailed Chapter Study Notes';

  const docTitle = `MyStudyZone - ${board} ${classLevel} ${subject} - Ch ${chapter.chapterNumber} ${modeLabel}`;

  let sectionsHtml = '';

  if (mode === 'chapter_notes') {
    const keyPointsHtml = chapter.keyPoints
      .map((pt) => `<li>${escapeHtml(pt)}</li>`)
      .join('');

    const defsHtml = (chapter.keyDefinitions || [])
      .map(
        (d) =>
          `<div class="card"><strong>${escapeHtml(d.term)}:</strong> ${escapeHtml(
            d.meaning
          )}</div>`
      )
      .join('');

    const formulasHtml = (chapter.formulasAndRules || [])
      .map((f) => `<div class="formula-block">${escapeHtml(f)}</div>`)
      .join('');

    const examplesHtml = (chapter.solvedExamples || [])
      .map(
        (ex, idx) => `
        <div class="card-white">
          <div class="qa-meta">Worked Example ${idx + 1}</div>
          <p><strong>Question:</strong> ${escapeHtml(ex.prompt)}</p>
          <div class="answer-box"><strong>Step-by-Step Solution:</strong>\n${escapeHtml(
            ex.solution
          )}</div>
        </div>`
      )
      .join('');

    sectionsHtml = `
      <h2>1. Chapter Overview</h2>
      <p>${escapeHtml(chapter.overview)}</p>

      <h2>2. Key Concepts &amp; Syllabus Points</h2>
      <ul>${keyPointsHtml}</ul>

      ${defsHtml ? `<h2>3. Important Definitions Glossary</h2>${defsHtml}` : ''}
      ${formulasHtml ? `<h2>4. Core Formulas, Rules &amp; Laws</h2>${formulasHtml}` : ''}
      ${examplesHtml ? `<h2>5. Solved Worked Examples</h2>${examplesHtml}` : ''}
    `;
  } else if (mode === 'short_revision') {
    const rev = chapter.shortRevisionNotes;
    const quickPtsHtml = (rev?.quickRevisionPoints || chapter.keyPoints)
      .map((line) => `<li>${escapeHtml(line)}</li>`)
      .join('');
    const factsHtml = (rev?.importantFacts || [])
      .map((t) => `<li>${escapeHtml(t)}</li>`)
      .join('');
    const quickFormulasHtml = (chapter.formulasAndRules || [])
      .map((f) => `<div class="formula-block">${escapeHtml(f)}</div>`)
      .join('');
    const tricksHtml = (rev?.memoryTricks || [])
      .map((tip) => `<li>${escapeHtml(tip)}</li>`)
      .join('');

    sectionsHtml = `
      <div class="card">
        <h3>1-Page Exam Focus Summary</h3>
        <p>${escapeHtml(rev?.onePageSummary || chapter.chapterSummary || chapter.overview)}</p>
      </div>

      <h2>Quick Revision Points</h2>
      <ul>${quickPtsHtml}</ul>

      ${factsHtml ? `<h2>Important Facts &amp; Key Terms</h2><ul>${factsHtml}</ul>` : ''}
      ${quickFormulasHtml ? `<h2>Key Formulas / Rules At-A-Glance</h2>${quickFormulasHtml}` : ''}
      ${tricksHtml ? `<h2>Memory Tricks &amp; Board Exam Tips</h2><ul>${tricksHtml}</ul>` : ''}
    `;
  } else {
    const qaHtml = (chapter.qaBank || [])
      .map(
        (item, idx) => `
        <div class="card-white">
          <div class="qa-meta">Q${idx + 1} &middot; ${escapeHtml(item.formatLabel)} &middot; ${escapeHtml(
          item.marks
        )} Mark${item.marks === 1 ? '' : 's'}</div>
          <p><strong>Question:</strong> ${escapeHtml(item.question)}</p>
          <div class="answer-box"><strong>Model Answer:</strong>\n${escapeHtml(
            item.answer
          )}</div>
          ${
            item.examTip
              ? `<div class="tip-note"><strong>Exam Tip:</strong> ${escapeHtml(
                  item.examTip
                )}</div>`
              : ''
          }
        </div>`
      )
      .join('');

    sectionsHtml = `
      <h2>Complete 9-Format Question &amp; Answer Bank (${(chapter.qaBank || []).length} Questions)</h2>
      ${qaHtml}
    `;
  }

  const headerHtml = `
    <div class="header-box">
      <div class="brand-row">
        <span class="brand-name">MyStudyZone — Free Study Material Library</span>
        <span>${escapeHtml(modeLabel)}</span>
      </div>
      <h1 class="doc-title">Chapter ${chapter.chapterNumber}: ${escapeHtml(
    chapter.chapterTitle
  )}</h1>
      <p class="doc-meta">
        <strong>Board:</strong> ${escapeHtml(board)} &nbsp;|&nbsp;
        <strong>Standard:</strong> ${escapeHtml(classLevel)} &nbsp;|&nbsp;
        <strong>Subject:</strong> ${escapeHtml(subject)} &nbsp;|&nbsp;
        <strong>Textbook Ref:</strong> ${escapeHtml(chapter.textbookRef)}
      </p>
    </div>
  `;

  printHtmlViaHiddenIframe(docTitle, `${headerHtml}${sectionsHtml}`);
}

export function printExamPaperA4(params: {
  paper: StudyLibraryExamPaper;
  includeSolutions: boolean;
}): void {
  const { paper, includeSolutions } = params;
  const docTitle = `MyStudyZone - ${paper.board} ${paper.classLevel} ${paper.subject} - ${paper.yearOrTerm}`;

  const instructionsHtml = paper.generalInstructions
    .map((inst) => `<li>${escapeHtml(inst)}</li>`)
    .join('');

  const sectionsHtml = paper.sections
    .map((sec) => {
      const qRows = sec.questions
        .map(
          (q) => `
          <div class="card-white">
            <p><strong>${escapeHtml(q.qNo)}</strong> ${escapeHtml(
            q.question
          )} <span style="float:right; font-weight:700; color:#475569;">[${escapeHtml(
            q.marks
          )}M]</span></p>
            ${
              includeSolutions
                ? `<div class="answer-box"><strong>Marking Scheme Solution:</strong>\n${escapeHtml(
                    q.modelAnswer
                  )}</div>`
                : ''
            }
          </div>`
        )
        .join('');

      return `
        <h2>${escapeHtml(sec.sectionTitle)} (${escapeHtml(sec.totalSectionMarks)} Marks)</h2>
        <p style="font-size:9.5pt; color:#475569; margin-bottom:8px;">${escapeHtml(
          sec.sectionInstructions
        )}</p>
        ${qRows}
      `;
    })
    .join('');

  const headerHtml = `
    <div class="header-box">
      <div class="brand-row">
        <span class="brand-name">MyStudyZone — ${escapeHtml(paper.boardPatternLabel)}</span>
        <span>${includeSolutions ? 'Question Paper + Marking Scheme' : 'Practice Question Paper'}</span>
      </div>
      <h1 class="doc-title">${escapeHtml(paper.title)}</h1>
      <p class="doc-meta">
        <strong>Board:</strong> ${escapeHtml(paper.board)} &nbsp;|&nbsp;
        <strong>Standard:</strong> ${escapeHtml(paper.classLevel)} &nbsp;|&nbsp;
        <strong>Subject:</strong> ${escapeHtml(paper.subject)} &nbsp;|&nbsp;
        <strong>Time:</strong> ${escapeHtml(paper.durationLabel)} &nbsp;|&nbsp;
        <strong>Max Marks:</strong> ${escapeHtml(paper.totalMarks)}
      </p>
    </div>
    <div class="card">
      <h3>General Instructions</h3>
      <ul>${instructionsHtml}</ul>
    </div>
  `;

  printHtmlViaHiddenIframe(docTitle, `${headerHtml}${sectionsHtml}`);
}
