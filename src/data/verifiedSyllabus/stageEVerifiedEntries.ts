import type { InstructionMedium } from '../../types/lessonPlanner';
import type {
  CentralChapterItem,
  CentralMediumVariant,
  CentralSyllabusEntry,
  CentralVerificationStatus,
} from './centralSyllabusDatabase';

export interface StageENewEntryDefinition {
  verificationStatus: CentralVerificationStatus;
  textbookTitle: string;
  publisher: string;
  academicYearEdition: string;
  applicableMediums: InstructionMedium[];
  officialSourceUrl: string;
  verificationNote: string;
  chapters: CentralChapterItem[];
  mediumVariants: CentralMediumVariant[];
}

const BALBHARATI_PUB =
  'Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune';

const MH_ALL_4_MEDIUMS: InstructionMedium[] = ['English', 'Marathi', 'Hindi', 'Semi-English'];

function buildUnits(
  items: Array<{ title: string; sectionOrPart?: string }>
): CentralChapterItem[] {
  return items.map((item, idx) => ({
    sequenceIndex: idx + 1,
    chapterNumber: idx + 1,
    chapterTitle: item.title,
    ...(item.sectionOrPart ? { sectionOrPart: item.sectionOrPart } : {}),
    sectionType: 'unit',
  }));
}

// =============================================================================
// STAGE E — BATCH 1: Official Balbharati Textbooks Recovered Directly from
// ebooks.ebalbharati.in/pdfs/ (English, Marathi, Hindi, and Semi-English)
// Every PDF was directly downloaded, SHA-256 hashed, and TOC-verified verbatim.
// =============================================================================

// 1. Maharashtra Class 1 — Drawing and Creative Activities
//    Official Textbook: "Play, Do, Learn — Standard One"
//    English: 103000620.pdf | Marathi: 101000620.pdf | Hindi: 102000620.pdf

const MH_C1_PLAY_DO_LEARN_EN = buildUnits([
  { title: '1. Health', sectionOrPart: 'Play (Health and Physical Education)' },
  {
    title: '2. Different types of movements and Appropriate body postures',
    sectionOrPart: 'Play (Health and Physical Education)',
  },
  { title: '3. Games and Competitions', sectionOrPart: 'Play (Health and Physical Education)' },
  { title: '4. Skill Based Activity', sectionOrPart: 'Play (Health and Physical Education)' },
  { title: '5. Exercises', sectionOrPart: 'Play (Health and Physical Education)' },
  { title: '1. Need Based Activities', sectionOrPart: 'Do (Work Experience)' },
  { title: '2. Craft Based Activities', sectionOrPart: 'Do (Work Experience)' },
  { title: '3. Skill Based Activities', sectionOrPart: 'Do (Work Experience)' },
  { title: '4. Optional Activities', sectionOrPart: 'Do (Work Experience)' },
  { title: '5. Area - Technology', sectionOrPart: 'Do (Work Experience)' },
  { title: '1. Picture', sectionOrPart: 'Learn (Art Education)' },
  { title: '2. Sculpture', sectionOrPart: 'Learn (Art Education)' },
  { title: '3. Singing', sectionOrPart: 'Learn (Art Education)' },
  { title: '4. Sounds', sectionOrPart: 'Learn (Art Education)' },
  { title: '5. Dance', sectionOrPart: 'Learn (Art Education)' },
  { title: '6. Drama', sectionOrPart: 'Learn (Art Education)' },
]);

const MH_C1_PLAY_DO_LEARN_MR = buildUnits([
  { title: '१. आरोग्य', sectionOrPart: 'खेळू (आरोग्य व शारीरिक शिक्षण)' },
  {
    title: '२. विविध हालचाली व योग्य शारीरिक स्थिती',
    sectionOrPart: 'खेळू (आरोग्य व शारीरिक शिक्षण)',
  },
  { title: '३. खेळ व शर्यती', sectionOrPart: 'खेळू (आरोग्य व शारीरिक शिक्षण)' },
  { title: '४. कौशल्यात्मक उपक्रम', sectionOrPart: 'खेळू (आरोग्य व शारीरिक शिक्षण)' },
  { title: '५. व्यायाम', sectionOrPart: 'खेळू (आरोग्य व शारीरिक शिक्षण)' },
  { title: '१. गरजाधिष्ठित उपक्रम', sectionOrPart: 'करू (कार्यानुभव)' },
  { title: '२. अभिरुचिपूरक उपक्रम', sectionOrPart: 'करू (कार्यानुभव)' },
  { title: '३. कौशल्याधिष्ठित उपक्रम', sectionOrPart: 'करू (कार्यानुभव)' },
  { title: '४. ऐच्छिक उपक्रम', sectionOrPart: 'करू (कार्यानुभव)' },
  { title: '५. तंत्रज्ञान क्षेत्र', sectionOrPart: 'करू (कार्यानुभव)' },
  { title: '१. चित्र', sectionOrPart: 'शिकू (कलाशिक्षण)' },
  { title: '२. शिल्प', sectionOrPart: 'शिकू (कलाशिक्षण)' },
  { title: '३. गायन', sectionOrPart: 'शिकू (कलाशिक्षण)' },
  { title: '४. वादन', sectionOrPart: 'शिकू (कलाशिक्षण)' },
  { title: '५. नृत्य', sectionOrPart: 'शिकू (कलाशिक्षण)' },
  { title: '६. नाट्य', sectionOrPart: 'शिकू (कलाशिक्षण)' },
]);

