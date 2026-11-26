import { jsPDF } from 'jspdf';

export interface PdfSectionBlock {
  heading?: string;
  body: string;
}

export interface PdfDocumentExportOptions {
  title: string;
  subtitle?: string;
  metaLines?: string[];
  sections: PdfSectionBlock[];
  filename?: string;
}

export interface PresentationSlideExportItem {
  slideNumber?: number;
  title: string;
  bullets: string[];
  speakerNotes?: string;
}

export interface ResumePdfExportData {
  fullName: string;
  headline: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: { role: string; org: string; duration: string; highlights: string[] }[];
  education: { degree: string; institution: string; year: string }[];
  skills: string[];
  filename?: string;
}

export type PrintPaperSize = 'A4' | 'A3' | 'A5' | 'Letter' | 'Legal' | 'Custom';
export type PrintOrientation = 'portrait' | 'landscape';
export type PrintScaleMode = 'fit-page' | 'fit-width' | 'fit-height' | 'actual' | 'custom';

export interface PrintMarginsMm {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface PrintSettingsConfig {
  paperSize: PrintPaperSize;
  customWidthMm: number;
  customHeightMm: number;
  orientation: PrintOrientation;
  scaleMode: PrintScaleMode;
  customScalePct: number;
  marginsMm: PrintMarginsMm;
  trimWhitespace: boolean;
  centerContent: boolean;
  showPageNumbers: boolean;
  headerText: string;
  footerText: string;
}

export const PAPER_DIMENSIONS_MM: Record<Exclude<PrintPaperSize, 'Custom'>, { w: number; h: number; label: string }> = {
  A4: { w: 210, h: 297, label: 'A4 (210 × 297 mm)' },
  A3: { w: 297, h: 420, label: 'A3 (297 × 420 mm)' },
  A5: { w: 148, h: 210, label: 'A5 (148 × 210 mm)' },
  Letter: { w: 215.9, h: 279.4, label: 'Letter (8.5 × 11 in)' },
  Legal: { w: 215.9, h: 355.6, label: 'Legal (8.5 × 14 in)' },
};

export const DEFAULT_PRINT_SETTINGS: PrintSettingsConfig = {
  paperSize: 'A4',
  customWidthMm: 210,
  customHeightMm: 297,
  orientation: 'portrait',
  scaleMode: 'fit-width',
  customScalePct: 100,
  marginsMm: { top: 14, right: 14, bottom: 14, left: 14 },
  trimWhitespace: true,
  centerContent: false,
  showPageNumbers: true,
  headerText: 'MYSTUDYZONE • EDUCATION & PRODUCTIVITY STUDIO',
  footerText: 'mystudyzone.in',
};

export function getEffectivePaperDimensionsMm(cfg: PrintSettingsConfig): { widthMm: number; heightMm: number } {
  const base =
    cfg.paperSize === 'Custom'
      ? {
          w: Math.min(Math.max(Number(cfg.customWidthMm) || 210, 50), 1000),
          h: Math.min(Math.max(Number(cfg.customHeightMm) || 297, 50), 1400),
        }
      : PAPER_DIMENSIONS_MM[cfg.paperSize];

  return cfg.orientation === 'landscape'
    ? { widthMm: Math.max(base.w, base.h), heightMm: Math.min(base.w, base.h) }
    : { widthMm: Math.min(base.w, base.h), heightMm: Math.max(base.w, base.h) };
}

export function sanitizeFilename(raw: string, ext: string): string {
  const clean = String(raw || 'mystudyzone-document')
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 80);
  const base = clean || 'mystudyzone_document';
  return base.toLowerCase().endsWith(`.${ext.toLowerCase()}`) ? base : `${base}.${ext}`;
}

export function sanitizePdfText(input: string): string {
  return String(input || '')
    .replace(/\r\n/g, '\n')
    .replace(/[•●▪]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, '-')
    .replace(/–/g, '-')
    .replace(/₹/g, 'INR ')
    .replace(/[^\x09\x0A\x0D\x20-\xFF]/g, '');
}

