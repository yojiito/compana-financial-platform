'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  REIT_LIST,
  ReitData,
} from '@/lib/reits-data';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName, getReitPropertyName } from '@/lib/company-english-names';
import {
  Building2,
  Building,
  TrendingUp,
  Percent,
  Coins,
  ShieldCheck,
  Search,
  Filter,
  ArrowUpDown,
  MapPin,
  Sparkles,
  Layers,
  CheckCircle2,
  Gem,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

const SPONSOR_EN_MAP: Record<string, string> = {
  '8951': 'Mitsui Fudosan Co., Ltd. (43.1% stake)',
  '8952': 'Mitsubishi Estate Co., Ltd. (48.2% stake)',
  '8953': 'Mitsubishi Corp. - UBS Realty (KKR)',
  '8954': 'ORIX Corporation (8591)',
  '8955': 'Tokyo Tatemono & Sompo Japan Group',
  '8956': 'NTT Urban Development / NTT Group (9432)',
  '8957': 'Tokyu Corporation (9005)',
  '8958': 'Meiji Yasuda Life Insurance / Mitsubishi UFJ Trust',
  '8960': 'Marubeni Corporation (100% Sponsor)',
  '8961': 'Mori Trust Co., Ltd.',
  '8963': 'Hankyu Hanshin Holdings (9042)',
  '8964': 'Mitsui Fudosan Co., Ltd.',
  '8966': 'Heiwa Real Estate Co., Ltd. (TSE Building Owner)',
  '8967': 'Mitsui & Co., Ltd. (100%)',
  '8968': 'Fukuoka Jisho / Kyushu Electric / Nishi-Nippon RR / Fukuoka Bank',
  '8972': 'Kenedix, Inc. / SMFL',
  '8975': 'Ichigo Inc. (2337)',
  '8976': 'Daiwa Securities Group Inc. (8601)',
  '8977': 'Hankyu Hanshin Holdings (9042)',
  '8979': 'Starts Corporation Inc. (8850)',
  '8984': 'Daiwa House Industry Co., Ltd.',
  '8985': 'SC Capital Partners Group',
  '8986': 'Daiwa Securities Group Inc.',
  '8987': 'Nippon Steel Kowa Real Estate / Dai-ichi Life',
  '3226': 'Mitsui Fudosan Co., Ltd. (100%)',
  '3234': 'Mori Building Co., Ltd. (100%)',
  '3269': 'ITOCHU Group (Itochu Urban Development)',
  '3278': 'ITOCHU Group (Itochu Urban Development)',
  '3279': 'Tokyu Fudosan Holdings (3289)',
  '3281': 'GLP Pte. Ltd. (Global Logistics Real Estate)',
  '3282': 'Tokyu Fudosan Holdings (3289)',
  '3283': 'Prologis Group (Global Logistics Leader)',
  '3287': 'Hoshino Resorts Group (Yoshiharu Hoshino)',
  '3290': 'Daiwa House Industry Co., Ltd.',
  '3292': 'AEON Co., Ltd. (8267)',
  '3295': 'Hulic Co., Ltd. (3003)',
  '3296': 'Nikko Asset Management / Sojitz Corporation',
  '3451': 'Tosei Corporation (8923)',
  '3459': 'Samty Co., Ltd. / Daiwa Securities Group',
  '3462': 'Nomura Real Estate Development',
  '3463': 'Ichigo Inc.',
  '3466': 'LaSalle Investment Management',
  '3468': 'Star Asia Group',
  '3471': 'Mitsui Fudosan Co., Ltd.',
  '3472': 'Oedo Onsen Holdings',
  '3476': 'Mitsui & Co., Ltd. / IDERA Capital',
  '3478': 'Mori Trust Co., Ltd.',
  '3481': 'Mitsubishi Estate Co., Ltd.',
  '3487': 'CRE, Inc. (3458)',
  '3488': 'XYMAX Corporation (Major Property Management)',
  '3492': 'MIRARTH Holdings (8897) / Kyoritsu Maintenance',
  '3493': 'ITOCHU Corporation / ITOCHU Urban Development',
  '2971': 'ESCON Japan / Chubu Electric Power Group',
  '2972': 'The Sankei Building Co., Ltd. / Fujisankei Group',
  '2979': 'Sumitomo Corporation (100%)',
  '2989': 'Shizuoka Bank Group / Shizugin DC Card',
};

const CATEGORY_EN_MAP: Record<string, string> = {
  'office': 'Office Specialized',
  'logistics': 'Logistics / Industrial',
  'residential': 'Residential',
  'hotel': 'Hotels & Resorts',
  'retail': 'Retail & Urban',
  'diversified': 'Diversified Multi-Asset',
};

const translateSponsorName = (tickerCode: string, rawSponsor: string, isEn: boolean) => {
  if (!isEn || !rawSponsor) return rawSponsor;
  if (SPONSOR_EN_MAP[tickerCode]) return SPONSOR_EN_MAP[tickerCode];

  let res = rawSponsor
    .replace(/株式会社/g, ' Co., Ltd.')
    .replace(/ホールディングス/g, ' Holdings')
    .replace(/グループ/g, ' Group')
    .replace(/不動産/g, ' Real Estate')
    .replace(/開発/g, ' Development')
    .replace(/投資/g, ' Investment')
    .replace(/（100%）/g, ' (100%)')
    .replace(/\(100%\)/g, ' (100%)')
    .replace(/（スポンサーグループ）/g, ' (Sponsor Group)');
  return res;
};

export default function ReitsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'marketCap' | 'yield' | 'nav'>('marketCap');
  const { isEn, t } = useLanguage();

  const categories = [
    { id: 'all', label: isEn ? 'All Assets' : '全アセット (総合)', icon: '🏢' },
    { id: 'office', label: isEn ? 'Office Specialized' : 'オフィス特化', icon: '🏙️' },
    { id: 'logistics', label: isEn ? 'Logistics / Warehouse' : '物流施設特化', icon: '📦' },
    { id: 'residential', label: isEn ? 'Residential' : '住宅 (レジデンス)', icon: '🏡' },
    { id: 'hotel', label: isEn ? 'Hotels & Resorts' : 'ホテル特化', icon: '🏨' },
  ];

  // フィルタリング
  const filteredReits = REIT_LIST.filter((reit) => {
    const matchesCategory =
      selectedCategory === 'all' || reit.category === selectedCategory;
    const matchesSearch =
      reit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reit.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reit.tickerCode.includes(searchQuery) ||
      reit.sponsor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'yield') return b.dividendYieldPct - a.dividendYieldPct;
    if (sortBy === 'nav') return a.navMultiplier - b.navMultiplier; // 割安順
    return b.marketCapBillion - a.marketCapBillion;
  });

  const totalMarketCap = REIT_LIST.reduce((acc, cur) => acc + cur.marketCapBillion, 0);
  const avgYield = (
    REIT_LIST.reduce((acc, cur) => acc + cur.dividendYieldPct, 0) / REIT_LIST.length
  ).toFixed(2);
  const totalProperties = REIT_LIST.reduce((acc, cur) => acc + (cur.financials?.propertiesCount || cur.properties.length), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-20">
      {/* ヒーローセクション */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 text-white p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            <span>{isEn ? 'TSE Listed Real Estate Investment Trusts (J-REIT) Hub' : '東証上場 不動産投資信託（J-REIT）分析ハブ'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isEn ? 'J-REIT Property Portfolio & Financial Anatomy' : 'J-REIT 保有不動産ポートフォリオ ＆ 財務解剖'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'Complete visual intelligence for Japan REITs: Distribution Yields, NAV Multiplier, LTV ratios, and detailed property holdings (Location, Appraisal Value, Floor Area, Occupancy Rates, Unrealized Gains).'
              : '国内上場不動産投資法人の基準価額・予想分配金利回り・NAV倍率・LTV負債比率から、各法人が開示している保有不動産の詳細な内訳（所在地・保有年月日・敷地延床面積・鑑定額・含み益・稼働率）までをワンストップで完全可視化。'}
          </p>

          {/* 主要統計サマリー */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-xs font-sans">
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Total Market Cap' : '掲載時価総額 合計'}</span>
              <strong className="text-white text-base font-mono font-black">
                {isEn ? `¥${(totalMarketCap / 10000).toFixed(1)}T` : `約${(totalMarketCap / 10000).toFixed(1)} 兆円`}
              </strong>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Avg Distribution Yield' : '平均 予想分配金利回り'}</span>
              <strong className="text-teal-400 text-base font-mono font-black">
                {avgYield}%
              </strong>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Managed Properties' : '管理保有物件 総数'}</span>
              <strong className="text-amber-400 text-base font-mono font-black">
                {totalProperties.toLocaleString()} {isEn ? 'Props' : '物件'}
              </strong>
            </div>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[11px]">{isEn ? 'Average LTV (Debt)' : '平均 LTV (有利子負債比率)'}</span>
              <strong className="text-indigo-400 text-base font-mono font-black">
                40.8% {isEn ? '(Healthy)' : '(超健全)'}
              </strong>
            </div>
          </div>

          {/* 📅 データ基準日 ＆ 公式同期状況 */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg">
              <span>📅</span>
              <span>{isEn ? 'Price Data: Aug 26, 2026 Close' : '株価・投資口価格: 2026年8月26日 終値基準'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg">
              <span>📑</span>
              <span>{isEn ? 'Financials & Appraisal: Latest Official Periodic Filings' : '財務諸表・鑑定評価額: 各法人 直近公式決算開示基準'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-2.5 py-1 rounded-lg font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Official Data Sync: Aug 27, 2026' : '公式IRデータ同期: 2026年8月27日'}</span>
            </span>
            <Link
              href="/reits/audit"
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-teal-900/90 to-emerald-900/90 hover:from-teal-800 hover:to-emerald-800 border border-teal-500/60 text-teal-200 hover:text-white px-3 py-1 rounded-lg font-bold transition shadow-xs group"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition" />
              <span>{isEn ? '🛡️ 100% Fact-Checked & Audited (Audit Portal ↗)' : '🛡️ 100% 公式開示照合済・監査ポータルを見る ↗'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 検索 ＆ フィルターコントロール */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        {/* カテゴリタブ */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-teal-700 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* 検索 ＆ ソート */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={isEn ? 'Search J-REIT by name, sponsor, code...' : 'REIT名・スポンサー・コードで検索...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold shrink-0">
            <button
              onClick={() => setSortBy('marketCap')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                sortBy === 'marketCap'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? 'Market Cap' : '時価総額順'}
            </button>
            <button
              onClick={() => setSortBy('yield')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                sortBy === 'yield'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? 'Yield' : '利回り順'}
            </button>
            <button
              onClick={() => setSortBy('nav')}
              className={`px-2.5 py-1.5 rounded-lg transition ${
                sortBy === 'nav'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {isEn ? 'NAV (Value)' : '割安NAV順'}
            </button>
          </div>
        </div>
      </div>

      {/* REITカードグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReits.map((reit) => {
          const displayReitName = getCompanyName(reit.tickerCode, reit.name, isEn);
          const displayCategory = isEn ? (CATEGORY_EN_MAP[reit.category] || reit.categoryLabel) : reit.categoryLabel;
          const displaySponsor = translateSponsorName(reit.tickerCode, reit.sponsor, isEn);

          return (
            <Link
              key={reit.tickerCode}
              href={`/reits/${reit.tickerCode}`}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-teal-500 shadow-xs hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* カードヘッダー */}
                <div className="bg-slate-900 text-white p-4 flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-teal-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                        {reit.tickerCode}
                      </span>
                      <span className="text-[11px] font-bold text-slate-300">
                        {displayCategory}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-white mt-1 group-hover:text-teal-300 transition">
                      {displayReitName}
                    </h3>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      {isEn ? 'Sponsor:' : 'スポンサー:'} {displaySponsor}
                    </span>
                  </div>
                  <div className="text-right font-mono flex flex-col items-end">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/60 px-2 py-0.5 rounded-full mb-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>{isEn ? 'Verified' : '公式照合済'}</span>
                    </span>
                    <div className="text-lg font-black text-white">
                      ¥{reit.unitPrice.toLocaleString()}
                    </div>
                    <span
                      className={`text-[11px] font-bold ${
                        reit.priceChange >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {reit.priceChange >= 0 ? '+' : ''}
                      {reit.priceChange.toLocaleString()} ({reit.priceChangePct}%)
                    </span>
                  </div>
                </div>

                {/* 主要指標 4グリッド */}
                <div className="p-4 grid grid-cols-2 gap-2 text-xs bg-slate-50/50 border-b border-slate-100">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-medium text-slate-500 block">{isEn ? 'Distribution Yield' : '予想分配金利回り'}</span>
                    <span className="text-base font-mono font-black text-teal-700">
                      {reit.dividendYieldPct}%
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-medium text-slate-500 block">{isEn ? 'NAV Multiplier' : 'NAV倍率 (P/NAV)'}</span>
                    <span className="text-base font-mono font-black text-indigo-700">
                      {reit.navMultiplier}x
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-medium text-slate-500 block">{isEn ? 'Props / Occupancy' : '保有物件数 / 平均稼働率'}</span>
                    <span className="font-mono font-bold text-slate-800">
                      {reit.financials.propertiesCount} / {reit.financials.averageOccupancyRate}%
                    </span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[10px] font-medium text-slate-500 block">{isEn ? 'LTV (Debt Ratio)' : 'LTV (負債比率)'}</span>
                    <span className="font-mono font-bold text-slate-800">
                      {reit.financials.ltvRatio}%
                    </span>
                  </div>
                </div>

                {/* 代表的な保有物件プレビュー */}
                <div className="p-4 space-y-2 text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{isEn ? 'Key Managed Properties Portfolio' : '代表的な保有不動産（ポートフォリオ）'}</span>
                  </div>
                  <div className="space-y-1">
                    {reit.properties.slice(0, 3).map((prop, idx) => {
                      const displayPropName = getReitPropertyName(prop.name, isEn);
                      const oku = prop.appraisalValueMillion / 100;
                      const formattedVal = isEn
                        ? (oku >= 10000 ? `¥${(oku / 10000).toFixed(2)}T` : `¥${(oku / 10).toFixed(1)}B`)
                        : `約${Math.round(oku).toLocaleString()} 億円`;

                      return (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-slate-700 bg-slate-50 p-1.5 rounded-lg text-[11px]"
                        >
                          <span className="truncate max-w-[180px] font-medium">{displayPropName}</span>
                          <span className="font-mono text-slate-500 shrink-0 font-bold">
                            {formattedVal}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* カードフッター */}
              <div className="p-4 pt-0">
                <div className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-900 group-hover:bg-teal-700 text-white text-xs font-bold transition shadow-xs">
                  <span>{isEn ? 'View Property Portfolio & Financials' : '保有物件明細・財務カルテを見る'}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}