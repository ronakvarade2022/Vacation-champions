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

function sanitizeFilename(raw: string, ext: string): string {
  const clean = String(raw || 'mystudyzone-document')
    .replace(/[^a-zA-Z0-9_\-\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
    .slice(0, 80);
  const base = clean || 'mystudyzone_document';
  return base.toLowerCase().endsWith(`.${ext}`) ? base : `${base}.${ext}`;
}

function sanitizePdfText(input: string): string {
  // jsPDF standard Helvetica handles Latin-1 reliably; replace unsupported symbols gracefully
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
    doc.setFillColor(30, 58, 138); // indigo/navy
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

  // Title
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
    doc.text(
      `mystudyzone.in • Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 8,
      { align: 'center' }
    );
  }

  doc.save(sanitizeFilename(options.filename || options.title, 'pdf'));
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

  // Title slide
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
          `${exp.role} | ${exp.org} (${exp.duration})\n${exp.highlights
            .map((h) => `- ${h}`)
            .join('\n')}`
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
    metaLines: [
      [data.email, data.phone, data.location].filter(Boolean).join('  |  '),
    ],
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

export function downloadPlainTextFile(content: string, filename = 'document', ext: 'txt' | 'md' | 'csv' = 'txt'): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = sanitizeFilename(filename, ext);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadJsonFile(data: unknown, filename = 'export'): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = sanitizeFilename(filename, 'json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
