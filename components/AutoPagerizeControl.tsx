'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AutoPagerizeProps {
  currentLoadedCount: number;
  totalCount: number;
  itemsPerPage: number;
  onLoadMore: () => void;
  isAutoPagerizeEnabled: boolean;
  onToggleAutoPagerize: (enabled: boolean) => void;
  unitLabel?: string;
  isEn?: boolean;
}

export function AutoPagerizeControl({
  currentLoadedCount,
  totalCount,
  itemsPerPage,
  onLoadMore,
  isAutoPagerizeEnabled,
  onToggleAutoPagerize,
  unitLabel = '件',
  isEn = false
}: AutoPagerizeProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const hasMore = currentLoadedCount < totalCount;

  // IntersectionObserverによる自動ローダー
  useEffect(() => {
    if (!isAutoPagerizeEnabled || !hasMore || isLoadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          setIsLoadingMore(true);
          // スムーズな体感ウェイト
          setTimeout(() => {
            onLoadMore();
            setIsLoadingMore(false);
          }, 350);
        }
      },
      {
        rootMargin: '200px', // スクロール完了の少し手前で先読み
        threshold: 0.1
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) {
        observer.unobserve(currentSentinel);
      }
    };
  }, [isAutoPagerizeEnabled, hasMore, isLoadingMore, onLoadMore]);

  const progressPct = totalCount > 0 ? Math.min(100, Math.round((currentLoadedCount / totalCount) * 100)) : 100;

  return (
    <div className="w-full my-6 flex flex-col items-center justify-center gap-3">
      {/* センチネル要素 */}
      <div ref={sentinelRef} className="h-2 w-full" />

      {/* AutoPagerize コントロールバー */}
      <div className="w-full max-w-2xl bg-white border border-slate-200/80 shadow-sm rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* 進捗情報 */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 font-bold text-lg shrink-0">
            ⚡
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800">
                {isEn ? 'AutoPagerize' : 'AutoPagerize (自動ページめくり)'}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                isAutoPagerizeEnabled
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-slate-100 text-slate-600 border border-slate-200'
              }`}>
                {isAutoPagerizeEnabled ? (isEn ? 'Active' : '稼働中') : (isEn ? 'Manual' : '手動モード')}
              </span>
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
              <span>{isEn ? 'Showing' : '表示中'}: <b className="text-slate-800 font-mono">{currentLoadedCount.toLocaleString()}</b> / <b className="text-slate-800 font-mono">{totalCount.toLocaleString()}</b> {unitLabel}</span>
              <span>({progressPct}%)</span>
            </div>
            {/* プログレスバー */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-1.5 overflow-hidden">
              <div
                className="bg-teal-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* コントロールアクション */}
        <div className="flex items-center gap-2.5 shrink-0 w-full sm:w-auto justify-end">
          {hasMore && (
            <button
              onClick={() => {
                setIsLoadingMore(true);
                onLoadMore();
                setTimeout(() => setIsLoadingMore(false), 200);
              }}
              disabled={isLoadingMore}
              className="px-3.5 py-1.5 text-xs font-bold rounded-xl bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 transition shadow-2xs flex items-center gap-1.5"
            >
              {isLoadingMore ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-teal-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{isEn ? 'Loading...' : '読み込み中...'}</span>
                </>
              ) : (
                <>
                  <span>⬇️</span>
                  <span>{isEn ? `Load Next ${itemsPerPage}` : `次の${itemsPerPage}${unitLabel}を読込`}</span>
                </>
              )}
            </button>
          )}

          {/* ON/OFF 切り替えトグル */}
          <button
            onClick={() => onToggleAutoPagerize(!isAutoPagerizeEnabled)}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl border transition flex items-center gap-1.5 ${
              isAutoPagerizeEnabled
                ? 'bg-teal-700 text-white border-teal-800 shadow-xs hover:bg-teal-800'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
            title={isAutoPagerizeEnabled ? 'スクロール連動の自動読み込みを一時停止' : 'スクロール連動の自動読み込みを有効化'}
          >
            <span>{isAutoPagerizeEnabled ? '⚡ ON' : '⏸️ OFF'}</span>
          </button>
        </div>
      </div>

      {/* 自動読み込み中のスピナートースト */}
      {isLoadingMore && (
        <div className="animate-pulse flex items-center gap-2 text-xs font-bold text-teal-700 bg-teal-50 border border-teal-200 px-4 py-2 rounded-full shadow-sm">
          <svg className="animate-spin h-4 w-4 text-teal-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{isEn ? 'AutoPagerize loading next items on scroll...' : 'スクロールを検知: 次のデータを自動追記中...'}</span>
        </div>
      )}

      {/* 全件読込完了時のバッジ */}
      {!hasMore && totalCount > itemsPerPage && (
        <div className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-4 py-1.5 rounded-full">
          ✨ {isEn ? `All ${totalCount} items loaded.` : `全 ${totalCount.toLocaleString()} ${unitLabel}の読み込みが完了しました`}
        </div>
      )}
    </div>
  );
}
