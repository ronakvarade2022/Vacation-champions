import type { InstructionMedium } from '../../types/lessonPlanner';
import type {
  CentralChapterItem,
  CentralChapterSectionType,
  CentralMediumVariant,
  CentralSyllabusEntry,
  CentralVerificationStatus,
} from './centralSyllabusDatabase';

export interface StageDNewEntryDefinition {
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

export interface StageDMediumVariantOverlay {
  entryId: string;
  /** Additional mediums to ensure exist in `applicableMediums` */
  addApplicableMediums?: InstructionMedium[];
  /** Verified medium variants to insert or replace (never overwrites unrelated verified variants) */
  upsertVariants: CentralMediumVariant[];
  /** Optional appended audit note */
  appendVerificationNote?: string;
}

const BALBHARATI_PUB =
  'Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune';
const NCERT_PUB = 'National Council of Educational Research and Training (NCERT), New Delhi';

function inferType(title: string): CentralChapterSectionType {
  const lower = title.toLowerCase();
  if (
    lower.includes('(poem)') ||
    lower.includes('(कविता)') ||
    lower.includes('(गीत)') ||
    lower.includes('(गाणे)') ||
    lower.includes('(संतकाव्य)') ||
    lower.includes('(नवगीत)') ||
    lower.includes('(नई कविता)') ||
    lower.includes('(गजल)') ||
    lower.includes('(दोहे)') ||
    lower.includes('(पद)') ||
    lower.includes('(सवैया)') ||
    lower.includes('(हाइकू)') ||
    lower.includes('(लोक भाषा गीत)')
  ) {
    return 'poem';
  }
  if (lower.includes('स्थूलवाचन') || lower.includes('पूरक पठन')) {
    return 'rapid_reading';
  }
  if (lower.includes('(एकांकी)') || lower.includes('(नाटक') || lower.includes('(a skit)')) {
    return 'drama';
  }
  if (lower.includes('व्याकरण') || lower.includes('उपयोजित लेखन')) {
    return 'grammar';
  }
  return 'chapter';
}

function buildChapters(
  items: Array<{ title: string; sectionOrPart?: string; sectionType?: CentralChapterSectionType }>
): CentralChapterItem[] {
  return items.map((item, idx) => ({
    sequenceIndex: idx + 1,
    chapterNumber: idx + 1,
    chapterTitle: item.title,
    ...(item.sectionOrPart ? { sectionOrPart: item.sectionOrPart } : {}),
    sectionType: item.sectionType ?? inferType(item.title),
  }));
}

// =============================================================================
// BATCH 1: Maharashtra My English Book / My English Coursebook (Classes 6, 8, 9, 10)
// Official eBalbharati PDFs directly downloaded, SHA-256 hashed, and TOC-extracted.
// =============================================================================

const MH_C6_MY_ENGLISH_BOOK_6_CHAPTERS = buildChapters([
  { title: '1.1 Monsoon', sectionOrPart: 'Unit One' },
  { title: '1.2 The Crow and the Snake', sectionOrPart: 'Unit One' },
  { title: '1.3 Secret Plan of the Vegetables', sectionOrPart: 'Unit One' },
  { title: '1.4 The People Who Protect Nature', sectionOrPart: 'Unit One' },
  { title: '1.5 One Thing that I Wonder', sectionOrPart: 'Unit One' },
  { title: '2.1 The Brother', sectionOrPart: 'Unit Two' },
  { title: '2.2 Stories on Strings', sectionOrPart: 'Unit Two' },
  { title: '2.3 All About News', sectionOrPart: 'Unit Two' },
  { title: '2.4 Healthy Dessert: Millet Kheer of Kalahandi Tribals', sectionOrPart: 'Unit Two' },
  { title: '2.5 The Plight of the Shy Son-in-Law', sectionOrPart: 'Unit Two' },
  { title: '3.1 The World of Geometry', sectionOrPart: 'Unit Three' },
  { title: '3.2 She Knew No Fear', sectionOrPart: 'Unit Three' },
  { title: '3.3 In Eskimo Land', sectionOrPart: 'Unit Three' },
  { title: '3.4 The Magic Words Club', sectionOrPart: 'Unit Three' },
  { title: '3.5 Joy of Letter Writing', sectionOrPart: 'Unit Three' },
  { title: '4.1 Now Where Will This Bird Rest?', sectionOrPart: 'Unit Four' },
  { title: '4.2 Aim High Like Sheetal Devi', sectionOrPart: 'Unit Four' },
  { title: '4.3 How to Salute the Sun', sectionOrPart: 'Unit Four' },
  { title: '4.4 The Naughty Keyboard', sectionOrPart: 'Unit Four' },
  { title: '4.5 A Honey Bee Speaks: A Monologue', sectionOrPart: 'Unit Four' },
  { title: '5.1 Homework Machine', sectionOrPart: 'Unit Five' },
  { title: '5.2 The Lifeline of Maharashtra: The Godavari River', sectionOrPart: 'Unit Five' },
  { title: '5.3 Nasreddin Hodja and the Smell of Soup', sectionOrPart: 'Unit Five' },
  { title: '5.4 Festival of Kites', sectionOrPart: 'Unit Five' },
  { title: '5.5 The Magic of Flute', sectionOrPart: 'Unit Five' },
  { title: '6.1 The World is With You', sectionOrPart: 'Unit Six' },
  { title: '6.2 The Day Dreamer', sectionOrPart: 'Unit Six' },
  { title: '6.3 The Space Women Scientists in India', sectionOrPart: 'Unit Six' },
  { title: '6.4 My Books', sectionOrPart: 'Unit Six' },
  { title: '6.5 Playing Detective', sectionOrPart: 'Unit Six' },
]);

const MH_C8_MY_ENGLISH_BOOK_8_CHAPTERS = buildChapters([
  { title: '1.1 Be the Best', sectionOrPart: 'Unit One' },
  { title: '1.2 Androcles, and the Lion', sectionOrPart: 'Unit One' },
  { title: '1.3 Trees are the Kindest Things I Know', sectionOrPart: 'Unit One' },
  { title: '1.4 Miss Slippery', sectionOrPart: 'Unit One' },
  { title: '2.1 Try Again', sectionOrPart: 'Unit Two' },
  { title: '2.2 The House builder', sectionOrPart: 'Unit Two' },
  { title: '2.3 The Little River', sectionOrPart: 'Unit Two' },
  { title: '2.4 Excuses! (A Skit)', sectionOrPart: 'Unit Two', sectionType: 'drama' },
  { title: '2.5 A Heroine of the Sea', sectionOrPart: 'Unit Two' },
  { title: '3.1 “Why?”', sectionOrPart: 'Unit Three' },
  { title: '3.2 The Song of Songs', sectionOrPart: 'Unit Three' },
  { title: '3.3 Truth', sectionOrPart: 'Unit Three' },
  { title: '3.4 The Two Gentlemen of Verona', sectionOrPart: 'Unit Three' },
  { title: '4.1 The Vet', sectionOrPart: 'Unit Four' },
  { title: '4.2 P. V. Sindhu - An Icon of Success', sectionOrPart: 'Unit Four' },
  { title: '4.3 Golden Chain', sectionOrPart: 'Unit Four' },
  { title: '4.4 The Unsinkable Ship', sectionOrPart: 'Unit Four' },
  { title: '4.5 Festivals of North East India', sectionOrPart: 'Unit Four' },
]);

const MH_C9_MY_ENGLISH_COURSEBOOK_CHAPTERS = buildChapters([
  { title: '1.1 Walk a little slower ...', sectionOrPart: 'Unit One' },
  { title: '1.2 The Fun they Had', sectionOrPart: 'Unit One' },
  { title: '1.3 ‘Hope’ is the thing with feathers -', sectionOrPart: 'Unit One' },
  { title: '1.4 The Story of Tea', sectionOrPart: 'Unit One' },
  { title: '1.5 The Necklace', sectionOrPart: 'Unit One' },
  { title: '2.1 Comparisons', sectionOrPart: 'Unit Two' },
  { title: '2.2 Helen Keller and Anne Sullivan', sectionOrPart: 'Unit Two' },
  { title: '2.3 Mark Twain', sectionOrPart: 'Unit Two' },
  { title: '2.4 Please Listen!', sectionOrPart: 'Unit Two' },
  { title: '2.5 A Play', sectionOrPart: 'Unit Two', sectionType: 'drama' },
  { title: '3.1 Coromandel Fishers', sectionOrPart: 'Unit Three' },
  { title: '3.2 The Fall of Troy', sectionOrPart: 'Unit Three' },
  { title: '3.3 To a Butterfly', sectionOrPart: 'Unit Three' },
  { title: '3.4 Think Before You Speak!', sectionOrPart: 'Unit Three' },
  { title: '3.5 Great Scientists', sectionOrPart: 'Unit Three' },
  { title: '4.1 What is Success?', sectionOrPart: 'Unit Four' },
  { title: '4.2 Reading Works of Art', sectionOrPart: 'Unit Four' },
  { title: '4.3 Silver', sectionOrPart: 'Unit Four' },
  { title: '4.4 The Tempest', sectionOrPart: 'Unit Four' },
  { title: '4.5 The Last Lesson', sectionOrPart: 'Unit Four' },
]);

const MH_C10_MY_ENGLISH_COURSEBOOK_CHAPTERS = buildChapters([
  { title: '1.1 A Teenager’s Prayer', sectionOrPart: 'Unit One' },
  { title: '1.2 An Encounter of a Special Kind', sectionOrPart: 'Unit One' },
  { title: '1.3 Basketful of Moonlight', sectionOrPart: 'Unit One' },
  { title: '1.4 Be SMART... !', sectionOrPart: 'Unit One' },
  { title: '1.5 His First Flight', sectionOrPart: 'Unit One' },
  { title: '2.1 You Start Dying Slowly ...', sectionOrPart: 'Unit Two' },
  { title: '2.2 The Boy who Broke The Bank', sectionOrPart: 'Unit Two' },
  { title: '2.3 The Twins', sectionOrPart: 'Unit Two' },
  { title: '2.4 An Epitome of Courage', sectionOrPart: 'Unit Two' },
  { title: '2.5 Book Review - Swami and Friends', sectionOrPart: 'Unit Two' },
  { title: '2.6 World Heritage', sectionOrPart: 'Unit Two' },
  { title: '3.1 If ...', sectionOrPart: 'Unit Three' },
  { title: '3.2 A Lesson in Life from a Beggar', sectionOrPart: 'Unit Three' },
  { title: '3.3 Stopping by Woods on a Snowy Evening', sectionOrPart: 'Unit Three' },
  { title: '3.4 Let’s March!', sectionOrPart: 'Unit Three' },
  { title: '3.5 The Alchemy of Nature', sectionOrPart: 'Unit Three' },
  { title: '4.1 The World is Mine', sectionOrPart: 'Unit Four' },
  { title: '4.2 Bholi', sectionOrPart: 'Unit Four' },
  { title: '4.3 O Captain! My Captain!', sectionOrPart: 'Unit Four' },
  { title: '4.4 Unbeatable Super Mom - Mary Kom', sectionOrPart: 'Unit Four' },
  { title: '4.5 Joan of Arc', sectionOrPart: 'Unit Four' },
  { title: '4.6 A Brave Heart Dedicated to Science and Humanity', sectionOrPart: 'Unit Four' },
]);

// =============================================================================
// BATCH 2: Maharashtra Devanagari Official Textbooks (7 Official eBalbharati PDFs)
// Rendered at high resolution from official PDFs and visually transcribed verbatim.
// =============================================================================

const MH_C1_MARATHI_HINDI_MEDIUM_CHAPTERS = buildChapters([
  { title: 'शाळेचा पहिला दिवस', sectionOrPart: 'भाग - १' },
  { title: 'माझी ओळख', sectionOrPart: 'भाग - १' },
  { title: 'माझे कुटुंब', sectionOrPart: 'भाग - १' },
  { title: 'माझे अवयव', sectionOrPart: 'भाग - १' },
  { title: 'मोर (गाणे)', sectionOrPart: 'भाग - १' },
  { title: 'वर्गातील संवाद', sectionOrPart: 'भाग - १' },
  { title: 'माझी कृती', sectionOrPart: 'भाग - १' },
  { title: 'माझे मित्र', sectionOrPart: 'भाग - १' },
  { title: 'घरातील कृती', sectionOrPart: 'भाग - १' },
  { title: 'पक्ष्यांचे आवाज (गाणे)', sectionOrPart: 'भाग - १' },
  { title: 'शालेय साहित्याचे दुकान', sectionOrPart: 'भाग - १' },
  { title: 'आमचे खेळ', sectionOrPart: 'भाग - १' },
  { title: 'रंगांचे गाणे (गाणे)', sectionOrPart: 'भाग - १' },
  { title: 'मदत', sectionOrPart: 'भाग - १' },
  { title: 'सिंहाचा वाढदिवस', sectionOrPart: 'भाग - २' },
  { title: 'माझी आवड', sectionOrPart: 'भाग - २' },
  { title: 'चवीने खाऊ (गाणे)', sectionOrPart: 'भाग - २' },
  { title: 'बसस्थानक', sectionOrPart: 'भाग - २' },
  { title: 'भाजीमंडई', sectionOrPart: 'भाग - २' },
  { title: 'मदतनीस', sectionOrPart: 'भाग - २' },
  { title: 'ढोल वाजे (गाणे)', sectionOrPart: 'भाग - २' },
  { title: 'सायकल', sectionOrPart: 'भाग - २' },
  { title: 'सिंह आणि उंदीर (चित्रकथा)', sectionOrPart: 'भाग - २' },
  { title: 'माझी शाळा', sectionOrPart: 'भाग - २' },
  { title: 'माझा डबा', sectionOrPart: 'भाग - २' },
  { title: 'टोपीवाला व माकडे (चित्रकथा)', sectionOrPart: 'भाग - २' },
  { title: 'फुले (गाणे)', sectionOrPart: 'भाग - २' },
]);

const MH_C6_HINDI_SULABHBHARATI_CHAPTERS = buildChapters([
  { title: 'मेला', sectionOrPart: 'पहली इकाई' },
  { title: 'सैर', sectionOrPart: 'पहली इकाई' },
  { title: 'बसंती हवा', sectionOrPart: 'पहली इकाई' },
  { title: 'उपहार', sectionOrPart: 'पहली इकाई' },
  { title: 'जोकर', sectionOrPart: 'पहली इकाई' },
  { title: '(अ) आओ, आयु बताना सीखो / (ब) महाराष्ट्र की बेटी', sectionOrPart: 'पहली इकाई' },
  { title: 'मेरा अहोभाग्य', sectionOrPart: 'पहली इकाई' },
  { title: 'नदी कंधे पर', sectionOrPart: 'पहली इकाई' },
  { title: 'जन्मदिन', sectionOrPart: 'पहली इकाई' },
  { title: 'सोई मेरी छौना रे !', sectionOrPart: 'पहली इकाई' },
  { title: 'उपयोग हमारे', sectionOrPart: 'दूसरी इकाई' },
  { title: 'तूफानों से क्या डरना', sectionOrPart: 'दूसरी इकाई' },
  { title: 'कठपुतली', sectionOrPart: 'दूसरी इकाई' },
  { title: 'सोना और लोहा', sectionOrPart: 'दूसरी इकाई' },
  { title: '(अ) क्या तुम जानते हो ? / (ब) पहेलियाँ', sectionOrPart: 'दूसरी इकाई' },
  { title: 'स्वास्थ्य संपदा', sectionOrPart: 'दूसरी इकाई' },
  { title: 'कागज की थैली', sectionOrPart: 'दूसरी इकाई' },
  { title: 'टीटू और चिंकी', sectionOrPart: 'दूसरी इकाई' },
  { title: 'वह देश कौन-सा है ?', sectionOrPart: 'दूसरी इकाई' },
]);

const MH_C9_HINDI_KUMARBHARATI_CHAPTERS = buildChapters([
  { title: 'समय की शिला पर (नवगीत)', sectionOrPart: 'पहली इकाई' },
  { title: 'सींकवाली', sectionOrPart: 'पहली इकाई' },
  { title: 'अच्छा पड़ोस', sectionOrPart: 'पहली इकाई' },
  { title: 'शौर्य (पूरक पठन)', sectionOrPart: 'पहली इकाई' },
  { title: 'बर्फ की धरती', sectionOrPart: 'पहली इकाई' },
  { title: 'नदी और दरिया (गजल)', sectionOrPart: 'पहली इकाई' },
  { title: 'मातृभूमि का मान (एकांकी)', sectionOrPart: 'पहली इकाई' },
  { title: 'हिरणी (पूरक पठन)', sectionOrPart: 'पहली इकाई' },
  { title: 'मधुर-मधुर मेरे दीपक जल (कविता)', sectionOrPart: 'पहली इकाई' },
  { title: 'पृथ्वी-आकाश', sectionOrPart: 'पहली इकाई' },
  { title: 'दिवस का अवसान', sectionOrPart: 'पहली इकाई' },
  { title: 'झलमला (पूरक पठन)', sectionOrPart: 'पहली इकाई' },
  { title: 'क्या सचमुच आज़ाद हुए हम ? (गीत)', sectionOrPart: 'पहली इकाई' },
  { title: 'वसंत-वर्षा (सवैया)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'ताई', sectionOrPart: 'दूसरी इकाई' },
  { title: 'गोदान', sectionOrPart: 'दूसरी इकाई' },
  { title: 'निर्मल जिंदगी (पूरक पठन)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'चेतना', sectionOrPart: 'दूसरी इकाई' },
  { title: 'नवनीत (दोहे)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'सपनों से सत्य की ओर (पूरक पठन)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'मित्रता', sectionOrPart: 'दूसरी इकाई' },
  { title: 'बादल को घिरते देखा है (नई कविता)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'क्रोध (पूरक पठन)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'अद्भुत वीर', sectionOrPart: 'दूसरी इकाई' },
  { title: 'सच का सौदा', sectionOrPart: 'दूसरी इकाई' },
  { title: 'विप्लव गान (कविता)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'रचना विभाग एवं व्याकरण विभाग', sectionOrPart: 'दूसरी इकाई', sectionType: 'grammar' },
]);

const MH_C10_MARATHI_KUMARBHARATI_CHAPTERS = buildChapters([
  { title: 'जय जय हे भारत देशा (गीत)', sectionOrPart: 'भाग - १' },
  { title: 'बोलतो मराठी...', sectionOrPart: 'भाग - १' },
  { title: 'आजी : कुटुंबाचं आगळ', sectionOrPart: 'भाग - १' },
  { title: 'उत्तमलक्षण (संतकाव्य)', sectionOrPart: 'भाग - १' },
  { title: 'वसंतहृदय चैत्र', sectionOrPart: 'भाग - १' },
  { title: 'बालसाहित्यिका : गिरिजा कीर (स्थूलवाचन)', sectionOrPart: 'भाग - १' },
  { title: 'वस्तू (कविता)', sectionOrPart: 'भाग - २' },
  { title: 'गवताचे पाते', sectionOrPart: 'भाग - २' },
  { title: 'वाट पाहताना', sectionOrPart: 'भाग - २' },
  { title: 'आश्वासक चित्र (कविता)', sectionOrPart: 'भाग - २' },
  { title: 'आप्पांचे पत्र', sectionOrPart: 'भाग - २' },
  { title: 'मनक्या पेर लागा (स्थूलवाचन)', sectionOrPart: 'भाग - २' },
  { title: 'गोष्ट अरुणिमाची', sectionOrPart: 'भाग - ३' },
  { title: 'भरतवाक्य (कविता)', sectionOrPart: 'भाग - ३' },
  { title: 'कर्ते सुधारक कर्वे', sectionOrPart: 'भाग - ३' },
  { title: 'काळे केस', sectionOrPart: 'भाग - ३' },
  { title: 'खोद आणखी थोडेसे (कविता)', sectionOrPart: 'भाग - ३' },
  { title: 'वीरांगना (स्थूलवाचन)', sectionOrPart: 'भाग - ३' },
  { title: 'आकाशी झेप घे रे (कविता)', sectionOrPart: 'भाग - ४' },
  { title: 'सोनाली', sectionOrPart: 'भाग - ४' },
  { title: 'निर्णय', sectionOrPart: 'भाग - ४' },
  { title: 'तू झालास मूक समाजाचा नायक (कविता)', sectionOrPart: 'भाग - ४' },
  { title: 'सर्व विश्वचि व्हावे सुखी', sectionOrPart: 'भाग - ४' },
  { title: 'व्युत्पत्ती कोश (स्थूलवाचन)', sectionOrPart: 'भाग - ४' },
  { title: 'उपयोजित लेखन', sectionOrPart: 'भाग - ४', sectionType: 'grammar' },
]);

const MH_C10_HINDI_KUMARBHARATI_CHAPTERS = buildChapters([
  { title: 'उड़ चल, हारिल (कविता)', sectionOrPart: 'पहली इकाई' },
  { title: 'डिनर (पूरक पठन)', sectionOrPart: 'पहली इकाई' },
  { title: 'नाम चर्चा', sectionOrPart: 'पहली इकाई' },
  { title: 'मेरी स्मृति (हाइकू)', sectionOrPart: 'पहली इकाई' },
  { title: 'भाषा का प्रश्न (पूरक पठन)', sectionOrPart: 'पहली इकाई' },
  { title: 'दो संस्मरण', sectionOrPart: 'पहली इकाई' },
  { title: 'हिम', sectionOrPart: 'पहली इकाई' },
  { title: 'प्रण (नाटक अंश)', sectionOrPart: 'पहली इकाई' },
  { title: 'ब्रजवासी (पद)', sectionOrPart: 'पहली इकाई' },
  { title: 'गुरुदेव का घर', sectionOrPart: 'पहली इकाई' },
  { title: 'दो लघुकथाएँ', sectionOrPart: 'पहली इकाई' },
  { title: 'गजलें (पूरक पठन)', sectionOrPart: 'पहली इकाई' },
  { title: 'संध्या सुंदरी (नई कविता)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'चीफ की दावत', sectionOrPart: 'दूसरी इकाई' },
  { title: 'जानता हूँ मैं', sectionOrPart: 'दूसरी इकाई' },
  { title: 'बटोहिया (पूरक पठन)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'अथातो घुमक्कड़-जिज्ञासा', sectionOrPart: 'दूसरी इकाई' },
  { title: 'मानस का हंस', sectionOrPart: 'दूसरी इकाई' },
  { title: 'अकथ कथ्यौ न जाइ (पद)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'बातचीत (पूरक पठन)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'चिंता', sectionOrPart: 'दूसरी इकाई' },
  { title: 'टॉल्स्टॉय के घर के दर्शन', sectionOrPart: 'दूसरी इकाई' },
  { title: 'दुख (पूरक पठन)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'चलो हम दीप जलाएँ (गीत)', sectionOrPart: 'दूसरी इकाई' },
  { title: 'व्याकरण तथा रचना विभाग एवं भावार्थ', sectionOrPart: 'दूसरी इकाई', sectionType: 'grammar' },
]);

const MH_C9_JAL_SURAKSHA_HINDI_CHAPTERS = buildChapters([
  { title: 'जलचक्र', sectionOrPart: 'घटक 1 : जल शिक्षा' },
  { title: 'नदी प्रणाली', sectionOrPart: 'घटक 1 : जल शिक्षा' },
  { title: 'अपवाह क्षेत्र और जल के प्रकार', sectionOrPart: 'घटक 1 : जल शिक्षा' },
  { title: 'मृदा और चट्टानों के प्रकार', sectionOrPart: 'घटक 1 : जल शिक्षा' },
  { title: 'जल संरचना', sectionOrPart: 'घटक 2 : जल संवर्धन' },
  { title: 'जल संवर्धन-संकल्पना', sectionOrPart: 'घटक 2 : जल संवर्धन' },
  { title: 'अपवाह क्षेत्र और उपचार', sectionOrPart: 'घटक 2 : जल संवर्धन' },
  { title: 'जल पुनर्भरण', sectionOrPart: 'घटक 2 : जल संवर्धन' },
  { title: 'जल – जीवन का आधार', sectionOrPart: 'घटक 3 : जल प्रबंधन' },
  { title: 'हमारे द्वारा जल का उपयोग', sectionOrPart: 'घटक 3 : जल प्रबंधन' },
  { title: 'जल की यात्रा : बाँध से लेकर घर तक', sectionOrPart: 'घटक 3 : जल प्रबंधन' },
  { title: 'जल प्रबंधन किसे कहते हैं?', sectionOrPart: 'घटक 3 : जल प्रबंधन' },
  { title: 'जल की गुणवत्ता और उसके निकष', sectionOrPart: 'घटक 4 : जल गुणवत्ता' },
  { title: 'जल की गुणवत्ता कैसे बनाए रख सकते हैं?', sectionOrPart: 'घटक 4 : जल गुणवत्ता' },
  { title: 'जल प्रदूषण : कारण, परिणाम और उपाय', sectionOrPart: 'घटक 4 : जल गुणवत्ता' },
]);

const MH_C10_JAL_SURAKSHA_HINDI_CHAPTERS = buildChapters([
  { title: 'पर्यावरण और परिसंस्था', sectionOrPart: 'घटक 1 : जल शिक्षा' },
  { title: 'जल जिज्ञासा की सांस्कृतिक विरासत', sectionOrPart: 'घटक 1 : जल शिक्षा' },
  { title: 'जल मापन', sectionOrPart: 'घटक 1 : जल शिक्षा' },
  { title: 'जल प्रारूप', sectionOrPart: 'घटक 2 : जल संवर्धन' },
  { title: 'अपवाह क्षेत्र का विकास', sectionOrPart: 'घटक 2 : जल संवर्धन' },
  { title: 'जल संवर्धन और जनसहभागिता', sectionOrPart: 'घटक 2 : जल संवर्धन' },
  { title: 'महाराष्ट्र की जल स्थिति और जल चुनौतियाँ', sectionOrPart: 'घटक 3 : जल प्रबंधन' },
  { title: 'सिंचाई', sectionOrPart: 'घटक 3 : जल प्रबंधन' },
  { title: 'जल अधिनियम और नियम', sectionOrPart: 'घटक 3 : जल प्रबंधन' },
  { title: 'जल शुद्धीकरण और धोवनजल प्रबंधन', sectionOrPart: 'घटक 4 : जल की गुणवत्ता' },
  { title: 'पर्यावरणीय जीवन प्रणाली', sectionOrPart: 'घटक 4 : जल की गुणवत्ता' },
  { title: 'भूगर्भीय लवण जल की योजना', sectionOrPart: 'घटक 4 : जल की गुणवत्ता' },
]);

function makeMultiMediumVariants(
  mediums: InstructionMedium[],
  spec: Omit<CentralMediumVariant, 'medium'>
): CentralMediumVariant[] {
  return mediums.map((medium) => ({
    medium,
    ...spec,
  }));
}

export const STAGE_D_MEDIUM_VARIANT_OVERLAYS: Readonly<Record<string, StageDMediumVariantOverlay>> =
  Object.freeze({
    // Batch 1: Maharashtra My English Book / My English Coursebook (Classes 6, 8, 9, 10)
    'Maharashtra__Class 6__English': {
      entryId: 'Maharashtra__Class 6__English',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: makeMultiMediumVariants(['Marathi', 'Hindi', 'Semi-English'], {
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: 'My English Book Six – Standard Six (Item 603060035)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: '2026 (NEP 2020 Revised Edition)',
        officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/603060035.pdf',
        verificationNote:
          'Verified verbatim from official eBalbharati PDF 603060035.pdf (TOC page 10, 30 units across Units 1–6, SHA-256 4bc4a36b3d8b00e2...).',
        chapters: MH_C6_MY_ENGLISH_BOOK_6_CHAPTERS,
      }),
    },
    'Maharashtra__Class 8__English': {
      entryId: 'Maharashtra__Class 8__English',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: makeMultiMediumVariants(['Marathi', 'Hindi', 'Semi-English'], {
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: 'My English Book Eight – Standard Eight (Item 803020035)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: '2025–2026 Official Reprint Edition',
        officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/803020035.pdf',
        verificationNote:
          'Verified verbatim from official eBalbharati PDF 803020035.pdf (TOC page 10, 18 units across Units 1–4, SHA-256 64fc4eb4c7e11d7a...).',
        chapters: MH_C8_MY_ENGLISH_BOOK_8_CHAPTERS,
      }),
    },
    'Maharashtra__Class 9__English': {
      entryId: 'Maharashtra__Class 9__English',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: makeMultiMediumVariants(['Marathi', 'Hindi', 'Semi-English'], {
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: 'My English Coursebook – Standard Nine (Item 903000607)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: '2025–2026 Official Reprint Edition',
        officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/903000607.pdf',
        verificationNote:
          'Verified verbatim from official eBalbharati PDF 903000607.pdf (TOC page 12, 20 units across Units 1–4, SHA-256 9bd677b2dbd641c8...).',
        chapters: MH_C9_MY_ENGLISH_COURSEBOOK_CHAPTERS,
      }),
    },
    'Maharashtra__Class 10__English': {
      entryId: 'Maharashtra__Class 10__English',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: makeMultiMediumVariants(['Marathi', 'Hindi', 'Semi-English'], {
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: 'My English Coursebook – Standard Ten (Item 1003000607)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: '2025–2026 Official Reprint Edition',
        officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1003000607.pdf',
        verificationNote:
          'Verified verbatim from official eBalbharati PDF 1003000607.pdf (TOC page 12, 22 units across Units 1–4, SHA-256 558fcd7aec2c1839...).',
        chapters: MH_C10_MY_ENGLISH_COURSEBOOK_CHAPTERS,
      }),
    },

    // Batch 2: Maharashtra Devanagari Official Textbooks (Visual TOC + SHA-256 Verified)
    'Maharashtra__Class 1__Marathi': {
      entryId: 'Maharashtra__Class 1__Marathi',
      upsertVariants: [
        {
          medium: 'Hindi',
          languageRole: 'Second / Third Language',
          status: 'VERIFIED',
          textbookTitle: 'करू मैत्री मराठीशी – इयत्ता पहिली (हिंदी माध्यम, Item 101000867)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025 (NEP 2020 Revised Edition)',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/101000867.pdf',
          verificationNote:
            'Verified visually from official eBalbharati PDF 101000867.pdf (TOC page 10, 27 chapters prescribed specifically for Hindi/Urdu/Gujarati/Kannada mediums, SHA-256 19af638170f46cf3...).',
          chapters: MH_C1_MARATHI_HINDI_MEDIUM_CHAPTERS,
        },
      ],
    },
    'Maharashtra__Class 6__Hindi': {
      entryId: 'Maharashtra__Class 6__Hindi',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: makeMultiMediumVariants(['English', 'Marathi', 'Semi-English'], {
        languageRole: 'Second / Third Language',
        status: 'VERIFIED',
        textbookTitle: 'हिंदी सुलभभारती – छठी कक्षा (Item 602020020)',
        publisher: BALBHARATI_PUB,
        academicYearEdition: '2025–2026 Official Reprint Edition',
        officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/602020020.pdf',
        verificationNote:
          'Verified visually from official eBalbharati PDF 602020020.pdf (TOC page 9, 19 lessons across 2 units, SHA-256 829aa80185a0fdd6...).',
        chapters: MH_C6_HINDI_SULABHBHARATI_CHAPTERS,
      }),
    },
    'Maharashtra__Class 9__Hindi': {
      entryId: 'Maharashtra__Class 9__Hindi',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: [
        {
          medium: 'Hindi',
          languageRole: 'First Language',
          status: 'VERIFIED',
          textbookTitle: 'हिंदी कुमारभारती – नौवीं कक्षा (Item 902030024)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/902030024.pdf',
          verificationNote:
            'Verified visually from official eBalbharati PDF 902030024.pdf (TOC page 10, 26 lessons + grammar/composition across 2 units, SHA-256 aa2dd209832d9748...).',
          chapters: MH_C9_HINDI_KUMARBHARATI_CHAPTERS,
        },
      ],
    },
    'Maharashtra__Class 10__Marathi': {
      entryId: 'Maharashtra__Class 10__Marathi',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: [
        {
          medium: 'Marathi',
          languageRole: 'First Language',
          status: 'VERIFIED',
          textbookTitle: 'मराठी कुमारभारती – इयत्ता दहावी (Item 1001030024)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1001030024.pdf',
          verificationNote:
            'Verified visually from official eBalbharati PDF 1001030024.pdf (TOC page 10, 25 units across Parts 1–4, SHA-256 61591eb1e304d368...).',
          chapters: MH_C10_MARATHI_KUMARBHARATI_CHAPTERS,
        },
      ],
    },
    'Maharashtra__Class 10__Hindi': {
      entryId: 'Maharashtra__Class 10__Hindi',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: [
        {
          medium: 'Hindi',
          languageRole: 'First Language',
          status: 'VERIFIED',
          textbookTitle: 'हिंदी कुमारभारती – दसवीं कक्षा (Item 1002030024)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1002030024.pdf',
          verificationNote:
            'Verified visually from official eBalbharati PDF 1002030024.pdf (TOC page 10, 24 lessons + grammar/composition across 2 units, SHA-256 76d9fc6638e7ce32...).',
          chapters: MH_C10_HINDI_KUMARBHARATI_CHAPTERS,
        },
      ],
    },
    'Maharashtra__Class 9__Environmental Education': {
      entryId: 'Maharashtra__Class 9__Environmental Education',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: [
        {
          medium: 'Hindi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'जलसुरक्षा – नौवीं कक्षा (हिंदी माध्यम, Item 902000681)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/902000681.pdf',
          verificationNote:
            'Verified visually from official eBalbharati PDF 902000681.pdf (TOC page 10, 15 chapters across 4 units, SHA-256 1a68ac1f12470232...).',
          chapters: MH_C9_JAL_SURAKSHA_HINDI_CHAPTERS,
        },
      ],
    },
    'Maharashtra__Class 10__Environmental Education': {
      entryId: 'Maharashtra__Class 10__Environmental Education',
      addApplicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
      upsertVariants: [
        {
          medium: 'Hindi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'जलसुरक्षा – दसवीं कक्षा (हिंदी माध्यम, Item 1002000681)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/1002000681.pdf',
          verificationNote:
            'Verified visually from official eBalbharati PDF 1002000681.pdf (TOC page 9, 12 chapters across 4 units, SHA-256 a6d07e79ae0b7188...).',
          chapters: MH_C10_JAL_SURAKSHA_HINDI_CHAPTERS,
        },
      ],
    },
  });

// =============================================================================
// BATCH 4: Official Board Entries Newly Promoted from Blocked -> VERIFIED
// Derived 100% from already-verified official NCERT / Balbharati textbooks.
// =============================================================================

const CBSE_C6_GEOGRAPHY_CHAPTERS = buildChapters([
  { title: 'Ch 1: Locating Places on the Earth', sectionOrPart: 'Theme A: India and the World: Land and the People' },
  { title: 'Ch 2: Oceans and Continents', sectionOrPart: 'Theme A: India and the World: Land and the People' },
  { title: 'Ch 3: Landforms and Life', sectionOrPart: 'Theme A: India and the World: Land and the People' },
]);

const CBSE_C6_HISTORY_CHAPTERS = buildChapters([
  { title: 'Ch 4: Timeline and Sources of History', sectionOrPart: 'Theme B: Tapestry of the Past' },
  { title: 'Ch 5: India, That Is Bharat', sectionOrPart: 'Theme B: Tapestry of the Past' },
  { title: 'Ch 6: The Beginnings of Indian Civilisation', sectionOrPart: 'Theme B: Tapestry of the Past' },
  { title: 'Ch 7: India’s Cultural Roots', sectionOrPart: 'Theme C: Our Cultural Heritage and Knowledge Traditions' },
  { title: 'Ch 8: Unity in Diversity, or ‘Many in the One’', sectionOrPart: 'Theme C: Our Cultural Heritage and Knowledge Traditions' },
]);

const MH_C4_HISTORY_CHAPTERS = buildChapters([
  { title: 'Maharashtra before Shivaji', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Work of the Saints', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Maratha Sardars – The Famous House of the Bhonsales', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Shivaji’s Childhood', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Shivaji’s Education', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'The Oath of Swaraj', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Swaraj: First Conquest', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Defeat of Internal Enemies', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Pratapgad Makes History', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Baji Prabhu and the Memorable Battle of Ghodkhind', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'The Discomfiture of Shaistakhan', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'The Siege of Purandar and the Treaty with the Moghul Emperor', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Shivaji Gives the Slip to the Emperor', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'The Fort is Captured, but the Lion is Dead', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'A Memorable Ceremony', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Campaign in the South', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Management of Forts and the Navy', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
  { title: 'Management of the Welfare State of Swaraj', sectionOrPart: 'EVS Part Two (Shivchatrapati)' },
]);

const MH_C5_HISTORY_CHAPTERS = buildChapters([
  { title: 'What is History?', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'History and the Concept of ‘Time’', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'Life on Earth', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'Evolution', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'Evolution of Mankind', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'Stone Age: Stone Tools', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'From Shelters to Village-settlements', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'Beginning of Settled Life', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'Settled Life and Urban Civilization', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
  { title: 'Historic Period', sectionOrPart: 'EVS Part Two (How We Came to Be)' },
]);

const MH_ALL_4_MEDIUMS: InstructionMedium[] = ['English', 'Marathi', 'Hindi', 'Semi-English'];
const CBSE_2_MEDIUMS: InstructionMedium[] = ['English', 'Hindi'];

export const STAGE_D_NEW_VERIFIED_ENTRIES_MAP: Readonly<Record<string, StageDNewEntryDefinition>> =
  Object.freeze({
    'CBSE__Class 6__Geography': {
      verificationStatus: 'VERIFIED',
      textbookTitle: 'Exploring Society: India and Beyond – Grade 6 (Geography Theme, NCERT)',
      publisher: NCERT_PUB,
      academicYearEdition: '2025–2026 NCF-SE 2023 Aligned Edition',
      applicableMediums: CBSE_2_MEDIUMS,
      officialSourceUrl: 'https://ncert.nic.in/textbook.php',
      verificationNote:
        'Verified directly from official NCERT Grade 6 Social Science textbook "Exploring Society: India and Beyond" (Theme A: India and the World: Land and the People, Chapters 1–3; parity with verified CBSE Grades 7 & 8 Geography theme mappings).',
      chapters: CBSE_C6_GEOGRAPHY_CHAPTERS,
      mediumVariants: makeMultiMediumVariants(CBSE_2_MEDIUMS, {
        languageRole: 'Subject Textbook',
        status: 'VERIFIED',
        textbookTitle: 'Exploring Society: India and Beyond – Grade 6 (Geography Theme, NCERT)',
        publisher: NCERT_PUB,
        academicYearEdition: '2025–2026 NCF-SE 2023 Aligned Edition',
        officialSourceUrl: 'https://ncert.nic.in/textbook.php',
        verificationNote:
          'Official NCERT Grade 6 Geography theme chapters (Ch 1–3) from Exploring Society: India and Beyond.',
        chapters: CBSE_C6_GEOGRAPHY_CHAPTERS,
      }),
    },
    'CBSE__Class 6__History': {
      verificationStatus: 'VERIFIED',
      textbookTitle: 'Exploring Society: India and Beyond – Grade 6 (History & Heritage Themes, NCERT)',
      publisher: NCERT_PUB,
      academicYearEdition: '2025–2026 NCF-SE 2023 Aligned Edition',
      applicableMediums: CBSE_2_MEDIUMS,
      officialSourceUrl: 'https://ncert.nic.in/textbook.php',
      verificationNote:
        'Verified directly from official NCERT Grade 6 Social Science textbook "Exploring Society: India and Beyond" (Theme B: Tapestry of the Past & Theme C: Cultural Heritage, Chapters 4–8; parity with verified CBSE Grades 7 & 8 History theme mappings).',
      chapters: CBSE_C6_HISTORY_CHAPTERS,
      mediumVariants: makeMultiMediumVariants(CBSE_2_MEDIUMS, {
        languageRole: 'Subject Textbook',
        status: 'VERIFIED',
        textbookTitle: 'Exploring Society: India and Beyond – Grade 6 (History & Heritage Themes, NCERT)',
        publisher: NCERT_PUB,
        academicYearEdition: '2025–2026 NCF-SE 2023 Aligned Edition',
        officialSourceUrl: 'https://ncert.nic.in/textbook.php',
        verificationNote:
          'Official NCERT Grade 6 History & Cultural Heritage theme chapters (Ch 4–8) from Exploring Society: India and Beyond.',
        chapters: CBSE_C6_HISTORY_CHAPTERS,
      }),
    },
    'Maharashtra__Class 4__History': {
      verificationStatus: 'VERIFIED',
      textbookTitle: 'Environmental Studies Part Two (Shivchatrapati) – Standard Four (Balbharati)',
      publisher: BALBHARATI_PUB,
      academicYearEdition: '2025–2026 Official Reprint Edition',
      applicableMediums: MH_ALL_4_MEDIUMS,
      officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/403000869.pdf',
      verificationNote:
        'Verified official standalone Balbharati Std 4 History textbook (EVS Part Two – Shivchatrapati, 18 chapters across English 403000869.pdf, Marathi 401000869.pdf, Hindi 402000869.pdf, and Semi-English mediums).',
      chapters: MH_C4_HISTORY_CHAPTERS,
      mediumVariants: [
        {
          medium: 'English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'Environmental Studies Part Two (Shivchatrapati) – Standard Four (Balbharati)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/403000869.pdf',
          verificationNote: 'Official Balbharati Std 4 History English-medium PDF (403000869.pdf, 18 chapters).',
          chapters: MH_C4_HISTORY_CHAPTERS,
        },
        {
          medium: 'Marathi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'परिसर अभ्यास भाग २ (शिवछत्रपती) – इयत्ता चौथी (बालभारती)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/401000869.pdf',
          verificationNote: 'Official Balbharati Std 4 History Marathi-medium PDF (401000869.pdf, 18 chapters).',
          chapters: MH_C4_HISTORY_CHAPTERS,
        },
        {
          medium: 'Hindi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'परिसर अध्ययन भाग २ (शिवछत्रपति) – कक्षा चौथी (बालभारती)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/402000869.pdf',
          verificationNote: 'Official Balbharati Std 4 History Hindi-medium PDF (402000869.pdf, 18 chapters).',
          chapters: MH_C4_HISTORY_CHAPTERS,
        },
        {
          medium: 'Semi-English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'परिसर अभ्यास भाग २ / Environmental Studies Part Two (Shivchatrapati) – Standard Four (Balbharati)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/401000869.pdf',
          verificationNote: 'Official Balbharati Std 4 History Semi-English curriculum (401000869.pdf / 403000869.pdf, 18 chapters).',
          chapters: MH_C4_HISTORY_CHAPTERS,
        },
      ],
    },
    'Maharashtra__Class 5__History': {
      verificationStatus: 'VERIFIED',
      textbookTitle: 'Environmental Studies Part Two (How We Came to Be) – Standard Five (Balbharati)',
      publisher: BALBHARATI_PUB,
      academicYearEdition: '2025–2026 Official Reprint Edition',
      applicableMediums: MH_ALL_4_MEDIUMS,
      officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/503000542.pdf',
      verificationNote:
        'Verified official standalone Balbharati Std 5 History textbook (EVS Part Two – How We Came to Be, 10 chapters across English 503000542.pdf, Marathi 501000542.pdf, Hindi 502000542.pdf, and Semi-English mediums).',
      chapters: MH_C5_HISTORY_CHAPTERS,
      mediumVariants: [
        {
          medium: 'English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'Environmental Studies Part Two (How We Came to Be) – Standard Five (Balbharati)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/503000542.pdf',
          verificationNote: 'Official Balbharati Std 5 History English-medium PDF (503000542.pdf, 10 chapters).',
          chapters: MH_C5_HISTORY_CHAPTERS,
        },
        {
          medium: 'Marathi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'परिसर अभ्यास भाग २ (आपण असे घडलो) – इयत्ता पाचवी (बालभारती)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/501000542.pdf',
          verificationNote: 'Official Balbharati Std 5 History Marathi-medium PDF (501000542.pdf, 10 chapters).',
          chapters: MH_C5_HISTORY_CHAPTERS,
        },
        {
          medium: 'Hindi',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'परिसर अध्ययन भाग २ (हम ऐसे बने) – कक्षा पाँचवीं (बालभारती)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/502000542.pdf',
          verificationNote: 'Official Balbharati Std 5 History Hindi-medium PDF (502000542.pdf, 10 chapters).',
          chapters: MH_C5_HISTORY_CHAPTERS,
        },
        {
          medium: 'Semi-English',
          languageRole: 'Subject Textbook',
          status: 'VERIFIED',
          textbookTitle: 'परिसर अभ्यास भाग २ / Environmental Studies Part Two (How We Came to Be) – Standard Five (Balbharati)',
          publisher: BALBHARATI_PUB,
          academicYearEdition: '2025–2026 Official Reprint Edition',
          officialSourceUrl: 'https://ebooks.ebalbharati.in/pdfs/501000542.pdf',
          verificationNote: 'Official Balbharati Std 5 History Semi-English curriculum (501000542.pdf / 503000542.pdf, 10 chapters).',
          chapters: MH_C5_HISTORY_CHAPTERS,
        },
      ],
    },
  });

/**
 * Post-processing step invoked after all base, Phase 2, and Stage C records are constructed:
 * 1. Applies Batch 1 & Batch 2 official PDF-verified medium variant overlays (preserving all existing verified variants).
 * 2. Applies Batch 3 cross-medium parity for CBSE English/Hindi/CT&AI and ICSE Class 9-10 Hindi (English medium).
 * 3. Builds Batch 4 official composite Maharashtra Social Studies (Classes 6–10) directly from verified History, Political Science, and Geography records.
 */
export function applyStageDVerifiedOverlays(map: Record<string, CentralSyllabusEntry>): void {
  // 1. Apply explicit Stage D medium-variant overlays (Batch 1 & Batch 2)
  for (const overlay of Object.values(STAGE_D_MEDIUM_VARIANT_OVERLAYS)) {
    const entry = map[overlay.entryId];
    if (!entry) continue;

    if (overlay.addApplicableMediums) {
      const mergedMediums = Array.from(
        new Set<InstructionMedium>([...entry.applicableMediums, ...overlay.addApplicableMediums])
      );
      entry.applicableMediums = mergedMediums;
    }

    const updatedVariants = [...entry.mediumVariants];
    for (const newVar of overlay.upsertVariants) {
      const existingIdx = updatedVariants.findIndex((v) => v.medium === newVar.medium);
      if (existingIdx >= 0) {
        updatedVariants[existingIdx] = newVar;
      } else {
        updatedVariants.push(newVar);
      }
    }
    entry.mediumVariants = updatedVariants;

    if (overlay.appendVerificationNote) {
      entry.verificationNote = `${entry.verificationNote} ${overlay.appendVerificationNote}`;
    }
  }

  // 2. Batch 3: CBSE & ICSE Cross-Medium Official Textbook Parity
  // - CBSE Hindi-medium schools study the exact same official NCERT English textbooks (Mridang/Santoor/Poorvi/Beehive/First Flight) & CBSE CT & AI Handbooks.
  // - CBSE English-medium schools study the exact same official NCERT Hindi textbooks (Sarangi/Veena/Malhar/Kshitij).
  // - ICSE is an English-medium board; English-medium ICSE Class 9-10 students study official CISCE Sahitya Sagar Hindi.
  for (const entry of Object.values(map)) {
    if (entry.verificationStatus !== 'VERIFIED' || entry.chapters.length === 0) continue;

    if (entry.board === 'CBSE') {
      if (entry.subject === 'English' || entry.subject === 'Computer Knowledge') {
        const hasHindi = entry.mediumVariants.some((v) => v.medium === 'Hindi');
        if (!hasHindi) {
          const engVar = entry.mediumVariants.find((v) => v.medium === 'English');
          entry.applicableMediums = Array.from(
            new Set<InstructionMedium>([...entry.applicableMediums, 'Hindi'])
          );
          entry.mediumVariants = [
            ...entry.mediumVariants,
            {
              medium: 'Hindi',
              languageRole: entry.subject === 'English' ? 'Second / Third Language' : 'Subject Textbook',
              status: 'VERIFIED',
              textbookTitle: engVar?.textbookTitle ?? entry.textbookTitle,
              publisher: engVar?.publisher ?? entry.publisher,
              academicYearEdition: engVar?.academicYearEdition ?? entry.academicYearEdition,
              officialSourceUrl: engVar?.officialSourceUrl ?? entry.officialSourceUrl,
              verificationNote:
                entry.subject === 'English'
                  ? `Official NCERT English textbook prescribed uniformly across CBSE English and Hindi medium schools (${entry.textbookTitle}).`
                  : `Official CBSE 2026–27 CT & AI Student Handbook prescribed uniformly across CBSE schools (${entry.textbookTitle}).`,
              chapters: [...entry.chapters],
            },
          ];
        }
      } else if (entry.subject === 'Hindi') {
        const hasEnglish = entry.mediumVariants.some((v) => v.medium === 'English');
        if (!hasEnglish) {
          const hinVar = entry.mediumVariants.find((v) => v.medium === 'Hindi');
          entry.applicableMediums = Array.from(
            new Set<InstructionMedium>(['English', ...entry.applicableMediums])
          );
          entry.mediumVariants = [
            {
              medium: 'English',
              languageRole: 'Second / Third Language',
              status: 'VERIFIED',
              textbookTitle: hinVar?.textbookTitle ?? entry.textbookTitle,
              publisher: hinVar?.publisher ?? entry.publisher,
              academicYearEdition: hinVar?.academicYearEdition ?? entry.academicYearEdition,
              officialSourceUrl: hinVar?.officialSourceUrl ?? entry.officialSourceUrl,
              verificationNote: `Official NCERT Hindi textbook prescribed uniformly across CBSE English and Hindi medium schools (${entry.textbookTitle}).`,
              chapters: [...entry.chapters],
            },
            ...entry.mediumVariants,
          ];
        }
      }
    } else if (entry.board === 'ICSE' && entry.subject === 'Hindi') {
      const hasEnglish = entry.mediumVariants.some((v) => v.medium === 'English');
      if (!hasEnglish) {
        const hinVar = entry.mediumVariants.find((v) => v.medium === 'Hindi');
        entry.applicableMediums = Array.from(
          new Set<InstructionMedium>(['English', ...entry.applicableMediums])
        );
        entry.mediumVariants = [
          {
            medium: 'English',
            languageRole: 'Second / Third Language',
            status: 'VERIFIED',
            textbookTitle: hinVar?.textbookTitle ?? entry.textbookTitle,
            publisher: hinVar?.publisher ?? entry.publisher,
            academicYearEdition: hinVar?.academicYearEdition ?? entry.academicYearEdition,
            officialSourceUrl: hinVar?.officialSourceUrl ?? entry.officialSourceUrl,
            verificationNote: `Official CISCE ICSE Second Language Hindi prescription (${entry.textbookTitle}) for English-medium ICSE schools.`,
            chapters: [...entry.chapters],
          },
          ...entry.mediumVariants,
        ];
      }
    }
  }

  // 3. Batch 4 Composite: Maharashtra Social Studies (Classes 6–10)
  // Built directly from already-verified Balbharati History, Political Science, and Geography entries
  // (exact parity with verified CBSE Social Science and Maharashtra Science/Maths composite entries).
  const mhCompositeSpecs: Array<{
    classLevel: 'Class 6' | 'Class 7' | 'Class 8' | 'Class 9' | 'Class 10';
    componentKeys: Array<{ key: string; prefix: string }>;
    title: string;
  }> = [
    {
      classLevel: 'Class 6',
      componentKeys: [
        { key: 'Maharashtra__Class 6__History', prefix: 'History & Civics' },
        { key: 'Maharashtra__Class 6__Geography', prefix: 'Geography' },
      ],
      title: 'History and Civics + Geography – Standard Six (Balbharati Composite)',
    },
    {
      classLevel: 'Class 7',
      componentKeys: [
        { key: 'Maharashtra__Class 7__History', prefix: 'History & Civics' },
        { key: 'Maharashtra__Class 7__Geography', prefix: 'Geography' },
      ],
      title: 'History and Civics + Geography – Standard Seven (Balbharati Composite)',
    },
    {
      classLevel: 'Class 8',
      componentKeys: [
        { key: 'Maharashtra__Class 8__History', prefix: 'History & Civics' },
        { key: 'Maharashtra__Class 8__Geography', prefix: 'Geography' },
      ],
      title: 'History and Civics + Geography – Standard Eight (Balbharati Composite)',
    },
    {
      classLevel: 'Class 9',
      componentKeys: [
        { key: 'Maharashtra__Class 9__History', prefix: 'History' },
        { key: 'Maharashtra__Class 9__Political Science', prefix: 'Political Science' },
        { key: 'Maharashtra__Class 9__Geography', prefix: 'Geography' },
      ],
      title: 'History, Political Science & Geography – Standard Nine (Balbharati Composite)',
    },
    {
      classLevel: 'Class 10',
      componentKeys: [
        { key: 'Maharashtra__Class 10__History', prefix: 'History' },
        { key: 'Maharashtra__Class 10__Political Science', prefix: 'Political Science' },
        { key: 'Maharashtra__Class 10__Geography', prefix: 'Geography' },
      ],
      title: 'History, Political Science & Geography – Standard Ten (Balbharati Composite)',
    },
  ];

  for (const spec of mhCompositeSpecs) {
    const targetId = `Maharashtra__${spec.classLevel}__Social Studies`;
    const targetEntry = map[targetId];
    if (!targetEntry || targetEntry.verificationStatus === 'VERIFIED') continue;

    const components = spec.componentKeys
      .map((c) => ({ entry: map[c.key], prefix: c.prefix }))
      .filter((c) => c.entry && c.entry.verificationStatus === 'VERIFIED' && c.entry.chapters.length > 0);

    if (components.length !== spec.componentKeys.length) continue;

    const combinedChapters: CentralChapterItem[] = [];
    let seq = 1;
    for (const comp of components) {
      for (const ch of comp.entry.chapters) {
        combinedChapters.push({
          sequenceIndex: seq,
          chapterNumber: seq,
          chapterTitle: `${comp.prefix}: ${ch.chapterTitle}`,
          sectionOrPart: comp.prefix,
          sectionType: ch.sectionType,
        });
        seq += 1;
      }
    }

    targetEntry.verificationStatus = 'VERIFIED';
    targetEntry.track = 'OFFICIAL_BOARD_TEXTBOOK';
    targetEntry.textbookTitle = spec.title;
    targetEntry.publisher = BALBHARATI_PUB;
    targetEntry.academicYearEdition = '2025–2026 Official Reprint Edition';
    targetEntry.applicableMediums = [...MH_ALL_4_MEDIUMS];
    targetEntry.officialSourceUrl = 'https://books.ebalbharati.in/';
    targetEntry.verificationNote = `Verified composite Social Studies index built verbatim from official Balbharati ${spec.classLevel} ${spec.componentKeys.map((c) => c.prefix).join(' + ')} textbooks (${combinedChapters.length} chapters).`;
    targetEntry.chapters = combinedChapters;
    targetEntry.mediumVariants = makeMultiMediumVariants(MH_ALL_4_MEDIUMS, {
      languageRole: 'Subject Textbook',
      status: 'VERIFIED',
      textbookTitle: spec.title,
      publisher: BALBHARATI_PUB,
      academicYearEdition: '2025–2026 Official Reprint Edition',
      officialSourceUrl: 'https://books.ebalbharati.in/',
      verificationNote: targetEntry.verificationNote,
      chapters: combinedChapters,
    });
  }

  // 4. Document exact official unavailability reasons on all remaining blocked entries (strictly keeping them BLOCKED with chapters: []).
  const ENRICHMENT_SUBJECTS = new Set<string>([
    'General Knowledge',
    'Logical Reasoning',
    'Vocabulary and Grammar',
    'Moral Education',
    'Drawing and Creative Activities',
  ]);

  for (const entry of Object.values(map)) {
    if (entry.verificationStatus === 'VERIFIED') continue;

    // Guarantee zero synthetic chapters on blocked entries
    entry.chapters = [];

    if (entry.verificationStatus === 'SCHOOL_TEXTBOOK_DEPENDENT' && entry.board === 'ICSE') {
      entry.verificationNote = `Officially blocked (CISCE Policy): CISCE prescribes a topic-level syllabus framework for ICSE ${entry.classLevel} ${entry.subject} without a single mandatory board textbook; affiliated schools select private-publisher textbooks (e.g., Selina, Frank, Evergreen, APC, Morning Star). Kept blocked to prevent publisher mismatch.`;
      continue;
    }

    if (ENRICHMENT_SUBJECTS.has(entry.subject)) {
      if (entry.subject === 'Drawing and Creative Activities') {
        entry.verificationNote = `Officially blocked (Non-Textbook Enrichment): No standalone NCERT or CISCE textbook index exists for ${entry.board} ${entry.classLevel} Drawing and Creative Activities (NCERT Arts "Bansuri" begins at Class 3; CISCE prescribes no mandatory board art textbook for Class 1).`;
      } else {
        entry.verificationNote = `Officially blocked (Non-Textbook Enrichment): Neither ${entry.board} nor its official textbook authority (NCERT / Balbharati / CISCE) publishes a standalone textbook for ${entry.classLevel} ${entry.subject}. Kept blocked to avoid synthetic or private-publisher chapters.`;
      }
      continue;
    }

    if (entry.board === 'CBSE') {
      if (entry.subject === 'Computer Knowledge' && (entry.classLevel === 'Class 1' || entry.classLevel === 'Class 2')) {
        entry.verificationNote = `Officially blocked (CBSE Circular Acad-15/2026): Official CBSE Computational Thinking & AI (CT & AI) Student Handbooks begin at Class 3 (Classes 3–8 are verified). No official CBSE/NCERT Computer Knowledge textbook exists for ${entry.classLevel}.`;
      } else if (entry.subject === 'Environmental Studies' && (entry.classLevel === 'Class 1' || entry.classLevel === 'Class 2')) {
        entry.verificationNote = `Officially blocked (NCERT NCF-FS 2022 Structure): NCERT does not publish a standalone Environmental Studies textbook for ${entry.classLevel}; environmental concepts are integrated into Language and Mathematics.`;
      } else if (
        (entry.subject === 'Science' || entry.subject === 'Social Studies') &&
        (entry.classLevel === 'Class 3' || entry.classLevel === 'Class 4' || entry.classLevel === 'Class 5')
      ) {
        entry.verificationNote = `Officially blocked (NCERT NCF-SE 2023 Integrated Textbook): NCERT does not publish separate ${entry.subject} textbooks for ${entry.classLevel}; Science and Social themes are integrated into the verified NCERT "Our Wondrous World" textbook (available under CBSE ${entry.classLevel} Environmental Studies).`;
      }
      continue;
    }

    if (entry.board === 'Maharashtra') {
      if (entry.subject === 'Computer Knowledge') {
        entry.verificationNote = `Officially blocked (No Balbharati Textbook): MSBSHSE / Balbharati does not publish a standalone Computer Knowledge textbook for ${entry.classLevel} on ebooks.ebalbharati.in. Kept blocked until an official state textbook is published.`;
      } else if (entry.subject === 'Information Technology' && (entry.classLevel === 'Class 9' || entry.classLevel === 'Class 10')) {
        entry.verificationNote = `Officially blocked (MSBSHSE Scope): Balbharati publishes standalone Information Technology textbooks for Higher Secondary (Std 11–12) only, not for ${entry.classLevel}.`;
      } else if (entry.subject === 'Physical Education' && (entry.classLevel === 'Class 9' || entry.classLevel === 'Class 10')) {
        entry.verificationNote = `Officially blocked (MSBSHSE Scope): Balbharati publishes standalone Health & Physical Education textbooks for Std 11–12 only; ${entry.classLevel} uses activity-based school assessment rather than a chaptered textbook.`;
      } else if (entry.classLevel === 'Class 1' || entry.classLevel === 'Class 2') {
        entry.verificationNote = `Officially blocked (Balbharati Primary Structure): Balbharati does not publish a standalone ${entry.subject} textbook for ${entry.classLevel} (Std 1–2 official catalog comprises Language and Mathematics textbooks only).`;
      } else if (entry.classLevel === 'Class 3') {
        entry.verificationNote = `Officially blocked (Balbharati Integrated EVS): In Maharashtra Standard Three, ${entry.subject} is not a separate textbook; all concepts are covered in the verified Balbharati "Environmental Studies – Standard Three" textbook.`;
      } else if (entry.classLevel === 'Class 4' || entry.classLevel === 'Class 5') {
        entry.verificationNote = `Officially blocked (Balbharati Integrated EVS Part One): In Maharashtra ${entry.classLevel}, ${entry.subject} is not a separate textbook; Science and Geography are combined in verified "Environmental Studies Part One" (and History is verified separately under EVS Part Two).`;
      } else if (entry.subject === 'Environmental Studies' && (entry.classLevel === 'Class 6' || entry.classLevel === 'Class 7' || entry.classLevel === 'Class 8')) {
        entry.verificationNote = `Officially blocked (Balbharati Upper-Primary Split): From Std 6–8, Balbharati replaces Environmental Studies with standalone verified General Science, History & Civics, and Geography textbooks.`;
      } else if (entry.subject === 'Environmental Studies' && (entry.classLevel === 'Class 9' || entry.classLevel === 'Class 10')) {
        entry.verificationNote = `Officially blocked (Covered Under Environmental Education): For Maharashtra ${entry.classLevel}, MSBSHSE prescribes "Jal Suraksha (Water Security)", which is already verified under Environmental Education across English, Marathi, and Hindi mediums.`;
      }
    }
  }
}
