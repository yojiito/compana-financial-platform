'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Briefcase,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe,
  ArrowLeft,
  ArrowRight,
  Flame,
  Layers,
  Sparkles,
  Building,
  DollarSign,
  User,
  Users,
  Award,
  ExternalLink,
  Calendar,
  Compass,
  PieChart,
  CheckCircle2,
} from 'lucide-react';
import { INVESTOR_FUNDS_DATA, InvestorFund } from '@/lib/investor-funds-data';
import { useLanguage } from '@/lib/language-context';
import { getCompanyName } from '@/lib/company-english-names';

export default function FundDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { isEn, t } = useLanguage();

  const fund: InvestorFund | undefined = INVESTOR_FUNDS_DATA.find((f) => f.slug === slug);

  if (!fund) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">{isEn ? 'Fund Not Found' : '投資ファンドが見つかりませんでした'}</h1>
        <p className="text-sm text-slate-500">{isEn ? `No data registered for ${slug}` : `指定されたファンド（${slug}）の情報は登録されていません。`}</p>
        <Link
          href="/funds"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isEn ? 'Back to Funds Hub' : 'ファンド一覧へ戻る'}</span>
        </Link>
      </div>
    );
  }

  // 推定合計投資額 (億円)
  const totalEstimatedValueBillion = fund.topHoldings.reduce(
    (acc, cur) => acc + (cur.estimatedValueBillion || 0),
    0
  );

  const formatBillion = (val: number) => {
    if (Math.abs(val) >= 10000) {
      return isEn ? `¥${(val / 10000).toFixed(2)}T` : `¥${(val / 10000).toFixed(2)} 兆円`;
    }
    return isEn ? `¥${val.toLocaleString()}B` : `¥${val.toLocaleString()} 億円`;
  };

  const displayFundName = isEn ? fund.enName : fund.name;
  const displayTypeLabel = isEn ? fund.enTypeLabel : fund.typeLabel;
  const displayCountry = isEn ? fund.enCountry : fund.country;
  const displayHq = isEn ? fund.enHeadquarters : fund.headquarters;
  const displayRep = isEn ? fund.enRepresentative : fund.representative;
  const displayAum = isEn ? fund.enAumLabel : fund.aumLabel;
  const displayDesc = isEn ? fund.enDescription : fund.description;
  const displayStrategy = isEn ? fund.enStrategy : fund.strategy;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-24">
      {/* 戻るリンク */}
      <Link
        href="/funds"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{isEn ? 'Back to Funds Hub' : '主要ファンド・VC一覧へ戻る'}</span>
      </Link>

      {/* ヒーローカルテ */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${fund.badgeColor}`}>
                {displayTypeLabel}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {isEn ? `Est. ${fund.establishedYear} / ${displayCountry}` : `創業 ${fund.establishedYear}年 / ${displayCountry}`}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {displayFundName}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
              <span>{isEn ? 'Leader / Rep:' : '代表:'} <strong className="text-white font-bold">{displayRep}</strong></span>
              <span>•</span>
              <span>{isEn ? 'HQ:' : '本社:'} <strong className="text-white font-bold">{displayHq}</strong></span>
              {fund.officialWebsiteUrl && (
                <>
                  <span>•</span>
                  <a
                    href={fund.officialWebsiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-purple-300 hover:text-white underline font-bold"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Official Website ↗' : '公式Webサイト ↗'}</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* AUMバッジ */}
          <div className="bg-slate-800/90 border border-slate-700 p-5 rounded-2xl space-y-1 self-start md:self-auto min-w-[200px]">
            <span className="text-[11px] text-slate-400 font-medium block">{isEn ? 'AUM (Assets Under Management)' : '運用資産残高 (AUM)'}</span>
            <div className="text-2xl sm:text-3xl font-black text-purple-300 font-mono">
              {displayAum}
            </div>
            <span className="text-[10px] text-slate-400 font-sans block">
              {isEn ? 'Disclosed Holdings Total:' : '開示保有額合計:'} <strong>{formatBillion(totalEstimatedValueBillion)}</strong>
            </span>
          </div>
        </div>

        {/* 投資戦略・エンゲージメント特徴 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-300 uppercase tracking-wider">
              <Briefcase className="w-4 h-4" />
              <span>{isEn ? 'Overview & Characteristics' : 'ファンド概要 ＆ 特徴'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {displayDesc}
            </p>
          </div>

          <div className="bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
              <Compass className="w-4 h-4" />
              <span>{isEn ? 'Investment Strategy & Engagement Policy' : '投資戦略 ＆ エンゲージメント方針'}</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {displayStrategy}
            </p>
          </div>
        </div>
      </div>

      {/* 🏢 保有銘柄 ＆ 投資先ポートフォリオ一覧テーブル */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-purple-600" />
              <span>{isEn ? 'Disclosed Holdings & Investment Portfolio' : '開示保有銘柄 ＆ 投資先ポートフォリオ一覧'}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {isEn ? 'Detailed portfolio holdings based on 5% Rule filings and official releases' : '大量保有報告書（5%ルール）および公式出資リリースに基づく投資先明細'}
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-purple-800 bg-purple-50 border border-purple-200 px-3 py-1 rounded-xl">
            {fund.topHoldings.length} {isEn ? 'Holdings Listed' : '銘柄・企業 掲載'}
          </span>
        </div>

        {/* テーブル */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
              <tr>
                <th className="py-3.5 px-4">{isEn ? 'Target Company' : '投資先 企業名'}</th>
                <th className="py-3.5 px-4 text-right">{isEn ? 'Ownership (%)' : '保有比率 (%)'}</th>
                <th className="py-3.5 px-4 text-right">{isEn ? 'Est. Value' : '推定保有額'}</th>
                <th className="py-3.5 px-4">{isEn ? 'Shares / Filing Date' : '保有株数 / 出資時期'}</th>
                <th className="py-3.5 px-4">{isEn ? 'Purpose & Engagement Summary' : '保有目的 ＆ エンゲージメント内容'}</th>
                <th className="py-3.5 px-4 text-center">{isEn ? 'Card' : '詳細カルテ'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-800">
              {fund.topHoldings.map((h, idx) => {
                const targetUrl = h.tickerCode
                  ? `/stocks/${h.tickerCode}`
                  : h.unlistedSlug
                  ? `/unlisted/${h.unlistedSlug}`
                  : null;

                const targetDisplayName = getCompanyName(h.tickerCode || h.unlistedSlug || '', h.enTargetName || h.targetName, isEn);
                const displayPurpose = isEn ? (h.enPurpose || h.purpose) : h.purpose;
                const displayShares = isEn ? (h.enHoldingShares || h.holdingShares) : h.holdingShares;

                return (
                  <tr key={idx} className="hover:bg-slate-50/80">
                    <td className="py-3.5 px-4 font-sans font-black text-slate-900">
                      <div className="flex items-center gap-2">
                        {h.tickerCode && (
                          <span className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                            {h.tickerCode}
                          </span>
                        )}
                        <span>{targetDisplayName}</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right font-black text-purple-700 text-sm">
                      {h.ownershipRatioPct}%
                    </td>

                    <td className="py-3.5 px-4 text-right font-bold text-slate-900">
                      {formatBillion(h.estimatedValueBillion)}
                    </td>

                    <td className="py-3.5 px-4 font-sans text-slate-600 text-[11px]">
                      <div>{displayShares || (isEn ? 'Undisclosed' : '非公開')}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{h.filingDate}</div>
                    </td>

                    <td className="py-3.5 px-4 font-sans text-slate-700 text-xs leading-relaxed max-w-md">
                      {displayPurpose}
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {targetUrl ? (
                        <Link
                          href={targetUrl}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-purple-700 text-white text-[11px] font-bold transition shadow-xs"
                        >
                          <span>{isEn ? 'View Card' : '企業カルテ'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🧭 他の主要ファンドへのクイックナビ */}
      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3">
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {isEn ? 'Explore Other Major Funds & VCs' : '他の主要ファンド・VCをチェック'}
        </h3>
        <div className="flex flex-wrap gap-2">
          {INVESTOR_FUNDS_DATA.filter((f) => f.slug !== fund.slug).map((f) => (
            <Link
              key={f.slug}
              href={`/funds/${f.slug}`}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-xs font-bold text-slate-700 hover:text-purple-700 border border-slate-200 shadow-xs transition"
            >
              {isEn ? f.enShortName : f.shortName}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}