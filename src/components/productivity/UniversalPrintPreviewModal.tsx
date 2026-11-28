import React, { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Printer,
  X,
} from 'lucide-react';
import {
  UNIVERSAL_PAPER_MM,
  downloadUniversalPdf,
  normalizeUniversalPaperSize,
  printUniversalDocument,
  renderUniversalPdfPages,
  type RenderedUniversalPage,
  type UniversalOrientation,
  type UniversalPaperSize,
  type UniversalPdfDocument,
} from '../../utils/universalPdfPrintEngine';

export interface UniversalPrintPreviewModalProps {
  isOpen?: boolean;
  documentPayload?: UniversalPdfDocument | null;
  document?: UniversalPdfDocument | null;
  defaultPaperSize?: UniversalPaperSize;
  defaultOrientation?: UniversalOrientation;
  onClose: () => void;
}

export const UniversalPrintPreviewModal: React.FC<UniversalPrintPreviewModalProps> = ({
  isOpen,
  documentPayload,
  document: docProp,
  defaultPaperSize = 'A4',
  defaultOrientation = 'portrait',
  onClose,
}) => {
  const activeDoc = documentPayload ?? docProp ?? null;
  const modalOpen = (isOpen ?? true) && Boolean(activeDoc);

  const [paperSize, setPaperSize] = useState<UniversalPaperSize>(defaultPaperSize);
  const [orientation, setOrientation] = useState<UniversalOrientation>(defaultOrientation);
  const [fontScale, setFontScale] = useState<number>(1);
  const [pages, setPages] = useState<RenderedUniversalPage[]>([]);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  useEffect(() => {
    setPaperSize(defaultPaperSize);
  }, [defaultPaperSize, modalOpen]);

  useEffect(() => {
    setOrientation(defaultOrientation);
  }, [defaultOrientation, modalOpen]);

  useEffect(() => {
    if (!modalOpen || !activeDoc) return;
    let active = true;
    setIsRendering(true);
    setFeedback('');

    renderUniversalPdfPages(activeDoc, {
      paperSize,
      orientation,
      fontScale,
      includeHeaderFooter: true,
      includePageNumbers: true,
    })
      .then((res) => {
        if (active) {
          setPages(res.pages);
        }
      })
      .catch(() => {
        if (active) setPages([]);
      })
      .finally(() => {
        if (active) setIsRendering(false);
      });

    return () => {
      active = false;
    };
  }, [modalOpen, activeDoc, paperSize, orientation, fontScale]);

  if (!modalOpen || !activeDoc) return null;

  const handleDownload = async () => {
    setIsDownloading(true);
    setFeedback('');
    try {
      const info = await downloadUniversalPdf(activeDoc, {
        paperSize,
        orientation,
        fontScale,
        includeHeaderFooter: true,
        includePageNumbers: true,
      });
      setFeedback(`Downloaded ${info.filename} (${info.totalPages} ${info.totalPages === 1 ? 'page' : 'pages'}, ${paperSize} ${orientation}).`);
    } catch {
      setFeedback('Could not generate PDF file in this browser.');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    printUniversalDocument(activeDoc, {
      paperSize,
      orientation,
      fontScale,
      includeHeaderFooter: true,
      includePageNumbers: true,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5 no-print"
      role="dialog"
      aria-modal="true"
      aria-label="MyStudyZone Print & PDF Preview"
    >
      <div className="bg-white rounded-3xl w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top Bar */}
        <div className="px-4 sm:px-6 py-3.5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-black truncate">
                Print &amp; PDF Preview — {activeDoc.title}
              </h2>
              <p className="text-[11px] text-slate-300 truncate">
                {UNIVERSAL_PAPER_MM[normalizeUniversalPaperSize(paperSize)].label} ·{' '}
                {orientation === 'landscape' ? 'Landscape' : 'Portrait'} ·{' '}
                {pages.length} {pages.length === 1 ? 'page' : 'pages'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading || isRendering}
              className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white text-xs font-black inline-flex items-center gap-1.5 cursor-pointer"
            >
              {isDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close preview"
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Settings Strip */}
        <div className="px-4 sm:px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <label className="font-bold text-slate-700 inline-flex items-center gap-1.5">
              <span>Paper:</span>
              <select
                value={paperSize}
                onChange={(e) => setPaperSize(e.target.value as UniversalPaperSize)}
                className="px-2.5 py-1 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 cursor-pointer"
              >
                <option value="A4">A4 (Default)</option>
                <option value="A3">A3</option>
                <option value="Legal">Legal</option>
                <option value="Letter">Letter</option>
                <option value="A5">A5</option>
              </select>
            </label>

            <div className="inline-flex rounded-lg border border-slate-300 bg-white p-0.5 font-bold">
              <button
                type="button"
                onClick={() => setOrientation('portrait')}
                className={`px-2.5 py-1 rounded-md cursor-pointer ${
                  orientation === 'portrait'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Portrait
              </button>
              <button
                type="button"
                onClick={() => setOrientation('landscape')}
                className={`px-2.5 py-1 rounded-md cursor-pointer ${
                  orientation === 'landscape'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                Landscape
              </button>
            </div>

            <label className="font-bold text-slate-700 inline-flex items-center gap-1.5">
              <span>Text Size:</span>
              <select
                value={fontScale}
                onChange={(e) => setFontScale(Number(e.target.value))}
                className="px-2 py-1 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 cursor-pointer"
              >
                <option value={0.9}>Compact (90%)</option>
                <option value={1}>Standard (100%)</option>
                <option value={1.15}>Large (115%)</option>
              </select>
            </label>
          </div>

          {feedback && (
            <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{feedback}</span>
            </span>
          )}
        </div>

        {/* Live Multi-Page Visual Preview (1:1 PDF Match) */}
        <div className="flex-1 overflow-y-auto bg-slate-200/80 p-4 sm:p-6 space-y-5">
          {isRendering ? (
            <div className="py-16 flex flex-col items-center justify-center gap-3 text-slate-600">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
              <p className="text-xs font-bold">
                Rendering {paperSize} {orientation} pages with Unicode &amp; Devanagari support...
              </p>
            </div>
          ) : pages.length === 0 ? (
            <div className="p-8 bg-white rounded-2xl text-center text-xs text-slate-600">
              No preview pages could be generated.
            </div>
          ) : (
            pages.map((p) => (
              <div key={p.pageNumber} className="max-w-4xl mx-auto space-y-1.5">
                <div className="text-[11px] font-bold text-slate-600 px-1">
                  Page {p.pageNumber} of {pages.length}
                </div>
                <div className="bg-white rounded-xl shadow-lg border border-slate-300 overflow-hidden">
                  <img
                    src={p.dataUrl}
                    alt={`${activeDoc.title} — Page ${p.pageNumber}`}
                    className="w-full h-auto block"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
