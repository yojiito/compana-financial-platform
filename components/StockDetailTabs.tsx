'use client';

import React, { useState } from 'react';
import {
  CandlestickChart,
  BarChart3,
  Users,
  Coins,
  FileText,
  BarChart2,
  Sparkles,
  Gem,
  Target,
  Calculator,
  Award,
  Share2,
} from 'lucide-react';
import StockCandleChart from './StockCandleChart';
import FinancialVisualizer from './FinancialVisualizer';
import ShareholderTracker from './ShareholderTracker';
import FundraisingDebtTracker from './FundraisingDebtTracker';
import DisclosureTimeline from './DisclosureTimeline';
import CompanyShikihoProfile from './CompanyShikihoProfile';
import IrDocumentSummarizer, { IrSummaryData } from './IrDocumentSummarizer';
import CompanyAssetPortfolioView from './CompanyAssetPortfolio';
import ProfitAnatomyBreakdown from './ProfitAnatomyBreakdown';
import DividendRepurchaseAnalysis from './DividendRepurchaseAnalysis';
import QuarterlyProgressTracker from './QuarterlyProgressTracker';
import RelationshipNetworkGraph from './RelationshipNetworkGraph';
import { useLanguage } from '@/lib/language-context';

interface StockDetailTabsProps {
  company: any;
  stockPrices: any[];
  financials: any[];
  shareholders: any[];
  largeHoldings: any[];
  fundraisings: any[];
  disclosures: any[];
  irSummaries?: IrSummaryData[];
}

