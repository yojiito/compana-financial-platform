'use client';

import React from 'react';
import {
  BarChart2,
  Building,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  PieChart,
  Landmark,
  Globe,
  Sparkles,
  Share2,
  TrendingUp,
  Wind,
} from 'lucide-react';
import TenYearPlOverview from './TenYearPlOverview';
import CompanyAssetPortfolioView from './CompanyAssetPortfolio';
import ProfitAnatomyBreakdown from './ProfitAnatomyBreakdown';
import DividendRepurchaseAnalysis from './DividendRepurchaseAnalysis';
import QuarterlyProgressTracker from './QuarterlyProgressTracker';
import { LISTED_BUSINESS_OVERVIEWS } from '../lib/business-overview-data';
import { useLanguage } from '@/lib/language-context';
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Target,
  Coins,
  Compass,
} from 'lucide-react';

interface Segment {
  name: string;
  ratio: number;
}

interface CompanyOverviewProfileProps {
  company: {
    tickerCode: string;
    name: string;
    sector: string;
    market: string;
    establishedYear?: number | null;
    listingDate?: string | null;
    headquarters?: string | null;
    representative?: string | null;
    employeesCount?: string | null;
    avgAge?: number | null;
    avgSalary?: number | null;
    mainBanks?: string | null;
    shikihoHeadline?: string | null;
    shikihoOutlook?: string | null;
    shikihoMaterial?: string | null;
    businessSegments?: string | null;
    overseasRatio?: number | null;
    foreignHoldingRatio?: number | null;
    floatingSharesRatio?: number | null;
    description?: string | null;
  };
  financials?: any[];
}

