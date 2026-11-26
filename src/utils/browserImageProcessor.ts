import { jsPDF } from 'jspdf';
import { downloadBlobFile, sanitizeFilename } from './realFileExports';

export const MAX_IMAGE_FILE_BYTES = 15 * 1024 * 1024;

export interface LoadedBrowserImage {
  name: string;
  originalBytes: number;
  width: number;
  height: number;
  mimeType: string;
  dataUrl: string;
  element: HTMLImageElement;
}

export type ImageOutputMime = 'image/jpeg' | 'image/png' | 'image/webp';

export function formatBytesHuman(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export async function loadImageFileInBrowser(file: File): Promise<LoadedBrowserImage> {
  if (file.size > MAX_IMAGE_FILE_BYTES) {
    throw new Error(`Image size (${formatBytesHuman(file.size)}) exceeds the 15 MB browser limit.`);
  }
  if (!file.type.startsWith('image/')) {
    throw new Error('Please upload a valid image file (JPG, PNG, WebP, BMP).');
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.readAsDataURL(file);
  });

  const element = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to decode image pixels.'));
    img.src = dataUrl;
  });

  return {
    name: file.name.replace(/\.[^.]+$/, '') || 'image',
    originalBytes: file.size,
    width: element.naturalWidth,
    height: element.naturalHeight,
    mimeType: file.type,
    dataUrl,
    element,
  };
}

function canvasToBlob(canvas: HTMLCanvasElement, mime: ImageOutputMime, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => {
        if (b) resolve(b);
        else reject(new Error('Canvas encoding failed.'));
      },
      mime,
      mime === 'image/png' ? undefined : Math.max(0.05, Math.min(1, quality))
    );
  });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Failed to convert blob to preview URL.'));
    reader.readAsDataURL(blob);
  });
}

export function removeBackgroundOnCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  tolerance: number,
  replacementHex: string | 'transparent'
): void {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;
  if (data.length < 4) return;

  // Sample average of 4 corners as background key
  const sampleCoords = [
    [0, 0],
    [width - 1, 0],
    [0, height - 1],
    [width - 1, height - 1],
  ];
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;
  for (const [sx, sy] of sampleCoords) {
    const idx = (sy * width + sx) * 4;
    rSum += data[idx];
    gSum += data[idx + 1];
    bSum += data[idx + 2];
  }
  const bgR = rSum / 4;
  const bgG = gSum / 4;
  const bgB = bSum / 4;

  let repR = 255;
  let repG = 255;
  let repB = 255;
  if (replacementHex !== 'transparent' && /^#[0-9A-Fa-f]{6}$/.test(replacementHex)) {
    repR = parseInt(replacementHex.slice(1, 3), 16);
    repG = parseInt(replacementHex.slice(3, 5), 16);
    repB = parseInt(replacementHex.slice(5, 7), 16);
  }

  const maxDist = Math.max(12, Math.min(180, tolerance * 1.8));
  for (let i = 0; i < data.length; i += 4) {
    const dr = data[i] - bgR;
    const dg = data[i + 1] - bgG;
    const db = data[i + 2] - bgB;
    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
    if (dist <= maxDist) {
      const feather = Math.max(0, Math.min(1, (dist - maxDist * 0.65) / (maxDist * 0.35)));
      if (replacementHex === 'transparent') {
        data[i + 3] = Math.round(data[i + 3] * feather);
      } else {
        data[i] = Math.round(repR * (1 - feather) + data[i] * feather);
        data[i + 1] = Math.round(repG * (1 - feather) + data[i + 1] * feather);
        data[i + 2] = Math.round(repB * (1 - feather) + data[i + 2] * feather);
      }
    }
  }
  ctx.putImageData(imgData, 0, 0);
}

export interface ResizeImageParams {
  source: LoadedBrowserImage;
  mode: 'target_size' | 'pixels' | 'percentage';
  targetKb: number;
  widthPx: number;
  heightPx: number;
  percentage: number;
  outputMime: ImageOutputMime;
  quality: number; // 0.1..1
  removeBackground: boolean;
  bgTolerance: number;
  bgReplacement: string | 'transparent';
}

export interface ProcessedImageResult {
  blob: Blob;
  dataUrl: string;
  width: number;
  height: number;
  bytes: number;
  mimeType: ImageOutputMime;
  ext: 'jpg' | 'png' | 'webp';
}

