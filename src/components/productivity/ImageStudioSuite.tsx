import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  CheckCircle2,
  Crop,
  Download,
  FlipHorizontal,
  FlipVertical,
  Image as ImageIcon,
  Maximize2,
  Printer,
  RotateCcw,
  RotateCw,
  Scissors,
  Sliders,
  Sparkles,
  Upload,
} from 'lucide-react';
import {
  PASSPORT_PRESETS,
  downloadPassportSheetAsPdf,
  downloadProcessedImage,
  formatBytesHuman,
  loadImageFileInBrowser,
  processImageEditor,
  processImageResizeAndConvert,
  renderPassportPhotoAndSheet,
  type ImageOutputMime,
  type LoadedBrowserImage,
  type ProcessedImageResult,
} from '../../utils/browserImageProcessor';
import { downloadBlobFile, type PrintExportPayload } from '../../utils/realFileExports';

export type ImageStudioSubTab = 'resizer' | 'passport' | 'editor';

export interface ImageStudioSuiteProps {
  initialTab?: ImageStudioSubTab;
  onOpenPrintPreview?: (payload: PrintExportPayload) => void;
}

export const ImageStudioSuite: React.FC<ImageStudioSuiteProps> = ({
  initialTab = 'resizer',
  onOpenPrintPreview,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<ImageStudioSubTab>(initialTab);
  const [sourceImage, setSourceImage] = useState<LoadedBrowserImage | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // A. Image Resizer State
  const [resizeMode, setResizeMode] = useState<'target_size' | 'pixels' | 'percentage'>('target_size');
  const [targetKb, setTargetKb] = useState<number>(100);
  const [widthPx, setWidthPx] = useState<number>(800);
  const [heightPx, setHeightPx] = useState<number>(600);
  const [lockAspect, setLockAspect] = useState<boolean>(true);
  const [percentage, setPercentage] = useState<number>(75);
  const [outputMime, setOutputMime] = useState<ImageOutputMime>('image/jpeg');
  const [qualityPct, setQualityPct] = useState<number>(85);
  const [removeBg, setRemoveBg] = useState<boolean>(false);
  const [bgTolerance, setBgTolerance] = useState<number>(28);
  const [bgReplacement, setBgReplacement] = useState<string>('#ffffff');
  const [resizeResult, setResizeResult] = useState<ProcessedImageResult | null>(null);

  // B. Passport & ID Photo Maker State
  const [passportPresetId, setPassportPresetId] = useState<string>('in_passport');
  const [ppWidthMm, setPpWidthMm] = useState<number>(35);
  const [ppHeightMm, setPpHeightMm] = useState<number>(45);
  const [ppZoom, setPpZoom] = useState<number>(1.05);
  const [ppPanX, setPpPanX] = useState<number>(0);
  const [ppPanY, setPpPanY] = useState<number>(0);
  const [ppRotate, setPpRotate] = useState<number>(0);
  const [ppBgColor, setPpBgColor] = useState<string>('#ffffff');
  const [ppCleanBg, setPpCleanBg] = useState<boolean>(false);
  const [ppBgTolerance, setPpBgTolerance] = useState<number>(24);
  const [ppCopies, setPpCopies] = useState<number>(8);
  const [passportResult, setPassportResult] = useState<{
    singleDataUrl: string;
    singleBlob: Blob;
    singleWidthPx: number;
    singleHeightPx: number;
    sheetDataUrl: string;
  } | null>(null);

  // C. Image Editor State
  const [cropTopPct, setCropTopPct] = useState<number>(0);
  const [cropRightPct, setCropRightPct] = useState<number>(0);
  const [cropBottomPct, setCropBottomPct] = useState<number>(0);
  const [cropLeftPct, setCropLeftPct] = useState<number>(0);
  const [edRotateDeg, setEdRotateDeg] = useState<number>(0);
  const [edFlipH, setEdFlipH] = useState<boolean>(false);
  const [edFlipV, setEdFlipV] = useState<boolean>(false);
  const [edBrightness, setEdBrightness] = useState<number>(0);
  const [edContrast, setEdContrast] = useState<number>(0);
  const [edSharpness, setEdSharpness] = useState<number>(0);
  const [edClarity, setEdClarity] = useState<number>(0);
  const [edAutoTrim, setEdAutoTrim] = useState<boolean>(false);
  const [edMime, setEdMime] = useState<ImageOutputMime>('image/jpeg');
  const [edQualityPct, setEdQualityPct] = useState<number>(90);
  const [editorResult, setEditorResult] = useState<ProcessedImageResult | null>(null);

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    try {
      const loaded = await loadImageFileInBrowser(file);
      setSourceImage(loaded);
      setWidthPx(loaded.width);
      setHeightPx(loaded.height);
      setResizeResult(null);
      setPassportResult(null);
      setEditorResult(null);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Could not load image file.'));
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handlePresetChange = (id: string) => {
    setPassportPresetId(id);
    const found = PASSPORT_PRESETS.find((p) => p.id === id);
    if (found && id !== 'custom') {
      setPpWidthMm(found.widthMm);
      setPpHeightMm(found.heightMm);
    }
  };

  const runResizer = async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const res = await processImageResizeAndConvert({
        source: sourceImage,
        mode: resizeMode,
        targetKb,
        widthPx,
        heightPx,
        percentage,
        outputMime,
        quality: qualityPct / 100,
        removeBackground: removeBg,
        bgTolerance,
        bgReplacement,
      });
      setResizeResult(res);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Image resize failed.'));
    } finally {
      setIsProcessing(false);
    }
  };

  const runPassportMaker = async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const res = await renderPassportPhotoAndSheet({
        source: sourceImage,
        widthMm: ppWidthMm,
        heightMm: ppHeightMm,
        zoom: ppZoom,
        panX: ppPanX,
        panY: ppPanY,
        rotateDeg: ppRotate,
        bgColor: ppBgColor,
        cleanBackground: ppCleanBg,
        bgTolerance: ppBgTolerance,
        copiesOnSheet: ppCopies,
      });
      setPassportResult(res);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Passport photo generation failed.'));
    } finally {
      setIsProcessing(false);
    }
  };

  const runEditor = async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setErrorMsg('');
    try {
      const res = await processImageEditor({
        source: sourceImage,
        cropTopPct,
        cropRightPct,
        cropBottomPct,
        cropLeftPct,
        rotateDeg: edRotateDeg,
        flipH: edFlipH,
        flipV: edFlipV,
        brightness: edBrightness,
        contrast: edContrast,
        sharpness: edSharpness,
        clarity: edClarity,
        autoTrimMargins: edAutoTrim,
        outputMime: edMime,
        quality: edQualityPct / 100,
      });
      setEditorResult(res);
    } catch (err: any) {
      setErrorMsg(String(err?.message || 'Image editing failed.'));
    } finally {
      setIsProcessing(false);
    }
  };

  // Auto-refresh Passport preview smoothly when sliders change if image is loaded
  useEffect(() => {
    if (activeSubTab === 'passport' && sourceImage) {
      void runPassportMaker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSubTab, sourceImage, ppWidthMm, ppHeightMm, ppZoom, ppPanX, ppPanY, ppRotate, ppBgColor, ppCleanBg, ppBgTolerance, ppCopies]);

  const applyAspectCropPreset = (preset: 'reset' | 'square' | '4_3' | '16_9' | 'a4') => {
    if (preset === 'reset') {
      setCropTopPct(0);
      setCropRightPct(0);
      setCropBottomPct(0);
      setCropLeftPct(0);
      return;
    }
    if (!sourceImage) return;
    const ratioMap: Record<string, number> = {
      square: 1,
      '4_3': 4 / 3,
      '16_9': 16 / 9,
      a4: 210 / 297,
    };
    const targetRatio = ratioMap[preset];
    const currentRatio = sourceImage.width / Math.max(1, sourceImage.height);
    if (currentRatio > targetRatio) {
      const keepW = (targetRatio / currentRatio) * 100;
      const sidePct = Math.max(0, Math.round((100 - keepW) / 2));
      setCropLeftPct(sidePct);
      setCropRightPct(sidePct);
      setCropTopPct(0);
      setCropBottomPct(0);
    } else {
      const keepH = (currentRatio / targetRatio) * 100;
      const vertPct = Math.max(0, Math.round((100 - keepH) / 2));
      setCropTopPct(vertPct);
      setCropBottomPct(vertPct);
      setCropLeftPct(0);
      setCropRightPct(0);
    }
  };

  return (
    <div className="space-y-5">
      {/* Sub-Navigation Pills + File Upload Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'resizer' as const, label: 'A. Image Resizer & Converter', icon: Maximize2 },
            { id: 'passport' as const, label: 'B. Passport & ID Photo Maker', icon: Camera },
            { id: 'editor' as const, label: 'C. Image Editor & Margin Trim', icon: Crop },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSubTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors ${
                  active
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelected}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{sourceImage ? 'Change Image' : 'Upload Image (Max 15 MB)'}</span>
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs font-semibold text-rose-800">
          {errorMsg}
        </div>
      )}

      {!sourceImage ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="bg-white rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-400 p-10 text-center cursor-pointer transition-colors space-y-2"
        >
          <div className="w-12 h-12 mx-auto rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <ImageIcon className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            Upload a Photo, Document Scan, or Diagram (100% Browser Processed)
          </h3>
          <p className="text-xs text-slate-500 max-w-lg mx-auto">
            Supports JPG, PNG, WebP up to 15 MB. Zero files are uploaded to servers — resizing, KB/MB targeting, passport A4 sheets, sharpness &amp; cropping run directly in your browser.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Tool Controls */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <div className="font-bold text-slate-900 truncate max-w-[220px]">{sourceImage.name}</div>
                <div className="text-[11px] text-slate-500 tabular-nums">
                  Original: {sourceImage.width} × {sourceImage.height} px · {formatBytesHuman(sourceImage.originalBytes)}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px]">
                Browser Ready
              </span>
            </div>

            {activeSubTab === 'resizer' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Resize Method</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'target_size' as const, label: 'Target KB/MB' },
                      { id: 'pixels' as const, label: 'Pixels (W×H)' },
                      { id: 'percentage' as const, label: 'Percentage %' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setResizeMode(m.id)}
                        className={`py-2 px-2 rounded-xl border font-bold cursor-pointer ${
                          resizeMode === m.id
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {resizeMode === 'target_size' && (
                  <div className="space-y-2">
                    <label className="block font-semibold text-slate-700">
                      Target File Size (KB)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {[20, 50, 100, 200, 500, 1024].map((kb) => (
                        <button
                          key={kb}
                          type="button"
                          onClick={() => setTargetKb(kb)}
                          className={`px-2.5 py-1 rounded-lg border font-bold cursor-pointer tabular-nums ${
                            targetKb === kb
                              ? 'bg-slate-900 text-white border-slate-900'
                              : 'bg-slate-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {kb >= 1024 ? '1 MB' : `${kb} KB`}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min={5}
                      max={15360}
                      value={targetKb}
                      onChange={(e) => setTargetKb(Math.max(5, Number(e.target.value) || 50))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 tabular-nums"
                    />
                  </div>
                )}

                {resizeMode === 'pixels' && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={lockAspect}
                        onChange={(e) => setLockAspect(e.target.checked)}
                        className="accent-indigo-600"
                      />
                      <span className="font-semibold text-slate-700">Lock Aspect Ratio</span>
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="block text-[10px] text-slate-500 mb-0.5">Width (px)</span>
                        <input
                          type="number"
                          min={16}
                          max={8000}
                          value={widthPx}
                          onChange={(e) => {
                            const w = Math.max(16, Number(e.target.value) || 16);
                            setWidthPx(w);
                            if (lockAspect) {
                              setHeightPx(Math.max(16, Math.round((w * sourceImage.height) / sourceImage.width)));
                            }
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                        />
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-500 mb-0.5">Height (px)</span>
                        <input
                          type="number"
                          min={16}
                          max={8000}
                          value={heightPx}
                          onChange={(e) => {
                            const h = Math.max(16, Number(e.target.value) || 16);
                            setHeightPx(h);
                            if (lockAspect) {
                              setWidthPx(Math.max(16, Math.round((h * sourceImage.width) / sourceImage.height)));
                            }
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {resizeMode === 'percentage' && (
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700 mb-1">
                      <span>Scale Percentage</span>
                      <span className="tabular-nums">{percentage}%</span>
                    </div>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      value={percentage}
                      onChange={(e) => setPercentage(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Output Format</label>
                    <select
                      value={outputMime}
                      onChange={(e) => setOutputMime(e.target.value as ImageOutputMime)}
                      className="w-full px-2.5 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                    >
                      <option value="image/jpeg">JPG (.jpg)</option>
                      <option value="image/png">PNG (.png)</option>
                      <option value="image/webp">WebP (.webp)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Quality ({qualityPct}%)
                    </label>
                    <input
                      type="range"
                      min={15}
                      max={100}
                      value={qualityPct}
                      onChange={(e) => setQualityPct(Number(e.target.value))}
                      className="w-full accent-indigo-600 mt-2"
                    />
                  </div>
                </div>

                {/* Smart Background Removal/Replacement */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-800">
                    <input
                      type="checkbox"
                      checked={removeBg}
                      onChange={(e) => setRemoveBg(e.target.checked)}
                      className="accent-indigo-600"
                    />
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Smart Browser Background Removal / Replace</span>
                  </label>
                  {removeBg && (
                    <div className="space-y-2 pt-1">
                      <div>
                        <div className="flex justify-between text-[11px] text-slate-600">
                          <span>Color Tolerance</span>
                          <span>{bgTolerance}</span>
                        </div>
                        <input
                          type="range"
                          min={8}
                          max={90}
                          value={bgTolerance}
                          onChange={(e) => setBgTolerance(Number(e.target.value))}
                          className="w-full accent-indigo-600"
                        />
                      </div>
                      <div className="flex flex-wrap gap-1.5 items-center">
                        <span className="text-[11px] font-semibold text-slate-600">Fill:</span>
                        {[
                          { val: 'transparent', label: 'Transparent' },
                          { val: '#ffffff', label: 'White' },
                          { val: '#e0f2fe', label: 'Sky Blue' },
                          { val: '#f1f5f9', label: 'Light Gray' },
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setBgReplacement(opt.val)}
                            className={`px-2 py-0.5 rounded border text-[11px] font-bold cursor-pointer ${
                              bgReplacement === opt.val
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-slate-700 border-slate-300'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => void runResizer()}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
                >
                  {isProcessing ? 'Processing...' : 'Resize & Convert Image Now'}
                </button>
              </div>
            )}

            {activeSubTab === 'passport' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Country / ID Preset
                  </label>
                  <select
                    value={passportPresetId}
                    onChange={(e) => handlePresetChange(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    {PASSPORT_PRESETS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5">Width (mm)</label>
                    <input
                      type="number"
                      min={15}
                      max={150}
                      value={ppWidthMm}
                      onChange={(e) => {
                        setPassportPresetId('custom');
                        setPpWidthMm(Math.max(15, Number(e.target.value) || 35));
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-0.5">Height (mm)</label>
                    <input
                      type="number"
                      min={15}
                      max={150}
                      value={ppHeightMm}
                      onChange={(e) => {
                        setPassportPresetId('custom');
                        setPpHeightMm(Math.max(15, Number(e.target.value) || 45));
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 tabular-nums"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Zoom</span>
                      <span className="tabular-nums">{ppZoom.toFixed(2)}×</span>
                    </div>
                    <input
                      type="range"
                      min={0.75}
                      max={2.4}
                      step={0.05}
                      value={ppZoom}
                      onChange={(e) => setPpZoom(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-700">Pan Horizontal ({ppPanX}%)</span>
                      <input
                        type="range"
                        min={-40}
                        max={40}
                        value={ppPanX}
                        onChange={(e) => setPpPanX(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                    <div>
                      <span className="block text-[11px] font-semibold text-slate-700">Pan Vertical ({ppPanY}%)</span>
                      <input
                        type="range"
                        min={-40}
                        max={40}
                        value={ppPanY}
                        onChange={(e) => setPpPanY(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between font-semibold text-slate-700">
                      <span>Straighten Angle</span>
                      <span className="tabular-nums">{ppRotate}°</span>
                    </div>
                    <input
                      type="range"
                      min={-15}
                      max={15}
                      value={ppRotate}
                      onChange={(e) => setPpRotate(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">Background Color</span>
                    <div className="flex gap-1.5">
                      {['#ffffff', '#f1f5f9', '#e0f2fe', '#dbeafe'].map((hex) => (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => setPpBgColor(hex)}
                          style={{ backgroundColor: hex }}
                          className={`w-6 h-6 rounded-full border-2 cursor-pointer ${
                            ppBgColor === hex ? 'border-indigo-600' : 'border-slate-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ppCleanBg}
                      onChange={(e) => setPpCleanBg(e.target.checked)}
                      className="accent-indigo-600"
                    />
                    <span className="font-medium text-slate-700">Replace uniform studio backdrop</span>
                  </label>
                  {ppCleanBg && (
                    <input
                      type="range"
                      min={8}
                      max={75}
                      value={ppBgTolerance}
                      onChange={(e) => setPpBgTolerance(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Copies on A4 Printable Sheet
                  </label>
                  <div className="grid grid-cols-5 gap-1.5">
                    {[4, 6, 8, 12, 20].map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setPpCopies(c)}
                        className={`py-1.5 rounded-lg border font-bold cursor-pointer ${
                          ppCopies === c
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === 'editor' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Quick Crop Ratio</label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'reset' as const, label: 'Full / Reset' },
                      { id: 'square' as const, label: '1:1 Square' },
                      { id: '4_3' as const, label: '4:3' },
                      { id: '16_9' as const, label: '16:9' },
                      { id: 'a4' as const, label: 'A4 Ratio' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => applyAspectCropPreset(p.id)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-800 cursor-pointer"
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  <div>
                    <span className="block text-[10px] text-slate-500">Top %</span>
                    <input type="number" min={0} max={45} value={cropTopPct} onChange={(e) => setCropTopPct(Number(e.target.value) || 0)} className="w-full px-2 py-1 rounded border border-slate-300" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500">Right %</span>
                    <input type="number" min={0} max={45} value={cropRightPct} onChange={(e) => setCropRightPct(Number(e.target.value) || 0)} className="w-full px-2 py-1 rounded border border-slate-300" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500">Bottom %</span>
                    <input type="number" min={0} max={45} value={cropBottomPct} onChange={(e) => setCropBottomPct(Number(e.target.value) || 0)} className="w-full px-2 py-1 rounded border border-slate-300" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500">Left %</span>
                    <input type="number" min={0} max={45} value={cropLeftPct} onChange={(e) => setCropLeftPct(Number(e.target.value) || 0)} className="w-full px-2 py-1 rounded border border-slate-300" />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setEdRotateDeg((d) => (d - 90) % 360)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> -90°
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdRotateDeg((d) => (d + 90) % 360)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold cursor-pointer"
                  >
                    <RotateCw className="w-3.5 h-3.5" /> +90°
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdFlipH((v) => !v)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer ${
                      edFlipH ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <FlipHorizontal className="w-3.5 h-3.5" /> Flip H
                  </button>
                  <button
                    type="button"
                    onClick={() => setEdFlipV((v) => !v)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-bold cursor-pointer ${
                      edFlipV ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    <FlipVertical className="w-3.5 h-3.5" /> Flip V
                  </button>
                </div>

                <div className="space-y-2">
                  {[
                    { label: 'Brightness', val: edBrightness, set: setEdBrightness, min: -60, max: 60 },
                    { label: 'Contrast', val: edContrast, set: setEdContrast, min: -60, max: 60 },
                    { label: 'Sharpness (Unsharp Mask)', val: edSharpness, set: setEdSharpness, min: 0, max: 100 },
                    { label: 'Clarity Boost', val: edClarity, set: setEdClarity, min: 0, max: 100 },
                  ].map((sl) => (
                    <div key={sl.label}>
                      <div className="flex justify-between font-semibold text-slate-700">
                        <span>{sl.label}</span>
                        <span className="tabular-nums">{sl.val}</span>
                      </div>
                      <input
                        type="range"
                        min={sl.min}
                        max={sl.max}
                        value={sl.val}
                        onChange={(e) => sl.set(Number(e.target.value))}
                        className="w-full accent-indigo-600"
                      />
                    </div>
                  ))}
                </div>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={edAutoTrim}
                    onChange={(e) => setEdAutoTrim(e.target.checked)}
                    className="accent-indigo-600"
                  />
                  <Scissors className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Auto-Trim Unwanted Margins / Borders</span>
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <select
                    value={edMime}
                    onChange={(e) => setEdMime(e.target.value as ImageOutputMime)}
                    className="px-2.5 py-2 rounded-xl border border-slate-300 bg-white font-semibold"
                  >
                    <option value="image/jpeg">Export JPG</option>
                    <option value="image/png">Export PNG</option>
                    <option value="image/webp">Export WebP</option>
                  </select>
                  <div className="flex items-center gap-2">
                    <Sliders className="w-3.5 h-3.5 text-slate-500" />
                    <input
                      type="range"
                      min={20}
                      max={100}
                      value={edQualityPct}
                      onChange={(e) => setEdQualityPct(Number(e.target.value))}
                      className="w-full accent-indigo-600"
                    />
                    <span className="tabular-nums font-bold">{edQualityPct}%</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => void runEditor()}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
                >
                  {isProcessing ? 'Applying Edits...' : 'Apply Edits & Preview'}
                </button>
              </div>
            )}
          </div>

          {/* Right Live Preview & Downloads */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
            {activeSubTab === 'passport' && passportResult ? (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Passport Photo &amp; A4 Printable Sheet Preview
                    </h3>
                    <p className="text-xs text-slate-500">
                      300 DPI Single: {passportResult.singleWidthPx} × {passportResult.singleHeightPx} px · {ppWidthMm}×{ppHeightMm} mm
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        downloadBlobFile(
                          passportResult.singleBlob,
                          `${sourceImage.name}_passport_${ppWidthMm}x${ppHeightMm}mm`,
                          'jpg'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Single JPG</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        downloadPassportSheetAsPdf(
                          passportResult.singleDataUrl,
                          ppWidthMm,
                          ppHeightMm,
                          ppCopies,
                          `${sourceImage.name}_a4_passport_sheet`
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download A4 PDF Sheet ({ppCopies} Photos)</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                  <div className="bg-slate-50 rounded-xl border border-slate-200 p-3 text-center space-y-2">
                    <span className="text-[11px] font-bold text-slate-600">Single Photo</span>
                    <img
                      src={passportResult.singleDataUrl}
                      alt="Passport preview"
                      className="max-h-52 mx-auto border border-slate-300 shadow-xs"
                    />
                  </div>
                  <div className="sm:col-span-2 bg-slate-50 rounded-xl border border-slate-200 p-3 text-center space-y-2">
                    <span className="text-[11px] font-bold text-slate-600">
                      Printable A4 Sheet ({ppCopies} Copies with Cut Guides)
                    </span>
                    <img
                      src={passportResult.sheetDataUrl}
                      alt="A4 Passport sheet preview"
                      className="max-h-72 mx-auto border border-slate-300 shadow-xs"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {(() => {
                  const activeRes = activeSubTab === 'resizer' ? resizeResult : editorResult;
                  const previewUrl = activeRes ? activeRes.dataUrl : sourceImage.dataUrl;
                  return (
                    <>
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {activeRes ? 'Processed Output Preview' : 'Original Image Preview'}
                          </h3>
                          <p className="text-xs text-slate-500 tabular-nums">
                            {activeRes ? (
                              <span className="text-emerald-700 font-semibold inline-flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Final: {activeRes.width} × {activeRes.height} px · {formatBytesHuman(activeRes.bytes)} ({activeRes.ext.toUpperCase()})
                              </span>
                            ) : (
                              `Original: ${sourceImage.width} × ${sourceImage.height} px · ${formatBytesHuman(sourceImage.originalBytes)}`
                            )}
                          </p>
                        </div>

                        {activeRes && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                downloadProcessedImage(activeRes, `${sourceImage.name}_edited`)
                              }
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download {activeRes.ext.toUpperCase()}</span>
                            </button>
                            {onOpenPrintPreview && (
                              <button
                                type="button"
                                onClick={() =>
                                  onOpenPrintPreview({
                                    title: sourceImage.name,
                                    subtitle: `Image (${activeRes.width} × ${activeRes.height} px)`,
                                    imageDataUrls: [activeRes.dataUrl],
                                    filename: `${sourceImage.name}_print`,
                                  })
                                }
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black cursor-pointer"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>Fit &amp; Print Paper</span>
                              </button>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="rounded-xl bg-slate-100 border border-slate-200 p-4 flex items-center justify-center min-h-[280px]">
                        <img
                          src={previewUrl}
                          alt="Image studio preview"
                          className="max-w-full max-h-[380px] object-contain shadow-sm"
                        />
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
