'use client';

import React from 'react';
import { Users, ShieldCheck, Building2, Lock, CheckCircle2, Info } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';

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
  const { isEn } = useLanguage();
  const sorted = [...shareholders].sort((a, b) => a.rank - b.rank);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'FOUNDER':
        return (
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {isEn ? 'Founder & Management' : '創業者・経営陣'}
          </span>
        );
      case 'VC_FUND':
        return (
          <span className="bg-indigo-50 text-indigo-800 border border-indigo-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {isEn ? 'Institutional VC / PE' : '機関投資家 / VC'}
          </span>
        );
      case 'CORPORATE':
        return (
          <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {isEn ? 'Strategic Corporate Partner' : '事業会社 / 提携先'}
          </span>
        );
      default:
        return (
          <span className="bg-slate-100 text-slate-700 border border-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-full">
            {isEn ? 'Employee Ownership / Group' : '従業員持株会 / 関係者'}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 🛡️ 未上場企業 ファクトチェック原則バナー */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white rounded-2xl p-4 sm:p-5 border border-teal-800/80 shadow-xs space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span className="text-xs font-bold text-teal-300 font-mono">
            {isEn ? 'Official Capital Structure & Disclosed Investor Register' : '公式資本関係 ＆ 公開出資者名簿 (ファクトチェック準拠)'}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {isEn
            ? 'For unlisted companies (Article 440 private corporations), individual share percentages are legally non-public unless disclosed via official press releases or regulatory filings. We strictly prohibit synthetic estimates and display only officially verified corporate partners and investors.'
            : '未上場企業（会社法上の非公開会社）は有価証券報告書のような個別持株比率の法定開示義務がないため、推測や架空の比率・財団の自動生成を100%排除し、公式発表・プレスリリース・出資契約で確認された出資者および資本関係のみを掲載しています。'}
        </p>
      </div>

      {/* 株主・出資者一覧テーブル */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              <span>{isEn ? 'Verified Major Investors & Strategic Partners' : '公認主要出資者 ＆ 資本提携パートナー'}</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEn ? 'Official disclosed strategic shareholders and institutional lead investors' : '公式開示に基づく主要株主・戦略的提携出資者一覧'}
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {sorted.length} {isEn ? 'Disclosed Entities' : '法人の公式出資関係'}
          </span>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <th className="p-3 w-12 text-center">{isEn ? 'No.' : 'No.'}</th>
                <th className="p-3">{isEn ? 'Shareholder / Investor Name' : '株主名 / 出資者名'}</th>
                <th className="p-3">{isEn ? 'Entity Type' : '属性区分'}</th>
                <th className="p-3 text-center">{isEn ? 'Ownership Ratio' : '持株比率ステータス'}</th>
                <th className="p-3">{isEn ? 'Official Note & Transaction Background' : '出資背景 / 公式開示備考'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sorted.map((s, idx) => (
                <tr key={s.id || idx} className="hover:bg-slate-50/80 transition">
                  <td className="p-3 text-center font-mono font-bold text-slate-500">
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                      {s.rank}
                    </span>
                  </td>
                  <td className="p-3 font-black text-slate-900">
                    {s.shareholderName}
                  </td>
                  <td className="p-3">
                    {getTypeBadge(s.shareholderType)}
                  </td>
                  <td className="p-3 text-center">
                    {s.holdingRatio > 0 ? (
                      <span className="font-mono font-bold text-slate-900">{s.holdingRatio.toFixed(1)}%</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        <Lock className="w-3 h-3 text-slate-400" />
                        <span>{isEn ? 'Non-Disclosed' : '非公開 (公式未開示)'}</span>
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-600 font-medium">
                    {s.note || (isEn ? 'Verified official partner' : '公認提携先')}
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
