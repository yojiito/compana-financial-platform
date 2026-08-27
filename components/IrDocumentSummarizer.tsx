'use client';

import React, { useState, useMemo } from 'react';
import {
  FileText,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Coins,
  Calendar,
  ExternalLink,
  Target,
  BarChart2,
  PieChart,
  Leaf,
  ShieldCheck,
  Building,
  HelpCircle,
  Layers,
  ArrowRight,
  Filter,
  CheckCircle2,
} from 'lucide-react';

export interface IrSummaryData {
  id: number;
  period: string;
  docType: string; // '中期経営計画' | '有価証券報告書' | '決算短信' | '決算説明会資料' | '統合報告書・ESG' | 'コーポレートガバナンス' | '資本政策・適時開示'
  discloseDate: string;
  executiveSummary: string;
  keyDrivers: string;
  futureOutlook: string;
  businessRisks?: string | null;
  capexAndGrowth?: string | null;
  rawUrl?: string | null;
}

interface IrDocumentSummarizerProps {
  companyName: string;
  tickerCode: string;
  summaries: IrSummaryData[];
}

export default function IrDocumentSummarizer({ companyName, tickerCode, summaries }: IrDocumentSummarizerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDocId, setSelectedDocId] = useState<number | null>(null);

  // カテゴリ一覧
  const categories = [
    { id: 'all', label: 'すべてのIR資料' },
    { id: '中期経営計画', label: '🎯 中期経営計画・ビジョン' },
    { id: '決算短信', label: '📑 決算短信' },
    { id: '有価証券報告書', label: '📋 有価証券報告書' },
    { id: '決算説明会資料', label: '📊 決算説明会・QA' },
    { id: '統合報告書・ESG', label: '🌱 統合報告書・ESG' },
    { id: '資本政策・適時開示', label: '💰 資本政策・適時開示' },
  ];

  const filteredSummaries = useMemo(() => {
    if (selectedCategory === 'all') return summaries;
    return summaries.filter((s) => s.docType.includes(selectedCategory) || selectedCategory.includes(s.docType));
  }, [summaries, selectedCategory]);

  const current = useMemo(() => {
    if (selectedDocId) {
      const found = summaries.find((s) => s.id === selectedDocId);
      if (found) return found;
    }
    return filteredSummaries[0] || summaries[0];
  }, [selectedDocId, filteredSummaries, summaries]);

  if (!summaries || summaries.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 text-xs">
        開示書類・IR情報の要約データは準備中です
      </div>
    );
  }

  const getDocBadge = (type: string) => {
    if (type.includes('中期経営計画')) {
      return { bg: 'bg-amber-950 border-amber-800 text-amber-300', icon: <Target className="w-3 h-3 text-amber-400" /> };
    }
    if (type.includes('決算説明会')) {
      return { bg: 'bg-indigo-950 border-indigo-800 text-indigo-300', icon: <BarChart2 className="w-3 h-3 text-indigo-400" /> };
    }
    if (type.includes('統合報告書') || type.includes('ESG')) {
      return { bg: 'bg-emerald-950 border-emerald-800 text-emerald-300', icon: <Leaf className="w-3 h-3 text-emerald-400" /> };
    }
    if (type.includes('資本政策')) {
      return { bg: 'bg-rose-950 border-rose-800 text-rose-300', icon: <Coins className="w-3 h-3 text-rose-400" /> };
    }
    return { bg: 'bg-slate-800 border-slate-700 text-teal-400', icon: <FileText className="w-3 h-3 text-teal-400" /> };
  };

  return (
    <div className="space-y-6">
      {/* IR総合ハブ ヘッダー ＆ カテゴリフィルター */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                <Sparkles className="w-4 h-4" />
              </span>
              <h3 className="text-base font-extrabold text-slate-900">
                総合IRライブラリ ＆ AIテキスト構造化要約
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              中期経営計画・決算短信・有報・説明会QA・統合報告書・適時開示をAIが要約・比較分析
            </p>
          </div>

          {current?.rawUrl && (
            <a
              href={current.rawUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm self-start sm:self-auto"
            >
              <span>原本（EDINET / IRサイト）を開く</span>
              <ExternalLink className="w-3.5 h-3.5 text-teal-400" />
            </a>
          )}
        </div>

        {/* 1. カテゴリ切り替えピルバー */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => {
            const count = cat.id === 'all'
              ? summaries.length
              : summaries.filter((s) => s.docType.includes(cat.id) || cat.id.includes(s.docType)).length;

            if (count === 0 && cat.id !== 'all') return null;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedDocId(null);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedCategory === cat.id ? 'bg-teal-500 text-slate-950' : 'bg-slate-200 text-slate-700'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 2. 書類リスト（カルーセル/カード） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {filteredSummaries.map((s) => {
            const isSelected = current?.id === s.id;
            const badge = getDocBadge(s.docType);

            return (
              <div
                key={s.id}
                onClick={() => setSelectedDocId(s.id)}
                className={`p-3.5 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-50/50 border-teal-500 ring-2 ring-teal-500/20 shadow-xs'
                    : 'bg-slate-50/70 hover:bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${badge.bg}`}>
                      {badge.icon}
                      <span>{s.docType}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {s.discloseDate}
                    </span>
                  </div>
                  <div className={`font-bold text-xs line-clamp-1 ${isSelected ? 'text-teal-950 font-extrabold' : 'text-slate-800'}`}>
                    {s.period}
                  </div>
                </div>

                <div className="text-[11px] text-slate-500 line-clamp-2 mt-2 leading-relaxed">
                  {s.executiveSummary}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 選択されたIR資料の詳細AI要約カード */}
      {current && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
          {/* 書類タイトル ＆ エグゼクティブ・サマリー */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-7 shadow-md space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-md border ${getDocBadge(current.docType).bg}`}>
                  {getDocBadge(current.docType).icon}
                  <span>{current.docType}</span>
                </span>
                <h4 className="text-base sm:text-lg font-black text-white">
                  {current.period}
                </h4>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded border border-slate-700">
                {current.discloseDate} 開示
              </span>
            </div>

            <div>
              <span className="text-[11px] font-bold tracking-wider uppercase text-teal-300 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                エグゼクティブ・サマリー (AI要約・要点まとめ)
              </span>
              <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-medium">
                {current.executiveSummary}
              </p>
            </div>
          </div>

          {/* 2. 業績・重点戦略の主因 ＆ 通期/定量目標 (2カラム) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <span>【重点戦略・業績増減の主因 (Key Drivers)】</span>
              </h4>
              <div className="text-xs text-slate-700 space-y-2 whitespace-pre-line leading-relaxed font-normal">
                {current.keyDrivers}
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 space-y-3">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>【定量財務目標 ＆ 今後の見通し・前提条件】</span>
              </h4>
              <div className="text-xs text-slate-700 space-y-2 whitespace-pre-line leading-relaxed font-normal">
                {current.futureOutlook}
              </div>
            </div>
          </div>

          {/* 3. 事業リスク ＆ 成長投資・資本配分 (2カラム) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {current.businessRisks && (
              <div className="bg-amber-50/60 rounded-2xl border border-amber-200/80 p-5 space-y-3">
                <h4 className="text-sm font-extrabold text-amber-900 flex items-center gap-2 pb-2 border-b border-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>【注視すべき事業等のリスク ＆ 課題】</span>
                </h4>
                <div className="text-xs text-amber-900/90 space-y-2 whitespace-pre-line leading-relaxed font-normal">
                  {current.businessRisks}
                </div>
              </div>
            )}

            {current.capexAndGrowth && (
              <div className="bg-teal-50/60 rounded-2xl border border-teal-200/80 p-5 space-y-3">
                <h4 className="text-sm font-extrabold text-teal-950 flex items-center gap-2 pb-2 border-b border-teal-200">
                  <Coins className="w-4 h-4 text-teal-700" />
                  <span>【成長投資（設備・R&D）＆ 資本配分・株主還元】</span>
                </h4>
                <div className="text-xs text-teal-900 space-y-2 whitespace-pre-line leading-relaxed font-normal">
                  {current.capexAndGrowth}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}