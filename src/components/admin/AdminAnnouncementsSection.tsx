import React, { useEffect, useState } from 'react';
import {
  Megaphone,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Save,
  RotateCcw,
  Edit3,
  Check,
  X,
} from 'lucide-react';
import {
  AnnouncementTickerActionTarget,
  AnnouncementTickerAudience,
  AnnouncementTickerCategory,
  AnnouncementTickerSpeed,
  DEFAULT_LIVE_ANNOUNCEMENT_TICKER_CONFIG,
  LiveAnnouncementTickerConfig,
  LiveAnnouncementTickerItem,
  readCachedTickerConfig,
  TICKER_ACTION_OPTIONS,
  TICKER_CATEGORY_LABELS,
} from '../../types/announcementTicker';
import {
  loadPlatformConfigDetailed,
  saveAnnouncementTickerConfigToFirestore,
} from '../../services/specialContentFirestoreService';
import { LiveAnnouncementTicker } from '../LiveAnnouncementTicker';

export const AdminAnnouncementsSection: React.FC = () => {
  const [config, setConfig] = useState<LiveAnnouncementTickerConfig>(() =>
    readCachedTickerConfig()
  );
  const [previewAudience, setPreviewAudience] = useState<'website' | 'students' | 'teachers'>(
    'students'
  );
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );

  // Add / Edit form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState<AnnouncementTickerCategory>('UPDATE');
  const [audience, setAudience] = useState<AnnouncementTickerAudience>('all');
  const [actionTarget, setActionTarget] = useState<AnnouncementTickerActionTarget>('none');
  const [actionLabel, setActionLabel] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [active, setActive] = useState(true);

  useEffect(() => {
    let mounted = true;
    void loadPlatformConfigDetailed({ forceRefresh: true }).then((res) => {
      if (mounted && res.config?.announcementTicker) {
        setConfig(res.config.announcementTicker);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setMessage('');
    setCategory('UPDATE');
    setAudience('all');
    setActionTarget('none');
    setActionLabel('');
    setExpiresAt('');
    setActive(true);
  };

  const handleSaveLive = async (nextConfig: LiveAnnouncementTickerConfig) => {
    setIsSaving(true);
    setFeedback(null);
    const res = await saveAnnouncementTickerConfigToFirestore(nextConfig);
    setIsSaving(false);
    if (res.success) {
      setFeedback({
        type: 'success',
        message: 'Live Announcement Ticker saved and broadcast to Website, Student & Teacher apps.',
      });
    } else {
      setFeedback({
        type: 'error',
        message:
          'Saved locally on this device, but Firestore cloud sync requires an authenticated Admin session.',
      });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanMsg = message.trim();
    if (!cleanMsg) {
      setFeedback({ type: 'error', message: 'Please enter an announcement message.' });
      return;
    }

    const cleanItem: LiveAnnouncementTickerItem = {
      id: editingId || `ann_${Date.now()}`,
      message: cleanMsg.slice(0, 240),
      category,
      audience,
      active,
      actionTarget,
      actionLabel:
        actionTarget !== 'none'
          ? actionLabel.trim().slice(0, 40) ||
            TICKER_ACTION_OPTIONS.find((o) => o.value === actionTarget)?.label.replace(/^Open /, '')
          : undefined,
      expiresAt: /^\d{4}-\d{2}-\d{2}$/.test(expiresAt) ? expiresAt : undefined,
      createdAt:
        editingId
          ? config.items.find((i) => i.id === editingId)?.createdAt || new Date().toISOString()
          : new Date().toISOString(),
    };

    const nextItems = editingId
      ? config.items.map((item) => (item.id === editingId ? cleanItem : item))
      : [cleanItem, ...config.items];

    const nextConfig: LiveAnnouncementTickerConfig = {
      ...config,
      items: nextItems,
      updatedAt: new Date().toISOString(),
    };
    setConfig(nextConfig);
    resetForm();
    void handleSaveLive(nextConfig);
  };

  const handleEditItem = (item: LiveAnnouncementTickerItem) => {
    setEditingId(item.id);
    setMessage(item.message);
    setCategory(item.category);
    setAudience(item.audience);
    setActionTarget(item.actionTarget || 'none');
    setActionLabel(item.actionLabel || '');
    setExpiresAt(item.expiresAt || '');
    setActive(item.active);
    setFeedback(null);
  };

  const handleToggleItemActive = (id: string) => {
    const nextConfig: LiveAnnouncementTickerConfig = {
      ...config,
      items: config.items.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      ),
      updatedAt: new Date().toISOString(),
    };
    setConfig(nextConfig);
  };

  const handleDeleteItem = (id: string) => {
    const nextConfig: LiveAnnouncementTickerConfig = {
      ...config,
      items: config.items.filter((item) => item.id !== id),
      updatedAt: new Date().toISOString(),
    };
    setConfig(nextConfig);
    if (editingId === id) resetForm();
  };

  const handleMoveItem = (index: number, direction: -1 | 1) => {
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= config.items.length) return;
    const copy = [...config.items];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIdx, 0, moved);
    setConfig({ ...config, items: copy, updatedAt: new Date().toISOString() });
  };

  return (
    <div className="space-y-6">
      {/* Header & Global Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-display font-bold text-slate-900">
                Live Announcement Ticker Controls
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Broadcast real-time notices across the public website, Student Portal, and Teacher Portal via Firestore.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setConfig(DEFAULT_LIVE_ANNOUNCEMENT_TICKER_CONFIG);
                resetForm();
              }}
              className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Load Defaults</span>
            </button>
            <button
              type="button"
              disabled={isSaving}
              onClick={() => void handleSaveLive(config)}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-60 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Publishing...' : 'Save & Publish Live'}</span>
            </button>
          </div>
        </div>

        {feedback && (
          <div
            role="status"
            className={`rounded-xl border px-4 py-3 text-xs font-semibold flex items-center justify-between gap-3 ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}
          >
            <span>{feedback.message}</span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="p-1 rounded-lg hover:bg-black/5 cursor-pointer"
              aria-label="Dismiss status message"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Master Settings Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
          <label className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900">Ticker Master Switch</p>
              <p className="text-[11px] text-slate-500">
                {config.enabled ? 'Visible across active portals' : 'Hidden everywhere'}
              </p>
            </div>
            <input
              type="checkbox"
              checked={config.enabled}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, enabled: e.target.checked }))
              }
              className="w-5 h-5 accent-amber-600 cursor-pointer"
            />
          </label>

          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-900">Scroll Speed</p>
              <p className="text-[11px] text-slate-500">Adjust reading pace</p>
            </div>
            <select
              aria-label="Ticker Scroll Speed"
              value={config.speed}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  speed: e.target.value as AnnouncementTickerSpeed,
                }))
              }
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-800"
            >
              <option value="slow">Slow</option>
              <option value="normal">Normal</option>
              <option value="fast">Fast</option>
            </select>
          </div>

          <label className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 cursor-pointer">
            <div>
              <p className="text-xs font-bold text-slate-900">Pause on Hover</p>
              <p className="text-[11px] text-slate-500">Stop scrolling on cursor hover</p>
            </div>
            <input
              type="checkbox"
              checked={config.pauseOnHover}
              onChange={(e) =>
                setConfig((prev) => ({ ...prev, pauseOnHover: e.target.checked }))
              }
              className="w-5 h-5 accent-amber-600 cursor-pointer"
            />
          </label>
        </div>

        {/* Live Preview Strip */}
        <div className="space-y-2 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-slate-700">Live Preview</span>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-100">
              {(['website', 'students', 'teachers'] as const).map((aud) => (
                <button
                  key={aud}
                  type="button"
                  onClick={() => setPreviewAudience(aud)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer transition-colors ${
                    previewAudience === aud
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {aud === 'website'
                    ? 'Website Visitors'
                    : aud === 'students'
                    ? 'Student App'
                    : 'Teacher Portal'}
                </button>
              ))}
            </div>
          </div>
          <LiveAnnouncementTicker
            audience={previewAudience}
            previewConfig={config}
            isPreview
            onActionNavigate={() => undefined}
          />
        </div>
      </div>

      {/* Add / Edit Announcement Form */}
      <form
        onSubmit={handleFormSubmit}
        className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            {editingId ? 'Edit Announcement' : 'Add New Live Announcement'}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              Cancel Edit
            </button>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Announcement Message ({message.length}/240)
          </label>
          <input
            type="text"
            maxLength={240}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., New CBSE & Maharashtra State Board Class 10 Practice Papers are now live!"
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as AnnouncementTickerCategory)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
            >
              {Object.entries(TICKER_CATEGORY_LABELS).map(([k, label]) => (
                <option key={k} value={k}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
            <select
              value={audience}
              onChange={(e) => setAudience(e.target.value as AnnouncementTickerAudience)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
            >
              <option value="all">All (Website + Students + Teachers)</option>
              <option value="website">Public Website Visitors Only</option>
              <option value="students">Student Portal Only</option>
              <option value="teachers">Teacher Portal Only</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Action Link</label>
            <select
              value={actionTarget}
              onChange={(e) => setActionTarget(e.target.value as AnnouncementTickerActionTarget)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
            >
              {TICKER_ACTION_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Auto-Expire Date (Optional)
            </label>
            <input
              type="date"
              value={expiresAt}
              onChange={(e) => setExpiresAt(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-800"
            />
          </div>
        </div>

        {actionTarget !== 'none' && (
          <div className="max-w-sm">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Button Label (Optional)
            </label>
            <input
              type="text"
              maxLength={40}
              value={actionLabel}
              onChange={(e) => setActionLabel(e.target.value)}
              placeholder="e.g., Open Now"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
              className="w-4 h-4 accent-amber-600 cursor-pointer"
            />
            <span>Publish immediately as Active</span>
          </label>

          <button
            type="submit"
            disabled={isSaving}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
          >
            {editingId ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            <span>{editingId ? 'Update & Publish' : 'Add & Publish Live'}</span>
          </button>
        </div>
      </form>

      {/* Managed Announcements List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">
            Scheduled &amp; Live Announcements ({config.items.length})
          </h3>
          <span className="text-xs text-slate-500 tabular-nums">
            {config.items.filter((i) => i.active).length} active
          </span>
        </div>

        {config.items.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500">
            No announcements configured yet. Add your first live notice above.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {config.items.map((item, idx) => (
              <div
                key={item.id}
                className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                    <span className="font-bold text-amber-700">
                      {TICKER_CATEGORY_LABELS[item.category]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      Audience:{' '}
                      <strong className="text-slate-700 capitalize">{item.audience}</strong>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={
                        item.active
                          ? 'text-emerald-700 font-semibold'
                          : 'text-slate-500 font-medium'
                      }
                    >
                      {item.active ? 'Active' : 'Paused'}
                    </span>
                    {item.expiresAt && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">Expires {item.expiresAt}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-slate-900 break-words">
                    {item.message}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleToggleItemActive(item.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer border transition-colors ${
                      item.active
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
                        : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.active ? 'Active' : 'Paused'}
                  </button>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMoveItem(idx, -1)}
                    aria-label="Move announcement up"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === config.items.length - 1}
                    onClick={() => handleMoveItem(idx, 1)}
                    aria-label="Move announcement down"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEditItem(item)}
                    aria-label="Edit announcement"
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteItem(item.id)}
                    aria-label="Delete announcement"
                    className="p-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
