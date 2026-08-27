import { prisma } from './prisma';
import yahooFinance from 'yahoo-finance2';

export async function getCompanyDetail(tickerCode: string) {
  const company = await prisma.company.findUnique({
    where: { tickerCode },
    include: {
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
      stockPrices: {
        orderBy: { date: 'asc' },
        take: 365,
      },
    },
  });

  return company;
}

export async function getAllCompaniesSummary() {
  return await prisma.company.findMany({
    orderBy: { marketCap: 'desc' },
    select: {
      tickerCode: true,
      name: true,
      shortName: true,
      sector: true,
      market: true,
      currentPrice: true,
      priceChange: true,
      priceChangePct: true,
      marketCap: true,
      trailingPE: true,
      priceToBook: true,
      roe: true,
      dividendYield: true,
      equityRatio: true,
    },
  });
}

export async function syncRealtimeStockPrice(tickerCode: string) {
  try {
    const symbol = `${tickerCode}.T`;
    const quote = (await yahooFinance.quote(symbol)) as any;

    if (quote) {
      const currentPrice = quote.regularMarketPrice ?? undefined;
      const priceChange = quote.regularMarketChange ?? undefined;
      const priceChangePct = quote.regularMarketChangePercent ?? undefined;
      const marketCap = quote.marketCap ? quote.marketCap / 100000000 : undefined;
      const trailingPE = quote.trailingPE ?? undefined;
      const forwardPE = quote.forwardPE ?? undefined;
      const priceToBook = quote.priceToBook ?? undefined;
      const dividendYield = quote.dividendYield
        ? quote.dividendYield * 100
        : quote.trailingAnnualDividendYield
        ? quote.trailingAnnualDividendYield * 100
        : undefined;

      const updated = await prisma.company.update({
        where: { tickerCode },
        data: {
          currentPrice,
          priceChange,
          priceChangePct,
          marketCap,
          trailingPE,
          forwardPE,
          priceToBook,
          dividendYield,
        },
      });
      return { success: true, company: updated };
    }
  } catch (err) {
    console.error(`Failed to sync realtime price for ${tickerCode}:`, err);
    return { success: false, error: String(err) };
  }
  return { success: false, error: 'No data returned' };
}