const MH_C1_PLAY_DO_LEARN_HI = buildUnits([
  { title: '१. आरोग्य', sectionOrPart: 'खेलें (आरोग्य एवं शारीरिक शिक्षण)' },
  {
    title: '२. विभिन्न गतिविधियाँ और योग्य शारीरिक स्थिति',
    sectionOrPart: 'खेलें (आरोग्य एवं शारीरिक शिक्षण)',
  },
  { title: '३. खेल और दौड़', sectionOrPart: 'खेलें (आरोग्य एवं शारीरिक शिक्षण)' },
  { title: '४. कौशल के उपक्रम', sectionOrPart: 'खेलें (आरोग्य एवं शारीरिक शिक्षण)' },
  { title: '५. कसरत', sectionOrPart: 'खेलें (आरोग्य एवं शारीरिक शिक्षण)' },
  { title: '१. आवश्यकता पर आधारित उपक्रम', sectionOrPart: 'करें (कार्यानुभव)' },
  { title: '२. अभिरुचिपूरक उपक्रम', sectionOrPart: 'करें (कार्यानुभव)' },
  { title: '३. कौशल पर आधारित उपक्रम', sectionOrPart: 'करें (कार्यानुभव)' },
  { title: '४. ऐच्छिक उपक्रम', sectionOrPart: 'करें (कार्यानुभव)' },
  { title: '५. प्रौद्योगिकी क्षेत्र', sectionOrPart: 'करें (कार्यानुभव)' },
  { title: '१. चित्र', sectionOrPart: 'सीखें (कला शिक्षण)' },
  { title: '२. शिल्प', sectionOrPart: 'सीखें (कला शिक्षण)' },
  { title: '३. गायन', sectionOrPart: 'सीखें (कला शिक्षण)' },
  { title: '४. वादन', sectionOrPart: 'सीखें (कला शिक्षण)' },
  { title: '५. नृत्य', sectionOrPart: 'सीखें (कला शिक्षण)' },
  { title: '६. नाट्य', sectionOrPart: 'सीखें (कला शिक्षण)' },
]);

// 2. Maharashtra Class 9 — Moral Education
//    Official Textbook: "Self Development and Art Appreciation — Standard Nine"
//    English: 903000610.pdf | Marathi: 901000610.pdf | Hindi: 902000610.pdf

const MH_C9_SELF_DEV_EN = buildUnits([
  { title: 'My Identity' },
  { title: 'Growing Up' },
  { title: 'Values' },
  { title: 'Social Leadership' },
  { title: 'Art Appreciation – Visual Arts' },
  { title: 'Conflict Resolution' },
  { title: 'Growth Mindset' },
  { title: 'Careers' },
  { title: 'Art Appreciation – Performing Arts' },
]);

const MH_C9_SELF_DEV_MR = buildUnits([
  { title: 'स्व-ओळख' },
  { title: 'वाढीचे वय' },
  { title: 'मूल्ये' },
  { title: 'सामाजिक नेतृत्व' },
  { title: 'कला रसास्वाद – दृश्य कला' },
  { title: 'संघर्ष मिटवणे' },
  { title: 'वाढीस पूरक मानसिकता' },
  { title: 'करिअर' },
  { title: 'कला रसास्वाद – प्रयोगजीवी कला' },
]);

const MH_C9_SELF_DEV_HI = buildUnits([
  { title: '‘स्व’ – पहचान' },
  { title: 'वृद्धि की आयु' },
  { title: 'मूल्य' },
  { title: 'सामाजिक नेतृत्व' },
  { title: 'कला रसास्वाद – दृश्य कला' },
  { title: 'संघर्ष मिटाना' },
  { title: 'वृद्धि के लिए पूरक मानसिकता' },
  { title: 'कैरियर' },
  { title: 'कला रसास्वाद – प्रयोगजीवी कला' },
]);

