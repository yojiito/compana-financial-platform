'use client';

import React, { useState, useMemo } from 'react';
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
  Filter, 
  Share2, 
  Sparkles, 
  ZoomIn, 
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Search
} from 'lucide-react';

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
  const [currentCenterId, setCurrentCenterId] = useState<string>(initialEntityId);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(initialEntityId);
  const [relationFilter, setRelationFilter] = useState<'all' | RelationType>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 中心ノードに応じたサブグラフを取得
  const graphData = useMemo(() => {
    return getSubGraphForEntity(currentCenterId, 2);
  }, [currentCenterId]);

  // フィルタリングされたエッジとノード
  const filteredEdges = useMemo(() => {
    if (relationFilter === 'all') return graphData.edges;
    return graphData.edges.filter(e => e.relationType === relationFilter);
  }, [graphData, relationFilter]);

  const activeNodeIds = useMemo(() => {
    const ids = new Set<string>([currentCenterId]);
    for (const e of filteredEdges) {
      ids.add(e.source);
      ids.add(e.target);
    }
    return ids;
  }, [currentCenterId, filteredEdges]);

  const filteredNodes = useMemo(() => {
    return graphData.nodes.filter(n => activeNodeIds.has(n.id));
  }, [graphData, activeNodeIds]);

  // 選択中のノード
  const selectedNode = useMemo(() => {
    if (!selectedNodeId) return null;
    return MASTER_RELATIONSHIP_DATA.nodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId]);

  // 選択ノードに関連するすべてのエッジ
  const selectedNodeEdges = useMemo(() => {
    if (!selectedNodeId) return [];
    return MASTER_RELATIONSHIP_DATA.edges.filter(
      e => e.source === selectedNodeId || e.target === selectedNodeId
    );
  }, [selectedNodeId]);

  // SVG Radial Layout の計算 (中心ノードを (400, 300) に配置し、周辺ノードを放射状に配置)
  const layoutNodes = useMemo(() => {
    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;

    const center = filteredNodes.find(n => n.id === currentCenterId);
    const others = filteredNodes.filter(n => n.id !== currentCenterId);

    const positions: Record<string, { x: number; y: number }> = {};

    if (center) {
      positions[center.id] = { x: centerX, y: centerY };
    }

    const radius = 220;
    const totalOthers = others.length;

    others.forEach((node, idx) => {
      const angle = (idx / Math.max(1, totalOthers)) * 2 * Math.PI - Math.PI / 2;
      positions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    return positions;
  }, [filteredNodes, currentCenterId]);

  const getNodeIcon = (type: NodeType) => {
    switch (type) {
      case 'listed_corp':
        return <Building2 className="w-4 h-4 text-indigo-600" />;
      case 'unlisted_corp':
        return <Building2 className="w-4 h-4 text-emerald-600" />;
      case 'person':
        return <User className="w-4 h-4 text-amber-600" />;
      case 'foundation':
        return <Award className="w-4 h-4 text-purple-600" />;
    }
  };

  const getNodeStyle = (type: NodeType, isCenter: boolean, isSelected: boolean) => {
    let base = 'transition-all duration-300 cursor-pointer shadow-md rounded-2xl p-3 border text-left ';
    if (isSelected) {
      base += 'ring-4 ring-indigo-500/30 scale-105 shadow-xl ';
    }
    if (isCenter) {
      base += 'bg-slate-900 border-slate-700 text-white ';
    } else {
      switch (type) {
        case 'listed_corp':
          base += 'bg-white border-indigo-200 hover:border-indigo-400 hover:shadow-indigo-100 ';
          break;
        case 'unlisted_corp':
          base += 'bg-white border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-100 ';
          break;
        case 'person':
          base += 'bg-amber-50/70 border-amber-200 hover:border-amber-400 hover:shadow-amber-100 ';
          break;
        case 'foundation':
          base += 'bg-purple-50/70 border-purple-200 hover:border-purple-400 hover:shadow-purple-100 ';
          break;
      }
    }
    return base;
  };

  const getEdgeStroke = (relationType: RelationType) => {
    switch (relationType) {
      case 'capital':
        return '#4f46e5'; // Indigo
      case 'governance':
        return '#0891b2'; // Cyan
      case 'kinship':
        return '#d97706'; // Amber
      case 'foundation':
        return '#9333ea'; // Purple
      default:
        return '#64748b';
    }
  };

  return (
    <div className={`bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden ${className}`}>
      {/* ヘッダー＆フィルターコントロール */}
      {showControls && (
        <div className="p-5 border-b border-slate-100 bg-slate-50/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base">統合 資本・人的関係性ネットワーク</h3>
                <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded-full border border-indigo-200">
                  双方向ナレッジグラフ
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                法人 ⇄ 法人（親子・持合い・出資）、法人 ⇄ 個人（創業者・役員）、個人 ⇄ 個人（親族・共同創業者）をシームレスに紐付け
              </p>
            </div>
          </div>

          {/* 関係性フィルター */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-2xs">
            <button
              onClick={() => setRelationFilter('all')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                relationFilter === 'all' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              すべて表示
            </button>
            <button
              onClick={() => setRelationFilter('capital')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                relationFilter === 'capital' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              💰 資本・持合い
            </button>
            <button
              onClick={() => setRelationFilter('governance')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                relationFilter === 'governance' ? 'bg-cyan-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              👔 創業者・役員
            </button>
            <button
              onClick={() => setRelationFilter('kinship')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                relationFilter === 'kinship' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              👨‍👩‍👧 創業家・親族
            </button>
            <button
              onClick={() => setRelationFilter('foundation')}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                relationFilter === 'foundation' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              🏛️ 文化財団
            </button>
          </div>
        </div>
      )}

      {/* メイングラフ ＆ サイドインスペクター */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* グラフ描画キャンバス */}
        <div className="lg:col-span-8 relative bg-radial from-slate-50 to-slate-100/60 p-4 flex items-center justify-center overflow-hidden">
          {/* SVG エッジレイヤー */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
            <defs>
              <marker
                id="arrowhead-indigo"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#4f46e5" />
              </marker>
              <marker
                id="arrowhead-cyan"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#0891b2" />
              </marker>
              <marker
                id="arrowhead-amber"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#d97706" />
              </marker>
              <marker
                id="arrowhead-purple"
                markerWidth="8"
                markerHeight="6"
                refX="7"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#9333ea" />
              </marker>
            </defs>

            {filteredEdges.map((edge) => {
              const srcPos = layoutNodes[edge.source];
              const tgtPos = layoutNodes[edge.target];
              if (!srcPos || !tgtPos) return null;

              const isHighlighted =
                selectedNodeId === edge.source || selectedNodeId === edge.target;
              const strokeColor = getEdgeStroke(edge.relationType);

              const midX = (srcPos.x + tgtPos.x) / 2;
              const midY = (srcPos.y + tgtPos.y) / 2;

              return (
                <g key={edge.id} className="transition-all duration-300">
                  <line
                    x1={srcPos.x}
                    y1={srcPos.y}
                    x2={tgtPos.x}
                    y2={tgtPos.y}
                    stroke={strokeColor}
                    strokeWidth={isHighlighted ? 2.8 : 1.4}
                    strokeDasharray={edge.relationType === 'governance' ? '4 3' : undefined}
                    opacity={isHighlighted ? 0.95 : 0.45}
                  />
                  {/* エッジラベル */}
                  <rect
                    x={midX - 45}
                    y={midY - 10}
                    width={90}
                    height={20}
                    rx={6}
                    fill="white"
                    stroke={strokeColor}
                    strokeWidth={isHighlighted ? 1.5 : 0.8}
                    opacity={0.92}
                  />
                  <text
                    x={midX}
                    y={midY + 3.5}
                    textAnchor="middle"
                    fill="#1e293b"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {edge.label.length > 12 ? edge.label.slice(0, 11) + '…' : edge.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* HTML ノードレイヤー */}
          <div className="relative w-[800px] h-[600px]">
            {filteredNodes.map((node) => {
              const pos = layoutNodes[node.id];
              if (!pos) return null;

              const isCenter = node.id === currentCenterId;
              const isSelected = node.id === selectedNodeId;

              return (
                <div
                  key={node.id}
                  style={{
                    position: 'absolute',
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: 'translate(-50%, -50%)',
                    width: isCenter ? '190px' : '165px',
                    zIndex: isCenter ? 30 : isSelected ? 25 : 10
                  }}
                  onClick={() => {
                    setSelectedNodeId(node.id);
                  }}
                  onDoubleClick={() => {
                    setCurrentCenterId(node.id);
                    setSelectedNodeId(node.id);
                  }}
                  className={getNodeStyle(node.type, isCenter, isSelected)}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <div className="flex items-center gap-1.5">
                      <div className={`p-1 rounded-lg ${isCenter ? 'bg-slate-800' : 'bg-slate-100'}`}>
                        {getNodeIcon(node.type)}
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isCenter ? 'text-indigo-400' : 'text-slate-500'
                      }`}>
                        {node.type === 'listed_corp'
                          ? '上場企業'
                          : node.type === 'unlisted_corp'
                          ? '未上場企業'
                          : node.type === 'person'
                          ? '個人・経営者'
                          : '文化・公益財団'}
                      </span>
                    </div>

                    {isCenter && (
                      <span className="bg-indigo-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md shadow-xs">
                        中心
                      </span>
                    )}
                  </div>

                  <h4 className={`font-bold text-xs leading-snug line-clamp-1 ${
                    isCenter ? 'text-white' : 'text-slate-900'
                  }`}>
                    {node.label}
                  </h4>

                  <p className={`text-[10px] mt-0.5 line-clamp-1 ${
                    isCenter ? 'text-slate-300' : 'text-slate-500'
                  }`}>
                    {node.subLabel}
                  </p>

                  {node.badge && (
                    <div className="mt-1.5">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md inline-block ${
                        isCenter
                          ? 'bg-slate-800 text-indigo-300 border border-slate-700'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {node.badge}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* 操作ガイダンス */}
          <div className="absolute bottom-3 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 text-[11px] text-slate-600 shadow-2xs">
            💡 <strong>クリック</strong>で詳細確認 / <strong>ダブルクリック</strong>でネットワークの中心を切り替え
          </div>
        </div>

        {/* 右サイド：詳細インスペクターパネル */}
        <div className="lg:col-span-4 p-6 bg-slate-50/50 border-l border-slate-100 flex flex-col justify-between">
          {selectedNode ? (
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-indigo-200">
                    {selectedNode.type === 'listed_corp'
                      ? '上場企業'
                      : selectedNode.type === 'unlisted_corp'
                      ? '未上場企業'
                      : selectedNode.type === 'person'
                      ? '個人・経営陣'
                      : '公益財団・文化法人'}
                  </span>
                  {selectedNode.badge && (
                    <span className="bg-slate-200 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {selectedNode.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black text-slate-900 leading-tight">
                  {selectedNode.label}
                </h3>
                <p className="text-xs text-slate-500 font-medium mt-1">
                  {selectedNode.subLabel}
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-2">
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">エンティティ概要</h5>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedNode.description}
                </p>
              </div>

              {/* 関連ネットワークリンク一覧 */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <h5 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    紐付け関係 ({selectedNodeEdges.length}件)
                  </h5>
                  <button
                    onClick={() => {
                      setCurrentCenterId(selectedNode.id);
                    }}
                    className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 hover:underline"
                  >
                    このノードを中心にする →
                  </button>
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {selectedNodeEdges.map((edge) => {
                    const isSource = edge.source === selectedNode.id;
                    const otherId = isSource ? edge.target : edge.source;
                    const otherNode = MASTER_RELATIONSHIP_DATA.nodes.find(n => n.id === otherId);
                    if (!otherNode) return null;

                    return (
                      <div
                        key={edge.id}
                        onClick={() => {
                          setSelectedNodeId(otherNode.id);
                        }}
                        className="bg-white p-3 rounded-xl border border-slate-200/80 hover:border-indigo-300 transition-all cursor-pointer shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            {getNodeIcon(otherNode.type)}
                            <span className="font-bold text-xs text-slate-900 line-clamp-1">
                              {otherNode.label}
                            </span>
                          </div>
                          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 whitespace-nowrap">
                            {edge.label}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                          {edge.detail}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* カルテ遷移リンク */}
              {selectedNode.linkUrl && (
                <div className="pt-2">
                  <Link
                    href={selectedNode.linkUrl}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-100 transition-all"
                  >
                    <span>{selectedNode.label} の企業カルテを見る</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400">
              <Share2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-xs font-bold">ノードを選択して詳細と関係性を表示</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