export function downloadBlobFile(blob: Blob, filename: string, ext: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = sanitizeFilename(filename, ext);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function downloadTextAsPdf(options: PdfDocumentExportOptions): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 16;
  const maxContentWidth = pageWidth - marginX * 2;
  let y = 18;

  const addHeaderBanner = () => {
    doc.setFillColor(30, 58, 138);
    doc.rect(0, 0, pageWidth, 12, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text('MYSTUDYZONE / VACATION CHAMPIONS • OFFICIAL STUDY DOCUMENT', marginX, 8);
  };

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > pageHeight - 16) {
      doc.addPage();
      addHeaderBanner();
      y = 20;
    }
  };

  addHeaderBanner();

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  const titleLines = doc.splitTextToSize(sanitizePdfText(options.title), maxContentWidth);
  doc.text(titleLines, marginX, y);
  y += titleLines.length * 7 + 2;

  if (options.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(71, 85, 105);
    const subLines = doc.splitTextToSize(sanitizePdfText(options.subtitle), maxContentWidth);
    doc.text(subLines, marginX, y);
    y += subLines.length * 5.2 + 2;
  }

  if (options.metaLines && options.metaLines.length > 0) {
    doc.setFillColor(241, 245, 249);
    const metaHeight = options.metaLines.length * 5 + 5;
    doc.roundedRect(marginX, y, maxContentWidth, metaHeight, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    let my = y + 5;
    for (const line of options.metaLines) {
      doc.text(sanitizePdfText(line).slice(0, 110), marginX + 4, my);
      my += 5;
    }
    y += metaHeight + 5;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 6;

  for (const section of options.sections) {
    if (section.heading) {
      ensureSpace(14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(30, 58, 138);
      const headingLines = doc.splitTextToSize(sanitizePdfText(section.heading), maxContentWidth);
      doc.text(headingLines, marginX, y);
      y += headingLines.length * 5.8 + 2;
    }

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5);
    doc.setTextColor(30, 41, 59);
    const paragraphs = sanitizePdfText(section.body).split('\n');
    for (const para of paragraphs) {
      const trimmed = para.trim();
      if (!trimmed) {
        y += 3;
        continue;
      }
      const wrapped = doc.splitTextToSize(trimmed, maxContentWidth);
      for (const line of wrapped) {
        ensureSpace(6);
        doc.text(line, marginX, y);
        y += 5.2;
      }
      y += 1.5;
    }
    y += 3;
  }

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    doc.text(`mystudyzone.in • Page ${i} of ${totalPages}`, pageWidth / 2, pageHeight - 8, { align: 'center' });
  }

  doc.save(sanitizeFilename(options.filename || options.title, 'pdf'));
}

export interface TableExportData {
  columns: string[];
  rows: string[][];
}

export interface PrintExportPayload {
  title: string;
  subtitle?: string;
  metaLines?: string[];
  sections?: PdfSectionBlock[];
  table?: TableExportData;
  imageDataUrls?: string[];
  filename?: string;
}

