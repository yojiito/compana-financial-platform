import { prisma } from '../lib/prisma';

async function main() {
  const companies = await prisma.unlistedCompany.findMany({
    include: {
      gazetteReports: { orderBy: { fiscalPeriod: 'desc' } },
      shareholders: { orderBy: { rank: 'asc' } },
      capitalEvents: { orderBy: { eventDate: 'desc' } },
    }
  });

  console.log(`=== FULL AUDIT OF ALL ${companies.length} UNLISTED COMPANIES ===\n`);

  for (const c of companies) {
    console.log(`----------------------------------------------------------------`);
    console.log(`🏢 [${c.slug}] ${c.name} (${c.shortName})`);
    console.log(`  • 13-Digit Corporate Number: ${c.corporateNumber}`);
    console.log(`  • Representative: ${c.representative}`);
    console.log(`  • Established: ${c.establishedYear}年 | Capital: ¥${c.capital}M`);
    console.log(`  • Location: ${c.location}`);
    console.log(`  • Industry: ${c.industry}`);
    console.log(`  • Employees: ${c.employeesCount} | Avg Salary: ${c.avgSalary ? `¥${c.avgSalary}M` : '-'}`);
    console.log(`  • Description: ${c.description?.slice(0, 100)}...`);
    console.log(`  • Gazette Reports (${c.gazetteReports.length}):`);
    for (const g of c.gazetteReports) {
      console.log(`    - Period ${g.fiscalPeriod} (${g.periodEnd}) | Gazette: ${g.gazetteDate} (${g.gazetteIssue}) | Net Assets: ¥${g.netAssets}M | Net Income: ¥${g.netIncome}M | Total Assets: ¥${g.totalAssets}M`);
    }
    console.log(`  • Shareholders / Capital Structure (${c.shareholders.length}):`);
    for (const s of c.shareholders) {
      console.log(`    - Rank ${s.rank}: ${s.shareholderName} [${s.shareholderType}] | ${s.holdingRatio}% | Note: ${s.note}`);
    }
    console.log(`  • Capital Events (${c.capitalEvents.length}):`);
    for (const e of c.capitalEvents) {
      console.log(`    - ${e.eventDate}: ${e.eventType} | Amount: ${e.amount || '-'} | Investors: ${e.investors || '-'}`);
    }
  }
}

main().finally(() => prisma.$disconnect());
