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
import { FileText, TrendingUp, AlertTriangle, ShieldCheck, Scale, History, ArrowRight, Bot, Sparkles, CheckCircle2, AlertOctagon } from 'lucide-react';
import { analyzeUnlistedGazetteBs } from '@/lib/bs-analyzer';

interface GazetteReport {
  id: number;
  fiscalPeriod: number;
  periodEnd: string;
  gazetteDate: string;
  gazetteIssue?: string | null;
  totalAssets: number;
  currentAssets?: number | null;
  fixedAssets?: number | null;
  totalLiabilities?: number | null;
  currentLiabilities?: number | null;
  fixedLiabilities?: number | null;
  netAssets: number;
  capitalStock: number;
  capitalSurplus?: number | null;
  retainedEarnings: number;
  netIncome: number;
  rawGazetteText?: string | null;
}

interface GazetteBsVisualizerProps {
  companyName: string;
  isStartup?: boolean;
  reports: GazetteReport[];
}

export default function GazetteBsVisualizer({ companyName, isStartup = true, reports }: GazetteBsVisualizerProps) {
  const [selectedPeriodIdx, setSelectedPeriodIdx] = useState<number>(reports.length - 1);
  const selectedReport = reports[selectedPeriodIdx] || reports[0];

  // 百万円 → 億円 / 兆円の正確な換算 (100百万円 = 1億円)
  const formatMillionYen = (val: number) => {
    const isNeg = val < 0;
    const absVal = Math.abs(val);
    const absOku = absVal / 100;
    const prefix = isNeg ? '▲' : '';

    if (absOku >= 10000) {
      return `${prefix}${(absOku / 10000).toFixed(2)} 兆円`;
    }
    if (absVal >= 100) {
      return `${prefix}${absOku.toFixed(1)} 億円`;
    }
    return `${prefix}${absVal.toLocaleString()} 百万円`;
  };

  const chartData = reports.map((r) => ({
    period: `第${r.fiscalPeriod}期 (${r.periodEnd.substring(0, 7)})`,
    totalAssets: Math.round(r.totalAssets / 100), // グラフ内は億円単位
    netAssets: Math.round(r.netAssets / 100),
    capitalSurplus: r.capitalSurplus ? Math.round(r.capitalSurplus / 100) : 0,
    retainedEarnings: Math.round(r.retainedEarnings / 100),
    netIncome: Math.round(r.netIncome / 100),
  }));

  const isNetIncomePositive = selectedReport.netIncome >= 0;
  const equityRatio = selectedReport.totalAssets > 0
    ? ((selectedReport.netAssets / selectedReport.totalAssets) * 100).toFixed(1)
    : '0.0';

  // AI BS財務分析の実行
  const analysis = analyzeUnlistedGazetteBs({
    companyName,
    isStartup,
    totalAssets: selectedReport.totalAssets,
    totalLiabilities: selectedReport.totalLiabilities ?? (selectedReport.totalAssets - selectedReport.netAssets),
    netAssets: selectedReport.netAssets,
    capitalStock: selectedReport.capitalStock,
    capitalSurplus: selectedReport.capitalSurplus,
    retainedEarnings: selectedReport.retainedEarnings,
    netIncome: selectedReport.netIncome,
  });

  return (
    <div className="space-y-8">
      {/* 🤖 AI 財務状況・BS診断分析コメントカード */}
      <div className={`rounded-2xl border p-6 shadow-sm transition ${
        analysis.status === 'critical'
          ? 'bg-rose-50/70 border-rose-200'
          : analysis.status === 'stellar'
          ? 'bg-emerald-50/70 border-emerald-200'
          : analysis.status === 'warning'
          ? 'bg-amber-50/70 border-amber-200'
          : 'bg-teal-50/70 border-teal-200'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-slate-900 text-base">
                  企業羅針盤 AI 財務状況・BS診断
                </h3>
                <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  第{selectedReport.fiscalPeriod}期 決算公告ベース
                </span>
              </div>
            </div>
          </div>

          {/* 診断バッジ */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${analysis.badgeColor}`}>
            {analysis.badgeText}
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
            {analysis.isInsolvency ? (
              <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
            )}
            <span>{analysis.headline}</span>
          </h4>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {analysis.comment}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            {analysis.keyPoints.map((point, idx) => (
              <div key={idx} className="bg-white/80 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-700 flex items-start gap-2 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 1. 財務健全性 & 資本政策サマリーカード */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">純資産合計 (自己資本)</div>
          <div className={`text-xl font-black font-mono mt-1 ${selectedReport.netAssets < 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {formatMillionYen(selectedReport.netAssets)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {selectedReport.netAssets < 0 ? '🚨 債務超過' : `第${selectedReport.fiscalPeriod}期末時点`}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">当期純損益</div>
          <div className={`text-xl font-black font-mono mt-1 ${isNetIncomePositive ? 'text-teal-600' : 'text-rose-600'}`}>
            {formatMillionYen(selectedReport.netIncome)}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isNetIncomePositive ? '当期純利益（黒字）' : '🚨 当期純損失（赤字）'}
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">資本剰余金 (累積調達等)</div>
          <div className="text-xl font-black font-mono text-indigo-700 mt-1">
            {selectedReport.capitalSurplus ? formatMillionYen(selectedReport.capitalSurplus) : '-'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">VC・第三者割当等による調達資本</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-xs font-semibold text-slate-500">自己資本比率</div>
          <div className={`text-xl font-black font-mono mt-1 ${Number(equityRatio) < 0 ? 'text-rose-600' : 'text-teal-600'}`}>
            {equityRatio}%
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">総資産に対する純資産比率</div>
        </div>
      </div>

      {/* 2. 年次業績 & 純資産推移グラフ */}
      {reports.length > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-teal-600" />
                純資産・累積赤字/黒字・当期純利益の推移
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                官報決算公告から集約した年度ごとの資本構成と損益の変遷
              </p>
            </div>
            <span className="text-xs text-slate-500 font-mono">単位: 億円</span>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="period" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={(v) => `${v.toLocaleString()}億`} />
                <Tooltip
                  formatter={(value: any) => [`${value.toLocaleString()} 億円`, '']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none' }}
                />
                <Legend wrapperStyle={{ fontSize: 11, paddingTop: '10px' }} />
                <Bar dataKey="totalAssets" name="総資産" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="netAssets" name="純資産合計" fill="#0d9488" radius={[4, 4, 0, 0]} />
                <Bar dataKey="capitalSurplus" name="資本剰余金" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Line type="monotone" dataKey="netIncome" name="当期純損益" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 3. 官報決算公告 BS 再現ビュー */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Scale className="w-5 h-5 text-indigo-600" />
              官報決算公告 貸借対照表（BS）再現ビュー
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              官報に掲載された貸借対照表の完全再現
            </p>
          </div>

          {/* 決算期セレクター */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            {reports.map((r, idx) => (
              <button
                key={r.fiscalPeriod}
                onClick={() => setSelectedPeriodIdx(idx)}
                className={`px-3 py-1.5 rounded-lg transition ${
                  selectedPeriodIdx === idx
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                第{r.fiscalPeriod}期 ({r.periodEnd.substring(0, 4)}年)
              </button>
            ))}
          </div>
        </div>

        {/* 官報公告ヘッダー */}
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <span className="font-bold text-amber-900 text-sm">
              第{selectedReport.fiscalPeriod}期 決算公告
            </span>
            <span className="text-amber-800 ml-2">({companyName})</span>
          </div>
          <div className="flex items-center gap-3 text-amber-800 font-mono">
            <span>決算期末: <b>{selectedReport.periodEnd}</b></span>
            <span>•</span>
            <span>官報掲載: <b>{selectedReport.gazetteDate}</b></span>
            {selectedReport.gazetteIssue && (
              <>
                <span>•</span>
                <span className="bg-amber-100 px-1.5 py-0.5 rounded font-sans">{selectedReport.gazetteIssue}</span>
              </>
            )}
          </div>
        </div>

        {/* 官報枠線BSテーブル */}
        <div className="border-2 border-slate-800 rounded-xl overflow-hidden text-xs">
          <div className="bg-slate-900 text-white font-bold p-2.5 text-center tracking-wider text-sm">
            貸 借 対 照 表 (単位: 百万円)
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-slate-800">
            {/* 左側: 資産の部 */}
            <div>
              <div className="bg-slate-100 p-2 font-bold text-slate-800 border-b border-slate-300 text-center">
                資 産 の 部
              </div>
              <table className="w-full">
                <tbody className="divide-y divide-slate-200">
                  {selectedReport.currentAssets !== null && selectedReport.currentAssets !== undefined && (
                    <tr>
                      <td className="p-2.5 pl-4 text-slate-700">流動資産</td>
                      <td className="p-2.5 pr-4 text-right font-mono font-medium text-slate-900">
                        {selectedReport.currentAssets.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  {selectedReport.fixedAssets !== null && selectedReport.fixedAssets !== undefined && (
                    <tr>
                      <td className="p-2.5 pl-4 text-slate-700">固定資産</td>
                      <td className="p-2.5 pr-4 text-right font-mono font-medium text-slate-900">
                        {selectedReport.fixedAssets.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-800">
                    <td className="p-2.5 pl-4 text-slate-900">資 産 合 計</td>
                    <td className="p-2.5 pr-4 text-right font-mono text-slate-900 text-sm">
                      {selectedReport.totalAssets.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* 右側: 負債及び純資産の部 */}
            <div>
              <div className="bg-slate-100 p-2 font-bold text-slate-800 border-b border-slate-300 text-center">
                負 債 及 び 純 資 産 の 部
              </div>
              <table className="w-full">
                <tbody className="divide-y divide-slate-200">
                  {/* 負債 */}
                  {selectedReport.currentLiabilities !== null && selectedReport.currentLiabilities !== undefined && (
                    <tr>
                      <td className="p-2.5 pl-4 text-slate-700">流動負債</td>
                      <td className="p-2.5 pr-4 text-right font-mono text-slate-900">
                        {selectedReport.currentLiabilities.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  {selectedReport.fixedLiabilities !== null && selectedReport.fixedLiabilities !== undefined && (
                    <tr>
                      <td className="p-2.5 pl-4 text-slate-700">固定負債</td>
                      <td className="p-2.5 pr-4 text-right font-mono text-slate-900">
                        {selectedReport.fixedLiabilities.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-slate-50 font-semibold">
                    <td className="p-2.5 pl-4 text-slate-800">負 債 合 計</td>
                    <td className="p-2.5 pr-4 text-right font-mono text-slate-900 font-bold">
                      {(selectedReport.totalLiabilities ?? (selectedReport.totalAssets - selectedReport.netAssets)).toLocaleString()}
                    </td>
                  </tr>

                  {/* 純資産 */}
                  <tr className="bg-teal-50/50">
                    <td className="p-2.5 pl-4 text-teal-900 font-medium">資本金</td>
                    <td className="p-2.5 pr-4 text-right font-mono text-slate-900">
                      {selectedReport.capitalStock.toLocaleString()}
                    </td>
                  </tr>
                  {selectedReport.capitalSurplus !== null && selectedReport.capitalSurplus !== undefined && (
                    <tr className="bg-teal-50/50">
                      <td className="p-2.5 pl-4 text-teal-900 font-medium">資本剰余金</td>
                      <td className="p-2.5 pr-4 text-right font-mono text-slate-900">
                        {selectedReport.capitalSurplus.toLocaleString()}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-teal-50/50">
                    <td className="p-2.5 pl-4 text-teal-900 font-medium">利益剰余金</td>
                    <td className="p-2.5 pr-4 text-right font-mono font-medium text-slate-900">
                      {selectedReport.retainedEarnings.toLocaleString()}
                    </td>
                  </tr>
                  <tr className="bg-teal-50/50">
                    <td className="p-2.5 pl-6 text-slate-600 text-[11px]">
                      (うち当期純{isNetIncomePositive ? '利益' : '損失'})
                    </td>
                    <td className={`p-2.5 pr-4 text-right font-mono font-bold ${isNetIncomePositive ? 'text-teal-700' : 'text-rose-600'}`}>
                      ({selectedReport.netIncome.toLocaleString()})
                    </td>
                  </tr>
                  <tr className="bg-teal-100/70 font-semibold border-t border-teal-200">
                    <td className="p-2.5 pl-4 text-teal-950 font-bold">純 資 産 合 計</td>
                    <td className={`p-2.5 pr-4 text-right font-mono font-bold ${selectedReport.netAssets < 0 ? 'text-rose-600' : 'text-teal-950'}`}>
                      {selectedReport.netAssets.toLocaleString()}
                    </td>
                  </tr>

                  {/* 負債・純資産合計 */}
                  <tr className="bg-slate-50 font-bold border-t-2 border-slate-800">
                    <td className="p-2.5 pl-4 text-slate-900">負債・純資産合計</td>
                    <td className="p-2.5 pr-4 text-right font-mono text-slate-900 text-sm">
                      {selectedReport.totalAssets.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}