export function downloadDocumentWithPrintSettingsPdf(
  payload: PrintExportPayload,
  settings: PrintSettingsConfig
): void {
  const dims = getEffectivePaperDimensionsMm(settings);
  const doc = new jsPDF({
    orientation: settings.orientation,
    unit: 'mm',
    format: [dims.widthMm, dims.heightMm],
  });

  const mTop = Math.max(4, Math.min(settings.marginsMm.top, dims.heightMm / 3));
  const mRight = Math.max(4, Math.min(settings.marginsMm.right, dims.widthMm / 3));
  const mBottom = Math.max(6, Math.min(settings.marginsMm.bottom, dims.heightMm / 3));
  const mLeft = Math.max(4, Math.min(settings.marginsMm.left, dims.widthMm / 3));

  const scaleFactor =
    settings.scaleMode === 'custom'
      ? Math.max(0.4, Math.min(1.8, settings.customScalePct / 100))
      : settings.scaleMode === 'fit-page'
      ? 0.92
      : 1;

  const usableW = dims.widthMm - mLeft - mRight;
  const usableH = dims.heightMm - mTop - mBottom;
  let y = mTop + (settings.headerText.trim() ? 6 : 0);

  const drawRunningHeader = () => {
    if (settings.headerText.trim()) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(100, 116, 139);
      doc.text(sanitizePdfText(settings.headerText).slice(0, 100), mLeft, mTop);
      doc.setDrawColor(226, 232, 240);
      doc.line(mLeft, mTop + 2, dims.widthMm - mRight, mTop + 2);
    }
  };

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > dims.heightMm - mBottom - 4) {
      doc.addPage();
      drawRunningHeader();
      y = mTop + (settings.headerText.trim() ? 6 : 0);
    }
  };

  drawRunningHeader();

  const textAlign = settings.centerContent ? 'center' : 'left';
  const anchorX = settings.centerContent ? dims.widthMm / 2 : mLeft;

  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15 * scaleFactor);
  const titleLines = doc.splitTextToSize(sanitizePdfText(payload.title || 'Document'), usableW);
  doc.text(titleLines, anchorX, y, { align: textAlign });
  y += titleLines.length * (6.2 * scaleFactor) + 2;

  if (payload.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10.5 * scaleFactor);
    doc.setTextColor(71, 85, 105);
    const subLines = doc.splitTextToSize(sanitizePdfText(payload.subtitle), usableW);
    doc.text(subLines, anchorX, y, { align: textAlign });
    y += subLines.length * (4.8 * scaleFactor) + 2;
  }

  if (payload.metaLines && payload.metaLines.length > 0) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5 * scaleFactor);
    doc.setTextColor(51, 65, 85);
    for (const mLine of payload.metaLines) {
      ensureSpace(5);
      doc.text(sanitizePdfText(mLine).slice(0, 120), anchorX, y, { align: textAlign });
      y += 4.5 * scaleFactor;
    }
    y += 2;
  }

  doc.setDrawColor(203, 213, 225);
  doc.line(mLeft, y, dims.widthMm - mRight, y);
  y += 5;

  // Optional images (e.g. Image->PDF, Passport Sheet, Charts)
  if (payload.imageDataUrls && payload.imageDataUrls.length > 0) {
    payload.imageDataUrls.forEach((imgUrl, idx) => {
      if (idx > 0 && settings.scaleMode === 'fit-page') {
        doc.addPage();
        drawRunningHeader();
        y = mTop + (settings.headerText.trim() ? 6 : 0);
      }
      try {
        const props = doc.getImageProperties(imgUrl);
        const ratio = props.width / Math.max(1, props.height);
        let drawW = usableW * Math.min(1, scaleFactor);
        let drawH = drawW / ratio;
        const maxAvailH = Math.max(30, dims.heightMm - mBottom - y - 4);
        if (drawH > maxAvailH && (settings.scaleMode === 'fit-page' || settings.scaleMode === 'fit-height')) {
          drawH = maxAvailH;
          drawW = drawH * ratio;
        }
        if (drawH > usableH) {
          drawH = usableH - 4;
          drawW = drawH * ratio;
        }
        ensureSpace(drawH + 2);
        const drawX = settings.centerContent ? mLeft + (usableW - drawW) / 2 : mLeft;
        const format = imgUrl.startsWith('data:image/png') ? 'PNG' : 'JPEG';
        doc.addImage(imgUrl, format, drawX, y, drawW, drawH);
        y += drawH + 5;
      } catch {
        // Skip corrupt/unsupported image frame cleanly
      }
    });
  }

  // Optional structured table (e.g. Timetable, Marksheet, Excel->PDF, PDF->Excel preview)
  if (payload.table && payload.table.columns.length > 0) {
    const colCount = payload.table.columns.length;
    const colW = usableW / colCount;
    const fontPt = Math.max(6.5, Math.min(10, (colCount > 7 ? 7.5 : 9) * scaleFactor));
    const lineH = Math.max(3.6, fontPt * 0.48);

    const drawTableHeader = () => {
      ensureSpace(9);
      doc.setFillColor(30, 58, 138);
      doc.rect(mLeft, y, usableW, 7.5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(fontPt);
      doc.setTextColor(255, 255, 255);
      payload.table!.columns.forEach((col, ci) => {
        const txt = sanitizePdfText(col).slice(0, 32);
        doc.text(txt, mLeft + ci * colW + 1.8, y + 5);
      });
      y += 7.5;
    };

    drawTableHeader();

    payload.table.rows.forEach((row, rIdx) => {
      const wrappedCells = payload.table!.columns.map((_, ci) =>
        doc.splitTextToSize(sanitizePdfText(row[ci] ?? ''), Math.max(10, colW - 3.2))
      );
      const maxLines = Math.max(1, ...wrappedCells.map((c) => c.length));
      const rowH = maxLines * lineH + 3.2;
      if (y + rowH > dims.heightMm - mBottom - 4) {
        doc.addPage();
        drawRunningHeader();
        y = mTop + (settings.headerText.trim() ? 6 : 0);
        drawTableHeader();
      }
      if (rIdx % 2 === 1) {
        doc.setFillColor(248, 250, 252);
        doc.rect(mLeft, y, usableW, rowH, 'F');
      }
      doc.setDrawColor(226, 232, 240);
      doc.rect(mLeft, y, usableW, rowH, 'S');
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(fontPt);
      doc.setTextColor(30, 41, 59);
      wrappedCells.forEach((lines, ci) => {
        doc.text(lines, mLeft + ci * colW + 1.8, y + lineH + 0.8);
      });
      y += rowH;
    });
    y += 5;
  }

  // Optional narrative/document sections
  if (payload.sections && payload.sections.length > 0) {
    for (const section of payload.sections) {
      if (section.heading) {
        ensureSpace(12);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11.5 * scaleFactor);
        doc.setTextColor(30, 58, 138);
        const headingLines = doc.splitTextToSize(sanitizePdfText(section.heading), usableW);
        doc.text(headingLines, anchorX, y, { align: textAlign });
        y += headingLines.length * (5.2 * scaleFactor) + 1.5;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10 * scaleFactor);
      doc.setTextColor(30, 41, 59);
      const rawBody = settings.trimWhitespace
        ? sanitizePdfText(section.body).replace(/\n{3,}/g, '\n\n').trim()
        : sanitizePdfText(section.body);
      const paragraphs = rawBody.split('\n');
      for (const para of paragraphs) {
        const trimmed = settings.trimWhitespace ? para.trim() : para;
        if (!trimmed) {
          y += 2.5 * scaleFactor;
          continue;
        }
        const wrapped = doc.splitTextToSize(trimmed, usableW);
        for (const line of wrapped) {
          ensureSpace(5.5 * scaleFactor);
          doc.text(line, anchorX, y, { align: textAlign });
          y += 4.8 * scaleFactor;
        }
        y += 1.2 * scaleFactor;
      }
      y += 2.5;
    }
  }

  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(100, 116, 139);
    const footerParts = [
      settings.footerText.trim() ? sanitizePdfText(settings.footerText.trim()) : '',
      settings.showPageNumbers ? `Page ${i} of ${totalPages}` : '',
    ].filter(Boolean);
    if (footerParts.length > 0) {
      doc.text(footerParts.join('  •  '), dims.widthMm / 2, dims.heightMm - Math.max(4, mBottom / 2), {
        align: 'center',
      });
    }
  }

  doc.save(sanitizeFilename(payload.filename || payload.title, 'pdf'));
}

