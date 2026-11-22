import type {
  CentralChapterItem,
  CentralChapterSectionType,
  CentralMediumVariant,
  CentralVerificationStatus,
} from './centralSyllabusDatabase';

export interface RebuiltEntryDefinition {
  verificationStatus: CentralVerificationStatus;
  textbookTitle: string;
  publisher: string;
  academicYearEdition: string;
  officialSourceUrl: string;
  verificationNote: string;
  rebuildReason?: string;
  targetReplacementBook?: string;
  chapters: CentralChapterItem[];
  mediumVariants: CentralMediumVariant[];
}

function inferType(title: string): CentralChapterSectionType {
  const lower = title.toLowerCase();
  if (
    lower.includes('(poem)') ||
    lower.includes('कविता') ||
    lower.includes('काव्य') ||
    lower.includes('पद्य')
  ) {
    return 'poem';
  }
  if (lower.includes('स्थूलवाचन') || lower.includes('पूरक पठन')) {
    return 'rapid_reading';
  }
  if (lower.includes('unit ')) {
    return 'unit';
  }
  return 'chapter';
}

function makeChapters(titles: string[], sectionOrPart?: string): CentralChapterItem[] {
  return titles.map((chapterTitle, idx) => ({
    sequenceIndex: idx + 1,
    chapterNumber: idx + 1,
    chapterTitle,
    ...(sectionOrPart ? { sectionOrPart } : {}),
    sectionType: inferType(chapterTitle),
  }));
}

const NCERT_PUB = 'National Council of Educational Research and Training (NCERT), New Delhi';
const NCERT_URL = 'https://ncert.nic.in/textbook.php';
const NCERT_ED = '2025–2026 NCF-SE 2023 Aligned Edition';

const BALBHARATI_PUB =
  'Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune';
const BALBHARATI_URL = 'https://books.ebalbharati.in/';
const BALBHARATI_ED = '2025–2026 Official Reprint Edition';

const MH_C6_ENGLISH_BALBHARATI_CHAPTERS = [
  ...makeChapters(
    [
      '1.1 Don’t Give Up! (Poem)',
      '1.2 Who’s the Greatest?',
      '1.3 Autobiography of a Great Indian Bustard',
      '1.4 Children are Going to School... (Poem)',
      '1.5 A Kabaddi Match',
      '1.6 The Peacock and the Crane',
      '1.7 Param Vir Chakra: Our Heroes',
    ],
    'Unit 1 (Voyage 1)'
  ),
  ...makeChapters(
    [
      '2.1 The Clothesline (Poem)',
      '2.2 The Worth of a Fabric',
      '2.3 A Wall Magazine for your Class!',
      '2.4 Anak Krakatoa',
      '2.5 The Silver House (Poem)',
      '2.6 Ad’wise’ Customers',
      '2.7 Yonamine and Bushi',
    ],
    'Unit 2 (Voyage 2)'
  ).map((c, i) => ({ ...c, sequenceIndex: 7 + i + 1, chapterNumber: 7 + i + 1 })),
  ...makeChapters(
    [
      '3.1 It Can Be Done',
      '3.2 Seven Sisters',
      '3.3 Stone Soup',
      '3.4 Sushruta (A Peep into the Past)',
      '3.5 The Donkey (Poem)',
      '3.6 The Merchant of Venice',
      '3.7 At the Science Fair',
    ],
    'Unit 3 (Voyage 3)'
  ).map((c, i) => ({ ...c, sequenceIndex: 14 + i + 1, chapterNumber: 14 + i + 1 })),
  ...makeChapters(
    [
      '4.1 Sleep, My Treasure (Poem)',
      '4.2 The Story of Gautama’s Quest',
      '4.3 Mr Nobody (Poem)',
      '4.4 A Mad Tea Party',
      '4.5 If I Can Stop One Heart From Breaking... (Poem)',
      '4.6 The Phantom Tollbooth (A Book Review)',
      '4.7 The Sword in the Stone',
      '4.8 An Autumn Greeting (Poem)',
    ],
    'Unit 4 (Voyage 4)'
  ).map((c, i) => ({ ...c, sequenceIndex: 21 + i + 1, chapterNumber: 21 + i + 1 })),
];

const MH_C9_HINDI_LOKBHARATI_CHAPTERS = makeChapters([
  'पहली इकाई १: चाँदनी रात (कविता) – मैथिलीशरण गुप्त',
  'पहली इकाई २: बिल्ली का बिलुंगड़ा – राजेंद्र लाल हांडा',
  'पहली इकाई ३: कबीर (पूरक पठन) – कबीरदास',
  'पहली इकाई ४: किताबें (कविता) – गुलज़ार',
  'पहली इकाई ५: जूलिया – अंतोन चेखव',
  'पहली इकाई ६: ऐ सखि! (पूरक पठन) – अमीर खुसरो',
  'पहली इकाई ७: डॉक्टर का अपहरण – डॉ. हरिकृष्ण देवसरे',
  'पहली इकाई ८: वीरभूमि पर कुछ दिन – रुक्मिणी प्रताप',
  'पहली इकाई ९: वरदान माँगूँगा नहीं (कविता) – शिवमंगल सिंह ‘सुमन’',
  'पहली इकाई १०: रात का चौकीदार (पूरक पठन) – सुरेश कुशवाहा ‘तन्मय’',
  'पहली इकाई ११: निर्माणों के पावन युग में (कविता) – अटल बिहारी वाजपेयी',
  'दूसरी इकाई १: कह कविराय (कविता) – गिरिधर',
  'दूसरी इकाई २: जंगल (पूरक पठन) – चित्रा मुद्गल',
  'दूसरी इकाई ३: इनाम – अरुण',
  'दूसरी इकाई ४: सिंधु का जल (कविता) – अशोक चक्रधर',
  'दूसरी इकाई ५: अतीत के पत्र – विनोबा भावे एवं महात्मा गांधी',
  'दूसरी इकाई ६: निसर्ग वैभव (पूरक पठन) – सुमित्रानंदन पंत',
  'दूसरी इकाई ७: शिष्टाचार – भीष्म साहनी',
  'दूसरी इकाई ८: उड़ान (कविता) – चंद्रसेन विराट',
  'दूसरी इकाई ९: मेरे पिताजी (पूरक पठन) – डॉ. हरिवंशराय बच्चन',
  'दूसरी इकाई १०: अपराजेय – कमल कुमार',
  'दूसरी इकाई ११: स्वतंत्र गान (कविता) – गोपालसिंह नेपाली',
]);

