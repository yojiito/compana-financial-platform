'use client';

import React from 'react';
import { Users, Shield, PieChart, Building, UserCheck, Briefcase, Award } from 'lucide-react';

export interface UnlistedShareholderData {
  id: number;
  rank: number;
  shareholderName: string;
  shareholderType: string; // "FOUNDER" | "VC_FUND" | "CORPORATE" | "OTHER"
  holdingRatio: number;
  sharesHeld?: number | null;
  note?: string | null;
}

interface UnlistedShareholderTrackerProps {
  companyName: string;
  shareholders: UnlistedShareholderData[];
}

export default function UnlistedShareholderTracker({ companyName, shareholders }: UnlistedShareholderTrackerProps) {
  const sorted = [...shareholders].sort((a, b) => a.rank - b.rank);

  // カテゴリ別合計比率の集計
  const founderRatio = sorted.filter((s) => s.shareholderType === 'FOUNDER').reduce((acc, s) => acc + s.holdingRatio, 0);
  const vcRatio = sorted.filter((s) => s.shareholderType === 'VC_FUND').reduce((acc, s) => acc + s.holdingRatio, 0);
  const corpRatio = sorted.filter((s) => s.shareholderType === 'CORPORATE').reduce((acc, s) => acc + s.holdingRatio, 0);
  const otherRatio = sorted.filter((s) => s.shareholderType === 'OTHER').reduce((acc, s) => acc + s.holdingRatio, 0);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'FOUNDER':
        return <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full">創業者・役員</span>;
      case 'VC_FUND':
        return <span className="bg-indigo-100 text-indigo-800 border border-indigo-300 text-[10px] font-bold px-2 py-0.5 rounded-full">VC・ファンド</span>;
      case 'CORPORATE':
        return <span className="bg-blue-100 text-blue-800 border border-blue-300 text-[10px] font-bold px-2 py-0.5 rounded-full">事業会社 / CVC</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">その他 / 持株会</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 株主構成サマリーカード */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>大株主名簿 ＆ 資本構成 (Cap Table)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              創業者・ベンチャーキャピタル・事業会社の保有シェア一覧
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {shareholders.length} 名の主要株主
          </span>
        </div>

        {/* 資本構成比率プログレスバー */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-600">
            <span>株主属性別シェア</span>
            <span className="font-mono">合計 {(founderRatio + vcRatio + corpRatio + otherRatio).toFixed(1)}%</span>
          </div>

          <div className="h-4 rounded-full overflow-hidden flex bg-slate-100 shadow-inner">
            {founderRatio > 0 && (
              <div style={{ width: `${founderRatio}%` }} className="bg-emerald-500" title={`創業者・役員: ${founderRatio.toFixed(1)}%`} />
            )}
            {vcRatio > 0 && (
              <div style={{ width: `${vcRatio}%` }} className="bg-indigo-500" title={`VC・ファンド: ${vcRatio.toFixed(1)}%`} />
            )}
            {corpRatio > 0 && (
              <div style={{ width: `${corpRatio}%` }} className="bg-blue-500" title={`事業会社: ${corpRatio.toFixed(1)}%`} />
            )}
            {otherRatio > 0 && (
              <div style={{ width: `${otherRatio}%` }} className="bg-slate-400" title={`その他: ${otherRatio.toFixed(1)}%`} />
            )}
          </div>

          <div className="flex flex-wrap gap-4 text-xs pt-1">
            {founderRatio > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-slate-600">創業者・役員: <b className="font-mono">{founderRatio.toFixed(1)}%</b></span>
              </div>
            )}
            {vcRatio > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-600">VC・ファンド: <b className="font-mono">{vcRatio.toFixed(1)}%</b></span>
              </div>
            )}
            {corpRatio > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-slate-600">事業会社: <b className="font-mono">{corpRatio.toFixed(1)}%</b></span>
              </div>
            )}
            {otherRatio > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="text-slate-600">その他 / 持株会: <b className="font-mono">{otherRatio.toFixed(1)}%</b></span>
              </div>
            )}
          </div>
        </div>

        {/* 大株主一覧テーブル */}
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3 w-12 text-center">順位</th>
                <th className="p-3">株主名 / ファンド名</th>
                <th className="p-3">属性区分</th>
                <th className="p-3 text-right">持株比率</th>
                <th className="p-3 w-44">比率バー</th>
                <th className="p-3">役職 / 投資ラウンド備考</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 text-center font-mono font-bold text-slate-500">
                    {s.rank <= 3 ? (
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                        {s.rank}
                      </span>
                    ) : (
                      s.rank
                    )}
                  </td>
                  <td className="p-3 font-extrabold text-slate-900">
                    {s.shareholderName}
                  </td>
                  <td className="p-3">
                    {getTypeBadge(s.shareholderType)}
                  </td>
                  <td className="p-3 text-right font-mono font-bold text-slate-900 text-sm">
                    {s.holdingRatio.toFixed(1)}%
                  </td>
                  <td className="p-3">
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${Math.min(s.holdingRatio * 2, 100)}%` }}
                        className={`h-full rounded-full ${
                          s.shareholderType === 'FOUNDER'
                            ? 'bg-emerald-500'
                            : s.shareholderType === 'VC_FUND'
                            ? 'bg-indigo-500'
                            : 'bg-blue-500'
                        }`}
                      />
                    </div>
                  </td>
                  <td className="p-3 text-slate-600 font-medium">
                    {s.note || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}