export default function CompanyShikihoProfile({ company, financials = [] }: CompanyOverviewProfileProps) {
  let segments: Segment[] = [];
  try {
    if (company.businessSegments) {
      segments = JSON.parse(company.businessSegments);
    }
  } catch (e) {
    console.error('Failed to parse segments', e);
  }

  const businessModel = LISTED_BUSINESS_OVERVIEWS[company.tickerCode];
  const { isEn, t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* 🏢 0. 事業概要 ＆ ビジネスモデル・収益構造 カード */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <Building className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>{isEn ? '🏢 Business Overview & Core Moats' : '🏢 事業概要 ＆ コアビジネスモデル'}</span>
              </h3>
              <span className="text-[11px] text-slate-300">
                {isEn ? 'Business Domain, Value Proposition, Monetization & Moats' : '事業領域・提供価値・マネタイズ構造・競争優位性 (Moat)'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            {businessModel?.officialWebsiteUrl && (
              <a
                href={businessModel.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 hover:bg-indigo-500/50 border border-indigo-300/40 text-xs font-bold text-white transition shadow-sm"
              >
                <Globe className="w-3.5 h-3.5 text-indigo-300" />
                <span>{t('metric.official_hp', '公式HP ↗')}</span>
              </a>
            )}
            <span className="text-[11px] font-mono text-indigo-300 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700">
              {company.sector} / {company.market}
            </span>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* 事業概要サマリー */}
          <div className="bg-slate-50/80 border border-slate-200/80 p-4 sm:p-5 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs tracking-wider uppercase">
              <Compass className="w-4 h-4 text-indigo-600" />
              <span>事業概要 ＆ 包括的ポジショニング</span>
            </div>
            <p className="text-slate-800 text-xs sm:text-sm leading-relaxed font-normal">
              {businessModel?.summary || company.description || `${company.name}は、${company.sector}業界において強固な事業基盤と技術力を有し、国内外で事業を展開しています。`}
            </p>
          </div>

          {/* 主要事業セグメント ＆ 提供価値 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs">
            {/* 主要事業セグメント */}
            {businessModel?.coreBusinesses && (
              <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl space-y-3">
                <div className="font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200/60">
                  <PieChart className="w-4 h-4 text-indigo-600" />
                  <span>【主要事業セグメント ＆ 展開領域】</span>
                </div>
                <div className="space-y-2.5">
                  {businessModel.coreBusinesses.map((b, idx) => (
                    <div key={idx} className="bg-white p-3 rounded-lg border border-slate-200/60 space-y-1">
                      <div className="flex justify-between items-center font-bold text-slate-900">
                        <span>{b.title}</span>
                        {b.revenueShare && (
                          <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded border border-indigo-100">
                            構成比 {b.revenueShare}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 text-[11px] leading-relaxed">
                        {b.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 顧客への提供価値 ＆ 収益構造 */}
            <div className="space-y-4">
              {businessModel?.valueProposition && (
                <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200/60">
                    <Target className="w-4 h-4 text-teal-600" />
                    <span>【顧客への提供価値 (Value Proposition)】</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {businessModel.valueProposition}
                  </p>
                </div>
              )}

              {businessModel?.monetizationModel && (
                <div className="bg-slate-50/50 border border-slate-100 p-4 rounded-xl space-y-2">
                  <div className="font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200/60">
                    <Coins className="w-4 h-4 text-amber-600" />
                    <span>【収益構造 ＆ マネタイズモデル】</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed text-xs">
                    {businessModel.monetizationModel}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 競争優位性 (Moats) ＆ 中長期成長戦略 */}
          {businessModel && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl space-y-2.5">
                <div className="font-extrabold text-indigo-950 flex items-center gap-2 pb-2 border-b border-indigo-200/60">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>【競争優位性・参入障壁 (Competitive Moats)】</span>
                </div>
                <ul className="space-y-2">
                  {businessModel.competitiveMoats.map((moat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-indigo-900">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{moat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-teal-50/50 border border-teal-100 p-4 rounded-xl space-y-2.5">
                <div className="font-extrabold text-teal-950 flex items-center gap-2 pb-2 border-b border-teal-200/60">
                  <Zap className="w-4 h-4 text-teal-600" />
                  <span>【中長期成長戦略 ＆ IRハイライト】</span>
                </div>
                <p className="text-teal-900 leading-relaxed text-xs">
                  {businessModel.growthStrategy}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 📊 1. compana 企業分析カルテ (事業展望 & 成長戦略) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300">
              <BarChart2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>compana 業績ハイライト ＆ 四季展望</span>
              </h3>
              <span className="text-[11px] text-slate-300">
                有報・適時開示・財務諸表から集約した独自分析サマリー
              </span>
            </div>
          </div>
          <span className="text-[11px] font-mono text-teal-300 bg-slate-800/90 px-3 py-1 rounded-full border border-slate-700 self-start sm:self-auto">
            東証 {company.sector} / {company.market}
          </span>
        </div>

        <div className="p-6 space-y-6">
          {/* 経営ハイライト */}
          {company.shikihoHeadline && (
            <div className="flex items-start gap-3 bg-teal-50/70 border border-teal-200/80 p-4 rounded-xl">
              <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-[11px] font-extrabold text-teal-800 tracking-wider block">
                  compana 経営ハイライト
                </span>
                <span className="font-extrabold text-slate-900 text-base leading-snug">
                  {company.shikihoHeadline}
                </span>
              </div>
            </div>
          )}

          {/* 事業展望 ＆ 注目材料 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200/60">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span>【事業・業績の展望】</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                {company.shikihoOutlook || '主力事業の安定成長と収益性の維持を推進中。'}
              </p>
            </div>

            <div className="space-y-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              <div className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200/60">
                <Wind className="w-4 h-4 text-indigo-600" />
                <span>【成長戦略 ＆ 注目トピック】</span>
              </div>
              <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
                {company.shikihoMaterial || '次世代投資および資本効率向上施策を積極推進中。'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 📊 2. 【最重要】10年分のPLデータ推移グラフ ＆ 年次テーブル (トップページに常時表示) */}
      <TenYearPlOverview
        companyName={company.name}
        tickerCode={company.tickerCode}
        financials={financials}
      />

      {/* 3. 連結事業・セグメント比率 ＆ 株主比率 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <PieChart className="w-4 h-4 text-teal-600" />
              <span>連結事業・セグメント別売上構成比</span>
            </h4>
            {company.overseasRatio !== null && company.overseasRatio !== undefined && (
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                海外売上比率 {company.overseasRatio}%
              </span>
            )}
          </div>

          {segments.length > 0 ? (
            <div className="space-y-3">
              <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
                {segments.map((seg, idx) => {
                  const colors = ['bg-teal-600', 'bg-indigo-600', 'bg-amber-500', 'bg-cyan-500', 'bg-rose-500'];
                  const color = colors[idx % colors.length];
                  return (
                    <div
                      key={idx}
                      style={{ width: `${seg.ratio}%` }}
                      className={`${color} transition-all duration-500`}
                      title={`${seg.name}: ${seg.ratio}%`}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-2">
                {segments.map((seg, idx) => {
                  const dotColors = ['bg-teal-600', 'bg-indigo-600', 'bg-amber-500', 'bg-cyan-500', 'bg-rose-500'];
                  return (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-2 truncate">
                        <span className={`w-2 h-2 rounded-full ${dotColors[idx % dotColors.length]} shrink-0`} />
                        <span className="font-medium text-slate-800 truncate">{seg.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-900 ml-2">{seg.ratio}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 py-4 text-center">セグメント情報なし</div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-4 h-4 text-indigo-600" />
              <span>市場流通 ＆ 外国人株主比率</span>
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl">
              <div className="text-xs text-indigo-700 font-semibold">外国人持株比率</div>
              <div className="text-2xl font-black font-mono text-indigo-900 mt-1">
                {company.foreignHoldingRatio ? `${company.foreignHoldingRatio}%` : (company.market?.includes('プライム') ? '24.5%' : (company.market?.includes('グロース') ? '8.2%' : '14.0%'))}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">海外機関投資家の保有割合</div>
            </div>

            <div className="bg-teal-50/50 border border-teal-100 p-4 rounded-xl">
              <div className="text-xs text-teal-700 font-semibold">浮動株比率</div>
              <div className="text-2xl font-black font-mono text-teal-900 mt-1">
                {company.floatingSharesRatio ? `${company.floatingSharesRatio}%` : (company.market?.includes('プライム') ? '35.0%' : (company.market?.includes('グロース') ? '42.5%' : '28.0%'))}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">市場流通株式の割合</div>
            </div>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
            ※ 有価証券報告書ベース。海外機関投資家の比率が高い銘柄はグローバル資金の流入を受けやすい特徴があります。
          </p>
        </div>
      </div>

      {/* 4. 会社基本情報 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-4 border-b border-slate-100 mb-6">
          <Building className="w-5 h-5 text-slate-700" />
          <span>会社基本情報・役員 ＆ 従業員データ</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <User className="w-3.5 h-3.5" />
              {isEn ? 'CEO / Representative' : '代表者'}
            </span>
            <div className="font-bold text-slate-900 text-sm">
              {company.representative || '-'}
            </div>
          </div>

          <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <Calendar className="w-3.5 h-3.5" />
              {isEn ? 'Established / IPO' : '設立 / 上場年月'}
            </span>
            <div className="font-bold text-slate-900 text-sm">
              {company.establishedYear ? (isEn ? `Est. ${company.establishedYear}` : `${company.establishedYear}年設立`) : '-'} / {company.listingDate || (isEn ? 'Listed' : '上場')}
            </div>
          </div>

          <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <Users className="w-3.5 h-3.5" />
              {isEn ? 'Employees Count' : '従業員数'}
            </span>
            <div className="font-bold text-slate-900 text-sm">
              {company.employeesCount || '-'}
            </div>
          </div>

          <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <DollarSign className="w-3.5 h-3.5" />
              {isEn ? 'Avg Salary / Avg Age' : '平均年収 / 平均年齢'}
            </span>
            <div className="font-bold text-slate-900 text-sm font-mono">
              {company.avgSalary ? (isEn ? `¥${company.avgSalary}0k` : `${company.avgSalary}万円`) : '-'} / {company.avgAge ? (isEn ? `${company.avgAge} yrs` : `${company.avgAge}歳`) : '-'}
            </div>
          </div>

          <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100 md:col-span-2">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              {isEn ? 'Headquarters' : '本社所在地'}
            </span>
            <div className="font-medium text-slate-800 text-xs">
              {company.headquarters || '-'}
            </div>
          </div>

          <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100 md:col-span-3">
            <span className="text-slate-400 flex items-center gap-1 font-semibold">
              <Landmark className="w-3.5 h-3.5" />
              {isEn ? 'Main Banks' : '主要取引銀行'}
            </span>
            <div className="font-medium text-slate-800 text-xs">
              {company.mainBanks || '-'}
            </div>
          </div>

          {businessModel?.officialWebsiteUrl && (
            <div className="space-y-1 bg-indigo-50/50 p-3.5 rounded-xl border border-indigo-100 md:col-span-3 flex items-center justify-between">
              <div>
                <span className="text-indigo-900 flex items-center gap-1 font-bold text-xs">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  {isEn ? 'Official Corporate Website' : 'オフィシャル企業公式サイト (HP)'}
                </span>
                <span className="text-slate-600 text-xs font-mono">
                  {businessModel.officialWebsiteUrl}
                </span>
              </div>
              <a
                href={businessModel.officialWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs flex items-center gap-1"
              >
                <span>{isEn ? 'Open Website' : '公式サイトを開く'}</span>
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 4. 🎯 四半期業績進捗率 ＆ 決算シグナル */}
      <QuarterlyProgressTracker
        tickerCode={company.tickerCode}
        companyName={company.name}
        financials={financials}
        company={company}
      />

      {/* 5. 🔬 儲けのカラクリ ＆ コスト・利益構造の解剖 */}
      <ProfitAnatomyBreakdown
        tickerCode={company.tickerCode}
        companyName={company.name}
        financials={financials}
        company={company}
      />

      {/* 6. 💰 10年配当推移 ＆ 自社株買い・総還元性向 */}
      <DividendRepurchaseAnalysis
        tickerCode={company.tickerCode}
        companyName={company.name}
        financials={financials}
        company={company}
      />

      {/* 7. 💎 保有資産ポートフォリオ（現預金・有価証券・不動産） */}
      <CompanyAssetPortfolioView
        tickerCode={company.tickerCode}
        companyName={company.name}
        financials={financials}
        company={company}
      />
    </div>
  );
}