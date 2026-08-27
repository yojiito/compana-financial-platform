'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, ExternalLink, ShieldCheck, Building, Sparkles, TrendingUp, DollarSign, Layers } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { UnlistedHoldingItem } from '@/lib/unlisted-investments-data';

interface UnlistedInvestmentPortfolioProps {
  companyName: string;
  holdings: UnlistedHoldingItem[];
}

export default function UnlistedInvestmentPortfolio({
  companyName,
  holdings
}: UnlistedInvestmentPortfolioProps) {
  const { isEn } = useLanguage();

  if (!holdings || holdings.length === 0) {
    return null;
  }

  // カテゴリバッジ
  const getCategoryBadge = (category: string, label: string, enLabel: string) => {
    switch (category) {
      case 'listed_strategic':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Building className="w-3 h-3 text-amber-600" />
            <span>{isEn ? enLabel : label}</span>
          </span>
        );
      case 'cvc_pure_investment':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-900 border border-purple-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>{isEn ? enLabel : label}</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-900 border border-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
            <Layers className="w-3 h-3 text-blue-600" />
            <span>{isEn ? enLabel : label}</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* セクションヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <span>{isEn ? 'Strategic Equity Holdings & Investment Portfolio' : '保有株式ポートフォリオ ＆ 株式持合い・純投資'}</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isEn
              ? 'Disclosed listed affiliates, media network cross-shareholdings, wholly-owned global subsidiaries, and CVC venture investments.'
              : '有価証券報告書・大量保有報告書・公式開示に基づく主要上場持合い株、放送系列ネットワーク出資、海外中核子会社、およびCVC投資実績'}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-semibold self-start sm:self-auto">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
          <span>{holdings.length} {isEn ? 'Verified Holdings' : '件の公式開示保有持分'}</span>
        </div>
      </div>

      {/* 保有株式カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {holdings.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-indigo-300 hover:shadow-md transition space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                    <span>{isEn ? item.targetEnName : item.targetName}</span>
                  </h3>
                  {item.tickerCode && (
                    <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 mt-0.5 inline-block">
                      TSE: {item.tickerCode}
                    </span>
                  )}
                </div>
                {getCategoryBadge(item.category, item.categoryLabel, item.enCategoryLabel)}
              </div>

              {/* 保有比率 ＆ 推定価値バッジ */}
              <div className="flex flex-wrap gap-2 pt-1">
                {item.holdingRatioPct !== undefined && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
                    <span className="text-slate-400 text-[10px] block">{isEn ? 'Ownership' : '持株比率'}</span>
                    <span className="font-mono font-black text-slate-900 text-sm">{item.holdingRatioPct}%</span>
                  </div>
                )}
                {item.sharesHeld && (
                  <div className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs">
                    <span className="text-slate-400 text-[10px] block">{isEn ? 'Shares Held' : '保有株数'}</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">{item.sharesHeld}</span>
                  </div>
                )}
                {item.estimatedValueOku !== undefined && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-2.5 py-1 text-xs">
                    <span className="text-emerald-700 text-[10px] block font-semibold">{isEn ? 'Estimated Equity Value' : '推定保有時価'}</span>
                    <span className="font-mono font-black text-emerald-900 text-sm">¥{(item.estimatedValueOku / 10).toFixed(1)}B <span className="text-[10px] font-normal text-emerald-700">({item.estimatedValueOku.toLocaleString()}億円)</span></span>
                  </div>
                )}
              </div>

              {/* 保有目的 ＆ シナジー */}
              <div className="space-y-1 text-xs pt-1">
                <div className="text-slate-500 font-medium">
                  <span className="font-bold text-slate-700">{isEn ? 'Purpose: ' : '出資目的: '}</span>
                  {isEn ? item.enPurpose : item.purpose}
                </div>
                <p className="text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100 text-[11px] leading-relaxed">
                  {isEn ? item.enStrategicSynergy : item.strategicSynergy}
                </p>
              </div>
            </div>

            {/* 出所フッター */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate max-w-[280px]" title={item.officialSource}>
                出所: {isEn ? item.enOfficialSource : item.officialSource}
              </span>
              {item.tickerCode && (
                <Link
                  href={`/stocks/${item.tickerCode}`}
                  className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold hover:underline"
                >
                  <span>{isEn ? 'View Stock' : '銘柄詳細'}</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