function getExtFromMime(mime: ImageOutputMime): 'jpg' | 'png' | 'webp' {
  if (mime === 'image/png') return 'png';
  if (mime === 'image/webp') return 'webp';
  return 'jpg';
}

export async function processImageResizeAndConvert(
  params: ResizeImageParams
): Promise<ProcessedImageResult> {
  const { source } = params;
  const effectiveMime: ImageOutputMime =
    params.removeBackground && params.bgReplacement === 'transparent' && params.outputMime === 'image/jpeg'
      ? 'image/png'
      : params.outputMime;

  const renderAtScale = async (w: number, h: number, q: number): Promise<Blob> => {
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(16, Math.round(w));
    canvas.height = Math.max(16, Math.round(h));
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D canvas not available.');
    if (effectiveMime === 'image/jpeg') {
      ctx.fillStyle = params.bgReplacement !== 'transparent' ? params.bgReplacement : '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(source.element, 0, 0, canvas.width, canvas.height);
    if (params.removeBackground) {
      removeBackgroundOnCanvas(ctx, canvas.width, canvas.height, params.bgTolerance, params.bgReplacement);
    }
    return canvasToBlob(canvas, effectiveMime, q);
  };

  let outW = source.width;
  let outH = source.height;
  let blob: Blob;

  if (params.mode === 'pixels') {
    outW = Math.max(16, Math.min(8000, Math.round(params.widthPx) || source.width));
    outH = Math.max(16, Math.min(8000, Math.round(params.heightPx) || source.height));
    blob = await renderAtScale(outW, outH, params.quality);
  } else if (params.mode === 'percentage') {
    const factor = Math.max(0.05, Math.min(4, params.percentage / 100));
    outW = Math.max(16, Math.round(source.width * factor));
    outH = Math.max(16, Math.round(source.height * factor));
    blob = await renderAtScale(outW, outH, params.quality);
  } else {
    // Target KB/MB mode: binary search quality, then proportionally scale dimensions if needed
    const targetBytes = Math.max(5 * 1024, Math.round(params.targetKb * 1024));
    let scale = 1;
    let bestBlob = await renderAtScale(outW, outH, params.quality);

    if (bestBlob.size > targetBytes) {
      if (effectiveMime !== 'image/png') {
        let low = 0.08;
        let high = 0.95;
        for (let iter = 0; iter < 8; iter++) {
          const mid = (low + high) / 2;
          const candidate = await renderAtScale(outW, outH, mid);
          if (candidate.size <= targetBytes) {
            bestBlob = candidate;
            low = mid;
          } else {
            high = mid;
          }
        }
      }
      // If still larger than targetBytes, reduce dimensions iteratively
      let safety = 0;
      while (bestBlob.size > targetBytes && safety < 10 && outW > 64 && outH > 64) {
        scale *= Math.max(0.55, Math.min(0.88, Math.sqrt(targetBytes / bestBlob.size) * 0.95));
        outW = Math.max(48, Math.round(source.width * scale));
        outH = Math.max(48, Math.round(source.height * scale));
        bestBlob = await renderAtScale(outW, outH, effectiveMime === 'image/png' ? 1 : 0.72);
        safety++;
      }
    }
    blob = bestBlob;
  }

  const dataUrl = await blobToDataUrl(blob);
  return {
    blob,
    dataUrl,
    width: outW,
    height: outH,
    bytes: blob.size,
    mimeType: effectiveMime,
    ext: getExtFromMime(effectiveMime),
  };
}

export interface PassportPreset {
  id: string;
  label: string;
  countrySpec: string;
  widthMm: number;
  heightMm: number;
}

export const PASSPORT_PRESETS: PassportPreset[] = [
  { id: 'in_passport', label: 'India Passport (35 × 45 mm)', countrySpec: 'India / MEA Official 35×45mm', widthMm: 35, heightMm: 45 },
  { id: 'in_visa_2x2', label: 'US / Visa / OCI (51 × 51 mm)', countrySpec: 'US / India OCI 2×2 inch', widthMm: 51, heightMm: 51 },
  { id: 'eu_uk', label: 'UK / EU Schengen (35 × 45 mm)', countrySpec: 'UK / Schengen Visa 35×45mm', widthMm: 35, heightMm: 45 },
  { id: 'std_id', label: 'Standard ID Card (35 × 45 mm)', countrySpec: 'Standard Govt/Exam ID', widthMm: 35, heightMm: 45 },
  { id: 'school_id', label: 'School ID Stamp (25 × 30 mm)', countrySpec: 'School Identity Card', widthMm: 25, heightMm: 30 },
  { id: 'college_id', label: 'College ID Card (30 × 40 mm)', countrySpec: 'College / Institute ID', widthMm: 30, heightMm: 40 },
  { id: 'custom', label: 'Custom Dimensions (mm)', countrySpec: 'Custom mm Size', widthMm: 35, heightMm: 45 },
];

export interface PassportRenderOptions {
  source: LoadedBrowserImage;
  widthMm: number;
  heightMm: number;
  zoom: number; // 0.8..2.6
  panX: number; // -50..50 %
  panY: number; // -50..50 %
  rotateDeg: number; // -15..15
  bgColor: string; // hex
  cleanBackground: boolean;
  bgTolerance: number;
  copiesOnSheet: number; // 4, 6, 8, 12, 20
}

export async function renderPassportPhotoAndSheet(opts: PassportRenderOptions): Promise<{
  singleDataUrl: string;
  singleBlob: Blob;
  singleWidthPx: number;
  singleHeightPx: number;
  sheetDataUrl: string;
}> {
  // 300 DPI conversion: 1 inch = 25.4mm
  const pxPerMm = 300 / 25.4;
  const wPx = Math.max(120, Math.round(opts.widthMm * pxPerMm));
  const hPx = Math.max(120, Math.round(opts.heightMm * pxPerMm));

  const singleCanvas = document.createElement('canvas');
  singleCanvas.width = wPx;
  singleCanvas.height = hPx;
  const ctx = singleCanvas.getContext('2d');
  if (!ctx) throw new Error('Canvas unavailable.');

  ctx.fillStyle = opts.bgColor || '#ffffff';
  ctx.fillRect(0, 0, wPx, hPx);

  // Optional cleaned source canvas if background replacement requested
  let drawSource: CanvasImageSource = opts.source.element;
  if (opts.cleanBackground) {
    const tmp = document.createElement('canvas');
    tmp.width = opts.source.width;
    tmp.height = opts.source.height;
    const tCtx = tmp.getContext('2d');
    if (tCtx) {
      tCtx.drawImage(opts.source.element, 0, 0);
      removeBackgroundOnCanvas(tCtx, tmp.width, tmp.height, opts.bgTolerance, opts.bgColor || '#ffffff');
      drawSource = tmp;
    }
  }

  const baseScale = Math.max(wPx / opts.source.width, hPx / opts.source.height);
  const drawW = opts.source.width * baseScale * opts.zoom;
  const drawH = opts.source.height * baseScale * opts.zoom;
  const offsetX = (opts.panX / 100) * wPx;
  const offsetY = (opts.panY / 100) * hPx;

  ctx.save();
  ctx.translate(wPx / 2 + offsetX, hPx / 2 + offsetY);
  ctx.rotate((opts.rotateDeg * Math.PI) / 180);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(drawSource, -drawW / 2, -drawH / 2, drawW, drawH);
  ctx.restore();

  const singleBlob = await canvasToBlob(singleCanvas, 'image/jpeg', 0.94);
  const singleDataUrl = await blobToDataUrl(singleBlob);

  // Build A4 Printable Sheet preview canvas (1240 x 1754 px = 150 DPI A4)
  const a4W = 1240;
  const a4H = 1754;
  const a4Canvas = document.createElement('canvas');
  a4Canvas.width = a4W;
  a4Canvas.height = a4H;
  const sCtx = a4Canvas.getContext('2d');
  if (!sCtx) throw new Error('Sheet canvas unavailable.');
  sCtx.fillStyle = '#ffffff';
  sCtx.fillRect(0, 0, a4W, a4H);

  const pxPerMmPreview = a4W / 210;
  const cellW = Math.round(opts.widthMm * pxPerMmPreview);
  const cellH = Math.round(opts.heightMm * pxPerMmPreview);
  const gap = Math.round(5 * pxPerMmPreview);
  const margin = Math.round(12 * pxPerMmPreview);
  const cols = Math.max(1, Math.floor((a4W - margin * 2 + gap) / (cellW + gap)));

  let placed = 0;
  for (let r = 0; placed < opts.copiesOnSheet; r++) {
    const y = margin + r * (cellH + gap);
    if (y + cellH > a4H - margin) break;
    for (let c = 0; c < cols && placed < opts.copiesOnSheet; c++) {
      const x = margin + c * (cellW + gap);
      sCtx.drawImage(singleCanvas, x, y, cellW, cellH);
      sCtx.strokeStyle = '#94a3b8';
      sCtx.lineWidth = 1.5;
      sCtx.strokeRect(x, y, cellW, cellH);
      placed++;
    }
  }

  sCtx.fillStyle = '#475569';
  sCtx.font = 'bold 20px sans-serif';
  sCtx.fillText(
    `MyStudyZone Passport / ID Sheet (${opts.widthMm}x${opts.heightMm}mm · ${placed} copies)`,
    margin,
    a4H - 28
  );

  const sheetDataUrl = a4Canvas.toDataURL('image/jpeg', 0.92);
  return {
    singleDataUrl,
    singleBlob,
    singleWidthPx: wPx,
    singleHeightPx: hPx,
    sheetDataUrl,
  };
}

export function downloadPassportSheetAsPdf(
  singleDataUrl: string,
  widthMm: number,
  heightMm: number,
  copiesOnSheet: number,
  filename = 'passport_photo_sheet'
): void {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageW = 210;
  const pageH = 297;
  const margin = 12;
  const gap = 5;
  const cols = Math.max(1, Math.floor((pageW - margin * 2 + gap) / (widthMm + gap)));

  let placed = 0;
  for (let r = 0; placed < copiesOnSheet; r++) {
    const y = margin + r * (heightMm + gap);
    if (y + heightMm > pageH - margin) {
      doc.addPage();
      r = -1;
      continue;
    }
    for (let c = 0; c < cols && placed < copiesOnSheet; c++) {
      const x = margin + c * (widthMm + gap);
      doc.addImage(singleDataUrl, 'JPEG', x, y, widthMm, heightMm);
      doc.setDrawColor(160, 170, 185);
      doc.setLineWidth(0.2);
      doc.rect(x, y, widthMm, heightMm);
      placed++;
    }
  }
  doc.save(sanitizeFilename(filename, 'pdf'));
}

export interface ImageEditorParams {
  source: LoadedBrowserImage;
  cropTopPct: number;
  cropRightPct: number;
  cropBottomPct: number;
  cropLeftPct: number;
  rotateDeg: number;
  flipH: boolean;
  flipV: boolean;
  brightness: number; // -100..100
  contrast: number; // -100..100
  sharpness: number; // 0..100
  clarity: number; // 0..100
  autoTrimMargins: boolean;
  outputMime: ImageOutputMime;
  quality: number;
}

function applyUnsharpConvolution(ctx: CanvasRenderingContext2D, w: number, h: number, amount: number): void {
  if (amount <= 0) return;
  const strength = Math.min(1.2, (amount / 100) * 0.9);
  const src = ctx.getImageData(0, 0, w, h);
  const dst = ctx.createImageData(w, h);
  const s = src.data;
  const d = dst.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const idx = (y * w + x) * 4;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) {
        d[idx] = s[idx];
        d[idx + 1] = s[idx + 1];
        d[idx + 2] = s[idx + 2];
        d[idx + 3] = s[idx + 3];
        continue;
      }
      for (let c = 0; c < 3; c++) {
        const center = s[idx + c];
        const neighbors =
          (s[((y - 1) * w + x) * 4 + c] +
            s[((y + 1) * w + x) * 4 + c] +
            s[(y * w + (x - 1)) * 4 + c] +
            s[(y * w + (x + 1)) * 4 + c]) *
          0.25;
        const sharpened = center + (center - neighbors) * strength * 2.2;
        d[idx + c] = Math.max(0, Math.min(255, Math.round(sharpened)));
      }
      d[idx + 3] = s[idx + 3];
    }
  }
  ctx.putImageData(dst, 0, 0);
}

