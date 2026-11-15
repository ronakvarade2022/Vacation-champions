import heroClassroomImg from '../assets/images/hero_smart_classroom_1794660856292.webp';
import boardsCurriculumImg from '../assets/images/boards_curriculum_books_1794660857629.webp';
import studyMaterialStemImg from '../assets/images/study_material_stem_1794660857438.webp';
import practiceZoneWorksheetsImg from '../assets/images/practice_zone_worksheets_1794660857838.webp';
import examZoneMockTestImg from '../assets/images/exam_zone_mock_test_1794660858225.webp';

export const EDUCATION_ILLUSTRATIONS = {
  heroClassroom: {
    src: heroClassroomImg,
    alt: 'Students studying together in a bright smart classroom with textbooks, globe, geometry tools, and digital tablet',
    width: 800,
    height: 600,
  },
  boardsCurriculum: {
    src: boardsCurriculumImg,
    alt: 'Colourful school textbooks, open geometry notebook, and classroom globe on a study desk',
    width: 800,
    height: 600,
  },
  studyMaterialStem: {
    src: studyMaterialStemImg,
    alt: 'Mathematics compass, geometry triangle, science flasks, open story book, and magnifying glass',
    width: 800,
    height: 600,
  },
  practiceZoneWorksheets: {
    src: practiceZoneWorksheetsImg,
    alt: 'Student practising interactive online multiple-choice quizzes and paper worksheets on a tablet',
    width: 800,
    height: 600,
  },
  examZoneMockTest: {
    src: examZoneMockTestImg,
    alt: 'Achievement trophy, examination checklist clipboard, and hourglass timer for mock exams',
    width: 800,
    height: 600,
  },
} as const;

