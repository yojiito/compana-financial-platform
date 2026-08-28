import { prisma } from '../lib/prisma';

async function main() {
  const allCompanies = await prisma.company.findMany({
    select: { tickerCode: true }
  });
  console.log('Total companies in DB:', allCompanies.length);
  const tickerCounts: Record<string, number> = {};
  for (const c of allCompanies) {
    tickerCounts[c.tickerCode] = (tickerCounts[c.tickerCode] || 0) + 1;
  }
  const duplicates = Object.entries(tickerCounts).filter(([_, count]) => count > 1);
  console.log('Duplicate tickers count in Company table:', duplicates.length);

  const existingFinancials = await prisma.financialReport.findMany({
    select: { tickerCode: true, fiscalYear: true, periodType: true }
  });
  console.log('Total financial records currently in DB:', existingFinancials.length);
}

main().finally(() => prisma.$disconnect());
