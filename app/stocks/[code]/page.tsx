import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import StockHeader from '@/components/StockHeader';
import StockDetailTabs from '@/components/StockDetailTabs';

interface PageProps {
  params: Promise<{
    code: string;
  }>;
}

export const dynamic = 'force-dynamic';

export default async function StockDetailPage({ params }: PageProps) {
  const { code } = await params;

  const company = await prisma.company.findUnique({
    where: { tickerCode: code },
    include: {
      stockPrices: {
        orderBy: { date: 'asc' },
      },
      financials: {
        orderBy: { fiscalYear: 'asc' },
      },
      shareholders: {
        orderBy: { rank: 'asc' },
      },
      largeHoldings: {
        orderBy: { submitDate: 'desc' },
      },
      fundraisings: {
        orderBy: { announceDate: 'desc' },
      },
      disclosures: {
        orderBy: { discloseAt: 'desc' },
      },
      irSummaries: {
        orderBy: { discloseDate: 'desc' },
      },
    },
  });

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6 pb-16">
      {/* 銘柄ヘッダー */}
      <StockHeader company={company} />

      {/* 6大タブ切り替えエリア */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StockDetailTabs
          company={company}
          stockPrices={company.stockPrices}
          financials={company.financials}
          shareholders={company.shareholders}
          largeHoldings={company.largeHoldings}
          fundraisings={company.fundraisings}
          disclosures={company.disclosures}
          irSummaries={company.irSummaries}
        />
      </div>
    </div>
  );
}