function trimUniformCanvasMargins(sourceCanvas: HTMLCanvasElement): HTMLCanvasElement {
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  const ctx = sourceCanvas.getContext('2d');
  if (!ctx || w < 20 || h < 20) return sourceCanvas;
  const imgData = ctx.getImageData(0, 0, w, h).data;
  const bgR = imgData[0];
  const bgG = imgData[1];
  const bgB = imgData[2];
  const isBg = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    if (imgData[i + 3] < 20) return true;
    return (
      Math.abs(imgData[i] - bgR) < 18 &&
      Math.abs(imgData[i + 1] - bgG) < 18 &&
      Math.abs(imgData[i + 2] - bgB) < 18
    );
  };

  let top = 0;
  let bottom = h - 1;
  let left = 0;
  let right = w - 1;

  while (top < bottom) {
    let rowUniform = true;
    for (let x = 0; x < w; x += 2) {
      if (!isBg(x, top)) {
        rowUniform = false;
        break;
      }
    }
    if (!rowUniform) break;
    top++;
  }
  while (bottom > top) {
    let rowUniform = true;
    for (let x = 0; x < w; x += 2) {
      if (!isBg(x, bottom)) {
        rowUniform = false;
        break;
      }
    }
    if (!rowUniform) break;
    bottom--;
  }
  while (left < right) {
    let colUniform = true;
    for (let y = top; y <= bottom; y += 2) {
      if (!isBg(left, y)) {
        colUniform = false;
        break;
      }
    }
    if (!colUniform) break;
    left++;
  }
  while (right > left) {
    let colUniform = true;
    for (let y = top; y <= bottom; y += 2) {
      if (!isBg(right, y)) {
        colUniform = false;
        break;
      }
    }
    if (!colUniform) break;
    right--;
  }

  const trimmedW = Math.max(16, right - left + 1);
  const trimmedH = Math.max(16, bottom - top + 1);
  if (trimmedW >= w - 4 && trimmedH >= h - 4) return sourceCanvas;

  const out = document.createElement('canvas');
  out.width = trimmedW;
  out.height = trimmedH;
  const outCtx = out.getContext('2d');
  if (outCtx) {
    outCtx.drawImage(sourceCanvas, left, top, trimmedW, trimmedH, 0, 0, trimmedW, trimmedH);
  }
  return out;
}

