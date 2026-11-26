import React, { useEffect, useMemo, useRef, useState } from 'react';
import { jsPDF } from 'jspdf';
import {
  Barcode,
  Building2,
  CheckCircle2,
  Contact,
  Download,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Link2,
  QrCode,
  Upload,
  UserCheck,
  Wifi,
} from 'lucide-react';
import {
  downloadBase64ImagePng,
  downloadPlainTextFile,
  sanitizeFilename,
} from '../../utils/realFileExports';

export type BarcodeQrToolId =
  | 'qr_standard'
  | 'barcode_code128'
  | 'barcode_ean13'
  | 'barcode_isbn'
  | 'qr_school_id'
  | 'qr_student_id'
  | 'qr_teacher_id'
  | 'qr_attendance'
  | 'qr_website'
  | 'qr_vcard'
  | 'qr_wifi'
  | 'qr_text'
  | 'qr_url'
  | 'bulk_qr'
  | 'bulk_barcode';

interface GeneratorMeta {
  id: BarcodeQrToolId;
  num: number;
  label: string;
  kind: 'qr' | 'barcode' | 'bulk_qr' | 'bulk_barcode';
  icon: React.ComponentType<{ className?: string }>;
}

const GENERATORS: GeneratorMeta[] = [
  { id: 'qr_standard', num: 1, label: 'QR Code', kind: 'qr', icon: QrCode },
  { id: 'barcode_code128', num: 2, label: 'Barcode (Code 128)', kind: 'barcode', icon: Barcode },
  { id: 'barcode_ean13', num: 3, label: 'Product Barcode (EAN-13)', kind: 'barcode', icon: Barcode },
  { id: 'barcode_isbn', num: 4, label: 'ISBN Book Barcode', kind: 'barcode', icon: Barcode },
  { id: 'qr_school_id', num: 5, label: 'School ID QR', kind: 'qr', icon: Building2 },
  { id: 'qr_student_id', num: 6, label: 'Student ID QR', kind: 'qr', icon: GraduationCap },
  { id: 'qr_teacher_id', num: 7, label: 'Teacher ID QR', kind: 'qr', icon: UserCheck },
  { id: 'qr_attendance', num: 8, label: 'Attendance QR', kind: 'qr', icon: CheckCircle2 },
  { id: 'qr_website', num: 9, label: 'Website QR', kind: 'qr', icon: Globe },
  { id: 'qr_vcard', num: 10, label: 'Contact vCard QR', kind: 'qr', icon: Contact },
  { id: 'qr_wifi', num: 11, label: 'Wi-Fi QR', kind: 'qr', icon: Wifi },
  { id: 'qr_text', num: 12, label: 'Text QR', kind: 'qr', icon: FileText },
  { id: 'qr_url', num: 13, label: 'URL QR', kind: 'qr', icon: Link2 },
  { id: 'bulk_qr', num: 14, label: 'Bulk QR Generator', kind: 'bulk_qr', icon: Layers },
  { id: 'bulk_barcode', num: 15, label: 'Bulk Barcode Generator', kind: 'bulk_barcode', icon: Layers },
];

function computeEan13(digitsRaw: string): string {
  const digits = digitsRaw.replace(/\D/g, '').padEnd(12, '0').slice(0, 12);
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(digits[i], 10) * (i % 2 === 0 ? 1 : 3);
  }
  const check = (10 - (sum % 10)) % 10;
  return `${digits}${check}`;
}

export interface BarcodeQrCentreViewProps {
  defaultStudentName?: string;
  defaultSchoolName?: string;
  defaultBoardClass?: string;
}

