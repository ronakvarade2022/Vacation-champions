import {
  TetCtetLocalizedNoteBody,
  TetCtetNoteExam,
  TetCtetNoteLanguage,
  TetCtetNotePaper,
  TetCtetNoteSubjectId,
  TetCtetNoteTopicBlueprint,
  TetCtetStudyNoteDocument,
  TetCtetSubjectCatalogMeta,
} from './types';
import { CDP_NOTE_BLUEPRINTS } from './cdpNotes';
import { LANGUAGE_1_NOTE_BLUEPRINTS } from './language1Notes';
import { LANGUAGE_2_NOTE_BLUEPRINTS } from './language2Notes';
import { MATH_PAPER_1_NOTE_BLUEPRINTS } from './mathPaper1Notes';
import { MATH_PAPER_2_NOTE_BLUEPRINTS } from './mathPaper2Notes';
import { EVS_PAPER_1_NOTE_BLUEPRINTS } from './evsPaper1Notes';
import { SCIENCE_PAPER_2_NOTE_BLUEPRINTS } from './sciencePaper2Notes';
import { SOCIAL_STUDIES_PAPER_2_NOTE_BLUEPRINTS } from './socialStudiesNotes';

export * from './types';

export const TET_CTET_NOTE_LANGUAGES: TetCtetNoteLanguage[] = ['English', 'Marathi', 'Hindi'];

export const TET_CTET_EXAM_META: Record<
  TetCtetNoteExam,
  {
    id: TetCtetNoteExam;
    authority: Record<TetCtetNoteLanguage, string>;
    officialPortal: string;
    shortName: Record<TetCtetNoteLanguage, string>;
    fullName: Record<TetCtetNoteLanguage, string>;
    patternSummary: Record<TetCtetNoteLanguage, string>;
    qualifyingRule: Record<TetCtetNoteLanguage, string>;
  }
> = {
  CTET: {
    id: 'CTET',
    authority: {
      English: 'Central Board of Secondary Education (CBSE)',
      Marathi: 'केंद्रीय माध्यमिक शिक्षण मंडळ (CBSE)',
      Hindi: 'केंद्रीय माध्यमिक शिक्षा बोर्ड (CBSE)',
    },
    officialPortal: 'https://ctet.nic.in/',
    shortName: {
      English: 'CTET',
      Marathi: 'CTET (केंद्रीय शिक्षक पात्रता)',
      Hindi: 'CTET (केंद्रीय शिक्षक पात्रता)',
    },
    fullName: {
      English: 'Central Teacher Eligibility Test (CTET)',
      Marathi: 'केंद्रीय शिक्षक पात्रता परीक्षा (CTET)',
      Hindi: 'केंद्रीय शिक्षक पात्रता परीक्षा (CTET)',
    },
    patternSummary: {
      English: '150 MCQs · 150 Marks · 150 Minutes · No Negative Marking · NCERT & NCF 2005 / NEP 2020 Pedagogy Focus',
      Marathi: '१५० बहुपर्यायी प्रश्न · १५० गुण · १५० मिनिटे · नकारात्मक गुण नाहीत · NCERT व NCF 2005 अध्यापनशास्त्र भर',
      Hindi: '150 बहुविकल्पीय प्रश्न · 150 अंक · 150 मिनट · कोई ऋणात्मक अंकन नहीं · NCERT एवं NCF 2005 शिक्षाशास्त्र केंद्रित',
    },
    qualifyingRule: {
      English: 'Qualifying: 60% (90/150) General; reserved relaxation as per CBSE/state norms. Certificate validity: Lifetime.',
      Marathi: 'पात्रता: सामान्य ६०% (९०/१५०); आरक्षित प्रवर्गासाठी नियमानुसार सूट. प्रमाणपत्र वैधता: आजीवन.',
      Hindi: 'अर्हता: सामान्य 60% (90/150); आरक्षित वर्ग हेतु नियमानुसार छूट। प्रमाण-पत्र वैधता: आजीवन।',
    },
  },
  MAHA_TET: {
    id: 'MAHA_TET',
    authority: {
      English: 'Maharashtra State Council of Examination (MSCE), Pune',
      Marathi: 'महाराष्ट्र राज्य परीक्षा परिषद (MSCE), पुणे',
      Hindi: 'महाराष्ट्र राज्य परीक्षा परिषद (MSCE), पुणे',
    },
    officialPortal: 'https://mahatet.in/ (mscepune.in)',
    shortName: {
      English: 'MAHA TET',
      Marathi: 'MAHA TET (महाराष्ट्र शिक्षक पात्रता)',
      Hindi: 'MAHA TET (महाराष्ट्र शिक्षक पात्रता)',
    },
    fullName: {
      English: 'Maharashtra Teacher Eligibility Test (MAHA TET)',
      Marathi: 'महाराष्ट्र शिक्षक पात्रता परीक्षा (MAHA TET)',
      Hindi: 'महाराष्ट्र शिक्षक पात्रता परीक्षा (MAHA TET)',
    },
    patternSummary: {
      English: '150 MCQs · 150 Marks · 150 Minutes · No Negative Marking · SCERT Maharashtra / Balbharati Std I–X Focus',
      Marathi: '१५० बहुपर्यायी प्रश्न · १५० गुण · १५० मिनिटे · नकारात्मक गुण नाहीत · SCERT महाराष्ट्र व बालभारती अभ्यासक्रम भर',
      Hindi: '150 बहुविकल्पीय प्रश्न · 150 अंक · 150 मिनट · कोई ऋणात्मक अंकन नहीं · SCERT महाराष्ट्र / बालभारती पाठ्यक्रम केंद्रित',
    },
    qualifyingRule: {
      English: 'Qualifying: 60% (90/150) Open; 55% (83/150) SC/ST/OBC/VJNT/EWS/PwD as per MSCE Pune official notification.',
      Marathi: 'पात्रता: खुला प्रवर्ग ६०% (९०/१५०); SC/ST/OBC/VJNT/EWS/दिव्यांग ५५% (८३/१५०) — MSCE पुणे अधिकृत नियमानुसार.',
      Hindi: 'अर्हता: सामान्य 60% (90/150); SC/ST/OBC/VJNT/EWS/दिव्यांग 55% (83/150) — MSCE पुणे अधिसूचना अनुसार।',
    },
  },
};