const MH_C10_MARATHI_AKSHARBHARATI_CHAPTERS = makeChapters([
  'भाग १ – १: तू बुद्धी दे (प्रार्थना) – गुरू ठाकूर',
  'भाग १ – २: संतवाणी (अ) अंकिला मी दास तुझा – संत नामदेव; (आ) योगी सर्वकाळ सुखदाता – संत एकनाथ',
  'भाग १ – ३: शाल – रा. ग. जाधव',
  'भाग १ – ४: उपास – पु. ल. देशपांडे',
  'भाग १ – स्थूलवाचन १: मोठे होत असलेल्या मुलांनो... – डॉ. अनिल काकोडकर',
  'भाग २ – ५: दोन दिवस (कविता) – नारायण सुर्वे',
  'भाग २ – ६: चुडीवाला – जयश्री रुईकर',
  'भाग २ – ७: फूटप्रिन्टस – डॉ. प्रदीप आवटे',
  'भाग २ – ८: ऊर्जाशक्तीचा जागर – डॉ. रघुनाथ माशेलकर',
  'भाग २ – स्थूलवाचन २: जाता अस्ताला (कविता) – गुरूदेव रवींद्रनाथ टागोर',
  'भाग ३ – ९: औक्षण (कविता) – इंदिरा संत',
  'भाग ३ – १०: रंग साहित्याचे',
  'भाग ३ – ११: जंगल डायरी – अतुल धामनकर',
  'भाग ३ – १२: रंग मजेचे रंग उदयाचे (कविता) – अंजली कुलकर्णी',
  'भाग ३ – स्थूलवाचन ३: जगणं कॅक्टसचं – वसंत शिरवाडकर',
  'भाग ४ – १३: हिरवंगार झाडासारखं (कविता) – जॉर्ज लोपीस',
  'भाग ४ – १४: बीज पेरले गेले – चंदू बोर्डे',
  'भाग ४ – १५: खरा नागरिक – सुहास बारटक्के',
  'भाग ४ – १६: स्वप्न करू साकार (कविता) – किशोर पाठक',
  'भाग ४ – स्थूलवाचन ४: व्युत्पत्ती कोश',
]);

const MH_C10_HINDI_LOKBHARATI_CHAPTERS = makeChapters([
  'पहली इकाई १: भारत महिमा (कविता) – जयशंकर प्रसाद',
  'पहली इकाई २: लक्ष्मी – गुरुबचन सिंह',
  'पहली इकाई ३: वाह रे! हमदर्द – घनश्याम अग्रवाल',
  'पहली इकाई ४: मन (पूरक पठन) – विकास परिहार',
  'पहली इकाई ५: गोवा : जैसा मैंने देखा – विनय शर्मा',
  'पहली इकाई ६: गिरिधर नागर (कविता) – संत मीराबाई',
  'पहली इकाई ७: खुला आकाश (पूरक पठन) – कुँवर नारायण',
  'पहली इकाई ८: गजल (कविता) – माणिक वर्मा',
  'पहली इकाई ९: रीढ़ की हड्डी – जगदीश चंद्र माथुर',
  'पहली इकाई १०: ठेस (पूरक पठन) – फणीश्वरनाथ ‘रेणु’',
  'पहली इकाई ११: कृषक गान (कविता) – दिनेश भारद्वाज',
  'दूसरी इकाई १: बरषहिं जलद (कविता) – गोस्वामी तुलसीदास',
  'दूसरी इकाई २: दो लघुकथाएँ (पूरक पठन) – नरेंद्र छाबड़ा',
  'दूसरी इकाई ३: श्रम साधना – श्रीकृष्णदास जाजू',
  'दूसरी इकाई ४: छापा (कविता) – ओमप्रकाश आदित्य',
  'दूसरी इकाई ५: ईमानदारी की प्रतिमूर्ति – सुनील शास्त्री',
  'दूसरी इकाई ६: हम उस धरती की संतति हैं (पूरक पठन) – उमाकांत मालवीय',
  'दूसरी इकाई ७: महिला आश्रम – काका कालेलकर',
  'दूसरी इकाई ८: अपनी गंध नहीं बेचूँगा (कविता) – बालकवि बैरागी',
  'दूसरी इकाई ९: जब तक जिंदा रहूँ, लिखता रहूँ – विश्वनाथ प्रसाद तिवारी',
  'दूसरी इकाई १०: बूढ़ी काकी (पूरक पठन) – प्रेमचंद',
  'दूसरी इकाई ११: समता की ओर (कविता) – मुकुटधर पांडेय',
]);

