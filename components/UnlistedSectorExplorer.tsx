'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Building,
  Sparkles,
  TrendingUp,
  Scale,
  ArrowRight,
  ShieldCheck,
  Search,
  Filter,
  BookOpen,
  Newspaper,
  Cpu,
  Cloud,
  Dna,
  Truck,
  Layers,
  BarChart2,
  Gem,
  CheckCircle2,
  Calendar,
  DollarSign,
  Users,
  Globe,
} from 'lucide-react';
import { useLanguage } from '@/lib/language-context';
import {
  getCompanyName,
  getSectorName,
  getUnlistedIndustry,
  getUnlistedRepresentative,
  getUnlistedDescription,
} from '@/lib/company-english-names';

export interface UnlistedCompanyItem {
  id: string;
  corporateNumber: string;
  slug: string;
  name: string;
  shortName: string;
  industry: string;
  establishedYear: number | null;
  location: string | null;
  representative: string | null;
  capital: number | null;
  description: string | null;
  isStartup: boolean;
  websiteUrl?: string | null;
  employeesCount: string | null;
  avgSalary: number | null;
  latestPeriodEnd: string | null;
  latestNetAssets: number | null;
  latestNetIncome: number | null;
  latestTotalAssets: number | null;
}

interface Props {
  companies: UnlistedCompanyItem[];
}

export interface SectorDefinition {
  id: string;
  label: string;
  enLabel: string;
  icon: any;
  badgeColor: string;
  description: string;
  enDescription: string;
  slugs: string[];
  matcher?: (c: UnlistedCompanyItem) => boolean;
}

export const SECTOR_DEFINITIONS: SectorDefinition[] = [
  {
    id: 'publishing_media',
    label: '総合出版・新聞 ＆ メディアIP',
    enLabel: 'Mega Publishing, Newspapers & Media IP',
    icon: BookOpen,
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: '世界的人気マンガ・アニメIP、全国紙・経済報道、電子版有料会員網、都心優良不動産を誇る巨大メディア・コンテンツ複合体',
    enDescription: 'Global manga/anime IP, national daily financial papers, digital subscriptions, and prime real estate media powerhouses',
    slugs: ['shueisha', 'kodansha', 'shogakukan', 'nikkei', 'yomiuri', 'asahi'],
  },
  {
    id: 'ai_deeptech',
    label: 'AI ＆ ディープテック',
    enLabel: 'Generative AI & Deep Tech',
    icon: Cpu,
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    description: '生成AI基盤モデル、深層学習、LLM、ブロックチェーン技術を開発する最先端テック',
    enDescription: 'Cutting-edge AI foundation models, deep learning accelerators, and enterprise LLMs',
    slugs: ['preferred-networks', 'pfn', 'layerx', 'sakana'],
  },
  {
    id: 'cloud_saas',
    label: 'クラウド人事 ＆ 企業SaaS',
    enLabel: 'Enterprise Cloud HR & B2B SaaS',
    icon: Cloud,
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: '労務DX、支出管理、バックオフィス業務自動化を推進する国内トップSaaS企業',
    enDescription: 'Leading cloud HR automation, spend management, and enterprise workflow platforms',
    slugs: ['smarthr'],
  },
  {
    id: 'biotech_materials',
    label: 'バイオ素材 ＆ 製造受発注DX',
    enLabel: 'Biomaterials & Manufacturing DX',
    icon: Dna,
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: '人工構造タンパク質素材、受発注プラットフォーム、製造業サプライチェーン革新',
    enDescription: 'Structural brewed protein materials, manufacturing procurement platforms & drawing AI',
    slugs: ['spiber', 'caddi'],
  },
  {
    id: 'construction_mobility',
    label: '建設DX ＆ マイクロモビリティ',
    enLabel: 'Construction DX & Micro-Mobility',
    icon: Truck,
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: '施工管理クラウド、シェアサイクル・電動キックボードインフラを構築',
    enDescription: 'Construction project management cloud and next-gen electric micro-mobility infrastructure',
    slugs: ['andpad', 'luup'],
  },
  {
    id: 'conglomerate',
    label: '老舗大手 ＆ コングロマリット',
    enLabel: 'Legacy Mega Giants & Conglomerates',
    icon: Building,
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-300',
    description: '飲料・建設・ファスナー・非上場コングロマリット',
    enDescription: 'Global beverages, mega construction, precision zippers, and private conglomerates',
    slugs: ['suntory', 'suntory-hd', 'takenaka', 'ykk', 'sky', 'dmm'],
  },
];