export async function processImageEditor(params: ImageEditorParams): Promise<ProcessedImageResult> {
  const { source } = params;
  const sx = Math.round((Math.max(0, Math.min(45, params.cropLeftPct)) / 100) * source.width);
  const sy = Math.round((Math.max(0, Math.min(45, params.cropTopPct)) / 100) * source.height);
  const sw = Math.max(
    16,
    source.width - sx - Math.round((Math.max(0, Math.min(45, params.cropRightPct)) / 100) * source.width)
  );
  const sh = Math.max(
    16,
    source.height - sy - Math.round((Math.max(0, Math.min(45, params.cropBottomPct)) / 100) * source.height)
  );

  const rad = (params.rotateDeg * Math.PI) / 180;
  const absCos = Math.abs(Math.cos(rad));
  const absSin = Math.abs(Math.sin(rad));
  const canvasW = Math.max(16, Math.round(sw * absCos + sh * absSin));
  const canvasH = Math.max(16, Math.round(sw * absSin + sh * absCos));

  let canvas = document.createElement('canvas');
  canvas.width = canvasW;
  canvas.height = canvasH;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas unavailable.');

  if (params.outputMime === 'image/jpeg') {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasW, canvasH);
  }

  const effectiveContrast = 100 + params.contrast + params.clarity * 0.35;
  const effectiveBrightness = 100 + params.brightness;
  const effectiveSaturate = 100 + params.clarity * 0.2;
  ctx.filter = `brightness(${Math.max(20, effectiveBrightness)}%) contrast(${Math.max(20, effectiveContrast)}%) saturate(${effectiveSaturate}%)`;

  ctx.save();
  ctx.translate(canvasW / 2, canvasH / 2);
  ctx.rotate(rad);
  ctx.scale(params.flipH ? -1 : 1, params.flipV ? -1 : 1);
  ctx.drawImage(source.element, sx, sy, sw, sh, -sw / 2, -sh / 2, sw, sh);
  ctx.restore();
  ctx.filter = 'none';

  if (params.sharpness > 0) {
    applyUnsharpConvolution(ctx, canvas.width, canvas.height, params.sharpness);
  }
  if (params.autoTrimMargins) {
    canvas = trimUniformCanvasMargins(canvas);
  }

  const blob = await canvasToBlob(canvas, params.outputMime, params.quality);
  const dataUrl = await blobToDataUrl(blob);
  return {
    blob,
    dataUrl,
    width: canvas.width,
    height: canvas.height,
    bytes: blob.size,
    mimeType: params.outputMime,
    ext: getExtFromMime(params.outputMime),
  };
}

export function downloadProcessedImage(res: ProcessedImageResult, baseName: string): void {
  downloadBlobFile(res.blob, baseName, res.ext);
}
