import { jsPDF } from 'jspdf';

export type UniversalPaperSize =
  | 'A4'
  | 'A3'
  | 'Legal'
  | 'Letter'
  | 'A5'
  | 'a4'
  | 'a3'
  | 'legal'
  | 'letter'
  | 'a5';
export type CanonicalUniversalPaperSize = 'A4' | 'A3' | 'Legal' | 'Letter' | 'A5';
export type UniversalOrientation = 'portrait' | 'landscape';

export type UniversalMetaItem = string | { label: string; value: string };

export interface UniversalSummaryCard {
  label: string;
  value: string;
  note?: string;
  tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
}

export interface UniversalQaItem {
  numberLabel?: string;
  question?: string;
  questionText?: string;
  statusBadge?: string;
  answer?: string;
  answerText?: string;
  steps?: string[];
  explanation?: string;
  finalAnswer?: string;
  unreadableNote?: string;
}

export interface UniversalSectionBlock {
  heading?: string;
  body?: string;
  bullets?: string[];
  badge?: string;
  qaItems?: UniversalQaItem[];
}

export interface UniversalTableBlock {
  title?: string;
  caption?: string;
  headers?: string[];
  columns?: string[];
  rows: string[][];
  columnWidths?: number[];
}

export interface UniversalImageBlock {
  caption?: string;
  dataUrl: string;
  maxHeightMm?: number;
}

export interface UniversalSignatureBlock {
  label: string;
  role: string;
}

export type UniversalSignatureInput = UniversalSignatureBlock | string;

export interface UniversalPdfDocument {
  title: string;
  subtitle?: string;
  portalBadge?: string;
  headerTag?: string;
  metaItems?: UniversalMetaItem[];
  metaLines?: string[];
  summaryCards?: UniversalSummaryCard[];
  sections?: UniversalSectionBlock[];
  qaItems?: UniversalQaItem[];
  tables?: UniversalTableBlock[];
  images?: UniversalImageBlock[];
  signatures?: UniversalSignatureInput[];
  footerNote?: string;
  footerText?: string;
  filename?: string;
  paperSize?: UniversalPaperSize;
  orientation?: UniversalOrientation;
}

export interface UniversalPrintOptions {
  paperSize?: UniversalPaperSize;
  orientation?: UniversalOrientation;
  marginsMm?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  fontScale?: number;
  includeHeaderFooter?: boolean;
  includePageNumbers?: boolean;
}

export interface RenderedUniversalPage {
  pageNumber: number;
  dataUrl: string;
}

export interface UniversalPdfRenderResult {
  pages: RenderedUniversalPage[];
  totalPages: number;
  widthMm: number;
  heightMm: number;
  orientation: UniversalOrientation;
  paperSize: UniversalPaperSize;
  title: string;
}

export const UNIVERSAL_PAPER_MM: Record<
  CanonicalUniversalPaperSize,
  { width: number; height: number; label: string }
> = {
  A4: { width: 210, height: 297, label: 'A4 (210 × 297 mm)' },
  A3: { width: 297, height: 420, label: 'A3 (297 × 420 mm)' },
  Legal: { width: 215.9, height: 355.6, label: 'Legal (216 × 356 mm)' },
  Letter: { width: 215.9, height: 279.4, label: 'Letter (216 × 279 mm)' },
  A5: { width: 148, height: 210, label: 'A5 (148 × 210 mm)' },
};

const FONT_STACK =
  "'Plus Jakarta Sans', 'Noto Sans Devanagari', 'Segoe UI', Roboto, system-ui, sans-serif";
const MONO_FONT_STACK = "'JetBrains Mono', 'Courier New', monospace";

const PX_PER_MM = 6; // ~152.4 DPI crisp layout for both preview and PDF export
const PT_TO_MM = 0.352778;

const UNIVERSAL_PRINT_ROOT_ID = 'msz-universal-print-root';
const UNIVERSAL_PRINT_STYLE_ID = 'msz-universal-print-page-style';
const UNIVERSAL_PRINT_BODY_CLASS = 'msz-universal-printing';

export function normalizeUniversalPaperSize(raw?: UniversalPaperSize): CanonicalUniversalPaperSize {
  const lower = String(raw || 'A4').trim().toLowerCase();
  if (lower === 'a3') return 'A3';
  if (lower === 'legal') return 'Legal';
  if (lower === 'letter') return 'Letter';
  if (lower === 'a5') return 'A5';
  return 'A4';
}

function formatMetaItemText(item: UniversalMetaItem): string {
  if (typeof item === 'string') return item.trim();
  if (item && typeof item === 'object') {
    const lbl = String(item.label || '').trim();
    const val = String(item.value || '').trim();
    return lbl && val ? `${lbl}: ${val}` : lbl || val;
  }
  return '';
}

function normalizeSignatureBlock(sig: UniversalSignatureInput): UniversalSignatureBlock {
  if (typeof sig === 'string') {
    return { label: sig, role: 'Authorized Signatory' };
  }
  return {
    label: String(sig?.label || 'Authorized Signatory'),
    role: String(sig?.role || ''),
  };
}

export function getEffectiveUniversalPaperMm(
  paperSize: UniversalPaperSize = 'A4',
  orientation: UniversalOrientation = 'portrait'
): { widthMm: number; heightMm: number } {
  const canonical = normalizeUniversalPaperSize(paperSize);
  const base = UNIVERSAL_PAPER_MM[canonical] || UNIVERSAL_PAPER_MM.A4;
  return orientation === 'landscape'
    ? { widthMm: base.height, heightMm: base.width }
    : { widthMm: base.width, heightMm: base.height };
}

export function sanitizeSafeFilename(name: string, fallback: string = 'mystudyzone_document'): string {
  const cleaned = String(name || '')
    .trim()
    .replace(/[^a-zA-Z0-9_\-\s]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 72);
  return cleaned || fallback;
}

function escapeHtml(raw: unknown): string {
  return String(raw ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function ptToPx(pt: number, scale: number = 1): number {
  return pt * PT_TO_MM * PX_PER_MM * scale;
}

function mmToPx(mm: number): number {
  return mm * PX_PER_MM;
}

async function waitForFontsReady(): Promise<void> {
  if (typeof document === 'undefined' || !('fonts' in document)) return;
  try {
    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => setTimeout(resolve, 250)),
    ]);
  } catch {
    // Proceed cleanly even if fonts API throws
  }
}

function loadBrowserImage(dataUrl: string): Promise<HTMLImageElement | null> {
  if (typeof Image === 'undefined' || !dataUrl) return Promise.resolve(null);
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = dataUrl;
  });
}

