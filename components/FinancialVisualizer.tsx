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
  BarChart,
} from 'recharts';
import { TrendingUp, PieChart, DollarSign, FileSpreadsheet, Activity, Bot, Sparkles, CheckCircle2 } from 'lucide-react';
import { analyzeListedBs } from '@/lib/bs-analyzer';
import { useLanguage } from '@/lib/language-context';

interface FinancialReportData {
  fiscalYear: number;
  periodType: string;
  periodEnd: string;
  revenue: number;
  operatingIncome: number;
  ordinaryIncome?: number | null;
  netIncome: number;
  operatingMargin?: number | null;
  eps?: number | null;
  bps?: number | null;
  totalAssets: number;
  currentAssets?: number | null;
  fixedAssets?: number | null;
  totalLiabilities?: number | null;
  currentLiabilities?: number | null;
  longTermLiabilities?: number | null;
  interestBearingDebt?: number | null;
  netAssets: number;
  equityRatio?: number | null;
  operatingCF?: number | null;
  investingCF?: number | null;
  financingCF?: number | null;
  freeCF?: number | null;
  dividendPerShare?: number | null;
  payoutRatio?: number | null;
}

interface FinancialVisualizerProps {
  financials: FinancialReportData[];
  companyName?: string;
}

export default function FinancialVisualizer({ financials, companyName = '当該企業' }: FinancialVisualizerProps) {
  const [subTab, setSubTab] = useState<'pl' | 'bs' | 'cf' | 'table'>('pl');
  const { isEn, t } = useLanguage();

  const formatYen = (millionYen: number) => {
    const oku = millionYen / 100;
    if (Math.abs(oku) >= 10000) {
      return isEn ? `¥${(oku / 10000).toFixed(2)}T` : `${(oku / 10000).toFixed(2)}兆円`;
    }
    return isEn ? `¥${oku.toLocaleString()}B` : `${oku.toLocaleString()}億円`;
  };

  const chartData = financials.map((f) => ({
    year: f.periodType && f.periodType !== 'FY' ? `${f.fiscalYear}期 ${f.periodType}` : `${f.fiscalYear}期`,
    revenue: Math.round(f.revenue / 100),
    operatingIncome: Math.round(f.operatingIncome / 100),
    netIncome: Math.round(f.netIncome / 100),
    operatingMargin: f.operatingMargin ?? (f.revenue ? Number(((f.operatingIncome / f.revenue) * 100).toFixed(2)) : 0),
    totalAssets: Math.round(f.totalAssets / 100),
    currentAssets: f.currentAssets ? Math.round(f.currentAssets / 100) : 0,
    fixedAssets: f.fixedAssets ? Math.round(f.fixedAssets / 100) : 0,
    totalLiabilities: f.totalLiabilities ? Math.round(f.totalLiabilities / 100) : 0,
    netAssets: Math.round(f.netAssets / 100),
    equityRatio: f.equityRatio ?? (f.totalAssets ? Number(((f.netAssets / f.totalAssets) * 100).toFixed(1)) : 0),
    operatingCF: f.operatingCF ? Math.round(f.operatingCF / 100) : 0,
    investingCF: f.investingCF ? Math.round(f.investingCF / 100) : 0,
    financingCF: f.financingCF ? Math.round(f.financingCF / 100) : 0,
    freeCF: f.freeCF ? Math.round(f.freeCF / 100) : (f.operatingCF && f.investingCF ? Math.round((f.operatingCF + f.investingCF) / 100) : 0),
  }));

  const latestFin = financials[financials.length - 1];

  // BS分析の実行
  const bsAnalysis = latestFin
    ? analyzeListedBs({
        companyName,
        equityRatio: latestFin.equityRatio ?? (latestFin.totalAssets ? (latestFin.netAssets / latestFin.totalAssets) * 100 : null),
        interestBearingDebt: latestFin.interestBearingDebt ?? null,
        netAssets: latestFin.netAssets,
        totalAssets: latestFin.totalAssets,
        freeCF: latestFin.freeCF ?? null,
        operatingIncome: latestFin.operatingIncome,
      })
    : null;

  return (
    <div className="space-y-6">
      {/* 🤖 AI BS・財務体質分析コメントカード */}
      {bsAnalysis && (
        <div className={`rounded-2xl border p-6 shadow-sm transition ${
          bsAnalysis.status === 'stellar'
            ? 'bg-emerald-50/70 border-emerald-200'
            : bsAnalysis.status === 'healthy'
            ? 'bg-teal-50/70 border-teal-200'
            : 'bg-amber-50/70 border-amber-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-teal-400 flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-black text-slate-900 text-base">
                  企業羅針盤 AI 財務体質・BS診断コメント
                </h3>
              </div>
            </div>

            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border ${bsAnalysis.badgeColor}`}>
              {bsAnalysis.badgeText}
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-600 shrink-0" />
              <span>{bsAnalysis.headline}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {bsAnalysis.comment}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
              {bsAnalysis.keyPoints.map((point, idx) => (
                <div key={idx} className="bg-white/80 border border-slate-200/80 rounded-xl p-2.5 text-xs text-slate-700 flex items-start gap-2 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {/* タブナビゲーション */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              {isEn ? 'Financial Statements (10-Yr PL / BS / CF)' : '財務3表分析 (10年業績推移・BS・CF)'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEn ? 'Income Statement (PL), Balance Sheet (BS) & Cash Flow (CF) Visualizer' : '損益計算書(PL)・貸借対照表(BS)・キャッシュフロー(CF)の複合ビジュアライズ'}
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setSubTab('pl')}
              className={`px-3 py-1.5 rounded-lg transition ${
                subTab === 'pl' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? '📊 Income (PL)' : '📊 業績推移 (PL)'}
            </button>
            <button
              onClick={() => setSubTab('bs')}
              className={`px-3 py-1.5 rounded-lg transition ${
                subTab === 'bs' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? '⚖️ Balance Sheet (BS)' : '⚖️ 資産・負債 (BS)'}
            </button>
            <button
              onClick={() => setSubTab('cf')}
              className={`px-3 py-1.5 rounded-lg transition ${
                subTab === 'cf' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? '💵 Cash Flow (CF)' : '💵 キャッシュフロー (CF)'}
            </button>
            <button
              onClick={() => setSubTab('table')}
              className={`px-3 py-1.5 rounded-lg transition ${
                subTab === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? '📋 Statements Table' : '📋 財務諸表詳細'}
            </button>
          </div>
        </div>

        {/* 1. PL (損益計算書) グラフ */}
        {subTab === 'pl' && (
          <div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(val) => `${(val / 10000).toFixed(1)}兆`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#f59e0b', fontSize: 12 }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    formatter={(value: any, name: any) => {
                      if (name === '営業利益率') return [`${value}%`, name];
                      return [`${value.toLocaleString()} 億円`, name];
                    }}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="revenue" name="売上高" fill="#93c5fd" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="operatingIncome" name="営業利益" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="netIncome" name="当期純利益" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="operatingMargin" name="営業利益率" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-slate-500 text-right">※ 単位: 億円 (右軸: 営業利益率 %)</div>
          </div>
        )}

        {/* 2. BS (貸借対照表) グラフ */}
        {subTab === 'bs' && (
          <div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis
                    yAxisId="left"
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(val) => `${(val / 10000).toFixed(1)}兆`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={{ fill: '#14b8a6', fontSize: 12 }}
                    tickFormatter={(val) => `${val}%`}
                  />
                  <Tooltip
                    formatter={(value: any, name: any) => {
                      if (name === '自己資本比率') return [`${value}%`, name];
                      return [`${value.toLocaleString()} 億円`, name];
                    }}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Bar yAxisId="left" dataKey="totalAssets" name="総資産" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="left" dataKey="netAssets" name="純資産 (自己資本)" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  <Line yAxisId="right" type="monotone" dataKey="equityRatio" name="自己資本比率" stroke="#14b8a6" strokeWidth={2.5} dot={{ r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-slate-500 text-right">※ 単位: 億円 (右軸: 自己資本比率 %)</div>
          </div>
        )}

        {/* 3. CF (キャッシュフロー) グラフ */}
        {subTab === 'cf' && (
          <div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <YAxis
                    tick={{ fill: '#64748b', fontSize: 12 }}
                    tickFormatter={(val) => `${(val / 10000).toFixed(1)}兆`}
                  />
                  <Tooltip
                    formatter={(value: any) => [`${value.toLocaleString()} 億円`, '']}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '8px', color: '#fff', border: 'none' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
                  <Bar dataKey="operatingCF" name="営業活動CF (本業の稼ぎ)" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="investingCF" name="投資活動CF (設備/買収)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="freeCF" name="フリーCF (余力)" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 text-xs text-slate-500 text-right">※ 単位: 億円 (フリーCF = 営業CF + 投資CF)</div>
          </div>
        )}

        {/* 4. 財務諸表詳細テーブル */}
        {subTab === 'table' && (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3 sticky left-0 bg-slate-100 z-10">項目 / 決算期</th>
                  {financials.map((f) => (
                    <th key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono min-w-[100px]">
                      {f.periodType && f.periodType !== 'FY' ? `${f.fiscalYear}期 ${f.periodType}` : `${f.fiscalYear}年3月期`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50 font-semibold text-slate-900 bg-slate-50/50">
                  <td className="p-3 sticky left-0 bg-inherit z-10">売上高</td>
                  {financials.map((f) => (
                    <td key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono">
                      {formatYen(f.revenue)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50 font-semibold text-teal-700">
                  <td className="p-3 sticky left-0 bg-inherit z-10">営業利益</td>
                  {financials.map((f) => (
                    <td key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono">
                      {formatYen(f.operatingIncome)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50 text-slate-600">
                  <td className="p-3 sticky left-0 bg-inherit z-10">営業利益率</td>
                  {financials.map((f) => (
                    <td key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono font-bold text-amber-600">
                      {f.operatingMargin ?? ((f.operatingIncome / f.revenue) * 100).toFixed(2)}%
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50 font-semibold text-indigo-700">
                  <td className="p-3 sticky left-0 bg-inherit z-10">当期純利益</td>
                  {financials.map((f) => (
                    <td key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono">
                      {formatYen(f.netIncome)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50 text-slate-600 border-t-2 border-slate-200">
                  <td className="p-3 sticky left-0 bg-inherit z-10">総資産</td>
                  {financials.map((f) => (
                    <td key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono">
                      {formatYen(f.totalAssets)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50 text-slate-600">
                  <td className="p-3 sticky left-0 bg-inherit z-10">純資産 (自己資本)</td>
                  {financials.map((f) => (
                    <td key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono">
                      {formatYen(f.netAssets)}
                    </td>
                  ))}
                </tr>
                <tr className="hover:bg-slate-50 text-slate-600">
                  <td className="p-3 sticky left-0 bg-inherit z-10">自己資本比率</td>
                  {financials.map((f) => (
                    <td key={`${f.fiscalYear}-${f.periodType}`} className="p-3 text-right font-mono font-bold text-teal-600">
                      {f.equityRatio ?? ((f.netAssets / f.totalAssets) * 100).toFixed(1)}%
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}