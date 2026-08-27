import { prisma } from '../lib/prisma';

async function main() {
  console.log('🔧 Fixing unit inconsistencies in FinancialReport...');

  // トヨタ自動車 (7203) - 億円単位に統一
  await prisma.financialReport.updateMany({
    where: { tickerCode: '7203', fiscalYear: 2022 },
    data: { totalLiabilities: 405800 }
  });
  await prisma.financialReport.updateMany({
    where: { tickerCode: '7203', fiscalYear: 2023 },
    data: { totalLiabilities: 451000 }
  });
  await prisma.financialReport.updateMany({
    where: { tickerCode: '7203', fiscalYear: 2024 },
    data: { totalLiabilities: 512000 }
  });

  // 任天堂 (7974) - 億円単位に統一
  await prisma.financialReport.updateMany({
    where: { tickerCode: '7974', fiscalYear: 2022 },
    data: { totalLiabilities: 6000 }
  });
  await prisma.financialReport.updateMany({
    where: { tickerCode: '7974', fiscalYear: 2023 },
    data: { totalLiabilities: 6500 }
  });
  await prisma.financialReport.updateMany({
    where: { tickerCode: '7974', fiscalYear: 2024 },
    data: { totalLiabilities: 7000 }
  });

  console.log('✅ Unit inconsistencies fixed successfully.');
}

main().finally(() => prisma.$disconnect());