function makeStandardNcertEntry(params: {
  textbookTitle: string;
  verificationNote: string;
  chapters: CentralChapterItem[];
  mediums?: ('English' | 'Hindi')[];
}): RebuiltEntryDefinition {
  const mediums = params.mediums ?? ['English', 'Hindi'];
  return {
    verificationStatus: 'VERIFIED',
    textbookTitle: params.textbookTitle,
    publisher: NCERT_PUB,
    academicYearEdition: NCERT_ED,
    officialSourceUrl: NCERT_URL,
    verificationNote: params.verificationNote,
    chapters: params.chapters,
    mediumVariants: mediums.map((medium) => ({
      medium,
      languageRole: 'Subject Textbook',
      status: 'VERIFIED',
      textbookTitle: params.textbookTitle,
      publisher: NCERT_PUB,
      academicYearEdition: NCERT_ED,
      officialSourceUrl: NCERT_URL,
      verificationNote: params.verificationNote,
      chapters: params.chapters,
    })),
  };
}

/**
 * PHASE 2 REBUILD MAP FOR THE 28 AUDITED FAILURES
 * - 27 entries rebuilt cleanly with verified official textbook indexes.
 * - 1 entry (`CBSE__Class 4__Hindi` Veena 4) remains strictly PENDING_VERIFICATION
 *   until direct official NCERT Chapter 13/invocation index is resolved without ambiguity.
 * - Medium-specific First-Language Kumarbharati / My English Book 6 variants stay strictly
 *   PENDING_VERIFICATION inside `mediumVariants`.
 */
