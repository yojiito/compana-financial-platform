import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { Building, Globe, MapPin, User, Calendar, Scale, ArrowLeft, Coins, Users, BookOpen, Clock, ShieldCheck, CheckCircle2, Briefcase } from 'lucide-react';
import GazetteBsVisualizer from '@/components/GazetteBsVisualizer';
import CapitalEventTimeline from '@/components/CapitalEventTimeline';
import UnlistedShareholderTracker from '@/components/UnlistedShareholderTracker';
import UnlistedShikihoProfile from '@/components/UnlistedShikihoProfile';
import UnlistedInvestmentPortfolio from '@/components/UnlistedInvestmentPortfolio';
import RelationshipNetworkGraph from '@/components/RelationshipNetworkGraph';
import { UNLISTED_INVESTMENTS_DATA } from '@/lib/unlisted-investments-data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function UnlistedCompanyPage({ params }: PageProps) {
  const { slug } = await params;

  const company = await prisma.unlistedCompany.findUnique({
    where: { slug },
    include: {
      gazetteReports: {
        orderBy: { fiscalPeriod: 'asc' },
      },
      capitalEvents: {
        orderBy: { eventDate: 'desc' },
      },
      shareholders: {
        orderBy: { rank: 'asc' },
      },
    },
  });

  if (!company) {
    notFound();
  }

  const latestReport = company.gazetteReports[company.gazetteReports.length - 1];
  const investmentHoldings = UNLISTED_INVESTMENTS_DATA[slug] || [];

  return (
    <div className="space-y-8 pb-16">
      {/* 企業ヘッダー */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
          <Link
            href="/finance"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-teal-600 transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>決算公告タイムライン速報に戻る</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-md bg-teal-950 text-teal-300 font-mono font-bold text-xs">
                  未上場
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {company.name}
                </h1>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                  {company.industry}
                </span>
              </div>
              {company.englishName && (
                <p className="text-xs text-slate-400 mt-1 font-medium">{company.englishName}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              {/* 最新官報公示ステータスバッジ */}
              {latestReport && (
                <div className="bg-teal-50 border border-teal-200 text-teal-900 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <div>
                    <div className="text-[10px] text-teal-700 font-normal">公式 官報決算公告（会社法第440条）</div>
                    <div className="font-bold font-mono">第{latestReport.fiscalPeriod}期 公告掲載日: {latestReport.gazetteDate} (基準日: {latestReport.periodEnd})</div>
                  </div>
                </div>
              )}

              <Link
                href="/audit"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-teal-900 to-emerald-900 hover:from-teal-800 hover:to-emerald-800 border border-teal-500/50 text-teal-200 hover:text-white text-xs font-bold transition shadow-xs self-start md:self-auto"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>官報監査証書 (100%合格) ↗</span>
              </Link>

              {company.websiteUrl && (
                <a
                  href={company.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition self-start md:self-auto"
                >
                  <Globe className="w-3.5 h-3.5 text-slate-500" />
                  <span>公式サイト ↗</span>
                </a>
              )}
            </div>
          </div>

          {/* 企業情報バー */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-600 pt-2">
            <span className="flex items-center gap-1">
              <User className="w-3.5 h-3.5 text-slate-400" />
              代表: <b>{company.representative || '-'}</b>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              設立: <b>{company.establishedYear}年</b>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              本社: <span>{company.location || '-'}</span>
            </span>
            <span className="font-mono text-slate-400">
              法人番号: {company.corporateNumber}
            </span>
          </div>

          {company.description && (
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {company.description}
            </p>
          )}
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. 羅針盤 企業カルテ (事業展望 ＆ 成長戦略) */}
        <section className="space-y-4">
          <UnlistedShikihoProfile company={company} />
        </section>

        {/* 2. 💼 保有株式ポートフォリオ ＆ 株式持合い・純投資 */}
        {investmentHoldings.length > 0 && (
          <section className="space-y-4">
            <UnlistedInvestmentPortfolio
              companyName={company.name}
              holdings={investmentHoldings}
            />
          </section>
        )}

        {/* 3. 大株主名簿 ＆ 資本構成 (Cap Table) */}
        {company.shareholders.length > 0 && (
          <section className="space-y-4">
            <UnlistedShareholderTracker
              companyName={company.name}
              shareholders={company.shareholders}
            />
          </section>
        )}

        {/* 3.5 🌐 資本・人的関係性ネットワーク */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <RelationshipNetworkGraph
            initialEntityId={`unlisted-${slug}`}
            showControls={false}
          />
        </section>

        {/* 4. 官報決算公告 & AI BS診断 */}
        <section className="space-y-4 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl font-bold text-slate-900">
              官報決算公告 貸借対照表（BS）＆ 財務体質診断
            </h2>
          </div>

          <GazetteBsVisualizer
            companyName={company.name}
            isStartup={company.isStartup}
            reports={company.gazetteReports}
          />
        </section>

        {/* 5. 資本政策・資金調達＆減資タイムライン */}
        {company.capitalEvents.length > 0 && (
          <section className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2">
              <Coins className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-bold text-slate-900">
                資本政策・増資ラウンド ＆ 減資（資本減少公告）タイムライン
              </h2>
            </div>

            <CapitalEventTimeline
              companyName={company.name}
              events={company.capitalEvents}
            />
          </section>
        )}
      </div>
    </div>
  );
}