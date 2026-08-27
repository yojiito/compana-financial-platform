'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building2,
  Building,
  Swords,
  TrendingUp,
  Percent,
  Coins,
  ShieldCheck,
  Zap,
  BarChart2,
  PieChart,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  Scale,
  DollarSign,
  User,
  Users,
  Compass,
  ArrowUpRight,
  Globe,
  Info,
  Calendar,
} from 'lucide-react';
import { ALL_COMPARE_ENTITIES, CompareEntity } from '@/lib/compare-data';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName, getCompanyShortName, getSectorName } from '@/lib/company-english-names';

export default function CompanyComparisonPage() {
  const [entityAId, setEntityAId] = useState<string>('7203');
  const [entityBId, setEntityBId] = useState<string>('6861');
  const { isEn, t } = useLanguage();

  const entityA = useMemo(
    () => ALL_COMPARE_ENTITIES.find((e) => e.id === entityAId) || ALL_COMPARE_ENTITIES[0],
    [entityAId]
  );
  const entityB = useMemo(
    () => ALL_COMPARE_ENTITIES.find((e) => e.id === entityBId) || ALL_COMPARE_ENTITIES[1],
    [entityBId]
  );

  const presets = [
    {
      label: isEn ? '🚗 Toyota vs 🔬 Keyence' : '🚗 トヨタ vs 🔬 キーエンス',
      a: '7203',
      b: '6861'
    },
    {
      label: isEn ? '📚 Shueisha vs 📖 Kodansha' : '📚 集英社 vs 📖 講談社',
      a: 'shueisha',
      b: 'kodansha'
    },
    {
      label: isEn ? '🎮 Koei Tecmo vs 🎮 Nintendo' : '🎮 コーエーテクモ vs 🎮 任天堂',
      a: '3635',
      b: '7974'
    },
    {
      label: isEn ? '🏙️ NBF vs 🏛️ JRE (Office REITs)' : '🏙️ 日本ビルファンド vs 🏛️ ジャパンリアルエステイト',
      a: '8951',
      b: '8952'
    },
    {
      label: isEn ? '📊 Nikkei vs 📰 Asahi Shimbun' : '📊 日経新聞 vs 📰 朝日新聞',
      a: 'nikkei',
      b: 'asahi'
    },
  ];

  const formatBillion = (val: number | undefined) => {
    if (val === undefined || val === null) return '-';
    if (Math.abs(val) >= 10000) {
      return isEn ? `¥${(val / 10000).toFixed(2)}T` : `¥${(val / 10000).toFixed(2)} 兆円`;
    }
    return isEn ? `¥${Math.round(val).toLocaleString()} 億円` : `¥${Math.round(val).toLocaleString()} 億円`;
  };

  const formatSalary = (val: number | undefined) => {
    if (val === undefined || val === null) return isEn ? 'N/A' : '非公開・算出不可';
    return isEn ? `¥${(val / 100).toFixed(2)}M` : `${val.toLocaleString()}万円`;
  };

  const getDisplayEntityName = (e: CompareEntity) => {
    return isEn ? (e.enName || getCompanyName(e.id, e.name, true)) : e.name;
  };

  const getDisplayEntityShort = (e: CompareEntity) => {
    return isEn ? (e.enShortName || getCompanyShortName(e.id, e.shortName, true)) : e.shortName;
  };

  const getDisplayTypeLabel = (e: CompareEntity) => {
    return isEn ? (e.enTypeLabel || e.typeLabel) : e.typeLabel;
  };

  const getDisplaySector = (e: CompareEntity) => {
    return isEn ? (e.enSector || getSectorName(e.sector, true)) : e.sector;
  };

  const getDisplayFiscalPeriod = (e: CompareEntity) => {
    return isEn ? (e.enFiscalPeriodLabel || e.fiscalPeriodLabel) : e.fiscalPeriodLabel;
  };

  const getDisplayScaleLabel = (e: CompareEntity) => {
    return isEn ? (e.enScaleLabel || e.scaleLabel) : e.scaleLabel;
  };

  const getDisplaySummary = (e: CompareEntity) => {
    return isEn ? (e.enSummary || e.summary) : e.summary;
  };

  const getDisplayEmployees = (e: CompareEntity) => {
    return isEn ? (e.enEmployeesCount || e.employeesCount || '-') : (e.employeesCount || '-');
  };

  const getDisplayExtraNote = (e: CompareEntity) => {
    return isEn ? (e.costAnatomy?.enExtraNote || e.costAnatomy?.extraNote) : e.costAnatomy?.extraNote;
  };

  const getDisplayMoats = (e: CompareEntity) => {
    return isEn ? (e.enMoats || e.moats || []) : (e.moats || []);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* ヒーロー */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 text-xs font-semibold">
            <Swords className="w-3.5 h-3.5" />
            <span>{isEn ? 'Side-by-Side Corporate Duel (Comparative Intelligence)' : '2社・複数企業の直接対決 (Side-by-Side 比較)'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isEn ? 'Side-by-Side Corporate & Business Model Comparison' : '企業 ＆ 財務・儲けのカラクリ 直接比較'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'Select any 2 companies (Listed Prime, Unlisted Giants, or J-REITs) to compare side-by-side: Scale, Operating Margins, 100% Cost Structure Breakdown (COGS / SG&A / Profit), Assets, and Economic Moats.'
              : '上場大手、未上場メガメディア、J-REITを自由に2社選んで左右で直接対決。「売上・利益規模」「営業利益率」「100%コスト解剖スタックバー（原価率・人件費率）」「保有資産」「強み（Moats）」を一発で横並び比較。'}
          </p>
        </div>
      </div>

      {/* 🎛️ 1. 企業選択 ＆ おすすめプリセットバー */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500" />
            {isEn ? 'Featured Head-to-Head Presets' : 'おすすめ対決プリセット'}
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => {
                  setEntityAId(p.a);
                  setEntityBId(p.b);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  entityAId === p.a && entityBId === p.b
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 2社セレクトドロップダウン */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-rose-600 flex items-center gap-1.5">
              <span>🔴</span>
              <span>{isEn ? 'Comparison Company A (Left Side)' : '比較企業 A (左側)'}</span>
            </label>
            <select
              value={entityAId}
              onChange={(e) => setEntityAId(e.target.value)}
              className="w-full p-3 bg-rose-50/50 border-2 border-rose-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-rose-500 transition"
            >
              {ALL_COMPARE_ENTITIES.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  [{getDisplayTypeLabel(ent)}] {getDisplayEntityName(ent)} - {getDisplaySector(ent)}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-indigo-600 flex items-center gap-1.5">
              <span>🔵</span>
              <span>{isEn ? 'Comparison Company B (Right Side)' : '比較企業 B (右側)'}</span>
            </label>
            <select
              value={entityBId}
              onChange={(e) => setEntityBId(e.target.value)}
              className="w-full p-3 bg-indigo-50/50 border-2 border-indigo-200 rounded-xl text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500 transition"
            >
              {ALL_COMPARE_ENTITIES.map((ent) => (
                <option key={ent.id} value={ent.id}>
                  [{getDisplayTypeLabel(ent)}] {getDisplayEntityName(ent)} - {getDisplaySector(ent)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ⚔️ 2. 直接対決 2カラム・ヘッドカード */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 左側: 企業A */}
        <div className="bg-white rounded-3xl border-2 border-rose-200 shadow-md p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3 py-0.5 rounded-full">
                {getDisplayTypeLabel(entityA)} / {getDisplaySector(entityA)}
              </span>
              {entityA.websiteUrl && (
                <a
                  href={entityA.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-700"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Website ↗' : '公式HP'}</span>
                </a>
              )}
            </div>

            <div>
              <Link href={entityA.url} className="block group">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-rose-600 transition">
                  {getDisplayEntityName(entityA)}
                </h2>
              </Link>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                📅 {getDisplayFiscalPeriod(entityA)}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {getDisplaySummary(entityA)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold block">{getDisplayScaleLabel(entityA)}</span>
              <span className="text-base sm:text-lg font-black font-mono text-slate-900">
                {formatBillion(entityA.scaleValueBillion)}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold block">{isEn ? 'Operating Margin' : '営業利益率 (マージン)'}</span>
              <span className="text-base sm:text-lg font-black font-mono text-rose-600">
                {entityA.operatingMarginPct !== undefined ? `${entityA.operatingMarginPct}%` : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* 右側: 企業B */}
        <div className="bg-white rounded-3xl border-2 border-indigo-200 shadow-md p-6 sm:p-7 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full">
                {getDisplayTypeLabel(entityB)} / {getDisplaySector(entityB)}
              </span>
              {entityB.websiteUrl && (
                <a
                  href={entityB.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-700"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{isEn ? 'Website ↗' : '公式HP'}</span>
                </a>
              )}
            </div>

            <div>
              <Link href={entityB.url} className="block group">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-indigo-600 transition">
                  {getDisplayEntityName(entityB)}
                </h2>
              </Link>
              <span className="text-xs text-slate-400 font-mono mt-0.5 block">
                📅 {getDisplayFiscalPeriod(entityB)}
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {getDisplaySummary(entityB)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold block">{getDisplayScaleLabel(entityB)}</span>
              <span className="text-base sm:text-lg font-black font-mono text-slate-900">
                {formatBillion(entityB.scaleValueBillion)}
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-2xl">
              <span className="text-[10px] text-slate-400 font-bold block">{isEn ? 'Operating Margin' : '営業利益率 (マージン)'}</span>
              <span className="text-base sm:text-lg font-black font-mono text-indigo-600">
                {entityB.operatingMarginPct !== undefined ? `${entityB.operatingMarginPct}%` : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🔬 3. 儲けのカラクリ (100%コストスタックバー解剖) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <PieChart className="w-5 h-5 text-indigo-600" />
            <span>{isEn ? '🔬 100% Cost Anatomy & Profit Engine Duel' : '🔬 儲けのカラクリ（売上高100%コスト ＆ 利益解剖）直接対決'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {isEn
              ? 'Comparative breakdown of COGS, SG&A, Labor, R&D, and Operating Profit margins'
              : '原価率・販管費率・人件費率・研究開発費率・営業利益率の構造比較'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Aのコストスタックバー */}
          {entityA.costAnatomy && (
            <div className="bg-rose-50/40 p-5 rounded-2xl border border-rose-100 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-rose-900">
                <span>🔴 {getDisplayEntityName(entityA)}</span>
                <span className="font-mono">{isEn ? 'Operating Margin:' : '利益率:'} {entityA.costAnatomy.opMarginPct}%</span>
              </div>

              {/* スタックバー */}
              <div className="h-6 w-full rounded-xl overflow-hidden flex font-mono text-[10px] font-bold text-white text-center leading-6">
                <div
                  style={{ width: `${entityA.costAnatomy.cogsPct}%` }}
                  className="bg-slate-600"
                  title={`${isEn ? 'COGS' : '原価'}: ${entityA.costAnatomy.cogsPct}%`}
                >
                  {entityA.costAnatomy.cogsPct > 15 && `${isEn ? 'COGS' : '原価'} ${entityA.costAnatomy.cogsPct}%`}
                </div>
                <div
                  style={{ width: `${entityA.costAnatomy.sgaPct}%` }}
                  className="bg-amber-600"
                  title={`${isEn ? 'SG&A' : '販管'}: ${entityA.costAnatomy.sgaPct}%`}
                >
                  {entityA.costAnatomy.sgaPct > 15 && `${isEn ? 'SG&A' : '販管'} ${entityA.costAnatomy.sgaPct}%`}
                </div>
                <div
                  style={{ width: `${Math.max(entityA.costAnatomy.opMarginPct, 0)}%` }}
                  className="bg-rose-600"
                  title={`${isEn ? 'Profit' : '利益'}: ${entityA.costAnatomy.opMarginPct}%`}
                >
                  {entityA.costAnatomy.opMarginPct > 10 && `${isEn ? 'Profit' : '利益'} ${entityA.costAnatomy.opMarginPct}%`}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                  <span>{isEn ? 'COGS Ratio' : '原価率'}: <strong>{entityA.costAnatomy.cogsPct}%</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
                  <span>{isEn ? 'SG&A Ratio' : '販管費率'}: <strong>{entityA.costAnatomy.sgaPct}%</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
                  <span>{isEn ? 'Operating Margin' : '営業利益率'}: <strong>{entityA.costAnatomy.opMarginPct}%</strong></span>
                </span>
              </div>

              {getDisplayExtraNote(entityA) && (
                <p className="text-xs text-rose-950 font-medium bg-white/80 p-3 rounded-xl border border-rose-200/80">
                  💡 {getDisplayExtraNote(entityA)}
                </p>
              )}
            </div>
          )}

          {/* Bのコストスタックバー */}
          {entityB.costAnatomy && (
            <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100 space-y-4">
              <div className="flex items-center justify-between text-xs font-bold text-indigo-900">
                <span>🔵 {getDisplayEntityName(entityB)}</span>
                <span className="font-mono">{isEn ? 'Operating Margin:' : '利益率:'} {entityB.costAnatomy.opMarginPct}%</span>
              </div>

              {/* スタックバー */}
              <div className="h-6 w-full rounded-xl overflow-hidden flex font-mono text-[10px] font-bold text-white text-center leading-6">
                <div
                  style={{ width: `${entityB.costAnatomy.cogsPct}%` }}
                  className="bg-slate-600"
                  title={`${isEn ? 'COGS' : '原価'}: ${entityB.costAnatomy.cogsPct}%`}
                >
                  {entityB.costAnatomy.cogsPct > 15 && `${isEn ? 'COGS' : '原価'} ${entityB.costAnatomy.cogsPct}%`}
                </div>
                <div
                  style={{ width: `${entityB.costAnatomy.sgaPct}%` }}
                  className="bg-amber-600"
                  title={`${isEn ? 'SG&A' : '販管'}: ${entityB.costAnatomy.sgaPct}%`}
                >
                  {entityB.costAnatomy.sgaPct > 15 && `${isEn ? 'SG&A' : '販管'} ${entityB.costAnatomy.sgaPct}%`}
                </div>
                <div
                  style={{ width: `${Math.max(entityB.costAnatomy.opMarginPct, 0)}%` }}
                  className="bg-indigo-600"
                  title={`${isEn ? 'Profit' : '利益'}: ${entityB.costAnatomy.opMarginPct}%`}
                >
                  {entityB.costAnatomy.opMarginPct > 10 && `${isEn ? 'Profit' : '利益'} ${entityB.costAnatomy.opMarginPct}%`}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                  <span>{isEn ? 'COGS Ratio' : '原価率'}: <strong>{entityB.costAnatomy.cogsPct}%</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-600 inline-block" />
                  <span>{isEn ? 'SG&A Ratio' : '販管費率'}: <strong>{entityB.costAnatomy.sgaPct}%</strong></span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block" />
                  <span>{isEn ? 'Operating Margin' : '営業利益率'}: <strong>{entityB.costAnatomy.opMarginPct}%</strong></span>
                </span>
              </div>

              {getDisplayExtraNote(entityB) && (
                <p className="text-xs text-indigo-950 font-medium bg-white/80 p-3 rounded-xl border border-indigo-200/80">
                  💡 {getDisplayExtraNote(entityB)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 📊 4. 主要財務指標 直接比較テーブル */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Scale className="w-5 h-5 text-indigo-600" />
          <span>{isEn ? 'Key Financial Metrics, Scale & Efficiency Side-by-Side Table' : '主要財務指標・規模・効率性 直接比較テーブル'}</span>
        </h2>

        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-3 px-4 w-1/3">{isEn ? 'Metric / Financial Item' : '財務指標・項目'}</th>
                <th className="py-3 px-4 w-1/3 text-rose-700 bg-rose-50/50">
                  🔴 {getDisplayEntityName(entityA)}
                </th>
                <th className="py-3 px-4 w-1/3 text-indigo-700 bg-indigo-50/50">
                  🔵 {getDisplayEntityName(entityB)}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Fiscal Period (Report Date)' : '対象決算期 (開示基準日)'}</td>
                <td className="py-3 px-4 font-bold">{getDisplayFiscalPeriod(entityA)}</td>
                <td className="py-3 px-4 font-bold">{getDisplayFiscalPeriod(entityB)}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Scale (Market Cap / Net Assets)' : '規模 (時価総額 / 純資産)'}</td>
                <td className="py-3 px-4 font-black text-slate-900">{formatBillion(entityA.scaleValueBillion)}</td>
                <td className="py-3 px-4 font-black text-slate-900">{formatBillion(entityB.scaleValueBillion)}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Revenue (Net Sales)' : '売上高 (営業収益)'}</td>
                <td className="py-3 px-4 font-black text-slate-900">{formatBillion(entityA.revenueBillion)}</td>
                <td className="py-3 px-4 font-black text-slate-900">{formatBillion(entityB.revenueBillion)}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Operating Income (EBIT)' : '営業利益'}</td>
                <td className="py-3 px-4 font-black text-rose-600">
                  {entityA.operatingIncomeBillion !== undefined ? `+${formatBillion(entityA.operatingIncomeBillion)}` : '-'}
                </td>
                <td className="py-3 px-4 font-black text-indigo-600">
                  {entityB.operatingIncomeBillion !== undefined ? `+${formatBillion(entityB.operatingIncomeBillion)}` : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Operating Margin (%)' : '営業利益率 (マージン)'}</td>
                <td className="py-3 px-4 font-black text-rose-600 text-sm">
                  {entityA.operatingMarginPct !== undefined ? `${entityA.operatingMarginPct}%` : '-'}
                </td>
                <td className="py-3 px-4 font-black text-indigo-600 text-sm">
                  {entityB.operatingMarginPct !== undefined ? `${entityB.operatingMarginPct}%` : '-'}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Net Income (Profit)' : '当期純利益'}</td>
                <td className="py-3 px-4 font-bold">{formatBillion(entityA.netIncomeBillion)}</td>
                <td className="py-3 px-4 font-bold">{formatBillion(entityB.netIncomeBillion)}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'COGS Ratio (%)' : '売上原価率'}</td>
                <td className="py-3 px-4 font-bold">{entityA.costAnatomy?.cogsPct ? `${entityA.costAnatomy.cogsPct}%` : '-'}</td>
                <td className="py-3 px-4 font-bold">{entityB.costAnatomy?.cogsPct ? `${entityB.costAnatomy.cogsPct}%` : '-'}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'SG&A Ratio (%)' : '販管費率'}</td>
                <td className="py-3 px-4 font-bold">{entityA.costAnatomy?.sgaPct ? `${entityA.costAnatomy.sgaPct}%` : '-'}</td>
                <td className="py-3 px-4 font-bold">{entityB.costAnatomy?.sgaPct ? `${entityB.costAnatomy.sgaPct}%` : '-'}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Equity Ratio (Solvency)' : '自己資本比率'}</td>
                <td className="py-3 px-4 font-bold">{entityA.equityRatioPct ? `${entityA.equityRatioPct}%` : '-'}</td>
                <td className="py-3 px-4 font-bold">{entityB.equityRatioPct ? `${entityB.equityRatioPct}%` : '-'}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'ROE (Return on Equity)' : 'ROE (自己資本利益率)'}</td>
                <td className="py-3 px-4 font-bold">{entityA.roePct ? `${entityA.roePct}%` : '-'}</td>
                <td className="py-3 px-4 font-bold">{entityB.roePct ? `${entityB.roePct}%` : '-'}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Employees Count' : '従業員数'}</td>
                <td className="py-3 px-4 font-bold">{getDisplayEmployees(entityA)}</td>
                <td className="py-3 px-4 font-bold">{getDisplayEmployees(entityB)}</td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="py-3 px-4 font-sans font-medium text-slate-500">{isEn ? 'Average Salary' : '平均年間給与'}</td>
                <td className="py-3 px-4 font-bold">{formatSalary(entityA.avgSalary)}</td>
                <td className="py-3 px-4 font-bold">{formatSalary(entityB.avgSalary)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 🏰 5. 競争優位性 (Economic Moats) 直接対決 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AのMoats */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-rose-600" />
            <span>{isEn ? `${getDisplayEntityName(entityA)} Economic Moats & Competitive Strengths` : `${getDisplayEntityName(entityA)} の競争優位性 (Moats)`}</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-sans">
            {getDisplayMoats(entityA).map((m: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0 mt-0.5">✔</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* BのMoats */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
          <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm border-b border-slate-100 pb-3">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <span>{isEn ? `${getDisplayEntityName(entityB)} Economic Moats & Competitive Strengths` : `${getDisplayEntityName(entityB)} の競争優位性 (Moats)`}</span>
          </div>
          <ul className="space-y-2.5 text-xs text-slate-700 leading-relaxed font-sans">
            {getDisplayMoats(entityB).map((m: string, idx: number) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-indigo-500 font-bold shrink-0 mt-0.5">✔</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}