export const BarcodeQrCentreView: React.FC<BarcodeQrCentreViewProps> = ({
  defaultStudentName = 'Aarav Sharma',
  defaultSchoolName = 'Adarsh Vidyalaya Pune',
  defaultBoardClass = 'Maharashtra · Class 5',
}) => {
  const [selectedTool, setSelectedTool] = useState<BarcodeQrToolId>('qr_standard');
  const [fgColor, setFgColor] = useState<string>('#0f172a');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [sizePx, setSizePx] = useState<number>(280);
  const [logoDataUrl, setLogoDataUrl] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Structured Form Inputs
  const [plainInput, setPlainInput] = useState<string>('https://mystudyzone.in');
  const [barcodeInput, setBarcodeInput] = useState<string>('MSZ-2026-001');
  const [eanInput, setEanInput] = useState<string>('890123456789');
  const [isbnInput, setIsbnInput] = useState<string>('978817450581');

  const [idName, setIdName] = useState<string>(defaultStudentName);
  const [idCode, setIdCode] = useState<string>('STU-2026-105');
  const [idOrg, setIdOrg] = useState<string>(defaultSchoolName);
  const [idMeta, setIdMeta] = useState<string>(defaultBoardClass);

  const [attClass, setAttClass] = useState<string>('Class 5 Div A');
  const [attDate, setAttDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [attSubject, setAttSubject] = useState<string>('Mathematics');

  const [vcName, setVcName] = useState<string>(defaultStudentName);
  const [vcPhone, setVcPhone] = useState<string>('+91 9876543210');
  const [vcEmail, setVcEmail] = useState<string>('educator@mystudyzone.in');
  const [vcOrg, setVcOrg] = useState<string>(defaultSchoolName);

  const [wifiSsid, setWifiSsid] = useState<string>('School_SmartClass_WiFi');
  const [wifiPass, setWifiPass] = useState<string>('Study2026');
  const [wifiEnc, setWifiEnc] = useState<'WPA' | 'WEP' | 'nopass'>('WPA');

  const [bulkLines, setBulkLines] = useState<string>(
    'Roll 01 Aarav | MSZ-STU-001\nRoll 02 Ananya | MSZ-STU-002\nRoll 03 Rohan | MSZ-STU-003\nRoll 04 Diya | MSZ-STU-004'
  );

  // Rendered Previews
  const [singlePngUrl, setSinglePngUrl] = useState<string>('');
  const [singleSvgStr, setSingleSvgStr] = useState<string>('');
  const [bulkItems, setBulkItems] = useState<Array<{ label: string; value: string; pngUrl: string; svgStr: string }>>([]);
  const logoFileRef = useRef<HTMLInputElement | null>(null);

  const activeMeta = GENERATORS.find((g) => g.id === selectedTool) || GENERATORS[0];

  const effectiveSinglePayload = useMemo(() => {
    switch (selectedTool) {
      case 'qr_website':
      case 'qr_url':
        return plainInput.trim().startsWith('http') ? plainInput.trim() : `https://${plainInput.trim()}`;
      case 'qr_school_id':
        return `SCHOOL-ID|ORG:${idOrg}|CODE:${idCode}|CITY:${idMeta}`;
      case 'qr_student_id':
        return `STUDENT-ID|NAME:${idName}|ROLL:${idCode}|CLASS:${idMeta}|SCHOOL:${idOrg}`;
      case 'qr_teacher_id':
        return `TEACHER-ID|NAME:${idName}|EMP:${idCode}|DEPT:${idMeta}|SCHOOL:${idOrg}`;
      case 'qr_attendance':
        return `ATTENDANCE|DATE:${attDate}|CLASS:${attClass}|SUBJ:${attSubject}|SCHOOL:${idOrg}`;
      case 'qr_vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcName}\nORG:${vcOrg}\nTEL:${vcPhone}\nEMAIL:${vcEmail}\nEND:VCARD`;
      case 'qr_wifi':
        return `WIFI:T:${wifiEnc};S:${wifiSsid};P:${wifiEnc === 'nopass' ? '' : wifiPass};;`;
      case 'barcode_code128':
        return barcodeInput.trim() || 'MSZ-001';
      case 'barcode_ean13':
        return computeEan13(eanInput);
      case 'barcode_isbn':
        return computeEan13(`978${isbnInput.replace(/\D/g, '').replace(/^978/, '').slice(0, 9)}`);
      case 'qr_standard':
      case 'qr_text':
      default:
        return plainInput.trim() || 'MyStudyZone';
    }
  }, [
    selectedTool,
    plainInput,
    barcodeInput,
    eanInput,
    isbnInput,
    idName,
    idCode,
    idOrg,
    idMeta,
    attDate,
    attClass,
    attSubject,
    vcName,
    vcOrg,
    vcPhone,
    vcEmail,
    wifiEnc,
    wifiSsid,
    wifiPass,
  ]);

  const generateQrWithOptionalLogo = async (payload: string, px: number): Promise<{ pngUrl: string; svgStr: string }> => {
    const QRCode = await import('qrcode');
    const opts = {
      width: px,
      margin: 2,
      errorCorrectionLevel: logoDataUrl ? ('H' as const) : ('M' as const),
      color: { dark: fgColor, light: bgColor },
    };

    const svgStr = await QRCode.toString(payload, { ...opts, type: 'svg' });
    const canvas = document.createElement('canvas');
    await QRCode.toCanvas(canvas, payload, opts);

    if (logoDataUrl) {
      await new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const logoBox = Math.round(px * 0.22);
            const lx = Math.round((px - logoBox) / 2);
            const ly = Math.round((px - logoBox) / 2);
            ctx.fillStyle = bgColor || '#ffffff';
            ctx.fillRect(lx - 4, ly - 4, logoBox + 8, logoBox + 8);
            ctx.drawImage(img, lx, ly, logoBox, logoBox);
          }
          resolve();
        };
        img.onerror = () => resolve();
        img.src = logoDataUrl;
      });
    }

    return { pngUrl: canvas.toDataURL('image/png'), svgStr };
  };

  const generateBarcodeAssets = async (
    value: string,
    format: 'CODE128' | 'EAN13'
  ): Promise<{ pngUrl: string; svgStr: string }> => {
    const JsBarcode = (await import('jsbarcode')).default;
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, value, {
      format,
      lineColor: fgColor,
      background: bgColor,
      width: Math.max(1.5, Math.min(4, sizePx / 110)),
      height: Math.max(55, Math.round(sizePx * 0.34)),
      displayValue: true,
      margin: 12,
      fontSize: 14,
    });

    const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    JsBarcode(svgEl, value, {
      format,
      lineColor: fgColor,
      background: bgColor,
      width: 2,
      height: 80,
      displayValue: true,
      margin: 12,
    });
    const svgStr = new XMLSerializer().serializeToString(svgEl);
    return { pngUrl: canvas.toDataURL('image/png'), svgStr };
  };

  // Re-render live preview cleanly on input changes
  useEffect(() => {
    let active = true;
    setErrorMsg('');

    const run = async () => {
      try {
        if (activeMeta.kind === 'qr') {
          const res = await generateQrWithOptionalLogo(effectiveSinglePayload, sizePx);
          if (active) {
            setSinglePngUrl(res.pngUrl);
            setSingleSvgStr(res.svgStr);
            setBulkItems([]);
          }
        } else if (activeMeta.kind === 'barcode') {
          const fmt =
            selectedTool === 'barcode_ean13' || selectedTool === 'barcode_isbn' ? 'EAN13' : 'CODE128';
          const res = await generateBarcodeAssets(effectiveSinglePayload, fmt);
          if (active) {
            setSinglePngUrl(res.pngUrl);
            setSingleSvgStr(res.svgStr);
            setBulkItems([]);
          }
        } else {
          const lines = bulkLines
            .split(/\r?\n/)
            .map((l) => l.trim())
            .filter(Boolean)
            .slice(0, 50);
          const list: Array<{ label: string; value: string; pngUrl: string; svgStr: string }> = [];
          for (const line of lines) {
            const [lblRaw, valRaw] = line.includes('|') ? line.split('|') : [line, line];
            const label = (lblRaw || '').trim();
            const value = (valRaw || lblRaw || '').trim();
            if (!value) continue;
            const assets =
              activeMeta.kind === 'bulk_qr'
                ? await generateQrWithOptionalLogo(value, 220)
                : await generateBarcodeAssets(value, 'CODE128');
            list.push({ label, value, ...assets });
          }
          if (active) {
            setBulkItems(list);
          }
        }
      } catch (err: any) {
        if (active) setErrorMsg(String(err?.message || 'Could not generate code. Check input format.'));
      }
    };

    void run();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool, effectiveSinglePayload, bulkLines, fgColor, bgColor, sizePx, logoDataUrl]);

  const handleDownloadSinglePdf = () => {
    if (!singlePngUrl) return;
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(14);
    doc.text(`${activeMeta.label}`, 20, 22);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Payload: ${effectiveSinglePayload.replace(/\n/g, ' | ').slice(0, 95)}`, 20, 30);
    const wMm = activeMeta.kind === 'qr' ? 75 : 120;
    const hMm = activeMeta.kind === 'qr' ? 75 : 42;
    doc.addImage(singlePngUrl, 'PNG', 20, 40, wMm, hMm);
    doc.save(sanitizeFilename(`${selectedTool}_code`, 'pdf'));
  };

  const handleDownloadA4SheetPdf = () => {
    const items =
      bulkItems.length > 0
        ? bulkItems
        : singlePngUrl
        ? Array.from({ length: 12 }, (_, i) => ({
            label: `${activeMeta.label} #${i + 1}`,
            value: effectiveSinglePayload,
            pngUrl: singlePngUrl,
          }))
        : [];
    if (items.length === 0) return;

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const cols = activeMeta.kind === 'barcode' || activeMeta.kind === 'bulk_barcode' ? 2 : 3;
    const cellW = cols === 2 ? 85 : 56;
    const cellH = cols === 2 ? 38 : 62;
    const gap = 6;
    const margin = 14;

    let col = 0;
    let row = 0;
    items.forEach((item) => {
      const x = margin + col * (cellW + gap);
      const y = margin + row * (cellH + gap);
      if (y + cellH > 282) {
        doc.addPage();
        row = 0;
        col = 0;
      }
      const drawX = margin + col * (cellW + gap);
      const drawY = margin + row * (cellH + gap);
      doc.setDrawColor(203, 213, 225);
      doc.rect(drawX, drawY, cellW, cellH);
      const imgW = cols === 2 ? 76 : 44;
      const imgH = cols === 2 ? 26 : 44;
      doc.addImage(item.pngUrl, 'PNG', drawX + (cellW - imgW) / 2, drawY + 3, imgW, imgH);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(item.label.slice(0, 28), drawX + cellW / 2, drawY + cellH - 4, { align: 'center' });

      col++;
      if (col >= cols) {
        col = 0;
        row++;
      }
    });

    doc.save(sanitizeFilename(`${selectedTool}_a4_labels`, 'pdf'));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Left 15-Generator Menu */}
      <aside className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-2 max-h-[680px] overflow-y-auto">
        <div className="px-2 pb-2 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">15 Barcode &amp; QR Generators</h3>
          <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
            Instant SVG/PNG
          </span>
        </div>

        <div className="space-y-1">
          {GENERATORS.map((g) => {
            const Icon = g.icon;
            const active = selectedTool === g.id;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelectedTool(g.id)}
                className={`w-full text-left p-2.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-2.5 ${
                  active
                    ? 'bg-indigo-600 border-indigo-600 text-white'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                    active ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-indigo-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold truncate">
                  {g.num}. {g.label}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* Right Workbench */}
      <section className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-5 text-xs">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
            Generator #{activeMeta.num} · Browser-Side Vector &amp; Print Export
          </span>
          <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900">
            {activeMeta.label}
          </h3>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-semibold">
            {errorMsg}
          </div>
        )}

        {/* Tool-specific Input Fields */}
        {(selectedTool === 'qr_standard' ||
          selectedTool === 'qr_website' ||
          selectedTool === 'qr_text' ||
          selectedTool === 'qr_url') && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              {selectedTool === 'qr_website' || selectedTool === 'qr_url' ? 'Website / URL' : 'Text / Payload'}
            </label>
            <textarea
              rows={3}
              value={plainInput}
              onChange={(e) => setPlainInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300"
            />
          </div>
        )}

        {selectedTool === 'barcode_code128' && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Alphanumeric Barcode Value</label>
            <input
              type="text"
              value={barcodeInput}
              onChange={(e) => setBarcodeInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
            />
          </div>
        )}

        {selectedTool === 'barcode_ean13' && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Product Code (12 Digits — 13th Checksum Auto-Calculated)
            </label>
            <input
              type="text"
              value={eanInput}
              onChange={(e) => setEanInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
            />
          </div>
        )}

        {selectedTool === 'barcode_isbn' && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Book ISBN-13 Base Digits (Starts with 978 + 9 digits)
            </label>
            <input
              type="text"
              value={isbnInput}
              onChange={(e) => setIsbnInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono"
            />
          </div>
        )}

        {(selectedTool === 'qr_school_id' ||
          selectedTool === 'qr_student_id' ||
          selectedTool === 'qr_teacher_id') && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" value={idName} onChange={(e) => setIdName(e.target.value)} placeholder="Full Name" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={idCode} onChange={(e) => setIdCode(e.target.value)} placeholder="Roll / Emp / School Code" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={idOrg} onChange={(e) => setIdOrg(e.target.value)} placeholder="School / College Name" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={idMeta} onChange={(e) => setIdMeta(e.target.value)} placeholder="Class / Department / City" className="px-3 py-2 rounded-xl border border-slate-300" />
          </div>
        )}

        {selectedTool === 'qr_attendance' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" value={idOrg} onChange={(e) => setIdOrg(e.target.value)} placeholder="School / Institute Name" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={attClass} onChange={(e) => setAttClass(e.target.value)} placeholder="Class & Division" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={attSubject} onChange={(e) => setAttSubject(e.target.value)} placeholder="Subject / Session" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="date" value={attDate} onChange={(e) => setAttDate(e.target.value)} className="px-3 py-2 rounded-xl border border-slate-300" />
          </div>
        )}

        {selectedTool === 'qr_vcard' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input type="text" value={vcName} onChange={(e) => setVcName(e.target.value)} placeholder="Contact Name" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={vcOrg} onChange={(e) => setVcOrg(e.target.value)} placeholder="Organization" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={vcPhone} onChange={(e) => setVcPhone(e.target.value)} placeholder="Phone Number" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="email" value={vcEmail} onChange={(e) => setVcEmail(e.target.value)} placeholder="Email Address" className="px-3 py-2 rounded-xl border border-slate-300" />
          </div>
        )}

        {selectedTool === 'qr_wifi' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <input type="text" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="Wi-Fi Network Name (SSID)" className="px-3 py-2 rounded-xl border border-slate-300" />
            <input type="text" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} placeholder="Password" className="px-3 py-2 rounded-xl border border-slate-300" />
            <select value={wifiEnc} onChange={(e) => setWifiEnc(e.target.value as any)} className="px-3 py-2 rounded-xl border border-slate-300 bg-white font-semibold">
              <option value="WPA">WPA / WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">Open (No Password)</option>
            </select>
          </div>
        )}

        {(selectedTool === 'bulk_qr' || selectedTool === 'bulk_barcode') && (
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Bulk Entries (Max 50 lines · Format: <code>Label | Code/Payload</code>)
            </label>
            <textarea
              rows={5}
              value={bulkLines}
              onChange={(e) => setBulkLines(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono text-xs"
            />
          </div>
        )}

        {/* Style & Logo Customization */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 items-center">
          <div>
            <span className="block text-[10px] font-bold text-slate-600 mb-1">Foreground Color</span>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-600 mb-1">Background Color</span>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-8 rounded cursor-pointer" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-600 mb-1">Size ({sizePx} px)</span>
            <input type="range" min={160} max={500} value={sizePx} onChange={(e) => setSizePx(Number(e.target.value))} className="w-full accent-indigo-600" />
          </div>
          <div>
            <span className="block text-[10px] font-bold text-slate-600 mb-1">Center Logo (QR)</span>
            <input
              ref={logoFileRef}
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = () => setLogoDataUrl(String(r.result || ''));
                r.readAsDataURL(f);
              }}
              className="hidden"
            />
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => logoFileRef.current?.click()}
                className="flex-1 inline-flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-white border border-slate-300 font-bold cursor-pointer"
              >
                <Upload className="w-3 h-3" /> {logoDataUrl ? 'Change' : 'Logo'}
              </button>
              {logoDataUrl && (
                <button
                  type="button"
                  onClick={() => setLogoDataUrl('')}
                  className="px-2 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 font-bold cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Output & Multi-Format Exports */}
        {activeMeta.kind === 'bulk_qr' || activeMeta.kind === 'bulk_barcode' ? (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-slate-800">
                Generated {bulkItems.length} Bulk Labels
              </span>
              <button
                type="button"
                onClick={handleDownloadA4SheetPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download Printable A4 PDF Sheet
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
              {bulkItems.map((it, i) => (
                <div key={i} className="border border-slate-200 rounded-xl p-2.5 bg-slate-50 text-center space-y-1.5">
                  <img src={it.pngUrl} alt={it.label} className="max-h-28 mx-auto bg-white p-1 rounded" />
                  <div className="font-bold text-slate-900 truncate">{it.label}</div>
                  <div className="flex justify-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => downloadBase64ImagePng(it.pngUrl, `bulk_${i + 1}_${it.label}`)}
                      className="px-2 py-0.5 rounded bg-white border border-slate-300 text-[10px] font-bold cursor-pointer"
                    >
                      PNG
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadPlainTextFile(it.svgStr, `bulk_${i + 1}_${it.label}`, 'svg')}
                      className="px-2 py-0.5 rounded bg-white border border-slate-300 text-[10px] font-bold cursor-pointer"
                    >
                      SVG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50 flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs shrink-0">
              {singlePngUrl && (
                <img src={singlePngUrl} alt={activeMeta.label} className="max-w-[230px] max-h-[230px] object-contain" />
              )}
            </div>
            <div className="flex-1 space-y-3 text-center sm:text-left">
              <div>
                <div className="font-bold text-slate-900">{activeMeta.label} Ready</div>
                <p className="text-[11px] text-slate-500 break-all mt-0.5">
                  Encoded: {effectiveSinglePayload.replace(/\n/g, ' | ')}
                </p>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={() => downloadBase64ImagePng(singlePngUrl, `${selectedTool}_mystudyzone`)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> PNG
                </button>
                <button
                  type="button"
                  onClick={() => downloadPlainTextFile(singleSvgStr, `${selectedTool}_mystudyzone`, 'svg')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> SVG
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSinglePdf}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-700 text-white font-bold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
                <button
                  type="button"
                  onClick={handleDownloadA4SheetPdf}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 text-slate-950 font-black cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" /> A4 Label Sheet PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
