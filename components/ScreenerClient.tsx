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
  ShieldCheck,
  ShieldAlert,
  Zap,
  Repeat,
  Award,
  Briefcase,
  SlidersHorizontal,
  ChevronDown,
  Info
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
  avgSalary: number | null; // 平均年間給与 (万円)
  avgAge: number | null; // 平均年齢
  employeesCount: string | null;
  shikihoHeadline: string | null;
  revenue: number | null;
  revenueYoY: number | null; // 売上高成長率 (YoY %)
  operatingIncome: number | null;
  operatingIncomeYoY: number | null; // 営業利益成長率 (YoY %)
  operatingMargin: number | null; // 営業利益率 (%)
  netIncome: number | null;
  dividendPerShare: number | null;
}

interface ScreenerClientProps {
  initialCompanies: CompanyItem[];
}

export type SortField =
  | 'marketCap'
  | 'revenue'
  | 'revenueYoY'
  | 'operatingIncome'
  | 'operatingIncomeYoY'
  | 'operatingMargin'
  | 'avgSalary'
  | 'equityRatio'
  | 'roe'
  | 'dividendYield'
  | 'dividendPerShare'
  | 'netIncome'
  | 'trailingPE'
  | 'priceToBook'
  | 'tickerCode'
  | 'name';

export default function ScreenerClient({ initialCompanies }: ScreenerClientProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMarket, setSelectedMarket] = useState<string>('ALL');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');

  // 就職・転職・財務特化フィルター
  const [minSalary, setMinSalary] = useState<number>(0); // 最低平均年収 (万円)
  const [minGrowth, setMinGrowth] = useState<number>(-100); // 最低売上成長率 (YoY %)
  const [minOpMargin, setMinOpMargin] = useState<number>(0); // 最低営業利益率 (%)
  const [minEquity, setMinEquity] = useState<number>(0); // 最低自己資本比率 (%)
  const [minRoe, setMinRoe] = useState<number>(0);
  const [maxPer, setMaxPer] = useState<number>(100);
  const [maxPbr, setMaxPbr] = useState<number>(10);
  const [minYield, setMinYield] = useState<number>(0);

  // アクティブなプリセット
  const [activePreset, setActivePreset] = useState<string>('all');

  // フィルター詳細開閉
  const [showAdvanced, setShowAdvanced] = useState<boolean>(true);

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

      // 4. 就職・転職・財務健全性指標フィルター
      if (minSalary > 0 && (c.avgSalary ?? 0) < minSalary) return false;
      if (minGrowth > -100 && (c.revenueYoY ?? -999) < minGrowth) return false;
      if (minOpMargin > 0 && (c.operatingMargin ?? 0) < minOpMargin) return false;
      if (minEquity > 0 && (c.equityRatio ?? 0) < minEquity) return false;
      if (minRoe > 0 && (c.roe ?? 0) < minRoe) return false;
      if (maxPer < 100 && (c.trailingPE ?? 999) > maxPer) return false;
      if (maxPbr < 10 && (c.priceToBook ?? 999) > maxPbr) return false;
      if (minYield > 0 && (c.dividendYield ?? 0) < minYield) return false;

      return true;
    });
  }, [
    initialCompanies,
    selectedMarket,
    selectedSector,
    searchQuery,
    minSalary,
    minGrowth,
    minOpMargin,
    minEquity,
    minRoe,
    maxPer,
    maxPbr,
    minYield,
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
    setMinSalary(0);
    setMinGrowth(-100);
    setMinOpMargin(0);
    setMinEquity(0);
    setMinRoe(0);
    setMaxPer(100);
    setMaxPbr(10);
    setMinYield(0);
    setSortField('marketCap');
    setSortAsc(false);
    setActivePreset('all');
    setCurrentPage(1);
  };

  // 🎯 就職・転職・財務特化 プリセット適用
  const applyCareerPreset = (preset: 'fortress' | 'growth' | 'recurring' | 'high_salary' | 'high_margin' | 'dividend' | 'all') => {
    resetFilters();
    setActivePreset(preset);

    if (preset === 'fortress') {
      // 🏰 そんじょそこらの赤字では倒産しない鉄壁企業 (自己資本比率 70%以上)
      setMinEquity(70);
      setSortField('equityRatio');
    } else if (preset === 'growth') {
      // 🚀 高成長企業 (売上YoY +15%以上)
      setMinGrowth(15);
      setMinRoe(10);
      setSortField('revenueYoY');
    } else if (preset === 'recurring') {
      // 🔄 着実ストック・高粗利・継続収益企業 (営業利益率 15%以上 & 自己資本比率 50%以上)
      setMinOpMargin(15);
      setMinEquity(50);
      setSortField('operatingMargin');
    } else if (preset === 'high_salary') {
      // 💰 超高年収・高待遇企業 (平均年収 1,000万円以上)
      setMinSalary(1000);
      setSortField('avgSalary');
    } else if (preset === 'high_margin') {
      // 💎 超高収益・高ROE企業 (営業利益率 20%以上 & ROE 15%以上)
      setMinOpMargin(20);
      setMinRoe(15);
      setSortField('operatingMargin');
    } else if (preset === 'dividend') {
      // 🛡️ 安定配当・財務盤石 (利回り 3.0%以上 & 自己資本比率 50%以上)
      setMinYield(3.0);
      setMinEquity(50);
      setSortField('dividendYield');
    }
  };

  // 時価総額フォーマッター (円単位)
  const formatMarketCap = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '-';
    const isNegative = val < 0;
    const absVal = Math.abs(val);

    if (absVal >= 1000000000000) {
      return `${isNegative ? '-' : ''}¥${(absVal / 1000000000000).toFixed(2)}${isEn ? 'T' : '兆'}`;
    }
    if (absVal >= 100000000) {
      return `${isNegative ? '-' : ''}¥${Math.round(absVal / 100000000).toLocaleString()}${isEn ? 'B' : '億'}`;
    }
    return `${isNegative ? '-' : ''}¥${(absVal / 10000).toFixed(1)}万`;
  };

  // 財務諸表フォーマッター (百万円単位)
  const formatMillion = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '-';
    const isNegative = val < 0;
    const absVal = Math.abs(val);

    const oku = absVal / 100;
    if (oku >= 10000) {
      return `${isNegative ? '-' : ''}¥${(oku / 10000).toFixed(2)}${isEn ? 'T' : '兆'}`;
    }
    if (oku >= 10) {
      return `${isNegative ? '-' : ''}¥${Math.round(oku).toLocaleString()}${isEn ? 'B' : '億'}`;
    }
    if (oku >= 1) {
      return `${isNegative ? '-' : ''}¥${oku.toFixed(1)}${isEn ? 'B' : '億'}`;
    }
    return `${isNegative ? '-' : ''}¥${absVal.toLocaleString()}${isEn ? 'M' : '百万'}`;
  };

  return (
    <div className="space-y-6">
      {/* 🧭 1. ヘッダー ＆ 概要 */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-3xl text-white p-6 sm:p-8 shadow-xl border border-slate-700/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            <span>{isEn ? 'Career & Job-Change Analytics' : '就職＆転職アナリティクス'}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
                <span>{isEn ? 'Career & Job-Change Financial Analytics' : '就職＆転職アナリティクス'}</span>
              </h1>
              <p className="text-sm text-slate-300 max-w-3xl mt-2 leading-relaxed">
                {isEn
                  ? 'Screen and analyze 3,900+ Japanese listed corporations by YoY Growth, Fortress Balance Sheet, Recurring Stock Profitability, and Official Average Salaries.'
                  : '有報・決算短信の公式データに基づき、「高成長企業」「赤字でもびくともしない鉄壁財務」「着実なストック収入」「超高年収」などの切り口で全3,903社を自在にソート・抽出・企業分析できます。'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-indigo-300">
                {sorted.length.toLocaleString()} {isEn ? 'Companies' : '社 該当'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 🎯 2. 就職・転職 ＆ 財務特化 6大クイックプリセットセレクター */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold text-slate-900 tracking-wider uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{isEn ? 'Quick Career & Financial Presets' : '🎯 目的別 クイックソート・スクリーニング'}</span>
          </span>
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-900 font-bold transition px-2.5 py-1 rounded-lg hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{isEn ? 'Reset All' : '条件リセット'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-1">
          <button
            onClick={() => applyCareerPreset('fortress')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
              activePreset === 'fortress'
                ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-indigo-500'
                : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">🏰</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activePreset === 'fortress' ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                自己資本 70%↑
              </span>
            </div>
            <div>
              <div className="font-extrabold text-xs">倒産リスクゼロ</div>
              <div className={`text-[10px] ${activePreset === 'fortress' ? 'text-slate-300' : 'text-slate-500'}`}>赤字耐性・鉄壁財務</div>
            </div>
          </button>

          <button
            onClick={() => applyCareerPreset('growth')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
              activePreset === 'growth'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-300'
                : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">🚀</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activePreset === 'growth' ? 'bg-indigo-800 text-white' : 'bg-indigo-100 text-indigo-700'}`}>
                売上YoY +15%↑
              </span>
            </div>
            <div>
              <div className="font-extrabold text-xs">高成長・急伸</div>
              <div className={`text-[10px] ${activePreset === 'growth' ? 'text-indigo-200' : 'text-slate-500'}`}>売上・利益拡大企業</div>
            </div>
          </button>

          <button
            onClick={() => applyCareerPreset('recurring')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
              activePreset === 'recurring'
                ? 'bg-teal-700 text-white border-teal-700 shadow-md ring-2 ring-teal-300'
                : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">🔄</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activePreset === 'recurring' ? 'bg-teal-900 text-white' : 'bg-teal-100 text-teal-700'}`}>
                営業益率 15%↑
              </span>
            </div>
            <div>
              <div className="font-extrabold text-xs">着実ストック収益</div>
              <div className={`text-[10px] ${activePreset === 'recurring' ? 'text-teal-200' : 'text-slate-500'}`}>高粗利・参入障壁</div>
            </div>
          </button>

          <button
            onClick={() => applyCareerPreset('high_salary')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
              activePreset === 'high_salary'
                ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">💰</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activePreset === 'high_salary' ? 'bg-amber-800 text-white' : 'bg-amber-100 text-amber-800'}`}>
                年収 1,000万↑
              </span>
            </div>
            <div>
              <div className="font-extrabold text-xs">超高年収・好待遇</div>
              <div className={`text-[10px] ${activePreset === 'high_salary' ? 'text-amber-200' : 'text-slate-500'}`}>有報開示 高額給与</div>
            </div>
          </button>

          <button
            onClick={() => applyCareerPreset('high_margin')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
              activePreset === 'high_margin'
                ? 'bg-purple-700 text-white border-purple-700 shadow-md ring-2 ring-purple-300'
                : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">💎</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activePreset === 'high_margin' ? 'bg-purple-900 text-white' : 'bg-purple-100 text-purple-700'}`}>
                営業益率 20%↑
              </span>
            </div>
            <div>
              <div className="font-extrabold text-xs">超高収益・高ROE</div>
              <div className={`text-[10px] ${activePreset === 'high_margin' ? 'text-purple-200' : 'text-slate-500'}`}>資本効率・筋肉質</div>
            </div>
          </button>

          <button
            onClick={() => applyCareerPreset('dividend')}
            className={`p-3 rounded-xl border text-left transition flex flex-col justify-between space-y-1.5 ${
              activePreset === 'dividend'
                ? 'bg-blue-700 text-white border-blue-700 shadow-md ring-2 ring-blue-300'
                : 'bg-slate-50/70 hover:bg-slate-100/90 border-slate-200 text-slate-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-base">🛡️</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${activePreset === 'dividend' ? 'bg-blue-900 text-white' : 'bg-blue-100 text-blue-700'}`}>
                利回り 3.0%↑
              </span>
            </div>
            <div>
              <div className="font-extrabold text-xs">安定配当・還元</div>
              <div className={`text-[10px] ${activePreset === 'dividend' ? 'text-blue-200' : 'text-slate-500'}`}>連続増配・高還元</div>
            </div>
          </button>
        </div>
      </div>

      {/* 🔍 3. 検索バー ＆ 市場・セクター・詳細フィルター */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-5">
        <div className="flex flex-col lg:flex-row items-center gap-3">
          {/* 検索入力 */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={isEn ? 'Search ticker, company name, representative...' : '銘柄コード・社名・代表者名で検索 (例: 8031, トヨタ, キーエンス)...'}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
            />
          </div>

          {/* 市場区分セレクター */}
          <div className="flex items-center gap-1.5 w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0">
            {markets.map((m) => (
              <button
                key={m.id}
                onClick={() => {
                  setSelectedMarket(m.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                  selectedMarket === m.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isEn ? m.enLabel : m.label}
              </button>
            ))}
          </div>

          {/* 業種セクターセレクター */}
          <div className="w-full lg:w-52 shrink-0">
            <select
              value={selectedSector}
              onChange={(e) => {
                setSelectedSector(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-bold text-slate-700"
            >
              {sectors.map((sec) => (
                <option key={sec} value={sec}>
                  {sec === 'ALL' ? (isEn ? 'All 33 Sectors' : '全33業種 (全セクター)') : sec}
                </option>
              ))}
            </select>
          </div>

          {/* 詳細条件トグル */}
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shrink-0"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
            <span>{isEn ? 'Filter Sliders' : '詳細条件'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* 🎛️ 詳細スライダーフィルター領域 */}
        {showAdvanced && (
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* 1. 最低平均年収 */}
            <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-amber-600" />
                  <span>最低 平均年収</span>
                </span>
                <span className="font-mono text-amber-700">{minSalary > 0 ? `${minSalary}万円以上` : '下限なし'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1800"
                step="50"
                value={minSalary}
                onChange={(e) => {
                  setMinSalary(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-amber-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0万</span>
                <span>800万</span>
                <span>1,200万</span>
                <span>1,800万</span>
              </div>
            </div>

            {/* 2. 最低自己資本比率 (倒産耐性) */}
            <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>自己資本比率 (倒産耐性)</span>
                </span>
                <span className="font-mono text-emerald-700">{minEquity > 0 ? `${minEquity}%以上` : '下限なし'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="85"
                step="5"
                value={minEquity}
                onChange={(e) => {
                  setMinEquity(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-emerald-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0%</span>
                <span>40%(普通)</span>
                <span>70%(鉄壁)</span>
                <span>85%</span>
              </div>
            </div>

            {/* 3. 最低売上成長率 (YoY) */}
            <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>売上成長率 (YoY)</span>
                </span>
                <span className="font-mono text-indigo-700">{minGrowth > -100 ? `+${minGrowth}%以上` : '下限なし'}</span>
              </div>
              <input
                type="range"
                min="-100"
                max="50"
                step="5"
                value={minGrowth}
                onChange={(e) => {
                  setMinGrowth(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>全件</span>
                <span>+0%</span>
                <span>+15%(高成長)</span>
                <span>+50%</span>
              </div>
            </div>

            {/* 4. 最低営業利益率 */}
            <div className="space-y-1.5 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/70">
              <div className="flex justify-between text-xs font-bold text-slate-800">
                <span className="flex items-center gap-1.5">
                  <Percent className="w-3.5 h-3.5 text-teal-600" />
                  <span>営業利益率 (収益力)</span>
                </span>
                <span className="font-mono text-teal-700">{minOpMargin > 0 ? `${minOpMargin}%以上` : '下限なし'}</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                step="2"
                value={minOpMargin}
                onChange={(e) => {
                  setMinOpMargin(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-teal-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0%</span>
                <span>10%(優良)</span>
                <span>20%(超高収益)</span>
                <span>40%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 📋 4. スクリーニング結果テーブル */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              {isEn ? 'Screening Results' : 'スクリーニング結果一覧'}
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              ({sorted.length.toLocaleString()} 社)
            </span>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto text-xs text-slate-500">
            <span>表示件数:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold"
            >
              <option value="25">25件</option>
              <option value="50">50件</option>
              <option value="100">100件</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-extrabold select-none">
                <th className="py-3 px-3 w-16">コード</th>
                <th className="py-3 px-3 min-w-[160px]">企業名 / 市場</th>
                
                {/* 💰 平均年収 */}
                <th
                  onClick={() => handleSort('avgSalary')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>平均年収</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'avgSalary' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>

                {/* 🚀 売上成長率 (YoY) */}
                <th
                  onClick={() => handleSort('revenueYoY')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>売上成長 (YoY)</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'revenueYoY' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>

                {/* 🔄 営業利益率 */}
                <th
                  onClick={() => handleSort('operatingMargin')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>営業利益率</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'operatingMargin' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>

                {/* 🏰 自己資本比率 (倒産耐性) */}
                <th
                  onClick={() => handleSort('equityRatio')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>自己資本比率</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'equityRatio' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>

                {/* 時価総額 */}
                <th
                  onClick={() => handleSort('marketCap')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>時価総額</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'marketCap' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>

                {/* 直近 売上高 */}
                <th
                  onClick={() => handleSort('revenue')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap hidden md:table-cell"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>売上高</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'revenue' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>

                {/* ROE */}
                <th
                  onClick={() => handleSort('roe')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap hidden lg:table-cell"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>ROE</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'roe' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>

                {/* 配当利回り */}
                <th
                  onClick={() => handleSort('dividendYield')}
                  className="py-3 px-3 cursor-pointer hover:text-indigo-600 text-right whitespace-nowrap hidden sm:table-cell"
                >
                  <div className="flex items-center justify-end gap-1">
                    <span>利回り</span>
                    <ArrowUpDown className={`w-3 h-3 ${sortField === 'dividendYield' ? 'text-indigo-600' : 'text-slate-300'}`} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {paginatedCompanies.map((c) => {
                const isFortress = (c.equityRatio ?? 0) >= 70;
                const isHighGrowth = (c.revenueYoY ?? 0) >= 15;
                const isHighSalary = (c.avgSalary ?? 0) >= 1000;
                const isHighMargin = (c.operatingMargin ?? 0) >= 15;

                return (
                  <tr key={c.tickerCode} className="hover:bg-indigo-50/30 transition group">
                    {/* コード */}
                    <td className="py-3 px-3 font-mono font-bold text-slate-500">
                      <Link href={`/stocks/${c.tickerCode}`} className="text-indigo-600 hover:underline">
                        {c.tickerCode}
                      </Link>
                    </td>

                    {/* 企業名 / 特徴バッジ */}
                    <td className="py-3 px-3">
                      <div className="space-y-1">
                        <Link
                          href={`/stocks/${c.tickerCode}`}
                          className="font-bold text-slate-900 group-hover:text-indigo-600 transition flex items-center gap-1.5"
                        >
                          <span className="truncate max-w-[180px] sm:max-w-xs">{c.name}</span>
                          <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-indigo-500 transition shrink-0 opacity-0 group-hover:opacity-100" />
                        </Link>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] text-slate-500 font-mono bg-slate-100 px-1.5 py-0.5 rounded">
                            {c.sector}
                          </span>
                          {isFortress && (
                            <span className="text-[9px] font-bold bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">
                              🏰 鉄壁
                            </span>
                          )}
                          {isHighGrowth && (
                            <span className="text-[9px] font-bold bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded border border-indigo-200">
                              🚀 成長
                            </span>
                          )}
                          {isHighSalary && (
                            <span className="text-[9px] font-bold bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200">
                              💰 高年収
                            </span>
                          )}
                          {isHighMargin && (
                            <span className="text-[9px] font-bold bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">
                              🔄 高粗利
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* 平均年収 */}
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      {c.avgSalary ? (
                        <span className={c.avgSalary >= 1000 ? 'text-amber-700 font-black' : 'text-slate-800'}>
                          {c.avgSalary.toLocaleString()} 万円
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* 売上成長率 (YoY) */}
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      {c.revenueYoY !== null && c.revenueYoY !== undefined ? (
                        <span className={c.revenueYoY > 0 ? 'text-indigo-600' : 'text-rose-600'}>
                          {c.revenueYoY > 0 ? `+${c.revenueYoY}%` : `${c.revenueYoY}%`}
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* 営業利益率 */}
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      {c.operatingMargin !== null && c.operatingMargin !== undefined ? (
                        <span className={c.operatingMargin >= 15 ? 'text-teal-700 font-black' : (c.operatingMargin < 0 ? 'text-rose-600' : 'text-slate-800')}>
                          {c.operatingMargin}%
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* 自己資本比率 (倒産耐性) */}
                    <td className="py-3 px-3 text-right font-mono font-bold">
                      {c.equityRatio !== null && c.equityRatio !== undefined ? (
                        <span className={c.equityRatio >= 70 ? 'text-emerald-700 font-black' : (c.equityRatio < 30 ? 'text-amber-600' : 'text-slate-800')}>
                          {c.equityRatio}%
                        </span>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>

                    {/* 時価総額 */}
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                      {formatMarketCap(c.marketCap)}
                    </td>

                    {/* 直近 売上高 */}
                    <td className="py-3 px-3 text-right font-mono text-slate-600 hidden md:table-cell whitespace-nowrap">
                      {formatMillion(c.revenue)}
                    </td>

                    {/* ROE */}
                    <td className="py-3 px-3 text-right font-mono text-slate-700 hidden lg:table-cell">
                      {c.roe ? `${c.roe}%` : '-'}
                    </td>

                    {/* 配当利回り */}
                    <td className="py-3 px-3 text-right font-mono text-slate-700 hidden sm:table-cell">
                      {c.dividendYield ? `${c.dividendYield}%` : '-'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ページネーション */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100 text-xs text-slate-500">
          <div>
            <span>
              全 {sorted.length.toLocaleString()} 件中 {(currentPage - 1) * pageSize + 1} 〜 {Math.min(currentPage * pageSize, sorted.length)} 件を表示
            </span>
          </div>

          <div className="flex items-center gap-1 self-center sm:self-auto">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronsLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 font-mono font-bold text-slate-900 bg-slate-50 rounded-lg border border-slate-200">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronsRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
