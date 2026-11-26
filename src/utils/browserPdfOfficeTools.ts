import { downloadBlobFile, type PrintExportPayload } from './realFileExports';

export const MAX_DOCUMENT_FILE_BYTES = 25 * 1024 * 1024;

let workerInitialized = false;

async function getPdfJs() {
  const pdfjsLib = await import('pdfjs-dist');
  if (!workerInitialized) {
    const workerMod = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default;
    workerInitialized = true;
  }
  return pdfjsLib;
}

export async function readFileAsArrayBufferSafe(file: File): Promise<ArrayBuffer> {
  if (file.size > MAX_DOCUMENT_FILE_BYTES) {
    throw new Error(`File "${file.name}" exceeds the 25 MB browser processing limit.`);
  }
  return file.arrayBuffer();
}

export interface RenderedPdfPageThumbnail {
  pageNumber: number;
  widthPt: number;
  heightPt: number;
  dataUrl: string;
}

export async function renderPdfPagesToImages(
  pdfBytes: ArrayBuffer,
  options: { scale?: number; mime?: 'image/png' | 'image/jpeg'; quality?: number; maxPages?: number } = {}
): Promise<{ totalPages: number; pages: RenderedPdfPageThumbnail[] }> {
  const pdfjsLib = await getPdfJs();
  const doc = await pdfjsLib.getDocument({ data: pdfBytes.slice(0) }).promise;
  const totalPages = doc.numPages;
  const limit = Math.min(totalPages, options.maxPages || totalPages);
  const scale = options.scale || 1.5;
  const mime = options.mime || 'image/png';
  const quality = options.quality ?? 0.9;

  const pages: RenderedPdfPageThumbnail[] = [];
  for (let p = 1; p <= limit; p++) {
    const page = await doc.getPage(p);
    const baseVp = page.getViewport({ scale: 1 });
    const vp = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(vp.width));
    canvas.height = Math.max(1, Math.round(vp.height));
    const ctx = canvas.getContext('2d');
    if (ctx) {
      await page.render({ canvas, canvasContext: ctx, viewport: vp }).promise;
      pages.push({
        pageNumber: p,
        widthPt: Math.round(baseVp.width),
        heightPt: Math.round(baseVp.height),
        dataUrl: canvas.toDataURL(mime, mime === 'image/jpeg' ? quality : undefined),
      });
    }
  }
  return { totalPages, pages };
}

export async function extractPdfTextPerPage(
  pdfBytes: ArrayBuffer
): Promise<Array<{ pageNumber: number; lines: string[] }>> {
  const pdfjsLib = await getPdfJs();
  const doc = await pdfjsLib.getDocument({ data: pdfBytes.slice(0) }).promise;
  const out: Array<{ pageNumber: number; lines: string[] }> = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const rowMap = new Map<number, Array<{ x: number; text: string }>>();
    for (const rawItem of content.items as any[]) {
      if (!rawItem || typeof rawItem.str !== 'string') continue;
      const text = rawItem.str;
      if (!text.trim()) continue;
      const x = Array.isArray(rawItem.transform) ? Number(rawItem.transform[4]) || 0 : 0;
      const y = Array.isArray(rawItem.transform) ? Math.round((Number(rawItem.transform[5]) || 0) / 5) * 5 : 0;
      const bucket = rowMap.get(y) || [];
      bucket.push({ x, text });
      rowMap.set(y, bucket);
    }

    const sortedYs = Array.from(rowMap.keys()).sort((a, b) => b - a);
    const lines = sortedYs.map((y) => {
      const items = (rowMap.get(y) || []).sort((a, b) => a.x - b.x);
      return items.map((i) => i.text).join(' ').replace(/\s+/g, ' ').trim();
    });
    out.push({ pageNumber: p, lines: lines.filter(Boolean) });
  }
  return out;
}