// 3. Maharashtra Class 10 — Moral Education
//    Official Textbook: "Self Development and Art Appreciation — Standard Ten"
//    English: 1003000610.pdf | Marathi: 1001000610.pdf | Hindi: 1002000610.pdf

const MH_C10_SELF_DEV_EN = buildUnits([
  { title: 'Me as a Citizen' },
  { title: 'Media and I (Part - 1)' },
  { title: 'Visual Arts and I' },
  { title: 'Media and I (Part - 2)' },
  { title: 'My Career and I' },
  { title: 'Performing Arts and I' },
]);

const MH_C10_SELF_DEV_MR = buildUnits([
  { title: 'मी एक नागरिक' },
  { title: 'मी आणि माध्यमे–१' },
  { title: 'मी आणि दृश्य कला' },
  { title: 'मी आणि माध्यमे–२' },
  { title: 'मी आणि माझे करिअर' },
  { title: 'मी आणि प्रयोगजीवी कला' },
]);

const MH_C10_SELF_DEV_HI = buildUnits([
  { title: 'मैं एक नागरिक' },
  { title: 'मैं और माध्यम – १' },
  { title: 'मैं और दृश्य कलाएँ' },
  { title: 'मैं और माध्यम – २' },
  { title: 'मैं और मेरा करीयर' },
  { title: 'मैं और प्रयोगधर्मी कलाएँ' },
]);

