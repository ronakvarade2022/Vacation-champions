import React, { useMemo, useState } from 'react';
import {
  Calculator,
  FlaskConical,
  Languages,
  Trophy,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ClassLevel, EducationBoard } from '../types';
import {
  ENGLISH_GRAMMAR_MODULES,
  ENGLISH_IDIOMS_AND_ONE_WORD,
  ENGLISH_VOCABULARY_BANK,
  getStageForClassLevel,
  MATH_FORMULA_TOPICS,
  MATH_QUICK_CONVERSIONS,
  SCHOLARSHIP_OLYMPIAD_TRACKS,
  SCIENCE_DIAGRAMS_LIST,
  ScienceDiagramKey,
} from '../data/studyLibrary/specialAcademicHubsData';

export type SpecialAcademicHubMode =
  | 'math_hub'
  | 'science_diagrams'
  | 'english_grammar'
  | 'scholarship_olympiad';

interface StudyLibrarySpecialHubsProps {
  mode: SpecialAcademicHubMode;
  selectedBoard: EducationBoard;
  selectedClass: ClassLevel;
  onNavigateTab: (tab: string) => void;
}

/**
 * Clean, zero-storage Inline Vector SVG Diagram Renderer for all 12 Science Diagrams
 * Crisp at every zoom level & prints cleanly on A4 paper without external image downloads.
 */
