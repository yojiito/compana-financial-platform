'use client';

import React from 'react';
import { useLanguage } from '@/lib/language-context';

export default function Footer() {
  const { isEn } = useLanguage();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-200">{isEn ? 'compana' : 'compana (カンパーナ)'}</span>
          <span>- {isEn ? 'Corporate Financial Intelligence Platform (Company × Analysis)' : '企業分析プラットフォーム (Company × Analysis)'}</span>
        </div>
        <div>
          {isEn
            ? 'EDINET / Official Gazette Financial Filings (Companies Act Art. 440) / TDnet Timely Disclosures'
            : 'EDINET / 官報決算公告 (会社法第440条) / 適時開示 データ基盤'}
        </div>
      </div>
    </footer>
  );
}