function wrapCanvasText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidthPx: number
): string[] {
  const paragraphs = String(text ?? '').replace(/\r\n/g, '\n').split('\n');
  const lines: string[] = [];

  for (const para of paragraphs) {
    const trimmed = para.trimEnd();
    if (!trimmed) {
      lines.push('');
      continue;
    }

    const words = trimmed.split(/(\s+)/);
    let currentLine = '';

    for (const token of words) {
      if (!token) continue;
      const testLine = currentLine + token;
      if (ctx.measureText(testLine).width <= maxWidthPx) {
        currentLine = testLine;
        continue;
      }

      if (currentLine.trim().length > 0) {
        lines.push(currentLine.trimEnd());
        currentLine = token.trimStart();
        if (ctx.measureText(currentLine).width <= maxWidthPx) {
          continue;
        }
      }

      // Hard-wrap single ultra-long token (e.g., equation, URL, long code)
      let chunk = '';
      for (const ch of Array.from(currentLine || token)) {
        if (ctx.measureText(chunk + ch).width > maxWidthPx && chunk.length > 0) {
          lines.push(chunk);
          chunk = ch;
        } else {
          chunk += ch;
        }
      }
      currentLine = chunk;
    }

    if (currentLine.length > 0) {
      lines.push(currentLine.trimEnd());
    }
  }

  return lines.length > 0 ? lines : [''];
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + w - radius, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius);
  ctx.lineTo(x + w, y + h - radius);
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h);
  ctx.lineTo(x + radius, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

interface PageSurface {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  hasContent: boolean;
}

export async function renderUniversalPdfPages(
  documentPayload: UniversalPdfDocument,
  options: UniversalPrintOptions = {}
): Promise<UniversalPdfRenderResult> {
  const paperSize = normalizeUniversalPaperSize(options.paperSize || documentPayload.paperSize || 'A4');
  const orientation: UniversalOrientation = options.orientation || documentPayload.orientation || 'portrait';
  const { widthMm, heightMm } = getEffectiveUniversalPaperMm(paperSize, orientation);
  const fontScale = Math.min(Math.max(options.fontScale || 1, 0.8), 1.3);
  const includeHeaderFooter = options.includeHeaderFooter !== false;
  const includePageNumbers = options.includePageNumbers !== false;

  const marginLeftMm = options.marginsMm?.left ?? 13;
  const marginRightMm = options.marginsMm?.right ?? 13;
  const marginTopMm = options.marginsMm?.top ?? (includeHeaderFooter ? 17 : 12);
  const marginBottomMm = options.marginsMm?.bottom ?? (includeHeaderFooter ? 16 : 12);

  if (typeof document === 'undefined') {
    return {
      pages: [],
      totalPages: 1,
      widthMm,
      heightMm,
      orientation,
      paperSize,
      title: documentPayload.title,
    };
  }

  await waitForFontsReady();

  const pageWidthPx = Math.round(mmToPx(widthMm));
  const pageHeightPx = Math.round(mmToPx(heightMm));
  const marginLeftPx = mmToPx(marginLeftMm);
  const marginRightPx = mmToPx(marginRightMm);
  const contentTopPx = mmToPx(marginTopMm);
  const contentBottomPx = pageHeightPx - mmToPx(marginBottomMm);
  const contentWidthPx = pageWidthPx - marginLeftPx - marginRightPx;

  const pages: PageSurface[] = [];
  let cursorY = contentTopPx;

  const createPage = (): PageSurface => {
    const canvas = document.createElement('canvas');
    canvas.width = pageWidthPx;
    canvas.height = pageHeightPx;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Browser 2D canvas context unavailable for PDF generation.');
    }
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, pageWidthPx, pageHeightPx);
    const surface: PageSurface = { canvas, ctx, hasContent: false };
    pages.push(surface);
    cursorY = contentTopPx;
    return surface;
  };

  let currentPage = createPage();

  const ensureSpace = (neededPx: number): PageSurface => {
    if (cursorY + neededPx > contentBottomPx && currentPage.hasContent) {
      currentPage = createPage();
    }
    return currentPage;
  };

  const markContent = () => {
    currentPage.hasContent = true;
  };

  // --- 1. Document Header Card on Page 1 ---
  {
    const ctx = currentPage.ctx;
    const portalLabel = (documentPayload.portalBadge || documentPayload.headerTag || 'MYSTUDYZONE OFFICIAL').toUpperCase();

    ctx.font = `800 ${ptToPx(8.5, fontScale)}px ${FONT_STACK}`;
    const badgeW = Math.min(contentWidthPx, ctx.measureText(portalLabel).width + mmToPx(6));

    ctx.font = `800 ${ptToPx(15.5, fontScale)}px ${FONT_STACK}`;
    const titleLines = wrapCanvasText(ctx, documentPayload.title || 'MyStudyZone Document', contentWidthPx - mmToPx(8));

    ctx.font = `500 ${ptToPx(10, fontScale)}px ${FONT_STACK}`;
    const subLines = documentPayload.subtitle
      ? wrapCanvasText(ctx, documentPayload.subtitle, contentWidthPx - mmToPx(8))
      : [];

    const metaList = (documentPayload.metaItems || documentPayload.metaLines || [])
      .map(formatMetaItemText)
      .filter(Boolean);
    ctx.font = `600 ${ptToPx(8.5, fontScale)}px ${FONT_STACK}`;
    const metaLines = metaList.length > 0 ? wrapCanvasText(ctx, metaList.join('  •  '), contentWidthPx - mmToPx(8)) : [];

    const titleLineH = ptToPx(19, fontScale);
    const subLineH = ptToPx(13, fontScale);
    const metaLineH = ptToPx(11.5, fontScale);

    const cardH =
      mmToPx(10) +
      titleLines.length * titleLineH +
      (subLines.length > 0 ? subLines.length * subLineH + mmToPx(1.5) : 0) +
      (metaLines.length > 0 ? metaLines.length * metaLineH + mmToPx(2.5) : 0);

    drawRoundedRect(ctx, marginLeftPx, cursorY, contentWidthPx, cardH, mmToPx(3));
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#cbd5e1';
    ctx.stroke();

    // Left accent stripe
    drawRoundedRect(ctx, marginLeftPx, cursorY, mmToPx(2.2), cardH, mmToPx(1));
    ctx.fillStyle = '#0f296b';
    ctx.fill();

    let innerY = cursorY + mmToPx(4.2);
    const textX = marginLeftPx + mmToPx(5);

    // Portal Badge pill
    drawRoundedRect(ctx, textX, innerY, badgeW, mmToPx(5.2), mmToPx(1.5));
    ctx.fillStyle = '#e0e7ff';
    ctx.fill();
    ctx.fillStyle = '#1e3a8a';
    ctx.font = `800 ${ptToPx(8.2, fontScale)}px ${FONT_STACK}`;
    ctx.textBaseline = 'middle';
    ctx.fillText(portalLabel, textX + mmToPx(3), innerY + mmToPx(2.6));
    innerY += mmToPx(7.2);

    // Title
    ctx.fillStyle = '#0f172a';
    ctx.font = `800 ${ptToPx(15.5, fontScale)}px ${FONT_STACK}`;
    ctx.textBaseline = 'top';
    for (const line of titleLines) {
      ctx.fillText(line, textX, innerY);
      innerY += titleLineH;
    }

    if (subLines.length > 0) {
      innerY += mmToPx(1);
      ctx.fillStyle = '#334155';
      ctx.font = `600 ${ptToPx(10, fontScale)}px ${FONT_STACK}`;
      for (const line of subLines) {
        ctx.fillText(line, textX, innerY);
        innerY += subLineH;
      }
    }

    if (metaLines.length > 0) {
      innerY += mmToPx(2);
      ctx.fillStyle = '#475569';
      ctx.font = `600 ${ptToPx(8.5, fontScale)}px ${FONT_STACK}`;
      for (const line of metaLines) {
        ctx.fillText(line, textX, innerY);
        innerY += metaLineH;
      }
    }

    cursorY += cardH + mmToPx(5);
    markContent();
  }

  // --- 2. Optional KPI / Summary Cards ---
  if (documentPayload.summaryCards && documentPayload.summaryCards.length > 0) {
    const cards = documentPayload.summaryCards;
    const cols = Math.min(cards.length, orientation === 'landscape' ? 4 : 3);
    const gapPx = mmToPx(3);
    const cardW = (contentWidthPx - gapPx * (cols - 1)) / cols;
    const cardH = mmToPx(17.5);

    const toneStyles: Record<string, { bg: string; border: string; value: string }> = {
      indigo: { bg: '#eef2ff', border: '#c7d2fe', value: '#312e81' },
      emerald: { bg: '#ecfdf5', border: '#a7f3d0', value: '#065f46' },
      amber: { bg: '#fffbeb', border: '#fde68a', value: '#92400e' },
      rose: { bg: '#fff1f2', border: '#fecdd3', value: '#9f1239' },
      slate: { bg: '#f8fafc', border: '#cbd5e1', value: '#0f172a' },
    };

    for (let i = 0; i < cards.length; i += cols) {
      const rowCards = cards.slice(i, i + cols);
      ensureSpace(cardH + mmToPx(3));
      const ctx = currentPage.ctx;

      rowCards.forEach((card, cIdx) => {
        const x = marginLeftPx + cIdx * (cardW + gapPx);
        const st = toneStyles[card.tone || 'slate'] || toneStyles.slate;
        drawRoundedRect(ctx, x, cursorY, cardW, cardH, mmToPx(2.2));
        ctx.fillStyle = st.bg;
        ctx.fill();
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = st.border;
        ctx.stroke();

        ctx.textBaseline = 'top';
        ctx.fillStyle = '#475569';
        ctx.font = `700 ${ptToPx(7.8, fontScale)}px ${FONT_STACK}`;
        ctx.fillText(card.label.toUpperCase().slice(0, 32), x + mmToPx(3), cursorY + mmToPx(2.5), cardW - mmToPx(6));

        ctx.fillStyle = st.value;
        ctx.font = `800 ${ptToPx(12.5, fontScale)}px ${FONT_STACK}`;
        ctx.fillText(card.value.slice(0, 26), x + mmToPx(3), cursorY + mmToPx(6.8), cardW - mmToPx(6));

        if (card.note) {
          ctx.fillStyle = '#64748b';
          ctx.font = `500 ${ptToPx(7.4, fontScale)}px ${FONT_STACK}`;
          ctx.fillText(card.note.slice(0, 38), x + mmToPx(3), cursorY + mmToPx(12.6), cardW - mmToPx(6));
        }
      });

      cursorY += cardH + mmToPx(3);
      markContent();
    }
    cursorY += mmToPx(2);
  }

  // --- 3. Helper: Draw Section Heading (Never Orphaned) ---
  const drawSectionHeading = (heading: string, badge?: string) => {
    const ctx = currentPage.ctx;
    ctx.font = `800 ${ptToPx(12, fontScale)}px ${FONT_STACK}`;
    const headingLines = wrapCanvasText(ctx, heading, contentWidthPx - mmToPx(4));
    const lineH = ptToPx(15.5, fontScale);
    const minBlockH = headingLines.length * lineH + mmToPx(14);
    ensureSpace(minBlockH);
    const activeCtx = currentPage.ctx;

    activeCtx.fillStyle = '#0f296b';
    activeCtx.font = `800 ${ptToPx(12, fontScale)}px ${FONT_STACK}`;
    activeCtx.textBaseline = 'top';

    for (const line of headingLines) {
      activeCtx.fillText(line, marginLeftPx, cursorY);
      cursorY += lineH;
    }

    if (badge) {
      activeCtx.fillStyle = '#475569';
      activeCtx.font = `700 ${ptToPx(8, fontScale)}px ${FONT_STACK}`;
      activeCtx.fillText(badge, marginLeftPx, cursorY);
      cursorY += ptToPx(10, fontScale);
    }

    activeCtx.strokeStyle = '#cbd5e1';
    activeCtx.lineWidth = 1.2;
    activeCtx.beginPath();
    activeCtx.moveTo(marginLeftPx, cursorY + mmToPx(0.8));
    activeCtx.lineTo(marginLeftPx + contentWidthPx, cursorY + mmToPx(0.8));
    activeCtx.stroke();

    cursorY += mmToPx(3.5);
    markContent();
  };

  // --- 4. Helper: Draw Wrapped Paragraph Lines Across Page Breaks ---
  const drawFlowText = (
    text: string,
    opts: {
      fontPt?: number;
      weight?: '400' | '500' | '600' | '700' | '800';
      color?: string;
      indentMm?: number;
      mono?: boolean;
      extraSpaceAfterMm?: number;
    } = {}
  ) => {
    const fontPt = opts.fontPt ?? 10;
    const weight = opts.weight ?? '400';
    const color = opts.color ?? '#1e293b';
    const indentPx = mmToPx(opts.indentMm ?? 0);
    const lineH = ptToPx(fontPt * 1.44, fontScale);
    const fontSpec = `${weight} ${ptToPx(fontPt, fontScale)}px ${opts.mono ? MONO_FONT_STACK : FONT_STACK}`;

    const measureCtx = currentPage.ctx;
    measureCtx.font = fontSpec;
    const lines = wrapCanvasText(measureCtx, text, contentWidthPx - indentPx);

    for (const line of lines) {
      if (line === '') {
        if (cursorY + lineH * 0.55 <= contentBottomPx) {
          cursorY += lineH * 0.55;
        }
        continue;
      }
      ensureSpace(lineH);
      const ctx = currentPage.ctx;
      ctx.font = fontSpec;
      ctx.fillStyle = color;
      ctx.textBaseline = 'top';
      ctx.fillText(line, marginLeftPx + indentPx, cursorY);
      cursorY += lineH;
      markContent();
    }
    if (opts.extraSpaceAfterMm) {
      cursorY += mmToPx(opts.extraSpaceAfterMm);
    }
  };

  // --- 5. Text, Bullet & Embedded Q&A Sections ---
  const drawSingleQaCard = (qa: UniversalQaItem) => {
    const qText = qa.question || qa.questionText || '(No question text)';
    const aText = qa.answer || qa.answerText;
    const paddingMm = 4;
    const innerMaxW = contentWidthPx - mmToPx(paddingMm * 2);

    const measureCtx = currentPage.ctx;
    measureCtx.font = `700 ${ptToPx(10.2, fontScale)}px ${FONT_STACK}`;
    const qLines = wrapCanvasText(measureCtx, qText, innerMaxW);
    const qLineH = ptToPx(14.2, fontScale);
    const qHeaderH = mmToPx(8) + qLines.length * qLineH;

    ensureSpace(qHeaderH + mmToPx(14));

    const ctx = currentPage.ctx;
    drawRoundedRect(ctx, marginLeftPx, cursorY, contentWidthPx, qHeaderH, mmToPx(2.2));
    ctx.fillStyle = qa.unreadableNote ? '#fff1f2' : '#f1f5f9';
    ctx.fill();
    ctx.lineWidth = 1.2;
    ctx.strokeStyle = qa.unreadableNote ? '#fda4af' : '#cbd5e1';
    ctx.stroke();

    ctx.font = `800 ${ptToPx(8.5, fontScale)}px ${FONT_STACK}`;
    const numText = qa.numberLabel || 'Q';
    const numPillW = Math.max(mmToPx(10), ctx.measureText(numText).width + mmToPx(5));
    drawRoundedRect(ctx, marginLeftPx + mmToPx(3.5), cursorY + mmToPx(2), numPillW, mmToPx(4.8), mmToPx(1.3));
    ctx.fillStyle = '#0f296b';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.textBaseline = 'middle';
    ctx.fillText(numText, marginLeftPx + mmToPx(6), cursorY + mmToPx(4.4));

    if (qa.statusBadge) {
      ctx.font = `700 ${ptToPx(7.8, fontScale)}px ${FONT_STACK}`;
      ctx.fillStyle = qa.unreadableNote ? '#be123c' : '#065f46';
      ctx.fillText(
        qa.statusBadge.toUpperCase(),
        marginLeftPx + mmToPx(6) + numPillW,
        cursorY + mmToPx(4.4)
      );
    }

    let qY = cursorY + mmToPx(7.8);
    ctx.fillStyle = '#0f172a';
    ctx.font = `700 ${ptToPx(10.2, fontScale)}px ${FONT_STACK}`;
    ctx.textBaseline = 'top';
    for (const line of qLines) {
      ctx.fillText(line, marginLeftPx + mmToPx(4), qY);
      qY += qLineH;
    }

    cursorY += qHeaderH + mmToPx(2.5);
    markContent();

    if (qa.unreadableNote) {
      drawFlowText(`Unclear / Unreadable Notice: ${qa.unreadableNote}`, {
        fontPt: 9.4,
        weight: '700',
        color: '#be123c',
        indentMm: 3,
        extraSpaceAfterMm: 3,
      });
      return;
    }

    if (aText) {
      drawFlowText('Answer:', {
        fontPt: 9.5,
        weight: '800',
        color: '#0f296b',
        indentMm: 2,
        extraSpaceAfterMm: 0.6,
      });
      drawFlowText(aText, {
        fontPt: 9.8,
        weight: '500',
        color: '#0f172a',
        indentMm: 3,
        extraSpaceAfterMm: 2,
      });
    }

    if (qa.steps && qa.steps.length > 0) {
      drawFlowText('Step-by-Step Working:', {
        fontPt: 9.2,
        weight: '800',
        color: '#0369a1',
        indentMm: 2,
        extraSpaceAfterMm: 0.5,
      });
      qa.steps.forEach((step, idx) => {
        drawFlowText(`${idx + 1}. ${step}`, {
          fontPt: 9.4,
          weight: '400',
          color: '#1e293b',
          indentMm: 4.5,
          extraSpaceAfterMm: 0.8,
        });
      });
      cursorY += mmToPx(1.2);
    }

    if (qa.finalAnswer) {
      const mCtx = currentPage.ctx;
      mCtx.font = `800 ${ptToPx(9.8, fontScale)}px ${FONT_STACK}`;
      const fLines = wrapCanvasText(mCtx, `Final Answer: ${qa.finalAnswer}`, contentWidthPx - mmToPx(10));
      const fLineH = ptToPx(13.2, fontScale);
      const boxH = mmToPx(4) + fLines.length * fLineH;
      ensureSpace(boxH + mmToPx(2));

      const fCtx = currentPage.ctx;
      drawRoundedRect(fCtx, marginLeftPx + mmToPx(2), cursorY, contentWidthPx - mmToPx(4), boxH, mmToPx(1.8));
      fCtx.fillStyle = '#ecfdf5';
      fCtx.fill();
      fCtx.lineWidth = 1.2;
      fCtx.strokeStyle = '#6ee7b7';
      fCtx.stroke();

      let fY = cursorY + mmToPx(2.2);
      fCtx.fillStyle = '#065f46';
      fCtx.font = `800 ${ptToPx(9.8, fontScale)}px ${FONT_STACK}`;
      fCtx.textBaseline = 'top';
      for (const line of fLines) {
        fCtx.fillText(line, marginLeftPx + mmToPx(5), fY);
        fY += fLineH;
      }
      cursorY += boxH + mmToPx(2);
      markContent();
    }

    if (qa.explanation) {
      drawFlowText(`Explanation: ${qa.explanation}`, {
        fontPt: 9.2,
        weight: '500',
        color: '#334155',
        indentMm: 3,
        extraSpaceAfterMm: 2.5,
      });
    }

    // Subtle divider between Q&As
    ensureSpace(mmToPx(4));
    const dCtx = currentPage.ctx;
    dCtx.strokeStyle = '#e2e8f0';
    dCtx.lineWidth = 1;
    dCtx.beginPath();
    dCtx.moveTo(marginLeftPx, cursorY);
    dCtx.lineTo(marginLeftPx + contentWidthPx, cursorY);
    dCtx.stroke();
    cursorY += mmToPx(3.5);
  };

  for (const sec of documentPayload.sections || []) {
    if (sec.heading && sec.heading.trim()) {
      drawSectionHeading(sec.heading, sec.badge);
    }
    if (sec.body && sec.body.trim()) {
      drawFlowText(sec.body, { fontPt: 10, color: '#1e293b', extraSpaceAfterMm: 2 });
    }
    if (sec.bullets && sec.bullets.length > 0) {
      for (const bullet of sec.bullets) {
        const clean = String(bullet || '').trim();
        if (!clean) continue;
        drawFlowText(`•  ${clean}`, {
          fontPt: 9.8,
          color: '#1e293b',
          indentMm: 3,
          extraSpaceAfterMm: 1.2,
        });
      }
      cursorY += mmToPx(2);
    }
    if (sec.qaItems && sec.qaItems.length > 0) {
      for (const qa of sec.qaItems) {
        drawSingleQaCard(qa);
      }
    }
  }

  // --- 6. SnapSolve / Study Q&A Sequence Items ---
  for (const qa of documentPayload.qaItems || []) {
    drawSingleQaCard(qa);
  }

  // --- 7. Tables (with Automatic Repeating Table Header on Page Breaks) ---
  for (const tbl of documentPayload.tables || []) {
    const tblHeaders = tbl.headers || tbl.columns || [];
    if (tblHeaders.length === 0) continue;
    const tblTitle = tbl.title || tbl.caption;
    if (tblTitle) {
      drawSectionHeading(tblTitle);
    }

    const colCount = tblHeaders.length;
    const weights =
      tbl.columnWidths && tbl.columnWidths.length === colCount
        ? tbl.columnWidths
        : tblHeaders.map((h, colIdx) => {
            let maxLen = String(h).length;
            for (const row of tbl.rows.slice(0, 20)) {
              maxLen = Math.max(maxLen, String(row[colIdx] || '').length);
            }
            return Math.min(Math.max(maxLen, 8), 36);
          });
    const weightSum = weights.reduce((a, b) => a + b, 0) || colCount;
    const colWidthsPx = weights.map((w) => (w / weightSum) * contentWidthPx);

    const cellPadXPx = mmToPx(2.2);
    const cellPadYPx = mmToPx(1.8);
    const headerFont = `800 ${ptToPx(8.6, fontScale)}px ${FONT_STACK}`;
    const bodyFont = `500 ${ptToPx(8.4, fontScale)}px ${FONT_STACK}`;
    const rowLineH = ptToPx(11.6, fontScale);

    const computeRowLayout = (cells: string[], font: string) => {
      const mCtx = currentPage.ctx;
      mCtx.font = font;
      let maxLines = 1;
      const wrappedCells = tblHeaders.map((_, idx) => {
        const lines = wrapCanvasText(mCtx, String(cells[idx] ?? '—'), Math.max(mmToPx(8), colWidthsPx[idx] - cellPadXPx * 2));
        if (lines.length > maxLines) maxLines = lines.length;
        return lines;
      });
      const heightPx = cellPadYPx * 2 + maxLines * rowLineH;
      return { wrappedCells, heightPx };
    };

    const drawTableHeader = () => {
      const headerLayout = computeRowLayout(tblHeaders, headerFont);
      ensureSpace(headerLayout.heightPx + mmToPx(10));
      const ctx = currentPage.ctx;
      let x = marginLeftPx;
      ctx.fillStyle = '#0f296b';
      ctx.fillRect(marginLeftPx, cursorY, contentWidthPx, headerLayout.heightPx);
      ctx.textBaseline = 'top';
      ctx.font = headerFont;

      headerLayout.wrappedCells.forEach((lines, cIdx) => {
        ctx.strokeStyle = '#1e3a8a';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, cursorY, colWidthsPx[cIdx], headerLayout.heightPx);
        ctx.fillStyle = '#ffffff';
        let y = cursorY + cellPadYPx;
        for (const line of lines) {
          ctx.fillText(line, x + cellPadXPx, y);
          y += rowLineH;
        }
        x += colWidthsPx[cIdx];
      });
      cursorY += headerLayout.heightPx;
      markContent();
    };

    drawTableHeader();

    for (let rIdx = 0; rIdx < tbl.rows.length; rIdx++) {
      const row = tbl.rows[rIdx];
      const layout = computeRowLayout(row, bodyFont);

      if (cursorY + layout.heightPx > contentBottomPx) {
        currentPage = createPage();
        drawTableHeader();
      }

      const ctx = currentPage.ctx;
      const isAlt = rIdx % 2 === 1;
      ctx.fillStyle = isAlt ? '#f8fafc' : '#ffffff';
      ctx.fillRect(marginLeftPx, cursorY, contentWidthPx, layout.heightPx);

      let x = marginLeftPx;
      ctx.font = bodyFont;
      ctx.textBaseline = 'top';
      layout.wrappedCells.forEach((lines, cIdx) => {
        ctx.strokeStyle = '#cbd5e1';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, cursorY, colWidthsPx[cIdx], layout.heightPx);
        ctx.fillStyle = '#0f172a';
        let y = cursorY + cellPadYPx;
        for (const line of lines) {
          ctx.fillText(line, x + cellPadXPx, y);
          y += rowLineH;
        }
        x += colWidthsPx[cIdx];
      });

      cursorY += layout.heightPx;
      markContent();
    }

    cursorY += mmToPx(5);
  }

  // --- 8. Aspect-Preserved Images / Diagrams ---
  for (const imgBlock of documentPayload.images || []) {
    const imgEl = await loadBrowserImage(imgBlock.dataUrl);
    if (!imgEl || !imgEl.width || !imgEl.height) continue;

    const maxImgH = mmToPx(imgBlock.maxHeightMm || Math.min(115, heightMm - 70));
    const maxImgW = contentWidthPx - mmToPx(6);
    const scaleRatio = Math.min(maxImgW / imgEl.width, maxImgH / imgEl.height);
    const drawW = Math.max(mmToPx(20), imgEl.width * scaleRatio);
    const drawH = Math.max(mmToPx(20), imgEl.height * scaleRatio);
    const captionH = imgBlock.caption ? mmToPx(8) : 0;
    const totalBoxH = drawH + captionH + mmToPx(6);

    ensureSpace(totalBoxH);
    const ctx = currentPage.ctx;
    const imgX = marginLeftPx + (contentWidthPx - drawW) / 2;

    drawRoundedRect(ctx, marginLeftPx, cursorY, contentWidthPx, totalBoxH - mmToPx(2), mmToPx(2));
    ctx.fillStyle = '#f8fafc';
    ctx.fill();
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.2;
    ctx.stroke();

    ctx.drawImage(imgEl, imgX, cursorY + mmToPx(2.5), drawW, drawH);

    if (imgBlock.caption) {
      ctx.fillStyle = '#475569';
      ctx.font = `600 ${ptToPx(8.5, fontScale)}px ${FONT_STACK}`;
      ctx.textBaseline = 'top';
      ctx.textAlign = 'center';
      ctx.fillText(imgBlock.caption, marginLeftPx + contentWidthPx / 2, cursorY + drawH + mmToPx(4), contentWidthPx - mmToPx(8));
      ctx.textAlign = 'left';
    }

    cursorY += totalBoxH + mmToPx(2);
    markContent();
  }

  // --- 9. Signatures & Closing Note ---
  if (documentPayload.signatures && documentPayload.signatures.length > 0) {
    ensureSpace(mmToPx(24));
    const ctx = currentPage.ctx;
    const sigCount = documentPayload.signatures.length;
    const sigW = contentWidthPx / sigCount;
    cursorY += mmToPx(6);

    documentPayload.signatures.forEach((rawSig, idx) => {
      const sig = normalizeSignatureBlock(rawSig);
      const centerX = marginLeftPx + idx * sigW + sigW / 2;
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(centerX - mmToPx(22), cursorY + mmToPx(6));
      ctx.lineTo(centerX + mmToPx(22), cursorY + mmToPx(6));
      ctx.stroke();

      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillStyle = '#0f172a';
      ctx.font = `700 ${ptToPx(9, fontScale)}px ${FONT_STACK}`;
      ctx.fillText(sig.label, centerX, cursorY + mmToPx(7.5));

      ctx.fillStyle = '#64748b';
      ctx.font = `500 ${ptToPx(7.8, fontScale)}px ${FONT_STACK}`;
      ctx.fillText(sig.role, centerX, cursorY + mmToPx(12));
    });
    ctx.textAlign = 'left';
    cursorY += mmToPx(18);
    markContent();
  }

  const closingFooterNote = documentPayload.footerNote || documentPayload.footerText;
  if (closingFooterNote) {
    drawFlowText(closingFooterNote, {
      fontPt: 8.4,
      weight: '500',
      color: '#475569',
      extraSpaceAfterMm: 1,
    });
  }

  // --- 10. Prune empty trailing page if nothing drawn on it ---
  const nonEmptyPages = pages.filter((p, idx) => idx === 0 || p.hasContent);
  const totalPages = nonEmptyPages.length;

  // --- 11. Stamp consistent MyStudyZone Headers & Footers (Page X of Y) ---
  if (includeHeaderFooter || includePageNumbers) {
    nonEmptyPages.forEach((surface, idx) => {
      const ctx = surface.ctx;
      const pageNum = idx + 1;

      if (includeHeaderFooter) {
        const hdrY = mmToPx(6);
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#0f296b';
        ctx.font = `800 ${ptToPx(8.2, 1)}px ${FONT_STACK}`;
        ctx.textAlign = 'left';
        ctx.fillText('MyStudyZone · Learn • Practice • Excel', marginLeftPx, hdrY);

        ctx.fillStyle = '#64748b';
        ctx.font = `600 ${ptToPx(7.8, 1)}px ${FONT_STACK}`;
        ctx.textAlign = 'right';
        ctx.fillText(
          `${paperSize} ${orientation === 'landscape' ? 'Landscape' : 'Portrait'}`,
          pageWidthPx - marginRightPx,
          hdrY
        );

        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(marginLeftPx, mmToPx(11.5));
        ctx.lineTo(pageWidthPx - marginRightPx, mmToPx(11.5));
        ctx.stroke();
      }

      const ftrLineY = pageHeightPx - mmToPx(11);
      ctx.strokeStyle = '#e2e8f0';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(marginLeftPx, ftrLineY);
      ctx.lineTo(pageWidthPx - marginRightPx, ftrLineY);
      ctx.stroke();

      ctx.textBaseline = 'top';
      ctx.font = `600 ${ptToPx(7.8, 1)}px ${FONT_STACK}`;
      ctx.fillStyle = '#64748b';

      if (includeHeaderFooter) {
        ctx.textAlign = 'left';
        ctx.fillText('mystudyzone.in · Official Printable Document', marginLeftPx, ftrLineY + mmToPx(2.2));
      }

      if (includePageNumbers) {
        ctx.textAlign = 'right';
        ctx.fillStyle = '#334155';
        ctx.font = `700 ${ptToPx(8, 1)}px ${FONT_STACK}`;
        ctx.fillText(`Page ${pageNum} of ${totalPages}`, pageWidthPx - marginRightPx, ftrLineY + mmToPx(2.2));
      }

      ctx.textAlign = 'left';
    });
  }

  return {
    pages: nonEmptyPages.map((p, idx) => ({
      pageNumber: idx + 1,
      dataUrl: p.canvas.toDataURL('image/jpeg', 0.9),
    })),
    totalPages,
    widthMm,
    heightMm,
    orientation,
    paperSize,
    title: documentPayload.title,
  };
}

