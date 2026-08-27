import { prisma } from '@/lib/prisma';
import GazetteTimelineFeed from '@/components/GazetteTimelineFeed';
import { Scale, Sparkles, Building2, Flame } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function FinancePortalPage() {
  const reports = await prisma.officialGazetteReport.findMany({
    orderBy: { gazetteDate: 'desc' },
    include: {
      company: {
        select: {
          id: true,
          slug: true,
          name: true,
          shortName: true,
          industry: true,
          isStartup: true,
          establishedYear: true,
          representative: true,
          location: true,
        },
      },
    },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-950 text-teal-300 border border-teal-700/60 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>官報決算公告 タイムライン速報</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            未上場企業・スタートアップ 決算公告速報
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            会社法第440条に基づき官報に掲載された最新の貸借対照表（BS）および当期損益を時系列で網羅。注目のSaaS・AIスタートアップから非上場大手まで、最新の財務体質を即時チェック。
          </p>
        </div>
      </div>

      {/* 決算公告タイムラインフィード */}
      <GazetteTimelineFeed initialReports={reports} />
    </div>
  );
}