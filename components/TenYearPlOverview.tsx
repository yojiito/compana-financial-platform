'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import {
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
  Award,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Info,
  Sliders,
} from 'lucide-react';

interface FinancialRecord {
  id?: number;
  fiscalYear: number;
  periodType?: string;
  periodEnd: string;
  revenue: number;
  operatingIncome: number;
  ordinaryIncome?: number | null;
  netIncome: number;
  operatingMargin?: number | null;
  eps?: number | null;
  dividendPerShare?: number | null;
}

interface TenYearPlOverviewProps {
  companyName: string;
  tickerCode: string;
  financials: FinancialRecord[];
}

export default function TenYearPlOverview({
  companyName,
  tickerCode,
  financials,
}: TenYearPlOverviewProps) {
  // 表示単位モード: 'million' (百万円: 四季報・有報標準) | 'smart' (兆・億円)
  const [unitMode, setUnitMode] = useState<'million' | 'smart'>('million');

  // 通期レコード (FY) のみを年次10年推移として抽出
  const annualFinancials = (financials || []).filter(f => !f.periodType || f.periodType === 'FY');
  // 直近四半期レコード (Q1等) を抽出
  const latestQuarter = (financials || []).find(f => f.periodType && f.periodType !== 'FY');

  if (annualFinancials.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
        10年分の通期PLデータは準備中です
      </div>
    );
  }

  // 金額フォーマッター (百万円モード or 兆・億円モード)
  const formatCellAmount = (valInMillion: number | null | undefined) => {
    if (valInMillion === null || valInMillion === undefined) return '-';

    if (unitMode === 'million') {
      return `${valInMillion.toLocaleString()} 百万円`;
    }

    // 兆・億円モード
    const oku = Math.round(valInMillion / 100);
    const isNegative = oku < 0;
    const absOku = Math.abs(oku);

    if (absOku >= 10000) {
      const cho = Math.floor(absOku / 10000);
      const remainOku = absOku % 10000;
      return remainOku > 0
        ? `${isNegative ? '△' : ''}${cho}兆${remainOku.toLocaleString()}億円`
        : `${isNegative ? '△' : ''}${cho}兆円`;
    }
    return `${isNegative ? '△' : ''}${absOku.toLocaleString()} 億円`;
  };

  // 兆・億円の概算テキスト (百万円時の補足用)
  const getSubApproxText = (valInMillion: number | null | undefined) => {
    if (valInMillion === null || valInMillion === undefined) return '';
    const oku = Math.round(valInMillion / 100);
    const absOku = Math.abs(oku);
    if (absOku >= 10000) {
      const cho = (absOku / 10000).toFixed(2);
      return `(約${cho}兆円)`;
    }
    return `(約${absOku.toLocaleString()}億円)`;
  };

  // チャート用データ加工 (通期年次データのみ、億円換算)
  const chartData = annualFinancials.map((f, idx) => {
    const prev = idx > 0 ? annualFinancials[idx - 1] : null;
    const revYoY = prev && prev.revenue > 0 ? ((f.revenue - prev.revenue) / prev.revenue) * 100 : null;
    const opYoY = prev && prev.operatingIncome > 0 ? ((f.operatingIncome - prev.operatingIncome) / prev.operatingIncome) * 100 : null;
    const margin = f.revenue > 0 ? Number(((f.operatingIncome / f.revenue) * 100).toFixed(2)) : (f.operatingMargin ?? 0);
    const isForecast = f.fiscalYear === 2026;

    return {
      year: `${f.fiscalYear}/3${isForecast ? '(予)' : ''}`,
      fiscalYear: f.fiscalYear,
      isForecast,
      revenue: Math.round(f.revenue / 100), // 億円
      operatingIncome: Math.round(f.operatingIncome / 100), // 億円
      netIncome: Math.round(f.netIncome / 100), // 億円
      margin,
      eps: f.eps ?? 0,
      dividend: f.dividendPerShare ?? 0,
      revYoY,
      opYoY,
      rawRevenue: f.revenue,
      rawOpIncome: f.operatingIncome,
      rawNetIncome: f.netIncome,
      rawOrdIncome: f.ordinaryIncome,
    };
  });

  // 10年統計サマリーの計算
  const firstYear = annualFinancials[0];
  const lastYear = annualFinancials[annualFinancials.length - 1];
  const yearsCount = annualFinancials.length - 1;

  // 売上CAGR (年平均成長率)
  const revCagr = yearsCount > 0 && firstYear.revenue > 0 && lastYear.revenue > 0
    ? (Math.pow(lastYear.revenue / firstYear.revenue, 1 / yearsCount) - 1) * 100
    : 0;

  // 10年平均営業利益率
  const avgMargin = annualFinancials.reduce((acc, f) => acc + (f.revenue > 0 ? (f.operatingIncome / f.revenue) * 100 : 0), 0) / annualFinancials.length;

  // 過去10年の最高益年度
  const bestYear = [...annualFinancials].sort((a, b) => b.operatingIncome - a.operatingIncome)[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
      {/* セクションヘッダー ＆ 単位切替スイッチ */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
              <BarChart3 className="w-5 h-5" />
            </span>
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
              10年業績推移・損益計算書 (PL)
            </h3>
            <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-full bg-slate-900 text-teal-400">
              {financials.length}期分収録 (2015-2024)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            有価証券報告書・決算短信開示基準（百万円単位）による10年長期財務推移
          </p>
        </div>

        {/* 単位切替トグルボタン */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setUnitMode('million')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              unitMode === 'million'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            百万円 (公式開示)
          </button>
          <button
            onClick={() => setUnitMode('smart')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              unitMode === 'smart'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            兆・億円表示
          </button>
        </div>
      </div>

      {/* 4大 10年サマリー指標カード */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">直近 売上高 (2024期)</div>
          <div className="text-base sm:text-lg font-black font-mono text-slate-900 mt-1">
            {formatCellAmount(lastYear.revenue)}
          </div>
          <div className="text-[10px] text-teal-600 font-bold mt-0.5 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            10年前比: +{((lastYear.revenue / firstYear.revenue - 1) * 100).toFixed(1)}% 成長 {unitMode === 'million' && getSubApproxText(lastYear.revenue)}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">直近 営業利益 (2024期)</div>
          <div className="text-base sm:text-lg font-black font-mono text-teal-700 mt-1">
            {formatCellAmount(lastYear.operatingIncome)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            営業利益率: {((lastYear.operatingIncome / lastYear.revenue) * 100).toFixed(1)}% {unitMode === 'million' && getSubApproxText(lastYear.operatingIncome)}
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">10年 平均営業利益率</div>
          <div className="text-base sm:text-lg font-black font-mono text-indigo-900 mt-1">
            {avgMargin.toFixed(1)}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">10年売上CAGR: +{revCagr.toFixed(1)}%/年</div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
          <div className="text-[11px] font-semibold text-slate-500">10年間 最高営業益年度</div>
          <div className="text-base sm:text-lg font-black font-mono text-amber-600 mt-1">
            {bestYear.fiscalYear}年3月期
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
            {formatCellAmount(bestYear.operatingIncome)}
          </div>
        </div>
      </div>

      {/* 📊 10年PL推移 複合チャート */}
      <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700">
            📊 10年PL推移グラフ (売上高・営業利益 / 利益率: %)
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis
                yAxisId="left"
                stroke="#64748b"
                fontSize={11}
                tickLine={false}
                tickFormatter={(v) => (v >= 10000 ? `${(v / 10000).toFixed(0)}兆` : `${v}億`)}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#0d9488"
                fontSize={11}
                tickLine={false}
                unit="%"
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3.5 rounded-xl text-xs space-y-1.5 shadow-xl border border-slate-700">
                        <div className="font-bold font-mono text-teal-400 border-b border-slate-700 pb-1">
                          {data.fiscalYear}年3月期 (通期本決算)
                        </div>
                        <div className="flex justify-between gap-4 text-slate-300">
                          <span>売上高:</span>
                          <span className="font-bold font-mono text-white">
                            {data.rawRevenue.toLocaleString()} 百万円 {getSubApproxText(data.rawRevenue)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-slate-300">
                          <span>営業利益:</span>
                          <span className="font-bold font-mono text-teal-400">
                            {data.rawOpIncome.toLocaleString()} 百万円 {getSubApproxText(data.rawOpIncome)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-slate-300">
                          <span>当期純利益:</span>
                          <span className="font-bold font-mono text-white">
                            {data.rawNetIncome.toLocaleString()} 百万円 {getSubApproxText(data.rawNetIncome)}
                          </span>
                        </div>
                        <div className="flex justify-between gap-4 text-teal-300 pt-1 border-t border-slate-700">
                          <span>営業利益率:</span>
                          <span className="font-bold font-mono">{data.margin}%</span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                iconType="circle"
              />
              <Bar yAxisId="left" dataKey="revenue" name="売上高 (億円)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="operatingIncome" name="営業利益 (億円)" fill="#0f766e" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="margin" name="営業利益率 (%)" stroke="#14b8a6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 📋 10年PL年次データテーブル */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <span>📋 10年年次 損益計算書 (PL) データ詳細</span>
            <span className="text-[11px] text-slate-400 font-normal">
              {unitMode === 'million' ? '（単位: 百万円 / % / 円）' : '（単位: 兆・億円 / % / 円）'}
            </span>
          </h4>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-xl">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3 whitespace-nowrap">決算期</th>
                <th className="p-3 text-right whitespace-nowrap">売上高</th>
                <th className="p-3 text-right whitespace-nowrap">売上YoY</th>
                <th className="p-3 text-right whitespace-nowrap">営業利益</th>
                <th className="p-3 text-right whitespace-nowrap">営業利益率</th>
                <th className="p-3 text-right whitespace-nowrap">経常・税引前利益</th>
                <th className="p-3 text-right whitespace-nowrap">当期純利益</th>
                <th className="p-3 text-right whitespace-nowrap">EPS (1株益)</th>
                <th className="p-3 text-right whitespace-nowrap">1株配当</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {chartData.map((row) => {
                const isRevPlus = (row.revYoY ?? 0) >= 0;
                return (
                  <tr key={row.fiscalYear} className={`hover:bg-slate-50 transition ${row.isForecast ? 'bg-amber-50/30' : ''}`}>
                    <td className="p-3 font-bold font-mono text-slate-900 whitespace-nowrap flex items-center gap-1.5">
                      <span>{row.fiscalYear}年3月期</span>
                      {row.isForecast && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                          会社予想
                        </span>
                      )}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatCellAmount(row.rawRevenue)}
                    </td>
                    <td className="p-3 text-right font-mono whitespace-nowrap">
                      {row.revYoY !== null ? (
                        <span className={`font-semibold ${isRevPlus ? 'text-teal-600' : 'text-rose-600'}`}>
                          {isRevPlus ? '+' : ''}{row.revYoY.toFixed(1)}%
                        </span>
                      ) : '-'}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-teal-700 whitespace-nowrap">
                      {formatCellAmount(row.rawOpIncome)}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-slate-800 whitespace-nowrap">
                      <span className={row.margin >= 10 ? 'px-2 py-0.5 rounded bg-teal-50 text-teal-800 border border-teal-200' : ''}>
                        {row.margin}%
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono text-slate-700 whitespace-nowrap">
                      {formatCellAmount(row.rawOrdIncome)}
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatCellAmount(row.rawNetIncome)}
                    </td>
                    <td className="p-3 text-right font-mono text-slate-800 whitespace-nowrap">
                      {row.eps ? `¥${row.eps.toFixed(1)}` : '-'}
                    </td>
                    <td className="p-3 text-right font-mono font-semibold text-amber-700 whitespace-nowrap">
                      {row.dividend ? `¥${row.dividend.toFixed(1)}` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 🎯 最新四半期 (1Q) 開示実績インフォカード */}
        {latestQuarter && (
          <div className="bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-teal-500/10 border border-teal-500/30 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-teal-600 text-white font-bold font-mono text-[10px]">
                {latestQuarter.fiscalYear}期 {latestQuarter.periodType}
              </span>
              <span className="font-bold text-slate-900">
                最新四半期 決算実績（{latestQuarter.periodEnd} 開示）
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 font-mono text-xs">
              <div>売上高: <b className="text-slate-900">{formatCellAmount(latestQuarter.revenue)}</b></div>
              <div>営業利益: <b className="text-teal-700">{formatCellAmount(latestQuarter.operatingIncome)}</b></div>
              <div>純利益: <b className="text-slate-900">{formatCellAmount(latestQuarter.netIncome)}</b></div>
            </div>
          </div>
        )}

        {/* 株式分割・会計基準に関する注記 */}
        <div className="flex items-start gap-1.5 text-[11px] text-slate-400 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
          <span>
            ※ 金額は有価証券報告書・決算短信基準の<b>百万円単位</b>（右上のスイッチで兆・億円に切替可能）。過年度の株式分割や決算期変更は公式開示に準拠して遡及反映されています。
          </span>
        </div>
      </div>
    </div>
  );
}