export async function extractPdfTablesHeuristic(
  pdfBytes: ArrayBuffer
): Promise<{ columns: string[]; rows: string[][] }> {
  const pdfjsLib = await getPdfJs();
  const doc = await pdfjsLib.getDocument({ data: pdfBytes.slice(0) }).promise;
  const allRows: string[][] = [];

  for (let p = 1; p <= doc.numPages; p++) {
    const page = await doc.getPage(p);
    const content = await page.getTextContent();
    const rowMap = new Map<number, Array<{ x: number; text: string }>>();
    for (const rawItem of content.items as any[]) {
      if (!rawItem || typeof rawItem.str !== 'string' || !rawItem.str.trim()) continue;
      const x = Array.isArray(rawItem.transform) ? Number(rawItem.transform[4]) || 0 : 0;
      const y = Array.isArray(rawItem.transform) ? Math.round((Number(rawItem.transform[5]) || 0) / 6) * 6 : 0;
      const bucket = rowMap.get(y) || [];
      bucket.push({ x, text: rawItem.str.trim() });
      rowMap.set(y, bucket);
    }

    const sortedYs = Array.from(rowMap.keys()).sort((a, b) => b - a);
    for (const y of sortedYs) {
      const items = (rowMap.get(y) || []).sort((a, b) => a.x - b.x);
      const cells: string[] = [];
      let currentCell = '';
      let prevX = -999;
      for (const item of items) {
        if (prevX >= 0 && item.x - prevX > 28) {
          cells.push(currentCell.trim());
          currentCell = item.text;
        } else {
          currentCell = currentCell ? `${currentCell} ${item.text}` : item.text;
        }
        prevX = item.x + item.text.length * 4;
      }
      if (currentCell.trim()) cells.push(currentCell.trim());
      if (cells.length > 0) allRows.push(cells);
    }
  }

  const maxCols = Math.max(1, ...allRows.map((r) => r.length));
  const padded = allRows.map((r) => {
    const copy = [...r];
    while (copy.length < maxCols) copy.push('');
    return copy;
  });

  if (padded.length === 0) {
    return { columns: ['Extracted Text'], rows: [['No selectable text found (may be a scanned image PDF).']] };
  }

  return {
    columns: padded[0],
    rows: padded.slice(1),
  };
}

export function parsePageRangeList(spec: string, totalPages: number): number[] {
  const set = new Set<number>();
  const parts = String(spec || '')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);
  for (const part of parts) {
    if (part.includes('-')) {
      const [aRaw, bRaw] = part.split('-').map((n) => parseInt(n.trim(), 10));
      if (!Number.isNaN(aRaw) && !Number.isNaN(bRaw)) {
        const start = Math.max(1, Math.min(aRaw, bRaw));
        const end = Math.min(totalPages, Math.max(aRaw, bRaw));
        for (let i = start; i <= end; i++) set.add(i);
      }
    } else {
      const num = parseInt(part, 10);
      if (!Number.isNaN(num) && num >= 1 && num <= totalPages) set.add(num);
    }
  }
  return Array.from(set).sort((a, b) => a - b);
}

export async function mergePdfBuffers(buffers: ArrayBuffer[]): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  const merged = await PDFDocument.create();
  for (const buf of buffers) {
    const src = await PDFDocument.load(buf);
    const copied = await merged.copyPages(src, src.getPageIndices());
    copied.forEach((p) => merged.addPage(p));
  }
  return merged.save();
}

