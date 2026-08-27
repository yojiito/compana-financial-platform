'use client';

import React from 'react';
import { DollarSign, Landmark, Calendar, AlertTriangle, ShieldCheck, PieChart, Layers } from 'lucide-react';

interface FundraisingItem {
  announceDate: string;
  fundingType: string;
  amountRaised: number; // 百万円
  issuePrice?: number | null;
  dilutionRatio?: number | null;
  allottee?: string | null;
  useOfFunds?: string | null;
}

interface FundraisingDebtTrackerProps {
  fundraisings: FundraisingItem[];
  interestBearingDebt?: number | null;
  netAssets?: number | null;
  totalAssets?: number | null;
}

export default function FundraisingDebtTracker({
  fundraisings,
  interestBearingDebt,
  netAssets,
  totalAssets,
}: FundraisingDebtTrackerProps) {
  // 百万円 → 億円変換
  const formatAmount = (millionYen: number) => {
    const oku = millionYen / 100;
    if (oku >= 10000) {
      return `${(oku / 10000).toFixed(2)} 兆円`;
    }
    return `${oku.toLocaleString()} 億円`;
  };

  return (
    <div className="space-y-8">
      {/* 1. 資金調達・資本移動タイムライン */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Landmark className="w-5 h-5 text-emerald-600" />
              資金調達・資本政策の履歴 (増資・社債・CB等)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              新株発行、新株予約権（ワラント）、普通社債、転換社債（CB）等の発行と資金使途
            </p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 font-medium">
            有価証券届出書 / 適時開示
          </span>
        </div>

        {fundraisings.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            直近の資金調達イベントはありません
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {fundraisings.map((item, idx) => {
              const isEquity = item.fundingType.includes('増資') || item.fundingType.includes('ワラント') || item.fundingType.includes('株式');
              return (
                <div key={idx} className="relative group">
                  {/* タイムラインの丸ポチ */}
                  <div className={`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm ${
                    isEquity ? 'bg-amber-500' : 'bg-emerald-600'
                  }`} />

                  <div className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-200 hover:shadow-sm transition">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {item.announceDate}
                        </span>
                        <span className="font-bold text-slate-900 text-sm">
                          {item.fundingType}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          isEquity ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {isEquity ? 'エクイティ調達' : 'デット調達 / 社債'}
                        </span>
                      </div>

                      <div className="text-right font-mono font-extrabold text-sm sm:text-base text-slate-900">
                        調達額: <span className="text-emerald-600">{item.amountRaised > 0 ? formatAmount(item.amountRaised) : '非開示 / 株式分割'}</span>
                      </div>
                    </div>

                    {/* 詳細グリッド */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3 pt-3 border-t border-slate-100 text-xs">
                      {item.dilutionRatio !== null && item.dilutionRatio !== undefined && (
                        <div>
                          <span className="text-slate-400">潜在希薄化率: </span>
                          <span className={`font-mono font-bold ${item.dilutionRatio > 0 ? 'text-amber-600' : 'text-slate-600'}`}>
                            {item.dilutionRatio.toFixed(2)}%
                          </span>
                        </div>
                      )}

                      {item.allottee && (
                        <div>
                          <span className="text-slate-400">割当先 / 引受: </span>
                          <span className="text-slate-700 font-medium">{item.allottee}</span>
                        </div>
                      )}

                      {item.issuePrice && (
                        <div>
                          <span className="text-slate-400">発行・行使価格: </span>
                          <span className="font-mono text-slate-700">¥{item.issuePrice.toLocaleString()}</span>
                        </div>
                      )}
                    </div>

                    {item.useOfFunds && (
                      <div className="mt-2 text-xs bg-slate-50 p-2 rounded text-slate-600">
                        <span className="font-semibold text-slate-500">資金使途: </span>
                        {item.useOfFunds}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. 負債・レバレッジ診断 */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-indigo-600" />
          財務レバレッジ & 有利子負債診断
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">有利子負債合計</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              {interestBearingDebt ? formatAmount(interestBearingDebt) : '実質無借金 (0円)'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">短期借入 + 長期借入 + 社債</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">純資産 (自己資本)</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              {netAssets ? formatAmount(netAssets) : '-'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">株主資本・留保利益</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">有利子負債比率 (D/Eレシオ)</div>
            <div className="text-lg font-bold font-mono text-slate-900 mt-1">
              {interestBearingDebt && netAssets
                ? `${((interestBearingDebt / netAssets) * 100).toFixed(1)}%`
                : '0.0% (極めて健全)'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">目安: 100%以下が健全</div>
          </div>
        </div>
      </div>
    </div>
  );
}