export const TET_CTET_PAPER_META: Record<
  TetCtetNotePaper,
  {
    id: TetCtetNotePaper;
    labels: Record<TetCtetNoteLanguage, string>;
    classesLabels: Record<TetCtetNoteLanguage, string>;
  }
> = {
  PAPER_1: {
    id: 'PAPER_1',
    labels: {
      English: 'Paper I (Classes I–V · Primary)',
      Marathi: 'पेपर I (इयत्ता १ ते ५ · प्राथमिक स्तर)',
      Hindi: 'पेपर I (कक्षा 1 से 5 · प्राथमिक स्तर)',
    },
    classesLabels: {
      English: 'Primary Stage · Classes I to V',
      Marathi: 'प्राथमिक स्तर · इयत्ता १ ली ते ५ वी',
      Hindi: 'प्राथमिक स्तर · कक्षा 1 से 5',
    },
  },
  PAPER_2: {
    id: 'PAPER_2',
    labels: {
      English: 'Paper II (Classes VI–VIII · Upper Primary)',
      Marathi: 'पेपर II (इयत्ता ६ ते ८ · उच्च प्राथमिक स्तर)',
      Hindi: 'पेपर II (कक्षा 6 से 8 · उच्च प्राथमिक स्तर)',
    },
    classesLabels: {
      English: 'Upper Primary Stage · Classes VI to VIII',
      Marathi: 'उच्च प्राथमिक स्तर · इयत्ता ६ वी ते ८ वी',
      Hindi: 'उच्च प्राथमिक स्तर · कक्षा 6 से 8',
    },
  },
};

