import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  RefreshCw,
  Search,
  CheckCircle,
  ShieldAlert,
  X,
  GraduationCap,
  Smartphone,
  Monitor,
  Clock,
  Power,
  Layers,
} from 'lucide-react';
import type { ClassLevel, DeviceSessionRecord, EducationBoard, StudentProfile } from '../../types';
import { auth } from '../../services/firebase';
import {
  fetchAllDeviceSessionsForAdmin,
  adminTerminateUserSession,
} from '../../services/deviceSessionService';
import { fetchBoundedStudentsForAdmin } from '../../services/adminFirestoreService';
import {
  ALL_BOARDS,
  ALL_CLASS_LEVELS,
  getActivatedBoardClassesList,
  getBoardClassSubscriptionInfo,
  getBoardShortLabel,
  getPrimaryBaseBoard,
  getPrimaryBaseClass,
  getStudentPlanInfo,
  normalizeBoardValue,
} from '../../utils/subscriptionAccess';
import {
  auditStudentSubscriptionRecord,
  formatDateIstDisplay,
} from '../../utils/subscriptionDateUtils';
import { ALL_ADMIN_CLASSES } from '../../utils/adminAnalytics';
import { AdminPagination } from './AdminPagination';

interface AdminStudentsSectionProps {
  studentsList: StudentProfile[];
  selectedBoardWorkspace: 'all' | EducationBoard;
  onSelectBoardWorkspace: (board: 'all' | EducationBoard) => void;
  adminPromoteOrCorrectClass: (
    studentId: string,
    newClass: ClassLevel,
    reason: string,
    adminName?: string
  ) => { success: boolean; message: string };
  adminApplyApproved365DayMigration: (studentId: string) => {
    success: boolean;
    message: string;
  };
}

function formatIstDateTime(iso?: string | null): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  try {
    return (
      new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(d) + ' IST'
    );
  } catch {
    return d.toISOString();
  }
}

