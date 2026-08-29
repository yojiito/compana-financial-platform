import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Auditing all 3,903 companies for Market Cap & Share Price integrity...');

  const companies = await prisma.company.findMany({
    select: {
      tickerCode: true,
      name: true,
      currentPrice: true,
      sharesIssued: true,
      marketCap: true,
      market: true
    }
  });

  let anomalyCount = 0;
  let fixedCount = 0;

  for (const c of companies) {
    if (!c.currentPrice || !c.sharesIssued || !c.marketCap) continue;

    // 計算上の時価総額 = 株価 × 発行済株式数
    const expectedCap = c.currentPrice * c.sharesIssued;
    const ratio = c.marketCap / expectedCap;

    // 乖離が著しい場合 (例: 0.1倍未満、10倍超) は再計算して同期
    if (ratio < 0.5 || ratio > 2.0) {
      anomalyCount++;
      const correctedCap = Math.round(expectedCap);
      
      await prisma.company.update({
        where: { tickerCode: c.tickerCode },
        data: {
          marketCap: correctedCap
        }
      });
      fixedCount++;
    }
  }

  console.log(`✅ Audited ${companies.length} companies: Found and fixed ${fixedCount} market cap calculation anomalies!`);
}

main()
  .catch((e) => {
    console.error('Audit failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
