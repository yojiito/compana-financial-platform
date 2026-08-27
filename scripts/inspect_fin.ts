import { prisma } from '../lib/prisma';

async function main() {
  const fin = await prisma.financialReport.findMany({
    where: { tickerCode: { in: ['7203', '7974'] } },
    select: { tickerCode: true, fiscalYear: true, totalAssets: true, totalLiabilities: true, netAssets: true }
  });
  console.log(JSON.stringify(fin, null, 2));
}

main().finally(() => prisma.$disconnect());
