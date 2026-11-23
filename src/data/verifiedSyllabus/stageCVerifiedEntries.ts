import type { InstructionMedium } from '../../types/lessonPlanner';
import type {
  CentralChapterItem,
  CentralMediumVariant,
  CentralVerificationStatus,
} from './centralSyllabusDatabase';

export interface StageCVerifiedEntryDefinition {
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

/**
 * STAGE C OFFICIAL-SOURCE VERIFIED ENTRIES (EXACTLY 32 APPROVED UPDATES)
 * Generated verbatim from stage_c_db_update_preview.json:
 * - 6 Maharashtra English (Classes 1, 2, 3, 4, 5, 7 — Balbharati + My English Book)
 * - 6 CBSE Computer Knowledge (Classes 3–8 — Official CBSE 2026–27 CT & AI Handbooks)
 * - 17 Maharashtra Devanagari (Marathi C1–9 & Hindi C1–8 — SHA-256 + 180 DPI verified)
 * - 2 Maharashtra Environmental Education (Jal Suraksha C9–10 — English + Marathi verified)
 * - 1 CBSE Class 4 Hindi (NCERT Veena Grade 4 — dhve1ps.pdf SHA-256 verified)
 *
 * All unverified medium variants remain explicitly PENDING_VERIFICATION with chapters: [].
 * All 42 structural mappings and 192 school/admin-dependent entries are untouched.
 */
export const STAGE_C_VERIFIED_ENTRIES_MAP: Readonly<Record<string, StageCVerifiedEntryDefinition>> =
  Object.freeze({
  "Maharashtra__Class 1__English": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "१ ली बालभारती इंग्रजी – English Balbharati Class 1 (Item 103050001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2025 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103050001.pdf",
    "verificationNote": "Verified BOTH First-Language English Balbharati (103050001, 44 ch, SHA-256 3b9990231211...) AND Second/Third-Language My English Book (103050035, 40 ch, SHA-256 ce2d9af62b72...).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "1.1 My First Day",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "1.2 Clap your hands.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "1.3 I know my alphabet.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "1.4 Let us read.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "1.5 Fun with Special Letters",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "1.6 The Rainbow",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "1.7 Meet my family.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "1.8 Let us know each other.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "1.9 Everybody has a name.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "1.10 My Daily Routine",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "2.1 It’s Time to Play",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "2.2 Avni’s Visit to a Park",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "2.3 In the Classroom",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "2.4 My House",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "2.5 Weather",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "2.6 Magic Words",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "2.7 Things I Do",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "2.8 Classroom Library",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "2.9 Our Vehicles",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "2.10 Himani and the Ladybug",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "2.11 My Flower",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "2.12 Festivals",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "3.1 Opposites",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "3.2 Suyog makes friends.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "3.3 The Fox and the Crow",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "3.4 Books are my best friends.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "3.5 Open a book.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "3.6 Raghu goes to the market.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "3.7 The Squirrel",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "3.8 Alia falls sick.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "3.9 The Ant and the Grasshopper",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "3.10 Minku, the Monkey",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "3.11 My Kitty Cat",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 34,
        "chapterNumber": 34,
        "chapterTitle": "4.1 A boy went walking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 35,
        "chapterNumber": 35,
        "chapterTitle": "4.2 Harry, the Hippo",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 36,
        "chapterNumber": 36,
        "chapterTitle": "4.3 Singing is Fun!",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 37,
        "chapterNumber": 37,
        "chapterTitle": "4.4 A Walk in Nature",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 38,
        "chapterNumber": 38,
        "chapterTitle": "4.5 The Elephant and the Ants",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 39,
        "chapterNumber": 39,
        "chapterTitle": "4.6 Off to Mars!",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 40,
        "chapterNumber": 40,
        "chapterTitle": "4.7 Honest Abhi",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 41,
        "chapterNumber": 41,
        "chapterTitle": "4.8 A Joyful Day",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 42,
        "chapterNumber": 42,
        "chapterTitle": "4.9 A Gift for Mother",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 43,
        "chapterNumber": 43,
        "chapterTitle": "4.10 Cookout",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 44,
        "chapterNumber": 44,
        "chapterTitle": "4.11 Summer Holidays",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली बालभारती इंग्रजी – English Balbharati Class 1 (Item 103050001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103050001.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (103050001, SHA-256 3b9990231211f75a6a0cdd962303c00f3d23542b38d2dd674a847d627c45d102, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 My First Day",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Clap your hands.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 I know my alphabet.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Let us read.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Fun with Special Letters",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 The Rainbow",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Meet my family.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Let us know each other.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Everybody has a name.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 My Daily Routine",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 It’s Time to Play",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Avni’s Visit to a Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 In the Classroom",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 My House",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 Weather",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 Magic Words",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 Things I Do",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 Classroom Library",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Our Vehicles",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 Himani and the Ladybug",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "2.11 My Flower",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "2.12 Festivals",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.1 Opposites",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.2 Suyog makes friends.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.3 The Fox and the Crow",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.4 Books are my best friends.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.5 Open a book.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.6 Raghu goes to the market.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.7 The Squirrel",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.8 Alia falls sick.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "3.9 The Ant and the Grasshopper",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "3.10 Minku, the Monkey",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "3.11 My Kitty Cat",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.1 A boy went walking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.2 Harry, the Hippo",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.3 Singing is Fun!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.4 A Walk in Nature",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.5 The Elephant and the Ants",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.6 Off to Mars!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.7 Honest Abhi",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "4.8 A Joyful Day",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "4.9 A Gift for Mother",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "4.10 Cookout",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "4.11 Summer Holidays",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली माय इंग्लिश बुक इंग्रजी – My English Book Class 1 (Item 103050035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103050035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (103050035, SHA-256 ce2d9af62b721421c467242b2c2f16629b706d6e97158e4540ca1f51667952ed, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Body Body Pop Pop",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 What is your name?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 My Home",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Clap your hands.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Chit Chat",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Fun with Sounds (b-c-p-t-a)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 What can you do?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 My Classroom",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Fun with Sounds (d-f-m-n-e)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Tip-Tap, Tip-Tap",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "1.11 We want rain.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.1 Vegetables",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.2 Fingers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.3 In the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.4 Animals I Know",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.5 Fun with Sounds (h-l-r-s-i)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.6 Birds can fly",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.7 Birthday Party",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.8 Fun with Sounds (g-j-k-q-o)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.9 Water Bell",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "2.10 Who ate the butter?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.1 Traffic Signals",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.2 Vehicles",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.3 Lunch Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.4 Fun with Sounds (v-w-x-y-z-u)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.5 Alphabet Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.6 Capital Letters-Small Letters",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.7 Days of the Week",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.8 Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.9 Numbers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "3.10 The Ant and the Pigeon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.1 Months of the Year",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.2 Greetings",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.3 After My Bath",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.4 Chit Chat",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.5 Lost and Found",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.6 My Kitchen",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.7 Our Community Helpers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.8 The Magic Fish",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.9 Thank You God",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली माय इंग्लिश बुक इंग्रजी – My English Book Class 1 (Item 103050035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103050035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (103050035, SHA-256 ce2d9af62b721421c467242b2c2f16629b706d6e97158e4540ca1f51667952ed, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Body Body Pop Pop",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 What is your name?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 My Home",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Clap your hands.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Chit Chat",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Fun with Sounds (b-c-p-t-a)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 What can you do?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 My Classroom",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Fun with Sounds (d-f-m-n-e)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Tip-Tap, Tip-Tap",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "1.11 We want rain.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.1 Vegetables",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.2 Fingers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.3 In the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.4 Animals I Know",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.5 Fun with Sounds (h-l-r-s-i)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.6 Birds can fly",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.7 Birthday Party",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.8 Fun with Sounds (g-j-k-q-o)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.9 Water Bell",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "2.10 Who ate the butter?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.1 Traffic Signals",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.2 Vehicles",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.3 Lunch Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.4 Fun with Sounds (v-w-x-y-z-u)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.5 Alphabet Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.6 Capital Letters-Small Letters",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.7 Days of the Week",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.8 Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.9 Numbers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "3.10 The Ant and the Pigeon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.1 Months of the Year",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.2 Greetings",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.3 After My Bath",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.4 Chit Chat",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.5 Lost and Found",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.6 My Kitchen",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.7 Our Community Helpers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.8 The Magic Fish",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.9 Thank You God",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली माय इंग्लिश बुक इंग्रजी – My English Book Class 1 (Item 103050035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103050035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (103050035, SHA-256 ce2d9af62b721421c467242b2c2f16629b706d6e97158e4540ca1f51667952ed, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Body Body Pop Pop",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 What is your name?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 My Home",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Clap your hands.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Chit Chat",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Fun with Sounds (b-c-p-t-a)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 What can you do?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 My Classroom",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Fun with Sounds (d-f-m-n-e)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Tip-Tap, Tip-Tap",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "1.11 We want rain.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.1 Vegetables",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.2 Fingers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.3 In the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.4 Animals I Know",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.5 Fun with Sounds (h-l-r-s-i)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.6 Birds can fly",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.7 Birthday Party",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.8 Fun with Sounds (g-j-k-q-o)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.9 Water Bell",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "2.10 Who ate the butter?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.1 Traffic Signals",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.2 Vehicles",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.3 Lunch Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.4 Fun with Sounds (v-w-x-y-z-u)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.5 Alphabet Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.6 Capital Letters-Small Letters",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.7 Days of the Week",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.8 Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.9 Numbers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "3.10 The Ant and the Pigeon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.1 Months of the Year",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.2 Greetings",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.3 After My Bath",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.4 Chit Chat",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.5 Lost and Found",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.6 My Kitchen",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.7 Our Community Helpers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.8 The Magic Fish",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.9 Thank You God",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 2__English": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "२ री बालभारती इंग्रजी – English Balbharati Class 2 (Item 203060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203060001.pdf",
    "verificationNote": "Verified BOTH First-Language English Balbharati (203060001, 40 ch, SHA-256 2c3f091b0a4e...) AND Second/Third-Language My English Book (203060035, 44 ch, SHA-256 5ce6f51eb298...).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "1.1 Holidays are Over",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "1.2 Back to School",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "1.3 Rinky Goes to School",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "1.4 Wake up Time",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "1.5 Flyer",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "1.6 Cleanliness is Next to Godliness",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "1.7 Akbar Meets Birbal",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "1.8 How Hitesh Spends his Day",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "1.9 Terry and Simi",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "1.10 Minni Crosses the River",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "2.1 Raindrops",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "2.2 The Colourful Handkerchief",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "2.3 Small Actions Count",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "2.4 My India",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "2.5 Veggie Delight",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "2.6 A Helping Hand",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "2.7 Dr. A. P. J. Abdul Kalam’s Childhood",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "2.8 Under the Sea",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "2.9 The Dog and the Big Fish",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "2.10 How to Use a Dictionary",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "3.1 Imagine",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "3.2 Smita and Tanvi",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "3.3 News Time",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "3.4 Be Smart with Smartphone",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "3.5 Tall Trees",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "3.6 I am a Writer",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "3.7 A Visit to Tarkarli",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "3.8 My Wiggly Tooth",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "3.9 The Mango Tree and the Shrubs",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "3.10 We All are One",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "4.1 Pencil Magic",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "4.2 Book Care",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "4.3 Abu Ali Counts his Donkeys",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 34,
        "chapterNumber": 34,
        "chapterTitle": "4.4 Reduce, Reuse, Recycle",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 35,
        "chapterNumber": 35,
        "chapterTitle": "4.5 The Clean-up Contest",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 36,
        "chapterNumber": 36,
        "chapterTitle": "4.6 My Friend",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 37,
        "chapterNumber": 37,
        "chapterTitle": "4.7 The Greedy Bird",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 38,
        "chapterNumber": 38,
        "chapterTitle": "4.8 The Wise Tortoise",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 39,
        "chapterNumber": 39,
        "chapterTitle": "4.9 Games in My Land",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 40,
        "chapterNumber": 40,
        "chapterTitle": "4.10 The Giant of Sonpur",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री बालभारती इंग्रजी – English Balbharati Class 2 (Item 203060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203060001.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (203060001, SHA-256 2c3f091b0a4ebadca38567f4f74182e78f6ec180463f1cca90da0a501b7f3539, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Holidays are Over",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Back to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Rinky Goes to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Wake up Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Flyer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Cleanliness is Next to Godliness",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Akbar Meets Birbal",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 How Hitesh Spends his Day",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Terry and Simi",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Minni Crosses the River",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Raindrops",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 The Colourful Handkerchief",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Small Actions Count",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 My India",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 Veggie Delight",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 A Helping Hand",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 Dr. A. P. J. Abdul Kalam’s Childhood",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 Under the Sea",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 The Dog and the Big Fish",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 How to Use a Dictionary",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 Imagine",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Smita and Tanvi",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 News Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 Be Smart with Smartphone",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 Tall Trees",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 I am a Writer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 A Visit to Tarkarli",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 My Wiggly Tooth",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 The Mango Tree and the Shrubs",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 We All are One",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Pencil Magic",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 Book Care",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Abu Ali Counts his Donkeys",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 Reduce, Reuse, Recycle",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 The Clean-up Contest",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 My Friend",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 The Greedy Bird",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 The Wise Tortoise",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Games in My Land",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 The Giant of Sonpur",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री माय इंग्लिश बुक – My English Book Class 2 (Item 203060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (203060035, SHA-256 5ce6f51eb298d1aa308bb49397df950d4f4adf8b86ecc8d9163ecd59865291e5, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Welcome to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Back to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Let’s Play the Game",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 World of the Alphabet",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 A Feast in the Forest",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Big ‘A’... Small ‘a’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Fruit Salad",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Number Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Introduce Yourself",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Sounds - I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "1.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.1 It’s Raining...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.2 What the Weather Says?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.3 A Visit to a Farm",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.4 In the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.5 A Joyful Trip",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.6 Music Store",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.7 The Story of the Flute",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.8 Tring-Tring",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.9 Origami",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "2.10 Sounds - II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "2.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.1 Where is it?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.2 Our Calendar",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.3 Treasure Hunt",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.4 India",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.5 Clock and Me",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.6 Birthday Celebration",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.7 My Robot",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.8 Genia Vs. Mr. Germ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "3.9 Talking Marks",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "3.10 Sounds - III",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "3.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.1 Read a Book",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.2 In the Market",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.3 Good Habits - Bad Habits",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.4 Five Senses",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.5 Magic Words",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.6 Rahi : The Girl Who Never Gives up!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.7 Mother Duck",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "4.8 Story Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "4.9 Grow a Little Plant",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "4.10 Alphabet Train",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "4.11 Open the Treasure",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री माय इंग्लिश बुक – My English Book Class 2 (Item 203060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (203060035, SHA-256 5ce6f51eb298d1aa308bb49397df950d4f4adf8b86ecc8d9163ecd59865291e5, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Welcome to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Back to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Let’s Play the Game",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 World of the Alphabet",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 A Feast in the Forest",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Big ‘A’... Small ‘a’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Fruit Salad",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Number Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Introduce Yourself",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Sounds - I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "1.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.1 It’s Raining...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.2 What the Weather Says?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.3 A Visit to a Farm",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.4 In the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.5 A Joyful Trip",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.6 Music Store",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.7 The Story of the Flute",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.8 Tring-Tring",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.9 Origami",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "2.10 Sounds - II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "2.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.1 Where is it?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.2 Our Calendar",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.3 Treasure Hunt",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.4 India",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.5 Clock and Me",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.6 Birthday Celebration",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.7 My Robot",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.8 Genia Vs. Mr. Germ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "3.9 Talking Marks",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "3.10 Sounds - III",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "3.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.1 Read a Book",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.2 In the Market",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.3 Good Habits - Bad Habits",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.4 Five Senses",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.5 Magic Words",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.6 Rahi : The Girl Who Never Gives up!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.7 Mother Duck",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "4.8 Story Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "4.9 Grow a Little Plant",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "4.10 Alphabet Train",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "4.11 Open the Treasure",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री माय इंग्लिश बुक – My English Book Class 2 (Item 203060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (203060035, SHA-256 5ce6f51eb298d1aa308bb49397df950d4f4adf8b86ecc8d9163ecd59865291e5, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Welcome to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Back to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Let’s Play the Game",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 World of the Alphabet",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 A Feast in the Forest",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Big ‘A’... Small ‘a’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Fruit Salad",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Number Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Introduce Yourself",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Sounds - I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "1.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.1 It’s Raining...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.2 What the Weather Says?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.3 A Visit to a Farm",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.4 In the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.5 A Joyful Trip",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.6 Music Store",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.7 The Story of the Flute",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.8 Tring-Tring",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.9 Origami",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "2.10 Sounds - II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "2.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.1 Where is it?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.2 Our Calendar",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.3 Treasure Hunt",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.4 India",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.5 Clock and Me",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.6 Birthday Celebration",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.7 My Robot",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.8 Genia Vs. Mr. Germ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "3.9 Talking Marks",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "3.10 Sounds - III",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "3.11 Open the Treasure",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.1 Read a Book",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.2 In the Market",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.3 Good Habits - Bad Habits",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.4 Five Senses",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.5 Magic Words",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.6 Rahi : The Girl Who Never Gives up!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.7 Mother Duck",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "4.8 Story Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "4.9 Grow a Little Plant",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "4.10 Alphabet Train",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "4.11 Open the Treasure",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 3__English": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "३ री बालभारती इंग्रजी – English Balbharati Class 3 (Item 303060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303060001.pdf",
    "verificationNote": "Verified BOTH First-Language English Balbharati (303060001, 40 ch, SHA-256 90be01ff1d56...) AND Second/Third-Language My English Book (303060035, 40 ch, SHA-256 8cbdd519e2ff...).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "1.1 Rain in Summer",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "1.2 Welcome Day",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "1.3 The Seed",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "1.4 The Mango Tree",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "1.5 Magical Water",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "1.6 Attentive Ant",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "1.7 Helping a Classmate",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "1.8 Let’s Go on a Picnic",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "1.9 I am a Weaver Bird",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "1.10 Flavours of Friendship",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "2.1 Song of Week Days",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "2.2 Weather",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "2.3 Helping Siblings",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "2.4 The Tired Mobile Phone",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "2.5 Who am I?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "2.6 Five Little Senses",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "2.7 A Drop of Kindness",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "2.8 Struggler : Bhagyashree Jadhav",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "2.9 Shravan Pournima",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "2.10 The City of Dreams",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "3.1 My Little Friends",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "3.2 The Page from a Diary",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "3.3 The Talking Vegetable",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "3.4 The Monkey who Wore Glasses",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "3.5 Ajanta Caves - A Treasure of Ancient Indian Art",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "3.6 The Magic of Map",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "3.7 Work on Time",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "3.8 We are the Children",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "3.9 Cleanliness Campaign",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "3.10 Super Safety Squad",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "4.1 Good Neighbours",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "4.2 The Brave Mother",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "4.3 Aaji’s Batwa",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 34,
        "chapterNumber": 34,
        "chapterTitle": "4.4 Maru Mahotsav - The Desert Comes Alive",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 35,
        "chapterNumber": 35,
        "chapterTitle": "4.5 Say “Thank You”",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 36,
        "chapterNumber": 36,
        "chapterTitle": "4.6 Welcome Speech",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 37,
        "chapterNumber": 37,
        "chapterTitle": "4.7 Aryaveer Meets an Astronaut",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 38,
        "chapterNumber": 38,
        "chapterTitle": "4.8 The Majestic Peacock- India’s Pride",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 39,
        "chapterNumber": 39,
        "chapterTitle": "4.9 The Third Brother’s Share",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 40,
        "chapterNumber": 40,
        "chapterTitle": "4.10 Play in May",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री बालभारती इंग्रजी – English Balbharati Class 3 (Item 303060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303060001.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (303060001, SHA-256 90be01ff1d567e22e3ab133c2d0f2ef308af166fbc2ac3786572b0a743433b40, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Rain in Summer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Welcome Day",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 The Seed",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 The Mango Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Magical Water",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Attentive Ant",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Helping a Classmate",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Let’s Go on a Picnic",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 I am a Weaver Bird",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Flavours of Friendship",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Song of Week Days",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Weather",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Helping Siblings",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 The Tired Mobile Phone",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 Who am I?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 Five Little Senses",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 A Drop of Kindness",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 Struggler : Bhagyashree Jadhav",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Shravan Pournima",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 The City of Dreams",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 My Little Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 The Page from a Diary",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 The Talking Vegetable",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 The Monkey who Wore Glasses",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 Ajanta Caves - A Treasure of Ancient Indian Art",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 The Magic of Map",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 Work on Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 We are the Children",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 Cleanliness Campaign",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 Super Safety Squad",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Good Neighbours",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 The Brave Mother",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Aaji’s Batwa",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 Maru Mahotsav - The Desert Comes Alive",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 Say “Thank You”",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 Welcome Speech",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 Aryaveer Meets an Astronaut",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 The Majestic Peacock- India’s Pride",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 The Third Brother’s Share",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 Play in May",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री माय इंग्लिश बुक – My English Book Class 3 (Item 303060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (303060035, SHA-256 8cbdd519e2ff8fd5ee2f9f3b8ba301a82a4c7b98e4d13a733222f694e693008a, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 We are Happy Everyday",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Word Family - I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 The Picnic",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Twinkle, Twinkle",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 The First Aid Box",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Flying Man",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 A Happy Day in the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Getting Ready",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Go, Go, Go!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 In the Bus and Word Family - II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Coconut Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Narali Pournima",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Word Family - III",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 I am Growing Up",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 My Friend, the Clock",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 Library",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 Punctuation Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 Hide and Seek",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Word Family - IV",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 Diwali, the Festival of Lights",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 Tiranga",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Word Family - V",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 Kind Radha",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 Butterfly",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 The Ant and the Grasshopper",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 Word Family - VI",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 Technology Around Us",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 Sant Gora Kumbhar",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 Sh... sh... sh...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 Tarabai Modak",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Colour Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 Source of Energy",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Word Family - VII",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 A Trip to the Moon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 Cloud",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 Tej, The Tiger",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 My Profile",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 Money cannot Buy Everything",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Stay Calm and Smile",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 Word Family - VIII",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री माय इंग्लिश बुक – My English Book Class 3 (Item 303060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (303060035, SHA-256 8cbdd519e2ff8fd5ee2f9f3b8ba301a82a4c7b98e4d13a733222f694e693008a, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 We are Happy Everyday",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Word Family - I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 The Picnic",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Twinkle, Twinkle",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 The First Aid Box",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Flying Man",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 A Happy Day in the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Getting Ready",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Go, Go, Go!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 In the Bus and Word Family - II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Coconut Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Narali Pournima",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Word Family - III",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 I am Growing Up",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 My Friend, the Clock",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 Library",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 Punctuation Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 Hide and Seek",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Word Family - IV",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 Diwali, the Festival of Lights",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 Tiranga",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Word Family - V",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 Kind Radha",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 Butterfly",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 The Ant and the Grasshopper",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 Word Family - VI",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 Technology Around Us",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 Sant Gora Kumbhar",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 Sh... sh... sh...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 Tarabai Modak",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Colour Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 Source of Energy",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Word Family - VII",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 A Trip to the Moon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 Cloud",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 Tej, The Tiger",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 My Profile",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 Money cannot Buy Everything",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Stay Calm and Smile",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 Word Family - VIII",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री माय इंग्लिश बुक – My English Book Class 3 (Item 303060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (303060035, SHA-256 8cbdd519e2ff8fd5ee2f9f3b8ba301a82a4c7b98e4d13a733222f694e693008a, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 We are Happy Everyday",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Word Family - I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 The Picnic",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Twinkle, Twinkle",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 The First Aid Box",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Flying Man",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 A Happy Day in the Park",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Getting Ready",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Go, Go, Go!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 In the Bus and Word Family - II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Coconut Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Narali Pournima",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Word Family - III",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 I am Growing Up",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 My Friend, the Clock",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 Library",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 Punctuation Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 Hide and Seek",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Word Family - IV",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 Diwali, the Festival of Lights",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 Tiranga",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Word Family - V",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 Kind Radha",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 Butterfly",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 The Ant and the Grasshopper",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 Word Family - VI",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 Technology Around Us",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 Sant Gora Kumbhar",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 Sh... sh... sh...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 Tarabai Modak",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Colour Song",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 Source of Energy",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Word Family - VII",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 A Trip to the Moon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 Cloud",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 Tej, The Tiger",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 My Profile",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 Money cannot Buy Everything",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Stay Calm and Smile",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 Word Family - VIII",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 4__English": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "४ थी बालभारती इंग्रजी – English Balbharati Class 4 (Item 403060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403060001.pdf",
    "verificationNote": "Verified BOTH First-Language English Balbharati (403060001, 40 ch, SHA-256 9b9647bd4b90...) AND Second/Third-Language My English Book (403060035, 40 ch, SHA-256 a4116f9e9cd2...).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "1.1 Rainbow after Rain",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "1.2 Babbling Art",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "1.3 Gaju, the Buffalo",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "1.4 A Little Raindrop’s Story",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "1.5 Be a Chef (Part-1)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "1.6 The Butterfly",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "1.7 The Hungry Dustbin",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "1.8 Welcome Speech",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "1.9 What’s in the Pot?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "1.10 Riddles",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "2.1 The Sun",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "2.2 Siya and Mini",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "2.3 An Interview of a Farmer",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "2.4 Thank You, Bull!",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "2.5 Shekaru - Indian Giant Squirrel",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "2.6 My Shadow",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "2.7 A Visit to the Rainbow Crayon Factory",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "2.8 Chess Master - Divya Deshmukh",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "2.9 A Letter to My Friend",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "2.10 A Glass of Milk",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "3.1 I use my Brain",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "3.2 Be a Chef (Part-2)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "3.3 Family Trip",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "3.4 Holiday …. Oh! No, No",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "3.5 The Smart Helpers",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "3.6 Grandmother",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "3.7 Two Doctors",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "3.8 My Dream",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "3.9 The Story of a Letter",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "3.10 Ahilyabai Holkar : A Great Woman Leader",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "4.1 She can do, He can do",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "4.2 A Scientist with a Curious Mind",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "4.3 Sound Knowledge",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 34,
        "chapterNumber": 34,
        "chapterTitle": "4.4 Be a Writer",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 35,
        "chapterNumber": 35,
        "chapterTitle": "4.5 The Fruits of Hard Labour",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 36,
        "chapterNumber": 36,
        "chapterTitle": "4.6 Garden Walk",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 37,
        "chapterNumber": 37,
        "chapterTitle": "4.7 Football - My Journey on the Field",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 38,
        "chapterNumber": 38,
        "chapterTitle": "4.8 Lohagad - The Pride of Sahyadri",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 39,
        "chapterNumber": 39,
        "chapterTitle": "4.9 Why the Sea is Salty?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 40,
        "chapterNumber": 40,
        "chapterTitle": "4.10 Chimiaaya’s Baskets",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी बालभारती इंग्रजी – English Balbharati Class 4 (Item 403060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403060001.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (403060001, SHA-256 9b9647bd4b90edbc9d20a25c36907e90a6e567cac9f8625d11b44e57de20645b, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Rainbow after Rain",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Babbling Art",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Gaju, the Buffalo",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 A Little Raindrop’s Story",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Be a Chef (Part-1)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 The Butterfly",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 The Hungry Dustbin",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 Welcome Speech",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 What’s in the Pot?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 Riddles",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 The Sun",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Siya and Mini",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 An Interview of a Farmer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 Thank You, Bull!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 Shekaru - Indian Giant Squirrel",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 My Shadow",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 A Visit to the Rainbow Crayon Factory",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 Chess Master - Divya Deshmukh",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 A Letter to My Friend",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 A Glass of Milk",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 I use my Brain",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Be a Chef (Part-2)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 Family Trip",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 Holiday …. Oh! No, No",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 The Smart Helpers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 Grandmother",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 Two Doctors",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 My Dream",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 The Story of a Letter",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 Ahilyabai Holkar : A Great Woman Leader",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 She can do, He can do",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 A Scientist with a Curious Mind",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Sound Knowledge",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 Be a Writer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 The Fruits of Hard Labour",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 Garden Walk",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 Football - My Journey on the Field",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 Lohagad - The Pride of Sahyadri",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Why the Sea is Salty?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 Chimiaaya’s Baskets",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी माय इंग्लिश बुक – My English Book Class 4 (Item 403060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (403060035, SHA-256 a4116f9e9cd2ca7a8fa1afc79482e348088d958a40b8461240555f060971aff2, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Back to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Conversation Starters",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 The Clever Answer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Dhanraj Pillay",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Honesty Builds Trust",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Fun With A ctions",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Good Manners",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 The Honey Village",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Sant Gadge Maharaj",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Catch a Little Rhyme",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Talking to Raghu Kaka",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Maharashtra Day",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 Teddy at the Bus Stop",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 From the Sugarcane to Sweet Gold",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 We Say, Thank You",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 The Giant Panda",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 True Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Eat Healthy, Stay Better !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 Wheat Jowar and Bajra Grow",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Our Flying Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 I am Indian First",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 The Smart Traveller",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 Yoga",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 Let’s Fly in an Aeroplane",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 The Warli Art and Culture",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 The Kite",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 A Windy Discovery",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Our Smart Village",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 The Giant Radish",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Animal Fair",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 Mindset",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 We are One - The Rainbow Story",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 The Encyclopaedia",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 Civic Sense",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 Rose",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Saying ‘No’ to Strangers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 My Word Family",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी माय इंग्लिश बुक – My English Book Class 4 (Item 403060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (403060035, SHA-256 a4116f9e9cd2ca7a8fa1afc79482e348088d958a40b8461240555f060971aff2, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Back to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Conversation Starters",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 The Clever Answer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Dhanraj Pillay",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Honesty Builds Trust",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Fun With A ctions",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Good Manners",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 The Honey Village",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Sant Gadge Maharaj",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Catch a Little Rhyme",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Talking to Raghu Kaka",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Maharashtra Day",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 Teddy at the Bus Stop",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 From the Sugarcane to Sweet Gold",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 We Say, Thank You",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 The Giant Panda",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 True Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Eat Healthy, Stay Better !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 Wheat Jowar and Bajra Grow",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Our Flying Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 I am Indian First",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 The Smart Traveller",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 Yoga",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 Let’s Fly in an Aeroplane",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 The Warli Art and Culture",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 The Kite",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 A Windy Discovery",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Our Smart Village",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 The Giant Radish",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Animal Fair",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 Mindset",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 We are One - The Rainbow Story",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 The Encyclopaedia",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 Civic Sense",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 Rose",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Saying ‘No’ to Strangers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 My Word Family",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी माय इंग्लिश बुक – My English Book Class 4 (Item 403060035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403060035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (403060035, SHA-256 a4116f9e9cd2ca7a8fa1afc79482e348088d958a40b8461240555f060971aff2, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Back to School",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Conversation Starters",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 The Clever Answer",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Dhanraj Pillay",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Honesty Builds Trust",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 Fun With A ctions",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "1.7 Good Manners",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "1.8 The Honey Village",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "1.9 Sant Gadge Maharaj",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "1.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.1 Catch a Little Rhyme",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.2 Talking to Raghu Kaka",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.3 Maharashtra Day",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "2.4 Teddy at the Bus Stop",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "2.5 From the Sugarcane to Sweet Gold",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "2.6 We Say, Thank You",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "2.7 The Giant Panda",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "2.8 True Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "2.9 Eat Healthy, Stay Better !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "2.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "3.1 Wheat Jowar and Bajra Grow",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "3.2 Our Flying Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "3.3 I am Indian First",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "3.4 The Smart Traveller",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "3.5 Yoga",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "3.6 Let’s Fly in an Aeroplane",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "3.7 The Warli Art and Culture",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "3.8 The Kite",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "3.9 A Windy Discovery",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "3.10 My Word Family",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "4.1 Our Smart Village",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "4.2 The Giant Radish",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "4.3 Animal Fair",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "4.4 Mindset",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "4.5 We are One - The Rainbow Story",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "4.6 The Encyclopaedia",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "4.7 Civic Sense",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "4.8 Rose",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "4.9 Saying ‘No’ to Strangers",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "4.10 My Word Family",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 5__English": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "५ वी बालभारती इंग्रजी – English Balbharati Class 5 (Item 503020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "Latest year 2015 (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/503020001.pdf",
    "verificationNote": "Verified BOTH First-Language English Balbharati (503020001, 33 ch, SHA-256 369eb7e63ef4...) AND Second/Third-Language My English Book (501020035, 49 ch, SHA-256 d04918620f65...).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "What a Bird Thought",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "Daydreams",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "Be a Good Listener",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Strawberries",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "The Twelve Months",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Announcements",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Major Dhyan Chand",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "Peer Profile",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "The Triantiwontigongolope",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Three Sacks of Rice",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "Be a Good Speaker",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Count your Garden",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "The Adventures of Gulliver",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "A Lesson for All",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "Bird Bath",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "Write your own Story",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "On the Water",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "Weeds in the Garden",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "Be a Good Host and Guest",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "Only One Mother",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "The Journey to the Great Oz",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "A Book Review",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "Write your own Poem",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "Senses Alert",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "The Man in the Moon",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "Water in the Well",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "The Legend of Marathon",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "All about Money",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "A Lark",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "Be a Netizen",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "Give your Mind a Workout !",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "Helen Keller",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "Rangoli",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी बालभारती इंग्रजी – English Balbharati Class 5 (Item 503020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2015 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/503020001.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (503020001, SHA-256 369eb7e63ef44be6d942052e4ebcaac2f25cbd97e00d67ca2472c3ad6e065baa, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "What a Bird Thought",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "Daydreams",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "Be a Good Listener",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Strawberries",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "The Twelve Months",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Announcements",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Major Dhyan Chand",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Peer Profile",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "The Triantiwontigongolope",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Three Sacks of Rice",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Be a Good Speaker",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Count your Garden",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "The Adventures of Gulliver",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "A Lesson for All",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Bird Bath",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "Write your own Story",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "On the Water",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "Weeds in the Garden",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "Be a Good Host and Guest",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "Only One Mother",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "The Journey to the Great Oz",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "A Book Review",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "Write your own Poem",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "Senses Alert",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "The Man in the Moon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "Water in the Well",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "The Legend of Marathon",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "All about Money",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "A Lark",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "Be a Netizen",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "Give your Mind a Workout !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "Helen Keller",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "Rangoli",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी माय इंग्लिश बुक मराठी – My English Book Class 5 (Item 501020035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2012 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (501020035, SHA-256 d04918620f65e63b076e0ec2867ab7e0841762c1b977d75876f7e2d37a446aab, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Songs and Greetings",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "‘A’ to ‘Z’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "We Speak English",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Number Work",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "B-I-N-G-O",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Vanishing Sentences",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Talking about Things - 1",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Sentence Race",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Say ‘Yes’ or ‘No’ !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Talking about Things - 2",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Action Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Words We Know",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Cuckoo",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "The Little Red Hen",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Just now !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "True Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "Keeping Quiet",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "Interviews",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "Friendly Plans",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "More than a Hundred Words",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "Trains",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "The Little Babul Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "Lots of Things Together",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "Know your Body",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "Alyonushka",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "One Thing at a Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "Pen-friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "How Creatures Move",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "Location Games",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "Collection of English Texts",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "Shapes and Maps",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "Tock, Tock, Tong, Tong,",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "On the Time-line",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "I speak, I say, I talk.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "Science Fun-fair",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "The Wind",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "‘Go !’ and ‘Come !’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "The Golden Touch",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "Where Go the Boats ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "Our Solar System",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "Guess what !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "A Book Speaks",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "George Washington Carver",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "Question Bank",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 45,
            "chapterNumber": 45,
            "chapterTitle": "Dice for your Game",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 46,
            "chapterNumber": 46,
            "chapterTitle": "All about Money",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 47,
            "chapterNumber": 47,
            "chapterTitle": "Only One Mother",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 48,
            "chapterNumber": 48,
            "chapterTitle": "At the Market",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 49,
            "chapterNumber": 49,
            "chapterTitle": "He Knows the Workman",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी माय इंग्लिश बुक मराठी – My English Book Class 5 (Item 501020035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2012 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (501020035, SHA-256 d04918620f65e63b076e0ec2867ab7e0841762c1b977d75876f7e2d37a446aab, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Songs and Greetings",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "‘A’ to ‘Z’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "We Speak English",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Number Work",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "B-I-N-G-O",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Vanishing Sentences",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Talking about Things - 1",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Sentence Race",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Say ‘Yes’ or ‘No’ !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Talking about Things - 2",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Action Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Words We Know",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Cuckoo",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "The Little Red Hen",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Just now !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "True Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "Keeping Quiet",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "Interviews",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "Friendly Plans",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "More than a Hundred Words",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "Trains",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "The Little Babul Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "Lots of Things Together",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "Know your Body",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "Alyonushka",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "One Thing at a Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "Pen-friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "How Creatures Move",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "Location Games",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "Collection of English Texts",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "Shapes and Maps",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "Tock, Tock, Tong, Tong,",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "On the Time-line",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "I speak, I say, I talk.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "Science Fun-fair",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "The Wind",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "‘Go !’ and ‘Come !’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "The Golden Touch",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "Where Go the Boats ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "Our Solar System",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "Guess what !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "A Book Speaks",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "George Washington Carver",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "Question Bank",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 45,
            "chapterNumber": 45,
            "chapterTitle": "Dice for your Game",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 46,
            "chapterNumber": 46,
            "chapterTitle": "All about Money",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 47,
            "chapterNumber": 47,
            "chapterTitle": "Only One Mother",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 48,
            "chapterNumber": 48,
            "chapterTitle": "At the Market",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 49,
            "chapterNumber": 49,
            "chapterTitle": "He Knows the Workman",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी माय इंग्लिश बुक मराठी – My English Book Class 5 (Item 501020035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2012 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (501020035, SHA-256 d04918620f65e63b076e0ec2867ab7e0841762c1b977d75876f7e2d37a446aab, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Songs and Greetings",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "‘A’ to ‘Z’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "We Speak English",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Number Work",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "B-I-N-G-O",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Vanishing Sentences",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Talking about Things - 1",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Sentence Race",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Say ‘Yes’ or ‘No’ !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Talking about Things - 2",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Action Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Words We Know",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Cuckoo",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "The Little Red Hen",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Just now !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "True Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "Keeping Quiet",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "Interviews",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "Friendly Plans",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "More than a Hundred Words",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "Trains",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "The Little Babul Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "Lots of Things Together",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "Know your Body",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "Alyonushka",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "One Thing at a Time",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "Pen-friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "How Creatures Move",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "Location Games",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "Collection of English Texts",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "Shapes and Maps",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "Tock, Tock, Tong, Tong,",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "On the Time-line",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "I speak, I say, I talk.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "Science Fun-fair",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "The Wind",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "‘Go !’ and ‘Come !’",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "The Golden Touch",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "Where Go the Boats ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "Our Solar System",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "Guess what !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "A Book Speaks",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "George Washington Carver",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "Question Bank",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 45,
            "chapterNumber": 45,
            "chapterTitle": "Dice for your Game",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 46,
            "chapterNumber": 46,
            "chapterTitle": "All about Money",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 47,
            "chapterNumber": 47,
            "chapterTitle": "Only One Mother",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 48,
            "chapterNumber": 48,
            "chapterTitle": "At the Market",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 49,
            "chapterNumber": 49,
            "chapterTitle": "He Knows the Workman",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 7__English": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "७ वी बालभारती इंग्रजी – English Balbharati Class 7 (Item 703020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "Latest year 2017 (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/703020001.pdf",
    "verificationNote": "Verified BOTH First-Language English Balbharati (703020001, 25 ch, SHA-256 d54ff6c0403d...) AND Second/Third-Language My English Book (703020035, 22 ch, SHA-256 46c55c3a1124...).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "1.1 Past, Present, Future",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "1.2 Odd One In",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "1.3 In Time of Silver Rain",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "1.4 The King’s Choice",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "1.5 Seeing Eyes Helping Hands",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "1.6 A Collage",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "2.1 From a Railway Carriage",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "2.2 The Souvenir",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "2.3 Abdul Becomes a Courtier",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "2.4 How doth the little busy bee",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "2.5 Learn Yoga from Animals",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "2.6 Chasing the Sea Monster",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "2.7 Great Scientists",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "3.1 Tartary",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "3.2 Compere a Programme",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "3.3 A Crow in the House",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "3.4 The Brook",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "3.5 News Analysis",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "3.6 Think Before You Speak !",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "4.1 Under the Greenwood Tree",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "4.2 Unke Munke Timpetoo",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "4.3 The Red-Headed League",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "4.4 Home Sweet Home",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "4.5 Seeing Eyes Helping Hands",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "4.6 Papa Panov’s Special Christmas",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी बालभारती इंग्रजी – English Balbharati Class 7 (Item 703020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2017 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/703020001.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (703020001, SHA-256 d54ff6c0403dfebdbe018ab3d4039fb56eb12d967a267ac99e370765544a682b, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 Past, Present, Future",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Odd One In",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 In Time of Silver Rain",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 The King’s Choice",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Seeing Eyes Helping Hands",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 A Collage",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "2.1 From a Railway Carriage",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "2.2 The Souvenir",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "2.3 Abdul Becomes a Courtier",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "2.4 How doth the little busy bee",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.5 Learn Yoga from Animals",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.6 Chasing the Sea Monster",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "2.7 Great Scientists",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "3.1 Tartary",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "3.2 Compere a Programme",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "3.3 A Crow in the House",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "3.4 The Brook",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "3.5 News Analysis",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "3.6 Think Before You Speak !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "4.1 Under the Greenwood Tree",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "4.2 Unke Munke Timpetoo",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "4.3 The Red-Headed League",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "4.4 Home Sweet Home",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "4.5 Seeing Eyes Helping Hands",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "4.6 Papa Panov’s Special Christmas",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी माय इंग्लिश बुक इंग्रजी – My English Book Class 7 (Item 703020035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2017 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/703020035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (703020035, SHA-256 46c55c3a11242526669312880e3c96a186902ce183703f42e454029f85692348, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 It’s a small world...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Warm up with Tara and Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Little Girls Wiser than Old People",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Journey to the West",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Children are going to school",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 In a Class of their own !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "2.1 We shall overcome ...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "2.2 Two Fables",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "2.3 Teeny-tiny",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "2.4 Putting together a Class Magazine",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.5 Windy Lines",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.6 Great scientists have a questioning mind",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "3.1 Sleep, Baby, Sleep !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "3.2 The Welcome",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "3.3 News Analysis",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "3.4 Please don’t read this poem !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "3.5 The Red-headed League",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "4.1 Double Standards",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "4.2 Baby Pangolin’s Night Out",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "4.3 Chasing the Sea Monster",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "4.4 A Parody",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "4.5 From The Selfish Giant",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी माय इंग्लिश बुक इंग्रजी – My English Book Class 7 (Item 703020035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2017 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/703020035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (703020035, SHA-256 46c55c3a11242526669312880e3c96a186902ce183703f42e454029f85692348, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 It’s a small world...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Warm up with Tara and Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Little Girls Wiser than Old People",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Journey to the West",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Children are going to school",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 In a Class of their own !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "2.1 We shall overcome ...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "2.2 Two Fables",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "2.3 Teeny-tiny",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "2.4 Putting together a Class Magazine",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.5 Windy Lines",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.6 Great scientists have a questioning mind",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "3.1 Sleep, Baby, Sleep !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "3.2 The Welcome",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "3.3 News Analysis",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "3.4 Please don’t read this poem !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "3.5 The Red-headed League",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "4.1 Double Standards",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "4.2 Baby Pangolin’s Night Out",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "4.3 Chasing the Sea Monster",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "4.4 A Parody",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "4.5 From The Selfish Giant",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी माय इंग्लिश बुक इंग्रजी – My English Book Class 7 (Item 703020035)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2017 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/703020035.pdf",
        "verificationNote": "Verified from official eBalbharati PDF (703020035, SHA-256 46c55c3a11242526669312880e3c96a186902ce183703f42e454029f85692348, TOC p.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "1.1 It’s a small world...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "1.2 Warm up with Tara and Friends",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "1.3 Little Girls Wiser than Old People",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "1.4 Journey to the West",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "1.5 Children are going to school",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "1.6 In a Class of their own !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "2.1 We shall overcome ...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "2.2 Two Fables",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "2.3 Teeny-tiny",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "2.4 Putting together a Class Magazine",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "2.5 Windy Lines",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "2.6 Great scientists have a questioning mind",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "3.1 Sleep, Baby, Sleep !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "3.2 The Welcome",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "3.3 News Analysis",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "3.4 Please don’t read this poem !",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "3.5 The Red-headed League",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "4.1 Double Standards",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "4.2 Baby Pangolin’s Night Out",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "4.3 Chasing the Sea Monster",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "4.4 A Parody",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "4.5 From The Selfish Giant",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "CBSE__Class 3__Computer Knowledge": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 3",
    "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
    "academicYearEdition": "2026–2027 First Edition (March 2026)",
    "applicableMediums": [
      "English"
    ],
    "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri3SH_2026-27.pdf",
    "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 77f61d6b3d00218aa18e7eb9bb9d05ea1b379e5f33ae90835cdafceada17ef4f, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Introduction",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "How to use this Book?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "What’s in a Name?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Toy Joy",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Double Century",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Vacation with My Nani Maa",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Fun with Shapes",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "House of Hundreds – I",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "Raksha Bandhan",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Fair Share",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "House of Hundreds – II",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Fun at Class Party!",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "Filling and Lifting",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "Give and Take",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "Time Goes On",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "The Surajkund Fair",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 3",
        "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
        "academicYearEdition": "2026–2027 First Edition (March 2026)",
        "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri3SH_2026-27.pdf",
        "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 77f61d6b3d00218aa18e7eb9bb9d05ea1b379e5f33ae90835cdafceada17ef4f, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Introduction",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "How to use this Book?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "What’s in a Name?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Toy Joy",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Double Century",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Vacation with My Nani Maa",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Fun with Shapes",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "House of Hundreds – I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Raksha Bandhan",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Fair Share",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "House of Hundreds – II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Fun at Class Party!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Filling and Lifting",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "Give and Take",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Time Goes On",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "The Surajkund Fair",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "CBSE__Class 4__Computer Knowledge": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 4",
    "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
    "academicYearEdition": "2026–2027 First Edition (March 2026)",
    "applicableMediums": [
      "English"
    ],
    "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri4SH_2026-27.pdf",
    "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 06dfc8335adf11e3dd5b8fdf02545cd710a5e657743ede38b6bfc22b3698e4c4, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Introduction",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "How to Use This Book?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "Shapes Around Us",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Hide and Seek",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Patterns Around Us",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Thousands Around Us",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Sharing and Measuring",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "Measuring Length",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "The Cleanest Village",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Weigh It, Pour It",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "Equal Groups",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Elephants, Tigers, and Leopards",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "Fun with Symmetry",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "Ticking Clocks and Turning Calendar",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "The Transport Museum",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "Data Handling",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 4",
        "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
        "academicYearEdition": "2026–2027 First Edition (March 2026)",
        "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri4SH_2026-27.pdf",
        "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 06dfc8335adf11e3dd5b8fdf02545cd710a5e657743ede38b6bfc22b3698e4c4, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Introduction",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "How to Use This Book?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "Shapes Around Us",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Hide and Seek",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Patterns Around Us",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Thousands Around Us",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Sharing and Measuring",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Measuring Length",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "The Cleanest Village",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Weigh It, Pour It",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Equal Groups",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Elephants, Tigers, and Leopards",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Fun with Symmetry",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "Ticking Clocks and Turning Calendar",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "The Transport Museum",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "Data Handling",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "CBSE__Class 5__Computer Knowledge": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 5",
    "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
    "academicYearEdition": "2026–2027 First Edition (March 2026)",
    "applicableMediums": [
      "English"
    ],
    "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri5SH_2026-27.pdf",
    "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 054c315170985cfb3d0637f2e7e26ca671cb6cb25008c66fd29183a027049af7, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Introduction",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "How to Use This Book?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "We the Travellers – I",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Fractions",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Angles as Turns",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "We the Travellers – II",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Far and Near",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "The Dairy Farm",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "Shapes and Patterns",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Weight and Capacity",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "Coconut Farm",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Symmetrical Designs",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "Grandmother’s Quilt",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "Racing Seconds",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "Animal Jumps",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "Maps and Locations",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "Data Through Pictures",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 5",
        "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
        "academicYearEdition": "2026–2027 First Edition (March 2026)",
        "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Pri5SH_2026-27.pdf",
        "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 054c315170985cfb3d0637f2e7e26ca671cb6cb25008c66fd29183a027049af7, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Introduction",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "How to Use This Book?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "We the Travellers – I",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Fractions",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Angles as Turns",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "We the Travellers – II",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Far and Near",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "The Dairy Farm",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Shapes and Patterns",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Weight and Capacity",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Coconut Farm",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Symmetrical Designs",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Grandmother’s Quilt",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "Racing Seconds",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Animal Jumps",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "Maps and Locations",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "Data Through Pictures",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "CBSE__Class 6__Computer Knowledge": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 6",
    "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
    "academicYearEdition": "2026–2027 First Edition (March 2026)",
    "applicableMediums": [
      "English"
    ],
    "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Mid6SH_2026-27.pdf",
    "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 954a20f628c3818b4fb71b35aea1524b35a656abfdc89db6658a4703bda3ba55, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Part 1 (CT): Introduction",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "Part 1 (CT): How to Use this Book?",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "Part 1 (CT): Patterns in Mathematics",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Part 1 (CT): Lines and Angles",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Part 1 (CT): Number Play",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Part 1 (CT): Data Handling and Presentation",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Part 1 (CT): Prime Time",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "Part 1 (CT): Perimeter and Area",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "Part 1 (CT): Fractions",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Part 1 (CT): Playing with Constructions",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "Part 1 (CT): Symmetry",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Part 1 (CT): The Other Side of Zero",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "Part 2 (AI): Introduction to Artificial Intelligence and Everyday Examples",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "Part 2 (AI): Basic Data Concepts",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "Part 2 (AI): Simple Pattern Recognition and Decision Making",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "Part 2 (AI): Ethics and Digital Responsibility",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 6",
        "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
        "academicYearEdition": "2026–2027 First Edition (March 2026)",
        "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Mid6SH_2026-27.pdf",
        "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 954a20f628c3818b4fb71b35aea1524b35a656abfdc89db6658a4703bda3ba55, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Part 1 (CT): Introduction",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "Part 1 (CT): How to Use this Book?",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "Part 1 (CT): Patterns in Mathematics",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Part 1 (CT): Lines and Angles",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Part 1 (CT): Number Play",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Part 1 (CT): Data Handling and Presentation",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Part 1 (CT): Prime Time",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Part 1 (CT): Perimeter and Area",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Part 1 (CT): Fractions",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Part 1 (CT): Playing with Constructions",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Part 1 (CT): Symmetry",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Part 1 (CT): The Other Side of Zero",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Part 2 (AI): Introduction to Artificial Intelligence and Everyday Examples",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "Part 2 (AI): Basic Data Concepts",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Part 2 (AI): Simple Pattern Recognition and Decision Making",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "Part 2 (AI): Ethics and Digital Responsibility",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "CBSE__Class 7__Computer Knowledge": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 7",
    "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
    "academicYearEdition": "2026–2027 First Edition (March 2026)",
    "applicableMediums": [
      "English"
    ],
    "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Mid7SH_2026-27.pdf",
    "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 9688d5919e493c8daf3b510567f2c938afe30cf0da5a65b8c2c8c0696e8c7ced, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Part 1 (CT): Introduction",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "Part 1 (CT): How to Use this Book?",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "Part 1 (CT): Large Numbers Around Us",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Part 1 (CT): Arithmetic Expressions",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Part 1 (CT): A Peek Beyond the Point",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Part 1 (CT): Expressions using Letter-Numbers",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Part 1 (CT): Parallel and Intersecting Lines",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "Part 1 (CT): Number Play",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "Part 1 (CT): A Tale of Three Intersecting Lines",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Part 1 (CT): Working with Fractions",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "Part 2 (AI): AI Domains and Applications",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Part 2 (AI): AI in Industries",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "Part 2 (AI): Data Visualization and Analysis",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "Part 2 (AI): Ethics and AI Bias Awareness",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 7",
        "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
        "academicYearEdition": "2026–2027 First Edition (March 2026)",
        "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Mid7SH_2026-27.pdf",
        "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 9688d5919e493c8daf3b510567f2c938afe30cf0da5a65b8c2c8c0696e8c7ced, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Part 1 (CT): Introduction",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "Part 1 (CT): How to Use this Book?",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "Part 1 (CT): Large Numbers Around Us",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Part 1 (CT): Arithmetic Expressions",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Part 1 (CT): A Peek Beyond the Point",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Part 1 (CT): Expressions using Letter-Numbers",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Part 1 (CT): Parallel and Intersecting Lines",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Part 1 (CT): Number Play",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Part 1 (CT): A Tale of Three Intersecting Lines",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Part 1 (CT): Working with Fractions",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Part 2 (AI): AI Domains and Applications",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Part 2 (AI): AI in Industries",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Part 2 (AI): Data Visualization and Analysis",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "Part 2 (AI): Ethics and AI Bias Awareness",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "CBSE__Class 8__Computer Knowledge": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 8",
    "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
    "academicYearEdition": "2026–2027 First Edition (March 2026)",
    "applicableMediums": [
      "English"
    ],
    "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Mid8SH_2026-27.pdf",
    "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 a579f1aa5d034b338f67499aadb66f6b4be63f286a0bb3e25cd802ab6c59d2ca, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Part 1 (CT): Introduction",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "Part 1 (CT): How to Use this Book?",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "Part 1 (CT): A Square and a Cube",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Part 1 (CT): Power Play",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Part 1 (CT): A Story of Numbers",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Part 1 (CT): Quadrilaterals",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Part 1 (CT): Number Play",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "Part 1 (CT): We Distribute Yet Things Multiply",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "Part 1 (CT): Proportional Reasoning",
        "sectionOrPart": "Part 1: Computational Thinking",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Part 2 (AI): AI Project Lifecycle",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "Part 2 (AI): Artificial Intelligence and Its Applications",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Part 2 (AI): Data and Fairness in AI",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "Part 2 (AI): Ethics and Responsible AI",
        "sectionOrPart": "Part 2: Artificial Intelligence",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "CBSE Computational Thinking & Artificial Intelligence (CT & AI) Student Handbook — Class 8",
        "publisher": "Central Board of Secondary Education (CBSE), New Delhi",
        "academicYearEdition": "2026–2027 First Edition (March 2026)",
        "officialSourceUrl": "https://cbseacademic.nic.in/web_material/CurriculumMain27/CTAI_Mid8SH_2026-27.pdf",
        "verificationNote": "Verified from official CBSE Academic CT & AI Student Handbook 2026–27 PDF (Circulars Acad-15/2026 & Acad-18/2026, SHA-256 a579f1aa5d034b338f67499aadb66f6b4be63f286a0bb3e25cd802ab6c59d2ca, TOC p.5). Applicable mediums narrowed from placeholder ['English','Marathi','Hindi','Semi-English'] to ['English'] (with Hindi noted pending until CBSE publishes Hindi edition).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Part 1 (CT): Introduction",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "Part 1 (CT): How to Use this Book?",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "Part 1 (CT): A Square and a Cube",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Part 1 (CT): Power Play",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Part 1 (CT): A Story of Numbers",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Part 1 (CT): Quadrilaterals",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Part 1 (CT): Number Play",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Part 1 (CT): We Distribute Yet Things Multiply",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Part 1 (CT): Proportional Reasoning",
            "sectionOrPart": "Part 1: Computational Thinking",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Part 2 (AI): AI Project Lifecycle",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Part 2 (AI): Artificial Intelligence and Its Applications",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Part 2 (AI): Data and Fairness in AI",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Part 2 (AI): Ethics and Responsible AI",
            "sectionOrPart": "Part 2: Artificial Intelligence",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 1__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "१ ली शिकू मराठी आनंदाने (Item 103000866) + १ ली बालभारती मराठी (Item 101050001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103000866.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. आला पाऊस आला (कविता) – शांता शेळके",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "२. शाळेचा पहिला दिवस (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "३. मी आणि माझे कुटुंब",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "४. माझी जोडी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "५. मला घरापर्यंत पोहोचव.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "६. ठिपके जोड व गिरव.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "७. अक्षरगट क्र.१ – क म ल अ आ ।",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "८. फरक ओळख.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "९. असे कसे? (कविता) – राजा मंगळवेढेकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "१०. ओळख फळांची",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "११. अक्षरगट क्र.२ – घ र ब ड़ ई ी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१२. बैलपोळा (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "१३. झाडे लावू या (कविता)",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१४. ऐक व कृती कर.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "१५. माझे मित्र (पाठ)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "१६. अक्षरगट क्र.३ – न स प त उ ऊ ु ू",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "१७. पक्ष्यांचे जग",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "१८. अक्षरगट क्र.४ – च ळ ह झ ए े",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "१९. बघ व सांग.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "२०. मोरा रे मोरा (कविता) – सरिता पदकी",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "२१. आम्ही कोठे राहतो?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "२२. अक्षरगट क्र.५ – द ड व ग ऐ ै",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "२३. सिंह आणि उंदीर (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "२४. खेळ (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "२५. माझे खेळ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "२६. अक्षरगट क्र.६ – ध य फ ज श ओ ो",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "२७. प्राण्यांचे जग",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "२८. ससा (कविता) – सुशिला बापट",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "२९. अक्षरगट क्र.७ – ण ख थ भ औ ौ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "३०. चिनूची मदत (पाठ)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "३१. पाहुणा ओळख.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "३२. बाळाचे दोस्त (कविता)",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "३३. मी आणि माझा जोडीदार",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 34,
        "chapterNumber": 34,
        "chapterTitle": "३४. चिमणीची पिल्ले (पाठ)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 35,
        "chapterNumber": 35,
        "chapterTitle": "३५. माझा वर्ग",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 36,
        "chapterNumber": 36,
        "chapterTitle": "३६. प्रजासत्ताक दिन (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 37,
        "chapterNumber": 37,
        "chapterTitle": "३७. अक्षरगट क्र.८ – ट ढ ठ छ ष",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 38,
        "chapterNumber": 38,
        "chapterTitle": "३८. माझं चित्र (कविता) – संगीता बर्वे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 39,
        "chapterNumber": 39,
        "chapterTitle": "३९. माझे घर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 40,
        "chapterNumber": 40,
        "chapterTitle": "४०. अक्षरगट क्र.९ – क्ष ज्ञ ऑ अं अः ऋ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 41,
        "chapterNumber": 41,
        "chapterTitle": "४१. मुळाक्षरे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 42,
        "chapterNumber": 42,
        "chapterTitle": "४२. चौदाखडी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 43,
        "chapterNumber": 43,
        "chapterTitle": "४३. पानं (कविता) – सुनीता नागपूरकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 44,
        "chapterNumber": 44,
        "chapterTitle": "४४. भाज्या व फळे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 45,
        "chapterNumber": 45,
        "chapterTitle": "४५. ओळख भाज्यांची",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 46,
        "chapterNumber": 46,
        "chapterTitle": "४६. माझी ओळख",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली शिकू मराठी आनंदाने (Item 103000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (103000866, SHA-256 f23dce64b3192b80bf28dcb58bde085036a6f27a336ca85feeb5c31465f1edb1, 16691007 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. आला पाऊस आला (कविता) – शांता शेळके",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. शाळेचा पहिला दिवस (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. मी आणि माझे कुटुंब",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. माझी जोडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. मला घरापर्यंत पोहोचव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. ठिपके जोड व गिरव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. अक्षरगट क्र.१ – क म ल अ आ ।",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. फरक ओळख.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. असे कसे? (कविता) – राजा मंगळवेढेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. ओळख फळांची",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. अक्षरगट क्र.२ – घ र ब ड़ ई ी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. बैलपोळा (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. झाडे लावू या (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. ऐक व कृती कर.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. माझे मित्र (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. अक्षरगट क्र.३ – न स प त उ ऊ ु ू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. पक्ष्यांचे जग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. अक्षरगट क्र.४ – च ळ ह झ ए े",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. बघ व सांग.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. मोरा रे मोरा (कविता) – सरिता पदकी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. आम्ही कोठे राहतो?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२२. अक्षरगट क्र.५ – द ड व ग ऐ ै",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२३. सिंह आणि उंदीर (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२४. खेळ (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२५. माझे खेळ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२६. अक्षरगट क्र.६ – ध य फ ज श ओ ो",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२७. प्राण्यांचे जग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२८. ससा (कविता) – सुशिला बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "२९. अक्षरगट क्र.७ – ण ख थ भ औ ौ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "३०. चिनूची मदत (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "३१. पाहुणा ओळख.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "३२. बाळाचे दोस्त (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "३३. मी आणि माझा जोडीदार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "३४. चिमणीची पिल्ले (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "३५. माझा वर्ग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "३६. प्रजासत्ताक दिन (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "३७. अक्षरगट क्र.८ – ट ढ ठ छ ष",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "३८. माझं चित्र (कविता) – संगीता बर्वे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "३९. माझे घर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "४०. अक्षरगट क्र.९ – क्ष ज्ञ ऑ अं अः ऋ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "४१. मुळाक्षरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "४२. चौदाखडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "४३. पानं (कविता) – सुनीता नागपूरकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "४४. भाज्या व फळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 45,
            "chapterNumber": 45,
            "chapterTitle": "४५. ओळख भाज्यांची",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 46,
            "chapterNumber": 46,
            "chapterTitle": "४६. माझी ओळख",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली बालभारती मराठी (Item 101050001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/101050001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (101050001, SHA-256 37805c706d6347a33f5e2906aba255e62eb641c78257dd7aa83f85d7a3cca769, 15068706 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. माझ्या या दारातून (कविता) – अनुताई वाघ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. चित्रगप्पा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. मी आणि माझे कुटुंब",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. माझी जोडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. मला घरापर्यंत पोहोचव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. ठिपके जोड व गिरव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. राधाचे कुटुंब (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. ए आई मला पावसात जाऊ दे (कविता) – वंदना विटणकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. अक्षरगट क्र.१ – क म ल अ आ ।",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. सोहमचा दिवस (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. अक्षरगट क्र.२ – घ र ब ड़ ई ी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. ससा आणि डोंगर (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अक्षरगट क्र.३ – न स प त उ ऊ ु ू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. चांगल्या सवयी (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. झुक झुक झुक (कविता) – वि. म. कुलकर्णी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. अक्षरगट क्र.४ – च ळ ह झ ए े",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. चतुर उंदीर (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. अक्षरगट क्र.५ – द ड व ग ऐ ै",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. चांदोबाचे घर (कविता) – विलास मोरे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. अक्षरगट क्र.६ – ध य फ ज श ओ ो",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. भोपळा (कविता) – दादासाहेब कोते",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२२. माझे सोबती (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२३. चित्रगप्पा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२४. झोक्या रे झोक्या (कविता) – डॉ. स्मिता पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२५. अक्षरगट क्र.७ – ण ख थ भ औ ौ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२६. माझे जग (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२७. अक्षरगट क्र.८ – ट ढ ठ छ ष",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२८. खार (कविता) – प्रा. देवबा पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "२९. अक्षरगट क्र.९ – क्ष ज्ञ ऑ अं अः ऋ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "३०. अनुस्वार ( ं )",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "३१. जोडाक्षरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "३२. मुळाक्षरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "३३. चौदाखडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "३४. आठवडी बाजार (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "३५. मेंढी (कविता) – प्रवीण दवणे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "३६. पूर्णविराम (.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "३७. प्रश्नचिन्ह (?)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "३८. चला लाडू बनवू या. (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "३९. पतंग माझा (कविता) – मंदाकिनी गोडसे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "४०. छोट्या हातांची मोठी किमया (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "४१. नवे ते हवे (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "४२. घटनाक्रम",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "४३. माझी ओळख",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली शिकू मराठी आनंदाने (Item 103000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (103000866, SHA-256 f23dce64b3192b80bf28dcb58bde085036a6f27a336ca85feeb5c31465f1edb1, 16691007 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. आला पाऊस आला (कविता) – शांता शेळके",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. शाळेचा पहिला दिवस (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. मी आणि माझे कुटुंब",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. माझी जोडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. मला घरापर्यंत पोहोचव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. ठिपके जोड व गिरव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. अक्षरगट क्र.१ – क म ल अ आ ।",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. फरक ओळख.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. असे कसे? (कविता) – राजा मंगळवेढेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. ओळख फळांची",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. अक्षरगट क्र.२ – घ र ब ड़ ई ी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. बैलपोळा (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. झाडे लावू या (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. ऐक व कृती कर.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. माझे मित्र (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. अक्षरगट क्र.३ – न स प त उ ऊ ु ू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. पक्ष्यांचे जग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. अक्षरगट क्र.४ – च ळ ह झ ए े",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. बघ व सांग.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. मोरा रे मोरा (कविता) – सरिता पदकी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. आम्ही कोठे राहतो?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२२. अक्षरगट क्र.५ – द ड व ग ऐ ै",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२३. सिंह आणि उंदीर (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२४. खेळ (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२५. माझे खेळ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२६. अक्षरगट क्र.६ – ध य फ ज श ओ ो",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२७. प्राण्यांचे जग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२८. ससा (कविता) – सुशिला बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "२९. अक्षरगट क्र.७ – ण ख थ भ औ ौ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "३०. चिनूची मदत (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "३१. पाहुणा ओळख.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "३२. बाळाचे दोस्त (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "३३. मी आणि माझा जोडीदार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "३४. चिमणीची पिल्ले (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "३५. माझा वर्ग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "३६. प्रजासत्ताक दिन (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "३७. अक्षरगट क्र.८ – ट ढ ठ छ ष",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "३८. माझं चित्र (कविता) – संगीता बर्वे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "३९. माझे घर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "४०. अक्षरगट क्र.९ – क्ष ज्ञ ऑ अं अः ऋ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "४१. मुळाक्षरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "४२. चौदाखडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "४३. पानं (कविता) – सुनीता नागपूरकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "४४. भाज्या व फळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 45,
            "chapterNumber": 45,
            "chapterTitle": "४५. ओळख भाज्यांची",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 46,
            "chapterNumber": 46,
            "chapterTitle": "४६. माझी ओळख",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली शिकू मराठी आनंदाने (Item 103000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/103000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (103000866, SHA-256 f23dce64b3192b80bf28dcb58bde085036a6f27a336ca85feeb5c31465f1edb1, 16691007 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. आला पाऊस आला (कविता) – शांता शेळके",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. शाळेचा पहिला दिवस (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. मी आणि माझे कुटुंब",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. माझी जोडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. मला घरापर्यंत पोहोचव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. ठिपके जोड व गिरव.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. अक्षरगट क्र.१ – क म ल अ आ ।",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. फरक ओळख.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. असे कसे? (कविता) – राजा मंगळवेढेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. ओळख फळांची",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. अक्षरगट क्र.२ – घ र ब ड़ ई ी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. बैलपोळा (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. झाडे लावू या (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. ऐक व कृती कर.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. माझे मित्र (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. अक्षरगट क्र.३ – न स प त उ ऊ ु ू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. पक्ष्यांचे जग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. अक्षरगट क्र.४ – च ळ ह झ ए े",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. बघ व सांग.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. मोरा रे मोरा (कविता) – सरिता पदकी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. आम्ही कोठे राहतो?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२२. अक्षरगट क्र.५ – द ड व ग ऐ ै",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२३. सिंह आणि उंदीर (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२४. खेळ (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२५. माझे खेळ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२६. अक्षरगट क्र.६ – ध य फ ज श ओ ो",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२७. प्राण्यांचे जग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२८. ससा (कविता) – सुशिला बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "२९. अक्षरगट क्र.७ – ण ख थ भ औ ौ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "३०. चिनूची मदत (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "३१. पाहुणा ओळख.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "३२. बाळाचे दोस्त (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "३३. मी आणि माझा जोडीदार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "३४. चिमणीची पिल्ले (पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "३५. माझा वर्ग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "३६. प्रजासत्ताक दिन (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "३७. अक्षरगट क्र.८ – ट ढ ठ छ ष",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "३८. माझं चित्र (कविता) – संगीता बर्वे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "३९. माझे घर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "४०. अक्षरगट क्र.९ – क्ष ज्ञ ऑ अं अः ऋ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "४१. मुळाक्षरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "४२. चौदाखडी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "४३. पानं (कविता) – सुनीता नागपूरकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "४४. भाज्या व फळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 45,
            "chapterNumber": 45,
            "chapterTitle": "४५. ओळख भाज्यांची",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 46,
            "chapterNumber": 46,
            "chapterTitle": "४६. माझी ओळख",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 1__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "१ ली बालभारती हिंदी (Item 102050001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/102050001.pdf",
    "verificationNote": "Verified 1 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – मैं (प्रारंभिक पाठ)",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "१. पाठशाला",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "२. झूम-झूम झमाझम",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "३. मीनल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "४. ऐसे बनेंगे हम ?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "५. आ म न ल अ र ा",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "६. परी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "७. घर तक पहुँचाओ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "८. ई ख ग ढ़ इ ह ी ि",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "९. जोकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "१०. ऊ उ प श ब त ू ु",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "पुनरावर्तन – १",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "दूसरी इकाई – हमें मिलाओ (प्रारंभिक पाठ)",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१. आओ खेलें",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "२. अपनी-अपनी बोली",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "३. स ड़ क ऐ व ए ै े",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "४. कौआ और लोमड़ी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "५. च ष ओ ठ औ ध ो ौ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "६. मेरा रंग",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "७. अभिवादन",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "८. ऋ ण अं ड फ क्ष ृ ं",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "९. गुड़िया रानी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "१०. मेरा खाना बताओ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "पुनरावर्तन – २",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "पुनरावर्तन – ३",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "तीसरी इकाई – दिनचर्या (प्रारंभिक पाठ)",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "१. जन्मदिन",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "२. पता करो जी ...",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "३. अँ ळ ट त्र श्र ँ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "४. कुत्ते और बकरियाँ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "५. भ ज य झ ऑ छ ॉ",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "६. झ ढ थ घ ज ङ अः :",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "७. शब्द खेल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 34,
        "chapterNumber": 34,
        "chapterTitle": "८. जुड़ें हम (१)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 35,
        "chapterNumber": 35,
        "chapterTitle": "८. जुड़ें हम (२)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 36,
        "chapterNumber": 36,
        "chapterTitle": "९. मेरा गाँव",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 37,
        "chapterNumber": 37,
        "chapterTitle": "पुनरावर्तन – ४",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 38,
        "chapterNumber": 38,
        "chapterTitle": "चौथी इकाई – मात्रा बाग (प्रारंभिक पाठ)",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 39,
        "chapterNumber": 39,
        "chapterTitle": "१. बाजार",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 40,
        "chapterNumber": 40,
        "chapterTitle": "२. मुझे पढ़ाओ ना ...",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 41,
        "chapterNumber": 41,
        "chapterTitle": "३. एकता की ताकत",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 42,
        "chapterNumber": 42,
        "chapterTitle": "४. चतुर सियार",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 43,
        "chapterNumber": 43,
        "chapterTitle": "५अ. पहचानो",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 44,
        "chapterNumber": 44,
        "chapterTitle": "५ ब. समझो",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 45,
        "chapterNumber": 45,
        "chapterTitle": "६. नाव",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 46,
        "chapterNumber": 46,
        "chapterTitle": "७. आओ समझें",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 47,
        "chapterNumber": 47,
        "chapterTitle": "८. आओ जानें",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 48,
        "chapterNumber": 48,
        "chapterTitle": "९. मैं कौन ?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 49,
        "chapterNumber": 49,
        "chapterTitle": "१०. भारत",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 50,
        "chapterNumber": 50,
        "chapterTitle": "पुनरावर्तन – ५",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 51,
        "chapterNumber": 51,
        "chapterTitle": "पुनरावर्तन – ६",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Marathi medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Marathi medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "१ ली बालभारती हिंदी (Item 102050001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/102050001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (102050001, SHA-256 d7a0fd30f83bda22c05485554914570c3c11abc692e1c380074d079bf7e79c32, 17570332 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – मैं (प्रारंभिक पाठ)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "१. पाठशाला",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. झूम-झूम झमाझम",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. मीनल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. ऐसे बनेंगे हम ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. आ म न ल अ र ा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. परी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. घर तक पहुँचाओ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. ई ख ग ढ़ इ ह ी ि",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "९. जोकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "१०. ऊ उ प श ब त ू ु",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "पुनरावर्तन – १",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – हमें मिलाओ (प्रारंभिक पाठ)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१. आओ खेलें",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "२. अपनी-अपनी बोली",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "३. स ड़ क ऐ व ए ै े",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "४. कौआ और लोमड़ी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "५. च ष ओ ठ औ ध ो ौ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "६. मेरा रंग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "७. अभिवादन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "८. ऋ ण अं ड फ क्ष ृ ं",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "९. गुड़िया रानी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१०. मेरा खाना बताओ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "पुनरावर्तन – २",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "पुनरावर्तन – ३",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "तीसरी इकाई – दिनचर्या (प्रारंभिक पाठ)",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "१. जन्मदिन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२. पता करो जी ...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "३. अँ ळ ट त्र श्र ँ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "४. कुत्ते और बकरियाँ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "५. भ ज य झ ऑ छ ॉ",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "६. झ ढ थ घ ज ङ अः :",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "७. शब्द खेल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "८. जुड़ें हम (१)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "८. जुड़ें हम (२)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "९. मेरा गाँव",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "पुनरावर्तन – ४",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 38,
            "chapterNumber": 38,
            "chapterTitle": "चौथी इकाई – मात्रा बाग (प्रारंभिक पाठ)",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 39,
            "chapterNumber": 39,
            "chapterTitle": "१. बाजार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 40,
            "chapterNumber": 40,
            "chapterTitle": "२. मुझे पढ़ाओ ना ...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 41,
            "chapterNumber": 41,
            "chapterTitle": "३. एकता की ताकत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 42,
            "chapterNumber": 42,
            "chapterTitle": "४. चतुर सियार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 43,
            "chapterNumber": 43,
            "chapterTitle": "५अ. पहचानो",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 44,
            "chapterNumber": 44,
            "chapterTitle": "५ ब. समझो",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 45,
            "chapterNumber": 45,
            "chapterTitle": "६. नाव",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 46,
            "chapterNumber": 46,
            "chapterTitle": "७. आओ समझें",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 47,
            "chapterNumber": 47,
            "chapterTitle": "८. आओ जानें",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 48,
            "chapterNumber": 48,
            "chapterTitle": "९. मैं कौन ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 49,
            "chapterNumber": 49,
            "chapterTitle": "१०. भारत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 50,
            "chapterNumber": 50,
            "chapterTitle": "पुनरावर्तन – ५",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 51,
            "chapterNumber": 51,
            "chapterTitle": "पुनरावर्तन – ६",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Semi-English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Semi-English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      }
    ]
  },
  "Maharashtra__Class 2__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "२ री बालभारती हिंदी (Item 202060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/202060001.pdf",
    "verificationNote": "Verified 1 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – १. हम",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "पहली इकाई – २. वृक्षारोपण",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "पहली इकाई – ३. काले बादल",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "पहली इकाई – ४. पुस्तकालय",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "पहली इकाई – ५. गुब्बारा",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "पहली इकाई – ६. इंद्रधनुष",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "पहली इकाई – पुनरावर्तन – १",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "दूसरी इकाई – १. मौसम",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "दूसरी इकाई – २. सहायता",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "दूसरी इकाई – ३. मेरी माँ",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "दूसरी इकाई – ४. प्रदर्शनी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "दूसरी इकाई – ५. सीख",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "दूसरी इकाई – ६. नींद",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "दूसरी इकाई – पुनरावर्तन – २",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "तीसरी इकाई – १. स्वच्छता",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "तीसरी इकाई – २. विविध खेल",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "तीसरी इकाई – ३. संदेश",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "तीसरी इकाई – ४. निर्मल जल",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "तीसरी इकाई – ५. आईना",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "तीसरी इकाई – ६. एक पेड़",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "तीसरी इकाई – पुनरावर्तन – ३",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "चौथी इकाई – १. दिशाएँ",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "चौथी इकाई – २. ऐसे बनें मित्र",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "चौथी इकाई – ३. चलते रहना",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "चौथी इकाई – ४. फलों का दरबार",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "चौथी इकाई – ५. बुद्धिमान खरगोश",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "चौथी इकाई – ६. देश हमारा",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "चौथी इकाई – पुनरावर्तन – ४",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Marathi medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Marathi medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री बालभारती हिंदी (Item 202060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/202060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (202060001, SHA-256 977ac753f711e3f7eba057b068995a45646e74a8b725520b1cd89cee63d19d63, 16706544 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. हम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. वृक्षारोपण",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. काले बादल",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. पुस्तकालय",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. गुब्बारा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. इंद्रधनुष",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – पुनरावर्तन – १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "दूसरी इकाई – १. मौसम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – २. सहायता",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – ३. मेरी माँ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ४. प्रदर्शनी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ५. सीख",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ६. नींद",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – पुनरावर्तन – २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "तीसरी इकाई – १. स्वच्छता",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "तीसरी इकाई – २. विविध खेल",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "तीसरी इकाई – ३. संदेश",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "तीसरी इकाई – ४. निर्मल जल",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "तीसरी इकाई – ५. आईना",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "तीसरी इकाई – ६. एक पेड़",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "तीसरी इकाई – पुनरावर्तन – ३",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "चौथी इकाई – १. दिशाएँ",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "चौथी इकाई – २. ऐसे बनें मित्र",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "चौथी इकाई – ३. चलते रहना",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "चौथी इकाई – ४. फलों का दरबार",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "चौथी इकाई – ५. बुद्धिमान खरगोश",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "चौथी इकाई – ६. देश हमारा",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "चौथी इकाई – पुनरावर्तन – ४",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Semi-English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Semi-English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      }
    ]
  },
  "Maharashtra__Class 2__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "२ री शिकू मराठी आनंदाने (Item 203000866) + २ री बालभारती मराठी (Item 201060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203000866.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. झेलू या सरी (कविता) – अनिल पठारे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "• आठवडी बाजार (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "२. कबुतर आणि मुंगी (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "३. फुलपाखरू (कविता) – ग. ह. पाटील",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "४. मीराचा वाढदिवस",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "५. ससा आणि कासव (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "६. आपले घर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "• चित्रातील गमतीजमती (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "७. बेडूक बेडूक (कविता) – माया धुप्पड",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "८. आजीबरोबरचा प्रवास",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "९. सिंह आणि कोल्हा (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१०. वाचनालय",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "११. बीज (कविता) – सुशील पगारिया",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१२. पाणी बचत",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "• जत्रा (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "१३. आनंद (कविता) – विठ्ठल वाघ",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "१४. आमची सहल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "• पाहा, पण... (संवाद पाठ)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "१५. भिंग भिंग भिंगरी (कविता) – कमला पवार",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "१६. माझा आठवणीतील दिवस",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "१७. कोल्ह्याला द्राक्षे... (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "१८. वारांची गंमत (गाणे)",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "• प्राणिजगत (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "१९. कोकिळा (कविता) – कुसुमाग्रज",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "२०. ऋतू",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "२१. मोत्याची शेपटी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "२२. वेडं कोकरू (कविता) – मंगेश पाडगावकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "२३. मदत संगणकाची",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री शिकू मराठी आनंदाने (Item 203000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (203000866, SHA-256 b5f02a03cf38a9db846ea47c82c61f39e8e06ef9bae2f27ecb30cdb781d121ff, 20131936 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. झेलू या सरी (कविता) – अनिल पठारे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• आठवडी बाजार (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. कबुतर आणि मुंगी (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. फुलपाखरू (कविता) – ग. ह. पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. मीराचा वाढदिवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. ससा आणि कासव (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. आपले घर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• चित्रातील गमतीजमती (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. बेडूक बेडूक (कविता) – माया धुप्पड",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. आजीबरोबरचा प्रवास",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. सिंह आणि कोल्हा (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. वाचनालय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. बीज (कविता) – सुशील पगारिया",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. पाणी बचत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• जत्रा (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. आनंद (कविता) – विठ्ठल वाघ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. आमची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "• पाहा, पण... (संवाद पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१५. भिंग भिंग भिंगरी (कविता) – कमला पवार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१६. माझा आठवणीतील दिवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१७. कोल्ह्याला द्राक्षे... (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. वारांची गंमत (गाणे)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "• प्राणिजगत (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "१९. कोकिळा (कविता) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२०. ऋतू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२१. मोत्याची शेपटी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२२. वेडं कोकरू (कविता) – मंगेश पाडगावकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२३. मदत संगणकाची",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री बालभारती मराठी (Item 201060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/201060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (201060001, SHA-256 5ba05f54d2d71a97765c9a523a5fbc4c9ec86544b671a42b9c145528e91fc4d7, 20836310 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. अजाण आम्ही तुझी लेकरे (प्रार्थना) – संजीवनी मराठे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• आमचे खेळ (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. पाऊस (कविता) – सरिता पदकी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. साबणाचे बुडबुडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. अशी झाली फजिती...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. लपाछपी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. लिहावे नेटके – रेश्मा बर्वे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. आकाशातील तारे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. पवनचक्की",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "९. भाज्यांची शाळा (कविता) – प्रतिभा जगदाळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "१०. एक राखी सैनिकासाठी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "• कबुतर आणि मुंगी (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. बागेतील फेरफटका",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. एक झाड लावू, मित्रा! (कविता) – अनंत भावे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• दिवाळी (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. बैलजोडी (कविता) – डॉ. प्रकाश सपकाळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. अदितीचे साहस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. मासा (कविता) – शिवाजी चाळक",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. मारियाचे स्वप्न",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१७. आभाळाचा फळा (कविता) – डॉ. लीला दीक्षित",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१८. चांदोबाचा अंगरखा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१९. शाळा (कविता) – केशवकुमार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२०. आपले वाचनालय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "• एकदा गंमत झाली. (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२१. भेट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२२. सिरींज सिसरींज रे! (कविता) – मंदा नांदुरकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२३. कोल्हा आणि करकोचा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२४. हत्तीचे गर्वहरण – डॉ. विजया वाड",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री शिकू मराठी आनंदाने (Item 203000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (203000866, SHA-256 b5f02a03cf38a9db846ea47c82c61f39e8e06ef9bae2f27ecb30cdb781d121ff, 20131936 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. झेलू या सरी (कविता) – अनिल पठारे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• आठवडी बाजार (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. कबुतर आणि मुंगी (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. फुलपाखरू (कविता) – ग. ह. पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. मीराचा वाढदिवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. ससा आणि कासव (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. आपले घर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• चित्रातील गमतीजमती (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. बेडूक बेडूक (कविता) – माया धुप्पड",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. आजीबरोबरचा प्रवास",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. सिंह आणि कोल्हा (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. वाचनालय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. बीज (कविता) – सुशील पगारिया",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. पाणी बचत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• जत्रा (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. आनंद (कविता) – विठ्ठल वाघ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. आमची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "• पाहा, पण... (संवाद पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१५. भिंग भिंग भिंगरी (कविता) – कमला पवार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१६. माझा आठवणीतील दिवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१७. कोल्ह्याला द्राक्षे... (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. वारांची गंमत (गाणे)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "• प्राणिजगत (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "१९. कोकिळा (कविता) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२०. ऋतू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२१. मोत्याची शेपटी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२२. वेडं कोकरू (कविता) – मंगेश पाडगावकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२३. मदत संगणकाची",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "२ री शिकू मराठी आनंदाने (Item 203000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/203000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (203000866, SHA-256 b5f02a03cf38a9db846ea47c82c61f39e8e06ef9bae2f27ecb30cdb781d121ff, 20131936 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. झेलू या सरी (कविता) – अनिल पठारे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• आठवडी बाजार (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. कबुतर आणि मुंगी (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. फुलपाखरू (कविता) – ग. ह. पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. मीराचा वाढदिवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. ससा आणि कासव (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. आपले घर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• चित्रातील गमतीजमती (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. बेडूक बेडूक (कविता) – माया धुप्पड",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. आजीबरोबरचा प्रवास",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. सिंह आणि कोल्हा (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. वाचनालय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. बीज (कविता) – सुशील पगारिया",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. पाणी बचत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• जत्रा (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. आनंद (कविता) – विठ्ठल वाघ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. आमची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "• पाहा, पण... (संवाद पाठ)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१५. भिंग भिंग भिंगरी (कविता) – कमला पवार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१६. माझा आठवणीतील दिवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१७. कोल्ह्याला द्राक्षे... (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. वारांची गंमत (गाणे)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "• प्राणिजगत (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "१९. कोकिळा (कविता) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२०. ऋतू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२१. मोत्याची शेपटी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२२. वेडं कोकरू (कविता) – मंगेश पाडगावकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२३. मदत संगणकाची",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 3__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "३ री बालभारती हिंदी (Item 302060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/302060001.pdf",
    "verificationNote": "Verified 1 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – १. बगीचा",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "पहली इकाई – २. खेलें हम",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "पहली इकाई – ३. परियों का देश",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "पहली इकाई – ४. स्वास्थ्य",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "पहली इकाई – ५. परिपाठ",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "पहली इकाई – ६. ऋतु",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "पहली इकाई – पुनरावर्तन – १",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "दूसरी इकाई – १. समझदारी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "दूसरी इकाई – २. चींटी और टिड्डा",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "दूसरी इकाई – ३. पंछी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "दूसरी इकाई – ४. भलाई",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "दूसरी इकाई – ५. हमारे राष्ट्रीय त्योहार",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "दूसरी इकाई – ६. बाबू जी! तुम हँसा करो",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "दूसरी इकाई – पुनरावर्तन – २",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "तीसरी इकाई – १. कला",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "तीसरी इकाई – २. पुस्तकघर",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "तीसरी इकाई – ३. बनावटी सिंह",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "तीसरी इकाई – ४. सफलता",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "तीसरी इकाई – ५. विविधता में एकता",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "तीसरी इकाई – ६. सोहर गीत",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "तीसरी इकाई – पुनरावर्तन – ३",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "चौथी इकाई – १. मेला",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "चौथी इकाई – २. चिंटी और मिंटी",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "चौथी इकाई – ३. चमकें हम",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "चौथी इकाई – ४. कद्दू और बेलफल",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "चौथी इकाई – ५. अनमोल उपहार",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "चौथी इकाई – ६. अगर पेड़ भी चलते...",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "चौथी इकाई – पुनरावर्तन – ४",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Marathi medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Marathi medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री बालभारती हिंदी (Item 302060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/302060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (302060001, SHA-256 e1568db3f276fab648f16d69a299d5940d9158ba8c2d7259ede8fa567143ddaa, 19452714 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. बगीचा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. खेलें हम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. परियों का देश",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. स्वास्थ्य",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. परिपाठ",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. ऋतु",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – पुनरावर्तन – १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "दूसरी इकाई – १. समझदारी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – २. चींटी और टिड्डा",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – ३. पंछी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ४. भलाई",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ५. हमारे राष्ट्रीय त्योहार",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ६. बाबू जी! तुम हँसा करो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – पुनरावर्तन – २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "तीसरी इकाई – १. कला",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "तीसरी इकाई – २. पुस्तकघर",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "तीसरी इकाई – ३. बनावटी सिंह",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "तीसरी इकाई – ४. सफलता",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "तीसरी इकाई – ५. विविधता में एकता",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "तीसरी इकाई – ६. सोहर गीत",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "तीसरी इकाई – पुनरावर्तन – ३",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "चौथी इकाई – १. मेला",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "चौथी इकाई – २. चिंटी और मिंटी",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "चौथी इकाई – ३. चमकें हम",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "चौथी इकाई – ४. कद्दू और बेलफल",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "चौथी इकाई – ५. अनमोल उपहार",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "चौथी इकाई – ६. अगर पेड़ भी चलते...",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "चौथी इकाई – पुनरावर्तन – ४",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Semi-English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Semi-English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      }
    ]
  },
  "Maharashtra__Class 3__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "३ री शिकू मराठी आनंदाने (Item 303000866) + ३ री बालभारती मराठी (Item 301060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303000866.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. शब्द माझे (गाणे) – सूर्यकांत मालुसरे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "• पाऊस (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "२. सांबराची शिंगे (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "३. रंगांची मजा",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "४. पाणी (कविता) – डॉ. नीलिमा गुंडी",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "५. आरुषचा प्रामाणिकपणा",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "६. शेतकरीदादा (कविता)",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "• दिवस - रात्र (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "७. समीरची कल्पकता",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "८. हिरवे हिरवे झाड (कविता) – विलास सिंदगीकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "९. मोबाईल आणि पुस्तक",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१०. गुणी मुले (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "११. वाढदिवसाची भेट",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१२. छोटेसे बहीण-भाऊ (कविता) – वसंत बापट",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "१३. आम्ही गोष्ट सांगतो. (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "१४. लपंडाव",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "• माझी सहल (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "१५. गोगलगाय (कविता) – नारायण खरात",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "१६. औषधी वनस्पती",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "१७. नदी माय (कविता) – रसूल पठाण",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "• प्राणिसंग्रहालयास भेट (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "१८. धाडसी दिशा",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "१९. परी (कविता)",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "२०. चला ग्रंथालयात जाऊ या.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "२१. कैवल्य शहाणा झाला.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "२२. थोरांची ओळख : संत गाडगेबाबा",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री शिकू मराठी आनंदाने (Item 303000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (303000866, SHA-256 7ba0eeee01786c6a45204e2478cf45c659f9553edd2018c784c353c4b6e6893f, 12833416 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. शब्द माझे (गाणे) – सूर्यकांत मालुसरे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• पाऊस (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. सांबराची शिंगे (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. रंगांची मजा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. पाणी (कविता) – डॉ. नीलिमा गुंडी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. आरुषचा प्रामाणिकपणा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. शेतकरीदादा (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• दिवस - रात्र (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. समीरची कल्पकता",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. हिरवे हिरवे झाड (कविता) – विलास सिंदगीकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. मोबाईल आणि पुस्तक",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. गुणी मुले (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. वाढदिवसाची भेट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. छोटेसे बहीण-भाऊ (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१३. आम्ही गोष्ट सांगतो. (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१४. लपंडाव",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "• माझी सहल (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. गोगलगाय (कविता) – नारायण खरात",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. औषधी वनस्पती",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१७. नदी माय (कविता) – रसूल पठाण",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• प्राणिसंग्रहालयास भेट (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. धाडसी दिशा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१९. परी (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२०. चला ग्रंथालयात जाऊ या.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२१. कैवल्य शहाणा झाला.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२२. थोरांची ओळख : संत गाडगेबाबा",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री बालभारती मराठी (Item 301060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/301060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (301060001, SHA-256 bd211ea0bb39b0cee4d8b6793805e130323e2f4245cfbc6b37d0060bcd25fa1c, 17435951 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. शोधिसी मानवा (प्रार्थना) – वंदना विटणकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• वर्षासहल (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. हिरवा वसा (कविता) – उत्तम सदाकाळ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. गोष्ट तेनालीरामची",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. अंतराळवीर (कविता) – डॉ. सुरेश सावंत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. हिरव्यागार झाडावर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. शुभ्राची परसबाग – संजय ऐलवाड",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. टिंब (कविता) – डॉ. नीलिमा गुंडी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "• कसे मिळेल पाणी? (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. खारीचा वाटा – सुनिता वांजळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. आम्ही ठाकर ठाकर (कविता) – ना. धों. महानोर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. रेषांची जादू – रमा हर्डीकर सखदेव",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. मामाची रंगीत गाडी (कविता) – ग. ह. पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "• प्रजासत्ताक दिन (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१२. फुलपाखरं आली (कविता) – दासू वैद्य",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. सावित्रीबाई फुले – य. दि. फडके",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. सांग ना ओ माय! (कविता) – आबा गोविंदा महाजन",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. रत्नपारखी – पुंडलिक गवांदे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. हिरकणी – ना. गो. शुक्ल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१७. तुला नव्या जगाची आण (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• समृद्ध ग्रंथालय (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. माझे गाव (कविता) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१९. कागदाचा जन्म – माधुरी बागडे अलई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२०. संस्कार – भारत सासणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२१. ग्रंथ मंदिर (कविता) – बाबूराव शिरसाट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२२. संतवाणी",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री शिकू मराठी आनंदाने (Item 303000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (303000866, SHA-256 7ba0eeee01786c6a45204e2478cf45c659f9553edd2018c784c353c4b6e6893f, 12833416 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. शब्द माझे (गाणे) – सूर्यकांत मालुसरे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• पाऊस (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. सांबराची शिंगे (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. रंगांची मजा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. पाणी (कविता) – डॉ. नीलिमा गुंडी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. आरुषचा प्रामाणिकपणा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. शेतकरीदादा (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• दिवस - रात्र (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. समीरची कल्पकता",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. हिरवे हिरवे झाड (कविता) – विलास सिंदगीकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. मोबाईल आणि पुस्तक",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. गुणी मुले (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. वाढदिवसाची भेट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. छोटेसे बहीण-भाऊ (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१३. आम्ही गोष्ट सांगतो. (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१४. लपंडाव",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "• माझी सहल (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. गोगलगाय (कविता) – नारायण खरात",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. औषधी वनस्पती",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१७. नदी माय (कविता) – रसूल पठाण",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• प्राणिसंग्रहालयास भेट (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. धाडसी दिशा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१९. परी (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२०. चला ग्रंथालयात जाऊ या.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२१. कैवल्य शहाणा झाला.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२२. थोरांची ओळख : संत गाडगेबाबा",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "३ री शिकू मराठी आनंदाने (Item 303000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/303000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (303000866, SHA-256 7ba0eeee01786c6a45204e2478cf45c659f9553edd2018c784c353c4b6e6893f, 12833416 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. शब्द माझे (गाणे) – सूर्यकांत मालुसरे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• पाऊस (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. सांबराची शिंगे (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. रंगांची मजा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. पाणी (कविता) – डॉ. नीलिमा गुंडी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. आरुषचा प्रामाणिकपणा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. शेतकरीदादा (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• दिवस - रात्र (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. समीरची कल्पकता",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. हिरवे हिरवे झाड (कविता) – विलास सिंदगीकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. मोबाईल आणि पुस्तक",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. गुणी मुले (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. वाढदिवसाची भेट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. छोटेसे बहीण-भाऊ (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१३. आम्ही गोष्ट सांगतो. (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१४. लपंडाव",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "• माझी सहल (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. गोगलगाय (कविता) – नारायण खरात",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. औषधी वनस्पती",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१७. नदी माय (कविता) – रसूल पठाण",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• प्राणिसंग्रहालयास भेट (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. धाडसी दिशा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१९. परी (कविता)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२०. चला ग्रंथालयात जाऊ या.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२१. कैवल्य शहाणा झाला.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२२. थोरांची ओळख : संत गाडगेबाबा",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 4__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "४ थी बालभारती हिंदी (Item 402060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/402060001.pdf",
    "verificationNote": "Verified 1 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – १. कला-कौशल",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "पहली इकाई – २. सार्वजनिक स्थल",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "पहली इकाई – ३. प्रार्थना",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "पहली इकाई – ४. बाग",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "पहली इकाई – ५. संकल्प",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "पहली इकाई – ६. जीवन",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "पहली इकाई – पुनरावर्तन – १",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "दूसरी इकाई – १. ई-पुस्तकालय",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "दूसरी इकाई – २. लोक संस्कृति",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "दूसरी इकाई – ३. चिरैया",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "दूसरी इकाई – ४. प्यारी लाड़ो",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "दूसरी इकाई – ५. पेड़ की गवाही",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "दूसरी इकाई – ६. उलझन",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "दूसरी इकाई – पुनरावर्तन – २",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "तीसरी इकाई – १. वार्षिकोत्सव",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "तीसरी इकाई – २. हमारी संस्कृति, हमारे खेल",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "तीसरी इकाई – ३. चतुर चित्रकार",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "तीसरी इकाई – ४. कूड़ेदान में पेड़",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "तीसरी इकाई – ५. संगणक का कमाल",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "तीसरी इकाई – ६. उठो! देश के लाल",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "तीसरी इकाई – पुनरावर्तन – ३",
        "sectionOrPart": "तीसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "चौथी इकाई – १. समाचार जगत",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "चौथी इकाई – २. ऊर्जा के स्रोत",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "चौथी इकाई – ३. कौन ?",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "चौथी इकाई – ४. प्लास्टिक प्रदूषण",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "चौथी इकाई – ५. मंगल का पत्र",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "चौथी इकाई – ६. हमारा भारत",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "चौथी इकाई – पुनरावर्तन – ४",
        "sectionOrPart": "चौथी इकाई",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Marathi medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Marathi medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी बालभारती हिंदी (Item 402060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/402060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (402060001, SHA-256 e63081303caca886ee29c3999ba9e1a19a1d1a9d792b2ac584690a20b90c62fb, 14423898 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. कला-कौशल",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. सार्वजनिक स्थल",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. प्रार्थना",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. बाग",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. संकल्प",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. जीवन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – पुनरावर्तन – १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "दूसरी इकाई – १. ई-पुस्तकालय",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – २. लोक संस्कृति",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – ३. चिरैया",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ४. प्यारी लाड़ो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ५. पेड़ की गवाही",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ६. उलझन",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – पुनरावर्तन – २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "तीसरी इकाई – १. वार्षिकोत्सव",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "तीसरी इकाई – २. हमारी संस्कृति, हमारे खेल",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "तीसरी इकाई – ३. चतुर चित्रकार",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "तीसरी इकाई – ४. कूड़ेदान में पेड़",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "तीसरी इकाई – ५. संगणक का कमाल",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "तीसरी इकाई – ६. उठो! देश के लाल",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "तीसरी इकाई – पुनरावर्तन – ३",
            "sectionOrPart": "तीसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "चौथी इकाई – १. समाचार जगत",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "चौथी इकाई – २. ऊर्जा के स्रोत",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "चौथी इकाई – ३. कौन ?",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "चौथी इकाई – ४. प्लास्टिक प्रदूषण",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "चौथी इकाई – ५. मंगल का पत्र",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "चौथी इकाई – ६. हमारा भारत",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "चौथी इकाई – पुनरावर्तन – ४",
            "sectionOrPart": "चौथी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Semi-English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: In Maharashtra State Board Std 1–4 curriculum, Hindi as Second/Third Language for Semi-English medium is not published separately in eBalbharati 2026 catalog (Hindi starts Std 5 for non-Hindi mediums).",
        "chapters": []
      }
    ]
  },
  "Maharashtra__Class 4__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "४ थी शिकू मराठी आनंदाने (Item 403000866) + ४ थी बालभारती मराठी (Item 401060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403000866.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. प्रकाशातले तारे तुम्ही – उमाकांत काणेकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "• माझे गाव (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "२. लोभी कुत्रा (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "३. पावसा, पावसा ये! ये! (कविता) – उषाकिरण आत्राम",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "४. पक्की मैत्री",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "५. माझा रुमाल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "६. मुंगीताई (कविता) – कल्याण इनामदार",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "• कोठे काय ? (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "७. जाऊ फुलांच्या जगात (कविता) – सूर्यकांत खांडेकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "८. मेट्रो प्रवास",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "९. मायेची पाखर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१०. झुई झुई झोका (कविता) – हेमंत मुसरीफ",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "११. ऐकावे कोणाचे ?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१२. आमचा शब्दकोश",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "• आपले सण-उत्सव (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "१३. मी पणती (कविता) – संजीवनी मराठे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "१४. चतुर बिरबल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "• अशी ही मुले",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "१५. सुंदर जग (कविता) – योगिता पिंजरकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "१६. ताडोबाची सहल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "१७. गार्गीची सुट्टी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "• आपले व्यवसाय (चित्रवर्णन)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "१८. हुरडा मेजवानी (कविता) – महादेव बुरुटे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "१९. आमचे ग्रंथालय",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "२०. दिनविशेष",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "२१. जिंकू आम्ही लढाई (कविता) – मनोहर आंधळे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "२२. धाडसी चिमणी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "२३. कचरा टाळा.",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी शिकू मराठी आनंदाने (Item 403000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (403000866, SHA-256 de36170db513f63c3577cee66ae1a1c9955fd82ab4ea54830c913136f15caecb, 15238184 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. प्रकाशातले तारे तुम्ही – उमाकांत काणेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• माझे गाव (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. लोभी कुत्रा (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. पावसा, पावसा ये! ये! (कविता) – उषाकिरण आत्राम",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. पक्की मैत्री",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. माझा रुमाल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. मुंगीताई (कविता) – कल्याण इनामदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• कोठे काय ? (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. जाऊ फुलांच्या जगात (कविता) – सूर्यकांत खांडेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. मेट्रो प्रवास",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. मायेची पाखर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. झुई झुई झोका (कविता) – हेमंत मुसरीफ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. ऐकावे कोणाचे ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. आमचा शब्दकोश",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• आपले सण-उत्सव (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. मी पणती (कविता) – संजीवनी मराठे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. चतुर बिरबल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "• अशी ही मुले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१५. सुंदर जग (कविता) – योगिता पिंजरकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१६. ताडोबाची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१७. गार्गीची सुट्टी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "• आपले व्यवसाय (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१८. हुरडा मेजवानी (कविता) – महादेव बुरुटे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "१९. आमचे ग्रंथालय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२०. दिनविशेष",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२१. जिंकू आम्ही लढाई (कविता) – मनोहर आंधळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२२. धाडसी चिमणी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२३. कचरा टाळा.",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी बालभारती मराठी (Item 401060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/401060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (401060001, SHA-256 b3507096fa130047e5b2071d57aba27b21ca0053943340db4da3f63d5dabf46e, 13290625 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. हीच अमुची प्रार्थना (प्रार्थना) – समीर सामंत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• माझा पतंग (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. सरावन मईन्यात (कविता) – लोकराम शेंडे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. कौतुकाची थाप – अय्युब पठाण लोहगावकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. आभाळातील फरकांड्या – महावीर जोंधळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. तिरंगा (कविता) – डॉ. प्रकाश गोसावी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "• माझे गाव (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "६. आनंदी-आनंद गडे! (कविता) – बालकवी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. डोंगरदादा – श. त्र्यं. पाटील",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. माझ्या आठवणी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. फुलपाखरे (कविता) – मदन हजेरी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. मुकी फुले – साने गुरुजी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "• आजोबांची अंगठी (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "११. बाभूळ (कविता) – अलकाबाई चंद्रशेखर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१२. मला माझ्या आईचा अभिमान वाटतो.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. कणाकणांत विज्ञान (नाट्यछटा) – क्षितिजा आगाशे",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. पुस्तकांच्या सहवासात – डॉ. भीमराव रामजी आंबेडकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. वासुदेव आला (कविता) – एकनाथ आव्हाड",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "• ग्रंथदिंडी (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१६. नाते जगाशी (कविता) – आश्लेषा महाजन",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१७. असा बनतो मोती – विद्या खानझोडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१८. सण आला पाडव्याचा! (कविता) – दिलीप भाऊराव पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१९. बचत – सचिन बेंडभर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२०. संतवाणी – संत सेना महाराज, संत कान्होपात्रा",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी शिकू मराठी आनंदाने (Item 403000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (403000866, SHA-256 de36170db513f63c3577cee66ae1a1c9955fd82ab4ea54830c913136f15caecb, 15238184 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. प्रकाशातले तारे तुम्ही – उमाकांत काणेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• माझे गाव (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. लोभी कुत्रा (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. पावसा, पावसा ये! ये! (कविता) – उषाकिरण आत्राम",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. पक्की मैत्री",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. माझा रुमाल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. मुंगीताई (कविता) – कल्याण इनामदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• कोठे काय ? (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. जाऊ फुलांच्या जगात (कविता) – सूर्यकांत खांडेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. मेट्रो प्रवास",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. मायेची पाखर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. झुई झुई झोका (कविता) – हेमंत मुसरीफ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. ऐकावे कोणाचे ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. आमचा शब्दकोश",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• आपले सण-उत्सव (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. मी पणती (कविता) – संजीवनी मराठे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. चतुर बिरबल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "• अशी ही मुले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१५. सुंदर जग (कविता) – योगिता पिंजरकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१६. ताडोबाची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१७. गार्गीची सुट्टी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "• आपले व्यवसाय (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१८. हुरडा मेजवानी (कविता) – महादेव बुरुटे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "१९. आमचे ग्रंथालय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२०. दिनविशेष",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२१. जिंकू आम्ही लढाई (कविता) – मनोहर आंधळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२२. धाडसी चिमणी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२३. कचरा टाळा.",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "४ थी शिकू मराठी आनंदाने (Item 403000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/403000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (403000866, SHA-256 de36170db513f63c3577cee66ae1a1c9955fd82ab4ea54830c913136f15caecb, 15238184 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. प्रकाशातले तारे तुम्ही – उमाकांत काणेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "• माझे गाव (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "२. लोभी कुत्रा (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "३. पावसा, पावसा ये! ये! (कविता) – उषाकिरण आत्राम",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. पक्की मैत्री",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. माझा रुमाल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. मुंगीताई (कविता) – कल्याण इनामदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "• कोठे काय ? (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "७. जाऊ फुलांच्या जगात (कविता) – सूर्यकांत खांडेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "८. मेट्रो प्रवास",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. मायेची पाखर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. झुई झुई झोका (कविता) – हेमंत मुसरीफ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. ऐकावे कोणाचे ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. आमचा शब्दकोश",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• आपले सण-उत्सव (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. मी पणती (कविता) – संजीवनी मराठे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. चतुर बिरबल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "• अशी ही मुले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१५. सुंदर जग (कविता) – योगिता पिंजरकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१६. ताडोबाची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१७. गार्गीची सुट्टी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "• आपले व्यवसाय (चित्रवर्णन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "१८. हुरडा मेजवानी (कविता) – महादेव बुरुटे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "१९. आमचे ग्रंथालय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२०. दिनविशेष",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२१. जिंकू आम्ही लढाई (कविता) – मनोहर आंधळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२२. धाडसी चिमणी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२३. कचरा टाळा.",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 5__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "५ वी सुलभभारती हिंदी (Item 502020020) + ५ वी बालभारती हिंदी (Item 502020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/502020020.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – आओ खेलें",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "पहली इकाई – १. नंदनवन",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "पहली इकाई – २. बूँदें",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "पहली इकाई – ३. योग्य चुनाव",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "पहली इकाई – ४. कश्मीरा",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "पहली इकाई – ५. पहचान हमारी – भाग (१)",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "पहली इकाई – ६. पेटूराम",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "पहली इकाई – ७. बधाई कार्ड",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "पहली इकाई – ८. करो और जानो",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "पहली इकाई – ९. नीम",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "पहली इकाई – १०. गड़ा धन",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "पहली इकाई – ११. मित्रता",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "पहली इकाई – १२. बचत",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "पहली इकाई – १३. पहचान हमारी – भाग (२)",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "पहली इकाई – १४. मैं सड़क हूँ",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "पहली इकाई – १५. व्यायाम",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "पहली इकाई – १६. बोलो और जानो",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "पहली इकाई – स्वयं अध्ययन / पुनरावर्तन १, २",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "दूसरी इकाई – १. गाँव और शहर",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "दूसरी इकाई – २. जीवन",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "दूसरी इकाई – ३. भाई-भाई का प्रेम",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "दूसरी इकाई – ४. बालिका दिवस",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "दूसरी इकाई – ५. रोबोट",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "दूसरी इकाई – ६. जुड़ें हम",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "दूसरी इकाई – ७. (अ) बोध / (ब) समान – विरुद्ध",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "दूसरी इकाई – ८. बीज",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "दूसरी इकाई – ९. मुझे पहचानो",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "दूसरी इकाई – १०. मुझे जानो",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 29,
        "chapterNumber": 29,
        "chapterTitle": "दूसरी इकाई – ११. वीरों को प्रणाम",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 30,
        "chapterNumber": 30,
        "chapterTitle": "दूसरी इकाई – १२. सपूत",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 31,
        "chapterNumber": 31,
        "chapterTitle": "दूसरी इकाई – १३. राष्ट्रीय त्योहार",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 32,
        "chapterNumber": 32,
        "chapterTitle": "दूसरी इकाई – १४. (अ) हम अलग – रूप एक / (ब) छुक-छुक गाड़ी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 33,
        "chapterNumber": 33,
        "chapterTitle": "दूसरी इकाई – १५. ज्ञानी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 34,
        "chapterNumber": 34,
        "chapterTitle": "दूसरी इकाई – १६. बचाव",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 35,
        "chapterNumber": 35,
        "chapterTitle": "दूसरी इकाई – १७. निरीक्षण",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 36,
        "chapterNumber": 36,
        "chapterTitle": "दूसरी इकाई – १८. चलो-चलें",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 37,
        "chapterNumber": 37,
        "chapterTitle": "दूसरी इकाई – स्वयं अध्ययन / पुनरावर्तन ३, ४ / शब्दार्थ, शब्द पहेली, उत्तर",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी सुलभभारती हिंदी (Item 502020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/502020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (502020020, SHA-256 f4c0e5d9c4e2c22d4f23c748e9bef8dd4dee064fb10ae9a18738411e5ae5aa36, 9255572 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – आओ खेलें",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – १. नंदनवन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – २. बूँदें",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ३. योग्य चुनाव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ४. कश्मीरा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ५. पहचान हमारी – भाग (१)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ६. पेटूराम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ७. बधाई कार्ड",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "पहली इकाई – ८. करो और जानो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "पहली इकाई – ९. नीम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "पहली इकाई – १०. गड़ा धन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "पहली इकाई – ११. मित्रता",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "पहली इकाई – १२. बचत",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "पहली इकाई – १३. पहचान हमारी – भाग (२)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "पहली इकाई – १४. मैं सड़क हूँ",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "पहली इकाई – १५. व्यायाम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "पहली इकाई – १६. बोलो और जानो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "पहली इकाई – स्वयं अध्ययन / पुनरावर्तन १, २",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "दूसरी इकाई – १. गाँव और शहर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "दूसरी इकाई – २. जीवन",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "दूसरी इकाई – ३. भाई-भाई का प्रेम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "दूसरी इकाई – ४. बालिका दिवस",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "दूसरी इकाई – ५. रोबोट",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "दूसरी इकाई – ६. जुड़ें हम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "दूसरी इकाई – ७. (अ) बोध / (ब) समान – विरुद्ध",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "दूसरी इकाई – ८. बीज",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "दूसरी इकाई – ९. मुझे पहचानो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "दूसरी इकाई – १०. मुझे जानो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "दूसरी इकाई – ११. वीरों को प्रणाम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "दूसरी इकाई – १२. सपूत",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "दूसरी इकाई – १३. राष्ट्रीय त्योहार",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "दूसरी इकाई – १४. (अ) हम अलग – रूप एक / (ब) छुक-छुक गाड़ी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "दूसरी इकाई – १५. ज्ञानी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "दूसरी इकाई – १६. बचाव",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "दूसरी इकाई – १७. निरीक्षण",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "दूसरी इकाई – १८. चलो-चलें",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "दूसरी इकाई – स्वयं अध्ययन / पुनरावर्तन ३, ४ / शब्दार्थ, शब्द पहेली, उत्तर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी सुलभभारती हिंदी (Item 502020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/502020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (502020020, SHA-256 f4c0e5d9c4e2c22d4f23c748e9bef8dd4dee064fb10ae9a18738411e5ae5aa36, 9255572 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – आओ खेलें",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – १. नंदनवन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – २. बूँदें",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ३. योग्य चुनाव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ४. कश्मीरा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ५. पहचान हमारी – भाग (१)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ६. पेटूराम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ७. बधाई कार्ड",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "पहली इकाई – ८. करो और जानो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "पहली इकाई – ९. नीम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "पहली इकाई – १०. गड़ा धन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "पहली इकाई – ११. मित्रता",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "पहली इकाई – १२. बचत",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "पहली इकाई – १३. पहचान हमारी – भाग (२)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "पहली इकाई – १४. मैं सड़क हूँ",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "पहली इकाई – १५. व्यायाम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "पहली इकाई – १६. बोलो और जानो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "पहली इकाई – स्वयं अध्ययन / पुनरावर्तन १, २",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "दूसरी इकाई – १. गाँव और शहर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "दूसरी इकाई – २. जीवन",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "दूसरी इकाई – ३. भाई-भाई का प्रेम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "दूसरी इकाई – ४. बालिका दिवस",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "दूसरी इकाई – ५. रोबोट",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "दूसरी इकाई – ६. जुड़ें हम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "दूसरी इकाई – ७. (अ) बोध / (ब) समान – विरुद्ध",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "दूसरी इकाई – ८. बीज",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "दूसरी इकाई – ९. मुझे पहचानो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "दूसरी इकाई – १०. मुझे जानो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "दूसरी इकाई – ११. वीरों को प्रणाम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "दूसरी इकाई – १२. सपूत",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "दूसरी इकाई – १३. राष्ट्रीय त्योहार",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "दूसरी इकाई – १४. (अ) हम अलग – रूप एक / (ब) छुक-छुक गाड़ी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "दूसरी इकाई – १५. ज्ञानी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "दूसरी इकाई – १६. बचाव",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "दूसरी इकाई – १७. निरीक्षण",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "दूसरी इकाई – १८. चलो-चलें",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "दूसरी इकाई – स्वयं अध्ययन / पुनरावर्तन ३, ४ / शब्दार्थ, शब्द पहेली, उत्तर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी बालभारती हिंदी (Item 502020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/502020001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (502020001, SHA-256 e2b481620df19a12982f54062288033b7beab42c6dfd615838df89348049289b, 13268927 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – जन्मदिन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – १. प्राकृतिक दृश्य",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – २. पथ मेरा आलोकित कर दो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ३. असली गहने",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ४. कश्मीरा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ५. बात से बात",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ६. मेरा बचपन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ७. शुभकामना कार्ड",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "पहली इकाई – ८. अपनापन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "पहली इकाई – ९. (अ) अक्षरमाला / (ब) दिमाग चलाओ",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "पहली इकाई – १०. (अ) नाम हमारे / (ब) संबोधन तुम्हारे",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "पहली इकाई – ११. अनोखा यात्री",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "पहली इकाई – १२. पंच परमेश्वर",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "पहली इकाई – १३. बूझो तो जानें",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "पहली इकाई – १४. कला का सम्मान",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "पहली इकाई – १५. कूड़ा-करकट से बिजली",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "पहली इकाई – १६. नाट्यकला",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "पहली इकाई – पुनरावर्तन – १ एवं पुनरावर्तन – २",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "दूसरी इकाई – निसर्ग खेल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "दूसरी इकाई – १. संगणक",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "दूसरी इकाई – २. रिश्ता-नाता",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "दूसरी इकाई – ३. बुद्धिमान मेमना",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "दूसरी इकाई – ४. क्या तुम जानते हो ?",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "दूसरी इकाई – ५. खूब पढ़ो – खूब खेलो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "दूसरी इकाई – ६. दिलों को जोड़ना जरूरी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "दूसरी इकाई – ७. आओ, आयु बताना सीखें",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "दूसरी इकाई – ८. ताले की कुंजी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "दूसरी इकाई – ९. (अ) हम ऐसे बने / (ब) हमसे नाम बनाओ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "दूसरी इकाई – १०. (अ) विशेषता हमारी / (ब) कार्य हमारा",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "दूसरी इकाई – ११. गुनगुनाते चलो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "दूसरी इकाई – १२. अद्भुत वीरांगना",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "दूसरी इकाई – १३. साइकिल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "दूसरी इकाई – १४. महाराष्ट्र दिवस",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "दूसरी इकाई – १५. खज्जियार: भारत का स्विट्जरलैंड",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "दूसरी इकाई – १६. स्काउट-गाइड",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "दूसरी इकाई – पुनरावर्तन – ३, पुनरावर्तन – ४, चित्रकथा, शब्दार्थ, मुहावरे-कहावतें, उत्तर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी सुलभभारती हिंदी (Item 502020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/502020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (502020020, SHA-256 f4c0e5d9c4e2c22d4f23c748e9bef8dd4dee064fb10ae9a18738411e5ae5aa36, 9255572 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – आओ खेलें",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – १. नंदनवन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – २. बूँदें",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ३. योग्य चुनाव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ४. कश्मीरा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ५. पहचान हमारी – भाग (१)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ६. पेटूराम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ७. बधाई कार्ड",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "पहली इकाई – ८. करो और जानो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "पहली इकाई – ९. नीम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "पहली इकाई – १०. गड़ा धन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "पहली इकाई – ११. मित्रता",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "पहली इकाई – १२. बचत",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "पहली इकाई – १३. पहचान हमारी – भाग (२)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "पहली इकाई – १४. मैं सड़क हूँ",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "पहली इकाई – १५. व्यायाम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "पहली इकाई – १६. बोलो और जानो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "पहली इकाई – स्वयं अध्ययन / पुनरावर्तन १, २",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "दूसरी इकाई – १. गाँव और शहर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "दूसरी इकाई – २. जीवन",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "दूसरी इकाई – ३. भाई-भाई का प्रेम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "दूसरी इकाई – ४. बालिका दिवस",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "दूसरी इकाई – ५. रोबोट",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "दूसरी इकाई – ६. जुड़ें हम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "दूसरी इकाई – ७. (अ) बोध / (ब) समान – विरुद्ध",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "दूसरी इकाई – ८. बीज",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "दूसरी इकाई – ९. मुझे पहचानो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "दूसरी इकाई – १०. मुझे जानो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 29,
            "chapterNumber": 29,
            "chapterTitle": "दूसरी इकाई – ११. वीरों को प्रणाम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 30,
            "chapterNumber": 30,
            "chapterTitle": "दूसरी इकाई – १२. सपूत",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 31,
            "chapterNumber": 31,
            "chapterTitle": "दूसरी इकाई – १३. राष्ट्रीय त्योहार",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 32,
            "chapterNumber": 32,
            "chapterTitle": "दूसरी इकाई – १४. (अ) हम अलग – रूप एक / (ब) छुक-छुक गाड़ी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 33,
            "chapterNumber": 33,
            "chapterTitle": "दूसरी इकाई – १५. ज्ञानी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 34,
            "chapterNumber": 34,
            "chapterTitle": "दूसरी इकाई – १६. बचाव",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 35,
            "chapterNumber": 35,
            "chapterTitle": "दूसरी इकाई – १७. निरीक्षण",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 36,
            "chapterNumber": 36,
            "chapterTitle": "दूसरी इकाई – १८. चलो-चलें",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 37,
            "chapterNumber": 37,
            "chapterTitle": "दूसरी इकाई – स्वयं अध्ययन / पुनरावर्तन ३, ४ / शब्दार्थ, शब्द पहेली, उत्तर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 5__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "५ वी सुलभभारती मराठी (Item 501020020) + ५ वी बालभारती मराठी (Item 501020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020020.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. नाच रे मोरा (गाणे) – ग. दि. माडगूळकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "२. हत्तीचे चातुर्य (चित्रकथा)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "३. खेळूया शब्दांशी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "४. ही पिसे कोणाची?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "५. डराव डराव! (कविता) – ग. ह. पाटील",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "६. ऐकूया. खेळूया.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "७. खेळत खेळत वाचूया!",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "८. कोणापासून काय घ्यावे? (कविता) – निलम माणगावे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "९. सिंह आणि बेडूक (चित्रकथा) – मुकुंद तळवलकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "१०. बैलपोळा (कविता) – धोंडीरामसिंह राजपूत",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "११. इंधनबचत",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१२. बोलावे कसे?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "१३. अनुभव – १",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१४. चित्रसंदेश",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "१५. नदीचे गाणे (कविता) – वि. म. कुलकर्णी",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "१६. मी नदी बोलते...",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "१७. आमची सहल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "१८. पैशांचे व्यवहार",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "१९. अनुभव – २",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "२०. गमतीदार पत्र",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "२१. छोटेसे बहीणभाऊ (कविता) – वसंत बापट",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "२२. वाचूया. लिहूया.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "२३. प्रामाणिक इस्त्रीवाला",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "२४. ऐका. पाहा. करा.",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "२५. मालतीची चतुराई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "२६. पतंग (कविता) – अ. झा. पुराणिक",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "२७. महर्षी विठ्ठल रामजी शिंदे – डॉ. भि. ना. दहातोंडे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 28,
        "chapterNumber": 28,
        "chapterTitle": "२८. फुलपाखरू आणि मधमाशी – बाळ गाडगीळ",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी सुलभभारती मराठी (Item 501020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (501020020, SHA-256 6ec07e47bfd0a4d6aa0ee90dd75f80d3a16ba9c200c1f6c82558186007961818, 10339879 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. नाच रे मोरा (गाणे) – ग. दि. माडगूळकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. हत्तीचे चातुर्य (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. खेळूया शब्दांशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. ही पिसे कोणाची?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. डराव डराव! (कविता) – ग. ह. पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. ऐकूया. खेळूया.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. खेळत खेळत वाचूया!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. कोणापासून काय घ्यावे? (कविता) – निलम माणगावे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. सिंह आणि बेडूक (चित्रकथा) – मुकुंद तळवलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. बैलपोळा (कविता) – धोंडीरामसिंह राजपूत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. इंधनबचत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. बोलावे कसे?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अनुभव – १",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. चित्रसंदेश",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. नदीचे गाणे (कविता) – वि. म. कुलकर्णी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. मी नदी बोलते...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. आमची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. पैशांचे व्यवहार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. अनुभव – २",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. गमतीदार पत्र",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. छोटेसे बहीणभाऊ (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२२. वाचूया. लिहूया.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२३. प्रामाणिक इस्त्रीवाला",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२४. ऐका. पाहा. करा.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२५. मालतीची चतुराई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२६. पतंग (कविता) – अ. झा. पुराणिक",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२७. महर्षी विठ्ठल रामजी शिंदे – डॉ. भि. ना. दहातोंडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२८. फुलपाखरू आणि मधमाशी – बाळ गाडगीळ",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी बालभारती मराठी (Item 501020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (501020001, SHA-256 4b958a4385425a1226a528d7c58d21fde08254b69eed85b97c2c522edede6926, 15377439 bytes, TOC pp.9,10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. माय मराठी! (गाणे) – संजीवनी मराठे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. बंडूची इजार (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. वल्हवा रं वल्हवा (गाणे) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. सावरपाडा एक्स्प्रेस : कविता राऊत – संतोष साबळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. मुंग्यांच्या जगात – प्रकाश किसन नवाळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. माहेर (कविता) – सदाशिव माळी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. अरण्यलिपी – सुरेशचंद्र वारघडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. प्रिय बाई...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. जनाई – शंकर पाटील",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. रंग जादुचे पेटीमधले (कविता) – पद्मिनी बिनीवाले",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. कठीण समय येता... – मनोहर भोसले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. माळीण गाव : एक घटना",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. सण एक दिन! (कविता) – यशवंत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. राष्ट्रसंत तुकडोजीमहाराज – सुदाम सावरकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. आपल्या समस्या – आपले उपाय",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. स्वच्छतेचा प्रकाश – यदुनाथ थत्ते, डॉ. अनिल गोडबोले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. पुस्तके (कविता) – सफदर हाश्मी (अनुवादित)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. कारागिरी – डॉ. सरोजिनी बाबर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. वासरू (कविता) – अनिल",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. माझं शाळेचं नक्की झालं! – विमल मोरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• वाचूया, समजून घेऊया.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२१. प्रश्न विचारा पुन्हा पुन्हा (कविता) – गौरीशंकर गंगा",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२२. अति तिथं माती – द. मा. मिरासदार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२३. छत्रपती राजर्षी शाहूमहाराज – श्रीराम पचिंद्रे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२४. कापणी (कविता) – बहिणाबाई चौधरी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२५. ढोल – संजय लोहकरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२६. पाण्याची गोष्ट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२७. अभंग – संत जनाबाई, संत सेनामहाराज, संत नामदेव",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी सुलभभारती मराठी (Item 501020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (501020020, SHA-256 6ec07e47bfd0a4d6aa0ee90dd75f80d3a16ba9c200c1f6c82558186007961818, 10339879 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. नाच रे मोरा (गाणे) – ग. दि. माडगूळकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. हत्तीचे चातुर्य (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. खेळूया शब्दांशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. ही पिसे कोणाची?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. डराव डराव! (कविता) – ग. ह. पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. ऐकूया. खेळूया.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. खेळत खेळत वाचूया!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. कोणापासून काय घ्यावे? (कविता) – निलम माणगावे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. सिंह आणि बेडूक (चित्रकथा) – मुकुंद तळवलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. बैलपोळा (कविता) – धोंडीरामसिंह राजपूत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. इंधनबचत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. बोलावे कसे?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अनुभव – १",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. चित्रसंदेश",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. नदीचे गाणे (कविता) – वि. म. कुलकर्णी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. मी नदी बोलते...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. आमची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. पैशांचे व्यवहार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. अनुभव – २",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. गमतीदार पत्र",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. छोटेसे बहीणभाऊ (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२२. वाचूया. लिहूया.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२३. प्रामाणिक इस्त्रीवाला",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२४. ऐका. पाहा. करा.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२५. मालतीची चतुराई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२६. पतंग (कविता) – अ. झा. पुराणिक",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२७. महर्षी विठ्ठल रामजी शिंदे – डॉ. भि. ना. दहातोंडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२८. फुलपाखरू आणि मधमाशी – बाळ गाडगीळ",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "५ वी सुलभभारती मराठी (Item 501020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2015 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/501020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (501020020, SHA-256 6ec07e47bfd0a4d6aa0ee90dd75f80d3a16ba9c200c1f6c82558186007961818, 10339879 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. नाच रे मोरा (गाणे) – ग. दि. माडगूळकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. हत्तीचे चातुर्य (चित्रकथा)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. खेळूया शब्दांशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. ही पिसे कोणाची?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. डराव डराव! (कविता) – ग. ह. पाटील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. ऐकूया. खेळूया.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. खेळत खेळत वाचूया!",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. कोणापासून काय घ्यावे? (कविता) – निलम माणगावे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. सिंह आणि बेडूक (चित्रकथा) – मुकुंद तळवलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. बैलपोळा (कविता) – धोंडीरामसिंह राजपूत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. इंधनबचत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. बोलावे कसे?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अनुभव – १",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. चित्रसंदेश",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. नदीचे गाणे (कविता) – वि. म. कुलकर्णी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. मी नदी बोलते...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. आमची सहल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. पैशांचे व्यवहार",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. अनुभव – २",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. गमतीदार पत्र",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. छोटेसे बहीणभाऊ (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२२. वाचूया. लिहूया.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२३. प्रामाणिक इस्त्रीवाला",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "२४. ऐका. पाहा. करा.",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "२५. मालतीची चतुराई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "२६. पतंग (कविता) – अ. झा. पुराणिक",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "२७. महर्षी विठ्ठल रामजी शिंदे – डॉ. भि. ना. दहातोंडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "२८. फुलपाखरू आणि मधमाशी – बाळ गाडगीळ",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 6__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "६ वी बालभारती हिंदी (Item 602060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2025/2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/602060001.pdf",
    "verificationNote": "Verified 1 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – छुट्टियों का मौसम (पूर्वानुभव)",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "पहली इकाई – १. हम हैं आदिवासी (चित्रवर्णन)",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "पहली इकाई – २. ठुकरा दो या प्यार करो (प्रार्थना) – सुभद्राकुमारी चौहान",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "पहली इकाई – ३. श्यामा का न्याय (कहानी) – श्यामलता गुप्ता",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "पहली इकाई – ४. पानी का पत्र (पत्र लेखन) – डॉ. डी. डी. ओझा",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "पहली इकाई – ५. ओला (कविता) – मैथिलीशरण गुप्त",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "पहली इकाई – ६. साहसी बेटी (साहस कथा) – रजनीकांत शुक्ल",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "पहली इकाई – ७. चूहा और मैं (हास्य-व्यंग्य निबंध) – हरिशंकर परसाई",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "पहली इकाई – ८. बूझो तो जानें (पहेलियाँ) – रीमा पाराशर",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "पहली इकाई – ९. कच्चा घड़ा (एकांकी) – शकुंतला अग्रवाल",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "drama"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "पहली इकाई – १०. गौरव के पल (चित्र संयोजन (कोलाज))",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "पहली इकाई – ११. जन-जन के गीत (निबंध) – डॉ. मीरा सिंह",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "पहली इकाई – पुनरावर्तन १",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "दूसरी इकाई – त्योहार (पूर्वानुभव)",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "दूसरी इकाई – १. हमारे लोकनृत्य (चित्रवर्णन)",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "दूसरी इकाई – २. आम मँजरायल (लोकगीत) – विभा रानी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "दूसरी इकाई – ३. बैलोंवाली कार (कहानी) – डॉ. अरविंद दुबे",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "दूसरी इकाई – ४. अमृत वाणी (दोहे) – वृंद और रहीम",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "दूसरी इकाई – ५. प्रेरक संस्कार (कथा एवं लघुकथा) – श्रीकृष्ण",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "दूसरी इकाई – ६. सोना-माटी (गीतिनाट्य) – कीर्ति चौधरी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "drama"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "दूसरी इकाई – ७. मिसाइल मैन (साक्षात्कार) – डॉ. ओ. पी. झा",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "दूसरी इकाई – ८. साप्ताहिक धमाका (कहानी) – डॉ. हरिकृष्ण देवसरे",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 23,
        "chapterNumber": 23,
        "chapterTitle": "दूसरी इकाई – ९. हमको आना है... (गजल) – किशन तिवारी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 24,
        "chapterNumber": 24,
        "chapterTitle": "दूसरी इकाई – १०. युवा दिवस (विज्ञापन)",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 25,
        "chapterNumber": 25,
        "chapterTitle": "दूसरी इकाई – ११. पूर्वोत्तर भारत के त्योहार (निबंध) – अरविंद",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 26,
        "chapterNumber": 26,
        "chapterTitle": "दूसरी इकाई – १२. कदम-कदम बढ़ाए जा (प्रयाण गीत) – वंशीधर शुक्ल",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 27,
        "chapterNumber": 27,
        "chapterTitle": "दूसरी इकाई – पुनरावर्तन २",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: No standalone Second/Third-Language Hindi Sulabhbharati textbook published in eBalbharati 2026 Class 6 catalog; only First-Language Hindi Balbharati (602060001) verified.",
        "chapters": []
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Marathi medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: No standalone Second/Third-Language Hindi Sulabhbharati textbook published in eBalbharati 2026 Class 6 catalog; only First-Language Hindi Balbharati (602060001) verified.",
        "chapters": []
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "६ वी बालभारती हिंदी (Item 602060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025/2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/602060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (602060001, SHA-256 9ebe91857576ffc83ef7d0d5ba54eec57ee09b5dc209eb3470fbe2470f2a8cc4, 85746896 bytes, TOC pp.11,12).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – छुट्टियों का मौसम (पूर्वानुभव)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – १. हम हैं आदिवासी (चित्रवर्णन)",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – २. ठुकरा दो या प्यार करो (प्रार्थना) – सुभद्राकुमारी चौहान",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ३. श्यामा का न्याय (कहानी) – श्यामलता गुप्ता",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ४. पानी का पत्र (पत्र लेखन) – डॉ. डी. डी. ओझा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ५. ओला (कविता) – मैथिलीशरण गुप्त",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ६. साहसी बेटी (साहस कथा) – रजनीकांत शुक्ल",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ७. चूहा और मैं (हास्य-व्यंग्य निबंध) – हरिशंकर परसाई",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "पहली इकाई – ८. बूझो तो जानें (पहेलियाँ) – रीमा पाराशर",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "पहली इकाई – ९. कच्चा घड़ा (एकांकी) – शकुंतला अग्रवाल",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "पहली इकाई – १०. गौरव के पल (चित्र संयोजन (कोलाज))",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "पहली इकाई – ११. जन-जन के गीत (निबंध) – डॉ. मीरा सिंह",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "पहली इकाई – पुनरावर्तन १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – त्योहार (पूर्वानुभव)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – १. हमारे लोकनृत्य (चित्रवर्णन)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – २. आम मँजरायल (लोकगीत) – विभा रानी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "दूसरी इकाई – ३. बैलोंवाली कार (कहानी) – डॉ. अरविंद दुबे",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "दूसरी इकाई – ४. अमृत वाणी (दोहे) – वृंद और रहीम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "दूसरी इकाई – ५. प्रेरक संस्कार (कथा एवं लघुकथा) – श्रीकृष्ण",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "दूसरी इकाई – ६. सोना-माटी (गीतिनाट्य) – कीर्ति चौधरी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "दूसरी इकाई – ७. मिसाइल मैन (साक्षात्कार) – डॉ. ओ. पी. झा",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "दूसरी इकाई – ८. साप्ताहिक धमाका (कहानी) – डॉ. हरिकृष्ण देवसरे",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "दूसरी इकाई – ९. हमको आना है... (गजल) – किशन तिवारी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "दूसरी इकाई – १०. युवा दिवस (विज्ञापन)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "दूसरी इकाई – ११. पूर्वोत्तर भारत के त्योहार (निबंध) – अरविंद",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "दूसरी इकाई – १२. कदम-कदम बढ़ाए जा (प्रयाण गीत) – वंशीधर शुक्ल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "दूसरी इकाई – पुनरावर्तन २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "Hindi (Semi-English medium – Second/Third Language) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: No standalone Second/Third-Language Hindi Sulabhbharati textbook published in eBalbharati 2026 Class 6 catalog; only First-Language Hindi Balbharati (602060001) verified.",
        "chapters": []
      }
    ]
  },
  "Maharashtra__Class 6__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "६ वी शिकू मराठी आनंदाने (Item 603000866) + ६ वी बालभारती मराठी (Item 601060001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2025/2026 (NEP 2020 Revised Edition)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/603000866.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. या भारतात बंधुभाव (प्रार्थना) – राष्ट्रसंत श्री तुकडोजी महाराज",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "२. चिमणीचं घरटं – अद्वैता उमराणीकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "३. जिकडे तिकडे पाणीच पाणी (कविता) – शंकर वैद्य",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "• चित्रवाचन",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "४. आम्ही महाराष्ट्रकन्या (कविता) – पद्मा गोळे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "५. आईस पत्र...",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "६. अमुचा बाग किती छान (कविता) – यशवंत देव",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "७. आजोबांचा तीन पुडांचा डबा – अदिती देवधर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "८. नव्या युगाची गाणी (कविता) – वंदना विटणकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "९. निसर्गरम्य माथेरान – सुशील दुधाणे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "• अनुभव लेखन / • बातमी आकलन",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१०. मी मोठा की लहान? – सुनंदा उमर्जी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "११. गवतफुला रे! गवतफुला! (कविता) – इंदिरा संत",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१२. जाहिरात",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "१३. गणितातील एक कूटप्रश्न – दिवाकर बापट",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "१४. सुगी (कविता) – संतोष आळंजकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "१५. थोरांची ओळख (डॉ. ए. पी. जे. अब्दुल कलाम / लालबहादूर शास्त्री – बाबुसिंग राठोड)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "१६. मायबोली (कविता) – सुरेश भट",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "१७. आपली संस्कृती, आपल्या परंपरा",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "१८. नवा ऋतू (कविता) – राजेंद्र आरेकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "१९. भिकूतात्यांची भंबेरी – प्र. के. अत्रे (• माझा अनुभव)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 22,
        "chapterNumber": 22,
        "chapterTitle": "२०. विचारधन",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "६ वी शिकू मराठी आनंदाने (Item 603000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025/2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/603000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (603000866, SHA-256 56bb89f3ec6a9785b2e2b70b5290aa966f9b6d3268270fbf4c3d3a474e979ff0, 14049212 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. या भारतात बंधुभाव (प्रार्थना) – राष्ट्रसंत श्री तुकडोजी महाराज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. चिमणीचं घरटं – अद्वैता उमराणीकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. जिकडे तिकडे पाणीच पाणी (कविता) – शंकर वैद्य",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "• चित्रवाचन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. आम्ही महाराष्ट्रकन्या (कविता) – पद्मा गोळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. आईस पत्र...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. अमुचा बाग किती छान (कविता) – यशवंत देव",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. आजोबांचा तीन पुडांचा डबा – अदिती देवधर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. नव्या युगाची गाणी (कविता) – वंदना विटणकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "९. निसर्गरम्य माथेरान – सुशील दुधाणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "• अनुभव लेखन / • बातमी आकलन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. मी मोठा की लहान? – सुनंदा उमर्जी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. गवतफुला रे! गवतफुला! (कविता) – इंदिरा संत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. जाहिरात",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१३. गणितातील एक कूटप्रश्न – दिवाकर बापट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१४. सुगी (कविता) – संतोष आळंजकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१५. थोरांची ओळख (डॉ. ए. पी. जे. अब्दुल कलाम / लालबहादूर शास्त्री – बाबुसिंग राठोड)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१६. मायबोली (कविता) – सुरेश भट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१७. आपली संस्कृती, आपल्या परंपरा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१८. नवा ऋतू (कविता) – राजेंद्र आरेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१९. भिकूतात्यांची भंबेरी – प्र. के. अत्रे (• माझा अनुभव)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२०. विचारधन",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "६ वी बालभारती मराठी (Item 601060001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025/2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/601060001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (601060001, SHA-256 264c853641526d2307170d802d2cfdfc848f90b34a837123863aa510f17e89bc, 82655867 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. सत्य शिवाहून सुंदर हे (प्रार्थना) – जगदीश खेबूडकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. पुस्तक माझा गुरू – संदीप खरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. आला पाऊस (कविता) – निर्मला देशपांडे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. अनुभवांच्या खाणी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. प्रकाशयात्री (कविता) – कल्याण इनामदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. राष्ट्रध्वज माझा अभिमान – स्वप्ना गोवेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. खोप्यामधी खोपा (कविता) – बहिणाबाई चौधरी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. चांदोबास पत्र",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. गीत मराठी गाऊ या (कविता) – प्रा. रामदास केदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. लोकनृत्ये – डॉ. सरोजिनी बाबर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. भल्लगडी दादा (कविता) – शाहीर कुंदन कांबळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. धाडसी रोहन – दिलीप फलटणकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. फिटे अंधाराचे जाळे (कविता) – सुधीर मोघे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. रक्षण पर्यावरणाचे – दिलीप कुलकर्णी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. आंब्याचा मोहर – देवीदास बागूल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. आम्ही असू वेगळे (कविता) – संजीवनी बोकील",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. संगणकातील ‘परम’पूज्य – कविता भालेराव",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. हा देश माझा (कविता) – सेनापती बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. खरी संपत्ती – सुधा मूर्ती",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. विचारधन",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "६ वी शिकू मराठी आनंदाने (Item 603000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025/2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/603000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (603000866, SHA-256 56bb89f3ec6a9785b2e2b70b5290aa966f9b6d3268270fbf4c3d3a474e979ff0, 14049212 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. या भारतात बंधुभाव (प्रार्थना) – राष्ट्रसंत श्री तुकडोजी महाराज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. चिमणीचं घरटं – अद्वैता उमराणीकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. जिकडे तिकडे पाणीच पाणी (कविता) – शंकर वैद्य",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "• चित्रवाचन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. आम्ही महाराष्ट्रकन्या (कविता) – पद्मा गोळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. आईस पत्र...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. अमुचा बाग किती छान (कविता) – यशवंत देव",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. आजोबांचा तीन पुडांचा डबा – अदिती देवधर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. नव्या युगाची गाणी (कविता) – वंदना विटणकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "९. निसर्गरम्य माथेरान – सुशील दुधाणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "• अनुभव लेखन / • बातमी आकलन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. मी मोठा की लहान? – सुनंदा उमर्जी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. गवतफुला रे! गवतफुला! (कविता) – इंदिरा संत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. जाहिरात",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१३. गणितातील एक कूटप्रश्न – दिवाकर बापट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१४. सुगी (कविता) – संतोष आळंजकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१५. थोरांची ओळख (डॉ. ए. पी. जे. अब्दुल कलाम / लालबहादूर शास्त्री – बाबुसिंग राठोड)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१६. मायबोली (कविता) – सुरेश भट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१७. आपली संस्कृती, आपल्या परंपरा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१८. नवा ऋतू (कविता) – राजेंद्र आरेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१९. भिकूतात्यांची भंबेरी – प्र. के. अत्रे (• माझा अनुभव)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२०. विचारधन",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "६ वी शिकू मराठी आनंदाने (Item 603000866)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2025/2026 (NEP 2020 Revised Edition)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/603000866.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (603000866, SHA-256 56bb89f3ec6a9785b2e2b70b5290aa966f9b6d3268270fbf4c3d3a474e979ff0, 14049212 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. या भारतात बंधुभाव (प्रार्थना) – राष्ट्रसंत श्री तुकडोजी महाराज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. चिमणीचं घरटं – अद्वैता उमराणीकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. जिकडे तिकडे पाणीच पाणी (कविता) – शंकर वैद्य",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "• चित्रवाचन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "४. आम्ही महाराष्ट्रकन्या (कविता) – पद्मा गोळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. आईस पत्र...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. अमुचा बाग किती छान (कविता) – यशवंत देव",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. आजोबांचा तीन पुडांचा डबा – अदिती देवधर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. नव्या युगाची गाणी (कविता) – वंदना विटणकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "९. निसर्गरम्य माथेरान – सुशील दुधाणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "• अनुभव लेखन / • बातमी आकलन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. मी मोठा की लहान? – सुनंदा उमर्जी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. गवतफुला रे! गवतफुला! (कविता) – इंदिरा संत",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. जाहिरात",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१३. गणितातील एक कूटप्रश्न – दिवाकर बापट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१४. सुगी (कविता) – संतोष आळंजकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१५. थोरांची ओळख (डॉ. ए. पी. जे. अब्दुल कलाम / लालबहादूर शास्त्री – बाबुसिंग राठोड)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१६. मायबोली (कविता) – सुरेश भट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१७. आपली संस्कृती, आपल्या परंपरा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१८. नवा ऋतू (कविता) – राजेंद्र आरेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१९. भिकूतात्यांची भंबेरी – प्र. के. अत्रे (• माझा अनुभव)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "२०. विचारधन",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 7__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "७ वी सुगमभारती हिंदी (Item 702020021) + ७ वी बालभारती हिंदी (Item 702020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/702020021.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – १. वाचन मेला",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "पहली इकाई – २. विश्वव्यापक प्रेम",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "पहली इकाई – ३. अपकार का उपकार",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "पहली इकाई – ४. वार्षिकोत्सव",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "पहली इकाई – ५. (अ) गणित का जादू / (ब) पहेली / (स) अचंभा",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "पहली इकाई – ६. परिश्रम ही पूजा",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "पहली इकाई – ७. कुछ पाकर देख",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "पहली इकाई – अभ्यास – १ एवं पुनरावर्तन – १",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "दूसरी इकाई – १. अस्पताल",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "दूसरी इकाई – २. सब चढ़ा दो वहाँ",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "दूसरी इकाई – ३. अलग अंदाज में होली",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "दूसरी इकाई – ४. सोनू हाथी",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "दूसरी इकाई – ५. (अ) असली गवाह / (ब) जीवन",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "दूसरी इकाई – ६. कुछ स्मृतियाँ",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "दूसरी इकाई – ७. प्यारा देश",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "दूसरी इकाई – अभ्यास – २, अभ्यास – ३ (चित्रकथा) एवं पुनरावर्तन – २",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी सुगमभारती हिंदी (Item 702020021)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/702020021.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (702020021, SHA-256 e4d6681aee59de5a4095f9ece04f9f89bf776cfbcd65a608fe813996e3f84a7c, 8073774 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. वाचन मेला",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. विश्वव्यापक प्रेम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. अपकार का उपकार",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. वार्षिकोत्सव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. (अ) गणित का जादू / (ब) पहेली / (स) अचंभा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. परिश्रम ही पूजा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. कुछ पाकर देख",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – अभ्यास – १ एवं पुनरावर्तन – १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – १. अस्पताल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – २. सब चढ़ा दो वहाँ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ३. अलग अंदाज में होली",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ४. सोनू हाथी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ५. (अ) असली गवाह / (ब) जीवन",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – ६. कुछ स्मृतियाँ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – ७. प्यारा देश",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – अभ्यास – २, अभ्यास – ३ (चित्रकथा) एवं पुनरावर्तन – २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी सुगमभारती हिंदी (Item 702020021)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/702020021.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (702020021, SHA-256 e4d6681aee59de5a4095f9ece04f9f89bf776cfbcd65a608fe813996e3f84a7c, 8073774 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. वाचन मेला",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. विश्वव्यापक प्रेम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. अपकार का उपकार",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. वार्षिकोत्सव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. (अ) गणित का जादू / (ब) पहेली / (स) अचंभा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. परिश्रम ही पूजा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. कुछ पाकर देख",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – अभ्यास – १ एवं पुनरावर्तन – १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – १. अस्पताल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – २. सब चढ़ा दो वहाँ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ३. अलग अंदाज में होली",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ४. सोनू हाथी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ५. (अ) असली गवाह / (ब) जीवन",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – ६. कुछ स्मृतियाँ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – ७. प्यारा देश",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – अभ्यास – २, अभ्यास – ३ (चित्रकथा) एवं पुनरावर्तन – २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी बालभारती हिंदी (Item 702020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/702020001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (702020001, SHA-256 c41ec92c3e20eae87c0417b28a2b6f375cdb7bbd4301be238cf533d12326c7c2, 20510267 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. अभयारण्य",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. गुनगुनाते रहो",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. मुक्ति का प्रतिदान",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. पहचानो तो !",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. चिड़िया की पाती",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. हँसिकाएँ",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. बादलों की काव्य सृष्टि",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ८. चित्र बोलते हैं",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "पहली इकाई – ९. एक सैर ऐसी भी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "पहली इकाई – १०. (अ) दो गजलें / (ब) एक मटका बुद्धि",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "पहली इकाई – ११. प्रगति",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "पहली इकाई – १२. जादुई अँगूठी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "पहली इकाई – १३. मेरे देश के लाल",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "पहली इकाई – अभ्यास-१ एवं पुनरावर्तन – १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – १. कृषि प्रयोगशाला",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – २. मधुऋतु",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "दूसरी इकाई – ३. काकी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "दूसरी इकाई – ४. संदेश",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "दूसरी इकाई – ५. आलस का सुख",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "दूसरी इकाई – ६. अक्लमंदी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "दूसरी इकाई – ७. साक्षात्कार",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "दूसरी इकाई – ८. पद",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "दूसरी इकाई – ९. ऐसे उतारी आरती",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "दूसरी इकाई – १०. दिव्यांग",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "दूसरी इकाई – ११. रोजी और निक्की",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 26,
            "chapterNumber": 26,
            "chapterTitle": "दूसरी इकाई – १२. स्कूल चलो",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 27,
            "chapterNumber": 27,
            "chapterTitle": "दूसरी इकाई – १३. धन्यवाद",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 28,
            "chapterNumber": 28,
            "chapterTitle": "दूसरी इकाई – अभ्यास – २, अभ्यास – ३ (चित्रकथा) एवं पुनरावर्तन – २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी सुगमभारती हिंदी (Item 702020021)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/702020021.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (702020021, SHA-256 e4d6681aee59de5a4095f9ece04f9f89bf776cfbcd65a608fe813996e3f84a7c, 8073774 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. वाचन मेला",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. विश्वव्यापक प्रेम",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. अपकार का उपकार",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. वार्षिकोत्सव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. (अ) गणित का जादू / (ब) पहेली / (स) अचंभा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. परिश्रम ही पूजा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. कुछ पाकर देख",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – अभ्यास – १ एवं पुनरावर्तन – १",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – १. अस्पताल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – २. सब चढ़ा दो वहाँ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ३. अलग अंदाज में होली",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ४. सोनू हाथी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ५. (अ) असली गवाह / (ब) जीवन",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – ६. कुछ स्मृतियाँ",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – ७. प्यारा देश",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – अभ्यास – २, अभ्यास – ३ (चित्रकथा) एवं पुनरावर्तन – २",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 7__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "७ वी सुलभभारती मराठी (Item 701020020) + ७ वी बालभारती मराठी (Item 701020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/701020020.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. प्रार्थना – जगदीश खेबूडकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "२. श्यामचे बंधुप्रेम – सानेगुरुजी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "३. माझ्या अंगणात (कविता) – ज्ञानेश्वर कोळी",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "४. गोपाळचे शौर्य – लक्ष्मीकमल गेडाम",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "५. दादास पत्र (• आम्ही सूचनाफलक वाचतो.)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "६. टप् टप् पडती (कविता) – मंगेश पाडगांवकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "७. आजारी पडण्याचा प्रयोग – द. मा. मिरासदार (• आपली समस्या आपले उपाय–१ / • आम्ही जाहिरात वाचतो.)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "८. शब्दांचे घर (कविता) – कल्याण इनामदार",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "९. वाचनाचे वेड – आशा पाटील (• आम्ही बातमी वाचतो.)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "१०. पंडिता रमाबाई – डॉ. अनुपमा उजगरे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "११. लेक (कविता) – अस्मिता जोगदंड-चांदणे (• आपली समस्या आपले उपाय–२)",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१२. रोजनिशी",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "१३. अदलाबदल – पन्नालाल पटेल",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१४. संतवाणी – संत जनाबाई, संत तुकाराम",
        "sectionType": "poem"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी सुलभभारती मराठी (Item 701020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/701020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (701020020, SHA-256 6d0e365293873535cad7850d709138d2eb4a1cca92427ac376160307d9305a71, 14892148 bytes, TOC pp.11).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. प्रार्थना – जगदीश खेबूडकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. श्यामचे बंधुप्रेम – सानेगुरुजी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. माझ्या अंगणात (कविता) – ज्ञानेश्वर कोळी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. गोपाळचे शौर्य – लक्ष्मीकमल गेडाम",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. दादास पत्र (• आम्ही सूचनाफलक वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. टप् टप् पडती (कविता) – मंगेश पाडगांवकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. आजारी पडण्याचा प्रयोग – द. मा. मिरासदार (• आपली समस्या आपले उपाय–१ / • आम्ही जाहिरात वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. शब्दांचे घर (कविता) – कल्याण इनामदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. वाचनाचे वेड – आशा पाटील (• आम्ही बातमी वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. पंडिता रमाबाई – डॉ. अनुपमा उजगरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. लेक (कविता) – अस्मिता जोगदंड-चांदणे (• आपली समस्या आपले उपाय–२)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. रोजनिशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अदलाबदल – पन्नालाल पटेल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. संतवाणी – संत जनाबाई, संत तुकाराम",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी बालभारती मराठी (Item 701020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/701020001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (701020001, SHA-256 1d4970a0219a3b18c9cf4030b2613074d9855334a2eb1ff1966062fede8b7f80, 29707004 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. जय जय महाराष्ट्र माझा (गीत) – राजा बढे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. स्वप्नं विकणारा माणूस – अशोक कोतवाल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. तोडणी – दत्तात्रय विरकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. श्रावणमास (कविता) – बालकवी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. भांड्यांच्या दुनियेत",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. थोरांची ओळख – डॉ. खानखोजे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. माझी मराठी (कविता) – मृणालिनी कानिटकर-जोशी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. गचकअंधारी – अशोक मानकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. नात्याबाहेरचं नातं – सुभाष किन्होळकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. गोमू माहेरला जाते (गीत) – ग. दि. माडगूळकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. बाली बेट – पु. ल. देशपांडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. सलाम-नमस्ते ! – सुधा मूर्ती",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अनाम वीरा... (कविता) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. कवितेची ओळख – शारदा दराडे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. असे जगावे (कविता) – गुरू ठाकूर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. कोळीण – मारुती चितमपल्ली",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. थेंब आज हा पाण्याचा (कविता) – सुनंदा भावसार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. वदनी कवळ घेता...",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. धोंडा – डॉ. संजय ढोले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. विचारधन",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. संतवाणी – संत नरहरी सोनार, संत कान्होपात्रा",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी सुलभभारती मराठी (Item 701020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/701020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (701020020, SHA-256 6d0e365293873535cad7850d709138d2eb4a1cca92427ac376160307d9305a71, 14892148 bytes, TOC pp.11).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. प्रार्थना – जगदीश खेबूडकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. श्यामचे बंधुप्रेम – सानेगुरुजी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. माझ्या अंगणात (कविता) – ज्ञानेश्वर कोळी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. गोपाळचे शौर्य – लक्ष्मीकमल गेडाम",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. दादास पत्र (• आम्ही सूचनाफलक वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. टप् टप् पडती (कविता) – मंगेश पाडगांवकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. आजारी पडण्याचा प्रयोग – द. मा. मिरासदार (• आपली समस्या आपले उपाय–१ / • आम्ही जाहिरात वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. शब्दांचे घर (कविता) – कल्याण इनामदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. वाचनाचे वेड – आशा पाटील (• आम्ही बातमी वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. पंडिता रमाबाई – डॉ. अनुपमा उजगरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. लेक (कविता) – अस्मिता जोगदंड-चांदणे (• आपली समस्या आपले उपाय–२)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. रोजनिशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अदलाबदल – पन्नालाल पटेल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. संतवाणी – संत जनाबाई, संत तुकाराम",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "७ वी सुलभभारती मराठी (Item 701020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/701020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (701020020, SHA-256 6d0e365293873535cad7850d709138d2eb4a1cca92427ac376160307d9305a71, 14892148 bytes, TOC pp.11).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. प्रार्थना – जगदीश खेबूडकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. श्यामचे बंधुप्रेम – सानेगुरुजी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. माझ्या अंगणात (कविता) – ज्ञानेश्वर कोळी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. गोपाळचे शौर्य – लक्ष्मीकमल गेडाम",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. दादास पत्र (• आम्ही सूचनाफलक वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. टप् टप् पडती (कविता) – मंगेश पाडगांवकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. आजारी पडण्याचा प्रयोग – द. मा. मिरासदार (• आपली समस्या आपले उपाय–१ / • आम्ही जाहिरात वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. शब्दांचे घर (कविता) – कल्याण इनामदार",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. वाचनाचे वेड – आशा पाटील (• आम्ही बातमी वाचतो.)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. पंडिता रमाबाई – डॉ. अनुपमा उजगरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. लेक (कविता) – अस्मिता जोगदंड-चांदणे (• आपली समस्या आपले उपाय–२)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. रोजनिशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. अदलाबदल – पन्नालाल पटेल",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. संतवाणी – संत जनाबाई, संत तुकाराम",
            "sectionType": "poem"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 8__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "८ वी सुगमभारती हिंदी (Item 802020021) + ८ वी बालभारती हिंदी (Item 802020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/802020021.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "पहली इकाई – १. हृदय का उजाला (गीत) – रमाकांत यादव",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "पहली इकाई – २. उसी से ठंडा, उसी से गरम (हास्य कथा) – डॉ. जाकिर हुसैन",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "पहली इकाई – ३. गाना-बजाना (विवरणात्मक निबंध) – रामवृक्ष बेनीपुरी",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "पहली इकाई – ४. श्रद्धा और प्रयास (पत्र) – काका कालेलकर",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "पहली इकाई – ५. सुनो और गुनो (आधुनिक दोहे) – गोपालदास सक्सेना ‘नीरज’",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "पहली इकाई – ६. और प्रेमचंद जी चले गए (संस्मरण) – डॉ. रामकुमार वर्मा",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "पहली इकाई – ७. हींगवाला (संवादात्मक कहानी) – सुभद्राकुमारी चौहान",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "पहली इकाई – ८. कदम मिलाकर चलना होगा (नवगीत) – अटलबिहारी वाजपेयी",
        "sectionOrPart": "पहली इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "दूसरी इकाई – १. पंपासर (खंडकाव्य का अंश) – नरेश मेहता",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "दूसरी इकाई – २. परोपकार (लघुकथा) – श्रीकृष्ण",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "दूसरी इकाई – ३. आत्मनिर्भरता (वैचारिक निबंध) – आचार्य रामचंद्र शुक्ल",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "दूसरी इकाई – ४. तुम मुझे खून दो (भाषण) – नेताजी सुभाषचंद्र बोस",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "दूसरी इकाई – ५. संतवाणी (पद / महाकाव्य का अंश) – संत मीराबाई, गोस्वामी तुलसीदास",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "दूसरी इकाई – ६. प्राकृतिक सौंदर्य से पूर्ण ‘अल्मोड़ा’ (यात्रा वर्णन) – डॉ. इसरार ‘गुनेश’",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "दूसरी इकाई – ७. सम्मेलन अंगों का (एकांकी) – श्रीप्रसाद",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "drama"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "दूसरी इकाई – ८. जिंदगी का सफर (गजल) – नंदलाल पाठक (व्याकरण तथा रचना विभाग एवं भावार्थ सहित)",
        "sectionOrPart": "दूसरी इकाई",
        "sectionType": "grammar"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी सुगमभारती हिंदी (Item 802020021)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/802020021.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (802020021, SHA-256 eb915eac18966fd0d93e7742849342569af5bf9626ec2d1fed63160277118fc0, 4210555 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. हृदय का उजाला (गीत) – रमाकांत यादव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. उसी से ठंडा, उसी से गरम (हास्य कथा) – डॉ. जाकिर हुसैन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. गाना-बजाना (विवरणात्मक निबंध) – रामवृक्ष बेनीपुरी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. श्रद्धा और प्रयास (पत्र) – काका कालेलकर",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. सुनो और गुनो (आधुनिक दोहे) – गोपालदास सक्सेना ‘नीरज’",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. और प्रेमचंद जी चले गए (संस्मरण) – डॉ. रामकुमार वर्मा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. हींगवाला (संवादात्मक कहानी) – सुभद्राकुमारी चौहान",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ८. कदम मिलाकर चलना होगा (नवगीत) – अटलबिहारी वाजपेयी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – १. पंपासर (खंडकाव्य का अंश) – नरेश मेहता",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – २. परोपकार (लघुकथा) – श्रीकृष्ण",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ३. आत्मनिर्भरता (वैचारिक निबंध) – आचार्य रामचंद्र शुक्ल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ४. तुम मुझे खून दो (भाषण) – नेताजी सुभाषचंद्र बोस",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ५. संतवाणी (पद / महाकाव्य का अंश) – संत मीराबाई, गोस्वामी तुलसीदास",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – ६. प्राकृतिक सौंदर्य से पूर्ण ‘अल्मोड़ा’ (यात्रा वर्णन) – डॉ. इसरार ‘गुनेश’",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – ७. सम्मेलन अंगों का (एकांकी) – श्रीप्रसाद",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – ८. जिंदगी का सफर (गजल) – नंदलाल पाठक (व्याकरण तथा रचना विभाग एवं भावार्थ सहित)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "grammar"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी सुगमभारती हिंदी (Item 802020021)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/802020021.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (802020021, SHA-256 eb915eac18966fd0d93e7742849342569af5bf9626ec2d1fed63160277118fc0, 4210555 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. हृदय का उजाला (गीत) – रमाकांत यादव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. उसी से ठंडा, उसी से गरम (हास्य कथा) – डॉ. जाकिर हुसैन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. गाना-बजाना (विवरणात्मक निबंध) – रामवृक्ष बेनीपुरी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. श्रद्धा और प्रयास (पत्र) – काका कालेलकर",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. सुनो और गुनो (आधुनिक दोहे) – गोपालदास सक्सेना ‘नीरज’",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. और प्रेमचंद जी चले गए (संस्मरण) – डॉ. रामकुमार वर्मा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. हींगवाला (संवादात्मक कहानी) – सुभद्राकुमारी चौहान",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ८. कदम मिलाकर चलना होगा (नवगीत) – अटलबिहारी वाजपेयी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – १. पंपासर (खंडकाव्य का अंश) – नरेश मेहता",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – २. परोपकार (लघुकथा) – श्रीकृष्ण",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ३. आत्मनिर्भरता (वैचारिक निबंध) – आचार्य रामचंद्र शुक्ल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ४. तुम मुझे खून दो (भाषण) – नेताजी सुभाषचंद्र बोस",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ५. संतवाणी (पद / महाकाव्य का अंश) – संत मीराबाई, गोस्वामी तुलसीदास",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – ६. प्राकृतिक सौंदर्य से पूर्ण ‘अल्मोड़ा’ (यात्रा वर्णन) – डॉ. इसरार ‘गुनेश’",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – ७. सम्मेलन अंगों का (एकांकी) – श्रीप्रसाद",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – ८. जिंदगी का सफर (गजल) – नंदलाल पाठक (व्याकरण तथा रचना विभाग एवं भावार्थ सहित)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "grammar"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी बालभारती हिंदी (Item 802020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/802020001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (802020001, SHA-256 4eb9c41acc5c38609cd95f6f3df70767cd5381dc575376fbeddc55da398b7317, 4637088 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. डुबा दो अहंकार (गीत) – रवींद्रनाथ टैगोर",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. गीत (कहानी) – सलाम बिन रजाक",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. सेल्फी का शौक (वैचारिक निबंध) – अनिल कुमार जैन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. क्या करेगा तू बता (कविता) – डॉ. सुधाकर मिश्रा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. मन का रोगी (एकांकी) – राम निरंजन शर्मा ‘ठिमाऊ’",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. दारागंज के वे दिन (संस्मरण) – पुष्पा भारती",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. धूप की उष्मित छुवन से (गजल) – रामदरश मिश्र",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ८. नरई (यात्रा वर्णन) – डॉ. श्रीकांत उपाध्याय",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "पहली इकाई – ९. रज्जब चाचा (कहानी) – व्यथित हृदय",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "पहली इकाई – १०. बातें प्रेमचंद की (चरित्रात्मक वार्तालाप) – अवधनारायण मुद्गल",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "पहली इकाई – ११. मयूर पंख (पद) – जगन्नाथदास रत्नाकर",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – १. इनसान (नवगीत) – रमानाथ अवस्थी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – २. चप्पल (मनोवैज्ञानिक कहानी) – कमलेश्वर",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – ३. मान न मान; मैं तेरा मेहमान (हास्य-व्यंग्य निबंध) – संजीव निगम",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – ४. प्रभात (नई कविता) – भारतभूषण अग्रवाल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – ५. हारना भी हिम्मत का काम है (आलेख) – शरबानी बैनर्जी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "दूसरी इकाई – ६. बंटी (उपन्यास का अंश) – मन्नू भंडारी",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "दूसरी इकाई – ७. अनमोल वचन (साखी) – दादू दयाल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "दूसरी इकाई – ८. साहित्य की सच्चाई (भाषण) – जैनेंद्र कुमार",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "दूसरी इकाई – ९. शब्दकोश (बातचीत) – डॉ. सरोज प्रकाश",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "दूसरी इकाई – १०. मेरे जेबकतरे के नाम (पत्र) – हरिशंकर परसाई",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "दूसरी इकाई – ११. परिवर्तन (गीतिनाट्य का अंश) – दुष्यंत कुमार (व्याकरण एवं रचना विभाग तथा भावार्थ सहित)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "drama"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी सुगमभारती हिंदी (Item 802020021)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/802020021.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (802020021, SHA-256 eb915eac18966fd0d93e7742849342569af5bf9626ec2d1fed63160277118fc0, 4210555 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "पहली इकाई – १. हृदय का उजाला (गीत) – रमाकांत यादव",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "पहली इकाई – २. उसी से ठंडा, उसी से गरम (हास्य कथा) – डॉ. जाकिर हुसैन",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "पहली इकाई – ३. गाना-बजाना (विवरणात्मक निबंध) – रामवृक्ष बेनीपुरी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "पहली इकाई – ४. श्रद्धा और प्रयास (पत्र) – काका कालेलकर",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "पहली इकाई – ५. सुनो और गुनो (आधुनिक दोहे) – गोपालदास सक्सेना ‘नीरज’",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "पहली इकाई – ६. और प्रेमचंद जी चले गए (संस्मरण) – डॉ. रामकुमार वर्मा",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "पहली इकाई – ७. हींगवाला (संवादात्मक कहानी) – सुभद्राकुमारी चौहान",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "पहली इकाई – ८. कदम मिलाकर चलना होगा (नवगीत) – अटलबिहारी वाजपेयी",
            "sectionOrPart": "पहली इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "दूसरी इकाई – १. पंपासर (खंडकाव्य का अंश) – नरेश मेहता",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "दूसरी इकाई – २. परोपकार (लघुकथा) – श्रीकृष्ण",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "दूसरी इकाई – ३. आत्मनिर्भरता (वैचारिक निबंध) – आचार्य रामचंद्र शुक्ल",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "दूसरी इकाई – ४. तुम मुझे खून दो (भाषण) – नेताजी सुभाषचंद्र बोस",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "दूसरी इकाई – ५. संतवाणी (पद / महाकाव्य का अंश) – संत मीराबाई, गोस्वामी तुलसीदास",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "दूसरी इकाई – ६. प्राकृतिक सौंदर्य से पूर्ण ‘अल्मोड़ा’ (यात्रा वर्णन) – डॉ. इसरार ‘गुनेश’",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "दूसरी इकाई – ७. सम्मेलन अंगों का (एकांकी) – श्रीप्रसाद",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "drama"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "दूसरी इकाई – ८. जिंदगी का सफर (गजल) – नंदलाल पाठक (व्याकरण तथा रचना विभाग एवं भावार्थ सहित)",
            "sectionOrPart": "दूसरी इकाई",
            "sectionType": "grammar"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 8__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "८ वी सुलभभारती मराठी (Item 801020020) + ८ वी बालभारती मराठी (Item 801020001)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/801020020.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. आम्ही चालवू हा पुढे वारसा (गीत) – जगदीश खेबूडकर",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "२. मी चित्रकार कसा झालो! – ल. म. कडू",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "३. प्रभात (कविता) – किशोर बळी",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "४. आपण सारे एक – प्रभा बैकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "५. घाटात घाट वरंधाघाट – महेश तेंडुलकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "६. आभाळाची अम्ही लेकरे (कविता) – वसंत बापट",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "७. नातवंडांस पत्र – नंदू नाटेकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "८. गिर्यारोहणाचा अनुभव – रमेश महाले",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "९. झुळूक (कविता) – दामोदर कारे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "१०. आम्ही हवे आहोत का? – शांता शेळके",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "११. जीवन गाणे (कविता) – नितीन देशमुख",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१२. शब्दकोश (स्थूलवाचन)",
        "sectionType": "rapid_reading"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "१३. संतवाणी – (अ) संत सेना महाराज, (आ) संत चोखामेळा",
        "sectionType": "poem"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी सुलभभारती मराठी (Item 801020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/801020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (801020020, SHA-256 232101c4fb8c3b3e5800e9521685b74088b7c88d92b5a45551efafbc6270e53f, 5944672 bytes, TOC pp.11).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. आम्ही चालवू हा पुढे वारसा (गीत) – जगदीश खेबूडकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. मी चित्रकार कसा झालो! – ल. म. कडू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. प्रभात (कविता) – किशोर बळी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. आपण सारे एक – प्रभा बैकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. घाटात घाट वरंधाघाट – महेश तेंडुलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. आभाळाची अम्ही लेकरे (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. नातवंडांस पत्र – नंदू नाटेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. गिर्यारोहणाचा अनुभव – रमेश महाले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. झुळूक (कविता) – दामोदर कारे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. आम्ही हवे आहोत का? – शांता शेळके",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. जीवन गाणे (कविता) – नितीन देशमुख",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. शब्दकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. संतवाणी – (अ) संत सेना महाराज, (आ) संत चोखामेळा",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी बालभारती मराठी (Item 801020001)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/801020001.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (801020001, SHA-256 2da6952bc6f93bff01804d59e1dbc486409ca3add93523bb57b3bc101412d174, 6022692 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. भारत देश महान (गीत) – माधव विचारे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. माझ्या देशावर माझे प्रेम आहे – यदुनाथ थत्ते",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. लाखाच्या...कोटीच्या गप्पा – वसंत जोशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. नव्या युगाचे गाणे (कविता) – वि. भा. नेमाडे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. सुरांची जादूगिरी – डॉ. द. ता. भोसले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. असा रंगारी श्रावण (कविता) – ऐश्वर्य पाटेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. अण्णा भाऊंची भेट – विठ्ठल उमप",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. धाडसी कॅप्टन : राधिका मेनन – मच्छिंद्र ऐनापुरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. विद्याप्रशंसा (कविता) – कृष्णशास्त्री चिपळूणकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. लिओनार्दो दा व्हिंची (स्थूलवाचन) – अच्युत गोडबोले, दीपा देशमुख",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. स्वामी विवेकानंदांची भारतयात्रा – सुनील चिंचोलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. गोधडी (कविता) – डॉ. कैलास दौंड",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. पाड्यावरचा चहा – गोदावरी परुळेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१४. फुलपाखरे – वि. पां. दांडेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१५. आळाशी (कविता) – हनुमंत चांदगुडे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१६. चोच आणि चारा – मकरंद जोशी",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१७. अन्नजाल (कविता) – हर्ष सदाशिव परचुरे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१८. जलदिंडी – डॉ. विश्वास येवले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१९. गे मायभू (कविता) – सुरेश भट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "२०. शब्दकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "२१. संतवाणी – (अ) संत तुकाराम (आ) संत सावता माळी",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी सुलभभारती मराठी (Item 801020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/801020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (801020020, SHA-256 232101c4fb8c3b3e5800e9521685b74088b7c88d92b5a45551efafbc6270e53f, 5944672 bytes, TOC pp.11).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. आम्ही चालवू हा पुढे वारसा (गीत) – जगदीश खेबूडकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. मी चित्रकार कसा झालो! – ल. म. कडू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. प्रभात (कविता) – किशोर बळी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. आपण सारे एक – प्रभा बैकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. घाटात घाट वरंधाघाट – महेश तेंडुलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. आभाळाची अम्ही लेकरे (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. नातवंडांस पत्र – नंदू नाटेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. गिर्यारोहणाचा अनुभव – रमेश महाले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. झुळूक (कविता) – दामोदर कारे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. आम्ही हवे आहोत का? – शांता शेळके",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. जीवन गाणे (कविता) – नितीन देशमुख",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. शब्दकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. संतवाणी – (अ) संत सेना महाराज, (आ) संत चोखामेळा",
            "sectionType": "poem"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "८ वी सुलभभारती मराठी (Item 801020020)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2018 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/801020020.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (801020020, SHA-256 232101c4fb8c3b3e5800e9521685b74088b7c88d92b5a45551efafbc6270e53f, 5944672 bytes, TOC pp.11).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. आम्ही चालवू हा पुढे वारसा (गीत) – जगदीश खेबूडकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. मी चित्रकार कसा झालो! – ल. म. कडू",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. प्रभात (कविता) – किशोर बळी",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. आपण सारे एक – प्रभा बैकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. घाटात घाट वरंधाघाट – महेश तेंडुलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. आभाळाची अम्ही लेकरे (कविता) – वसंत बापट",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. नातवंडांस पत्र – नंदू नाटेकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. गिर्यारोहणाचा अनुभव – रमेश महाले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. झुळूक (कविता) – दामोदर कारे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. आम्ही हवे आहोत का? – शांता शेळके",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. जीवन गाणे (कविता) – नितीन देशमुख",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. शब्दकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. संतवाणी – (अ) संत सेना महाराज, (आ) संत चोखामेळा",
            "sectionType": "poem"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 9__Marathi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "९ वी अक्षरभारती मराठी (Item 901000616) + ९ वी कुमारभारती मराठी (Item 901030024)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/901000616.pdf",
    "verificationNote": "Verified 2 official eBalbharati PDF(s) via SHA-256 & 180 DPI Devanagari TOC transcription. Discrete mediumVariants populated for all 4 Maharashtra mediums.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. सर्वात्मका शिवसुंदरा (प्रार्थना) – कुसुमाग्रज",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "२. संतवाणी – (अ) भेटीलागी जीवा – संत तुकाराम / (आ) संतकृपा झाली – संत बहिणाबाई",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "३. ‘बेटा, मी ऐकतो आहे!’ – व. पु. काळे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "४. जी. आय. पी. रेल्वे – प्रबोधनकार ठाकरे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "• काझीरंगा (स्थूलवाचन) – वसंत अवसरे",
        "sectionType": "rapid_reading"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "५. व्यायामाचे महत्त्व (कविता) – राष्ट्रसंत श्री तुकडोजी महाराज",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "६. ऑलिंपिक वर्तुळांचा गोफ – बाळ ज. पंडित",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "७. दिव्याच्या शोधामागचे दिव्य – डॉ. अनिल गोडबोले",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "८. सखू आजी – राजन गवस",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "• हास्यचित्रांतली मुलं (स्थूलवाचन) – मधुकर धर्मापुरीकर",
        "sectionType": "rapid_reading"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "९. उजाड उघडे माळरानही (कविता) – ललिता गादगे",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१०. कुलूप – श्री. कृ. कोल्हटकर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "११. आभाळातल्या पाऊलवाटा",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "१२. पुन्हा एकदा (कविता) – प्रतिमा इंगोले",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "• व्हेनिस (स्थूलवाचन) – रमेश मंत्री",
        "sectionType": "rapid_reading"
      },
      {
        "sequenceIndex": 16,
        "chapterNumber": 16,
        "chapterTitle": "१३. तिफन (कविता) – विठ्ठल वाघ",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 17,
        "chapterNumber": 17,
        "chapterTitle": "१४. ते जीवनदायी झाड – भारत सासणे",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 18,
        "chapterNumber": 18,
        "chapterTitle": "१५. माझे शिक्षक व संस्कार – शंकरराव खरात",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 19,
        "chapterNumber": 19,
        "chapterTitle": "१६. शब्दांचा खेळ – हेलन केलर",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 20,
        "chapterNumber": 20,
        "chapterTitle": "• विश्वकोश (स्थूलवाचन)",
        "sectionType": "rapid_reading"
      },
      {
        "sequenceIndex": 21,
        "chapterNumber": 21,
        "chapterTitle": "• उपयोजित लेखन",
        "sectionType": "grammar"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "९ वी अक्षरभारती मराठी (Item 901000616)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/901000616.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (901000616, SHA-256 866b35f553b24b1d8080c355b125abed247e23f880f50c49cf0af63f69dfb8b9, 7021904 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. सर्वात्मका शिवसुंदरा (प्रार्थना) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. संतवाणी – (अ) भेटीलागी जीवा – संत तुकाराम / (आ) संतकृपा झाली – संत बहिणाबाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. ‘बेटा, मी ऐकतो आहे!’ – व. पु. काळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. जी. आय. पी. रेल्वे – प्रबोधनकार ठाकरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "• काझीरंगा (स्थूलवाचन) – वसंत अवसरे",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. व्यायामाचे महत्त्व (कविता) – राष्ट्रसंत श्री तुकडोजी महाराज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. ऑलिंपिक वर्तुळांचा गोफ – बाळ ज. पंडित",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. दिव्याच्या शोधामागचे दिव्य – डॉ. अनिल गोडबोले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. सखू आजी – राजन गवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "• हास्यचित्रांतली मुलं (स्थूलवाचन) – मधुकर धर्मापुरीकर",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. उजाड उघडे माळरानही (कविता) – ललिता गादगे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. कुलूप – श्री. कृ. कोल्हटकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. आभाळातल्या पाऊलवाटा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. पुन्हा एकदा (कविता) – प्रतिमा इंगोले",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• व्हेनिस (स्थूलवाचन) – रमेश मंत्री",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. तिफन (कविता) – विठ्ठल वाघ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. ते जीवनदायी झाड – भारत सासणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. माझे शिक्षक व संस्कार – शंकरराव खरात",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. शब्दांचा खेळ – हेलन केलर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "• विश्वकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• उपयोजित लेखन",
            "sectionType": "grammar"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "First Language",
        "status": "VERIFIED",
        "textbookTitle": "९ वी कुमारभारती मराठी (Item 901030024)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/901030024.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (901030024, SHA-256 fbe60f93464cb2e66e9fa7568e9ad858c10e79313b22399577e338c7085a7094, 7156603 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. वंद्य ‘वन्दे मातरम्’ (गीत) – ग. दि. माडगूळकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. संतवाणी – (अ) जैसा वृक्ष नेणे – संत नामदेव / (आ) धरिला पंढरीचा चोर – संत जनाबाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. कीर्ती कठीयाचा दृष्टांत – म्हाइंभट",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. नात्यांची घट्ट वीण – मीरा शिंदे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. एक होती समई – उत्तम कांबळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "• हास्यचित्रांतली मुलं (स्थूलवाचन) – मधुकर धर्मापुरीकर",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. या झोपडीत माझ्या (कविता) – राष्ट्रसंत श्री तुकडोजी महाराज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. दुपार – राजीव बर्वे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. अभियंत्यांचे दैवत – डॉ. विश्वेश्वरय्या – डॉ. यशवंत पाटणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "९. मी वाचवतोय (कविता) – सतीश काळसेकर",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "१०. यंत्रांनी केलं बंड – भालबा केळकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "• इंग्लंडचा हिवाळा (स्थूलवाचन) – इरावती कर्वे",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. मातीची सावली – स्टॅन्ली गोनसाल्विस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. महाराष्ट्रावरूनी टाक ओवाळून काया (पोवाडा) – अण्णा भाऊ साठे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "१३. थोडं ‘आ’ भारनियमन करूया – मंगला गोडबोले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१४. आदर्शवादी मुळगावकर – गोविंद तळवलकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१५. निरोप (कविता) – पद्मा गोळे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "• ‘बिग ५’च्या सहवासात (स्थूलवाचन) – जयप्रकाश प्रधान",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. वनवासी (कविता) – तुकाराम धांडे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "१७. ऑलिंपिक वर्तुळांचा गोफ – बाळ ज. पंडित",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "१८. हसरे दुःख – भा. द. खेर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 22,
            "chapterNumber": 22,
            "chapterTitle": "१९. प्रीतम – माधुरी शानभाग",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 23,
            "chapterNumber": 23,
            "chapterTitle": "२०. आपुले जगणे... आपुली ओळख ! (कविता) – संदीप खरे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 24,
            "chapterNumber": 24,
            "chapterTitle": "• विश्वकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 25,
            "chapterNumber": 25,
            "chapterTitle": "• उपयोजित लेखन",
            "sectionType": "grammar"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "९ वी अक्षरभारती मराठी (Item 901000616)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/901000616.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (901000616, SHA-256 866b35f553b24b1d8080c355b125abed247e23f880f50c49cf0af63f69dfb8b9, 7021904 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. सर्वात्मका शिवसुंदरा (प्रार्थना) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. संतवाणी – (अ) भेटीलागी जीवा – संत तुकाराम / (आ) संतकृपा झाली – संत बहिणाबाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. ‘बेटा, मी ऐकतो आहे!’ – व. पु. काळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. जी. आय. पी. रेल्वे – प्रबोधनकार ठाकरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "• काझीरंगा (स्थूलवाचन) – वसंत अवसरे",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. व्यायामाचे महत्त्व (कविता) – राष्ट्रसंत श्री तुकडोजी महाराज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. ऑलिंपिक वर्तुळांचा गोफ – बाळ ज. पंडित",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. दिव्याच्या शोधामागचे दिव्य – डॉ. अनिल गोडबोले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. सखू आजी – राजन गवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "• हास्यचित्रांतली मुलं (स्थूलवाचन) – मधुकर धर्मापुरीकर",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. उजाड उघडे माळरानही (कविता) – ललिता गादगे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. कुलूप – श्री. कृ. कोल्हटकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. आभाळातल्या पाऊलवाटा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. पुन्हा एकदा (कविता) – प्रतिमा इंगोले",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• व्हेनिस (स्थूलवाचन) – रमेश मंत्री",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. तिफन (कविता) – विठ्ठल वाघ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. ते जीवनदायी झाड – भारत सासणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. माझे शिक्षक व संस्कार – शंकरराव खरात",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. शब्दांचा खेळ – हेलन केलर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "• विश्वकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• उपयोजित लेखन",
            "sectionType": "grammar"
          }
        ]
      },
      {
        "medium": "Semi-English",
        "languageRole": "Second / Third Language",
        "status": "VERIFIED",
        "textbookTitle": "९ वी अक्षरभारती मराठी (Item 901000616)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2017 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/901000616.pdf",
        "verificationNote": "Verified via SHA-256 + 180 DPI visual Devanagari TOC transcription from official eBalbharati PDF (901000616, SHA-256 866b35f553b24b1d8080c355b125abed247e23f880f50c49cf0af63f69dfb8b9, 7021904 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. सर्वात्मका शिवसुंदरा (प्रार्थना) – कुसुमाग्रज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. संतवाणी – (अ) भेटीलागी जीवा – संत तुकाराम / (आ) संतकृपा झाली – संत बहिणाबाई",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. ‘बेटा, मी ऐकतो आहे!’ – व. पु. काळे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. जी. आय. पी. रेल्वे – प्रबोधनकार ठाकरे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "• काझीरंगा (स्थूलवाचन) – वसंत अवसरे",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "५. व्यायामाचे महत्त्व (कविता) – राष्ट्रसंत श्री तुकडोजी महाराज",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "६. ऑलिंपिक वर्तुळांचा गोफ – बाळ ज. पंडित",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "७. दिव्याच्या शोधामागचे दिव्य – डॉ. अनिल गोडबोले",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "८. सखू आजी – राजन गवस",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "• हास्यचित्रांतली मुलं (स्थूलवाचन) – मधुकर धर्मापुरीकर",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "९. उजाड उघडे माळरानही (कविता) – ललिता गादगे",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१०. कुलूप – श्री. कृ. कोल्हटकर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "११. आभाळातल्या पाऊलवाटा",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "१२. पुन्हा एकदा (कविता) – प्रतिमा इंगोले",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "• व्हेनिस (स्थूलवाचन) – रमेश मंत्री",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 16,
            "chapterNumber": 16,
            "chapterTitle": "१३. तिफन (कविता) – विठ्ठल वाघ",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 17,
            "chapterNumber": 17,
            "chapterTitle": "१४. ते जीवनदायी झाड – भारत सासणे",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 18,
            "chapterNumber": 18,
            "chapterTitle": "१५. माझे शिक्षक व संस्कार – शंकरराव खरात",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 19,
            "chapterNumber": 19,
            "chapterTitle": "१६. शब्दांचा खेळ – हेलन केलर",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 20,
            "chapterNumber": 20,
            "chapterTitle": "• विश्वकोश (स्थूलवाचन)",
            "sectionType": "rapid_reading"
          },
          {
            "sequenceIndex": 21,
            "chapterNumber": 21,
            "chapterTitle": "• उपयोजित लेखन",
            "sectionType": "grammar"
          }
        ]
      }
    ]
  },
  "Maharashtra__Class 9__Environmental Education": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "Water Security / जल सुरक्षा – Class 9 (Balbharati)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "Latest year 2020 (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/903000681.pdf",
    "verificationNote": "Verified English (903000681, 15 ch) and Marathi (901000681, 15 ch) eBalbharati Jal Suraksha PDFs; Hindi & Semi-English remain explicitly PENDING_VERIFICATION.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Water cycle",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "River system",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "Watershed area and water types",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Soil and rock type",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Water structure - Well, Lake, etc",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Concept of Water Conservation",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Catchment/Watershed treatment",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "Water Recharge",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "Water is the basis of life",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Our water consumption",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "The journey of water : Dam to house",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "What is water management ?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "Water Quality and Criteria",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 14,
        "chapterNumber": 14,
        "chapterTitle": "How to maintain the quality of water?",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 15,
        "chapterNumber": 15,
        "chapterTitle": "Water Pollution : Causes, Effects and Remedies.",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "९ वी जल सुरक्षा इंग्रजी (Item 903000681)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2020 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/903000681.pdf",
        "verificationNote": "Verified from official eBalbharati Jal Suraksha PDF (903000681, SHA-256 1d57a274d8a0d2eca6e9dbb0abbae2e1039111dc42ec0861435e63d7986b4f9d, 8024265 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Water cycle",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "River system",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "Watershed area and water types",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Soil and rock type",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Water structure - Well, Lake, etc",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Concept of Water Conservation",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Catchment/Watershed treatment",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Water Recharge",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Water is the basis of life",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Our water consumption",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "The journey of water : Dam to house",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "What is water management ?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "Water Quality and Criteria",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "How to maintain the quality of water?",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "Water Pollution : Causes, Effects and Remedies.",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "९ वी जल सुरक्षा मराठी (Item 901000681)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2020 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/901000681.pdf",
        "verificationNote": "Verified from official eBalbharati Jal Suraksha PDF (901000681, SHA-256 0fcbaa1ecace6f8fb6882d2cde7c09c4a3062109b823f380b34f6c0aa515e40d, 7845954 bytes, TOC pp.10).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "घटक १ (जलशिक्षण) – १. जलचक्र",
            "sectionOrPart": "घटक १ (जलशिक्षण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "घटक १ (जलशिक्षण) – २. नदी प्रणाली",
            "sectionOrPart": "घटक १ (जलशिक्षण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "घटक १ (जलशिक्षण) – ३. पाणलोट क्षेत्र आणि पाणी प्रकार",
            "sectionOrPart": "घटक १ (जलशिक्षण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "घटक १ (जलशिक्षण) – ४. माती व खडक प्रकार",
            "sectionOrPart": "घटक १ (जलशिक्षण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "घटक २ (जलसंधारण) – १. जलसंरचना",
            "sectionOrPart": "घटक २ (जलसंधारण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "घटक २ (जलसंधारण) – २. जलसंधारण – संकल्पना",
            "sectionOrPart": "घटक २ (जलसंधारण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "घटक २ (जलसंधारण) – ३. पाणलोट क्षेत्र व उपचार",
            "sectionOrPart": "घटक २ (जलसंधारण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "घटक २ (जलसंधारण) – ४. जलपुनर्भरण",
            "sectionOrPart": "घटक २ (जलसंधारण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "घटक ३ (जलव्यवस्थापन) – १. पाणी जीवनाचा आधार",
            "sectionOrPart": "घटक ३ (जलव्यवस्थापन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "घटक ३ (जलव्यवस्थापन) – २. आपला पाणी वापर",
            "sectionOrPart": "घटक ३ (जलव्यवस्थापन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "घटक ३ (जलव्यवस्थापन) – ३. पाण्याचा प्रवास – धरण ते घर",
            "sectionOrPart": "घटक ३ (जलव्यवस्थापन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "घटक ३ (जलव्यवस्थापन) – ४. जल व्यवस्थापन म्हणजे काय ?",
            "sectionOrPart": "घटक ३ (जलव्यवस्थापन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "घटक ४ (जलगुणवत्ता) – १. पाण्याची गुणवत्ता व निकष",
            "sectionOrPart": "घटक ४ (जलगुणवत्ता)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 14,
            "chapterNumber": 14,
            "chapterTitle": "घटक ४ (जलगुणवत्ता) – २. पाण्याची गुणवत्ता कशी टिकवावी ?",
            "sectionOrPart": "घटक ४ (जलगुणवत्ता)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 15,
            "chapterNumber": 15,
            "chapterTitle": "घटक ४ (जलगुणवत्ता) – ३. जलप्रदूषण – कारणे, परिणाम व उपाय",
            "sectionOrPart": "घटक ४ (जलगुणवत्ता)",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Subject Textbook",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "जल सुरक्षा / Water Security (Class 9 – Hindi Medium) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: No Class 9 Hindi Jal Suraksha PDF published in Balbharati 2026 catalog.",
        "chapters": []
      },
      {
        "medium": "Semi-English",
        "languageRole": "Subject Textbook",
        "status": "SCHOOL_TEXTBOOK_DEPENDENT",
        "textbookTitle": "जल सुरक्षा / Water Security (Class 9 – Semi-English Medium · School Edition Choice)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Balbharati Dual Edition (English / Marathi)",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "School-dependent medium assignment: Balbharati publishes identical Water Security (English) and जल सुरक्षा (Marathi) editions; Semi-English schools assign either edition per school policy. Switch to English or Marathi medium to view the verified official textbook index.",
        "chapters": []
      }
    ]
  },
  "Maharashtra__Class 10__Environmental Education": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "Water Security / जल सुरक्षा – Class 10 (Balbharati)",
    "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
    "academicYearEdition": "Latest year 2020 (eBalbharati 2026 portal)",
    "applicableMediums": [
      "English",
      "Marathi",
      "Hindi",
      "Semi-English"
    ],
    "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/1003000681.pdf",
    "verificationNote": "Verified English (1003000681, 12 ch) and Marathi (1001000681, 12 ch) eBalbharati Jal Suraksha PDFs; Hindi & Semi-English remain explicitly PENDING_VERIFICATION.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "Environment and Ecosystem",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "Cultural Heritage of Water Wisdom",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "Measurement of Water",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "Water Plan",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "Development of Watershed Area",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "Water Conservation and Public Participation",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "Water Condition and Water Challenges in Maharashtra",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "Irrigation",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "Water Acts and Rules",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "Water Purification and Sewage (Wastewater) Management",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "Environmental Life Style",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "Planning of Underground Saline Water",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "English",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "१० वी जल सुरक्षा इंग्रजी (Item 1003000681)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Latest year 2020 (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/1003000681.pdf",
        "verificationNote": "Verified from official eBalbharati Jal Suraksha PDF (1003000681, SHA-256 8eef2363519d13eeb08e520f7cd566066433b99ba9c2295a1930f9f0f8aa81fd, 5171993 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "Environment and Ecosystem",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "Cultural Heritage of Water Wisdom",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "Measurement of Water",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "Water Plan",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "Development of Watershed Area",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "Water Conservation and Public Participation",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "Water Condition and Water Challenges in Maharashtra",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "Irrigation",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "Water Acts and Rules",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "Water Purification and Sewage (Wastewater) Management",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "Environmental Life Style",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "Planning of Underground Saline Water",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Marathi",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "१० वी जल सुरक्षा मराठी (Item 1001000681)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "2021 / Latest Reprint (eBalbharati 2026 portal)",
        "officialSourceUrl": "https://ebooks.ebalbharati.in/pdfs/1001000681.pdf",
        "verificationNote": "Verified from official eBalbharati Jal Suraksha PDF (1001000681, SHA-256 a5bbc1698fd2ab094a01573849c67b4e9bcfb2678e2d3a863099b61e2f444fac, 6406961 bytes, TOC pp.9).",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "घटक १ (जलशिक्षण) – १. पर्यावरण आणि परिसंस्था",
            "sectionOrPart": "घटक १ (जलशिक्षण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "घटक १ (जलशिक्षण) – २. जलजिज्ञासेचा सांस्कृतिक वारसा",
            "sectionOrPart": "घटक १ (जलशिक्षण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "घटक १ (जलशिक्षण) – ३. पाण्याचे मोजमाप",
            "sectionOrPart": "घटक १ (जलशिक्षण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "घटक २ (जलसंधारण) – १. जल आराखडा",
            "sectionOrPart": "घटक २ (जलसंधारण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "घटक २ (जलसंधारण) – २. पाणलोट क्षेत्र विकास",
            "sectionOrPart": "घटक २ (जलसंधारण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "घटक २ (जलसंधारण) – ३. जलसंधारण व लोकसहभाग",
            "sectionOrPart": "घटक २ (जलसंधारण)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "घटक ३ (जलव्यवस्थापन) – १. महाराष्ट्र जलस्थिती आणि जल आव्हाने",
            "sectionOrPart": "घटक ३ (जलव्यवस्थापन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "घटक ३ (जलव्यवस्थापन) – २. जलसिंचन",
            "sectionOrPart": "घटक ३ (जलव्यवस्थापन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "घटक ३ (जलव्यवस्थापन) – ३. जलकायदे आणि नियम",
            "sectionOrPart": "घटक ३ (जलव्यवस्थापन)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "घटक ४ (जलगुणवत्ता) – १. जलशुद्धीकरण आणि सांडपाणी व्यवस्थापन",
            "sectionOrPart": "घटक ४ (जलगुणवत्ता)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "घटक ४ (जलगुणवत्ता) – २. पर्यावरणीय जीवनपद्धती",
            "sectionOrPart": "घटक ४ (जलगुणवत्ता)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "घटक ४ (जलगुणवत्ता) – ३. भूगर्भातील खाऱ्या पाण्याचे नियोजन",
            "sectionOrPart": "घटक ४ (जलगुणवत्ता)",
            "sectionType": "chapter"
          }
        ]
      },
      {
        "medium": "Hindi",
        "languageRole": "Subject Textbook",
        "status": "PENDING_VERIFICATION",
        "textbookTitle": "जल सुरक्षा / Water Security (Class 10 – Hindi Medium) – PENDING VERIFICATION",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "PENDING VERIFICATION",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "PENDING: Balbharati catalog item 1002000681 (१० वी जल सुरक्षा हिंदी) exists and awaits Hindi PDF download & TOC verification.",
        "chapters": []
      },
      {
        "medium": "Semi-English",
        "languageRole": "Subject Textbook",
        "status": "SCHOOL_TEXTBOOK_DEPENDENT",
        "textbookTitle": "जल सुरक्षा / Water Security (Class 10 – Semi-English Medium · School Edition Choice)",
        "publisher": "Maharashtra State Bureau of Textbook Production & Curriculum Research (Balbharati), Pune",
        "academicYearEdition": "Balbharati Dual Edition (English / Marathi)",
        "officialSourceUrl": "https://books.ebalbharati.in/",
        "verificationNote": "School-dependent medium assignment: Balbharati publishes identical Water Security (English) and जल सुरक्षा (Marathi) editions; Semi-English schools assign either edition per school policy. Switch to English or Marathi medium to view the verified official textbook index.",
        "chapters": []
      }
    ]
  },
  "CBSE__Class 4__Hindi": {
    "verificationStatus": "VERIFIED",
    "textbookTitle": "वीणा (Veena) – कक्षा 4 के लिए हिंदी की पाठ्यपुस्तक (NCERT, Code 0431)",
    "publisher": "National Council of Educational Research and Training (NCERT), New Delhi",
    "academicYearEdition": "First Edition March 2025 / Reprint January 2026 (NEP 2020 / NCF-SE 2023)",
    "applicableMediums": [
      "Hindi"
    ],
    "officialSourceUrl": "https://ncert.nic.in/textbook/pdf/dhve1ps.pdf",
    "verificationNote": "Verified locally from official NCERT PDF dhve1ps.pdf (Book Code 0431, ISBN 978-93-5729-337-2, SHA-256 f1a68449c799791b09eecfbd338de33a64335e9672b7992616b8cd4c55ff3666, 3061671 bytes, TOC pp.17–19). Contains 13 numbered lessons matching CBSE Class 5 Veena structure, plus opening poem \"ऐसा वर दो (पृष्ठ 1)\" and 9 unnumbered reading supplements documented in metadata.",
    "chapters": [
      {
        "sequenceIndex": 1,
        "chapterNumber": 1,
        "chapterTitle": "१. चिड़िया का गीत (पृष्ठ 2) [पूरक: मति की उड़ान (पृष्ठ 16)]",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 2,
        "chapterNumber": 2,
        "chapterTitle": "२. बगीचे का घोंघा (पृष्ठ 17)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 3,
        "chapterNumber": 3,
        "chapterTitle": "३. नीम (पृष्ठ 27) [पूरक: भाँति-भाँति की पत्तियाँ (पृष्ठ 38)]",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 4,
        "chapterNumber": 4,
        "chapterTitle": "४. हमारा आहार (पृष्ठ 40)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 5,
        "chapterNumber": 5,
        "chapterTitle": "५. आसमान गिरा (पृष्ठ 51) [पूरक: चेरापूँजी के मेहमान (पृष्ठ 60)]",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 6,
        "chapterNumber": 6,
        "chapterTitle": "६. जयपुर से पत्र (पृष्ठ 62) [पूरक: गोलगप्पा (पृष्ठ 76)]",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 7,
        "chapterNumber": 7,
        "chapterTitle": "७. नकली हीरे (पृष्ठ 77) [पूरक: हवा और धूल (पृष्ठ 89)]",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 8,
        "chapterNumber": 8,
        "chapterTitle": "८. ओणम के रंग (पृष्ठ 90)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 9,
        "chapterNumber": 9,
        "chapterTitle": "९. मिठाइयों का सम्मेलन (पृष्ठ 105) [पूरक: जलेबी (पृष्ठ 115)]",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 10,
        "chapterNumber": 10,
        "chapterTitle": "१०. कैमरा (पृष्ठ 116) [पूरक: सुन, इमली के दाने सुन! (पृष्ठ 125), ठहाके (पृष्ठ 126)]",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 11,
        "chapterNumber": 11,
        "chapterTitle": "११. कविता का कमाल (पृष्ठ 127)",
        "sectionType": "poem"
      },
      {
        "sequenceIndex": 12,
        "chapterNumber": 12,
        "chapterTitle": "१२. शतरंज में मात (पृष्ठ 139)",
        "sectionType": "chapter"
      },
      {
        "sequenceIndex": 13,
        "chapterNumber": 13,
        "chapterTitle": "१३. हमारा आदित्य (पृष्ठ 154) [पूरक: हम सब सुमन एक उपवन के (पृष्ठ 173)]",
        "sectionType": "chapter"
      }
    ],
    "mediumVariants": [
      {
        "medium": "Hindi",
        "languageRole": "Subject Textbook",
        "status": "VERIFIED",
        "textbookTitle": "वीणा (Veena) – कक्षा 4 के लिए हिंदी की पाठ्यपुस्तक (NCERT, Code 0431)",
        "publisher": "National Council of Educational Research and Training (NCERT), New Delhi",
        "academicYearEdition": "First Edition March 2025 / Reprint January 2026 (NEP 2020 / NCF-SE 2023)",
        "officialSourceUrl": "https://ncert.nic.in/textbook/pdf/dhve1ps.pdf",
        "verificationNote": "Verified locally from official NCERT PDF dhve1ps.pdf (Book Code 0431, ISBN 978-93-5729-337-2, SHA-256 f1a68449c799791b09eecfbd338de33a64335e9672b7992616b8cd4c55ff3666, 3061671 bytes, TOC pp.17–19). Contains 13 numbered lessons matching CBSE Class 5 Veena structure, plus opening poem \"ऐसा वर दो (पृष्ठ 1)\" and 9 unnumbered reading supplements documented in metadata.",
        "chapters": [
          {
            "sequenceIndex": 1,
            "chapterNumber": 1,
            "chapterTitle": "१. चिड़िया का गीत (पृष्ठ 2) [पूरक: मति की उड़ान (पृष्ठ 16)]",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 2,
            "chapterNumber": 2,
            "chapterTitle": "२. बगीचे का घोंघा (पृष्ठ 17)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 3,
            "chapterNumber": 3,
            "chapterTitle": "३. नीम (पृष्ठ 27) [पूरक: भाँति-भाँति की पत्तियाँ (पृष्ठ 38)]",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 4,
            "chapterNumber": 4,
            "chapterTitle": "४. हमारा आहार (पृष्ठ 40)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 5,
            "chapterNumber": 5,
            "chapterTitle": "५. आसमान गिरा (पृष्ठ 51) [पूरक: चेरापूँजी के मेहमान (पृष्ठ 60)]",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 6,
            "chapterNumber": 6,
            "chapterTitle": "६. जयपुर से पत्र (पृष्ठ 62) [पूरक: गोलगप्पा (पृष्ठ 76)]",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 7,
            "chapterNumber": 7,
            "chapterTitle": "७. नकली हीरे (पृष्ठ 77) [पूरक: हवा और धूल (पृष्ठ 89)]",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 8,
            "chapterNumber": 8,
            "chapterTitle": "८. ओणम के रंग (पृष्ठ 90)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 9,
            "chapterNumber": 9,
            "chapterTitle": "९. मिठाइयों का सम्मेलन (पृष्ठ 105) [पूरक: जलेबी (पृष्ठ 115)]",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 10,
            "chapterNumber": 10,
            "chapterTitle": "१०. कैमरा (पृष्ठ 116) [पूरक: सुन, इमली के दाने सुन! (पृष्ठ 125), ठहाके (पृष्ठ 126)]",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 11,
            "chapterNumber": 11,
            "chapterTitle": "११. कविता का कमाल (पृष्ठ 127)",
            "sectionType": "poem"
          },
          {
            "sequenceIndex": 12,
            "chapterNumber": 12,
            "chapterTitle": "१२. शतरंज में मात (पृष्ठ 139)",
            "sectionType": "chapter"
          },
          {
            "sequenceIndex": 13,
            "chapterNumber": 13,
            "chapterTitle": "१३. हमारा आदित्य (पृष्ठ 154) [पूरक: हम सब सुमन एक उपवन के (पृष्ठ 173)]",
            "sectionType": "chapter"
          }
        ]
      }
    ]
  }
});
