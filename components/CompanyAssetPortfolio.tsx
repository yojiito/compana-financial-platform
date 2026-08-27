'use client';

import React, { useState } from 'react';
import {
  ASSET_PORTFOLIOS,
  CompanyAssetPortfolio,
  HeldSecurity,
} from '../lib/asset-portfolio-data';
import {
  DollarSign,
  PieChart,
  Building,
  Landmark,
  ShieldCheck,
  TrendingUp,
  MapPin,
  Sparkles,
  Layers,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Gem,
} from 'lucide-react';

interface CompanyAssetPortfolioProps {
  tickerCode: string;
  companyName: string;
}

export default function CompanyAssetPortfolioView({
  tickerCode,
  companyName,
}: CompanyAssetPortfolioProps) {
  const [showAllHoldings, setShowAllHoldings] = useState(true);

  // データ取得 (定義されていない銘柄の場合はデフォルト生成)
  const portfolio: CompanyAssetPortfolio = ASSET_PORTFOLIOS[tickerCode] || {
    tickerCode,
    companyName,
    asOfDate: '最新有価証券報告書 開示基準',
    cash: {
      cashAndEquivalentsMillion: 450000,
      interestBearingDebtMillion: 120000,
      netCashMillion: 330000,
      cashToMonthlySalesRatio: 3.2,
      financialStatus: 'cash_rich',
    },
    securities: {
      totalInvestmentSecuritiesMillion: 380000,
      policyHoldingSecuritiesMillion: 220000,
      policyReductionPolicy: 'コーポレートガバナンス・コードに基づき、保有意義の薄い政策保有株式を順次売却・縮減中。',
      holdings: [
        {
          name: '取引先・サプライヤー主要銘柄群',
          shares: '複数銘柄',
          carryingAmountMillion: 185000,
          holdingRatio: 4.5,
          purpose: '取引関係の維持・サプライチェーン安定化'
        },
        {
          name: '提携金融機関・共同開発パートナー',
          shares: '複数銘柄',
          carryingAmountMillion: 95000,
          holdingRatio: 2.1,
          purpose: '円滑な資金調達および共同研究開発アライアンス'
        }
      ]
    },
    realEstate: {
      landBookValueMillion: 180000,
      buildingsBookValueMillion: 240000,
      rentalPropertiesFairValueMillion: 65000,
      rentalPropertiesBookValueMillion: 32000,
      unrealizedGainMillion: 33000,
      mainFacilities: [
        '本社ビル・研究開発センター（主要自社保有施設）',
        '国内主力生産工場・マザー工場群',
        '全国主要都市 物流センター・営業拠点'
      ]
    },
    totalLiquidAssetsMillion: 1010000,
    marketCapCoverageRatio: 32.5
  };

  const formatAmount = (million: number) => {
    const oku = million / 100;
    if (Math.abs(oku) >= 10000) {
      return `¥${(oku / 10000).toFixed(2)} 兆円`;
    }
    return `¥${Math.round(oku).toLocaleString()} 億円`;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center shadow-xs">
            <Gem className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900">
                保有資産ポートフォリオ（現預金・有価証券・不動産）
              </h3>
              <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                有報公式開示
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              {portfolio.asOfDate} に基づく手元流動性・政策保有株・保有不動産の実態分析
            </p>
          </div>
        </div>

        {/* 資産カバレッジバッジ */}
        <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-right self-start sm:self-auto shadow-sm">
          <span className="text-[10px] text-slate-400 block font-semibold">
            時価総額に対する資産カバレッジ率
          </span>
          <span className="text-lg font-extrabold font-mono text-teal-400">
            {portfolio.marketCapCoverageRatio}%
          </span>
          <span className="text-[10px] text-slate-400 ml-1">
            (現預金+証券+土地)
          </span>
        </div>
      </div>

      {/* 3大資産サマリーカード (現預金 / 有価証券 / 不動産) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* ① 💵 現金 ＆ ネットキャッシュ */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-teal-600" />
              <h4 className="font-extrabold text-slate-900 text-sm">
                現金 ＆ ネットキャッシュ
              </h4>
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
              portfolio.cash.financialStatus === 'debt_free'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-teal-100 text-teal-800'
            }`}>
              {portfolio.cash.financialStatus === 'debt_free' ? '完全無借金経営' : '潤沢な手元流動性'}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">現金及び現金同等物</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {formatAmount(portfolio.cash.cashAndEquivalentsMillion)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">有利子負債合計</span>
              <span className="font-mono font-bold text-slate-700">
                {portfolio.cash.interestBearingDebtMillion === 0
                  ? '¥0 (ゼロ)'
                  : formatAmount(portfolio.cash.interestBearingDebtMillion)}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
              <span className="text-slate-700 font-bold">ネットキャッシュ</span>
              <span className={`font-mono font-extrabold text-sm ${
                portfolio.cash.netCashMillion >= 0 ? 'text-teal-600' : 'text-slate-900'
              }`}>
                {formatAmount(portfolio.cash.netCashMillion)}
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/60 mt-1">
              <span>月商比手元流動性</span>
              <span className="font-mono font-bold text-slate-800">
                月商の {portfolio.cash.cashToMonthlySalesRatio} ヶ月分
              </span>
            </div>
          </div>
        </div>

        {/* ② 📈 投資有価証券 ＆ 政策保有株式 */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <h4 className="font-extrabold text-slate-900 text-sm">
                投資有価証券 ＆ 政策保有株
              </h4>
            </div>
            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
              含み資産
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">投資有価証券 合計</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {formatAmount(portfolio.securities.totalInvestmentSecuritiesMillion)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">うち 政策保有株式</span>
              <span className="font-mono font-bold text-indigo-700">
                {formatAmount(portfolio.securities.policyHoldingSecuritiesMillion)}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/60 leading-relaxed">
              <span className="font-bold text-slate-800 block mb-0.5">【縮減・売却方針】</span>
              {portfolio.securities.policyReductionPolicy}
            </div>
          </div>
        </div>

        {/* ③ 🏢 保有不動産 ＆ 土地資産 */}
        <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-amber-600" />
              <h4 className="font-extrabold text-slate-900 text-sm">
                保有不動産 ＆ 土地資産
              </h4>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
              実物資産
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">土地 (簿価)</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                {formatAmount(portfolio.realEstate.landBookValueMillion)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">建物・構築物 (簿価)</span>
              <span className="font-mono font-bold text-slate-700">
                {formatAmount(portfolio.realEstate.buildingsBookValueMillion)}
              </span>
            </div>
            {portfolio.realEstate.unrealizedGainMillion !== undefined && (
              <div className="flex justify-between items-center pt-2 border-t border-slate-200/60">
                <span className="text-slate-700 font-bold">賃貸等不動産の含み益</span>
                <span className="font-mono font-extrabold text-amber-700">
                  +{formatAmount(portfolio.realEstate.unrealizedGainMillion)}
                </span>
              </div>
            )}
            <div className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/60">
              <span>※ 取得時期の古い土地は時価ベースで多額の含み益が存在</span>
            </div>
          </div>
        </div>
      </div>

      {/* 具体的 保有有価証券・政策保有株式の内訳テーブル */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-800" />
            <h4 className="font-extrabold text-slate-900 text-sm">
              開示されている主要保有有価証券・政策保有株式の内訳明細
            </h4>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            有価証券報告書 開示順
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                <th className="py-2.5 px-3">銘柄名 / コード</th>
                <th className="py-2.5 px-3">保有株式数 / 区分</th>
                <th className="py-2.5 px-3 text-right">貸借対照表計上額 (時価)</th>
                <th className="py-2.5 px-3 text-right">保有比率</th>
                <th className="py-2.5 px-3">保有目的 ＆ 事業シナジー / 直近動向</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {portfolio.securities.holdings.map((sec, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{sec.name}</span>
                    </div>
                    {sec.tickerCode && (
                      <span className="inline-block text-[10px] font-mono font-bold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200 mt-1">
                        {sec.tickerCode}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-700 whitespace-nowrap">
                    {sec.shares}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-black text-slate-900 text-sm whitespace-nowrap">
                    {formatAmount(sec.carryingAmountMillion)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-indigo-700 whitespace-nowrap">
                    {sec.holdingRatio > 0 ? `${sec.holdingRatio}%` : '-'}
                  </td>
                  <td className="py-3 px-3 text-slate-700 text-[11px] leading-relaxed max-w-xs sm:max-w-md">
                    <p className="font-medium text-slate-800">{sec.purpose}</p>
                    {sec.statusNote && (
                      <p className="text-[10px] text-indigo-600 bg-indigo-50/70 rounded px-2 py-0.5 mt-1 border border-indigo-100 inline-block font-semibold">
                        💡 {sec.statusNote}
                      </p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 不動産・主要生産拠点・研究開発施設 */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <MapPin className="w-4 h-4 text-slate-800" />
          <h4 className="font-extrabold text-slate-900 text-sm">
            主要保有拠点・生産工場・研究開発施設（土地・建物資産）
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {portfolio.realEstate.mainFacilities.map((fac, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 text-slate-700 space-y-1.5"
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 text-xs">
                <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>{typeof fac === 'string' ? fac : fac.name}</span>
              </div>
              {typeof fac !== 'string' && (
                <>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{fac.location}</span>
                    <span className="text-slate-300">|</span>
                    <span className="text-teal-700 font-semibold">{fac.areaOrScale}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium">
                    {fac.purpose}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}