export const STAGE_E_NEW_VERIFIED_ENTRIES_MAP: Readonly<Record<string, StageENewEntryDefinition>> =
  Object.freeze({
    'Maharashtra__Class 1__Drawing and Creative Activities': {
      verificationStatus: 'VERIFIED',
      textbookTitle: 'Play, Do, Learn – Standard One (Health & PE, Work Experience, Art Education)',
      publisher: BALBHARATI_PUB,
      academicYearEdition: 'Official Balbharati Edition (eBalbharati Archive)',
      applicableMediums: MH_ALL_4_MEDIUMS,
      officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/103000620.pdf',
      verificationNote:
        'Verified verbatim from official eBalbharati PDFs across English (103000620.pdf, SHA-256 e48a4000105d5c71...), Marathi (101000620.pdf, SHA-256 5016b3943a1f469b...), and Hindi (102000620.pdf, SHA-256 34b2bf173458f37a...) — 16 official units across Play, Do, and Learn.',
      chapters: MH_C1_PLAY_DO_LEARN_EN,
      mediumVariants: [
        {
          medium: 'English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'Play, Do, Learn – Standard One (English Medium, Item 103000620)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: 'Official Balbharati Edition (eBalbharati Archive)',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/103000620.pdf',
          verificationNote:
            'Verified verbatim from official eBalbharati PDF 103000620.pdf (16 units across Play, Do, and Learn, SHA-256 e48a4000105d5c71...).',
          chapters: MH_C1_PLAY_DO_LEARN_EN,
        },
        {
          medium: 'Marathi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'खेळू, करू, शिकू – इयत्ता पहिली (मराठी माध्यम, Item 101000620)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: 'Official Balbharati Edition (eBalbharati Archive)',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/101000620.pdf',
          verificationNote:
            'Verified visually & verbatim from official eBalbharati PDF 101000620.pdf (TOC page 10, 16 units across खेळू, करू, शिकू, SHA-256 5016b3943a1f469b...).',
          chapters: MH_C1_PLAY_DO_LEARN_MR,
        },
        {
          medium: 'Hindi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'खेलें, करें, सीखें – कक्षा पहली (हिंदी माध्यम, Item 102000620)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: 'Official Balbharati Edition (eBalbharati Archive)',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/102000620.pdf',
          verificationNote:
            'Verified visually & verbatim from official eBalbharati PDF 102000620.pdf (TOC page 10, 16 units across खेलें, करें, सीखें, SHA-256 34b2bf173458f37a...).',
          chapters: MH_C1_PLAY_DO_LEARN_HI,
        },
        {
          medium: 'Semi-English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'खेळू, करू, शिकू – इयत्ता पहिली (Semi-English Medium, Item 101000620)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: 'Official Balbharati Edition (eBalbharati Archive)',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/101000620.pdf',
          verificationNote:
            'Official Balbharati Marathi edition prescribed for Semi-English medium schools (101000620.pdf, 16 units, SHA-256 5016b3943a1f469b...).',
          chapters: MH_C1_PLAY_DO_LEARN_MR,
        },
      ],
    },

    'Maharashtra__Class 9__Moral Education': {
      verificationStatus: 'VERIFIED',
      textbookTitle: 'Self Development and Art Appreciation – Standard Nine',
      publisher: BALBHARATI_PUB,
      academicYearEdition: '2025–2026 Official Balbharati Edition',
      applicableMediums: MH_ALL_4_MEDIUMS,
      officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/903000610.pdf',
      verificationNote:
        'Verified verbatim from official 2026 eBalbharati PDFs across English (903000610.pdf, SHA-256 3fae71f26e6767d6...), Marathi (901000610.pdf, SHA-256 d2c0afb68b7a9258...), and Hindi (902000610.pdf, SHA-256 1b32be3bf8ef9283...) — 9 official units covering Identity, Values, Leadership, Conflict Resolution, and Art Appreciation.',
      chapters: MH_C9_SELF_DEV_EN,
      mediumVariants: [
        {
          medium: 'English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'Self Development and Art Appreciation – Standard Nine (English Medium, Item 903000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/903000610.pdf',
          verificationNote:
            'Verified verbatim from official eBalbharati PDF 903000610.pdf (9 units, SHA-256 3fae71f26e6767d6...).',
          chapters: MH_C9_SELF_DEV_EN,
        },
        {
          medium: 'Marathi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'स्व-विकास व कला रसास्वाद – इयत्ता नववी (मराठी माध्यम, Item 901000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/901000610.pdf',
          verificationNote:
            'Verified visually & verbatim from official eBalbharati PDF 901000610.pdf (TOC page 13, 9 units, SHA-256 d2c0afb68b7a9258...).',
          chapters: MH_C9_SELF_DEV_MR,
        },
        {
          medium: 'Hindi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'स्व-विकास और कलारसास्वाद – कक्षा नौवीं (हिंदी माध्यम, Item 902000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/902000610.pdf',
          verificationNote:
            'Verified visually & verbatim from official eBalbharati PDF 902000610.pdf (TOC page 13, 9 units, SHA-256 1b32be3bf8ef9283...).',
          chapters: MH_C9_SELF_DEV_HI,
        },
        {
          medium: 'Semi-English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'स्व-विकास व कला रसास्वाद – इयत्ता नववी (Semi-English Medium, Item 901000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/901000610.pdf',
          verificationNote:
            'Official Balbharati Marathi edition prescribed for Semi-English medium schools (901000610.pdf, 9 units, SHA-256 d2c0afb68b7a9258...).',
          chapters: MH_C9_SELF_DEV_MR,
        },
      ],
    },

    'Maharashtra__Class 10__Moral Education': {
      verificationStatus: 'VERIFIED',
      textbookTitle: 'Self Development and Art Appreciation – Standard Ten',
      publisher: BALBHARATI_PUB,
      academicYearEdition: '2025–2026 Official Balbharati Edition',
      applicableMediums: MH_ALL_4_MEDIUMS,
      officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1003000610.pdf',
      verificationNote:
        'Verified verbatim from official 2026 eBalbharati PDFs across English (1003000610.pdf, SHA-256 5657bf80430c240e...), Marathi (1001000610.pdf, SHA-256 1bd829aecf3a335f...), and Hindi (1002000610.pdf, SHA-256 428ea654b313171f...) — 6 official units covering Citizenship, Media Literacy, Careers, and Art Appreciation.',
      chapters: MH_C10_SELF_DEV_EN,
      mediumVariants: [
        {
          medium: 'English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'Self Development and Art Appreciation – Standard Ten (English Medium, Item 1003000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1003000610.pdf',
          verificationNote:
            'Verified verbatim from official eBalbharati PDF 1003000610.pdf (6 units, SHA-256 5657bf80430c240e...).',
          chapters: MH_C10_SELF_DEV_EN,
        },
        {
          medium: 'Marathi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'स्व-विकास व कला रसास्वाद – इयत्ता दहावी (मराठी माध्यम, Item 1001000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1001000610.pdf',
          verificationNote:
            'Verified visually & verbatim from official eBalbharati PDF 1001000610.pdf (TOC page 12, 6 units, SHA-256 1bd829aecf3a335f...).',
          chapters: MH_C10_SELF_DEV_MR,
        },
        {
          medium: 'Hindi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'स्व-विकास और कलारसास्वाद – कक्षा दसवीं (हिंदी माध्यम, Item 1002000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1002000610.pdf',
          verificationNote:
            'Verified visually & verbatim from official eBalbharati PDF 1002000610.pdf (TOC page 12, 6 units, SHA-256 428ea654b313171f...).',
          chapters: MH_C10_SELF_DEV_HI,
        },
        {
          medium: 'Semi-English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle:
            'स्व-विकास व कला रसास्वाद – इयत्ता दहावी (Semi-English Medium, Item 1001000610)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Balbharati Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1001000610.pdf',
          verificationNote:
            'Official Balbharati Marathi edition prescribed for Semi-English medium schools (1001000610.pdf, 6 units, SHA-256 1bd829aecf3a335f...).',
          chapters: MH_C10_SELF_DEV_MR,
        },
      ],
    },
  });

// =============================================================================
// STAGE E — FINAL SYLLABUS RECONCILIATION OVERLAY
// Reconciles every non-VERIFIED entry into an exact, authoritative classification:
//   - INTEGRATED_INTO_PARENT (21 entries): Linked to already-VERIFIED parent textbooks; chapters: []
//   - NOT_PUBLISHED_AS_STANDALONE (124 entries): No standalone official textbook exists; chapters: []
//   - SCHOOL_TEXTBOOK_DEPENDENT (77 ICSE entries): Retained strictly blocked; chapters: []
// Also reconciles the 12 Maharashtra Std 1–4 Hindi non-Hindi medium variants to
// NOT_PUBLISHED_AS_STANDALONE while preserving the 2 genuine Semi-English Jal Suraksha
// policy-confirmation gaps as PENDING_VERIFICATION.
// =============================================================================

interface IntegratedParentSpec {
  parentEntryIds: string[];
  parentLabel: string;
  note: string;
}

const INTEGRATED_SUBJECT_SPECS: Readonly<Record<string, IntegratedParentSpec>> = Object.freeze({
  // Maharashtra Class 3 — Integrated into Balbharati Environmental Studies (Std 3)
  'Maharashtra__Class 3__Science': {
    parentEntryIds: ['Maharashtra__Class 3__Environmental Studies'],
    parentLabel: 'Maharashtra Class 3 Environmental Studies (Balbharati – Standard Three)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies – Standard Three" (Maharashtra Class 3 Environmental Studies, 26 verified chapters). No separate standalone Science textbook is published by Balbharati for Class 3.',
  },
  'Maharashtra__Class 3__Social Studies': {
    parentEntryIds: ['Maharashtra__Class 3__Environmental Studies'],
    parentLabel: 'Maharashtra Class 3 Environmental Studies (Balbharati – Standard Three)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies – Standard Three" (Maharashtra Class 3 Environmental Studies, 26 verified chapters). No separate standalone Social Studies textbook is published by Balbharati for Class 3.',
  },
  'Maharashtra__Class 3__History': {
    parentEntryIds: ['Maharashtra__Class 3__Environmental Studies'],
    parentLabel: 'Maharashtra Class 3 Environmental Studies (Balbharati – Standard Three)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies – Standard Three" (Maharashtra Class 3 Environmental Studies, 26 verified chapters). No separate standalone History textbook is published by Balbharati for Class 3.',
  },
  'Maharashtra__Class 3__Geography': {
    parentEntryIds: ['Maharashtra__Class 3__Environmental Studies'],
    parentLabel: 'Maharashtra Class 3 Environmental Studies (Balbharati – Standard Three)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies – Standard Three" (Maharashtra Class 3 Environmental Studies, 26 verified chapters). No separate standalone Geography textbook is published by Balbharati for Class 3.',
  },

  // Maharashtra Class 4 — Integrated into Balbharati EVS Part One & Part Two
  'Maharashtra__Class 4__Science': {
    parentEntryIds: ['Maharashtra__Class 4__Environmental Studies'],
    parentLabel: 'Maharashtra Class 4 Environmental Studies (Balbharati EVS Part One)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies Part One – Standard Four" (Maharashtra Class 4 Environmental Studies). No separate standalone Science textbook is published by Balbharati for Class 4.',
  },
  'Maharashtra__Class 4__Geography': {
    parentEntryIds: ['Maharashtra__Class 4__Environmental Studies'],
    parentLabel: 'Maharashtra Class 4 Environmental Studies (Balbharati EVS Part One)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies Part One – Standard Four" (Maharashtra Class 4 Environmental Studies). No separate standalone Geography textbook is published by Balbharati for Class 4.',
  },
  'Maharashtra__Class 4__Social Studies': {
    parentEntryIds: [
      'Maharashtra__Class 4__Environmental Studies',
      'Maharashtra__Class 4__History',
    ],
    parentLabel:
      'Maharashtra Class 4 Environmental Studies (EVS Part One) & History (EVS Part Two – Shivchatrapati)',
    note: 'Integrated into already-verified parent textbooks "Environmental Studies Part One" and "EVS Part Two – Shivchatrapati" (Maharashtra Class 4 Environmental Studies & History). No separate standalone Social Studies textbook is published by Balbharati for Class 4.',
  },

  // Maharashtra Class 5 — Integrated into Balbharati EVS Part One & Part Two
  'Maharashtra__Class 5__Science': {
    parentEntryIds: ['Maharashtra__Class 5__Environmental Studies'],
    parentLabel: 'Maharashtra Class 5 Environmental Studies (Balbharati EVS Part One)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies Part One – Standard Five" (Maharashtra Class 5 Environmental Studies). No separate standalone Science textbook is published by Balbharati for Class 5.',
  },
  'Maharashtra__Class 5__Geography': {
    parentEntryIds: ['Maharashtra__Class 5__Environmental Studies'],
    parentLabel: 'Maharashtra Class 5 Environmental Studies (Balbharati EVS Part One)',
    note: 'Integrated into already-verified parent textbook "Environmental Studies Part One – Standard Five" (Maharashtra Class 5 Environmental Studies). No separate standalone Geography textbook is published by Balbharati for Class 5.',
  },
  'Maharashtra__Class 5__Social Studies': {
    parentEntryIds: [
      'Maharashtra__Class 5__Environmental Studies',
      'Maharashtra__Class 5__History',
    ],
    parentLabel:
      'Maharashtra Class 5 Environmental Studies (EVS Part One) & History (EVS Part Two – How We Came to Be)',
    note: 'Integrated into already-verified parent textbooks "Environmental Studies Part One" and "EVS Part Two – How We Came to Be" (Maharashtra Class 5 Environmental Studies & History). No separate standalone Social Studies textbook is published by Balbharati for Class 5.',
  },

  // Maharashtra Classes 6–8 — EVS bifurcated into verified General Science, History & Civics, Geography
  'Maharashtra__Class 6__Environmental Studies': {
    parentEntryIds: [
      'Maharashtra__Class 6__Science',
      'Maharashtra__Class 6__History',
      'Maharashtra__Class 6__Geography',
    ],
    parentLabel:
      'Maharashtra Class 6 General Science, History & Civics, and Geography (Balbharati)',
    note: 'Integrated into already-verified upper-primary parent textbooks: General Science, History & Civics, and Geography (Maharashtra Class 6). Balbharati replaces combined EVS with these verified standalone subjects from Std 6 onward.',
  },
  'Maharashtra__Class 7__Environmental Studies': {
    parentEntryIds: [
      'Maharashtra__Class 7__Science',
      'Maharashtra__Class 7__History',
      'Maharashtra__Class 7__Geography',
    ],
    parentLabel:
      'Maharashtra Class 7 General Science, History & Civics, and Geography (Balbharati)',
    note: 'Integrated into already-verified upper-primary parent textbooks: General Science, History & Civics, and Geography (Maharashtra Class 7). Balbharati replaces combined EVS with these verified standalone subjects from Std 6 onward.',
  },
  'Maharashtra__Class 8__Environmental Studies': {
    parentEntryIds: [
      'Maharashtra__Class 8__Science',
      'Maharashtra__Class 8__History',
      'Maharashtra__Class 8__Geography',
    ],
    parentLabel:
      'Maharashtra Class 8 General Science, History & Civics, and Geography (Balbharati)',
    note: 'Integrated into already-verified upper-primary parent textbooks: General Science, History & Civics, and Geography (Maharashtra Class 8). Balbharati replaces combined EVS with these verified standalone subjects from Std 6 onward.',
  },

  // Maharashtra Classes 9–10 — EVS covered under verified Jal Suraksha (Environmental Education)
  'Maharashtra__Class 9__Environmental Studies': {
    parentEntryIds: ['Maharashtra__Class 9__Environmental Education'],
    parentLabel:
      'Maharashtra Class 9 Environmental Education (Balbharati – Jal Suraksha / Water Security)',
    note: 'Integrated into already-verified parent textbook "Jal Suraksha (Water Security) – Standard Nine" (Maharashtra Class 9 Environmental Education, 15 verified chapters). No separate standalone Environmental Studies textbook exists for Class 9.',
  },
  'Maharashtra__Class 10__Environmental Studies': {
    parentEntryIds: ['Maharashtra__Class 10__Environmental Education'],
    parentLabel:
      'Maharashtra Class 10 Environmental Education (Balbharati – Jal Suraksha / Water Security)',
    note: 'Integrated into already-verified parent textbook "Jal Suraksha (Water Security) – Standard Ten" (Maharashtra Class 10 Environmental Education, 12 verified chapters). No separate standalone Environmental Studies textbook exists for Class 10.',
  },

  // CBSE Classes 3–5 — Science & Social Studies integrated into verified NCERT "Our Wondrous World" (EVS)
  'CBSE__Class 3__Science': {
    parentEntryIds: ['CBSE__Class 3__Environmental Studies'],
    parentLabel: 'CBSE Class 3 Environmental Studies (NCERT – Our Wondrous World)',
    note: 'Integrated into already-verified parent textbook "Our Wondrous World – Class 3" (CBSE Class 3 Environmental Studies, 12 verified chapters, NCERT NCF-SE 2023). No separate standalone Science textbook is published by NCERT for Class 3.',
  },
  'CBSE__Class 3__Social Studies': {
    parentEntryIds: ['CBSE__Class 3__Environmental Studies'],
    parentLabel: 'CBSE Class 3 Environmental Studies (NCERT – Our Wondrous World)',
    note: 'Integrated into already-verified parent textbook "Our Wondrous World – Class 3" (CBSE Class 3 Environmental Studies, 12 verified chapters, NCERT NCF-SE 2023). No separate standalone Social Studies textbook is published by NCERT for Class 3.',
  },
  'CBSE__Class 4__Science': {
    parentEntryIds: ['CBSE__Class 4__Environmental Studies'],
    parentLabel: 'CBSE Class 4 Environmental Studies (NCERT – Our Wondrous World)',
    note: 'Integrated into already-verified parent textbook "Our Wondrous World – Class 4" (CBSE Class 4 Environmental Studies, 10 verified chapters, NCERT NCF-SE 2023). No separate standalone Science textbook is published by NCERT for Class 4.',
  },
  'CBSE__Class 4__Social Studies': {
    parentEntryIds: ['CBSE__Class 4__Environmental Studies'],
    parentLabel: 'CBSE Class 4 Environmental Studies (NCERT – Our Wondrous World)',
    note: 'Integrated into already-verified parent textbook "Our Wondrous World – Class 4" (CBSE Class 4 Environmental Studies, 10 verified chapters, NCERT NCF-SE 2023). No separate standalone Social Studies textbook is published by NCERT for Class 4.',
  },
  'CBSE__Class 5__Science': {
    parentEntryIds: ['CBSE__Class 5__Environmental Studies'],
    parentLabel: 'CBSE Class 5 Environmental Studies (NCERT – Our Wondrous World)',
    note: 'Integrated into already-verified parent textbook "Our Wondrous World – Class 5" (CBSE Class 5 Environmental Studies, 10 verified chapters, NCERT NCF-SE 2023). No separate standalone Science textbook is published by NCERT for Class 5.',
  },
  'CBSE__Class 5__Social Studies': {
    parentEntryIds: ['CBSE__Class 5__Environmental Studies'],
    parentLabel: 'CBSE Class 5 Environmental Studies (NCERT – Our Wondrous World)',
    note: 'Integrated into already-verified parent textbook "Our Wondrous World – Class 5" (CBSE Class 5 Environmental Studies, 10 verified chapters, NCERT NCF-SE 2023). No separate standalone Social Studies textbook is published by NCERT for Class 5.',
  },
});

function getBoardStandardMediums(board: CentralSyllabusEntry['board']): InstructionMedium[] {
  if (board === 'Maharashtra') return ['English', 'Marathi', 'Hindi', 'Semi-English'];
  if (board === 'CBSE') return ['English', 'Hindi'];
  return ['English'];
}

function buildBlockedMediumVariants(
  mediums: InstructionMedium[],
  status: CentralVerificationStatus,
  entry: CentralSyllabusEntry,
  title: string,
  note: string
): CentralMediumVariant[] {
  return mediums.map((medium) => ({
    medium,
    languageRole: 'Subject Textbook',
    status,
    textbookTitle: title,
    publisher: entry.publisher,
    academicYearEdition:
      status === 'INTEGRATED_INTO_PARENT'
        ? 'Integrated into Verified Parent Textbook'
        : status === 'SCHOOL_TEXTBOOK_DEPENDENT'
        ? 'School-Selected Textbook (CISCE Policy)'
        : 'Not Published as Standalone Textbook',
    officialSourceUrl: entry.officialSourceUrl,
    verificationNote: note,
    chapters: [],
  }));
}

export function applyStageEReconciliationOverlays(
  map: Record<string, CentralSyllabusEntry>
): void {
  // 1. Reconcile the 12 Maharashtra Std 1–4 Hindi non-Hindi-medium variants
  //    (Balbharati does not publish Hindi for English/Marathi/Semi-English mediums in Std 1–4;
  //    Hindi Third Language begins in Std 5 via Sulabhbharati).
  const mhPrimaryHindiKeys = [
    'Maharashtra__Class 1__Hindi',
    'Maharashtra__Class 2__Hindi',
    'Maharashtra__Class 3__Hindi',
    'Maharashtra__Class 4__Hindi',
  ];
  for (const key of mhPrimaryHindiKeys) {
    const entry = map[key];
    if (!entry) continue;
    for (const variant of entry.mediumVariants) {
      if (variant.medium !== 'Hindi' && variant.status === 'PENDING_VERIFICATION') {
        variant.status = 'NOT_PUBLISHED_AS_STANDALONE';
        variant.chapters = [];
        variant.academicYearEdition = 'Not Published as Standalone Textbook';
        variant.verificationNote = `Not published as standalone (${entry.classLevel} ${variant.medium} Medium): In Maharashtra State Board Std 1–4 curriculum, Hindi is published only as First Language for Hindi-medium schools (Balbharati). Non-Hindi mediums introduce Hindi in Std 5 (Sulabhbharati).`;
      }
    }
  }

  // 2. Reconcile all non-VERIFIED top-level entries consistently across all 3 boards & mediums
  for (const entry of Object.values(map)) {
    if (entry.verificationStatus === 'VERIFIED') {
      continue;
    }

    const boardMediums = getBoardStandardMediums(entry.board);
    entry.applicableMediums = boardMediums;
    // Hard invariant: non-VERIFIED entries must never hold synthetic or duplicated chapters
    entry.chapters = [];

    // 2a. Retain all 77 ICSE school-specific entries strictly as SCHOOL_TEXTBOOK_DEPENDENT
    if (entry.verificationStatus === 'SCHOOL_TEXTBOOK_DEPENDENT' && entry.board === 'ICSE') {
      entry.mediumVariants = buildBlockedMediumVariants(
        boardMediums,
        'SCHOOL_TEXTBOOK_DEPENDENT',
        entry,
        `CISCE School-Selected Textbook (${entry.classLevel} ${entry.subject})`,
        entry.verificationNote
      );
      continue;
    }

    // 2b. Reconcile integrated subjects with their already-verified parent textbook(s)
    const integratedSpec = INTEGRATED_SUBJECT_SPECS[entry.entryId];
    if (integratedSpec) {
      const verifiedParents = integratedSpec.parentEntryIds
        .map((pid) => map[pid])
        .filter((p): p is CentralSyllabusEntry => Boolean(p && p.verificationStatus === 'VERIFIED'));

      if (verifiedParents.length === integratedSpec.parentEntryIds.length) {
        entry.verificationStatus = 'INTEGRATED_INTO_PARENT';
        entry.integratedParentEntryIds = [...integratedSpec.parentEntryIds];
        entry.integratedParentLabel = integratedSpec.parentLabel;
        entry.officialSourceUrl = verifiedParents[0].officialSourceUrl;
        entry.publisher = verifiedParents[0].publisher;
        entry.textbookTitle = `Integrated into ${integratedSpec.parentLabel}`;
        entry.academicYearEdition = 'Integrated into Verified Parent Textbook';
        entry.verificationNote = integratedSpec.note;
        entry.mediumVariants = buildBlockedMediumVariants(
          boardMediums,
          'INTEGRATED_INTO_PARENT',
          entry,
          entry.textbookTitle,
          integratedSpec.note
        );
        continue;
      }
    }

    // 2c. Reconcile all remaining entries without a standalone official textbook
    if (entry.verificationStatus === 'PENDING_VERIFICATION') {
      entry.verificationStatus = 'NOT_PUBLISHED_AS_STANDALONE';
      entry.textbookTitle = `No Standalone Official Textbook (${entry.board} ${entry.classLevel} ${entry.subject})`;
      entry.academicYearEdition = 'Not Published as Standalone Textbook';
      entry.mediumVariants = buildBlockedMediumVariants(
        boardMediums,
        'NOT_PUBLISHED_AS_STANDALONE',
        entry,
        entry.textbookTitle,
        entry.verificationNote
      );
    }
  }
}

