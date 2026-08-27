'use client';

import React from 'react';
import {
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Zap,
  Clock,
  ArrowUpRight,
  BarChart2,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import {
  QUARTERLY_PROGRESS_DATA,
  CompanyQuarterlyProgress,
} from '@/lib/quarterly-progress-data';
import { useLanguage } from '@/lib/language-context';

interface Props {
  tickerCode: string;
  companyName: string;
}

export default function QuarterlyProgressTracker({ tickerCode, companyName }: Props) {
  const { isEn, t } = useLanguage();
  const data: CompanyQuarterlyProgress | undefined = QUARTERLY_PROGRESS_DATA[tickerCode];

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-base">
          <Target className="w-5 h-5 text-indigo-600" />
          <span>{isEn ? '🎯 Quarterly Progress Tracker (Q on Q Signals)' : '🎯 四半期業績進捗率ゲージ ＆ 決算シグナル（Q on Q）'}</span>
        </div>
        <p className="text-xs text-slate-500">
          {isEn
            ? `※ Quarterly progress data for ${companyName} (${tickerCode}) is currently being aggregated.`
            : `※ ${companyName}（証券コード: ${tickerCode}）の直近四半期進捗データは現在集計中です。`}
        </p>
      </div>
    );
  }

  // シグナルのバッジ・カラー設定
  const getSignalBadge = (signal: string) => {
    switch (signal) {
      case 'strong_upgrade':
        return {
          label: isEn ? '🚀 Guidance Upgrade Signal' : '🚀 上方修正シグナル点灯',
          bgColor: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: Zap,
        };
      case 'steady':
        return {
          label: isEn ? '✅ On Track / In-line' : '✅ 順調・計画通り進捗',
          bgColor: 'bg-sky-50 text-sky-800 border-sky-300',
          icon: CheckCircle2,
        };
      case 'downward_risk':
        return {
          label: isEn ? '⚠️ Downward Risk Alert' : '⚠️ 下方修正リスク注意',
          bgColor: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: AlertCircle,
        };
      default:
        return {
          label: isEn ? '👀 Watchlist' : '👀 慎重見極め',
          bgColor: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: Clock,
        };
    }
  };

  const signalInfo = getSignalBadge(data.signal);
  const SignalIcon = signalInfo.icon;

  // 億円フォーマット
  const formatBillion = (val: number) => {
    if (Math.abs(val) >= 10000) {
      return isEn ? `¥${(val / 10000).toFixed(2)}T` : `¥${(val / 10000).toFixed(2)} 兆円`;
    }
    return isEn ? `¥${val.toLocaleString()}B` : `¥${val.toLocaleString()} 億円`;
  };

  // 最大四半期売上高（グラフ用）
  const maxQRevenue = Math.max(...data.quarterlyBreakdown.map((q) => q.revenueBillion), 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
      {/* ヘッダー ＆ シグナルバッジ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>{isEn ? '🎯 Quarterly Progress Tracker & Signals (Q on Q)' : '🎯 四半期業績進捗率ゲージ ＆ 決算シグナル（Q on Q）'}</span>
              </h3>
              <span className="text-xs text-slate-500">
                {isEn
                  ? `${data.fiscalYear} Q${data.latestQuarter} Cumulative (Reported: ${data.announcementDate})`
                  : `${data.fiscalYear} 第${data.latestQuarter}累計（発表日: ${data.announcementDate}）`}
              </span>
            </div>
          </div>
        </div>

        {/* 決算判定シグナル */}
        <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold shadow-xs ${signalInfo.bgColor}`}>
          <SignalIcon className="w-4 h-4 shrink-0" />
          <span>{signalInfo.label}</span>
        </div>
      </div>

      {/* 判定解説アラート */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-bold text-slate-900">進捗状況・アナリスト判定サマリー</span>
          <p className="text-slate-600 leading-relaxed font-normal">
            {data.signalReason}
          </p>
        </div>
      </div>

      {/* 📊 3大指標の進捗率バー（売上高・営業利益・純利益） */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ① 売上高進捗 */}
        <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">売上高 進捗率</span>
            <span className="font-mono font-black text-slate-900 text-sm">
              {data.progressRate.revenuePct}%
            </span>
          </div>

          {/* プログレスバー */}
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
            <div
              style={{ width: `${Math.min(100, data.progressRate.revenuePct)}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-500"
            />
            {/* 過去平均ライン */}
            <div
              style={{ left: `${data.historicalAverageProgress.revenuePct}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-800 z-10"
              title={`過去平均: ${data.historicalAverageProgress.revenuePct}%`}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>累計: {formatBillion(data.cumulativeActual.revenueBillion)}</span>
            <span>通期予: {formatBillion(data.fullYearForecast.revenueBillion)}</span>
          </div>
          <div className="text-[10px] text-slate-400 font-sans text-right">
            過去3年同期平均: <strong>{data.historicalAverageProgress.revenuePct}%</strong>
          </div>
        </div>

        {/* ② 営業利益進捗 */}
        <div className="bg-emerald-50/40 border border-emerald-200/60 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-900">営業利益 進捗率</span>
            <span className="font-mono font-black text-emerald-700 text-sm">
              {data.progressRate.operatingIncomePct}%
            </span>
          </div>

          {/* プログレスバー */}
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
            <div
              style={{ width: `${Math.min(100, data.progressRate.operatingIncomePct)}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
            />
            {/* 過去平均ライン */}
            <div
              style={{ left: `${data.historicalAverageProgress.operatingIncomePct}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-800 z-10"
              title={`過去平均: ${data.historicalAverageProgress.operatingIncomePct}%`}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-600 font-mono">
            <span>累計: {formatBillion(data.cumulativeActual.operatingIncomeBillion)}</span>
            <span>通期予: {formatBillion(data.fullYearForecast.operatingIncomeBillion)}</span>
          </div>
          <div className="text-[10px] text-slate-500 font-sans text-right">
            過去3年同期平均: <strong>{data.historicalAverageProgress.operatingIncomePct}%</strong>
          </div>
        </div>

        {/* ③ 当期純利益進捗 */}
        <div className="bg-sky-50/40 border border-sky-200/60 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sky-900">当期純利益 進捗率</span>
            <span className="font-mono font-black text-sky-700 text-sm">
              {data.progressRate.netIncomePct}%
            </span>
          </div>

          {/* プログレスバー */}
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden relative">
            <div
              style={{ width: `${Math.min(100, data.progressRate.netIncomePct)}%` }}
              className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full transition-all duration-500"
            />
            {/* 過去平均ライン */}
            <div
              style={{ left: `${data.historicalAverageProgress.netIncomePct}%` }}
              className="absolute top-0 bottom-0 w-0.5 bg-slate-800 z-10"
              title={`過去平均: ${data.historicalAverageProgress.netIncomePct}%`}
            />
          </div>

          <div className="flex justify-between text-[11px] text-slate-600 font-mono">
            <span>累計: {formatBillion(data.cumulativeActual.netIncomeBillion)}</span>
            <span>通期予: {formatBillion(data.fullYearForecast.netIncomeBillion)}</span>
          </div>
          <div className="text-[10px] text-slate-500 font-sans text-right">
            過去3年同期平均: <strong>{data.historicalAverageProgress.netIncomePct}%</strong>
          </div>
        </div>
      </div>

      {/* 📈 直近四半期ごとの売上・利益推移バー */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
          <BarChart2 className="w-4 h-4 text-indigo-600" />
          四半期（Q on Q）売上高 ＆ 営業利益 推移
        </h4>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-2.5 px-3">四半期</th>
                <th className="py-2.5 px-3 text-right">四半期売上高</th>
                <th className="py-2.5 px-3 text-right">四半期営業利益</th>
                <th className="py-2.5 px-3 text-right">四半期営業利益率</th>
                <th className="py-2.5 px-3 text-right">四半期純利益</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {data.quarterlyBreakdown.map((q) => {
                const opMargin = (q.operatingIncomeBillion / q.revenueBillion) * 100;
                return (
                  <tr key={q.quarter} className="hover:bg-slate-50/80">
                    <td className="py-2.5 px-3 font-sans font-bold text-slate-900">
                      {q.quarter}
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium text-slate-900">
                      {formatBillion(q.revenueBillion)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      +{formatBillion(q.operatingIncomeBillion)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-indigo-600">
                      {opMargin.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-700">
                      +{formatBillion(q.netIncomeBillion)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}