const ScienceDiagramSvg: React.FC<{ diagramId: ScienceDiagramKey }> = ({ diagramId }) => {
  switch (diagramId) {
    case 'plant_cell':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="20" y="20" width="520" height="260" rx="16" fill="#f8fafc" />
          {/* Hexagonal Cell Wall */}
          <polygon points="150,45 330,45 385,150 330,255 150,255 95,150" fill="#dcfce7" stroke="#15803d" strokeWidth="7" />
          {/* Cell Membrane */}
          <polygon points="156,55 324,55 373,150 324,245 156,245 107,150" fill="#f0fdf4" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="6 3" />
          {/* Large Central Vacuole */}
          <ellipse cx="228" cy="155" rx="76" ry="54" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
          <text x="228" y="159" textAnchor="middle" fontSize="12" fontWeight="700" fill="#0369a1">Central Vacuole</text>
          {/* Nucleus */}
          <circle cx="322" cy="112" r="24" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2.5" />
          <circle cx="322" cy="112" r="8" fill="#5b21b6" />
          {/* Chloroplasts */}
          <ellipse cx="160" cy="95" rx="22" ry="10" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
          <ellipse cx="305" cy="205" rx="22" ry="10" fill="#16a34a" stroke="#14532d" strokeWidth="1.5" />
          {/* Mitochondria */}
          <ellipse cx="165" cy="216" rx="19" ry="9" fill="#fb923c" stroke="#9a3412" strokeWidth="1.5" />
          {/* Labels */}
          <line x1="330" y1="45" x2="418" y2="52" stroke="#334155" strokeWidth="1.4" />
          <text x="424" y="56" fontSize="11.5" fontWeight="700" fill="#0f172a">Cell Wall (Cellulose)</text>
          <line x1="346" y1="112" x2="418" y2="105" stroke="#334155" strokeWidth="1.4" />
          <text x="424" y="109" fontSize="11.5" fontWeight="700" fill="#4c1d95">Nucleus (DNA)</text>
          <line x1="327" y1="205" x2="418" y2="165" stroke="#334155" strokeWidth="1.4" />
          <text x="424" y="169" fontSize="11.5" fontWeight="700" fill="#15803d">Chloroplast</text>
          <line x1="184" y1="218" x2="418" y2="218" stroke="#334155" strokeWidth="1.4" />
          <text x="424" y="222" fontSize="11.5" fontWeight="700" fill="#9a3412">Mitochondria (ATP)</text>
          <text x="424" y="254" fontSize="11" fontWeight="600" fill="#475569">Cytoplasm (Gel Matrix)</text>
        </svg>
      );
    case 'photosynthesis':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f0f9ff" />
          <rect x="0" y="232" width="560" height="68" fill="#fef3c7" />
          {/* Sun */}
          <circle cx="84" cy="64" r="30" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          <text x="84" y="68" textAnchor="middle" fontSize="12" fontWeight="800" fill="#713f12">SUN</text>
          {/* Sunlight arrow */}
          <line x1="120" y1="80" x2="212" y2="122" stroke="#eab308" strokeWidth="3.5" />
          <text x="165" y="88" fontSize="11" fontWeight="700" fill="#a16207">Sunlight Energy</text>
          {/* Stem & Leaf */}
          <rect x="272" y="128" width="14" height="106" fill="#15803d" rx="4" />
          <ellipse cx="222" cy="144" rx="54" ry="26" transform="rotate(-14 222 144)" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" />
          <ellipse cx="336" cy="144" rx="54" ry="26" transform="rotate(14 336 144)" fill="#22c55e" stroke="#14532d" strokeWidth="2.5" />
          <text x="279" y="106" textAnchor="middle" fontSize="12" fontWeight="800" fill="#14532d">Chlorophyll in Green Leaves</text>
          {/* Roots */}
          <path d="M279,234 L250,268 M279,234 L279,278 M279,234 L312,268" stroke="#92400e" strokeWidth="3" fill="none" />
          <text x="279" y="292" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#78350f">Water &amp; Minerals (H₂O) absorbed by Roots → Xylem</text>
          {/* CO2 in & O2 out */}
          <text x="40" y="176" fontSize="12" fontWeight="800" fill="#1d4ed8">CO₂ enters Stomata →</text>
          <text x="394" y="124" fontSize="12" fontWeight="800" fill="#047857">→ Oxygen (O₂) Released</text>
          <text x="394" y="176" fontSize="12" fontWeight="800" fill="#7c2d12">→ Glucose (C₆H₁₂O₆)</text>
          <rect x="135" y="16" width="290" height="24" rx="8" fill="#0f172a" />
          <text x="280" y="32" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#ffffff">6CO₂ + 6H₂O + Sunlight → C₆H₁₂O₆ + 6O₂↑</text>
        </svg>
      );
    case 'digestive_system':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f8fafc" />
          {/* Mouth -> Oesophagus -> Stomach -> Intestines */}
          <ellipse cx="220" cy="40" rx="26" ry="14" fill="#fecdd3" stroke="#be123c" strokeWidth="2" />
          <rect x="213" y="54" width="14" height="62" rx="6" fill="#fda4af" stroke="#be123c" strokeWidth="2" />
          {/* Liver */}
          <polygon points="150,115 210,115 198,150 144,142" fill="#991b1b" />
          {/* Stomach J-shape */}
          <path d="M220,115 C265,112 280,152 242,168 C218,176 205,160 212,145" fill="#fb923c" stroke="#c2410c" strokeWidth="2.5" />
          {/* Pancreas */}
          <ellipse cx="242" cy="178" rx="28" ry="8" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
          {/* Large Intestine frame */}
          <rect x="162" y="190" width="118" height="72" rx="18" fill="none" stroke="#92400e" strokeWidth="11" />
          {/* Small Intestine coils */}
          <path d="M182,208 C200,198 242,208 256,216 C240,226 196,222 184,234 C198,244 242,238 256,246" fill="none" stroke="#f97316" strokeWidth="7" strokeLinecap="round" />
          {/* Labels */}
          <line x1="246" y1="40" x2="340" y2="40" stroke="#334155" strokeWidth="1.3" />
          <text x="348" y="44" fontSize="11.5" fontWeight="700" fill="#0f172a">1. Mouth &amp; Salivary Glands</text>
          <line x1="227" y1="84" x2="340" y2="84" stroke="#334155" strokeWidth="1.3" />
          <text x="348" y="88" fontSize="11.5" fontWeight="700" fill="#0f172a">2. Oesophagus (Peristalsis)</text>
          <line x1="268" y1="138" x2="340" y2="130" stroke="#334155" strokeWidth="1.3" />
          <text x="348" y="134" fontSize="11.5" fontWeight="700" fill="#c2410c">3. Stomach (HCl + Pepsin)</text>
          <line x1="150" y1="130" x2="96" y2="130" stroke="#334155" strokeWidth="1.3" />
          <text x="18" y="134" fontSize="11.5" fontWeight="700" fill="#991b1b">Liver (Bile)</text>
          <line x1="270" y1="178" x2="340" y2="178" stroke="#334155" strokeWidth="1.3" />
          <text x="348" y="182" fontSize="11.5" fontWeight="700" fill="#a16207">4. Pancreas (Enzymes)</text>
          <line x1="260" y1="226" x2="340" y2="226" stroke="#334155" strokeWidth="1.3" />
          <text x="348" y="230" fontSize="11.5" fontWeight="700" fill="#ea580c">5. Small Intestine (Villi Absorption)</text>
          <line x1="282" y1="262" x2="340" y2="262" stroke="#334155" strokeWidth="1.3" />
          <text x="348" y="266" fontSize="11.5" fontWeight="700" fill="#78350f">6. Large Intestine (Water)</text>
        </svg>
      );
    case 'respiratory_system':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f8fafc" />
          {/* Trachea */}
          <rect x="212" y="36" width="16" height="84" rx="4" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
          <line x1="212" y1="54" x2="228" y2="54" stroke="#475569" strokeWidth="2" />
          <line x1="212" y1="70" x2="228" y2="70" stroke="#475569" strokeWidth="2" />
          <line x1="212" y1="86" x2="228" y2="86" stroke="#475569" strokeWidth="2" />
          <line x1="212" y1="102" x2="228" y2="102" stroke="#475569" strokeWidth="2" />
          {/* Left & Right Lungs */}
          <ellipse cx="160" cy="174" rx="48" ry="64" fill="#fecdd3" stroke="#e11d48" strokeWidth="2.5" />
          <ellipse cx="280" cy="174" rx="48" ry="64" fill="#fecdd3" stroke="#e11d48" strokeWidth="2.5" />
          {/* Bronchi */}
          <path d="M220,120 L176,158 M220,120 L264,158" stroke="#64748b" strokeWidth="6" strokeLinecap="round" />
          {/* Alveoli cluster */}
          <circle cx="150" cy="184" r="7" fill="#fff1f2" stroke="#be123c" strokeWidth="1.5" />
          <circle cx="163" cy="192" r="7" fill="#fff1f2" stroke="#be123c" strokeWidth="1.5" />
          <circle cx="290" cy="184" r="7" fill="#fff1f2" stroke="#be123c" strokeWidth="1.5" />
          {/* Diaphragm */}
          <path d="M110,256 Q220,224 330,256" fill="none" stroke="#991b1b" strokeWidth="7" strokeLinecap="round" />
          {/* Labels */}
          <line x1="228" y1="70" x2="364" y2="70" stroke="#334155" strokeWidth="1.3" />
          <text x="370" y="74" fontSize="11.5" fontWeight="700" fill="#0f172a">Trachea (Cartilage Rings)</text>
          <line x1="258" y1="146" x2="364" y2="128" stroke="#334155" strokeWidth="1.3" />
          <text x="370" y="132" fontSize="11.5" fontWeight="700" fill="#0f172a">Bronchi &amp; Bronchioles</text>
          <line x1="297" y1="184" x2="364" y2="184" stroke="#334155" strokeWidth="1.3" />
          <text x="370" y="188" fontSize="11.5" fontWeight="700" fill="#be123c">Alveoli (O₂ ↔ CO₂ Exchange)</text>
          <line x1="312" y1="248" x2="364" y2="248" stroke="#334155" strokeWidth="1.3" />
          <text x="370" y="252" fontSize="11.5" fontWeight="700" fill="#991b1b">Diaphragm (Muscular Dome)</text>
        </svg>
      );
    case 'human_heart':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f8fafc" />
          {/* 4-chamber schematic heart */}
          <rect x="130" y="62" width="110" height="76" rx="14" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="185" y="104" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e3a8a">Right Atrium</text>
          <rect x="130" y="146" width="110" height="92" rx="14" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="185" y="196" textAnchor="middle" fontSize="12" fontWeight="800" fill="#1e3a8a">Right Ventricle</text>
          <rect x="252" y="62" width="110" height="76" rx="14" fill="#fecaca" stroke="#dc2626" strokeWidth="2.5" />
          <text x="307" y="104" textAnchor="middle" fontSize="12" fontWeight="800" fill="#991b1b">Left Atrium</text>
          <rect x="252" y="146" width="110" height="92" rx="14" fill="#fca5a5" stroke="#b91c1c" strokeWidth="4.5" />
          <text x="307" y="196" textAnchor="middle" fontSize="12" fontWeight="800" fill="#991b1b">Left Ventricle</text>
          {/* Septum */}
          <rect x="242" y="62" width="8" height="176" fill="#475569" rx="3" />
          <text x="246" y="264" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#334155">Muscular Septum (Prevents Blood Mixing)</text>
          {/* Vessels & Legend */}
          <text x="185" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">Deoxygenated Blood (To Lungs)</text>
          <text x="307" y="42" textAnchor="middle" fontSize="11" fontWeight="700" fill="#dc2626">Oxygenated Blood (Aorta → Body)</text>
          <text x="384" y="110" fontSize="11.5" fontWeight="700" fill="#b91c1c">← Pulmonary Vein (From Lungs)</text>
          <text x="384" y="185" fontSize="11.5" fontWeight="700" fill="#991b1b">→ Aorta (Thick Wall Pump)</text>
          <text x="14" y="110" fontSize="11.5" fontWeight="700" fill="#1e40af">Vena Cava →</text>
          <text x="14" y="185" fontSize="11.5" fontWeight="700" fill="#1e40af">Pulm. Artery ↑</text>
        </svg>
      );
    case 'water_cycle':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#e0f2fe" />
          {/* Sun */}
          <circle cx="80" cy="60" r="28" fill="#facc15" stroke="#ca8a04" strokeWidth="3" />
          {/* Clouds */}
          <ellipse cx="260" cy="64" rx="52" ry="22" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
          <ellipse cx="420" cy="68" rx="58" ry="24" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
          <text x="260" y="68" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#334155">Condensation</text>
          {/* Mountain & River & Ocean */}
          <polygon points="340,224 445,112 555,224" fill="#86efac" stroke="#15803d" strokeWidth="2" />
          <rect x="0" y="224" width="560" height="76" fill="#0284c7" />
          <text x="130" y="266" textAnchor="middle" fontSize="13" fontWeight="800" fill="#ffffff">Ocean / Lake Collection</text>
          {/* Evaporation arrows */}
          <path d="M120,214 L120,124 M156,214 L156,124" stroke="#0369a1" strokeWidth="3" strokeDasharray="6 4" />
          <text x="138" y="112" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0c4a6e">↑ Evaporation</text>
          {/* Rain */}
          <path d="M404,96 L396,132 M424,96 L416,132 M444,96 L436,132" stroke="#1d4ed8" strokeWidth="2.5" />
          <text x="424" y="152" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#1e3a8a">Precipitation (Rain)</text>
          <text x="445" y="266" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#e0f2fe">Surface Runoff &amp; Groundwater</text>
        </svg>
      );
    case 'electric_circuit':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f8fafc" />
          {/* Main rectangular wire */}
          <rect x="100" y="86" width="360" height="144" fill="none" stroke="#0f172a" strokeWidth="3" />
          {/* Resistor zigzag on top */}
          <rect x="210" y="72" width="140" height="28" fill="#f8fafc" />
          <polyline points="210,86 226,72 246,100 266,72 286,100 306,72 326,100 350,86" fill="none" stroke="#dc2626" strokeWidth="3" />
          <text x="280" y="60" textAnchor="middle" fontSize="12" fontWeight="800" fill="#b91c1c">Resistor (R Ω)</text>
          {/* Parallel Voltmeter above */}
          <path d="M196,86 L196,34 L364,34 L364,86" fill="none" stroke="#2563eb" strokeWidth="2" />
          <circle cx="280" cy="34" r="16" fill="#eff6ff" stroke="#2563eb" strokeWidth="2.5" />
          <text x="280" y="39" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1d4ed8">V</text>
          <text x="415" y="38" fontSize="11" fontWeight="700" fill="#1d4ed8">Voltmeter (Parallel)</text>
          {/* Ammeter in series on left */}
          <circle cx="100" cy="158" r="18" fill="#ecfdf5" stroke="#059669" strokeWidth="2.5" />
          <text x="100" y="163" textAnchor="middle" fontSize="13" fontWeight="900" fill="#047857">A</text>
          <text x="14" y="162" fontSize="11" fontWeight="700" fill="#047857">Ammeter</text>
          {/* Battery on bottom */}
          <rect x="230" y="214" width="100" height="32" fill="#f8fafc" />
          <line x1="256" y1="212" x2="256" y2="248" stroke="#0f172a" strokeWidth="3.5" />
          <line x1="274" y1="220" x2="274" y2="240" stroke="#0f172a" strokeWidth="6" />
          <line x1="292" y1="212" x2="292" y2="248" stroke="#0f172a" strokeWidth="3.5" />
          <line x1="310" y1="220" x2="310" y2="240" stroke="#0f172a" strokeWidth="6" />
          <text x="280" y="274" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0f172a">DC Battery (+ / −) · Ohm’s Law: V = I × R</text>
        </svg>
      );
    case 'convex_lens_ray':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f8fafc" />
          {/* Principal Axis */}
          <line x1="24" y1="150" x2="536" y2="150" stroke="#64748b" strokeWidth="2" />
          {/* Convex Lens */}
          <ellipse cx="280" cy="150" rx="14" ry="86" fill="#bae6fd" stroke="#0284c7" strokeWidth="2.5" />
          <text x="280" y="54" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#0369a1">Convex Lens</text>
          {/* Focal points */}
          {[
            { x: 120, l: '2F₁' },
            { x: 200, l: 'F₁' },
            { x: 280, l: 'O' },
            { x: 360, l: 'F₂' },
            { x: 440, l: '2F₂' },
          ].map((pt) => (
            <g key={pt.l}>
              <circle cx={pt.x} cy="150" r="3.5" fill="#0f172a" />
              <text x={pt.x} y="168" textAnchor="middle" fontSize="11" fontWeight="800" fill="#0f172a">{pt.l}</text>
            </g>
          ))}
          {/* Object AB beyond 2F1 */}
          <line x1="88" y1="150" x2="88" y2="92" stroke="#15803d" strokeWidth="4" />
          <text x="88" y="84" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#15803d">Object (AB)</text>
          {/* Ray 1: Parallel then through F2 */}
          <polyline points="88,92 280,92 435,204" fill="none" stroke="#dc2626" strokeWidth="2" />
          {/* Ray 2: Through Optical Centre O */}
          <line x1="88" y1="92" x2="435" y2="198" stroke="#2563eb" strokeWidth="2" />
          {/* Real Inverted Image A'B' */}
          <line x1="406" y1="150" x2="406" y2="188" stroke="#9333ea" strokeWidth="4" />
          <text x="412" y="218" textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#7e22ce">Real &amp; Inverted Image (A′B′)</text>
        </svg>
      );
    case 'atom_structure':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f8fafc" />
          {/* Shells K, L, M */}
          <circle cx="220" cy="150" r="112" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="5 4" />
          <circle cx="220" cy="150" r="78" fill="none" stroke="#64748b" strokeWidth="1.8" />
          <circle cx="220" cy="150" r="46" fill="none" stroke="#475569" strokeWidth="1.8" />
          {/* Nucleus */}
          <circle cx="220" cy="150" r="22" fill="#ef4444" stroke="#991b1b" strokeWidth="2.5" />
          <text x="220" y="154" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">11p⁺ 12n⁰</text>
          {/* Electrons (Na: 2, 8, 1) */}
          <circle cx="174" cy="150" r="5" fill="#2563eb" />
          <circle cx="266" cy="150" r="5" fill="#2563eb" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            return (
              <circle
                key={deg}
                cx={220 + 78 * Math.cos(rad)}
                cy={150 + 78 * Math.sin(rad)}
                r="5"
                fill="#2563eb"
              />
            );
          })}
          <circle cx="332" cy="150" r="6" fill="#059669" />
          {/* Labels */}
          <text x="364" y="80" fontSize="13" fontWeight="900" fill="#0f172a">Sodium Atom (Na, Z = 11)</text>
          <text x="364" y="106" fontSize="11.5" fontWeight="700" fill="#991b1b">• Nucleus: Protons (+) &amp; Neutrons (0)</text>
          <text x="364" y="132" fontSize="11.5" fontWeight="700" fill="#1d4ed8">• K-Shell (n=1): 2 electrons</text>
          <text x="364" y="158" fontSize="11.5" fontWeight="700" fill="#1d4ed8">• L-Shell (n=2): 8 electrons</text>
          <text x="364" y="184" fontSize="11.5" fontWeight="700" fill="#047857">• M-Shell (Valence): 1 electron</text>
          <text x="364" y="218" fontSize="11.5" fontWeight="800" fill="#334155">Bohr Max Capacity Rule: 2n²</text>
        </svg>
      );
    case 'flowering_plant':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="205" fill="#f0f9ff" />
          <rect x="0" y="205" width="560" height="95" fill="#fde68a" />
          {/* Stem */}
          <rect x="218" y="84" width="12" height="122" fill="#15803d" rx="4" />
          {/* Flower */}
          <circle cx="224" cy="54" r="14" fill="#f43f5e" />
          <circle cx="206" cy="68" r="13" fill="#fb7185" />
          <circle cx="242" cy="68" r="13" fill="#fb7185" />
          <circle cx="224" cy="70" r="10" fill="#facc15" />
          {/* Leaves */}
          <ellipse cx="182" cy="144" rx="34" ry="15" transform="rotate(-20 182 144)" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
          <ellipse cx="266" cy="132" rx="34" ry="15" transform="rotate(20 266 132)" fill="#22c55e" stroke="#14532d" strokeWidth="2" />
          {/* Roots */}
          <path d="M224,205 L224,274 M224,225 L192,256 M224,234 L258,262 M224,250 L204,280" stroke="#78350f" strokeWidth="3.5" fill="none" />
          {/* Labels */}
          <text x="336" y="68" fontSize="12" fontWeight="800" fill="#be123c">← Flower (Reproduction)</text>
          <text x="336" y="128" fontSize="12" fontWeight="800" fill="#15803d">← Leaf (Photosynthesis)</text>
          <text x="336" y="176" fontSize="12" fontWeight="800" fill="#166534">← Stem (Transport &amp; Support)</text>
          <text x="336" y="248" fontSize="12" fontWeight="800" fill="#78350f">← Root System (Water Absorption)</text>
          <text x="26" y="120" fontSize="12" fontWeight="900" fill="#0f172a">SHOOT SYSTEM ↑</text>
          <text x="26" y="252" fontSize="12" fontWeight="900" fill="#78350f">ROOT SYSTEM ↓</text>
        </svg>
      );
    case 'solar_system':
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800">
          <rect x="0" y="0" width="560" height="300" fill="#020617" />
          {/* Sun */}
          <circle cx="38" cy="150" r="46" fill="#facc15" stroke="#f59e0b" strokeWidth="4" />
          <text x="34" y="154" textAnchor="middle" fontSize="12" fontWeight="900" fill="#713f12">SUN</text>
          {[
            { name: 'Mercury', x: 112, r: 6, c: '#94a3b8' },
            { name: 'Venus', x: 150, r: 9, c: '#fbbf24' },
            { name: 'Earth', x: 194, r: 10, c: '#38bdf8' },
            { name: 'Mars', x: 238, r: 8, c: '#ef4444' },
            { name: 'Jupiter', x: 318, r: 22, c: '#fdba74' },
            { name: 'Saturn', x: 394, r: 17, c: '#fde047' },
            { name: 'Uranus', x: 462, r: 13, c: '#67e8f9' },
            { name: 'Neptune', x: 518, r: 13, c: '#3b82f6' },
          ].map((p, idx) => (
            <g key={p.name}>
              <circle cx={p.x} cy="150" r={p.r} fill={p.c} />
              {p.name === 'Saturn' && (
                <ellipse cx={p.x} cy="150" rx="28" ry="6" fill="none" stroke="#fef08a" strokeWidth="2.5" />
              )}
              <text
                x={p.x}
                y={idx % 2 === 0 ? 112 : 196}
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#e2e8f0"
              >
                {p.name}
              </text>
            </g>
          ))}
          {/* Asteroid Belt */}
          <line x1="272" y1="68" x2="272" y2="232" stroke="#64748b" strokeWidth="2" strokeDasharray="3 6" />
          <text x="272" y="254" textAnchor="middle" fontSize="10.5" fontWeight="700" fill="#94a3b8">Asteroid Belt</text>
        </svg>
      );
    case 'food_pyramid':
    default:
      return (
        <svg viewBox="0 0 560 300" className="w-full h-auto rounded-xl bg-white border border-slate-200">
          <rect x="0" y="0" width="560" height="300" fill="#f8fafc" />
          {/* 4-tier Ecological Energy Pyramid */}
          <polygon points="220,30 270,90 170,90" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
          <polygon points="170,90 270,90 315,150 125,150" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
          <polygon points="125,150 315,150 360,210 80,210" fill="#facc15" stroke="#a16207" strokeWidth="2" />
          <polygon points="80,210 360,210 405,270 35,270" fill="#22c55e" stroke="#15803d" strokeWidth="2" />
          <text x="220" y="76" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">10 J</text>
          <text x="220" y="128" textAnchor="middle" fontSize="12" fontWeight="900" fill="#ffffff">Secondary Consumers (100 J)</text>
          <text x="220" y="186" textAnchor="middle" fontSize="12" fontWeight="900" fill="#422006">Primary Consumers / Herbivores (1,000 J)</text>
          <text x="220" y="246" textAnchor="middle" fontSize="12.5" fontWeight="900" fill="#ffffff">Producers — Green Plants (10,000 J)</text>
          <text x="380" y="76" fontSize="11.5" fontWeight="800" fill="#991b1b">Apex Predators (T4)</text>
          <text x="380" y="130" fontSize="11.5" fontWeight="800" fill="#c2410c">Carnivores (T3)</text>
          <text x="380" y="186" fontSize="11.5" fontWeight="800" fill="#a16207">Herbivores (T2)</text>
          <text x="414" y="246" fontSize="11.5" fontWeight="800" fill="#15803d">10% Energy Law</text>
        </svg>
      );
  }
};

