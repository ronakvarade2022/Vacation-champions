import React, { useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Crop,
  Download,
  FilePlus2,
  FileSpreadsheet,
  FileText,
  Hash,
  Image as ImageIcon,
  Layers,
  Minimize2,
  PenTool,
  Printer,
  RotateCw,
  Scissors,
  Split,
  Trash2,
  Type as TypeIcon,
  Upload,
} from 'lucide-react';
import {
  DEFAULT_PRINT_SETTINGS,
  downloadDocumentAsDocx,
  downloadDocumentWithPrintSettingsPdf,
  downloadPlainTextFile,
  downloadTableAsXlsx,
  type PrintExportPayload,
  type PrintSettingsConfig,
} from '../../utils/realFileExports';
import {
  compressPdfBuffer,
  downloadPdfUint8Array,
  extractPdfTablesHeuristic,
  extractPdfTextPerPage,
  mergePdfBuffers,
  parseDocxToPrintPayload,
  parseExcelWorkbookInBrowser,
  parsePageRangeList,
  readFileAsArrayBufferSafe,
  renderPdfPagesToImages,
  sliceExcelByPrintArea,
  splitPdfBySpecs,
  transformPdfPages,
  type ParsedExcelWorkbook,
  type RenderedPdfPageThumbnail,
} from '../../utils/browserPdfOfficeTools';
import { formatBytesHuman } from '../../utils/browserImageProcessor';

export type PdfOfficeToolId =
  | 'word_to_pdf'
  | 'pdf_to_word'
  | 'excel_to_pdf'
  | 'pdf_to_excel'
  | 'images_to_pdf'
  | 'pdf_to_images'
  | 'merge_pdf'
  | 'split_pdf'
  | 'compress_pdf'
  | 'rotate_pdf'
  | 'rearrange_pdf'
  | 'delete_pages_pdf'
  | 'extract_pages_pdf'
  | 'page_numbers_pdf'
  | 'header_footer_pdf'
  | 'crop_pdf'
  | 'annotate_pdf'
  | 'overlay_pdf'
  | 'print_prep_pdf'
  | 'word_excel_utilities';

interface ToolCardMeta {
  id: PdfOfficeToolId;
  num: number;
  label: string;
  desc: string;
  group: 'Convert' | 'Organize' | 'Edit & Print' | 'Word & Excel';
  icon: React.ComponentType<{ className?: string }>;
}

const PDF_OFFICE_TOOLS: ToolCardMeta[] = [
  { id: 'word_to_pdf', num: 1, label: 'Word to PDF', desc: '.docx → clean A4 PDF & Print Preview', group: 'Convert', icon: FileText },
  { id: 'pdf_to_word', num: 2, label: 'PDF to Editable Word', desc: 'Extract text into editable .docx', group: 'Convert', icon: FileText },
  { id: 'excel_to_pdf', num: 3, label: 'Excel to PDF', desc: '.xlsx/.csv sheet & area → PDF', group: 'Convert', icon: FileSpreadsheet },
  { id: 'pdf_to_excel', num: 4, label: 'PDF to Excel (.xlsx)', desc: 'Extract tabular rows into editable .xlsx', group: 'Convert', icon: FileSpreadsheet },
  { id: 'images_to_pdf', num: 5, label: 'Images to PDF', desc: 'Combine & reorder JPG/PNG into PDF', group: 'Convert', icon: ImageIcon },
  { id: 'pdf_to_images', num: 6, label: 'PDF to Images', desc: 'Render PDF pages as PNG or JPG', group: 'Convert', icon: ImageIcon },
  { id: 'merge_pdf', num: 7, label: 'Merge PDF', desc: 'Combine multiple PDFs in chosen order', group: 'Organize', icon: Layers },
  { id: 'split_pdf', num: 8, label: 'Split PDF', desc: 'Split every N pages, range, or single pages', group: 'Organize', icon: Split },
  { id: 'compress_pdf', num: 9, label: 'Compress PDF', desc: 'Reduce PDF byte size (Low/Med/High)', group: 'Organize', icon: Minimize2 },
  { id: 'rotate_pdf', num: 10, label: 'Rotate PDF', desc: 'Rotate all or selected pages 90°/180°/270°', group: 'Organize', icon: RotateCw },
  { id: 'rearrange_pdf', num: 11, label: 'Rearrange PDF Pages', desc: 'Visual page thumbnail reordering', group: 'Organize', icon: Layers },
  { id: 'delete_pages_pdf', num: 12, label: 'Delete PDF Pages', desc: 'Remove unwanted pages cleanly', group: 'Organize', icon: Trash2 },
  { id: 'extract_pages_pdf', num: 13, label: 'Extract PDF Pages', desc: 'Save chosen pages into a new PDF', group: 'Organize', icon: FilePlus2 },
  { id: 'page_numbers_pdf', num: 14, label: 'Add Page Numbers', desc: 'Stamp Page X of Y onto PDF pages', group: 'Edit & Print', icon: Hash },
  { id: 'header_footer_pdf', num: 15, label: 'Add Headers & Footers', desc: 'Add custom running headers & footers', group: 'Edit & Print', icon: TypeIcon },
  { id: 'crop_pdf', num: 16, label: 'PDF Page Cropping', desc: 'Trim Top/Right/Bottom/Left PDF margins', group: 'Edit & Print', icon: Crop },
  { id: 'annotate_pdf', num: 17, label: 'PDF Edit & Annotate', desc: 'Draw ink signature, highlights & notes', group: 'Edit & Print', icon: PenTool },
  { id: 'overlay_pdf', num: 18, label: 'Add Text & Images to PDF', desc: 'Place text stamps & image seals on PDF', group: 'Edit & Print', icon: Scissors },
  { id: 'print_prep_pdf', num: 19, label: 'PDF Print Preparation', desc: 'Send PDF straight to Paper & Print Studio', group: 'Edit & Print', icon: Printer },
  { id: 'word_excel_utilities', num: 20, label: 'Excel & Word Print Utilities', desc: 'Sheet selector, print area, scaling & styling', group: 'Word & Excel', icon: FileSpreadsheet },
];

export interface PdfOfficeStudioProps {
  onOpenPrintPreview?: (payload: PrintExportPayload) => void;
}

