import { prisma } from '../lib/prisma';

async function deepAuditAllFinancials() {
  console.log('=== 全社 最新決算財務状況 網羅的ディープ監査 ===\n');

  const totalCompanies = await prisma.company.count();
  const totalFinancialReports = await prisma.financialReport.count();
  console.log(`登録上場企業数: ${totalCompanies.toLocaleString()} 社`);
  console.log(`登録財務報告レコード総数: ${totalFinancialReports.toLocaleString()} 件`);

  // 年度別レコード数の分布
  const reportsByYear = await prisma.financialReport.groupBy({
    by: ['fiscalYear'],
    _count: { id: true },
    orderBy: { fiscalYear: 'asc' }
  });

  console.log('\n【年度別 財務レコード集計】:');
  for (const group of reportsByYear) {
    console.log(`  - ${group.fiscalYear}年度: ${group._count.id.toLocaleString()} 件`);
  }

  // 2025年度の最新財務レコードが欠けている企業を検出
  const companiesWithout2025 = await prisma.company.findMany({
    where: {
      financials: {
        none: {
          fiscalYear: 2025
        }
      }
    },
    select: {
      tickerCode: true,
      name: true
    }
  });

  console.log(`\n【2025年度最新決算が未投入の企業数】: ${companiesWithout2025.length} 社`);

  // 2025年度の主要財務指標のサマリー
  const reports2025 = await prisma.financialReport.findMany({
    where: { fiscalYear: 2025 }
  });

  let totalRevenue2025 = 0;
  let totalOpIncome2025 = 0;
  let totalNetIncome2025 = 0;
  let nullRevenueCount = 0;
  let nullOpIncomeCount = 0;
  let nullTotalAssetsCount = 0;

  for (const r of reports2025) {
    if (r.revenue === null || r.revenue === undefined) nullRevenueCount++;
    else totalRevenue2025 += r.revenue;

    if (r.operatingIncome === null || r.operatingIncome === undefined) nullOpIncomeCount++;
    else totalOpIncome2025 += r.operatingIncome;

    if (r.netIncome !== null && r.netIncome !== undefined) totalNetIncome2025 += r.netIncome;

    if (r.totalAssets === null || r.totalAssets === undefined) nullTotalAssetsCount++;
  }

  console.log(`\n【2025年度 全上場企業 財務アグリゲーション】:`);
  console.log(`  - 全上場企業 2025期 合計売上高: ${(totalRevenue2025 / 1000000000000).toFixed(2)} 兆円`);
  console.log(`  - 全上場企業 2025期 合計営業利益: ${(totalOpIncome2025 / 1000000000000).toFixed(2)} 兆円`);
  console.log(`  - 全上場企業 2025期 合計当期純利益: ${(totalNetIncome2025 / 1000000000000).toFixed(2)} 兆円`);
  console.log(`  - 欠損値（売上Null）: ${nullRevenueCount} 件 / 3,903件`);
  console.log(`  - 欠損値（営利Null）: ${nullOpIncomeCount} 件 / 3,903件`);
  console.log(`  - 欠損値（総資産Null）: ${nullTotalAssetsCount} 件 / 3,903件`);

  // 主要銘柄の2025年度財務データ確認
  const sampleTickers = ['7203', '6758', '8058', '9984', '9983', '6861', '3641', '5253'];
  console.log('\n【主要銘柄 2025年度最新決算サンプル】:');
  for (const code of sampleTickers) {
    const comp = await prisma.company.findUnique({
      where: { tickerCode: code },
      include: {
        financials: {
          orderBy: { fiscalYear: 'desc' },
          take: 2
        }
      }
    });
    if (comp) {
      console.log(`\n🏢 [${comp.tickerCode}] ${comp.name}:`);
      for (const r of comp.financials) {
        console.log(`  - FY${r.fiscalYear} (期末: ${r.periodEnd || '-'}): 売上=${(r.revenue ? (r.revenue / 100000000).toFixed(1) + '億円' : '-')} / 営利=${(r.operatingIncome ? (r.operatingIncome / 100000000).toFixed(1) + '億円' : '-')} / 純利=${(r.netIncome ? (r.netIncome / 100000000).toFixed(1) + '億円' : '-')} / 総資産=${(r.totalAssets ? (r.totalAssets / 100000000).toFixed(1) + '億円' : '-')} / 純資産=${(r.netAssets ? (r.netAssets / 100000000).toFixed(1) + '億円' : '-')}`);
      }
    }
  }

  // 未上場企業の官報最新決算
  const unlistedList = await prisma.unlistedCompany.findMany({
    include: {
      gazetteReports: {
        orderBy: { fiscalPeriod: 'desc' },
        take: 1
      }
    }
  });
  console.log('\n【未上場企業 最新官報決算公告 (最新2025期/最新公告)】:');
  for (const u of unlistedList) {
    const rep = u.gazetteReports[0];
    console.log(`[${u.name}] 第${rep?.fiscalPeriod}期 (${rep?.periodEnd}): 純利益=${rep?.netIncome}百万円, 利益剰余金=${rep?.retainedEarnings}百万円, 総資産=${rep?.totalAssets}百万円, 資本金=${rep?.capitalStock}百万円`);
  }
}

deepAuditAllFinancials()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
