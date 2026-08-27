'use client';

import React, { useState } from 'react';
import {
  PROFIT_ANATOMIES,
  ProfitAnatomy,
} from '../lib/profit-anatomy-data';
import { useLanguage } from '@/lib/language-context';
import {
  PieChart,
  TrendingUp,
  Coins,
  ShieldCheck,
  DollarSign,
  Zap,
  Users,
  Building,
  Scale,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Gem,
  Calculator,
  Flame,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface ProfitAnatomyProps {
  tickerCode: string;
  companyName: string;
}

export default function ProfitAnatomyBreakdown({
  tickerCode,
  companyName,
}: ProfitAnatomyProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'cost' | 'investment'>('visual');
  const { isEn, t } = useLanguage();

  const anatomy: ProfitAnatomy = PROFIT_ANATOMIES[tickerCode] || {
    tickerCode,
    companyName,
    fiscalYear: isEn ? 'FY2024 Filings Basis' : '2024年3月期 決算ベース',
    revenueMillion: 100000,
    cogsRatio: 55.0,
    cogsMillion: 55000,
    grossMarginRatio: 45.0,
    sgaRatio: 30.0,
    sgaMillion: 30000,
    operatingMarginRatio: 15.0,
    operatingIncomeMillion: 15000,
    costBreakdown: {
      laborCostRatio: 18.0,
      laborCostMillion: 18000,
      laborCostNote: isEn ? 'Standard industry labor cost' : '標準的な業界水準の人件費配分',
      rdCostRatio: 4.5,
      rdCostMillion: 4500,
      advertisingCostRatio: 3.5,
      advertisingCostMillion: 3500,
      otherSgaRatio: 4.0
    },
    nonOperating: {
      nonOperatingIncomeMillion: 2500,
      nonOperatingExpensesMillion: 500,
      netNonOperatingMillion: 2000,
      nonOperatingRatio: 2.0,
      keyDrivers: '受取利息、為替差益等'
    },
    ordinaryIncomeMillion: 17000,
    ordinaryMarginRatio: 17.0,
    netIncomeMillion: 11500,
    netMarginRatio: 11.5,
    productivity: {
      employeesCount: 1500,
      revenuePerEmployeeMillion: 50.0,
      operatingIncomePerEmployeeMillion: 10.0,
      avgAnnualSalaryThousandYen: 7800
    },
    secretMechanism: {
      headline: isEn ? 'Steady profit generation via solid product appeal and disciplined cost controls' : '安定した商品力と堅実な原価管理による着実な利益創出構造',
      costControlSecret: isEn ? 'Supply chain optimization and internal development keep COGS low.' : 'サプライチェーンの効率化と自社開発比率の維持により原価を抑制。',
      profitEngine: isEn ? 'High brand equity and customer retention yield strong pricing power.' : 'ブランド力と製品リピート率による安定した価格決定力。',
      investmentLeverageSecret: isEn ? 'Disciplined treasury operations yield reliable interest income.' : '手元資金の堅実な運用による金利収入。'
    }
  };

  const formatAmount = (million: number) => {
    const oku = million / 100;
    if (Math.abs(oku) >= 10000) {
      return isEn ? `¥${(oku / 10000).toFixed(2)}T` : `¥${(oku / 10000).toFixed(2)} 兆円`;
    }
    return isEn ? `¥${Math.round(oku).toLocaleString()}B` : `¥${Math.round(oku).toLocaleString()} 億円`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">
                {isEn ? '🔬 Cost & Profit Anatomy (100% Revenue Breakdown)' : '🔬 儲けのカラクリ ＆ コスト・利益構造の解剖'}
              </h3>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full">
                Profit Anatomy
              </span>
            </div>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              {isEn ? 'Complete 100% breakdown of COGS, SG&A, Labor, R&D and Operating Margin' : '売上高100%に対する売上原価・販管費・人件費・研究開発費・投資運用益の完全分解分析'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
            {anatomy.fiscalYear}
          </span>
        </div>
      </div>

      {/* 💡 儲けのカラクリ 深層インサイト（最重要ハイライト） */}
      <div className="bg-gradient-to-br from-amber-500/10 via-rose-500/5 to-indigo-500/10 border border-amber-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs tracking-wider uppercase">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span>{isEn ? '【Deep Insight】Why is this company exceptionally profitable? (Core Profit Engine)' : '【深層分析】なぜこの企業は桁外れに儲かるのか？（利益創出のコア・メカニズム）'}</span>
        </div>
        <h4 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
          {anatomy.secretMechanism.headline}
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
          <div className="bg-white/90 backdrop-blur p-3.5 rounded-xl border border-amber-200/60 space-y-1">
            <span className="font-extrabold text-amber-950 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>原価・コストを抑え込むカラクリ</span>
            </span>
            <p className="text-slate-700 leading-relaxed">
              {anatomy.secretMechanism.costControlSecret}
            </p>
          </div>
          <div className="bg-white/90 backdrop-blur p-3.5 rounded-xl border border-rose-200/60 space-y-1">
            <span className="font-extrabold text-rose-950 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              <span>利益率を極限まで引き上げるエンジン</span>
            </span>
            <p className="text-slate-700 leading-relaxed">
              {anatomy.secretMechanism.profitEngine}
            </p>
          </div>
        </div>
        {anatomy.secretMechanism.investmentLeverageSecret && (
          <div className="bg-white/95 p-3.5 rounded-xl border border-indigo-200/80 space-y-1 text-xs">
            <span className="font-extrabold text-indigo-950 flex items-center gap-1.5">
              <Coins className="w-3.5 h-3.5 text-indigo-600" />
              <span>💎 営業外収益・資産運用の錬金術（コーエーテクモ型投資レバレッジ）</span>
            </span>
            <p className="text-slate-700 leading-relaxed">
              {anatomy.secretMechanism.investmentLeverageSecret}
            </p>
          </div>
        )}
      </div>

      {/* 📊 売上高 100% スタックバー（ビジュアル解剖バー） */}
      <div className="space-y-3 bg-slate-900 text-white p-5 sm:p-6 rounded-2xl shadow-inner">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-teal-400" />
            <span className="font-extrabold text-sm tracking-tight">
              売上高 100% のコスト ＆ 利益解剖スタック
            </span>
          </div>
          <span className="text-xs font-mono text-teal-300">
            売上高合計: <strong className="text-white text-sm">{formatAmount(anatomy.revenueMillion)}</strong>
          </span>
        </div>

        {/* スタックバー */}
        <div className="h-9 w-full bg-slate-800 rounded-xl overflow-hidden flex p-1 gap-1 border border-slate-700">
          {/* 売上原価 */}
          <div
            style={{ width: `${anatomy.cogsRatio}%` }}
            className="bg-gradient-to-r from-slate-600 to-slate-500 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-white shadow-sm overflow-hidden px-1 transition-all group relative cursor-pointer"
            title={`売上原価: ${anatomy.cogsRatio}% (${formatAmount(anatomy.cogsMillion)})`}
          >
            <span className="truncate">原価 {anatomy.cogsRatio}%</span>
          </div>

          {/* 販管費 (人件費除くその他) */}
          <div
            style={{ width: `${Math.max(2, anatomy.sgaRatio - anatomy.costBreakdown.laborCostRatio)}%` }}
            className="bg-gradient-to-r from-amber-600 to-amber-500 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-white shadow-sm overflow-hidden px-1 transition-all group relative cursor-pointer"
            title={`販管費(その他): ${(anatomy.sgaRatio - anatomy.costBreakdown.laborCostRatio).toFixed(1)}%`}
          >
            <span className="truncate">販管費 {(anatomy.sgaRatio - anatomy.costBreakdown.laborCostRatio).toFixed(1)}%</span>
          </div>

          {/* 人件費 */}
          <div
            style={{ width: `${anatomy.costBreakdown.laborCostRatio}%` }}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold text-white shadow-sm overflow-hidden px-1 transition-all group relative cursor-pointer"
            title={`人件費: ${anatomy.costBreakdown.laborCostRatio}% (${formatAmount(anatomy.costBreakdown.laborCostMillion)})`}
          >
            <span className="truncate">人件費 {anatomy.costBreakdown.laborCostRatio}%</span>
          </div>

          {/* 営業利益 */}
          <div
            style={{ width: `${Math.max(5, anatomy.operatingMarginRatio)}%` }}
            className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-lg flex items-center justify-center text-[11px] font-mono font-black text-slate-950 shadow-sm overflow-hidden px-1 transition-all group relative cursor-pointer"
            title={`営業利益: ${anatomy.operatingMarginRatio}% (${formatAmount(anatomy.operatingIncomeMillion)})`}
          >
            <span className="truncate">営業益 {anatomy.operatingMarginRatio}%</span>
          </div>
        </div>

        {/* スタックバーの凡例 */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-slate-500 shrink-0" />
            <span className="text-slate-300">売上原価: <strong className="text-white font-mono">{anatomy.cogsRatio}%</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-500 shrink-0" />
            <span className="text-slate-300">販管費(外人件費): <strong className="text-white font-mono">{(anatomy.sgaRatio - anatomy.costBreakdown.laborCostRatio).toFixed(1)}%</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-blue-500 shrink-0" />
            <span className="text-slate-300">うち 人件費: <strong className="text-white font-mono">{anatomy.costBreakdown.laborCostRatio}%</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-teal-400 shrink-0" />
            <span className="text-slate-300">営業利益: <strong className="text-teal-300 font-mono">{anatomy.operatingMarginRatio}%</strong></span>
          </div>
        </div>
      </div>

      {/* 3つの解剖グリッドカード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ① 原価 ＆ 粗利（売上総利益）の解剖 */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-slate-700" />
              <h4 className="font-extrabold text-slate-900 text-sm">
                ① 原価 ＆ 粗利構造
              </h4>
            </div>
            <span className="text-[10px] font-bold bg-slate-200 text-slate-800 px-2 py-0.5 rounded font-mono">
              粗利率 {anatomy.grossMarginRatio}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">売上原価 (CoGS)</span>
              <span className="font-mono font-bold text-slate-800">
                {formatAmount(anatomy.cogsMillion)} ({anatomy.cogsRatio}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">売上総利益 (Gross Profit)</span>
              <span className="font-mono font-extrabold text-emerald-700 text-sm">
                {formatAmount(anatomy.revenueMillion - anatomy.cogsMillion)}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 leading-relaxed">
              <span>※ 原価率が低いほど、価格決定力・独自IP・ファブレス設計の優位性が高い。</span>
            </div>
          </div>
        </div>

        {/* ② 販管費 ＆ 人件費・研究開発費の解剖 */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h4 className="font-extrabold text-slate-900 text-sm">
                ② 人件費 ＆ 販管費の内訳
              </h4>
            </div>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-mono">
              人件費率 {anatomy.costBreakdown.laborCostRatio}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">総人件費 (給与・賞与等)</span>
              <span className="font-mono font-bold text-blue-700">
                {formatAmount(anatomy.costBreakdown.laborCostMillion)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">研究開発費 (R&D)</span>
              <span className="font-mono font-bold text-slate-700">
                {formatAmount(anatomy.costBreakdown.rdCostMillion)} ({anatomy.costBreakdown.rdCostRatio}%)
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">広告宣伝費 (Ads)</span>
              <span className="font-mono font-bold text-slate-700">
                {formatAmount(anatomy.costBreakdown.advertisingCostMillion)} ({anatomy.costBreakdown.advertisingCostRatio}%)
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-800">【人件費の特徴】</p>
              {anatomy.costBreakdown.laborCostNote}
            </div>
          </div>
        </div>

        {/* ③ 営業外収益 ＆ 経常利益（投資・資産運用錬金術）の解剖 */}
        <div className="bg-indigo-50/60 rounded-2xl border border-indigo-200/80 p-5 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-indigo-200">
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-indigo-700" />
              <h4 className="font-extrabold text-indigo-950 text-sm">
                ③ 営業外収益 ＆ 経常利益
              </h4>
            </div>
            <span className="text-[10px] font-bold bg-indigo-200 text-indigo-900 px-2 py-0.5 rounded font-mono">
              経常利益率 {anatomy.ordinaryMarginRatio}%
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 font-medium">本業の営業利益</span>
              <span className="font-mono font-bold text-slate-900">
                {formatAmount(anatomy.operatingIncomeMillion)} ({anatomy.operatingMarginRatio}%)
              </span>
            </div>
            <div className="flex justify-between items-center bg-white/80 p-2 rounded-lg border border-indigo-200">
              <span className="text-indigo-900 font-bold flex items-center gap-1">
                <span>➕ 投資運用・営業外損益</span>
              </span>
              <span className="font-mono font-black text-indigo-700 text-sm">
                +{formatAmount(anatomy.nonOperating.netNonOperatingMillion)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-800 font-extrabold">最終 経常利益</span>
              <span className="font-mono font-black text-emerald-800 text-base">
                {formatAmount(anatomy.ordinaryIncomeMillion)}
              </span>
            </div>
            <div className="pt-2 border-t border-indigo-200/60 text-[11px] text-indigo-950 leading-relaxed font-medium">
              <p className="font-bold text-indigo-900">【営業外収益の源泉】</p>
              {anatomy.nonOperating.keyDrivers}
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 従業員1人あたり生産性 ＆ 給与水準（ROI解剖） */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-slate-800" />
            <h4 className="font-extrabold text-slate-900 text-sm">
              従業員1人あたりの生産性 ＆ 人材投資ROI（従業員数 {anatomy.productivity.employeesCount.toLocaleString()}名）
            </h4>
          </div>
          <span className="text-xs font-mono text-slate-500">有報開示データ</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl border border-slate-200/60 shadow-xs">
            <span className="text-[11px] font-bold text-slate-500 block mb-1">
              1人あたり 売上高
            </span>
            <span className="font-mono font-black text-slate-900 text-xl">
              ¥{anatomy.productivity.revenuePerEmployeeMillion.toFixed(1)} <span className="text-xs font-sans font-normal text-slate-500">百万円/名</span>
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs">
            <span className="text-[11px] font-bold text-emerald-700 block mb-1">
              1人あたり 営業利益 (稼ぐ力)
            </span>
            <span className="font-mono font-black text-emerald-700 text-xl">
              ¥{anatomy.productivity.operatingIncomePerEmployeeMillion.toFixed(1)} <span className="text-xs font-sans font-normal text-slate-500">百万円/名</span>
            </span>
          </div>

          <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-xs">
            <span className="text-[11px] font-bold text-blue-700 block mb-1">
              平均年間給与 (人件費還元)
            </span>
            <span className="font-mono font-black text-blue-700 text-xl">
              ¥{(anatomy.productivity.avgAnnualSalaryThousandYen / 10).toLocaleString()} <span className="text-xs font-sans font-normal text-slate-500">万円</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}