export const PdfOfficeStudio: React.FC<PdfOfficeStudioProps> = ({ onOpenPrintPreview }) => {
  const [selectedTool, setSelectedTool] = useState<PdfOfficeToolId>('merge_pdf');
  const [statusMsg, setStatusMsg] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [busy, setBusy] = useState<boolean>(false);

  // Single PDF state (for page-level tools 2,4,6,8-19)
  const [singlePdfName, setSinglePdfName] = useState<string>('');
  const [singlePdfBytes, setSinglePdfBytes] = useState<ArrayBuffer | null>(null);
  const [singlePdfSize, setSinglePdfSize] = useState<number>(0);
  const [pdfThumbnails, setPdfThumbnails] = useState<RenderedPdfPageThumbnail[]>([]);

  // Multi-PDF merge list
  const [mergeList, setMergeList] = useState<Array<{ id: string; name: string; bytes: ArrayBuffer; size: number }>>([]);

  // Multi-Image list
  const [imageList, setImageList] = useState<Array<{ id: string; name: string; dataUrl: string }>>([]);

  // PDF -> Editable Word / Text state
  const [extractedWordTitle, setExtractedWordTitle] = useState<string>('');
  const [extractedWordBody, setExtractedWordBody] = useState<string>('');

  // PDF -> Excel / Excel -> PDF state
  const [parsedWorkbook, setParsedWorkbook] = useState<ParsedExcelWorkbook | null>(null);
  const [selectedSheetName, setSelectedSheetName] = useState<string>('');
  const [excelPrintArea, setExcelPrintArea] = useState<string>('');
  const [tableData, setTableData] = useState<{ columns: string[]; rows: string[][] } | null>(null);
  const [excelPdfSettings, setExcelPdfSettings] = useState<PrintSettingsConfig>(DEFAULT_PRINT_SETTINGS);

  // Word -> PDF state
  const [wordPayload, setWordPayload] = useState<PrintExportPayload | null>(null);

  // Split / Compress / Rotate / Extract / Delete / Rearrange states
  const [splitMode, setSplitMode] = useState<'every_n' | 'ranges' | 'single_pages'>('every_n');
  const [splitEveryN, setSplitEveryN] = useState<number>(2);
  const [splitRangesText, setSplitRangesText] = useState<string>('1-2; 3-4');
  const [splitOutputs, setSplitOutputs] = useState<Array<{ name: string; bytes: Uint8Array }>>([]);

  const [compressLevel, setCompressLevel] = useState<'lossless' | 'medium' | 'high'>('medium');
  const [compressedStats, setCompressedStats] = useState<{ origBytes: number; newBytes: number } | null>(null);

  const [rotateDeg, setRotateDeg] = useState<number>(90);
  const [rotatePagesSpec, setRotatePagesSpec] = useState<string>('ALL');

  const [pageOrder, setPageOrder] = useState<number[]>([]);
  const [deletedPages, setDeletedPages] = useState<Record<number, boolean>>({});
  const [extractSpec, setExtractSpec] = useState<string>('1-2');

  // Page numbers, headers/footers, crop
  const [pnPosition, setPnPosition] = useState<'bottom-center' | 'bottom-right' | 'top-center' | 'top-right'>('bottom-center');
  const [pnFontSize, setPnFontSize] = useState<number>(10);
  const [hfHeader, setHfHeader] = useState<string>('MyStudyZone Academic Document');
  const [hfFooter, setHfFooter] = useState<string>('Prepared on mystudyzone.in');
  const [hfFontSize, setHfFontSize] = useState<number>(9);
  const [cropVals, setCropVals] = useState({ top: 5, right: 5, bottom: 5, left: 5 });

  // Annotation & Text/Image Overlay states
  const [ovPageNum, setOvPageNum] = useState<number>(1);
  const [ovText, setOvText] = useState<string>('Approved · MyStudyZone');
  const [ovXPct, setOvXPct] = useState<number>(12);
  const [ovYPct, setOvYPct] = useState<number>(15);
  const [ovFontSize, setOvFontSize] = useState<number>(14);
  const [ovColor, setOvColor] = useState<string>('#1E3A8A');
  const [ovHighlight, setOvHighlight] = useState<boolean>(false);
  const [ovImageUrl, setOvImageUrl] = useState<string>('');
  const [ovImgWidthPct, setOvImgWidthPct] = useState<number>(22);
  const sigCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawingSig, setIsDrawingSig] = useState<boolean>(false);
  const [sigDataUrl, setSigDataUrl] = useState<string>('');

  const [pdfImgFormat, setPdfImgFormat] = useState<'image/png' | 'image/jpeg'>('image/png');
  const [pdfImgScale, setPdfImgScale] = useState<number>(1.5);

  const resetFeedback = () => {
    setStatusMsg('');
    setErrorMsg('');
  };

  const loadSinglePdf = async (file: File) => {
    resetFeedback();
    setBusy(true);
    try {
      const buf = await readFileAsArrayBufferSafe(file);
      const rendered = await renderPdfPagesToImages(buf, { scale: 0.75, mime: 'image/jpeg', quality: 0.8 });
      setSinglePdfName(file.name.replace(/\.[^.]+$/, '') || 'document');
      setSinglePdfBytes(buf);
      setSinglePdfSize(file.size);
      setPdfThumbnails(rendered.pages);
      setPageOrder(rendered.pages.map((p) => p.pageNumber));
      setDeletedPages({});
      setSplitOutputs([]);
      setCompressedStats(null);
      setStatusMsg(`Loaded "${file.name}" (${rendered.totalPages} pages, ${formatBytesHuman(file.size)}).`);

      // Automatic helpful pre-extractions when in PDF->Word or PDF->Excel
      if (selectedTool === 'pdf_to_word') {
        const perPage = await extractPdfTextPerPage(buf);
        setExtractedWordTitle(file.name.replace(/\.[^.]+$/, ''));
        setExtractedWordBody(
          perPage.map((p) => `--- Page ${p.pageNumber} ---\n${p.lines.join('\n')}`).join('\n\n')
        );
      } else if (selectedTool === 'pdf_to_excel') {
        const tbl = await extractPdfTablesHeuristic(buf);
        setTableData(tbl);
      }
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Could not load PDF file.'));
    } finally {
      setBusy(false);
    }
  };

  const handleToolSelect = async (toolId: PdfOfficeToolId) => {
    setSelectedTool(toolId);
    resetFeedback();
    if (singlePdfBytes) {
      if (toolId === 'pdf_to_word' && !extractedWordBody) {
        setBusy(true);
        try {
          const perPage = await extractPdfTextPerPage(singlePdfBytes);
          setExtractedWordTitle(singlePdfName);
          setExtractedWordBody(perPage.map((p) => `--- Page ${p.pageNumber} ---\n${p.lines.join('\n')}`).join('\n\n'));
        } finally {
          setBusy(false);
        }
      } else if (toolId === 'pdf_to_excel' && !tableData) {
        setBusy(true);
        try {
          const tbl = await extractPdfTablesHeuristic(singlePdfBytes);
          setTableData(tbl);
        } finally {
          setBusy(false);
        }
      }
    }
  };

  const handleUploadWord = async (file: File) => {
    resetFeedback();
    setBusy(true);
    try {
      const payload = await parseDocxToPrintPayload(file);
      setWordPayload(payload);
      setStatusMsg(`Loaded Word file "${file.name}" (${payload.sections?.length || 0} sections).`);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Could not read .docx file.'));
    } finally {
      setBusy(false);
    }
  };

  const handleUploadExcel = async (file: File) => {
    resetFeedback();
    setBusy(true);
    try {
      const wb = await parseExcelWorkbookInBrowser(file);
      setParsedWorkbook(wb);
      const first = wb.sheetNames[0] || '';
      setSelectedSheetName(first);
      const sliced = sliceExcelByPrintArea(wb.sheets[first] || [], '');
      setTableData(sliced);
      setStatusMsg(`Loaded "${file.name}" (${wb.sheetNames.length} sheet${wb.sheetNames.length === 1 ? '' : 's'}).`);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Could not parse spreadsheet file.'));
    } finally {
      setBusy(false);
    }
  };

  const handleUploadMergePdfs = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    resetFeedback();
    setBusy(true);
    try {
      const added: Array<{ id: string; name: string; bytes: ArrayBuffer; size: number }> = [];
      for (const f of Array.from(files)) {
        const buf = await readFileAsArrayBufferSafe(f);
        added.push({ id: `${Date.now()}_${Math.random()}`, name: f.name, bytes: buf, size: f.size });
      }
      setMergeList((prev) => [...prev, ...added]);
      setStatusMsg(`Added ${added.length} PDF file(s) to merge queue.`);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Failed to read PDF files.'));
    } finally {
      setBusy(false);
    }
  };

  const handleUploadImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    resetFeedback();
    try {
      const added: Array<{ id: string; name: string; dataUrl: string }> = [];
      for (const f of Array.from(files)) {
        if (!f.type.startsWith('image/')) continue;
        const url = await new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(String(r.result || ''));
          r.onerror = () => reject(new Error('Image read failed'));
          r.readAsDataURL(f);
        });
        added.push({ id: `${Date.now()}_${Math.random()}`, name: f.name, dataUrl: url });
      }
      setImageList((prev) => [...prev, ...added]);
      setStatusMsg(`Added ${added.length} image(s) to PDF queue.`);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Failed to load images.'));
    }
  };

  const handleRunPdfTransformAndDownload = async (mode: 'rotate' | 'rearrange' | 'delete' | 'extract' | 'pn' | 'hf' | 'crop' | 'annotate' | 'overlay') => {
    if (!singlePdfBytes) {
      setErrorMsg('Please upload a PDF file first.');
      return;
    }
    resetFeedback();
    setBusy(true);
    try {
      const total = pdfThumbnails.length;
      let resultBytes: Uint8Array;

      if (mode === 'rotate') {
        const pages =
          rotatePagesSpec.trim().toUpperCase() === 'ALL'
            ? Array.from({ length: total }, (_, i) => i + 1)
            : parsePageRangeList(rotatePagesSpec, total);
        const rotMap: Record<number, number> = {};
        pages.forEach((p) => {
          rotMap[p] = rotateDeg;
        });
        resultBytes = await transformPdfPages(singlePdfBytes, { rotations: rotMap });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_rotated`);
      } else if (mode === 'rearrange') {
        resultBytes = await transformPdfPages(singlePdfBytes, { pageOrder });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_rearranged`);
      } else if (mode === 'delete') {
        const kept = pageOrder.filter((p) => !deletedPages[p]);
        if (kept.length === 0) throw new Error('At least 1 page must remain in the PDF.');
        resultBytes = await transformPdfPages(singlePdfBytes, { pageOrder: kept });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_cleaned`);
      } else if (mode === 'extract') {
        const extracted = parsePageRangeList(extractSpec, total);
        if (extracted.length === 0) throw new Error('Enter valid page numbers/ranges like 1, 3-5.');
        resultBytes = await transformPdfPages(singlePdfBytes, { pageOrder: extracted });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_extracted`);
      } else if (mode === 'pn') {
        resultBytes = await transformPdfPages(singlePdfBytes, {
          pageNumbers: { enabled: true, position: pnPosition, fontSize: pnFontSize },
        });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_numbered`);
      } else if (mode === 'hf') {
        resultBytes = await transformPdfPages(singlePdfBytes, {
          headerFooter: { headerText: hfHeader, footerText: hfFooter, fontSize: hfFontSize },
        });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_header_footer`);
      } else if (mode === 'crop') {
        resultBytes = await transformPdfPages(singlePdfBytes, { cropPct: cropVals });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_cropped`);
      } else if (mode === 'annotate') {
        resultBytes = await transformPdfPages(singlePdfBytes, {
          textOverlays: ovText.trim()
            ? [
                {
                  pageNumber: ovPageNum,
                  text: ovText,
                  xPct: ovXPct,
                  yPct: ovYPct,
                  fontSize: ovFontSize,
                  colorHex: ovColor,
                  highlightBox: ovHighlight,
                },
              ]
            : [],
          imageOverlays: sigDataUrl
            ? [{ pageNumber: ovPageNum, dataUrl: sigDataUrl, xPct: ovXPct, yPct: Math.min(82, ovYPct + 8), widthPct: ovImgWidthPct }]
            : [],
        });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_annotated`);
      } else {
        resultBytes = await transformPdfPages(singlePdfBytes, {
          textOverlays: ovText.trim()
            ? [
                {
                  pageNumber: ovPageNum,
                  text: ovText,
                  xPct: ovXPct,
                  yPct: ovYPct,
                  fontSize: ovFontSize,
                  colorHex: ovColor,
                },
              ]
            : [],
          imageOverlays: ovImageUrl
            ? [{ pageNumber: ovPageNum, dataUrl: ovImageUrl, xPct: ovXPct, yPct: Math.min(82, ovYPct + 10), widthPct: ovImgWidthPct }]
            : [],
        });
        downloadPdfUint8Array(resultBytes, `${singlePdfName}_edited`);
      }

      setStatusMsg('Processed PDF successfully and started download.');
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'PDF processing failed.'));
    } finally {
      setBusy(false);
    }
  };

  const activeToolMeta = PDF_OFFICE_TOOLS.find((t) => t.id === selectedTool) || PDF_OFFICE_TOOLS[0];
  const needsSinglePdfUpload = ![
    'word_to_pdf',
    'excel_to_pdf',
    'images_to_pdf',
    'merge_pdf',
    'word_excel_utilities',
  ].includes(selectedTool);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left 20-Tool Navigation */}
      <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-2 max-h-[680px] overflow-y-auto">
        <div className="px-2 pb-2 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">19 PDF + Office Utilities</h3>
          <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
            Browser-Only
          </span>
        </div>

        <div className="space-y-1">
          {PDF_OFFICE_TOOLS.map((tool) => {
            const Icon = tool.icon;
            const active = selectedTool === tool.id;
            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => void handleToolSelect(tool.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-colors cursor-pointer flex items-start gap-2.5 ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    active ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-indigo-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold truncate">
                      {tool.num}. {tool.label}
                    </span>
                    <span
                      className={`text-[10px] font-semibold ${
                        active ? 'text-indigo-100' : 'text-slate-400'
                      }`}
                    >
                      {tool.group}
                    </span>
                  </div>
                  <p className={`text-[11px] truncate ${active ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {tool.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Workbench */}
      <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-5 text-xs">
        <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              {activeToolMeta.group} Tool #{activeToolMeta.num}
            </span>
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">
              {activeToolMeta.label}
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">{activeToolMeta.desc}</p>
          </div>

          {needsSinglePdfUpload && (
            <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>{singlePdfBytes ? 'Change PDF' : 'Upload PDF (Max 25 MB)'}</span>
              <input
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void loadSinglePdf(f);
                  e.target.value = '';
                }}
                className="hidden"
              />
            </label>
          )}
        </div>

        {(errorMsg || statusMsg) && (
          <div
            className={`p-3 rounded-xl border font-semibold flex items-center gap-2 ${
              errorMsg
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            {errorMsg ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{errorMsg || statusMsg}</span>
          </div>
        )}

        {busy && (
          <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold">
            Processing document locally in browser...
          </div>
        )}

        {/* 1. WORD -> PDF */}
        {selectedTool === 'word_to_pdf' && (
          <div className="space-y-4">
            <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Upload Word File (.docx)</span>
              <input
                type="file"
                accept=".docx"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) void handleUploadWord(f);
                  e.target.value = '';
                }}
                className="hidden"
              />
            </label>
            {wordPayload && (
              <div className="space-y-3 border border-slate-200 rounded-xl p-4 bg-slate-50">
                <input
                  type="text"
                  value={wordPayload.title}
                  onChange={(e) => setWordPayload((p) => (p ? { ...p, title: e.target.value } : p))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold"
                />
                <div className="max-h-60 overflow-y-auto bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-wrap text-slate-700">
                  {(wordPayload.sections || []).map((s) => s.body).join('\n\n')}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => downloadDocumentWithPrintSettingsPdf(wordPayload, DEFAULT_PRINT_SETTINGS)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download PDF
                  </button>
                  {onOpenPrintPreview && (
                    <button
                      type="button"
                      onClick={() => onOpenPrintPreview(wordPayload)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> Open Print &amp; Paper Setup
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. PDF -> EDITABLE WORD */}
        {selectedTool === 'pdf_to_word' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <strong>Format Fidelity Note:</strong> Browser-side PDF → Word extracts clean text blocks and page order into an editable <code>.docx</code> document; complex multi-column desktop graphics may simplify during conversion.
            </div>
            {singlePdfBytes && (
              <>
                <input
                  type="text"
                  value={extractedWordTitle}
                  onChange={(e) => setExtractedWordTitle(e.target.value)}
                  placeholder="Word Document Title"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold"
                />
                <textarea
                  rows={10}
                  value={extractedWordBody}
                  onChange={(e) => setExtractedWordBody(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      void downloadDocumentAsDocx({
                        title: extractedWordTitle || singlePdfName,
                        sections: [{ heading: 'Extracted Document Content', body: extractedWordBody }],
                        filename: `${singlePdfName}_editable`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Editable Word (.docx)
                  </button>
                  <button
                    type="button"
                    onClick={() => downloadPlainTextFile(extractedWordBody, `${singlePdfName}_text`, 'txt')}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    TXT
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* 3 & 20. EXCEL -> PDF & WORD/EXCEL PRINT UTILITIES */}
        {(selectedTool === 'excel_to_pdf' || selectedTool === 'word_excel_utilities') && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Excel / CSV (.xlsx, .xls, .csv)</span>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void handleUploadExcel(f);
                    e.target.value = '';
                  }}
                  className="hidden"
                />
              </label>
              <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Word (.docx)</span>
                <input
                  type="file"
                  accept=".docx"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) void handleUploadWord(f);
                    e.target.value = '';
                  }}
                  className="hidden"
                />
              </label>
            </div>

            {parsedWorkbook && tableData && (
              <div className="space-y-3 border border-slate-200 rounded-xl p-4 bg-slate-50">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Sheet</label>
                    <select
                      value={selectedSheetName}
                      onChange={(e) => {
                        const sName = e.target.value;
                        setSelectedSheetName(sName);
                        setTableData(sliceExcelByPrintArea(parsedWorkbook.sheets[sName] || [], excelPrintArea));
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                    >
                      {parsedWorkbook.sheetNames.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Print Area (e.g. A1:F20)</label>
                    <div className="flex gap-1">
                      <input
                        type="text"
                        value={excelPrintArea}
                        onChange={(e) => setExcelPrintArea(e.target.value)}
                        placeholder="Full sheet or A1:F20"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setTableData(
                            sliceExcelByPrintArea(parsedWorkbook.sheets[selectedSheetName] || [], excelPrintArea)
                          )
                        }
                        className="px-2.5 rounded-lg bg-slate-900 text-white font-bold cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Orientation &amp; Paper</label>
                    <div className="flex gap-1">
                      <select
                        value={excelPdfSettings.orientation}
                        onChange={(e) =>
                          setExcelPdfSettings((p) => ({ ...p, orientation: e.target.value as any }))
                        }
                        className="flex-1 px-2 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                      >
                        <option value="portrait">Portrait</option>
                        <option value="landscape">Landscape</option>
                      </select>
                      <select
                        value={excelPdfSettings.paperSize}
                        onChange={(e) =>
                          setExcelPdfSettings((p) => ({ ...p, paperSize: e.target.value as any }))
                        }
                        className="flex-1 px-2 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold"
                      >
                        <option value="A4">A4</option>
                        <option value="A3">A3</option>
                        <option value="Letter">Letter</option>
                        <option value="Legal">Legal</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-56 bg-white border border-slate-200 rounded-lg">
                  <table className="w-full border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        {tableData.columns.map((c, i) => (
                          <th key={i} className="px-2 py-1 text-left border border-slate-700">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.rows.slice(0, 20).map((r, ri) => (
                        <tr key={ri} className={ri % 2 === 1 ? 'bg-slate-50' : ''}>
                          {tableData.columns.map((_, ci) => (
                            <td key={ci} className="px-2 py-1 border border-slate-200">
                              {r[ci] ?? ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadDocumentWithPrintSettingsPdf(
                        {
                          title: `${parsedWorkbook.fileName} — ${selectedSheetName}`,
                          subtitle: excelPrintArea ? `Print Area: ${excelPrintArea}` : 'Full Sheet Export',
                          table: tableData,
                          filename: `${parsedWorkbook.fileName}_${selectedSheetName}`,
                        },
                        excelPdfSettings
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Formatted PDF
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      void downloadTableAsXlsx({
                        sheetName: selectedSheetName,
                        columns: tableData.columns,
                        rows: tableData.rows,
                        filename: `${parsedWorkbook.fileName}_trimmed`,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Clean .xlsx
                  </button>
                  {onOpenPrintPreview && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenPrintPreview({
                          title: `${parsedWorkbook.fileName} — ${selectedSheetName}`,
                          table: tableData,
                          filename: `${parsedWorkbook.fileName}_${selectedSheetName}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> Full Print Preview
                    </button>
                  )}
                </div>
              </div>
            )}

            {wordPayload && selectedTool === 'word_excel_utilities' && (
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50/50 flex flex-wrap items-center justify-between gap-2">
                <span className="font-bold text-slate-900">Word Document Loaded: {wordPayload.title}</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => downloadDocumentWithPrintSettingsPdf(wordPayload, excelPdfSettings)}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    Download PDF
                  </button>
                  {onOpenPrintPreview && (
                    <button
                      type="button"
                      onClick={() => onOpenPrintPreview(wordPayload)}
                      className="px-3 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black cursor-pointer"
                    >
                      Print Preview
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 4. PDF -> EXCEL */}
        {selectedTool === 'pdf_to_excel' && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <strong>Table Extraction Note:</strong> Coordinates-based browser extraction detects aligned text rows and columns into an editable <code>.xlsx</code> sheet; scanned image-only PDFs without selectable text cannot be parsed without OCR.
            </div>
            {tableData && (
              <>
                <div className="overflow-x-auto max-h-64 border border-slate-200 rounded-xl">
                  <table className="w-full border-collapse text-[11px]">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        {tableData.columns.map((c, ci) => (
                          <th key={ci} className="px-2 py-1 text-left border border-slate-700">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.rows.slice(0, 40).map((r, ri) => (
                        <tr key={ri} className={ri % 2 === 1 ? 'bg-slate-50' : ''}>
                          {tableData.columns.map((_, ci) => (
                            <td key={ci} className="px-2 py-1 border border-slate-200">
                              {r[ci] ?? ''}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    void downloadTableAsXlsx({
                      sheetName: 'ExtractedTable',
                      columns: tableData.columns,
                      rows: tableData.rows,
                      filename: `${singlePdfName || 'pdf'}_table`,
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Download Excel (.xlsx)
                </button>
              </>
            )}
          </div>
        )}

        {/* 5. IMAGES -> PDF */}
        {selectedTool === 'images_to_pdf' && (
          <div className="space-y-4">
            <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Add Images (JPG, PNG, WebP)</span>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  void handleUploadImages(e.target.files);
                  e.target.value = '';
                }}
                className="hidden"
              />
            </label>

            {imageList.length > 0 && (
              <div className="space-y-3">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {imageList.map((item, idx) => (
                    <div key={item.id} className="border border-slate-200 rounded-xl p-2 bg-slate-50 space-y-1.5">
                      <img src={item.dataUrl} alt={item.name} className="w-full h-24 object-contain bg-white rounded" />
                      <div className="text-[10px] font-bold truncate">{idx + 1}. {item.name}</div>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => {
                            const copy = [...imageList];
                            [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                            setImageList(copy);
                          }}
                          className="p-1 rounded bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === imageList.length - 1}
                          onClick={() => {
                            const copy = [...imageList];
                            [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
                            setImageList(copy);
                          }}
                          className="p-1 rounded bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageList((prev) => prev.filter((x) => x.id !== item.id))}
                          className="p-1 rounded bg-rose-50 text-rose-700 border border-rose-200 ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      downloadDocumentWithPrintSettingsPdf(
                        {
                          title: 'Combined Images PDF',
                          imageDataUrls: imageList.map((i) => i.dataUrl),
                          filename: 'mystudyzone_images',
                        },
                        { ...DEFAULT_PRINT_SETTINGS, scaleMode: 'fit-page', centerContent: true }
                      )
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Combined PDF ({imageList.length} Images)
                  </button>
                  {onOpenPrintPreview && (
                    <button
                      type="button"
                      onClick={() =>
                        onOpenPrintPreview({
                          title: 'Images Print Layout',
                          imageDataUrls: imageList.map((i) => i.dataUrl),
                          filename: 'mystudyzone_images_print',
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" /> Paper &amp; Margin Setup
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 6. PDF -> IMAGES */}
        {selectedTool === 'pdf_to_images' && singlePdfBytes && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={pdfImgFormat}
                onChange={(e) => setPdfImgFormat(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value="image/png">PNG (Sharp Text)</option>
                <option value="image/jpeg">JPG (Smaller Size)</option>
              </select>
              <select
                value={pdfImgScale}
                onChange={(e) => setPdfImgScale(Number(e.target.value))}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value={1.2}>Standard Resolution (1.2×)</option>
                <option value={1.8}>High Resolution (1.8×)</option>
                <option value={2.4}>Ultra Sharp (2.4×)</option>
              </select>
              <button
                type="button"
                onClick={async () => {
                  setBusy(true);
                  try {
                    const res = await renderPdfPagesToImages(singlePdfBytes, {
                      scale: pdfImgScale,
                      mime: pdfImgFormat,
                      quality: 0.92,
                    });
                    setPdfThumbnails(res.pages);
                    setStatusMsg(`Rendered ${res.pages.length} high-resolution page images.`);
                  } finally {
                    setBusy(false);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
              >
                Render High-Res Images
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pdfThumbnails.map((pg) => (
                <div key={pg.pageNumber} className="border border-slate-200 rounded-xl p-2 bg-slate-50 space-y-2">
                  <img src={pg.dataUrl} alt={`Page ${pg.pageNumber}`} className="w-full h-36 object-contain bg-white rounded" />
                  <a
                    href={pg.dataUrl}
                    download={`${singlePdfName}_page_${pg.pageNumber}.${pdfImgFormat === 'image/png' ? 'png' : 'jpg'}`}
                    className="w-full inline-flex items-center justify-center gap-1 py-1.5 rounded-lg bg-slate-900 text-white font-bold"
                  >
                    <Download className="w-3 h-3" /> Page {pg.pageNumber}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. MERGE PDF */}
        {selectedTool === 'merge_pdf' && (
          <div className="space-y-4">
            <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>Add PDF Files to Merge</span>
              <input
                type="file"
                multiple
                accept=".pdf,application/pdf"
                onChange={(e) => {
                  void handleUploadMergePdfs(e.target.files);
                  e.target.value = '';
                }}
                className="hidden"
              />
            </label>

            {mergeList.length > 0 && (
              <div className="space-y-2">
                {mergeList.map((item, idx) => (
                  <div key={item.id} className="flex items-center justify-between gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
                    <span className="font-bold truncate">
                      {idx + 1}. {item.name} ({formatBytesHuman(item.size)})
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const copy = [...mergeList];
                          [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                          setMergeList(copy);
                        }}
                        className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        disabled={idx === mergeList.length - 1}
                        onClick={() => {
                          const copy = [...mergeList];
                          [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
                          setMergeList(copy);
                        }}
                        className="p-1.5 rounded bg-white border border-slate-200 disabled:opacity-40 cursor-pointer"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setMergeList((prev) => prev.filter((x) => x.id !== item.id))}
                        className="p-1.5 rounded bg-rose-50 text-rose-700 border border-rose-200 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  disabled={mergeList.length < 2 || busy}
                  onClick={async () => {
                    setBusy(true);
                    try {
                      const out = await mergePdfBuffers(mergeList.map((m) => m.bytes));
                      downloadPdfUint8Array(out, 'mystudyzone_merged');
                      setStatusMsg(`Merged ${mergeList.length} PDFs successfully!`);
                    } finally {
                      setBusy(false);
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 disabled:opacity-50 text-white font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Merge &amp; Download PDF ({mergeList.length} Files)
                </button>
              </div>
            )}
          </div>
        )}

        {/* 8. SPLIT PDF */}
        {selectedTool === 'split_pdf' && singlePdfBytes && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={splitMode}
                onChange={(e) => setSplitMode(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value="every_n">Split Every N Pages</option>
                <option value="ranges">Split by Custom Ranges (e.g. 1-2; 3-5)</option>
                <option value="single_pages">Extract Every Page Individually</option>
              </select>
              {splitMode === 'every_n' && (
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, pdfThumbnails.length)}
                  value={splitEveryN}
                  onChange={(e) => setSplitEveryN(Math.max(1, Number(e.target.value) || 1))}
                  className="px-3 py-2 rounded-xl border border-slate-300"
                />
              )}
              {splitMode === 'ranges' && (
                <input
                  type="text"
                  value={splitRangesText}
                  onChange={(e) => setSplitRangesText(e.target.value)}
                  placeholder="e.g. 1-2; 3-5"
                  className="px-3 py-2 rounded-xl border border-slate-300"
                />
              )}
            </div>

            <button
              type="button"
              onClick={async () => {
                setBusy(true);
                try {
                  const res = await splitPdfBySpecs(singlePdfBytes, splitMode, splitEveryN, splitRangesText);
                  setSplitOutputs(res);
                  setStatusMsg(`Split into ${res.length} PDF files ready to download.`);
                } finally {
                  setBusy(false);
                }
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
            >
              Split PDF Now
            </button>

            {splitOutputs.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {splitOutputs.map((out, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => downloadPdfUint8Array(out.bytes, `${singlePdfName}_${out.name}`)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> {out.name}.pdf
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 9. COMPRESS PDF */}
        {selectedTool === 'compress_pdf' && singlePdfBytes && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'lossless' as const, title: 'Lossless Clean', desc: 'Keeps selectable text & vectors' },
                { id: 'medium' as const, title: 'Balanced Compress', desc: 'Good clarity + smaller size' },
                { id: 'high' as const, title: 'Maximum Compress', desc: 'Smallest file for slow uploads' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setCompressLevel(opt.id)}
                  className={`p-3 rounded-xl border text-left cursor-pointer ${
                    compressLevel === opt.id
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-slate-50 text-slate-800 border-slate-200'
                  }`}
                >
                  <div className="font-bold">{opt.title}</div>
                  <div className={`text-[10px] ${compressLevel === opt.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {opt.desc}
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={async () => {
                setBusy(true);
                try {
                  const out = await compressPdfBuffer(singlePdfBytes, compressLevel);
                  setCompressedStats({ origBytes: singlePdfSize, newBytes: out.byteLength });
                  downloadPdfUint8Array(out, `${singlePdfName}_compressed`);
                  setStatusMsg(`Compressed from ${formatBytesHuman(singlePdfSize)} → ${formatBytesHuman(out.byteLength)}.`);
                } finally {
                  setBusy(false);
                }
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Compress &amp; Download PDF
            </button>

            {compressedStats && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold">
                Original: {formatBytesHuman(compressedStats.origBytes)} → Compressed: {formatBytesHuman(compressedStats.newBytes)}
              </div>
            )}
          </div>
        )}

        {/* 10. ROTATE PDF */}
        {selectedTool === 'rotate_pdf' && singlePdfBytes && (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <select
                value={rotateDeg}
                onChange={(e) => setRotateDeg(Number(e.target.value))}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value={90}>Rotate 90° Clockwise</option>
                <option value={180}>Rotate 180°</option>
                <option value={270}>Rotate 270° (90° Counter-Clockwise)</option>
              </select>
              <input
                type="text"
                value={rotatePagesSpec}
                onChange={(e) => setRotatePagesSpec(e.target.value)}
                placeholder="ALL or pages e.g. 1, 3-4"
                className="px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <button
              type="button"
              onClick={() => void handleRunPdfTransformAndDownload('rotate')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Rotate &amp; Download PDF
            </button>
          </div>
        )}

        {/* 11. REARRANGE PAGES */}
        {selectedTool === 'rearrange_pdf' && singlePdfBytes && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pageOrder.map((pNum, idx) => {
                const thumb = pdfThumbnails.find((t) => t.pageNumber === pNum);
                return (
                  <div key={`${pNum}_${idx}`} className="border border-slate-200 rounded-xl p-2 bg-slate-50 space-y-1.5">
                    {thumb && <img src={thumb.dataUrl} alt={`Page ${pNum}`} className="w-full h-28 object-contain bg-white rounded" />}
                    <div className="text-center font-bold">Original Pg {pNum}</div>
                    <div className="flex justify-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const copy = [...pageOrder];
                          [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                          setPageOrder(copy);
                        }}
                        className="px-2 py-1 rounded bg-white border border-slate-300 disabled:opacity-40 cursor-pointer"
                      >
                        ←
                      </button>
                      <button
                        type="button"
                        disabled={idx === pageOrder.length - 1}
                        onClick={() => {
                          const copy = [...pageOrder];
                          [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
                          setPageOrder(copy);
                        }}
                        className="px-2 py-1 rounded bg-white border border-slate-300 disabled:opacity-40 cursor-pointer"
                      >
                        →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => void handleRunPdfTransformAndDownload('rearrange')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Save New Order &amp; Download PDF
            </button>
          </div>
        )}

        {/* 12. DELETE PAGES */}
        {selectedTool === 'delete_pages_pdf' && singlePdfBytes && (
          <div className="space-y-4">
            <p className="text-slate-600">Click any page below to mark/unmark it for deletion.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {pdfThumbnails.map((pg) => {
                const isDel = Boolean(deletedPages[pg.pageNumber]);
                return (
                  <button
                    key={pg.pageNumber}
                    type="button"
                    onClick={() =>
                      setDeletedPages((prev) => ({ ...prev, [pg.pageNumber]: !prev[pg.pageNumber] }))
                    }
                    className={`border-2 rounded-xl p-2 cursor-pointer transition-all ${
                      isDel ? 'border-rose-500 bg-rose-50 opacity-60' : 'border-slate-200 bg-white'
                    }`}
                  >
                    <img src={pg.dataUrl} alt={`Page ${pg.pageNumber}`} className="w-full h-24 object-contain" />
                    <div className={`mt-1 font-bold ${isDel ? 'text-rose-700' : 'text-slate-800'}`}>
                      {isDel ? `Delete Pg ${pg.pageNumber}` : `Keep Pg ${pg.pageNumber}`}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              type="button"
              onClick={() => void handleRunPdfTransformAndDownload('delete')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Delete Selected Pages &amp; Download PDF
            </button>
          </div>
        )}

        {/* 13. EXTRACT PAGES */}
        {selectedTool === 'extract_pages_pdf' && singlePdfBytes && (
          <div className="space-y-3">
            <label className="block font-semibold text-slate-700">
              Pages or Ranges to Extract (Total {pdfThumbnails.length} pages)
            </label>
            <input
              type="text"
              value={extractSpec}
              onChange={(e) => setExtractSpec(e.target.value)}
              placeholder="e.g. 1, 3-5"
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
            <button
              type="button"
              onClick={() => void handleRunPdfTransformAndDownload('extract')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Extract &amp; Download New PDF
            </button>
          </div>
        )}

        {/* 14. ADD PAGE NUMBERS */}
        {selectedTool === 'page_numbers_pdf' && singlePdfBytes && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <select
                value={pnPosition}
                onChange={(e) => setPnPosition(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
              >
                <option value="bottom-center">Bottom Center</option>
                <option value="bottom-right">Bottom Right</option>
                <option value="top-center">Top Center</option>
                <option value="top-right">Top Right</option>
              </select>
              <input
                type="number"
                min={7}
                max={20}
                value={pnFontSize}
                onChange={(e) => setPnFontSize(Number(e.target.value) || 10)}
                className="px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>
            <button
              type="button"
              onClick={() => void handleRunPdfTransformAndDownload('pn')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Add Page Numbers &amp; Download PDF
            </button>
          </div>
        )}

        {/* 15. HEADERS & FOOTERS */}
        {selectedTool === 'header_footer_pdf' && singlePdfBytes && (
          <div className="space-y-3">
            <input
              type="text"
              value={hfHeader}
              onChange={(e) => setHfHeader(e.target.value)}
              placeholder="Header Text"
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
            <input
              type="text"
              value={hfFooter}
              onChange={(e) => setHfFooter(e.target.value)}
              placeholder="Footer Text"
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
            <input
              type="number"
              min={7}
              max={18}
              value={hfFontSize}
              onChange={(e) => setHfFontSize(Number(e.target.value) || 9)}
              className="w-32 px-3 py-2 rounded-xl border border-slate-300"
            />
            <div>
              <button
                type="button"
                onClick={() => void handleRunPdfTransformAndDownload('hf')}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
              >
                Stamp Headers/Footers &amp; Download PDF
              </button>
            </div>
          </div>
        )}

        {/* 16. CROP PDF */}
        {selectedTool === 'crop_pdf' && singlePdfBytes && (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
                <div key={side}>
                  <span className="block text-[10px] font-bold uppercase text-slate-500 mb-0.5">
                    {side} Crop %
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={cropVals[side]}
                    onChange={(e) =>
                      setCropVals((p) => ({ ...p, [side]: Math.max(0, Math.min(40, Number(e.target.value) || 0)) }))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void handleRunPdfTransformAndDownload('crop')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Crop Margins &amp; Download PDF
            </button>
          </div>
        )}

        {/* 17 & 18. ANNOTATE / ADD TEXT & IMAGES */}
        {(selectedTool === 'annotate_pdf' || selectedTool === 'overlay_pdf') && singlePdfBytes && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <div>
                <span className="block text-[10px] font-bold text-slate-600 mb-0.5">Target Page</span>
                <input
                  type="number"
                  min={1}
                  max={Math.max(1, pdfThumbnails.length)}
                  value={ovPageNum}
                  onChange={(e) => setOvPageNum(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-600 mb-0.5">X Position %</span>
                <input type="number" min={2} max={90} value={ovXPct} onChange={(e) => setOvXPct(Number(e.target.value) || 10)} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-600 mb-0.5">Y Position %</span>
                <input type="number" min={2} max={92} value={ovYPct} onChange={(e) => setOvYPct(Number(e.target.value) || 15)} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300" />
              </div>
              <div>
                <span className="block text-[10px] font-bold text-slate-600 mb-0.5">Font Size</span>
                <input type="number" min={8} max={42} value={ovFontSize} onChange={(e) => setOvFontSize(Number(e.target.value) || 14)} className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300" />
              </div>
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="text"
                value={ovText}
                onChange={(e) => setOvText(e.target.value)}
                placeholder="Annotation or Stamp Text"
                className="flex-1 min-w-[200px] px-3 py-2 rounded-xl border border-slate-300"
              />
              <input type="color" value={ovColor} onChange={(e) => setOvColor(e.target.value)} className="w-10 h-9 rounded border border-slate-300 cursor-pointer" />
              {selectedTool === 'annotate_pdf' && (
                <label className="flex items-center gap-1.5 font-semibold cursor-pointer">
                  <input type="checkbox" checked={ovHighlight} onChange={(e) => setOvHighlight(e.target.checked)} />
                  Highlight Note Box
                </label>
              )}
            </div>

            {selectedTool === 'annotate_pdf' ? (
              <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700">Optional Freehand Signature / Ink Pad</span>
                  <button
                    type="button"
                    onClick={() => {
                      const c = sigCanvasRef.current;
                      if (c) c.getContext('2d')?.clearRect(0, 0, c.width, c.height);
                      setSigDataUrl('');
                    }}
                    className="text-rose-700 font-bold cursor-pointer"
                  >
                    Clear Ink
                  </button>
                </div>
                <canvas
                  ref={sigCanvasRef}
                  width={420}
                  height={110}
                  onMouseDown={(e) => {
                    const c = sigCanvasRef.current;
                    if (!c) return;
                    const rect = c.getBoundingClientRect();
                    const ctx = c.getContext('2d');
                    if (!ctx) return;
                    setIsDrawingSig(true);
                    ctx.strokeStyle = ovColor;
                    ctx.lineWidth = 2.5;
                    ctx.beginPath();
                    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
                  }}
                  onMouseMove={(e) => {
                    if (!isDrawingSig) return;
                    const c = sigCanvasRef.current;
                    if (!c) return;
                    const rect = c.getBoundingClientRect();
                    const ctx = c.getContext('2d');
                    if (!ctx) return;
                    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
                    ctx.stroke();
                  }}
                  onMouseUp={() => {
                    setIsDrawingSig(false);
                    if (sigCanvasRef.current) setSigDataUrl(sigCanvasRef.current.toDataURL('image/png'));
                  }}
                  className="bg-white border border-slate-300 rounded-lg cursor-crosshair w-full max-w-[420px]"
                />
              </div>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{ovImageUrl ? 'Change Stamp/Logo Image' : 'Upload PNG/JPG Stamp or Signature'}</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const r = new FileReader();
                      r.onload = () => setOvImageUrl(String(r.result || ''));
                      r.readAsDataURL(f);
                    }}
                    className="hidden"
                  />
                </label>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-600">Image Width %</span>
                  <input
                    type="number"
                    min={5}
                    max={80}
                    value={ovImgWidthPct}
                    onChange={(e) => setOvImgWidthPct(Number(e.target.value) || 20)}
                    className="w-16 px-2 py-1 rounded border border-slate-300"
                  />
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={() =>
                void handleRunPdfTransformAndDownload(selectedTool === 'annotate_pdf' ? 'annotate' : 'overlay')
              }
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
            >
              Apply to PDF &amp; Download
            </button>
          </div>
        )}

        {/* 19. PDF PRINT PREPARATION */}
        {selectedTool === 'print_prep_pdf' && singlePdfBytes && (
          <div className="space-y-3">
            <p className="text-slate-600">
              Loaded <strong>{singlePdfName}.pdf</strong> ({pdfThumbnails.length} pages). Open in Print Preview Studio to adjust paper size (A4, A3, A5, Letter, Legal), margins, orientation, scaling, and print-matched PDF output.
            </p>
            {onOpenPrintPreview && (
              <button
                type="button"
                onClick={() =>
                  onOpenPrintPreview({
                    title: singlePdfName,
                    subtitle: `PDF Print Preparation (${pdfThumbnails.length} pages)`,
                    imageDataUrls: pdfThumbnails.map((t) => t.dataUrl),
                    filename: `${singlePdfName}_print_ready`,
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black cursor-pointer"
              >
                <Printer className="w-4 h-4" /> Open in Print &amp; Paper Studio
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
