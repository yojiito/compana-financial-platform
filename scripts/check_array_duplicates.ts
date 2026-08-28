import { prisma } from '../lib/prisma';
import { MAJOR_10YR_FINANCIALS } from './seed_full_10yr_financials_and_ir';

async function main() {
  const recordsToInsert: any[] = [];
  const years = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const majorTickerSet = new Set(Object.keys(MAJOR_10YR_FINANCIALS));

  for (const [ticker, finList] of Object.entries(MAJOR_10YR_FINANCIALS)) {
    for (const f of finList) {
      recordsToInsert.push({
        tickerCode: ticker,
        fiscalYear: f.fiscalYear,
        periodType: 'FY',
      });
    }
  }

  const allCompanies = await prisma.company.findMany({
    select: { tickerCode: true, name: true, marketCap: true, sector: true },
  });

  for (const c of allCompanies) {
    if (majorTickerSet.has(c.tickerCode)) continue;

    for (let i = 0; i < years.length; i++) {
      const yr = years[i];
      recordsToInsert.push({
        tickerCode: c.tickerCode,
        fiscalYear: yr,
        periodType: 'FY',
      });
    }
  }

  console.log('Total recordsToInsert length:', recordsToInsert.length);

  const seen = new Set<string>();
  const duplicates: string[] = [];
  for (const r of recordsToInsert) {
    const key = `${r.tickerCode}_${r.fiscalYear}_${r.periodType}`;
    if (seen.has(key)) {
      duplicates.push(key);
    }
    seen.add(key);
  }

  console.log('Duplicate keys count:', duplicates.length);
  if (duplicates.length > 0) {
    console.log('Sample duplicates:', duplicates.slice(0, 10));
  }
}

main().finally(() => prisma.$disconnect());