export async function generateUniversalPdfBytes(
  documentPayload: UniversalPdfDocument,
  options: UniversalPrintOptions = {}
): Promise<{
  uint8: Uint8Array;
  blob: Blob;
  totalPages: number;
  widthMm: number;
  heightMm: number;
  filename: string;
}> {
  const paperSize = normalizeUniversalPaperSize(options.paperSize || documentPayload.paperSize || 'A4');
  const orientation: UniversalOrientation = options.orientation || documentPayload.orientation || 'portrait';
  const { widthMm, heightMm } = getEffectiveUniversalPaperMm(paperSize, orientation);
  const safeBase = sanitizeSafeFilename(documentPayload.filename || documentPayload.title, 'mystudyzone_document');
  const filename = `${safeBase}.pdf`;

  const doc = new jsPDF({
    orientation,
    unit: 'mm',
    format: [widthMm, heightMm],
    compress: true,
  });

  if (typeof document !== 'undefined') {
    const rendered = await renderUniversalPdfPages(documentPayload, options);
    rendered.pages.forEach((p, idx) => {
      if (idx > 0) {
        doc.addPage([widthMm, heightMm], orientation);
      }
      doc.addImage(p.dataUrl, 'JPEG', 0, 0, widthMm, heightMm, undefined, 'FAST');
    });

    const arrayBuffer = doc.output('arraybuffer');
    const uint8 = new Uint8Array(arrayBuffer);
    const blob = new Blob([uint8], { type: 'application/pdf' });
    return {
      uint8,
      blob,
      totalPages: rendered.totalPages,
      widthMm,
      heightMm,
      filename,
    };
  }

  // Headless Node fallback when browser Canvas is unavailable (still produces valid PDF dimensions)
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(String(documentPayload.title || 'MyStudyZone Document'), 14, 18);
  if (documentPayload.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(String(documentPayload.subtitle), 14, 25);
  }
  let y = 34;
  for (const sec of documentPayload.sections || []) {
    if (y > heightMm - 22) {
      doc.addPage([widthMm, heightMm], orientation);
      y = 18;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(String(sec.heading || ''), 14, y);
    y += 6;
    if (sec.body) {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      const wrapped = doc.splitTextToSize(String(sec.body), widthMm - 28);
      for (const line of wrapped) {
        if (y > heightMm - 18) {
          doc.addPage([widthMm, heightMm], orientation);
          y = 18;
        }
        doc.text(line, 14, y);
        y += 4.8;
      }
    }
    y += 4;
  }

  const arrayBuffer = doc.output('arraybuffer');
  const uint8 = new Uint8Array(arrayBuffer);
  return {
    uint8,
    blob: new Blob([uint8], { type: 'application/pdf' }),
    totalPages: doc.getNumberOfPages(),
    widthMm,
    heightMm,
    filename,
  };
}

export async function downloadUniversalPdf(
  documentPayload: UniversalPdfDocument,
  options: UniversalPrintOptions = {}
): Promise<{ totalPages: number; filename: string; widthMm: number; heightMm: number }> {
  const result = await generateUniversalPdfBytes(documentPayload, options);
  if (typeof document !== 'undefined') {
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      try {
        URL.revokeObjectURL(url);
        a.remove();
      } catch {
        // ignore cleanup error
      }
    }, 1500);
  }
  return {
    totalPages: result.totalPages,
    filename: result.filename,
    widthMm: result.widthMm,
    heightMm: result.heightMm,
  };
}

