import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  AlignCenter,
  CheckCircle2,
  Download,
  FileSpreadsheet,
  FileText,
  Maximize2,
  Minimize2,
  Printer,
  RotateCw,
  Sliders,
  Upload,
  X,
} from 'lucide-react';
import {
  DEFAULT_PRINT_SETTINGS,
  PAPER_DIMENSIONS_MM,
  downloadDocumentAsDocx,
  downloadDocumentWithPrintSettingsPdf,
  downloadTableAsXlsx,
  getEffectivePaperDimensionsMm,
  type PdfSectionBlock,
  type PrintExportPayload,
  type PrintOrientation,
  type PrintPaperSize,
  type PrintScaleMode,
  type PrintSettingsConfig,
} from '../../utils/realFileExports';
import {
  printUniversalDocument,
  type UniversalPaperSize,
} from '../../utils/universalPdfPrintEngine';

export interface PrintPreviewStudioProps {
  initialPayload?: PrintExportPayload | null;
  onClose?: () => void;
  compactHeader?: boolean;
}

const DEFAULT_SAMPLE_PAYLOAD: PrintExportPayload = {
  title: 'Sample Print-Ready Academic Sheet',
  subtitle: 'Maharashtra Board · Class 5 · Mathematics Practice',
  metaLines: ['Prepared on MyStudyZone Print & Paper Studio', 'A4 Ready Layout'],
  sections: [
    {
      heading: 'Section A: Quick Instructions',
      body: '1. Select your target Paper Size (A4, A3, A5, Letter, Legal, or Custom mm).\n2. Adjust Orientation, Margins, and Scaling Mode to prevent table or text cut-off.\n3. Preview page breaks live, then click Direct Print or Download Settings-Matched PDF.',
    },
    {
      heading: 'Section B: Practice Problems',
      body: 'Q1. Write the Roman numeral for 49 and 94.\nQ2. Find the perimeter of a rectangle with length 14 cm and breadth 8 cm.\nQ3. Convert 3.75 litres into millilitres.',
    },
  ],
  filename: 'mystudyzone_print_sheet',
};

