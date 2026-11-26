import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  FileText,
  Image as ImageIcon,
  Printer,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { ImageStudioSuite } from './ImageStudioSuite';
import { PdfOfficeStudio } from './PdfOfficeStudio';
import { PrintPreviewStudio } from './PrintPreviewStudio';
import { BarcodeQrCentreView } from './BarcodeQrCentreView';
import type { PrintExportPayload } from '../../utils/realFileExports';

export type DocumentSuiteTab = 'images' | 'pdf_office' | 'print_preview' | 'qr_barcode';

export interface DocumentPrintSuiteViewProps {
  initialTab?: DocumentSuiteTab;
  onBackHome: () => void;
  onOpenAiStudio?: () => void;
  defaultStudentName?: string;
  defaultSchoolName?: string;
  defaultBoardClass?: string;
}

export const DocumentPrintSuiteView: React.FC<DocumentPrintSuiteViewProps> = ({
  initialTab = 'images',
  onBackHome,
  onOpenAiStudio,
  defaultStudentName,
  defaultSchoolName,
  defaultBoardClass,
}) => {
  const [activeTab, setActiveTab] = useState<DocumentSuiteTab>(initialTab);
  const [pendingPrintPayload, setPendingPrintPayload] = useState<PrintExportPayload | null>(null);

  const openInPrintPreview = (payload: PrintExportPayload) => {
    setPendingPrintPayload(payload);
    setActiveTab('print_preview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          {onOpenAiStudio && (
            <button
              type="button"
              onClick={onOpenAiStudio}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open AI Study &amp; Teacher Generators</span>
            </button>
          )}
        </div>

        <div>
          <p className="text-xs font-medium text-indigo-300">
            100% Browser-Side Document, Image, PDF, Barcode, QR &amp; Print Studio · Zero Server Storage
          </p>
          <h1 className="text-2xl sm:text-3xl font-display font-bold tracking-tight mt-0.5">
            Document, Image, PDF, QR &amp; Print Productivity Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl">
            Resize images by KB/MB/pixels, prepare country-preset Passport &amp; ID photo sheets, run 19 browser-side PDF &amp; Word/Excel utilities, adjust A4/A3/Letter print margins &amp; scaling, and generate 15 QR/Barcode formats.
          </p>
        </div>

        {/* Main Studio Tabs */}
        <div className="flex flex-wrap gap-2 pt-1">
          {[
            { id: 'images' as const, label: 'Image Resizer, Passport & Editor', icon: Camera },
            { id: 'pdf_office' as const, label: '19 PDF Tools & Word/Excel', icon: FileText },
            { id: 'print_preview' as const, label: 'Print Preview & Paper Setup', icon: Printer },
            { id: 'qr_barcode' as const, label: '15 Barcode & QR Generators', icon: QrCode },
          ].map((t) => {
            const Icon = t.icon;
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  active
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === 'images' && (
        <ImageStudioSuite onOpenPrintPreview={openInPrintPreview} />
      )}
      {activeTab === 'pdf_office' && (
        <PdfOfficeStudio onOpenPrintPreview={openInPrintPreview} />
      )}
      {activeTab === 'print_preview' && (
        <PrintPreviewStudio initialPayload={pendingPrintPayload} />
      )}
      {activeTab === 'qr_barcode' && (
        <BarcodeQrCentreView
          defaultStudentName={defaultStudentName}
          defaultSchoolName={defaultSchoolName}
          defaultBoardClass={defaultBoardClass}
        />
      )}
    </div>
  );
};