export default function UnlistedSectorExplorer({ companies }: Props) {
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'netAssets' | 'netIncome' | 'established'>('netAssets');
  const { isEn, t } = useLanguage();

  const formatMillionYen = (val: number | null | undefined) => {
    if (val === null || val === undefined) return '-';
    const isNegative = val < 0;
    const absVal = Math.abs(val);
    const oku = absVal / 100;

    if (isEn) {
      if (oku >= 10000) {
        return `${isNegative ? '-' : ''}¥${(oku / 10000).toFixed(2)}T`;
      }
      if (oku >= 10) {
        return `${isNegative ? '-' : ''}¥${(oku / 10).toFixed(1)}B`;
      }
      if (oku >= 1) {
        return `${isNegative ? '-' : ''}¥${(oku / 10).toFixed(1)}B`;
      }
      return `${isNegative ? '-' : ''}¥${absVal.toLocaleString()}M`;
    }

    if (oku >= 10000) {
      return `${isNegative ? '-' : ''}¥${(oku / 10000).toFixed(2)} 兆円`;
    }
    return `${isNegative ? '-' : ''}¥${Math.round(oku).toLocaleString()} 億円`;
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((c) => {
      let matchesSector = true;
      if (selectedSector !== 'all') {
        const sectorDef = SECTOR_DEFINITIONS.find((s) => s.id === selectedSector);
        if (sectorDef) {
          matchesSector =
            sectorDef.slugs.includes(c.slug) ||
            (sectorDef.matcher ? sectorDef.matcher(c) : false);
        }
      }
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.representative && c.representative.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesSector && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'netAssets') {
        return (b.latestNetAssets || 0) - (a.latestNetAssets || 0);
      }
      if (sortBy === 'netIncome') {
        return (b.latestNetIncome || 0) - (a.latestNetIncome || 0);
      }
      return (a.establishedYear || 9999) - (b.establishedYear || 9999);
    });
  }, [companies, selectedSector, searchQuery, sortBy]);

  return (
    <div className="space-y-10">
      {/* ヒーローヘッダー (Bilingual) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 text-teal-300 border border-teal-700/60 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5" />
            <span>{isEn ? 'Official Gazette & Financial Filings Database' : '官報決算公告 ＆ 公式HP決算データベース'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isEn ? 'Unlisted Corporate Sector Explorer & Financial Cards' : '未上場企業 業種別セクター ＆ 財務カルテ'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'Systematic financial directory synthesizing Article 440 Gazette Filings and official corporate disclosures by sector: Mega Publishing, Newspapers & Media IP, AI & Deep Tech, Cloud SaaS, Biomaterials, Construction DX, and Micro-Mobility.'
              : '会社法第440条に基づく「官報の決算公告」および公式HPの公表数値を業種・セクター別に体系化。総合出版・新聞・メディアIP、AI・ディープテック、SaaS・クラウド、バイオ新素材・製造DX、建設DX・モビリティなど、各セクターの純資産・利益・成長性を網羅。'}
          </p>
        </div>
      </div>

      {/* 🎛️ セクター選択タブ ＆ 検索バー */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        {/* セクター切り替えタブ */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={() => setSelectedSector('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
              selectedSector === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{isEn ? 'All Unlisted Sectors' : '全セクター (総合)'}</span>
          </button>
          {SECTOR_DEFINITIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setSelectedSector(s.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedSector === s.id
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isEn ? s.enLabel : s.label}</span>
              </button>
            );
          })}
        </div>

        {/* 検索・ソート */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search unlisted companies by name, industry, representative...' : '未上場企業名、業種、代表者名で検索...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 text-[11px] font-semibold">{isEn ? 'Sort by:' : '並び替え:'}</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="netAssets">{isEn ? 'Net Assets (Scale)' : '純資産（規模順）'}</option>
              <option value="netIncome">{isEn ? 'Net Income (Profitability)' : '当期純利益（収益順）'}</option>
              <option value="established">{isEn ? 'Established (Oldest)' : '設立年（歴史順）'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🏢 企業カードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((c) => {
          const displayName = getCompanyName(c.slug, c.name, isEn);
          const displayIndustry = getUnlistedIndustry(c.slug, c.industry, isEn);
          const displayRep = getUnlistedRepresentative(c.slug, c.representative, isEn);
          const displayDesc = getUnlistedDescription(c.slug, c.description, isEn);

          return (
            <Link
              key={c.id}
              href={`/unlisted/${c.slug}`}
              className="group bg-white rounded-3xl border border-slate-200 hover:border-teal-400 hover:shadow-xl transition-all duration-200 p-6 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
                    {displayIndustry}
                  </span>
                  {c.establishedYear && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {isEn ? `Est. ${c.establishedYear}` : `設立 ${c.establishedYear}年`}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-teal-600 transition">
                    {displayName}
                  </h3>
                  {displayRep && (
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">
                      {isEn ? 'CEO / Rep:' : '代表:'} {displayRep}
                    </span>
                  )}
                </div>

                {displayDesc && (
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-normal">
                    {displayDesc}
                  </p>
                )}
              </div>

              {/* 財務サマリー */}
              <div className="pt-3 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">{isEn ? 'Net Assets' : '純資産'}</span>
                    <strong className="text-sm font-mono font-black text-slate-900">
                      {formatMillionYen(c.latestNetAssets)}
                    </strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-semibold">{isEn ? 'Net Income' : '当期純利益'}</span>
                    <strong className="text-sm font-mono font-black text-emerald-600">
                      {formatMillionYen(c.latestNetIncome)}
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-teal-600 font-bold group-hover:translate-x-0.5 transition">
                  <span>{isEn ? 'View Official Gazette & Card' : '官報決算公告 ＆ カルテを見る'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}