export const PHASE2_REBUILT_ENTRIES_MAP: Record<string, RebuiltEntryDefinition> = {
  // ============================================================================
  // A. MAHARASHTRA SSC (4 REBUILT ENTRIES WITH MEDIUM ISOLATION)
  // ============================================================================
  'Maharashtra__Class 6__English': {
    verificationStatus: 'VERIFIED',
    textbookTitle: 'English Balbharati – Standard Six (Balbharati)',
    publisher: BALBHARATI_PUB,
    academicYearEdition: BALBHARATI_ED,
    officialSourceUrl: BALBHARATI_URL,
    verificationNote:
      'Rebuilt using complete official Balbharati Std 6 English Balbharati index (Units 1–4, 29 chapters) for English medium; My English Book Six stays PENDING for non-English mediums.',
    chapters: MH_C6_ENGLISH_BALBHARATI_CHAPTERS,
    mediumVariants: [
      {
        medium: 'English',
        languageRole: 'First Language',
        status: 'VERIFIED',
        textbookTitle: 'English Balbharati – Standard Six (Balbharati)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: BALBHARATI_ED,
        officialSourceUrl: BALBHARATI_URL,
        verificationNote: 'Complete 29-chapter English Balbharati Std 6 index (Voyages 1–4).',
        chapters: MH_C6_ENGLISH_BALBHARATI_CHAPTERS,
      },
      ...(['Marathi', 'Hindi', 'Semi-English'] as const).map(
        (medium): CentralMediumVariant => ({
          medium,
          languageRole: 'Second / Third Language',
          status: 'PENDING_VERIFICATION',
          textbookTitle: 'My English Book Six (Balbharati) – PENDING VERIFICATION',
          publisher: BALBHARATI_PUB,
          academicYearEdition: BALBHARATI_ED,
          officialSourceUrl: BALBHARATI_URL,
          verificationNote:
            'PENDING: Unit 4–6 edition variance requires direct eBalbharati PDF verification.',
          chapters: [],
        })
      ),
    ],
  },

  'Maharashtra__Class 9__Hindi': {
    verificationStatus: 'VERIFIED',
    textbookTitle: 'हिंदी लोकभारती (Hindi Lokbharati) – कक्षा नौवीं (Second/Third Language, Balbharati)',
    publisher: BALBHARATI_PUB,
    academicYearEdition: BALBHARATI_ED,
    officialSourceUrl: BALBHARATI_URL,
    verificationNote:
      'Rebuilt with medium isolation: Hindi Lokbharati (22 ch) applies strictly to English, Marathi, and Semi-English mediums; Hindi-medium Hindi Kumarbharati stays PENDING VERIFICATION.',
    chapters: MH_C9_HINDI_LOKBHARATI_CHAPTERS,
    mediumVariants: [
      ...(['English', 'Marathi', 'Semi-English'] as const).map(
        (medium): CentralMediumVariant => ({
          medium,
          languageRole: 'Second / Third Language',
          status: 'VERIFIED',
          textbookTitle: 'हिंदी लोकभारती (Hindi Lokbharati) – कक्षा नौवीं (Balbharati)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: BALBHARATI_ED,
          officialSourceUrl: BALBHARATI_URL,
          verificationNote: 'Verified 22-chapter Balbharati Hindi Lokbharati index.',
          chapters: MH_C9_HINDI_LOKBHARATI_CHAPTERS,
        })
      ),
      {
        medium: 'Hindi',
        languageRole: 'First Language',
        status: 'PENDING_VERIFICATION',
        textbookTitle: 'हिंदी कुमारभारती (Hindi Kumarbharati) – कक्षा नौवीं (PENDING VERIFICATION)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: 'PENDING VERIFICATION',
        officialSourceUrl: BALBHARATI_URL,
        verificationNote:
          'PENDING: Direct eBalbharati PDF index verification required for First-Language Hindi Kumarbharati Std 9.',
        chapters: [],
      },
    ],
  },

  'Maharashtra__Class 10__Marathi': {
    verificationStatus: 'VERIFIED',
    textbookTitle: 'मराठी अक्षरभारती (Marathi Aksharbharati) – इयत्ता दहावी (Second Language, Balbharati)',
    publisher: BALBHARATI_PUB,
    academicYearEdition: BALBHARATI_ED,
    officialSourceUrl: BALBHARATI_URL,
    verificationNote:
      'Rebuilt with medium isolation: Marathi Aksharbharati (20 ch) applies strictly to English, Hindi, and Semi-English mediums; Marathi-medium Marathi Kumarbharati stays PENDING VERIFICATION.',
    chapters: MH_C10_MARATHI_AKSHARBHARATI_CHAPTERS,
    mediumVariants: [
      ...(['English', 'Hindi', 'Semi-English'] as const).map(
        (medium): CentralMediumVariant => ({
          medium,
          languageRole: 'Second / Third Language',
          status: 'VERIFIED',
          textbookTitle: 'मराठी अक्षरभारती (Marathi Aksharbharati) – इयत्ता दहावी (Balbharati)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: BALBHARATI_ED,
          officialSourceUrl: BALBHARATI_URL,
          verificationNote: 'Verified 20-chapter Balbharati Marathi Aksharbharati index.',
          chapters: MH_C10_MARATHI_AKSHARBHARATI_CHAPTERS,
        })
      ),
      {
        medium: 'Marathi',
        languageRole: 'First Language',
        status: 'PENDING_VERIFICATION',
        textbookTitle: 'मराठी कुमारभारती (Marathi Kumarbharati) – इयत्ता दहावी (PENDING VERIFICATION)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: 'PENDING VERIFICATION',
        officialSourceUrl: BALBHARATI_URL,
        verificationNote:
          'PENDING: Direct eBalbharati PDF verification required to confirm exact Kumarbharati Std 10 chapter/author details.',
        chapters: [],
      },
    ],
  },

  'Maharashtra__Class 10__Hindi': {
    verificationStatus: 'VERIFIED',
    textbookTitle: 'हिंदी लोकभारती (Hindi Lokbharati) – कक्षा दसवीं (Second/Third Language, Balbharati)',
    publisher: BALBHARATI_PUB,
    academicYearEdition: BALBHARATI_ED,
    officialSourceUrl: BALBHARATI_URL,
    verificationNote:
      'Rebuilt with medium isolation: Hindi Lokbharati (22 ch) applies strictly to English, Marathi, and Semi-English mediums; Hindi-medium Hindi Kumarbharati stays PENDING VERIFICATION.',
    chapters: MH_C10_HINDI_LOKBHARATI_CHAPTERS,
    mediumVariants: [
      ...(['English', 'Marathi', 'Semi-English'] as const).map(
        (medium): CentralMediumVariant => ({
          medium,
          languageRole: 'Second / Third Language',
          status: 'VERIFIED',
          textbookTitle: 'हिंदी लोकभारती (Hindi Lokbharati) – कक्षा दसवीं (Balbharati)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: BALBHARATI_ED,
          officialSourceUrl: BALBHARATI_URL,
          verificationNote: 'Verified 22-chapter Balbharati Hindi Lokbharati index.',
          chapters: MH_C10_HINDI_LOKBHARATI_CHAPTERS,
        })
      ),
      {
        medium: 'Hindi',
        languageRole: 'First Language',
        status: 'PENDING_VERIFICATION',
        textbookTitle: 'हिंदी कुमारभारती (Hindi Kumarbharati) – कक्षा दसवीं (PENDING VERIFICATION)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: 'PENDING VERIFICATION',
        officialSourceUrl: BALBHARATI_URL,
        verificationNote:
          'PENDING: Direct eBalbharati PDF index verification required for First-Language Hindi Kumarbharati Std 10.',
        chapters: [],
      },
    ],
  },

  // ============================================================================
  // B. CBSE CLASS 4 (NCF-SE 2023)
  // ============================================================================
  'CBSE__Class 4__Mathematics': makeStandardNcertEntry({
    textbookTitle: 'Maths Mela – Textbook of Mathematics for Grade 4 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 4 Maths Mela index (14 chapters).',
    chapters: makeChapters([
      'Shapes Around Us',
      'Hide and Seek',
      'Patterns Around Us',
      'Thousands Around Us',
      'Sharing and Measuring',
      'Measuring Length',
      'The Cleanest Village',
      'Weigh It, Pour It',
      'Equal Groups',
      'Elephants, Tigers, and Leopards',
      'Fun with Symmetry',
      'Ticking Clocks and Turning Calendar',
      'The Transport Museum',
      'Data Handling',
    ]),
  }),

  'CBSE__Class 4__English': makeStandardNcertEntry({
    textbookTitle: 'Santoor – Textbook of English for Grade 4 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 4 Santoor index (Units 1–4, 12 chapters).',
    mediums: ['English'],
    chapters: [
      ...makeChapters(['Together We Can (Poem)', 'The Tinkling Bells', 'Be Smart, Be Safe'], 'Unit 1: My Land'),
      ...makeChapters(['One Thing at a Time', 'The Old Stag', 'Braille'], 'Unit 2: My Beautiful World').map(
        (c, i) => ({ ...c, sequenceIndex: 3 + i + 1, chapterNumber: 3 + i + 1 })
      ),
      ...makeChapters(['Fit Body, Fit Mind, Fit Nation', 'The Lagori Champions', 'Hekko'], 'Unit 3: Fun with Games').map(
        (c, i) => ({ ...c, sequenceIndex: 6 + i + 1, chapterNumber: 6 + i + 1 })
      ),
      ...makeChapters(['The Swing', 'A Journey to the Magical Mountains', 'Maheshwar'], 'Unit 4: Up High').map(
        (c, i) => ({ ...c, sequenceIndex: 9 + i + 1, chapterNumber: 9 + i + 1 })
      ),
    ],
  }),

  'CBSE__Class 4__Environmental Studies': makeStandardNcertEntry({
    textbookTitle: 'Our Wondrous World – Textbook of Environmental Studies for Grade 4 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 4 Our Wondrous World index (Units 1–5, 10 chapters).',
    chapters: [
      ...makeChapters(['Living Together', 'Exploring Our Neighbourhood'], 'Unit 1: Our Community'),
      ...makeChapters(['Nature Trail', 'Growing up with Nature'], 'Unit 2: Life Around Us').map((c, i) => ({
        ...c,
        sequenceIndex: 2 + i + 1,
        chapterNumber: 2 + i + 1,
      })),
      ...makeChapters(['Food for Health', 'Happy and Healthy Living'], 'Unit 3: Health and Well-being').map(
        (c, i) => ({ ...c, sequenceIndex: 4 + i + 1, chapterNumber: 4 + i + 1 })
      ),
      ...makeChapters(['How Things Work', 'How Things are Made'], 'Unit 4: Things Around Us').map((c, i) => ({
        ...c,
        sequenceIndex: 6 + i + 1,
        chapterNumber: 6 + i + 1,
      })),
      ...makeChapters(['Different Lands, Different Lives', 'Our Sky'], 'Unit 5: Our Environment').map(
        (c, i) => ({ ...c, sequenceIndex: 8 + i + 1, chapterNumber: 8 + i + 1 })
      ),
    ],
  }),

  'CBSE__Class 4__Hindi': {
    verificationStatus: 'PENDING_VERIFICATION',
    textbookTitle: 'वीणा (Veena) – कक्षा ४ हिंदी पाठ्यपुस्तक (NCERT) [PENDING VERIFICATION]',
    publisher: NCERT_PUB,
    academicYearEdition: NCERT_ED,
    officialSourceUrl: NCERT_URL,
    verificationNote:
      'PENDING: Chapter 13 title and introductory invocation wording await direct NCERT PDF TOC verification (kept empty to avoid guessing).',
    targetReplacementBook: 'वीणा (Veena) – कक्षा ४ हिंदी पाठ्यपुस्तक (NCERT NCF-SE 2023)',
    chapters: [],
    mediumVariants: [],
  },

  // ============================================================================
  // C. CBSE CLASS 5 (NCF-SE 2023)
  // ============================================================================
  'CBSE__Class 5__Mathematics': makeStandardNcertEntry({
    textbookTitle: 'Maths Mela – Textbook of Mathematics for Grade 5 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 5 Maths Mela index (9 chapters).',
    chapters: makeChapters([
      'We the Travellers — I',
      'Fractions',
      'Angles as Turns',
      'We the Travellers — II',
      'Far and Near',
      'The Dairy Farm',
      'Shapes and Patterns',
      'Weight and Capacity',
      'Coconut Farm',
    ]),
  }),

  'CBSE__Class 5__English': makeStandardNcertEntry({
    textbookTitle: 'Santoor – Textbook of English for Grade 5 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 5 Santoor index (10 chapters).',
    mediums: ['English'],
    chapters: makeChapters([
      'Papa’s Spectacles',
      'Gone with the Scooter',
      'The Rainbow',
      'The Wise Parrot',
      'The Frog',
      'What a Tank!',
      'Gilli Danda',
      'The Decision of the Panchayat',
      'Vocation',
      'Glass Bangles',
    ]),
  }),

  'CBSE__Class 5__Hindi': makeStandardNcertEntry({
    textbookTitle: 'वीणा (Veena) – कक्षा ५ हिंदी पाठ्यपुस्तक (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 5 Veena index (12 chapters).',
    mediums: ['Hindi'],
    chapters: makeChapters([
      'किरन',
      'न्याय की कुर्सी',
      'चाँद का कुर्ता',
      'साँकेन',
      'सुंदरिया',
      'चतुर चित्रकार',
      'मेरा बचपन',
      'काजीरंगा राष्ट्रीय उद्यान की यात्रा',
      'न्याय',
      'तीन मछलियाँ',
      'हमारे ये कलामंदिर',
      'गंगा की कहानी',
    ]),
  }),

  'CBSE__Class 5__Environmental Studies': makeStandardNcertEntry({
    textbookTitle: 'Our Wondrous World – Textbook of Environmental Studies for Grade 5 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 5 Our Wondrous World index (Units 1–5, 10 chapters).',
    chapters: [
      ...makeChapters(['Water: The Essence of Life', 'Journey of a River'], 'Unit 1: Life Around Us'),
      ...makeChapters(['The Mystery of Food', 'Our School: A Happy Place'], 'Unit 2: Health and Well-being').map(
        (c, i) => ({ ...c, sequenceIndex: 2 + i + 1, chapterNumber: 2 + i + 1 })
      ),
      ...makeChapters(['Our Vibrant Country', 'Some Unique Places'], 'Unit 3: Incredible India').map((c, i) => ({
        ...c,
        sequenceIndex: 4 + i + 1,
        chapterNumber: 4 + i + 1,
      })),
      ...makeChapters(['Energy: How Things Work', 'Clothes: How Things are Made'], 'Unit 4: Things Around Us').map(
        (c, i) => ({ ...c, sequenceIndex: 6 + i + 1, chapterNumber: 6 + i + 1 })
      ),
      ...makeChapters(['Rhythms of Nature', 'Earth: Our Shared Home'], 'Unit 5: Our Amazing Planet').map(
        (c, i) => ({ ...c, sequenceIndex: 8 + i + 1, chapterNumber: 8 + i + 1 })
      ),
    ],
  }),

  // ============================================================================
  // D. CBSE CLASS 7 (NCF-SE 2023)
  // ============================================================================
  'CBSE__Class 7__Mathematics': makeStandardNcertEntry({
    textbookTitle: 'Ganita Prakash – Textbook of Mathematics for Grade 7 (Part 1 & Part 2, NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 7 Ganita Prakash Part 1 (8 ch) & Part 2 (7 ch) indexes (15 chapters).',
    chapters: [
      ...makeChapters(
        [
          'Large Numbers Around Us',
          'Arithmetic Expressions',
          'A Peek Beyond the Point',
          'Expressions Using Letter-Numbers',
          'Parallel and Intersecting Lines',
          'Number Play',
          'A Tale of Three Intersecting Lines',
          'Working with Fractions',
        ],
        'Part 1'
      ),
      ...makeChapters(
        [
          'Geometric Twins',
          'Operations with Integers',
          'Finding Common Ground',
          'Another Peek Beyond the Point',
          'Connecting the Dots',
          'Constructions and Tilings',
          'Finding the Unknown',
        ],
        'Part 2'
      ).map((c, i) => ({ ...c, sequenceIndex: 8 + i + 1, chapterNumber: 8 + i + 1 })),
    ],
  }),

  'CBSE__Class 7__Science': makeStandardNcertEntry({
    textbookTitle: 'Curiosity – Textbook of Science for Grade 7 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 7 Curiosity index (12 chapters).',
    chapters: makeChapters([
      'The Ever-Evolving World of Science',
      'Exploring Substances: Acidic, Basic, and Neutral',
      'Electricity: Circuits and their Components',
      'The World of Metals and Non-metals',
      'Changes Around Us: Physical and Chemical',
      'Adolescence: A Stage of Growth and Change',
      'Heat Transfer in Nature',
      'Measurement of Time and Motion',
      'Life Processes in Animals',
      'Life Processes in Plants',
      'Light: Shadows and Reflections',
      'Earth, Moon, and the Sun',
    ]),
  }),

  'CBSE__Class 7__Social Science': makeStandardNcertEntry({
    textbookTitle: 'Exploring Society: India and Beyond – Social Science for Grade 7 (Part 1 & Part 2, NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 7 Exploring Society Part 1 (12 ch) & Part 2 (8 ch) indexes (20 chapters).',
    chapters: [
      ...makeChapters(
        [
          'Geographical Diversity of India',
          'Understanding the Weather',
          'Climates of India',
          'New Beginnings: Cities and States',
          'The Rise of Empires',
          'The Age of Reorganisation',
          'The Gupta Era: An Age of Tireless Creativity',
          'How the Land Becomes Sacred',
          'From the Rulers to the Ruled: Types of Governments',
          'The Constitution of India — An Introduction',
          'From Barter to Money',
          'Understanding Markets',
        ],
        'Part 1'
      ),
      ...makeChapters(
        [
          'The Story of Indian Farming',
          'India and Her Neighbours',
          'Empires and Kingdoms: 6th to 10th Centuries',
          'Turning Tides: 11th and 12th Centuries',
          'India, a Home to Many',
          'The State, the Government, and You',
          'Infrastructure: Engine of India’s Development',
          'Banks and the Magic of Finance',
        ],
        'Part 2'
      ).map((c, i) => ({ ...c, sequenceIndex: 12 + i + 1, chapterNumber: 12 + i + 1 })),
    ],
  }),

  'CBSE__Class 7__History': makeStandardNcertEntry({
    textbookTitle: 'Exploring Society: India and Beyond – Grade 7 (History & Heritage Themes, NCERT)',
    verificationNote: 'Verified History & Cultural Heritage chapters from NCERT NCF-SE 2023 Class 7 Exploring Society Part 1 & Part 2 (8 chapters).',
    chapters: makeChapters([
      'Part 1 Ch 4: New Beginnings: Cities and States',
      'Part 1 Ch 5: The Rise of Empires',
      'Part 1 Ch 6: The Age of Reorganisation',
      'Part 1 Ch 7: The Gupta Era: An Age of Tireless Creativity',
      'Part 1 Ch 8: How the Land Becomes Sacred',
      'Part 2 Ch 3: Empires and Kingdoms: 6th to 10th Centuries',
      'Part 2 Ch 4: Turning Tides: 11th and 12th Centuries',
      'Part 2 Ch 5: India, a Home to Many',
    ]),
  }),

  'CBSE__Class 7__Geography': makeStandardNcertEntry({
    textbookTitle: 'Exploring Society: India and Beyond – Grade 7 (Geography Themes, NCERT)',
    verificationNote: 'Verified Geography & Land chapters from NCERT NCF-SE 2023 Class 7 Exploring Society Part 1 & Part 2 (5 chapters).',
    chapters: makeChapters([
      'Part 1 Ch 1: Geographical Diversity of India',
      'Part 1 Ch 2: Understanding the Weather',
      'Part 1 Ch 3: Climates of India',
      'Part 2 Ch 1: The Story of Indian Farming',
      'Part 2 Ch 2: India and Her Neighbours',
    ]),
  }),

  'CBSE__Class 7__English': makeStandardNcertEntry({
    textbookTitle: 'Poorvi – Textbook of English for Grade 7 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 7 Poorvi index (Units 1–5, 15 chapters).',
    mediums: ['English'],
    chapters: [
      ...makeChapters(['The Day the River Spoke', 'Try Again (Poem)', 'Three Days to See'], 'Unit 1: Learning Together'),
      ...makeChapters(['Animals, Birds, and Dr. Dolittle', 'A Funny Man (Poem)', 'Say the Right Thing'], 'Unit 2: Wit and Humour').map(
        (c, i) => ({ ...c, sequenceIndex: 3 + i + 1, chapterNumber: 3 + i + 1 })
      ),
      ...makeChapters(['My Brother’s Great Invention', 'Paper Boats (Poem)', 'North, South, East, West'], 'Unit 3: Dreams and Discoveries').map(
        (c, i) => ({ ...c, sequenceIndex: 6 + i + 1, chapterNumber: 6 + i + 1 })
      ),
      ...makeChapters(['The Tunnel', 'Travel (Poem)', 'Conquering the Summit'], 'Unit 4: Travel and Adventure').map(
        (c, i) => ({ ...c, sequenceIndex: 9 + i + 1, chapterNumber: 9 + i + 1 })
      ),
      ...makeChapters(['A Homage to Our Brave Soldiers', 'My Dear Soldiers (Poem)', 'Rani Abbakka'], 'Unit 5: Bravehearts').map(
        (c, i) => ({ ...c, sequenceIndex: 12 + i + 1, chapterNumber: 12 + i + 1 })
      ),
    ],
  }),

  'CBSE__Class 7__Hindi': makeStandardNcertEntry({
    textbookTitle: 'मल्हार (Malhar) – कक्षा ७ हिंदी पाठ्यपुस्तक (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 7 Malhar index (10 chapters).',
    mediums: ['Hindi'],
    chapters: makeChapters([
      'माँ, कह एक कहानी (कविता)',
      'तीन बुद्धिमान',
      'फूल और काँटा (कविता)',
      'पानी रे पानी',
      'नहीं होना बीमार',
      'गिरिधर कविराय की कुंडलिया (कविता)',
      'वर्षा बहार (कविता)',
      'बिरजू महाराज से साक्षात्कार',
      'चिड़िया (कविता)',
      'मीरा के पद (कविता)',
    ]),
  }),

  'CBSE__Class 7__Sanskrit': makeStandardNcertEntry({
    textbookTitle: 'दीपकम् (Deepakam) – कक्षा ७ संस्कृत पाठ्यपुस्तकम् (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 7 Deepakam index (12 chapters).',
    chapters: makeChapters([
      'वन्दे भारतमातरम्',
      'नित्यं पिबामः सुभाषितरसम्',
      'मित्राय नमः',
      'न लभ्यते चेत् आम्लं द्राक्षाफलम्',
      'सेवा हि परमो धर्मः',
      'क्रीडाम वयं श्लोकान्त्याक्षरीम्',
      'ईशावास्यम् इदं सर्वम्',
      'हितं मनोहारि च दुर्लभं वचः',
      'अन्नाद् भवन्ति भूतानि',
      'दशमः कः?',
      'द्वीपेषु रम्यः द्वीपोऽण्डमानः',
      'वीराङ्गना पन्नाधाया',
    ]),
  }),

  // ============================================================================
  // E. CBSE CLASS 8 (NCF-SE 2023)
  // ============================================================================
  'CBSE__Class 8__Mathematics': makeStandardNcertEntry({
    textbookTitle: 'Ganita Prakash – Textbook of Mathematics for Grade 8 (Part I & Part II, NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 8 Ganita Prakash Part I (7 ch) & Part II (7 ch) indexes (14 chapters).',
    chapters: [
      ...makeChapters(
        [
          'A Square and A Cube',
          'Power Play',
          'A Story of Numbers',
          'Quadrilaterals',
          'Number Play',
          'We Distribute, Yet Things Multiply',
          'Proportional Reasoning-1',
        ],
        'Part I'
      ),
      ...makeChapters(
        [
          'Fractions in Disguise',
          'The Baudhayana-Pythagoras Theorem',
          'Proportional Reasoning-2',
          'Exploring Some Geometric Themes',
          'Tales by Dots and Lines',
          'Algebra Play',
          'Area',
        ],
        'Part II'
      ).map((c, i) => ({ ...c, sequenceIndex: 7 + i + 1, chapterNumber: 7 + i + 1 })),
    ],
  }),

  'CBSE__Class 8__Science': makeStandardNcertEntry({
    textbookTitle: 'Curiosity – Textbook of Science for Grade 8 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 8 Curiosity index (13 chapters).',
    chapters: makeChapters([
      'Exploring the Investigative World of Science',
      'The Invisible Living World: Beyond Our Naked Eye',
      'Health: The Ultimate Treasure',
      'Electricity: Magnetic and Heating Effects',
      'Exploring Forces',
      'Pressure, Winds, Storms, and Cyclones',
      'Particulate Nature of Matter',
      'Nature of Matter: Elements, Compounds, and Mixtures',
      'The Amazing World of Solutes, Solvents, and Solutions',
      'Light: Mirrors and Lenses',
      'Keeping Time with the Skies',
      'How Nature Works in Harmony',
      'Our Home: Earth, a Unique Life Sustaining Planet',
    ]),
  }),

  'CBSE__Class 8__Social Science': makeStandardNcertEntry({
    textbookTitle: 'Exploring Society: India and Beyond – Social Science for Grade 8 (Part 1 & Part 2, NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 8 Exploring Society Part 1 (7 ch) & Part 2 (8 ch) indexes (15 chapters).',
    chapters: [
      ...makeChapters(
        [
          'Natural Resources and Their Use',
          'Reshaping India’s Political Map',
          'The Rise of the Marathas',
          'The Colonial Era in India',
          'Universal Franchise and India’s Electoral System',
          'The Parliamentary System: Legislature and Executive',
          'Factors of Production',
        ],
        'Part 1'
      ),
      ...makeChapters(
        [
          'World Geography: Some Glimpses',
          'India’s Long Road to Independence',
          'A Journey Through Indian Architecture',
          'The Role of the Judiciary in Our Society',
          'Citizenship: Rights and Duties',
          'Dynamics of Population',
          'India’s Urban Landscape',
          'Cultural Currents: 13th to 17th Centuries',
        ],
        'Part 2'
      ).map((c, i) => ({ ...c, sequenceIndex: 7 + i + 1, chapterNumber: 7 + i + 1 })),
    ],
  }),

  'CBSE__Class 8__History': makeStandardNcertEntry({
    textbookTitle: 'Exploring Society: India and Beyond – Grade 8 (History & Heritage Themes, NCERT)',
    verificationNote: 'Verified History & Cultural Heritage chapters from NCERT NCF-SE 2023 Class 8 Exploring Society Part 1 & Part 2 (6 chapters).',
    chapters: makeChapters([
      'Part 1 Ch 2: Reshaping India’s Political Map',
      'Part 1 Ch 3: The Rise of the Marathas',
      'Part 1 Ch 4: The Colonial Era in India',
      'Part 2 Ch 2: India’s Long Road to Independence',
      'Part 2 Ch 3: A Journey Through Indian Architecture',
      'Part 2 Ch 8: Cultural Currents: 13th to 17th Centuries',
    ]),
  }),

  'CBSE__Class 8__Geography': makeStandardNcertEntry({
    textbookTitle: 'Exploring Society: India and Beyond – Grade 8 (Geography Themes, NCERT)',
    verificationNote: 'Verified Geography & Population chapters from NCERT NCF-SE 2023 Class 8 Exploring Society Part 1 & Part 2 (4 chapters).',
    chapters: makeChapters([
      'Part 1 Ch 1: Natural Resources and Their Use',
      'Part 2 Ch 1: World Geography: Some Glimpses',
      'Part 2 Ch 6: Dynamics of Population',
      'Part 2 Ch 7: India’s Urban Landscape',
    ]),
  }),

  'CBSE__Class 8__English': makeStandardNcertEntry({
    textbookTitle: 'Poorvi – Textbook of English for Grade 8 (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 8 Poorvi index (Units 1–5, 15 chapters).',
    mediums: ['English'],
    chapters: [
      ...makeChapters(['The Wit that Won Hearts', 'A Concrete Example', 'Wisdom Paves the Way'], 'Unit 1: Wit and Wisdom'),
      ...makeChapters(
        [
          'A Tale of Valour: Major Somnath Sharma and the Battle of Badgam',
          'Somebody’s Mother (Poem)',
          'Verghese Kurien — I Too Had A Dream',
        ],
        'Unit 2: Values and Dispositions'
      ).map((c, i) => ({ ...c, sequenceIndex: 3 + i + 1, chapterNumber: 3 + i + 1 })),
      ...makeChapters(
        ['The Case of the Fifth Word', 'The Magic Brush of Dreams (Poem)', 'Spectacular Wonders'],
        'Unit 3: Mystery and Magic'
      ).map((c, i) => ({ ...c, sequenceIndex: 6 + i + 1, chapterNumber: 6 + i + 1 })),
      ...makeChapters(
        ['The Cherry Tree', 'Harvest Hymn (Poem)', 'Waiting for the Rain'],
        'Unit 4: Environment'
      ).map((c, i) => ({ ...c, sequenceIndex: 9 + i + 1, chapterNumber: 9 + i + 1 })),
      ...makeChapters(
        [
          'Feathered Friend',
          'Magnifying Glass (Poem)',
          'Bibha Chowdhuri: The Beam of Light That Lit the Path for Women in Indian Science',
        ],
        'Unit 5: Science and Curiosity'
      ).map((c, i) => ({ ...c, sequenceIndex: 12 + i + 1, chapterNumber: 12 + i + 1 })),
    ],
  }),

  'CBSE__Class 8__Hindi': makeStandardNcertEntry({
    textbookTitle: 'मल्हार (Malhar) – कक्षा ८ हिंदी पाठ्यपुस्तक (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 8 Malhar index (10 chapters).',
    mediums: ['Hindi'],
    chapters: makeChapters([
      'स्वदेश (कविता)',
      'दो गौरैया',
      'एक आशीर्वाद (कविता)',
      'हरिद्वार (पत्र)',
      'कबीर के दोहे',
      'एक टोकरी भर मिट्टी',
      'मत बाँधो (कविता)',
      'नए मेहमान (एकांकी)',
      'आदमी का अनुपात (कविता)',
      'तरुण के स्वप्न',
    ]),
  }),

  'CBSE__Class 8__Sanskrit': makeStandardNcertEntry({
    textbookTitle: 'दीपकम् (Deepakam) – कक्षा ८ संस्कृत पाठ्यपुस्तकम् (NCERT)',
    verificationNote: 'Verified against official NCERT NCF-SE 2023 Class 8 Deepakam index (13 chapters).',
    chapters: makeChapters([
      'संगच्छध्वं संवदध्वम्',
      'अल्पानामपि वस्तूनां संहतिः कार्यसाधिका',
      'सुभाषितरसं पीत्वा जीवनं सफलं कुरु',
      'प्रणम्यो देशभक्तोऽयं गोपबन्धुर्महामनाः',
      'गीता सुगीता कर्तव्या',
      'डिजिभारतम् – युगपरिवर्तनम्',
      'मञ्जुलमञ्जूषा सुन्दरसुरभाषा',
      'पश्यत कोणमैशान्यं भारतस्य मनोहरम्',
      'कोऽरुक्? कोऽरुक्? कोऽरुक्?',
      'सन्निमित्ते वरं त्यागः (क-भागः)',
      'सन्निमित्ते वरं त्यागः (ख-भागः)',
      'सम्यग्वर्णप्रयोगेण ब्रह्मलोके महीयते',
      'वर्णोच्चारण-शिक्षा १',
    ]),
  }),
};
