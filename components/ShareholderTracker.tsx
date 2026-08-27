'use client';

import React from 'react';
import Link from 'next/link';
import { Users, FileText, ArrowUpRight, ArrowDownRight, Minus, AlertCircle, Shield, Briefcase } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName } from '@/lib/company-english-names';

interface Shareholder {
  rank: number;
  periodEnd: string;
  shareholderName: string;
  sharesHeld: number;
  holdingRatio: number;
  changeNote?: string | null;
}

interface LargeHolding {
  docId?: string | null;
  submitDate: string;
  filerName: string;
  holdingRatio: number;
  prevRatio?: number | null;
  ratioChange?: number | null;
  purpose?: string | null;
  jointHolders?: number | null;
}

interface ShareholderTrackerProps {
  shareholders: Shareholder[];
  largeHoldings: LargeHolding[];
}

export default function ShareholderTracker({ shareholders, largeHoldings }: ShareholderTrackerProps) {
  const { isEn, t } = useLanguage();

  return (
    <div className="space-y-8">
      {/* 1. 大株主名簿 (上位10名) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              <span>{isEn ? 'Top 10 Major Shareholders (Annual Securities Report)' : '大株主名簿 (上位10名・有価証券報告書ベース)'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEn ? 'Institutional trust accounts, corporate partners, and founder ownership breakdown' : '信託銀行口（機関投資家まとめ）、創業者、取引先等の保有比率と変動'}
            </p>
          </div>
          {shareholders.length > 0 && (
            <span className="text-xs font-mono font-medium text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
              {isEn ? 'As of:' : '基準日:'} {shareholders[0].periodEnd}
            </span>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <th className="p-3 w-12 text-center">{isEn ? 'Rank' : '順位'}</th>
                <th className="p-3">{isEn ? 'Shareholder Name' : '株主名'}</th>
                <th className="p-3 text-right">{isEn ? 'Shares Held' : '所有株式数'}</th>
                <th className="p-3 text-right">{isEn ? 'Holding Ratio (%)' : '持株比率 (%)'}</th>
                <th className="p-3">{isEn ? 'Notes / Change' : '変動・備考'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {shareholders.map((s) => {
                const displayName = getCompanyName('', s.shareholderName, isEn);

                return (
                  <tr key={s.rank} className="hover:bg-slate-50/80 transition">
                    <td className="p-3 text-center font-bold">
                      <span className="inline-block w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] leading-5">
                        {s.rank}
                      </span>
                    </td>
                    <td className="p-3 font-sans font-medium text-slate-900">
                      {displayName}
                    </td>
                    <td className="p-3 text-right">
                      {s.sharesHeld.toLocaleString()} {isEn ? 'shares' : '株'}
                    </td>
                    <td className="p-3 text-right font-bold text-emerald-600">
                      {s.holdingRatio.toFixed(2)}%
                    </td>
                    <td className="p-3 font-sans text-slate-500">
                      {s.changeNote || '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 2. 大量保有報告書 (5%ルール速報) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-indigo-600" />
              <span>{isEn ? '5% Rule Major Holdings Reports (EDINET Filings)' : '大量保有報告書 (5%ルール・提出速報)'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEn ? 'Real-time filings by institutional investors, activist funds, and corporate allies' : '機関投資家・アクティビストファンド・系列企業による5%超保有および変動届出'}
            </p>
          </div>
        </div>

        {largeHoldings.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            {isEn ? 'No recent 5% rule reports filed.' : '直近の大量保有報告書の提出履歴はありません。'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">{isEn ? 'Submit Date' : '提出日'}</th>
                  <th className="p-3">{isEn ? 'Filer / Investor Name' : '提出者 (保有者名)'}</th>
                  <th className="p-3 text-right">{isEn ? 'Holding Ratio (%)' : '保有比率 (%)'}</th>
                  <th className="p-3 text-right">{isEn ? 'Ratio Change' : '増減比率'}</th>
                  <th className="p-3">{isEn ? 'Purpose of Holding' : '保有目的'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
                {largeHoldings.map((h, idx) => {
                  const displayFiler = getCompanyName('', h.filerName, isEn);
                  const isUp = (h.ratioChange ?? 0) > 0;
                  const isDown = (h.ratioChange ?? 0) < 0;

                  return (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="p-3 text-slate-500">{h.submitDate}</td>
                      <td className="p-3 font-sans font-bold text-slate-900">
                        {displayFiler}
                        {h.jointHolders ? (
                          <span className="text-[10px] font-normal text-slate-400 ml-1">
                            {isEn ? `(${h.jointHolders} joint filers)` : `(共同保有 ${h.jointHolders}名)`}
                          </span>
                        ) : null}
                      </td>
                      <td className="p-3 text-right font-black text-indigo-700 text-sm">
                        {h.holdingRatio.toFixed(2)}%
                      </td>
                      <td className="p-3 text-right">
                        {h.ratioChange !== null && h.ratioChange !== undefined ? (
                          <span
                            className={`inline-flex items-center gap-0.5 font-bold ${
                              isUp
                                ? 'text-emerald-600'
                                : isDown
                                ? 'text-rose-600'
                                : 'text-slate-500'
                            }`}
                          >
                            {isUp ? (
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            ) : isDown ? (
                              <ArrowDownRight className="w-3.5 h-3.5" />
                            ) : (
                              <Minus className="w-3.5 h-3.5" />
                            )}
                            {isUp ? '+' : ''}
                            {h.ratioChange.toFixed(2)}%
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="p-3 font-sans text-slate-600 max-w-xs truncate">
                        {h.purpose || (isEn ? 'Pure Investment' : '純投資')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}