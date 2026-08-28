'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Filter,
  ArrowUpDown,
  ArrowRight,
  RotateCcw,
  Building2,
  Check,
  Sparkles,
  Compass,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  BarChart3,
  Layers,
  Flame,
  Scale,
  DollarSign,
  TrendingUp,
  Percent,
  Coins,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName, getSectorName } from '@/lib/company-english-names';

export interface CompanyItem {
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
  revenue: number | null;
  operatingIncome: number | null;
  operatingMargin: number | null;
  netIncome: number | null;
  dividendPerShare: number | null;
}

interface ScreenerClientProps {
  initialCompanies: CompanyItem[];
}

export type SortField =
  | 'marketCap'
  | 'revenue'
  | 'operatingIncome'
  | 'operatingMargin'
  | 'netIncome'
  | 'dividendYield'
  | 'dividendPerShare'
  | 'equityRatio'
  | 'roe'
  | 'trailingPE'
  | 'priceToBook'
  | 'tickerCode'
  | 'name';

export default function ScreenerClient({ initialCompanies }: ScreenerClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  // スライダーフィルター
  const [minRoe, setMinRoe] = useState<number>(0);
  const [maxPer, setMaxPer] = useState<number>(100);
  const [maxPbr, setMaxPbr] = useState<number>(10);
  const [minYield, setMinYield] = useState<number>(0);
  const [minEquity, setMinEquity] = useState<number>(0);

  // ソート
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortAsc, setSortAsc] = useState<boolean>(false);

  // ページネーション
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(50);

  const { isEn, t } = useLanguage();

  // 市場区分リスト
  const markets = [
    { id: 'ALL', label: '全市場 (総合)', enLabel: 'All TSE Markets' },
    { id: 'プライム', label: '東証プライム', enLabel: 'TSE Prime' },
    { id: 'スタンダード', label: '東証スタンダード', enLabel: 'TSE Standard' },
    { id: 'グロース', label: '東証グロース', enLabel: 'TSE Growth' },
    { id: 'TOKYO PRO Market', label: 'TOKYO PRO Market', enLabel: 'TOKYO PRO Market' },
  ];

  // 全セクターリスト抽出
  const sectors = useMemo(() => {
    const set = new Set(initialCompanies.map((c) => c.sector).filter(Boolean));
    return ['ALL', ...Array.from(set).sort()];
  }, [initialCompanies]);

  // フィルタリング処理
  const filtered = useMemo(() => {
    return initialCompanies.filter((c) => {
      // 1. 市場フィルター
      if (selectedMarket !== 'ALL') {
        if (!c.market || !c.market.includes(selectedMarket)) return false;
      }

      // 2. 業種セクターフィルター
      if (selectedSector !== 'ALL' && c.sector !== selectedSector) return false;

      // 3. 検索クエリ
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const codeMatch = c.tickerCode.toLowerCase().includes(q);
        const nameMatch = c.name.toLowerCase().includes(q);
        const shortNameMatch = c.shortName ? c.shortName.toLowerCase().includes(q) : false;
        if (!codeMatch && !nameMatch && !shortNameMatch) return false;
      }

      // 4. 指標フィルター
      if (minRoe > 0 && (c.roe ?? 0) < minRoe) return false;
      if (maxPer < 100 && (c.trailingPE ?? 999) > maxPer) return false;
      if (maxPbr < 10 && (c.priceToBook ?? 999) > maxPbr) return false;
      if (minYield > 0 && (c.dividendYield ?? 0) < minYield) return false;
      if (minEquity > 0 && (c.equityRatio ?? 0) < minEquity) return false;

      return true;
    });
  }, [
    initialCompanies,
    selectedMarket,
    selectedSector,
    searchQuery,
    minRoe,
    maxPer,
    maxPbr,
    minYield,
    minEquity,
  ]);

  // ソート処理
  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortField === 'tickerCode') {
        return sortAsc ? a.tickerCode.localeCompare(b.tickerCode) : b.tickerCode.localeCompare(a.tickerCode);
      }
      if (sortField === 'name') {
        return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }

      const valA = (a[sortField] as number) ?? (sortAsc ? 999999999999 : -999999999999);
      const valB = (b[sortField] as number) ?? (sortAsc ? 999999999999 : -999999999999);
      return sortAsc ? valA - valB : valB - valA;
    });
  }, [filtered, sortField, sortAsc]);

  // ページネーション計算
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sorted.slice(start, start + pageSize);
  }, [sorted, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false); // デフォルトは降順（大きい順）
    }
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedMarket('ALL');
    setSelectedSector('ALL');
    setMinRoe(0);
    setMaxPer(100);
    setMaxPbr(10);
    setMinYield(0);
    setMinEquity(0);
    setSortField('marketCap');
    setSortAsc(false);
    setCurrentPage(1);
  };

  const applyPreset = (preset: 'value' | 'growth' | 'dividend' | 'compass' | 'large_cap') => {
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
      setSortField('dividendYield');
    } else if (preset === 'large_cap') {
      setSelectedMarket('プライム');
      setSortField('marketCap');
    }
  };

  // 金額フォーマッター
  const formatAmount = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '-';
    const isNegative = val < 0;
    const absVal = Math.abs(val);

    // 1兆円以上
    if (absVal >= 1000000000000) {
      return `${isNegative ? '-' : ''}¥${(absVal / 1000000000000).toFixed(2)}${isEn ? 'T' : '兆'}`;
    }
    // 1億円以上 (百万単位で入っている場合は100で割る)
    if (absVal >= 100000000) {
      return `${isNegative ? '-' : ''}¥${Math.round(absVal / 100000000).toLocaleString()}${isEn ? 'B' : '億'}`;
    }
    if (absVal >= 100) {
      return `${isNegative ? '-' : ''}¥${(absVal / 100).toFixed(1)}${isEn ? 'B' : '億'}`;
    }
    return `${isNegative ? '-' : ''}¥${absVal.toLocaleString()}${isEn ? 'M' : '百万'}`;
  };

  return (
    <div className="space-y-6">
      {/* 1. 市場区分クイック切り替えタブ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 pl-2 pr-1 flex items-center gap-1 shrink-0">
            <Building2 className="w-3.5 h-3.5" />
            {isEn ? 'Market:' : '市場:'}
          </span>
          {markets.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedMarket(m.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedMarket === m.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isEn ? m.enLabel : m.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. 厳選プリセットボタン */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="font-bold text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          {isEn ? 'Curated Presets:' : 'compana 厳選プリセット:'}
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
          onClick={() => applyPreset('large_cap')}
          className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 font-semibold transition"
        >
          {isEn ? '🏢 Prime Mega Caps' : '🏢 プライム大型主力株'}
        </button>
        <button
          onClick={resetFilters}
          className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-medium transition flex items-center gap-1"
        >
          <RotateCcw className="w-3 h-3" /> {isEn ? 'Reset All' : 'リセット'}
        </button>
      </div>

      {/* 3. 検索・業種・多軸ソート・スライダーパネル */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        {/* 検索バー ＆ 業種セクター ＆ ソート選択 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 社名・コード検索 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              {isEn ? 'Search Name / Code' : '社名・銘柄コード検索'}
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={isEn ? 'e.g. 7203, Toyota, Nintendo...' : '例: 7203, トヨタ, 任天堂...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 東証33業種セクター */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              {isEn ? 'TSE 33 Sectors' : '東証33業種セクター'}
            </label>
            <select
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s === 'ALL' ? (isEn ? 'All 33 Sectors' : '東証全33業種') : getSectorName(s, isEn)}
                </option>
              ))}
            </select>
          </div>

          {/* ソート項目選択 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              {isEn ? 'Sort Metric' : '並び替え指標'}
            </label>
            <select
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value as SortField);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="marketCap">{isEn ? 'Market Cap (Size)' : '時価総額（規模順）'}</option>
              <option value="revenue">{isEn ? 'Revenue (Sales)' : '売上高（売上規模順）'}</option>
              <option value="operatingIncome">{isEn ? 'Operating Income' : '営業利益（本業収益順）'}</option>
              <option value="operatingMargin">{isEn ? 'Operating Margin (%)' : '営業利益率（高収益順）'}</option>
              <option value="netIncome">{isEn ? 'Net Income' : '当期純利益（最終益順）'}</option>
              <option value="dividendYield">{isEn ? 'Dividend Yield (%)' : '配当利回り（インカム順）'}</option>
              <option value="roe">{isEn ? 'ROE (%)' : 'ROE（自己資本利益率順）'}</option>
              <option value="equityRatio">{isEn ? 'Equity Ratio (%)' : '自己資本比率（財務健全順）'}</option>
              <option value="trailingPE">{isEn ? 'PER (P/E)' : 'PER（株価収益率）'}</option>
              <option value="priceToBook">{isEn ? 'PBR (P/B)' : 'PBR（純資産倍率）'}</option>
              <option value="tickerCode">{isEn ? 'Ticker Code' : '証券コード順'}</option>
              <option value="name">{isEn ? 'Company Name' : '企業名順'}</option>
            </select>
          </div>

          {/* 昇順 / 降順 */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              {isEn ? 'Sort Order' : '順序'}
            </label>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortAsc(false)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  !sortAsc ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isEn ? 'High to Low (Desc)' : '降順 (大きい順)'}
              </button>
              <button
                onClick={() => setSortAsc(true)}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                  sortAsc ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isEn ? 'Low to High (Asc)' : '昇順 (小さい順)'}
              </button>
            </div>
          </div>
        </div>

        {/* スライダー指標フィルター */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 pt-4 border-t border-slate-100">
          {/* ROE */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{isEn ? 'Min ROE' : 'ROE'}</span>
              <span className="font-mono text-teal-600">{minRoe > 0 ? `${minRoe}% ${isEn ? 'or more' : '以上'}` : (isEn ? 'Any' : '指定なし')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              step="1"
              value={minRoe}
              onChange={(e) => {
                setMinRoe(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-teal-600"
            />
          </div>

          {/* PER */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{isEn ? 'Max P/E' : 'PER'}</span>
              <span className="font-mono text-teal-600">{maxPer < 100 ? `${maxPer}x ${isEn ? 'or less' : '以下'}` : (isEn ? 'Any' : '指定なし')}</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={maxPer}
              onChange={(e) => {
                setMaxPer(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-teal-600"
            />
          </div>

          {/* PBR */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{isEn ? 'Max P/B' : 'PBR'}</span>
              <span className="font-mono text-teal-600">{maxPbr < 10 ? `${maxPbr}x ${isEn ? 'or less' : '以下'}` : (isEn ? 'Any' : '指定なし')}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="10"
              step="0.5"
              value={maxPbr}
              onChange={(e) => {
                setMaxPbr(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-teal-600"
            />
          </div>

          {/* 配当利回り */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{isEn ? 'Min Yield' : '配当利回り'}</span>
              <span className="font-mono text-teal-600">{minYield > 0 ? `${minYield}% ${isEn ? 'or more' : '以上'}` : (isEn ? 'Any' : '指定なし')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={minYield}
              onChange={(e) => {
                setMinYield(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-teal-600"
            />
          </div>

          {/* 自己資本比率 */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>{isEn ? 'Min Equity' : '自己資本比率'}</span>
              <span className="font-mono text-teal-600">{minEquity > 0 ? `${minEquity}% ${isEn ? 'or more' : '以上'}` : (isEn ? 'Any' : '指定なし')}</span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="5"
              value={minEquity}
              onChange={(e) => {
                setMinEquity(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-teal-600"
            />
          </div>
        </div>
      </div>

      {/* 4. 結果ヘッダー ＆ 表示件数セレクター */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="text-xs font-bold text-slate-700">
          {isEn ? (
            <>
              Matched:{' '}
              <span className="text-teal-600 font-mono text-base font-black">
                {sorted.length.toLocaleString()}
              </span>{' '}
              / {initialCompanies.length.toLocaleString()} companies
            </>
          ) : (
            <>
              該当件数:{' '}
              <span className="text-teal-600 font-mono text-base font-black">
                {sorted.length.toLocaleString()}
              </span>{' '}
              社 （全 {initialCompanies.length.toLocaleString()} 社中）
            </>
          )}
        </div>

        {/* 1ページ件数 */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">{isEn ? 'Show:' : '表示件数:'}</span>
          {[25, 50, 100].map((sz) => (
            <button
              key={sz}
              onClick={() => {
                setPageSize(sz);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded-lg font-bold transition ${
                pageSize === sz
                  ? 'bg-teal-700 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>
      </div>

      {/* 5. スクリーニング結果テーブル */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold select-none">
                <th onClick={() => handleSort('tickerCode')} className="p-3.5 cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <span>{isEn ? 'Code' : 'コード'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="p-3.5 cursor-pointer hover:bg-slate-100 transition min-w-[160px]">
                  <div className="flex items-center gap-1">
                    <span>{isEn ? 'Company Name' : '企業名'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-3.5 whitespace-nowrap">{isEn ? 'Market' : '市場'}</th>
                <th className="p-3.5 whitespace-nowrap">{isEn ? 'Sector' : '業種'}</th>
                <th onClick={() => handleSort('marketCap')} className="p-3.5 text-right cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <span>{isEn ? 'Market Cap' : '時価総額'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('revenue')} className="p-3.5 text-right cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <span>{isEn ? 'Revenue' : '売上高'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('operatingIncome')} className="p-3.5 text-right cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <span>{isEn ? 'Op. Income' : '営業利益'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('operatingMargin')} className="p-3.5 text-right cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <span>{isEn ? 'Margin' : '営業利益率'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('dividendYield')} className="p-3.5 text-right cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <span>{isEn ? 'Yield' : '配当利回り'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('roe')} className="p-3.5 text-right cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <span>{isEn ? 'ROE' : 'ROE'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th onClick={() => handleSort('equityRatio')} className="p-3.5 text-right cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <span>{isEn ? 'Equity Ratio' : '自己資本比率'}</span>
                    <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  </div>
                </th>
                <th className="p-3.5 text-center whitespace-nowrap">{isEn ? 'Card' : 'カルテ'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {paginatedCompanies.map((c) => {
                const displayName = getCompanyName(c.tickerCode, c.name, isEn);
                const displaySector = getSectorName(c.sector, isEn);

                return (
                  <tr key={c.tickerCode} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 font-bold text-slate-900">{c.tickerCode}</td>
                    <td className="p-3.5 font-sans font-bold text-slate-900">
                      <Link
                        href={`/stocks/${c.tickerCode}`}
                        className="hover:text-teal-600 transition block truncate max-w-[220px]"
                        title={displayName}
                      >
                        {displayName}
                      </Link>
                    </td>
                    <td className="p-3.5 font-sans text-[11px] text-slate-600 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200">
                        {c.market || '-'}
                      </span>
                    </td>
                    <td className="p-3.5 font-sans text-[11px] text-slate-500 whitespace-nowrap">
                      {displaySector}
                    </td>
                    <td className="p-3.5 text-right font-bold text-slate-900">
                      {formatAmount(c.marketCap)}
                    </td>
                    <td className="p-3.5 text-right text-slate-700">
                      {formatAmount(c.revenue)}
                    </td>
                    <td className="p-3.5 text-right font-bold text-emerald-600">
                      {formatAmount(c.operatingIncome)}
                    </td>
                    <td className="p-3.5 text-right font-bold text-teal-600">
                      {c.operatingMargin !== null ? `${c.operatingMargin}%` : '-'}
                    </td>
                    <td className="p-3.5 text-right text-amber-600 font-bold">
                      {c.dividendYield !== null ? `${c.dividendYield}%` : '-'}
                    </td>
                    <td className="p-3.5 text-right text-indigo-600 font-bold">
                      {c.roe !== null ? `${c.roe}%` : '-'}
                    </td>
                    <td className="p-3.5 text-right text-slate-600">
                      {c.equityRatio !== null ? `${c.equityRatio}%` : '-'}
                    </td>
                    <td className="p-3.5 text-center">
                      <Link
                        href={`/stocks/${c.tickerCode}`}
                        className="inline-flex items-center gap-0.5 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-sans font-bold hover:bg-teal-600 transition shadow-xs"
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

        {/* 6. ページネーションコントロール */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-slate-500">
            {isEn ? (
              <>
                Showing page <span className="font-bold font-mono text-slate-800">{currentPage}</span> of{' '}
                <span className="font-bold font-mono text-slate-800">{totalPages}</span> (
                {sorted.length.toLocaleString()} total)
              </>
            ) : (
              <>
                全 <span className="font-bold font-mono text-slate-800">{sorted.length.toLocaleString()}</span> 件中{' '}
                <span className="font-bold font-mono text-slate-800">
                  {Math.min((currentPage - 1) * pageSize + 1, sorted.length)} -{' '}
                  {Math.min(currentPage * pageSize, sorted.length)}
                </span>{' '}
                件を表示中 （{currentPage} / {totalPages} ページ）
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition"
              title={isEn ? 'First Page' : '最初のページ'}
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition"
              title={isEn ? 'Previous Page' : '前のページ'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* ページ番号ボタン */}
            <div className="flex items-center gap-1 px-2 font-mono font-bold text-slate-700">
              <span>{currentPage}</span>
              <span className="text-slate-400 font-normal">/</span>
              <span>{totalPages}</span>
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition"
              title={isEn ? 'Next Page' : '次のページ'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 disabled:opacity-30 hover:bg-slate-100 transition"
              title={isEn ? 'Last Page' : '最後のページ'}
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
