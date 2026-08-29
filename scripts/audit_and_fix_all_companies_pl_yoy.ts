import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔍 Auditing all company PL records for YoY and scaling anomalies...');

  const companies = await prisma.company.findMany({
    select: { id: true, tickerCode: true, name: true }
  });

  let totalAnomalies = 0;

  for (const c of companies) {
    const reports = await prisma.financialReport.findMany({
      where: { tickerCode: c.tickerCode, periodType: 'FY' },
      orderBy: { fiscalYear: 'asc' }
    });

    if (reports.length < 2) continue;

    for (let i = 1; i < reports.length; i++) {
      const prev = reports[i - 1];
      const curr = reports[i];

      if (prev.revenue <= 0 || curr.revenue <= 0) continue;

      const yoy = ((curr.revenue - prev.revenue) / prev.revenue) * 100;
      
      // 異常な10倍以上のジャンプ (+900%超) または 1/10以下の急減 (-90%超) を検知
      if (yoy > 900.0 || yoy < -90.0) {
        console.warn(`🚨 PL Anomaly in ${c.tickerCode} ${c.name} (${prev.fiscalYear} -> ${curr.fiscalYear}): PrevRev=${(prev.revenue / 100000000).toLocaleString()}億円, CurrRev=${(curr.revenue / 100000000).toLocaleString()}億円 (YoY ${yoy.toFixed(1)}%)`);
        totalAnomalies++;
      }
    }
  }

  console.log(`✅ Audited all companies: Found ${totalAnomalies} scaling anomalies.`);
}

main()
  .catch((e) => {
    console.error('Audit failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
