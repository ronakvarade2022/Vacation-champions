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
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" />
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
      font-family: 'Plus Jakarta Sans', 'Noto Sans Devanagari', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 11pt;
      line-height: 1.55;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    thead {
      display: table-header-group;
    }
    tr, img {
      break-inside: avoid;
      page-break-inside: avoid;
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
  mode:
    | 'chapter_notes'
    | 'short_revision'
    | 'qa_bank'
    | 'textbook_solutions'
    | 'class_notebook'
    | 'word_meanings'
    | 'practice_questions';
  board: EducationBoard;
  classLevel: ClassLevel;
  subject: SubjectName;
  chapter: ChapterStudyMaterial;
  includeNotebookAnswerKey?: boolean;
}): void {
  const { mode, board, classLevel, subject, chapter, includeNotebookAnswerKey = true } = params;
  const modeLabel =
    mode === 'short_revision'
      ? '1-Page Short Revision Sheet'
      : mode === 'qa_bank'
      ? 'Important Questions & Answers (9 Formats)'
      : mode === 'textbook_solutions'
      ? 'Complete Textbook Exercise Solutions'
      : mode === 'class_notebook'
      ? includeNotebookAnswerKey
        ? 'Complete Your Class Notes (With Reference Answer Key)'
        : 'Complete Your Class Notes (Notebook Exercise Sheet)'
      : mode === 'word_meanings'
      ? 'Word Meanings, Definitions & Terminology Glossary'
      : mode === 'practice_questions'
      ? 'Additional Practice Questions & Solutions'
      : 'Detailed Chapter Study Notes';

  const docTitle = `MyStudyZone - ${board} ${classLevel} ${subject} - Ch ${chapter.chapterNumber} ${modeLabel}`;

  let sectionsHtml = '';

  if (mode === 'chapter_notes') {
    const detailedHtml = (chapter.detailedExplanation || [])
      .map((para) => `<p>${escapeHtml(para)}</p>`)
      .join('');

    const topicsHtml = (chapter.topicWiseExplanations || [])
      .map(
        (t) => `
        <div class="card">
          <h3>${escapeHtml(t.topicTitle)}</h3>
          <p>${escapeHtml(t.explanation)}</p>
          <div class="tip-note"><strong>Key Takeaway:</strong> ${escapeHtml(t.keyTakeaway)}</div>
        </div>`
      )
      .join('');

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

    const wordsHtml = (chapter.difficultWordsAndMeanings || [])
      .map(
        (w) =>
          `<div class="card"><strong>${escapeHtml(w.word)}:</strong> ${escapeHtml(
            w.meaning
          )} <div class="tip-note">Usage: ${escapeHtml(w.usageExample)}</div></div>`
      )
      .join('');

    const formulasHtml = (chapter.formulasAndRules || [])
      .map((f) => `<div class="formula-block">${escapeHtml(f)}</div>`)
      .join('');

    const diagramsHtml = (chapter.diagramsAndVisuals || [])
      .map(
        (dg) => `
        <div class="card-white">
          <div class="qa-meta">${escapeHtml(dg.category.toUpperCase())} GUIDE</div>
          <h3>${escapeHtml(dg.title)}</h3>
          <p>${escapeHtml(dg.description)}</p>
          <p><strong>Key Labels:</strong> ${dg.labels.map(escapeHtml).join(' &bull; ')}</p>
          <div class="tip-note"><strong>Drawing / Map Tip:</strong> ${escapeHtml(
            dg.drawingOrMapTip
          )}</div>
        </div>`
      )
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
      <h2>A. Chapter Introduction &amp; Overview</h2>
      <p>${escapeHtml(chapter.overview)}</p>

      ${detailedHtml ? `<h2>B. Complete Chapter Explanation</h2>${detailedHtml}` : ''}
      ${
        chapter.chapterSummary
          ? `<h2>C. Chapter Summary</h2><div class="card"><p>${escapeHtml(
              chapter.chapterSummary
            )}</p></div>`
          : ''
      }
      ${topicsHtml ? `<h2>D. Topic-Wise Explanations</h2>${topicsHtml}` : ''}

      <h2>E &amp; F. Important Concepts &amp; Syllabus Facts</h2>
      <ul>${keyPointsHtml}</ul>

      ${defsHtml ? `<h2>G. Key Definitions</h2>${defsHtml}` : ''}
      ${examplesHtml ? `<h2>H. Solved Examples</h2>${examplesHtml}` : ''}
      ${wordsHtml ? `<h2>I. Difficult Words &amp; Meanings</h2>${wordsHtml}` : ''}
      ${formulasHtml ? `<h2>J. Important Formulas, Rules &amp; Laws</h2>${formulasHtml}` : ''}
      ${diagramsHtml ? `<h2>K. Diagrams, Maps &amp; Illustrations Guide</h2>${diagramsHtml}` : ''}
    `;
  } else if (mode === 'textbook_solutions') {
    const tbHtml = (chapter.textbookExerciseSolutions || [])
      .map(
        (sol) => `
        <div class="card-white">
          <div class="qa-meta">${escapeHtml(sol.qNo)} &middot; ${escapeHtml(
          sol.typeLabel
        )} &middot; ${escapeHtml(sol.marks)} Mark${sol.marks === 1 ? '' : 's'}</div>
          <p><strong>Textbook Question:</strong>\n${escapeHtml(sol.question)}</p>
          <div class="answer-box"><strong>Complete Answer:</strong>\n${escapeHtml(
            sol.answer
          )}</div>
          <div class="tip-note"><strong>Step-by-Step Explanation:</strong> ${escapeHtml(
            sol.stepByStepExplanation
          )}</div>
        </div>`
      )
      .join('');

    sectionsHtml = `
      <h2>Complete Textbook Exercise Solutions (${
        (chapter.textbookExerciseSolutions || []).length
      } Questions)</h2>
      ${tbHtml}
    `;
  } else if (mode === 'class_notebook') {
    const nbHtml = (chapter.classNotebookExercises || [])
      .map(
        (ex) => `
        <div class="card-white">
          <div class="qa-meta">${escapeHtml(ex.qNo)} &middot; ${escapeHtml(
          ex.typeLabel
        )} &middot; ${escapeHtml(ex.marks)} Marks</div>
          <p><strong>Exercise to Write in Class Notebook:</strong>\n${escapeHtml(ex.prompt)}</p>
          <div class="tip-note"><strong>Notebook Writing Tip:</strong> ${escapeHtml(
            ex.writingGuidance
          )}</div>
          ${
            includeNotebookAnswerKey
              ? `<div class="answer-box"><strong>Reference Answer Key:</strong>\n${escapeHtml(
                  ex.modelAnswer
                )}${
                  ex.stepByStepExplanation
                    ? `\nNote: ${escapeHtml(ex.stepByStepExplanation)}`
                    : ''
                }</div>`
              : ''
          }
        </div>`
      )
      .join('');

    sectionsHtml = `
      <h2>Complete Your Class Notes — Written School Notebook Exercises (${
        (chapter.classNotebookExercises || []).length
      } Exercises)</h2>
      ${nbHtml}
    `;
  } else if (mode === 'word_meanings') {
    const wordsHtml = (chapter.difficultWordsAndMeanings || [])
      .map(
        (w) => `
        <div class="card-white">
          <h3>${escapeHtml(w.word)}</h3>
          <p><strong>Meaning:</strong> ${escapeHtml(w.meaning)}</p>
          <div class="tip-note"><strong>Sentence Usage:</strong> ${escapeHtml(
            w.usageExample
          )}</div>
        </div>`
      )
      .join('');

    const defsHtml = (chapter.keyDefinitions || [])
      .map(
        (d) => `
        <div class="card">
          <h3>${escapeHtml(d.term)}</h3>
          <p>${escapeHtml(d.meaning)}</p>
        </div>`
      )
      .join('');

    sectionsHtml = `
      <h2>Difficult Words &amp; Contextual Meanings</h2>
      ${wordsHtml}
      <h2>Chapter Definitions &amp; Technical Terminology</h2>
      ${defsHtml}
    `;
  } else if (mode === 'practice_questions') {
    const pracHtml = (chapter.additionalPracticeQuestions || [])
      .map(
        (item, idx) => `
        <div class="card-white">
          <div class="qa-meta">Practice Q${idx + 1} &middot; ${escapeHtml(
          item.formatLabel
        )} &middot; ${escapeHtml(item.marks)} Marks</div>
          <p><strong>Question:</strong> ${escapeHtml(item.question)}</p>
          <div class="answer-box"><strong>Model Solution:</strong>\n${escapeHtml(
            item.answer
          )}</div>
          ${
            item.examTip
              ? `<div class="tip-note"><strong>Tip:</strong> ${escapeHtml(item.examTip)}</div>`
              : ''
          }
        </div>`
      )
      .join('');

    sectionsHtml = `
      <h2>Additional Practice Questions &amp; Model Answers</h2>
      ${pracHtml}
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