export const PrintPreviewStudio: React.FC<PrintPreviewStudioProps> = ({
  initialPayload,
  onClose,
  compactHeader = false,
}) => {
  const [payload, setPayload] = useState<PrintExportPayload>(
    initialPayload || DEFAULT_SAMPLE_PAYLOAD
  );
  const [settings, setSettings] = useState<PrintSettingsConfig>(DEFAULT_PRINT_SETTINGS);
  const [currentPreviewPage, setCurrentPreviewPage] = useState<number>(1);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [showMarginGuides, setShowMarginGuides] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialPayload) {
      setPayload(initialPayload);
      setCurrentPreviewPage(1);
    }
  }, [initialPayload]);

  const dims = useMemo(() => getEffectivePaperDimensionsMm(settings), [settings]);

  const usableWidthMm = Math.max(
    20,
    dims.widthMm - settings.marginsMm.left - settings.marginsMm.right
  );
  const usableHeightMm = Math.max(
    30,
    dims.heightMm - settings.marginsMm.top - settings.marginsMm.bottom
  );

  // Estimate paginated sections & detect potential overflow
  const layoutAnalysis = useMemo(() => {
    const scaleFactor =
      settings.scaleMode === 'custom'
        ? Math.max(0.4, Math.min(1.8, settings.customScalePct / 100))
        : settings.scaleMode === 'fit-page'
        ? 0.9
        : 1;

    const charsPerLine = Math.max(25, Math.floor((usableWidthMm / 2.2) / scaleFactor));
    const linesPerPage = Math.max(8, Math.floor((usableHeightMm - 28) / (5.0 * scaleFactor)));

    let estimatedLines = 5; // title + subtitle
    const sections = payload.sections || [];
    for (const sec of sections) {
      if (sec.heading) estimatedLines += 2;
      const bodyLines = String(sec.body || '').split('\n');
      for (const l of bodyLines) {
        estimatedLines += Math.max(1, Math.ceil(l.length / charsPerLine));
      }
      estimatedLines += 1;
    }

    if (payload.table && payload.table.rows.length > 0) {
      estimatedLines += 3 + payload.table.rows.length * 2;
    }
    if (payload.imageDataUrls && payload.imageDataUrls.length > 0) {
      estimatedLines += payload.imageDataUrls.length * Math.max(12, Math.floor(linesPerPage * 0.65));
    }

    const totalPages = Math.max(1, Math.ceil(estimatedLines / linesPerPage));
    const tableColumnOverflow = Boolean(
      payload.table &&
        payload.table.columns.length > 7 &&
        settings.orientation === 'portrait' &&
        settings.paperSize !== 'A3'
    );
    const extremeZoomOverflow =
      (settings.scaleMode === 'custom' && settings.customScalePct > 125) ||
      (settings.scaleMode === 'fit-page' && totalPages > 1);

    const overflowMessages: string[] = [];
    if (tableColumnOverflow) {
      overflowMessages.push(
        `Table has ${payload.table?.columns.length} columns — switch to Landscape or A3 to prevent narrow wrapping.`
      );
    }
    if (extremeZoomOverflow) {
      overflowMessages.push(
        settings.scaleMode === 'fit-page'
          ? `Content spans ~${totalPages} pages at standard font size; Fit-to-1-Page scale or Landscape/smaller margins may be needed.`
          : `Custom scale (${settings.customScalePct}%) may push content across extra pages or clip wide blocks.`
      );
    }
    if (settings.marginsMm.left + settings.marginsMm.right > dims.widthMm * 0.55) {
      overflowMessages.push('Left + right margins exceed 55% of paper width, leaving very narrow printable area.');
    }

    return {
      totalPages,
      scaleFactor,
      hasOverflowWarning: overflowMessages.length > 0,
      overflowMessages,
    };
  }, [payload, settings, usableWidthMm, usableHeightMm, dims.widthMm]);

  useEffect(() => {
    if (currentPreviewPage > layoutAnalysis.totalPages) {
      setCurrentPreviewPage(layoutAnalysis.totalPages);
    }
  }, [layoutAnalysis.totalPages, currentPreviewPage]);

  // Split sections cleanly for multi-page preview approximation
  const paginatedPreviewSections = useMemo((): PdfSectionBlock[] => {
    const all = payload.sections || [];
    if (layoutAnalysis.totalPages <= 1 || all.length <= 1) return all;
    const perPage = Math.max(1, Math.ceil(all.length / layoutAnalysis.totalPages));
    const start = (currentPreviewPage - 1) * perPage;
    const slice = all.slice(start, start + perPage);
    return slice.length > 0 ? slice : all.slice(0, perPage);
  }, [payload.sections, layoutAnalysis.totalPages, currentPreviewPage]);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError('');
    setUploadStatus('Reading file locally in browser...');
    try {
      if (file.size > 25 * 1024 * 1024) {
        throw new Error('File exceeds 25 MB browser processing limit.');
      }
      const lower = file.name.toLowerCase();
      const baseName = file.name.replace(/\.[^.]+$/, '');

      if (lower.endsWith('.txt') || lower.endsWith('.md') || lower.endsWith('.csv')) {
        const text = await file.text();
        if (lower.endsWith('.csv')) {
          const lines = text
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean);
          const rows = lines.map((l) => l.split(',').map((c) => c.trim()));
          setPayload({
            title: baseName,
            subtitle: `Imported CSV Spreadsheet (${rows.length} rows)`,
            table: {
              columns: rows[0] || ['Column 1'],
              rows: rows.slice(1),
            },
            filename: baseName,
          });
        } else {
          setPayload({
            title: baseName,
            subtitle: 'Imported Text Document',
            sections: [{ heading: 'Document Content', body: text }],
            filename: baseName,
          });
        }
        setUploadStatus(`Loaded "${file.name}" ready for print adjustment.`);
      } else if (lower.endsWith('.docx')) {
        const mammoth = await import('mammoth');
        const buf = await file.arrayBuffer();
        const res = await mammoth.extractRawText({ arrayBuffer: buf });
        const paragraphs = res.value
          .split(/\n{2,}/)
          .map((p) => p.trim())
          .filter(Boolean);
        setPayload({
          title: baseName,
          subtitle: 'Imported Word Document (.docx)',
          sections:
            paragraphs.length > 0
              ? [{ heading: 'Document Body', body: paragraphs.join('\n\n') }]
              : [{ heading: 'Document Body', body: res.value || '(Empty document)' }],
          filename: baseName,
        });
        setUploadStatus(`Loaded Word document "${file.name}" (${res.value.length} chars).`);
      } else if (lower.endsWith('.xlsx') || lower.endsWith('.xls')) {
        const XLSX = await import('xlsx');
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: 'array' });
        const firstSheet = wb.SheetNames[0];
        const ws = wb.Sheets[firstSheet];
        const aoa = XLSX.utils.sheet_to_json<unknown[]>(ws, { header: 1 });
        const normalized = aoa.map((r) => (Array.isArray(r) ? r.map((c) => String(c ?? '')) : []));
        const cols = normalized[0]?.length ? normalized[0] : ['Col 1'];
        setPayload({
          title: baseName,
          subtitle: `Excel Sheet: ${firstSheet} (${Math.max(0, normalized.length - 1)} rows)`,
          table: {
            columns: cols,
            rows: normalized.slice(1, 200),
          },
          filename: baseName,
        });
        setUploadStatus(`Loaded Excel sheet "${firstSheet}" from "${file.name}".`);
      } else if (file.type.startsWith('image/')) {
        const dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || ''));
          reader.onerror = () => reject(new Error('Could not read image.'));
          reader.readAsDataURL(file);
        });
        setPayload({
          title: baseName,
          subtitle: 'Image Print Layout',
          imageDataUrls: [dataUrl],
          filename: baseName,
        });
        setUploadStatus(`Loaded image "${file.name}" for paper sizing & print.`);
      } else if (lower.endsWith('.pdf')) {
        const pdfjsLib = await import('pdfjs-dist');
        const workerMod = await import('pdfjs-dist/build/pdf.worker.min.mjs?url');
        pdfjsLib.GlobalWorkerOptions.workerSrc = workerMod.default;
        const buf = await file.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: buf }).promise;
        const maxPages = Math.min(pdfDoc.numPages, 6);
        const pageImgs: string[] = [];
        for (let p = 1; p <= maxPages; p++) {
          const page = await pdfDoc.getPage(p);
          const vp = page.getViewport({ scale: 1.4 });
          const canvas = document.createElement('canvas');
          canvas.width = vp.width;
          canvas.height = vp.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            await page.render({ canvas, canvasContext: ctx, viewport: vp }).promise;
            pageImgs.push(canvas.toDataURL('image/jpeg', 0.9));
          }
        }
        setPayload({
          title: baseName,
          subtitle: `PDF Print Preparation (${maxPages} of ${pdfDoc.numPages} page${pdfDoc.numPages === 1 ? '' : 's'})`,
          imageDataUrls: pageImgs,
          filename: `${baseName}_print`,
        });
        setUploadStatus(`Rendered ${maxPages} PDF page(s) from "${file.name}" into print studio.`);
      } else {
        throw new Error('Supported files: PDF, DOCX, XLSX, CSV, TXT, MD, JPG, PNG, WebP.');
      }
      setCurrentPreviewPage(1);
    } catch (err: any) {
      setUploadError(String(err?.message || 'Could not load file into Print Preview Studio.'));
      setUploadStatus('');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const applyMarginPreset = (preset: 'normal' | 'narrow' | 'wide') => {
    const val = preset === 'narrow' ? 8 : preset === 'wide' ? 24 : 14;
    setSettings((prev) => ({
      ...prev,
      marginsMm: { top: val, right: val, bottom: val, left: val },
    }));
  };

  const handleAutoFit = () => {
    setSettings((prev) => ({
      ...prev,
      orientation:
        payload.table && payload.table.columns.length > 6 ? 'landscape' : prev.orientation,
      scaleMode: 'fit-page',
      customScalePct: 88,
      marginsMm: { top: 10, right: 10, bottom: 10, left: 10 },
      trimWhitespace: true,
    }));
  };

  const handleDirectPrint = () => {
    const mappedPaper: UniversalPaperSize = (
      ['A4', 'A3', 'Legal', 'Letter', 'A5'].includes(settings.paperSize)
        ? settings.paperSize
        : 'A4'
    ) as UniversalPaperSize;

    printUniversalDocument(
      {
        title: payload.title || 'MyStudyZone Print Sheet',
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
        includeHeaderFooter: true,
        includePageNumbers: settings.showPageNumbers,
      }
    );
  };

  const handleDownloadPdf = () => {
    downloadDocumentWithPrintSettingsPdf(payload, settings);
  };

  const handleDownloadDocx = async () => {
    setIsExporting(true);
    try {
      await downloadDocumentAsDocx({
        title: payload.title,
        subtitle: payload.subtitle,
        metaLines: payload.metaLines,
        sections: payload.sections,
        table: payload.table,
        filename: payload.filename || payload.title,
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadXlsx = async () => {
    if (!payload.table) return;
    setIsExporting(true);
    try {
      await downloadTableAsXlsx({
        sheetName: 'PrintSheet',
        columns: payload.table.columns,
        rows: payload.table.rows,
        filename: payload.filename || payload.title,
      });
    } finally {
      setIsExporting(false);
    }
  };

  // Visual preview paper scaling (px representation preserving aspect ratio)
  const previewMaxWidthPx = 600;
  const pxPerMm = Math.min(previewMaxWidthPx / dims.widthMm, 3.0);
  const paperPxW = Math.round(dims.widthMm * pxPerMm);
  const paperPxH = Math.round(dims.heightMm * pxPerMm);

  return (
    <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
      {/* Studio Top Bar */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-indigo-300">
            Browser-Side Print &amp; Paper Adjustment Engine · Zero Server Uploads
          </p>
          <h2 className="text-lg sm:text-xl font-display font-bold">
            {compactHeader ? payload.title : 'Professional Print Preview & Paper Adjustment Studio'}
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.xlsx,.xls,.csv,.txt,.md,image/*"
            onChange={handleUploadFile}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Load File (PDF / DOCX / XLSX / Image)</span>
          </button>

          <button
            type="button"
            onClick={handleDirectPrint}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Now</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Print-Matched PDF</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Print Preview"
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {(uploadStatus || uploadError) && (
        <div
          className={`px-4 py-2.5 text-xs font-medium border-b ${
            uploadError
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-900 border-emerald-200'
          }`}
        >
          {uploadError || uploadStatus}
        </div>
      )}

      {/* Main Split Controls + Live Scaled Paper Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 p-4 sm:p-5 items-start">
        {/* Left Control Panel */}
        <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-indigo-600" />
              <span>Page &amp; Paper Controls</span>
            </span>
            <span className="text-[11px] font-semibold text-slate-500 tabular-nums">
              {dims.widthMm} × {dims.heightMm} mm
            </span>
          </div>

          {/* Paper Size */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Paper Size</label>
            <select
              value={settings.paperSize}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, paperSize: e.target.value as PrintPaperSize }))
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
            >
              {Object.entries(PAPER_DIMENSIONS_MM).map(([key, info]) => (
                <option key={key} value={key}>
                  {info.label}
                </option>
              ))}
              <option value="Custom">Custom Size (mm)</option>
            </select>
          </div>

          {settings.paperSize === 'Custom' && (
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Width (mm)</label>
                <input
                  type="number"
                  min={50}
                  max={1000}
                  value={settings.customWidthMm}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      customWidthMm: Number(e.target.value) || 210,
                    }))
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Height (mm)</label>
                <input
                  type="number"
                  min={50}
                  max={1400}
                  value={settings.customHeightMm}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      customHeightMm: Number(e.target.value) || 297,
                    }))
                  }
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
              </div>
            </div>
          )}

          {/* Orientation */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Orientation</label>
            <div className="grid grid-cols-2 gap-2">
              {(['portrait', 'landscape'] as PrintOrientation[]).map((ori) => (
                <button
                  key={ori}
                  type="button"
                  onClick={() => setSettings((prev) => ({ ...prev, orientation: ori }))}
                  className={`py-2 px-3 rounded-xl border font-bold capitalize flex items-center justify-center gap-1.5 cursor-pointer ${
                    settings.orientation === ori
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>{ori}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scaling */}
          <div className="space-y-2">
            <label className="block font-semibold text-slate-700">Scaling &amp; Fit</label>
            <select
              value={settings.scaleMode}
              onChange={(e) =>
                setSettings((prev) => ({ ...prev, scaleMode: e.target.value as PrintScaleMode }))
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
            >
              <option value="fit-page">Fit to 1 Page</option>
              <option value="fit-width">Fit to Page Width</option>
              <option value="fit-height">Fit to Page Height</option>
              <option value="actual">Actual Size (100%)</option>
              <option value="custom">Custom Scale (%)</option>
            </select>
            {settings.scaleMode === 'custom' && (
              <div>
                <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                  <span>Scale Percentage</span>
                  <span className="tabular-nums">{settings.customScalePct}%</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={180}
                  value={settings.customScalePct}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      customScalePct: Number(e.target.value),
                    }))
                  }
                  className="w-full accent-indigo-600"
                />
              </div>
            )}
          </div>

          {/* Margins */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-700">Margins (mm)</label>
              <div className="flex gap-1">
                {(['narrow', 'normal', 'wide'] as const).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => applyMarginPreset(preset)}
                    className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-[10px] font-bold capitalize cursor-pointer"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <div key={side}>
                  <span className="block text-[10px] text-slate-500 capitalize mb-0.5">{side}</span>
                  <input
                    type="number"
                    min={4}
                    max={60}
                    value={settings.marginsMm[side]}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        marginsMm: {
                          ...prev.marginsMm,
                          [side]: Math.max(4, Math.min(60, Number(e.target.value) || 4)),
                        },
                      }))
                    }
                    className="w-full px-2 py-1 rounded-lg border border-slate-300 tabular-nums"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Layout Enhancements */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.trimWhitespace}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, trimWhitespace: e.target.checked }))
                }
                className="rounded accent-indigo-600"
              />
              <span className="font-medium text-slate-700 flex items-center gap-1">
                <Minimize2 className="w-3.5 h-3.5 text-slate-500" />
                Trim Extra Whitespace &amp; Blank Gaps
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.centerContent}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, centerContent: e.target.checked }))
                }
                className="rounded accent-indigo-600"
              />
              <span className="font-medium text-slate-700 flex items-center gap-1">
                <AlignCenter className="w-3.5 h-3.5 text-slate-500" />
                Center Content on Paper
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.showPageNumbers}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, showPageNumbers: e.target.checked }))
                }
                className="rounded accent-indigo-600"
              />
              <span className="font-medium text-slate-700">Show Page Numbers (Page X of Y)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showMarginGuides}
                onChange={(e) => setShowMarginGuides(e.target.checked)}
                className="rounded accent-indigo-600"
              />
              <span className="font-medium text-slate-700">Show Printable Margin Guides</span>
            </label>
          </div>

          {/* Header & Footer Text */}
          <div className="space-y-2 pt-1 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Running Header</label>
              <input
                type="text"
                value={settings.headerText}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, headerText: e.target.value }))
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Running Footer</label>
              <input
                type="text"
                value={settings.footerText}
                onChange={(e) =>
                  setSettings((prev) => ({ ...prev, footerText: e.target.value }))
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
              />
            </div>
          </div>

          {/* Quick Editable Title / Additional Formats */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block font-semibold text-slate-700">Document Title</label>
            <input
              type="text"
              value={payload.title}
              onChange={(e) => setPayload((prev) => ({ ...prev, title: e.target.value }))}
              className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
            />
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                disabled={isExporting}
                onClick={() => void handleDownloadDocx()}
                className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-blue-700" />
                <span>DOCX</span>
              </button>
              {payload.table && (
                <button
                  type="button"
                  disabled={isExporting}
                  onClick={() => void handleDownloadXlsx()}
                  className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                  <span>XLSX</span>
                </button>
              )}
            </div>
          </div>
        </aside>

        {/* Right Scaled Sheet Preview & Overflow Detection */}
        <section className="lg:col-span-8 space-y-4">
          {/* Overflow Warning or Clean Status Bar */}
          {layoutAnalysis.hasOverflowWarning ? (
            <div className="rounded-xl bg-amber-50 border border-amber-300 p-3.5 text-xs text-amber-950 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Layout Overflow / Cut-Off Warning</div>
                  <ul className="list-disc pl-4 mt-0.5 space-y-0.5">
                    {layoutAnalysis.overflowMessages.map((msg, i) => (
                      <li key={i}>{msg}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutoFit}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-black cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Auto-Fit Layout</span>
              </button>
            </div>
          ) : (
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 text-xs text-emerald-900 flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Clean Fit · Printable Area {Math.round(usableWidthMm)} × {Math.round(usableHeightMm)} mm · Estimated {layoutAnalysis.totalPages} page{layoutAnalysis.totalPages === 1 ? '' : 's'}
              </span>
              {layoutAnalysis.totalPages > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={currentPreviewPage <= 1}
                    onClick={() => setCurrentPreviewPage((p) => Math.max(1, p - 1))}
                    className="px-2 py-0.5 rounded bg-white border border-emerald-300 disabled:opacity-40 font-bold cursor-pointer"
                  >
                    Prev
                  </button>
                  <span className="tabular-nums font-bold">
                    Page {currentPreviewPage} / {layoutAnalysis.totalPages}
                  </span>
                  <button
                    type="button"
                    disabled={currentPreviewPage >= layoutAnalysis.totalPages}
                    onClick={() =>
                      setCurrentPreviewPage((p) => Math.min(layoutAnalysis.totalPages, p + 1))
                    }
                    className="px-2 py-0.5 rounded bg-white border border-emerald-300 disabled:opacity-40 font-bold cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Live Paper Sheet Canvas */}
          <div className="bg-slate-200/80 rounded-2xl p-4 sm:p-6 overflow-x-auto flex justify-center">
            <div
              id="msz-print-preview-printable"
              style={{
                width: `${paperPxW}px`,
                minHeight: `${paperPxH}px`,
                paddingTop: `${Math.round(settings.marginsMm.top * pxPerMm)}px`,
                paddingRight: `${Math.round(settings.marginsMm.right * pxPerMm)}px`,
                paddingBottom: `${Math.round(settings.marginsMm.bottom * pxPerMm)}px`,
                paddingLeft: `${Math.round(settings.marginsMm.left * pxPerMm)}px`,
              }}
              className="bg-white shadow-xl border border-slate-300 relative flex flex-col justify-between shrink-0"
            >
              {/* Margin Guide Box Overlay (hidden on print) */}
              {showMarginGuides && (
                <div
                  style={{
                    top: `${Math.round(settings.marginsMm.top * pxPerMm)}px`,
                    right: `${Math.round(settings.marginsMm.right * pxPerMm)}px`,
                    bottom: `${Math.round(settings.marginsMm.bottom * pxPerMm)}px`,
                    left: `${Math.round(settings.marginsMm.left * pxPerMm)}px`,
                  }}
                  className="pointer-events-none absolute border border-dashed border-sky-300 no-print"
                />
              )}

              <div
                style={{
                  transform: `scale(${Math.min(1.25, Math.max(0.65, layoutAnalysis.scaleFactor))})`,
                  transformOrigin: settings.centerContent ? 'top center' : 'top left',
                }}
                className={`space-y-3 ${settings.centerContent ? 'text-center' : 'text-left'}`}
              >
                {settings.headerText.trim() && (
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-200 pb-1">
                    {settings.headerText}
                  </div>
                )}

                <div>
                  <h3 className="text-base font-bold text-slate-900">{payload.title}</h3>
                  {payload.subtitle && (
                    <p className="text-xs text-slate-600 mt-0.5">{payload.subtitle}</p>
                  )}
                  {payload.metaLines && payload.metaLines.length > 0 && (
                    <p className="text-[10px] font-semibold text-slate-500 mt-1">
                      {payload.metaLines.join('  |  ')}
                    </p>
                  )}
                </div>

                {payload.imageDataUrls && payload.imageDataUrls.length > 0 && (
                  <div className="space-y-2">
                    {payload.imageDataUrls.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Print page ${idx + 1}`}
                        className="max-w-full max-h-[380px] object-contain mx-auto border border-slate-100"
                      />
                    ))}
                  </div>
                )}

                {payload.table && payload.table.columns.length > 0 && (
                  <div className="overflow-hidden border border-slate-300 rounded">
                    <table className="w-full border-collapse text-[10px]">
                      <thead>
                        <tr className="bg-slate-900 text-white">
                          {payload.table.columns.map((c, ci) => (
                            <th key={ci} className="px-2 py-1 text-left font-bold border border-slate-700">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {payload.table.rows.slice(0, 35).map((r, ri) => (
                          <tr key={ri} className={ri % 2 === 1 ? 'bg-slate-50' : 'bg-white'}>
                            {payload.table!.columns.map((_, ci) => (
                              <td key={ci} className="px-2 py-1 border border-slate-200 text-slate-800">
                                {r[ci] ?? ''}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {payload.table.rows.length > 35 && (
                      <div className="bg-slate-100 text-[10px] text-slate-600 px-2 py-1 text-center">
                        Showing first 35 rows in preview — all {payload.table.rows.length} rows export to PDF/XLSX cleanly.
                      </div>
                    )}
                  </div>
                )}

                {paginatedPreviewSections.map((sec, i) => (
                  <div key={i} className="space-y-1">
                    {sec.heading && (
                      <h4 className="text-xs font-bold text-indigo-900">{sec.heading}</h4>
                    )}
                    <div className="text-[11px] leading-relaxed text-slate-700 whitespace-pre-wrap">
                      {settings.trimWhitespace ? sec.body.replace(/\n{3,}/g, '\n\n').trim() : sec.body}
                    </div>
                  </div>
                ))}
              </div>

              {(settings.footerText.trim() || settings.showPageNumbers) && (
                <div className="pt-2 mt-4 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>{settings.footerText}</span>
                  {settings.showPageNumbers && (
                    <span className="tabular-nums">
                      Page {currentPreviewPage} of {layoutAnalysis.totalPages}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