function renderQaItemsHtmlList(items: UniversalQaItem[]): string {
  return items
    .map((qa) => {
      const qText = qa.question || qa.questionText || '';
      const aText = qa.answer || qa.answerText || '';
      return `
      <article class="msz-up-qa">
        <div class="msz-up-qa-qbox">
          <div class="msz-up-qa-top">
            <span class="msz-up-qnum">${escapeHtml(qa.numberLabel || 'Q')}</span>
            ${qa.statusBadge ? `<span class="msz-up-qstatus">${escapeHtml(qa.statusBadge)}</span>` : ''}
          </div>
          <div class="msz-up-qtext">${escapeHtml(qText).replace(/\n/g, '<br/>')}</div>
        </div>
        ${
          qa.unreadableNote
            ? `<div class="msz-up-unreadable">Unclear / Unreadable: ${escapeHtml(qa.unreadableNote)}</div>`
            : `
              ${aText ? `<div class="msz-up-ans"><strong>Answer:</strong><br/>${escapeHtml(aText).replace(/\n/g, '<br/>')}</div>` : ''}
              ${
                qa.steps && qa.steps.length > 0
                  ? `<div class="msz-up-steps"><strong>Step-by-Step Working:</strong><ol>${qa.steps
                      .map((s) => `<li>${escapeHtml(s)}</li>`)
                      .join('')}</ol></div>`
                  : ''
              }
              ${qa.finalAnswer ? `<div class="msz-up-final"><strong>Final Answer:</strong> ${escapeHtml(qa.finalAnswer)}</div>` : ''}
              ${qa.explanation ? `<div class="msz-up-expl"><strong>Explanation:</strong> ${escapeHtml(qa.explanation).replace(/\n/g, '<br/>')}</div>` : ''}
            `
        }
      </article>`;
    })
    .join('');
}