export const TET_CTET_PAPER_SUBJECTS: Record<TetCtetNotePaper, TetCtetSubjectCatalogMeta[]> = {
  PAPER_1: [
    {
      subjectId: 'CDP',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Child Development & Pedagogy',
        Marathi: 'बालविकास व अध्यापनशास्त्र',
        Hindi: 'बाल विकास एवं शिक्षाशास्त्र',
      },
      shortDesc: {
        English: 'Growth, Piaget-Vygotsky-Kohlberg, Inclusive Education & Learning Theories',
        Marathi: 'वाढ-विकास, पियाजे-वायगोट्स्की-कोहलबर्ग, समावेशी शिक्षण व अध्ययन उपपत्ती',
        Hindi: 'विकास सिद्धांत, पियाजे-वायगोट्स्की-कोहलबर्ग, समावेशी शिक्षा एवं अधिगम',
      },
    },
    {
      subjectId: 'LANGUAGE_1',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Language I (Comprehension, Grammar & Pedagogy)',
        Marathi: 'भाषा I (आकलन, व्याकरण व भाषा अध्यापनशास्त्र)',
        Hindi: 'भाषा I (अपठित गद्यांश, व्याकरण एवं भाषा शिक्षाशास्त्र)',
      },
      shortDesc: {
        English: 'Unseen Prose/Poetry, Grammar & First Language Acquisition Pedagogy',
        Marathi: 'अपठित उतारा-कविता, शुद्धलेखन-व्याकरण व प्रथम भाषा अध्यापनशास्त्र',
        Hindi: 'अपठित गद्यांश-पद्यांश, व्याकरण व प्रथम भाषा अर्जन शिक्षाशास्त्र',
      },
    },
    {
      subjectId: 'LANGUAGE_2',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Language II (Communication, Grammar & Pedagogy)',
        Marathi: 'भाषा II (संवाद कौशल्य, व्याकरण व द्वितीय भाषा अध्यापन)',
        Hindi: 'भाषा II (संप्रेषण, व्याकरण एवं द्वितीय भाषा शिक्षाशास्त्र)',
      },
      shortDesc: {
        English: 'LSRW Skills, Krashen Second Language Theory, Applied Grammar & Remedial Teaching',
        Marathi: 'श्रवण-भाषण-वाचन-लेखन, द्वितीय भाषा अध्ययन, उपयोजित व्याकरण व उपचारात्मक अध्यापन',
        Hindi: 'LSRW कौशल, क्रैशन द्वितीय भाषा सिद्धांत, व्यावहारिक व्याकरण एवं उपचारात्मक शिक्षण',
      },
    },
    {
      subjectId: 'MATHEMATICS',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Mathematics (Paper I)',
        Marathi: 'गणित (पेपर I)',
        Hindi: 'गणित (पेपर I)',
      },
      shortDesc: {
        English: 'Number System, Fractions, Geometry, Measurement, Patterns & Van Hiele Math Pedagogy',
        Marathi: 'संख्याज्ञान, अपूर्णांक, भूमिती, मापन, आकृतिबंध व गणित अध्यापनशास्त्र',
        Hindi: 'संख्या पद्धति, भिन्न, ज्यामिति, मापन, पैटर्न एवं वैन हीले गणित शिक्षाशास्त्र',
      },
    },
    {
      subjectId: 'EVS',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Environmental Studies (EVS)',
        Marathi: 'परिसर अभ्यास (EVS)',
        Hindi: 'पर्यावरण अध्ययन (EVS)',
      },
      shortDesc: {
        English: '6 Official Themes (Family, Food, Shelter, Water, Travel, Things We Make) & EVS Pedagogy',
        Marathi: '६ अधिकृत विषय (कुटुंब, अन्न, निवारा, पाणी, प्रवास, निर्मिती), महाराष्ट्र परिसर व अध्यापनशास्त्र',
        Hindi: '6 आधिकारिक थीम (परिवार, भोजन, आवास, जल, यात्रा, चीजें जो हम बनाते हैं) एवं EVS शिक्षाशास्त्र',
      },
    },
  ],
  PAPER_2: [
    {
      subjectId: 'CDP',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Child Development & Pedagogy',
        Marathi: 'बालविकास व अध्यापनशास्त्र',
        Hindi: 'बाल विकास एवं शिक्षाशास्त्र',
      },
      shortDesc: {
        English: 'Elementary & Adolescent Development, Constructivism, Inclusive Education & Assessment',
        Marathi: 'बाल व कुमारवयीन विकास, ज्ञानरचनावाद, समावेशी शिक्षण व सातत्यपूर्ण मूल्यमापन',
        Hindi: 'बाल एवं किशोर विकास, संरचनावाद, समावेशी शिक्षा व सतत मूल्यांकन',
      },
    },
    {
      subjectId: 'LANGUAGE_1',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Language I (Comprehension, Grammar & Pedagogy)',
        Marathi: 'भाषा I (आकलन, व्याकरण व भाषा अध्यापनशास्त्र)',
        Hindi: 'भाषा I (अपठित गद्यांश, व्याकरण एवं भाषा शिक्षाशास्त्र)',
      },
      shortDesc: {
        English: 'Analytical Reading, Literary Devices, Grammar & Upper-Primary Language Pedagogy',
        Marathi: 'सखोल आकलन, अलंकार-समास-वाक्यप्रकार व उच्च प्राथमिक भाषा अध्यापनशास्त्र',
        Hindi: 'विश्लेषणात्मक गद्यांश, अलंकार-समास-व्याकरण एवं उच्च प्राथमिक भाषा शिक्षाशास्त्र',
      },
    },
    {
      subjectId: 'LANGUAGE_2',
      marks: 30,
      questions: 30,
      streamGroup: 'CORE',
      labels: {
        English: 'Language II (Communication, Grammar & Pedagogy)',
        Marathi: 'भाषा II (संवाद कौशल्य, व्याकरण व द्वितीय भाषा अध्यापन)',
        Hindi: 'भाषा II (संप्रेषण, व्याकरण एवं द्वितीय भाषा शिक्षाशास्त्र)',
      },
      shortDesc: {
        English: 'Prose Comprehension, Active-Passive/Direct-Indirect, CLT & Diagnostic Testing',
        Marathi: 'उतारा आकलन, प्रयोग-काळ-संवाद कौशल्य व उपचारात्मक निदान चाचणी',
        Hindi: 'गद्यांश बोध, वाच्य-काल-संप्रेषणात्मक शिक्षण एवं निदानात्मक परीक्षण',
      },
    },
    {
      subjectId: 'MATHEMATICS',
      marks: 30,
      questions: 30,
      streamGroup: 'MATH_SCIENCE',
      labels: {
        English: 'Mathematics (Paper II · Math & Science Stream)',
        Marathi: 'गणित (पेपर II · गणित व विज्ञान गट)',
        Hindi: 'गणित (पेपर II · गणित व विज्ञान वर्ग)',
      },
      shortDesc: {
        English: 'Number System, Algebra, Ratio/Percentage, Geometry, Mensuration, Statistics & Pedagogy',
        Marathi: 'संख्यापद्धती, बीजगणित, प्रमाण-शेकडेवारी, भूमिती, क्षेत्रफळ-घनफळ, सांख्यिकी व अध्यापनशास्त्र',
        Hindi: 'संख्या पद्धति, बीजगणित, अनुपात-प्रतिशत, ज्यामिति, क्षेत्रमिति, सांख्यिकी एवं शिक्षाशास्त्र',
      },
    },
    {
      subjectId: 'SCIENCE',
      marks: 30,
      questions: 30,
      streamGroup: 'MATH_SCIENCE',
      labels: {
        English: 'Science (Paper II · Math & Science Stream)',
        Marathi: 'विज्ञान (पेपर II · गणित व विज्ञान गट)',
        Hindi: 'विज्ञान (पेपर II · गणित व विज्ञान वर्ग)',
      },
      shortDesc: {
        English: 'Biology (Cell/Systems), Chemistry (Acids-Metals), Physics (Light-Electricity) & Science Pedagogy',
        Marathi: 'जीवशास्त्र (पेशी-संस्था), रसायनशास्त्र (आम्ल-धातू), भौतिकशास्त्र (प्रकाश-विद्युत) व विज्ञान अध्यापनशास्त्र',
        Hindi: 'जीवविज्ञान (कोशिका-तंत्र), रसायन (अम्ल-धातु), भौतिकी (प्रकाश-विद्युत) एवं विज्ञान शिक्षाशास्त्र',
      },
    },
    {
      subjectId: 'SOCIAL_STUDIES',
      marks: 60,
      questions: 60,
      streamGroup: 'SOCIAL_STUDIES',
      labels: {
        English: 'Social Studies / Social Science (Paper II · SST Stream)',
        Marathi: 'सामाजिक शास्त्रे (पेपर II · सामाजिक शास्त्र गट)',
        Hindi: 'सामाजिक अध्ययन / सामाजिक विज्ञान (पेपर II · SST वर्ग)',
      },
      shortDesc: {
        English: 'History (Ancient-Modern & Maratha), Geography (Earth-India-Maharashtra), Polity & SST Pedagogy',
        Marathi: 'इतिहास (प्राचीन-आधुनिक व स्वराज्य), भूगोल (पृथ्वी-महाराष्ट्र), संविधान-पंचायत राज व अध्यापनशास्त्र',
        Hindi: 'इतिहास (प्राचीन-आधुनिक व स्वराज्य), भूगोल (पृथ्वी-भारत-महाराष्ट्र), संविधान एवं SST शिक्षाशास्त्र',
      },
    },
  ],
};

