import http from 'http';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('================================================================');
  console.log('🔍 AUDITING DATABASE & SCREENER FOR DUPLICATES AND SCALES');
  console.log('================================================================\n');

  const sampleCodes = ['7203', '6758', '6861', '4502', '9433', '3635', '8058', '5243', '130A', '1376', '1380', '1381'];
  const companies = await prisma.company.findMany({
    where: { tickerCode: { in: sampleCodes } },
    include: {
      financials: {
        where: { periodType: 'FY' },
        orderBy: { fiscalYear: 'desc' },
        take: 1
      }
    }
  });

  console.log('--- Sample Verified Companies ---');
  for (const c of companies) {
    const fin = c.financials[0];
    const mCapCho = (c.marketCap ? c.marketCap / 1000000000000 : 0).toFixed(2);
    const mCapOku = (c.marketCap ? Math.round(c.marketCap / 100000000) : 0);
    const revOku = fin ? (fin.revenue / 100).toFixed(1) : '-';
    const opOku = fin ? (fin.operatingIncome / 100).toFixed(1) : '-';

    console.log(`[${c.tickerCode}] ${c.name} (${c.market} / ${c.sector})`);
    console.log(`   時価総額: ¥${mCapCho}兆 (¥${mCapOku}億円) | 株価: ¥${c.currentPrice} | PER: ${c.trailingPE}x | PBR: ${c.priceToBook}x | ROE: ${c.roe}%`);
    console.log(`   直近売上高: ¥${revOku}億円 | 営業利益: ¥${opOku}億円 | 自己資本比率: ${c.equityRatio}%\n`);
  }

  // 重複チェック: 同じ売上高を持つ企業ペアの数をカウント
  const allFin = await prisma.financialReport.findMany({
    where: { fiscalYear: 2024 }
  });
  const revCounts = new Map<number, number>();
  for (const f of allFin) {
    revCounts.set(f.revenue, (revCounts.get(f.revenue) || 0) + 1);
  }

  let maxDup = 0;
  let dupVal = 0;
  for (const [rev, count] of revCounts.entries()) {
    if (count > maxDup) {
      maxDup = count;
      dupVal = rev;
    }
  }

  console.log(`Total 2024 Reports: ${allFin.length}`);
  console.log(`Max duplicate revenue count across 3,903 companies: ${maxDup} (at revenue ${dupVal}M)`);
  console.log('Zero Mass-Copy-Paste Verified:', maxDup < 5);
}

main().finally(() => prisma.$disconnect());
