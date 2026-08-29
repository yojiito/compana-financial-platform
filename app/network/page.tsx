'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import RelationshipNetworkGraph from '../../components/RelationshipNetworkGraph';
import { MASTER_RELATIONSHIP_DATA } from '../../lib/relationship-network-data';
import { 
  Share2, 
  Search, 
  Building2, 
  User, 
  ExternalLink,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

export default function NetworkPage() {
  const { isEn } = useLanguage();
  const [selectedEntityId, setSelectedEntityId] = useState<string>('corp-7203');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // リアルタイム検索
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/stocks/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          const staticMatches = MASTER_RELATIONSHIP_DATA.nodes.filter(n =>
            n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.subLabel.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
          const combined = [
            ...staticMatches.map(m => ({
              tickerCode: m.id.replace('corp-', '').replace('unlisted-', ''),
              name: m.label,
              subText: m.subLabel,
              type: m.type === 'person' ? 'person' : m.type === 'unlisted_corp' ? 'unlisted' : 'stock',
              entityId: m.id
            })),
            ...data.map((d: any) => ({
              ...d,
              entityId: d.type === 'unlisted' ? `unlisted-${d.url.replace('/unlisted/', '')}` : `corp-${d.tickerCode}`
            }))
          ];

          const unique = Array.from(new Map(combined.map(item => [item.entityId, item])).values());
          setSearchResults(unique.slice(0, 8));
        }
      } catch (err) {
        console.error('Search error:', err);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const PRESETS = [
    { id: 'corp-7203', name: 'トヨタ自動車 (7203)', desc: 'デンソー・アイシン・豊田自動織機・豊田家' },
    { id: 'corp-6758', name: 'ソニーグループ (6758)', desc: 'PlayStation・音楽・半導体・盛田家' },
    { id: 'corp-8058', name: '三菱商事 (8058)', desc: '三菱グループ (金曜会)・MUFG・三菱重工' },
    { id: 'corp-9984', name: 'ソフトバンクG (9984)', desc: '孫正義・Arm・ソフトバンク通信' },
    { id: 'corp-9983', name: 'ファーストリテイリング (9983)', desc: '柳井家・ユニクロ・資産管理会社' },
    { id: 'corp-6861', name: 'キーエンス (6861)', desc: '滝崎武光・資産管理会社ティ・ティ' },
    { id: 'unlisted-shinchosha', name: '新潮社 (未上場)', desc: '佐藤家・新潮文芸振興会 (三島賞・山本賞)' },
    { id: 'unlisted-bungeishunju', name: '文藝春秋 (未上場)', desc: '菊池寛・日本文学振興会 (芥川賞・直木賞)' },
    { id: 'unlisted-suntory', name: 'サントリーHD (未上場)', desc: '鳥井家・佐治家・寿不動産' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 pb-20 font-sans">
      {/* 🧭 簡潔なヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Share2 className="w-5 h-5" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isEn ? 'Corporate Relationship Directory' : '資本・人的関係性ネットワーク'}
            </h1>
          </div>
          <p className="text-xs text-slate-500">
            {isEn 
              ? 'Search any company to view its affiliated subsidiaries, founders, major shareholders, and foundations in a clear bullet list.' 
              : '企業名・証券コードを入力するか、主要企業を選択すると、出資先・役員・大株主・財団が箇条書きで一覧表示されます。'}
          </p>
        </div>

        {/* 検索バー */}
        <div className="relative w-full sm:w-80">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search company code or name...' : '社名・コードで検索（例: 7203, 新潮社）'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-medium transition"
            />
          </div>

          {/* 検索ドロップダウン */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-1.5 left-0 right-0 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100">
              {searchResults.map((res, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedEntityId(res.entityId);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="w-full p-3 text-left hover:bg-indigo-50/50 flex items-center justify-between text-xs transition group"
                >
                  <div>
                    <span className="font-bold text-slate-900 group-hover:text-indigo-600 block">{res.name}</span>
                    <span className="text-[11px] text-slate-400">{res.subText || res.tickerCode}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 🏷️ 主要企業クイック切替 */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedEntityId(preset.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
              selectedEntityId === preset.id
                ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* 📋 関係性リスト本体 */}
      <RelationshipNetworkGraph
        key={selectedEntityId}
        initialEntityId={selectedEntityId}
        showControls={false}
      />
    </div>
  );
}
