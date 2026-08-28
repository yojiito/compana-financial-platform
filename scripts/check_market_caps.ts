import { prisma } from '../lib/prisma';

async function main() {
  const top20 = await prisma.company.findMany({
    orderBy: { marketCap: 'desc' },
    take: 20,
    select: { tickerCode: true, name: true, market: true, sector: true, marketCap: true, currentPrice: true }
  });

  console.log('--- Top 20 Companies by Market Cap ---');
  top20.forEach((c, idx) => {
    const oku = c.marketCap ? Math.round(c.marketCap / 100000000) : 0;
    const cho = (c.marketCap ? c.marketCap / 1000000000000 : 0).toFixed(2);
    console.log(`${idx + 1}. [${c.tickerCode}] ${c.name} (${c.market} / ${c.sector}): ¥${cho}兆 (${oku.toLocaleString()}億円)`);
  });

  // グロースやスタンダードで時価総額1兆円超になっている異常銘柄を抽出
  const abnormalGrowth = await prisma.company.findMany({
    where: {
      market: { contains: 'グロース' },
      marketCap: { gte: 500000000000 } // 5000億円以上
    },
    select: { tickerCode: true, name: true, marketCap: true }
  });
  console.log('\n--- Abnormal Growth Companies (>500B Yen) ---');
  abnormalGrowth.forEach(c => {
    console.log(`[${c.tickerCode}] ${c.name}: ¥${((c.marketCap || 0) / 1000000000000).toFixed(2)}兆`);
  });
}

main().finally(() => prisma.$disconnect());
