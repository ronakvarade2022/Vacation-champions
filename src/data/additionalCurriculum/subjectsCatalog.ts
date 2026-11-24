import type { ClassLevel, EducationBoard } from '../../types';
import type { InstructionMedium } from '../../types/lessonPlanner';
import type { AdditionalSubjectDefinition } from '../../types/additionalCurriculum';

export const ALL_ADDITIONAL_CLASSES: ClassLevel[] = [
  'Class 1',
  'Class 2',
  'Class 3',
  'Class 4',
  'Class 5',
  'Class 6',
  'Class 7',
  'Class 8',
  'Class 9',
  'Class 10',
];

export const ALL_ADDITIONAL_BOARDS: EducationBoard[] = ['Maharashtra', 'CBSE', 'ICSE'];

export const BOARD_ALLOWED_MEDIUMS: Record<EducationBoard, InstructionMedium[]> = {
  Maharashtra: ['English', 'Marathi', 'Hindi', 'Semi-English'],
  CBSE: ['English', 'Hindi'],
  ICSE: ['English'],
};

export const DEFAULT_ADDITIONAL_SUBJECTS: readonly AdditionalSubjectDefinition[] = Object.freeze([
  {
    id: 'ADD_GK',
    code: 'GK',
    name: 'General Knowledge',
    localizedNames: {
      English: 'General Knowledge',
      Marathi: 'सामान्य ज्ञान',
      Hindi: 'सामान्य ज्ञान',
    },
    tagline: 'India, World Heritage, Science Milestones & Everyday Awareness',
    description:
      'Age-graded awareness of geography, civic landmarks, science discoveries, Indian heritage, and global affairs.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'sky',
    isPublished: true,
    mapsFromNonStandaloneSubject: 'General Knowledge',
  },
  {
    id: 'ADD_LR',
    code: 'LR',
    name: 'Logical Reasoning',
    localizedNames: {
      English: 'Logical Reasoning',
      Marathi: 'तर्कसंगत विचार व बुद्धिमत्ता',
      Hindi: 'तार्किक तर्कशक्ति',
    },
    tagline: 'Patterns, Analogies, Deductive Puzzles & Analytical Thinking',
    description:
      'Structured visual, verbal, and numerical reasoning exercises building problem-solving agility from Class 1 to 10.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'indigo',
    isPublished: true,
    mapsFromNonStandaloneSubject: 'Logical Reasoning',
  },
  {
    id: 'ADD_ME',
    code: 'ME',
    name: 'Moral Education',
    localizedNames: {
      English: 'Moral Education',
      Marathi: 'नैतिक मूल्यशिक्षण',
      Hindi: 'नैतिक शिक्षा',
    },
    tagline: 'Character, Empathy, Civic Ethics & Responsible Conduct',
    description:
      'Values-based stories, ethical dilemmas, and civic responsibility lessons promoting kindness, honesty, and integrity.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'amber',
    isPublished: true,
    mapsFromNonStandaloneSubject: 'Moral Education',
  },
  {
    id: 'ADD_CK',
    code: 'CK',
    name: 'Computer Knowledge',
    localizedNames: {
      English: 'Computer Knowledge',
      Marathi: 'संगणक ज्ञान',
      Hindi: 'कंप्यूटर ज्ञान',
    },
    tagline: 'Digital Literacy, Coding Logic, Productivity & Cyber Safety',
    description:
      'Progressive computing curriculum spanning hardware basics, typing, office tools, algorithms, web fundamentals, and cybersecurity.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'cyan',
    isPublished: true,
    mapsFromNonStandaloneSubject: 'Computer Knowledge',
  },
  {
    id: 'ADD_VG',
    code: 'VG',
    name: 'Vocabulary and Grammar',
    localizedNames: {
      English: 'Vocabulary and Grammar',
      Marathi: 'शब्दसंग्रह व व्याकरण',
      Hindi: 'शब्दावली एवं व्याकरण',
    },
    tagline: 'Additional English & Grammar, Word Roots, Comprehension & Clear Writing',
    description:
      'Structured Additional English and Grammar mechanics, contextual vocabulary building, idioms, punctuation, and effective academic writing.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'emerald',
    isPublished: true,
    mapsFromNonStandaloneSubject: 'Vocabulary and Grammar',
  },
  {
    id: 'ADD_DC',
    code: 'DC',
    name: 'Drawing and Creative Activities',
    localizedNames: {
      English: 'Drawing and Creative Activities',
      Marathi: 'चित्रकला व सर्जनशील उपक्रम',
      Hindi: 'चित्रकला एवं रचनात्मक गतिविधियाँ',
    },
    tagline: 'Visual Expression, Color Theory, Craft & Design Thinking',
    description:
      'Guided visual art progression from basic shapes and paper craft to perspective drawing, folk art, and graphic layout.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'rose',
    isPublished: true,
    mapsFromNonStandaloneSubject: 'Drawing and Creative Activities',
  },
  {
    id: 'ADD_EA',
    code: 'EA',
    name: 'Environmental Awareness',
    localizedNames: {
      English: 'Environmental Awareness',
      Marathi: 'पर्यावरण जाणीव व संवर्धन',
      Hindi: 'पर्यावरण जागरूकता',
    },
    tagline: 'Ecology, Water Conservation, Clean Energy & Climate Action',
    description:
      'Practical sustainability education focusing on local biodiversity, waste reduction, soil and water stewardship, and climate resilience.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'teal',
    isPublished: true,
    mapsFromNonStandaloneSubject: 'Environmental Awareness',
  },
  {
    id: 'ADD_LS',
    code: 'LS',
    name: 'Life Skills',
    localizedNames: {
      English: 'Life Skills',
      Marathi: 'जीवन कौशल्ये',
      Hindi: 'जीवन कौशल',
    },
    tagline: 'Communication, Time Management, Safety & Emotional Resilience',
    description:
      'Real-world personal competence modules covering habits, teamwork, stress management, first aid awareness, and goal planning.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'violet',
    isPublished: true,
  },
  {
    id: 'ADD_GS',
    code: 'GS',
    name: 'General Science Activities',
    localizedNames: {
      English: 'General Science Activities',
      Marathi: 'सामान्य विज्ञान प्रयोग व उपक्रम',
      Hindi: 'सामान्य विज्ञान गतिविधियाँ',
    },
    tagline: 'Observation Labs, Everyday Physics, Kitchen Chemistry & Inquiry',
    description:
      'Safe, hands-on scientific inquiry experiments and observation labs designed to build curiosity and experimental thinking.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'blue',
    isPublished: true,
  },
  {
    id: 'ADD_FD',
    code: 'FD',
    name: 'Financial Literacy & Digital Citizenship',
    localizedNames: {
      English: 'Financial Literacy & Digital Citizenship',
      Marathi: 'आर्थिक साक्षरता व डिजिटल नागरिकत्व',
      Hindi: 'वित्तीय साक्षरता एवं डिजिटल नागरिकता',
    },
    tagline: 'Smart Saving, Budgeting, Safe Online Conduct & Media Literacy',
    description:
      'Essential 21st-century literacy teaching smart money habits, banking basics, fact-checking, privacy, and respectful online behavior.',
    applicableBoards: ALL_ADDITIONAL_BOARDS,
    applicableMediums: ['English', 'Marathi', 'Hindi', 'Semi-English'],
    classesCovered: ALL_ADDITIONAL_CLASSES,
    accentColor: 'slate',
    isPublished: true,
  },
]);
