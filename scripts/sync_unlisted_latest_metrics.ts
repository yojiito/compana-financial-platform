import { prisma } from '../lib/prisma';

async function main() {
  const companies = await prisma.unlistedCompany.findMany({
    include: {
      gazetteReports: {
        orderBy: { fiscalPeriod: 'desc' },
        take: 1,
      }
    }
  });

  for (const c of companies) {
    if (c.gazetteReports.length > 0) {
      const latest = c.gazetteReports[0];
      await prisma.unlistedCompany.update({
        where: { id: c.id },
        data: {
          latestPeriodEnd: latest.periodEnd,
          latestTotalAssets: latest.totalAssets,
          latestNetAssets: latest.netAssets,
          latestNetIncome: latest.netIncome,
          capital: latest.capitalStock,
        }
      });
      console.log(`✅ Synced ${c.name} (${c.slug}): Net Assets = ¥${(latest.netAssets / 100).toFixed(0)}億, Assets = ¥${(latest.totalAssets / 100).toFixed(0)}億`);
    }
  }
}

main().finally(() => prisma.$disconnect());
