'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  NetworkNode, 
  NetworkEdge, 
  NodeType, 
  RelationType, 
  MASTER_RELATIONSHIP_DATA, 
  getSubGraphForEntity 
} from '../lib/relationship-network-data';
import { 
  Building2, 
  User, 
  Award, 
  ExternalLink, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  CornerDownRight, 
  Users, 
  Coins, 
  Loader2 
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

interface Props {
  initialEntityId?: string;
  className?: string;
  showControls?: boolean;
}

export default function RelationshipNetworkGraph({
  initialEntityId = 'corp-7203',
  className = '',
  showControls = true
}: Props) {
  const { isEn } = useLanguage();
  const [currentCenterId, setCurrentCenterId] = useState<string>(initialEntityId);
  const [dynamicGraph, setDynamicGraph] = useState<{ nodes: NetworkNode[]; edges: NetworkEdge[] } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 親エンティティID変更時のフェッチ
  useEffect(() => {
    let isMounted = true;
    async function fetchDynamicNetwork() {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/network/${encodeURIComponent(currentCenterId)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data.nodes && data.nodes.length > 0) {
            setDynamicGraph(data);
            return;
          }
        }
      } catch (err) {
        console.error('Error loading dynamic network:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }

      if (isMounted) {
        const staticData = getSubGraphForEntity(currentCenterId, 2);
        setDynamicGraph(staticData);
      }
    }

    fetchDynamicNetwork();
    return () => {
      isMounted = false;
    };
  }, [currentCenterId]);

  const graphData = useMemo(() => {
    if (dynamicGraph && dynamicGraph.nodes.length > 0) {
      return dynamicGraph;
    }
    return getSubGraphForEntity(currentCenterId, 2);
  }, [dynamicGraph, currentCenterId]);

  const centerNode = useMemo(() => {
    return graphData.nodes.find(n => n.id === currentCenterId) || graphData.nodes[0] || {
      id: currentCenterId,
      label: '対象企業',
      type: 'listed_corp' as NodeType,
      subLabel: '企業'
    };
  }, [graphData, currentCenterId]);

  // 中心企業に直結するエッジと関連ノードの分類
  const relatedItems = useMemo(() => {
    const directEdges = graphData.edges.filter(
      e => e.source === currentCenterId || e.target === currentCenterId
    );

    const subsidiariesAndAffiliates: { edge: NetworkEdge; node: NetworkNode }[] = [];
    const officersAndFounders: { edge: NetworkEdge; node: NetworkNode }[] = [];
    const majorShareholders: { edge: NetworkEdge; node: NetworkNode }[] = [];
    const foundationsAndCultural: { edge: NetworkEdge; node: NetworkNode }[] = [];

    for (const edge of directEdges) {
      const otherId = edge.source === currentCenterId ? edge.target : edge.source;
      const node = graphData.nodes.find(n => n.id === otherId);
      if (!node) continue;

      if (node.type === 'person' || edge.relationType === 'governance' || edge.relationType === 'kinship') {
        officersAndFounders.push({ edge, node });
      } else if (node.type === 'foundation' || edge.relationType === 'foundation') {
        foundationsAndCultural.push({ edge, node });
      } else if (edge.relationType === 'capital' || edge.relationType === 'keiretsu' || edge.relationType === 'partnership') {
        if (edge.label?.includes('株主') || edge.source === otherId) {
          majorShareholders.push({ edge, node });
        } else {
          subsidiariesAndAffiliates.push({ edge, node });
        }
      } else {
        subsidiariesAndAffiliates.push({ edge, node });
      }
    }

    return {
      subsidiariesAndAffiliates,
      officersAndFounders,
      majorShareholders,
      foundationsAndCultural
    };
  }, [graphData, currentCenterId]);

  // クイック切替プリセット
  const quickPresets = [
    { id: 'corp-7203', label: 'トヨタ自動車 (7203)', group: 'トヨタ' },
    { id: 'corp-6758', label: 'ソニーグループ (6758)', group: 'ソニー' },
    { id: 'corp-8058', label: '三菱商事 (8058)', group: '三菱' },
    { id: 'corp-8306', label: '三菱UFJ FG (8306)', group: '三菱UFJ' },
    { id: 'corp-9984', label: 'ソフトバンクG (9984)', group: 'SBG' },
    { id: 'corp-9983', label: 'ファーストリテイリング (9983)', group: 'ファストリ' },
    { id: 'corp-6861', label: 'キーエンス (6861)', group: 'キーエンス' },
    { id: 'corp-7974', label: '任天堂 (7974)', group: '任天堂' },
    { id: 'unlisted-shinchosha', label: '新潮社 (未上場)', group: '出版' },
    { id: 'unlisted-kodansha', label: '講談社 (未上場)', group: '出版' },
    { id: 'unlisted-suntory', label: 'サントリーHD (未上場)', group: '飲料' }
  ];

  return (
    <div className={`bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-5 sm:p-7 ${className}`}>
      {/* 🧭 ヘッダー ＆ ナビゲーション */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold font-mono">
            <Share2 className="w-3.5 h-3.5" />
            <span>{isEn ? 'Universal Entity Relationship Directory' : '資本・人的関係性 リレーション一覧'}</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>{centerNode.label}</span>
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              {centerNode.subLabel || '企業・組織'}
            </span>
          </h2>
          <p className="text-xs text-slate-500">
            {isEn 
              ? 'Click on any linked entity or person below to explore their direct corporate affiliations, founders, major shareholders, and foundations.' 
              : '下の各項目（出資先、役員・創業家、大株主、財団）をクリックすると、その対象を中心にした関連ネットワークへ瞬時に切り替わります。'}
          </p>
        </div>

        {/* 企業カルテへの直接ジャンプボタン */}
        <div className="flex items-center gap-2">
          {centerNode.linkUrl && (
            <Link
              href={centerNode.linkUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-sm"
            >
              <span>{isEn ? 'View Company Profile' : '企業分析カルテを開く'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* 🏷️ 主要企業クイック選択タグ */}
      {showControls && (
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">
            {isEn ? 'Quick Select Companies' : '主要企業・グループ クイック切替'}
          </span>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {quickPresets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setCurrentCenterId(preset.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border ${
                  currentCenterId === preset.id
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ⏳ ローディング表示 */}
      {isLoading ? (
        <div className="py-16 text-center space-y-3">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
          <p className="text-xs text-slate-500 font-medium">
            {centerNode.label} の関連ネットワークを集計中...
          </p>
        </div>
      ) : (
        /* 📋 関連名の箇条書きリスト (4大カテゴリ展開) */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* ① 🏢 出資先・子会社・グループ企業 */}
          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
                  <Building2 className="w-4 h-4" />
                </span>
                <h4 className="text-xs font-extrabold text-slate-900">
                  {isEn ? 'Affiliates & Subsidiaries' : '🏢 出資先・グループ企業・系列'}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                {relatedItems.subsidiariesAndAffiliates.length} 件
              </span>
            </div>

            {relatedItems.subsidiariesAndAffiliates.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 italic text-center">該当する主要出資先データはありません</p>
            ) : (
              <ul className="space-y-2 text-xs divide-y divide-slate-100">
                {relatedItems.subsidiariesAndAffiliates.map(({ node, edge }, idx) => (
                  <li key={idx} className="pt-2 flex items-center justify-between hover:bg-white p-2 rounded-xl transition group">
                    <button
                      onClick={() => setCurrentCenterId(node.id)}
                      className="flex items-center gap-2 text-left font-bold text-slate-800 group-hover:text-indigo-600 transition"
                    >
                      <CornerDownRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500" />
                      <span>{node.label}</span>
                      {node.subLabel && (
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-normal">
                          {node.subLabel}
                        </span>
                      )}
                    </button>
                    <div className="flex items-center gap-2 shrink-0">
                      {edge.label && (
                        <span className="text-[11px] font-mono font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md">
                          {edge.label}
                        </span>
                      )}
                      {node.linkUrl && (
                        <Link href={node.linkUrl} className="text-slate-400 hover:text-indigo-600">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ② 👥 創業家・代表者・人的ネットワーク */}
          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
                  <Users className="w-4 h-4" />
                </span>
                <h4 className="text-xs font-extrabold text-slate-900">
                  {isEn ? 'Founders & Executive Officers' : '👥 創業家・役員・人的ネットワーク'}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
                {relatedItems.officersAndFounders.length} 件
              </span>
            </div>

            {relatedItems.officersAndFounders.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 italic text-center">該当する役員・創業家データはありません</p>
            ) : (
              <ul className="space-y-2 text-xs divide-y divide-slate-100">
                {relatedItems.officersAndFounders.map(({ node, edge }, idx) => (
                  <li key={idx} className="pt-2 flex items-center justify-between hover:bg-white p-2 rounded-xl transition group">
                    <button
                      onClick={() => setCurrentCenterId(node.id)}
                      className="flex items-center gap-2 text-left font-bold text-slate-800 group-hover:text-amber-800 transition"
                    >
                      <CornerDownRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600" />
                      <span>{node.label}</span>
                      {node.subLabel && (
                        <span className="text-[10px] text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-normal">
                          {node.subLabel}
                        </span>
                      )}
                    </button>
                    {edge.label && (
                      <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md shrink-0">
                        {edge.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ③ 🏛️ 主要大株主・出資比率 */}
          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
                  <Coins className="w-4 h-4" />
                </span>
                <h4 className="text-xs font-extrabold text-slate-900">
                  {isEn ? 'Major Shareholders' : '🏛️ 主要大株主・資本関係'}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full">
                {relatedItems.majorShareholders.length} 件
              </span>
            </div>

            {relatedItems.majorShareholders.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 italic text-center">該当する大株主データはありません</p>
            ) : (
              <ul className="space-y-2 text-xs divide-y divide-slate-100">
                {relatedItems.majorShareholders.map(({ node, edge }, idx) => (
                  <li key={idx} className="pt-2 flex items-center justify-between hover:bg-white p-2 rounded-xl transition group">
                    <button
                      onClick={() => setCurrentCenterId(node.id)}
                      className="flex items-center gap-2 text-left font-bold text-slate-800 group-hover:text-teal-700 transition"
                    >
                      <CornerDownRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-teal-600" />
                      <span>{node.label}</span>
                    </button>
                    {edge.label && (
                      <span className="text-[11px] font-mono font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-md shrink-0">
                        {edge.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ④ 🎨 文化財団・顕彰機関 */}
          <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
                  <Award className="w-4 h-4" />
                </span>
                <h4 className="text-xs font-extrabold text-slate-900">
                  {isEn ? 'Foundations & Cultural Institutions' : '🎨 創業家財団・文化顕彰機関'}
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full">
                {relatedItems.foundationsAndCultural.length} 件
              </span>
            </div>

            {relatedItems.foundationsAndCultural.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 italic text-center">該当する設立財団データはありません</p>
            ) : (
              <ul className="space-y-2 text-xs divide-y divide-slate-100">
                {relatedItems.foundationsAndCultural.map(({ node, edge }, idx) => (
                  <li key={idx} className="pt-2 flex items-center justify-between hover:bg-white p-2 rounded-xl transition group">
                    <button
                      onClick={() => setCurrentCenterId(node.id)}
                      className="flex items-center gap-2 text-left font-bold text-slate-800 group-hover:text-rose-700 transition"
                    >
                      <CornerDownRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
                      <span>{node.label}</span>
                    </button>
                    {edge.label && (
                      <span className="text-[11px] font-mono font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md shrink-0">
                        {edge.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      )}

      {/* 🛡️ データソース注記 */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>有価証券報告書（大株主・関係会社）、会社法第440条官報決算公告、公式定款に基づく検証済データ</span>
        </div>
        <span className="font-mono">Real-time Relationship Directory</span>
      </div>
    </div>
  );
}