export async function splitPdfBySpecs(
  buf: ArrayBuffer,
  mode: 'every_n' | 'ranges' | 'single_pages',
  everyN: number,
  rangesText: string
): Promise<Array<{ name: string; bytes: Uint8Array }>> {
  const { PDFDocument } = await import('pdf-lib');
  const src = await PDFDocument.load(buf);
  const total = src.getPageCount();
  const groups: Array<{ label: string; pages: number[] }> = [];

  if (mode === 'single_pages') {
    for (let i = 1; i <= total; i++) {
      groups.push({ label: `page_${i}`, pages: [i] });
    }
  } else if (mode === 'every_n') {
    const step = Math.max(1, everyN);
    for (let start = 1; start <= total; start += step) {
      const end = Math.min(total, start + step - 1);
      const list: number[] = [];
      for (let i = start; i <= end; i++) list.push(i);
      groups.push({ label: `pages_${start}-${end}`, pages: list });
    }
  } else {
    const rangeTokens = rangesText
      .split(';')
      .map((s) => s.trim())
      .filter(Boolean);
    const effectiveTokens = rangeTokens.length > 0 ? rangeTokens : [`1-${total}`];
    effectiveTokens.forEach((tok, idx) => {
      const list = parsePageRangeList(tok, total);
      if (list.length > 0) {
        groups.push({ label: `part_${idx + 1}_${tok.replace(/[^0-9-]/g, '_')}`, pages: list });
      }
    });
  }

  const results: Array<{ name: string; bytes: Uint8Array }> = [];
  for (const grp of groups) {
    const out = await PDFDocument.create();
    const indices = grp.pages.map((p) => p - 1);
    const copied = await out.copyPages(src, indices);
    copied.forEach((p) => out.addPage(p));
    results.push({ name: grp.label, bytes: await out.save() });
  }
  return results;
}

export async function compressPdfBuffer(
  buf: ArrayBuffer,
  level: 'lossless' | 'medium' | 'high'
): Promise<Uint8Array> {
  const { PDFDocument } = await import('pdf-lib');
  if (level === 'lossless') {
    const doc = await PDFDocument.load(buf, { updateMetadata: false });
    return doc.save({ useObjectStreams: true });
  }

  const scale = level === 'high' ? 1.0 : 1.35;
  const quality = level === 'high' ? 0.55 : 0.74;
  const rendered = await renderPdfPagesToImages(buf, {
    scale,
    mime: 'image/jpeg',
    quality,
  });

  const out = await PDFDocument.create();
  for (const pg of rendered.pages) {
    const base64 = pg.dataUrl.split(',')[1] || '';
    const binStr = atob(base64);
    const bytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
    const jpg = await out.embedJpg(bytes);
    const page = out.addPage([pg.widthPt, pg.heightPt]);
    page.drawImage(jpg, { x: 0, y: 0, width: pg.widthPt, height: pg.heightPt });
  }
  return out.save({ useObjectStreams: true });
}

