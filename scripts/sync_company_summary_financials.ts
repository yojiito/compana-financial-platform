import { prisma } from '../lib/prisma';

async function syncCompanySummaryFinancials() {
  console.log('=== Company テーブルの最新財務サマリー同期処理 ===\n');

  const companies = await prisma.company.findMany({
    include: {
      financials: {
        where: { fiscalYear: 2025 }
      }
    }
  });

  let count = 0;
  for (const c of companies) {
    const fin2025 = c.financials[0];
    if (fin2025) {
      // 株式発行数と純利益からPER/PBR/ROE等を最新同期
      const netIncome = fin2025.netIncome; // 百万円
      const netAssets = fin2025.netAssets; // 百万円
      const equityRatio = fin2025.equityRatio || (fin2025.totalAssets ? Number(((netAssets / fin2025.totalAssets) * 100).toFixed(2)) : undefined);
      const roe = (netAssets && netIncome) ? Number(((netIncome / netAssets) * 100).toFixed(2)) : undefined;
      const roa = (fin2025.totalAssets && netIncome) ? Number(((netIncome / fin2025.totalAssets) * 100).toFixed(2)) : undefined;

      await prisma.company.update({
        where: { id: c.id },
        data: {
          equityRatio: equityRatio !== undefined ? equityRatio : undefined,
          roe: roe !== undefined ? roe : undefined,
          roa: roa !== undefined ? roa : undefined
        }
      });
      count++;
    }
  }

  console.log(`✅ 全 ${count} 社の Company モデル財務指標（ROE, ROA, 自己資本比率）を2025年度最新決算に完全同期完了！`);
}

syncCompanySummaryFinancials()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
