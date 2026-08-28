'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  BarChart2, 
  Menu, 
  X, 
  Share2, 
  Handshake, 
  Swords, 
  Briefcase, 
  Users, 
  Building, 
  Building2, 
  Scale, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { language, setLanguage, t, isEn } = useLanguage();

  // 検索サジェストの外側クリック検知
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        // メニュー外側クリック
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ESCキーでメニューや検索を閉じる
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // リアルタイム検索クエリ
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

  // ハンバーガーメニュー内に収納する9大機能リスト
  const MENU_ITEMS = [
    {
      href: '/network',
      icon: <Share2 className="w-5 h-5 text-indigo-400" />,
      bg: 'bg-indigo-950/60 border-indigo-700/50 hover:border-indigo-500',
      title: isEn ? 'Relationship Network' : '関係性ネットワーク',
      badge: isEn ? 'Universal Graph' : '新機能',
      badgeColor: 'bg-indigo-500 text-white',
      desc: isEn 
        ? 'Corporation-to-person & cross-corporate ownership graph'
        : '法人 ⇄ 個人 ⇄ 法人の双方向ナレッジグラフ・創業家＆資本提携網'
    },
    {
      href: '/ma',
      icon: <Handshake className="w-5 h-5 text-indigo-400" />,
      bg: 'bg-indigo-950/60 border-indigo-700/50 hover:border-indigo-500',
      title: isEn ? 'M&A & Buyouts' : 'M&A・買収',
      badge: isEn ? 'Mega Deals' : 'ディール速報',
      badgeColor: 'bg-indigo-900 text-indigo-200',
      desc: isEn ? 'Mega acquisitions & takeover transactions' : '巨額M&A・TOB買収プレミアム・買収対価分析'
    },
    {
      href: '/compare',
      icon: <Swords className="w-5 h-5 text-amber-400" />,
      bg: 'bg-amber-950/60 border-amber-700/50 hover:border-amber-500',
      title: isEn ? 'Company Comparison' : '企業比較',
      badge: isEn ? 'Multi-Axis' : '財務対決',
      badgeColor: 'bg-amber-900 text-amber-200',
      desc: isEn ? 'Side-by-side metric comparison' : '複数企業の収益力・財務健全性・時価総額マルチ比較'
    },
    {
      href: '/funds',
      icon: <Briefcase className="w-5 h-5 text-purple-400" />,
      bg: 'bg-purple-950/60 border-purple-700/50 hover:border-purple-500',
      title: isEn ? 'Investment Funds' : '投資ファンド',
      badge: isEn ? 'Activist' : '大口資金',
      badgeColor: 'bg-purple-900 text-purple-200',
      desc: isEn ? 'Activist & institutional holdings tracker' : 'アクティビスト・機関投資家・CVCの保有ポートフォリオ'
    },
    {
      href: '/shareholders',
      icon: <Users className="w-5 h-5 text-amber-400" />,
      bg: 'bg-amber-950/60 border-amber-700/50 hover:border-amber-500',
      title: isEn ? 'Shareholder Directory' : '株主検索',
      badge: isEn ? 'Ownership' : '大株主',
      badgeColor: 'bg-amber-900 text-amber-200',
      desc: isEn ? 'Major shareholders & large holding filings' : 'EDINET大量保有報告書・大株主名簿検索'
    },
    {
      href: '/reits',
      icon: <Building className="w-5 h-5 text-teal-400" />,
      bg: 'bg-teal-950/60 border-teal-700/50 hover:border-teal-500',
      title: isEn ? 'J-REIT Real Estate' : 'J-REIT',
      badge: isEn ? 'Properties' : '不動産投信',
      badgeColor: 'bg-teal-900 text-teal-200',
      desc: isEn ? 'Real estate investment trusts & property assets' : '東証J-REIT全銘柄・物件鑑定評価額・NOI利回り'
    },
    {
      href: '/sectors',
      icon: <Building2 className="w-5 h-5 text-cyan-400" />,
      bg: 'bg-cyan-950/60 border-cyan-700/50 hover:border-cyan-500',
      title: isEn ? 'Sectors & Industries' : '業界・セクター',
      badge: isEn ? 'TSE 33' : '東証33業種',
      badgeColor: 'bg-cyan-900 text-cyan-200',
      desc: isEn ? 'TSE 33 industry market analysis' : '33業種別PER/PBR・時価総額ヒートマップ・業種分析'
    },
    {
      href: '/unlisted',
      icon: <Scale className="w-5 h-5 text-emerald-400" />,
      bg: 'bg-emerald-950/60 border-emerald-700/50 hover:border-emerald-500',
      title: isEn ? 'Unlisted Company Profile' : '未上場カルテ',
      badge: isEn ? 'Official Gazette' : '官報BS',
      badgeColor: 'bg-emerald-900 text-emerald-200',
      desc: isEn ? 'Official gazette balance sheets & private profiles' : '官報決算公告貸借対照表（BS）・非公開名門企業分析'
    },
    {
      href: '/audit',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      bg: 'bg-emerald-950/60 border-emerald-700/50 hover:border-emerald-500',
      title: isEn ? 'Data Quality Audit' : 'データ監査',
      badge: isEn ? '100% Pass' : '品質保証',
      badgeColor: 'bg-emerald-500 text-slate-950',
      desc: isEn ? 'Automated financial & disclosure consistency audits' : '財務3表等式・官報貸借一致・EDINET監査証書'
    }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900 border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* ロゴ */}
        <Link href="/" className="flex items-center gap-2.5 text-xl font-black tracking-tight text-white hover:opacity-90 transition shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-teal-900/40">
            <BarChart2 className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-extrabold tracking-tight text-lg">
              {isEn ? 'compana' : 'カンパーナ'} <span className="text-teal-400 text-sm font-semibold font-mono">compana</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal tracking-wider -mt-0.5 hidden md:inline">
              {isEn ? 'Corporate Financial Intelligence' : '企業分析プラットフォーム'}
            </span>
          </div>
        </Link>

        {/* 拡大された広々とした検索バー */}
        <div ref={searchRef} className="relative flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder={t('nav.search_placeholder', '銘柄名・証券コード・人物・大株主・ファンド・未上場企業を検索...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.trim() && setIsOpen(true)}
              className="w-full bg-slate-800/90 hover:bg-slate-800 focus:bg-slate-800 text-sm text-white placeholder-slate-400 rounded-full pl-11 pr-4 py-2.5 border border-slate-700 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-inner"
            />
          </div>

          {/* 検索結果サジェスト */}
          {isOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 divide-y divide-slate-800 max-h-96 overflow-y-auto">
              {results.length > 0 ? (
                results.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelect(item.url)}
                    className="p-3.5 hover:bg-slate-800/80 cursor-pointer flex items-center justify-between transition group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`px-2.5 py-1 rounded-lg border font-mono font-bold text-xs shrink-0 ${
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
                        <div className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
                          {item.type === 'shareholder' ? '銘柄カルテ ↗' : item.type === 'fund' ? 'ファンドカルテ ↗' : '詳細を見る ↗'}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-5 text-center text-sm text-slate-400">
                  {isEn ? 'No matching companies found' : '一致する企業が見つかりませんでした'}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 右側アクションエリア：スクリーナー直行 + 言語切替 + ハンバーガーボタン */}
        <div className="flex items-center gap-2 shrink-0">
          {/* スクリーナー直行ボタン */}
          <Link
            href="/screener"
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-teal-300 hover:text-white bg-teal-950/80 hover:bg-teal-900 border border-teal-700/80 transition shadow-xs"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-teal-400" />
            <span>{isEn ? 'Screener' : 'スクリーナー'}</span>
          </Link>

          {/* 🌐 言語切替トグル */}
          <div className="flex items-center bg-slate-800/90 p-0.5 rounded-xl border border-slate-700">
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

          {/* 🍔 ハンバーガーメニューボタン */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition border shadow-md ${
              isMenuOpen
                ? 'bg-teal-500 text-slate-950 border-teal-400 shadow-teal-500/20'
                : 'bg-slate-800 hover:bg-slate-700/90 text-white border-slate-700 hover:border-slate-600'
            }`}
            aria-label="機能メニューを開く"
          >
            {isMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4 text-teal-400" />
            )}
            <span className="hidden sm:inline font-bold">
              {isMenuOpen ? (isEn ? 'Close' : '閉じる') : (isEn ? 'Menu' : '機能一覧')}
            </span>
          </button>
        </div>
      </div>

      {/* 📱 ハンバーガードロップダウン・ドロワーモーダル */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 top-16 bg-slate-950/80 backdrop-blur-md transition-opacity">
          <div 
            ref={menuRef}
            className="max-w-4xl mx-auto px-4 sm:px-6 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-white">
                      {isEn ? 'All Platform Features & Tools' : 'compana 全機能・分析ツール一覧'}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isEn ? 'Explore deep corporate intelligence modules' : '目的の機能を選択して分析を開始'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 9大機能グリッド */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {MENU_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-4 rounded-2xl border transition-all duration-200 hover:scale-[1.02] flex flex-col justify-between group ${item.bg}`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 group-hover:bg-slate-800 transition">
                          {item.icon}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-white group-hover:text-teal-400 transition flex items-center justify-between">
                        <span>{item.title}</span>
                        <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 transition" />
                      </h4>

                      <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* フッタークイックリンク */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <Link href="/screener" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400 transition font-medium">
                    🔍 {isEn ? 'Stock Screener' : '全社スクリーナー'}
                  </Link>
                  <Link href="/" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400 transition font-medium">
                    🏠 {isEn ? 'Home' : 'トップページ'}
                  </Link>
                  <Link href="/finance" onClick={() => setIsMenuOpen(false)} className="hover:text-teal-400 transition font-medium">
                    📰 {isEn ? 'Official Gazette Timeline' : '決算公告速報'}
                  </Link>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  ESC / 画面外クリックで閉じる
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
