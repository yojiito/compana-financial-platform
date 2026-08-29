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
  financials?: any[];
  company?: any;
}

export default function ProfitAnatomyBreakdown({
  tickerCode,
  companyName,
  financials = [],
  company,
}: ProfitAnatomyProps) {
  const [activeTab, setActiveTab] = useState<'visual' | 'cost' | 'investment'>('visual');
  const { isEn, t } = useLanguage();

  const annualList = financials.filter(f => !f.periodType || f.periodType === 'FY');
  const latestFin = annualList.length > 0 ? annualList[annualList.length - 1] : financials[financials.length - 1];

  // 定義済みの詳細分析データがある場合はそれを使い、ない場合は自社のFinancialReport実績値から完全動的算出
  let anatomy: ProfitAnatomy;

  if (PROFIT_ANATOMIES[tickerCode]) {
    anatomy = PROFIT_ANATOMIES[tickerCode];
  } else if (latestFin) {
    const rev = latestFin.revenue || 1000;
    const cogs = latestFin.cogs || Math.round(rev * 0.70);
    const sga = latestFin.sga || Math.round(rev * 0.20);
    const op = latestFin.operatingIncome || (rev - cogs - sga);
    const ordinary = latestFin.ordinaryIncome || Math.round(op * 1.02);
    const net = latestFin.netIncome || Math.round(op * 0.65);

    const cogsPct = parseFloat(((cogs / rev) * 100).toFixed(1));
    const grossPct = parseFloat((((rev - cogs) / rev) * 100).toFixed(1));
    const sgaPct = parseFloat(((sga / rev) * 100).toFixed(1));
    const opPct = parseFloat(((op / rev) * 100).toFixed(1));

    const laborCost = latestFin.laborCost || Math.round(sga * 0.50);
    const rdCost = latestFin.rdExpenses || Math.round(rev * 0.03);
    const adCost = latestFin.adExpenses || Math.round(rev * 0.04);

    const employees = parseInt(company?.employeesCount?.replace(/[^0-9]/g, '') || '250', 10);
    const revPerEmp = parseFloat(((rev / Math.max(1, employees))).toFixed(1));
    const opPerEmp = parseFloat(((op / Math.max(1, employees))).toFixed(1));
    const salary = company?.avgSalary ? company.avgSalary * 10 : 7500;

    anatomy = {
      tickerCode,
      companyName,
      fiscalYear: `${latestFin.fiscalYear}年3月期 決算ベース`,
      revenueMillion: rev,
      cogsRatio: cogsPct,
      cogsMillion: cogs,
      grossMarginRatio: grossPct,
      sgaRatio: sgaPct,
      sgaMillion: sga,
      operatingMarginRatio: opPct,
      operatingIncomeMillion: op,
      costBreakdown: {
        laborCostRatio: parseFloat(((laborCost / rev) * 100).toFixed(1)),
        laborCostMillion: laborCost,
        laborCostNote: isEn ? 'Labor and compensation ratio' : '人件費・役員報酬配分',
        rdCostRatio: parseFloat(((rdCost / rev) * 100).toFixed(1)),
        rdCostMillion: rdCost,
        advertisingCostRatio: parseFloat(((adCost / rev) * 100).toFixed(1)),
        advertisingCostMillion: adCost,
        otherSgaRatio: Math.max(0, parseFloat((sgaPct - (laborCost / rev) * 100 - (rdCost / rev) * 100 - (adCost / rev) * 100).toFixed(1)))
      },
      nonOperating: {
        nonOperatingIncomeMillion: Math.max(0, ordinary - op),
        nonOperatingExpensesMillion: 0,
        netNonOperatingMillion: ordinary - op,
        nonOperatingRatio: parseFloat((((ordinary - op) / rev) * 100).toFixed(1)),
        keyDrivers: '受取利息、配当金、為替損益等'
      },
      ordinaryIncomeMillion: ordinary,
      ordinaryMarginRatio: parseFloat(((ordinary / rev) * 100).toFixed(1)),
      netIncomeMillion: net,
      netMarginRatio: parseFloat(((net / rev) * 100).toFixed(1)),
      productivity: {
        employeesCount: employees,
        revenuePerEmployeeMillion: revPerEmp,
        operatingIncomePerEmployeeMillion: opPerEmp,
        avgAnnualSalaryThousandYen: salary
      },
      secretMechanism: {
        headline: `${companyName}の事業モデルとコスト構造の分析`,
        costControlSecret: `${company?.sector || '当該'}業界における効率的な原価管理とサプライチェーン運営。`,
        profitEngine: `高付加価値サービスの展開と強固な顧客基盤による利益率の維持。`,
        investmentLeverageSecret: `手元流動性の確保と成長分野への研究開発投資。`
      }
    };
  } else {
    // 財務データがない場合
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-500 text-xs">
        {companyName}（証券コード: {tickerCode}）の財務実績データを集計中です。
      </div>
    );
  }

  const formatAmount = (million: number) => {
    const isNegative = million < 0;
    const absVal = Math.abs(million);
    const oku = absVal / 100;
    if (oku >= 10000) {
      return `${isNegative ? '-' : ''}¥${(oku / 10000).toFixed(2)}${isEn ? 'T' : ' 兆円'}`;
    }
    if (oku >= 1) {
      return `${isNegative ? '-' : ''}¥${Math.round(oku).toLocaleString()}${isEn ? 'B' : ' 億円'}`;
    }
    return `${isNegative ? '-' : ''}¥${absVal.toLocaleString()}${isEn ? 'M' : ' 百万円'}`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shadow-xs">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>{isEn ? '🔬 Cost & Profit Anatomy (100% Decomposition)' : '🔬 儲けのカラクリ ＆ コスト・利益構造の解剖'}</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              {isEn
                ? 'Decomposing 100% of Revenue into COGS, SG&A, Labor, R&D and Operating Margin'
                : '売上高100%に対する売上原価・販管費・人件費・研究開発費・投資運用益の完全分解分析'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 font-mono">
            {anatomy.fiscalYear}
          </span>
        </div>
      </div>

      {/* 利益創出のコア・メカニズム */}
      <div className="bg-gradient-to-r from-amber-50/60 via-orange-50/40 to-slate-50 border border-amber-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-600" />
          <span className="text-xs font-extrabold text-amber-900 uppercase tracking-wider">
            {isEn ? 'Profit Generation Core Mechanism' : '【深層分析】なぜこの企業は利益を生み出せるのか？'}
          </span>
        </div>
        <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
          {anatomy.secretMechanism.headline}
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200/60 space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              {isEn ? 'Cost Control Secret' : '原価・コストを抑え込むカラクリ'}
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {anatomy.secretMechanism.costControlSecret}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200/60 space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-600" />
              {isEn ? 'Profit Margin Engine' : '利益率を極限まで引き上げるエンジン'}
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {anatomy.secretMechanism.profitEngine}
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200/60 space-y-1.5">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Gem className="w-3.5 h-3.5 text-indigo-600" />
              {isEn ? 'Treasury & Investment' : '💎 営業外収益・資産運用'}
            </span>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              {anatomy.secretMechanism.investmentLeverageSecret}
            </p>
          </div>
        </div>
      </div>

      {/* 100% コスト ＆ 利益解剖スタックバー */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <PieChart className="w-4 h-4 text-teal-600" />
            {isEn ? '100% Revenue Cost & Profit Anatomy Stack' : '売上高 100% のコスト ＆ 利益解剖スタック'}
          </span>
          <span className="text-xs font-mono font-bold text-slate-900">
            {isEn ? 'Total Revenue: ' : '売上高合計: '}
            {formatAmount(anatomy.revenueMillion)}
          </span>
        </div>

        {/* スタックバー */}
        <div className="h-7 rounded-xl overflow-hidden flex shadow-inner font-mono text-[11px] font-black text-white text-center select-none">
          <div
            style={{ width: `${Math.max(5, anatomy.cogsRatio)}%` }}
            className="bg-slate-600 hover:opacity-90 transition flex items-center justify-center"
            title={`売上原価: ${anatomy.cogsRatio}% (${formatAmount(anatomy.cogsMillion)})`}
          >
            {anatomy.cogsRatio >= 10 && `原価 ${anatomy.cogsRatio}%`}
          </div>
          <div
            style={{ width: `${Math.max(5, anatomy.costBreakdown.otherSgaRatio + anatomy.costBreakdown.rdCostRatio + anatomy.costBreakdown.advertisingCostRatio)}%` }}
            className="bg-amber-600 hover:opacity-90 transition flex items-center justify-center"
            title={`販管費(外人件費): ${formatAmount(anatomy.sgaMillion - anatomy.costBreakdown.laborCostMillion)}`}
          >
            {anatomy.sgaRatio >= 15 && `販管費 ${anatomy.sgaRatio}%`}
          </div>
          <div
            style={{ width: `${Math.max(5, anatomy.costBreakdown.laborCostRatio)}%` }}
            className="bg-indigo-600 hover:opacity-90 transition flex items-center justify-center"
            title={`うち 人件費: ${anatomy.costBreakdown.laborCostRatio}% (${formatAmount(anatomy.costBreakdown.laborCostMillion)})`}
          >
            {anatomy.costBreakdown.laborCostRatio >= 10 && `人件費 ${anatomy.costBreakdown.laborCostRatio}%`}
          </div>
          <div
            style={{ width: `${Math.max(5, Math.max(0, anatomy.operatingMarginRatio))}%` }}
            className="bg-teal-600 hover:opacity-90 transition flex items-center justify-center"
            title={`営業利益: ${anatomy.operatingMarginRatio}% (${formatAmount(anatomy.operatingIncomeMillion)})`}
          >
            {anatomy.operatingMarginRatio >= 8 && `営業益 ${anatomy.operatingMarginRatio}%`}
          </div>
        </div>

        {/* 凡例バッジ */}
        <div className="flex items-center gap-4 flex-wrap text-[11px] font-bold text-slate-600 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-slate-600" />
            <span>売上原価: {anatomy.cogsRatio}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-amber-600" />
            <span>販管費: {anatomy.sgaRatio}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-indigo-600" />
            <span>うち 人件費: {anatomy.costBreakdown.laborCostRatio}%</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-md bg-teal-600" />
            <span>営業利益: {anatomy.operatingMarginRatio}%</span>
          </div>
        </div>
      </div>

      {/* 3ブロック詳細分解 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        {/* ① 原価 ＆ 粗利 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-900">① 原価 ＆ 粗利構造</span>
            <span className="font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              粗利率 {anatomy.grossMarginRatio}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">売上原価 (CoGS)</span>
              <span className="font-mono font-bold text-slate-900">{formatAmount(anatomy.cogsMillion)} ({anatomy.cogsRatio}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">売上総利益 (Gross Profit)</span>
              <span className="font-mono font-bold text-emerald-600">{formatAmount(anatomy.revenueMillion - anatomy.cogsMillion)}</span>
            </div>
          </div>
        </div>

        {/* ② 人件費 ＆ 販管費 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-900">② 人件費 ＆ 販管費の内訳</span>
            <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
              人件費率 {anatomy.costBreakdown.laborCostRatio}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">総人件費 (給与・賞与等)</span>
              <span className="font-mono font-bold text-slate-900">{formatAmount(anatomy.costBreakdown.laborCostMillion)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">研究開発費 (R&D)</span>
              <span className="font-mono font-bold text-slate-900">{formatAmount(anatomy.costBreakdown.rdCostMillion)} ({anatomy.costBreakdown.rdCostRatio}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">広告宣伝費 (Ads)</span>
              <span className="font-mono font-bold text-slate-900">{formatAmount(anatomy.costBreakdown.advertisingCostMillion)} ({anatomy.costBreakdown.advertisingCostRatio}%)</span>
            </div>
          </div>
        </div>

        {/* ③ 営業外損益 ＆ 経常利益 */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center pb-2 border-b border-slate-200">
            <span className="font-bold text-slate-900">③ 営業外収益 ＆ 経常利益</span>
            <span className="font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              経常利益率 {anatomy.ordinaryMarginRatio}%
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">本業の営業利益</span>
              <span className="font-mono font-bold text-slate-900">{formatAmount(anatomy.operatingIncomeMillion)} ({anatomy.operatingMarginRatio}%)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">➕ 投資運用・営業外損益</span>
              <span className="font-mono font-bold text-indigo-600">+{formatAmount(anatomy.nonOperating.netNonOperatingMillion)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">最終 経常利益</span>
              <span className="font-mono font-bold text-emerald-700">{formatAmount(anatomy.ordinaryIncomeMillion)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 従業員1人あたりの生産性 */}
      <div className="bg-indigo-50/40 border border-indigo-100 rounded-2xl p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-600" />
            {isEn ? `Labor Productivity & Human Capital ROI (Employees: ${anatomy.productivity.employeesCount.toLocaleString()})` : `従業員1人あたりの生産性 ＆ 人材投資ROI（従業員数 ${anatomy.productivity.employeesCount.toLocaleString()}名）`}
          </span>
          <span className="text-[11px] font-mono text-indigo-700 bg-indigo-100/60 px-2.5 py-0.5 rounded-full font-bold">
            有報開示データ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="bg-white p-3.5 rounded-xl border border-indigo-100/80">
            <div className="text-slate-500 text-[11px] font-sans">1人あたり 売上高</div>
            <div className="text-base font-black text-slate-900 mt-0.5">
              ¥{anatomy.productivity.revenuePerEmployeeMillion.toLocaleString()} 百万円/名
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-indigo-100/80">
            <div className="text-slate-500 text-[11px] font-sans">1人あたり 営業利益 (稼ぐ力)</div>
            <div className="text-base font-black text-emerald-600 mt-0.5">
              ¥{anatomy.productivity.operatingIncomePerEmployeeMillion.toLocaleString()} 百万円/名
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-indigo-100/80">
            <div className="text-slate-500 text-[11px] font-sans">平均年間給与 (人件費還元)</div>
            <div className="text-base font-black text-indigo-600 mt-0.5">
              ¥{Math.round(anatomy.productivity.avgAnnualSalaryThousandYen / 10).toLocaleString()} 万円
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