export function getTetCtetSubjectsForPaper(paper: TetCtetNotePaper): TetCtetSubjectCatalogMeta[] {
  return TET_CTET_PAPER_SUBJECTS[paper];
}

export const ALL_TET_CTET_BLUEPRINTS: TetCtetNoteTopicBlueprint[] = [
  ...CDP_NOTE_BLUEPRINTS,
  ...LANGUAGE_1_NOTE_BLUEPRINTS,
  ...LANGUAGE_2_NOTE_BLUEPRINTS,
  ...MATH_PAPER_1_NOTE_BLUEPRINTS,
  ...MATH_PAPER_2_NOTE_BLUEPRINTS,
  ...EVS_PAPER_1_NOTE_BLUEPRINTS,
  ...SCIENCE_PAPER_2_NOTE_BLUEPRINTS,
  ...SOCIAL_STUDIES_PAPER_2_NOTE_BLUEPRINTS,
];

const LANG_CODE: Record<TetCtetNoteLanguage, string> = {
  English: 'EN',
  Marathi: 'MR',
  Hindi: 'HI',
};

function getSubjectLabel(
  paper: TetCtetNotePaper,
  subjectId: TetCtetNoteSubjectId,
  language: TetCtetNoteLanguage
): string {
  const found = TET_CTET_PAPER_SUBJECTS[paper].find((s) => s.subjectId === subjectId);
  return found ? found.labels[language] : subjectId;
}

