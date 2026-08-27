'use client';

import React from 'react';
import { Landmark, ArrowDownCircle, ArrowUpCircle, Calendar, Sparkles, Building, ExternalLink, ShieldCheck, Coins } from 'lucide-react';

export interface CapitalEvent {
  id: number;
  eventDate: string;
  eventType: string;
  category: string; // "FUNDING" | "CAPITAL_REDUCTION" | "STOCK_SPLIT" | "OTHER"
  amount?: number | null;
  capitalAfter?: number | null;
  investors?: string | null;
  purpose?: string | null;
  source?: string | null;
}

interface CapitalEventTimelineProps {
  companyName: string;
  events: CapitalEvent[];
}

export default function CapitalEventTimeline({ companyName, events }: CapitalEventTimelineProps) {
  // 百万円 → 億円 / 兆円の正確な換算 (100百万円 = 1億円)
  const formatAmount = (millionYen?: number | null) => {
    if (!millionYen) return '-';
    const oku = millionYen / 100;
    if (Math.abs(oku) >= 10000) {
      return `${(oku / 10000).toFixed(2)} 兆円`;
    }
    if (Math.abs(millionYen) >= 100) {
      return `${oku.toFixed(1)} 億円`;
    }
    return `${millionYen.toLocaleString()} 百万円`;
  };

  const totalFundraising = events
    .filter((e) => e.category === 'FUNDING' && e.amount)
    .reduce((sum, e) => sum + (e.amount || 0), 0);

  const fundingCount = events.filter((e) => e.category === 'FUNDING').length;
  const reductionCount = events.filter((e) => e.category === 'CAPITAL_REDUCTION').length;

  return (
    <div className="space-y-6">
      {/* 資本政策サマリーヘッダー */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 shadow-md border border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 text-xs font-semibold mb-2">
              <Coins className="w-3.5 h-3.5" />
              <span>Capital Policy & Financing History</span>
            </div>
            <h3 className="text-xl font-black text-white tracking-tight">
              資本政策・資金調達 ＆ 減資タイムライン
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              官報の資本金減少公告および公式発表から集約した資本移動の全履歴
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-800/80 p-3.5 rounded-xl border border-slate-700/70">
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">推定・累計調達額</div>
              <div className="text-lg font-black font-mono text-emerald-400">
                {totalFundraising > 0 ? formatAmount(totalFundraising) : '-'}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-700" />
            <div>
              <div className="text-[10px] text-slate-400 font-semibold">ラウンド数 / 減資</div>
              <div className="text-sm font-bold font-mono text-slate-200">
                調達 <span className="text-emerald-400">{fundingCount}</span>回 / 減資 <span className="text-amber-400">{reductionCount}</span>回
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* タイムライン */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        {events.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-sm">
            登録されている資本移動・調達履歴はありません
          </div>
        ) : (
          <div className="relative border-l-2 border-slate-200 ml-4 sm:ml-6 space-y-8 pb-4">
            {events.map((event) => {
              const isFunding = event.category === 'FUNDING';
              const isReduction = event.category === 'CAPITAL_REDUCTION';

              return (
                <div key={event.id} className="relative pl-6 sm:pl-8 group">
                  {/* タイムラインドット / アイコン */}
                  <div className={`absolute -left-4 top-1.5 w-8 h-8 rounded-full flex items-center justify-center border-2 transition ${
                    isFunding
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white'
                      : isReduction
                      ? 'bg-amber-50 border-amber-500 text-amber-600 group-hover:bg-amber-500 group-hover:text-white'
                      : 'bg-indigo-50 border-indigo-500 text-indigo-600'
                  }`}>
                    {isFunding ? (
                      <ArrowUpCircle className="w-4 h-4" />
                    ) : isReduction ? (
                      <ArrowDownCircle className="w-4 h-4" />
                    ) : (
                      <Landmark className="w-4 h-4" />
                    )}
                  </div>

                  {/* イベントカード */}
                  <div className="bg-slate-50/70 hover:bg-slate-50 border border-slate-200/80 rounded-2xl p-5 transition shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/60">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono border ${
                          isFunding
                            ? 'bg-emerald-100/70 text-emerald-800 border-emerald-300'
                            : isReduction
                            ? 'bg-amber-100/70 text-amber-800 border-amber-300'
                            : 'bg-indigo-100/70 text-indigo-800 border-indigo-300'
                        }`}>
                          {event.eventType}
                        </span>

                        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {event.eventDate}
                        </span>
                      </div>

                      {/* 金額バッジ */}
                      {event.amount && (
                        <div className="font-mono text-base font-black text-slate-900">
                          {isFunding ? '+' : isReduction ? '△' : ''}
                          {formatAmount(event.amount)}
                        </div>
                      )}
                    </div>

                    <div className="mt-3.5 space-y-2.5 text-xs text-slate-700">
                      {event.investors && event.investors !== '-' && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-slate-500 min-w-[70px]">引受先 / VC:</span>
                          <span className="font-medium text-slate-900">{event.investors}</span>
                        </div>
                      )}

                      {event.purpose && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-slate-500 min-w-[70px]">目的・使途:</span>
                          <span className="leading-relaxed text-slate-700">{event.purpose}</span>
                        </div>
                      )}

                      {event.capitalAfter && (
                        <div className="flex items-start gap-2">
                          <span className="font-semibold text-slate-500 min-w-[70px]">変更後資本金:</span>
                          <span className="font-mono font-bold text-teal-700">
                            {formatAmount(event.capitalAfter)}
                          </span>
                        </div>
                      )}

                      {event.source && (
                        <div className="pt-2 border-t border-slate-200/50 flex items-center gap-1.5 text-[11px] text-slate-400">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          <span>情報元: {event.source}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}