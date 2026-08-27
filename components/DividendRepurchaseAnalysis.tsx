'use client';

import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  Award,
  ShieldCheck,
  Percent,
  Calendar,
  DollarSign,
  PieChart,
  ArrowUpRight,
  Info,
  CheckCircle2,
} from 'lucide-react';
import {
  DIVIDEND_ANALYSIS_DATA,
  CompanyDividendAnalysis,
} from '@/lib/dividend-data';
import { useLanguage } from '@/lib/language-context';

interface Props {
  tickerCode: string;
  companyName: string;
}

export default function DividendRepurchaseAnalysis({ tickerCode, companyName }: Props) {
  const { isEn, t } = useLanguage();
  const data: CompanyDividendAnalysis | undefined = DIVIDEND_ANALYSIS_DATA[tickerCode];

  if (!data) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-base">
          <Coins className="w-5 h-5 text-amber-500" />
          <span>{isEn ? '💰 10-Yr Dividend & Total Shareholder Return' : '💰 10年配当推移 ＆ 株主還元（自社株買い・総還元性向）'}</span>
        </div>
        <p className="text-xs text-slate-500">
          {isEn
            ? `※ Dividend and buyback data for ${companyName} (${tickerCode}) is currently being aggregated.`
            : `※ ${companyName}（証券コード: ${tickerCode}）の配当・自社株買い詳細データは現在集計中です。`}
        </p>
      </div>
    );
  }

  // 最大配当額（棒グラフのスケール用）
  const maxDps = Math.max(...data.records.map((r) => r.dps), data.latestForecastDps, 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6">
      {/* ヘッダー ＆ 主要バッジ */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <span>{isEn ? '💰 10-Yr Dividend, Buybacks & Total Return' : '💰 10年配当推移 ＆ 株主還元（総還元性向・自社株買い）'}</span>
              </h3>
              <span className="text-xs text-slate-500">
                {isEn ? 'Dividend Per Share (DPS), Payout Ratio, Share Buybacks & Consecutive Increases' : '1株当たり配当金・配当性向・機動的自社株買い・連続増配年数の完全解剖'}
              </span>
            </div>
          </div>
        </div>

        {/* 還元ハイライトバッジ */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{isEn ? `${data.consecutiveDividendIncreases} Yrs Consecutive Div Hike` : `${data.consecutiveDividendIncreases}期 連続増配`}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>{isEn ? `${data.noDividendCutYears} Yrs No Dividend Cut` : `${data.noDividendCutYears}年 減配なし`}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-mono font-bold shadow-xs">
            <span>{isEn ? 'Forecast Yield:' : '予想利回り:'} <strong>{data.currentYield}%</strong></span>
          </div>
        </div>
      </div>

      {/* 配当方針 */}
      <div className="bg-slate-50/80 border border-slate-200/80 rounded-xl p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <span className="font-bold text-slate-900">{isEn ? 'Shareholder Return & Dividend Policy' : '株主還元・配当方針'}</span>
          <p className="text-slate-600 leading-relaxed font-normal">
            {data.dividendPolicy}
          </p>
        </div>
      </div>

      {/* 📊 10期 1株当たり配当金（DPS）ビジュアル棒グラフ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            1株当たり配当金（円）＆ 自社株買い推移
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            今期予想: ¥{data.latestForecastDps.toLocaleString()} / 株
          </span>
        </div>

        <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 pt-8">
          <div className="grid grid-cols-6 sm:grid-cols-11 gap-2 items-end h-48 border-b border-slate-200 pb-2">
            {data.records.map((r, idx) => {
              const heightPct = Math.min(100, Math.max(12, (r.dps / maxDps) * 100));
              const isForecast = r.fiscalYear.includes('予');

              return (
                <div key={r.fiscalYear} className="flex flex-col items-center gap-1.5 h-full justify-end group relative">
                  {/* ホバー時のツールチップ */}
                  <div className="absolute -top-12 bg-slate-900 text-white text-[10px] py-1 px-2 rounded-lg opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-20 shadow-md">
                    <div>1株配当: ¥{r.dps}</div>
                    <div>配当性向: {r.payoutRatio}%</div>
                    {r.shareBuybackBillion > 0 && (
                      <div>自社株買い: {r.shareBuybackBillion.toLocaleString()}億円</div>
                    )}
                  </div>

                  {/* 数値ラベル */}
                  <span className="text-[10px] font-mono font-bold text-slate-700">
                    ¥{r.dps}
                  </span>

                  {/* 棒グラフバー */}
                  <div className="w-full max-w-[28px] flex flex-col justify-end items-center">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-md transition-all duration-300 ${
                        isForecast
                          ? 'bg-gradient-to-t from-amber-500 to-amber-400 border-2 border-dashed border-amber-600'
                          : 'bg-gradient-to-t from-emerald-600 to-teal-400 group-hover:from-emerald-500 group-hover:to-teal-300'
                      }`}
                    />
                  </div>

                  {/* 年度ラベル */}
                  <span className={`text-[10px] font-mono ${isForecast ? 'font-bold text-amber-700' : 'text-slate-500'}`}>
                    '{r.fiscalYear.replace('20', '')}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-emerald-600 to-teal-400 inline-block" />
                実績配当
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-gradient-to-t from-amber-500 to-amber-400 border border-dashed border-amber-600 inline-block" />
                今期予想
              </span>
            </div>
            <span>※ 配当性向 = 1株配当 ÷ EPS × 100</span>
          </div>
        </div>
      </div>

      {/* 📑 過去10年の詳細還元データテーブル */}
      <div className="space-y-2">
        <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
          過去10期の配当・自社株買い・総還元性向 実績一覧
        </h4>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-2.5 px-3">決算期</th>
                <th className="py-2.5 px-3 text-right">1株配当</th>
                <th className="py-2.5 px-3 text-right">配当利回り</th>
                <th className="py-2.5 px-3 text-right">配当性向</th>
                <th className="py-2.5 px-3 text-right">自社株買い</th>
                <th className="py-2.5 px-3 text-right font-black text-slate-900">総還元性向</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {data.records.map((r) => {
                const isForecast = r.fiscalYear.includes('予');
                return (
                  <tr key={r.fiscalYear} className={isForecast ? 'bg-amber-50/50 font-bold' : 'hover:bg-slate-50/80'}>
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-900 flex items-center gap-1">
                      {r.fiscalYear}期
                      {isForecast && <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-sans">会社予想</span>}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-700">
                      ¥{r.dps.toFixed(1)}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {r.dividendYield.toFixed(2)}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600">
                      {r.payoutRatio.toFixed(1)}%
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-600 font-sans">
                      {r.shareBuybackBillion > 0 ? `${r.shareBuybackBillion.toLocaleString()} 億円` : '-'}
                    </td>
                    <td className="py-2.5 px-3 text-right font-black text-indigo-700">
                      {r.totalReturnRatio.toFixed(1)}%
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