const DEFAULT_UPDATED_AT = '2026-05-01';

// Deterministic expansion into uniquely indexed study note documents (ZERO duplicates)
function buildBaseCatalog(): TetCtetStudyNoteDocument[] {
  const docs: TetCtetStudyNoteDocument[] = [];
  const seenIds = new Set<string>();

  for (const bp of ALL_TET_CTET_BLUEPRINTS) {
    for (const exam of bp.applicableExams) {
      for (const paper of bp.applicablePapers) {
        const paperSubjects = TET_CTET_PAPER_SUBJECTS[paper];
        if (!paperSubjects.some((s) => s.subjectId === bp.subjectId)) {
          continue;
        }
        for (const language of TET_CTET_NOTE_LANGUAGES) {
          const localizedBody = bp.content[language];
          if (!localizedBody) continue;
          const paperCode = paper === 'PAPER_1' ? 'P1' : 'P2';
          const langCode = LANG_CODE[language];
          const id = `tet_note_${exam}_${paperCode}_${langCode}_${bp.slug}`;
          if (seenIds.has(id)) continue;
          seenIds.add(id);

          const fileReference = `TET_CTET_NOTES/${exam}/${paperCode}/${langCode}/${bp.subjectId}/U${bp.unitNumber}_T${bp.topicNumber}_${bp.slug}`;
          const syllabusSource = exam === 'CTET' ? bp.syllabusSourceRef.ctet : bp.syllabusSourceRef.mahaTet;

          docs.push({
            id,
            fileReference,
            exam,
            paper,
            language,
            subjectId: bp.subjectId,
            subjectName: getSubjectLabel(paper, bp.subjectId, language),
            unitNumber: bp.unitNumber,
            unitTitle: localizedBody.unitTitle,
            topicNumber: bp.topicNumber,
            topicTitle: localizedBody.topicTitle,
            documentTitle: localizedBody.documentTitle,
            syllabusSource,
            isPublished: true,
            isCustom: false,
            updatedAt: DEFAULT_UPDATED_AT,
            body: localizedBody,
          });
        }
      }
    }
  }

  return docs;
}