export const StudyLibrarySpecialHubs: React.FC<StudyLibrarySpecialHubsProps> = ({
  mode,
  selectedBoard,
  selectedClass,
  onNavigateTab,
}) => {
  const recommendedStage = useMemo(() => getStageForClassLevel(selectedClass), [selectedClass]);

  // Math Hub State
  const [selectedMathTopicId, setSelectedMathTopicId] = useState<string>(MATH_FORMULA_TOPICS[0].id);
  const [revealedMathProbs, setRevealedMathProbs] = useState<Record<string, boolean>>({});

  // Science Diagrams State
  const [selectedDiagramId, setSelectedDiagramId] = useState<ScienceDiagramKey>('plant_cell');
  const [revealedViva, setRevealedViva] = useState<Record<string, boolean>>({});

  // English Grammar State
  const [selectedGrammarId, setSelectedGrammarId] = useState<string>(ENGLISH_GRAMMAR_MODULES[0].id);
  const [revealedGrammarDrills, setRevealedGrammarDrills] = useState<Record<string, boolean>>({});

  // Scholarship & Olympiad State
  const [selectedTrackId, setSelectedTrackId] = useState<string>(SCHOLARSHIP_OLYMPIAD_TRACKS[0].id);
  const [pickedOlympiadOpts, setPickedOlympiadOpts] = useState<Record<string, number>>({});

  // I. MATHEMATICS FORMULAS & PRACTICE HUB
  if (mode === 'math_hub') {
    const activeTopic =
      MATH_FORMULA_TOPICS.find((t) => t.id === selectedMathTopicId) || MATH_FORMULA_TOPICS[0];

    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 border border-slate-800 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>Mathematics Formulas &amp; Quick Practice Hub (Classes 1–10)</span>
            </span>
            <span className="text-emerald-300 font-semibold">
              Recommended Stage: {recommendedStage}
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-black text-white">
            Complete Formula Sheets, Metric Conversions &amp; Worked Practice Drills
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Curated for {selectedBoard} Board · {selectedClass} (100% Free offline-ready formula reference).
          </p>
        </div>

        {/* Topic Selector */}
        <div className="flex flex-wrap gap-2">
          {MATH_FORMULA_TOPICS.map((topic) => {
            const active = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedMathTopicId(topic.id)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  active
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-indigo-50'
                }`}
              >
                {topic.title}
              </button>
            );
          })}
        </div>

        {/* Formula Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeTopic.formulas.map((f, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-sm font-black text-slate-900">{f.name}</h4>
                <span className="text-[10px] font-bold text-indigo-700 uppercase">
                  {activeTopic.stage}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 text-amber-300 font-mono text-xs sm:text-sm font-bold">
                {f.formula}
              </div>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-800">Note: </strong>
                {f.variables}
              </p>
              <p className="text-xs text-emerald-900 bg-emerald-50 border border-emerald-200 px-3 py-2 rounded-lg font-medium">
                <strong>Worked Example: </strong>
                {f.example}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Practice Drills */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-black text-slate-900">
            Quick Formula Practice Problems ({activeTopic.title})
          </h4>
          <div className="space-y-3">
            {activeTopic.practiceProblems.map((prob, idx) => {
              const open = Boolean(revealedMathProbs[prob.id]);
              return (
                <div
                  key={prob.id}
                  className="p-4 rounded-xl bg-white border border-slate-200 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-900">
                      Drill {idx + 1}: {prob.question}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedMathProbs((prev) => ({ ...prev, [prob.id]: !prev[prob.id] }))
                      }
                      className="px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-xs font-bold text-indigo-800 cursor-pointer shrink-0 self-start sm:self-center"
                    >
                      {open ? 'Hide Solution' : 'Check Answer & Steps'}
                    </button>
                  </div>
                  {open && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm text-emerald-950 space-y-1">
                      <p className="font-black">Answer: {prob.answer}</p>
                      <p className="font-medium">{prob.steps}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Metric Conversions & Squares/Cubes Quick Sheet */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-black text-slate-900">
            Essential Metric Conversions, Squares &amp; Cubes Reference Chart
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {MATH_QUICK_CONVERSIONS.map((grp) => (
              <div
                key={grp.category}
                className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <h5 className="text-xs font-black uppercase tracking-wider text-indigo-800">
                  {grp.category}
                </h5>
                <ul className="space-y-1 text-xs font-mono text-slate-800">
                  {grp.items.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // J. SCIENCE DIAGRAMS & EXPLANATIONS HUB
  if (mode === 'science_diagrams') {
    const activeDiagram =
      SCIENCE_DIAGRAMS_LIST.find((d) => d.id === selectedDiagramId) || SCIENCE_DIAGRAMS_LIST[0];

    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 border border-slate-800 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
              <FlaskConical className="w-4 h-4" />
              <span>Science Labelled Diagrams &amp; Explanations Hub ({SCIENCE_DIAGRAMS_LIST.length} Diagrams)</span>
            </span>
            <span className="text-amber-300 font-semibold">Zero-Data Vector SVG Library</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-black text-white">
            Interactive Biology, Physics, Chemistry &amp; EVS Diagrams (Classes 1–10)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Crisp textbook-style labelled diagrams with part-by-part functions, board drawing tips, and viva questions.
          </p>
        </div>

        {/* Diagram Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {SCIENCE_DIAGRAMS_LIST.map((diag) => {
            const active = diag.id === activeDiagram.id;
            return (
              <button
                key={diag.id}
                type="button"
                onClick={() => setSelectedDiagramId(diag.id)}
                className={`p-2.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                  active
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-emerald-50'
                }`}
              >
                <span className="block truncate">{diag.title}</span>
                <span
                  className={`text-[10px] block mt-0.5 ${
                    active ? 'text-emerald-100' : 'text-slate-500'
                  }`}
                >
                  {diag.discipline}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Diagram Stage */}
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {activeDiagram.discipline} · {activeDiagram.stage}
              </span>
              <h4 className="text-lg font-display font-black text-slate-900">
                {activeDiagram.title}
              </h4>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              Relevant Boards: {activeDiagram.boards.join(', ')}
            </span>
          </div>

          <ScienceDiagramSvg diagramId={activeDiagram.id} />

          <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {activeDiagram.summary}
          </p>

          {/* Labelled Parts & Functions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {activeDiagram.keyParts.map((part, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1"
              >
                <p className="text-xs font-black text-emerald-900">
                  {idx + 1}. {part.label}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">{part.functionText}</p>
              </div>
            ))}
          </div>

          {/* Exam Drawing Tips */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-1.5">
            <h5 className="text-xs font-black uppercase tracking-wider text-amber-900">
              Board Exam Diagram Drawing Tips
            </h5>
            <ul className="space-y-1 text-xs text-amber-950 font-medium">
              {activeDiagram.examDrawingTips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>

          {/* Viva / Diagram Questions */}
          <div className="space-y-2.5">
            <h5 className="text-sm font-black text-slate-900">
              Diagram-Based Exam &amp; Viva Questions
            </h5>
            {activeDiagram.vivaQuestions.map((vq, idx) => {
              const key = `${activeDiagram.id}-viva-${idx}`;
              const open = Boolean(revealedViva[key]);
              return (
                <div
                  key={key}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <p className="text-xs sm:text-sm font-bold text-slate-900">
                      Q{idx + 1}: {vq.q}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedViva((prev) => ({ ...prev, [key]: !prev[key] }))
                      }
                      className="px-3 py-1 rounded-lg bg-white hover:bg-emerald-50 border border-slate-300 text-xs font-bold text-emerald-700 cursor-pointer shrink-0 self-start sm:self-center"
                    >
                      {open ? 'Hide Answer' : 'Show Answer'}
                    </button>
                  </div>
                  {open && (
                    <p className="text-xs sm:text-sm text-emerald-950 bg-white p-2.5 rounded-lg border border-emerald-200 font-medium">
                      <strong>Answer: </strong>
                      {vq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // K. ENGLISH GRAMMAR & VOCABULARY HUB
  if (mode === 'english_grammar') {
    const activeMod =
      ENGLISH_GRAMMAR_MODULES.find((m) => m.id === selectedGrammarId) ||
      ENGLISH_GRAMMAR_MODULES[0];

    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 border border-slate-800 space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Languages className="w-4 h-4" />
              <span>English Grammar, Writing Skills &amp; Vocabulary Hub (Classes 1–10)</span>
            </span>
            <span className="text-emerald-300 font-semibold">Maharashtra · CBSE · ICSE</span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-black text-white">
            Parts of Speech, All 12 Tenses, Voice, Reported Speech &amp; Vocabulary Builder
          </h3>
        </div>

        {/* Grammar Module Tabs */}
        <div className="flex flex-wrap gap-2">
          {ENGLISH_GRAMMAR_MODULES.map((mod) => {
            const active = mod.id === activeMod.id;
            return (
              <button
                key={mod.id}
                type="button"
                onClick={() => setSelectedGrammarId(mod.id)}
                className={`px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                  active
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {mod.title}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
          {activeMod.summary}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {activeMod.rules.map((r, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2"
            >
              <h4 className="text-sm font-black text-indigo-900">{r.heading}</h4>
              <p className="text-xs font-mono bg-slate-900 text-amber-300 p-2.5 rounded-lg">
                {r.formulaOrRule}
              </p>
              <p className="text-xs text-slate-700 font-medium">
                <strong className="text-emerald-800">Example: </strong>
                {r.example}
              </p>
            </div>
          ))}
        </div>

        {/* Grammar Practice Drills */}
        <section className="space-y-2.5 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-black text-slate-900">
            Quick Grammar Practice Drills ("Do as Directed")
          </h4>
          {activeMod.quickDrill.map((d, idx) => {
            const key = `${activeMod.id}-gd-${idx}`;
            const open = Boolean(revealedGrammarDrills[key]);
            return (
              <div
                key={key}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{d.prompt}</p>
                  <button
                    type="button"
                    onClick={() =>
                      setRevealedGrammarDrills((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    className="px-3 py-1 rounded-lg bg-white hover:bg-indigo-50 border border-slate-300 text-xs font-bold text-indigo-700 cursor-pointer shrink-0 self-start sm:self-center"
                  >
                    {open ? 'Hide Answer' : 'Show Answer'}
                  </button>
                </div>
                {open && (
                  <p className="text-xs sm:text-sm text-emerald-950 bg-white p-2.5 rounded-lg border border-emerald-200 font-medium">
                    <strong>Answer: </strong>
                    {d.answer}
                  </p>
                )}
              </div>
            );
          })}
        </section>

        {/* Vocabulary Synonyms & Antonyms Table */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>High-Frequency Synonyms, Antonyms &amp; Sentence Usage</span>
          </h4>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-800 font-black uppercase">
                <tr>
                  <th className="p-3">Word</th>
                  <th className="p-3">Meaning</th>
                  <th className="p-3">Synonym</th>
                  <th className="p-3">Antonym</th>
                  <th className="p-3">Example Sentence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {ENGLISH_VOCABULARY_BANK.map((v) => (
                  <tr key={v.word}>
                    <td className="p-3 font-black text-indigo-900">{v.word}</td>
                    <td className="p-3 text-slate-700">{v.meaning}</td>
                    <td className="p-3 font-semibold text-emerald-700">{v.synonym}</td>
                    <td className="p-3 font-semibold text-rose-700">{v.antonym}</td>
                    <td className="p-3 text-slate-600">{v.usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Idioms, One-Word Substitutes & Homophones */}
        <section className="space-y-3 pt-4 border-t border-slate-100">
          <h4 className="text-sm font-black text-slate-900">
            Essential Idioms, One-Word Substitutes &amp; Confusing Homophones
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {ENGLISH_IDIOMS_AND_ONE_WORD.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-black text-slate-900">{item.term}</span>
                  <span className="text-[10px] font-bold uppercase text-indigo-700">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-slate-700">{item.meaning}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // L. SCHOLARSHIP & OLYMPIAD PREPARATION HUB
  const activeTrack =
    SCHOLARSHIP_OLYMPIAD_TRACKS.find((t) => t.id === selectedTrackId) ||
    SCHOLARSHIP_OLYMPIAD_TRACKS[0];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-slate-900 text-white p-5 sm:p-6 border border-slate-800 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
            <Trophy className="w-4 h-4" />
            <span>Scholarship &amp; Competitive Olympiad Preparation Hub</span>
          </span>
          <span className="text-emerald-300 font-semibold">100% Free Strategy &amp; Drills</span>
        </div>
        <h3 className="text-lg sm:text-xl font-display font-black text-white">
          MSCE Scholarship, SOF IMO/NSO Olympiads, NMMS, Homi Bhabha &amp; JNVST
        </h3>
      </div>

      {/* Track Selector */}
      <div className="flex flex-wrap gap-2">
        {SCHOLARSHIP_OLYMPIAD_TRACKS.map((tr) => {
          const active = tr.id === activeTrack.id;
          return (
            <button
              key={tr.id}
              type="button"
              onClick={() => setSelectedTrackId(tr.id)}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                active
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-black'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-amber-50'
              }`}
            >
              {tr.examTitle}
            </button>
          );
        })}
      </div>

      {/* Active Exam Card */}
      <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-amber-900">
          <span>Target Classes: {activeTrack.targetClasses}</span>
          <span>Boards: {activeTrack.applicableBoards}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          <strong className="text-slate-900">Exam Blueprint: </strong>
          {activeTrack.patternSummary}
        </p>
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <a
            href={activeTrack.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5"
          >
            <span>{activeTrack.officialAuthority}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          {activeTrack.hasInternalPortal && (
            <button
              type="button"
              onClick={() => onNavigateTab('scholarship')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Open Full MSCE 4th &amp; 7th Scholarship Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Syllabus & Shortcut Tricks */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
            High-Weightage Syllabus Focus
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {activeTrack.keyTopics.map((tp, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{tp}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2.5">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
            Topper Shortcut Strategies
          </h4>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {activeTrack.shortcutStrategies.map((st, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{st}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Competitive Practice Questions */}
      <section className="space-y-3 pt-2">
        <h4 className="text-sm font-black text-slate-900">
          Interactive Practice Questions ({activeTrack.examTitle})
        </h4>
        {activeTrack.sampleQuestions.map((sq, idx) => {
          const qKey = `${activeTrack.id}-sq-${idx}`;
          const picked = pickedOlympiadOpts[qKey];
          const answered = typeof picked === 'number';
          return (
            <div
              key={qKey}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
            >
              <p className="text-sm font-bold text-slate-900">
                Practice Q{idx + 1}: {sq.question}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {sq.options.map((opt, oIdx) => {
                  const isSel = picked === oIdx;
                  const isRight = answered && oIdx === sq.correctIndex;
                  const isWrong = answered && isSel && oIdx !== sq.correctIndex;
                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() =>
                        setPickedOlympiadOpts((prev) => ({ ...prev, [qKey]: oIdx }))
                      }
                      className={`p-3 rounded-xl border text-left text-xs font-semibold cursor-pointer transition-all ${
                        isRight
                          ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                          : isWrong
                          ? 'bg-rose-600 text-white border-rose-600'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-indigo-50'
                      }`}
                    >
                      <span className="font-mono mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
              {answered && (
                <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs text-slate-800 leading-relaxed">
                  <strong className="text-emerald-800">
                    Correct Option ({String.fromCharCode(65 + sq.correctIndex)}):{' '}
                  </strong>
                  {sq.explanation}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};
