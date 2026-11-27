export type SupportCategory =
  | 'Registration & Login'
  | 'Password Reset'
  | 'Payment & Subscription'
  | 'Educational Material Access'
  | 'Notes & Study Material Downloads'
  | 'Technical Errors'
  | 'Incorrect Questions or Answers'
  | 'Website Navigation'
  | 'General Queries';

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
export type TicketPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type SupportUserCategory = 'student' | 'teacher' | 'parent' | 'college' | 'institute';

export const SUPPORT_USER_CATEGORY_LABELS: Record<SupportUserCategory, string> = {
  student: 'Student',
  teacher: 'Teacher',
  parent: 'Parent',
  college: 'College',
  institute: 'Institute',
};

export function formatSupportTicketStatusLabel(status: TicketStatus): string {
  switch (status) {
    case 'OPEN':
      return 'New';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'RESOLVED':
      return 'Resolved';
    case 'CLOSED':
      return 'Closed';
    default:
      return 'New';
  }
}

export function normalizeSupportUserCategory(raw?: string | null): SupportUserCategory {
  const val = String(raw || '').trim().toLowerCase();
  if (val === 'teacher') return 'teacher';
  if (val === 'parent') return 'parent';
  if (val === 'college' || val === 'school_admin' || val === 'school') return 'college';
  if (val === 'institute' || val === 'institute_admin' || val === 'coaching') return 'institute';
  return 'student';
}

export interface SupportTicket {
  id: string;
  ticketNumber: string; // e.g. TKT-MSZ-10245 or TKT-VC-10245
  studentId: string;
  studentName: string;
  email: string;
  mobile?: string;
  userCategory?: SupportUserCategory;
  requesterRole?: SupportUserCategory;
  portalContext?: string;
  category: SupportCategory;
  subject: string;
  description: string;
  screenshotUrl?: string;
  status: TicketStatus;
  priority: TicketPriority;
  adminResponse?: string;
  createdAt: string;
  updatedAt: string;
}

export type GrievanceCategory =
  | 'Incorrect Questions'
  | 'Incorrect Answers'
  | 'Missing Materials'
  | 'Payment / Subscription Issues'
  | 'Technical Glitches'
  | 'Misleading or Inappropriate Content'
  | 'Other Complaints';

export type GrievanceStatus =
  | 'Submitted'
  | 'Under Review'
  | 'In Progress'
  | 'Resolved'
  | 'Closed';

export interface GrievanceRecord {
  id: string;
  grievanceNumber: string; // e.g. GRV-VC-82910
  studentId: string;
  studentName: string;
  email: string;
  mobile?: string;
  category: GrievanceCategory;
  subject: string;
  description: string;
  status: GrievanceStatus;
  adminResolution?: string;
  createdAt: string;
  updatedAt: string;
}

export type QuestionIssueType =
  | 'Wrong Answer Key'
  | 'Factual Inaccuracy'
  | 'Spelling / Typo'
  | 'Image / Diagram Missing'
  | 'Explanation Unclear'
  | 'Other';

export type QuestionReportStatus =
  | 'PENDING_REVIEW'
  | 'VERIFIED_CORRECT'
  | 'NEEDS_CORRECTION'
  | 'RESOLVED';

export interface QuestionReport {
  id: string;
  reportNumber: string; // e.g. REP-VC-5501
  questionId: string;
  questionText: string;
  board?: string;
  subject: string;
  classLevel: string;
  selectedAnswer?: string;
  correctAnswer?: string;
  issueType: QuestionIssueType;
  details: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  status: QuestionReportStatus;
  adminNotes?: string;
  createdAt: string;
}

export interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  tags?: string[];
  language?: 'en' | 'hi' | 'mr';
}