const BASE_STUDY_NOTE_CATALOG: TetCtetStudyNoteDocument[] = buildBaseCatalog();

// =========================================================================
// ADMIN OVERRIDES & CUSTOM STUDY NOTES STORE (localStorage + Live Events)
// =========================================================================
const STORAGE_OVERRIDES_KEY = 'mystudyzone_tet_ctet_notes_overrides_v1';
const STORAGE_CUSTOM_NOTES_KEY = 'mystudyzone_tet_ctet_notes_custom_v1';
const UPDATE_EVENT_NAME = 'mystudyzone:tet-ctet-notes-updated';

interface NoteAdminOverride {
  isPublished?: boolean;
  documentTitle?: string;
  unitTitle?: string;
  topicTitle?: string;
  topicSummary?: string;
  updatedAt?: string;
}

function readOverrides(): Record<string, NoteAdminOverride> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_OVERRIDES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, NoteAdminOverride>) : {};
  } catch {
    return {};
  }
}

function writeOverrides(next: Record<string, NoteAdminOverride>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_OVERRIDES_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME));
  } catch {
    // ignore storage quota errors
  }
}

function readCustomNotes(): TetCtetStudyNoteDocument[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_CUSTOM_NOTES_KEY);
    return raw ? (JSON.parse(raw) as TetCtetStudyNoteDocument[]) : [];
  } catch {
    return [];
  }
}

function writeCustomNotes(next: TetCtetStudyNoteDocument[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_CUSTOM_NOTES_KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent(UPDATE_EVENT_NAME));
  } catch {
    // ignore storage quota errors
  }
}

