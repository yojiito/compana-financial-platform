import { prisma } from '../lib/prisma';

async function main() {
  const companies = await prisma.company.findMany({
    include: {
      shareholders: { take: 5, orderBy: { rank: 'asc' } },
      financials: { take: 2, orderBy: { fiscalYear: 'desc' } },
    }
  });

  console.log(`=== FULL AUDIT OF ALL ${companies.length} LISTED COMPANIES ===\n`);

  for (const c of companies) {
    console.log(`📈 [${c.tickerCode}] ${c.name} (${c.market} / ${c.sector})`);
    console.log(`  • Price: ¥${c.currentPrice} | Market Cap: ¥${c.marketCap}B`);
    console.log(`  • Shareholders Sample (${c.shareholders.length}):`);
    for (const s of c.shareholders) {
      console.log(`    - Rank ${s.rank}: ${s.name} | ${s.ratio}% | ${s.sharesCount?.toLocaleString()} shares`);
    }
    console.log(`  • Financials Sample (${c.financials.length}):`);
    for (const f of c.financials) {
      console.log(`    - FY${f.fiscalYear} | Revenue: ¥${f.revenue}M | Operating Income: ¥${f.operatingIncome}M | Net Income: ¥${f.netIncome}M | Net Assets: ¥${f.netAssets}M | Total Assets: ¥${f.totalAssets}M`);
    }
  }
}

main().finally(() => prisma.$disconnect());