export async function downloadDocumentAsDocx(options: {
  title: string;
  subtitle?: string;
  metaLines?: string[];
  sections?: PdfSectionBlock[];
  table?: TableExportData;
  filename?: string;
}): Promise<void> {
  const docx = await import('docx');
  const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HeadingLevel,
    Table,
    TableRow,
    TableCell,
    WidthType,
  } = docx;

  const children: Array<InstanceType<typeof Paragraph> | InstanceType<typeof Table>> = [];

  children.push(
    new Paragraph({
      text: options.title || 'MyStudyZone Document',
      heading: HeadingLevel.HEADING_1,
      spacing: { after: 120 },
    })
  );

  if (options.subtitle) {
    children.push(
      new Paragraph({
        children: [new TextRun({ text: options.subtitle, italics: true, color: '475569' })],
        spacing: { after: 140 },
      })
    );
  }

  if (options.metaLines && options.metaLines.length > 0) {
    for (const line of options.metaLines) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: line, bold: true, size: 20, color: '334155' })],
          spacing: { after: 80 },
        })
      );
    }
  }

  if (options.table && options.table.columns.length > 0) {
    const headerRow = new TableRow({
      children: options.table.columns.map(
        (col) =>
          new TableCell({
            children: [
              new Paragraph({
                children: [new TextRun({ text: String(col || ''), bold: true, size: 20 })],
              }),
            ],
          })
      ),
    });

    const dataRows = options.table.rows.map(
      (r) =>
        new TableRow({
          children: options.table!.columns.map(
            (_, ci) =>
              new TableCell({
                children: [
                  new Paragraph({
                    children: [new TextRun({ text: String(r[ci] ?? ''), size: 20 })],
                  }),
                ],
              })
          ),
        })
    );

    children.push(
      new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [headerRow, ...dataRows],
      })
    );
    children.push(new Paragraph({ text: '', spacing: { after: 140 } }));
  }

  for (const sec of options.sections || []) {
    if (sec.heading) {
      children.push(
        new Paragraph({
          text: sec.heading,
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 180, after: 80 },
        })
      );
    }
    const paras = String(sec.body || '').split(/\r?\n/);
    for (const line of paras) {
      children.push(
        new Paragraph({
          text: line,
          spacing: { after: 80 },
        })
      );
    }
  }

  const doc = new Document({
    creator: 'MyStudyZone',
    title: options.title || 'MyStudyZone Document',
    sections: [{ children }],
  });

  const blob = await Packer.toBlob(doc);
  downloadBlobFile(blob, options.filename || options.title || 'mystudyzone_doc', 'docx');
}

