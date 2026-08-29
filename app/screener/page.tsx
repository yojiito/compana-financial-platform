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
        take: 2, // 直近2期分を取得して成長率 (YoY) を計算
      },
    },
  });

  const companies = rawCompanies.map((c) => {
    const latestFin = c.financials[0];
    const prevFin = c.financials[1];

    // 売上成長率 (YoY %) の算出
    let revenueYoY: number | null = null;
    if (latestFin?.revenue && prevFin?.revenue && prevFin.revenue > 0) {
      revenueYoY = parseFloat((((latestFin.revenue - prevFin.revenue) / prevFin.revenue) * 100).toFixed(1));
    }

    // 営業利益成長率 (YoY %) の算出
    let operatingIncomeYoY: number | null = null;
    if (latestFin?.operatingIncome !== undefined && prevFin?.operatingIncome !== undefined && prevFin.operatingIncome > 0) {
      operatingIncomeYoY = parseFloat((((latestFin.operatingIncome - prevFin.operatingIncome) / prevFin.operatingIncome) * 100).toFixed(1));
    }

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
      avgSalary: c.avgSalary ?? null,
      avgAge: c.avgAge ?? null,
      employeesCount: c.employeesCount ?? null,
      shikihoHeadline: c.shikihoHeadline ?? null,
      revenue: latestFin?.revenue ?? null,
      revenueYoY: revenueYoY,
      operatingIncome: latestFin?.operatingIncome ?? null,
      operatingIncomeYoY: operatingIncomeYoY,
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