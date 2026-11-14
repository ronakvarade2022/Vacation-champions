import heroClassroomImg from '../assets/images/hero_smart_classroom_1794660856292.jpg';
import boardsCurriculumImg from '../assets/images/boards_curriculum_books_1794660857629.jpg';
import studyMaterialStemImg from '../assets/images/study_material_stem_1794660857438.jpg';
import practiceZoneWorksheetsImg from '../assets/images/practice_zone_worksheets_1794660857838.jpg';
import examZoneMockTestImg from '../assets/images/exam_zone_mock_test_1794660858225.jpg';

export const EDUCATION_ILLUSTRATIONS = {
  heroClassroom: {
    src: heroClassroomImg,
    alt: 'Students studying together in a bright smart classroom with textbooks, globe, geometry tools, and digital tablet',
  },
  boardsCurriculum: {
    src: boardsCurriculumImg,
    alt: 'Colourful school textbooks, open geometry notebook, and classroom globe on a study desk',
  },
  studyMaterialStem: {
    src: studyMaterialStemImg,
    alt: 'Mathematics compass, geometry triangle, science flasks, open story book, and magnifying glass',
  },
  practiceZoneWorksheets: {
    src: practiceZoneWorksheetsImg,
    alt: 'Student practising interactive online multiple-choice quizzes and paper worksheets on a tablet',
  },
  examZoneMockTest: {
    src: examZoneMockTestImg,
    alt: 'Achievement trophy, examination checklist clipboard, and hourglass timer for mock exams',
  },
} as const;