export function subscribeToTetCtetNotesUpdates(listener: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const handler = () => listener();
  window.addEventListener(UPDATE_EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(UPDATE_EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
}

export function getAllTetCtetStudyNotes(includeHidden = false): TetCtetStudyNoteDocument[] {
  const overrides = readOverrides();
  const customNotes = readCustomNotes();

  const mergedBase = BASE_STUDY_NOTE_CATALOG.map((doc) => {
    const ov = overrides[doc.id];
    if (!ov) return doc;
    return {
      ...doc,
      isPublished: ov.isPublished !== undefined ? ov.isPublished : doc.isPublished,
      documentTitle: ov.documentTitle ?? doc.documentTitle,
      unitTitle: ov.unitTitle ?? doc.unitTitle,
      topicTitle: ov.topicTitle ?? doc.topicTitle,
      updatedAt: ov.updatedAt ?? doc.updatedAt,
      body: {
        ...doc.body,
        documentTitle: ov.documentTitle ?? doc.body.documentTitle,
        unitTitle: ov.unitTitle ?? doc.body.unitTitle,
        topicTitle: ov.topicTitle ?? doc.body.topicTitle,
        topicSummary: ov.topicSummary ?? doc.body.topicSummary,
      },
    };
  });

  const mergedCustom = customNotes.map((doc) => {
    const ov = overrides[doc.id];
    if (!ov) return doc;
    return {
      ...doc,
      isPublished: ov.isPublished !== undefined ? ov.isPublished : doc.isPublished,
      documentTitle: ov.documentTitle ?? doc.documentTitle,
      unitTitle: ov.unitTitle ?? doc.unitTitle,
      topicTitle: ov.topicTitle ?? doc.topicTitle,
      updatedAt: ov.updatedAt ?? doc.updatedAt,
      body: {
        ...doc.body,
        documentTitle: ov.documentTitle ?? doc.body.documentTitle,
        unitTitle: ov.unitTitle ?? doc.body.unitTitle,
        topicTitle: ov.topicTitle ?? doc.body.topicTitle,
        topicSummary: ov.topicSummary ?? doc.body.topicSummary,
      },
    };
  });

  const combined = [...mergedBase, ...mergedCustom];
  return includeHidden ? combined : combined.filter((d) => d.isPublished);
}

export function getTetCtetNotesForSelection(
  exam: TetCtetNoteExam,
  paper: TetCtetNotePaper,
  language: TetCtetNoteLanguage,
  subjectId: TetCtetNoteSubjectId,
  includeHidden = false
): TetCtetStudyNoteDocument[] {
  return getAllTetCtetStudyNotes(includeHidden)
    .filter(
      (doc) =>
        doc.exam === exam &&
        doc.paper === paper &&
        doc.language === language &&
        doc.subjectId === subjectId
    )
    .sort((a, b) => a.unitNumber - b.unitNumber || a.topicNumber - b.topicNumber);
}

export function toggleTetCtetNotePublished(id: string): boolean {
  const all = getAllTetCtetStudyNotes(true);
  const target = all.find((d) => d.id === id);
  if (!target) return false;
  const overrides = readOverrides();
  const nextPublished = !target.isPublished;
  overrides[id] = {
    ...(overrides[id] || {}),
    isPublished: nextPublished,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  writeOverrides(overrides);
  return nextPublished;
}

export function updateTetCtetNoteMetadata(
  id: string,
  patch: {
    documentTitle?: string;
    unitTitle?: string;
    topicTitle?: string;
    topicSummary?: string;
  }
): void {
  const overrides = readOverrides();
  overrides[id] = {
    ...(overrides[id] || {}),
    ...patch,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  writeOverrides(overrides);
}

export interface AddCustomTetCtetNoteInput {
  exam: TetCtetNoteExam;
  paper: TetCtetNotePaper;
  language: TetCtetNoteLanguage;
  subjectId: TetCtetNoteSubjectId;
  unitNumber: number;
  unitTitle: string;
  topicTitle: string;
  documentTitle: string;
  introduction: string;
  detailedExplanation: string[];
  importantExamPoints: string[];
  topicSummary: string;
  revisionPoints: string[];
}

export function addCustomTetCtetStudyNote(
  input: AddCustomTetCtetNoteInput
): { ok: true; document: TetCtetStudyNoteDocument } | { ok: false; error: string } {
  const normalizedTitle = input.documentTitle.trim().toLowerCase();
  if (!normalizedTitle || !input.unitTitle.trim() || !input.topicTitle.trim()) {
    return { ok: false, error: 'Document title, Unit title, and Topic title are required.' };
  }

  const existingAll = getAllTetCtetStudyNotes(true);
  const duplicate = existingAll.find(
    (d) =>
      d.exam === input.exam &&
      d.paper === input.paper &&
      d.language === input.language &&
      d.subjectId === input.subjectId &&
      (d.documentTitle.trim().toLowerCase() === normalizedTitle ||
        d.topicTitle.trim().toLowerCase() === input.topicTitle.trim().toLowerCase())
  );

  if (duplicate) {
    return {
      ok: false,
      error: `Duplicate detected: A study note with matching title/topic already exists (${duplicate.fileReference}). Edit the existing note instead of creating a duplicate.`,
    };
  }

  const sameBucket = existingAll.filter(
    (d) =>
      d.exam === input.exam &&
      d.paper === input.paper &&
      d.language === input.language &&
      d.subjectId === input.subjectId &&
      d.unitNumber === input.unitNumber
  );
  const nextTopicNumber = sameBucket.length + 1;
  const paperCode = input.paper === 'PAPER_1' ? 'P1' : 'P2';
  const langCode = LANG_CODE[input.language];
  const slug = normalizedTitle
    .replace(/[^a-z0-9\u0900-\u097f]+/gi, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || `custom-${Date.now()}`;
  const id = `tet_note_custom_${input.exam}_${paperCode}_${langCode}_${Date.now()}`;
  const fileReference = `TET_CTET_NOTES/${input.exam}/${paperCode}/${langCode}/${input.subjectId}/U${input.unitNumber}_T${nextTopicNumber}_${slug}`;
  const today = new Date().toISOString().slice(0, 10);

  const body: TetCtetLocalizedNoteBody = {
    documentTitle: input.documentTitle.trim(),
    unitTitle: input.unitTitle.trim(),
    topicTitle: input.topicTitle.trim(),
    subtopics: [input.topicTitle.trim()],
    introduction: input.introduction.trim() || input.topicSummary.trim(),
    meaningAndDefinition: input.introduction.trim() || input.topicSummary.trim(),
    detailedExplanation:
      input.detailedExplanation.length > 0
        ? input.detailedExplanation
        : [input.topicSummary.trim()],
    importantConcepts: input.importantExamPoints,
    practicalExamples: [],
    classroomApplications: [],
    teachingMethods: [],
    examSpecificFocus: {
      ctet:
        input.exam === 'CTET'
          ? input.topicSummary.trim()
          : 'Aligned with CBSE CTET official syllabus guidelines.',
      mahaTet:
        input.exam === 'MAHA_TET'
          ? input.topicSummary.trim()
          : 'Aligned with MSCE Pune MAHA TET official syllabus guidelines.',
    },
    importantExamPoints: input.importantExamPoints,
    commonMistakes: [],
    topicSummary: input.topicSummary.trim(),
    revisionPoints:
      input.revisionPoints.length > 0 ? input.revisionPoints : input.importantExamPoints,
    practiceQuestions: [],
  };

  const newDoc: TetCtetStudyNoteDocument = {
    id,
    fileReference,
    exam: input.exam,
    paper: input.paper,
    language: input.language,
    subjectId: input.subjectId,
    subjectName: getSubjectLabel(input.paper, input.subjectId, input.language),
    unitNumber: input.unitNumber,
    unitTitle: input.unitTitle.trim(),
    topicNumber: nextTopicNumber,
    topicTitle: input.topicTitle.trim(),
    documentTitle: input.documentTitle.trim(),
    syllabusSource:
      input.exam === 'CTET'
        ? 'CBSE CTET Official Syllabus (ctet.nic.in) — Admin Added Note'
        : 'MSCE Pune MAHA TET Official Syllabus (mahatet.in) — Admin Added Note',
    isPublished: true,
    isCustom: true,
    updatedAt: today,
    body,
  };

  const currentCustom = readCustomNotes();
  writeCustomNotes([...currentCustom, newDoc]);
  return { ok: true, document: newDoc };
}

export function deleteCustomTetCtetStudyNote(id: string): boolean {
  const currentCustom = readCustomNotes();
  const next = currentCustom.filter((d) => d.id !== id);
  if (next.length === currentCustom.length) return false;
  writeCustomNotes(next);
  return true;
}

export function getTetCtetNotesCatalogStats() {
  const all = getAllTetCtetStudyNotes(true);
  const published = all.filter((d) => d.isPublished);
  return {
    totalBlueprints: ALL_TET_CTET_BLUEPRINTS.length,
    totalDocuments: all.length,
    publishedDocuments: published.length,
    hiddenDocuments: all.length - published.length,
    customDocuments: all.filter((d) => d.isCustom).length,
    byLanguage: {
      English: all.filter((d) => d.language === 'English').length,
      Marathi: all.filter((d) => d.language === 'Marathi').length,
      Hindi: all.filter((d) => d.language === 'Hindi').length,
    },
    byPaper: {
      CTET_PAPER_1: all.filter((d) => d.exam === 'CTET' && d.paper === 'PAPER_1').length,
      CTET_PAPER_2: all.filter((d) => d.exam === 'CTET' && d.paper === 'PAPER_2').length,
      MAHA_TET_PAPER_1: all.filter((d) => d.exam === 'MAHA_TET' && d.paper === 'PAPER_1').length,
      MAHA_TET_PAPER_2: all.filter((d) => d.exam === 'MAHA_TET' && d.paper === 'PAPER_2').length,
    },
  };
}
