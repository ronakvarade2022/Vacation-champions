import React, { useEffect, useMemo, useState } from 'react';
import { Megaphone, Pause, Play, X, ArrowUpRight } from 'lucide-react';
import {
  AnnouncementTickerActionTarget,
  filterActiveTickerItemsForAudience,
  LIVE_TICKER_UPDATED_EVENT,
  LiveAnnouncementTickerConfig,
  readCachedTickerConfig,
  TICKER_CATEGORY_LABELS,
} from '../types/announcementTicker';
import { subscribeAnnouncementTickerConfig } from '../services/specialContentFirestoreService';

interface LiveAnnouncementTickerProps {
  audience: 'website' | 'students' | 'teachers';
  onActionNavigate: (target: AnnouncementTickerActionTarget) => void;
  previewConfig?: LiveAnnouncementTickerConfig;
  isPreview?: boolean;
}

const SPEED_DURATION_SECONDS: Record<LiveAnnouncementTickerConfig['speed'], number> = {
  slow: 54,
  normal: 36,
  fast: 22,
};

export const LiveAnnouncementTicker: React.FC<LiveAnnouncementTickerProps> = ({
  audience,
  onActionNavigate,
  previewConfig,
  isPreview = false,
}) => {
  const [config, setConfig] = useState<LiveAnnouncementTickerConfig>(() =>
    previewConfig || readCachedTickerConfig()
  );
  const [isPaused, setIsPaused] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (previewConfig) {
      setConfig(previewConfig);
      return;
    }

    const unsubscribe = subscribeAnnouncementTickerConfig((remoteConfig) => {
      if (remoteConfig) {
        setConfig(remoteConfig);
      }
    });

    const handleLocalUpdate = (ev: Event) => {
      const custom = ev as CustomEvent<LiveAnnouncementTickerConfig>;
      if (custom.detail) {
        setConfig(custom.detail);
      }
    };

    window.addEventListener(LIVE_TICKER_UPDATED_EVENT, handleLocalUpdate);
    return () => {
      unsubscribe();
      window.removeEventListener(LIVE_TICKER_UPDATED_EVENT, handleLocalUpdate);
    };
  }, [previewConfig]);

  const activeItems = useMemo(
    () => filterActiveTickerItemsForAudience(config, audience),
    [config, audience]
  );

  if (!isPreview && (isDismissed || !config.enabled || activeItems.length === 0)) {
    return null;
  }

  if (isPreview && (!config.enabled || activeItems.length === 0)) {
    return (
      <div className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-500">
        Ticker is currently hidden ({!config.enabled ? 'Master toggle OFF' : 'No active announcements for selected audience'}).
      </div>
    );
  }

  const durationSec = SPEED_DURATION_SECONDS[config.speed] || 36;
  const shouldScroll = activeItems.length > 0;
  const repeatedItems = shouldScroll ? [...activeItems, ...activeItems] : activeItems;

  return (
    <section
      aria-label="Live Announcements"
      role="region"
      data-testid="live-announcement-ticker"
      className={`w-full max-w-full overflow-hidden border-b border-amber-200/80 bg-slate-900 text-slate-100 no-print ${
        isPreview ? 'rounded-xl border' : ''
      }`}
    >
      <div className="msz-container px-3 sm:px-6 lg:px-8 flex items-center gap-3 min-h-[42px] xl:min-h-[46px]">
        {/* Static Label */}
        <div className="flex items-center gap-1.5 shrink-0 pr-3 border-r border-slate-700 text-amber-400">
          <Megaphone className="w-3.5 h-3.5 xl:w-4 xl:h-4 shrink-0" aria-hidden="true" />
          <span className="text-xs xl:text-sm font-bold tracking-tight whitespace-nowrap">
            Announcements
          </span>
        </div>

        {/* Scrolling Track (min-w-0 prevents flex child w-max from overflowing viewport) */}
        <div
          className={`flex-1 min-w-0 overflow-hidden relative py-2 ${
            config.pauseOnHover ? 'msz-ticker-hover-pause' : ''
          }`}
        >
          <div
            className="msz-ticker-track flex items-center gap-8 whitespace-nowrap w-max"
            style={{
              animationDuration: `${Math.max(18, durationSec + activeItems.length * 4)}s`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            {repeatedItems.map((item, idx) => (
              <div
                key={`${item.id}_${idx}`}
                className="inline-flex items-center gap-2 text-xs xl:text-sm leading-normal"
                aria-hidden={idx >= activeItems.length ? 'true' : undefined}
              >
                <span className="font-semibold text-amber-300">
                  {TICKER_CATEGORY_LABELS[item.category] || 'Update'}
                </span>
                <span className="text-slate-500" aria-hidden="true">
                  ·
                </span>
                <span className="text-slate-100 font-medium">{item.message}</span>
                {item.actionTarget && item.actionTarget !== 'none' && item.actionLabel && (
                  <button
                    type="button"
                    tabIndex={idx >= activeItems.length ? -1 : 0}
                    onClick={() => onActionNavigate(item.actionTarget!)}
                    className="inline-flex items-center gap-0.5 text-amber-300 hover:text-amber-200 underline underline-offset-2 font-semibold cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-400 rounded-sm px-1"
                  >
                    <span>{item.actionLabel}</span>
                    <ArrowUpRight className="w-3 h-3 xl:w-3.5 xl:h-3.5" aria-hidden="true" />
                  </button>
                )}
                <span className="text-slate-600 pl-4" aria-hidden="true">
                  /
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-1 shrink-0 pl-2 border-l border-slate-700">
          <button
            type="button"
            aria-label={isPaused ? 'Resume announcements ticker' : 'Pause announcements ticker'}
            aria-pressed={isPaused}
            onClick={() => setIsPaused((prev) => !prev)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
            title={isPaused ? 'Resume ticker' : 'Pause ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
          {!isPreview && (
            <button
              type="button"
              aria-label="Hide announcements bar for this session"
              onClick={() => setIsDismissed(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400"
              title="Hide announcements"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
