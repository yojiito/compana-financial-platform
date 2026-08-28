'use client';

import React, { useState } from 'react';
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
  Layers
} from 'lucide-react';

export default function NetworkPage() {
  const [selectedEntityId, setSelectedEntityId] = useState<string>('corp-7203');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const PRESETS = [
    {
      id: 'corp-7203',
      name: 'トヨタ自動車 ＆ 豊田家',
      category: 'モビリティ・系列',
      icon: '🚘',
      desc: '豊田章男会長・喜一郎創業者 ⇄ トヨタ・デンソー・アイシン・豊田自動織機'
    },
    {
      id: 'unlisted-bungeishunju',
      name: '文藝春秋 ＆ 日本文学振興会',
      category: '出版・文化財団',
      icon: '📚',
      desc: '菊池寛創業者・飯窪社長 ⇄ 文藝春秋 ⇄ 芥川賞・直木賞主宰母体'
    },
    {
      id: 'unlisted-shinchosha',
      name: '新潮社 ＆ 新潮文芸振興会',
      category: '出版・創業家',
      icon: '📖',
      desc: '佐藤義亮創業者・佐藤隆信社長 ⇄ 新潮社 ⇄ 三島賞・山本賞主宰母体'
    },
    {
      id: 'corp-3641',
      name: 'パピレス ＆ 創業者・社長',
      category: '電子書籍・共同経営',
      icon: '📱',
      desc: '天谷幹夫創業者(34.5%) ⇄ 松井康子社長(5.8%) ⇄ セガサミーHD ⇄ 日販'
    },
    {
      id: 'corp-9983',
      name: 'ファーストリテイリング ＆ 柳井家',
      category: 'アパレル・同族承継',
      icon: '👕',
      desc: '柳井正会長(21.6%) ⇄ 柳井一海・康治 ⇄ 資産管理会社TTY(5.3%) ⇄ ユニクロ'
    },
    {
      id: 'corp-9984',
      name: 'ソフトバンクグループ ＆ 孫正義',
      category: 'AI・グローバル投資',
      icon: '💻',
      desc: '孫正義会長(29%) ⇄ SBG ⇄ Arm Holdings(90%) ⇄ ソフトバンク通信'
    }
  ];

  const searchResults = searchQuery.trim()
    ? MASTER_RELATIONSHIP_DATA.nodes.filter(n =>
        n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.subLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* ヒーローセクション */}
      <div className="bg-slate-900 text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 bg-indigo-950/80 border border-indigo-500/30 px-3 py-1 rounded-full text-indigo-300 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>統合 人的・資本ナレッジグラフ</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                法人 ⇄ 個人 ⇄ 法人 シームレス関係性エクスプローラー
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                上場・未上場企業、創業者・主要役員、創業家親族、出資提携先、文化顕彰財団をすべて繋ぐ公式ナレッジグラフ。
                資本関係（親子・持合い・出資）、人的ガバナンス（代表者・役員）、創業家同族承継、文化事業母体を双方向に探索できます。
              </p>
            </div>

            {/* 統計バッジ */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center">
              <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block">登録エンティティ</span>
                <span className="text-lg font-black text-white font-mono">{MASTER_RELATIONSHIP_DATA.nodes.length} 件</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/80 p-3 rounded-2xl">
                <span className="text-[10px] text-slate-400 font-bold block">検証済関係性リンク</span>
                <span className="text-lg font-black text-indigo-400 font-mono">{MASTER_RELATIONSHIP_DATA.edges.length} 本</span>
              </div>
            </div>
          </div>

          {/* リアルタイム検索バー */}
          <div className="mt-8 relative max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="企業名（トヨタ、文藝春秋、パピレス…）や人物名（豊田章男、天谷幹夫、柳井正…）で検索"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800/90 border border-slate-700 rounded-2xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-lg"
              />
            </div>

            {/* 検索候補ポップオーバー */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 p-2 max-h-64 overflow-y-auto">
                {searchResults.map((node) => (
                  <div
                    key={node.id}
                    onClick={() => {
                      setSelectedEntityId(node.id);
                      setSearchQuery('');
                    }}
                    className="p-2.5 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-900">{node.label}</span>
                      <span className="text-[11px] text-slate-500 ml-2">{node.subLabel}</span>
                    </div>
                    <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded-md">
                      グラフを開く →
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
        {/* 注目プリセット切り替えバー */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRESETS.map((preset) => {
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
              親会社・子会社・グループ系列関係（トヨタと豊田自動織機・デンソー等）や、戦略的持合い（セガサミーHDとパピレス等）、文化財団の設立支援母体を完全追跡。
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
