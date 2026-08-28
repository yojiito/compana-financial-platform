'use client';

import React, { useState, useEffect } from 'react';
import RelationshipNetworkGraph from '../../components/RelationshipNetworkGraph';
import { MASTER_RELATIONSHIP_DATA } from '../../lib/relationship-network-data';
import { 
  Share2, 
  Search, 
  Sparkles, 
  Building2, 
  User, 
  Award, 
  TrendingUp, 
  ShieldCheck,
  ChevronRight,
  Layers,
  CheckCircle2,
  SlidersHorizontal,
  Flame,
  Globe2
} from 'lucide-react';

export default function NetworkPage() {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('corp-7203');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const PRESETS = [
    {
      id: 'corp-7203',
      name: 'トヨタ自動車 ＆ 豊田家',
      category: 'モビリティ・系列',
      categoryTag: 'keiretsu',
      icon: '🚘',
      desc: '豊田章男会長・喜一郎創業者 ⇄ トヨタ・デンソー・アイシン・豊田自動織機'
    },
    {
      id: 'corp-8058',
      name: '三菱グループ (金曜会) ＆ 三菱商事',
      category: '総合商社・財閥',
      categoryTag: 'keiretsu',
      icon: '🏢',
      desc: '岩崎彌太郎開祖 ⇄ 三菱商事・三菱重工・MUFG・三菱地所の相互持合い'
    },
    {
      id: 'corp-9984',
      name: 'ソフトバンクグループ ＆ 孫正義',
      category: 'AI・グローバル投資',
      categoryTag: 'tech',
      icon: '💻',
      desc: '孫正義会長(29%) ⇄ SBG ⇄ Arm Holdings(90%) ⇄ ソフトバンク通信'
    },
    {
      id: 'corp-6758',
      name: 'ソニーグループ ＆ 創業者',
      category: 'エレクトロニクス・エンタメ',
      categoryTag: 'tech',
      icon: '🎮',
      desc: '盛田昭夫・井深大創業者 ⇄ 十時裕樹社長 ⇄ PlayStation・音楽・半導体'
    },
    {
      id: 'corp-6861',
      name: 'キーエンス ＆ 滝崎武光',
      category: 'FAセンサ・高収益',
      categoryTag: 'founder',
      icon: '🔬',
      desc: '滝崎武光名誉会長 ⇄ 資産管理会社ティ・ティ(14.8%) ⇄ 営利51%モデル'
    },
    {
      id: 'corp-9983',
      name: 'ファーストリテイリング ＆ 柳井家',
      category: 'アパレル・同族承継',
      categoryTag: 'founder',
      icon: '👕',
      desc: '柳井正会長(21.6%) ⇄ 柳井一海・康治 ⇄ 資産管理会社TTY(5.3%) ⇄ ユニクロ'
    },
    {
      id: 'corp-3641',
      name: 'パピレス ＆ 創業者・社長',
      category: '電子書籍・共同経営',
      categoryTag: 'founder',
      icon: '📱',
      desc: '天谷幹夫創業者(34.5%) ⇄ 松井康子社長(5.8%) ⇄ セガサミーHD ⇄ 日販'
    },
    {
      id: 'unlisted-bungeishunju',
      name: '文藝春秋 ＆ 日本文学振興会',
      category: '出版・文化財団',
      categoryTag: 'media',
      icon: '📚',
      desc: '菊池寛創業者・飯窪社長 ⇄ 文藝春秋 ⇄ 芥川賞・直木賞主宰母体'
    },
    {
      id: 'unlisted-shinchosha',
      name: '新潮社 ＆ 新潮文芸振興会',
      category: '出版・創業家',
      categoryTag: 'media',
      icon: '📖',
      desc: '佐藤義亮創業者・佐藤隆信社長 ⇄ 新潮社 ⇄ 三島賞・山本賞主宰母体'
    },
    {
      id: 'unlisted-shogakukan',
      name: '小学館 ＆ 集英社 (一ツ橋G)',
      category: '出版・一ツ橋グループ',
      categoryTag: 'media',
      icon: '📗',
      desc: '相賀信宏社長 ⇄ 小学館 ⇄ 集英社 ⇄ 少年ジャンプ・サンデーIP'
    }
  ];

  // 全社リアルタイム検索
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          // 静的マスターノードも合致すれば追加
          const staticMatches = MASTER_RELATIONSHIP_DATA.nodes.filter(n =>
            n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.subLabel.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          const combined = [
            ...staticMatches.map(m => ({
              tickerCode: m.id.replace('corp-', '').replace('unlisted-', ''),
              name: m.label,
              subText: m.subLabel,
              badge: m.badge || 'ネットワーク登録済',
              type: m.type === 'person' ? 'person' : m.type === 'unlisted_corp' ? 'unlisted' : 'stock',
              entityId: m.id
            })),
            ...data.map((d: any) => ({
              ...d,
              entityId: d.type === 'unlisted' ? `unlisted-${d.url.replace('/unlisted/', '')}` : `corp-${d.tickerCode}`
            }))
          ];

          // 重複排除
          const unique = Array.from(new Map(combined.map(item => [item.entityId, item])).values());
          setSearchResults(unique.slice(0, 10));
        }
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredPresets = activeCategory === 'all'
    ? PRESETS
    : PRESETS.filter(p => p.categoryTag === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* ヒーローセクション */}
      <div className="bg-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-500/30 px-3.5 py-1.5 rounded-full text-indigo-300 text-xs font-bold shadow-sm">
                <Globe2 className="w-3.5 h-3.5" />
                <span>全上場・未上場企業 網羅的ナレッジグラフエンジン</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                全社 資本・人的関係性ネットワーク
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                全3,903社の上場企業・未上場名門企業・公式大株主・代表取締役・創業家親族・文化顕彰財団をすべて動的に結合。
                系列・持合い・親族ガバナンス・出資提携をシームレスかつ双方向に探索できます。
              </p>
            </div>

            {/* 統計バッジ */}
            <div className="grid grid-cols-3 gap-2 sm:flex sm:items-center">
              <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block">上場企業網羅</span>
                <span className="text-base sm:text-lg font-black text-white font-mono">3,903 社</span>
              </div>
              <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block">大株主・役員結合</span>
                <span className="text-base sm:text-lg font-black text-indigo-400 font-mono">100% PASS</span>
              </div>
              <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block">動的探索</span>
                <span className="text-base sm:text-lg font-black text-teal-400 font-mono">リアルタイム</span>
              </div>
            </div>
          </div>

          {/* リアルタイム全社検索バー */}
          <div className="mt-8 relative max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="全3,903社・未上場・人物名（例: トヨタ、三菱商事、パピレス、豊田章男、天谷幹夫、孫正義…）"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/90 border border-slate-700 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-lg"
              />
            </div>

            {/* 検索候補ポップオーバー */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50 p-2 max-h-72 overflow-y-auto divide-y divide-slate-800">
                {searchResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedEntityId(item.entityId);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="p-3 rounded-xl hover:bg-slate-800 cursor-pointer flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-teal-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {item.tickerCode}
                      </span>
                      <div>
                        <span className="font-bold text-xs text-white group-hover:text-teal-300 transition">
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-400 ml-2">
                          {item.subText}
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold px-2 py-0.5 rounded-md">
                      ネットワークを開く →
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* コンテンツ本体 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        {/* カテゴリ切り替え ＆ 注目プリセットバー */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              すべて表示
            </button>
            <button
              onClick={() => setActiveCategory('keiretsu')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'keiretsu'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              🏢 財閥・系列グループ
            </button>
            <button
              onClick={() => setActiveCategory('founder')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'founder'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              👔 創業者・同族ファミリー
            </button>
            <button
              onClick={() => setActiveCategory('tech')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'tech'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              💻 テック・AI投資
            </button>
            <button
              onClick={() => setActiveCategory('media')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === 'media'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              📚 出版・メディア＆文学財団
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {filteredPresets.map((preset) => {
              const isSelected = selectedEntityId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedEntityId(preset.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-200 scale-[1.02]'
                      : 'bg-white border-slate-200/80 hover:border-indigo-300 text-slate-900 shadow-xs'
                  }`}
                >
                  <div className="text-xl mb-1">{preset.icon}</div>
                  <h4 className={`font-bold text-xs line-clamp-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                    {preset.name}
                  </h4>
                  <p className={`text-[10px] line-clamp-1 mt-0.5 ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>
                    {preset.category}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* ネットワークグラフ本体 */}
        <RelationshipNetworkGraph
          key={selectedEntityId}
          initialEntityId={selectedEntityId}
          className="border-slate-200 shadow-md"
        />

        {/* 3大関係性の解説セクション */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              💰
            </div>
            <h4 className="font-bold text-slate-900 text-sm">法人 ⇄ 法人 (資本・出資提携)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              親会社・子会社・系列グループ関係（トヨタと豊田自動織機・デンソー等）や、戦略的持合い（セガサミーHDとパピレス等）、文化財団の設立支援母体を完全追跡。
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
              👔
            </div>
            <h4 className="font-bold text-slate-900 text-sm">法人 ⇄ 個人 (創業者・役員ガバナンス)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              歴史的創業者や現役トップ（豊田章男氏、天谷幹夫氏、松井康子社長、柳井正氏、孫正義氏等）と法人の実質支配・経営ガバナンスを可視化。
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              👨‍👩‍👧
            </div>
            <h4 className="font-bold text-slate-900 text-sm">個人 ⇄ 個人 (創業家同族 ＆ 共同経営)</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              共同創業者同士の二人三脚（天谷幹夫氏 ⇄ 松井康子氏）や、創業家直系の承継（豊田家、柳井家、佐藤家、相賀家等）によるファミリーオフィス資本を網羅。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