export async function downloadTableAsXlsx(options: {
  sheetName?: string;
  columns: string[];
  rows: string[][];
  extraSheets?: Array<{ name: string; columns: string[]; rows: string[][] }>;
  filename?: string;
}): Promise<void> {
  const XLSX = await import('xlsx');
  const wb = XLSX.utils.book_new();

  const mainAoa = [options.columns, ...options.rows];
  const mainWs = XLSX.utils.aoa_to_sheet(mainAoa);
  mainWs['!cols'] = options.columns.map((c) => ({ wch: Math.max(14, Math.min(42, String(c).length + 8)) }));
  XLSX.utils.book_append_sheet(wb, mainWs, (options.sheetName || 'Sheet1').slice(0, 31));

  for (const extra of options.extraSheets || []) {
    const ws = XLSX.utils.aoa_to_sheet([extra.columns, ...extra.rows]);
    ws['!cols'] = extra.columns.map((c) => ({ wch: Math.max(14, Math.min(42, String(c).length + 8)) }));
    XLSX.utils.book_append_sheet(wb, ws, (extra.name || 'Sheet').slice(0, 31));
  }

  const out = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([out], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  downloadBlobFile(blob, options.filename || options.sheetName || 'mystudyzone_sheet', 'xlsx');
}

export async function downloadPresentationAsPptx(options: {
  title: string;
  subtitle?: string;
  slides: PresentationSlideExportItem[];
  filename?: string;
}): Promise<void> {
  const mod = await import('pptxgenjs');
  const PptxGenJS = mod.default || (mod as unknown as typeof mod.default);
  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = options.title || 'MyStudyZone Presentation';

  const cover = pptx.addSlide();
  cover.background = { color: '0F172A' };
  cover.addText(options.title || 'Presentation', {
    x: 0.7,
    y: 1.6,
    w: 8.6,
    h: 1.4,
    fontSize: 30,
    bold: true,
    color: 'FFFFFF',
  });
  if (options.subtitle) {
    cover.addText(options.subtitle, {
      x: 0.7,
      y: 3.1,
      w: 8.6,
      h: 0.8,
      fontSize: 16,
      color: 'C7D2FE',
    });
  }
  cover.addText('MyStudyZone Educational Presentation (mystudyzone.in)', {
    x: 0.7,
    y: 4.9,
    w: 8.6,
    h: 0.4,
    fontSize: 11,
    color: '94A3B8',
  });

  options.slides.forEach((slideItem, idx) => {
    const s = pptx.addSlide();
    s.background = { color: 'F8FAFC' };
    s.addShape(pptx.ShapeType.rect, {
      x: 0,
      y: 0,
      w: 10,
      h: 0.85,
      fill: { color: '4F46E5' },
    });
    s.addText(`Slide ${slideItem.slideNumber || idx + 1}: ${slideItem.title}`, {
      x: 0.5,
      y: 0.18,
      w: 9.0,
      h: 0.5,
      fontSize: 18,
      bold: true,
      color: 'FFFFFF',
    });

    const bulletObjects = (slideItem.bullets || []).map((b) => ({
      text: String(b),
      options: { bullet: true, breakLine: true },
    }));
    if (bulletObjects.length > 0) {
      s.addText(bulletObjects, {
        x: 0.65,
        y: 1.15,
        w: 8.7,
        h: 3.6,
        fontSize: 15,
        color: '1E293B',
        valign: 'top',
        paraSpaceAfter: 8,
      });
    }

    if (slideItem.speakerNotes) {
      s.addNotes(slideItem.speakerNotes);
    }
  });

  const arrayBuffer = await pptx.write({ outputType: 'arraybuffer' });
  const blob = new Blob([arrayBuffer as ArrayBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  });
  downloadBlobFile(blob, options.filename || `${options.title || 'presentation'}_slides`, 'pptx');
}

export function downloadPresentationAsPdf(options: {
  title: string;
  subtitle?: string;
  slides: PresentationSlideExportItem[];
  filename?: string;
}): void {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 20;
  const maxWidth = pageWidth - marginX * 2;

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  doc.setFillColor(79, 70, 229);
  doc.rect(0, 0, pageWidth, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  const coverLines = doc.splitTextToSize(sanitizePdfText(options.title), maxWidth);
  doc.text(coverLines, marginX, 75);
  if (options.subtitle) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(199, 210, 254);
    doc.text(doc.splitTextToSize(sanitizePdfText(options.subtitle), maxWidth), marginX, 105);
  }
  doc.setFontSize(10);
  doc.setTextColor(148, 163, 184);
  doc.text('Prepared on MyStudyZone AI Presentation Maker (mystudyzone.in)', marginX, pageHeight - 16);

  options.slides.forEach((slide, idx) => {
    doc.addPage();
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageWidth, 24, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text(
      sanitizePdfText(`Slide ${slide.slideNumber || idx + 1}: ${slide.title}`).slice(0, 85),
      marginX,
      15
    );

    let y = 40;
    doc.setTextColor(15, 23, 42);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    for (const bullet of slide.bullets) {
      const wrapped = doc.splitTextToSize(sanitizePdfText(`- ${bullet}`), maxWidth);
      doc.text(wrapped, marginX, y);
      y += wrapped.length * 7 + 4;
      if (y > pageHeight - 40) break;
    }

    if (slide.speakerNotes) {
      doc.setFillColor(226, 232, 240);
      doc.roundedRect(marginX, pageHeight - 34, maxWidth, 22, 2, 2, 'F');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(9.5);
      doc.setTextColor(51, 65, 85);
      const notesLines = doc.splitTextToSize(
        sanitizePdfText(`Speaker Notes: ${slide.speakerNotes}`),
        maxWidth - 8
      ).slice(0, 2);
      doc.text(notesLines, marginX + 4, pageHeight - 25);
    }
  });

  doc.save(sanitizeFilename(options.filename || `${options.title}_slides`, 'pdf'));
}

export function downloadResumeAsPdf(data: ResumePdfExportData): void {
  const sections: PdfSectionBlock[] = [];
  if (data.summary) {
    sections.push({ heading: 'PROFESSIONAL SUMMARY', body: data.summary });
  }
  if (data.experience.length > 0) {
    const expText = data.experience
      .map(
        (exp) =>
          `${exp.role} | ${exp.org} (${exp.duration})\n${exp.highlights.map((h) => `- ${h}`).join('\n')}`
      )
      .join('\n\n');
    sections.push({ heading: 'EXPERIENCE & ACHIEVEMENTS', body: expText });
  }
  if (data.education.length > 0) {
    const eduText = data.education
      .map((edu) => `${edu.degree} — ${edu.institution} (${edu.year})`)
      .join('\n');
    sections.push({ heading: 'EDUCATION', body: eduText });
  }
  if (data.skills.length > 0) {
    sections.push({ heading: 'KEY SKILLS', body: data.skills.join('  •  ') });
  }

  downloadTextAsPdf({
    title: data.fullName || 'Candidate Resume',
    subtitle: data.headline,
    metaLines: [[data.email, data.phone, data.location].filter(Boolean).join('  |  ')],
    sections,
    filename: data.filename || `${data.fullName || 'resume'}_cv`,
  });
}

export function downloadBase64ImagePng(dataUrl: string, filename = 'mystudyzone_ai_image'): void {
  const cleanName = sanitizeFilename(filename, 'png');
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = cleanName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function downloadPlainTextFile(
  content: string,
  filename = 'document',
  ext: 'txt' | 'md' | 'csv' | 'svg' = 'txt'
): void {
  const mimeMap: Record<string, string> = {
    txt: 'text/plain;charset=utf-8',
    md: 'text/markdown;charset=utf-8',
    csv: 'text/csv;charset=utf-8',
    svg: 'image/svg+xml;charset=utf-8',
  };
  const blob = new Blob([content], { type: mimeMap[ext] || 'text/plain;charset=utf-8' });
  downloadBlobFile(blob, filename, ext);
}

export function downloadJsonFile(data: unknown, filename = 'export'): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  downloadBlobFile(blob, filename, 'json');
}
