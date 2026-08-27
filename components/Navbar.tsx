'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, BarChart2, Filter, Newspaper, Building2, Building, Scale, Swords, Briefcase, Users, Globe, Handshake, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { language, setLanguage, t, isEn } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setResults(data);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelect = (url: string) => {
    setIsOpen(false);
    setSearchQuery('');
    router.push(url);
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-white hover:opacity-90 transition shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-900/40">
            <BarChart2 className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold tracking-tight text-lg">
              {isEn ? 'compana' : 'カンパーナ'} <span className="text-teal-400 text-sm font-semibold font-mono">compana</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal tracking-wider -mt-0.5 hidden sm:inline">
              {isEn ? 'Corporate Financial Intelligence' : '企業分析プラットフォーム (Company × Analysis)'}
            </span>
          </div>
        </Link>

        {/* 銘柄検索バー */}
        <div ref={searchRef} className="relative flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('nav.search_placeholder', '銘柄名・コード・株主・ファンド・未上場企業を検索...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsOpen(true)}
              className="w-full bg-slate-800/90 hover:bg-slate-800 focus:bg-slate-800 text-sm text-white placeholder-slate-400 rounded-full pl-10 pr-4 py-2 border border-slate-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-inner"
            />
          </div>

          {/* 検索結果サジェスト */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800">
              {results.length > 0 ? (
                results.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelect(item.url)}
                    className="p-3 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`px-2 py-0.5 rounded border font-mono font-bold text-xs shrink-0 ${
                        item.type === 'shareholder'
                          ? 'bg-amber-950/80 border-amber-600 text-amber-300 text-[11px]'
                          : item.type === 'fund'
                          ? 'bg-purple-950 border-purple-700 text-purple-300 text-[11px]'
                          : item.type === 'reit'
                          ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                          : item.type === 'unlisted'
                          ? 'bg-teal-950 border-teal-800 text-teal-300'
                          : 'bg-slate-800 border-slate-700 text-teal-400'
                      }`}>
                        {item.tickerCode}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-slate-100 group-hover:text-teal-400 transition">
                          {item.name}
                        </div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{item.subText}</span>
                          <span>•</span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            item.type === 'shareholder' ? 'bg-amber-900/60 text-amber-300' : 'bg-slate-800 text-slate-300'
                          }`}>{item.badge}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {item.price ? (
                        <>
                          <div className="text-sm font-bold font-mono text-slate-200">
                            ¥{item.price.toLocaleString()}
                          </div>
                          {item.changePct !== null && item.changePct !== undefined && (
                            <div className={`text-xs font-mono font-semibold ${item.changePct >= 0 ? 'text-teal-400' : 'text-rose-400'}`}>
                              {item.changePct >= 0 ? '+' : ''}{item.changePct}%
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                          {item.type === 'shareholder' ? '銘柄カルテ ↗' : item.type === 'fund' ? 'ファンドカルテ ↗' : '詳細を見る ↗'}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-slate-400">
                  {isEn ? 'No matching companies found' : '一致する企業が見つかりませんでした'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ナビゲーションリンク ＆ 言語切替 */}
        <nav className="flex items-center gap-1.5">
          <Link
            href="/ma"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-indigo-300 hover:text-white bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-700 transition shadow-sm"
          >
            <Handshake className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">{t('nav.ma', 'M&A・買収')}</span>
          </Link>
          <Link
            href="/compare"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-300 hover:text-white bg-indigo-950/90 hover:bg-indigo-900 border border-indigo-700 transition shadow-sm"
          >
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{t('nav.compare', '企業比較')}</span>
          </Link>
          <Link
            href="/funds"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-purple-300 hover:text-white bg-purple-950/90 hover:bg-purple-900 border border-purple-700 transition shadow-sm"
          >
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden sm:inline">{t('nav.funds', '投資ファンド')}</span>
          </Link>
          <Link
            href="/shareholders"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-amber-300 hover:text-white bg-amber-950/90 hover:bg-amber-900 border border-amber-700 transition shadow-sm"
          >
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden md:inline">{t('nav.shareholders', '株主検索')}</span>
          </Link>
          <Link
            href="/reits"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-teal-300 hover:text-white bg-teal-950/90 hover:bg-teal-900 border border-teal-700 transition shadow-sm"
          >
            <Building className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden sm:inline">{t('nav.reits', 'J-REIT')}</span>
          </Link>
          <Link
            href="/sectors"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-cyan-300 hover:text-white bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-800/80 transition shadow-sm"
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden lg:inline">{t('nav.sectors', '業界・セクター')}</span>
          </Link>
          <Link
            href="/unlisted"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-teal-300 hover:text-white bg-teal-950/80 hover:bg-teal-900 border border-teal-800/80 transition shadow-sm"
          >
            <Scale className="w-3.5 h-3.5 text-teal-400" />
            <span className="hidden lg:inline">{t('nav.unlisted', '未上場カルテ')}</span>
          </Link>
          <Link
            href="/audit"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/90 hover:bg-emerald-900 border border-emerald-700/80 transition shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">{isEn ? 'Audit' : 'データ監査'}</span>
          </Link>

          {/* 🌐 スマート・ハイブリッド言語切替トグル */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700 ml-1">
            <button
              onClick={() => setLanguage('ja')}
              className={`px-2 py-1 rounded-lg text-[11px] font-extrabold transition ${
                language === 'ja'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="日本語に切り替え"
            >
              JP
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg text-[11px] font-extrabold transition ${
                language === 'en'
                  ? 'bg-teal-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to English"
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}