import { prisma } from '../lib/prisma';

async function main() {
  const companies = await prisma.company.findMany({
    include: {
      shareholders: { orderBy: { rank: 'asc' } },
    }
  });

  console.log(`=== AUDIT OF ALL ${companies.length} LISTED COMPANIES MAJOR SHAREHOLDERS ===\n`);

  for (const c of companies) {
    console.log(`📈 [${c.tickerCode}] ${c.name}: ${c.shareholders.length} major shareholders recorded`);
    for (const s of c.shareholders) {
      console.log(`  - Rank ${s.rank}: ${s.shareholderName} | ${s.holdingRatio}% | ${s.sharesHeld.toLocaleString()} shares (Period: ${s.periodEnd})`);
    }
  }
}

main().finally(() => prisma.$disconnect());
