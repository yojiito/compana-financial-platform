'use client';

import React from 'react';
import {
  BarChart2,
  Building,
  User,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  PieChart,
  Landmark,
  Sparkles,
  TrendingUp,
  Wind,
  BookOpen,
  Target,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface Segment {
  name: string;
  ratio: number;
}

interface UnlistedOverviewProfileProps {
  company: {
    name: string;
    industry: string;
    description?: string | null;
    establishedYear?: number | null;
    location?: string | null;
    representative?: string | null;
    employeesCount?: string | null;
    avgAge?: number | null;
    avgSalary?: number | null;
    mainBanks?: string | null;
    shikihoHeadline?: string | null;
    shikihoOutlook?: string | null;
    shikihoMaterial?: string | null;
    businessSegments?: string | null;
  };
}

export default function UnlistedShikihoProfile({ company }: UnlistedOverviewProfileProps) {
  let segments: Segment[] = [];
  try {
    if (company.businessSegments) {
      segments = JSON.parse(company.businessSegments);
    }
  } catch (e) {
    console.error('Failed to parse unlisted segments', e);
  }

  return (
    <div className="space-y-6">
      {/* 📊 compana 未上場企業カルテ */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-6 p-6 sm:p-8">
        {/* ヘッダー */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold tracking-tight text-slate-900 flex items-center gap-2">
                <span>compana 未上場企業カルテ (事業概要 ＆ 成長戦略)</span>
              </h3>
              <span className="text-[11px] text-slate-400">
                公式リリース・官報決算公告・資本政策から集約した独自企業分析
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200 self-start sm:self-auto">
            {company.industry} (未上場)
          </span>
        </div>

        {/* 1. 【最重要】事業概要 ＆ ビジネスモデル カード */}
        {company.description && (
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-bold tracking-wider uppercase text-teal-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-teal-400" />
                事業概要 ＆ ビジネスモデル (提供価値・収益構造)
              </span>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                ビジネスモデル概要
              </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-100 font-medium">
              {company.description.replace(/^【事業概要】/, '')}
            </p>
          </div>
        )}

        {/* 2. 成長ハイライト 見出し */}
        {company.shikihoHeadline && (
          <div className="flex items-start gap-3 bg-teal-50/70 border border-teal-200/80 p-4 rounded-xl">
            <Sparkles className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-extrabold text-teal-800 tracking-wider block">
                compana 成長ハイライト
              </span>
              <span className="font-extrabold text-slate-900 text-base leading-snug">
                {company.shikihoHeadline}
              </span>
            </div>
          </div>
        )}

        {/* 3. 事業展望 ＆ 資本トピック (2カラム) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
            <div className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <TrendingUp className="w-4 h-4 text-teal-600" />
              <span>【事業展開 ＆ 収益性の展望】</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
              {company.shikihoOutlook || '先行投資を継続しながら顧客基盤と市場シェアを拡大中。'}
            </p>
          </div>

          <div className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200/70">
            <div className="font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-200">
              <Wind className="w-4 h-4 text-indigo-600" />
              <span>【資本戦略 ＆ 注目トピック】</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs sm:text-sm">
              {company.shikihoMaterial || '外部資金調達とプロダクト拡充により事業拡大を加速。'}
            </p>
          </div>
        </div>

        {/* 4. セグメント構成比 ＆ 会社基本情報 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* 事業別構成比 */}
          <div className="bg-slate-50/70 rounded-xl border border-slate-200/70 p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-teal-600" />
                <span>事業・プロダクト別売上構成比</span>
              </h4>
            </div>

            {segments.length > 0 ? (
              <div className="space-y-3">
                <div className="h-3.5 rounded-full overflow-hidden flex bg-slate-200/70 shadow-inner">
                  {segments.map((seg, idx) => {
                    const colors = ['bg-teal-600', 'bg-indigo-600', 'bg-amber-500', 'bg-cyan-500', 'bg-rose-500'];
                    const color = colors[idx % colors.length];
                    return (
                      <div
                        key={idx}
                        style={{ width: `${seg.ratio}%` }}
                        className={`${color} transition-all duration-500`}
                        title={`${seg.name}: ${seg.ratio}%`}
                      />
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 gap-2 text-xs pt-1">
                  {segments.map((seg, idx) => {
                    const dotColors = ['bg-teal-600', 'bg-indigo-600', 'bg-amber-500', 'bg-cyan-500', 'bg-rose-500'];
                    return (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200/80">
                        <div className="flex items-center gap-2 truncate">
                          <span className={`w-2 h-2 rounded-full ${dotColors[idx % dotColors.length]} shrink-0`} />
                          <span className="font-medium text-slate-800 truncate">{seg.name}</span>
                        </div>
                        <span className="font-mono font-bold text-slate-900 ml-2">{seg.ratio}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : company.businessSegments ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                  {company.businessSegments}
                </p>
              </div>
            ) : (
              <div className="text-xs text-slate-400 py-3 text-center">セグメント情報なし</div>
            )}
          </div>

          {/* 組織規模 ＆ 従業員データ */}
          <div className="bg-slate-50/70 rounded-xl border border-slate-200/70 p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h4 className="text-xs font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-700" />
                <span>組織規模 ＆ 従業員データ</span>
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                  <Users className="w-3.5 h-3.5" />
                  従業員数
                </span>
                <div className="font-bold text-slate-900 text-sm mt-0.5">
                  {company.employeesCount || '-'}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200/80">
                <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                  <DollarSign className="w-3.5 h-3.5" />
                  推定平均年収
                </span>
                <div className="font-bold text-slate-900 text-sm font-mono mt-0.5">
                  {company.avgSalary ? `${company.avgSalary}万円` : '-'}
                </div>
              </div>

              <div className="bg-white p-3 rounded-lg border border-slate-200/80 col-span-2">
                <span className="text-slate-400 flex items-center gap-1 font-semibold text-[11px]">
                  <Landmark className="w-3.5 h-3.5" />
                  主要取引銀行
                </span>
                <div className="font-medium text-slate-800 text-xs mt-0.5">
                  {company.mainBanks || '-'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}