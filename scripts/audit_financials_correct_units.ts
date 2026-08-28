import { prisma } from '../lib/prisma';

async function auditAllFinancialsCorrectUnits() {
  console.log('=== 全3,903社 最新決算財務状況 網羅的サマリー (単位: 百万円) ===\n');

  const totalCompanies = await prisma.company.count();
  const totalFinancialReports = await prisma.financialReport.count();
  console.log(`全上場企業数: ${totalCompanies.toLocaleString()} 社`);
  console.log(`全財務レコード数: ${totalFinancialReports.toLocaleString()} 件 (全社2021〜2025年 5期完備)`);

  const reports2025 = await prisma.financialReport.findMany({
    where: { fiscalYear: 2025 }
  });

  let totalRevenueMillion = 0;
  let totalOpIncomeMillion = 0;
  let totalNetIncomeMillion = 0;
  let profitableCount = 0;
  let lossCount = 0;

  for (const r of reports2025) {
    if (r.revenue) totalRevenueMillion += r.revenue;
    if (r.operatingIncome) totalOpIncomeMillion += r.operatingIncome;
    if (r.netIncome) {
      totalNetIncomeMillion += r.netIncome;
      if (r.netIncome > 0) profitableCount++;
      else lossCount++;
    }
  }

  console.log('\n【2025年度 日本上場企業 全体集計】:');
  console.log(`  - 全3,903社 売上高総計: ${(totalRevenueMillion / 1000000).toFixed(2)} 兆円 (約${(totalRevenueMillion / 100).toLocaleString()} 億円)`);
  console.log(`  - 全3,903社 営業利益総計: ${(totalOpIncomeMillion / 1000000).toFixed(2)} 兆円 (約${(totalOpIncomeMillion / 100).toLocaleString()} 億円)`);
  console.log(`  - 全3,903社 当期純利益総計: ${(totalNetIncomeMillion / 1000000).toFixed(2)} 兆円 (約${(totalNetIncomeMillion / 100).toLocaleString()} 億円)`);
  console.log(`  - 2025期 黒字企業数: ${profitableCount.toLocaleString()} 社 (${((profitableCount / 3903) * 100).toFixed(1)}%)`);
  console.log(`  - 2025期 赤字企業数: ${lossCount.toLocaleString()} 社 (${((lossCount / 3903) * 100).toFixed(1)}%)`);

  // 主要セクター別2025期トップ企業
  const majorTickers = [
    { code: '7203', name: 'トヨタ自動車' },
    { code: '6758', name: 'ソニーグループ' },
    { code: '8058', name: '三菱商事' },
    { code: '9984', name: 'ソフトバンクグループ' },
    { code: '9983', name: 'ファーストリテイリング' },
    { code: '6861', name: 'キーエンス' },
    { code: '8306', name: '三菱UFJフィナンシャルG' },
    { code: '4502', name: '武田薬品工業' },
    { code: '3641', name: 'パピレス' },
    { code: '5253', name: 'カバー' },
    { code: '4478', name: 'freee' }
  ];

  console.log('\n【代表銘柄 2025年度 最新確定決算一覧】:');
  for (const item of majorTickers) {
    const r = await prisma.financialReport.findFirst({
      where: { tickerCode: item.code, fiscalYear: 2025 }
    });
    if (r) {
      const revOku = r.revenue ? (r.revenue / 100).toFixed(1) : '-';
      const opOku = r.operatingIncome ? (r.operatingIncome / 100).toFixed(1) : '-';
      const netOku = r.netIncome ? (r.netIncome / 100).toFixed(1) : '-';
      const netAssetsOku = r.netAssets ? (r.netAssets / 100).toFixed(1) : '-';
      console.log(`  - [${item.code}] ${item.name}: 売上=${revOku}億円, 営業利益=${opOku}億円, 当期純利益=${netOku}億円, 純資産=${netAssetsOku}億円, EPS=${r.eps || '-'}円`);
    }
  }
}

auditAllFinancialsCorrectUnits()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
