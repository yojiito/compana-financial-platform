import { prisma } from '../lib/prisma';

async function checkRawValues() {
  const toyota = await prisma.financialReport.findMany({
    where: { tickerCode: '7203' },
    orderBy: { fiscalYear: 'asc' }
  });
  console.log('=== トヨタ自動車 (7203) の FinancialReport 生データ ===');
  for (const r of toyota) {
    console.log(`FY${r.fiscalYear}: revenue=${r.revenue}, opIncome=${r.operatingIncome}, netIncome=${r.netIncome}, totalAssets=${r.totalAssets}, netAssets=${r.netAssets}, eps=${r.eps}, equityRatio=${r.equityRatio}`);
  }

  const sony = await prisma.financialReport.findMany({
    where: { tickerCode: '6758' },
    orderBy: { fiscalYear: 'asc' }
  });
  console.log('\n=== ソニーグループ (6758) の FinancialReport 生データ ===');
  for (const r of sony) {
    console.log(`FY${r.fiscalYear}: revenue=${r.revenue}, opIncome=${r.operatingIncome}, netIncome=${r.netIncome}`);
  }

  const papyless = await prisma.financialReport.findMany({
    where: { tickerCode: '3641' },
    orderBy: { fiscalYear: 'asc' }
  });
  console.log('\n=== パピレス (3641) の FinancialReport 生データ ===');
  for (const r of papyless) {
    console.log(`FY${r.fiscalYear}: revenue=${r.revenue}, opIncome=${r.operatingIncome}, netIncome=${r.netIncome}`);
  }
}

checkRawValues()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