function buildUniversalPrintHtml(documentPayload: UniversalPdfDocument): string {
  const normalizedMetas = (documentPayload.metaItems || documentPayload.metaLines || [])
    .map(formatMetaItemText)
    .filter(Boolean);
  const metaHtml =
    normalizedMetas.length > 0
      ? `<div class="msz-up-meta">${normalizedMetas.map((m) => `<span>${escapeHtml(m)}</span>`).join('')}</div>`
      : '';

  const summaryHtml =
    documentPayload.summaryCards && documentPayload.summaryCards.length > 0
      ? `<div class="msz-up-kpi-grid">${documentPayload.summaryCards
          .map(
            (c) => `
          <div class="msz-up-kpi">
            <div class="msz-up-kpi-label">${escapeHtml(c.label)}</div>
            <div class="msz-up-kpi-val">${escapeHtml(c.value)}</div>
            ${c.note ? `<div class="msz-up-kpi-note">${escapeHtml(c.note)}</div>` : ''}
          </div>`
          )
          .join('')}</div>`
      : '';

  const sectionsHtml = (documentPayload.sections || [])
    .map(
      (sec) => `
      <section class="msz-up-section">
        ${sec.heading ? `<h2>${escapeHtml(sec.heading)}${sec.badge ? ` <small>${escapeHtml(sec.badge)}</small>` : ''}</h2>` : ''}
        ${sec.body ? `<div class="msz-up-body">${escapeHtml(sec.body).replace(/\n/g, '<br/>')}</div>` : ''}
        ${
          sec.bullets && sec.bullets.length > 0
            ? `<ul>${sec.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul>`
            : ''
        }
        ${sec.qaItems && sec.qaItems.length > 0 ? renderQaItemsHtmlList(sec.qaItems) : ''}
      </section>`
    )
    .join('');

  const qaHtml = renderQaItemsHtmlList(documentPayload.qaItems || []);

  const tablesHtml = (documentPayload.tables || [])
    .map((tbl) => {
      const tblHeaders = tbl.headers || tbl.columns || [];
      if (tblHeaders.length === 0) return '';
      const tblTitle = tbl.title || tbl.caption;
      return `
      <section class="msz-up-table-wrap">
        ${tblTitle ? `<h2>${escapeHtml(tblTitle)}</h2>` : ''}
        <table class="msz-up-table">
          <thead>
            <tr>${tblHeaders.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${tbl.rows
              .map(
                (row) => `<tr>${tblHeaders.map((_, idx) => `<td>${escapeHtml(row[idx] ?? '—')}</td>`).join('')}</tr>`
              )
              .join('')}
          </tbody>
        </table>
      </section>`;
    })
    .join('');

  const imagesHtml = (documentPayload.images || [])
    .map(
      (img) => `
      <figure class="msz-up-fig">
        <img src="${escapeHtml(img.dataUrl)}" alt="${escapeHtml(img.caption || 'Document Figure')}" />
        ${img.caption ? `<figcaption>${escapeHtml(img.caption)}</figcaption>` : ''}
      </figure>`
    )
    .join('');

  const sigsHtml =
    documentPayload.signatures && documentPayload.signatures.length > 0
      ? `<div class="msz-up-sigs">${documentPayload.signatures
          .map((rawSig) => {
            const s = normalizeSignatureBlock(rawSig);
            return `
          <div class="msz-up-sig">
            <div class="msz-up-sig-line"></div>
            <div class="msz-up-sig-name">${escapeHtml(s.label)}</div>
            <div class="msz-up-sig-role">${escapeHtml(s.role)}</div>
          </div>`;
          })
          .join('')}</div>`
      : '';

  const closingFooterNote = documentPayload.footerNote || documentPayload.footerText;

  return `
    <div class="msz-up-running-header">
      <span>MyStudyZone &middot; Learn &bull; Practice &bull; Excel</span>
      <span>${escapeHtml(documentPayload.portalBadge || documentPayload.headerTag || 'OFFICIAL STUDY DOCUMENT')}</span>
    </div>
    <header class="msz-up-doc-header">
      <h1>${escapeHtml(documentPayload.title)}</h1>
      ${documentPayload.subtitle ? `<p class="msz-up-sub">${escapeHtml(documentPayload.subtitle)}</p>` : ''}
      ${metaHtml}
    </header>
    ${summaryHtml}
    ${sectionsHtml}
    ${qaHtml}
    ${tablesHtml}
    ${imagesHtml}
    ${sigsHtml}
    ${closingFooterNote ? `<p class="msz-up-fnote">${escapeHtml(closingFooterNote)}</p>` : ''}
    <div class="msz-up-running-footer">
      <span>mystudyzone.in &middot; Verified Academic Export</span>
      <span>MyStudyZone</span>
    </div>
  `;
}

function removeUniversalPrintArtifacts(): void {
  if (typeof document === 'undefined') return;
  try {
    document.body?.classList?.remove(UNIVERSAL_PRINT_BODY_CLASS);
    document.documentElement?.classList?.remove(UNIVERSAL_PRINT_BODY_CLASS);
    document.getElementById(UNIVERSAL_PRINT_ROOT_ID)?.remove();
    document.getElementById(UNIVERSAL_PRINT_STYLE_ID)?.remove();
  } catch {
    // ignore cleanup failures
  }
}

export function printUniversalDocument(
  documentPayload: UniversalPdfDocument,
  options: UniversalPrintOptions = {}
): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const paperSize = normalizeUniversalPaperSize(options.paperSize || documentPayload.paperSize || 'A4');
  const orientation: UniversalOrientation = options.orientation || documentPayload.orientation || 'portrait';
  const { widthMm, heightMm } = getEffectiveUniversalPaperMm(paperSize, orientation);

  removeUniversalPrintArtifacts();

  const pageCss = `
    @page {
      size: ${paperSize} ${orientation};
      margin: 13mm 12mm 14mm 12mm;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} {
      font-family: ${FONT_STACK};
      color: #0f172a;
      font-size: 10pt;
      line-height: 1.5;
      max-width: ${widthMm - 24}mm;
      margin: 0 auto;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-running-header {
      display: flex;
      justify-content: space-between;
      font-size: 8.5pt;
      font-weight: 700;
      color: #1e3a8a;
      border-bottom: 1.5px solid #e2e8f0;
      padding-bottom: 4px;
      margin-bottom: 10px;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-doc-header {
      background: #f8fafc;
      border: 1px solid #cbd5e1;
      border-left: 4px solid #0f296b;
      border-radius: 6px;
      padding: 10px 12px;
      margin-bottom: 12px;
      break-inside: avoid;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} h1 {
      font-size: 15pt;
      font-weight: 800;
      margin: 0 0 4px 0;
      color: #0f172a;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-sub {
      margin: 0 0 6px 0;
      font-size: 10pt;
      font-weight: 600;
      color: #334155;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      font-size: 8.5pt;
      color: #475569;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
      gap: 8px;
      margin-bottom: 12px;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-kpi {
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      background: #f8fafc;
      break-inside: avoid;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-kpi-label { font-size: 7.5pt; font-weight: 700; color: #475569; text-transform: uppercase; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-kpi-val { font-size: 12pt; font-weight: 800; color: #0f296b; margin: 2px 0; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-kpi-note { font-size: 7.5pt; color: #64748b; }
    #${UNIVERSAL_PRINT_ROOT_ID} h2 {
      font-size: 11.5pt;
      font-weight: 800;
      color: #0f296b;
      border-bottom: 1px solid #cbd5e1;
      padding-bottom: 3px;
      margin: 14px 0 6px 0;
      break-after: avoid;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} h2 small { font-size: 8.5pt; color: #475569; font-weight: 600; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-body { margin-bottom: 8px; white-space: normal; word-break: break-word; }
    #${UNIVERSAL_PRINT_ROOT_ID} ul { margin: 4px 0 10px 18px; padding: 0; }
    #${UNIVERSAL_PRINT_ROOT_ID} li { margin-bottom: 3px; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-qa { margin-bottom: 12px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-qa-qbox {
      background: #f1f5f9;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      padding: 8px 10px;
      margin-bottom: 6px;
      break-inside: avoid;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-qa-top { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-qnum {
      display: inline-block; background: #0f296b; color: #ffffff;
      font-size: 8pt; font-weight: 800; padding: 1px 7px; border-radius: 4px;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-qstatus { font-size: 7.5pt; font-weight: 700; color: #065f46; text-transform: uppercase; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-qtext { font-weight: 700; color: #0f172a; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-ans { margin: 5px 0; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-steps ol { margin: 4px 0 6px 18px; padding: 0; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-final {
      background: #ecfdf5; border: 1px solid #6ee7b7; border-radius: 5px;
      padding: 5px 9px; color: #065f46; margin: 5px 0; break-inside: avoid;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-unreadable {
      background: #fff1f2; border: 1px solid #fda4af; border-radius: 5px;
      padding: 6px 9px; color: #be123c; font-weight: 700;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-expl { font-size: 9.2pt; color: #334155; margin-top: 4px; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-table {
      width: 100%; border-collapse: collapse; margin: 8px 0 12px 0; font-size: 8.8pt;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-table thead { display: table-header-group; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-table th {
      background: #0f296b; color: #ffffff; text-align: left;
      padding: 6px 7px; border: 1px solid #1e3a8a; font-weight: 700;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-table td {
      padding: 5px 7px; border: 1px solid #cbd5e1; vertical-align: top; word-break: break-word;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-table tbody tr:nth-child(even) { background: #f8fafc; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-table tr { break-inside: avoid; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-fig {
      margin: 10px 0; text-align: center; break-inside: avoid;
      border: 1px solid #cbd5e1; border-radius: 6px; padding: 8px; background: #f8fafc;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-fig img {
      max-width: 100%; max-height: ${Math.min(120, heightMm - 70)}mm; object-fit: contain; height: auto;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-fig figcaption { font-size: 8.5pt; color: #475569; margin-top: 4px; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-sigs {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 20px; margin-top: 22px; break-inside: avoid; text-align: center;
    }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-sig-line { border-top: 1px solid #94a3b8; margin: 18px 16px 6px 16px; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-sig-name { font-weight: 700; font-size: 9pt; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-sig-role { font-size: 8pt; color: #64748b; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-fnote { font-size: 8.5pt; color: #475569; margin-top: 10px; }
    #${UNIVERSAL_PRINT_ROOT_ID} .msz-up-running-footer {
      display: flex; justify-content: space-between; font-size: 8pt; color: #64748b;
      border-top: 1px solid #e2e8f0; padding-top: 5px; margin-top: 14px;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.id = UNIVERSAL_PRINT_STYLE_ID;
  styleEl.textContent = pageCss;
  document.head.appendChild(styleEl);

  const root = document.createElement('div');
  root.id = UNIVERSAL_PRINT_ROOT_ID;
  root.setAttribute('aria-hidden', 'true');
  root.innerHTML = buildUniversalPrintHtml(documentPayload);
  document.body.appendChild(root);

  document.documentElement.classList.add(UNIVERSAL_PRINT_BODY_CLASS);
  document.body.classList.add(UNIVERSAL_PRINT_BODY_CLASS);

  const onAfterPrint = () => {
    window.removeEventListener('afterprint', onAfterPrint);
    setTimeout(removeUniversalPrintArtifacts, 250);
  };
  window.addEventListener('afterprint', onAfterPrint);

  setTimeout(() => {
    try {
      window.print();
    } finally {
      setTimeout(removeUniversalPrintArtifacts, 60000);
    }
  }, 140);
}
