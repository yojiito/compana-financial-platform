'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Handshake,
  Globe,
  DollarSign,
  TrendingUp,
  Scale,
  ShieldAlert,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  ArrowUpRight,
  Layers,
  Sparkles,
  Flame,
  Award,
  Building,
  Briefcase,
  BookOpen,
  PieChart,
  Coins,
  FileText,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Target,
  Calendar,
  Clock,
  Banknote,
} from 'lucide-react';
import { MA_DEALS_DATABASE, MaDealItem, DealTimelineEvent } from '@/lib/ma-deals-data';
import { useLanguage } from '@/lib/language-context';

export default function MaDealsHub() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedScale, setSelectedScale] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'value' | 'recent' | 'premium'>('value');
  const [expandedDealId, setExpandedDealId] = useState<string | null>(null);
  const { isEn, t } = useLanguage();

  const dealTypes = [
    { id: 'all', label: '全ディール', enLabel: 'All Deals', icon: Layers },
    { id: 'small_deal', label: '🌱 スモールM&A・事業承継・ロールアップ', enLabel: '🌱 Small M&A & Roll-Ups', icon: Sparkles },
    { id: 'cross_border', label: '🌐 海外メガ買収 (クロスボーダー)', enLabel: '🌐 Cross-Border Mega Deals', icon: Globe },
    { id: 'hostile_tob', label: '🔥 敵対的TOB・委任状争奪戦', enLabel: '🔥 Hostile TOBs & Battles', icon: Flame },
    { id: 'startup_tech', label: '🦄 スタートアップ・テック買収', enLabel: '🦄 Startup & Tech Buyouts', icon: Award },
    { id: 'domestic_mega', label: '🏛️ 国内グループ再編・完全子会社化', enLabel: '🏛️ Domestic Consolidations', icon: Building },
  ];

  const scaleFilters = [
    { id: 'all', label: '全規模', enLabel: 'All Deal Sizes' },
    { id: 'mega', label: 'メガディール (1,000億円以上)', enLabel: 'Mega Deals (¥100B+ / $1B+)' },
    { id: 'mid', label: 'ミドルディール (100億〜1,000億円)', enLabel: 'Mid-Market (¥10B~¥100B)' },
    { id: 'small', label: 'スモールディール (100億円未満)', enLabel: 'Small M&A (<¥10B / Startup)' },
  ];

  const sectorFilters = [
    { id: 'all', label: '全セクター', enLabel: 'All Sectors' },
    { id: 'pharma', label: '医薬品・ヘルスケア', enLabel: 'Pharma & Biotech' },
    { id: 'tech', label: '半導体・IT・通信', enLabel: 'Semiconductors & Tech' },
    { id: 'food', label: '食品・飲料・酒類', enLabel: 'Beverages & Tobacco' },
    { id: 'retail', label: '小売・コンビニ・外食', enLabel: 'Retail & Dining' },
    { id: 'auto', label: '自動車・製造業', enLabel: 'Automotive & Machinery' },
  ];

  const formatDealValue = (oku: number, usdBillion?: number) => {
    if (isEn) {
      if (usdBillion) {
        return `$${usdBillion.toFixed(1)}B (¥${(oku / 10000 >= 1 ? `${(oku / 10000).toFixed(1)}T` : `${(oku / 10).toFixed(1)}B`)})`;
      }
      return oku >= 10000 ? `¥${(oku / 10000).toFixed(2)}T` : `¥${(oku / 10).toFixed(1)}B`;
    }
    return oku >= 10000 ? `約${(oku / 10000).toFixed(1)} 兆円` : `約${Math.round(oku).toLocaleString()} 億円`;
  };

  const formatGoodwill = (oku?: number) => {
    if (!oku) return isEn ? 'N/A or None' : '発生なし / 未公表';
    if (isEn) {
      return oku >= 10000 ? `¥${(oku / 10000).toFixed(2)}T` : `¥${(oku / 10).toFixed(1)}B`;
    }
    return oku >= 10000 ? `約${(oku / 10000).toFixed(2)} 兆円` : `約${oku.toLocaleString()} 億円`;
  };

  const filteredDeals = useMemo(() => {
    return MA_DEALS_DATABASE.filter((d) => {
      let matchesType = true;
      if (selectedType !== 'all') {
        matchesType = d.dealType === selectedType;
      }

      let matchesSector = true;
      if (selectedSector !== 'all') {
        if (selectedSector === 'pharma') matchesSector = d.buyerSector.includes('医薬品') || d.targetSector.includes('バイオ');
        else if (selectedSector === 'tech') matchesSector = d.buyerSector.includes('通信') || d.targetSector.includes('半導体') || d.targetSector.includes('HR') || d.targetSector.includes('ゲーム') || d.targetSector.includes('アニメ');
        else if (selectedSector === 'food') matchesSector = d.buyerSector.includes('飲料') || d.buyerSector.includes('食料品');
        else if (selectedSector === 'retail') matchesSector = d.buyerSector.includes('小売') || d.buyerSector.includes('外食') || d.buyerSector.includes('商社');
        else if (selectedSector === 'auto') matchesSector = d.buyerSector.includes('自動車') || d.buyerSector.includes('モーター');
      }

      let matchesScale = true;
      if (selectedScale !== 'all') {
        if (selectedScale === 'mega') matchesScale = d.dealValueOku >= 10000; // 1000億円以上
        else if (selectedScale === 'mid') matchesScale = d.dealValueOku >= 100 && d.dealValueOku < 10000; // 100億〜1000億円
        else if (selectedScale === 'small') matchesScale = d.dealValueOku < 100; // 100億円未満 (スモールM&A)
      }

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        d.buyerName.toLowerCase().includes(q) ||
        d.buyerEnName.toLowerCase().includes(q) ||
        d.targetName.toLowerCase().includes(q) ||
        d.targetEnName.toLowerCase().includes(q) ||
        d.strategicObjective.toLowerCase().includes(q) ||
        d.enStrategicObjective.toLowerCase().includes(q) ||
        (d.advisors?.buyerFA && d.advisors.buyerFA.toLowerCase().includes(q)) ||
        d.keyTags.some((t) => t.toLowerCase().includes(q));

      return matchesType && matchesSector && matchesScale && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'value') return b.dealValueOku - a.dealValueOku;
      if (sortBy === 'premium') return (b.premiumPct || 0) - (a.premiumPct || 0);
      return (b.exactAnnounceDate || b.announceYear).localeCompare(a.exactAnnounceDate || a.announceYear);
    });
  }, [selectedType, selectedSector, selectedScale, searchQuery, sortBy]);

  const totalValueTrillion = (MA_DEALS_DATABASE.reduce((acc, d) => acc + d.dealValueOku, 0) / 10000).toFixed(1);

  return (
    <div className="space-y-10 pb-20">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-700/60 text-xs font-semibold">
            <Handshake className="w-3.5 h-3.5" />
            <span>{isEn ? 'Official M&A & Corporate Takeover Intelligence' : '公式M&A・買収 ＆ 資本提携インテリジェンス'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            {isEn ? 'Japan Mega M&A & Strategic Takeover Database' : '日本企業の大型M&A ＆ 買収・資本提携データベース'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'Complete visual intelligence on landmark Japanese M&A transactions extracted from EDINET Extraordinary Reports (Art. 24-5), TDnet Timely Disclosures, and Official Gazette notices. Analyze deal valuations, TOB premiums, goodwill generation, advisory teams, and post-merger integration (PMI) performance.'
              : '金融庁EDINET臨時報告書（金商法24条の5）、東証TDnet適時開示、官報組織再編公告に基づく公式M&Aデータベース。武田×シャイアー、ソフトバンク×Arm、リクルート×Indeed等の歴史的メガディールから敵対的TOB、スタートアップ買収まで、買収額・プレミアム・のれん・アドバイザー・買収後の成否（PMI）を一気通貫で分析。'}
          </p>

          {/* 📅 データ基準日 ＆ 公式同期状況 */}
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] text-slate-300">
            <span className="inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-lg">
              <span>📅</span>
              <span>{isEn ? 'Source Data: EDINET Extraordinary Reports & TSE Disclosures' : '開示ソース: 金融庁EDINET臨時報告書 ＆ 東証TDnet適時開示'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-2.5 py-1 rounded-lg font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isEn ? 'Official Data Sync: Aug 27, 2026' : '公式ディールデータ最終同期: 2026年8月27日'}</span>
            </span>
            <Link
              href="/audit"
              className="inline-flex items-center gap-1.5 bg-teal-900/90 hover:bg-teal-800 border border-teal-500/60 text-teal-200 hover:text-white px-3 py-1 rounded-lg font-bold transition shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>{isEn ? '🛡️ Inspect Audit Dossier ↗' : '🛡️ 100% 適時開示照合済・監査ポータルを見る ↗'}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 📊 4大サマリー統計 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block">{isEn ? 'Tracked Mega Deals' : '収録メガディール数'}</span>
          <strong className="text-2xl font-black font-mono text-slate-900">{MA_DEALS_DATABASE.length} Deals</strong>
          <span className="text-[10px] text-slate-400 block mt-1">{isEn ? 'Official EDINET/TDnet Filings' : '公式開示書類ベース'}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block">{isEn ? 'Total Deal Volume' : '掲載案件 合計買収規模'}</span>
          <strong className="text-2xl font-black font-mono text-indigo-600">
            {isEn ? `¥${totalValueTrillion}T ($${(parseFloat(totalValueTrillion) * 9.2).toFixed(0)}B+)` : `約${totalValueTrillion} 兆円`}
          </strong>
          <span className="text-[10px] text-slate-400 block mt-1">{isEn ? 'Across Global & Domestic Deals' : '国内外のメガ再編合算'}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block">{isEn ? 'Largest Historic Deal' : '日本企業 過去最大買収'}</span>
          <strong className="text-2xl font-black font-mono text-rose-600">
            {isEn ? '¥6.8T ($62B)' : '約6.8 兆円'}
          </strong>
          <span className="text-[10px] text-slate-400 block mt-1">{isEn ? 'Takeda × Shire (2018)' : '武田薬品 × シャイアー'}</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-[11px] text-slate-400 font-bold block">{isEn ? 'Average TOB Premium' : '平均TOBプレミアム率'}</span>
          <strong className="text-2xl font-black font-mono text-emerald-600">+38.5%</strong>
          <span className="text-[10px] text-slate-400 block mt-1">{isEn ? 'Above Market Share Price' : '直前株価に対する上乗せ幅'}</span>
        </div>
      </div>

      {/* 🎛️ コントロールバー（タイプ切替 ＆ 検索・ソート） */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-5">
        {/* ディールタイプタブ */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {dealTypes.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setSelectedType(t.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedType === t.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{isEn ? t.enLabel : t.label}</span>
              </button>
            );
          })}
        </div>

        {/* 業種フィルター ＆ 検索バー */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search deals by company, country, FA advisor, or keyword...' : '企業名、対象企業、国名、アドバイザー名、キーワードで検索...'}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* 規模フィルター */}
            <select
              value={selectedScale}
              onChange={(e) => setSelectedScale(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
            >
              {scaleFilters.map((s) => (
                <option key={s.id} value={s.id}>{isEn ? s.enLabel : s.label}</option>
              ))}
            </select>

            {/* セクター */}
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
            >
              {sectorFilters.map((s) => (
                <option key={s.id} value={s.id}>{isEn ? s.enLabel : s.label}</option>
              ))}
            </select>

            {/* ソート */}
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none"
            >
              <option value="value">{isEn ? 'Sort by Deal Value (Largest)' : '買収規模順 (最大)'}</option>
              <option value="recent">{isEn ? 'Sort by Date (Newest)' : 'ディール日時順 (最新)'}</option>
              <option value="premium">{isEn ? 'Sort by TOB Premium' : 'プレミアム率順'}</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🤝 M&Aディールカード一覧 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold px-1">
          <span>{isEn ? `Showing ${filteredDeals.length} M&A Deals` : `${filteredDeals.length} 件のM&Aディールを表示中`}</span>
          <span>{isEn ? 'Click any card to expand full PMI & advisory breakdown' : 'カードをクリックして詳細PMI・アドバイザー分析を展開'}</span>
        </div>

        <div className="space-y-4">
          {filteredDeals.map((deal) => {
            const isExpanded = expandedDealId === deal.id;
            const buyerDisplay = isEn ? deal.buyerEnName : deal.buyerName;
            const targetDisplay = isEn ? deal.targetEnName : deal.targetName;
            const typeLabelDisplay = isEn ? deal.enDealTypeLabel : deal.dealTypeLabel;
            const schemeDisplay = isEn ? deal.enSchemeLabel : deal.schemeLabel;
            const ratingDisplay = isEn ? deal.enStatusRatingLabel : deal.statusRatingLabel;
            const objectiveDisplay = isEn ? deal.enStrategicObjective : deal.strategicObjective;
            const outcomeDisplay = isEn ? deal.enOutcomeAndPmi : deal.outcomeAndPmi;
            const considerationDisplay = isEn ? deal.enConsiderationDetails : deal.considerationDetails;
            const financingDisplay = isEn ? deal.enFinancingMethod : deal.financingMethod;

            return (
              <div
                key={deal.id}
                className="bg-white rounded-3xl border border-slate-200 hover:border-indigo-400 shadow-xs hover:shadow-md transition-all overflow-hidden"
              >
                {/* カードメイン行 */}
                <div
                  onClick={() => setExpandedDealId(isExpanded ? null : deal.id)}
                  className="p-6 cursor-pointer space-y-4"
                >
                  {/* ヘッダーバッジ行 */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold text-indigo-700 bg-indigo-50 border border-indigo-200 px-3 py-0.5 rounded-full">
                        {typeLabelDisplay}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500 font-bold flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{deal.exactAnnounceDate} {deal.exactCloseDate ? `➔ ${deal.exactCloseDate}` : ''}</span>
                      </span>
                      <span className="text-[10px] text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded font-mono font-bold">
                        {deal.officialSourceType === 'EDINET_REPORT' ? (isEn ? 'EDINET Filing' : 'EDINET 臨時報告書') : (isEn ? 'TDnet Disclosed' : 'TDnet 適時開示')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-900 bg-slate-100 px-3 py-1 rounded-xl font-mono">
                        {formatDealValue(deal.dealValueOku, deal.dealValueUsdBillion)}
                      </span>
                      <button className="text-slate-400 hover:text-indigo-600 transition">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* 買収 ➔ 被買収 対決ビジュアル */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                    {/* 買収側 */}
                    <div className="flex-1 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {isEn ? 'Acquirer (Buyer)' : '買収企業 (買い手)'}
                      </span>
                      <div className="flex items-center gap-2">
                        <Building className="w-4 h-4 text-indigo-600 shrink-0" />
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {buyerDisplay}
                        </h3>
                      </div>
                      <span className="text-xs text-slate-500 font-medium block">
                        {isEn ? deal.buyerEnSector : deal.buyerSector}
                      </span>
                    </div>

                    {/* 矢印 */}
                    <div className="shrink-0 flex sm:flex-col items-center justify-center text-indigo-600 font-bold text-xs gap-1 bg-indigo-50 px-3 py-2 rounded-2xl">
                      <Handshake className="w-4 h-4" />
                      <span className="text-[10px]">{schemeDisplay}</span>
                    </div>

                    {/* 被買収側 */}
                    <div className="flex-1 space-y-1 sm:text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {isEn ? 'Target Company' : '対象企業 (被買収企業)'}
                      </span>
                      <div className="flex items-center sm:justify-end gap-2">
                        <h3 className="text-base sm:text-lg font-black text-slate-900">
                          {targetDisplay}
                        </h3>
                        <Globe className="w-4 h-4 text-emerald-600 shrink-0" />
                      </div>
                      <span className="text-xs text-slate-500 font-medium block">
                        {isEn ? `${deal.targetEnSector} (${deal.targetEnCountry})` : `${deal.targetSector} (${deal.targetCountry})`}
                      </span>
                    </div>
                  </div>

                  {/* 戦略概要プレビュー */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-2 border-t border-slate-100">
                    <strong>{isEn ? 'Strategic Rationale:' : '戦略的狙い:'}</strong> {objectiveDisplay}
                  </p>
                </div>

                {/* 📖 展開時の詳細タイムライン・日時・財務構造インサイト */}
                {isExpanded && (
                  <div className="bg-slate-50/70 p-6 border-t border-slate-200 space-y-6 animate-in fade-in duration-200">
                    {/* 重要指標グリッド */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="bg-white p-3 rounded-2xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold block">{isEn ? 'Deal Value' : '買収総額'}</span>
                        <strong className="text-sm font-mono font-black text-indigo-600">
                          {formatDealValue(deal.dealValueOku, deal.dealValueUsdBillion)}
                        </strong>
                      </div>
                      <div className="bg-white p-3 rounded-2xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold block">{isEn ? 'Goodwill Amount' : 'のれん発生額'}</span>
                        <strong className="text-sm font-mono font-black text-slate-800">
                          {formatGoodwill(deal.goodwillOku)}
                        </strong>
                      </div>
                      <div className="bg-white p-3 rounded-2xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold block">{isEn ? 'TOB Premium / Stake' : '買収プレミアム / 持分'}</span>
                        <strong className="text-sm font-mono font-black text-emerald-600">
                          {deal.premiumPct ? `+${deal.premiumPct}%` : (isEn ? 'Unlisted / N/A' : '非公開')}
                          {deal.stakeAfter ? ` (${deal.stakeBefore || '0%'} ➔ ${deal.stakeAfter})` : ''}
                        </strong>
                      </div>
                      <div className="bg-white p-3 rounded-2xl border border-slate-200">
                        <span className="text-[10px] text-slate-400 font-bold block">{isEn ? 'Deal Assessment' : 'ディール成否評価'}</span>
                        <strong className="text-xs font-bold text-slate-900 block truncate">
                          {ratingDisplay}
                        </strong>
                      </div>
                    </div>

                    {/* 📅 ディール・マイルストーン タイムライン */}
                    {deal.timeline && deal.timeline.length > 0 && (
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
                        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-900">
                          <Clock className="w-4 h-4 text-indigo-600" />
                          <span>{isEn ? 'Deal Milestone & Execution Timeline (Official Chronology)' : 'ディール実行タイムライン（発表〜株主総会〜当局承認〜成立日時）'}</span>
                        </div>
                        <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-indigo-100">
                          {deal.timeline.map((evt, idx) => {
                            const dateLabel = isEn ? evt.enDate : evt.date;
                            const eventLabel = isEn ? evt.enEvent : evt.event;
                            return (
                              <div key={idx} className="relative text-xs">
                                <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-indigo-600 border-2 border-white ring-2 ring-indigo-200" />
                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                                  <span className="font-mono font-bold text-indigo-700 shrink-0 text-[11px] bg-indigo-50 px-2 py-0.5 rounded">
                                    📅 {dateLabel}
                                  </span>
                                  <p className="text-slate-700 font-medium leading-relaxed">
                                    {eventLabel}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 💰 取引構造 ＆ 資金調達スキーム */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3 text-xs">
                      <div className="flex items-center gap-2 font-extrabold text-slate-900">
                        <Banknote className="w-4 h-4 text-emerald-600" />
                        <span>{isEn ? 'Deal Consideration & Financing Structure' : '取引スキーム・対価構成 ＆ 資金調達手法'}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                          <span className="text-[10px] font-bold text-slate-400 block">{isEn ? 'Consideration Breakdown:' : '買収対価の構成:'}</span>
                          <p className="text-slate-800 font-semibold">{considerationDisplay}</p>
                        </div>
                        {financingDisplay && (
                          <div className="space-y-1 bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                            <span className="text-[10px] font-bold text-slate-400 block">{isEn ? 'Financing Scheme:' : '資金調達・ファイナンス手法:'}</span>
                            <p className="text-slate-800 font-semibold">{financingDisplay}</p>
                          </div>
                        )}
                      </div>

                      {deal.valuationMultiples && (
                        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-[11px] font-mono">
                          <span className="text-slate-400 font-sans font-bold">{isEn ? 'Acquisition Multiples:' : '買収時バリュエーション倍率:'}</span>
                          {deal.valuationMultiples.evEbitda && (
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold">EV/EBITDA: {deal.valuationMultiples.evEbitda}</span>
                          )}
                          {deal.valuationMultiples.per && (
                            <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold">PER: {deal.valuationMultiples.per}</span>
                          )}
                          {deal.valuationMultiples.pbr && (
                            <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold">PBR: {deal.valuationMultiples.pbr}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* 戦略的狙い ＆ 買収後PMI成果 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-indigo-700 font-extrabold">
                          <Target className="w-4 h-4" />
                          <span>{isEn ? 'Strategic Rationale & Synergy' : '戦略的狙い ＆ 獲得シナジー'}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-normal">
                          {objectiveDisplay}
                        </p>
                      </div>

                      <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-extrabold">
                          <Award className="w-4 h-4" />
                          <span>{isEn ? 'Post-Merger Integration (PMI) & Track Record' : '買収後の成否 ＆ PMI実績・教訓'}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed font-normal">
                          {outcomeDisplay}
                        </p>
                      </div>
                    </div>

                    {/* アドバイザー (FA / Legal) */}
                    {deal.advisors && (
                      <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                        <span className="font-extrabold text-slate-700 flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4 text-amber-600" />
                          <span>{isEn ? 'Deal Advisory Teams (Investment Banks & Law Firms)' : 'ディール関与アドバイザー (FA / 法律顧問)'}</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1 text-slate-600">
                          <div>
                            <span className="text-slate-400">{isEn ? 'Buyer FA:' : '買収側 FA:'}</span> {deal.advisors.buyerFA || '-'}
                          </div>
                          <div>
                            <span className="text-slate-400">{isEn ? 'Target FA:' : '対象企業 FA:'}</span> {deal.advisors.targetFA || '-'}
                          </div>
                          <div>
                            <span className="text-slate-400">{isEn ? 'Buyer Legal:' : '買収側 法務:'}</span> {deal.advisors.buyerLegal || '-'}
                          </div>
                          <div>
                            <span className="text-slate-400">{isEn ? 'Target Legal:' : '対象側 法務:'}</span> {deal.advisors.targetLegal || '-'}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 開示書類 ＆ タグ */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {deal.keyTags.map((tag, idx) => (
                          <span key={idx} className="text-[10px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      {deal.officialFilingNumber && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          📑 {deal.officialFilingNumber}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 📚 M&Aインテリジェンス・ナレッジ（のれんとPMIの法則） */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>{isEn ? 'M&A Due Diligence & Valuation Principles' : 'M&A分析 ＆ 企業価値評価の鉄則'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black">
            {isEn ? 'Why Do Mega M&A Deals Succeed or Suffer Impairment?' : 'なぜメガM&Aは成功するか、あるいは巨額減損に陥るのか？'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {isEn
              ? 'M&A creates substantial enterprise value only when post-merger integration (PMI) successfully unlocks synergies that exceed the control premium and goodwill amortizations.'
              : 'M&Aにおいて最も重要なのは「買収価格（バリュエーション）」と「買収後の統合（PMI）」です。高値掴みによる巨額のれんは将来の減損リスクを孕み、独立性を尊重したリクルート型PMIや、即座に調達を共通化するニデック型PMIが成功の分岐点となります。'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-bold text-rose-400 block">{isEn ? '1. Goodwill & Impairment Risk' : '1. のれんと減損リスク'}</span>
            <p className="text-slate-300 leading-relaxed font-normal">
              {isEn
                ? 'Goodwill represents the premium paid above net assets. Under IFRS, it is subject to annual impairment tests; if target cash flows fall short, billions in write-downs hit operating profit.'
                : '買収先純資産を超えて支払ったプレミアムが「のれん」。IFRS適用企業は非償却ですが、期待キャッシュフローを下回ると一括で巨額減損損失が発生し純資産を毀損します。'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-bold text-emerald-400 block">{isEn ? '2. Autonomy vs Integration PMI' : '2. 自律型 vs 統合型PMI'}</span>
            <p className="text-slate-300 leading-relaxed font-normal">
              {isEn
                ? 'Recruit preserved Indeed’s founder autonomy to scale a tech platform, while Nidec rapidly standardizes procurement and costs. Alignment with the business model is paramount.'
                : 'リクルート×Indeedのようにテック企業の自律性を活かすモデルと、ニデックのように即座に原価改善・調達統合を進めるモデルの適切な見極めが成否を分けます。'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-bold text-indigo-400 block">{isEn ? '3. Hostile TOB & Takeover Reforms' : '3. 敵対的TOBと対抗防衛'}</span>
            <p className="text-slate-300 leading-relaxed font-normal">
              {isEn
                ? 'Recent corporate governance reforms in Japan have lowered barriers to unsolicited takeover bids, leading to successful hostile TOBs by Colowide, ITOCHU, and Nidec.'
                : '経産省「企業買収指針」改訂以降、同意なき買収（敵対的TOB）に対する真摯な検討が義務化され、日本のM&A市場はアクティビストや対抗TOBを含め大転換期を迎えています。'}
            </p>
          </div>

          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-2">
            <span className="font-bold text-amber-400 block">{isEn ? '4. Small M&A & Earn-Outs' : '4. スモールM&Aとアーンアウト'}</span>
            <p className="text-slate-300 leading-relaxed font-normal">
              {isEn
                ? 'Small M&A (e.g. Gunosy×Game8, SHIFT roll-ups, SORACOM Swing-By IPO) mitigates valuation risks via Earn-Out milestones and unlocks rapid multi-bagger returns when combined with operational upgrades.'
                : 'グノシー×game8やSHIFTのロールアップ、ソラコムのスイングバイIPOのように、アーンアウト条項や親会社単価の注入で利益率を倍増させるスモールM&Aは投資対効果が極めて高い手法です。'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}