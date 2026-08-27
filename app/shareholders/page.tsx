'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  Search,
  Building,
  TrendingUp,
  FileText,
  ShieldCheck,
  ArrowRight,
  Flame,
  Sparkles,
  Award,
  Globe,
  PieChart,
  Briefcase,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { INVESTOR_FUNDS_DATA } from '@/lib/investor-funds-data';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName } from '@/lib/company-english-names';

interface SearchResultItem {
  type: string;
  tickerCode: string;
  enTickerCode?: string;
  name: string;
  enName?: string;
  shortName: string;
  enShortName?: string;
  badge: string;
  enBadge?: string;
  subText: string;
  enSubText?: string;
  price: number | null;
  changePct: number | null;
  url: string;
}

export default function ShareholderSearchPage() {
  const { isEn, t } = useLanguage();
  const [query, setQuery] = useState<string>(isEn ? 'BlackRock' : 'ブラックロック');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isEn && query === 'ブラックロック') {
      setQuery('BlackRock');
    } else if (!isEn && query === 'BlackRock') {
      setQuery('ブラックロック');
    }
  }, [isEn]);

  const presets = [
    { label: isEn ? '🌐 BlackRock' : '🌐 ブラックロック', q: isEn ? 'BlackRock' : 'ブラックロック' },
    { label: isEn ? '🏛️ Master Trust Bank' : '🏛️ 日本マスタートラスト (信託口)', q: isEn ? 'Master Trust' : '日本マスタートラスト' },
    { label: isEn ? '🏛️ Custody Bank' : '🏛️ 日本カストディ銀行', q: isEn ? 'Custody' : '日本カストディ' },
    { label: isEn ? '🔥 Elliott Management' : '🔥 エリオット', q: isEn ? 'Elliott' : 'エリオット' },
    { label: isEn ? '🦅 Buffett (Berkshire)' : '🦅 バフェット (バークシャー)', q: isEn ? 'Berkshire' : 'バークシャー' },
    { label: isEn ? '🌴 Oasis Management' : '🌴 オアシス', q: isEn ? 'Oasis' : 'オアシス' },
    { label: isEn ? '🦄 JAFCO (VC)' : '🦄 ジャフコ (VC)', q: isEn ? 'JAFCO' : 'ジャフコ' },
    { label: isEn ? '👑 Erikawa (Koei Tecmo)' : '👑 襟川 (コーエーテクモ)', q: isEn ? '襟川' : '襟川' },
    { label: isEn ? '🏢 Toyota Industries' : '🏢 豊田自動織機 (トヨタ系列)', q: isEn ? '豊田自動織機' : '豊田自動織機' },
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
        }
      } catch (err) {
        console.error('Shareholder search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* ヒーロー */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-700/60 text-xs font-semibold">
            <Users className="w-3.5 h-3.5" />
            <span>{isEn ? 'Shareholder, Activist & 5% Holdings Screener' : '株主名・出資者・大量保有者 株主検索スクリーナー'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isEn ? 'Search Companies by Shareholder & Investor Name' : '株主・投資家名から企業を探す「株主検索」'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'Find out which companies BlackRock, Elliott, Trust Banks, Founders or Activists hold shares in. Extracted directly from official annual reports and 5% rule reports.'
              : '「誰がどの企業の大株主に入っているのか？」「ブラックロックやエリオット、信託銀行口、創業家が出資している上場・未上場企業はどこか？」を瞬時に株主検索。有価証券報告書の大株主名簿および大量保有報告書（5%ルール）から抽出。'}
          </p>
        </div>
      </div>

      {/* 🔍 逆引き検索バー ＆ プリセット */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        {/* 検索入力 */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
            {isEn ? 'Enter Shareholder, Fund, or 5% Filer Name' : '株主名・ファンド名・大量保有提出者名を入力'}
          </label>
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={isEn ? 'e.g., BlackRock, Elliott, Toyota Industries, Master Trust, Erikawa, JAFCO...' : '例: ブラックロック、エリオット、豊田自動織機、マスタートラスト、襟川、ジャフコ...'}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-200 focus:border-amber-500 rounded-2xl text-base font-bold text-slate-900 focus:outline-none transition shadow-inner"
            />
          </div>
        </div>

        {/* おすすめプリセットボタン */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-extrabold text-slate-500 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {isEn ? 'Notable Shareholders & Fund Presets' : '注目の株主・ファンド・大株主プリセット'}
          </span>
          <div className="flex flex-wrap gap-2">
            {presets.map((p) => (
              <button
                key={p.label}
                onClick={() => setQuery(p.q)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  query === p.q
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 📊 検索結果一覧 */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-600" />
              <span>{isEn ? `Companies & Funds related to "${getCompanyName('', query, true) || query}" (${results.length} results)` : `「${query}」に関連する保有先企業 ＆ ファンド (${results.length}件)`}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEn ? 'Synthesized results from Major Shareholder Registers, 5% Rule Filings, and Funds' : '大株主名簿、大量保有報告書、投資ファンドポートフォリオからの統合ヒット結果'}
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="py-12 text-center text-sm text-slate-400">
            {isEn ? 'Searching shareholder records...' : '株主データを検索中...'}
          </div>
        ) : results.length === 0 ? (
          <div className="py-12 text-center text-sm text-slate-400 space-y-2">
            <div>{isEn ? `No shareholder records matching "${query}" were found.` : `「${query}」に一致する大株主・出資先企業は見つかりませんでした。`}</div>
            <p className="text-xs text-slate-500">{isEn ? 'Try another shareholder name or choose from presets above.' : '他の株主名や上記のプリセットをお試しください。'}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((item, idx) => {
              const displayName = isEn ? (item.enName || getCompanyName(item.tickerCode, item.name, true)) : item.name;
              const displayBadge = isEn ? (item.enBadge || item.badge) : item.badge;
              const displaySubText = isEn ? (item.enSubText || item.subText) : item.subText;
              const displayTicker = isEn ? (item.enTickerCode || item.tickerCode) : item.tickerCode;

              return (
                <Link
                  key={idx}
                  href={item.url}
                  className="p-5 rounded-2xl border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between group bg-slate-50/40 hover:bg-white"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-200/70 text-slate-800 px-2 py-0.5 rounded">
                        {displayTicker}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.type === 'shareholder'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : item.type === 'fund'
                          ? 'bg-purple-50 text-purple-800 border-purple-200'
                          : item.type === 'reit'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                      }`}>
                        {displayBadge}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 group-hover:text-amber-700 transition">
                      {displayName}
                    </h3>

                    <p className="text-xs text-slate-600 font-sans">
                      {displaySubText}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-amber-700">
                    <span>{isEn ? 'View Financial Card & Filings' : '企業カルテ・財務詳細を見る'}</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* 💼 主要ファンド一覧へのリンク案内 */}
      <div className="bg-purple-50 rounded-3xl border border-purple-200 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center gap-1.5 text-purple-900 font-extrabold text-sm justify-center sm:justify-start">
            <Briefcase className="w-4 h-4 text-purple-700" />
            <span>{isEn ? 'Explore Activists & Institutional Portfolios in Depth' : 'アクティビストやVCの全保有銘柄・出資比率を詳しく見るなら'}</span>
          </div>
          <p className="text-xs text-purple-700">
            {isEn ? 'Explore full portfolios and strategies of Elliott, Oasis, Buffett, GPIF, JAFCO and more.' : 'エリオット、オアシス、バフェット、GPIF、ジャフコ等の運用戦略とポートフォリオ一覧はこちら'}
          </p>
        </div>
        <Link
          href="/funds"
          className="px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold transition shadow-sm whitespace-nowrap flex items-center gap-1"
        >
          <span>{isEn ? '💼 Go to Funds Hub' : '💼 投資ファンドハブへ'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}