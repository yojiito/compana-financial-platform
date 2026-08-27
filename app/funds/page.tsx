'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  Flame,
  Search,
  Layers,
  Sparkles,
  Building,
  DollarSign,
  User,
  Users,
  Award,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { INVESTOR_FUNDS_DATA, InvestorFund } from '@/lib/investor-funds-data';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName } from '@/lib/company-english-names';

export default function FundsHubPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { isEn, t } = useLanguage();

  const filteredFunds = useMemo(() => {
    return INVESTOR_FUNDS_DATA.filter((fund) => {
      const matchesType =
        selectedType === 'all' ||
        (selectedType === 'activist' && fund.type === 'activist') ||
        (selectedType === 'vc' && fund.type === 'vc') ||
        (selectedType === 'institutional' && (fund.type === 'institutional' || fund.type === 'buffett'));

      const matchesSearch =
        fund.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fund.enName && fund.enName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        fund.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (fund.enShortName && fund.enShortName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        fund.representative.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        fund.topHoldings.some((h) => h.targetName.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesType && matchesSearch;
    });
  }, [selectedType, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* ヒーロー */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 border border-purple-700/60 text-xs font-semibold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isEn ? 'Major Activists, VCs & Institutional Fund Portfolios' : '主要ファンド・VC・機関投資家 大量保有ポートフォリオ'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isEn ? 'Major Investor Funds & Institutional Portfolios' : '投資ファンド ＆ 機関投資家の保有銘柄・投資先データベース'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'Real-time portfolio intelligence from official 5% rule filings: Activists (Elliott, Oasis, Silchester), Buffett (Berkshire Hathaway), GPIF, BlackRock, and Top VCs (SoftBank Vision Fund, JAFCO).'
              : '大量保有報告書（5%ルール）や公式開示に基づき、エリオット、オアシス、シルチェスター等の物言う株主（アクティビスト）、バフェット（バークシャー）、GPIF・ブラックロック、ジャフコ・ビジョンファンド等のトップVCの保有銘柄・出資比率・エンゲージメント戦略を抽出・可視化。'}
          </p>

          {/* 📅 データ基準日 ＆ 大量保有報告書同期 */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg">
              <span>📅</span>
              <span>{isEn ? 'Filing Data: EDINET Large Shareholding Reports (5% Rule)' : '開示ソース: 金融庁EDINET 大量保有報告書（5%ルール）＆ 変更報告書'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-2.5 py-1 rounded-lg font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Fund Portfolio Sync: Aug 27, 2026' : 'ファンド保有ポートフォリオ最終同期: 2026年8月27日'}</span>
            </span>
          </div>
        </div>
      </div>

      {/* 🎛️ フィルター ＆ 検索バー */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* タブ */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedType === 'all'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isEn ? 'All Funds (All Categories)' : 'すべて表示 (全区分)'}
            </button>
            <button
              onClick={() => setSelectedType('activist')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedType === 'activist'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isEn ? '🔥 Activists (Shareholder Engagement)' : '🔥 アクティビスト (物言う株主)'}
            </button>
            <button
              onClick={() => setSelectedType('institutional')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedType === 'institutional'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isEn ? '🏛️ Buffett & Institutional (Pensions/AUM)' : '🏛️ バフェット & 機関投資家・年金'}
            </button>
            <button
              onClick={() => setSelectedType('vc')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedType === 'vc'
                  ? 'bg-purple-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isEn ? '🦄 Top VCs & Growth Funds' : '🦄 主要ベンチャーキャピタル (VC)'}
            </button>
          </div>

          {/* 検索入力 */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search fund, manager, target stock...' : 'ファンド名・代表者・出資先企業を検索...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 font-sans"
            />
          </div>
        </div>
      </div>

      {/* 💼 ファンドカード グリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFunds.map((fund) => {
          const displayFundName = isEn ? fund.enName : fund.name;
          const displayTypeLabel = isEn ? fund.enTypeLabel : fund.typeLabel;
          const displayCountry = isEn ? fund.enCountry : fund.country;
          const displayRep = isEn ? fund.enRepresentative : fund.representative;
          const displayAum = isEn ? fund.enAumLabel : fund.aumLabel;
          const displayDesc = isEn ? fund.enDescription : fund.description;

          return (
            <div
              key={fund.id}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:border-purple-400 hover:shadow-lg transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* ヘッダー */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${fund.badgeColor}`}>
                    {displayTypeLabel}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {isEn ? 'HQ / Base:' : '拠点:'} {displayCountry}
                  </span>
                </div>

                <div>
                  <Link href={`/funds/${fund.slug}`} className="block">
                    <h2 className="text-xl font-black text-slate-900 group-hover:text-purple-600 transition">
                      {displayFundName}
                    </h2>
                  </Link>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                    <span>{isEn ? 'Leader / Rep:' : '代表:'} <strong className="text-slate-800 font-bold">{displayRep}</strong></span>
                    <span>•</span>
                    <span>AUM: <strong className="text-purple-700 font-mono font-bold">{displayAum}</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {displayDesc}
                </p>

                {/* 🎯 主要保有銘柄・投資先ピックアップ */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-700">
                    <span>{isEn ? 'Top Holdings & Target Portfolio' : '主要保有銘柄 ＆ 投資先ポートフォリオ'}</span>
                    <span className="text-slate-400 font-mono">{fund.topHoldings.length} {isEn ? 'Disclosed' : '件 開示'}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {fund.topHoldings.map((h, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg text-slate-800 font-semibold"
                      >
                        <span>{getCompanyName(h.tickerCode || h.unlistedSlug || '', h.targetName, isEn)}</span>
                        <strong className="text-purple-700 font-mono font-bold">({h.ownershipRatioPct}%)</strong>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* フッター */}
              <div className="pt-6 flex items-center gap-2">
                <Link
                  href={`/funds/${fund.slug}`}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-900 group-hover:bg-purple-700 text-white text-xs font-bold transition shadow-sm"
                >
                  <span>{isEn ? 'View Portfolio & Strategy' : '保有銘柄 ＆ 投資戦略を見る'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </Link>
                {fund.officialWebsiteUrl && (
                  <a
                    href={fund.officialWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition border border-slate-200"
                    title={isEn ? 'Open official website' : 'ファンド公式サイトを開く'}
                  >
                    <Globe className="w-4 h-4 text-slate-600" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}