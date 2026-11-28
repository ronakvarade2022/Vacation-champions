import { jsPDF } from 'jspdf';
import {
  downloadUniversalPdf,
  type UniversalPaperSize,
  type UniversalSectionBlock,
} from './universalPdfPrintEngine';

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
  void downloadUniversalPdf(
    {
      title: options.title,
      subtitle: options.subtitle,
      portalBadge: 'MYSTUDYZONE OFFICIAL DOCUMENT',
      metaItems: options.metaLines,
      sections: options.sections,
      filename: options.filename || options.title,
    },
    {
      paperSize: 'A4',
      orientation: 'portrait',
      includeHeaderFooter: true,
      includePageNumbers: true,
    }
  );
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
  const mappedPaper: UniversalPaperSize = (
    ['A4', 'A3', 'Legal', 'Letter', 'A5'].includes(settings.paperSize)
      ? settings.paperSize
      : 'A4'
  ) as UniversalPaperSize;

  const fontScale =
    settings.scaleMode === 'custom'
      ? Math.max(0.75, Math.min(1.3, settings.customScalePct / 100))
      : settings.scaleMode === 'fit-page'
      ? 0.94
      : 1;

  void downloadUniversalPdf(
    {
      title: payload.title || 'MyStudyZone Document',
      subtitle: payload.subtitle,
      portalBadge: settings.headerText?.trim() || 'MYSTUDYZONE PRINT STUDIO',
      metaItems: payload.metaLines,
      sections: payload.sections,
      tables:
        payload.table && payload.table.columns.length > 0
          ? [{ headers: payload.table.columns, rows: payload.table.rows }]
          : undefined,
      images: payload.imageDataUrls?.map((d, idx) => ({
        dataUrl: d,
        caption: `Figure ${idx + 1}`,
      })),
      footerNote: settings.footerText?.trim() || undefined,
      filename: payload.filename || payload.title,
    },
    {
      paperSize: mappedPaper,
      orientation: settings.orientation,
      marginsMm: settings.marginsMm,
      fontScale,
      includeHeaderFooter: true,
      includePageNumbers: settings.showPageNumbers,
    }
  );
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
  const sections: UniversalSectionBlock[] = options.slides.map((slide, idx) => {
    const lines = [
      ...slide.bullets.map((b) => `• ${b}`),
      ...(slide.speakerNotes ? [`Speaker Notes: ${slide.speakerNotes}`] : []),
    ];
    return {
      heading: `Slide ${slide.slideNumber || idx + 1}: ${slide.title}`,
      body: lines.join('\n'),
    };
  });

  downloadUniversalPdf({
    title: options.title || 'MyStudyZone Presentation',
    subtitle: options.subtitle,
    metaItems: [
      { label: 'Total Slides', value: `${options.slides.length}` },
      { label: 'Format', value: 'A4 Landscape Slide Deck' },
    ],
    sections,
    paperSize: 'a4',
    orientation: 'landscape',
    filename: options.filename || `${options.title}_slides`,
  });
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
