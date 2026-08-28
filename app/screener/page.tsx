import { prisma } from '@/lib/prisma';
import ScreenerClient from '@/components/ScreenerClient';

export const dynamic = 'force-dynamic';

export default async function ScreenerPage() {
  const rawCompanies = await prisma.company.findMany({
    orderBy: { marketCap: 'desc' },
    include: {
      financials: {
        where: { periodType: 'FY' },
        orderBy: { fiscalYear: 'desc' },
        take: 1,
      },
    },
  });

  const companies = rawCompanies.map((c) => {
    const latestFin = c.financials[0];
    return {
      tickerCode: c.tickerCode,
      name: c.name,
      shortName: c.shortName,
      sector: c.sector,
      market: c.market,
      currentPrice: c.currentPrice,
      priceChangePct: c.priceChangePct,
      marketCap: c.marketCap,
      trailingPE: c.trailingPE,
      priceToBook: c.priceToBook,
      roe: c.roe,
      dividendYield: c.dividendYield,
      equityRatio: c.equityRatio ?? latestFin?.equityRatio ?? null,
      revenue: latestFin?.revenue ?? null,
      operatingIncome: latestFin?.operatingIncome ?? null,
      operatingMargin: latestFin?.operatingMargin ?? (latestFin?.revenue && latestFin?.operatingIncome ? parseFloat(((latestFin.operatingIncome / latestFin.revenue) * 100).toFixed(1)) : null),
      netIncome: latestFin?.netIncome ?? null,
      dividendPerShare: latestFin?.dividendPerShare ?? null,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <ScreenerClient initialCompanies={companies} />
    </div>
  );
}