export async function transformPdfPages(
  buf: ArrayBuffer,
  options: {
    pageOrder?: number[]; // 1-indexed list of pages to keep in order
    rotations?: Record<number, number>; // 1-indexed -> degrees
    cropPct?: { top: number; right: number; bottom: number; left: number };
    pageNumbers?: {
      enabled: boolean;
      position: 'bottom-center' | 'bottom-right' | 'top-center' | 'top-right';
      fontSize: number;
    };
    headerFooter?: {
      headerText: string;
      footerText: string;
      fontSize: number;
    };
    textOverlays?: Array<{
      pageNumber: number;
      text: string;
      xPct: number;
      yPct: number;
      fontSize: number;
      colorHex: string;
      highlightBox?: boolean;
    }>;
    imageOverlays?: Array<{
      pageNumber: number;
      dataUrl: string;
      xPct: number;
      yPct: number;
      widthPct: number;
    }>;
  }
): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, degrees, rgb } = await import('pdf-lib');
  const src = await PDFDocument.load(buf);
  const out = await PDFDocument.create();
  const totalSrc = src.getPageCount();
  const order =
    options.pageOrder && options.pageOrder.length > 0
      ? options.pageOrder.filter((n) => n >= 1 && n <= totalSrc)
      : Array.from({ length: totalSrc }, (_, i) => i + 1);

  const copied = await out.copyPages(
    src,
    order.map((p) => p - 1)
  );
  copied.forEach((p) => out.addPage(p));

  const font = await out.embedFont(StandardFonts.Helvetica);
  const pages = out.getPages();
  const totalOut = pages.length;

  const parseHex = (hex: string) => {
    const clean = /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : '#0F172A';
    return rgb(
      parseInt(clean.slice(1, 3), 16) / 255,
      parseInt(clean.slice(3, 5), 16) / 255,
      parseInt(clean.slice(5, 7), 16) / 255
    );
  };

  for (let idx = 0; idx < pages.length; idx++) {
    const page = pages[idx];
    const origPageNum = order[idx];
    const { width, height } = page.getSize();

    // Rotation
    if (options.rotations && options.rotations[origPageNum]) {
      const current = page.getRotation().angle;
      page.setRotation(degrees((current + options.rotations[origPageNum]) % 360));
    }

    // Cropping
    if (options.cropPct) {
      const { top, right, bottom, left } = options.cropPct;
      if (top > 0 || right > 0 || bottom > 0 || left > 0) {
        const cropX = Math.max(0, (Math.min(40, left) / 100) * width);
        const cropY = Math.max(0, (Math.min(40, bottom) / 100) * height);
        const cropW = Math.max(40, width - cropX - (Math.min(40, right) / 100) * width);
        const cropH = Math.max(40, height - cropY - (Math.min(40, top) / 100) * height);
        page.setCropBox(cropX, cropY, cropW, cropH);
      }
    }

    // Page numbers
    if (options.pageNumbers?.enabled) {
      const label = `Page ${idx + 1} of ${totalOut}`;
      const fSize = Math.max(7, Math.min(20, options.pageNumbers.fontSize || 10));
      const txtW = font.widthOfTextAtSize(label, fSize);
      const pos = options.pageNumbers.position;
      const x = pos.includes('right') ? width - txtW - 24 : (width - txtW) / 2;
      const y = pos.startsWith('top') ? height - 22 : 16;
      page.drawText(label, { x, y, size: fSize, font, color: rgb(0.25, 0.3, 0.4) });
    }

    // Header & footer
    if (options.headerFooter) {
      const hfSize = Math.max(7, Math.min(18, options.headerFooter.fontSize || 9));
      if (options.headerFooter.headerText.trim()) {
        page.drawText(options.headerFooter.headerText.trim().slice(0, 110), {
          x: 24,
          y: height - 20,
          size: hfSize,
          font,
          color: rgb(0.3, 0.35, 0.45),
        });
      }
      if (options.headerFooter.footerText.trim()) {
        page.drawText(options.headerFooter.footerText.trim().slice(0, 110), {
          x: 24,
          y: 16,
          size: hfSize,
          font,
          color: rgb(0.3, 0.35, 0.45),
        });
      }
    }
  }

  // Text / Highlight / Annotation overlays
  for (const ov of options.textOverlays || []) {
    const targetIdx = Math.max(0, Math.min(pages.length - 1, ov.pageNumber - 1));
    const page = pages[targetIdx];
    if (!page || !ov.text.trim()) continue;
    const { width, height } = page.getSize();
    const fSize = Math.max(8, Math.min(48, ov.fontSize || 14));
    const x = Math.max(10, Math.min(width - 40, (ov.xPct / 100) * width));
    const y = Math.max(12, Math.min(height - 16, height - (ov.yPct / 100) * height));
    if (ov.highlightBox) {
      const wBox = Math.min(width - x - 10, Math.max(60, font.widthOfTextAtSize(ov.text, fSize) + 12));
      page.drawRectangle({
        x: x - 4,
        y: y - 4,
        width: wBox,
        height: fSize + 10,
        color: rgb(1, 0.96, 0.65),
        opacity: 0.75,
      });
    }
    page.drawText(ov.text.slice(0, 160), {
      x,
      y,
      size: fSize,
      font,
      color: parseHex(ov.colorHex),
    });
  }

  // Image / Ink signature overlays
  for (const imgOv of options.imageOverlays || []) {
    const targetIdx = Math.max(0, Math.min(pages.length - 1, imgOv.pageNumber - 1));
    const page = pages[targetIdx];
    if (!page || !imgOv.dataUrl) continue;
    const { width, height } = page.getSize();
    const base64 = imgOv.dataUrl.split(',')[1] || '';
    if (!base64) continue;
    const binStr = atob(base64);
    const bytes = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
    const embedded = imgOv.dataUrl.includes('image/png')
      ? await out.embedPng(bytes)
      : await out.embedJpg(bytes);
    const drawW = Math.max(24, (Math.max(5, Math.min(85, imgOv.widthPct)) / 100) * width);
    const drawH = (drawW * embedded.height) / Math.max(1, embedded.width);
    const x = Math.max(8, Math.min(width - drawW - 8, (imgOv.xPct / 100) * width));
    const y = Math.max(8, Math.min(height - drawH - 8, height - (imgOv.yPct / 100) * height - drawH));
    page.drawImage(embedded, { x, y, width: drawW, height: drawH });
  }

  return out.save();
}

