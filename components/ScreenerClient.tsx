'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Filter, ArrowUpDown, ArrowRight, RotateCcw, Building2, Check, Sparkles, Compass } from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName, getSectorName } from '@/lib/company-english-names';

interface CompanyItem {
  tickerCode: string;
  name: string;
  shortName: string;
  sector: string;
  market: string;
  currentPrice: number | null;
  priceChangePct: number | null;
  marketCap: number | null;
  trailingPE: number | null;
  priceToBook: number | null;
  roe: number | null;
  dividendYield: number | null;
  equityRatio: number | null;
}

interface ScreenerClientProps {
  initialCompanies: CompanyItem[];
}

export default function ScreenerClient({ initialCompanies }: ScreenerClientProps) {
  const [minRoe, setMinRoe] = useState<number>(0);
  const [maxPer, setMaxPer] = useState<number>(100);
  const [maxPbr, setMaxPbr] = useState<number>(10);
  const [minYield, setMinYield] = useState<number>(0);
  const [minEquity, setMinEquity] = useState<number>(0);
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [sortField, setSortField] = useState<keyof CompanyItem>('marketCap');
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const { isEn, t } = useLanguage();

  const sectors = useMemo(() => {
    const set = new Set(initialCompanies.map((c) => c.sector));
    return ['ALL', ...Array.from(set)];
  }, [initialCompanies]);

  const filtered = useMemo(() => {
    return initialCompanies
      .filter((c) => {
        if (selectedSector !== 'ALL' && c.sector !== selectedSector) return false;
        if (minRoe > 0 && (c.roe ?? 0) < minRoe) return false;
        if (maxPer < 100 && (c.trailingPE ?? 999) > maxPer) return false;
        if (maxPbr < 10 && (c.priceToBook ?? 999) > maxPbr) return false;
        if (minYield > 0 && (c.dividendYield ?? 0) < minYield) return false;
        if (minEquity > 0 && (c.equityRatio ?? 0) < minEquity) return false;
        return true;
      })
      .sort((a, b) => {
        const valA = (a[sortField] as number) ?? (sortAsc ? 9999999 : -9999999);
        const valB = (b[sortField] as number) ?? (sortAsc ? 9999999 : -9999999);
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [initialCompanies, minRoe, maxPer, maxPbr, minYield, minEquity, selectedSector, sortField, sortAsc]);

  const resetFilters = () => {
    setMinRoe(0);
    setMaxPer(100);
    setMaxPbr(10);
    setMinYield(0);
    setMinEquity(0);
    setSelectedSector('ALL');
  };

  const applyPreset = (preset: 'value' | 'growth' | 'dividend' | 'compass') => {
    resetFilters();
    if (preset === 'compass') {
      setMinRoe(10);
      setMinEquity(40);
      setMaxPer(25);
    } else if (preset === 'value') {
      setMaxPbr(1.0);
      setMaxPer(15);
      setMinEquity(50);
    } else if (preset === 'growth') {
      setMinRoe(12);
    } else if (preset === 'dividend') {
      setMinYield(3.0);
      setMinEquity(40);
    }
  };

  return (
    <div className="space-y-6">
      {/* プリセットボタン */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          {isEn ? 'compana Curated Presets:' : 'compana 厳選プリセット:'}
        </span>
        <button
          onClick={() => applyPreset('compass')}
          className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 font-semibold transition flex items-center gap-1"
        >
          <Compass className="w-3.5 h-3.5 text-teal-600" />
          {isEn ? 'Quality Blue-Chips (ROE>10% & Equity>40%)' : 'クオリティ優良株 (ROE>10% & 自己資本>40%)'}
        </button>
        <button
          onClick={() => applyPreset('value')}
          className="px-3 py-1.5 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200 hover:bg-cyan-100 font-semibold transition"
        >
          {isEn ? '💎 Deep Value (PBR<1.0x & PER<15x)' : '💎 ディープバリュー (PBR<1倍 & PER<15倍)'}
        </button>
        <button
          onClick={() => applyPreset('dividend')}
          className="px-3 py-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 font-semibold transition"
        >
          {isEn ? '💰 High Dividend Yield (Yield>3% & Equity>40%)' : '💰 高配当利回り (配当>3% & 自己資本>40%)'}
        </button>
        <button
          onClick={resetFilters}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium transition flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> {isEn ? 'Reset' : 'リセット'}
        </button>
      </div>

      {/* スクリーニング条件スライダーパネル */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* ROE */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{isEn ? 'Min ROE (Return on Equity)' : 'ROE (自己資本利益率)'}</span>
            <span className="font-mono text-teal-600">{minRoe > 0 ? `${minRoe}% ${isEn ? 'or more' : '以上'}` : (isEn ? 'Any' : '指定なし')}</span>
          </div>
          <input
            type="range"
            min="0"
            max="25"
            step="1"
            value={minRoe}
            onChange={(e) => setMinRoe(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
        </div>

        {/* PER */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{isEn ? 'Max P/E (PER)' : 'PER (株価収益率)'}</span>
            <span className="font-mono text-teal-600">{maxPer < 100 ? `${maxPer}x ${isEn ? 'or less' : '以下'}` : (isEn ? 'Any' : '指定なし')}</span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={maxPer}
            onChange={(e) => setMaxPer(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
        </div>

        {/* PBR */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{isEn ? 'Max P/B (PBR)' : 'PBR (純資産倍率)'}</span>
            <span className="font-mono text-teal-600">{maxPbr < 10 ? `${maxPbr}x ${isEn ? 'or less' : '以下'}` : (isEn ? 'Any' : '指定なし')}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={maxPbr}
            onChange={(e) => setMaxPbr(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
        </div>

        {/* 配当利回り */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{isEn ? 'Min Dividend Yield' : '配当利回り'}</span>
            <span className="font-mono text-teal-600">{minYield > 0 ? `${minYield}% ${isEn ? 'or more' : '以上'}` : (isEn ? 'Any' : '指定なし')}</span>
          </div>
          <input
            type="range"
            min="0"
            max="8"
            step="0.5"
            value={minYield}
            onChange={(e) => setMinYield(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
        </div>

        {/* 自己資本比率 */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{isEn ? 'Min Equity Ratio' : '自己資本比率'}</span>
            <span className="font-mono text-teal-600">{minEquity > 0 ? `${minEquity}% ${isEn ? 'or more' : '以上'}` : (isEn ? 'Any' : '指定なし')}</span>
          </div>
          <input
            type="range"
            min="0"
            max="80"
            step="5"
            value={minEquity}
            onChange={(e) => setMinEquity(Number(e.target.value))}
            className="w-full accent-teal-600"
          />
        </div>

        {/* 業種セクター */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-slate-700">
            <span>{isEn ? 'Sector Filter' : '業種セクター'}</span>
          </div>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-xs font-medium text-slate-900 focus:outline-none"
          >
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s === 'ALL' ? (isEn ? 'All Sectors' : '全業種') : getSectorName(s, isEn)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 結果ヘッダー */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-bold text-slate-600">
          {isEn ? (
            <>Matched: <span className="text-teal-600 font-mono text-sm font-black">{filtered.length}</span> companies</>
          ) : (
            <>ヒット件数: <span className="text-teal-600 font-mono text-sm font-black">{filtered.length}</span> 社</>
          )}
        </div>
      </div>

      {/* スクリーニング結果テーブル */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
                <th className="p-3.5">{isEn ? 'Code' : 'コード'}</th>
                <th className="p-3.5">{isEn ? 'Company Name' : '企業名'}</th>
                <th className="p-3.5">{isEn ? 'Sector' : '業種'}</th>
                <th className="p-3.5 text-right">{isEn ? 'Live Price' : '株価'}</th>
                <th className="p-3.5 text-right">{isEn ? 'Market Cap' : '時価総額'}</th>
                <th className="p-3.5 text-right">{isEn ? 'P/E' : 'PER'}</th>
                <th className="p-3.5 text-right">{isEn ? 'P/B' : 'PBR'}</th>
                <th className="p-3.5 text-right">{isEn ? 'ROE' : 'ROE'}</th>
                <th className="p-3.5 text-right">{isEn ? 'Yield' : '配当利回り'}</th>
                <th className="p-3.5 text-right">{isEn ? 'Equity Ratio' : '自己資本比率'}</th>
                <th className="p-3.5 text-center">{isEn ? 'Card' : '詳細'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {filtered.map((c) => {
                const displayName = getCompanyName(c.tickerCode, c.name, isEn);
                const displaySector = getSectorName(c.sector, isEn);

                return (
                  <tr key={c.tickerCode} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 font-bold text-slate-900">{c.tickerCode}</td>
                    <td className="p-3.5 font-sans font-bold text-slate-900">{displayName}</td>
                    <td className="p-3.5 font-sans text-slate-500">{displaySector}</td>
                    <td className="p-3.5 text-right font-bold">
                      {c.currentPrice ? `¥${c.currentPrice.toLocaleString()}` : '-'}
                    </td>
                    <td className="p-3.5 text-right">
                      {c.marketCap ? (isEn ? `¥${(c.marketCap / 1000000000000).toFixed(2)}T` : `¥${(c.marketCap / 1000000000000).toFixed(2)}兆`) : '-'}
                    </td>
                    <td className="p-3.5 text-right">{c.trailingPE ? `${c.trailingPE}x` : '-'}</td>
                    <td className="p-3.5 text-right">{c.priceToBook ? `${c.priceToBook}x` : '-'}</td>
                    <td className="p-3.5 text-right font-bold text-teal-600">{c.roe ? `${c.roe}%` : '-'}</td>
                    <td className="p-3.5 text-right text-emerald-600">{c.dividendYield ? `${c.dividendYield}%` : '-'}</td>
                    <td className="p-3.5 text-right">{c.equityRatio ? `${c.equityRatio}%` : '-'}</td>
                    <td className="p-3.5 text-center">
                      <Link
                        href={`/stocks/${c.tickerCode}`}
                        className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded bg-slate-900 text-white text-[11px] font-sans font-bold hover:bg-teal-600 transition"
                      >
                        <span>{isEn ? 'View' : 'カルテ'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}