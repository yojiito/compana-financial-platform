'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  AlertOctagon,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Scale,
  ShieldCheck,
  Building,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName, getSectorName } from '@/lib/company-english-names';

export interface GazetteFeedItem {
  id: number;
  fiscalPeriod: number;
  periodEnd: string;
  gazetteDate: string;
  gazetteIssue?: string | null;
  totalAssets: number;
  currentAssets?: number | null;
  fixedAssets?: number | null;
  totalLiabilities?: number | null;
  currentLiabilities?: number | null;
  fixedLiabilities?: number | null;
  netAssets: number;
  capitalStock: number;
  capitalSurplus?: number | null;
  retainedEarnings: number;
  netIncome: number;
  company: {
    id: string;
    slug: string;
    name: string;
    shortName: string;
    industry: string;
    isStartup: boolean;
    establishedYear?: number | null;
    representative?: string | null;
    location?: string | null;
  };
}

interface GazetteTimelineFeedProps {
  initialReports: GazetteFeedItem[];
}

export default function GazetteTimelineFeed({ initialReports }: GazetteTimelineFeedProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [profitFilter, setProfitFilter] = useState<'all' | 'profit' | 'loss' | 'insolvent'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'startup' | 'enterprise'>('all');
  const [sortBy, setSortBy] = useState<'date_desc' | 'profit_desc' | 'net_assets_desc' | 'total_assets_desc'>('date_desc');
  const [expandedBsId, setExpandedBsId] = useState<number | null>(null);
  const { isEn, t } = useLanguage();

  const formatAmount = (val: number) => {
    const oku = val / 100;
    if (Math.abs(oku) >= 10000) {
      return isEn ? `¥${(oku / 10000).toFixed(2)}T` : `¥${(oku / 10000).toFixed(2)} 兆円`;
    }
    if (Math.abs(val) >= 100) {
      return isEn ? `¥${oku.toFixed(1)}B` : `¥${oku.toFixed(1)} 億円`;
    }
    return isEn ? `¥${val.toLocaleString()}M` : `${val.toLocaleString()} 百万円`;
  };

  const filteredReports = useMemo(() => {
    return initialReports
      .filter((r) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const nameMatch = r.company.name.toLowerCase().includes(q) || r.company.shortName.toLowerCase().includes(q);
          const industryMatch = r.company.industry.toLowerCase().includes(q);
          const repMatch = (r.company.representative || '').toLowerCase().includes(q);
          if (!nameMatch && !industryMatch && !repMatch) return false;
        }

        if (profitFilter === 'profit' && r.netIncome < 0) return false;
        if (profitFilter === 'loss' && r.netIncome >= 0) return false;
        if (profitFilter === 'insolvent' && r.netAssets >= 0) return false;

        if (typeFilter === 'startup' && !r.company.isStartup) return false;
        if (typeFilter === 'enterprise' && r.company.isStartup) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'date_desc') {
          return new Date(b.gazetteDate).getTime() - new Date(a.gazetteDate).getTime();
        }
        if (sortBy === 'profit_desc') {
          return b.netIncome - a.netIncome;
        }
        if (sortBy === 'net_assets_desc') {
          return b.netAssets - a.netAssets;
        }
        if (sortBy === 'total_assets_desc') {
          return b.totalAssets - a.totalAssets;
        }
        return 0;
      });
  }, [initialReports, searchQuery, profitFilter, typeFilter, sortBy]);

  const groupedByDate = useMemo(() => {
    const groups: { [date: string]: GazetteFeedItem[] } = {};
    filteredReports.forEach((report) => {
      const dateKey = report.gazetteDate;
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(report);
    });
    return groups;
  }, [filteredReports]);

  const toggleBs = (id: number) => {
    setExpandedBsId(expandedBsId === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* 検索 ＆ フィルターバー */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        {/* 検索入力 */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={isEn ? 'Search by company, sector, representative...' : '企業名・業種・代表者名で検索 (例: SmartHR, LayerX, AI, 医療)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 focus:bg-white text-sm text-slate-900 placeholder-slate-400 rounded-xl pl-10 pr-4 py-2.5 border border-slate-200 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition shadow-xs"
          />
        </div>

        {/* フィルタータグ ＆ ソートセレクター */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-slate-400 font-semibold mr-1">{isEn ? 'Profit Filter:' : '損益区分:'}</span>
            <button
              onClick={() => setProfitFilter('all')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                profitFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isEn ? 'All' : '全件'}
            </button>
            <button
              onClick={() => setProfitFilter('profit')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                profitFilter === 'profit'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              {isEn ? 'Profitable' : '黒字決算'}
            </button>
            <button
              onClick={() => setProfitFilter('loss')}
              className={`px-3 py-1 rounded-full font-bold transition ${
                profitFilter === 'loss'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              {isEn ? 'Net Loss' : '最終赤字'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-semibold">{isEn ? 'Sort:' : '並び順:'}</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="date_desc">{isEn ? 'Gazette Date (Latest)' : '官報掲載日 (新しい順)'}</option>
              <option value="profit_desc">{isEn ? 'Net Income (Highest)' : '当期純利益 (大きい順)'}</option>
              <option value="net_assets_desc">{isEn ? 'Net Assets (Highest)' : '純資産額 (大きい順)'}</option>
              <option value="total_assets_desc">{isEn ? 'Total Assets (Scale)' : '総資産額 (規模順)'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* タイムラインフィード本体 */}
      <div className="space-y-10">
        {Object.keys(groupedByDate).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-2">
            <p className="text-sm font-bold text-slate-700">{isEn ? 'No official gazette records matched your filter.' : '該当する決算公告データが見つかりませんでした。'}</p>
            <p className="text-xs text-slate-400">{isEn ? 'Please adjust search query or filters.' : '検索条件やフィルターを変更してお試しください。'}</p>
          </div>
        ) : (
          Object.keys(groupedByDate).map((dateKey) => (
            <div key={dateKey} className="space-y-4">
              {/* 日付ヘッダー */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-black font-mono">
                  <Calendar className="w-3.5 h-3.5 text-teal-600" />
                  <span>{dateKey} {isEn ? 'Official Gazette' : '官報公告分'}</span>
                </div>
                <div className="h-px bg-slate-200 flex-1" />
                <span className="text-xs text-slate-400 font-semibold font-mono">
                  {groupedByDate[dateKey].length} {isEn ? 'Reports' : '件'}
                </span>
              </div>

              {/* 当該日付の公告リスト */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {groupedByDate[dateKey].map((report) => {
                  const isProfitable = report.netIncome >= 0;
                  const isInsolvent = report.netAssets < 0;
                  const isExpanded = expandedBsId === report.id;
                  const displayName = getCompanyName(report.company.slug, report.company.name, isEn);
                  const displayIndustry = getSectorName(report.company.industry, isEn);

                  return (
                    <div
                      key={report.id}
                      className="bg-white rounded-2xl border border-slate-200 hover:border-teal-400 shadow-xs hover:shadow-md transition p-5 space-y-4 flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                                {displayIndustry}
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {report.periodEnd} {isEn ? 'Period End' : '期'}
                              </span>
                            </div>
                            <h3 className="font-bold text-base text-slate-900 mt-1">
                              {displayName}
                            </h3>
                          </div>

                          <div className="text-right">
                            <span
                              className={`inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold ${
                                isInsolvent
                                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                  : isProfitable
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {isInsolvent ? (isEn ? 'Insolvent' : '債務超過') : isProfitable ? (isEn ? 'Profitable' : '黒字') : (isEn ? 'Net Loss' : '赤字')}
                            </span>
                          </div>
                        </div>

                        {/* 財務主要指標 3グリッド */}
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block">{isEn ? 'Net Income' : '当期純利益'}</span>
                            <span
                              className={`font-mono font-bold text-xs mt-0.5 block ${
                                isProfitable ? 'text-emerald-600' : 'text-rose-600'
                              }`}
                            >
                              {formatAmount(report.netIncome)}
                            </span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block">{isEn ? 'Net Assets' : '純資産'}</span>
                            <span className="font-mono font-bold text-slate-800 text-xs mt-0.5 block">
                              {formatAmount(report.netAssets)}
                            </span>
                          </div>
                          <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                            <span className="text-[10px] text-slate-400 block">{isEn ? 'Total Assets' : '総資産'}</span>
                            <span className="font-mono font-bold text-slate-800 text-xs mt-0.5 block">
                              {formatAmount(report.totalAssets)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* アクションボタン */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => toggleBs(report.id)}
                          className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 font-bold transition"
                        >
                          <span>{isExpanded ? (isEn ? 'Hide BS Detail' : '貸借対照表を閉じる') : (isEn ? 'View BS Detail' : '貸借対照表 内訳')}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        <Link
                          href={`/unlisted/${report.company.slug}`}
                          className="inline-flex items-center gap-1 text-xs text-teal-600 hover:text-teal-700 font-bold"
                        >
                          <span>{isEn ? 'Company Card' : '企業カルテ'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}