export default function StockDetailTabs({
  company,
  stockPrices,
  financials,
  shareholders,
  largeHoldings,
  fundraisings,
  disclosures,
  irSummaries = [],
}: StockDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<
    | 'profile'
    | 'network'
    | 'anatomy'
    | 'quarterly'
    | 'dividends'
    | 'ir_summary'
    | 'chart'
    | 'financials'
    | 'assets'
    | 'shareholders'
    | 'fundraising'
    | 'disclosures'
  >('profile');

  const latestFin = financials[financials.length - 1];

  const { isEn } = useLanguage();

  return (
    <div className="space-y-6">
      {/* タブヘッダー */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2">
        <div className="flex items-center gap-2 overflow-x-auto py-2 no-scrollbar">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart2 className="w-4 h-4 text-teal-400" />
            <span>{isEn ? '📊 Profile & Highlights' : '📊 企業分析カルテ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('network')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'network'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-indigo-700 hover:bg-indigo-50 font-extrabold border border-indigo-200/80 bg-indigo-50/40'
            }`}
          >
            <Share2 className="w-4 h-4 text-indigo-400" />
            <span>{isEn ? '🌐 Relationship Network' : '🌐 資本・人的ネットワーク'}</span>
          </button>

          <button
            onClick={() => setActiveTab('anatomy')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'anatomy'
                ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm'
                : 'text-slate-700 hover:text-amber-800 hover:bg-amber-50 font-extrabold border border-amber-200/80 bg-amber-50/40'
            }`}
          >
            <Calculator className="w-4 h-4 text-amber-400" />
            <span>{isEn ? '🔬 Cost & Profit Anatomy (100%)' : '🔬 儲けのカラクリ (コスト・利益解剖)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('quarterly')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'quarterly'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-indigo-700 hover:bg-indigo-50 font-bold border border-indigo-200/80 bg-indigo-50/30'
            }`}
          >
            <Target className="w-4 h-4 text-indigo-400" />
            <span>{isEn ? '🎯 Quarterly Progress (Q on Q)' : '🎯 四半期進捗率 (Q on Q)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('dividends')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'dividends'
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-800 hover:bg-emerald-50 font-bold border border-emerald-200/80 bg-emerald-50/30'
            }`}
          >
            <Coins className="w-4 h-4 text-emerald-400" />
            <span>{isEn ? '💰 10-Yr Dividend & Buybacks' : '💰 10年配当 ＆ 自社株買い'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ir_summary')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'ir_summary'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isEn ? '📑 AI IR Filings Summary' : '📑 有報・決算短信 AI要約'}</span>
          </button>

          <button
            onClick={() => setActiveTab('chart')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'chart'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CandlestickChart className="w-4 h-4 text-teal-400" />
            <span>{isEn ? '📈 Stock Chart' : '📈 株価チャート'}</span>
          </button>

          <button
            onClick={() => setActiveTab('financials')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'financials'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-teal-400" />
            <span>{isEn ? '📊 10-Yr Financial Statements' : '📊 財務3表推移 (PL/BS/CF)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('assets')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'assets'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Gem className="w-4 h-4 text-cyan-400" />
            <span>{isEn ? '💎 Asset Portfolio' : '💎 保有資産ポートフォリオ'}</span>
          </button>

          <button
            onClick={() => setActiveTab('shareholders')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'shareholders'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>{isEn ? '👥 Major Shareholders & 5%' : '👥 大株主 & 5%大量保有'}</span>
          </button>

          <button
            onClick={() => setActiveTab('fundraising')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'fundraising'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Coins className="w-4 h-4 text-amber-400" />
            <span>{isEn ? '💰 Financing & Debt' : '💰 資金調達・社債 & 負債診断'}</span>
          </button>

          <button
            onClick={() => setActiveTab('disclosures')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold transition whitespace-nowrap ${
              activeTab === 'disclosures'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4 text-teal-400" />
            <span>{isEn ? '📢 Timely Disclosures (TDnet)' : '📢 適時開示 (TDnet)'}</span>
          </button>
        </div>
      </div>

      {/* タブコンテンツ */}
      <div>
        {activeTab === 'profile' && (
          <CompanyShikihoProfile company={company} financials={financials} />
        )}

        {activeTab === 'network' && (
          <RelationshipNetworkGraph
            initialEntityId={`corp-${company.tickerCode}`}
            showControls={false}
          />
        )}

        {activeTab === 'anatomy' && (
          <ProfitAnatomyBreakdown
            tickerCode={company.tickerCode}
            companyName={company.name}
            financials={financials}
            company={company}
          />
        )}

        {activeTab === 'quarterly' && (
          <QuarterlyProgressTracker
            tickerCode={company.tickerCode}
            companyName={company.name}
            financials={financials}
            company={company}
          />
        )}

        {activeTab === 'dividends' && (
          <DividendRepurchaseAnalysis
            tickerCode={company.tickerCode}
            companyName={company.name}
            financials={financials}
            company={company}
          />
        )}

        {activeTab === 'ir_summary' && (
          <IrDocumentSummarizer
            companyName={company.name}
            tickerCode={company.tickerCode}
            summaries={irSummaries}
          />
        )}

        {activeTab === 'chart' && (
          <StockCandleChart
            data={stockPrices}
            tickerCode={company.tickerCode}
            currentPrice={company.currentPrice}
          />
        )}

        {activeTab === 'financials' && (
          <FinancialVisualizer
            financials={financials}
            companyName={company.name}
          />
        )}

        {activeTab === 'assets' && (
          <CompanyAssetPortfolioView
            tickerCode={company.tickerCode}
            companyName={company.name}
            financials={financials}
            company={company}
          />
        )}

        {activeTab === 'shareholders' && (
          <ShareholderTracker
            shareholders={shareholders}
            largeHoldings={largeHoldings}
          />
        )}

        {activeTab === 'fundraising' && (
          <FundraisingDebtTracker
            fundraisings={fundraisings}
            interestBearingDebt={latestFin?.interestBearingDebt}
            netAssets={latestFin?.netAssets}
            totalAssets={latestFin?.totalAssets}
          />
        )}

        {activeTab === 'disclosures' && (
          <DisclosureTimeline
            disclosures={disclosures}
            tickerCode={company.tickerCode}
          />
        )}
      </div>
    </div>
  );
}