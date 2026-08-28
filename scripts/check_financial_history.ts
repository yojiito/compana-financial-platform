import { prisma } from '../lib/prisma';

async function main() {
  const sampleTickers = ['7203', '7974', '6758', '6861', '9983', '9984', '8058', '8001', '8031', '4063', '8035', '6501', '9432', '9413', '9409', '9404', '5243', '3678', '3641'];

  for (const ticker of sampleTickers) {
    const company = await prisma.company.findUnique({
      where: { tickerCode: ticker },
      include: {
        financials: { orderBy: { fiscalYear: 'asc' } },
        disclosures: { orderBy: { discloseAt: 'desc' } },
        irSummaries: { orderBy: { discloseDate: 'desc' } }
      }
    });

    if (!company) {
      console.log(`[${ticker}] Not found`);
      continue;
    }

    const years = company.financials.map(f => f.fiscalYear);
    console.log(`[${ticker}] ${company.name} | Financial Years (${years.length}年): [${years.join(', ')}] | Disclosures: ${company.disclosures.length} | IR Summaries: ${company.irSummaries.length}`);
  }
}

main().finally(() => prisma.$disconnect());