export function downloadPdfUint8Array(bytes: Uint8Array, filename: string): void {
  const safeCopy = new Uint8Array(bytes);
  const blob = new Blob([safeCopy], { type: 'application/pdf' });
  downloadBlobFile(blob, filename, 'pdf');
}

export interface ParsedExcelWorkbook {
  fileName: string;
  sheetNames: string[];
  sheets: Record<string, string[][]>;
}

export async function parseExcelWorkbookInBrowser(file: File): Promise<ParsedExcelWorkbook> {
  const buf = await readFileAsArrayBufferSafe(file);
  const XLSX = await import('xlsx');
  const wb = XLSX.read(buf, { type: 'array' });
  const sheets: Record<string, string[][]> = {};
  for (const name of wb.SheetNames) {
    const ws = wb.Sheets[name];
    const aoa = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1 });
    sheets[name] = aoa.map((r) => (Array.isArray(r) ? r.map((c) => String(c ?? '')) : []));
  }
  return {
    fileName: file.name.replace(/\.[^.]+$/, '') || 'workbook',
    sheetNames: wb.SheetNames,
    sheets,
  };
}

export function sliceExcelByPrintArea(
  rows: string[][],
  printAreaSpec: string
): { columns: string[]; rows: string[][] } {
  if (rows.length === 0) return { columns: ['Empty Sheet'], rows: [] };
  const cleanSpec = printAreaSpec.trim().toUpperCase();
  const match = cleanSpec.match(/^([A-Z]+)(\d+):([A-Z]+)(\d+)$/);
  const colToIdx = (colStr: string) => {
    let n = 0;
    for (let i = 0; i < colStr.length; i++) {
      n = n * 26 + (colStr.charCodeAt(i) - 64);
    }
    return n - 1;
  };

  let rStart = 0;
  let rEnd = rows.length - 1;
  let cStart = 0;
  let cEnd = Math.max(0, ...rows.map((r) => r.length - 1));

  if (match) {
    cStart = Math.max(0, colToIdx(match[1]));
    rStart = Math.max(0, parseInt(match[2], 10) - 1);
    cEnd = Math.max(cStart, colToIdx(match[3]));
    rEnd = Math.min(rows.length - 1, Math.max(rStart, parseInt(match[4], 10) - 1));
  }

  const sliced = rows.slice(rStart, rEnd + 1).map((r) => {
    const out: string[] = [];
    for (let c = cStart; c <= cEnd; c++) out.push(r[c] ?? '');
    return out;
  });

  return {
    columns: sliced[0] || ['Column 1'],
    rows: sliced.slice(1),
  };
}

export async function parseDocxToPrintPayload(file: File): Promise<PrintExportPayload> {
  const buf = await readFileAsArrayBufferSafe(file);
  const mammoth = await import('mammoth');
  const res = await mammoth.extractRawText({ arrayBuffer: buf });
  const baseName = file.name.replace(/\.[^.]+$/, '') || 'word_document';
  const blocks = res.value
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);
  return {
    title: baseName,
    subtitle: 'Converted from Word (.docx) in Browser',
    sections:
      blocks.length > 0
        ? blocks.map((b, i) => ({
            heading: blocks.length > 1 ? `Section ${i + 1}` : 'Document Content',
            body: b,
          }))
        : [{ heading: 'Document Content', body: res.value || '' }],
    filename: baseName,
  };
}
