'use client';

import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  BarChart3,
  Users,
  Landmark,
  FileText,
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  Percent,
  Building2,
  BarChart2,
  Scale,
  Newspaper,
  Flame,
  CheckCircle2,
  Swords,
  Briefcase,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName, getSectorName } from '@/lib/company-english-names';

interface Props {
  companies: any[];
  unlistedCompanies: any[];
  recentGazettes: any[];
  totalListedCount?: number;
  totalUnlistedCount?: number;
}

export default function HomeClientView({
  companies,
  unlistedCompanies,
  recentGazettes,
  totalListedCount = 3903,
  totalUnlistedCount = 25
}: Props) {
  const { isEn, t } = useLanguage();

  const formatMillionYen = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '-';
    const oku = val / 100;
    if (Math.abs(oku) >= 10000) {
      return isEn ? `¥${(oku / 10000).toFixed(2)}T` : `${(oku / 10000).toFixed(2)} 兆円`;
    }
    if (Math.abs(val) >= 100) {
      return isEn ? `¥${oku.toFixed(1)}B` : `${oku.toFixed(1)} 億円`;
    }
    return isEn ? `¥${val.toLocaleString()}M` : `${val.toLocaleString()} 百万円`;
  };

  return (
    <div className="space-y-12 pb-16">
      {/* ヒーローセクション */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-16 pb-20 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950/80 border border-teal-700/60 text-teal-300 text-xs font-semibold shadow-inner">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>
              {isEn
                ? `TSE All Listed ${totalListedCount.toLocaleString()} Equities + ${totalUnlistedCount} Unlisted Giants + 50 J-REITs`
                : `東証全上場 ${totalListedCount.toLocaleString()}社 ＋ 未上場メガ企業 ${totalUnlistedCount}社 ＋ J-REIT 50銘柄 完全網羅`}
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none">
            {isEn ? (
              <>
                Unveil the Truth Behind{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-300">
                  Japanese Equities & Unlisted Giants
                </span>
              </>
            ) : (
              <>
                日本企業の財務・儲けのカラクリを、{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-400 to-indigo-300">
                  丸裸にする。
                </span>
              </>
            )}
          </h1>
          
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {isEn
              ? 'From 10-year financials & cost anatomy of listed blue-chips to unlisted gazette filings, J-REITs, activists and Cap Tables. Everything synthesized in one place.'
              : '上場企業の10年財務諸表・儲けのカラクリから、未上場メガ企業の官報決算公告・資本政策・大株主・J-REITまで、すべてをシームレスに可視化。'}
          </p>

          {/* クイック機能アクセス */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/compare"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-900 to-indigo-950 hover:from-indigo-800 hover:to-indigo-900 border border-indigo-500 text-amber-300 text-sm font-bold transition group shadow-lg shadow-indigo-950/60"
            >
              <Swords className="w-4 h-4 text-amber-400" />
              <span>{isEn ? '⚔️ Side-by-Side Company Comparison' : '⚔️ 2社・複数企業の直接比較 (Side-by-Side)'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              href="/funds"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-900 to-purple-950 hover:from-purple-800 hover:to-purple-900 border border-purple-500 text-purple-200 text-sm font-bold transition group shadow-lg shadow-purple-950/60"
            >
              <Briefcase className="w-4 h-4 text-purple-400" />
              <span>{isEn ? '💼 Activists & Fund Portfolios' : '💼 主要ファンド・VC保有銘柄'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-purple-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              href="/shareholders"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-900 to-amber-950 hover:from-amber-800 hover:to-amber-900 border border-amber-500 text-amber-200 text-sm font-bold transition group shadow-lg shadow-amber-950/60"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>{isEn ? '👥 Shareholder Search' : '👥 株主検索'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition" />
            </Link>
            <Link
              href="/reits"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-950/90 hover:bg-teal-900 border border-teal-600 text-teal-200 text-sm font-bold transition group shadow-md"
            >
              <Building2 className="w-3.5 h-3.5 text-teal-400" />
              <span>{isEn ? '🏢 J-REITs Real Estate' : '🏢 J-REIT 不動産投資信託'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-400 group-hover:translate-x-0.5 transition" />
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* 📊 1. 上場企業 主要カルテ */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-teal-600" />
                {isEn ? 'Featured Listed Blue-Chips' : '主要上場企業カルテ'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn ? '10-Year Financial Statements, Cost Anatomy, Dividend & Shareholder Analysis' : '10年財務3表・儲けのカラクリ・大株主・配当推移'}
              </p>
            </div>
            <Link href="/screener" className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              <span>{isEn ? 'View all in Screener' : 'スクリーナーで全社見る'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((company) => (
              <Link
                key={company.tickerCode}
                href={`/stocks/${company.tickerCode}`}
                className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-teal-400 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                        {company.tickerCode}
                      </span>
                      <h3 className="font-bold text-base text-slate-900 mt-1.5 group-hover:text-teal-600 transition">
                        {getCompanyName(company.tickerCode, company.name, isEn)}
                      </h3>
                      <span className="text-xs text-slate-500 font-medium">
                        {getSectorName(company.sector, isEn)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-500 font-medium">{t('metric.market_cap', '時価総額')}</div>
                      <div className="text-sm font-mono font-bold text-slate-800">
                        {company.marketCap ? (isEn ? `¥${(company.marketCap / 1000000000000).toFixed(2)}T` : `¥${(company.marketCap / 1000000000000).toFixed(2)}兆`) : '-'}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-xs">
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <div className="text-slate-500 text-[10px]">{t('metric.revenue', '売上高 (年商)')}</div>
                      <div className="font-bold font-mono text-slate-800 mt-0.5">
                        {(() => {
                          const rev = company.financials?.[0]?.revenue;
                          if (!rev) return '-';
                          const oku = rev / 100;
                          if (oku >= 10000) return `¥${(oku / 10000).toFixed(1)}兆`;
                          return `¥${Math.round(oku).toLocaleString()}億`;
                        })()}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <div className="text-slate-500 text-[10px]">{t('metric.operating_income', '営業利益')}</div>
                      <div className="font-bold font-mono text-emerald-600 mt-0.5">
                        {(() => {
                          const op = company.financials?.[0]?.operatingIncome;
                          if (op === undefined || op === null) return '-';
                          const oku = op / 100;
                          if (Math.abs(oku) >= 10000) return `¥${(oku / 10000).toFixed(2)}兆`;
                          return `¥${Math.round(oku).toLocaleString()}億`;
                        })()}
                      </div>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg text-center">
                      <div className="text-slate-500 text-[10px]">{t('metric.equity_ratio', '自己資本比率')}</div>
                      <div className="font-bold font-mono text-slate-800 mt-0.5">
                        {company.equityRatio ? `${company.equityRatio}%` : (company.financials?.[0]?.totalAssets && company.financials?.[0]?.netAssets ? `${((company.financials[0].netAssets / company.financials[0].totalAssets) * 100).toFixed(1)}%` : '-')}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
                  <span>{isEn ? 'Open Corporate Card' : '企業カルテを見る'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 📰 2. 未上場企業 官報決算公告 速報 */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-amber-500" />
                {isEn ? 'Latest Official Gazette Financial Filings' : '官報決算公告 速報 (未上場・メガ企業)'}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {isEn ? 'Official Gazette Filings based on Companies Act Art. 440' : '会社法第440条に基づく最新の官報開示データ'}
              </p>
            </div>
            <Link href="/unlisted" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
              <span>{isEn ? 'View all Unlisted DB' : '未上場DBで全社見る'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentGazettes.map((item) => (
              <Link
                key={item.id}
                href={`/unlisted/${item.company.slug}`}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-amber-400 hover:shadow-md transition group space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {item.gazetteDate} {isEn ? 'Gazette' : '公告'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{getSectorName(item.company.industry, isEn)}</span>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition">
                    {getCompanyName(item.company.slug, item.company.name, isEn)}
                  </h3>
                  <div className="text-xs text-slate-500 font-mono mt-0.5">{item.fiscalPeriod}</div>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('metric.net_income', '当期純利益')}:</span>
                    <span className={`font-mono font-bold ${item.netIncome >= 0 ? 'text-teal-600' : 'text-rose-600'}`}>
                      {item.netIncome >= 0 ? '+' : ''}{formatMillionYen(item.netIncome)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">{t('metric.net_assets', '純資産')}:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {formatMillionYen(item.netAssets)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}