'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import {
  SECTORS,
  SectorData,
  SectorCompany,
} from '../lib/sectors-data';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName } from '@/lib/company-english-names';
import {
  Building2,
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  Award,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
  ChevronRight,
} from 'lucide-react';

type ShareMetric = 'revenue' | 'operatingIncome' | 'marketCap' | 'employees';

const COLORS = [
  '#0d9488', // Teal
  '#3b82f6', // Blue
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#84cc16', // Lime
];

export default function SectorAnalysisHub() {
  const [activeSectorId, setActiveSectorId] = useState<string>(SECTORS[0].id);
  const [shareMetric, setShareMetric] = useState<ShareMetric>('revenue');
  const { isEn, t } = useLanguage();

  const currentSector = useMemo(() => {
    return SECTORS.find((s) => s.id === activeSectorId) || SECTORS[0];
  }, [activeSectorId]);

  // シェア計算用データの生成
  const shareData = useMemo(() => {
    const raw = currentSector.companies.map((c) => {
      let val = 0;
      if (shareMetric === 'revenue') val = Math.max(c.revenue, 0);
      else if (shareMetric === 'operatingIncome') val = Math.max(c.operatingIncome, 0);
      else if (shareMetric === 'marketCap') val = Math.max(c.marketCapOrValuation, 0);
      else if (shareMetric === 'employees') val = Math.max(c.employees, 0);

      const displayName = getCompanyName(c.codeOrSlug, c.enName || c.name, isEn);

      return {
        name: displayName,
        value: val,
        rawCompany: c,
      };
    });

    const total = raw.reduce((sum, item) => sum + item.value, 0);
    return raw.map((item, idx) => ({
      ...item,
      share: total > 0 ? Number(((item.value / total) * 100).toFixed(1)) : 0,
      color: COLORS[idx % COLORS.length],
    })).sort((a, b) => b.value - a.value);
  }, [currentSector, shareMetric, isEn]);

  const metricLabel = useMemo(() => {
    switch (shareMetric) {
      case 'revenue':
        return isEn ? 'Revenue Market Share' : '売上高シェア';
      case 'operatingIncome':
        return isEn ? 'Operating Profit Share' : '営業利益シェア';
      case 'marketCap':
        return isEn ? 'Market Cap / Valuation Share' : '時価総額 / 企業評価額シェア';
      case 'employees':
        return isEn ? 'Employees Count (Headcount) Share' : '従業員数（組織規模）シェア';
    }
  }, [shareMetric, isEn]);

  const formatBillionOrTrillion = (val: number) => {
    if (shareMetric === 'employees') {
      return `${val.toLocaleString()} ${isEn ? 'people' : '名'}`;
    }
    if (Math.abs(val) >= 10000) {
      return isEn ? `¥${(val / 10000).toFixed(2)}T` : `¥${(val / 10000).toFixed(2)} 兆円`;
    }
    return isEn ? `¥${Math.round(val).toLocaleString()} 億円` : `¥${Math.round(val).toLocaleString()} 億円`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ページタイトル ＆ 導入 */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? 'compana Sector Intelligence & Market Share' : 'compana 業界・セクター分析ハブ (Sector Intelligence)'}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            {isEn ? 'Sector Concentration & Multi-Metric Market Share' : '業界別セクト化 ＆ マルチ指標シェア分析'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium">
            {isEn
              ? 'Multi-dimensional market landscape covering listed giants and unlisted unicorns across Revenue, Operating Income, Market Cap, and Headcount.'
              : '主要産業ごとの市場規模、上位企業の寡占度（シェア）、売上高・営業利益・時価総額・組織規模などの多角的な指標から、上場企業・未上場ユニコーンの業界勢力図を一目で俯瞰できます。'}
          </p>
        </div>
      </div>

      {/* 業界タブ (セクト化 ナビゲーション) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {SECTORS.map((sector) => {
          const isActive = sector.id === activeSectorId;
          const displaySecName = isEn ? (sector.enName || sector.name) : sector.name;

          return (
            <button
              key={sector.id}
              onClick={() => setActiveSectorId(sector.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200 shadow-xs'
              }`}
            >
              <span className="text-base">{sector.emoji}</span>
              <span>{displaySecName}</span>
            </button>
          );
        })}
      </div>

      {/* セクター概要カード */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-2xl shadow-xs">
              {currentSector.emoji}
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <span>{isEn ? (currentSector.enName || currentSector.name) : currentSector.name}</span>
                <span className="text-xs font-normal text-slate-500 font-mono">
                  ({isEn ? (currentSector.enMarketSizeNote || currentSector.marketSizeNote) : currentSector.marketSizeNote})
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                {isEn ? (currentSector.enSummary || currentSector.summary) : currentSector.summary}
              </p>
            </div>
          </div>
        </div>

        {/* 3大セクター統計指標 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 block">
              {isEn ? 'Total Combined Revenue' : '主要企業 合計売上規模'}
            </span>
            <div className="text-xl font-extrabold font-mono text-slate-900 mt-1">
              {isEn ? `¥${(currentSector.totalMarketSize / 10000).toFixed(1)}T` : `¥${(currentSector.totalMarketSize / 10000).toFixed(1)} 兆円`}
            </div>
            <span className="text-[10px] text-slate-400">
              {isEn ? 'Aggregated Top Sector Leaders' : 'セクター主要大手合算'}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 block">
              {isEn ? 'Sector Avg Operating Margin' : 'セクター平均営業利益率'}
            </span>
            <div className="text-xl font-extrabold font-mono text-teal-600 mt-1">
              {currentSector.avgOpMargin}%
            </div>
            <span className="text-[10px] text-slate-400">
              {isEn ? 'Overall Sector Profitability Level' : '業界全体の収益力水準'}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold text-slate-500 block">
              {isEn ? 'Top 3 Oligopoly Ratio (CR3)' : '上位3社 寡占度 (CR3)'}
            </span>
            <div className="text-xl font-extrabold font-mono text-indigo-600 mt-1">
              {currentSector.cr3Ratio}%
            </div>
            <span className="text-[10px] text-slate-400">
              {isEn ? 'Combined Market Share of Top 3' : '上位3社による市場占有率'}
            </span>
          </div>
        </div>
      </div>

      {/* メイン分析エリア: 指標別シェア円グラフ ＆ 業界内ポジショニングランキング */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 左側: 指標別シェア (円グラフ ＆ 切替タブ) [5カラム] */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-teal-600" />
                <span>{isEn ? 'Industry Share Analysis' : '業界内シェア分析'}</span>
              </h3>
              <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                {metricLabel}
              </span>
            </div>

            {/* 指標切替ボタングループ */}
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                onClick={() => setShareMetric('revenue')}
                className={`py-2 px-3 rounded-lg transition ${
                  shareMetric === 'revenue'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isEn ? '📊 Revenue Share' : '📊 売上高シェア'}
              </button>
              <button
                onClick={() => setShareMetric('operatingIncome')}
                className={`py-2 px-3 rounded-lg transition ${
                  shareMetric === 'operatingIncome'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isEn ? '💰 Operating Profit Share' : '💰 営業利益シェア'}
              </button>
              <button
                onClick={() => setShareMetric('marketCap')}
                className={`py-2 px-3 rounded-lg transition ${
                  shareMetric === 'marketCap'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isEn ? '💎 Market Cap Share' : '💎 時価総額 / 評価額'}
              </button>
              <button
                onClick={() => setShareMetric('employees')}
                className={`py-2 px-3 rounded-lg transition ${
                  shareMetric === 'employees'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {isEn ? '👥 Headcount Share' : '👥 従業員数（規模）'}
              </button>
            </div>
          </div>

          {/* Recharts ドーナツパイチャート */}
          <div className="h-64 w-full relative my-auto">
            <ResponsiveContainer width="100%" height="100%">
              <RePieChart>
                <Pie
                  data={shareData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={95}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {shareData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(val: number, name: string, props: any) => [
                    `${formatBillionOrTrillion(val)} (${props.payload.share}%)`,
                    props.payload.name,
                  ]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '0.75rem',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* シェア上位レジェンド一覧 */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            {shareData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-medium">
                <div className="flex items-center gap-2 truncate">
                  <span
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-slate-800 truncate font-semibold">
                    {item.name}
                  </span>
                  {item.rawCompany.isUnlisted && (
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 shrink-0">
                      {isEn ? 'Unlisted' : '未上場'}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-500 text-[11px]">
                    {formatBillionOrTrillion(item.value)}
                  </span>
                  <span className="font-bold text-slate-900 w-10 text-right">
                    {item.share}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右側: 企業別ポジショニング・財務比較テーブル [7カラム] */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-teal-600" />
                <span>{isEn ? 'Industry Positioning & Financial Benchmark' : '業界内ポジショニング ＆ 財務比較'}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn ? 'Click company name to open comprehensive financial card' : '社名クリックでカルテへ遷移'}
              </p>
            </div>
            <span className="text-xs font-mono font-medium text-slate-400">
              {currentSector.companies.length} {isEn ? 'Companies' : '社 比較'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                  <th className="py-3 px-3 text-center w-12">{isEn ? 'Rank' : '順位'}</th>
                  <th className="py-3 px-3">{isEn ? 'Company Name' : '企業名'}</th>
                  <th className="py-3 px-3 text-right">{isEn ? 'Revenue' : '売上高'}</th>
                  <th className="py-3 px-3 text-right">{isEn ? 'Operating Profit' : '営業利益'}</th>
                  <th className="py-3 px-3 text-right">{isEn ? 'Margin' : '営業利益率'}</th>
                  <th className="py-3 px-3 text-right">{isEn ? 'Market Cap' : '時価総額/評価額'}</th>
                  <th className="py-3 px-3 text-center">{isEn ? 'Card' : 'カルテ'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {currentSector.companies.map((c, idx) => {
                  const companyUrl = c.isUnlisted
                    ? `/unlisted/${c.codeOrSlug}`
                    : `/stocks/${c.codeOrSlug}`;

                  const displayName = getCompanyName(c.codeOrSlug, c.enName || c.name, isEn);
                  const displayKeyStrength = isEn ? (c.enKeyStrength || c.keyStrength) : c.keyStrength;

                  return (
                    <tr
                      key={idx}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      <td className="py-3.5 px-3 text-center font-bold text-slate-400">
                        #{idx + 1}
                      </td>
                      <td className="py-3.5 px-3 font-sans">
                        <Link
                          href={companyUrl}
                          className="font-bold text-slate-900 group-hover:text-teal-600 transition flex items-center gap-1.5"
                        >
                          <span>{displayName}</span>
                          <span className="text-[10px] font-mono text-slate-400 font-normal">
                            {c.codeOrSlug}
                          </span>
                          {c.isUnlisted && (
                            <span className="text-[9px] font-bold text-amber-800 bg-amber-50 px-1 py-0.2 rounded border border-amber-200">
                              {isEn ? 'Unlisted' : '未上場'}
                            </span>
                          )}
                        </Link>
                        <span className="text-[10px] text-slate-500 font-medium block truncate max-w-xs mt-0.5">
                          {displayKeyStrength}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold text-slate-800">
                        {c.revenue >= 10000
                          ? `¥${(c.revenue / 10000).toFixed(2)}${isEn ? 'T' : '兆'}`
                          : `¥${c.revenue.toLocaleString()}${isEn ? 'B' : '億'}`}
                      </td>
                      <td
                        className={`py-3.5 px-3 text-right font-bold ${
                          c.operatingIncome >= 0 ? 'text-teal-700' : 'text-rose-600'
                        }`}
                      >
                        {Math.abs(c.operatingIncome) >= 10000
                          ? `¥${(c.operatingIncome / 10000).toFixed(2)}${isEn ? 'T' : '兆'}`
                          : `¥${c.operatingIncome.toLocaleString()}${isEn ? 'B' : '億'}`}
                      </td>
                      <td className="py-3.5 px-3 text-right font-bold text-slate-700">
                        {c.opMargin.toFixed(2)}%
                      </td>
                      <td className="py-3.5 px-3 text-right text-slate-600">
                        {c.marketCapOrValuation >= 10000
                          ? `¥${(c.marketCapOrValuation / 10000).toFixed(1)}${isEn ? 'T' : '兆'}`
                          : `¥${c.marketCapOrValuation.toLocaleString()}${isEn ? 'B' : '億'}`}
                      </td>
                      <td className="py-3.5 px-3 text-center">
                        <Link
                          href={companyUrl}
                          className="inline-flex items-center justify-center p-1.5 rounded-lg bg-slate-100 group-hover:bg-teal-50 text-slate-600 group-hover:text-teal-700 transition"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}