export const AdminStudentsSection: React.FC<AdminStudentsSectionProps> = React.memo(
  ({
    studentsList,
    selectedBoardWorkspace,
    onSelectBoardWorkspace,
    adminPromoteOrCorrectClass,
    adminApplyApproved365DayMigration,
  }) => {
    const [remoteStudents, setRemoteStudents] = useState<StudentProfile[]>([]);
    const [isLoadingRemoteStudents, setIsLoadingRemoteStudents] = useState<boolean>(false);
    const [studentSearchInput, setStudentSearchInput] = useState<string>('');
    const [debouncedSearch, setDebouncedSearch] = useState<string>('');
    const [studentPage, setStudentPage] = useState<number>(1);
    const [studentPageSize, setStudentPageSize] = useState<number>(15);
    const [auditPage, setAuditPage] = useState<number>(1);
    const [auditPageSize, setAuditPageSize] = useState<number>(15);
    const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'teacher'>('all');

    const [subscriptionMigrationFeedback, setSubscriptionMigrationFeedback] = useState<{
      studentId: string;
      message: string;
      success: boolean;
    } | null>(null);

    // Secure Class Correction & Promotion Modal
    const [editingStudent, setEditingStudent] = useState<StudentProfile | null>(null);
    const [targetNewClass, setTargetNewClass] = useState<ClassLevel>('Class 4');
    const [classChangeReason, setClassChangeReason] = useState<string>('Annual academic promotion');
    const [adminAuthName, setAdminAuthName] = useState<string>('Head Administrator');
    const [classChangeFeedback, setClassChangeFeedback] = useState<{
      success: boolean;
      message: string;
    } | null>(null);

    // Single-Device Session Monitoring & Termination State
    const [deviceSessionsMap, setDeviceSessionsMap] = useState<Record<string, DeviceSessionRecord>>(
      {}
    );
    const [isLoadingSessions, setIsLoadingSessions] = useState<boolean>(false);
    const [confirmTerminateUserId, setConfirmTerminateUserId] = useState<string | null>(null);
    const [terminatingUserId, setTerminatingUserId] = useState<string | null>(null);
    const [sessionAdminFeedback, setSessionAdminFeedback] = useState<{
      success: boolean;
      message: string;
    } | null>(null);

    useEffect(() => {
      const t = setTimeout(() => setDebouncedSearch(studentSearchInput.trim().toLowerCase()), 200);
      return () => clearTimeout(t);
    }, [studentSearchInput]);

    const loadDeviceSessions = useCallback(async (forceRefresh: boolean = false) => {
      setIsLoadingSessions(true);
      try {
        const token = await auth.currentUser?.getIdToken().catch(() => undefined);
        const sessions = await fetchAllDeviceSessionsForAdmin(token, forceRefresh);
        const mapped: Record<string, DeviceSessionRecord> = {};
        sessions.forEach((sess) => {
          if (sess.userId) mapped[sess.userId] = sess;
          if (sess.email) mapped[sess.email.trim().toLowerCase()] = sess;
        });
        setDeviceSessionsMap(mapped);
      } catch {
        // Keep existing state cleanly
      } finally {
        setIsLoadingSessions(false);
      }
    }, []);

    const loadBoundedStudents = useCallback(
      async (forceRefresh: boolean = false) => {
        setIsLoadingRemoteStudents(true);
        try {
          const res = await fetchBoundedStudentsForAdmin({
            boardFilter: selectedBoardWorkspace,
            pageSize: 200,
            forceRefresh,
          });
          if (res.fromFirestore && res.students.length > 0) {
            setRemoteStudents(res.students);
          }
        } catch {
          // Local studentsList fallback remains intact
        } finally {
          setIsLoadingRemoteStudents(false);
        }
      },
      [selectedBoardWorkspace]
    );

    useEffect(() => {
      loadDeviceSessions(false);
      loadBoundedStudents(false);
    }, [loadDeviceSessions, loadBoundedStudents]);

    // Merge AppContext studentsList + bounded Firestore sync without duplicating IDs
    const mergedStudents = useMemo(() => {
      if (remoteStudents.length === 0) return studentsList;
      const byId = new Map<string, StudentProfile>();
      for (const s of remoteStudents) {
        if (s?.id) byId.set(s.id, s);
      }
      // Prefer AppContext live copy if newer or edited locally
      for (const s of studentsList) {
        if (s?.id) byId.set(s.id, s);
      }
      return Array.from(byId.values());
    }, [studentsList, remoteStudents]);

    const filteredStudents = useMemo(() => {
      return mergedStudents.filter((s) => {
        if (roleFilter === 'student' && s.accountRole === 'teacher') return false;
        if (roleFilter === 'teacher' && s.accountRole !== 'teacher') return false;

        if (selectedBoardWorkspace !== 'all') {
          const baseBoard = normalizeBoardValue(s.board || s.primaryBoard || 'Maharashtra');
          const hasBoardSub =
            baseBoard === selectedBoardWorkspace ||
            getActivatedBoardClassesList(s).some((c) => c.board === selectedBoardWorkspace);
          if (!hasBoardSub) return false;
        }
        if (debouncedSearch) {
          const hit =
            s.name.toLowerCase().includes(debouncedSearch) ||
            s.email.toLowerCase().includes(debouncedSearch) ||
            s.mobile.includes(debouncedSearch) ||
            (s.schoolName && s.schoolName.toLowerCase().includes(debouncedSearch)) ||
            s.id.toLowerCase().includes(debouncedSearch);
          if (!hit) return false;
        }
        return true;
      });
    }, [mergedStudents, selectedBoardWorkspace, debouncedSearch, roleFilter]);

    useEffect(() => {
      setStudentPage(1);
      setAuditPage(1);
    }, [selectedBoardWorkspace, debouncedSearch, roleFilter]);

    const safeStudentPage = Math.min(
      studentPage,
      Math.max(1, Math.ceil(filteredStudents.length / studentPageSize))
    );
    const paginatedStudents = useMemo(() => {
      const start = (safeStudentPage - 1) * studentPageSize;
      return filteredStudents.slice(start, start + studentPageSize);
    }, [filteredStudents, safeStudentPage, studentPageSize]);

    const safeAuditPage = Math.min(
      auditPage,
      Math.max(1, Math.ceil(filteredStudents.length / auditPageSize))
    );
    const paginatedAuditStudents = useMemo(() => {
      const start = (safeAuditPage - 1) * auditPageSize;
      return filteredStudents.slice(start, start + auditPageSize);
    }, [filteredStudents, safeAuditPage, auditPageSize]);

    // Precompute expensive IST subscription & multi-board pill structures ONLY for the visible 15 rows
    const visibleStudentMetaMap = useMemo(() => {
      const map = new Map<
        string,
        {
          planInfo: ReturnType<typeof getStudentPlanInfo>;
          audit: ReturnType<typeof auditStudentSubscriptionRecord>;
          activeBoardClasses: ReturnType<typeof getActivatedBoardClassesList>;
          expiredBoardClasses: ReturnType<typeof getBoardClassSubscriptionInfo>[];
        }
      >();
      for (const s of paginatedStudents) {
        map.set(s.id, {
          planInfo: getStudentPlanInfo(s),
          audit: auditStudentSubscriptionRecord(s),
          activeBoardClasses: getActivatedBoardClassesList(s),
          expiredBoardClasses: ALL_BOARDS.flatMap((brd) =>
            ALL_CLASS_LEVELS.map((cls) => getBoardClassSubscriptionInfo(s, brd, cls))
          ).filter((c) => c.isExpired),
        });
      }
      return map;
    }, [paginatedStudents]);

    const visibleAuditMap = useMemo(() => {
      const map = new Map<string, ReturnType<typeof auditStudentSubscriptionRecord>>();
      for (const s of paginatedAuditStudents) {
        const existing = visibleStudentMetaMap.get(s.id)?.audit;
        map.set(s.id, existing || auditStudentSubscriptionRecord(s));
      }
      return map;
    }, [paginatedAuditStudents, visibleStudentMetaMap]);

    const handleTerminateStudentSession = async (userId: string, studentName: string) => {
      setTerminatingUserId(userId);
      setSessionAdminFeedback(null);
      try {
        const token = await auth.currentUser?.getIdToken().catch(() => undefined);
        const res = await adminTerminateUserSession(userId, token, 'Terminated by administrator');
        if (res.success) {
          setDeviceSessionsMap((prev) => {
            const next = { ...prev };
            const existing = next[userId];
            if (existing) {
              const updated: DeviceSessionRecord = {
                ...existing,
                status: 'TERMINATED',
                terminatedBy: 'ADMIN',
                terminatedAt: new Date().toISOString(),
                terminationReason: 'Terminated by administrator',
              };
              next[userId] = updated;
              if (existing.email) next[existing.email.trim().toLowerCase()] = updated;
            }
            return next;
          });
          setSessionAdminFeedback({
            success: true,
            message: `Active session terminated for ${studentName}. They can now log in cleanly on a new device.`,
          });
        } else {
          setSessionAdminFeedback({
            success: false,
            message: res.error || 'Could not terminate device session. Please try again.',
          });
        }
      } finally {
        setTerminatingUserId(null);
        setConfirmTerminateUserId(null);
      }
    };

    const nowMs = Date.now();

    return (
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
              <span>Student &amp; Teacher Accounts</span>
              <span className="text-xs bg-amber-100 text-amber-900 border border-amber-300 font-mono px-2 py-0.5 rounded-full font-bold">
                Multi-Class + Single Device Security
              </span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each account keeps a single verified identity (mobile + email), supports independent ₹99 / 365-day subscriptions across multiple boards &amp; classes, and enforces one active device at a time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedBoardWorkspace}
              onChange={(e) => onSelectBoardWorkspace(e.target.value as 'all' | EducationBoard)}
              className="px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold bg-white text-slate-700"
              aria-label="Filter accounts by board"
            >
              <option value="all">All 3 Boards</option>
              {ALL_BOARDS.map((b) => (
                <option key={b} value={b}>
                  {getBoardShortLabel(b)}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={() => {
                loadDeviceSessions(true);
                loadBoundedStudents(true);
              }}
              disabled={isLoadingSessions || isLoadingRemoteStudents}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-xs inline-flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isLoadingSessions || isLoadingRemoteStudents ? 'animate-spin' : ''}`}
              />
              <span>
                {isLoadingSessions || isLoadingRemoteStudents
                  ? 'Syncing...'
                  : 'Refresh Devices & Sync'}
              </span>
            </button>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={studentSearchInput}
                onChange={(e) => setStudentSearchInput(e.target.value)}
                placeholder="Search student, email, mobile, UID..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Role Type Filter Bar (All / Students / Teachers) */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mr-1">
              Account Type:
            </span>
            {[
              { id: 'all' as const, label: `All Users (${mergedStudents.length})` },
              { id: 'student' as const, label: `Students (${mergedStudents.filter((s) => s.accountRole !== 'teacher').length})` },
              { id: 'teacher' as const, label: `Teachers / Educators (${mergedStudents.filter((s) => s.accountRole === 'teacher').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  roleFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs font-medium text-slate-500">
            {filteredStudents.length} matching record{filteredStudents.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Independent Board Filter Indicator */}
        {selectedBoardWorkspace !== 'all' && (
          <div className="px-3.5 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-900 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-700" />
              <span>
                Showing {filteredStudents.length} accounts linked to{' '}
                {getBoardShortLabel(selectedBoardWorkspace)}
              </span>
            </span>
            <button
              type="button"
              onClick={() => onSelectBoardWorkspace('all')}
              className="text-blue-700 hover:underline text-[11px] cursor-pointer"
            >
              Show All 3 Boards
            </button>
          </div>
        )}

        {sessionAdminFeedback && (
          <div
            className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center justify-between gap-3 ${
              sessionAdminFeedback.success
                ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                : 'bg-rose-50 text-rose-900 border-rose-300'
            }`}
          >
            <div className="flex items-center gap-2">
              {sessionAdminFeedback.success ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
              )}
              <span>{sessionAdminFeedback.message}</span>
            </div>
            <button
              type="button"
              onClick={() => setSessionAdminFeedback(null)}
              className="text-slate-500 hover:text-slate-800 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <AdminPagination
          totalItems={filteredStudents.length}
          currentPage={safeStudentPage}
          pageSize={studentPageSize}
          onPageChange={setStudentPage}
          onPageSizeChange={setStudentPageSize}
          pageSizeOptions={[10, 15, 25, 50]}
          itemLabel="accounts"
        />

        <div className="border border-slate-200 rounded-2xl overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead className="bg-amber-50/70 border-b border-slate-200 text-amber-950 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-3">Student Name &amp; UID</th>
                <th className="p-3">Registered Email</th>
                <th className="p-3">Verified Mobile</th>
                <th className="p-3">Permanent Class</th>
                <th className="p-3">Plan</th>
                <th className="p-3">Subscription Status</th>
                <th className="p-3">Active Device</th>
                <th className="p-3">Last Login Time (IST)</th>
                <th className="p-3">Purchase Date (IST)</th>
                <th className="p-3">Expiry Date (IST)</th>
                <th className="p-3">Remaining Days</th>
                <th className="p-3 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={12} className="p-8 text-center text-slate-500">
                    No student or teacher accounts match your filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => {
                  const meta = visibleStudentMetaMap.get(s.id);
                  const sPlanInfo = meta?.planInfo || getStudentPlanInfo(s);
                  const sAudit = meta?.audit || auditStudentSubscriptionRecord(s);
                  const activeBoardClasses = meta?.activeBoardClasses || [];
                  const expiredBoardClasses = meta?.expiredBoardClasses || [];
                  const deviceSess =
                    deviceSessionsMap[s.id] ||
                    deviceSessionsMap[s.email.trim().toLowerCase()] ||
                    null;
                  const isSessionActive =
                    deviceSess?.status === 'ACTIVE' &&
                    (!deviceSess.expiresAt || new Date(deviceSess.expiresAt).getTime() > nowMs);
                  return (
                    <tr key={s.id} className="hover:bg-amber-50/20">
                      <td className="p-3">
                        <div className="flex items-center gap-2 font-bold text-slate-900">
                          <span className="text-lg">{s.avatar}</span>
                          <div>
                            <p>{s.name}</p>
                            <p className="text-[10px] font-mono font-medium text-slate-400">
                              UID: {s.id} ({s.accountRole === 'teacher' ? 'Teacher' : 'Student'})
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">{s.email}</td>
                      <td className="p-3 text-slate-700 font-mono text-[11px] font-bold">
                        {s.mobile}
                      </td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <span className="inline-flex items-center gap-1 bg-amber-100/90 text-amber-950 border border-amber-300 px-2 py-0.5 rounded-lg text-xs font-extrabold">
                            <GraduationCap className="w-3 h-3 text-amber-700" />
                            <span>
                              Active: {getBoardShortLabel(s.board)} • {s.classLevel}
                            </span>
                          </span>
                          {(getPrimaryBaseClass(s) !== s.classLevel ||
                            getPrimaryBaseBoard(s) !== (s.board || 'Maharashtra')) && (
                            <div className="text-[10px] font-bold text-slate-500">
                              Base Free: {getBoardShortLabel(getPrimaryBaseBoard(s))} •{' '}
                              {getPrimaryBaseClass(s)}
                            </div>
                          )}
                          <div className="flex flex-wrap gap-1">
                            {activeBoardClasses.map((c) => (
                              <span
                                key={c.boardClassKey}
                                className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 text-[9px] font-black"
                              >
                                {getBoardShortLabel(c.board)} • {c.classLevel} ({c.daysRemaining}d)
                              </span>
                            ))}
                            {expiredBoardClasses.map((c) => (
                              <span
                                key={c.boardClassKey}
                                className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-200 text-[9px] font-black"
                              >
                                {getBoardShortLabel(c.board)} • {c.classLevel} (Exp)
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                            s.plan === 'premium' || s.plan === 'basic'
                              ? 'bg-purple-100 text-purple-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {s.plan === 'premium' || s.plan === 'basic'
                            ? 'Premium (₹99 • 365d)'
                            : 'Free Plan'}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            sPlanInfo.isPaidPlanExpired
                              ? 'bg-rose-100 text-rose-800'
                              : sPlanInfo.isExpiringToday
                                ? 'bg-amber-100 text-amber-900'
                                : s.plan !== 'free'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {sPlanInfo.isPaidPlanExpired
                            ? 'EXPIRED (Free Active)'
                            : sPlanInfo.isExpiringToday
                              ? 'EXPIRING TODAY'
                              : s.plan !== 'free'
                                ? 'ACTIVE (Paid)'
                                : 'ACTIVE (Lifetime Free)'}
                        </span>
                      </td>
                      <td className="p-3">
                        {deviceSess ? (
                          <div className="space-y-1 min-w-[155px]">
                            <div className="flex items-center gap-1.5">
                              {deviceSess.deviceType === 'Mobile' ||
                              deviceSess.deviceType === 'Tablet' ? (
                                <Smartphone
                                  className={`w-3.5 h-3.5 shrink-0 ${
                                    isSessionActive ? 'text-emerald-600' : 'text-slate-400'
                                  }`}
                                />
                              ) : (
                                <Monitor
                                  className={`w-3.5 h-3.5 shrink-0 ${
                                    isSessionActive ? 'text-emerald-600' : 'text-slate-400'
                                  }`}
                                />
                              )}
                              <span
                                className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                                  isSessionActive
                                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                    : deviceSess.status === 'TERMINATED'
                                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                      : 'bg-slate-100 text-slate-600 border border-slate-200'
                                }`}
                              >
                                {isSessionActive ? 'ACTIVE' : deviceSess.status}
                              </span>
                            </div>
                            <p className="text-[11px] font-bold text-slate-800 leading-tight">
                              {deviceSess.deviceName}
                            </p>
                            <p className="text-[10px] text-slate-500 leading-tight">
                              {deviceSess.browser} • {deviceSess.os}
                            </p>
                          </div>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
                            Offline
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px] min-w-[140px]">
                        {deviceSess?.loginAt ? (
                          <div className="space-y-0.5">
                            <span className="font-bold text-slate-800 inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                              <span>{formatIstDateTime(deviceSess.loginAt)}</span>
                            </span>
                            {deviceSess.lastActivityAt && (
                              <span className="block text-[10px] text-slate-400">
                                Ping: {formatIstDateTime(deviceSess.lastActivityAt)}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">
                        {sAudit.currentPurchaseDateIst ? (
                          <div>
                            <span className="font-bold text-slate-900 block">
                              {formatDateIstDisplay(sAudit.currentPurchaseDateIst)}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {sAudit.currentPurchaseDateIst}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">— (Free)</span>
                        )}
                      </td>
                      <td className="p-3 text-slate-700 font-mono text-[11px]">
                        {sAudit.currentExpiryDateIst ? (
                          <div>
                            <span className="font-bold text-emerald-800 block">
                              {formatDateIstDisplay(sAudit.currentExpiryDateIst)}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {sAudit.currentExpiryDateIst}
                            </span>
                          </div>
                        ) : (
                          <span className="text-emerald-700 font-bold">Lifetime</span>
                        )}
                      </td>
                      <td className="p-3 font-extrabold text-[11px]">
                        <span
                          className={
                            sPlanInfo.isPaidPlanExpired
                              ? 'text-rose-700'
                              : sPlanInfo.isExpiringToday
                                ? 'text-amber-700'
                                : 'text-emerald-700'
                          }
                        >
                          {sPlanInfo.daysRemainingDisplay}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex flex-col items-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingStudent(s);
                              setTargetNewClass(s.classLevel);
                              setClassChangeReason('Annual academic grade promotion');
                              setClassChangeFeedback(null);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                            title="Promote or correct student's grade"
                          >
                            <GraduationCap className="w-3.5 h-3.5" />
                            <span>Promote / Correct</span>
                          </button>

                          {isSessionActive &&
                            (confirmTerminateUserId === s.id ? (
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  disabled={terminatingUserId === s.id}
                                  onClick={() => handleTerminateStudentSession(s.id, s.name)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-700 hover:bg-rose-800 disabled:opacity-60 text-white font-black text-[10px] cursor-pointer whitespace-nowrap"
                                >
                                  {terminatingUserId === s.id
                                    ? 'Terminating...'
                                    : 'Confirm Force Logout'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirmTerminateUserId(null)}
                                  className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] cursor-pointer"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setConfirmTerminateUserId(s.id)}
                                className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300 font-bold text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                                title="Force logout active device so student can sign in on another device"
                              >
                                <Power className="w-3.5 h-3.5" />
                                <span>Terminate Session</span>
                              </button>
                            ))}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* EXISTING STUDENT SUBSCRIPTION DATE AUDIT & 365-DAY MIGRATION REVIEW PANEL */}
        <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-display font-extrabold text-slate-900 flex items-center gap-2">
                <span>📅 Existing Student Subscription Date Audit &amp; 365-Day Review</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-900 border border-indigo-300">
                  IST (Asia/Kolkata) Verified
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Non-destructive audit of all existing student and teacher subscription records. Existing expiry dates are preserved as stored and are only updated to 365 days (`purchaseDate + 365 days`) when explicitly approved below.
              </p>
            </div>
          </div>

          {subscriptionMigrationFeedback && (
            <div
              className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between ${
                subscriptionMigrationFeedback.success
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                  : 'bg-rose-50 text-rose-900 border-rose-300'
              }`}
            >
              <span>{subscriptionMigrationFeedback.message}</span>
              <button
                type="button"
                onClick={() => setSubscriptionMigrationFeedback(null)}
                className="text-slate-500 hover:text-slate-800 ml-3 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}

          <AdminPagination
            totalItems={filteredStudents.length}
            currentPage={safeAuditPage}
            pageSize={auditPageSize}
            onPageChange={setAuditPage}
            onPageSizeChange={setAuditPageSize}
            pageSizeOptions={[10, 15, 25, 50]}
            itemLabel="subscription audits"
          />

          <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Account &amp; Class</th>
                  <th className="p-3">Plan</th>
                  <th className="p-3">Current Purchase Date</th>
                  <th className="p-3">Current Expiry Date</th>
                  <th className="p-3">Configured Span</th>
                  <th className="p-3">Calculated Remaining Days</th>
                  <th className="p-3">Audit Status</th>
                  <th className="p-3">Proposed 365-Day Expiry</th>
                  <th className="p-3 text-right">Approval Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedAuditStudents.map((stu) => {
                  const audit = visibleAuditMap.get(stu.id) || auditStudentSubscriptionRecord(stu);
                  return (
                    <tr key={`audit_${stu.id}`} className="hover:bg-slate-50/80">
                      <td className="p-3">
                        <span className="font-bold text-slate-900 block">{stu.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {stu.id} • {getBoardShortLabel(stu.board)} • {stu.classLevel}
                        </span>
                      </td>
                      <td className="p-3 font-bold">
                        {stu.plan === 'premium' || stu.plan === 'basic'
                          ? 'Premium (₹99)'
                          : 'Free Plan (₹0)'}
                      </td>
                      <td className="p-3 font-mono text-[11px]">
                        {audit.currentPurchaseDateIst
                          ? `${audit.currentPurchaseDateDisplay} (${audit.currentPurchaseDateIst})`
                          : '—'}
                      </td>
                      <td className="p-3 font-mono text-[11px]">
                        {audit.currentExpiryDateIst
                          ? `${audit.currentExpiryDateDisplay} (${audit.currentExpiryDateIst})`
                          : 'Lifetime'}
                      </td>
                      <td className="p-3 font-mono text-[11px]">
                        {audit.configuredValiditySpanDays !== null
                          ? `${audit.configuredValiditySpanDays} Days`
                          : 'Lifetime'}
                      </td>
                      <td className="p-3 font-extrabold text-amber-900">
                        {audit.calculatedDaysRemainingDisplay}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                            audit.anomalyType === 'NONE'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {audit.anomalyType === 'NONE'
                            ? '✓ 365d / Lifetime Valid'
                            : audit.anomalyType}
                        </span>
                        <p className="text-[10px] text-slate-500 mt-1 max-w-xs">
                          {audit.anomalyDescription}
                        </p>
                      </td>
                      <td className="p-3 font-mono text-[11px]">
                        {audit.proposed365ExpiryDateIst ? (
                          <div>
                            <span className="font-bold text-indigo-800 block">
                              {audit.proposed365ExpiryDateDisplay} ({audit.proposed365ExpiryDateIst}
                              )
                            </span>
                            <span className="text-[10px] text-emerald-700 font-bold">
                              ({audit.proposed365DaysRemaining} Days Remaining)
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-400">No change needed</span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        {audit.requiresAdminApprovalToMigrate && audit.proposed365ExpiryDateIst ? (
                          <button
                            type="button"
                            onClick={() => {
                              const res = adminApplyApproved365DayMigration(stu.id);
                              setSubscriptionMigrationFeedback({
                                studentId: stu.id,
                                message: res.message,
                                success: res.success,
                              });
                            }}
                            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] shadow-xs cursor-pointer"
                          >
                            Approve 365d ({audit.proposed365ExpiryDateIst})
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-700">✓ Verified</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECURE CLASS CORRECTION & PROMOTION MODAL */}
        {editingStudent && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-amber-300 p-6 space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between border-b pb-3">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-700" />
                  <div>
                    <h3 className="text-base font-display font-bold text-slate-900">
                      Admin Grade Promotion &amp; Correction
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Authorized change for {editingStudent.name} (UID: {editingStudent.id})
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Enrolled Grade:</span>
                  <span className="font-extrabold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded">
                    {editingStudent.classLevel}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Student Contact:</span>
                  <span className="font-mono text-slate-800">
                    {editingStudent.mobile} • {editingStudent.email}
                  </span>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const res = adminPromoteOrCorrectClass(
                    editingStudent.id,
                    targetNewClass,
                    classChangeReason,
                    adminAuthName
                  );
                  setClassChangeFeedback(res);
                  if (res.success) {
                    setTimeout(() => {
                      setEditingStudent(null);
                    }, 1200);
                  }
                }}
                className="space-y-3 text-xs"
              >
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Select New Class Level *
                  </label>
                  <select
                    value={targetNewClass}
                    onChange={(e) => setTargetNewClass(e.target.value as ClassLevel)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold bg-white text-slate-800"
                  >
                    {ALL_ADMIN_CLASSES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Reason for Change (Audit Log Trail) *
                  </label>
                  <input
                    type="text"
                    required
                    value={classChangeReason}
                    onChange={(e) => setClassChangeReason(e.target.value)}
                    placeholder="e.g. Annual school grade promotion / Registration mistake correction"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Authorized Administrator Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={adminAuthName}
                    onChange={(e) => setAdminAuthName(e.target.value)}
                    placeholder="Administrator Name or Employee ID"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-medium focus:outline-hidden"
                  />
                </div>

                {classChangeFeedback && (
                  <div
                    className={`p-3 rounded-xl border font-bold text-xs ${
                      classChangeFeedback.success
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                        : 'bg-rose-50 text-rose-900 border-rose-300'
                    }`}
                  >
                    {classChangeFeedback.message}
                  </div>
                )}

                {editingStudent.classChangeLogs && editingStudent.classChangeLogs.length > 0 && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
                      Previous Change Audit History:
                    </span>
                    <div className="space-y-1 max-h-24 overflow-y-auto">
                      {editingStudent.classChangeLogs.map((log, idx) => (
                        <div key={idx} className="p-2 bg-slate-50 rounded-lg text-[10px] text-slate-600">
                          <strong>
                            {log.oldClass} → {log.newClass}
                          </strong>{' '}
                          on {new Date(log.changedAt).toLocaleDateString()} by {log.adminName} (
                          {log.reason})
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingStudent(null)}
                    className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold cursor-pointer shadow-xs"
                  >
                    Confirm Official Grade Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
);
AdminStudentsSection.displayName = 'AdminStudentsSection';
