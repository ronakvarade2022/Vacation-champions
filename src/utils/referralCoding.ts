/**
 * Unique Student Referral Code & Link Generator
 * Guarantees that every registered student gets a unique, permanent referral code
 * and referral link (https://mystudyzone.in/register?ref=...) tied to their UID.
 */

export const PUBLISHED_REFERRAL_BASE_URL = 'https://mystudyzone.in/register';

const RESERVED_STUDENT_CODES: Record<string, string> = {
  student1: 'STUDY123',
  uid_aarav_c4_987654: 'STUDY123',
  student2: 'STUDY456',
  uid_ananya_c6_982201: 'STUDY456',
  student3: 'STUDY789',
  uid_rohan_c7_983301: 'STUDY789',
};

/**
 * Normalizes a referral code string and rejects generic/placeholder codes.
 */
export function sanitizeReferralCode(code?: string | null): string {
  if (!code) return '';
  const cleaned = String(code)
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, '');
  // Never allow the old generic placeholder code to be treated as a valid personal code
  if (!cleaned || cleaned === 'VC-STU-CHAMP' || cleaned === 'DEFAULT' || cleaned === 'UNDEFINED') {
    return '';
  }
  return cleaned;
}

/**
 * Generates a deterministic, unique referral code for a student based on their unique UID.
 * - student1 -> STUDY123
 * - student2 -> STUDY456
 * - student3 -> STUDY789
 * - Any other UID -> STUDY + deterministic 6-character alphanumeric code derived from UID
 * Ensures zero collisions against `existingCodes` if provided.
 */
export function generateUniqueStudentReferralCode(
  studentId: string,
  _studentName?: string,
  existingCodes?: Iterable<string>
): string {
  const cleanId = String(studentId || '').trim();
  const usedSet = new Set<string>();
  if (existingCodes) {
    for (const c of existingCodes) {
      const norm = sanitizeReferralCode(c);
      if (norm) usedSet.add(norm);
    }
  }

  // Check reserved sample student mapping first
  if (RESERVED_STUDENT_CODES[cleanId]) {
    const reserved = RESERVED_STUDENT_CODES[cleanId];
    if (!usedSet.has(reserved)) {
      return reserved;
    }
  }

  // Deterministic hash from the student's unique UID so the same UID always produces the same code
  const alphabet = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let h1 = 2166136261;
  let h2 = 16777619;
  const seed = cleanId || `stu_${Date.now()}_${Math.random()}`;

  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 ^= ch;
    h1 = Math.imul(h1, 16777619);
    h2 ^= ch + i * 31;
    h2 = Math.imul(h2, 1099511628211 & 0xffffffff);
  }

  const digitsPart = String((Math.abs(h1) % 900) + 100); // 3 digits: 100..999
  let alphaPart = '';
  let temp = Math.abs(h2);
  for (let i = 0; i < 3; i++) {
    alphaPart += alphabet[temp % alphabet.length];
    temp = Math.floor(temp / alphabet.length) ^ (Math.abs(h1) >> (i * 3));
  }

  const baseCandidate = `STUDY${digitsPart}${alphaPart}`;
  if (!usedSet.has(baseCandidate)) {
    return baseCandidate;
  }

  // Collision resolution if needed
  let counter = 1;
  while (counter < 10000) {
    const nextCandidate = `STUDY${digitsPart}${alphaPart}${counter}`;
    if (!usedSet.has(nextCandidate)) {
      return nextCandidate;
    }
    counter++;
  }

  return `STUDY${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

/**
 * Builds the canonical full referral link for a student's unique referral code.
 * Always points to https://mystudyzone.in/register?ref=<CODE> so links shared on WhatsApp
 * or social media open the published website registration flow with the student's code.
 */
export function buildStudentReferralLink(referralCode: string): string {
  const cleanCode = sanitizeReferralCode(referralCode);
  if (!cleanCode) {
    return PUBLISHED_REFERRAL_BASE_URL;
  }
  return `${PUBLISHED_REFERRAL_BASE_URL}?ref=${encodeURIComponent(cleanCode)}`;
}

/**
 * Builds the concise display link (e.g. mystudyzone.in/register?ref=STUDY123)
 */
export function buildStudentReferralDisplayLink(referralCode: string): string {
  const cleanCode = sanitizeReferralCode(referralCode);
  if (!cleanCode) {
    return 'mystudyzone.in/register';
  }
  return `mystudyzone.in/register?ref=${encodeURIComponent(cleanCode)}`;
}
